import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-toolkit/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=019a4779"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-toolkit/node_modules/.vite/deps/react.js?v=019a4779"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"];
import {
  Wrench,
  ShieldCheck,
  Activity,
  CheckCircle2,
  RefreshCw,
  Terminal,
  HeartPulse,
  Layers,
  Trash2,
  Check
} from "/sentinel-toolkit/node_modules/.vite/deps/lucide-react.js?v=6cbc5a0a";
import { selfHealingEngine } from "/sentinel-toolkit/src/utils/selfRepairSystem.ts";
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
              lineNumber: 66,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
              lineNumber: 65,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("h2", { className: "text-xl sm:text-2xl font-black text-white tracking-tight", children: "Centrum Autonaprawy & Pancerne Bariery Ochronne" }, void 0, false, {
              fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
              lineNumber: 68,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800", children: "Self-Healing Subsystem" }, void 0, false, {
              fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
              lineNumber: 71,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 64,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl", children: "Autonomiczny system monitorowania integralności, zabezpieczający wszystkie punkty wyjścia, naprawiający uszkodzone struktury danych, eliminujący wycieki pamięci i przywracający stabilność kodu w czasie rzeczywistym." }, void 0, false, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 75,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 63,
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
                  lineNumber: 87,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: isRepairing ? "Trwa Naprawa Systemu..." : "Uruchom Pełną Autonaprawę" }, void 0, false, {
                  fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
                  lineNumber: 88,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
              lineNumber: 82,
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
                lineNumber: 97,
                columnNumber: 15
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
              lineNumber: 91,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 81,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
        lineNumber: 62,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "mt-5 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 text-slate-300", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" }, void 0, false, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 105,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: [
            "Ciągły Demon Ochrony w Tle: ",
            /* @__PURE__ */ jsxDEV("strong", { children: autoHealDaemon ? "WŁĄCZONY (15s Audyt)" : "UŚPIONY (Na żądanie)" }, void 0, false, {
              fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
              lineNumber: 107,
              columnNumber: 43
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 106,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 104,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 font-mono", children: "Autonomiczna Samonaprawa w Tle:" }, void 0, false, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 112,
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
                  lineNumber: 119,
                  columnNumber: 15
                },
                this
              )
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
              lineNumber: 113,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 111,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
        lineNumber: 103,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
      lineNumber: 61,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] font-mono text-slate-400 uppercase", children: "Wskaźnik Zdrowia" }, void 0, false, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 134,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-2xl font-black text-emerald-400 mt-0.5", children: [
            report?.overallHealthScore ?? 100,
            "%"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 135,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400 mt-1", children: "Integralność kodu i pamięci" }, void 0, false, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 138,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 133,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-emerald-950/80 rounded-xl border border-emerald-800/60 text-emerald-400", children: /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-6 h-6" }, void 0, false, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 141,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 140,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
        lineNumber: 132,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] font-mono text-slate-400 uppercase", children: "Bariery Ochronne" }, void 0, false, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 148,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-2xl font-black text-purple-400 mt-0.5", children: report?.activeProtections.length ?? 6 }, void 0, false, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 149,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400 mt-1", children: "Aktywne tarcze sandboxing" }, void 0, false, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 152,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 147,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-purple-950/80 rounded-xl border border-purple-800/60 text-purple-400", children: /* @__PURE__ */ jsxDEV(Layers, { className: "w-6 h-6" }, void 0, false, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 155,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 154,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
        lineNumber: 146,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] font-mono text-slate-400 uppercase", children: "Wykonane Naprawy" }, void 0, false, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 162,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-2xl font-black text-teal-400 mt-0.5", children: report?.repairedIssuesCount ?? auditLogs.length }, void 0, false, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 163,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400 mt-1", children: "Zneutralizowanych anomalii" }, void 0, false, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 166,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 161,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-teal-950/80 rounded-xl border border-teal-800/60 text-teal-400", children: /* @__PURE__ */ jsxDEV(Wrench, { className: "w-6 h-6" }, void 0, false, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 169,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 168,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
        lineNumber: 160,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] font-mono text-slate-400 uppercase", children: "Status Watchdoga" }, void 0, false, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 176,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-lg font-bold text-white mt-0.5 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-emerald-400" }, void 0, false, {
              fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
              lineNumber: 178,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Online" }, void 0, false, {
              fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
              lineNumber: 179,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 177,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400 mt-1", children: [
            "Ostatni skan: ",
            report?.lastScanTimestamp || "Teraz"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 181,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 175,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-400", children: /* @__PURE__ */ jsxDEV(Activity, { className: "w-6 h-6 text-emerald-400" }, void 0, false, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 184,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 183,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
        lineNumber: 174,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
      lineNumber: 130,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-7 space-y-4", children: /* @__PURE__ */ jsxDEV("div", { className: "p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-3 border-b border-slate-800", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 text-white font-bold text-sm", children: [
            /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
              fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
              lineNumber: 196,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Audyt Podzespołów i Punktów Ryzyka" }, void 0, false, {
              fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
              lineNumber: 197,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 195,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono text-slate-400", children: "Wszystkie punkty zabezpieczone" }, void 0, false, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 199,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 194,
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
                      lineNumber: 220,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] font-mono px-1.5 py-0.2 bg-slate-900 rounded text-slate-400 border border-slate-800", children: check.category }, void 0, false, {
                      fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
                      lineNumber: 221,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
                    lineNumber: 219,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-300", children: check.description }, void 0, false, {
                    fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
                    lineNumber: 225,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
                  lineNumber: 218,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: /* @__PURE__ */ jsxDEV("span", { className: `text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${statusBadge}`, children: check.status }, void 0, false, {
                  fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
                  lineNumber: 229,
                  columnNumber: 23
                }, this) }, void 0, false, {
                  fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
                  lineNumber: 228,
                  columnNumber: 21
                }, this)
              ]
            },
            check.id,
            true,
            {
              fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
              lineNumber: 214,
              columnNumber: 19
            },
            this
          );
        }) }, void 0, false, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 204,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "pt-3 border-t border-slate-800/80 space-y-2", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono text-purple-300 font-bold block", children: "Zainstalowane Tarcze Ochronne (Protective Barriers):" }, void 0, false, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 240,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300", children: report?.activeProtections.map((barrier, idx) => /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-lg bg-slate-950/80 border border-purple-950 flex items-center space-x-2", children: [
            /* @__PURE__ */ jsxDEV(Check, { className: "w-3.5 h-3.5 text-purple-400 shrink-0" }, void 0, false, {
              fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
              lineNumber: 246,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "truncate", children: barrier }, void 0, false, {
              fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
              lineNumber: 247,
              columnNumber: 21
            }, this)
          ] }, idx, true, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 245,
            columnNumber: 19
          }, this)) }, void 0, false, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 243,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 239,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
        lineNumber: 193,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
        lineNumber: 192,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-5 space-y-4", children: /* @__PURE__ */ jsxDEV("div", { className: "p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-3 border-b border-slate-800", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 text-white font-bold text-sm", children: [
            /* @__PURE__ */ jsxDEV(Terminal, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
              fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
              lineNumber: 260,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Dziennik Napraw i Audytu" }, void 0, false, {
              fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
              lineNumber: 261,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 259,
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
                  lineNumber: 267,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Wyczyść" }, void 0, false, {
                  fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
                  lineNumber: 268,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
              lineNumber: 263,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 258,
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
                    lineNumber: 279,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: log.timestamp }, void 0, false, {
                    fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
                    lineNumber: 280,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
                  lineNumber: 278,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-slate-200 font-semibold text-[11px]", children: log.action }, void 0, false, {
                  fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
                  lineNumber: 282,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-slate-400 text-[10px] leading-relaxed", children: log.message }, void 0, false, {
                  fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
                  lineNumber: 283,
                  columnNumber: 19
                }, this)
              ]
            },
            log.id,
            true,
            {
              fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
              lineNumber: 274,
              columnNumber: 17
            },
            this
          )),
          auditLogs.length === 0 && /* @__PURE__ */ jsxDEV("div", { className: "p-6 text-center text-slate-500 text-xs", children: "Brak wpisów w dzienniku audytu." }, void 0, false, {
            fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
            lineNumber: 288,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
          lineNumber: 272,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
        lineNumber: 257,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
        lineNumber: 256,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
      lineNumber: 190,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/SelfHealingCenter.tsx",
    lineNumber: 59,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlbGZIZWFsaW5nQ2VudGVyLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFxuICBXcmVuY2gsIFNoaWVsZENoZWNrLCBTaGllbGRBbGVydCwgQWN0aXZpdHksIENoZWNrQ2lyY2xlMiwgXG4gIEFsZXJ0VHJpYW5nbGUsIFJlZnJlc2hDdywgVGVybWluYWwsIEhlYXJ0UHVsc2UsIEhhcmREcml2ZSwgXG4gIENwdSwgTGF5ZXJzLCBTcGFya2xlcywgWmFwLCBUcmFzaDIsIENoZWNrXG59IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBzZWxmSGVhbGluZ0VuZ2luZSB9IGZyb20gJy4uL3V0aWxzL3NlbGZSZXBhaXJTeXN0ZW0nO1xuaW1wb3J0IHsgU3lzdGVtSGVhbHRoUmVwb3J0LCBSZXBhaXJBdWRpdExvZyB9IGZyb20gJy4uL3R5cGVzJztcblxuZXhwb3J0IGNvbnN0IFNlbGZIZWFsaW5nQ2VudGVyOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgY29uc3QgW3JlcG9ydCwgc2V0UmVwb3J0XSA9IHVzZVN0YXRlPFN5c3RlbUhlYWx0aFJlcG9ydCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbaXNTY2FubmluZywgc2V0SXNTY2FubmluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtpc1JlcGFpcmluZywgc2V0SXNSZXBhaXJpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbYXVkaXRMb2dzLCBzZXRBdWRpdExvZ3NdID0gdXNlU3RhdGU8UmVwYWlyQXVkaXRMb2dbXT4oW10pO1xuICBjb25zdCBbYXV0b0hlYWxEYWVtb24sIHNldEF1dG9IZWFsRGFlbW9uXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBmZXRjaEhlYWx0aFJlcG9ydCA9IGFzeW5jICgpID0+IHtcbiAgICBzZXRJc1NjYW5uaW5nKHRydWUpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgc2VsZkhlYWxpbmdFbmdpbmUucnVuQ29tcHJlaGVuc2l2ZURpYWdub3N0aWNzKCk7XG4gICAgICBzZXRSZXBvcnQoZGF0YSk7XG4gICAgICBzZXRBdWRpdExvZ3Moc2VsZkhlYWxpbmdFbmdpbmUuZ2V0QXVkaXRMb2dzKCkpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRJc1NjYW5uaW5nKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBmZXRjaEhlYWx0aFJlcG9ydCgpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgaGFuZGxlSW5zdGFudFJlcGFpciA9IGFzeW5jICgpID0+IHtcbiAgICBzZXRJc1JlcGFpcmluZyh0cnVlKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgc2VsZkhlYWxpbmdFbmdpbmUucGVyZm9ybUZ1bGxTZWxmUmVwYWlyKCk7XG4gICAgICBzZXRSZXBvcnQocmVzdWx0LnJlcG9ydCk7XG4gICAgICBzZXRBdWRpdExvZ3Moc2VsZkhlYWxpbmdFbmdpbmUuZ2V0QXVkaXRMb2dzKCkpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgc2V0SXNSZXBhaXJpbmcoZmFsc2UpO1xuICAgICAgfSwgNTAwKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlVG9nZ2xlRGFlbW9uID0gKGVuYWJsZWQ6IGJvb2xlYW4pID0+IHtcbiAgICBzZXRBdXRvSGVhbERhZW1vbihlbmFibGVkKTtcbiAgICBzZWxmSGVhbGluZ0VuZ2luZS50b2dnbGVBdXRvSGVhbGluZ0RhZW1vbihlbmFibGVkLCAodXBkYXRlZFJlcG9ydCkgPT4ge1xuICAgICAgc2V0UmVwb3J0KHVwZGF0ZWRSZXBvcnQpO1xuICAgICAgc2V0QXVkaXRMb2dzKHNlbGZIZWFsaW5nRW5naW5lLmdldEF1ZGl0TG9ncygpKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVDbGVhckxvZ3MgPSAoKSA9PiB7XG4gICAgc2VsZkhlYWxpbmdFbmdpbmUuYWRkQXVkaXRMb2coJ1dZQ1pZU1pDWkVOSUUgSElTVE9SSUkgTE9Hw5NXJywgJ0F1ZGl0IE1hbmFnZXInLCAnSU5GTycsICdIaXN0b3JpYSBhdWR5dHUgenJlc2V0b3dhbmEuJyk7XG4gICAgc2V0QXVkaXRMb2dzKHNlbGZIZWFsaW5nRW5naW5lLmdldEF1ZGl0TG9ncygpKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS02IGZvbnQtc2Fuc1wiPlxuICAgICAgey8qIEhlYWRlciBCYW5uZXIgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNiByb3VuZGVkLTJ4bCBiZy1ncmFkaWVudC10by1yIGZyb20tZW1lcmFsZC05NTAgdmlhLXNsYXRlLTkwMCB0by10ZWFsLTk1MCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtODAwLzQwIHNoYWRvdy0yeGwgcmVsYXRpdmUgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBtZDpmbGV4LXJvdyBpdGVtcy1zdGFydCBtZDppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00IHJlbGF0aXZlIHotMTBcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTIuNVwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC14bCBiZy1lbWVyYWxkLTYwMC8yMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNTAwLzQwIHRleHQtZW1lcmFsZC0zMDBcIj5cbiAgICAgICAgICAgICAgICA8SGVhcnRQdWxzZSBjbGFzc05hbWU9XCJ3LTUgaC01IGFuaW1hdGUtcHVsc2UgdGV4dC1lbWVyYWxkLTQwMFwiIC8+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQteGwgc206dGV4dC0yeGwgZm9udC1ibGFjayB0ZXh0LXdoaXRlIHRyYWNraW5nLXRpZ2h0XCI+XG4gICAgICAgICAgICAgICAgQ2VudHJ1bSBBdXRvbmFwcmF3eSAmIFBhbmNlcm5lIEJhcmllcnkgT2Nocm9ubmVcbiAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMi41IHB5LTAuNSByb3VuZGVkLWZ1bGwgdGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkIGJnLWVtZXJhbGQtOTUwIHRleHQtZW1lcmFsZC0zMDAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTgwMFwiPlxuICAgICAgICAgICAgICAgIFNlbGYtSGVhbGluZyBTdWJzeXN0ZW1cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHNtOnRleHQtc20gdGV4dC1zbGF0ZS0zMDAgbXQtMiBtYXgtdy0zeGxcIj5cbiAgICAgICAgICAgICAgQXV0b25vbWljem55IHN5c3RlbSBtb25pdG9yb3dhbmlhIGludGVncmFsbm/Fm2NpLCB6YWJlenBpZWN6YWrEhWN5IHdzenlzdGtpZSBwdW5rdHkgd3lqxZtjaWEsIG5hcHJhd2lhasSFY3kgdXN6a29kem9uZSBzdHJ1a3R1cnkgZGFueWNoLCBlbGltaW51asSFY3kgd3ljaWVraSBwYW1pxJljaSBpIHByenl3cmFjYWrEhWN5IHN0YWJpbG5vxZvEhyBrb2R1IHcgY3phc2llIHJ6ZWN6eXdpc3R5bS5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBBY3Rpb24gQnV0dG9ucyAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUluc3RhbnRSZXBhaXJ9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtpc1JlcGFpcmluZ31cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0yLjUgcm91bmRlZC14bCBiZy1ncmFkaWVudC10by1yIGZyb20tZW1lcmFsZC02MDAgdG8tdGVhbC02MDAgaG92ZXI6ZnJvbS1lbWVyYWxkLTUwMCBob3Zlcjp0by10ZWFsLTUwMCB0ZXh0LXdoaXRlIHRleHQteHMgc206dGV4dC1zbSBmb250LWJvbGQgZm9udC1tb25vIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHNoYWRvdy1sZyBzaGFkb3ctZW1lcmFsZC05NTAvNjAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTQwMC8zMCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxXcmVuY2ggY2xhc3NOYW1lPXtgdy00IGgtNCAke2lzUmVwYWlyaW5nID8gJ2FuaW1hdGUtc3BpbicgOiAnJ31gfSAvPlxuICAgICAgICAgICAgICA8c3Bhbj57aXNSZXBhaXJpbmcgPyAnVHJ3YSBOYXByYXdhIFN5c3RlbXUuLi4nIDogJ1VydWNob20gUGXFgm7EhSBBdXRvbmFwcmF3xJknfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2ZldGNoSGVhbHRoUmVwb3J0fVxuICAgICAgICAgICAgICBkaXNhYmxlZD17aXNTY2FubmluZ31cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0yLjUgcm91bmRlZC14bCBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHRleHQtc2xhdGUtMzAwIGhvdmVyOnRleHQtd2hpdGUgdHJhbnNpdGlvbi1jb2xvcnMgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICB0aXRsZT1cIk9kxZt3aWXFvCBkaWFnbm9zdHlrxJlcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8UmVmcmVzaEN3IGNsYXNzTmFtZT17YHctNCBoLTQgJHtpc1NjYW5uaW5nID8gJ2FuaW1hdGUtc3BpbiB0ZXh0LWVtZXJhbGQtNDAwJyA6ICcnfWB9IC8+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIERhZW1vbiBUb2dnbGUgQmFyICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTUgcHQtNCBib3JkZXItdCBib3JkZXItc2xhdGUtODAwLzgwIGZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgaXRlbXMtc3RhcnQgc206aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMyB0ZXh0LXhzXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTIgdGV4dC1zbGF0ZS0zMDBcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctMi41IGgtMi41IHJvdW5kZWQtZnVsbCBiZy1lbWVyYWxkLTQwMCBhbmltYXRlLXBpbmdcIj48L3NwYW4+XG4gICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgQ2nEhWfFgnkgRGVtb24gT2Nocm9ueSB3IFRsZTogPHN0cm9uZz57YXV0b0hlYWxEYWVtb24gPyAnV8WBxIRDWk9OWSAoMTVzIEF1ZHl0KScgOiAnVcWaUElPTlkgKE5hIMW8xIVkYW5pZSknfTwvc3Ryb25nPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTJcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIGZvbnQtbW9ub1wiPkF1dG9ub21pY3puYSBTYW1vbmFwcmF3YSB3IFRsZTo8L3NwYW4+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVRvZ2dsZURhZW1vbighYXV0b0hlYWxEYWVtb24pfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LTEyIGgtNiByb3VuZGVkLWZ1bGwgdHJhbnNpdGlvbi1jb2xvcnMgcmVsYXRpdmUgcC0wLjUgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgICAgICBhdXRvSGVhbERhZW1vbiA/ICdiZy1lbWVyYWxkLTYwMCcgOiAnYmctc2xhdGUtODAwJ1xuICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctNSBoLTUgcm91bmRlZC1mdWxsIGJnLXdoaXRlIHRyYW5zaXRpb24tdHJhbnNmb3JtIHRyYW5zZm9ybSBzaGFkb3ctbWQgJHtcbiAgICAgICAgICAgICAgICAgIGF1dG9IZWFsRGFlbW9uID8gJ3RyYW5zbGF0ZS14LTYnIDogJ3RyYW5zbGF0ZS14LTAnXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIEhlYWx0aCBNZXRyaWMgJiBPdmVydmlldyBDYXJkcyAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBzbTpncmlkLWNvbHMtMiBsZzpncmlkLWNvbHMtNCBnYXAtNFwiPlxuICAgICAgICB7LyogTWV0cmljIDE6IEhlYWx0aCBTY29yZSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC14bCBiZy1zbGF0ZS05MDAvOTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1tb25vIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZVwiPldza2HFum5payBaZHJvd2lhPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYmxhY2sgdGV4dC1lbWVyYWxkLTQwMCBtdC0wLjVcIj5cbiAgICAgICAgICAgICAge3JlcG9ydD8ub3ZlcmFsbEhlYWx0aFNjb3JlID8/IDEwMH0lXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDAgbXQtMVwiPkludGVncmFsbm/Fm8SHIGtvZHUgaSBwYW1pxJljaTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIGJnLWVtZXJhbGQtOTUwLzgwIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTgwMC82MCB0ZXh0LWVtZXJhbGQtNDAwXCI+XG4gICAgICAgICAgICA8U2hpZWxkQ2hlY2sgY2xhc3NOYW1lPVwidy02IGgtNlwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBNZXRyaWMgMjogQWN0aXZlIEJhcnJpZXJzICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLXhsIGJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSBmb250LW1vbm8gdGV4dC1zbGF0ZS00MDAgdXBwZXJjYXNlXCI+QmFyaWVyeSBPY2hyb25uZTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJsYWNrIHRleHQtcHVycGxlLTQwMCBtdC0wLjVcIj5cbiAgICAgICAgICAgICAge3JlcG9ydD8uYWN0aXZlUHJvdGVjdGlvbnMubGVuZ3RoID8/IDZ9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDAgbXQtMVwiPkFrdHl3bmUgdGFyY3plIHNhbmRib3hpbmc8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyBiZy1wdXJwbGUtOTUwLzgwIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1wdXJwbGUtODAwLzYwIHRleHQtcHVycGxlLTQwMFwiPlxuICAgICAgICAgICAgPExheWVycyBjbGFzc05hbWU9XCJ3LTYgaC02XCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIE1ldHJpYyAzOiBSZXBhaXJlZCBJc3N1ZXMgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQteGwgYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTQwMCB1cHBlcmNhc2VcIj5XeWtvbmFuZSBOYXByYXd5PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYmxhY2sgdGV4dC10ZWFsLTQwMCBtdC0wLjVcIj5cbiAgICAgICAgICAgICAge3JlcG9ydD8ucmVwYWlyZWRJc3N1ZXNDb3VudCA/PyBhdWRpdExvZ3MubGVuZ3RofVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIG10LTFcIj5abmV1dHJhbGl6b3dhbnljaCBhbm9tYWxpaTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIGJnLXRlYWwtOTUwLzgwIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci10ZWFsLTgwMC82MCB0ZXh0LXRlYWwtNDAwXCI+XG4gICAgICAgICAgICA8V3JlbmNoIGNsYXNzTmFtZT1cInctNiBoLTZcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogTWV0cmljIDQ6IFdhdGNoZG9nIFN0YXR1cyAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC14bCBiZy1zbGF0ZS05MDAvOTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1tb25vIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZVwiPlN0YXR1cyBXYXRjaGRvZ2E8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LWJvbGQgdGV4dC13aGl0ZSBtdC0wLjUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTIgaC0yIHJvdW5kZWQtZnVsbCBiZy1lbWVyYWxkLTQwMFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4+T25saW5lPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIG10LTFcIj5Pc3RhdG5pIHNrYW46IHtyZXBvcnQ/Lmxhc3RTY2FuVGltZXN0YW1wIHx8ICdUZXJheid9PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMgYmctc2xhdGUtOTUwIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgIDxBY3Rpdml0eSBjbGFzc05hbWU9XCJ3LTYgaC02IHRleHQtZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogTWFpbiBUd28gQ29sdW1uOiBJbnRlZ3JpdHkgQ2hlY2sgVGFibGUgKyBBdWRpdCBMb2dzICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIGxnOmdyaWQtY29scy0xMiBnYXAtNlwiPlxuICAgICAgICB7LyogTGVmdCBDb2x1bW46IERpYWdub3N0aWNzIENoZWNrcG9pbnRzICg3IGNvbHMpICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTcgc3BhY2UteS00XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTUgcm91bmRlZC0yeGwgYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHNoYWRvdy14bCBzcGFjZS15LTRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHBiLTMgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMiB0ZXh0LXdoaXRlIGZvbnQtYm9sZCB0ZXh0LXNtXCI+XG4gICAgICAgICAgICAgICAgPENoZWNrQ2lyY2xlMiBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPkF1ZHl0IFBvZHplc3BvxYLDs3cgaSBQdW5rdMOzdyBSeXp5a2E8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICAgIFdzenlzdGtpZSBwdW5rdHkgemFiZXpwaWVjem9uZVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTIuNVwiPlxuICAgICAgICAgICAgICB7cmVwb3J0Py5jaGVja3MubWFwKGNoZWNrID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGF0dXNCYWRnZSA9IHtcbiAgICAgICAgICAgICAgICAgIEhFQUxUSFk6ICdiZy1lbWVyYWxkLTk1MCB0ZXh0LWVtZXJhbGQtMzAwIGJvcmRlci1lbWVyYWxkLTgwMCcsXG4gICAgICAgICAgICAgICAgICBXQVJOSU5HOiAnYmctYW1iZXItOTUwIHRleHQtYW1iZXItMzAwIGJvcmRlci1hbWJlci04MDAnLFxuICAgICAgICAgICAgICAgICAgQ09SUlVQVEVEOiAnYmctcmVkLTk1MCB0ZXh0LXJlZC0zMDAgYm9yZGVyLXJlZC04MDAnLFxuICAgICAgICAgICAgICAgICAgUkVQQUlSRUQ6ICdiZy10ZWFsLTk1MCB0ZXh0LXRlYWwtMzAwIGJvcmRlci10ZWFsLTgwMCcsXG4gICAgICAgICAgICAgICAgfVtjaGVjay5zdGF0dXNdO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAga2V5PXtjaGVjay5pZH1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0zLjUgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAvODAgZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBzbTppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0zXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTAuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXdoaXRlXCI+e2NoZWNrLm5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bOXB4XSBmb250LW1vbm8gcHgtMS41IHB5LTAuMiBiZy1zbGF0ZS05MDAgcm91bmRlZCB0ZXh0LXNsYXRlLTQwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7Y2hlY2suY2F0ZWdvcnl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTMwMFwiPntjaGVjay5kZXNjcmlwdGlvbn08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgdGV4dC1bMTBweF0gZm9udC1tb25vIGZvbnQtYm9sZCBweC0yIHB5LTAuNSByb3VuZGVkIGJvcmRlciAke3N0YXR1c0JhZGdlfWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAge2NoZWNrLnN0YXR1c31cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIEFjdGl2ZSBCYXJyaWVycyBMaXN0ICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdC0zIGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDAvODAgc3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIHRleHQtcHVycGxlLTMwMCBmb250LWJvbGQgYmxvY2tcIj5cbiAgICAgICAgICAgICAgICBaYWluc3RhbG93YW5lIFRhcmN6ZSBPY2hyb25uZSAoUHJvdGVjdGl2ZSBCYXJyaWVycyk6XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yIGdhcC0yIHRleHQteHMgdGV4dC1zbGF0ZS0zMDBcIj5cbiAgICAgICAgICAgICAgICB7cmVwb3J0Py5hY3RpdmVQcm90ZWN0aW9ucy5tYXAoKGJhcnJpZXIsIGlkeCkgPT4gKFxuICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2lkeH0gY2xhc3NOYW1lPVwicC0yIHJvdW5kZWQtbGcgYmctc2xhdGUtOTUwLzgwIGJvcmRlciBib3JkZXItcHVycGxlLTk1MCBmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPENoZWNrIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtcHVycGxlLTQwMCBzaHJpbmstMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRydW5jYXRlXCI+e2JhcnJpZXJ9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBSaWdodCBDb2x1bW46IFJlcGFpciBBdWRpdCBMb2cgKDUgY29scykgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tNSBzcGFjZS15LTRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNSByb3VuZGVkLTJ4bCBiZy1zbGF0ZS05MDAvOTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgc2hhZG93LXhsIHNwYWNlLXktNFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcGItMyBib3JkZXItYiBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yIHRleHQtd2hpdGUgZm9udC1ib2xkIHRleHQtc21cIj5cbiAgICAgICAgICAgICAgICA8VGVybWluYWwgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXB1cnBsZS00MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPkR6aWVubmlrIE5hcHJhdyBpIEF1ZHl0dTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVDbGVhckxvZ3N9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8VHJhc2gyIGNsYXNzTmFtZT1cInctMyBoLTNcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPld5Y3p5xZvEhzwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTIgbWF4LWgtWzQ2MHB4XSBvdmVyZmxvdy15LWF1dG8gcHItMVwiPlxuICAgICAgICAgICAgICB7YXVkaXRMb2dzLm1hcChsb2cgPT4gKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgIGtleT17bG9nLmlkfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0yLjUgcm91bmRlZC14bCBiZy1ibGFjay84MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMC84MCBmb250LW1vbm8gdGV4dC14cyBzcGFjZS15LTFcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQtWzEwcHhdXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcHVycGxlLTQwMCBmb250LWJvbGRcIj57bG9nLmNvbXBvbmVudH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwXCI+e2xvZy50aW1lc3RhbXB9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMjAwIGZvbnQtc2VtaWJvbGQgdGV4dC1bMTFweF1cIj57bG9nLmFjdGlvbn08L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgdGV4dC1bMTBweF0gbGVhZGluZy1yZWxheGVkXCI+e2xvZy5tZXNzYWdlfTwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApKX1cblxuICAgICAgICAgICAgICB7YXVkaXRMb2dzLmxlbmd0aCA9PT0gMCAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTYgdGV4dC1jZW50ZXIgdGV4dC1zbGF0ZS01MDAgdGV4dC14c1wiPlxuICAgICAgICAgICAgICAgICAgQnJhayB3cGlzw7N3IHcgZHppZW5uaWt1IGF1ZHl0dS5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdLCJtYXBwaW5ncyI6IkFBaUVnQjtBQWpFaEIsU0FBZ0IsVUFBVSxpQkFBaUI7QUFDM0M7QUFBQSxFQUNFO0FBQUEsRUFBUTtBQUFBLEVBQTBCO0FBQUEsRUFBVTtBQUFBLEVBQzdCO0FBQUEsRUFBVztBQUFBLEVBQVU7QUFBQSxFQUMvQjtBQUFBLEVBQXVCO0FBQUEsRUFBUTtBQUFBLE9BQy9CO0FBQ1AsU0FBUyx5QkFBeUI7QUFHM0IsYUFBTSxvQkFBOEIsTUFBTTtBQUMvQyxRQUFNLENBQUMsUUFBUSxTQUFTLElBQUksU0FBb0MsSUFBSTtBQUNwRSxRQUFNLENBQUMsWUFBWSxhQUFhLElBQUksU0FBUyxLQUFLO0FBQ2xELFFBQU0sQ0FBQyxhQUFhLGNBQWMsSUFBSSxTQUFTLEtBQUs7QUFDcEQsUUFBTSxDQUFDLFdBQVcsWUFBWSxJQUFJLFNBQTJCLENBQUMsQ0FBQztBQUMvRCxRQUFNLENBQUMsZ0JBQWdCLGlCQUFpQixJQUFJLFNBQVMsS0FBSztBQUUxRCxRQUFNLG9CQUFvQixZQUFZO0FBQ3BDLGtCQUFjLElBQUk7QUFDbEIsUUFBSTtBQUNGLFlBQU0sT0FBTyxNQUFNLGtCQUFrQiw0QkFBNEI7QUFDakUsZ0JBQVUsSUFBSTtBQUNkLG1CQUFhLGtCQUFrQixhQUFhLENBQUM7QUFBQSxJQUMvQyxVQUFFO0FBQ0Esb0JBQWMsS0FBSztBQUFBLElBQ3JCO0FBQUEsRUFDRjtBQUVBLFlBQVUsTUFBTTtBQUNkLHNCQUFrQjtBQUFBLEVBQ3BCLEdBQUcsQ0FBQyxDQUFD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