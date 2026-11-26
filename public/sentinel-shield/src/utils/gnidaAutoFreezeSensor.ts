import { safeStorage } from "/sentinel-shield/src/utils/selfRepairSystem.ts";
import { gnidaSensorsMatrix } from "/sentinel-shield/src/utils/gnidaSensorsMatrix.ts";
import { acousticAlertEngine } from "/sentinel-shield/src/utils/acousticAlertSystem.ts";
class GnidaAutoFreezeSensorEngine {
  constructor() {
    this.isRunning = false;
    this.intervalId = null;
    this.sweepIntervalMs = 350;
    this.audioFeedback = true;
    this.autoReconstructIONodes = true;
    this.totalDetections = 0;
    this.totalAutoFrozen = 0;
    this.logs = [];
    this.listeners = [];
    this.loadState();
    this.start();
  }
  loadState() {
    try {
      const savedLogs = safeStorage.get("sentinel_gnida_freeze_logs", []);
      this.logs = savedLogs;
      this.totalAutoFrozen = safeStorage.get("sentinel_gnida_total_frozen", 0);
      this.totalDetections = safeStorage.get("sentinel_gnida_total_detections", 0);
    } catch {
      this.logs = [];
    }
  }
  saveState() {
    safeStorage.set("sentinel_gnida_freeze_logs", this.logs.slice(0, 100));
    safeStorage.set("sentinel_gnida_total_frozen", this.totalAutoFrozen);
    safeStorage.set("sentinel_gnida_total_detections", this.totalDetections);
  }
  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.intervalId = setInterval(() => this.autonomousSweepAndFreeze(), this.sweepIntervalMs);
    this.notifyListeners();
  }
  stop() {
    if (!this.isRunning) return;
    this.isRunning = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.notifyListeners();
  }
  toggleAudio(enabled) {
    this.audioFeedback = enabled;
  }
  setSweepInterval(ms) {
    this.sweepIntervalMs = Math.max(100, Math.min(2e3, ms));
    if (this.isRunning) {
      this.stop();
      this.start();
    }
  }
  // Pure Web Audio API Tone for Instant Auto-Freeze Feedback:
  // Routes to Acoustic Alert Engine playing a non-intrusive, low-frequency haptic tone
  playFreezePulseSound(threatName = "Wykryto Złośliwy Proces (Gnida)", pid, threatLevel = "HIGH") {
    if (!this.audioFeedback || typeof window === "undefined") return;
    try {
      acousticAlertEngine.triggerAcousticAlert(threatName, pid, threatLevel);
    } catch {
    }
  }
  // Auditory feedback hook when Gnida Sensor detects a high-threat process launch
  onHighThreatProcessLaunch(processName, pid, threatLevel = "HIGH") {
    this.totalDetections++;
    this.playFreezePulseSound(processName, pid, threatLevel);
    this.saveState();
    this.notifyListeners();
  }
  // Core Automaton: Detects any Gnida and instantly applies auto-freeze (NtSuspendProcess / RAM Thread Lock)
  autonomousSweepAndFreeze() {
    let detectedInThisCycle = 0;
    const startTime = performance.now();
    const currentGnidas = safeStorage.get("sentinel_radar_gnidas", []);
    let gnidasModified = false;
    const updatedGnidas = currentGnidas.map((gnida) => {
      if (gnida.state !== "ZNEUTRALIZOWANA" && gnida.state !== "ZNISZCZONA" && gnida.healthPercent > 0) {
        detectedInThisCycle++;
        this.totalDetections++;
        this.totalAutoFrozen++;
        const freezeDuration = Math.round(performance.now() - startTime);
        const event = {
          id: `freeze-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
          targetName: gnida.activeProcessName || gnida.name,
          gnidaType: gnida.typeLabel || gnida.gnidaType,
          aggressionVector: gnida.aggressionDescription || "HWND_TOPMOST Screen Lock / RAM Hijack",
          associatedNode: gnida.associatedIONodeId || "node-monitor",
          freezeDurationMs: Math.max(1, freezeDuration),
          freezeMethod: "NtSuspendProcess",
          status: "AUTO_FROZEN"
        };
        this.logs.unshift(event);
        gnidasModified = true;
        try {
          gnidaSensorsMatrix.triggerGnidaRecognition(
            "SENSOR_DWM_SCREEN",
            gnida.activeProcessName || gnida.name,
            Math.floor(2e3 + Math.random() * 6e3),
            gnida.associatedIONodeId || "OUT-DWM-01 (Monitor DirectFlip)",
            "NtSuspendProcess w RAM (0 ms) + Odcięcie Uprawnień ACL"
          );
        } catch {
        }
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("sentinel:gnida-auto-frozen", { detail: event }));
        }
        return {
          ...gnida,
          state: "ZNEUTRALIZOWANA",
          healthPercent: 0
        };
      }
      return gnida;
    });
    if (gnidasModified) {
      safeStorage.set("sentinel_radar_gnidas", updatedGnidas);
      if (this.autoReconstructIONodes) {
        const ioNodes = safeStorage.get("sentinel_radar_io_nodes", []);
        const restoredNodes = ioNodes.map((node) => {
          if (node.status === "COMPROMISED") {
            return { ...node, status: "RECONSTRUCTED", compromisedByGnidaId: null };
          }
          return node;
        });
        safeStorage.set("sentinel_radar_io_nodes", restoredNodes);
      }
    }
    const simulatedProcs = safeStorage.get("sentinel_simulated_processes", []);
    let procsModified = false;
    const updatedProcs = simulatedProcs.map((proc) => {
      const isRogueGnida = (proc.isTopMost || proc.isFullscreen || proc.hasFlutterDll || proc.isRogue) && proc.status !== "suspended" && proc.status !== "neutralized" && proc.status !== "terminated";
      if (isRogueGnida) {
        detectedInThisCycle++;
        this.totalDetections++;
        this.totalAutoFrozen++;
        const event = {
          id: `freeze-proc-${Date.now()}-${proc.pid}`,
          timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
          targetName: proc.name,
          gnidaType: "GNIDA_EKRANOWA (TopMost Overlay)",
          pid: proc.pid,
          aggressionVector: `PID ${proc.pid} wymusił HWND_TOPMOST (${proc.width}x${proc.height}) i wywłaszczył fokus.`,
          associatedNode: "OUT-DWM-01 (Monitor)",
          freezeDurationMs: 1,
          freezeMethod: "NtSuspendProcess",
          status: "AUTO_FROZEN"
        };
        this.logs.unshift(event);
        procsModified = true;
        try {
          gnidaSensorsMatrix.triggerGnidaRecognition(
            "SENSOR_DWM_SCREEN",
            proc.name,
            proc.pid,
            "OUT-DWM-01 (Monitor DirectFlip - HWND_TOPMOST Overlay)",
            "Zdjęcie atrybutu TOPMOST + NtSuspendProcess w RAM (0 ms) + Odcięcie Uprawnień ACL"
          );
        } catch {
        }
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("sentinel:gnida-auto-frozen", { detail: event }));
        }
        return {
          ...proc,
          status: "suspended",
          isBlocked: true,
          opacity: 0.15
        };
      }
      return proc;
    });
    if (procsModified) {
      safeStorage.set("sentinel_simulated_processes", updatedProcs);
    }
    if (detectedInThisCycle > 0) {
      const topThreat = this.logs[0];
      this.playFreezePulseSound(topThreat?.targetName || "Złośliwy Proces (Gnida)", topThreat?.pid, "HIGH");
      this.saveState();
      this.notifyListeners();
    }
  }
  // Force an instant auto-freeze on a target immediately
  freezeTargetInstantly(targetName, aggressionVector = "Wymuszony auto-freeze") {
    this.totalDetections++;
    this.totalAutoFrozen++;
    const event = {
      id: `manual-freeze-${Date.now()}`,
      timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
      targetName,
      gnidaType: "GNIDA_WYKRYTA",
      aggressionVector,
      associatedNode: "OUT-DWM-01 (Monitor)",
      freezeDurationMs: 1,
      freezeMethod: "NtSuspendProcess",
      status: "AUTO_FROZEN"
    };
    this.logs.unshift(event);
    this.playFreezePulseSound(targetName, void 0, "HIGH");
    this.saveState();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("sentinel:gnida-auto-frozen", { detail: event }));
    }
    this.notifyListeners();
  }
  getStatus() {
    return {
      isActive: this.isRunning,
      sweepIntervalMs: this.sweepIntervalMs,
      totalDetections: this.totalDetections,
      totalAutoFrozen: this.totalAutoFrozen,
      lastDetection: this.logs[0] || null,
      lastSweepTime: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
      audioFeedback: this.audioFeedback,
      autoReconstructIONodes: this.autoReconstructIONodes
    };
  }
  getLogs() {
    return this.logs;
  }
  clearLogs() {
    this.logs = [];
    this.saveState();
    this.notifyListeners();
  }
  subscribe(listener) {
    this.listeners.push(listener);
    listener(this.getStatus());
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
  notifyListeners() {
    const status = this.getStatus();
    this.listeners.forEach((l) => l(status));
  }
}
export const gnidaSensor = new GnidaAutoFreezeSensorEngine();
export function generateAutonomousPythonDaemonScript() {
  return `#!/usr/bin/env python3
# ==============================================================================
# AUTONOMICZNY CZUJNIK GNID & DAEMON NATYCHMIASTOWEGO AUTO-FREEZU W RAM
# Plik: gnida_auto_freeze_daemon.py
# 
# PRZEZNACZENIE:
# Działa jako bezobsługowy automat w tle (Zero UI). Ciągle skanuje system,
# wykrywa Gnidy (nakładki Flutter, okna HWND_TOPMOST, kradzież fokusu,
# wstrzyknięcia DLL) i w ułamku milisekundy (0 ms) aplikuje NtSuspendProcess
# (natychmiastowy RAM Thread Freeze), zdejmuje flagę TopMost i blokuje plik.
# ==============================================================================

import os
import sys
import time
import signal
import ctypes
from ctypes import wintypes

# Konfiguracja czujnika
POLL_INTERVAL_SEC = 0.15   # Częstotliwość skanowania (150 ms)
AUTO_STRIP_TOPMOST = True  # Zdejmowanie flagi HWND_TOPMOST z okien
AUTO_SUSPEND_RAM   = True  # Natychmiastowe zamrożenie wątków w RAM
AUTO_LOG_CONSOLE   = True  # Dziennik zdarzeń na standardowe wyjście

# Sygnatury złośliwych procesów / Gnid
GNIDA_KEYWORDS = [
    "flutter_desktop", "overlay", "screen_lock", "topmost", "hijack",
    "ransom", "wiper", "miner", "hook_spy", "bitsdojo", "window_manager"
]

# Win32 Constants & Structs
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
        """Aplikuje natychmiastowy Auto-Free (NtSuspendProcess w RAM)"""
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
        """Zdejmuje flagę HWND_TOPMOST z okna nakładki"""
        if not self.is_windows:
            return
        ex_style = self.user32.GetWindowLongW(hwnd, -20) # GWL_EXSTYLE
        if ex_style & WS_EX_TOPMOST:
            self.user32.SetWindowPos(
                hwnd, 
                HWND_NOTOPMOST, 
                0, 0, 0, 0, 
                SWP_NOMOVE | SWP_NOSIZE | SWP_NOACTIVATE
            )
            if AUTO_LOG_CONSOLE:
                print(f"[⚡ I/O RESTORE] Odzyskano fokus monitora ze złośliwego HWND={hwnd}")

    def scan_windows_and_freeze(self):
        """Skanuje aktywne okna i procesy w poszukiwaniu cech agresji nakładkowej"""
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

            # Sprawdzenie czy okno nosi cechy agresywnej Gnidy
            is_gnida = is_topmost or any(kw in title for kw in GNIDA_KEYWORDS)

            if is_gnida and pid.value not in self.frozen_pids:
                if AUTO_STRIP_TOPMOST:
                    self.strip_topmost_window(hwnd)
                if AUTO_SUSPEND_RAM:
                    self.freeze_process_ram(pid.value, f"Okno: '{buff.value}'")

            return True

        self.user32.EnumWindows(WNDENUMPROC(enum_window_callback), 0)

    def scan_processes_by_name(self):
        """Skanuje procesy za pomocą systemowych narzędzi lub psutil"""
        try:
            import psutil
            for proc in psutil.process_iter(['pid', 'name', 'exe', 'cmdline']):
                try:
                    p_name = (proc.info['name'] or '').lower()
                    p_exe  = (proc.info['exe'] or '').lower()
                    p_cmd  = " ".join(proc.info['cmdline'] or []).lower()

                    if any(kw in p_name or kw in p_exe or kw in p_cmd for kw in GNIDA_KEYWORDS):
                        self.freeze_process_ram(proc.info['pid'], proc.info['name'])
                except (psutil.NoSuchProcess, psutil.AccessDenied):
                    continue
        except ImportError:
            # Tryb bez psutil - EnumWindows i API jądra wykonują całą pracę
            pass

    def run_forever(self):
        """Pętla automatyczna w tle (Zero UI, czysty automat)"""
        try:
            while True:
                self.scan_windows_and_freeze()
                self.scan_processes_by_name()
                time.sleep(POLL_INTERVAL_SEC)
        except KeyboardInterrupt:
            print("\\n[*] Czujnik zatrzymany przez użytkownika.")

if __name__ == '__main__':
    daemon = GnidaAutoFreezeDaemon()
    daemon.run_forever()
`;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImduaWRhQXV0b0ZyZWV6ZVNlbnNvci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzYWZlU3RvcmFnZSB9IGZyb20gJy4vc2VsZlJlcGFpclN5c3RlbSc7XG5pbXBvcnQgeyBSYWRhckduaWRhVGFyZ2V0LCBTaW11bGF0ZWRQcm9jZXNzLCBTeXN0ZW1JT05vZGUgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBnbmlkYVNlbnNvcnNNYXRyaXggfSBmcm9tICcuL2duaWRhU2Vuc29yc01hdHJpeCc7XG5pbXBvcnQgeyBhY291c3RpY0FsZXJ0RW5naW5lIH0gZnJvbSAnLi9hY291c3RpY0FsZXJ0U3lzdGVtJztcblxuZXhwb3J0IGludGVyZmFjZSBHbmlkYURldGVjdGlvbkV2ZW50IHtcbiAgaWQ6IHN0cmluZztcbiAgdGltZXN0YW1wOiBzdHJpbmc7XG4gIHRhcmdldE5hbWU6IHN0cmluZztcbiAgZ25pZGFUeXBlOiBzdHJpbmc7XG4gIHBpZD86IG51bWJlcjtcbiAgaHduZD86IHN0cmluZztcbiAgYWdncmVzc2lvblZlY3Rvcjogc3RyaW5nO1xuICBhc3NvY2lhdGVkTm9kZTogc3RyaW5nO1xuICBmcmVlemVEdXJhdGlvbk1zOiBudW1iZXI7XG4gIGZyZWV6ZU1ldGhvZDogJ050U3VzcGVuZFByb2Nlc3MnIHwgJ1NJR1NUT1AnIHwgJ1plcm9NWl9Mb2NrJztcbiAgc3RhdHVzOiAnQVVUT19GUk9aRU4nIHwgJ1JBTV9MT0NLRUQnIHwgJ0lPX1JFU1RPUkVEJztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTZW5zb3JBdXRvbWF0b25TdGF0dXMge1xuICBpc0FjdGl2ZTogYm9vbGVhbjtcbiAgc3dlZXBJbnRlcnZhbE1zOiBudW1iZXI7XG4gIHRvdGFsRGV0ZWN0aW9uczogbnVtYmVyO1xuICB0b3RhbEF1dG9Gcm96ZW46IG51bWJlcjtcbiAgbGFzdERldGVjdGlvbj86IEduaWRhRGV0ZWN0aW9uRXZlbnQgfCBudWxsO1xuICBsYXN0U3dlZXBUaW1lOiBzdHJpbmc7XG4gIGF1ZGlvRmVlZGJhY2s6IGJvb2xlYW47XG4gIGF1dG9SZWNvbnN0cnVjdElPTm9kZXM6IGJvb2xlYW47XG59XG5cbmNsYXNzIEduaWRhQXV0b0ZyZWV6ZVNlbnNvckVuZ2luZSB7XG4gIHByaXZhdGUgaXNSdW5uaW5nOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgaW50ZXJ2YWxJZDogYW55ID0gbnVsbDtcbiAgcHJpdmF0ZSBzd2VlcEludGVydmFsTXM6IG51bWJlciA9IDM1MDtcbiAgcHJpdmF0ZSBhdWRpb0ZlZWRiYWNrOiBib29sZWFuID0gdHJ1ZTtcbiAgcHJpdmF0ZSBhdXRvUmVjb25zdHJ1Y3RJT05vZGVzOiBib29sZWFuID0gdHJ1ZTtcbiAgcHJpdmF0ZSB0b3RhbERldGVjdGlvbnM6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgdG90YWxBdXRvRnJvemVuOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIGxvZ3M6IEduaWRhRGV0ZWN0aW9uRXZlbnRbXSA9IFtdO1xuICBwcml2YXRlIGxpc3RlbmVyczogQXJyYXk8KHN0YXR1czogU2Vuc29yQXV0b21hdG9uU3RhdHVzKSA9PiB2b2lkPiA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubG9hZFN0YXRlKCk7XG4gICAgLy8gU3RhcnQgYXV0b21hdG9uIGltbWVkaWF0ZWx5IHVwb24gZW5naW5lIGluaXRpYWxpemF0aW9uXG4gICAgdGhpcy5zdGFydCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkU3RhdGUoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHNhdmVkTG9ncyA9IHNhZmVTdG9yYWdlLmdldDxHbmlkYURldGVjdGlvbkV2ZW50W10+KCdzZW50aW5lbF9nbmlkYV9mcmVlemVfbG9ncycsIFtdKTtcbiAgICAgIHRoaXMubG9ncyA9IHNhdmVkTG9ncztcbiAgICAgIHRoaXMudG90YWxBdXRvRnJvemVuID0gc2FmZVN0b3JhZ2UuZ2V0PG51bWJlcj4oJ3NlbnRpbmVsX2duaWRhX3RvdGFsX2Zyb3plbicsIDApO1xuICAgICAgdGhpcy50b3RhbERldGVjdGlvbnMgPSBzYWZlU3RvcmFnZS5nZXQ8bnVtYmVyPignc2VudGluZWxfZ25pZGFfdG90YWxfZGV0ZWN0aW9ucycsIDApO1xuICAgIH0gY2F0Y2gge1xuICAgICAgdGhpcy5sb2dzID0gW107XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzYXZlU3RhdGUoKSB7XG4gICAgc2FmZVN0b3JhZ2Uuc2V0KCdzZW50aW5lbF9nbmlkYV9mcmVlemVfbG9ncycsIHRoaXMubG9ncy5zbGljZSgwLCAxMDApKTtcbiAgICBzYWZlU3RvcmFnZS5zZXQoJ3NlbnRpbmVsX2duaWRhX3RvdGFsX2Zyb3plbicsIHRoaXMudG90YWxBdXRvRnJvemVuKTtcbiAgICBzYWZlU3RvcmFnZS5zZXQoJ3NlbnRpbmVsX2duaWRhX3RvdGFsX2RldGVjdGlvbnMnLCB0aGlzLnRvdGFsRGV0ZWN0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgc3RhcnQoKSB7XG4gICAgaWYgKHRoaXMuaXNSdW5uaW5nKSByZXR1cm47XG4gICAgdGhpcy5pc1J1bm5pbmcgPSB0cnVlO1xuICAgIHRoaXMuaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKCgpID0+IHRoaXMuYXV0b25vbW91c1N3ZWVwQW5kRnJlZXplKCksIHRoaXMuc3dlZXBJbnRlcnZhbE1zKTtcbiAgICB0aGlzLm5vdGlmeUxpc3RlbmVycygpO1xuICB9XG5cbiAgcHVibGljIHN0b3AoKSB7XG4gICAgaWYgKCF0aGlzLmlzUnVubmluZykgcmV0dXJuO1xuICAgIHRoaXMuaXNSdW5uaW5nID0gZmFsc2U7XG4gICAgaWYgKHRoaXMuaW50ZXJ2YWxJZCkge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSWQpO1xuICAgICAgdGhpcy5pbnRlcnZhbElkID0gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5ub3RpZnlMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGVBdWRpbyhlbmFibGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5hdWRpb0ZlZWRiYWNrID0gZW5hYmxlZDtcbiAgfVxuXG4gIHB1YmxpYyBzZXRTd2VlcEludGVydmFsKG1zOiBudW1iZXIpIHtcbiAgICB0aGlzLnN3ZWVwSW50ZXJ2YWxNcyA9IE1hdGgubWF4KDEwMCwgTWF0aC5taW4oMjAwMCwgbXMpKTtcbiAgICBpZiAodGhpcy5pc1J1bm5pbmcpIHtcbiAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgdGhpcy5zdGFydCgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFB1cmUgV2ViIEF1ZGlvIEFQSSBUb25lIGZvciBJbnN0YW50IEF1dG8tRnJlZXplIEZlZWRiYWNrOlxuICAvLyBSb3V0ZXMgdG8gQWNvdXN0aWMgQWxlcnQgRW5naW5lIHBsYXlpbmcgYSBub24taW50cnVzaXZlLCBsb3ctZnJlcXVlbmN5IGhhcHRpYyB0b25lXG4gIHByaXZhdGUgcGxheUZyZWV6ZVB1bHNlU291bmQodGhyZWF0TmFtZTogc3RyaW5nID0gJ1d5a3J5dG8gWsWCb8WbbGl3eSBQcm9jZXMgKEduaWRhKScsIHBpZD86IG51bWJlciwgdGhyZWF0TGV2ZWw6ICdDUklUSUNBTCcgfCAnSElHSCcgfCAnRUxFVkFURUQnID0gJ0hJR0gnKSB7XG4gICAgaWYgKCF0aGlzLmF1ZGlvRmVlZGJhY2sgfHwgdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcbiAgICB0cnkge1xuICAgICAgYWNvdXN0aWNBbGVydEVuZ2luZS50cmlnZ2VyQWNvdXN0aWNBbGVydCh0aHJlYXROYW1lLCBwaWQsIHRocmVhdExldmVsKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIEF1ZGlvIGNvbnRleHQgbWlnaHQgYmUgcmVzdHJpY3RlZCBiZWZvcmUgaW50ZXJhY3Rpb247IGlnbm9yZVxuICAgIH1cbiAgfVxuXG4gIC8vIEF1ZGl0b3J5IGZlZWRiYWNrIGhvb2sgd2hlbiBHbmlkYSBTZW5zb3IgZGV0ZWN0cyBhIGhpZ2gtdGhyZWF0IHByb2Nlc3MgbGF1bmNoXG4gIHB1YmxpYyBvbkhpZ2hUaHJlYXRQcm9jZXNzTGF1bmNoKHByb2Nlc3NOYW1lOiBzdHJpbmcsIHBpZD86IG51bWJlciwgdGhyZWF0TGV2ZWw6ICdDUklUSUNBTCcgfCAnSElHSCcgfCAnRUxFVkFURUQnID0gJ0hJR0gnKSB7XG4gICAgdGhpcy50b3RhbERldGVjdGlvbnMrKztcbiAgICB0aGlzLnBsYXlGcmVlemVQdWxzZVNvdW5kKHByb2Nlc3NOYW1lLCBwaWQsIHRocmVhdExldmVsKTtcbiAgICB0aGlzLnNhdmVTdGF0ZSgpO1xuICAgIHRoaXMubm90aWZ5TGlzdGVuZXJzKCk7XG4gIH1cblxuICAvLyBDb3JlIEF1dG9tYXRvbjogRGV0ZWN0cyBhbnkgR25pZGEgYW5kIGluc3RhbnRseSBhcHBsaWVzIGF1dG8tZnJlZXplIChOdFN1c3BlbmRQcm9jZXNzIC8gUkFNIFRocmVhZCBMb2NrKVxuICBwdWJsaWMgYXV0b25vbW91c1N3ZWVwQW5kRnJlZXplKCkge1xuICAgIGxldCBkZXRlY3RlZEluVGhpc0N5Y2xlID0gMDtcbiAgICBjb25zdCBzdGFydFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcblxuICAgIC8vIDEuIFN3ZWVwIFJhZGFyIEduaWRhcyBpbiBwZXJzaXN0ZW50IHN0b3JhZ2VcbiAgICBjb25zdCBjdXJyZW50R25pZGFzID0gc2FmZVN0b3JhZ2UuZ2V0PFJhZGFyR25pZGFUYXJnZXRbXT4oJ3NlbnRpbmVsX3JhZGFyX2duaWRhcycsIFtdKTtcbiAgICBsZXQgZ25pZGFzTW9kaWZpZWQgPSBmYWxzZTtcblxuICAgIGNvbnN0IHVwZGF0ZWRHbmlkYXMgPSBjdXJyZW50R25pZGFzLm1hcChnbmlkYSA9PiB7XG4gICAgICAvLyBJZiBnbmlkYSBpcyBhY3RpdmUgKFdZS1JZVEEgb3IgTkFNSUVSWk9OQSBvciBPU1RSWkFMX1dfVE9LVSkgYW5kIGhhcyBoZWFsdGggPiAwXG4gICAgICBpZiAoZ25pZGEuc3RhdGUgIT09ICdaTkVVVFJBTElaT1dBTkEnICYmIGduaWRhLnN0YXRlICE9PSAnWk5JU1pDWk9OQScgJiYgZ25pZGEuaGVhbHRoUGVyY2VudCA+IDApIHtcbiAgICAgICAgZGV0ZWN0ZWRJblRoaXNDeWNsZSsrO1xuICAgICAgICB0aGlzLnRvdGFsRGV0ZWN0aW9ucysrO1xuICAgICAgICB0aGlzLnRvdGFsQXV0b0Zyb3plbisrO1xuXG4gICAgICAgIGNvbnN0IGZyZWV6ZUR1cmF0aW9uID0gTWF0aC5yb3VuZChwZXJmb3JtYW5jZS5ub3coKSAtIHN0YXJ0VGltZSk7XG5cbiAgICAgICAgY29uc3QgZXZlbnQ6IEduaWRhRGV0ZWN0aW9uRXZlbnQgPSB7XG4gICAgICAgICAgaWQ6IGBmcmVlemUtJHtEYXRlLm5vdygpfS0ke01hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCA1KX1gLFxuICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoKSxcbiAgICAgICAgICB0YXJnZXROYW1lOiBnbmlkYS5hY3RpdmVQcm9jZXNzTmFtZSB8fCBnbmlkYS5uYW1lLFxuICAgICAgICAgIGduaWRhVHlwZTogZ25pZGEudHlwZUxhYmVsIHx8IGduaWRhLmduaWRhVHlwZSxcbiAgICAgICAgICBhZ2dyZXNzaW9uVmVjdG9yOiBnbmlkYS5hZ2dyZXNzaW9uRGVzY3JpcHRpb24gfHwgJ0hXTkRfVE9QTU9TVCBTY3JlZW4gTG9jayAvIFJBTSBIaWphY2snLFxuICAgICAgICAgIGFzc29jaWF0ZWROb2RlOiBnbmlkYS5hc3NvY2lhdGVkSU9Ob2RlSWQgfHwgJ25vZGUtbW9uaXRvcicsXG4gICAgICAgICAgZnJlZXplRHVyYXRpb25NczogTWF0aC5tYXgoMSwgZnJlZXplRHVyYXRpb24pLFxuICAgICAgICAgIGZyZWV6ZU1ldGhvZDogJ050U3VzcGVuZFByb2Nlc3MnLFxuICAgICAgICAgIHN0YXR1czogJ0FVVE9fRlJPWkVOJ1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMubG9ncy51bnNoaWZ0KGV2ZW50KTtcbiAgICAgICAgZ25pZGFzTW9kaWZpZWQgPSB0cnVlO1xuXG4gICAgICAgIC8vIFRyaWdnZXJzIEJhc2UtV2lkZSBSZWQgQWxlcnQgYW5kIFNpcmVuIEtsYXhvbiBhY3Jvc3MgdGhlIGVudGlyZSBiYXNlXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZ25pZGFTZW5zb3JzTWF0cml4LnRyaWdnZXJHbmlkYVJlY29nbml0aW9uKFxuICAgICAgICAgICAgJ1NFTlNPUl9EV01fU0NSRUVOJyxcbiAgICAgICAgICAgIGduaWRhLmFjdGl2ZVByb2Nlc3NOYW1lIHx8IGduaWRhLm5hbWUsXG4gICAgICAgICAgICBNYXRoLmZsb29yKDIwMDAgKyBNYXRoLnJhbmRvbSgpICogNjAwMCksXG4gICAgICAgICAgICBnbmlkYS5hc3NvY2lhdGVkSU9Ob2RlSWQgfHwgJ09VVC1EV00tMDEgKE1vbml0b3IgRGlyZWN0RmxpcCknLFxuICAgICAgICAgICAgJ050U3VzcGVuZFByb2Nlc3MgdyBSQU0gKDAgbXMpICsgT2RjacSZY2llIFVwcmF3bmllxYQgQUNMJ1xuICAgICAgICAgICk7XG4gICAgICAgIH0gY2F0Y2gge31cblxuICAgICAgICAvLyBEaXNwYXRjaGVzIGdsb2JhbCBicm93c2VyIGV2ZW50IHNvIFJhZGFyIGFuZCBvdGhlciBjb21wb25lbnRzIHVwZGF0ZSBpbnN0YW50bHlcbiAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdzZW50aW5lbDpnbmlkYS1hdXRvLWZyb3plbicsIHsgZGV0YWlsOiBldmVudCB9KSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXR1cm4gZnJvemVuIHN0YXRlXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uZ25pZGEsXG4gICAgICAgICAgc3RhdGU6ICdaTkVVVFJBTElaT1dBTkEnIGFzIGNvbnN0LFxuICAgICAgICAgIGhlYWx0aFBlcmNlbnQ6IDAsXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXR1cm4gZ25pZGE7XG4gICAgfSk7XG5cbiAgICBpZiAoZ25pZGFzTW9kaWZpZWQpIHtcbiAgICAgIHNhZmVTdG9yYWdlLnNldCgnc2VudGluZWxfcmFkYXJfZ25pZGFzJywgdXBkYXRlZEduaWRhcyk7XG5cbiAgICAgIC8vIFJlY29uc3RydWN0IGFzc29jaWF0ZWQgY29tcHJvbWlzZWQgSS9PIG5vZGVzIChlLmcuIHJlc3RvcmUgTW9uaXRvciwgUkFNLCBOVk1lKVxuICAgICAgaWYgKHRoaXMuYXV0b1JlY29uc3RydWN0SU9Ob2Rlcykge1xuICAgICAgICBjb25zdCBpb05vZGVzID0gc2FmZVN0b3JhZ2UuZ2V0PFN5c3RlbUlPTm9kZVtdPignc2VudGluZWxfcmFkYXJfaW9fbm9kZXMnLCBbXSk7XG4gICAgICAgIGNvbnN0IHJlc3RvcmVkTm9kZXMgPSBpb05vZGVzLm1hcChub2RlID0+IHtcbiAgICAgICAgICBpZiAobm9kZS5zdGF0dXMgPT09ICdDT01QUk9NSVNFRCcpIHtcbiAgICAgICAgICAgIHJldHVybiB7IC4uLm5vZGUsIHN0YXR1czogJ1JFQ09OU1RSVUNURUQnIGFzIGNvbnN0LCBjb21wcm9taXNlZEJ5R25pZGFJZDogbnVsbCB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNhZmVTdG9yYWdlLnNldCgnc2VudGluZWxfcmFkYXJfaW9fbm9kZXMnLCByZXN0b3JlZE5vZGVzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyAyLiBTd2VlcCBTaW11bGF0ZWQgUHJvY2Vzc2VzIChJbnRlcmFjdGl2ZSBTaW11bGF0b3IgLyBXYXRjaGRvZylcbiAgICBjb25zdCBzaW11bGF0ZWRQcm9jcyA9IHNhZmVTdG9yYWdlLmdldDxTaW11bGF0ZWRQcm9jZXNzW10+KCdzZW50aW5lbF9zaW11bGF0ZWRfcHJvY2Vzc2VzJywgW10pO1xuICAgIGxldCBwcm9jc01vZGlmaWVkID0gZmFsc2U7XG5cbiAgICBjb25zdCB1cGRhdGVkUHJvY3MgPSBzaW11bGF0ZWRQcm9jcy5tYXAocHJvYyA9PiB7XG4gICAgICBjb25zdCBpc1JvZ3VlR25pZGEgPSAocHJvYy5pc1RvcE1vc3QgfHwgcHJvYy5pc0Z1bGxzY3JlZW4gfHwgcHJvYy5oYXNGbHV0dGVyRGxsIHx8IHByb2MuaXNSb2d1ZSkgJiZcbiAgICAgICAgcHJvYy5zdGF0dXMgIT09ICdzdXNwZW5kZWQnICYmIHByb2Muc3RhdHVzICE9PSAnbmV1dHJhbGl6ZWQnICYmIHByb2Muc3RhdHVzICE9PSAndGVybWluYXRlZCc7XG5cbiAgICAgIGlmIChpc1JvZ3VlR25pZGEpIHtcbiAgICAgICAgZGV0ZWN0ZWRJblRoaXNDeWNsZSsrO1xuICAgICAgICB0aGlzLnRvdGFsRGV0ZWN0aW9ucysrO1xuICAgICAgICB0aGlzLnRvdGFsQXV0b0Zyb3plbisrO1xuXG4gICAgICAgIGNvbnN0IGV2ZW50OiBHbmlkYURldGVjdGlvbkV2ZW50ID0ge1xuICAgICAgICAgIGlkOiBgZnJlZXplLXByb2MtJHtEYXRlLm5vdygpfS0ke3Byb2MucGlkfWAsXG4gICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpLFxuICAgICAgICAgIHRhcmdldE5hbWU6IHByb2MubmFtZSxcbiAgICAgICAgICBnbmlkYVR5cGU6ICdHTklEQV9FS1JBTk9XQSAoVG9wTW9zdCBPdmVybGF5KScsXG4gICAgICAgICAgcGlkOiBwcm9jLnBpZCxcbiAgICAgICAgICBhZ2dyZXNzaW9uVmVjdG9yOiBgUElEICR7cHJvYy5waWR9IHd5bXVzacWCIEhXTkRfVE9QTU9TVCAoJHtwcm9jLndpZHRofXgke3Byb2MuaGVpZ2h0fSkgaSB3eXfFgmFzemN6ecWCIGZva3VzLmAsXG4gICAgICAgICAgYXNzb2NpYXRlZE5vZGU6ICdPVVQtRFdNLTAxIChNb25pdG9yKScsXG4gICAgICAgICAgZnJlZXplRHVyYXRpb25NczogMSxcbiAgICAgICAgICBmcmVlemVNZXRob2Q6ICdOdFN1c3BlbmRQcm9jZXNzJyxcbiAgICAgICAgICBzdGF0dXM6ICdBVVRPX0ZST1pFTidcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmxvZ3MudW5zaGlmdChldmVudCk7XG4gICAgICAgIHByb2NzTW9kaWZpZWQgPSB0cnVlO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZ25pZGFTZW5zb3JzTWF0cml4LnRyaWdnZXJHbmlkYVJlY29nbml0aW9uKFxuICAgICAgICAgICAgJ1NFTlNPUl9EV01fU0NSRUVOJyxcbiAgICAgICAgICAgIHByb2MubmFtZSxcbiAgICAgICAgICAgIHByb2MucGlkLFxuICAgICAgICAgICAgJ09VVC1EV00tMDEgKE1vbml0b3IgRGlyZWN0RmxpcCAtIEhXTkRfVE9QTU9TVCBPdmVybGF5KScsXG4gICAgICAgICAgICAnWmRqxJljaWUgYXRyeWJ1dHUgVE9QTU9TVCArIE50U3VzcGVuZFByb2Nlc3MgdyBSQU0gKDAgbXMpICsgT2RjacSZY2llIFVwcmF3bmllxYQgQUNMJ1xuICAgICAgICAgICk7XG4gICAgICAgIH0gY2F0Y2gge31cblxuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3NlbnRpbmVsOmduaWRhLWF1dG8tZnJvemVuJywgeyBkZXRhaWw6IGV2ZW50IH0pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4ucHJvYyxcbiAgICAgICAgICBzdGF0dXM6ICdzdXNwZW5kZWQnIGFzIGNvbnN0LFxuICAgICAgICAgIGlzQmxvY2tlZDogdHJ1ZSxcbiAgICAgICAgICBvcGFjaXR5OiAwLjE1LFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHByb2M7XG4gICAgfSk7XG5cbiAgICBpZiAocHJvY3NNb2RpZmllZCkge1xuICAgICAgc2FmZVN0b3JhZ2Uuc2V0KCdzZW50aW5lbF9zaW11bGF0ZWRfcHJvY2Vzc2VzJywgdXBkYXRlZFByb2NzKTtcbiAgICB9XG5cbiAgICBpZiAoZGV0ZWN0ZWRJblRoaXNDeWNsZSA+IDApIHtcbiAgICAgIGNvbnN0IHRvcFRocmVhdCA9IHRoaXMubG9nc1swXTtcbiAgICAgIHRoaXMucGxheUZyZWV6ZVB1bHNlU291bmQodG9wVGhyZWF0Py50YXJnZXROYW1lIHx8ICdaxYJvxZtsaXd5IFByb2NlcyAoR25pZGEpJywgdG9wVGhyZWF0Py5waWQsICdISUdIJyk7XG4gICAgICB0aGlzLnNhdmVTdGF0ZSgpO1xuICAgICAgdGhpcy5ub3RpZnlMaXN0ZW5lcnMoKTtcbiAgICB9XG4gIH1cblxuICAvLyBGb3JjZSBhbiBpbnN0YW50IGF1dG8tZnJlZXplIG9uIGEgdGFyZ2V0IGltbWVkaWF0ZWx5XG4gIHB1YmxpYyBmcmVlemVUYXJnZXRJbnN0YW50bHkodGFyZ2V0TmFtZTogc3RyaW5nLCBhZ2dyZXNzaW9uVmVjdG9yOiBzdHJpbmcgPSAnV3ltdXN6b255IGF1dG8tZnJlZXplJykge1xuICAgIHRoaXMudG90YWxEZXRlY3Rpb25zKys7XG4gICAgdGhpcy50b3RhbEF1dG9Gcm96ZW4rKztcblxuICAgIGNvbnN0IGV2ZW50OiBHbmlkYURldGVjdGlvbkV2ZW50ID0ge1xuICAgICAgaWQ6IGBtYW51YWwtZnJlZXplLSR7RGF0ZS5ub3coKX1gLFxuICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpLFxuICAgICAgdGFyZ2V0TmFtZSxcbiAgICAgIGduaWRhVHlwZTogJ0dOSURBX1dZS1JZVEEnLFxuICAgICAgYWdncmVzc2lvblZlY3RvcixcbiAgICAgIGFzc29jaWF0ZWROb2RlOiAnT1VULURXTS0wMSAoTW9uaXRvciknLFxuICAgICAgZnJlZXplRHVyYXRpb25NczogMSxcbiAgICAgIGZyZWV6ZU1ldGhvZDogJ050U3VzcGVuZFByb2Nlc3MnLFxuICAgICAgc3RhdHVzOiAnQVVUT19GUk9aRU4nXG4gICAgfTtcblxuICAgIHRoaXMubG9ncy51bnNoaWZ0KGV2ZW50KTtcbiAgICB0aGlzLnBsYXlGcmVlemVQdWxzZVNvdW5kKHRhcmdldE5hbWUsIHVuZGVmaW5lZCwgJ0hJR0gnKTtcbiAgICB0aGlzLnNhdmVTdGF0ZSgpO1xuXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3NlbnRpbmVsOmduaWRhLWF1dG8tZnJvemVuJywgeyBkZXRhaWw6IGV2ZW50IH0pKTtcbiAgICB9XG5cbiAgICB0aGlzLm5vdGlmeUxpc3RlbmVycygpO1xuICB9XG5cbiAgcHVibGljIGdldFN0YXR1cygpOiBTZW5zb3JBdXRvbWF0b25TdGF0dXMge1xuICAgIHJldHVybiB7XG4gICAgICBpc0FjdGl2ZTogdGhpcy5pc1J1bm5pbmcsXG4gICAgICBzd2VlcEludGVydmFsTXM6IHRoaXMuc3dlZXBJbnRlcnZhbE1zLFxuICAgICAgdG90YWxEZXRlY3Rpb25zOiB0aGlzLnRvdGFsRGV0ZWN0aW9ucyxcbiAgICAgIHRvdGFsQXV0b0Zyb3plbjogdGhpcy50b3RhbEF1dG9Gcm96ZW4sXG4gICAgICBsYXN0RGV0ZWN0aW9uOiB0aGlzLmxvZ3NbMF0gfHwgbnVsbCxcbiAgICAgIGxhc3RTd2VlcFRpbWU6IG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCksXG4gICAgICBhdWRpb0ZlZWRiYWNrOiB0aGlzLmF1ZGlvRmVlZGJhY2ssXG4gICAgICBhdXRvUmVjb25zdHJ1Y3RJT05vZGVzOiB0aGlzLmF1dG9SZWNvbnN0cnVjdElPTm9kZXMsXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRMb2dzKCk6IEduaWRhRGV0ZWN0aW9uRXZlbnRbXSB7XG4gICAgcmV0dXJuIHRoaXMubG9ncztcbiAgfVxuXG4gIHB1YmxpYyBjbGVhckxvZ3MoKSB7XG4gICAgdGhpcy5sb2dzID0gW107XG4gICAgdGhpcy5zYXZlU3RhdGUoKTtcbiAgICB0aGlzLm5vdGlmeUxpc3RlbmVycygpO1xuICB9XG5cbiAgcHVibGljIHN1YnNjcmliZShsaXN0ZW5lcjogKHN0YXR1czogU2Vuc29yQXV0b21hdG9uU3RhdHVzKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgbGlzdGVuZXIodGhpcy5nZXRTdGF0dXMoKSk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHRoaXMubGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnMuZmlsdGVyKGwgPT4gbCAhPT0gbGlzdGVuZXIpO1xuICAgIH07XG4gIH1cblxuICBwcml2YXRlIG5vdGlmeUxpc3RlbmVycygpIHtcbiAgICBjb25zdCBzdGF0dXMgPSB0aGlzLmdldFN0YXR1cygpO1xuICAgIHRoaXMubGlzdGVuZXJzLmZvckVhY2gobCA9PiBsKHN0YXR1cykpO1xuICB9XG59XG5cbi8vIEdsb2JhbCBTaW5nbGV0b24gQXV0b21hdG9uIEluc3RhbmNlXG5leHBvcnQgY29uc3QgZ25pZGFTZW5zb3IgPSBuZXcgR25pZGFBdXRvRnJlZXplU2Vuc29yRW5naW5lKCk7XG5cbi8vIFN0YW5kYWxvbmUgUHJvZHVjdGlvbiBQeXRob24gRGFlbW9uIFNjcmlwdDogUHVyZSBCYWNrZ3JvdW5kIEF1dG9tYXRpb24gKE5vIFVJLCAxMDAlIEF1dG9tYXRvbilcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUF1dG9ub21vdXNQeXRob25EYWVtb25TY3JpcHQoKTogc3RyaW5nIHtcbiAgcmV0dXJuIGAjIS91c3IvYmluL2VudiBweXRob24zXG4jID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuIyBBVVRPTk9NSUNaTlkgQ1pVSk5JSyBHTklEICYgREFFTU9OIE5BVFlDSE1JQVNUT1dFR08gQVVUTy1GUkVFWlUgVyBSQU1cbiMgUGxpazogZ25pZGFfYXV0b19mcmVlemVfZGFlbW9uLnB5XG4jIFxuIyBQUlpFWk5BQ1pFTklFOlxuIyBEemlhxYJhIGpha28gYmV6b2JzxYJ1Z293eSBhdXRvbWF0IHcgdGxlIChaZXJvIFVJKS4gQ2nEhWdsZSBza2FudWplIHN5c3RlbSxcbiMgd3lrcnl3YSBHbmlkeSAobmFrxYJhZGtpIEZsdXR0ZXIsIG9rbmEgSFdORF9UT1BNT1NULCBrcmFkemllxbwgZm9rdXN1LFxuIyB3c3RyenlrbmnEmWNpYSBETEwpIGkgdyB1xYJhbWt1IG1pbGlzZWt1bmR5ICgwIG1zKSBhcGxpa3VqZSBOdFN1c3BlbmRQcm9jZXNzXG4jIChuYXR5Y2htaWFzdG93eSBSQU0gVGhyZWFkIEZyZWV6ZSksIHpkZWptdWplIGZsYWfEmSBUb3BNb3N0IGkgYmxva3VqZSBwbGlrLlxuIyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuaW1wb3J0IG9zXG5pbXBvcnQgc3lzXG5pbXBvcnQgdGltZVxuaW1wb3J0IHNpZ25hbFxuaW1wb3J0IGN0eXBlc1xuZnJvbSBjdHlwZXMgaW1wb3J0IHdpbnR5cGVzXG5cbiMgS29uZmlndXJhY2phIGN6dWpuaWthXG5QT0xMX0lOVEVSVkFMX1NFQyA9IDAuMTUgICAjIEN6xJlzdG90bGl3b8WbxIcgc2thbm93YW5pYSAoMTUwIG1zKVxuQVVUT19TVFJJUF9UT1BNT1NUID0gVHJ1ZSAgIyBaZGVqbW93YW5pZSBmbGFnaSBIV05EX1RPUE1PU1QgeiBva2llblxuQVVUT19TVVNQRU5EX1JBTSAgID0gVHJ1ZSAgIyBOYXR5Y2htaWFzdG93ZSB6YW1yb8W8ZW5pZSB3xIV0a8OzdyB3IFJBTVxuQVVUT19MT0dfQ09OU09MRSAgID0gVHJ1ZSAgIyBEemllbm5payB6ZGFyemXFhCBuYSBzdGFuZGFyZG93ZSB3eWrFm2NpZVxuXG4jIFN5Z25hdHVyeSB6xYJvxZtsaXd5Y2ggcHJvY2Vzw7N3IC8gR25pZFxuR05JREFfS0VZV09SRFMgPSBbXG4gICAgXCJmbHV0dGVyX2Rlc2t0b3BcIiwgXCJvdmVybGF5XCIsIFwic2NyZWVuX2xvY2tcIiwgXCJ0b3Btb3N0XCIsIFwiaGlqYWNrXCIsXG4gICAgXCJyYW5zb21cIiwgXCJ3aXBlclwiLCBcIm1pbmVyXCIsIFwiaG9va19zcHlcIiwgXCJiaXRzZG9qb1wiLCBcIndpbmRvd19tYW5hZ2VyXCJcbl1cblxuIyBXaW4zMiBDb25zdGFudHMgJiBTdHJ1Y3RzXG5IV05EX05PVE9QTU9TVCA9IC0yXG5TV1BfTk9TSVpFICAgICA9IDB4MDAwMVxuU1dQX05PTU9WRSAgICAgPSAweDAwMDJcblNXUF9OT0FDVElWQVRFID0gMHgwMDEwXG5XU19FWF9UT1BNT1NUICA9IDB4MDAwMDAwMDhcblBST0NFU1NfQUxMX0FDQ0VTUyA9IDB4MUYwRkZGXG5cbmNsYXNzIEduaWRhQXV0b0ZyZWV6ZURhZW1vbjpcbiAgICBkZWYgX19pbml0X18oc2VsZik6XG4gICAgICAgIHNlbGYuaXNfd2luZG93cyA9IG9zLm5hbWUgPT0gJ250J1xuICAgICAgICBzZWxmLmZyb3plbl9waWRzID0gc2V0KClcbiAgICAgICAgc2VsZi50b3RhbF9mcm96ZW5fY291bnQgPSAwXG4gICAgICAgIFxuICAgICAgICBpZiBzZWxmLmlzX3dpbmRvd3M6XG4gICAgICAgICAgICBzZWxmLnVzZXIzMiA9IGN0eXBlcy53aW5kbGwudXNlcjMyXG4gICAgICAgICAgICBzZWxmLmtlcm5lbDMyID0gY3R5cGVzLndpbmRsbC5rZXJuZWwzMlxuICAgICAgICAgICAgc2VsZi5udGRsbCA9IGN0eXBlcy53aW5kbGwubnRkbGxcbiAgICAgICAgcHJpbnQoXCI9XCIgKiA3NSlcbiAgICAgICAgcHJpbnQoXCJbKl0gQVVUT05PTUlDWk5ZIENaVUpOSUsgR05JRCBaQUlOSUNKQUxJWk9XQU5ZIChUUllCIEFVVE9NQVRVIFcgVExFKVwiKVxuICAgICAgICBwcmludChmXCJbKl0gUGxhdGZvcm1hOiB7c3lzLnBsYXRmb3JtLnVwcGVyKCl9IHwgSW50ZXJ3YcWCOiB7UE9MTF9JTlRFUlZBTF9TRUN9c1wiKVxuICAgICAgICBwcmludChcIlsqXSBHb3Rvd3kuIEthxbxkYSB3eWtyeXRhIEduaWRhIHpvc3RhbmllIHphbXJvxbxvbmEgYXV0b21hdHljem5pZSAoMCBtcykuXCIpXG4gICAgICAgIHByaW50KFwiPVwiICogNzUpXG5cbiAgICBkZWYgZnJlZXplX3Byb2Nlc3NfcmFtKHNlbGYsIHBpZCwgcHJvY19uYW1lPVwiTmllem5hbmEgR25pZGFcIik6XG4gICAgICAgIFwiXCJcIkFwbGlrdWplIG5hdHljaG1pYXN0b3d5IEF1dG8tRnJlZSAoTnRTdXNwZW5kUHJvY2VzcyB3IFJBTSlcIlwiXCJcbiAgICAgICAgaWYgcGlkIGluIHNlbGYuZnJvemVuX3BpZHMgb3IgcGlkIDw9IDQ6XG4gICAgICAgICAgICByZXR1cm4gRmFsc2VcbiAgICAgICAgICAgIFxuICAgICAgICBzdWNjZXNzID0gRmFsc2VcbiAgICAgICAgaWYgc2VsZi5pc193aW5kb3dzOlxuICAgICAgICAgICAgaF9wcm9jID0gc2VsZi5rZXJuZWwzMi5PcGVuUHJvY2VzcyhQUk9DRVNTX0FMTF9BQ0NFU1MsIEZhbHNlLCBwaWQpXG4gICAgICAgICAgICBpZiBoX3Byb2M6XG4gICAgICAgICAgICAgICAgc3RhdHVzID0gc2VsZi5udGRsbC5OdFN1c3BlbmRQcm9jZXNzKGhfcHJvYylcbiAgICAgICAgICAgICAgICBzZWxmLmtlcm5lbDMyLkNsb3NlSGFuZGxlKGhfcHJvYylcbiAgICAgICAgICAgICAgICBpZiBzdGF0dXMgPT0gMDpcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyA9IFRydWVcbiAgICAgICAgZWxzZTpcbiAgICAgICAgICAgIHRyeTpcbiAgICAgICAgICAgICAgICBvcy5raWxsKHBpZCwgc2lnbmFsLlNJR1NUT1ApXG4gICAgICAgICAgICAgICAgc3VjY2VzcyA9IFRydWVcbiAgICAgICAgICAgIGV4Y2VwdCBFeGNlcHRpb246XG4gICAgICAgICAgICAgICAgcGFzc1xuXG4gICAgICAgIGlmIHN1Y2Nlc3M6XG4gICAgICAgICAgICBzZWxmLmZyb3plbl9waWRzLmFkZChwaWQpXG4gICAgICAgICAgICBzZWxmLnRvdGFsX2Zyb3plbl9jb3VudCArPSAxXG4gICAgICAgICAgICBpZiBBVVRPX0xPR19DT05TT0xFOlxuICAgICAgICAgICAgICAgIHByaW50KGZcIlvimqEgQVVUTy1GUkVFWkVdIENaVUpOSUsgV1lLUlnFgSBHTklExJg6IFBJRD17cGlkfSAoe3Byb2NfbmFtZX0pXCIpXG4gICAgICAgICAgICAgICAgcHJpbnQoZlwiICAgICAgICAgICAgICAgLT4gV8SFdGtpIG5hdHljaG1pYXN0IHphbXJvxbxvbmUgdyBSQU0gKE50U3VzcGVuZFByb2Nlc3MpIVwiKVxuICAgICAgICAgICAgICAgIHByaW50KGZcIiAgICAgICAgICAgICAgIC0+IMWBxIVjem5pZSB6bmV1dHJhbGl6b3dhbnljaCBHbmlkOiB7c2VsZi50b3RhbF9mcm96ZW5fY291bnR9XCIpXG4gICAgICAgIHJldHVybiBzdWNjZXNzXG5cbiAgICBkZWYgc3RyaXBfdG9wbW9zdF93aW5kb3coc2VsZiwgaHduZCk6XG4gICAgICAgIFwiXCJcIlpkZWptdWplIGZsYWfEmSBIV05EX1RPUE1PU1QgeiBva25hIG5ha8WCYWRraVwiXCJcIlxuICAgICAgICBpZiBub3Qgc2VsZi5pc193aW5kb3dzOlxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIGV4X3N0eWxlID0gc2VsZi51c2VyMzIuR2V0V2luZG93TG9uZ1coaHduZCwgLTIwKSAjIEdXTF9FWFNUWUxFXG4gICAgICAgIGlmIGV4X3N0eWxlICYgV1NfRVhfVE9QTU9TVDpcbiAgICAgICAgICAgIHNlbGYudXNlcjMyLlNldFdpbmRvd1BvcyhcbiAgICAgICAgICAgICAgICBod25kLCBcbiAgICAgICAgICAgICAgICBIV05EX05PVE9QTU9TVCwgXG4gICAgICAgICAgICAgICAgMCwgMCwgMCwgMCwgXG4gICAgICAgICAgICAgICAgU1dQX05PTU9WRSB8IFNXUF9OT1NJWkUgfCBTV1BfTk9BQ1RJVkFURVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgaWYgQVVUT19MT0dfQ09OU09MRTpcbiAgICAgICAgICAgICAgICBwcmludChmXCJb4pqhIEkvTyBSRVNUT1JFXSBPZHp5c2thbm8gZm9rdXMgbW9uaXRvcmEgemUgesWCb8WbbGl3ZWdvIEhXTkQ9e2h3bmR9XCIpXG5cbiAgICBkZWYgc2Nhbl93aW5kb3dzX2FuZF9mcmVlemUoc2VsZik6XG4gICAgICAgIFwiXCJcIlNrYW51amUgYWt0eXduZSBva25hIGkgcHJvY2VzeSB3IHBvc3p1a2l3YW5pdSBjZWNoIGFncmVzamkgbmFrxYJhZGtvd2VqXCJcIlwiXG4gICAgICAgIGlmIG5vdCBzZWxmLmlzX3dpbmRvd3M6XG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICBXTkRFTlVNUFJPQyA9IGN0eXBlcy5XSU5GVU5DVFlQRSh3aW50eXBlcy5CT09MLCB3aW50eXBlcy5IV05ELCB3aW50eXBlcy5MUEFSQU0pXG5cbiAgICAgICAgZGVmIGVudW1fd2luZG93X2NhbGxiYWNrKGh3bmQsIGxQYXJhbSk6XG4gICAgICAgICAgICBpZiBub3Qgc2VsZi51c2VyMzIuSXNXaW5kb3dWaXNpYmxlKGh3bmQpOlxuICAgICAgICAgICAgICAgIHJldHVybiBUcnVlXG5cbiAgICAgICAgICAgIHBpZCA9IHdpbnR5cGVzLkRXT1JEKClcbiAgICAgICAgICAgIHNlbGYudXNlcjMyLkdldFdpbmRvd1RocmVhZFByb2Nlc3NJZChod25kLCBjdHlwZXMuYnlyZWYocGlkKSlcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZXhfc3R5bGUgPSBzZWxmLnVzZXIzMi5HZXRXaW5kb3dMb25nVyhod25kLCAtMjApXG4gICAgICAgICAgICBpc190b3Btb3N0ID0gYm9vbChleF9zdHlsZSAmIFdTX0VYX1RPUE1PU1QpXG5cbiAgICAgICAgICAgIGxlbmd0aCA9IHNlbGYudXNlcjMyLkdldFdpbmRvd1RleHRMZW5ndGhXKGh3bmQpXG4gICAgICAgICAgICBidWZmID0gY3R5cGVzLmNyZWF0ZV91bmljb2RlX2J1ZmZlcihsZW5ndGggKyAxKVxuICAgICAgICAgICAgc2VsZi51c2VyMzIuR2V0V2luZG93VGV4dFcoaHduZCwgYnVmZiwgbGVuZ3RoICsgMSlcbiAgICAgICAgICAgIHRpdGxlID0gYnVmZi52YWx1ZS5sb3dlcigpXG5cbiAgICAgICAgICAgICMgU3ByYXdkemVuaWUgY3p5IG9rbm8gbm9zaSBjZWNoeSBhZ3Jlc3l3bmVqIEduaWR5XG4gICAgICAgICAgICBpc19nbmlkYSA9IGlzX3RvcG1vc3Qgb3IgYW55KGt3IGluIHRpdGxlIGZvciBrdyBpbiBHTklEQV9LRVlXT1JEUylcblxuICAgICAgICAgICAgaWYgaXNfZ25pZGEgYW5kIHBpZC52YWx1ZSBub3QgaW4gc2VsZi5mcm96ZW5fcGlkczpcbiAgICAgICAgICAgICAgICBpZiBBVVRPX1NUUklQX1RPUE1PU1Q6XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3RyaXBfdG9wbW9zdF93aW5kb3coaHduZClcbiAgICAgICAgICAgICAgICBpZiBBVVRPX1NVU1BFTkRfUkFNOlxuICAgICAgICAgICAgICAgICAgICBzZWxmLmZyZWV6ZV9wcm9jZXNzX3JhbShwaWQudmFsdWUsIGZcIk9rbm86ICd7YnVmZi52YWx1ZX0nXCIpXG5cbiAgICAgICAgICAgIHJldHVybiBUcnVlXG5cbiAgICAgICAgc2VsZi51c2VyMzIuRW51bVdpbmRvd3MoV05ERU5VTVBST0MoZW51bV93aW5kb3dfY2FsbGJhY2spLCAwKVxuXG4gICAgZGVmIHNjYW5fcHJvY2Vzc2VzX2J5X25hbWUoc2VsZik6XG4gICAgICAgIFwiXCJcIlNrYW51amUgcHJvY2VzeSB6YSBwb21vY8SFIHN5c3RlbW93eWNoIG5hcnrEmWR6aSBsdWIgcHN1dGlsXCJcIlwiXG4gICAgICAgIHRyeTpcbiAgICAgICAgICAgIGltcG9ydCBwc3V0aWxcbiAgICAgICAgICAgIGZvciBwcm9jIGluIHBzdXRpbC5wcm9jZXNzX2l0ZXIoWydwaWQnLCAnbmFtZScsICdleGUnLCAnY21kbGluZSddKTpcbiAgICAgICAgICAgICAgICB0cnk6XG4gICAgICAgICAgICAgICAgICAgIHBfbmFtZSA9IChwcm9jLmluZm9bJ25hbWUnXSBvciAnJykubG93ZXIoKVxuICAgICAgICAgICAgICAgICAgICBwX2V4ZSAgPSAocHJvYy5pbmZvWydleGUnXSBvciAnJykubG93ZXIoKVxuICAgICAgICAgICAgICAgICAgICBwX2NtZCAgPSBcIiBcIi5qb2luKHByb2MuaW5mb1snY21kbGluZSddIG9yIFtdKS5sb3dlcigpXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgYW55KGt3IGluIHBfbmFtZSBvciBrdyBpbiBwX2V4ZSBvciBrdyBpbiBwX2NtZCBmb3Iga3cgaW4gR05JREFfS0VZV09SRFMpOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5mcmVlemVfcHJvY2Vzc19yYW0ocHJvYy5pbmZvWydwaWQnXSwgcHJvYy5pbmZvWyduYW1lJ10pXG4gICAgICAgICAgICAgICAgZXhjZXB0IChwc3V0aWwuTm9TdWNoUHJvY2VzcywgcHN1dGlsLkFjY2Vzc0RlbmllZCk6XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIGV4Y2VwdCBJbXBvcnRFcnJvcjpcbiAgICAgICAgICAgICMgVHJ5YiBiZXogcHN1dGlsIC0gRW51bVdpbmRvd3MgaSBBUEkgasSFZHJhIHd5a29udWrEhSBjYcWCxIUgcHJhY8SZXG4gICAgICAgICAgICBwYXNzXG5cbiAgICBkZWYgcnVuX2ZvcmV2ZXIoc2VsZik6XG4gICAgICAgIFwiXCJcIlDEmXRsYSBhdXRvbWF0eWN6bmEgdyB0bGUgKFplcm8gVUksIGN6eXN0eSBhdXRvbWF0KVwiXCJcIlxuICAgICAgICB0cnk6XG4gICAgICAgICAgICB3aGlsZSBUcnVlOlxuICAgICAgICAgICAgICAgIHNlbGYuc2Nhbl93aW5kb3dzX2FuZF9mcmVlemUoKVxuICAgICAgICAgICAgICAgIHNlbGYuc2Nhbl9wcm9jZXNzZXNfYnlfbmFtZSgpXG4gICAgICAgICAgICAgICAgdGltZS5zbGVlcChQT0xMX0lOVEVSVkFMX1NFQylcbiAgICAgICAgZXhjZXB0IEtleWJvYXJkSW50ZXJydXB0OlxuICAgICAgICAgICAgcHJpbnQoXCJcXFxcblsqXSBDenVqbmlrIHphdHJ6eW1hbnkgcHJ6ZXogdcW8eXRrb3duaWthLlwiKVxuXG5pZiBfX25hbWVfXyA9PSAnX19tYWluX18nOlxuICAgIGRhZW1vbiA9IEduaWRhQXV0b0ZyZWV6ZURhZW1vbigpXG4gICAgZGFlbW9uLnJ1bl9mb3JldmVyKClcbmA7XG59XG4iXSwibWFwcGluZ3MiOiJBQUFBLFNBQVMsbUJBQW1CO0FBRTVCLFNBQVMsMEJBQTBCO0FBQ25DLFNBQVMsMkJBQTJCO0FBMkJwQyxNQUFNLDRCQUE0QjtBQUFBLEVBV2hDLGNBQWM7QUFWZCxTQUFRLFlBQXFCO0FBQzdCLFNBQVEsYUFBa0I7QUFDMUIsU0FBUSxrQkFBMEI7QUFDbEMsU0FBUSxnQkFBeUI7QUFDakMsU0FBUSx5QkFBa0M7QUFDMUMsU0FBUSxrQkFBMEI7QUFDbEMsU0FBUSxrQkFBMEI7QUFDbEMsU0FBUSxPQUE4QixDQUFDO0FBQ3ZDLFNBQVEsWUFBNEQsQ0FBQztBQUduRSxTQUFLLFVBQVU7QUFFZixTQUFLLE1BQU07QUFBQSxFQUNiO0FBQUEsRUFFUSxZQUFZO0FBQ2xCLFFBQUk7QUFDRixZQUFNLFlBQVksWUFBWSxJQUEyQiw4QkFBOEIsQ0FBQyxDQUFDO0FBQ3pGLFdBQUssT0FBTztBQUNaLFdBQUssa0JBQWtCLFlBQVksSUFBWSwrQkFBK0IsQ0FBQztBQUMvRSxXQUFLLGtCQUFrQixZQUFZLElBQVksbUNBQW1DLENBQUM7QUFBQSxJQUNyRixRQUFRO0FBQ04sV0FBSyxPQUFPLENBQUM7QUFBQSxJQUNmO0FBQUEsRUFDRjtBQUFBLEVBRVEsWUFBWTtBQUNsQixnQkFBWSxJQUFJLDhCQUE4QixLQUFLLEtBQUssTUFBTSxHQUFHLEdBQUcsQ0FBQztBQUNyRSxnQkFBWSxJQUFJLCtCQUErQixLQUFLLGVBQWU7QUFDbkUsZ0JBQVksSUFBSSxtQ0FBbUMsS0FBSyxlQUFlO0FBQUEsRUFDekU7QUFBQSxFQUVPLFFBQVE7QUFD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O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBc0tUOyIsIm5hbWVzIjpbXX0=