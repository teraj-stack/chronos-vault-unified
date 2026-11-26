import { safeStorage } from "/sentinel-shield/src/utils/selfRepairSystem.ts";
export const INITIAL_MOCK_PROCESSES = [
  {
    pid: 8944,
    name: "flutter_overlay_host.exe",
    executablePath: "C:\\Users\\User\\AppData\\Local\\Temp\\overlay\\flutter_overlay_host.exe",
    matchedKeywords: ["overlay", "window_manager"],
    detectedModules: [
      "flutter_windows.dll",
      "window_manager_plugin.dll",
      "flutter_overlay_window.dll"
    ],
    cpuUsage: 34.5,
    memoryMb: 142.8,
    status: "ACTIVE",
    windowTitle: "System Alert Overlay [TOPMOST]",
    hasTopMostHook: true
  },
  {
    pid: 10420,
    name: "bitsdojo_screen_locker.exe",
    executablePath: "C:\\ProgramData\\bitsdojo\\bitsdojo_screen_locker.exe",
    matchedKeywords: ["bitsdojo"],
    detectedModules: [
      "bitsdojo_window_plugin.dll",
      "bitsdojo_window_windows.dll",
      "user32_hook.dll"
    ],
    cpuUsage: 28.2,
    memoryMb: 89.4,
    status: "ACTIVE",
    windowTitle: "BitsDojo Frameless Locker",
    hasTopMostHook: true
  },
  {
    pid: 6188,
    name: "window_manager_daemon.exe",
    executablePath: "C:\\Users\\User\\Downloads\\window_manager_daemon.exe",
    matchedKeywords: ["window_manager", "overlay"],
    detectedModules: [
      "window_manager_plugin.dll",
      "screen_retriever_plugin.dll",
      "transparent_pointer_barrier.dll"
    ],
    cpuUsage: 19.8,
    memoryMb: 64.1,
    status: "ACTIVE",
    windowTitle: "Transparent Modal Shield (DWM)",
    hasTopMostHook: true
  }
];
export function generateFreezeAllPythonScript(targets, config) {
  const pidsList = targets.map((t) => t.pid).join(", ");
  return `#!/usr/bin/env python3
# ==============================================================================
#  SENTINEL 'FREEZE-ALL' PLUGIN MODULE (WINDOWS / WIN32 NTDLL KERNEL ENGINE)
#  Plik: freeze_all_overlay_bitsdojo.py
#  Opis: Skanowanie wszystkich aktywnych procesów w poszukiwaniu ścieżek
#        i modułów zawierających 'overlay', 'window_manager' lub 'bitsdojo',
#        a następnie natychmiastowe wywołanie ntdll.NtSuspendProcess dla każdego PID.
#  Wymagania: Python 3.7+ (Standard Library: ctypes, sys, os, subprocess)
# ==============================================================================

import os
import sys
import time
import ctypes
from ctypes import wintypes

# ------------------------------------------------------------------------------
# 1. KONFIGURACJA SŁÓW KLUCZOWYCH & PARAMETRÓW WIN32
# ------------------------------------------------------------------------------
TARGET_KEYWORDS = ['overlay', 'window_manager', 'bitsdojo']
PROCESS_SUSPEND_RESUME = 0x0800  # Wymagane uprawnienie do zawieszenia/wznowienia procesu
PROCESS_QUERY_INFORMATION = 0x0400
PROCESS_VM_READ = 0x0010

# Inicjalizacja bibliotek Win32 NTDLL i KERNEL32
try:
    ntdll = ctypes.windll.ntdll
    kernel32 = ctypes.windll.kernel32
    psapi = ctypes.windll.psapi
except AttributeError:
    print("[-] Ten moduł wymaga systemu Windows (biblioteki ntdll.dll / kernel32.dll).")
    sys.exit(1)

# Definicja funkcji jądra NT
# NTSTATUS NTAPI NtSuspendProcess(IN HANDLE ProcessHandle);
NtSuspendProcess = ntdll.NtSuspendProcess
NtSuspendProcess.argtypes = [wintypes.HANDLE]
NtSuspendProcess.restype = wintypes.LONG

# NTSTATUS NTAPI NtResumeProcess(IN HANDLE ProcessHandle);
NtResumeProcess = ntdll.NtResumeProcess
NtResumeProcess.argtypes = [wintypes.HANDLE]
NtResumeProcess.restype = wintypes.LONG

def is_admin() -> bool:
    """Sprawdzenie czy skrypt jest uruchomiony z uprawnieniami Administratora."""
    try:
        return ctypes.windll.shell32.IsUserAnAdmin() != 0
    except Exception:
        return False

def get_process_executable_and_modules(pid: int) -> tuple[str, list[str]]:
    """Pobiera ścieżkę wykonywalną oraz załadowane moduły DLL procesu o podanym PID."""
    h_proc = kernel32.OpenProcess(PROCESS_QUERY_INFORMATION | PROCESS_VM_READ, False, pid)
    if not h_proc:
        return "", []
    
    exe_path = ""
    modules = []
    
    try:
        # Pobranie ścieżki pliku .exe
        buf = ctypes.create_unicode_buffer(1024)
        size = wintypes.DWORD(1024)
        if kernel32.QueryFullProcessImageNameW(h_proc, 0, buf, ctypes.byref(size)):
            exe_path = buf.value

        # Pobranie listy załadowanych bibliotek DLL
        h_mods = (wintypes.HMODULE * 1024)()
        cb_needed = wintypes.DWORD()
        if psapi.EnumProcessModules(h_proc, ctypes.byref(h_mods), ctypes.sizeof(h_mods), ctypes.byref(cb_needed)):
            mod_count = int(cb_needed.value / ctypes.sizeof(wintypes.HMODULE))
            for i in range(min(mod_count, 1024)):
                mod_name_buf = ctypes.create_unicode_buffer(1024)
                if psapi.GetModuleBaseNameW(h_proc, h_mods[i], mod_name_buf, 1024):
                    modules.append(mod_name_buf.value)
    except Exception as e:
        pass
    finally:
        kernel32.CloseHandle(h_proc)
        
    return exe_path, modules

def scan_all_processes_for_overlay_targets() -> list[dict]:
    """
    Skanuje wszystkie aktywne procesy w systemie.
    Wyszukuje ścieżki lub moduły zawierające 'overlay', 'window_manager' lub 'bitsdojo'.
    """
    matched_processes = []
    
    # Pobranie listy wszystkich PID-ów
    pids = (wintypes.DWORD * 4096)()
    cb_needed = wintypes.DWORD()
    if not psapi.EnumProcesses(ctypes.byref(pids), ctypes.sizeof(pids), ctypes.byref(cb_needed)):
        print("[-] Nie udało się pobrać listy procesów przez EnumProcesses.")
        return []
    
    total_pids = int(cb_needed.value / ctypes.sizeof(wintypes.DWORD))
    current_pid = os.getpid()

    for i in range(total_pids):
        pid = pids[i]
        if pid == 0 or pid == 4 or pid == current_pid:
            continue
            
        exe_path, modules = get_process_executable_and_modules(pid)
        if not exe_path and not modules:
            continue
            
        search_corpus = (exe_path + " " + " ".join(modules)).lower()
        matched = [kw for kw in TARGET_KEYWORDS if kw in search_corpus]
        
        if matched:
            matched_processes.append({
                "pid": pid,
                "path": exe_path,
                "modules": modules,
                "keywords": matched
            })
            
    return matched_processes

def freeze_process_by_pid(pid: int) -> bool:
    """
    Wywołuje bezpośrednio ntdll.NtSuspendProcess dla podanego PID.
    Zawiesza wszystkie wątki procesu w pamięci RAM w czasie 0 ms.
    """
    h_proc = kernel32.OpenProcess(PROCESS_SUSPEND_RESUME, False, pid)
    if not h_proc:
        err = kernel32.GetLastError()
        print(f"  [-] [PID: {pid}] OpenProcess(0x0800) nie powiodło się. Błąd: {err}")
        return False
        
    try:
        nt_status = NtSuspendProcess(h_proc)
        if nt_status == 0:
            print(f"  [+] ❄️ [PID: {pid}] NtSuspendProcess(0x{h_proc:X}) -> SUKCES! Wątki unieruchomione w RAM (0 ms).")
            return True
        else:
            print(f"  [-] [PID: {pid}] NtSuspendProcess zwróciło kod NTSTATUS: 0x{nt_status:08X}")
            return False
    finally:
        kernel32.CloseHandle(h_proc)

def main():
    print("=" * 80)
    print("  🛡️  SENTINEL 'FREEZE-ALL' PLUGIN - WIN32 OVERLAY & BITSDOJO IMMOBILIZER")
    print("=" * 80)
    
    if not is_admin():
        print("[!] OSTRZEŻENIE: Skrypt nie posiada uprawnień Administratora.")
        print("    Zalecane uruchomienie jako Administrator, aby zawieszać procesy systemowe.")
        print("-" * 80)
        
    print(f"[*] Rozpoczynam skanowanie aktywnych procesów pod kątem słów: {TARGET_KEYWORDS}...")
    start_time = time.time()
    targets = scan_all_processes_for_overlay_targets()
    elapsed = (time.time() - start_time) * 1000
    
    print(f"[*] Skanowanie zakończone w {elapsed:.2f} ms. Wykryto celów: {len(targets)}")
    print("-" * 80)
    
    if not targets:
        print("[+] Brak złośliwych procesów overlay/bitsdojo/window_manager aktywnych w systemie!")
        return

    frozen_count = 0
    for target in targets:
        pid = target["pid"]
        path = target["path"]
        keywords = ", ".join(target["keywords"])
        print(f"\\n🎯 Wykryto proces: PID={pid} | Słowa kluczowe: [{keywords}]")
        print(f"   Ścieżka: {path}")
        
        # Wywołanie procedury zamrożenia NtSuspendProcess
        if freeze_process_by_pid(pid):
            frozen_count += 1

    print("\\n" + "=" * 80)
    print(f"  [👑 RAPORT KOŃCOWY] Pomyślnie zamrożono {frozen_count}/{len(targets)} procesów w RAM.")
    print("  Kursor myszy, okna i klawiatura zostały odblokowane. Procesy pozostają uśpione.")
    print("=" * 80)

if __name__ == '__main__':
    main()
`;
}
class FreezeAllPluginManager {
  constructor() {
    this.processes = INITIAL_MOCK_PROCESSES;
    this.config = {
      autoFreezeOnDetection: true,
      scanIntervalMs: 2500,
      includeChildProcesses: true,
      createMemoryDumpBeforeFreeze: false,
      logToSystemEventLog: true
    };
    this.scanCount = 1;
    this.listeners = [];
    const saved = safeStorage.get("sentinel_freezeall_processes", this.processes);
    const savedCfg = safeStorage.get("sentinel_freezeall_config", this.config);
    if (saved) this.processes = saved;
    if (savedCfg) this.config = savedCfg;
  }
  getProcesses() {
    return this.processes;
  }
  getConfig() {
    return this.config;
  }
  updateConfig(newCfg) {
    this.config = { ...this.config, ...newCfg };
    this.notify();
  }
  subscribe(cb) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== cb);
    };
  }
  notify() {
    safeStorage.set("sentinel_freezeall_processes", this.processes);
    safeStorage.set("sentinel_freezeall_config", this.config);
    this.listeners.forEach((cb) => cb());
  }
  scanNow() {
    this.scanCount += 1;
    this.processes = this.processes.map((p) => ({
      ...p,
      cpuUsage: p.status === "FROZEN_IN_RAM" ? 0 : Math.round((15 + Math.random() * 30) * 10) / 10
    }));
    this.notify();
    return this.processes;
  }
  freezeAll() {
    this.processes = this.processes.map((p) => ({
      ...p,
      status: "FROZEN_IN_RAM",
      cpuUsage: 0
    }));
    this.notify();
    return this.processes.length;
  }
  resumeAll() {
    this.processes = this.processes.map((p) => ({
      ...p,
      status: "RESUMED",
      cpuUsage: Math.round((10 + Math.random() * 20) * 10) / 10
    }));
    this.notify();
    return this.processes.length;
  }
  freezeSinglePid(pid) {
    this.processes = this.processes.map(
      (p) => p.pid === pid ? { ...p, status: "FROZEN_IN_RAM", cpuUsage: 0 } : p
    );
    this.notify();
  }
  resumeSinglePid(pid) {
    this.processes = this.processes.map(
      (p) => p.pid === pid ? { ...p, status: "RESUMED", cpuUsage: 14.5 } : p
    );
    this.notify();
  }
}
export const freezeAllPluginManager = new FreezeAllPluginManager();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZyZWV6ZUFsbFBsdWdpbkVuZ2luZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzYWZlU3RvcmFnZSB9IGZyb20gJy4vc2VsZlJlcGFpclN5c3RlbSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2Nhbm5lZE92ZXJsYXlQcm9jZXNzIHtcbiAgcGlkOiBudW1iZXI7XG4gIG5hbWU6IHN0cmluZztcbiAgZXhlY3V0YWJsZVBhdGg6IHN0cmluZztcbiAgbWF0Y2hlZEtleXdvcmRzOiAoJ292ZXJsYXknIHwgJ3dpbmRvd19tYW5hZ2VyJyB8ICdiaXRzZG9qbycpW107XG4gIGRldGVjdGVkTW9kdWxlczogc3RyaW5nW107XG4gIGNwdVVzYWdlOiBudW1iZXI7XG4gIG1lbW9yeU1iOiBudW1iZXI7XG4gIHN0YXR1czogJ0FDVElWRScgfCAnU1VTUEVORElORycgfCAnRlJPWkVOX0lOX1JBTScgfCAnUkVTVU1FRCc7XG4gIHdpbmRvd1RpdGxlOiBzdHJpbmc7XG4gIGhhc1RvcE1vc3RIb29rOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZyZWV6ZUFsbFBsdWdpbkNvbmZpZyB7XG4gIGF1dG9GcmVlemVPbkRldGVjdGlvbjogYm9vbGVhbjtcbiAgc2NhbkludGVydmFsTXM6IG51bWJlcjtcbiAgaW5jbHVkZUNoaWxkUHJvY2Vzc2VzOiBib29sZWFuO1xuICBjcmVhdGVNZW1vcnlEdW1wQmVmb3JlRnJlZXplOiBib29sZWFuO1xuICBsb2dUb1N5c3RlbUV2ZW50TG9nOiBib29sZWFuO1xufVxuXG5leHBvcnQgY29uc3QgSU5JVElBTF9NT0NLX1BST0NFU1NFUzogU2Nhbm5lZE92ZXJsYXlQcm9jZXNzW10gPSBbXG4gIHtcbiAgICBwaWQ6IDg5NDQsXG4gICAgbmFtZTogJ2ZsdXR0ZXJfb3ZlcmxheV9ob3N0LmV4ZScsXG4gICAgZXhlY3V0YWJsZVBhdGg6ICdDOlxcXFxVc2Vyc1xcXFxVc2VyXFxcXEFwcERhdGFcXFxcTG9jYWxcXFxcVGVtcFxcXFxvdmVybGF5XFxcXGZsdXR0ZXJfb3ZlcmxheV9ob3N0LmV4ZScsXG4gICAgbWF0Y2hlZEtleXdvcmRzOiBbJ292ZXJsYXknLCAnd2luZG93X21hbmFnZXInXSxcbiAgICBkZXRlY3RlZE1vZHVsZXM6IFtcbiAgICAgICdmbHV0dGVyX3dpbmRvd3MuZGxsJyxcbiAgICAgICd3aW5kb3dfbWFuYWdlcl9wbHVnaW4uZGxsJyxcbiAgICAgICdmbHV0dGVyX292ZXJsYXlfd2luZG93LmRsbCdcbiAgICBdLFxuICAgIGNwdVVzYWdlOiAzNC41LFxuICAgIG1lbW9yeU1iOiAxNDIuOCxcbiAgICBzdGF0dXM6ICdBQ1RJVkUnLFxuICAgIHdpbmRvd1RpdGxlOiAnU3lzdGVtIEFsZXJ0IE92ZXJsYXkgW1RPUE1PU1RdJyxcbiAgICBoYXNUb3BNb3N0SG9vazogdHJ1ZVxuICB9LFxuICB7XG4gICAgcGlkOiAxMDQyMCxcbiAgICBuYW1lOiAnYml0c2Rvam9fc2NyZWVuX2xvY2tlci5leGUnLFxuICAgIGV4ZWN1dGFibGVQYXRoOiAnQzpcXFxcUHJvZ3JhbURhdGFcXFxcYml0c2Rvam9cXFxcYml0c2Rvam9fc2NyZWVuX2xvY2tlci5leGUnLFxuICAgIG1hdGNoZWRLZXl3b3JkczogWydiaXRzZG9qbyddLFxuICAgIGRldGVjdGVkTW9kdWxlczogW1xuICAgICAgJ2JpdHNkb2pvX3dpbmRvd19wbHVnaW4uZGxsJyxcbiAgICAgICdiaXRzZG9qb193aW5kb3dfd2luZG93cy5kbGwnLFxuICAgICAgJ3VzZXIzMl9ob29rLmRsbCdcbiAgICBdLFxuICAgIGNwdVVzYWdlOiAyOC4yLFxuICAgIG1lbW9yeU1iOiA4OS40LFxuICAgIHN0YXR1czogJ0FDVElWRScsXG4gICAgd2luZG93VGl0bGU6ICdCaXRzRG9qbyBGcmFtZWxlc3MgTG9ja2VyJyxcbiAgICBoYXNUb3BNb3N0SG9vazogdHJ1ZVxuICB9LFxuICB7XG4gICAgcGlkOiA2MTg4LFxuICAgIG5hbWU6ICd3aW5kb3dfbWFuYWdlcl9kYWVtb24uZXhlJyxcbiAgICBleGVjdXRhYmxlUGF0aDogJ0M6XFxcXFVzZXJzXFxcXFVzZXJcXFxcRG93bmxvYWRzXFxcXHdpbmRvd19tYW5hZ2VyX2RhZW1vbi5leGUnLFxuICAgIG1hdGNoZWRLZXl3b3JkczogWyd3aW5kb3dfbWFuYWdlcicsICdvdmVybGF5J10sXG4gICAgZGV0ZWN0ZWRNb2R1bGVzOiBbXG4gICAgICAnd2luZG93X21hbmFnZXJfcGx1Z2luLmRsbCcsXG4gICAgICAnc2NyZWVuX3JldHJpZXZlcl9wbHVnaW4uZGxsJyxcbiAgICAgICd0cmFuc3BhcmVudF9wb2ludGVyX2JhcnJpZXIuZGxsJ1xuICAgIF0sXG4gICAgY3B1VXNhZ2U6IDE5LjgsXG4gICAgbWVtb3J5TWI6IDY0LjEsXG4gICAgc3RhdHVzOiAnQUNUSVZFJyxcbiAgICB3aW5kb3dUaXRsZTogJ1RyYW5zcGFyZW50IE1vZGFsIFNoaWVsZCAoRFdNKScsXG4gICAgaGFzVG9wTW9zdEhvb2s6IHRydWVcbiAgfVxuXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlRnJlZXplQWxsUHl0aG9uU2NyaXB0KFxuICB0YXJnZXRzOiBTY2FubmVkT3ZlcmxheVByb2Nlc3NbXSxcbiAgY29uZmlnOiBGcmVlemVBbGxQbHVnaW5Db25maWdcbik6IHN0cmluZyB7XG4gIGNvbnN0IHBpZHNMaXN0ID0gdGFyZ2V0cy5tYXAodCA9PiB0LnBpZCkuam9pbignLCAnKTtcbiAgXG4gIHJldHVybiBgIyEvdXNyL2Jpbi9lbnYgcHl0aG9uM1xuIyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiMgIFNFTlRJTkVMICdGUkVFWkUtQUxMJyBQTFVHSU4gTU9EVUxFIChXSU5ET1dTIC8gV0lOMzIgTlRETEwgS0VSTkVMIEVOR0lORSlcbiMgIFBsaWs6IGZyZWV6ZV9hbGxfb3ZlcmxheV9iaXRzZG9qby5weVxuIyAgT3BpczogU2thbm93YW5pZSB3c3p5c3RraWNoIGFrdHl3bnljaCBwcm9jZXPDs3cgdyBwb3N6dWtpd2FuaXUgxZtjaWXFvGVrXG4jICAgICAgICBpIG1vZHXFgsOzdyB6YXdpZXJhasSFY3ljaCAnb3ZlcmxheScsICd3aW5kb3dfbWFuYWdlcicgbHViICdiaXRzZG9qbycsXG4jICAgICAgICBhIG5hc3TEmXBuaWUgbmF0eWNobWlhc3Rvd2Ugd3l3b8WCYW5pZSBudGRsbC5OdFN1c3BlbmRQcm9jZXNzIGRsYSBrYcW8ZGVnbyBQSUQuXG4jICBXeW1hZ2FuaWE6IFB5dGhvbiAzLjcrIChTdGFuZGFyZCBMaWJyYXJ5OiBjdHlwZXMsIHN5cywgb3MsIHN1YnByb2Nlc3MpXG4jID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5pbXBvcnQgb3NcbmltcG9ydCBzeXNcbmltcG9ydCB0aW1lXG5pbXBvcnQgY3R5cGVzXG5mcm9tIGN0eXBlcyBpbXBvcnQgd2ludHlwZXNcblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgMS4gS09ORklHVVJBQ0pBIFPFgcOTVyBLTFVDWk9XWUNIICYgUEFSQU1FVFLDk1cgV0lOMzJcbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5UQVJHRVRfS0VZV09SRFMgPSBbJ292ZXJsYXknLCAnd2luZG93X21hbmFnZXInLCAnYml0c2Rvam8nXVxuUFJPQ0VTU19TVVNQRU5EX1JFU1VNRSA9IDB4MDgwMCAgIyBXeW1hZ2FuZSB1cHJhd25pZW5pZSBkbyB6YXdpZXN6ZW5pYS93em5vd2llbmlhIHByb2Nlc3VcblBST0NFU1NfUVVFUllfSU5GT1JNQVRJT04gPSAweDA0MDBcblBST0NFU1NfVk1fUkVBRCA9IDB4MDAxMFxuXG4jIEluaWNqYWxpemFjamEgYmlibGlvdGVrIFdpbjMyIE5URExMIGkgS0VSTkVMMzJcbnRyeTpcbiAgICBudGRsbCA9IGN0eXBlcy53aW5kbGwubnRkbGxcbiAgICBrZXJuZWwzMiA9IGN0eXBlcy53aW5kbGwua2VybmVsMzJcbiAgICBwc2FwaSA9IGN0eXBlcy53aW5kbGwucHNhcGlcbmV4Y2VwdCBBdHRyaWJ1dGVFcnJvcjpcbiAgICBwcmludChcIlstXSBUZW4gbW9kdcWCIHd5bWFnYSBzeXN0ZW11IFdpbmRvd3MgKGJpYmxpb3Rla2kgbnRkbGwuZGxsIC8ga2VybmVsMzIuZGxsKS5cIilcbiAgICBzeXMuZXhpdCgxKVxuXG4jIERlZmluaWNqYSBmdW5rY2ppIGrEhWRyYSBOVFxuIyBOVFNUQVRVUyBOVEFQSSBOdFN1c3BlbmRQcm9jZXNzKElOIEhBTkRMRSBQcm9jZXNzSGFuZGxlKTtcbk50U3VzcGVuZFByb2Nlc3MgPSBudGRsbC5OdFN1c3BlbmRQcm9jZXNzXG5OdFN1c3BlbmRQcm9jZXNzLmFyZ3R5cGVzID0gW3dpbnR5cGVzLkhBTkRMRV1cbk50U3VzcGVuZFByb2Nlc3MucmVzdHlwZSA9IHdpbnR5cGVzLkxPTkdcblxuIyBOVFNUQVRVUyBOVEFQSSBOdFJlc3VtZVByb2Nlc3MoSU4gSEFORExFIFByb2Nlc3NIYW5kbGUpO1xuTnRSZXN1bWVQcm9jZXNzID0gbnRkbGwuTnRSZXN1bWVQcm9jZXNzXG5OdFJlc3VtZVByb2Nlc3MuYXJndHlwZXMgPSBbd2ludHlwZXMuSEFORExFXVxuTnRSZXN1bWVQcm9jZXNzLnJlc3R5cGUgPSB3aW50eXBlcy5MT05HXG5cbmRlZiBpc19hZG1pbigpIC0+IGJvb2w6XG4gICAgXCJcIlwiU3ByYXdkemVuaWUgY3p5IHNrcnlwdCBqZXN0IHVydWNob21pb255IHogdXByYXduaWVuaWFtaSBBZG1pbmlzdHJhdG9yYS5cIlwiXCJcbiAgICB0cnk6XG4gICAgICAgIHJldHVybiBjdHlwZXMud2luZGxsLnNoZWxsMzIuSXNVc2VyQW5BZG1pbigpICE9IDBcbiAgICBleGNlcHQgRXhjZXB0aW9uOlxuICAgICAgICByZXR1cm4gRmFsc2VcblxuZGVmIGdldF9wcm9jZXNzX2V4ZWN1dGFibGVfYW5kX21vZHVsZXMocGlkOiBpbnQpIC0+IHR1cGxlW3N0ciwgbGlzdFtzdHJdXTpcbiAgICBcIlwiXCJQb2JpZXJhIMWbY2llxbxrxJkgd3lrb255d2FsbsSFIG9yYXogemHFgmFkb3dhbmUgbW9kdcWCeSBETEwgcHJvY2VzdSBvIHBvZGFueW0gUElELlwiXCJcIlxuICAgIGhfcHJvYyA9IGtlcm5lbDMyLk9wZW5Qcm9jZXNzKFBST0NFU1NfUVVFUllfSU5GT1JNQVRJT04gfCBQUk9DRVNTX1ZNX1JFQUQsIEZhbHNlLCBwaWQpXG4gICAgaWYgbm90IGhfcHJvYzpcbiAgICAgICAgcmV0dXJuIFwiXCIsIFtdXG4gICAgXG4gICAgZXhlX3BhdGggPSBcIlwiXG4gICAgbW9kdWxlcyA9IFtdXG4gICAgXG4gICAgdHJ5OlxuICAgICAgICAjIFBvYnJhbmllIMWbY2llxbxraSBwbGlrdSAuZXhlXG4gICAgICAgIGJ1ZiA9IGN0eXBlcy5jcmVhdGVfdW5pY29kZV9idWZmZXIoMTAyNClcbiAgICAgICAgc2l6ZSA9IHdpbnR5cGVzLkRXT1JEKDEwMjQpXG4gICAgICAgIGlmIGtlcm5lbDMyLlF1ZXJ5RnVsbFByb2Nlc3NJbWFnZU5hbWVXKGhfcHJvYywgMCwgYnVmLCBjdHlwZXMuYnlyZWYoc2l6ZSkpOlxuICAgICAgICAgICAgZXhlX3BhdGggPSBidWYudmFsdWVcblxuICAgICAgICAjIFBvYnJhbmllIGxpc3R5IHphxYJhZG93YW55Y2ggYmlibGlvdGVrIERMTFxuICAgICAgICBoX21vZHMgPSAod2ludHlwZXMuSE1PRFVMRSAqIDEwMjQpKClcbiAgICAgICAgY2JfbmVlZGVkID0gd2ludHlwZXMuRFdPUkQoKVxuICAgICAgICBpZiBwc2FwaS5FbnVtUHJvY2Vzc01vZHVsZXMoaF9wcm9jLCBjdHlwZXMuYnlyZWYoaF9tb2RzKSwgY3R5cGVzLnNpemVvZihoX21vZHMpLCBjdHlwZXMuYnlyZWYoY2JfbmVlZGVkKSk6XG4gICAgICAgICAgICBtb2RfY291bnQgPSBpbnQoY2JfbmVlZGVkLnZhbHVlIC8gY3R5cGVzLnNpemVvZih3aW50eXBlcy5ITU9EVUxFKSlcbiAgICAgICAgICAgIGZvciBpIGluIHJhbmdlKG1pbihtb2RfY291bnQsIDEwMjQpKTpcbiAgICAgICAgICAgICAgICBtb2RfbmFtZV9idWYgPSBjdHlwZXMuY3JlYXRlX3VuaWNvZGVfYnVmZmVyKDEwMjQpXG4gICAgICAgICAgICAgICAgaWYgcHNhcGkuR2V0TW9kdWxlQmFzZU5hbWVXKGhfcHJvYywgaF9tb2RzW2ldLCBtb2RfbmFtZV9idWYsIDEwMjQpOlxuICAgICAgICAgICAgICAgICAgICBtb2R1bGVzLmFwcGVuZChtb2RfbmFtZV9idWYudmFsdWUpXG4gICAgZXhjZXB0IEV4Y2VwdGlvbiBhcyBlOlxuICAgICAgICBwYXNzXG4gICAgZmluYWxseTpcbiAgICAgICAga2VybmVsMzIuQ2xvc2VIYW5kbGUoaF9wcm9jKVxuICAgICAgICBcbiAgICByZXR1cm4gZXhlX3BhdGgsIG1vZHVsZXNcblxuZGVmIHNjYW5fYWxsX3Byb2Nlc3Nlc19mb3Jfb3ZlcmxheV90YXJnZXRzKCkgLT4gbGlzdFtkaWN0XTpcbiAgICBcIlwiXCJcbiAgICBTa2FudWplIHdzenlzdGtpZSBha3R5d25lIHByb2Nlc3kgdyBzeXN0ZW1pZS5cbiAgICBXeXN6dWt1amUgxZtjaWXFvGtpIGx1YiBtb2R1xYJ5IHphd2llcmFqxIVjZSAnb3ZlcmxheScsICd3aW5kb3dfbWFuYWdlcicgbHViICdiaXRzZG9qbycuXG4gICAgXCJcIlwiXG4gICAgbWF0Y2hlZF9wcm9jZXNzZXMgPSBbXVxuICAgIFxuICAgICMgUG9icmFuaWUgbGlzdHkgd3N6eXN0a2ljaCBQSUQtw7N3XG4gICAgcGlkcyA9ICh3aW50eXBlcy5EV09SRCAqIDQwOTYpKClcbiAgICBjYl9uZWVkZWQgPSB3aW50eXBlcy5EV09SRCgpXG4gICAgaWYgbm90IHBzYXBpLkVudW1Qcm9jZXNzZXMoY3R5cGVzLmJ5cmVmKHBpZHMpLCBjdHlwZXMuc2l6ZW9mKHBpZHMpLCBjdHlwZXMuYnlyZWYoY2JfbmVlZGVkKSk6XG4gICAgICAgIHByaW50KFwiWy1dIE5pZSB1ZGHFgm8gc2nEmSBwb2JyYcSHIGxpc3R5IHByb2Nlc8OzdyBwcnpleiBFbnVtUHJvY2Vzc2VzLlwiKVxuICAgICAgICByZXR1cm4gW11cbiAgICBcbiAgICB0b3RhbF9waWRzID0gaW50KGNiX25lZWRlZC52YWx1ZSAvIGN0eXBlcy5zaXplb2Yod2ludHlwZXMuRFdPUkQpKVxuICAgIGN1cnJlbnRfcGlkID0gb3MuZ2V0cGlkKClcblxuICAgIGZvciBpIGluIHJhbmdlKHRvdGFsX3BpZHMpOlxuICAgICAgICBwaWQgPSBwaWRzW2ldXG4gICAgICAgIGlmIHBpZCA9PSAwIG9yIHBpZCA9PSA0IG9yIHBpZCA9PSBjdXJyZW50X3BpZDpcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICBcbiAgICAgICAgZXhlX3BhdGgsIG1vZHVsZXMgPSBnZXRfcHJvY2Vzc19leGVjdXRhYmxlX2FuZF9tb2R1bGVzKHBpZClcbiAgICAgICAgaWYgbm90IGV4ZV9wYXRoIGFuZCBub3QgbW9kdWxlczpcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICBcbiAgICAgICAgc2VhcmNoX2NvcnB1cyA9IChleGVfcGF0aCArIFwiIFwiICsgXCIgXCIuam9pbihtb2R1bGVzKSkubG93ZXIoKVxuICAgICAgICBtYXRjaGVkID0gW2t3IGZvciBrdyBpbiBUQVJHRVRfS0VZV09SRFMgaWYga3cgaW4gc2VhcmNoX2NvcnB1c11cbiAgICAgICAgXG4gICAgICAgIGlmIG1hdGNoZWQ6XG4gICAgICAgICAgICBtYXRjaGVkX3Byb2Nlc3Nlcy5hcHBlbmQoe1xuICAgICAgICAgICAgICAgIFwicGlkXCI6IHBpZCxcbiAgICAgICAgICAgICAgICBcInBhdGhcIjogZXhlX3BhdGgsXG4gICAgICAgICAgICAgICAgXCJtb2R1bGVzXCI6IG1vZHVsZXMsXG4gICAgICAgICAgICAgICAgXCJrZXl3b3Jkc1wiOiBtYXRjaGVkXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgXG4gICAgcmV0dXJuIG1hdGNoZWRfcHJvY2Vzc2VzXG5cbmRlZiBmcmVlemVfcHJvY2Vzc19ieV9waWQocGlkOiBpbnQpIC0+IGJvb2w6XG4gICAgXCJcIlwiXG4gICAgV3l3b8WCdWplIGJlenBvxZtyZWRuaW8gbnRkbGwuTnRTdXNwZW5kUHJvY2VzcyBkbGEgcG9kYW5lZ28gUElELlxuICAgIFphd2llc3phIHdzenlzdGtpZSB3xIV0a2kgcHJvY2VzdSB3IHBhbWnEmWNpIFJBTSB3IGN6YXNpZSAwIG1zLlxuICAgIFwiXCJcIlxuICAgIGhfcHJvYyA9IGtlcm5lbDMyLk9wZW5Qcm9jZXNzKFBST0NFU1NfU1VTUEVORF9SRVNVTUUsIEZhbHNlLCBwaWQpXG4gICAgaWYgbm90IGhfcHJvYzpcbiAgICAgICAgZXJyID0ga2VybmVsMzIuR2V0TGFzdEVycm9yKClcbiAgICAgICAgcHJpbnQoZlwiICBbLV0gW1BJRDoge3BpZH1dIE9wZW5Qcm9jZXNzKDB4MDgwMCkgbmllIHBvd2lvZMWCbyBzacSZLiBCxYLEhWQ6IHtlcnJ9XCIpXG4gICAgICAgIHJldHVybiBGYWxzZVxuICAgICAgICBcbiAgICB0cnk6XG4gICAgICAgIG50X3N0YXR1cyA9IE50U3VzcGVuZFByb2Nlc3MoaF9wcm9jKVxuICAgICAgICBpZiBudF9zdGF0dXMgPT0gMDpcbiAgICAgICAgICAgIHByaW50KGZcIiAgWytdIOKdhO+4jyBbUElEOiB7cGlkfV0gTnRTdXNwZW5kUHJvY2VzcygweHtoX3Byb2M6WH0pIC0+IFNVS0NFUyEgV8SFdGtpIHVuaWVydWNob21pb25lIHcgUkFNICgwIG1zKS5cIilcbiAgICAgICAgICAgIHJldHVybiBUcnVlXG4gICAgICAgIGVsc2U6XG4gICAgICAgICAgICBwcmludChmXCIgIFstXSBbUElEOiB7cGlkfV0gTnRTdXNwZW5kUHJvY2VzcyB6d3LDs2NpxYJvIGtvZCBOVFNUQVRVUzogMHh7bnRfc3RhdHVzOjA4WH1cIilcbiAgICAgICAgICAgIHJldHVybiBGYWxzZVxuICAgIGZpbmFsbHk6XG4gICAgICAgIGtlcm5lbDMyLkNsb3NlSGFuZGxlKGhfcHJvYylcblxuZGVmIG1haW4oKTpcbiAgICBwcmludChcIj1cIiAqIDgwKVxuICAgIHByaW50KFwiICDwn5uh77iPICBTRU5USU5FTCAnRlJFRVpFLUFMTCcgUExVR0lOIC0gV0lOMzIgT1ZFUkxBWSAmIEJJVFNET0pPIElNTU9CSUxJWkVSXCIpXG4gICAgcHJpbnQoXCI9XCIgKiA4MClcbiAgICBcbiAgICBpZiBub3QgaXNfYWRtaW4oKTpcbiAgICAgICAgcHJpbnQoXCJbIV0gT1NUUlpFxbtFTklFOiBTa3J5cHQgbmllIHBvc2lhZGEgdXByYXduaWXFhCBBZG1pbmlzdHJhdG9yYS5cIilcbiAgICAgICAgcHJpbnQoXCIgICAgWmFsZWNhbmUgdXJ1Y2hvbWllbmllIGpha28gQWRtaW5pc3RyYXRvciwgYWJ5IHphd2llc3phxIcgcHJvY2VzeSBzeXN0ZW1vd2UuXCIpXG4gICAgICAgIHByaW50KFwiLVwiICogODApXG4gICAgICAgIFxuICAgIHByaW50KGZcIlsqXSBSb3pwb2N6eW5hbSBza2Fub3dhbmllIGFrdHl3bnljaCBwcm9jZXPDs3cgcG9kIGvEhXRlbSBzxYLDs3c6IHtUQVJHRVRfS0VZV09SRFN9Li4uXCIpXG4gICAgc3RhcnRfdGltZSA9IHRpbWUudGltZSgpXG4gICAgdGFyZ2V0cyA9IHNjYW5fYWxsX3Byb2Nlc3Nlc19mb3Jfb3ZlcmxheV90YXJnZXRzKClcbiAgICBlbGFwc2VkID0gKHRpbWUudGltZSgpIC0gc3RhcnRfdGltZSkgKiAxMDAwXG4gICAgXG4gICAgcHJpbnQoZlwiWypdIFNrYW5vd2FuaWUgemFrb8WEY3pvbmUgdyB7ZWxhcHNlZDouMmZ9IG1zLiBXeWtyeXRvIGNlbMOzdzoge2xlbih0YXJnZXRzKX1cIilcbiAgICBwcmludChcIi1cIiAqIDgwKVxuICAgIFxuICAgIGlmIG5vdCB0YXJnZXRzOlxuICAgICAgICBwcmludChcIlsrXSBCcmFrIHrFgm/Fm2xpd3ljaCBwcm9jZXPDs3cgb3ZlcmxheS9iaXRzZG9qby93aW5kb3dfbWFuYWdlciBha3R5d255Y2ggdyBzeXN0ZW1pZSFcIilcbiAgICAgICAgcmV0dXJuXG5cbiAgICBmcm96ZW5fY291bnQgPSAwXG4gICAgZm9yIHRhcmdldCBpbiB0YXJnZXRzOlxuICAgICAgICBwaWQgPSB0YXJnZXRbXCJwaWRcIl1cbiAgICAgICAgcGF0aCA9IHRhcmdldFtcInBhdGhcIl1cbiAgICAgICAga2V5d29yZHMgPSBcIiwgXCIuam9pbih0YXJnZXRbXCJrZXl3b3Jkc1wiXSlcbiAgICAgICAgcHJpbnQoZlwiXFxcXG7wn46vIFd5a3J5dG8gcHJvY2VzOiBQSUQ9e3BpZH0gfCBTxYJvd2Ega2x1Y3pvd2U6IFt7a2V5d29yZHN9XVwiKVxuICAgICAgICBwcmludChmXCIgICDFmmNpZcW8a2E6IHtwYXRofVwiKVxuICAgICAgICBcbiAgICAgICAgIyBXeXdvxYJhbmllIHByb2NlZHVyeSB6YW1yb8W8ZW5pYSBOdFN1c3BlbmRQcm9jZXNzXG4gICAgICAgIGlmIGZyZWV6ZV9wcm9jZXNzX2J5X3BpZChwaWQpOlxuICAgICAgICAgICAgZnJvemVuX2NvdW50ICs9IDFcblxuICAgIHByaW50KFwiXFxcXG5cIiArIFwiPVwiICogODApXG4gICAgcHJpbnQoZlwiICBb8J+RkSBSQVBPUlQgS0/Fg0NPV1ldIFBvbXnFm2xuaWUgemFtcm/FvG9ubyB7ZnJvemVuX2NvdW50fS97bGVuKHRhcmdldHMpfSBwcm9jZXPDs3cgdyBSQU0uXCIpXG4gICAgcHJpbnQoXCIgIEt1cnNvciBteXN6eSwgb2tuYSBpIGtsYXdpYXR1cmEgem9zdGHFgnkgb2RibG9rb3dhbmUuIFByb2Nlc3kgcG96b3N0YWrEhSB1xZtwaW9uZS5cIilcbiAgICBwcmludChcIj1cIiAqIDgwKVxuXG5pZiBfX25hbWVfXyA9PSAnX19tYWluX18nOlxuICAgIG1haW4oKVxuYDtcbn1cblxuY2xhc3MgRnJlZXplQWxsUGx1Z2luTWFuYWdlciB7XG4gIHByaXZhdGUgcHJvY2Vzc2VzOiBTY2FubmVkT3ZlcmxheVByb2Nlc3NbXSA9IElOSVRJQUxfTU9DS19QUk9DRVNTRVM7XG4gIHByaXZhdGUgY29uZmlnOiBGcmVlemVBbGxQbHVnaW5Db25maWcgPSB7XG4gICAgYXV0b0ZyZWV6ZU9uRGV0ZWN0aW9uOiB0cnVlLFxuICAgIHNjYW5JbnRlcnZhbE1zOiAyNTAwLFxuICAgIGluY2x1ZGVDaGlsZFByb2Nlc3NlczogdHJ1ZSxcbiAgICBjcmVhdGVNZW1vcnlEdW1wQmVmb3JlRnJlZXplOiBmYWxzZSxcbiAgICBsb2dUb1N5c3RlbUV2ZW50TG9nOiB0cnVlXG4gIH07XG4gIHByaXZhdGUgc2NhbkNvdW50OiBudW1iZXIgPSAxO1xuICBwcml2YXRlIGxpc3RlbmVyczogQXJyYXk8KCkgPT4gdm9pZD4gPSBbXTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zdCBzYXZlZCA9IHNhZmVTdG9yYWdlLmdldDxTY2FubmVkT3ZlcmxheVByb2Nlc3NbXT4oJ3NlbnRpbmVsX2ZyZWV6ZWFsbF9wcm9jZXNzZXMnLCB0aGlzLnByb2Nlc3Nlcyk7XG4gICAgY29uc3Qgc2F2ZWRDZmcgPSBzYWZlU3RvcmFnZS5nZXQ8RnJlZXplQWxsUGx1Z2luQ29uZmlnPignc2VudGluZWxfZnJlZXplYWxsX2NvbmZpZycsIHRoaXMuY29uZmlnKTtcbiAgICBpZiAoc2F2ZWQpIHRoaXMucHJvY2Vzc2VzID0gc2F2ZWQ7XG4gICAgaWYgKHNhdmVkQ2ZnKSB0aGlzLmNvbmZpZyA9IHNhdmVkQ2ZnO1xuICB9XG5cbiAgcHVibGljIGdldFByb2Nlc3NlcygpOiBTY2FubmVkT3ZlcmxheVByb2Nlc3NbXSB7XG4gICAgcmV0dXJuIHRoaXMucHJvY2Vzc2VzO1xuICB9XG5cbiAgcHVibGljIGdldENvbmZpZygpOiBGcmVlemVBbGxQbHVnaW5Db25maWcge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZztcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVDb25maWcobmV3Q2ZnOiBQYXJ0aWFsPEZyZWV6ZUFsbFBsdWdpbkNvbmZpZz4pIHtcbiAgICB0aGlzLmNvbmZpZyA9IHsgLi4udGhpcy5jb25maWcsIC4uLm5ld0NmZyB9O1xuICAgIHRoaXMubm90aWZ5KCk7XG4gIH1cblxuICBwdWJsaWMgc3Vic2NyaWJlKGNiOiAoKSA9PiB2b2lkKTogKCkgPT4gdm9pZCB7XG4gICAgdGhpcy5saXN0ZW5lcnMucHVzaChjYik7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHRoaXMubGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnMuZmlsdGVyKGwgPT4gbCAhPT0gY2IpO1xuICAgIH07XG4gIH1cblxuICBwcml2YXRlIG5vdGlmeSgpIHtcbiAgICBzYWZlU3RvcmFnZS5zZXQoJ3NlbnRpbmVsX2ZyZWV6ZWFsbF9wcm9jZXNzZXMnLCB0aGlzLnByb2Nlc3Nlcyk7XG4gICAgc2FmZVN0b3JhZ2Uuc2V0KCdzZW50aW5lbF9mcmVlemVhbGxfY29uZmlnJywgdGhpcy5jb25maWcpO1xuICAgIHRoaXMubGlzdGVuZXJzLmZvckVhY2goY2IgPT4gY2IoKSk7XG4gIH1cblxuICBwdWJsaWMgc2Nhbk5vdygpOiBTY2FubmVkT3ZlcmxheVByb2Nlc3NbXSB7XG4gICAgdGhpcy5zY2FuQ291bnQgKz0gMTtcbiAgICAvLyBLZWVwIG1vY2sgcmVhbGlzdGljIHdpdGggc2xpZ2h0IENQVSB2YXJpYXRpb25zXG4gICAgdGhpcy5wcm9jZXNzZXMgPSB0aGlzLnByb2Nlc3Nlcy5tYXAocCA9PiAoe1xuICAgICAgLi4ucCxcbiAgICAgIGNwdVVzYWdlOiBwLnN0YXR1cyA9PT0gJ0ZST1pFTl9JTl9SQU0nID8gMC4wIDogTWF0aC5yb3VuZCgoMTUgKyBNYXRoLnJhbmRvbSgpICogMzApICogMTApIC8gMTBcbiAgICB9KSk7XG4gICAgdGhpcy5ub3RpZnkoKTtcbiAgICByZXR1cm4gdGhpcy5wcm9jZXNzZXM7XG4gIH1cblxuICBwdWJsaWMgZnJlZXplQWxsKCk6IG51bWJlciB7XG4gICAgdGhpcy5wcm9jZXNzZXMgPSB0aGlzLnByb2Nlc3Nlcy5tYXAocCA9PiAoe1xuICAgICAgLi4ucCxcbiAgICAgIHN0YXR1czogJ0ZST1pFTl9JTl9SQU0nLFxuICAgICAgY3B1VXNhZ2U6IDAuMFxuICAgIH0pKTtcbiAgICB0aGlzLm5vdGlmeSgpO1xuICAgIHJldHVybiB0aGlzLnByb2Nlc3Nlcy5sZW5ndGg7XG4gIH1cblxuICBwdWJsaWMgcmVzdW1lQWxsKCk6IG51bWJlciB7XG4gICAgdGhpcy5wcm9jZXNzZXMgPSB0aGlzLnByb2Nlc3Nlcy5tYXAocCA9PiAoe1xuICAgICAgLi4ucCxcbiAgICAgIHN0YXR1czogJ1JFU1VNRUQnLFxuICAgICAgY3B1VXNhZ2U6IE1hdGgucm91bmQoKDEwICsgTWF0aC5yYW5kb20oKSAqIDIwKSAqIDEwKSAvIDEwXG4gICAgfSkpO1xuICAgIHRoaXMubm90aWZ5KCk7XG4gICAgcmV0dXJuIHRoaXMucHJvY2Vzc2VzLmxlbmd0aDtcbiAgfVxuXG4gIHB1YmxpYyBmcmVlemVTaW5nbGVQaWQocGlkOiBudW1iZXIpIHtcbiAgICB0aGlzLnByb2Nlc3NlcyA9IHRoaXMucHJvY2Vzc2VzLm1hcChwID0+IFxuICAgICAgcC5waWQgPT09IHBpZCA/IHsgLi4ucCwgc3RhdHVzOiAnRlJPWkVOX0lOX1JBTScsIGNwdVVzYWdlOiAwLjAgfSA6IHBcbiAgICApO1xuICAgIHRoaXMubm90aWZ5KCk7XG4gIH1cblxuICBwdWJsaWMgcmVzdW1lU2luZ2xlUGlkKHBpZDogbnVtYmVyKSB7XG4gICAgdGhpcy5wcm9jZXNzZXMgPSB0aGlzLnByb2Nlc3Nlcy5tYXAocCA9PiBcbiAgICAgIHAucGlkID09PSBwaWQgPyB7IC4uLnAsIHN0YXR1czogJ1JFU1VNRUQnLCBjcHVVc2FnZTogMTQuNSB9IDogcFxuICAgICk7XG4gICAgdGhpcy5ub3RpZnkoKTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZnJlZXplQWxsUGx1Z2luTWFuYWdlciA9IG5ldyBGcmVlemVBbGxQbHVnaW5NYW5hZ2VyKCk7XG4iXSwibWFwcGluZ3MiOiJBQUFBLFNBQVMsbUJBQW1CO0FBdUJyQixhQUFNLHlCQUFrRDtBQUFBLEVBQzdEO0FBQUEsSUFDRSxLQUFLO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixnQkFBZ0I7QUFBQSxJQUNoQixpQkFBaUIsQ0FBQyxXQUFXLGdCQUFnQjtBQUFBLElBQzdDLGlCQUFpQjtBQUFBLE1BQ2Y7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLFVBQVU7QUFBQSxJQUNWLFVBQVU7QUFBQSxJQUNWLFFBQVE7QUFBQSxJQUNSLGFBQWE7QUFBQSxJQUNiLGdCQUFnQjtBQUFBLEVBQ2xCO0FBQUEsRUFDQTtBQUFBLElBQ0UsS0FBSztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sZ0JBQWdCO0FBQUEsSUFDaEIsaUJBQWlCLENBQUMsVUFBVTtBQUFBLElBQzVCLGlCQUFpQjtBQUFBLE1BQ2Y7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLFVBQVU7QUFBQSxJQUNWLFVBQVU7QUFBQSxJQUNWLFFBQVE7QUFBQSxJQUNSLGFBQWE7QUFBQSxJQUNiLGdCQUFnQjtBQUFBLEVBQ2xCO0FBQUEsRUFDQTtBQUFBLElBQ0UsS0FBSztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sZ0JBQWdCO0FBQUEsSUFDaEIsaUJBQWlCLENBQUMsa0JBQWtCLFNBQVM7QUFBQSxJQUM3QyxpQkFBaUI7QUFBQSxNQUNmO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxVQUFVO0FBQUEsSUFDVixVQUFVO0FBQUEsSUFDVixRQUFRO0FBQUEsSUFDUixhQUFhO0FBQUEsSUFDYixnQkFBZ0I7QUFBQSxFQUNsQjtBQUNGO0FBRU8sZ0JBQVMsOEJBQ2QsU0FDQSxRQUNRO0FBQ1IsUUFBTSxXQUFXLFFBQVEsSUFBSSxPQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssSUFBSTtBQUVsRCxTQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQTBMVDtBQUVBLE1BQU0sdUJBQXVCO0FBQUEsRUFZM0IsY0FBYztBQVhkLFNBQVEsWUFBcUM7QUFDN0MsU0FBUSxTQUFnQztBQUFBLE1BQ3RDLHVCQUF1QjtBQUFBLE1BQ3ZCLGdCQUFnQjtBQUFBLE1BQ2hCLHVCQUF1QjtBQUFBLE1BQ3ZCLDhCQUE4QjtBQUFBLE1BQzlCLHFCQUFxQjtBQUFBLElBQ3ZCO0FBQ0EsU0FBUSxZQUFvQjtBQUM1QixTQUFRLFlBQStCLENBQUM7QUFHdEMsVUFBTSxRQUFRLFlBQVksSUFBNkIsZ0NBQWdDLEtBQUssU0FBUztBQUNyRyxVQUFNLFdBQVcsWUFBWSxJQUEyQiw2QkFBNkIsS0FBSyxNQUFNO0FBQ2hHLFFBQUksTUFBTyxNQUFLLFlBQVk7QUFDNUIsUUFBSSxTQUFVLE1BQUssU0FBUztBQUFBLEVBQzlCO0FBQUEsRUFFTyxlQUF3QztBQUM3QyxXQUFPLEtBQUs7QUFBQSxFQUNkO0FBQUEsRUFFTyxZQUFtQztBQUN4QyxXQUFPLEtBQUs7QUFBQSxFQUNkO0FBQUEsRUFFTyxhQUFhLFFBQXdDO0FBQzFELFNBQUssU0FBUyxFQUFFLEdBQUcsS0FBSyxRQUFRLEdBQUcsT0FBTztBQUMxQyxTQUFLLE9BQU87QUFBQSxFQUNkO0FBQUEsRUFFTyxVQUFVLElBQTRCO0FBQzNDLFNBQUssVUFBVSxLQUFLLEVBQUU7QUFDdEIsV0FBTyxNQUFNO0FBQ1gsV0FBSyxZQUFZLEtBQUssVUFBVSxPQUFPLE9BQUssTUFBTSxFQUFFO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQUEsRUFFUSxTQUFTO0FBQ2YsZ0JBQVksSUFBSSxnQ0FBZ0MsS0FBSyxTQUFTO0FBQzlELGdCQUFZLElBQUksNkJBQTZCLEtBQUssTUFBTTtBQUN4RCxTQUFLLFVBQVUsUUFBUSxRQUFNLEdBQUcsQ0FBQztBQUFBLEVBQ25DO0FBQUEsRUFFTyxVQUFtQztBQUN4QyxTQUFLLGFBQWE7QUFFbEIsU0FBSyxZQUFZLEtBQUssVUFBVSxJQUFJLFFBQU07QUFBQSxNQUN4QyxHQUFHO0FBQUEsTUFDSCxVQUFVLEVBQUUsV0FBVyxrQkFBa0IsSUFBTSxLQUFLLE9BQU8sS0FBSyxLQUFLLE9BQU8sSUFBSSxNQUFNLEVBQUUsSUFBSTtBQUFBLElBQzlGLEVBQUU7QUFDRixTQUFLLE9BQU87QUFDWixXQUFPLEtBQUs7QUFBQSxFQUNkO0FBQUEsRUFFTyxZQUFvQjtBQUN6QixTQUFLLFlBQVksS0FBSyxVQUFVLElBQUksUUFBTTtBQUFBLE1BQ3hDLEdBQUc7QUFBQSxNQUNILFFBQVE7QUFBQSxNQUNSLFVBQVU7QUFBQSxJQUNaLEVBQUU7QUFDRixTQUFLLE9BQU87QUFDWixXQUFPLEtBQUssVUFBVTtBQUFBLEVBQ3hCO0FBQUEsRUFFTyxZQUFvQjtBQUN6QixTQUFLLFlBQVksS0FBSyxVQUFVLElBQUksUUFBTTtBQUFBLE1BQ3hDLEdBQUc7QUFBQSxNQUNILFFBQVE7QUFBQSxNQUNSLFVBQVUsS0FBSyxPQUFPLEtBQUssS0FBSyxPQUFPLElBQUksTUFBTSxFQUFFLElBQUk7QUFBQSxJQUN6RCxFQUFFO0FBQ0YsU0FBSyxPQUFPO0FBQ1osV0FBTyxLQUFLLFVBQVU7QUFBQSxFQUN4QjtBQUFBLEVBRU8sZ0JBQWdCLEtBQWE7QUFDbEMsU0FBSyxZQUFZLEtBQUssVUFBVTtBQUFBLE1BQUksT0FDbEMsRUFBRSxRQUFRLE1BQU0sRUFBRSxHQUFHLEdBQUcsUUFBUSxpQkFBaUIsVUFBVSxFQUFJLElBQUk7QUFBQSxJQUNyRTtBQUNBLFNBQUssT0FBTztBQUFBLEVBQ2Q7QUFBQSxFQUVPLGdCQUFnQixLQUFhO0FBQ2xDLFNBQUssWUFBWSxLQUFLLFVBQVU7QUFBQSxNQUFJLE9BQ2xDLEVBQUUsUUFBUSxNQUFNLEVBQUUsR0FBRyxHQUFHLFFBQVEsV0FBVyxVQUFVLEtBQUssSUFBSTtBQUFBLElBQ2hFO0FBQ0EsU0FBSyxPQUFPO0FBQUEsRUFDZDtBQUNGO0FBRU8sYUFBTSx5QkFBeUIsSUFBSSx1QkFBdUI7IiwibmFtZXMiOltdfQ==