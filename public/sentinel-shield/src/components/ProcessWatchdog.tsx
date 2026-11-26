import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"];
import {
  Activity,
  Cpu,
  HardDrive,
  ShieldAlert,
  Zap,
  Play,
  Pause,
  Lock,
  Skull,
  Gauge,
  Terminal,
  Download,
  Search,
  Info,
  Snowflake
} from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import { downloadFile } from "/sentinel-shield/src/utils/offlinePackageExporter.ts";
import { CpuThermalGovernorPanel } from "/sentinel-shield/src/components/CpuThermalGovernorPanel.tsx";
export const ProcessWatchdog = ({ initialProcesses }) => {
  const [processes, setProcesses] = useState(() => {
    if (initialProcesses && initialProcesses.length > 0) {
      return initialProcesses.map((p) => ({
        ...p,
        cpuPercent: p.cpuPercent ?? (p.isTopMost ? 34.8 : p.isParentDropper ? 12.4 : 1.2),
        memoryMb: p.memoryMb ?? (p.isTopMost ? 218.4 : p.isParentDropper ? 45.2 : 110.5),
        threadsCount: p.threadsCount ?? (p.isTopMost ? 18 : p.isParentDropper ? 6 : 24),
        handlesCount: p.handlesCount ?? (p.isTopMost ? 340 : p.isParentDropper ? 95 : 512),
        ioRateKb: p.ioRateKb ?? (p.isTopMost ? 142.5 : p.isParentDropper ? 18.2 : 4.1),
        priorityClass: p.priorityClass ?? (p.isTopMost ? "HIGH" : "NORMAL"),
        cpuHistory: p.cpuHistory ?? [15, 22, 28, 30, 35, 34.8],
        memoryHistory: p.memoryHistory ?? [180, 195, 205, 212, 215, 218.4]
      }));
    }
    return [
      {
        pid: 1044,
        ppid: 0,
        name: "explorer.exe",
        windowTitle: "Eksplorator Windows",
        isTopMost: false,
        isFullscreen: false,
        hasFlutterDll: false,
        width: 1024,
        height: 700,
        opacity: 1,
        isBlocked: false,
        status: "running",
        filePath: "C:\\Windows\\explorer.exe",
        isRogue: false,
        cpuPercent: 1.8,
        memoryMb: 142,
        threadsCount: 42,
        handlesCount: 1250,
        ioRateKb: 8.5,
        priorityClass: "NORMAL",
        cpuHistory: [2.1, 1.9, 2.5, 1.8, 1.7, 1.8],
        memoryHistory: [140, 141, 141.5, 142, 142, 142],
        windows: [
          {
            hwnd: "0x0001004A",
            title: "Pasek Zadań Windows & Pulpit",
            className: "Shell_TrayWnd",
            isTopMost: false,
            isFullscreen: false,
            isLayered: false,
            bounds: { width: 1920, height: 48 },
            zOrder: 0
          }
        ]
      },
      {
        pid: 4820,
        ppid: 1044,
        name: "chrome.exe",
        windowTitle: "Google Chrome - Stack Overflow",
        isTopMost: false,
        isFullscreen: false,
        hasFlutterDll: false,
        width: 1280,
        height: 800,
        opacity: 1,
        isBlocked: false,
        status: "running",
        filePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        isRogue: false,
        cpuPercent: 4.2,
        memoryMb: 320.5,
        threadsCount: 36,
        handlesCount: 890,
        ioRateKb: 24.1,
        priorityClass: "NORMAL",
        cpuHistory: [3.8, 5.1, 4.5, 6.2, 4, 4.2],
        memoryHistory: [310, 312, 315, 318, 320, 320.5],
        windows: [
          {
            hwnd: "0x00045A12",
            title: "Google Chrome - Stack Overflow",
            className: "Chrome_WidgetWin_1",
            isTopMost: false,
            isFullscreen: false,
            isLayered: false,
            bounds: { width: 1280, height: 800 },
            zOrder: 1
          }
        ]
      },
      {
        pid: 3840,
        ppid: 1044,
        name: "dropper_watchdog.exe",
        windowTitle: "Background Watchdog Service (Hidden Dropper)",
        isTopMost: false,
        isFullscreen: false,
        hasFlutterDll: false,
        width: 0,
        height: 0,
        opacity: 1,
        isBlocked: true,
        status: "running",
        filePath: "C:\\Users\\User\\AppData\\Local\\Temp\\dropper_watchdog.exe",
        isParentDropper: true,
        isRogue: true,
        cpuPercent: 14.6,
        memoryMb: 58.2,
        threadsCount: 8,
        handlesCount: 145,
        ioRateKb: 65.4,
        priorityClass: "NORMAL",
        cpuHistory: [10, 12, 18, 14, 15, 14.6],
        memoryHistory: [45, 48, 52, 55, 57, 58.2],
        windows: []
      },
      {
        pid: 8932,
        ppid: 3840,
        name: "flutter_runner.exe",
        windowTitle: "Flutter Fullscreen Lockscreen Overlay [WS_EX_TOPMOST]",
        isTopMost: true,
        isFullscreen: true,
        hasFlutterDll: true,
        width: 1920,
        height: 1080,
        opacity: 0.92,
        isBlocked: true,
        status: "running",
        filePath: "C:\\Users\\User\\AppData\\Local\\Temp\\flutter_runner.exe",
        isRogue: true,
        cpuPercent: 48.5,
        memoryMb: 264.8,
        threadsCount: 22,
        handlesCount: 460,
        ioRateKb: 210.8,
        priorityClass: "HIGH",
        cpuHistory: [25, 38, 42, 51, 46, 48.5],
        memoryHistory: [180, 210, 235, 250, 260, 264.8],
        windows: [
          {
            hwnd: "0x004F1A02",
            title: "Flutter Fullscreen Lockscreen Overlay [WS_EX_TOPMOST]",
            className: "FLUTTER_RUNNER_WINDOW",
            isTopMost: true,
            isFullscreen: true,
            isLayered: false,
            bounds: { width: 1920, height: 1080 },
            zOrder: 999
          }
        ]
      }
    ];
  });
  const [isWatchdogActive, setIsWatchdogActive] = useState(true);
  const [pollInterval, setPollInterval] = useState(1e3);
  const [cpuThreshold, setCpuThreshold] = useState(30);
  const [memoryThreshold, setMemoryThreshold] = useState(200);
  const [autoAction, setAutoAction] = useState("auto_suspend");
  const [filterMode, setFilterMode] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProcessForDetails, setSelectedProcessForDetails] = useState(null);
  const [showThermalGovernor, setShowThermalGovernor] = useState(true);
  const [watchdogLogs, setWatchdogLogs] = useState([
    "[*] Strażnik zasobów (Process Watchdog Engine) zainicjalizowany pomyślnie.",
    "[*] Monitorowanie zużycia CPU (GetProcessTimes) i pamięci RAM (K32GetProcessMemoryInfo).",
    "[*] Reguła automatycznej reakcji: Wstrzymanie procesu (NtSuspendProcess), gdy CPU > 30% lub RAM > 200MB."
  ]);
  const addLog = (msg) => {
    setWatchdogLogs((prev) => [...prev.slice(-25), `[${(/* @__PURE__ */ new Date()).toLocaleTimeString()}] ${msg}`]);
  };
  useEffect(() => {
    if (!isWatchdogActive) return;
    const intervalId = setInterval(() => {
      setProcesses((prevProcesses) => {
        return prevProcesses.map((proc) => {
          if (proc.status !== "running") {
            return {
              ...proc,
              cpuPercent: 0,
              ioRateKb: 0
            };
          }
          let cpuBase = proc.cpuPercent || 1;
          let memBase = proc.memoryMb || 100;
          if (proc.isTopMost || proc.name.includes("flutter")) {
            const deltaCpu = Math.random() * 12 - 5.5;
            cpuBase = Math.max(18, Math.min(85, cpuBase + deltaCpu));
            const deltaMem = Math.random() * 2.5 - 0.4;
            memBase = Math.max(150, Math.min(480, memBase + deltaMem));
          } else if (proc.isParentDropper) {
            const spike = Math.random() > 0.7 ? 12 : -3;
            cpuBase = Math.max(2, Math.min(30, cpuBase + spike));
            memBase = Math.max(30, Math.min(90, memBase + (Math.random() * 0.8 - 0.3)));
          } else {
            const delta = Math.random() * 2 - 1;
            cpuBase = Math.max(0.5, Math.min(15, cpuBase + delta));
            memBase = Math.max(80, Math.min(450, memBase + (Math.random() * 0.4 - 0.2)));
          }
          const currentCpu = parseFloat(cpuBase.toFixed(1));
          const currentMem = parseFloat(memBase.toFixed(1));
          const newCpuHist = [...(proc.cpuHistory || []).slice(-9), currentCpu];
          const newMemHist = [...(proc.memoryHistory || []).slice(-9), currentMem];
          if ((currentCpu >= cpuThreshold || currentMem >= memoryThreshold) && (proc.isRogue || proc.isTopMost || proc.hasFlutterDll)) {
            if (autoAction === "auto_suspend") {
              addLog(`🚨 [WATCHDOG TRIGGER] PID ${proc.pid} (${proc.name}) przekroczył limit (CPU: ${currentCpu}%, RAM: ${currentMem}MB)! Wywołano NtSuspendProcess!`);
              return {
                ...proc,
                status: "quarantined",
                cpuPercent: 0,
                cpuHistory: [...newCpuHist.slice(-9), 0],
                memoryHistory: newMemHist
              };
            } else if (autoAction === "auto_kill") {
              addLog(`💥 [WATCHDOG TRIGGER] PID ${proc.pid} (${proc.name}) przekroczył próg zasobów! Wywołano TerminateProcess(PID, 9)!`);
              return {
                ...proc,
                status: "terminated",
                cpuPercent: 0,
                cpuHistory: [...newCpuHist.slice(-9), 0],
                memoryHistory: newMemHist
              };
            } else if (autoAction === "auto_throttle") {
              addLog(`⚠️ [WATCHDOG TRIGGER] PID ${proc.pid} (${proc.name}) ograniczono priorytet CPU do IDLE_PRIORITY_CLASS.`);
              return {
                ...proc,
                priorityClass: "IDLE",
                cpuPercent: Math.min(currentCpu, 5),
                cpuHistory: newCpuHist,
                memoryHistory: newMemHist
              };
            } else {
              addLog(`⚠️ [WATCHDOG ALERT] Wykryto nadmierne obciążenie w PID ${proc.pid} (${proc.name}): CPU ${currentCpu}%, RAM ${currentMem}MB.`);
            }
          }
          return {
            ...proc,
            cpuPercent: currentCpu,
            memoryMb: currentMem,
            cpuHistory: newCpuHist,
            memoryHistory: newMemHist,
            ioRateKb: parseFloat((Math.random() * (proc.isTopMost ? 150 : 20) + 5).toFixed(1))
          };
        });
      });
    }, pollInterval);
    return () => clearInterval(intervalId);
  }, [isWatchdogActive, pollInterval, cpuThreshold, memoryThreshold, autoAction]);
  const runningProcesses = processes.filter((p) => p.status === "running");
  const totalCpu = runningProcesses.reduce((acc, p) => acc + (p.cpuPercent || 0), 0);
  const totalMemory = runningProcesses.reduce((acc, p) => acc + (p.memoryMb || 0), 0);
  const rogueCpu = runningProcesses.filter((p) => p.isRogue || p.isTopMost || p.hasFlutterDll).reduce((acc, p) => acc + (p.cpuPercent || 0), 0);
  const totalThreads = runningProcesses.reduce((acc, p) => acc + (p.threadsCount || 0), 0);
  const activeAlerts = runningProcesses.filter(
    (p) => (p.cpuPercent || 0) > cpuThreshold || (p.memoryMb || 0) > memoryThreshold
  ).length;
  const handleSuspendProcess = (pid) => {
    setProcesses(
      (prev) => prev.map((p) => {
        if (p.pid === pid) {
          addLog(`[MANUAL FREEZE] NtSuspendProcess(PID: ${pid} - ${p.name}) -> Zamrożono wątki w pamięci RAM.`);
          return { ...p, status: "quarantined", cpuPercent: 0 };
        }
        return p;
      })
    );
  };
  const handleKillProcess = (pid) => {
    setProcesses(
      (prev) => prev.map((p) => {
        if (p.pid === pid) {
          addLog(`[MANUAL KILL] TerminateProcess(PID: ${pid} - ${p.name}) -> Zwolniono wszystkie uchwyty i pamięć.`);
          return { ...p, status: "terminated", cpuPercent: 0 };
        }
        return p;
      })
    );
  };
  const handleThrottleProcess = (pid) => {
    setProcesses(
      (prev) => prev.map((p) => {
        if (p.pid === pid) {
          addLog(`[THROTTLE] SetPriorityClass(PID: ${pid}, IDLE_PRIORITY_CLASS) -> Obniżono priorytet wątków do minimum.`);
          return { ...p, priorityClass: "IDLE", cpuPercent: 2.1 };
        }
        return p;
      })
    );
  };
  const handleSabotagePE = (pid) => {
    setProcesses(
      (prev) => prev.map((p) => {
        if (p.pid === pid) {
          addLog(`💥 [PE SABOTAGE] Nadpisano nagłówek MZ zerami dla ${p.name} (PID: ${pid}) -> 0xC000007B!`);
          addLog(`🔒 [ACL LOCKOUT] icacls "${p.filePath}" /deny Everyone:(F,X)`);
          return { ...p, status: "pe_corrupted", cpuPercent: 0 };
        }
        return p;
      })
    );
  };
  const handleSpawnOverloadProcess = () => {
    const newPid = Math.floor(7e3 + Math.random() * 2e3);
    const newProc = {
      pid: newPid,
      ppid: 3840,
      name: "flutter_crypto_miner_overlay.exe",
      windowTitle: "Hardware Accelerated Fullscreen Lock (High Load)",
      isTopMost: true,
      isFullscreen: true,
      hasFlutterDll: true,
      width: 1920,
      height: 1080,
      opacity: 0.95,
      isBlocked: true,
      status: "running",
      filePath: "C:\\Users\\User\\AppData\\Local\\Temp\\flutter_crypto_miner_overlay.exe",
      isRogue: true,
      cpuPercent: 68.4,
      memoryMb: 340.2,
      threadsCount: 28,
      handlesCount: 620,
      ioRateKb: 412,
      priorityClass: "HIGH",
      cpuHistory: [40, 52, 60, 65, 68, 68.4],
      memoryHistory: [250, 280, 310, 330, 335, 340.2],
      windows: [
        {
          hwnd: `0x00${Math.floor(1e5 + Math.random() * 8e5).toString(16)}`,
          title: "Hardware Accelerated Fullscreen Lock",
          className: "FLUTTER_SURFACE_VIEW",
          isTopMost: true,
          isFullscreen: true,
          isLayered: false,
          bounds: { width: 1920, height: 1080 },
          zOrder: 999
        }
      ]
    };
    setProcesses((prev) => [...prev, newProc]);
    addLog(`[SPAWN] Uruchomiono proces przeciążający: ${newProc.name} (PID: ${newProc.pid}) generujący ~68% CPU!`);
  };
  const filteredProcesses = processes.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.pid.toString().includes(searchQuery) || p.windowTitle && p.windowTitle.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (filterMode === "rogue_only") {
      return p.isRogue || p.isTopMost || p.hasFlutterDll;
    }
    if (filterMode === "high_resource") {
      return (p.cpuPercent || 0) > cpuThreshold || (p.memoryMb || 0) > memoryThreshold;
    }
    return true;
  });
  const exportPythonWatchdogScript = () => {
    const scriptCode = `"""
=============================================================================
PROCESS RESOURCE WATCHDOG DAEMON (100% OFFLINE / ZERO-DEPENDENCY)
=============================================================================
Automatyczny strażnik monitorujący zużycie CPU i pamięci RAM przez procesy
nakładek ekranowych Flutter / TopMost. W przypadku wykrycia przeciążenia
natychmiast zamraża proces w RAM (NtSuspendProcess) lub zrywa uprawnienia.
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

# Konfiguracja progów Watchdoga
CPU_THRESHOLD_PERCENT = ${cpuThreshold}
MEMORY_THRESHOLD_MB = ${memoryThreshold}
POLL_INTERVAL_SECONDS = ${pollInterval / 1e3}
AUTO_ACTION = "${autoAction}" # 'auto_suspend', 'auto_kill', 'auto_throttle'

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

def get_process_memory_mb(h_process):
    """Zwraca zużycie pamięci RAM Working Set w megabajtach."""
    counters = PROCESS_MEMORY_COUNTERS()
    counters.cb = ctypes.sizeof(PROCESS_MEMORY_COUNTERS)
    if psapi.GetProcessMemoryInfo(h_process, ctypes.byref(counters), counters.cb):
        return counters.WorkingSetSize / (1024 * 1024)
    return 0.0

def freeze_process(pid):
    """Błyskawicznie zamraża wszystkie wątki w pamięci RAM."""
    h = kernel32.OpenProcess(PROCESS_SUSPEND_RESUME, False, pid)
    if h:
        ntdll.NtSuspendProcess(h)
        kernel32.CloseHandle(h)
        print(f"[!] [FREEZE] NtSuspendProcess(PID: {pid}) -> Zamrożono wątki w pamięci RAM!")

def terminate_process(pid):
    """Trwale ubija proces."""
    h = kernel32.OpenProcess(PROCESS_TERMINATE, False, pid)
    if h:
        kernel32.TerminateProcess(h, 9)
        kernel32.CloseHandle(h)
        print(f"[!] [KILL] TerminateProcess(PID: {pid}) -> Usunięto z RAM!")

def run_watchdog_loop():
    print("=" * 70)
    print("  PROCESS WATCHDOG DAEMON: MONITOROWANIE CPU & RAM")
    print(f"  Progi: CPU > {CPU_THRESHOLD_PERCENT}% | RAM > {MEMORY_THRESHOLD_MB} MB")
    print(f"  Akcja automatyczna: {AUTO_ACTION.upper()}")
    print("=" * 70)

    try:
        while True:
            # Skanowanie aktywnych okien TopMost
            def enum_proc(hwnd, lparam):
                if not user32.IsWindowVisible(hwnd):
                    return True
                
                ex_style = user32.GetWindowLongW(hwnd, -20) # GWL_EXSTYLE
                is_topmost = bool(ex_style & 0x00000008)

                if is_topmost:
                    pid = wintypes.DWORD()
                    user32.GetWindowThreadProcessId(hwnd, ctypes.byref(pid))
                    h_proc = kernel32.OpenProcess(PROCESS_QUERY_INFORMATION | PROCESS_VM_READ, False, pid.value)
                    if h_proc:
                        ram_mb = get_process_memory_mb(h_proc)
                        kernel32.CloseHandle(h_proc)

                        if ram_mb >= MEMORY_THRESHOLD_MB:
                            print(f"[🚨 ALARM] Wykryto przeciążenie RAM w PID {pid.value}: {ram_mb:.1f} MB (Limit: {MEMORY_THRESHOLD_MB} MB)")
                            if AUTO_ACTION == "auto_suspend":
                                freeze_process(pid.value)
                            elif AUTO_ACTION == "auto_kill":
                                terminate_process(pid.value)

                return True

            cb = ctypes.WINFUNCTYPE(wintypes.BOOL, wintypes.HWND, wintypes.LPARAM)(enum_proc)
            user32.EnumWindows(cb, 0)
            time.sleep(POLL_INTERVAL_SECONDS)

    except KeyboardInterrupt:
        print("\\n[*] Zatrzymano strażnika Watchdog.")

if __name__ == "__main__":
    run_watchdog_loop()
`;
    downloadFile("process_watchdog_daemon.py", scriptCode, "text/x-python");
    addLog("✔ [EXPORT] Pobrano skrypt Pythona: process_watchdog_daemon.py");
  };
  const renderSparkline = (data = [], color = "#a855f7") => {
    if (!data || data.length < 2) return null;
    const max = Math.max(...data, 1);
    const min = Math.min(...data, 0);
    const range = max - min || 1;
    const height = 24;
    const width = 64;
    const points = data.map((val, idx) => {
      const x = idx / (data.length - 1) * width;
      const y = height - (val - min) / range * (height - 4) - 2;
      return `${x},${y}`;
    }).join(" ");
    return /* @__PURE__ */ jsxDEV("svg", { width, height, className: "overflow-visible inline-block", children: /* @__PURE__ */ jsxDEV("polyline", { fill: "none", stroke: color, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", points }, void 0, false, {
      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
      lineNumber: 553,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
      lineNumber: 552,
      columnNumber: 7
    }, this);
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("h2", { className: "text-xl font-bold text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(Gauge, { className: "w-5 h-5 text-purple-400" }, void 0, false, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 564,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Process Watchdog Dashboard & Telemetria Zasobów" }, void 0, false, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 565,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800 font-mono font-bold", children: "REAL-TIME METRICS" }, void 0, false, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 566,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 563,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 mt-1 max-w-2xl", children: "Monitoruj na żywo zużycie procesora (CPU %), pamięci operacyjnej (RAM MB), wątków i uchwytów okien nakładek Fluttera. Automatycznie zamrażaj lub niszcz procesy przekraczające dozwolone progi obciążenia." }, void 0, false, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 570,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
        lineNumber: 562,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setIsWatchdogActive(!isWatchdogActive),
            className: `flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold font-mono shadow transition-all ${isWatchdogActive ? "bg-emerald-600 hover:bg-emerald-500 text-white animate-pulse" : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"}`,
            children: [
              isWatchdogActive ? /* @__PURE__ */ jsxDEV(Pause, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 584,
                columnNumber: 33
              }, this) : /* @__PURE__ */ jsxDEV(Play, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 584,
                columnNumber: 69
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: isWatchdogActive ? "Strażnik: AKTYWNY" : "Wznów Strażnika" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 585,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 576,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleSpawnOverloadProcess,
            className: "flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-red-700 to-pink-700 hover:from-red-600 hover:to-pink-600 text-white rounded-lg text-xs font-bold font-mono shadow transition-all border border-red-500/30",
            title: "Symuluj uruchomienie nakładki generującej ogromne obciążenie CPU i RAM",
            children: [
              /* @__PURE__ */ jsxDEV(Zap, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 593,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Wygeneruj Obciążenie (Spike)" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 594,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 588,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setShowThermalGovernor(!showThermalGovernor),
            className: `flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold font-mono shadow transition-all border ${showThermalGovernor ? "bg-indigo-950 text-indigo-200 border-indigo-500 shadow-indigo-950" : "bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700"}`,
            title: "Pokaż / Ukryj Zarządcę Termicznego CPU & Chłodzenie Kriogeniczne",
            children: [
              /* @__PURE__ */ jsxDEV(Snowflake, { className: `w-3.5 h-3.5 ${showThermalGovernor ? "text-cyan-400 animate-spin" : "text-indigo-400"}` }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 606,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Temp CPU & Kriogenika" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 607,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 597,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: exportPythonWatchdogScript,
            className: "flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold border border-slate-700 transition-all",
            title: "Pobierz skrypt demona Pythona do monitorowania CPU/RAM w systemie Windows",
            children: [
              /* @__PURE__ */ jsxDEV(Download, { className: "w-3.5 h-3.5 text-purple-400" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 615,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Pobierz Skrypt .py" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 616,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 610,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
        lineNumber: 575,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
      lineNumber: 561,
      columnNumber: 7
    }, this),
    showThermalGovernor && /* @__PURE__ */ jsxDEV(CpuThermalGovernorPanel, {}, void 0, false, {
      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
      lineNumber: 623,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow flex flex-col justify-between", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-medium text-slate-400 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxDEV(Cpu, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 632,
              columnNumber: 15
            }, this),
            "Łączne Obciążenie CPU"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 631,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800", children: [
            runningProcesses.length,
            " proc."
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 635,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 630,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "my-2 flex items-baseline justify-between", children: [
          /* @__PURE__ */ jsxDEV("span", { className: `text-2xl font-extrabold font-mono ${totalCpu > 50 ? "text-rose-400" : "text-white"}`, children: [
            totalCpu.toFixed(1),
            "%"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 641,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs text-slate-400 font-mono", children: [
            "Zagrożenia: ",
            /* @__PURE__ */ jsxDEV("strong", { className: "text-red-400", children: [
              rogueCpu.toFixed(1),
              "%"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 645,
              columnNumber: 27
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 644,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 640,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800", children: /* @__PURE__ */ jsxDEV(
          "div",
          {
            className: `h-full transition-all duration-300 ${totalCpu > 60 ? "bg-red-500" : totalCpu > 30 ? "bg-amber-500" : "bg-purple-500"}`,
            style: { width: `${Math.min(totalCpu, 100)}%` }
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 651,
            columnNumber: 13
          },
          this
        ) }, void 0, false, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 650,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
        lineNumber: 629,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow flex flex-col justify-between", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-medium text-slate-400 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxDEV(HardDrive, { className: "w-4 h-4 text-pink-400" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 664,
              columnNumber: 15
            }, this),
            "Pamięć RAM (Working Set)"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 663,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono text-slate-400", children: "Limit: 1024 MB" }, void 0, false, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 667,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 662,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "my-2 flex items-baseline justify-between", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-2xl font-extrabold font-mono text-white", children: [
            totalMemory.toFixed(1),
            " ",
            /* @__PURE__ */ jsxDEV("span", { className: "text-sm font-normal text-slate-400", children: "MB" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 672,
              columnNumber: 40
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 671,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs text-slate-400 font-mono", children: [
            "Średnio: ",
            (totalMemory / (runningProcesses.length || 1)).toFixed(0),
            " MB/p"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 674,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 670,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800", children: /* @__PURE__ */ jsxDEV(
          "div",
          {
            className: "h-full bg-gradient-to-r from-pink-600 to-purple-500 transition-all duration-300",
            style: { width: `${Math.min(totalMemory / 1024 * 100, 100)}%` }
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 680,
            columnNumber: 13
          },
          this
        ) }, void 0, false, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 679,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
        lineNumber: 661,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow flex flex-col justify-between", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-medium text-slate-400 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxDEV(Activity, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 691,
              columnNumber: 15
            }, this),
            "Wątki & Uchwyty Win32"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 690,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800", children: "CONCURRENCY" }, void 0, false, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 694,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 689,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "my-2 flex items-baseline justify-between", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-2xl font-extrabold font-mono text-white", children: [
            totalThreads,
            " ",
            /* @__PURE__ */ jsxDEV("span", { className: "text-sm font-normal text-slate-400", children: "wątków" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 701,
              columnNumber: 30
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 700,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs text-slate-400 font-mono", children: [
            "Uchwyty: ",
            /* @__PURE__ */ jsxDEV("strong", { className: "text-slate-200", children: processes.reduce((a, b) => a + (b.handlesCount || 0), 0) }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 704,
              columnNumber: 24
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 703,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 699,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] text-slate-400 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "Stan pamięci:" }, void 0, false, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 709,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-bold font-mono", children: "STABILNY" }, void 0, false, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 710,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 708,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
        lineNumber: 688,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow flex flex-col justify-between", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-medium text-slate-400 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxDEV(ShieldAlert, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 718,
              columnNumber: 15
            }, this),
            "Automatyczna Reakcja"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 717,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-bold", children: autoAction.toUpperCase().replace("_", " ") }, void 0, false, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 721,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 716,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "my-2 flex items-baseline justify-between", children: /* @__PURE__ */ jsxDEV("span", { className: "text-2xl font-extrabold font-mono text-white", children: activeAlerts > 0 ? /* @__PURE__ */ jsxDEV("span", { className: "text-red-400 animate-pulse", children: [
          activeAlerts,
          " PRZEKROCZEŃ"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 729,
          columnNumber: 17
        }, this) : /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400", children: "BRAK ALERTÓW" }, void 0, false, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 731,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 727,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 726,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] text-slate-400 flex items-center justify-between font-mono", children: [
          /* @__PURE__ */ jsxDEV("span", { children: [
            "Próg CPU: ",
            cpuThreshold,
            "%"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 737,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: [
            "Próg RAM: ",
            memoryThreshold,
            "MB"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 738,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 736,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
        lineNumber: 715,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
      lineNumber: 627,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3", children: /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap items-center gap-2 w-full lg:w-auto", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "relative flex-1 sm:w-64", children: [
          /* @__PURE__ */ jsxDEV(Search, { className: "w-4 h-4 absolute left-3 top-2.5 text-slate-500" }, void 0, false, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 749,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "text",
              placeholder: "Szukaj po PID, nazwie, oknie...",
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value),
              className: "w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-mono"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 750,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 748,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setFilterMode("all"),
              className: `px-2.5 py-1 rounded font-medium transition-all ${filterMode === "all" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white"}`,
              children: [
                "Wszystkie (",
                processes.length,
                ")"
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 760,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setFilterMode("rogue_only"),
              className: `px-2.5 py-1 rounded font-medium transition-all ${filterMode === "rogue_only" ? "bg-red-600 text-white" : "text-slate-400 hover:text-white"}`,
              children: [
                "Zagrożenia (",
                processes.filter((p) => p.isRogue || p.isTopMost).length,
                ")"
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 768,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setFilterMode("high_resource"),
              className: `px-2.5 py-1 rounded font-medium transition-all ${filterMode === "high_resource" ? "bg-amber-600 text-slate-950 font-bold" : "text-slate-400 hover:text-white"}`,
              children: [
                "Wysokie Zasoby (",
                processes.filter((p) => (p.cpuPercent || 0) > cpuThreshold || (p.memoryMb || 0) > memoryThreshold).length,
                ")"
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 776,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 759,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
        lineNumber: 747,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 text-xs", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Częstotliwość:" }, void 0, false, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 790,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "select",
            {
              value: pollInterval,
              onChange: (e) => setPollInterval(Number(e.target.value)),
              className: "bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-200 text-xs font-mono",
              children: [
                /* @__PURE__ */ jsxDEV("option", { value: 500, children: "500 ms (Real-Time)" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                  lineNumber: 796,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: 1e3, children: "1000 ms (Standard)" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                  lineNumber: 797,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: 2e3, children: "2000 ms (Oszczędny)" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                  lineNumber: 798,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 791,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 789,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 text-xs", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Reakcja Watchdoga:" }, void 0, false, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 803,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "select",
            {
              value: autoAction,
              onChange: (e) => setAutoAction(e.target.value),
              className: "bg-slate-950 border border-slate-800 rounded px-2 py-1 text-purple-300 font-bold text-xs font-mono",
              children: [
                /* @__PURE__ */ jsxDEV("option", { value: "auto_suspend", children: "NtSuspendProcess (Zamroź RAM)" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                  lineNumber: 809,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: "auto_kill", children: "TerminateProcess (Zabij natychmiast)" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                  lineNumber: 810,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: "auto_throttle", children: "Throttle (Obniż priorytet do IDLE)" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                  lineNumber: 811,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: "alert_only", children: "Tylko Powiadomienie (Alert)" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                  lineNumber: 812,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 804,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 802,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
        lineNumber: 788,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
      lineNumber: 745,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
      lineNumber: 744,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4", children: filteredProcesses.map((proc) => {
      const isOverloadedCpu = (proc.cpuPercent || 0) > cpuThreshold;
      const isOverloadedMem = (proc.memoryMb || 0) > memoryThreshold;
      const isRunning = proc.status === "running";
      return /* @__PURE__ */ jsxDEV(
        "div",
        {
          className: `rounded-xl border p-4 transition-all duration-200 flex flex-col justify-between shadow-lg ${proc.status === "pe_corrupted" ? "bg-rose-950/40 border-rose-600/60 text-rose-300" : proc.status === "quarantined" ? "bg-purple-950/40 border-purple-800/60 text-purple-300" : proc.status === "terminated" ? "bg-slate-950/60 border-slate-800 opacity-50" : proc.isRogue || proc.isTopMost ? "bg-red-950/30 border-red-800/80" : proc.isParentDropper ? "bg-amber-950/30 border-amber-800/80" : "bg-slate-900/90 border-slate-800"}`,
          children: [
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-start justify-between gap-2 pb-3 border-b border-slate-800/80", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "truncate", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "font-mono font-bold text-sm text-white truncate", children: proc.name }, void 0, false, {
                      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                      lineNumber: 848,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400 font-mono bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800", children: [
                      "PID: ",
                      proc.pid
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                      lineNumber: 849,
                      columnNumber: 23
                    }, this),
                    proc.ppid ? /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400 font-mono bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800", children: [
                      "PPID: ",
                      proc.ppid
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                      lineNumber: 853,
                      columnNumber: 25
                    }, this) : null
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                    lineNumber: 847,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400 truncate mt-0.5", children: proc.windowTitle || proc.filePath }, void 0, false, {
                    fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                    lineNumber: 858,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                  lineNumber: 846,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "span",
                  {
                    className: `px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase flex-shrink-0 ${proc.status === "pe_corrupted" ? "bg-rose-900 text-rose-200 border border-rose-600" : proc.status === "quarantined" ? "bg-purple-900 text-purple-200 border border-purple-600" : proc.status === "terminated" ? "bg-slate-800 text-slate-400" : proc.isTopMost ? "bg-red-900 text-red-200 border border-red-700 animate-pulse" : proc.isParentDropper ? "bg-amber-900 text-amber-200 border border-amber-700" : "bg-emerald-950 text-emerald-300 border border-emerald-800"}`,
                    children: proc.status === "pe_corrupted" ? "💥 PE 0xC000007B" : proc.status === "quarantined" ? "ZAMROŻONY W RAM" : proc.status === "terminated" ? "ZABITY" : proc.isTopMost ? "TOPMOST OVERLAY" : proc.isParentDropper ? "PARENT DROPPER" : "NORMALNY"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                    lineNumber: 864,
                    columnNumber: 19
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 845,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-3 my-3", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 space-y-1.5", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-xs", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxDEV(Cpu, { className: "w-3.5 h-3.5 text-purple-400" }, void 0, false, {
                        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                        lineNumber: 899,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { children: "Zużycie CPU:" }, void 0, false, {
                        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                        lineNumber: 900,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                      lineNumber: 898,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: `font-mono font-bold ${isOverloadedCpu ? "text-red-400 animate-pulse" : "text-white"}`, children: [
                      proc.cpuPercent || 0,
                      "%"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                      lineNumber: 902,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                    lineNumber: 897,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between gap-2", children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex-1 bg-slate-900 h-2 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxDEV(
                      "div",
                      {
                        className: `h-full transition-all duration-300 ${isOverloadedCpu ? "bg-red-500" : "bg-purple-500"}`,
                        style: { width: `${Math.min((proc.cpuPercent || 0) * 1.5, 100)}%` }
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                        lineNumber: 910,
                        columnNumber: 25
                      },
                      this
                    ) }, void 0, false, {
                      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                      lineNumber: 909,
                      columnNumber: 23
                    }, this),
                    renderSparkline(proc.cpuHistory, isOverloadedCpu ? "#ef4444" : "#a855f7")
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                    lineNumber: 908,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                  lineNumber: 896,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 space-y-1.5", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-xs", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxDEV(HardDrive, { className: "w-3.5 h-3.5 text-pink-400" }, void 0, false, {
                        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                        lineNumber: 925,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { children: "Pamięć RAM:" }, void 0, false, {
                        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                        lineNumber: 926,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                      lineNumber: 924,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: `font-mono font-bold ${isOverloadedMem ? "text-amber-400" : "text-white"}`, children: [
                      proc.memoryMb || 0,
                      " MB"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                      lineNumber: 928,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                    lineNumber: 923,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between gap-2", children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex-1 bg-slate-900 h-2 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxDEV(
                      "div",
                      {
                        className: "h-full bg-gradient-to-r from-pink-600 to-purple-500 transition-all duration-300",
                        style: { width: `${Math.min((proc.memoryMb || 0) / 400 * 100, 100)}%` }
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                        lineNumber: 935,
                        columnNumber: 25
                      },
                      this
                    ) }, void 0, false, {
                      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                      lineNumber: 934,
                      columnNumber: 23
                    }, this),
                    renderSparkline(proc.memoryHistory, "#ec4899")
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                    lineNumber: 933,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                  lineNumber: 922,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 894,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-4 gap-2 text-[10px] font-mono text-slate-400 bg-slate-950/60 p-2 rounded-lg border border-slate-800/60 mb-3 text-center", children: [
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "block text-slate-500", children: "Wątki" }, void 0, false, {
                    fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                    lineNumber: 948,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-200 font-bold", children: proc.threadsCount || 1 }, void 0, false, {
                    fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                    lineNumber: 949,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                  lineNumber: 947,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "block text-slate-500", children: "Uchwyty" }, void 0, false, {
                    fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                    lineNumber: 952,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-200 font-bold", children: proc.handlesCount || 20 }, void 0, false, {
                    fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                    lineNumber: 953,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                  lineNumber: 951,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "block text-slate-500", children: "I/O Rate" }, void 0, false, {
                    fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                    lineNumber: 956,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-200 font-bold", children: [
                    proc.ioRateKb || 0,
                    " KB/s"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                    lineNumber: 957,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                  lineNumber: 955,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "block text-slate-500", children: "Priorytet" }, void 0, false, {
                    fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                    lineNumber: 960,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: `font-bold ${proc.priorityClass === "HIGH" ? "text-red-400" : proc.priorityClass === "IDLE" ? "text-cyan-400" : "text-slate-300"}`, children: proc.priorityClass || "NORMAL" }, void 0, false, {
                    fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                    lineNumber: 961,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                  lineNumber: 959,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 946,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 843,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => setSelectedProcessForDetails(proc),
                  className: "text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 font-mono font-medium",
                  children: [
                    /* @__PURE__ */ jsxDEV(Info, { className: "w-3.5 h-3.5" }, void 0, false, {
                      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                      lineNumber: 974,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "Inspekcja Pamięci" }, void 0, false, {
                      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                      lineNumber: 975,
                      columnNumber: 19
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                  lineNumber: 970,
                  columnNumber: 17
                },
                this
              ),
              isRunning && /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-1.5", children: [
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => handleThrottleProcess(proc.pid),
                    className: "px-2 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded text-[10px] font-mono border border-slate-700 transition-all flex items-center gap-1",
                    title: "Ogranicz priorytet procesora do IDLE_PRIORITY_CLASS",
                    children: /* @__PURE__ */ jsxDEV("span", { children: "Throttle" }, void 0, false, {
                      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                      lineNumber: 986,
                      columnNumber: 23
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                    lineNumber: 981,
                    columnNumber: 21
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => handleSuspendProcess(proc.pid),
                    className: "px-2 py-1 bg-purple-900/60 hover:bg-purple-800 text-purple-200 rounded text-[10px] font-mono border border-purple-700 transition-all flex items-center gap-1",
                    title: "Zamroź wszystkie wątki w RAM za pomocą NtSuspendProcess",
                    children: [
                      /* @__PURE__ */ jsxDEV(Lock, { className: "w-3 h-3 text-purple-300" }, void 0, false, {
                        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                        lineNumber: 995,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { children: "Zamroź RAM" }, void 0, false, {
                        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                        lineNumber: 996,
                        columnNumber: 23
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                    lineNumber: 990,
                    columnNumber: 21
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => handleSabotagePE(proc.pid),
                    className: "px-2 py-1 bg-rose-950 hover:bg-rose-800 text-rose-200 rounded text-[10px] font-mono border border-rose-700 transition-all flex items-center gap-1",
                    title: "Zniszcz nagłówek PE i odetnij DACL",
                    children: [
                      /* @__PURE__ */ jsxDEV(Skull, { className: "w-3 h-3 text-pink-400" }, void 0, false, {
                        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                        lineNumber: 1005,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { children: "PE Sabotaż" }, void 0, false, {
                        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                        lineNumber: 1006,
                        columnNumber: 23
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                    lineNumber: 1e3,
                    columnNumber: 21
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => handleKillProcess(proc.pid),
                    className: "px-2.5 py-1 bg-red-700 hover:bg-red-600 text-white rounded text-[10px] font-mono font-bold transition-all shadow",
                    children: "Zabij"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                    lineNumber: 1010,
                    columnNumber: 21
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 979,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 969,
              columnNumber: 15
            }, this)
          ]
        },
        proc.pid,
        true,
        {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 827,
          columnNumber: 13
        },
        this
      );
    }) }, void 0, false, {
      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
      lineNumber: 820,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-2 border-b border-slate-800", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-semibold text-slate-300 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(Terminal, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1028,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Dziennik Zdarzeń Strażnika Watchdog (Kernel & Process Log)" }, void 0, false, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1029,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 1027,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-emerald-400 font-mono flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-emerald-400 animate-ping" }, void 0, false, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1032,
            columnNumber: 13
          }, this),
          "STREAMING AKTUALIZACJI"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 1031,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
        lineNumber: 1026,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950 p-3 rounded-lg border border-slate-800 text-[11px] font-mono space-y-1 h-36 overflow-y-auto", children: watchdogLogs.map((log, idx) => /* @__PURE__ */ jsxDEV(
        "div",
        {
          className: log.includes("TRIGGER") || log.includes("ALARM") || log.includes("SPAWN") ? "text-red-400 font-bold" : log.includes("FREEZE") || log.includes("SUKCES") || log.includes("EXPORT") ? "text-emerald-400" : log.includes("THROTTLE") || log.includes("ALERT") ? "text-amber-300" : "text-slate-400",
          children: log
        },
        idx,
        false,
        {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 1039,
          columnNumber: 13
        },
        this
      )) }, void 0, false, {
        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
        lineNumber: 1037,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
      lineNumber: 1025,
      columnNumber: 7
    }, this),
    selectedProcessForDetails && /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-3 border-b border-slate-800", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-lg bg-purple-600/20 border border-purple-500/30 text-purple-300", children: /* @__PURE__ */ jsxDEV(HardDrive, { className: "w-5 h-5" }, void 0, false, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1064,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1063,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-bold text-white font-mono", children: [
              selectedProcessForDetails.name,
              " (PID: ",
              selectedProcessForDetails.pid,
              ")"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1067,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400", children: "Inspekcja pamięci RAM, modułów DLL i struktury nagłówka PE" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1070,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1066,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 1062,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setSelectedProcessForDetails(null),
            className: "px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-mono",
            children: "Zamknij [ESC]"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1076,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
        lineNumber: 1061,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-3 gap-3 text-xs font-mono bg-slate-950 p-3 rounded-xl border border-slate-800", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 block", children: "Working Set RAM:" }, void 0, false, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1087,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-white font-bold text-sm", children: [
            selectedProcessForDetails.memoryMb,
            " MB"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1088,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 1086,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 block", children: "Obciążenie CPU:" }, void 0, false, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1091,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-purple-400 font-bold text-sm", children: [
            selectedProcessForDetails.cpuPercent,
            "%"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1092,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 1090,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 block", children: "Stan procesu:" }, void 0, false, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1095,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-bold text-sm", children: selectedProcessForDetails.status.toUpperCase() }, void 0, false, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1096,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 1094,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
        lineNumber: 1085,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider block", children: "Załadowane Moduły i Biblioteki DLL w Pamięci:" }, void 0, false, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 1102,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5 text-[11px] font-mono bg-slate-950 p-3 rounded-xl border border-slate-800", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center py-0.5 border-b border-slate-900", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-300", children: "C:\\Windows\\System32\\ntdll.dll" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1107,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "Base: 0x7FFF6A100000" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1108,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1106,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center py-0.5 border-b border-slate-900", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-300", children: "C:\\Windows\\System32\\kernel32.dll" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1111,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "Base: 0x7FFF69800000" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1112,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1110,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center py-0.5 border-b border-slate-900", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-300", children: "C:\\Windows\\System32\\user32.dll" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1115,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "Base: 0x7FFF69D00000" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1116,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1114,
            columnNumber: 17
          }, this),
          selectedProcessForDetails.hasFlutterDll && /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center py-0.5 bg-red-950/40 px-1 rounded border border-red-800/40", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-red-300 font-bold", children: "flutter_windows.dll (Flutter Engine)" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1120,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-red-400 font-bold", children: "WYKRYTO NAKŁADKĘ" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1121,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1119,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 1105,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
        lineNumber: 1101,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider block", children: "Podgląd Nagłówka PE (DOS & NT Header Offset 0x00 - 0x40):" }, void 0, false, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 1129,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300", children: selectedProcessForDetails.status === "pe_corrupted" ? /* @__PURE__ */ jsxDEV("div", { className: "text-rose-400 space-y-1", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            "0x00000000: ",
            /* @__PURE__ */ jsxDEV("strong", { className: "bg-rose-900 px-1 text-white", children: "DE AD" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1135,
              columnNumber: 38
            }, this),
            " 00 00 00 00 00 00 00 00 00 00 00 00 00 00  [..SABOTAGED..]"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1135,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            "0x0000003C: ",
            /* @__PURE__ */ jsxDEV("strong", { className: "bg-rose-900 px-1 text-white", children: "00 00 00 00" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1136,
              columnNumber: 38
            }, this),
            " (e_lfanew nullified → PE Loader Reject 0xC000007B)"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1136,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 1134,
          columnNumber: 19
        }, this) : /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 text-emerald-400", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            "0x00000000: ",
            /* @__PURE__ */ jsxDEV("strong", { className: "text-white bg-emerald-950 px-1", children: "4D 5A" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1140,
              columnNumber: 38
            }, this),
            " 90 00 03 00 00 00 04 00 00 00 FF FF 00 00  [MZ..............]"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1140,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            "0x0000003C: ",
            /* @__PURE__ */ jsxDEV("strong", { className: "text-white bg-emerald-950 px-1", children: "E8 00 00 00" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1141,
              columnNumber: 38
            }, this),
            " (e_lfanew pointer to NT Headers 'PE\\0\\0')"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1141,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 1139,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 1132,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
        lineNumber: 1128,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "pt-3 border-t border-slate-800 flex justify-end space-x-2", children: /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setSelectedProcessForDetails(null),
          className: "px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold",
          children: "Zamknij"
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 1149,
          columnNumber: 15
        },
        this
      ) }, void 0, false, {
        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
        lineNumber: 1148,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
      lineNumber: 1060,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
      lineNumber: 1059,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
    lineNumber: 559,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlByb2Nlc3NXYXRjaGRvZy50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFxuICBBY3Rpdml0eSwgQ3B1LCBIYXJkRHJpdmUsIFNoaWVsZEFsZXJ0LCBaYXAsIEFsZXJ0VHJpYW5nbGUsIFBsYXksIFBhdXNlLCBcbiAgUmVmcmVzaEN3LCBMb2NrLCBTa3VsbCwgQmFuLCBGbGFtZSwgR2F1Z2UsIEFycm93VXBSaWdodCwgVHJlbmRpbmdVcCwgXG4gIFRlcm1pbmFsLCBMYXllcnMsIENoZWNrQ2lyY2xlMiwgQ2hldnJvblJpZ2h0LCBEb3dubG9hZCwgRmlsdGVyLCBTZWFyY2gsXG4gIFNsaWRlcnMsIEJlbGwsIFNsaWRlcnNIb3Jpem9udGFsLCBJbmZvLCBDbG9jaywgU2VydmVyLCBGaWxlQ29kZTIsIFNub3dmbGFrZVxufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgU2ltdWxhdGVkUHJvY2VzcyB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGRvd25sb2FkRmlsZSB9IGZyb20gJy4uL3V0aWxzL29mZmxpbmVQYWNrYWdlRXhwb3J0ZXInO1xuaW1wb3J0IHsgQ3B1VGhlcm1hbEdvdmVybm9yUGFuZWwgfSBmcm9tICcuL0NwdVRoZXJtYWxHb3Zlcm5vclBhbmVsJztcblxuaW50ZXJmYWNlIFByb2Nlc3NXYXRjaGRvZ1Byb3BzIHtcbiAgaW5pdGlhbFByb2Nlc3Nlcz86IFNpbXVsYXRlZFByb2Nlc3NbXTtcbn1cblxuZXhwb3J0IGNvbnN0IFByb2Nlc3NXYXRjaGRvZzogUmVhY3QuRkM8UHJvY2Vzc1dhdGNoZG9nUHJvcHM+ID0gKHsgaW5pdGlhbFByb2Nlc3NlcyB9KSA9PiB7XG4gIC8vIEluaXRpYWwgcmljaCBwcm9jZXNzZXMgd2l0aCBDUFUsIE1lbW9yeSwgVGhyZWFkcyBhbmQgSGlzdG9yeVxuICBjb25zdCBbcHJvY2Vzc2VzLCBzZXRQcm9jZXNzZXNdID0gdXNlU3RhdGU8U2ltdWxhdGVkUHJvY2Vzc1tdPigoKSA9PiB7XG4gICAgaWYgKGluaXRpYWxQcm9jZXNzZXMgJiYgaW5pdGlhbFByb2Nlc3Nlcy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gaW5pdGlhbFByb2Nlc3Nlcy5tYXAoKHApID0+ICh7XG4gICAgICAgIC4uLnAsXG4gICAgICAgIGNwdVBlcmNlbnQ6IHAuY3B1UGVyY2VudCA/PyAocC5pc1RvcE1vc3QgPyAzNC44IDogcC5pc1BhcmVudERyb3BwZXIgPyAxMi40IDogMS4yKSxcbiAgICAgICAgbWVtb3J5TWI6IHAubWVtb3J5TWIgPz8gKHAuaXNUb3BNb3N0ID8gMjE4LjQgOiBwLmlzUGFyZW50RHJvcHBlciA/IDQ1LjIgOiAxMTAuNSksXG4gICAgICAgIHRocmVhZHNDb3VudDogcC50aHJlYWRzQ291bnQgPz8gKHAuaXNUb3BNb3N0ID8gMTggOiBwLmlzUGFyZW50RHJvcHBlciA/IDYgOiAyNCksXG4gICAgICAgIGhhbmRsZXNDb3VudDogcC5oYW5kbGVzQ291bnQgPz8gKHAuaXNUb3BNb3N0ID8gMzQwIDogcC5pc1BhcmVudERyb3BwZXIgPyA5NSA6IDUxMiksXG4gICAgICAgIGlvUmF0ZUtiOiBwLmlvUmF0ZUtiID8/IChwLmlzVG9wTW9zdCA/IDE0Mi41IDogcC5pc1BhcmVudERyb3BwZXIgPyAxOC4yIDogNC4xKSxcbiAgICAgICAgcHJpb3JpdHlDbGFzczogcC5wcmlvcml0eUNsYXNzID8/IChwLmlzVG9wTW9zdCA/ICdISUdIJyA6ICdOT1JNQUwnKSxcbiAgICAgICAgY3B1SGlzdG9yeTogcC5jcHVIaXN0b3J5ID8/IFsxNSwgMjIsIDI4LCAzMCwgMzUsIDM0LjhdLFxuICAgICAgICBtZW1vcnlIaXN0b3J5OiBwLm1lbW9yeUhpc3RvcnkgPz8gWzE4MCwgMTk1LCAyMDUsIDIxMiwgMjE1LCAyMTguNF0sXG4gICAgICB9KSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtcbiAgICAgIHtcbiAgICAgICAgcGlkOiAxMDQ0LFxuICAgICAgICBwcGlkOiAwLFxuICAgICAgICBuYW1lOiAnZXhwbG9yZXIuZXhlJyxcbiAgICAgICAgd2luZG93VGl0bGU6ICdFa3NwbG9yYXRvciBXaW5kb3dzJyxcbiAgICAgICAgaXNUb3BNb3N0OiBmYWxzZSxcbiAgICAgICAgaXNGdWxsc2NyZWVuOiBmYWxzZSxcbiAgICAgICAgaGFzRmx1dHRlckRsbDogZmFsc2UsXG4gICAgICAgIHdpZHRoOiAxMDI0LFxuICAgICAgICBoZWlnaHQ6IDcwMCxcbiAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgaXNCbG9ja2VkOiBmYWxzZSxcbiAgICAgICAgc3RhdHVzOiAncnVubmluZycsXG4gICAgICAgIGZpbGVQYXRoOiAnQzpcXFxcV2luZG93c1xcXFxleHBsb3Jlci5leGUnLFxuICAgICAgICBpc1JvZ3VlOiBmYWxzZSxcbiAgICAgICAgY3B1UGVyY2VudDogMS44LFxuICAgICAgICBtZW1vcnlNYjogMTQyLjAsXG4gICAgICAgIHRocmVhZHNDb3VudDogNDIsXG4gICAgICAgIGhhbmRsZXNDb3VudDogMTI1MCxcbiAgICAgICAgaW9SYXRlS2I6IDguNSxcbiAgICAgICAgcHJpb3JpdHlDbGFzczogJ05PUk1BTCcsXG4gICAgICAgIGNwdUhpc3Rvcnk6IFsyLjEsIDEuOSwgMi41LCAxLjgsIDEuNywgMS44XSxcbiAgICAgICAgbWVtb3J5SGlzdG9yeTogWzE0MCwgMTQxLCAxNDEuNSwgMTQyLCAxNDIsIDE0Ml0sXG4gICAgICAgIHdpbmRvd3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBod25kOiAnMHgwMDAxMDA0QScsXG4gICAgICAgICAgICB0aXRsZTogJ1Bhc2VrIFphZGHFhCBXaW5kb3dzICYgUHVscGl0JyxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ1NoZWxsX1RyYXlXbmQnLFxuICAgICAgICAgICAgaXNUb3BNb3N0OiBmYWxzZSxcbiAgICAgICAgICAgIGlzRnVsbHNjcmVlbjogZmFsc2UsXG4gICAgICAgICAgICBpc0xheWVyZWQ6IGZhbHNlLFxuICAgICAgICAgICAgYm91bmRzOiB7IHdpZHRoOiAxOTIwLCBoZWlnaHQ6IDQ4IH0sXG4gICAgICAgICAgICB6T3JkZXI6IDAsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBpZDogNDgyMCxcbiAgICAgICAgcHBpZDogMTA0NCxcbiAgICAgICAgbmFtZTogJ2Nocm9tZS5leGUnLFxuICAgICAgICB3aW5kb3dUaXRsZTogJ0dvb2dsZSBDaHJvbWUgLSBTdGFjayBPdmVyZmxvdycsXG4gICAgICAgIGlzVG9wTW9zdDogZmFsc2UsXG4gICAgICAgIGlzRnVsbHNjcmVlbjogZmFsc2UsXG4gICAgICAgIGhhc0ZsdXR0ZXJEbGw6IGZhbHNlLFxuICAgICAgICB3aWR0aDogMTI4MCxcbiAgICAgICAgaGVpZ2h0OiA4MDAsXG4gICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgIGlzQmxvY2tlZDogZmFsc2UsXG4gICAgICAgIHN0YXR1czogJ3J1bm5pbmcnLFxuICAgICAgICBmaWxlUGF0aDogJ0M6XFxcXFByb2dyYW0gRmlsZXNcXFxcR29vZ2xlXFxcXENocm9tZVxcXFxBcHBsaWNhdGlvblxcXFxjaHJvbWUuZXhlJyxcbiAgICAgICAgaXNSb2d1ZTogZmFsc2UsXG4gICAgICAgIGNwdVBlcmNlbnQ6IDQuMixcbiAgICAgICAgbWVtb3J5TWI6IDMyMC41LFxuICAgICAgICB0aHJlYWRzQ291bnQ6IDM2LFxuICAgICAgICBoYW5kbGVzQ291bnQ6IDg5MCxcbiAgICAgICAgaW9SYXRlS2I6IDI0LjEsXG4gICAgICAgIHByaW9yaXR5Q2xhc3M6ICdOT1JNQUwnLFxuICAgICAgICBjcHVIaXN0b3J5OiBbMy44LCA1LjEsIDQuNSwgNi4yLCA0LjAsIDQuMl0sXG4gICAgICAgIG1lbW9yeUhpc3Rvcnk6IFszMTAsIDMxMiwgMzE1LCAzMTgsIDMyMCwgMzIwLjVdLFxuICAgICAgICB3aW5kb3dzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgaHduZDogJzB4MDAwNDVBMTInLFxuICAgICAgICAgICAgdGl0bGU6ICdHb29nbGUgQ2hyb21lIC0gU3RhY2sgT3ZlcmZsb3cnLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAnQ2hyb21lX1dpZGdldFdpbl8xJyxcbiAgICAgICAgICAgIGlzVG9wTW9zdDogZmFsc2UsXG4gICAgICAgICAgICBpc0Z1bGxzY3JlZW46IGZhbHNlLFxuICAgICAgICAgICAgaXNMYXllcmVkOiBmYWxzZSxcbiAgICAgICAgICAgIGJvdW5kczogeyB3aWR0aDogMTI4MCwgaGVpZ2h0OiA4MDAgfSxcbiAgICAgICAgICAgIHpPcmRlcjogMSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGlkOiAzODQwLFxuICAgICAgICBwcGlkOiAxMDQ0LFxuICAgICAgICBuYW1lOiAnZHJvcHBlcl93YXRjaGRvZy5leGUnLFxuICAgICAgICB3aW5kb3dUaXRsZTogJ0JhY2tncm91bmQgV2F0Y2hkb2cgU2VydmljZSAoSGlkZGVuIERyb3BwZXIpJyxcbiAgICAgICAgaXNUb3BNb3N0OiBmYWxzZSxcbiAgICAgICAgaXNGdWxsc2NyZWVuOiBmYWxzZSxcbiAgICAgICAgaGFzRmx1dHRlckRsbDogZmFsc2UsXG4gICAgICAgIHdpZHRoOiAwLFxuICAgICAgICBoZWlnaHQ6IDAsXG4gICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgIGlzQmxvY2tlZDogdHJ1ZSxcbiAgICAgICAgc3RhdHVzOiAncnVubmluZycsXG4gICAgICAgIGZpbGVQYXRoOiAnQzpcXFxcVXNlcnNcXFxcVXNlclxcXFxBcHBEYXRhXFxcXExvY2FsXFxcXFRlbXBcXFxcZHJvcHBlcl93YXRjaGRvZy5leGUnLFxuICAgICAgICBpc1BhcmVudERyb3BwZXI6IHRydWUsXG4gICAgICAgIGlzUm9ndWU6IHRydWUsXG4gICAgICAgIGNwdVBlcmNlbnQ6IDE0LjYsXG4gICAgICAgIG1lbW9yeU1iOiA1OC4yLFxuICAgICAgICB0aHJlYWRzQ291bnQ6IDgsXG4gICAgICAgIGhhbmRsZXNDb3VudDogMTQ1LFxuICAgICAgICBpb1JhdGVLYjogNjUuNCxcbiAgICAgICAgcHJpb3JpdHlDbGFzczogJ05PUk1BTCcsXG4gICAgICAgIGNwdUhpc3Rvcnk6IFsxMCwgMTIsIDE4LCAxNCwgMTUsIDE0LjZdLFxuICAgICAgICBtZW1vcnlIaXN0b3J5OiBbNDUsIDQ4LCA1MiwgNTUsIDU3LCA1OC4yXSxcbiAgICAgICAgd2luZG93czogW10sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwaWQ6IDg5MzIsXG4gICAgICAgIHBwaWQ6IDM4NDAsXG4gICAgICAgIG5hbWU6ICdmbHV0dGVyX3J1bm5lci5leGUnLFxuICAgICAgICB3aW5kb3dUaXRsZTogJ0ZsdXR0ZXIgRnVsbHNjcmVlbiBMb2Nrc2NyZWVuIE92ZXJsYXkgW1dTX0VYX1RPUE1PU1RdJyxcbiAgICAgICAgaXNUb3BNb3N0OiB0cnVlLFxuICAgICAgICBpc0Z1bGxzY3JlZW46IHRydWUsXG4gICAgICAgIGhhc0ZsdXR0ZXJEbGw6IHRydWUsXG4gICAgICAgIHdpZHRoOiAxOTIwLFxuICAgICAgICBoZWlnaHQ6IDEwODAsXG4gICAgICAgIG9wYWNpdHk6IDAuOTIsXG4gICAgICAgIGlzQmxvY2tlZDogdHJ1ZSxcbiAgICAgICAgc3RhdHVzOiAncnVubmluZycsXG4gICAgICAgIGZpbGVQYXRoOiAnQzpcXFxcVXNlcnNcXFxcVXNlclxcXFxBcHBEYXRhXFxcXExvY2FsXFxcXFRlbXBcXFxcZmx1dHRlcl9ydW5uZXIuZXhlJyxcbiAgICAgICAgaXNSb2d1ZTogdHJ1ZSxcbiAgICAgICAgY3B1UGVyY2VudDogNDguNSxcbiAgICAgICAgbWVtb3J5TWI6IDI2NC44LFxuICAgICAgICB0aHJlYWRzQ291bnQ6IDIyLFxuICAgICAgICBoYW5kbGVzQ291bnQ6IDQ2MCxcbiAgICAgICAgaW9SYXRlS2I6IDIxMC44LFxuICAgICAgICBwcmlvcml0eUNsYXNzOiAnSElHSCcsXG4gICAgICAgIGNwdUhpc3Rvcnk6IFsyNSwgMzgsIDQyLCA1MSwgNDYsIDQ4LjVdLFxuICAgICAgICBtZW1vcnlIaXN0b3J5OiBbMTgwLCAyMTAsIDIzNSwgMjUwLCAyNjAsIDI2NC44XSxcbiAgICAgICAgd2luZG93czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGh3bmQ6ICcweDAwNEYxQTAyJyxcbiAgICAgICAgICAgIHRpdGxlOiAnRmx1dHRlciBGdWxsc2NyZWVuIExvY2tzY3JlZW4gT3ZlcmxheSBbV1NfRVhfVE9QTU9TVF0nLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAnRkxVVFRFUl9SVU5ORVJfV0lORE9XJyxcbiAgICAgICAgICAgIGlzVG9wTW9zdDogdHJ1ZSxcbiAgICAgICAgICAgIGlzRnVsbHNjcmVlbjogdHJ1ZSxcbiAgICAgICAgICAgIGlzTGF5ZXJlZDogZmFsc2UsXG4gICAgICAgICAgICBib3VuZHM6IHsgd2lkdGg6IDE5MjAsIGhlaWdodDogMTA4MCB9LFxuICAgICAgICAgICAgek9yZGVyOiA5OTksXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgXTtcbiAgfSk7XG5cbiAgLy8gV2F0Y2hkb2cgU2V0dGluZ3MgJiBMaXZlIFN0YXRlXG4gIGNvbnN0IFtpc1dhdGNoZG9nQWN0aXZlLCBzZXRJc1dhdGNoZG9nQWN0aXZlXSA9IHVzZVN0YXRlPGJvb2xlYW4+KHRydWUpO1xuICBjb25zdCBbcG9sbEludGVydmFsLCBzZXRQb2xsSW50ZXJ2YWxdID0gdXNlU3RhdGU8bnVtYmVyPigxMDAwKTsgLy8gbXNcbiAgY29uc3QgW2NwdVRocmVzaG9sZCwgc2V0Q3B1VGhyZXNob2xkXSA9IHVzZVN0YXRlPG51bWJlcj4oMzApOyAvLyAlXG4gIGNvbnN0IFttZW1vcnlUaHJlc2hvbGQsIHNldE1lbW9yeVRocmVzaG9sZF0gPSB1c2VTdGF0ZTxudW1iZXI+KDIwMCk7IC8vIE1CXG4gIGNvbnN0IFthdXRvQWN0aW9uLCBzZXRBdXRvQWN0aW9uXSA9IHVzZVN0YXRlPCdhbGVydF9vbmx5JyB8ICdhdXRvX3N1c3BlbmQnIHwgJ2F1dG9fa2lsbCcgfCAnYXV0b190aHJvdHRsZSc+KCdhdXRvX3N1c3BlbmQnKTtcbiAgXG4gIGNvbnN0IFtmaWx0ZXJNb2RlLCBzZXRGaWx0ZXJNb2RlXSA9IHVzZVN0YXRlPCdhbGwnIHwgJ3JvZ3VlX29ubHknIHwgJ2hpZ2hfcmVzb3VyY2UnPignYWxsJyk7XG4gIGNvbnN0IFtzZWFyY2hRdWVyeSwgc2V0U2VhcmNoUXVlcnldID0gdXNlU3RhdGU8c3RyaW5nPignJyk7XG4gIGNvbnN0IFtzZWxlY3RlZFByb2Nlc3NGb3JEZXRhaWxzLCBzZXRTZWxlY3RlZFByb2Nlc3NGb3JEZXRhaWxzXSA9IHVzZVN0YXRlPFNpbXVsYXRlZFByb2Nlc3MgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3Nob3dUaGVybWFsR292ZXJub3IsIHNldFNob3dUaGVybWFsR292ZXJub3JdID0gdXNlU3RhdGU8Ym9vbGVhbj4odHJ1ZSk7XG5cbiAgY29uc3QgW3dhdGNoZG9nTG9ncywgc2V0V2F0Y2hkb2dMb2dzXSA9IHVzZVN0YXRlPHN0cmluZ1tdPihbXG4gICAgJ1sqXSBTdHJhxbxuaWsgemFzb2LDs3cgKFByb2Nlc3MgV2F0Y2hkb2cgRW5naW5lKSB6YWluaWNqYWxpem93YW55IHBvbXnFm2xuaWUuJyxcbiAgICAnWypdIE1vbml0b3Jvd2FuaWUgenXFvHljaWEgQ1BVIChHZXRQcm9jZXNzVGltZXMpIGkgcGFtacSZY2kgUkFNIChLMzJHZXRQcm9jZXNzTWVtb3J5SW5mbykuJyxcbiAgICAnWypdIFJlZ3XFgmEgYXV0b21hdHljem5laiByZWFrY2ppOiBXc3RyenltYW5pZSBwcm9jZXN1IChOdFN1c3BlbmRQcm9jZXNzKSwgZ2R5IENQVSA+IDMwJSBsdWIgUkFNID4gMjAwTUIuJyxcbiAgXSk7XG5cbiAgY29uc3QgYWRkTG9nID0gKG1zZzogc3RyaW5nKSA9PiB7XG4gICAgc2V0V2F0Y2hkb2dMb2dzKChwcmV2KSA9PiBbLi4ucHJldi5zbGljZSgtMjUpLCBgWyR7bmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoKX1dICR7bXNnfWBdKTtcbiAgfTtcblxuICAvLyBMaXZlIE1ldHJpYyBQb2xsZXIgRWZmZWN0XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFpc1dhdGNoZG9nQWN0aXZlKSByZXR1cm47XG5cbiAgICBjb25zdCBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgc2V0UHJvY2Vzc2VzKChwcmV2UHJvY2Vzc2VzKSA9PiB7XG4gICAgICAgIHJldHVybiBwcmV2UHJvY2Vzc2VzLm1hcCgocHJvYykgPT4ge1xuICAgICAgICAgIGlmIChwcm9jLnN0YXR1cyAhPT0gJ3J1bm5pbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAuLi5wcm9jLFxuICAgICAgICAgICAgICBjcHVQZXJjZW50OiAwLFxuICAgICAgICAgICAgICBpb1JhdGVLYjogMCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gR2VuZXJhdGUgZHluYW1pYyByZWFsaXN0aWMgZmx1Y3R1YXRpb25cbiAgICAgICAgICBsZXQgY3B1QmFzZSA9IHByb2MuY3B1UGVyY2VudCB8fCAxO1xuICAgICAgICAgIGxldCBtZW1CYXNlID0gcHJvYy5tZW1vcnlNYiB8fCAxMDA7XG5cbiAgICAgICAgICBpZiAocHJvYy5pc1RvcE1vc3QgfHwgcHJvYy5uYW1lLmluY2x1ZGVzKCdmbHV0dGVyJykpIHtcbiAgICAgICAgICAgIC8vIEhpZ2ggZmx1Y3R1YXRpbmcgbG9hZCBkdWUgdG8gRmx1dHRlciBHUFUvVnN5bmMgcmVuZGVyIGxvb3BcbiAgICAgICAgICAgIGNvbnN0IGRlbHRhQ3B1ID0gKE1hdGgucmFuZG9tKCkgKiAxMiAtIDUuNSk7XG4gICAgICAgICAgICBjcHVCYXNlID0gTWF0aC5tYXgoMTgsIE1hdGgubWluKDg1LCBjcHVCYXNlICsgZGVsdGFDcHUpKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gTWVtb3J5IGxlYWtpbmcgdGVuZGVuY3kgZm9yIHJvZ3VlIG92ZXJsYXlzXG4gICAgICAgICAgICBjb25zdCBkZWx0YU1lbSA9IChNYXRoLnJhbmRvbSgpICogMi41IC0gMC40KTtcbiAgICAgICAgICAgIG1lbUJhc2UgPSBNYXRoLm1heCgxNTAsIE1hdGgubWluKDQ4MCwgbWVtQmFzZSArIGRlbHRhTWVtKSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChwcm9jLmlzUGFyZW50RHJvcHBlcikge1xuICAgICAgICAgICAgLy8gUGVyaW9kaWMgc3Bpa2Ugd2hlbiBjb21tdW5pY2F0aW5nIG9yIGNoZWNraW5nIGNoaWxkXG4gICAgICAgICAgICBjb25zdCBzcGlrZSA9IE1hdGgucmFuZG9tKCkgPiAwLjcgPyAxMiA6IC0zO1xuICAgICAgICAgICAgY3B1QmFzZSA9IE1hdGgubWF4KDIsIE1hdGgubWluKDMwLCBjcHVCYXNlICsgc3Bpa2UpKTtcbiAgICAgICAgICAgIG1lbUJhc2UgPSBNYXRoLm1heCgzMCwgTWF0aC5taW4oOTAsIG1lbUJhc2UgKyAoTWF0aC5yYW5kb20oKSAqIDAuOCAtIDAuMykpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gTm9ybWFsIHByb2Nlc3MgZmx1Y3R1YXRpb25cbiAgICAgICAgICAgIGNvbnN0IGRlbHRhID0gKE1hdGgucmFuZG9tKCkgKiAyIC0gMSk7XG4gICAgICAgICAgICBjcHVCYXNlID0gTWF0aC5tYXgoMC41LCBNYXRoLm1pbigxNSwgY3B1QmFzZSArIGRlbHRhKSk7XG4gICAgICAgICAgICBtZW1CYXNlID0gTWF0aC5tYXgoODAsIE1hdGgubWluKDQ1MCwgbWVtQmFzZSArIChNYXRoLnJhbmRvbSgpICogMC40IC0gMC4yKSkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGN1cnJlbnRDcHUgPSBwYXJzZUZsb2F0KGNwdUJhc2UudG9GaXhlZCgxKSk7XG4gICAgICAgICAgY29uc3QgY3VycmVudE1lbSA9IHBhcnNlRmxvYXQobWVtQmFzZS50b0ZpeGVkKDEpKTtcblxuICAgICAgICAgIC8vIEFwcGVuZCB0byBoaXN0b3J5IChrZWVwIDEwIGRhdGEgcG9pbnRzKVxuICAgICAgICAgIGNvbnN0IG5ld0NwdUhpc3QgPSBbLi4uKHByb2MuY3B1SGlzdG9yeSB8fCBbXSkuc2xpY2UoLTkpLCBjdXJyZW50Q3B1XTtcbiAgICAgICAgICBjb25zdCBuZXdNZW1IaXN0ID0gWy4uLihwcm9jLm1lbW9yeUhpc3RvcnkgfHwgW10pLnNsaWNlKC05KSwgY3VycmVudE1lbV07XG5cbiAgICAgICAgICAvLyBDaGVjayBXYXRjaGRvZyB0aHJlc2hvbGQgdmlvbGF0aW9uc1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIChjdXJyZW50Q3B1ID49IGNwdVRocmVzaG9sZCB8fCBjdXJyZW50TWVtID49IG1lbW9yeVRocmVzaG9sZCkgJiZcbiAgICAgICAgICAgIChwcm9jLmlzUm9ndWUgfHwgcHJvYy5pc1RvcE1vc3QgfHwgcHJvYy5oYXNGbHV0dGVyRGxsKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgaWYgKGF1dG9BY3Rpb24gPT09ICdhdXRvX3N1c3BlbmQnKSB7XG4gICAgICAgICAgICAgIGFkZExvZyhg8J+aqCBbV0FUQ0hET0cgVFJJR0dFUl0gUElEICR7cHJvYy5waWR9ICgke3Byb2MubmFtZX0pIHByemVrcm9jennFgiBsaW1pdCAoQ1BVOiAke2N1cnJlbnRDcHV9JSwgUkFNOiAke2N1cnJlbnRNZW19TUIpISBXeXdvxYJhbm8gTnRTdXNwZW5kUHJvY2VzcyFgKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5wcm9jLFxuICAgICAgICAgICAgICAgIHN0YXR1czogJ3F1YXJhbnRpbmVkJyBhcyBjb25zdCxcbiAgICAgICAgICAgICAgICBjcHVQZXJjZW50OiAwLFxuICAgICAgICAgICAgICAgIGNwdUhpc3Rvcnk6IFsuLi5uZXdDcHVIaXN0LnNsaWNlKC05KSwgMF0sXG4gICAgICAgICAgICAgICAgbWVtb3J5SGlzdG9yeTogbmV3TWVtSGlzdCxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXV0b0FjdGlvbiA9PT0gJ2F1dG9fa2lsbCcpIHtcbiAgICAgICAgICAgICAgYWRkTG9nKGDwn5KlIFtXQVRDSERPRyBUUklHR0VSXSBQSUQgJHtwcm9jLnBpZH0gKCR7cHJvYy5uYW1lfSkgcHJ6ZWtyb2N6ecWCIHByw7NnIHphc29iw7N3ISBXeXdvxYJhbm8gVGVybWluYXRlUHJvY2VzcyhQSUQsIDkpIWApO1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnByb2MsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAndGVybWluYXRlZCcgYXMgY29uc3QsXG4gICAgICAgICAgICAgICAgY3B1UGVyY2VudDogMCxcbiAgICAgICAgICAgICAgICBjcHVIaXN0b3J5OiBbLi4ubmV3Q3B1SGlzdC5zbGljZSgtOSksIDBdLFxuICAgICAgICAgICAgICAgIG1lbW9yeUhpc3Rvcnk6IG5ld01lbUhpc3QsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGF1dG9BY3Rpb24gPT09ICdhdXRvX3Rocm90dGxlJykge1xuICAgICAgICAgICAgICBhZGRMb2coYOKaoO+4jyBbV0FUQ0hET0cgVFJJR0dFUl0gUElEICR7cHJvYy5waWR9ICgke3Byb2MubmFtZX0pIG9ncmFuaWN6b25vIHByaW9yeXRldCBDUFUgZG8gSURMRV9QUklPUklUWV9DTEFTUy5gKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5wcm9jLFxuICAgICAgICAgICAgICAgIHByaW9yaXR5Q2xhc3M6ICdJRExFJyBhcyBjb25zdCxcbiAgICAgICAgICAgICAgICBjcHVQZXJjZW50OiBNYXRoLm1pbihjdXJyZW50Q3B1LCA1LjApLFxuICAgICAgICAgICAgICAgIGNwdUhpc3Rvcnk6IG5ld0NwdUhpc3QsXG4gICAgICAgICAgICAgICAgbWVtb3J5SGlzdG9yeTogbmV3TWVtSGlzdCxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGFkZExvZyhg4pqg77iPIFtXQVRDSERPRyBBTEVSVF0gV3lrcnl0byBuYWRtaWVybmUgb2JjacSFxbxlbmllIHcgUElEICR7cHJvYy5waWR9ICgke3Byb2MubmFtZX0pOiBDUFUgJHtjdXJyZW50Q3B1fSUsIFJBTSAke2N1cnJlbnRNZW19TUIuYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnByb2MsXG4gICAgICAgICAgICBjcHVQZXJjZW50OiBjdXJyZW50Q3B1LFxuICAgICAgICAgICAgbWVtb3J5TWI6IGN1cnJlbnRNZW0sXG4gICAgICAgICAgICBjcHVIaXN0b3J5OiBuZXdDcHVIaXN0LFxuICAgICAgICAgICAgbWVtb3J5SGlzdG9yeTogbmV3TWVtSGlzdCxcbiAgICAgICAgICAgIGlvUmF0ZUtiOiBwYXJzZUZsb2F0KChNYXRoLnJhbmRvbSgpICogKHByb2MuaXNUb3BNb3N0ID8gMTUwIDogMjApICsgNSkudG9GaXhlZCgxKSksXG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9LCBwb2xsSW50ZXJ2YWwpO1xuXG4gICAgcmV0dXJuICgpID0+IGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XG4gIH0sIFtpc1dhdGNoZG9nQWN0aXZlLCBwb2xsSW50ZXJ2YWwsIGNwdVRocmVzaG9sZCwgbWVtb3J5VGhyZXNob2xkLCBhdXRvQWN0aW9uXSk7XG5cbiAgLy8gQWdncmVnYXRlIE1ldHJpY3NcbiAgY29uc3QgcnVubmluZ1Byb2Nlc3NlcyA9IHByb2Nlc3Nlcy5maWx0ZXIoKHApID0+IHAuc3RhdHVzID09PSAncnVubmluZycpO1xuICBjb25zdCB0b3RhbENwdSA9IHJ1bm5pbmdQcm9jZXNzZXMucmVkdWNlKChhY2MsIHApID0+IGFjYyArIChwLmNwdVBlcmNlbnQgfHwgMCksIDApO1xuICBjb25zdCB0b3RhbE1lbW9yeSA9IHJ1bm5pbmdQcm9jZXNzZXMucmVkdWNlKChhY2MsIHApID0+IGFjYyArIChwLm1lbW9yeU1iIHx8IDApLCAwKTtcbiAgY29uc3Qgcm9ndWVDcHUgPSBydW5uaW5nUHJvY2Vzc2VzXG4gICAgLmZpbHRlcigocCkgPT4gcC5pc1JvZ3VlIHx8IHAuaXNUb3BNb3N0IHx8IHAuaGFzRmx1dHRlckRsbClcbiAgICAucmVkdWNlKChhY2MsIHApID0+IGFjYyArIChwLmNwdVBlcmNlbnQgfHwgMCksIDApO1xuICBjb25zdCB0b3RhbFRocmVhZHMgPSBydW5uaW5nUHJvY2Vzc2VzLnJlZHVjZSgoYWNjLCBwKSA9PiBhY2MgKyAocC50aHJlYWRzQ291bnQgfHwgMCksIDApO1xuICBjb25zdCBhY3RpdmVBbGVydHMgPSBydW5uaW5nUHJvY2Vzc2VzLmZpbHRlcihcbiAgICAocCkgPT4gKHAuY3B1UGVyY2VudCB8fCAwKSA+IGNwdVRocmVzaG9sZCB8fCAocC5tZW1vcnlNYiB8fCAwKSA+IG1lbW9yeVRocmVzaG9sZFxuICApLmxlbmd0aDtcblxuICAvLyBBY3Rpb25zXG4gIGNvbnN0IGhhbmRsZVN1c3BlbmRQcm9jZXNzID0gKHBpZDogbnVtYmVyKSA9PiB7XG4gICAgc2V0UHJvY2Vzc2VzKChwcmV2KSA9PlxuICAgICAgcHJldi5tYXAoKHApID0+IHtcbiAgICAgICAgaWYgKHAucGlkID09PSBwaWQpIHtcbiAgICAgICAgICBhZGRMb2coYFtNQU5VQUwgRlJFRVpFXSBOdFN1c3BlbmRQcm9jZXNzKFBJRDogJHtwaWR9IC0gJHtwLm5hbWV9KSAtPiBaYW1yb8W8b25vIHfEhXRraSB3IHBhbWnEmWNpIFJBTS5gKTtcbiAgICAgICAgICByZXR1cm4geyAuLi5wLCBzdGF0dXM6ICdxdWFyYW50aW5lZCcgYXMgY29uc3QsIGNwdVBlcmNlbnQ6IDAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcDtcbiAgICAgIH0pXG4gICAgKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVLaWxsUHJvY2VzcyA9IChwaWQ6IG51bWJlcikgPT4ge1xuICAgIHNldFByb2Nlc3NlcygocHJldikgPT5cbiAgICAgIHByZXYubWFwKChwKSA9PiB7XG4gICAgICAgIGlmIChwLnBpZCA9PT0gcGlkKSB7XG4gICAgICAgICAgYWRkTG9nKGBbTUFOVUFMIEtJTExdIFRlcm1pbmF0ZVByb2Nlc3MoUElEOiAke3BpZH0gLSAke3AubmFtZX0pIC0+IFp3b2xuaW9ubyB3c3p5c3RraWUgdWNod3l0eSBpIHBhbWnEmcSHLmApO1xuICAgICAgICAgIHJldHVybiB7IC4uLnAsIHN0YXR1czogJ3Rlcm1pbmF0ZWQnIGFzIGNvbnN0LCBjcHVQZXJjZW50OiAwIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHA7XG4gICAgICB9KVxuICAgICk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlVGhyb3R0bGVQcm9jZXNzID0gKHBpZDogbnVtYmVyKSA9PiB7XG4gICAgc2V0UHJvY2Vzc2VzKChwcmV2KSA9PlxuICAgICAgcHJldi5tYXAoKHApID0+IHtcbiAgICAgICAgaWYgKHAucGlkID09PSBwaWQpIHtcbiAgICAgICAgICBhZGRMb2coYFtUSFJPVFRMRV0gU2V0UHJpb3JpdHlDbGFzcyhQSUQ6ICR7cGlkfSwgSURMRV9QUklPUklUWV9DTEFTUykgLT4gT2JuacW8b25vIHByaW9yeXRldCB3xIV0a8OzdyBkbyBtaW5pbXVtLmApO1xuICAgICAgICAgIHJldHVybiB7IC4uLnAsIHByaW9yaXR5Q2xhc3M6ICdJRExFJyBhcyBjb25zdCwgY3B1UGVyY2VudDogMi4xIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHA7XG4gICAgICB9KVxuICAgICk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU2Fib3RhZ2VQRSA9IChwaWQ6IG51bWJlcikgPT4ge1xuICAgIHNldFByb2Nlc3NlcygocHJldikgPT5cbiAgICAgIHByZXYubWFwKChwKSA9PiB7XG4gICAgICAgIGlmIChwLnBpZCA9PT0gcGlkKSB7XG4gICAgICAgICAgYWRkTG9nKGDwn5KlIFtQRSBTQUJPVEFHRV0gTmFkcGlzYW5vIG5hZ8WCw7N3ZWsgTVogemVyYW1pIGRsYSAke3AubmFtZX0gKFBJRDogJHtwaWR9KSAtPiAweEMwMDAwMDdCIWApO1xuICAgICAgICAgIGFkZExvZyhg8J+UkiBbQUNMIExPQ0tPVVRdIGljYWNscyBcIiR7cC5maWxlUGF0aH1cIiAvZGVueSBFdmVyeW9uZTooRixYKWApO1xuICAgICAgICAgIHJldHVybiB7IC4uLnAsIHN0YXR1czogJ3BlX2NvcnJ1cHRlZCcgYXMgY29uc3QsIGNwdVBlcmNlbnQ6IDAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcDtcbiAgICAgIH0pXG4gICAgKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTcGF3bk92ZXJsb2FkUHJvY2VzcyA9ICgpID0+IHtcbiAgICBjb25zdCBuZXdQaWQgPSBNYXRoLmZsb29yKDcwMDAgKyBNYXRoLnJhbmRvbSgpICogMjAwMCk7XG4gICAgY29uc3QgbmV3UHJvYzogU2ltdWxhdGVkUHJvY2VzcyA9IHtcbiAgICAgIHBpZDogbmV3UGlkLFxuICAgICAgcHBpZDogMzg0MCxcbiAgICAgIG5hbWU6ICdmbHV0dGVyX2NyeXB0b19taW5lcl9vdmVybGF5LmV4ZScsXG4gICAgICB3aW5kb3dUaXRsZTogJ0hhcmR3YXJlIEFjY2VsZXJhdGVkIEZ1bGxzY3JlZW4gTG9jayAoSGlnaCBMb2FkKScsXG4gICAgICBpc1RvcE1vc3Q6IHRydWUsXG4gICAgICBpc0Z1bGxzY3JlZW46IHRydWUsXG4gICAgICBoYXNGbHV0dGVyRGxsOiB0cnVlLFxuICAgICAgd2lkdGg6IDE5MjAsXG4gICAgICBoZWlnaHQ6IDEwODAsXG4gICAgICBvcGFjaXR5OiAwLjk1LFxuICAgICAgaXNCbG9ja2VkOiB0cnVlLFxuICAgICAgc3RhdHVzOiAncnVubmluZycsXG4gICAgICBmaWxlUGF0aDogJ0M6XFxcXFVzZXJzXFxcXFVzZXJcXFxcQXBwRGF0YVxcXFxMb2NhbFxcXFxUZW1wXFxcXGZsdXR0ZXJfY3J5cHRvX21pbmVyX292ZXJsYXkuZXhlJyxcbiAgICAgIGlzUm9ndWU6IHRydWUsXG4gICAgICBjcHVQZXJjZW50OiA2OC40LFxuICAgICAgbWVtb3J5TWI6IDM0MC4yLFxuICAgICAgdGhyZWFkc0NvdW50OiAyOCxcbiAgICAgIGhhbmRsZXNDb3VudDogNjIwLFxuICAgICAgaW9SYXRlS2I6IDQxMi4wLFxuICAgICAgcHJpb3JpdHlDbGFzczogJ0hJR0gnLFxuICAgICAgY3B1SGlzdG9yeTogWzQwLCA1MiwgNjAsIDY1LCA2OCwgNjguNF0sXG4gICAgICBtZW1vcnlIaXN0b3J5OiBbMjUwLCAyODAsIDMxMCwgMzMwLCAzMzUsIDM0MC4yXSxcbiAgICAgIHdpbmRvd3M6IFtcbiAgICAgICAge1xuICAgICAgICAgIGh3bmQ6IGAweDAwJHtNYXRoLmZsb29yKDEwMDAwMCArIE1hdGgucmFuZG9tKCkgKiA4MDAwMDApLnRvU3RyaW5nKDE2KX1gLFxuICAgICAgICAgIHRpdGxlOiAnSGFyZHdhcmUgQWNjZWxlcmF0ZWQgRnVsbHNjcmVlbiBMb2NrJyxcbiAgICAgICAgICBjbGFzc05hbWU6ICdGTFVUVEVSX1NVUkZBQ0VfVklFVycsXG4gICAgICAgICAgaXNUb3BNb3N0OiB0cnVlLFxuICAgICAgICAgIGlzRnVsbHNjcmVlbjogdHJ1ZSxcbiAgICAgICAgICBpc0xheWVyZWQ6IGZhbHNlLFxuICAgICAgICAgIGJvdW5kczogeyB3aWR0aDogMTkyMCwgaGVpZ2h0OiAxMDgwIH0sXG4gICAgICAgICAgek9yZGVyOiA5OTksXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH07XG5cbiAgICBzZXRQcm9jZXNzZXMoKHByZXYpID0+IFsuLi5wcmV2LCBuZXdQcm9jXSk7XG4gICAgYWRkTG9nKGBbU1BBV05dIFVydWNob21pb25vIHByb2NlcyBwcnplY2nEhcW8YWrEhWN5OiAke25ld1Byb2MubmFtZX0gKFBJRDogJHtuZXdQcm9jLnBpZH0pIGdlbmVydWrEhWN5IH42OCUgQ1BVIWApO1xuICB9O1xuXG4gIC8vIEZpbHRlcmVkIExpc3RcbiAgY29uc3QgZmlsdGVyZWRQcm9jZXNzZXMgPSBwcm9jZXNzZXMuZmlsdGVyKChwKSA9PiB7XG4gICAgY29uc3QgbWF0Y2hlc1NlYXJjaCA9IFxuICAgICAgcC5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoUXVlcnkudG9Mb3dlckNhc2UoKSkgfHxcbiAgICAgIHAucGlkLnRvU3RyaW5nKCkuaW5jbHVkZXMoc2VhcmNoUXVlcnkpIHx8XG4gICAgICAocC53aW5kb3dUaXRsZSAmJiBwLndpbmRvd1RpdGxlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoUXVlcnkudG9Mb3dlckNhc2UoKSkpO1xuXG4gICAgaWYgKCFtYXRjaGVzU2VhcmNoKSByZXR1cm4gZmFsc2U7XG5cbiAgICBpZiAoZmlsdGVyTW9kZSA9PT0gJ3JvZ3VlX29ubHknKSB7XG4gICAgICByZXR1cm4gcC5pc1JvZ3VlIHx8IHAuaXNUb3BNb3N0IHx8IHAuaGFzRmx1dHRlckRsbDtcbiAgICB9XG4gICAgaWYgKGZpbHRlck1vZGUgPT09ICdoaWdoX3Jlc291cmNlJykge1xuICAgICAgcmV0dXJuIChwLmNwdVBlcmNlbnQgfHwgMCkgPiBjcHVUaHJlc2hvbGQgfHwgKHAubWVtb3J5TWIgfHwgMCkgPiBtZW1vcnlUaHJlc2hvbGQ7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9KTtcblxuICAvLyBFeHBvcnQgUHl0aG9uIFdhdGNoZG9nIERhZW1vbiBTY3JpcHRcbiAgY29uc3QgZXhwb3J0UHl0aG9uV2F0Y2hkb2dTY3JpcHQgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2NyaXB0Q29kZSA9IGBcIlwiXCJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5QUk9DRVNTIFJFU09VUkNFIFdBVENIRE9HIERBRU1PTiAoMTAwJSBPRkZMSU5FIC8gWkVSTy1ERVBFTkRFTkNZKVxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbkF1dG9tYXR5Y3pueSBzdHJhxbxuaWsgbW9uaXRvcnVqxIVjeSB6dcW8eWNpZSBDUFUgaSBwYW1pxJljaSBSQU0gcHJ6ZXogcHJvY2VzeVxubmFrxYJhZGVrIGVrcmFub3d5Y2ggRmx1dHRlciAvIFRvcE1vc3QuIFcgcHJ6eXBhZGt1IHd5a3J5Y2lhIHByemVjacSFxbxlbmlhXG5uYXR5Y2htaWFzdCB6YW1yYcW8YSBwcm9jZXMgdyBSQU0gKE50U3VzcGVuZFByb2Nlc3MpIGx1YiB6cnl3YSB1cHJhd25pZW5pYS5cbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cIlwiXCJcbmltcG9ydCBjdHlwZXNcbmZyb20gY3R5cGVzIGltcG9ydCB3aW50eXBlc1xuaW1wb3J0IHRpbWVcbmltcG9ydCBvc1xuaW1wb3J0IHN5c1xuXG4jIFdpbmRvd3MgQVBJIEJpbmRpbmdzXG51c2VyMzIgPSBjdHlwZXMud2luZGxsLnVzZXIzMlxua2VybmVsMzIgPSBjdHlwZXMud2luZGxsLmtlcm5lbDMyXG5udGRsbCA9IGN0eXBlcy53aW5kbGwubnRkbGxcbnBzYXBpID0gY3R5cGVzLndpbmRsbC5wc2FwaVxuXG5QUk9DRVNTX1FVRVJZX0lORk9STUFUSU9OID0gMHgwNDAwXG5QUk9DRVNTX1ZNX1JFQUQgPSAweDAwMTBcblBST0NFU1NfU1VTUEVORF9SRVNVTUUgPSAweDA4MDBcblBST0NFU1NfVEVSTUlOQVRFID0gMHgwMDAxXG5cbiMgS29uZmlndXJhY2phIHByb2fDs3cgV2F0Y2hkb2dhXG5DUFVfVEhSRVNIT0xEX1BFUkNFTlQgPSAke2NwdVRocmVzaG9sZH1cbk1FTU9SWV9USFJFU0hPTERfTUIgPSAke21lbW9yeVRocmVzaG9sZH1cblBPTExfSU5URVJWQUxfU0VDT05EUyA9ICR7cG9sbEludGVydmFsIC8gMTAwMH1cbkFVVE9fQUNUSU9OID0gXCIke2F1dG9BY3Rpb259XCIgIyAnYXV0b19zdXNwZW5kJywgJ2F1dG9fa2lsbCcsICdhdXRvX3Rocm90dGxlJ1xuXG5jbGFzcyBQUk9DRVNTX01FTU9SWV9DT1VOVEVSUyhjdHlwZXMuU3RydWN0dXJlKTpcbiAgICBfZmllbGRzXyA9IFtcbiAgICAgICAgKFwiY2JcIiwgd2ludHlwZXMuRFdPUkQpLFxuICAgICAgICAoXCJQYWdlRmF1bHRDb3VudFwiLCB3aW50eXBlcy5EV09SRCksXG4gICAgICAgIChcIlBlYWtXb3JraW5nU2V0U2l6ZVwiLCBjdHlwZXMuY19zaXplX3QpLFxuICAgICAgICAoXCJXb3JraW5nU2V0U2l6ZVwiLCBjdHlwZXMuY19zaXplX3QpLFxuICAgICAgICAoXCJRdW90YVBlYWtQYWdlZFBvb2xVc2FnZVwiLCBjdHlwZXMuY19zaXplX3QpLFxuICAgICAgICAoXCJRdW90YVBhZ2VkUG9vbFVzYWdlXCIsIGN0eXBlcy5jX3NpemVfdCksXG4gICAgICAgIChcIlF1b3RhUGVha05vblBhZ2VkUG9vbFVzYWdlXCIsIGN0eXBlcy5jX3NpemVfdCksXG4gICAgICAgIChcIlF1b3RhTm9uUGFnZWRQb29sVXNhZ2VcIiwgY3R5cGVzLmNfc2l6ZV90KSxcbiAgICAgICAgKFwiUGFnZWZpbGVVc2FnZVwiLCBjdHlwZXMuY19zaXplX3QpLFxuICAgICAgICAoXCJQZWFrUGFnZWZpbGVVc2FnZVwiLCBjdHlwZXMuY19zaXplX3QpLFxuICAgIF1cblxuZGVmIGdldF9wcm9jZXNzX21lbW9yeV9tYihoX3Byb2Nlc3MpOlxuICAgIFwiXCJcIlp3cmFjYSB6dcW8eWNpZSBwYW1pxJljaSBSQU0gV29ya2luZyBTZXQgdyBtZWdhYmFqdGFjaC5cIlwiXCJcbiAgICBjb3VudGVycyA9IFBST0NFU1NfTUVNT1JZX0NPVU5URVJTKClcbiAgICBjb3VudGVycy5jYiA9IGN0eXBlcy5zaXplb2YoUFJPQ0VTU19NRU1PUllfQ09VTlRFUlMpXG4gICAgaWYgcHNhcGkuR2V0UHJvY2Vzc01lbW9yeUluZm8oaF9wcm9jZXNzLCBjdHlwZXMuYnlyZWYoY291bnRlcnMpLCBjb3VudGVycy5jYik6XG4gICAgICAgIHJldHVybiBjb3VudGVycy5Xb3JraW5nU2V0U2l6ZSAvICgxMDI0ICogMTAyNClcbiAgICByZXR1cm4gMC4wXG5cbmRlZiBmcmVlemVfcHJvY2VzcyhwaWQpOlxuICAgIFwiXCJcIkLFgnlza2F3aWN6bmllIHphbXJhxbxhIHdzenlzdGtpZSB3xIV0a2kgdyBwYW1pxJljaSBSQU0uXCJcIlwiXG4gICAgaCA9IGtlcm5lbDMyLk9wZW5Qcm9jZXNzKFBST0NFU1NfU1VTUEVORF9SRVNVTUUsIEZhbHNlLCBwaWQpXG4gICAgaWYgaDpcbiAgICAgICAgbnRkbGwuTnRTdXNwZW5kUHJvY2VzcyhoKVxuICAgICAgICBrZXJuZWwzMi5DbG9zZUhhbmRsZShoKVxuICAgICAgICBwcmludChmXCJbIV0gW0ZSRUVaRV0gTnRTdXNwZW5kUHJvY2VzcyhQSUQ6IHtwaWR9KSAtPiBaYW1yb8W8b25vIHfEhXRraSB3IHBhbWnEmWNpIFJBTSFcIilcblxuZGVmIHRlcm1pbmF0ZV9wcm9jZXNzKHBpZCk6XG4gICAgXCJcIlwiVHJ3YWxlIHViaWphIHByb2Nlcy5cIlwiXCJcbiAgICBoID0ga2VybmVsMzIuT3BlblByb2Nlc3MoUFJPQ0VTU19URVJNSU5BVEUsIEZhbHNlLCBwaWQpXG4gICAgaWYgaDpcbiAgICAgICAga2VybmVsMzIuVGVybWluYXRlUHJvY2VzcyhoLCA5KVxuICAgICAgICBrZXJuZWwzMi5DbG9zZUhhbmRsZShoKVxuICAgICAgICBwcmludChmXCJbIV0gW0tJTExdIFRlcm1pbmF0ZVByb2Nlc3MoUElEOiB7cGlkfSkgLT4gVXN1bmnEmXRvIHogUkFNIVwiKVxuXG5kZWYgcnVuX3dhdGNoZG9nX2xvb3AoKTpcbiAgICBwcmludChcIj1cIiAqIDcwKVxuICAgIHByaW50KFwiICBQUk9DRVNTIFdBVENIRE9HIERBRU1PTjogTU9OSVRPUk9XQU5JRSBDUFUgJiBSQU1cIilcbiAgICBwcmludChmXCIgIFByb2dpOiBDUFUgPiB7Q1BVX1RIUkVTSE9MRF9QRVJDRU5UfSUgfCBSQU0gPiB7TUVNT1JZX1RIUkVTSE9MRF9NQn0gTUJcIilcbiAgICBwcmludChmXCIgIEFrY2phIGF1dG9tYXR5Y3puYToge0FVVE9fQUNUSU9OLnVwcGVyKCl9XCIpXG4gICAgcHJpbnQoXCI9XCIgKiA3MClcblxuICAgIHRyeTpcbiAgICAgICAgd2hpbGUgVHJ1ZTpcbiAgICAgICAgICAgICMgU2thbm93YW5pZSBha3R5d255Y2ggb2tpZW4gVG9wTW9zdFxuICAgICAgICAgICAgZGVmIGVudW1fcHJvYyhod25kLCBscGFyYW0pOlxuICAgICAgICAgICAgICAgIGlmIG5vdCB1c2VyMzIuSXNXaW5kb3dWaXNpYmxlKGh3bmQpOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVHJ1ZVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGV4X3N0eWxlID0gdXNlcjMyLkdldFdpbmRvd0xvbmdXKGh3bmQsIC0yMCkgIyBHV0xfRVhTVFlMRVxuICAgICAgICAgICAgICAgIGlzX3RvcG1vc3QgPSBib29sKGV4X3N0eWxlICYgMHgwMDAwMDAwOClcblxuICAgICAgICAgICAgICAgIGlmIGlzX3RvcG1vc3Q6XG4gICAgICAgICAgICAgICAgICAgIHBpZCA9IHdpbnR5cGVzLkRXT1JEKClcbiAgICAgICAgICAgICAgICAgICAgdXNlcjMyLkdldFdpbmRvd1RocmVhZFByb2Nlc3NJZChod25kLCBjdHlwZXMuYnlyZWYocGlkKSlcbiAgICAgICAgICAgICAgICAgICAgaF9wcm9jID0ga2VybmVsMzIuT3BlblByb2Nlc3MoUFJPQ0VTU19RVUVSWV9JTkZPUk1BVElPTiB8IFBST0NFU1NfVk1fUkVBRCwgRmFsc2UsIHBpZC52YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgaWYgaF9wcm9jOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmFtX21iID0gZ2V0X3Byb2Nlc3NfbWVtb3J5X21iKGhfcHJvYylcbiAgICAgICAgICAgICAgICAgICAgICAgIGtlcm5lbDMyLkNsb3NlSGFuZGxlKGhfcHJvYylcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgcmFtX21iID49IE1FTU9SWV9USFJFU0hPTERfTUI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpbnQoZlwiW/CfmqggQUxBUk1dIFd5a3J5dG8gcHJ6ZWNpxIXFvGVuaWUgUkFNIHcgUElEIHtwaWQudmFsdWV9OiB7cmFtX21iOi4xZn0gTUIgKExpbWl0OiB7TUVNT1JZX1RIUkVTSE9MRF9NQn0gTUIpXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgQVVUT19BQ1RJT04gPT0gXCJhdXRvX3N1c3BlbmRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJlZXplX3Byb2Nlc3MocGlkLnZhbHVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsaWYgQVVUT19BQ1RJT04gPT0gXCJhdXRvX2tpbGxcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVybWluYXRlX3Byb2Nlc3MocGlkLnZhbHVlKVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIFRydWVcblxuICAgICAgICAgICAgY2IgPSBjdHlwZXMuV0lORlVOQ1RZUEUod2ludHlwZXMuQk9PTCwgd2ludHlwZXMuSFdORCwgd2ludHlwZXMuTFBBUkFNKShlbnVtX3Byb2MpXG4gICAgICAgICAgICB1c2VyMzIuRW51bVdpbmRvd3MoY2IsIDApXG4gICAgICAgICAgICB0aW1lLnNsZWVwKFBPTExfSU5URVJWQUxfU0VDT05EUylcblxuICAgIGV4Y2VwdCBLZXlib2FyZEludGVycnVwdDpcbiAgICAgICAgcHJpbnQoXCJcXFxcblsqXSBaYXRyenltYW5vIHN0cmHFvG5pa2EgV2F0Y2hkb2cuXCIpXG5cbmlmIF9fbmFtZV9fID09IFwiX19tYWluX19cIjpcbiAgICBydW5fd2F0Y2hkb2dfbG9vcCgpXG5gO1xuICAgIGRvd25sb2FkRmlsZSgncHJvY2Vzc193YXRjaGRvZ19kYWVtb24ucHknLCBzY3JpcHRDb2RlLCAndGV4dC94LXB5dGhvbicpO1xuICAgIGFkZExvZygn4pyUIFtFWFBPUlRdIFBvYnJhbm8gc2tyeXB0IFB5dGhvbmE6IHByb2Nlc3Nfd2F0Y2hkb2dfZGFlbW9uLnB5Jyk7XG4gIH07XG5cbiAgLy8gU3BhcmtsaW5lIG1pbmkgU1ZHIGNvbXBvbmVudFxuICBjb25zdCByZW5kZXJTcGFya2xpbmUgPSAoZGF0YTogbnVtYmVyW10gPSBbXSwgY29sb3I6IHN0cmluZyA9ICcjYTg1NWY3JykgPT4ge1xuICAgIGlmICghZGF0YSB8fCBkYXRhLmxlbmd0aCA8IDIpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IG1heCA9IE1hdGgubWF4KC4uLmRhdGEsIDEpO1xuICAgIGNvbnN0IG1pbiA9IE1hdGgubWluKC4uLmRhdGEsIDApO1xuICAgIGNvbnN0IHJhbmdlID0gbWF4IC0gbWluIHx8IDE7XG4gICAgY29uc3QgaGVpZ2h0ID0gMjQ7XG4gICAgY29uc3Qgd2lkdGggPSA2NDtcblxuICAgIGNvbnN0IHBvaW50cyA9IGRhdGFcbiAgICAgIC5tYXAoKHZhbCwgaWR4KSA9PiB7XG4gICAgICAgIGNvbnN0IHggPSAoaWR4IC8gKGRhdGEubGVuZ3RoIC0gMSkpICogd2lkdGg7XG4gICAgICAgIGNvbnN0IHkgPSBoZWlnaHQgLSAoKHZhbCAtIG1pbikgLyByYW5nZSkgKiAoaGVpZ2h0IC0gNCkgLSAyO1xuICAgICAgICByZXR1cm4gYCR7eH0sJHt5fWA7XG4gICAgICB9KVxuICAgICAgLmpvaW4oJyAnKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8c3ZnIHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9IGNsYXNzTmFtZT1cIm92ZXJmbG93LXZpc2libGUgaW5saW5lLWJsb2NrXCI+XG4gICAgICAgIDxwb2x5bGluZSBmaWxsPVwibm9uZVwiIHN0cm9rZT17Y29sb3J9IHN0cm9rZVdpZHRoPVwiMlwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBwb2ludHM9e3BvaW50c30gLz5cbiAgICAgIDwvc3ZnPlxuICAgICk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNlwiPlxuICAgICAgey8qIEhlYWRlciBCYW5uZXIgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLXhsIHAtNSBzaGFkb3ctbGcgZmxleCBmbGV4LWNvbCBtZDpmbGV4LXJvdyBpdGVtcy1zdGFydCBtZDppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00XCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkIHRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgIDxHYXVnZSBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtcHVycGxlLTQwMFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5Qcm9jZXNzIFdhdGNoZG9nIERhc2hib2FyZCAmIFRlbGVtZXRyaWEgWmFzb2LDs3c8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBweC0yIHB5LTAuNSByb3VuZGVkLWZ1bGwgYmctcHVycGxlLTk1MCB0ZXh0LXB1cnBsZS0zMDAgYm9yZGVyIGJvcmRlci1wdXJwbGUtODAwIGZvbnQtbW9ubyBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgUkVBTC1USU1FIE1FVFJJQ1NcbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2gyPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDAgbXQtMSBtYXgtdy0yeGxcIj5cbiAgICAgICAgICAgIE1vbml0b3J1aiBuYSDFvHl3byB6dcW8eWNpZSBwcm9jZXNvcmEgKENQVSAlKSwgcGFtacSZY2kgb3BlcmFjeWpuZWogKFJBTSBNQiksIHfEhXRrw7N3IGkgdWNod3l0w7N3IG9raWVuIG5ha8WCYWRlayBGbHV0dGVyYS4gQXV0b21hdHljem5pZSB6YW1yYcW8YWogbHViIG5pc3pjeiBwcm9jZXN5IHByemVrcmFjemFqxIVjZSBkb3p3b2xvbmUgcHJvZ2kgb2JjacSFxbxlbmlhLlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc1dhdGNoZG9nQWN0aXZlKCFpc1dhdGNoZG9nQWN0aXZlKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgcHgtMyBweS0yIHJvdW5kZWQtbGcgdGV4dC14cyBmb250LWJvbGQgZm9udC1tb25vIHNoYWRvdyB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICBpc1dhdGNoZG9nQWN0aXZlXG4gICAgICAgICAgICAgICAgPyAnYmctZW1lcmFsZC02MDAgaG92ZXI6YmctZW1lcmFsZC01MDAgdGV4dC13aGl0ZSBhbmltYXRlLXB1bHNlJ1xuICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0zMDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7aXNXYXRjaGRvZ0FjdGl2ZSA/IDxQYXVzZSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+IDogPFBsYXkgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPn1cbiAgICAgICAgICAgIDxzcGFuPntpc1dhdGNoZG9nQWN0aXZlID8gJ1N0cmHFvG5pazogQUtUWVdOWScgOiAnV3puw7N3IFN0cmHFvG5pa2EnfTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVNwYXduT3ZlcmxvYWRQcm9jZXNzfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0zIHB5LTIgYmctZ3JhZGllbnQtdG8tciBmcm9tLXJlZC03MDAgdG8tcGluay03MDAgaG92ZXI6ZnJvbS1yZWQtNjAwIGhvdmVyOnRvLXBpbmstNjAwIHRleHQtd2hpdGUgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtYm9sZCBmb250LW1vbm8gc2hhZG93IHRyYW5zaXRpb24tYWxsIGJvcmRlciBib3JkZXItcmVkLTUwMC8zMFwiXG4gICAgICAgICAgICB0aXRsZT1cIlN5bXVsdWogdXJ1Y2hvbWllbmllIG5ha8WCYWRraSBnZW5lcnVqxIVjZWogb2dyb21uZSBvYmNpxIXFvGVuaWUgQ1BVIGkgUkFNXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8WmFwIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgIDxzcGFuPld5Z2VuZXJ1aiBPYmNpxIXFvGVuaWUgKFNwaWtlKTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNob3dUaGVybWFsR292ZXJub3IoIXNob3dUaGVybWFsR292ZXJub3IpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0zIHB5LTIgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtYm9sZCBmb250LW1vbm8gc2hhZG93IHRyYW5zaXRpb24tYWxsIGJvcmRlciAke1xuICAgICAgICAgICAgICBzaG93VGhlcm1hbEdvdmVybm9yXG4gICAgICAgICAgICAgICAgPyAnYmctaW5kaWdvLTk1MCB0ZXh0LWluZGlnby0yMDAgYm9yZGVyLWluZGlnby01MDAgc2hhZG93LWluZGlnby05NTAnXG4gICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtODAwIGhvdmVyOmJnLXNsYXRlLTcwMCB0ZXh0LXNsYXRlLTMwMCBib3JkZXItc2xhdGUtNzAwJ1xuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICB0aXRsZT1cIlBva2HFvCAvIFVrcnlqIFphcnrEhWRjxJkgVGVybWljem5lZ28gQ1BVICYgQ2jFgm9kemVuaWUgS3Jpb2dlbmljem5lXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8U25vd2ZsYWtlIGNsYXNzTmFtZT17YHctMy41IGgtMy41ICR7c2hvd1RoZXJtYWxHb3Zlcm5vciA/ICd0ZXh0LWN5YW4tNDAwIGFuaW1hdGUtc3BpbicgOiAndGV4dC1pbmRpZ28tNDAwJ31gfSAvPlxuICAgICAgICAgICAgPHNwYW4+VGVtcCBDUFUgJiBLcmlvZ2VuaWthPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17ZXhwb3J0UHl0aG9uV2F0Y2hkb2dTY3JpcHR9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTMgcHktMiBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQtc2xhdGUtMjAwIHJvdW5kZWQtbGcgdGV4dC14cyBmb250LXNlbWlib2xkIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICAgIHRpdGxlPVwiUG9iaWVyeiBza3J5cHQgZGVtb25hIFB5dGhvbmEgZG8gbW9uaXRvcm93YW5pYSBDUFUvUkFNIHcgc3lzdGVtaWUgV2luZG93c1wiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPERvd25sb2FkIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtcHVycGxlLTQwMFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5Qb2JpZXJ6IFNrcnlwdCAucHk8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBERURJQ0FURUQgQ1BVIFRIRVJNQUwgR09WRVJOT1IgJiBDUllPIFBVUkdFIFBBTkVMICovfVxuICAgICAge3Nob3dUaGVybWFsR292ZXJub3IgJiYgKFxuICAgICAgICA8Q3B1VGhlcm1hbEdvdmVybm9yUGFuZWwgLz5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBLUEkgUmVzb3VyY2UgTWV0cmljcyBTdW1tYXJ5IFdpZGdldHMgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTIgbGc6Z3JpZC1jb2xzLTQgZ2FwLTRcIj5cbiAgICAgICAgey8qIFRvdGFsIENQVSBXaWRnZXQgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQteGwgcC00IHNoYWRvdyBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtc2xhdGUtNDAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgPENwdSBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcHVycGxlLTQwMFwiIC8+XG4gICAgICAgICAgICAgIMWBxIVjem5lIE9iY2nEhcW8ZW5pZSBDUFVcbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyBweC0xLjUgcHktMC41IHJvdW5kZWQgYmctcHVycGxlLTk1MCB0ZXh0LXB1cnBsZS0zMDAgYm9yZGVyIGJvcmRlci1wdXJwbGUtODAwXCI+XG4gICAgICAgICAgICAgIHtydW5uaW5nUHJvY2Vzc2VzLmxlbmd0aH0gcHJvYy5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXktMiBmbGV4IGl0ZW1zLWJhc2VsaW5lIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgdGV4dC0yeGwgZm9udC1leHRyYWJvbGQgZm9udC1tb25vICR7dG90YWxDcHUgPiA1MCA/ICd0ZXh0LXJvc2UtNDAwJyA6ICd0ZXh0LXdoaXRlJ31gfT5cbiAgICAgICAgICAgICAge3RvdGFsQ3B1LnRvRml4ZWQoMSl9JVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTQwMCBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgWmFncm/FvGVuaWE6IDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC1yZWQtNDAwXCI+e3JvZ3VlQ3B1LnRvRml4ZWQoMSl9JTwvc3Ryb25nPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIFByb2dyZXNzIEJhciAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS05NTAgaC0yIHJvdW5kZWQtZnVsbCBvdmVyZmxvdy1oaWRkZW4gYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgaC1mdWxsIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCAke1xuICAgICAgICAgICAgICAgIHRvdGFsQ3B1ID4gNjAgPyAnYmctcmVkLTUwMCcgOiB0b3RhbENwdSA+IDMwID8gJ2JnLWFtYmVyLTUwMCcgOiAnYmctcHVycGxlLTUwMCdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgIHN0eWxlPXt7IHdpZHRoOiBgJHtNYXRoLm1pbih0b3RhbENwdSwgMTAwKX0lYCB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIFRvdGFsIE1lbW9yeSBXaWRnZXQgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQteGwgcC00IHNoYWRvdyBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtc2xhdGUtNDAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgPEhhcmREcml2ZSBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcGluay00MDBcIiAvPlxuICAgICAgICAgICAgICBQYW1pxJnEhyBSQU0gKFdvcmtpbmcgU2V0KVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIHRleHQtc2xhdGUtNDAwXCI+TGltaXQ6IDEwMjQgTUI8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm15LTIgZmxleCBpdGVtcy1iYXNlbGluZSBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtZXh0cmFib2xkIGZvbnQtbW9ubyB0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgIHt0b3RhbE1lbW9yeS50b0ZpeGVkKDEpfSA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtbm9ybWFsIHRleHQtc2xhdGUtNDAwXCI+TUI8L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICDFmnJlZG5pbzogeyh0b3RhbE1lbW9yeSAvIChydW5uaW5nUHJvY2Vzc2VzLmxlbmd0aCB8fCAxKSkudG9GaXhlZCgwKX0gTUIvcFxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtOTUwIGgtMiByb3VuZGVkLWZ1bGwgb3ZlcmZsb3ctaGlkZGVuIGJvcmRlciBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImgtZnVsbCBiZy1ncmFkaWVudC10by1yIGZyb20tcGluay02MDAgdG8tcHVycGxlLTUwMCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDBcIlxuICAgICAgICAgICAgICBzdHlsZT17eyB3aWR0aDogYCR7TWF0aC5taW4oKHRvdGFsTWVtb3J5IC8gMTAyNCkgKiAxMDAsIDEwMCl9JWAgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBUaHJlYWQgJiBIYW5kbGUgQ29uY3VycmVuY3kgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQteGwgcC00IHNoYWRvdyBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtc2xhdGUtNDAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgPEFjdGl2aXR5IGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1jeWFuLTQwMFwiIC8+XG4gICAgICAgICAgICAgIFfEhXRraSAmIFVjaHd5dHkgV2luMzJcbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyBweC0xLjUgcHktMC41IHJvdW5kZWQgYmctY3lhbi05NTAgdGV4dC1jeWFuLTMwMCBib3JkZXIgYm9yZGVyLWN5YW4tODAwXCI+XG4gICAgICAgICAgICAgIENPTkNVUlJFTkNZXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm15LTIgZmxleCBpdGVtcy1iYXNlbGluZSBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtZXh0cmFib2xkIGZvbnQtbW9ubyB0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgIHt0b3RhbFRocmVhZHN9IDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ub3JtYWwgdGV4dC1zbGF0ZS00MDBcIj53xIV0a8Ozdzwvc3Bhbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDAgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgIFVjaHd5dHk6IDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS0yMDBcIj57cHJvY2Vzc2VzLnJlZHVjZSgoYSwgYikgPT4gYSArIChiLmhhbmRsZXNDb3VudCB8fCAwKSwgMCl9PC9zdHJvbmc+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgPHNwYW4+U3RhbiBwYW1pxJljaTo8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtYm9sZCBmb250LW1vbm9cIj5TVEFCSUxOWTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIFdhdGNoZG9nIEFsZXJ0cyAmIFNlY3VyaXR5IFBvbGljeSBXaWRnZXQgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQteGwgcC00IHNoYWRvdyBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtc2xhdGUtNDAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgPFNoaWVsZEFsZXJ0IGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1hbWJlci00MDBcIiAvPlxuICAgICAgICAgICAgICBBdXRvbWF0eWN6bmEgUmVha2NqYVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIHB4LTEuNSBweS0wLjUgcm91bmRlZCBiZy1hbWJlci05NTAgdGV4dC1hbWJlci0zMDAgYm9yZGVyIGJvcmRlci1hbWJlci04MDAgZm9udC1ib2xkXCI+XG4gICAgICAgICAgICAgIHthdXRvQWN0aW9uLnRvVXBwZXJDYXNlKCkucmVwbGFjZSgnXycsICcgJyl9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm15LTIgZmxleCBpdGVtcy1iYXNlbGluZSBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtZXh0cmFib2xkIGZvbnQtbW9ubyB0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgIHthY3RpdmVBbGVydHMgPiAwID8gKFxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcmVkLTQwMCBhbmltYXRlLXB1bHNlXCI+e2FjdGl2ZUFsZXJ0c30gUFJaRUtST0NaRcWDPC9zcGFuPlxuICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC00MDBcIj5CUkFLIEFMRVJUw5NXPC9zcGFuPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZm9udC1tb25vXCI+XG4gICAgICAgICAgICA8c3Bhbj5QcsOzZyBDUFU6IHtjcHVUaHJlc2hvbGR9JTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuPlByw7NnIFJBTToge21lbW9yeVRocmVzaG9sZH1NQjwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIFdhdGNoZG9nIENvbmZpZ3VyYXRvciAmIFRhY3RpY2FsIEZpbHRlcnMgQmFyICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC14bCBwLTQgc3BhY2UteS0zXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBsZzpmbGV4LXJvdyBpdGVtcy1zdGFydCBsZzppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00XCI+XG4gICAgICAgICAgey8qIEZpbHRlciBhbmQgU2VhcmNoICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGdhcC0yIHctZnVsbCBsZzp3LWF1dG9cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgZmxleC0xIHNtOnctNjRcIj5cbiAgICAgICAgICAgICAgPFNlYXJjaCBjbGFzc05hbWU9XCJ3LTQgaC00IGFic29sdXRlIGxlZnQtMyB0b3AtMi41IHRleHQtc2xhdGUtNTAwXCIgLz5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU3p1a2FqIHBvIFBJRCwgbmF6d2llLCBva25pZS4uLlwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e3NlYXJjaFF1ZXJ5fVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0U2VhcmNoUXVlcnkoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC1sZyBwbC05IHByLTMgcHktMS41IHRleHQteHMgdGV4dC13aGl0ZSBwbGFjZWhvbGRlci1zbGF0ZS01MDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1wdXJwbGUtNTAwIGZvbnQtbW9ub1wiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBiZy1zbGF0ZS05NTAgcC0xIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgdGV4dC14c1wiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0RmlsdGVyTW9kZSgnYWxsJyl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMi41IHB5LTEgcm91bmRlZCBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICAgICAgZmlsdGVyTW9kZSA9PT0gJ2FsbCcgPyAnYmctcHVycGxlLTYwMCB0ZXh0LXdoaXRlJyA6ICd0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlJ1xuICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgV3N6eXN0a2llICh7cHJvY2Vzc2VzLmxlbmd0aH0pXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0RmlsdGVyTW9kZSgncm9ndWVfb25seScpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTIuNSBweS0xIHJvdW5kZWQgZm9udC1tZWRpdW0gdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgICAgIGZpbHRlck1vZGUgPT09ICdyb2d1ZV9vbmx5JyA/ICdiZy1yZWQtNjAwIHRleHQtd2hpdGUnIDogJ3RleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBaYWdyb8W8ZW5pYSAoe3Byb2Nlc3Nlcy5maWx0ZXIoKHApID0+IHAuaXNSb2d1ZSB8fCBwLmlzVG9wTW9zdCkubGVuZ3RofSlcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRGaWx0ZXJNb2RlKCdoaWdoX3Jlc291cmNlJyl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMi41IHB5LTEgcm91bmRlZCBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICAgICAgZmlsdGVyTW9kZSA9PT0gJ2hpZ2hfcmVzb3VyY2UnID8gJ2JnLWFtYmVyLTYwMCB0ZXh0LXNsYXRlLTk1MCBmb250LWJvbGQnIDogJ3RleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBXeXNva2llIFphc29ieSAoe3Byb2Nlc3Nlcy5maWx0ZXIoKHApID0+IChwLmNwdVBlcmNlbnQgfHwgMCkgPiBjcHVUaHJlc2hvbGQgfHwgKHAubWVtb3J5TWIgfHwgMCkgPiBtZW1vcnlUaHJlc2hvbGQpLmxlbmd0aH0pXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogV2F0Y2hkb2cgUG9saWN5IENvbnRyb2xzICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGdhcC0zIHctZnVsbCBsZzp3LWF1dG8ganVzdGlmeS1lbmRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDBcIj5DesSZc3RvdGxpd2/Fm8SHOjwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgIHZhbHVlPXtwb2xsSW50ZXJ2YWx9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRQb2xsSW50ZXJ2YWwoTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQgcHgtMiBweS0xIHRleHQtc2xhdGUtMjAwIHRleHQteHMgZm9udC1tb25vXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9ezUwMH0+NTAwIG1zIChSZWFsLVRpbWUpPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17MTAwMH0+MTAwMCBtcyAoU3RhbmRhcmQpPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17MjAwMH0+MjAwMCBtcyAoT3N6Y3rEmWRueSk8L29wdGlvbj5cbiAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTIgdGV4dC14c1wiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMFwiPlJlYWtjamEgV2F0Y2hkb2dhOjwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgIHZhbHVlPXthdXRvQWN0aW9ufVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0QXV0b0FjdGlvbihlLnRhcmdldC52YWx1ZSBhcyBhbnkpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkIHB4LTIgcHktMSB0ZXh0LXB1cnBsZS0zMDAgZm9udC1ib2xkIHRleHQteHMgZm9udC1tb25vXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJhdXRvX3N1c3BlbmRcIj5OdFN1c3BlbmRQcm9jZXNzIChaYW1yb8W6IFJBTSk8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYXV0b19raWxsXCI+VGVybWluYXRlUHJvY2VzcyAoWmFiaWogbmF0eWNobWlhc3QpPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImF1dG9fdGhyb3R0bGVcIj5UaHJvdHRsZSAoT2JuacW8IHByaW9yeXRldCBkbyBJRExFKTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJhbGVydF9vbmx5XCI+VHlsa28gUG93aWFkb21pZW5pZSAoQWxlcnQpPC9vcHRpb24+XG4gICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBNYWluIFByb2Nlc3MgR3JpZCAmIERhc2hib2FyZCBDYXJkcyAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiB4bDpncmlkLWNvbHMtMiBnYXAtNFwiPlxuICAgICAgICB7ZmlsdGVyZWRQcm9jZXNzZXMubWFwKChwcm9jKSA9PiB7XG4gICAgICAgICAgY29uc3QgaXNPdmVybG9hZGVkQ3B1ID0gKHByb2MuY3B1UGVyY2VudCB8fCAwKSA+IGNwdVRocmVzaG9sZDtcbiAgICAgICAgICBjb25zdCBpc092ZXJsb2FkZWRNZW0gPSAocHJvYy5tZW1vcnlNYiB8fCAwKSA+IG1lbW9yeVRocmVzaG9sZDtcbiAgICAgICAgICBjb25zdCBpc1J1bm5pbmcgPSBwcm9jLnN0YXR1cyA9PT0gJ3J1bm5pbmcnO1xuXG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAga2V5PXtwcm9jLnBpZH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcm91bmRlZC14bCBib3JkZXIgcC00IHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTIwMCBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlbiBzaGFkb3ctbGcgJHtcbiAgICAgICAgICAgICAgICBwcm9jLnN0YXR1cyA9PT0gJ3BlX2NvcnJ1cHRlZCdcbiAgICAgICAgICAgICAgICAgID8gJ2JnLXJvc2UtOTUwLzQwIGJvcmRlci1yb3NlLTYwMC82MCB0ZXh0LXJvc2UtMzAwJ1xuICAgICAgICAgICAgICAgICAgOiBwcm9jLnN0YXR1cyA9PT0gJ3F1YXJhbnRpbmVkJ1xuICAgICAgICAgICAgICAgICAgPyAnYmctcHVycGxlLTk1MC80MCBib3JkZXItcHVycGxlLTgwMC82MCB0ZXh0LXB1cnBsZS0zMDAnXG4gICAgICAgICAgICAgICAgICA6IHByb2Muc3RhdHVzID09PSAndGVybWluYXRlZCdcbiAgICAgICAgICAgICAgICAgID8gJ2JnLXNsYXRlLTk1MC82MCBib3JkZXItc2xhdGUtODAwIG9wYWNpdHktNTAnXG4gICAgICAgICAgICAgICAgICA6IHByb2MuaXNSb2d1ZSB8fCBwcm9jLmlzVG9wTW9zdFxuICAgICAgICAgICAgICAgICAgPyAnYmctcmVkLTk1MC8zMCBib3JkZXItcmVkLTgwMC84MCdcbiAgICAgICAgICAgICAgICAgIDogcHJvYy5pc1BhcmVudERyb3BwZXJcbiAgICAgICAgICAgICAgICAgID8gJ2JnLWFtYmVyLTk1MC8zMCBib3JkZXItYW1iZXItODAwLzgwJ1xuICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTAwLzkwIGJvcmRlci1zbGF0ZS04MDAnXG4gICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIHsvKiBQcm9jZXNzIENhcmQgSGVhZGVyICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBqdXN0aWZ5LWJldHdlZW4gZ2FwLTIgcGItMyBib3JkZXItYiBib3JkZXItc2xhdGUtODAwLzgwXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRydW5jYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIGZvbnQtYm9sZCB0ZXh0LXNtIHRleHQtd2hpdGUgdHJ1bmNhdGVcIj57cHJvYy5uYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCBmb250LW1vbm8gYmctc2xhdGUtOTUwIHB4LTEuNSBweS0wLjUgcm91bmRlZCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgUElEOiB7cHJvYy5waWR9XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIHtwcm9jLnBwaWQgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCBmb250LW1vbm8gYmctc2xhdGUtOTUwIHB4LTEuNSBweS0wLjUgcm91bmRlZCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBQUElEOiB7cHJvYy5wcGlkfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDAgdHJ1bmNhdGUgbXQtMC41XCI+XG4gICAgICAgICAgICAgICAgICAgICAge3Byb2Mud2luZG93VGl0bGUgfHwgcHJvYy5maWxlUGF0aH1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIHsvKiBTdGF0dXMgQmFkZ2UgKi99XG4gICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0yIHB5LTAuNSByb3VuZGVkIHRleHQtWzEwcHhdIGZvbnQtbW9ubyBmb250LWJvbGQgdXBwZXJjYXNlIGZsZXgtc2hyaW5rLTAgJHtcbiAgICAgICAgICAgICAgICAgICAgICBwcm9jLnN0YXR1cyA9PT0gJ3BlX2NvcnJ1cHRlZCdcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXJvc2UtOTAwIHRleHQtcm9zZS0yMDAgYm9yZGVyIGJvcmRlci1yb3NlLTYwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgIDogcHJvYy5zdGF0dXMgPT09ICdxdWFyYW50aW5lZCdcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXB1cnBsZS05MDAgdGV4dC1wdXJwbGUtMjAwIGJvcmRlciBib3JkZXItcHVycGxlLTYwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgIDogcHJvYy5zdGF0dXMgPT09ICd0ZXJtaW5hdGVkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctc2xhdGUtODAwIHRleHQtc2xhdGUtNDAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiBwcm9jLmlzVG9wTW9zdFxuICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctcmVkLTkwMCB0ZXh0LXJlZC0yMDAgYm9yZGVyIGJvcmRlci1yZWQtNzAwIGFuaW1hdGUtcHVsc2UnXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHByb2MuaXNQYXJlbnREcm9wcGVyXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1hbWJlci05MDAgdGV4dC1hbWJlci0yMDAgYm9yZGVyIGJvcmRlci1hbWJlci03MDAnXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1lbWVyYWxkLTk1MCB0ZXh0LWVtZXJhbGQtMzAwIGJvcmRlciBib3JkZXItZW1lcmFsZC04MDAnXG4gICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7cHJvYy5zdGF0dXMgPT09ICdwZV9jb3JydXB0ZWQnXG4gICAgICAgICAgICAgICAgICAgICAgPyAn8J+SpSBQRSAweEMwMDAwMDdCJ1xuICAgICAgICAgICAgICAgICAgICAgIDogcHJvYy5zdGF0dXMgPT09ICdxdWFyYW50aW5lZCdcbiAgICAgICAgICAgICAgICAgICAgICA/ICdaQU1ST8W7T05ZIFcgUkFNJ1xuICAgICAgICAgICAgICAgICAgICAgIDogcHJvYy5zdGF0dXMgPT09ICd0ZXJtaW5hdGVkJ1xuICAgICAgICAgICAgICAgICAgICAgID8gJ1pBQklUWSdcbiAgICAgICAgICAgICAgICAgICAgICA6IHByb2MuaXNUb3BNb3N0XG4gICAgICAgICAgICAgICAgICAgICAgPyAnVE9QTU9TVCBPVkVSTEFZJ1xuICAgICAgICAgICAgICAgICAgICAgIDogcHJvYy5pc1BhcmVudERyb3BwZXJcbiAgICAgICAgICAgICAgICAgICAgICA/ICdQQVJFTlQgRFJPUFBFUidcbiAgICAgICAgICAgICAgICAgICAgICA6ICdOT1JNQUxOWSd9XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7LyogUmVhbC1UaW1lIE1ldHJpY3MgJiBMaXZlIEdhdWdlcyAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTMgbXktM1wiPlxuICAgICAgICAgICAgICAgICAgey8qIENQVSBVc2FnZSBNZXRlciAqL31cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTUwIHAtMi41IHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAvODAgc3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC14c1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Q3B1IGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtcHVycGxlLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5adcW8eWNpZSBDUFU6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2Bmb250LW1vbm8gZm9udC1ib2xkICR7aXNPdmVybG9hZGVkQ3B1ID8gJ3RleHQtcmVkLTQwMCBhbmltYXRlLXB1bHNlJyA6ICd0ZXh0LXdoaXRlJ31gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtwcm9jLmNwdVBlcmNlbnQgfHwgMH0lXG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICB7LyogTWluaSBTcGFya2xpbmUgKyBCYXIgKi99XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgYmctc2xhdGUtOTAwIGgtMiByb3VuZGVkLWZ1bGwgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGgtZnVsbCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc092ZXJsb2FkZWRDcHUgPyAnYmctcmVkLTUwMCcgOiAnYmctcHVycGxlLTUwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IHdpZHRoOiBgJHtNYXRoLm1pbigocHJvYy5jcHVQZXJjZW50IHx8IDApICogMS41LCAxMDApfSVgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIHtyZW5kZXJTcGFya2xpbmUocHJvYy5jcHVIaXN0b3J5LCBpc092ZXJsb2FkZWRDcHUgPyAnI2VmNDQ0NCcgOiAnI2E4NTVmNycpfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICB7LyogUkFNIE1lbW9yeSBNZXRlciAqL31cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTUwIHAtMi41IHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAvODAgc3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC14c1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8SGFyZERyaXZlIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtcGluay00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+UGFtacSZxIcgUkFNOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgZm9udC1tb25vIGZvbnQtYm9sZCAke2lzT3ZlcmxvYWRlZE1lbSA/ICd0ZXh0LWFtYmVyLTQwMCcgOiAndGV4dC13aGl0ZSd9YH0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7cHJvYy5tZW1vcnlNYiB8fCAwfSBNQlxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMSBiZy1zbGF0ZS05MDAgaC0yIHJvdW5kZWQtZnVsbCBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaC1mdWxsIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1waW5rLTYwMCB0by1wdXJwbGUtNTAwIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IHdpZHRoOiBgJHtNYXRoLm1pbigoKHByb2MubWVtb3J5TWIgfHwgMCkgLyA0MDApICogMTAwLCAxMDApfSVgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIHtyZW5kZXJTcGFya2xpbmUocHJvYy5tZW1vcnlIaXN0b3J5LCAnI2VjNDg5OScpfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIFN1Yi1kZXRhaWxzOiBUaHJlYWRzLCBIYW5kbGVzLCBJL08sIFByaW9yaXR5ICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtNCBnYXAtMiB0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC1zbGF0ZS00MDAgYmctc2xhdGUtOTUwLzYwIHAtMiByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItc2xhdGUtODAwLzYwIG1iLTMgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtc2xhdGUtNTAwXCI+V8SFdGtpPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTIwMCBmb250LWJvbGRcIj57cHJvYy50aHJlYWRzQ291bnQgfHwgMX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtc2xhdGUtNTAwXCI+VWNod3l0eTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS0yMDAgZm9udC1ib2xkXCI+e3Byb2MuaGFuZGxlc0NvdW50IHx8IDIwfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1zbGF0ZS01MDBcIj5JL08gUmF0ZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS0yMDAgZm9udC1ib2xkXCI+e3Byb2MuaW9SYXRlS2IgfHwgMH0gS0Ivczwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1zbGF0ZS01MDBcIj5Qcmlvcnl0ZXQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YGZvbnQtYm9sZCAke3Byb2MucHJpb3JpdHlDbGFzcyA9PT0gJ0hJR0gnID8gJ3RleHQtcmVkLTQwMCcgOiBwcm9jLnByaW9yaXR5Q2xhc3MgPT09ICdJRExFJyA/ICd0ZXh0LWN5YW4tNDAwJyA6ICd0ZXh0LXNsYXRlLTMwMCd9YH0+XG4gICAgICAgICAgICAgICAgICAgICAge3Byb2MucHJpb3JpdHlDbGFzcyB8fCAnTk9STUFMJ31cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBBY3Rpb24gQnV0dG9ucyBUb29sYmFyIGZvciB0aGlzIFByb2Nlc3MgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtMiBib3JkZXItdCBib3JkZXItc2xhdGUtODAwLzgwIGZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTZWxlY3RlZFByb2Nlc3NGb3JEZXRhaWxzKHByb2MpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXB1cnBsZS00MDAgaG92ZXI6dGV4dC1wdXJwbGUtMzAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGZvbnQtbW9ubyBmb250LW1lZGl1bVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPEluZm8gY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+SW5zcGVrY2phIFBhbWnEmWNpPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAge2lzUnVubmluZyAmJiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgIHsvKiBUaHJvdHRsZSAqL31cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVRocm90dGxlUHJvY2Vzcyhwcm9jLnBpZCl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMiBweS0xIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC1jeWFuLTMwMCByb3VuZGVkIHRleHQtWzEwcHhdIGZvbnQtbW9ubyBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCB0cmFuc2l0aW9uLWFsbCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJPZ3JhbmljeiBwcmlvcnl0ZXQgcHJvY2Vzb3JhIGRvIElETEVfUFJJT1JJVFlfQ0xBU1NcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+VGhyb3R0bGU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgICAgIHsvKiBTdXNwZW5kIC8gRnJlZXplICovfVxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlU3VzcGVuZFByb2Nlc3MocHJvYy5waWQpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIgcHktMSBiZy1wdXJwbGUtOTAwLzYwIGhvdmVyOmJnLXB1cnBsZS04MDAgdGV4dC1wdXJwbGUtMjAwIHJvdW5kZWQgdGV4dC1bMTBweF0gZm9udC1tb25vIGJvcmRlciBib3JkZXItcHVycGxlLTcwMCB0cmFuc2l0aW9uLWFsbCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJaYW1yb8W6IHdzenlzdGtpZSB3xIV0a2kgdyBSQU0gemEgcG9tb2PEhSBOdFN1c3BlbmRQcm9jZXNzXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxMb2NrIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1wdXJwbGUtMzAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5aYW1yb8W6IFJBTTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICAgICAgey8qIFNhYm90YWdlIFBFICovfVxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlU2Fib3RhZ2VQRShwcm9jLnBpZCl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMiBweS0xIGJnLXJvc2UtOTUwIGhvdmVyOmJnLXJvc2UtODAwIHRleHQtcm9zZS0yMDAgcm91bmRlZCB0ZXh0LVsxMHB4XSBmb250LW1vbm8gYm9yZGVyIGJvcmRlci1yb3NlLTcwMCB0cmFuc2l0aW9uLWFsbCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJabmlzemN6IG5hZ8WCw7N3ZWsgUEUgaSBvZGV0bmlqIERBQ0xcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPFNrdWxsIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1waW5rLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+UEUgU2Fib3Rhxbw8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgICAgIHsvKiBLaWxsICovfVxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlS2lsbFByb2Nlc3MocHJvYy5waWQpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIuNSBweS0xIGJnLXJlZC03MDAgaG92ZXI6YmctcmVkLTYwMCB0ZXh0LXdoaXRlIHJvdW5kZWQgdGV4dC1bMTBweF0gZm9udC1tb25vIGZvbnQtYm9sZCB0cmFuc2l0aW9uLWFsbCBzaGFkb3dcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgWmFiaWpcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICk7XG4gICAgICAgIH0pfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBSZWFsLVRpbWUgVGVsZW1ldHJ5IEV2ZW50IExvZyAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQteGwgcC00IHNwYWNlLXktM1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBwYi0yIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS0zMDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgIDxUZXJtaW5hbCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcHVycGxlLTQwMFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5Eemllbm5payBaZGFyemXFhCBTdHJhxbxuaWthIFdhdGNoZG9nIChLZXJuZWwgJiBQcm9jZXNzIExvZyk8L3NwYW4+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtZW1lcmFsZC00MDAgZm9udC1tb25vIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctMiBoLTIgcm91bmRlZC1mdWxsIGJnLWVtZXJhbGQtNDAwIGFuaW1hdGUtcGluZ1wiPjwvc3Bhbj5cbiAgICAgICAgICAgIFNUUkVBTUlORyBBS1RVQUxJWkFDSklcbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTUwIHAtMyByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHRleHQtWzExcHhdIGZvbnQtbW9ubyBzcGFjZS15LTEgaC0zNiBvdmVyZmxvdy15LWF1dG9cIj5cbiAgICAgICAgICB7d2F0Y2hkb2dMb2dzLm1hcCgobG9nLCBpZHgpID0+IChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAga2V5PXtpZHh9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17XG4gICAgICAgICAgICAgICAgbG9nLmluY2x1ZGVzKCdUUklHR0VSJykgfHwgbG9nLmluY2x1ZGVzKCdBTEFSTScpIHx8IGxvZy5pbmNsdWRlcygnU1BBV04nKVxuICAgICAgICAgICAgICAgICAgPyAndGV4dC1yZWQtNDAwIGZvbnQtYm9sZCdcbiAgICAgICAgICAgICAgICAgIDogbG9nLmluY2x1ZGVzKCdGUkVFWkUnKSB8fCBsb2cuaW5jbHVkZXMoJ1NVS0NFUycpIHx8IGxvZy5pbmNsdWRlcygnRVhQT1JUJylcbiAgICAgICAgICAgICAgICAgID8gJ3RleHQtZW1lcmFsZC00MDAnXG4gICAgICAgICAgICAgICAgICA6IGxvZy5pbmNsdWRlcygnVEhST1RUTEUnKSB8fCBsb2cuaW5jbHVkZXMoJ0FMRVJUJylcbiAgICAgICAgICAgICAgICAgID8gJ3RleHQtYW1iZXItMzAwJ1xuICAgICAgICAgICAgICAgICAgOiAndGV4dC1zbGF0ZS00MDAnXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2xvZ31cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogRm9yZW5zaWMgRGVlcCBNZW1vcnkgSW5zcGVjdG9yIE1vZGFsICovfVxuICAgICAge3NlbGVjdGVkUHJvY2Vzc0ZvckRldGFpbHMgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei01MCBiZy1ibGFjay84MCBiYWNrZHJvcC1ibHVyLXNtIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHAtNFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQtMnhsIG1heC13LTJ4bCB3LWZ1bGwgcC02IHNoYWRvdy0yeGwgc3BhY2UteS00IG1heC1oLVs5MHZoXSBvdmVyZmxvdy15LWF1dG9cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHBiLTMgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMlwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yIHJvdW5kZWQtbGcgYmctcHVycGxlLTYwMC8yMCBib3JkZXIgYm9yZGVyLXB1cnBsZS01MDAvMzAgdGV4dC1wdXJwbGUtMzAwXCI+XG4gICAgICAgICAgICAgICAgICA8SGFyZERyaXZlIGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgICAgICB7c2VsZWN0ZWRQcm9jZXNzRm9yRGV0YWlscy5uYW1lfSAoUElEOiB7c2VsZWN0ZWRQcm9jZXNzRm9yRGV0YWlscy5waWR9KVxuICAgICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgSW5zcGVrY2phIHBhbWnEmWNpIFJBTSwgbW9kdcWCw7N3IERMTCBpIHN0cnVrdHVyeSBuYWfFgsOzd2thIFBFXG4gICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTZWxlY3RlZFByb2Nlc3NGb3JEZXRhaWxzKG51bGwpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMgcHktMSBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQtc2xhdGUtMzAwIHJvdW5kZWQtbGcgdGV4dC14cyBmb250LW1vbm9cIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgWmFta25paiBbRVNDXVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogTWV0cmljcyBCcmVha2Rvd24gKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTMgZ2FwLTMgdGV4dC14cyBmb250LW1vbm8gYmctc2xhdGUtOTUwIHAtMyByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDAgYmxvY2tcIj5Xb3JraW5nIFNldCBSQU06PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtd2hpdGUgZm9udC1ib2xkIHRleHQtc21cIj57c2VsZWN0ZWRQcm9jZXNzRm9yRGV0YWlscy5tZW1vcnlNYn0gTUI8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwIGJsb2NrXCI+T2JjacSFxbxlbmllIENQVTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1wdXJwbGUtNDAwIGZvbnQtYm9sZCB0ZXh0LXNtXCI+e3NlbGVjdGVkUHJvY2Vzc0ZvckRldGFpbHMuY3B1UGVyY2VudH0lPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMCBibG9ja1wiPlN0YW4gcHJvY2VzdTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1lbWVyYWxkLTQwMCBmb250LWJvbGQgdGV4dC1zbVwiPntzZWxlY3RlZFByb2Nlc3NGb3JEZXRhaWxzLnN0YXR1cy50b1VwcGVyQ2FzZSgpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIFNpbXVsYXRlZCBMb2FkZWQgRExMcyBhbmQgRW5naW5lIE1vZHVsZXMgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTMwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgYmxvY2tcIj5cbiAgICAgICAgICAgICAgICBaYcWCYWRvd2FuZSBNb2R1xYJ5IGkgQmlibGlvdGVraSBETEwgdyBQYW1pxJljaTpcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41IHRleHQtWzExcHhdIGZvbnQtbW9ubyBiZy1zbGF0ZS05NTAgcC0zIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciBweS0wLjUgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTkwMFwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS0zMDBcIj5DOlxcV2luZG93c1xcU3lzdGVtMzJcXG50ZGxsLmRsbDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwXCI+QmFzZTogMHg3RkZGNkExMDAwMDA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXIgcHktMC41IGJvcmRlci1iIGJvcmRlci1zbGF0ZS05MDBcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMzAwXCI+QzpcXFdpbmRvd3NcXFN5c3RlbTMyXFxrZXJuZWwzMi5kbGw8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMFwiPkJhc2U6IDB4N0ZGRjY5ODAwMDAwPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyIHB5LTAuNSBib3JkZXItYiBib3JkZXItc2xhdGUtOTAwXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTMwMFwiPkM6XFxXaW5kb3dzXFxTeXN0ZW0zMlxcdXNlcjMyLmRsbDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwXCI+QmFzZTogMHg3RkZGNjlEMDAwMDA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAge3NlbGVjdGVkUHJvY2Vzc0ZvckRldGFpbHMuaGFzRmx1dHRlckRsbCAmJiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciBweS0wLjUgYmctcmVkLTk1MC80MCBweC0xIHJvdW5kZWQgYm9yZGVyIGJvcmRlci1yZWQtODAwLzQwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcmVkLTMwMCBmb250LWJvbGRcIj5mbHV0dGVyX3dpbmRvd3MuZGxsIChGbHV0dGVyIEVuZ2luZSk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcmVkLTQwMCBmb250LWJvbGRcIj5XWUtSWVRPIE5BS8WBQURLxJg8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogUEUgSGVhZGVyIEhleCBEdW1wIFByZXZpZXcgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTMwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgYmxvY2tcIj5cbiAgICAgICAgICAgICAgICBQb2RnbMSFZCBOYWfFgsOzd2thIFBFIChET1MgJiBOVCBIZWFkZXIgT2Zmc2V0IDB4MDAgLSAweDQwKTpcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTk1MCBwLTMgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LVsxMXB4XSBmb250LW1vbm8gdGV4dC1zbGF0ZS0zMDBcIj5cbiAgICAgICAgICAgICAgICB7c2VsZWN0ZWRQcm9jZXNzRm9yRGV0YWlscy5zdGF0dXMgPT09ICdwZV9jb3JydXB0ZWQnID8gKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXJvc2UtNDAwIHNwYWNlLXktMVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PjB4MDAwMDAwMDA6IDxzdHJvbmcgY2xhc3NOYW1lPVwiYmctcm9zZS05MDAgcHgtMSB0ZXh0LXdoaXRlXCI+REUgQUQ8L3N0cm9uZz4gMDAgMDAgMDAgMDAgMDAgMDAgMDAgMDAgMDAgMDAgMDAgMDAgMDAgMDAgIFsuLlNBQk9UQUdFRC4uXTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PjB4MDAwMDAwM0M6IDxzdHJvbmcgY2xhc3NOYW1lPVwiYmctcm9zZS05MDAgcHgtMSB0ZXh0LXdoaXRlXCI+MDAgMDAgMDAgMDA8L3N0cm9uZz4gKGVfbGZhbmV3IG51bGxpZmllZCAmcmFycjsgUEUgTG9hZGVyIFJlamVjdCAweEMwMDAwMDdCKTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xIHRleHQtZW1lcmFsZC00MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj4weDAwMDAwMDAwOiA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtd2hpdGUgYmctZW1lcmFsZC05NTAgcHgtMVwiPjREIDVBPC9zdHJvbmc+IDkwIDAwIDAzIDAwIDAwIDAwIDA0IDAwIDAwIDAwIEZGIEZGIDAwIDAwICBbTVouLi4uLi4uLi4uLi4uLl08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj4weDAwMDAwMDNDOiA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtd2hpdGUgYmctZW1lcmFsZC05NTAgcHgtMVwiPkU4IDAwIDAwIDAwPC9zdHJvbmc+IChlX2xmYW5ldyBwb2ludGVyIHRvIE5UIEhlYWRlcnMgJmFwb3M7UEVcXDBcXDAmYXBvczspPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogTW9kYWwgQWN0aW9ucyAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtMyBib3JkZXItdCBib3JkZXItc2xhdGUtODAwIGZsZXgganVzdGlmeS1lbmQgc3BhY2UteC0yXCI+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTZWxlY3RlZFByb2Nlc3NGb3JEZXRhaWxzKG51bGwpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMiBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQtd2hpdGUgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtc2VtaWJvbGRcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgWmFta25palxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUF3aUJRO0FBeGlCUixTQUFnQixVQUFVLGlCQUF5QjtBQUNuRDtBQUFBLEVBQ0U7QUFBQSxFQUFVO0FBQUEsRUFBSztBQUFBLEVBQVc7QUFBQSxFQUFhO0FBQUEsRUFBb0I7QUFBQSxFQUFNO0FBQUEsRUFDdEQ7QUFBQSxFQUFNO0FBQUEsRUFBbUI7QUFBQSxFQUNwQztBQUFBLEVBQThDO0FBQUEsRUFBa0I7QUFBQSxFQUM5QjtBQUFBLEVBQWdDO0FBQUEsT0FDN0Q7QUFFUCxTQUFTLG9CQUFvQjtBQUM3QixTQUFTLCtCQUErQjtBQU1qQyxhQUFNLGtCQUFrRCxDQUFDLEVBQUUsaUJBQWlCLE1BQU07QUFFdkYsUUFBTSxDQUFDLFdBQVcsWUFBWSxJQUFJLFNBQTZCLE1BQU07QUFDbkUsUUFBSSxvQkFBb0IsaUJBQWlCLFNBQVMsR0FBRztBQUNuRCxhQUFPLGlCQUFpQixJQUFJLENBQUMsT0FBTztBQUFBLFFBQ2xDLEdBQUc7QUFBQSxRQUNILFlBQVksRUFBRSxlQUFlLEVBQUUsWUFBWSxPQUFPLEVBQUUsa0JBQWtCLE9BQU87QUFBQSxRQUM3RSxVQUFVLEVBQUUsYUFBYSxFQUFFLFlBQVksUUFBUSxFQUFFLGtCQUFrQixPQUFPO0FBQUEsUUFDMUUsY0FBYyxFQUFFLGlCQUFpQixFQUFFLFlBQVksS0FBSyxFQUFFLGtCQUFrQixJQUFJO0FBQUEsUUFDNUUsY0FBYyxFQUFFLGlCQUFpQixFQUFFLFlBQVksTUFBTSxFQUFFLGtCQUFrQixLQUFLO0FBQUEsUUFDOUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxZQUFZLFFBQVEsRUFBRSxrQkFBa0IsT0FBTztBQUFBLFFBQzFFLGVBQWUsRUFBRSxrQkFBa0IsRUFBRSxZQUFZLFNBQVM7QUFBQSxRQUMxRCxZQUFZLEVBQUUsY0FBYyxDQUFD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