import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"];
import {
  Waves,
  Radio,
  Shield,
  Zap,
  Activity,
  Sliders,
  Play,
  Pause
} from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "/sentinel-shield/node_modules/.vite/deps/recharts.js?v=aa2b2d0c";
import { emWaveResonanceEngine } from "/sentinel-shield/src/utils/emWaveResonanceEngine.ts";
export const EmWaveResonanceSuperpositionSystem = ({
  onNotify
}) => {
  const [engineState, setEngineState] = useState(() => emWaveResonanceEngine.getState());
  const [selectedNodeId, setSelectedNodeId] = useState("ALL");
  const [selectedDisplayParam, setSelectedDisplayParam] = useState("E_FIELD");
  useEffect(() => {
    const unsub = emWaveResonanceEngine.subscribe((s) => {
      setEngineState(s);
    });
    return () => unsub();
  }, []);
  const handleToggleStreaming = () => {
    emWaveResonanceEngine.toggleStreaming();
    if (onNotify) {
      onNotify(engineState.isStreaming ? "⏸️ Zatrzymano próbkowanie fal EM" : "▶️ Wznowiono ciągły oscyloskop fal EM");
    }
  };
  const handleToggleGlobalAntiPhase = () => {
    emWaveResonanceEngine.toggleGlobalAntiPhaseSuppression();
    const nextState = !engineState.antiPhaseHarmonicSuppressionActive;
    if (onNotify) {
      onNotify(nextState ? "🛡️ Aktywne znoszenie rezonansu (180° Anti-Phase) włączone – harmoniczne wytłumione!" : "⚠️ Znoszenie przeciwfazą wyłączone – fale ulegają nakładaniu (superpozycji).");
    }
  };
  const handleInjectSuperpositionPulse = () => {
    emWaveResonanceEngine.injectTestSuperpositionPulse();
    if (onNotify) {
      onNotify("⚡ Wstrzyknięto impuls testowy superpozycji fal (nakładanie i badanie zbieżności energii)");
    }
  };
  const selectedNode = engineState.nodes.find((n) => n.id === selectedNodeId);
  return /* @__PURE__ */ jsxDEV("div", { className: "w-full space-y-6 text-white", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "rounded-3xl bg-zinc-950/95 border-2 border-indigo-500/40 p-5 sm:p-6 shadow-2xl space-y-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-zinc-800", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3.5", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-950 via-purple-950 to-zinc-950 border-2 border-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0", children: /* @__PURE__ */ jsxDEV(Waves, { className: "w-6 h-6 text-indigo-300 animate-pulse" }, void 0, false, {
            fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
            lineNumber: 74,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
            lineNumber: 73,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxDEV("h2", { className: "text-base sm:text-lg font-black font-mono tracking-tight text-white uppercase flex items-center gap-2", children: /* @__PURE__ */ jsxDEV("span", { children: "SYSTEMY FAL ELEKTROMAGNETYCZNYCH, SUPERPOZYCJI & ZNOSZENIA REZONANSU" }, void 0, false, {
                fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                lineNumber: 79,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                lineNumber: 78,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black border bg-indigo-950/80 border-indigo-500 text-indigo-300", children: "ANTI-PHASE 180° CANCELLATION" }, void 0, false, {
                fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                lineNumber: 81,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded-full text-[10px] font-mono border bg-purple-950/60 border-purple-500/40 text-purple-300", children: [
                engineState.nodes.length,
                " Odbiorników EM"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                lineNumber: 84,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
              lineNumber: 77,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-zinc-400 mt-0.5", children: "Precyzyjny odczyt wektorów Poyntinga (S = E x H), pól E i B, kątów fazowych Δφ, współczynnika SWR oraz aktywne tłumienie rezonansów w przeciwfazie 180°." }, void 0, false, {
              fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
              lineNumber: 88,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
            lineNumber: 76,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
          lineNumber: 72,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleToggleStreaming,
              className: `px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 border transition-all cursor-pointer shadow-lg ${engineState.isStreaming ? "bg-emerald-950 text-emerald-200 border-emerald-500" : "bg-amber-950 text-amber-200 border-amber-500"}`,
              children: [
                engineState.isStreaming ? /* @__PURE__ */ jsxDEV(Pause, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                  lineNumber: 104,
                  columnNumber: 42
                }, this) : /* @__PURE__ */ jsxDEV(Play, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                  lineNumber: 104,
                  columnNumber: 78
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: engineState.isStreaming ? "Zatrzymaj Oscyloskop" : "Wznów Próbkowanie" }, void 0, false, {
                  fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                  lineNumber: 105,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
              lineNumber: 96,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleToggleGlobalAntiPhase,
              className: `px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 border transition-all cursor-pointer shadow-lg ${engineState.antiPhaseHarmonicSuppressionActive ? "bg-indigo-900 hover:bg-indigo-800 text-indigo-100 border-indigo-400 shadow-indigo-950/50" : "bg-rose-950 hover:bg-rose-900 text-rose-200 border-rose-500"}`,
              children: [
                /* @__PURE__ */ jsxDEV(Shield, { className: "w-3.5 h-3.5 text-indigo-300" }, void 0, false, {
                  fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                  lineNumber: 116,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: engineState.antiPhaseHarmonicSuppressionActive ? "Znoszenie Rezonansu: AKTYWNE" : "Znoszenie: WYŁĄCZONE" }, void 0, false, {
                  fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                  lineNumber: 117,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
              lineNumber: 108,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleInjectSuperpositionPulse,
              className: "px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer",
              children: [
                /* @__PURE__ */ jsxDEV(Zap, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                  lineNumber: 124,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Test Superpozycji (Nakładanie)" }, void 0, false, {
                  fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                  lineNumber: 125,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
              lineNumber: 120,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
          lineNumber: 95,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
        lineNumber: 71,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-2xl bg-zinc-900/80 border border-indigo-500/30", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] font-mono text-zinc-400 uppercase", children: "Wzmocnienie Nakładania Fal" }, void 0, false, {
            fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
            lineNumber: 133,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-2xl font-black font-mono text-indigo-300 flex items-center gap-1.5 mt-0.5", children: [
            /* @__PURE__ */ jsxDEV(Zap, { className: "w-5 h-5 text-indigo-400" }, void 0, false, {
              fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
              lineNumber: 135,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              "+",
              engineState.summary.constructiveAmplificationPercent,
              "%"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
              lineNumber: 136,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
            lineNumber: 134,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-zinc-400 font-mono mt-0.5", children: "Interferencja konstruktywna w fazie" }, void 0, false, {
            fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
            lineNumber: 138,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
          lineNumber: 132,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-2xl bg-zinc-900/80 border border-cyan-500/30", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] font-mono text-zinc-400 uppercase", children: "Tłumienie Znoszenia Rezonansu" }, void 0, false, {
            fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
            lineNumber: 142,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-2xl font-black font-mono text-cyan-300 flex items-center gap-1.5 mt-0.5", children: [
            /* @__PURE__ */ jsxDEV(Shield, { className: "w-5 h-5 text-cyan-400" }, void 0, false, {
              fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
              lineNumber: 144,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              engineState.summary.destructiveCancellationRatioDb,
              " dB"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
              lineNumber: 145,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
            lineNumber: 143,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-emerald-400 font-mono mt-0.5", children: "Przeciwfaza 180° tłumi składowe pasożytnicze" }, void 0, false, {
            fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
            lineNumber: 147,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
          lineNumber: 141,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-2xl bg-zinc-900/80 border border-amber-500/30", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] font-mono text-zinc-400 uppercase", children: "Wskaźnik Zagrożenia Hiperbolizacją" }, void 0, false, {
            fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
            lineNumber: 151,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-2xl font-black font-mono text-amber-300 flex items-center gap-1.5 mt-0.5", children: [
            /* @__PURE__ */ jsxDEV(Activity, { className: "w-5 h-5 text-amber-400" }, void 0, false, {
              fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
              lineNumber: 153,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              engineState.summary.energyHyperbolizationIndex,
              "%"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
              lineNumber: 154,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
            lineNumber: 152,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-emerald-400 font-mono mt-0.5", children: "Rozproszona anizotropia dielektryka" }, void 0, false, {
            fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
            lineNumber: 156,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
          lineNumber: 150,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-2xl bg-zinc-900/80 border border-emerald-500/30", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] font-mono text-zinc-400 uppercase", children: "Średni Współczynnik Fali Stojącej" }, void 0, false, {
            fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
            lineNumber: 160,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-2xl font-black font-mono text-emerald-300 flex items-center gap-1.5 mt-0.5", children: [
            /* @__PURE__ */ jsxDEV(Radio, { className: "w-5 h-5 text-emerald-400" }, void 0, false, {
              fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
              lineNumber: 162,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              "SWR ",
              engineState.summary.averageStandingWaveRatio
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
              lineNumber: 163,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
            lineNumber: 161,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-emerald-400 font-mono mt-0.5", children: "Dopasowanie impedancyjne linii" }, void 0, false, {
            fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
            lineNumber: 165,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
          lineNumber: 159,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
        lineNumber: 131,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
      lineNumber: 70,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "rounded-2xl bg-zinc-950/90 border border-zinc-800 p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-400 uppercase font-bold flex items-center gap-1", children: [
          /* @__PURE__ */ jsxDEV(Sliders, { className: "w-3.5 h-3.5 text-indigo-400" }, void 0, false, {
            fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
            lineNumber: 174,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Mierzony Parametr Pola:" }, void 0, false, {
            fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
            lineNumber: 175,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
          lineNumber: 173,
          columnNumber: 11
        }, this),
        [
          { id: "E_FIELD", label: "⚡ Pole Elektryczne E (V/m)" },
          { id: "B_FIELD", label: "🧲 Indukcja Magnetyczna B (µT)" },
          { id: "POWER_FLUX", label: "📡 Gęstość Strumienia Mocy S (mW/m²)" },
          { id: "HYPERBOLIC", label: "🔥 Wskaźnik Hiperbolizacji Energii" }
        ].map((param) => /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setSelectedDisplayParam(param.id),
            className: `px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${selectedDisplayParam === param.id ? "bg-indigo-950 text-indigo-200 border-indigo-400 shadow-md shadow-indigo-950" : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200"}`,
            children: param.label
          },
          param.id,
          false,
          {
            fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
            lineNumber: 184,
            columnNumber: 13
          },
          this
        ))
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
        lineNumber: 172,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-400 font-bold", children: "Odbiornik:" }, void 0, false, {
          fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
          lineNumber: 200,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(
          "select",
          {
            value: selectedNodeId,
            onChange: (e) => setSelectedNodeId(e.target.value),
            className: "bg-zinc-900 text-white border border-zinc-700 rounded-xl px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-indigo-400",
            children: [
              /* @__PURE__ */ jsxDEV("option", { value: "ALL", children: "Wszystkie Sondy (Widok Porównawczy)" }, void 0, false, {
                fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                lineNumber: 206,
                columnNumber: 13
              }, this),
              engineState.nodes.map((n) => /* @__PURE__ */ jsxDEV("option", { value: n.id, children: n.name.split(" (")[0] }, n.id, false, {
                fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                lineNumber: 208,
                columnNumber: 15
              }, this))
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
            lineNumber: 201,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
        lineNumber: 199,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
      lineNumber: 171,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "rounded-3xl bg-zinc-950/95 border-2 border-indigo-500/30 p-4 sm:p-6 shadow-2xl space-y-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(Activity, { className: "w-5 h-5 text-indigo-400" }, void 0, false, {
            fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
            lineNumber: 218,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("h3", { className: "text-sm sm:text-base font-black font-mono text-white uppercase", children: [
            "OSCYLOSKOP FAL EM W CZASIE RZECZYWISTYM • ",
            selectedDisplayParam
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
            lineNumber: 219,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
          lineNumber: 217,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-mono text-zinc-400", children: [
          "Próbkowanie: ",
          /* @__PURE__ */ jsxDEV("strong", { children: "2.0 kHz" }, void 0, false, {
            fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
            lineNumber: 224,
            columnNumber: 26
          }, this),
          " z buforem koherencyjnym"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
          lineNumber: 223,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
        lineNumber: 216,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "w-full h-80 sm:h-96", children: /* @__PURE__ */ jsxDEV(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxDEV(
        LineChart,
        {
          data: engineState.oscilloscopeHistory,
          margin: { top: 15, right: 25, left: 0, bottom: 25 },
          children: [
            /* @__PURE__ */ jsxDEV(CartesianGrid, { strokeDasharray: "3 3", stroke: "#27272a" }, void 0, false, {
              fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
              lineNumber: 234,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV(
              XAxis,
              {
                dataKey: "timestamp",
                stroke: "#71717a",
                tick: { fill: "#a1a1aa", fontSize: 10, fontFamily: "monospace" }
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                lineNumber: 235,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              YAxis,
              {
                stroke: "#71717a",
                tick: { fill: "#a1a1aa", fontSize: 10, fontFamily: "monospace" }
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                lineNumber: 240,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              Tooltip,
              {
                contentStyle: {
                  backgroundColor: "#09090b",
                  borderColor: "#6366f1",
                  borderRadius: "12px",
                  fontFamily: "monospace",
                  fontSize: "11px",
                  color: "#fff"
                }
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                lineNumber: 244,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              Legend,
              {
                verticalAlign: "top",
                height: 36,
                wrapperStyle: { fontSize: "11px", fontFamily: "monospace", color: "#a1a1aa" }
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                lineNumber: 254,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              Line,
              {
                type: "monotone",
                dataKey: "mains50HzField",
                name: "50 Hz Sieć AC (Po filtracji)",
                stroke: "#f43f5e",
                strokeWidth: 2,
                dot: false
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                lineNumber: 261,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              Line,
              {
                type: "monotone",
                dataKey: "pwm100HzField",
                name: "100 Hz PWM Tętnienie",
                stroke: "#eab308",
                strokeWidth: 2,
                dot: false
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                lineNumber: 271,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              Line,
              {
                type: "monotone",
                dataKey: "schumannField",
                name: "7.83 Hz Schumann ELF",
                stroke: "#06b6d4",
                strokeWidth: 2.5,
                dot: false
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                lineNumber: 281,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              Line,
              {
                type: "monotone",
                dataKey: "rfClockField",
                name: "PCIe 5.0 RF Clock (GHz)",
                stroke: "#a855f7",
                strokeWidth: 1.5,
                dot: false
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                lineNumber: 291,
                columnNumber: 15
              },
              this
            ),
            selectedDisplayParam === "HYPERBOLIC" && /* @__PURE__ */ jsxDEV(
              Line,
              {
                type: "monotone",
                dataKey: "hyperbolicIndex",
                name: "Wskaźnik Hiperbolizacji",
                stroke: "#10b981",
                strokeWidth: 2,
                dot: false
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                lineNumber: 302,
                columnNumber: 17
              },
              this
            )
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
          lineNumber: 230,
          columnNumber: 13
        },
        this
      ) }, void 0, false, {
        fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
        lineNumber: 229,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
        lineNumber: 228,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-2 border-t border-zinc-800/80", children: [
        /* @__PURE__ */ jsxDEV("span", { children: "* Zastosowanie przeciwfazy 180° obniża amplitudę składowej 50 Hz i 100 Hz do bezpiecznych wartości podprogowych." }, void 0, false, {
          fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
          lineNumber: 316,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "text-indigo-300", children: "Wektor Poyntinga obliczany w przestrzeni trójosiowej [Sx, Sy, Sz]" }, void 0, false, {
          fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
          lineNumber: 317,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
        lineNumber: 315,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
      lineNumber: 215,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: engineState.nodes.map((node) => {
      const isSelected = selectedNodeId === node.id;
      return /* @__PURE__ */ jsxDEV(
        "div",
        {
          onClick: () => setSelectedNodeId(node.id),
          className: `p-4 rounded-2xl border-2 transition-all cursor-pointer font-mono space-y-3 ${isSelected ? "bg-indigo-950/80 border-indigo-400 shadow-xl shadow-indigo-950/50" : "bg-zinc-950/90 border-zinc-800 hover:border-zinc-700"}`,
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-bold text-white leading-snug", children: node.name.split(" (")[0] }, void 0, false, {
                  fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                  lineNumber: 337,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-zinc-400", children: node.frequencyBandName }, void 0, false, {
                  fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                  lineNumber: 338,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                lineNumber: 336,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: `px-2 py-0.5 rounded text-[9px] font-bold border shrink-0 ${node.resonanceCancellationActive ? "bg-emerald-950 text-emerald-300 border-emerald-500" : "bg-zinc-900 text-zinc-400 border-zinc-700"}`, children: node.resonanceCancellationActive ? "PRZECIWFAZA" : "NATURALNY" }, void 0, false, {
                fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                lineNumber: 340,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
              lineNumber: 335,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-2 text-xs", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-xl bg-zinc-900 border border-zinc-800", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] text-zinc-500 block", children: "Pole E:" }, void 0, false, {
                  fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                  lineNumber: 352,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-sm font-bold text-cyan-300", children: [
                  node.electricFieldVpm,
                  " V/m"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                  lineNumber: 353,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                lineNumber: 351,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-xl bg-zinc-900 border border-zinc-800", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] text-zinc-500 block", children: "Indukcja B:" }, void 0, false, {
                  fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                  lineNumber: 356,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-sm font-bold text-amber-300", children: [
                  node.magneticFieldMicroT,
                  " µT"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                  lineNumber: 357,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                lineNumber: 355,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-xl bg-zinc-900 border border-zinc-800", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] text-zinc-500 block", children: "Faza / Polaryzacja:" }, void 0, false, {
                  fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                  lineNumber: 360,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] font-bold text-indigo-300", children: [
                  node.phaseAngleDeg,
                  "° / ",
                  node.polarization
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                  lineNumber: 361,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                lineNumber: 359,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-xl bg-zinc-900 border border-zinc-800", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] text-zinc-500 block", children: "SWR / Q:" }, void 0, false, {
                  fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                  lineNumber: 364,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] font-bold text-purple-300", children: [
                  node.standingWaveRatioSwr,
                  " / Q=",
                  node.qualityFactorQ
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                  lineNumber: 365,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                lineNumber: 363,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
              lineNumber: 350,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-zinc-400 flex items-center justify-between border-t border-zinc-800/80 pt-2", children: [
              /* @__PURE__ */ jsxDEV("span", { children: [
                "Poynting: [",
                node.poyntingVector.x,
                ", ",
                node.poyntingVector.y,
                ", ",
                node.poyntingVector.z,
                "]"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                lineNumber: 371,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-500", children: [
                "Sonda [",
                node.coords.x,
                ",",
                node.coords.y,
                ",",
                node.coords.z,
                "]"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                lineNumber: 372,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
              lineNumber: 370,
              columnNumber: 15
            }, this)
          ]
        },
        node.id,
        true,
        {
          fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
          lineNumber: 326,
          columnNumber: 13
        },
        this
      );
    }) }, void 0, false, {
      fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
      lineNumber: 322,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "rounded-3xl bg-zinc-950/95 border-2 border-zinc-800 p-4 sm:p-5 space-y-3 font-mono text-xs", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-zinc-800 pb-2", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-200 font-bold flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(Activity, { className: "w-4 h-4 text-indigo-400" }, void 0, false, {
            fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
            lineNumber: 383,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "DZIENNIK ZDARZEŃ SUPERPOZYCJI FAL & ZNOSZENIA REZONANSU" }, void 0, false, {
            fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
            lineNumber: 384,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
          lineNumber: 382,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-zinc-400", children: "Rejestracja w czasie rzeczywistym" }, void 0, false, {
          fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
          lineNumber: 386,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
        lineNumber: 381,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "max-h-36 overflow-y-auto space-y-1.5 pr-1 text-[11px]", children: engineState.incidentLogs.map((log) => /* @__PURE__ */ jsxDEV(
        "div",
        {
          className: "p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 hover:border-zinc-700",
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-indigo-400 font-bold", children: [
                "[",
                log.type,
                "]"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                lineNumber: 396,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-200", children: log.message }, void 0, false, {
                fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                lineNumber: 397,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
              lineNumber: 395,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 shrink-0 text-[10px] text-zinc-400", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-400", children: log.details }, void 0, false, {
                fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                lineNumber: 400,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-500", children: log.timestamp }, void 0, false, {
                fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
                lineNumber: 401,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
              lineNumber: 399,
              columnNumber: 15
            }, this)
          ]
        },
        log.id,
        true,
        {
          fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
          lineNumber: 391,
          columnNumber: 13
        },
        this
      )) }, void 0, false, {
        fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
        lineNumber: 389,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
      lineNumber: 380,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/EmWaveResonanceSuperpositionSystem.tsx",
    lineNumber: 68,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkVtV2F2ZVJlc29uYW5jZVN1cGVycG9zaXRpb25TeXN0ZW0udHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgXG4gIFdhdmVzLCBSYWRpbywgU2hpZWxkLCBaYXAsIEFjdGl2aXR5LCBTbGlkZXJzLCBBbGVydFRyaWFuZ2xlLCBcbiAgQ2hlY2tDaXJjbGUyLCBQbGF5LCBQYXVzZSwgUmVmcmVzaEN3LCBDcm9zc2hhaXIsIEFycm93UmlnaHQsIFxuICBMYXllcnMsIERvd25sb2FkLCBFeWUsIFNwYXJrbGVzLCBGaWx0ZXIsIENvbXBhc3Ncbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IFxuICBSZXNwb25zaXZlQ29udGFpbmVyLCBcbiAgTGluZUNoYXJ0LCBcbiAgTGluZSwgXG4gIFhBeGlzLCBcbiAgWUF4aXMsIFxuICBDYXJ0ZXNpYW5HcmlkLCBcbiAgVG9vbHRpcCwgXG4gIExlZ2VuZCwgXG4gIFJlZmVyZW5jZUxpbmUsXG4gIEFyZWFDaGFydCxcbiAgQXJlYVxufSBmcm9tICdyZWNoYXJ0cyc7XG5pbXBvcnQgeyBlbVdhdmVSZXNvbmFuY2VFbmdpbmUgfSBmcm9tICcuLi91dGlscy9lbVdhdmVSZXNvbmFuY2VFbmdpbmUnO1xuaW1wb3J0IHsgRW1XYXZlVGVsZW1ldHJ5Tm9kZSwgU3VwZXJwb3NpdGlvblJlc29uYW5jZVN1bW1hcnkgfSBmcm9tICcuLi90eXBlcyc7XG5cbmludGVyZmFjZSBFbVdhdmVSZXNvbmFuY2VTdXBlcnBvc2l0aW9uU3lzdGVtUHJvcHMge1xuICBvbk5vdGlmeT86IChtc2c6IHN0cmluZykgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGNvbnN0IEVtV2F2ZVJlc29uYW5jZVN1cGVycG9zaXRpb25TeXN0ZW06IFJlYWN0LkZDPEVtV2F2ZVJlc29uYW5jZVN1cGVycG9zaXRpb25TeXN0ZW1Qcm9wcz4gPSAoe1xuICBvbk5vdGlmeVxufSkgPT4ge1xuICBjb25zdCBbZW5naW5lU3RhdGUsIHNldEVuZ2luZVN0YXRlXSA9IHVzZVN0YXRlKCgpID0+IGVtV2F2ZVJlc29uYW5jZUVuZ2luZS5nZXRTdGF0ZSgpKTtcbiAgY29uc3QgW3NlbGVjdGVkTm9kZUlkLCBzZXRTZWxlY3RlZE5vZGVJZF0gPSB1c2VTdGF0ZTxzdHJpbmc+KCdBTEwnKTtcbiAgY29uc3QgW3NlbGVjdGVkRGlzcGxheVBhcmFtLCBzZXRTZWxlY3RlZERpc3BsYXlQYXJhbV0gPSB1c2VTdGF0ZTwnRV9GSUVMRCcgfCAnQl9GSUVMRCcgfCAnUE9XRVJfRkxVWCcgfCAnU1dSX1EnIHwgJ0hZUEVSQk9MSUMnPignRV9GSUVMRCcpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgdW5zdWIgPSBlbVdhdmVSZXNvbmFuY2VFbmdpbmUuc3Vic2NyaWJlKChzKSA9PiB7XG4gICAgICBzZXRFbmdpbmVTdGF0ZShzKTtcbiAgICB9KTtcbiAgICByZXR1cm4gKCkgPT4gdW5zdWIoKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGhhbmRsZVRvZ2dsZVN0cmVhbWluZyA9ICgpID0+IHtcbiAgICBlbVdhdmVSZXNvbmFuY2VFbmdpbmUudG9nZ2xlU3RyZWFtaW5nKCk7XG4gICAgaWYgKG9uTm90aWZ5KSB7XG4gICAgICBvbk5vdGlmeShlbmdpbmVTdGF0ZS5pc1N0cmVhbWluZyA/ICfij7jvuI8gWmF0cnp5bWFubyBwcsOzYmtvd2FuaWUgZmFsIEVNJyA6ICfilrbvuI8gV3pub3dpb25vIGNpxIVnxYJ5IG9zY3lsb3Nrb3AgZmFsIEVNJyk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVRvZ2dsZUdsb2JhbEFudGlQaGFzZSA9ICgpID0+IHtcbiAgICBlbVdhdmVSZXNvbmFuY2VFbmdpbmUudG9nZ2xlR2xvYmFsQW50aVBoYXNlU3VwcHJlc3Npb24oKTtcbiAgICBjb25zdCBuZXh0U3RhdGUgPSAhZW5naW5lU3RhdGUuYW50aVBoYXNlSGFybW9uaWNTdXBwcmVzc2lvbkFjdGl2ZTtcbiAgICBpZiAob25Ob3RpZnkpIHtcbiAgICAgIG9uTm90aWZ5KG5leHRTdGF0ZSBcbiAgICAgICAgPyAn8J+boe+4jyBBa3R5d25lIHpub3N6ZW5pZSByZXpvbmFuc3UgKDE4MMKwIEFudGktUGhhc2UpIHfFgsSFY3pvbmUg4oCTIGhhcm1vbmljem5lIHd5dMWCdW1pb25lIScgXG4gICAgICAgIDogJ+KaoO+4jyBabm9zemVuaWUgcHJ6ZWNpd2ZhesSFIHd5xYLEhWN6b25lIOKAkyBmYWxlIHVsZWdhasSFIG5ha8WCYWRhbml1IChzdXBlcnBvenljamkpLicpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVJbmplY3RTdXBlcnBvc2l0aW9uUHVsc2UgPSAoKSA9PiB7XG4gICAgZW1XYXZlUmVzb25hbmNlRW5naW5lLmluamVjdFRlc3RTdXBlcnBvc2l0aW9uUHVsc2UoKTtcbiAgICBpZiAob25Ob3RpZnkpIHtcbiAgICAgIG9uTm90aWZ5KCfimqEgV3N0cnp5a25pxJl0byBpbXB1bHMgdGVzdG93eSBzdXBlcnBvenljamkgZmFsIChuYWvFgmFkYW5pZSBpIGJhZGFuaWUgemJpZcW8bm/Fm2NpIGVuZXJnaWkpJyk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHNlbGVjdGVkTm9kZSA9IGVuZ2luZVN0YXRlLm5vZGVzLmZpbmQobiA9PiBuLmlkID09PSBzZWxlY3RlZE5vZGVJZCk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBzcGFjZS15LTYgdGV4dC13aGl0ZVwiPlxuICAgICAgey8qIFRvcCBCYW5uZXIgJiBDb250cm9sIEJhciAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm91bmRlZC0zeGwgYmctemluYy05NTAvOTUgYm9yZGVyLTIgYm9yZGVyLWluZGlnby01MDAvNDAgcC01IHNtOnAtNiBzaGFkb3ctMnhsIHNwYWNlLXktNFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgbGc6ZmxleC1yb3cgaXRlbXMtc3RhcnQgbGc6aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNCBwYi00IGJvcmRlci1iIGJvcmRlci16aW5jLTgwMFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0zLjVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xMiBoLTEyIHJvdW5kZWQtMnhsIGJnLWdyYWRpZW50LXRvLWJyIGZyb20taW5kaWdvLTk1MCB2aWEtcHVycGxlLTk1MCB0by16aW5jLTk1MCBib3JkZXItMiBib3JkZXItaW5kaWdvLTQwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBzaGFkb3ctbGcgc2hhZG93LWluZGlnby01MDAvMjAgc2hyaW5rLTBcIj5cbiAgICAgICAgICAgICAgPFdhdmVzIGNsYXNzTmFtZT1cInctNiBoLTYgdGV4dC1pbmRpZ28tMzAwIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGZsZXgtd3JhcFwiPlxuICAgICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LWJhc2Ugc206dGV4dC1sZyBmb250LWJsYWNrIGZvbnQtbW9ubyB0cmFja2luZy10aWdodCB0ZXh0LXdoaXRlIHVwcGVyY2FzZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+U1lTVEVNWSBGQUwgRUxFS1RST01BR05FVFlDWk5ZQ0gsIFNVUEVSUE9aWUNKSSAmIFpOT1NaRU5JQSBSRVpPTkFOU1U8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0yLjUgcHktMC41IHJvdW5kZWQtZnVsbCB0ZXh0LVsxMHB4XSBmb250LW1vbm8gZm9udC1ibGFjayBib3JkZXIgYmctaW5kaWdvLTk1MC84MCBib3JkZXItaW5kaWdvLTUwMCB0ZXh0LWluZGlnby0zMDBcIj5cbiAgICAgICAgICAgICAgICAgIEFOVEktUEhBU0UgMTgwwrAgQ0FOQ0VMTEFUSU9OXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IHJvdW5kZWQtZnVsbCB0ZXh0LVsxMHB4XSBmb250LW1vbm8gYm9yZGVyIGJnLXB1cnBsZS05NTAvNjAgYm9yZGVyLXB1cnBsZS01MDAvNDAgdGV4dC1wdXJwbGUtMzAwXCI+XG4gICAgICAgICAgICAgICAgICB7ZW5naW5lU3RhdGUubm9kZXMubGVuZ3RofSBPZGJpb3JuaWvDs3cgRU1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtemluYy00MDAgbXQtMC41XCI+XG4gICAgICAgICAgICAgICAgUHJlY3l6eWpueSBvZGN6eXQgd2VrdG9yw7N3IFBveW50aW5nYSAoUyA9IEUgeCBIKSwgcMOzbCBFIGkgQiwga8SFdMOzdyBmYXpvd3ljaCDOlM+GLCB3c3DDs8WCY3p5bm5pa2EgU1dSIG9yYXogYWt0eXduZSB0xYJ1bWllbmllIHJlem9uYW5zw7N3IHcgcHJ6ZWNpd2ZhemllIDE4MMKwLlxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBRdWljayBBY3Rpb24gQnV0dG9ucyAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGZsZXgtd3JhcFwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVUb2dnbGVTdHJlYW1pbmd9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTMuNSBweS0yIHJvdW5kZWQteGwgdGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGJvcmRlciB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBzaGFkb3ctbGcgJHtcbiAgICAgICAgICAgICAgICBlbmdpbmVTdGF0ZS5pc1N0cmVhbWluZ1xuICAgICAgICAgICAgICAgICAgPyAnYmctZW1lcmFsZC05NTAgdGV4dC1lbWVyYWxkLTIwMCBib3JkZXItZW1lcmFsZC01MDAnXG4gICAgICAgICAgICAgICAgICA6ICdiZy1hbWJlci05NTAgdGV4dC1hbWJlci0yMDAgYm9yZGVyLWFtYmVyLTUwMCdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtlbmdpbmVTdGF0ZS5pc1N0cmVhbWluZyA/IDxQYXVzZSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+IDogPFBsYXkgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPn1cbiAgICAgICAgICAgICAgPHNwYW4+e2VuZ2luZVN0YXRlLmlzU3RyZWFtaW5nID8gJ1phdHJ6eW1haiBPc2N5bG9za29wJyA6ICdXem7Ds3cgUHLDs2Jrb3dhbmllJ308L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVUb2dnbGVHbG9iYWxBbnRpUGhhc2V9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTMuNSBweS0yIHJvdW5kZWQteGwgdGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGJvcmRlciB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBzaGFkb3ctbGcgJHtcbiAgICAgICAgICAgICAgICBlbmdpbmVTdGF0ZS5hbnRpUGhhc2VIYXJtb25pY1N1cHByZXNzaW9uQWN0aXZlXG4gICAgICAgICAgICAgICAgICA/ICdiZy1pbmRpZ28tOTAwIGhvdmVyOmJnLWluZGlnby04MDAgdGV4dC1pbmRpZ28tMTAwIGJvcmRlci1pbmRpZ28tNDAwIHNoYWRvdy1pbmRpZ28tOTUwLzUwJ1xuICAgICAgICAgICAgICAgICAgOiAnYmctcm9zZS05NTAgaG92ZXI6Ymctcm9zZS05MDAgdGV4dC1yb3NlLTIwMCBib3JkZXItcm9zZS01MDAnXG4gICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8U2hpZWxkIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtaW5kaWdvLTMwMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPntlbmdpbmVTdGF0ZS5hbnRpUGhhc2VIYXJtb25pY1N1cHByZXNzaW9uQWN0aXZlID8gJ1pub3N6ZW5pZSBSZXpvbmFuc3U6IEFLVFlXTkUnIDogJ1pub3N6ZW5pZTogV1nFgcSEQ1pPTkUnfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUluamVjdFN1cGVycG9zaXRpb25QdWxzZX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMy41IHB5LTIgcm91bmRlZC14bCBiZy16aW5jLTkwMCBob3ZlcjpiZy16aW5jLTgwMCBib3JkZXIgYm9yZGVyLWFtYmVyLTUwMC80MCB0ZXh0LWFtYmVyLTMwMCB0ZXh0LXhzIGZvbnQtbW9ubyBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8WmFwIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtYW1iZXItNDAwXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+VGVzdCBTdXBlcnBvenljamkgKE5ha8WCYWRhbmllKTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogR2xvYmFsIFN1bW1hcnkgS1BJIFRpbGVzICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgc206Z3JpZC1jb2xzLTQgZ2FwLTNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMy41IHJvdW5kZWQtMnhsIGJnLXppbmMtOTAwLzgwIGJvcmRlciBib3JkZXItaW5kaWdvLTUwMC8zMFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC16aW5jLTQwMCB1cHBlcmNhc2VcIj5Xem1vY25pZW5pZSBOYWvFgmFkYW5pYSBGYWw8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ibGFjayBmb250LW1vbm8gdGV4dC1pbmRpZ28tMzAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgbXQtMC41XCI+XG4gICAgICAgICAgICAgIDxaYXAgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LWluZGlnby00MDBcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj4re2VuZ2luZVN0YXRlLnN1bW1hcnkuY29uc3RydWN0aXZlQW1wbGlmaWNhdGlvblBlcmNlbnR9JTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtemluYy00MDAgZm9udC1tb25vIG10LTAuNVwiPkludGVyZmVyZW5jamEga29uc3RydWt0eXduYSB3IGZhemllPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMy41IHJvdW5kZWQtMnhsIGJnLXppbmMtOTAwLzgwIGJvcmRlciBib3JkZXItY3lhbi01MDAvMzBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIHRleHQtemluYy00MDAgdXBwZXJjYXNlXCI+VMWCdW1pZW5pZSBabm9zemVuaWEgUmV6b25hbnN1PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYmxhY2sgZm9udC1tb25vIHRleHQtY3lhbi0zMDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgPFNoaWVsZCBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtY3lhbi00MDBcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj57ZW5naW5lU3RhdGUuc3VtbWFyeS5kZXN0cnVjdGl2ZUNhbmNlbGxhdGlvblJhdGlvRGJ9IGRCPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzlweF0gdGV4dC1lbWVyYWxkLTQwMCBmb250LW1vbm8gbXQtMC41XCI+UHJ6ZWNpd2ZhemEgMTgwwrAgdMWCdW1pIHNrxYJhZG93ZSBwYXNvxbx5dG5pY3plPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMy41IHJvdW5kZWQtMnhsIGJnLXppbmMtOTAwLzgwIGJvcmRlciBib3JkZXItYW1iZXItNTAwLzMwXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyB0ZXh0LXppbmMtNDAwIHVwcGVyY2FzZVwiPldza2HFum5payBaYWdyb8W8ZW5pYSBIaXBlcmJvbGl6YWNqxIU8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ibGFjayBmb250LW1vbm8gdGV4dC1hbWJlci0zMDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgPEFjdGl2aXR5IGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1hbWJlci00MDBcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj57ZW5naW5lU3RhdGUuc3VtbWFyeS5lbmVyZ3lIeXBlcmJvbGl6YXRpb25JbmRleH0lPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzlweF0gdGV4dC1lbWVyYWxkLTQwMCBmb250LW1vbm8gbXQtMC41XCI+Um96cHJvc3pvbmEgYW5pem90cm9waWEgZGllbGVrdHJ5a2E8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zLjUgcm91bmRlZC0yeGwgYmctemluYy05MDAvODAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTUwMC8zMFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC16aW5jLTQwMCB1cHBlcmNhc2VcIj7FmnJlZG5pIFdzcMOzxYJjenlubmlrIEZhbGkgU3RvasSFY2VqPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYmxhY2sgZm9udC1tb25vIHRleHQtZW1lcmFsZC0zMDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgPFJhZGlvIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1lbWVyYWxkLTQwMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPlNXUiB7ZW5naW5lU3RhdGUuc3VtbWFyeS5hdmVyYWdlU3RhbmRpbmdXYXZlUmF0aW99PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzlweF0gdGV4dC1lbWVyYWxkLTQwMCBmb250LW1vbm8gbXQtMC41XCI+RG9wYXNvd2FuaWUgaW1wZWRhbmN5am5lIGxpbmlpPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBNZXRyaWMgU2VsZWN0b3IgQmFyICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3VuZGVkLTJ4bCBiZy16aW5jLTk1MC85MCBib3JkZXIgYm9yZGVyLXppbmMtODAwIHAtMy41IGZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgaXRlbXMtc3RhcnQgc206aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMyB0ZXh0LXhzIGZvbnQtbW9ub1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGZsZXgtd3JhcFwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtemluYy00MDAgdXBwZXJjYXNlIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgPFNsaWRlcnMgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1pbmRpZ28tNDAwXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPk1pZXJ6b255IFBhcmFtZXRyIFBvbGE6PC9zcGFuPlxuICAgICAgICAgIDwvc3Bhbj5cblxuICAgICAgICAgIHtbXG4gICAgICAgICAgICB7IGlkOiAnRV9GSUVMRCcsIGxhYmVsOiAn4pqhIFBvbGUgRWxla3RyeWN6bmUgRSAoVi9tKScgfSxcbiAgICAgICAgICAgIHsgaWQ6ICdCX0ZJRUxEJywgbGFiZWw6ICfwn6eyIEluZHVrY2phIE1hZ25ldHljem5hIEIgKMK1VCknIH0sXG4gICAgICAgICAgICB7IGlkOiAnUE9XRVJfRkxVWCcsIGxhYmVsOiAn8J+ToSBHxJlzdG/Fm8SHIFN0cnVtaWVuaWEgTW9jeSBTIChtVy9twrIpJyB9LFxuICAgICAgICAgICAgeyBpZDogJ0hZUEVSQk9MSUMnLCBsYWJlbDogJ/CflKUgV3NrYcW6bmlrIEhpcGVyYm9saXphY2ppIEVuZXJnaWknIH1cbiAgICAgICAgICBdLm1hcCgocGFyYW0pID0+IChcbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAga2V5PXtwYXJhbS5pZH1cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2VsZWN0ZWREaXNwbGF5UGFyYW0ocGFyYW0uaWQgYXMgYW55KX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMyBweS0xLjUgcm91bmRlZC14bCBib3JkZXIgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZERpc3BsYXlQYXJhbSA9PT0gcGFyYW0uaWRcbiAgICAgICAgICAgICAgICAgID8gJ2JnLWluZGlnby05NTAgdGV4dC1pbmRpZ28tMjAwIGJvcmRlci1pbmRpZ28tNDAwIHNoYWRvdy1tZCBzaGFkb3ctaW5kaWdvLTk1MCdcbiAgICAgICAgICAgICAgICAgIDogJ2JnLXppbmMtOTAwIHRleHQtemluYy00MDAgYm9yZGVyLXppbmMtODAwIGhvdmVyOnRleHQtemluYy0yMDAnXG4gICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7cGFyYW0ubGFiZWx9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIE5vZGUgc2VsZWN0b3IgZHJvcGRvd24gKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXppbmMtNDAwIGZvbnQtYm9sZFwiPk9kYmlvcm5pazo8L3NwYW4+XG4gICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgdmFsdWU9e3NlbGVjdGVkTm9kZUlkfVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTZWxlY3RlZE5vZGVJZChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJiZy16aW5jLTkwMCB0ZXh0LXdoaXRlIGJvcmRlciBib3JkZXItemluYy03MDAgcm91bmRlZC14bCBweC0yLjUgcHktMS41IHRleHQteHMgZm9udC1tb25vIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItaW5kaWdvLTQwMFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkFMTFwiPldzenlzdGtpZSBTb25keSAoV2lkb2sgUG9yw7N3bmF3Y3p5KTwvb3B0aW9uPlxuICAgICAgICAgICAge2VuZ2luZVN0YXRlLm5vZGVzLm1hcChuID0+IChcbiAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9e24uaWR9IHZhbHVlPXtuLmlkfT57bi5uYW1lLnNwbGl0KCcgKCcpWzBdfTwvb3B0aW9uPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBNYWluIE9zY2lsbG9zY29wZSBDaGFydDogV2F2ZSBTdXBlcnBvc2l0aW9uICYgQ2FuY2VsbGF0aW9uIFRyYWNlcyAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm91bmRlZC0zeGwgYmctemluYy05NTAvOTUgYm9yZGVyLTIgYm9yZGVyLWluZGlnby01MDAvMzAgcC00IHNtOnAtNiBzaGFkb3ctMnhsIHNwYWNlLXktNFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgc206aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMiBib3JkZXItYiBib3JkZXItemluYy04MDAgcGItM1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgIDxBY3Rpdml0eSBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtaW5kaWdvLTQwMFwiIC8+XG4gICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1zbSBzbTp0ZXh0LWJhc2UgZm9udC1ibGFjayBmb250LW1vbm8gdGV4dC13aGl0ZSB1cHBlcmNhc2VcIj5cbiAgICAgICAgICAgICAgT1NDWUxPU0tPUCBGQUwgRU0gVyBDWkFTSUUgUlpFQ1pZV0lTVFlNIOKAoiB7c2VsZWN0ZWREaXNwbGF5UGFyYW19XG4gICAgICAgICAgICA8L2gzPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1vbm8gdGV4dC16aW5jLTQwMFwiPlxuICAgICAgICAgICAgUHLDs2Jrb3dhbmllOiA8c3Ryb25nPjIuMCBrSHo8L3N0cm9uZz4geiBidWZvcmVtIGtvaGVyZW5jeWpueW1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgaC04MCBzbTpoLTk2XCI+XG4gICAgICAgICAgPFJlc3BvbnNpdmVDb250YWluZXIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiPlxuICAgICAgICAgICAgPExpbmVDaGFydFxuICAgICAgICAgICAgICBkYXRhPXtlbmdpbmVTdGF0ZS5vc2NpbGxvc2NvcGVIaXN0b3J5fVxuICAgICAgICAgICAgICBtYXJnaW49e3sgdG9wOiAxNSwgcmlnaHQ6IDI1LCBsZWZ0OiAwLCBib3R0b206IDI1IH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxDYXJ0ZXNpYW5HcmlkIHN0cm9rZURhc2hhcnJheT1cIjMgM1wiIHN0cm9rZT1cIiMyNzI3MmFcIiAvPlxuICAgICAgICAgICAgICA8WEF4aXMgXG4gICAgICAgICAgICAgICAgZGF0YUtleT1cInRpbWVzdGFtcFwiIFxuICAgICAgICAgICAgICAgIHN0cm9rZT1cIiM3MTcxN2FcIiBcbiAgICAgICAgICAgICAgICB0aWNrPXt7IGZpbGw6ICcjYTFhMWFhJywgZm9udFNpemU6IDEwLCBmb250RmFtaWx5OiAnbW9ub3NwYWNlJyB9fVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8WUF4aXMgXG4gICAgICAgICAgICAgICAgc3Ryb2tlPVwiIzcxNzE3YVwiIFxuICAgICAgICAgICAgICAgIHRpY2s9e3sgZmlsbDogJyNhMWExYWEnLCBmb250U2l6ZTogMTAsIGZvbnRGYW1pbHk6ICdtb25vc3BhY2UnIH19XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxUb29sdGlwIFxuICAgICAgICAgICAgICAgIGNvbnRlbnRTdHlsZT17eyBcbiAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyMwOTA5MGInLCBcbiAgICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiAnIzYzNjZmMScsIFxuICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMTJweCcsXG4gICAgICAgICAgICAgICAgICBmb250RmFtaWx5OiAnbW9ub3NwYWNlJyxcbiAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMTFweCcsXG4gICAgICAgICAgICAgICAgICBjb2xvcjogJyNmZmYnXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPExlZ2VuZCBcbiAgICAgICAgICAgICAgICB2ZXJ0aWNhbEFsaWduPVwidG9wXCIgXG4gICAgICAgICAgICAgICAgaGVpZ2h0PXszNn0gXG4gICAgICAgICAgICAgICAgd3JhcHBlclN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGZvbnRGYW1pbHk6ICdtb25vc3BhY2UnLCBjb2xvcjogJyNhMWExYWEnIH19IFxuICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgIHsvKiBNYWlucyA1MEh6IHRyYWNlIChzaG93cyBlZmZlY3Qgb2YgY2FuY2VsbGF0aW9uKSAqL31cbiAgICAgICAgICAgICAgPExpbmUgXG4gICAgICAgICAgICAgICAgdHlwZT1cIm1vbm90b25lXCIgXG4gICAgICAgICAgICAgICAgZGF0YUtleT1cIm1haW5zNTBIekZpZWxkXCIgXG4gICAgICAgICAgICAgICAgbmFtZT1cIjUwIEh6IFNpZcSHIEFDIChQbyBmaWx0cmFjamkpXCIgXG4gICAgICAgICAgICAgICAgc3Ryb2tlPVwiI2Y0M2Y1ZVwiIFxuICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPXsyfVxuICAgICAgICAgICAgICAgIGRvdD17ZmFsc2V9XG4gICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgey8qIFBXTSAxMDBIeiByaXBwbGUgdHJhY2UgKi99XG4gICAgICAgICAgICAgIDxMaW5lIFxuICAgICAgICAgICAgICAgIHR5cGU9XCJtb25vdG9uZVwiIFxuICAgICAgICAgICAgICAgIGRhdGFLZXk9XCJwd20xMDBIekZpZWxkXCIgXG4gICAgICAgICAgICAgICAgbmFtZT1cIjEwMCBIeiBQV00gVMSZdG5pZW5pZVwiIFxuICAgICAgICAgICAgICAgIHN0cm9rZT1cIiNlYWIzMDhcIiBcbiAgICAgICAgICAgICAgICBzdHJva2VXaWR0aD17Mn1cbiAgICAgICAgICAgICAgICBkb3Q9e2ZhbHNlfVxuICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgIHsvKiBTY2h1bWFubiBFTEYgTmF0dXJhbCBSZXNvbmFuY2UgKi99XG4gICAgICAgICAgICAgIDxMaW5lIFxuICAgICAgICAgICAgICAgIHR5cGU9XCJtb25vdG9uZVwiIFxuICAgICAgICAgICAgICAgIGRhdGFLZXk9XCJzY2h1bWFubkZpZWxkXCIgXG4gICAgICAgICAgICAgICAgbmFtZT1cIjcuODMgSHogU2NodW1hbm4gRUxGXCIgXG4gICAgICAgICAgICAgICAgc3Ryb2tlPVwiIzA2YjZkNFwiIFxuICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPXsyLjV9XG4gICAgICAgICAgICAgICAgZG90PXtmYWxzZX1cbiAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICB7LyogUkYgQ2xvY2sgbGluZSAqL31cbiAgICAgICAgICAgICAgPExpbmUgXG4gICAgICAgICAgICAgICAgdHlwZT1cIm1vbm90b25lXCIgXG4gICAgICAgICAgICAgICAgZGF0YUtleT1cInJmQ2xvY2tGaWVsZFwiIFxuICAgICAgICAgICAgICAgIG5hbWU9XCJQQ0llIDUuMCBSRiBDbG9jayAoR0h6KVwiIFxuICAgICAgICAgICAgICAgIHN0cm9rZT1cIiNhODU1ZjdcIiBcbiAgICAgICAgICAgICAgICBzdHJva2VXaWR0aD17MS41fVxuICAgICAgICAgICAgICAgIGRvdD17ZmFsc2V9XG4gICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgey8qIEh5cGVyYm9saWMgaW5kZXggdHJhY2UgKi99XG4gICAgICAgICAgICAgIHtzZWxlY3RlZERpc3BsYXlQYXJhbSA9PT0gJ0hZUEVSQk9MSUMnICYmIChcbiAgICAgICAgICAgICAgICA8TGluZSBcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJtb25vdG9uZVwiIFxuICAgICAgICAgICAgICAgICAgZGF0YUtleT1cImh5cGVyYm9saWNJbmRleFwiIFxuICAgICAgICAgICAgICAgICAgbmFtZT1cIldza2HFum5payBIaXBlcmJvbGl6YWNqaVwiIFxuICAgICAgICAgICAgICAgICAgc3Ryb2tlPVwiIzEwYjk4MVwiIFxuICAgICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg9ezJ9XG4gICAgICAgICAgICAgICAgICBkb3Q9e2ZhbHNlfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L0xpbmVDaGFydD5cbiAgICAgICAgICA8L1Jlc3BvbnNpdmVDb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQtWzExcHhdIGZvbnQtbW9ubyB0ZXh0LXppbmMtNDAwIHB0LTIgYm9yZGVyLXQgYm9yZGVyLXppbmMtODAwLzgwXCI+XG4gICAgICAgICAgPHNwYW4+KiBaYXN0b3Nvd2FuaWUgcHJ6ZWNpd2ZhenkgMTgwwrAgb2JuacW8YSBhbXBsaXR1ZMSZIHNrxYJhZG93ZWogNTAgSHogaSAxMDAgSHogZG8gYmV6cGllY3pueWNoIHdhcnRvxZtjaSBwb2Rwcm9nb3d5Y2guPC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtaW5kaWdvLTMwMFwiPldla3RvciBQb3ludGluZ2Egb2JsaWN6YW55IHcgcHJ6ZXN0cnplbmkgdHLDs2pvc2lvd2VqIFtTeCwgU3ksIFN6XTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIEdyaWQgb2YgQWxsIDcgU3BlY2lhbGl6ZWQgU2Vuc29yIE5vZGVzICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy0zIGdhcC00XCI+XG4gICAgICAgIHtlbmdpbmVTdGF0ZS5ub2Rlcy5tYXAoKG5vZGUpID0+IHtcbiAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gc2VsZWN0ZWROb2RlSWQgPT09IG5vZGUuaWQ7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAga2V5PXtub2RlLmlkfVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTZWxlY3RlZE5vZGVJZChub2RlLmlkKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC00IHJvdW5kZWQtMnhsIGJvcmRlci0yIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyIGZvbnQtbW9ubyBzcGFjZS15LTMgJHtcbiAgICAgICAgICAgICAgICBpc1NlbGVjdGVkIFxuICAgICAgICAgICAgICAgICAgPyAnYmctaW5kaWdvLTk1MC84MCBib3JkZXItaW5kaWdvLTQwMCBzaGFkb3cteGwgc2hhZG93LWluZGlnby05NTAvNTAnIFxuICAgICAgICAgICAgICAgICAgOiAnYmctemluYy05NTAvOTAgYm9yZGVyLXppbmMtODAwIGhvdmVyOmJvcmRlci16aW5jLTcwMCdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBqdXN0aWZ5LWJldHdlZW4gZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIGxlYWRpbmctc251Z1wiPntub2RlLm5hbWUuc3BsaXQoJyAoJylbMF19PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtemluYy00MDBcIj57bm9kZS5mcmVxdWVuY3lCYW5kTmFtZX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2BweC0yIHB5LTAuNSByb3VuZGVkIHRleHQtWzlweF0gZm9udC1ib2xkIGJvcmRlciBzaHJpbmstMCAke1xuICAgICAgICAgICAgICAgICAgbm9kZS5yZXNvbmFuY2VDYW5jZWxsYXRpb25BY3RpdmUgXG4gICAgICAgICAgICAgICAgICAgID8gJ2JnLWVtZXJhbGQtOTUwIHRleHQtZW1lcmFsZC0zMDAgYm9yZGVyLWVtZXJhbGQtNTAwJyBcbiAgICAgICAgICAgICAgICAgICAgOiAnYmctemluYy05MDAgdGV4dC16aW5jLTQwMCBib3JkZXItemluYy03MDAnXG4gICAgICAgICAgICAgICAgfWB9PlxuICAgICAgICAgICAgICAgICAge25vZGUucmVzb25hbmNlQ2FuY2VsbGF0aW9uQWN0aXZlID8gJ1BSWkVDSVdGQVpBJyA6ICdOQVRVUkFMTlknfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIE51bWVyaWNhbCBNZXRyaWNzICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTIgdGV4dC14c1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yIHJvdW5kZWQteGwgYmctemluYy05MDAgYm9yZGVyIGJvcmRlci16aW5jLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB0ZXh0LXppbmMtNTAwIGJsb2NrXCI+UG9sZSBFOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtY3lhbi0zMDBcIj57bm9kZS5lbGVjdHJpY0ZpZWxkVnBtfSBWL208L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC14bCBiZy16aW5jLTkwMCBib3JkZXIgYm9yZGVyLXppbmMtODAwXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtemluYy01MDAgYmxvY2tcIj5JbmR1a2NqYSBCOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtYW1iZXItMzAwXCI+e25vZGUubWFnbmV0aWNGaWVsZE1pY3JvVH0gwrVUPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yIHJvdW5kZWQteGwgYmctemluYy05MDAgYm9yZGVyIGJvcmRlci16aW5jLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB0ZXh0LXppbmMtNTAwIGJsb2NrXCI+RmF6YSAvIFBvbGFyeXphY2phOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtYm9sZCB0ZXh0LWluZGlnby0zMDBcIj57bm9kZS5waGFzZUFuZ2xlRGVnfcKwIC8ge25vZGUucG9sYXJpemF0aW9ufTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMiByb3VuZGVkLXhsIGJnLXppbmMtOTAwIGJvcmRlciBib3JkZXItemluYy04MDBcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzlweF0gdGV4dC16aW5jLTUwMCBibG9ja1wiPlNXUiAvIFE6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1ib2xkIHRleHQtcHVycGxlLTMwMFwiPntub2RlLnN0YW5kaW5nV2F2ZVJhdGlvU3dyfSAvIFE9e25vZGUucXVhbGl0eUZhY3RvclF9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogUG95bnRpbmcgdmVjdG9yICYgQ29vcmRzIGZvb3RlciAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXppbmMtNDAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBib3JkZXItdCBib3JkZXItemluYy04MDAvODAgcHQtMlwiPlxuICAgICAgICAgICAgICAgIDxzcGFuPlBveW50aW5nOiBbe25vZGUucG95bnRpbmdWZWN0b3IueH0sIHtub2RlLnBveW50aW5nVmVjdG9yLnl9LCB7bm9kZS5wb3ludGluZ1ZlY3Rvci56fV08L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC16aW5jLTUwMFwiPlNvbmRhIFt7bm9kZS5jb29yZHMueH0se25vZGUuY29vcmRzLnl9LHtub2RlLmNvb3Jkcy56fV08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSl9XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIEluY2lkZW50ICYgU3VwZXJwb3NpdGlvbiBFdmVudCBMb2cgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdW5kZWQtM3hsIGJnLXppbmMtOTUwLzk1IGJvcmRlci0yIGJvcmRlci16aW5jLTgwMCBwLTQgc206cC01IHNwYWNlLXktMyBmb250LW1vbm8gdGV4dC14c1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBib3JkZXItYiBib3JkZXItemluYy04MDAgcGItMlwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtemluYy0yMDAgZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICA8QWN0aXZpdHkgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWluZGlnby00MDBcIiAvPlxuICAgICAgICAgICAgPHNwYW4+RFpJRU5OSUsgWkRBUlpFxYMgU1VQRVJQT1pZQ0pJIEZBTCAmIFpOT1NaRU5JQSBSRVpPTkFOU1U8L3NwYW4+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtemluYy00MDBcIj5SZWplc3RyYWNqYSB3IGN6YXNpZSByemVjenl3aXN0eW08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LWgtMzYgb3ZlcmZsb3cteS1hdXRvIHNwYWNlLXktMS41IHByLTEgdGV4dC1bMTFweF1cIj5cbiAgICAgICAgICB7ZW5naW5lU3RhdGUuaW5jaWRlbnRMb2dzLm1hcCgobG9nKSA9PiAoXG4gICAgICAgICAgICA8ZGl2IFxuICAgICAgICAgICAgICBrZXk9e2xvZy5pZH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0yLjUgcm91bmRlZC14bCBiZy16aW5jLTkwMCBib3JkZXIgYm9yZGVyLXppbmMtODAwIGZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgc206aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMS41IGhvdmVyOmJvcmRlci16aW5jLTcwMFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWluZGlnby00MDAgZm9udC1ib2xkXCI+W3tsb2cudHlwZX1dPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtemluYy0yMDBcIj57bG9nLm1lc3NhZ2V9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyBzaHJpbmstMCB0ZXh0LVsxMHB4XSB0ZXh0LXppbmMtNDAwXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1jeWFuLTQwMFwiPntsb2cuZGV0YWlsc308L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC16aW5jLTUwMFwiPntsb2cudGltZXN0YW1wfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdLCJtYXBwaW5ncyI6IkFBeUVjO0FBekVkLFNBQWdCLFVBQVUsaUJBQWlCO0FBQzNDO0FBQUEsRUFDRTtBQUFBLEVBQU87QUFBQSxFQUFPO0FBQUEsRUFBUTtBQUFBLEVBQUs7QUFBQSxFQUFVO0FBQUEsRUFDdkI7QUFBQSxFQUFNO0FBQUEsT0FFZjtBQUNQO0FBQUEsRUFDRTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxPQUlLO0FBQ1AsU0FBUyw2QkFBNkI7QUFPL0IsYUFBTSxxQ0FBd0YsQ0FBQztBQUFBLEVBQ3BHO0FBQ0YsTUFBTTtBQUNKLFFB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