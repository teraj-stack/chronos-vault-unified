import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"];
import {
  Brain,
  HeartPulse,
  Shield,
  ShieldAlert,
  Sparkles,
  Waves,
  Sliders,
  Info
} from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Cell
} from "/sentinel-shield/node_modules/.vite/deps/recharts.js?v=aa2b2d0c";
import { emWaveResonanceEngine } from "/sentinel-shield/src/utils/emWaveResonanceEngine.ts";
export const CerebellumWaveWellbeingChart = ({
  onNotify
}) => {
  const [engineState, setEngineState] = useState(() => emWaveResonanceEngine.getState());
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("ALL");
  const [selectedBand, setSelectedBand] = useState(() => {
    const s = emWaveResonanceEngine.getState();
    return s.cerebellumBands.find((b) => b.bandId === "band-schumann") || s.cerebellumBands[0];
  });
  useEffect(() => {
    const unsub = emWaveResonanceEngine.subscribe((s) => {
      setEngineState(s);
    });
    return () => unsub();
  }, []);
  const handleToggleAntiPhase = () => {
    emWaveResonanceEngine.toggleGlobalAntiPhaseSuppression();
    const isNowActive = !engineState.antiPhaseHarmonicSuppressionActive;
    if (onNotify) {
      onNotify(isNowActive ? "🛡️ Załączono aktywne znoszenie w przeciwfazie (180° Anti-Phase) – szkodliwe piki zneutralizowane!" : "⚠️ Wyłączono znoszenie przeciwfazą – fale sieci i PWM ulegają niekontrolowanemu nakładaniu.");
    }
  };
  const chartData = engineState.cerebellumBands.map((band) => {
    let effectiveScore = band.cerebellarImpactScore;
    if (engineState.antiPhaseHarmonicSuppressionActive && band.cerebellarImpactScore < 0) {
      effectiveScore = +(effectiveScore * 0.18).toFixed(1);
    }
    return {
      bandId: band.bandId,
      name: band.name.split(" (")[0],
      fullName: band.name,
      range: band.frequencyRange,
      freqHz: band.centerFrequencyHz,
      rawScore: band.cerebellarImpactScore,
      score: effectiveScore,
      isPositive: effectiveScore >= 0,
      category: band.category,
      info: band
    };
  }).filter((item) => {
    if (selectedCategoryFilter === "POSITIVE_ONLY") return item.score >= 0;
    if (selectedCategoryFilter === "HARMFUL_ONLY") return item.rawScore < 0;
    return true;
  });
  const liveCoherence = engineState.oscilloscopeHistory.length > 0 ? engineState.oscilloscopeHistory[engineState.oscilloscopeHistory.length - 1].cerebellarCoherenceScore : 88.5;
  return /* @__PURE__ */ jsxDEV("div", { className: "w-full space-y-6 text-white", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "rounded-3xl bg-zinc-950/95 border-2 border-emerald-500/40 p-5 sm:p-6 shadow-2xl space-y-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-zinc-800", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3.5", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-950 via-teal-950 to-zinc-950 border-2 border-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0", children: /* @__PURE__ */ jsxDEV(Brain, { className: "w-6 h-6 text-emerald-300 animate-pulse" }, void 0, false, {
            fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
            lineNumber: 92,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
            lineNumber: 91,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxDEV("h2", { className: "text-base sm:text-lg font-black font-mono tracking-tight text-white uppercase flex items-center gap-2", children: /* @__PURE__ */ jsxDEV("span", { children: "SPEKTROGRAM WPŁYWU FAL NA MÓŻDŻEK & SAMOPOCZUCIE" }, void 0, false, {
                fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
                lineNumber: 97,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
                lineNumber: 96,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black border bg-emerald-950/80 border-emerald-500 text-emerald-300", children: "NEURO-COHERENCE INDEX" }, void 0, false, {
                fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
                lineNumber: 99,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: `px-2 py-0.5 rounded-full text-[10px] font-mono border ${engineState.antiPhaseHarmonicSuppressionActive ? "bg-cyan-950/80 border-cyan-400 text-cyan-300" : "bg-rose-950/80 border-rose-500 text-rose-300"}`, children: engineState.antiPhaseHarmonicSuppressionActive ? "TARCZA PRZECIWFAZOWA (180°) AKTYWNA" : "TARCZA PRZECIWFAZOWA WYŁĄCZONA" }, void 0, false, {
                fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
                lineNumber: 102,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
              lineNumber: 95,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-zinc-400 mt-0.5", children: "Precyzyjna identyfikacja pasm częstotliwości wspierających komórki Purkinjego i koordynację przedsionkową vs fale wywołujące stres i dysfunkcje odruchu VOR." }, void 0, false, {
              fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
              lineNumber: 110,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
            lineNumber: 94,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
          lineNumber: 90,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleToggleAntiPhase,
            className: `px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 border transition-all cursor-pointer shadow-lg ${engineState.antiPhaseHarmonicSuppressionActive ? "bg-emerald-900/80 hover:bg-emerald-800 text-emerald-100 border-emerald-400 shadow-emerald-950/60" : "bg-rose-950/90 hover:bg-rose-900 text-rose-200 border-rose-500 shadow-rose-950/60 animate-pulse"}`,
            children: [
              /* @__PURE__ */ jsxDEV(Shield, { className: "w-4 h-4 text-emerald-300" }, void 0, false, {
                fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
                lineNumber: 126,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: engineState.antiPhaseHarmonicSuppressionActive ? "Znoszenie Przeciwfazą 180°: WŁĄCZONE" : "AKTYWUJ ZNOSZENIE PRZECIWFAZĄ (180°)" }, void 0, false, {
                fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
                lineNumber: 127,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
            lineNumber: 118,
            columnNumber: 13
          },
          this
        ) }, void 0, false, {
          fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
          lineNumber: 117,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
        lineNumber: 89,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-2xl bg-zinc-900/80 border border-emerald-500/30", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] font-mono text-zinc-400 uppercase", children: "Wskaźnik Koherencji Móżdżku" }, void 0, false, {
            fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
            lineNumber: 139,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-2xl font-black font-mono text-emerald-300 flex items-center gap-1.5 mt-0.5", children: [
            /* @__PURE__ */ jsxDEV(HeartPulse, { className: "w-5 h-5 text-emerald-400" }, void 0, false, {
              fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
              lineNumber: 141,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              liveCoherence,
              "%"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
              lineNumber: 142,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
            lineNumber: 140,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-emerald-400 font-mono mt-0.5", children: liveCoherence >= 85 ? "Stan optymalny (Flow / Spokojna Czujność)" : "Obciążenie szumem harmonicznym" }, void 0, false, {
            fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
            lineNumber: 144,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
          lineNumber: 138,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-2xl bg-zinc-900/80 border border-cyan-500/30", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] font-mono text-zinc-400 uppercase", children: "Rezonans Referencyjny (Ziemia)" }, void 0, false, {
            fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
            lineNumber: 150,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-2xl font-black font-mono text-cyan-300 flex items-center gap-1.5 mt-0.5", children: [
            /* @__PURE__ */ jsxDEV(Waves, { className: "w-5 h-5 text-cyan-400" }, void 0, false, {
              fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
              lineNumber: 152,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "7.83 Hz" }, void 0, false, {
              fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
              lineNumber: 153,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
            lineNumber: 151,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-cyan-300 font-mono mt-0.5", children: "Maksimum Bio-Kompatybilności (+96 pkt)" }, void 0, false, {
            fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
            lineNumber: 155,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
          lineNumber: 149,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-2xl bg-zinc-900/80 border border-indigo-500/30", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] font-mono text-zinc-400 uppercase", children: "Rytm Sensomotoryczny (SMR)" }, void 0, false, {
            fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
            lineNumber: 159,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-2xl font-black font-mono text-indigo-300 flex items-center gap-1.5 mt-0.5", children: [
            /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-5 h-5 text-indigo-400" }, void 0, false, {
              fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
              lineNumber: 161,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "12 - 15 Hz" }, void 0, false, {
              fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
              lineNumber: 162,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
            lineNumber: 160,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-indigo-300 font-mono mt-0.5", children: "Wyciszenie ruchowe & balans błędnika" }, void 0, false, {
            fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
            lineNumber: 164,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
          lineNumber: 158,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-2xl bg-zinc-900/80 border border-rose-500/30", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] font-mono text-zinc-400 uppercase", children: "Tłumienie Migotania PWM (100 Hz)" }, void 0, false, {
            fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
            lineNumber: 168,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-2xl font-black font-mono text-rose-300 flex items-center gap-1.5 mt-0.5", children: [
            /* @__PURE__ */ jsxDEV(ShieldAlert, { className: "w-5 h-5 text-rose-400" }, void 0, false, {
              fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
              lineNumber: 170,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: engineState.antiPhaseHarmonicSuppressionActive ? "-41.5 dB" : "0.0 dB (Zagrożenie)" }, void 0, false, {
              fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
              lineNumber: 171,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
            lineNumber: 169,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-zinc-400 font-mono mt-0.5", children: "Ochrona odruchu przedsionkowo-ocznego" }, void 0, false, {
            fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
            lineNumber: 173,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
          lineNumber: 167,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
        lineNumber: 137,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
      lineNumber: 88,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "rounded-2xl bg-zinc-950/90 border border-zinc-800 p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-400 uppercase font-bold flex items-center gap-1", children: [
          /* @__PURE__ */ jsxDEV(Sliders, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
            fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
            lineNumber: 182,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Filtruj Pasma na Wykresie:" }, void 0, false, {
            fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
            lineNumber: 183,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
          lineNumber: 181,
          columnNumber: 11
        }, this),
        [
          { id: "ALL", label: "Wszystkie Pasma (Pełne Spektrum)" },
          { id: "POSITIVE_ONLY", label: "🌿 Tylko Pozytywne / Regeneracyjne" },
          { id: "HARMFUL_ONLY", label: "⚠️ Tylko Fale Szkodliwe / Stresogenne" }
        ].map((f) => /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setSelectedCategoryFilter(f.id),
            className: `px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${selectedCategoryFilter === f.id ? "bg-emerald-950 text-emerald-200 border-emerald-400 shadow-md shadow-emerald-950" : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200"}`,
            children: f.label
          },
          f.id,
          false,
          {
            fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
            lineNumber: 191,
            columnNumber: 13
          },
          this
        ))
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
        lineNumber: 180,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] text-zinc-400 flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxDEV(Info, { className: "w-3.5 h-3.5 text-cyan-400 shrink-0" }, void 0, false, {
          fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
          lineNumber: 206,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: "Kliknij dowolny słupek na wykresie, aby zobaczyć pełną analizę neurologiczną." }, void 0, false, {
          fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
          lineNumber: 207,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
        lineNumber: 205,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
      lineNumber: 179,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "rounded-3xl bg-zinc-950/95 border-2 border-emerald-500/30 p-4 sm:p-6 shadow-2xl space-y-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(Brain, { className: "w-5 h-5 text-emerald-400" }, void 0, false, {
            fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
            lineNumber: 215,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("h3", { className: "text-sm sm:text-base font-black font-mono text-white uppercase", children: "WPŁYW POSZCZEGÓLNYCH CZĘSTOTLIWOŚCI NA MÓŻDŻEK (OD -100 DO +100 PUNKTÓW)" }, void 0, false, {
            fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
            lineNumber: 216,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
          lineNumber: 214,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 text-xs font-mono", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1 text-emerald-400", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "w-2.5 h-2.5 rounded-full bg-emerald-500" }, void 0, false, {
              fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
              lineNumber: 222,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Strefa Dobrostanu (> 0)" }, void 0, false, {
              fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
              lineNumber: 223,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
            lineNumber: 221,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1 text-rose-400", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "w-2.5 h-2.5 rounded-full bg-rose-500" }, void 0, false, {
              fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
              lineNumber: 226,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Strefa Stresu / Dysfunkcji (< 0)" }, void 0, false, {
              fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
              lineNumber: 227,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
            lineNumber: 225,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
          lineNumber: 220,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
        lineNumber: 213,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "w-full h-80 sm:h-96", children: /* @__PURE__ */ jsxDEV(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxDEV(
        ComposedChart,
        {
          data: chartData,
          onClick: (e) => {
            if (e && e.activePayload && e.activePayload.length > 0) {
              const clickedInfo = e.activePayload[0].payload.info;
              if (clickedInfo) setSelectedBand(clickedInfo);
            }
          },
          margin: { top: 20, right: 25, left: 0, bottom: 40 },
          children: [
            /* @__PURE__ */ jsxDEV(CartesianGrid, { strokeDasharray: "3 3", stroke: "#27272a" }, void 0, false, {
              fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
              lineNumber: 245,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV(
              XAxis,
              {
                dataKey: "name",
                stroke: "#71717a",
                tick: { fill: "#a1a1aa", fontSize: 10, fontFamily: "monospace" },
                interval: 0,
                angle: -25,
                textAnchor: "end",
                height: 55
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
                lineNumber: 246,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              YAxis,
              {
                domain: [-100, 100],
                stroke: "#71717a",
                tick: { fill: "#a1a1aa", fontSize: 10, fontFamily: "monospace" },
                label: {
                  value: "Wskaźnik Wpływu na Móżdżek [-100 do +100]",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#71717a",
                  fontSize: 10
                }
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
                lineNumber: 255,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(ReferenceLine, { y: 0, stroke: "#52525b", strokeWidth: 1.5 }, void 0, false, {
              fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
              lineNumber: 267,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV(ReferenceLine, { y: 85, stroke: "#10b981", strokeDasharray: "3 3", label: { value: "PROG WYSOKIEJ KOHERENCJI (+85)", fill: "#10b981", fontSize: 9 } }, void 0, false, {
              fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
              lineNumber: 268,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV(ReferenceLine, { y: -70, stroke: "#f43f5e", strokeDasharray: "3 3", label: { value: "PROG PRZEWLEKŁEGO STRESU (-70)", fill: "#f43f5e", fontSize: 9 } }, void 0, false, {
              fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
              lineNumber: 269,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV(
              Tooltip,
              {
                contentStyle: {
                  backgroundColor: "#09090b",
                  borderColor: "#10b981",
                  borderRadius: "14px",
                  fontFamily: "monospace",
                  fontSize: "11px",
                  color: "#fff",
                  boxShadow: "0 0 25px rgba(16,185,129,0.3)"
                },
                formatter: (val, name, item) => {
                  const p = item.payload;
                  return [
                    `${val > 0 ? "+" : ""}${val} pkt (Wpływ: ${val > 0 ? "Pozytywny" : "Negatywny/Stresujący"})`,
                    `Pasmo: ${p.range}`
                  ];
                },
                labelFormatter: (label) => `Częstotliwość: ${label}`
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
                lineNumber: 271,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(Bar, { dataKey: "score", name: "Wskaźnik Móżdżkowy", radius: [6, 6, 0, 0], children: chartData.map((entry, index) => {
              let fillColor = "#10b981";
              if (entry.score < 0) {
                fillColor = "#f43f5e";
              } else if (entry.score >= 85) {
                fillColor = "#06b6d4";
              }
              if (selectedBand && selectedBand.bandId === entry.bandId) {
                fillColor = "#f59e0b";
              }
              return /* @__PURE__ */ jsxDEV(Cell, { fill: fillColor }, `cell-${index}`, false, {
                fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
                lineNumber: 302,
                columnNumber: 26
              }, this);
            }) }, void 0, false, {
              fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
              lineNumber: 291,
              columnNumber: 15
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
          lineNumber: 235,
          columnNumber: 13
        },
        this
      ) }, void 0, false, {
        fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
        lineNumber: 234,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
        lineNumber: 233,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] font-mono text-zinc-400 pt-2 border-t border-zinc-800/80 gap-2", children: [
        /* @__PURE__ */ jsxDEV("span", { children: "* Wskaźnik punktowy oparty na neurofizjologicznych badaniach koherencji komórek Purkinjego i odruchu VOR." }, void 0, false, {
          fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
          lineNumber: 310,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-300", children: engineState.antiPhaseHarmonicSuppressionActive ? "Włączone znoszenie przeciwfazą niweluje negatywne słupki do bezpiecznego poziomu bliskiego zeru." : "Wyłączone znoszenie ukazuje surową destrukcyjność harmonicznych sieci i PWM." }, void 0, false, {
          fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
          lineNumber: 311,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
        lineNumber: 309,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
      lineNumber: 212,
      columnNumber: 7
    }, this),
    selectedBand && /* @__PURE__ */ jsxDEV("div", { className: "rounded-3xl bg-zinc-950/95 border-2 border-zinc-800 p-5 sm:p-6 space-y-4 shadow-2xl", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxDEV("div", { className: `w-10 h-10 rounded-xl flex items-center justify-center border font-bold text-sm ${selectedBand.cerebellarImpactScore >= 0 ? "bg-emerald-950/80 border-emerald-400 text-emerald-300" : "bg-rose-950/80 border-rose-500 text-rose-300"}`, children: [
            selectedBand.cerebellarImpactScore >= 0 ? "+" : "",
            selectedBand.cerebellarImpactScore
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
            lineNumber: 324,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("h4", { className: "text-base font-bold text-white font-mono", children: selectedBand.name }, void 0, false, {
              fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
              lineNumber: 332,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-xs text-zinc-400 font-mono", children: [
              "Zakres częstotliwości: ",
              /* @__PURE__ */ jsxDEV("strong", { className: "text-cyan-300", children: selectedBand.frequencyRange }, void 0, false, {
                fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
                lineNumber: 333,
                columnNumber: 89
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
              lineNumber: 333,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
            lineNumber: 331,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
          lineNumber: 323,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxDEV("span", { className: `px-3 py-1 rounded-full text-xs font-mono font-bold border ${selectedBand.cerebellarImpactScore >= 0 ? "bg-emerald-950 text-emerald-300 border-emerald-500/50" : "bg-rose-950 text-rose-300 border-rose-500/50"}`, children: selectedBand.cerebellarImpactScore >= 0 ? "🌿 WPŁYW POZYTYWNY" : "⚠️ ZAGROŻENIE DLA MÓŻDŻKU" }, void 0, false, {
          fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
          lineNumber: 338,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
          lineNumber: 337,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
        lineNumber: 322,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-400 block uppercase font-bold text-[10px]", children: "Mechanizm Neuro-Fizjologiczny:" }, void 0, false, {
            fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
            lineNumber: 350,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-zinc-200 leading-relaxed", children: selectedBand.physiologicalEffect }, void 0, false, {
            fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
            lineNumber: 351,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
          lineNumber: 349,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-400 block uppercase font-bold text-[10px]", children: "Docelowe Komórki i Struktury Móżdżku:" }, void 0, false, {
            fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
            lineNumber: 355,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-cyan-300 font-semibold leading-relaxed", children: selectedBand.cerebellumCellTarget }, void 0, false, {
            fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
            lineNumber: 356,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
          lineNumber: 354,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-400 block uppercase font-bold text-[10px]", children: "Objawy Kliniczne lub Korzyści:" }, void 0, false, {
            fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
            lineNumber: 360,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-zinc-200 leading-relaxed", children: selectedBand.symptomsOrBenefits }, void 0, false, {
            fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
            lineNumber: 361,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
          lineNumber: 359,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-400 block uppercase font-bold text-[10px]", children: "Zalecenie Ochronne / Inżynieryjne:" }, void 0, false, {
            fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
            lineNumber: 365,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-amber-300 leading-relaxed font-semibold", children: selectedBand.recommendedAction }, void 0, false, {
            fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
            lineNumber: 366,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
          lineNumber: 364,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
        lineNumber: 348,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
      lineNumber: 321,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/CerebellumWaveWellbeingChart.tsx",
    lineNumber: 86,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNlcmViZWxsdW1XYXZlV2VsbGJlaW5nQ2hhcnQudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgXG4gIEJyYWluLCBIZWFydFB1bHNlLCBTaGllbGQsIFNoaWVsZEFsZXJ0LCBTcGFya2xlcywgQ2hlY2tDaXJjbGUyLCBcbiAgQWxlcnRUcmlhbmdsZSwgUmFkaW8sIFdhdmVzLCBTbGlkZXJzLCBaYXAsIEV5ZSwgRG93bmxvYWQsIEluZm9cbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IFxuICBSZXNwb25zaXZlQ29udGFpbmVyLCBcbiAgQ29tcG9zZWRDaGFydCwgXG4gIEFyZWEsIFxuICBCYXIsIFxuICBMaW5lLCBcbiAgWEF4aXMsIFxuICBZQXhpcywgXG4gIENhcnRlc2lhbkdyaWQsIFxuICBUb29sdGlwLCBcbiAgUmVmZXJlbmNlTGluZSwgXG4gIENlbGwgXG59IGZyb20gJ3JlY2hhcnRzJztcbmltcG9ydCB7IGVtV2F2ZVJlc29uYW5jZUVuZ2luZSB9IGZyb20gJy4uL3V0aWxzL2VtV2F2ZVJlc29uYW5jZUVuZ2luZSc7XG5pbXBvcnQgeyBDZXJlYmVsbHVtV2F2ZUJhbmRJbmZvIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5pbnRlcmZhY2UgQ2VyZWJlbGx1bVdhdmVXZWxsYmVpbmdDaGFydFByb3BzIHtcbiAgb25Ob3RpZnk/OiAobXNnOiBzdHJpbmcpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBjb25zdCBDZXJlYmVsbHVtV2F2ZVdlbGxiZWluZ0NoYXJ0OiBSZWFjdC5GQzxDZXJlYmVsbHVtV2F2ZVdlbGxiZWluZ0NoYXJ0UHJvcHM+ID0gKHtcbiAgb25Ob3RpZnlcbn0pID0+IHtcbiAgY29uc3QgW2VuZ2luZVN0YXRlLCBzZXRFbmdpbmVTdGF0ZV0gPSB1c2VTdGF0ZSgoKSA9PiBlbVdhdmVSZXNvbmFuY2VFbmdpbmUuZ2V0U3RhdGUoKSk7XG4gIGNvbnN0IFtzZWxlY3RlZENhdGVnb3J5RmlsdGVyLCBzZXRTZWxlY3RlZENhdGVnb3J5RmlsdGVyXSA9IHVzZVN0YXRlPCdBTEwnIHwgJ1BPU0lUSVZFX09OTFknIHwgJ0hBUk1GVUxfT05MWSc+KCdBTEwnKTtcbiAgY29uc3QgW3NlbGVjdGVkQmFuZCwgc2V0U2VsZWN0ZWRCYW5kXSA9IHVzZVN0YXRlPENlcmViZWxsdW1XYXZlQmFuZEluZm8gfCBudWxsPigoKSA9PiB7XG4gICAgY29uc3QgcyA9IGVtV2F2ZVJlc29uYW5jZUVuZ2luZS5nZXRTdGF0ZSgpO1xuICAgIHJldHVybiBzLmNlcmViZWxsdW1CYW5kcy5maW5kKGIgPT4gYi5iYW5kSWQgPT09ICdiYW5kLXNjaHVtYW5uJykgfHwgcy5jZXJlYmVsbHVtQmFuZHNbMF07XG4gIH0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgdW5zdWIgPSBlbVdhdmVSZXNvbmFuY2VFbmdpbmUuc3Vic2NyaWJlKChzKSA9PiB7XG4gICAgICBzZXRFbmdpbmVTdGF0ZShzKTtcbiAgICB9KTtcbiAgICByZXR1cm4gKCkgPT4gdW5zdWIoKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGhhbmRsZVRvZ2dsZUFudGlQaGFzZSA9ICgpID0+IHtcbiAgICBlbVdhdmVSZXNvbmFuY2VFbmdpbmUudG9nZ2xlR2xvYmFsQW50aVBoYXNlU3VwcHJlc3Npb24oKTtcbiAgICBjb25zdCBpc05vd0FjdGl2ZSA9ICFlbmdpbmVTdGF0ZS5hbnRpUGhhc2VIYXJtb25pY1N1cHByZXNzaW9uQWN0aXZlO1xuICAgIGlmIChvbk5vdGlmeSkge1xuICAgICAgb25Ob3RpZnkoaXNOb3dBY3RpdmUgXG4gICAgICAgID8gJ/Cfm6HvuI8gWmHFgsSFY3pvbm8gYWt0eXduZSB6bm9zemVuaWUgdyBwcnplY2l3ZmF6aWUgKDE4MMKwIEFudGktUGhhc2UpIOKAkyBzemtvZGxpd2UgcGlraSB6bmV1dHJhbGl6b3dhbmUhJyBcbiAgICAgICAgOiAn4pqg77iPIFd5xYLEhWN6b25vIHpub3N6ZW5pZSBwcnplY2l3ZmF6xIUg4oCTIGZhbGUgc2llY2kgaSBQV00gdWxlZ2FqxIUgbmlla29udHJvbG93YW5lbXUgbmFrxYJhZGFuaXUuJyk7XG4gICAgfVxuICB9O1xuXG4gIC8vIFByenlnb3Rvd2FuaWUgZGFueWNoIGRvIHd5a3Jlc3VcbiAgLy8gSmXFm2xpIGFrdHl3bmUgem5vc3plbmllIGplc3Qgd8WCxIVjem9uZSwgc3prb2RsaXdlIHBpa2kgKHVqZW1uZSkgem9zdGFqxIUgZHJhc3R5Y3puaWUgd3l0xYJ1bWlvbmUgdyBraWVydW5rdSB6ZXJhL3N0cmVmeSBiZXpwaWVjem5lalxuICBjb25zdCBjaGFydERhdGEgPSBlbmdpbmVTdGF0ZS5jZXJlYmVsbHVtQmFuZHMubWFwKChiYW5kKSA9PiB7XG4gICAgbGV0IGVmZmVjdGl2ZVNjb3JlID0gYmFuZC5jZXJlYmVsbGFySW1wYWN0U2NvcmU7XG4gICAgaWYgKGVuZ2luZVN0YXRlLmFudGlQaGFzZUhhcm1vbmljU3VwcHJlc3Npb25BY3RpdmUgJiYgYmFuZC5jZXJlYmVsbGFySW1wYWN0U2NvcmUgPCAwKSB7XG4gICAgICAvLyBUxYJ1bWllbmllIGhhcm1vbmljem55Y2ggdyBwcnplY2l3ZmF6aWUgMTgwwrAgcmVkdWt1amUgc3prb2RsaXdvxZvEhyBvIDc1LTg1JVxuICAgICAgZWZmZWN0aXZlU2NvcmUgPSArKGVmZmVjdGl2ZVNjb3JlICogMC4xOCkudG9GaXhlZCgxKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgYmFuZElkOiBiYW5kLmJhbmRJZCxcbiAgICAgIG5hbWU6IGJhbmQubmFtZS5zcGxpdCgnICgnKVswXSxcbiAgICAgIGZ1bGxOYW1lOiBiYW5kLm5hbWUsXG4gICAgICByYW5nZTogYmFuZC5mcmVxdWVuY3lSYW5nZSxcbiAgICAgIGZyZXFIejogYmFuZC5jZW50ZXJGcmVxdWVuY3lIeixcbiAgICAgIHJhd1Njb3JlOiBiYW5kLmNlcmViZWxsYXJJbXBhY3RTY29yZSxcbiAgICAgIHNjb3JlOiBlZmZlY3RpdmVTY29yZSxcbiAgICAgIGlzUG9zaXRpdmU6IGVmZmVjdGl2ZVNjb3JlID49IDAsXG4gICAgICBjYXRlZ29yeTogYmFuZC5jYXRlZ29yeSxcbiAgICAgIGluZm86IGJhbmRcbiAgICB9O1xuICB9KS5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICBpZiAoc2VsZWN0ZWRDYXRlZ29yeUZpbHRlciA9PT0gJ1BPU0lUSVZFX09OTFknKSByZXR1cm4gaXRlbS5zY29yZSA+PSAwO1xuICAgIGlmIChzZWxlY3RlZENhdGVnb3J5RmlsdGVyID09PSAnSEFSTUZVTF9PTkxZJykgcmV0dXJuIGl0ZW0ucmF3U2NvcmUgPCAwO1xuICAgIHJldHVybiB0cnVlO1xuICB9KTtcblxuICAvLyDFmnJlZG5pIHdza2HFum5payBrb2hlcmVuY2ppIG3Ds8W8ZMW8a3UgbmEgxbx5d29cbiAgY29uc3QgbGl2ZUNvaGVyZW5jZSA9IGVuZ2luZVN0YXRlLm9zY2lsbG9zY29wZUhpc3RvcnkubGVuZ3RoID4gMCBcbiAgICA/IGVuZ2luZVN0YXRlLm9zY2lsbG9zY29wZUhpc3RvcnlbZW5naW5lU3RhdGUub3NjaWxsb3Njb3BlSGlzdG9yeS5sZW5ndGggLSAxXS5jZXJlYmVsbGFyQ29oZXJlbmNlU2NvcmUgXG4gICAgOiA4OC41O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgc3BhY2UteS02IHRleHQtd2hpdGVcIj5cbiAgICAgIHsvKiBIZWFkZXIgJiBRdWljayBTdGF0dXMgQmFubmVyICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3VuZGVkLTN4bCBiZy16aW5jLTk1MC85NSBib3JkZXItMiBib3JkZXItZW1lcmFsZC01MDAvNDAgcC01IHNtOnAtNiBzaGFkb3ctMnhsIHNwYWNlLXktNFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgbGc6ZmxleC1yb3cgaXRlbXMtc3RhcnQgbGc6aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNCBwYi00IGJvcmRlci1iIGJvcmRlci16aW5jLTgwMFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0zLjVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xMiBoLTEyIHJvdW5kZWQtMnhsIGJnLWdyYWRpZW50LXRvLWJyIGZyb20tZW1lcmFsZC05NTAgdmlhLXRlYWwtOTUwIHRvLXppbmMtOTUwIGJvcmRlci0yIGJvcmRlci1lbWVyYWxkLTQwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBzaGFkb3ctbGcgc2hhZG93LWVtZXJhbGQtNTAwLzIwIHNocmluay0wXCI+XG4gICAgICAgICAgICAgIDxCcmFpbiBjbGFzc05hbWU9XCJ3LTYgaC02IHRleHQtZW1lcmFsZC0zMDAgYW5pbWF0ZS1wdWxzZVwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgZmxleC13cmFwXCI+XG4gICAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtYmFzZSBzbTp0ZXh0LWxnIGZvbnQtYmxhY2sgZm9udC1tb25vIHRyYWNraW5nLXRpZ2h0IHRleHQtd2hpdGUgdXBwZXJjYXNlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5TUEVLVFJPR1JBTSBXUMWBWVdVIEZBTCBOQSBNw5PFu0TFu0VLICYgU0FNT1BPQ1pVQ0lFPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMi41IHB5LTAuNSByb3VuZGVkLWZ1bGwgdGV4dC1bMTBweF0gZm9udC1tb25vIGZvbnQtYmxhY2sgYm9yZGVyIGJnLWVtZXJhbGQtOTUwLzgwIGJvcmRlci1lbWVyYWxkLTUwMCB0ZXh0LWVtZXJhbGQtMzAwXCI+XG4gICAgICAgICAgICAgICAgICBORVVSTy1DT0hFUkVOQ0UgSU5ERVhcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgcHgtMiBweS0wLjUgcm91bmRlZC1mdWxsIHRleHQtWzEwcHhdIGZvbnQtbW9ubyBib3JkZXIgJHtcbiAgICAgICAgICAgICAgICAgIGVuZ2luZVN0YXRlLmFudGlQaGFzZUhhcm1vbmljU3VwcHJlc3Npb25BY3RpdmUgXG4gICAgICAgICAgICAgICAgICAgID8gJ2JnLWN5YW4tOTUwLzgwIGJvcmRlci1jeWFuLTQwMCB0ZXh0LWN5YW4tMzAwJyBcbiAgICAgICAgICAgICAgICAgICAgOiAnYmctcm9zZS05NTAvODAgYm9yZGVyLXJvc2UtNTAwIHRleHQtcm9zZS0zMDAnXG4gICAgICAgICAgICAgICAgfWB9PlxuICAgICAgICAgICAgICAgICAge2VuZ2luZVN0YXRlLmFudGlQaGFzZUhhcm1vbmljU3VwcHJlc3Npb25BY3RpdmUgPyAnVEFSQ1pBIFBSWkVDSVdGQVpPV0EgKDE4MMKwKSBBS1RZV05BJyA6ICdUQVJDWkEgUFJaRUNJV0ZBWk9XQSBXWcWBxIRDWk9OQSd9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXppbmMtNDAwIG10LTAuNVwiPlxuICAgICAgICAgICAgICAgIFByZWN5enlqbmEgaWRlbnR5ZmlrYWNqYSBwYXNtIGN6xJlzdG90bGl3b8WbY2kgd3NwaWVyYWrEhWN5Y2gga29tw7Nya2kgUHVya2luamVnbyBpIGtvb3JkeW5hY2rEmSBwcnplZHNpb25rb3fEhSB2cyBmYWxlIHd5d2/FgnVqxIVjZSBzdHJlcyBpIGR5c2Z1bmtjamUgb2RydWNodSBWT1IuXG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIFRvZ2dsZSBBbnRpLXBoYXNlIFByb3RlY3Rpb24gYnV0dG9uICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgZmxleC13cmFwXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVRvZ2dsZUFudGlQaGFzZX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtNCBweS0yIHJvdW5kZWQteGwgdGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGJvcmRlciB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBzaGFkb3ctbGcgJHtcbiAgICAgICAgICAgICAgICBlbmdpbmVTdGF0ZS5hbnRpUGhhc2VIYXJtb25pY1N1cHByZXNzaW9uQWN0aXZlXG4gICAgICAgICAgICAgICAgICA/ICdiZy1lbWVyYWxkLTkwMC84MCBob3ZlcjpiZy1lbWVyYWxkLTgwMCB0ZXh0LWVtZXJhbGQtMTAwIGJvcmRlci1lbWVyYWxkLTQwMCBzaGFkb3ctZW1lcmFsZC05NTAvNjAnXG4gICAgICAgICAgICAgICAgICA6ICdiZy1yb3NlLTk1MC85MCBob3ZlcjpiZy1yb3NlLTkwMCB0ZXh0LXJvc2UtMjAwIGJvcmRlci1yb3NlLTUwMCBzaGFkb3ctcm9zZS05NTAvNjAgYW5pbWF0ZS1wdWxzZSdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxTaGllbGQgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWVtZXJhbGQtMzAwXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAge2VuZ2luZVN0YXRlLmFudGlQaGFzZUhhcm1vbmljU3VwcHJlc3Npb25BY3RpdmUgXG4gICAgICAgICAgICAgICAgICA/ICdabm9zemVuaWUgUHJ6ZWNpd2ZhesSFIDE4MMKwOiBXxYHEhENaT05FJyBcbiAgICAgICAgICAgICAgICAgIDogJ0FLVFlXVUogWk5PU1pFTklFIFBSWkVDSVdGQVrEhCAoMTgwwrApJ31cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBMaXZlIE1ldHJpY3MgR3JpZCAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIHNtOmdyaWQtY29scy00IGdhcC0zXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMuNSByb3VuZGVkLTJ4bCBiZy16aW5jLTkwMC84MCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNTAwLzMwXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyB0ZXh0LXppbmMtNDAwIHVwcGVyY2FzZVwiPldza2HFum5payBLb2hlcmVuY2ppIE3Ds8W8ZMW8a3U8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ibGFjayBmb250LW1vbm8gdGV4dC1lbWVyYWxkLTMwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IG10LTAuNVwiPlxuICAgICAgICAgICAgICA8SGVhcnRQdWxzZSBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj57bGl2ZUNvaGVyZW5jZX0lPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzlweF0gdGV4dC1lbWVyYWxkLTQwMCBmb250LW1vbm8gbXQtMC41XCI+XG4gICAgICAgICAgICAgIHtsaXZlQ29oZXJlbmNlID49IDg1ID8gJ1N0YW4gb3B0eW1hbG55IChGbG93IC8gU3Bva29qbmEgQ3p1am5vxZvEhyknIDogJ09iY2nEhcW8ZW5pZSBzenVtZW0gaGFybW9uaWN6bnltJ31cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMuNSByb3VuZGVkLTJ4bCBiZy16aW5jLTkwMC84MCBib3JkZXIgYm9yZGVyLWN5YW4tNTAwLzMwXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyB0ZXh0LXppbmMtNDAwIHVwcGVyY2FzZVwiPlJlem9uYW5zIFJlZmVyZW5jeWpueSAoWmllbWlhKTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJsYWNrIGZvbnQtbW9ubyB0ZXh0LWN5YW4tMzAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgbXQtMC41XCI+XG4gICAgICAgICAgICAgIDxXYXZlcyBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtY3lhbi00MDBcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj43LjgzIEh6PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzlweF0gdGV4dC1jeWFuLTMwMCBmb250LW1vbm8gbXQtMC41XCI+TWFrc2ltdW0gQmlvLUtvbXBhdHliaWxub8WbY2kgKCs5NiBwa3QpPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMy41IHJvdW5kZWQtMnhsIGJnLXppbmMtOTAwLzgwIGJvcmRlciBib3JkZXItaW5kaWdvLTUwMC8zMFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC16aW5jLTQwMCB1cHBlcmNhc2VcIj5SeXRtIFNlbnNvbW90b3J5Y3pueSAoU01SKTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJsYWNrIGZvbnQtbW9ubyB0ZXh0LWluZGlnby0zMDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgPFNwYXJrbGVzIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1pbmRpZ28tNDAwXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+MTIgLSAxNSBIejwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtaW5kaWdvLTMwMCBmb250LW1vbm8gbXQtMC41XCI+V3ljaXN6ZW5pZSBydWNob3dlICYgYmFsYW5zIGLFgsSZZG5pa2E8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zLjUgcm91bmRlZC0yeGwgYmctemluYy05MDAvODAgYm9yZGVyIGJvcmRlci1yb3NlLTUwMC8zMFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC16aW5jLTQwMCB1cHBlcmNhc2VcIj5UxYJ1bWllbmllIE1pZ290YW5pYSBQV00gKDEwMCBIeik8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ibGFjayBmb250LW1vbm8gdGV4dC1yb3NlLTMwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IG10LTAuNVwiPlxuICAgICAgICAgICAgICA8U2hpZWxkQWxlcnQgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LXJvc2UtNDAwXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+e2VuZ2luZVN0YXRlLmFudGlQaGFzZUhhcm1vbmljU3VwcHJlc3Npb25BY3RpdmUgPyAnLTQxLjUgZEInIDogJzAuMCBkQiAoWmFncm/FvGVuaWUpJ308L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB0ZXh0LXppbmMtNDAwIGZvbnQtbW9ubyBtdC0wLjVcIj5PY2hyb25hIG9kcnVjaHUgcHJ6ZWRzaW9ua293by1vY3puZWdvPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBGaWx0ZXIgQmFyICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3VuZGVkLTJ4bCBiZy16aW5jLTk1MC85MCBib3JkZXIgYm9yZGVyLXppbmMtODAwIHAtMy41IGZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgaXRlbXMtc3RhcnQgc206aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMyB0ZXh0LXhzIGZvbnQtbW9ub1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGZsZXgtd3JhcFwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtemluYy00MDAgdXBwZXJjYXNlIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgPFNsaWRlcnMgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1lbWVyYWxkLTQwMFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5GaWx0cnVqIFBhc21hIG5hIFd5a3Jlc2llOjwvc3Bhbj5cbiAgICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgICB7W1xuICAgICAgICAgICAgeyBpZDogJ0FMTCcsIGxhYmVsOiAnV3N6eXN0a2llIFBhc21hIChQZcWCbmUgU3Bla3RydW0pJyB9LFxuICAgICAgICAgICAgeyBpZDogJ1BPU0lUSVZFX09OTFknLCBsYWJlbDogJ/CfjL8gVHlsa28gUG96eXR5d25lIC8gUmVnZW5lcmFjeWpuZScgfSxcbiAgICAgICAgICAgIHsgaWQ6ICdIQVJNRlVMX09OTFknLCBsYWJlbDogJ+KaoO+4jyBUeWxrbyBGYWxlIFN6a29kbGl3ZSAvIFN0cmVzb2dlbm5lJyB9LFxuICAgICAgICAgIF0ubWFwKChmKSA9PiAoXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIGtleT17Zi5pZH1cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2VsZWN0ZWRDYXRlZ29yeUZpbHRlcihmLmlkIGFzIGFueSl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTMgcHktMS41IHJvdW5kZWQteGwgYm9yZGVyIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDYXRlZ29yeUZpbHRlciA9PT0gZi5pZFxuICAgICAgICAgICAgICAgICAgPyAnYmctZW1lcmFsZC05NTAgdGV4dC1lbWVyYWxkLTIwMCBib3JkZXItZW1lcmFsZC00MDAgc2hhZG93LW1kIHNoYWRvdy1lbWVyYWxkLTk1MCdcbiAgICAgICAgICAgICAgICAgIDogJ2JnLXppbmMtOTAwIHRleHQtemluYy00MDAgYm9yZGVyLXppbmMtODAwIGhvdmVyOnRleHQtemluYy0yMDAnXG4gICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7Zi5sYWJlbH1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtemluYy00MDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgIDxJbmZvIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtY3lhbi00MDAgc2hyaW5rLTBcIiAvPlxuICAgICAgICAgIDxzcGFuPktsaWtuaWogZG93b2xueSBzxYJ1cGVrIG5hIHd5a3Jlc2llLCBhYnkgem9iYWN6ecSHIHBlxYJuxIUgYW5hbGl6xJkgbmV1cm9sb2dpY3puxIUuPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogTWFpbiBJbnRlcmFjdGl2ZSBTcGVjdHJ1bSBDaGFydCAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm91bmRlZC0zeGwgYmctemluYy05NTAvOTUgYm9yZGVyLTIgYm9yZGVyLWVtZXJhbGQtNTAwLzMwIHAtNCBzbTpwLTYgc2hhZG93LTJ4bCBzcGFjZS15LTRcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IHNtOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTIgYm9yZGVyLWIgYm9yZGVyLXppbmMtODAwIHBiLTNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICA8QnJhaW4gY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LWVtZXJhbGQtNDAwXCIgLz5cbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXNtIHNtOnRleHQtYmFzZSBmb250LWJsYWNrIGZvbnQtbW9ubyB0ZXh0LXdoaXRlIHVwcGVyY2FzZVwiPlxuICAgICAgICAgICAgICBXUMWBWVcgUE9TWkNaRUfDk0xOWUNIIENaxJhTVE9UTElXT8WaQ0kgTkEgTcOTxbtExbtFSyAoT0QgLTEwMCBETyArMTAwIFBVTktUw5NXKVxuICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zIHRleHQteHMgZm9udC1tb25vXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSB0ZXh0LWVtZXJhbGQtNDAwXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctMi41IGgtMi41IHJvdW5kZWQtZnVsbCBiZy1lbWVyYWxkLTUwMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPlN0cmVmYSBEb2Jyb3N0YW51ICgmZ3Q7IDApPC9zcGFuPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgdGV4dC1yb3NlLTQwMFwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTIuNSBoLTIuNSByb3VuZGVkLWZ1bGwgYmctcm9zZS01MDBcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj5TdHJlZmEgU3RyZXN1IC8gRHlzZnVua2NqaSAoJmx0OyAwKTwvc3Bhbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIFJlY2hhcnRzIEJhci9BcmVhIEh5YnJpZCBWaXN1YWxpemF0aW9uICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBoLTgwIHNtOmgtOTZcIj5cbiAgICAgICAgICA8UmVzcG9uc2l2ZUNvbnRhaW5lciB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCI+XG4gICAgICAgICAgICA8Q29tcG9zZWRDaGFydFxuICAgICAgICAgICAgICBkYXRhPXtjaGFydERhdGF9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eyhlOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZSAmJiBlLmFjdGl2ZVBheWxvYWQgJiYgZS5hY3RpdmVQYXlsb2FkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGNsaWNrZWRJbmZvID0gZS5hY3RpdmVQYXlsb2FkWzBdLnBheWxvYWQuaW5mbztcbiAgICAgICAgICAgICAgICAgIGlmIChjbGlja2VkSW5mbykgc2V0U2VsZWN0ZWRCYW5kKGNsaWNrZWRJbmZvKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIG1hcmdpbj17eyB0b3A6IDIwLCByaWdodDogMjUsIGxlZnQ6IDAsIGJvdHRvbTogNDAgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPENhcnRlc2lhbkdyaWQgc3Ryb2tlRGFzaGFycmF5PVwiMyAzXCIgc3Ryb2tlPVwiIzI3MjcyYVwiIC8+XG4gICAgICAgICAgICAgIDxYQXhpcyBcbiAgICAgICAgICAgICAgICBkYXRhS2V5PVwibmFtZVwiIFxuICAgICAgICAgICAgICAgIHN0cm9rZT1cIiM3MTcxN2FcIiBcbiAgICAgICAgICAgICAgICB0aWNrPXt7IGZpbGw6ICcjYTFhMWFhJywgZm9udFNpemU6IDEwLCBmb250RmFtaWx5OiAnbW9ub3NwYWNlJyB9fVxuICAgICAgICAgICAgICAgIGludGVydmFsPXswfVxuICAgICAgICAgICAgICAgIGFuZ2xlPXstMjV9XG4gICAgICAgICAgICAgICAgdGV4dEFuY2hvcj1cImVuZFwiXG4gICAgICAgICAgICAgICAgaGVpZ2h0PXs1NX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPFlBeGlzIFxuICAgICAgICAgICAgICAgIGRvbWFpbj17Wy0xMDAsIDEwMF19IFxuICAgICAgICAgICAgICAgIHN0cm9rZT1cIiM3MTcxN2FcIiBcbiAgICAgICAgICAgICAgICB0aWNrPXt7IGZpbGw6ICcjYTFhMWFhJywgZm9udFNpemU6IDEwLCBmb250RmFtaWx5OiAnbW9ub3NwYWNlJyB9fVxuICAgICAgICAgICAgICAgIGxhYmVsPXt7IFxuICAgICAgICAgICAgICAgICAgdmFsdWU6ICdXc2thxbpuaWsgV3DFgnl3dSBuYSBNw7PFvGTFvGVrIFstMTAwIGRvICsxMDBdJywgXG4gICAgICAgICAgICAgICAgICBhbmdsZTogLTkwLCBcbiAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnaW5zaWRlTGVmdCcsIFxuICAgICAgICAgICAgICAgICAgZmlsbDogJyM3MTcxN2EnLCBcbiAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAxMCBcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8UmVmZXJlbmNlTGluZSB5PXswfSBzdHJva2U9XCIjNTI1MjViXCIgc3Ryb2tlV2lkdGg9ezEuNX0gLz5cbiAgICAgICAgICAgICAgPFJlZmVyZW5jZUxpbmUgeT17ODV9IHN0cm9rZT1cIiMxMGI5ODFcIiBzdHJva2VEYXNoYXJyYXk9XCIzIDNcIiBsYWJlbD17eyB2YWx1ZTogJ1BST0cgV1lTT0tJRUogS09IRVJFTkNKSSAoKzg1KScsIGZpbGw6ICcjMTBiOTgxJywgZm9udFNpemU6IDkgfX0gLz5cbiAgICAgICAgICAgICAgPFJlZmVyZW5jZUxpbmUgeT17LTcwfSBzdHJva2U9XCIjZjQzZjVlXCIgc3Ryb2tlRGFzaGFycmF5PVwiMyAzXCIgbGFiZWw9e3sgdmFsdWU6ICdQUk9HIFBSWkVXTEVLxYFFR08gU1RSRVNVICgtNzApJywgZmlsbDogJyNmNDNmNWUnLCBmb250U2l6ZTogOSB9fSAvPlxuXG4gICAgICAgICAgICAgIDxUb29sdGlwIFxuICAgICAgICAgICAgICAgIGNvbnRlbnRTdHlsZT17eyBcbiAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyMwOTA5MGInLCBcbiAgICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiAnIzEwYjk4MScsIFxuICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMTRweCcsXG4gICAgICAgICAgICAgICAgICBmb250RmFtaWx5OiAnbW9ub3NwYWNlJyxcbiAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMTFweCcsXG4gICAgICAgICAgICAgICAgICBjb2xvcjogJyNmZmYnLFxuICAgICAgICAgICAgICAgICAgYm94U2hhZG93OiAnMCAwIDI1cHggcmdiYSgxNiwxODUsMTI5LDAuMyknXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBmb3JtYXR0ZXI9eyh2YWw6IGFueSwgbmFtZTogYW55LCBpdGVtOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHAgPSBpdGVtLnBheWxvYWQ7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICBgJHt2YWwgPiAwID8gJysnIDogJyd9JHt2YWx9IHBrdCAoV3DFgnl3OiAke3ZhbCA+IDAgPyAnUG96eXR5d255JyA6ICdOZWdhdHl3bnkvU3RyZXN1asSFY3knfSlgLFxuICAgICAgICAgICAgICAgICAgICBgUGFzbW86ICR7cC5yYW5nZX1gXG4gICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgbGFiZWxGb3JtYXR0ZXI9eyhsYWJlbCkgPT4gYEN6xJlzdG90bGl3b8WbxIc6ICR7bGFiZWx9YH1cbiAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICA8QmFyIGRhdGFLZXk9XCJzY29yZVwiIG5hbWU9XCJXc2thxbpuaWsgTcOzxbxkxbxrb3d5XCIgcmFkaXVzPXtbNiwgNiwgMCwgMF19PlxuICAgICAgICAgICAgICAgIHtjaGFydERhdGEubWFwKChlbnRyeSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgIGxldCBmaWxsQ29sb3IgPSAnIzEwYjk4MSc7IC8vIGdyZWVuIGZvciBwb3NpdGl2ZVxuICAgICAgICAgICAgICAgICAgaWYgKGVudHJ5LnNjb3JlIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICBmaWxsQ29sb3IgPSAnI2Y0M2Y1ZSc7IC8vIHJlZCBmb3IgbmVnYXRpdmVcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZW50cnkuc2NvcmUgPj0gODUpIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsbENvbG9yID0gJyMwNmI2ZDQnOyAvLyBjeWFuIGZvciBlbGl0ZSBjb2hlcmVuY2VcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEJhbmQgJiYgc2VsZWN0ZWRCYW5kLmJhbmRJZCA9PT0gZW50cnkuYmFuZElkKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGxDb2xvciA9ICcjZjU5ZTBiJzsgLy8gYW1iZXIgaWYgc2VsZWN0ZWRcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHJldHVybiA8Q2VsbCBrZXk9e2BjZWxsLSR7aW5kZXh9YH0gZmlsbD17ZmlsbENvbG9yfSAvPjtcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgPC9CYXI+XG4gICAgICAgICAgICA8L0NvbXBvc2VkQ2hhcnQ+XG4gICAgICAgICAgPC9SZXNwb25zaXZlQ29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgaXRlbXMtc3RhcnQgc206aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LVsxMXB4XSBmb250LW1vbm8gdGV4dC16aW5jLTQwMCBwdC0yIGJvcmRlci10IGJvcmRlci16aW5jLTgwMC84MCBnYXAtMlwiPlxuICAgICAgICAgIDxzcGFuPiogV3NrYcW6bmlrIHB1bmt0b3d5IG9wYXJ0eSBuYSBuZXVyb2ZpempvbG9naWN6bnljaCBiYWRhbmlhY2gga29oZXJlbmNqaSBrb23Ds3JlayBQdXJraW5qZWdvIGkgb2RydWNodSBWT1IuPC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC0zMDBcIj5cbiAgICAgICAgICAgIHtlbmdpbmVTdGF0ZS5hbnRpUGhhc2VIYXJtb25pY1N1cHByZXNzaW9uQWN0aXZlIFxuICAgICAgICAgICAgICA/ICdXxYLEhWN6b25lIHpub3N6ZW5pZSBwcnplY2l3ZmF6xIUgbml3ZWx1amUgbmVnYXR5d25lIHPFgnVwa2kgZG8gYmV6cGllY3puZWdvIHBvemlvbXUgYmxpc2tpZWdvIHplcnUuJyBcbiAgICAgICAgICAgICAgOiAnV3nFgsSFY3pvbmUgem5vc3plbmllIHVrYXp1amUgc3Vyb3fEhSBkZXN0cnVrY3lqbm/Fm8SHIGhhcm1vbmljem55Y2ggc2llY2kgaSBQV00uJ31cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBEZXRhaWxlZCBDYXJkIGZvciBTZWxlY3RlZCBGcmVxdWVuY3kgQmFuZCAqL31cbiAgICAgIHtzZWxlY3RlZEJhbmQgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdW5kZWQtM3hsIGJnLXppbmMtOTUwLzk1IGJvcmRlci0yIGJvcmRlci16aW5jLTgwMCBwLTUgc206cC02IHNwYWNlLXktNCBzaGFkb3ctMnhsXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IHNtOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTMgYm9yZGVyLWIgYm9yZGVyLXppbmMtODAwIHBiLTNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2B3LTEwIGgtMTAgcm91bmRlZC14bCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBib3JkZXIgZm9udC1ib2xkIHRleHQtc20gJHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEJhbmQuY2VyZWJlbGxhckltcGFjdFNjb3JlID49IDAgXG4gICAgICAgICAgICAgICAgICA/ICdiZy1lbWVyYWxkLTk1MC84MCBib3JkZXItZW1lcmFsZC00MDAgdGV4dC1lbWVyYWxkLTMwMCcgXG4gICAgICAgICAgICAgICAgICA6ICdiZy1yb3NlLTk1MC84MCBib3JkZXItcm9zZS01MDAgdGV4dC1yb3NlLTMwMCdcbiAgICAgICAgICAgICAgfWB9PlxuICAgICAgICAgICAgICAgIHtzZWxlY3RlZEJhbmQuY2VyZWJlbGxhckltcGFjdFNjb3JlID49IDAgPyAnKycgOiAnJ317c2VsZWN0ZWRCYW5kLmNlcmViZWxsYXJJbXBhY3RTY29yZX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJvbGQgdGV4dC13aGl0ZSBmb250LW1vbm9cIj57c2VsZWN0ZWRCYW5kLm5hbWV9PC9oND5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC16aW5jLTQwMCBmb250LW1vbm9cIj5aYWtyZXMgY3rEmXN0b3RsaXdvxZtjaTogPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LWN5YW4tMzAwXCI+e3NlbGVjdGVkQmFuZC5mcmVxdWVuY3lSYW5nZX08L3N0cm9uZz48L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2BweC0zIHB5LTEgcm91bmRlZC1mdWxsIHRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZCBib3JkZXIgJHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEJhbmQuY2VyZWJlbGxhckltcGFjdFNjb3JlID49IDAgXG4gICAgICAgICAgICAgICAgICA/ICdiZy1lbWVyYWxkLTk1MCB0ZXh0LWVtZXJhbGQtMzAwIGJvcmRlci1lbWVyYWxkLTUwMC81MCcgXG4gICAgICAgICAgICAgICAgICA6ICdiZy1yb3NlLTk1MCB0ZXh0LXJvc2UtMzAwIGJvcmRlci1yb3NlLTUwMC81MCdcbiAgICAgICAgICAgICAgfWB9PlxuICAgICAgICAgICAgICAgIHtzZWxlY3RlZEJhbmQuY2VyZWJlbGxhckltcGFjdFNjb3JlID49IDAgPyAn8J+MvyBXUMWBWVcgUE9aWVRZV05ZJyA6ICfimqDvuI8gWkFHUk/Fu0VOSUUgRExBIE3Dk8W7RMW7S1UnfVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNCBmb250LW1vbm8gdGV4dC14c1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMuNSByb3VuZGVkLTJ4bCBiZy16aW5jLTkwMC84MCBib3JkZXIgYm9yZGVyLXppbmMtODAwIHNwYWNlLXktMlwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXppbmMtNDAwIGJsb2NrIHVwcGVyY2FzZSBmb250LWJvbGQgdGV4dC1bMTBweF1cIj5NZWNoYW5pem0gTmV1cm8tRml6am9sb2dpY3pueTo8L3NwYW4+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtemluYy0yMDAgbGVhZGluZy1yZWxheGVkXCI+e3NlbGVjdGVkQmFuZC5waHlzaW9sb2dpY2FsRWZmZWN0fTwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMy41IHJvdW5kZWQtMnhsIGJnLXppbmMtOTAwLzgwIGJvcmRlciBib3JkZXItemluYy04MDAgc3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtemluYy00MDAgYmxvY2sgdXBwZXJjYXNlIGZvbnQtYm9sZCB0ZXh0LVsxMHB4XVwiPkRvY2Vsb3dlIEtvbcOzcmtpIGkgU3RydWt0dXJ5IE3Ds8W8ZMW8a3U6PC9zcGFuPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWN5YW4tMzAwIGZvbnQtc2VtaWJvbGQgbGVhZGluZy1yZWxheGVkXCI+e3NlbGVjdGVkQmFuZC5jZXJlYmVsbHVtQ2VsbFRhcmdldH08L3A+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMuNSByb3VuZGVkLTJ4bCBiZy16aW5jLTkwMC84MCBib3JkZXIgYm9yZGVyLXppbmMtODAwIHNwYWNlLXktMlwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXppbmMtNDAwIGJsb2NrIHVwcGVyY2FzZSBmb250LWJvbGQgdGV4dC1bMTBweF1cIj5PYmphd3kgS2xpbmljem5lIGx1YiBLb3J6ecWbY2k6PC9zcGFuPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXppbmMtMjAwIGxlYWRpbmctcmVsYXhlZFwiPntzZWxlY3RlZEJhbmQuc3ltcHRvbXNPckJlbmVmaXRzfTwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMy41IHJvdW5kZWQtMnhsIGJnLXppbmMtOTAwLzgwIGJvcmRlciBib3JkZXItemluYy04MDAgc3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtemluYy00MDAgYmxvY2sgdXBwZXJjYXNlIGZvbnQtYm9sZCB0ZXh0LVsxMHB4XVwiPlphbGVjZW5pZSBPY2hyb25uZSAvIEluxbx5bmllcnlqbmU6PC9zcGFuPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWFtYmVyLTMwMCBsZWFkaW5nLXJlbGF4ZWQgZm9udC1zZW1pYm9sZFwiPntzZWxlY3RlZEJhbmQucmVjb21tZW5kZWRBY3Rpb259PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwibWFwcGluZ3MiOiJBQTJGYztBQTNGZCxTQUFnQixVQUFVLGlCQUFpQjtBQUMzQztBQUFBLEVBQ0U7QUFBQSxFQUFPO0FBQUEsRUFBWTtBQUFBLEVBQVE7QUFBQSxFQUFhO0FBQUEsRUFDbEI7QUFBQSxFQUFPO0FBQUEsRUFBNkI7QUFBQSxPQUNyRDtBQUNQO0FBQUEsRUFDRTtBQUFBLEVBQ0E7QUFBQSxFQUVBO0FBQUEsRUFFQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsT0FDSztBQUNQLFNBQVMsNkJBQTZCO0FBTy9CLGFBQU0sK0JBQTRFLENBQUM7QUFBQSxFQUN4RjtBQUNGLE1BQU07QUFDSixRQUFNLENBQUMsYUFBYSxjQUFjLElBQUksU0FBUyxNQUFNLHNCQUFzQixT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