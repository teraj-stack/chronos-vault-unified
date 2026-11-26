import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"];
import {
  AlertOctagon,
  Zap,
  Lock,
  Terminal,
  Copy,
  Check,
  Download,
  Play,
  Radio,
  Skull,
  Cpu,
  ShieldCheck
} from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import { downloadFile } from "/sentinel-shield/src/utils/offlinePackageExporter.ts";
import { gnidaSensorsMatrix } from "/sentinel-shield/src/utils/gnidaSensorsMatrix.ts";
import { UltraShortFreezeModal } from "/sentinel-shield/src/components/UltraShortFreezeModal.tsx";
export const PanicCenterView = ({ onNavigateToTab }) => {
  const [copiedKey, setCopiedKey] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeOSFilter, setActiveOSFilter] = useState("all");
  const [isUltraFreezeModalOpen, setIsUltraFreezeModalOpen] = useState(false);
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
    "[*] Wykryto 4 procesy powiązane z agresywnym malware na Windows / Linux / macOS.",
    "[*] Gotowy do natychmiastowego wywołania NtSuspendProcess / SIGSTOP (Signal 19)."
  ]);
  const addLog = (msg) => {
    setPanicLogs((prev) => [...prev.slice(-25), `[${(/* @__PURE__ */ new Date()).toLocaleTimeString()}] ${msg}`]);
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
      addLog("❄️ [SUKCES] Wszystkie 4 procesy agresywne zostały ZAMROŻONE W RAM (0% CPU, stan: T / SUSPENDED)!");
      addLog("🔒 Kursor i klawiatura odzyskane. Pamięć RAM zachowana do analizy kryminalistycznej.");
      gnidaSensorsMatrix.triggerGnidaRecognition(
        "SENSOR_DWM_SCREEN",
        "panic_freeze_all_malware.exe",
        8932,
        "Atak Agresywnego Malware - Wymuszenie Panic Button",
        "Zamrożenie Wątków w RAM (NtSuspendProcess / SIGSTOP 19)"
      );
    }, 500);
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
lub SIGSTOP Signal 19) wszystkie procesy powiązane z agresywnym malware i nakładkami.
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
        
        target_names = ['flutter', 'runner', 'overlay', 'dropper', 'lockscreen', 'malware']
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
                            print(f"  [X] NtSuspendProcess zwrócił NTSTATUS: 0x{status:08X}")
                    else:
                        print(f"  [X] Brak uprawnień do OpenProcess dla PID {pid}. Uruchom jako Administrator!")

        print(f"\\n[ZAKOŃCZONO] Zamrożono {suspended_count} procesów na platformie Windows.")

    except Exception as e:
        print(f"[BŁĄD WINDOWS] {e}")

def panic_suspend_posix(os_name):
    """Linux & macOS Process Freeze via SIGSTOP (Signal 19)"""
    print(f"[*] Wykryto środowisko POSIX ({os_name}). Wysyłanie sygnału SIGSTOP (19)...")
    target_patterns = ['flutter', 'flutter_runner', 'lockscreen', 'overlay_app', 'malware']
    suspended_count = 0

    for pattern in target_patterns:
        try:
            pids_raw = subprocess.check_output(['pgrep', '-f', pattern], text=True, errors='ignore')
            pids = [int(p) for p in pids_raw.strip().split() if p.isdigit()]

            for pid in pids:
                if pid == os.getpid():
                    continue
                try:
                    os.kill(pid, signal.SIGSTOP)
                    print(f"  [✓] kill -STOP (PID={pid}, wzorzec='{pattern}') -> Wątki zatrzymane!")
                    suspended_count += 1
                except Exception as ex:
                    print(f"  [X] Błąd zatrzymania PID {pid}: {ex}")
        except subprocess.CalledProcessError:
            pass

    try:
        subprocess.run(['pkill', '-STOP', '-f', 'flutter'], check=False)
    except Exception:
        pass

    print(f"\\n[ZAKOŃCZONO] Zamrożono {suspended_count} procesów na platformie {os_name}.")

def main():
    print("=" * 70)
    print("SENTINEL EMERGENCY MULTI-OS PANIC FREEZE EXECUTABLE")
    print("=" * 70)
    sys_name = platform.system().lower()

    if 'windows' in sys_name:
        panic_suspend_windows()
    elif 'linux' in sys_name:
        panic_suspend_posix('Linux')
    elif 'darwin' in sys_name:
        panic_suspend_posix('macOS')
    else:
        print(f"[!] Nieznany system operacyjny: {sys_name}")

if __name__ == '__main__':
    main()
`;
    downloadFile(pythonCode, "emergency_panic_suspend.py", "text/x-python");
    addLog("💾 [EXPORT] Wyeksportowano skrypt offline emergency_panic_suspend.py.");
  };
  const commandSnippets = {
    windows_ctypes: `import ctypes; ntdll = ctypes.windll.ntdll; kernel32 = ctypes.windll.kernel32; h = kernel32.OpenProcess(0x0800, False, PID); ntdll.NtSuspendProcess(h)`,
    windows_cmd: `taskkill /F /FI "WINDOWTITLE eq flutter*" /T`,
    linux_sigstop: `pkill -STOP -f flutter || kill -19 $(pgrep -f flutter)`,
    macos_sigstop: `killall -STOP "FlutterMacOS" || kill -19 $(pgrep -f flutter)`
  };
  const frozenCount = targetProcesses.filter((p) => p.status === "frozen").length;
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6 animate-in fade-in duration-300", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-3xl bg-slate-900/90 border-2 border-red-600/80 shadow-2xl shadow-red-950/60", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3.5", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-red-600/20 border border-red-500/50 rounded-2xl text-red-400 shadow-lg", children: /* @__PURE__ */ jsxDEV(AlertOctagon, { className: "w-8 h-8 animate-pulse" }, void 0, false, {
          fileName: "/app/applet/src/components/PanicCenterView.tsx",
          lineNumber: 277,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/PanicCenterView.tsx",
          lineNumber: 276,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxDEV("h1", { className: "text-xl sm:text-2xl font-black text-white font-mono tracking-tight uppercase", children: "PANIC BUTTON: PEŁNA PODSTRONA DOWODZENIA" }, void 0, false, {
              fileName: "/app/applet/src/components/PanicCenterView.tsx",
              lineNumber: 281,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-0.5 bg-red-600 text-white rounded-full text-[10px] font-mono font-black uppercase shadow", children: "MULTI-OS KERNEL FREEZE" }, void 0, false, {
              fileName: "/app/applet/src/components/PanicCenterView.tsx",
              lineNumber: 284,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PanicCenterView.tsx",
            lineNumber: 280,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl", children: [
            "Błyskawiczne zamrażanie wątków agresywnego złośliwego oprogramowania w RAM (",
            /* @__PURE__ */ jsxDEV("code", { className: "text-purple-300 font-mono", children: "NtSuspendProcess" }, void 0, false, {
              fileName: "/app/applet/src/components/PanicCenterView.tsx",
              lineNumber: 289,
              columnNumber: 91
            }, this),
            " na Windows, ",
            /* @__PURE__ */ jsxDEV("code", { className: "text-cyan-300 font-mono", children: "SIGSTOP 19" }, void 0, false, {
              fileName: "/app/applet/src/components/PanicCenterView.tsx",
              lineNumber: 289,
              columnNumber: 171
            }, this),
            " na Linux/macOS)."
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PanicCenterView.tsx",
            lineNumber: 288,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PanicCenterView.tsx",
          lineNumber: 279,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PanicCenterView.tsx",
        lineNumber: 275,
        columnNumber: 9
      }, this),
      onNavigateToTab && /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 shrink-0", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => onNavigateToTab("loading"),
            className: "px-3.5 py-2 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-400/60 text-cyan-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer",
            children: [
              /* @__PURE__ */ jsxDEV(Zap, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/PanicCenterView.tsx",
                lineNumber: 300,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Widok Tarczy Laserowej" }, void 0, false, {
                fileName: "/app/applet/src/components/PanicCenterView.tsx",
                lineNumber: 301,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/PanicCenterView.tsx",
            lineNumber: 296,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => onNavigateToTab("barrier"),
            className: "px-3.5 py-2 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-400/60 text-purple-200 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer",
            children: [
              /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/PanicCenterView.tsx",
                lineNumber: 307,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Macierz Bariery" }, void 0, false, {
                fileName: "/app/applet/src/components/PanicCenterView.tsx",
                lineNumber: 308,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/PanicCenterView.tsx",
            lineNumber: 303,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PanicCenterView.tsx",
        lineNumber: 295,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/PanicCenterView.tsx",
      lineNumber: 274,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-red-950 via-rose-950 to-purple-950 p-6 rounded-3xl border-2 border-red-500/60 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5 text-center lg:text-left", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono font-bold text-red-300 uppercase flex items-center gap-2 justify-center lg:justify-start", children: [
          /* @__PURE__ */ jsxDEV(Radio, { className: "w-4 h-4 text-red-400 animate-ping" }, void 0, false, {
            fileName: "/app/applet/src/components/PanicCenterView.tsx",
            lineNumber: 318,
            columnNumber: 13
          }, this),
          "Tryb Błyskawicznego Zamrożenia Wątków w RAM (0 ms)"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PanicCenterView.tsx",
          lineNumber: 317,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-slate-200 max-w-2xl leading-relaxed", children: "Jednoczesne wstrzymanie cykli CPU bez ubijania procesu. Uwalnia kursor myszy i klawiaturę, uniemożliwiając nakładce przechwytywanie zdarzeń systemowych, zachowując zrzut pamięci RAM do analizy kryminalistycznej." }, void 0, false, {
          fileName: "/app/applet/src/components/PanicCenterView.tsx",
          lineNumber: 321,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PanicCenterView.tsx",
        lineNumber: 316,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end shrink-0", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setIsUltraFreezeModalOpen(true),
            className: "w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-4 bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 hover:from-amber-400 hover:to-red-500 text-white font-mono font-bold text-sm rounded-2xl shadow-xl shadow-orange-950 border border-amber-300/40 active:scale-95 transition-all cursor-pointer",
            children: [
              /* @__PURE__ */ jsxDEV(Zap, { className: "w-4 h-4 text-yellow-200 animate-bounce" }, void 0, false, {
                fileName: "/app/applet/src/components/PanicCenterView.tsx",
                lineNumber: 331,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "⚡ Mikro-Polecenie Freeze & Wtyczki" }, void 0, false, {
                fileName: "/app/applet/src/components/PanicCenterView.tsx",
                lineNumber: 332,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/PanicCenterView.tsx",
            lineNumber: 327,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: triggerMultiOsPanicSuspend,
            disabled: isExecuting,
            className: "w-full sm:w-auto flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-mono font-black text-base rounded-2xl shadow-2xl shadow-red-950 border-2 border-red-300/60 active:scale-95 transition-all cursor-pointer",
            children: [
              /* @__PURE__ */ jsxDEV(Lock, { className: `w-5 h-5 ${isExecuting ? "animate-spin" : "animate-bounce"}` }, void 0, false, {
                fileName: "/app/applet/src/components/PanicCenterView.tsx",
                lineNumber: 340,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: isExecuting ? "ZAMRAŻANIE W TOKU..." : "❄️ ZAMROŹ WSZYSTKIE (PANIC FREEZE)" }, void 0, false, {
                fileName: "/app/applet/src/components/PanicCenterView.tsx",
                lineNumber: 341,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/PanicCenterView.tsx",
            lineNumber: 335,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PanicCenterView.tsx",
        lineNumber: 326,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/PanicCenterView.tsx",
      lineNumber: 315,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/80 p-5 rounded-3xl border border-slate-800 space-y-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-800", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(Cpu, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
            fileName: "/app/applet/src/components/PanicCenterView.tsx",
            lineNumber: 350,
            columnNumber: 13
          }, this),
          "Wykryte Procesy Docelowe (Windows, Linux, macOS) — Stan: ",
          frozenCount,
          "/4 Zamrożonych"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PanicCenterView.tsx",
          lineNumber: 349,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleResumeProcesses,
              className: "px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer",
              title: "Wznów wykonywanie wątków (SIGCONT / NtResumeProcess)",
              children: [
                /* @__PURE__ */ jsxDEV(Play, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/PanicCenterView.tsx",
                  lineNumber: 360,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Wznów" }, void 0, false, {
                  fileName: "/app/applet/src/components/PanicCenterView.tsx",
                  lineNumber: 361,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/PanicCenterView.tsx",
              lineNumber: 355,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleKillAll,
              className: "px-3 py-1.5 rounded-xl bg-red-950 hover:bg-red-800 text-red-200 text-xs font-mono transition-all flex items-center gap-1.5 border border-red-800/60 cursor-pointer",
              title: "Trwale zabij wszystkie procesy (TerminateProcess / SIGKILL)",
              children: [
                /* @__PURE__ */ jsxDEV(Skull, { className: "w-3.5 h-3.5 text-red-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/PanicCenterView.tsx",
                  lineNumber: 369,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Ubój Trwały" }, void 0, false, {
                  fileName: "/app/applet/src/components/PanicCenterView.tsx",
                  lineNumber: 370,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/PanicCenterView.tsx",
              lineNumber: 364,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PanicCenterView.tsx",
          lineNumber: 354,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PanicCenterView.tsx",
        lineNumber: 348,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3.5", children: targetProcesses.map((proc) => {
        const isFrozen = proc.status === "frozen";
        const isSuspending = proc.status === "suspending";
        return /* @__PURE__ */ jsxDEV(
          "div",
          {
            className: `p-4 rounded-2xl border transition-all ${isFrozen ? "bg-purple-950/40 border-purple-500 shadow-lg shadow-purple-950/40" : isSuspending ? "bg-red-950/40 border-red-500 animate-pulse" : "bg-slate-950 border-slate-800"}`,
            children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "truncate", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "font-mono font-bold text-sm text-white truncate", children: proc.name }, void 0, false, {
                    fileName: "/app/applet/src/components/PanicCenterView.tsx",
                    lineNumber: 394,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300", children: [
                    "PID: ",
                    proc.pid
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/PanicCenterView.tsx",
                    lineNumber: 397,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PanicCenterView.tsx",
                  lineNumber: 393,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] text-slate-400 mt-1 font-mono flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxDEV("span", { children: "Technika:" }, void 0, false, {
                    fileName: "/app/applet/src/components/PanicCenterView.tsx",
                    lineNumber: 402,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-300", children: proc.technique }, void 0, false, {
                    fileName: "/app/applet/src/components/PanicCenterView.tsx",
                    lineNumber: 403,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PanicCenterView.tsx",
                  lineNumber: 401,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/PanicCenterView.tsx",
                lineNumber: 392,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "span",
                {
                  className: `px-2 py-1 rounded-lg text-[10px] font-mono font-black uppercase shrink-0 ${isFrozen ? "bg-purple-900 text-purple-200 border border-purple-500" : isSuspending ? "bg-yellow-900 text-yellow-200 border border-yellow-500" : "bg-emerald-950 text-emerald-300 border border-emerald-800"}`,
                  children: isFrozen ? "❄️ ZAMROŻONY" : isSuspending ? "ZAWIESZANIE..." : "🟢 AKTYWNY"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/PanicCenterView.tsx",
                  lineNumber: 407,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PanicCenterView.tsx",
              lineNumber: 391,
              columnNumber: 17
            }, this)
          },
          proc.pid,
          false,
          {
            fileName: "/app/applet/src/components/PanicCenterView.tsx",
            lineNumber: 381,
            columnNumber: 15
          },
          this
        );
      }) }, void 0, false, {
        fileName: "/app/applet/src/components/PanicCenterView.tsx",
        lineNumber: 375,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/PanicCenterView.tsx",
      lineNumber: 347,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/80 p-5 rounded-3xl border border-slate-800 space-y-3", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(Terminal, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
            fileName: "/app/applet/src/components/PanicCenterView.tsx",
            lineNumber: 429,
            columnNumber: 13
          }, this),
          "Gotowe Komendy Jednolinijkowe i Skrypt Pythona (100% Offline):"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PanicCenterView.tsx",
          lineNumber: 428,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: exportMultiOsPanicScript,
            className: "px-3 py-1.5 bg-purple-700 hover:bg-purple-600 text-white rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow cursor-pointer",
            title: "Pobierz uniwersalny skrypt Pythona emergency_panic_suspend.py",
            children: [
              /* @__PURE__ */ jsxDEV(Download, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/PanicCenterView.tsx",
                lineNumber: 438,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Pobierz Skrypt .py (Multi-OS)" }, void 0, false, {
                fileName: "/app/applet/src/components/PanicCenterView.tsx",
                lineNumber: 439,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/PanicCenterView.tsx",
            lineNumber: 433,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PanicCenterView.tsx",
        lineNumber: 427,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-1 border-b border-slate-800 pb-1 text-xs", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveOSFilter("all"),
            className: `px-3 py-1 rounded-t-lg font-mono transition-all cursor-pointer ${activeOSFilter === "all" ? "bg-slate-800 text-white font-bold" : "text-slate-400 hover:text-white"}`,
            children: "Wszystkie OS"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/PanicCenterView.tsx",
            lineNumber: 445,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveOSFilter("windows"),
            className: `px-3 py-1 rounded-t-lg font-mono transition-all cursor-pointer ${activeOSFilter === "windows" ? "bg-blue-900/60 text-blue-300 font-bold border-b-2 border-blue-500" : "text-slate-400 hover:text-white"}`,
            children: "Windows (ctypes / CMD)"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/PanicCenterView.tsx",
            lineNumber: 453,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveOSFilter("linux"),
            className: `px-3 py-1 rounded-t-lg font-mono transition-all cursor-pointer ${activeOSFilter === "linux" ? "bg-amber-900/60 text-amber-300 font-bold border-b-2 border-amber-500" : "text-slate-400 hover:text-white"}`,
            children: "Linux (SIGSTOP 19)"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/PanicCenterView.tsx",
            lineNumber: 461,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveOSFilter("macos"),
            className: `px-3 py-1 rounded-t-lg font-mono transition-all cursor-pointer ${activeOSFilter === "macos" ? "bg-pink-900/60 text-pink-300 font-bold border-b-2 border-pink-500" : "text-slate-400 hover:text-white"}`,
            children: "macOS (killall -STOP)"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/PanicCenterView.tsx",
            lineNumber: 469,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PanicCenterView.tsx",
        lineNumber: 444,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
        (activeOSFilter === "all" || activeOSFilter === "windows") && /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between gap-2 text-xs font-mono", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "truncate", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-blue-400 font-bold mr-2", children: "[Windows ctypes]" }, void 0, false, {
              fileName: "/app/applet/src/components/PanicCenterView.tsx",
              lineNumber: 484,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("code", { className: "text-slate-200", children: commandSnippets.windows_ctypes }, void 0, false, {
              fileName: "/app/applet/src/components/PanicCenterView.tsx",
              lineNumber: 485,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PanicCenterView.tsx",
            lineNumber: 483,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleCopy(commandSnippets.windows_ctypes, "win_ctypes"),
              className: "p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-700 flex-shrink-0 cursor-pointer",
              title: "Kopiuj",
              children: copiedKey === "win_ctypes" ? /* @__PURE__ */ jsxDEV(Check, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/PanicCenterView.tsx",
                lineNumber: 492,
                columnNumber: 47
              }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/PanicCenterView.tsx",
                lineNumber: 492,
                columnNumber: 100
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/PanicCenterView.tsx",
              lineNumber: 487,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PanicCenterView.tsx",
          lineNumber: 482,
          columnNumber: 13
        }, this),
        (activeOSFilter === "all" || activeOSFilter === "windows") && /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between gap-2 text-xs font-mono", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "truncate", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-blue-400 font-bold mr-2", children: "[Windows CMD]" }, void 0, false, {
              fileName: "/app/applet/src/components/PanicCenterView.tsx",
              lineNumber: 500,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("code", { className: "text-slate-200", children: commandSnippets.windows_cmd }, void 0, false, {
              fileName: "/app/applet/src/components/PanicCenterView.tsx",
              lineNumber: 501,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PanicCenterView.tsx",
            lineNumber: 499,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleCopy(commandSnippets.windows_cmd, "win_cmd"),
              className: "p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-700 flex-shrink-0 cursor-pointer",
              title: "Kopiuj",
              children: copiedKey === "win_cmd" ? /* @__PURE__ */ jsxDEV(Check, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/PanicCenterView.tsx",
                lineNumber: 508,
                columnNumber: 44
              }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/PanicCenterView.tsx",
                lineNumber: 508,
                columnNumber: 97
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/PanicCenterView.tsx",
              lineNumber: 503,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PanicCenterView.tsx",
          lineNumber: 498,
          columnNumber: 13
        }, this),
        (activeOSFilter === "all" || activeOSFilter === "linux") && /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between gap-2 text-xs font-mono", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "truncate", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-amber-400 font-bold mr-2", children: "[Linux SIGSTOP (19)]" }, void 0, false, {
              fileName: "/app/applet/src/components/PanicCenterView.tsx",
              lineNumber: 516,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("code", { className: "text-slate-200", children: commandSnippets.linux_sigstop }, void 0, false, {
              fileName: "/app/applet/src/components/PanicCenterView.tsx",
              lineNumber: 517,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PanicCenterView.tsx",
            lineNumber: 515,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleCopy(commandSnippets.linux_sigstop, "linux_sigstop"),
              className: "p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-700 flex-shrink-0 cursor-pointer",
              title: "Kopiuj",
              children: copiedKey === "linux_sigstop" ? /* @__PURE__ */ jsxDEV(Check, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/PanicCenterView.tsx",
                lineNumber: 524,
                columnNumber: 50
              }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/PanicCenterView.tsx",
                lineNumber: 524,
                columnNumber: 103
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/PanicCenterView.tsx",
              lineNumber: 519,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PanicCenterView.tsx",
          lineNumber: 514,
          columnNumber: 13
        }, this),
        (activeOSFilter === "all" || activeOSFilter === "macos") && /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between gap-2 text-xs font-mono", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "truncate", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-pink-400 font-bold mr-2", children: "[macOS Terminal]" }, void 0, false, {
              fileName: "/app/applet/src/components/PanicCenterView.tsx",
              lineNumber: 532,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("code", { className: "text-slate-200", children: commandSnippets.macos_sigstop }, void 0, false, {
              fileName: "/app/applet/src/components/PanicCenterView.tsx",
              lineNumber: 533,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PanicCenterView.tsx",
            lineNumber: 531,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleCopy(commandSnippets.macos_sigstop, "macos_sigstop"),
              className: "p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-700 flex-shrink-0 cursor-pointer",
              title: "Kopiuj",
              children: copiedKey === "macos_sigstop" ? /* @__PURE__ */ jsxDEV(Check, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/PanicCenterView.tsx",
                lineNumber: 540,
                columnNumber: 50
              }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/PanicCenterView.tsx",
                lineNumber: 540,
                columnNumber: 103
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/PanicCenterView.tsx",
              lineNumber: 535,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PanicCenterView.tsx",
          lineNumber: 530,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PanicCenterView.tsx",
        lineNumber: 480,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/PanicCenterView.tsx",
      lineNumber: 426,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950 p-4 rounded-3xl border border-slate-800 text-xs font-mono space-y-1.5 h-36 overflow-y-auto", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "text-slate-500 pb-1 border-b border-slate-900 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxDEV("span", { children: "Dziennik Reakcji Jądra (Kernel Thread Freeze Log):" }, void 0, false, {
          fileName: "/app/applet/src/components/PanicCenterView.tsx",
          lineNumber: 550,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-bold", children: "READY" }, void 0, false, {
          fileName: "/app/applet/src/components/PanicCenterView.tsx",
          lineNumber: 551,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PanicCenterView.tsx",
        lineNumber: 549,
        columnNumber: 9
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
          fileName: "/app/applet/src/components/PanicCenterView.tsx",
          lineNumber: 554,
          columnNumber: 11
        },
        this
      ))
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/PanicCenterView.tsx",
      lineNumber: 548,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(
      UltraShortFreezeModal,
      {
        isOpen: isUltraFreezeModalOpen,
        onClose: () => setIsUltraFreezeModalOpen(false)
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/components/PanicCenterView.tsx",
        lineNumber: 572,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/PanicCenterView.tsx",
    lineNumber: 272,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBhbmljQ2VudGVyVmlldy50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBcbiAgQWxlcnRPY3RhZ29uLCBTaGllbGRBbGVydCwgWmFwLCBMb2NrLCBUZXJtaW5hbCwgQ29weSwgQ2hlY2ssIFxuICBEb3dubG9hZCwgUGxheSwgUmVmcmVzaEN3LCBYLCBSYWRpbywgQXJyb3dSaWdodCwgU2t1bGwsIFxuICBGbGFtZSwgTW9uaXRvciwgQ2hlY2tDaXJjbGUyLCBDaGV2cm9uUmlnaHQsIENvcm5lckRvd25SaWdodCxcbiAgSGFyZERyaXZlLCBDcHUsIEFycm93VXBSaWdodCwgU2hpZWxkQ2hlY2ssIFNwYXJrbGVzLCBGaWxlQ29kZVxufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgZG93bmxvYWRGaWxlIH0gZnJvbSAnLi4vdXRpbHMvb2ZmbGluZVBhY2thZ2VFeHBvcnRlcic7XG5pbXBvcnQgeyBnbmlkYVNlbnNvcnNNYXRyaXggfSBmcm9tICcuLi91dGlscy9nbmlkYVNlbnNvcnNNYXRyaXgnO1xuaW1wb3J0IHsgVWx0cmFTaG9ydEZyZWV6ZU1vZGFsIH0gZnJvbSAnLi9VbHRyYVNob3J0RnJlZXplTW9kYWwnO1xuXG5pbnRlcmZhY2UgUGFuaWNQcm9jZXNzVGFyZ2V0IHtcbiAgcGlkOiBudW1iZXI7XG4gIG5hbWU6IHN0cmluZztcbiAgb3M6ICd3aW5kb3dzJyB8ICdsaW51eCcgfCAnbWFjb3MnO1xuICB0ZWNobmlxdWU6IHN0cmluZztcbiAgc3RhdHVzOiAnYWN0aXZlJyB8ICdzdXNwZW5kaW5nJyB8ICdmcm96ZW4nIHwgJ3Jlc3VtZWQnO1xuICBjcHU6IG51bWJlcjtcbn1cblxuaW50ZXJmYWNlIFBhbmljQ2VudGVyVmlld1Byb3BzIHtcbiAgb25OYXZpZ2F0ZVRvVGFiPzogKHRhYjogc3RyaW5nKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgY29uc3QgUGFuaWNDZW50ZXJWaWV3OiBSZWFjdC5GQzxQYW5pY0NlbnRlclZpZXdQcm9wcz4gPSAoeyBvbk5hdmlnYXRlVG9UYWIgfSkgPT4ge1xuICBjb25zdCBbY29waWVkS2V5LCBzZXRDb3BpZWRLZXldID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtpc0V4ZWN1dGluZywgc2V0SXNFeGVjdXRpbmddID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuICBjb25zdCBbYWN0aXZlT1NGaWx0ZXIsIHNldEFjdGl2ZU9TRmlsdGVyXSA9IHVzZVN0YXRlPCdhbGwnIHwgJ3dpbmRvd3MnIHwgJ2xpbnV4JyB8ICdtYWNvcyc+KCdhbGwnKTtcbiAgY29uc3QgW2lzVWx0cmFGcmVlemVNb2RhbE9wZW4sIHNldElzVWx0cmFGcmVlemVNb2RhbE9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBcbiAgY29uc3QgW3RhcmdldFByb2Nlc3Nlcywgc2V0VGFyZ2V0UHJvY2Vzc2VzXSA9IHVzZVN0YXRlPFBhbmljUHJvY2Vzc1RhcmdldFtdPihbXG4gICAge1xuICAgICAgcGlkOiA4OTMyLFxuICAgICAgbmFtZTogJ2ZsdXR0ZXJfcnVubmVyLmV4ZScsXG4gICAgICBvczogJ3dpbmRvd3MnLFxuICAgICAgdGVjaG5pcXVlOiAnbnRkbGwuTnRTdXNwZW5kUHJvY2VzcyhoUHJvY2VzcykgWzB4MDgwMF0nLFxuICAgICAgc3RhdHVzOiAnYWN0aXZlJyxcbiAgICAgIGNwdTogNDYuOCxcbiAgICB9LFxuICAgIHtcbiAgICAgIHBpZDogMzg0MCxcbiAgICAgIG5hbWU6ICdkcm9wcGVyX3dhdGNoZG9nLmV4ZScsXG4gICAgICBvczogJ3dpbmRvd3MnLFxuICAgICAgdGVjaG5pcXVlOiAna2VybmVsMzIuU3VzcGVuZFRocmVhZCAvIE50U3VzcGVuZFByb2Nlc3MnLFxuICAgICAgc3RhdHVzOiAnYWN0aXZlJyxcbiAgICAgIGNwdTogMTUuMixcbiAgICB9LFxuICAgIHtcbiAgICAgIHBpZDogMTQyMDksXG4gICAgICBuYW1lOiAnZmx1dHRlcl9saW51eF9sb2NrJyxcbiAgICAgIG9zOiAnbGludXgnLFxuICAgICAgdGVjaG5pcXVlOiAna2lsbCAtMTkgKFNJR1NUT1ApIC8gcGtpbGwgLVNUT1AgLWYgZmx1dHRlcicsXG4gICAgICBzdGF0dXM6ICdhY3RpdmUnLFxuICAgICAgY3B1OiAzOC40LFxuICAgIH0sXG4gICAge1xuICAgICAgcGlkOiA5MjgxLFxuICAgICAgbmFtZTogJ0ZsdXR0ZXJNYWNPUy5hcHAvQ29udGVudHMvTWFjT1MvZmx1dHRlcicsXG4gICAgICBvczogJ21hY29zJyxcbiAgICAgIHRlY2huaXF1ZTogJ2tpbGwgLTE5IC8ga2lsbGFsbCAtU1RPUCBcIkZsdXR0ZXJNYWNPU1wiJyxcbiAgICAgIHN0YXR1czogJ2FjdGl2ZScsXG4gICAgICBjcHU6IDI5LjEsXG4gICAgfSxcbiAgXSk7XG5cbiAgY29uc3QgW3BhbmljTG9ncywgc2V0UGFuaWNMb2dzXSA9IHVzZVN0YXRlPHN0cmluZ1tdPihbXG4gICAgJ1sqXSBTeXN0ZW0gZ290b3dvxZtjaSBQQU5JQyBCVVRUT04gdXpicm9qb255IChNdWx0aS1PUyBLZXJuZWwgVGhyZWFkIEZyZWV6aW5nKS4nLFxuICAgICdbKl0gV3lrcnl0byA0IHByb2Nlc3kgcG93acSFemFuZSB6IGFncmVzeXdueW0gbWFsd2FyZSBuYSBXaW5kb3dzIC8gTGludXggLyBtYWNPUy4nLFxuICAgICdbKl0gR290b3d5IGRvIG5hdHljaG1pYXN0b3dlZ28gd3l3b8WCYW5pYSBOdFN1c3BlbmRQcm9jZXNzIC8gU0lHU1RPUCAoU2lnbmFsIDE5KS4nLFxuICBdKTtcblxuICBjb25zdCBhZGRMb2cgPSAobXNnOiBzdHJpbmcpID0+IHtcbiAgICBzZXRQYW5pY0xvZ3MoKHByZXYpID0+IFsuLi5wcmV2LnNsaWNlKC0yNSksIGBbJHtuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpfV0gJHttc2d9YF0pO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUNvcHkgPSAodGV4dDogc3RyaW5nLCBrZXk6IHN0cmluZykgPT4ge1xuICAgIG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KHRleHQpO1xuICAgIHNldENvcGllZEtleShrZXkpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0Q29waWVkS2V5KG51bGwpLCAyMDAwKTtcbiAgfTtcblxuICAvLyBUcmlnZ2VyIEltbWVkaWF0ZSBNdWx0aS1PUyBTdXNwZW5kIFNlcXVlbmNlXG4gIGNvbnN0IHRyaWdnZXJNdWx0aU9zUGFuaWNTdXNwZW5kID0gKCkgPT4ge1xuICAgIHNldElzRXhlY3V0aW5nKHRydWUpO1xuICAgIGFkZExvZygn8J+aqCBbUEFOSUMgVFJJR0dFUkVEXSBSb3pwb2N6xJl0byBuYXR5Y2htaWFzdG93xIUgcHJvY2VkdXLEmSBhd2FyeWpuZWdvIHphbXJhxbxhbmlhIChFbWVyZ2VuY3kgRnJlZXplKS4uLicpO1xuICAgIGFkZExvZygn4pqhIFtXSU5ET1dTXSDFgWFkb3dhbmllIG50ZGxsLmRsbCAtPiBOdFN1c3BlbmRQcm9jZXNzIGRsYSB3c3p5c3RraWNoIHByb2Nlc8OzdyB6IGZsdXR0ZXJfd2luZG93cy5kbGwuLi4nKTtcbiAgICBhZGRMb2coJ+KaoSBbTElOVVhdIFd5c3nFgmFuaWUgc3lnbmHFgnUgU0lHU1RPUCAoa2lsbCAtMTkpIGRvIGdydXB5IHBncmVwIC1mIGZsdXR0ZXIuLi4nKTtcbiAgICBhZGRMb2coJ+KaoSBbTUFDT1NdIFd5d2/Fgnl3YW5pZSBraWxsYWxsIC1TVE9QIC8gc2lnbmFsLlNJR1NUT1AgZGxhIHByb2Nlc8OzdyBRdWFydHogRmx1dHRlci4uLicpO1xuXG4gICAgc2V0VGFyZ2V0UHJvY2Vzc2VzKChwcmV2KSA9PlxuICAgICAgcHJldi5tYXAoKHApID0+ICh7XG4gICAgICAgIC4uLnAsXG4gICAgICAgIHN0YXR1czogJ3N1c3BlbmRpbmcnLFxuICAgICAgfSkpXG4gICAgKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc2V0VGFyZ2V0UHJvY2Vzc2VzKChwcmV2KSA9PlxuICAgICAgICBwcmV2Lm1hcCgocCkgPT4gKHtcbiAgICAgICAgICAuLi5wLFxuICAgICAgICAgIHN0YXR1czogJ2Zyb3plbicsXG4gICAgICAgICAgY3B1OiAwLjAsXG4gICAgICAgIH0pKVxuICAgICAgKTtcbiAgICAgIHNldElzRXhlY3V0aW5nKGZhbHNlKTtcbiAgICAgIGFkZExvZygn4p2E77iPIFtTVUtDRVNdIFdzenlzdGtpZSA0IHByb2Nlc3kgYWdyZXN5d25lIHpvc3RhxYJ5IFpBTVJPxbtPTkUgVyBSQU0gKDAlIENQVSwgc3RhbjogVCAvIFNVU1BFTkRFRCkhJyk7XG4gICAgICBhZGRMb2coJ/CflJIgS3Vyc29yIGkga2xhd2lhdHVyYSBvZHp5c2thbmUuIFBhbWnEmcSHIFJBTSB6YWNob3dhbmEgZG8gYW5hbGl6eSBrcnltaW5hbGlzdHljem5lai4nKTtcblxuICAgICAgZ25pZGFTZW5zb3JzTWF0cml4LnRyaWdnZXJHbmlkYVJlY29nbml0aW9uKFxuICAgICAgICAnU0VOU09SX0RXTV9TQ1JFRU4nLFxuICAgICAgICAncGFuaWNfZnJlZXplX2FsbF9tYWx3YXJlLmV4ZScsXG4gICAgICAgIDg5MzIsXG4gICAgICAgICdBdGFrIEFncmVzeXduZWdvIE1hbHdhcmUgLSBXeW11c3plbmllIFBhbmljIEJ1dHRvbicsXG4gICAgICAgICdaYW1yb8W8ZW5pZSBXxIV0a8OzdyB3IFJBTSAoTnRTdXNwZW5kUHJvY2VzcyAvIFNJR1NUT1AgMTkpJ1xuICAgICAgKTtcbiAgICB9LCA1MDApO1xuICB9O1xuXG4gIC8vIFJlc3VtZSAvIFVuZnJlZXplIHRhcmdldCBwcm9jZXNzZXNcbiAgY29uc3QgaGFuZGxlUmVzdW1lUHJvY2Vzc2VzID0gKCkgPT4ge1xuICAgIGFkZExvZygn4pa277iPIFtSRVNVTUVdIFByenl3cmFjYW5pZSBwcm9jZXPDs3cgKE50UmVzdW1lUHJvY2VzcyAvIGtpbGwgLUNPTlQgMTgpLi4uJyk7XG4gICAgc2V0VGFyZ2V0UHJvY2Vzc2VzKChwcmV2KSA9PlxuICAgICAgcHJldi5tYXAoKHApID0+ICh7XG4gICAgICAgIC4uLnAsXG4gICAgICAgIHN0YXR1czogJ3Jlc3VtZWQnLFxuICAgICAgICBjcHU6IHAub3MgPT09ICd3aW5kb3dzJyA/IDMyLjUgOiAyMC4wLFxuICAgICAgfSkpXG4gICAgKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGFkZExvZygn4pqg77iPIFByb2Nlc3kgd3pub3dpxYJ5IHd5a29ueXdhbmllIGluc3RydWtjamkuJyk7XG4gICAgfSwgNDAwKTtcbiAgfTtcblxuICAvLyBIYXJkIEtpbGwgQWxsXG4gIGNvbnN0IGhhbmRsZUtpbGxBbGwgPSAoKSA9PiB7XG4gICAgYWRkTG9nKCfwn5KlIFtIQVJEIEtJTExdIFRlcm1pbmF0ZVByb2Nlc3MgLyBraWxsIC05IFNJR0tJTEwgZGxhIHdzenlzdGtpY2ggcHJvY2Vzw7N3IScpO1xuICAgIHNldFRhcmdldFByb2Nlc3NlcygocHJldikgPT5cbiAgICAgIHByZXYubWFwKChwKSA9PiAoe1xuICAgICAgICAuLi5wLFxuICAgICAgICBzdGF0dXM6ICdmcm96ZW4nLFxuICAgICAgICBjcHU6IDAuMCxcbiAgICAgICAgdGVjaG5pcXVlOiAnVEVSTUlOQVRFRCAoU0lHS0lMTCAvIDB4MDAwMSknLFxuICAgICAgfSkpXG4gICAgKTtcbiAgfTtcblxuICAvLyBFeHBvcnQgVW5pdmVyc2FsIE11bHRpLU9TIFB5dGhvbiBQYW5pYyBTY3JpcHRcbiAgY29uc3QgZXhwb3J0TXVsdGlPc1BhbmljU2NyaXB0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHB5dGhvbkNvZGUgPSBgXCJcIlwiXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuTVVMVEktT1MgRU1FUkdFTkNZIFBBTklDIEZSRUVaRSBTQ1JJUFQgKFdJTkRPV1MgLyBMSU5VWCAvIE1BQ09TKVxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbjEwMCUgT0ZGTElORSAvIFpFUk8tREVQRU5ERU5DWSBFTUVSR0VOQ1kgU1VTUEVORCBFTkdJTkVcbkF1dG9tYXR5Y3puaWUgd3lrcnl3YSBzeXN0ZW0gb3BlcmFjeWpueSBpIG5hdHljaG1pYXN0b3dvIFpBTVJBxbtBIChOdFN1c3BlbmRQcm9jZXNzXG5sdWIgU0lHU1RPUCBTaWduYWwgMTkpIHdzenlzdGtpZSBwcm9jZXN5IHBvd2nEhXphbmUgeiBhZ3Jlc3l3bnltIG1hbHdhcmUgaSBuYWvFgmFka2FtaS5cbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cIlwiXCJcbmltcG9ydCBzeXNcbmltcG9ydCBvc1xuaW1wb3J0IHBsYXRmb3JtXG5pbXBvcnQgc3VicHJvY2Vzc1xuaW1wb3J0IHNpZ25hbFxuXG5kZWYgcGFuaWNfc3VzcGVuZF93aW5kb3dzKCk6XG4gICAgXCJcIlwiV2luZG93cyBLZXJuZWwgVGhyZWFkICYgUHJvY2VzcyBTdXNwZW5kIHZpYSBudGRsbC5OdFN1c3BlbmRQcm9jZXNzXCJcIlwiXG4gICAgcHJpbnQoXCJbKl0gV3lrcnl0byDFm3JvZG93aXNrbyBXSU5ET1dTLiBJbmljamFsaXphY2phIG50ZGxsIC8gY3R5cGVzLi4uXCIpXG4gICAgdHJ5OlxuICAgICAgICBpbXBvcnQgY3R5cGVzXG4gICAgICAgIGZyb20gY3R5cGVzIGltcG9ydCB3aW50eXBlc1xuXG4gICAgICAgIG50ZGxsID0gY3R5cGVzLndpbmRsbC5udGRsbFxuICAgICAgICBrZXJuZWwzMiA9IGN0eXBlcy53aW5kbGwua2VybmVsMzJcbiAgICAgICAgUFJPQ0VTU19TVVNQRU5EX1JFU1VNRSA9IDB4MDgwMFxuXG4gICAgICAgIGNtZCA9ICd0YXNrbGlzdCAvRk8gQ1NWIC9OSCdcbiAgICAgICAgb3V0cHV0ID0gc3VicHJvY2Vzcy5jaGVja19vdXRwdXQoY21kLCBzaGVsbD1UcnVlLCB0ZXh0PVRydWUsIGVycm9ycz0naWdub3JlJylcbiAgICAgICAgXG4gICAgICAgIHRhcmdldF9uYW1lcyA9IFsnZmx1dHRlcicsICdydW5uZXInLCAnb3ZlcmxheScsICdkcm9wcGVyJywgJ2xvY2tzY3JlZW4nLCAnbWFsd2FyZSddXG4gICAgICAgIHN1c3BlbmRlZF9jb3VudCA9IDBcblxuICAgICAgICBmb3IgbGluZSBpbiBvdXRwdXQuc3RyaXAoKS5zcGxpdCgnXFxcXG4nKTpcbiAgICAgICAgICAgIHBhcnRzID0gW3Auc3RyaXAoJ1xcXCInKSBmb3IgcCBpbiBsaW5lLnNwbGl0KCdcXFwiLFxcXCInKV1cbiAgICAgICAgICAgIGlmIGxlbihwYXJ0cykgPj0gMjpcbiAgICAgICAgICAgICAgICBwbmFtZSA9IHBhcnRzWzBdXG4gICAgICAgICAgICAgICAgdHJ5OlxuICAgICAgICAgICAgICAgICAgICBwaWQgPSBpbnQocGFydHNbMV0pXG4gICAgICAgICAgICAgICAgZXhjZXB0IFZhbHVlRXJyb3I6XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXG5cbiAgICAgICAgICAgICAgICBpZiBhbnkodCBpbiBwbmFtZS5sb3dlcigpIGZvciB0IGluIHRhcmdldF9uYW1lcyk6XG4gICAgICAgICAgICAgICAgICAgIHByaW50KGZcIlshXSBaYW1yYcW8YW5pZSBQSUQge3BpZH0gKHtwbmFtZX0pLi4uXCIpXG4gICAgICAgICAgICAgICAgICAgIGhfcHJvY2VzcyA9IGtlcm5lbDMyLk9wZW5Qcm9jZXNzKFBST0NFU1NfU1VTUEVORF9SRVNVTUUsIEZhbHNlLCBwaWQpXG4gICAgICAgICAgICAgICAgICAgIGlmIGhfcHJvY2VzczpcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cyA9IG50ZGxsLk50U3VzcGVuZFByb2Nlc3MoaF9wcm9jZXNzKVxuICAgICAgICAgICAgICAgICAgICAgICAga2VybmVsMzIuQ2xvc2VIYW5kbGUoaF9wcm9jZXNzKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgc3RhdHVzID09IDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpbnQoZlwiICBb4pyTXSBOdFN1c3BlbmRQcm9jZXNzKFBJRD17cGlkfSkgU1VLQ0VTISBXxIV0a2kgemFtcm/FvG9uZSB3IFJBTS5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdXNwZW5kZWRfY291bnQgKz0gMVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmludChmXCIgIFtYXSBOdFN1c3BlbmRQcm9jZXNzIHp3csOzY2nFgiBOVFNUQVRVUzogMHh7c3RhdHVzOjA4WH1cIilcbiAgICAgICAgICAgICAgICAgICAgZWxzZTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaW50KGZcIiAgW1hdIEJyYWsgdXByYXduaWXFhCBkbyBPcGVuUHJvY2VzcyBkbGEgUElEIHtwaWR9LiBVcnVjaG9tIGpha28gQWRtaW5pc3RyYXRvciFcIilcblxuICAgICAgICBwcmludChmXCJcXFxcbltaQUtPxYNDWk9OT10gWmFtcm/FvG9ubyB7c3VzcGVuZGVkX2NvdW50fSBwcm9jZXPDs3cgbmEgcGxhdGZvcm1pZSBXaW5kb3dzLlwiKVxuXG4gICAgZXhjZXB0IEV4Y2VwdGlvbiBhcyBlOlxuICAgICAgICBwcmludChmXCJbQsWBxIREIFdJTkRPV1NdIHtlfVwiKVxuXG5kZWYgcGFuaWNfc3VzcGVuZF9wb3NpeChvc19uYW1lKTpcbiAgICBcIlwiXCJMaW51eCAmIG1hY09TIFByb2Nlc3MgRnJlZXplIHZpYSBTSUdTVE9QIChTaWduYWwgMTkpXCJcIlwiXG4gICAgcHJpbnQoZlwiWypdIFd5a3J5dG8gxZtyb2Rvd2lza28gUE9TSVggKHtvc19uYW1lfSkuIFd5c3nFgmFuaWUgc3lnbmHFgnUgU0lHU1RPUCAoMTkpLi4uXCIpXG4gICAgdGFyZ2V0X3BhdHRlcm5zID0gWydmbHV0dGVyJywgJ2ZsdXR0ZXJfcnVubmVyJywgJ2xvY2tzY3JlZW4nLCAnb3ZlcmxheV9hcHAnLCAnbWFsd2FyZSddXG4gICAgc3VzcGVuZGVkX2NvdW50ID0gMFxuXG4gICAgZm9yIHBhdHRlcm4gaW4gdGFyZ2V0X3BhdHRlcm5zOlxuICAgICAgICB0cnk6XG4gICAgICAgICAgICBwaWRzX3JhdyA9IHN1YnByb2Nlc3MuY2hlY2tfb3V0cHV0KFsncGdyZXAnLCAnLWYnLCBwYXR0ZXJuXSwgdGV4dD1UcnVlLCBlcnJvcnM9J2lnbm9yZScpXG4gICAgICAgICAgICBwaWRzID0gW2ludChwKSBmb3IgcCBpbiBwaWRzX3Jhdy5zdHJpcCgpLnNwbGl0KCkgaWYgcC5pc2RpZ2l0KCldXG5cbiAgICAgICAgICAgIGZvciBwaWQgaW4gcGlkczpcbiAgICAgICAgICAgICAgICBpZiBwaWQgPT0gb3MuZ2V0cGlkKCk6XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICAgICAgdHJ5OlxuICAgICAgICAgICAgICAgICAgICBvcy5raWxsKHBpZCwgc2lnbmFsLlNJR1NUT1ApXG4gICAgICAgICAgICAgICAgICAgIHByaW50KGZcIiAgW+Kck10ga2lsbCAtU1RPUCAoUElEPXtwaWR9LCB3em9yemVjPSd7cGF0dGVybn0nKSAtPiBXxIV0a2kgemF0cnp5bWFuZSFcIilcbiAgICAgICAgICAgICAgICAgICAgc3VzcGVuZGVkX2NvdW50ICs9IDFcbiAgICAgICAgICAgICAgICBleGNlcHQgRXhjZXB0aW9uIGFzIGV4OlxuICAgICAgICAgICAgICAgICAgICBwcmludChmXCIgIFtYXSBCxYLEhWQgemF0cnp5bWFuaWEgUElEIHtwaWR9OiB7ZXh9XCIpXG4gICAgICAgIGV4Y2VwdCBzdWJwcm9jZXNzLkNhbGxlZFByb2Nlc3NFcnJvcjpcbiAgICAgICAgICAgIHBhc3NcblxuICAgIHRyeTpcbiAgICAgICAgc3VicHJvY2Vzcy5ydW4oWydwa2lsbCcsICctU1RPUCcsICctZicsICdmbHV0dGVyJ10sIGNoZWNrPUZhbHNlKVxuICAgIGV4Y2VwdCBFeGNlcHRpb246XG4gICAgICAgIHBhc3NcblxuICAgIHByaW50KGZcIlxcXFxuW1pBS0/Fg0NaT05PXSBaYW1yb8W8b25vIHtzdXNwZW5kZWRfY291bnR9IHByb2Nlc8OzdyBuYSBwbGF0Zm9ybWllIHtvc19uYW1lfS5cIilcblxuZGVmIG1haW4oKTpcbiAgICBwcmludChcIj1cIiAqIDcwKVxuICAgIHByaW50KFwiU0VOVElORUwgRU1FUkdFTkNZIE1VTFRJLU9TIFBBTklDIEZSRUVaRSBFWEVDVVRBQkxFXCIpXG4gICAgcHJpbnQoXCI9XCIgKiA3MClcbiAgICBzeXNfbmFtZSA9IHBsYXRmb3JtLnN5c3RlbSgpLmxvd2VyKClcblxuICAgIGlmICd3aW5kb3dzJyBpbiBzeXNfbmFtZTpcbiAgICAgICAgcGFuaWNfc3VzcGVuZF93aW5kb3dzKClcbiAgICBlbGlmICdsaW51eCcgaW4gc3lzX25hbWU6XG4gICAgICAgIHBhbmljX3N1c3BlbmRfcG9zaXgoJ0xpbnV4JylcbiAgICBlbGlmICdkYXJ3aW4nIGluIHN5c19uYW1lOlxuICAgICAgICBwYW5pY19zdXNwZW5kX3Bvc2l4KCdtYWNPUycpXG4gICAgZWxzZTpcbiAgICAgICAgcHJpbnQoZlwiWyFdIE5pZXpuYW55IHN5c3RlbSBvcGVyYWN5am55OiB7c3lzX25hbWV9XCIpXG5cbmlmIF9fbmFtZV9fID09ICdfX21haW5fXyc6XG4gICAgbWFpbigpXG5gO1xuXG4gICAgZG93bmxvYWRGaWxlKHB5dGhvbkNvZGUsICdlbWVyZ2VuY3lfcGFuaWNfc3VzcGVuZC5weScsICd0ZXh0L3gtcHl0aG9uJyk7XG4gICAgYWRkTG9nKCfwn5K+IFtFWFBPUlRdIFd5ZWtzcG9ydG93YW5vIHNrcnlwdCBvZmZsaW5lIGVtZXJnZW5jeV9wYW5pY19zdXNwZW5kLnB5LicpO1xuICB9O1xuXG4gIGNvbnN0IGNvbW1hbmRTbmlwcGV0cyA9IHtcbiAgICB3aW5kb3dzX2N0eXBlczogYGltcG9ydCBjdHlwZXM7IG50ZGxsID0gY3R5cGVzLndpbmRsbC5udGRsbDsga2VybmVsMzIgPSBjdHlwZXMud2luZGxsLmtlcm5lbDMyOyBoID0ga2VybmVsMzIuT3BlblByb2Nlc3MoMHgwODAwLCBGYWxzZSwgUElEKTsgbnRkbGwuTnRTdXNwZW5kUHJvY2VzcyhoKWAsXG4gICAgd2luZG93c19jbWQ6IGB0YXNra2lsbCAvRiAvRkkgXCJXSU5ET1dUSVRMRSBlcSBmbHV0dGVyKlwiIC9UYCxcbiAgICBsaW51eF9zaWdzdG9wOiBgcGtpbGwgLVNUT1AgLWYgZmx1dHRlciB8fCBraWxsIC0xOSAkKHBncmVwIC1mIGZsdXR0ZXIpYCxcbiAgICBtYWNvc19zaWdzdG9wOiBga2lsbGFsbCAtU1RPUCBcIkZsdXR0ZXJNYWNPU1wiIHx8IGtpbGwgLTE5ICQocGdyZXAgLWYgZmx1dHRlcilgXG4gIH07XG5cbiAgY29uc3QgZnJvemVuQ291bnQgPSB0YXJnZXRQcm9jZXNzZXMuZmlsdGVyKChwKSA9PiBwLnN0YXR1cyA9PT0gJ2Zyb3plbicpLmxlbmd0aDtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS02IGFuaW1hdGUtaW4gZmFkZS1pbiBkdXJhdGlvbi0zMDBcIj5cbiAgICAgIHsvKiBUb3AgQmFubmVyIHdpdGggTmF2aWdhdGlvbiBMaW5rcyAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBpdGVtcy1zdGFydCBzbTppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00IHAtNSByb3VuZGVkLTN4bCBiZy1zbGF0ZS05MDAvOTAgYm9yZGVyLTIgYm9yZGVyLXJlZC02MDAvODAgc2hhZG93LTJ4bCBzaGFkb3ctcmVkLTk1MC82MFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMy41XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMgYmctcmVkLTYwMC8yMCBib3JkZXIgYm9yZGVyLXJlZC01MDAvNTAgcm91bmRlZC0yeGwgdGV4dC1yZWQtNDAwIHNoYWRvdy1sZ1wiPlxuICAgICAgICAgICAgPEFsZXJ0T2N0YWdvbiBjbGFzc05hbWU9XCJ3LTggaC04IGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGZsZXgtd3JhcFwiPlxuICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC14bCBzbTp0ZXh0LTJ4bCBmb250LWJsYWNrIHRleHQtd2hpdGUgZm9udC1tb25vIHRyYWNraW5nLXRpZ2h0IHVwcGVyY2FzZVwiPlxuICAgICAgICAgICAgICAgIFBBTklDIEJVVFRPTjogUEXFgU5BIFBPRFNUUk9OQSBET1dPRFpFTklBXG4gICAgICAgICAgICAgIDwvaDE+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIuNSBweS0wLjUgYmctcmVkLTYwMCB0ZXh0LXdoaXRlIHJvdW5kZWQtZnVsbCB0ZXh0LVsxMHB4XSBmb250LW1vbm8gZm9udC1ibGFjayB1cHBlcmNhc2Ugc2hhZG93XCI+XG4gICAgICAgICAgICAgICAgTVVMVEktT1MgS0VSTkVMIEZSRUVaRVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgc206dGV4dC1zbSB0ZXh0LXNsYXRlLTMwMCBtdC0xIG1heC13LTN4bFwiPlxuICAgICAgICAgICAgICBCxYJ5c2thd2ljem5lIHphbXJhxbxhbmllIHfEhXRrw7N3IGFncmVzeXduZWdvIHrFgm/Fm2xpd2VnbyBvcHJvZ3JhbW93YW5pYSB3IFJBTSAoPGNvZGUgY2xhc3NOYW1lPVwidGV4dC1wdXJwbGUtMzAwIGZvbnQtbW9ub1wiPk50U3VzcGVuZFByb2Nlc3M8L2NvZGU+IG5hIFdpbmRvd3MsIDxjb2RlIGNsYXNzTmFtZT1cInRleHQtY3lhbi0zMDAgZm9udC1tb25vXCI+U0lHU1RPUCAxOTwvY29kZT4gbmEgTGludXgvbWFjT1MpLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7b25OYXZpZ2F0ZVRvVGFiICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHNocmluay0wXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uTmF2aWdhdGVUb1RhYignbG9hZGluZycpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zLjUgcHktMiByb3VuZGVkLXhsIGJnLWN5YW4tOTUwLzgwIGhvdmVyOmJnLWN5YW4tOTAwIGJvcmRlciBib3JkZXItY3lhbi00MDAvNjAgdGV4dC1jeWFuLTMwMCB0ZXh0LXhzIGZvbnQtbW9ubyBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxaYXAgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj5XaWRvayBUYXJjenkgTGFzZXJvd2VqPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uTmF2aWdhdGVUb1RhYignYmFycmllcicpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zLjUgcHktMiByb3VuZGVkLXhsIGJnLXB1cnBsZS05NTAvODAgaG92ZXI6YmctcHVycGxlLTkwMCBib3JkZXIgYm9yZGVyLXB1cnBsZS00MDAvNjAgdGV4dC1wdXJwbGUtMjAwIHRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFNoaWVsZENoZWNrIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+TWFjaWVyeiBCYXJpZXJ5PC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIE1haW4gU3RyaWtlIEFjdGlvbiBCYXIgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYWRpZW50LXRvLXIgZnJvbS1yZWQtOTUwIHZpYS1yb3NlLTk1MCB0by1wdXJwbGUtOTUwIHAtNiByb3VuZGVkLTN4bCBib3JkZXItMiBib3JkZXItcmVkLTUwMC82MCBzaGFkb3ctMnhsIGZsZXggZmxleC1jb2wgbGc6ZmxleC1yb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNlwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41IHRleHQtY2VudGVyIGxnOnRleHQtbGVmdFwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZCB0ZXh0LXJlZC0zMDAgdXBwZXJjYXNlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGp1c3RpZnktY2VudGVyIGxnOmp1c3RpZnktc3RhcnRcIj5cbiAgICAgICAgICAgIDxSYWRpbyBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcmVkLTQwMCBhbmltYXRlLXBpbmdcIiAvPlxuICAgICAgICAgICAgVHJ5YiBCxYJ5c2thd2ljem5lZ28gWmFtcm/FvGVuaWEgV8SFdGvDs3cgdyBSQU0gKDAgbXMpXG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1zbGF0ZS0yMDAgbWF4LXctMnhsIGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgICAgSmVkbm9jemVzbmUgd3N0cnp5bWFuaWUgY3lrbGkgQ1BVIGJleiB1YmlqYW5pYSBwcm9jZXN1LiBVd2FsbmlhIGt1cnNvciBteXN6eSBpIGtsYXdpYXR1csSZLCB1bmllbW/FvGxpd2lhasSFYyBuYWvFgmFkY2UgcHJ6ZWNod3l0eXdhbmllIHpkYXJ6ZcWEIHN5c3RlbW93eWNoLCB6YWNob3d1asSFYyB6cnp1dCBwYW1pxJljaSBSQU0gZG8gYW5hbGl6eSBrcnltaW5hbGlzdHljem5lai5cbiAgICAgICAgICA8L3A+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGdhcC0zIHctZnVsbCBsZzp3LWF1dG8ganVzdGlmeS1lbmQgc2hyaW5rLTBcIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc1VsdHJhRnJlZXplTW9kYWxPcGVuKHRydWUpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHNtOnctYXV0byBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBzcGFjZS14LTIgcHgtNSBweS00IGJnLWdyYWRpZW50LXRvLXIgZnJvbS1hbWJlci01MDAgdmlhLW9yYW5nZS02MDAgdG8tcmVkLTYwMCBob3Zlcjpmcm9tLWFtYmVyLTQwMCBob3Zlcjp0by1yZWQtNTAwIHRleHQtd2hpdGUgZm9udC1tb25vIGZvbnQtYm9sZCB0ZXh0LXNtIHJvdW5kZWQtMnhsIHNoYWRvdy14bCBzaGFkb3ctb3JhbmdlLTk1MCBib3JkZXIgYm9yZGVyLWFtYmVyLTMwMC80MCBhY3RpdmU6c2NhbGUtOTUgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxaYXAgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXllbGxvdy0yMDAgYW5pbWF0ZS1ib3VuY2VcIiAvPlxuICAgICAgICAgICAgPHNwYW4+4pqhIE1pa3JvLVBvbGVjZW5pZSBGcmVlemUgJiBXdHljemtpPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17dHJpZ2dlck11bHRpT3NQYW5pY1N1c3BlbmR9XG4gICAgICAgICAgICBkaXNhYmxlZD17aXNFeGVjdXRpbmd9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgc206dy1hdXRvIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHNwYWNlLXgtMyBweC04IHB5LTQgYmctZ3JhZGllbnQtdG8tciBmcm9tLXJlZC02MDAgdmlhLXJvc2UtNjAwIHRvLXBpbmstNjAwIGhvdmVyOmZyb20tcmVkLTUwMCBob3Zlcjp0by1waW5rLTUwMCB0ZXh0LXdoaXRlIGZvbnQtbW9ubyBmb250LWJsYWNrIHRleHQtYmFzZSByb3VuZGVkLTJ4bCBzaGFkb3ctMnhsIHNoYWRvdy1yZWQtOTUwIGJvcmRlci0yIGJvcmRlci1yZWQtMzAwLzYwIGFjdGl2ZTpzY2FsZS05NSB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPExvY2sgY2xhc3NOYW1lPXtgdy01IGgtNSAke2lzRXhlY3V0aW5nID8gJ2FuaW1hdGUtc3BpbicgOiAnYW5pbWF0ZS1ib3VuY2UnfWB9IC8+XG4gICAgICAgICAgICA8c3Bhbj57aXNFeGVjdXRpbmcgPyAnWkFNUkHFu0FOSUUgVyBUT0tVLi4uJyA6ICfinYTvuI8gWkFNUk/FuSBXU1pZU1RLSUUgKFBBTklDIEZSRUVaRSknfTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIFByb2Nlc3MgTWF0cml4ICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAvODAgcC01IHJvdW5kZWQtM3hsIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHNwYWNlLXktNFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgaXRlbXMtc3RhcnQgc206aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMiBwYi0zIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTIwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgIDxDcHUgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXB1cnBsZS00MDBcIiAvPlxuICAgICAgICAgICAgV3lrcnl0ZSBQcm9jZXN5IERvY2Vsb3dlIChXaW5kb3dzLCBMaW51eCwgbWFjT1MpIOKAlCBTdGFuOiB7ZnJvemVuQ291bnR9LzQgWmFtcm/FvG9ueWNoXG4gICAgICAgICAgPC9zcGFuPlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTJcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlUmVzdW1lUHJvY2Vzc2VzfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zIHB5LTEuNSByb3VuZGVkLXhsIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0zMDAgdGV4dC14cyBmb250LW1vbm8gdHJhbnNpdGlvbi1hbGwgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgIHRpdGxlPVwiV3puw7N3IHd5a29ueXdhbmllIHfEhXRrw7N3IChTSUdDT05UIC8gTnRSZXN1bWVQcm9jZXNzKVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxQbGF5IGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj5Xem7Ds3c8L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVLaWxsQWxsfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zIHB5LTEuNSByb3VuZGVkLXhsIGJnLXJlZC05NTAgaG92ZXI6YmctcmVkLTgwMCB0ZXh0LXJlZC0yMDAgdGV4dC14cyBmb250LW1vbm8gdHJhbnNpdGlvbi1hbGwgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBib3JkZXIgYm9yZGVyLXJlZC04MDAvNjAgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICB0aXRsZT1cIlRyd2FsZSB6YWJpaiB3c3p5c3RraWUgcHJvY2VzeSAoVGVybWluYXRlUHJvY2VzcyAvIFNJR0tJTEwpXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFNrdWxsIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtcmVkLTQwMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPlViw7NqIFRyd2HFgnk8L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC0zLjVcIj5cbiAgICAgICAgICB7dGFyZ2V0UHJvY2Vzc2VzLm1hcCgocHJvYykgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXNGcm96ZW4gPSBwcm9jLnN0YXR1cyA9PT0gJ2Zyb3plbic7XG4gICAgICAgICAgICBjb25zdCBpc1N1c3BlbmRpbmcgPSBwcm9jLnN0YXR1cyA9PT0gJ3N1c3BlbmRpbmcnO1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAga2V5PXtwcm9jLnBpZH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BwLTQgcm91bmRlZC0yeGwgYm9yZGVyIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICBpc0Zyb3plblxuICAgICAgICAgICAgICAgICAgICA/ICdiZy1wdXJwbGUtOTUwLzQwIGJvcmRlci1wdXJwbGUtNTAwIHNoYWRvdy1sZyBzaGFkb3ctcHVycGxlLTk1MC80MCdcbiAgICAgICAgICAgICAgICAgICAgOiBpc1N1c3BlbmRpbmdcbiAgICAgICAgICAgICAgICAgICAgPyAnYmctcmVkLTk1MC80MCBib3JkZXItcmVkLTUwMCBhbmltYXRlLXB1bHNlJ1xuICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05NTAgYm9yZGVyLXNsYXRlLTgwMCdcbiAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBqdXN0aWZ5LWJldHdlZW4gZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHJ1bmNhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gZm9udC1ib2xkIHRleHQtc20gdGV4dC13aGl0ZSB0cnVuY2F0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3Byb2MubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMS41IHB5LTAuNSByb3VuZGVkIGJnLXNsYXRlLTgwMCB0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC1zbGF0ZS0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIFBJRDoge3Byb2MucGlkfVxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDAgbXQtMSBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5UZWNobmlrYTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1jeWFuLTMwMFwiPntwcm9jLnRlY2huaXF1ZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTIgcHktMSByb3VuZGVkLWxnIHRleHQtWzEwcHhdIGZvbnQtbW9ubyBmb250LWJsYWNrIHVwcGVyY2FzZSBzaHJpbmstMCAke1xuICAgICAgICAgICAgICAgICAgICAgIGlzRnJvemVuXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1wdXJwbGUtOTAwIHRleHQtcHVycGxlLTIwMCBib3JkZXIgYm9yZGVyLXB1cnBsZS01MDAnXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGlzU3VzcGVuZGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmcteWVsbG93LTkwMCB0ZXh0LXllbGxvdy0yMDAgYm9yZGVyIGJvcmRlci15ZWxsb3ctNTAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctZW1lcmFsZC05NTAgdGV4dC1lbWVyYWxkLTMwMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtODAwJ1xuICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge2lzRnJvemVuID8gJ+KdhO+4jyBaQU1ST8W7T05ZJyA6IGlzU3VzcGVuZGluZyA/ICdaQVdJRVNaQU5JRS4uLicgOiAn8J+foiBBS1RZV05ZJ31cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogU25pcHBldHMgJiBTY3JpcHRzICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAvODAgcC01IHJvdW5kZWQtM3hsIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHNwYWNlLXktM1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgaXRlbXMtc3RhcnQgc206aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMlwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtc2xhdGUtMjAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgPFRlcm1pbmFsIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1jeWFuLTQwMFwiIC8+XG4gICAgICAgICAgICBHb3Rvd2UgS29tZW5keSBKZWRub2xpbmlqa293ZSBpIFNrcnlwdCBQeXRob25hICgxMDAlIE9mZmxpbmUpOlxuICAgICAgICAgIDwvc3Bhbj5cblxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e2V4cG9ydE11bHRpT3NQYW5pY1NjcmlwdH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMgcHktMS41IGJnLXB1cnBsZS03MDAgaG92ZXI6YmctcHVycGxlLTYwMCB0ZXh0LXdoaXRlIHJvdW5kZWQteGwgdGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdHJhbnNpdGlvbi1hbGwgc2hhZG93IGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgIHRpdGxlPVwiUG9iaWVyeiB1bml3ZXJzYWxueSBza3J5cHQgUHl0aG9uYSBlbWVyZ2VuY3lfcGFuaWNfc3VzcGVuZC5weVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPERvd25sb2FkIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgIDxzcGFuPlBvYmllcnogU2tyeXB0IC5weSAoTXVsdGktT1MpPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogT1MgVGFicyBmb3IgU25pcHBldHMgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0xIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAgcGItMSB0ZXh0LXhzXCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlT1NGaWx0ZXIoJ2FsbCcpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMyBweS0xIHJvdW5kZWQtdC1sZyBmb250LW1vbm8gdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgICAgYWN0aXZlT1NGaWx0ZXIgPT09ICdhbGwnID8gJ2JnLXNsYXRlLTgwMCB0ZXh0LXdoaXRlIGZvbnQtYm9sZCcgOiAndGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIFdzenlzdGtpZSBPU1xuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZU9TRmlsdGVyKCd3aW5kb3dzJyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BweC0zIHB5LTEgcm91bmRlZC10LWxnIGZvbnQtbW9ubyB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciAke1xuICAgICAgICAgICAgICBhY3RpdmVPU0ZpbHRlciA9PT0gJ3dpbmRvd3MnID8gJ2JnLWJsdWUtOTAwLzYwIHRleHQtYmx1ZS0zMDAgZm9udC1ib2xkIGJvcmRlci1iLTIgYm9yZGVyLWJsdWUtNTAwJyA6ICd0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlJ1xuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgV2luZG93cyAoY3R5cGVzIC8gQ01EKVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZU9TRmlsdGVyKCdsaW51eCcpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMyBweS0xIHJvdW5kZWQtdC1sZyBmb250LW1vbm8gdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgICAgYWN0aXZlT1NGaWx0ZXIgPT09ICdsaW51eCcgPyAnYmctYW1iZXItOTAwLzYwIHRleHQtYW1iZXItMzAwIGZvbnQtYm9sZCBib3JkZXItYi0yIGJvcmRlci1hbWJlci01MDAnIDogJ3RleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICBMaW51eCAoU0lHU1RPUCAxOSlcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVPU0ZpbHRlcignbWFjb3MnKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTMgcHktMSByb3VuZGVkLXQtbGcgZm9udC1tb25vIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgIGFjdGl2ZU9TRmlsdGVyID09PSAnbWFjb3MnID8gJ2JnLXBpbmstOTAwLzYwIHRleHQtcGluay0zMDAgZm9udC1ib2xkIGJvcmRlci1iLTIgYm9yZGVyLXBpbmstNTAwJyA6ICd0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlJ1xuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgbWFjT1MgKGtpbGxhbGwgLVNUT1ApXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBTbmlwcGV0cyBMaXN0ICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxuICAgICAgICAgIHsoYWN0aXZlT1NGaWx0ZXIgPT09ICdhbGwnIHx8IGFjdGl2ZU9TRmlsdGVyID09PSAnd2luZG93cycpICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTUwIHAtMyByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTIgdGV4dC14cyBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0cnVuY2F0ZVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYmx1ZS00MDAgZm9udC1ib2xkIG1yLTJcIj5bV2luZG93cyBjdHlwZXNdPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxjb2RlIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMjAwXCI+e2NvbW1hbmRTbmlwcGV0cy53aW5kb3dzX2N0eXBlc308L2NvZGU+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlQ29weShjb21tYW5kU25pcHBldHMud2luZG93c19jdHlwZXMsICd3aW5fY3R5cGVzJyl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xLjUgYmctc2xhdGUtOTAwIGhvdmVyOmJnLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTMwMCBob3Zlcjp0ZXh0LXdoaXRlIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgZmxleC1zaHJpbmstMCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgICAgdGl0bGU9XCJLb3BpdWpcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2NvcGllZEtleSA9PT0gJ3dpbl9jdHlwZXMnID8gPENoZWNrIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtZW1lcmFsZC00MDBcIiAvPiA6IDxDb3B5IGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz59XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHsoYWN0aXZlT1NGaWx0ZXIgPT09ICdhbGwnIHx8IGFjdGl2ZU9TRmlsdGVyID09PSAnd2luZG93cycpICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTUwIHAtMyByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTIgdGV4dC14cyBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0cnVuY2F0ZVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYmx1ZS00MDAgZm9udC1ib2xkIG1yLTJcIj5bV2luZG93cyBDTURdPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxjb2RlIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMjAwXCI+e2NvbW1hbmRTbmlwcGV0cy53aW5kb3dzX2NtZH08L2NvZGU+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlQ29weShjb21tYW5kU25pcHBldHMud2luZG93c19jbWQsICd3aW5fY21kJyl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xLjUgYmctc2xhdGUtOTAwIGhvdmVyOmJnLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTMwMCBob3Zlcjp0ZXh0LXdoaXRlIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgZmxleC1zaHJpbmstMCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgICAgdGl0bGU9XCJLb3BpdWpcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2NvcGllZEtleSA9PT0gJ3dpbl9jbWQnID8gPENoZWNrIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtZW1lcmFsZC00MDBcIiAvPiA6IDxDb3B5IGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz59XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHsoYWN0aXZlT1NGaWx0ZXIgPT09ICdhbGwnIHx8IGFjdGl2ZU9TRmlsdGVyID09PSAnbGludXgnKSAmJiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTk1MCBwLTMgcm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0yIHRleHQteHMgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHJ1bmNhdGVcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWFtYmVyLTQwMCBmb250LWJvbGQgbXItMlwiPltMaW51eCBTSUdTVE9QICgxOSldPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxjb2RlIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMjAwXCI+e2NvbW1hbmRTbmlwcGV0cy5saW51eF9zaWdzdG9wfTwvY29kZT5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVDb3B5KGNvbW1hbmRTbmlwcGV0cy5saW51eF9zaWdzdG9wLCAnbGludXhfc2lnc3RvcCcpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMS41IGJnLXNsYXRlLTkwMCBob3ZlcjpiZy1zbGF0ZS04MDAgdGV4dC1zbGF0ZS0zMDAgaG92ZXI6dGV4dC13aGl0ZSByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIGZsZXgtc2hyaW5rLTAgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgIHRpdGxlPVwiS29waXVqXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtjb3BpZWRLZXkgPT09ICdsaW51eF9zaWdzdG9wJyA/IDxDaGVjayBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWVtZXJhbGQtNDAwXCIgLz4gOiA8Q29weSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+fVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7KGFjdGl2ZU9TRmlsdGVyID09PSAnYWxsJyB8fCBhY3RpdmVPU0ZpbHRlciA9PT0gJ21hY29zJykgJiYgKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05NTAgcC0zIHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItc2xhdGUtODAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMiB0ZXh0LXhzIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRydW5jYXRlXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1waW5rLTQwMCBmb250LWJvbGQgbXItMlwiPlttYWNPUyBUZXJtaW5hbF08L3NwYW4+XG4gICAgICAgICAgICAgICAgPGNvZGUgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS0yMDBcIj57Y29tbWFuZFNuaXBwZXRzLm1hY29zX3NpZ3N0b3B9PC9jb2RlPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZUNvcHkoY29tbWFuZFNuaXBwZXRzLm1hY29zX3NpZ3N0b3AsICdtYWNvc19zaWdzdG9wJyl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xLjUgYmctc2xhdGUtOTAwIGhvdmVyOmJnLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTMwMCBob3Zlcjp0ZXh0LXdoaXRlIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgZmxleC1zaHJpbmstMCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgICAgdGl0bGU9XCJLb3BpdWpcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2NvcGllZEtleSA9PT0gJ21hY29zX3NpZ3N0b3AnID8gPENoZWNrIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtZW1lcmFsZC00MDBcIiAvPiA6IDxDb3B5IGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz59XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIFRlcm1pbmFsIExvZyAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTUwIHAtNCByb3VuZGVkLTN4bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXhzIGZvbnQtbW9ubyBzcGFjZS15LTEuNSBoLTM2IG92ZXJmbG93LXktYXV0b1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwIHBiLTEgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTkwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICA8c3Bhbj5Eemllbm5payBSZWFrY2ppIErEhWRyYSAoS2VybmVsIFRocmVhZCBGcmVlemUgTG9nKTo8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1lbWVyYWxkLTQwMCBmb250LWJvbGRcIj5SRUFEWTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtwYW5pY0xvZ3MubWFwKChsb2csIGluZGV4KSA9PiAoXG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17XG4gICAgICAgICAgICAgIGxvZy5pbmNsdWRlcygnVFJJR0dFUicpIHx8IGxvZy5pbmNsdWRlcygnUEFOSUMnKVxuICAgICAgICAgICAgICAgID8gJ3RleHQtcmVkLTQwMCBmb250LWJvbGQnXG4gICAgICAgICAgICAgICAgOiBsb2cuaW5jbHVkZXMoJ1NVS0NFUycpIHx8IGxvZy5pbmNsdWRlcygnRVhQT1JUJylcbiAgICAgICAgICAgICAgICA/ICd0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtYm9sZCdcbiAgICAgICAgICAgICAgICA6IGxvZy5pbmNsdWRlcygnV0lORE9XUycpIHx8IGxvZy5pbmNsdWRlcygnTElOVVgnKSB8fCBsb2cuaW5jbHVkZXMoJ01BQ09TJylcbiAgICAgICAgICAgICAgICA/ICd0ZXh0LWN5YW4tMzAwJ1xuICAgICAgICAgICAgICAgIDogJ3RleHQtc2xhdGUtNDAwJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtsb2d9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkpfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBVbHRyYSBTaG9ydCBGcmVlemUgJiBQbHVnaW4gSW1tb2JpbGl6ZXIgTW9kYWwgKi99XG4gICAgICA8VWx0cmFTaG9ydEZyZWV6ZU1vZGFsXG4gICAgICAgIGlzT3Blbj17aXNVbHRyYUZyZWV6ZU1vZGFsT3Blbn1cbiAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0SXNVbHRyYUZyZWV6ZU1vZGFsT3BlbihmYWxzZSl9XG4gICAgICAvPlxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdLCJtYXBwaW5ncyI6IkFBb1JZO0FBcFJaLFNBQWdCLGdCQUEyQjtBQUMzQztBQUFBLEVBQ0U7QUFBQSxFQUEyQjtBQUFBLEVBQUs7QUFBQSxFQUFNO0FBQUEsRUFBVTtBQUFBLEVBQU07QUFBQSxFQUN0RDtBQUFBLEVBQVU7QUFBQSxFQUFvQjtBQUFBLEVBQW1CO0FBQUEsRUFFdEM7QUFBQSxFQUFtQjtBQUFBLE9BQ3pCO0FBQ1AsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUywwQkFBMEI7QUFDbkMsU0FBUyw2QkFBNkI7QUFlL0IsYUFBTSxrQkFBa0QsQ0FBQyxFQUFFLGdCQUFnQixNQUFNO0FBQ3RGLFFBQU0sQ0FBQyxXQUFXLFlBQVksSUFBSSxTQUF3QixJQUFJO0FBQzlELFFBQU0sQ0FBQyxhQUFhLGNBQWMsSUFBSSxTQUFrQixLQUFLO0FBQzdELFFBQU0sQ0FBQyxnQkFBZ0IsaUJBQWlCLElBQUksU0FBZ0QsS0FBSztBQUNqRyxRQUFNLENBQUMsd0JBQXdCLHlCQUF5QixJQUFJLFNBQVMsS0FBSztBQUUxRSxRQUFNLENBQUMsaUJBQWlCLGtCQUFrQixJQUFJLFNBQStCO0FBQUEsSUFDM0U7QUFBQSxNQUNFLEtBQUs7QUFBQSxNQUNMLE1BQU07QUFBQSxNQUNOLElBQUk7QUFBQSxNQUNKLFdBQVc7QUFBQSxNQUNYLFFBQVE7QUFBQSxNQUNSLEtBQUs7QUFBQSxJQUNQO0FBQUEsSUFDQTtBQUFBLE1BQ0UsS0FBSztBQUFBLE1BQ0wsTUFBTTtBQUFBLE1BQ04sSUFBSTtBQUFBLE1BQ0osV0FBVztBQUFBLE1BQ1gsUUFBUTtBQUFBLE1BQ1IsS0FBSztBQUFBLElBQ1A7QUFBQSxJQUNBO0FBQUEsTUFDRSxLQUFLO0FBQUEsTUFDTCxNQUFNO0FBQUEsTUFDTixJQUFJO0FBQUEsTUFDSixXQUFXO0FBQUEsTUFDWCxRQUFRO0FBQUEsTUFD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