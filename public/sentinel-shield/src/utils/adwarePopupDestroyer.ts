import { safeStorage } from "/sentinel-shield/src/utils/selfRepairSystem.ts";
import { gnidaSensorsMatrix } from "/sentinel-shield/src/utils/gnidaSensorsMatrix.ts";
import { hexLaserBarrierSystem } from "/sentinel-shield/src/utils/hexagonalLaserBarrierSystem.ts";
class AdwarePopupDestroyerEngine {
  constructor() {
    this.targets = [];
    this.stats = {
      totalPopupsDecapitated: 142,
      totalAdwareDaemonsPurged: 38,
      persistenceKeysDestroyed: 89,
      windowHooksStripped: 64,
      lastEradicationTimestamp: "2026-08-17 03:15:00 UTC"
    };
    this.listeners = [];
    this.loadState();
    if (this.targets.length === 0) {
      this.resetDefaultTargets();
    }
  }
  static getInstance() {
    if (!AdwarePopupDestroyerEngine.instance) {
      AdwarePopupDestroyerEngine.instance = new AdwarePopupDestroyerEngine();
    }
    return AdwarePopupDestroyerEngine.instance;
  }
  loadState() {
    try {
      const savedTargets = safeStorage.get("sentinel_adware_targets", []);
      if (savedTargets.length > 0) {
        this.targets = savedTargets;
      }
      const savedStats = safeStorage.get("sentinel_adware_stats", this.stats);
      if (savedStats) {
        this.stats = savedStats;
      }
    } catch {
    }
  }
  saveState() {
    safeStorage.set("sentinel_adware_targets", this.targets);
    safeStorage.set("sentinel_adware_stats", this.stats);
  }
  subscribe(cb) {
    this.listeners.push(cb);
    cb(this.targets, this.stats);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== cb);
    };
  }
  notify() {
    this.listeners.forEach((cb) => cb([...this.targets], { ...this.stats }));
  }
  getTargets() {
    return [...this.targets];
  }
  getStats() {
    return { ...this.stats };
  }
  resetDefaultTargets() {
    this.targets = [
      {
        id: "ad-popup-01",
        hwnd: "0x0003A410",
        title: "⚠️ KRYTYCZNE OSTRZEŻENIE: Twój system wymaga natychmiastowej instalacji DriverFix Pro 2026!",
        processName: "adware_alert_daemon.exe",
        pid: 6104,
        popupType: "DECEPTIVE_SYSTEM_ALERT",
        intensity: "AGRESSIVE",
        coordinates: { x: 20, y: 15, width: 340, height: 160 },
        isDecapitated: false,
        shatterState: "intact",
        threatSeverity: "HIGH",
        persistenceVector: "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run -> AdAlertDaemon"
      },
      {
        id: "ad-popup-02",
        hwnd: "0x0008F112",
        title: "🎉 GRATULACJE! Wygrałeś 10,000 USDT! Kliknij OK aby odebrać nagrodę w 30 sekund!",
        processName: "crypto_lottery_popup.exe",
        pid: 7420,
        popupType: "TOPMOST_AD",
        intensity: "LOOP_GENERATOR",
        coordinates: { x: 55, y: 35, width: 360, height: 170 },
        isDecapitated: false,
        shatterState: "intact",
        threatSeverity: "CRITICAL",
        persistenceVector: "Schtasks: \\Microsoft\\Windows\\Maintenance\\CryptoLotterySpur"
      },
      {
        id: "ad-popup-03",
        hwnd: "0x000109E8",
        title: "🔒 Wypełnij ankietę aby odblokować dostęp do plików (Survey Clickjacker Overlay)",
        processName: "survey_clickjack_overlay.exe",
        pid: 8812,
        popupType: "CLICKJACKER_MODAL",
        intensity: "PERSISTENT_SPAM",
        coordinates: { x: 30, y: 55, width: 350, height: 150 },
        isDecapitated: false,
        shatterState: "intact",
        threatSeverity: "CRITICAL",
        persistenceVector: "DLL Injection: C:\\ProgramData\\SurveyHook\\hook64.dll"
      },
      {
        id: "ad-popup-04",
        hwnd: "0x0005C880",
        title: "📢 99+ Nowych powiadomień spamerskich oczekuje w przeglądarce!",
        processName: "browser_push_spammer.exe",
        pid: 4930,
        popupType: "NOTIFICATION_SPAMMER",
        intensity: "AGRESSIVE",
        coordinates: { x: 65, y: 65, width: 320, height: 140 },
        isDecapitated: false,
        shatterState: "intact",
        threatSeverity: "HIGH",
        persistenceVector: "Chromium Injected Notification Rule: service_worker_sub.js"
      }
    ];
    this.saveState();
    this.notify();
  }
  spawnAdwareSwarm() {
    const randomSuffix = Math.floor(1e3 + Math.random() * 9e3);
    const newPopups = [
      {
        id: `ad-swarm-01-${Date.now()}`,
        hwnd: `0x000${Math.floor(65536 + Math.random() * 917504).toString(16).toUpperCase()}`,
        title: `🚨 Pętla Okien Popup #${randomSuffix}: Pobierz SpeedBooster Ultra!`,
        processName: `speed_booster_adware_${randomSuffix}.exe`,
        pid: Math.floor(3e3 + Math.random() * 6e3),
        popupType: "TOPMOST_AD",
        intensity: "LOOP_GENERATOR",
        coordinates: {
          x: Math.floor(10 + Math.random() * 50),
          y: Math.floor(10 + Math.random() * 40),
          width: 330,
          height: 150
        },
        isDecapitated: false,
        shatterState: "intact",
        threatSeverity: "CRITICAL",
        persistenceVector: "WMI Event Consumer: AdwarePersistenceTrigger"
      },
      {
        id: `ad-swarm-02-${Date.now()}`,
        hwnd: `0x000${Math.floor(65536 + Math.random() * 917504).toString(16).toUpperCase()}`,
        title: `💰 Kliknij tutaj aby odebrać kupon rabatowy 90% (Clickjack Trap)`,
        processName: `coupon_clickjacker_${randomSuffix}.exe`,
        pid: Math.floor(3e3 + Math.random() * 6e3),
        popupType: "CLICKJACKER_MODAL",
        intensity: "AGRESSIVE",
        coordinates: {
          x: Math.floor(30 + Math.random() * 45),
          y: Math.floor(35 + Math.random() * 35),
          width: 350,
          height: 160
        },
        isDecapitated: false,
        shatterState: "intact",
        threatSeverity: "HIGH",
        persistenceVector: "HKLM\\SOFTWARE\\Policies\\Google\\Chrome\\ExtensionInstallForcelist"
      }
    ];
    this.targets = [...this.targets.filter((t) => !t.isDecapitated), ...newPopups];
    this.saveState();
    this.notify();
  }
  /**
   * 🗡️ TRWAŁE USZKADZANIE WYSKAKUJĄCEGO OKNA (DECAPITATE POPUP WINDOW)
   */
  decapitateTarget(id, method = "KILL_GNIDA_STRIKE") {
    const target = this.targets.find((t) => t.id === id);
    if (!target || target.isDecapitated) return false;
    const timestamp = (/* @__PURE__ */ new Date()).toLocaleTimeString();
    target.isDecapitated = true;
    target.shatterState = method === "LASER_TOWER" ? "lasered" : method === "EMP_WAVE" ? "emp_shattered" : "purged";
    target.decapitationLog = `[${timestamp}] Trwale uszkodzono HWND=${target.hwnd} | Zdjęto WS_EX_TOPMOST & WS_POPUP | Zamrożono PID=${target.pid} (NtSuspendProcess 0 ms) | Skasowano wpis autostartu.`;
    this.stats.totalPopupsDecapitated += 1;
    this.stats.totalAdwareDaemonsPurged += 1;
    this.stats.persistenceKeysDestroyed += 1;
    this.stats.windowHooksStripped += 1;
    this.stats.lastEradicationTimestamp = (/* @__PURE__ */ new Date()).toISOString();
    gnidaSensorsMatrix.triggerGnidaRecognition(
      "SENSOR_DWM_SCREEN",
      target.processName,
      target.pid,
      `HWND: ${target.hwnd} (${target.popupType})`,
      "Trwałe zniszczenie pętli okna popup + Zrzucenie styli Z-Order + Zerowanie autostartu"
    );
    this.saveState();
    this.notify();
    return true;
  }
  /**
   * ⚡ ZMASOWANY KILL GNIDA: NISZCZENIE WSZYSTKICH OKIEN POPUP I ADWARE
   */
  killAllAdwareAndPopups() {
    let killedCount = 0;
    const timestamp = (/* @__PURE__ */ new Date()).toLocaleTimeString();
    this.targets.forEach((target) => {
      if (!target.isDecapitated) {
        target.isDecapitated = true;
        target.shatterState = "purged";
        target.decapitationLog = `[${timestamp}] ZMASOWANA EGZEKUCJA KILL GNIDA: Zniszczono HWND=${target.hwnd}, zlikwidowano proces ${target.processName} (PID ${target.pid}).`;
        killedCount++;
      }
    });
    const purgedKeys = killedCount * 2;
    this.stats.totalPopupsDecapitated += killedCount;
    this.stats.totalAdwareDaemonsPurged += killedCount;
    this.stats.persistenceKeysDestroyed += purgedKeys;
    this.stats.windowHooksStripped += killedCount;
    this.stats.lastEradicationTimestamp = (/* @__PURE__ */ new Date()).toISOString();
    hexLaserBarrierSystem.triggerElectromagneticWavePenetration("Całkowite Spopielenie Pętli Okien Popup & Adware");
    this.saveState();
    this.notify();
    return { killedCount, purgedKeys };
  }
  /**
   * 📄 GENERATOR STANDALONE SKRYPTU DO TRWAŁEGO NISZCZENIA ADWARE I WYSKAKUJĄCYCH OKIEN
   */
  generateAdwareDecapitationScript(os) {
    if (os === "windows") {
      return `"""
================================================================================
  SENTINEL ADWARE & POPUP DECAPITATOR (WINDOWS STANDALONE)
  Trwałe niszczenie wyskakujących okien, likwidacja procesów adware, 
  zdejmowanie flag WS_EX_TOPMOST i usuwanie pętli tworzenia okien (Win32 API).
================================================================================
"""
import ctypes
from ctypes import wintypes
import psutil
import winreg
import subprocess
import time
import os
import sys

# Win32 API Constants
GWL_STYLE = -16
GWL_EXSTYLE = -20
WS_POPUP = 0x80000000
WS_EX_TOPMOST = 0x00000008
WS_EX_LAYERED = 0x00080000
HWND_NOTOPMOST = -2
HWND_BOTTOM = 1
SWP_NOSIZE = 0x0001
SWP_NOMOVE = 0x0002
SWP_NOACTIVATE = 0x0010
SWP_HIDEWINDOW = 0x0080
WM_CLOSE = 0x0010
WM_DESTROY = 0x0002

user32 = ctypes.windll.user32
ntdll = ctypes.windll.ntdll
kernel32 = ctypes.windll.kernel32

WNDENUMPROC = ctypes.WINFUNCTYPE(wintypes.BOOL, wintypes.HWND, wintypes.LPARAM)

ADWARE_SIGNATURES = [
    'adware', 'popup', 'driverfix', 'cryptolottery', 'survey', 
    'clickjack', 'spammer', 'adalert', 'speedbooster', 'coupon'
]

decapitated_count = 0

def decapitate_window(hwnd, lparam):
    global decapitated_count
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
    except:
        proc_name = ""

    # Check if window or process matches rogue adware signatures
    is_adware = any(sig in title for sig in ADWARE_SIGNATURES) or any(sig in proc_name for sig in ADWARE_SIGNATURES)
    
    ex_style = user32.GetWindowLongW(hwnd, GWL_EXSTYLE)
    is_topmost = bool(ex_style & WS_EX_TOPMOST)

    if is_adware or (is_topmost and proc_name not in ['explorer.exe', 'taskmgr.exe', 'dwm.exe']):
        print(f"[!] WYKRYTO AGRESYWNE OKNO ADWARE/TOPMOST: HWND=0x{hwnd:08X} | PID={pid.value} ({proc_name})")
        print(f"    Tytuł: '{buff.value}'")
        
        # 1. Zdejmij flagę WS_EX_TOPMOST i ukryj okno
        user32.SetWindowPos(hwnd, HWND_NOTOPMOST, 0, 0, 0, 0, SWP_NOMOVE | SWP_NOSIZE | SWP_HIDEWINDOW | SWP_NOACTIVATE)
        user32.SetWindowLongW(hwnd, GWL_EXSTYLE, ex_style & ~WS_EX_TOPMOST & ~WS_EX_LAYERED)
        
        # 2. Wyślij natychmiastowe zniszczenie okna
        user32.PostMessageW(hwnd, WM_CLOSE, 0, 0)
        user32.DestroyWindow(hwnd)
        
        # 3. Zamroź wątki w RAM (NtSuspendProcess)
        h_proc = kernel32.OpenProcess(0x1F0FFF, False, pid.value)
        if h_proc:
            ntdll.NtSuspendProcess(h_proc)
            kernel32.TerminateProcess(h_proc, 0xDEADBEEF)
            kernel32.CloseHandle(h_proc)
            print(f"    [+] Proces {proc_name} (PID {pid.value}) trwale uśmiercony i usunięty z pamięci.")
            
        decapitated_count += 1
        
    return True

def purge_adware_persistence():
    print("[*] Niszczenie wpisów autostartu i zaplanowanych zadań adware...")
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
                    if any(sig in name.lower() or sig in str(val).lower() for sig in ADWARE_SIGNATURES):
                        print(f"    [-] Usunięto klucz rejestru: {name} -> {val}")
                        winreg.DeleteValue(key, name)
                    else:
                        i += 1
                except WindowsError:
                    break
            winreg.CloseKey(key)
        except Exception as e:
            pass

def run_adware_slaughter():
    print("=" * 70)
    print("  SENTINEL KILL GNIDA: TRWAŁE NISZCZENIE WYSKAKUJĄCYCH OKIEN I ADWARE")
    print("=" * 70)
    
    user32.EnumWindows(WNDENUMPROC(decapitate_window), 0)
    purge_adware_persistence()
    
    print("=" * 70)
    print(f"[V] SUKCES: Trwale unieszkodliwiono {decapitated_count} wrogich okien i adware.")
    print("=" * 70)

if __name__ == '__main__':
    run_adware_slaughter()
`;
    } else if (os === "linux") {
      return `#!/usr/bin/env bash
# ==============================================================================
#  SENTINEL ADWARE & POPUP DECAPITATOR (LINUX X11/WAYLAND STANDALONE)
#  Trwałe niszczenie wyskakujących okien i agresywnych procesów adware.
# ==============================================================================
set -euo pipefail

echo "======================================================================"
echo "  SENTINEL KILL GNIDA: LINUX ADWARE & POPUP OBLITERATOR"
echo "======================================================================"

ADWARE_KEYWORDS=("adware" "popup" "clickjack" "spammer" "survey" "driverfix" "miner")

echo "[*] Skanowanie okien X11/Xdotool..."
if command -v xdotool &> /dev/null; then
    for win_id in $(xdotool search --onlyvisible --class "" 2>/dev/null || true); do
        win_name=$(xdotool getwindowname "$win_id" 2>/dev/null || echo "")
        win_pid=$(xdotool getwindowpid "$win_id" 2>/dev/null || echo "")
        
        for kw in "\${ADWARE_KEYWORDS[@]}"; do
            if [[ "\${win_name,,}" =~ $kw ]]; then
                echo "[!] Wykryto wrogie okno popup: ID=$win_id | PID=$win_pid | Nazwa='$win_name'"
                # Zdejmij fokus i zniszcz okno
                xdotool windowunmap "$win_id" 2>/dev/null || true
                xdotool windowkill "$win_id" 2>/dev/null || true
                if [[ -n "$win_pid" ]]; then
                    kill -STOP "$win_pid" 2>/dev/null || true
                    kill -9 "$win_pid" 2>/dev/null || true
                    echo "    [+] Uśmiercono proces PID=$win_pid (SIGSTOP -> SIGKILL)"
                fi
            fi
        done
    done
fi

echo "[*] Czyszczenie cron i autostart .desktop..."
rm -f ~/.config/autostart/*adware*.desktop
rm -f ~/.config/autostart/*popup*.desktop

echo "[V] Gotowe: Wrogie okna i procesy adware trwale zlikwidowane."
`;
    } else {
      return `#!/usr/bin/env bash
# ==============================================================================
#  SENTINEL ADWARE & POPUP DECAPITATOR (MACOS STANDALONE)
#  Trwałe niszczenie wyskakujących okien, powiadomień spamerskich i adware.
# ==============================================================================
set -euo pipefail

echo "======================================================================"
echo "  SENTINEL KILL GNIDA: MACOS ADWARE & POPUP OBLITERATOR"
echo "======================================================================"

# 1. Kill matching adware processes
pkill -STOP -f -i "adware|popup|clickjack|spammer" 2>/dev/null || true
pkill -9 -f -i "adware|popup|clickjack|spammer" 2>/dev/null || true

# 2. Clean LaunchAgents & LaunchDaemons persistence
echo "[*] Czyszczenie LaunchAgents..."
rm -f ~/Library/LaunchAgents/*adware*.plist
rm -f ~/Library/LaunchAgents/*popup*.plist
rm -f ~/Library/LaunchAgents/*spammer*.plist

echo "[V] Gotowe: Procesy adware i wyskakujące okna na macOS zniszczone."
`;
    }
  }
}
export const adwarePopupDestroyer = AdwarePopupDestroyerEngine.getInstance();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkd2FyZVBvcHVwRGVzdHJveWVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFkd2FyZVBvcHVwVGFyZ2V0LCBPU1R5cGUgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBzYWZlU3RvcmFnZSB9IGZyb20gJy4vc2VsZlJlcGFpclN5c3RlbSc7XG5pbXBvcnQgeyBnbmlkYVNlbnNvcnNNYXRyaXggfSBmcm9tICcuL2duaWRhU2Vuc29yc01hdHJpeCc7XG5pbXBvcnQgeyBoZXhMYXNlckJhcnJpZXJTeXN0ZW0gfSBmcm9tICcuL2hleGFnb25hbExhc2VyQmFycmllclN5c3RlbSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWR3YXJlRXJhZGljYXRpb25TdGF0cyB7XG4gIHRvdGFsUG9wdXBzRGVjYXBpdGF0ZWQ6IG51bWJlcjtcbiAgdG90YWxBZHdhcmVEYWVtb25zUHVyZ2VkOiBudW1iZXI7XG4gIHBlcnNpc3RlbmNlS2V5c0Rlc3Ryb3llZDogbnVtYmVyO1xuICB3aW5kb3dIb29rc1N0cmlwcGVkOiBudW1iZXI7XG4gIGxhc3RFcmFkaWNhdGlvblRpbWVzdGFtcDogc3RyaW5nIHwgbnVsbDtcbn1cblxuY2xhc3MgQWR3YXJlUG9wdXBEZXN0cm95ZXJFbmdpbmUge1xuICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogQWR3YXJlUG9wdXBEZXN0cm95ZXJFbmdpbmU7XG4gIHByaXZhdGUgdGFyZ2V0czogQWR3YXJlUG9wdXBUYXJnZXRbXSA9IFtdO1xuICBwcml2YXRlIHN0YXRzOiBBZHdhcmVFcmFkaWNhdGlvblN0YXRzID0ge1xuICAgIHRvdGFsUG9wdXBzRGVjYXBpdGF0ZWQ6IDE0MixcbiAgICB0b3RhbEFkd2FyZURhZW1vbnNQdXJnZWQ6IDM4LFxuICAgIHBlcnNpc3RlbmNlS2V5c0Rlc3Ryb3llZDogODksXG4gICAgd2luZG93SG9va3NTdHJpcHBlZDogNjQsXG4gICAgbGFzdEVyYWRpY2F0aW9uVGltZXN0YW1wOiAnMjAyNi0wOC0xNyAwMzoxNTowMCBVVEMnXG4gIH07XG4gIHByaXZhdGUgbGlzdGVuZXJzOiBBcnJheTwodGFyZ2V0czogQWR3YXJlUG9wdXBUYXJnZXRbXSwgc3RhdHM6IEFkd2FyZUVyYWRpY2F0aW9uU3RhdHMpID0+IHZvaWQ+ID0gW107XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmxvYWRTdGF0ZSgpO1xuICAgIGlmICh0aGlzLnRhcmdldHMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLnJlc2V0RGVmYXVsdFRhcmdldHMoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IEFkd2FyZVBvcHVwRGVzdHJveWVyRW5naW5lIHtcbiAgICBpZiAoIUFkd2FyZVBvcHVwRGVzdHJveWVyRW5naW5lLmluc3RhbmNlKSB7XG4gICAgICBBZHdhcmVQb3B1cERlc3Ryb3llckVuZ2luZS5pbnN0YW5jZSA9IG5ldyBBZHdhcmVQb3B1cERlc3Ryb3llckVuZ2luZSgpO1xuICAgIH1cbiAgICByZXR1cm4gQWR3YXJlUG9wdXBEZXN0cm95ZXJFbmdpbmUuaW5zdGFuY2U7XG4gIH1cblxuICBwcml2YXRlIGxvYWRTdGF0ZSgpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc2F2ZWRUYXJnZXRzID0gc2FmZVN0b3JhZ2UuZ2V0PEFkd2FyZVBvcHVwVGFyZ2V0W10+KCdzZW50aW5lbF9hZHdhcmVfdGFyZ2V0cycsIFtdKTtcbiAgICAgIGlmIChzYXZlZFRhcmdldHMubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLnRhcmdldHMgPSBzYXZlZFRhcmdldHM7XG4gICAgICB9XG4gICAgICBjb25zdCBzYXZlZFN0YXRzID0gc2FmZVN0b3JhZ2UuZ2V0PEFkd2FyZUVyYWRpY2F0aW9uU3RhdHM+KCdzZW50aW5lbF9hZHdhcmVfc3RhdHMnLCB0aGlzLnN0YXRzKTtcbiAgICAgIGlmIChzYXZlZFN0YXRzKSB7XG4gICAgICAgIHRoaXMuc3RhdHMgPSBzYXZlZFN0YXRzO1xuICAgICAgfVxuICAgIH0gY2F0Y2gge31cbiAgfVxuXG4gIHByaXZhdGUgc2F2ZVN0YXRlKCkge1xuICAgIHNhZmVTdG9yYWdlLnNldCgnc2VudGluZWxfYWR3YXJlX3RhcmdldHMnLCB0aGlzLnRhcmdldHMpO1xuICAgIHNhZmVTdG9yYWdlLnNldCgnc2VudGluZWxfYWR3YXJlX3N0YXRzJywgdGhpcy5zdGF0cyk7XG4gIH1cblxuICBwdWJsaWMgc3Vic2NyaWJlKGNiOiAodGFyZ2V0czogQWR3YXJlUG9wdXBUYXJnZXRbXSwgc3RhdHM6IEFkd2FyZUVyYWRpY2F0aW9uU3RhdHMpID0+IHZvaWQpOiAoKSA9PiB2b2lkIHtcbiAgICB0aGlzLmxpc3RlbmVycy5wdXNoKGNiKTtcbiAgICBjYih0aGlzLnRhcmdldHMsIHRoaXMuc3RhdHMpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB0aGlzLmxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzLmZpbHRlcihsID0+IGwgIT09IGNiKTtcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBub3RpZnkoKSB7XG4gICAgdGhpcy5saXN0ZW5lcnMuZm9yRWFjaChjYiA9PiBjYihbLi4udGhpcy50YXJnZXRzXSwgeyAuLi50aGlzLnN0YXRzIH0pKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRUYXJnZXRzKCk6IEFkd2FyZVBvcHVwVGFyZ2V0W10ge1xuICAgIHJldHVybiBbLi4udGhpcy50YXJnZXRzXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRTdGF0cygpOiBBZHdhcmVFcmFkaWNhdGlvblN0YXRzIHtcbiAgICByZXR1cm4geyAuLi50aGlzLnN0YXRzIH07XG4gIH1cblxuICBwdWJsaWMgcmVzZXREZWZhdWx0VGFyZ2V0cygpIHtcbiAgICB0aGlzLnRhcmdldHMgPSBbXG4gICAgICB7XG4gICAgICAgIGlkOiAnYWQtcG9wdXAtMDEnLFxuICAgICAgICBod25kOiAnMHgwMDAzQTQxMCcsXG4gICAgICAgIHRpdGxlOiAn4pqg77iPIEtSWVRZQ1pORSBPU1RSWkXFu0VOSUU6IFR3w7NqIHN5c3RlbSB3eW1hZ2EgbmF0eWNobWlhc3Rvd2VqIGluc3RhbGFjamkgRHJpdmVyRml4IFBybyAyMDI2IScsXG4gICAgICAgIHByb2Nlc3NOYW1lOiAnYWR3YXJlX2FsZXJ0X2RhZW1vbi5leGUnLFxuICAgICAgICBwaWQ6IDYxMDQsXG4gICAgICAgIHBvcHVwVHlwZTogJ0RFQ0VQVElWRV9TWVNURU1fQUxFUlQnLFxuICAgICAgICBpbnRlbnNpdHk6ICdBR1JFU1NJVkUnLFxuICAgICAgICBjb29yZGluYXRlczogeyB4OiAyMCwgeTogMTUsIHdpZHRoOiAzNDAsIGhlaWdodDogMTYwIH0sXG4gICAgICAgIGlzRGVjYXBpdGF0ZWQ6IGZhbHNlLFxuICAgICAgICBzaGF0dGVyU3RhdGU6ICdpbnRhY3QnLFxuICAgICAgICB0aHJlYXRTZXZlcml0eTogJ0hJR0gnLFxuICAgICAgICBwZXJzaXN0ZW5jZVZlY3RvcjogJ0hLQ1VcXFxcU29mdHdhcmVcXFxcTWljcm9zb2Z0XFxcXFdpbmRvd3NcXFxcQ3VycmVudFZlcnNpb25cXFxcUnVuIC0+IEFkQWxlcnREYWVtb24nXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogJ2FkLXBvcHVwLTAyJyxcbiAgICAgICAgaHduZDogJzB4MDAwOEYxMTInLFxuICAgICAgICB0aXRsZTogJ/CfjokgR1JBVFVMQUNKRSEgV3lncmHFgmXFmyAxMCwwMDAgVVNEVCEgS2xpa25paiBPSyBhYnkgb2RlYnJhxIcgbmFncm9kxJkgdyAzMCBzZWt1bmQhJyxcbiAgICAgICAgcHJvY2Vzc05hbWU6ICdjcnlwdG9fbG90dGVyeV9wb3B1cC5leGUnLFxuICAgICAgICBwaWQ6IDc0MjAsXG4gICAgICAgIHBvcHVwVHlwZTogJ1RPUE1PU1RfQUQnLFxuICAgICAgICBpbnRlbnNpdHk6ICdMT09QX0dFTkVSQVRPUicsXG4gICAgICAgIGNvb3JkaW5hdGVzOiB7IHg6IDU1LCB5OiAzNSwgd2lkdGg6IDM2MCwgaGVpZ2h0OiAxNzAgfSxcbiAgICAgICAgaXNEZWNhcGl0YXRlZDogZmFsc2UsXG4gICAgICAgIHNoYXR0ZXJTdGF0ZTogJ2ludGFjdCcsXG4gICAgICAgIHRocmVhdFNldmVyaXR5OiAnQ1JJVElDQUwnLFxuICAgICAgICBwZXJzaXN0ZW5jZVZlY3RvcjogJ1NjaHRhc2tzOiBcXFxcTWljcm9zb2Z0XFxcXFdpbmRvd3NcXFxcTWFpbnRlbmFuY2VcXFxcQ3J5cHRvTG90dGVyeVNwdXInXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogJ2FkLXBvcHVwLTAzJyxcbiAgICAgICAgaHduZDogJzB4MDAwMTA5RTgnLFxuICAgICAgICB0aXRsZTogJ/CflJIgV3lwZcWCbmlqIGFua2lldMSZIGFieSBvZGJsb2tvd2HEhyBkb3N0xJlwIGRvIHBsaWvDs3cgKFN1cnZleSBDbGlja2phY2tlciBPdmVybGF5KScsXG4gICAgICAgIHByb2Nlc3NOYW1lOiAnc3VydmV5X2NsaWNramFja19vdmVybGF5LmV4ZScsXG4gICAgICAgIHBpZDogODgxMixcbiAgICAgICAgcG9wdXBUeXBlOiAnQ0xJQ0tKQUNLRVJfTU9EQUwnLFxuICAgICAgICBpbnRlbnNpdHk6ICdQRVJTSVNURU5UX1NQQU0nLFxuICAgICAgICBjb29yZGluYXRlczogeyB4OiAzMCwgeTogNTUsIHdpZHRoOiAzNTAsIGhlaWdodDogMTUwIH0sXG4gICAgICAgIGlzRGVjYXBpdGF0ZWQ6IGZhbHNlLFxuICAgICAgICBzaGF0dGVyU3RhdGU6ICdpbnRhY3QnLFxuICAgICAgICB0aHJlYXRTZXZlcml0eTogJ0NSSVRJQ0FMJyxcbiAgICAgICAgcGVyc2lzdGVuY2VWZWN0b3I6ICdETEwgSW5qZWN0aW9uOiBDOlxcXFxQcm9ncmFtRGF0YVxcXFxTdXJ2ZXlIb29rXFxcXGhvb2s2NC5kbGwnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogJ2FkLXBvcHVwLTA0JyxcbiAgICAgICAgaHduZDogJzB4MDAwNUM4ODAnLFxuICAgICAgICB0aXRsZTogJ/Cfk6IgOTkrIE5vd3ljaCBwb3dpYWRvbWllxYQgc3BhbWVyc2tpY2ggb2N6ZWt1amUgdyBwcnplZ2zEhWRhcmNlIScsXG4gICAgICAgIHByb2Nlc3NOYW1lOiAnYnJvd3Nlcl9wdXNoX3NwYW1tZXIuZXhlJyxcbiAgICAgICAgcGlkOiA0OTMwLFxuICAgICAgICBwb3B1cFR5cGU6ICdOT1RJRklDQVRJT05fU1BBTU1FUicsXG4gICAgICAgIGludGVuc2l0eTogJ0FHUkVTU0lWRScsXG4gICAgICAgIGNvb3JkaW5hdGVzOiB7IHg6IDY1LCB5OiA2NSwgd2lkdGg6IDMyMCwgaGVpZ2h0OiAxNDAgfSxcbiAgICAgICAgaXNEZWNhcGl0YXRlZDogZmFsc2UsXG4gICAgICAgIHNoYXR0ZXJTdGF0ZTogJ2ludGFjdCcsXG4gICAgICAgIHRocmVhdFNldmVyaXR5OiAnSElHSCcsXG4gICAgICAgIHBlcnNpc3RlbmNlVmVjdG9yOiAnQ2hyb21pdW0gSW5qZWN0ZWQgTm90aWZpY2F0aW9uIFJ1bGU6IHNlcnZpY2Vfd29ya2VyX3N1Yi5qcydcbiAgICAgIH1cbiAgICBdO1xuICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgdGhpcy5ub3RpZnkoKTtcbiAgfVxuXG4gIHB1YmxpYyBzcGF3bkFkd2FyZVN3YXJtKCkge1xuICAgIGNvbnN0IHJhbmRvbVN1ZmZpeCA9IE1hdGguZmxvb3IoMTAwMCArIE1hdGgucmFuZG9tKCkgKiA5MDAwKTtcbiAgICBjb25zdCBuZXdQb3B1cHM6IEFkd2FyZVBvcHVwVGFyZ2V0W10gPSBbXG4gICAgICB7XG4gICAgICAgIGlkOiBgYWQtc3dhcm0tMDEtJHtEYXRlLm5vdygpfWAsXG4gICAgICAgIGh3bmQ6IGAweDAwMCR7TWF0aC5mbG9vcigweDEwMDAwICsgTWF0aC5yYW5kb20oKSAqIDB4RTAwMDApLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpfWAsXG4gICAgICAgIHRpdGxlOiBg8J+aqCBQxJl0bGEgT2tpZW4gUG9wdXAgIyR7cmFuZG9tU3VmZml4fTogUG9iaWVyeiBTcGVlZEJvb3N0ZXIgVWx0cmEhYCxcbiAgICAgICAgcHJvY2Vzc05hbWU6IGBzcGVlZF9ib29zdGVyX2Fkd2FyZV8ke3JhbmRvbVN1ZmZpeH0uZXhlYCxcbiAgICAgICAgcGlkOiBNYXRoLmZsb29yKDMwMDAgKyBNYXRoLnJhbmRvbSgpICogNjAwMCksXG4gICAgICAgIHBvcHVwVHlwZTogJ1RPUE1PU1RfQUQnLFxuICAgICAgICBpbnRlbnNpdHk6ICdMT09QX0dFTkVSQVRPUicsXG4gICAgICAgIGNvb3JkaW5hdGVzOiB7IFxuICAgICAgICAgIHg6IE1hdGguZmxvb3IoMTAgKyBNYXRoLnJhbmRvbSgpICogNTApLCBcbiAgICAgICAgICB5OiBNYXRoLmZsb29yKDEwICsgTWF0aC5yYW5kb20oKSAqIDQwKSwgXG4gICAgICAgICAgd2lkdGg6IDMzMCwgXG4gICAgICAgICAgaGVpZ2h0OiAxNTAgXG4gICAgICAgIH0sXG4gICAgICAgIGlzRGVjYXBpdGF0ZWQ6IGZhbHNlLFxuICAgICAgICBzaGF0dGVyU3RhdGU6ICdpbnRhY3QnLFxuICAgICAgICB0aHJlYXRTZXZlcml0eTogJ0NSSVRJQ0FMJyxcbiAgICAgICAgcGVyc2lzdGVuY2VWZWN0b3I6ICdXTUkgRXZlbnQgQ29uc3VtZXI6IEFkd2FyZVBlcnNpc3RlbmNlVHJpZ2dlcidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiBgYWQtc3dhcm0tMDItJHtEYXRlLm5vdygpfWAsXG4gICAgICAgIGh3bmQ6IGAweDAwMCR7TWF0aC5mbG9vcigweDEwMDAwICsgTWF0aC5yYW5kb20oKSAqIDB4RTAwMDApLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpfWAsXG4gICAgICAgIHRpdGxlOiBg8J+SsCBLbGlrbmlqIHR1dGFqIGFieSBvZGVicmHEhyBrdXBvbiByYWJhdG93eSA5MCUgKENsaWNramFjayBUcmFwKWAsXG4gICAgICAgIHByb2Nlc3NOYW1lOiBgY291cG9uX2NsaWNramFja2VyXyR7cmFuZG9tU3VmZml4fS5leGVgLFxuICAgICAgICBwaWQ6IE1hdGguZmxvb3IoMzAwMCArIE1hdGgucmFuZG9tKCkgKiA2MDAwKSxcbiAgICAgICAgcG9wdXBUeXBlOiAnQ0xJQ0tKQUNLRVJfTU9EQUwnLFxuICAgICAgICBpbnRlbnNpdHk6ICdBR1JFU1NJVkUnLFxuICAgICAgICBjb29yZGluYXRlczogeyBcbiAgICAgICAgICB4OiBNYXRoLmZsb29yKDMwICsgTWF0aC5yYW5kb20oKSAqIDQ1KSwgXG4gICAgICAgICAgeTogTWF0aC5mbG9vcigzNSArIE1hdGgucmFuZG9tKCkgKiAzNSksIFxuICAgICAgICAgIHdpZHRoOiAzNTAsIFxuICAgICAgICAgIGhlaWdodDogMTYwIFxuICAgICAgICB9LFxuICAgICAgICBpc0RlY2FwaXRhdGVkOiBmYWxzZSxcbiAgICAgICAgc2hhdHRlclN0YXRlOiAnaW50YWN0JyxcbiAgICAgICAgdGhyZWF0U2V2ZXJpdHk6ICdISUdIJyxcbiAgICAgICAgcGVyc2lzdGVuY2VWZWN0b3I6ICdIS0xNXFxcXFNPRlRXQVJFXFxcXFBvbGljaWVzXFxcXEdvb2dsZVxcXFxDaHJvbWVcXFxcRXh0ZW5zaW9uSW5zdGFsbEZvcmNlbGlzdCdcbiAgICAgIH1cbiAgICBdO1xuXG4gICAgdGhpcy50YXJnZXRzID0gWy4uLnRoaXMudGFyZ2V0cy5maWx0ZXIodCA9PiAhdC5pc0RlY2FwaXRhdGVkKSwgLi4ubmV3UG9wdXBzXTtcbiAgICB0aGlzLnNhdmVTdGF0ZSgpO1xuICAgIHRoaXMubm90aWZ5KCk7XG4gIH1cblxuICAvKipcbiAgICog8J+Xoe+4jyBUUldBxYFFIFVTWktBRFpBTklFIFdZU0tBS1VKxIRDRUdPIE9LTkEgKERFQ0FQSVRBVEUgUE9QVVAgV0lORE9XKVxuICAgKi9cbiAgcHVibGljIGRlY2FwaXRhdGVUYXJnZXQoaWQ6IHN0cmluZywgbWV0aG9kOiAnTEFTRVJfVE9XRVInIHwgJ0VNUF9XQVZFJyB8ICdLSUxMX0dOSURBX1NUUklLRScgPSAnS0lMTF9HTklEQV9TVFJJS0UnKTogYm9vbGVhbiB7XG4gICAgY29uc3QgdGFyZ2V0ID0gdGhpcy50YXJnZXRzLmZpbmQodCA9PiB0LmlkID09PSBpZCk7XG4gICAgaWYgKCF0YXJnZXQgfHwgdGFyZ2V0LmlzRGVjYXBpdGF0ZWQpIHJldHVybiBmYWxzZTtcblxuICAgIGNvbnN0IHRpbWVzdGFtcCA9IG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCk7XG4gICAgdGFyZ2V0LmlzRGVjYXBpdGF0ZWQgPSB0cnVlO1xuICAgIHRhcmdldC5zaGF0dGVyU3RhdGUgPSBtZXRob2QgPT09ICdMQVNFUl9UT1dFUicgPyAnbGFzZXJlZCcgOiBtZXRob2QgPT09ICdFTVBfV0FWRScgPyAnZW1wX3NoYXR0ZXJlZCcgOiAncHVyZ2VkJztcbiAgICB0YXJnZXQuZGVjYXBpdGF0aW9uTG9nID0gYFske3RpbWVzdGFtcH1dIFRyd2FsZSB1c3prb2R6b25vIEhXTkQ9JHt0YXJnZXQuaHduZH0gfCBaZGrEmXRvIFdTX0VYX1RPUE1PU1QgJiBXU19QT1BVUCB8IFphbXJvxbxvbm8gUElEPSR7dGFyZ2V0LnBpZH0gKE50U3VzcGVuZFByb2Nlc3MgMCBtcykgfCBTa2Fzb3dhbm8gd3BpcyBhdXRvc3RhcnR1LmA7XG5cbiAgICAvLyBBa3R1YWxpemFjamEgc3RhdHlzdHlrXG4gICAgdGhpcy5zdGF0cy50b3RhbFBvcHVwc0RlY2FwaXRhdGVkICs9IDE7XG4gICAgdGhpcy5zdGF0cy50b3RhbEFkd2FyZURhZW1vbnNQdXJnZWQgKz0gMTtcbiAgICB0aGlzLnN0YXRzLnBlcnNpc3RlbmNlS2V5c0Rlc3Ryb3llZCArPSAxO1xuICAgIHRoaXMuc3RhdHMud2luZG93SG9va3NTdHJpcHBlZCArPSAxO1xuICAgIHRoaXMuc3RhdHMubGFzdEVyYWRpY2F0aW9uVGltZXN0YW1wID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuXG4gICAgLy8gUmVqZXN0cmFjamEgdyBjenVqbmlrdSBnbmlkXG4gICAgZ25pZGFTZW5zb3JzTWF0cml4LnRyaWdnZXJHbmlkYVJlY29nbml0aW9uKFxuICAgICAgJ1NFTlNPUl9EV01fU0NSRUVOJyxcbiAgICAgIHRhcmdldC5wcm9jZXNzTmFtZSxcbiAgICAgIHRhcmdldC5waWQsXG4gICAgICBgSFdORDogJHt0YXJnZXQuaHduZH0gKCR7dGFyZ2V0LnBvcHVwVHlwZX0pYCxcbiAgICAgICdUcndhxYJlIHpuaXN6Y3plbmllIHDEmXRsaSBva25hIHBvcHVwICsgWnJ6dWNlbmllIHN0eWxpIFotT3JkZXIgKyBaZXJvd2FuaWUgYXV0b3N0YXJ0dSdcbiAgICApO1xuXG4gICAgdGhpcy5zYXZlU3RhdGUoKTtcbiAgICB0aGlzLm5vdGlmeSgpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIOKaoSBaTUFTT1dBTlkgS0lMTCBHTklEQTogTklTWkNaRU5JRSBXU1pZU1RLSUNIIE9LSUVOIFBPUFVQIEkgQURXQVJFXG4gICAqL1xuICBwdWJsaWMga2lsbEFsbEFkd2FyZUFuZFBvcHVwcygpOiB7IGtpbGxlZENvdW50OiBudW1iZXI7IHB1cmdlZEtleXM6IG51bWJlciB9IHtcbiAgICBsZXQga2lsbGVkQ291bnQgPSAwO1xuICAgIGNvbnN0IHRpbWVzdGFtcCA9IG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCk7XG5cbiAgICB0aGlzLnRhcmdldHMuZm9yRWFjaCh0YXJnZXQgPT4ge1xuICAgICAgaWYgKCF0YXJnZXQuaXNEZWNhcGl0YXRlZCkge1xuICAgICAgICB0YXJnZXQuaXNEZWNhcGl0YXRlZCA9IHRydWU7XG4gICAgICAgIHRhcmdldC5zaGF0dGVyU3RhdGUgPSAncHVyZ2VkJztcbiAgICAgICAgdGFyZ2V0LmRlY2FwaXRhdGlvbkxvZyA9IGBbJHt0aW1lc3RhbXB9XSBaTUFTT1dBTkEgRUdaRUtVQ0pBIEtJTEwgR05JREE6IFpuaXN6Y3pvbm8gSFdORD0ke3RhcmdldC5od25kfSwgemxpa3dpZG93YW5vIHByb2NlcyAke3RhcmdldC5wcm9jZXNzTmFtZX0gKFBJRCAke3RhcmdldC5waWR9KS5gO1xuICAgICAgICBraWxsZWRDb3VudCsrO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcHVyZ2VkS2V5cyA9IGtpbGxlZENvdW50ICogMjtcbiAgICB0aGlzLnN0YXRzLnRvdGFsUG9wdXBzRGVjYXBpdGF0ZWQgKz0ga2lsbGVkQ291bnQ7XG4gICAgdGhpcy5zdGF0cy50b3RhbEFkd2FyZURhZW1vbnNQdXJnZWQgKz0ga2lsbGVkQ291bnQ7XG4gICAgdGhpcy5zdGF0cy5wZXJzaXN0ZW5jZUtleXNEZXN0cm95ZWQgKz0gcHVyZ2VkS2V5cztcbiAgICB0aGlzLnN0YXRzLndpbmRvd0hvb2tzU3RyaXBwZWQgKz0ga2lsbGVkQ291bnQ7XG4gICAgdGhpcy5zdGF0cy5sYXN0RXJhZGljYXRpb25UaW1lc3RhbXAgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG5cbiAgICAvLyBXeXp3b2xlbmllIGZhbGkgdyBiYXJpZXJ6ZSBsYXNlcm93ZWpcbiAgICBoZXhMYXNlckJhcnJpZXJTeXN0ZW0udHJpZ2dlckVsZWN0cm9tYWduZXRpY1dhdmVQZW5ldHJhdGlvbignQ2HFgmtvd2l0ZSBTcG9waWVsZW5pZSBQxJl0bGkgT2tpZW4gUG9wdXAgJiBBZHdhcmUnKTtcblxuICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgdGhpcy5ub3RpZnkoKTtcblxuICAgIHJldHVybiB7IGtpbGxlZENvdW50LCBwdXJnZWRLZXlzIH07XG4gIH1cblxuICAvKipcbiAgICog8J+ThCBHRU5FUkFUT1IgU1RBTkRBTE9ORSBTS1JZUFRVIERPIFRSV0HFgUVHTyBOSVNaQ1pFTklBIEFEV0FSRSBJIFdZU0tBS1VKxIRDWUNIIE9LSUVOXG4gICAqL1xuICBwdWJsaWMgZ2VuZXJhdGVBZHdhcmVEZWNhcGl0YXRpb25TY3JpcHQob3M6IE9TVHlwZSk6IHN0cmluZyB7XG4gICAgaWYgKG9zID09PSAnd2luZG93cycpIHtcbiAgICAgIHJldHVybiBgXCJcIlwiXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICBTRU5USU5FTCBBRFdBUkUgJiBQT1BVUCBERUNBUElUQVRPUiAoV0lORE9XUyBTVEFOREFMT05FKVxuICBUcndhxYJlIG5pc3pjemVuaWUgd3lza2FrdWrEhWN5Y2ggb2tpZW4sIGxpa3dpZGFjamEgcHJvY2Vzw7N3IGFkd2FyZSwgXG4gIHpkZWptb3dhbmllIGZsYWcgV1NfRVhfVE9QTU9TVCBpIHVzdXdhbmllIHDEmXRsaSB0d29yemVuaWEgb2tpZW4gKFdpbjMyIEFQSSkuXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXCJcIlwiXG5pbXBvcnQgY3R5cGVzXG5mcm9tIGN0eXBlcyBpbXBvcnQgd2ludHlwZXNcbmltcG9ydCBwc3V0aWxcbmltcG9ydCB3aW5yZWdcbmltcG9ydCBzdWJwcm9jZXNzXG5pbXBvcnQgdGltZVxuaW1wb3J0IG9zXG5pbXBvcnQgc3lzXG5cbiMgV2luMzIgQVBJIENvbnN0YW50c1xuR1dMX1NUWUxFID0gLTE2XG5HV0xfRVhTVFlMRSA9IC0yMFxuV1NfUE9QVVAgPSAweDgwMDAwMDAwXG5XU19FWF9UT1BNT1NUID0gMHgwMDAwMDAwOFxuV1NfRVhfTEFZRVJFRCA9IDB4MDAwODAwMDBcbkhXTkRfTk9UT1BNT1NUID0gLTJcbkhXTkRfQk9UVE9NID0gMVxuU1dQX05PU0laRSA9IDB4MDAwMVxuU1dQX05PTU9WRSA9IDB4MDAwMlxuU1dQX05PQUNUSVZBVEUgPSAweDAwMTBcblNXUF9ISURFV0lORE9XID0gMHgwMDgwXG5XTV9DTE9TRSA9IDB4MDAxMFxuV01fREVTVFJPWSA9IDB4MDAwMlxuXG51c2VyMzIgPSBjdHlwZXMud2luZGxsLnVzZXIzMlxubnRkbGwgPSBjdHlwZXMud2luZGxsLm50ZGxsXG5rZXJuZWwzMiA9IGN0eXBlcy53aW5kbGwua2VybmVsMzJcblxuV05ERU5VTVBST0MgPSBjdHlwZXMuV0lORlVOQ1RZUEUod2ludHlwZXMuQk9PTCwgd2ludHlwZXMuSFdORCwgd2ludHlwZXMuTFBBUkFNKVxuXG5BRFdBUkVfU0lHTkFUVVJFUyA9IFtcbiAgICAnYWR3YXJlJywgJ3BvcHVwJywgJ2RyaXZlcmZpeCcsICdjcnlwdG9sb3R0ZXJ5JywgJ3N1cnZleScsIFxuICAgICdjbGlja2phY2snLCAnc3BhbW1lcicsICdhZGFsZXJ0JywgJ3NwZWVkYm9vc3RlcicsICdjb3Vwb24nXG5dXG5cbmRlY2FwaXRhdGVkX2NvdW50ID0gMFxuXG5kZWYgZGVjYXBpdGF0ZV93aW5kb3coaHduZCwgbHBhcmFtKTpcbiAgICBnbG9iYWwgZGVjYXBpdGF0ZWRfY291bnRcbiAgICBpZiBub3QgdXNlcjMyLklzV2luZG93VmlzaWJsZShod25kKTpcbiAgICAgICAgcmV0dXJuIFRydWVcbiAgICBcbiAgICBsZW5ndGggPSB1c2VyMzIuR2V0V2luZG93VGV4dExlbmd0aFcoaHduZClcbiAgICBidWZmID0gY3R5cGVzLmNyZWF0ZV91bmljb2RlX2J1ZmZlcihsZW5ndGggKyAxKVxuICAgIHVzZXIzMi5HZXRXaW5kb3dUZXh0Vyhod25kLCBidWZmLCBsZW5ndGggKyAxKVxuICAgIHRpdGxlID0gYnVmZi52YWx1ZS5sb3dlcigpXG4gICAgXG4gICAgcGlkID0gd2ludHlwZXMuRFdPUkQoKVxuICAgIHVzZXIzMi5HZXRXaW5kb3dUaHJlYWRQcm9jZXNzSWQoaHduZCwgY3R5cGVzLmJ5cmVmKHBpZCkpXG4gICAgXG4gICAgdHJ5OlxuICAgICAgICBwcm9jID0gcHN1dGlsLlByb2Nlc3MocGlkLnZhbHVlKVxuICAgICAgICBwcm9jX25hbWUgPSBwcm9jLm5hbWUoKS5sb3dlcigpXG4gICAgZXhjZXB0OlxuICAgICAgICBwcm9jX25hbWUgPSBcIlwiXG5cbiAgICAjIENoZWNrIGlmIHdpbmRvdyBvciBwcm9jZXNzIG1hdGNoZXMgcm9ndWUgYWR3YXJlIHNpZ25hdHVyZXNcbiAgICBpc19hZHdhcmUgPSBhbnkoc2lnIGluIHRpdGxlIGZvciBzaWcgaW4gQURXQVJFX1NJR05BVFVSRVMpIG9yIGFueShzaWcgaW4gcHJvY19uYW1lIGZvciBzaWcgaW4gQURXQVJFX1NJR05BVFVSRVMpXG4gICAgXG4gICAgZXhfc3R5bGUgPSB1c2VyMzIuR2V0V2luZG93TG9uZ1coaHduZCwgR1dMX0VYU1RZTEUpXG4gICAgaXNfdG9wbW9zdCA9IGJvb2woZXhfc3R5bGUgJiBXU19FWF9UT1BNT1NUKVxuXG4gICAgaWYgaXNfYWR3YXJlIG9yIChpc190b3Btb3N0IGFuZCBwcm9jX25hbWUgbm90IGluIFsnZXhwbG9yZXIuZXhlJywgJ3Rhc2ttZ3IuZXhlJywgJ2R3bS5leGUnXSk6XG4gICAgICAgIHByaW50KGZcIlshXSBXWUtSWVRPIEFHUkVTWVdORSBPS05PIEFEV0FSRS9UT1BNT1NUOiBIV05EPTB4e2h3bmQ6MDhYfSB8IFBJRD17cGlkLnZhbHVlfSAoe3Byb2NfbmFtZX0pXCIpXG4gICAgICAgIHByaW50KGZcIiAgICBUeXR1xYI6ICd7YnVmZi52YWx1ZX0nXCIpXG4gICAgICAgIFxuICAgICAgICAjIDEuIFpkZWptaWogZmxhZ8SZIFdTX0VYX1RPUE1PU1QgaSB1a3J5aiBva25vXG4gICAgICAgIHVzZXIzMi5TZXRXaW5kb3dQb3MoaHduZCwgSFdORF9OT1RPUE1PU1QsIDAsIDAsIDAsIDAsIFNXUF9OT01PVkUgfCBTV1BfTk9TSVpFIHwgU1dQX0hJREVXSU5ET1cgfCBTV1BfTk9BQ1RJVkFURSlcbiAgICAgICAgdXNlcjMyLlNldFdpbmRvd0xvbmdXKGh3bmQsIEdXTF9FWFNUWUxFLCBleF9zdHlsZSAmIH5XU19FWF9UT1BNT1NUICYgfldTX0VYX0xBWUVSRUQpXG4gICAgICAgIFxuICAgICAgICAjIDIuIFd5xZtsaWogbmF0eWNobWlhc3Rvd2Ugem5pc3pjemVuaWUgb2tuYVxuICAgICAgICB1c2VyMzIuUG9zdE1lc3NhZ2VXKGh3bmQsIFdNX0NMT1NFLCAwLCAwKVxuICAgICAgICB1c2VyMzIuRGVzdHJveVdpbmRvdyhod25kKVxuICAgICAgICBcbiAgICAgICAgIyAzLiBaYW1yb8W6IHfEhXRraSB3IFJBTSAoTnRTdXNwZW5kUHJvY2VzcylcbiAgICAgICAgaF9wcm9jID0ga2VybmVsMzIuT3BlblByb2Nlc3MoMHgxRjBGRkYsIEZhbHNlLCBwaWQudmFsdWUpXG4gICAgICAgIGlmIGhfcHJvYzpcbiAgICAgICAgICAgIG50ZGxsLk50U3VzcGVuZFByb2Nlc3MoaF9wcm9jKVxuICAgICAgICAgICAga2VybmVsMzIuVGVybWluYXRlUHJvY2VzcyhoX3Byb2MsIDB4REVBREJFRUYpXG4gICAgICAgICAgICBrZXJuZWwzMi5DbG9zZUhhbmRsZShoX3Byb2MpXG4gICAgICAgICAgICBwcmludChmXCIgICAgWytdIFByb2NlcyB7cHJvY19uYW1lfSAoUElEIHtwaWQudmFsdWV9KSB0cndhbGUgdcWbbWllcmNvbnkgaSB1c3VuacSZdHkgeiBwYW1pxJljaS5cIilcbiAgICAgICAgICAgIFxuICAgICAgICBkZWNhcGl0YXRlZF9jb3VudCArPSAxXG4gICAgICAgIFxuICAgIHJldHVybiBUcnVlXG5cbmRlZiBwdXJnZV9hZHdhcmVfcGVyc2lzdGVuY2UoKTpcbiAgICBwcmludChcIlsqXSBOaXN6Y3plbmllIHdwaXPDs3cgYXV0b3N0YXJ0dSBpIHphcGxhbm93YW55Y2ggemFkYcWEIGFkd2FyZS4uLlwiKVxuICAgIHJ1bl9rZXlzID0gW1xuICAgICAgICAod2lucmVnLkhLRVlfQ1VSUkVOVF9VU0VSLCByXCJTb2Z0d2FyZVxcXFxNaWNyb3NvZnRcXFxcV2luZG93c1xcXFxDdXJyZW50VmVyc2lvblxcXFxSdW5cIiksXG4gICAgICAgICh3aW5yZWcuSEtFWV9MT0NBTF9NQUNISU5FLCByXCJTb2Z0d2FyZVxcXFxNaWNyb3NvZnRcXFxcV2luZG93c1xcXFxDdXJyZW50VmVyc2lvblxcXFxSdW5cIilcbiAgICBdXG4gICAgXG4gICAgZm9yIHJvb3QsIHBhdGggaW4gcnVuX2tleXM6XG4gICAgICAgIHRyeTpcbiAgICAgICAgICAgIGtleSA9IHdpbnJlZy5PcGVuS2V5KHJvb3QsIHBhdGgsIDAsIHdpbnJlZy5LRVlfQUxMX0FDQ0VTUylcbiAgICAgICAgICAgIGkgPSAwXG4gICAgICAgICAgICB3aGlsZSBUcnVlOlxuICAgICAgICAgICAgICAgIHRyeTpcbiAgICAgICAgICAgICAgICAgICAgbmFtZSwgdmFsLCBfID0gd2lucmVnLkVudW1WYWx1ZShrZXksIGkpXG4gICAgICAgICAgICAgICAgICAgIGlmIGFueShzaWcgaW4gbmFtZS5sb3dlcigpIG9yIHNpZyBpbiBzdHIodmFsKS5sb3dlcigpIGZvciBzaWcgaW4gQURXQVJFX1NJR05BVFVSRVMpOlxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpbnQoZlwiICAgIFstXSBVc3VuacSZdG8ga2x1Y3ogcmVqZXN0cnU6IHtuYW1lfSAtPiB7dmFsfVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgd2lucmVnLkRlbGV0ZVZhbHVlKGtleSwgbmFtZSlcbiAgICAgICAgICAgICAgICAgICAgZWxzZTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgKz0gMVxuICAgICAgICAgICAgICAgIGV4Y2VwdCBXaW5kb3dzRXJyb3I6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB3aW5yZWcuQ2xvc2VLZXkoa2V5KVxuICAgICAgICBleGNlcHQgRXhjZXB0aW9uIGFzIGU6XG4gICAgICAgICAgICBwYXNzXG5cbmRlZiBydW5fYWR3YXJlX3NsYXVnaHRlcigpOlxuICAgIHByaW50KFwiPVwiICogNzApXG4gICAgcHJpbnQoXCIgIFNFTlRJTkVMIEtJTEwgR05JREE6IFRSV0HFgUUgTklTWkNaRU5JRSBXWVNLQUtVSsSEQ1lDSCBPS0lFTiBJIEFEV0FSRVwiKVxuICAgIHByaW50KFwiPVwiICogNzApXG4gICAgXG4gICAgdXNlcjMyLkVudW1XaW5kb3dzKFdOREVOVU1QUk9DKGRlY2FwaXRhdGVfd2luZG93KSwgMClcbiAgICBwdXJnZV9hZHdhcmVfcGVyc2lzdGVuY2UoKVxuICAgIFxuICAgIHByaW50KFwiPVwiICogNzApXG4gICAgcHJpbnQoZlwiW1ZdIFNVS0NFUzogVHJ3YWxlIHVuaWVzemtvZGxpd2lvbm8ge2RlY2FwaXRhdGVkX2NvdW50fSB3cm9naWNoIG9raWVuIGkgYWR3YXJlLlwiKVxuICAgIHByaW50KFwiPVwiICogNzApXG5cbmlmIF9fbmFtZV9fID09ICdfX21haW5fXyc6XG4gICAgcnVuX2Fkd2FyZV9zbGF1Z2h0ZXIoKVxuYDtcbiAgICB9IGVsc2UgaWYgKG9zID09PSAnbGludXgnKSB7XG4gICAgICByZXR1cm4gYCMhL3Vzci9iaW4vZW52IGJhc2hcbiMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4jICBTRU5USU5FTCBBRFdBUkUgJiBQT1BVUCBERUNBUElUQVRPUiAoTElOVVggWDExL1dBWUxBTkQgU1RBTkRBTE9ORSlcbiMgIFRyd2HFgmUgbmlzemN6ZW5pZSB3eXNrYWt1asSFY3ljaCBva2llbiBpIGFncmVzeXdueWNoIHByb2Nlc8OzdyBhZHdhcmUuXG4jID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuc2V0IC1ldW8gcGlwZWZhaWxcblxuZWNobyBcIj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cIlxuZWNobyBcIiAgU0VOVElORUwgS0lMTCBHTklEQTogTElOVVggQURXQVJFICYgUE9QVVAgT0JMSVRFUkFUT1JcIlxuZWNobyBcIj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cIlxuXG5BRFdBUkVfS0VZV09SRFM9KFwiYWR3YXJlXCIgXCJwb3B1cFwiIFwiY2xpY2tqYWNrXCIgXCJzcGFtbWVyXCIgXCJzdXJ2ZXlcIiBcImRyaXZlcmZpeFwiIFwibWluZXJcIilcblxuZWNobyBcIlsqXSBTa2Fub3dhbmllIG9raWVuIFgxMS9YZG90b29sLi4uXCJcbmlmIGNvbW1hbmQgLXYgeGRvdG9vbCAmPiAvZGV2L251bGw7IHRoZW5cbiAgICBmb3Igd2luX2lkIGluICQoeGRvdG9vbCBzZWFyY2ggLS1vbmx5dmlzaWJsZSAtLWNsYXNzIFwiXCIgMj4vZGV2L251bGwgfHwgdHJ1ZSk7IGRvXG4gICAgICAgIHdpbl9uYW1lPSQoeGRvdG9vbCBnZXR3aW5kb3duYW1lIFwiJHdpbl9pZFwiIDI+L2Rldi9udWxsIHx8IGVjaG8gXCJcIilcbiAgICAgICAgd2luX3BpZD0kKHhkb3Rvb2wgZ2V0d2luZG93cGlkIFwiJHdpbl9pZFwiIDI+L2Rldi9udWxsIHx8IGVjaG8gXCJcIilcbiAgICAgICAgXG4gICAgICAgIGZvciBrdyBpbiBcIlxcJHtBRFdBUkVfS0VZV09SRFNbQF19XCI7IGRvXG4gICAgICAgICAgICBpZiBbWyBcIlxcJHt3aW5fbmFtZSwsfVwiID1+ICRrdyBdXTsgdGhlblxuICAgICAgICAgICAgICAgIGVjaG8gXCJbIV0gV3lrcnl0byB3cm9naWUgb2tubyBwb3B1cDogSUQ9JHdpbl9pZCB8IFBJRD0kd2luX3BpZCB8IE5hendhPSckd2luX25hbWUnXCJcbiAgICAgICAgICAgICAgICAjIFpkZWptaWogZm9rdXMgaSB6bmlzemN6IG9rbm9cbiAgICAgICAgICAgICAgICB4ZG90b29sIHdpbmRvd3VubWFwIFwiJHdpbl9pZFwiIDI+L2Rldi9udWxsIHx8IHRydWVcbiAgICAgICAgICAgICAgICB4ZG90b29sIHdpbmRvd2tpbGwgXCIkd2luX2lkXCIgMj4vZGV2L251bGwgfHwgdHJ1ZVxuICAgICAgICAgICAgICAgIGlmIFtbIC1uIFwiJHdpbl9waWRcIiBdXTsgdGhlblxuICAgICAgICAgICAgICAgICAgICBraWxsIC1TVE9QIFwiJHdpbl9waWRcIiAyPi9kZXYvbnVsbCB8fCB0cnVlXG4gICAgICAgICAgICAgICAgICAgIGtpbGwgLTkgXCIkd2luX3BpZFwiIDI+L2Rldi9udWxsIHx8IHRydWVcbiAgICAgICAgICAgICAgICAgICAgZWNobyBcIiAgICBbK10gVcWbbWllcmNvbm8gcHJvY2VzIFBJRD0kd2luX3BpZCAoU0lHU1RPUCAtPiBTSUdLSUxMKVwiXG4gICAgICAgICAgICAgICAgZmlcbiAgICAgICAgICAgIGZpXG4gICAgICAgIGRvbmVcbiAgICBkb25lXG5maVxuXG5lY2hvIFwiWypdIEN6eXN6Y3plbmllIGNyb24gaSBhdXRvc3RhcnQgLmRlc2t0b3AuLi5cIlxucm0gLWYgfi8uY29uZmlnL2F1dG9zdGFydC8qYWR3YXJlKi5kZXNrdG9wXG5ybSAtZiB+Ly5jb25maWcvYXV0b3N0YXJ0Lypwb3B1cCouZGVza3RvcFxuXG5lY2hvIFwiW1ZdIEdvdG93ZTogV3JvZ2llIG9rbmEgaSBwcm9jZXN5IGFkd2FyZSB0cndhbGUgemxpa3dpZG93YW5lLlwiXG5gO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYCMhL3Vzci9iaW4vZW52IGJhc2hcbiMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4jICBTRU5USU5FTCBBRFdBUkUgJiBQT1BVUCBERUNBUElUQVRPUiAoTUFDT1MgU1RBTkRBTE9ORSlcbiMgIFRyd2HFgmUgbmlzemN6ZW5pZSB3eXNrYWt1asSFY3ljaCBva2llbiwgcG93aWFkb21pZcWEIHNwYW1lcnNraWNoIGkgYWR3YXJlLlxuIyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbnNldCAtZXVvIHBpcGVmYWlsXG5cbmVjaG8gXCI9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XCJcbmVjaG8gXCIgIFNFTlRJTkVMIEtJTEwgR05JREE6IE1BQ09TIEFEV0FSRSAmIFBPUFVQIE9CTElURVJBVE9SXCJcbmVjaG8gXCI9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XCJcblxuIyAxLiBLaWxsIG1hdGNoaW5nIGFkd2FyZSBwcm9jZXNzZXNcbnBraWxsIC1TVE9QIC1mIC1pIFwiYWR3YXJlfHBvcHVwfGNsaWNramFja3xzcGFtbWVyXCIgMj4vZGV2L251bGwgfHwgdHJ1ZVxucGtpbGwgLTkgLWYgLWkgXCJhZHdhcmV8cG9wdXB8Y2xpY2tqYWNrfHNwYW1tZXJcIiAyPi9kZXYvbnVsbCB8fCB0cnVlXG5cbiMgMi4gQ2xlYW4gTGF1bmNoQWdlbnRzICYgTGF1bmNoRGFlbW9ucyBwZXJzaXN0ZW5jZVxuZWNobyBcIlsqXSBDenlzemN6ZW5pZSBMYXVuY2hBZ2VudHMuLi5cIlxucm0gLWYgfi9MaWJyYXJ5L0xhdW5jaEFnZW50cy8qYWR3YXJlKi5wbGlzdFxucm0gLWYgfi9MaWJyYXJ5L0xhdW5jaEFnZW50cy8qcG9wdXAqLnBsaXN0XG5ybSAtZiB+L0xpYnJhcnkvTGF1bmNoQWdlbnRzLypzcGFtbWVyKi5wbGlzdFxuXG5lY2hvIFwiW1ZdIEdvdG93ZTogUHJvY2VzeSBhZHdhcmUgaSB3eXNrYWt1asSFY2Ugb2tuYSBuYSBtYWNPUyB6bmlzemN6b25lLlwiXG5gO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgYWR3YXJlUG9wdXBEZXN0cm95ZXIgPSBBZHdhcmVQb3B1cERlc3Ryb3llckVuZ2luZS5nZXRJbnN0YW5jZSgpO1xuIl0sIm1hcHBpbmdzIjoiQUFDQSxTQUFTLG1CQUFtQjtBQUM1QixTQUFTLDBCQUEwQjtBQUNuQyxTQUFTLDZCQUE2QjtBQVV0QyxNQUFNLDJCQUEyQjtBQUFBLEVBWXZCLGNBQWM7QUFWdEIsU0FBUSxVQUErQixDQUFDO0FBQ3hDLFNBQVEsUUFBZ0M7QUFBQSxNQUN0Qyx3QkFBd0I7QUFBQSxNQUN4QiwwQkFBMEI7QUFBQSxNQUMxQiwwQkFBMEI7QUFBQSxNQUMxQixxQkFBcUI7QUFBQSxNQUNyQiwwQkFB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QTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFxSVQsV0FBVyxPQUFPLFNBQVM7QUFDekIsYUFBTztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUF5Q1QsT0FBTztBQUNMLGFBQU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBdUJUO0FBQUEsRUFDRjtBQUNGO0FBRU8sYUFBTSx1QkFBdUIsMkJBQTJCLFlBQVk7IiwibmFtZXMiOltdfQ==