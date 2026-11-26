import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"];
import { motion, AnimatePresence } from "/sentinel-shield/node_modules/.vite/deps/framer-motion.js?v=120be383";
import {
  Zap,
  ShieldCheck,
  Lock,
  Play,
  RefreshCw,
  Cpu,
  Terminal,
  Download,
  Copy,
  Check,
  Layers,
  AlertOctagon,
  CheckCircle2
} from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import {
  freezeAllPluginManager,
  generateFreezeAllPythonScript
} from "/sentinel-shield/src/utils/freezeAllPluginEngine.ts";
import { CodeBlock } from "/sentinel-shield/src/components/CodeBlock.tsx";
import { downloadFile } from "/sentinel-shield/src/utils/offlinePackageExporter.ts";
export const FreezeAllPluginModule = () => {
  const [processes, setProcesses] = useState(() => freezeAllPluginManager.getProcesses());
  const [config, setConfig] = useState(() => freezeAllPluginManager.getConfig());
  const [isScanning, setIsScanning] = useState(false);
  const [isFreezingAll, setIsFreezingAll] = useState(false);
  const [selectedTab, setSelectedTab] = useState("PROCESSES");
  const [copiedKey, setCopiedKey] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);
  useEffect(() => {
    const unsub = freezeAllPluginManager.subscribe(() => {
      setProcesses(freezeAllPluginManager.getProcesses());
      setConfig(freezeAllPluginManager.getConfig());
    });
    return () => unsub();
  }, []);
  const generatedPythonCode = generateFreezeAllPythonScript(processes, config);
  const powerShell1Liner = `powershell -nop -c "$n=Add-Type -MemberDefinition '[DllImport(\\"ntdll.dll\\")]public static extern int NtSuspendProcess(IntPtr h);' -Name 'N' -Namespace 'S' -PassThru;Get-Process|?{$_.Path -match '(?i)overlay|window_manager|bitsdojo' -or $_.Modules.ModuleName -match '(?i)overlay|window_manager|bitsdojo'}|%{$n::NtSuspendProcess($_.Handle);Write-Host \\"Frozen PID: $($_.Id)\\" -F Cyan}"`;
  const handleScanNow = () => {
    setIsScanning(true);
    setTimeout(() => {
      const updated = freezeAllPluginManager.scanNow();
      setIsScanning(false);
      setStatusMessage(`Przeskanowano pamięć RAM: zidentyfikowano ${updated.length} procesów ze słowami 'overlay', 'window_manager' lub 'bitsdojo'.`);
      setTimeout(() => setStatusMessage(null), 5e3);
    }, 600);
  };
  const handleFreezeAll = () => {
    setIsFreezingAll(true);
    setTimeout(() => {
      const count = freezeAllPluginManager.freezeAll();
      setIsFreezingAll(false);
      setStatusMessage(`❄️ [NtSuspendProcess] Pomyślnie zamrożono ${count} procesów w pamięci RAM w czasie 0 ms!`);
      setTimeout(() => setStatusMessage(null), 6e3);
    }, 700);
  };
  const handleResumeAll = () => {
    const count = freezeAllPluginManager.resumeAll();
    setStatusMessage(`▶️ [NtResumeProcess] Wznowiono wykonywanie ${count} procesów.`);
    setTimeout(() => setStatusMessage(null), 4e3);
  };
  const handleDownloadPythonScript = () => {
    downloadFile(generatedPythonCode, "freeze_all_overlay_bitsdojo.py", "text/x-python");
    setStatusMessage("💾 Wyeksportowano skrypt freeze_all_overlay_bitsdojo.py (100% OFFLINE).");
    setTimeout(() => setStatusMessage(null), 4e3);
  };
  const handleCopyCode = (code, key) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };
  const frozenCount = processes.filter((p) => p.status === "FROZEN_IN_RAM").length;
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6 font-sans", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-cyan-950/80 to-slate-950 border border-cyan-800/60 shadow-2xl relative overflow-hidden", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "p-2.5 rounded-xl bg-cyan-600/20 border border-cyan-500/50 text-cyan-300 shadow-lg shadow-cyan-950", children: /* @__PURE__ */ jsxDEV(Zap, { className: "w-6 h-6 animate-pulse text-cyan-400" }, void 0, false, {
              fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
              lineNumber: 84,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
              lineNumber: 83,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxDEV("h2", { className: "text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2", children: /* @__PURE__ */ jsxDEV("span", { children: "Moduł Wtyczki 'Freeze-All' (Overlay & BitsDojo Immobilizer)" }, void 0, false, {
                  fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                  lineNumber: 89,
                  columnNumber: 21
                }, this) }, void 0, false, {
                  fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                  lineNumber: 88,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-600 text-xs font-mono font-bold", children: "NtSuspendProcess 0 ms" }, void 0, false, {
                  fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                  lineNumber: 91,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                lineNumber: 87,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-xs font-mono text-cyan-400 mt-0.5", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-cyan-400 animate-ping" }, void 0, false, {
                  fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                  lineNumber: 96,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "FILTRY: 'overlay' • 'window_manager' • 'bitsdojo' | BEZPOŚREDNIE WYWOŁANIE NTDLL" }, void 0, false, {
                  fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                  lineNumber: 97,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                lineNumber: 95,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
              lineNumber: 86,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
            lineNumber: 82,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl", children: [
            "Autonomiczny moduł wtyczki skanujący pamięć procesu i załadowane moduły DLL pod kątem agresywnych bibliotek okienkowych. Generuje i uruchamia zoptymalizowany skrypt Pythona wywołujący ",
            /* @__PURE__ */ jsxDEV("code", { className: "text-cyan-300 font-mono", children: "ntdll.dll!NtSuspendProcess" }, void 0, false, {
              fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
              lineNumber: 102,
              columnNumber: 199
            }, this),
            " dla każdego wykrytego PID-u."
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
            lineNumber: 101,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
          lineNumber: 81,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleScanNow,
              disabled: isScanning,
              className: "px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer",
              children: [
                /* @__PURE__ */ jsxDEV(RefreshCw, { className: `w-4 h-4 text-cyan-400 ${isScanning ? "animate-spin" : ""}` }, void 0, false, {
                  fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                  lineNumber: 113,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: isScanning ? "Skanowanie..." : "Skanuj Procesy" }, void 0, false, {
                  fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                  lineNumber: 114,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
              lineNumber: 108,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleFreezeAll,
              disabled: isFreezingAll,
              className: "px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-mono flex items-center gap-2 shadow-lg transition-all cursor-pointer bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white shadow-cyan-950/60 border border-cyan-400/40",
              children: [
                /* @__PURE__ */ jsxDEV(Lock, { className: `w-4 h-4 ${isFreezingAll ? "animate-spin" : "animate-bounce"}` }, void 0, false, {
                  fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                  lineNumber: 122,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: isFreezingAll ? "Zamrażanie w RAM..." : "❄️ Uruchom Freeze-All (0 ms)" }, void 0, false, {
                  fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                  lineNumber: 123,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
              lineNumber: 117,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleResumeAll,
              className: "p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer",
              title: "Wznów wykonywanie procesów (NtResumeProcess)",
              children: /* @__PURE__ */ jsxDEV(Play, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                lineNumber: 131,
                columnNumber: 15
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
              lineNumber: 126,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
          lineNumber: 107,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
        lineNumber: 80,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(AnimatePresence, { children: statusMessage && /* @__PURE__ */ jsxDEV(
        motion.div,
        {
          initial: { opacity: 0, y: -10 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0 },
          className: "mt-4 p-2.5 rounded-xl bg-cyan-950/90 border border-cyan-400 text-xs font-mono text-cyan-200 flex items-center justify-between",
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                lineNumber: 146,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: statusMessage }, void 0, false, {
                fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                lineNumber: 147,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
              lineNumber: 145,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-cyan-400 font-bold", children: "100% BEZPIECZNE" }, void 0, false, {
              fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
              lineNumber: 149,
              columnNumber: 15
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
          lineNumber: 139,
          columnNumber: 13
        },
        this
      ) }, void 0, false, {
        fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
        lineNumber: 137,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80 text-xs font-mono", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950/90 p-2.5 rounded-xl border border-slate-800", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 text-[10px] uppercase block", children: "Wykryte Zagrożenia" }, void 0, false, {
            fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
            lineNumber: 157,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-base font-black text-cyan-400", children: [
            processes.length,
            " procesy"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
            lineNumber: 158,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
          lineNumber: 156,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950/90 p-2.5 rounded-xl border border-slate-800", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 text-[10px] uppercase block", children: "Stan Zamrożenia w RAM" }, void 0, false, {
            fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
            lineNumber: 162,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-base font-black text-emerald-400", children: [
            frozenCount,
            "/",
            processes.length,
            " zamrożonych"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
            lineNumber: 163,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
          lineNumber: 161,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950/90 p-2.5 rounded-xl border border-slate-800", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 text-[10px] uppercase block", children: "Słowa Kluczowe Filtra" }, void 0, false, {
            fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
            lineNumber: 167,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-yellow-300", children: "overlay, window_manager, bitsdojo" }, void 0, false, {
            fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
            lineNumber: 168,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
          lineNumber: 166,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950/90 p-2.5 rounded-xl border border-slate-800", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 text-[10px] uppercase block", children: "Funkcja Jądra Win32" }, void 0, false, {
            fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
            lineNumber: 172,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-purple-300", children: "ntdll!NtSuspendProcess" }, void 0, false, {
            fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
            lineNumber: 173,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
          lineNumber: 171,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
        lineNumber: 155,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
      lineNumber: 79,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 border-b border-slate-800 pb-2 text-xs font-mono flex-wrap gap-y-2", children: [
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setSelectedTab("PROCESSES"),
          className: `px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors cursor-pointer ${selectedTab === "PROCESSES" ? "bg-cyan-600 text-white shadow-lg shadow-cyan-950" : "bg-slate-900 text-slate-400 hover:text-white"}`,
          children: [
            /* @__PURE__ */ jsxDEV(Cpu, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
              lineNumber: 188,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              "Wykryte Procesy (",
              processes.length,
              ")"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
              lineNumber: 189,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
          lineNumber: 180,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setSelectedTab("PYTHON_CODE"),
          className: `px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors cursor-pointer ${selectedTab === "PYTHON_CODE" ? "bg-cyan-600 text-white shadow-lg shadow-cyan-950" : "bg-slate-900 text-slate-400 hover:text-white"}`,
          children: [
            /* @__PURE__ */ jsxDEV(Terminal, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
              lineNumber: 200,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Skrypt Pythona (NtSuspendProcess)" }, void 0, false, {
              fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
              lineNumber: 201,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
          lineNumber: 192,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setSelectedTab("POWERSHELL"),
          className: `px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors cursor-pointer ${selectedTab === "POWERSHELL" ? "bg-cyan-600 text-white shadow-lg shadow-cyan-950" : "bg-slate-900 text-slate-400 hover:text-white"}`,
          children: [
            /* @__PURE__ */ jsxDEV(Zap, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
              lineNumber: 212,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "PowerShell 1-Liner" }, void 0, false, {
              fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
              lineNumber: 213,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
          lineNumber: 204,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setSelectedTab("DOCS"),
          className: `px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors cursor-pointer ${selectedTab === "DOCS" ? "bg-cyan-600 text-white shadow-lg shadow-cyan-950" : "bg-slate-900 text-slate-400 hover:text-white"}`,
          children: [
            /* @__PURE__ */ jsxDEV(Layers, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
              lineNumber: 224,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Architektura Unieruchomienia Win32" }, void 0, false, {
              fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
              lineNumber: 225,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
          lineNumber: 216,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
      lineNumber: 179,
      columnNumber: 7
    }, this),
    selectedTab === "PROCESSES" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-4 font-mono text-xs", children: /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 gap-3", children: processes.map((proc) => {
      const isFrozen = proc.status === "FROZEN_IN_RAM";
      return /* @__PURE__ */ jsxDEV(
        "div",
        {
          className: `p-4 rounded-xl border transition-all ${isFrozen ? "bg-emerald-950/40 border-emerald-500/70 shadow-lg shadow-emerald-950/20" : "bg-slate-900/90 border-cyan-900/60 hover:border-cyan-500/60"}`,
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-2 border-b border-slate-800/80", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2.5", children: [
                /* @__PURE__ */ jsxDEV("span", { className: `p-2 rounded-lg border ${isFrozen ? "bg-emerald-900/80 border-emerald-400 text-emerald-200" : "bg-red-900/60 border-red-500 text-red-200 animate-pulse"}`, children: isFrozen ? /* @__PURE__ */ jsxDEV(Lock, { className: "w-4 h-4 text-emerald-300" }, void 0, false, {
                  fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                  lineNumber: 252,
                  columnNumber: 37
                }, this) : /* @__PURE__ */ jsxDEV(AlertOctagon, { className: "w-4 h-4 text-red-300" }, void 0, false, {
                  fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                  lineNumber: 252,
                  columnNumber: 85
                }, this) }, void 0, false, {
                  fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                  lineNumber: 247,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-white text-sm", children: proc.name }, void 0, false, {
                      fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                      lineNumber: 256,
                      columnNumber: 27
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.2 rounded bg-slate-950 border border-slate-700 text-slate-300 text-[10px]", children: [
                      "PID: ",
                      /* @__PURE__ */ jsxDEV("strong", { className: "text-yellow-300", children: proc.pid }, void 0, false, {
                        fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                        lineNumber: 258,
                        columnNumber: 34
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                      lineNumber: 257,
                      columnNumber: 27
                    }, this),
                    proc.hasTopMostHook && /* @__PURE__ */ jsxDEV("span", { className: "px-1.5 py-0.2 rounded bg-red-950 border border-red-800 text-[9px] text-red-300 font-bold", children: "HWND_TOPMOST" }, void 0, false, {
                      fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                      lineNumber: 261,
                      columnNumber: 29
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                    lineNumber: 255,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] text-slate-400 mt-0.5", children: [
                    "Tytuł okna: ",
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-200", children: proc.windowTitle }, void 0, false, {
                      fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                      lineNumber: 267,
                      columnNumber: 39
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                    lineNumber: 266,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                  lineNumber: 254,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                lineNumber: 246,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 self-end md:self-auto", children: [
                /* @__PURE__ */ jsxDEV("span", { className: `px-2.5 py-1 rounded-full text-[10px] font-bold border ${isFrozen ? "bg-emerald-950 text-emerald-300 border-emerald-500" : "bg-red-950 text-red-300 border-red-600"}`, children: isFrozen ? "ZAMROŻONY W RAM (0 ms)" : "AKTYWNY (ZAGROŻENIE)" }, void 0, false, {
                  fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                  lineNumber: 273,
                  columnNumber: 23
                }, this),
                isFrozen ? /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => freezeAllPluginManager.resumeSinglePid(proc.pid),
                    className: "px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer",
                    children: "Wznów PID"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                    lineNumber: 282,
                    columnNumber: 25
                  },
                  this
                ) : /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => freezeAllPluginManager.freezeSinglePid(proc.pid),
                    className: "px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-colors cursor-pointer shadow-md shadow-cyan-950",
                    children: "❄️ Zamroź PID (0 ms)"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                    lineNumber: 289,
                    columnNumber: 25
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                lineNumber: 272,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
              lineNumber: 245,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "mt-3 space-y-1.5 text-[11px]", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "text-slate-400", children: [
                "Ścieżka pliku: ",
                /* @__PURE__ */ jsxDEV("code", { className: "text-yellow-300 bg-slate-950 px-1.5 py-0.5 rounded", children: proc.executablePath }, void 0, false, {
                  fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                  lineNumber: 302,
                  columnNumber: 38
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                lineNumber: 301,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Dopasowane słowa kluczowe:" }, void 0, false, {
                  fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                  lineNumber: 306,
                  columnNumber: 23
                }, this),
                proc.matchedKeywords.map((kw) => /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.2 rounded bg-cyan-950 border border-cyan-600 text-cyan-300 text-[10px] font-bold", children: kw }, kw, false, {
                  fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                  lineNumber: 308,
                  columnNumber: 25
                }, this))
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                lineNumber: 305,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Wykryte biblioteki DLL:" }, void 0, false, {
                  fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                  lineNumber: 315,
                  columnNumber: 23
                }, this),
                proc.detectedModules.map((mod) => /* @__PURE__ */ jsxDEV("span", { className: "px-1.5 py-0.2 rounded bg-slate-950 border border-slate-800 text-purple-300 text-[10px]", children: mod }, mod, false, {
                  fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                  lineNumber: 317,
                  columnNumber: 25
                }, this))
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                lineNumber: 314,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
              lineNumber: 300,
              columnNumber: 19
            }, this)
          ]
        },
        proc.pid,
        true,
        {
          fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
          lineNumber: 237,
          columnNumber: 17
        },
        this
      );
    }) }, void 0, false, {
      fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
      lineNumber: 232,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
      lineNumber: 231,
      columnNumber: 9
    }, this),
    selectedTab === "PYTHON_CODE" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 text-white font-bold text-sm", children: [
            /* @__PURE__ */ jsxDEV(Terminal, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
              fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
              lineNumber: 336,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "freeze_all_overlay_bitsdojo.py" }, void 0, false, {
              fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
              lineNumber: 337,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
            lineNumber: 335,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 mt-0.5", children: [
            "Autonomiczny skrypt Pythona (100% offline, brak zewnętrznych zależności pip - tylko biblioteki standardowe ",
            /* @__PURE__ */ jsxDEV("code", { className: "text-cyan-300", children: "ctypes" }, void 0, false, {
              fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
              lineNumber: 340,
              columnNumber: 124
            }, this),
            ")."
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
            lineNumber: 339,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
          lineNumber: 334,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleCopyCode(generatedPythonCode, "py_code"),
              className: "px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer",
              children: copiedKey === "py_code" ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
                /* @__PURE__ */ jsxDEV(Check, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                  lineNumber: 351,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Skopiowano!" }, void 0, false, {
                  fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                  lineNumber: 352,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                lineNumber: 350,
                columnNumber: 19
              }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
                /* @__PURE__ */ jsxDEV(Copy, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                  lineNumber: 356,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Kopiuj Kod" }, void 0, false, {
                  fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                  lineNumber: 357,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                lineNumber: 355,
                columnNumber: 19
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
              lineNumber: 345,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleDownloadPythonScript,
              className: "px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-lg shadow-cyan-950 cursor-pointer",
              children: [
                /* @__PURE__ */ jsxDEV(Download, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                  lineNumber: 366,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Pobierz .py (Offline)" }, void 0, false, {
                  fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
                  lineNumber: 367,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
              lineNumber: 362,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
          lineNumber: 344,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
        lineNumber: 333,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(
        CodeBlock,
        {
          code: generatedPythonCode,
          language: "python",
          filename: "freeze_all_overlay_bitsdojo.py"
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
          lineNumber: 372,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
      lineNumber: 332,
      columnNumber: 9
    }, this),
    selectedTab === "POWERSHELL" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-3", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-white text-sm flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(Zap, { className: "w-4 h-4 text-yellow-300" }, void 0, false, {
            fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
            lineNumber: 386,
            columnNumber: 17
          }, this),
          "PowerShell 1-Liner (Ekspresowe Zamrożenie bez Plików)"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
          lineNumber: 385,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => handleCopyCode(powerShell1Liner, "ps_1liner"),
            className: "px-3 py-1 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-600 text-cyan-200 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer",
            children: copiedKey === "ps_1liner" ? "Skopiowano!" : "Kopiuj 1-Liner"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
            lineNumber: 389,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
        lineNumber: 384,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("pre", { className: "p-3.5 rounded-lg bg-black text-cyan-300 font-mono text-xs overflow-x-auto border border-cyan-900/50 select-all whitespace-pre-wrap break-all", children: powerShell1Liner }, void 0, false, {
        fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
        lineNumber: 397,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400", children: [
        "💡 ",
        /* @__PURE__ */ jsxDEV("strong", { children: "Instrukcja:" }, void 0, false, {
          fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
          lineNumber: 402,
          columnNumber: 18
        }, this),
        " Wklej to polecenie bezpośrednio do konsoli PowerShell uruchomionej jako Administrator. Zamraża ono procesy natychmiastowo poprzez interfejs P/Invoke ",
        /* @__PURE__ */ jsxDEV("code", { className: "text-cyan-300", children: "ntdll.dll!NtSuspendProcess" }, void 0, false, {
          fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
          lineNumber: 402,
          columnNumber: 196
        }, this),
        "."
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
        lineNumber: 401,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
      lineNumber: 383,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
      lineNumber: 382,
      columnNumber: 9
    }, this),
    selectedTab === "DOCS" && /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/90 p-5 rounded-xl border border-slate-800 space-y-4 text-xs font-mono text-slate-300 leading-relaxed", children: [
      /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-bold text-white flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-5 h-5 text-cyan-400" }, void 0, false, {
          fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
          lineNumber: 412,
          columnNumber: 13
        }, this),
        "Zasada Działania Unieruchomienia w RAM (NtSuspendProcess)"
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
        lineNumber: 411,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-400 font-bold block", children: "1. Skanowanie Ścieżek & DLL" }, void 0, false, {
            fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
            lineNumber: 418,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400", children: [
            "Wyszukiwanie bibliotek ",
            /* @__PURE__ */ jsxDEV("code", { className: "text-yellow-300", children: "bitsdojo_window" }, void 0, false, {
              fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
              lineNumber: 420,
              columnNumber: 40
            }, this),
            ", ",
            /* @__PURE__ */ jsxDEV("code", { className: "text-yellow-300", children: "window_manager" }, void 0, false, {
              fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
              lineNumber: 420,
              columnNumber: 98
            }, this),
            " oraz ",
            /* @__PURE__ */ jsxDEV("code", { className: "text-yellow-300", children: "overlay" }, void 0, false, {
              fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
              lineNumber: 420,
              columnNumber: 159
            }, this),
            " w przestrzeni adresowej procesu."
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
            lineNumber: 419,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
          lineNumber: 417,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-400 font-bold block", children: "2. Uchwyt PROCESS_SUSPEND_RESUME" }, void 0, false, {
            fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
            lineNumber: 425,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400", children: [
            "Otwarcie procesu z flagą ",
            /* @__PURE__ */ jsxDEV("code", { className: "text-yellow-300", children: "0x0800" }, void 0, false, {
              fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
              lineNumber: 427,
              columnNumber: 42
            }, this),
            ", co pozwala na zawieszenie wątków bez ubijania procesu."
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
            lineNumber: 426,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
          lineNumber: 424,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-400 font-bold block", children: "3. Zamrożenie 0 ms w Kernelu" }, void 0, false, {
            fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
            lineNumber: 432,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400", children: [
            "Wywołanie nieudokumentowanej funkcji ",
            /* @__PURE__ */ jsxDEV("code", { className: "text-yellow-300", children: "NtSuspendProcess" }, void 0, false, {
              fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
              lineNumber: 434,
              columnNumber: 54
            }, this),
            " natychmiast zatrzymuje planowanie wątków przez scheduler Windows."
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
            lineNumber: 433,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
          lineNumber: 431,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
        lineNumber: 416,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
      lineNumber: 410,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/FreezeAllPluginModule.tsx",
    lineNumber: 77,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkZyZWV6ZUFsbFBsdWdpbk1vZHVsZS50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBtb3Rpb24sIEFuaW1hdGVQcmVzZW5jZSB9IGZyb20gJ2ZyYW1lci1tb3Rpb24nO1xuaW1wb3J0IHsgXG4gIFphcCwgU2hpZWxkLCBTaGllbGRBbGVydCwgU2hpZWxkQ2hlY2ssIExvY2ssIFVubG9jaywgUGxheSwgUmVmcmVzaEN3LFxuICBDcHUsIFRlcm1pbmFsLCBEb3dubG9hZCwgQ29weSwgQ2hlY2ssIEZpbHRlciwgTGF5ZXJzLCBBbGVydE9jdGFnb24sXG4gIEV5ZSwgQ2hlY2tDaXJjbGUyLCBTbGlkZXJzLCBFeHRlcm5hbExpbmssIFNwYXJrbGVzLCBIYXJkRHJpdmUsIFNrdWxsXG59IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBcbiAgZnJlZXplQWxsUGx1Z2luTWFuYWdlciwgZ2VuZXJhdGVGcmVlemVBbGxQeXRob25TY3JpcHQsIFxuICBTY2FubmVkT3ZlcmxheVByb2Nlc3MsIEZyZWV6ZUFsbFBsdWdpbkNvbmZpZyBcbn0gZnJvbSAnLi4vdXRpbHMvZnJlZXplQWxsUGx1Z2luRW5naW5lJztcbmltcG9ydCB7IENvZGVCbG9jayB9IGZyb20gJy4vQ29kZUJsb2NrJztcbmltcG9ydCB7IGRvd25sb2FkRmlsZSB9IGZyb20gJy4uL3V0aWxzL29mZmxpbmVQYWNrYWdlRXhwb3J0ZXInO1xuXG5leHBvcnQgY29uc3QgRnJlZXplQWxsUGx1Z2luTW9kdWxlOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgY29uc3QgW3Byb2Nlc3Nlcywgc2V0UHJvY2Vzc2VzXSA9IHVzZVN0YXRlPFNjYW5uZWRPdmVybGF5UHJvY2Vzc1tdPigoKSA9PiBmcmVlemVBbGxQbHVnaW5NYW5hZ2VyLmdldFByb2Nlc3NlcygpKTtcbiAgY29uc3QgW2NvbmZpZywgc2V0Q29uZmlnXSA9IHVzZVN0YXRlPEZyZWV6ZUFsbFBsdWdpbkNvbmZpZz4oKCkgPT4gZnJlZXplQWxsUGx1Z2luTWFuYWdlci5nZXRDb25maWcoKSk7XG4gIGNvbnN0IFtpc1NjYW5uaW5nLCBzZXRJc1NjYW5uaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2lzRnJlZXppbmdBbGwsIHNldElzRnJlZXppbmdBbGxdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2VsZWN0ZWRUYWIsIHNldFNlbGVjdGVkVGFiXSA9IHVzZVN0YXRlPCdQUk9DRVNTRVMnIHwgJ1BZVEhPTl9DT0RFJyB8ICdQT1dFUlNIRUxMJyB8ICdET0NTJz4oJ1BST0NFU1NFUycpO1xuICBjb25zdCBbY29waWVkS2V5LCBzZXRDb3BpZWRLZXldID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtzdGF0dXNNZXNzYWdlLCBzZXRTdGF0dXNNZXNzYWdlXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgdW5zdWIgPSBmcmVlemVBbGxQbHVnaW5NYW5hZ2VyLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBzZXRQcm9jZXNzZXMoZnJlZXplQWxsUGx1Z2luTWFuYWdlci5nZXRQcm9jZXNzZXMoKSk7XG4gICAgICBzZXRDb25maWcoZnJlZXplQWxsUGx1Z2luTWFuYWdlci5nZXRDb25maWcoKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuICgpID0+IHVuc3ViKCk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBnZW5lcmF0ZWRQeXRob25Db2RlID0gZ2VuZXJhdGVGcmVlemVBbGxQeXRob25TY3JpcHQocHJvY2Vzc2VzLCBjb25maWcpO1xuXG4gIGNvbnN0IHBvd2VyU2hlbGwxTGluZXIgPSBgcG93ZXJzaGVsbCAtbm9wIC1jIFwiJG49QWRkLVR5cGUgLU1lbWJlckRlZmluaXRpb24gJ1tEbGxJbXBvcnQoXFxcXFwibnRkbGwuZGxsXFxcXFwiKV1wdWJsaWMgc3RhdGljIGV4dGVybiBpbnQgTnRTdXNwZW5kUHJvY2VzcyhJbnRQdHIgaCk7JyAtTmFtZSAnTicgLU5hbWVzcGFjZSAnUycgLVBhc3NUaHJ1O0dldC1Qcm9jZXNzfD97JF8uUGF0aCAtbWF0Y2ggJyg/aSlvdmVybGF5fHdpbmRvd19tYW5hZ2VyfGJpdHNkb2pvJyAtb3IgJF8uTW9kdWxlcy5Nb2R1bGVOYW1lIC1tYXRjaCAnKD9pKW92ZXJsYXl8d2luZG93X21hbmFnZXJ8Yml0c2Rvam8nfXwleyRuOjpOdFN1c3BlbmRQcm9jZXNzKCRfLkhhbmRsZSk7V3JpdGUtSG9zdCBcXFxcXCJGcm96ZW4gUElEOiAkKCRfLklkKVxcXFxcIiAtRiBDeWFufVwiYDtcblxuICBjb25zdCBoYW5kbGVTY2FuTm93ID0gKCkgPT4ge1xuICAgIHNldElzU2Nhbm5pbmcodHJ1ZSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb25zdCB1cGRhdGVkID0gZnJlZXplQWxsUGx1Z2luTWFuYWdlci5zY2FuTm93KCk7XG4gICAgICBzZXRJc1NjYW5uaW5nKGZhbHNlKTtcbiAgICAgIHNldFN0YXR1c01lc3NhZ2UoYFByemVza2Fub3dhbm8gcGFtacSZxIcgUkFNOiB6aWRlbnR5Zmlrb3dhbm8gJHt1cGRhdGVkLmxlbmd0aH0gcHJvY2Vzw7N3IHplIHPFgm93YW1pICdvdmVybGF5JywgJ3dpbmRvd19tYW5hZ2VyJyBsdWIgJ2JpdHNkb2pvJy5gKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0U3RhdHVzTWVzc2FnZShudWxsKSwgNTAwMCk7XG4gICAgfSwgNjAwKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVGcmVlemVBbGwgPSAoKSA9PiB7XG4gICAgc2V0SXNGcmVlemluZ0FsbCh0cnVlKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbnN0IGNvdW50ID0gZnJlZXplQWxsUGx1Z2luTWFuYWdlci5mcmVlemVBbGwoKTtcbiAgICAgIHNldElzRnJlZXppbmdBbGwoZmFsc2UpO1xuICAgICAgc2V0U3RhdHVzTWVzc2FnZShg4p2E77iPIFtOdFN1c3BlbmRQcm9jZXNzXSBQb215xZtsbmllIHphbXJvxbxvbm8gJHtjb3VudH0gcHJvY2Vzw7N3IHcgcGFtacSZY2kgUkFNIHcgY3phc2llIDAgbXMhYCk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHNldFN0YXR1c01lc3NhZ2UobnVsbCksIDYwMDApO1xuICAgIH0sIDcwMCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUmVzdW1lQWxsID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvdW50ID0gZnJlZXplQWxsUGx1Z2luTWFuYWdlci5yZXN1bWVBbGwoKTtcbiAgICBzZXRTdGF0dXNNZXNzYWdlKGDilrbvuI8gW050UmVzdW1lUHJvY2Vzc10gV3pub3dpb25vIHd5a29ueXdhbmllICR7Y291bnR9IHByb2Nlc8Ozdy5gKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHNldFN0YXR1c01lc3NhZ2UobnVsbCksIDQwMDApO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZURvd25sb2FkUHl0aG9uU2NyaXB0ID0gKCkgPT4ge1xuICAgIGRvd25sb2FkRmlsZShnZW5lcmF0ZWRQeXRob25Db2RlLCAnZnJlZXplX2FsbF9vdmVybGF5X2JpdHNkb2pvLnB5JywgJ3RleHQveC1weXRob24nKTtcbiAgICBzZXRTdGF0dXNNZXNzYWdlKCfwn5K+IFd5ZWtzcG9ydG93YW5vIHNrcnlwdCBmcmVlemVfYWxsX292ZXJsYXlfYml0c2Rvam8ucHkgKDEwMCUgT0ZGTElORSkuJyk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXRTdGF0dXNNZXNzYWdlKG51bGwpLCA0MDAwKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVDb3B5Q29kZSA9IChjb2RlOiBzdHJpbmcsIGtleTogc3RyaW5nKSA9PiB7XG4gICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQoY29kZSk7XG4gICAgc2V0Q29waWVkS2V5KGtleSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXRDb3BpZWRLZXkobnVsbCksIDI1MDApO1xuICB9O1xuXG4gIGNvbnN0IGZyb3plbkNvdW50ID0gcHJvY2Vzc2VzLmZpbHRlcihwID0+IHAuc3RhdHVzID09PSAnRlJPWkVOX0lOX1JBTScpLmxlbmd0aDtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS02IGZvbnQtc2Fuc1wiPlxuICAgICAgey8qIEhlYWRlciBCYW5uZXIgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNiByb3VuZGVkLTJ4bCBiZy1ncmFkaWVudC10by1yIGZyb20tc2xhdGUtOTUwIHZpYS1jeWFuLTk1MC84MCB0by1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1jeWFuLTgwMC82MCBzaGFkb3ctMnhsIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgbGc6ZmxleC1yb3cgaXRlbXMtc3RhcnQgbGc6aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNCByZWxhdGl2ZSB6LTEwXCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0zXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInAtMi41IHJvdW5kZWQteGwgYmctY3lhbi02MDAvMjAgYm9yZGVyIGJvcmRlci1jeWFuLTUwMC81MCB0ZXh0LWN5YW4tMzAwIHNoYWRvdy1sZyBzaGFkb3ctY3lhbi05NTBcIj5cbiAgICAgICAgICAgICAgICA8WmFwIGNsYXNzTmFtZT1cInctNiBoLTYgYW5pbWF0ZS1wdWxzZSB0ZXh0LWN5YW4tNDAwXCIgLz5cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgZmxleC13cmFwXCI+XG4gICAgICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC14bCBzbTp0ZXh0LTJ4bCBmb250LWJsYWNrIHRleHQtd2hpdGUgdHJhY2tpbmctdGlnaHQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+TW9kdcWCIFd0eWN6a2kgJ0ZyZWV6ZS1BbGwnIChPdmVybGF5ICYgQml0c0Rvam8gSW1tb2JpbGl6ZXIpPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIuNSBweS0wLjUgcm91bmRlZC1mdWxsIGJnLWN5YW4tOTUwIHRleHQtY3lhbi0zMDAgYm9yZGVyIGJvcmRlci1jeWFuLTYwMCB0ZXh0LXhzIGZvbnQtbW9ubyBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgTnRTdXNwZW5kUHJvY2VzcyAwIG1zXG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LWN5YW4tNDAwIG10LTAuNVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0yIGgtMiByb3VuZGVkLWZ1bGwgYmctY3lhbi00MDAgYW5pbWF0ZS1waW5nXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPkZJTFRSWTogJ292ZXJsYXknIOKAoiAnd2luZG93X21hbmFnZXInIOKAoiAnYml0c2Rvam8nIHwgQkVaUE/FmlJFRE5JRSBXWVdPxYFBTklFIE5URExMPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyBzbTp0ZXh0LXNtIHRleHQtc2xhdGUtMzAwIG10LTIgbWF4LXctM3hsXCI+XG4gICAgICAgICAgICAgIEF1dG9ub21pY3pueSBtb2R1xYIgd3R5Y3praSBza2FudWrEhWN5IHBhbWnEmcSHIHByb2Nlc3UgaSB6YcWCYWRvd2FuZSBtb2R1xYJ5IERMTCBwb2Qga8SFdGVtIGFncmVzeXdueWNoIGJpYmxpb3RlayBva2llbmtvd3ljaC4gR2VuZXJ1amUgaSB1cnVjaGFtaWEgem9wdHltYWxpem93YW55IHNrcnlwdCBQeXRob25hIHd5d2/FgnVqxIVjeSA8Y29kZSBjbGFzc05hbWU9XCJ0ZXh0LWN5YW4tMzAwIGZvbnQtbW9ub1wiPm50ZGxsLmRsbCFOdFN1c3BlbmRQcm9jZXNzPC9jb2RlPiBkbGEga2HFvGRlZ28gd3lrcnl0ZWdvIFBJRC11LlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIEFjdGlvbiBUb29sYmFyICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgZmxleC13cmFwXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVNjYW5Ob3d9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtpc1NjYW5uaW5nfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTIuNSByb3VuZGVkLXhsIGJnLXNsYXRlLTkwMCBob3ZlcjpiZy1zbGF0ZS04MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0yMDAgdGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFJlZnJlc2hDdyBjbGFzc05hbWU9e2B3LTQgaC00IHRleHQtY3lhbi00MDAgJHtpc1NjYW5uaW5nID8gJ2FuaW1hdGUtc3BpbicgOiAnJ31gfSAvPlxuICAgICAgICAgICAgICA8c3Bhbj57aXNTY2FubmluZyA/ICdTa2Fub3dhbmllLi4uJyA6ICdTa2FudWogUHJvY2VzeSd9PC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlRnJlZXplQWxsfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17aXNGcmVlemluZ0FsbH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNSBweS0yLjUgcm91bmRlZC14bCB0ZXh0LXhzIHNtOnRleHQtc20gZm9udC1ib2xkIGZvbnQtbW9ubyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBzaGFkb3ctbGcgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgYmctZ3JhZGllbnQtdG8tciBmcm9tLWN5YW4tNjAwIHZpYS10ZWFsLTYwMCB0by1lbWVyYWxkLTYwMCBob3Zlcjpmcm9tLWN5YW4tNTAwIGhvdmVyOnRvLWVtZXJhbGQtNTAwIHRleHQtd2hpdGUgc2hhZG93LWN5YW4tOTUwLzYwIGJvcmRlciBib3JkZXItY3lhbi00MDAvNDBcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8TG9jayBjbGFzc05hbWU9e2B3LTQgaC00ICR7aXNGcmVlemluZ0FsbCA/ICdhbmltYXRlLXNwaW4nIDogJ2FuaW1hdGUtYm91bmNlJ31gfSAvPlxuICAgICAgICAgICAgICA8c3Bhbj57aXNGcmVlemluZ0FsbCA/ICdaYW1yYcW8YW5pZSB3IFJBTS4uLicgOiAn4p2E77iPIFVydWNob20gRnJlZXplLUFsbCAoMCBtcyknfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVJlc3VtZUFsbH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0yLjUgcm91bmRlZC14bCBiZy1zbGF0ZS05MDAgaG92ZXI6Ymctc2xhdGUtODAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHRleHQtc2xhdGUtMzAwIGhvdmVyOnRleHQtd2hpdGUgdHJhbnNpdGlvbi1jb2xvcnMgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICB0aXRsZT1cIld6bsOzdyB3eWtvbnl3YW5pZSBwcm9jZXPDs3cgKE50UmVzdW1lUHJvY2VzcylcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8UGxheSBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBMaXZlIE5vdGlmaWNhdGlvbiBCYXIgKi99XG4gICAgICAgIDxBbmltYXRlUHJlc2VuY2U+XG4gICAgICAgICAge3N0YXR1c01lc3NhZ2UgJiYgKFxuICAgICAgICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgICAgICAgaW5pdGlhbD17eyBvcGFjaXR5OiAwLCB5OiAtMTAgfX1cbiAgICAgICAgICAgICAgYW5pbWF0ZT17eyBvcGFjaXR5OiAxLCB5OiAwIH19XG4gICAgICAgICAgICAgIGV4aXQ9e3sgb3BhY2l0eTogMCB9fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtdC00IHAtMi41IHJvdW5kZWQteGwgYmctY3lhbi05NTAvOTAgYm9yZGVyIGJvcmRlci1jeWFuLTQwMCB0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LWN5YW4tMjAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yXCI+XG4gICAgICAgICAgICAgICAgPENoZWNrQ2lyY2xlMiBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPntzdGF0dXNNZXNzYWdlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtY3lhbi00MDAgZm9udC1ib2xkXCI+MTAwJSBCRVpQSUVDWk5FPC9zcGFuPlxuICAgICAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQW5pbWF0ZVByZXNlbmNlPlxuXG4gICAgICAgIHsvKiBRdWljayBNZXRyaWNzIEJhciAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC01IGdyaWQgZ3JpZC1jb2xzLTIgc206Z3JpZC1jb2xzLTQgZ2FwLTMgcHQtNCBib3JkZXItdCBib3JkZXItc2xhdGUtODAwLzgwIHRleHQteHMgZm9udC1tb25vXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05NTAvOTAgcC0yLjUgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgdGV4dC1bMTBweF0gdXBwZXJjYXNlIGJsb2NrXCI+V3lrcnl0ZSBaYWdyb8W8ZW5pYTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJsYWNrIHRleHQtY3lhbi00MDBcIj57cHJvY2Vzc2VzLmxlbmd0aH0gcHJvY2VzeTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTUwLzkwIHAtMi41IHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIHRleHQtWzEwcHhdIHVwcGVyY2FzZSBibG9ja1wiPlN0YW4gWmFtcm/FvGVuaWEgdyBSQU08L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWJhc2UgZm9udC1ibGFjayB0ZXh0LWVtZXJhbGQtNDAwXCI+e2Zyb3plbkNvdW50fS97cHJvY2Vzc2VzLmxlbmd0aH0gemFtcm/FvG9ueWNoPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05NTAvOTAgcC0yLjUgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgdGV4dC1bMTBweF0gdXBwZXJjYXNlIGJsb2NrXCI+U8WCb3dhIEtsdWN6b3dlIEZpbHRyYTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQteWVsbG93LTMwMFwiPm92ZXJsYXksIHdpbmRvd19tYW5hZ2VyLCBiaXRzZG9qbzwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTUwLzkwIHAtMi41IHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIHRleHQtWzEwcHhdIHVwcGVyY2FzZSBibG9ja1wiPkZ1bmtjamEgSsSFZHJhIFdpbjMyPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC1wdXJwbGUtMzAwXCI+bnRkbGwhTnRTdXNwZW5kUHJvY2Vzczwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIFRhYnMgTmF2aWdhdGlvbiAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAgcGItMiB0ZXh0LXhzIGZvbnQtbW9ubyBmbGV4LXdyYXAgZ2FwLXktMlwiPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2VsZWN0ZWRUYWIoJ1BST0NFU1NFUycpfVxuICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTQgcHktMiByb3VuZGVkLXhsIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0cmFuc2l0aW9uLWNvbG9ycyBjdXJzb3ItcG9pbnRlciAke1xuICAgICAgICAgICAgc2VsZWN0ZWRUYWIgPT09ICdQUk9DRVNTRVMnXG4gICAgICAgICAgICAgID8gJ2JnLWN5YW4tNjAwIHRleHQtd2hpdGUgc2hhZG93LWxnIHNoYWRvdy1jeWFuLTk1MCdcbiAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTAwIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgfWB9XG4gICAgICAgID5cbiAgICAgICAgICA8Q3B1IGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgIDxzcGFuPld5a3J5dGUgUHJvY2VzeSAoe3Byb2Nlc3Nlcy5sZW5ndGh9KTwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNlbGVjdGVkVGFiKCdQWVRIT05fQ09ERScpfVxuICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTQgcHktMiByb3VuZGVkLXhsIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0cmFuc2l0aW9uLWNvbG9ycyBjdXJzb3ItcG9pbnRlciAke1xuICAgICAgICAgICAgc2VsZWN0ZWRUYWIgPT09ICdQWVRIT05fQ09ERSdcbiAgICAgICAgICAgICAgPyAnYmctY3lhbi02MDAgdGV4dC13aGl0ZSBzaGFkb3ctbGcgc2hhZG93LWN5YW4tOTUwJ1xuICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05MDAgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSdcbiAgICAgICAgICB9YH1cbiAgICAgICAgPlxuICAgICAgICAgIDxUZXJtaW5hbCBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICA8c3Bhbj5Ta3J5cHQgUHl0aG9uYSAoTnRTdXNwZW5kUHJvY2Vzcyk8L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTZWxlY3RlZFRhYignUE9XRVJTSEVMTCcpfVxuICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTQgcHktMiByb3VuZGVkLXhsIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0cmFuc2l0aW9uLWNvbG9ycyBjdXJzb3ItcG9pbnRlciAke1xuICAgICAgICAgICAgc2VsZWN0ZWRUYWIgPT09ICdQT1dFUlNIRUxMJ1xuICAgICAgICAgICAgICA/ICdiZy1jeWFuLTYwMCB0ZXh0LXdoaXRlIHNoYWRvdy1sZyBzaGFkb3ctY3lhbi05NTAnXG4gICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTkwMCB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlJ1xuICAgICAgICAgIH1gfVxuICAgICAgICA+XG4gICAgICAgICAgPFphcCBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICA8c3Bhbj5Qb3dlclNoZWxsIDEtTGluZXI8L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTZWxlY3RlZFRhYignRE9DUycpfVxuICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTQgcHktMiByb3VuZGVkLXhsIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0cmFuc2l0aW9uLWNvbG9ycyBjdXJzb3ItcG9pbnRlciAke1xuICAgICAgICAgICAgc2VsZWN0ZWRUYWIgPT09ICdET0NTJ1xuICAgICAgICAgICAgICA/ICdiZy1jeWFuLTYwMCB0ZXh0LXdoaXRlIHNoYWRvdy1sZyBzaGFkb3ctY3lhbi05NTAnXG4gICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTkwMCB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlJ1xuICAgICAgICAgIH1gfVxuICAgICAgICA+XG4gICAgICAgICAgPExheWVycyBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICA8c3Bhbj5BcmNoaXRla3R1cmEgVW5pZXJ1Y2hvbWllbmlhIFdpbjMyPC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogVEFCIENPTlRFTlQgMTogREVURUNURUQgUFJPQ0VTU0VTICovfVxuICAgICAge3NlbGVjdGVkVGFiID09PSAnUFJPQ0VTU0VTJyAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00IGZvbnQtbW9ubyB0ZXh0LXhzXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIGdhcC0zXCI+XG4gICAgICAgICAgICB7cHJvY2Vzc2VzLm1hcCgocHJvYykgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBpc0Zyb3plbiA9IHByb2Muc3RhdHVzID09PSAnRlJPWkVOX0lOX1JBTSc7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICBrZXk9e3Byb2MucGlkfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC00IHJvdW5kZWQteGwgYm9yZGVyIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICAgIGlzRnJvemVuXG4gICAgICAgICAgICAgICAgICAgICAgPyAnYmctZW1lcmFsZC05NTAvNDAgYm9yZGVyLWVtZXJhbGQtNTAwLzcwIHNoYWRvdy1sZyBzaGFkb3ctZW1lcmFsZC05NTAvMjAnXG4gICAgICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTAwLzkwIGJvcmRlci1jeWFuLTkwMC82MCBob3Zlcjpib3JkZXItY3lhbi01MDAvNjAnXG4gICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgbWQ6ZmxleC1yb3cgaXRlbXMtc3RhcnQgbWQ6aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMyBwYi0yIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAvODBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTIuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHAtMiByb3VuZGVkLWxnIGJvcmRlciAke1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNGcm96ZW4gXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWVtZXJhbGQtOTAwLzgwIGJvcmRlci1lbWVyYWxkLTQwMCB0ZXh0LWVtZXJhbGQtMjAwJyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctcmVkLTkwMC82MCBib3JkZXItcmVkLTUwMCB0ZXh0LXJlZC0yMDAgYW5pbWF0ZS1wdWxzZSdcbiAgICAgICAgICAgICAgICAgICAgICB9YH0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7aXNGcm96ZW4gPyA8TG9jayBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtZW1lcmFsZC0zMDBcIiAvPiA6IDxBbGVydE9jdGFnb24gY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXJlZC0zMDBcIiAvPn1cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtd2hpdGUgdGV4dC1zbVwiPntwcm9jLm5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0yIHB5LTAuMiByb3VuZGVkIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCB0ZXh0LXNsYXRlLTMwMCB0ZXh0LVsxMHB4XVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBJRDogPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LXllbGxvdy0zMDBcIj57cHJvYy5waWR9PC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge3Byb2MuaGFzVG9wTW9zdEhvb2sgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTEuNSBweS0wLjIgcm91bmRlZCBiZy1yZWQtOTUwIGJvcmRlciBib3JkZXItcmVkLTgwMCB0ZXh0LVs5cHhdIHRleHQtcmVkLTMwMCBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhXTkRfVE9QTU9TVFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMCBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgVHl0dcWCIG9rbmE6IDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMjAwXCI+e3Byb2Mud2luZG93VGl0bGV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgc2VsZi1lbmQgbWQ6c2VsZi1hdXRvXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgcHgtMi41IHB5LTEgcm91bmRlZC1mdWxsIHRleHQtWzEwcHhdIGZvbnQtYm9sZCBib3JkZXIgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzRnJvemVuXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWVtZXJhbGQtOTUwIHRleHQtZW1lcmFsZC0zMDAgYm9yZGVyLWVtZXJhbGQtNTAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1yZWQtOTUwIHRleHQtcmVkLTMwMCBib3JkZXItcmVkLTYwMCdcbiAgICAgICAgICAgICAgICAgICAgICB9YH0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7aXNGcm96ZW4gPyAnWkFNUk/Fu09OWSBXIFJBTSAoMCBtcyknIDogJ0FLVFlXTlkgKFpBR1JPxbtFTklFKSd9XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuXG4gICAgICAgICAgICAgICAgICAgICAge2lzRnJvemVuID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBmcmVlemVBbGxQbHVnaW5NYW5hZ2VyLnJlc3VtZVNpbmdsZVBpZChwcm9jLnBpZCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMgcHktMS41IHJvdW5kZWQtbGcgYmctc2xhdGUtODAwIGhvdmVyOmJnLXNsYXRlLTcwMCB0ZXh0LXNsYXRlLTIwMCB0ZXh0LXhzIGZvbnQtYm9sZCB0cmFuc2l0aW9uLWNvbG9ycyBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFd6bsOzdyBQSURcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGZyZWV6ZUFsbFBsdWdpbk1hbmFnZXIuZnJlZXplU2luZ2xlUGlkKHByb2MucGlkKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0xLjUgcm91bmRlZC1sZyBiZy1jeWFuLTYwMCBob3ZlcjpiZy1jeWFuLTUwMCB0ZXh0LXdoaXRlIHRleHQteHMgZm9udC1ib2xkIHRyYW5zaXRpb24tY29sb3JzIGN1cnNvci1wb2ludGVyIHNoYWRvdy1tZCBzaGFkb3ctY3lhbi05NTBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICDinYTvuI8gWmFtcm/FuiBQSUQgKDAgbXMpXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICB7LyogUGF0aCAmIEtleXdvcmRzICovfVxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0zIHNwYWNlLXktMS41IHRleHQtWzExcHhdXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICDFmmNpZcW8a2EgcGxpa3U6IDxjb2RlIGNsYXNzTmFtZT1cInRleHQteWVsbG93LTMwMCBiZy1zbGF0ZS05NTAgcHgtMS41IHB5LTAuNSByb3VuZGVkXCI+e3Byb2MuZXhlY3V0YWJsZVBhdGh9PC9jb2RlPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgZmxleC13cmFwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDBcIj5Eb3Bhc293YW5lIHPFgm93YSBrbHVjem93ZTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAge3Byb2MubWF0Y2hlZEtleXdvcmRzLm1hcCgoa3cpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGtleT17a3d9IGNsYXNzTmFtZT1cInB4LTIgcHktMC4yIHJvdW5kZWQgYmctY3lhbi05NTAgYm9yZGVyIGJvcmRlci1jeWFuLTYwMCB0ZXh0LWN5YW4tMzAwIHRleHQtWzEwcHhdIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7a3d9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBmbGV4LXdyYXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMFwiPld5a3J5dGUgYmlibGlvdGVraSBETEw6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIHtwcm9jLmRldGVjdGVkTW9kdWxlcy5tYXAoKG1vZCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4ga2V5PXttb2R9IGNsYXNzTmFtZT1cInB4LTEuNSBweS0wLjIgcm91bmRlZCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1wdXJwbGUtMzAwIHRleHQtWzEwcHhdXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHttb2R9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuXG4gICAgICB7LyogVEFCIENPTlRFTlQgMjogR0VORVJBVEVEIFBZVEhPTiBTQ1JJUFQgKi99XG4gICAgICB7c2VsZWN0ZWRUYWIgPT09ICdQWVRIT05fQ09ERScgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwLzkwIHAtNCByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtODAwIGZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgaXRlbXMtc3RhcnQgc206aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtM1wiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTIgdGV4dC13aGl0ZSBmb250LWJvbGQgdGV4dC1zbVwiPlxuICAgICAgICAgICAgICAgIDxUZXJtaW5hbCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtY3lhbi00MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPmZyZWV6ZV9hbGxfb3ZlcmxheV9iaXRzZG9qby5weTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDAgbXQtMC41XCI+XG4gICAgICAgICAgICAgICAgQXV0b25vbWljem55IHNrcnlwdCBQeXRob25hICgxMDAlIG9mZmxpbmUsIGJyYWsgemV3bsSZdHJ6bnljaCB6YWxlxbxub8WbY2kgcGlwIC0gdHlsa28gYmlibGlvdGVraSBzdGFuZGFyZG93ZSA8Y29kZSBjbGFzc05hbWU9XCJ0ZXh0LWN5YW4tMzAwXCI+Y3R5cGVzPC9jb2RlPikuXG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVDb3B5Q29kZShnZW5lcmF0ZWRQeXRob25Db2RlLCAncHlfY29kZScpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMuNSBweS0yIHJvdW5kZWQteGwgYmctc2xhdGUtODAwIGhvdmVyOmJnLXNsYXRlLTcwMCB0ZXh0LXNsYXRlLTIwMCB0ZXh0LXhzIGZvbnQtbW9ubyBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB0cmFuc2l0aW9uLWNvbG9ycyBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7Y29waWVkS2V5ID09PSAncHlfY29kZScgPyAoXG4gICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICA8Q2hlY2sgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1lbWVyYWxkLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlNrb3Bpb3dhbm8hPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIDxDb3B5IGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+S29waXVqIEtvZDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVEb3dubG9hZFB5dGhvblNjcmlwdH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTIgcm91bmRlZC14bCBiZy1ncmFkaWVudC10by1yIGZyb20tY3lhbi02MDAgdG8tdGVhbC02MDAgaG92ZXI6ZnJvbS1jeWFuLTUwMCBob3Zlcjp0by10ZWFsLTUwMCB0ZXh0LXdoaXRlIHRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHNoYWRvdy1sZyBzaGFkb3ctY3lhbi05NTAgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPERvd25sb2FkIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5Qb2JpZXJ6IC5weSAoT2ZmbGluZSk8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8Q29kZUJsb2NrXG4gICAgICAgICAgICBjb2RlPXtnZW5lcmF0ZWRQeXRob25Db2RlfVxuICAgICAgICAgICAgbGFuZ3VhZ2U9XCJweXRob25cIlxuICAgICAgICAgICAgZmlsZW5hbWU9XCJmcmVlemVfYWxsX292ZXJsYXlfYml0c2Rvam8ucHlcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cblxuICAgICAgey8qIFRBQiBDT05URU5UIDM6IFBPV0VSU0hFTEwgMS1MSU5FUiAqL31cbiAgICAgIHtzZWxlY3RlZFRhYiA9PT0gJ1BPV0VSU0hFTEwnICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTkwMC85MCBwLTQgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBzcGFjZS15LTNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LXdoaXRlIHRleHQtc20gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8WmFwIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC15ZWxsb3ctMzAwXCIgLz5cbiAgICAgICAgICAgICAgICBQb3dlclNoZWxsIDEtTGluZXIgKEVrc3ByZXNvd2UgWmFtcm/FvGVuaWUgYmV6IFBsaWvDs3cpXG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZUNvcHlDb2RlKHBvd2VyU2hlbGwxTGluZXIsICdwc18xbGluZXInKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zIHB5LTEgcm91bmRlZC1sZyBiZy1jeWFuLTk1MCBob3ZlcjpiZy1jeWFuLTkwMCBib3JkZXIgYm9yZGVyLWN5YW4tNjAwIHRleHQtY3lhbi0yMDAgdGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdHJhbnNpdGlvbi1jb2xvcnMgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2NvcGllZEtleSA9PT0gJ3BzXzFsaW5lcicgPyAnU2tvcGlvd2FubyEnIDogJ0tvcGl1aiAxLUxpbmVyJ31cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPHByZSBjbGFzc05hbWU9XCJwLTMuNSByb3VuZGVkLWxnIGJnLWJsYWNrIHRleHQtY3lhbi0zMDAgZm9udC1tb25vIHRleHQteHMgb3ZlcmZsb3cteC1hdXRvIGJvcmRlciBib3JkZXItY3lhbi05MDAvNTAgc2VsZWN0LWFsbCB3aGl0ZXNwYWNlLXByZS13cmFwIGJyZWFrLWFsbFwiPlxuICAgICAgICAgICAgICB7cG93ZXJTaGVsbDFMaW5lcn1cbiAgICAgICAgICAgIDwvcHJlPlxuXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICAgIPCfkqEgPHN0cm9uZz5JbnN0cnVrY2phOjwvc3Ryb25nPiBXa2xlaiB0byBwb2xlY2VuaWUgYmV6cG/Fm3JlZG5pbyBkbyBrb25zb2xpIFBvd2VyU2hlbGwgdXJ1Y2hvbWlvbmVqIGpha28gQWRtaW5pc3RyYXRvci4gWmFtcmHFvGEgb25vIHByb2Nlc3kgbmF0eWNobWlhc3Rvd28gcG9wcnpleiBpbnRlcmZlanMgUC9JbnZva2UgPGNvZGUgY2xhc3NOYW1lPVwidGV4dC1jeWFuLTMwMFwiPm50ZGxsLmRsbCFOdFN1c3BlbmRQcm9jZXNzPC9jb2RlPi5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuXG4gICAgICB7LyogVEFCIENPTlRFTlQgNDogQVJDSElURUNUVVJFICYgRE9DUyAqL31cbiAgICAgIHtzZWxlY3RlZFRhYiA9PT0gJ0RPQ1MnICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAvOTAgcC01IHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgc3BhY2UteS00IHRleHQteHMgZm9udC1tb25vIHRleHQtc2xhdGUtMzAwIGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWJhc2UgZm9udC1ib2xkIHRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgIDxTaGllbGRDaGVjayBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtY3lhbi00MDBcIiAvPlxuICAgICAgICAgICAgWmFzYWRhIER6aWHFgmFuaWEgVW5pZXJ1Y2hvbWllbmlhIHcgUkFNIChOdFN1c3BlbmRQcm9jZXNzKVxuICAgICAgICAgIDwvaDM+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTMgZ2FwLTNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zLjUgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgc3BhY2UteS0xXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtY3lhbi00MDAgZm9udC1ib2xkIGJsb2NrXCI+MS4gU2thbm93YW5pZSDFmmNpZcW8ZWsgJiBETEw8L3NwYW4+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICAgICAgV3lzenVraXdhbmllIGJpYmxpb3RlayA8Y29kZSBjbGFzc05hbWU9XCJ0ZXh0LXllbGxvdy0zMDBcIj5iaXRzZG9qb193aW5kb3c8L2NvZGU+LCA8Y29kZSBjbGFzc05hbWU9XCJ0ZXh0LXllbGxvdy0zMDBcIj53aW5kb3dfbWFuYWdlcjwvY29kZT4gb3JheiA8Y29kZSBjbGFzc05hbWU9XCJ0ZXh0LXllbGxvdy0zMDBcIj5vdmVybGF5PC9jb2RlPiB3IHByemVzdHJ6ZW5pIGFkcmVzb3dlaiBwcm9jZXN1LlxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMuNSByb3VuZGVkLXhsIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1jeWFuLTQwMCBmb250LWJvbGQgYmxvY2tcIj4yLiBVY2h3eXQgUFJPQ0VTU19TVVNQRU5EX1JFU1VNRTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgICBPdHdhcmNpZSBwcm9jZXN1IHogZmxhZ8SFIDxjb2RlIGNsYXNzTmFtZT1cInRleHQteWVsbG93LTMwMFwiPjB4MDgwMDwvY29kZT4sIGNvIHBvendhbGEgbmEgemF3aWVzemVuaWUgd8SFdGvDs3cgYmV6IHViaWphbmlhIHByb2Nlc3UuXG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMy41IHJvdW5kZWQteGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHNwYWNlLXktMVwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWN5YW4tNDAwIGZvbnQtYm9sZCBibG9ja1wiPjMuIFphbXJvxbxlbmllIDAgbXMgdyBLZXJuZWx1PC9zcGFuPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICAgIFd5d2/FgmFuaWUgbmlldWRva3VtZW50b3dhbmVqIGZ1bmtjamkgPGNvZGUgY2xhc3NOYW1lPVwidGV4dC15ZWxsb3ctMzAwXCI+TnRTdXNwZW5kUHJvY2VzczwvY29kZT4gbmF0eWNobWlhc3QgemF0cnp5bXVqZSBwbGFub3dhbmllIHfEhXRrw7N3IHByemV6IHNjaGVkdWxlciBXaW5kb3dzLlxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdLCJtYXBwaW5ncyI6IkFBbUZnQixTQTBRRSxVQTFR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