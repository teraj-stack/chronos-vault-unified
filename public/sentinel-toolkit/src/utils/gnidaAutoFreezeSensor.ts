import { safeStorage } from "/sentinel-toolkit/src/utils/selfRepairSystem.ts";
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
  // Pure Web Audio API Tone for Instant Auto-Freeze Feedback
  playFreezePulseSound() {
    if (!this.audioFeedback || typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(1e-3, ctx.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.18);
    } catch {
    }
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
      this.playFreezePulseSound();
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
    this.playFreezePulseSound();
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImduaWRhQXV0b0ZyZWV6ZVNlbnNvci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzYWZlU3RvcmFnZSB9IGZyb20gJy4vc2VsZlJlcGFpclN5c3RlbSc7XG5pbXBvcnQgeyBSYWRhckduaWRhVGFyZ2V0LCBTaW11bGF0ZWRQcm9jZXNzLCBTeXN0ZW1JT05vZGUgfSBmcm9tICcuLi90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgR25pZGFEZXRlY3Rpb25FdmVudCB7XG4gIGlkOiBzdHJpbmc7XG4gIHRpbWVzdGFtcDogc3RyaW5nO1xuICB0YXJnZXROYW1lOiBzdHJpbmc7XG4gIGduaWRhVHlwZTogc3RyaW5nO1xuICBwaWQ/OiBudW1iZXI7XG4gIGh3bmQ/OiBzdHJpbmc7XG4gIGFnZ3Jlc3Npb25WZWN0b3I6IHN0cmluZztcbiAgYXNzb2NpYXRlZE5vZGU6IHN0cmluZztcbiAgZnJlZXplRHVyYXRpb25NczogbnVtYmVyO1xuICBmcmVlemVNZXRob2Q6ICdOdFN1c3BlbmRQcm9jZXNzJyB8ICdTSUdTVE9QJyB8ICdaZXJvTVpfTG9jayc7XG4gIHN0YXR1czogJ0FVVE9fRlJPWkVOJyB8ICdSQU1fTE9DS0VEJyB8ICdJT19SRVNUT1JFRCc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2Vuc29yQXV0b21hdG9uU3RhdHVzIHtcbiAgaXNBY3RpdmU6IGJvb2xlYW47XG4gIHN3ZWVwSW50ZXJ2YWxNczogbnVtYmVyO1xuICB0b3RhbERldGVjdGlvbnM6IG51bWJlcjtcbiAgdG90YWxBdXRvRnJvemVuOiBudW1iZXI7XG4gIGxhc3REZXRlY3Rpb24/OiBHbmlkYURldGVjdGlvbkV2ZW50IHwgbnVsbDtcbiAgbGFzdFN3ZWVwVGltZTogc3RyaW5nO1xuICBhdWRpb0ZlZWRiYWNrOiBib29sZWFuO1xuICBhdXRvUmVjb25zdHJ1Y3RJT05vZGVzOiBib29sZWFuO1xufVxuXG5jbGFzcyBHbmlkYUF1dG9GcmVlemVTZW5zb3JFbmdpbmUge1xuICBwcml2YXRlIGlzUnVubmluZzogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGludGVydmFsSWQ6IGFueSA9IG51bGw7XG4gIHByaXZhdGUgc3dlZXBJbnRlcnZhbE1zOiBudW1iZXIgPSAzNTA7XG4gIHByaXZhdGUgYXVkaW9GZWVkYmFjazogYm9vbGVhbiA9IHRydWU7XG4gIHByaXZhdGUgYXV0b1JlY29uc3RydWN0SU9Ob2RlczogYm9vbGVhbiA9IHRydWU7XG4gIHByaXZhdGUgdG90YWxEZXRlY3Rpb25zOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIHRvdGFsQXV0b0Zyb3plbjogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBsb2dzOiBHbmlkYURldGVjdGlvbkV2ZW50W10gPSBbXTtcbiAgcHJpdmF0ZSBsaXN0ZW5lcnM6IEFycmF5PChzdGF0dXM6IFNlbnNvckF1dG9tYXRvblN0YXR1cykgPT4gdm9pZD4gPSBbXTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmxvYWRTdGF0ZSgpO1xuICAgIC8vIFN0YXJ0IGF1dG9tYXRvbiBpbW1lZGlhdGVseSB1cG9uIGVuZ2luZSBpbml0aWFsaXphdGlvblxuICAgIHRoaXMuc3RhcnQoKTtcbiAgfVxuXG4gIHByaXZhdGUgbG9hZFN0YXRlKCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzYXZlZExvZ3MgPSBzYWZlU3RvcmFnZS5nZXQ8R25pZGFEZXRlY3Rpb25FdmVudFtdPignc2VudGluZWxfZ25pZGFfZnJlZXplX2xvZ3MnLCBbXSk7XG4gICAgICB0aGlzLmxvZ3MgPSBzYXZlZExvZ3M7XG4gICAgICB0aGlzLnRvdGFsQXV0b0Zyb3plbiA9IHNhZmVTdG9yYWdlLmdldDxudW1iZXI+KCdzZW50aW5lbF9nbmlkYV90b3RhbF9mcm96ZW4nLCAwKTtcbiAgICAgIHRoaXMudG90YWxEZXRlY3Rpb25zID0gc2FmZVN0b3JhZ2UuZ2V0PG51bWJlcj4oJ3NlbnRpbmVsX2duaWRhX3RvdGFsX2RldGVjdGlvbnMnLCAwKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIHRoaXMubG9ncyA9IFtdO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2F2ZVN0YXRlKCkge1xuICAgIHNhZmVTdG9yYWdlLnNldCgnc2VudGluZWxfZ25pZGFfZnJlZXplX2xvZ3MnLCB0aGlzLmxvZ3Muc2xpY2UoMCwgMTAwKSk7XG4gICAgc2FmZVN0b3JhZ2Uuc2V0KCdzZW50aW5lbF9nbmlkYV90b3RhbF9mcm96ZW4nLCB0aGlzLnRvdGFsQXV0b0Zyb3plbik7XG4gICAgc2FmZVN0b3JhZ2Uuc2V0KCdzZW50aW5lbF9nbmlkYV90b3RhbF9kZXRlY3Rpb25zJywgdGhpcy50b3RhbERldGVjdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIHN0YXJ0KCkge1xuICAgIGlmICh0aGlzLmlzUnVubmluZykgcmV0dXJuO1xuICAgIHRoaXMuaXNSdW5uaW5nID0gdHJ1ZTtcbiAgICB0aGlzLmludGVydmFsSWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB0aGlzLmF1dG9ub21vdXNTd2VlcEFuZEZyZWV6ZSgpLCB0aGlzLnN3ZWVwSW50ZXJ2YWxNcyk7XG4gICAgdGhpcy5ub3RpZnlMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIHB1YmxpYyBzdG9wKCkge1xuICAgIGlmICghdGhpcy5pc1J1bm5pbmcpIHJldHVybjtcbiAgICB0aGlzLmlzUnVubmluZyA9IGZhbHNlO1xuICAgIGlmICh0aGlzLmludGVydmFsSWQpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElkKTtcbiAgICAgIHRoaXMuaW50ZXJ2YWxJZCA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMubm90aWZ5TGlzdGVuZXJzKCk7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlQXVkaW8oZW5hYmxlZDogYm9vbGVhbikge1xuICAgIHRoaXMuYXVkaW9GZWVkYmFjayA9IGVuYWJsZWQ7XG4gIH1cblxuICBwdWJsaWMgc2V0U3dlZXBJbnRlcnZhbChtczogbnVtYmVyKSB7XG4gICAgdGhpcy5zd2VlcEludGVydmFsTXMgPSBNYXRoLm1heCgxMDAsIE1hdGgubWluKDIwMDAsIG1zKSk7XG4gICAgaWYgKHRoaXMuaXNSdW5uaW5nKSB7XG4gICAgICB0aGlzLnN0b3AoKTtcbiAgICAgIHRoaXMuc3RhcnQoKTtcbiAgICB9XG4gIH1cblxuICAvLyBQdXJlIFdlYiBBdWRpbyBBUEkgVG9uZSBmb3IgSW5zdGFudCBBdXRvLUZyZWV6ZSBGZWVkYmFja1xuICBwcml2YXRlIHBsYXlGcmVlemVQdWxzZVNvdW5kKCkge1xuICAgIGlmICghdGhpcy5hdWRpb0ZlZWRiYWNrIHx8IHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSByZXR1cm47XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IEF1ZGlvQ3R4ID0gd2luZG93LkF1ZGlvQ29udGV4dCB8fCAod2luZG93IGFzIGFueSkud2Via2l0QXVkaW9Db250ZXh0O1xuICAgICAgaWYgKCFBdWRpb0N0eCkgcmV0dXJuO1xuICAgICAgY29uc3QgY3R4ID0gbmV3IEF1ZGlvQ3R4KCk7XG4gICAgICBjb25zdCBvc2MgPSBjdHguY3JlYXRlT3NjaWxsYXRvcigpO1xuICAgICAgY29uc3QgZ2FpbiA9IGN0eC5jcmVhdGVHYWluKCk7XG5cbiAgICAgIG9zYy50eXBlID0gJ3Nhd3Rvb3RoJztcbiAgICAgIG9zYy5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoODgwLCBjdHguY3VycmVudFRpbWUpO1xuICAgICAgb3NjLmZyZXF1ZW5jeS5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDIyMCwgY3R4LmN1cnJlbnRUaW1lICsgMC4xOCk7XG5cbiAgICAgIGdhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLjEyLCBjdHguY3VycmVudFRpbWUpO1xuICAgICAgZ2Fpbi5nYWluLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKDAuMDAxLCBjdHguY3VycmVudFRpbWUgKyAwLjE4KTtcblxuICAgICAgb3NjLmNvbm5lY3QoZ2Fpbik7XG4gICAgICBnYWluLmNvbm5lY3QoY3R4LmRlc3RpbmF0aW9uKTtcblxuICAgICAgb3NjLnN0YXJ0KCk7XG4gICAgICBvc2Muc3RvcChjdHguY3VycmVudFRpbWUgKyAwLjE4KTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIEF1ZGlvIGNvbnRleHQgbWlnaHQgYmUgcmVzdHJpY3RlZCBiZWZvcmUgaW50ZXJhY3Rpb247IGlnbm9yZVxuICAgIH1cbiAgfVxuXG4gIC8vIENvcmUgQXV0b21hdG9uOiBEZXRlY3RzIGFueSBHbmlkYSBhbmQgaW5zdGFudGx5IGFwcGxpZXMgYXV0by1mcmVlemUgKE50U3VzcGVuZFByb2Nlc3MgLyBSQU0gVGhyZWFkIExvY2spXG4gIHB1YmxpYyBhdXRvbm9tb3VzU3dlZXBBbmRGcmVlemUoKSB7XG4gICAgbGV0IGRldGVjdGVkSW5UaGlzQ3ljbGUgPSAwO1xuICAgIGNvbnN0IHN0YXJ0VGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXG4gICAgLy8gMS4gU3dlZXAgUmFkYXIgR25pZGFzIGluIHBlcnNpc3RlbnQgc3RvcmFnZVxuICAgIGNvbnN0IGN1cnJlbnRHbmlkYXMgPSBzYWZlU3RvcmFnZS5nZXQ8UmFkYXJHbmlkYVRhcmdldFtdPignc2VudGluZWxfcmFkYXJfZ25pZGFzJywgW10pO1xuICAgIGxldCBnbmlkYXNNb2RpZmllZCA9IGZhbHNlO1xuXG4gICAgY29uc3QgdXBkYXRlZEduaWRhcyA9IGN1cnJlbnRHbmlkYXMubWFwKGduaWRhID0+IHtcbiAgICAgIC8vIElmIGduaWRhIGlzIGFjdGl2ZSAoV1lLUllUQSBvciBOQU1JRVJaT05BIG9yIE9TVFJaQUxfV19UT0tVKSBhbmQgaGFzIGhlYWx0aCA+IDBcbiAgICAgIGlmIChnbmlkYS5zdGF0ZSAhPT0gJ1pORVVUUkFMSVpPV0FOQScgJiYgZ25pZGEuc3RhdGUgIT09ICdaTklTWkNaT05BJyAmJiBnbmlkYS5oZWFsdGhQZXJjZW50ID4gMCkge1xuICAgICAgICBkZXRlY3RlZEluVGhpc0N5Y2xlKys7XG4gICAgICAgIHRoaXMudG90YWxEZXRlY3Rpb25zKys7XG4gICAgICAgIHRoaXMudG90YWxBdXRvRnJvemVuKys7XG5cbiAgICAgICAgY29uc3QgZnJlZXplRHVyYXRpb24gPSBNYXRoLnJvdW5kKHBlcmZvcm1hbmNlLm5vdygpIC0gc3RhcnRUaW1lKTtcblxuICAgICAgICBjb25zdCBldmVudDogR25pZGFEZXRlY3Rpb25FdmVudCA9IHtcbiAgICAgICAgICBpZDogYGZyZWV6ZS0ke0RhdGUubm93KCl9LSR7TWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIDUpfWAsXG4gICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpLFxuICAgICAgICAgIHRhcmdldE5hbWU6IGduaWRhLmFjdGl2ZVByb2Nlc3NOYW1lIHx8IGduaWRhLm5hbWUsXG4gICAgICAgICAgZ25pZGFUeXBlOiBnbmlkYS50eXBlTGFiZWwgfHwgZ25pZGEuZ25pZGFUeXBlLFxuICAgICAgICAgIGFnZ3Jlc3Npb25WZWN0b3I6IGduaWRhLmFnZ3Jlc3Npb25EZXNjcmlwdGlvbiB8fCAnSFdORF9UT1BNT1NUIFNjcmVlbiBMb2NrIC8gUkFNIEhpamFjaycsXG4gICAgICAgICAgYXNzb2NpYXRlZE5vZGU6IGduaWRhLmFzc29jaWF0ZWRJT05vZGVJZCB8fCAnbm9kZS1tb25pdG9yJyxcbiAgICAgICAgICBmcmVlemVEdXJhdGlvbk1zOiBNYXRoLm1heCgxLCBmcmVlemVEdXJhdGlvbiksXG4gICAgICAgICAgZnJlZXplTWV0aG9kOiAnTnRTdXNwZW5kUHJvY2VzcycsXG4gICAgICAgICAgc3RhdHVzOiAnQVVUT19GUk9aRU4nXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5sb2dzLnVuc2hpZnQoZXZlbnQpO1xuICAgICAgICBnbmlkYXNNb2RpZmllZCA9IHRydWU7XG5cbiAgICAgICAgLy8gRGlzcGF0Y2hlcyBnbG9iYWwgYnJvd3NlciBldmVudCBzbyBSYWRhciBhbmQgb3RoZXIgY29tcG9uZW50cyB1cGRhdGUgaW5zdGFudGx5XG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnc2VudGluZWw6Z25pZGEtYXV0by1mcm96ZW4nLCB7IGRldGFpbDogZXZlbnQgfSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmV0dXJuIGZyb3plbiBzdGF0ZVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLmduaWRhLFxuICAgICAgICAgIHN0YXRlOiAnWk5FVVRSQUxJWk9XQU5BJyBhcyBjb25zdCxcbiAgICAgICAgICBoZWFsdGhQZXJjZW50OiAwLFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIGduaWRhO1xuICAgIH0pO1xuXG4gICAgaWYgKGduaWRhc01vZGlmaWVkKSB7XG4gICAgICBzYWZlU3RvcmFnZS5zZXQoJ3NlbnRpbmVsX3JhZGFyX2duaWRhcycsIHVwZGF0ZWRHbmlkYXMpO1xuXG4gICAgICAvLyBSZWNvbnN0cnVjdCBhc3NvY2lhdGVkIGNvbXByb21pc2VkIEkvTyBub2RlcyAoZS5nLiByZXN0b3JlIE1vbml0b3IsIFJBTSwgTlZNZSlcbiAgICAgIGlmICh0aGlzLmF1dG9SZWNvbnN0cnVjdElPTm9kZXMpIHtcbiAgICAgICAgY29uc3QgaW9Ob2RlcyA9IHNhZmVTdG9yYWdlLmdldDxTeXN0ZW1JT05vZGVbXT4oJ3NlbnRpbmVsX3JhZGFyX2lvX25vZGVzJywgW10pO1xuICAgICAgICBjb25zdCByZXN0b3JlZE5vZGVzID0gaW9Ob2Rlcy5tYXAobm9kZSA9PiB7XG4gICAgICAgICAgaWYgKG5vZGUuc3RhdHVzID09PSAnQ09NUFJPTUlTRUQnKSB7XG4gICAgICAgICAgICByZXR1cm4geyAuLi5ub2RlLCBzdGF0dXM6ICdSRUNPTlNUUlVDVEVEJyBhcyBjb25zdCwgY29tcHJvbWlzZWRCeUduaWRhSWQ6IG51bGwgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgIH0pO1xuICAgICAgICBzYWZlU3RvcmFnZS5zZXQoJ3NlbnRpbmVsX3JhZGFyX2lvX25vZGVzJywgcmVzdG9yZWROb2Rlcyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gMi4gU3dlZXAgU2ltdWxhdGVkIFByb2Nlc3NlcyAoSW50ZXJhY3RpdmUgU2ltdWxhdG9yIC8gV2F0Y2hkb2cpXG4gICAgY29uc3Qgc2ltdWxhdGVkUHJvY3MgPSBzYWZlU3RvcmFnZS5nZXQ8U2ltdWxhdGVkUHJvY2Vzc1tdPignc2VudGluZWxfc2ltdWxhdGVkX3Byb2Nlc3NlcycsIFtdKTtcbiAgICBsZXQgcHJvY3NNb2RpZmllZCA9IGZhbHNlO1xuXG4gICAgY29uc3QgdXBkYXRlZFByb2NzID0gc2ltdWxhdGVkUHJvY3MubWFwKHByb2MgPT4ge1xuICAgICAgY29uc3QgaXNSb2d1ZUduaWRhID0gKHByb2MuaXNUb3BNb3N0IHx8IHByb2MuaXNGdWxsc2NyZWVuIHx8IHByb2MuaGFzRmx1dHRlckRsbCB8fCBwcm9jLmlzUm9ndWUpICYmXG4gICAgICAgIHByb2Muc3RhdHVzICE9PSAnc3VzcGVuZGVkJyAmJiBwcm9jLnN0YXR1cyAhPT0gJ25ldXRyYWxpemVkJyAmJiBwcm9jLnN0YXR1cyAhPT0gJ3Rlcm1pbmF0ZWQnO1xuXG4gICAgICBpZiAoaXNSb2d1ZUduaWRhKSB7XG4gICAgICAgIGRldGVjdGVkSW5UaGlzQ3ljbGUrKztcbiAgICAgICAgdGhpcy50b3RhbERldGVjdGlvbnMrKztcbiAgICAgICAgdGhpcy50b3RhbEF1dG9Gcm96ZW4rKztcblxuICAgICAgICBjb25zdCBldmVudDogR25pZGFEZXRlY3Rpb25FdmVudCA9IHtcbiAgICAgICAgICBpZDogYGZyZWV6ZS1wcm9jLSR7RGF0ZS5ub3coKX0tJHtwcm9jLnBpZH1gLFxuICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoKSxcbiAgICAgICAgICB0YXJnZXROYW1lOiBwcm9jLm5hbWUsXG4gICAgICAgICAgZ25pZGFUeXBlOiAnR05JREFfRUtSQU5PV0EgKFRvcE1vc3QgT3ZlcmxheSknLFxuICAgICAgICAgIHBpZDogcHJvYy5waWQsXG4gICAgICAgICAgYWdncmVzc2lvblZlY3RvcjogYFBJRCAke3Byb2MucGlkfSB3eW11c2nFgiBIV05EX1RPUE1PU1QgKCR7cHJvYy53aWR0aH14JHtwcm9jLmhlaWdodH0pIGkgd3l3xYJhc3pjennFgiBmb2t1cy5gLFxuICAgICAgICAgIGFzc29jaWF0ZWROb2RlOiAnT1VULURXTS0wMSAoTW9uaXRvciknLFxuICAgICAgICAgIGZyZWV6ZUR1cmF0aW9uTXM6IDEsXG4gICAgICAgICAgZnJlZXplTWV0aG9kOiAnTnRTdXNwZW5kUHJvY2VzcycsXG4gICAgICAgICAgc3RhdHVzOiAnQVVUT19GUk9aRU4nXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5sb2dzLnVuc2hpZnQoZXZlbnQpO1xuICAgICAgICBwcm9jc01vZGlmaWVkID0gdHJ1ZTtcblxuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3NlbnRpbmVsOmduaWRhLWF1dG8tZnJvemVuJywgeyBkZXRhaWw6IGV2ZW50IH0pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4ucHJvYyxcbiAgICAgICAgICBzdGF0dXM6ICdzdXNwZW5kZWQnIGFzIGNvbnN0LFxuICAgICAgICAgIGlzQmxvY2tlZDogdHJ1ZSxcbiAgICAgICAgICBvcGFjaXR5OiAwLjE1LFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHByb2M7XG4gICAgfSk7XG5cbiAgICBpZiAocHJvY3NNb2RpZmllZCkge1xuICAgICAgc2FmZVN0b3JhZ2Uuc2V0KCdzZW50aW5lbF9zaW11bGF0ZWRfcHJvY2Vzc2VzJywgdXBkYXRlZFByb2NzKTtcbiAgICB9XG5cbiAgICBpZiAoZGV0ZWN0ZWRJblRoaXNDeWNsZSA+IDApIHtcbiAgICAgIHRoaXMucGxheUZyZWV6ZVB1bHNlU291bmQoKTtcbiAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgICB0aGlzLm5vdGlmeUxpc3RlbmVycygpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEZvcmNlIGFuIGluc3RhbnQgYXV0by1mcmVlemUgb24gYSB0YXJnZXQgaW1tZWRpYXRlbHlcbiAgcHVibGljIGZyZWV6ZVRhcmdldEluc3RhbnRseSh0YXJnZXROYW1lOiBzdHJpbmcsIGFnZ3Jlc3Npb25WZWN0b3I6IHN0cmluZyA9ICdXeW11c3pvbnkgYXV0by1mcmVlemUnKSB7XG4gICAgdGhpcy50b3RhbERldGVjdGlvbnMrKztcbiAgICB0aGlzLnRvdGFsQXV0b0Zyb3plbisrO1xuXG4gICAgY29uc3QgZXZlbnQ6IEduaWRhRGV0ZWN0aW9uRXZlbnQgPSB7XG4gICAgICBpZDogYG1hbnVhbC1mcmVlemUtJHtEYXRlLm5vdygpfWAsXG4gICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCksXG4gICAgICB0YXJnZXROYW1lLFxuICAgICAgZ25pZGFUeXBlOiAnR05JREFfV1lLUllUQScsXG4gICAgICBhZ2dyZXNzaW9uVmVjdG9yLFxuICAgICAgYXNzb2NpYXRlZE5vZGU6ICdPVVQtRFdNLTAxIChNb25pdG9yKScsXG4gICAgICBmcmVlemVEdXJhdGlvbk1zOiAxLFxuICAgICAgZnJlZXplTWV0aG9kOiAnTnRTdXNwZW5kUHJvY2VzcycsXG4gICAgICBzdGF0dXM6ICdBVVRPX0ZST1pFTidcbiAgICB9O1xuXG4gICAgdGhpcy5sb2dzLnVuc2hpZnQoZXZlbnQpO1xuICAgIHRoaXMucGxheUZyZWV6ZVB1bHNlU291bmQoKTtcbiAgICB0aGlzLnNhdmVTdGF0ZSgpO1xuXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3NlbnRpbmVsOmduaWRhLWF1dG8tZnJvemVuJywgeyBkZXRhaWw6IGV2ZW50IH0pKTtcbiAgICB9XG5cbiAgICB0aGlzLm5vdGlmeUxpc3RlbmVycygpO1xuICB9XG5cbiAgcHVibGljIGdldFN0YXR1cygpOiBTZW5zb3JBdXRvbWF0b25TdGF0dXMge1xuICAgIHJldHVybiB7XG4gICAgICBpc0FjdGl2ZTogdGhpcy5pc1J1bm5pbmcsXG4gICAgICBzd2VlcEludGVydmFsTXM6IHRoaXMuc3dlZXBJbnRlcnZhbE1zLFxuICAgICAgdG90YWxEZXRlY3Rpb25zOiB0aGlzLnRvdGFsRGV0ZWN0aW9ucyxcbiAgICAgIHRvdGFsQXV0b0Zyb3plbjogdGhpcy50b3RhbEF1dG9Gcm96ZW4sXG4gICAgICBsYXN0RGV0ZWN0aW9uOiB0aGlzLmxvZ3NbMF0gfHwgbnVsbCxcbiAgICAgIGxhc3RTd2VlcFRpbWU6IG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCksXG4gICAgICBhdWRpb0ZlZWRiYWNrOiB0aGlzLmF1ZGlvRmVlZGJhY2ssXG4gICAgICBhdXRvUmVjb25zdHJ1Y3RJT05vZGVzOiB0aGlzLmF1dG9SZWNvbnN0cnVjdElPTm9kZXMsXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRMb2dzKCk6IEduaWRhRGV0ZWN0aW9uRXZlbnRbXSB7XG4gICAgcmV0dXJuIHRoaXMubG9ncztcbiAgfVxuXG4gIHB1YmxpYyBjbGVhckxvZ3MoKSB7XG4gICAgdGhpcy5sb2dzID0gW107XG4gICAgdGhpcy5zYXZlU3RhdGUoKTtcbiAgICB0aGlzLm5vdGlmeUxpc3RlbmVycygpO1xuICB9XG5cbiAgcHVibGljIHN1YnNjcmliZShsaXN0ZW5lcjogKHN0YXR1czogU2Vuc29yQXV0b21hdG9uU3RhdHVzKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgbGlzdGVuZXIodGhpcy5nZXRTdGF0dXMoKSk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHRoaXMubGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnMuZmlsdGVyKGwgPT4gbCAhPT0gbGlzdGVuZXIpO1xuICAgIH07XG4gIH1cblxuICBwcml2YXRlIG5vdGlmeUxpc3RlbmVycygpIHtcbiAgICBjb25zdCBzdGF0dXMgPSB0aGlzLmdldFN0YXR1cygpO1xuICAgIHRoaXMubGlzdGVuZXJzLmZvckVhY2gobCA9PiBsKHN0YXR1cykpO1xuICB9XG59XG5cbi8vIEdsb2JhbCBTaW5nbGV0b24gQXV0b21hdG9uIEluc3RhbmNlXG5leHBvcnQgY29uc3QgZ25pZGFTZW5zb3IgPSBuZXcgR25pZGFBdXRvRnJlZXplU2Vuc29yRW5naW5lKCk7XG5cbi8vIFN0YW5kYWxvbmUgUHJvZHVjdGlvbiBQeXRob24gRGFlbW9uIFNjcmlwdDogUHVyZSBCYWNrZ3JvdW5kIEF1dG9tYXRpb24gKE5vIFVJLCAxMDAlIEF1dG9tYXRvbilcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUF1dG9ub21vdXNQeXRob25EYWVtb25TY3JpcHQoKTogc3RyaW5nIHtcbiAgcmV0dXJuIGAjIS91c3IvYmluL2VudiBweXRob24zXG4jID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuIyBBVVRPTk9NSUNaTlkgQ1pVSk5JSyBHTklEICYgREFFTU9OIE5BVFlDSE1JQVNUT1dFR08gQVVUTy1GUkVFWlUgVyBSQU1cbiMgUGxpazogZ25pZGFfYXV0b19mcmVlemVfZGFlbW9uLnB5XG4jIFxuIyBQUlpFWk5BQ1pFTklFOlxuIyBEemlhxYJhIGpha28gYmV6b2JzxYJ1Z293eSBhdXRvbWF0IHcgdGxlIChaZXJvIFVJKS4gQ2nEhWdsZSBza2FudWplIHN5c3RlbSxcbiMgd3lrcnl3YSBHbmlkeSAobmFrxYJhZGtpIEZsdXR0ZXIsIG9rbmEgSFdORF9UT1BNT1NULCBrcmFkemllxbwgZm9rdXN1LFxuIyB3c3RyenlrbmnEmWNpYSBETEwpIGkgdyB1xYJhbWt1IG1pbGlzZWt1bmR5ICgwIG1zKSBhcGxpa3VqZSBOdFN1c3BlbmRQcm9jZXNzXG4jIChuYXR5Y2htaWFzdG93eSBSQU0gVGhyZWFkIEZyZWV6ZSksIHpkZWptdWplIGZsYWfEmSBUb3BNb3N0IGkgYmxva3VqZSBwbGlrLlxuIyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuaW1wb3J0IG9zXG5pbXBvcnQgc3lzXG5pbXBvcnQgdGltZVxuaW1wb3J0IHNpZ25hbFxuaW1wb3J0IGN0eXBlc1xuZnJvbSBjdHlwZXMgaW1wb3J0IHdpbnR5cGVzXG5cbiMgS29uZmlndXJhY2phIGN6dWpuaWthXG5QT0xMX0lOVEVSVkFMX1NFQyA9IDAuMTUgICAjIEN6xJlzdG90bGl3b8WbxIcgc2thbm93YW5pYSAoMTUwIG1zKVxuQVVUT19TVFJJUF9UT1BNT1NUID0gVHJ1ZSAgIyBaZGVqbW93YW5pZSBmbGFnaSBIV05EX1RPUE1PU1QgeiBva2llblxuQVVUT19TVVNQRU5EX1JBTSAgID0gVHJ1ZSAgIyBOYXR5Y2htaWFzdG93ZSB6YW1yb8W8ZW5pZSB3xIV0a8OzdyB3IFJBTVxuQVVUT19MT0dfQ09OU09MRSAgID0gVHJ1ZSAgIyBEemllbm5payB6ZGFyemXFhCBuYSBzdGFuZGFyZG93ZSB3eWrFm2NpZVxuXG4jIFN5Z25hdHVyeSB6xYJvxZtsaXd5Y2ggcHJvY2Vzw7N3IC8gR25pZFxuR05JREFfS0VZV09SRFMgPSBbXG4gICAgXCJmbHV0dGVyX2Rlc2t0b3BcIiwgXCJvdmVybGF5XCIsIFwic2NyZWVuX2xvY2tcIiwgXCJ0b3Btb3N0XCIsIFwiaGlqYWNrXCIsXG4gICAgXCJyYW5zb21cIiwgXCJ3aXBlclwiLCBcIm1pbmVyXCIsIFwiaG9va19zcHlcIiwgXCJiaXRzZG9qb1wiLCBcIndpbmRvd19tYW5hZ2VyXCJcbl1cblxuIyBXaW4zMiBDb25zdGFudHMgJiBTdHJ1Y3RzXG5IV05EX05PVE9QTU9TVCA9IC0yXG5TV1BfTk9TSVpFICAgICA9IDB4MDAwMVxuU1dQX05PTU9WRSAgICAgPSAweDAwMDJcblNXUF9OT0FDVElWQVRFID0gMHgwMDEwXG5XU19FWF9UT1BNT1NUICA9IDB4MDAwMDAwMDhcblBST0NFU1NfQUxMX0FDQ0VTUyA9IDB4MUYwRkZGXG5cbmNsYXNzIEduaWRhQXV0b0ZyZWV6ZURhZW1vbjpcbiAgICBkZWYgX19pbml0X18oc2VsZik6XG4gICAgICAgIHNlbGYuaXNfd2luZG93cyA9IG9zLm5hbWUgPT0gJ250J1xuICAgICAgICBzZWxmLmZyb3plbl9waWRzID0gc2V0KClcbiAgICAgICAgc2VsZi50b3RhbF9mcm96ZW5fY291bnQgPSAwXG4gICAgICAgIFxuICAgICAgICBpZiBzZWxmLmlzX3dpbmRvd3M6XG4gICAgICAgICAgICBzZWxmLnVzZXIzMiA9IGN0eXBlcy53aW5kbGwudXNlcjMyXG4gICAgICAgICAgICBzZWxmLmtlcm5lbDMyID0gY3R5cGVzLndpbmRsbC5rZXJuZWwzMlxuICAgICAgICAgICAgc2VsZi5udGRsbCA9IGN0eXBlcy53aW5kbGwubnRkbGxcbiAgICAgICAgcHJpbnQoXCI9XCIgKiA3NSlcbiAgICAgICAgcHJpbnQoXCJbKl0gQVVUT05PTUlDWk5ZIENaVUpOSUsgR05JRCBaQUlOSUNKQUxJWk9XQU5ZIChUUllCIEFVVE9NQVRVIFcgVExFKVwiKVxuICAgICAgICBwcmludChmXCJbKl0gUGxhdGZvcm1hOiB7c3lzLnBsYXRmb3JtLnVwcGVyKCl9IHwgSW50ZXJ3YcWCOiB7UE9MTF9JTlRFUlZBTF9TRUN9c1wiKVxuICAgICAgICBwcmludChcIlsqXSBHb3Rvd3kuIEthxbxkYSB3eWtyeXRhIEduaWRhIHpvc3RhbmllIHphbXJvxbxvbmEgYXV0b21hdHljem5pZSAoMCBtcykuXCIpXG4gICAgICAgIHByaW50KFwiPVwiICogNzUpXG5cbiAgICBkZWYgZnJlZXplX3Byb2Nlc3NfcmFtKHNlbGYsIHBpZCwgcHJvY19uYW1lPVwiTmllem5hbmEgR25pZGFcIik6XG4gICAgICAgIFwiXCJcIkFwbGlrdWplIG5hdHljaG1pYXN0b3d5IEF1dG8tRnJlZSAoTnRTdXNwZW5kUHJvY2VzcyB3IFJBTSlcIlwiXCJcbiAgICAgICAgaWYgcGlkIGluIHNlbGYuZnJvemVuX3BpZHMgb3IgcGlkIDw9IDQ6XG4gICAgICAgICAgICByZXR1cm4gRmFsc2VcbiAgICAgICAgICAgIFxuICAgICAgICBzdWNjZXNzID0gRmFsc2VcbiAgICAgICAgaWYgc2VsZi5pc193aW5kb3dzOlxuICAgICAgICAgICAgaF9wcm9jID0gc2VsZi5rZXJuZWwzMi5PcGVuUHJvY2VzcyhQUk9DRVNTX0FMTF9BQ0NFU1MsIEZhbHNlLCBwaWQpXG4gICAgICAgICAgICBpZiBoX3Byb2M6XG4gICAgICAgICAgICAgICAgc3RhdHVzID0gc2VsZi5udGRsbC5OdFN1c3BlbmRQcm9jZXNzKGhfcHJvYylcbiAgICAgICAgICAgICAgICBzZWxmLmtlcm5lbDMyLkNsb3NlSGFuZGxlKGhfcHJvYylcbiAgICAgICAgICAgICAgICBpZiBzdGF0dXMgPT0gMDpcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyA9IFRydWVcbiAgICAgICAgZWxzZTpcbiAgICAgICAgICAgIHRyeTpcbiAgICAgICAgICAgICAgICBvcy5raWxsKHBpZCwgc2lnbmFsLlNJR1NUT1ApXG4gICAgICAgICAgICAgICAgc3VjY2VzcyA9IFRydWVcbiAgICAgICAgICAgIGV4Y2VwdCBFeGNlcHRpb246XG4gICAgICAgICAgICAgICAgcGFzc1xuXG4gICAgICAgIGlmIHN1Y2Nlc3M6XG4gICAgICAgICAgICBzZWxmLmZyb3plbl9waWRzLmFkZChwaWQpXG4gICAgICAgICAgICBzZWxmLnRvdGFsX2Zyb3plbl9jb3VudCArPSAxXG4gICAgICAgICAgICBpZiBBVVRPX0xPR19DT05TT0xFOlxuICAgICAgICAgICAgICAgIHByaW50KGZcIlvimqEgQVVUTy1GUkVFWkVdIENaVUpOSUsgV1lLUlnFgSBHTklExJg6IFBJRD17cGlkfSAoe3Byb2NfbmFtZX0pXCIpXG4gICAgICAgICAgICAgICAgcHJpbnQoZlwiICAgICAgICAgICAgICAgLT4gV8SFdGtpIG5hdHljaG1pYXN0IHphbXJvxbxvbmUgdyBSQU0gKE50U3VzcGVuZFByb2Nlc3MpIVwiKVxuICAgICAgICAgICAgICAgIHByaW50KGZcIiAgICAgICAgICAgICAgIC0+IMWBxIVjem5pZSB6bmV1dHJhbGl6b3dhbnljaCBHbmlkOiB7c2VsZi50b3RhbF9mcm96ZW5fY291bnR9XCIpXG4gICAgICAgIHJldHVybiBzdWNjZXNzXG5cbiAgICBkZWYgc3RyaXBfdG9wbW9zdF93aW5kb3coc2VsZiwgaHduZCk6XG4gICAgICAgIFwiXCJcIlpkZWptdWplIGZsYWfEmSBIV05EX1RPUE1PU1QgeiBva25hIG5ha8WCYWRraVwiXCJcIlxuICAgICAgICBpZiBub3Qgc2VsZi5pc193aW5kb3dzOlxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIGV4X3N0eWxlID0gc2VsZi51c2VyMzIuR2V0V2luZG93TG9uZ1coaHduZCwgLTIwKSAjIEdXTF9FWFNUWUxFXG4gICAgICAgIGlmIGV4X3N0eWxlICYgV1NfRVhfVE9QTU9TVDpcbiAgICAgICAgICAgIHNlbGYudXNlcjMyLlNldFdpbmRvd1BvcyhcbiAgICAgICAgICAgICAgICBod25kLCBcbiAgICAgICAgICAgICAgICBIV05EX05PVE9QTU9TVCwgXG4gICAgICAgICAgICAgICAgMCwgMCwgMCwgMCwgXG4gICAgICAgICAgICAgICAgU1dQX05PTU9WRSB8IFNXUF9OT1NJWkUgfCBTV1BfTk9BQ1RJVkFURVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgaWYgQVVUT19MT0dfQ09OU09MRTpcbiAgICAgICAgICAgICAgICBwcmludChmXCJb4pqhIEkvTyBSRVNUT1JFXSBPZHp5c2thbm8gZm9rdXMgbW9uaXRvcmEgemUgesWCb8WbbGl3ZWdvIEhXTkQ9e2h3bmR9XCIpXG5cbiAgICBkZWYgc2Nhbl93aW5kb3dzX2FuZF9mcmVlemUoc2VsZik6XG4gICAgICAgIFwiXCJcIlNrYW51amUgYWt0eXduZSBva25hIGkgcHJvY2VzeSB3IHBvc3p1a2l3YW5pdSBjZWNoIGFncmVzamkgbmFrxYJhZGtvd2VqXCJcIlwiXG4gICAgICAgIGlmIG5vdCBzZWxmLmlzX3dpbmRvd3M6XG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICBXTkRFTlVNUFJPQyA9IGN0eXBlcy5XSU5GVU5DVFlQRSh3aW50eXBlcy5CT09MLCB3aW50eXBlcy5IV05ELCB3aW50eXBlcy5MUEFSQU0pXG5cbiAgICAgICAgZGVmIGVudW1fd2luZG93X2NhbGxiYWNrKGh3bmQsIGxQYXJhbSk6XG4gICAgICAgICAgICBpZiBub3Qgc2VsZi51c2VyMzIuSXNXaW5kb3dWaXNpYmxlKGh3bmQpOlxuICAgICAgICAgICAgICAgIHJldHVybiBUcnVlXG5cbiAgICAgICAgICAgIHBpZCA9IHdpbnR5cGVzLkRXT1JEKClcbiAgICAgICAgICAgIHNlbGYudXNlcjMyLkdldFdpbmRvd1RocmVhZFByb2Nlc3NJZChod25kLCBjdHlwZXMuYnlyZWYocGlkKSlcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZXhfc3R5bGUgPSBzZWxmLnVzZXIzMi5HZXRXaW5kb3dMb25nVyhod25kLCAtMjApXG4gICAgICAgICAgICBpc190b3Btb3N0ID0gYm9vbChleF9zdHlsZSAmIFdTX0VYX1RPUE1PU1QpXG5cbiAgICAgICAgICAgIGxlbmd0aCA9IHNlbGYudXNlcjMyLkdldFdpbmRvd1RleHRMZW5ndGhXKGh3bmQpXG4gICAgICAgICAgICBidWZmID0gY3R5cGVzLmNyZWF0ZV91bmljb2RlX2J1ZmZlcihsZW5ndGggKyAxKVxuICAgICAgICAgICAgc2VsZi51c2VyMzIuR2V0V2luZG93VGV4dFcoaHduZCwgYnVmZiwgbGVuZ3RoICsgMSlcbiAgICAgICAgICAgIHRpdGxlID0gYnVmZi52YWx1ZS5sb3dlcigpXG5cbiAgICAgICAgICAgICMgU3ByYXdkemVuaWUgY3p5IG9rbm8gbm9zaSBjZWNoeSBhZ3Jlc3l3bmVqIEduaWR5XG4gICAgICAgICAgICBpc19nbmlkYSA9IGlzX3RvcG1vc3Qgb3IgYW55KGt3IGluIHRpdGxlIGZvciBrdyBpbiBHTklEQV9LRVlXT1JEUylcblxuICAgICAgICAgICAgaWYgaXNfZ25pZGEgYW5kIHBpZC52YWx1ZSBub3QgaW4gc2VsZi5mcm96ZW5fcGlkczpcbiAgICAgICAgICAgICAgICBpZiBBVVRPX1NUUklQX1RPUE1PU1Q6XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3RyaXBfdG9wbW9zdF93aW5kb3coaHduZClcbiAgICAgICAgICAgICAgICBpZiBBVVRPX1NVU1BFTkRfUkFNOlxuICAgICAgICAgICAgICAgICAgICBzZWxmLmZyZWV6ZV9wcm9jZXNzX3JhbShwaWQudmFsdWUsIGZcIk9rbm86ICd7YnVmZi52YWx1ZX0nXCIpXG5cbiAgICAgICAgICAgIHJldHVybiBUcnVlXG5cbiAgICAgICAgc2VsZi51c2VyMzIuRW51bVdpbmRvd3MoV05ERU5VTVBST0MoZW51bV93aW5kb3dfY2FsbGJhY2spLCAwKVxuXG4gICAgZGVmIHNjYW5fcHJvY2Vzc2VzX2J5X25hbWUoc2VsZik6XG4gICAgICAgIFwiXCJcIlNrYW51amUgcHJvY2VzeSB6YSBwb21vY8SFIHN5c3RlbW93eWNoIG5hcnrEmWR6aSBsdWIgcHN1dGlsXCJcIlwiXG4gICAgICAgIHRyeTpcbiAgICAgICAgICAgIGltcG9ydCBwc3V0aWxcbiAgICAgICAgICAgIGZvciBwcm9jIGluIHBzdXRpbC5wcm9jZXNzX2l0ZXIoWydwaWQnLCAnbmFtZScsICdleGUnLCAnY21kbGluZSddKTpcbiAgICAgICAgICAgICAgICB0cnk6XG4gICAgICAgICAgICAgICAgICAgIHBfbmFtZSA9IChwcm9jLmluZm9bJ25hbWUnXSBvciAnJykubG93ZXIoKVxuICAgICAgICAgICAgICAgICAgICBwX2V4ZSAgPSAocHJvYy5pbmZvWydleGUnXSBvciAnJykubG93ZXIoKVxuICAgICAgICAgICAgICAgICAgICBwX2NtZCAgPSBcIiBcIi5qb2luKHByb2MuaW5mb1snY21kbGluZSddIG9yIFtdKS5sb3dlcigpXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgYW55KGt3IGluIHBfbmFtZSBvciBrdyBpbiBwX2V4ZSBvciBrdyBpbiBwX2NtZCBmb3Iga3cgaW4gR05JREFfS0VZV09SRFMpOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5mcmVlemVfcHJvY2Vzc19yYW0ocHJvYy5pbmZvWydwaWQnXSwgcHJvYy5pbmZvWyduYW1lJ10pXG4gICAgICAgICAgICAgICAgZXhjZXB0IChwc3V0aWwuTm9TdWNoUHJvY2VzcywgcHN1dGlsLkFjY2Vzc0RlbmllZCk6XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIGV4Y2VwdCBJbXBvcnRFcnJvcjpcbiAgICAgICAgICAgICMgVHJ5YiBiZXogcHN1dGlsIC0gRW51bVdpbmRvd3MgaSBBUEkgasSFZHJhIHd5a29udWrEhSBjYcWCxIUgcHJhY8SZXG4gICAgICAgICAgICBwYXNzXG5cbiAgICBkZWYgcnVuX2ZvcmV2ZXIoc2VsZik6XG4gICAgICAgIFwiXCJcIlDEmXRsYSBhdXRvbWF0eWN6bmEgdyB0bGUgKFplcm8gVUksIGN6eXN0eSBhdXRvbWF0KVwiXCJcIlxuICAgICAgICB0cnk6XG4gICAgICAgICAgICB3aGlsZSBUcnVlOlxuICAgICAgICAgICAgICAgIHNlbGYuc2Nhbl93aW5kb3dzX2FuZF9mcmVlemUoKVxuICAgICAgICAgICAgICAgIHNlbGYuc2Nhbl9wcm9jZXNzZXNfYnlfbmFtZSgpXG4gICAgICAgICAgICAgICAgdGltZS5zbGVlcChQT0xMX0lOVEVSVkFMX1NFQylcbiAgICAgICAgZXhjZXB0IEtleWJvYXJkSW50ZXJydXB0OlxuICAgICAgICAgICAgcHJpbnQoXCJcXFxcblsqXSBDenVqbmlrIHphdHJ6eW1hbnkgcHJ6ZXogdcW8eXRrb3duaWthLlwiKVxuXG5pZiBfX25hbWVfXyA9PSAnX19tYWluX18nOlxuICAgIGRhZW1vbiA9IEduaWRhQXV0b0ZyZWV6ZURhZW1vbigpXG4gICAgZGFlbW9uLnJ1bl9mb3JldmVyKClcbmA7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aUM7QUFDdEMsV0FBTyxLQUFLO0FBQUEsRUFDZDtBQUFBLEVBRU8sWUFBWTtBQUNqQixTQUFLLE9BQU8sQ0FBQztBQUNiLFNBQUssVUFBVTtBQUNmLFNBQUssZ0JBQWdCO0FBQUEsRUFDdkI7QUFBQSxFQUVPLFVBQVUsVUFBbUQ7QUFDbEUsU0FBSyxVQUFVLEtBQUssUUFBUTtBQUM1QixhQUFTLEtBQUssVUFBVSxDQUFDO0FBQ3pCLFdBQU8sTUFBTTtBQUNYLFdBQUssWUFBWSxLQUFLLFVBQVUsT0FBTyxPQUFLLE1BQU0sUUFBUTtBQUFBLElBQzVEO0FBQUEsRUFDRjtBQUFBLEVBRVEsa0JBQWtCO0FBQ3hCLFVBQU0sU0FBUyxLQUFLLFVBQVU7QUFDOUIsU0FBSyxVQUFVLFFBQVEsT0FBSyxFQUFFLE1BQU0sQ0FBQztBQUFBLEVBQ3ZDO0FBQ0Y7QUFHTyxhQUFNLGNBQWMsSUFBSSw0QkFBNEI7QUFHcEQsZ0JBQVMsdUNBQStDO0FBQzdELFNBQU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFzS1Q7IiwibmFtZXMiOltdfQ==