import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"];
import {
  Bot,
  Activity,
  Zap,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ShieldAlert,
  FileText,
  Database,
  Radio,
  Layers,
  Crosshair,
  Navigation
} from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import { sentinelBotEngine } from "/sentinel-shield/src/utils/sentinelBotEngine.ts";
import { gnidaSensorsMatrix } from "/sentinel-shield/src/utils/gnidaSensorsMatrix.ts";
import { droneSquadronEngine } from "/sentinel-shield/src/utils/droneSquadronEngine.ts";
import { MotherCatMemorialView } from "/sentinel-shield/src/components/MotherCatMemorialView.tsx";
export const SentinelWatchdogBotPanel = () => {
  const [botState, setBotState] = useState(() => sentinelBotEngine.getState());
  const [sensors, setSensors] = useState(() => gnidaSensorsMatrix.getProbes());
  const [redAlert, setRedAlert] = useState(() => gnidaSensorsMatrix.getRedAlertState());
  const [squadron, setSquadron] = useState(() => droneSquadronEngine.getState());
  const [activeTab, setActiveTab] = useState("kittens");
  const [selectedDrone, setSelectedDrone] = useState(null);
  useEffect(() => {
    const unsubBot = sentinelBotEngine.subscribe(setBotState);
    const unsubSensors = gnidaSensorsMatrix.subscribe((probes, alert) => {
      setSensors(probes);
      setRedAlert(alert);
    });
    const unsubDrones = droneSquadronEngine.subscribe(setSquadron);
    return () => {
      unsubBot();
      unsubSensors();
      unsubDrones();
    };
  }, []);
  const getStatusBadge = (status) => {
    switch (status) {
      case "SCANNING":
        return /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/80 text-emerald-300 font-mono text-xs font-bold animate-pulse", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-emerald-400" }, void 0, false, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 50,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "CIĄGŁE SKANOWANIE AKTYWNE" }, void 0, false, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 51,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
          lineNumber: 49,
          columnNumber: 11
        }, this);
      case "DEFECT_DETECTED":
        return /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950 border border-amber-500 text-amber-300 font-mono text-xs font-bold animate-bounce", children: [
          /* @__PURE__ */ jsxDEV(AlertTriangle, { className: "w-3.5 h-3.5" }, void 0, false, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 57,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "WYKRYTO USZKODZENIE / ANOMALIĘ" }, void 0, false, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 58,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
          lineNumber: 56,
          columnNumber: 11
        }, this);
      case "AUTO_REPAIRING":
        return /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-400 text-cyan-200 font-mono text-xs font-bold shadow-lg shadow-cyan-950", children: [
          /* @__PURE__ */ jsxDEV(RefreshCw, { className: "w-3.5 h-3.5 animate-spin text-cyan-300" }, void 0, false, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 64,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "NATYCHMIASTOWA AUTONAPRAWA W TOKU..." }, void 0, false, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 65,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
          lineNumber: 63,
          columnNumber: 11
        }, this);
      case "REPAIRED_HEALTHY":
        return /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900 border border-emerald-400 text-white font-mono text-xs font-bold", children: [
          /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-3.5 h-3.5 text-emerald-300" }, void 0, false, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 71,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "NAPRAWIONO (INTEGRALNOŚĆ PRZYWRÓCONA)" }, void 0, false, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 72,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
          lineNumber: 70,
          columnNumber: 11
        }, this);
      case "PAUSED":
        return /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-600 text-slate-400 font-mono text-xs font-bold", children: [
          /* @__PURE__ */ jsxDEV(Pause, { className: "w-3.5 h-3.5" }, void 0, false, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 78,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "SKANOWANIE WSTRZYMANE" }, void 0, false, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 79,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
          lineNumber: 77,
          columnNumber: 11
        }, this);
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border-2 border-indigo-500/40 shadow-2xl relative overflow-hidden", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" }, void 0, false, {
        fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
        lineNumber: 92,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-0 left-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" }, void 0, false, {
        fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
        lineNumber: 93,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "relative", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-950 border-2 border-indigo-400/80 flex items-center justify-center shadow-xl shadow-indigo-950/60 relative overflow-hidden", children: [
              /* @__PURE__ */ jsxDEV(Bot, { className: `w-9 h-9 sm:w-11 sm:h-11 ${botState.status === "AUTO_REPAIRING" ? "text-cyan-300 animate-pulse" : botState.status === "DEFECT_DETECTED" ? "text-yellow-400 animate-bounce" : "text-indigo-400"}` }, void 0, false, {
                fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                lineNumber: 102,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent animate-pulse" }, void 0, false, {
                fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                lineNumber: 110,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 101,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-950 shadow-md animate-ping" }, void 0, false, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 113,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-950" }, void 0, false, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 114,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 99,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2.5 flex-wrap", children: [
              /* @__PURE__ */ jsxDEV("h2", { className: "text-xl sm:text-2xl font-black text-white font-mono tracking-tight flex items-center gap-2", children: /* @__PURE__ */ jsxDEV("span", { children: "AUTONOMICZNY ROBOT STRAŻNIK & WATCHDOG" }, void 0, false, {
                fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                lineNumber: 120,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                lineNumber: 119,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-700/60 font-mono text-[10px] font-bold", children: "AUTONOMOUS SELF-HEALING v3.0" }, void 0, false, {
                fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                lineNumber: 122,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 118,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed", children: [
              "Robot nieustannie monitoruje stan aplikacji, integralność logów, pamięć i węzły I/O. Po zlokalizowaniu błędu, uszkodzonego rekordu lub anomalii ",
              /* @__PURE__ */ jsxDEV("strong", { className: "text-cyan-300", children: "natychmiast rozpoczyna naprawę" }, void 0, false, {
                fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                lineNumber: 127,
                columnNumber: 161
              }, this),
              ", a po zakończeniu ",
              /* @__PURE__ */ jsxDEV("strong", { className: "text-emerald-300", children: "płynnie kontynuuje skanowanie" }, void 0, false, {
                fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                lineNumber: 127,
                columnNumber: 253
              }, this),
              "."
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 126,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 117,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
          lineNumber: 98,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-3 w-full lg:w-auto", children: [
          getStatusBadge(botState.status),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
            botState.isRunning ? /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => sentinelBotEngine.stop(),
                className: "px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs font-bold flex items-center gap-1.5 border border-slate-700 cursor-pointer",
                children: [
                  /* @__PURE__ */ jsxDEV(Pause, { className: "w-3.5 h-3.5" }, void 0, false, {
                    fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                    lineNumber: 142,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Wstrzymaj" }, void 0, false, {
                    fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                    lineNumber: 143,
                    columnNumber: 19
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                lineNumber: 138,
                columnNumber: 17
              },
              this
            ) : /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => sentinelBotEngine.start(),
                className: "px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-950 cursor-pointer",
                children: [
                  /* @__PURE__ */ jsxDEV(Play, { className: "w-3.5 h-3.5 fill-white" }, void 0, false, {
                    fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                    lineNumber: 150,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Wznów Skanowanie" }, void 0, false, {
                    fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                    lineNumber: 151,
                    columnNumber: 19
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                lineNumber: 146,
                columnNumber: 17
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => sentinelBotEngine.injectSimulatedDefect("CORRUPTED_LOG_ENTRY"),
                className: "px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-md shadow-cyan-950 cursor-pointer",
                title: "Wstrzyknij uszkodzenie i zobacz jak robot natychmiast naprawia i wznawia skanowanie",
                children: [
                  /* @__PURE__ */ jsxDEV(Zap, { className: "w-3.5 h-3.5" }, void 0, false, {
                    fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                    lineNumber: 160,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Test Samonaprawy" }, void 0, false, {
                    fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                    lineNumber: 161,
                    columnNumber: 17
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                lineNumber: 155,
                columnNumber: 15
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 136,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
          lineNumber: 133,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
        lineNumber: 95,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-800 font-mono text-xs", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-2xl bg-slate-950/80 border border-slate-800", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-slate-400 text-[11px]", children: "CYKLE SKANOWANIA ROBOTA" }, void 0, false, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 171,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-xl sm:text-2xl font-black text-indigo-400 mt-1", children: botState.scanCycles }, void 0, false, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 172,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-500 mt-0.5", children: "Częstotliwość ~2.5 Hz" }, void 0, false, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 173,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
          lineNumber: 170,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-2xl bg-slate-950/80 border border-slate-800", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-slate-400 text-[11px]", children: "WYKRYTE USZKODZENIA" }, void 0, false, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 177,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-xl sm:text-2xl font-black text-amber-400 mt-1", children: botState.defectsDetectedCount }, void 0, false, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 178,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-500 mt-0.5", children: "Logi / JSON / Pamięć" }, void 0, false, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 179,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
          lineNumber: 176,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-2xl bg-slate-950/80 border border-slate-800", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-xl sm:text-2xl font-black text-emerald-400 mt-1", children: botState.autoRepairsCompletedCount }, void 0, false, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 183,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-slate-400 text-[11px] -order-1", children: "WYKONANE SAMONAPRAWY" }, void 0, false, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 184,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-500 mt-0.5", children: "100% Skuteczności" }, void 0, false, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 185,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
          lineNumber: 182,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-2xl bg-slate-950/80 border border-slate-800", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-slate-400 text-[11px]", children: "WSKAŹNIK ZDROWIA BAZY" }, void 0, false, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 189,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-xl sm:text-2xl font-black text-cyan-300 mt-1", children: [
            botState.systemHealthIndex,
            "%"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 190,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-emerald-400 mt-0.5", children: "Status: Optymalny" }, void 0, false, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 191,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
          lineNumber: 188,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
        lineNumber: 169,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "mt-4 p-3 rounded-2xl bg-slate-950/90 border border-indigo-500/30 flex items-center justify-between gap-3 text-xs font-mono", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-indigo-300", children: [
          /* @__PURE__ */ jsxDEV(Activity, { className: "w-4 h-4 text-cyan-400 animate-pulse shrink-0" }, void 0, false, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 198,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Aktualnie badany wektor:" }, void 0, false, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 199,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-white font-bold", children: botState.currentInspectionTarget }, void 0, false, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 200,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
          lineNumber: 197,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "hidden sm:flex items-center gap-1.5 text-emerald-400 text-[11px]", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" }, void 0, false, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 203,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Bez zakłóceń" }, void 0, false, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 204,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
          lineNumber: 202,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
        lineNumber: 196,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
      lineNumber: 89,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto", children: [
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveTab("kittens"),
          className: `px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${activeTab === "kittens" ? "bg-amber-600 text-white shadow-md shadow-amber-950 ring-1 ring-amber-400" : "text-slate-400 hover:text-white hover:bg-slate-900"}`,
          children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-base", children: "🐱" }, void 0, false, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 220,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Drony-Kotki „Usuń Gnidę” & Pomnik Mamy" }, void 0, false, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 221,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "px-1.5 py-0.5 rounded bg-black/50 text-[10px] text-amber-300", children: "ŚMIERTELNY WZROK" }, void 0, false, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 222,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
          lineNumber: 212,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveTab("drones"),
          className: `px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${activeTab === "drones" ? "bg-cyan-600 text-white shadow-md shadow-cyan-950" : "text-slate-400 hover:text-white hover:bg-slate-900"}`,
          children: [
            /* @__PURE__ */ jsxDEV(Navigation, { className: "w-4 h-4 text-cyan-300 animate-spin", style: { animationDuration: "6s" } }, void 0, false, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 235,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Eskadra 20 Dronów Patrolujących" }, void 0, false, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 236,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "px-1.5 py-0.5 rounded bg-black/50 text-[10px] text-cyan-200", children: "20/20 AKTYWNE" }, void 0, false, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 237,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
          lineNumber: 227,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveTab("bot"),
          className: `px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${activeTab === "bot" ? "bg-indigo-600 text-white shadow-md shadow-indigo-950" : "text-slate-400 hover:text-white hover:bg-slate-900"}`,
          children: [
            /* @__PURE__ */ jsxDEV(Bot, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 250,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Stan Robota & Testy Samonaprawy" }, void 0, false, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 251,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
          lineNumber: 242,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveTab("sensors"),
          className: `px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${activeTab === "sensors" ? "bg-red-600 text-white shadow-md shadow-red-950" : "text-slate-400 hover:text-white hover:bg-slate-900"}`,
          children: [
            /* @__PURE__ */ jsxDEV(ShieldAlert, { className: "w-4 h-4 text-yellow-300 animate-pulse" }, void 0, false, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 262,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Matryca Czujników Gnid (Czerwony Alarm & Syrena)" }, void 0, false, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 263,
              columnNumber: 11
            }, this),
            sensors.some((s) => s.tripped) && /* @__PURE__ */ jsxDEV("span", { className: "px-1.5 py-0.2 rounded bg-red-950 border border-red-500 text-red-200 text-[10px]", children: "ALARM" }, void 0, false, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 265,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
          lineNumber: 254,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveTab("repairs"),
          className: `px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${activeTab === "repairs" ? "bg-emerald-600 text-white shadow-md shadow-emerald-950" : "text-slate-400 hover:text-white hover:bg-slate-900"}`,
          children: [
            /* @__PURE__ */ jsxDEV(FileText, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 279,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              "Dziennik Napraw (",
              botState.repairHistory.length,
              ")"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 280,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
          lineNumber: 271,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
      lineNumber: 211,
      columnNumber: 7
    }, this),
    activeTab === "kittens" && /* @__PURE__ */ jsxDEV(MotherCatMemorialView, {}, void 0, false, {
      fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
      lineNumber: 286,
      columnNumber: 9
    }, this),
    activeTab === "drones" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "p-6 rounded-3xl bg-slate-900/90 border border-cyan-500/40 shadow-2xl space-y-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-black text-white font-mono flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV(Navigation, { className: "w-5 h-5 text-cyan-400 animate-pulse" }, void 0, false, {
                  fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                  lineNumber: 299,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "CENTRUM DOWODZENIA ESKADRĄ 20 DRONÓW PATROLUJĄCYCH" }, void 0, false, {
                  fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                  lineNumber: 300,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                lineNumber: 298,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500 text-xs font-mono font-bold", children: "20 DRONÓW W CIĄGŁYM LOCIE" }, void 0, false, {
                fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                lineNumber: 302,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 297,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-300 font-sans mt-1 max-w-3xl leading-relaxed", children: [
              "20 autonomicznych dronów patroluje teren i przemieszcza się swobodnie między aplikacjami, pracując w tle. Skanują kod w poszukiwaniu uszkodzeń, audytują logi oraz tropią gnidy. ",
              /* @__PURE__ */ jsxDEV("strong", { className: "text-red-400 font-bold", children: "Rozpoznanie gnidy inicjuje automatyczny atak wiązką plazmową 940.8 THz i permanentną inaktywację (PE MZ wipe + NtSuspend w RAM 0ms + blokada ACL)" }, void 0, false, {
                fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                lineNumber: 307,
                columnNumber: 196
              }, this),
              "."
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 306,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 296,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap shrink-0", children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => droneSquadronEngine.setSquadronMode("AUTONOMOUS_INTER_APP_PATROL"),
                className: `px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${squadron.squadronMode === "AUTONOMOUS_INTER_APP_PATROL" ? "bg-indigo-600 text-white shadow-md shadow-indigo-950" : "bg-slate-800 text-slate-400 hover:text-white"}`,
                children: "Swobodny Patrol (Apps)"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                lineNumber: 313,
                columnNumber: 17
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => droneSquadronEngine.setSquadronMode("DEFENSIVE_SWARM"),
                className: `px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${squadron.squadronMode === "DEFENSIVE_SWARM" ? "bg-cyan-600 text-white shadow-md shadow-cyan-950" : "bg-slate-800 text-slate-400 hover:text-white"}`,
                children: "Formacja Roju Bazy"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                lineNumber: 324,
                columnNumber: 17
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => droneSquadronEngine.translocateAllDronesOutsideBase(),
                className: "px-3 py-1.5 rounded-xl bg-purple-900/90 hover:bg-purple-800 border border-purple-500/60 text-purple-200 font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-purple-950 cursor-pointer active:scale-95 transition-all",
                title: "Translokacja kwantowa wszystkich dronów na zewnątrz bazy (przenikanie bez naruszenia tarczy, powrót fizycznie niemożliwy)",
                children: [
                  /* @__PURE__ */ jsxDEV(Radio, { className: "w-3.5 h-3.5 text-purple-300 animate-spin" }, void 0, false, {
                    fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                    lineNumber: 340,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Translokacja poza Bazę (Bezzwrotna)" }, void 0, false, {
                    fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                    lineNumber: 341,
                    columnNumber: 19
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                lineNumber: 335,
                columnNumber: 17
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => droneSquadronEngine.engageAndPermanentlyInactivateGnida("stealth_overlay_gnida.sys"),
                className: "px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-red-950 cursor-pointer active:scale-95 transition-all",
                children: [
                  /* @__PURE__ */ jsxDEV(Crosshair, { className: "w-4 h-4 text-yellow-300" }, void 0, false, {
                    fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                    lineNumber: 348,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Wymuś Atak i Inaktywację" }, void 0, false, {
                    fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                    lineNumber: 349,
                    columnNumber: 19
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                lineNumber: 344,
                columnNumber: 17
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 312,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
          lineNumber: 295,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-purple-950/40 border border-purple-500/40 text-xs font-mono text-purple-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(Radio, { className: "w-4 h-4 text-purple-400 shrink-0 animate-pulse" }, void 0, false, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 357,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-white", children: "DOKTRYNA TRANSLOKACJI JEDNOKIERUNKOWEJ:" }, void 0, false, {
                fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                lineNumber: 359,
                columnNumber: 19
              }, this),
              " ",
              /* @__PURE__ */ jsxDEV("span", { className: "text-purple-300", children: [
                "Drony przenikają poza barierę metodą tunelowania kwantowego bez najmniejszego osłabienia tarczy. Zgodnie z fizyką heksagonalnej bariery ",
                /* @__PURE__ */ jsxDEV("strong", { className: "text-amber-300", children: "powrót na lub nad teren bazy jest bezwzględnie niemożliwy" }, void 0, false, {
                  fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                  lineNumber: 361,
                  columnNumber: 157
                }, this),
                "."
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                lineNumber: 360,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 358,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 356,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-1 rounded bg-purple-900/80 border border-purple-400 text-[10px] text-purple-100 font-bold shrink-0", children: "SWEEP PRZEDPOLE" }, void 0, false, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 365,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
          lineNumber: 355,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800 font-mono text-xs", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-2xl bg-slate-950 border border-slate-800", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "text-slate-400 text-[10px]", children: "LICZBA DRONÓW W BAZIE" }, void 0, false, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 373,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-xl font-black text-cyan-300 mt-0.5", children: "20 / 20" }, void 0, false, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 374,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-emerald-400", children: "100% sprawności operacyjnej" }, void 0, false, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 375,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 372,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-2xl bg-slate-950 border border-slate-800", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "text-slate-400 text-[10px]", children: "SEKTORY / APLIKACJE" }, void 0, false, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 379,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-xl font-black text-indigo-400 mt-0.5", children: [
              squadron.sectorsCovered.length,
              " Aplikacji"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 380,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400", children: "DWM, VSCode, Sandbox, RAM" }, void 0, false, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 381,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 378,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-2xl bg-slate-950 border border-slate-800", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "text-slate-400 text-[10px]", children: "NAPRAWIONE KODY I LOGI" }, void 0, false, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 385,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-xl font-black text-emerald-400 mt-0.5", children: squadron.totalCodeDefectsFixed }, void 0, false, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 386,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-500", children: "Ciągła naprawa w locie" }, void 0, false, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 387,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 384,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-2xl bg-slate-950 border border-slate-800", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "text-slate-400 text-[10px]", children: "PERMANENTNIE ZNISZCZONE GNIDY" }, void 0, false, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 391,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-xl font-black text-rose-400 mt-0.5", children: squadron.totalGnidasPermanentlyInactivated }, void 0, false, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 392,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-red-400", children: "PE Wipe + NtSuspend 0ms" }, void 0, false, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 393,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 390,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
          lineNumber: 371,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
        lineNumber: 294,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxDEV("h4", { className: "text-sm font-bold text-white font-mono flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(Bot, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 402,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "TELEMETRIA I POZYCJE 20 DRONÓW PATROLUJĄCYCH" }, void 0, false, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 403,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 401,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs text-slate-400 font-normal", children: "Kliknij na drona, aby wydać rozkaz natychmiastowego ataku" }, void 0, false, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 405,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
          lineNumber: 400,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3", children: squadron.drones.map((drone) => {
          const isAttacking = drone.mode === "ENGAGING_TARGET" || drone.mode === "PERMANENT_INACTIVATION";
          const isScanning = drone.mode === "SCANNING_TERRAIN";
          return /* @__PURE__ */ jsxDEV(
            "div",
            {
              onClick: () => {
                droneSquadronEngine.engageAndPermanentlyInactivateGnida(
                  "targeted_sector_gnida.bin",
                  drone.sector,
                  drone.x,
                  drone.y
                );
              },
              className: `p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-2 hover:scale-[1.02] active:scale-98 ${isAttacking ? "bg-red-950/90 border-red-400 shadow-lg shadow-red-900/60 animate-pulse" : isScanning ? "bg-cyan-950/70 border-cyan-500/60 hover:border-cyan-400" : "bg-slate-950 border-slate-800 hover:border-indigo-500/60"}`,
              children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono font-black text-white flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxDEV(Bot, { className: `w-3.5 h-3.5 ${isAttacking ? "text-yellow-300" : "text-cyan-300"}` }, void 0, false, {
                      fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                      lineNumber: 436,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: drone.callsign.replace("DRONE-", "D-") }, void 0, false, {
                      fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                      lineNumber: 437,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                    lineNumber: 435,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: `w-2 h-2 rounded-full ${isAttacking ? "bg-red-400 animate-ping" : isScanning ? "bg-cyan-400" : "bg-emerald-400"}` }, void 0, false, {
                    fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                    lineNumber: 439,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                  lineNumber: 434,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] font-mono space-y-1", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "text-cyan-300 font-bold truncate", title: drone.sector, children: drone.sector.replace("App: ", "") }, void 0, false, {
                    fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                    lineNumber: 445,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "text-slate-400 text-[10px] truncate", children: drone.assignedVector }, void 0, false, {
                    fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                    lineNumber: 448,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                  lineNumber: 444,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: `${isAttacking ? "text-red-300 font-bold" : "text-slate-400"}`, children: drone.mode === "ENGAGING_TARGET" ? "⚡ ATAK" : drone.mode === "PERMANENT_INACTIVATION" ? "💥 INAKTYWACJA" : "🟢 PATROL" }, void 0, false, {
                    fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                    lineNumber: 454,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-yellow-400 font-bold", children: [
                    "⚔️ ",
                    drone.targetsNeutralizedCount
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                    lineNumber: 457,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                  lineNumber: 453,
                  columnNumber: 21
                }, this)
              ]
            },
            drone.id,
            true,
            {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 416,
              columnNumber: 19
            },
            this
          );
        }) }, void 0, false, {
          fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
          lineNumber: 410,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
        lineNumber: 399,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3", children: [
        /* @__PURE__ */ jsxDEV("h4", { className: "text-sm font-bold text-white font-mono flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(Activity, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 470,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "DZIENNIK AKCJI ESKADRY DRONÓW (AUTONAPRAWY KODU & INAKTYWACJE GNID)" }, void 0, false, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 471,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
          lineNumber: 469,
          columnNumber: 13
        }, this),
        squadron.recentSquadronEngagements.length === 0 ? /* @__PURE__ */ jsxDEV("div", { className: "p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center font-mono text-xs text-slate-500", children: "20 dronów patroluje teren i skanuje aplikacje w poszukiwaniu uszkodzeń i agresorów." }, void 0, false, {
          fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
          lineNumber: 475,
          columnNumber: 15
        }, this) : /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 font-mono text-xs max-h-72 overflow-y-auto pr-1", children: squadron.recentSquadronEngagements.map((eng) => {
          const isKill = eng.actionType === "GNIDA_PERMANENT_INACTIVATION";
          return /* @__PURE__ */ jsxDEV(
            "div",
            {
              className: `p-3 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 ${isKill ? "bg-red-950/70 border-red-500/60 text-red-200" : "bg-slate-950 border-slate-800 text-slate-300"}`,
              children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2.5 flex-wrap", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: `px-2 py-0.5 rounded text-[10px] font-bold ${isKill ? "bg-red-900 border border-red-400 text-white" : "bg-cyan-950 text-cyan-300 border border-cyan-600/50"}`, children: isKill ? "INAKTYWACJA PERMANENTNA" : "AUTONAPRAWA KODU" }, void 0, false, {
                    fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                    lineNumber: 493,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-white", children: eng.droneCallsign }, void 0, false, {
                    fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                    lineNumber: 498,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "w" }, void 0, false, {
                    fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                    lineNumber: 499,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-300 font-bold", children: eng.sector }, void 0, false, {
                    fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                    lineNumber: 500,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                  lineNumber: 492,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] text-right", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 mr-2", children: eng.timestamp }, void 0, false, {
                    fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                    lineNumber: 504,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-white font-bold", children: eng.targetName }, void 0, false, {
                    fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                    lineNumber: 505,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                  lineNumber: 503,
                  columnNumber: 23
                }, this)
              ]
            },
            eng.id,
            true,
            {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 484,
              columnNumber: 21
            },
            this
          );
        }) }, void 0, false, {
          fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
          lineNumber: 479,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
        lineNumber: 468,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
      lineNumber: 291,
      columnNumber: 9
    }, this),
    activeTab === "bot" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-bold text-white font-mono flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(Zap, { className: "w-4 h-4 text-yellow-400" }, void 0, false, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 526,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "LABORATORIUM TESTÓW SAMONAPRAWY ROBOTA" }, void 0, false, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 527,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 525,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 mt-1", children: "Wstrzyknij wybrane uszkodzenie, aby przetestować reakcję robota: natychmiastowe zlokalizowanie błędu, naprawę w <150ms oraz płynną kontynuację skanowania." }, void 0, false, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 529,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
          lineNumber: 524,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => sentinelBotEngine.injectSimulatedDefect("CORRUPTED_LOG_ENTRY"),
              className: "p-4 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-amber-500/40 text-left transition-all hover:scale-[1.01] active:scale-98 cursor-pointer flex flex-col justify-between space-y-3",
              children: [
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-amber-400 font-bold text-xs", children: [
                    /* @__PURE__ */ jsxDEV("span", { children: "1. USZKODZENIE WPISU LOGA" }, void 0, false, {
                      fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                      lineNumber: 541,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV(FileText, { className: "w-4 h-4" }, void 0, false, {
                      fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                      lineNumber: 542,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                    lineNumber: 540,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400 mt-1", children: "Wstawia uszkodzony rekord z null / unparseable payload do dziennika zdarzeń." }, void 0, false, {
                    fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                    lineNumber: 544,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                  lineNumber: 539,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-cyan-300 font-bold flex items-center gap-1", children: /* @__PURE__ */ jsxDEV("span", { children: "Wstrzyknij & Przetestuj Robota →" }, void 0, false, {
                  fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                  lineNumber: 549,
                  columnNumber: 19
                }, this) }, void 0, false, {
                  fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                  lineNumber: 548,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 535,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => sentinelBotEngine.injectSimulatedDefect("BROKEN_LOCALSTORAGE_JSON"),
              className: "p-4 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-purple-500/40 text-left transition-all hover:scale-[1.01] active:scale-98 cursor-pointer flex flex-col justify-between space-y-3",
              children: [
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-purple-400 font-bold text-xs", children: [
                    /* @__PURE__ */ jsxDEV("span", { children: "2. BŁĄD JSON W PAMIĘCI" }, void 0, false, {
                      fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                      lineNumber: 559,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV(Database, { className: "w-4 h-4" }, void 0, false, {
                      fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                      lineNumber: 560,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                    lineNumber: 558,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400 mt-1", children: "Zapisuje uszkodzoną składnię JSON w przestrzeni LocalStorage." }, void 0, false, {
                    fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                    lineNumber: 562,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                  lineNumber: 557,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-cyan-300 font-bold flex items-center gap-1", children: /* @__PURE__ */ jsxDEV("span", { children: "Wstrzyknij & Przetestuj Robota →" }, void 0, false, {
                  fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                  lineNumber: 567,
                  columnNumber: 19
                }, this) }, void 0, false, {
                  fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                  lineNumber: 566,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 553,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => sentinelBotEngine.injectSimulatedDefect("MEMORY_LEAK_OR_DANGLING_NODE"),
              className: "p-4 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-cyan-500/40 text-left transition-all hover:scale-[1.01] active:scale-98 cursor-pointer flex flex-col justify-between space-y-3",
              children: [
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-cyan-400 font-bold text-xs", children: [
                    /* @__PURE__ */ jsxDEV("span", { children: "3. USZKODZONY WĘZEŁ I/O (NaN)" }, void 0, false, {
                      fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                      lineNumber: 577,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV(Layers, { className: "w-4 h-4" }, void 0, false, {
                      fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                      lineNumber: 578,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                    lineNumber: 576,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400 mt-1", children: "Wstrzykuje uszkodzony węzeł DMA z wartością NaN w deskryptorach." }, void 0, false, {
                    fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                    lineNumber: 580,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                  lineNumber: 575,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-cyan-300 font-bold flex items-center gap-1", children: /* @__PURE__ */ jsxDEV("span", { children: "Wstrzyknij & Przetestuj Robota →" }, void 0, false, {
                  fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                  lineNumber: 585,
                  columnNumber: 19
                }, this) }, void 0, false, {
                  fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                  lineNumber: 584,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 571,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
          lineNumber: 534,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
        lineNumber: 523,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3", children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-bold text-white font-mono flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(Activity, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 594,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "CIĄGLE MONITOROWANE WEKTORY APLIKACJI" }, void 0, false, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 595,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
          lineNumber: 593,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs", children: botState.monitoredVectors.map((v, i) => /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "text-white font-bold text-xs flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-emerald-400 animate-pulse" }, void 0, false, {
                fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                lineNumber: 602,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: v.name }, void 0, false, {
                fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                lineNumber: 603,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 601,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400 mt-1", children: v.description }, void 0, false, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 605,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-500 mt-2", children: [
              "Częstotliwość: ",
              v.checkRateHz,
              " Hz"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 606,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 600,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-600/40 text-[10px] font-bold", children: v.status }, void 0, false, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 608,
            columnNumber: 19
          }, this)
        ] }, i, true, {
          fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
          lineNumber: 599,
          columnNumber: 17
        }, this)) }, void 0, false, {
          fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
          lineNumber: 597,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
        lineNumber: 592,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
      lineNumber: 520,
      columnNumber: 9
    }, this),
    activeTab === "sensors" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: `p-5 rounded-3xl border-2 transition-all ${redAlert.isActive ? "bg-gradient-to-r from-red-950 via-rose-900 to-red-950 border-red-500 shadow-[0_0_40px_rgba(239,68,68,0.5)]" : "bg-slate-900/90 border-slate-800"}`, children: /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxDEV("div", { className: `p-3 rounded-2xl ${redAlert.isActive ? "bg-red-600 text-white animate-bounce" : "bg-slate-800 text-slate-400"}`, children: /* @__PURE__ */ jsxDEV(ShieldAlert, { className: "w-6 h-6" }, void 0, false, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 632,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 631,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("h3", { className: "text-base sm:text-lg font-black text-white font-mono flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV("span", { children: "STATUS OBRONNY CAŁEJ BAZY:" }, void 0, false, {
                fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                lineNumber: 636,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: redAlert.isActive ? "text-red-300 animate-pulse" : "text-emerald-400", children: redAlert.isActive ? "🚨 CZERWONY ALARM (KOD OMEGA)" : "🛡️ STAN CZUWANIA (WSZYSTKIE CZUJNIKI AKTYWNE)" }, void 0, false, {
                fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                lineNumber: 637,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 635,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-300 font-sans mt-0.5", children: redAlert.isActive ? `Czujnik ${redAlert.trippedSensorName} rozpoznał gnidę "${redAlert.neutralizedGnidaName}". Wykonano natychmiastową inaktywację!` : "Wszystkie 6 czujników sprzętowych i systemowych pracują synchronicznie. Brak aktywnych agresorów." }, void 0, false, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 641,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 634,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
          lineNumber: 630,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => gnidaSensorsMatrix.toggleAudioMute(),
              className: `px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${redAlert.audioMuted ? "bg-slate-800 border-slate-700 text-slate-400" : "bg-red-700 border-red-400 text-white"}`,
              children: [
                redAlert.audioMuted ? /* @__PURE__ */ jsxDEV(VolumeX, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                  lineNumber: 659,
                  columnNumber: 42
                }, this) : /* @__PURE__ */ jsxDEV(Volume2, { className: "w-4 h-4 text-yellow-300" }, void 0, false, {
                  fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                  lineNumber: 659,
                  columnNumber: 76
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: redAlert.audioMuted ? "Syrena Wyciszona" : "Dźwięk Syreny Włączony" }, void 0, false, {
                  fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                  lineNumber: 660,
                  columnNumber: 19
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 651,
              columnNumber: 17
            },
            this
          ),
          redAlert.isActive && /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => gnidaSensorsMatrix.acknowledgeAndResetRedAlert(),
              className: "px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black font-mono text-xs flex items-center gap-1.5 shadow-lg active:scale-95 transition-all cursor-pointer",
              children: [
                /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                  lineNumber: 668,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "SKASUJ CZERWONY ALARM" }, void 0, false, {
                  fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                  lineNumber: 669,
                  columnNumber: 21
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 664,
              columnNumber: 19
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
          lineNumber: 650,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
        lineNumber: 629,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
        lineNumber: 624,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: sensors.map((sensor) => {
        const isTripped = sensor.tripped || sensor.status === "TRIPPED_ALARM";
        return /* @__PURE__ */ jsxDEV(
          "div",
          {
            className: `p-5 rounded-3xl border transition-all flex flex-col justify-between space-y-4 ${isTripped ? "bg-gradient-to-b from-red-950 to-slate-950 border-red-500 shadow-xl shadow-red-950/80 animate-pulse" : "bg-slate-900/90 border-slate-800 hover:border-slate-700"}`,
            children: [
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: `px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${isTripped ? "bg-red-950 text-red-300 border border-red-500" : "bg-emerald-950 text-emerald-300 border border-emerald-600/40"}`, children: isTripped ? "🚨 ROZPOZNANO GNIDĘ" : "🟢 CZUJNIK AKTYWNY" }, void 0, false, {
                    fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                    lineNumber: 693,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] font-mono text-slate-400", children: [
                    "Wykryć: ",
                    sensor.detectionsCount
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                    lineNumber: 700,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                  lineNumber: 692,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("h4", { className: "text-sm font-bold text-white font-mono mt-3", children: sensor.name }, void 0, false, {
                  fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                  lineNumber: 705,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400 mt-1 leading-relaxed", children: sensor.description }, void 0, false, {
                  fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                  lineNumber: 708,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "mt-3 p-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[10px] space-y-1", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "text-slate-500", children: "Adres Sprzętowy:" }, void 0, false, {
                    fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                    lineNumber: 713,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "text-cyan-300 truncate", children: sensor.hardwareAddress }, void 0, false, {
                    fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                    lineNumber: 714,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "text-slate-500 pt-1", children: "Wektor Ataku:" }, void 0, false, {
                    fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                    lineNumber: 715,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "text-purple-300 truncate", children: sensor.vector }, void 0, false, {
                    fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                    lineNumber: 716,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                  lineNumber: 712,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                lineNumber: 690,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "pt-2 border-t border-slate-800/80", children: /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => gnidaSensorsMatrix.testTriggerSensor(sensor.id),
                  className: "w-full py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-mono font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer",
                  children: [
                    /* @__PURE__ */ jsxDEV(Crosshair, { className: "w-3.5 h-3.5 text-yellow-300" }, void 0, false, {
                      fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                      lineNumber: 726,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "TESTUJ CZUJNIK (ATAK GNIDY)" }, void 0, false, {
                      fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                      lineNumber: 727,
                      columnNumber: 23
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                  lineNumber: 722,
                  columnNumber: 21
                },
                this
              ) }, void 0, false, {
                fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
                lineNumber: 721,
                columnNumber: 19
              }, this)
            ]
          },
          sensor.id,
          true,
          {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 682,
            columnNumber: 17
          },
          this
        );
      }) }, void 0, false, {
        fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
        lineNumber: 677,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
      lineNumber: 621,
      columnNumber: 9
    }, this),
    activeTab === "repairs" && /* @__PURE__ */ jsxDEV("div", { className: "p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-bold text-white font-mono flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(FileText, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 744,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "REJESTR ZDARZEŃ SAMONAPRAWY ROBOTA" }, void 0, false, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 745,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 743,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 mt-1", children: "Szczegółowa historia zlokalizowanych błędów, uszkodzonych logów i wykonanych procedur rekonstrukcji." }, void 0, false, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 747,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
          lineNumber: 742,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-mono text-slate-400", children: [
          "Łącznie napraw: ",
          /* @__PURE__ */ jsxDEV("strong", { className: "text-emerald-400", children: botState.autoRepairsCompletedCount }, void 0, false, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 752,
            columnNumber: 31
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
          lineNumber: 751,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
        lineNumber: 741,
        columnNumber: 11
      }, this),
      botState.repairHistory.length === 0 ? /* @__PURE__ */ jsxDEV("div", { className: "p-8 rounded-2xl bg-slate-950 border border-slate-800 text-center font-mono text-xs text-slate-500", children: "Brak zarejestrowanych awarii. Robot stale monitoruje aplikację w trybie ciągłym." }, void 0, false, {
        fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
        lineNumber: 757,
        columnNumber: 13
      }, this) : /* @__PURE__ */ jsxDEV("div", { className: "space-y-2.5 font-mono text-xs", children: botState.repairHistory.map((rep, idx) => /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all space-y-2", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-2", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/60 font-bold text-[10px]", children: rep.defectType }, void 0, false, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 766,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-white font-bold", children: rep.targetComponent }, void 0, false, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 769,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 765,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-slate-400 text-[11px]", children: [
            /* @__PURE__ */ jsxDEV("span", { children: [
              "Czas: ",
              rep.timestamp
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 772,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "•" }, void 0, false, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 773,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400", children: [
              "Czas naprawy: ",
              rep.recoveryDurationMs,
              " ms"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
              lineNumber: 774,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 771,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
          lineNumber: 764,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-slate-300 text-[11px]", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "Diagnoza:" }, void 0, false, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 779,
            columnNumber: 21
          }, this),
          " ",
          rep.diagnosticDetails
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
          lineNumber: 778,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-cyan-300 text-[11px] bg-slate-900/60 p-2 rounded-xl border border-slate-800", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Wykonana akcja naprawcza:" }, void 0, false, {
            fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
            lineNumber: 783,
            columnNumber: 21
          }, this),
          " ",
          rep.repairActionExecuted
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
          lineNumber: 782,
          columnNumber: 19
        }, this)
      ] }, rep.id || idx, true, {
        fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
        lineNumber: 763,
        columnNumber: 17
      }, this)) }, void 0, false, {
        fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
        lineNumber: 761,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
      lineNumber: 740,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/SentinelWatchdogBotPanel.tsx",
    lineNumber: 86,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlbnRpbmVsV2F0Y2hkb2dCb3RQYW5lbC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBcbiAgQm90LCBTaGllbGQsIENwdSwgQWN0aXZpdHksIFphcCwgQ2hlY2tDaXJjbGUyLCBBbGVydFRyaWFuZ2xlLCBcbiAgUmVmcmVzaEN3LCBQbGF5LCBQYXVzZSwgQmVsbCwgVm9sdW1lMiwgVm9sdW1lWCwgU2hpZWxkQWxlcnQsIFxuICBGaWxlVGV4dCwgRGF0YWJhc2UsIFJhZGlvLCBIYXJkRHJpdmUsIExheWVycywgVGVybWluYWwsIFNwYXJrbGVzLFxuICBDcm9zc2hhaXIsIFNrdWxsLCBUcmFzaDIsIE5hdmlnYXRpb24sIEV5ZSwgSGVhcnQsIERyb3BsZXRzLCBGbG93ZXIyXG59IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBcbiAgU2VudGluZWxCb3RTdGF0ZSwgXG4gIFNlbnRpbmVsQm90U3RhdHVzLCBcbiAgU2VudGluZWxCb3REZWZlY3RUeXBlLCBcbiAgR25pZGFTZW5zb3JQcm9iZSwgXG4gIEduaWRhU2Vuc29yVHlwZSwgXG4gIEJhc2VSZWRBbGVydFN0YXRlLFxuICBEcm9uZVNxdWFkcm9uU3RhdGUsXG4gIFBhdHJvbERyb25lRW50aXR5XG59IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IHNlbnRpbmVsQm90RW5naW5lIH0gZnJvbSAnLi4vdXRpbHMvc2VudGluZWxCb3RFbmdpbmUnO1xuaW1wb3J0IHsgZ25pZGFTZW5zb3JzTWF0cml4IH0gZnJvbSAnLi4vdXRpbHMvZ25pZGFTZW5zb3JzTWF0cml4JztcbmltcG9ydCB7IGRyb25lU3F1YWRyb25FbmdpbmUgfSBmcm9tICcuLi91dGlscy9kcm9uZVNxdWFkcm9uRW5naW5lJztcbmltcG9ydCB7IE1vdGhlckNhdE1lbW9yaWFsVmlldyB9IGZyb20gJy4vTW90aGVyQ2F0TWVtb3JpYWxWaWV3JztcblxuZXhwb3J0IGNvbnN0IFNlbnRpbmVsV2F0Y2hkb2dCb3RQYW5lbDogUmVhY3QuRkMgPSAoKSA9PiB7XG4gIGNvbnN0IFtib3RTdGF0ZSwgc2V0Qm90U3RhdGVdID0gdXNlU3RhdGU8U2VudGluZWxCb3RTdGF0ZT4oKCkgPT4gc2VudGluZWxCb3RFbmdpbmUuZ2V0U3RhdGUoKSk7XG4gIGNvbnN0IFtzZW5zb3JzLCBzZXRTZW5zb3JzXSA9IHVzZVN0YXRlPEduaWRhU2Vuc29yUHJvYmVbXT4oKCkgPT4gZ25pZGFTZW5zb3JzTWF0cml4LmdldFByb2JlcygpKTtcbiAgY29uc3QgW3JlZEFsZXJ0LCBzZXRSZWRBbGVydF0gPSB1c2VTdGF0ZTxCYXNlUmVkQWxlcnRTdGF0ZT4oKCkgPT4gZ25pZGFTZW5zb3JzTWF0cml4LmdldFJlZEFsZXJ0U3RhdGUoKSk7XG4gIGNvbnN0IFtzcXVhZHJvbiwgc2V0U3F1YWRyb25dID0gdXNlU3RhdGU8RHJvbmVTcXVhZHJvblN0YXRlPigoKSA9PiBkcm9uZVNxdWFkcm9uRW5naW5lLmdldFN0YXRlKCkpO1xuICBjb25zdCBbYWN0aXZlVGFiLCBzZXRBY3RpdmVUYWJdID0gdXNlU3RhdGU8J2Ryb25lcycgfCAna2l0dGVucycgfCAnYm90JyB8ICdzZW5zb3JzJyB8ICdyZXBhaXJzJz4oJ2tpdHRlbnMnKTtcbiAgY29uc3QgW3NlbGVjdGVkRHJvbmUsIHNldFNlbGVjdGVkRHJvbmVdID0gdXNlU3RhdGU8UGF0cm9sRHJvbmVFbnRpdHkgfCBudWxsPihudWxsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHVuc3ViQm90ID0gc2VudGluZWxCb3RFbmdpbmUuc3Vic2NyaWJlKHNldEJvdFN0YXRlKTtcbiAgICBjb25zdCB1bnN1YlNlbnNvcnMgPSBnbmlkYVNlbnNvcnNNYXRyaXguc3Vic2NyaWJlKChwcm9iZXMsIGFsZXJ0KSA9PiB7XG4gICAgICBzZXRTZW5zb3JzKHByb2Jlcyk7XG4gICAgICBzZXRSZWRBbGVydChhbGVydCk7XG4gICAgfSk7XG4gICAgY29uc3QgdW5zdWJEcm9uZXMgPSBkcm9uZVNxdWFkcm9uRW5naW5lLnN1YnNjcmliZShzZXRTcXVhZHJvbik7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHVuc3ViQm90KCk7XG4gICAgICB1bnN1YlNlbnNvcnMoKTtcbiAgICAgIHVuc3ViRHJvbmVzKCk7XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGdldFN0YXR1c0JhZGdlID0gKHN0YXR1czogU2VudGluZWxCb3RTdGF0dXMpID0+IHtcbiAgICBzd2l0Y2ggKHN0YXR1cykge1xuICAgICAgY2FzZSAnU0NBTk5JTkcnOlxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0zIHB5LTEgcm91bmRlZC1mdWxsIGJnLWVtZXJhbGQtOTUwIGJvcmRlciBib3JkZXItZW1lcmFsZC01MDAvODAgdGV4dC1lbWVyYWxkLTMwMCBmb250LW1vbm8gdGV4dC14cyBmb250LWJvbGQgYW5pbWF0ZS1wdWxzZVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0yIGgtMiByb3VuZGVkLWZ1bGwgYmctZW1lcmFsZC00MDBcIj48L3NwYW4+XG4gICAgICAgICAgICA8c3Bhbj5DScSER8WBRSBTS0FOT1dBTklFIEFLVFlXTkU8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgICBjYXNlICdERUZFQ1RfREVURUNURUQnOlxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0zIHB5LTEgcm91bmRlZC1mdWxsIGJnLWFtYmVyLTk1MCBib3JkZXIgYm9yZGVyLWFtYmVyLTUwMCB0ZXh0LWFtYmVyLTMwMCBmb250LW1vbm8gdGV4dC14cyBmb250LWJvbGQgYW5pbWF0ZS1ib3VuY2VcIj5cbiAgICAgICAgICAgIDxBbGVydFRyaWFuZ2xlIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgIDxzcGFuPldZS1JZVE8gVVNaS09EWkVOSUUgLyBBTk9NQUxJxJg8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgICBjYXNlICdBVVRPX1JFUEFJUklORyc6XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTMgcHktMSByb3VuZGVkLWZ1bGwgYmctY3lhbi05NTAgYm9yZGVyIGJvcmRlci1jeWFuLTQwMCB0ZXh0LWN5YW4tMjAwIGZvbnQtbW9ubyB0ZXh0LXhzIGZvbnQtYm9sZCBzaGFkb3ctbGcgc2hhZG93LWN5YW4tOTUwXCI+XG4gICAgICAgICAgICA8UmVmcmVzaEN3IGNsYXNzTmFtZT1cInctMy41IGgtMy41IGFuaW1hdGUtc3BpbiB0ZXh0LWN5YW4tMzAwXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPk5BVFlDSE1JQVNUT1dBIEFVVE9OQVBSQVdBIFcgVE9LVS4uLjwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICAgIGNhc2UgJ1JFUEFJUkVEX0hFQUxUSFknOlxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0zIHB5LTEgcm91bmRlZC1mdWxsIGJnLWVtZXJhbGQtOTAwIGJvcmRlciBib3JkZXItZW1lcmFsZC00MDAgdGV4dC13aGl0ZSBmb250LW1vbm8gdGV4dC14cyBmb250LWJvbGRcIj5cbiAgICAgICAgICAgIDxDaGVja0NpcmNsZTIgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1lbWVyYWxkLTMwMFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5OQVBSQVdJT05PIChJTlRFR1JBTE5PxZrEhiBQUlpZV1LDk0NPTkEpPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgICAgY2FzZSAnUEFVU0VEJzpcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgcHgtMyBweS0xIHJvdW5kZWQtZnVsbCBiZy1zbGF0ZS04MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS02MDAgdGV4dC1zbGF0ZS00MDAgZm9udC1tb25vIHRleHQteHMgZm9udC1ib2xkXCI+XG4gICAgICAgICAgICA8UGF1c2UgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgPHNwYW4+U0tBTk9XQU5JRSBXU1RSWllNQU5FPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS02XCI+XG4gICAgICBcbiAgICAgIHsvKiAxLiBUT1AgUk9CT1QgSEVSTyAmIFJFQUwtVElNRSBTVEFUVVMgQ0FSRCAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC02IHJvdW5kZWQtM3hsIGJnLWdyYWRpZW50LXRvLWJyIGZyb20tc2xhdGUtOTAwIHZpYS1pbmRpZ28tOTUwLzQwIHRvLXNsYXRlLTkwMCBib3JkZXItMiBib3JkZXItaW5kaWdvLTUwMC80MCBzaGFkb3ctMnhsIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICBcbiAgICAgICAgey8qIEFtYmllbnQgYmFja2dyb3VuZCBnbG93ICYgc2NhbmxpbmUgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTAgcmlnaHQtMCB3LTk2IGgtOTYgYmctaW5kaWdvLTYwMC8xMCByb3VuZGVkLWZ1bGwgYmx1ci0zeGwgcG9pbnRlci1ldmVudHMtbm9uZVwiIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLTAgbGVmdC0wIHctODAgaC04MCBiZy1jeWFuLTYwMC8xMCByb3VuZGVkLWZ1bGwgYmx1ci0zeGwgcG9pbnRlci1ldmVudHMtbm9uZVwiIC8+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSB6LTEwIGZsZXggZmxleC1jb2wgbGc6ZmxleC1yb3cgaXRlbXMtc3RhcnQgbGc6aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNlwiPlxuICAgICAgICAgIFxuICAgICAgICAgIHsvKiBSb2JvdCBWaXN1YWwgSWRlbnRpdHkgJiBTY2FubmVyIEF2YXRhciAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC00XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XG4gICAgICAgICAgICAgIHsvKiBSb3RhdGluZyBSYWRhciBSaW5ncyAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTE2IGgtMTYgc206dy0yMCBzbTpoLTIwIHJvdW5kZWQtMnhsIGJnLXNsYXRlLTk1MCBib3JkZXItMiBib3JkZXItaW5kaWdvLTQwMC84MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBzaGFkb3cteGwgc2hhZG93LWluZGlnby05NTAvNjAgcmVsYXRpdmUgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgICAgICAgICAgPEJvdCBjbGFzc05hbWU9e2B3LTkgaC05IHNtOnctMTEgc206aC0xMSAke1xuICAgICAgICAgICAgICAgICAgYm90U3RhdGUuc3RhdHVzID09PSAnQVVUT19SRVBBSVJJTkcnIFxuICAgICAgICAgICAgICAgICAgICA/ICd0ZXh0LWN5YW4tMzAwIGFuaW1hdGUtcHVsc2UnIFxuICAgICAgICAgICAgICAgICAgICA6IGJvdFN0YXRlLnN0YXR1cyA9PT0gJ0RFRkVDVF9ERVRFQ1RFRCcgXG4gICAgICAgICAgICAgICAgICAgID8gJ3RleHQteWVsbG93LTQwMCBhbmltYXRlLWJvdW5jZScgXG4gICAgICAgICAgICAgICAgICAgIDogJ3RleHQtaW5kaWdvLTQwMCdcbiAgICAgICAgICAgICAgICB9YH0gLz5cbiAgICAgICAgICAgICAgICB7LyogTGFzZXIgc2NhbiBiZWFtIHN3ZWVwICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1ncmFkaWVudC10by1iIGZyb20tdHJhbnNwYXJlbnQgdmlhLWN5YW4tNDAwLzIwIHRvLXRyYW5zcGFyZW50IGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgey8qIEhlYWx0aCBJbmRpY2F0b3IgUGluZyAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSAtdG9wLTEgLXJpZ2h0LTEgdy00IGgtNCByb3VuZGVkLWZ1bGwgYmctZW1lcmFsZC01MDAgYm9yZGVyLTIgYm9yZGVyLXNsYXRlLTk1MCBzaGFkb3ctbWQgYW5pbWF0ZS1waW5nXCIgLz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSAtdG9wLTEgLXJpZ2h0LTEgdy00IGgtNCByb3VuZGVkLWZ1bGwgYmctZW1lcmFsZC01MDAgYm9yZGVyLTIgYm9yZGVyLXNsYXRlLTk1MFwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMi41IGZsZXgtd3JhcFwiPlxuICAgICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LXhsIHNtOnRleHQtMnhsIGZvbnQtYmxhY2sgdGV4dC13aGl0ZSBmb250LW1vbm8gdHJhY2tpbmctdGlnaHQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPkFVVE9OT01JQ1pOWSBST0JPVCBTVFJBxbtOSUsgJiBXQVRDSERPRzwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IHJvdW5kZWQgYmctaW5kaWdvLTk1MCB0ZXh0LWluZGlnby0zMDAgYm9yZGVyIGJvcmRlci1pbmRpZ28tNzAwLzYwIGZvbnQtbW9ubyB0ZXh0LVsxMHB4XSBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgIEFVVE9OT01PVVMgU0VMRi1IRUFMSU5HIHYzLjBcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHNtOnRleHQtc20gdGV4dC1zbGF0ZS00MDAgbXQtMSBtYXgtdy0yeGwgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgICAgUm9ib3QgbmlldXN0YW5uaWUgbW9uaXRvcnVqZSBzdGFuIGFwbGlrYWNqaSwgaW50ZWdyYWxub8WbxIcgbG9nw7N3LCBwYW1pxJnEhyBpIHfEmXrFgnkgSS9PLiBQbyB6bG9rYWxpem93YW5pdSBixYLEmWR1LCB1c3prb2R6b25lZ28gcmVrb3JkdSBsdWIgYW5vbWFsaWkgPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LWN5YW4tMzAwXCI+bmF0eWNobWlhc3Qgcm96cG9jenluYSBuYXByYXfEmTwvc3Ryb25nPiwgYSBwbyB6YWtvxYRjemVuaXUgPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtMzAwXCI+cMWCeW5uaWUga29udHludXVqZSBza2Fub3dhbmllPC9zdHJvbmc+LlxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBRdWljayBBY3Rpb25zICYgU3RhdHVzIEJhZGdlICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBsZzpmbGV4LWNvbCBpdGVtcy1zdGFydCBzbTppdGVtcy1jZW50ZXIgbGc6aXRlbXMtZW5kIGdhcC0zIHctZnVsbCBsZzp3LWF1dG9cIj5cbiAgICAgICAgICAgIHtnZXRTdGF0dXNCYWRnZShib3RTdGF0ZS5zdGF0dXMpfVxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgIHtib3RTdGF0ZS5pc1J1bm5pbmcgPyAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2VudGluZWxCb3RFbmdpbmUuc3RvcCgpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMy41IHB5LTEuNSByb3VuZGVkLXhsIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0zMDAgZm9udC1tb25vIHRleHQteHMgZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxQYXVzZSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5Xc3RyenltYWo8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2VudGluZWxCb3RFbmdpbmUuc3RhcnQoKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMuNSBweS0xLjUgcm91bmRlZC14bCBiZy1lbWVyYWxkLTYwMCBob3ZlcjpiZy1lbWVyYWxkLTUwMCB0ZXh0LXdoaXRlIGZvbnQtbW9ubyB0ZXh0LXhzIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHNoYWRvdy1tZCBzaGFkb3ctZW1lcmFsZC05NTAgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxQbGF5IGNsYXNzTmFtZT1cInctMy41IGgtMy41IGZpbGwtd2hpdGVcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+V3puw7N3IFNrYW5vd2FuaWU8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNlbnRpbmVsQm90RW5naW5lLmluamVjdFNpbXVsYXRlZERlZmVjdCgnQ09SUlVQVEVEX0xPR19FTlRSWScpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMuNSBweS0xLjUgcm91bmRlZC14bCBiZy1jeWFuLTYwMCBob3ZlcjpiZy1jeWFuLTUwMCB0ZXh0LXdoaXRlIGZvbnQtbW9ubyB0ZXh0LXhzIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHNoYWRvdy1tZCBzaGFkb3ctY3lhbi05NTAgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgIHRpdGxlPVwiV3N0cnp5a25paiB1c3prb2R6ZW5pZSBpIHpvYmFjeiBqYWsgcm9ib3QgbmF0eWNobWlhc3QgbmFwcmF3aWEgaSB3em5hd2lhIHNrYW5vd2FuaWVcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPFphcCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+VGVzdCBTYW1vbmFwcmF3eTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogMi4gUkVBTC1USU1FIFRFTEVNRVRSWSBNRVRSSUNTIEdSSUQgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBzbTpncmlkLWNvbHMtNCBnYXAtMyBtdC02IHB0LTUgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMCBmb250LW1vbm8gdGV4dC14c1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQtMnhsIGJnLXNsYXRlLTk1MC84MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCB0ZXh0LVsxMXB4XVwiPkNZS0xFIFNLQU5PV0FOSUEgUk9CT1RBPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteGwgc206dGV4dC0yeGwgZm9udC1ibGFjayB0ZXh0LWluZGlnby00MDAgbXQtMVwiPntib3RTdGF0ZS5zY2FuQ3ljbGVzfTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTUwMCBtdC0wLjVcIj5DesSZc3RvdGxpd2/Fm8SHIH4yLjUgSHo8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQtMnhsIGJnLXNsYXRlLTk1MC84MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCB0ZXh0LVsxMXB4XVwiPldZS1JZVEUgVVNaS09EWkVOSUE8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14bCBzbTp0ZXh0LTJ4bCBmb250LWJsYWNrIHRleHQtYW1iZXItNDAwIG10LTFcIj57Ym90U3RhdGUuZGVmZWN0c0RldGVjdGVkQ291bnR9PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNTAwIG10LTAuNVwiPkxvZ2kgLyBKU09OIC8gUGFtacSZxIc8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQtMnhsIGJnLXNsYXRlLTk1MC84MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhsIHNtOnRleHQtMnhsIGZvbnQtYmxhY2sgdGV4dC1lbWVyYWxkLTQwMCBtdC0xXCI+e2JvdFN0YXRlLmF1dG9SZXBhaXJzQ29tcGxldGVkQ291bnR9PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIHRleHQtWzExcHhdIC1vcmRlci0xXCI+V1lLT05BTkUgU0FNT05BUFJBV1k8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS01MDAgbXQtMC41XCI+MTAwJSBTa3V0ZWN6bm/Fm2NpPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyByb3VuZGVkLTJ4bCBiZy1zbGF0ZS05NTAvODAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgdGV4dC1bMTFweF1cIj5XU0tBxblOSUsgWkRST1dJQSBCQVpZPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteGwgc206dGV4dC0yeGwgZm9udC1ibGFjayB0ZXh0LWN5YW4tMzAwIG10LTFcIj57Ym90U3RhdGUuc3lzdGVtSGVhbHRoSW5kZXh9JTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LWVtZXJhbGQtNDAwIG10LTAuNVwiPlN0YXR1czogT3B0eW1hbG55PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBDdXJyZW50IExpdmUgSW5zcGVjdGlvbiBGZWVkIEJhbm5lciAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC00IHAtMyByb3VuZGVkLTJ4bCBiZy1zbGF0ZS05NTAvOTAgYm9yZGVyIGJvcmRlci1pbmRpZ28tNTAwLzMwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMyB0ZXh0LXhzIGZvbnQtbW9ub1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1pbmRpZ28tMzAwXCI+XG4gICAgICAgICAgICA8QWN0aXZpdHkgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWN5YW4tNDAwIGFuaW1hdGUtcHVsc2Ugc2hyaW5rLTBcIiAvPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDBcIj5Ba3R1YWxuaWUgYmFkYW55IHdla3Rvcjo8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlIGZvbnQtYm9sZFwiPntib3RTdGF0ZS5jdXJyZW50SW5zcGVjdGlvblRhcmdldH08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoaWRkZW4gc206ZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB0ZXh0LWVtZXJhbGQtNDAwIHRleHQtWzExcHhdXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTEuNSBoLTEuNSByb3VuZGVkLWZ1bGwgYmctZW1lcmFsZC00MDAgYW5pbWF0ZS1waW5nXCI+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4+QmV6IHpha8WCw7NjZcWEPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBOYXZpZ2F0aW9uIFN1Yi1UYWJzOiAxLiBEcm9ueS1Lb3RraSAmIFBvbW5payBNYW15IHwgMi4gRXNrYWRyYSAyMCBEcm9uw7N3IHwgMy4gU3RhbiBSb2JvdGEgJiBUZXN0eSB8IDQuIE1hdHJ5Y2EgQ3p1am5pa8OzdyB8IDUuIER6aWVubmlrIE5hcHJhdyAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMCBwYi0yIG92ZXJmbG93LXgtYXV0b1wiPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCdraXR0ZW5zJyl9XG4gICAgICAgICAgY2xhc3NOYW1lPXtgcHgtNCBweS0yIHJvdW5kZWQteGwgdGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyIHNocmluay0wICR7XG4gICAgICAgICAgICBhY3RpdmVUYWIgPT09ICdraXR0ZW5zJ1xuICAgICAgICAgICAgICA/ICdiZy1hbWJlci02MDAgdGV4dC13aGl0ZSBzaGFkb3ctbWQgc2hhZG93LWFtYmVyLTk1MCByaW5nLTEgcmluZy1hbWJlci00MDAnXG4gICAgICAgICAgICAgIDogJ3RleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUgaG92ZXI6Ymctc2xhdGUtOTAwJ1xuICAgICAgICAgIH1gfVxuICAgICAgICA+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1iYXNlXCI+8J+QsTwvc3Bhbj5cbiAgICAgICAgICA8c3Bhbj5Ecm9ueS1Lb3RraSDigJ5Vc3XFhCBHbmlkxJnigJ0gJiBQb21uaWsgTWFteTwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0xLjUgcHktMC41IHJvdW5kZWQgYmctYmxhY2svNTAgdGV4dC1bMTBweF0gdGV4dC1hbWJlci0zMDBcIj5cbiAgICAgICAgICAgIMWaTUlFUlRFTE5ZIFdaUk9LXG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCdkcm9uZXMnKX1cbiAgICAgICAgICBjbGFzc05hbWU9e2BweC00IHB5LTIgcm91bmRlZC14bCB0ZXh0LXhzIGZvbnQtbW9ubyBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgc2hyaW5rLTAgJHtcbiAgICAgICAgICAgIGFjdGl2ZVRhYiA9PT0gJ2Ryb25lcydcbiAgICAgICAgICAgICAgPyAnYmctY3lhbi02MDAgdGV4dC13aGl0ZSBzaGFkb3ctbWQgc2hhZG93LWN5YW4tOTUwJ1xuICAgICAgICAgICAgICA6ICd0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlIGhvdmVyOmJnLXNsYXRlLTkwMCdcbiAgICAgICAgICB9YH1cbiAgICAgICAgPlxuICAgICAgICAgIDxOYXZpZ2F0aW9uIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1jeWFuLTMwMCBhbmltYXRlLXNwaW5cIiBzdHlsZT17eyBhbmltYXRpb25EdXJhdGlvbjogJzZzJyB9fSAvPlxuICAgICAgICAgIDxzcGFuPkVza2FkcmEgMjAgRHJvbsOzdyBQYXRyb2x1asSFY3ljaDwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0xLjUgcHktMC41IHJvdW5kZWQgYmctYmxhY2svNTAgdGV4dC1bMTBweF0gdGV4dC1jeWFuLTIwMFwiPlxuICAgICAgICAgICAgMjAvMjAgQUtUWVdORVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYignYm90Jyl9XG4gICAgICAgICAgY2xhc3NOYW1lPXtgcHgtNCBweS0yIHJvdW5kZWQteGwgdGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyIHNocmluay0wICR7XG4gICAgICAgICAgICBhY3RpdmVUYWIgPT09ICdib3QnXG4gICAgICAgICAgICAgID8gJ2JnLWluZGlnby02MDAgdGV4dC13aGl0ZSBzaGFkb3ctbWQgc2hhZG93LWluZGlnby05NTAnXG4gICAgICAgICAgICAgIDogJ3RleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUgaG92ZXI6Ymctc2xhdGUtOTAwJ1xuICAgICAgICAgIH1gfVxuICAgICAgICA+XG4gICAgICAgICAgPEJvdCBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICA8c3Bhbj5TdGFuIFJvYm90YSAmIFRlc3R5IFNhbW9uYXByYXd5PC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCdzZW5zb3JzJyl9XG4gICAgICAgICAgY2xhc3NOYW1lPXtgcHgtNCBweS0yIHJvdW5kZWQteGwgdGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyIHNocmluay0wICR7XG4gICAgICAgICAgICBhY3RpdmVUYWIgPT09ICdzZW5zb3JzJ1xuICAgICAgICAgICAgICA/ICdiZy1yZWQtNjAwIHRleHQtd2hpdGUgc2hhZG93LW1kIHNoYWRvdy1yZWQtOTUwJ1xuICAgICAgICAgICAgICA6ICd0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlIGhvdmVyOmJnLXNsYXRlLTkwMCdcbiAgICAgICAgICB9YH1cbiAgICAgICAgPlxuICAgICAgICAgIDxTaGllbGRBbGVydCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQteWVsbG93LTMwMCBhbmltYXRlLXB1bHNlXCIgLz5cbiAgICAgICAgICA8c3Bhbj5NYXRyeWNhIEN6dWpuaWvDs3cgR25pZCAoQ3plcndvbnkgQWxhcm0gJiBTeXJlbmEpPC9zcGFuPlxuICAgICAgICAgIHtzZW5zb3JzLnNvbWUocyA9PiBzLnRyaXBwZWQpICYmIChcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTEuNSBweS0wLjIgcm91bmRlZCBiZy1yZWQtOTUwIGJvcmRlciBib3JkZXItcmVkLTUwMCB0ZXh0LXJlZC0yMDAgdGV4dC1bMTBweF1cIj5cbiAgICAgICAgICAgICAgQUxBUk1cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICApfVxuICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCdyZXBhaXJzJyl9XG4gICAgICAgICAgY2xhc3NOYW1lPXtgcHgtNCBweS0yIHJvdW5kZWQteGwgdGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyIHNocmluay0wICR7XG4gICAgICAgICAgICBhY3RpdmVUYWIgPT09ICdyZXBhaXJzJ1xuICAgICAgICAgICAgICA/ICdiZy1lbWVyYWxkLTYwMCB0ZXh0LXdoaXRlIHNoYWRvdy1tZCBzaGFkb3ctZW1lcmFsZC05NTAnXG4gICAgICAgICAgICAgIDogJ3RleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUgaG92ZXI6Ymctc2xhdGUtOTAwJ1xuICAgICAgICAgIH1gfVxuICAgICAgICA+XG4gICAgICAgICAgPEZpbGVUZXh0IGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgIDxzcGFuPkR6aWVubmlrIE5hcHJhdyAoe2JvdFN0YXRlLnJlcGFpckhpc3RvcnkubGVuZ3RofSk8L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBUQUI6IERST05ZLUtPVEtJIOKAnlVTVcWDIEdOSUTEmOKAnSAmIFBPTU5JSyBCT0hBVEVSU0tJRUogTUFNWSBLT1RLSSAqL31cbiAgICAgIHthY3RpdmVUYWIgPT09ICdraXR0ZW5zJyAmJiAoXG4gICAgICAgIDxNb3RoZXJDYXRNZW1vcmlhbFZpZXcgLz5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBUQUIgMDogRVNLQURSQSAyMCBEUk9Ow5NXIFBBVFJPTFVKxIRDWUNIIE1JxJhEWlkgQVBMSUtBQ0pBTUkgKi99XG4gICAgICB7YWN0aXZlVGFiID09PSAnZHJvbmVzJyAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS02XCI+XG4gICAgICAgICAgXG4gICAgICAgICAgey8qIFNxdWFkcm9uIENvbW1hbmQgSGVhZGVyICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC02IHJvdW5kZWQtM3hsIGJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLWN5YW4tNTAwLzQwIHNoYWRvdy0yeGwgc3BhY2UteS00XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgbGc6ZmxleC1yb3cgaXRlbXMtc3RhcnQgbGc6aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNFwiPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgZmxleC13cmFwXCI+XG4gICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LWJsYWNrIHRleHQtd2hpdGUgZm9udC1tb25vIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxOYXZpZ2F0aW9uIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1jeWFuLTQwMCBhbmltYXRlLXB1bHNlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+Q0VOVFJVTSBET1dPRFpFTklBIEVTS0FEUsSEIDIwIERST07Dk1cgUEFUUk9MVUrEhENZQ0g8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMiBweS0wLjUgcm91bmRlZCBiZy1jeWFuLTk1MCB0ZXh0LWN5YW4tMzAwIGJvcmRlciBib3JkZXItY3lhbi01MDAgdGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkXCI+XG4gICAgICAgICAgICAgICAgICAgIDIwIERST07Dk1cgVyBDScSER8WBWU0gTE9DSUVcbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtMzAwIGZvbnQtc2FucyBtdC0xIG1heC13LTN4bCBsZWFkaW5nLXJlbGF4ZWRcIj5cbiAgICAgICAgICAgICAgICAgIDIwIGF1dG9ub21pY3pueWNoIGRyb27Ds3cgcGF0cm9sdWplIHRlcmVuIGkgcHJ6ZW1pZXN6Y3phIHNpxJkgc3dvYm9kbmllIG1pxJlkenkgYXBsaWthY2phbWksIHByYWN1asSFYyB3IHRsZS4gU2thbnVqxIUga29kIHcgcG9zenVraXdhbml1IHVzemtvZHplxYQsIGF1ZHl0dWrEhSBsb2dpIG9yYXogdHJvcGnEhSBnbmlkeS4gPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LXJlZC00MDAgZm9udC1ib2xkXCI+Um96cG96bmFuaWUgZ25pZHkgaW5pY2p1amUgYXV0b21hdHljem55IGF0YWsgd2nEhXprxIUgcGxhem1vd8SFIDk0MC44IFRIeiBpIHBlcm1hbmVudG7EhSBpbmFrdHl3YWNqxJkgKFBFIE1aIHdpcGUgKyBOdFN1c3BlbmQgdyBSQU0gMG1zICsgYmxva2FkYSBBQ0wpPC9zdHJvbmc+LlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIFNxdWFkcm9uIENvbnRyb2xzICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGZsZXgtd3JhcCBzaHJpbmstMFwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGRyb25lU3F1YWRyb25FbmdpbmUuc2V0U3F1YWRyb25Nb2RlKCdBVVRPTk9NT1VTX0lOVEVSX0FQUF9QQVRST0wnKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTMgcHktMS41IHJvdW5kZWQteGwgZm9udC1tb25vIHRleHQteHMgZm9udC1ib2xkIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgICAgICAgIHNxdWFkcm9uLnNxdWFkcm9uTW9kZSA9PT0gJ0FVVE9OT01PVVNfSU5URVJfQVBQX1BBVFJPTCdcbiAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1pbmRpZ28tNjAwIHRleHQtd2hpdGUgc2hhZG93LW1kIHNoYWRvdy1pbmRpZ28tOTUwJ1xuICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlJ1xuICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgU3dvYm9kbnkgUGF0cm9sIChBcHBzKVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gZHJvbmVTcXVhZHJvbkVuZ2luZS5zZXRTcXVhZHJvbk1vZGUoJ0RFRkVOU0lWRV9TV0FSTScpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMyBweS0xLjUgcm91bmRlZC14bCBmb250LW1vbm8gdGV4dC14cyBmb250LWJvbGQgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgICAgICAgICAgc3F1YWRyb24uc3F1YWRyb25Nb2RlID09PSAnREVGRU5TSVZFX1NXQVJNJ1xuICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWN5YW4tNjAwIHRleHQtd2hpdGUgc2hhZG93LW1kIHNoYWRvdy1jeWFuLTk1MCdcbiAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS04MDAgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSdcbiAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIEZvcm1hY2phIFJvanUgQmF6eVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gZHJvbmVTcXVhZHJvbkVuZ2luZS50cmFuc2xvY2F0ZUFsbERyb25lc091dHNpZGVCYXNlKCl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zIHB5LTEuNSByb3VuZGVkLXhsIGJnLXB1cnBsZS05MDAvOTAgaG92ZXI6YmctcHVycGxlLTgwMCBib3JkZXIgYm9yZGVyLXB1cnBsZS01MDAvNjAgdGV4dC1wdXJwbGUtMjAwIGZvbnQtbW9ubyB0ZXh0LXhzIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHNoYWRvdy1sZyBzaGFkb3ctcHVycGxlLTk1MCBjdXJzb3ItcG9pbnRlciBhY3RpdmU6c2NhbGUtOTUgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgICAgICAgdGl0bGU9XCJUcmFuc2xva2FjamEga3dhbnRvd2Egd3N6eXN0a2ljaCBkcm9uw7N3IG5hIHpld27EhXRyeiBiYXp5IChwcnplbmlrYW5pZSBiZXogbmFydXN6ZW5pYSB0YXJjenksIHBvd3LDs3QgZml6eWN6bmllIG5pZW1vxbxsaXd5KVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPFJhZGlvIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtcHVycGxlLTMwMCBhbmltYXRlLXNwaW5cIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+VHJhbnNsb2thY2phIHBvemEgQmF6xJkgKEJlenp3cm90bmEpPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gZHJvbmVTcXVhZHJvbkVuZ2luZS5lbmdhZ2VBbmRQZXJtYW5lbnRseUluYWN0aXZhdGVHbmlkYSgnc3RlYWx0aF9vdmVybGF5X2duaWRhLnN5cycpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMy41IHB5LTEuNSByb3VuZGVkLXhsIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1yZWQtNjAwIHRvLXJvc2UtNjAwIGhvdmVyOmZyb20tcmVkLTUwMCBob3Zlcjp0by1yb3NlLTUwMCB0ZXh0LXdoaXRlIGZvbnQtbW9ubyB0ZXh0LXhzIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHNoYWRvdy1sZyBzaGFkb3ctcmVkLTk1MCBjdXJzb3ItcG9pbnRlciBhY3RpdmU6c2NhbGUtOTUgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxDcm9zc2hhaXIgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXllbGxvdy0zMDBcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+V3ltdcWbIEF0YWsgaSBJbmFrdHl3YWNqxJk8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBUYWN0aWNhbCBUcmFuc2xvY2F0aW9uIERvY3RyaW5lIEJveCAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQtMnhsIGJnLXB1cnBsZS05NTAvNDAgYm9yZGVyIGJvcmRlci1wdXJwbGUtNTAwLzQwIHRleHQteHMgZm9udC1tb25vIHRleHQtcHVycGxlLTIwMCBmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IGl0ZW1zLXN0YXJ0IHNtOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTNcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxSYWRpbyBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcHVycGxlLTQwMCBzaHJpbmstMCBhbmltYXRlLXB1bHNlXCIgLz5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtd2hpdGVcIj5ET0tUUllOQSBUUkFOU0xPS0FDSkkgSkVETk9LSUVSVU5LT1dFSjo8L3NwYW4+eycgJ31cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcHVycGxlLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgICBEcm9ueSBwcnplbmlrYWrEhSBwb3phIGJhcmllcsSZIG1ldG9kxIUgdHVuZWxvd2FuaWEga3dhbnRvd2VnbyBiZXogbmFqbW5pZWpzemVnbyBvc8WCYWJpZW5pYSB0YXJjenkuIFpnb2RuaWUgeiBmaXp5a8SFIGhla3NhZ29uYWxuZWogYmFyaWVyeSA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtYW1iZXItMzAwXCI+cG93csOzdCBuYSBsdWIgbmFkIHRlcmVuIGJhenkgamVzdCBiZXp3emdsxJlkbmllIG5pZW1vxbxsaXd5PC9zdHJvbmc+LlxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMiBweS0xIHJvdW5kZWQgYmctcHVycGxlLTkwMC84MCBib3JkZXIgYm9yZGVyLXB1cnBsZS00MDAgdGV4dC1bMTBweF0gdGV4dC1wdXJwbGUtMTAwIGZvbnQtYm9sZCBzaHJpbmstMFwiPlxuICAgICAgICAgICAgICAgIFNXRUVQIFBSWkVEUE9MRVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIFNxdWFkcm9uIENvdW50ZXJzIEJhciAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBzbTpncmlkLWNvbHMtNCBnYXAtMyBwdC00IGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDAgZm9udC1tb25vIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMgcm91bmRlZC0yeGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCB0ZXh0LVsxMHB4XVwiPkxJQ1pCQSBEUk9Ow5NXIFcgQkFaSUU8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ibGFjayB0ZXh0LWN5YW4tMzAwIG10LTAuNVwiPjIwIC8gMjA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtZW1lcmFsZC00MDBcIj4xMDAlIHNwcmF3bm/Fm2NpIG9wZXJhY3lqbmVqPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQtMnhsIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgdGV4dC1bMTBweF1cIj5TRUtUT1JZIC8gQVBMSUtBQ0pFPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYmxhY2sgdGV4dC1pbmRpZ28tNDAwIG10LTAuNVwiPntzcXVhZHJvbi5zZWN0b3JzQ292ZXJlZC5sZW5ndGh9IEFwbGlrYWNqaTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDBcIj5EV00sIFZTQ29kZSwgU2FuZGJveCwgUkFNPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQtMnhsIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgdGV4dC1bMTBweF1cIj5OQVBSQVdJT05FIEtPRFkgSSBMT0dJPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYmxhY2sgdGV4dC1lbWVyYWxkLTQwMCBtdC0wLjVcIj57c3F1YWRyb24udG90YWxDb2RlRGVmZWN0c0ZpeGVkfTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS01MDBcIj5DacSFZ8WCYSBuYXByYXdhIHcgbG9jaWU8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMgcm91bmRlZC0yeGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCB0ZXh0LVsxMHB4XVwiPlBFUk1BTkVOVE5JRSBaTklTWkNaT05FIEdOSURZPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYmxhY2sgdGV4dC1yb3NlLTQwMCBtdC0wLjVcIj57c3F1YWRyb24udG90YWxHbmlkYXNQZXJtYW5lbnRseUluYWN0aXZhdGVkfTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1yZWQtNDAwXCI+UEUgV2lwZSArIE50U3VzcGVuZCAwbXM8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiAyMCBEcm9uZXMgTGl2ZSBHcmlkICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zXCI+XG4gICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJvbGQgdGV4dC13aGl0ZSBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgPEJvdCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtY3lhbi00MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPlRFTEVNRVRSSUEgSSBQT1pZQ0pFIDIwIERST07Dk1cgUEFUUk9MVUrEhENZQ0g8L3NwYW4+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTQwMCBmb250LW5vcm1hbFwiPlxuICAgICAgICAgICAgICAgIEtsaWtuaWogbmEgZHJvbmEsIGFieSB3eWRhxIcgcm96a2F6IG5hdHljaG1pYXN0b3dlZ28gYXRha3VcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9oND5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yIG1kOmdyaWQtY29scy00IGxnOmdyaWQtY29scy01IGdhcC0zXCI+XG4gICAgICAgICAgICAgIHtzcXVhZHJvbi5kcm9uZXMubWFwKChkcm9uZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzQXR0YWNraW5nID0gZHJvbmUubW9kZSA9PT0gJ0VOR0FHSU5HX1RBUkdFVCcgfHwgZHJvbmUubW9kZSA9PT0gJ1BFUk1BTkVOVF9JTkFDVElWQVRJT04nO1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzU2Nhbm5pbmcgPSBkcm9uZS5tb2RlID09PSAnU0NBTk5JTkdfVEVSUkFJTic7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBrZXk9e2Ryb25lLmlkfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgZHJvbmVTcXVhZHJvbkVuZ2luZS5lbmdhZ2VBbmRQZXJtYW5lbnRseUluYWN0aXZhdGVHbmlkYShcbiAgICAgICAgICAgICAgICAgICAgICAgICd0YXJnZXRlZF9zZWN0b3JfZ25pZGEuYmluJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb25lLnNlY3RvcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb25lLngsXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9uZS55XG4gICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC0zLjUgcm91bmRlZC0yeGwgYm9yZGVyIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuIHNwYWNlLXktMiBob3ZlcjpzY2FsZS1bMS4wMl0gYWN0aXZlOnNjYWxlLTk4ICR7XG4gICAgICAgICAgICAgICAgICAgICAgaXNBdHRhY2tpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXJlZC05NTAvOTAgYm9yZGVyLXJlZC00MDAgc2hhZG93LWxnIHNoYWRvdy1yZWQtOTAwLzYwIGFuaW1hdGUtcHVsc2UnXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGlzU2Nhbm5pbmdcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWN5YW4tOTUwLzcwIGJvcmRlci1jeWFuLTUwMC82MCBob3Zlcjpib3JkZXItY3lhbi00MDAnXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05NTAgYm9yZGVyLXNsYXRlLTgwMCBob3Zlcjpib3JkZXItaW5kaWdvLTUwMC82MCdcbiAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1vbm8gZm9udC1ibGFjayB0ZXh0LXdoaXRlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxCb3QgY2xhc3NOYW1lPXtgdy0zLjUgaC0zLjUgJHtpc0F0dGFja2luZyA/ICd0ZXh0LXllbGxvdy0zMDAnIDogJ3RleHQtY3lhbi0zMDAnfWB9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57ZHJvbmUuY2FsbHNpZ24ucmVwbGFjZSgnRFJPTkUtJywgJ0QtJyl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2B3LTIgaC0yIHJvdW5kZWQtZnVsbCAke1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNBdHRhY2tpbmcgPyAnYmctcmVkLTQwMCBhbmltYXRlLXBpbmcnIDogaXNTY2FubmluZyA/ICdiZy1jeWFuLTQwMCcgOiAnYmctZW1lcmFsZC00MDAnXG4gICAgICAgICAgICAgICAgICAgICAgfWB9IC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1tb25vIHNwYWNlLXktMVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jeWFuLTMwMCBmb250LWJvbGQgdHJ1bmNhdGVcIiB0aXRsZT17ZHJvbmUuc2VjdG9yfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtkcm9uZS5zZWN0b3IucmVwbGFjZSgnQXBwOiAnLCAnJyl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCB0ZXh0LVsxMHB4XSB0cnVuY2F0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge2Ryb25lLmFzc2lnbmVkVmVjdG9yfVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0LTIgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMC84MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC1bMTBweF0gZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgJHtpc0F0dGFja2luZyA/ICd0ZXh0LXJlZC0zMDAgZm9udC1ib2xkJyA6ICd0ZXh0LXNsYXRlLTQwMCd9YH0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZHJvbmUubW9kZSA9PT0gJ0VOR0FHSU5HX1RBUkdFVCcgPyAn4pqhIEFUQUsnIDogZHJvbmUubW9kZSA9PT0gJ1BFUk1BTkVOVF9JTkFDVElWQVRJT04nID8gJ/CfkqUgSU5BS1RZV0FDSkEnIDogJ/Cfn6IgUEFUUk9MJ31cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC15ZWxsb3ctNDAwIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAg4pqU77iPIHtkcm9uZS50YXJnZXRzTmV1dHJhbGl6ZWRDb3VudH1cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBTcXVhZHJvbiBSZWNlbnQgRW5nYWdlbWVudHMgSGlzdG9yeSAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNSByb3VuZGVkLTN4bCBiZy1zbGF0ZS05MDAvOTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgc2hhZG93LXhsIHNwYWNlLXktM1wiPlxuICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtd2hpdGUgZm9udC1tb25vIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgIDxBY3Rpdml0eSBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj5EWklFTk5JSyBBS0NKSSBFU0tBRFJZIERST07Dk1cgKEFVVE9OQVBSQVdZIEtPRFUgJiBJTkFLVFlXQUNKRSBHTklEKTwvc3Bhbj5cbiAgICAgICAgICAgIDwvaDQ+XG5cbiAgICAgICAgICAgIHtzcXVhZHJvbi5yZWNlbnRTcXVhZHJvbkVuZ2FnZW1lbnRzLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTYgcm91bmRlZC0yeGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHRleHQtY2VudGVyIGZvbnQtbW9ubyB0ZXh0LXhzIHRleHQtc2xhdGUtNTAwXCI+XG4gICAgICAgICAgICAgICAgMjAgZHJvbsOzdyBwYXRyb2x1amUgdGVyZW4gaSBza2FudWplIGFwbGlrYWNqZSB3IHBvc3p1a2l3YW5pdSB1c3prb2R6ZcWEIGkgYWdyZXNvcsOzdy5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMiBmb250LW1vbm8gdGV4dC14cyBtYXgtaC03MiBvdmVyZmxvdy15LWF1dG8gcHItMVwiPlxuICAgICAgICAgICAgICAgIHtzcXVhZHJvbi5yZWNlbnRTcXVhZHJvbkVuZ2FnZW1lbnRzLm1hcChlbmcgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgaXNLaWxsID0gZW5nLmFjdGlvblR5cGUgPT09ICdHTklEQV9QRVJNQU5FTlRfSU5BQ1RJVkFUSU9OJztcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgIGtleT17ZW5nLmlkfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHAtMyByb3VuZGVkLTJ4bCBib3JkZXIgZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBpdGVtcy1zdGFydCBzbTppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0yICR7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc0tpbGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctcmVkLTk1MC83MCBib3JkZXItcmVkLTUwMC82MCB0ZXh0LXJlZC0yMDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTk1MCBib3JkZXItc2xhdGUtODAwIHRleHQtc2xhdGUtMzAwJ1xuICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMi41IGZsZXgtd3JhcFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgcHgtMiBweS0wLjUgcm91bmRlZCB0ZXh0LVsxMHB4XSBmb250LWJvbGQgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaXNLaWxsID8gJ2JnLXJlZC05MDAgYm9yZGVyIGJvcmRlci1yZWQtNDAwIHRleHQtd2hpdGUnIDogJ2JnLWN5YW4tOTUwIHRleHQtY3lhbi0zMDAgYm9yZGVyIGJvcmRlci1jeWFuLTYwMC81MCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge2lzS2lsbCA/ICdJTkFLVFlXQUNKQSBQRVJNQU5FTlROQScgOiAnQVVUT05BUFJBV0EgS09EVSd9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC13aGl0ZVwiPntlbmcuZHJvbmVDYWxsc2lnbn08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMFwiPnc8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWN5YW4tMzAwIGZvbnQtYm9sZFwiPntlbmcuc2VjdG9yfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1yaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgbXItMlwiPntlbmcudGltZXN0YW1wfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtd2hpdGUgZm9udC1ib2xkXCI+e2VuZy50YXJnZXROYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuXG5cbiAgICAgIHsvKiBUQUIgMTogUk9CT1QgU1RBVEUgJiBTRUxGLUhFQUxJTkcgU0lNVUxBVElPTiBMQUIgKi99XG4gICAgICB7YWN0aXZlVGFiID09PSAnYm90JyAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS02XCI+XG4gICAgICAgICAgXG4gICAgICAgICAgey8qIERlZmVjdCBJbmplY3Rpb24gTGFiICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC01IHJvdW5kZWQtM3hsIGJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBzaGFkb3cteGwgc3BhY2UteS00XCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIGZvbnQtbW9ubyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxaYXAgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXllbGxvdy00MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPkxBQk9SQVRPUklVTSBURVNUw5NXIFNBTU9OQVBSQVdZIFJPQk9UQTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTQwMCBtdC0xXCI+XG4gICAgICAgICAgICAgICAgV3N0cnp5a25paiB3eWJyYW5lIHVzemtvZHplbmllLCBhYnkgcHJ6ZXRlc3Rvd2HEhyByZWFrY2rEmSByb2JvdGE6IG5hdHljaG1pYXN0b3dlIHpsb2thbGl6b3dhbmllIGLFgsSZZHUsIG5hcHJhd8SZIHcgJmx0OzE1MG1zIG9yYXogcMWCeW5uxIUga29udHludWFjasSZIHNrYW5vd2FuaWEuXG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTMgZ2FwLTMgZm9udC1tb25vIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNlbnRpbmVsQm90RW5naW5lLmluamVjdFNpbXVsYXRlZERlZmVjdCgnQ09SUlVQVEVEX0xPR19FTlRSWScpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLTJ4bCBiZy1zbGF0ZS05NTAgaG92ZXI6Ymctc2xhdGUtODAwIGJvcmRlciBib3JkZXItYW1iZXItNTAwLzQwIHRleHQtbGVmdCB0cmFuc2l0aW9uLWFsbCBob3ZlcjpzY2FsZS1bMS4wMV0gYWN0aXZlOnNjYWxlLTk4IGN1cnNvci1wb2ludGVyIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuIHNwYWNlLXktM1wiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC1hbWJlci00MDAgZm9udC1ib2xkIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+MS4gVVNaS09EWkVOSUUgV1BJU1UgTE9HQTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPEZpbGVUZXh0IGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMCBtdC0xXCI+XG4gICAgICAgICAgICAgICAgICAgIFdzdGF3aWEgdXN6a29kem9ueSByZWtvcmQgeiBudWxsIC8gdW5wYXJzZWFibGUgcGF5bG9hZCBkbyBkemllbm5pa2EgemRhcnplxYQuXG4gICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LWN5YW4tMzAwIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+V3N0cnp5a25paiAmIFByemV0ZXN0dWogUm9ib3RhICZyYXJyOzwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNlbnRpbmVsQm90RW5naW5lLmluamVjdFNpbXVsYXRlZERlZmVjdCgnQlJPS0VOX0xPQ0FMU1RPUkFHRV9KU09OJyl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQtMnhsIGJnLXNsYXRlLTk1MCBob3ZlcjpiZy1zbGF0ZS04MDAgYm9yZGVyIGJvcmRlci1wdXJwbGUtNTAwLzQwIHRleHQtbGVmdCB0cmFuc2l0aW9uLWFsbCBob3ZlcjpzY2FsZS1bMS4wMV0gYWN0aXZlOnNjYWxlLTk4IGN1cnNvci1wb2ludGVyIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuIHNwYWNlLXktM1wiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC1wdXJwbGUtNDAwIGZvbnQtYm9sZCB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPjIuIELFgcSERCBKU09OIFcgUEFNScSYQ0k8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxEYXRhYmFzZSBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDAgbXQtMVwiPlxuICAgICAgICAgICAgICAgICAgICBaYXBpc3VqZSB1c3prb2R6b27EhSBza8WCYWRuacSZIEpTT04gdyBwcnplc3RyemVuaSBMb2NhbFN0b3JhZ2UuXG4gICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LWN5YW4tMzAwIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+V3N0cnp5a25paiAmIFByemV0ZXN0dWogUm9ib3RhICZyYXJyOzwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNlbnRpbmVsQm90RW5naW5lLmluamVjdFNpbXVsYXRlZERlZmVjdCgnTUVNT1JZX0xFQUtfT1JfREFOR0xJTkdfTk9ERScpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLTJ4bCBiZy1zbGF0ZS05NTAgaG92ZXI6Ymctc2xhdGUtODAwIGJvcmRlciBib3JkZXItY3lhbi01MDAvNDAgdGV4dC1sZWZ0IHRyYW5zaXRpb24tYWxsIGhvdmVyOnNjYWxlLVsxLjAxXSBhY3RpdmU6c2NhbGUtOTggY3Vyc29yLXBvaW50ZXIgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW4gc3BhY2UteS0zXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LWN5YW4tNDAwIGZvbnQtYm9sZCB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPjMuIFVTWktPRFpPTlkgV8SYWkXFgSBJL08gKE5hTik8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxMYXllcnMgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwIG10LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgV3N0cnp5a3VqZSB1c3prb2R6b255IHfEmXplxYIgRE1BIHogd2FydG/Fm2NpxIUgTmFOIHcgZGVza3J5cHRvcmFjaC5cbiAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtY3lhbi0zMDAgZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5Xc3RyenlrbmlqICYgUHJ6ZXRlc3R1aiBSb2JvdGEgJnJhcnI7PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIE1vbml0b3JlZCBWZWN0b3JzIFN0YXR1cyAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNSByb3VuZGVkLTN4bCBiZy1zbGF0ZS05MDAvOTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgc2hhZG93LXhsIHNwYWNlLXktM1wiPlxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJvbGQgdGV4dC13aGl0ZSBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgPEFjdGl2aXR5IGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1lbWVyYWxkLTQwMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPkNJxIRHTEUgTU9OSVRPUk9XQU5FIFdFS1RPUlkgQVBMSUtBQ0pJPC9zcGFuPlxuICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBsZzpncmlkLWNvbHMtMyBnYXAtMyBmb250LW1vbm8gdGV4dC14c1wiPlxuICAgICAgICAgICAgICB7Ym90U3RhdGUubW9uaXRvcmVkVmVjdG9ycy5tYXAoKHYsIGkpID0+IChcbiAgICAgICAgICAgICAgICA8ZGl2IGtleT17aX0gY2xhc3NOYW1lPVwicC0zLjUgcm91bmRlZC0yeGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIGZsZXggaXRlbXMtc3RhcnQganVzdGlmeS1iZXR3ZWVuIGdhcC0zXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtd2hpdGUgZm9udC1ib2xkIHRleHQteHMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctMiBoLTIgcm91bmRlZC1mdWxsIGJnLWVtZXJhbGQtNDAwIGFuaW1hdGUtcHVsc2VcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3YubmFtZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMCBtdC0xXCI+e3YuZGVzY3JpcHRpb259PC9wPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNTAwIG10LTJcIj5DesSZc3RvdGxpd2/Fm8SHOiB7di5jaGVja1JhdGVIen0gSHo8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMiBweS0wLjUgcm91bmRlZCBiZy1lbWVyYWxkLTk1MCB0ZXh0LWVtZXJhbGQtMzAwIGJvcmRlciBib3JkZXItZW1lcmFsZC02MDAvNDAgdGV4dC1bMTBweF0gZm9udC1ib2xkXCI+XG4gICAgICAgICAgICAgICAgICAgIHt2LnN0YXR1c31cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBUQUIgMjogR05JREEgTVVMVEktU0VOU09SUyBNQVRSSVggJiBCQVNFLVdJREUgUkVEIEFMRVJUICovfVxuICAgICAge2FjdGl2ZVRhYiA9PT0gJ3NlbnNvcnMnICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTZcIj5cbiAgICAgICAgICBcbiAgICAgICAgICB7LyogQmFzZS1XaWRlIFJlZCBBbGVydCBTdGF0dXMgU3VtbWFyeSAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHAtNSByb3VuZGVkLTN4bCBib3JkZXItMiB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgcmVkQWxlcnQuaXNBY3RpdmVcbiAgICAgICAgICAgICAgPyAnYmctZ3JhZGllbnQtdG8tciBmcm9tLXJlZC05NTAgdmlhLXJvc2UtOTAwIHRvLXJlZC05NTAgYm9yZGVyLXJlZC01MDAgc2hhZG93LVswXzBfNDBweF9yZ2JhKDIzOSw2OCw2OCwwLjUpXSdcbiAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTAwLzkwIGJvcmRlci1zbGF0ZS04MDAnXG4gICAgICAgICAgfWB9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IGl0ZW1zLXN0YXJ0IHNtOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgcC0zIHJvdW5kZWQtMnhsICR7cmVkQWxlcnQuaXNBY3RpdmUgPyAnYmctcmVkLTYwMCB0ZXh0LXdoaXRlIGFuaW1hdGUtYm91bmNlJyA6ICdiZy1zbGF0ZS04MDAgdGV4dC1zbGF0ZS00MDAnfWB9PlxuICAgICAgICAgICAgICAgICAgPFNoaWVsZEFsZXJ0IGNsYXNzTmFtZT1cInctNiBoLTZcIiAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1iYXNlIHNtOnRleHQtbGcgZm9udC1ibGFjayB0ZXh0LXdoaXRlIGZvbnQtbW9ubyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5TVEFUVVMgT0JST05OWSBDQcWBRUogQkFaWTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17cmVkQWxlcnQuaXNBY3RpdmUgPyAndGV4dC1yZWQtMzAwIGFuaW1hdGUtcHVsc2UnIDogJ3RleHQtZW1lcmFsZC00MDAnfT5cbiAgICAgICAgICAgICAgICAgICAgICB7cmVkQWxlcnQuaXNBY3RpdmUgPyAn8J+aqCBDWkVSV09OWSBBTEFSTSAoS09EIE9NRUdBKScgOiAn8J+boe+4jyBTVEFOIENaVVdBTklBIChXU1pZU1RLSUUgQ1pVSk5JS0kgQUtUWVdORSknfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTMwMCBmb250LXNhbnMgbXQtMC41XCI+XG4gICAgICAgICAgICAgICAgICAgIHtyZWRBbGVydC5pc0FjdGl2ZVxuICAgICAgICAgICAgICAgICAgICAgID8gYEN6dWpuaWsgJHtyZWRBbGVydC50cmlwcGVkU2Vuc29yTmFtZX0gcm96cG96bmHFgiBnbmlkxJkgXCIke3JlZEFsZXJ0Lm5ldXRyYWxpemVkR25pZGFOYW1lfVwiLiBXeWtvbmFubyBuYXR5Y2htaWFzdG93xIUgaW5ha3R5d2FjasSZIWBcbiAgICAgICAgICAgICAgICAgICAgICA6ICdXc3p5c3RraWUgNiBjenVqbmlrw7N3IHNwcnrEmXRvd3ljaCBpIHN5c3RlbW93eWNoIHByYWN1asSFIHN5bmNocm9uaWN6bmllLiBCcmFrIGFrdHl3bnljaCBhZ3Jlc29yw7N3Lid9XG4gICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBTaXJlbiBDb250cm9sICYgUmVzZXQgQnV0dG9uICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gZ25pZGFTZW5zb3JzTWF0cml4LnRvZ2dsZUF1ZGlvTXV0ZSgpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMyBweS0yIHJvdW5kZWQteGwgdGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgYm9yZGVyIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgICAgICAgIHJlZEFsZXJ0LmF1ZGlvTXV0ZWRcbiAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1zbGF0ZS04MDAgYm9yZGVyLXNsYXRlLTcwMCB0ZXh0LXNsYXRlLTQwMCdcbiAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1yZWQtNzAwIGJvcmRlci1yZWQtNDAwIHRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7cmVkQWxlcnQuYXVkaW9NdXRlZCA/IDxWb2x1bWVYIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPiA6IDxWb2x1bWUyIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC15ZWxsb3ctMzAwXCIgLz59XG4gICAgICAgICAgICAgICAgICA8c3Bhbj57cmVkQWxlcnQuYXVkaW9NdXRlZCA/ICdTeXJlbmEgV3ljaXN6b25hJyA6ICdExbp3acSZayBTeXJlbnkgV8WCxIVjem9ueSd9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAge3JlZEFsZXJ0LmlzQWN0aXZlICYmIChcbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gZ25pZGFTZW5zb3JzTWF0cml4LmFja25vd2xlZGdlQW5kUmVzZXRSZWRBbGVydCgpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTIgcm91bmRlZC14bCBiZy1lbWVyYWxkLTUwMCBob3ZlcjpiZy1lbWVyYWxkLTQwMCB0ZXh0LXNsYXRlLTk1MCBmb250LWJsYWNrIGZvbnQtbW9ubyB0ZXh0LXhzIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgc2hhZG93LWxnIGFjdGl2ZTpzY2FsZS05NSB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxDaGVja0NpcmNsZTIgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlNLQVNVSiBDWkVSV09OWSBBTEFSTTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogNiBTZW5zb3IgUHJvYmVzIEdyaWQgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy0zIGdhcC00XCI+XG4gICAgICAgICAgICB7c2Vuc29ycy5tYXAoc2Vuc29yID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgaXNUcmlwcGVkID0gc2Vuc29yLnRyaXBwZWQgfHwgc2Vuc29yLnN0YXR1cyA9PT0gJ1RSSVBQRURfQUxBUk0nO1xuXG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBcbiAgICAgICAgICAgICAgICAgIGtleT17c2Vuc29yLmlkfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC01IHJvdW5kZWQtM3hsIGJvcmRlciB0cmFuc2l0aW9uLWFsbCBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlbiBzcGFjZS15LTQgJHtcbiAgICAgICAgICAgICAgICAgICAgaXNUcmlwcGVkXG4gICAgICAgICAgICAgICAgICAgICAgPyAnYmctZ3JhZGllbnQtdG8tYiBmcm9tLXJlZC05NTAgdG8tc2xhdGUtOTUwIGJvcmRlci1yZWQtNTAwIHNoYWRvdy14bCBzaGFkb3ctcmVkLTk1MC84MCBhbmltYXRlLXB1bHNlJ1xuICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTkwMC85MCBib3JkZXItc2xhdGUtODAwIGhvdmVyOmJvcmRlci1zbGF0ZS03MDAnXG4gICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICB7LyogSGVhZGVyICovfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHB4LTIuNSBweS0wLjUgcm91bmRlZC1mdWxsIHRleHQtWzEwcHhdIGZvbnQtbW9ubyBmb250LWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyICR7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc1RyaXBwZWQgXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXJlZC05NTAgdGV4dC1yZWQtMzAwIGJvcmRlciBib3JkZXItcmVkLTUwMCcgXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLWVtZXJhbGQtOTUwIHRleHQtZW1lcmFsZC0zMDAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTYwMC80MCdcbiAgICAgICAgICAgICAgICAgICAgICB9YH0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7aXNUcmlwcGVkID8gJ/CfmqggUk9aUE9aTkFOTyBHTklExJgnIDogJ/Cfn6IgQ1pVSk5JSyBBS1RZV05ZJ31cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1tb25vIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBXeWtyecSHOiB7c2Vuc29yLmRldGVjdGlvbnNDb3VudH1cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIGZvbnQtbW9ubyBtdC0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAge3NlbnNvci5uYW1lfVxuICAgICAgICAgICAgICAgICAgICA8L2g0PlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMCBtdC0xIGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgICAgICAgICAgICAgIHtzZW5zb3IuZGVzY3JpcHRpb259XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTMgcC0yLjUgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgZm9udC1tb25vIHRleHQtWzEwcHhdIHNwYWNlLXktMVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDBcIj5BZHJlcyBTcHJ6xJl0b3d5OjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jeWFuLTMwMCB0cnVuY2F0ZVwiPntzZW5zb3IuaGFyZHdhcmVBZGRyZXNzfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDAgcHQtMVwiPldla3RvciBBdGFrdTo8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtcHVycGxlLTMwMCB0cnVuY2F0ZVwiPntzZW5zb3IudmVjdG9yfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICB7LyogVHJpZ2dlciBUZXN0IEJ1dHRvbiBmb3IgdGhpcyBTZW5zb3IgKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0LTIgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMC84MFwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gZ25pZGFTZW5zb3JzTWF0cml4LnRlc3RUcmlnZ2VyU2Vuc29yKHNlbnNvci5pZCl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB5LTIgcm91bmRlZC14bCBiZy1ncmFkaWVudC10by1yIGZyb20tcmVkLTYwMCB0by1yb3NlLTcwMCBob3Zlcjpmcm9tLXJlZC01MDAgaG92ZXI6dG8tcm9zZS02MDAgdGV4dC13aGl0ZSBmb250LW1vbm8gZm9udC1ib2xkIHRleHQteHMgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTEuNSBzaGFkb3ctbWQgYWN0aXZlOnNjYWxlLTk1IHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxDcm9zc2hhaXIgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC15ZWxsb3ctMzAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5URVNUVUogQ1pVSk5JSyAoQVRBSyBHTklEWSk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBUQUIgMzogUk9CT1QgUkVQQUlSIEFVRElUIExFREdFUiAqL31cbiAgICAgIHthY3RpdmVUYWIgPT09ICdyZXBhaXJzJyAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC01IHJvdW5kZWQtM3hsIGJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBzaGFkb3cteGwgc3BhY2UteS00XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWJhc2UgZm9udC1ib2xkIHRleHQtd2hpdGUgZm9udC1tb25vIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgPEZpbGVUZXh0IGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1jeWFuLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+UkVKRVNUUiBaREFSWkXFgyBTQU1PTkFQUkFXWSBST0JPVEE8L3NwYW4+XG4gICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDAgbXQtMVwiPlxuICAgICAgICAgICAgICAgIFN6Y3plZ8OzxYJvd2EgaGlzdG9yaWEgemxva2FsaXpvd2FueWNoIGLFgsSZZMOzdywgdXN6a29kem9ueWNoIGxvZ8OzdyBpIHd5a29uYW55Y2ggcHJvY2VkdXIgcmVrb25zdHJ1a2NqaS5cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICAgIMWBxIVjem5pZSBuYXByYXc6IDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC1lbWVyYWxkLTQwMFwiPntib3RTdGF0ZS5hdXRvUmVwYWlyc0NvbXBsZXRlZENvdW50fTwvc3Ryb25nPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7Ym90U3RhdGUucmVwYWlySGlzdG9yeS5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtOCByb3VuZGVkLTJ4bCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1jZW50ZXIgZm9udC1tb25vIHRleHQteHMgdGV4dC1zbGF0ZS01MDBcIj5cbiAgICAgICAgICAgICAgQnJhayB6YXJlamVzdHJvd2FueWNoIGF3YXJpaS4gUm9ib3Qgc3RhbGUgbW9uaXRvcnVqZSBhcGxpa2FjasSZIHcgdHJ5YmllIGNpxIVnxYJ5bS5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMi41IGZvbnQtbW9ubyB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgIHtib3RTdGF0ZS5yZXBhaXJIaXN0b3J5Lm1hcCgocmVwLCBpZHgpID0+IChcbiAgICAgICAgICAgICAgICA8ZGl2IGtleT17cmVwLmlkIHx8IGlkeH0gY2xhc3NOYW1lPVwicC00IHJvdW5kZWQtMnhsIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBob3Zlcjpib3JkZXItc2xhdGUtNzAwIHRyYW5zaXRpb24tYWxsIHNwYWNlLXktMlwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IGl0ZW1zLXN0YXJ0IHNtOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTIgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMCBwYi0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0yIHB5LTAuNSByb3VuZGVkIGJnLWN5YW4tOTUwIHRleHQtY3lhbi0zMDAgYm9yZGVyIGJvcmRlci1jeWFuLTUwMC82MCBmb250LWJvbGQgdGV4dC1bMTBweF1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtyZXAuZGVmZWN0VHlwZX1cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC13aGl0ZSBmb250LWJvbGRcIj57cmVwLnRhcmdldENvbXBvbmVudH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc2xhdGUtNDAwIHRleHQtWzExcHhdXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+Q3phczoge3JlcC50aW1lc3RhbXB9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPuKAojwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtNDAwXCI+Q3phcyBuYXByYXd5OiB7cmVwLnJlY292ZXJ5RHVyYXRpb25Nc30gbXM8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS0zMDAgdGV4dC1bMTFweF1cIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDBcIj5EaWFnbm96YTo8L3NwYW4+IHtyZXAuZGlhZ25vc3RpY0RldGFpbHN9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWN5YW4tMzAwIHRleHQtWzExcHhdIGJnLXNsYXRlLTkwMC82MCBwLTIgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMFwiPld5a29uYW5hIGFrY2phIG5hcHJhd2N6YTo8L3NwYW4+IHtyZXAucmVwYWlyQWN0aW9uRXhlY3V0ZWR9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwibWFwcGluZ3MiOiJBQWlEWTtBQWpEWixTQUFnQixVQUFVLGlCQUFpQjtBQUMzQztBQUFBLEVBQ0U7QUFBQSxFQUFrQjtBQUFBLEVBQVU7QUFBQSxFQUFLO0FBQUEsRUFBYztBQUFBLEVBQy9DO0FBQUEsRUFBVztBQUFBLEVBQU07QUFBQSxFQUFhO0FBQUEsRUFBUztBQUFBLEVBQVM7QUFBQSxFQUNoRDtBQUFBLEVBQVU7QUFBQSxFQUFVO0FBQUEsRUFBa0I7QUFBQSxFQUN0QztBQUFBLEVBQTBCO0FBQUEsT0FDckI7QUFXUCxTQUFTLHlCQUF5QjtBQUNsQyxTQUFTLDBCQUEwQjtBQUNuQyxTQUFTLDJCQUEyQjtBQUNwQyxTQUFTLDZCQUE2QjtBQUUvQixhQUFNLDJCQUFxQyxNQUFNO0FBQ3RELFFBQU0sQ0FBQyxVQUFVLFdBQVcsSUFBSSxTQUEyQixNQUFNLGtCQUFrQixTQUFTLENBQUM7QUFDN0YsUUFBTSxDQUFDLFNBQVMsVUFBVSxJQUFJLFNBQTZCLE1BQU0sbUJBQW1CLFVBQVUsQ0FBQztBQUMvRixRQUFNLENBQUMsVUFBVSxXQUFXLElBQUksU0FBNEIsTUFBTSxtQkFBbUIsaUJBQWlCLENBQUM7QUFDdkcsUUFBTSxDQUFDLFVBQVUsV0FBVyxJQUFJLFNBQTZCLE1BQU0sb0JBQW9CLFNBQVMsQ0FBQztBQUNqRyxRQUFNLENBQUMsV0FBVyxZQUFZLElBQUksU0FBK0QsU0FBUztBQUMxRyxRQUFNLENBQUMsZUFBZSxnQkFBZ0IsSUFBSSxTQUFtQyxJQUFJO0FBRWpGLFlBQVUsTUFBTTtBQUNkLFVBQU0sV0FBVyxrQkFBa0Is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