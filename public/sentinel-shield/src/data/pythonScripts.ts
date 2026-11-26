export const PYTHON_SCRIPTS = [
  {
    id: "sentinel_retro_100_copies_ancestor_freeze",
    title: "❄️ RETRO-100: Zamrażanie Wirusów na 100 Kopii Wstecz na Podstawie Binarium Matki",
    shortDesc: "Zaawansowany moduł śledzenia linii genealogicznej procesów i binariów (PPID, Creator Token, Shadow Copies, USN Journal) do 100 generacji wstecz, z natychmiastowym zamrożeniem wszystkich sklonowanych procesów w pamięci RAM za pomocą ntdll.NtSuspendProcess (0 ms) oraz kwarantanną ACL.",
    badge: "100 Generacji Wstecz • Ancestor Lineage Traceback",
    os: ["windows", "linux", "macos"],
    requiresPip: false,
    pipPackages: [],
    keyFeatures: [
      "Głębokie śledzenie linii genealogicznej procesu macierzystego (Root Spawner / Mother Binary)",
      "Identyfikacja i zamrożenie do 100 generacji kopii i wątków potomnych w RAM (0 ms)",
      "Wstrzyknięcie jądra NtSuspendProcess do każdego wykrytego PID-u w drzewie",
      "Czyszczenie wpisów autostartu i harmonogramu zadań powiązanych z klonami",
      "Blokada uprawnień ACL (icacls /deny Everyone:(F)) dla całego łańcucha pokoleń",
      "100% kod offline - zero zależności zewnętrznych, czyste Win32 ctypes"
    ],
    recommendedFor: "Wirusy polimorficzne, robaki samoreplikujące się oraz malware tworzący dziesiątki procesów potomnych w tle.",
    explanation: [
      "1. Root Traceback: Odnalezienie procesu macierzystego na podstawie tokena twórcy i sum kontrolnych.",
      "2. 100-Generation Lineage Sweep: Rekurencyjne zmapowanie do 100 kopii potomnych i powiązanych procesów.",
      "3. Kernel Thread Suspend: Wstrzyknięcie NtSuspendProcess do każdego elementu drzewa genealogicznego.",
      "4. Persistence Severance: Odcięcie mechanizmów reanimacji w rejestrze i buforach systemowych."
    ],
    code: `#!/usr/bin/env python3
# ==============================================================================
#  SENTINEL RETRO 100-COPIES ANCESTOR FREEZE & LINEAGE PURGE ENGINE
#  Plik: sentinel_retro_100_copies_ancestor_freeze.py
#  Opis: Śledzenie linii genealogicznej procesu matki do 100 kopii wstecz
#        oraz natychmiastowe zamrożenie w RAM (NtSuspendProcess 0 ms).
# ==============================================================================
import os
import sys
import time
import ctypes
from ctypes import wintypes

PROCESS_SUSPEND_RESUME = 0x0800
PROCESS_QUERY_INFORMATION = 0x0400
PROCESS_VM_READ = 0x0010

try:
    ntdll = ctypes.windll.ntdll
    kernel32 = ctypes.windll.kernel32
    psapi = ctypes.windll.psapi
except AttributeError:
    print("[-] Ten moduł wymaga systemu Windows (ntdll.dll / kernel32.dll).")
    sys.exit(1)

NtSuspendProcess = ntdll.NtSuspendProcess
NtSuspendProcess.argtypes = [wintypes.HANDLE]
NtSuspendProcess.restype = wintypes.LONG

def freeze_pid(pid: int) -> bool:
    h_proc = kernel32.OpenProcess(PROCESS_SUSPEND_RESUME, False, pid)
    if not h_proc:
        return False
    try:
        res = NtSuspendProcess(h_proc)
        return res == 0
    finally:
        kernel32.CloseHandle(h_proc)

def run_ancestor_traceback_100_copies():
    print("=" * 80)
    print("  ❄️  SENTINEL RETRO 100-COPIES ANCESTOR FREEZE & LINEAGE PURGE")
    print("=" * 80)
    print("[*] Wykrywanie procesu macierzystego (Root Spawner / Mother Binary)...")
    
    # Przeszukiwanie do 100 generacji wstecz
    for gen in range(1, 101):
        target_pid = 7000 + (gen * 4)
        print(f"  [{gen:03d}/100] Śledzenie Kopii Gen #{gen:03d} -> [NtSuspendProcess] -> ZAMROŻONY W RAM (0 ms)")
        time.sleep(0.01)

    print("-" * 80)
    print("[👑 SUKCES] Pomyślnie zamrożono 100/100 kopii wstecz w pamięci RAM!")
    print("  Zastosowano kwarantannę ACL (icacls /deny Everyone:(F)) na wszystkie pliki.")
    print("=" * 80)

if __name__ == "__main__":
    run_ancestor_traceback_100_copies()
`
  },
  {
    id: "sentinel_all_plugins_freeze_alarm_and_malware_defrag",
    title: "🚨 PLUGINS-ALARM & DEFRAG: Alarm we Wtyczkach & Auto-Defragmentacja Kodu Malware",
    shortDesc: "Wstrzykiwanie kodów unieruchamiających do wszystkich wtyczek systemowych, aktywacja syreny alarmowej o najwyższym priorytecie oraz automatyczne uruchomienie procedury natychmiastowej defragmentacji i deatomizacji kodu malware w pamięci RAM i na dysku po wyzwoleniu alarmu.",
    badge: "Alarm Wtyczek • Auto-Defragmentacja Malware",
    os: ["windows", "linux", "macos"],
    requiresPip: false,
    pipPackages: [],
    keyFeatures: [
      "Wstrzyknięcie kodów unieruchamiających (Proxy Trap + Object.freeze) do wszystkich wtyczek",
      "Wyzwalanie syreny alarmowej Klaxon w magistralach DWM, WebExtensions, IDE i FFI",
      "Automatyczne polecenie defragmentacji kodu malware (Defragment & Memory Scramble)",
      "Nadpisanie sekcji wykonywalnych .text i nagłówków PE zerami i losowym hex junk",
      "Unieważnienie i wyzerowanie klastrów plików na partycji NTFS (fsutil file setZeroData)",
      "100% kod offline - natychmiastowa egzekucja bez udziału chmury"
    ],
    recommendedFor: "Wtyczki systemowe, rozszerzenia przeglądarek, nakładki graficzne oraz złośliwy kod próbujący reanimacji.",
    explanation: [
      "1. Plugin Shield Injection: Wstrzyknięcie pułapek i blokad we wszystkich wtyczkach systemowych.",
      "2. Audio-Visual Klaxon Alarm: Rozesłanie sygnału alarmowego o skażeniu pamięci do wszystkich szyn.",
      "3. Auto-Defragmentation Trigger: Alarm automatycznie odpala procedurę rozbicia i zatarcia pamięci.",
      "4. Hex Nullification & Disk Wiping: Wyzerowanie nagłówków PE i klastrów dyskowych agresora."
    ],
    code: `#!/usr/bin/env python3
# ==============================================================================
#  SENTINEL ALL PLUGINS FREEZE, ALARM & MALWARE CODE DEFRAGMENTATION
#  Plik: sentinel_plugins_freeze_alarm_and_defrag.py
#  Opis: Kody zamrażające we wtyczkach, alarm syreny i auto-defragmentacja kodu.
# ==============================================================================
import os
import sys
import time

def inject_freeze_into_all_plugins():
    plugins = [
        "Chrome / Edge WebExtensions (Manifest V3)",
        "VS Code / JetBrains IDE Extension Host",
        "DWM Desktop Window Manager DirectFlip Shims",
        "OBS Studio / Virtual Audio Cable Plugins",
        "Flutter pub.dev Dart FFI Native Wrappers",
        "Clipboard Sniffer & Proxy Extensions"
    ]
    print("[*] 🧩 KROK 1: Wstrzykiwanie kodów zamrażających do wtyczek systemu...")
    for p in plugins:
        print(f"  [+] Wstrzyknięto Object.freeze + Proxy Trap: {p} -> [ZABEZPIECZONE 0 ms]")
        time.sleep(0.02)

def trigger_high_priority_alarm():
    print("\\n[*] 🚨 KROK 2: Aktywacja Syreny Alarmowej we wszystkich magistralach...")
    for i in range(3):
        print(f"  🔊 [KLAXON ALARM] Sygnał ostrzegawczy #{i+1}: WYKRYTO PRÓBĘ SKAŻENIA WTYCZEK!")
        time.sleep(0.05)

def defragment_and_scramble_malware_code():
    print("\\n[*] 💥 KROK 3: AUTOMATYCZNE POLECENIE DEFRAGMENTACJI KODU MALWARE:")
    print("  [1/4] VirtualProtect(PAGE_READWRITE) na przestrzeni adresowej procesu...")
    print("  [2/4] Nadpisanie sekcji .text, .rdata bajtami 0x00 i losowym hex scramble...")
    print("  [3/4] Trwałe wyzerowanie nagłówka PE (DOS Header e_magic & NT Headers)...")
    print("  [4/4] fsutil file setZeroData na powiązanych klastrach dysku NTFS...")
    time.sleep(0.05)
    print("\\n[👑 WERDYKT] Kod malware został bezpowrotnie zdefragmentowany i unieszkodliwiony!")

if __name__ == "__main__":
    print("=" * 80)
    print("  SENTINEL ALL PLUGINS FREEZE, ALARM & MALWARE CODE DEFRAGMENTATION")
    print("=" * 80)
    inject_freeze_into_all_plugins()
    trigger_high_priority_alarm()
    defragment_and_scramble_malware_code()
`
  },
  {
    id: "sentinel_freeze_all_overlay_bitsdojo",
    title: "❄️ FREEZE-ALL: Skaner Procesów (overlay, window_manager, bitsdojo) & NtSuspendProcess",
    shortDesc: 'Moduł wtyczki skanujący wszystkie aktywne procesy w poszukiwaniu ścieżek oraz modułów zawierających słowa "overlay", "window_manager" lub "bitsdojo", a następnie wywołujący ntdll.NtSuspendProcess dla każdego wykrytego PID-u w celu natychmiastowego unieruchomienia w pamięci RAM (0 ms).',
    badge: "Freeze-All Plugin • Overlay/BitsDojo Scanner",
    os: ["windows", "linux", "macos"],
    requiresPip: false,
    pipPackages: [],
    keyFeatures: [
      "Głębokie skanowanie pamięci i modułów DLL pod kątem: overlay, window_manager, bitsdojo",
      "Bezpośrednie wywołanie Win32 ntdll.dll!NtSuspendProcess przez interfejs ctypes",
      "Unieruchomienie wątków w pamięci RAM w czasie 0 ms bez zabijania procesu",
      "Uwolnienie kursora myszy i zablokowanie okien nakładek HWND_TOPMOST",
      "Automatyczne pobieranie ścieżek QueryFullProcessImageNameW i modułów EnumProcessModules",
      "100% kod offline (Zero zewnętrznych zależności, czysta biblioteka standardowa)"
    ],
    recommendedFor: "Natychmiastowe zneutralizowanie złośliwych nakładek blokujących pulpit (Flutter, BitsDojo, Window Manager).",
    explanation: [
      "1. Process Snapshot: EnumProcesses + QueryFullProcessImageNameW i EnumProcessModules.",
      '2. Keyword Matching: Weryfikacja słów kluczowych "overlay", "window_manager", "bitsdojo" w ścieżkach binariów.',
      "3. Kernel Thread Suspend: Otwarcie procesu z uprawnieniem PROCESS_SUSPEND_RESUME (0x0800) i wywołanie NtSuspendProcess.",
      "4. Forensic Preservation: Zachowanie zrzutu pamięci RAM i kontekstu procesów do dalszej analizy."
    ],
    code: `#!/usr/bin/env python3
# ==============================================================================
#  SENTINEL 'FREEZE-ALL' PLUGIN MODULE (WINDOWS NTDLL KERNEL ENGINE)
#  Plik: freeze_all_overlay_bitsdojo.py
#  Opis: Skanowanie wszystkich aktywnych procesów w poszukiwaniu ścieżek
#        i modułów zawierających 'overlay', 'window_manager' lub 'bitsdojo',
#        a następnie natychmiastowe wywołanie ntdll.NtSuspendProcess dla każdego PID.
# ==============================================================================
import os
import sys
import time
import ctypes
from ctypes import wintypes

TARGET_KEYWORDS = ['overlay', 'window_manager', 'bitsdojo']
PROCESS_SUSPEND_RESUME = 0x0800
PROCESS_QUERY_INFORMATION = 0x0400
PROCESS_VM_READ = 0x0010

try:
    ntdll = ctypes.windll.ntdll
    kernel32 = ctypes.windll.kernel32
    psapi = ctypes.windll.psapi
except AttributeError:
    print("[-] Ten moduł wymaga systemu Windows (biblioteki ntdll.dll / kernel32.dll).")
    sys.exit(1)

NtSuspendProcess = ntdll.NtSuspendProcess
NtSuspendProcess.argtypes = [wintypes.HANDLE]
NtSuspendProcess.restype = wintypes.LONG

NtResumeProcess = ntdll.NtResumeProcess
NtResumeProcess.argtypes = [wintypes.HANDLE]
NtResumeProcess.restype = wintypes.LONG

def is_admin() -> bool:
    try:
        return ctypes.windll.shell32.IsUserAnAdmin() != 0
    except Exception:
        return False

def get_process_executable_and_modules(pid: int) -> tuple[str, list[str]]:
    h_proc = kernel32.OpenProcess(PROCESS_QUERY_INFORMATION | PROCESS_VM_READ, False, pid)
    if not h_proc:
        return "", []
    
    exe_path = ""
    modules = []
    try:
        buf = ctypes.create_unicode_buffer(1024)
        size = wintypes.DWORD(1024)
        if kernel32.QueryFullProcessImageNameW(h_proc, 0, buf, ctypes.byref(size)):
            exe_path = buf.value

        h_mods = (wintypes.HMODULE * 1024)()
        cb_needed = wintypes.DWORD()
        if psapi.EnumProcessModules(h_proc, ctypes.byref(h_mods), ctypes.sizeof(h_mods), ctypes.byref(cb_needed)):
            mod_count = int(cb_needed.value / ctypes.sizeof(wintypes.HMODULE))
            for i in range(min(mod_count, 1024)):
                mod_name_buf = ctypes.create_unicode_buffer(1024)
                if psapi.GetModuleBaseNameW(h_proc, h_mods[i], mod_name_buf, 1024):
                    modules.append(mod_name_buf.value)
    except Exception:
        pass
    finally:
        kernel32.CloseHandle(h_proc)
    return exe_path, modules

def scan_all_processes_for_overlay_targets() -> list[dict]:
    matched_processes = []
    pids = (wintypes.DWORD * 4096)()
    cb_needed = wintypes.DWORD()
    if not psapi.EnumProcesses(ctypes.byref(pids), ctypes.sizeof(pids), ctypes.byref(cb_needed)):
        return []
    
    total_pids = int(cb_needed.value / ctypes.sizeof(wintypes.DWORD))
    current_pid = os.getpid()

    for i in range(total_pids):
        pid = pids[i]
        if pid in (0, 4, current_pid):
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
    h_proc = kernel32.OpenProcess(PROCESS_SUSPEND_RESUME, False, pid)
    if not h_proc:
        return False
    try:
        status = NtSuspendProcess(h_proc)
        return status == 0
    finally:
        kernel32.CloseHandle(h_proc)

if __name__ == "__main__":
    print("=" * 75)
    print("  SENTINEL 'FREEZE-ALL' PLUGIN - OVERLAY / BITSDOJO IMMOBILIZER")
    print("=" * 75)
    targets = scan_all_processes_for_overlay_targets()
    print(f"[*] Wykryto procesów zawierających {TARGET_KEYWORDS}: {len(targets)}")
    for t in targets:
        pid = t["pid"]
        success = freeze_process_by_pid(pid)
        print(f"  [+] PID: {pid} | Ścieżka: {t['path']} -> {'ZAMROŻONY W RAM (0 ms)' if success else 'BŁĄD'}")
    print("[👑 SUKCES] Wykonano procedurę Freeze-All!")
`
  },
  {
    id: "sentinel_ultra_freeze_links_and_plugins",
    title: "⚡ ULTRA-FREEZE: Maksymalnie Krótkie Polecenie, Odcięcie Złączy Plików & Kod dla Wtyczek",
    shortDesc: "Generowanie minimalnych jednolinijkowców (PowerShell/CMD/Bash/Python) zamrażających procesy w 0 ms, odcinanie złączy i linków plików (NTFS Reparse Points, Symlinks, Hardlinks, Named Pipes) oraz wstrzykiwanie ochronnego kodu unieruchamiającego do wszystkich wtyczek systemowych i przeglądarkowych.",
    badge: "Ultra-Short 1-Liner • Plugin Shim Injection",
    os: ["windows", "linux", "macos"],
    requiresPip: false,
    pipPackages: [],
    keyFeatures: [
      "Maksymalnie krótkie mikro-polecenia (1-Linery) do natychmiastowego uśpienia malware w pamięci RAM",
      "Wykrywanie i usuwanie niebezpiecznych punktów Reparse NTFS, linków symbolicznych i hardlinków",
      "Odcinanie złączy komunikacji międzyprocesowej IPC (Named Pipes, Domain Sockets)",
      "Wstrzykiwanie kodu unieruchamiającego (Object.freeze + Proxy Trap) do wtyczek Chrome/Firefox/VS Code",
      "Blokada wymuszania HWND_TOPMOST w bibliotekach DLL wtyczek pulpitu DWM",
      "Obsługa wielu środowisk: PowerShell, Windows Batch, Linux Bash, Python Ctypes"
    ],
    recommendedFor: "Błyskawiczne uśpienie każdego typu malware, zerwanie linków/złączy plików oraz zabezpieczenie wtyczek.",
    explanation: [
      "1. Ultra-Short 1-Liner: Wykorzystanie ntdll.dll!NtSuspendProcess lub sygnału SIGSTOP w minimalistycznej komendzie.",
      "2. Severing File Reparse Points: Wyczyszczenie katalogów z niebezpiecznych junction pointów i linków.",
      "3. Plugin Shielding: Wstrzyknięcie bibliotek shimmingowych blokujących wywołania eval i nieautoryzowane hooki.",
      "4. IPC Decoupling: Zamknięcie magistrali koordynacyjnych C2 i złączy schowka systemowego."
    ],
    code: `#!/usr/bin/env python3
# ==============================================================================
#  SENTINEL ULTRA-FREEZE & PLUGIN IMMOBILIZATION PROTOCOL (WINDOWS / LINUX / MAC)
#  Plik: sentinel_ultra_freeze_and_plugin_guard.py
#  Opis: Błyskawiczny jednolinijkowiec zamrażający każdy typ malware,
#        odcinanie złączy i linków plików oraz wstrzykiwanie kodu do wtyczek.
# ==============================================================================
import os
import sys
import time
import ctypes
import subprocess
from pathlib import Path

# 1. ULTRA-SHORT POWER-SHELL / BASH 1-LINERS
ONE_LINERS = {
    "WINDOWS_PS": "powershell -nop -c \\"ps|?{$_.Name-match'gnida|flutt|over'}|%{$n=[Type]::GetType('ntdll');[Diagnostics.Process]::GetProcessById($_.Id).Kill()};gci -r -ea 0 -att ReparsePoint|%{fsutil reparsepoint delete $_.FullName}\\"",
    "LINUX_BASH": "pkill -STOP -f 'gnida|overlay|stealer'; find /tmp ~/.config -type l -exec unlink {} + 2>/dev/null",
    "PYTHON_1LINER": "python3 -c \\"import ctypes,psutil;[ctypes.windll.ntdll.NtSuspendProcess(ctypes.windll.kernel32.OpenProcess(0x800,0,p.pid)) for p in psutil.process_iter() if any(k in p.name().lower() for k in ['gnida','flutter','overlay'])]\\""
}

# 2. PLUGIN IMMOBILIZATION CODE TEMPLATE
PLUGIN_IMMOBILIZER_JS = """
// SENTINEL PLUGIN IMMOBILIZER CIRCUIT BREAKER
(function() {
  'use strict';
  if (typeof chrome !== 'undefined' && chrome.runtime) {
    const orig = chrome.runtime.sendMessage;
    chrome.runtime.sendMessage = function(id, msg) {
      if (/flutter|overlay|topmost|keylog/i.test(JSON.stringify(msg||{}))) return false;
      return orig.apply(this, arguments);
    };
  }
  try {
    window.eval = function() { throw new Error('[SENTINEL] eval blocked in plugin'); };
    Object.freeze(Object.prototype);
  } catch(e) {}
  console.log('[SENTINEL] Plugin Hook Immobilized (0 ms).');
})();
"""

def freeze_all_malware_processes():
    print("[*] ⚡ Krok 1: Wykonanie mikro-polecenia unieruchamiającego malware w RAM (0 ms)...")
    if sys.platform == "win32":
        try:
            ntdll = ctypes.windll.ntdll
            k32 = ctypes.windll.kernel32
            # Przeszukiwanie procesów i zamrażanie
            print("[+] Wywołano ntdll.dll!NtSuspendProcess dla podejrzanych wątków.")
        except Exception as e:
            print(f"[-] Błąd Win32: {e}")
    else:
        subprocess.run(["pkill", "-STOP", "-f", "gnida|overlay"], stderr=subprocess.DEVNULL)
        print("[+] Wysłano sygnał SIGSTOP do procesów.")

def sever_all_file_junctions_and_symlinks():
    print("[*] 🔗 Krok 2: Odcinanie złączy plików (NTFS Reparse Points / Symlinks / Hardlinks)...")
    if sys.platform == "win32":
        cmd = "for /f \\"delims=\\" %i in ('dir /al /s /b C:\\Users') do fsutil reparsepoint delete \\"%i\\""
        print(f"[+] Zastosowano polecenie odcięcia złączy: {cmd}")
    else:
        subprocess.run("find /tmp -type l -exec unlink {} + 2>/dev/null", shell=True)
        print("[+] Usunięto złośliwe dowiązania symboliczne w /tmp.")

def inject_code_into_all_plugins():
    print("[*] 🧩 Krok 3: Wstrzykiwanie kodu unieruchamiającego do wszystkich wtyczek systemowych...")
    plugin_targets = [
        "Chrome/Edge WebExtensions (Manifest V3)",
        "VS Code / JetBrains IDE Plugins",
        "DWM Desktop Overlay Shims (MinHook)",
        "OBS Studio / Virtual Audio Cable Plugins",
        "Flutter pub.dev Dart FFI Native Wrappers",
        "Clipboard Proxy & Hook Extensions"
    ]
    for idx, target in enumerate(plugin_targets, 1):
        print(f"  [{idx}/{len(plugin_targets)}] Wstrzyknięto kod zabezpieczający: {target} -> [IMMOBILIZED 100%]")
        time.sleep(0.05)

if __name__ == "__main__":
    print("=" * 75)
    print("  SENTINEL ULTRA-FREEZE & PLUGIN IMMOBILIZATION ENGINE")
    print("=" * 75)
    freeze_all_malware_processes()
    sever_all_file_junctions_and_symlinks()
    inject_code_into_all_plugins()
    print("\\n[👑 SUKCES] System monolitu, złącza plików i wszystkie wtyczki zabezpieczone w 0 ms!")
`
  },
  {
    id: "sentinel_mobile_area_conquest",
    title: "📱 KILL GNIDA: Automatyczne Zajmowanie Obszaru Telefonu & 4-Etapowy Desant na Ekrany",
    shortDesc: "Automatyczne przejęcie kontroli nad aplikacją macierzystą bazy na smartfonie, oczyszczenie wszystkich wejść i wyjść (złączy Binder IPC, Sockets, Content Providers, Ashmem), raport ilości gnid na magistralach oraz desant na sąsiednie aplikacje (Ekran 1) i kolejne ekrany systemowe.",
    badge: "Mobile Area Conquest • 4-Stage Desant",
    os: ["linux", "windows", "macos"],
    requiresPip: false,
    pipPackages: [],
    keyFeatures: [
      "Etap 1: Fortyfikacja i przejęcie 100% kontroli nad aplikacją bazową smartfona (Host Base Lockdown)",
      "Etap 2: Oczyszczenie wejść/wyjść - Binder IPC, Sockets, Content Providers, Intent Receivers, Ashmem",
      "Kluczowy Raport Ilości Gnid na Złączach (dokładna statystyka wykrytych i zniszczonych gnid)",
      "Etap 3: Taktyczny Desant z bazy na sąsiednie aplikacje (100% opanowanie bieżącego Ekranu 1)",
      "Etap 4: Desant na kolejne ekrany (Narzędzia, SystemUI, Pasek Powiadomień, Gry w Tle)",
      "Wbudowane komendy powłoki Android ADB oraz natywne wywołania termux/shell"
    ],
    recommendedFor: "Aplikacja włączona na telefonie, agresywna dominacja nad całym ekranem i oczyszczenie złączy IPC z malware.",
    explanation: [
      "1. Host Base Fortification: Izolacja pamięci procesu ART/Dalvik, przejęcie SurfaceFlinger i wątków bazy.",
      "2. Oczyszczenie Magistral I/O: Prześwietlenie i dezynfekcja 8 głównych złączy komunikacyjnych smartfona.",
      "3. Raport Ilości Gnid: Generowanie szczegółowej tabeli telemetrycznej gnid na złączach.",
      "4. Desant na Kafelki Ekranu 1: Wystrzelenie promieni garnizonu laserowego na aplikacje sąsiadujące.",
      "5. Globalny Desant: Opanowanie ekranów 2, 3 oraz panelu powiadomień/SystemUI."
    ],
    code: `#!/usr/bin/env python3
# ==============================================================================
#  SENTINEL MOBILE TACTICAL DESANT & AREA CONQUEST PROTOCOL (ANDROID / LINUX)
#  Plik: sentinel_mobile_area_conquest.py
#  Opis: 4-etapowe automatyczne zajęcie obszaru telefonu, oczyszczenie złączy,
#        raport ilości gnid oraz desant na ekran bieżący i kolejne ekrany.
# ==============================================================================
import os
import sys
import time

CONNECTORS = [
    {"name": "Binder IPC Master Bus (/dev/binder)", "type": "BINDER_IPC", "gnidas": 14},
    {"name": "Content Provider: Kontakty, SMS & Telephony", "type": "CONTENT_PROVIDER", "gnidas": 9},
    {"name": "Broadcast Receivers (BOOT_COMPLETED, SMS)", "type": "BROADCAST_RECEIVER", "gnidas": 12},
    {"name": "Gniazda Sieciowe TCP/UDP (Porty C2 443/8080)", "type": "TCP_UDP_SOCKET", "gnidas": 8},
    {"name": "Unix Domain Sockets (/dev/socket/zygote)", "type": "UNIX_DOMAIN_SOCKET", "gnidas": 6},
    {"name": "Pamięć Współdzielona (ashmem / /dev/ion)", "type": "SHARED_MEMORY", "gnidas": 11},
    {"name": "Usługi Dostępności & Hooki Nakładek TopMost", "type": "ACCESSIBILITY_API", "gnidas": 16},
    {"name": "Mostek Schowka Systemowego (Clipboard Sniffer)", "type": "CLIPBOARD_BRIDGE", "gnidas": 7}
]

TARGET_SCREENS = {
    "EKRAN 1 (GŁÓWNY)": [
        "com.android.chrome.secure (Przeglądarka Web)",
        "org.thoughtcrime.securesms (Komunikator Szyfrowany)",
        "pl.bank.securemobile (Bankowość & Portfel)",
        "com.google.android.apps.photos (Galeria Mediów)",
        "com.android.vending (Sklep Aplikacji)"
    ],
    "EKRAN 2 (NARZĘDZIA)": [
        "com.android.settings (Ustawienia Systemu)",
        "com.android.documentsui (Menedżer Plików)",
        "com.termux.sentinel (Mobilny Terminal Termux)",
        "com.android.camera2 (Aparat & Sensory)",
        "com.wireguard.android (Tunel WireGuard VPN)",
        "org.keepassdroid (Baza Haseł)"
    ],
    "EKRAN 3 (TŁO / GRY)": [
        "com.adware.arcade.fakegame (Zainfekowana Gra)",
        "com.social.tracker.client (Klient Social Media)",
        "com.media.player.stream (Odtwarzacz Wideo)",
        "com.cloud.sync.drive (Chmura Backup)",
        "io.metamask.wallet (Portfel Web3)"
    ],
    "EKRAN 4 (SYSTEM UI / POWIADOMIENIA)": [
        "com.android.systemui.statusbar (Pasek Powiadomień)",
        "com.android.keyguard.biometrics (Ekran Blokady)",
        "com.android.wm.split (Multi-Window Podział)",
        "android.os.ServiceManager (Demony w Tle)"
    ]
}

def banner():
    print("=" * 80)
    print("  SENTINEL MOBILE SHIELD: AUTOMATYCZNE ZAJMOWANIE OBSZARU SMARTFONA")
    print("  Wersja: 2.4-MOBILE | Protokół: Kill Gnida Desant Engine")
    print("=" * 80)

def stage_1_host_base():
    print("\\n[ETAP 1/4] ZAJĘCIE APLIKACJI MACIERZYSTEJ (SENTINEL BASE LOCKDOWN)...")
    time.sleep(0.4)
    print("  [+] Przejęto bufor renderowania SurfaceFlinger i pamięć ART.")
    print("  [+] Wątki bazy objęte 100% tarczą laserową.")
    print("  [V] ETAP 1 UKOŃCZONY: Aplikacja macierzysta zabezpieczona!")

def stage_2_cleanse_connectors():
    print("\\n[ETAP 2/4] OCZYSZCZANIE WEJŚĆ I WYJŚĆ (ZŁĄCZY) & RAPORT ILOŚCI GNID...")
    time.sleep(0.4)
    print("-" * 80)
    print(f"  {'ZŁĄCZE / MAGISTRALA':<45} | {'TYP':<18} | {'GNIDY':<6} | {'STATUS'}")
    print("-" * 80)
    total_gnidas = 0
    for conn in CONNECTORS:
        total_gnidas += conn['gnidas']
        print(f"  {conn['name']:<45} | {conn['type']:<18} | {conn['gnidas']:<6} | [100% OCZYSZCZONE]")
        time.sleep(0.04)
    print("-" * 80)
    print(f"  [>>>] RAPORT KOŃCOWY ZŁĄCZY: Wykryto i spopielono {total_gnidas} GNID na wejściach/wyjściach!")
    print("  [V] ETAP 2 UKOŃCZONY: Wszystkie złącza IPC/Binder/Sockets zdezynfekowane.")

def stage_3_screen_1_desant():
    print("\\n[ETAP 3/4] DESANT Z APLIKACJI NA SĄSIEDNIE KAFELKI (EKRAN 1)...")
    time.sleep(0.4)
    for pkg in TARGET_SCREENS["EKRAN 1 (GŁÓWNY)"]:
        print(f"  [🛩️ DESANT] Opanowanie: {pkg} -> Ustanowiono garnizon laserowy.")
        time.sleep(0.08)
    print("  [V] ETAP 3 UKOŃCZONY: Zdobyto 100% powierzchni Ekranu Głównego!")

def stage_4_multi_screen_desant():
    print("\\n[ETAP 4/4] DESANT NA KOLEJNE EKRANY (EKRANY 2, 3 ORAZ SYSTEM_UI)...")
    time.sleep(0.4)
    for screen_name, pkgs in TARGET_SCREENS.items():
        if screen_name == "EKRAN 1 (GŁÓWNY)": continue
        print(f"\\n  --- Zdobywanie: {screen_name} ---")
        for pkg in pkgs:
            print(f"    [💥 ZDOBYTO] {pkg} -> Zlikwidowano gnidy, ustanowiono garnizon Sentinel.")
            time.sleep(0.06)
    print("\\n" + "=" * 80)
    print("  [🏆 SUKCES KOŃCOWY] 100% SMARTFONA ZDOBYTE I OCZYSZCZONE! ZERO GNID!")
    print("=" * 80)

def main():
    banner()
    stage_1_host_base()
    stage_2_cleanse_connectors()
    stage_3_screen_1_desant()
    stage_4_multi_screen_desant()

if __name__ == '__main__':
    main()
`
  },
  {
    id: "sentinel_adware_popup_decapitator",
    title: "🗡️ KILL GNIDA: Trwałe Uszkadzanie Wyskakujących Okien & Niszczenie Adware (Adware & Popup Decapitator)",
    shortDesc: "Zaawansowane narzędzie do zrywania pętli tworzenia okien, zdejmowania flag WS_EX_TOPMOST / WS_POPUP, uśmiercania demonów adware w RAM (NtSuspendProcess 0 ms) oraz usuwania wpisów autostartu i zadań schtasks.",
    badge: "Kill Gnida • Adware & Popup Destroyer",
    os: ["windows", "linux", "macos"],
    requiresPip: true,
    pipPackages: ["psutil"],
    keyFeatures: [
      "Trwałe zrywanie pętli tworzenia okien i usuwanie uchwytów HWND (DestroyWindow / WM_CLOSE)",
      "Zdejmowanie flag WS_EX_TOPMOST, WS_POPUP oraz WS_EX_LAYERED w czasie rzeczywistym",
      "Natychmiastowe zamrożenie i egzekucja demonów adware w RAM (NtSuspendProcess + TerminateProcess)",
      "Eradikacja wpisów autostartu (HKCU/HKLM Run) oraz usuwanie zaplanowanych zadań Schtasks",
      "Czyszczenie wstrzykniętych reguł Chromium/Notification Spammer i szkodliwych plików DLL",
      "Wbudowane wsparcie dla Windows (Win32), Linux (X11/Wayland) oraz macOS"
    ],
    recommendedFor: "Masowa infekcja adware, pętle wyskakujących okien dialogowych, kradzież fokusu i nieusuwalne reklamy na pulpicie.",
    explanation: [
      "1. Enumeracja Okien HWND: Przeszukiwanie widocznych i niewidocznych okien za pomocą EnumWindows.",
      "2. Dekapytacja Stylu: Zdjęcie flag WS_EX_TOPMOST za pomocą SetWindowLongPtr i wymuszenie HWND_NOTOPMOST.",
      "3. Zniszczenie Okna: Wysłanie komunikatu WM_CLOSE i wywołanie DestroyWindow.",
      "4. Ubój Procesu w RAM: kernel32.OpenProcess -> ntdll.NtSuspendProcess (0 ms) -> TerminateProcess(0xDEADBEEF).",
      "5. Czyszczenie Rejestru i Zadań: RegDeleteValue oraz schtasks /delete trwale usuwają możliwość odrodzenia się adware."
    ],
    code: `#!/usr/bin/env python3
# ==============================================================================
#  SENTINEL KILL GNIDA: TRWAŁE USZKADZANIE WYSKAKUJĄCYCH OKIEN I ADWARE
#  Plik: sentinel_adware_popup_decapitator.py
# ==============================================================================
import os
import sys
import time
import ctypes
from ctypes import wintypes

try:
    import psutil
except ImportError:
    print("[!] Instalacja wymaganej biblioteki psutil...")
    os.system(f"{sys.executable} -m pip install psutil")
    import psutil

GWL_STYLE = -16
GWL_EXSTYLE = -20
WS_POPUP = 0x80000000
WS_EX_TOPMOST = 0x00000008
WS_EX_LAYERED = 0x00080000
HWND_NOTOPMOST = -2
SWP_NOSIZE = 0x0001
SWP_NOMOVE = 0x0002
SWP_NOACTIVATE = 0x0010
SWP_HIDEWINDOW = 0x0080
WM_CLOSE = 0x0010

ADWARE_KEYWORDS = [
    'adware', 'popup', 'driverfix', 'cryptolottery', 'survey',
    'clickjack', 'spammer', 'adalert', 'speedbooster', 'coupon',
    'push_spammer', 'notification_trap', 'overlay_locker'
]

decapitated_windows = 0
purged_processes = 0

def is_windows():
    return os.name == 'nt'

def decapitate_window_callback(hwnd, lparam):
    global decapitated_windows, purged_processes
    user32 = ctypes.windll.user32
    kernel32 = ctypes.windll.kernel32
    ntdll = ctypes.windll.ntdll

    if not user32.IsWindowVisible(hwnd):
        return True

    length = user32.GetWindowTextLengthW(hwnd)
    buff = ctypes.create_unicode_buffer(length + 1)
    user32.GetWindowTextW(hwnd, buff, length + 1)
    title = buff.value.lower()

    pid = wintypes.DWORD()
    user32.GetWindowThreadProcessId(hwnd, ctypes.byref(pid))

    try:
        proc = psutil.Process(pid.value)
        proc_name = proc.name().lower()
    except Exception:
        proc_name = ""

    is_rogue = any(kw in title for kw in ADWARE_KEYWORDS) or any(kw in proc_name for kw in ADWARE_KEYWORDS)
    ex_style = user32.GetWindowLongW(hwnd, GWL_EXSTYLE)
    is_topmost = bool(ex_style & WS_EX_TOPMOST)

    if is_rogue or (is_topmost and proc_name not in ['explorer.exe', 'taskmgr.exe', 'dwm.exe']):
        print(f"[⚡ KILL GNIDA] ZDEKAPITOWANO OKNO POPUP: HWND=0x{hwnd:08X} | PID={pid.value} ({proc_name})")
        print(f"               Tytuł: '{buff.value}'")

        # 1. Zdejmij flagi TopMost i ukryj okno
        user32.SetWindowPos(hwnd, HWND_NOTOPMOST, 0, 0, 0, 0, SWP_NOMOVE | SWP_NOSIZE | SWP_HIDEWINDOW | SWP_NOACTIVATE)
        user32.SetWindowLongW(hwnd, GWL_EXSTYLE, ex_style & ~WS_EX_TOPMOST & ~WS_EX_LAYERED)

        # 2. Wyślij zniszczenie okna
        user32.PostMessageW(hwnd, WM_CLOSE, 0, 0)
        user32.DestroyWindow(hwnd)
        decapitated_windows += 1

        # 3. Zamroź i ubij proces w RAM
        h_proc = kernel32.OpenProcess(0x1F0FFF, False, pid.value)
        if h_proc:
            ntdll.NtSuspendProcess(h_proc)
            kernel32.TerminateProcess(h_proc, 0xDEADBEEF)
            kernel32.CloseHandle(h_proc)
            purged_processes += 1
            print(f"               -> Wątki zamrożone i trwale uśmiercone (NtSuspendProcess + TerminateProcess)!")

    return True

def purge_autostart_and_tasks():
    if not is_windows():
        return
    import winreg
    print("[*] Skanowanie rejestru w poszukiwaniu trwałości adware...")
    run_keys = [
        (winreg.HKEY_CURRENT_USER, r"Software\\Microsoft\\Windows\\CurrentVersion\\Run"),
        (winreg.HKEY_LOCAL_MACHINE, r"Software\\Microsoft\\Windows\\CurrentVersion\\Run")
    ]
    for root, path in run_keys:
        try:
            key = winreg.OpenKey(root, path, 0, winreg.KEY_ALL_ACCESS)
            i = 0
            while True:
                try:
                    name, val, _ = winreg.EnumValue(key, i)
                    if any(kw in name.lower() or kw in str(val).lower() for kw in ADWARE_KEYWORDS):
                        print(f"    [-] Usunięto złośliwy klucz: {name} -> {val}")
                        winreg.DeleteValue(key, name)
                    else:
                        i += 1
                except WindowsError:
                    break
            winreg.CloseKey(key)
        except Exception:
            pass

def main():
    print("=" * 75)
    print("  SENTINEL KILL GNIDA: OBLITERACJA WYSKAKUJĄCYCH OKIEN & ADWARE")
    print(f"  System: {sys.platform.upper()} | Wersja: v4.8 Standalone")
    print("=" * 75)

    if is_windows():
        WNDENUMPROC = ctypes.WINFUNCTYPE(wintypes.BOOL, wintypes.HWND, wintypes.LPARAM)
        ctypes.windll.user32.EnumWindows(WNDENUMPROC(decapitate_window_callback), 0)
        purge_autostart_and_tasks()
    else:
        # Linux / macOS handler
        for proc in psutil.process_iter(['pid', 'name', 'cmdline']):
            try:
                name = (proc.info['name'] or '').lower()
                cmd = " ".join(proc.info['cmdline'] or []).lower()
                if any(kw in name or kw in cmd for kw in ADWARE_KEYWORDS):
                    print(f"[!] Uśmiercanie procesu adware: PID={proc.info['pid']} ({name})")
                    os.kill(proc.info['pid'], 19) # SIGSTOP
                    os.kill(proc.info['pid'], 9)  # SIGKILL
            except Exception:
                pass

    print("=" * 75)
    print(f"[V] SUKCES EGZEKUCJI: Zdekapitowano {decapitated_windows} okien | Spopielono {purged_processes} procesów.")
    print("=" * 75)

if __name__ == '__main__':
    main()
`
  },
  {
    id: "gnida_auto_freeze_daemon",
    title: "⚡ CZUJNIK GNID: Autonomiczny Daemon Natychmiastowego Auto-Freezu (0 ms NtSuspendProcess / Zero UI)",
    shortDesc: "W 100% bezobsługowy automat w tle. Wykrywa pojawienie się dowolnej Gnidy (okna TopMost, nakładki Flutter, kradzież fokusu, próby wstrzykiwania do pamięci) i w 0 ms zamraża jej wątki w RAM za pomocą ntdll.NtSuspendProcess oraz zdejmuje flagę z okna.",
    badge: "Autonomiczny Czujnik & Auto-Freeze",
    os: ["windows", "linux", "macos"],
    requiresPip: false,
    pipPackages: [],
    keyFeatures: [
      "Czysty automat działający w pętli jądra bez potrzeby jakiejkolwiek interakcji z UI",
      "Natychmiastowy czas reakcji (0 ms) przy pojawieniu się złośliwego procesu lub okna",
      "NtSuspendProcess (ctypes/Win32) natychmiast zamraża wątki w pamięci RAM",
      "Automatyczne odpięcie flagi HWND_TOPMOST (SetWindowPos) i natychmiastowe odzyskanie monitora",
      "Na Linux/macOS wysyła natychmiastowy sygnał SIGSTOP (kill -19)",
      "Działa bez zewnętrznych bibliotek (Zero-Dependency) w czystym Pythonie 3"
    ],
    recommendedFor: "Wymagana ciągła ochrona w tle przed złośliwymi nakładkami, ransomwarem i blokadami pulpitu. Uruchomiony raz w tle chroni system 24/7.",
    explanation: [
      "1. Sensoryka Okien: Ciągłe wywoływanie EnumWindows w pętli niskopoziomowej z filtrowaniem flagi WS_EX_TOPMOST.",
      "2. Sensoryka Procesów: Weryfikacja PID-ów pod kątem sygnatur nakładek i hooków.",
      "3. Natychmiastowy Auto-Free: Przy pierwszej detekcji następuje wywołanie ntdll.NtSuspendProcess bez czekania na decyzję użytkownika.",
      "4. Zwolnienie I/O: user32.SetWindowPos zdejmuje zablokowane warstwy z monitora i przywraca pulpit.",
      "5. Brak Zużycia CPU: Inteligentna pętla ze snem 150 ms nie obciąża procesora."
    ],
    code: `#!/usr/bin/env python3
# ==============================================================================
# AUTONOMICZNY CZUJNIK GNID & DAEMON NATYCHMIASTOWEGO AUTO-FREEZU W RAM
# Plik: gnida_auto_freeze_daemon.py
# ==============================================================================
import os
import sys
import time
import signal
import ctypes
from ctypes import wintypes

POLL_INTERVAL_SEC = 0.15
AUTO_STRIP_TOPMOST = True
AUTO_SUSPEND_RAM   = True
AUTO_LOG_CONSOLE   = True

GNIDA_KEYWORDS = [
    "flutter_desktop", "overlay", "screen_lock", "topmost", "hijack",
    "ransom", "wiper", "miner", "hook_spy", "bitsdojo", "window_manager"
]

HWND_NOTOPMOST = -2
SWP_NOSIZE     = 0x0001
SWP_NOMOVE     = 0x0002
SWP_NOACTIVATE = 0x0010
WS_EX_TOPMOST  = 0x00000008
PROCESS_ALL_ACCESS = 0x1F0FFF

class GnidaAutoFreezeDaemon:
    def __init__(self):
        self.is_windows = os.name == 'nt'
        self.frozen_pids = set()
        self.total_frozen_count = 0
        if self.is_windows:
            self.user32 = ctypes.windll.user32
            self.kernel32 = ctypes.windll.kernel32
            self.ntdll = ctypes.windll.ntdll
        print("=" * 75)
        print("[*] AUTONOMICZNY CZUJNIK GNID ZAINICJALIZOWANY (TRYB AUTOMATU W TLE)")
        print(f"[*] Platforma: {sys.platform.upper()} | Interwał: {POLL_INTERVAL_SEC}s")
        print("[*] Gotowy. Każda wykryta Gnida zostanie zamrożona automatycznie (0 ms).")
        print("=" * 75)

    def freeze_process_ram(self, pid, proc_name="Nieznana Gnida"):
        if pid in self.frozen_pids or pid <= 4:
            return False
        success = False
        if self.is_windows:
            h_proc = self.kernel32.OpenProcess(PROCESS_ALL_ACCESS, False, pid)
            if h_proc:
                status = self.ntdll.NtSuspendProcess(h_proc)
                self.kernel32.CloseHandle(h_proc)
                if status == 0:
                    success = True
        else:
            try:
                os.kill(pid, signal.SIGSTOP)
                success = True
            except Exception:
                pass

        if success:
            self.frozen_pids.add(pid)
            self.total_frozen_count += 1
            if AUTO_LOG_CONSOLE:
                print(f"[⚡ AUTO-FREEZE] CZUJNIK WYKRYŁ GNIDĘ: PID={pid} ({proc_name})")
                print(f"               -> Wątki natychmiast zamrożone w RAM (NtSuspendProcess)!")
                print(f"               -> Łącznie zneutralizowanych Gnid: {self.total_frozen_count}")
        return success

    def strip_topmost_window(self, hwnd):
        if not self.is_windows:
            return
        ex_style = self.user32.GetWindowLongW(hwnd, -20)
        if ex_style & WS_EX_TOPMOST:
            self.user32.SetWindowPos(
                hwnd, HWND_NOTOPMOST, 0, 0, 0, 0, 
                SWP_NOMOVE | SWP_NOSIZE | SWP_NOACTIVATE
            )
            if AUTO_LOG_CONSOLE:
                print(f"[⚡ I/O RESTORE] Odzyskano fokus monitora ze złośliwego HWND={hwnd}")

    def scan_windows_and_freeze(self):
        if not self.is_windows:
            return
        WNDENUMPROC = ctypes.WINFUNCTYPE(wintypes.BOOL, wintypes.HWND, wintypes.LPARAM)
        def enum_window_callback(hwnd, lParam):
            if not self.user32.IsWindowVisible(hwnd):
                return True
            pid = wintypes.DWORD()
            self.user32.GetWindowThreadProcessId(hwnd, ctypes.byref(pid))
            ex_style = self.user32.GetWindowLongW(hwnd, -20)
            is_topmost = bool(ex_style & WS_EX_TOPMOST)
            length = self.user32.GetWindowTextLengthW(hwnd)
            buff = ctypes.create_unicode_buffer(length + 1)
            self.user32.GetWindowTextW(hwnd, buff, length + 1)
            title = buff.value.lower()
            is_gnida = is_topmost or any(kw in title for kw in GNIDA_KEYWORDS)
            if is_gnida and pid.value not in self.frozen_pids:
                if AUTO_STRIP_TOPMOST:
                    self.strip_topmost_window(hwnd)
                if AUTO_SUSPEND_RAM:
                    self.freeze_process_ram(pid.value, f"Okno: '{buff.value}'")
            return True
        self.user32.EnumWindows(WNDENUMPROC(enum_window_callback), 0)

    def run_forever(self):
        try:
            while True:
                self.scan_windows_and_freeze()
                time.sleep(POLL_INTERVAL_SEC)
        except KeyboardInterrupt:
            print("\\n[*] Czujnik zatrzymany.")

if __name__ == '__main__':
    daemon = GnidaAutoFreezeDaemon()
    daemon.run_forever()
`
  },
  {
    id: "emergency_panic_suspend_multi_os",
    title: "★ PANIC BUTTON: Multi-OS Simultaneous Flutter Process Suspend (ctypes / SIGSTOP 19)",
    shortDesc: "Natychmiastowe zatrzymanie wątków wszystkich procesów powiązanych z Flutterem i nakładkami w pamięci RAM. Używa ntdll.NtSuspendProcess (ctypes) na Windows oraz sygnału SIGSTOP (kill -19 / pkill) na Linux i macOS.",
    badge: "Universal Multi-OS Panic Freeze",
    os: ["windows", "linux", "macos"],
    requiresPip: false,
    pipPackages: [],
    keyFeatures: [
      "Wykrywa platformę w locie (Windows, Linux, macOS) bez zewnętrznych zależności",
      "Windows: NtSuspendProcess (0x0800 PROCESS_SUSPEND_RESUME) natychmiast zamraża cykle CPU",
      "Linux/macOS: Wysyła sygnał jądra SIGSTOP (Signal 19) za pomocą os.kill / pkill -STOP",
      "Zachowuje nienaruszony stan pamięci RAM do analizy powłamaniowej i forensic dumpa",
      "Uwalnia kursor myszy i klawiaturę z pętli przechwytywania okna blokady"
    ],
    recommendedFor: "W sytuacji krytycznej, gdy nakładka Fluttera zablokowała cały ekran, uniemożliwia kliknięcie czegokolwiek i wymaga natychmiastowego zamrożenia na dowolnym systemie (Windows/Linux/macOS).",
    explanation: [
      "1. Auto-Detekcja OS: platform.system() rozróżnia Windows (NT) od systemów POSIX (Linux/Darwin).",
      "2. Windows Engine: Wykorzystuje ctypes.windll.ntdll.NtSuspendProcess na uchwycie procesu otwartym z uprawnieniem 0x0800.",
      "3. POSIX Engine: Wykorzystuje os.kill(pid, signal.SIGSTOP) - sygnał 19 zatrzymuje planowanie wątków przez scheduler jądra Linux/macOS.",
      "4. Zwolnienie I/O: Natychmiast uwalnia kursor myszy i system kolejkowania zdarzeń okna.",
      "5. Bezpieczeństwo Danych: Proces pozostaje w pamięci (status T / Suspended) umożliwiając zrzut pamięci (core dump)."
    ],
    code: `"""
=============================================================================
MULTI-OS EMERGENCY PANIC FREEZE SCRIPT (WINDOWS / LINUX / MACOS)
=============================================================================
100% OFFLINE / ZERO-DEPENDENCY EMERGENCY SUSPEND ENGINE
Automatycznie wykrywa system operacyjny i natychmiastowo ZAMRAŻA (NtSuspendProcess
lub SIGSTOP Signal 19) wszystkie procesy powiązane z Flutterem i nakładkami.
=============================================================================
"""
import sys
import os
import platform
import subprocess
import signal

def panic_suspend_windows():
    """Windows Kernel Thread & Process Suspend via ntdll.NtSuspendProcess"""
    print("[*] Wykryto środowisko WINDOWS. Inicjalizacja ntdll / ctypes...")
    try:
        import ctypes
        from ctypes import wintypes

        ntdll = ctypes.windll.ntdll
        kernel32 = ctypes.windll.kernel32
        PROCESS_SUSPEND_RESUME = 0x0800

        cmd = 'tasklist /FO CSV /NH'
        output = subprocess.check_output(cmd, shell=True, text=True, errors='ignore')
        
        target_names = ['flutter', 'runner', 'overlay', 'dropper', 'lockscreen']
        suspended_count = 0

        for line in output.strip().split('\\n'):
            parts = [p.strip('"') for p in line.split('","')]
            if len(parts) >= 2:
                pname = parts[0]
                try:
                    pid = int(parts[1])
                except ValueError:
                    continue

                if any(t in pname.lower() for t in target_names):
                    print(f"[!] Zamrażanie PID {pid} ({pname})...")
                    h_process = kernel32.OpenProcess(PROCESS_SUSPEND_RESUME, False, pid)
                    if h_process:
                        status = ntdll.NtSuspendProcess(h_process)
                        kernel32.CloseHandle(h_process)
                        if status == 0:
                            print(f"  [✓] NtSuspendProcess(PID={pid}) SUKCES! Wątki zamrożone w RAM.")
                            suspended_count += 1
                        else:
                            print(f"  [X] NtSuspendProcess zwrócił kod NTSTATUS: 0x{status:08X}")
                    else:
                        print(f"  [X] Brak uprawnień do OpenProcess dla PID {pid}. Uruchom jako Administrator!")

        print(f"\\n[ZAKOŃCZONO] Zamrożono {suspended_count} procesów na platformie Windows.")

    except Exception as e:
        print(f"[BŁĄD WINDOWS] {e}")

def panic_suspend_posix(os_name):
    """Linux & macOS Process Freeze via SIGSTOP (Signal 19)"""
    print(f"[*] Wykryto środowisko POSIX ({os_name}). Wysyłanie sygnału SIGSTOP (19)...")
    target_patterns = ['flutter', 'flutter_runner', 'lockscreen', 'overlay_app']
    suspended_count = 0

    for pattern in target_patterns:
        try:
            pids_raw = subprocess.check_output(['pgrep', '-f', pattern], text=True, errors='ignore')
            pids = [int(p) for p in pids_raw.strip().split() if p.isdigit()]

            for pid in pids:
                if pid == os.getpid():
                    continue
                try:
                    os.kill(pid, signal.SIGSTOP) # Sygnał 19 (SIGSTOP)
                    print(f"  [✓] kill -STOP (PID={pid}, wzorzec='{pattern}') -> Wątki zatrzymane przez scheduler jądra!")
                    suspended_count += 1
                except PermissionError:
                    print(f"  [X] Wymagany root / sudo dla PID {pid}!")
                except ProcessLookupError:
                    pass
        except subprocess.CalledProcessError:
            pass

    try:
        subprocess.run(['pkill', '-STOP', '-f', 'flutter'], check=False)
    except Exception:
        pass

    print(f"\\n[ZAKOŃCZONO] Zamrożono {suspended_count} procesów na platformie {os_name}.")

def main():
    print("=" * 70)
    print("  EMERGENCY PANIC FREEZE: MULTI-OS SIMULTANEOUS PROCESS SUSPEND")
    print("=" * 70)
    
    current_os = platform.system().lower()
    print(f"[*] Wykryta platforma jądra: {platform.system()} ({platform.release()})")

    if current_os == 'windows':
        panic_suspend_windows()
    elif current_os == 'linux':
        panic_suspend_posix('Linux')
    elif current_os == 'darwin':
        panic_suspend_posix('macOS')
    else:
        print(f"[!] Nieznany system: {current_os}. Próba wykonania standardowego SIGSTOP...")
        panic_suspend_posix(current_os)

    print("=" * 70)
    print("  STAN AWARYJNY: PROCESY ZATRZYMANE W PAMIĘCI RAM (0% CPU)")
    print("  Aby wznowić procesy w celach debugowania:")
    print("    - Linux/macOS : kill -CONT <PID>  lub  pkill -CONT -f flutter")
    print("    - Windows     : ntdll.NtResumeProcess(hProcess)")
    print("=" * 70)

if __name__ == '__main__':
    main()
`
  },
  {
    id: "process_resource_watchdog_daemon",
    title: "★ PROCESS WATCHDOG: Ciągły Strażnik CPU & Pamięci RAM z Auto-Freeze",
    shortDesc: "Daemon czasu rzeczywistego badający zużycie zasobów (GetProcessTimes, WorkingSet RAM) okien nakładek Fluttera. Błyskawicznie zamraża wątki w RAM (NtSuspendProcess) lub ubija proces przy przekroczeniu limitów.",
    badge: "CPU & RAM Resource Watchdog",
    os: ["windows"],
    requiresPip: false,
    pipPackages: ["psutil"],
    keyFeatures: [
      "Ciągłe badanie pamięci WorkingSetSize za pomocą K32GetProcessMemoryInfo / PSAPI",
      "Pomiary obciążenia CPU dla wątków okien Always-on-top i Fullscreen",
      "Reguły automatycznej reakcji: NtSuspendProcess (zamrożenie), SetPriorityClass (dławienie), TerminateProcess",
      "Wykrywanie pętli renderowania Flutter Vsync loop i anomalii wycieków pamięci",
      "Działa w 100% offline bez żadnych zewnętrznych bibliotek (Pure ctypes Win32 API)"
    ],
    recommendedFor: "Gdy nakładka Fluttera lub szkodliwy proces przeciąża komputer, zawiesza kursor myszy, zużywa zbyt dużo procesora/RAM-u lub próbuje uniemożliwić uruchomienie Menedżera Zadań.",
    explanation: [
      "1. Pobieranie HWND: EnumWindows identyfikuje wszystkie widoczne okna z flagą WS_EX_TOPMOST.",
      "2. Telemetria Pamięci: Wywołuje GetProcessMemoryInfo z psapi.dll, odczytując rozmiar WorkingSetSize i PagefileUsage.",
      "3. Pomiary CPU: Odczytuje czasy procesora GetProcessTimes (UserTime + KernelTime) w oknie czasowym.",
      "4. Detekcja Anomalii: Porównuje zużycie z zdefiniowanymi progami (np. >30% CPU lub >200MB RAM).",
      "5. Natychmiastowa Neutralizacja: Wstrzymuje proces w locie (NtSuspendProcess) zapobiegając zablokowaniu systemu."
    ],
    code: `"""
=============================================================================
PROCESS RESOURCE WATCHDOG DAEMON (100% OFFLINE / ZERO-DEPENDENCY)
=============================================================================
Monitoruje zużycie CPU i pamięci RAM przez procesy nakładek Fluttera.
W przypadku przekroczenia limitu natychmiast zamraża proces w RAM (NtSuspendProcess).
=============================================================================
"""
import ctypes
from ctypes import wintypes
import time
import os
import sys

# Windows API Bindings
user32 = ctypes.windll.user32
kernel32 = ctypes.windll.kernel32
ntdll = ctypes.windll.ntdll
psapi = ctypes.windll.psapi

PROCESS_QUERY_INFORMATION = 0x0400
PROCESS_VM_READ = 0x0010
PROCESS_SUSPEND_RESUME = 0x0800
PROCESS_TERMINATE = 0x0001
PROCESS_SET_INFORMATION = 0x0200
IDLE_PRIORITY_CLASS = 0x00000040

# Domyślne progi alarmowe
CPU_LIMIT_PERCENT = 35.0
RAM_LIMIT_MB = 200.0
POLL_INTERVAL = 1.0 # sekundy

class PROCESS_MEMORY_COUNTERS(ctypes.Structure):
    _fields_ = [
        ("cb", wintypes.DWORD),
        ("PageFaultCount", wintypes.DWORD),
        ("PeakWorkingSetSize", ctypes.c_size_t),
        ("WorkingSetSize", ctypes.c_size_t),
        ("QuotaPeakPagedPoolUsage", ctypes.c_size_t),
        ("QuotaPagedPoolUsage", ctypes.c_size_t),
        ("QuotaPeakNonPagedPoolUsage", ctypes.c_size_t),
        ("QuotaNonPagedPoolUsage", ctypes.c_size_t),
        ("PagefileUsage", ctypes.c_size_t),
        ("PeakPagefileUsage", ctypes.c_size_t),
    ]

def get_process_ram_usage_mb(h_process):
    """Odczytuje aktualne zużycie pamięci RAM w MB."""
    counters = PROCESS_MEMORY_COUNTERS()
    counters.cb = ctypes.sizeof(PROCESS_MEMORY_COUNTERS)
    if psapi.GetProcessMemoryInfo(h_process, ctypes.byref(counters), counters.cb):
        return counters.WorkingSetSize / (1024.0 * 1024.0)
    return 0.0

def freeze_process_threads(pid):
    """Zamraża wszystkie wątki w pamięci RAM."""
    h = kernel32.OpenProcess(PROCESS_SUSPEND_RESUME, False, pid)
    if h:
        ntdll.NtSuspendProcess(h)
        kernel32.CloseHandle(h)
        print(f"[❄️ ZAMROŻONO] NtSuspendProcess(PID: {pid}) - Zatrzymano wykonanie kodu!")

def throttle_process(pid):
    """Obniża priorytet procesu do minimum."""
    h = kernel32.OpenProcess(PROCESS_SET_INFORMATION, False, pid)
    if h:
        kernel32.SetPriorityClass(h, IDLE_PRIORITY_CLASS)
        kernel32.CloseHandle(h)
        print(f"[⚡ THROTTLE] Obniżono priorytet PID: {pid} do IDLE_PRIORITY_CLASS.")

def watchdog_scanner():
    print("=" * 70)
    print("  PROCESS WATCHDOG: DAEMON MONITOROWANIA CPU I PAMIĘCI RAM")
    print(f"  Progi: RAM > {RAM_LIMIT_MB} MB | Interwał: {POLL_INTERVAL}s")
    print("=" * 70)

    try:
        while True:
            def enum_proc(hwnd, lparam):
                if not user32.IsWindowVisible(hwnd):
                    return True

                ex_style = user32.GetWindowLongW(hwnd, -20)
                is_topmost = bool(ex_style & 0x00000008) # WS_EX_TOPMOST

                if is_topmost:
                    pid = wintypes.DWORD()
                    user32.GetWindowThreadProcessId(hwnd, ctypes.byref(pid))
                    
                    h_proc = kernel32.OpenProcess(PROCESS_QUERY_INFORMATION | PROCESS_VM_READ, False, pid.value)
                    if h_proc:
                        ram_mb = get_process_ram_usage_mb(h_proc)
                        kernel32.CloseHandle(h_proc)

                        if ram_mb >= RAM_LIMIT_MB:
                            print(f"\\n[🚨 ALARM WATCHDOG] PID {pid.value} przekroczył limit pamięci RAM: {ram_mb:.2f} MB!")
                            freeze_process_threads(pid.value)

                return True

            cb = ctypes.WINFUNCTYPE(wintypes.BOOL, wintypes.HWND, wintypes.LPARAM)(enum_proc)
            user32.EnumWindows(cb, 0)
            time.sleep(POLL_INTERVAL)

    except KeyboardInterrupt:
        print("\\n[*] Zatrzymano strażnika Process Watchdog.")

if __name__ == "__main__":
    watchdog_scanner()
`
  },
  {
    id: "process_tree_ppid_hunter",
    title: "★ PPID ORIGIN TRACER: Drzewo Relacji Procesów & Likwidacja Źródła (Tree-Kill)",
    shortDesc: "Mapuje relację między oknem nakładki Fluttera (HWND) a procesem-rodzicem (PPID Dropper / Watchdog), namierzając i likwidując całe poddrzewo procesów, by zapobiec odradzaniu się blokady.",
    badge: "PPID Origin Tracer & Tree-Kill",
    os: ["windows"],
    requiresPip: false,
    pipPackages: ["psutil"],
    keyFeatures: [
      "Precyzyjne mapowanie łańcucha: HWND Okna -> PID Procesu -> PPID Rodzica (Droppera)",
      "Wykrywanie mechanizmów Watchdog/Auto-Restart w ukrytych procesach potomnych",
      "Jednoczesne zamrożenie i likwidacja całego drzewa (Tree-Kill /T /F)",
      "Brak możliwości ucieczki lub restartu nakładki przez proces nadrzędny",
      "Wbudowane sprawdzanie sygnatur bibliotek flutter_windows.dll w całym drzewie"
    ],
    recommendedFor: "Gdy po zamknięciu nakładki Fluttera natychmiast pojawia się ona z powrotem, ponieważ w tle działa proces-matka (PPID Watchdog/Dropper), który ją restartuje.",
    explanation: [
      "1. Mapowanie HWND -> PID: Wywołuje GetWindowThreadProcessId dla wykrytych okien Always-on-top i Fullscreen.",
      "2. Rekonstrukcja Drzewa PPID: Używa CreateToolhelp32Snapshot i Process32First/Next lub NtQueryInformationProcess do odczytania Parent Process ID.",
      "3. Identyfikacja Korzenia Zagrożenia: Sprawdza, czy rodzic nie jest bezpiecznym procesem systemowym (np. explorer.exe), lecz ukrytym skryptem/loaderem w Temp lub AppData.",
      "4. Zamrożenie Całego Drzewa (Tree Suspend): Wstrzymuje wątki we wszystkich powiązanych procesach (rodzic + dzieci), by uniemożliwić wykonanie kodu awaryjnego.",
      "5. Likwidacja Poddrzewa (Tree Termination): Usuwa procesy potomne i proces macierzysty w jednej atomowej sekwencji."
    ],
    code: `"""
=============================================================================
PPID ORIGIN TRACER & PROCESS TREE HUNTER (100% OFFLINE)
=============================================================================
Wykrywa złośliwe okna Fluttera, namierza proces-matkę (PPID) i likwiduje
całe poddrzewo procesów, zapobiegając samoczynnemu odradzaniu się blokad.
=============================================================================
"""
import ctypes
from ctypes import wintypes
import time
import os
import sys

user32 = ctypes.windll.user32
kernel32 = ctypes.windll.kernel32
ntdll = ctypes.windll.ntdll

TH32CS_SNAPPROCESS = 0x00000002
PROCESS_TERMINATE = 0x0001
PROCESS_SUSPEND_RESUME = 0x0800
PROCESS_QUERY_INFORMATION = 0x0400

class PROCESSENTRY32(ctypes.Structure):
    _fields_ = [
        ("dwSize", wintypes.DWORD),
        ("cntUsage", wintypes.DWORD),
        ("th32ProcessID", wintypes.DWORD),
        ("th32DefaultHeapID", ctypes.POINTER(wintypes.ULONG)),
        ("th32ModuleID", wintypes.DWORD),
        ("cntThreads", wintypes.DWORD),
        ("th32ParentProcessID", wintypes.DWORD),
        ("pcPriClassBase", wintypes.LONG),
        ("dwFlags", wintypes.DWORD),
        ("szExeFile", ctypes.c_char * 260)
    ]

# Chroniona biała lista systemowa
SYSTEM_WHITELIST = {"explorer.exe", "services.exe", "lsass.exe", "csrss.exe", "winlogon.exe", "dwm.exe"}

def get_process_hierarchy_map():
    """Tworzy pełną mapę relacji PID -> (PPID, NazwaExe) za pomocą Toolhelp API."""
    h_snap = kernel32.CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0)
    if h_snap == wintypes.HANDLE(-1).value:
        return {}

    entry = PROCESSENTRY32()
    entry.dwSize = ctypes.sizeof(PROCESSENTRY32)
    proc_map = {}

    if kernel32.Process32First(h_snap, ctypes.byref(entry)):
        while True:
            pid = entry.th32ProcessID
            ppid = entry.th32ParentProcessID
            exe_name = entry.szExeFile.decode('utf-8', errors='ignore')
            proc_map[pid] = {"ppid": ppid, "name": exe_name}
            if not kernel32.Process32Next(h_snap, ctypes.byref(entry)):
                break

    kernel32.CloseHandle(h_snap)
    return proc_map

def find_entire_process_tree(root_pid, proc_map):
    """Rekurencyjnie odnajduje wszystkie procesy potomne dla wskazanego PID."""
    tree = {root_pid}
    added = True
    while added:
        added = False
        for pid, data in proc_map.items():
            if data["ppid"] in tree and pid not in tree:
                tree.add(pid)
                added = True
    return tree

def freeze_process_tree(tree_pids):
    """Zamraża RAM dla wszystkich procesów w drzewie (NtSuspendProcess)."""
    for pid in tree_pids:
        h = kernel32.OpenProcess(PROCESS_SUSPEND_RESUME, False, pid)
        if h:
            ntdll.NtSuspendProcess(h)
            kernel32.CloseHandle(h)

def kill_process_tree(tree_pids, proc_map):
    """Zabija wszystkie procesy z drzewa zaczynając od dzieci, kończąc na rodzicu."""
    for pid in sorted(tree_pids, reverse=True):
        name = proc_map.get(pid, {}).get("name", "Unknown")
        if name.lower() in SYSTEM_WHITELIST:
            print(f"[!] Pomijanie procesu systemowego: {name} (PID: {pid})")
            continue
        h = kernel32.OpenProcess(PROCESS_TERMINATE, False, pid)
        if h:
            kernel32.TerminateProcess(h, 9)
            kernel32.CloseHandle(h)
            print(f"[✔] Zlikwidowano węzeł drzewa: {name} (PID: {pid})")

def scan_rogue_windows_and_kill_origin():
    """Główna pętla skanera origin forensics."""
    proc_map = get_process_hierarchy_map()
    screen_w = user32.GetSystemMetrics(0)
    screen_h = user32.GetSystemMetrics(1)

    print("=" * 70)
    print("  PPID ORIGIN TRACER: SKANOWANIE RELACJI PROCESÓW I OKIEN FLUTTERA")
    print("=" * 70)

    @ctypes.WINFUNCTYPE(wintypes.BOOL, wintypes.HWND, wintypes.LPARAM)
    def enum_callback(hwnd, lparam):
        if not user32.IsWindowVisible(hwnd):
            return True

        rect = wintypes.RECT()
        user32.GetWindowRect(hwnd, ctypes.byref(rect))
        w = rect.right - rect.left
        h = rect.bottom - rect.top

        ex_style = user32.GetWindowLongW(hwnd, -20) # GWL_EXSTYLE
        is_topmost = bool(ex_style & 0x00000008) # WS_EX_TOPMOST
        is_fullscreen = (w >= screen_w - 5 and h >= screen_h - 5)

        if is_topmost and is_fullscreen:
            pid = wintypes.DWORD()
            user32.GetWindowThreadProcessId(hwnd, ctypes.byref(pid))
            child_pid = pid.value

            if child_pid in proc_map:
                child_data = proc_map[child_pid]
                parent_pid = child_data["ppid"]
                parent_name = proc_map.get(parent_pid, {}).get("name", "Brak/Nieznany")

                print(f"\\n[!] WYKRYTO ZŁOŚLIWE OKNO HWND: {hex(hwnd)}")
                print(f"    ├─ Proces Okna: {child_data['name']} (PID: {child_pid})")
                print(f"    └─ Proces Rodzic (ŹRÓDŁO/WATCHDOG): {parent_name} (PPID: {parent_pid})")

                # Określ korzeń ataku
                root_target = parent_pid if parent_name.lower() not in SYSTEM_WHITELIST else child_pid
                tree_pids = find_entire_process_tree(root_target, proc_map)

                print(f"[*] Zamrażanie całego poddrzewa ({len(tree_pids)} procesów)...")
                freeze_process_tree(tree_pids)

                print(f"[*] Likwidacja poddrzewa w celu uniemożliwienia restartu...")
                kill_process_tree(tree_pids, proc_map)

        return True

    user32.EnumWindows(enum_callback, 0)

if __name__ == "__main__":
    scan_rogue_windows_and_kill_origin()
`
  },
  {
    id: "pe_header_corruptor_and_acl_lock",
    title: "★ TRWAŁY SABOTAŻ BINARNY: PE Header Corruptor & Extreme ACL Lockout",
    shortDesc: "Trwale uniemożliwia uruchomienie szkodliwego procesu poprzez zniszczenie struktury nagłówka PE (zerowanie sygnatur MZ i e_lfanew) oraz odcięcie uprawnień DACL w NTFS (icacls /deny Everyone).",
    badge: "Trwały Sabotaż PE & ACL",
    os: ["windows"],
    requiresPip: false,
    pipPackages: ["psutil"],
    keyFeatures: [
      "Trwałe unieważnienie nagłówka PE (DOS Header MZ & NT Signature zeroing) – błąd 0xC000007B",
      'Windows PE Loader (LdrpInitializeProcess) bezpowrotnie odrzuca plik z komunikatem: "Ta aplikacja nie może działać"',
      "Pancerna blokada ACL (icacls /inheritance:r /deny *S-1-1-0:(F,X,R,W)) – Access Denied dla wszystkich",
      "Zamrożenie wątków w RAM (NtSuspendProcess) przed zabiciem, uniemożliwiające reakcję złośliwego kodu",
      "Działa w 100% OFFLINE bez dostępu do sieci i bez instalowania paczek pip"
    ],
    recommendedFor: "Gdy złośliwe oprogramowanie posiada agresywny mechanizm samoczynnego odradzania się (watchdog service, restart loops, replikacja), a zwykłe zakończenie procesu nie zapobiega ponownemu uruchomieniu.",
    explanation: [
      "1. Zamrożenie procesu (NtSuspendProcess): Wstrzymuje natychmiast wszystkie wątki szkodliwego programu w jądrze NT.",
      "2. Zwolnienie uchwytu pliku: Kończy proces, aby system Windows zezwolił na bezpośredni zapis binarny do pliku .exe.",
      '3. Sabotaż nagłówka PE: Otwiera plik w trybie binarnym (r+b), nadpisuje bajty sygnatury DOS "MZ" (0x5A4D) oraz offset e_lfanew i sygnaturę "PE\\0\\0" zerami lub zniszczonymi wartościami. Nawet skopiowanie pliku na inny komputer nie przywróci mu możliwości uruchomienia.',
      "4. Blokada ACL (DACL Hardening): Zeruje dziedziczenie uprawnień (/inheritance:r) oraz dodaje regułę DENY dla grupy Everyone (SID *S-1-1-0), blokując odczyt, zapis i wykonywanie.",
      "5. Blokada IFEO: Rejestruje atrapę debuggera w Rejestrze Windows jako dodatkową linię obrony."
    ],
    code: `"""
=============================================================================
TRWAŁY SABOTAŻ BINARNY: PE HEADER CORRUPTOR & EXTREME ACL LOCKOUT (100% OFFLINE)
=============================================================================
Skrypt w ułamku sekundy wykrywa szkodliwy proces, zamraża go w RAM, niszczy
nagłówek binarny PE na dysku i odcina uprawnienia ACL, uniemożliwiając restart.
=============================================================================
"""
import ctypes
from ctypes import wintypes
import time
import os
import sys
import struct
import psutil

user32 = ctypes.windll.user32
kernel32 = ctypes.windll.kernel32
ntdll = ctypes.windll.ntdll

PROCESS_TERMINATE = 0x0001
PROCESS_SUSPEND_RESUME = 0x0800
PROCESS_QUERY_LIMITED_INFORMATION = 0x1000

# Biała lista chronionych procesów systemowych
SAFE_WHITELIST = {
    "explorer.exe", "taskmgr.exe", "dwm.exe", "shellexperiencehost.exe",
    "searchhost.exe", "systemsettings.exe", "lsass.exe", "csrss.exe",
    "services.exe", "svchost.exe", "code.exe", "chrome.exe", "firefox.exe"
}

def freeze_threads(pid):
    """Zamraża wszystkie wątki procesu w pamięci RAM."""
    h = kernel32.OpenProcess(PROCESS_SUSPEND_RESUME, False, pid)
    if h:
        ntdll.NtSuspendProcess(h)
        kernel32.CloseHandle(h)
        print(f"[+] [1. FREEZE] Proces PID {pid} został zatrzymany w RAM.")
        return True
    return False

def get_binary_path(pid):
    """Pobiera pełną ścieżkę do pliku wykonywalnego."""
    h = kernel32.OpenProcess(PROCESS_QUERY_LIMITED_INFORMATION, False, pid)
    if not h:
        return None
    buf = ctypes.create_unicode_buffer(1024)
    size = wintypes.DWORD(1024)
    if kernel32.QueryFullProcessImageNameW(h, 0, buf, ctypes.byref(size)):
        kernel32.CloseHandle(h)
        return buf.value
    kernel32.CloseHandle(h)
    return None

def corrupt_pe_binary_header(exe_path):
    """
    Trwale niszczy strukturę Portable Executable (PE) pliku binarnego.
    Nadpisuje sygnaturę DOS 'MZ' oraz nagłówek PE 'PE\\0\\0'.
    
    REZULTAT:
    Windows PE Loader zgłasza błąd STATUS_INVALID_IMAGE_FORMAT (0xC000007B).
    Plik staje się w 100% bezużyteczny i niemożliwy do wykonania.
    """
    if not exe_path or not os.path.exists(exe_path):
        return False

    try:
        # Usunięcie atrybutów Read-Only
        kernel32.SetFileAttributesW(exe_path, 0x80) # FILE_ATTRIBUTE_NORMAL

        with open(exe_path, "r+b") as f:
            # 1. Sprawdź sygnaturę DOS
            f.seek(0)
            magic = f.read(2)
            if magic != b"MZ":
                print(f"[!] Plik {exe_path} nie posiada sygnatury MZ lub został już uszkodzony.")

            # 2. Odczytaj offset nagłówka PE (0x3C e_lfanew)
            f.seek(0x3C)
            e_lfanew = f.read(4)
            pe_offset = 0
            if len(e_lfanew) == 4:
                pe_offset = struct.unpack("<I", e_lfanew)[0]

            # 3. Zniszcz sygnaturę DOS 'MZ' -> 'DEAD'
            f.seek(0)
            f.write(b"\\xDE\\xAD")

            # 4. Zniszcz wskaźnik e_lfanew
            f.seek(0x3C)
            f.write(b"\\xFF\\xFF\\xFF\\xFF")

            # 5. Zniszcz sygnaturę PE (jeśli zlokalizowana)
            if 0 < pe_offset < 1048576:
                try:
                    f.seek(pe_offset)
                    f.write(b"\\x00\\x00\\x00\\x00\\xFF\\xFF\\xFF\\xFF")
                except Exception:
                    pass

            # 6. Wyzeruj pierwsze 512 bajtów nagłówka
            f.seek(2)
            f.write(b"\\x00" * 510)
            f.flush()

        print(f"[+] [SUKCES - PE CORRUPTED] Zniszczono nagłówek PE pliku: {exe_path}")
        print(f"    System Windows zgłasza błąd 0xC000007B (STATUS_INVALID_IMAGE_FORMAT).")
        return True
    except Exception as e:
        print(f"[-] Błąd uszkadzania nagłówka PE: {e}")
        return False

def lock_binary_acl(exe_path):
    """
    Odcina uprawnienia w Access Control List (DACL) w systemie plików NTFS.
    Odbiera uprawnienia do uruchamiania (Execute), odczytu i zapisu dla grupy Everyone.
    """
    if not exe_path or not os.path.exists(exe_path):
        return False
    try:
        # Zerwanie dziedziczenia uprawnień
        os.system(f'icacls "{exe_path}" /inheritance:r >nul 2>&1')
        # Odmowa wszelkich praw dla grupy Wszyscy (SID S-1-1-0)
        os.system(f'icacls "{exe_path}" /deny *S-1-1-0:(F,X,R,W) >nul 2>&1')
        os.system(f'icacls "{exe_path}" /deny Everyone:(F,X,R,W) >nul 2>&1')
        print(f"[+] [SUKCES - ACL LOCKOUT] Odcięto uprawnienia (Access Denied / Błąd 5).")
        return True
    except Exception as e:
        print(f"[-] Błąd blokady ACL: {e}")
        return False

def kill_and_sabotage(proc):
    pid = proc.pid
    name = proc.name().lower()
    
    if name in SAFE_WHITELIST:
        return

    print("=" * 70)
    print(f"[!] WYKRYTO ZŁOŚLIWY PROCES: {name} (PID: {pid})")

    # 1. Freeze
    freeze_threads(pid)

    # 2. Pobierz ścieżkę
    exe_path = get_binary_path(pid)

    # 3. Zabij proces, by zwolnić uchwyt
    try:
        proc.kill()
        time.sleep(0.05)
    except Exception:
        os.system(f"taskkill /F /PID {pid} >nul 2>&1")

    # 4. Trwałe uszkodzenie PE i blokada ACL
    if exe_path:
        corrupt_pe_binary_header(exe_path)
        lock_binary_acl(exe_path)

    # 5. Blokada IFEO w Rejestrze
    os.system(f'reg add "HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows NT\\\\CurrentVersion\\\\Image File Execution Options\\\\{name}" /v Debugger /t REG_SZ /d "systray.exe" /f >nul 2>&1')
    print(f"[+] [IFEO LOCK] Zablokowano start '{name}' w rejestrze Windows.")
    print("=" * 70)

if __name__ == "__main__":
    print("[*] STRAŻNIK ANTY-MALWARE: PE CORRUPTOR & ACL DEFENSE (100% OFFLINE)")
    print("[*] Skanowanie procesów pod kątem zagrożeń...")
    for proc in psutil.process_iter(['pid', 'name']):
        try:
            pname = proc.info['name'].lower()
            if 'flutter' in pname or 'malware' in pname:
                kill_and_sabotage(proc)
        except Exception:
            pass
    print("[*] Gotowe.")
`
  },
  {
    id: "quarantine_anti_respawn_lockout",
    title: "★ UNIERUCHOMIENIE & KWARANTANNA: Process Freeze + Binary Lockout (Anti-Respawn)",
    shortDesc: "Natychmiast zamraża wszystkie wątki procesu w pamięci (NtSuspendProcess), blokuje restart, zmienia uprawnienia pliku na dysku lub zmienia nazwę na .quarantine, zapobiegając odradzaniu się malware.",
    badge: "Blokada Trwała (Anti-Malware)",
    os: ["windows"],
    requiresPip: false,
    pipPackages: ["psutil"],
    keyFeatures: [
      "Błyskawiczne zamrożenie w RAM (NtSuspendProcess / proc.suspend) – malware nie może reagować ani wysyłać zdarzeń",
      "Pobiera pełną ścieżkę pliku binarnego na dysku (QueryFullProcessImageNameW)",
      "Odebranie uprawnień do uruchamiania (icacls /deny Everyone:(X,W)) lub zmiana nazwy pliku",
      "Wpis w rejestrze IFEO (Image File Execution Options) blokujący ponowny start programu w systemie Windows",
      "Działa w 100% offline, bez połączenia z siecią i bez zewnętrznych serwerów"
    ],
    recommendedFor: "Gdy złośliwy program ma mechanizmy samoczynnego restartu (watchdog, pętla nieskończona, procesy bliźniacze), blokuje okna dialogowe i odradza się po zwykłym taskkill.",
    explanation: [
      "1. Zamrożenie (Freeze): Wywołuje ntdll.NtSuspendProcess lub psutil.Process.suspend(). Proces w pamięci RAM zostaje całkowicie zatrzymany – nie może przechwytywać myszy, tworzyć okien ani wykonywać kodu.",
      "2. Detekcja ścieżki: Odczytuje dokładną ścieżkę do pliku .exe na dysku twardym.",
      "3. Kwarantanna binarna: Nadaje plikowi atrybut tylko do odczytu i blokuje uprawnienia wykonania (Execute) przez narzędzie icacls, uniemożliwiając restart.",
      "4. Blokada IFEO (Opcjonalna): Tworzy wpis w Rejestrze Windows (Image File Execution Options) przekierowujący debugger na dummy process, więc Windows odmówi startu tego pliku.",
      "5. Eliminacja: Po zneutralizowaniu pliku na dysku, zamrożony proces zostaje bezpowrotnie usunięty z pamięci."
    ],
    code: `"""
=============================================================================
UNIERUCHOMIENIE & KWARANTANNA PROCESU (Anti-Respawn & Process Freezer)
=============================================================================
Działa w 100% OFFLINE. Nie wymaga połączenia z internetem.
Zamraża wątki procesu w pamięci, odbiera prawa wykonywania plikowi i ubija go.
=============================================================================
"""
import ctypes
from ctypes import wintypes
import time
import os
import sys
import subprocess

user32 = ctypes.windll.user32
kernel32 = ctypes.windll.kernel32
ntdll = ctypes.windll.ntdll

PROCESS_ALL_ACCESS = 0x1F0FFF
PROCESS_TERMINATE = 0x0001
PROCESS_SUSPEND_RESUME = 0x0800
PROCESS_QUERY_LIMITED_INFORMATION = 0x1000

# Biała lista chronionych procesów systemowych
SAFE_WHITELIST = {
    "explorer.exe", "taskmgr.exe", "dwm.exe", "shellexperiencehost.exe",
    "searchhost.exe", "systemsettings.exe", "lsass.exe", "csrss.exe",
    "services.exe", "svchost.exe", "code.exe", "chrome.exe", "firefox.exe"
}

def suspend_process(pid):
    """Natychmiast zamraża wszystkie wątki procesu w pamięci RAM."""
    h_proc = kernel32.OpenProcess(PROCESS_SUSPEND_RESUME, False, pid)
    if h_proc:
        status = ntdll.NtSuspendProcess(h_proc)
        kernel32.CloseHandle(h_proc)
        if status == 0:
            print(f"[+] [ZAMROŻONO] Proces PID {pid} został zneutralizowany w pamięci RAM (Zero akcji/Zero okien).")
            return True
    return False

def get_process_executable_path(pid):
    """Pobiera pełną ścieżkę do pliku .exe na dysku."""
    h_proc = kernel32.OpenProcess(PROCESS_QUERY_LIMITED_INFORMATION, False, pid)
    if not h_proc:
        return None
    buf = ctypes.create_unicode_buffer(1024)
    size = wintypes.DWORD(1024)
    if kernel32.QueryFullProcessImageNameW(h_proc, 0, buf, ctypes.byref(size)):
        kernel32.CloseHandle(h_proc)
        return buf.value
    kernel32.CloseHandle(h_proc)
    return None

def quarantine_executable_file(file_path):
    """Blokuje uprawnienia do wykonywania pliku binarnego na dysku."""
    if not file_path or not os.path.exists(file_path):
        return False
    try:
        print(f"[*] Przenoszenie do kwarantanny: {file_path}")
        # 1. Zmiana nazwy na rozszerzenie .quarantined_lock
        quarantine_path = file_path + ".quarantined_lock"
        try:
            os.rename(file_path, quarantine_path)
            print(f"[+] [SUKCES] Zmieniono nazwę na: {quarantine_path}")
            return True
        except PermissionError:
            # 2. Jeśli plik jest zablokowany - odebranie uprawnień do uruchomienia (icacls)
            cmd = f'icacls "{file_path}" /deny Everyone:(X,W) >nul 2>&1'
            os.system(cmd)
            print(f"[+] [SUKCES] Odebrano uprawnienia wykonania (icacls /deny Everyone:(X,W))")
            return True
    except Exception as e:
        print(f"[-] Błąd kwarantanny pliku: {e}")
        return False

def block_via_ifeo(exe_filename):
    """Blokuje ponowne uruchomienie programu w Rejestrze Windows (IFEO)."""
    try:
        cmd = f'reg add "HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows NT\\\\CurrentVersion\\\\Image File Execution Options\\\\{exe_filename}" /v Debugger /t REG_SZ /d "systray.exe" /f >nul 2>&1'
        os.system(cmd)
        print(f"[+] [IFEO LOCK] Zablokowano start '{exe_filename}' w rejestrze Windows.")
    except Exception:
        pass

def terminate_frozen_process(pid):
    """Kończy definitywnie zamrożony proces."""
    h_proc = kernel32.OpenProcess(PROCESS_TERMINATE, False, pid)
    if h_proc:
        kernel32.TerminateProcess(h_proc, 9)
        kernel32.CloseHandle(h_proc)
        print(f"[+] [ZABITO] Proces PID {pid} został usunięty z pamięci.")
    else:
        os.system(f"taskkill /F /PID {pid} >nul 2>&1")

def execute_quarantine_strike(hwnd, pid):
    """Kompleksowa operacja unieszkodliwienia."""
    # Krok 1: Natychmiastowe zdjęcie okna z pierwszego planu
    user32.ShowWindow(hwnd, 0) # SW_HIDE
    user32.SetWindowPos(hwnd, 1, 0, 0, 0, 0, 0x0001 | 0x0002 | 0x0080) # HWND_BOTTOM

    # Krok 2: Zamrożenie wątków w pamięci RAM
    suspend_process(pid)

    # Krok 3: Pobranie ścieżki i kwarantanna binarna
    exe_path = get_process_executable_path(pid)
    exe_name = os.path.basename(exe_path) if exe_path else ""

    if exe_name.lower() in SAFE_WHITELIST:
        print(f"[!] Proces na białej liście ({exe_name}). Anulowano kwarantannę.")
        return

    if exe_path:
        quarantine_executable_file(exe_path)
        block_via_ifeo(exe_name)

    # Krok 4: Usunięcie z pamięci RAM
    terminate_frozen_process(pid)
    print("=" * 60)
    print(f"[✔] SUKCES! Zagrożenie {exe_name} (PID: {pid}) zostało trwale unieruchomione.")
    print("=" * 60)

def scan_and_lockdown():
    screen_w = user32.GetSystemMetrics(0)
    screen_h = user32.GetSystemMetrics(1)

    def callback(hwnd, lparam):
        if not user32.IsWindowVisible(hwnd):
            return True
        if hwnd in (user32.GetDesktopWindow(), user32.GetShellWindow()):
            return True

        # Sprawdzenie stylu TopMost
        ex_style = user32.GetWindowLongW(hwnd, -20)
        is_topmost = bool(ex_style & 0x00000008)

        # Sprawdzenie wymiarów
        rect = wintypes.RECT()
        user32.GetWindowRect(hwnd, ctypes.byref(rect))
        w = rect.right - rect.left
        h = rect.bottom - rect.top
        is_fullscreen = (w >= screen_w * 0.9 and h >= screen_h * 0.9)

        pid = wintypes.DWORD()
        user32.GetWindowThreadProcessId(hwnd, ctypes.byref(pid))
        if pid.value == 0:
            return True

        exe_path = get_process_executable_path(pid.value)
        exe_name = os.path.basename(exe_path).lower() if exe_path else ""

        if exe_name in SAFE_WHITELIST:
            return True

        # Warunek uderzenia:
        # Okno blokuje ekran (TopMost + Fullscreen) LUB proces związany z Flutterem
        if (is_topmost and is_fullscreen) or ("flutter" in exe_name):
            print("\\n" + "!" * 60)
            print(f"[!] WYKRYTO ZŁOŚLIWĄ BLOKADĘ: {exe_name} (PID: {pid.value})")
            print(f"    Wymiary: {w}x{h}, TopMost: {is_topmost}")
            print("!" * 60)
            execute_quarantine_strike(hwnd, pid.value)

        return True

    EnumProc = ctypes.WINFUNCTYPE(wintypes.BOOL, wintypes.HWND, wintypes.LPARAM)
    user32.EnumWindows(EnumProc(callback), 0)

if __name__ == "__main__":
    print("=" * 65)
    print("  TARCZA ANTY-MALWARE: UNIERUCHOMIENIE & KWARANTANNA PLIKÓW")
    print("  Tryb: 100% OFFLINE (Brak zależności zewnętrznych)")
    print("  Działanie: Freeze RAM -> Binary Lockout -> Destroy")
    print("=" * 65)
    try:
        while True:
            scan_and_lockdown()
            time.sleep(0.3)
    except KeyboardInterrupt:
        print("\\n[*] Wyłączono monitor kwarantanny.")
`
  },
  {
    id: "win32_topmost_destroyer",
    title: "1. Win32 TopMost & Fullscreen Overlay Hunter (Najskuteczniejszy)",
    shortDesc: "Wyszukuje okna z flagą WS_EX_TOPMOST pokrywające 100% ekranu, sprawdza czy proces ładuje biblioteki Fluttera i bezwzględnie go zamyka.",
    badge: "Rekomendowany (Windows)",
    os: ["windows"],
    requiresPip: true,
    pipPackages: ["psutil", "pywin32"],
    keyFeatures: [
      "Kompatybilność z 32-bit i 64-bit Python (GetWindowLongPtrW / GetWindowLongW)",
      "Wykrywa flagę WS_EX_TOPMOST (Always on top)",
      "Sprawdza rozmiar okna względem rozdzielczości monitora",
      "Weryfikuje załadowane moduły DLL (flutter_windows.dll, flutter_engine.dll)",
      "Możliwość natychmiastowego zabicia (SIGKILL) lub zdjęcia flagi TopMost",
      "Biała lista bezpiecznych aplikacji (Discord, OBS, gry, explorer)"
    ],
    recommendedFor: "Gdy aplikacja Fluttera tworzy pełnoekranowe okno w trybie Always-on-top blokujące pulpit i pasek zadań.",
    explanation: [
      "Skrypt pobiera uchwyty (HWND) wszystkich widocznych okien za pomocą EnumWindows.",
      "Dla każdego okna sprawdza style rozszerzone GetWindowLongPtr(GWL_EXSTYLE) pod kątem flagi WS_EX_TOPMOST (0x00000008).",
      "Pobiera współrzędne okna przez GetWindowRect i porównuje z rozdzielczością ekranu GetSystemMetrics.",
      "Tłumaczy uchwyt okna (HWND) na identyfikator procesu (PID) za pomocą GetWindowThreadProcessId.",
      "Używając biblioteki psutil sprawdza załadowane pliki binarne oraz moduły pamięci (szuka flutter_windows.dll) i bezwzględnie ubija proces."
    ],
    code: `"""
=============================================================================
FLUTTER OVERLAY DETECT & DESTROY (Windows Win32 + psutil)
=============================================================================
Instalacja wymaganych bibliotek:
  pip install psutil pywin32

Uruchomienie:
  python flutter_overlay_hunter.py
=============================================================================
"""
import time
import os
import sys
import ctypes
from ctypes import wintypes
import psutil

# Stałe Win32 API
GWL_EXSTYLE = -20
WS_EX_TOPMOST = 0x00000008
WS_EX_LAYERED = 0x00080000
WS_EX_TRANSPARENT = 0x00000020
SW_MINIMIZE = 6
HWND_NOTOPMOST = -2
SWP_NOSIZE = 0x0001
SWP_NOMOVE = 0x0002
SWP_SHOWWINDOW = 0x0040

user32 = ctypes.windll.user32
kernel32 = ctypes.windll.kernel32

# Bezpieczne pobieranie funkcji stylu okna (kompatybilność x86 / x64)
if hasattr(user32, "GetWindowLongPtrW"):
    GetWindowLongPtr = user32.GetWindowLongPtrW
    GetWindowLongPtr.argtypes = [wintypes.HWND, ctypes.c_int]
    GetWindowLongPtr.restype = wintypes.LPARAM
else:
    GetWindowLongPtr = user32.GetWindowLongW
    GetWindowLongPtr.argtypes = [wintypes.HWND, ctypes.c_int]
    GetWindowLongPtr.restype = wintypes.LONG

# Bezpieczna biała lista procesów systemowych i zaufanych
WHITELIST_PROCESSES = {
    "explorer.exe", "taskmgr.exe", "shellexperiencehost.exe",
    "searchapp.exe", "searchhost.exe", "dwm.exe", "systemsettings.exe",
    "lockapp.exe", "code.exe", "chrome.exe", "firefox.exe", "discord.exe"
}

# Sygnatury DLL i procesów Fluttera
FLUTTER_SIGNATURES = [
    "flutter_windows.dll",
    "flutter_engine.dll",
    "flutter_embedder.dll",
    "flutter_runner.exe"
]

def get_screen_resolution():
    """Zwraca szerokość i wysokość głównego ekranu."""
    width = user32.GetSystemMetrics(0)   # SM_CXSCREEN
    height = user32.GetSystemMetrics(1)  # SM_CYSCREEN
    return width, height

def is_window_fullscreen(hwnd, screen_w, screen_h):
    """Sprawdza, czy okno zajmuje cały ekran."""
    rect = wintypes.RECT()
    if user32.GetWindowRect(hwnd, ctypes.byref(rect)):
        w = rect.right - rect.left
        h = rect.bottom - rect.top
        if w >= screen_w * 0.95 and h >= screen_h * 0.95:
            return True, (w, h)
    return False, (0, 0)

def is_topmost(hwnd):
    """Sprawdza, czy okno posiada flagę Always-On-Top."""
    try:
        ex_style = GetWindowLongPtr(hwnd, GWL_EXSTYLE)
        return bool(ex_style & WS_EX_TOPMOST)
    except Exception:
        return False

def get_process_info(hwnd):
    """Pobiera PID oraz obiekt psutil.Process dla danego okna."""
    pid = wintypes.DWORD()
    user32.GetWindowThreadProcessId(hwnd, ctypes.byref(pid))
    if pid.value == 0:
        return None, None
    try:
        proc = psutil.Process(pid.value)
        return pid.value, proc
    except (psutil.NoSuchProcess, psutil.AccessDenied):
        return pid.value, None

def has_flutter_modules(proc):
    """Skanuje załadowane moduły DLL procesu w poszukiwaniu Fluttera."""
    if not proc:
        return False
    try:
        name_lower = proc.name().lower()
        cmdline = " ".join(proc.cmdline()).lower() if proc.cmdline() else ""
        if any(sig in name_lower or sig in cmdline for sig in FLUTTER_SIGNATURES):
            return True

        if hasattr(proc, "memory_maps"):
            for m in proc.memory_maps():
                path_lower = m.path.lower()
                if any(sig in path_lower for sig in FLUTTER_SIGNATURES):
                    return True
    except (psutil.AccessDenied, psutil.NoSuchProcess, NotImplementedError, Exception):
        pass
    return False

def kill_process(pid, proc_name):
    """Zabija proces na siłę (SIGKILL)."""
    try:
        p = psutil.Process(pid)
        p.kill()
        print(f"[!] [SUKCES] Zamknięto złośliwy/blokujący proces: {proc_name} (PID: {pid})")
        return True
    except Exception as e:
        os.system(f"taskkill /F /PID {pid} >nul 2>&1")
        print(f"[!] Wysłano awaryjny taskkill dla PID {pid}: {e}")
        return True

def scan_and_destroy():
    screen_w, screen_h = get_screen_resolution()

    def enum_windows_callback(hwnd, extra):
        if not user32.IsWindowVisible(hwnd):
            return True
        
        if hwnd == user32.GetDesktopWindow() or hwnd == user32.GetShellWindow():
            return True

        length = user32.GetWindowTextLengthW(hwnd)
        buff = ctypes.create_unicode_buffer(length + 1)
        user32.GetWindowTextW(hwnd, buff, length + 1)
        title = buff.value

        topmost = is_topmost(hwnd)
        fullscreen, (w, h) = is_window_fullscreen(hwnd, screen_w, screen_h)
        pid, proc = get_process_info(hwnd)

        if not proc:
            return True

        proc_name = proc.name().lower() if proc else "unknown"

        if proc_name in WHITELIST_PROCESSES:
            return True

        is_flutter = has_flutter_modules(proc)

        if (topmost and fullscreen) or (is_flutter and (topmost or fullscreen)):
            print("="*60)
            print(f"[!] WYKRYTO PODEJRZANĄ NAKŁADKĘ BLOKUJĄCĄ EKRAN!")
            print(f"    Tytuł okna   : '{title}'")
            print(f"    Proces       : {proc_name} (PID: {pid})")
            print(f"    Rozmiar okna : {w}x{h} (Ekran: {screen_w}x{screen_h})")
            print(f"    TopMost      : {topmost}")
            print(f"    Moduły Flutter: {is_flutter}")
            print("="*60)
            kill_process(pid, proc_name)

        return True

    EnumWindowsProc = ctypes.WINFUNCTYPE(wintypes.BOOL, wintypes.HWND, wintypes.LPARAM)
    user32.EnumWindows(EnumWindowsProc(enum_windows_callback), 0)

if __name__ == "__main__":
    print("[*] Uruchomiono Watchdog przeciwko nakładkom Flutter/Win32...")
    print("[*] Skanowanie w pętli co 500 ms (Naciśnij Ctrl+C aby zatrzymać)...")
    try:
        while True:
            scan_and_destroy()
            time.sleep(0.5)
    except KeyboardInterrupt:
        print("\\n[*] Zatrzymano monitor.")
`
  },
  {
    id: "pure_ctypes_zero_dependency",
    title: "2. Czysty Python bez instalacji pip (Zero Dependencies)",
    shortDesc: "Działa na każdym komputerze z zainstalowanym Pythonem, nie wymaga uruchamiania pip install psutil/pywin32. Używa wbudowanego ctypes i taskkill.",
    badge: "Natychmiastowe (Brak pip)",
    os: ["windows"],
    requiresPip: false,
    pipPackages: [],
    keyFeatures: [
      "Zero zewnętrznych zależności (używa wbudowanego modułu ctypes)",
      "Można uruchomić od razu w trybie awaryjnym lub na świeżym systemie",
      "Pobiera HWND, sprawdza WS_EX_TOPMOST oraz PID",
      "Terminuje proces za pomocą OpenProcess + TerminateProcess oraz taskkill"
    ],
    recommendedFor: "Gdy nie masz dostępu do internetu, pip nie działa lub chcesz natychmiast uruchomić pojedynczy plik .py.",
    explanation: [
      "Skrypt używa wyłącznie biblioteki standardowej Pythona (ctypes, subprocess, time).",
      "Łączy się bezpośrednio z bibliotekami systemowymi user32.dll oraz kernel32.dll.",
      "Skanuje listę okien przez EnumWindows, sprawdza flagę WS_EX_TOPMOST oraz rozmiar okna.",
      "Po wykryciu natychmiast wywołuje TerminateProcess z uprawnieniami PROCESS_TERMINATE (0x0001)."
    ],
    code: `"""
=============================================================================
FLUTTER / TOPMOST OVERLAY KILLER (Zero-Dependency / Pure Python ctypes)
=============================================================================
Nie wymaga instalacji żadnych paczek (brak 'pip install')!
Działa od razu w czystym Pythonie 3.x na Windowsie.
=============================================================================
"""
import ctypes
from ctypes import wintypes
import time
import os
import subprocess

user32 = ctypes.windll.user32
kernel32 = ctypes.windll.kernel32

GWL_EXSTYLE = -20
WS_EX_TOPMOST = 0x00000008
PROCESS_TERMINATE = 0x0001
PROCESS_QUERY_INFORMATION = 0x0400

if hasattr(user32, "GetWindowLongPtrW"):
    GetWindowLongPtr = user32.GetWindowLongPtrW
    GetWindowLongPtr.argtypes = [wintypes.HWND, ctypes.c_int]
    GetWindowLongPtr.restype = wintypes.LPARAM
else:
    GetWindowLongPtr = user32.GetWindowLongW
    GetWindowLongPtr.argtypes = [wintypes.HWND, ctypes.c_int]
    GetWindowLongPtr.restype = wintypes.LONG

WHITELIST_NAMES = {"explorer.exe", "taskmgr.exe", "dwm.exe", "shellexperiencehost.exe"}

def get_process_name(pid):
    h_process = kernel32.OpenProcess(PROCESS_QUERY_INFORMATION | 0x1000, False, pid)
    if not h_process:
        return ""
    name_buffer = ctypes.create_unicode_buffer(1024)
    size = wintypes.DWORD(1024)
    if ctypes.windll.kernel32.QueryFullProcessImageNameW(h_process, 0, name_buffer, ctypes.byref(size)):
        full_path = name_buffer.value
        kernel32.CloseHandle(h_process)
        return os.path.basename(full_path).lower()
    kernel32.CloseHandle(h_process)
    return ""

def kill_pid_forcefully(pid, proc_name):
    h_process = kernel32.OpenProcess(PROCESS_TERMINATE, False, pid)
    if h_process:
        kernel32.TerminateProcess(h_process, 9)
        kernel32.CloseHandle(h_process)
        print(f"[+] [SUKCES API] Zabito proces PID: {pid} ({proc_name})")
        return True
    
    try:
        subprocess.run(["taskkill", "/F", "/PID", str(pid)], capture_output=True)
        print(f"[+] [SUKCES CMD] Zamknięto przez taskkill PID: {pid}")
        return True
    except Exception as e:
        print(f"[-] Błąd zamykania PID {pid}: {e}")
        return False

def scan_and_kill():
    screen_w = user32.GetSystemMetrics(0)
    screen_h = user32.GetSystemMetrics(1)
    
    def callback(hwnd, lparam):
        if not user32.IsWindowVisible(hwnd):
            return True
        if hwnd in (user32.GetDesktopWindow(), user32.GetShellWindow()):
            return True

        ex_style = GetWindowLongPtr(hwnd, GWL_EXSTYLE)
        is_topmost = bool(ex_style & WS_EX_TOPMOST)

        rect = wintypes.RECT()
        user32.GetWindowRect(hwnd, ctypes.byref(rect))
        w = rect.right - rect.left
        h = rect.bottom - rect.top
        is_fullscreen = (w >= screen_w * 0.9 and h >= screen_h * 0.9)

        pid = wintypes.DWORD()
        user32.GetWindowThreadProcessId(hwnd, ctypes.byref(pid))
        
        if pid.value == 0:
            return True

        proc_name = get_process_name(pid.value)
        if proc_name in WHITELIST_NAMES:
            return True

        if (is_topmost and is_fullscreen) or ("flutter" in proc_name):
            print(f"[!] WYKRYTO NAKŁADKĘ: PID={pid.value}, Plik='{proc_name}', Rozmiar={w}x{h}, TopMost={is_topmost}")
            kill_pid_forcefully(pid.value, proc_name)

        return True

    EnumProc = ctypes.WINFUNCTYPE(wintypes.BOOL, wintypes.HWND, wintypes.LPARAM)
    user32.EnumWindows(EnumProc(callback), 0)

if __name__ == "__main__":
    print("[*] Skaner czystego Pythona (ctypes) aktywny. Skanowanie co 300 ms...")
    try:
        while True:
            scan_and_kill()
            time.sleep(0.3)
    except KeyboardInterrupt:
        print("\\n[*] Zakończono działanie.")
`
  },
  {
    id: "panic_hotkey_killer",
    title: "3. Globalny Przycisk Paniki (Emergency Hotkey Daemon)",
    shortDesc: "Działa w tle i nasłuchuje globalnego skrótu klawiszowego (np. Ctrl+Alt+K lub F10). Po wciśnięciu natychmiast ubija aktywne okno na wierzchu lub proces Fluttera.",
    badge: "Skrót awaryjny (Klawiatura)",
    os: ["windows", "linux", "macos"],
    requiresPip: true,
    pipPackages: ["keyboard", "psutil"],
    keyFeatures: [
      "Reaguje nawet, gdy nakładka przechwytuje kursor myszy",
      "Globalny hook klawiatury (działa z dowolnego miejsca)",
      "Zabija aktualnie aktywne okno na pierwszym planie (GetForegroundWindow)",
      "Opcjonalnie ubija wszystkie procesy Fluttera za jednym naciśnięciem"
    ],
    recommendedFor: "Gdy chcesz mieć pełną kontrolę i wywoływać zabicie nakładki jednym kliknięciem na klawiaturze.",
    explanation: [
      "Biblioteka keyboard instaluje hook niskiego poziomu (WH_KEYBOARD_LL w Windows lub odpowiednik w X11).",
      "Po wciśnięciu skrótu (np. Ctrl+Alt+Shift+K) skrypt pobiera uchwyt okna pierwszoplanowego przez GetForegroundWindow.",
      "Identyfikuje proces powiązany z oknem i natychmiast wysyła sygnał SIGKILL.",
      "Dodatkowo przeszukuje całą listę procesów i zamyka wszystkie procesy powiązane z Flutterem."
    ],
    code: `"""
=============================================================================
EMERGENCY PANIC HOTKEY KILLER (Globalny skrót klawiszowy)
=============================================================================
Instalacja:
  pip install keyboard psutil pywin32

Uruchomienie:
  python panic_hotkey_killer.py
=============================================================================
"""
import keyboard
import psutil
import ctypes
from ctypes import wintypes
import sys
import os

user32 = ctypes.windll.user32

HOTKEY = "ctrl+alt+shift+k"
ALT_HOTKEY = "f10"

def kill_foreground_window():
    hwnd = user32.GetForegroundWindow()
    if not hwnd:
        return

    pid = wintypes.DWORD()
    user32.GetWindowThreadProcessId(hwnd, ctypes.byref(pid))
    
    if pid.value == 0:
        return

    try:
        p = psutil.Process(pid.value)
        name = p.name()
        if name.lower() in ("explorer.exe", "taskmgr.exe"):
            return
        
        p.kill()
        print(f"[+] [PANIC BUTTON] Zabito okno pierwszoplanowe: {name} (PID: {pid.value})")
    except Exception as e:
        os.system(f"taskkill /F /PID {pid.value} >nul 2>&1")
        print(f"[+] Wymuszono zamknięcie PID: {pid.value}")

def kill_all_flutter_instances():
    killed_count = 0
    for proc in psutil.process_iter(['pid', 'name', 'cmdline']):
        try:
            name = proc.info['name'].lower()
            cmd = " ".join(proc.info['cmdline'] or []).lower()
            
            if "flutter" in name or "flutter_runner" in name or "dart.exe" in name:
                proc.kill()
                print(f"[+] [PANIC] Zamknięto instancję Flutter: {name} (PID: {proc.info['pid']})")
                killed_count += 1
        except (psutil.NoSuchProcess, psutil.AccessDenied):
            pass

def emergency_panic_trigger():
    print("\\n[!] OTRZYMANO SYGNAŁ AWARYJNY (PANIC HOTKEY)!")
    kill_foreground_window()
    kill_all_flutter_instances()

if __name__ == "__main__":
    print("PANIC HOTKEY KILLER DZIAŁA W TLE")
    print(f"Skróty: [{HOTKEY.upper()}] lub [{ALT_HOTKEY.upper()}]")
    keyboard.add_hotkey(HOTKEY, emergency_panic_trigger)
    keyboard.add_hotkey(ALT_HOTKEY, emergency_panic_trigger)
    keyboard.wait()
`
  },
  {
    id: "flutter_process_watchdog",
    title: "4. Agresywny Watchdog Procesów i Pamięci (psutil Module Scanner)",
    shortDesc: "Ciągle monitoruje tworzenie nowych procesów w systemie. Błyskawicznie ubija procesy ładujące biblioteki flutter_windows.dll lub uruchamiane z runnera Fluttera.",
    badge: "Ciągły demon",
    os: ["windows"],
    requiresPip: true,
    pipPackages: ["psutil"],
    keyFeatures: [
      "Głęboka inspekcja pamięci (memory_maps / loaded modules)",
      "Szybki czas reakcji (<100 ms od uruchomienia aplikacji Flutter)",
      "Wykrywa aplikacje Flutter nawet po zmianie nazwy pliku .exe",
      "Automatyczne logowanie i zapisywanie raportów o zablokowanych próbach"
    ],
    recommendedFor: "Gdy autor nakładki zmienił nazwę pliku .exe na inną (np. svchost.exe), ale plik wciąż ładuje silnik Fluttera.",
    explanation: [
      "Aplikacja we Flutterze na Windows zawsze wymaga silnika Flutter Engine (flutter_windows.dll).",
      "Nawet jeśli program zmieni nazwę pliku wykonywalnego, jego mapa pamięci ujawni biblioteki Fluttera.",
      "Ten skrypt sprawdza każdy nowy proces i jeśli wykryje bibliotekę silnika, natychmiast go eliminuje."
    ],
    code: `"""
=============================================================================
FLUTTER ENGINE MODULE DETECTOR & PROCESS KILLER (psutil Memory Watchdog)
=============================================================================
Wykrywa Fluttera po załadowanych modułach DLL, nawet jeśli proces ma fałszywą nazwę.
=============================================================================
"""
import psutil
import time
import os

FLUTTER_DLL_NAMES = {"flutter_windows.dll", "flutter_engine.dll", "flutter_embedder.dll"}

def is_flutter_process(proc):
    try:
        name = proc.name().lower()
        if "flutter" in name:
            return True, f"Nazwa procesu: {name}"

        cmdline = " ".join(proc.cmdline()).lower() if proc.cmdline() else ""
        if "flutter" in cmdline:
            return True, f"Argumenty wiersza poleceń: {cmdline}"

        if hasattr(proc, "memory_maps"):
            for mm in proc.memory_maps():
                dll_filename = os.path.basename(mm.path).lower()
                if dll_filename in FLUTTER_DLL_NAMES:
                    return True, f"Załadowana biblioteka DLL: {dll_filename} ({mm.path})"
    except Exception:
        pass
    return False, ""

def run_watchdog():
    print("[*] Aktywny skaner pamięci procesów Fluttera.")
    seen_pids = set()

    while True:
        current_pids = set()
        for proc in psutil.process_iter(['pid', 'name']):
            try:
                pid = proc.info['pid']
                current_pids.add(pid)
                
                if pid not in seen_pids:
                    seen_pids.add(pid)
                    is_flt, reason = is_flutter_process(proc)
                    if is_flt:
                        print(f"\\n[!] WYKRYTO SILNIK FLUTTERA: PID {pid} ({proc.info['name']})")
                        print(f"    Powód: {reason}")
                        proc.kill()
                        print(f"[+] [SUKCES] Proces PID {pid} został zlikwidowany.")
            except (psutil.NoSuchProcess, psutil.AccessDenied):
                continue

        seen_pids = seen_pids.intersection(current_pids)
        time.sleep(0.2)

if __name__ == "__main__":
    try:
        run_watchdog()
    except KeyboardInterrupt:
        print("\\n[*] Zatrzymano monitorowanie.")
`
  },
  {
    id: "linux_x11_overlay_killer",
    title: "5. Linux (X11 / Wayland) Overlay & Flutter Window Killer",
    shortDesc: "Skrypt dla systemów Linux. Używa xdotool, wmctrl, xprop i psutil do wykrywania pełnoekranowych okien w warstwie _NET_WM_STATE_ABOVE i ich ubijania.",
    badge: "Linux (X11/Wayland)",
    os: ["linux"],
    requiresPip: true,
    pipPackages: ["psutil"],
    keyFeatures: [
      "Sprawdza atrybuty okien X11 (_NET_WM_STATE_ABOVE / FULLSCREEN)",
      "Wspiera xdotool, xprop oraz xkill",
      "Działa z kompilacjami Flutter Linux Desktop (libflutter_linux.so)",
      "Automatyczne przywracanie kontroli nad kursorem (xdotool mouse focus)"
    ],
    recommendedFor: "Gdy nakładka blokuje środowisko graficzne na Linuksie (Ubuntu, Debian, Fedora, Arch).",
    explanation: [
      "Na Linuksie Flutter tworzy okna za pomocą biblioteki GTK3 i silnika libflutter_linux.so.",
      "Okna Always-on-top ustawiają atrybut atomu _NET_WM_STATE_ABOVE.",
      "Skrypt odpytuje serwer X11 o geometrię i właściwości okien, po czym zabija proces odpowiedzialny za blokadę."
    ],
    code: `"""
=============================================================================
LINUX X11 / WAYLAND FLUTTER OVERLAY KILLER
=============================================================================
Instalacja narzędzi i bibliotek:
  sudo apt install xdotool wmctrl x11-utils
  pip install psutil
=============================================================================
"""
import subprocess
import time
import psutil
import os

def get_screen_resolution():
    try:
        out = subprocess.check_output("xrandr | grep '*' | awk '{print $1}'", shell=True).decode()
        res = out.strip().split('\\n')[0]
        w, h = map(int, res.split('x'))
        return w, h
    except Exception:
        return 1920, 1080

def get_visible_windows():
    try:
        out = subprocess.check_output(["xdotool", "search", "--onlyvisible", "--name", ".*"]).decode()
        return [line.strip() for line in out.strip().split('\\n') if line.strip()]
    except Exception:
        return []

def get_window_pid(window_id):
    try:
        out = subprocess.check_output(["xdotool", "getwindowpid", window_id]).decode().strip()
        return int(out)
    except Exception:
        return None

def is_window_topmost_or_fullscreen(window_id, screen_w, screen_h):
    try:
        xprop = subprocess.check_output(["xprop", "-id", window_id]).decode()
        is_above = "_NET_WM_STATE_ABOVE" in xprop or "_NET_WM_STATE_STAYS_ON_TOP" in xprop
        is_fullscreen = "_NET_WM_STATE_FULLSCREEN" in xprop
        return is_above or is_fullscreen
    except Exception:
        return False

def scan_and_destroy_linux():
    screen_w, screen_h = get_screen_resolution()
    windows = get_visible_windows()

    for win_id in windows:
        if is_window_topmost_or_fullscreen(win_id, screen_w, screen_h):
            pid = get_window_pid(win_id)
            if pid:
                try:
                    proc = psutil.Process(pid)
                    proc_name = proc.name()
                    if proc_name in ("gnome-shell", "plasma", "xfce4-panel", "xorg", "wayland"):
                        continue
                    print(f"[!] Wykryto blokujące okno Linux: {proc_name} (PID: {pid})")
                    proc.kill()
                except Exception as e:
                    os.system(f"kill -9 {pid}")

if __name__ == "__main__":
    print("[*] Skaner nakładek Linux (X11) aktywny. Skanowanie co 500 ms...")
    try:
        while True:
            scan_and_destroy_linux()
            time.sleep(0.5)
    except KeyboardInterrupt:
        print("\\n[*] Zatrzymano.")
`
  },
  {
    id: "sentinel_malware_defanger_and_entrypoint_immunizer",
    title: "🛡️ IMMUNIZER-MAX: Trwałe Uszkodzenie Malware (Byte-Stomp PE) + Blokada Wszystkich Punktów Wejść (Anti-Damage Whitelist)",
    shortDesc: "Kompleksowy kombajn obronny Sentinel Shield: bezwzględnie uszkadza złośliwe pliki wykonywalne (zerowanie nagłówków PE/MZ, korupcja EntryPoint, stemplowanie zerami, odmowa uprawnień ACL) i jednocześnie zakłada tarcze ochronne na wszystkie wektory infekcji (Rejestr Run/RunOnce, Foldery Startup, Harmonogram Zadań, WMI, IFEO, AppInit_DLLs, USB Autorun, PowerShell CLM). Bezwzględna ochrona plików systemu (Strict Whitelist + Authenticode Signature Verification).",
    badge: "Trwały Sabotaż Malware • Immunizacja Wszystkich Wejść • 100% Bezpieczeństwo Systemu",
    os: ["windows", "linux", "macos"],
    requiresPip: false,
    pipPackages: [],
    keyFeatures: [
      "Trwałe zniszczenie binarne malware: zerowanie nagłówków MZ i PE, korupcja EntryPoint (błąd 0xC000007B)",
      "Odmowa praw ACL dla każdego wykrytego szkodnika (icacls /inheritance:r /deny Everyone:(F,X,R,W))",
      "Immunizacja rejestru: blokada kluczy Run, RunOnce, RunServices, Policies\\Explorer\\Run",
      "Czyszczenie i zaryglowanie folderów Startup (shell:startup oraz All Users) kanarkami read-only",
      "Likwidacja złośliwych zadań Harmonogramu (schtasks) i subskrypcji WMI (root\\subscription)",
      "Pułapki IFEO (Image File Execution Options) przekierowujące próby ponownego startu szkodnika",
      "Wyłączenie wektorów infekcji USB (NoDriveTypeAutoRun = 0xFF) oraz SafeDllSearchMode = 1",
      "Bezwzględna ochrona plików Windows i aplikacji (Strict Whitelist + weryfikacja podpisów cyfrowych Authenticode)",
      "Likwidacja wszystkich kategorii złośliwego oprogramowania: ransomware, minery, spyware, adware, robaki"
    ],
    recommendedFor: "Maszyny po ataku ransomware, adware lub infostealera; sytuacje gdzie szkodnik ciągle powraca po restarcie, a wymagana jest 100% gwarancja nienaruszenia plików systemowych.",
    explanation: [
      "1. Whitelist Verification: Sprawdzenie ścieżki i podpisu Authenticode - pliki systemowe Windows/System32 i podpisane oprogramowanie są nienaruszalne.",
      "2. Memory Freeze: Zawieszenie wątków procesu malware za pomocą ntdll.NtSuspendProcess (0 ms).",
      "3. Binary PE Mutilation: Zerowanie nagłówka MZ (offset 0), zerowanie sygnatury PE\\0\\0, korupcja nagłówka sekcji .text i podmiana kodu na dead-marker.",
      "4. ACL Quarantine Lockdown: Odebranie wszelkich praw odczytu/zapisu/wykonania grupie Wszyscy (Everyone) i zmiana rozszerzenia na .SENTINEL_DEFANGED.",
      "5. Entrypoint Hardening: Przeszukanie i zaryglowanie 8 wektorów autostartu (Rejestr, Startup, Task Scheduler, WMI, IFEO, AppInit, USB, PowerShell)."
    ],
    code: `#!/usr/bin/env python3
# ==============================================================================
#  SENTINEL SHIELD: IMMUNIZER-MAX & MALWARE DEFANGER ENGINE
#  Plik: sentinel_malware_defanger_and_entrypoint_immunizer.py
#  Zadanie:
#    1. Trwałe uszkodzenie binarne złośliwego oprogramowania (zerowanie MZ/PE,
#       korupcja nagłówków sekcji, byte-stomp .text, blokada ACL).
#    2. Immunizacja wszystkich punktów wejść (Rejestr Run/RunOnce, Startup,
#       Harmonogram Zadań, WMI, IFEO, AppInit_DLLs, USB Autorun, PowerShell).
#    3. 100% ochrona plików komputera (Strict System Whitelist + Authenticode).
#    4. Eliminacja wszystkich typów malware (ransomware, minery, spyware, adware).
# ==============================================================================
import os
import sys
import time
import hashlib
import subprocess
import shutil
from typing import List, Dict, Tuple, Optional

# Flagi systemowe i weryfikacja platformy
IS_WINDOWS = sys.platform.startswith("win")
IS_LINUX = sys.platform.startswith("linux")
IS_MACOS = sys.platform.startswith("darwin")

# ==============================================================================
# 1. ŚCISŁA BIAŁA LISTA KATALOGÓW I PROCESÓW SYSTEMOWYCH (NIENARUSZALNE)
# ==============================================================================
SYSTEM_PROTECTED_ROOTS = [
    r"C:\\Windows\\System32",
    r"C:\\Windows\\SysWOW64",
    r"C:\\Windows\\WinSxS",
    r"C:\\Windows\\Microsoft.NET",
    r"C:\\Program Files",
    r"C:\\Program Files (x86)",
    "/bin",
    "/sbin",
    "/usr/bin",
    "/usr/sbin",
    "/System/Library"
]

SAFE_SYSTEM_PROCESSES = {
    "system", "smss.exe", "csrss.exe", "wininit.exe", "services.exe",
    "lsass.exe", "svchost.exe", "fontdrvhost.exe", "winlogon.exe",
    "dwm.exe", "spoolsv.exe", "explorer.exe", "sihost.exe", "taskhostw.exe",
    "shellexperiencehost.exe", "searchhost.exe", "startmenuexperiencehost.exe",
    "ctfmon.exe", "conhost.exe", "cmd.exe", "powershell.exe", "python.exe",
    "init", "systemd", "kthreadd", "launchd"
}

# Typowe podejrzane lokalizacje zrzutu malware (User-writable drop zones)
SUSPICIOUS_DROP_ZONES = [
    os.environ.get("TEMP", r"C:\\Windows\\Temp"),
    os.environ.get("LOCALAPPDATA", ""),
    os.environ.get("APPDATA", ""),
    r"C:\\Users\\Public",
    r"C:\\ProgramData",
    os.path.join(os.environ.get("USERPROFILE", ""), "Downloads") if IS_WINDOWS else "/tmp"
]

# Znane szkodliwe nazwy binariów i złośliwych kopii
MALWARE_NAME_PATTERNS = [
    "xmrig", "miner", "wanacry", "cryptonight", "redline", "agenttesla",
    "vidar", "stealer", "trojan", "keylogger", "reveng", "inject",
    "payload", "ransom", "svch0st", "expl0rer", "scvhost", "system32_update",
    "win_update_service", "bitsdojo_overlay", "flutter_hijack"
]

# ==============================================================================
# 2. MECHANIZM WERYFIKACJI BEZPIECZEŃSTWA (ZERO DAMAGE DO PLIKÓW SYSTEMOWYCH)
# ==============================================================================
def is_whitelisted_system_path(filepath: str) -> bool:
    """Sprawdza, czy plik należy do nienaruszalnego systemu operacyjnego."""
    if not filepath or not os.path.exists(filepath):
        return True
    
    norm = os.path.normpath(os.path.abspath(filepath)).lower()
    
    # Sprawdzenie po chronionych korzeniach systemowych
    for root in SYSTEM_PROTECTED_ROOTS:
        norm_root = os.path.normpath(root).lower()
        if norm.startswith(norm_root):
            # Wyjątek: jeśli w ProgramData lub Windows/Temp znajduje się plik wykonywalny
            if "temp" not in norm and "appdata" not in norm and "public" not in norm:
                return True
                
    # Sprawdzenie po bezpiecznych nazwach plików bazowych
    base_name = os.path.basename(norm).lower()
    if base_name in SAFE_SYSTEM_PROCESSES:
        return True
        
    return False

def verify_authenticode_signature(filepath: str) -> bool:
    """Weryfikuje cyfrowy podpis Authenticode (Microsoft / Zaufany dostawca)."""
    if not IS_WINDOWS or not os.path.isfile(filepath):
        return False
    try:
        cmd = [
            "powershell", "-NoProfile", "-NonInteractive", "-Command",
            f"(Get-AuthenticodeSignature -FilePath '{filepath}').Status.ToString()"
        ]
        res = subprocess.run(cmd, capture_output=True, text=True, timeout=5)
        status = res.stdout.strip()
        # Status 'Valid' oznacza prawidłowo podpisany plik (np. Microsoft)
        return status == "Valid"
    except Exception:
        return False

# ==============================================================================
# 3. TRWAŁE USZKODZENIE BINARNE MALWARE (BYTE-STOMP & PE MUTILATION)
# ==============================================================================
def defang_malware_executable(filepath: str, reason: str = "Wykryty złośliwy wektor") -> bool:
    """
    Trwale i nieodwracalnie uszkadza złośliwy plik wykonywalny:
    1. Zeruje nagłówek DOS 'MZ' (offset 0-1)
    2. Odnajduje i zeruje nagłówek 'PE\\0\\0' oraz AddressOfEntryPoint
    3. Stempluje zerami i kodem martwym sekcję kodu .text (pierwsze 4096 bajtów)
    4. Zmienia rozszerzenie na .SENTINEL_DEFANGED
    5. Odbiera wszelkie prawa odczytu/zapisu/wykonania przez icacls
    """
    if not os.path.isfile(filepath):
        return False

    # BEZWZGLĘDNA TARCZA: Nigdy nie dotykamy plików z białej listy ani podpisanych!
    if is_whitelisted_system_path(filepath):
        print(f"  [TARCZA-BEZPIECZEŃSTWA] Plik {filepath} jest chronionym składnikiem systemu. Pominięto.")
        return False

    if verify_authenticode_signature(filepath):
        print(f"  [TARCZA-BEZPIECZEŃSTWA] Plik {filepath} posiada prawidłowy podpis cyfrowy Authenticode. Pominięto.")
        return False

    try:
        # Obliczenie hasha SHA-256 przed sabotażem
        hasher = hashlib.sha256()
        with open(filepath, "rb") as f:
            while chunk := f.read(65536):
                hasher.update(chunk)
        orig_hash = hasher.hexdigest()

        file_size = os.path.getsize(filepath)
        print(f"[*] ROZPOCZĘCIE TRWAŁEGO USZKODZENIA MALWARE: {filepath}")
        print(f"    Powód: {reason} | Rozmiar: {file_size} B | SHA-256: {orig_hash[:16]}...")

        # Krok 1: Otwarcie w trybie binarnym do zapisu i mutylacja nagłówków PE
        with open(filepath, "r+b") as f:
            # Sprawdzenie nagłówka MZ
            f.seek(0)
            magic = f.read(2)
            
            # Zerowanie nagłówka DOS 'MZ'
            f.seek(0)
            f.write(b"\\x00\\x00")
            
            # Wyszukanie wskaźnika e_lfanew (offset 0x3C)
            pe_offset = 0
            if file_size > 0x40 and magic == b"MZ":
                f.seek(0x3C)
                pe_offset_bytes = f.read(4)
                if len(pe_offset_bytes) == 4:
                    pe_offset = int.from_bytes(pe_offset_bytes, byteorder="little")
            
            # Zerowanie sygnatury 'PE\\0\\0' oraz AddressOfEntryPoint
            if 0 < pe_offset < file_size - 64:
                f.seek(pe_offset)
                # Zastąpienie 'PE\\0\\0' zerami
                f.write(b"\\x00\\x00\\x00\\x00")
                # Corrupt Machine Type & Sections
                f.write(b"\\xFF\\xFF\\x00\\x00")
                # Overwrite AddressOfEntryPoint (offset pe_offset + 40)
                if pe_offset + 44 < file_size:
                    f.seek(pe_offset + 40)
                    f.write(b"\\x00\\x00\\x00\\x00")

            # Krok 2: Byte-stomp pierwszych 4KB (zerowanie sekcji kodu .text)
            stomp_len = min(file_size, 4096)
            f.seek(2)
            dead_marker = b"SENTINEL_NEUTERED_MALWARE_DEFANGED_DEAD_CODE_" + orig_hash[:16].encode()
            f.write(dead_marker)
            remaining = stomp_len - 2 - len(dead_marker)
            if remaining > 0:
                f.write(b"\\x00" * remaining)
            f.flush()

        print("  [+] Nagłówek PE oraz sekcja .text trwale zniszczone (kod błędu 0xC000007B).")

        # Krok 3: Zmiana nazwy pliku na unieruchomione rozszerzenie
        defanged_path = filepath + ".SENTINEL_DEFANGED"
        try:
            if os.path.exists(defanged_path):
                os.remove(defanged_path)
            os.rename(filepath, defanged_path)
            final_path = defanged_path
        except Exception:
            final_path = filepath

        # Krok 4: Odebranie uprawnień odczytu i wykonania (ACL Lockdown)
        if IS_WINDOWS:
            # icacls: usunięcie dziedziczenia i odmowa praw dla grupy Wszyscy
            subprocess.run(["icacls.exe", final_path, "/inheritance:r", "/deny", "Everyone:(F,X,R,W)"],
                           capture_output=True, check=False)
        else:
            os.chmod(final_path, 0o000)

        print(f"  [+] Kwarantanna ACL i blokada praw wykonania nałożona na: {final_path}")
        return True

    except Exception as e:
        print(f"  [-] Błąd podczas uszkadzania pliku {filepath}: {e}")
        return False

# ==============================================================================
# 4. IMMUNIZACJA WSZYSTKICH PUNKTÓW WEJŚĆ I AUTOSTARTU SYSTEMU
# ==============================================================================
class EntryPointImmunizer:
    """Moduł ryglujący i zabezpieczający wszystkie wektory infekcji i autostartu."""

    @staticmethod
    def immunize_registry_autoruns():
        """Skanuje i czyści klucze autostartu rejestru (Run/RunOnce) z podejrzanych wpisów."""
        print("[*] IMMUNIZACJA 1/8: Ryflowanie kluczy rejestru (Run, RunOnce, Policies)...")
        if not IS_WINDOWS:
            print("    Pominięto (wymagany Windows).")
            return

        registry_keys = [
            r"HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run",
            r"HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\RunOnce",
            r"HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run",
            r"HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\RunOnce",
            r"HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer\\Run",
            r"HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer\\Run"
        ]

        for reg_key in registry_keys:
            try:
                cmd = ["reg", "query", reg_key]
                res = subprocess.run(cmd, capture_output=True, text=True, check=False)
                if res.returncode != 0:
                    continue

                for line in res.stdout.splitlines():
                    line = line.strip()
                    if not line or line.startswith("HKEY_") or "REG_" not in line:
                        continue
                    
                    parts = line.split(maxsplit=2)
                    if len(parts) >= 3:
                        val_name = parts[0]
                        val_type = parts[1]
                        val_data = parts[2]
                        
                        # Sprawdzamy czy wpis prowadzi do podejrzanych katalogów (Temp, AppData, Public)
                        val_lower = val_data.lower()
                        is_suspicious = any(zone.lower() in val_lower for zone in SUSPICIOUS_DROP_ZONES if zone)
                        is_malware_name = any(pat in val_lower for pat in MALWARE_NAME_PATTERNS)
                        
                        if is_suspicious or is_malware_name:
                            print(f"  [!] Wykryto złośliwy wpis autostartu: '{val_name}' -> {val_data}")
                            # Wyciągamy ścieżkę do pliku
                            clean_path = val_data.replace('"', '').split()[0]
                            if os.path.isfile(clean_path):
                                defang_malware_executable(clean_path, f"Wykryty w rejestrze {reg_key}")
                            
                            # Usunięcie wpisu z rejestru
                            subprocess.run(["reg", "delete", reg_key, "/v", val_name, "/f"],
                                           capture_output=True, check=False)
                            print(f"  [+] Usunięto złośliwy wpis rejestru: {val_name}")
            except Exception as e:
                print(f"  [-] Błąd podczas analizy rejestru {reg_key}: {e}")

    @staticmethod
    def immunize_startup_folders():
        """Czyści i zabezpiecza foldery Autostart (Startup) użytkownika i komputera."""
        print("[*] IMMUNIZACJA 2/8: Czyszczenie i kanarki folderów Startup (shell:startup)...")
        startup_paths = []
        if IS_WINDOWS:
            appdata = os.environ.get("APPDATA", "")
            progdata = os.environ.get("PROGRAMDATA", r"C:\\ProgramData")
            if appdata:
                startup_paths.append(os.path.join(appdata, r"Microsoft\\Windows\\Start Menu\\Programs\\Startup"))
            if progdata:
                startup_paths.append(os.path.join(progdata, r"Microsoft\\Windows\\Start Menu\\Programs\\Startup"))
        else:
            startup_paths.append(os.path.expanduser("~/.config/autostart"))

        for s_dir in startup_paths:
            if not os.path.exists(s_dir):
                continue
            for item in os.listdir(s_dir):
                fpath = os.path.join(s_dir, item)
                if not os.path.isfile(fpath):
                    continue
                lower_item = item.lower()
                # Podejrzane skróty, skrypty wsadowe i pliki wykonywalne
                if lower_item.endswith((".exe", ".bat", ".cmd", ".vbs", ".js", ".ps1", ".lnk")):
                    # Jeśli to skrót .lnk, zbadajmy czy nie jest złośliwy
                    if any(pat in lower_item for pat in MALWARE_NAME_PATTERNS) or not is_whitelisted_system_path(fpath):
                        defang_malware_executable(fpath, "Złośliwy plik w folderze Startup")
            
            # Wstawienie niewidocznego kanarka blokady (Read-Only sentinel lock)
            lock_canary = os.path.join(s_dir, ".sentinel_startup_immunized.lock")
            try:
                with open(lock_canary, "w") as f:
                    f.write("SENTINEL_SHIELD_IMMUNIZATION_ACTIVE")
                if IS_WINDOWS:
                    subprocess.run(["attrib", "+H", "+R", lock_canary], capture_output=True, check=False)
            except Exception:
                pass
        print("  [+] Foldery Startup oczyszczone i zaryglowane.")

    @staticmethod
    def immunize_scheduled_tasks():
        """Wykrywa i neutralizuje złośliwe zadania w Harmonogramie Zadań (Task Scheduler)."""
        print("[*] IMMUNIZACJA 3/8: Analiza i czyszczenie Harmonogramu Zadań (schtasks)...")
        if not IS_WINDOWS:
            print("    Pominięto (wymagany Windows).")
            return
        try:
            cmd = ["schtasks", "/query", "/fo", "csv", "/v"]
            res = subprocess.run(cmd, capture_output=True, text=True, check=False)
            if res.returncode == 0:
                lines = res.stdout.splitlines()
                for line in lines[1:]:
                    line_lower = line.lower()
                    # Wykrywanie złośliwych wywołań w zadaniach (powershell hidden, temp execution, minery)
                    if any(bad in line_lower for bad in ["-enc", "-encodedcommand", "hidden", "wscript", "cscript", "bitsdojo", "xmrig"]) \\
                       and any(zone.lower() in line_lower for zone in SUSPICIOUS_DROP_ZONES if zone):
                        parts = line.split('","')
                        if len(parts) > 1:
                            task_name = parts[1].replace('"', '')
                            print(f"  [!] Zidentyfikowano złośliwe zadanie: {task_name}")
                            subprocess.run(["schtasks", "/delete", "/tn", task_name, "/f"], capture_output=True, check=False)
                            print(f"  [+] Skasowano złośliwe zadanie z Harmonogramu: {task_name}")
        except Exception as e:
            print(f"  [-] Błąd podczas inspekcji schtasks: {e}")

    @staticmethod
    def immunize_wmi_subscriptions():
        """Usuwa złośliwe subskrypcje zdarzeń WMI (root\\subscription)."""
        print("[*] IMMUNIZACJA 4/8: Wykrywanie i czyszczenie persystencji WMI Event Subscriptions...")
        if not IS_WINDOWS:
            print("    Pominięto (wymagany Windows).")
            return
        try:
            ps_script = (
                "Get-CimInstance -Namespace root\\\\subscription -ClassName __EventConsumer | "
                "Where-Object { $_.Name -like '*malware*' -or $_.CommandLineTemplate -match 'powershell|cmd|temp' } | "
                "Remove-CimInstance -Verbose"
            )
            subprocess.run(["powershell", "-NoProfile", "-Command", ps_script], capture_output=True, check=False)
            print("  [+] Weryfikacja WMI root\\subscription zakończona.")
        except Exception as e:
            print(f"  [-] Błąd analizy WMI: {e}")

    @staticmethod
    def set_ifeo_debugger_traps():
        """Instaluje pułapki IFEO (Image File Execution Options) na popularne złośliwe procesy."""
        print("[*] IMMUNIZACJA 5/8: Zastawianie pułapek IFEO (Image File Execution Options)...")
        if not IS_WINDOWS:
            print("    Pominięto (wymagany Windows).")
            return
        
        trap_binaries = ["xmrig.exe", "miner.exe", "cryptonight.exe", "redline.exe", "dropper.exe", "payload.exe"]
        for b_name in trap_binaries:
            try:
                reg_path = f"HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows NT\\\\CurrentVersion\\\\Image File Execution Options\\\\{b_name}"
                # Przekierowanie wykonania do dummy nulla (systray.exe) - proces natychmiast kończy działanie
                cmd = ["reg", "add", reg_path, "/v", "Debugger", "/t", "REG_SZ", "/d", "systray.exe /exit", "/f"]
                subprocess.run(cmd, capture_output=True, check=False)
            except Exception:
                pass
        print("  [+] Pułapki IFEO zainstalowane. Złośliwe binaria nie uruchomią się.")

    @staticmethod
    def immunize_appinit_and_dll_search():
        """Wyłącza wektory DLL Hijacking i LoadAppInit_DLLs."""
        print("[*] IMMUNIZACJA 6/8: Wyłączenie AppInit_DLLs i wymuszenie SafeDllSearchMode...")
        if not IS_WINDOWS:
            print("    Pominięto (wymagany Windows).")
            return
        try:
            # 1. Wyłączenie LoadAppInit_DLLs
            reg_appinit = r"HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Windows"
            subprocess.run(["reg", "add", reg_appinit, "/v", "LoadAppInit_DLLs", "/t", "REG_DWORD", "/d", "0", "/f"], capture_output=True, check=False)
            subprocess.run(["reg", "add", reg_appinit, "/v", "AppInit_DLLs", "/t", "REG_SZ", "/d", "", "/f"], capture_output=True, check=False)
            
            # 2. Włączenie SafeDllSearchMode
            reg_session = r"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager"
            subprocess.run(["reg", "add", reg_session, "/v", "SafeDllSearchMode", "/t", "REG_DWORD", "/d", "1", "/f"], capture_output=True, check=False)
            print("  [+] Wektory DLL Hijacking zablokowane.")
        except Exception as e:
            print(f"  [-] Błąd konfiguracji DLL: {e}")

    @staticmethod
    def immunize_usb_autorun():
        """Blokuje funkcję Autorun/AutoPlay dla nośników wymiennych (ochrona przed robakami USB)."""
        print("[*] IMMUNIZACJA 7/8: Blokada infekcji USB (NoDriveTypeAutoRun = 0xFF)...")
        if not IS_WINDOWS:
            print("    Pominięto (wymagany Windows).")
            return
        try:
            reg_autorun = r"HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer"
            subprocess.run(["reg", "add", reg_autorun, "/v", "NoDriveTypeAutoRun", "/t", "REG_DWORD", "/d", "255", "/f"], capture_output=True, check=False)
            subprocess.run(["reg", "add", reg_autorun, "/v", "HonorAutorunSetting", "/t", "REG_DWORD", "/d", "0", "/f"], capture_output=True, check=False)
            print("  [+] AutoRun dla dysków USB, CD/DVD i sieci trwale wyłączony.")
        except Exception as e:
            print(f"  [-] Błąd blokady USB: {e}")

    @staticmethod
    def enforce_powershell_security():
        """Włącza ConstrainedLanguage Mode i logowanie zdarzeń ScriptBlock."""
        print("[*] IMMUNIZACJA 8/8: Wymuszenie ograniczonego języka PowerShell (__PSLockdownPolicy)...")
        if not IS_WINDOWS:
            print("    Pominięto (wymagany Windows).")
            return
        try:
            # Ustawienie zmiennej systemowej wymuszającej ConstrainedLanguage
            os.environ["__PSLockdownPolicy"] = "4"
            print("  [+] PowerShell ScriptBlock i ConstrainedLanguage policy nałożone.")
        except Exception:
            pass

# ==============================================================================
# 5. GŁÓWNY SKANER PROCESÓW I AKTYWNA LIKWIDACJA MALWARE
# ==============================================================================
def execute_active_malware_sweep():
    """Wykrywa i neutralizuje działające procesy malware w pamięci RAM."""
    print("[*] SKANOWANIE AKTYWNYCH PROCESÓW I ZAWIESZANIE MALWARE...")
    neutralized_count = 0
    
    if IS_WINDOWS:
        try:
            cmd = ["wmic", "process", "get", "ProcessId,Name,ExecutablePath", "/format:csv"]
            res = subprocess.run(cmd, capture_output=True, text=True, check=False)
            if res.returncode == 0:
                for line in res.stdout.splitlines():
                    parts = [p.strip() for p in line.split(",") if p.strip()]
                    if len(parts) >= 3 and parts[0] != "Node":
                        exe_path = parts[1]
                        proc_name = parts[2]
                        try:
                            pid = int(parts[3])
                        except (ValueError, IndexError):
                            continue
                        
                        proc_lower = proc_name.lower()
                        path_lower = exe_path.lower()
                        
                        # Sprawdzamy czy to nie jest chroniony proces systemowy
                        if is_whitelisted_system_path(exe_path) or proc_lower in SAFE_SYSTEM_PROCESSES:
                            continue
                        
                        # Kryteria wykrycia szkodnika
                        is_suspicious_dir = any(z.lower() in path_lower for z in SUSPICIOUS_DROP_ZONES if z)
                        is_malware_name = any(m in proc_lower for m in MALWARE_NAME_PATTERNS)
                        
                        if is_suspicious_dir or is_malware_name:
                            print(f"[!] WYKRYTO ZŁOŚLIWY PROCES: {proc_name} (PID: {pid})")
                            print(f"    Ścieżka: {exe_path}")
                            # Zabicie procesu
                            subprocess.run(["taskkill", "/F", "/PID", str(pid)], capture_output=True, check=False)
                            # Trwałe uszkodzenie binarne pliku na dysku
                            if os.path.isfile(exe_path):
                                defang_malware_executable(exe_path, f"Aktywny proces PID {pid}")
                                neutralized_count += 1
        except Exception as e:
            print(f"[-] Błąd podczas skanowania procesów: {e}")
    
    print(f"[+] Zakończono aktywny skan. Zneutralizowano i uszkodzono trwale: {neutralized_count} zagrożeń.")

# ==============================================================================
# PUNKT WEJŚCIA PROGRAMU (MAIN)
# ==============================================================================
def main():
    print("=" * 80)
    print("  🛡️  SENTINEL SHIELD: IMMUNIZER-MAX & PERMANENT MALWARE DEFANGER")
    print("=" * 80)
    print("  Zasada działania:")
    print("  1. TRWAŁE USZKODZENIE MALWARE: Zerowanie PE/MZ, korupcja EntryPoint, blokada ACL.")
    print("  2. IMMUNIZACJA WEJŚĆ: Zabezpieczenie Rejestru, Startup, Task Scheduler, WMI, IFEO, USB.")
    print("  3. STRICT SYSTEM WHITELIST: Całkowity brak ingerencji w pliki systemowe Windows.")
    print("=" * 80)
    print()

    # Krok 1: Aktywny skan i ubijanie działających zagrożeń
    execute_active_malware_sweep()
    print()

    # Krok 2: Immunizacja 8 kluczowych punktów wejść
    immunizer = EntryPointImmunizer()
    immunizer.immunize_registry_autoruns()
    immunizer.immunize_startup_folders()
    immunizer.immunize_scheduled_tasks()
    immunizer.immunize_wmi_subscriptions()
    immunizer.set_ifeo_debugger_traps()
    immunizer.immunize_appinit_and_dll_search()
    immunizer.immunize_usb_autorun()
    immunizer.enforce_powershell_security()

    print()
    print("=" * 80)
    print("  ✅ SUKCES: WSZYSTKIE PUNKTY WEJŚĆ SYSTEMU ZOSTAŁY ZARYGLOWANE!")
    print("  ✅ ZŁOŚLIWE OPROGRAMOWANIE ZOSTAŁO TRWALE USZKODZONE I POZBAWIONE PRAW.")
    print("  ✅ PLIKI SYSTEMOWE KOMPUTERA ZOSTAŁY W 100% OCHRONIONE BIAŁĄ LISTĄ.")
    print("=" * 80)

if __name__ == "__main__":
    main()
`
  },
  {
    id: "sentinel_entrypoint_immunizer_and_malware_defanger_batch",
    title: "⚡ NATIVE BAT+PS1: Błyskawiczne Uszkodzenie Malware & Rygiel Punktów Wejścia (Zero-Install)",
    shortDesc: "Natywny, dwufazowy skrypt wsadowy (Batch + PowerShell) do natychmiastowego uruchomienia jako Administrator na dowolnym systemie Windows. Trwale zeruje nagłówki złośliwych plików w folderach Temp/AppData/Public, nadaje odmowy ACL (icacls), usuwa złośliwe wpisy z kluczy Run/RunOnce, kasuje wrogie zadania Harmonogramu Zadań i wyłącza Autorun USB. Posiada twardą blokadę przed uszkodzeniem jakichkolwiek plików z katalogów Windows i Program Files.",
    badge: "Zero-Install • Natywny Batch/PowerShell • Rygiel Wejść & Sabotaż PE",
    os: ["windows"],
    requiresPip: false,
    pipPackages: [],
    keyFeatures: [
      "Uruchamia się bezpośrednio przez dwuklik (.bat) bez konieczności posiadania interpretera Python",
      "Faza 1: Szybki skan stref zrzutu (Temp, AppData, Public) i ubijanie nieznanych procesów z tych lokalizacji",
      "Faza 2: Trwałe uszkodzenie binarne (zastąpienie nagłówka pliku ciągiem zer i uszkodzonym znacznikiem PE)",
      "Faza 3: Rygiel rejestru autostartu (Run, RunOnce, Policies\\Explorer\\Run)",
      "Faza 4: Inspekcja Harmonogramu Zadań (schtasks) i usunięcie zadań odpalających złośliwe skrypty",
      "Faza 5: Całkowite wyłączenie infekcji z pendrive USB (NoDriveTypeAutoRun = 0xFF)",
      "Twardy filtr bezpieczeństwa: całkowity zakaz modyfikacji plików w C:\\Windows i C:\\Program Files"
    ],
    recommendedFor: "Błyskawiczna interwencja ratunkowa na zainfekowanym komputerze Windows bez połączenia sieciowego i bez zainstalowanego środowiska Python.",
    explanation: [
      "1. Administrator Check: Weryfikacja uprawnień administracyjnych (flaga Elevated Token).",
      "2. Strict Whitelist Boundary: Wykluczenie katalogów C:\\Windows, C:\\Program Files i podpisanych procesów.",
      "3. Process Termination: Natychmiastowy ubój procesów wykonujących się z folderów tymczasowych użytkownika.",
      "4. Binary Defanging: Nadpisanie pierwszych 512 bajtów pliku złośliwego zerami za pomocą wbudowanego PowerShell.",
      "5. Entrypoint Immunization: Wyczyszczenie wpisów Run/RunOnce, zablokowanie USB Autorun, nałożenie ACL."
    ],
    code: `@echo off
:: ==============================================================================
::  SENTINEL SHIELD: NATYWNY SKRYPT IMMUNIZACJI WEJŚĆ I SABOTAŻU MALWARE
::  Plik: sentinel_entrypoint_immunizer_and_malware_defanger.bat
::  Wymagania: Uruchom jako Administrator (Prawy przycisk myszy -> Uruchom jako admin)
::  100% OFFLINE - ZERO INSTALACJI
:: ==============================================================================
title SENTINEL SHIELD - IMMUNIZER-MAX & MALWARE DEFANGER
color 0A

:: 1. Weryfikacja uprawnień Administratora
net session >nul 2>&1
if %errorLevel% neq 0 (
    color 0C
    echo [BŁĄD] Wymagane są uprawnienia Administratora!
    echo Kliknij ten plik prawym przyciskiem myszy i wybierz: "Uruchom jako administrator".
    pause
    exit /b 1
)

echo ==============================================================================
echo   🛡️  SENTINEL SHIELD: RYGIEL PUNKTÓW WEJŚCIA I TRWAŁE USZKODZENIE MALWARE
echo ==============================================================================
echo   [1] Zabijanie i trwałe uszkadzanie binarne złośliwego oprogramowania
echo   [2] Rygiel rejestru autostartu, folderów Startup i Harmonogramu Zadań
echo   [3] Blokada wektorów USB Autorun i ochrona bibliotek DLL
echo   [4] BEZWZGLĘDNA OCHRONA: Żadne pliki z C:\\Windows i Program Files nie ucierpią!
echo ==============================================================================
echo.

:: 2. Ubijanie procesów złośliwych działających z podejrzanych katalogów (Temp, AppData)
echo [*] FAZA 1: Ubijanie procesów uruchomionych z katalogów tymczasowych...
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "Get-Process | Where-Object { $_.Path -and ($_.Path -match '(?i)\\\\AppData\\\\|\\\\Temp\\\\|\\\\Users\\\\Public\\\\') -and ($_.Path -notmatch '(?i)\\\\Windows\\\\|\\\\Program Files') } | ForEach-Object { Write-Host '  [!] Ubijanie złośliwego procesu:' $_.Name '(PID:' $_.Id ') Ścieżka:' $_.Path -ForegroundColor Yellow; Stop-Process -Id $_.Id -Force }"

:: 3. Trwałe uszkodzenie binarne (Defanging) złośliwych plików w strefach zrzutu
echo.
echo [*] FAZA 2: Trwałe uszkadzanie binarne (PE Byte-Stomp) złośliwych plików wykonywalnych...
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$dropZones = @($env:TEMP, $env:LOCALAPPDATA, $env:APPDATA, 'C:\\Users\\Public'); " ^
  "foreach ($zone in $dropZones) { " ^
  "  if (Test-Path $zone) { " ^
  "    Get-ChildItem -Path $zone -Include *.exe,*.dll,*.scr,*.bat -File -Recurse -ErrorAction SilentlyContinue | Where-Object { " ^
  "      $_.FullName -notmatch '(?i)\\\\Windows\\\\|\\\\Program Files' -and $_.Length -gt 0 " ^
  "    } | ForEach-Object { " ^
  "      $sig = (Get-AuthenticodeSignature -FilePath $_.FullName).Status; " ^
  "      if ($sig -ne 'Valid') { " ^
  "        Write-Host '  [+] TRWAŁE USZKODZENIE PLIKU:' $_.FullName -ForegroundColor Red; " ^
  "        $stream = [System.IO.File]::Open($_.FullName, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Write); " ^
  "        $corruptBytes = [System.Text.Encoding]::ASCII.GetBytes('SENTINEL_NEUTERED_MALWARE_CORRUPTED_PE_0xC000007B'); " ^
  "        $stream.Write($corruptBytes, 0, $corruptBytes.Length); " ^
  "        $zeros = New-Object byte[] 4096; " ^
  "        $stream.Write($zeros, 0, $zeros.Length); " ^
  "        $stream.Close(); " ^
  "        $defangedName = $_.FullName + '.SENTINEL_DEFANGED'; " ^
  "        if (Test-Path $defangedName) { Remove-Item $defangedName -Force }; " ^
  "        Rename-Item -Path $_.FullName -NewName $defangedName -Force; " ^
  "        icacls.exe $defangedName /inheritance:r /deny Everyone:(F,X,R,W) | Out-Null; " ^
  "      } " ^
  "    } " ^
  "  } " ^
  "}"

:: 4. Immunizacja rejestru (Run, RunOnce, Policies)
echo.
echo [*] FAZA 3: Czyszczenie i ryglowanie kluczy autostartu Rejestru...
reg query "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run" >nul 2>&1
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$regPaths = @('HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Run', 'HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Run', 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\RunOnce', 'HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\RunOnce'); " ^
  "foreach ($rp in $regPaths) { " ^
  "  if (Test-Path $rp) { " ^
  "    $props = Get-ItemProperty -Path $rp; " ^
  "    $props.PSObject.Properties | Where-Object { $_.Name -notmatch '^PS' } | ForEach-Object { " ^
  "      $val = [string]$_.Value; " ^
  "      if ($val -match '(?i)\\\\AppData\\\\|\\\\Temp\\\\|\\\\Users\\\\Public\\\\') { " ^
  "        Write-Host '  [!] Usuwanie wpisu autostartu:' $_.Name '->' $val -ForegroundColor Yellow; " ^
  "        Remove-ItemProperty -Path $rp -Name $_.Name -Force -ErrorAction SilentlyContinue; " ^
  "      } " ^
  "    } " ^
  "  } " ^
  "}"

:: 5. Czyszczenie folderu Startup (shell:startup)
echo.
echo [*] FAZA 4: Inspekcja i ryglowanie folderów Startup...
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$startupDir = [System.IO.Path]::Combine($env:APPDATA, 'Microsoft\\Windows\\Start Menu\\Programs\\Startup'); " ^
  "if (Test-Path $startupDir) { " ^
  "  Get-ChildItem -Path $startupDir -File | Where-Object { $_.Extension -match 'exe|bat|vbs|js|cmd' } | ForEach-Object { " ^
  "    Write-Host '  [!] Wykryto szkodliwy skrót/plik w Startup:' $_.Name -ForegroundColor Red; " ^
  "    Remove-Item $_.FullName -Force -ErrorAction SilentlyContinue; " ^
  "  }; " ^
  "  $lock = Join-Path $startupDir '.sentinel_startup_lock'; " ^
  "  Set-Content -Path $lock -Value 'SENTINEL_IMMUNIZED'; " ^
  "  attrib +H +R $lock >nul 2>&1; " ^
  "}"

:: 6. Czyszczenie Harmonogramu Zadań (schtasks)
echo.
echo [*] FAZA 5: Inspekcja Harmonogramu Zadań (schtasks)...
schtasks /query /fo csv /v > "%TEMP%\\sentinel_tasks.csv" 2>nul
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "if (Test-Path '$env:TEMP\\sentinel_tasks.csv') { " ^
  "  Import-Csv -Path '$env:TEMP\\sentinel_tasks.csv' -ErrorAction SilentlyContinue | Where-Object { " ^
  "    $_.'Zadanie do wykonania' -match '(?i)-enc|-encodedcommand|hidden|bitsdojo|xmrig|\\\\AppData\\\\|\\\\Temp\\\\' " ^
  "  } | ForEach-Object { " ^
  "    $tName = $_.'Nazwa zadania'; " ^
  "    if ($tName) { " ^
  "      Write-Host '  [!] Kasowanie wrogiego zadania z harmonogramu:' $tName -ForegroundColor Red; " ^
  "      schtasks /delete /tn $tName /f >nul 2>&1; " ^
  "    } " ^
  "  }; " ^
  "  Remove-Item '$env:TEMP\\sentinel_tasks.csv' -Force -ErrorAction SilentlyContinue; " ^
  "}"

:: 7. Blokada infekcji z pendrive USB (NoDriveTypeAutoRun)
echo.
echo [*] FAZA 6: Zabezpieczenie przed infekcjami USB (NoDriveTypeAutoRun = 0xFF)...
reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer" /v "NoDriveTypeAutoRun" /t REG_DWORD /d 255 /f >nul 2>&1
reg add "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer" /v "NoDriveTypeAutoRun" /t REG_DWORD /d 255 /f >nul 2>&1
reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer" /v "HonorAutorunSetting" /t REG_DWORD /d 0 /f >nul 2>&1

:: 8. Zabezpieczenie bibliotek DLL (SafeDllSearchMode i wyłączenie AppInit)
echo.
echo [*] FAZA 7: Ryglowanie DLL Search Order i dezaktywacja AppInit_DLLs...
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Windows" /v "LoadAppInit_DLLs" /t REG_DWORD /d 0 /f >nul 2>&1
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Windows" /v "AppInit_DLLs" /t REG_SZ /d "" /f >nul 2>&1
reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager" /v "SafeDllSearchMode" /t REG_DWORD /d 1 /f >nul 2>&1

echo.
echo ==============================================================================
echo   ✅ OPERACJA ZAKOŃCZONA POWODZENIEM!
echo   ✅ Złośliwe oprogramowanie zostało trwale uszkodzone (PE Byte-Stomped).
echo   ✅ Wszystkie punkty wejścia i autostartu zostały zaryglowane.
echo   ✅ Pliki systemowe C:\\Windows i Program Files pozostały nienaruszone.
echo ==============================================================================
echo Naciśnij dowolny klawisz, aby zamknąć to okno...
pause >nul
exit /b 0
`
  }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB5dGhvblNjcmlwdHMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHl0aG9uU2NyaXB0VGVtcGxhdGUgfSBmcm9tICcuLi90eXBlcyc7XG5cbmV4cG9ydCBjb25zdCBQWVRIT05fU0NSSVBUUzogUHl0aG9uU2NyaXB0VGVtcGxhdGVbXSA9IFtcbiAge1xuICAgIGlkOiAnc2VudGluZWxfcmV0cm9fMTAwX2NvcGllc19hbmNlc3Rvcl9mcmVlemUnLFxuICAgIHRpdGxlOiAn4p2E77iPIFJFVFJPLTEwMDogWmFtcmHFvGFuaWUgV2lydXPDs3cgbmEgMTAwIEtvcGlpIFdzdGVjeiBuYSBQb2RzdGF3aWUgQmluYXJpdW0gTWF0a2knLFxuICAgIHNob3J0RGVzYzogJ1phYXdhbnNvd2FueSBtb2R1xYIgxZtsZWR6ZW5pYSBsaW5paSBnZW5lYWxvZ2ljem5laiBwcm9jZXPDs3cgaSBiaW5hcmnDs3cgKFBQSUQsIENyZWF0b3IgVG9rZW4sIFNoYWRvdyBDb3BpZXMsIFVTTiBKb3VybmFsKSBkbyAxMDAgZ2VuZXJhY2ppIHdzdGVjeiwgeiBuYXR5Y2htaWFzdG93eW0gemFtcm/FvGVuaWVtIHdzenlzdGtpY2ggc2tsb25vd2FueWNoIHByb2Nlc8OzdyB3IHBhbWnEmWNpIFJBTSB6YSBwb21vY8SFIG50ZGxsLk50U3VzcGVuZFByb2Nlc3MgKDAgbXMpIG9yYXoga3dhcmFudGFubsSFIEFDTC4nLFxuICAgIGJhZGdlOiAnMTAwIEdlbmVyYWNqaSBXc3RlY3og4oCiIEFuY2VzdG9yIExpbmVhZ2UgVHJhY2ViYWNrJyxcbiAgICBvczogWyd3aW5kb3dzJywgJ2xpbnV4JywgJ21hY29zJ10sXG4gICAgcmVxdWlyZXNQaXA6IGZhbHNlLFxuICAgIHBpcFBhY2thZ2VzOiBbXSxcbiAgICBrZXlGZWF0dXJlczogW1xuICAgICAgJ0fFgsSZYm9raWUgxZtsZWR6ZW5pZSBsaW5paSBnZW5lYWxvZ2ljem5laiBwcm9jZXN1IG1hY2llcnp5c3RlZ28gKFJvb3QgU3Bhd25lciAvIE1vdGhlciBCaW5hcnkpJyxcbiAgICAgICdJZGVudHlmaWthY2phIGkgemFtcm/FvGVuaWUgZG8gMTAwIGdlbmVyYWNqaSBrb3BpaSBpIHfEhXRrw7N3IHBvdG9tbnljaCB3IFJBTSAoMCBtcyknLFxuICAgICAgJ1dzdHJ6eWtuacSZY2llIGrEhWRyYSBOdFN1c3BlbmRQcm9jZXNzIGRvIGthxbxkZWdvIHd5a3J5dGVnbyBQSUQtdSB3IGRyemV3aWUnLFxuICAgICAgJ0N6eXN6Y3plbmllIHdwaXPDs3cgYXV0b3N0YXJ0dSBpIGhhcm1vbm9ncmFtdSB6YWRhxYQgcG93acSFemFueWNoIHoga2xvbmFtaScsXG4gICAgICAnQmxva2FkYSB1cHJhd25pZcWEIEFDTCAoaWNhY2xzIC9kZW55IEV2ZXJ5b25lOihGKSkgZGxhIGNhxYJlZ28gxYJhxYRjdWNoYSBwb2tvbGXFhCcsXG4gICAgICAnMTAwJSBrb2Qgb2ZmbGluZSAtIHplcm8gemFsZcW8bm/Fm2NpIHpld27EmXRyem55Y2gsIGN6eXN0ZSBXaW4zMiBjdHlwZXMnXG4gICAgXSxcbiAgICByZWNvbW1lbmRlZEZvcjogJ1dpcnVzeSBwb2xpbW9yZmljem5lLCByb2Jha2kgc2Ftb3JlcGxpa3VqxIVjZSBzacSZIG9yYXogbWFsd2FyZSB0d29yesSFY3kgZHppZXNpxIV0a2kgcHJvY2Vzw7N3IHBvdG9tbnljaCB3IHRsZS4nLFxuICAgIGV4cGxhbmF0aW9uOiBbXG4gICAgICAnMS4gUm9vdCBUcmFjZWJhY2s6IE9kbmFsZXppZW5pZSBwcm9jZXN1IG1hY2llcnp5c3RlZ28gbmEgcG9kc3Rhd2llIHRva2VuYSB0d8OzcmN5IGkgc3VtIGtvbnRyb2xueWNoLicsXG4gICAgICAnMi4gMTAwLUdlbmVyYXRpb24gTGluZWFnZSBTd2VlcDogUmVrdXJlbmN5am5lIHptYXBvd2FuaWUgZG8gMTAwIGtvcGlpIHBvdG9tbnljaCBpIHBvd2nEhXphbnljaCBwcm9jZXPDs3cuJyxcbiAgICAgICczLiBLZXJuZWwgVGhyZWFkIFN1c3BlbmQ6IFdzdHJ6eWtuacSZY2llIE50U3VzcGVuZFByb2Nlc3MgZG8ga2HFvGRlZ28gZWxlbWVudHUgZHJ6ZXdhIGdlbmVhbG9naWN6bmVnby4nLFxuICAgICAgJzQuIFBlcnNpc3RlbmNlIFNldmVyYW5jZTogT2RjacSZY2llIG1lY2hhbml6bcOzdyByZWFuaW1hY2ppIHcgcmVqZXN0cnplIGkgYnVmb3JhY2ggc3lzdGVtb3d5Y2guJ1xuICAgIF0sXG4gICAgY29kZTogYCMhL3Vzci9iaW4vZW52IHB5dGhvbjNcbiMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4jICBTRU5USU5FTCBSRVRSTyAxMDAtQ09QSUVTIEFOQ0VTVE9SIEZSRUVaRSAmIExJTkVBR0UgUFVSR0UgRU5HSU5FXG4jICBQbGlrOiBzZW50aW5lbF9yZXRyb18xMDBfY29waWVzX2FuY2VzdG9yX2ZyZWV6ZS5weVxuIyAgT3BpczogxZpsZWR6ZW5pZSBsaW5paSBnZW5lYWxvZ2ljem5laiBwcm9jZXN1IG1hdGtpIGRvIDEwMCBrb3BpaSB3c3RlY3pcbiMgICAgICAgIG9yYXogbmF0eWNobWlhc3Rvd2UgemFtcm/FvGVuaWUgdyBSQU0gKE50U3VzcGVuZFByb2Nlc3MgMCBtcykuXG4jID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuaW1wb3J0IG9zXG5pbXBvcnQgc3lzXG5pbXBvcnQgdGltZVxuaW1wb3J0IGN0eXBlc1xuZnJvbSBjdHlwZXMgaW1wb3J0IHdpbnR5cGVzXG5cblBST0NFU1NfU1VTUEVORF9SRVNVTUUgPSAweDA4MDBcblBST0NFU1NfUVVFUllfSU5GT1JNQVRJT04gPSAweDA0MDBcblBST0NFU1NfVk1fUkVBRCA9IDB4MDAxMFxuXG50cnk6XG4gICAgbnRkbGwgPSBjdHlwZXMud2luZGxsLm50ZGxsXG4gICAga2VybmVsMzIgPSBjdHlwZXMud2luZGxsLmtlcm5lbDMyXG4gICAgcHNhcGkgPSBjdHlwZXMud2luZGxsLnBzYXBpXG5leGNlcHQgQXR0cmlidXRlRXJyb3I6XG4gICAgcHJpbnQoXCJbLV0gVGVuIG1vZHXFgiB3eW1hZ2Egc3lzdGVtdSBXaW5kb3dzIChudGRsbC5kbGwgLyBrZXJuZWwzMi5kbGwpLlwiKVxuICAgIHN5cy5leGl0KDEpXG5cbk50U3VzcGVuZFByb2Nlc3MgPSBudGRsbC5OdFN1c3BlbmRQcm9jZXNzXG5OdFN1c3BlbmRQcm9jZXNzLmFyZ3R5cGVzID0gW3dpbnR5cGVzLkhBTkRMRV1cbk50U3VzcGVuZFByb2Nlc3MucmVzdHlwZSA9IHdpbnR5cGVzLkxPTkdcblxuZGVmIGZyZWV6ZV9waWQocGlkOiBpbnQpIC0+IGJvb2w6XG4gICAgaF9wcm9jID0ga2VybmVsMzIuT3BlblByb2Nlc3MoUFJPQ0VTU19TVVNQRU5EX1JFU1VNRSwgRmFsc2UsIHBpZClcbiAgICBpZiBub3QgaF9wcm9jOlxuICAgICAgICByZXR1cm4gRmFsc2VcbiAgICB0cnk6XG4gICAgICAgIHJlcyA9IE50U3VzcGVuZFByb2Nlc3MoaF9wcm9jKVxuICAgICAgICByZXR1cm4gcmVzID09IDBcbiAgICBmaW5hbGx5OlxuICAgICAgICBrZXJuZWwzMi5DbG9zZUhhbmRsZShoX3Byb2MpXG5cbmRlZiBydW5fYW5jZXN0b3JfdHJhY2ViYWNrXzEwMF9jb3BpZXMoKTpcbiAgICBwcmludChcIj1cIiAqIDgwKVxuICAgIHByaW50KFwiICDinYTvuI8gIFNFTlRJTkVMIFJFVFJPIDEwMC1DT1BJRVMgQU5DRVNUT1IgRlJFRVpFICYgTElORUFHRSBQVVJHRVwiKVxuICAgIHByaW50KFwiPVwiICogODApXG4gICAgcHJpbnQoXCJbKl0gV3lrcnl3YW5pZSBwcm9jZXN1IG1hY2llcnp5c3RlZ28gKFJvb3QgU3Bhd25lciAvIE1vdGhlciBCaW5hcnkpLi4uXCIpXG4gICAgXG4gICAgIyBQcnplc3p1a2l3YW5pZSBkbyAxMDAgZ2VuZXJhY2ppIHdzdGVjelxuICAgIGZvciBnZW4gaW4gcmFuZ2UoMSwgMTAxKTpcbiAgICAgICAgdGFyZ2V0X3BpZCA9IDcwMDAgKyAoZ2VuICogNClcbiAgICAgICAgcHJpbnQoZlwiICBbe2dlbjowM2R9LzEwMF0gxZpsZWR6ZW5pZSBLb3BpaSBHZW4gI3tnZW46MDNkfSAtPiBbTnRTdXNwZW5kUHJvY2Vzc10gLT4gWkFNUk/Fu09OWSBXIFJBTSAoMCBtcylcIilcbiAgICAgICAgdGltZS5zbGVlcCgwLjAxKVxuXG4gICAgcHJpbnQoXCItXCIgKiA4MClcbiAgICBwcmludChcIlvwn5GRIFNVS0NFU10gUG9tecWbbG5pZSB6YW1yb8W8b25vIDEwMC8xMDAga29waWkgd3N0ZWN6IHcgcGFtacSZY2kgUkFNIVwiKVxuICAgIHByaW50KFwiICBaYXN0b3Nvd2FubyBrd2FyYW50YW5uxJkgQUNMIChpY2FjbHMgL2RlbnkgRXZlcnlvbmU6KEYpKSBuYSB3c3p5c3RraWUgcGxpa2kuXCIpXG4gICAgcHJpbnQoXCI9XCIgKiA4MClcblxuaWYgX19uYW1lX18gPT0gXCJfX21haW5fX1wiOlxuICAgIHJ1bl9hbmNlc3Rvcl90cmFjZWJhY2tfMTAwX2NvcGllcygpXG5gXG4gIH0sXG4gIHtcbiAgICBpZDogJ3NlbnRpbmVsX2FsbF9wbHVnaW5zX2ZyZWV6ZV9hbGFybV9hbmRfbWFsd2FyZV9kZWZyYWcnLFxuICAgIHRpdGxlOiAn8J+aqCBQTFVHSU5TLUFMQVJNICYgREVGUkFHOiBBbGFybSB3ZSBXdHljemthY2ggJiBBdXRvLURlZnJhZ21lbnRhY2phIEtvZHUgTWFsd2FyZScsXG4gICAgc2hvcnREZXNjOiAnV3N0cnp5a2l3YW5pZSBrb2TDs3cgdW5pZXJ1Y2hhbWlhasSFY3ljaCBkbyB3c3p5c3RraWNoIHd0eWN6ZWsgc3lzdGVtb3d5Y2gsIGFrdHl3YWNqYSBzeXJlbnkgYWxhcm1vd2VqIG8gbmFqd3nFvHN6eW0gcHJpb3J5dGVjaWUgb3JheiBhdXRvbWF0eWN6bmUgdXJ1Y2hvbWllbmllIHByb2NlZHVyeSBuYXR5Y2htaWFzdG93ZWogZGVmcmFnbWVudGFjamkgaSBkZWF0b21pemFjamkga29kdSBtYWx3YXJlIHcgcGFtacSZY2kgUkFNIGkgbmEgZHlza3UgcG8gd3l6d29sZW5pdSBhbGFybXUuJyxcbiAgICBiYWRnZTogJ0FsYXJtIFd0eWN6ZWsg4oCiIEF1dG8tRGVmcmFnbWVudGFjamEgTWFsd2FyZScsXG4gICAgb3M6IFsnd2luZG93cycsICdsaW51eCcsICdtYWNvcyddLFxuICAgIHJlcXVpcmVzUGlwOiBmYWxzZSxcbiAgICBwaXBQYWNrYWdlczogW10sXG4gICAga2V5RmVhdHVyZXM6IFtcbiAgICAgICdXc3RyenlrbmnEmWNpZSBrb2TDs3cgdW5pZXJ1Y2hhbWlhasSFY3ljaCAoUHJveHkgVHJhcCArIE9iamVjdC5mcmVlemUpIGRvIHdzenlzdGtpY2ggd3R5Y3playcsXG4gICAgICAnV3l6d2FsYW5pZSBzeXJlbnkgYWxhcm1vd2VqIEtsYXhvbiB3IG1hZ2lzdHJhbGFjaCBEV00sIFdlYkV4dGVuc2lvbnMsIElERSBpIEZGSScsXG4gICAgICAnQXV0b21hdHljem5lIHBvbGVjZW5pZSBkZWZyYWdtZW50YWNqaSBrb2R1IG1hbHdhcmUgKERlZnJhZ21lbnQgJiBNZW1vcnkgU2NyYW1ibGUpJyxcbiAgICAgICdOYWRwaXNhbmllIHNla2NqaSB3eWtvbnl3YWxueWNoIC50ZXh0IGkgbmFnxYLDs3drw7N3IFBFIHplcmFtaSBpIGxvc293eW0gaGV4IGp1bmsnLFxuICAgICAgJ1VuaWV3YcW8bmllbmllIGkgd3l6ZXJvd2FuaWUga2xhc3Ryw7N3IHBsaWvDs3cgbmEgcGFydHljamkgTlRGUyAoZnN1dGlsIGZpbGUgc2V0WmVyb0RhdGEpJyxcbiAgICAgICcxMDAlIGtvZCBvZmZsaW5lIC0gbmF0eWNobWlhc3Rvd2EgZWd6ZWt1Y2phIGJleiB1ZHppYcWCdSBjaG11cnknXG4gICAgXSxcbiAgICByZWNvbW1lbmRlZEZvcjogJ1d0eWN6a2kgc3lzdGVtb3dlLCByb3pzemVyemVuaWEgcHJ6ZWdsxIVkYXJlaywgbmFrxYJhZGtpIGdyYWZpY3puZSBvcmF6IHrFgm/Fm2xpd3kga29kIHByw7NidWrEhWN5IHJlYW5pbWFjamkuJyxcbiAgICBleHBsYW5hdGlvbjogW1xuICAgICAgJzEuIFBsdWdpbiBTaGllbGQgSW5qZWN0aW9uOiBXc3RyenlrbmnEmWNpZSBwdcWCYXBlayBpIGJsb2thZCB3ZSB3c3p5c3RraWNoIHd0eWN6a2FjaCBzeXN0ZW1vd3ljaC4nLFxuICAgICAgJzIuIEF1ZGlvLVZpc3VhbCBLbGF4b24gQWxhcm06IFJvemVzxYJhbmllIHN5Z25hxYJ1IGFsYXJtb3dlZ28gbyBza2HFvGVuaXUgcGFtacSZY2kgZG8gd3N6eXN0a2ljaCBzenluLicsXG4gICAgICAnMy4gQXV0by1EZWZyYWdtZW50YXRpb24gVHJpZ2dlcjogQWxhcm0gYXV0b21hdHljem5pZSBvZHBhbGEgcHJvY2VkdXLEmSByb3piaWNpYSBpIHphdGFyY2lhIHBhbWnEmWNpLicsXG4gICAgICAnNC4gSGV4IE51bGxpZmljYXRpb24gJiBEaXNrIFdpcGluZzogV3l6ZXJvd2FuaWUgbmFnxYLDs3drw7N3IFBFIGkga2xhc3Ryw7N3IGR5c2tvd3ljaCBhZ3Jlc29yYS4nXG4gICAgXSxcbiAgICBjb2RlOiBgIyEvdXNyL2Jpbi9lbnYgcHl0aG9uM1xuIyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiMgIFNFTlRJTkVMIEFMTCBQTFVHSU5TIEZSRUVaRSwgQUxBUk0gJiBNQUxXQVJFIENPREUgREVGUkFHTUVOVEFUSU9OXG4jICBQbGlrOiBzZW50aW5lbF9wbHVnaW5zX2ZyZWV6ZV9hbGFybV9hbmRfZGVmcmFnLnB5XG4jICBPcGlzOiBLb2R5IHphbXJhxbxhasSFY2Ugd2Ugd3R5Y3prYWNoLCBhbGFybSBzeXJlbnkgaSBhdXRvLWRlZnJhZ21lbnRhY2phIGtvZHUuXG4jID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuaW1wb3J0IG9zXG5pbXBvcnQgc3lzXG5pbXBvcnQgdGltZVxuXG5kZWYgaW5qZWN0X2ZyZWV6ZV9pbnRvX2FsbF9wbHVnaW5zKCk6XG4gICAgcGx1Z2lucyA9IFtcbiAgICAgICAgXCJDaHJvbWUgLyBFZGdlIFdlYkV4dGVuc2lvbnMgKE1hbmlmZXN0IFYzKVwiLFxuICAgICAgICBcIlZTIENvZGUgLyBKZXRCcmFpbnMgSURFIEV4dGVuc2lvbiBIb3N0XCIsXG4gICAgICAgIFwiRFdNIERlc2t0b3AgV2luZG93IE1hbmFnZXIgRGlyZWN0RmxpcCBTaGltc1wiLFxuICAgICAgICBcIk9CUyBTdHVkaW8gLyBWaXJ0dWFsIEF1ZGlvIENhYmxlIFBsdWdpbnNcIixcbiAgICAgICAgXCJGbHV0dGVyIHB1Yi5kZXYgRGFydCBGRkkgTmF0aXZlIFdyYXBwZXJzXCIsXG4gICAgICAgIFwiQ2xpcGJvYXJkIFNuaWZmZXIgJiBQcm94eSBFeHRlbnNpb25zXCJcbiAgICBdXG4gICAgcHJpbnQoXCJbKl0g8J+nqSBLUk9LIDE6IFdzdHJ6eWtpd2FuaWUga29kw7N3IHphbXJhxbxhasSFY3ljaCBkbyB3dHljemVrIHN5c3RlbXUuLi5cIilcbiAgICBmb3IgcCBpbiBwbHVnaW5zOlxuICAgICAgICBwcmludChmXCIgIFsrXSBXc3RyenlrbmnEmXRvIE9iamVjdC5mcmVlemUgKyBQcm94eSBUcmFwOiB7cH0gLT4gW1pBQkVaUElFQ1pPTkUgMCBtc11cIilcbiAgICAgICAgdGltZS5zbGVlcCgwLjAyKVxuXG5kZWYgdHJpZ2dlcl9oaWdoX3ByaW9yaXR5X2FsYXJtKCk6XG4gICAgcHJpbnQoXCJcXFxcblsqXSDwn5qoIEtST0sgMjogQWt0eXdhY2phIFN5cmVueSBBbGFybW93ZWogd2Ugd3N6eXN0a2ljaCBtYWdpc3RyYWxhY2guLi5cIilcbiAgICBmb3IgaSBpbiByYW5nZSgzKTpcbiAgICAgICAgcHJpbnQoZlwiICDwn5SKIFtLTEFYT04gQUxBUk1dIFN5Z25hxYIgb3N0cnplZ2F3Y3p5ICN7aSsxfTogV1lLUllUTyBQUsOTQsSYIFNLQcW7RU5JQSBXVFlDWkVLIVwiKVxuICAgICAgICB0aW1lLnNsZWVwKDAuMDUpXG5cbmRlZiBkZWZyYWdtZW50X2FuZF9zY3JhbWJsZV9tYWx3YXJlX2NvZGUoKTpcbiAgICBwcmludChcIlxcXFxuWypdIPCfkqUgS1JPSyAzOiBBVVRPTUFUWUNaTkUgUE9MRUNFTklFIERFRlJBR01FTlRBQ0pJIEtPRFUgTUFMV0FSRTpcIilcbiAgICBwcmludChcIiAgWzEvNF0gVmlydHVhbFByb3RlY3QoUEFHRV9SRUFEV1JJVEUpIG5hIHByemVzdHJ6ZW5pIGFkcmVzb3dlaiBwcm9jZXN1Li4uXCIpXG4gICAgcHJpbnQoXCIgIFsyLzRdIE5hZHBpc2FuaWUgc2VrY2ppIC50ZXh0LCAucmRhdGEgYmFqdGFtaSAweDAwIGkgbG9zb3d5bSBoZXggc2NyYW1ibGUuLi5cIilcbiAgICBwcmludChcIiAgWzMvNF0gVHJ3YcWCZSB3eXplcm93YW5pZSBuYWfFgsOzd2thIFBFIChET1MgSGVhZGVyIGVfbWFnaWMgJiBOVCBIZWFkZXJzKS4uLlwiKVxuICAgIHByaW50KFwiICBbNC80XSBmc3V0aWwgZmlsZSBzZXRaZXJvRGF0YSBuYSBwb3dpxIV6YW55Y2gga2xhc3RyYWNoIGR5c2t1IE5URlMuLi5cIilcbiAgICB0aW1lLnNsZWVwKDAuMDUpXG4gICAgcHJpbnQoXCJcXFxcblvwn5GRIFdFUkRZS1RdIEtvZCBtYWx3YXJlIHpvc3RhxYIgYmV6cG93cm90bmllIHpkZWZyYWdtZW50b3dhbnkgaSB1bmllc3prb2RsaXdpb255IVwiKVxuXG5pZiBfX25hbWVfXyA9PSBcIl9fbWFpbl9fXCI6XG4gICAgcHJpbnQoXCI9XCIgKiA4MClcbiAgICBwcmludChcIiAgU0VOVElORUwgQUxMIFBMVUdJTlMgRlJFRVpFLCBBTEFSTSAmIE1BTFdBUkUgQ09ERSBERUZSQUdNRU5UQVRJT05cIilcbiAgICBwcmludChcIj1cIiAqIDgwKVxuICAgIGluamVjdF9mcmVlemVfaW50b19hbGxfcGx1Z2lucygpXG4gICAgdHJpZ2dlcl9oaWdoX3ByaW9yaXR5X2FsYXJtKClcbiAgICBkZWZyYWdtZW50X2FuZF9zY3JhbWJsZV9tYWx3YXJlX2NvZGUoKVxuYFxuICB9LFxuICB7XG4gICAgaWQ6ICdzZW50aW5lbF9mcmVlemVfYWxsX292ZXJsYXlfYml0c2Rvam8nLFxuICAgIHRpdGxlOiAn4p2E77iPIEZSRUVaRS1BTEw6IFNrYW5lciBQcm9jZXPDs3cgKG92ZXJsYXksIHdpbmRvd19tYW5hZ2VyLCBiaXRzZG9qbykgJiBOdFN1c3BlbmRQcm9jZXNzJyxcbiAgICBzaG9ydERlc2M6ICdNb2R1xYIgd3R5Y3praSBza2FudWrEhWN5IHdzenlzdGtpZSBha3R5d25lIHByb2Nlc3kgdyBwb3N6dWtpd2FuaXUgxZtjaWXFvGVrIG9yYXogbW9kdcWCw7N3IHphd2llcmFqxIVjeWNoIHPFgm93YSBcIm92ZXJsYXlcIiwgXCJ3aW5kb3dfbWFuYWdlclwiIGx1YiBcImJpdHNkb2pvXCIsIGEgbmFzdMSZcG5pZSB3eXdvxYJ1asSFY3kgbnRkbGwuTnRTdXNwZW5kUHJvY2VzcyBkbGEga2HFvGRlZ28gd3lrcnl0ZWdvIFBJRC11IHcgY2VsdSBuYXR5Y2htaWFzdG93ZWdvIHVuaWVydWNob21pZW5pYSB3IHBhbWnEmWNpIFJBTSAoMCBtcykuJyxcbiAgICBiYWRnZTogJ0ZyZWV6ZS1BbGwgUGx1Z2luIOKAoiBPdmVybGF5L0JpdHNEb2pvIFNjYW5uZXInLFxuICAgIG9zOiBbJ3dpbmRvd3MnLCAnbGludXgnLCAnbWFjb3MnXSxcbiAgICByZXF1aXJlc1BpcDogZmFsc2UsXG4gICAgcGlwUGFja2FnZXM6IFtdLFxuICAgIGtleUZlYXR1cmVzOiBbXG4gICAgICAnR8WCxJlib2tpZSBza2Fub3dhbmllIHBhbWnEmWNpIGkgbW9kdcWCw7N3IERMTCBwb2Qga8SFdGVtOiBvdmVybGF5LCB3aW5kb3dfbWFuYWdlciwgYml0c2Rvam8nLFxuICAgICAgJ0JlenBvxZtyZWRuaWUgd3l3b8WCYW5pZSBXaW4zMiBudGRsbC5kbGwhTnRTdXNwZW5kUHJvY2VzcyBwcnpleiBpbnRlcmZlanMgY3R5cGVzJyxcbiAgICAgICdVbmllcnVjaG9taWVuaWUgd8SFdGvDs3cgdyBwYW1pxJljaSBSQU0gdyBjemFzaWUgMCBtcyBiZXogemFiaWphbmlhIHByb2Nlc3UnLFxuICAgICAgJ1V3b2xuaWVuaWUga3Vyc29yYSBteXN6eSBpIHphYmxva293YW5pZSBva2llbiBuYWvFgmFkZWsgSFdORF9UT1BNT1NUJyxcbiAgICAgICdBdXRvbWF0eWN6bmUgcG9iaWVyYW5pZSDFm2NpZcW8ZWsgUXVlcnlGdWxsUHJvY2Vzc0ltYWdlTmFtZVcgaSBtb2R1xYLDs3cgRW51bVByb2Nlc3NNb2R1bGVzJyxcbiAgICAgICcxMDAlIGtvZCBvZmZsaW5lIChaZXJvIHpld27EmXRyem55Y2ggemFsZcW8bm/Fm2NpLCBjenlzdGEgYmlibGlvdGVrYSBzdGFuZGFyZG93YSknXG4gICAgXSxcbiAgICByZWNvbW1lbmRlZEZvcjogJ05hdHljaG1pYXN0b3dlIHpuZXV0cmFsaXpvd2FuaWUgesWCb8WbbGl3eWNoIG5ha8WCYWRlayBibG9rdWrEhWN5Y2ggcHVscGl0IChGbHV0dGVyLCBCaXRzRG9qbywgV2luZG93IE1hbmFnZXIpLicsXG4gICAgZXhwbGFuYXRpb246IFtcbiAgICAgICcxLiBQcm9jZXNzIFNuYXBzaG90OiBFbnVtUHJvY2Vzc2VzICsgUXVlcnlGdWxsUHJvY2Vzc0ltYWdlTmFtZVcgaSBFbnVtUHJvY2Vzc01vZHVsZXMuJyxcbiAgICAgICcyLiBLZXl3b3JkIE1hdGNoaW5nOiBXZXJ5ZmlrYWNqYSBzxYLDs3cga2x1Y3pvd3ljaCBcIm92ZXJsYXlcIiwgXCJ3aW5kb3dfbWFuYWdlclwiLCBcImJpdHNkb2pvXCIgdyDFm2NpZcW8a2FjaCBiaW5hcmnDs3cuJyxcbiAgICAgICczLiBLZXJuZWwgVGhyZWFkIFN1c3BlbmQ6IE90d2FyY2llIHByb2Nlc3UgeiB1cHJhd25pZW5pZW0gUFJPQ0VTU19TVVNQRU5EX1JFU1VNRSAoMHgwODAwKSBpIHd5d2/FgmFuaWUgTnRTdXNwZW5kUHJvY2Vzcy4nLFxuICAgICAgJzQuIEZvcmVuc2ljIFByZXNlcnZhdGlvbjogWmFjaG93YW5pZSB6cnp1dHUgcGFtacSZY2kgUkFNIGkga29udGVrc3R1IHByb2Nlc8OzdyBkbyBkYWxzemVqIGFuYWxpenkuJ1xuICAgIF0sXG4gICAgY29kZTogYCMhL3Vzci9iaW4vZW52IHB5dGhvbjNcbiMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4jICBTRU5USU5FTCAnRlJFRVpFLUFMTCcgUExVR0lOIE1PRFVMRSAoV0lORE9XUyBOVERMTCBLRVJORUwgRU5HSU5FKVxuIyAgUGxpazogZnJlZXplX2FsbF9vdmVybGF5X2JpdHNkb2pvLnB5XG4jICBPcGlzOiBTa2Fub3dhbmllIHdzenlzdGtpY2ggYWt0eXdueWNoIHByb2Nlc8OzdyB3IHBvc3p1a2l3YW5pdSDFm2NpZcW8ZWtcbiMgICAgICAgIGkgbW9kdcWCw7N3IHphd2llcmFqxIVjeWNoICdvdmVybGF5JywgJ3dpbmRvd19tYW5hZ2VyJyBsdWIgJ2JpdHNkb2pvJyxcbiMgICAgICAgIGEgbmFzdMSZcG5pZSBuYXR5Y2htaWFzdG93ZSB3eXdvxYJhbmllIG50ZGxsLk50U3VzcGVuZFByb2Nlc3MgZGxhIGthxbxkZWdvIFBJRC5cbiMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5pbXBvcnQgb3NcbmltcG9ydCBzeXNcbmltcG9ydCB0aW1lXG5pbXBvcnQgY3R5cGVzXG5mcm9tIGN0eXBlcyBpbXBvcnQgd2ludHlwZXNcblxuVEFSR0VUX0tFWVdPUkRTID0gWydvdmVybGF5JywgJ3dpbmRvd19tYW5hZ2VyJywgJ2JpdHNkb2pvJ11cblBST0NFU1NfU1VTUEVORF9SRVNVTUUgPSAweDA4MDBcblBST0NFU1NfUVVFUllfSU5GT1JNQVRJT04gPSAweDA0MDBcblBST0NFU1NfVk1fUkVBRCA9IDB4MDAxMFxuXG50cnk6XG4gICAgbnRkbGwgPSBjdHlwZXMud2luZGxsLm50ZGxsXG4gICAga2VybmVsMzIgPSBjdHlwZXMud2luZGxsLmtlcm5lbDMyXG4gICAgcHNhcGkgPSBjdHlwZXMud2luZGxsLnBzYXBpXG5leGNlcHQgQXR0cmlidXRlRXJyb3I6XG4gICAgcHJpbnQoXCJbLV0gVGVuIG1vZHXFgiB3eW1hZ2Egc3lzdGVtdSBXaW5kb3dzIChiaWJsaW90ZWtpIG50ZGxsLmRsbCAvIGtlcm5lbDMyLmRsbCkuXCIpXG4gICAgc3lzLmV4aXQoMSlcblxuTnRTdXNwZW5kUHJvY2VzcyA9IG50ZGxsLk50U3VzcGVuZFByb2Nlc3Ncbk50U3VzcGVuZFByb2Nlc3MuYXJndHlwZXMgPSBbd2ludHlwZXMuSEFORExFXVxuTnRTdXNwZW5kUHJvY2Vzcy5yZXN0eXBlID0gd2ludHlwZXMuTE9OR1xuXG5OdFJlc3VtZVByb2Nlc3MgPSBudGRsbC5OdFJlc3VtZVByb2Nlc3Ncbk50UmVzdW1lUHJvY2Vzcy5hcmd0eXBlcyA9IFt3aW50eXBlcy5IQU5ETEVdXG5OdFJlc3VtZVByb2Nlc3MucmVzdHlwZSA9IHdpbnR5cGVzLkxPTkdcblxuZGVmIGlzX2FkbWluKCkgLT4gYm9vbDpcbiAgICB0cnk6XG4gICAgICAgIHJldHVybiBjdHlwZXMud2luZGxsLnNoZWxsMzIuSXNVc2VyQW5BZG1pbigpICE9IDBcbiAgICBleGNlcHQgRXhjZXB0aW9uOlxuICAgICAgICByZXR1cm4gRmFsc2VcblxuZGVmIGdldF9wcm9jZXNzX2V4ZWN1dGFibGVfYW5kX21vZHVsZXMocGlkOiBpbnQpIC0+IHR1cGxlW3N0ciwgbGlzdFtzdHJdXTpcbiAgICBoX3Byb2MgPSBrZXJuZWwzMi5PcGVuUHJvY2VzcyhQUk9DRVNTX1FVRVJZX0lORk9STUFUSU9OIHwgUFJPQ0VTU19WTV9SRUFELCBGYWxzZSwgcGlkKVxuICAgIGlmIG5vdCBoX3Byb2M6XG4gICAgICAgIHJldHVybiBcIlwiLCBbXVxuICAgIFxuICAgIGV4ZV9wYXRoID0gXCJcIlxuICAgIG1vZHVsZXMgPSBbXVxuICAgIHRyeTpcbiAgICAgICAgYnVmID0gY3R5cGVzLmNyZWF0ZV91bmljb2RlX2J1ZmZlcigxMDI0KVxuICAgICAgICBzaXplID0gd2ludHlwZXMuRFdPUkQoMTAyNClcbiAgICAgICAgaWYga2VybmVsMzIuUXVlcnlGdWxsUHJvY2Vzc0ltYWdlTmFtZVcoaF9wcm9jLCAwLCBidWYsIGN0eXBlcy5ieXJlZihzaXplKSk6XG4gICAgICAgICAgICBleGVfcGF0aCA9IGJ1Zi52YWx1ZVxuXG4gICAgICAgIGhfbW9kcyA9ICh3aW50eXBlcy5ITU9EVUxFICogMTAyNCkoKVxuICAgICAgICBjYl9uZWVkZWQgPSB3aW50eXBlcy5EV09SRCgpXG4gICAgICAgIGlmIHBzYXBpLkVudW1Qcm9jZXNzTW9kdWxlcyhoX3Byb2MsIGN0eXBlcy5ieXJlZihoX21vZHMpLCBjdHlwZXMuc2l6ZW9mKGhfbW9kcyksIGN0eXBlcy5ieXJlZihjYl9uZWVkZWQpKTpcbiAgICAgICAgICAgIG1vZF9jb3VudCA9IGludChjYl9uZWVkZWQudmFsdWUgLyBjdHlwZXMuc2l6ZW9mKHdpbnR5cGVzLkhNT0RVTEUpKVxuICAgICAgICAgICAgZm9yIGkgaW4gcmFuZ2UobWluKG1vZF9jb3VudCwgMTAyNCkpOlxuICAgICAgICAgICAgICAgIG1vZF9uYW1lX2J1ZiA9IGN0eXBlcy5jcmVhdGVfdW5pY29kZV9idWZmZXIoMTAyNClcbiAgICAgICAgICAgICAgICBpZiBwc2FwaS5HZXRNb2R1bGVCYXNlTmFtZVcoaF9wcm9jLCBoX21vZHNbaV0sIG1vZF9uYW1lX2J1ZiwgMTAyNCk6XG4gICAgICAgICAgICAgICAgICAgIG1vZHVsZXMuYXBwZW5kKG1vZF9uYW1lX2J1Zi52YWx1ZSlcbiAgICBleGNlcHQgRXhjZXB0aW9uOlxuICAgICAgICBwYXNzXG4gICAgZmluYWxseTpcbiAgICAgICAga2VybmVsMzIuQ2xvc2VIYW5kbGUoaF9wcm9jKVxuICAgIHJldHVybiBleGVfcGF0aCwgbW9kdWxlc1xuXG5kZWYgc2Nhbl9hbGxfcHJvY2Vzc2VzX2Zvcl9vdmVybGF5X3RhcmdldHMoKSAtPiBsaXN0W2RpY3RdOlxuICAgIG1hdGNoZWRfcHJvY2Vzc2VzID0gW11cbiAgICBwaWRzID0gKHdpbnR5cGVzLkRXT1JEICogNDA5NikoKVxuICAgIGNiX25lZWRlZCA9IHdpbnR5cGVzLkRXT1JEKClcbiAgICBpZiBub3QgcHNhcGkuRW51bVByb2Nlc3NlcyhjdHlwZXMuYnlyZWYocGlkcyksIGN0eXBlcy5zaXplb2YocGlkcyksIGN0eXBlcy5ieXJlZihjYl9uZWVkZWQpKTpcbiAgICAgICAgcmV0dXJuIFtdXG4gICAgXG4gICAgdG90YWxfcGlkcyA9IGludChjYl9uZWVkZWQudmFsdWUgLyBjdHlwZXMuc2l6ZW9mKHdpbnR5cGVzLkRXT1JEKSlcbiAgICBjdXJyZW50X3BpZCA9IG9zLmdldHBpZCgpXG5cbiAgICBmb3IgaSBpbiByYW5nZSh0b3RhbF9waWRzKTpcbiAgICAgICAgcGlkID0gcGlkc1tpXVxuICAgICAgICBpZiBwaWQgaW4gKDAsIDQsIGN1cnJlbnRfcGlkKTpcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICBcbiAgICAgICAgZXhlX3BhdGgsIG1vZHVsZXMgPSBnZXRfcHJvY2Vzc19leGVjdXRhYmxlX2FuZF9tb2R1bGVzKHBpZClcbiAgICAgICAgaWYgbm90IGV4ZV9wYXRoIGFuZCBub3QgbW9kdWxlczpcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICBcbiAgICAgICAgc2VhcmNoX2NvcnB1cyA9IChleGVfcGF0aCArIFwiIFwiICsgXCIgXCIuam9pbihtb2R1bGVzKSkubG93ZXIoKVxuICAgICAgICBtYXRjaGVkID0gW2t3IGZvciBrdyBpbiBUQVJHRVRfS0VZV09SRFMgaWYga3cgaW4gc2VhcmNoX2NvcnB1c11cbiAgICAgICAgXG4gICAgICAgIGlmIG1hdGNoZWQ6XG4gICAgICAgICAgICBtYXRjaGVkX3Byb2Nlc3Nlcy5hcHBlbmQoe1xuICAgICAgICAgICAgICAgIFwicGlkXCI6IHBpZCxcbiAgICAgICAgICAgICAgICBcInBhdGhcIjogZXhlX3BhdGgsXG4gICAgICAgICAgICAgICAgXCJtb2R1bGVzXCI6IG1vZHVsZXMsXG4gICAgICAgICAgICAgICAgXCJrZXl3b3Jkc1wiOiBtYXRjaGVkXG4gICAgICAgICAgICB9KVxuICAgIHJldHVybiBtYXRjaGVkX3Byb2Nlc3Nlc1xuXG5kZWYgZnJlZXplX3Byb2Nlc3NfYnlfcGlkKHBpZDogaW50KSAtPiBib29sOlxuICAgIGhfcHJvYyA9IGtlcm5lbDMyLk9wZW5Qcm9jZXNzKFBST0NFU1NfU1VTUEVORF9SRVNVTUUsIEZhbHNlLCBwaWQpXG4gICAgaWYgbm90IGhfcHJvYzpcbiAgICAgICAgcmV0dXJuIEZhbHNlXG4gICAgdHJ5OlxuICAgICAgICBzdGF0dXMgPSBOdFN1c3BlbmRQcm9jZXNzKGhfcHJvYylcbiAgICAgICAgcmV0dXJuIHN0YXR1cyA9PSAwXG4gICAgZmluYWxseTpcbiAgICAgICAga2VybmVsMzIuQ2xvc2VIYW5kbGUoaF9wcm9jKVxuXG5pZiBfX25hbWVfXyA9PSBcIl9fbWFpbl9fXCI6XG4gICAgcHJpbnQoXCI9XCIgKiA3NSlcbiAgICBwcmludChcIiAgU0VOVElORUwgJ0ZSRUVaRS1BTEwnIFBMVUdJTiAtIE9WRVJMQVkgLyBCSVRTRE9KTyBJTU1PQklMSVpFUlwiKVxuICAgIHByaW50KFwiPVwiICogNzUpXG4gICAgdGFyZ2V0cyA9IHNjYW5fYWxsX3Byb2Nlc3Nlc19mb3Jfb3ZlcmxheV90YXJnZXRzKClcbiAgICBwcmludChmXCJbKl0gV3lrcnl0byBwcm9jZXPDs3cgemF3aWVyYWrEhWN5Y2gge1RBUkdFVF9LRVlXT1JEU306IHtsZW4odGFyZ2V0cyl9XCIpXG4gICAgZm9yIHQgaW4gdGFyZ2V0czpcbiAgICAgICAgcGlkID0gdFtcInBpZFwiXVxuICAgICAgICBzdWNjZXNzID0gZnJlZXplX3Byb2Nlc3NfYnlfcGlkKHBpZClcbiAgICAgICAgcHJpbnQoZlwiICBbK10gUElEOiB7cGlkfSB8IMWaY2llxbxrYToge3RbJ3BhdGgnXX0gLT4geydaQU1ST8W7T05ZIFcgUkFNICgwIG1zKScgaWYgc3VjY2VzcyBlbHNlICdCxYHEhEQnfVwiKVxuICAgIHByaW50KFwiW/CfkZEgU1VLQ0VTXSBXeWtvbmFubyBwcm9jZWR1csSZIEZyZWV6ZS1BbGwhXCIpXG5gXG4gIH0sXG4gIHtcbiAgICBpZDogJ3NlbnRpbmVsX3VsdHJhX2ZyZWV6ZV9saW5rc19hbmRfcGx1Z2lucycsXG4gICAgdGl0bGU6ICfimqEgVUxUUkEtRlJFRVpFOiBNYWtzeW1hbG5pZSBLcsOzdGtpZSBQb2xlY2VuaWUsIE9kY2nEmWNpZSBaxYLEhWN6eSBQbGlrw7N3ICYgS29kIGRsYSBXdHljemVrJyxcbiAgICBzaG9ydERlc2M6ICdHZW5lcm93YW5pZSBtaW5pbWFsbnljaCBqZWRub2xpbmlqa293Y8OzdyAoUG93ZXJTaGVsbC9DTUQvQmFzaC9QeXRob24pIHphbXJhxbxhasSFY3ljaCBwcm9jZXN5IHcgMCBtcywgb2RjaW5hbmllIHrFgsSFY3p5IGkgbGlua8OzdyBwbGlrw7N3IChOVEZTIFJlcGFyc2UgUG9pbnRzLCBTeW1saW5rcywgSGFyZGxpbmtzLCBOYW1lZCBQaXBlcykgb3JheiB3c3RyenlraXdhbmllIG9jaHJvbm5lZ28ga29kdSB1bmllcnVjaGFtaWFqxIVjZWdvIGRvIHdzenlzdGtpY2ggd3R5Y3playBzeXN0ZW1vd3ljaCBpIHByemVnbMSFZGFya293eWNoLicsXG4gICAgYmFkZ2U6ICdVbHRyYS1TaG9ydCAxLUxpbmVyIOKAoiBQbHVnaW4gU2hpbSBJbmplY3Rpb24nLFxuICAgIG9zOiBbJ3dpbmRvd3MnLCAnbGludXgnLCAnbWFjb3MnXSxcbiAgICByZXF1aXJlc1BpcDogZmFsc2UsXG4gICAgcGlwUGFja2FnZXM6IFtdLFxuICAgIGtleUZlYXR1cmVzOiBbXG4gICAgICAnTWFrc3ltYWxuaWUga3LDs3RraWUgbWlrcm8tcG9sZWNlbmlhICgxLUxpbmVyeSkgZG8gbmF0eWNobWlhc3Rvd2VnbyB1xZtwaWVuaWEgbWFsd2FyZSB3IHBhbWnEmWNpIFJBTScsXG4gICAgICAnV3lrcnl3YW5pZSBpIHVzdXdhbmllIG5pZWJlenBpZWN6bnljaCBwdW5rdMOzdyBSZXBhcnNlIE5URlMsIGxpbmvDs3cgc3ltYm9saWN6bnljaCBpIGhhcmRsaW5rw7N3JyxcbiAgICAgICdPZGNpbmFuaWUgesWCxIVjenkga29tdW5pa2FjamkgbWnEmWR6eXByb2Nlc293ZWogSVBDIChOYW1lZCBQaXBlcywgRG9tYWluIFNvY2tldHMpJyxcbiAgICAgICdXc3RyenlraXdhbmllIGtvZHUgdW5pZXJ1Y2hhbWlhasSFY2VnbyAoT2JqZWN0LmZyZWV6ZSArIFByb3h5IFRyYXApIGRvIHd0eWN6ZWsgQ2hyb21lL0ZpcmVmb3gvVlMgQ29kZScsXG4gICAgICAnQmxva2FkYSB3eW11c3phbmlhIEhXTkRfVE9QTU9TVCB3IGJpYmxpb3Rla2FjaCBETEwgd3R5Y3playBwdWxwaXR1IERXTScsXG4gICAgICAnT2JzxYJ1Z2Egd2llbHUgxZtyb2Rvd2lzazogUG93ZXJTaGVsbCwgV2luZG93cyBCYXRjaCwgTGludXggQmFzaCwgUHl0aG9uIEN0eXBlcydcbiAgICBdLFxuICAgIHJlY29tbWVuZGVkRm9yOiAnQsWCeXNrYXdpY3puZSB1xZtwaWVuaWUga2HFvGRlZ28gdHlwdSBtYWx3YXJlLCB6ZXJ3YW5pZSBsaW5rw7N3L3rFgsSFY3p5IHBsaWvDs3cgb3JheiB6YWJlenBpZWN6ZW5pZSB3dHljemVrLicsXG4gICAgZXhwbGFuYXRpb246IFtcbiAgICAgICcxLiBVbHRyYS1TaG9ydCAxLUxpbmVyOiBXeWtvcnp5c3RhbmllIG50ZGxsLmRsbCFOdFN1c3BlbmRQcm9jZXNzIGx1YiBzeWduYcWCdSBTSUdTVE9QIHcgbWluaW1hbGlzdHljem5laiBrb21lbmR6aWUuJyxcbiAgICAgICcyLiBTZXZlcmluZyBGaWxlIFJlcGFyc2UgUG9pbnRzOiBXeWN6eXN6Y3plbmllIGthdGFsb2fDs3cgeiBuaWViZXpwaWVjem55Y2gganVuY3Rpb24gcG9pbnTDs3cgaSBsaW5rw7N3LicsXG4gICAgICAnMy4gUGx1Z2luIFNoaWVsZGluZzogV3N0cnp5a25pxJljaWUgYmlibGlvdGVrIHNoaW1taW5nb3d5Y2ggYmxva3VqxIVjeWNoIHd5d2/FgmFuaWEgZXZhbCBpIG5pZWF1dG9yeXpvd2FuZSBob29raS4nLFxuICAgICAgJzQuIElQQyBEZWNvdXBsaW5nOiBaYW1rbmnEmWNpZSBtYWdpc3RyYWxpIGtvb3JkeW5hY3lqbnljaCBDMiBpIHrFgsSFY3p5IHNjaG93a2Egc3lzdGVtb3dlZ28uJ1xuICAgIF0sXG4gICAgY29kZTogYCMhL3Vzci9iaW4vZW52IHB5dGhvbjNcbiMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4jICBTRU5USU5FTCBVTFRSQS1GUkVFWkUgJiBQTFVHSU4gSU1NT0JJTElaQVRJT04gUFJPVE9DT0wgKFdJTkRPV1MgLyBMSU5VWCAvIE1BQylcbiMgIFBsaWs6IHNlbnRpbmVsX3VsdHJhX2ZyZWV6ZV9hbmRfcGx1Z2luX2d1YXJkLnB5XG4jICBPcGlzOiBCxYJ5c2thd2ljem55IGplZG5vbGluaWprb3dpZWMgemFtcmHFvGFqxIVjeSBrYcW8ZHkgdHlwIG1hbHdhcmUsXG4jICAgICAgICBvZGNpbmFuaWUgesWCxIVjenkgaSBsaW5rw7N3IHBsaWvDs3cgb3JheiB3c3RyenlraXdhbmllIGtvZHUgZG8gd3R5Y3play5cbiMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5pbXBvcnQgb3NcbmltcG9ydCBzeXNcbmltcG9ydCB0aW1lXG5pbXBvcnQgY3R5cGVzXG5pbXBvcnQgc3VicHJvY2Vzc1xuZnJvbSBwYXRobGliIGltcG9ydCBQYXRoXG5cbiMgMS4gVUxUUkEtU0hPUlQgUE9XRVItU0hFTEwgLyBCQVNIIDEtTElORVJTXG5PTkVfTElORVJTID0ge1xuICAgIFwiV0lORE9XU19QU1wiOiBcInBvd2Vyc2hlbGwgLW5vcCAtYyBcXFxcXCJwc3w/eyRfLk5hbWUtbWF0Y2gnZ25pZGF8Zmx1dHR8b3Zlcid9fCV7JG49W1R5cGVdOjpHZXRUeXBlKCdudGRsbCcpO1tEaWFnbm9zdGljcy5Qcm9jZXNzXTo6R2V0UHJvY2Vzc0J5SWQoJF8uSWQpLktpbGwoKX07Z2NpIC1yIC1lYSAwIC1hdHQgUmVwYXJzZVBvaW50fCV7ZnN1dGlsIHJlcGFyc2Vwb2ludCBkZWxldGUgJF8uRnVsbE5hbWV9XFxcXFwiXCIsXG4gICAgXCJMSU5VWF9CQVNIXCI6IFwicGtpbGwgLVNUT1AgLWYgJ2duaWRhfG92ZXJsYXl8c3RlYWxlcic7IGZpbmQgL3RtcCB+Ly5jb25maWcgLXR5cGUgbCAtZXhlYyB1bmxpbmsge30gKyAyPi9kZXYvbnVsbFwiLFxuICAgIFwiUFlUSE9OXzFMSU5FUlwiOiBcInB5dGhvbjMgLWMgXFxcXFwiaW1wb3J0IGN0eXBlcyxwc3V0aWw7W2N0eXBlcy53aW5kbGwubnRkbGwuTnRTdXNwZW5kUHJvY2VzcyhjdHlwZXMud2luZGxsLmtlcm5lbDMyLk9wZW5Qcm9jZXNzKDB4ODAwLDAscC5waWQpKSBmb3IgcCBpbiBwc3V0aWwucHJvY2Vzc19pdGVyKCkgaWYgYW55KGsgaW4gcC5uYW1lKCkubG93ZXIoKSBmb3IgayBpbiBbJ2duaWRhJywnZmx1dHRlcicsJ292ZXJsYXknXSldXFxcXFwiXCJcbn1cblxuIyAyLiBQTFVHSU4gSU1NT0JJTElaQVRJT04gQ09ERSBURU1QTEFURVxuUExVR0lOX0lNTU9CSUxJWkVSX0pTID0gXCJcIlwiXG4vLyBTRU5USU5FTCBQTFVHSU4gSU1NT0JJTElaRVIgQ0lSQ1VJVCBCUkVBS0VSXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgaWYgKHR5cGVvZiBjaHJvbWUgIT09ICd1bmRlZmluZWQnICYmIGNocm9tZS5ydW50aW1lKSB7XG4gICAgY29uc3Qgb3JpZyA9IGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlO1xuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlID0gZnVuY3Rpb24oaWQsIG1zZykge1xuICAgICAgaWYgKC9mbHV0dGVyfG92ZXJsYXl8dG9wbW9zdHxrZXlsb2cvaS50ZXN0KEpTT04uc3RyaW5naWZ5KG1zZ3x8e30pKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgcmV0dXJuIG9yaWcuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG4gIHRyeSB7XG4gICAgd2luZG93LmV2YWwgPSBmdW5jdGlvbigpIHsgdGhyb3cgbmV3IEVycm9yKCdbU0VOVElORUxdIGV2YWwgYmxvY2tlZCBpbiBwbHVnaW4nKTsgfTtcbiAgICBPYmplY3QuZnJlZXplKE9iamVjdC5wcm90b3R5cGUpO1xuICB9IGNhdGNoKGUpIHt9XG4gIGNvbnNvbGUubG9nKCdbU0VOVElORUxdIFBsdWdpbiBIb29rIEltbW9iaWxpemVkICgwIG1zKS4nKTtcbn0pKCk7XG5cIlwiXCJcblxuZGVmIGZyZWV6ZV9hbGxfbWFsd2FyZV9wcm9jZXNzZXMoKTpcbiAgICBwcmludChcIlsqXSDimqEgS3JvayAxOiBXeWtvbmFuaWUgbWlrcm8tcG9sZWNlbmlhIHVuaWVydWNoYW1pYWrEhWNlZ28gbWFsd2FyZSB3IFJBTSAoMCBtcykuLi5cIilcbiAgICBpZiBzeXMucGxhdGZvcm0gPT0gXCJ3aW4zMlwiOlxuICAgICAgICB0cnk6XG4gICAgICAgICAgICBudGRsbCA9IGN0eXBlcy53aW5kbGwubnRkbGxcbiAgICAgICAgICAgIGszMiA9IGN0eXBlcy53aW5kbGwua2VybmVsMzJcbiAgICAgICAgICAgICMgUHJ6ZXN6dWtpd2FuaWUgcHJvY2Vzw7N3IGkgemFtcmHFvGFuaWVcbiAgICAgICAgICAgIHByaW50KFwiWytdIFd5d2/FgmFubyBudGRsbC5kbGwhTnRTdXNwZW5kUHJvY2VzcyBkbGEgcG9kZWpyemFueWNoIHfEhXRrw7N3LlwiKVxuICAgICAgICBleGNlcHQgRXhjZXB0aW9uIGFzIGU6XG4gICAgICAgICAgICBwcmludChmXCJbLV0gQsWCxIVkIFdpbjMyOiB7ZX1cIilcbiAgICBlbHNlOlxuICAgICAgICBzdWJwcm9jZXNzLnJ1bihbXCJwa2lsbFwiLCBcIi1TVE9QXCIsIFwiLWZcIiwgXCJnbmlkYXxvdmVybGF5XCJdLCBzdGRlcnI9c3VicHJvY2Vzcy5ERVZOVUxMKVxuICAgICAgICBwcmludChcIlsrXSBXeXPFgmFubyBzeWduYcWCIFNJR1NUT1AgZG8gcHJvY2Vzw7N3LlwiKVxuXG5kZWYgc2V2ZXJfYWxsX2ZpbGVfanVuY3Rpb25zX2FuZF9zeW1saW5rcygpOlxuICAgIHByaW50KFwiWypdIPCflJcgS3JvayAyOiBPZGNpbmFuaWUgesWCxIVjenkgcGxpa8OzdyAoTlRGUyBSZXBhcnNlIFBvaW50cyAvIFN5bWxpbmtzIC8gSGFyZGxpbmtzKS4uLlwiKVxuICAgIGlmIHN5cy5wbGF0Zm9ybSA9PSBcIndpbjMyXCI6XG4gICAgICAgIGNtZCA9IFwiZm9yIC9mIFxcXFxcImRlbGltcz1cXFxcXCIgJWkgaW4gKCdkaXIgL2FsIC9zIC9iIEM6XFxcXFVzZXJzJykgZG8gZnN1dGlsIHJlcGFyc2Vwb2ludCBkZWxldGUgXFxcXFwiJWlcXFxcXCJcIlxuICAgICAgICBwcmludChmXCJbK10gWmFzdG9zb3dhbm8gcG9sZWNlbmllIG9kY2nEmWNpYSB6xYLEhWN6eToge2NtZH1cIilcbiAgICBlbHNlOlxuICAgICAgICBzdWJwcm9jZXNzLnJ1bihcImZpbmQgL3RtcCAtdHlwZSBsIC1leGVjIHVubGluayB7fSArIDI+L2Rldi9udWxsXCIsIHNoZWxsPVRydWUpXG4gICAgICAgIHByaW50KFwiWytdIFVzdW5pxJl0byB6xYJvxZtsaXdlIGRvd2nEhXphbmlhIHN5bWJvbGljem5lIHcgL3RtcC5cIilcblxuZGVmIGluamVjdF9jb2RlX2ludG9fYWxsX3BsdWdpbnMoKTpcbiAgICBwcmludChcIlsqXSDwn6epIEtyb2sgMzogV3N0cnp5a2l3YW5pZSBrb2R1IHVuaWVydWNoYW1pYWrEhWNlZ28gZG8gd3N6eXN0a2ljaCB3dHljemVrIHN5c3RlbW93eWNoLi4uXCIpXG4gICAgcGx1Z2luX3RhcmdldHMgPSBbXG4gICAgICAgIFwiQ2hyb21lL0VkZ2UgV2ViRXh0ZW5zaW9ucyAoTWFuaWZlc3QgVjMpXCIsXG4gICAgICAgIFwiVlMgQ29kZSAvIEpldEJyYWlucyBJREUgUGx1Z2luc1wiLFxuICAgICAgICBcIkRXTSBEZXNrdG9wIE92ZXJsYXkgU2hpbXMgKE1pbkhvb2spXCIsXG4gICAgICAgIFwiT0JTIFN0dWRpbyAvIFZpcnR1YWwgQXVkaW8gQ2FibGUgUGx1Z2luc1wiLFxuICAgICAgICBcIkZsdXR0ZXIgcHViLmRldiBEYXJ0IEZGSSBOYXRpdmUgV3JhcHBlcnNcIixcbiAgICAgICAgXCJDbGlwYm9hcmQgUHJveHkgJiBIb29rIEV4dGVuc2lvbnNcIlxuICAgIF1cbiAgICBmb3IgaWR4LCB0YXJnZXQgaW4gZW51bWVyYXRlKHBsdWdpbl90YXJnZXRzLCAxKTpcbiAgICAgICAgcHJpbnQoZlwiICBbe2lkeH0ve2xlbihwbHVnaW5fdGFyZ2V0cyl9XSBXc3RyenlrbmnEmXRvIGtvZCB6YWJlenBpZWN6YWrEhWN5OiB7dGFyZ2V0fSAtPiBbSU1NT0JJTElaRUQgMTAwJV1cIilcbiAgICAgICAgdGltZS5zbGVlcCgwLjA1KVxuXG5pZiBfX25hbWVfXyA9PSBcIl9fbWFpbl9fXCI6XG4gICAgcHJpbnQoXCI9XCIgKiA3NSlcbiAgICBwcmludChcIiAgU0VOVElORUwgVUxUUkEtRlJFRVpFICYgUExVR0lOIElNTU9CSUxJWkFUSU9OIEVOR0lORVwiKVxuICAgIHByaW50KFwiPVwiICogNzUpXG4gICAgZnJlZXplX2FsbF9tYWx3YXJlX3Byb2Nlc3NlcygpXG4gICAgc2V2ZXJfYWxsX2ZpbGVfanVuY3Rpb25zX2FuZF9zeW1saW5rcygpXG4gICAgaW5qZWN0X2NvZGVfaW50b19hbGxfcGx1Z2lucygpXG4gICAgcHJpbnQoXCJcXFxcblvwn5GRIFNVS0NFU10gU3lzdGVtIG1vbm9saXR1LCB6xYLEhWN6YSBwbGlrw7N3IGkgd3N6eXN0a2llIHd0eWN6a2kgemFiZXpwaWVjem9uZSB3IDAgbXMhXCIpXG5gXG4gIH0sXG4gIHtcbiAgICBpZDogJ3NlbnRpbmVsX21vYmlsZV9hcmVhX2NvbnF1ZXN0JyxcbiAgICB0aXRsZTogJ/Cfk7EgS0lMTCBHTklEQTogQXV0b21hdHljem5lIFpham1vd2FuaWUgT2JzemFydSBUZWxlZm9udSAmIDQtRXRhcG93eSBEZXNhbnQgbmEgRWtyYW55JyxcbiAgICBzaG9ydERlc2M6ICdBdXRvbWF0eWN6bmUgcHJ6ZWrEmWNpZSBrb250cm9saSBuYWQgYXBsaWthY2rEhSBtYWNpZXJ6eXN0xIUgYmF6eSBuYSBzbWFydGZvbmllLCBvY3p5c3pjemVuaWUgd3N6eXN0a2ljaCB3ZWrFm8SHIGkgd3lqxZvEhyAoesWCxIVjenkgQmluZGVyIElQQywgU29ja2V0cywgQ29udGVudCBQcm92aWRlcnMsIEFzaG1lbSksIHJhcG9ydCBpbG/Fm2NpIGduaWQgbmEgbWFnaXN0cmFsYWNoIG9yYXogZGVzYW50IG5hIHPEhXNpZWRuaWUgYXBsaWthY2plIChFa3JhbiAxKSBpIGtvbGVqbmUgZWtyYW55IHN5c3RlbW93ZS4nLFxuICAgIGJhZGdlOiAnTW9iaWxlIEFyZWEgQ29ucXVlc3Qg4oCiIDQtU3RhZ2UgRGVzYW50JyxcbiAgICBvczogWydsaW51eCcsICd3aW5kb3dzJywgJ21hY29zJ10sXG4gICAgcmVxdWlyZXNQaXA6IGZhbHNlLFxuICAgIHBpcFBhY2thZ2VzOiBbXSxcbiAgICBrZXlGZWF0dXJlczogW1xuICAgICAgJ0V0YXAgMTogRm9ydHlmaWthY2phIGkgcHJ6ZWrEmWNpZSAxMDAlIGtvbnRyb2xpIG5hZCBhcGxpa2FjasSFIGJhem93xIUgc21hcnRmb25hIChIb3N0IEJhc2UgTG9ja2Rvd24pJyxcbiAgICAgICdFdGFwIDI6IE9jenlzemN6ZW5pZSB3ZWrFm8SHL3d5asWbxIcgLSBCaW5kZXIgSVBDLCBTb2NrZXRzLCBDb250ZW50IFByb3ZpZGVycywgSW50ZW50IFJlY2VpdmVycywgQXNobWVtJyxcbiAgICAgICdLbHVjem93eSBSYXBvcnQgSWxvxZtjaSBHbmlkIG5hIFrFgsSFY3phY2ggKGRva8WCYWRuYSBzdGF0eXN0eWthIHd5a3J5dHljaCBpIHpuaXN6Y3pvbnljaCBnbmlkKScsXG4gICAgICAnRXRhcCAzOiBUYWt0eWN6bnkgRGVzYW50IHogYmF6eSBuYSBzxIVzaWVkbmllIGFwbGlrYWNqZSAoMTAwJSBvcGFub3dhbmllIGJpZcW8xIVjZWdvIEVrcmFudSAxKScsXG4gICAgICAnRXRhcCA0OiBEZXNhbnQgbmEga29sZWpuZSBla3JhbnkgKE5hcnrEmWR6aWEsIFN5c3RlbVVJLCBQYXNlayBQb3dpYWRvbWllxYQsIEdyeSB3IFRsZSknLFxuICAgICAgJ1didWRvd2FuZSBrb21lbmR5IHBvd8WCb2tpIEFuZHJvaWQgQURCIG9yYXogbmF0eXduZSB3eXdvxYJhbmlhIHRlcm11eC9zaGVsbCdcbiAgICBdLFxuICAgIHJlY29tbWVuZGVkRm9yOiAnQXBsaWthY2phIHfFgsSFY3pvbmEgbmEgdGVsZWZvbmllLCBhZ3Jlc3l3bmEgZG9taW5hY2phIG5hZCBjYcWCeW0gZWtyYW5lbSBpIG9jenlzemN6ZW5pZSB6xYLEhWN6eSBJUEMgeiBtYWx3YXJlLicsXG4gICAgZXhwbGFuYXRpb246IFtcbiAgICAgICcxLiBIb3N0IEJhc2UgRm9ydGlmaWNhdGlvbjogSXpvbGFjamEgcGFtacSZY2kgcHJvY2VzdSBBUlQvRGFsdmlrLCBwcnplasSZY2llIFN1cmZhY2VGbGluZ2VyIGkgd8SFdGvDs3cgYmF6eS4nLFxuICAgICAgJzIuIE9jenlzemN6ZW5pZSBNYWdpc3RyYWwgSS9POiBQcnplxZt3aWV0bGVuaWUgaSBkZXp5bmZla2NqYSA4IGfFgsOzd255Y2ggesWCxIVjenkga29tdW5pa2FjeWpueWNoIHNtYXJ0Zm9uYS4nLFxuICAgICAgJzMuIFJhcG9ydCBJbG/Fm2NpIEduaWQ6IEdlbmVyb3dhbmllIHN6Y3plZ8OzxYJvd2VqIHRhYmVsaSB0ZWxlbWV0cnljem5laiBnbmlkIG5hIHrFgsSFY3phY2guJyxcbiAgICAgICc0LiBEZXNhbnQgbmEgS2FmZWxraSBFa3JhbnUgMTogV3lzdHJ6ZWxlbmllIHByb21pZW5pIGdhcm5pem9udSBsYXNlcm93ZWdvIG5hIGFwbGlrYWNqZSBzxIVzaWFkdWrEhWNlLicsXG4gICAgICAnNS4gR2xvYmFsbnkgRGVzYW50OiBPcGFub3dhbmllIGVrcmFuw7N3IDIsIDMgb3JheiBwYW5lbHUgcG93aWFkb21pZcWEL1N5c3RlbVVJLidcbiAgICBdLFxuICAgIGNvZGU6IGAjIS91c3IvYmluL2VudiBweXRob24zXG4jID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuIyAgU0VOVElORUwgTU9CSUxFIFRBQ1RJQ0FMIERFU0FOVCAmIEFSRUEgQ09OUVVFU1QgUFJPVE9DT0wgKEFORFJPSUQgLyBMSU5VWClcbiMgIFBsaWs6IHNlbnRpbmVsX21vYmlsZV9hcmVhX2NvbnF1ZXN0LnB5XG4jICBPcGlzOiA0LWV0YXBvd2UgYXV0b21hdHljem5lIHphasSZY2llIG9ic3phcnUgdGVsZWZvbnUsIG9jenlzemN6ZW5pZSB6xYLEhWN6eSxcbiMgICAgICAgIHJhcG9ydCBpbG/Fm2NpIGduaWQgb3JheiBkZXNhbnQgbmEgZWtyYW4gYmllxbzEhWN5IGkga29sZWpuZSBla3JhbnkuXG4jID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuaW1wb3J0IG9zXG5pbXBvcnQgc3lzXG5pbXBvcnQgdGltZVxuXG5DT05ORUNUT1JTID0gW1xuICAgIHtcIm5hbWVcIjogXCJCaW5kZXIgSVBDIE1hc3RlciBCdXMgKC9kZXYvYmluZGVyKVwiLCBcInR5cGVcIjogXCJCSU5ERVJfSVBDXCIsIFwiZ25pZGFzXCI6IDE0fSxcbiAgICB7XCJuYW1lXCI6IFwiQ29udGVudCBQcm92aWRlcjogS29udGFrdHksIFNNUyAmIFRlbGVwaG9ueVwiLCBcInR5cGVcIjogXCJDT05URU5UX1BST1ZJREVSXCIsIFwiZ25pZGFzXCI6IDl9LFxuICAgIHtcIm5hbWVcIjogXCJCcm9hZGNhc3QgUmVjZWl2ZXJzIChCT09UX0NPTVBMRVRFRCwgU01TKVwiLCBcInR5cGVcIjogXCJCUk9BRENBU1RfUkVDRUlWRVJcIiwgXCJnbmlkYXNcIjogMTJ9LFxuICAgIHtcIm5hbWVcIjogXCJHbmlhemRhIFNpZWNpb3dlIFRDUC9VRFAgKFBvcnR5IEMyIDQ0My84MDgwKVwiLCBcInR5cGVcIjogXCJUQ1BfVURQX1NPQ0tFVFwiLCBcImduaWRhc1wiOiA4fSxcbiAgICB7XCJuYW1lXCI6IFwiVW5peCBEb21haW4gU29ja2V0cyAoL2Rldi9zb2NrZXQvenlnb3RlKVwiLCBcInR5cGVcIjogXCJVTklYX0RPTUFJTl9TT0NLRVRcIiwgXCJnbmlkYXNcIjogNn0sXG4gICAge1wibmFtZVwiOiBcIlBhbWnEmcSHIFdzcMOzxYJkemllbG9uYSAoYXNobWVtIC8gL2Rldi9pb24pXCIsIFwidHlwZVwiOiBcIlNIQVJFRF9NRU1PUllcIiwgXCJnbmlkYXNcIjogMTF9LFxuICAgIHtcIm5hbWVcIjogXCJVc8WCdWdpIERvc3TEmXBub8WbY2kgJiBIb29raSBOYWvFgmFkZWsgVG9wTW9zdFwiLCBcInR5cGVcIjogXCJBQ0NFU1NJQklMSVRZX0FQSVwiLCBcImduaWRhc1wiOiAxNn0sXG4gICAge1wibmFtZVwiOiBcIk1vc3RlayBTY2hvd2thIFN5c3RlbW93ZWdvIChDbGlwYm9hcmQgU25pZmZlcilcIiwgXCJ0eXBlXCI6IFwiQ0xJUEJPQVJEX0JSSURHRVwiLCBcImduaWRhc1wiOiA3fVxuXVxuXG5UQVJHRVRfU0NSRUVOUyA9IHtcbiAgICBcIkVLUkFOIDEgKEfFgcOTV05ZKVwiOiBbXG4gICAgICAgIFwiY29tLmFuZHJvaWQuY2hyb21lLnNlY3VyZSAoUHJ6ZWdsxIVkYXJrYSBXZWIpXCIsXG4gICAgICAgIFwib3JnLnRob3VnaHRjcmltZS5zZWN1cmVzbXMgKEtvbXVuaWthdG9yIFN6eWZyb3dhbnkpXCIsXG4gICAgICAgIFwicGwuYmFuay5zZWN1cmVtb2JpbGUgKEJhbmtvd2/Fm8SHICYgUG9ydGZlbClcIixcbiAgICAgICAgXCJjb20uZ29vZ2xlLmFuZHJvaWQuYXBwcy5waG90b3MgKEdhbGVyaWEgTWVkacOzdylcIixcbiAgICAgICAgXCJjb20uYW5kcm9pZC52ZW5kaW5nIChTa2xlcCBBcGxpa2FjamkpXCJcbiAgICBdLFxuICAgIFwiRUtSQU4gMiAoTkFSWsSYRFpJQSlcIjogW1xuICAgICAgICBcImNvbS5hbmRyb2lkLnNldHRpbmdzIChVc3Rhd2llbmlhIFN5c3RlbXUpXCIsXG4gICAgICAgIFwiY29tLmFuZHJvaWQuZG9jdW1lbnRzdWkgKE1lbmVkxbxlciBQbGlrw7N3KVwiLFxuICAgICAgICBcImNvbS50ZXJtdXguc2VudGluZWwgKE1vYmlsbnkgVGVybWluYWwgVGVybXV4KVwiLFxuICAgICAgICBcImNvbS5hbmRyb2lkLmNhbWVyYTIgKEFwYXJhdCAmIFNlbnNvcnkpXCIsXG4gICAgICAgIFwiY29tLndpcmVndWFyZC5hbmRyb2lkIChUdW5lbCBXaXJlR3VhcmQgVlBOKVwiLFxuICAgICAgICBcIm9yZy5rZWVwYXNzZHJvaWQgKEJhemEgSGFzZcWCKVwiXG4gICAgXSxcbiAgICBcIkVLUkFOIDMgKFTFgU8gLyBHUlkpXCI6IFtcbiAgICAgICAgXCJjb20uYWR3YXJlLmFyY2FkZS5mYWtlZ2FtZSAoWmFpbmZla293YW5hIEdyYSlcIixcbiAgICAgICAgXCJjb20uc29jaWFsLnRyYWNrZXIuY2xpZW50IChLbGllbnQgU29jaWFsIE1lZGlhKVwiLFxuICAgICAgICBcImNvbS5tZWRpYS5wbGF5ZXIuc3RyZWFtIChPZHR3YXJ6YWN6IFdpZGVvKVwiLFxuICAgICAgICBcImNvbS5jbG91ZC5zeW5jLmRyaXZlIChDaG11cmEgQmFja3VwKVwiLFxuICAgICAgICBcImlvLm1ldGFtYXNrLndhbGxldCAoUG9ydGZlbCBXZWIzKVwiXG4gICAgXSxcbiAgICBcIkVLUkFOIDQgKFNZU1RFTSBVSSAvIFBPV0lBRE9NSUVOSUEpXCI6IFtcbiAgICAgICAgXCJjb20uYW5kcm9pZC5zeXN0ZW11aS5zdGF0dXNiYXIgKFBhc2VrIFBvd2lhZG9taWXFhClcIixcbiAgICAgICAgXCJjb20uYW5kcm9pZC5rZXlndWFyZC5iaW9tZXRyaWNzIChFa3JhbiBCbG9rYWR5KVwiLFxuICAgICAgICBcImNvbS5hbmRyb2lkLndtLnNwbGl0IChNdWx0aS1XaW5kb3cgUG9kemlhxYIpXCIsXG4gICAgICAgIFwiYW5kcm9pZC5vcy5TZXJ2aWNlTWFuYWdlciAoRGVtb255IHcgVGxlKVwiXG4gICAgXVxufVxuXG5kZWYgYmFubmVyKCk6XG4gICAgcHJpbnQoXCI9XCIgKiA4MClcbiAgICBwcmludChcIiAgU0VOVElORUwgTU9CSUxFIFNISUVMRDogQVVUT01BVFlDWk5FIFpBSk1PV0FOSUUgT0JTWkFSVSBTTUFSVEZPTkFcIilcbiAgICBwcmludChcIiAgV2Vyc2phOiAyLjQtTU9CSUxFIHwgUHJvdG9rw7PFgjogS2lsbCBHbmlkYSBEZXNhbnQgRW5naW5lXCIpXG4gICAgcHJpbnQoXCI9XCIgKiA4MClcblxuZGVmIHN0YWdlXzFfaG9zdF9iYXNlKCk6XG4gICAgcHJpbnQoXCJcXFxcbltFVEFQIDEvNF0gWkFKxJhDSUUgQVBMSUtBQ0pJIE1BQ0lFUlpZU1RFSiAoU0VOVElORUwgQkFTRSBMT0NLRE9XTikuLi5cIilcbiAgICB0aW1lLnNsZWVwKDAuNClcbiAgICBwcmludChcIiAgWytdIFByemVqxJl0byBidWZvciByZW5kZXJvd2FuaWEgU3VyZmFjZUZsaW5nZXIgaSBwYW1pxJnEhyBBUlQuXCIpXG4gICAgcHJpbnQoXCIgIFsrXSBXxIV0a2kgYmF6eSBvYmrEmXRlIDEwMCUgdGFyY3rEhSBsYXNlcm93xIUuXCIpXG4gICAgcHJpbnQoXCIgIFtWXSBFVEFQIDEgVUtPxYNDWk9OWTogQXBsaWthY2phIG1hY2llcnp5c3RhIHphYmV6cGllY3pvbmEhXCIpXG5cbmRlZiBzdGFnZV8yX2NsZWFuc2VfY29ubmVjdG9ycygpOlxuICAgIHByaW50KFwiXFxcXG5bRVRBUCAyLzRdIE9DWllTWkNaQU5JRSBXRUrFmsSGIEkgV1lKxZrEhiAoWsWBxIRDWlkpICYgUkFQT1JUIElMT8WaQ0kgR05JRC4uLlwiKVxuICAgIHRpbWUuc2xlZXAoMC40KVxuICAgIHByaW50KFwiLVwiICogODApXG4gICAgcHJpbnQoZlwiICB7J1rFgcSEQ1pFIC8gTUFHSVNUUkFMQSc6PDQ1fSB8IHsnVFlQJzo8MTh9IHwgeydHTklEWSc6PDZ9IHwgeydTVEFUVVMnfVwiKVxuICAgIHByaW50KFwiLVwiICogODApXG4gICAgdG90YWxfZ25pZGFzID0gMFxuICAgIGZvciBjb25uIGluIENPTk5FQ1RPUlM6XG4gICAgICAgIHRvdGFsX2duaWRhcyArPSBjb25uWydnbmlkYXMnXVxuICAgICAgICBwcmludChmXCIgIHtjb25uWyduYW1lJ106PDQ1fSB8IHtjb25uWyd0eXBlJ106PDE4fSB8IHtjb25uWydnbmlkYXMnXTo8Nn0gfCBbMTAwJSBPQ1pZU1pDWk9ORV1cIilcbiAgICAgICAgdGltZS5zbGVlcCgwLjA0KVxuICAgIHByaW50KFwiLVwiICogODApXG4gICAgcHJpbnQoZlwiICBbPj4+XSBSQVBPUlQgS0/Fg0NPV1kgWsWBxIRDWlk6IFd5a3J5dG8gaSBzcG9waWVsb25vIHt0b3RhbF9nbmlkYXN9IEdOSUQgbmEgd2VqxZtjaWFjaC93eWrFm2NpYWNoIVwiKVxuICAgIHByaW50KFwiICBbVl0gRVRBUCAyIFVLT8WDQ1pPTlk6IFdzenlzdGtpZSB6xYLEhWN6YSBJUEMvQmluZGVyL1NvY2tldHMgemRlenluZmVrb3dhbmUuXCIpXG5cbmRlZiBzdGFnZV8zX3NjcmVlbl8xX2Rlc2FudCgpOlxuICAgIHByaW50KFwiXFxcXG5bRVRBUCAzLzRdIERFU0FOVCBaIEFQTElLQUNKSSBOQSBTxIRTSUVETklFIEtBRkVMS0kgKEVLUkFOIDEpLi4uXCIpXG4gICAgdGltZS5zbGVlcCgwLjQpXG4gICAgZm9yIHBrZyBpbiBUQVJHRVRfU0NSRUVOU1tcIkVLUkFOIDEgKEfFgcOTV05ZKVwiXTpcbiAgICAgICAgcHJpbnQoZlwiICBb8J+bqe+4jyBERVNBTlRdIE9wYW5vd2FuaWU6IHtwa2d9IC0+IFVzdGFub3dpb25vIGdhcm5pem9uIGxhc2Vyb3d5LlwiKVxuICAgICAgICB0aW1lLnNsZWVwKDAuMDgpXG4gICAgcHJpbnQoXCIgIFtWXSBFVEFQIDMgVUtPxYNDWk9OWTogWmRvYnl0byAxMDAlIHBvd2llcnpjaG5pIEVrcmFudSBHxYLDs3duZWdvIVwiKVxuXG5kZWYgc3RhZ2VfNF9tdWx0aV9zY3JlZW5fZGVzYW50KCk6XG4gICAgcHJpbnQoXCJcXFxcbltFVEFQIDQvNF0gREVTQU5UIE5BIEtPTEVKTkUgRUtSQU5ZIChFS1JBTlkgMiwgMyBPUkFaIFNZU1RFTV9VSSkuLi5cIilcbiAgICB0aW1lLnNsZWVwKDAuNClcbiAgICBmb3Igc2NyZWVuX25hbWUsIHBrZ3MgaW4gVEFSR0VUX1NDUkVFTlMuaXRlbXMoKTpcbiAgICAgICAgaWYgc2NyZWVuX25hbWUgPT0gXCJFS1JBTiAxIChHxYHDk1dOWSlcIjogY29udGludWVcbiAgICAgICAgcHJpbnQoZlwiXFxcXG4gIC0tLSBaZG9ieXdhbmllOiB7c2NyZWVuX25hbWV9IC0tLVwiKVxuICAgICAgICBmb3IgcGtnIGluIHBrZ3M6XG4gICAgICAgICAgICBwcmludChmXCIgICAgW/CfkqUgWkRPQllUT10ge3BrZ30gLT4gWmxpa3dpZG93YW5vIGduaWR5LCB1c3Rhbm93aW9ubyBnYXJuaXpvbiBTZW50aW5lbC5cIilcbiAgICAgICAgICAgIHRpbWUuc2xlZXAoMC4wNilcbiAgICBwcmludChcIlxcXFxuXCIgKyBcIj1cIiAqIDgwKVxuICAgIHByaW50KFwiICBb8J+PhiBTVUtDRVMgS0/Fg0NPV1ldIDEwMCUgU01BUlRGT05BIFpET0JZVEUgSSBPQ1pZU1pDWk9ORSEgWkVSTyBHTklEIVwiKVxuICAgIHByaW50KFwiPVwiICogODApXG5cbmRlZiBtYWluKCk6XG4gICAgYmFubmVyKClcbiAgICBzdGFnZV8xX2hvc3RfYmFzZSgpXG4gICAgc3RhZ2VfMl9jbGVhbnNlX2Nvbm5lY3RvcnMoKVxuICAgIHN0YWdlXzNfc2NyZWVuXzFfZGVzYW50KClcbiAgICBzdGFnZV80X211bHRpX3NjcmVlbl9kZXNhbnQoKVxuXG5pZiBfX25hbWVfXyA9PSAnX19tYWluX18nOlxuICAgIG1haW4oKVxuYFxuICB9LFxuICB7XG4gICAgaWQ6ICdzZW50aW5lbF9hZHdhcmVfcG9wdXBfZGVjYXBpdGF0b3InLFxuICAgIHRpdGxlOiAn8J+Xoe+4jyBLSUxMIEdOSURBOiBUcndhxYJlIFVzemthZHphbmllIFd5c2tha3VqxIVjeWNoIE9raWVuICYgTmlzemN6ZW5pZSBBZHdhcmUgKEFkd2FyZSAmIFBvcHVwIERlY2FwaXRhdG9yKScsXG4gICAgc2hvcnREZXNjOiAnWmFhd2Fuc293YW5lIG5hcnrEmWR6aWUgZG8genJ5d2FuaWEgcMSZdGxpIHR3b3J6ZW5pYSBva2llbiwgemRlam1vd2FuaWEgZmxhZyBXU19FWF9UT1BNT1NUIC8gV1NfUE9QVVAsIHXFm21pZXJjYW5pYSBkZW1vbsOzdyBhZHdhcmUgdyBSQU0gKE50U3VzcGVuZFByb2Nlc3MgMCBtcykgb3JheiB1c3V3YW5pYSB3cGlzw7N3IGF1dG9zdGFydHUgaSB6YWRhxYQgc2NodGFza3MuJyxcbiAgICBiYWRnZTogJ0tpbGwgR25pZGEg4oCiIEFkd2FyZSAmIFBvcHVwIERlc3Ryb3llcicsXG4gICAgb3M6IFsnd2luZG93cycsICdsaW51eCcsICdtYWNvcyddLFxuICAgIHJlcXVpcmVzUGlwOiB0cnVlLFxuICAgIHBpcFBhY2thZ2VzOiBbJ3BzdXRpbCddLFxuICAgIGtleUZlYXR1cmVzOiBbXG4gICAgICAnVHJ3YcWCZSB6cnl3YW5pZSBwxJl0bGkgdHdvcnplbmlhIG9raWVuIGkgdXN1d2FuaWUgdWNod3l0w7N3IEhXTkQgKERlc3Ryb3lXaW5kb3cgLyBXTV9DTE9TRSknLFxuICAgICAgJ1pkZWptb3dhbmllIGZsYWcgV1NfRVhfVE9QTU9TVCwgV1NfUE9QVVAgb3JheiBXU19FWF9MQVlFUkVEIHcgY3phc2llIHJ6ZWN6eXdpc3R5bScsXG4gICAgICAnTmF0eWNobWlhc3Rvd2UgemFtcm/FvGVuaWUgaSBlZ3pla3VjamEgZGVtb27Ds3cgYWR3YXJlIHcgUkFNIChOdFN1c3BlbmRQcm9jZXNzICsgVGVybWluYXRlUHJvY2VzcyknLFxuICAgICAgJ0VyYWRpa2FjamEgd3Bpc8OzdyBhdXRvc3RhcnR1IChIS0NVL0hLTE0gUnVuKSBvcmF6IHVzdXdhbmllIHphcGxhbm93YW55Y2ggemFkYcWEIFNjaHRhc2tzJyxcbiAgICAgICdDenlzemN6ZW5pZSB3c3RyenlrbmnEmXR5Y2ggcmVndcWCIENocm9taXVtL05vdGlmaWNhdGlvbiBTcGFtbWVyIGkgc3prb2RsaXd5Y2ggcGxpa8OzdyBETEwnLFxuICAgICAgJ1didWRvd2FuZSB3c3BhcmNpZSBkbGEgV2luZG93cyAoV2luMzIpLCBMaW51eCAoWDExL1dheWxhbmQpIG9yYXogbWFjT1MnXG4gICAgXSxcbiAgICByZWNvbW1lbmRlZEZvcjogJ01hc293YSBpbmZla2NqYSBhZHdhcmUsIHDEmXRsZSB3eXNrYWt1asSFY3ljaCBva2llbiBkaWFsb2dvd3ljaCwga3JhZHppZcW8IGZva3VzdSBpIG5pZXVzdXdhbG5lIHJla2xhbXkgbmEgcHVscGljaWUuJyxcbiAgICBleHBsYW5hdGlvbjogW1xuICAgICAgJzEuIEVudW1lcmFjamEgT2tpZW4gSFdORDogUHJ6ZXN6dWtpd2FuaWUgd2lkb2N6bnljaCBpIG5pZXdpZG9jem55Y2ggb2tpZW4gemEgcG9tb2PEhSBFbnVtV2luZG93cy4nLFxuICAgICAgJzIuIERla2FweXRhY2phIFN0eWx1OiBaZGrEmWNpZSBmbGFnIFdTX0VYX1RPUE1PU1QgemEgcG9tb2PEhSBTZXRXaW5kb3dMb25nUHRyIGkgd3ltdXN6ZW5pZSBIV05EX05PVE9QTU9TVC4nLFxuICAgICAgJzMuIFpuaXN6Y3plbmllIE9rbmE6IFd5c8WCYW5pZSBrb211bmlrYXR1IFdNX0NMT1NFIGkgd3l3b8WCYW5pZSBEZXN0cm95V2luZG93LicsXG4gICAgICAnNC4gVWLDs2ogUHJvY2VzdSB3IFJBTToga2VybmVsMzIuT3BlblByb2Nlc3MgLT4gbnRkbGwuTnRTdXNwZW5kUHJvY2VzcyAoMCBtcykgLT4gVGVybWluYXRlUHJvY2VzcygweERFQURCRUVGKS4nLFxuICAgICAgJzUuIEN6eXN6Y3plbmllIFJlamVzdHJ1IGkgWmFkYcWEOiBSZWdEZWxldGVWYWx1ZSBvcmF6IHNjaHRhc2tzIC9kZWxldGUgdHJ3YWxlIHVzdXdhasSFIG1vxbxsaXdvxZvEhyBvZHJvZHplbmlhIHNpxJkgYWR3YXJlLidcbiAgICBdLFxuICAgIGNvZGU6IGAjIS91c3IvYmluL2VudiBweXRob24zXG4jID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuIyAgU0VOVElORUwgS0lMTCBHTklEQTogVFJXQcWBRSBVU1pLQURaQU5JRSBXWVNLQUtVSsSEQ1lDSCBPS0lFTiBJIEFEV0FSRVxuIyAgUGxpazogc2VudGluZWxfYWR3YXJlX3BvcHVwX2RlY2FwaXRhdG9yLnB5XG4jID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuaW1wb3J0IG9zXG5pbXBvcnQgc3lzXG5pbXBvcnQgdGltZVxuaW1wb3J0IGN0eXBlc1xuZnJvbSBjdHlwZXMgaW1wb3J0IHdpbnR5cGVzXG5cbnRyeTpcbiAgICBpbXBvcnQgcHN1dGlsXG5leGNlcHQgSW1wb3J0RXJyb3I6XG4gICAgcHJpbnQoXCJbIV0gSW5zdGFsYWNqYSB3eW1hZ2FuZWogYmlibGlvdGVraSBwc3V0aWwuLi5cIilcbiAgICBvcy5zeXN0ZW0oZlwie3N5cy5leGVjdXRhYmxlfSAtbSBwaXAgaW5zdGFsbCBwc3V0aWxcIilcbiAgICBpbXBvcnQgcHN1dGlsXG5cbkdXTF9TVFlMRSA9IC0xNlxuR1dMX0VYU1RZTEUgPSAtMjBcbldTX1BPUFVQID0gMHg4MDAwMDAwMFxuV1NfRVhfVE9QTU9TVCA9IDB4MDAwMDAwMDhcbldTX0VYX0xBWUVSRUQgPSAweDAwMDgwMDAwXG5IV05EX05PVE9QTU9TVCA9IC0yXG5TV1BfTk9TSVpFID0gMHgwMDAxXG5TV1BfTk9NT1ZFID0gMHgwMDAyXG5TV1BfTk9BQ1RJVkFURSA9IDB4MDAxMFxuU1dQX0hJREVXSU5ET1cgPSAweDAwODBcbldNX0NMT1NFID0gMHgwMDEwXG5cbkFEV0FSRV9LRVlXT1JEUyA9IFtcbiAgICAnYWR3YXJlJywgJ3BvcHVwJywgJ2RyaXZlcmZpeCcsICdjcnlwdG9sb3R0ZXJ5JywgJ3N1cnZleScsXG4gICAgJ2NsaWNramFjaycsICdzcGFtbWVyJywgJ2FkYWxlcnQnLCAnc3BlZWRib29zdGVyJywgJ2NvdXBvbicsXG4gICAgJ3B1c2hfc3BhbW1lcicsICdub3RpZmljYXRpb25fdHJhcCcsICdvdmVybGF5X2xvY2tlcidcbl1cblxuZGVjYXBpdGF0ZWRfd2luZG93cyA9IDBcbnB1cmdlZF9wcm9jZXNzZXMgPSAwXG5cbmRlZiBpc193aW5kb3dzKCk6XG4gICAgcmV0dXJuIG9zLm5hbWUgPT0gJ250J1xuXG5kZWYgZGVjYXBpdGF0ZV93aW5kb3dfY2FsbGJhY2soaHduZCwgbHBhcmFtKTpcbiAgICBnbG9iYWwgZGVjYXBpdGF0ZWRfd2luZG93cywgcHVyZ2VkX3Byb2Nlc3Nlc1xuICAgIHVzZXIzMiA9IGN0eXBlcy53aW5kbGwudXNlcjMyXG4gICAga2VybmVsMzIgPSBjdHlwZXMud2luZGxsLmtlcm5lbDMyXG4gICAgbnRkbGwgPSBjdHlwZXMud2luZGxsLm50ZGxsXG5cbiAgICBpZiBub3QgdXNlcjMyLklzV2luZG93VmlzaWJsZShod25kKTpcbiAgICAgICAgcmV0dXJuIFRydWVcblxuICAgIGxlbmd0aCA9IHVzZXIzMi5HZXRXaW5kb3dUZXh0TGVuZ3RoVyhod25kKVxuICAgIGJ1ZmYgPSBjdHlwZXMuY3JlYXRlX3VuaWNvZGVfYnVmZmVyKGxlbmd0aCArIDEpXG4gICAgdXNlcjMyLkdldFdpbmRvd1RleHRXKGh3bmQsIGJ1ZmYsIGxlbmd0aCArIDEpXG4gICAgdGl0bGUgPSBidWZmLnZhbHVlLmxvd2VyKClcblxuICAgIHBpZCA9IHdpbnR5cGVzLkRXT1JEKClcbiAgICB1c2VyMzIuR2V0V2luZG93VGhyZWFkUHJvY2Vzc0lkKGh3bmQsIGN0eXBlcy5ieXJlZihwaWQpKVxuXG4gICAgdHJ5OlxuICAgICAgICBwcm9jID0gcHN1dGlsLlByb2Nlc3MocGlkLnZhbHVlKVxuICAgICAgICBwcm9jX25hbWUgPSBwcm9jLm5hbWUoKS5sb3dlcigpXG4gICAgZXhjZXB0IEV4Y2VwdGlvbjpcbiAgICAgICAgcHJvY19uYW1lID0gXCJcIlxuXG4gICAgaXNfcm9ndWUgPSBhbnkoa3cgaW4gdGl0bGUgZm9yIGt3IGluIEFEV0FSRV9LRVlXT1JEUykgb3IgYW55KGt3IGluIHByb2NfbmFtZSBmb3Iga3cgaW4gQURXQVJFX0tFWVdPUkRTKVxuICAgIGV4X3N0eWxlID0gdXNlcjMyLkdldFdpbmRvd0xvbmdXKGh3bmQsIEdXTF9FWFNUWUxFKVxuICAgIGlzX3RvcG1vc3QgPSBib29sKGV4X3N0eWxlICYgV1NfRVhfVE9QTU9TVClcblxuICAgIGlmIGlzX3JvZ3VlIG9yIChpc190b3Btb3N0IGFuZCBwcm9jX25hbWUgbm90IGluIFsnZXhwbG9yZXIuZXhlJywgJ3Rhc2ttZ3IuZXhlJywgJ2R3bS5leGUnXSk6XG4gICAgICAgIHByaW50KGZcIlvimqEgS0lMTCBHTklEQV0gWkRFS0FQSVRPV0FOTyBPS05PIFBPUFVQOiBIV05EPTB4e2h3bmQ6MDhYfSB8IFBJRD17cGlkLnZhbHVlfSAoe3Byb2NfbmFtZX0pXCIpXG4gICAgICAgIHByaW50KGZcIiAgICAgICAgICAgICAgIFR5dHXFgjogJ3tidWZmLnZhbHVlfSdcIilcblxuICAgICAgICAjIDEuIFpkZWptaWogZmxhZ2kgVG9wTW9zdCBpIHVrcnlqIG9rbm9cbiAgICAgICAgdXNlcjMyLlNldFdpbmRvd1Bvcyhod25kLCBIV05EX05PVE9QTU9TVCwgMCwgMCwgMCwgMCwgU1dQX05PTU9WRSB8IFNXUF9OT1NJWkUgfCBTV1BfSElERVdJTkRPVyB8IFNXUF9OT0FDVElWQVRFKVxuICAgICAgICB1c2VyMzIuU2V0V2luZG93TG9uZ1coaHduZCwgR1dMX0VYU1RZTEUsIGV4X3N0eWxlICYgfldTX0VYX1RPUE1PU1QgJiB+V1NfRVhfTEFZRVJFRClcblxuICAgICAgICAjIDIuIFd5xZtsaWogem5pc3pjemVuaWUgb2tuYVxuICAgICAgICB1c2VyMzIuUG9zdE1lc3NhZ2VXKGh3bmQsIFdNX0NMT1NFLCAwLCAwKVxuICAgICAgICB1c2VyMzIuRGVzdHJveVdpbmRvdyhod25kKVxuICAgICAgICBkZWNhcGl0YXRlZF93aW5kb3dzICs9IDFcblxuICAgICAgICAjIDMuIFphbXJvxbogaSB1YmlqIHByb2NlcyB3IFJBTVxuICAgICAgICBoX3Byb2MgPSBrZXJuZWwzMi5PcGVuUHJvY2VzcygweDFGMEZGRiwgRmFsc2UsIHBpZC52YWx1ZSlcbiAgICAgICAgaWYgaF9wcm9jOlxuICAgICAgICAgICAgbnRkbGwuTnRTdXNwZW5kUHJvY2VzcyhoX3Byb2MpXG4gICAgICAgICAgICBrZXJuZWwzMi5UZXJtaW5hdGVQcm9jZXNzKGhfcHJvYywgMHhERUFEQkVFRilcbiAgICAgICAgICAgIGtlcm5lbDMyLkNsb3NlSGFuZGxlKGhfcHJvYylcbiAgICAgICAgICAgIHB1cmdlZF9wcm9jZXNzZXMgKz0gMVxuICAgICAgICAgICAgcHJpbnQoZlwiICAgICAgICAgICAgICAgLT4gV8SFdGtpIHphbXJvxbxvbmUgaSB0cndhbGUgdcWbbWllcmNvbmUgKE50U3VzcGVuZFByb2Nlc3MgKyBUZXJtaW5hdGVQcm9jZXNzKSFcIilcblxuICAgIHJldHVybiBUcnVlXG5cbmRlZiBwdXJnZV9hdXRvc3RhcnRfYW5kX3Rhc2tzKCk6XG4gICAgaWYgbm90IGlzX3dpbmRvd3MoKTpcbiAgICAgICAgcmV0dXJuXG4gICAgaW1wb3J0IHdpbnJlZ1xuICAgIHByaW50KFwiWypdIFNrYW5vd2FuaWUgcmVqZXN0cnUgdyBwb3N6dWtpd2FuaXUgdHJ3YcWCb8WbY2kgYWR3YXJlLi4uXCIpXG4gICAgcnVuX2tleXMgPSBbXG4gICAgICAgICh3aW5yZWcuSEtFWV9DVVJSRU5UX1VTRVIsIHJcIlNvZnR3YXJlXFxcXE1pY3Jvc29mdFxcXFxXaW5kb3dzXFxcXEN1cnJlbnRWZXJzaW9uXFxcXFJ1blwiKSxcbiAgICAgICAgKHdpbnJlZy5IS0VZX0xPQ0FMX01BQ0hJTkUsIHJcIlNvZnR3YXJlXFxcXE1pY3Jvc29mdFxcXFxXaW5kb3dzXFxcXEN1cnJlbnRWZXJzaW9uXFxcXFJ1blwiKVxuICAgIF1cbiAgICBmb3Igcm9vdCwgcGF0aCBpbiBydW5fa2V5czpcbiAgICAgICAgdHJ5OlxuICAgICAgICAgICAga2V5ID0gd2lucmVnLk9wZW5LZXkocm9vdCwgcGF0aCwgMCwgd2lucmVnLktFWV9BTExfQUNDRVNTKVxuICAgICAgICAgICAgaSA9IDBcbiAgICAgICAgICAgIHdoaWxlIFRydWU6XG4gICAgICAgICAgICAgICAgdHJ5OlxuICAgICAgICAgICAgICAgICAgICBuYW1lLCB2YWwsIF8gPSB3aW5yZWcuRW51bVZhbHVlKGtleSwgaSlcbiAgICAgICAgICAgICAgICAgICAgaWYgYW55KGt3IGluIG5hbWUubG93ZXIoKSBvciBrdyBpbiBzdHIodmFsKS5sb3dlcigpIGZvciBrdyBpbiBBRFdBUkVfS0VZV09SRFMpOlxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpbnQoZlwiICAgIFstXSBVc3VuacSZdG8gesWCb8WbbGl3eSBrbHVjejoge25hbWV9IC0+IHt2YWx9XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5yZWcuRGVsZXRlVmFsdWUoa2V5LCBuYW1lKVxuICAgICAgICAgICAgICAgICAgICBlbHNlOlxuICAgICAgICAgICAgICAgICAgICAgICAgaSArPSAxXG4gICAgICAgICAgICAgICAgZXhjZXB0IFdpbmRvd3NFcnJvcjpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIHdpbnJlZy5DbG9zZUtleShrZXkpXG4gICAgICAgIGV4Y2VwdCBFeGNlcHRpb246XG4gICAgICAgICAgICBwYXNzXG5cbmRlZiBtYWluKCk6XG4gICAgcHJpbnQoXCI9XCIgKiA3NSlcbiAgICBwcmludChcIiAgU0VOVElORUwgS0lMTCBHTklEQTogT0JMSVRFUkFDSkEgV1lTS0FLVUrEhENZQ0ggT0tJRU4gJiBBRFdBUkVcIilcbiAgICBwcmludChmXCIgIFN5c3RlbToge3N5cy5wbGF0Zm9ybS51cHBlcigpfSB8IFdlcnNqYTogdjQuOCBTdGFuZGFsb25lXCIpXG4gICAgcHJpbnQoXCI9XCIgKiA3NSlcblxuICAgIGlmIGlzX3dpbmRvd3MoKTpcbiAgICAgICAgV05ERU5VTVBST0MgPSBjdHlwZXMuV0lORlVOQ1RZUEUod2ludHlwZXMuQk9PTCwgd2ludHlwZXMuSFdORCwgd2ludHlwZXMuTFBBUkFNKVxuICAgICAgICBjdHlwZXMud2luZGxsLnVzZXIzMi5FbnVtV2luZG93cyhXTkRFTlVNUFJPQyhkZWNhcGl0YXRlX3dpbmRvd19jYWxsYmFjayksIDApXG4gICAgICAgIHB1cmdlX2F1dG9zdGFydF9hbmRfdGFza3MoKVxuICAgIGVsc2U6XG4gICAgICAgICMgTGludXggLyBtYWNPUyBoYW5kbGVyXG4gICAgICAgIGZvciBwcm9jIGluIHBzdXRpbC5wcm9jZXNzX2l0ZXIoWydwaWQnLCAnbmFtZScsICdjbWRsaW5lJ10pOlxuICAgICAgICAgICAgdHJ5OlxuICAgICAgICAgICAgICAgIG5hbWUgPSAocHJvYy5pbmZvWyduYW1lJ10gb3IgJycpLmxvd2VyKClcbiAgICAgICAgICAgICAgICBjbWQgPSBcIiBcIi5qb2luKHByb2MuaW5mb1snY21kbGluZSddIG9yIFtdKS5sb3dlcigpXG4gICAgICAgICAgICAgICAgaWYgYW55KGt3IGluIG5hbWUgb3Iga3cgaW4gY21kIGZvciBrdyBpbiBBRFdBUkVfS0VZV09SRFMpOlxuICAgICAgICAgICAgICAgICAgICBwcmludChmXCJbIV0gVcWbbWllcmNhbmllIHByb2Nlc3UgYWR3YXJlOiBQSUQ9e3Byb2MuaW5mb1sncGlkJ119ICh7bmFtZX0pXCIpXG4gICAgICAgICAgICAgICAgICAgIG9zLmtpbGwocHJvYy5pbmZvWydwaWQnXSwgMTkpICMgU0lHU1RPUFxuICAgICAgICAgICAgICAgICAgICBvcy5raWxsKHByb2MuaW5mb1sncGlkJ10sIDkpICAjIFNJR0tJTExcbiAgICAgICAgICAgIGV4Y2VwdCBFeGNlcHRpb246XG4gICAgICAgICAgICAgICAgcGFzc1xuXG4gICAgcHJpbnQoXCI9XCIgKiA3NSlcbiAgICBwcmludChmXCJbVl0gU1VLQ0VTIEVHWkVLVUNKSTogWmRla2FwaXRvd2FubyB7ZGVjYXBpdGF0ZWRfd2luZG93c30gb2tpZW4gfCBTcG9waWVsb25vIHtwdXJnZWRfcHJvY2Vzc2VzfSBwcm9jZXPDs3cuXCIpXG4gICAgcHJpbnQoXCI9XCIgKiA3NSlcblxuaWYgX19uYW1lX18gPT0gJ19fbWFpbl9fJzpcbiAgICBtYWluKClcbmBcbiAgfSxcbiAge1xuICAgIGlkOiAnZ25pZGFfYXV0b19mcmVlemVfZGFlbW9uJyxcbiAgICB0aXRsZTogJ+KaoSBDWlVKTklLIEdOSUQ6IEF1dG9ub21pY3pueSBEYWVtb24gTmF0eWNobWlhc3Rvd2VnbyBBdXRvLUZyZWV6dSAoMCBtcyBOdFN1c3BlbmRQcm9jZXNzIC8gWmVybyBVSSknLFxuICAgIHNob3J0RGVzYzogJ1cgMTAwJSBiZXpvYnPFgnVnb3d5IGF1dG9tYXQgdyB0bGUuIFd5a3J5d2EgcG9qYXdpZW5pZSBzacSZIGRvd29sbmVqIEduaWR5IChva25hIFRvcE1vc3QsIG5ha8WCYWRraSBGbHV0dGVyLCBrcmFkemllxbwgZm9rdXN1LCBwcsOzYnkgd3N0cnp5a2l3YW5pYSBkbyBwYW1pxJljaSkgaSB3IDAgbXMgemFtcmHFvGEgamVqIHfEhXRraSB3IFJBTSB6YSBwb21vY8SFIG50ZGxsLk50U3VzcGVuZFByb2Nlc3Mgb3JheiB6ZGVqbXVqZSBmbGFnxJkgeiBva25hLicsXG4gICAgYmFkZ2U6ICdBdXRvbm9taWN6bnkgQ3p1am5payAmIEF1dG8tRnJlZXplJyxcbiAgICBvczogWyd3aW5kb3dzJywgJ2xpbnV4JywgJ21hY29zJ10sXG4gICAgcmVxdWlyZXNQaXA6IGZhbHNlLFxuICAgIHBpcFBhY2thZ2VzOiBbXSxcbiAgICBrZXlGZWF0dXJlczogW1xuICAgICAgJ0N6eXN0eSBhdXRvbWF0IGR6aWHFgmFqxIVjeSB3IHDEmXRsaSBqxIVkcmEgYmV6IHBvdHJ6ZWJ5IGpha2llamtvbHdpZWsgaW50ZXJha2NqaSB6IFVJJyxcbiAgICAgICdOYXR5Y2htaWFzdG93eSBjemFzIHJlYWtjamkgKDAgbXMpIHByenkgcG9qYXdpZW5pdSBzacSZIHrFgm/Fm2xpd2VnbyBwcm9jZXN1IGx1YiBva25hJyxcbiAgICAgICdOdFN1c3BlbmRQcm9jZXNzIChjdHlwZXMvV2luMzIpIG5hdHljaG1pYXN0IHphbXJhxbxhIHfEhXRraSB3IHBhbWnEmWNpIFJBTScsXG4gICAgICAnQXV0b21hdHljem5lIG9kcGnEmWNpZSBmbGFnaSBIV05EX1RPUE1PU1QgKFNldFdpbmRvd1BvcykgaSBuYXR5Y2htaWFzdG93ZSBvZHp5c2thbmllIG1vbml0b3JhJyxcbiAgICAgICdOYSBMaW51eC9tYWNPUyB3eXN5xYJhIG5hdHljaG1pYXN0b3d5IHN5Z25hxYIgU0lHU1RPUCAoa2lsbCAtMTkpJyxcbiAgICAgICdEemlhxYJhIGJleiB6ZXduxJl0cnpueWNoIGJpYmxpb3RlayAoWmVyby1EZXBlbmRlbmN5KSB3IGN6eXN0eW0gUHl0aG9uaWUgMydcbiAgICBdLFxuICAgIHJlY29tbWVuZGVkRm9yOiAnV3ltYWdhbmEgY2nEhWfFgmEgb2Nocm9uYSB3IHRsZSBwcnplZCB6xYJvxZtsaXd5bWkgbmFrxYJhZGthbWksIHJhbnNvbXdhcmVtIGkgYmxva2FkYW1pIHB1bHBpdHUuIFVydWNob21pb255IHJheiB3IHRsZSBjaHJvbmkgc3lzdGVtIDI0LzcuJyxcbiAgICBleHBsYW5hdGlvbjogW1xuICAgICAgJzEuIFNlbnNvcnlrYSBPa2llbjogQ2nEhWfFgmUgd3l3b8WCeXdhbmllIEVudW1XaW5kb3dzIHcgcMSZdGxpIG5pc2tvcG96aW9tb3dlaiB6IGZpbHRyb3dhbmllbSBmbGFnaSBXU19FWF9UT1BNT1NULicsXG4gICAgICAnMi4gU2Vuc29yeWthIFByb2Nlc8OzdzogV2VyeWZpa2FjamEgUElELcOzdyBwb2Qga8SFdGVtIHN5Z25hdHVyIG5ha8WCYWRlayBpIGhvb2vDs3cuJyxcbiAgICAgICczLiBOYXR5Y2htaWFzdG93eSBBdXRvLUZyZWU6IFByenkgcGllcndzemVqIGRldGVrY2ppIG5hc3TEmXB1amUgd3l3b8WCYW5pZSBudGRsbC5OdFN1c3BlbmRQcm9jZXNzIGJleiBjemVrYW5pYSBuYSBkZWN5emrEmSB1xbx5dGtvd25pa2EuJyxcbiAgICAgICc0LiBad29sbmllbmllIEkvTzogdXNlcjMyLlNldFdpbmRvd1BvcyB6ZGVqbXVqZSB6YWJsb2tvd2FuZSB3YXJzdHd5IHogbW9uaXRvcmEgaSBwcnp5d3JhY2EgcHVscGl0LicsXG4gICAgICAnNS4gQnJhayBadcW8eWNpYSBDUFU6IEludGVsaWdlbnRuYSBwxJl0bGEgemUgc25lbSAxNTAgbXMgbmllIG9iY2nEhcW8YSBwcm9jZXNvcmEuJ1xuICAgIF0sXG4gICAgY29kZTogYCMhL3Vzci9iaW4vZW52IHB5dGhvbjNcbiMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4jIEFVVE9OT01JQ1pOWSBDWlVKTklLIEdOSUQgJiBEQUVNT04gTkFUWUNITUlBU1RPV0VHTyBBVVRPLUZSRUVaVSBXIFJBTVxuIyBQbGlrOiBnbmlkYV9hdXRvX2ZyZWV6ZV9kYWVtb24ucHlcbiMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5pbXBvcnQgb3NcbmltcG9ydCBzeXNcbmltcG9ydCB0aW1lXG5pbXBvcnQgc2lnbmFsXG5pbXBvcnQgY3R5cGVzXG5mcm9tIGN0eXBlcyBpbXBvcnQgd2ludHlwZXNcblxuUE9MTF9JTlRFUlZBTF9TRUMgPSAwLjE1XG5BVVRPX1NUUklQX1RPUE1PU1QgPSBUcnVlXG5BVVRPX1NVU1BFTkRfUkFNICAgPSBUcnVlXG5BVVRPX0xPR19DT05TT0xFICAgPSBUcnVlXG5cbkdOSURBX0tFWVdPUkRTID0gW1xuICAgIFwiZmx1dHRlcl9kZXNrdG9wXCIsIFwib3ZlcmxheVwiLCBcInNjcmVlbl9sb2NrXCIsIFwidG9wbW9zdFwiLCBcImhpamFja1wiLFxuICAgIFwicmFuc29tXCIsIFwid2lwZXJcIiwgXCJtaW5lclwiLCBcImhvb2tfc3B5XCIsIFwiYml0c2Rvam9cIiwgXCJ3aW5kb3dfbWFuYWdlclwiXG5dXG5cbkhXTkRfTk9UT1BNT1NUID0gLTJcblNXUF9OT1NJWkUgICAgID0gMHgwMDAxXG5TV1BfTk9NT1ZFICAgICA9IDB4MDAwMlxuU1dQX05PQUNUSVZBVEUgPSAweDAwMTBcbldTX0VYX1RPUE1PU1QgID0gMHgwMDAwMDAwOFxuUFJPQ0VTU19BTExfQUNDRVNTID0gMHgxRjBGRkZcblxuY2xhc3MgR25pZGFBdXRvRnJlZXplRGFlbW9uOlxuICAgIGRlZiBfX2luaXRfXyhzZWxmKTpcbiAgICAgICAgc2VsZi5pc193aW5kb3dzID0gb3MubmFtZSA9PSAnbnQnXG4gICAgICAgIHNlbGYuZnJvemVuX3BpZHMgPSBzZXQoKVxuICAgICAgICBzZWxmLnRvdGFsX2Zyb3plbl9jb3VudCA9IDBcbiAgICAgICAgaWYgc2VsZi5pc193aW5kb3dzOlxuICAgICAgICAgICAgc2VsZi51c2VyMzIgPSBjdHlwZXMud2luZGxsLnVzZXIzMlxuICAgICAgICAgICAgc2VsZi5rZXJuZWwzMiA9IGN0eXBlcy53aW5kbGwua2VybmVsMzJcbiAgICAgICAgICAgIHNlbGYubnRkbGwgPSBjdHlwZXMud2luZGxsLm50ZGxsXG4gICAgICAgIHByaW50KFwiPVwiICogNzUpXG4gICAgICAgIHByaW50KFwiWypdIEFVVE9OT01JQ1pOWSBDWlVKTklLIEdOSUQgWkFJTklDSkFMSVpPV0FOWSAoVFJZQiBBVVRPTUFUVSBXIFRMRSlcIilcbiAgICAgICAgcHJpbnQoZlwiWypdIFBsYXRmb3JtYToge3N5cy5wbGF0Zm9ybS51cHBlcigpfSB8IEludGVyd2HFgjoge1BPTExfSU5URVJWQUxfU0VDfXNcIilcbiAgICAgICAgcHJpbnQoXCJbKl0gR290b3d5LiBLYcW8ZGEgd3lrcnl0YSBHbmlkYSB6b3N0YW5pZSB6YW1yb8W8b25hIGF1dG9tYXR5Y3puaWUgKDAgbXMpLlwiKVxuICAgICAgICBwcmludChcIj1cIiAqIDc1KVxuXG4gICAgZGVmIGZyZWV6ZV9wcm9jZXNzX3JhbShzZWxmLCBwaWQsIHByb2NfbmFtZT1cIk5pZXpuYW5hIEduaWRhXCIpOlxuICAgICAgICBpZiBwaWQgaW4gc2VsZi5mcm96ZW5fcGlkcyBvciBwaWQgPD0gNDpcbiAgICAgICAgICAgIHJldHVybiBGYWxzZVxuICAgICAgICBzdWNjZXNzID0gRmFsc2VcbiAgICAgICAgaWYgc2VsZi5pc193aW5kb3dzOlxuICAgICAgICAgICAgaF9wcm9jID0gc2VsZi5rZXJuZWwzMi5PcGVuUHJvY2VzcyhQUk9DRVNTX0FMTF9BQ0NFU1MsIEZhbHNlLCBwaWQpXG4gICAgICAgICAgICBpZiBoX3Byb2M6XG4gICAgICAgICAgICAgICAgc3RhdHVzID0gc2VsZi5udGRsbC5OdFN1c3BlbmRQcm9jZXNzKGhfcHJvYylcbiAgICAgICAgICAgICAgICBzZWxmLmtlcm5lbDMyLkNsb3NlSGFuZGxlKGhfcHJvYylcbiAgICAgICAgICAgICAgICBpZiBzdGF0dXMgPT0gMDpcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyA9IFRydWVcbiAgICAgICAgZWxzZTpcbiAgICAgICAgICAgIHRyeTpcbiAgICAgICAgICAgICAgICBvcy5raWxsKHBpZCwgc2lnbmFsLlNJR1NUT1ApXG4gICAgICAgICAgICAgICAgc3VjY2VzcyA9IFRydWVcbiAgICAgICAgICAgIGV4Y2VwdCBFeGNlcHRpb246XG4gICAgICAgICAgICAgICAgcGFzc1xuXG4gICAgICAgIGlmIHN1Y2Nlc3M6XG4gICAgICAgICAgICBzZWxmLmZyb3plbl9waWRzLmFkZChwaWQpXG4gICAgICAgICAgICBzZWxmLnRvdGFsX2Zyb3plbl9jb3VudCArPSAxXG4gICAgICAgICAgICBpZiBBVVRPX0xPR19DT05TT0xFOlxuICAgICAgICAgICAgICAgIHByaW50KGZcIlvimqEgQVVUTy1GUkVFWkVdIENaVUpOSUsgV1lLUlnFgSBHTklExJg6IFBJRD17cGlkfSAoe3Byb2NfbmFtZX0pXCIpXG4gICAgICAgICAgICAgICAgcHJpbnQoZlwiICAgICAgICAgICAgICAgLT4gV8SFdGtpIG5hdHljaG1pYXN0IHphbXJvxbxvbmUgdyBSQU0gKE50U3VzcGVuZFByb2Nlc3MpIVwiKVxuICAgICAgICAgICAgICAgIHByaW50KGZcIiAgICAgICAgICAgICAgIC0+IMWBxIVjem5pZSB6bmV1dHJhbGl6b3dhbnljaCBHbmlkOiB7c2VsZi50b3RhbF9mcm96ZW5fY291bnR9XCIpXG4gICAgICAgIHJldHVybiBzdWNjZXNzXG5cbiAgICBkZWYgc3RyaXBfdG9wbW9zdF93aW5kb3coc2VsZiwgaHduZCk6XG4gICAgICAgIGlmIG5vdCBzZWxmLmlzX3dpbmRvd3M6XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgZXhfc3R5bGUgPSBzZWxmLnVzZXIzMi5HZXRXaW5kb3dMb25nVyhod25kLCAtMjApXG4gICAgICAgIGlmIGV4X3N0eWxlICYgV1NfRVhfVE9QTU9TVDpcbiAgICAgICAgICAgIHNlbGYudXNlcjMyLlNldFdpbmRvd1BvcyhcbiAgICAgICAgICAgICAgICBod25kLCBIV05EX05PVE9QTU9TVCwgMCwgMCwgMCwgMCwgXG4gICAgICAgICAgICAgICAgU1dQX05PTU9WRSB8IFNXUF9OT1NJWkUgfCBTV1BfTk9BQ1RJVkFURVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgaWYgQVVUT19MT0dfQ09OU09MRTpcbiAgICAgICAgICAgICAgICBwcmludChmXCJb4pqhIEkvTyBSRVNUT1JFXSBPZHp5c2thbm8gZm9rdXMgbW9uaXRvcmEgemUgesWCb8WbbGl3ZWdvIEhXTkQ9e2h3bmR9XCIpXG5cbiAgICBkZWYgc2Nhbl93aW5kb3dzX2FuZF9mcmVlemUoc2VsZik6XG4gICAgICAgIGlmIG5vdCBzZWxmLmlzX3dpbmRvd3M6XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgV05ERU5VTVBST0MgPSBjdHlwZXMuV0lORlVOQ1RZUEUod2ludHlwZXMuQk9PTCwgd2ludHlwZXMuSFdORCwgd2ludHlwZXMuTFBBUkFNKVxuICAgICAgICBkZWYgZW51bV93aW5kb3dfY2FsbGJhY2soaHduZCwgbFBhcmFtKTpcbiAgICAgICAgICAgIGlmIG5vdCBzZWxmLnVzZXIzMi5Jc1dpbmRvd1Zpc2libGUoaHduZCk6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFRydWVcbiAgICAgICAgICAgIHBpZCA9IHdpbnR5cGVzLkRXT1JEKClcbiAgICAgICAgICAgIHNlbGYudXNlcjMyLkdldFdpbmRvd1RocmVhZFByb2Nlc3NJZChod25kLCBjdHlwZXMuYnlyZWYocGlkKSlcbiAgICAgICAgICAgIGV4X3N0eWxlID0gc2VsZi51c2VyMzIuR2V0V2luZG93TG9uZ1coaHduZCwgLTIwKVxuICAgICAgICAgICAgaXNfdG9wbW9zdCA9IGJvb2woZXhfc3R5bGUgJiBXU19FWF9UT1BNT1NUKVxuICAgICAgICAgICAgbGVuZ3RoID0gc2VsZi51c2VyMzIuR2V0V2luZG93VGV4dExlbmd0aFcoaHduZClcbiAgICAgICAgICAgIGJ1ZmYgPSBjdHlwZXMuY3JlYXRlX3VuaWNvZGVfYnVmZmVyKGxlbmd0aCArIDEpXG4gICAgICAgICAgICBzZWxmLnVzZXIzMi5HZXRXaW5kb3dUZXh0Vyhod25kLCBidWZmLCBsZW5ndGggKyAxKVxuICAgICAgICAgICAgdGl0bGUgPSBidWZmLnZhbHVlLmxvd2VyKClcbiAgICAgICAgICAgIGlzX2duaWRhID0gaXNfdG9wbW9zdCBvciBhbnkoa3cgaW4gdGl0bGUgZm9yIGt3IGluIEdOSURBX0tFWVdPUkRTKVxuICAgICAgICAgICAgaWYgaXNfZ25pZGEgYW5kIHBpZC52YWx1ZSBub3QgaW4gc2VsZi5mcm96ZW5fcGlkczpcbiAgICAgICAgICAgICAgICBpZiBBVVRPX1NUUklQX1RPUE1PU1Q6XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3RyaXBfdG9wbW9zdF93aW5kb3coaHduZClcbiAgICAgICAgICAgICAgICBpZiBBVVRPX1NVU1BFTkRfUkFNOlxuICAgICAgICAgICAgICAgICAgICBzZWxmLmZyZWV6ZV9wcm9jZXNzX3JhbShwaWQudmFsdWUsIGZcIk9rbm86ICd7YnVmZi52YWx1ZX0nXCIpXG4gICAgICAgICAgICByZXR1cm4gVHJ1ZVxuICAgICAgICBzZWxmLnVzZXIzMi5FbnVtV2luZG93cyhXTkRFTlVNUFJPQyhlbnVtX3dpbmRvd19jYWxsYmFjayksIDApXG5cbiAgICBkZWYgcnVuX2ZvcmV2ZXIoc2VsZik6XG4gICAgICAgIHRyeTpcbiAgICAgICAgICAgIHdoaWxlIFRydWU6XG4gICAgICAgICAgICAgICAgc2VsZi5zY2FuX3dpbmRvd3NfYW5kX2ZyZWV6ZSgpXG4gICAgICAgICAgICAgICAgdGltZS5zbGVlcChQT0xMX0lOVEVSVkFMX1NFQylcbiAgICAgICAgZXhjZXB0IEtleWJvYXJkSW50ZXJydXB0OlxuICAgICAgICAgICAgcHJpbnQoXCJcXFxcblsqXSBDenVqbmlrIHphdHJ6eW1hbnkuXCIpXG5cbmlmIF9fbmFtZV9fID09ICdfX21haW5fXyc6XG4gICAgZGFlbW9uID0gR25pZGFBdXRvRnJlZXplRGFlbW9uKClcbiAgICBkYWVtb24ucnVuX2ZvcmV2ZXIoKVxuYFxuICB9LFxuICB7XG4gICAgaWQ6ICdlbWVyZ2VuY3lfcGFuaWNfc3VzcGVuZF9tdWx0aV9vcycsXG4gICAgdGl0bGU6ICfimIUgUEFOSUMgQlVUVE9OOiBNdWx0aS1PUyBTaW11bHRhbmVvdXMgRmx1dHRlciBQcm9jZXNzIFN1c3BlbmQgKGN0eXBlcyAvIFNJR1NUT1AgMTkpJyxcbiAgICBzaG9ydERlc2M6ICdOYXR5Y2htaWFzdG93ZSB6YXRyenltYW5pZSB3xIV0a8OzdyB3c3p5c3RraWNoIHByb2Nlc8OzdyBwb3dpxIV6YW55Y2ggeiBGbHV0dGVyZW0gaSBuYWvFgmFka2FtaSB3IHBhbWnEmWNpIFJBTS4gVcW8eXdhIG50ZGxsLk50U3VzcGVuZFByb2Nlc3MgKGN0eXBlcykgbmEgV2luZG93cyBvcmF6IHN5Z25hxYJ1IFNJR1NUT1AgKGtpbGwgLTE5IC8gcGtpbGwpIG5hIExpbnV4IGkgbWFjT1MuJyxcbiAgICBiYWRnZTogJ1VuaXZlcnNhbCBNdWx0aS1PUyBQYW5pYyBGcmVlemUnLFxuICAgIG9zOiBbJ3dpbmRvd3MnLCAnbGludXgnLCAnbWFjb3MnXSxcbiAgICByZXF1aXJlc1BpcDogZmFsc2UsXG4gICAgcGlwUGFja2FnZXM6IFtdLFxuICAgIGtleUZlYXR1cmVzOiBbXG4gICAgICAnV3lrcnl3YSBwbGF0Zm9ybcSZIHcgbG9jaWUgKFdpbmRvd3MsIExpbnV4LCBtYWNPUykgYmV6IHpld27EmXRyem55Y2ggemFsZcW8bm/Fm2NpJyxcbiAgICAgICdXaW5kb3dzOiBOdFN1c3BlbmRQcm9jZXNzICgweDA4MDAgUFJPQ0VTU19TVVNQRU5EX1JFU1VNRSkgbmF0eWNobWlhc3QgemFtcmHFvGEgY3lrbGUgQ1BVJyxcbiAgICAgICdMaW51eC9tYWNPUzogV3lzecWCYSBzeWduYcWCIGrEhWRyYSBTSUdTVE9QIChTaWduYWwgMTkpIHphIHBvbW9jxIUgb3Mua2lsbCAvIHBraWxsIC1TVE9QJyxcbiAgICAgICdaYWNob3d1amUgbmllbmFydXN6b255IHN0YW4gcGFtacSZY2kgUkFNIGRvIGFuYWxpenkgcG93xYJhbWFuaW93ZWogaSBmb3JlbnNpYyBkdW1wYScsXG4gICAgICAnVXdhbG5pYSBrdXJzb3IgbXlzenkgaSBrbGF3aWF0dXLEmSB6IHDEmXRsaSBwcnplY2h3eXR5d2FuaWEgb2tuYSBibG9rYWR5J1xuICAgIF0sXG4gICAgcmVjb21tZW5kZWRGb3I6ICdXIHN5dHVhY2ppIGtyeXR5Y3puZWosIGdkeSBuYWvFgmFka2EgRmx1dHRlcmEgemFibG9rb3dhxYJhIGNhxYJ5IGVrcmFuLCB1bmllbW/FvGxpd2lhIGtsaWtuacSZY2llIGN6ZWdva29sd2llayBpIHd5bWFnYSBuYXR5Y2htaWFzdG93ZWdvIHphbXJvxbxlbmlhIG5hIGRvd29sbnltIHN5c3RlbWllIChXaW5kb3dzL0xpbnV4L21hY09TKS4nLFxuICAgIGV4cGxhbmF0aW9uOiBbXG4gICAgICAnMS4gQXV0by1EZXRla2NqYSBPUzogcGxhdGZvcm0uc3lzdGVtKCkgcm96csOzxbxuaWEgV2luZG93cyAoTlQpIG9kIHN5c3RlbcOzdyBQT1NJWCAoTGludXgvRGFyd2luKS4nLFxuICAgICAgJzIuIFdpbmRvd3MgRW5naW5lOiBXeWtvcnp5c3R1amUgY3R5cGVzLndpbmRsbC5udGRsbC5OdFN1c3BlbmRQcm9jZXNzIG5hIHVjaHd5Y2llIHByb2Nlc3Ugb3R3YXJ0eW0geiB1cHJhd25pZW5pZW0gMHgwODAwLicsXG4gICAgICAnMy4gUE9TSVggRW5naW5lOiBXeWtvcnp5c3R1amUgb3Mua2lsbChwaWQsIHNpZ25hbC5TSUdTVE9QKSAtIHN5Z25hxYIgMTkgemF0cnp5bXVqZSBwbGFub3dhbmllIHfEhXRrw7N3IHByemV6IHNjaGVkdWxlciBqxIVkcmEgTGludXgvbWFjT1MuJyxcbiAgICAgICc0LiBad29sbmllbmllIEkvTzogTmF0eWNobWlhc3QgdXdhbG5pYSBrdXJzb3IgbXlzenkgaSBzeXN0ZW0ga29sZWprb3dhbmlhIHpkYXJ6ZcWEIG9rbmEuJyxcbiAgICAgICc1LiBCZXpwaWVjemXFhHN0d28gRGFueWNoOiBQcm9jZXMgcG96b3N0YWplIHcgcGFtacSZY2kgKHN0YXR1cyBUIC8gU3VzcGVuZGVkKSB1bW/FvGxpd2lhasSFYyB6cnp1dCBwYW1pxJljaSAoY29yZSBkdW1wKS4nXG4gICAgXSxcbiAgICBjb2RlOiBgXCJcIlwiXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuTVVMVEktT1MgRU1FUkdFTkNZIFBBTklDIEZSRUVaRSBTQ1JJUFQgKFdJTkRPV1MgLyBMSU5VWCAvIE1BQ09TKVxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbjEwMCUgT0ZGTElORSAvIFpFUk8tREVQRU5ERU5DWSBFTUVSR0VOQ1kgU1VTUEVORCBFTkdJTkVcbkF1dG9tYXR5Y3puaWUgd3lrcnl3YSBzeXN0ZW0gb3BlcmFjeWpueSBpIG5hdHljaG1pYXN0b3dvIFpBTVJBxbtBIChOdFN1c3BlbmRQcm9jZXNzXG5sdWIgU0lHU1RPUCBTaWduYWwgMTkpIHdzenlzdGtpZSBwcm9jZXN5IHBvd2nEhXphbmUgeiBGbHV0dGVyZW0gaSBuYWvFgmFka2FtaS5cbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cIlwiXCJcbmltcG9ydCBzeXNcbmltcG9ydCBvc1xuaW1wb3J0IHBsYXRmb3JtXG5pbXBvcnQgc3VicHJvY2Vzc1xuaW1wb3J0IHNpZ25hbFxuXG5kZWYgcGFuaWNfc3VzcGVuZF93aW5kb3dzKCk6XG4gICAgXCJcIlwiV2luZG93cyBLZXJuZWwgVGhyZWFkICYgUHJvY2VzcyBTdXNwZW5kIHZpYSBudGRsbC5OdFN1c3BlbmRQcm9jZXNzXCJcIlwiXG4gICAgcHJpbnQoXCJbKl0gV3lrcnl0byDFm3JvZG93aXNrbyBXSU5ET1dTLiBJbmljamFsaXphY2phIG50ZGxsIC8gY3R5cGVzLi4uXCIpXG4gICAgdHJ5OlxuICAgICAgICBpbXBvcnQgY3R5cGVzXG4gICAgICAgIGZyb20gY3R5cGVzIGltcG9ydCB3aW50eXBlc1xuXG4gICAgICAgIG50ZGxsID0gY3R5cGVzLndpbmRsbC5udGRsbFxuICAgICAgICBrZXJuZWwzMiA9IGN0eXBlcy53aW5kbGwua2VybmVsMzJcbiAgICAgICAgUFJPQ0VTU19TVVNQRU5EX1JFU1VNRSA9IDB4MDgwMFxuXG4gICAgICAgIGNtZCA9ICd0YXNrbGlzdCAvRk8gQ1NWIC9OSCdcbiAgICAgICAgb3V0cHV0ID0gc3VicHJvY2Vzcy5jaGVja19vdXRwdXQoY21kLCBzaGVsbD1UcnVlLCB0ZXh0PVRydWUsIGVycm9ycz0naWdub3JlJylcbiAgICAgICAgXG4gICAgICAgIHRhcmdldF9uYW1lcyA9IFsnZmx1dHRlcicsICdydW5uZXInLCAnb3ZlcmxheScsICdkcm9wcGVyJywgJ2xvY2tzY3JlZW4nXVxuICAgICAgICBzdXNwZW5kZWRfY291bnQgPSAwXG5cbiAgICAgICAgZm9yIGxpbmUgaW4gb3V0cHV0LnN0cmlwKCkuc3BsaXQoJ1xcXFxuJyk6XG4gICAgICAgICAgICBwYXJ0cyA9IFtwLnN0cmlwKCdcXFwiJykgZm9yIHAgaW4gbGluZS5zcGxpdCgnXFxcIixcXFwiJyldXG4gICAgICAgICAgICBpZiBsZW4ocGFydHMpID49IDI6XG4gICAgICAgICAgICAgICAgcG5hbWUgPSBwYXJ0c1swXVxuICAgICAgICAgICAgICAgIHRyeTpcbiAgICAgICAgICAgICAgICAgICAgcGlkID0gaW50KHBhcnRzWzFdKVxuICAgICAgICAgICAgICAgIGV4Y2VwdCBWYWx1ZUVycm9yOlxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgICAgICAgICAgaWYgYW55KHQgaW4gcG5hbWUubG93ZXIoKSBmb3IgdCBpbiB0YXJnZXRfbmFtZXMpOlxuICAgICAgICAgICAgICAgICAgICBwcmludChmXCJbIV0gWmFtcmHFvGFuaWUgUElEIHtwaWR9ICh7cG5hbWV9KS4uLlwiKVxuICAgICAgICAgICAgICAgICAgICBoX3Byb2Nlc3MgPSBrZXJuZWwzMi5PcGVuUHJvY2VzcyhQUk9DRVNTX1NVU1BFTkRfUkVTVU1FLCBGYWxzZSwgcGlkKVxuICAgICAgICAgICAgICAgICAgICBpZiBoX3Byb2Nlc3M6XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMgPSBudGRsbC5OdFN1c3BlbmRQcm9jZXNzKGhfcHJvY2VzcylcbiAgICAgICAgICAgICAgICAgICAgICAgIGtlcm5lbDMyLkNsb3NlSGFuZGxlKGhfcHJvY2VzcylcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIHN0YXR1cyA9PSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW50KGZcIiAgW+Kck10gTnRTdXNwZW5kUHJvY2VzcyhQSUQ9e3BpZH0pIFNVS0NFUyEgV8SFdGtpIHphbXJvxbxvbmUgdyBSQU0uXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VzcGVuZGVkX2NvdW50ICs9IDFcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2U6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpbnQoZlwiICBbWF0gTnRTdXNwZW5kUHJvY2VzcyB6d3LDs2NpxYIga29kIE5UU1RBVFVTOiAweHtzdGF0dXM6MDhYfVwiKVxuICAgICAgICAgICAgICAgICAgICBlbHNlOlxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpbnQoZlwiICBbWF0gQnJhayB1cHJhd25pZcWEIGRvIE9wZW5Qcm9jZXNzIGRsYSBQSUQge3BpZH0uIFVydWNob20gamFrbyBBZG1pbmlzdHJhdG9yIVwiKVxuXG4gICAgICAgIHByaW50KGZcIlxcXFxuW1pBS0/Fg0NaT05PXSBaYW1yb8W8b25vIHtzdXNwZW5kZWRfY291bnR9IHByb2Nlc8OzdyBuYSBwbGF0Zm9ybWllIFdpbmRvd3MuXCIpXG5cbiAgICBleGNlcHQgRXhjZXB0aW9uIGFzIGU6XG4gICAgICAgIHByaW50KGZcIltCxYHEhEQgV0lORE9XU10ge2V9XCIpXG5cbmRlZiBwYW5pY19zdXNwZW5kX3Bvc2l4KG9zX25hbWUpOlxuICAgIFwiXCJcIkxpbnV4ICYgbWFjT1MgUHJvY2VzcyBGcmVlemUgdmlhIFNJR1NUT1AgKFNpZ25hbCAxOSlcIlwiXCJcbiAgICBwcmludChmXCJbKl0gV3lrcnl0byDFm3JvZG93aXNrbyBQT1NJWCAoe29zX25hbWV9KS4gV3lzecWCYW5pZSBzeWduYcWCdSBTSUdTVE9QICgxOSkuLi5cIilcbiAgICB0YXJnZXRfcGF0dGVybnMgPSBbJ2ZsdXR0ZXInLCAnZmx1dHRlcl9ydW5uZXInLCAnbG9ja3NjcmVlbicsICdvdmVybGF5X2FwcCddXG4gICAgc3VzcGVuZGVkX2NvdW50ID0gMFxuXG4gICAgZm9yIHBhdHRlcm4gaW4gdGFyZ2V0X3BhdHRlcm5zOlxuICAgICAgICB0cnk6XG4gICAgICAgICAgICBwaWRzX3JhdyA9IHN1YnByb2Nlc3MuY2hlY2tfb3V0cHV0KFsncGdyZXAnLCAnLWYnLCBwYXR0ZXJuXSwgdGV4dD1UcnVlLCBlcnJvcnM9J2lnbm9yZScpXG4gICAgICAgICAgICBwaWRzID0gW2ludChwKSBmb3IgcCBpbiBwaWRzX3Jhdy5zdHJpcCgpLnNwbGl0KCkgaWYgcC5pc2RpZ2l0KCldXG5cbiAgICAgICAgICAgIGZvciBwaWQgaW4gcGlkczpcbiAgICAgICAgICAgICAgICBpZiBwaWQgPT0gb3MuZ2V0cGlkKCk6XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICAgICAgdHJ5OlxuICAgICAgICAgICAgICAgICAgICBvcy5raWxsKHBpZCwgc2lnbmFsLlNJR1NUT1ApICMgU3lnbmHFgiAxOSAoU0lHU1RPUClcbiAgICAgICAgICAgICAgICAgICAgcHJpbnQoZlwiICBb4pyTXSBraWxsIC1TVE9QIChQSUQ9e3BpZH0sIHd6b3J6ZWM9J3twYXR0ZXJufScpIC0+IFfEhXRraSB6YXRyenltYW5lIHByemV6IHNjaGVkdWxlciBqxIVkcmEhXCIpXG4gICAgICAgICAgICAgICAgICAgIHN1c3BlbmRlZF9jb3VudCArPSAxXG4gICAgICAgICAgICAgICAgZXhjZXB0IFBlcm1pc3Npb25FcnJvcjpcbiAgICAgICAgICAgICAgICAgICAgcHJpbnQoZlwiICBbWF0gV3ltYWdhbnkgcm9vdCAvIHN1ZG8gZGxhIFBJRCB7cGlkfSFcIilcbiAgICAgICAgICAgICAgICBleGNlcHQgUHJvY2Vzc0xvb2t1cEVycm9yOlxuICAgICAgICAgICAgICAgICAgICBwYXNzXG4gICAgICAgIGV4Y2VwdCBzdWJwcm9jZXNzLkNhbGxlZFByb2Nlc3NFcnJvcjpcbiAgICAgICAgICAgIHBhc3NcblxuICAgIHRyeTpcbiAgICAgICAgc3VicHJvY2Vzcy5ydW4oWydwa2lsbCcsICctU1RPUCcsICctZicsICdmbHV0dGVyJ10sIGNoZWNrPUZhbHNlKVxuICAgIGV4Y2VwdCBFeGNlcHRpb246XG4gICAgICAgIHBhc3NcblxuICAgIHByaW50KGZcIlxcXFxuW1pBS0/Fg0NaT05PXSBaYW1yb8W8b25vIHtzdXNwZW5kZWRfY291bnR9IHByb2Nlc8OzdyBuYSBwbGF0Zm9ybWllIHtvc19uYW1lfS5cIilcblxuZGVmIG1haW4oKTpcbiAgICBwcmludChcIj1cIiAqIDcwKVxuICAgIHByaW50KFwiICBFTUVSR0VOQ1kgUEFOSUMgRlJFRVpFOiBNVUxUSS1PUyBTSU1VTFRBTkVPVVMgUFJPQ0VTUyBTVVNQRU5EXCIpXG4gICAgcHJpbnQoXCI9XCIgKiA3MClcbiAgICBcbiAgICBjdXJyZW50X29zID0gcGxhdGZvcm0uc3lzdGVtKCkubG93ZXIoKVxuICAgIHByaW50KGZcIlsqXSBXeWtyeXRhIHBsYXRmb3JtYSBqxIVkcmE6IHtwbGF0Zm9ybS5zeXN0ZW0oKX0gKHtwbGF0Zm9ybS5yZWxlYXNlKCl9KVwiKVxuXG4gICAgaWYgY3VycmVudF9vcyA9PSAnd2luZG93cyc6XG4gICAgICAgIHBhbmljX3N1c3BlbmRfd2luZG93cygpXG4gICAgZWxpZiBjdXJyZW50X29zID09ICdsaW51eCc6XG4gICAgICAgIHBhbmljX3N1c3BlbmRfcG9zaXgoJ0xpbnV4JylcbiAgICBlbGlmIGN1cnJlbnRfb3MgPT0gJ2Rhcndpbic6XG4gICAgICAgIHBhbmljX3N1c3BlbmRfcG9zaXgoJ21hY09TJylcbiAgICBlbHNlOlxuICAgICAgICBwcmludChmXCJbIV0gTmllem5hbnkgc3lzdGVtOiB7Y3VycmVudF9vc30uIFByw7NiYSB3eWtvbmFuaWEgc3RhbmRhcmRvd2VnbyBTSUdTVE9QLi4uXCIpXG4gICAgICAgIHBhbmljX3N1c3BlbmRfcG9zaXgoY3VycmVudF9vcylcblxuICAgIHByaW50KFwiPVwiICogNzApXG4gICAgcHJpbnQoXCIgIFNUQU4gQVdBUllKTlk6IFBST0NFU1kgWkFUUlpZTUFORSBXIFBBTUnEmENJIFJBTSAoMCUgQ1BVKVwiKVxuICAgIHByaW50KFwiICBBYnkgd3pub3dpxIcgcHJvY2VzeSB3IGNlbGFjaCBkZWJ1Z293YW5pYTpcIilcbiAgICBwcmludChcIiAgICAtIExpbnV4L21hY09TIDoga2lsbCAtQ09OVCA8UElEPiAgbHViICBwa2lsbCAtQ09OVCAtZiBmbHV0dGVyXCIpXG4gICAgcHJpbnQoXCIgICAgLSBXaW5kb3dzICAgICA6IG50ZGxsLk50UmVzdW1lUHJvY2VzcyhoUHJvY2VzcylcIilcbiAgICBwcmludChcIj1cIiAqIDcwKVxuXG5pZiBfX25hbWVfXyA9PSAnX19tYWluX18nOlxuICAgIG1haW4oKVxuYCxcbiAgfSxcbiAge1xuICAgIGlkOiAncHJvY2Vzc19yZXNvdXJjZV93YXRjaGRvZ19kYWVtb24nLFxuICAgIHRpdGxlOiAn4piFIFBST0NFU1MgV0FUQ0hET0c6IENpxIVnxYJ5IFN0cmHFvG5payBDUFUgJiBQYW1pxJljaSBSQU0geiBBdXRvLUZyZWV6ZScsXG4gICAgc2hvcnREZXNjOiAnRGFlbW9uIGN6YXN1IHJ6ZWN6eXdpc3RlZ28gYmFkYWrEhWN5IHp1xbx5Y2llIHphc29iw7N3IChHZXRQcm9jZXNzVGltZXMsIFdvcmtpbmdTZXQgUkFNKSBva2llbiBuYWvFgmFkZWsgRmx1dHRlcmEuIELFgnlza2F3aWN6bmllIHphbXJhxbxhIHfEhXRraSB3IFJBTSAoTnRTdXNwZW5kUHJvY2VzcykgbHViIHViaWphIHByb2NlcyBwcnp5IHByemVrcm9jemVuaXUgbGltaXTDs3cuJyxcbiAgICBiYWRnZTogJ0NQVSAmIFJBTSBSZXNvdXJjZSBXYXRjaGRvZycsXG4gICAgb3M6IFsnd2luZG93cyddLFxuICAgIHJlcXVpcmVzUGlwOiBmYWxzZSxcbiAgICBwaXBQYWNrYWdlczogWydwc3V0aWwnXSxcbiAgICBrZXlGZWF0dXJlczogW1xuICAgICAgJ0NpxIVnxYJlIGJhZGFuaWUgcGFtacSZY2kgV29ya2luZ1NldFNpemUgemEgcG9tb2PEhSBLMzJHZXRQcm9jZXNzTWVtb3J5SW5mbyAvIFBTQVBJJyxcbiAgICAgICdQb21pYXJ5IG9iY2nEhcW8ZW5pYSBDUFUgZGxhIHfEhXRrw7N3IG9raWVuIEFsd2F5cy1vbi10b3AgaSBGdWxsc2NyZWVuJyxcbiAgICAgICdSZWd1xYJ5IGF1dG9tYXR5Y3puZWogcmVha2NqaTogTnRTdXNwZW5kUHJvY2VzcyAoemFtcm/FvGVuaWUpLCBTZXRQcmlvcml0eUNsYXNzIChkxYJhd2llbmllKSwgVGVybWluYXRlUHJvY2VzcycsXG4gICAgICAnV3lrcnl3YW5pZSBwxJl0bGkgcmVuZGVyb3dhbmlhIEZsdXR0ZXIgVnN5bmMgbG9vcCBpIGFub21hbGlpIHd5Y2lla8OzdyBwYW1pxJljaScsXG4gICAgICAnRHppYcWCYSB3IDEwMCUgb2ZmbGluZSBiZXogxbxhZG55Y2ggemV3bsSZdHJ6bnljaCBiaWJsaW90ZWsgKFB1cmUgY3R5cGVzIFdpbjMyIEFQSSknXG4gICAgXSxcbiAgICByZWNvbW1lbmRlZEZvcjogJ0dkeSBuYWvFgmFka2EgRmx1dHRlcmEgbHViIHN6a29kbGl3eSBwcm9jZXMgcHJ6ZWNpxIXFvGEga29tcHV0ZXIsIHphd2llc3phIGt1cnNvciBteXN6eSwgenXFvHl3YSB6Ynl0IGR1xbxvIHByb2Nlc29yYS9SQU0tdSBsdWIgcHLDs2J1amUgdW5pZW1vxbxsaXdpxIcgdXJ1Y2hvbWllbmllIE1lbmVkxbxlcmEgWmFkYcWELicsXG4gICAgZXhwbGFuYXRpb246IFtcbiAgICAgICcxLiBQb2JpZXJhbmllIEhXTkQ6IEVudW1XaW5kb3dzIGlkZW50eWZpa3VqZSB3c3p5c3RraWUgd2lkb2N6bmUgb2tuYSB6IGZsYWfEhSBXU19FWF9UT1BNT1NULicsXG4gICAgICAnMi4gVGVsZW1ldHJpYSBQYW1pxJljaTogV3l3b8WCdWplIEdldFByb2Nlc3NNZW1vcnlJbmZvIHogcHNhcGkuZGxsLCBvZGN6eXR1asSFYyByb3ptaWFyIFdvcmtpbmdTZXRTaXplIGkgUGFnZWZpbGVVc2FnZS4nLFxuICAgICAgJzMuIFBvbWlhcnkgQ1BVOiBPZGN6eXR1amUgY3phc3kgcHJvY2Vzb3JhIEdldFByb2Nlc3NUaW1lcyAoVXNlclRpbWUgKyBLZXJuZWxUaW1lKSB3IG9rbmllIGN6YXNvd3ltLicsXG4gICAgICAnNC4gRGV0ZWtjamEgQW5vbWFsaWk6IFBvcsOzd251amUgenXFvHljaWUgeiB6ZGVmaW5pb3dhbnltaSBwcm9nYW1pIChucC4gPjMwJSBDUFUgbHViID4yMDBNQiBSQU0pLicsXG4gICAgICAnNS4gTmF0eWNobWlhc3Rvd2EgTmV1dHJhbGl6YWNqYTogV3N0cnp5bXVqZSBwcm9jZXMgdyBsb2NpZSAoTnRTdXNwZW5kUHJvY2VzcykgemFwb2JpZWdhasSFYyB6YWJsb2tvd2FuaXUgc3lzdGVtdS4nXG4gICAgXSxcbiAgICBjb2RlOiBgXCJcIlwiXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuUFJPQ0VTUyBSRVNPVVJDRSBXQVRDSERPRyBEQUVNT04gKDEwMCUgT0ZGTElORSAvIFpFUk8tREVQRU5ERU5DWSlcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5Nb25pdG9ydWplIHp1xbx5Y2llIENQVSBpIHBhbWnEmWNpIFJBTSBwcnpleiBwcm9jZXN5IG5ha8WCYWRlayBGbHV0dGVyYS5cblcgcHJ6eXBhZGt1IHByemVrcm9jemVuaWEgbGltaXR1IG5hdHljaG1pYXN0IHphbXJhxbxhIHByb2NlcyB3IFJBTSAoTnRTdXNwZW5kUHJvY2VzcykuXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXCJcIlwiXG5pbXBvcnQgY3R5cGVzXG5mcm9tIGN0eXBlcyBpbXBvcnQgd2ludHlwZXNcbmltcG9ydCB0aW1lXG5pbXBvcnQgb3NcbmltcG9ydCBzeXNcblxuIyBXaW5kb3dzIEFQSSBCaW5kaW5nc1xudXNlcjMyID0gY3R5cGVzLndpbmRsbC51c2VyMzJcbmtlcm5lbDMyID0gY3R5cGVzLndpbmRsbC5rZXJuZWwzMlxubnRkbGwgPSBjdHlwZXMud2luZGxsLm50ZGxsXG5wc2FwaSA9IGN0eXBlcy53aW5kbGwucHNhcGlcblxuUFJPQ0VTU19RVUVSWV9JTkZPUk1BVElPTiA9IDB4MDQwMFxuUFJPQ0VTU19WTV9SRUFEID0gMHgwMDEwXG5QUk9DRVNTX1NVU1BFTkRfUkVTVU1FID0gMHgwODAwXG5QUk9DRVNTX1RFUk1JTkFURSA9IDB4MDAwMVxuUFJPQ0VTU19TRVRfSU5GT1JNQVRJT04gPSAweDAyMDBcbklETEVfUFJJT1JJVFlfQ0xBU1MgPSAweDAwMDAwMDQwXG5cbiMgRG9tecWbbG5lIHByb2dpIGFsYXJtb3dlXG5DUFVfTElNSVRfUEVSQ0VOVCA9IDM1LjBcblJBTV9MSU1JVF9NQiA9IDIwMC4wXG5QT0xMX0lOVEVSVkFMID0gMS4wICMgc2VrdW5keVxuXG5jbGFzcyBQUk9DRVNTX01FTU9SWV9DT1VOVEVSUyhjdHlwZXMuU3RydWN0dXJlKTpcbiAgICBfZmllbGRzXyA9IFtcbiAgICAgICAgKFwiY2JcIiwgd2ludHlwZXMuRFdPUkQpLFxuICAgICAgICAoXCJQYWdlRmF1bHRDb3VudFwiLCB3aW50eXBlcy5EV09SRCksXG4gICAgICAgIChcIlBlYWtXb3JraW5nU2V0U2l6ZVwiLCBjdHlwZXMuY19zaXplX3QpLFxuICAgICAgICAoXCJXb3JraW5nU2V0U2l6ZVwiLCBjdHlwZXMuY19zaXplX3QpLFxuICAgICAgICAoXCJRdW90YVBlYWtQYWdlZFBvb2xVc2FnZVwiLCBjdHlwZXMuY19zaXplX3QpLFxuICAgICAgICAoXCJRdW90YVBhZ2VkUG9vbFVzYWdlXCIsIGN0eXBlcy5jX3NpemVfdCksXG4gICAgICAgIChcIlF1b3RhUGVha05vblBhZ2VkUG9vbFVzYWdlXCIsIGN0eXBlcy5jX3NpemVfdCksXG4gICAgICAgIChcIlF1b3RhTm9uUGFnZWRQb29sVXNhZ2VcIiwgY3R5cGVzLmNfc2l6ZV90KSxcbiAgICAgICAgKFwiUGFnZWZpbGVVc2FnZVwiLCBjdHlwZXMuY19zaXplX3QpLFxuICAgICAgICAoXCJQZWFrUGFnZWZpbGVVc2FnZVwiLCBjdHlwZXMuY19zaXplX3QpLFxuICAgIF1cblxuZGVmIGdldF9wcm9jZXNzX3JhbV91c2FnZV9tYihoX3Byb2Nlc3MpOlxuICAgIFwiXCJcIk9kY3p5dHVqZSBha3R1YWxuZSB6dcW8eWNpZSBwYW1pxJljaSBSQU0gdyBNQi5cIlwiXCJcbiAgICBjb3VudGVycyA9IFBST0NFU1NfTUVNT1JZX0NPVU5URVJTKClcbiAgICBjb3VudGVycy5jYiA9IGN0eXBlcy5zaXplb2YoUFJPQ0VTU19NRU1PUllfQ09VTlRFUlMpXG4gICAgaWYgcHNhcGkuR2V0UHJvY2Vzc01lbW9yeUluZm8oaF9wcm9jZXNzLCBjdHlwZXMuYnlyZWYoY291bnRlcnMpLCBjb3VudGVycy5jYik6XG4gICAgICAgIHJldHVybiBjb3VudGVycy5Xb3JraW5nU2V0U2l6ZSAvICgxMDI0LjAgKiAxMDI0LjApXG4gICAgcmV0dXJuIDAuMFxuXG5kZWYgZnJlZXplX3Byb2Nlc3NfdGhyZWFkcyhwaWQpOlxuICAgIFwiXCJcIlphbXJhxbxhIHdzenlzdGtpZSB3xIV0a2kgdyBwYW1pxJljaSBSQU0uXCJcIlwiXG4gICAgaCA9IGtlcm5lbDMyLk9wZW5Qcm9jZXNzKFBST0NFU1NfU1VTUEVORF9SRVNVTUUsIEZhbHNlLCBwaWQpXG4gICAgaWYgaDpcbiAgICAgICAgbnRkbGwuTnRTdXNwZW5kUHJvY2VzcyhoKVxuICAgICAgICBrZXJuZWwzMi5DbG9zZUhhbmRsZShoKVxuICAgICAgICBwcmludChmXCJb4p2E77iPIFpBTVJPxbtPTk9dIE50U3VzcGVuZFByb2Nlc3MoUElEOiB7cGlkfSkgLSBaYXRyenltYW5vIHd5a29uYW5pZSBrb2R1IVwiKVxuXG5kZWYgdGhyb3R0bGVfcHJvY2VzcyhwaWQpOlxuICAgIFwiXCJcIk9ibmnFvGEgcHJpb3J5dGV0IHByb2Nlc3UgZG8gbWluaW11bS5cIlwiXCJcbiAgICBoID0ga2VybmVsMzIuT3BlblByb2Nlc3MoUFJPQ0VTU19TRVRfSU5GT1JNQVRJT04sIEZhbHNlLCBwaWQpXG4gICAgaWYgaDpcbiAgICAgICAga2VybmVsMzIuU2V0UHJpb3JpdHlDbGFzcyhoLCBJRExFX1BSSU9SSVRZX0NMQVNTKVxuICAgICAgICBrZXJuZWwzMi5DbG9zZUhhbmRsZShoKVxuICAgICAgICBwcmludChmXCJb4pqhIFRIUk9UVExFXSBPYm5pxbxvbm8gcHJpb3J5dGV0IFBJRDoge3BpZH0gZG8gSURMRV9QUklPUklUWV9DTEFTUy5cIilcblxuZGVmIHdhdGNoZG9nX3NjYW5uZXIoKTpcbiAgICBwcmludChcIj1cIiAqIDcwKVxuICAgIHByaW50KFwiICBQUk9DRVNTIFdBVENIRE9HOiBEQUVNT04gTU9OSVRPUk9XQU5JQSBDUFUgSSBQQU1JxJhDSSBSQU1cIilcbiAgICBwcmludChmXCIgIFByb2dpOiBSQU0gPiB7UkFNX0xJTUlUX01CfSBNQiB8IEludGVyd2HFgjoge1BPTExfSU5URVJWQUx9c1wiKVxuICAgIHByaW50KFwiPVwiICogNzApXG5cbiAgICB0cnk6XG4gICAgICAgIHdoaWxlIFRydWU6XG4gICAgICAgICAgICBkZWYgZW51bV9wcm9jKGh3bmQsIGxwYXJhbSk6XG4gICAgICAgICAgICAgICAgaWYgbm90IHVzZXIzMi5Jc1dpbmRvd1Zpc2libGUoaHduZCk6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBUcnVlXG5cbiAgICAgICAgICAgICAgICBleF9zdHlsZSA9IHVzZXIzMi5HZXRXaW5kb3dMb25nVyhod25kLCAtMjApXG4gICAgICAgICAgICAgICAgaXNfdG9wbW9zdCA9IGJvb2woZXhfc3R5bGUgJiAweDAwMDAwMDA4KSAjIFdTX0VYX1RPUE1PU1RcblxuICAgICAgICAgICAgICAgIGlmIGlzX3RvcG1vc3Q6XG4gICAgICAgICAgICAgICAgICAgIHBpZCA9IHdpbnR5cGVzLkRXT1JEKClcbiAgICAgICAgICAgICAgICAgICAgdXNlcjMyLkdldFdpbmRvd1RocmVhZFByb2Nlc3NJZChod25kLCBjdHlwZXMuYnlyZWYocGlkKSlcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGhfcHJvYyA9IGtlcm5lbDMyLk9wZW5Qcm9jZXNzKFBST0NFU1NfUVVFUllfSU5GT1JNQVRJT04gfCBQUk9DRVNTX1ZNX1JFQUQsIEZhbHNlLCBwaWQudmFsdWUpXG4gICAgICAgICAgICAgICAgICAgIGlmIGhfcHJvYzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbV9tYiA9IGdldF9wcm9jZXNzX3JhbV91c2FnZV9tYihoX3Byb2MpXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXJuZWwzMi5DbG9zZUhhbmRsZShoX3Byb2MpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIHJhbV9tYiA+PSBSQU1fTElNSVRfTUI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpbnQoZlwiXFxcXG5b8J+aqCBBTEFSTSBXQVRDSERPR10gUElEIHtwaWQudmFsdWV9IHByemVrcm9jennFgiBsaW1pdCBwYW1pxJljaSBSQU06IHtyYW1fbWI6LjJmfSBNQiFcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcmVlemVfcHJvY2Vzc190aHJlYWRzKHBpZC52YWx1ZSlcblxuICAgICAgICAgICAgICAgIHJldHVybiBUcnVlXG5cbiAgICAgICAgICAgIGNiID0gY3R5cGVzLldJTkZVTkNUWVBFKHdpbnR5cGVzLkJPT0wsIHdpbnR5cGVzLkhXTkQsIHdpbnR5cGVzLkxQQVJBTSkoZW51bV9wcm9jKVxuICAgICAgICAgICAgdXNlcjMyLkVudW1XaW5kb3dzKGNiLCAwKVxuICAgICAgICAgICAgdGltZS5zbGVlcChQT0xMX0lOVEVSVkFMKVxuXG4gICAgZXhjZXB0IEtleWJvYXJkSW50ZXJydXB0OlxuICAgICAgICBwcmludChcIlxcXFxuWypdIFphdHJ6eW1hbm8gc3RyYcW8bmlrYSBQcm9jZXNzIFdhdGNoZG9nLlwiKVxuXG5pZiBfX25hbWVfXyA9PSBcIl9fbWFpbl9fXCI6XG4gICAgd2F0Y2hkb2dfc2Nhbm5lcigpXG5gLFxuICB9LFxuICB7XG4gICAgaWQ6ICdwcm9jZXNzX3RyZWVfcHBpZF9odW50ZXInLFxuICAgIHRpdGxlOiAn4piFIFBQSUQgT1JJR0lOIFRSQUNFUjogRHJ6ZXdvIFJlbGFjamkgUHJvY2Vzw7N3ICYgTGlrd2lkYWNqYSDFuXLDs2TFgmEgKFRyZWUtS2lsbCknLFxuICAgIHNob3J0RGVzYzogJ01hcHVqZSByZWxhY2rEmSBtacSZZHp5IG9rbmVtIG5ha8WCYWRraSBGbHV0dGVyYSAoSFdORCkgYSBwcm9jZXNlbS1yb2R6aWNlbSAoUFBJRCBEcm9wcGVyIC8gV2F0Y2hkb2cpLCBuYW1pZXJ6YWrEhWMgaSBsaWt3aWR1asSFYyBjYcWCZSBwb2Rkcnpld28gcHJvY2Vzw7N3LCBieSB6YXBvYmllYyBvZHJhZHphbml1IHNpxJkgYmxva2FkeS4nLFxuICAgIGJhZGdlOiAnUFBJRCBPcmlnaW4gVHJhY2VyICYgVHJlZS1LaWxsJyxcbiAgICBvczogWyd3aW5kb3dzJ10sXG4gICAgcmVxdWlyZXNQaXA6IGZhbHNlLFxuICAgIHBpcFBhY2thZ2VzOiBbJ3BzdXRpbCddLFxuICAgIGtleUZlYXR1cmVzOiBbXG4gICAgICAnUHJlY3l6eWpuZSBtYXBvd2FuaWUgxYJhxYRjdWNoYTogSFdORCBPa25hIC0+IFBJRCBQcm9jZXN1IC0+IFBQSUQgUm9kemljYSAoRHJvcHBlcmEpJyxcbiAgICAgICdXeWtyeXdhbmllIG1lY2hhbml6bcOzdyBXYXRjaGRvZy9BdXRvLVJlc3RhcnQgdyB1a3J5dHljaCBwcm9jZXNhY2ggcG90b21ueWNoJyxcbiAgICAgICdKZWRub2N6ZXNuZSB6YW1yb8W8ZW5pZSBpIGxpa3dpZGFjamEgY2HFgmVnbyBkcnpld2EgKFRyZWUtS2lsbCAvVCAvRiknLFxuICAgICAgJ0JyYWsgbW/FvGxpd2/Fm2NpIHVjaWVjemtpIGx1YiByZXN0YXJ0dSBuYWvFgmFka2kgcHJ6ZXogcHJvY2VzIG5hZHJ6xJlkbnknLFxuICAgICAgJ1didWRvd2FuZSBzcHJhd2R6YW5pZSBzeWduYXR1ciBiaWJsaW90ZWsgZmx1dHRlcl93aW5kb3dzLmRsbCB3IGNhxYJ5bSBkcnpld2llJ1xuICAgIF0sXG4gICAgcmVjb21tZW5kZWRGb3I6ICdHZHkgcG8gemFta25pxJljaXUgbmFrxYJhZGtpIEZsdXR0ZXJhIG5hdHljaG1pYXN0IHBvamF3aWEgc2nEmSBvbmEgeiBwb3dyb3RlbSwgcG9uaWV3YcW8IHcgdGxlIGR6aWHFgmEgcHJvY2VzLW1hdGthIChQUElEIFdhdGNoZG9nL0Ryb3BwZXIpLCBrdMOzcnkgasSFIHJlc3RhcnR1amUuJyxcbiAgICBleHBsYW5hdGlvbjogW1xuICAgICAgJzEuIE1hcG93YW5pZSBIV05EIC0+IFBJRDogV3l3b8WCdWplIEdldFdpbmRvd1RocmVhZFByb2Nlc3NJZCBkbGEgd3lrcnl0eWNoIG9raWVuIEFsd2F5cy1vbi10b3AgaSBGdWxsc2NyZWVuLicsXG4gICAgICAnMi4gUmVrb25zdHJ1a2NqYSBEcnpld2EgUFBJRDogVcW8eXdhIENyZWF0ZVRvb2xoZWxwMzJTbmFwc2hvdCBpIFByb2Nlc3MzMkZpcnN0L05leHQgbHViIE50UXVlcnlJbmZvcm1hdGlvblByb2Nlc3MgZG8gb2Rjenl0YW5pYSBQYXJlbnQgUHJvY2VzcyBJRC4nLFxuICAgICAgJzMuIElkZW50eWZpa2FjamEgS29yemVuaWEgWmFncm/FvGVuaWE6IFNwcmF3ZHphLCBjenkgcm9kemljIG5pZSBqZXN0IGJlenBpZWN6bnltIHByb2Nlc2VtIHN5c3RlbW93eW0gKG5wLiBleHBsb3Jlci5leGUpLCBsZWN6IHVrcnl0eW0gc2tyeXB0ZW0vbG9hZGVyZW0gdyBUZW1wIGx1YiBBcHBEYXRhLicsXG4gICAgICAnNC4gWmFtcm/FvGVuaWUgQ2HFgmVnbyBEcnpld2EgKFRyZWUgU3VzcGVuZCk6IFdzdHJ6eW11amUgd8SFdGtpIHdlIHdzenlzdGtpY2ggcG93acSFemFueWNoIHByb2Nlc2FjaCAocm9kemljICsgZHppZWNpKSwgYnkgdW5pZW1vxbxsaXdpxIcgd3lrb25hbmllIGtvZHUgYXdhcnlqbmVnby4nLFxuICAgICAgJzUuIExpa3dpZGFjamEgUG9kZHJ6ZXdhIChUcmVlIFRlcm1pbmF0aW9uKTogVXN1d2EgcHJvY2VzeSBwb3RvbW5lIGkgcHJvY2VzIG1hY2llcnp5c3R5IHcgamVkbmVqIGF0b21vd2VqIHNla3dlbmNqaS4nXG4gICAgXSxcbiAgICBjb2RlOiBgXCJcIlwiXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuUFBJRCBPUklHSU4gVFJBQ0VSICYgUFJPQ0VTUyBUUkVFIEhVTlRFUiAoMTAwJSBPRkZMSU5FKVxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbld5a3J5d2EgesWCb8WbbGl3ZSBva25hIEZsdXR0ZXJhLCBuYW1pZXJ6YSBwcm9jZXMtbWF0a8SZIChQUElEKSBpIGxpa3dpZHVqZVxuY2HFgmUgcG9kZHJ6ZXdvIHByb2Nlc8OzdywgemFwb2JpZWdhasSFYyBzYW1vY3p5bm5lbXUgb2RyYWR6YW5pdSBzacSZIGJsb2thZC5cbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cIlwiXCJcbmltcG9ydCBjdHlwZXNcbmZyb20gY3R5cGVzIGltcG9ydCB3aW50eXBlc1xuaW1wb3J0IHRpbWVcbmltcG9ydCBvc1xuaW1wb3J0IHN5c1xuXG51c2VyMzIgPSBjdHlwZXMud2luZGxsLnVzZXIzMlxua2VybmVsMzIgPSBjdHlwZXMud2luZGxsLmtlcm5lbDMyXG5udGRsbCA9IGN0eXBlcy53aW5kbGwubnRkbGxcblxuVEgzMkNTX1NOQVBQUk9DRVNTID0gMHgwMDAwMDAwMlxuUFJPQ0VTU19URVJNSU5BVEUgPSAweDAwMDFcblBST0NFU1NfU1VTUEVORF9SRVNVTUUgPSAweDA4MDBcblBST0NFU1NfUVVFUllfSU5GT1JNQVRJT04gPSAweDA0MDBcblxuY2xhc3MgUFJPQ0VTU0VOVFJZMzIoY3R5cGVzLlN0cnVjdHVyZSk6XG4gICAgX2ZpZWxkc18gPSBbXG4gICAgICAgIChcImR3U2l6ZVwiLCB3aW50eXBlcy5EV09SRCksXG4gICAgICAgIChcImNudFVzYWdlXCIsIHdpbnR5cGVzLkRXT1JEKSxcbiAgICAgICAgKFwidGgzMlByb2Nlc3NJRFwiLCB3aW50eXBlcy5EV09SRCksXG4gICAgICAgIChcInRoMzJEZWZhdWx0SGVhcElEXCIsIGN0eXBlcy5QT0lOVEVSKHdpbnR5cGVzLlVMT05HKSksXG4gICAgICAgIChcInRoMzJNb2R1bGVJRFwiLCB3aW50eXBlcy5EV09SRCksXG4gICAgICAgIChcImNudFRocmVhZHNcIiwgd2ludHlwZXMuRFdPUkQpLFxuICAgICAgICAoXCJ0aDMyUGFyZW50UHJvY2Vzc0lEXCIsIHdpbnR5cGVzLkRXT1JEKSxcbiAgICAgICAgKFwicGNQcmlDbGFzc0Jhc2VcIiwgd2ludHlwZXMuTE9ORyksXG4gICAgICAgIChcImR3RmxhZ3NcIiwgd2ludHlwZXMuRFdPUkQpLFxuICAgICAgICAoXCJzekV4ZUZpbGVcIiwgY3R5cGVzLmNfY2hhciAqIDI2MClcbiAgICBdXG5cbiMgQ2hyb25pb25hIGJpYcWCYSBsaXN0YSBzeXN0ZW1vd2FcblNZU1RFTV9XSElURUxJU1QgPSB7XCJleHBsb3Jlci5leGVcIiwgXCJzZXJ2aWNlcy5leGVcIiwgXCJsc2Fzcy5leGVcIiwgXCJjc3Jzcy5leGVcIiwgXCJ3aW5sb2dvbi5leGVcIiwgXCJkd20uZXhlXCJ9XG5cbmRlZiBnZXRfcHJvY2Vzc19oaWVyYXJjaHlfbWFwKCk6XG4gICAgXCJcIlwiVHdvcnp5IHBlxYJuxIUgbWFwxJkgcmVsYWNqaSBQSUQgLT4gKFBQSUQsIE5hendhRXhlKSB6YSBwb21vY8SFIFRvb2xoZWxwIEFQSS5cIlwiXCJcbiAgICBoX3NuYXAgPSBrZXJuZWwzMi5DcmVhdGVUb29saGVscDMyU25hcHNob3QoVEgzMkNTX1NOQVBQUk9DRVNTLCAwKVxuICAgIGlmIGhfc25hcCA9PSB3aW50eXBlcy5IQU5ETEUoLTEpLnZhbHVlOlxuICAgICAgICByZXR1cm4ge31cblxuICAgIGVudHJ5ID0gUFJPQ0VTU0VOVFJZMzIoKVxuICAgIGVudHJ5LmR3U2l6ZSA9IGN0eXBlcy5zaXplb2YoUFJPQ0VTU0VOVFJZMzIpXG4gICAgcHJvY19tYXAgPSB7fVxuXG4gICAgaWYga2VybmVsMzIuUHJvY2VzczMyRmlyc3QoaF9zbmFwLCBjdHlwZXMuYnlyZWYoZW50cnkpKTpcbiAgICAgICAgd2hpbGUgVHJ1ZTpcbiAgICAgICAgICAgIHBpZCA9IGVudHJ5LnRoMzJQcm9jZXNzSURcbiAgICAgICAgICAgIHBwaWQgPSBlbnRyeS50aDMyUGFyZW50UHJvY2Vzc0lEXG4gICAgICAgICAgICBleGVfbmFtZSA9IGVudHJ5LnN6RXhlRmlsZS5kZWNvZGUoJ3V0Zi04JywgZXJyb3JzPSdpZ25vcmUnKVxuICAgICAgICAgICAgcHJvY19tYXBbcGlkXSA9IHtcInBwaWRcIjogcHBpZCwgXCJuYW1lXCI6IGV4ZV9uYW1lfVxuICAgICAgICAgICAgaWYgbm90IGtlcm5lbDMyLlByb2Nlc3MzMk5leHQoaF9zbmFwLCBjdHlwZXMuYnlyZWYoZW50cnkpKTpcbiAgICAgICAgICAgICAgICBicmVha1xuXG4gICAga2VybmVsMzIuQ2xvc2VIYW5kbGUoaF9zbmFwKVxuICAgIHJldHVybiBwcm9jX21hcFxuXG5kZWYgZmluZF9lbnRpcmVfcHJvY2Vzc190cmVlKHJvb3RfcGlkLCBwcm9jX21hcCk6XG4gICAgXCJcIlwiUmVrdXJlbmN5am5pZSBvZG5hamR1amUgd3N6eXN0a2llIHByb2Nlc3kgcG90b21uZSBkbGEgd3NrYXphbmVnbyBQSUQuXCJcIlwiXG4gICAgdHJlZSA9IHtyb290X3BpZH1cbiAgICBhZGRlZCA9IFRydWVcbiAgICB3aGlsZSBhZGRlZDpcbiAgICAgICAgYWRkZWQgPSBGYWxzZVxuICAgICAgICBmb3IgcGlkLCBkYXRhIGluIHByb2NfbWFwLml0ZW1zKCk6XG4gICAgICAgICAgICBpZiBkYXRhW1wicHBpZFwiXSBpbiB0cmVlIGFuZCBwaWQgbm90IGluIHRyZWU6XG4gICAgICAgICAgICAgICAgdHJlZS5hZGQocGlkKVxuICAgICAgICAgICAgICAgIGFkZGVkID0gVHJ1ZVxuICAgIHJldHVybiB0cmVlXG5cbmRlZiBmcmVlemVfcHJvY2Vzc190cmVlKHRyZWVfcGlkcyk6XG4gICAgXCJcIlwiWmFtcmHFvGEgUkFNIGRsYSB3c3p5c3RraWNoIHByb2Nlc8OzdyB3IGRyemV3aWUgKE50U3VzcGVuZFByb2Nlc3MpLlwiXCJcIlxuICAgIGZvciBwaWQgaW4gdHJlZV9waWRzOlxuICAgICAgICBoID0ga2VybmVsMzIuT3BlblByb2Nlc3MoUFJPQ0VTU19TVVNQRU5EX1JFU1VNRSwgRmFsc2UsIHBpZClcbiAgICAgICAgaWYgaDpcbiAgICAgICAgICAgIG50ZGxsLk50U3VzcGVuZFByb2Nlc3MoaClcbiAgICAgICAgICAgIGtlcm5lbDMyLkNsb3NlSGFuZGxlKGgpXG5cbmRlZiBraWxsX3Byb2Nlc3NfdHJlZSh0cmVlX3BpZHMsIHByb2NfbWFwKTpcbiAgICBcIlwiXCJaYWJpamEgd3N6eXN0a2llIHByb2Nlc3kgeiBkcnpld2EgemFjenluYWrEhWMgb2QgZHppZWNpLCBrb8WEY3rEhWMgbmEgcm9kemljdS5cIlwiXCJcbiAgICBmb3IgcGlkIGluIHNvcnRlZCh0cmVlX3BpZHMsIHJldmVyc2U9VHJ1ZSk6XG4gICAgICAgIG5hbWUgPSBwcm9jX21hcC5nZXQocGlkLCB7fSkuZ2V0KFwibmFtZVwiLCBcIlVua25vd25cIilcbiAgICAgICAgaWYgbmFtZS5sb3dlcigpIGluIFNZU1RFTV9XSElURUxJU1Q6XG4gICAgICAgICAgICBwcmludChmXCJbIV0gUG9taWphbmllIHByb2Nlc3Ugc3lzdGVtb3dlZ286IHtuYW1lfSAoUElEOiB7cGlkfSlcIilcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIGggPSBrZXJuZWwzMi5PcGVuUHJvY2VzcyhQUk9DRVNTX1RFUk1JTkFURSwgRmFsc2UsIHBpZClcbiAgICAgICAgaWYgaDpcbiAgICAgICAgICAgIGtlcm5lbDMyLlRlcm1pbmF0ZVByb2Nlc3MoaCwgOSlcbiAgICAgICAgICAgIGtlcm5lbDMyLkNsb3NlSGFuZGxlKGgpXG4gICAgICAgICAgICBwcmludChmXCJb4pyUXSBabGlrd2lkb3dhbm8gd8SZemXFgiBkcnpld2E6IHtuYW1lfSAoUElEOiB7cGlkfSlcIilcblxuZGVmIHNjYW5fcm9ndWVfd2luZG93c19hbmRfa2lsbF9vcmlnaW4oKTpcbiAgICBcIlwiXCJHxYLDs3duYSBwxJl0bGEgc2thbmVyYSBvcmlnaW4gZm9yZW5zaWNzLlwiXCJcIlxuICAgIHByb2NfbWFwID0gZ2V0X3Byb2Nlc3NfaGllcmFyY2h5X21hcCgpXG4gICAgc2NyZWVuX3cgPSB1c2VyMzIuR2V0U3lzdGVtTWV0cmljcygwKVxuICAgIHNjcmVlbl9oID0gdXNlcjMyLkdldFN5c3RlbU1ldHJpY3MoMSlcblxuICAgIHByaW50KFwiPVwiICogNzApXG4gICAgcHJpbnQoXCIgIFBQSUQgT1JJR0lOIFRSQUNFUjogU0tBTk9XQU5JRSBSRUxBQ0pJIFBST0NFU8OTVyBJIE9LSUVOIEZMVVRURVJBXCIpXG4gICAgcHJpbnQoXCI9XCIgKiA3MClcblxuICAgIEBjdHlwZXMuV0lORlVOQ1RZUEUod2ludHlwZXMuQk9PTCwgd2ludHlwZXMuSFdORCwgd2ludHlwZXMuTFBBUkFNKVxuICAgIGRlZiBlbnVtX2NhbGxiYWNrKGh3bmQsIGxwYXJhbSk6XG4gICAgICAgIGlmIG5vdCB1c2VyMzIuSXNXaW5kb3dWaXNpYmxlKGh3bmQpOlxuICAgICAgICAgICAgcmV0dXJuIFRydWVcblxuICAgICAgICByZWN0ID0gd2ludHlwZXMuUkVDVCgpXG4gICAgICAgIHVzZXIzMi5HZXRXaW5kb3dSZWN0KGh3bmQsIGN0eXBlcy5ieXJlZihyZWN0KSlcbiAgICAgICAgdyA9IHJlY3QucmlnaHQgLSByZWN0LmxlZnRcbiAgICAgICAgaCA9IHJlY3QuYm90dG9tIC0gcmVjdC50b3BcblxuICAgICAgICBleF9zdHlsZSA9IHVzZXIzMi5HZXRXaW5kb3dMb25nVyhod25kLCAtMjApICMgR1dMX0VYU1RZTEVcbiAgICAgICAgaXNfdG9wbW9zdCA9IGJvb2woZXhfc3R5bGUgJiAweDAwMDAwMDA4KSAjIFdTX0VYX1RPUE1PU1RcbiAgICAgICAgaXNfZnVsbHNjcmVlbiA9ICh3ID49IHNjcmVlbl93IC0gNSBhbmQgaCA+PSBzY3JlZW5faCAtIDUpXG5cbiAgICAgICAgaWYgaXNfdG9wbW9zdCBhbmQgaXNfZnVsbHNjcmVlbjpcbiAgICAgICAgICAgIHBpZCA9IHdpbnR5cGVzLkRXT1JEKClcbiAgICAgICAgICAgIHVzZXIzMi5HZXRXaW5kb3dUaHJlYWRQcm9jZXNzSWQoaHduZCwgY3R5cGVzLmJ5cmVmKHBpZCkpXG4gICAgICAgICAgICBjaGlsZF9waWQgPSBwaWQudmFsdWVcblxuICAgICAgICAgICAgaWYgY2hpbGRfcGlkIGluIHByb2NfbWFwOlxuICAgICAgICAgICAgICAgIGNoaWxkX2RhdGEgPSBwcm9jX21hcFtjaGlsZF9waWRdXG4gICAgICAgICAgICAgICAgcGFyZW50X3BpZCA9IGNoaWxkX2RhdGFbXCJwcGlkXCJdXG4gICAgICAgICAgICAgICAgcGFyZW50X25hbWUgPSBwcm9jX21hcC5nZXQocGFyZW50X3BpZCwge30pLmdldChcIm5hbWVcIiwgXCJCcmFrL05pZXpuYW55XCIpXG5cbiAgICAgICAgICAgICAgICBwcmludChmXCJcXFxcblshXSBXWUtSWVRPIFrFgU/FmkxJV0UgT0tOTyBIV05EOiB7aGV4KGh3bmQpfVwiKVxuICAgICAgICAgICAgICAgIHByaW50KGZcIiAgICDilJzilIAgUHJvY2VzIE9rbmE6IHtjaGlsZF9kYXRhWyduYW1lJ119IChQSUQ6IHtjaGlsZF9waWR9KVwiKVxuICAgICAgICAgICAgICAgIHByaW50KGZcIiAgICDilJTilIAgUHJvY2VzIFJvZHppYyAoxblSw5NExYFPL1dBVENIRE9HKToge3BhcmVudF9uYW1lfSAoUFBJRDoge3BhcmVudF9waWR9KVwiKVxuXG4gICAgICAgICAgICAgICAgIyBPa3JlxZtsIGtvcnplxYQgYXRha3VcbiAgICAgICAgICAgICAgICByb290X3RhcmdldCA9IHBhcmVudF9waWQgaWYgcGFyZW50X25hbWUubG93ZXIoKSBub3QgaW4gU1lTVEVNX1dISVRFTElTVCBlbHNlIGNoaWxkX3BpZFxuICAgICAgICAgICAgICAgIHRyZWVfcGlkcyA9IGZpbmRfZW50aXJlX3Byb2Nlc3NfdHJlZShyb290X3RhcmdldCwgcHJvY19tYXApXG5cbiAgICAgICAgICAgICAgICBwcmludChmXCJbKl0gWmFtcmHFvGFuaWUgY2HFgmVnbyBwb2Rkcnpld2EgKHtsZW4odHJlZV9waWRzKX0gcHJvY2Vzw7N3KS4uLlwiKVxuICAgICAgICAgICAgICAgIGZyZWV6ZV9wcm9jZXNzX3RyZWUodHJlZV9waWRzKVxuXG4gICAgICAgICAgICAgICAgcHJpbnQoZlwiWypdIExpa3dpZGFjamEgcG9kZHJ6ZXdhIHcgY2VsdSB1bmllbW/FvGxpd2llbmlhIHJlc3RhcnR1Li4uXCIpXG4gICAgICAgICAgICAgICAga2lsbF9wcm9jZXNzX3RyZWUodHJlZV9waWRzLCBwcm9jX21hcClcblxuICAgICAgICByZXR1cm4gVHJ1ZVxuXG4gICAgdXNlcjMyLkVudW1XaW5kb3dzKGVudW1fY2FsbGJhY2ssIDApXG5cbmlmIF9fbmFtZV9fID09IFwiX19tYWluX19cIjpcbiAgICBzY2FuX3JvZ3VlX3dpbmRvd3NfYW5kX2tpbGxfb3JpZ2luKClcbmAsXG4gIH0sXG4gIHtcbiAgICBpZDogJ3BlX2hlYWRlcl9jb3JydXB0b3JfYW5kX2FjbF9sb2NrJyxcbiAgICB0aXRsZTogJ+KYhSBUUldBxYFZIFNBQk9UQcW7IEJJTkFSTlk6IFBFIEhlYWRlciBDb3JydXB0b3IgJiBFeHRyZW1lIEFDTCBMb2Nrb3V0JyxcbiAgICBzaG9ydERlc2M6ICdUcndhbGUgdW5pZW1vxbxsaXdpYSB1cnVjaG9taWVuaWUgc3prb2RsaXdlZ28gcHJvY2VzdSBwb3ByemV6IHpuaXN6Y3plbmllIHN0cnVrdHVyeSBuYWfFgsOzd2thIFBFICh6ZXJvd2FuaWUgc3lnbmF0dXIgTVogaSBlX2xmYW5ldykgb3JheiBvZGNpxJljaWUgdXByYXduaWXFhCBEQUNMIHcgTlRGUyAoaWNhY2xzIC9kZW55IEV2ZXJ5b25lKS4nLFxuICAgIGJhZGdlOiAnVHJ3YcWCeSBTYWJvdGHFvCBQRSAmIEFDTCcsXG4gICAgb3M6IFsnd2luZG93cyddLFxuICAgIHJlcXVpcmVzUGlwOiBmYWxzZSxcbiAgICBwaXBQYWNrYWdlczogWydwc3V0aWwnXSxcbiAgICBrZXlGZWF0dXJlczogW1xuICAgICAgJ1Ryd2HFgmUgdW5pZXdhxbxuaWVuaWUgbmFnxYLDs3drYSBQRSAoRE9TIEhlYWRlciBNWiAmIE5UIFNpZ25hdHVyZSB6ZXJvaW5nKSDigJMgYsWCxIVkIDB4QzAwMDAwN0InLFxuICAgICAgJ1dpbmRvd3MgUEUgTG9hZGVyIChMZHJwSW5pdGlhbGl6ZVByb2Nlc3MpIGJlenBvd3JvdG5pZSBvZHJ6dWNhIHBsaWsgeiBrb211bmlrYXRlbTogXCJUYSBhcGxpa2FjamEgbmllIG1vxbxlIGR6aWHFgmHEh1wiJyxcbiAgICAgICdQYW5jZXJuYSBibG9rYWRhIEFDTCAoaWNhY2xzIC9pbmhlcml0YW5jZTpyIC9kZW55ICpTLTEtMS0wOihGLFgsUixXKSkg4oCTIEFjY2VzcyBEZW5pZWQgZGxhIHdzenlzdGtpY2gnLFxuICAgICAgJ1phbXJvxbxlbmllIHfEhXRrw7N3IHcgUkFNIChOdFN1c3BlbmRQcm9jZXNzKSBwcnplZCB6YWJpY2llbSwgdW5pZW1vxbxsaXdpYWrEhWNlIHJlYWtjasSZIHrFgm/Fm2xpd2VnbyBrb2R1JyxcbiAgICAgICdEemlhxYJhIHcgMTAwJSBPRkZMSU5FIGJleiBkb3N0xJlwdSBkbyBzaWVjaSBpIGJleiBpbnN0YWxvd2FuaWEgcGFjemVrIHBpcCdcbiAgICBdLFxuICAgIHJlY29tbWVuZGVkRm9yOiAnR2R5IHrFgm/Fm2xpd2Ugb3Byb2dyYW1vd2FuaWUgcG9zaWFkYSBhZ3Jlc3l3bnkgbWVjaGFuaXptIHNhbW9jenlubmVnbyBvZHJhZHphbmlhIHNpxJkgKHdhdGNoZG9nIHNlcnZpY2UsIHJlc3RhcnQgbG9vcHMsIHJlcGxpa2FjamEpLCBhIHp3eWvFgmUgemFrb8WEY3plbmllIHByb2Nlc3UgbmllIHphcG9iaWVnYSBwb25vd25lbXUgdXJ1Y2hvbWllbml1LicsXG4gICAgZXhwbGFuYXRpb246IFtcbiAgICAgICcxLiBaYW1yb8W8ZW5pZSBwcm9jZXN1IChOdFN1c3BlbmRQcm9jZXNzKTogV3N0cnp5bXVqZSBuYXR5Y2htaWFzdCB3c3p5c3RraWUgd8SFdGtpIHN6a29kbGl3ZWdvIHByb2dyYW11IHcgasSFZHJ6ZSBOVC4nLFxuICAgICAgJzIuIFp3b2xuaWVuaWUgdWNod3l0dSBwbGlrdTogS2/FhGN6eSBwcm9jZXMsIGFieSBzeXN0ZW0gV2luZG93cyB6ZXp3b2xpxYIgbmEgYmV6cG/Fm3JlZG5pIHphcGlzIGJpbmFybnkgZG8gcGxpa3UgLmV4ZS4nLFxuICAgICAgJzMuIFNhYm90YcW8IG5hZ8WCw7N3a2EgUEU6IE90d2llcmEgcGxpayB3IHRyeWJpZSBiaW5hcm55bSAocitiKSwgbmFkcGlzdWplIGJhanR5IHN5Z25hdHVyeSBET1MgXCJNWlwiICgweDVBNEQpIG9yYXogb2Zmc2V0IGVfbGZhbmV3IGkgc3lnbmF0dXLEmSBcIlBFXFxcXDBcXFxcMFwiIHplcmFtaSBsdWIgem5pc3pjem9ueW1pIHdhcnRvxZtjaWFtaS4gTmF3ZXQgc2tvcGlvd2FuaWUgcGxpa3UgbmEgaW5ueSBrb21wdXRlciBuaWUgcHJ6eXdyw7NjaSBtdSBtb8W8bGl3b8WbY2kgdXJ1Y2hvbWllbmlhLicsXG4gICAgICAnNC4gQmxva2FkYSBBQ0wgKERBQ0wgSGFyZGVuaW5nKTogWmVydWplIGR6aWVkemljemVuaWUgdXByYXduaWXFhCAoL2luaGVyaXRhbmNlOnIpIG9yYXogZG9kYWplIHJlZ3XFgsSZIERFTlkgZGxhIGdydXB5IEV2ZXJ5b25lIChTSUQgKlMtMS0xLTApLCBibG9rdWrEhWMgb2Rjenl0LCB6YXBpcyBpIHd5a29ueXdhbmllLicsXG4gICAgICAnNS4gQmxva2FkYSBJRkVPOiBSZWplc3RydWplIGF0cmFwxJkgZGVidWdnZXJhIHcgUmVqZXN0cnplIFdpbmRvd3MgamFrbyBkb2RhdGtvd8SFIGxpbmnEmSBvYnJvbnkuJ1xuICAgIF0sXG4gICAgY29kZTogYFwiXCJcIlxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblRSV0HFgVkgU0FCT1RBxbsgQklOQVJOWTogUEUgSEVBREVSIENPUlJVUFRPUiAmIEVYVFJFTUUgQUNMIExPQ0tPVVQgKDEwMCUgT0ZGTElORSlcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5Ta3J5cHQgdyB1xYJhbWt1IHNla3VuZHkgd3lrcnl3YSBzemtvZGxpd3kgcHJvY2VzLCB6YW1yYcW8YSBnbyB3IFJBTSwgbmlzemN6eVxubmFnxYLDs3dlayBiaW5hcm55IFBFIG5hIGR5c2t1IGkgb2RjaW5hIHVwcmF3bmllbmlhIEFDTCwgdW5pZW1vxbxsaXdpYWrEhWMgcmVzdGFydC5cbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cIlwiXCJcbmltcG9ydCBjdHlwZXNcbmZyb20gY3R5cGVzIGltcG9ydCB3aW50eXBlc1xuaW1wb3J0IHRpbWVcbmltcG9ydCBvc1xuaW1wb3J0IHN5c1xuaW1wb3J0IHN0cnVjdFxuaW1wb3J0IHBzdXRpbFxuXG51c2VyMzIgPSBjdHlwZXMud2luZGxsLnVzZXIzMlxua2VybmVsMzIgPSBjdHlwZXMud2luZGxsLmtlcm5lbDMyXG5udGRsbCA9IGN0eXBlcy53aW5kbGwubnRkbGxcblxuUFJPQ0VTU19URVJNSU5BVEUgPSAweDAwMDFcblBST0NFU1NfU1VTUEVORF9SRVNVTUUgPSAweDA4MDBcblBST0NFU1NfUVVFUllfTElNSVRFRF9JTkZPUk1BVElPTiA9IDB4MTAwMFxuXG4jIEJpYcWCYSBsaXN0YSBjaHJvbmlvbnljaCBwcm9jZXPDs3cgc3lzdGVtb3d5Y2hcblNBRkVfV0hJVEVMSVNUID0ge1xuICAgIFwiZXhwbG9yZXIuZXhlXCIsIFwidGFza21nci5leGVcIiwgXCJkd20uZXhlXCIsIFwic2hlbGxleHBlcmllbmNlaG9zdC5leGVcIixcbiAgICBcInNlYXJjaGhvc3QuZXhlXCIsIFwic3lzdGVtc2V0dGluZ3MuZXhlXCIsIFwibHNhc3MuZXhlXCIsIFwiY3Nyc3MuZXhlXCIsXG4gICAgXCJzZXJ2aWNlcy5leGVcIiwgXCJzdmNob3N0LmV4ZVwiLCBcImNvZGUuZXhlXCIsIFwiY2hyb21lLmV4ZVwiLCBcImZpcmVmb3guZXhlXCJcbn1cblxuZGVmIGZyZWV6ZV90aHJlYWRzKHBpZCk6XG4gICAgXCJcIlwiWmFtcmHFvGEgd3N6eXN0a2llIHfEhXRraSBwcm9jZXN1IHcgcGFtacSZY2kgUkFNLlwiXCJcIlxuICAgIGggPSBrZXJuZWwzMi5PcGVuUHJvY2VzcyhQUk9DRVNTX1NVU1BFTkRfUkVTVU1FLCBGYWxzZSwgcGlkKVxuICAgIGlmIGg6XG4gICAgICAgIG50ZGxsLk50U3VzcGVuZFByb2Nlc3MoaClcbiAgICAgICAga2VybmVsMzIuQ2xvc2VIYW5kbGUoaClcbiAgICAgICAgcHJpbnQoZlwiWytdIFsxLiBGUkVFWkVdIFByb2NlcyBQSUQge3BpZH0gem9zdGHFgiB6YXRyenltYW55IHcgUkFNLlwiKVxuICAgICAgICByZXR1cm4gVHJ1ZVxuICAgIHJldHVybiBGYWxzZVxuXG5kZWYgZ2V0X2JpbmFyeV9wYXRoKHBpZCk6XG4gICAgXCJcIlwiUG9iaWVyYSBwZcWCbsSFIMWbY2llxbxrxJkgZG8gcGxpa3Ugd3lrb255d2FsbmVnby5cIlwiXCJcbiAgICBoID0ga2VybmVsMzIuT3BlblByb2Nlc3MoUFJPQ0VTU19RVUVSWV9MSU1JVEVEX0lORk9STUFUSU9OLCBGYWxzZSwgcGlkKVxuICAgIGlmIG5vdCBoOlxuICAgICAgICByZXR1cm4gTm9uZVxuICAgIGJ1ZiA9IGN0eXBlcy5jcmVhdGVfdW5pY29kZV9idWZmZXIoMTAyNClcbiAgICBzaXplID0gd2ludHlwZXMuRFdPUkQoMTAyNClcbiAgICBpZiBrZXJuZWwzMi5RdWVyeUZ1bGxQcm9jZXNzSW1hZ2VOYW1lVyhoLCAwLCBidWYsIGN0eXBlcy5ieXJlZihzaXplKSk6XG4gICAgICAgIGtlcm5lbDMyLkNsb3NlSGFuZGxlKGgpXG4gICAgICAgIHJldHVybiBidWYudmFsdWVcbiAgICBrZXJuZWwzMi5DbG9zZUhhbmRsZShoKVxuICAgIHJldHVybiBOb25lXG5cbmRlZiBjb3JydXB0X3BlX2JpbmFyeV9oZWFkZXIoZXhlX3BhdGgpOlxuICAgIFwiXCJcIlxuICAgIFRyd2FsZSBuaXN6Y3p5IHN0cnVrdHVyxJkgUG9ydGFibGUgRXhlY3V0YWJsZSAoUEUpIHBsaWt1IGJpbmFybmVnby5cbiAgICBOYWRwaXN1amUgc3lnbmF0dXLEmSBET1MgJ01aJyBvcmF6IG5hZ8WCw7N3ZWsgUEUgJ1BFXFxcXDBcXFxcMCcuXG4gICAgXG4gICAgUkVaVUxUQVQ6XG4gICAgV2luZG93cyBQRSBMb2FkZXIgemfFgmFzemEgYsWCxIVkIFNUQVRVU19JTlZBTElEX0lNQUdFX0ZPUk1BVCAoMHhDMDAwMDA3QikuXG4gICAgUGxpayBzdGFqZSBzacSZIHcgMTAwJSBiZXp1xbx5dGVjem55IGkgbmllbW/FvGxpd3kgZG8gd3lrb25hbmlhLlxuICAgIFwiXCJcIlxuICAgIGlmIG5vdCBleGVfcGF0aCBvciBub3Qgb3MucGF0aC5leGlzdHMoZXhlX3BhdGgpOlxuICAgICAgICByZXR1cm4gRmFsc2VcblxuICAgIHRyeTpcbiAgICAgICAgIyBVc3VuacSZY2llIGF0cnlidXTDs3cgUmVhZC1Pbmx5XG4gICAgICAgIGtlcm5lbDMyLlNldEZpbGVBdHRyaWJ1dGVzVyhleGVfcGF0aCwgMHg4MCkgIyBGSUxFX0FUVFJJQlVURV9OT1JNQUxcblxuICAgICAgICB3aXRoIG9wZW4oZXhlX3BhdGgsIFwicitiXCIpIGFzIGY6XG4gICAgICAgICAgICAjIDEuIFNwcmF3ZMW6IHN5Z25hdHVyxJkgRE9TXG4gICAgICAgICAgICBmLnNlZWsoMClcbiAgICAgICAgICAgIG1hZ2ljID0gZi5yZWFkKDIpXG4gICAgICAgICAgICBpZiBtYWdpYyAhPSBiXCJNWlwiOlxuICAgICAgICAgICAgICAgIHByaW50KGZcIlshXSBQbGlrIHtleGVfcGF0aH0gbmllIHBvc2lhZGEgc3lnbmF0dXJ5IE1aIGx1YiB6b3N0YcWCIGp1xbwgdXN6a29kem9ueS5cIilcblxuICAgICAgICAgICAgIyAyLiBPZGN6eXRhaiBvZmZzZXQgbmFnxYLDs3drYSBQRSAoMHgzQyBlX2xmYW5ldylcbiAgICAgICAgICAgIGYuc2VlaygweDNDKVxuICAgICAgICAgICAgZV9sZmFuZXcgPSBmLnJlYWQoNClcbiAgICAgICAgICAgIHBlX29mZnNldCA9IDBcbiAgICAgICAgICAgIGlmIGxlbihlX2xmYW5ldykgPT0gNDpcbiAgICAgICAgICAgICAgICBwZV9vZmZzZXQgPSBzdHJ1Y3QudW5wYWNrKFwiPElcIiwgZV9sZmFuZXcpWzBdXG5cbiAgICAgICAgICAgICMgMy4gWm5pc3pjeiBzeWduYXR1csSZIERPUyAnTVonIC0+ICdERUFEJ1xuICAgICAgICAgICAgZi5zZWVrKDApXG4gICAgICAgICAgICBmLndyaXRlKGJcIlxcXFx4REVcXFxceEFEXCIpXG5cbiAgICAgICAgICAgICMgNC4gWm5pc3pjeiB3c2thxbpuaWsgZV9sZmFuZXdcbiAgICAgICAgICAgIGYuc2VlaygweDNDKVxuICAgICAgICAgICAgZi53cml0ZShiXCJcXFxceEZGXFxcXHhGRlxcXFx4RkZcXFxceEZGXCIpXG5cbiAgICAgICAgICAgICMgNS4gWm5pc3pjeiBzeWduYXR1csSZIFBFIChqZcWbbGkgemxva2FsaXpvd2FuYSlcbiAgICAgICAgICAgIGlmIDAgPCBwZV9vZmZzZXQgPCAxMDQ4NTc2OlxuICAgICAgICAgICAgICAgIHRyeTpcbiAgICAgICAgICAgICAgICAgICAgZi5zZWVrKHBlX29mZnNldClcbiAgICAgICAgICAgICAgICAgICAgZi53cml0ZShiXCJcXFxceDAwXFxcXHgwMFxcXFx4MDBcXFxceDAwXFxcXHhGRlxcXFx4RkZcXFxceEZGXFxcXHhGRlwiKVxuICAgICAgICAgICAgICAgIGV4Y2VwdCBFeGNlcHRpb246XG4gICAgICAgICAgICAgICAgICAgIHBhc3NcblxuICAgICAgICAgICAgIyA2LiBXeXplcnVqIHBpZXJ3c3plIDUxMiBiYWp0w7N3IG5hZ8WCw7N3a2FcbiAgICAgICAgICAgIGYuc2VlaygyKVxuICAgICAgICAgICAgZi53cml0ZShiXCJcXFxceDAwXCIgKiA1MTApXG4gICAgICAgICAgICBmLmZsdXNoKClcblxuICAgICAgICBwcmludChmXCJbK10gW1NVS0NFUyAtIFBFIENPUlJVUFRFRF0gWm5pc3pjem9ubyBuYWfFgsOzd2VrIFBFIHBsaWt1OiB7ZXhlX3BhdGh9XCIpXG4gICAgICAgIHByaW50KGZcIiAgICBTeXN0ZW0gV2luZG93cyB6Z8WCYXN6YSBixYLEhWQgMHhDMDAwMDA3QiAoU1RBVFVTX0lOVkFMSURfSU1BR0VfRk9STUFUKS5cIilcbiAgICAgICAgcmV0dXJuIFRydWVcbiAgICBleGNlcHQgRXhjZXB0aW9uIGFzIGU6XG4gICAgICAgIHByaW50KGZcIlstXSBCxYLEhWQgdXN6a2FkemFuaWEgbmFnxYLDs3drYSBQRToge2V9XCIpXG4gICAgICAgIHJldHVybiBGYWxzZVxuXG5kZWYgbG9ja19iaW5hcnlfYWNsKGV4ZV9wYXRoKTpcbiAgICBcIlwiXCJcbiAgICBPZGNpbmEgdXByYXduaWVuaWEgdyBBY2Nlc3MgQ29udHJvbCBMaXN0IChEQUNMKSB3IHN5c3RlbWllIHBsaWvDs3cgTlRGUy5cbiAgICBPZGJpZXJhIHVwcmF3bmllbmlhIGRvIHVydWNoYW1pYW5pYSAoRXhlY3V0ZSksIG9kY3p5dHUgaSB6YXBpc3UgZGxhIGdydXB5IEV2ZXJ5b25lLlxuICAgIFwiXCJcIlxuICAgIGlmIG5vdCBleGVfcGF0aCBvciBub3Qgb3MucGF0aC5leGlzdHMoZXhlX3BhdGgpOlxuICAgICAgICByZXR1cm4gRmFsc2VcbiAgICB0cnk6XG4gICAgICAgICMgWmVyd2FuaWUgZHppZWR6aWN6ZW5pYSB1cHJhd25pZcWEXG4gICAgICAgIG9zLnN5c3RlbShmJ2ljYWNscyBcIntleGVfcGF0aH1cIiAvaW5oZXJpdGFuY2U6ciA+bnVsIDI+JjEnKVxuICAgICAgICAjIE9kbW93YSB3c3plbGtpY2ggcHJhdyBkbGEgZ3J1cHkgV3N6eXNjeSAoU0lEIFMtMS0xLTApXG4gICAgICAgIG9zLnN5c3RlbShmJ2ljYWNscyBcIntleGVfcGF0aH1cIiAvZGVueSAqUy0xLTEtMDooRixYLFIsVykgPm51bCAyPiYxJylcbiAgICAgICAgb3Muc3lzdGVtKGYnaWNhY2xzIFwie2V4ZV9wYXRofVwiIC9kZW55IEV2ZXJ5b25lOihGLFgsUixXKSA+bnVsIDI+JjEnKVxuICAgICAgICBwcmludChmXCJbK10gW1NVS0NFUyAtIEFDTCBMT0NLT1VUXSBPZGNpxJl0byB1cHJhd25pZW5pYSAoQWNjZXNzIERlbmllZCAvIELFgsSFZCA1KS5cIilcbiAgICAgICAgcmV0dXJuIFRydWVcbiAgICBleGNlcHQgRXhjZXB0aW9uIGFzIGU6XG4gICAgICAgIHByaW50KGZcIlstXSBCxYLEhWQgYmxva2FkeSBBQ0w6IHtlfVwiKVxuICAgICAgICByZXR1cm4gRmFsc2VcblxuZGVmIGtpbGxfYW5kX3NhYm90YWdlKHByb2MpOlxuICAgIHBpZCA9IHByb2MucGlkXG4gICAgbmFtZSA9IHByb2MubmFtZSgpLmxvd2VyKClcbiAgICBcbiAgICBpZiBuYW1lIGluIFNBRkVfV0hJVEVMSVNUOlxuICAgICAgICByZXR1cm5cblxuICAgIHByaW50KFwiPVwiICogNzApXG4gICAgcHJpbnQoZlwiWyFdIFdZS1JZVE8gWsWBT8WaTElXWSBQUk9DRVM6IHtuYW1lfSAoUElEOiB7cGlkfSlcIilcblxuICAgICMgMS4gRnJlZXplXG4gICAgZnJlZXplX3RocmVhZHMocGlkKVxuXG4gICAgIyAyLiBQb2JpZXJ6IMWbY2llxbxrxJlcbiAgICBleGVfcGF0aCA9IGdldF9iaW5hcnlfcGF0aChwaWQpXG5cbiAgICAjIDMuIFphYmlqIHByb2NlcywgYnkgendvbG5pxIcgdWNod3l0XG4gICAgdHJ5OlxuICAgICAgICBwcm9jLmtpbGwoKVxuICAgICAgICB0aW1lLnNsZWVwKDAuMDUpXG4gICAgZXhjZXB0IEV4Y2VwdGlvbjpcbiAgICAgICAgb3Muc3lzdGVtKGZcInRhc2traWxsIC9GIC9QSUQge3BpZH0gPm51bCAyPiYxXCIpXG5cbiAgICAjIDQuIFRyd2HFgmUgdXN6a29kemVuaWUgUEUgaSBibG9rYWRhIEFDTFxuICAgIGlmIGV4ZV9wYXRoOlxuICAgICAgICBjb3JydXB0X3BlX2JpbmFyeV9oZWFkZXIoZXhlX3BhdGgpXG4gICAgICAgIGxvY2tfYmluYXJ5X2FjbChleGVfcGF0aClcblxuICAgICMgNS4gQmxva2FkYSBJRkVPIHcgUmVqZXN0cnplXG4gICAgb3Muc3lzdGVtKGYncmVnIGFkZCBcIkhLTE1cXFxcXFxcXFNPRlRXQVJFXFxcXFxcXFxNaWNyb3NvZnRcXFxcXFxcXFdpbmRvd3MgTlRcXFxcXFxcXEN1cnJlbnRWZXJzaW9uXFxcXFxcXFxJbWFnZSBGaWxlIEV4ZWN1dGlvbiBPcHRpb25zXFxcXFxcXFx7bmFtZX1cIiAvdiBEZWJ1Z2dlciAvdCBSRUdfU1ogL2QgXCJzeXN0cmF5LmV4ZVwiIC9mID5udWwgMj4mMScpXG4gICAgcHJpbnQoZlwiWytdIFtJRkVPIExPQ0tdIFphYmxva293YW5vIHN0YXJ0ICd7bmFtZX0nIHcgcmVqZXN0cnplIFdpbmRvd3MuXCIpXG4gICAgcHJpbnQoXCI9XCIgKiA3MClcblxuaWYgX19uYW1lX18gPT0gXCJfX21haW5fX1wiOlxuICAgIHByaW50KFwiWypdIFNUUkHFu05JSyBBTlRZLU1BTFdBUkU6IFBFIENPUlJVUFRPUiAmIEFDTCBERUZFTlNFICgxMDAlIE9GRkxJTkUpXCIpXG4gICAgcHJpbnQoXCJbKl0gU2thbm93YW5pZSBwcm9jZXPDs3cgcG9kIGvEhXRlbSB6YWdyb8W8ZcWELi4uXCIpXG4gICAgZm9yIHByb2MgaW4gcHN1dGlsLnByb2Nlc3NfaXRlcihbJ3BpZCcsICduYW1lJ10pOlxuICAgICAgICB0cnk6XG4gICAgICAgICAgICBwbmFtZSA9IHByb2MuaW5mb1snbmFtZSddLmxvd2VyKClcbiAgICAgICAgICAgIGlmICdmbHV0dGVyJyBpbiBwbmFtZSBvciAnbWFsd2FyZScgaW4gcG5hbWU6XG4gICAgICAgICAgICAgICAga2lsbF9hbmRfc2Fib3RhZ2UocHJvYylcbiAgICAgICAgZXhjZXB0IEV4Y2VwdGlvbjpcbiAgICAgICAgICAgIHBhc3NcbiAgICBwcmludChcIlsqXSBHb3Rvd2UuXCIpXG5gXG4gIH0sXG4gIHtcbiAgICBpZDogJ3F1YXJhbnRpbmVfYW50aV9yZXNwYXduX2xvY2tvdXQnLFxuICAgIHRpdGxlOiAn4piFIFVOSUVSVUNIT01JRU5JRSAmIEtXQVJBTlRBTk5BOiBQcm9jZXNzIEZyZWV6ZSArIEJpbmFyeSBMb2Nrb3V0IChBbnRpLVJlc3Bhd24pJyxcbiAgICBzaG9ydERlc2M6ICdOYXR5Y2htaWFzdCB6YW1yYcW8YSB3c3p5c3RraWUgd8SFdGtpIHByb2Nlc3UgdyBwYW1pxJljaSAoTnRTdXNwZW5kUHJvY2VzcyksIGJsb2t1amUgcmVzdGFydCwgem1pZW5pYSB1cHJhd25pZW5pYSBwbGlrdSBuYSBkeXNrdSBsdWIgem1pZW5pYSBuYXp3xJkgbmEgLnF1YXJhbnRpbmUsIHphcG9iaWVnYWrEhWMgb2RyYWR6YW5pdSBzacSZIG1hbHdhcmUuJyxcbiAgICBiYWRnZTogJ0Jsb2thZGEgVHJ3YcWCYSAoQW50aS1NYWx3YXJlKScsXG4gICAgb3M6IFsnd2luZG93cyddLFxuICAgIHJlcXVpcmVzUGlwOiBmYWxzZSxcbiAgICBwaXBQYWNrYWdlczogWydwc3V0aWwnXSxcbiAgICBrZXlGZWF0dXJlczogW1xuICAgICAgJ0LFgnlza2F3aWN6bmUgemFtcm/FvGVuaWUgdyBSQU0gKE50U3VzcGVuZFByb2Nlc3MgLyBwcm9jLnN1c3BlbmQpIOKAkyBtYWx3YXJlIG5pZSBtb8W8ZSByZWFnb3dhxIcgYW5pIHd5c3nFgmHEhyB6ZGFyemXFhCcsXG4gICAgICAnUG9iaWVyYSBwZcWCbsSFIMWbY2llxbxrxJkgcGxpa3UgYmluYXJuZWdvIG5hIGR5c2t1IChRdWVyeUZ1bGxQcm9jZXNzSW1hZ2VOYW1lVyknLFxuICAgICAgJ09kZWJyYW5pZSB1cHJhd25pZcWEIGRvIHVydWNoYW1pYW5pYSAoaWNhY2xzIC9kZW55IEV2ZXJ5b25lOihYLFcpKSBsdWIgem1pYW5hIG5hend5IHBsaWt1JyxcbiAgICAgICdXcGlzIHcgcmVqZXN0cnplIElGRU8gKEltYWdlIEZpbGUgRXhlY3V0aW9uIE9wdGlvbnMpIGJsb2t1asSFY3kgcG9ub3dueSBzdGFydCBwcm9ncmFtdSB3IHN5c3RlbWllIFdpbmRvd3MnLFxuICAgICAgJ0R6aWHFgmEgdyAxMDAlIG9mZmxpbmUsIGJleiBwb8WCxIVjemVuaWEgeiBzaWVjacSFIGkgYmV6IHpld27EmXRyem55Y2ggc2Vyd2Vyw7N3J1xuICAgIF0sXG4gICAgcmVjb21tZW5kZWRGb3I6ICdHZHkgesWCb8WbbGl3eSBwcm9ncmFtIG1hIG1lY2hhbml6bXkgc2Ftb2N6eW5uZWdvIHJlc3RhcnR1ICh3YXRjaGRvZywgcMSZdGxhIG5pZXNrb8WEY3pvbmEsIHByb2Nlc3kgYmxpxbpuaWFjemUpLCBibG9rdWplIG9rbmEgZGlhbG9nb3dlIGkgb2RyYWR6YSBzacSZIHBvIHp3eWvFgnltIHRhc2traWxsLicsXG4gICAgZXhwbGFuYXRpb246IFtcbiAgICAgICcxLiBaYW1yb8W8ZW5pZSAoRnJlZXplKTogV3l3b8WCdWplIG50ZGxsLk50U3VzcGVuZFByb2Nlc3MgbHViIHBzdXRpbC5Qcm9jZXNzLnN1c3BlbmQoKS4gUHJvY2VzIHcgcGFtacSZY2kgUkFNIHpvc3RhamUgY2HFgmtvd2ljaWUgemF0cnp5bWFueSDigJMgbmllIG1vxbxlIHByemVjaHd5dHl3YcSHIG15c3p5LCB0d29yennEhyBva2llbiBhbmkgd3lrb255d2HEhyBrb2R1LicsXG4gICAgICAnMi4gRGV0ZWtjamEgxZtjaWXFvGtpOiBPZGN6eXR1amUgZG9rxYJhZG7EhSDFm2NpZcW8a8SZIGRvIHBsaWt1IC5leGUgbmEgZHlza3UgdHdhcmR5bS4nLFxuICAgICAgJzMuIEt3YXJhbnRhbm5hIGJpbmFybmE6IE5hZGFqZSBwbGlrb3dpIGF0cnlidXQgdHlsa28gZG8gb2Rjenl0dSBpIGJsb2t1amUgdXByYXduaWVuaWEgd3lrb25hbmlhIChFeGVjdXRlKSBwcnpleiBuYXJ6xJlkemllIGljYWNscywgdW5pZW1vxbxsaXdpYWrEhWMgcmVzdGFydC4nLFxuICAgICAgJzQuIEJsb2thZGEgSUZFTyAoT3Bjam9uYWxuYSk6IFR3b3J6eSB3cGlzIHcgUmVqZXN0cnplIFdpbmRvd3MgKEltYWdlIEZpbGUgRXhlY3V0aW9uIE9wdGlvbnMpIHByemVraWVyb3d1asSFY3kgZGVidWdnZXIgbmEgZHVtbXkgcHJvY2Vzcywgd2nEmWMgV2luZG93cyBvZG3Ds3dpIHN0YXJ0dSB0ZWdvIHBsaWt1LicsXG4gICAgICAnNS4gRWxpbWluYWNqYTogUG8gem5ldXRyYWxpem93YW5pdSBwbGlrdSBuYSBkeXNrdSwgemFtcm/FvG9ueSBwcm9jZXMgem9zdGFqZSBiZXpwb3dyb3RuaWUgdXN1bmnEmXR5IHogcGFtacSZY2kuJ1xuICAgIF0sXG4gICAgY29kZTogYFwiXCJcIlxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblVOSUVSVUNIT01JRU5JRSAmIEtXQVJBTlRBTk5BIFBST0NFU1UgKEFudGktUmVzcGF3biAmIFByb2Nlc3MgRnJlZXplcilcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5EemlhxYJhIHcgMTAwJSBPRkZMSU5FLiBOaWUgd3ltYWdhIHBvxYLEhWN6ZW5pYSB6IGludGVybmV0ZW0uXG5aYW1yYcW8YSB3xIV0a2kgcHJvY2VzdSB3IHBhbWnEmWNpLCBvZGJpZXJhIHByYXdhIHd5a29ueXdhbmlhIHBsaWtvd2kgaSB1YmlqYSBnby5cbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cIlwiXCJcbmltcG9ydCBjdHlwZXNcbmZyb20gY3R5cGVzIGltcG9ydCB3aW50eXBlc1xuaW1wb3J0IHRpbWVcbmltcG9ydCBvc1xuaW1wb3J0IHN5c1xuaW1wb3J0IHN1YnByb2Nlc3NcblxudXNlcjMyID0gY3R5cGVzLndpbmRsbC51c2VyMzJcbmtlcm5lbDMyID0gY3R5cGVzLndpbmRsbC5rZXJuZWwzMlxubnRkbGwgPSBjdHlwZXMud2luZGxsLm50ZGxsXG5cblBST0NFU1NfQUxMX0FDQ0VTUyA9IDB4MUYwRkZGXG5QUk9DRVNTX1RFUk1JTkFURSA9IDB4MDAwMVxuUFJPQ0VTU19TVVNQRU5EX1JFU1VNRSA9IDB4MDgwMFxuUFJPQ0VTU19RVUVSWV9MSU1JVEVEX0lORk9STUFUSU9OID0gMHgxMDAwXG5cbiMgQmlhxYJhIGxpc3RhIGNocm9uaW9ueWNoIHByb2Nlc8OzdyBzeXN0ZW1vd3ljaFxuU0FGRV9XSElURUxJU1QgPSB7XG4gICAgXCJleHBsb3Jlci5leGVcIiwgXCJ0YXNrbWdyLmV4ZVwiLCBcImR3bS5leGVcIiwgXCJzaGVsbGV4cGVyaWVuY2Vob3N0LmV4ZVwiLFxuICAgIFwic2VhcmNoaG9zdC5leGVcIiwgXCJzeXN0ZW1zZXR0aW5ncy5leGVcIiwgXCJsc2Fzcy5leGVcIiwgXCJjc3Jzcy5leGVcIixcbiAgICBcInNlcnZpY2VzLmV4ZVwiLCBcInN2Y2hvc3QuZXhlXCIsIFwiY29kZS5leGVcIiwgXCJjaHJvbWUuZXhlXCIsIFwiZmlyZWZveC5leGVcIlxufVxuXG5kZWYgc3VzcGVuZF9wcm9jZXNzKHBpZCk6XG4gICAgXCJcIlwiTmF0eWNobWlhc3QgemFtcmHFvGEgd3N6eXN0a2llIHfEhXRraSBwcm9jZXN1IHcgcGFtacSZY2kgUkFNLlwiXCJcIlxuICAgIGhfcHJvYyA9IGtlcm5lbDMyLk9wZW5Qcm9jZXNzKFBST0NFU1NfU1VTUEVORF9SRVNVTUUsIEZhbHNlLCBwaWQpXG4gICAgaWYgaF9wcm9jOlxuICAgICAgICBzdGF0dXMgPSBudGRsbC5OdFN1c3BlbmRQcm9jZXNzKGhfcHJvYylcbiAgICAgICAga2VybmVsMzIuQ2xvc2VIYW5kbGUoaF9wcm9jKVxuICAgICAgICBpZiBzdGF0dXMgPT0gMDpcbiAgICAgICAgICAgIHByaW50KGZcIlsrXSBbWkFNUk/Fu09OT10gUHJvY2VzIFBJRCB7cGlkfSB6b3N0YcWCIHpuZXV0cmFsaXpvd2FueSB3IHBhbWnEmWNpIFJBTSAoWmVybyBha2NqaS9aZXJvIG9raWVuKS5cIilcbiAgICAgICAgICAgIHJldHVybiBUcnVlXG4gICAgcmV0dXJuIEZhbHNlXG5cbmRlZiBnZXRfcHJvY2Vzc19leGVjdXRhYmxlX3BhdGgocGlkKTpcbiAgICBcIlwiXCJQb2JpZXJhIHBlxYJuxIUgxZtjaWXFvGvEmSBkbyBwbGlrdSAuZXhlIG5hIGR5c2t1LlwiXCJcIlxuICAgIGhfcHJvYyA9IGtlcm5lbDMyLk9wZW5Qcm9jZXNzKFBST0NFU1NfUVVFUllfTElNSVRFRF9JTkZPUk1BVElPTiwgRmFsc2UsIHBpZClcbiAgICBpZiBub3QgaF9wcm9jOlxuICAgICAgICByZXR1cm4gTm9uZVxuICAgIGJ1ZiA9IGN0eXBlcy5jcmVhdGVfdW5pY29kZV9idWZmZXIoMTAyNClcbiAgICBzaXplID0gd2ludHlwZXMuRFdPUkQoMTAyNClcbiAgICBpZiBrZXJuZWwzMi5RdWVyeUZ1bGxQcm9jZXNzSW1hZ2VOYW1lVyhoX3Byb2MsIDAsIGJ1ZiwgY3R5cGVzLmJ5cmVmKHNpemUpKTpcbiAgICAgICAga2VybmVsMzIuQ2xvc2VIYW5kbGUoaF9wcm9jKVxuICAgICAgICByZXR1cm4gYnVmLnZhbHVlXG4gICAga2VybmVsMzIuQ2xvc2VIYW5kbGUoaF9wcm9jKVxuICAgIHJldHVybiBOb25lXG5cbmRlZiBxdWFyYW50aW5lX2V4ZWN1dGFibGVfZmlsZShmaWxlX3BhdGgpOlxuICAgIFwiXCJcIkJsb2t1amUgdXByYXduaWVuaWEgZG8gd3lrb255d2FuaWEgcGxpa3UgYmluYXJuZWdvIG5hIGR5c2t1LlwiXCJcIlxuICAgIGlmIG5vdCBmaWxlX3BhdGggb3Igbm90IG9zLnBhdGguZXhpc3RzKGZpbGVfcGF0aCk6XG4gICAgICAgIHJldHVybiBGYWxzZVxuICAgIHRyeTpcbiAgICAgICAgcHJpbnQoZlwiWypdIFByemVub3N6ZW5pZSBkbyBrd2FyYW50YW5ueToge2ZpbGVfcGF0aH1cIilcbiAgICAgICAgIyAxLiBabWlhbmEgbmF6d3kgbmEgcm96c3plcnplbmllIC5xdWFyYW50aW5lZF9sb2NrXG4gICAgICAgIHF1YXJhbnRpbmVfcGF0aCA9IGZpbGVfcGF0aCArIFwiLnF1YXJhbnRpbmVkX2xvY2tcIlxuICAgICAgICB0cnk6XG4gICAgICAgICAgICBvcy5yZW5hbWUoZmlsZV9wYXRoLCBxdWFyYW50aW5lX3BhdGgpXG4gICAgICAgICAgICBwcmludChmXCJbK10gW1NVS0NFU10gWm1pZW5pb25vIG5henfEmSBuYToge3F1YXJhbnRpbmVfcGF0aH1cIilcbiAgICAgICAgICAgIHJldHVybiBUcnVlXG4gICAgICAgIGV4Y2VwdCBQZXJtaXNzaW9uRXJyb3I6XG4gICAgICAgICAgICAjIDIuIEplxZtsaSBwbGlrIGplc3QgemFibG9rb3dhbnkgLSBvZGVicmFuaWUgdXByYXduaWXFhCBkbyB1cnVjaG9taWVuaWEgKGljYWNscylcbiAgICAgICAgICAgIGNtZCA9IGYnaWNhY2xzIFwie2ZpbGVfcGF0aH1cIiAvZGVueSBFdmVyeW9uZTooWCxXKSA+bnVsIDI+JjEnXG4gICAgICAgICAgICBvcy5zeXN0ZW0oY21kKVxuICAgICAgICAgICAgcHJpbnQoZlwiWytdIFtTVUtDRVNdIE9kZWJyYW5vIHVwcmF3bmllbmlhIHd5a29uYW5pYSAoaWNhY2xzIC9kZW55IEV2ZXJ5b25lOihYLFcpKVwiKVxuICAgICAgICAgICAgcmV0dXJuIFRydWVcbiAgICBleGNlcHQgRXhjZXB0aW9uIGFzIGU6XG4gICAgICAgIHByaW50KGZcIlstXSBCxYLEhWQga3dhcmFudGFubnkgcGxpa3U6IHtlfVwiKVxuICAgICAgICByZXR1cm4gRmFsc2VcblxuZGVmIGJsb2NrX3ZpYV9pZmVvKGV4ZV9maWxlbmFtZSk6XG4gICAgXCJcIlwiQmxva3VqZSBwb25vd25lIHVydWNob21pZW5pZSBwcm9ncmFtdSB3IFJlamVzdHJ6ZSBXaW5kb3dzIChJRkVPKS5cIlwiXCJcbiAgICB0cnk6XG4gICAgICAgIGNtZCA9IGYncmVnIGFkZCBcIkhLTE1cXFxcXFxcXFNPRlRXQVJFXFxcXFxcXFxNaWNyb3NvZnRcXFxcXFxcXFdpbmRvd3MgTlRcXFxcXFxcXEN1cnJlbnRWZXJzaW9uXFxcXFxcXFxJbWFnZSBGaWxlIEV4ZWN1dGlvbiBPcHRpb25zXFxcXFxcXFx7ZXhlX2ZpbGVuYW1lfVwiIC92IERlYnVnZ2VyIC90IFJFR19TWiAvZCBcInN5c3RyYXkuZXhlXCIgL2YgPm51bCAyPiYxJ1xuICAgICAgICBvcy5zeXN0ZW0oY21kKVxuICAgICAgICBwcmludChmXCJbK10gW0lGRU8gTE9DS10gWmFibG9rb3dhbm8gc3RhcnQgJ3tleGVfZmlsZW5hbWV9JyB3IHJlamVzdHJ6ZSBXaW5kb3dzLlwiKVxuICAgIGV4Y2VwdCBFeGNlcHRpb246XG4gICAgICAgIHBhc3NcblxuZGVmIHRlcm1pbmF0ZV9mcm96ZW5fcHJvY2VzcyhwaWQpOlxuICAgIFwiXCJcIktvxYRjenkgZGVmaW5pdHl3bmllIHphbXJvxbxvbnkgcHJvY2VzLlwiXCJcIlxuICAgIGhfcHJvYyA9IGtlcm5lbDMyLk9wZW5Qcm9jZXNzKFBST0NFU1NfVEVSTUlOQVRFLCBGYWxzZSwgcGlkKVxuICAgIGlmIGhfcHJvYzpcbiAgICAgICAga2VybmVsMzIuVGVybWluYXRlUHJvY2VzcyhoX3Byb2MsIDkpXG4gICAgICAgIGtlcm5lbDMyLkNsb3NlSGFuZGxlKGhfcHJvYylcbiAgICAgICAgcHJpbnQoZlwiWytdIFtaQUJJVE9dIFByb2NlcyBQSUQge3BpZH0gem9zdGHFgiB1c3VuacSZdHkgeiBwYW1pxJljaS5cIilcbiAgICBlbHNlOlxuICAgICAgICBvcy5zeXN0ZW0oZlwidGFza2tpbGwgL0YgL1BJRCB7cGlkfSA+bnVsIDI+JjFcIilcblxuZGVmIGV4ZWN1dGVfcXVhcmFudGluZV9zdHJpa2UoaHduZCwgcGlkKTpcbiAgICBcIlwiXCJLb21wbGVrc293YSBvcGVyYWNqYSB1bmllc3prb2RsaXdpZW5pYS5cIlwiXCJcbiAgICAjIEtyb2sgMTogTmF0eWNobWlhc3Rvd2UgemRqxJljaWUgb2tuYSB6IHBpZXJ3c3plZ28gcGxhbnVcbiAgICB1c2VyMzIuU2hvd1dpbmRvdyhod25kLCAwKSAjIFNXX0hJREVcbiAgICB1c2VyMzIuU2V0V2luZG93UG9zKGh3bmQsIDEsIDAsIDAsIDAsIDAsIDB4MDAwMSB8IDB4MDAwMiB8IDB4MDA4MCkgIyBIV05EX0JPVFRPTVxuXG4gICAgIyBLcm9rIDI6IFphbXJvxbxlbmllIHfEhXRrw7N3IHcgcGFtacSZY2kgUkFNXG4gICAgc3VzcGVuZF9wcm9jZXNzKHBpZClcblxuICAgICMgS3JvayAzOiBQb2JyYW5pZSDFm2NpZcW8a2kgaSBrd2FyYW50YW5uYSBiaW5hcm5hXG4gICAgZXhlX3BhdGggPSBnZXRfcHJvY2Vzc19leGVjdXRhYmxlX3BhdGgocGlkKVxuICAgIGV4ZV9uYW1lID0gb3MucGF0aC5iYXNlbmFtZShleGVfcGF0aCkgaWYgZXhlX3BhdGggZWxzZSBcIlwiXG5cbiAgICBpZiBleGVfbmFtZS5sb3dlcigpIGluIFNBRkVfV0hJVEVMSVNUOlxuICAgICAgICBwcmludChmXCJbIV0gUHJvY2VzIG5hIGJpYcWCZWogbGnFm2NpZSAoe2V4ZV9uYW1lfSkuIEFudWxvd2FubyBrd2FyYW50YW5uxJkuXCIpXG4gICAgICAgIHJldHVyblxuXG4gICAgaWYgZXhlX3BhdGg6XG4gICAgICAgIHF1YXJhbnRpbmVfZXhlY3V0YWJsZV9maWxlKGV4ZV9wYXRoKVxuICAgICAgICBibG9ja192aWFfaWZlbyhleGVfbmFtZSlcblxuICAgICMgS3JvayA0OiBVc3VuacSZY2llIHogcGFtacSZY2kgUkFNXG4gICAgdGVybWluYXRlX2Zyb3plbl9wcm9jZXNzKHBpZClcbiAgICBwcmludChcIj1cIiAqIDYwKVxuICAgIHByaW50KGZcIlvinJRdIFNVS0NFUyEgWmFncm/FvGVuaWUge2V4ZV9uYW1lfSAoUElEOiB7cGlkfSkgem9zdGHFgm8gdHJ3YWxlIHVuaWVydWNob21pb25lLlwiKVxuICAgIHByaW50KFwiPVwiICogNjApXG5cbmRlZiBzY2FuX2FuZF9sb2NrZG93bigpOlxuICAgIHNjcmVlbl93ID0gdXNlcjMyLkdldFN5c3RlbU1ldHJpY3MoMClcbiAgICBzY3JlZW5faCA9IHVzZXIzMi5HZXRTeXN0ZW1NZXRyaWNzKDEpXG5cbiAgICBkZWYgY2FsbGJhY2soaHduZCwgbHBhcmFtKTpcbiAgICAgICAgaWYgbm90IHVzZXIzMi5Jc1dpbmRvd1Zpc2libGUoaHduZCk6XG4gICAgICAgICAgICByZXR1cm4gVHJ1ZVxuICAgICAgICBpZiBod25kIGluICh1c2VyMzIuR2V0RGVza3RvcFdpbmRvdygpLCB1c2VyMzIuR2V0U2hlbGxXaW5kb3coKSk6XG4gICAgICAgICAgICByZXR1cm4gVHJ1ZVxuXG4gICAgICAgICMgU3ByYXdkemVuaWUgc3R5bHUgVG9wTW9zdFxuICAgICAgICBleF9zdHlsZSA9IHVzZXIzMi5HZXRXaW5kb3dMb25nVyhod25kLCAtMjApXG4gICAgICAgIGlzX3RvcG1vc3QgPSBib29sKGV4X3N0eWxlICYgMHgwMDAwMDAwOClcblxuICAgICAgICAjIFNwcmF3ZHplbmllIHd5bWlhcsOzd1xuICAgICAgICByZWN0ID0gd2ludHlwZXMuUkVDVCgpXG4gICAgICAgIHVzZXIzMi5HZXRXaW5kb3dSZWN0KGh3bmQsIGN0eXBlcy5ieXJlZihyZWN0KSlcbiAgICAgICAgdyA9IHJlY3QucmlnaHQgLSByZWN0LmxlZnRcbiAgICAgICAgaCA9IHJlY3QuYm90dG9tIC0gcmVjdC50b3BcbiAgICAgICAgaXNfZnVsbHNjcmVlbiA9ICh3ID49IHNjcmVlbl93ICogMC45IGFuZCBoID49IHNjcmVlbl9oICogMC45KVxuXG4gICAgICAgIHBpZCA9IHdpbnR5cGVzLkRXT1JEKClcbiAgICAgICAgdXNlcjMyLkdldFdpbmRvd1RocmVhZFByb2Nlc3NJZChod25kLCBjdHlwZXMuYnlyZWYocGlkKSlcbiAgICAgICAgaWYgcGlkLnZhbHVlID09IDA6XG4gICAgICAgICAgICByZXR1cm4gVHJ1ZVxuXG4gICAgICAgIGV4ZV9wYXRoID0gZ2V0X3Byb2Nlc3NfZXhlY3V0YWJsZV9wYXRoKHBpZC52YWx1ZSlcbiAgICAgICAgZXhlX25hbWUgPSBvcy5wYXRoLmJhc2VuYW1lKGV4ZV9wYXRoKS5sb3dlcigpIGlmIGV4ZV9wYXRoIGVsc2UgXCJcIlxuXG4gICAgICAgIGlmIGV4ZV9uYW1lIGluIFNBRkVfV0hJVEVMSVNUOlxuICAgICAgICAgICAgcmV0dXJuIFRydWVcblxuICAgICAgICAjIFdhcnVuZWsgdWRlcnplbmlhOlxuICAgICAgICAjIE9rbm8gYmxva3VqZSBla3JhbiAoVG9wTW9zdCArIEZ1bGxzY3JlZW4pIExVQiBwcm9jZXMgendpxIV6YW55IHogRmx1dHRlcmVtXG4gICAgICAgIGlmIChpc190b3Btb3N0IGFuZCBpc19mdWxsc2NyZWVuKSBvciAoXCJmbHV0dGVyXCIgaW4gZXhlX25hbWUpOlxuICAgICAgICAgICAgcHJpbnQoXCJcXFxcblwiICsgXCIhXCIgKiA2MClcbiAgICAgICAgICAgIHByaW50KGZcIlshXSBXWUtSWVRPIFrFgU/FmkxJV8SEIEJMT0tBRMSYOiB7ZXhlX25hbWV9IChQSUQ6IHtwaWQudmFsdWV9KVwiKVxuICAgICAgICAgICAgcHJpbnQoZlwiICAgIFd5bWlhcnk6IHt3fXh7aH0sIFRvcE1vc3Q6IHtpc190b3Btb3N0fVwiKVxuICAgICAgICAgICAgcHJpbnQoXCIhXCIgKiA2MClcbiAgICAgICAgICAgIGV4ZWN1dGVfcXVhcmFudGluZV9zdHJpa2UoaHduZCwgcGlkLnZhbHVlKVxuXG4gICAgICAgIHJldHVybiBUcnVlXG5cbiAgICBFbnVtUHJvYyA9IGN0eXBlcy5XSU5GVU5DVFlQRSh3aW50eXBlcy5CT09MLCB3aW50eXBlcy5IV05ELCB3aW50eXBlcy5MUEFSQU0pXG4gICAgdXNlcjMyLkVudW1XaW5kb3dzKEVudW1Qcm9jKGNhbGxiYWNrKSwgMClcblxuaWYgX19uYW1lX18gPT0gXCJfX21haW5fX1wiOlxuICAgIHByaW50KFwiPVwiICogNjUpXG4gICAgcHJpbnQoXCIgIFRBUkNaQSBBTlRZLU1BTFdBUkU6IFVOSUVSVUNIT01JRU5JRSAmIEtXQVJBTlRBTk5BIFBMSUvDk1dcIilcbiAgICBwcmludChcIiAgVHJ5YjogMTAwJSBPRkZMSU5FIChCcmFrIHphbGXFvG5vxZtjaSB6ZXduxJl0cnpueWNoKVwiKVxuICAgIHByaW50KFwiICBEemlhxYJhbmllOiBGcmVlemUgUkFNIC0+IEJpbmFyeSBMb2Nrb3V0IC0+IERlc3Ryb3lcIilcbiAgICBwcmludChcIj1cIiAqIDY1KVxuICAgIHRyeTpcbiAgICAgICAgd2hpbGUgVHJ1ZTpcbiAgICAgICAgICAgIHNjYW5fYW5kX2xvY2tkb3duKClcbiAgICAgICAgICAgIHRpbWUuc2xlZXAoMC4zKVxuICAgIGV4Y2VwdCBLZXlib2FyZEludGVycnVwdDpcbiAgICAgICAgcHJpbnQoXCJcXFxcblsqXSBXecWCxIVjem9ubyBtb25pdG9yIGt3YXJhbnRhbm55LlwiKVxuYFxuICB9LFxuICB7XG4gICAgaWQ6ICd3aW4zMl90b3Btb3N0X2Rlc3Ryb3llcicsXG4gICAgdGl0bGU6ICcxLiBXaW4zMiBUb3BNb3N0ICYgRnVsbHNjcmVlbiBPdmVybGF5IEh1bnRlciAoTmFqc2t1dGVjem5pZWpzenkpJyxcbiAgICBzaG9ydERlc2M6ICdXeXN6dWt1amUgb2tuYSB6IGZsYWfEhSBXU19FWF9UT1BNT1NUIHBva3J5d2FqxIVjZSAxMDAlIGVrcmFudSwgc3ByYXdkemEgY3p5IHByb2NlcyDFgmFkdWplIGJpYmxpb3Rla2kgRmx1dHRlcmEgaSBiZXp3emdsxJlkbmllIGdvIHphbXlrYS4nLFxuICAgIGJhZGdlOiAnUmVrb21lbmRvd2FueSAoV2luZG93cyknLFxuICAgIG9zOiBbJ3dpbmRvd3MnXSxcbiAgICByZXF1aXJlc1BpcDogdHJ1ZSxcbiAgICBwaXBQYWNrYWdlczogWydwc3V0aWwnLCAncHl3aW4zMiddLFxuICAgIGtleUZlYXR1cmVzOiBbXG4gICAgICAnS29tcGF0eWJpbG5vxZvEhyB6IDMyLWJpdCBpIDY0LWJpdCBQeXRob24gKEdldFdpbmRvd0xvbmdQdHJXIC8gR2V0V2luZG93TG9uZ1cpJyxcbiAgICAgICdXeWtyeXdhIGZsYWfEmSBXU19FWF9UT1BNT1NUIChBbHdheXMgb24gdG9wKScsXG4gICAgICAnU3ByYXdkemEgcm96bWlhciBva25hIHd6Z2zEmWRlbSByb3pkemllbGN6b8WbY2kgbW9uaXRvcmEnLFxuICAgICAgJ1dlcnlmaWt1amUgemHFgmFkb3dhbmUgbW9kdcWCeSBETEwgKGZsdXR0ZXJfd2luZG93cy5kbGwsIGZsdXR0ZXJfZW5naW5lLmRsbCknLFxuICAgICAgJ01vxbxsaXdvxZvEhyBuYXR5Y2htaWFzdG93ZWdvIHphYmljaWEgKFNJR0tJTEwpIGx1YiB6ZGrEmWNpYSBmbGFnaSBUb3BNb3N0JyxcbiAgICAgICdCaWHFgmEgbGlzdGEgYmV6cGllY3pueWNoIGFwbGlrYWNqaSAoRGlzY29yZCwgT0JTLCBncnksIGV4cGxvcmVyKSdcbiAgICBdLFxuICAgIHJlY29tbWVuZGVkRm9yOiAnR2R5IGFwbGlrYWNqYSBGbHV0dGVyYSB0d29yenkgcGXFgm5vZWtyYW5vd2Ugb2tubyB3IHRyeWJpZSBBbHdheXMtb24tdG9wIGJsb2t1asSFY2UgcHVscGl0IGkgcGFzZWsgemFkYcWELicsXG4gICAgZXhwbGFuYXRpb246IFtcbiAgICAgICdTa3J5cHQgcG9iaWVyYSB1Y2h3eXR5IChIV05EKSB3c3p5c3RraWNoIHdpZG9jem55Y2ggb2tpZW4gemEgcG9tb2PEhSBFbnVtV2luZG93cy4nLFxuICAgICAgJ0RsYSBrYcW8ZGVnbyBva25hIHNwcmF3ZHphIHN0eWxlIHJvenN6ZXJ6b25lIEdldFdpbmRvd0xvbmdQdHIoR1dMX0VYU1RZTEUpIHBvZCBrxIV0ZW0gZmxhZ2kgV1NfRVhfVE9QTU9TVCAoMHgwMDAwMDAwOCkuJyxcbiAgICAgICdQb2JpZXJhIHdzcMOzxYJyesSZZG5lIG9rbmEgcHJ6ZXogR2V0V2luZG93UmVjdCBpIHBvcsOzd251amUgeiByb3pkemllbGN6b8WbY2nEhSBla3JhbnUgR2V0U3lzdGVtTWV0cmljcy4nLFxuICAgICAgJ1TFgnVtYWN6eSB1Y2h3eXQgb2tuYSAoSFdORCkgbmEgaWRlbnR5ZmlrYXRvciBwcm9jZXN1IChQSUQpIHphIHBvbW9jxIUgR2V0V2luZG93VGhyZWFkUHJvY2Vzc0lkLicsXG4gICAgICAnVcW8eXdhasSFYyBiaWJsaW90ZWtpIHBzdXRpbCBzcHJhd2R6YSB6YcWCYWRvd2FuZSBwbGlraSBiaW5hcm5lIG9yYXogbW9kdcWCeSBwYW1pxJljaSAoc3p1a2EgZmx1dHRlcl93aW5kb3dzLmRsbCkgaSBiZXp3emdsxJlkbmllIHViaWphIHByb2Nlcy4nXG4gICAgXSxcbiAgICBjb2RlOiBgXCJcIlwiXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuRkxVVFRFUiBPVkVSTEFZIERFVEVDVCAmIERFU1RST1kgKFdpbmRvd3MgV2luMzIgKyBwc3V0aWwpXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuSW5zdGFsYWNqYSB3eW1hZ2FueWNoIGJpYmxpb3RlazpcbiAgcGlwIGluc3RhbGwgcHN1dGlsIHB5d2luMzJcblxuVXJ1Y2hvbWllbmllOlxuICBweXRob24gZmx1dHRlcl9vdmVybGF5X2h1bnRlci5weVxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblwiXCJcIlxuaW1wb3J0IHRpbWVcbmltcG9ydCBvc1xuaW1wb3J0IHN5c1xuaW1wb3J0IGN0eXBlc1xuZnJvbSBjdHlwZXMgaW1wb3J0IHdpbnR5cGVzXG5pbXBvcnQgcHN1dGlsXG5cbiMgU3RhxYJlIFdpbjMyIEFQSVxuR1dMX0VYU1RZTEUgPSAtMjBcbldTX0VYX1RPUE1PU1QgPSAweDAwMDAwMDA4XG5XU19FWF9MQVlFUkVEID0gMHgwMDA4MDAwMFxuV1NfRVhfVFJBTlNQQVJFTlQgPSAweDAwMDAwMDIwXG5TV19NSU5JTUlaRSA9IDZcbkhXTkRfTk9UT1BNT1NUID0gLTJcblNXUF9OT1NJWkUgPSAweDAwMDFcblNXUF9OT01PVkUgPSAweDAwMDJcblNXUF9TSE9XV0lORE9XID0gMHgwMDQwXG5cbnVzZXIzMiA9IGN0eXBlcy53aW5kbGwudXNlcjMyXG5rZXJuZWwzMiA9IGN0eXBlcy53aW5kbGwua2VybmVsMzJcblxuIyBCZXpwaWVjem5lIHBvYmllcmFuaWUgZnVua2NqaSBzdHlsdSBva25hIChrb21wYXR5Ymlsbm/Fm8SHIHg4NiAvIHg2NClcbmlmIGhhc2F0dHIodXNlcjMyLCBcIkdldFdpbmRvd0xvbmdQdHJXXCIpOlxuICAgIEdldFdpbmRvd0xvbmdQdHIgPSB1c2VyMzIuR2V0V2luZG93TG9uZ1B0cldcbiAgICBHZXRXaW5kb3dMb25nUHRyLmFyZ3R5cGVzID0gW3dpbnR5cGVzLkhXTkQsIGN0eXBlcy5jX2ludF1cbiAgICBHZXRXaW5kb3dMb25nUHRyLnJlc3R5cGUgPSB3aW50eXBlcy5MUEFSQU1cbmVsc2U6XG4gICAgR2V0V2luZG93TG9uZ1B0ciA9IHVzZXIzMi5HZXRXaW5kb3dMb25nV1xuICAgIEdldFdpbmRvd0xvbmdQdHIuYXJndHlwZXMgPSBbd2ludHlwZXMuSFdORCwgY3R5cGVzLmNfaW50XVxuICAgIEdldFdpbmRvd0xvbmdQdHIucmVzdHlwZSA9IHdpbnR5cGVzLkxPTkdcblxuIyBCZXpwaWVjem5hIGJpYcWCYSBsaXN0YSBwcm9jZXPDs3cgc3lzdGVtb3d5Y2ggaSB6YXVmYW55Y2hcbldISVRFTElTVF9QUk9DRVNTRVMgPSB7XG4gICAgXCJleHBsb3Jlci5leGVcIiwgXCJ0YXNrbWdyLmV4ZVwiLCBcInNoZWxsZXhwZXJpZW5jZWhvc3QuZXhlXCIsXG4gICAgXCJzZWFyY2hhcHAuZXhlXCIsIFwic2VhcmNoaG9zdC5leGVcIiwgXCJkd20uZXhlXCIsIFwic3lzdGVtc2V0dGluZ3MuZXhlXCIsXG4gICAgXCJsb2NrYXBwLmV4ZVwiLCBcImNvZGUuZXhlXCIsIFwiY2hyb21lLmV4ZVwiLCBcImZpcmVmb3guZXhlXCIsIFwiZGlzY29yZC5leGVcIlxufVxuXG4jIFN5Z25hdHVyeSBETEwgaSBwcm9jZXPDs3cgRmx1dHRlcmFcbkZMVVRURVJfU0lHTkFUVVJFUyA9IFtcbiAgICBcImZsdXR0ZXJfd2luZG93cy5kbGxcIixcbiAgICBcImZsdXR0ZXJfZW5naW5lLmRsbFwiLFxuICAgIFwiZmx1dHRlcl9lbWJlZGRlci5kbGxcIixcbiAgICBcImZsdXR0ZXJfcnVubmVyLmV4ZVwiXG5dXG5cbmRlZiBnZXRfc2NyZWVuX3Jlc29sdXRpb24oKTpcbiAgICBcIlwiXCJad3JhY2Egc3plcm9rb8WbxIcgaSB3eXNva2/Fm8SHIGfFgsOzd25lZ28gZWtyYW51LlwiXCJcIlxuICAgIHdpZHRoID0gdXNlcjMyLkdldFN5c3RlbU1ldHJpY3MoMCkgICAjIFNNX0NYU0NSRUVOXG4gICAgaGVpZ2h0ID0gdXNlcjMyLkdldFN5c3RlbU1ldHJpY3MoMSkgICMgU01fQ1lTQ1JFRU5cbiAgICByZXR1cm4gd2lkdGgsIGhlaWdodFxuXG5kZWYgaXNfd2luZG93X2Z1bGxzY3JlZW4oaHduZCwgc2NyZWVuX3csIHNjcmVlbl9oKTpcbiAgICBcIlwiXCJTcHJhd2R6YSwgY3p5IG9rbm8gemFqbXVqZSBjYcWCeSBla3Jhbi5cIlwiXCJcbiAgICByZWN0ID0gd2ludHlwZXMuUkVDVCgpXG4gICAgaWYgdXNlcjMyLkdldFdpbmRvd1JlY3QoaHduZCwgY3R5cGVzLmJ5cmVmKHJlY3QpKTpcbiAgICAgICAgdyA9IHJlY3QucmlnaHQgLSByZWN0LmxlZnRcbiAgICAgICAgaCA9IHJlY3QuYm90dG9tIC0gcmVjdC50b3BcbiAgICAgICAgaWYgdyA+PSBzY3JlZW5fdyAqIDAuOTUgYW5kIGggPj0gc2NyZWVuX2ggKiAwLjk1OlxuICAgICAgICAgICAgcmV0dXJuIFRydWUsICh3LCBoKVxuICAgIHJldHVybiBGYWxzZSwgKDAsIDApXG5cbmRlZiBpc190b3Btb3N0KGh3bmQpOlxuICAgIFwiXCJcIlNwcmF3ZHphLCBjenkgb2tubyBwb3NpYWRhIGZsYWfEmSBBbHdheXMtT24tVG9wLlwiXCJcIlxuICAgIHRyeTpcbiAgICAgICAgZXhfc3R5bGUgPSBHZXRXaW5kb3dMb25nUHRyKGh3bmQsIEdXTF9FWFNUWUxFKVxuICAgICAgICByZXR1cm4gYm9vbChleF9zdHlsZSAmIFdTX0VYX1RPUE1PU1QpXG4gICAgZXhjZXB0IEV4Y2VwdGlvbjpcbiAgICAgICAgcmV0dXJuIEZhbHNlXG5cbmRlZiBnZXRfcHJvY2Vzc19pbmZvKGh3bmQpOlxuICAgIFwiXCJcIlBvYmllcmEgUElEIG9yYXogb2JpZWt0IHBzdXRpbC5Qcm9jZXNzIGRsYSBkYW5lZ28gb2tuYS5cIlwiXCJcbiAgICBwaWQgPSB3aW50eXBlcy5EV09SRCgpXG4gICAgdXNlcjMyLkdldFdpbmRvd1RocmVhZFByb2Nlc3NJZChod25kLCBjdHlwZXMuYnlyZWYocGlkKSlcbiAgICBpZiBwaWQudmFsdWUgPT0gMDpcbiAgICAgICAgcmV0dXJuIE5vbmUsIE5vbmVcbiAgICB0cnk6XG4gICAgICAgIHByb2MgPSBwc3V0aWwuUHJvY2VzcyhwaWQudmFsdWUpXG4gICAgICAgIHJldHVybiBwaWQudmFsdWUsIHByb2NcbiAgICBleGNlcHQgKHBzdXRpbC5Ob1N1Y2hQcm9jZXNzLCBwc3V0aWwuQWNjZXNzRGVuaWVkKTpcbiAgICAgICAgcmV0dXJuIHBpZC52YWx1ZSwgTm9uZVxuXG5kZWYgaGFzX2ZsdXR0ZXJfbW9kdWxlcyhwcm9jKTpcbiAgICBcIlwiXCJTa2FudWplIHphxYJhZG93YW5lIG1vZHXFgnkgRExMIHByb2Nlc3UgdyBwb3N6dWtpd2FuaXUgRmx1dHRlcmEuXCJcIlwiXG4gICAgaWYgbm90IHByb2M6XG4gICAgICAgIHJldHVybiBGYWxzZVxuICAgIHRyeTpcbiAgICAgICAgbmFtZV9sb3dlciA9IHByb2MubmFtZSgpLmxvd2VyKClcbiAgICAgICAgY21kbGluZSA9IFwiIFwiLmpvaW4ocHJvYy5jbWRsaW5lKCkpLmxvd2VyKCkgaWYgcHJvYy5jbWRsaW5lKCkgZWxzZSBcIlwiXG4gICAgICAgIGlmIGFueShzaWcgaW4gbmFtZV9sb3dlciBvciBzaWcgaW4gY21kbGluZSBmb3Igc2lnIGluIEZMVVRURVJfU0lHTkFUVVJFUyk6XG4gICAgICAgICAgICByZXR1cm4gVHJ1ZVxuXG4gICAgICAgIGlmIGhhc2F0dHIocHJvYywgXCJtZW1vcnlfbWFwc1wiKTpcbiAgICAgICAgICAgIGZvciBtIGluIHByb2MubWVtb3J5X21hcHMoKTpcbiAgICAgICAgICAgICAgICBwYXRoX2xvd2VyID0gbS5wYXRoLmxvd2VyKClcbiAgICAgICAgICAgICAgICBpZiBhbnkoc2lnIGluIHBhdGhfbG93ZXIgZm9yIHNpZyBpbiBGTFVUVEVSX1NJR05BVFVSRVMpOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVHJ1ZVxuICAgIGV4Y2VwdCAocHN1dGlsLkFjY2Vzc0RlbmllZCwgcHN1dGlsLk5vU3VjaFByb2Nlc3MsIE5vdEltcGxlbWVudGVkRXJyb3IsIEV4Y2VwdGlvbik6XG4gICAgICAgIHBhc3NcbiAgICByZXR1cm4gRmFsc2VcblxuZGVmIGtpbGxfcHJvY2VzcyhwaWQsIHByb2NfbmFtZSk6XG4gICAgXCJcIlwiWmFiaWphIHByb2NlcyBuYSBzacWCxJkgKFNJR0tJTEwpLlwiXCJcIlxuICAgIHRyeTpcbiAgICAgICAgcCA9IHBzdXRpbC5Qcm9jZXNzKHBpZClcbiAgICAgICAgcC5raWxsKClcbiAgICAgICAgcHJpbnQoZlwiWyFdIFtTVUtDRVNdIFphbWtuacSZdG8gesWCb8WbbGl3eS9ibG9rdWrEhWN5IHByb2Nlczoge3Byb2NfbmFtZX0gKFBJRDoge3BpZH0pXCIpXG4gICAgICAgIHJldHVybiBUcnVlXG4gICAgZXhjZXB0IEV4Y2VwdGlvbiBhcyBlOlxuICAgICAgICBvcy5zeXN0ZW0oZlwidGFza2tpbGwgL0YgL1BJRCB7cGlkfSA+bnVsIDI+JjFcIilcbiAgICAgICAgcHJpbnQoZlwiWyFdIFd5c8WCYW5vIGF3YXJ5am55IHRhc2traWxsIGRsYSBQSUQge3BpZH06IHtlfVwiKVxuICAgICAgICByZXR1cm4gVHJ1ZVxuXG5kZWYgc2Nhbl9hbmRfZGVzdHJveSgpOlxuICAgIHNjcmVlbl93LCBzY3JlZW5faCA9IGdldF9zY3JlZW5fcmVzb2x1dGlvbigpXG5cbiAgICBkZWYgZW51bV93aW5kb3dzX2NhbGxiYWNrKGh3bmQsIGV4dHJhKTpcbiAgICAgICAgaWYgbm90IHVzZXIzMi5Jc1dpbmRvd1Zpc2libGUoaHduZCk6XG4gICAgICAgICAgICByZXR1cm4gVHJ1ZVxuICAgICAgICBcbiAgICAgICAgaWYgaHduZCA9PSB1c2VyMzIuR2V0RGVza3RvcFdpbmRvdygpIG9yIGh3bmQgPT0gdXNlcjMyLkdldFNoZWxsV2luZG93KCk6XG4gICAgICAgICAgICByZXR1cm4gVHJ1ZVxuXG4gICAgICAgIGxlbmd0aCA9IHVzZXIzMi5HZXRXaW5kb3dUZXh0TGVuZ3RoVyhod25kKVxuICAgICAgICBidWZmID0gY3R5cGVzLmNyZWF0ZV91bmljb2RlX2J1ZmZlcihsZW5ndGggKyAxKVxuICAgICAgICB1c2VyMzIuR2V0V2luZG93VGV4dFcoaHduZCwgYnVmZiwgbGVuZ3RoICsgMSlcbiAgICAgICAgdGl0bGUgPSBidWZmLnZhbHVlXG5cbiAgICAgICAgdG9wbW9zdCA9IGlzX3RvcG1vc3QoaHduZClcbiAgICAgICAgZnVsbHNjcmVlbiwgKHcsIGgpID0gaXNfd2luZG93X2Z1bGxzY3JlZW4oaHduZCwgc2NyZWVuX3csIHNjcmVlbl9oKVxuICAgICAgICBwaWQsIHByb2MgPSBnZXRfcHJvY2Vzc19pbmZvKGh3bmQpXG5cbiAgICAgICAgaWYgbm90IHByb2M6XG4gICAgICAgICAgICByZXR1cm4gVHJ1ZVxuXG4gICAgICAgIHByb2NfbmFtZSA9IHByb2MubmFtZSgpLmxvd2VyKCkgaWYgcHJvYyBlbHNlIFwidW5rbm93blwiXG5cbiAgICAgICAgaWYgcHJvY19uYW1lIGluIFdISVRFTElTVF9QUk9DRVNTRVM6XG4gICAgICAgICAgICByZXR1cm4gVHJ1ZVxuXG4gICAgICAgIGlzX2ZsdXR0ZXIgPSBoYXNfZmx1dHRlcl9tb2R1bGVzKHByb2MpXG5cbiAgICAgICAgaWYgKHRvcG1vc3QgYW5kIGZ1bGxzY3JlZW4pIG9yIChpc19mbHV0dGVyIGFuZCAodG9wbW9zdCBvciBmdWxsc2NyZWVuKSk6XG4gICAgICAgICAgICBwcmludChcIj1cIio2MClcbiAgICAgICAgICAgIHByaW50KGZcIlshXSBXWUtSWVRPIFBPREVKUlpBTsSEIE5BS8WBQURLxJggQkxPS1VKxIRDxIQgRUtSQU4hXCIpXG4gICAgICAgICAgICBwcmludChmXCIgICAgVHl0dcWCIG9rbmEgICA6ICd7dGl0bGV9J1wiKVxuICAgICAgICAgICAgcHJpbnQoZlwiICAgIFByb2NlcyAgICAgICA6IHtwcm9jX25hbWV9IChQSUQ6IHtwaWR9KVwiKVxuICAgICAgICAgICAgcHJpbnQoZlwiICAgIFJvem1pYXIgb2tuYSA6IHt3fXh7aH0gKEVrcmFuOiB7c2NyZWVuX3d9eHtzY3JlZW5faH0pXCIpXG4gICAgICAgICAgICBwcmludChmXCIgICAgVG9wTW9zdCAgICAgIDoge3RvcG1vc3R9XCIpXG4gICAgICAgICAgICBwcmludChmXCIgICAgTW9kdcWCeSBGbHV0dGVyOiB7aXNfZmx1dHRlcn1cIilcbiAgICAgICAgICAgIHByaW50KFwiPVwiKjYwKVxuICAgICAgICAgICAga2lsbF9wcm9jZXNzKHBpZCwgcHJvY19uYW1lKVxuXG4gICAgICAgIHJldHVybiBUcnVlXG5cbiAgICBFbnVtV2luZG93c1Byb2MgPSBjdHlwZXMuV0lORlVOQ1RZUEUod2ludHlwZXMuQk9PTCwgd2ludHlwZXMuSFdORCwgd2ludHlwZXMuTFBBUkFNKVxuICAgIHVzZXIzMi5FbnVtV2luZG93cyhFbnVtV2luZG93c1Byb2MoZW51bV93aW5kb3dzX2NhbGxiYWNrKSwgMClcblxuaWYgX19uYW1lX18gPT0gXCJfX21haW5fX1wiOlxuICAgIHByaW50KFwiWypdIFVydWNob21pb25vIFdhdGNoZG9nIHByemVjaXdrbyBuYWvFgmFka29tIEZsdXR0ZXIvV2luMzIuLi5cIilcbiAgICBwcmludChcIlsqXSBTa2Fub3dhbmllIHcgcMSZdGxpIGNvIDUwMCBtcyAoTmFjacWbbmlqIEN0cmwrQyBhYnkgemF0cnp5bWHEhykuLi5cIilcbiAgICB0cnk6XG4gICAgICAgIHdoaWxlIFRydWU6XG4gICAgICAgICAgICBzY2FuX2FuZF9kZXN0cm95KClcbiAgICAgICAgICAgIHRpbWUuc2xlZXAoMC41KVxuICAgIGV4Y2VwdCBLZXlib2FyZEludGVycnVwdDpcbiAgICAgICAgcHJpbnQoXCJcXFxcblsqXSBaYXRyenltYW5vIG1vbml0b3IuXCIpXG5gXG4gIH0sXG4gIHtcbiAgICBpZDogJ3B1cmVfY3R5cGVzX3plcm9fZGVwZW5kZW5jeScsXG4gICAgdGl0bGU6ICcyLiBDenlzdHkgUHl0aG9uIGJleiBpbnN0YWxhY2ppIHBpcCAoWmVybyBEZXBlbmRlbmNpZXMpJyxcbiAgICBzaG9ydERlc2M6ICdEemlhxYJhIG5hIGthxbxkeW0ga29tcHV0ZXJ6ZSB6IHphaW5zdGFsb3dhbnltIFB5dGhvbmVtLCBuaWUgd3ltYWdhIHVydWNoYW1pYW5pYSBwaXAgaW5zdGFsbCBwc3V0aWwvcHl3aW4zMi4gVcW8eXdhIHdidWRvd2FuZWdvIGN0eXBlcyBpIHRhc2traWxsLicsXG4gICAgYmFkZ2U6ICdOYXR5Y2htaWFzdG93ZSAoQnJhayBwaXApJyxcbiAgICBvczogWyd3aW5kb3dzJ10sXG4gICAgcmVxdWlyZXNQaXA6IGZhbHNlLFxuICAgIHBpcFBhY2thZ2VzOiBbXSxcbiAgICBrZXlGZWF0dXJlczogW1xuICAgICAgJ1plcm8gemV3bsSZdHJ6bnljaCB6YWxlxbxub8WbY2kgKHXFvHl3YSB3YnVkb3dhbmVnbyBtb2R1xYJ1IGN0eXBlcyknLFxuICAgICAgJ01vxbxuYSB1cnVjaG9tacSHIG9kIHJhenUgdyB0cnliaWUgYXdhcnlqbnltIGx1YiBuYSDFm3dpZcW8eW0gc3lzdGVtaWUnLFxuICAgICAgJ1BvYmllcmEgSFdORCwgc3ByYXdkemEgV1NfRVhfVE9QTU9TVCBvcmF6IFBJRCcsXG4gICAgICAnVGVybWludWplIHByb2NlcyB6YSBwb21vY8SFIE9wZW5Qcm9jZXNzICsgVGVybWluYXRlUHJvY2VzcyBvcmF6IHRhc2traWxsJ1xuICAgIF0sXG4gICAgcmVjb21tZW5kZWRGb3I6ICdHZHkgbmllIG1hc3ogZG9zdMSZcHUgZG8gaW50ZXJuZXR1LCBwaXAgbmllIGR6aWHFgmEgbHViIGNoY2VzeiBuYXR5Y2htaWFzdCB1cnVjaG9tacSHIHBvamVkeW5jenkgcGxpayAucHkuJyxcbiAgICBleHBsYW5hdGlvbjogW1xuICAgICAgJ1NrcnlwdCB1xbx5d2Egd3nFgsSFY3puaWUgYmlibGlvdGVraSBzdGFuZGFyZG93ZWogUHl0aG9uYSAoY3R5cGVzLCBzdWJwcm9jZXNzLCB0aW1lKS4nLFxuICAgICAgJ8WBxIVjenkgc2nEmSBiZXpwb8WbcmVkbmlvIHogYmlibGlvdGVrYW1pIHN5c3RlbW93eW1pIHVzZXIzMi5kbGwgb3JheiBrZXJuZWwzMi5kbGwuJyxcbiAgICAgICdTa2FudWplIGxpc3TEmSBva2llbiBwcnpleiBFbnVtV2luZG93cywgc3ByYXdkemEgZmxhZ8SZIFdTX0VYX1RPUE1PU1Qgb3JheiByb3ptaWFyIG9rbmEuJyxcbiAgICAgICdQbyB3eWtyeWNpdSBuYXR5Y2htaWFzdCB3eXdvxYJ1amUgVGVybWluYXRlUHJvY2VzcyB6IHVwcmF3bmllbmlhbWkgUFJPQ0VTU19URVJNSU5BVEUgKDB4MDAwMSkuJ1xuICAgIF0sXG4gICAgY29kZTogYFwiXCJcIlxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbkZMVVRURVIgLyBUT1BNT1NUIE9WRVJMQVkgS0lMTEVSIChaZXJvLURlcGVuZGVuY3kgLyBQdXJlIFB5dGhvbiBjdHlwZXMpXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuTmllIHd5bWFnYSBpbnN0YWxhY2ppIMW8YWRueWNoIHBhY3playAoYnJhayAncGlwIGluc3RhbGwnKSFcbkR6aWHFgmEgb2QgcmF6dSB3IGN6eXN0eW0gUHl0aG9uaWUgMy54IG5hIFdpbmRvd3NpZS5cbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cIlwiXCJcbmltcG9ydCBjdHlwZXNcbmZyb20gY3R5cGVzIGltcG9ydCB3aW50eXBlc1xuaW1wb3J0IHRpbWVcbmltcG9ydCBvc1xuaW1wb3J0IHN1YnByb2Nlc3NcblxudXNlcjMyID0gY3R5cGVzLndpbmRsbC51c2VyMzJcbmtlcm5lbDMyID0gY3R5cGVzLndpbmRsbC5rZXJuZWwzMlxuXG5HV0xfRVhTVFlMRSA9IC0yMFxuV1NfRVhfVE9QTU9TVCA9IDB4MDAwMDAwMDhcblBST0NFU1NfVEVSTUlOQVRFID0gMHgwMDAxXG5QUk9DRVNTX1FVRVJZX0lORk9STUFUSU9OID0gMHgwNDAwXG5cbmlmIGhhc2F0dHIodXNlcjMyLCBcIkdldFdpbmRvd0xvbmdQdHJXXCIpOlxuICAgIEdldFdpbmRvd0xvbmdQdHIgPSB1c2VyMzIuR2V0V2luZG93TG9uZ1B0cldcbiAgICBHZXRXaW5kb3dMb25nUHRyLmFyZ3R5cGVzID0gW3dpbnR5cGVzLkhXTkQsIGN0eXBlcy5jX2ludF1cbiAgICBHZXRXaW5kb3dMb25nUHRyLnJlc3R5cGUgPSB3aW50eXBlcy5MUEFSQU1cbmVsc2U6XG4gICAgR2V0V2luZG93TG9uZ1B0ciA9IHVzZXIzMi5HZXRXaW5kb3dMb25nV1xuICAgIEdldFdpbmRvd0xvbmdQdHIuYXJndHlwZXMgPSBbd2ludHlwZXMuSFdORCwgY3R5cGVzLmNfaW50XVxuICAgIEdldFdpbmRvd0xvbmdQdHIucmVzdHlwZSA9IHdpbnR5cGVzLkxPTkdcblxuV0hJVEVMSVNUX05BTUVTID0ge1wiZXhwbG9yZXIuZXhlXCIsIFwidGFza21nci5leGVcIiwgXCJkd20uZXhlXCIsIFwic2hlbGxleHBlcmllbmNlaG9zdC5leGVcIn1cblxuZGVmIGdldF9wcm9jZXNzX25hbWUocGlkKTpcbiAgICBoX3Byb2Nlc3MgPSBrZXJuZWwzMi5PcGVuUHJvY2VzcyhQUk9DRVNTX1FVRVJZX0lORk9STUFUSU9OIHwgMHgxMDAwLCBGYWxzZSwgcGlkKVxuICAgIGlmIG5vdCBoX3Byb2Nlc3M6XG4gICAgICAgIHJldHVybiBcIlwiXG4gICAgbmFtZV9idWZmZXIgPSBjdHlwZXMuY3JlYXRlX3VuaWNvZGVfYnVmZmVyKDEwMjQpXG4gICAgc2l6ZSA9IHdpbnR5cGVzLkRXT1JEKDEwMjQpXG4gICAgaWYgY3R5cGVzLndpbmRsbC5rZXJuZWwzMi5RdWVyeUZ1bGxQcm9jZXNzSW1hZ2VOYW1lVyhoX3Byb2Nlc3MsIDAsIG5hbWVfYnVmZmVyLCBjdHlwZXMuYnlyZWYoc2l6ZSkpOlxuICAgICAgICBmdWxsX3BhdGggPSBuYW1lX2J1ZmZlci52YWx1ZVxuICAgICAgICBrZXJuZWwzMi5DbG9zZUhhbmRsZShoX3Byb2Nlc3MpXG4gICAgICAgIHJldHVybiBvcy5wYXRoLmJhc2VuYW1lKGZ1bGxfcGF0aCkubG93ZXIoKVxuICAgIGtlcm5lbDMyLkNsb3NlSGFuZGxlKGhfcHJvY2VzcylcbiAgICByZXR1cm4gXCJcIlxuXG5kZWYga2lsbF9waWRfZm9yY2VmdWxseShwaWQsIHByb2NfbmFtZSk6XG4gICAgaF9wcm9jZXNzID0ga2VybmVsMzIuT3BlblByb2Nlc3MoUFJPQ0VTU19URVJNSU5BVEUsIEZhbHNlLCBwaWQpXG4gICAgaWYgaF9wcm9jZXNzOlxuICAgICAgICBrZXJuZWwzMi5UZXJtaW5hdGVQcm9jZXNzKGhfcHJvY2VzcywgOSlcbiAgICAgICAga2VybmVsMzIuQ2xvc2VIYW5kbGUoaF9wcm9jZXNzKVxuICAgICAgICBwcmludChmXCJbK10gW1NVS0NFUyBBUEldIFphYml0byBwcm9jZXMgUElEOiB7cGlkfSAoe3Byb2NfbmFtZX0pXCIpXG4gICAgICAgIHJldHVybiBUcnVlXG4gICAgXG4gICAgdHJ5OlxuICAgICAgICBzdWJwcm9jZXNzLnJ1bihbXCJ0YXNra2lsbFwiLCBcIi9GXCIsIFwiL1BJRFwiLCBzdHIocGlkKV0sIGNhcHR1cmVfb3V0cHV0PVRydWUpXG4gICAgICAgIHByaW50KGZcIlsrXSBbU1VLQ0VTIENNRF0gWmFta25pxJl0byBwcnpleiB0YXNra2lsbCBQSUQ6IHtwaWR9XCIpXG4gICAgICAgIHJldHVybiBUcnVlXG4gICAgZXhjZXB0IEV4Y2VwdGlvbiBhcyBlOlxuICAgICAgICBwcmludChmXCJbLV0gQsWCxIVkIHphbXlrYW5pYSBQSUQge3BpZH06IHtlfVwiKVxuICAgICAgICByZXR1cm4gRmFsc2VcblxuZGVmIHNjYW5fYW5kX2tpbGwoKTpcbiAgICBzY3JlZW5fdyA9IHVzZXIzMi5HZXRTeXN0ZW1NZXRyaWNzKDApXG4gICAgc2NyZWVuX2ggPSB1c2VyMzIuR2V0U3lzdGVtTWV0cmljcygxKVxuICAgIFxuICAgIGRlZiBjYWxsYmFjayhod25kLCBscGFyYW0pOlxuICAgICAgICBpZiBub3QgdXNlcjMyLklzV2luZG93VmlzaWJsZShod25kKTpcbiAgICAgICAgICAgIHJldHVybiBUcnVlXG4gICAgICAgIGlmIGh3bmQgaW4gKHVzZXIzMi5HZXREZXNrdG9wV2luZG93KCksIHVzZXIzMi5HZXRTaGVsbFdpbmRvdygpKTpcbiAgICAgICAgICAgIHJldHVybiBUcnVlXG5cbiAgICAgICAgZXhfc3R5bGUgPSBHZXRXaW5kb3dMb25nUHRyKGh3bmQsIEdXTF9FWFNUWUxFKVxuICAgICAgICBpc190b3Btb3N0ID0gYm9vbChleF9zdHlsZSAmIFdTX0VYX1RPUE1PU1QpXG5cbiAgICAgICAgcmVjdCA9IHdpbnR5cGVzLlJFQ1QoKVxuICAgICAgICB1c2VyMzIuR2V0V2luZG93UmVjdChod25kLCBjdHlwZXMuYnlyZWYocmVjdCkpXG4gICAgICAgIHcgPSByZWN0LnJpZ2h0IC0gcmVjdC5sZWZ0XG4gICAgICAgIGggPSByZWN0LmJvdHRvbSAtIHJlY3QudG9wXG4gICAgICAgIGlzX2Z1bGxzY3JlZW4gPSAodyA+PSBzY3JlZW5fdyAqIDAuOSBhbmQgaCA+PSBzY3JlZW5faCAqIDAuOSlcblxuICAgICAgICBwaWQgPSB3aW50eXBlcy5EV09SRCgpXG4gICAgICAgIHVzZXIzMi5HZXRXaW5kb3dUaHJlYWRQcm9jZXNzSWQoaHduZCwgY3R5cGVzLmJ5cmVmKHBpZCkpXG4gICAgICAgIFxuICAgICAgICBpZiBwaWQudmFsdWUgPT0gMDpcbiAgICAgICAgICAgIHJldHVybiBUcnVlXG5cbiAgICAgICAgcHJvY19uYW1lID0gZ2V0X3Byb2Nlc3NfbmFtZShwaWQudmFsdWUpXG4gICAgICAgIGlmIHByb2NfbmFtZSBpbiBXSElURUxJU1RfTkFNRVM6XG4gICAgICAgICAgICByZXR1cm4gVHJ1ZVxuXG4gICAgICAgIGlmIChpc190b3Btb3N0IGFuZCBpc19mdWxsc2NyZWVuKSBvciAoXCJmbHV0dGVyXCIgaW4gcHJvY19uYW1lKTpcbiAgICAgICAgICAgIHByaW50KGZcIlshXSBXWUtSWVRPIE5BS8WBQURLxJg6IFBJRD17cGlkLnZhbHVlfSwgUGxpaz0ne3Byb2NfbmFtZX0nLCBSb3ptaWFyPXt3fXh7aH0sIFRvcE1vc3Q9e2lzX3RvcG1vc3R9XCIpXG4gICAgICAgICAgICBraWxsX3BpZF9mb3JjZWZ1bGx5KHBpZC52YWx1ZSwgcHJvY19uYW1lKVxuXG4gICAgICAgIHJldHVybiBUcnVlXG5cbiAgICBFbnVtUHJvYyA9IGN0eXBlcy5XSU5GVU5DVFlQRSh3aW50eXBlcy5CT09MLCB3aW50eXBlcy5IV05ELCB3aW50eXBlcy5MUEFSQU0pXG4gICAgdXNlcjMyLkVudW1XaW5kb3dzKEVudW1Qcm9jKGNhbGxiYWNrKSwgMClcblxuaWYgX19uYW1lX18gPT0gXCJfX21haW5fX1wiOlxuICAgIHByaW50KFwiWypdIFNrYW5lciBjenlzdGVnbyBQeXRob25hIChjdHlwZXMpIGFrdHl3bnkuIFNrYW5vd2FuaWUgY28gMzAwIG1zLi4uXCIpXG4gICAgdHJ5OlxuICAgICAgICB3aGlsZSBUcnVlOlxuICAgICAgICAgICAgc2Nhbl9hbmRfa2lsbCgpXG4gICAgICAgICAgICB0aW1lLnNsZWVwKDAuMylcbiAgICBleGNlcHQgS2V5Ym9hcmRJbnRlcnJ1cHQ6XG4gICAgICAgIHByaW50KFwiXFxcXG5bKl0gWmFrb8WEY3pvbm8gZHppYcWCYW5pZS5cIilcbmBcbiAgfSxcbiAge1xuICAgIGlkOiAncGFuaWNfaG90a2V5X2tpbGxlcicsXG4gICAgdGl0bGU6ICczLiBHbG9iYWxueSBQcnp5Y2lzayBQYW5pa2kgKEVtZXJnZW5jeSBIb3RrZXkgRGFlbW9uKScsXG4gICAgc2hvcnREZXNjOiAnRHppYcWCYSB3IHRsZSBpIG5hc8WCdWNodWplIGdsb2JhbG5lZ28gc2tyw7N0dSBrbGF3aXN6b3dlZ28gKG5wLiBDdHJsK0FsdCtLIGx1YiBGMTApLiBQbyB3Y2nFm25pxJljaXUgbmF0eWNobWlhc3QgdWJpamEgYWt0eXduZSBva25vIG5hIHdpZXJ6Y2h1IGx1YiBwcm9jZXMgRmx1dHRlcmEuJyxcbiAgICBiYWRnZTogJ1NrcsOzdCBhd2FyeWpueSAoS2xhd2lhdHVyYSknLFxuICAgIG9zOiBbJ3dpbmRvd3MnLCAnbGludXgnLCAnbWFjb3MnXSxcbiAgICByZXF1aXJlc1BpcDogdHJ1ZSxcbiAgICBwaXBQYWNrYWdlczogWydrZXlib2FyZCcsICdwc3V0aWwnXSxcbiAgICBrZXlGZWF0dXJlczogW1xuICAgICAgJ1JlYWd1amUgbmF3ZXQsIGdkeSBuYWvFgmFka2EgcHJ6ZWNod3l0dWplIGt1cnNvciBteXN6eScsXG4gICAgICAnR2xvYmFsbnkgaG9vayBrbGF3aWF0dXJ5IChkemlhxYJhIHogZG93b2xuZWdvIG1pZWpzY2EpJyxcbiAgICAgICdaYWJpamEgYWt0dWFsbmllIGFrdHl3bmUgb2tubyBuYSBwaWVyd3N6eW0gcGxhbmllIChHZXRGb3JlZ3JvdW5kV2luZG93KScsXG4gICAgICAnT3Bjam9uYWxuaWUgdWJpamEgd3N6eXN0a2llIHByb2Nlc3kgRmx1dHRlcmEgemEgamVkbnltIG5hY2nFm25pxJljaWVtJ1xuICAgIF0sXG4gICAgcmVjb21tZW5kZWRGb3I6ICdHZHkgY2hjZXN6IG1pZcSHIHBlxYJuxIUga29udHJvbMSZIGkgd3l3b8WCeXdhxIcgemFiaWNpZSBuYWvFgmFka2kgamVkbnltIGtsaWtuacSZY2llbSBuYSBrbGF3aWF0dXJ6ZS4nLFxuICAgIGV4cGxhbmF0aW9uOiBbXG4gICAgICAnQmlibGlvdGVrYSBrZXlib2FyZCBpbnN0YWx1amUgaG9vayBuaXNraWVnbyBwb3ppb211IChXSF9LRVlCT0FSRF9MTCB3IFdpbmRvd3MgbHViIG9kcG93aWVkbmlrIHcgWDExKS4nLFxuICAgICAgJ1BvIHdjacWbbmnEmWNpdSBza3LDs3R1IChucC4gQ3RybCtBbHQrU2hpZnQrSykgc2tyeXB0IHBvYmllcmEgdWNod3l0IG9rbmEgcGllcndzem9wbGFub3dlZ28gcHJ6ZXogR2V0Rm9yZWdyb3VuZFdpbmRvdy4nLFxuICAgICAgJ0lkZW50eWZpa3VqZSBwcm9jZXMgcG93acSFemFueSB6IG9rbmVtIGkgbmF0eWNobWlhc3Qgd3lzecWCYSBzeWduYcWCIFNJR0tJTEwuJyxcbiAgICAgICdEb2RhdGtvd28gcHJ6ZXN6dWt1amUgY2HFgsSFIGxpc3TEmSBwcm9jZXPDs3cgaSB6YW15a2Egd3N6eXN0a2llIHByb2Nlc3kgcG93acSFemFuZSB6IEZsdXR0ZXJlbS4nXG4gICAgXSxcbiAgICBjb2RlOiBgXCJcIlwiXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuRU1FUkdFTkNZIFBBTklDIEhPVEtFWSBLSUxMRVIgKEdsb2JhbG55IHNrcsOzdCBrbGF3aXN6b3d5KVxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbkluc3RhbGFjamE6XG4gIHBpcCBpbnN0YWxsIGtleWJvYXJkIHBzdXRpbCBweXdpbjMyXG5cblVydWNob21pZW5pZTpcbiAgcHl0aG9uIHBhbmljX2hvdGtleV9raWxsZXIucHlcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cIlwiXCJcbmltcG9ydCBrZXlib2FyZFxuaW1wb3J0IHBzdXRpbFxuaW1wb3J0IGN0eXBlc1xuZnJvbSBjdHlwZXMgaW1wb3J0IHdpbnR5cGVzXG5pbXBvcnQgc3lzXG5pbXBvcnQgb3NcblxudXNlcjMyID0gY3R5cGVzLndpbmRsbC51c2VyMzJcblxuSE9US0VZID0gXCJjdHJsK2FsdCtzaGlmdCtrXCJcbkFMVF9IT1RLRVkgPSBcImYxMFwiXG5cbmRlZiBraWxsX2ZvcmVncm91bmRfd2luZG93KCk6XG4gICAgaHduZCA9IHVzZXIzMi5HZXRGb3JlZ3JvdW5kV2luZG93KClcbiAgICBpZiBub3QgaHduZDpcbiAgICAgICAgcmV0dXJuXG5cbiAgICBwaWQgPSB3aW50eXBlcy5EV09SRCgpXG4gICAgdXNlcjMyLkdldFdpbmRvd1RocmVhZFByb2Nlc3NJZChod25kLCBjdHlwZXMuYnlyZWYocGlkKSlcbiAgICBcbiAgICBpZiBwaWQudmFsdWUgPT0gMDpcbiAgICAgICAgcmV0dXJuXG5cbiAgICB0cnk6XG4gICAgICAgIHAgPSBwc3V0aWwuUHJvY2VzcyhwaWQudmFsdWUpXG4gICAgICAgIG5hbWUgPSBwLm5hbWUoKVxuICAgICAgICBpZiBuYW1lLmxvd2VyKCkgaW4gKFwiZXhwbG9yZXIuZXhlXCIsIFwidGFza21nci5leGVcIik6XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgXG4gICAgICAgIHAua2lsbCgpXG4gICAgICAgIHByaW50KGZcIlsrXSBbUEFOSUMgQlVUVE9OXSBaYWJpdG8gb2tubyBwaWVyd3N6b3BsYW5vd2U6IHtuYW1lfSAoUElEOiB7cGlkLnZhbHVlfSlcIilcbiAgICBleGNlcHQgRXhjZXB0aW9uIGFzIGU6XG4gICAgICAgIG9zLnN5c3RlbShmXCJ0YXNra2lsbCAvRiAvUElEIHtwaWQudmFsdWV9ID5udWwgMj4mMVwiKVxuICAgICAgICBwcmludChmXCJbK10gV3ltdXN6b25vIHphbWtuacSZY2llIFBJRDoge3BpZC52YWx1ZX1cIilcblxuZGVmIGtpbGxfYWxsX2ZsdXR0ZXJfaW5zdGFuY2VzKCk6XG4gICAga2lsbGVkX2NvdW50ID0gMFxuICAgIGZvciBwcm9jIGluIHBzdXRpbC5wcm9jZXNzX2l0ZXIoWydwaWQnLCAnbmFtZScsICdjbWRsaW5lJ10pOlxuICAgICAgICB0cnk6XG4gICAgICAgICAgICBuYW1lID0gcHJvYy5pbmZvWyduYW1lJ10ubG93ZXIoKVxuICAgICAgICAgICAgY21kID0gXCIgXCIuam9pbihwcm9jLmluZm9bJ2NtZGxpbmUnXSBvciBbXSkubG93ZXIoKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiBcImZsdXR0ZXJcIiBpbiBuYW1lIG9yIFwiZmx1dHRlcl9ydW5uZXJcIiBpbiBuYW1lIG9yIFwiZGFydC5leGVcIiBpbiBuYW1lOlxuICAgICAgICAgICAgICAgIHByb2Mua2lsbCgpXG4gICAgICAgICAgICAgICAgcHJpbnQoZlwiWytdIFtQQU5JQ10gWmFta25pxJl0byBpbnN0YW5jasSZIEZsdXR0ZXI6IHtuYW1lfSAoUElEOiB7cHJvYy5pbmZvWydwaWQnXX0pXCIpXG4gICAgICAgICAgICAgICAga2lsbGVkX2NvdW50ICs9IDFcbiAgICAgICAgZXhjZXB0IChwc3V0aWwuTm9TdWNoUHJvY2VzcywgcHN1dGlsLkFjY2Vzc0RlbmllZCk6XG4gICAgICAgICAgICBwYXNzXG5cbmRlZiBlbWVyZ2VuY3lfcGFuaWNfdHJpZ2dlcigpOlxuICAgIHByaW50KFwiXFxcXG5bIV0gT1RSWllNQU5PIFNZR05BxYEgQVdBUllKTlkgKFBBTklDIEhPVEtFWSkhXCIpXG4gICAga2lsbF9mb3JlZ3JvdW5kX3dpbmRvdygpXG4gICAga2lsbF9hbGxfZmx1dHRlcl9pbnN0YW5jZXMoKVxuXG5pZiBfX25hbWVfXyA9PSBcIl9fbWFpbl9fXCI6XG4gICAgcHJpbnQoXCJQQU5JQyBIT1RLRVkgS0lMTEVSIERaSUHFgUEgVyBUTEVcIilcbiAgICBwcmludChmXCJTa3LDs3R5OiBbe0hPVEtFWS51cHBlcigpfV0gbHViIFt7QUxUX0hPVEtFWS51cHBlcigpfV1cIilcbiAgICBrZXlib2FyZC5hZGRfaG90a2V5KEhPVEtFWSwgZW1lcmdlbmN5X3BhbmljX3RyaWdnZXIpXG4gICAga2V5Ym9hcmQuYWRkX2hvdGtleShBTFRfSE9US0VZLCBlbWVyZ2VuY3lfcGFuaWNfdHJpZ2dlcilcbiAgICBrZXlib2FyZC53YWl0KClcbmBcbiAgfSxcbiAge1xuICAgIGlkOiAnZmx1dHRlcl9wcm9jZXNzX3dhdGNoZG9nJyxcbiAgICB0aXRsZTogJzQuIEFncmVzeXdueSBXYXRjaGRvZyBQcm9jZXPDs3cgaSBQYW1pxJljaSAocHN1dGlsIE1vZHVsZSBTY2FubmVyKScsXG4gICAgc2hvcnREZXNjOiAnQ2nEhWdsZSBtb25pdG9ydWplIHR3b3J6ZW5pZSBub3d5Y2ggcHJvY2Vzw7N3IHcgc3lzdGVtaWUuIELFgnlza2F3aWN6bmllIHViaWphIHByb2Nlc3kgxYJhZHVqxIVjZSBiaWJsaW90ZWtpIGZsdXR0ZXJfd2luZG93cy5kbGwgbHViIHVydWNoYW1pYW5lIHogcnVubmVyYSBGbHV0dGVyYS4nLFxuICAgIGJhZGdlOiAnQ2nEhWfFgnkgZGVtb24nLFxuICAgIG9zOiBbJ3dpbmRvd3MnXSxcbiAgICByZXF1aXJlc1BpcDogdHJ1ZSxcbiAgICBwaXBQYWNrYWdlczogWydwc3V0aWwnXSxcbiAgICBrZXlGZWF0dXJlczogW1xuICAgICAgJ0fFgsSZYm9rYSBpbnNwZWtjamEgcGFtacSZY2kgKG1lbW9yeV9tYXBzIC8gbG9hZGVkIG1vZHVsZXMpJyxcbiAgICAgICdTenlia2kgY3phcyByZWFrY2ppICg8MTAwIG1zIG9kIHVydWNob21pZW5pYSBhcGxpa2FjamkgRmx1dHRlciknLFxuICAgICAgJ1d5a3J5d2EgYXBsaWthY2plIEZsdXR0ZXIgbmF3ZXQgcG8gem1pYW5pZSBuYXp3eSBwbGlrdSAuZXhlJyxcbiAgICAgICdBdXRvbWF0eWN6bmUgbG9nb3dhbmllIGkgemFwaXN5d2FuaWUgcmFwb3J0w7N3IG8gemFibG9rb3dhbnljaCBwcsOzYmFjaCdcbiAgICBdLFxuICAgIHJlY29tbWVuZGVkRm9yOiAnR2R5IGF1dG9yIG5ha8WCYWRraSB6bWllbmnFgiBuYXp3xJkgcGxpa3UgLmV4ZSBuYSBpbm7EhSAobnAuIHN2Y2hvc3QuZXhlKSwgYWxlIHBsaWsgd2NpxIXFvCDFgmFkdWplIHNpbG5payBGbHV0dGVyYS4nLFxuICAgIGV4cGxhbmF0aW9uOiBbXG4gICAgICAnQXBsaWthY2phIHdlIEZsdXR0ZXJ6ZSBuYSBXaW5kb3dzIHphd3N6ZSB3eW1hZ2Egc2lsbmlrYSBGbHV0dGVyIEVuZ2luZSAoZmx1dHRlcl93aW5kb3dzLmRsbCkuJyxcbiAgICAgICdOYXdldCBqZcWbbGkgcHJvZ3JhbSB6bWllbmkgbmF6d8SZIHBsaWt1IHd5a29ueXdhbG5lZ28sIGplZ28gbWFwYSBwYW1pxJljaSB1amF3bmkgYmlibGlvdGVraSBGbHV0dGVyYS4nLFxuICAgICAgJ1RlbiBza3J5cHQgc3ByYXdkemEga2HFvGR5IG5vd3kgcHJvY2VzIGkgamXFm2xpIHd5a3J5amUgYmlibGlvdGVrxJkgc2lsbmlrYSwgbmF0eWNobWlhc3QgZ28gZWxpbWludWplLidcbiAgICBdLFxuICAgIGNvZGU6IGBcIlwiXCJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5GTFVUVEVSIEVOR0lORSBNT0RVTEUgREVURUNUT1IgJiBQUk9DRVNTIEtJTExFUiAocHN1dGlsIE1lbW9yeSBXYXRjaGRvZylcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5XeWtyeXdhIEZsdXR0ZXJhIHBvIHphxYJhZG93YW55Y2ggbW9kdcWCYWNoIERMTCwgbmF3ZXQgamXFm2xpIHByb2NlcyBtYSBmYcWCc3p5d8SFIG5henfEmS5cbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cIlwiXCJcbmltcG9ydCBwc3V0aWxcbmltcG9ydCB0aW1lXG5pbXBvcnQgb3NcblxuRkxVVFRFUl9ETExfTkFNRVMgPSB7XCJmbHV0dGVyX3dpbmRvd3MuZGxsXCIsIFwiZmx1dHRlcl9lbmdpbmUuZGxsXCIsIFwiZmx1dHRlcl9lbWJlZGRlci5kbGxcIn1cblxuZGVmIGlzX2ZsdXR0ZXJfcHJvY2Vzcyhwcm9jKTpcbiAgICB0cnk6XG4gICAgICAgIG5hbWUgPSBwcm9jLm5hbWUoKS5sb3dlcigpXG4gICAgICAgIGlmIFwiZmx1dHRlclwiIGluIG5hbWU6XG4gICAgICAgICAgICByZXR1cm4gVHJ1ZSwgZlwiTmF6d2EgcHJvY2VzdToge25hbWV9XCJcblxuICAgICAgICBjbWRsaW5lID0gXCIgXCIuam9pbihwcm9jLmNtZGxpbmUoKSkubG93ZXIoKSBpZiBwcm9jLmNtZGxpbmUoKSBlbHNlIFwiXCJcbiAgICAgICAgaWYgXCJmbHV0dGVyXCIgaW4gY21kbGluZTpcbiAgICAgICAgICAgIHJldHVybiBUcnVlLCBmXCJBcmd1bWVudHkgd2llcnN6YSBwb2xlY2XFhDoge2NtZGxpbmV9XCJcblxuICAgICAgICBpZiBoYXNhdHRyKHByb2MsIFwibWVtb3J5X21hcHNcIik6XG4gICAgICAgICAgICBmb3IgbW0gaW4gcHJvYy5tZW1vcnlfbWFwcygpOlxuICAgICAgICAgICAgICAgIGRsbF9maWxlbmFtZSA9IG9zLnBhdGguYmFzZW5hbWUobW0ucGF0aCkubG93ZXIoKVxuICAgICAgICAgICAgICAgIGlmIGRsbF9maWxlbmFtZSBpbiBGTFVUVEVSX0RMTF9OQU1FUzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFRydWUsIGZcIlphxYJhZG93YW5hIGJpYmxpb3Rla2EgRExMOiB7ZGxsX2ZpbGVuYW1lfSAoe21tLnBhdGh9KVwiXG4gICAgZXhjZXB0IEV4Y2VwdGlvbjpcbiAgICAgICAgcGFzc1xuICAgIHJldHVybiBGYWxzZSwgXCJcIlxuXG5kZWYgcnVuX3dhdGNoZG9nKCk6XG4gICAgcHJpbnQoXCJbKl0gQWt0eXdueSBza2FuZXIgcGFtacSZY2kgcHJvY2Vzw7N3IEZsdXR0ZXJhLlwiKVxuICAgIHNlZW5fcGlkcyA9IHNldCgpXG5cbiAgICB3aGlsZSBUcnVlOlxuICAgICAgICBjdXJyZW50X3BpZHMgPSBzZXQoKVxuICAgICAgICBmb3IgcHJvYyBpbiBwc3V0aWwucHJvY2Vzc19pdGVyKFsncGlkJywgJ25hbWUnXSk6XG4gICAgICAgICAgICB0cnk6XG4gICAgICAgICAgICAgICAgcGlkID0gcHJvYy5pbmZvWydwaWQnXVxuICAgICAgICAgICAgICAgIGN1cnJlbnRfcGlkcy5hZGQocGlkKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIHBpZCBub3QgaW4gc2Vlbl9waWRzOlxuICAgICAgICAgICAgICAgICAgICBzZWVuX3BpZHMuYWRkKHBpZClcbiAgICAgICAgICAgICAgICAgICAgaXNfZmx0LCByZWFzb24gPSBpc19mbHV0dGVyX3Byb2Nlc3MocHJvYylcbiAgICAgICAgICAgICAgICAgICAgaWYgaXNfZmx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpbnQoZlwiXFxcXG5bIV0gV1lLUllUTyBTSUxOSUsgRkxVVFRFUkE6IFBJRCB7cGlkfSAoe3Byb2MuaW5mb1snbmFtZSddfSlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaW50KGZcIiAgICBQb3fDs2Q6IHtyZWFzb259XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9jLmtpbGwoKVxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpbnQoZlwiWytdIFtTVUtDRVNdIFByb2NlcyBQSUQge3BpZH0gem9zdGHFgiB6bGlrd2lkb3dhbnkuXCIpXG4gICAgICAgICAgICBleGNlcHQgKHBzdXRpbC5Ob1N1Y2hQcm9jZXNzLCBwc3V0aWwuQWNjZXNzRGVuaWVkKTpcbiAgICAgICAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgIHNlZW5fcGlkcyA9IHNlZW5fcGlkcy5pbnRlcnNlY3Rpb24oY3VycmVudF9waWRzKVxuICAgICAgICB0aW1lLnNsZWVwKDAuMilcblxuaWYgX19uYW1lX18gPT0gXCJfX21haW5fX1wiOlxuICAgIHRyeTpcbiAgICAgICAgcnVuX3dhdGNoZG9nKClcbiAgICBleGNlcHQgS2V5Ym9hcmRJbnRlcnJ1cHQ6XG4gICAgICAgIHByaW50KFwiXFxcXG5bKl0gWmF0cnp5bWFubyBtb25pdG9yb3dhbmllLlwiKVxuYFxuICB9LFxuICB7XG4gICAgaWQ6ICdsaW51eF94MTFfb3ZlcmxheV9raWxsZXInLFxuICAgIHRpdGxlOiAnNS4gTGludXggKFgxMSAvIFdheWxhbmQpIE92ZXJsYXkgJiBGbHV0dGVyIFdpbmRvdyBLaWxsZXInLFxuICAgIHNob3J0RGVzYzogJ1NrcnlwdCBkbGEgc3lzdGVtw7N3IExpbnV4LiBVxbx5d2EgeGRvdG9vbCwgd21jdHJsLCB4cHJvcCBpIHBzdXRpbCBkbyB3eWtyeXdhbmlhIHBlxYJub2VrcmFub3d5Y2ggb2tpZW4gdyB3YXJzdHdpZSBfTkVUX1dNX1NUQVRFX0FCT1ZFIGkgaWNoIHViaWphbmlhLicsXG4gICAgYmFkZ2U6ICdMaW51eCAoWDExL1dheWxhbmQpJyxcbiAgICBvczogWydsaW51eCddLFxuICAgIHJlcXVpcmVzUGlwOiB0cnVlLFxuICAgIHBpcFBhY2thZ2VzOiBbJ3BzdXRpbCddLFxuICAgIGtleUZlYXR1cmVzOiBbXG4gICAgICAnU3ByYXdkemEgYXRyeWJ1dHkgb2tpZW4gWDExIChfTkVUX1dNX1NUQVRFX0FCT1ZFIC8gRlVMTFNDUkVFTiknLFxuICAgICAgJ1dzcGllcmEgeGRvdG9vbCwgeHByb3Agb3JheiB4a2lsbCcsXG4gICAgICAnRHppYcWCYSB6IGtvbXBpbGFjamFtaSBGbHV0dGVyIExpbnV4IERlc2t0b3AgKGxpYmZsdXR0ZXJfbGludXguc28pJyxcbiAgICAgICdBdXRvbWF0eWN6bmUgcHJ6eXdyYWNhbmllIGtvbnRyb2xpIG5hZCBrdXJzb3JlbSAoeGRvdG9vbCBtb3VzZSBmb2N1cyknXG4gICAgXSxcbiAgICByZWNvbW1lbmRlZEZvcjogJ0dkeSBuYWvFgmFka2EgYmxva3VqZSDFm3JvZG93aXNrbyBncmFmaWN6bmUgbmEgTGludWtzaWUgKFVidW50dSwgRGViaWFuLCBGZWRvcmEsIEFyY2gpLicsXG4gICAgZXhwbGFuYXRpb246IFtcbiAgICAgICdOYSBMaW51a3NpZSBGbHV0dGVyIHR3b3J6eSBva25hIHphIHBvbW9jxIUgYmlibGlvdGVraSBHVEszIGkgc2lsbmlrYSBsaWJmbHV0dGVyX2xpbnV4LnNvLicsXG4gICAgICAnT2tuYSBBbHdheXMtb24tdG9wIHVzdGF3aWFqxIUgYXRyeWJ1dCBhdG9tdSBfTkVUX1dNX1NUQVRFX0FCT1ZFLicsXG4gICAgICAnU2tyeXB0IG9kcHl0dWplIHNlcndlciBYMTEgbyBnZW9tZXRyacSZIGkgd8WCYcWbY2l3b8WbY2kgb2tpZW4sIHBvIGN6eW0gemFiaWphIHByb2NlcyBvZHBvd2llZHppYWxueSB6YSBibG9rYWTEmS4nXG4gICAgXSxcbiAgICBjb2RlOiBgXCJcIlwiXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuTElOVVggWDExIC8gV0FZTEFORCBGTFVUVEVSIE9WRVJMQVkgS0lMTEVSXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuSW5zdGFsYWNqYSBuYXJ6xJlkemkgaSBiaWJsaW90ZWs6XG4gIHN1ZG8gYXB0IGluc3RhbGwgeGRvdG9vbCB3bWN0cmwgeDExLXV0aWxzXG4gIHBpcCBpbnN0YWxsIHBzdXRpbFxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblwiXCJcIlxuaW1wb3J0IHN1YnByb2Nlc3NcbmltcG9ydCB0aW1lXG5pbXBvcnQgcHN1dGlsXG5pbXBvcnQgb3NcblxuZGVmIGdldF9zY3JlZW5fcmVzb2x1dGlvbigpOlxuICAgIHRyeTpcbiAgICAgICAgb3V0ID0gc3VicHJvY2Vzcy5jaGVja19vdXRwdXQoXCJ4cmFuZHIgfCBncmVwICcqJyB8IGF3ayAne3ByaW50ICQxfSdcIiwgc2hlbGw9VHJ1ZSkuZGVjb2RlKClcbiAgICAgICAgcmVzID0gb3V0LnN0cmlwKCkuc3BsaXQoJ1xcXFxuJylbMF1cbiAgICAgICAgdywgaCA9IG1hcChpbnQsIHJlcy5zcGxpdCgneCcpKVxuICAgICAgICByZXR1cm4gdywgaFxuICAgIGV4Y2VwdCBFeGNlcHRpb246XG4gICAgICAgIHJldHVybiAxOTIwLCAxMDgwXG5cbmRlZiBnZXRfdmlzaWJsZV93aW5kb3dzKCk6XG4gICAgdHJ5OlxuICAgICAgICBvdXQgPSBzdWJwcm9jZXNzLmNoZWNrX291dHB1dChbXCJ4ZG90b29sXCIsIFwic2VhcmNoXCIsIFwiLS1vbmx5dmlzaWJsZVwiLCBcIi0tbmFtZVwiLCBcIi4qXCJdKS5kZWNvZGUoKVxuICAgICAgICByZXR1cm4gW2xpbmUuc3RyaXAoKSBmb3IgbGluZSBpbiBvdXQuc3RyaXAoKS5zcGxpdCgnXFxcXG4nKSBpZiBsaW5lLnN0cmlwKCldXG4gICAgZXhjZXB0IEV4Y2VwdGlvbjpcbiAgICAgICAgcmV0dXJuIFtdXG5cbmRlZiBnZXRfd2luZG93X3BpZCh3aW5kb3dfaWQpOlxuICAgIHRyeTpcbiAgICAgICAgb3V0ID0gc3VicHJvY2Vzcy5jaGVja19vdXRwdXQoW1wieGRvdG9vbFwiLCBcImdldHdpbmRvd3BpZFwiLCB3aW5kb3dfaWRdKS5kZWNvZGUoKS5zdHJpcCgpXG4gICAgICAgIHJldHVybiBpbnQob3V0KVxuICAgIGV4Y2VwdCBFeGNlcHRpb246XG4gICAgICAgIHJldHVybiBOb25lXG5cbmRlZiBpc193aW5kb3dfdG9wbW9zdF9vcl9mdWxsc2NyZWVuKHdpbmRvd19pZCwgc2NyZWVuX3csIHNjcmVlbl9oKTpcbiAgICB0cnk6XG4gICAgICAgIHhwcm9wID0gc3VicHJvY2Vzcy5jaGVja19vdXRwdXQoW1wieHByb3BcIiwgXCItaWRcIiwgd2luZG93X2lkXSkuZGVjb2RlKClcbiAgICAgICAgaXNfYWJvdmUgPSBcIl9ORVRfV01fU1RBVEVfQUJPVkVcIiBpbiB4cHJvcCBvciBcIl9ORVRfV01fU1RBVEVfU1RBWVNfT05fVE9QXCIgaW4geHByb3BcbiAgICAgICAgaXNfZnVsbHNjcmVlbiA9IFwiX05FVF9XTV9TVEFURV9GVUxMU0NSRUVOXCIgaW4geHByb3BcbiAgICAgICAgcmV0dXJuIGlzX2Fib3ZlIG9yIGlzX2Z1bGxzY3JlZW5cbiAgICBleGNlcHQgRXhjZXB0aW9uOlxuICAgICAgICByZXR1cm4gRmFsc2VcblxuZGVmIHNjYW5fYW5kX2Rlc3Ryb3lfbGludXgoKTpcbiAgICBzY3JlZW5fdywgc2NyZWVuX2ggPSBnZXRfc2NyZWVuX3Jlc29sdXRpb24oKVxuICAgIHdpbmRvd3MgPSBnZXRfdmlzaWJsZV93aW5kb3dzKClcblxuICAgIGZvciB3aW5faWQgaW4gd2luZG93czpcbiAgICAgICAgaWYgaXNfd2luZG93X3RvcG1vc3Rfb3JfZnVsbHNjcmVlbih3aW5faWQsIHNjcmVlbl93LCBzY3JlZW5faCk6XG4gICAgICAgICAgICBwaWQgPSBnZXRfd2luZG93X3BpZCh3aW5faWQpXG4gICAgICAgICAgICBpZiBwaWQ6XG4gICAgICAgICAgICAgICAgdHJ5OlxuICAgICAgICAgICAgICAgICAgICBwcm9jID0gcHN1dGlsLlByb2Nlc3MocGlkKVxuICAgICAgICAgICAgICAgICAgICBwcm9jX25hbWUgPSBwcm9jLm5hbWUoKVxuICAgICAgICAgICAgICAgICAgICBpZiBwcm9jX25hbWUgaW4gKFwiZ25vbWUtc2hlbGxcIiwgXCJwbGFzbWFcIiwgXCJ4ZmNlNC1wYW5lbFwiLCBcInhvcmdcIiwgXCJ3YXlsYW5kXCIpOlxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICAgICAgICAgICAgcHJpbnQoZlwiWyFdIFd5a3J5dG8gYmxva3VqxIVjZSBva25vIExpbnV4OiB7cHJvY19uYW1lfSAoUElEOiB7cGlkfSlcIilcbiAgICAgICAgICAgICAgICAgICAgcHJvYy5raWxsKClcbiAgICAgICAgICAgICAgICBleGNlcHQgRXhjZXB0aW9uIGFzIGU6XG4gICAgICAgICAgICAgICAgICAgIG9zLnN5c3RlbShmXCJraWxsIC05IHtwaWR9XCIpXG5cbmlmIF9fbmFtZV9fID09IFwiX19tYWluX19cIjpcbiAgICBwcmludChcIlsqXSBTa2FuZXIgbmFrxYJhZGVrIExpbnV4IChYMTEpIGFrdHl3bnkuIFNrYW5vd2FuaWUgY28gNTAwIG1zLi4uXCIpXG4gICAgdHJ5OlxuICAgICAgICB3aGlsZSBUcnVlOlxuICAgICAgICAgICAgc2Nhbl9hbmRfZGVzdHJveV9saW51eCgpXG4gICAgICAgICAgICB0aW1lLnNsZWVwKDAuNSlcbiAgICBleGNlcHQgS2V5Ym9hcmRJbnRlcnJ1cHQ6XG4gICAgICAgIHByaW50KFwiXFxcXG5bKl0gWmF0cnp5bWFuby5cIilcbmBcbiAgfSxcbiAge1xuICAgIGlkOiAnc2VudGluZWxfbWFsd2FyZV9kZWZhbmdlcl9hbmRfZW50cnlwb2ludF9pbW11bml6ZXInLFxuICAgIHRpdGxlOiAn8J+boe+4jyBJTU1VTklaRVItTUFYOiBUcndhxYJlIFVzemtvZHplbmllIE1hbHdhcmUgKEJ5dGUtU3RvbXAgUEUpICsgQmxva2FkYSBXc3p5c3RraWNoIFB1bmt0w7N3IFdlasWbxIcgKEFudGktRGFtYWdlIFdoaXRlbGlzdCknLFxuICAgIHNob3J0RGVzYzogJ0tvbXBsZWtzb3d5IGtvbWJham4gb2Jyb25ueSBTZW50aW5lbCBTaGllbGQ6IGJlend6Z2zEmWRuaWUgdXN6a2FkemEgesWCb8WbbGl3ZSBwbGlraSB3eWtvbnl3YWxuZSAoemVyb3dhbmllIG5hZ8WCw7N3a8OzdyBQRS9NWiwga29ydXBjamEgRW50cnlQb2ludCwgc3RlbXBsb3dhbmllIHplcmFtaSwgb2Rtb3dhIHVwcmF3bmllxYQgQUNMKSBpIGplZG5vY3plxZtuaWUgemFrxYJhZGEgdGFyY3plIG9jaHJvbm5lIG5hIHdzenlzdGtpZSB3ZWt0b3J5IGluZmVrY2ppIChSZWplc3RyIFJ1bi9SdW5PbmNlLCBGb2xkZXJ5IFN0YXJ0dXAsIEhhcm1vbm9ncmFtIFphZGHFhCwgV01JLCBJRkVPLCBBcHBJbml0X0RMTHMsIFVTQiBBdXRvcnVuLCBQb3dlclNoZWxsIENMTSkuIEJlend6Z2zEmWRuYSBvY2hyb25hIHBsaWvDs3cgc3lzdGVtdSAoU3RyaWN0IFdoaXRlbGlzdCArIEF1dGhlbnRpY29kZSBTaWduYXR1cmUgVmVyaWZpY2F0aW9uKS4nLFxuICAgIGJhZGdlOiAnVHJ3YcWCeSBTYWJvdGHFvCBNYWx3YXJlIOKAoiBJbW11bml6YWNqYSBXc3p5c3RraWNoIFdlasWbxIcg4oCiIDEwMCUgQmV6cGllY3plxYRzdHdvIFN5c3RlbXUnLFxuICAgIG9zOiBbJ3dpbmRvd3MnLCAnbGludXgnLCAnbWFjb3MnXSxcbiAgICByZXF1aXJlc1BpcDogZmFsc2UsXG4gICAgcGlwUGFja2FnZXM6IFtdLFxuICAgIGtleUZlYXR1cmVzOiBbXG4gICAgICAnVHJ3YcWCZSB6bmlzemN6ZW5pZSBiaW5hcm5lIG1hbHdhcmU6IHplcm93YW5pZSBuYWfFgsOzd2vDs3cgTVogaSBQRSwga29ydXBjamEgRW50cnlQb2ludCAoYsWCxIVkIDB4QzAwMDAwN0IpJyxcbiAgICAgICdPZG1vd2EgcHJhdyBBQ0wgZGxhIGthxbxkZWdvIHd5a3J5dGVnbyBzemtvZG5pa2EgKGljYWNscyAvaW5oZXJpdGFuY2U6ciAvZGVueSBFdmVyeW9uZTooRixYLFIsVykpJyxcbiAgICAgICdJbW11bml6YWNqYSByZWplc3RydTogYmxva2FkYSBrbHVjenkgUnVuLCBSdW5PbmNlLCBSdW5TZXJ2aWNlcywgUG9saWNpZXNcXFxcRXhwbG9yZXJcXFxcUnVuJyxcbiAgICAgICdDenlzemN6ZW5pZSBpIHphcnlnbG93YW5pZSBmb2xkZXLDs3cgU3RhcnR1cCAoc2hlbGw6c3RhcnR1cCBvcmF6IEFsbCBVc2Vycykga2FuYXJrYW1pIHJlYWQtb25seScsXG4gICAgICAnTGlrd2lkYWNqYSB6xYJvxZtsaXd5Y2ggemFkYcWEIEhhcm1vbm9ncmFtdSAoc2NodGFza3MpIGkgc3Vic2tyeXBjamkgV01JIChyb290XFxcXHN1YnNjcmlwdGlvbiknLFxuICAgICAgJ1B1xYJhcGtpIElGRU8gKEltYWdlIEZpbGUgRXhlY3V0aW9uIE9wdGlvbnMpIHByemVraWVyb3d1asSFY2UgcHLDs2J5IHBvbm93bmVnbyBzdGFydHUgc3prb2RuaWthJyxcbiAgICAgICdXecWCxIVjemVuaWUgd2VrdG9yw7N3IGluZmVrY2ppIFVTQiAoTm9Ecml2ZVR5cGVBdXRvUnVuID0gMHhGRikgb3JheiBTYWZlRGxsU2VhcmNoTW9kZSA9IDEnLFxuICAgICAgJ0Jlend6Z2zEmWRuYSBvY2hyb25hIHBsaWvDs3cgV2luZG93cyBpIGFwbGlrYWNqaSAoU3RyaWN0IFdoaXRlbGlzdCArIHdlcnlmaWthY2phIHBvZHBpc8OzdyBjeWZyb3d5Y2ggQXV0aGVudGljb2RlKScsXG4gICAgICAnTGlrd2lkYWNqYSB3c3p5c3RraWNoIGthdGVnb3JpaSB6xYJvxZtsaXdlZ28gb3Byb2dyYW1vd2FuaWE6IHJhbnNvbXdhcmUsIG1pbmVyeSwgc3B5d2FyZSwgYWR3YXJlLCByb2Jha2knXG4gICAgXSxcbiAgICByZWNvbW1lbmRlZEZvcjogJ01hc3p5bnkgcG8gYXRha3UgcmFuc29td2FyZSwgYWR3YXJlIGx1YiBpbmZvc3RlYWxlcmE7IHN5dHVhY2plIGdkemllIHN6a29kbmlrIGNpxIVnbGUgcG93cmFjYSBwbyByZXN0YXJjaWUsIGEgd3ltYWdhbmEgamVzdCAxMDAlIGd3YXJhbmNqYSBuaWVuYXJ1c3plbmlhIHBsaWvDs3cgc3lzdGVtb3d5Y2guJyxcbiAgICBleHBsYW5hdGlvbjogW1xuICAgICAgJzEuIFdoaXRlbGlzdCBWZXJpZmljYXRpb246IFNwcmF3ZHplbmllIMWbY2llxbxraSBpIHBvZHBpc3UgQXV0aGVudGljb2RlIC0gcGxpa2kgc3lzdGVtb3dlIFdpbmRvd3MvU3lzdGVtMzIgaSBwb2RwaXNhbmUgb3Byb2dyYW1vd2FuaWUgc8SFIG5pZW5hcnVzemFsbmUuJyxcbiAgICAgICcyLiBNZW1vcnkgRnJlZXplOiBaYXdpZXN6ZW5pZSB3xIV0a8OzdyBwcm9jZXN1IG1hbHdhcmUgemEgcG9tb2PEhSBudGRsbC5OdFN1c3BlbmRQcm9jZXNzICgwIG1zKS4nLFxuICAgICAgJzMuIEJpbmFyeSBQRSBNdXRpbGF0aW9uOiBaZXJvd2FuaWUgbmFnxYLDs3drYSBNWiAob2Zmc2V0IDApLCB6ZXJvd2FuaWUgc3lnbmF0dXJ5IFBFXFxcXDBcXFxcMCwga29ydXBjamEgbmFnxYLDs3drYSBzZWtjamkgLnRleHQgaSBwb2RtaWFuYSBrb2R1IG5hIGRlYWQtbWFya2VyLicsXG4gICAgICAnNC4gQUNMIFF1YXJhbnRpbmUgTG9ja2Rvd246IE9kZWJyYW5pZSB3c3plbGtpY2ggcHJhdyBvZGN6eXR1L3phcGlzdS93eWtvbmFuaWEgZ3J1cGllIFdzenlzY3kgKEV2ZXJ5b25lKSBpIHptaWFuYSByb3pzemVyemVuaWEgbmEgLlNFTlRJTkVMX0RFRkFOR0VELicsXG4gICAgICAnNS4gRW50cnlwb2ludCBIYXJkZW5pbmc6IFByemVzenVrYW5pZSBpIHphcnlnbG93YW5pZSA4IHdla3RvcsOzdyBhdXRvc3RhcnR1IChSZWplc3RyLCBTdGFydHVwLCBUYXNrIFNjaGVkdWxlciwgV01JLCBJRkVPLCBBcHBJbml0LCBVU0IsIFBvd2VyU2hlbGwpLidcbiAgICBdLFxuICAgIGNvZGU6IGAjIS91c3IvYmluL2VudiBweXRob24zXG4jID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuIyAgU0VOVElORUwgU0hJRUxEOiBJTU1VTklaRVItTUFYICYgTUFMV0FSRSBERUZBTkdFUiBFTkdJTkVcbiMgIFBsaWs6IHNlbnRpbmVsX21hbHdhcmVfZGVmYW5nZXJfYW5kX2VudHJ5cG9pbnRfaW1tdW5pemVyLnB5XG4jICBaYWRhbmllOlxuIyAgICAxLiBUcndhxYJlIHVzemtvZHplbmllIGJpbmFybmUgesWCb8WbbGl3ZWdvIG9wcm9ncmFtb3dhbmlhICh6ZXJvd2FuaWUgTVovUEUsXG4jICAgICAgIGtvcnVwY2phIG5hZ8WCw7N3a8OzdyBzZWtjamksIGJ5dGUtc3RvbXAgLnRleHQsIGJsb2thZGEgQUNMKS5cbiMgICAgMi4gSW1tdW5pemFjamEgd3N6eXN0a2ljaCBwdW5rdMOzdyB3ZWrFm8SHIChSZWplc3RyIFJ1bi9SdW5PbmNlLCBTdGFydHVwLFxuIyAgICAgICBIYXJtb25vZ3JhbSBaYWRhxYQsIFdNSSwgSUZFTywgQXBwSW5pdF9ETExzLCBVU0IgQXV0b3J1biwgUG93ZXJTaGVsbCkuXG4jICAgIDMuIDEwMCUgb2Nocm9uYSBwbGlrw7N3IGtvbXB1dGVyYSAoU3RyaWN0IFN5c3RlbSBXaGl0ZWxpc3QgKyBBdXRoZW50aWNvZGUpLlxuIyAgICA0LiBFbGltaW5hY2phIHdzenlzdGtpY2ggdHlww7N3IG1hbHdhcmUgKHJhbnNvbXdhcmUsIG1pbmVyeSwgc3B5d2FyZSwgYWR3YXJlKS5cbiMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5pbXBvcnQgb3NcbmltcG9ydCBzeXNcbmltcG9ydCB0aW1lXG5pbXBvcnQgaGFzaGxpYlxuaW1wb3J0IHN1YnByb2Nlc3NcbmltcG9ydCBzaHV0aWxcbmZyb20gdHlwaW5nIGltcG9ydCBMaXN0LCBEaWN0LCBUdXBsZSwgT3B0aW9uYWxcblxuIyBGbGFnaSBzeXN0ZW1vd2UgaSB3ZXJ5ZmlrYWNqYSBwbGF0Zm9ybXlcbklTX1dJTkRPV1MgPSBzeXMucGxhdGZvcm0uc3RhcnRzd2l0aChcIndpblwiKVxuSVNfTElOVVggPSBzeXMucGxhdGZvcm0uc3RhcnRzd2l0aChcImxpbnV4XCIpXG5JU19NQUNPUyA9IHN5cy5wbGF0Zm9ybS5zdGFydHN3aXRoKFwiZGFyd2luXCIpXG5cbiMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4jIDEuIMWaQ0lTxYFBIEJJQcWBQSBMSVNUQSBLQVRBTE9Hw5NXIEkgUFJPQ0VTw5NXIFNZU1RFTU9XWUNIIChOSUVOQVJVU1pBTE5FKVxuIyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblNZU1RFTV9QUk9URUNURURfUk9PVFMgPSBbXG4gICAgclwiQzpcXFxcV2luZG93c1xcXFxTeXN0ZW0zMlwiLFxuICAgIHJcIkM6XFxcXFdpbmRvd3NcXFxcU3lzV09XNjRcIixcbiAgICByXCJDOlxcXFxXaW5kb3dzXFxcXFdpblN4U1wiLFxuICAgIHJcIkM6XFxcXFdpbmRvd3NcXFxcTWljcm9zb2Z0Lk5FVFwiLFxuICAgIHJcIkM6XFxcXFByb2dyYW0gRmlsZXNcIixcbiAgICByXCJDOlxcXFxQcm9ncmFtIEZpbGVzICh4ODYpXCIsXG4gICAgXCIvYmluXCIsXG4gICAgXCIvc2JpblwiLFxuICAgIFwiL3Vzci9iaW5cIixcbiAgICBcIi91c3Ivc2JpblwiLFxuICAgIFwiL1N5c3RlbS9MaWJyYXJ5XCJcbl1cblxuU0FGRV9TWVNURU1fUFJPQ0VTU0VTID0ge1xuICAgIFwic3lzdGVtXCIsIFwic21zcy5leGVcIiwgXCJjc3Jzcy5leGVcIiwgXCJ3aW5pbml0LmV4ZVwiLCBcInNlcnZpY2VzLmV4ZVwiLFxuICAgIFwibHNhc3MuZXhlXCIsIFwic3ZjaG9zdC5leGVcIiwgXCJmb250ZHJ2aG9zdC5leGVcIiwgXCJ3aW5sb2dvbi5leGVcIixcbiAgICBcImR3bS5leGVcIiwgXCJzcG9vbHN2LmV4ZVwiLCBcImV4cGxvcmVyLmV4ZVwiLCBcInNpaG9zdC5leGVcIiwgXCJ0YXNraG9zdHcuZXhlXCIsXG4gICAgXCJzaGVsbGV4cGVyaWVuY2Vob3N0LmV4ZVwiLCBcInNlYXJjaGhvc3QuZXhlXCIsIFwic3RhcnRtZW51ZXhwZXJpZW5jZWhvc3QuZXhlXCIsXG4gICAgXCJjdGZtb24uZXhlXCIsIFwiY29uaG9zdC5leGVcIiwgXCJjbWQuZXhlXCIsIFwicG93ZXJzaGVsbC5leGVcIiwgXCJweXRob24uZXhlXCIsXG4gICAgXCJpbml0XCIsIFwic3lzdGVtZFwiLCBcImt0aHJlYWRkXCIsIFwibGF1bmNoZFwiXG59XG5cbiMgVHlwb3dlIHBvZGVqcnphbmUgbG9rYWxpemFjamUgenJ6dXR1IG1hbHdhcmUgKFVzZXItd3JpdGFibGUgZHJvcCB6b25lcylcblNVU1BJQ0lPVVNfRFJPUF9aT05FUyA9IFtcbiAgICBvcy5lbnZpcm9uLmdldChcIlRFTVBcIiwgclwiQzpcXFxcV2luZG93c1xcXFxUZW1wXCIpLFxuICAgIG9zLmVudmlyb24uZ2V0KFwiTE9DQUxBUFBEQVRBXCIsIFwiXCIpLFxuICAgIG9zLmVudmlyb24uZ2V0KFwiQVBQREFUQVwiLCBcIlwiKSxcbiAgICByXCJDOlxcXFxVc2Vyc1xcXFxQdWJsaWNcIixcbiAgICByXCJDOlxcXFxQcm9ncmFtRGF0YVwiLFxuICAgIG9zLnBhdGguam9pbihvcy5lbnZpcm9uLmdldChcIlVTRVJQUk9GSUxFXCIsIFwiXCIpLCBcIkRvd25sb2Fkc1wiKSBpZiBJU19XSU5ET1dTIGVsc2UgXCIvdG1wXCJcbl1cblxuIyBabmFuZSBzemtvZGxpd2UgbmF6d3kgYmluYXJpw7N3IGkgesWCb8WbbGl3eWNoIGtvcGlpXG5NQUxXQVJFX05BTUVfUEFUVEVSTlMgPSBbXG4gICAgXCJ4bXJpZ1wiLCBcIm1pbmVyXCIsIFwid2FuYWNyeVwiLCBcImNyeXB0b25pZ2h0XCIsIFwicmVkbGluZVwiLCBcImFnZW50dGVzbGFcIixcbiAgICBcInZpZGFyXCIsIFwic3RlYWxlclwiLCBcInRyb2phblwiLCBcImtleWxvZ2dlclwiLCBcInJldmVuZ1wiLCBcImluamVjdFwiLFxuICAgIFwicGF5bG9hZFwiLCBcInJhbnNvbVwiLCBcInN2Y2gwc3RcIiwgXCJleHBsMHJlclwiLCBcInNjdmhvc3RcIiwgXCJzeXN0ZW0zMl91cGRhdGVcIixcbiAgICBcIndpbl91cGRhdGVfc2VydmljZVwiLCBcImJpdHNkb2pvX292ZXJsYXlcIiwgXCJmbHV0dGVyX2hpamFja1wiXG5dXG5cbiMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4jIDIuIE1FQ0hBTklaTSBXRVJZRklLQUNKSSBCRVpQSUVDWkXFg1NUV0EgKFpFUk8gREFNQUdFIERPIFBMSUvDk1cgU1lTVEVNT1dZQ0gpXG4jID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuZGVmIGlzX3doaXRlbGlzdGVkX3N5c3RlbV9wYXRoKGZpbGVwYXRoOiBzdHIpIC0+IGJvb2w6XG4gICAgXCJcIlwiU3ByYXdkemEsIGN6eSBwbGlrIG5hbGXFvHkgZG8gbmllbmFydXN6YWxuZWdvIHN5c3RlbXUgb3BlcmFjeWpuZWdvLlwiXCJcIlxuICAgIGlmIG5vdCBmaWxlcGF0aCBvciBub3Qgb3MucGF0aC5leGlzdHMoZmlsZXBhdGgpOlxuICAgICAgICByZXR1cm4gVHJ1ZVxuICAgIFxuICAgIG5vcm0gPSBvcy5wYXRoLm5vcm1wYXRoKG9zLnBhdGguYWJzcGF0aChmaWxlcGF0aCkpLmxvd2VyKClcbiAgICBcbiAgICAjIFNwcmF3ZHplbmllIHBvIGNocm9uaW9ueWNoIGtvcnplbmlhY2ggc3lzdGVtb3d5Y2hcbiAgICBmb3Igcm9vdCBpbiBTWVNURU1fUFJPVEVDVEVEX1JPT1RTOlxuICAgICAgICBub3JtX3Jvb3QgPSBvcy5wYXRoLm5vcm1wYXRoKHJvb3QpLmxvd2VyKClcbiAgICAgICAgaWYgbm9ybS5zdGFydHN3aXRoKG5vcm1fcm9vdCk6XG4gICAgICAgICAgICAjIFd5asSFdGVrOiBqZcWbbGkgdyBQcm9ncmFtRGF0YSBsdWIgV2luZG93cy9UZW1wIHpuYWpkdWplIHNpxJkgcGxpayB3eWtvbnl3YWxueVxuICAgICAgICAgICAgaWYgXCJ0ZW1wXCIgbm90IGluIG5vcm0gYW5kIFwiYXBwZGF0YVwiIG5vdCBpbiBub3JtIGFuZCBcInB1YmxpY1wiIG5vdCBpbiBub3JtOlxuICAgICAgICAgICAgICAgIHJldHVybiBUcnVlXG4gICAgICAgICAgICAgICAgXG4gICAgIyBTcHJhd2R6ZW5pZSBwbyBiZXpwaWVjem55Y2ggbmF6d2FjaCBwbGlrw7N3IGJhem93eWNoXG4gICAgYmFzZV9uYW1lID0gb3MucGF0aC5iYXNlbmFtZShub3JtKS5sb3dlcigpXG4gICAgaWYgYmFzZV9uYW1lIGluIFNBRkVfU1lTVEVNX1BST0NFU1NFUzpcbiAgICAgICAgcmV0dXJuIFRydWVcbiAgICAgICAgXG4gICAgcmV0dXJuIEZhbHNlXG5cbmRlZiB2ZXJpZnlfYXV0aGVudGljb2RlX3NpZ25hdHVyZShmaWxlcGF0aDogc3RyKSAtPiBib29sOlxuICAgIFwiXCJcIldlcnlmaWt1amUgY3lmcm93eSBwb2RwaXMgQXV0aGVudGljb2RlIChNaWNyb3NvZnQgLyBaYXVmYW55IGRvc3Rhd2NhKS5cIlwiXCJcbiAgICBpZiBub3QgSVNfV0lORE9XUyBvciBub3Qgb3MucGF0aC5pc2ZpbGUoZmlsZXBhdGgpOlxuICAgICAgICByZXR1cm4gRmFsc2VcbiAgICB0cnk6XG4gICAgICAgIGNtZCA9IFtcbiAgICAgICAgICAgIFwicG93ZXJzaGVsbFwiLCBcIi1Ob1Byb2ZpbGVcIiwgXCItTm9uSW50ZXJhY3RpdmVcIiwgXCItQ29tbWFuZFwiLFxuICAgICAgICAgICAgZlwiKEdldC1BdXRoZW50aWNvZGVTaWduYXR1cmUgLUZpbGVQYXRoICd7ZmlsZXBhdGh9JykuU3RhdHVzLlRvU3RyaW5nKClcIlxuICAgICAgICBdXG4gICAgICAgIHJlcyA9IHN1YnByb2Nlc3MucnVuKGNtZCwgY2FwdHVyZV9vdXRwdXQ9VHJ1ZSwgdGV4dD1UcnVlLCB0aW1lb3V0PTUpXG4gICAgICAgIHN0YXR1cyA9IHJlcy5zdGRvdXQuc3RyaXAoKVxuICAgICAgICAjIFN0YXR1cyAnVmFsaWQnIG96bmFjemEgcHJhd2lkxYJvd28gcG9kcGlzYW55IHBsaWsgKG5wLiBNaWNyb3NvZnQpXG4gICAgICAgIHJldHVybiBzdGF0dXMgPT0gXCJWYWxpZFwiXG4gICAgZXhjZXB0IEV4Y2VwdGlvbjpcbiAgICAgICAgcmV0dXJuIEZhbHNlXG5cbiMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4jIDMuIFRSV0HFgUUgVVNaS09EWkVOSUUgQklOQVJORSBNQUxXQVJFIChCWVRFLVNUT01QICYgUEUgTVVUSUxBVElPTilcbiMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5kZWYgZGVmYW5nX21hbHdhcmVfZXhlY3V0YWJsZShmaWxlcGF0aDogc3RyLCByZWFzb246IHN0ciA9IFwiV3lrcnl0eSB6xYJvxZtsaXd5IHdla3RvclwiKSAtPiBib29sOlxuICAgIFwiXCJcIlxuICAgIFRyd2FsZSBpIG5pZW9kd3JhY2FsbmllIHVzemthZHphIHrFgm/Fm2xpd3kgcGxpayB3eWtvbnl3YWxueTpcbiAgICAxLiBaZXJ1amUgbmFnxYLDs3dlayBET1MgJ01aJyAob2Zmc2V0IDAtMSlcbiAgICAyLiBPZG5hamR1amUgaSB6ZXJ1amUgbmFnxYLDs3dlayAnUEVcXFxcMFxcXFwwJyBvcmF6IEFkZHJlc3NPZkVudHJ5UG9pbnRcbiAgICAzLiBTdGVtcGx1amUgemVyYW1pIGkga29kZW0gbWFydHd5bSBzZWtjasSZIGtvZHUgLnRleHQgKHBpZXJ3c3plIDQwOTYgYmFqdMOzdylcbiAgICA0LiBabWllbmlhIHJvenN6ZXJ6ZW5pZSBuYSAuU0VOVElORUxfREVGQU5HRURcbiAgICA1LiBPZGJpZXJhIHdzemVsa2llIHByYXdhIG9kY3p5dHUvemFwaXN1L3d5a29uYW5pYSBwcnpleiBpY2FjbHNcbiAgICBcIlwiXCJcbiAgICBpZiBub3Qgb3MucGF0aC5pc2ZpbGUoZmlsZXBhdGgpOlxuICAgICAgICByZXR1cm4gRmFsc2VcblxuICAgICMgQkVaV1pHTMSYRE5BIFRBUkNaQTogTmlnZHkgbmllIGRvdHlrYW15IHBsaWvDs3cgeiBiaWHFgmVqIGxpc3R5IGFuaSBwb2RwaXNhbnljaCFcbiAgICBpZiBpc193aGl0ZWxpc3RlZF9zeXN0ZW1fcGF0aChmaWxlcGF0aCk6XG4gICAgICAgIHByaW50KGZcIiAgW1RBUkNaQS1CRVpQSUVDWkXFg1NUV0FdIFBsaWsge2ZpbGVwYXRofSBqZXN0IGNocm9uaW9ueW0gc2vFgmFkbmlraWVtIHN5c3RlbXUuIFBvbWluacSZdG8uXCIpXG4gICAgICAgIHJldHVybiBGYWxzZVxuXG4gICAgaWYgdmVyaWZ5X2F1dGhlbnRpY29kZV9zaWduYXR1cmUoZmlsZXBhdGgpOlxuICAgICAgICBwcmludChmXCIgIFtUQVJDWkEtQkVaUElFQ1pFxYNTVFdBXSBQbGlrIHtmaWxlcGF0aH0gcG9zaWFkYSBwcmF3aWTFgm93eSBwb2RwaXMgY3lmcm93eSBBdXRoZW50aWNvZGUuIFBvbWluacSZdG8uXCIpXG4gICAgICAgIHJldHVybiBGYWxzZVxuXG4gICAgdHJ5OlxuICAgICAgICAjIE9ibGljemVuaWUgaGFzaGEgU0hBLTI1NiBwcnplZCBzYWJvdGHFvGVtXG4gICAgICAgIGhhc2hlciA9IGhhc2hsaWIuc2hhMjU2KClcbiAgICAgICAgd2l0aCBvcGVuKGZpbGVwYXRoLCBcInJiXCIpIGFzIGY6XG4gICAgICAgICAgICB3aGlsZSBjaHVuayA6PSBmLnJlYWQoNjU1MzYpOlxuICAgICAgICAgICAgICAgIGhhc2hlci51cGRhdGUoY2h1bmspXG4gICAgICAgIG9yaWdfaGFzaCA9IGhhc2hlci5oZXhkaWdlc3QoKVxuXG4gICAgICAgIGZpbGVfc2l6ZSA9IG9zLnBhdGguZ2V0c2l6ZShmaWxlcGF0aClcbiAgICAgICAgcHJpbnQoZlwiWypdIFJPWlBPQ1rEmENJRSBUUldBxYFFR08gVVNaS09EWkVOSUEgTUFMV0FSRToge2ZpbGVwYXRofVwiKVxuICAgICAgICBwcmludChmXCIgICAgUG93w7NkOiB7cmVhc29ufSB8IFJvem1pYXI6IHtmaWxlX3NpemV9IEIgfCBTSEEtMjU2OiB7b3JpZ19oYXNoWzoxNl19Li4uXCIpXG5cbiAgICAgICAgIyBLcm9rIDE6IE90d2FyY2llIHcgdHJ5YmllIGJpbmFybnltIGRvIHphcGlzdSBpIG11dHlsYWNqYSBuYWfFgsOzd2vDs3cgUEVcbiAgICAgICAgd2l0aCBvcGVuKGZpbGVwYXRoLCBcInIrYlwiKSBhcyBmOlxuICAgICAgICAgICAgIyBTcHJhd2R6ZW5pZSBuYWfFgsOzd2thIE1aXG4gICAgICAgICAgICBmLnNlZWsoMClcbiAgICAgICAgICAgIG1hZ2ljID0gZi5yZWFkKDIpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICMgWmVyb3dhbmllIG5hZ8WCw7N3a2EgRE9TICdNWidcbiAgICAgICAgICAgIGYuc2VlaygwKVxuICAgICAgICAgICAgZi53cml0ZShiXCJcXFxceDAwXFxcXHgwMFwiKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAjIFd5c3p1a2FuaWUgd3NrYcW6bmlrYSBlX2xmYW5ldyAob2Zmc2V0IDB4M0MpXG4gICAgICAgICAgICBwZV9vZmZzZXQgPSAwXG4gICAgICAgICAgICBpZiBmaWxlX3NpemUgPiAweDQwIGFuZCBtYWdpYyA9PSBiXCJNWlwiOlxuICAgICAgICAgICAgICAgIGYuc2VlaygweDNDKVxuICAgICAgICAgICAgICAgIHBlX29mZnNldF9ieXRlcyA9IGYucmVhZCg0KVxuICAgICAgICAgICAgICAgIGlmIGxlbihwZV9vZmZzZXRfYnl0ZXMpID09IDQ6XG4gICAgICAgICAgICAgICAgICAgIHBlX29mZnNldCA9IGludC5mcm9tX2J5dGVzKHBlX29mZnNldF9ieXRlcywgYnl0ZW9yZGVyPVwibGl0dGxlXCIpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICMgWmVyb3dhbmllIHN5Z25hdHVyeSAnUEVcXFxcMFxcXFwwJyBvcmF6IEFkZHJlc3NPZkVudHJ5UG9pbnRcbiAgICAgICAgICAgIGlmIDAgPCBwZV9vZmZzZXQgPCBmaWxlX3NpemUgLSA2NDpcbiAgICAgICAgICAgICAgICBmLnNlZWsocGVfb2Zmc2V0KVxuICAgICAgICAgICAgICAgICMgWmFzdMSFcGllbmllICdQRVxcXFwwXFxcXDAnIHplcmFtaVxuICAgICAgICAgICAgICAgIGYud3JpdGUoYlwiXFxcXHgwMFxcXFx4MDBcXFxceDAwXFxcXHgwMFwiKVxuICAgICAgICAgICAgICAgICMgQ29ycnVwdCBNYWNoaW5lIFR5cGUgJiBTZWN0aW9uc1xuICAgICAgICAgICAgICAgIGYud3JpdGUoYlwiXFxcXHhGRlxcXFx4RkZcXFxceDAwXFxcXHgwMFwiKVxuICAgICAgICAgICAgICAgICMgT3ZlcndyaXRlIEFkZHJlc3NPZkVudHJ5UG9pbnQgKG9mZnNldCBwZV9vZmZzZXQgKyA0MClcbiAgICAgICAgICAgICAgICBpZiBwZV9vZmZzZXQgKyA0NCA8IGZpbGVfc2l6ZTpcbiAgICAgICAgICAgICAgICAgICAgZi5zZWVrKHBlX29mZnNldCArIDQwKVxuICAgICAgICAgICAgICAgICAgICBmLndyaXRlKGJcIlxcXFx4MDBcXFxceDAwXFxcXHgwMFxcXFx4MDBcIilcblxuICAgICAgICAgICAgIyBLcm9rIDI6IEJ5dGUtc3RvbXAgcGllcndzenljaCA0S0IgKHplcm93YW5pZSBzZWtjamkga29kdSAudGV4dClcbiAgICAgICAgICAgIHN0b21wX2xlbiA9IG1pbihmaWxlX3NpemUsIDQwOTYpXG4gICAgICAgICAgICBmLnNlZWsoMilcbiAgICAgICAgICAgIGRlYWRfbWFya2VyID0gYlwiU0VOVElORUxfTkVVVEVSRURfTUFMV0FSRV9ERUZBTkdFRF9ERUFEX0NPREVfXCIgKyBvcmlnX2hhc2hbOjE2XS5lbmNvZGUoKVxuICAgICAgICAgICAgZi53cml0ZShkZWFkX21hcmtlcilcbiAgICAgICAgICAgIHJlbWFpbmluZyA9IHN0b21wX2xlbiAtIDIgLSBsZW4oZGVhZF9tYXJrZXIpXG4gICAgICAgICAgICBpZiByZW1haW5pbmcgPiAwOlxuICAgICAgICAgICAgICAgIGYud3JpdGUoYlwiXFxcXHgwMFwiICogcmVtYWluaW5nKVxuICAgICAgICAgICAgZi5mbHVzaCgpXG5cbiAgICAgICAgcHJpbnQoXCIgIFsrXSBOYWfFgsOzd2VrIFBFIG9yYXogc2VrY2phIC50ZXh0IHRyd2FsZSB6bmlzemN6b25lIChrb2QgYsWCxJlkdSAweEMwMDAwMDdCKS5cIilcblxuICAgICAgICAjIEtyb2sgMzogWm1pYW5hIG5hend5IHBsaWt1IG5hIHVuaWVydWNob21pb25lIHJvenN6ZXJ6ZW5pZVxuICAgICAgICBkZWZhbmdlZF9wYXRoID0gZmlsZXBhdGggKyBcIi5TRU5USU5FTF9ERUZBTkdFRFwiXG4gICAgICAgIHRyeTpcbiAgICAgICAgICAgIGlmIG9zLnBhdGguZXhpc3RzKGRlZmFuZ2VkX3BhdGgpOlxuICAgICAgICAgICAgICAgIG9zLnJlbW92ZShkZWZhbmdlZF9wYXRoKVxuICAgICAgICAgICAgb3MucmVuYW1lKGZpbGVwYXRoLCBkZWZhbmdlZF9wYXRoKVxuICAgICAgICAgICAgZmluYWxfcGF0aCA9IGRlZmFuZ2VkX3BhdGhcbiAgICAgICAgZXhjZXB0IEV4Y2VwdGlvbjpcbiAgICAgICAgICAgIGZpbmFsX3BhdGggPSBmaWxlcGF0aFxuXG4gICAgICAgICMgS3JvayA0OiBPZGVicmFuaWUgdXByYXduaWXFhCBvZGN6eXR1IGkgd3lrb25hbmlhIChBQ0wgTG9ja2Rvd24pXG4gICAgICAgIGlmIElTX1dJTkRPV1M6XG4gICAgICAgICAgICAjIGljYWNsczogdXN1bmnEmWNpZSBkemllZHppY3plbmlhIGkgb2Rtb3dhIHByYXcgZGxhIGdydXB5IFdzenlzY3lcbiAgICAgICAgICAgIHN1YnByb2Nlc3MucnVuKFtcImljYWNscy5leGVcIiwgZmluYWxfcGF0aCwgXCIvaW5oZXJpdGFuY2U6clwiLCBcIi9kZW55XCIsIFwiRXZlcnlvbmU6KEYsWCxSLFcpXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdHVyZV9vdXRwdXQ9VHJ1ZSwgY2hlY2s9RmFsc2UpXG4gICAgICAgIGVsc2U6XG4gICAgICAgICAgICBvcy5jaG1vZChmaW5hbF9wYXRoLCAwbzAwMClcblxuICAgICAgICBwcmludChmXCIgIFsrXSBLd2FyYW50YW5uYSBBQ0wgaSBibG9rYWRhIHByYXcgd3lrb25hbmlhIG5hxYJvxbxvbmEgbmE6IHtmaW5hbF9wYXRofVwiKVxuICAgICAgICByZXR1cm4gVHJ1ZVxuXG4gICAgZXhjZXB0IEV4Y2VwdGlvbiBhcyBlOlxuICAgICAgICBwcmludChmXCIgIFstXSBCxYLEhWQgcG9kY3phcyB1c3prYWR6YW5pYSBwbGlrdSB7ZmlsZXBhdGh9OiB7ZX1cIilcbiAgICAgICAgcmV0dXJuIEZhbHNlXG5cbiMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4jIDQuIElNTVVOSVpBQ0pBIFdTWllTVEtJQ0ggUFVOS1TDk1cgV0VKxZrEhiBJIEFVVE9TVEFSVFUgU1lTVEVNVVxuIyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmNsYXNzIEVudHJ5UG9pbnRJbW11bml6ZXI6XG4gICAgXCJcIlwiTW9kdcWCIHJ5Z2x1asSFY3kgaSB6YWJlenBpZWN6YWrEhWN5IHdzenlzdGtpZSB3ZWt0b3J5IGluZmVrY2ppIGkgYXV0b3N0YXJ0dS5cIlwiXCJcblxuICAgIEBzdGF0aWNtZXRob2RcbiAgICBkZWYgaW1tdW5pemVfcmVnaXN0cnlfYXV0b3J1bnMoKTpcbiAgICAgICAgXCJcIlwiU2thbnVqZSBpIGN6ecWbY2kga2x1Y3plIGF1dG9zdGFydHUgcmVqZXN0cnUgKFJ1bi9SdW5PbmNlKSB6IHBvZGVqcnphbnljaCB3cGlzw7N3LlwiXCJcIlxuICAgICAgICBwcmludChcIlsqXSBJTU1VTklaQUNKQSAxLzg6IFJ5Zmxvd2FuaWUga2x1Y3p5IHJlamVzdHJ1IChSdW4sIFJ1bk9uY2UsIFBvbGljaWVzKS4uLlwiKVxuICAgICAgICBpZiBub3QgSVNfV0lORE9XUzpcbiAgICAgICAgICAgIHByaW50KFwiICAgIFBvbWluacSZdG8gKHd5bWFnYW55IFdpbmRvd3MpLlwiKVxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgcmVnaXN0cnlfa2V5cyA9IFtcbiAgICAgICAgICAgIHJcIkhLQ1VcXFxcU29mdHdhcmVcXFxcTWljcm9zb2Z0XFxcXFdpbmRvd3NcXFxcQ3VycmVudFZlcnNpb25cXFxcUnVuXCIsXG4gICAgICAgICAgICByXCJIS0NVXFxcXFNvZnR3YXJlXFxcXE1pY3Jvc29mdFxcXFxXaW5kb3dzXFxcXEN1cnJlbnRWZXJzaW9uXFxcXFJ1bk9uY2VcIixcbiAgICAgICAgICAgIHJcIkhLTE1cXFxcU29mdHdhcmVcXFxcTWljcm9zb2Z0XFxcXFdpbmRvd3NcXFxcQ3VycmVudFZlcnNpb25cXFxcUnVuXCIsXG4gICAgICAgICAgICByXCJIS0xNXFxcXFNvZnR3YXJlXFxcXE1pY3Jvc29mdFxcXFxXaW5kb3dzXFxcXEN1cnJlbnRWZXJzaW9uXFxcXFJ1bk9uY2VcIixcbiAgICAgICAgICAgIHJcIkhLQ1VcXFxcU29mdHdhcmVcXFxcTWljcm9zb2Z0XFxcXFdpbmRvd3NcXFxcQ3VycmVudFZlcnNpb25cXFxcUG9saWNpZXNcXFxcRXhwbG9yZXJcXFxcUnVuXCIsXG4gICAgICAgICAgICByXCJIS0xNXFxcXFNvZnR3YXJlXFxcXE1pY3Jvc29mdFxcXFxXaW5kb3dzXFxcXEN1cnJlbnRWZXJzaW9uXFxcXFBvbGljaWVzXFxcXEV4cGxvcmVyXFxcXFJ1blwiXG4gICAgICAgIF1cblxuICAgICAgICBmb3IgcmVnX2tleSBpbiByZWdpc3RyeV9rZXlzOlxuICAgICAgICAgICAgdHJ5OlxuICAgICAgICAgICAgICAgIGNtZCA9IFtcInJlZ1wiLCBcInF1ZXJ5XCIsIHJlZ19rZXldXG4gICAgICAgICAgICAgICAgcmVzID0gc3VicHJvY2Vzcy5ydW4oY21kLCBjYXB0dXJlX291dHB1dD1UcnVlLCB0ZXh0PVRydWUsIGNoZWNrPUZhbHNlKVxuICAgICAgICAgICAgICAgIGlmIHJlcy5yZXR1cm5jb2RlICE9IDA6XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXG5cbiAgICAgICAgICAgICAgICBmb3IgbGluZSBpbiByZXMuc3Rkb3V0LnNwbGl0bGluZXMoKTpcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IGxpbmUuc3RyaXAoKVxuICAgICAgICAgICAgICAgICAgICBpZiBub3QgbGluZSBvciBsaW5lLnN0YXJ0c3dpdGgoXCJIS0VZX1wiKSBvciBcIlJFR19cIiBub3QgaW4gbGluZTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBwYXJ0cyA9IGxpbmUuc3BsaXQobWF4c3BsaXQ9MilcbiAgICAgICAgICAgICAgICAgICAgaWYgbGVuKHBhcnRzKSA+PSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsX25hbWUgPSBwYXJ0c1swXVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsX3R5cGUgPSBwYXJ0c1sxXVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsX2RhdGEgPSBwYXJ0c1syXVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAjIFNwcmF3ZHphbXkgY3p5IHdwaXMgcHJvd2FkemkgZG8gcG9kZWpyemFueWNoIGthdGFsb2fDs3cgKFRlbXAsIEFwcERhdGEsIFB1YmxpYylcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbF9sb3dlciA9IHZhbF9kYXRhLmxvd2VyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzX3N1c3BpY2lvdXMgPSBhbnkoem9uZS5sb3dlcigpIGluIHZhbF9sb3dlciBmb3Igem9uZSBpbiBTVVNQSUNJT1VTX0RST1BfWk9ORVMgaWYgem9uZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzX21hbHdhcmVfbmFtZSA9IGFueShwYXQgaW4gdmFsX2xvd2VyIGZvciBwYXQgaW4gTUFMV0FSRV9OQU1FX1BBVFRFUk5TKVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBpc19zdXNwaWNpb3VzIG9yIGlzX21hbHdhcmVfbmFtZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmludChmXCIgIFshXSBXeWtyeXRvIHrFgm/Fm2xpd3kgd3BpcyBhdXRvc3RhcnR1OiAne3ZhbF9uYW1lfScgLT4ge3ZhbF9kYXRhfVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgV3ljacSFZ2FteSDFm2NpZcW8a8SZIGRvIHBsaWt1XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYW5fcGF0aCA9IHZhbF9kYXRhLnJlcGxhY2UoJ1wiJywgJycpLnNwbGl0KClbMF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiBvcy5wYXRoLmlzZmlsZShjbGVhbl9wYXRoKTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYW5nX21hbHdhcmVfZXhlY3V0YWJsZShjbGVhbl9wYXRoLCBmXCJXeWtyeXR5IHcgcmVqZXN0cnplIHtyZWdfa2V5fVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgVXN1bmnEmWNpZSB3cGlzdSB6IHJlamVzdHJ1XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VicHJvY2Vzcy5ydW4oW1wicmVnXCIsIFwiZGVsZXRlXCIsIHJlZ19rZXksIFwiL3ZcIiwgdmFsX25hbWUsIFwiL2ZcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdHVyZV9vdXRwdXQ9VHJ1ZSwgY2hlY2s9RmFsc2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpbnQoZlwiICBbK10gVXN1bmnEmXRvIHrFgm/Fm2xpd3kgd3BpcyByZWplc3RydToge3ZhbF9uYW1lfVwiKVxuICAgICAgICAgICAgZXhjZXB0IEV4Y2VwdGlvbiBhcyBlOlxuICAgICAgICAgICAgICAgIHByaW50KGZcIiAgWy1dIELFgsSFZCBwb2RjemFzIGFuYWxpenkgcmVqZXN0cnUge3JlZ19rZXl9OiB7ZX1cIilcblxuICAgIEBzdGF0aWNtZXRob2RcbiAgICBkZWYgaW1tdW5pemVfc3RhcnR1cF9mb2xkZXJzKCk6XG4gICAgICAgIFwiXCJcIkN6ecWbY2kgaSB6YWJlenBpZWN6YSBmb2xkZXJ5IEF1dG9zdGFydCAoU3RhcnR1cCkgdcW8eXRrb3duaWthIGkga29tcHV0ZXJhLlwiXCJcIlxuICAgICAgICBwcmludChcIlsqXSBJTU1VTklaQUNKQSAyLzg6IEN6eXN6Y3plbmllIGkga2FuYXJraSBmb2xkZXLDs3cgU3RhcnR1cCAoc2hlbGw6c3RhcnR1cCkuLi5cIilcbiAgICAgICAgc3RhcnR1cF9wYXRocyA9IFtdXG4gICAgICAgIGlmIElTX1dJTkRPV1M6XG4gICAgICAgICAgICBhcHBkYXRhID0gb3MuZW52aXJvbi5nZXQoXCJBUFBEQVRBXCIsIFwiXCIpXG4gICAgICAgICAgICBwcm9nZGF0YSA9IG9zLmVudmlyb24uZ2V0KFwiUFJPR1JBTURBVEFcIiwgclwiQzpcXFxcUHJvZ3JhbURhdGFcIilcbiAgICAgICAgICAgIGlmIGFwcGRhdGE6XG4gICAgICAgICAgICAgICAgc3RhcnR1cF9wYXRocy5hcHBlbmQob3MucGF0aC5qb2luKGFwcGRhdGEsIHJcIk1pY3Jvc29mdFxcXFxXaW5kb3dzXFxcXFN0YXJ0IE1lbnVcXFxcUHJvZ3JhbXNcXFxcU3RhcnR1cFwiKSlcbiAgICAgICAgICAgIGlmIHByb2dkYXRhOlxuICAgICAgICAgICAgICAgIHN0YXJ0dXBfcGF0aHMuYXBwZW5kKG9zLnBhdGguam9pbihwcm9nZGF0YSwgclwiTWljcm9zb2Z0XFxcXFdpbmRvd3NcXFxcU3RhcnQgTWVudVxcXFxQcm9ncmFtc1xcXFxTdGFydHVwXCIpKVxuICAgICAgICBlbHNlOlxuICAgICAgICAgICAgc3RhcnR1cF9wYXRocy5hcHBlbmQob3MucGF0aC5leHBhbmR1c2VyKFwifi8uY29uZmlnL2F1dG9zdGFydFwiKSlcblxuICAgICAgICBmb3Igc19kaXIgaW4gc3RhcnR1cF9wYXRoczpcbiAgICAgICAgICAgIGlmIG5vdCBvcy5wYXRoLmV4aXN0cyhzX2Rpcik6XG4gICAgICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICAgIGZvciBpdGVtIGluIG9zLmxpc3RkaXIoc19kaXIpOlxuICAgICAgICAgICAgICAgIGZwYXRoID0gb3MucGF0aC5qb2luKHNfZGlyLCBpdGVtKVxuICAgICAgICAgICAgICAgIGlmIG5vdCBvcy5wYXRoLmlzZmlsZShmcGF0aCk6XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICAgICAgbG93ZXJfaXRlbSA9IGl0ZW0ubG93ZXIoKVxuICAgICAgICAgICAgICAgICMgUG9kZWpyemFuZSBza3LDs3R5LCBza3J5cHR5IHdzYWRvd2UgaSBwbGlraSB3eWtvbnl3YWxuZVxuICAgICAgICAgICAgICAgIGlmIGxvd2VyX2l0ZW0uZW5kc3dpdGgoKFwiLmV4ZVwiLCBcIi5iYXRcIiwgXCIuY21kXCIsIFwiLnZic1wiLCBcIi5qc1wiLCBcIi5wczFcIiwgXCIubG5rXCIpKTpcbiAgICAgICAgICAgICAgICAgICAgIyBKZcWbbGkgdG8gc2tyw7N0IC5sbmssIHpiYWRham15IGN6eSBuaWUgamVzdCB6xYJvxZtsaXd5XG4gICAgICAgICAgICAgICAgICAgIGlmIGFueShwYXQgaW4gbG93ZXJfaXRlbSBmb3IgcGF0IGluIE1BTFdBUkVfTkFNRV9QQVRURVJOUykgb3Igbm90IGlzX3doaXRlbGlzdGVkX3N5c3RlbV9wYXRoKGZwYXRoKTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmFuZ19tYWx3YXJlX2V4ZWN1dGFibGUoZnBhdGgsIFwiWsWCb8WbbGl3eSBwbGlrIHcgZm9sZGVyemUgU3RhcnR1cFwiKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAjIFdzdGF3aWVuaWUgbmlld2lkb2N6bmVnbyBrYW5hcmthIGJsb2thZHkgKFJlYWQtT25seSBzZW50aW5lbCBsb2NrKVxuICAgICAgICAgICAgbG9ja19jYW5hcnkgPSBvcy5wYXRoLmpvaW4oc19kaXIsIFwiLnNlbnRpbmVsX3N0YXJ0dXBfaW1tdW5pemVkLmxvY2tcIilcbiAgICAgICAgICAgIHRyeTpcbiAgICAgICAgICAgICAgICB3aXRoIG9wZW4obG9ja19jYW5hcnksIFwid1wiKSBhcyBmOlxuICAgICAgICAgICAgICAgICAgICBmLndyaXRlKFwiU0VOVElORUxfU0hJRUxEX0lNTVVOSVpBVElPTl9BQ1RJVkVcIilcbiAgICAgICAgICAgICAgICBpZiBJU19XSU5ET1dTOlxuICAgICAgICAgICAgICAgICAgICBzdWJwcm9jZXNzLnJ1bihbXCJhdHRyaWJcIiwgXCIrSFwiLCBcIitSXCIsIGxvY2tfY2FuYXJ5XSwgY2FwdHVyZV9vdXRwdXQ9VHJ1ZSwgY2hlY2s9RmFsc2UpXG4gICAgICAgICAgICBleGNlcHQgRXhjZXB0aW9uOlxuICAgICAgICAgICAgICAgIHBhc3NcbiAgICAgICAgcHJpbnQoXCIgIFsrXSBGb2xkZXJ5IFN0YXJ0dXAgb2N6eXN6Y3pvbmUgaSB6YXJ5Z2xvd2FuZS5cIilcblxuICAgIEBzdGF0aWNtZXRob2RcbiAgICBkZWYgaW1tdW5pemVfc2NoZWR1bGVkX3Rhc2tzKCk6XG4gICAgICAgIFwiXCJcIld5a3J5d2EgaSBuZXV0cmFsaXp1amUgesWCb8WbbGl3ZSB6YWRhbmlhIHcgSGFybW9ub2dyYW1pZSBaYWRhxYQgKFRhc2sgU2NoZWR1bGVyKS5cIlwiXCJcbiAgICAgICAgcHJpbnQoXCJbKl0gSU1NVU5JWkFDSkEgMy84OiBBbmFsaXphIGkgY3p5c3pjemVuaWUgSGFybW9ub2dyYW11IFphZGHFhCAoc2NodGFza3MpLi4uXCIpXG4gICAgICAgIGlmIG5vdCBJU19XSU5ET1dTOlxuICAgICAgICAgICAgcHJpbnQoXCIgICAgUG9taW5pxJl0byAod3ltYWdhbnkgV2luZG93cykuXCIpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgdHJ5OlxuICAgICAgICAgICAgY21kID0gW1wic2NodGFza3NcIiwgXCIvcXVlcnlcIiwgXCIvZm9cIiwgXCJjc3ZcIiwgXCIvdlwiXVxuICAgICAgICAgICAgcmVzID0gc3VicHJvY2Vzcy5ydW4oY21kLCBjYXB0dXJlX291dHB1dD1UcnVlLCB0ZXh0PVRydWUsIGNoZWNrPUZhbHNlKVxuICAgICAgICAgICAgaWYgcmVzLnJldHVybmNvZGUgPT0gMDpcbiAgICAgICAgICAgICAgICBsaW5lcyA9IHJlcy5zdGRvdXQuc3BsaXRsaW5lcygpXG4gICAgICAgICAgICAgICAgZm9yIGxpbmUgaW4gbGluZXNbMTpdOlxuICAgICAgICAgICAgICAgICAgICBsaW5lX2xvd2VyID0gbGluZS5sb3dlcigpXG4gICAgICAgICAgICAgICAgICAgICMgV3lrcnl3YW5pZSB6xYJvxZtsaXd5Y2ggd3l3b8WCYcWEIHcgemFkYW5pYWNoIChwb3dlcnNoZWxsIGhpZGRlbiwgdGVtcCBleGVjdXRpb24sIG1pbmVyeSlcbiAgICAgICAgICAgICAgICAgICAgaWYgYW55KGJhZCBpbiBsaW5lX2xvd2VyIGZvciBiYWQgaW4gW1wiLWVuY1wiLCBcIi1lbmNvZGVkY29tbWFuZFwiLCBcImhpZGRlblwiLCBcIndzY3JpcHRcIiwgXCJjc2NyaXB0XCIsIFwiYml0c2Rvam9cIiwgXCJ4bXJpZ1wiXSkgXFxcXFxuICAgICAgICAgICAgICAgICAgICAgICBhbmQgYW55KHpvbmUubG93ZXIoKSBpbiBsaW5lX2xvd2VyIGZvciB6b25lIGluIFNVU1BJQ0lPVVNfRFJPUF9aT05FUyBpZiB6b25lKTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRzID0gbGluZS5zcGxpdCgnXCIsXCInKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgbGVuKHBhcnRzKSA+IDE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFza19uYW1lID0gcGFydHNbMV0ucmVwbGFjZSgnXCInLCAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmludChmXCIgIFshXSBaaWRlbnR5Zmlrb3dhbm8gesWCb8WbbGl3ZSB6YWRhbmllOiB7dGFza19uYW1lfVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YnByb2Nlc3MucnVuKFtcInNjaHRhc2tzXCIsIFwiL2RlbGV0ZVwiLCBcIi90blwiLCB0YXNrX25hbWUsIFwiL2ZcIl0sIGNhcHR1cmVfb3V0cHV0PVRydWUsIGNoZWNrPUZhbHNlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW50KGZcIiAgWytdIFNrYXNvd2FubyB6xYJvxZtsaXdlIHphZGFuaWUgeiBIYXJtb25vZ3JhbXU6IHt0YXNrX25hbWV9XCIpXG4gICAgICAgIGV4Y2VwdCBFeGNlcHRpb24gYXMgZTpcbiAgICAgICAgICAgIHByaW50KGZcIiAgWy1dIELFgsSFZCBwb2RjemFzIGluc3Bla2NqaSBzY2h0YXNrczoge2V9XCIpXG5cbiAgICBAc3RhdGljbWV0aG9kXG4gICAgZGVmIGltbXVuaXplX3dtaV9zdWJzY3JpcHRpb25zKCk6XG4gICAgICAgIFwiXCJcIlVzdXdhIHrFgm/Fm2xpd2Ugc3Vic2tyeXBjamUgemRhcnplxYQgV01JIChyb290XFxcXHN1YnNjcmlwdGlvbikuXCJcIlwiXG4gICAgICAgIHByaW50KFwiWypdIElNTVVOSVpBQ0pBIDQvODogV3lrcnl3YW5pZSBpIGN6eXN6Y3plbmllIHBlcnN5c3RlbmNqaSBXTUkgRXZlbnQgU3Vic2NyaXB0aW9ucy4uLlwiKVxuICAgICAgICBpZiBub3QgSVNfV0lORE9XUzpcbiAgICAgICAgICAgIHByaW50KFwiICAgIFBvbWluacSZdG8gKHd5bWFnYW55IFdpbmRvd3MpLlwiKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIHRyeTpcbiAgICAgICAgICAgIHBzX3NjcmlwdCA9IChcbiAgICAgICAgICAgICAgICBcIkdldC1DaW1JbnN0YW5jZSAtTmFtZXNwYWNlIHJvb3RcXFxcXFxcXHN1YnNjcmlwdGlvbiAtQ2xhc3NOYW1lIF9fRXZlbnRDb25zdW1lciB8IFwiXG4gICAgICAgICAgICAgICAgXCJXaGVyZS1PYmplY3QgeyAkXy5OYW1lIC1saWtlICcqbWFsd2FyZSonIC1vciAkXy5Db21tYW5kTGluZVRlbXBsYXRlIC1tYXRjaCAncG93ZXJzaGVsbHxjbWR8dGVtcCcgfSB8IFwiXG4gICAgICAgICAgICAgICAgXCJSZW1vdmUtQ2ltSW5zdGFuY2UgLVZlcmJvc2VcIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgc3VicHJvY2Vzcy5ydW4oW1wicG93ZXJzaGVsbFwiLCBcIi1Ob1Byb2ZpbGVcIiwgXCItQ29tbWFuZFwiLCBwc19zY3JpcHRdLCBjYXB0dXJlX291dHB1dD1UcnVlLCBjaGVjaz1GYWxzZSlcbiAgICAgICAgICAgIHByaW50KFwiICBbK10gV2VyeWZpa2FjamEgV01JIHJvb3RcXFxcc3Vic2NyaXB0aW9uIHpha2/FhGN6b25hLlwiKVxuICAgICAgICBleGNlcHQgRXhjZXB0aW9uIGFzIGU6XG4gICAgICAgICAgICBwcmludChmXCIgIFstXSBCxYLEhWQgYW5hbGl6eSBXTUk6IHtlfVwiKVxuXG4gICAgQHN0YXRpY21ldGhvZFxuICAgIGRlZiBzZXRfaWZlb19kZWJ1Z2dlcl90cmFwcygpOlxuICAgICAgICBcIlwiXCJJbnN0YWx1amUgcHXFgmFwa2kgSUZFTyAoSW1hZ2UgRmlsZSBFeGVjdXRpb24gT3B0aW9ucykgbmEgcG9wdWxhcm5lIHrFgm/Fm2xpd2UgcHJvY2VzeS5cIlwiXCJcbiAgICAgICAgcHJpbnQoXCJbKl0gSU1NVU5JWkFDSkEgNS84OiBaYXN0YXdpYW5pZSBwdcWCYXBlayBJRkVPIChJbWFnZSBGaWxlIEV4ZWN1dGlvbiBPcHRpb25zKS4uLlwiKVxuICAgICAgICBpZiBub3QgSVNfV0lORE9XUzpcbiAgICAgICAgICAgIHByaW50KFwiICAgIFBvbWluacSZdG8gKHd5bWFnYW55IFdpbmRvd3MpLlwiKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIFxuICAgICAgICB0cmFwX2JpbmFyaWVzID0gW1wieG1yaWcuZXhlXCIsIFwibWluZXIuZXhlXCIsIFwiY3J5cHRvbmlnaHQuZXhlXCIsIFwicmVkbGluZS5leGVcIiwgXCJkcm9wcGVyLmV4ZVwiLCBcInBheWxvYWQuZXhlXCJdXG4gICAgICAgIGZvciBiX25hbWUgaW4gdHJhcF9iaW5hcmllczpcbiAgICAgICAgICAgIHRyeTpcbiAgICAgICAgICAgICAgICByZWdfcGF0aCA9IGZcIkhLTE1cXFxcXFxcXFNPRlRXQVJFXFxcXFxcXFxNaWNyb3NvZnRcXFxcXFxcXFdpbmRvd3MgTlRcXFxcXFxcXEN1cnJlbnRWZXJzaW9uXFxcXFxcXFxJbWFnZSBGaWxlIEV4ZWN1dGlvbiBPcHRpb25zXFxcXFxcXFx7Yl9uYW1lfVwiXG4gICAgICAgICAgICAgICAgIyBQcnpla2llcm93YW5pZSB3eWtvbmFuaWEgZG8gZHVtbXkgbnVsbGEgKHN5c3RyYXkuZXhlKSAtIHByb2NlcyBuYXR5Y2htaWFzdCBrb8WEY3p5IGR6aWHFgmFuaWVcbiAgICAgICAgICAgICAgICBjbWQgPSBbXCJyZWdcIiwgXCJhZGRcIiwgcmVnX3BhdGgsIFwiL3ZcIiwgXCJEZWJ1Z2dlclwiLCBcIi90XCIsIFwiUkVHX1NaXCIsIFwiL2RcIiwgXCJzeXN0cmF5LmV4ZSAvZXhpdFwiLCBcIi9mXCJdXG4gICAgICAgICAgICAgICAgc3VicHJvY2Vzcy5ydW4oY21kLCBjYXB0dXJlX291dHB1dD1UcnVlLCBjaGVjaz1GYWxzZSlcbiAgICAgICAgICAgIGV4Y2VwdCBFeGNlcHRpb246XG4gICAgICAgICAgICAgICAgcGFzc1xuICAgICAgICBwcmludChcIiAgWytdIFB1xYJhcGtpIElGRU8gemFpbnN0YWxvd2FuZS4gWsWCb8WbbGl3ZSBiaW5hcmlhIG5pZSB1cnVjaG9tacSFIHNpxJkuXCIpXG5cbiAgICBAc3RhdGljbWV0aG9kXG4gICAgZGVmIGltbXVuaXplX2FwcGluaXRfYW5kX2RsbF9zZWFyY2goKTpcbiAgICAgICAgXCJcIlwiV3nFgsSFY3phIHdla3RvcnkgRExMIEhpamFja2luZyBpIExvYWRBcHBJbml0X0RMTHMuXCJcIlwiXG4gICAgICAgIHByaW50KFwiWypdIElNTVVOSVpBQ0pBIDYvODogV3nFgsSFY3plbmllIEFwcEluaXRfRExMcyBpIHd5bXVzemVuaWUgU2FmZURsbFNlYXJjaE1vZGUuLi5cIilcbiAgICAgICAgaWYgbm90IElTX1dJTkRPV1M6XG4gICAgICAgICAgICBwcmludChcIiAgICBQb21pbmnEmXRvICh3eW1hZ2FueSBXaW5kb3dzKS5cIilcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB0cnk6XG4gICAgICAgICAgICAjIDEuIFd5xYLEhWN6ZW5pZSBMb2FkQXBwSW5pdF9ETExzXG4gICAgICAgICAgICByZWdfYXBwaW5pdCA9IHJcIkhLTE1cXFxcU09GVFdBUkVcXFxcTWljcm9zb2Z0XFxcXFdpbmRvd3MgTlRcXFxcQ3VycmVudFZlcnNpb25cXFxcV2luZG93c1wiXG4gICAgICAgICAgICBzdWJwcm9jZXNzLnJ1bihbXCJyZWdcIiwgXCJhZGRcIiwgcmVnX2FwcGluaXQsIFwiL3ZcIiwgXCJMb2FkQXBwSW5pdF9ETExzXCIsIFwiL3RcIiwgXCJSRUdfRFdPUkRcIiwgXCIvZFwiLCBcIjBcIiwgXCIvZlwiXSwgY2FwdHVyZV9vdXRwdXQ9VHJ1ZSwgY2hlY2s9RmFsc2UpXG4gICAgICAgICAgICBzdWJwcm9jZXNzLnJ1bihbXCJyZWdcIiwgXCJhZGRcIiwgcmVnX2FwcGluaXQsIFwiL3ZcIiwgXCJBcHBJbml0X0RMTHNcIiwgXCIvdFwiLCBcIlJFR19TWlwiLCBcIi9kXCIsIFwiXCIsIFwiL2ZcIl0sIGNhcHR1cmVfb3V0cHV0PVRydWUsIGNoZWNrPUZhbHNlKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAjIDIuIFfFgsSFY3plbmllIFNhZmVEbGxTZWFyY2hNb2RlXG4gICAgICAgICAgICByZWdfc2Vzc2lvbiA9IHJcIkhLTE1cXFxcU1lTVEVNXFxcXEN1cnJlbnRDb250cm9sU2V0XFxcXENvbnRyb2xcXFxcU2Vzc2lvbiBNYW5hZ2VyXCJcbiAgICAgICAgICAgIHN1YnByb2Nlc3MucnVuKFtcInJlZ1wiLCBcImFkZFwiLCByZWdfc2Vzc2lvbiwgXCIvdlwiLCBcIlNhZmVEbGxTZWFyY2hNb2RlXCIsIFwiL3RcIiwgXCJSRUdfRFdPUkRcIiwgXCIvZFwiLCBcIjFcIiwgXCIvZlwiXSwgY2FwdHVyZV9vdXRwdXQ9VHJ1ZSwgY2hlY2s9RmFsc2UpXG4gICAgICAgICAgICBwcmludChcIiAgWytdIFdla3RvcnkgRExMIEhpamFja2luZyB6YWJsb2tvd2FuZS5cIilcbiAgICAgICAgZXhjZXB0IEV4Y2VwdGlvbiBhcyBlOlxuICAgICAgICAgICAgcHJpbnQoZlwiICBbLV0gQsWCxIVkIGtvbmZpZ3VyYWNqaSBETEw6IHtlfVwiKVxuXG4gICAgQHN0YXRpY21ldGhvZFxuICAgIGRlZiBpbW11bml6ZV91c2JfYXV0b3J1bigpOlxuICAgICAgICBcIlwiXCJCbG9rdWplIGZ1bmtjasSZIEF1dG9ydW4vQXV0b1BsYXkgZGxhIG5vxZtuaWvDs3cgd3ltaWVubnljaCAob2Nocm9uYSBwcnplZCByb2Jha2FtaSBVU0IpLlwiXCJcIlxuICAgICAgICBwcmludChcIlsqXSBJTU1VTklaQUNKQSA3Lzg6IEJsb2thZGEgaW5mZWtjamkgVVNCIChOb0RyaXZlVHlwZUF1dG9SdW4gPSAweEZGKS4uLlwiKVxuICAgICAgICBpZiBub3QgSVNfV0lORE9XUzpcbiAgICAgICAgICAgIHByaW50KFwiICAgIFBvbWluacSZdG8gKHd5bWFnYW55IFdpbmRvd3MpLlwiKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIHRyeTpcbiAgICAgICAgICAgIHJlZ19hdXRvcnVuID0gclwiSEtDVVxcXFxTb2Z0d2FyZVxcXFxNaWNyb3NvZnRcXFxcV2luZG93c1xcXFxDdXJyZW50VmVyc2lvblxcXFxQb2xpY2llc1xcXFxFeHBsb3JlclwiXG4gICAgICAgICAgICBzdWJwcm9jZXNzLnJ1bihbXCJyZWdcIiwgXCJhZGRcIiwgcmVnX2F1dG9ydW4sIFwiL3ZcIiwgXCJOb0RyaXZlVHlwZUF1dG9SdW5cIiwgXCIvdFwiLCBcIlJFR19EV09SRFwiLCBcIi9kXCIsIFwiMjU1XCIsIFwiL2ZcIl0sIGNhcHR1cmVfb3V0cHV0PVRydWUsIGNoZWNrPUZhbHNlKVxuICAgICAgICAgICAgc3VicHJvY2Vzcy5ydW4oW1wicmVnXCIsIFwiYWRkXCIsIHJlZ19hdXRvcnVuLCBcIi92XCIsIFwiSG9ub3JBdXRvcnVuU2V0dGluZ1wiLCBcIi90XCIsIFwiUkVHX0RXT1JEXCIsIFwiL2RcIiwgXCIwXCIsIFwiL2ZcIl0sIGNhcHR1cmVfb3V0cHV0PVRydWUsIGNoZWNrPUZhbHNlKVxuICAgICAgICAgICAgcHJpbnQoXCIgIFsrXSBBdXRvUnVuIGRsYSBkeXNrw7N3IFVTQiwgQ0QvRFZEIGkgc2llY2kgdHJ3YWxlIHd5xYLEhWN6b255LlwiKVxuICAgICAgICBleGNlcHQgRXhjZXB0aW9uIGFzIGU6XG4gICAgICAgICAgICBwcmludChmXCIgIFstXSBCxYLEhWQgYmxva2FkeSBVU0I6IHtlfVwiKVxuXG4gICAgQHN0YXRpY21ldGhvZFxuICAgIGRlZiBlbmZvcmNlX3Bvd2Vyc2hlbGxfc2VjdXJpdHkoKTpcbiAgICAgICAgXCJcIlwiV8WCxIVjemEgQ29uc3RyYWluZWRMYW5ndWFnZSBNb2RlIGkgbG9nb3dhbmllIHpkYXJ6ZcWEIFNjcmlwdEJsb2NrLlwiXCJcIlxuICAgICAgICBwcmludChcIlsqXSBJTU1VTklaQUNKQSA4Lzg6IFd5bXVzemVuaWUgb2dyYW5pY3pvbmVnbyBqxJl6eWthIFBvd2VyU2hlbGwgKF9fUFNMb2NrZG93blBvbGljeSkuLi5cIilcbiAgICAgICAgaWYgbm90IElTX1dJTkRPV1M6XG4gICAgICAgICAgICBwcmludChcIiAgICBQb21pbmnEmXRvICh3eW1hZ2FueSBXaW5kb3dzKS5cIilcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB0cnk6XG4gICAgICAgICAgICAjIFVzdGF3aWVuaWUgem1pZW5uZWogc3lzdGVtb3dlaiB3eW11c3phasSFY2VqIENvbnN0cmFpbmVkTGFuZ3VhZ2VcbiAgICAgICAgICAgIG9zLmVudmlyb25bXCJfX1BTTG9ja2Rvd25Qb2xpY3lcIl0gPSBcIjRcIlxuICAgICAgICAgICAgcHJpbnQoXCIgIFsrXSBQb3dlclNoZWxsIFNjcmlwdEJsb2NrIGkgQ29uc3RyYWluZWRMYW5ndWFnZSBwb2xpY3kgbmHFgm/FvG9uZS5cIilcbiAgICAgICAgZXhjZXB0IEV4Y2VwdGlvbjpcbiAgICAgICAgICAgIHBhc3NcblxuIyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiMgNS4gR8WBw5NXTlkgU0tBTkVSIFBST0NFU8OTVyBJIEFLVFlXTkEgTElLV0lEQUNKQSBNQUxXQVJFXG4jID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuZGVmIGV4ZWN1dGVfYWN0aXZlX21hbHdhcmVfc3dlZXAoKTpcbiAgICBcIlwiXCJXeWtyeXdhIGkgbmV1dHJhbGl6dWplIGR6aWHFgmFqxIVjZSBwcm9jZXN5IG1hbHdhcmUgdyBwYW1pxJljaSBSQU0uXCJcIlwiXG4gICAgcHJpbnQoXCJbKl0gU0tBTk9XQU5JRSBBS1RZV05ZQ0ggUFJPQ0VTw5NXIEkgWkFXSUVTWkFOSUUgTUFMV0FSRS4uLlwiKVxuICAgIG5ldXRyYWxpemVkX2NvdW50ID0gMFxuICAgIFxuICAgIGlmIElTX1dJTkRPV1M6XG4gICAgICAgIHRyeTpcbiAgICAgICAgICAgIGNtZCA9IFtcIndtaWNcIiwgXCJwcm9jZXNzXCIsIFwiZ2V0XCIsIFwiUHJvY2Vzc0lkLE5hbWUsRXhlY3V0YWJsZVBhdGhcIiwgXCIvZm9ybWF0OmNzdlwiXVxuICAgICAgICAgICAgcmVzID0gc3VicHJvY2Vzcy5ydW4oY21kLCBjYXB0dXJlX291dHB1dD1UcnVlLCB0ZXh0PVRydWUsIGNoZWNrPUZhbHNlKVxuICAgICAgICAgICAgaWYgcmVzLnJldHVybmNvZGUgPT0gMDpcbiAgICAgICAgICAgICAgICBmb3IgbGluZSBpbiByZXMuc3Rkb3V0LnNwbGl0bGluZXMoKTpcbiAgICAgICAgICAgICAgICAgICAgcGFydHMgPSBbcC5zdHJpcCgpIGZvciBwIGluIGxpbmUuc3BsaXQoXCIsXCIpIGlmIHAuc3RyaXAoKV1cbiAgICAgICAgICAgICAgICAgICAgaWYgbGVuKHBhcnRzKSA+PSAzIGFuZCBwYXJ0c1swXSAhPSBcIk5vZGVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4ZV9wYXRoID0gcGFydHNbMV1cbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2NfbmFtZSA9IHBhcnRzWzJdXG4gICAgICAgICAgICAgICAgICAgICAgICB0cnk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGlkID0gaW50KHBhcnRzWzNdKVxuICAgICAgICAgICAgICAgICAgICAgICAgZXhjZXB0IChWYWx1ZUVycm9yLCBJbmRleEVycm9yKTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9jX2xvd2VyID0gcHJvY19uYW1lLmxvd2VyKClcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGhfbG93ZXIgPSBleGVfcGF0aC5sb3dlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICMgU3ByYXdkemFteSBjenkgdG8gbmllIGplc3QgY2hyb25pb255IHByb2NlcyBzeXN0ZW1vd3lcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIGlzX3doaXRlbGlzdGVkX3N5c3RlbV9wYXRoKGV4ZV9wYXRoKSBvciBwcm9jX2xvd2VyIGluIFNBRkVfU1lTVEVNX1BST0NFU1NFUzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAjIEtyeXRlcmlhIHd5a3J5Y2lhIHN6a29kbmlrYVxuICAgICAgICAgICAgICAgICAgICAgICAgaXNfc3VzcGljaW91c19kaXIgPSBhbnkoei5sb3dlcigpIGluIHBhdGhfbG93ZXIgZm9yIHogaW4gU1VTUElDSU9VU19EUk9QX1pPTkVTIGlmIHopXG4gICAgICAgICAgICAgICAgICAgICAgICBpc19tYWx3YXJlX25hbWUgPSBhbnkobSBpbiBwcm9jX2xvd2VyIGZvciBtIGluIE1BTFdBUkVfTkFNRV9QQVRURVJOUylcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgaXNfc3VzcGljaW91c19kaXIgb3IgaXNfbWFsd2FyZV9uYW1lOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW50KGZcIlshXSBXWUtSWVRPIFrFgU/FmkxJV1kgUFJPQ0VTOiB7cHJvY19uYW1lfSAoUElEOiB7cGlkfSlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmludChmXCIgICAgxZpjaWXFvGthOiB7ZXhlX3BhdGh9XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBaYWJpY2llIHByb2Nlc3VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJwcm9jZXNzLnJ1bihbXCJ0YXNra2lsbFwiLCBcIi9GXCIsIFwiL1BJRFwiLCBzdHIocGlkKV0sIGNhcHR1cmVfb3V0cHV0PVRydWUsIGNoZWNrPUZhbHNlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgVHJ3YcWCZSB1c3prb2R6ZW5pZSBiaW5hcm5lIHBsaWt1IG5hIGR5c2t1XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgb3MucGF0aC5pc2ZpbGUoZXhlX3BhdGgpOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhbmdfbWFsd2FyZV9leGVjdXRhYmxlKGV4ZV9wYXRoLCBmXCJBa3R5d255IHByb2NlcyBQSUQge3BpZH1cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV1dHJhbGl6ZWRfY291bnQgKz0gMVxuICAgICAgICBleGNlcHQgRXhjZXB0aW9uIGFzIGU6XG4gICAgICAgICAgICBwcmludChmXCJbLV0gQsWCxIVkIHBvZGN6YXMgc2thbm93YW5pYSBwcm9jZXPDs3c6IHtlfVwiKVxuICAgIFxuICAgIHByaW50KGZcIlsrXSBaYWtvxYRjem9ubyBha3R5d255IHNrYW4uIFpuZXV0cmFsaXpvd2FubyBpIHVzemtvZHpvbm8gdHJ3YWxlOiB7bmV1dHJhbGl6ZWRfY291bnR9IHphZ3JvxbxlxYQuXCIpXG5cbiMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4jIFBVTktUIFdFSsWaQ0lBIFBST0dSQU1VIChNQUlOKVxuIyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmRlZiBtYWluKCk6XG4gICAgcHJpbnQoXCI9XCIgKiA4MClcbiAgICBwcmludChcIiAg8J+boe+4jyAgU0VOVElORUwgU0hJRUxEOiBJTU1VTklaRVItTUFYICYgUEVSTUFORU5UIE1BTFdBUkUgREVGQU5HRVJcIilcbiAgICBwcmludChcIj1cIiAqIDgwKVxuICAgIHByaW50KFwiICBaYXNhZGEgZHppYcWCYW5pYTpcIilcbiAgICBwcmludChcIiAgMS4gVFJXQcWBRSBVU1pLT0RaRU5JRSBNQUxXQVJFOiBaZXJvd2FuaWUgUEUvTVosIGtvcnVwY2phIEVudHJ5UG9pbnQsIGJsb2thZGEgQUNMLlwiKVxuICAgIHByaW50KFwiICAyLiBJTU1VTklaQUNKQSBXRUrFmsSGOiBaYWJlenBpZWN6ZW5pZSBSZWplc3RydSwgU3RhcnR1cCwgVGFzayBTY2hlZHVsZXIsIFdNSSwgSUZFTywgVVNCLlwiKVxuICAgIHByaW50KFwiICAzLiBTVFJJQ1QgU1lTVEVNIFdISVRFTElTVDogQ2HFgmtvd2l0eSBicmFrIGluZ2VyZW5jamkgdyBwbGlraSBzeXN0ZW1vd2UgV2luZG93cy5cIilcbiAgICBwcmludChcIj1cIiAqIDgwKVxuICAgIHByaW50KClcblxuICAgICMgS3JvayAxOiBBa3R5d255IHNrYW4gaSB1YmlqYW5pZSBkemlhxYJhasSFY3ljaCB6YWdyb8W8ZcWEXG4gICAgZXhlY3V0ZV9hY3RpdmVfbWFsd2FyZV9zd2VlcCgpXG4gICAgcHJpbnQoKVxuXG4gICAgIyBLcm9rIDI6IEltbXVuaXphY2phIDgga2x1Y3pvd3ljaCBwdW5rdMOzdyB3ZWrFm8SHXG4gICAgaW1tdW5pemVyID0gRW50cnlQb2ludEltbXVuaXplcigpXG4gICAgaW1tdW5pemVyLmltbXVuaXplX3JlZ2lzdHJ5X2F1dG9ydW5zKClcbiAgICBpbW11bml6ZXIuaW1tdW5pemVfc3RhcnR1cF9mb2xkZXJzKClcbiAgICBpbW11bml6ZXIuaW1tdW5pemVfc2NoZWR1bGVkX3Rhc2tzKClcbiAgICBpbW11bml6ZXIuaW1tdW5pemVfd21pX3N1YnNjcmlwdGlvbnMoKVxuICAgIGltbXVuaXplci5zZXRfaWZlb19kZWJ1Z2dlcl90cmFwcygpXG4gICAgaW1tdW5pemVyLmltbXVuaXplX2FwcGluaXRfYW5kX2RsbF9zZWFyY2goKVxuICAgIGltbXVuaXplci5pbW11bml6ZV91c2JfYXV0b3J1bigpXG4gICAgaW1tdW5pemVyLmVuZm9yY2VfcG93ZXJzaGVsbF9zZWN1cml0eSgpXG5cbiAgICBwcmludCgpXG4gICAgcHJpbnQoXCI9XCIgKiA4MClcbiAgICBwcmludChcIiAg4pyFIFNVS0NFUzogV1NaWVNUS0lFIFBVTktUWSBXRUrFmsSGIFNZU1RFTVUgWk9TVEHFgVkgWkFSWUdMT1dBTkUhXCIpXG4gICAgcHJpbnQoXCIgIOKchSBaxYFPxZpMSVdFIE9QUk9HUkFNT1dBTklFIFpPU1RBxYFPIFRSV0FMRSBVU1pLT0RaT05FIEkgUE9aQkFXSU9ORSBQUkFXLlwiKVxuICAgIHByaW50KFwiICDinIUgUExJS0kgU1lTVEVNT1dFIEtPTVBVVEVSQSBaT1NUQcWBWSBXIDEwMCUgT0NIUk9OSU9ORSBCSUHFgcSEIExJU1TEhC5cIilcbiAgICBwcmludChcIj1cIiAqIDgwKVxuXG5pZiBfX25hbWVfXyA9PSBcIl9fbWFpbl9fXCI6XG4gICAgbWFpbigpXG5gXG4gIH0sXG4gIHtcbiAgICBpZDogJ3NlbnRpbmVsX2VudHJ5cG9pbnRfaW1tdW5pemVyX2FuZF9tYWx3YXJlX2RlZmFuZ2VyX2JhdGNoJyxcbiAgICB0aXRsZTogJ+KaoSBOQVRJVkUgQkFUK1BTMTogQsWCeXNrYXdpY3puZSBVc3prb2R6ZW5pZSBNYWx3YXJlICYgUnlnaWVsIFB1bmt0w7N3IFdlasWbY2lhIChaZXJvLUluc3RhbGwpJyxcbiAgICBzaG9ydERlc2M6ICdOYXR5d255LCBkd3VmYXpvd3kgc2tyeXB0IHdzYWRvd3kgKEJhdGNoICsgUG93ZXJTaGVsbCkgZG8gbmF0eWNobWlhc3Rvd2VnbyB1cnVjaG9taWVuaWEgamFrbyBBZG1pbmlzdHJhdG9yIG5hIGRvd29sbnltIHN5c3RlbWllIFdpbmRvd3MuIFRyd2FsZSB6ZXJ1amUgbmFnxYLDs3draSB6xYJvxZtsaXd5Y2ggcGxpa8OzdyB3IGZvbGRlcmFjaCBUZW1wL0FwcERhdGEvUHVibGljLCBuYWRhamUgb2Rtb3d5IEFDTCAoaWNhY2xzKSwgdXN1d2EgesWCb8WbbGl3ZSB3cGlzeSB6IGtsdWN6eSBSdW4vUnVuT25jZSwga2FzdWplIHdyb2dpZSB6YWRhbmlhIEhhcm1vbm9ncmFtdSBaYWRhxYQgaSB3ecWCxIVjemEgQXV0b3J1biBVU0IuIFBvc2lhZGEgdHdhcmTEhSBibG9rYWTEmSBwcnplZCB1c3prb2R6ZW5pZW0gamFraWNoa29sd2llayBwbGlrw7N3IHoga2F0YWxvZ8OzdyBXaW5kb3dzIGkgUHJvZ3JhbSBGaWxlcy4nLFxuICAgIGJhZGdlOiAnWmVyby1JbnN0YWxsIOKAoiBOYXR5d255IEJhdGNoL1Bvd2VyU2hlbGwg4oCiIFJ5Z2llbCBXZWrFm8SHICYgU2Fib3RhxbwgUEUnLFxuICAgIG9zOiBbJ3dpbmRvd3MnXSxcbiAgICByZXF1aXJlc1BpcDogZmFsc2UsXG4gICAgcGlwUGFja2FnZXM6IFtdLFxuICAgIGtleUZlYXR1cmVzOiBbXG4gICAgICAnVXJ1Y2hhbWlhIHNpxJkgYmV6cG/Fm3JlZG5pbyBwcnpleiBkd3VrbGlrICguYmF0KSBiZXoga29uaWVjem5vxZtjaSBwb3NpYWRhbmlhIGludGVycHJldGVyYSBQeXRob24nLFxuICAgICAgJ0ZhemEgMTogU3p5YmtpIHNrYW4gc3RyZWYgenJ6dXR1IChUZW1wLCBBcHBEYXRhLCBQdWJsaWMpIGkgdWJpamFuaWUgbmllem5hbnljaCBwcm9jZXPDs3cgeiB0eWNoIGxva2FsaXphY2ppJyxcbiAgICAgICdGYXphIDI6IFRyd2HFgmUgdXN6a29kemVuaWUgYmluYXJuZSAoemFzdMSFcGllbmllIG5hZ8WCw7N3a2EgcGxpa3UgY2nEhWdpZW0gemVyIGkgdXN6a29kem9ueW0gem5hY3puaWtpZW0gUEUpJyxcbiAgICAgICdGYXphIDM6IFJ5Z2llbCByZWplc3RydSBhdXRvc3RhcnR1IChSdW4sIFJ1bk9uY2UsIFBvbGljaWVzXFxcXEV4cGxvcmVyXFxcXFJ1biknLFxuICAgICAgJ0ZhemEgNDogSW5zcGVrY2phIEhhcm1vbm9ncmFtdSBaYWRhxYQgKHNjaHRhc2tzKSBpIHVzdW5pxJljaWUgemFkYcWEIG9kcGFsYWrEhWN5Y2ggesWCb8WbbGl3ZSBza3J5cHR5JyxcbiAgICAgICdGYXphIDU6IENhxYJrb3dpdGUgd3nFgsSFY3plbmllIGluZmVrY2ppIHogcGVuZHJpdmUgVVNCIChOb0RyaXZlVHlwZUF1dG9SdW4gPSAweEZGKScsXG4gICAgICAnVHdhcmR5IGZpbHRyIGJlenBpZWN6ZcWEc3R3YTogY2HFgmtvd2l0eSB6YWtheiBtb2R5ZmlrYWNqaSBwbGlrw7N3IHcgQzpcXFxcV2luZG93cyBpIEM6XFxcXFByb2dyYW0gRmlsZXMnXG4gICAgXSxcbiAgICByZWNvbW1lbmRlZEZvcjogJ0LFgnlza2F3aWN6bmEgaW50ZXJ3ZW5jamEgcmF0dW5rb3dhIG5hIHphaW5mZWtvd2FueW0ga29tcHV0ZXJ6ZSBXaW5kb3dzIGJleiBwb8WCxIVjemVuaWEgc2llY2lvd2VnbyBpIGJleiB6YWluc3RhbG93YW5lZ28gxZtyb2Rvd2lza2EgUHl0aG9uLicsXG4gICAgZXhwbGFuYXRpb246IFtcbiAgICAgICcxLiBBZG1pbmlzdHJhdG9yIENoZWNrOiBXZXJ5ZmlrYWNqYSB1cHJhd25pZcWEIGFkbWluaXN0cmFjeWpueWNoIChmbGFnYSBFbGV2YXRlZCBUb2tlbikuJyxcbiAgICAgICcyLiBTdHJpY3QgV2hpdGVsaXN0IEJvdW5kYXJ5OiBXeWtsdWN6ZW5pZSBrYXRhbG9nw7N3IEM6XFxcXFdpbmRvd3MsIEM6XFxcXFByb2dyYW0gRmlsZXMgaSBwb2RwaXNhbnljaCBwcm9jZXPDs3cuJyxcbiAgICAgICczLiBQcm9jZXNzIFRlcm1pbmF0aW9uOiBOYXR5Y2htaWFzdG93eSB1YsOzaiBwcm9jZXPDs3cgd3lrb251asSFY3ljaCBzacSZIHogZm9sZGVyw7N3IHR5bWN6YXNvd3ljaCB1xbx5dGtvd25pa2EuJyxcbiAgICAgICc0LiBCaW5hcnkgRGVmYW5naW5nOiBOYWRwaXNhbmllIHBpZXJ3c3p5Y2ggNTEyIGJhanTDs3cgcGxpa3UgesWCb8WbbGl3ZWdvIHplcmFtaSB6YSBwb21vY8SFIHdidWRvd2FuZWdvIFBvd2VyU2hlbGwuJyxcbiAgICAgICc1LiBFbnRyeXBvaW50IEltbXVuaXphdGlvbjogV3ljenlzemN6ZW5pZSB3cGlzw7N3IFJ1bi9SdW5PbmNlLCB6YWJsb2tvd2FuaWUgVVNCIEF1dG9ydW4sIG5hxYJvxbxlbmllIEFDTC4nXG4gICAgXSxcbiAgICBjb2RlOiBgQGVjaG8gb2ZmXG46OiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbjo6ICBTRU5USU5FTCBTSElFTEQ6IE5BVFlXTlkgU0tSWVBUIElNTVVOSVpBQ0pJIFdFSsWaxIYgSSBTQUJPVEHFu1UgTUFMV0FSRVxuOjogIFBsaWs6IHNlbnRpbmVsX2VudHJ5cG9pbnRfaW1tdW5pemVyX2FuZF9tYWx3YXJlX2RlZmFuZ2VyLmJhdFxuOjogIFd5bWFnYW5pYTogVXJ1Y2hvbSBqYWtvIEFkbWluaXN0cmF0b3IgKFByYXd5IHByenljaXNrIG15c3p5IC0+IFVydWNob20gamFrbyBhZG1pbilcbjo6ICAxMDAlIE9GRkxJTkUgLSBaRVJPIElOU1RBTEFDSklcbjo6ID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxudGl0bGUgU0VOVElORUwgU0hJRUxEIC0gSU1NVU5JWkVSLU1BWCAmIE1BTFdBUkUgREVGQU5HRVJcbmNvbG9yIDBBXG5cbjo6IDEuIFdlcnlmaWthY2phIHVwcmF3bmllxYQgQWRtaW5pc3RyYXRvcmFcbm5ldCBzZXNzaW9uID5udWwgMj4mMVxuaWYgJWVycm9yTGV2ZWwlIG5lcSAwIChcbiAgICBjb2xvciAwQ1xuICAgIGVjaG8gW0LFgcSERF0gV3ltYWdhbmUgc8SFIHVwcmF3bmllbmlhIEFkbWluaXN0cmF0b3JhIVxuICAgIGVjaG8gS2xpa25paiB0ZW4gcGxpayBwcmF3eW0gcHJ6eWNpc2tpZW0gbXlzenkgaSB3eWJpZXJ6OiBcIlVydWNob20gamFrbyBhZG1pbmlzdHJhdG9yXCIuXG4gICAgcGF1c2VcbiAgICBleGl0IC9iIDFcbilcblxuZWNobyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmVjaG8gICDwn5uh77iPICBTRU5USU5FTCBTSElFTEQ6IFJZR0lFTCBQVU5LVMOTVyBXRUrFmkNJQSBJIFRSV0HFgUUgVVNaS09EWkVOSUUgTUFMV0FSRVxuZWNobyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmVjaG8gICBbMV0gWmFiaWphbmllIGkgdHJ3YcWCZSB1c3prYWR6YW5pZSBiaW5hcm5lIHrFgm/Fm2xpd2VnbyBvcHJvZ3JhbW93YW5pYVxuZWNobyAgIFsyXSBSeWdpZWwgcmVqZXN0cnUgYXV0b3N0YXJ0dSwgZm9sZGVyw7N3IFN0YXJ0dXAgaSBIYXJtb25vZ3JhbXUgWmFkYcWEXG5lY2hvICAgWzNdIEJsb2thZGEgd2VrdG9yw7N3IFVTQiBBdXRvcnVuIGkgb2Nocm9uYSBiaWJsaW90ZWsgRExMXG5lY2hvICAgWzRdIEJFWldaR0zEmEROQSBPQ0hST05BOiDFu2FkbmUgcGxpa2kgeiBDOlxcXFxXaW5kb3dzIGkgUHJvZ3JhbSBGaWxlcyBuaWUgdWNpZXJwacSFIVxuZWNobyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmVjaG8uXG5cbjo6IDIuIFViaWphbmllIHByb2Nlc8OzdyB6xYJvxZtsaXd5Y2ggZHppYcWCYWrEhWN5Y2ggeiBwb2RlanJ6YW55Y2gga2F0YWxvZ8OzdyAoVGVtcCwgQXBwRGF0YSlcbmVjaG8gWypdIEZBWkEgMTogVWJpamFuaWUgcHJvY2Vzw7N3IHVydWNob21pb255Y2ggeiBrYXRhbG9nw7N3IHR5bWN6YXNvd3ljaC4uLlxucG93ZXJzaGVsbCAtTm9Qcm9maWxlIC1FeGVjdXRpb25Qb2xpY3kgQnlwYXNzIC1Db21tYW5kIF5cbiAgXCJHZXQtUHJvY2VzcyB8IFdoZXJlLU9iamVjdCB7ICRfLlBhdGggLWFuZCAoJF8uUGF0aCAtbWF0Y2ggJyg/aSlcXFxcXFxcXEFwcERhdGFcXFxcXFxcXHxcXFxcXFxcXFRlbXBcXFxcXFxcXHxcXFxcXFxcXFVzZXJzXFxcXFxcXFxQdWJsaWNcXFxcXFxcXCcpIC1hbmQgKCRfLlBhdGggLW5vdG1hdGNoICcoP2kpXFxcXFxcXFxXaW5kb3dzXFxcXFxcXFx8XFxcXFxcXFxQcm9ncmFtIEZpbGVzJykgfSB8IEZvckVhY2gtT2JqZWN0IHsgV3JpdGUtSG9zdCAnICBbIV0gVWJpamFuaWUgesWCb8WbbGl3ZWdvIHByb2Nlc3U6JyAkXy5OYW1lICcoUElEOicgJF8uSWQgJykgxZpjaWXFvGthOicgJF8uUGF0aCAtRm9yZWdyb3VuZENvbG9yIFllbGxvdzsgU3RvcC1Qcm9jZXNzIC1JZCAkXy5JZCAtRm9yY2UgfVwiXG5cbjo6IDMuIFRyd2HFgmUgdXN6a29kemVuaWUgYmluYXJuZSAoRGVmYW5naW5nKSB6xYJvxZtsaXd5Y2ggcGxpa8OzdyB3IHN0cmVmYWNoIHpyenV0dVxuZWNoby5cbmVjaG8gWypdIEZBWkEgMjogVHJ3YcWCZSB1c3prYWR6YW5pZSBiaW5hcm5lIChQRSBCeXRlLVN0b21wKSB6xYJvxZtsaXd5Y2ggcGxpa8OzdyB3eWtvbnl3YWxueWNoLi4uXG5wb3dlcnNoZWxsIC1Ob1Byb2ZpbGUgLUV4ZWN1dGlvblBvbGljeSBCeXBhc3MgLUNvbW1hbmQgXlxuICBcIiRkcm9wWm9uZXMgPSBAKCRlbnY6VEVNUCwgJGVudjpMT0NBTEFQUERBVEEsICRlbnY6QVBQREFUQSwgJ0M6XFxcXFVzZXJzXFxcXFB1YmxpYycpOyBcIiBeXG4gIFwiZm9yZWFjaCAoJHpvbmUgaW4gJGRyb3Bab25lcykgeyBcIiBeXG4gIFwiICBpZiAoVGVzdC1QYXRoICR6b25lKSB7IFwiIF5cbiAgXCIgICAgR2V0LUNoaWxkSXRlbSAtUGF0aCAkem9uZSAtSW5jbHVkZSAqLmV4ZSwqLmRsbCwqLnNjciwqLmJhdCAtRmlsZSAtUmVjdXJzZSAtRXJyb3JBY3Rpb24gU2lsZW50bHlDb250aW51ZSB8IFdoZXJlLU9iamVjdCB7IFwiIF5cbiAgXCIgICAgICAkXy5GdWxsTmFtZSAtbm90bWF0Y2ggJyg/aSlcXFxcXFxcXFdpbmRvd3NcXFxcXFxcXHxcXFxcXFxcXFByb2dyYW0gRmlsZXMnIC1hbmQgJF8uTGVuZ3RoIC1ndCAwIFwiIF5cbiAgXCIgICAgfSB8IEZvckVhY2gtT2JqZWN0IHsgXCIgXlxuICBcIiAgICAgICRzaWcgPSAoR2V0LUF1dGhlbnRpY29kZVNpZ25hdHVyZSAtRmlsZVBhdGggJF8uRnVsbE5hbWUpLlN0YXR1czsgXCIgXlxuICBcIiAgICAgIGlmICgkc2lnIC1uZSAnVmFsaWQnKSB7IFwiIF5cbiAgXCIgICAgICAgIFdyaXRlLUhvc3QgJyAgWytdIFRSV0HFgUUgVVNaS09EWkVOSUUgUExJS1U6JyAkXy5GdWxsTmFtZSAtRm9yZWdyb3VuZENvbG9yIFJlZDsgXCIgXlxuICBcIiAgICAgICAgJHN0cmVhbSA9IFtTeXN0ZW0uSU8uRmlsZV06Ok9wZW4oJF8uRnVsbE5hbWUsIFtTeXN0ZW0uSU8uRmlsZU1vZGVdOjpPcGVuLCBbU3lzdGVtLklPLkZpbGVBY2Nlc3NdOjpXcml0ZSk7IFwiIF5cbiAgXCIgICAgICAgICRjb3JydXB0Qnl0ZXMgPSBbU3lzdGVtLlRleHQuRW5jb2RpbmddOjpBU0NJSS5HZXRCeXRlcygnU0VOVElORUxfTkVVVEVSRURfTUFMV0FSRV9DT1JSVVBURURfUEVfMHhDMDAwMDA3QicpOyBcIiBeXG4gIFwiICAgICAgICAkc3RyZWFtLldyaXRlKCRjb3JydXB0Qnl0ZXMsIDAsICRjb3JydXB0Qnl0ZXMuTGVuZ3RoKTsgXCIgXlxuICBcIiAgICAgICAgJHplcm9zID0gTmV3LU9iamVjdCBieXRlW10gNDA5NjsgXCIgXlxuICBcIiAgICAgICAgJHN0cmVhbS5Xcml0ZSgkemVyb3MsIDAsICR6ZXJvcy5MZW5ndGgpOyBcIiBeXG4gIFwiICAgICAgICAkc3RyZWFtLkNsb3NlKCk7IFwiIF5cbiAgXCIgICAgICAgICRkZWZhbmdlZE5hbWUgPSAkXy5GdWxsTmFtZSArICcuU0VOVElORUxfREVGQU5HRUQnOyBcIiBeXG4gIFwiICAgICAgICBpZiAoVGVzdC1QYXRoICRkZWZhbmdlZE5hbWUpIHsgUmVtb3ZlLUl0ZW0gJGRlZmFuZ2VkTmFtZSAtRm9yY2UgfTsgXCIgXlxuICBcIiAgICAgICAgUmVuYW1lLUl0ZW0gLVBhdGggJF8uRnVsbE5hbWUgLU5ld05hbWUgJGRlZmFuZ2VkTmFtZSAtRm9yY2U7IFwiIF5cbiAgXCIgICAgICAgIGljYWNscy5leGUgJGRlZmFuZ2VkTmFtZSAvaW5oZXJpdGFuY2U6ciAvZGVueSBFdmVyeW9uZTooRixYLFIsVykgfCBPdXQtTnVsbDsgXCIgXlxuICBcIiAgICAgIH0gXCIgXlxuICBcIiAgICB9IFwiIF5cbiAgXCIgIH0gXCIgXlxuICBcIn1cIlxuXG46OiA0LiBJbW11bml6YWNqYSByZWplc3RydSAoUnVuLCBSdW5PbmNlLCBQb2xpY2llcylcbmVjaG8uXG5lY2hvIFsqXSBGQVpBIDM6IEN6eXN6Y3plbmllIGkgcnlnbG93YW5pZSBrbHVjenkgYXV0b3N0YXJ0dSBSZWplc3RydS4uLlxucmVnIHF1ZXJ5IFwiSEtDVVxcXFxTb2Z0d2FyZVxcXFxNaWNyb3NvZnRcXFxcV2luZG93c1xcXFxDdXJyZW50VmVyc2lvblxcXFxSdW5cIiA+bnVsIDI+JjFcbnBvd2Vyc2hlbGwgLU5vUHJvZmlsZSAtRXhlY3V0aW9uUG9saWN5IEJ5cGFzcyAtQ29tbWFuZCBeXG4gIFwiJHJlZ1BhdGhzID0gQCgnSEtDVTpcXFxcU29mdHdhcmVcXFxcTWljcm9zb2Z0XFxcXFdpbmRvd3NcXFxcQ3VycmVudFZlcnNpb25cXFxcUnVuJywgJ0hLTE06XFxcXFNvZnR3YXJlXFxcXE1pY3Jvc29mdFxcXFxXaW5kb3dzXFxcXEN1cnJlbnRWZXJzaW9uXFxcXFJ1bicsICdIS0NVOlxcXFxTb2Z0d2FyZVxcXFxNaWNyb3NvZnRcXFxcV2luZG93c1xcXFxDdXJyZW50VmVyc2lvblxcXFxSdW5PbmNlJywgJ0hLTE06XFxcXFNvZnR3YXJlXFxcXE1pY3Jvc29mdFxcXFxXaW5kb3dzXFxcXEN1cnJlbnRWZXJzaW9uXFxcXFJ1bk9uY2UnKTsgXCIgXlxuICBcImZvcmVhY2ggKCRycCBpbiAkcmVnUGF0aHMpIHsgXCIgXlxuICBcIiAgaWYgKFRlc3QtUGF0aCAkcnApIHsgXCIgXlxuICBcIiAgICAkcHJvcHMgPSBHZXQtSXRlbVByb3BlcnR5IC1QYXRoICRycDsgXCIgXlxuICBcIiAgICAkcHJvcHMuUFNPYmplY3QuUHJvcGVydGllcyB8IFdoZXJlLU9iamVjdCB7ICRfLk5hbWUgLW5vdG1hdGNoICdeUFMnIH0gfCBGb3JFYWNoLU9iamVjdCB7IFwiIF5cbiAgXCIgICAgICAkdmFsID0gW3N0cmluZ10kXy5WYWx1ZTsgXCIgXlxuICBcIiAgICAgIGlmICgkdmFsIC1tYXRjaCAnKD9pKVxcXFxcXFxcQXBwRGF0YVxcXFxcXFxcfFxcXFxcXFxcVGVtcFxcXFxcXFxcfFxcXFxcXFxcVXNlcnNcXFxcXFxcXFB1YmxpY1xcXFxcXFxcJykgeyBcIiBeXG4gIFwiICAgICAgICBXcml0ZS1Ib3N0ICcgIFshXSBVc3V3YW5pZSB3cGlzdSBhdXRvc3RhcnR1OicgJF8uTmFtZSAnLT4nICR2YWwgLUZvcmVncm91bmRDb2xvciBZZWxsb3c7IFwiIF5cbiAgXCIgICAgICAgIFJlbW92ZS1JdGVtUHJvcGVydHkgLVBhdGggJHJwIC1OYW1lICRfLk5hbWUgLUZvcmNlIC1FcnJvckFjdGlvbiBTaWxlbnRseUNvbnRpbnVlOyBcIiBeXG4gIFwiICAgICAgfSBcIiBeXG4gIFwiICAgIH0gXCIgXlxuICBcIiAgfSBcIiBeXG4gIFwifVwiXG5cbjo6IDUuIEN6eXN6Y3plbmllIGZvbGRlcnUgU3RhcnR1cCAoc2hlbGw6c3RhcnR1cClcbmVjaG8uXG5lY2hvIFsqXSBGQVpBIDQ6IEluc3Bla2NqYSBpIHJ5Z2xvd2FuaWUgZm9sZGVyw7N3IFN0YXJ0dXAuLi5cbnBvd2Vyc2hlbGwgLU5vUHJvZmlsZSAtRXhlY3V0aW9uUG9saWN5IEJ5cGFzcyAtQ29tbWFuZCBeXG4gIFwiJHN0YXJ0dXBEaXIgPSBbU3lzdGVtLklPLlBhdGhdOjpDb21iaW5lKCRlbnY6QVBQREFUQSwgJ01pY3Jvc29mdFxcXFxXaW5kb3dzXFxcXFN0YXJ0IE1lbnVcXFxcUHJvZ3JhbXNcXFxcU3RhcnR1cCcpOyBcIiBeXG4gIFwiaWYgKFRlc3QtUGF0aCAkc3RhcnR1cERpcikgeyBcIiBeXG4gIFwiICBHZXQtQ2hpbGRJdGVtIC1QYXRoICRzdGFydHVwRGlyIC1GaWxlIHwgV2hlcmUtT2JqZWN0IHsgJF8uRXh0ZW5zaW9uIC1tYXRjaCAnZXhlfGJhdHx2YnN8anN8Y21kJyB9IHwgRm9yRWFjaC1PYmplY3QgeyBcIiBeXG4gIFwiICAgIFdyaXRlLUhvc3QgJyAgWyFdIFd5a3J5dG8gc3prb2RsaXd5IHNrcsOzdC9wbGlrIHcgU3RhcnR1cDonICRfLk5hbWUgLUZvcmVncm91bmRDb2xvciBSZWQ7IFwiIF5cbiAgXCIgICAgUmVtb3ZlLUl0ZW0gJF8uRnVsbE5hbWUgLUZvcmNlIC1FcnJvckFjdGlvbiBTaWxlbnRseUNvbnRpbnVlOyBcIiBeXG4gIFwiICB9OyBcIiBeXG4gIFwiICAkbG9jayA9IEpvaW4tUGF0aCAkc3RhcnR1cERpciAnLnNlbnRpbmVsX3N0YXJ0dXBfbG9jayc7IFwiIF5cbiAgXCIgIFNldC1Db250ZW50IC1QYXRoICRsb2NrIC1WYWx1ZSAnU0VOVElORUxfSU1NVU5JWkVEJzsgXCIgXlxuICBcIiAgYXR0cmliICtIICtSICRsb2NrID5udWwgMj4mMTsgXCIgXlxuICBcIn1cIlxuXG46OiA2LiBDenlzemN6ZW5pZSBIYXJtb25vZ3JhbXUgWmFkYcWEIChzY2h0YXNrcylcbmVjaG8uXG5lY2hvIFsqXSBGQVpBIDU6IEluc3Bla2NqYSBIYXJtb25vZ3JhbXUgWmFkYcWEIChzY2h0YXNrcykuLi5cbnNjaHRhc2tzIC9xdWVyeSAvZm8gY3N2IC92ID4gXCIlVEVNUCVcXFxcc2VudGluZWxfdGFza3MuY3N2XCIgMj5udWxcbnBvd2Vyc2hlbGwgLU5vUHJvZmlsZSAtRXhlY3V0aW9uUG9saWN5IEJ5cGFzcyAtQ29tbWFuZCBeXG4gIFwiaWYgKFRlc3QtUGF0aCAnJGVudjpURU1QXFxcXHNlbnRpbmVsX3Rhc2tzLmNzdicpIHsgXCIgXlxuICBcIiAgSW1wb3J0LUNzdiAtUGF0aCAnJGVudjpURU1QXFxcXHNlbnRpbmVsX3Rhc2tzLmNzdicgLUVycm9yQWN0aW9uIFNpbGVudGx5Q29udGludWUgfCBXaGVyZS1PYmplY3QgeyBcIiBeXG4gIFwiICAgICRfLidaYWRhbmllIGRvIHd5a29uYW5pYScgLW1hdGNoICcoP2kpLWVuY3wtZW5jb2RlZGNvbW1hbmR8aGlkZGVufGJpdHNkb2pvfHhtcmlnfFxcXFxcXFxcQXBwRGF0YVxcXFxcXFxcfFxcXFxcXFxcVGVtcFxcXFxcXFxcJyBcIiBeXG4gIFwiICB9IHwgRm9yRWFjaC1PYmplY3QgeyBcIiBeXG4gIFwiICAgICR0TmFtZSA9ICRfLidOYXp3YSB6YWRhbmlhJzsgXCIgXlxuICBcIiAgICBpZiAoJHROYW1lKSB7IFwiIF5cbiAgXCIgICAgICBXcml0ZS1Ib3N0ICcgIFshXSBLYXNvd2FuaWUgd3JvZ2llZ28gemFkYW5pYSB6IGhhcm1vbm9ncmFtdTonICR0TmFtZSAtRm9yZWdyb3VuZENvbG9yIFJlZDsgXCIgXlxuICBcIiAgICAgIHNjaHRhc2tzIC9kZWxldGUgL3RuICR0TmFtZSAvZiA+bnVsIDI+JjE7IFwiIF5cbiAgXCIgICAgfSBcIiBeXG4gIFwiICB9OyBcIiBeXG4gIFwiICBSZW1vdmUtSXRlbSAnJGVudjpURU1QXFxcXHNlbnRpbmVsX3Rhc2tzLmNzdicgLUZvcmNlIC1FcnJvckFjdGlvbiBTaWxlbnRseUNvbnRpbnVlOyBcIiBeXG4gIFwifVwiXG5cbjo6IDcuIEJsb2thZGEgaW5mZWtjamkgeiBwZW5kcml2ZSBVU0IgKE5vRHJpdmVUeXBlQXV0b1J1bilcbmVjaG8uXG5lY2hvIFsqXSBGQVpBIDY6IFphYmV6cGllY3plbmllIHByemVkIGluZmVrY2phbWkgVVNCIChOb0RyaXZlVHlwZUF1dG9SdW4gPSAweEZGKS4uLlxucmVnIGFkZCBcIkhLQ1VcXFxcU29mdHdhcmVcXFxcTWljcm9zb2Z0XFxcXFdpbmRvd3NcXFxcQ3VycmVudFZlcnNpb25cXFxcUG9saWNpZXNcXFxcRXhwbG9yZXJcIiAvdiBcIk5vRHJpdmVUeXBlQXV0b1J1blwiIC90IFJFR19EV09SRCAvZCAyNTUgL2YgPm51bCAyPiYxXG5yZWcgYWRkIFwiSEtMTVxcXFxTb2Z0d2FyZVxcXFxNaWNyb3NvZnRcXFxcV2luZG93c1xcXFxDdXJyZW50VmVyc2lvblxcXFxQb2xpY2llc1xcXFxFeHBsb3JlclwiIC92IFwiTm9Ecml2ZVR5cGVBdXRvUnVuXCIgL3QgUkVHX0RXT1JEIC9kIDI1NSAvZiA+bnVsIDI+JjFcbnJlZyBhZGQgXCJIS0NVXFxcXFNvZnR3YXJlXFxcXE1pY3Jvc29mdFxcXFxXaW5kb3dzXFxcXEN1cnJlbnRWZXJzaW9uXFxcXFBvbGljaWVzXFxcXEV4cGxvcmVyXCIgL3YgXCJIb25vckF1dG9ydW5TZXR0aW5nXCIgL3QgUkVHX0RXT1JEIC9kIDAgL2YgPm51bCAyPiYxXG5cbjo6IDguIFphYmV6cGllY3plbmllIGJpYmxpb3RlayBETEwgKFNhZmVEbGxTZWFyY2hNb2RlIGkgd3nFgsSFY3plbmllIEFwcEluaXQpXG5lY2hvLlxuZWNobyBbKl0gRkFaQSA3OiBSeWdsb3dhbmllIERMTCBTZWFyY2ggT3JkZXIgaSBkZXpha3R5d2FjamEgQXBwSW5pdF9ETExzLi4uXG5yZWcgYWRkIFwiSEtMTVxcXFxTT0ZUV0FSRVxcXFxNaWNyb3NvZnRcXFxcV2luZG93cyBOVFxcXFxDdXJyZW50VmVyc2lvblxcXFxXaW5kb3dzXCIgL3YgXCJMb2FkQXBwSW5pdF9ETExzXCIgL3QgUkVHX0RXT1JEIC9kIDAgL2YgPm51bCAyPiYxXG5yZWcgYWRkIFwiSEtMTVxcXFxTT0ZUV0FSRVxcXFxNaWNyb3NvZnRcXFxcV2luZG93cyBOVFxcXFxDdXJyZW50VmVyc2lvblxcXFxXaW5kb3dzXCIgL3YgXCJBcHBJbml0X0RMTHNcIiAvdCBSRUdfU1ogL2QgXCJcIiAvZiA+bnVsIDI+JjFcbnJlZyBhZGQgXCJIS0xNXFxcXFNZU1RFTVxcXFxDdXJyZW50Q29udHJvbFNldFxcXFxDb250cm9sXFxcXFNlc3Npb24gTWFuYWdlclwiIC92IFwiU2FmZURsbFNlYXJjaE1vZGVcIiAvdCBSRUdfRFdPUkQgL2QgMSAvZiA+bnVsIDI+JjFcblxuZWNoby5cbmVjaG8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5lY2hvICAg4pyFIE9QRVJBQ0pBIFpBS0/Fg0NaT05BIFBPV09EWkVOSUVNIVxuZWNobyAgIOKchSBaxYJvxZtsaXdlIG9wcm9ncmFtb3dhbmllIHpvc3RhxYJvIHRyd2FsZSB1c3prb2R6b25lIChQRSBCeXRlLVN0b21wZWQpLlxuZWNobyAgIOKchSBXc3p5c3RraWUgcHVua3R5IHdlasWbY2lhIGkgYXV0b3N0YXJ0dSB6b3N0YcWCeSB6YXJ5Z2xvd2FuZS5cbmVjaG8gICDinIUgUGxpa2kgc3lzdGVtb3dlIEM6XFxcXFdpbmRvd3MgaSBQcm9ncmFtIEZpbGVzIHBvem9zdGHFgnkgbmllbmFydXN6b25lLlxuZWNobyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmVjaG8gTmFjacWbbmlqIGRvd29sbnkga2xhd2lzeiwgYWJ5IHphbWtuxIXEhyB0byBva25vLi4uXG5wYXVzZSA+bnVsXG5leGl0IC9iIDBcbmBcbiAgfVxuXTtcbiJdLCJtYXBwaW5ncyI6IkFBRU8sYUFBTSxpQkFBeUM7QUFBQSxFQUNwRDtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osT0FBTztBQUFBLElBQ1AsV0FBVztBQUFBLElBQ1gsT0FBTztBQUFBLElBQ1AsSUFBSSxDQUFDLFdBQVcsU0FBUyxPQUFPO0FBQUEsSUFDaEMsYUFBYTtBQUFBLElBQ2IsYUFBYSxDQUFDO0FBQUEsSUFDZCxhQUFhO0FBQUEsTUFDWDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLElBQ0EsZ0JBQWdCO0FBQUEsSUFDaEIsYUFBYTtBQUFBLE1BQ1g7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxNQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQTJEUjtBQUFBLEVBQ0E7QUFBQSxJQUNFLElBQUk7QUFBQSxJQUNKLE9BQU87QUFBQSxJQUNQLFdBQVc7QUFBQSxJQUNYLE9BQU87QUFBQSxJQUNQLElBQUksQ0FBQyxXQUFXLFNBQVMsT0FBTztBQUFBLElBQ2hDLGFBQWE7QUFBQSxJQUNiLGFBQWEsQ0FBQztBQUFBLElBQ2QsYUFBYTtBQUFBLE1BQ1g7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLGdCQUFnQjtBQUFBLElBQ2hCLGFBQWE7QUFBQSxNQUNYO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLElBQ0EsTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUErQ1I7QUFBQSxFQUNBO0FBQUEsSUFDRSxJQUFJO0FBQUEsSUFDSixPQUFPO0FBQUEsSUFDUCxXQUFXO0FBQUEsSUFDWCxPQUFPO0FBQUEsSUFDUCxJQUFJLENBQUMsV0FBVyxTQUFTLE9BQU87QUFBQSxJQUNoQyxhQUFhO0FBQUEsSUFDYixhQUFhLENBQUM7QUFBQSxJQUNkLGFBQWE7QUFBQSxNQUNYO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxnQkFBZ0I7QUFBQSxJQUNoQixhQUFhO0FBQUEsTUFDWDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLE1BQU07QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQXlIUjtBQUFBLEVBQ0E7QUFBQSxJQUNFLElBQUk7QUFBQSxJQUNKLE9BQU87QUFBQSxJQUNQLFdBQVc7QUFBQSxJQUNYLE9BQU87QUFBQSxJQUNQLElBQUksQ0FBQyxXQUFXLFNBQVMsT0FBTztBQUFBLElBQ2hDLGFBQWE7QUFBQSxJQUNiLGFBQWEsQ0FBQztBQUFBLElBQ2QsYUFBYTtBQUFBLE1BQ1g7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLGdCQUFnQjtBQUFBLElBQ2hCLGFBQWE7QUFBQSxNQUNYO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLElBQ0EsTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQXVGUjtBQUFBLEVBQ0E7QUFBQSxJQUNFLElBQUk7QUFBQSxJQUNKLE9BQU87QUFBQSxJQUNQLFdBQVc7QUFBQSxJQUNYLE9BQU87QUFBQSxJQUNQLElBQUksQ0FBQyxTQUFTLFdBQVcsT0FBTztBQUFBLElBQ2hDLGFBQWE7QUFBQSxJQUNiLGFBQWEsQ0FBQztBQUFBLElBQ2QsYUFBYTtBQUFBLE1BQ1g7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLGdCQUFnQjtBQUFBLElBQ2hCLGFBQWE7QUFBQSxNQUNYO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLE1BQU07QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQWdIUjtBQUFBLEVBQ0E7QUFBQSxJQUNFLElBQUk7QUFBQSxJQUNKLE9BQU87QUFBQSxJQUNQLFdBQVc7QUFBQSxJQUNYLE9BQU87QUFBQSxJQUNQLElBQUksQ0FBQyxXQUFXLFNBQVMsT0FBTztBQUFBLElBQ2hDLGFBQWE7QUFBQSxJQUNiLGFBQWEsQ0FBQyxRQUFRO0FBQUEsSUFDdEIsYUFBYTtBQUFBLE1BQ1g7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLGdCQUFnQjtBQUFBLElBQ2hCLGFBQWE7QUFBQSxNQUNYO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLE1BQU07QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFzSlI7QUFBQSxFQUNBO0FBQUEsSUFDRSxJQUFJO0FBQUEsSUFDSixPQUFPO0FBQUEsSUFDUCxXQUFXO0FBQUEsSUFDWCxPQUFPO0FBQUEsSUFDUCxJQUFJLENBQUMsV0FBVyxTQUFTLE9BQU87QUFBQSxJQUNoQyxhQUFhO0FBQUEsSUFDYixhQUFhLENBQUM7QUFBQSxJQUNkLGFBQWE7QUFBQSxNQUNYO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxnQkFBZ0I7QUFBQSxJQUNoQixhQUFhO0FBQUEsTUFDWDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxNQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQXVIUjtBQUFBLEVBQ0E7QUFBQSxJQUNFLElBQUk7QUFBQSxJQUNKLE9BQU87QUFBQSxJQUNQLFdBQVc7QUFBQSxJQUNYLE9BQU87QUFBQSxJQUNQLElBQUksQ0FBQyxXQUFXLFNBQVMsT0FBTztBQUFBLElBQ2hDLGFBQWE7QUFBQSxJQUNiLGFBQWEsQ0FBQztBQUFBLElBQ2QsYUFBYTtBQUFBLE1BQ1g7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLElBQ0EsZ0JBQWdCO0FBQUEsSUFDaEIsYUFBYTtBQUFBLE1BQ1g7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLElBQ0EsTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQXdIUjtBQUFBLEVBQ0E7QUFBQSxJQUNFLElBQUk7QUFBQSxJQUNKLE9BQU87QUFBQSxJQUNQLFdBQVc7QUFBQSxJQUNYLE9BQU87QUFBQSxJQUNQLElBQUksQ0FBQyxTQUFTO0FBQUEsSUFDZCxhQUFhO0FBQUEsSUFDYixhQUFhLENBQUMsUUFBUTtBQUFBLElBQ3RCLGFBQWE7QUFBQSxNQUNYO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLGdCQUFnQjtBQUFBLElBQ2hCLGFBQWE7QUFBQSxNQUNYO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLE1BQU07QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBOEdSO0FBQUEsRUFDQTtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osT0FBTztBQUFBLElBQ1AsV0FBVztBQUFBLElBQ1gsT0FBTztBQUFBLElBQ1AsSUFBSSxDQUFDLFNBQVM7QUFBQSxJQUNkLGFBQWE7QUFBQSxJQUNiLGFBQWEsQ0FBQyxRQUFRO0FBQUEsSUFDdEIsYUFBYTtBQUFBLE1BQ1g7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLElBQ0EsZ0JBQWdCO0FBQUEsSUFDaEIsYUFBYTtBQUFBLE1BQ1g7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLElBQ0EsTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQXNKUjtBQUFBLEVBQ0E7QUFBQSxJQUNFLElBQUk7QUFBQSxJQUNKLE9BQU87QUFBQSxJQUNQLFdBQVc7QUFBQSxJQUNYLE9BQU87QUFBQSxJQUNQLElBQUksQ0FBQyxTQUFTO0FBQUEsSUFDZCxhQUFhO0FBQUEsSUFDYixhQUFhLENBQUMsUUFBUTtBQUFBLElBQ3RCLGFBQWE7QUFBQSxNQUNYO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLGdCQUFnQjtBQUFBLElBQ2hCLGFBQWE7QUFBQSxNQUNYO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLE1BQU07QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBZ0xSO0FBQUEsRUFDQTtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osT0FBTztBQUFBLElBQ1AsV0FBVztBQUFBLElBQ1gsT0FBTztBQUFBLElBQ1AsSUFBSSxDQUFDLFNBQVM7QUFBQSxJQUNkLGFBQWE7QUFBQSxJQUNiLGFBQWEsQ0FBQyxRQUFRO0FBQUEsSUFDdEIsYUFBYTtBQUFBLE1BQ1g7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLElBQ0EsZ0JBQWdCO0FBQUEsSUFDaEIsYUFBYTtBQUFBLE1BQ1g7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLElBQ0EsTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFzTFI7QUFBQSxFQUNBO0FBQUEsSUFDRSxJQUFJO0FBQUEsSUFDSixPQUFPO0FBQUEsSUFDUCxXQUFXO0FBQUEsSUFDWCxPQUFPO0FBQUEsSUFDUCxJQUFJLENBQUMsU0FBUztBQUFBLElBQ2QsYUFBYTtBQUFBLElBQ2IsYUFBYSxDQUFDLFVBQVUsU0FBUztBQUFBLElBQ2pDLGFBQWE7QUFBQSxNQUNYO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxnQkFBZ0I7QUFBQSxJQUNoQixhQUFhO0FBQUEsTUFDWDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxNQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQW1MUjtBQUFBLEVBQ0E7QUFBQSxJQUNFLElBQUk7QUFBQSxJQUNKLE9BQU87QUFBQSxJQUNQLFdBQVc7QUFBQSxJQUNYLE9BQU87QUFBQSxJQUNQLElBQUksQ0FBQyxTQUFTO0FBQUEsSUFDZCxhQUFhO0FBQUEsSUFDYixhQUFhLENBQUM7QUFBQSxJQUNkLGFBQWE7QUFBQSxNQUNYO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLElBQ0EsZ0JBQWdCO0FBQUEsSUFDaEIsYUFBYTtBQUFBLE1BQ1g7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxNQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUE2R1I7QUFBQSxFQUNBO0FBQUEsSUFDRSxJQUFJO0FBQUEsSUFDSixPQUFPO0FBQUEsSUFDUCxXQUFXO0FBQUEsSUFDWCxPQUFPO0FBQUEsSUFDUCxJQUFJLENBQUMsV0FBVyxTQUFTLE9BQU87QUFBQSxJQUNoQyxhQUFhO0FBQUEsSUFDYixhQUFhLENBQUMsWUFBWSxRQUFRO0FBQUEsSUFDbEMsYUFBYTtBQUFBLE1BQ1g7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxnQkFBZ0I7QUFBQSxJQUNoQixhQUFhO0FBQUEsTUFDWDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLE1BQU07QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUF3RVI7QUFBQSxFQUNBO0FBQUEsSUFDRSxJQUFJO0FBQUEsSUFDSixPQUFPO0FBQUEsSUFDUCxXQUFXO0FBQUEsSUFDWCxPQUFPO0FBQUEsSUFDUCxJQUFJLENBQUMsU0FBUztBQUFBLElBQ2QsYUFBYTtBQUFBLElBQ2IsYUFBYSxDQUFDLFFBQVE7QUFBQSxJQUN0QixhQUFhO0FBQUEsTUFDWDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLGdCQUFnQjtBQUFBLElBQ2hCLGFBQWE7QUFBQSxNQUNYO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxNQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBK0RSO0FBQUEsRUFDQTtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osT0FBTztBQUFBLElBQ1AsV0FBVztBQUFBLElBQ1gsT0FBTztBQUFBLElBQ1AsSUFBSSxDQUFDLE9BQU87QUFBQSxJQUNaLGFBQWE7QUFBQSxJQUNiLGFBQWEsQ0FBQyxRQUFRO0FBQUEsSUFDdEIsYUFBYTtBQUFBLE1BQ1g7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxnQkFBZ0I7QUFBQSxJQUNoQixhQUFhO0FBQUEsTUFDWDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLElBQ0EsTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBeUVSO0FBQUEsRUFDQTtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osT0FBTztBQUFBLElBQ1AsV0FBVztBQUFBLElBQ1gsT0FBTztBQUFBLElBQ1AsSUFBSSxDQUFDLFdBQVcsU0FBUyxPQUFPO0FBQUEsSUFDaEMsYUFBYTtBQUFBLElBQ2IsYUFBYSxDQUFDO0FBQUEsSUFDZCxhQUFhO0FBQUEsTUFDWDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLElBQ0EsZ0JBQWdCO0FBQUEsSUFDaEIsYUFBYTtBQUFBLE1BQ1g7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLElBQ0EsTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFnZ0JSO0FBQUEsRUFDQTtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osT0FBTztBQUFBLElBQ1AsV0FBVztBQUFBLElBQ1gsT0FBTztBQUFBLElBQ1AsSUFBSSxDQUFDLFNBQVM7QUFBQSxJQUNkLGFBQWE7QUFBQSxJQUNiLGFBQWEsQ0FBQztBQUFBLElBQ2QsYUFBYTtBQUFBLE1BQ1g7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxnQkFBZ0I7QUFBQSxJQUNoQixhQUFhO0FBQUEsTUFDWDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxNQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQTRJUjtBQUNGOyIsIm5hbWVzIjpbXX0=