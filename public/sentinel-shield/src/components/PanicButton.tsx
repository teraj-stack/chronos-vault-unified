import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"];
import {
  AlertOctagon,
  ShieldAlert,
  Lock,
  Terminal,
  Copy,
  Check,
  Download,
  Play,
  X,
  Radio,
  Skull,
  Cpu
} from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import { downloadFile } from "/sentinel-shield/src/utils/offlinePackageExporter.ts";
export const PanicButton = ({
  isMinimalLoadingMode = false,
  onNavigateToTab
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFloating, setShowFloating] = useState(true);
  const [copiedKey, setCopiedKey] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeOSFilter, setActiveOSFilter] = useState("all");
  const [targetProcesses, setTargetProcesses] = useState([
    {
      pid: 8932,
      name: "flutter_runner.exe",
      os: "windows",
      technique: "ntdll.NtSuspendProcess(hProcess) [0x0800]",
      status: "active",
      cpu: 46.8
    },
    {
      pid: 3840,
      name: "dropper_watchdog.exe",
      os: "windows",
      technique: "kernel32.SuspendThread / NtSuspendProcess",
      status: "active",
      cpu: 15.2
    },
    {
      pid: 14209,
      name: "flutter_linux_lock",
      os: "linux",
      technique: "kill -19 (SIGSTOP) / pkill -STOP -f flutter",
      status: "active",
      cpu: 38.4
    },
    {
      pid: 9281,
      name: "FlutterMacOS.app/Contents/MacOS/flutter",
      os: "macos",
      technique: 'kill -19 / killall -STOP "FlutterMacOS"',
      status: "active",
      cpu: 29.1
    }
  ]);
  const [panicLogs, setPanicLogs] = useState([
    "[*] System gotowości PANIC BUTTON uzbrojony (Multi-OS Kernel Thread Freezing).",
    "[*] Wykryto 4 procesy powiązane z silnikiem Flutter na Windows / Linux / macOS.",
    "[*] Gotowy do natychmiastowego wywołania NtSuspendProcess / SIGSTOP (Signal 19)."
  ]);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.altKey && e.key.toLowerCase() === "p") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);
  const addLog = (msg) => {
    setPanicLogs((prev) => [...prev.slice(-20), `[${(/* @__PURE__ */ new Date()).toLocaleTimeString()}] ${msg}`]);
  };
  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2e3);
  };
  const triggerMultiOsPanicSuspend = () => {
    setIsExecuting(true);
    addLog("🚨 [PANIC TRIGGERED] Rozpoczęto natychmiastową procedurę awaryjnego zamrażania (Emergency Freeze)...");
    addLog("⚡ [WINDOWS] Ładowanie ntdll.dll -> NtSuspendProcess dla wszystkich procesów z flutter_windows.dll...");
    addLog("⚡ [LINUX] Wysyłanie sygnału SIGSTOP (kill -19) do grupy pgrep -f flutter...");
    addLog("⚡ [MACOS] Wywoływanie killall -STOP / signal.SIGSTOP dla procesów Quartz Flutter...");
    setTargetProcesses(
      (prev) => prev.map((p) => ({
        ...p,
        status: "suspending"
      }))
    );
    setTimeout(() => {
      setTargetProcesses(
        (prev) => prev.map((p) => ({
          ...p,
          status: "frozen",
          cpu: 0
        }))
      );
      setIsExecuting(false);
      addLog("❄️ [SUKCES] Wszystkie 4 procesy Flutter zostały ZAMROŻONE W RAM (0% CPU, stan: T / SUSPENDED)!");
      addLog("🔒 Kursor i klawiatura odzyskane. Pamięć RAM zachowana do analizy kryminalistycznej.");
    }, 600);
  };
  const handleResumeProcesses = () => {
    addLog("▶️ [RESUME] Przywracanie procesów (NtResumeProcess / kill -CONT 18)...");
    setTargetProcesses(
      (prev) => prev.map((p) => ({
        ...p,
        status: "resumed",
        cpu: p.os === "windows" ? 32.5 : 20
      }))
    );
    setTimeout(() => {
      addLog("⚠️ Procesy wznowiły wykonywanie instrukcji.");
    }, 400);
  };
  const handleKillAll = () => {
    addLog("💥 [HARD KILL] TerminateProcess / kill -9 SIGKILL dla wszystkich procesów!");
    setTargetProcesses(
      (prev) => prev.map((p) => ({
        ...p,
        status: "frozen",
        cpu: 0,
        technique: "TERMINATED (SIGKILL / 0x0001)"
      }))
    );
  };
  const exportMultiOsPanicScript = () => {
    const pythonCode = `"""
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

        # Wyszukiwanie procesów Flutter za pomocą tasklist
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
            # Użycie pgrep do namierzenia PIDów
            pids_raw = subprocess.check_output(['pgrep', '-f', pattern], text=True, errors='ignore')
            pids = [int(p) for p in pids_raw.strip().split() if p.isdigit()]

            for pid in pids:
                if pid == os.getpid():
                    continue # Nie zamrażaj samego siebie
                try:
                    os.kill(pid, signal.SIGSTOP) # Sygnał 19 (Wstrzymanie)
                    print(f"  [✓] kill -STOP (PID={pid}, wzorzec='{pattern}') -> Wątki zatrzymane przez scheduler jądra!")
                    suspended_count += 1
                except PermissionError:
                    print(f"  [X] Wymagany root / sudo dla PID {pid}!")
                except ProcessLookupError:
                    pass
        except subprocess.CalledProcessError:
            # Brak procesów dla danego wzorca
            pass

    # Szybka komenda powłoki w celach redundancji
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
`;
    downloadFile("emergency_panic_suspend.py", pythonCode, "text/x-python");
    addLog("✔ [EXPORT] Pobrano uniwersalny skrypt: emergency_panic_suspend.py (Python Multi-OS)");
  };
  const commandSnippets = {
    windows_ctypes: `python -c "import ctypes; h=ctypes.windll.kernel32.OpenProcess(0x0800,0,PID); ctypes.windll.ntdll.NtSuspendProcess(h)"`,
    windows_cmd: `taskkill /F /IM flutter_runner.exe /T`,
    windows_ps: `Get-Process *flutter* | ForEach-Object { $h=[System.Diagnostics.Process]::GetProcessById($_.Id).Handle; [IntPtr]$ptr=$h; [Native]::NtSuspendProcess($ptr) }`,
    linux_sigstop: `pkill -STOP -f flutter || kill -19 $(pgrep -f flutter)`,
    linux_gdb: `gdb -p $(pgrep -f flutter | head -n1) -batch -ex "call (void)pause()"`,
    macos_sigstop: `killall -STOP "flutter_runner" || pkill -19 -f "Flutter"`
  };
  const frozenCount = targetProcesses.filter((p) => p.status === "frozen").length;
  if (isMinimalLoadingMode) {
    return null;
  }
  return /* @__PURE__ */ jsxDEV(Fragment, { children: [
    showFloating ? /* @__PURE__ */ jsxDEV("div", { className: "fixed bottom-6 right-6 z-40 flex items-center space-x-2", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "hidden lg:flex items-center space-x-1.5 px-3 py-1.5 bg-slate-900/90 backdrop-blur-md border border-red-500/40 text-white rounded-xl shadow-xl text-xs font-mono", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-red-500 animate-ping" }, void 0, false, {
          fileName: "/app/applet/src/components/PanicButton.tsx",
          lineNumber: 316,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "text-red-400 font-bold", children: "PANIC BUTTON:" }, void 0, false, {
          fileName: "/app/applet/src/components/PanicButton.tsx",
          lineNumber: 317,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("kbd", { className: "px-1.5 py-0.5 bg-slate-950 border border-slate-700 rounded text-[10px] text-slate-300", children: "Ctrl+Alt+P" }, void 0, false, {
          fileName: "/app/applet/src/components/PanicButton.tsx",
          lineNumber: 318,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PanicButton.tsx",
        lineNumber: 315,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setIsOpen(true),
          className: "group relative flex items-center justify-center p-3 sm:px-4 sm:py-3 bg-zinc-950/95 hover:bg-zinc-900 text-rose-300 hover:text-white rounded-2xl shadow-2xl border border-rose-500/40 hover:border-rose-400 transform hover:-translate-y-0.5 active:translate-y-0.5 transition-all duration-200 cursor-pointer backdrop-blur-xl",
          title: "Przycisk Paniki: Natychmiastowe zamrożenie procesów (NtSuspendProcess / SIGSTOP 19)",
          children: [
            /* @__PURE__ */ jsxDEV("span", { className: "absolute -inset-0.5 rounded-2xl bg-rose-500/10 blur-sm group-hover:bg-rose-500/20 transition-all pointer-events-none" }, void 0, false, {
              fileName: "/app/applet/src/components/PanicButton.tsx",
              lineNumber: 330,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "relative flex items-center space-x-2.5", children: [
              /* @__PURE__ */ jsxDEV(AlertOctagon, { className: "w-5 h-5 text-rose-400 shrink-0" }, void 0, false, {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 333,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-left hidden sm:block", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-bold tracking-wider uppercase leading-none font-mono text-slate-100", children: "PANIC FREEZE" }, void 0, false, {
                  fileName: "/app/applet/src/components/PanicButton.tsx",
                  lineNumber: 335,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400 font-mono font-medium leading-tight mt-0.5", children: "Multi-OS RAM Lock" }, void 0, false, {
                  fileName: "/app/applet/src/components/PanicButton.tsx",
                  lineNumber: 338,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 334,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PanicButton.tsx",
              lineNumber: 332,
              columnNumber: 13
            }, this),
            frozenCount > 0 && /* @__PURE__ */ jsxDEV("span", { className: "absolute -top-2 -right-2 bg-zinc-900 border border-rose-500 text-rose-300 text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full shadow-lg", children: [
              frozenCount,
              " ❄️"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PanicButton.tsx",
              lineNumber: 346,
              columnNumber: 15
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/PanicButton.tsx",
          lineNumber: 324,
          columnNumber: 11
        },
        this
      ),
      onNavigateToTab && /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => onNavigateToTab("panic"),
          className: "p-2 rounded-xl bg-zinc-950/90 hover:bg-zinc-900 border border-white/10 text-slate-400 hover:text-slate-200 text-xs font-mono font-medium cursor-pointer transition-all",
          title: "Otwórz pełną podstronę Panic Button",
          children: "Pełna Podstrona ↗"
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/PanicButton.tsx",
          lineNumber: 354,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setShowFloating(false),
          className: "p-1.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-slate-500 hover:text-slate-300 text-xs font-mono font-medium cursor-pointer border border-white/5 transition-all",
          title: "Zwiń przycisk paniki",
          children: "✕"
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/PanicButton.tsx",
          lineNumber: 364,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/PanicButton.tsx",
      lineNumber: 313,
      columnNumber: 9
    }, this) : /* @__PURE__ */ jsxDEV(
      "button",
      {
        onClick: () => setShowFloating(true),
        className: "fixed bottom-6 right-6 z-40 px-3.5 py-2 rounded-xl bg-zinc-950/90 hover:bg-zinc-900 border border-rose-500/40 text-rose-300 font-mono text-xs font-medium shadow-2xl cursor-pointer transition-all",
        title: "Pokaż Przycisk Paniki",
        children: /* @__PURE__ */ jsxDEV("span", { children: "🚨 Panic Freeze" }, void 0, false, {
          fileName: "/app/applet/src/components/PanicButton.tsx",
          lineNumber: 378,
          columnNumber: 11
        }, this)
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/components/PanicButton.tsx",
        lineNumber: 373,
        columnNumber: 9
      },
      this
    ),
    isOpen && /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-zinc-950 border border-white/10 rounded-3xl max-w-4xl w-full p-5 sm:p-7 shadow-2xl shadow-black space-y-5 my-auto relative", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-start justify-between pb-4 border-b border-white/10 gap-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-zinc-900 border border-rose-500/30 rounded-2xl text-rose-400 shadow-md", children: /* @__PURE__ */ jsxDEV(AlertOctagon, { className: "w-7 h-7" }, void 0, false, {
            fileName: "/app/applet/src/components/PanicButton.tsx",
            lineNumber: 393,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/PanicButton.tsx",
            lineNumber: 392,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV("h2", { className: "text-lg sm:text-xl font-bold text-white font-mono tracking-wider uppercase", children: "MULTI-OS PANIC COMMAND SEQUENCER" }, void 0, false, {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 397,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-0.5 bg-zinc-900 border border-rose-500/40 text-rose-300 rounded-full text-[10px] font-mono font-medium uppercase", children: "RAM FREEZE" }, void 0, false, {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 400,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PanicButton.tsx",
              lineNumber: 396,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 mt-0.5", children: [
              "Błyskawiczne zawieszenie wątków w RAM (",
              /* @__PURE__ */ jsxDEV("code", { className: "text-amber-400 font-mono", children: "NtSuspendProcess" }, void 0, false, {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 405,
                columnNumber: 60
              }, this),
              " na Windows, ",
              /* @__PURE__ */ jsxDEV("code", { className: "text-cyan-400 font-mono", children: "SIGSTOP Signal 19" }, void 0, false, {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 405,
                columnNumber: 139
              }, this),
              " na Linux/macOS)."
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PanicButton.tsx",
              lineNumber: 404,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PanicButton.tsx",
            lineNumber: 395,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PanicButton.tsx",
          lineNumber: 391,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
          onNavigateToTab && /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => {
                setIsOpen(false);
                onNavigateToTab("panic");
              },
              className: "px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-slate-300 text-xs font-mono font-medium flex items-center gap-1 cursor-pointer transition-all",
              title: "Przejdź do pełnej podstrony",
              children: /* @__PURE__ */ jsxDEV("span", { children: "Pełna Podstrona ↗" }, void 0, false, {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 420,
                columnNumber: 21
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/PanicButton.tsx",
              lineNumber: 412,
              columnNumber: 19
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setIsOpen(false),
              className: "p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-slate-400 hover:text-white border border-white/10 transition-all cursor-pointer",
              title: "Zamknij [Esc]",
              children: /* @__PURE__ */ jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 428,
                columnNumber: 19
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/PanicButton.tsx",
              lineNumber: 423,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PanicButton.tsx",
          lineNumber: 410,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PanicButton.tsx",
        lineNumber: 390,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 p-4 sm:p-5 rounded-2xl border border-white/10 shadow-inner flex flex-col sm:flex-row items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 text-center sm:text-left", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono font-bold text-rose-300 uppercase flex items-center gap-1.5 justify-center sm:justify-start", children: [
            /* @__PURE__ */ jsxDEV(Radio, { className: "w-3.5 h-3.5 text-rose-400" }, void 0, false, {
              fileName: "/app/applet/src/components/PanicButton.tsx",
              lineNumber: 437,
              columnNumber: 19
            }, this),
            "Tryb Natychmiastowego Unieruchomienia Procesów"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PanicButton.tsx",
            lineNumber: 436,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 max-w-xl", children: "Jednoczesne wstrzymanie cykli CPU bez ubijania procesu. Uwalnia kursor myszy i klawiaturę, uniemożliwiając nakładce przechwytywanie zdarzeń systemowych." }, void 0, false, {
            fileName: "/app/applet/src/components/PanicButton.tsx",
            lineNumber: 440,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PanicButton.tsx",
          lineNumber: 435,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end", children: /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: triggerMultiOsPanicSuspend,
            disabled: isExecuting,
            className: "w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-rose-200 hover:text-white font-mono font-bold text-sm rounded-2xl shadow-xl border border-rose-500/40 hover:border-rose-400 active:translate-y-0.5 transition-all cursor-pointer",
            children: [
              /* @__PURE__ */ jsxDEV(Lock, { className: `w-4 h-4 ${isExecuting ? "animate-spin" : ""}` }, void 0, false, {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 451,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: isExecuting ? "ZAMRAŻANIE W TOKU..." : "❄️ ZAMROŹ WSZYSTKIE (PANIC FREEZE)" }, void 0, false, {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 452,
                columnNumber: 19
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/PanicButton.tsx",
            lineNumber: 446,
            columnNumber: 17
          },
          this
        ) }, void 0, false, {
          fileName: "/app/applet/src/components/PanicButton.tsx",
          lineNumber: 445,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PanicButton.tsx",
        lineNumber: 434,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(Cpu, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
              fileName: "/app/applet/src/components/PanicButton.tsx",
              lineNumber: 461,
              columnNumber: 19
            }, this),
            "Wykryte Procesy Docelowe (Windows, Linux, macOS):"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PanicButton.tsx",
            lineNumber: 460,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: handleResumeProcesses,
                className: "px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-all flex items-center gap-1",
                title: "Wznów wykonywanie wątków (SIGCONT / NtResumeProcess)",
                children: [
                  /* @__PURE__ */ jsxDEV(Play, { className: "w-3 h-3 text-emerald-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/PanicButton.tsx",
                    lineNumber: 472,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Wznów" }, void 0, false, {
                    fileName: "/app/applet/src/components/PanicButton.tsx",
                    lineNumber: 473,
                    columnNumber: 21
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 467,
                columnNumber: 19
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: handleKillAll,
                className: "px-2.5 py-1 rounded-lg bg-red-950 hover:bg-red-800 text-red-200 text-xs font-mono transition-all flex items-center gap-1 border border-red-800/60",
                title: "Trwale zabij wszystkie procesy (TerminateProcess / SIGKILL)",
                children: [
                  /* @__PURE__ */ jsxDEV(Skull, { className: "w-3 h-3 text-red-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/PanicButton.tsx",
                    lineNumber: 481,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Ubój Trwały" }, void 0, false, {
                    fileName: "/app/applet/src/components/PanicButton.tsx",
                    lineNumber: 482,
                    columnNumber: 21
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 476,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PanicButton.tsx",
            lineNumber: 466,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PanicButton.tsx",
          lineNumber: 459,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: targetProcesses.map((proc) => {
          const isFrozen = proc.status === "frozen";
          const isSuspending = proc.status === "suspending";
          return /* @__PURE__ */ jsxDEV(
            "div",
            {
              className: `p-3 rounded-xl border transition-all ${isFrozen ? "bg-purple-950/40 border-purple-600/80 shadow-lg shadow-purple-950/30" : isSuspending ? "bg-red-950/40 border-red-500 animate-pulse" : "bg-slate-950 border-slate-800"}`,
              children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "truncate", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "font-mono font-bold text-xs text-white truncate", children: proc.name }, void 0, false, {
                      fileName: "/app/applet/src/components/PanicButton.tsx",
                      lineNumber: 506,
                      columnNumber: 29
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-900 text-slate-300 border border-slate-800", children: [
                      "PID: ",
                      proc.pid
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/PanicButton.tsx",
                      lineNumber: 509,
                      columnNumber: 29
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/PanicButton.tsx",
                    lineNumber: 505,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400 font-mono block truncate mt-0.5", children: proc.technique }, void 0, false, {
                    fileName: "/app/applet/src/components/PanicButton.tsx",
                    lineNumber: 513,
                    columnNumber: 27
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PanicButton.tsx",
                  lineNumber: 504,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-end gap-1 flex-shrink-0", children: [
                  /* @__PURE__ */ jsxDEV(
                    "span",
                    {
                      className: `text-[9px] font-mono font-black uppercase px-1.5 py-0.5 rounded border ${proc.os === "windows" ? "bg-blue-950 text-blue-300 border-blue-800" : proc.os === "linux" ? "bg-amber-950 text-amber-300 border-amber-800" : "bg-pink-950 text-pink-300 border-pink-800"}`,
                      children: proc.os
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/PanicButton.tsx",
                      lineNumber: 520,
                      columnNumber: 27
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV(
                    "span",
                    {
                      className: `text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${isFrozen ? "bg-purple-900 text-purple-200 border border-purple-600" : "bg-red-900/60 text-red-200"}`,
                      children: isFrozen ? "❄️ ZAMROŻONY (0%)" : `${proc.cpu}% CPU`
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/PanicButton.tsx",
                      lineNumber: 532,
                      columnNumber: 27
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PanicButton.tsx",
                  lineNumber: 519,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 503,
                columnNumber: 23
              }, this)
            },
            proc.pid,
            false,
            {
              fileName: "/app/applet/src/components/PanicButton.tsx",
              lineNumber: 493,
              columnNumber: 21
            },
            this
          );
        }) }, void 0, false, {
          fileName: "/app/applet/src/components/PanicButton.tsx",
          lineNumber: 487,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PanicButton.tsx",
        lineNumber: 458,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxDEV(Terminal, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
              fileName: "/app/applet/src/components/PanicButton.tsx",
              lineNumber: 553,
              columnNumber: 19
            }, this),
            "Polecenia Natychmiastowe do Skopiowania w Terminalu:"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PanicButton.tsx",
            lineNumber: 552,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: exportMultiOsPanicScript,
              className: "px-2.5 py-1 bg-purple-700 hover:bg-purple-600 text-white rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow",
              title: "Pobierz uniwersalny skrypt Pythona emergency_panic_suspend.py",
              children: [
                /* @__PURE__ */ jsxDEV(Download, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/PanicButton.tsx",
                  lineNumber: 562,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Pobierz Skrypt .py (Multi-OS)" }, void 0, false, {
                  fileName: "/app/applet/src/components/PanicButton.tsx",
                  lineNumber: 563,
                  columnNumber: 19
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/PanicButton.tsx",
              lineNumber: 557,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PanicButton.tsx",
          lineNumber: 551,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-1 border-b border-slate-800 pb-1 text-xs", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setActiveOSFilter("all"),
              className: `px-3 py-1 rounded-t-lg font-mono transition-all ${activeOSFilter === "all" ? "bg-slate-800 text-white font-bold" : "text-slate-400 hover:text-white"}`,
              children: "Wszystkie OS"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/PanicButton.tsx",
              lineNumber: 569,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setActiveOSFilter("windows"),
              className: `px-3 py-1 rounded-t-lg font-mono transition-all ${activeOSFilter === "windows" ? "bg-blue-900/60 text-blue-300 font-bold border-b-2 border-blue-500" : "text-slate-400 hover:text-white"}`,
              children: "Windows (ctypes / CMD)"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/PanicButton.tsx",
              lineNumber: 577,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setActiveOSFilter("linux"),
              className: `px-3 py-1 rounded-t-lg font-mono transition-all ${activeOSFilter === "linux" ? "bg-amber-900/60 text-amber-300 font-bold border-b-2 border-amber-500" : "text-slate-400 hover:text-white"}`,
              children: "Linux (kill -19 / pkill)"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/PanicButton.tsx",
              lineNumber: 585,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setActiveOSFilter("macos"),
              className: `px-3 py-1 rounded-t-lg font-mono transition-all ${activeOSFilter === "macos" ? "bg-pink-900/60 text-pink-300 font-bold border-b-2 border-pink-500" : "text-slate-400 hover:text-white"}`,
              children: "macOS (killall -STOP)"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/PanicButton.tsx",
              lineNumber: 593,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PanicButton.tsx",
          lineNumber: 568,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 max-h-48 overflow-y-auto pr-1", children: [
          (activeOSFilter === "all" || activeOSFilter === "windows") && /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between gap-2 text-xs font-mono", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "truncate", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-blue-400 font-bold mr-2", children: "[Windows ctypes]" }, void 0, false, {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 608,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("code", { className: "text-slate-200", children: commandSnippets.windows_ctypes }, void 0, false, {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 609,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PanicButton.tsx",
              lineNumber: 607,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => handleCopy(commandSnippets.windows_ctypes, "win_ctypes"),
                className: "p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-700 flex-shrink-0",
                title: "Kopiuj",
                children: copiedKey === "win_ctypes" ? /* @__PURE__ */ jsxDEV(Check, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/PanicButton.tsx",
                  lineNumber: 616,
                  columnNumber: 53
                }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/PanicButton.tsx",
                  lineNumber: 616,
                  columnNumber: 106
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 611,
                columnNumber: 21
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PanicButton.tsx",
            lineNumber: 606,
            columnNumber: 19
          }, this),
          (activeOSFilter === "all" || activeOSFilter === "windows") && /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between gap-2 text-xs font-mono", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "truncate", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-blue-400 font-bold mr-2", children: "[Windows CMD]" }, void 0, false, {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 624,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("code", { className: "text-slate-200", children: commandSnippets.windows_cmd }, void 0, false, {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 625,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PanicButton.tsx",
              lineNumber: 623,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => handleCopy(commandSnippets.windows_cmd, "win_cmd"),
                className: "p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-700 flex-shrink-0",
                title: "Kopiuj",
                children: copiedKey === "win_cmd" ? /* @__PURE__ */ jsxDEV(Check, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/PanicButton.tsx",
                  lineNumber: 632,
                  columnNumber: 50
                }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/PanicButton.tsx",
                  lineNumber: 632,
                  columnNumber: 103
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 627,
                columnNumber: 21
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PanicButton.tsx",
            lineNumber: 622,
            columnNumber: 19
          }, this),
          (activeOSFilter === "all" || activeOSFilter === "linux") && /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between gap-2 text-xs font-mono", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "truncate", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-amber-400 font-bold mr-2", children: "[Linux SIGSTOP (19)]" }, void 0, false, {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 640,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("code", { className: "text-slate-200", children: commandSnippets.linux_sigstop }, void 0, false, {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 641,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PanicButton.tsx",
              lineNumber: 639,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => handleCopy(commandSnippets.linux_sigstop, "linux_sigstop"),
                className: "p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-700 flex-shrink-0",
                title: "Kopiuj",
                children: copiedKey === "linux_sigstop" ? /* @__PURE__ */ jsxDEV(Check, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/PanicButton.tsx",
                  lineNumber: 648,
                  columnNumber: 56
                }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/PanicButton.tsx",
                  lineNumber: 648,
                  columnNumber: 109
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 643,
                columnNumber: 21
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PanicButton.tsx",
            lineNumber: 638,
            columnNumber: 19
          }, this),
          (activeOSFilter === "all" || activeOSFilter === "macos") && /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between gap-2 text-xs font-mono", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "truncate", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-pink-400 font-bold mr-2", children: "[macOS Terminal]" }, void 0, false, {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 656,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("code", { className: "text-slate-200", children: commandSnippets.macos_sigstop }, void 0, false, {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 657,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PanicButton.tsx",
              lineNumber: 655,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => handleCopy(commandSnippets.macos_sigstop, "macos_sigstop"),
                className: "p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-700 flex-shrink-0",
                title: "Kopiuj",
                children: copiedKey === "macos_sigstop" ? /* @__PURE__ */ jsxDEV(Check, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/PanicButton.tsx",
                  lineNumber: 664,
                  columnNumber: 56
                }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/PanicButton.tsx",
                  lineNumber: 664,
                  columnNumber: 109
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 659,
                columnNumber: 21
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PanicButton.tsx",
            lineNumber: 654,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PanicButton.tsx",
          lineNumber: 604,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PanicButton.tsx",
        lineNumber: 550,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] font-mono space-y-1 h-28 overflow-y-auto", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-slate-500 pb-1 border-b border-slate-900 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "Dziennik Reakcji Jądra (Kernel Thread Freeze Log):" }, void 0, false, {
            fileName: "/app/applet/src/components/PanicButton.tsx",
            lineNumber: 674,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400", children: "READY" }, void 0, false, {
            fileName: "/app/applet/src/components/PanicButton.tsx",
            lineNumber: 675,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PanicButton.tsx",
          lineNumber: 673,
          columnNumber: 15
        }, this),
        panicLogs.map((log, index) => /* @__PURE__ */ jsxDEV(
          "div",
          {
            className: log.includes("TRIGGER") || log.includes("PANIC") ? "text-red-400 font-bold" : log.includes("SUKCES") || log.includes("EXPORT") ? "text-emerald-400 font-bold" : log.includes("WINDOWS") || log.includes("LINUX") || log.includes("MACOS") ? "text-cyan-300" : "text-slate-400",
            children: log
          },
          index,
          false,
          {
            fileName: "/app/applet/src/components/PanicButton.tsx",
            lineNumber: 678,
            columnNumber: 17
          },
          this
        ))
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PanicButton.tsx",
        lineNumber: 672,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs text-slate-400", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsxDEV(ShieldAlert, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
            fileName: "/app/applet/src/components/PanicButton.tsx",
            lineNumber: 698,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Zachowuje stan RAM do zrzutu kryminalistycznego (MiniDumpWriteDump / GDB Core Dump)." }, void 0, false, {
            fileName: "/app/applet/src/components/PanicButton.tsx",
            lineNumber: 699,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PanicButton.tsx",
          lineNumber: 697,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setIsOpen(false),
            className: "px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-mono font-medium transition-all",
            children: "Zamknij [Esc]"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/PanicButton.tsx",
            lineNumber: 701,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PanicButton.tsx",
        lineNumber: 696,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/PanicButton.tsx",
      lineNumber: 387,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/PanicButton.tsx",
      lineNumber: 386,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/PanicButton.tsx",
    lineNumber: 308,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBhbmljQnV0dG9uLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFxuICBBbGVydE9jdGFnb24sIFNoaWVsZEFsZXJ0LCBaYXAsIExvY2ssIFRlcm1pbmFsLCBDb3B5LCBDaGVjaywgXG4gIERvd25sb2FkLCBQbGF5LCBSZWZyZXNoQ3csIFgsIFJhZGlvLCBBcnJvd1JpZ2h0LCBTa3VsbCwgXG4gIEZsYW1lLCBNb25pdG9yLCBDaGVja0NpcmNsZTIsIENoZXZyb25SaWdodCwgQ29ybmVyRG93blJpZ2h0LFxuICBIYXJkRHJpdmUsIENwdVxufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgZG93bmxvYWRGaWxlIH0gZnJvbSAnLi4vdXRpbHMvb2ZmbGluZVBhY2thZ2VFeHBvcnRlcic7XG5cbmludGVyZmFjZSBQYW5pY1Byb2Nlc3NUYXJnZXQge1xuICBwaWQ6IG51bWJlcjtcbiAgbmFtZTogc3RyaW5nO1xuICBvczogJ3dpbmRvd3MnIHwgJ2xpbnV4JyB8ICdtYWNvcyc7XG4gIHRlY2huaXF1ZTogc3RyaW5nO1xuICBzdGF0dXM6ICdhY3RpdmUnIHwgJ3N1c3BlbmRpbmcnIHwgJ2Zyb3plbicgfCAncmVzdW1lZCc7XG4gIGNwdTogbnVtYmVyO1xufVxuXG5pbnRlcmZhY2UgUGFuaWNCdXR0b25Qcm9wcyB7XG4gIGlzTWluaW1hbExvYWRpbmdNb2RlPzogYm9vbGVhbjtcbiAgb25OYXZpZ2F0ZVRvVGFiPzogKHRhYjogc3RyaW5nKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgY29uc3QgUGFuaWNCdXR0b246IFJlYWN0LkZDPFBhbmljQnV0dG9uUHJvcHM+ID0gKHtcbiAgaXNNaW5pbWFsTG9hZGluZ01vZGUgPSBmYWxzZSxcbiAgb25OYXZpZ2F0ZVRvVGFiLFxufSkgPT4ge1xuICBjb25zdCBbaXNPcGVuLCBzZXRJc09wZW5dID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuICBjb25zdCBbc2hvd0Zsb2F0aW5nLCBzZXRTaG93RmxvYXRpbmddID0gdXNlU3RhdGU8Ym9vbGVhbj4odHJ1ZSk7XG4gIGNvbnN0IFtjb3BpZWRLZXksIHNldENvcGllZEtleV0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2lzRXhlY3V0aW5nLCBzZXRJc0V4ZWN1dGluZ10gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gIGNvbnN0IFthY3RpdmVPU0ZpbHRlciwgc2V0QWN0aXZlT1NGaWx0ZXJdID0gdXNlU3RhdGU8J2FsbCcgfCAnd2luZG93cycgfCAnbGludXgnIHwgJ21hY29zJz4oJ2FsbCcpO1xuICBcbiAgLy8gU2ltdWxhdGVkIHByb2Nlc3NlcyB0YXJnZXQgbGlzdCBmb3IgUGFuaWMgRnJlZXplXG4gIGNvbnN0IFt0YXJnZXRQcm9jZXNzZXMsIHNldFRhcmdldFByb2Nlc3Nlc10gPSB1c2VTdGF0ZTxQYW5pY1Byb2Nlc3NUYXJnZXRbXT4oW1xuICAgIHtcbiAgICAgIHBpZDogODkzMixcbiAgICAgIG5hbWU6ICdmbHV0dGVyX3J1bm5lci5leGUnLFxuICAgICAgb3M6ICd3aW5kb3dzJyxcbiAgICAgIHRlY2huaXF1ZTogJ250ZGxsLk50U3VzcGVuZFByb2Nlc3MoaFByb2Nlc3MpIFsweDA4MDBdJyxcbiAgICAgIHN0YXR1czogJ2FjdGl2ZScsXG4gICAgICBjcHU6IDQ2LjgsXG4gICAgfSxcbiAgICB7XG4gICAgICBwaWQ6IDM4NDAsXG4gICAgICBuYW1lOiAnZHJvcHBlcl93YXRjaGRvZy5leGUnLFxuICAgICAgb3M6ICd3aW5kb3dzJyxcbiAgICAgIHRlY2huaXF1ZTogJ2tlcm5lbDMyLlN1c3BlbmRUaHJlYWQgLyBOdFN1c3BlbmRQcm9jZXNzJyxcbiAgICAgIHN0YXR1czogJ2FjdGl2ZScsXG4gICAgICBjcHU6IDE1LjIsXG4gICAgfSxcbiAgICB7XG4gICAgICBwaWQ6IDE0MjA5LFxuICAgICAgbmFtZTogJ2ZsdXR0ZXJfbGludXhfbG9jaycsXG4gICAgICBvczogJ2xpbnV4JyxcbiAgICAgIHRlY2huaXF1ZTogJ2tpbGwgLTE5IChTSUdTVE9QKSAvIHBraWxsIC1TVE9QIC1mIGZsdXR0ZXInLFxuICAgICAgc3RhdHVzOiAnYWN0aXZlJyxcbiAgICAgIGNwdTogMzguNCxcbiAgICB9LFxuICAgIHtcbiAgICAgIHBpZDogOTI4MSxcbiAgICAgIG5hbWU6ICdGbHV0dGVyTWFjT1MuYXBwL0NvbnRlbnRzL01hY09TL2ZsdXR0ZXInLFxuICAgICAgb3M6ICdtYWNvcycsXG4gICAgICB0ZWNobmlxdWU6ICdraWxsIC0xOSAvIGtpbGxhbGwgLVNUT1AgXCJGbHV0dGVyTWFjT1NcIicsXG4gICAgICBzdGF0dXM6ICdhY3RpdmUnLFxuICAgICAgY3B1OiAyOS4xLFxuICAgIH0sXG4gIF0pO1xuXG4gIGNvbnN0IFtwYW5pY0xvZ3MsIHNldFBhbmljTG9nc10gPSB1c2VTdGF0ZTxzdHJpbmdbXT4oW1xuICAgICdbKl0gU3lzdGVtIGdvdG93b8WbY2kgUEFOSUMgQlVUVE9OIHV6YnJvam9ueSAoTXVsdGktT1MgS2VybmVsIFRocmVhZCBGcmVlemluZykuJyxcbiAgICAnWypdIFd5a3J5dG8gNCBwcm9jZXN5IHBvd2nEhXphbmUgeiBzaWxuaWtpZW0gRmx1dHRlciBuYSBXaW5kb3dzIC8gTGludXggLyBtYWNPUy4nLFxuICAgICdbKl0gR290b3d5IGRvIG5hdHljaG1pYXN0b3dlZ28gd3l3b8WCYW5pYSBOdFN1c3BlbmRQcm9jZXNzIC8gU0lHU1RPUCAoU2lnbmFsIDE5KS4nLFxuICBdKTtcblxuICAvLyBHbG9iYWwgaG90a2V5OiBDdHJsICsgQWx0ICsgUCBvciBFc2NhcGUgdG8gY2xvc2Uvb3BlblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGhhbmRsZUtleURvd24gPSAoZTogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgaWYgKChlLmN0cmxLZXkgfHwgZS5tZXRhS2V5KSAmJiBlLmFsdEtleSAmJiBlLmtleS50b0xvd2VyQ2FzZSgpID09PSAncCcpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBzZXRJc09wZW4oKHByZXYpID0+ICFwcmV2KTtcbiAgICAgIH0gZWxzZSBpZiAoZS5rZXkgPT09ICdFc2NhcGUnICYmIGlzT3Blbikge1xuICAgICAgICBzZXRJc09wZW4oZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGhhbmRsZUtleURvd24pO1xuICAgIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGhhbmRsZUtleURvd24pO1xuICB9LCBbaXNPcGVuXSk7XG5cbiAgY29uc3QgYWRkTG9nID0gKG1zZzogc3RyaW5nKSA9PiB7XG4gICAgc2V0UGFuaWNMb2dzKChwcmV2KSA9PiBbLi4ucHJldi5zbGljZSgtMjApLCBgWyR7bmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoKX1dICR7bXNnfWBdKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVDb3B5ID0gKHRleHQ6IHN0cmluZywga2V5OiBzdHJpbmcpID0+IHtcbiAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dCh0ZXh0KTtcbiAgICBzZXRDb3BpZWRLZXkoa2V5KTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHNldENvcGllZEtleShudWxsKSwgMjAwMCk7XG4gIH07XG5cbiAgLy8gVHJpZ2dlciBJbW1lZGlhdGUgTXVsdGktT1MgU3VzcGVuZCBTZXF1ZW5jZVxuICBjb25zdCB0cmlnZ2VyTXVsdGlPc1BhbmljU3VzcGVuZCA9ICgpID0+IHtcbiAgICBzZXRJc0V4ZWN1dGluZyh0cnVlKTtcbiAgICBhZGRMb2coJ/CfmqggW1BBTklDIFRSSUdHRVJFRF0gUm96cG9jesSZdG8gbmF0eWNobWlhc3Rvd8SFIHByb2NlZHVyxJkgYXdhcnlqbmVnbyB6YW1yYcW8YW5pYSAoRW1lcmdlbmN5IEZyZWV6ZSkuLi4nKTtcbiAgICBcbiAgICAvLyBXaW5kb3dzIGV4ZWN1dGlvbiBsb2dcbiAgICBhZGRMb2coJ+KaoSBbV0lORE9XU10gxYFhZG93YW5pZSBudGRsbC5kbGwgLT4gTnRTdXNwZW5kUHJvY2VzcyBkbGEgd3N6eXN0a2ljaCBwcm9jZXPDs3cgeiBmbHV0dGVyX3dpbmRvd3MuZGxsLi4uJyk7XG4gICAgYWRkTG9nKCfimqEgW0xJTlVYXSBXeXN5xYJhbmllIHN5Z25hxYJ1IFNJR1NUT1AgKGtpbGwgLTE5KSBkbyBncnVweSBwZ3JlcCAtZiBmbHV0dGVyLi4uJyk7XG4gICAgYWRkTG9nKCfimqEgW01BQ09TXSBXeXdvxYJ5d2FuaWUga2lsbGFsbCAtU1RPUCAvIHNpZ25hbC5TSUdTVE9QIGRsYSBwcm9jZXPDs3cgUXVhcnR6IEZsdXR0ZXIuLi4nKTtcblxuICAgIHNldFRhcmdldFByb2Nlc3NlcygocHJldikgPT5cbiAgICAgIHByZXYubWFwKChwKSA9PiAoe1xuICAgICAgICAuLi5wLFxuICAgICAgICBzdGF0dXM6ICdzdXNwZW5kaW5nJyxcbiAgICAgIH0pKVxuICAgICk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHNldFRhcmdldFByb2Nlc3NlcygocHJldikgPT5cbiAgICAgICAgcHJldi5tYXAoKHApID0+ICh7XG4gICAgICAgICAgLi4ucCxcbiAgICAgICAgICBzdGF0dXM6ICdmcm96ZW4nLFxuICAgICAgICAgIGNwdTogMC4wLFxuICAgICAgICB9KSlcbiAgICAgICk7XG4gICAgICBzZXRJc0V4ZWN1dGluZyhmYWxzZSk7XG4gICAgICBhZGRMb2coJ+KdhO+4jyBbU1VLQ0VTXSBXc3p5c3RraWUgNCBwcm9jZXN5IEZsdXR0ZXIgem9zdGHFgnkgWkFNUk/Fu09ORSBXIFJBTSAoMCUgQ1BVLCBzdGFuOiBUIC8gU1VTUEVOREVEKSEnKTtcbiAgICAgIGFkZExvZygn8J+UkiBLdXJzb3IgaSBrbGF3aWF0dXJhIG9kenlza2FuZS4gUGFtacSZxIcgUkFNIHphY2hvd2FuYSBkbyBhbmFsaXp5IGtyeW1pbmFsaXN0eWN6bmVqLicpO1xuICAgIH0sIDYwMCk7XG4gIH07XG5cbiAgLy8gUmVzdW1lIC8gVW5mcmVlemUgdGFyZ2V0IHByb2Nlc3Nlc1xuICBjb25zdCBoYW5kbGVSZXN1bWVQcm9jZXNzZXMgPSAoKSA9PiB7XG4gICAgYWRkTG9nKCfilrbvuI8gW1JFU1VNRV0gUHJ6eXdyYWNhbmllIHByb2Nlc8OzdyAoTnRSZXN1bWVQcm9jZXNzIC8ga2lsbCAtQ09OVCAxOCkuLi4nKTtcbiAgICBzZXRUYXJnZXRQcm9jZXNzZXMoKHByZXYpID0+XG4gICAgICBwcmV2Lm1hcCgocCkgPT4gKHtcbiAgICAgICAgLi4ucCxcbiAgICAgICAgc3RhdHVzOiAncmVzdW1lZCcsXG4gICAgICAgIGNwdTogcC5vcyA9PT0gJ3dpbmRvd3MnID8gMzIuNSA6IDIwLjAsXG4gICAgICB9KSlcbiAgICApO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgYWRkTG9nKCfimqDvuI8gUHJvY2VzeSB3em5vd2nFgnkgd3lrb255d2FuaWUgaW5zdHJ1a2NqaS4nKTtcbiAgICB9LCA0MDApO1xuICB9O1xuXG4gIC8vIEhhcmQgS2lsbCBBbGxcbiAgY29uc3QgaGFuZGxlS2lsbEFsbCA9ICgpID0+IHtcbiAgICBhZGRMb2coJ/CfkqUgW0hBUkQgS0lMTF0gVGVybWluYXRlUHJvY2VzcyAvIGtpbGwgLTkgU0lHS0lMTCBkbGEgd3N6eXN0a2ljaCBwcm9jZXPDs3chJyk7XG4gICAgc2V0VGFyZ2V0UHJvY2Vzc2VzKChwcmV2KSA9PlxuICAgICAgcHJldi5tYXAoKHApID0+ICh7XG4gICAgICAgIC4uLnAsXG4gICAgICAgIHN0YXR1czogJ2Zyb3plbicsXG4gICAgICAgIGNwdTogMC4wLFxuICAgICAgICB0ZWNobmlxdWU6ICdURVJNSU5BVEVEIChTSUdLSUxMIC8gMHgwMDAxKScsXG4gICAgICB9KSlcbiAgICApO1xuICB9O1xuXG4gIC8vIEV4cG9ydCBVbml2ZXJzYWwgTXVsdGktT1MgUHl0aG9uIFBhbmljIFNjcmlwdFxuICBjb25zdCBleHBvcnRNdWx0aU9zUGFuaWNTY3JpcHQgPSAoKSA9PiB7XG4gICAgY29uc3QgcHl0aG9uQ29kZSA9IGBcIlwiXCJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5NVUxUSS1PUyBFTUVSR0VOQ1kgUEFOSUMgRlJFRVpFIFNDUklQVCAoV0lORE9XUyAvIExJTlVYIC8gTUFDT1MpXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuMTAwJSBPRkZMSU5FIC8gWkVSTy1ERVBFTkRFTkNZIEVNRVJHRU5DWSBTVVNQRU5EIEVOR0lORVxuQXV0b21hdHljem5pZSB3eWtyeXdhIHN5c3RlbSBvcGVyYWN5am55IGkgbmF0eWNobWlhc3Rvd28gWkFNUkHFu0EgKE50U3VzcGVuZFByb2Nlc3Ncbmx1YiBTSUdTVE9QIFNpZ25hbCAxOSkgd3N6eXN0a2llIHByb2Nlc3kgcG93acSFemFuZSB6IEZsdXR0ZXJlbSBpIG5ha8WCYWRrYW1pLlxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblwiXCJcIlxuaW1wb3J0IHN5c1xuaW1wb3J0IG9zXG5pbXBvcnQgcGxhdGZvcm1cbmltcG9ydCBzdWJwcm9jZXNzXG5pbXBvcnQgc2lnbmFsXG5cbmRlZiBwYW5pY19zdXNwZW5kX3dpbmRvd3MoKTpcbiAgICBcIlwiXCJXaW5kb3dzIEtlcm5lbCBUaHJlYWQgJiBQcm9jZXNzIFN1c3BlbmQgdmlhIG50ZGxsLk50U3VzcGVuZFByb2Nlc3NcIlwiXCJcbiAgICBwcmludChcIlsqXSBXeWtyeXRvIMWbcm9kb3dpc2tvIFdJTkRPV1MuIEluaWNqYWxpemFjamEgbnRkbGwgLyBjdHlwZXMuLi5cIilcbiAgICB0cnk6XG4gICAgICAgIGltcG9ydCBjdHlwZXNcbiAgICAgICAgZnJvbSBjdHlwZXMgaW1wb3J0IHdpbnR5cGVzXG5cbiAgICAgICAgbnRkbGwgPSBjdHlwZXMud2luZGxsLm50ZGxsXG4gICAgICAgIGtlcm5lbDMyID0gY3R5cGVzLndpbmRsbC5rZXJuZWwzMlxuICAgICAgICBQUk9DRVNTX1NVU1BFTkRfUkVTVU1FID0gMHgwODAwXG5cbiAgICAgICAgIyBXeXN6dWtpd2FuaWUgcHJvY2Vzw7N3IEZsdXR0ZXIgemEgcG9tb2PEhSB0YXNrbGlzdFxuICAgICAgICBjbWQgPSAndGFza2xpc3QgL0ZPIENTViAvTkgnXG4gICAgICAgIG91dHB1dCA9IHN1YnByb2Nlc3MuY2hlY2tfb3V0cHV0KGNtZCwgc2hlbGw9VHJ1ZSwgdGV4dD1UcnVlLCBlcnJvcnM9J2lnbm9yZScpXG4gICAgICAgIFxuICAgICAgICB0YXJnZXRfbmFtZXMgPSBbJ2ZsdXR0ZXInLCAncnVubmVyJywgJ292ZXJsYXknLCAnZHJvcHBlcicsICdsb2Nrc2NyZWVuJ11cbiAgICAgICAgc3VzcGVuZGVkX2NvdW50ID0gMFxuXG4gICAgICAgIGZvciBsaW5lIGluIG91dHB1dC5zdHJpcCgpLnNwbGl0KCdcXFxcbicpOlxuICAgICAgICAgICAgcGFydHMgPSBbcC5zdHJpcCgnXFxcIicpIGZvciBwIGluIGxpbmUuc3BsaXQoJ1xcXCIsXFxcIicpXVxuICAgICAgICAgICAgaWYgbGVuKHBhcnRzKSA+PSAyOlxuICAgICAgICAgICAgICAgIHBuYW1lID0gcGFydHNbMF1cbiAgICAgICAgICAgICAgICB0cnk6XG4gICAgICAgICAgICAgICAgICAgIHBpZCA9IGludChwYXJ0c1sxXSlcbiAgICAgICAgICAgICAgICBleGNlcHQgVmFsdWVFcnJvcjpcbiAgICAgICAgICAgICAgICAgICAgY29udGludWVcblxuICAgICAgICAgICAgICAgIGlmIGFueSh0IGluIHBuYW1lLmxvd2VyKCkgZm9yIHQgaW4gdGFyZ2V0X25hbWVzKTpcbiAgICAgICAgICAgICAgICAgICAgcHJpbnQoZlwiWyFdIFphbXJhxbxhbmllIFBJRCB7cGlkfSAoe3BuYW1lfSkuLi5cIilcbiAgICAgICAgICAgICAgICAgICAgaF9wcm9jZXNzID0ga2VybmVsMzIuT3BlblByb2Nlc3MoUFJPQ0VTU19TVVNQRU5EX1JFU1VNRSwgRmFsc2UsIHBpZClcbiAgICAgICAgICAgICAgICAgICAgaWYgaF9wcm9jZXNzOlxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzID0gbnRkbGwuTnRTdXNwZW5kUHJvY2VzcyhoX3Byb2Nlc3MpXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXJuZWwzMi5DbG9zZUhhbmRsZShoX3Byb2Nlc3MpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBzdGF0dXMgPT0gMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmludChmXCIgIFvinJNdIE50U3VzcGVuZFByb2Nlc3MoUElEPXtwaWR9KSBTVUtDRVMhIFfEhXRraSB6YW1yb8W8b25lIHcgUkFNLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1c3BlbmRlZF9jb3VudCArPSAxXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW50KGZcIiAgW1hdIE50U3VzcGVuZFByb2Nlc3Mgendyw7NjacWCIGtvZCBOVFNUQVRVUzogMHh7c3RhdHVzOjA4WH1cIilcbiAgICAgICAgICAgICAgICAgICAgZWxzZTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaW50KGZcIiAgW1hdIEJyYWsgdXByYXduaWXFhCBkbyBPcGVuUHJvY2VzcyBkbGEgUElEIHtwaWR9LiBVcnVjaG9tIGpha28gQWRtaW5pc3RyYXRvciFcIilcblxuICAgICAgICBwcmludChmXCJcXFxcbltaQUtPxYNDWk9OT10gWmFtcm/FvG9ubyB7c3VzcGVuZGVkX2NvdW50fSBwcm9jZXPDs3cgbmEgcGxhdGZvcm1pZSBXaW5kb3dzLlwiKVxuXG4gICAgZXhjZXB0IEV4Y2VwdGlvbiBhcyBlOlxuICAgICAgICBwcmludChmXCJbQsWBxIREIFdJTkRPV1NdIHtlfVwiKVxuXG5kZWYgcGFuaWNfc3VzcGVuZF9wb3NpeChvc19uYW1lKTpcbiAgICBcIlwiXCJMaW51eCAmIG1hY09TIFByb2Nlc3MgRnJlZXplIHZpYSBTSUdTVE9QIChTaWduYWwgMTkpXCJcIlwiXG4gICAgcHJpbnQoZlwiWypdIFd5a3J5dG8gxZtyb2Rvd2lza28gUE9TSVggKHtvc19uYW1lfSkuIFd5c3nFgmFuaWUgc3lnbmHFgnUgU0lHU1RPUCAoMTkpLi4uXCIpXG4gICAgdGFyZ2V0X3BhdHRlcm5zID0gWydmbHV0dGVyJywgJ2ZsdXR0ZXJfcnVubmVyJywgJ2xvY2tzY3JlZW4nLCAnb3ZlcmxheV9hcHAnXVxuICAgIHN1c3BlbmRlZF9jb3VudCA9IDBcblxuICAgIGZvciBwYXR0ZXJuIGluIHRhcmdldF9wYXR0ZXJuczpcbiAgICAgICAgdHJ5OlxuICAgICAgICAgICAgIyBVxbx5Y2llIHBncmVwIGRvIG5hbWllcnplbmlhIFBJRMOzd1xuICAgICAgICAgICAgcGlkc19yYXcgPSBzdWJwcm9jZXNzLmNoZWNrX291dHB1dChbJ3BncmVwJywgJy1mJywgcGF0dGVybl0sIHRleHQ9VHJ1ZSwgZXJyb3JzPSdpZ25vcmUnKVxuICAgICAgICAgICAgcGlkcyA9IFtpbnQocCkgZm9yIHAgaW4gcGlkc19yYXcuc3RyaXAoKS5zcGxpdCgpIGlmIHAuaXNkaWdpdCgpXVxuXG4gICAgICAgICAgICBmb3IgcGlkIGluIHBpZHM6XG4gICAgICAgICAgICAgICAgaWYgcGlkID09IG9zLmdldHBpZCgpOlxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZSAjIE5pZSB6YW1yYcW8YWogc2FtZWdvIHNpZWJpZVxuICAgICAgICAgICAgICAgIHRyeTpcbiAgICAgICAgICAgICAgICAgICAgb3Mua2lsbChwaWQsIHNpZ25hbC5TSUdTVE9QKSAjIFN5Z25hxYIgMTkgKFdzdHJ6eW1hbmllKVxuICAgICAgICAgICAgICAgICAgICBwcmludChmXCIgIFvinJNdIGtpbGwgLVNUT1AgKFBJRD17cGlkfSwgd3pvcnplYz0ne3BhdHRlcm59JykgLT4gV8SFdGtpIHphdHJ6eW1hbmUgcHJ6ZXogc2NoZWR1bGVyIGrEhWRyYSFcIilcbiAgICAgICAgICAgICAgICAgICAgc3VzcGVuZGVkX2NvdW50ICs9IDFcbiAgICAgICAgICAgICAgICBleGNlcHQgUGVybWlzc2lvbkVycm9yOlxuICAgICAgICAgICAgICAgICAgICBwcmludChmXCIgIFtYXSBXeW1hZ2FueSByb290IC8gc3VkbyBkbGEgUElEIHtwaWR9IVwiKVxuICAgICAgICAgICAgICAgIGV4Y2VwdCBQcm9jZXNzTG9va3VwRXJyb3I6XG4gICAgICAgICAgICAgICAgICAgIHBhc3NcbiAgICAgICAgZXhjZXB0IHN1YnByb2Nlc3MuQ2FsbGVkUHJvY2Vzc0Vycm9yOlxuICAgICAgICAgICAgIyBCcmFrIHByb2Nlc8OzdyBkbGEgZGFuZWdvIHd6b3JjYVxuICAgICAgICAgICAgcGFzc1xuXG4gICAgIyBTenlia2Ega29tZW5kYSBwb3fFgm9raSB3IGNlbGFjaCByZWR1bmRhbmNqaVxuICAgIHRyeTpcbiAgICAgICAgc3VicHJvY2Vzcy5ydW4oWydwa2lsbCcsICctU1RPUCcsICctZicsICdmbHV0dGVyJ10sIGNoZWNrPUZhbHNlKVxuICAgIGV4Y2VwdCBFeGNlcHRpb246XG4gICAgICAgIHBhc3NcblxuICAgIHByaW50KGZcIlxcXFxuW1pBS0/Fg0NaT05PXSBaYW1yb8W8b25vIHtzdXNwZW5kZWRfY291bnR9IHByb2Nlc8OzdyBuYSBwbGF0Zm9ybWllIHtvc19uYW1lfS5cIilcblxuZGVmIG1haW4oKTpcbiAgICBwcmludChcIj1cIiAqIDcwKVxuICAgIHByaW50KFwiICBFTUVSR0VOQ1kgUEFOSUMgRlJFRVpFOiBNVUxUSS1PUyBTSU1VTFRBTkVPVVMgUFJPQ0VTUyBTVVNQRU5EXCIpXG4gICAgcHJpbnQoXCI9XCIgKiA3MClcbiAgICBcbiAgICBjdXJyZW50X29zID0gcGxhdGZvcm0uc3lzdGVtKCkubG93ZXIoKVxuICAgIHByaW50KGZcIlsqXSBXeWtyeXRhIHBsYXRmb3JtYSBqxIVkcmE6IHtwbGF0Zm9ybS5zeXN0ZW0oKX0gKHtwbGF0Zm9ybS5yZWxlYXNlKCl9KVwiKVxuXG4gICAgaWYgY3VycmVudF9vcyA9PSAnd2luZG93cyc6XG4gICAgICAgIHBhbmljX3N1c3BlbmRfd2luZG93cygpXG4gICAgZWxpZiBjdXJyZW50X29zID09ICdsaW51eCc6XG4gICAgICAgIHBhbmljX3N1c3BlbmRfcG9zaXgoJ0xpbnV4JylcbiAgICBlbGlmIGN1cnJlbnRfb3MgPT0gJ2Rhcndpbic6XG4gICAgICAgIHBhbmljX3N1c3BlbmRfcG9zaXgoJ21hY09TJylcbiAgICBlbHNlOlxuICAgICAgICBwcmludChmXCJbIV0gTmllem5hbnkgc3lzdGVtOiB7Y3VycmVudF9vc30uIFByw7NiYSB3eWtvbmFuaWEgc3RhbmRhcmRvd2VnbyBTSUdTVE9QLi4uXCIpXG4gICAgICAgIHBhbmljX3N1c3BlbmRfcG9zaXgoY3VycmVudF9vcylcblxuICAgIHByaW50KFwiPVwiICogNzApXG4gICAgcHJpbnQoXCIgIFNUQU4gQVdBUllKTlk6IFBST0NFU1kgWkFUUlpZTUFORSBXIFBBTUnEmENJIFJBTSAoMCUgQ1BVKVwiKVxuICAgIHByaW50KFwiICBBYnkgd3pub3dpxIcgcHJvY2VzeSB3IGNlbGFjaCBkZWJ1Z293YW5pYTpcIilcbiAgICBwcmludChcIiAgICAtIExpbnV4L21hY09TIDoga2lsbCAtQ09OVCA8UElEPiAgbHViICBwa2lsbCAtQ09OVCAtZiBmbHV0dGVyXCIpXG4gICAgcHJpbnQoXCIgICAgLSBXaW5kb3dzICAgICA6IG50ZGxsLk50UmVzdW1lUHJvY2VzcyhoUHJvY2VzcylcIilcbiAgICBwcmludChcIj1cIiAqIDcwKVxuXG5pZiBfX25hbWVfXyA9PSAnX19tYWluX18nOlxuICAgIG1haW4oKVxuYDtcbiAgICBkb3dubG9hZEZpbGUoJ2VtZXJnZW5jeV9wYW5pY19zdXNwZW5kLnB5JywgcHl0aG9uQ29kZSwgJ3RleHQveC1weXRob24nKTtcbiAgICBhZGRMb2coJ+KclCBbRVhQT1JUXSBQb2JyYW5vIHVuaXdlcnNhbG55IHNrcnlwdDogZW1lcmdlbmN5X3BhbmljX3N1c3BlbmQucHkgKFB5dGhvbiBNdWx0aS1PUyknKTtcbiAgfTtcblxuICAvLyBDb21tYW5kcyByZWZlcmVuY2UgcGVyIE9TXG4gIGNvbnN0IGNvbW1hbmRTbmlwcGV0cyA9IHtcbiAgICB3aW5kb3dzX2N0eXBlczogYHB5dGhvbiAtYyBcImltcG9ydCBjdHlwZXM7IGg9Y3R5cGVzLndpbmRsbC5rZXJuZWwzMi5PcGVuUHJvY2VzcygweDA4MDAsMCxQSUQpOyBjdHlwZXMud2luZGxsLm50ZGxsLk50U3VzcGVuZFByb2Nlc3MoaClcImAsXG4gICAgd2luZG93c19jbWQ6IGB0YXNra2lsbCAvRiAvSU0gZmx1dHRlcl9ydW5uZXIuZXhlIC9UYCxcbiAgICB3aW5kb3dzX3BzOiBgR2V0LVByb2Nlc3MgKmZsdXR0ZXIqIHwgRm9yRWFjaC1PYmplY3QgeyAkaD1bU3lzdGVtLkRpYWdub3N0aWNzLlByb2Nlc3NdOjpHZXRQcm9jZXNzQnlJZCgkXy5JZCkuSGFuZGxlOyBbSW50UHRyXSRwdHI9JGg7IFtOYXRpdmVdOjpOdFN1c3BlbmRQcm9jZXNzKCRwdHIpIH1gLFxuICAgIGxpbnV4X3NpZ3N0b3A6IGBwa2lsbCAtU1RPUCAtZiBmbHV0dGVyIHx8IGtpbGwgLTE5ICQocGdyZXAgLWYgZmx1dHRlcilgLFxuICAgIGxpbnV4X2dkYjogYGdkYiAtcCAkKHBncmVwIC1mIGZsdXR0ZXIgfCBoZWFkIC1uMSkgLWJhdGNoIC1leCBcImNhbGwgKHZvaWQpcGF1c2UoKVwiYCxcbiAgICBtYWNvc19zaWdzdG9wOiBga2lsbGFsbCAtU1RPUCBcImZsdXR0ZXJfcnVubmVyXCIgfHwgcGtpbGwgLTE5IC1mIFwiRmx1dHRlclwiYCxcbiAgfTtcblxuICBjb25zdCBmcm96ZW5Db3VudCA9IHRhcmdldFByb2Nlc3Nlcy5maWx0ZXIoKHApID0+IHAuc3RhdHVzID09PSAnZnJvemVuJykubGVuZ3RoO1xuXG4gIC8vIElmIG1pbmltYWwgbG9hZGluZyBtb2RlLCBoaWRlIGZsb2F0aW5nIGJ1dHRvblxuICBpZiAoaXNNaW5pbWFsTG9hZGluZ01vZGUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIHsvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovfVxuICAgICAgey8qIEZMT0FUSU5HIFBBTklDIFRSSUdHRVIgQlVUVE9OIChGaXhlZCBvbiBzY3JlZW4gYm90dG9tIHJpZ2h0KSAqL31cbiAgICAgIHsvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovfVxuICAgICAge3Nob3dGbG9hdGluZyA/IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBib3R0b20tNiByaWdodC02IHotNDAgZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yXCI+XG4gICAgICAgICAgey8qIEhlbHBlciB0b29sdGlwIGJhZGdlIG9uIGRlc2t0b3AgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoaWRkZW4gbGc6ZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0xLjUgcHgtMyBweS0xLjUgYmctc2xhdGUtOTAwLzkwIGJhY2tkcm9wLWJsdXItbWQgYm9yZGVyIGJvcmRlci1yZWQtNTAwLzQwIHRleHQtd2hpdGUgcm91bmRlZC14bCBzaGFkb3cteGwgdGV4dC14cyBmb250LW1vbm9cIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctMiBoLTIgcm91bmRlZC1mdWxsIGJnLXJlZC01MDAgYW5pbWF0ZS1waW5nXCIgLz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcmVkLTQwMCBmb250LWJvbGRcIj5QQU5JQyBCVVRUT046PC9zcGFuPlxuICAgICAgICAgICAgPGtiZCBjbGFzc05hbWU9XCJweC0xLjUgcHktMC41IGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCByb3VuZGVkIHRleHQtWzEwcHhdIHRleHQtc2xhdGUtMzAwXCI+XG4gICAgICAgICAgICAgIEN0cmwrQWx0K1BcbiAgICAgICAgICAgIDwva2JkPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIEJpZyBQdWxzaW5nIEVtZXJnZW5jeSBQYW5pYyBCdXR0b24gKi99XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNPcGVuKHRydWUpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZ3JvdXAgcmVsYXRpdmUgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC0zIHNtOnB4LTQgc206cHktMyBiZy16aW5jLTk1MC85NSBob3ZlcjpiZy16aW5jLTkwMCB0ZXh0LXJvc2UtMzAwIGhvdmVyOnRleHQtd2hpdGUgcm91bmRlZC0yeGwgc2hhZG93LTJ4bCBib3JkZXIgYm9yZGVyLXJvc2UtNTAwLzQwIGhvdmVyOmJvcmRlci1yb3NlLTQwMCB0cmFuc2Zvcm0gaG92ZXI6LXRyYW5zbGF0ZS15LTAuNSBhY3RpdmU6dHJhbnNsYXRlLXktMC41IHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTIwMCBjdXJzb3ItcG9pbnRlciBiYWNrZHJvcC1ibHVyLXhsXCJcbiAgICAgICAgICAgIHRpdGxlPVwiUHJ6eWNpc2sgUGFuaWtpOiBOYXR5Y2htaWFzdG93ZSB6YW1yb8W8ZW5pZSBwcm9jZXPDs3cgKE50U3VzcGVuZFByb2Nlc3MgLyBTSUdTVE9QIDE5KVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgey8qIFN1YnRsZSBRdWlldCBMdXh1cnkgSGFsbyAqL31cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFic29sdXRlIC1pbnNldC0wLjUgcm91bmRlZC0yeGwgYmctcm9zZS01MDAvMTAgYmx1ci1zbSBncm91cC1ob3ZlcjpiZy1yb3NlLTUwMC8yMCB0cmFuc2l0aW9uLWFsbCBwb2ludGVyLWV2ZW50cy1ub25lXCIgLz5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTIuNVwiPlxuICAgICAgICAgICAgICA8QWxlcnRPY3RhZ29uIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1yb3NlLTQwMCBzaHJpbmstMFwiIC8+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1sZWZ0IGhpZGRlbiBzbTpibG9ja1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdHJhY2tpbmctd2lkZXIgdXBwZXJjYXNlIGxlYWRpbmctbm9uZSBmb250LW1vbm8gdGV4dC1zbGF0ZS0xMDBcIj5cbiAgICAgICAgICAgICAgICAgIFBBTklDIEZSRUVaRVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDAgZm9udC1tb25vIGZvbnQtbWVkaXVtIGxlYWRpbmctdGlnaHQgbXQtMC41XCI+XG4gICAgICAgICAgICAgICAgICBNdWx0aS1PUyBSQU0gTG9ja1xuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogQmFkZ2UgY291bnRlciBpZiBmcm96ZW4gKi99XG4gICAgICAgICAgICB7ZnJvemVuQ291bnQgPiAwICYmIChcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWJzb2x1dGUgLXRvcC0yIC1yaWdodC0yIGJnLXppbmMtOTAwIGJvcmRlciBib3JkZXItcm9zZS01MDAgdGV4dC1yb3NlLTMwMCB0ZXh0LVsxMHB4XSBmb250LW1vbm8gZm9udC1ib2xkIHB4LTEuNSBweS0wLjIgcm91bmRlZC1mdWxsIHNoYWRvdy1sZ1wiPlxuICAgICAgICAgICAgICAgIHtmcm96ZW5Db3VudH0g4p2E77iPXG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICB7LyogUXVpY2sgU3VicGFnZSBMaW5rICovfVxuICAgICAgICAgIHtvbk5hdmlnYXRlVG9UYWIgJiYgKFxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbk5hdmlnYXRlVG9UYWIoJ3BhbmljJyl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMiByb3VuZGVkLXhsIGJnLXppbmMtOTUwLzkwIGhvdmVyOmJnLXppbmMtOTAwIGJvcmRlciBib3JkZXItd2hpdGUvMTAgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC1zbGF0ZS0yMDAgdGV4dC14cyBmb250LW1vbm8gZm9udC1tZWRpdW0gY3Vyc29yLXBvaW50ZXIgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgICB0aXRsZT1cIk90d8OzcnogcGXFgm7EhSBwb2RzdHJvbsSZIFBhbmljIEJ1dHRvblwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIFBlxYJuYSBQb2RzdHJvbmEg4oaXXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAgey8qIE1pbmltaXplIEZsb2F0aW5nIEJ1dHRvbiAqL31cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTaG93RmxvYXRpbmcoZmFsc2UpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xLjUgcm91bmRlZC14bCBiZy16aW5jLTk1MCBob3ZlcjpiZy16aW5jLTkwMCB0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXNsYXRlLTMwMCB0ZXh0LXhzIGZvbnQtbW9ubyBmb250LW1lZGl1bSBjdXJzb3ItcG9pbnRlciBib3JkZXIgYm9yZGVyLXdoaXRlLzUgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgdGl0bGU9XCJad2nFhCBwcnp5Y2lzayBwYW5pa2lcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIOKclVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICkgOiAoXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTaG93RmxvYXRpbmcodHJ1ZSl9XG4gICAgICAgICAgY2xhc3NOYW1lPVwiZml4ZWQgYm90dG9tLTYgcmlnaHQtNiB6LTQwIHB4LTMuNSBweS0yIHJvdW5kZWQteGwgYmctemluYy05NTAvOTAgaG92ZXI6YmctemluYy05MDAgYm9yZGVyIGJvcmRlci1yb3NlLTUwMC80MCB0ZXh0LXJvc2UtMzAwIGZvbnQtbW9ubyB0ZXh0LXhzIGZvbnQtbWVkaXVtIHNoYWRvdy0yeGwgY3Vyc29yLXBvaW50ZXIgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgIHRpdGxlPVwiUG9rYcW8IFByenljaXNrIFBhbmlraVwiXG4gICAgICAgID5cbiAgICAgICAgICA8c3Bhbj7wn5qoIFBhbmljIEZyZWV6ZTwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICApfVxuXG4gICAgICB7LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL31cbiAgICAgIHsvKiBFTUVSR0VOQ1kgUEFOSUMgTU9EQUwgRElBTE9HICovfVxuICAgICAgey8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi99XG4gICAgICB7aXNPcGVuICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNTAgYmctYmxhY2svODUgYmFja2Ryb3AtYmx1ci1tZCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwLTMgc206cC01IG92ZXJmbG93LXktYXV0byBhbmltYXRlLWluIGZhZGUtaW4gZHVyYXRpb24tMjAwXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy16aW5jLTk1MCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQtM3hsIG1heC13LTR4bCB3LWZ1bGwgcC01IHNtOnAtNyBzaGFkb3ctMnhsIHNoYWRvdy1ibGFjayBzcGFjZS15LTUgbXktYXV0byByZWxhdGl2ZVwiPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICB7LyogTW9kYWwgSGVhZGVyICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLXN0YXJ0IGp1c3RpZnktYmV0d2VlbiBwYi00IGJvcmRlci1iIGJvcmRlci13aGl0ZS8xMCBnYXAtNFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtM1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIGJnLXppbmMtOTAwIGJvcmRlciBib3JkZXItcm9zZS01MDAvMzAgcm91bmRlZC0yeGwgdGV4dC1yb3NlLTQwMCBzaGFkb3ctbWRcIj5cbiAgICAgICAgICAgICAgICAgIDxBbGVydE9jdGFnb24gY2xhc3NOYW1lPVwidy03IGgtN1wiIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtbGcgc206dGV4dC14bCBmb250LWJvbGQgdGV4dC13aGl0ZSBmb250LW1vbm8gdHJhY2tpbmctd2lkZXIgdXBwZXJjYXNlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgTVVMVEktT1MgUEFOSUMgQ09NTUFORCBTRVFVRU5DRVJcbiAgICAgICAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMi41IHB5LTAuNSBiZy16aW5jLTkwMCBib3JkZXIgYm9yZGVyLXJvc2UtNTAwLzQwIHRleHQtcm9zZS0zMDAgcm91bmRlZC1mdWxsIHRleHQtWzEwcHhdIGZvbnQtbW9ubyBmb250LW1lZGl1bSB1cHBlcmNhc2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICBSQU0gRlJFRVpFXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTQwMCBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgQsWCeXNrYXdpY3puZSB6YXdpZXN6ZW5pZSB3xIV0a8OzdyB3IFJBTSAoPGNvZGUgY2xhc3NOYW1lPVwidGV4dC1hbWJlci00MDAgZm9udC1tb25vXCI+TnRTdXNwZW5kUHJvY2VzczwvY29kZT4gbmEgV2luZG93cywgPGNvZGUgY2xhc3NOYW1lPVwidGV4dC1jeWFuLTQwMCBmb250LW1vbm9cIj5TSUdTVE9QIFNpZ25hbCAxOTwvY29kZT4gbmEgTGludXgvbWFjT1MpLlxuICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAge29uTmF2aWdhdGVUb1RhYiAmJiAoXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBzZXRJc09wZW4oZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgIG9uTmF2aWdhdGVUb1RhYigncGFuaWMnKTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0xLjUgcm91bmRlZC14bCBiZy16aW5jLTkwMCBob3ZlcjpiZy16aW5jLTgwMCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHRleHQtc2xhdGUtMzAwIHRleHQteHMgZm9udC1tb25vIGZvbnQtbWVkaXVtIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGN1cnNvci1wb2ludGVyIHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJQcnplamTFuiBkbyBwZcWCbmVqIHBvZHN0cm9ueVwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlBlxYJuYSBQb2RzdHJvbmEg4oaXPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc09wZW4oZmFsc2UpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0yIHJvdW5kZWQteGwgYmctemluYy05MDAgaG92ZXI6YmctemluYy04MDAgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICAgIHRpdGxlPVwiWmFta25paiBbRXNjXVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPFggY2xhc3NOYW1lPVwidy01IGgtNVwiIC8+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBUYWN0aWNhbCBUcmlnZ2VyIEJhbm5lciAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JhZGllbnQtdG8tciBmcm9tLXppbmMtOTAwIHZpYS16aW5jLTk1MCB0by16aW5jLTkwMCBwLTQgc206cC01IHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItd2hpdGUvMTAgc2hhZG93LWlubmVyIGZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMSB0ZXh0LWNlbnRlciBzbTp0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbW9ubyBmb250LWJvbGQgdGV4dC1yb3NlLTMwMCB1cHBlcmNhc2UgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBqdXN0aWZ5LWNlbnRlciBzbTpqdXN0aWZ5LXN0YXJ0XCI+XG4gICAgICAgICAgICAgICAgICA8UmFkaW8gY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1yb3NlLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICBUcnliIE5hdHljaG1pYXN0b3dlZ28gVW5pZXJ1Y2hvbWllbmlhIFByb2Nlc8Ozd1xuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIG1heC13LXhsXCI+XG4gICAgICAgICAgICAgICAgICBKZWRub2N6ZXNuZSB3c3RyenltYW5pZSBjeWtsaSBDUFUgYmV6IHViaWphbmlhIHByb2Nlc3UuIFV3YWxuaWEga3Vyc29yIG15c3p5IGkga2xhd2lhdHVyxJksIHVuaWVtb8W8bGl3aWFqxIVjIG5ha8WCYWRjZSBwcnplY2h3eXR5d2FuaWUgemRhcnplxYQgc3lzdGVtb3d5Y2guXG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBnYXAtMiB3LWZ1bGwgc206dy1hdXRvIGp1c3RpZnktZW5kXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17dHJpZ2dlck11bHRpT3NQYW5pY1N1c3BlbmR9XG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXNFeGVjdXRpbmd9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgc206dy1hdXRvIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHNwYWNlLXgtMiBweC02IHB5LTMuNSBiZy16aW5jLTkwMCBob3ZlcjpiZy16aW5jLTgwMCB0ZXh0LXJvc2UtMjAwIGhvdmVyOnRleHQtd2hpdGUgZm9udC1tb25vIGZvbnQtYm9sZCB0ZXh0LXNtIHJvdW5kZWQtMnhsIHNoYWRvdy14bCBib3JkZXIgYm9yZGVyLXJvc2UtNTAwLzQwIGhvdmVyOmJvcmRlci1yb3NlLTQwMCBhY3RpdmU6dHJhbnNsYXRlLXktMC41IHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8TG9jayBjbGFzc05hbWU9e2B3LTQgaC00ICR7aXNFeGVjdXRpbmcgPyAnYW5pbWF0ZS1zcGluJyA6ICcnfWB9IC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj57aXNFeGVjdXRpbmcgPyAnWkFNUkHFu0FOSUUgVyBUT0tVLi4uJyA6ICfinYTvuI8gWkFNUk/FuSBXU1pZU1RLSUUgKFBBTklDIEZSRUVaRSknfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIFRhcmdldCBQcm9jZXNzIE1hdHJpeCAoTXVsdGktT1MgT3ZlcnZpZXcpICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTMwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxDcHUgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXB1cnBsZS00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgV3lrcnl0ZSBQcm9jZXN5IERvY2Vsb3dlIChXaW5kb3dzLCBMaW51eCwgbWFjT1MpOlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cblxuICAgICAgICAgICAgICAgIHsvKiBTZWNvbmRhcnkgQWN0aW9uIENvbnRyb2xzICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yXCI+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVJlc3VtZVByb2Nlc3Nlc31cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMi41IHB5LTEgcm91bmRlZC1sZyBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQtc2xhdGUtMzAwIHRleHQteHMgZm9udC1tb25vIHRyYW5zaXRpb24tYWxsIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJXem7Ds3cgd3lrb255d2FuaWUgd8SFdGvDs3cgKFNJR0NPTlQgLyBOdFJlc3VtZVByb2Nlc3MpXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPFBsYXkgY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LWVtZXJhbGQtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+V3puw7N3PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlS2lsbEFsbH1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMi41IHB5LTEgcm91bmRlZC1sZyBiZy1yZWQtOTUwIGhvdmVyOmJnLXJlZC04MDAgdGV4dC1yZWQtMjAwIHRleHQteHMgZm9udC1tb25vIHRyYW5zaXRpb24tYWxsIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGJvcmRlciBib3JkZXItcmVkLTgwMC82MFwiXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiVHJ3YWxlIHphYmlqIHdzenlzdGtpZSBwcm9jZXN5IChUZXJtaW5hdGVQcm9jZXNzIC8gU0lHS0lMTClcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8U2t1bGwgY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LXJlZC00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5VYsOzaiBUcndhxYJ5PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBzbTpncmlkLWNvbHMtMiBnYXAtM1wiPlxuICAgICAgICAgICAgICAgIHt0YXJnZXRQcm9jZXNzZXMubWFwKChwcm9jKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBpc0Zyb3plbiA9IHByb2Muc3RhdHVzID09PSAnZnJvemVuJztcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGlzU3VzcGVuZGluZyA9IHByb2Muc3RhdHVzID09PSAnc3VzcGVuZGluZyc7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICBrZXk9e3Byb2MucGlkfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHAtMyByb3VuZGVkLXhsIGJvcmRlciB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNGcm96ZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctcHVycGxlLTk1MC80MCBib3JkZXItcHVycGxlLTYwMC84MCBzaGFkb3ctbGcgc2hhZG93LXB1cnBsZS05NTAvMzAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogaXNTdXNwZW5kaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXJlZC05NTAvNDAgYm9yZGVyLXJlZC01MDAgYW5pbWF0ZS1wdWxzZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTUwIGJvcmRlci1zbGF0ZS04MDAnXG4gICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtc3RhcnQganVzdGlmeS1iZXR3ZWVuIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRydW5jYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIGZvbnQtYm9sZCB0ZXh0LXhzIHRleHQtd2hpdGUgdHJ1bmNhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwcm9jLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyBweC0xLjUgcHktMC4yIHJvdW5kZWQgYmctc2xhdGUtOTAwIHRleHQtc2xhdGUtMzAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQSUQ6IHtwcm9jLnBpZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCBmb250LW1vbm8gYmxvY2sgdHJ1bmNhdGUgbXQtMC41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3Byb2MudGVjaG5pcXVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgey8qIE9TICYgU3RhdGUgQmFkZ2UgKi99XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgaXRlbXMtZW5kIGdhcC0xIGZsZXgtc2hyaW5rLTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B0ZXh0LVs5cHhdIGZvbnQtbW9ubyBmb250LWJsYWNrIHVwcGVyY2FzZSBweC0xLjUgcHktMC41IHJvdW5kZWQgYm9yZGVyICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jLm9zID09PSAnd2luZG93cydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctYmx1ZS05NTAgdGV4dC1ibHVlLTMwMCBib3JkZXItYmx1ZS04MDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogcHJvYy5vcyA9PT0gJ2xpbnV4J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1hbWJlci05NTAgdGV4dC1hbWJlci0zMDAgYm9yZGVyLWFtYmVyLTgwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctcGluay05NTAgdGV4dC1waW5rLTMwMCBib3JkZXItcGluay04MDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cHJvYy5vc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdGV4dC1bMTBweF0gZm9udC1tb25vIGZvbnQtYm9sZCBweC0xLjUgcHktMC41IHJvdW5kZWQgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRnJvemVuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXB1cnBsZS05MDAgdGV4dC1wdXJwbGUtMjAwIGJvcmRlciBib3JkZXItcHVycGxlLTYwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctcmVkLTkwMC82MCB0ZXh0LXJlZC0yMDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aXNGcm96ZW4gPyAn4p2E77iPIFpBTVJPxbtPTlkgKDAlKScgOiBgJHtwcm9jLmNwdX0lIENQVWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBRdWljayBNdWx0aS1PUyBDb21tYW5kIFNlcXVlbmNlcyAmIE9uZS1MaW5lcnMgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtc2xhdGUtMzAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICA8VGVybWluYWwgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWN5YW4tNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgIFBvbGVjZW5pYSBOYXR5Y2htaWFzdG93ZSBkbyBTa29waW93YW5pYSB3IFRlcm1pbmFsdTpcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXtleHBvcnRNdWx0aU9zUGFuaWNTY3JpcHR9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yLjUgcHktMSBiZy1wdXJwbGUtNzAwIGhvdmVyOmJnLXB1cnBsZS02MDAgdGV4dC13aGl0ZSByb3VuZGVkLWxnIHRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHRyYW5zaXRpb24tYWxsIHNoYWRvd1wiXG4gICAgICAgICAgICAgICAgICB0aXRsZT1cIlBvYmllcnogdW5pd2Vyc2Fsbnkgc2tyeXB0IFB5dGhvbmEgZW1lcmdlbmN5X3BhbmljX3N1c3BlbmQucHlcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxEb3dubG9hZCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5Qb2JpZXJ6IFNrcnlwdCAucHkgKE11bHRpLU9TKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIE9TIFRhYnMgZm9yIFNuaXBwZXRzICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMSBib3JkZXItYiBib3JkZXItc2xhdGUtODAwIHBiLTEgdGV4dC14c1wiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZU9TRmlsdGVyKCdhbGwnKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTMgcHktMSByb3VuZGVkLXQtbGcgZm9udC1tb25vIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZU9TRmlsdGVyID09PSAnYWxsJyA/ICdiZy1zbGF0ZS04MDAgdGV4dC13aGl0ZSBmb250LWJvbGQnIDogJ3RleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICBXc3p5c3RraWUgT1NcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVPU0ZpbHRlcignd2luZG93cycpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMyBweS0xIHJvdW5kZWQtdC1sZyBmb250LW1vbm8gdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlT1NGaWx0ZXIgPT09ICd3aW5kb3dzJyA/ICdiZy1ibHVlLTkwMC82MCB0ZXh0LWJsdWUtMzAwIGZvbnQtYm9sZCBib3JkZXItYi0yIGJvcmRlci1ibHVlLTUwMCcgOiAndGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSdcbiAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIFdpbmRvd3MgKGN0eXBlcyAvIENNRClcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVPU0ZpbHRlcignbGludXgnKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTMgcHktMSByb3VuZGVkLXQtbGcgZm9udC1tb25vIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZU9TRmlsdGVyID09PSAnbGludXgnID8gJ2JnLWFtYmVyLTkwMC82MCB0ZXh0LWFtYmVyLTMwMCBmb250LWJvbGQgYm9yZGVyLWItMiBib3JkZXItYW1iZXItNTAwJyA6ICd0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlJ1xuICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgTGludXggKGtpbGwgLTE5IC8gcGtpbGwpXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlT1NGaWx0ZXIoJ21hY29zJyl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0zIHB5LTEgcm91bmRlZC10LWxnIGZvbnQtbW9ubyB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmVPU0ZpbHRlciA9PT0gJ21hY29zJyA/ICdiZy1waW5rLTkwMC82MCB0ZXh0LXBpbmstMzAwIGZvbnQtYm9sZCBib3JkZXItYi0yIGJvcmRlci1waW5rLTUwMCcgOiAndGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSdcbiAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIG1hY09TIChraWxsYWxsIC1TVE9QKVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogU25pcHBldHMgTGlzdCAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTIgbWF4LWgtNDggb3ZlcmZsb3cteS1hdXRvIHByLTFcIj5cbiAgICAgICAgICAgICAgICB7KGFjdGl2ZU9TRmlsdGVyID09PSAnYWxsJyB8fCBhY3RpdmVPU0ZpbHRlciA9PT0gJ3dpbmRvd3MnKSAmJiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTk1MCBwLTIuNSByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtODAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMiB0ZXh0LXhzIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRydW5jYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1ibHVlLTQwMCBmb250LWJvbGQgbXItMlwiPltXaW5kb3dzIGN0eXBlc108L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPGNvZGUgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS0yMDBcIj57Y29tbWFuZFNuaXBwZXRzLndpbmRvd3NfY3R5cGVzfTwvY29kZT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVDb3B5KGNvbW1hbmRTbmlwcGV0cy53aW5kb3dzX2N0eXBlcywgJ3dpbl9jdHlwZXMnKX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTEuNSBiZy1zbGF0ZS05MDAgaG92ZXI6Ymctc2xhdGUtODAwIHRleHQtc2xhdGUtMzAwIGhvdmVyOnRleHQtd2hpdGUgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCBmbGV4LXNocmluay0wXCJcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIktvcGl1alwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICB7Y29waWVkS2V5ID09PSAnd2luX2N0eXBlcycgPyA8Q2hlY2sgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1lbWVyYWxkLTQwMFwiIC8+IDogPENvcHkgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPn1cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgICAgeyhhY3RpdmVPU0ZpbHRlciA9PT0gJ2FsbCcgfHwgYWN0aXZlT1NGaWx0ZXIgPT09ICd3aW5kb3dzJykgJiYgKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05NTAgcC0yLjUgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTIgdGV4dC14cyBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0cnVuY2F0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYmx1ZS00MDAgZm9udC1ib2xkIG1yLTJcIj5bV2luZG93cyBDTURdPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxjb2RlIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMjAwXCI+e2NvbW1hbmRTbmlwcGV0cy53aW5kb3dzX2NtZH08L2NvZGU+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlQ29weShjb21tYW5kU25pcHBldHMud2luZG93c19jbWQsICd3aW5fY21kJyl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xLjUgYmctc2xhdGUtOTAwIGhvdmVyOmJnLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTMwMCBob3Zlcjp0ZXh0LXdoaXRlIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgZmxleC1zaHJpbmstMFwiXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJLb3BpdWpcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAge2NvcGllZEtleSA9PT0gJ3dpbl9jbWQnID8gPENoZWNrIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtZW1lcmFsZC00MDBcIiAvPiA6IDxDb3B5IGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz59XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgIHsoYWN0aXZlT1NGaWx0ZXIgPT09ICdhbGwnIHx8IGFjdGl2ZU9TRmlsdGVyID09PSAnbGludXgnKSAmJiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTk1MCBwLTIuNSByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtODAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMiB0ZXh0LXhzIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRydW5jYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1hbWJlci00MDAgZm9udC1ib2xkIG1yLTJcIj5bTGludXggU0lHU1RPUCAoMTkpXTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8Y29kZSBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTIwMFwiPntjb21tYW5kU25pcHBldHMubGludXhfc2lnc3RvcH08L2NvZGU+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlQ29weShjb21tYW5kU25pcHBldHMubGludXhfc2lnc3RvcCwgJ2xpbnV4X3NpZ3N0b3AnKX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTEuNSBiZy1zbGF0ZS05MDAgaG92ZXI6Ymctc2xhdGUtODAwIHRleHQtc2xhdGUtMzAwIGhvdmVyOnRleHQtd2hpdGUgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCBmbGV4LXNocmluay0wXCJcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIktvcGl1alwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICB7Y29waWVkS2V5ID09PSAnbGludXhfc2lnc3RvcCcgPyA8Q2hlY2sgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1lbWVyYWxkLTQwMFwiIC8+IDogPENvcHkgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPn1cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgICAgeyhhY3RpdmVPU0ZpbHRlciA9PT0gJ2FsbCcgfHwgYWN0aXZlT1NGaWx0ZXIgPT09ICdtYWNvcycpICYmIChcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTUwIHAtMi41IHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0yIHRleHQteHMgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHJ1bmNhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXBpbmstNDAwIGZvbnQtYm9sZCBtci0yXCI+W21hY09TIFRlcm1pbmFsXTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8Y29kZSBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTIwMFwiPntjb21tYW5kU25pcHBldHMubWFjb3Nfc2lnc3RvcH08L2NvZGU+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlQ29weShjb21tYW5kU25pcHBldHMubWFjb3Nfc2lnc3RvcCwgJ21hY29zX3NpZ3N0b3AnKX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTEuNSBiZy1zbGF0ZS05MDAgaG92ZXI6Ymctc2xhdGUtODAwIHRleHQtc2xhdGUtMzAwIGhvdmVyOnRleHQtd2hpdGUgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCBmbGV4LXNocmluay0wXCJcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIktvcGl1alwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICB7Y29waWVkS2V5ID09PSAnbWFjb3Nfc2lnc3RvcCcgPyA8Q2hlY2sgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1lbWVyYWxkLTQwMFwiIC8+IDogPENvcHkgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPn1cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogUGFuaWMgVGVybWluYWwgT3V0cHV0IExvZyAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTUwIHAtMyByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHRleHQtWzExcHhdIGZvbnQtbW9ubyBzcGFjZS15LTEgaC0yOCBvdmVyZmxvdy15LWF1dG9cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMCBwYi0xIGJvcmRlci1iIGJvcmRlci1zbGF0ZS05MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+RHppZW5uaWsgUmVha2NqaSBKxIVkcmEgKEtlcm5lbCBUaHJlYWQgRnJlZXplIExvZyk6PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC00MDBcIj5SRUFEWTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIHtwYW5pY0xvZ3MubWFwKChsb2csIGluZGV4KSA9PiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17XG4gICAgICAgICAgICAgICAgICAgIGxvZy5pbmNsdWRlcygnVFJJR0dFUicpIHx8IGxvZy5pbmNsdWRlcygnUEFOSUMnKVxuICAgICAgICAgICAgICAgICAgICAgID8gJ3RleHQtcmVkLTQwMCBmb250LWJvbGQnXG4gICAgICAgICAgICAgICAgICAgICAgOiBsb2cuaW5jbHVkZXMoJ1NVS0NFUycpIHx8IGxvZy5pbmNsdWRlcygnRVhQT1JUJylcbiAgICAgICAgICAgICAgICAgICAgICA/ICd0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtYm9sZCdcbiAgICAgICAgICAgICAgICAgICAgICA6IGxvZy5pbmNsdWRlcygnV0lORE9XUycpIHx8IGxvZy5pbmNsdWRlcygnTElOVVgnKSB8fCBsb2cuaW5jbHVkZXMoJ01BQ09TJylcbiAgICAgICAgICAgICAgICAgICAgICA/ICd0ZXh0LWN5YW4tMzAwJ1xuICAgICAgICAgICAgICAgICAgICAgIDogJ3RleHQtc2xhdGUtNDAwJ1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtsb2d9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBNb2RhbCBGb290ZXIgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBwdC0yIGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDAvODAgdGV4dC14cyB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMlwiPlxuICAgICAgICAgICAgICAgIDxTaGllbGRBbGVydCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcHVycGxlLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+WmFjaG93dWplIHN0YW4gUkFNIGRvIHpyenV0dSBrcnltaW5hbGlzdHljem5lZ28gKE1pbmlEdW1wV3JpdGVEdW1wIC8gR0RCIENvcmUgRHVtcCkuPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldElzT3BlbihmYWxzZSl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0xLjUgYmctc2xhdGUtODAwIGhvdmVyOmJnLXNsYXRlLTcwMCB0ZXh0LXdoaXRlIHJvdW5kZWQtbGcgZm9udC1tb25vIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIFphbWtuaWogW0VzY11cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgPC8+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUFtVEksbUJBUVEsY0FSUjtBQW5USixTQUFnQixVQUFVLGlCQUFpQjtBQUMzQztBQUFBLEVBQ0U7QUFBQSxFQUFjO0FBQUEsRUFBa0I7QUFBQSxFQUFNO0FBQUEsRUFBVTtBQUFBLEVBQU07QUFBQSxFQUN0RDtBQUFBLEVBQVU7QUFBQSxFQUFpQjtBQUFBLEVBQUc7QUFBQSxFQUFtQjtBQUFBLEVBRXRDO0FBQUEsT0FDTjtBQUNQLFNBQVMsb0JBQW9CO0FBZ0J0QixhQUFNLGNBQTBDLENBQUM7QUFBQSxFQUN0RCx1QkFBdUI7QUFBQSxFQUN2QjtBQUNGLE1BQU07QUFDSixRQUFNLENBQUMsUUFBUSxTQUFTLElBQUksU0FBa0IsS0FBSztBQUNuRCxRQUFNLENBQUMsY0FBYyxlQUFlLElBQUksU0FBa0IsSUFBSTtBQUM5RCxRQUFNLENBQUMsV0FBVyxZQUFZLElBQUksU0FBd0IsSUFBSTtBQUM5RCxRQUFNLENBQUMsYUFBYSxjQUFjLElBQUksU0FBa0IsS0FBSztBQUM3RCxRQUFNLENBQUMsZ0JBQWdCLGlCQUFpQixJQUFJLFNBQWdELEtBQUs7QUFHakcsUUFBTSxDQUFDLGlCQUFpQixrQkFBa0IsSUFBSSxTQUErQjtBQUFBLElBQzNFO0FBQUEsTUFDRSxLQUFLO0FBQUEsTUFDTCxNQUFNO0FBQUEsTUFDTixJQUFJO0FBQUEsTUFDSixXQUFXO0FBQUEsTUFDWCxRQUFRO0FBQUEsTUFDUixLQUFLO0FBQUEsSUFDUDtBQUFBLElBQ0E7QUFBQSxNQUNFLEtBQUs7QUFBQSxNQUNMLE1BQU07QUFBQSxNQUNOLElBQUk7QUFBQSxNQUNKLFdBQVc7QUFBQSxNQUNYLFFBQVE7QUFBQSxNQUNSLEtBQUs7QUFBQSxJQUNQO0FBQUEsSUFDQTtBQUFBLE1BQ0UsS0FBSztBQUFBLE1BQ0wsTUFBTTtBQUFBLE1BQ04sSUFBSTtBQUFBLE1BQ0osV0FBVztBQUFBLE1BQ1gsUUFBUTtBQUFBLE1BQ1IsS0FBSztBQUFBLElBQ1A7QUFBQSxJQUNBO0FBQUEsTUFDRSxLQUFLO0FBQUEsTUFDTCxNQUFNO0FBQUEsTUFDTixJQUFJO0FBQUEsTUFDSixXQUFXO0FBQUEsTUFDWCxRQUFRO0FBQUEsTUFDUixLQUFLO0FBQUEsSUFDUDtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0sQ0FBQyxXQUFXLFlBQVksSUFBSSxTQUFtQjtBQUFBLElBQ25EO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFHRCxZQUFVLE1BQU07QUFDZCxVQUFNLGdCQUFnQixDQUFDLE1BQXFCO0FBQzFDLFdBQUssRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxJQUFJLFlBQVksTUFBTSxLQUFLO0FBQ3ZFLFVBQUUsZUFBZTtBQUNqQixrQkFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJO0FBQUEsTUFDM0IsV0FBVyxFQUFFLFFBQVEsWUFBWSxRQUFRO0FBQ3ZDLGtCQUFVLEtBQUs7QUFBQSxNQUNqQjtBQUFBLElBQ0Y7QUFFQSxXQUFPLGlCQUFpQixXQUFXLGFBQWE7QUFDaEQsV0FBTyxNQUFNLE9BQU8sb0JBQW9CLFdBQVcsYUFBYTtBQUFBLEVBQ2xFLEdBQUcsQ0FBQyxNQUFNLENBQUM7QUFFWCxRQUFNLFNBQVMsQ0FBQyxRQUFnQjtBQUM5QixpQkFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEtBQUssTUFBTSxHQUFHLEdBQUcsS0FBSSxvQkFBSSxLQUFLLEdBQUUsbUJBQW1CLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUFBLEVBQzVGO0FBRUEsUUFBTSxhQUFhLENBQUMsTUFBYyxRQUFnQjtBQUNoRCxjQUFVLFVBQVUsVUFBVSxJQUFJO0FBQ2xDLGlCQUFhLEdBQUc7QUFDaEIsZUFBVyxNQUFNLGFBQWEsSUFBSSxHQUFHLEdBQUk7QUFBQSxFQUMzQztBQUdBLFFBQU0sNkJBQTZCLE1BQU07QUFDdkMsbUJBQWUsSUFBSTtBQUNuQixXQUFPLHNHQUFzRztBQUc3RyxXQUFPLHNHQUFzRztBQUM3RyxXQUFPLDZFQUE2RTtBQUNwRixXQUFPLHFGQUFxRjtBQUU1RjtBQUFBLE1BQW1CLENBQUMsU0FDbEIsS0FBSyxJQUFJLENBQUMsT0FBTztBQUFBLFFBQ2YsR0FBRztBQUFBLFFBQ0gsUUFBUTtBQUFBLE1BQ1YsRUFBRTtBQUFBLElBQ0o7QUFFQSxlQUFXLE1BQU07QUFDZjtBQUFBLFFBQW1CLENBQUMsU0FDbEIsS0FBSyxJQUFJLENBQUMsT0FBTztBQUFBLFVBQ2YsR0FBRztBQUFBLFVBQ0gsUUFBUTtBQUFBLFVBQ1IsS0FBSztBQUFBLFFBQ1AsRUFBRTtBQUFBLE1BQ0o7QUFDQSxxQkFBZSxLQUFLO0FBQ3BCLGFBQU8sZ0dBQWdHO0FBQ3ZHLGFBQU8sc0ZBQXNGO0FBQUEsSUFDL0YsR0FBRyxHQUFHO0FBQUEsRUFDUjtBQUdBLFFBQU0sd0JBQXdCLE1BQU07QUFDbEMsV0FBTyx3RUFBd0U7QUFDL0U7QUFBQSxNQUFtQixDQUFDLFNBQ2xCLEtBQUssSUFBSSxDQUFDLE9BQU87QUFBQSxRQUNmLEdBQUc7QUFBQSxRQUNILFFBQVE7QUFBQSxRQUNSLEtBQUssRUFBRSxPQUFPLFlBQVksT0FBTztBQUFBLE1BQ25DLEVBQUU7QUFBQSxJQUNKO0FBQ0EsZUFBVyxNQUFNO0FBQ2YsYUFBTyw2Q0FBNkM7QUFBQSxJQUN0RCxHQUFHLEdBQUc7QUFBQSxFQUNSO0FBR0EsUUFBTSxnQkFBZ0IsTUFBTTtBQUMxQixXQUFPLDRFQUE0RTtBQUNuRjtBQUFBLE1BQW1CLENBQUMsU0FDbEIsS0FBSyxJQUFJLENBQUMsT0FBTztBQUFBLFFBQ2YsR0FBRztBQUFBLFFBQ0gsUUFBUTtBQUFBLFFBQ1IsS0FBSztBQUFBLFFBQ0wsV0FBVztBQUFBLE1BQ2IsRUFBRTtBQUFBLElBQ0o7QUFBQSxFQUNGO0FBR0EsUUFBTSwyQkFBMkIsTUFBTTtBQUNyQyxVQUFNLGFBQWE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUE0SG5CLGlCQUFhLDhCQUE4QixZQUFZLGVBQWU7QUFDdEUsV0FBTyxxRkFBcUY7QUFBQSxFQUM5RjtBQUdBLFFBQU0sa0JBQWtCO0FBQUEsSUFDdEIsZ0JBQWdCO0FBQUEsSUFDaEIsYUFBYTtBQUFBLElBQ2IsWUFBWTtBQUFBLElBQ1osZUFBZTtBQUFBLElBQ2YsV0FBVztBQUFBLElBQ1gsZUFBZTtBQUFBLEVBQ2pCO0FBRUEsUUFBTSxjQUFjLGdCQUFnQixPQUFPLENBQUMsTUFBTSxFQUFFLFdBQVcsUUFBUSxFQUFFO0FBR3pFLE1BQUksc0JBQXNCO0FBQ3hCLFdBQU87QUFBQSxFQUNUO0FBRUEsU0FDRSxtQ0FJRztBQUFBLG1CQUNDLHVCQUFDLFNBQUksV0FBVSwyREFFYjtBQUFBLDZCQUFDLFNBQUksV0FBVSxtS0FDYjtBQUFBLCtCQUFDLFVBQUssV0FBVSxrREFBaEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUErRDtBQUFBLFFBQy9ELHVCQUFDLFVBQUssV0FBVSwwQkFBeUIsNkJBQXpDO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBc0Q7QUFBQSxRQUN0RCx1QkFBQyxTQUFJLFdBQVUseUZBQXdGLDBCQUF2RztBQUFBO0FBQUE7QUFBQTtBQUFBLGVBRUE7QUFBQSxXQUxGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFNQTtBQUFBLE1BR0E7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLFNBQVMsTUFBTSxVQUFVLElBQUk7QUFBQSxVQUM3QixXQUFVO0FBQUEsVUFDVixPQUFNO0FBQUEsVUFHTjtBQUFBLG1DQUFDLFVBQUssV0FBVSwwSEFBaEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBdUk7QUFBQSxZQUV2SSx1QkFBQyxTQUFJLFdBQVUsMENBQ2I7QUFBQSxxQ0FBQyxnQkFBYSxXQUFVLG9DQUF4QjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUF5RDtBQUFBLGNBQ3pELHVCQUFDLFNBQUksV0FBVSw2QkFDYjtBQUFBLHVDQUFDLFNBQUksV0FBVSxvRkFBbUYsNEJBQWxHO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBRUE7QUFBQSxnQkFDQSx1QkFBQyxTQUFJLFdBQVUseUVBQXdFLGlDQUF2RjtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUVBO0FBQUEsbUJBTkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFPQTtBQUFBLGlCQVRGO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBVUE7QUFBQSxZQUdDLGNBQWMsS0FDYix1QkFBQyxVQUFLLFdBQVUsa0pBQ2I7QUFBQTtBQUFBLGNBQVk7QUFBQSxpQkFEZjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUVBO0FBQUE7QUFBQTtBQUFBLFFBeEJKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQTBCQTtBQUFBLE1BR0MsbUJBQ0M7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLFNBQVMsTUFBTSxnQkFBZ0IsT0FBTztBQUFBLFVBQ3RDLFdBQVU7QUFBQSxVQUNWLE9BQU07QUFBQSxVQUNQO0FBQUE7QUFBQSxRQUpEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQU1BO0FBQUEsTUFJRjtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsU0FBUyxNQUFNLGdCQUFnQixLQUFLO0FBQUEsVUFDcEMsV0FBVTtBQUFBLFVBQ1YsT0FBTTtBQUFBLFVBQ1A7QUFBQTtBQUFBLFFBSkQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BTUE7QUFBQSxTQXpERjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBMERBLElBRUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLFNBQVMsTUFBTSxnQkFBZ0IsSUFBSTtBQUFBLFFBQ25DLFdBQVU7QUFBQSxRQUNWLE9BQU07QUFBQSxRQUVOLGlDQUFDLFVBQUssK0JBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUFxQjtBQUFBO0FBQUEsTUFMdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBTUE7QUFBQSxJQU1ELFVBQ0MsdUJBQUMsU0FBSSxXQUFVLCtJQUNiLGlDQUFDLFNBQUksV0FBVSxpSUFHYjtBQUFBLDZCQUFDLFNBQUksV0FBVSx3RUFDYjtBQUFBLCtCQUFDLFNBQUksV0FBVSwrQkFDYjtBQUFBLGlDQUFDLFNBQUksV0FBVSxpRkFDYixpQ0FBQyxnQkFBYSxXQUFVLGFBQXhCO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQWtDLEtBRHBDO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBRUE7QUFBQSxVQUNBLHVCQUFDLFNBQ0M7QUFBQSxtQ0FBQyxTQUFJLFdBQVUsMkJBQ2I7QUFBQSxxQ0FBQyxRQUFHLFdBQVUsOEVBQTZFLGdEQUEzRjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUVBO0FBQUEsY0FDQSx1QkFBQyxVQUFLLFdBQVUsOEhBQTZILDBCQUE3STtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUVBO0FBQUEsaUJBTkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFPQTtBQUFBLFlBQ0EsdUJBQUMsT0FBRSxXQUFVLGlDQUFnQztBQUFBO0FBQUEsY0FDSix1QkFBQyxVQUFLLFdBQVUsNEJBQTJCLGdDQUEzQztBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUEyRDtBQUFBLGNBQU87QUFBQSxjQUFhLHVCQUFDLFVBQUssV0FBVSwyQkFBMEIsaUNBQTFDO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQTJEO0FBQUEsY0FBTztBQUFBLGlCQUQxTDtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUVBO0FBQUEsZUFYRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQVlBO0FBQUEsYUFoQkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQWlCQTtBQUFBLFFBRUEsdUJBQUMsU0FBSSxXQUFVLDJCQUNaO0FBQUEsNkJBQ0M7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLFNBQVMsTUFBTTtBQUNiLDBCQUFVLEtBQUs7QUFDZixnQ0FBZ0IsT0FBTztBQUFBLGNBQ3pCO0FBQUEsY0FDQSxXQUFVO0FBQUEsY0FDVixPQUFNO0FBQUEsY0FFTixpQ0FBQyxVQUFLLGlDQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQXVCO0FBQUE7QUFBQSxZQVJ6QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFTQTtBQUFBLFVBRUY7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLFNBQVMsTUFBTSxVQUFVLEtBQUs7QUFBQSxjQUM5QixXQUFVO0FBQUEsY0FDVixPQUFNO0FBQUEsY0FFTixpQ0FBQyxLQUFFLFdBQVUsYUFBYjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUF1QjtBQUFBO0FBQUEsWUFMekI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBTUE7QUFBQSxhQW5CRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBb0JBO0FBQUEsV0F4Q0Y7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQXlDQTtBQUFBLE1BR0EsdUJBQUMsU0FBSSxXQUFVLG1MQUNiO0FBQUEsK0JBQUMsU0FBSSxXQUFVLHNDQUNiO0FBQUEsaUNBQUMsVUFBSyxXQUFVLGlIQUNkO0FBQUEsbUNBQUMsU0FBTSxXQUFVLCtCQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUE2QztBQUFBLFlBQUU7QUFBQSxlQURqRDtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUdBO0FBQUEsVUFDQSx1QkFBQyxPQUFFLFdBQVUsbUNBQWtDLHdLQUEvQztBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUVBO0FBQUEsYUFQRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBUUE7QUFBQSxRQUVBLHVCQUFDLFNBQUksV0FBVSxrRUFDYjtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsU0FBUztBQUFBLFlBQ1QsVUFBVTtBQUFBLFlBQ1YsV0FBVTtBQUFBLFlBRVY7QUFBQSxxQ0FBQyxRQUFLLFdBQVcsV0FBVyxjQUFjLGlCQUFpQixFQUFFLE1BQTdEO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQWlFO0FBQUEsY0FDakUsdUJBQUMsVUFBTSx3QkFBYyx5QkFBeUIsd0NBQTlDO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQW1GO0FBQUE7QUFBQTtBQUFBLFVBTnJGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQU9BLEtBUkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQVNBO0FBQUEsV0FwQkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQXFCQTtBQUFBLE1BR0EsdUJBQUMsU0FBSSxXQUFVLGFBQ2I7QUFBQSwrQkFBQyxTQUFJLFdBQVUscUNBQ2I7QUFBQSxpQ0FBQyxVQUFLLFdBQVUscUZBQ2Q7QUFBQSxtQ0FBQyxPQUFJLFdBQVUsNkJBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBeUM7QUFBQSxZQUFFO0FBQUEsZUFEN0M7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFHQTtBQUFBLFVBR0EsdUJBQUMsU0FBSSxXQUFVLCtCQUNiO0FBQUE7QUFBQSxjQUFDO0FBQUE7QUFBQSxnQkFDQyxTQUFTO0FBQUEsZ0JBQ1QsV0FBVTtBQUFBLGdCQUNWLE9BQU07QUFBQSxnQkFFTjtBQUFBLHlDQUFDLFFBQUssV0FBVSw4QkFBaEI7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFBMkM7QUFBQSxrQkFDM0MsdUJBQUMsVUFBSyxxQkFBTjtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUFXO0FBQUE7QUFBQTtBQUFBLGNBTmI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBT0E7QUFBQSxZQUVBO0FBQUEsY0FBQztBQUFBO0FBQUEsZ0JBQ0MsU0FBUztBQUFBLGdCQUNULFdBQVU7QUFBQSxnQkFDVixPQUFNO0FBQUEsZ0JBRU47QUFBQSx5Q0FBQyxTQUFNLFdBQVUsMEJBQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBQXdDO0FBQUEsa0JBQ3hDLHVCQUFDLFVBQUssMkJBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFBaUI7QUFBQTtBQUFBO0FBQUEsY0FObkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBT0E7QUFBQSxlQWpCRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQWtCQTtBQUFBLGFBekJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUEwQkE7QUFBQSxRQUVBLHVCQUFDLFNBQUksV0FBVSx5Q0FDWiwwQkFBZ0IsSUFBSSxDQUFDLFNBQVM7QUFDN0IsZ0JBQU0sV0FBVyxLQUFLLFdBQVc7QUFDakMsZ0JBQU0sZUFBZSxLQUFLLFdBQVc7QUFFckMsaUJBQ0U7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUVDLFdBQVcsd0NBQ1QsV0FDSSx5RUFDQSxlQUNBLCtDQUNBLCtCQUNOO0FBQUEsY0FFQSxpQ0FBQyxTQUFJLFdBQVUsMENBQ2I7QUFBQSx1Q0FBQyxTQUFJLFdBQVUsWUFDYjtBQUFBLHlDQUFDLFNBQUksV0FBVSwrQkFDYjtBQUFBLDJDQUFDLFVBQUssV0FBVSxtREFDYixlQUFLLFFBRFI7QUFBQTtBQUFBO0FBQUE7QUFBQSwyQkFFQTtBQUFBLG9CQUNBLHVCQUFDLFVBQUssV0FBVSxtR0FBa0c7QUFBQTtBQUFBLHNCQUMxRyxLQUFLO0FBQUEseUJBRGI7QUFBQTtBQUFBO0FBQUE7QUFBQSwyQkFFQTtBQUFBLHVCQU5GO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBT0E7QUFBQSxrQkFDQSx1QkFBQyxVQUFLLFdBQVUsOERBQ2IsZUFBSyxhQURSO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBRUE7QUFBQSxxQkFYRjtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQVlBO0FBQUEsZ0JBR0EsdUJBQUMsU0FBSSxXQUFVLCtDQUNiO0FBQUE7QUFBQSxvQkFBQztBQUFBO0FBQUEsc0JBQ0MsV0FBVywwRUFDVCxLQUFLLE9BQU8sWUFDUiw4Q0FDQSxLQUFLLE9BQU8sVUFDWixpREFDQSwyQ0FDTjtBQUFBLHNCQUVDLGVBQUs7QUFBQTtBQUFBLG9CQVRSO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkFVQTtBQUFBLGtCQUVBO0FBQUEsb0JBQUM7QUFBQTtBQUFBLHNCQUNDLFdBQVcseURBQ1QsV0FDSSwyREFDQSw0QkFDTjtBQUFBLHNCQUVDLHFCQUFXLHNCQUFzQixHQUFHLEtBQUssR0FBRztBQUFBO0FBQUEsb0JBUC9DO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkFRQTtBQUFBLHFCQXJCRjtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQXNCQTtBQUFBLG1CQXRDRjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQXVDQTtBQUFBO0FBQUEsWUFoREssS0FBSztBQUFBLFlBRFo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQWtEQTtBQUFBLFFBRUosQ0FBQyxLQTFESDtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBMkRBO0FBQUEsV0F4RkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQXlGQTtBQUFBLE1BR0EsdUJBQUMsU0FBSSxXQUFVLGFBQ2I7QUFBQSwrQkFBQyxTQUFJLFdBQVUscUNBQ2I7QUFBQSxpQ0FBQyxVQUFLLFdBQVUsdUZBQ2Q7QUFBQSxtQ0FBQyxZQUFTLFdBQVUsMkJBQXBCO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQTRDO0FBQUEsWUFBRTtBQUFBLGVBRGhEO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBR0E7QUFBQSxVQUVBO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FDQyxTQUFTO0FBQUEsY0FDVCxXQUFVO0FBQUEsY0FDVixPQUFNO0FBQUEsY0FFTjtBQUFBLHVDQUFDLFlBQVMsV0FBVSxpQkFBcEI7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBa0M7QUFBQSxnQkFDbEMsdUJBQUMsVUFBSyw2Q0FBTjtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUFtQztBQUFBO0FBQUE7QUFBQSxZQU5yQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFPQTtBQUFBLGFBYkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQWNBO0FBQUEsUUFHQSx1QkFBQyxTQUFJLFdBQVUsc0VBQ2I7QUFBQTtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsU0FBUyxNQUFNLGtCQUFrQixLQUFLO0FBQUEsY0FDdEMsV0FBVyxtREFDVCxtQkFBbUIsUUFBUSxzQ0FBc0MsaUNBQ25FO0FBQUEsY0FDRDtBQUFBO0FBQUEsWUFMRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFPQTtBQUFBLFVBQ0E7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLFNBQVMsTUFBTSxrQkFBa0IsU0FBUztBQUFBLGNBQzFDLFdBQVcsbURBQ1QsbUJBQW1CLFlBQVksc0VBQXNFLGlDQUN2RztBQUFBLGNBQ0Q7QUFBQTtBQUFBLFlBTEQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBT0E7QUFBQSxVQUNBO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FDQyxTQUFTLE1BQU0sa0JBQWtCLE9BQU87QUFBQSxjQUN4QyxXQUFXLG1EQUNULG1CQUFtQixVQUFVLHlFQUF5RSxpQ0FDeEc7QUFBQSxjQUNEO0FBQUE7QUFBQSxZQUxEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQU9BO0FBQUEsVUFDQTtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsU0FBUyxNQUFNLGtCQUFrQixPQUFPO0FBQUEsY0FDeEMsV0FBVyxtREFDVCxtQkFBbUIsVUFBVSxzRUFBc0UsaUNBQ3JHO0FBQUEsY0FDRDtBQUFBO0FBQUEsWUFMRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFPQTtBQUFBLGFBaENGO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFpQ0E7QUFBQSxRQUdBLHVCQUFDLFNBQUksV0FBVSwyQ0FDWDtBQUFBLDhCQUFtQixTQUFTLG1CQUFtQixjQUMvQyx1QkFBQyxTQUFJLFdBQVUsbUhBQ2I7QUFBQSxtQ0FBQyxTQUFJLFdBQVUsWUFDYjtBQUFBLHFDQUFDLFVBQUssV0FBVSxnQ0FBK0IsZ0NBQS9DO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQStEO0FBQUEsY0FDL0QsdUJBQUMsVUFBSyxXQUFVLGtCQUFrQiwwQkFBZ0Isa0JBQWxEO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQWlFO0FBQUEsaUJBRm5FO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBR0E7QUFBQSxZQUNBO0FBQUEsY0FBQztBQUFBO0FBQUEsZ0JBQ0MsU0FBUyxNQUFNLFdBQVcsZ0JBQWdCLGdCQUFnQixZQUFZO0FBQUEsZ0JBQ3RFLFdBQVU7QUFBQSxnQkFDVixPQUFNO0FBQUEsZ0JBRUwsd0JBQWMsZUFBZSx1QkFBQyxTQUFNLFdBQVUsa0NBQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQWdELElBQUssdUJBQUMsUUFBSyxXQUFVLGlCQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUE4QjtBQUFBO0FBQUEsY0FMbkg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBTUE7QUFBQSxlQVhGO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBWUE7QUFBQSxXQUdBLG1CQUFtQixTQUFTLG1CQUFtQixjQUMvQyx1QkFBQyxTQUFJLFdBQVUsbUhBQ2I7QUFBQSxtQ0FBQyxTQUFJLFdBQVUsWUFDYjtBQUFBLHFDQUFDLFVBQUssV0FBVSxnQ0FBK0IsNkJBQS9DO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQTREO0FBQUEsY0FDNUQsdUJBQUMsVUFBSyxXQUFVLGtCQUFrQiwwQkFBZ0IsZUFBbEQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBOEQ7QUFBQSxpQkFGaEU7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFHQTtBQUFBLFlBQ0E7QUFBQSxjQUFDO0FBQUE7QUFBQSxnQkFDQyxTQUFTLE1BQU0sV0FBVyxnQkFBZ0IsYUFBYSxTQUFTO0FBQUEsZ0JBQ2hFLFdBQVU7QUFBQSxnQkFDVixPQUFNO0FBQUEsZ0JBRUwsd0JBQWMsWUFBWSx1QkFBQyxTQUFNLFdBQVUsa0NBQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQWdELElBQUssdUJBQUMsUUFBSyxXQUFVLGlCQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUE4QjtBQUFBO0FBQUEsY0FMaEg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBTUE7QUFBQSxlQVhGO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBWUE7QUFBQSxXQUdBLG1CQUFtQixTQUFTLG1CQUFtQixZQUMvQyx1QkFBQyxTQUFJLFdBQVUsbUhBQ2I7QUFBQSxtQ0FBQyxTQUFJLFdBQVUsWUFDYjtBQUFBLHFDQUFDLFVBQUssV0FBVSxpQ0FBZ0Msb0NBQWhEO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQW9FO0FBQUEsY0FDcEUsdUJBQUMsVUFBSyxXQUFVLGtCQUFrQiwwQkFBZ0IsaUJBQWxEO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQWdFO0FBQUEsaUJBRmxFO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBR0E7QUFBQSxZQUNBO0FBQUEsY0FBQztBQUFBO0FBQUEsZ0JBQ0MsU0FBUyxNQUFNLFdBQVcsZ0JBQWdCLGVBQWUsZUFBZTtBQUFBLGdCQUN4RSxXQUFVO0FBQUEsZ0JBQ1YsT0FBTTtBQUFBLGdCQUVMLHdCQUFjLGtCQUFrQix1QkFBQyxTQUFNLFdBQVUsa0NBQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQWdELElBQUssdUJBQUMsUUFBSyxXQUFVLGlCQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUE4QjtBQUFBO0FBQUEsY0FMdEg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBTUE7QUFBQSxlQVhGO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBWUE7QUFBQSxXQUdBLG1CQUFtQixTQUFTLG1CQUFtQixZQUMvQyx1QkFBQyxTQUFJLFdBQVUsbUhBQ2I7QUFBQSxtQ0FBQyxTQUFJLFdBQVUsWUFDYjtBQUFBLHFDQUFDLFVBQUssV0FBVSxnQ0FBK0IsZ0NBQS9DO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQStEO0FBQUEsY0FDL0QsdUJBQUMsVUFBSyxXQUFVLGtCQUFrQiwwQkFBZ0IsaUJBQWxEO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQWdFO0FBQUEsaUJBRmxFO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBR0E7QUFBQSxZQUNBO0FBQUEsY0FBQztBQUFBO0FBQUEsZ0JBQ0MsU0FBUyxNQUFNLFdBQVcsZ0JBQWdCLGVBQWUsZUFBZTtBQUFBLGdCQUN4RSxXQUFVO0FBQUEsZ0JBQ1YsT0FBTTtBQUFBLGdCQUVMLHdCQUFjLGtCQUFrQix1QkFBQyxTQUFNLFdBQVUsa0NBQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQWdELElBQUssdUJBQUMsUUFBSyxXQUFVLGlCQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUE4QjtBQUFBO0FBQUEsY0FMdEg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBTUE7QUFBQSxlQVhGO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBWUE7QUFBQSxhQTlESjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBZ0VBO0FBQUEsV0F0SEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQXVIQTtBQUFBLE1BR0EsdUJBQUMsU0FBSSxXQUFVLDRHQUNiO0FBQUEsK0JBQUMsU0FBSSxXQUFVLG1GQUNiO0FBQUEsaUNBQUMsVUFBSyxrRUFBTjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUF3RDtBQUFBLFVBQ3hELHVCQUFDLFVBQUssV0FBVSxvQkFBbUIscUJBQW5DO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQXdDO0FBQUEsYUFGMUM7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUdBO0FBQUEsUUFDQyxVQUFVLElBQUksQ0FBQyxLQUFLLFVBQ25CO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFFQyxXQUNFLElBQUksU0FBUyxTQUFTLEtBQUssSUFBSSxTQUFTLE9BQU8sSUFDM0MsMkJBQ0EsSUFBSSxTQUFTLFFBQVEsS0FBSyxJQUFJLFNBQVMsUUFBUSxJQUMvQywrQkFDQSxJQUFJLFNBQVMsU0FBUyxLQUFLLElBQUksU0FBUyxPQUFPLEtBQUssSUFBSSxTQUFTLE9BQU8sSUFDeEUsa0JBQ0E7QUFBQSxZQUdMO0FBQUE7QUFBQSxVQVhJO0FBQUEsVUFEUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBYUEsQ0FDRDtBQUFBLFdBcEJIO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFxQkE7QUFBQSxNQUdBLHVCQUFDLFNBQUksV0FBVSw4RkFDYjtBQUFBLCtCQUFDLFNBQUksV0FBVSwrQkFDYjtBQUFBLGlDQUFDLGVBQVksV0FBVSw2QkFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBaUQ7QUFBQSxVQUNqRCx1QkFBQyxVQUFLLG9HQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQTBGO0FBQUEsYUFGNUY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUdBO0FBQUEsUUFDQTtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsU0FBUyxNQUFNLFVBQVUsS0FBSztBQUFBLFlBQzlCLFdBQVU7QUFBQSxZQUNYO0FBQUE7QUFBQSxVQUhEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQUtBO0FBQUEsV0FWRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBV0E7QUFBQSxTQWhVRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBa1VBLEtBblVGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FvVUE7QUFBQSxPQWxaSjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBb1pBO0FBRUo7IiwibmFtZXMiOltdfQ==