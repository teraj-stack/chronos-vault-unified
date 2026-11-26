import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-toolkit/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=019a4779"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-toolkit/node_modules/.vite/deps/react.js?v=019a4779"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"];
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
} from "/sentinel-toolkit/node_modules/.vite/deps/lucide-react.js?v=6cbc5a0a";
import { downloadFile } from "/sentinel-toolkit/src/utils/offlinePackageExporter.ts";
import { AfricanHornetSwarmModal } from "/sentinel-toolkit/src/components/AfricanHornetSwarmModal.tsx";
export const PanicButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeOSFilter, setActiveOSFilter] = useState("all");
  const [hornetModalOpen, setHornetModalOpen] = useState(false);
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
  return /* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV("div", { className: "fixed bottom-6 right-6 z-40 flex items-center space-x-2", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "hidden lg:flex items-center space-x-1.5 px-3 py-1.5 bg-slate-900/90 backdrop-blur-md border border-red-500/40 text-white rounded-xl shadow-xl text-xs font-mono", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-red-500 animate-ping" }, void 0, false, {
          fileName: "/app/applet/src/components/PanicButton.tsx",
          lineNumber: 303,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "text-red-400 font-bold", children: "PANIC BUTTON:" }, void 0, false, {
          fileName: "/app/applet/src/components/PanicButton.tsx",
          lineNumber: 304,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("kbd", { className: "px-1.5 py-0.5 bg-slate-950 border border-slate-700 rounded text-[10px] text-slate-300", children: "Ctrl+Alt+P" }, void 0, false, {
          fileName: "/app/applet/src/components/PanicButton.tsx",
          lineNumber: 305,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PanicButton.tsx",
        lineNumber: 302,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setIsOpen(true),
          className: "btn-glossy btn-glossy-red group relative flex items-center justify-center p-3.5 sm:px-5 sm:py-3.5 rounded-2xl shadow-2xl shadow-red-900/60 border-2 border-red-300/70 transform hover:scale-105 active:scale-95 transition-all duration-200",
          title: "Przycisk Paniki: Natychmiastowe zamrożenie procesów Fluttera (NtSuspendProcess / SIGSTOP 19)",
          children: [
            /* @__PURE__ */ jsxDEV("span", { className: "absolute -inset-1 rounded-2xl bg-red-500/30 blur-md group-hover:bg-red-500/50 animate-pulse transition-all pointer-events-none" }, void 0, false, {
              fileName: "/app/applet/src/components/PanicButton.tsx",
              lineNumber: 317,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "relative z-10 flex items-center space-x-2", children: [
              /* @__PURE__ */ jsxDEV(AlertOctagon, { className: "w-6 h-6 text-white animate-bounce" }, void 0, false, {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 320,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-left hidden sm:block", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-black tracking-wider uppercase leading-none font-mono text-white", children: "PANIC BUTTON" }, void 0, false, {
                  fileName: "/app/applet/src/components/PanicButton.tsx",
                  lineNumber: 322,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-red-100 font-mono font-medium opacity-90 leading-tight", children: "Multi-OS Suspend" }, void 0, false, {
                  fileName: "/app/applet/src/components/PanicButton.tsx",
                  lineNumber: 325,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 321,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PanicButton.tsx",
              lineNumber: 319,
              columnNumber: 11
            }, this),
            frozenCount > 0 && /* @__PURE__ */ jsxDEV("span", { className: "absolute -top-2 -right-2 bg-purple-600 border-2 border-white text-white text-[10px] font-mono font-black px-1.5 py-0.5 rounded-full shadow-lg z-20", children: [
              frozenCount,
              " ❄️"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PanicButton.tsx",
              lineNumber: 333,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/PanicButton.tsx",
          lineNumber: 311,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/PanicButton.tsx",
      lineNumber: 300,
      columnNumber: 7
    }, this),
    isOpen && /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 border-2 border-red-600/70 rounded-2xl max-w-4xl w-full p-5 sm:p-7 shadow-2xl shadow-red-950/80 space-y-5 my-auto relative", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-start justify-between pb-4 border-b border-red-900/40 gap-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-red-600/20 border border-red-500/40 rounded-xl text-red-400", children: /* @__PURE__ */ jsxDEV(AlertOctagon, { className: "w-8 h-8 animate-pulse" }, void 0, false, {
            fileName: "/app/applet/src/components/PanicButton.tsx",
            lineNumber: 351,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/PanicButton.tsx",
            lineNumber: 350,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV("h2", { className: "text-xl sm:text-2xl font-black text-white font-mono tracking-tight uppercase", children: "MULTI-OS PANIC COMMAND SEQUENCER" }, void 0, false, {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 355,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 bg-red-600 text-white rounded text-[10px] font-mono font-black uppercase", children: "EMERGENCY FREEZE" }, void 0, false, {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 358,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PanicButton.tsx",
              lineNumber: 354,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-slate-300 mt-0.5", children: [
              "Błyskawiczne zawieszenie wątków wszystkich instancji silnika Flutter w RAM (",
              /* @__PURE__ */ jsxDEV("code", { className: "text-purple-400 font-mono", children: "NtSuspendProcess" }, void 0, false, {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 363,
                columnNumber: 97
              }, this),
              " na Windows, ",
              /* @__PURE__ */ jsxDEV("code", { className: "text-cyan-400 font-mono", children: "SIGSTOP Signal 19" }, void 0, false, {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 363,
                columnNumber: 177
              }, this),
              " na Linux/macOS)."
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PanicButton.tsx",
              lineNumber: 362,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PanicButton.tsx",
            lineNumber: 353,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PanicButton.tsx",
          lineNumber: 349,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setIsOpen(false),
            className: "p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all",
            title: "Zamknij [Esc]",
            children: /* @__PURE__ */ jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
              fileName: "/app/applet/src/components/PanicButton.tsx",
              lineNumber: 373,
              columnNumber: 17
            }, this)
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/PanicButton.tsx",
            lineNumber: 368,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PanicButton.tsx",
        lineNumber: 348,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-red-950 via-rose-950 to-purple-950 p-4 sm:p-5 rounded-xl border border-red-500/50 shadow-inner flex flex-col sm:flex-row items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 text-center sm:text-left", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono font-bold text-red-300 uppercase flex items-center gap-1.5 justify-center sm:justify-start", children: [
            /* @__PURE__ */ jsxDEV(Radio, { className: "w-4 h-4 text-red-400 animate-ping" }, void 0, false, {
              fileName: "/app/applet/src/components/PanicButton.tsx",
              lineNumber: 381,
              columnNumber: 19
            }, this),
            "Tryb Natychmiastowego Unieruchomienia Procesów"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PanicButton.tsx",
            lineNumber: 380,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-200 max-w-xl", children: "Jednoczesne wstrzymanie cykli CPU bez ubijania procesu. Uwalnia kursor myszy i klawiaturę, uniemożliwiając nakładce przechwytywanie zdarzeń systemowych." }, void 0, false, {
            fileName: "/app/applet/src/components/PanicButton.tsx",
            lineNumber: 384,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PanicButton.tsx",
          lineNumber: 379,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setHornetModalOpen(true),
              className: "btn-glossy btn-glossy-amber w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-3.5 text-white font-mono font-black text-sm rounded-xl border border-amber-300/60 transition-all animate-pulse",
              title: "Wypuść Rój Dzikich Afrykańskich Szerszeni z paraliżującym jadem",
              children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-base", children: "🐝" }, void 0, false, {
                  fileName: "/app/applet/src/components/PanicButton.tsx",
                  lineNumber: 395,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "RÓJ SZERSZENI (APIS PURGE)" }, void 0, false, {
                  fileName: "/app/applet/src/components/PanicButton.tsx",
                  lineNumber: 396,
                  columnNumber: 19
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/PanicButton.tsx",
              lineNumber: 390,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: triggerMultiOsPanicSuspend,
              disabled: isExecuting,
              className: "btn-glossy btn-glossy-red w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3.5 text-white font-mono font-bold text-sm rounded-xl border border-red-300/60 transition-all",
              children: [
                /* @__PURE__ */ jsxDEV(Lock, { className: `w-4 h-4 ${isExecuting ? "animate-spin" : ""}` }, void 0, false, {
                  fileName: "/app/applet/src/components/PanicButton.tsx",
                  lineNumber: 404,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: isExecuting ? "ZAMRAŻANIE W TOKU..." : "❄️ ZAMROŹ WSZYSTKIE (PANIC FREEZE)" }, void 0, false, {
                  fileName: "/app/applet/src/components/PanicButton.tsx",
                  lineNumber: 405,
                  columnNumber: 19
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/PanicButton.tsx",
              lineNumber: 399,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PanicButton.tsx",
          lineNumber: 389,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PanicButton.tsx",
        lineNumber: 378,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(Cpu, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
              fileName: "/app/applet/src/components/PanicButton.tsx",
              lineNumber: 414,
              columnNumber: 19
            }, this),
            "Wykryte Procesy Docelowe (Windows, Linux, macOS):"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PanicButton.tsx",
            lineNumber: 413,
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
                    lineNumber: 425,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Wznów" }, void 0, false, {
                    fileName: "/app/applet/src/components/PanicButton.tsx",
                    lineNumber: 426,
                    columnNumber: 21
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 420,
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
                    lineNumber: 434,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Ubój Trwały" }, void 0, false, {
                    fileName: "/app/applet/src/components/PanicButton.tsx",
                    lineNumber: 435,
                    columnNumber: 21
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 429,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PanicButton.tsx",
            lineNumber: 419,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PanicButton.tsx",
          lineNumber: 412,
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
                      lineNumber: 459,
                      columnNumber: 29
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-900 text-slate-300 border border-slate-800", children: [
                      "PID: ",
                      proc.pid
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/PanicButton.tsx",
                      lineNumber: 462,
                      columnNumber: 29
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/PanicButton.tsx",
                    lineNumber: 458,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400 font-mono block truncate mt-0.5", children: proc.technique }, void 0, false, {
                    fileName: "/app/applet/src/components/PanicButton.tsx",
                    lineNumber: 466,
                    columnNumber: 27
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PanicButton.tsx",
                  lineNumber: 457,
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
                      lineNumber: 473,
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
                      lineNumber: 485,
                      columnNumber: 27
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PanicButton.tsx",
                  lineNumber: 472,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 456,
                columnNumber: 23
              }, this)
            },
            proc.pid,
            false,
            {
              fileName: "/app/applet/src/components/PanicButton.tsx",
              lineNumber: 446,
              columnNumber: 21
            },
            this
          );
        }) }, void 0, false, {
          fileName: "/app/applet/src/components/PanicButton.tsx",
          lineNumber: 440,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PanicButton.tsx",
        lineNumber: 411,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxDEV(Terminal, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
              fileName: "/app/applet/src/components/PanicButton.tsx",
              lineNumber: 506,
              columnNumber: 19
            }, this),
            "Polecenia Natychmiastowe do Skopiowania w Terminalu:"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PanicButton.tsx",
            lineNumber: 505,
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
                  lineNumber: 515,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Pobierz Skrypt .py (Multi-OS)" }, void 0, false, {
                  fileName: "/app/applet/src/components/PanicButton.tsx",
                  lineNumber: 516,
                  columnNumber: 19
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/PanicButton.tsx",
              lineNumber: 510,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PanicButton.tsx",
          lineNumber: 504,
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
              lineNumber: 522,
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
              lineNumber: 530,
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
              lineNumber: 538,
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
              lineNumber: 546,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PanicButton.tsx",
          lineNumber: 521,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 max-h-48 overflow-y-auto pr-1", children: [
          (activeOSFilter === "all" || activeOSFilter === "windows") && /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between gap-2 text-xs font-mono", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "truncate", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-blue-400 font-bold mr-2", children: "[Windows ctypes]" }, void 0, false, {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 561,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("code", { className: "text-slate-200", children: commandSnippets.windows_ctypes }, void 0, false, {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 562,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PanicButton.tsx",
              lineNumber: 560,
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
                  lineNumber: 569,
                  columnNumber: 53
                }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/PanicButton.tsx",
                  lineNumber: 569,
                  columnNumber: 106
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 564,
                columnNumber: 21
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PanicButton.tsx",
            lineNumber: 559,
            columnNumber: 19
          }, this),
          (activeOSFilter === "all" || activeOSFilter === "windows") && /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between gap-2 text-xs font-mono", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "truncate", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-blue-400 font-bold mr-2", children: "[Windows CMD]" }, void 0, false, {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 577,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("code", { className: "text-slate-200", children: commandSnippets.windows_cmd }, void 0, false, {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 578,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PanicButton.tsx",
              lineNumber: 576,
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
                  lineNumber: 585,
                  columnNumber: 50
                }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/PanicButton.tsx",
                  lineNumber: 585,
                  columnNumber: 103
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 580,
                columnNumber: 21
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PanicButton.tsx",
            lineNumber: 575,
            columnNumber: 19
          }, this),
          (activeOSFilter === "all" || activeOSFilter === "linux") && /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between gap-2 text-xs font-mono", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "truncate", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-amber-400 font-bold mr-2", children: "[Linux SIGSTOP (19)]" }, void 0, false, {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 593,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("code", { className: "text-slate-200", children: commandSnippets.linux_sigstop }, void 0, false, {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 594,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PanicButton.tsx",
              lineNumber: 592,
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
                  lineNumber: 601,
                  columnNumber: 56
                }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/PanicButton.tsx",
                  lineNumber: 601,
                  columnNumber: 109
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 596,
                columnNumber: 21
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PanicButton.tsx",
            lineNumber: 591,
            columnNumber: 19
          }, this),
          (activeOSFilter === "all" || activeOSFilter === "macos") && /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between gap-2 text-xs font-mono", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "truncate", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-pink-400 font-bold mr-2", children: "[macOS Terminal]" }, void 0, false, {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 609,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("code", { className: "text-slate-200", children: commandSnippets.macos_sigstop }, void 0, false, {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 610,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PanicButton.tsx",
              lineNumber: 608,
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
                  lineNumber: 617,
                  columnNumber: 56
                }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/PanicButton.tsx",
                  lineNumber: 617,
                  columnNumber: 109
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/PanicButton.tsx",
                lineNumber: 612,
                columnNumber: 21
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PanicButton.tsx",
            lineNumber: 607,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PanicButton.tsx",
          lineNumber: 557,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PanicButton.tsx",
        lineNumber: 503,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] font-mono space-y-1 h-28 overflow-y-auto", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-slate-500 pb-1 border-b border-slate-900 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "Dziennik Reakcji Jądra (Kernel Thread Freeze Log):" }, void 0, false, {
            fileName: "/app/applet/src/components/PanicButton.tsx",
            lineNumber: 627,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400", children: "READY" }, void 0, false, {
            fileName: "/app/applet/src/components/PanicButton.tsx",
            lineNumber: 628,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PanicButton.tsx",
          lineNumber: 626,
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
            lineNumber: 631,
            columnNumber: 17
          },
          this
        ))
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PanicButton.tsx",
        lineNumber: 625,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs text-slate-400", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsxDEV(ShieldAlert, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
            fileName: "/app/applet/src/components/PanicButton.tsx",
            lineNumber: 651,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Zachowuje stan RAM do zrzutu kryminalistycznego (MiniDumpWriteDump / GDB Core Dump)." }, void 0, false, {
            fileName: "/app/applet/src/components/PanicButton.tsx",
            lineNumber: 652,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PanicButton.tsx",
          lineNumber: 650,
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
            lineNumber: 654,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PanicButton.tsx",
        lineNumber: 649,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/PanicButton.tsx",
      lineNumber: 345,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/PanicButton.tsx",
      lineNumber: 344,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV(
      AfricanHornetSwarmModal,
      {
        isOpen: hornetModalOpen,
        onClose: () => setHornetModalOpen(false),
        targetGnidaName: "flutter_runner.exe",
        targetPid: 8932,
        onDecapitationComplete: () => {
          handleKillAll();
          setHornetModalOpen(false);
        }
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/components/PanicButton.tsx",
        lineNumber: 667,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/PanicButton.tsx",
    lineNumber: 296,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBhbmljQnV0dG9uLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFxuICBBbGVydE9jdGFnb24sIFNoaWVsZEFsZXJ0LCBaYXAsIExvY2ssIFRlcm1pbmFsLCBDb3B5LCBDaGVjaywgXG4gIERvd25sb2FkLCBQbGF5LCBSZWZyZXNoQ3csIFgsIFJhZGlvLCBBcnJvd1JpZ2h0LCBTa3VsbCwgXG4gIEZsYW1lLCBNb25pdG9yLCBDaGVja0NpcmNsZTIsIENoZXZyb25SaWdodCwgQ29ybmVyRG93blJpZ2h0LFxuICBIYXJkRHJpdmUsIENwdVxufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgZG93bmxvYWRGaWxlIH0gZnJvbSAnLi4vdXRpbHMvb2ZmbGluZVBhY2thZ2VFeHBvcnRlcic7XG5pbXBvcnQgeyBBZnJpY2FuSG9ybmV0U3dhcm1Nb2RhbCB9IGZyb20gJy4vQWZyaWNhbkhvcm5ldFN3YXJtTW9kYWwnO1xuXG5pbnRlcmZhY2UgUGFuaWNQcm9jZXNzVGFyZ2V0IHtcbiAgcGlkOiBudW1iZXI7XG4gIG5hbWU6IHN0cmluZztcbiAgb3M6ICd3aW5kb3dzJyB8ICdsaW51eCcgfCAnbWFjb3MnO1xuICB0ZWNobmlxdWU6IHN0cmluZztcbiAgc3RhdHVzOiAnYWN0aXZlJyB8ICdzdXNwZW5kaW5nJyB8ICdmcm96ZW4nIHwgJ3Jlc3VtZWQnO1xuICBjcHU6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNvbnN0IFBhbmljQnV0dG9uOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgY29uc3QgW2lzT3Blbiwgc2V0SXNPcGVuXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcbiAgY29uc3QgW2NvcGllZEtleSwgc2V0Q29waWVkS2V5XSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbaXNFeGVjdXRpbmcsIHNldElzRXhlY3V0aW5nXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcbiAgY29uc3QgW2FjdGl2ZU9TRmlsdGVyLCBzZXRBY3RpdmVPU0ZpbHRlcl0gPSB1c2VTdGF0ZTwnYWxsJyB8ICd3aW5kb3dzJyB8ICdsaW51eCcgfCAnbWFjb3MnPignYWxsJyk7XG4gIGNvbnN0IFtob3JuZXRNb2RhbE9wZW4sIHNldEhvcm5ldE1vZGFsT3Blbl0gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gIFxuICAvLyBTaW11bGF0ZWQgcHJvY2Vzc2VzIHRhcmdldCBsaXN0IGZvciBQYW5pYyBGcmVlemVcbiAgY29uc3QgW3RhcmdldFByb2Nlc3Nlcywgc2V0VGFyZ2V0UHJvY2Vzc2VzXSA9IHVzZVN0YXRlPFBhbmljUHJvY2Vzc1RhcmdldFtdPihbXG4gICAge1xuICAgICAgcGlkOiA4OTMyLFxuICAgICAgbmFtZTogJ2ZsdXR0ZXJfcnVubmVyLmV4ZScsXG4gICAgICBvczogJ3dpbmRvd3MnLFxuICAgICAgdGVjaG5pcXVlOiAnbnRkbGwuTnRTdXNwZW5kUHJvY2VzcyhoUHJvY2VzcykgWzB4MDgwMF0nLFxuICAgICAgc3RhdHVzOiAnYWN0aXZlJyxcbiAgICAgIGNwdTogNDYuOCxcbiAgICB9LFxuICAgIHtcbiAgICAgIHBpZDogMzg0MCxcbiAgICAgIG5hbWU6ICdkcm9wcGVyX3dhdGNoZG9nLmV4ZScsXG4gICAgICBvczogJ3dpbmRvd3MnLFxuICAgICAgdGVjaG5pcXVlOiAna2VybmVsMzIuU3VzcGVuZFRocmVhZCAvIE50U3VzcGVuZFByb2Nlc3MnLFxuICAgICAgc3RhdHVzOiAnYWN0aXZlJyxcbiAgICAgIGNwdTogMTUuMixcbiAgICB9LFxuICAgIHtcbiAgICAgIHBpZDogMTQyMDksXG4gICAgICBuYW1lOiAnZmx1dHRlcl9saW51eF9sb2NrJyxcbiAgICAgIG9zOiAnbGludXgnLFxuICAgICAgdGVjaG5pcXVlOiAna2lsbCAtMTkgKFNJR1NUT1ApIC8gcGtpbGwgLVNUT1AgLWYgZmx1dHRlcicsXG4gICAgICBzdGF0dXM6ICdhY3RpdmUnLFxuICAgICAgY3B1OiAzOC40LFxuICAgIH0sXG4gICAge1xuICAgICAgcGlkOiA5MjgxLFxuICAgICAgbmFtZTogJ0ZsdXR0ZXJNYWNPUy5hcHAvQ29udGVudHMvTWFjT1MvZmx1dHRlcicsXG4gICAgICBvczogJ21hY29zJyxcbiAgICAgIHRlY2huaXF1ZTogJ2tpbGwgLTE5IC8ga2lsbGFsbCAtU1RPUCBcIkZsdXR0ZXJNYWNPU1wiJyxcbiAgICAgIHN0YXR1czogJ2FjdGl2ZScsXG4gICAgICBjcHU6IDI5LjEsXG4gICAgfSxcbiAgXSk7XG5cbiAgY29uc3QgW3BhbmljTG9ncywgc2V0UGFuaWNMb2dzXSA9IHVzZVN0YXRlPHN0cmluZ1tdPihbXG4gICAgJ1sqXSBTeXN0ZW0gZ290b3dvxZtjaSBQQU5JQyBCVVRUT04gdXpicm9qb255IChNdWx0aS1PUyBLZXJuZWwgVGhyZWFkIEZyZWV6aW5nKS4nLFxuICAgICdbKl0gV3lrcnl0byA0IHByb2Nlc3kgcG93acSFemFuZSB6IHNpbG5pa2llbSBGbHV0dGVyIG5hIFdpbmRvd3MgLyBMaW51eCAvIG1hY09TLicsXG4gICAgJ1sqXSBHb3Rvd3kgZG8gbmF0eWNobWlhc3Rvd2VnbyB3eXdvxYJhbmlhIE50U3VzcGVuZFByb2Nlc3MgLyBTSUdTVE9QIChTaWduYWwgMTkpLicsXG4gIF0pO1xuXG4gIC8vIEdsb2JhbCBob3RrZXk6IEN0cmwgKyBBbHQgKyBQIG9yIEVzY2FwZSB0byBjbG9zZS9vcGVuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlS2V5RG93biA9IChlOiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICBpZiAoKGUuY3RybEtleSB8fCBlLm1ldGFLZXkpICYmIGUuYWx0S2V5ICYmIGUua2V5LnRvTG93ZXJDYXNlKCkgPT09ICdwJykge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHNldElzT3BlbigocHJldikgPT4gIXByZXYpO1xuICAgICAgfSBlbHNlIGlmIChlLmtleSA9PT0gJ0VzY2FwZScgJiYgaXNPcGVuKSB7XG4gICAgICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlS2V5RG93bik7XG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlS2V5RG93bik7XG4gIH0sIFtpc09wZW5dKTtcblxuICBjb25zdCBhZGRMb2cgPSAobXNnOiBzdHJpbmcpID0+IHtcbiAgICBzZXRQYW5pY0xvZ3MoKHByZXYpID0+IFsuLi5wcmV2LnNsaWNlKC0yMCksIGBbJHtuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpfV0gJHttc2d9YF0pO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUNvcHkgPSAodGV4dDogc3RyaW5nLCBrZXk6IHN0cmluZykgPT4ge1xuICAgIG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KHRleHQpO1xuICAgIHNldENvcGllZEtleShrZXkpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0Q29waWVkS2V5KG51bGwpLCAyMDAwKTtcbiAgfTtcblxuICAvLyBUcmlnZ2VyIEltbWVkaWF0ZSBNdWx0aS1PUyBTdXNwZW5kIFNlcXVlbmNlXG4gIGNvbnN0IHRyaWdnZXJNdWx0aU9zUGFuaWNTdXNwZW5kID0gKCkgPT4ge1xuICAgIHNldElzRXhlY3V0aW5nKHRydWUpO1xuICAgIGFkZExvZygn8J+aqCBbUEFOSUMgVFJJR0dFUkVEXSBSb3pwb2N6xJl0byBuYXR5Y2htaWFzdG93xIUgcHJvY2VkdXLEmSBhd2FyeWpuZWdvIHphbXJhxbxhbmlhIChFbWVyZ2VuY3kgRnJlZXplKS4uLicpO1xuICAgIFxuICAgIC8vIFdpbmRvd3MgZXhlY3V0aW9uIGxvZ1xuICAgIGFkZExvZygn4pqhIFtXSU5ET1dTXSDFgWFkb3dhbmllIG50ZGxsLmRsbCAtPiBOdFN1c3BlbmRQcm9jZXNzIGRsYSB3c3p5c3RraWNoIHByb2Nlc8OzdyB6IGZsdXR0ZXJfd2luZG93cy5kbGwuLi4nKTtcbiAgICBhZGRMb2coJ+KaoSBbTElOVVhdIFd5c3nFgmFuaWUgc3lnbmHFgnUgU0lHU1RPUCAoa2lsbCAtMTkpIGRvIGdydXB5IHBncmVwIC1mIGZsdXR0ZXIuLi4nKTtcbiAgICBhZGRMb2coJ+KaoSBbTUFDT1NdIFd5d2/Fgnl3YW5pZSBraWxsYWxsIC1TVE9QIC8gc2lnbmFsLlNJR1NUT1AgZGxhIHByb2Nlc8OzdyBRdWFydHogRmx1dHRlci4uLicpO1xuXG4gICAgc2V0VGFyZ2V0UHJvY2Vzc2VzKChwcmV2KSA9PlxuICAgICAgcHJldi5tYXAoKHApID0+ICh7XG4gICAgICAgIC4uLnAsXG4gICAgICAgIHN0YXR1czogJ3N1c3BlbmRpbmcnLFxuICAgICAgfSkpXG4gICAgKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc2V0VGFyZ2V0UHJvY2Vzc2VzKChwcmV2KSA9PlxuICAgICAgICBwcmV2Lm1hcCgocCkgPT4gKHtcbiAgICAgICAgICAuLi5wLFxuICAgICAgICAgIHN0YXR1czogJ2Zyb3plbicsXG4gICAgICAgICAgY3B1OiAwLjAsXG4gICAgICAgIH0pKVxuICAgICAgKTtcbiAgICAgIHNldElzRXhlY3V0aW5nKGZhbHNlKTtcbiAgICAgIGFkZExvZygn4p2E77iPIFtTVUtDRVNdIFdzenlzdGtpZSA0IHByb2Nlc3kgRmx1dHRlciB6b3N0YcWCeSBaQU1ST8W7T05FIFcgUkFNICgwJSBDUFUsIHN0YW46IFQgLyBTVVNQRU5ERUQpIScpO1xuICAgICAgYWRkTG9nKCfwn5SSIEt1cnNvciBpIGtsYXdpYXR1cmEgb2R6eXNrYW5lLiBQYW1pxJnEhyBSQU0gemFjaG93YW5hIGRvIGFuYWxpenkga3J5bWluYWxpc3R5Y3puZWouJyk7XG4gICAgfSwgNjAwKTtcbiAgfTtcblxuICAvLyBSZXN1bWUgLyBVbmZyZWV6ZSB0YXJnZXQgcHJvY2Vzc2VzXG4gIGNvbnN0IGhhbmRsZVJlc3VtZVByb2Nlc3NlcyA9ICgpID0+IHtcbiAgICBhZGRMb2coJ+KWtu+4jyBbUkVTVU1FXSBQcnp5d3JhY2FuaWUgcHJvY2Vzw7N3IChOdFJlc3VtZVByb2Nlc3MgLyBraWxsIC1DT05UIDE4KS4uLicpO1xuICAgIHNldFRhcmdldFByb2Nlc3NlcygocHJldikgPT5cbiAgICAgIHByZXYubWFwKChwKSA9PiAoe1xuICAgICAgICAuLi5wLFxuICAgICAgICBzdGF0dXM6ICdyZXN1bWVkJyxcbiAgICAgICAgY3B1OiBwLm9zID09PSAnd2luZG93cycgPyAzMi41IDogMjAuMCxcbiAgICAgIH0pKVxuICAgICk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBhZGRMb2coJ+KaoO+4jyBQcm9jZXN5IHd6bm93acWCeSB3eWtvbnl3YW5pZSBpbnN0cnVrY2ppLicpO1xuICAgIH0sIDQwMCk7XG4gIH07XG5cbiAgLy8gSGFyZCBLaWxsIEFsbFxuICBjb25zdCBoYW5kbGVLaWxsQWxsID0gKCkgPT4ge1xuICAgIGFkZExvZygn8J+SpSBbSEFSRCBLSUxMXSBUZXJtaW5hdGVQcm9jZXNzIC8ga2lsbCAtOSBTSUdLSUxMIGRsYSB3c3p5c3RraWNoIHByb2Nlc8OzdyEnKTtcbiAgICBzZXRUYXJnZXRQcm9jZXNzZXMoKHByZXYpID0+XG4gICAgICBwcmV2Lm1hcCgocCkgPT4gKHtcbiAgICAgICAgLi4ucCxcbiAgICAgICAgc3RhdHVzOiAnZnJvemVuJyxcbiAgICAgICAgY3B1OiAwLjAsXG4gICAgICAgIHRlY2huaXF1ZTogJ1RFUk1JTkFURUQgKFNJR0tJTEwgLyAweDAwMDEpJyxcbiAgICAgIH0pKVxuICAgICk7XG4gIH07XG5cbiAgLy8gRXhwb3J0IFVuaXZlcnNhbCBNdWx0aS1PUyBQeXRob24gUGFuaWMgU2NyaXB0XG4gIGNvbnN0IGV4cG9ydE11bHRpT3NQYW5pY1NjcmlwdCA9ICgpID0+IHtcbiAgICBjb25zdCBweXRob25Db2RlID0gYFwiXCJcIlxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbk1VTFRJLU9TIEVNRVJHRU5DWSBQQU5JQyBGUkVFWkUgU0NSSVBUIChXSU5ET1dTIC8gTElOVVggLyBNQUNPUylcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4xMDAlIE9GRkxJTkUgLyBaRVJPLURFUEVOREVOQ1kgRU1FUkdFTkNZIFNVU1BFTkQgRU5HSU5FXG5BdXRvbWF0eWN6bmllIHd5a3J5d2Egc3lzdGVtIG9wZXJhY3lqbnkgaSBuYXR5Y2htaWFzdG93byBaQU1SQcW7QSAoTnRTdXNwZW5kUHJvY2Vzc1xubHViIFNJR1NUT1AgU2lnbmFsIDE5KSB3c3p5c3RraWUgcHJvY2VzeSBwb3dpxIV6YW5lIHogRmx1dHRlcmVtIGkgbmFrxYJhZGthbWkuXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXCJcIlwiXG5pbXBvcnQgc3lzXG5pbXBvcnQgb3NcbmltcG9ydCBwbGF0Zm9ybVxuaW1wb3J0IHN1YnByb2Nlc3NcbmltcG9ydCBzaWduYWxcblxuZGVmIHBhbmljX3N1c3BlbmRfd2luZG93cygpOlxuICAgIFwiXCJcIldpbmRvd3MgS2VybmVsIFRocmVhZCAmIFByb2Nlc3MgU3VzcGVuZCB2aWEgbnRkbGwuTnRTdXNwZW5kUHJvY2Vzc1wiXCJcIlxuICAgIHByaW50KFwiWypdIFd5a3J5dG8gxZtyb2Rvd2lza28gV0lORE9XUy4gSW5pY2phbGl6YWNqYSBudGRsbCAvIGN0eXBlcy4uLlwiKVxuICAgIHRyeTpcbiAgICAgICAgaW1wb3J0IGN0eXBlc1xuICAgICAgICBmcm9tIGN0eXBlcyBpbXBvcnQgd2ludHlwZXNcblxuICAgICAgICBudGRsbCA9IGN0eXBlcy53aW5kbGwubnRkbGxcbiAgICAgICAga2VybmVsMzIgPSBjdHlwZXMud2luZGxsLmtlcm5lbDMyXG4gICAgICAgIFBST0NFU1NfU1VTUEVORF9SRVNVTUUgPSAweDA4MDBcblxuICAgICAgICAjIFd5c3p1a2l3YW5pZSBwcm9jZXPDs3cgRmx1dHRlciB6YSBwb21vY8SFIHRhc2tsaXN0XG4gICAgICAgIGNtZCA9ICd0YXNrbGlzdCAvRk8gQ1NWIC9OSCdcbiAgICAgICAgb3V0cHV0ID0gc3VicHJvY2Vzcy5jaGVja19vdXRwdXQoY21kLCBzaGVsbD1UcnVlLCB0ZXh0PVRydWUsIGVycm9ycz0naWdub3JlJylcbiAgICAgICAgXG4gICAgICAgIHRhcmdldF9uYW1lcyA9IFsnZmx1dHRlcicsICdydW5uZXInLCAnb3ZlcmxheScsICdkcm9wcGVyJywgJ2xvY2tzY3JlZW4nXVxuICAgICAgICBzdXNwZW5kZWRfY291bnQgPSAwXG5cbiAgICAgICAgZm9yIGxpbmUgaW4gb3V0cHV0LnN0cmlwKCkuc3BsaXQoJ1xcXFxuJyk6XG4gICAgICAgICAgICBwYXJ0cyA9IFtwLnN0cmlwKCdcXFwiJykgZm9yIHAgaW4gbGluZS5zcGxpdCgnXFxcIixcXFwiJyldXG4gICAgICAgICAgICBpZiBsZW4ocGFydHMpID49IDI6XG4gICAgICAgICAgICAgICAgcG5hbWUgPSBwYXJ0c1swXVxuICAgICAgICAgICAgICAgIHRyeTpcbiAgICAgICAgICAgICAgICAgICAgcGlkID0gaW50KHBhcnRzWzFdKVxuICAgICAgICAgICAgICAgIGV4Y2VwdCBWYWx1ZUVycm9yOlxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgICAgICAgICAgaWYgYW55KHQgaW4gcG5hbWUubG93ZXIoKSBmb3IgdCBpbiB0YXJnZXRfbmFtZXMpOlxuICAgICAgICAgICAgICAgICAgICBwcmludChmXCJbIV0gWmFtcmHFvGFuaWUgUElEIHtwaWR9ICh7cG5hbWV9KS4uLlwiKVxuICAgICAgICAgICAgICAgICAgICBoX3Byb2Nlc3MgPSBrZXJuZWwzMi5PcGVuUHJvY2VzcyhQUk9DRVNTX1NVU1BFTkRfUkVTVU1FLCBGYWxzZSwgcGlkKVxuICAgICAgICAgICAgICAgICAgICBpZiBoX3Byb2Nlc3M6XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMgPSBudGRsbC5OdFN1c3BlbmRQcm9jZXNzKGhfcHJvY2VzcylcbiAgICAgICAgICAgICAgICAgICAgICAgIGtlcm5lbDMyLkNsb3NlSGFuZGxlKGhfcHJvY2VzcylcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIHN0YXR1cyA9PSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW50KGZcIiAgW+Kck10gTnRTdXNwZW5kUHJvY2VzcyhQSUQ9e3BpZH0pIFNVS0NFUyEgV8SFdGtpIHphbXJvxbxvbmUgdyBSQU0uXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VzcGVuZGVkX2NvdW50ICs9IDFcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2U6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpbnQoZlwiICBbWF0gTnRTdXNwZW5kUHJvY2VzcyB6d3LDs2NpxYIga29kIE5UU1RBVFVTOiAweHtzdGF0dXM6MDhYfVwiKVxuICAgICAgICAgICAgICAgICAgICBlbHNlOlxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpbnQoZlwiICBbWF0gQnJhayB1cHJhd25pZcWEIGRvIE9wZW5Qcm9jZXNzIGRsYSBQSUQge3BpZH0uIFVydWNob20gamFrbyBBZG1pbmlzdHJhdG9yIVwiKVxuXG4gICAgICAgIHByaW50KGZcIlxcXFxuW1pBS0/Fg0NaT05PXSBaYW1yb8W8b25vIHtzdXNwZW5kZWRfY291bnR9IHByb2Nlc8OzdyBuYSBwbGF0Zm9ybWllIFdpbmRvd3MuXCIpXG5cbiAgICBleGNlcHQgRXhjZXB0aW9uIGFzIGU6XG4gICAgICAgIHByaW50KGZcIltCxYHEhEQgV0lORE9XU10ge2V9XCIpXG5cbmRlZiBwYW5pY19zdXNwZW5kX3Bvc2l4KG9zX25hbWUpOlxuICAgIFwiXCJcIkxpbnV4ICYgbWFjT1MgUHJvY2VzcyBGcmVlemUgdmlhIFNJR1NUT1AgKFNpZ25hbCAxOSlcIlwiXCJcbiAgICBwcmludChmXCJbKl0gV3lrcnl0byDFm3JvZG93aXNrbyBQT1NJWCAoe29zX25hbWV9KS4gV3lzecWCYW5pZSBzeWduYcWCdSBTSUdTVE9QICgxOSkuLi5cIilcbiAgICB0YXJnZXRfcGF0dGVybnMgPSBbJ2ZsdXR0ZXInLCAnZmx1dHRlcl9ydW5uZXInLCAnbG9ja3NjcmVlbicsICdvdmVybGF5X2FwcCddXG4gICAgc3VzcGVuZGVkX2NvdW50ID0gMFxuXG4gICAgZm9yIHBhdHRlcm4gaW4gdGFyZ2V0X3BhdHRlcm5zOlxuICAgICAgICB0cnk6XG4gICAgICAgICAgICAjIFXFvHljaWUgcGdyZXAgZG8gbmFtaWVyemVuaWEgUElEw7N3XG4gICAgICAgICAgICBwaWRzX3JhdyA9IHN1YnByb2Nlc3MuY2hlY2tfb3V0cHV0KFsncGdyZXAnLCAnLWYnLCBwYXR0ZXJuXSwgdGV4dD1UcnVlLCBlcnJvcnM9J2lnbm9yZScpXG4gICAgICAgICAgICBwaWRzID0gW2ludChwKSBmb3IgcCBpbiBwaWRzX3Jhdy5zdHJpcCgpLnNwbGl0KCkgaWYgcC5pc2RpZ2l0KCldXG5cbiAgICAgICAgICAgIGZvciBwaWQgaW4gcGlkczpcbiAgICAgICAgICAgICAgICBpZiBwaWQgPT0gb3MuZ2V0cGlkKCk6XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlICMgTmllIHphbXJhxbxhaiBzYW1lZ28gc2llYmllXG4gICAgICAgICAgICAgICAgdHJ5OlxuICAgICAgICAgICAgICAgICAgICBvcy5raWxsKHBpZCwgc2lnbmFsLlNJR1NUT1ApICMgU3lnbmHFgiAxOSAoV3N0cnp5bWFuaWUpXG4gICAgICAgICAgICAgICAgICAgIHByaW50KGZcIiAgW+Kck10ga2lsbCAtU1RPUCAoUElEPXtwaWR9LCB3em9yemVjPSd7cGF0dGVybn0nKSAtPiBXxIV0a2kgemF0cnp5bWFuZSBwcnpleiBzY2hlZHVsZXIgasSFZHJhIVwiKVxuICAgICAgICAgICAgICAgICAgICBzdXNwZW5kZWRfY291bnQgKz0gMVxuICAgICAgICAgICAgICAgIGV4Y2VwdCBQZXJtaXNzaW9uRXJyb3I6XG4gICAgICAgICAgICAgICAgICAgIHByaW50KGZcIiAgW1hdIFd5bWFnYW55IHJvb3QgLyBzdWRvIGRsYSBQSUQge3BpZH0hXCIpXG4gICAgICAgICAgICAgICAgZXhjZXB0IFByb2Nlc3NMb29rdXBFcnJvcjpcbiAgICAgICAgICAgICAgICAgICAgcGFzc1xuICAgICAgICBleGNlcHQgc3VicHJvY2Vzcy5DYWxsZWRQcm9jZXNzRXJyb3I6XG4gICAgICAgICAgICAjIEJyYWsgcHJvY2Vzw7N3IGRsYSBkYW5lZ28gd3pvcmNhXG4gICAgICAgICAgICBwYXNzXG5cbiAgICAjIFN6eWJrYSBrb21lbmRhIHBvd8WCb2tpIHcgY2VsYWNoIHJlZHVuZGFuY2ppXG4gICAgdHJ5OlxuICAgICAgICBzdWJwcm9jZXNzLnJ1bihbJ3BraWxsJywgJy1TVE9QJywgJy1mJywgJ2ZsdXR0ZXInXSwgY2hlY2s9RmFsc2UpXG4gICAgZXhjZXB0IEV4Y2VwdGlvbjpcbiAgICAgICAgcGFzc1xuXG4gICAgcHJpbnQoZlwiXFxcXG5bWkFLT8WDQ1pPTk9dIFphbXJvxbxvbm8ge3N1c3BlbmRlZF9jb3VudH0gcHJvY2Vzw7N3IG5hIHBsYXRmb3JtaWUge29zX25hbWV9LlwiKVxuXG5kZWYgbWFpbigpOlxuICAgIHByaW50KFwiPVwiICogNzApXG4gICAgcHJpbnQoXCIgIEVNRVJHRU5DWSBQQU5JQyBGUkVFWkU6IE1VTFRJLU9TIFNJTVVMVEFORU9VUyBQUk9DRVNTIFNVU1BFTkRcIilcbiAgICBwcmludChcIj1cIiAqIDcwKVxuICAgIFxuICAgIGN1cnJlbnRfb3MgPSBwbGF0Zm9ybS5zeXN0ZW0oKS5sb3dlcigpXG4gICAgcHJpbnQoZlwiWypdIFd5a3J5dGEgcGxhdGZvcm1hIGrEhWRyYToge3BsYXRmb3JtLnN5c3RlbSgpfSAoe3BsYXRmb3JtLnJlbGVhc2UoKX0pXCIpXG5cbiAgICBpZiBjdXJyZW50X29zID09ICd3aW5kb3dzJzpcbiAgICAgICAgcGFuaWNfc3VzcGVuZF93aW5kb3dzKClcbiAgICBlbGlmIGN1cnJlbnRfb3MgPT0gJ2xpbnV4JzpcbiAgICAgICAgcGFuaWNfc3VzcGVuZF9wb3NpeCgnTGludXgnKVxuICAgIGVsaWYgY3VycmVudF9vcyA9PSAnZGFyd2luJzpcbiAgICAgICAgcGFuaWNfc3VzcGVuZF9wb3NpeCgnbWFjT1MnKVxuICAgIGVsc2U6XG4gICAgICAgIHByaW50KGZcIlshXSBOaWV6bmFueSBzeXN0ZW06IHtjdXJyZW50X29zfS4gUHLDs2JhIHd5a29uYW5pYSBzdGFuZGFyZG93ZWdvIFNJR1NUT1AuLi5cIilcbiAgICAgICAgcGFuaWNfc3VzcGVuZF9wb3NpeChjdXJyZW50X29zKVxuXG4gICAgcHJpbnQoXCI9XCIgKiA3MClcbiAgICBwcmludChcIiAgU1RBTiBBV0FSWUpOWTogUFJPQ0VTWSBaQVRSWllNQU5FIFcgUEFNScSYQ0kgUkFNICgwJSBDUFUpXCIpXG4gICAgcHJpbnQoXCIgIEFieSB3em5vd2nEhyBwcm9jZXN5IHcgY2VsYWNoIGRlYnVnb3dhbmlhOlwiKVxuICAgIHByaW50KFwiICAgIC0gTGludXgvbWFjT1MgOiBraWxsIC1DT05UIDxQSUQ+ICBsdWIgIHBraWxsIC1DT05UIC1mIGZsdXR0ZXJcIilcbiAgICBwcmludChcIiAgICAtIFdpbmRvd3MgICAgIDogbnRkbGwuTnRSZXN1bWVQcm9jZXNzKGhQcm9jZXNzKVwiKVxuICAgIHByaW50KFwiPVwiICogNzApXG5cbmlmIF9fbmFtZV9fID09ICdfX21haW5fXyc6XG4gICAgbWFpbigpXG5gO1xuICAgIGRvd25sb2FkRmlsZSgnZW1lcmdlbmN5X3BhbmljX3N1c3BlbmQucHknLCBweXRob25Db2RlLCAndGV4dC94LXB5dGhvbicpO1xuICAgIGFkZExvZygn4pyUIFtFWFBPUlRdIFBvYnJhbm8gdW5pd2Vyc2Fsbnkgc2tyeXB0OiBlbWVyZ2VuY3lfcGFuaWNfc3VzcGVuZC5weSAoUHl0aG9uIE11bHRpLU9TKScpO1xuICB9O1xuXG4gIC8vIENvbW1hbmRzIHJlZmVyZW5jZSBwZXIgT1NcbiAgY29uc3QgY29tbWFuZFNuaXBwZXRzID0ge1xuICAgIHdpbmRvd3NfY3R5cGVzOiBgcHl0aG9uIC1jIFwiaW1wb3J0IGN0eXBlczsgaD1jdHlwZXMud2luZGxsLmtlcm5lbDMyLk9wZW5Qcm9jZXNzKDB4MDgwMCwwLFBJRCk7IGN0eXBlcy53aW5kbGwubnRkbGwuTnRTdXNwZW5kUHJvY2VzcyhoKVwiYCxcbiAgICB3aW5kb3dzX2NtZDogYHRhc2traWxsIC9GIC9JTSBmbHV0dGVyX3J1bm5lci5leGUgL1RgLFxuICAgIHdpbmRvd3NfcHM6IGBHZXQtUHJvY2VzcyAqZmx1dHRlciogfCBGb3JFYWNoLU9iamVjdCB7ICRoPVtTeXN0ZW0uRGlhZ25vc3RpY3MuUHJvY2Vzc106OkdldFByb2Nlc3NCeUlkKCRfLklkKS5IYW5kbGU7IFtJbnRQdHJdJHB0cj0kaDsgW05hdGl2ZV06Ok50U3VzcGVuZFByb2Nlc3MoJHB0cikgfWAsXG4gICAgbGludXhfc2lnc3RvcDogYHBraWxsIC1TVE9QIC1mIGZsdXR0ZXIgfHwga2lsbCAtMTkgJChwZ3JlcCAtZiBmbHV0dGVyKWAsXG4gICAgbGludXhfZ2RiOiBgZ2RiIC1wICQocGdyZXAgLWYgZmx1dHRlciB8IGhlYWQgLW4xKSAtYmF0Y2ggLWV4IFwiY2FsbCAodm9pZClwYXVzZSgpXCJgLFxuICAgIG1hY29zX3NpZ3N0b3A6IGBraWxsYWxsIC1TVE9QIFwiZmx1dHRlcl9ydW5uZXJcIiB8fCBwa2lsbCAtMTkgLWYgXCJGbHV0dGVyXCJgLFxuICB9O1xuXG4gIGNvbnN0IGZyb3plbkNvdW50ID0gdGFyZ2V0UHJvY2Vzc2VzLmZpbHRlcigocCkgPT4gcC5zdGF0dXMgPT09ICdmcm96ZW4nKS5sZW5ndGg7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgey8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi99XG4gICAgICB7LyogRkxPQVRJTkcgUEFOSUMgVFJJR0dFUiBCVVRUT04gKEZpeGVkIG9uIHNjcmVlbiBib3R0b20gcmlnaHQpICovfVxuICAgICAgey8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGJvdHRvbS02IHJpZ2h0LTYgei00MCBmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTJcIj5cbiAgICAgICAgey8qIEhlbHBlciB0b29sdGlwIGJhZGdlIG9uIGRlc2t0b3AgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGlkZGVuIGxnOmZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMS41IHB4LTMgcHktMS41IGJnLXNsYXRlLTkwMC85MCBiYWNrZHJvcC1ibHVyLW1kIGJvcmRlciBib3JkZXItcmVkLTUwMC80MCB0ZXh0LXdoaXRlIHJvdW5kZWQteGwgc2hhZG93LXhsIHRleHQteHMgZm9udC1tb25vXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0yIGgtMiByb3VuZGVkLWZ1bGwgYmctcmVkLTUwMCBhbmltYXRlLXBpbmdcIiAvPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcmVkLTQwMCBmb250LWJvbGRcIj5QQU5JQyBCVVRUT046PC9zcGFuPlxuICAgICAgICAgIDxrYmQgY2xhc3NOYW1lPVwicHgtMS41IHB5LTAuNSBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgcm91bmRlZCB0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTMwMFwiPlxuICAgICAgICAgICAgQ3RybCtBbHQrUFxuICAgICAgICAgIDwva2JkPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogQmlnIFB1bHNpbmcgRW1lcmdlbmN5IFBhbmljIEJ1dHRvbiAqL31cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldElzT3Blbih0cnVlKX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJidG4tZ2xvc3N5IGJ0bi1nbG9zc3ktcmVkIGdyb3VwIHJlbGF0aXZlIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHAtMy41IHNtOnB4LTUgc206cHktMy41IHJvdW5kZWQtMnhsIHNoYWRvdy0yeGwgc2hhZG93LXJlZC05MDAvNjAgYm9yZGVyLTIgYm9yZGVyLXJlZC0zMDAvNzAgdHJhbnNmb3JtIGhvdmVyOnNjYWxlLTEwNSBhY3RpdmU6c2NhbGUtOTUgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMjAwXCJcbiAgICAgICAgICB0aXRsZT1cIlByenljaXNrIFBhbmlraTogTmF0eWNobWlhc3Rvd2UgemFtcm/FvGVuaWUgcHJvY2Vzw7N3IEZsdXR0ZXJhIChOdFN1c3BlbmRQcm9jZXNzIC8gU0lHU1RPUCAxOSlcIlxuICAgICAgICA+XG4gICAgICAgICAgey8qIEFuaW1hdGVkIEdsb3cgSGFsbyAqL31cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhYnNvbHV0ZSAtaW5zZXQtMSByb3VuZGVkLTJ4bCBiZy1yZWQtNTAwLzMwIGJsdXItbWQgZ3JvdXAtaG92ZXI6YmctcmVkLTUwMC81MCBhbmltYXRlLXB1bHNlIHRyYW5zaXRpb24tYWxsIHBvaW50ZXItZXZlbnRzLW5vbmVcIiAvPlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSB6LTEwIGZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMlwiPlxuICAgICAgICAgICAgPEFsZXJ0T2N0YWdvbiBjbGFzc05hbWU9XCJ3LTYgaC02IHRleHQtd2hpdGUgYW5pbWF0ZS1ib3VuY2VcIiAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWxlZnQgaGlkZGVuIHNtOmJsb2NrXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJsYWNrIHRyYWNraW5nLXdpZGVyIHVwcGVyY2FzZSBsZWFkaW5nLW5vbmUgZm9udC1tb25vIHRleHQtd2hpdGVcIj5cbiAgICAgICAgICAgICAgICBQQU5JQyBCVVRUT05cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1yZWQtMTAwIGZvbnQtbW9ubyBmb250LW1lZGl1bSBvcGFjaXR5LTkwIGxlYWRpbmctdGlnaHRcIj5cbiAgICAgICAgICAgICAgICBNdWx0aS1PUyBTdXNwZW5kXG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogQmFkZ2UgY291bnRlciBpZiBmcm96ZW4gKi99XG4gICAgICAgICAge2Zyb3plbkNvdW50ID4gMCAmJiAoXG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhYnNvbHV0ZSAtdG9wLTIgLXJpZ2h0LTIgYmctcHVycGxlLTYwMCBib3JkZXItMiBib3JkZXItd2hpdGUgdGV4dC13aGl0ZSB0ZXh0LVsxMHB4XSBmb250LW1vbm8gZm9udC1ibGFjayBweC0xLjUgcHktMC41IHJvdW5kZWQtZnVsbCBzaGFkb3ctbGcgei0yMFwiPlxuICAgICAgICAgICAgICB7ZnJvemVuQ291bnR9IOKdhO+4j1xuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovfVxuICAgICAgey8qIEVNRVJHRU5DWSBQQU5JQyBNT0RBTCBESUFMT0cgKi99XG4gICAgICB7LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL31cbiAgICAgIHtpc09wZW4gJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei01MCBiZy1ibGFjay84NSBiYWNrZHJvcC1ibHVyLW1kIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHAtMyBzbTpwLTUgb3ZlcmZsb3cteS1hdXRvIGFuaW1hdGUtaW4gZmFkZS1pbiBkdXJhdGlvbi0yMDBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTkwMCBib3JkZXItMiBib3JkZXItcmVkLTYwMC83MCByb3VuZGVkLTJ4bCBtYXgtdy00eGwgdy1mdWxsIHAtNSBzbTpwLTcgc2hhZG93LTJ4bCBzaGFkb3ctcmVkLTk1MC84MCBzcGFjZS15LTUgbXktYXV0byByZWxhdGl2ZVwiPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICB7LyogTW9kYWwgSGVhZGVyICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLXN0YXJ0IGp1c3RpZnktYmV0d2VlbiBwYi00IGJvcmRlci1iIGJvcmRlci1yZWQtOTAwLzQwIGdhcC00XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0zXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMgYmctcmVkLTYwMC8yMCBib3JkZXIgYm9yZGVyLXJlZC01MDAvNDAgcm91bmRlZC14bCB0ZXh0LXJlZC00MDBcIj5cbiAgICAgICAgICAgICAgICAgIDxBbGVydE9jdGFnb24gY2xhc3NOYW1lPVwidy04IGgtOCBhbmltYXRlLXB1bHNlXCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC14bCBzbTp0ZXh0LTJ4bCBmb250LWJsYWNrIHRleHQtd2hpdGUgZm9udC1tb25vIHRyYWNraW5nLXRpZ2h0IHVwcGVyY2FzZVwiPlxuICAgICAgICAgICAgICAgICAgICAgIE1VTFRJLU9TIFBBTklDIENPTU1BTkQgU0VRVUVOQ0VSXG4gICAgICAgICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IGJnLXJlZC02MDAgdGV4dC13aGl0ZSByb3VuZGVkIHRleHQtWzEwcHhdIGZvbnQtbW9ubyBmb250LWJsYWNrIHVwcGVyY2FzZVwiPlxuICAgICAgICAgICAgICAgICAgICAgIEVNRVJHRU5DWSBGUkVFWkVcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHNtOnRleHQtc20gdGV4dC1zbGF0ZS0zMDAgbXQtMC41XCI+XG4gICAgICAgICAgICAgICAgICAgIELFgnlza2F3aWN6bmUgemF3aWVzemVuaWUgd8SFdGvDs3cgd3N6eXN0a2ljaCBpbnN0YW5jamkgc2lsbmlrYSBGbHV0dGVyIHcgUkFNICg8Y29kZSBjbGFzc05hbWU9XCJ0ZXh0LXB1cnBsZS00MDAgZm9udC1tb25vXCI+TnRTdXNwZW5kUHJvY2VzczwvY29kZT4gbmEgV2luZG93cywgPGNvZGUgY2xhc3NOYW1lPVwidGV4dC1jeWFuLTQwMCBmb250LW1vbm9cIj5TSUdTVE9QIFNpZ25hbCAxOTwvY29kZT4gbmEgTGludXgvbWFjT1MpLlxuICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNPcGVuKGZhbHNlKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC14bCBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgICAgIHRpdGxlPVwiWmFta25paiBbRXNjXVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8WCBjbGFzc05hbWU9XCJ3LTUgaC01XCIgLz5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIFRhY3RpY2FsIFRyaWdnZXIgQmFubmVyIChUaGUgQmlnIFJlZCBBY3Rpb24gQmFyKSAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JhZGllbnQtdG8tciBmcm9tLXJlZC05NTAgdmlhLXJvc2UtOTUwIHRvLXB1cnBsZS05NTAgcC00IHNtOnAtNSByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItcmVkLTUwMC81MCBzaGFkb3ctaW5uZXIgZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xIHRleHQtY2VudGVyIHNtOnRleHQtbGVmdFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZCB0ZXh0LXJlZC0zMDAgdXBwZXJjYXNlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUganVzdGlmeS1jZW50ZXIgc206anVzdGlmeS1zdGFydFwiPlxuICAgICAgICAgICAgICAgICAgPFJhZGlvIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1yZWQtNDAwIGFuaW1hdGUtcGluZ1wiIC8+XG4gICAgICAgICAgICAgICAgICBUcnliIE5hdHljaG1pYXN0b3dlZ28gVW5pZXJ1Y2hvbWllbmlhIFByb2Nlc8Ozd1xuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtMjAwIG1heC13LXhsXCI+XG4gICAgICAgICAgICAgICAgICBKZWRub2N6ZXNuZSB3c3RyenltYW5pZSBjeWtsaSBDUFUgYmV6IHViaWphbmlhIHByb2Nlc3UuIFV3YWxuaWEga3Vyc29yIG15c3p5IGkga2xhd2lhdHVyxJksIHVuaWVtb8W8bGl3aWFqxIVjIG5ha8WCYWRjZSBwcnplY2h3eXR5d2FuaWUgemRhcnplxYQgc3lzdGVtb3d5Y2guXG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBnYXAtMiB3LWZ1bGwgc206dy1hdXRvIGp1c3RpZnktZW5kXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SG9ybmV0TW9kYWxPcGVuKHRydWUpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuLWdsb3NzeSBidG4tZ2xvc3N5LWFtYmVyIHctZnVsbCBzbTp3LWF1dG8gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgc3BhY2UteC0yIHB4LTUgcHktMy41IHRleHQtd2hpdGUgZm9udC1tb25vIGZvbnQtYmxhY2sgdGV4dC1zbSByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItYW1iZXItMzAwLzYwIHRyYW5zaXRpb24tYWxsIGFuaW1hdGUtcHVsc2VcIlxuICAgICAgICAgICAgICAgICAgdGl0bGU9XCJXeXB1xZvEhyBSw7NqIER6aWtpY2ggQWZyeWthxYRza2ljaCBTemVyc3plbmkgeiBwYXJhbGnFvHVqxIVjeW0gamFkZW1cIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYmFzZVwiPvCfkJ08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5Sw5NKIFNaRVJTWkVOSSAoQVBJUyBQVVJHRSk8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0cmlnZ2VyTXVsdGlPc1BhbmljU3VzcGVuZH1cbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc0V4ZWN1dGluZ31cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0bi1nbG9zc3kgYnRuLWdsb3NzeS1yZWQgdy1mdWxsIHNtOnctYXV0byBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBzcGFjZS14LTIgcHgtNiBweS0zLjUgdGV4dC13aGl0ZSBmb250LW1vbm8gZm9udC1ib2xkIHRleHQtc20gcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXJlZC0zMDAvNjAgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxMb2NrIGNsYXNzTmFtZT17YHctNCBoLTQgJHtpc0V4ZWN1dGluZyA/ICdhbmltYXRlLXNwaW4nIDogJyd9YH0gLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPntpc0V4ZWN1dGluZyA/ICdaQU1SQcW7QU5JRSBXIFRPS1UuLi4nIDogJ+KdhO+4jyBaQU1ST8W5IFdTWllTVEtJRSAoUEFOSUMgRlJFRVpFKSd9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogVGFyZ2V0IFByb2Nlc3MgTWF0cml4IChNdWx0aS1PUyBPdmVydmlldykgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtc2xhdGUtMzAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgPENwdSBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcHVycGxlLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICBXeWtyeXRlIFByb2Nlc3kgRG9jZWxvd2UgKFdpbmRvd3MsIExpbnV4LCBtYWNPUyk6XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuXG4gICAgICAgICAgICAgICAgey8qIFNlY29uZGFyeSBBY3Rpb24gQ29udHJvbHMgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTJcIj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlUmVzdW1lUHJvY2Vzc2VzfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yLjUgcHktMSByb3VuZGVkLWxnIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0zMDAgdGV4dC14cyBmb250LW1vbm8gdHJhbnNpdGlvbi1hbGwgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIlxuICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIld6bsOzdyB3eWtvbnl3YW5pZSB3xIV0a8OzdyAoU0lHQ09OVCAvIE50UmVzdW1lUHJvY2VzcylcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8UGxheSBjbGFzc05hbWU9XCJ3LTMgaC0zIHRleHQtZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5Xem7Ds3c8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVLaWxsQWxsfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yLjUgcHktMSByb3VuZGVkLWxnIGJnLXJlZC05NTAgaG92ZXI6YmctcmVkLTgwMCB0ZXh0LXJlZC0yMDAgdGV4dC14cyBmb250LW1vbm8gdHJhbnNpdGlvbi1hbGwgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgYm9yZGVyIGJvcmRlci1yZWQtODAwLzYwXCJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJUcndhbGUgemFiaWogd3N6eXN0a2llIHByb2Nlc3kgKFRlcm1pbmF0ZVByb2Nlc3MgLyBTSUdLSUxMKVwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxTa3VsbCBjbGFzc05hbWU9XCJ3LTMgaC0zIHRleHQtcmVkLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlViw7NqIFRyd2HFgnk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yIGdhcC0zXCI+XG4gICAgICAgICAgICAgICAge3RhcmdldFByb2Nlc3Nlcy5tYXAoKHByb2MpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGlzRnJvemVuID0gcHJvYy5zdGF0dXMgPT09ICdmcm96ZW4nO1xuICAgICAgICAgICAgICAgICAgY29uc3QgaXNTdXNwZW5kaW5nID0gcHJvYy5zdGF0dXMgPT09ICdzdXNwZW5kaW5nJztcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgIGtleT17cHJvYy5waWR9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC0zIHJvdW5kZWQteGwgYm9yZGVyIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc0Zyb3plblxuICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1wdXJwbGUtOTUwLzQwIGJvcmRlci1wdXJwbGUtNjAwLzgwIHNoYWRvdy1sZyBzaGFkb3ctcHVycGxlLTk1MC8zMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOiBpc1N1c3BlbmRpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctcmVkLTk1MC80MCBib3JkZXItcmVkLTUwMCBhbmltYXRlLXB1bHNlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05NTAgYm9yZGVyLXNsYXRlLTgwMCdcbiAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBqdXN0aWZ5LWJldHdlZW4gZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHJ1bmNhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gZm9udC1ib2xkIHRleHQteHMgdGV4dC13aGl0ZSB0cnVuY2F0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Byb2MubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIHB4LTEuNSBweS0wLjIgcm91bmRlZCBiZy1zbGF0ZS05MDAgdGV4dC1zbGF0ZS0zMDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBJRDoge3Byb2MucGlkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIGZvbnQtbW9ubyBibG9jayB0cnVuY2F0ZSBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cHJvYy50ZWNobmlxdWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICB7LyogT1MgJiBTdGF0ZSBCYWRnZSAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBpdGVtcy1lbmQgZ2FwLTEgZmxleC1zaHJpbmstMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHRleHQtWzlweF0gZm9udC1tb25vIGZvbnQtYmxhY2sgdXBwZXJjYXNlIHB4LTEuNSBweS0wLjUgcm91bmRlZCBib3JkZXIgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Mub3MgPT09ICd3aW5kb3dzJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1ibHVlLTk1MCB0ZXh0LWJsdWUtMzAwIGJvcmRlci1ibHVlLTgwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBwcm9jLm9zID09PSAnbGludXgnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWFtYmVyLTk1MCB0ZXh0LWFtYmVyLTMwMCBib3JkZXItYW1iZXItODAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1waW5rLTk1MCB0ZXh0LXBpbmstMzAwIGJvcmRlci1waW5rLTgwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwcm9jLm9zfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B0ZXh0LVsxMHB4XSBmb250LW1vbm8gZm9udC1ib2xkIHB4LTEuNSBweS0wLjUgcm91bmRlZCAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNGcm96ZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctcHVycGxlLTkwMCB0ZXh0LXB1cnBsZS0yMDAgYm9yZGVyIGJvcmRlci1wdXJwbGUtNjAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1yZWQtOTAwLzYwIHRleHQtcmVkLTIwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpc0Zyb3plbiA/ICfinYTvuI8gWkFNUk/Fu09OWSAoMCUpJyA6IGAke3Byb2MuY3B1fSUgQ1BVYH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIFF1aWNrIE11bHRpLU9TIENvbW1hbmQgU2VxdWVuY2VzICYgT25lLUxpbmVycyAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC1zbGF0ZS0zMDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICAgIDxUZXJtaW5hbCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtY3lhbi00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgUG9sZWNlbmlhIE5hdHljaG1pYXN0b3dlIGRvIFNrb3Bpb3dhbmlhIHcgVGVybWluYWx1OlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cblxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2V4cG9ydE11bHRpT3NQYW5pY1NjcmlwdH1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIuNSBweS0xIGJnLXB1cnBsZS03MDAgaG92ZXI6YmctcHVycGxlLTYwMCB0ZXh0LXdoaXRlIHJvdW5kZWQtbGcgdGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdHJhbnNpdGlvbi1hbGwgc2hhZG93XCJcbiAgICAgICAgICAgICAgICAgIHRpdGxlPVwiUG9iaWVyeiB1bml3ZXJzYWxueSBza3J5cHQgUHl0aG9uYSBlbWVyZ2VuY3lfcGFuaWNfc3VzcGVuZC5weVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPERvd25sb2FkIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPlBvYmllcnogU2tyeXB0IC5weSAoTXVsdGktT1MpPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogT1MgVGFicyBmb3IgU25pcHBldHMgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0xIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAgcGItMSB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlT1NGaWx0ZXIoJ2FsbCcpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMyBweS0xIHJvdW5kZWQtdC1sZyBmb250LW1vbm8gdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlT1NGaWx0ZXIgPT09ICdhbGwnID8gJ2JnLXNsYXRlLTgwMCB0ZXh0LXdoaXRlIGZvbnQtYm9sZCcgOiAndGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSdcbiAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIFdzenlzdGtpZSBPU1xuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZU9TRmlsdGVyKCd3aW5kb3dzJyl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0zIHB5LTEgcm91bmRlZC10LWxnIGZvbnQtbW9ubyB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmVPU0ZpbHRlciA9PT0gJ3dpbmRvd3MnID8gJ2JnLWJsdWUtOTAwLzYwIHRleHQtYmx1ZS0zMDAgZm9udC1ib2xkIGJvcmRlci1iLTIgYm9yZGVyLWJsdWUtNTAwJyA6ICd0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlJ1xuICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgV2luZG93cyAoY3R5cGVzIC8gQ01EKVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZU9TRmlsdGVyKCdsaW51eCcpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMyBweS0xIHJvdW5kZWQtdC1sZyBmb250LW1vbm8gdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlT1NGaWx0ZXIgPT09ICdsaW51eCcgPyAnYmctYW1iZXItOTAwLzYwIHRleHQtYW1iZXItMzAwIGZvbnQtYm9sZCBib3JkZXItYi0yIGJvcmRlci1hbWJlci01MDAnIDogJ3RleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICBMaW51eCAoa2lsbCAtMTkgLyBwa2lsbClcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVPU0ZpbHRlcignbWFjb3MnKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTMgcHktMSByb3VuZGVkLXQtbGcgZm9udC1tb25vIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZU9TRmlsdGVyID09PSAnbWFjb3MnID8gJ2JnLXBpbmstOTAwLzYwIHRleHQtcGluay0zMDAgZm9udC1ib2xkIGJvcmRlci1iLTIgYm9yZGVyLXBpbmstNTAwJyA6ICd0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlJ1xuICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgbWFjT1MgKGtpbGxhbGwgLVNUT1ApXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBTbmlwcGV0cyBMaXN0ICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMiBtYXgtaC00OCBvdmVyZmxvdy15LWF1dG8gcHItMVwiPlxuICAgICAgICAgICAgICAgIHsoYWN0aXZlT1NGaWx0ZXIgPT09ICdhbGwnIHx8IGFjdGl2ZU9TRmlsdGVyID09PSAnd2luZG93cycpICYmIChcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTUwIHAtMi41IHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0yIHRleHQteHMgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHJ1bmNhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWJsdWUtNDAwIGZvbnQtYm9sZCBtci0yXCI+W1dpbmRvd3MgY3R5cGVzXTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8Y29kZSBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTIwMFwiPntjb21tYW5kU25pcHBldHMud2luZG93c19jdHlwZXN9PC9jb2RlPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZUNvcHkoY29tbWFuZFNuaXBwZXRzLndpbmRvd3NfY3R5cGVzLCAnd2luX2N0eXBlcycpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMS41IGJnLXNsYXRlLTkwMCBob3ZlcjpiZy1zbGF0ZS04MDAgdGV4dC1zbGF0ZS0zMDAgaG92ZXI6dGV4dC13aGl0ZSByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIGZsZXgtc2hyaW5rLTBcIlxuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiS29waXVqXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIHtjb3BpZWRLZXkgPT09ICd3aW5fY3R5cGVzJyA/IDxDaGVjayBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWVtZXJhbGQtNDAwXCIgLz4gOiA8Q29weSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+fVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICB7KGFjdGl2ZU9TRmlsdGVyID09PSAnYWxsJyB8fCBhY3RpdmVPU0ZpbHRlciA9PT0gJ3dpbmRvd3MnKSAmJiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTk1MCBwLTIuNSByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtODAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMiB0ZXh0LXhzIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRydW5jYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1ibHVlLTQwMCBmb250LWJvbGQgbXItMlwiPltXaW5kb3dzIENNRF08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPGNvZGUgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS0yMDBcIj57Y29tbWFuZFNuaXBwZXRzLndpbmRvd3NfY21kfTwvY29kZT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVDb3B5KGNvbW1hbmRTbmlwcGV0cy53aW5kb3dzX2NtZCwgJ3dpbl9jbWQnKX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTEuNSBiZy1zbGF0ZS05MDAgaG92ZXI6Ymctc2xhdGUtODAwIHRleHQtc2xhdGUtMzAwIGhvdmVyOnRleHQtd2hpdGUgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCBmbGV4LXNocmluay0wXCJcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIktvcGl1alwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICB7Y29waWVkS2V5ID09PSAnd2luX2NtZCcgPyA8Q2hlY2sgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1lbWVyYWxkLTQwMFwiIC8+IDogPENvcHkgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPn1cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgICAgeyhhY3RpdmVPU0ZpbHRlciA9PT0gJ2FsbCcgfHwgYWN0aXZlT1NGaWx0ZXIgPT09ICdsaW51eCcpICYmIChcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTUwIHAtMi41IHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0yIHRleHQteHMgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHJ1bmNhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWFtYmVyLTQwMCBmb250LWJvbGQgbXItMlwiPltMaW51eCBTSUdTVE9QICgxOSldPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxjb2RlIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMjAwXCI+e2NvbW1hbmRTbmlwcGV0cy5saW51eF9zaWdzdG9wfTwvY29kZT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVDb3B5KGNvbW1hbmRTbmlwcGV0cy5saW51eF9zaWdzdG9wLCAnbGludXhfc2lnc3RvcCcpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMS41IGJnLXNsYXRlLTkwMCBob3ZlcjpiZy1zbGF0ZS04MDAgdGV4dC1zbGF0ZS0zMDAgaG92ZXI6dGV4dC13aGl0ZSByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIGZsZXgtc2hyaW5rLTBcIlxuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiS29waXVqXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIHtjb3BpZWRLZXkgPT09ICdsaW51eF9zaWdzdG9wJyA/IDxDaGVjayBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWVtZXJhbGQtNDAwXCIgLz4gOiA8Q29weSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+fVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICB7KGFjdGl2ZU9TRmlsdGVyID09PSAnYWxsJyB8fCBhY3RpdmVPU0ZpbHRlciA9PT0gJ21hY29zJykgJiYgKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05NTAgcC0yLjUgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTIgdGV4dC14cyBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0cnVuY2F0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcGluay00MDAgZm9udC1ib2xkIG1yLTJcIj5bbWFjT1MgVGVybWluYWxdPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxjb2RlIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMjAwXCI+e2NvbW1hbmRTbmlwcGV0cy5tYWNvc19zaWdzdG9wfTwvY29kZT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVDb3B5KGNvbW1hbmRTbmlwcGV0cy5tYWNvc19zaWdzdG9wLCAnbWFjb3Nfc2lnc3RvcCcpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMS41IGJnLXNsYXRlLTkwMCBob3ZlcjpiZy1zbGF0ZS04MDAgdGV4dC1zbGF0ZS0zMDAgaG92ZXI6dGV4dC13aGl0ZSByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIGZsZXgtc2hyaW5rLTBcIlxuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiS29waXVqXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIHtjb3BpZWRLZXkgPT09ICdtYWNvc19zaWdzdG9wJyA/IDxDaGVjayBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWVtZXJhbGQtNDAwXCIgLz4gOiA8Q29weSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+fVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBQYW5pYyBUZXJtaW5hbCBPdXRwdXQgTG9nICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05NTAgcC0zIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1bMTFweF0gZm9udC1tb25vIHNwYWNlLXktMSBoLTI4IG92ZXJmbG93LXktYXV0b1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwIHBiLTEgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTkwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5Eemllbm5payBSZWFrY2ppIErEhWRyYSAoS2VybmVsIFRocmVhZCBGcmVlemUgTG9nKTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1lbWVyYWxkLTQwMFwiPlJFQURZPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAge3BhbmljTG9ncy5tYXAoKGxvZywgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtcbiAgICAgICAgICAgICAgICAgICAgbG9nLmluY2x1ZGVzKCdUUklHR0VSJykgfHwgbG9nLmluY2x1ZGVzKCdQQU5JQycpXG4gICAgICAgICAgICAgICAgICAgICAgPyAndGV4dC1yZWQtNDAwIGZvbnQtYm9sZCdcbiAgICAgICAgICAgICAgICAgICAgICA6IGxvZy5pbmNsdWRlcygnU1VLQ0VTJykgfHwgbG9nLmluY2x1ZGVzKCdFWFBPUlQnKVxuICAgICAgICAgICAgICAgICAgICAgID8gJ3RleHQtZW1lcmFsZC00MDAgZm9udC1ib2xkJ1xuICAgICAgICAgICAgICAgICAgICAgIDogbG9nLmluY2x1ZGVzKCdXSU5ET1dTJykgfHwgbG9nLmluY2x1ZGVzKCdMSU5VWCcpIHx8IGxvZy5pbmNsdWRlcygnTUFDT1MnKVxuICAgICAgICAgICAgICAgICAgICAgID8gJ3RleHQtY3lhbi0zMDAnXG4gICAgICAgICAgICAgICAgICAgICAgOiAndGV4dC1zbGF0ZS00MDAnXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge2xvZ31cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIE1vZGFsIEZvb3RlciAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHB0LTIgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMC84MCB0ZXh0LXhzIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yXCI+XG4gICAgICAgICAgICAgICAgPFNoaWVsZEFsZXJ0IGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1wdXJwbGUtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5aYWNob3d1amUgc3RhbiBSQU0gZG8genJ6dXR1IGtyeW1pbmFsaXN0eWN6bmVnbyAoTWluaUR1bXBXcml0ZUR1bXAgLyBHREIgQ29yZSBEdW1wKS48L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNPcGVuKGZhbHNlKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTEuNSBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQtd2hpdGUgcm91bmRlZC1sZyBmb250LW1vbm8gZm9udC1tZWRpdW0gdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgWmFta25paiBbRXNjXVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cblxuICAgICAgey8qIEFmcmljYW4gSG9ybmV0IFN3YXJtIE1vZGFsICovfVxuICAgICAgPEFmcmljYW5Ib3JuZXRTd2FybU1vZGFsXG4gICAgICAgIGlzT3Blbj17aG9ybmV0TW9kYWxPcGVufVxuICAgICAgICBvbkNsb3NlPXsoKSA9PiBzZXRIb3JuZXRNb2RhbE9wZW4oZmFsc2UpfVxuICAgICAgICB0YXJnZXRHbmlkYU5hbWU9XCJmbHV0dGVyX3J1bm5lci5leGVcIlxuICAgICAgICB0YXJnZXRQaWQ9ezg5MzJ9XG4gICAgICAgIG9uRGVjYXBpdGF0aW9uQ29tcGxldGU9eygpID0+IHtcbiAgICAgICAgICBoYW5kbGVLaWxsQWxsKCk7XG4gICAgICAgICAgc2V0SG9ybmV0TW9kYWxPcGVuKGZhbHNlKTtcbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgPC8+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUF1U0ksbUJBT00sY0FQTjtBQXZTSixTQUFnQixVQUFVLGlCQUFpQjtBQUMzQztBQUFBLEVBQ0U7QUFBQSxFQUFjO0FBQUEsRUFBa0I7QUFBQSxFQUFNO0FBQUEsRUFBVTtBQUFBLEVBQU07QUFBQSxFQUN0RDtBQUFBLEVBQVU7QUFBQSxFQUFpQjtBQUFBLEVBQUc7QUFBQSxFQUFtQjtBQUFBLEVBRXRDO0FBQUEs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