import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"];
import {
  Wrench,
  ShieldCheck,
  Activity,
  CheckCircle2,
  RefreshCw,
  Terminal,
  HeartPulse,
  Layers,
  Zap,
  Trash2,
  Check
} from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import { selfHealingEngine } from "/sentinel-shield/src/utils/selfRepairSystem.ts";
import { SentinelWatchdogBotPanel } from "/sentinel-shield/src/components/SentinelWatchdogBotPanel.tsx";
export const SelfHealingCenter = () => {
  const [report, setReport] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isRepairing, setIsRepairing] = useState(false);
  const [auditLogs, setAuditLogs] = useState([]);
  const [autoHealDaemon, setAutoHealDaemon] = useState(false);
  const fetchHealthReport = async () => {
    setIsScanning(true);
    try {
      const data = await selfHealingEngine.runComprehensiveDiagnostics();
      setReport(data);
      setAuditLogs(selfHealingEngine.getAuditLogs());
    } finally {
      setIsScanning(false);
    }
  };
  useEffect(() => {
    fetchHealthReport();
  }, []);
  const handleInstantRepair = async () => {
    setIsRepairing(true);
    try {
      const result = await selfHealingEngine.performFullSelfRepair();
      setReport(result.report);
      setAuditLogs(selfHealingEngine.getAuditLogs());
    } finally {
      setTimeout(() => {
        setIsRepairing(false);
      }, 500);
    }
  };
  const handleToggleDaemon = (enabled) => {
    setAutoHealDaemon(enabled);
    selfHealingEngine.toggleAutoHealingDaemon(enabled, (updatedReport) => {
      setReport(updatedReport);
      setAuditLogs(selfHealingEngine.getAuditLogs());
    });
  };
  const handleClearLogs = () => {
    selfHealingEngine.addAuditLog("WYCZYSZCZENIE HISTORII LOGÓW", "Audit Manager", "INFO", "Historia audytu zresetowana.");
    setAuditLogs(selfHealingEngine.getAuditLogs());
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6 font-sans", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "p-6 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-800/40 shadow-2xl relative overflow-hidden", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2.5", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "p-2 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-300", children: /* @__PURE__ */ jsxDEV(HeartPulse, { className: "w-5 h-5 animate-pulse text-emerald-400" }, void 0, false, {
              fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
              lineNumber: 68,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
              lineNumber: 67,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("h2", { className: "text-xl sm:text-2xl font-black text-white tracking-tight", children: "Centrum Autonaprawy & Pancerne Bariery Ochronne" }, void 0, false, {
              fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
              lineNumber: 70,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800", children: "Self-Healing Subsystem" }, void 0, false, {
              fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
              lineNumber: 73,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 66,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl", children: "Autonomiczny system monitorowania integralności, zabezpieczający wszystkie punkty wyjścia, naprawiający uszkodzone struktury danych, eliminujący wycieki pamięci i przywracający stabilność kodu w czasie rzeczywistym." }, void 0, false, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 77,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 65,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleInstantRepair,
              disabled: isRepairing,
              className: "px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-bold font-mono flex items-center gap-2 shadow-lg shadow-emerald-950/60 border border-emerald-400/30 transition-all cursor-pointer",
              children: [
                /* @__PURE__ */ jsxDEV(Wrench, { className: `w-4 h-4 ${isRepairing ? "animate-spin" : ""}` }, void 0, false, {
                  fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
                  lineNumber: 89,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: isRepairing ? "Trwa Naprawa Systemu..." : "Uruchom Pełną Autonaprawę" }, void 0, false, {
                  fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
                  lineNumber: 90,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
              lineNumber: 84,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: fetchHealthReport,
              disabled: isScanning,
              className: "p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer",
              title: "Odśwież diagnostykę",
              children: /* @__PURE__ */ jsxDEV(RefreshCw, { className: `w-4 h-4 ${isScanning ? "animate-spin text-emerald-400" : ""}` }, void 0, false, {
                fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
                lineNumber: 99,
                columnNumber: 15
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
              lineNumber: 93,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 83,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
        lineNumber: 64,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "mt-5 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 text-slate-300", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" }, void 0, false, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 107,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: [
            "Ciągły Demon Ochrony w Tle: ",
            /* @__PURE__ */ jsxDEV("strong", { children: autoHealDaemon ? "WŁĄCZONY (15s Audyt)" : "UŚPIONY (Na żądanie)" }, void 0, false, {
              fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
              lineNumber: 109,
              columnNumber: 43
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 108,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 106,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 font-mono", children: "Autonomiczna Samonaprawa w Tle:" }, void 0, false, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 114,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleToggleDaemon(!autoHealDaemon),
              className: `w-12 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${autoHealDaemon ? "bg-emerald-600" : "bg-slate-800"}`,
              children: /* @__PURE__ */ jsxDEV(
                "div",
                {
                  className: `w-5 h-5 rounded-full bg-white transition-transform transform shadow-md ${autoHealDaemon ? "translate-x-6" : "translate-x-0"}`
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
                  lineNumber: 121,
                  columnNumber: 15
                },
                this
              )
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
              lineNumber: 115,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 113,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
        lineNumber: 105,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
      lineNumber: 63,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(SentinelWatchdogBotPanel, {}, void 0, false, {
      fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
      lineNumber: 132,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] font-mono text-slate-400 uppercase", children: "Wskaźnik Zdrowia" }, void 0, false, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 139,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-2xl font-black text-emerald-400 mt-0.5", children: [
            report?.overallHealthScore ?? 100,
            "%"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 140,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400 mt-1", children: "Integralność kodu i pamięci" }, void 0, false, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 143,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 138,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-emerald-950/80 rounded-xl border border-emerald-800/60 text-emerald-400", children: /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-6 h-6" }, void 0, false, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 146,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 145,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
        lineNumber: 137,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-900/90 border border-cyan-800/60 flex items-center justify-between shadow-lg", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] font-mono text-cyan-400 uppercase font-bold flex items-center gap-1", children: [
            /* @__PURE__ */ jsxDEV(Zap, { className: "w-3 h-3 text-yellow-300" }, void 0, false, {
              fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
              lineNumber: 154,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Bariera Heksagonalna" }, void 0, false, {
              fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
              lineNumber: 155,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 153,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-2xl font-black text-cyan-300 mt-0.5", children: "100% (850 THz)" }, void 0, false, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 157,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400 mt-1", children: "Ochrona lądującego unitu" }, void 0, false, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 160,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 152,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-cyan-950/80 rounded-xl border border-cyan-700/60 text-cyan-300", children: /* @__PURE__ */ jsxDEV(Zap, { className: "w-6 h-6 animate-pulse" }, void 0, false, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 163,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 162,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
        lineNumber: 151,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] font-mono text-slate-400 uppercase", children: "Bariery Ochronne" }, void 0, false, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 170,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-2xl font-black text-purple-400 mt-0.5", children: report?.activeProtections.length ?? 6 }, void 0, false, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 171,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400 mt-1", children: "Aktywne tarcze sandboxing" }, void 0, false, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 174,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 169,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-purple-950/80 rounded-xl border border-purple-800/60 text-purple-400", children: /* @__PURE__ */ jsxDEV(Layers, { className: "w-6 h-6" }, void 0, false, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 177,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 176,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
        lineNumber: 168,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] font-mono text-slate-400 uppercase", children: "Wykonane Naprawy" }, void 0, false, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 184,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-2xl font-black text-teal-400 mt-0.5", children: report?.repairedIssuesCount ?? auditLogs.length }, void 0, false, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 185,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400 mt-1", children: "Zneutralizowanych anomalii" }, void 0, false, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 188,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 183,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-teal-950/80 rounded-xl border border-teal-800/60 text-teal-400", children: /* @__PURE__ */ jsxDEV(Wrench, { className: "w-6 h-6" }, void 0, false, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 191,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 190,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
        lineNumber: 182,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] font-mono text-slate-400 uppercase", children: "Status Watchdoga" }, void 0, false, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 198,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-lg font-bold text-white mt-0.5 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-emerald-400" }, void 0, false, {
              fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
              lineNumber: 200,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Online" }, void 0, false, {
              fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
              lineNumber: 201,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 199,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400 mt-1", children: [
            "Ostatni skan: ",
            report?.lastScanTimestamp || "Teraz"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 203,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 197,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-400", children: /* @__PURE__ */ jsxDEV(Activity, { className: "w-6 h-6 text-emerald-400" }, void 0, false, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 206,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 205,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
        lineNumber: 196,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
      lineNumber: 135,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-7 space-y-4", children: /* @__PURE__ */ jsxDEV("div", { className: "p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-3 border-b border-slate-800", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 text-white font-bold text-sm", children: [
            /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
              fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
              lineNumber: 218,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Audyt Podzespołów i Punktów Ryzyka" }, void 0, false, {
              fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
              lineNumber: 219,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 217,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono text-slate-400", children: "Wszystkie punkty zabezpieczone" }, void 0, false, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 221,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 216,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-2.5", children: report?.checks.map((check) => {
          const statusBadge = {
            HEALTHY: "bg-emerald-950 text-emerald-300 border-emerald-800",
            WARNING: "bg-amber-950 text-amber-300 border-amber-800",
            CORRUPTED: "bg-red-950 text-red-300 border-red-800",
            REPAIRED: "bg-teal-950 text-teal-300 border-teal-800"
          }[check.status];
          return /* @__PURE__ */ jsxDEV(
            "div",
            {
              className: "p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3",
              children: [
                /* @__PURE__ */ jsxDEV("div", { className: "space-y-0.5", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-white", children: check.name }, void 0, false, {
                      fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
                      lineNumber: 242,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] font-mono px-1.5 py-0.2 bg-slate-900 rounded text-slate-400 border border-slate-800", children: check.category }, void 0, false, {
                      fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
                      lineNumber: 243,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
                    lineNumber: 241,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-300", children: check.description }, void 0, false, {
                    fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
                    lineNumber: 247,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
                  lineNumber: 240,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: /* @__PURE__ */ jsxDEV("span", { className: `text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${statusBadge}`, children: check.status }, void 0, false, {
                  fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
                  lineNumber: 251,
                  columnNumber: 23
                }, this) }, void 0, false, {
                  fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
                  lineNumber: 250,
                  columnNumber: 21
                }, this)
              ]
            },
            check.id,
            true,
            {
              fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
              lineNumber: 236,
              columnNumber: 19
            },
            this
          );
        }) }, void 0, false, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 226,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "pt-3 border-t border-slate-800/80 space-y-2", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono text-purple-300 font-bold block", children: "Zainstalowane Tarcze Ochronne (Protective Barriers):" }, void 0, false, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 262,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300", children: report?.activeProtections.map((barrier, idx) => /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-lg bg-slate-950/80 border border-purple-950 flex items-center space-x-2", children: [
            /* @__PURE__ */ jsxDEV(Check, { className: "w-3.5 h-3.5 text-purple-400 shrink-0" }, void 0, false, {
              fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
              lineNumber: 268,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "truncate", children: barrier }, void 0, false, {
              fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
              lineNumber: 269,
              columnNumber: 21
            }, this)
          ] }, idx, true, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 267,
            columnNumber: 19
          }, this)) }, void 0, false, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 265,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 261,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
        lineNumber: 215,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
        lineNumber: 214,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-5 space-y-4", children: /* @__PURE__ */ jsxDEV("div", { className: "p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-3 border-b border-slate-800", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 text-white font-bold text-sm", children: [
            /* @__PURE__ */ jsxDEV(Terminal, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
              fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
              lineNumber: 282,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Dziennik Napraw i Audytu" }, void 0, false, {
              fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
              lineNumber: 283,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 281,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleClearLogs,
              className: "text-[11px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer",
              children: [
                /* @__PURE__ */ jsxDEV(Trash2, { className: "w-3 h-3" }, void 0, false, {
                  fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
                  lineNumber: 289,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Wyczyść" }, void 0, false, {
                  fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
                  lineNumber: 290,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
              lineNumber: 285,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 280,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 max-h-[460px] overflow-y-auto pr-1", children: [
          auditLogs.map((log) => /* @__PURE__ */ jsxDEV(
            "div",
            {
              className: "p-2.5 rounded-xl bg-black/80 border border-slate-800/80 font-mono text-xs space-y-1",
              children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-[10px]", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-purple-400 font-bold", children: log.component }, void 0, false, {
                    fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
                    lineNumber: 301,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: log.timestamp }, void 0, false, {
                    fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
                    lineNumber: 302,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
                  lineNumber: 300,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-slate-200 font-semibold text-[11px]", children: log.action }, void 0, false, {
                  fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
                  lineNumber: 304,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-slate-400 text-[10px] leading-relaxed", children: log.message }, void 0, false, {
                  fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
                  lineNumber: 305,
                  columnNumber: 19
                }, this)
              ]
            },
            log.id,
            true,
            {
              fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
              lineNumber: 296,
              columnNumber: 17
            },
            this
          )),
          auditLogs.length === 0 && /* @__PURE__ */ jsxDEV("div", { className: "p-6 text-center text-slate-500 text-xs", children: "Brak wpisów w dzienniku audytu." }, void 0, false, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 310,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 294,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
        lineNumber: 279,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
        lineNumber: 278,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
      lineNumber: 212,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
    lineNumber: 61,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlbGZIZWFsaW5nQ2VudGVyLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFxuICBXcmVuY2gsIFNoaWVsZENoZWNrLCBTaGllbGRBbGVydCwgQWN0aXZpdHksIENoZWNrQ2lyY2xlMiwgXG4gIEFsZXJ0VHJpYW5nbGUsIFJlZnJlc2hDdywgVGVybWluYWwsIEhlYXJ0UHVsc2UsIEhhcmREcml2ZSwgXG4gIENwdSwgTGF5ZXJzLCBTcGFya2xlcywgWmFwLCBUcmFzaDIsIENoZWNrLCBCb3Rcbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IHNlbGZIZWFsaW5nRW5naW5lIH0gZnJvbSAnLi4vdXRpbHMvc2VsZlJlcGFpclN5c3RlbSc7XG5pbXBvcnQgeyBTeXN0ZW1IZWFsdGhSZXBvcnQsIFJlcGFpckF1ZGl0TG9nIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgU2VudGluZWxXYXRjaGRvZ0JvdFBhbmVsIH0gZnJvbSAnLi9TZW50aW5lbFdhdGNoZG9nQm90UGFuZWwnO1xuXG5leHBvcnQgY29uc3QgU2VsZkhlYWxpbmdDZW50ZXI6IFJlYWN0LkZDID0gKCkgPT4ge1xuXG4gIGNvbnN0IFtyZXBvcnQsIHNldFJlcG9ydF0gPSB1c2VTdGF0ZTxTeXN0ZW1IZWFsdGhSZXBvcnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2lzU2Nhbm5pbmcsIHNldElzU2Nhbm5pbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbaXNSZXBhaXJpbmcsIHNldElzUmVwYWlyaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2F1ZGl0TG9ncywgc2V0QXVkaXRMb2dzXSA9IHVzZVN0YXRlPFJlcGFpckF1ZGl0TG9nW10+KFtdKTtcbiAgY29uc3QgW2F1dG9IZWFsRGFlbW9uLCBzZXRBdXRvSGVhbERhZW1vbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgZmV0Y2hIZWFsdGhSZXBvcnQgPSBhc3luYyAoKSA9PiB7XG4gICAgc2V0SXNTY2FubmluZyh0cnVlKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHNlbGZIZWFsaW5nRW5naW5lLnJ1bkNvbXByZWhlbnNpdmVEaWFnbm9zdGljcygpO1xuICAgICAgc2V0UmVwb3J0KGRhdGEpO1xuICAgICAgc2V0QXVkaXRMb2dzKHNlbGZIZWFsaW5nRW5naW5lLmdldEF1ZGl0TG9ncygpKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0SXNTY2FubmluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgZmV0Y2hIZWFsdGhSZXBvcnQoKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGhhbmRsZUluc3RhbnRSZXBhaXIgPSBhc3luYyAoKSA9PiB7XG4gICAgc2V0SXNSZXBhaXJpbmcodHJ1ZSk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHNlbGZIZWFsaW5nRW5naW5lLnBlcmZvcm1GdWxsU2VsZlJlcGFpcigpO1xuICAgICAgc2V0UmVwb3J0KHJlc3VsdC5yZXBvcnQpO1xuICAgICAgc2V0QXVkaXRMb2dzKHNlbGZIZWFsaW5nRW5naW5lLmdldEF1ZGl0TG9ncygpKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHNldElzUmVwYWlyaW5nKGZhbHNlKTtcbiAgICAgIH0sIDUwMCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVRvZ2dsZURhZW1vbiA9IChlbmFibGVkOiBib29sZWFuKSA9PiB7XG4gICAgc2V0QXV0b0hlYWxEYWVtb24oZW5hYmxlZCk7XG4gICAgc2VsZkhlYWxpbmdFbmdpbmUudG9nZ2xlQXV0b0hlYWxpbmdEYWVtb24oZW5hYmxlZCwgKHVwZGF0ZWRSZXBvcnQpID0+IHtcbiAgICAgIHNldFJlcG9ydCh1cGRhdGVkUmVwb3J0KTtcbiAgICAgIHNldEF1ZGl0TG9ncyhzZWxmSGVhbGluZ0VuZ2luZS5nZXRBdWRpdExvZ3MoKSk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ2xlYXJMb2dzID0gKCkgPT4ge1xuICAgIHNlbGZIZWFsaW5nRW5naW5lLmFkZEF1ZGl0TG9nKCdXWUNaWVNaQ1pFTklFIEhJU1RPUklJIExPR8OTVycsICdBdWRpdCBNYW5hZ2VyJywgJ0lORk8nLCAnSGlzdG9yaWEgYXVkeXR1IHpyZXNldG93YW5hLicpO1xuICAgIHNldEF1ZGl0TG9ncyhzZWxmSGVhbGluZ0VuZ2luZS5nZXRBdWRpdExvZ3MoKSk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNiBmb250LXNhbnNcIj5cbiAgICAgIHsvKiBIZWFkZXIgQmFubmVyICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTYgcm91bmRlZC0yeGwgYmctZ3JhZGllbnQtdG8tciBmcm9tLWVtZXJhbGQtOTUwIHZpYS1zbGF0ZS05MDAgdG8tdGVhbC05NTAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTgwMC80MCBzaGFkb3ctMnhsIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgbWQ6ZmxleC1yb3cgaXRlbXMtc3RhcnQgbWQ6aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNCByZWxhdGl2ZSB6LTEwXCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yLjVcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicC0yIHJvdW5kZWQteGwgYmctZW1lcmFsZC02MDAvMjAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTUwMC80MCB0ZXh0LWVtZXJhbGQtMzAwXCI+XG4gICAgICAgICAgICAgICAgPEhlYXJ0UHVsc2UgY2xhc3NOYW1lPVwidy01IGgtNSBhbmltYXRlLXB1bHNlIHRleHQtZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LXhsIHNtOnRleHQtMnhsIGZvbnQtYmxhY2sgdGV4dC13aGl0ZSB0cmFja2luZy10aWdodFwiPlxuICAgICAgICAgICAgICAgIENlbnRydW0gQXV0b25hcHJhd3kgJiBQYW5jZXJuZSBCYXJpZXJ5IE9jaHJvbm5lXG4gICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIuNSBweS0wLjUgcm91bmRlZC1mdWxsIHRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZCBiZy1lbWVyYWxkLTk1MCB0ZXh0LWVtZXJhbGQtMzAwIGJvcmRlciBib3JkZXItZW1lcmFsZC04MDBcIj5cbiAgICAgICAgICAgICAgICBTZWxmLUhlYWxpbmcgU3Vic3lzdGVtXG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyBzbTp0ZXh0LXNtIHRleHQtc2xhdGUtMzAwIG10LTIgbWF4LXctM3hsXCI+XG4gICAgICAgICAgICAgIEF1dG9ub21pY3pueSBzeXN0ZW0gbW9uaXRvcm93YW5pYSBpbnRlZ3JhbG5vxZtjaSwgemFiZXpwaWVjemFqxIVjeSB3c3p5c3RraWUgcHVua3R5IHd5asWbY2lhLCBuYXByYXdpYWrEhWN5IHVzemtvZHpvbmUgc3RydWt0dXJ5IGRhbnljaCwgZWxpbWludWrEhWN5IHd5Y2lla2kgcGFtacSZY2kgaSBwcnp5d3JhY2FqxIVjeSBzdGFiaWxub8WbxIcga29kdSB3IGN6YXNpZSByemVjenl3aXN0eW0uXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogQWN0aW9uIEJ1dHRvbnMgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVJbnN0YW50UmVwYWlyfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17aXNSZXBhaXJpbmd9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMi41IHJvdW5kZWQteGwgYmctZ3JhZGllbnQtdG8tciBmcm9tLWVtZXJhbGQtNjAwIHRvLXRlYWwtNjAwIGhvdmVyOmZyb20tZW1lcmFsZC01MDAgaG92ZXI6dG8tdGVhbC01MDAgdGV4dC13aGl0ZSB0ZXh0LXhzIHNtOnRleHQtc20gZm9udC1ib2xkIGZvbnQtbW9ubyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBzaGFkb3ctbGcgc2hhZG93LWVtZXJhbGQtOTUwLzYwIGJvcmRlciBib3JkZXItZW1lcmFsZC00MDAvMzAgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8V3JlbmNoIGNsYXNzTmFtZT17YHctNCBoLTQgJHtpc1JlcGFpcmluZyA/ICdhbmltYXRlLXNwaW4nIDogJyd9YH0gLz5cbiAgICAgICAgICAgICAgPHNwYW4+e2lzUmVwYWlyaW5nID8gJ1Ryd2EgTmFwcmF3YSBTeXN0ZW11Li4uJyA6ICdVcnVjaG9tIFBlxYJuxIUgQXV0b25hcHJhd8SZJ308L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtmZXRjaEhlYWx0aFJlcG9ydH1cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzU2Nhbm5pbmd9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMi41IHJvdW5kZWQteGwgYmctc2xhdGUtODAwIGhvdmVyOmJnLXNsYXRlLTcwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCB0ZXh0LXNsYXRlLTMwMCBob3Zlcjp0ZXh0LXdoaXRlIHRyYW5zaXRpb24tY29sb3JzIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJPZMWbd2llxbwgZGlhZ25vc3R5a8SZXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFJlZnJlc2hDdyBjbGFzc05hbWU9e2B3LTQgaC00ICR7aXNTY2FubmluZyA/ICdhbmltYXRlLXNwaW4gdGV4dC1lbWVyYWxkLTQwMCcgOiAnJ31gfSAvPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBEYWVtb24gVG9nZ2xlIEJhciAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC01IHB0LTQgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMC84MCBmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IGl0ZW1zLXN0YXJ0IHNtOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTMgdGV4dC14c1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yIHRleHQtc2xhdGUtMzAwXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTIuNSBoLTIuNSByb3VuZGVkLWZ1bGwgYmctZW1lcmFsZC00MDAgYW5pbWF0ZS1waW5nXCI+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgIENpxIVnxYJ5IERlbW9uIE9jaHJvbnkgdyBUbGU6IDxzdHJvbmc+e2F1dG9IZWFsRGFlbW9uID8gJ1fFgcSEQ1pPTlkgKDE1cyBBdWR5dCknIDogJ1XFmlBJT05ZIChOYSDFvMSFZGFuaWUpJ308L3N0cm9uZz5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCBmb250LW1vbm9cIj5BdXRvbm9taWN6bmEgU2Ftb25hcHJhd2EgdyBUbGU6PC9zcGFuPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVUb2dnbGVEYWVtb24oIWF1dG9IZWFsRGFlbW9uKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy0xMiBoLTYgcm91bmRlZC1mdWxsIHRyYW5zaXRpb24tY29sb3JzIHJlbGF0aXZlIHAtMC41IGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgICAgYXV0b0hlYWxEYWVtb24gPyAnYmctZW1lcmFsZC02MDAnIDogJ2JnLXNsYXRlLTgwMCdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LTUgaC01IHJvdW5kZWQtZnVsbCBiZy13aGl0ZSB0cmFuc2l0aW9uLXRyYW5zZm9ybSB0cmFuc2Zvcm0gc2hhZG93LW1kICR7XG4gICAgICAgICAgICAgICAgICBhdXRvSGVhbERhZW1vbiA/ICd0cmFuc2xhdGUteC02JyA6ICd0cmFuc2xhdGUteC0wJ1xuICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBBdXRvbm9taWN6bnkgUm9ib3QgU3RyYcW8bmlrICYgTWF0cnljYSBDenVqbmlrw7N3IEduaWQgKE5vd3kgTW9kdcWCKSAqL31cbiAgICAgIDxTZW50aW5lbFdhdGNoZG9nQm90UGFuZWwgLz5cblxuICAgICAgey8qIEhlYWx0aCBNZXRyaWMgJiBPdmVydmlldyBDYXJkcyAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBzbTpncmlkLWNvbHMtMiBsZzpncmlkLWNvbHMtNCBnYXAtNFwiPlxuICAgICAgICB7LyogTWV0cmljIDE6IEhlYWx0aCBTY29yZSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC14bCBiZy1zbGF0ZS05MDAvOTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1tb25vIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZVwiPldza2HFum5payBaZHJvd2lhPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYmxhY2sgdGV4dC1lbWVyYWxkLTQwMCBtdC0wLjVcIj5cbiAgICAgICAgICAgICAge3JlcG9ydD8ub3ZlcmFsbEhlYWx0aFNjb3JlID8/IDEwMH0lXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDAgbXQtMVwiPkludGVncmFsbm/Fm8SHIGtvZHUgaSBwYW1pxJljaTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIGJnLWVtZXJhbGQtOTUwLzgwIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTgwMC82MCB0ZXh0LWVtZXJhbGQtNDAwXCI+XG4gICAgICAgICAgICA8U2hpZWxkQ2hlY2sgY2xhc3NOYW1lPVwidy02IGgtNlwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBNZXRyaWMgMjogSGV4YWdvbmFsIExhc2VyIEJhcnJpZXIgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQteGwgYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItY3lhbi04MDAvNjAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHNoYWRvdy1sZ1wiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtbW9ubyB0ZXh0LWN5YW4tNDAwIHVwcGVyY2FzZSBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgPFphcCBjbGFzc05hbWU9XCJ3LTMgaC0zIHRleHQteWVsbG93LTMwMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPkJhcmllcmEgSGVrc2Fnb25hbG5hPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYmxhY2sgdGV4dC1jeWFuLTMwMCBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgMTAwJSAoODUwIFRIeilcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCBtdC0xXCI+T2Nocm9uYSBsxIVkdWrEhWNlZ28gdW5pdHU8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyBiZy1jeWFuLTk1MC84MCByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItY3lhbi03MDAvNjAgdGV4dC1jeWFuLTMwMFwiPlxuICAgICAgICAgICAgPFphcCBjbGFzc05hbWU9XCJ3LTYgaC02IGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogTWV0cmljIDM6IEFjdGl2ZSBCYXJyaWVycyAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC14bCBiZy1zbGF0ZS05MDAvOTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1tb25vIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZVwiPkJhcmllcnkgT2Nocm9ubmU8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ibGFjayB0ZXh0LXB1cnBsZS00MDAgbXQtMC41XCI+XG4gICAgICAgICAgICAgIHtyZXBvcnQ/LmFjdGl2ZVByb3RlY3Rpb25zLmxlbmd0aCA/PyA2fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIG10LTFcIj5Ba3R5d25lIHRhcmN6ZSBzYW5kYm94aW5nPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMgYmctcHVycGxlLTk1MC84MCByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItcHVycGxlLTgwMC82MCB0ZXh0LXB1cnBsZS00MDBcIj5cbiAgICAgICAgICAgIDxMYXllcnMgY2xhc3NOYW1lPVwidy02IGgtNlwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBNZXRyaWMgMzogUmVwYWlyZWQgSXNzdWVzICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLXhsIGJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSBmb250LW1vbm8gdGV4dC1zbGF0ZS00MDAgdXBwZXJjYXNlXCI+V3lrb25hbmUgTmFwcmF3eTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJsYWNrIHRleHQtdGVhbC00MDAgbXQtMC41XCI+XG4gICAgICAgICAgICAgIHtyZXBvcnQ/LnJlcGFpcmVkSXNzdWVzQ291bnQgPz8gYXVkaXRMb2dzLmxlbmd0aH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCBtdC0xXCI+Wm5ldXRyYWxpem93YW55Y2ggYW5vbWFsaWk8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyBiZy10ZWFsLTk1MC84MCByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItdGVhbC04MDAvNjAgdGV4dC10ZWFsLTQwMFwiPlxuICAgICAgICAgICAgPFdyZW5jaCBjbGFzc05hbWU9XCJ3LTYgaC02XCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIE1ldHJpYyA0OiBXYXRjaGRvZyBTdGF0dXMgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQteGwgYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTQwMCB1cHBlcmNhc2VcIj5TdGF0dXMgV2F0Y2hkb2dhPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1ib2xkIHRleHQtd2hpdGUgbXQtMC41IGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0yIGgtMiByb3VuZGVkLWZ1bGwgYmctZW1lcmFsZC00MDBcIj48L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuPk9ubGluZTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCBtdC0xXCI+T3N0YXRuaSBza2FuOiB7cmVwb3J0Py5sYXN0U2NhblRpbWVzdGFtcCB8fCAnVGVyYXonfTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIGJnLXNsYXRlLTk1MCByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICA8QWN0aXZpdHkgY2xhc3NOYW1lPVwidy02IGgtNiB0ZXh0LWVtZXJhbGQtNDAwXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIE1haW4gVHdvIENvbHVtbjogSW50ZWdyaXR5IENoZWNrIFRhYmxlICsgQXVkaXQgTG9ncyAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBsZzpncmlkLWNvbHMtMTIgZ2FwLTZcIj5cbiAgICAgICAgey8qIExlZnQgQ29sdW1uOiBEaWFnbm9zdGljcyBDaGVja3BvaW50cyAoNyBjb2xzKSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi03IHNwYWNlLXktNFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC01IHJvdW5kZWQtMnhsIGJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBzaGFkb3cteGwgc3BhY2UteS00XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBwYi0zIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTIgdGV4dC13aGl0ZSBmb250LWJvbGQgdGV4dC1zbVwiPlxuICAgICAgICAgICAgICAgIDxDaGVja0NpcmNsZTIgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWVtZXJhbGQtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5BdWR5dCBQb2R6ZXNwb8WCw7N3IGkgUHVua3TDs3cgUnl6eWthPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1vbm8gdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgICBXc3p5c3RraWUgcHVua3R5IHphYmV6cGllY3pvbmVcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yLjVcIj5cbiAgICAgICAgICAgICAge3JlcG9ydD8uY2hlY2tzLm1hcChjaGVjayA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhdHVzQmFkZ2UgPSB7XG4gICAgICAgICAgICAgICAgICBIRUFMVEhZOiAnYmctZW1lcmFsZC05NTAgdGV4dC1lbWVyYWxkLTMwMCBib3JkZXItZW1lcmFsZC04MDAnLFxuICAgICAgICAgICAgICAgICAgV0FSTklORzogJ2JnLWFtYmVyLTk1MCB0ZXh0LWFtYmVyLTMwMCBib3JkZXItYW1iZXItODAwJyxcbiAgICAgICAgICAgICAgICAgIENPUlJVUFRFRDogJ2JnLXJlZC05NTAgdGV4dC1yZWQtMzAwIGJvcmRlci1yZWQtODAwJyxcbiAgICAgICAgICAgICAgICAgIFJFUEFJUkVEOiAnYmctdGVhbC05NTAgdGV4dC10ZWFsLTMwMCBib3JkZXItdGVhbC04MDAnLFxuICAgICAgICAgICAgICAgIH1bY2hlY2suc3RhdHVzXTtcblxuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGtleT17Y2hlY2suaWR9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMy41IHJvdW5kZWQteGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwLzgwIGZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgc206aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtM1wiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0wLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC13aGl0ZVwiPntjaGVjay5uYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzlweF0gZm9udC1tb25vIHB4LTEuNSBweS0wLjIgYmctc2xhdGUtOTAwIHJvdW5kZWQgdGV4dC1zbGF0ZS00MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge2NoZWNrLmNhdGVnb3J5fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS0zMDBcIj57Y2hlY2suZGVzY3JpcHRpb259PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHRleHQtWzEwcHhdIGZvbnQtbW9ubyBmb250LWJvbGQgcHgtMiBweS0wLjUgcm91bmRlZCBib3JkZXIgJHtzdGF0dXNCYWRnZX1gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtjaGVjay5zdGF0dXN9XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBBY3RpdmUgQmFycmllcnMgTGlzdCAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtMyBib3JkZXItdCBib3JkZXItc2xhdGUtODAwLzgwIHNwYWNlLXktMlwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LXB1cnBsZS0zMDAgZm9udC1ib2xkIGJsb2NrXCI+XG4gICAgICAgICAgICAgICAgWmFpbnN0YWxvd2FuZSBUYXJjemUgT2Nocm9ubmUgKFByb3RlY3RpdmUgQmFycmllcnMpOlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBzbTpncmlkLWNvbHMtMiBnYXAtMiB0ZXh0LXhzIHRleHQtc2xhdGUtMzAwXCI+XG4gICAgICAgICAgICAgICAge3JlcG9ydD8uYWN0aXZlUHJvdGVjdGlvbnMubWFwKChiYXJyaWVyLCBpZHgpID0+IChcbiAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpZHh9IGNsYXNzTmFtZT1cInAtMiByb3VuZGVkLWxnIGJnLXNsYXRlLTk1MC84MCBib3JkZXIgYm9yZGVyLXB1cnBsZS05NTAgZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxDaGVjayBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXB1cnBsZS00MDAgc2hyaW5rLTBcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0cnVuY2F0ZVwiPntiYXJyaWVyfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogUmlnaHQgQ29sdW1uOiBSZXBhaXIgQXVkaXQgTG9nICg1IGNvbHMpICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTUgc3BhY2UteS00XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTUgcm91bmRlZC0yeGwgYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHNoYWRvdy14bCBzcGFjZS15LTRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHBiLTMgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMiB0ZXh0LXdoaXRlIGZvbnQtYm9sZCB0ZXh0LXNtXCI+XG4gICAgICAgICAgICAgICAgPFRlcm1pbmFsIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1wdXJwbGUtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5Eemllbm5payBOYXByYXcgaSBBdWR5dHU8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlQ2xlYXJMb2dzfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPFRyYXNoMiBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5XeWN6ecWbxIc8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yIG1heC1oLVs0NjBweF0gb3ZlcmZsb3cteS1hdXRvIHByLTFcIj5cbiAgICAgICAgICAgICAge2F1ZGl0TG9ncy5tYXAobG9nID0+IChcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICBrZXk9e2xvZy5pZH1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMi41IHJvdW5kZWQteGwgYmctYmxhY2svODAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAvODAgZm9udC1tb25vIHRleHQteHMgc3BhY2UteS0xXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LVsxMHB4XVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXB1cnBsZS00MDAgZm9udC1ib2xkXCI+e2xvZy5jb21wb25lbnR9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMFwiPntsb2cudGltZXN0YW1wfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTIwMCBmb250LXNlbWlib2xkIHRleHQtWzExcHhdXCI+e2xvZy5hY3Rpb259PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIHRleHQtWzEwcHhdIGxlYWRpbmctcmVsYXhlZFwiPntsb2cubWVzc2FnZX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKSl9XG5cbiAgICAgICAgICAgICAge2F1ZGl0TG9ncy5sZW5ndGggPT09IDAgJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC02IHRleHQtY2VudGVyIHRleHQtc2xhdGUtNTAwIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgICAgIEJyYWsgd3Bpc8OzdyB3IGR6aWVubmlrdSBhdWR5dHUuXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwibWFwcGluZ3MiOiJBQW1FZ0I7QUFuRWhCLFNBQWdCLFVBQVUsaUJBQWlCO0FBQzNDO0FBQUEsRUFDRTtBQUFBLEVBQVE7QUFBQSxFQUEwQjtBQUFBLEVBQVU7QUFBQSxFQUM3QjtBQUFBLEVBQVc7QUFBQSxFQUFVO0FBQUEsRUFDL0I7QUFBQSxFQUFrQjtBQUFBLEVBQUs7QUFBQSxFQUFRO0FBQUEsT0FDL0I7QUFDUCxTQUFTLHlCQUF5QjtBQUVsQyxTQUFTLGdDQUFnQztBQUVsQyxhQUFNLG9CQUE4QixNQUFNO0FBRS9DLFFBQU0sQ0FBQyxRQUFRLFNBQVMsSUFBSSxTQUFvQyxJQUFJO0FBQ3BFLFFBQU0sQ0FBQyxZQUFZLGFBQWEsSUFBSSxTQUFTLEtBQUs7QUFDbEQsUUFBTSxDQUFDLGFBQWEsY0FBYyxJQUFJLFNBQVMsS0FBSztBQUNwRCxRQUFNLENBQUMsV0FBVyxZQUFZLElBQUksU0FBMkIsQ0FBQyxDQUFDO0FBQy9ELFFBQU0sQ0FBQyxnQkFBZ0IsaUJBQWlCLElBQUksU0FBUyxLQUFLO0FBRTFELFFBQU0sb0JBQW9CLFlBQVk7QUFDcEMsa0JB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