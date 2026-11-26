import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"];
import {
  Zap,
  Radio,
  AlertOctagon,
  ShieldCheck,
  Skull,
  Gauge,
  RefreshCw,
  Flame
} from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import { RotaryPotentiometer } from "/sentinel-shield/src/components/RotaryPotentiometer.tsx";
const DEFAULT_TELEMETRY = {
  laserVoltageKv: 12.4,
  laserAmperageA: 185,
  laserFrequencyThz: 940.8,
  laserFocalMm: 1.2,
  panicVoltageV: 1.25,
  panicCurrentA: 80,
  panicThresholdPct: 99,
  empVoltageKv: 45,
  empPeakCurrentKa: 12.5,
  empFrequencyGhz: 2.45,
  empRadiusM: 150,
  barrierVoltageKv: 8.5,
  barrierCurrentA: 42,
  barrierPulsePpm: 10,
  barrierNodes: 480,
  quantumFreqThz: 940.8,
  quantumVoltageKv: 3.3,
  quantumCurrentA: 14.8,
  quantumPhaseDeg: 180
};
export const ScreenThreeWeaponsTelemetry = ({ onNotify }) => {
  const [telemetry, setTelemetry] = useState(DEFAULT_TELEMETRY);
  const updateParam = (key, val) => {
    setTelemetry((prev) => ({ ...prev, [key]: val }));
  };
  const laserPowerMw = telemetry.laserVoltageKv * telemetry.laserAmperageA / 1e3;
  const panicPowerW = telemetry.panicVoltageV * telemetry.panicCurrentA;
  const empPowerMw = telemetry.empVoltageKv * telemetry.empPeakCurrentKa;
  const barrierPowerKw = telemetry.barrierVoltageKv * telemetry.barrierCurrentA;
  const quantumPowerKw = telemetry.quantumVoltageKv * telemetry.quantumCurrentA;
  const totalEquivalentPowerMw = laserPowerMw + panicPowerW / 1e6 + empPowerMw + barrierPowerKw / 1e3 + quantumPowerKw / 1e3;
  const handleCalibrateAll = () => {
    setTelemetry(DEFAULT_TELEMETRY);
    onNotify("🎛️ KALIBRACJA POTENCJOMETRÓW: Przywrócono laboratoryjne nastawy fabryczne dla wszystkich 5 broni!");
  };
  const applyPreset = (mode) => {
    if (mode === "max_kill") {
      setTelemetry({
        ...DEFAULT_TELEMETRY,
        laserVoltageKv: 24.5,
        laserAmperageA: 480,
        laserFrequencyThz: 940.8,
        laserFocalMm: 0.2,
        empVoltageKv: 95,
        empPeakCurrentKa: 48
      });
      onNotify("⚡ TRYB MAKSYMALNEGO UBOJU GNID: Skalibrowano potencjometry na maksymalne spopielenie (0 ms)!");
    } else if (mode === "shield_focus") {
      setTelemetry({
        ...DEFAULT_TELEMETRY,
        barrierVoltageKv: 19.8,
        barrierCurrentA: 95,
        barrierPulsePpm: 30,
        barrierNodes: 950
      });
      onNotify("🛡️ TRYB MAKSYMALNEJ TARCZY HEX: Wzmocniono potencjometry polaryzacji siatki laserowej!");
    } else if (mode === "quantum_resonance") {
      setTelemetry({
        ...DEFAULT_TELEMETRY,
        quantumFreqThz: 940.8,
        quantumVoltageKv: 9.8,
        quantumCurrentA: 48,
        quantumPhaseDeg: 94.08
      });
      onNotify("📡 TRYB SUB-CARRIER 940.8 THz: Dostrojono modulator kwantowy do rezonansu harmonicznego!");
    } else if (mode === "stealth_economy") {
      setTelemetry({
        ...DEFAULT_TELEMETRY,
        laserVoltageKv: 4.2,
        laserAmperageA: 35,
        empVoltageKv: 12,
        empPeakCurrentKa: 3.5,
        barrierVoltageKv: 3.5,
        barrierCurrentA: 15
      });
      onNotify("🍃 TRYB CICHEJ PRACY (QUIET LUXURY): Potencjometry zredukowane do minimalnego poboru mocy.");
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6 animate-in fade-in duration-300", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "p-6 rounded-3xl bg-zinc-950/95 border border-white/10 shadow-2xl backdrop-blur-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxDEV(
        "div",
        {
          className: "absolute top-0 left-0 right-0 h-1/2 pointer-events-none opacity-30",
          style: {
            background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 100%)"
          }
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
          lineNumber: 136,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-4 relative z-10", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 bg-gradient-to-br from-zinc-800 to-zinc-950 border border-amber-500/40 rounded-2xl text-amber-400 shadow-xl shadow-amber-950/20", children: /* @__PURE__ */ jsxDEV(Gauge, { className: "w-7 h-7" }, void 0, false, {
          fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
          lineNumber: 145,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
          lineNumber: 144,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2.5 flex-wrap", children: [
            /* @__PURE__ */ jsxDEV("h2", { className: "text-base sm:text-lg font-bold font-mono text-white uppercase tracking-wider", children: "PANEL TAKTYCZNEJ KONTROLI ENERGII • POTENCJOMETRY BRONI" }, void 0, false, {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 149,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-0.5 rounded-full bg-zinc-900 border border-amber-500/40 text-amber-300 text-[10px] font-mono font-bold tracking-wide", children: "QUIET LUXURY DIALS" }, void 0, false, {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 152,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
            lineNumber: 148,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 font-sans mt-1 max-w-2xl", children: "Fizyczne analogowe pokrętła ze sprzężeniem akustycznym, płynną bezwładnością igły i szklanym wykończeniem sapphire gloss. Regulacja parametrów 5 systemów uzbrojenia." }, void 0, false, {
            fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
            lineNumber: 156,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
          lineNumber: 147,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
        lineNumber: 143,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap relative z-10", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => applyPreset("max_kill"),
            className: "px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 hover:text-emerald-200 text-xs font-mono font-semibold flex items-center gap-1.5 shadow-md transition-all cursor-pointer",
            title: "Nastawienie potencjometrów na maksymalną siłę rażenia",
            children: [
              /* @__PURE__ */ jsxDEV(Flame, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 169,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Max Ubój" }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 170,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
            lineNumber: 164,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => applyPreset("shield_focus"),
            className: "px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-amber-950/60 border border-amber-500/40 text-amber-300 hover:text-amber-200 text-xs font-mono font-semibold flex items-center gap-1.5 shadow-md transition-all cursor-pointer",
            title: "Koncentracja energii na tarczy heksagonalnej",
            children: [
              /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 178,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Tarcza Hex" }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 179,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
            lineNumber: 173,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => applyPreset("quantum_resonance"),
            className: "px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-indigo-950/60 border border-indigo-500/40 text-indigo-300 hover:text-indigo-200 text-xs font-mono font-semibold flex items-center gap-1.5 shadow-md transition-all cursor-pointer",
            title: "Dostrojenie do 940.8 THz sub-carrier",
            children: [
              /* @__PURE__ */ jsxDEV(Radio, { className: "w-3.5 h-3.5 text-indigo-400" }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 187,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "940.8 THz" }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 188,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
            lineNumber: 182,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleCalibrateAll,
            className: "px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/15 text-slate-300 hover:text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-lg transition-all cursor-pointer",
            title: "Przywróć optymalne laboratoryjne nastawy potencjometrów",
            children: [
              /* @__PURE__ */ jsxDEV(RefreshCw, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 196,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Kalibracja" }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 197,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
            lineNumber: 191,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
        lineNumber: 163,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
      lineNumber: 134,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-zinc-950/80 border border-white/10 shadow-xl grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-xl bg-zinc-900/90 border border-emerald-500/30", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400 uppercase", children: "1. Laser Plazmowy" }, void 0, false, {
          fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
          lineNumber: 205,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-sm font-black text-emerald-300 mt-0.5", children: [
          laserPowerMw.toFixed(2),
          " MW"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
          lineNumber: 206,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-slate-500", children: [
          telemetry.laserVoltageKv.toFixed(1),
          " kV • ",
          telemetry.laserAmperageA.toFixed(0),
          " A"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
          lineNumber: 207,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
        lineNumber: 204,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-xl bg-zinc-900/90 border border-rose-500/30", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400 uppercase", children: "2. Panic Freeze" }, void 0, false, {
          fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
          lineNumber: 211,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-sm font-black text-rose-300 mt-0.5", children: [
          panicPowerW.toFixed(1),
          " W"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
          lineNumber: 212,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-slate-500", children: [
          telemetry.panicVoltageV.toFixed(2),
          " V • ",
          telemetry.panicCurrentA.toFixed(0),
          " A"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
          lineNumber: 213,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
        lineNumber: 210,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-xl bg-zinc-900/90 border border-cyan-500/30", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400 uppercase", children: "3. Impuls EMP" }, void 0, false, {
          fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
          lineNumber: 217,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-sm font-black text-cyan-300 mt-0.5", children: [
          empPowerMw.toFixed(1),
          " MW"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
          lineNumber: 218,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-slate-500", children: [
          telemetry.empVoltageKv.toFixed(0),
          " kV • ",
          telemetry.empPeakCurrentKa.toFixed(1),
          " kA"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
          lineNumber: 219,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
        lineNumber: 216,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-xl bg-zinc-900/90 border border-amber-500/30", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400 uppercase", children: "4. Tarcza Laserowa" }, void 0, false, {
          fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
          lineNumber: 223,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-sm font-black text-amber-300 mt-0.5", children: [
          barrierPowerKw.toFixed(1),
          " kW"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
          lineNumber: 224,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-slate-500", children: [
          telemetry.barrierVoltageKv.toFixed(1),
          " kV • ",
          telemetry.barrierNodes,
          " węzłów"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
          lineNumber: 225,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
        lineNumber: 222,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-xl bg-zinc-900/90 border border-indigo-500/30 col-span-2 sm:col-span-1", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400 uppercase", children: "5. Modulator 940.8 THz" }, void 0, false, {
          fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
          lineNumber: 229,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-sm font-black text-indigo-300 mt-0.5", children: [
          quantumPowerKw.toFixed(2),
          " kW"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
          lineNumber: 230,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-slate-500", children: [
          telemetry.quantumFreqThz.toFixed(1),
          " THz • ",
          telemetry.quantumPhaseDeg,
          "°"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
          lineNumber: 231,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
        lineNumber: 228,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
      lineNumber: 203,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "p-6 rounded-3xl bg-zinc-950/85 border border-emerald-500/30 shadow-2xl space-y-5", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-2xl bg-zinc-900 border border-emerald-500/40 text-emerald-400 shadow-md", children: /* @__PURE__ */ jsxDEV(Skull, { className: "w-6 h-6" }, void 0, false, {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 245,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 244,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-bold font-mono text-white uppercase tracking-wide", children: "1. DZIAŁO SPOPIELENIA LASEROWEGO (UBÓJ GNID)" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                  lineNumber: 249,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-mono text-[10px] font-bold", children: "0 MS / INSTANT KILL" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                  lineNumber: 252,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 248,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-xs text-slate-400 font-sans mt-0.5 flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxDEV("span", { children: [
                  "Typ Energii: ",
                  /* @__PURE__ */ jsxDEV("strong", { className: "text-emerald-300 font-mono", children: "Koherentna Plazma Fotonowa" }, void 0, false, {
                    fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                    lineNumber: 257,
                    columnNumber: 38
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                  lineNumber: 257,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "•" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                  lineNumber: 258,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: [
                  "Moc Ciągła: ",
                  /* @__PURE__ */ jsxDEV("strong", { className: "text-white font-mono", children: [
                    laserPowerMw.toFixed(3),
                    " MW"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                    lineNumber: 259,
                    columnNumber: 37
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                  lineNumber: 259,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 256,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 247,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
            lineNumber: 243,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 font-mono text-xs", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 text-[10px] block", children: "NAPIĘCIE" }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 267,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-300 font-black", children: [
                telemetry.laserVoltageKv.toFixed(1),
                " kV"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 268,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 266,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 text-[10px] block", children: "PRĄD" }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 271,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-amber-300 font-black", children: [
                telemetry.laserAmperageA.toFixed(0),
                " A"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 272,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 270,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 text-[10px] block", children: "CZĘSTOTLIWOŚĆ" }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 275,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-300 font-black", children: [
                telemetry.laserFrequencyThz.toFixed(1),
                " THz"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 276,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 274,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
            lineNumber: 265,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
          lineNumber: 242,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxDEV(
            RotaryPotentiometer,
            {
              label: "Napięcie Dyszy (kV)",
              unit: "kV",
              min: 1,
              max: 25,
              step: 0.1,
              value: telemetry.laserVoltageKv,
              defaultValue: DEFAULT_TELEMETRY.laserVoltageKv,
              onChange: (v) => updateParam("laserVoltageKv", v),
              accentColor: "emerald",
              description: "Napięcie jonizacji plazmy fotonowej"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 283,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            RotaryPotentiometer,
            {
              label: "Prąd Dyszy (A)",
              unit: "A",
              min: 10,
              max: 500,
              step: 1,
              decimals: 0,
              value: telemetry.laserAmperageA,
              defaultValue: DEFAULT_TELEMETRY.laserAmperageA,
              onChange: (v) => updateParam("laserAmperageA", v),
              accentColor: "amber",
              description: "Natężenie wyładowania w komorze"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 295,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            RotaryPotentiometer,
            {
              label: "Częstotliwość (THz)",
              unit: "THz",
              min: 100,
              max: 1500,
              step: 0.5,
              value: telemetry.laserFrequencyThz,
              defaultValue: DEFAULT_TELEMETRY.laserFrequencyThz,
              onChange: (v) => updateParam("laserFrequencyThz", v),
              accentColor: "cyan",
              description: "Długość fali optycznej spopielenia"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 308,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            RotaryPotentiometer,
            {
              label: "Ogniskowa (mm)",
              unit: "mm",
              min: 0.1,
              max: 10,
              step: 0.1,
              value: telemetry.laserFocalMm,
              defaultValue: DEFAULT_TELEMETRY.laserFocalMm,
              onChange: (v) => updateParam("laserFocalMm", v),
              accentColor: "emerald",
              description: "Średnica plamki skupienia wiązki"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 320,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
          lineNumber: 282,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
        lineNumber: 241,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-6 rounded-3xl bg-zinc-950/85 border border-rose-500/30 shadow-2xl space-y-5", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-2xl bg-zinc-900 border border-rose-500/40 text-rose-400 shadow-md", children: /* @__PURE__ */ jsxDEV(AlertOctagon, { className: "w-6 h-6" }, void 0, false, {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 342,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 341,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-bold font-mono text-white uppercase tracking-wide", children: "2. MODUŁ ZAMRAŻANIA RAM & JĄDRA (PANIC FREEZE)" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                  lineNumber: 346,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded bg-rose-950/80 border border-rose-500/50 text-rose-300 font-mono text-[10px] font-bold", children: "NTSUSPEND / SIGSTOP" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                  lineNumber: 349,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 345,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-xs text-slate-400 font-sans mt-0.5 flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxDEV("span", { children: [
                  "Typ Energii: ",
                  /* @__PURE__ */ jsxDEV("strong", { className: "text-rose-300 font-mono", children: "Sprzętowe Tłumienie NtSuspend (Interrupt Clamp)" }, void 0, false, {
                    fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                    lineNumber: 354,
                    columnNumber: 38
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                  lineNumber: 354,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "•" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                  lineNumber: 355,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: [
                  "Moc Szyny Logicznej: ",
                  /* @__PURE__ */ jsxDEV("strong", { className: "text-white font-mono", children: [
                    panicPowerW.toFixed(1),
                    " W"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                    lineNumber: 356,
                    columnNumber: 46
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                  lineNumber: 356,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 353,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 344,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
            lineNumber: 340,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 font-mono text-xs", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 text-[10px] block", children: "SZYNA VCORE" }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 363,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-rose-300 font-black", children: [
                telemetry.panicVoltageV.toFixed(2),
                " V"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 364,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 362,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 text-[10px] block", children: "PRĄD MAGISTRALI" }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 367,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-amber-300 font-black", children: [
                telemetry.panicCurrentA.toFixed(0),
                " A"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 368,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 366,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 text-[10px] block", children: "CZAS ZATRZYMANIA" }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 371,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-300 font-black", children: "0.00 ms" }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 372,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 370,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
            lineNumber: 361,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
          lineNumber: 339,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxDEV(
            RotaryPotentiometer,
            {
              label: "Napięcie VCore (V)",
              unit: "V",
              min: 0.8,
              max: 2.5,
              step: 0.05,
              decimals: 2,
              value: telemetry.panicVoltageV,
              defaultValue: DEFAULT_TELEMETRY.panicVoltageV,
              onChange: (v) => updateParam("panicVoltageV", v),
              accentColor: "rose",
              description: "Napięcie szyny przerwań jądra"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 378,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            RotaryPotentiometer,
            {
              label: "Prąd Szyny (A)",
              unit: "A",
              min: 10,
              max: 200,
              step: 1,
              decimals: 0,
              value: telemetry.panicCurrentA,
              defaultValue: DEFAULT_TELEMETRY.panicCurrentA,
              onChange: (v) => updateParam("panicCurrentA", v),
              accentColor: "amber",
              description: "Prąd tłumienia rejestrów CPU"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 391,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            RotaryPotentiometer,
            {
              label: "Próg Blokady (%)",
              unit: "%",
              min: 1,
              max: 100,
              step: 1,
              decimals: 0,
              value: telemetry.panicThresholdPct,
              defaultValue: DEFAULT_TELEMETRY.panicThresholdPct,
              onChange: (v) => updateParam("panicThresholdPct", v),
              accentColor: "rose",
              description: "Agresywność zrywania pętli wątków"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 404,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
          lineNumber: 377,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
        lineNumber: 338,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-6 rounded-3xl bg-zinc-950/85 border border-cyan-500/30 shadow-2xl space-y-5", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-2xl bg-zinc-900 border border-cyan-500/40 text-cyan-400 shadow-md", children: /* @__PURE__ */ jsxDEV(Zap, { className: "w-6 h-6" }, void 0, false, {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 427,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 426,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-bold font-mono text-white uppercase tracking-wide", children: "3. GENERATOR IMPULSU ELEKTROMAGNETYCZNEGO (FALA EMP)" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                  lineNumber: 431,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 font-mono text-[10px] font-bold", children: "FLUX-COMPRESSION RF" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                  lineNumber: 434,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 430,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-xs text-slate-400 font-sans mt-0.5 flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxDEV("span", { children: [
                  "Typ Energii: ",
                  /* @__PURE__ */ jsxDEV("strong", { className: "text-cyan-300 font-mono", children: "Impuls Pola Magnetoelektrycznego Kompresji Strumienia" }, void 0, false, {
                    fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                    lineNumber: 439,
                    columnNumber: 38
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                  lineNumber: 439,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "•" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                  lineNumber: 440,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: [
                  "Moc Szczytowa: ",
                  /* @__PURE__ */ jsxDEV("strong", { className: "text-white font-mono", children: [
                    empPowerMw.toFixed(1),
                    " MW"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                    lineNumber: 441,
                    columnNumber: 40
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                  lineNumber: 441,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 438,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 429,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
            lineNumber: 425,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 font-mono text-xs", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 text-[10px] block", children: "NAPIĘCIE MARX" }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 448,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-300 font-black", children: [
                telemetry.empVoltageKv.toFixed(1),
                " kV"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 449,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 447,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 text-[10px] block", children: "PRĄD SZCZYTOWY" }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 452,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-amber-300 font-black", children: [
                telemetry.empPeakCurrentKa.toFixed(1),
                " kA"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 453,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 451,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 text-[10px] block", children: "PASMO RF" }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 456,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-300 font-black", children: [
                telemetry.empFrequencyGhz.toFixed(2),
                " GHz"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 457,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 455,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
            lineNumber: 446,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
          lineNumber: 424,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxDEV(
            RotaryPotentiometer,
            {
              label: "Napięcie MARX (kV)",
              unit: "kV",
              min: 5,
              max: 100,
              step: 0.5,
              value: telemetry.empVoltageKv,
              defaultValue: DEFAULT_TELEMETRY.empVoltageKv,
              onChange: (v) => updateParam("empVoltageKv", v),
              accentColor: "cyan",
              description: "Napięcie baterii kondensatorów MARX"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 463,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            RotaryPotentiometer,
            {
              label: "Prąd Szczytowy (kA)",
              unit: "kA",
              min: 1,
              max: 50,
              step: 0.5,
              value: telemetry.empPeakCurrentKa,
              defaultValue: DEFAULT_TELEMETRY.empPeakCurrentKa,
              onChange: (v) => updateParam("empPeakCurrentKa", v),
              accentColor: "amber",
              description: "Szczytowy amperaż wyładowania"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 475,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            RotaryPotentiometer,
            {
              label: "Częstotliwość RF (GHz)",
              unit: "GHz",
              min: 0.1,
              max: 10,
              step: 0.05,
              decimals: 2,
              value: telemetry.empFrequencyGhz,
              defaultValue: DEFAULT_TELEMETRY.empFrequencyGhz,
              onChange: (v) => updateParam("empFrequencyGhz", v),
              accentColor: "cyan",
              description: "Pasmo penetracji magistrali PCIe"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 487,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            RotaryPotentiometer,
            {
              label: "Promień Fali (m)",
              unit: "m",
              min: 10,
              max: 500,
              step: 5,
              decimals: 0,
              value: telemetry.empRadiusM,
              defaultValue: DEFAULT_TELEMETRY.empRadiusM,
              onChange: (v) => updateParam("empRadiusM", v),
              accentColor: "indigo",
              description: "Zasięg sterylizacji elektromagnetycznej"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 500,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
          lineNumber: 462,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
        lineNumber: 423,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-6 rounded-3xl bg-zinc-950/85 border border-amber-500/30 shadow-2xl space-y-5", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-2xl bg-zinc-900 border border-amber-500/40 text-amber-400 shadow-md", children: /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-6 h-6" }, void 0, false, {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 523,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 522,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-bold font-mono text-white uppercase tracking-wide", children: "4. HEKSAGONALNA TARCZA LASEROWA (KOPUŁA OCHRONNA)" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                  lineNumber: 527,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/50 text-amber-300 font-mono text-[10px] font-bold", children: "10 PULSÓW / MIN" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                  lineNumber: 530,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 526,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-xs text-slate-400 font-sans mt-0.5 flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxDEV("span", { children: [
                  "Typ Energii: ",
                  /* @__PURE__ */ jsxDEV("strong", { className: "text-amber-300 font-mono", children: "Elektrodynamiczna Matryca Skalarna Polaryzacji Siatki" }, void 0, false, {
                    fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                    lineNumber: 535,
                    columnNumber: 38
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                  lineNumber: 535,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "•" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                  lineNumber: 536,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: [
                  "Moc Ciągła Tarczy: ",
                  /* @__PURE__ */ jsxDEV("strong", { className: "text-white font-mono", children: [
                    barrierPowerKw.toFixed(1),
                    " kW"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                    lineNumber: 537,
                    columnNumber: 44
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                  lineNumber: 537,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 534,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 525,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
            lineNumber: 521,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 font-mono text-xs", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 text-[10px] block", children: "NAPIĘCIE SIATKI" }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 544,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-amber-300 font-black", children: [
                telemetry.barrierVoltageKv.toFixed(1),
                " kV"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 545,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 543,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 text-[10px] block", children: "PRĄD PODTRZYMANIA" }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 548,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-300 font-black", children: [
                telemetry.barrierCurrentA.toFixed(0),
                " A"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 549,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 547,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 text-[10px] block", children: "PULS" }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 552,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-300 font-black", children: [
                telemetry.barrierPulsePpm.toFixed(0),
                " ppm"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 553,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 551,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
            lineNumber: 542,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
          lineNumber: 520,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxDEV(
            RotaryPotentiometer,
            {
              label: "Napięcie Siatki (kV)",
              unit: "kV",
              min: 1,
              max: 20,
              step: 0.1,
              value: telemetry.barrierVoltageKv,
              defaultValue: DEFAULT_TELEMETRY.barrierVoltageKv,
              onChange: (v) => updateParam("barrierVoltageKv", v),
              accentColor: "amber",
              description: "Napięcie polaryzacji zwierciadeł hex"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 559,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            RotaryPotentiometer,
            {
              label: "Prąd Zasilania (A)",
              unit: "A",
              min: 5,
              max: 100,
              step: 1,
              decimals: 0,
              value: telemetry.barrierCurrentA,
              defaultValue: DEFAULT_TELEMETRY.barrierCurrentA,
              onChange: (v) => updateParam("barrierCurrentA", v),
              accentColor: "emerald",
              description: "Prąd stabilizacji falowodów"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 571,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            RotaryPotentiometer,
            {
              label: "Częstotliwość (ppm)",
              unit: "ppm",
              min: 1,
              max: 60,
              step: 1,
              decimals: 0,
              value: telemetry.barrierPulsePpm,
              defaultValue: DEFAULT_TELEMETRY.barrierPulsePpm,
              onChange: (v) => updateParam("barrierPulsePpm", v),
              accentColor: "amber",
              description: "Ilość pulsów laserowych na minutę"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 584,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            RotaryPotentiometer,
            {
              label: "Węzły Siatki",
              unit: "węzłów",
              min: 100,
              max: 1e3,
              step: 10,
              decimals: 0,
              value: telemetry.barrierNodes,
              defaultValue: DEFAULT_TELEMETRY.barrierNodes,
              onChange: (v) => updateParam("barrierNodes", v),
              accentColor: "cyan",
              description: "Gęstość komórek heksagonalnych"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 597,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
          lineNumber: 558,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
        lineNumber: 519,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-6 rounded-3xl bg-zinc-950/85 border border-indigo-500/30 shadow-2xl space-y-5", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-2xl bg-zinc-900 border border-indigo-500/40 text-indigo-400 shadow-md", children: /* @__PURE__ */ jsxDEV(Radio, { className: "w-6 h-6" }, void 0, false, {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 620,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 619,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-bold font-mono text-white uppercase tracking-wide", children: "5. MODULATOR KWANTOWY 940,8 THz (REZONANS OPTYCZNY)" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                  lineNumber: 624,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded bg-indigo-950/80 border border-indigo-500/50 text-indigo-300 font-mono text-[10px] font-bold", children: "SUB-CARRIER 940.8 THz" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                  lineNumber: 627,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 623,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-xs text-slate-400 font-sans mt-0.5 flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxDEV("span", { children: [
                  "Typ Energii: ",
                  /* @__PURE__ */ jsxDEV("strong", { className: "text-indigo-300 font-mono", children: "Rezonans Subatomowy Fazy Optycznej" }, void 0, false, {
                    fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                    lineNumber: 632,
                    columnNumber: 38
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                  lineNumber: 632,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "•" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                  lineNumber: 633,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: [
                  "Moc Wiązki Kwantowej: ",
                  /* @__PURE__ */ jsxDEV("strong", { className: "text-white font-mono", children: [
                    quantumPowerKw.toFixed(2),
                    " kW"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                    lineNumber: 634,
                    columnNumber: 47
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                  lineNumber: 634,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 631,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 622,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
            lineNumber: 618,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 font-mono text-xs", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 text-[10px] block", children: "CZĘSTOTLIWOŚĆ NOŚNA" }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 641,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-indigo-300 font-black", children: [
                telemetry.quantumFreqThz.toFixed(2),
                " THz"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 642,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 640,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 text-[10px] block", children: "NAPIĘCIE KRYSZTAŁU" }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 645,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-300 font-black", children: [
                telemetry.quantumVoltageKv.toFixed(1),
                " kV"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 646,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 644,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 text-[10px] block", children: "PRĄD EMISJI" }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 649,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-amber-300 font-black", children: [
                telemetry.quantumCurrentA.toFixed(1),
                " A"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
                lineNumber: 650,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 648,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
            lineNumber: 639,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
          lineNumber: 617,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxDEV(
            RotaryPotentiometer,
            {
              label: "Częstotliwość (THz)",
              unit: "THz",
              min: 900,
              max: 1e3,
              step: 0.1,
              value: telemetry.quantumFreqThz,
              defaultValue: DEFAULT_TELEMETRY.quantumFreqThz,
              onChange: (v) => updateParam("quantumFreqThz", v),
              accentColor: "indigo",
              description: "Precyzyjne dostrojenie rezonansu"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 656,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            RotaryPotentiometer,
            {
              label: "Napięcie Kryształu (kV)",
              unit: "kV",
              min: 0.5,
              max: 10,
              step: 0.1,
              value: telemetry.quantumVoltageKv,
              defaultValue: DEFAULT_TELEMETRY.quantumVoltageKv,
              onChange: (v) => updateParam("quantumVoltageKv", v),
              accentColor: "cyan",
              description: "Wzbudzenie kryształu rezonatora"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 668,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            RotaryPotentiometer,
            {
              label: "Prąd Emisji (A)",
              unit: "A",
              min: 1,
              max: 50,
              step: 0.2,
              value: telemetry.quantumCurrentA,
              defaultValue: DEFAULT_TELEMETRY.quantumCurrentA,
              onChange: (v) => updateParam("quantumCurrentA", v),
              accentColor: "amber",
              description: "Natężenie subatomowego strumienia"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 680,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            RotaryPotentiometer,
            {
              label: "Przesunięcie Fazy (°)",
              unit: "°",
              min: 0,
              max: 360,
              step: 1,
              decimals: 0,
              value: telemetry.quantumPhaseDeg,
              defaultValue: DEFAULT_TELEMETRY.quantumPhaseDeg,
              onChange: (v) => updateParam("quantumPhaseDeg", v),
              accentColor: "indigo",
              description: "Kąt synchronizacji harmonicznych"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
              lineNumber: 692,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
          lineNumber: 655,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
        lineNumber: 616,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
      lineNumber: 236,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/ScreenThreeWeaponsTelemetry.tsx",
    lineNumber: 131,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNjcmVlblRocmVlV2VhcG9uc1RlbGVtZXRyeS50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgXG4gIFphcCwgUmFkaW8sIEFsZXJ0T2N0YWdvbiwgU2hpZWxkQ2hlY2ssIFNrdWxsLCBBY3Rpdml0eSwgXG4gIENwdSwgU2xpZGVycywgRGlzYywgU3BhcmtsZXMsIEdhdWdlLCBSZWZyZXNoQ3csIExheWVycywgRmxhbWUsIEJhdHRlcnlDaGFyZ2luZ1xufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgUm90YXJ5UG90ZW50aW9tZXRlciB9IGZyb20gJy4vUm90YXJ5UG90ZW50aW9tZXRlcic7XG5cbmludGVyZmFjZSBXZWFwb25UZWxlbWV0cnlTdGF0ZSB7XG4gIC8vIDEuIER6aWHFgm8gU3BvcGllbGVuaWEgTGFzZXJvd2VnbyAoVWLDs2ogR25pZClcbiAgbGFzZXJWb2x0YWdlS3Y6IG51bWJlcjsgLy8gMS4wIC0gMjUuMCBrVlxuICBsYXNlckFtcGVyYWdlQTogbnVtYmVyOyAvLyAxMC4wIC0gNTAwLjAgQVxuICBsYXNlckZyZXF1ZW5jeVRoejogbnVtYmVyOyAvLyAxMDAuMCAtIDE1MDAuMCBUSHpcbiAgbGFzZXJGb2NhbE1tOiBudW1iZXI7IC8vIDAuMSAtIDEwLjAgbW1cblxuICAvLyAyLiBNb2R1xYIgWmFtcmHFvGFuaWEgUkFNIChQYW5pYyBGcmVlemUpXG4gIHBhbmljVm9sdGFnZVY6IG51bWJlcjsgLy8gMC44IC0gMi41IFZcbiAgcGFuaWNDdXJyZW50QTogbnVtYmVyOyAvLyAxMC4wIC0gMjAwLjAgQVxuICBwYW5pY1RocmVzaG9sZFBjdDogbnVtYmVyOyAvLyAxIC0gMTAwICVcblxuICAvLyAzLiBHZW5lcmF0b3IgSW1wdWxzdSBFbGVrdHJvbWFnbmV0eWN6bmVnbyAoRU1QKVxuICBlbXBWb2x0YWdlS3Y6IG51bWJlcjsgLy8gNS4wIC0gMTAwLjAga1ZcbiAgZW1wUGVha0N1cnJlbnRLYTogbnVtYmVyOyAvLyAxLjAgLSA1MC4wIGtBXG4gIGVtcEZyZXF1ZW5jeUdoejogbnVtYmVyOyAvLyAwLjEgLSAxMC4wIEdIelxuICBlbXBSYWRpdXNNOiBudW1iZXI7IC8vIDEwIC0gNTAwIG1cblxuICAvLyA0LiBIZWtzYWdvbmFsbmEgVGFyY3phIExhc2Vyb3dhXG4gIGJhcnJpZXJWb2x0YWdlS3Y6IG51bWJlcjsgLy8gMS4wIC0gMjAuMCBrVlxuICBiYXJyaWVyQ3VycmVudEE6IG51bWJlcjsgLy8gNS4wIC0gMTAwLjAgQVxuICBiYXJyaWVyUHVsc2VQcG06IG51bWJlcjsgLy8gMS4wIC0gNjAuMCBwdWxzw7N3L21pblxuICBiYXJyaWVyTm9kZXM6IG51bWJlcjsgLy8gMTAwIC0gMTAwMCB3xJl6xYLDs3dcblxuICAvLyA1LiBNb2R1bGF0b3IgS3dhbnRvd3kgOTQwLjggVEh6XG4gIHF1YW50dW1GcmVxVGh6OiBudW1iZXI7IC8vIDkwMC4wIC0gMTAwMC4wIFRIelxuICBxdWFudHVtVm9sdGFnZUt2OiBudW1iZXI7IC8vIDAuNSAtIDEwLjAga1ZcbiAgcXVhbnR1bUN1cnJlbnRBOiBudW1iZXI7IC8vIDEuMCAtIDUwLjAgQVxuICBxdWFudHVtUGhhc2VEZWc6IG51bWJlcjsgLy8gMC4wIC0gMzYwLjAgZGVnXG59XG5cbmNvbnN0IERFRkFVTFRfVEVMRU1FVFJZOiBXZWFwb25UZWxlbWV0cnlTdGF0ZSA9IHtcbiAgbGFzZXJWb2x0YWdlS3Y6IDEyLjQsXG4gIGxhc2VyQW1wZXJhZ2VBOiAxODUuMCxcbiAgbGFzZXJGcmVxdWVuY3lUaHo6IDk0MC44LFxuICBsYXNlckZvY2FsTW06IDEuMixcblxuICBwYW5pY1ZvbHRhZ2VWOiAxLjI1LFxuICBwYW5pY0N1cnJlbnRBOiA4MC4wLFxuICBwYW5pY1RocmVzaG9sZFBjdDogOTkuMCxcblxuICBlbXBWb2x0YWdlS3Y6IDQ1LjAsXG4gIGVtcFBlYWtDdXJyZW50S2E6IDEyLjUsXG4gIGVtcEZyZXF1ZW5jeUdoejogMi40NSxcbiAgZW1wUmFkaXVzTTogMTUwLFxuXG4gIGJhcnJpZXJWb2x0YWdlS3Y6IDguNSxcbiAgYmFycmllckN1cnJlbnRBOiA0Mi4wLFxuICBiYXJyaWVyUHVsc2VQcG06IDEwLjAsXG4gIGJhcnJpZXJOb2RlczogNDgwLFxuXG4gIHF1YW50dW1GcmVxVGh6OiA5NDAuOCxcbiAgcXVhbnR1bVZvbHRhZ2VLdjogMy4zLFxuICBxdWFudHVtQ3VycmVudEE6IDE0LjgsXG4gIHF1YW50dW1QaGFzZURlZzogMTgwLjBcbn07XG5cbmV4cG9ydCBjb25zdCBTY3JlZW5UaHJlZVdlYXBvbnNUZWxlbWV0cnk6IFJlYWN0LkZDPHsgb25Ob3RpZnk6IChtc2c6IHN0cmluZykgPT4gdm9pZCB9PiA9ICh7IG9uTm90aWZ5IH0pID0+IHtcbiAgY29uc3QgW3RlbGVtZXRyeSwgc2V0VGVsZW1ldHJ5XSA9IHVzZVN0YXRlPFdlYXBvblRlbGVtZXRyeVN0YXRlPihERUZBVUxUX1RFTEVNRVRSWSk7XG5cbiAgY29uc3QgdXBkYXRlUGFyYW0gPSA8SyBleHRlbmRzIGtleW9mIFdlYXBvblRlbGVtZXRyeVN0YXRlPihrZXk6IEssIHZhbDogV2VhcG9uVGVsZW1ldHJ5U3RhdGVbS10pID0+IHtcbiAgICBzZXRUZWxlbWV0cnkocHJldiA9PiAoeyAuLi5wcmV2LCBba2V5XTogdmFsIH0pKTtcbiAgfTtcblxuICAvLyBDYWxjdWxhdGVkIFJlYWwtVGltZSBQb3dlcnMgKFAgPSBVICogSSlcbiAgY29uc3QgbGFzZXJQb3dlck13ID0gKHRlbGVtZXRyeS5sYXNlclZvbHRhZ2VLdiAqIHRlbGVtZXRyeS5sYXNlckFtcGVyYWdlQSkgLyAxMDAwO1xuICBjb25zdCBwYW5pY1Bvd2VyVyA9IHRlbGVtZXRyeS5wYW5pY1ZvbHRhZ2VWICogdGVsZW1ldHJ5LnBhbmljQ3VycmVudEE7XG4gIGNvbnN0IGVtcFBvd2VyTXcgPSB0ZWxlbWV0cnkuZW1wVm9sdGFnZUt2ICogdGVsZW1ldHJ5LmVtcFBlYWtDdXJyZW50S2E7XG4gIGNvbnN0IGJhcnJpZXJQb3dlckt3ID0gdGVsZW1ldHJ5LmJhcnJpZXJWb2x0YWdlS3YgKiB0ZWxlbWV0cnkuYmFycmllckN1cnJlbnRBO1xuICBjb25zdCBxdWFudHVtUG93ZXJLdyA9IHRlbGVtZXRyeS5xdWFudHVtVm9sdGFnZUt2ICogdGVsZW1ldHJ5LnF1YW50dW1DdXJyZW50QTtcblxuICBjb25zdCB0b3RhbEVxdWl2YWxlbnRQb3dlck13ID0gbGFzZXJQb3dlck13ICsgKHBhbmljUG93ZXJXIC8gMTAwMDAwMCkgKyBlbXBQb3dlck13ICsgKGJhcnJpZXJQb3dlckt3IC8gMTAwMCkgKyAocXVhbnR1bVBvd2VyS3cgLyAxMDAwKTtcblxuICBjb25zdCBoYW5kbGVDYWxpYnJhdGVBbGwgPSAoKSA9PiB7XG4gICAgc2V0VGVsZW1ldHJ5KERFRkFVTFRfVEVMRU1FVFJZKTtcbiAgICBvbk5vdGlmeSgn8J+Om++4jyBLQUxJQlJBQ0pBIFBPVEVOQ0pPTUVUUsOTVzogUHJ6eXdyw7Njb25vIGxhYm9yYXRvcnlqbmUgbmFzdGF3eSBmYWJyeWN6bmUgZGxhIHdzenlzdGtpY2ggNSBicm9uaSEnKTtcbiAgfTtcblxuICBjb25zdCBhcHBseVByZXNldCA9IChtb2RlOiAnbWF4X2tpbGwnIHwgJ3NoaWVsZF9mb2N1cycgfCAncXVhbnR1bV9yZXNvbmFuY2UnIHwgJ3N0ZWFsdGhfZWNvbm9teScpID0+IHtcbiAgICBpZiAobW9kZSA9PT0gJ21heF9raWxsJykge1xuICAgICAgc2V0VGVsZW1ldHJ5KHtcbiAgICAgICAgLi4uREVGQVVMVF9URUxFTUVUUlksXG4gICAgICAgIGxhc2VyVm9sdGFnZUt2OiAyNC41LFxuICAgICAgICBsYXNlckFtcGVyYWdlQTogNDgwLjAsXG4gICAgICAgIGxhc2VyRnJlcXVlbmN5VGh6OiA5NDAuOCxcbiAgICAgICAgbGFzZXJGb2NhbE1tOiAwLjIsXG4gICAgICAgIGVtcFZvbHRhZ2VLdjogOTUuMCxcbiAgICAgICAgZW1wUGVha0N1cnJlbnRLYTogNDguMFxuICAgICAgfSk7XG4gICAgICBvbk5vdGlmeSgn4pqhIFRSWUIgTUFLU1lNQUxORUdPIFVCT0pVIEdOSUQ6IFNrYWxpYnJvd2FubyBwb3RlbmNqb21ldHJ5IG5hIG1ha3N5bWFsbmUgc3BvcGllbGVuaWUgKDAgbXMpIScpO1xuICAgIH0gZWxzZSBpZiAobW9kZSA9PT0gJ3NoaWVsZF9mb2N1cycpIHtcbiAgICAgIHNldFRlbGVtZXRyeSh7XG4gICAgICAgIC4uLkRFRkFVTFRfVEVMRU1FVFJZLFxuICAgICAgICBiYXJyaWVyVm9sdGFnZUt2OiAxOS44LFxuICAgICAgICBiYXJyaWVyQ3VycmVudEE6IDk1LjAsXG4gICAgICAgIGJhcnJpZXJQdWxzZVBwbTogMzAuMCxcbiAgICAgICAgYmFycmllck5vZGVzOiA5NTBcbiAgICAgIH0pO1xuICAgICAgb25Ob3RpZnkoJ/Cfm6HvuI8gVFJZQiBNQUtTWU1BTE5FSiBUQVJDWlkgSEVYOiBXem1vY25pb25vIHBvdGVuY2pvbWV0cnkgcG9sYXJ5emFjamkgc2lhdGtpIGxhc2Vyb3dlaiEnKTtcbiAgICB9IGVsc2UgaWYgKG1vZGUgPT09ICdxdWFudHVtX3Jlc29uYW5jZScpIHtcbiAgICAgIHNldFRlbGVtZXRyeSh7XG4gICAgICAgIC4uLkRFRkFVTFRfVEVMRU1FVFJZLFxuICAgICAgICBxdWFudHVtRnJlcVRoejogOTQwLjgsXG4gICAgICAgIHF1YW50dW1Wb2x0YWdlS3Y6IDkuOCxcbiAgICAgICAgcXVhbnR1bUN1cnJlbnRBOiA0OC4wLFxuICAgICAgICBxdWFudHVtUGhhc2VEZWc6IDk0LjA4XG4gICAgICB9KTtcbiAgICAgIG9uTm90aWZ5KCfwn5OhIFRSWUIgU1VCLUNBUlJJRVIgOTQwLjggVEh6OiBEb3N0cm9qb25vIG1vZHVsYXRvciBrd2FudG93eSBkbyByZXpvbmFuc3UgaGFybW9uaWN6bmVnbyEnKTtcbiAgICB9IGVsc2UgaWYgKG1vZGUgPT09ICdzdGVhbHRoX2Vjb25vbXknKSB7XG4gICAgICBzZXRUZWxlbWV0cnkoe1xuICAgICAgICAuLi5ERUZBVUxUX1RFTEVNRVRSWSxcbiAgICAgICAgbGFzZXJWb2x0YWdlS3Y6IDQuMixcbiAgICAgICAgbGFzZXJBbXBlcmFnZUE6IDM1LjAsXG4gICAgICAgIGVtcFZvbHRhZ2VLdjogMTIuMCxcbiAgICAgICAgZW1wUGVha0N1cnJlbnRLYTogMy41LFxuICAgICAgICBiYXJyaWVyVm9sdGFnZUt2OiAzLjUsXG4gICAgICAgIGJhcnJpZXJDdXJyZW50QTogMTUuMFxuICAgICAgfSk7XG4gICAgICBvbk5vdGlmeSgn8J+NgyBUUllCIENJQ0hFSiBQUkFDWSAoUVVJRVQgTFVYVVJZKTogUG90ZW5jam9tZXRyeSB6cmVkdWtvd2FuZSBkbyBtaW5pbWFsbmVnbyBwb2JvcnUgbW9jeS4nKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNiBhbmltYXRlLWluIGZhZGUtaW4gZHVyYXRpb24tMzAwXCI+XG4gICAgICBcbiAgICAgIHsvKiBTY3JlZW4gSGVhZGVyIC0gUGFuZWwgVGFrdHljem5laiBLb250cm9saSBFbmVyZ2lpICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTYgcm91bmRlZC0zeGwgYmctemluYy05NTAvOTUgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCBzaGFkb3ctMnhsIGJhY2tkcm9wLWJsdXIteGwgZmxleCBmbGV4LWNvbCBsZzpmbGV4LXJvdyBpdGVtcy1zdGFydCBsZzppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC01IHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICB7LyogU3VidGxlIEdsb3NzIFNoZWVuIG9uIFBhbmVsIEhlYWRlciAqL31cbiAgICAgICAgPGRpdiBcbiAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMCBsZWZ0LTAgcmlnaHQtMCBoLTEvMiBwb2ludGVyLWV2ZW50cy1ub25lIG9wYWNpdHktMzBcIlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnbGluZWFyLWdyYWRpZW50KDE4MGRlZywgcmdiYSgyNTUsMjU1LDI1NSwwLjA4KSAwJSwgdHJhbnNwYXJlbnQgMTAwJSknXG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtNCByZWxhdGl2ZSB6LTEwXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMuNSBiZy1ncmFkaWVudC10by1iciBmcm9tLXppbmMtODAwIHRvLXppbmMtOTUwIGJvcmRlciBib3JkZXItYW1iZXItNTAwLzQwIHJvdW5kZWQtMnhsIHRleHQtYW1iZXItNDAwIHNoYWRvdy14bCBzaGFkb3ctYW1iZXItOTUwLzIwXCI+XG4gICAgICAgICAgICA8R2F1Z2UgY2xhc3NOYW1lPVwidy03IGgtN1wiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIuNSBmbGV4LXdyYXBcIj5cbiAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtYmFzZSBzbTp0ZXh0LWxnIGZvbnQtYm9sZCBmb250LW1vbm8gdGV4dC13aGl0ZSB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXJcIj5cbiAgICAgICAgICAgICAgICBQQU5FTCBUQUtUWUNaTkVKIEtPTlRST0xJIEVORVJHSUkg4oCiIFBPVEVOQ0pPTUVUUlkgQlJPTklcbiAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMi41IHB5LTAuNSByb3VuZGVkLWZ1bGwgYmctemluYy05MDAgYm9yZGVyIGJvcmRlci1hbWJlci01MDAvNDAgdGV4dC1hbWJlci0zMDAgdGV4dC1bMTBweF0gZm9udC1tb25vIGZvbnQtYm9sZCB0cmFja2luZy13aWRlXCI+XG4gICAgICAgICAgICAgICAgUVVJRVQgTFVYVVJZIERJQUxTXG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTQwMCBmb250LXNhbnMgbXQtMSBtYXgtdy0yeGxcIj5cbiAgICAgICAgICAgICAgRml6eWN6bmUgYW5hbG9nb3dlIHBva3LEmXTFgmEgemUgc3ByesSZxbxlbmllbSBha3VzdHljem55bSwgcMWCeW5uxIUgYmV6d8WCYWRub8WbY2nEhSBpZ8WCeSBpIHN6a2xhbnltIHd5a2/FhGN6ZW5pZW0gc2FwcGhpcmUgZ2xvc3MuIFJlZ3VsYWNqYSBwYXJhbWV0csOzdyA1IHN5c3RlbcOzdyB1emJyb2plbmlhLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogR2xvYmFsIFRhY3RpY2FsIFByZXNldHMgJiBDYWxpYnJhdGlvbiAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBmbGV4LXdyYXAgcmVsYXRpdmUgei0xMFwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGFwcGx5UHJlc2V0KCdtYXhfa2lsbCcpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0xLjUgcm91bmRlZC14bCBiZy16aW5jLTkwMCBob3ZlcjpiZy1lbWVyYWxkLTk1MC82MCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNTAwLzQwIHRleHQtZW1lcmFsZC0zMDAgaG92ZXI6dGV4dC1lbWVyYWxkLTIwMCB0ZXh0LXhzIGZvbnQtbW9ubyBmb250LXNlbWlib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgc2hhZG93LW1kIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgIHRpdGxlPVwiTmFzdGF3aWVuaWUgcG90ZW5jam9tZXRyw7N3IG5hIG1ha3N5bWFsbsSFIHNpxYLEmSByYcW8ZW5pYVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPEZsYW1lIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgICAgPHNwYW4+TWF4IFViw7NqPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gYXBwbHlQcmVzZXQoJ3NoaWVsZF9mb2N1cycpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0xLjUgcm91bmRlZC14bCBiZy16aW5jLTkwMCBob3ZlcjpiZy1hbWJlci05NTAvNjAgYm9yZGVyIGJvcmRlci1hbWJlci01MDAvNDAgdGV4dC1hbWJlci0zMDAgaG92ZXI6dGV4dC1hbWJlci0yMDAgdGV4dC14cyBmb250LW1vbm8gZm9udC1zZW1pYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHNoYWRvdy1tZCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICB0aXRsZT1cIktvbmNlbnRyYWNqYSBlbmVyZ2lpIG5hIHRhcmN6eSBoZWtzYWdvbmFsbmVqXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8U2hpZWxkQ2hlY2sgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1hbWJlci00MDBcIiAvPlxuICAgICAgICAgICAgPHNwYW4+VGFyY3phIEhleDwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGFwcGx5UHJlc2V0KCdxdWFudHVtX3Jlc29uYW5jZScpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0xLjUgcm91bmRlZC14bCBiZy16aW5jLTkwMCBob3ZlcjpiZy1pbmRpZ28tOTUwLzYwIGJvcmRlciBib3JkZXItaW5kaWdvLTUwMC80MCB0ZXh0LWluZGlnby0zMDAgaG92ZXI6dGV4dC1pbmRpZ28tMjAwIHRleHQteHMgZm9udC1tb25vIGZvbnQtc2VtaWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBzaGFkb3ctbWQgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgdGl0bGU9XCJEb3N0cm9qZW5pZSBkbyA5NDAuOCBUSHogc3ViLWNhcnJpZXJcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxSYWRpbyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWluZGlnby00MDBcIiAvPlxuICAgICAgICAgICAgPHNwYW4+OTQwLjggVEh6PC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17aGFuZGxlQ2FsaWJyYXRlQWxsfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMy41IHB5LTEuNSByb3VuZGVkLXhsIGJnLXppbmMtOTAwIGhvdmVyOmJnLXppbmMtODAwIGJvcmRlciBib3JkZXItd2hpdGUvMTUgdGV4dC1zbGF0ZS0zMDAgaG92ZXI6dGV4dC13aGl0ZSB0ZXh0LXhzIGZvbnQtbW9ubyBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBzaGFkb3ctbGcgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgdGl0bGU9XCJQcnp5d3LDs8SHIG9wdHltYWxuZSBsYWJvcmF0b3J5am5lIG5hc3Rhd3kgcG90ZW5jam9tZXRyw7N3XCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8UmVmcmVzaEN3IGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtYW1iZXItNDAwXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPkthbGlicmFjamE8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBSZWFsLXRpbWUgR2xvYmFsIEVuZXJneSBEaXN0cmlidXRpb24gVGVsZW1ldHJ5IEJhciAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQtMnhsIGJnLXppbmMtOTUwLzgwIGJvcmRlciBib3JkZXItd2hpdGUvMTAgc2hhZG93LXhsIGdyaWQgZ3JpZC1jb2xzLTIgc206Z3JpZC1jb2xzLTUgZ2FwLTMgZm9udC1tb25vXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yLjUgcm91bmRlZC14bCBiZy16aW5jLTkwMC85MCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNTAwLzMwXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCB1cHBlcmNhc2VcIj4xLiBMYXNlciBQbGF6bW93eTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJsYWNrIHRleHQtZW1lcmFsZC0zMDAgbXQtMC41XCI+e2xhc2VyUG93ZXJNdy50b0ZpeGVkKDIpfSBNVzwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB0ZXh0LXNsYXRlLTUwMFwiPnt0ZWxlbWV0cnkubGFzZXJWb2x0YWdlS3YudG9GaXhlZCgxKX0ga1Yg4oCiIHt0ZWxlbWV0cnkubGFzZXJBbXBlcmFnZUEudG9GaXhlZCgwKX0gQTwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMi41IHJvdW5kZWQteGwgYmctemluYy05MDAvOTAgYm9yZGVyIGJvcmRlci1yb3NlLTUwMC8zMFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDAgdXBwZXJjYXNlXCI+Mi4gUGFuaWMgRnJlZXplPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtYmxhY2sgdGV4dC1yb3NlLTMwMCBtdC0wLjVcIj57cGFuaWNQb3dlclcudG9GaXhlZCgxKX0gVzwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB0ZXh0LXNsYXRlLTUwMFwiPnt0ZWxlbWV0cnkucGFuaWNWb2x0YWdlVi50b0ZpeGVkKDIpfSBWIOKAoiB7dGVsZW1ldHJ5LnBhbmljQ3VycmVudEEudG9GaXhlZCgwKX0gQTwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMi41IHJvdW5kZWQteGwgYmctemluYy05MDAvOTAgYm9yZGVyIGJvcmRlci1jeWFuLTUwMC8zMFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDAgdXBwZXJjYXNlXCI+My4gSW1wdWxzIEVNUDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJsYWNrIHRleHQtY3lhbi0zMDAgbXQtMC41XCI+e2VtcFBvd2VyTXcudG9GaXhlZCgxKX0gTVc8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzlweF0gdGV4dC1zbGF0ZS01MDBcIj57dGVsZW1ldHJ5LmVtcFZvbHRhZ2VLdi50b0ZpeGVkKDApfSBrViDigKIge3RlbGVtZXRyeS5lbXBQZWFrQ3VycmVudEthLnRvRml4ZWQoMSl9IGtBPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yLjUgcm91bmRlZC14bCBiZy16aW5jLTkwMC85MCBib3JkZXIgYm9yZGVyLWFtYmVyLTUwMC8zMFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDAgdXBwZXJjYXNlXCI+NC4gVGFyY3phIExhc2Vyb3dhPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtYmxhY2sgdGV4dC1hbWJlci0zMDAgbXQtMC41XCI+e2JhcnJpZXJQb3dlckt3LnRvRml4ZWQoMSl9IGtXPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtc2xhdGUtNTAwXCI+e3RlbGVtZXRyeS5iYXJyaWVyVm9sdGFnZUt2LnRvRml4ZWQoMSl9IGtWIOKAoiB7dGVsZW1ldHJ5LmJhcnJpZXJOb2Rlc30gd8SZesWCw7N3PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yLjUgcm91bmRlZC14bCBiZy16aW5jLTkwMC85MCBib3JkZXIgYm9yZGVyLWluZGlnby01MDAvMzAgY29sLXNwYW4tMiBzbTpjb2wtc3Bhbi0xXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCB1cHBlcmNhc2VcIj41LiBNb2R1bGF0b3IgOTQwLjggVEh6PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtYmxhY2sgdGV4dC1pbmRpZ28tMzAwIG10LTAuNVwiPntxdWFudHVtUG93ZXJLdy50b0ZpeGVkKDIpfSBrVzwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB0ZXh0LXNsYXRlLTUwMFwiPnt0ZWxlbWV0cnkucXVhbnR1bUZyZXFUaHoudG9GaXhlZCgxKX0gVEh6IOKAoiB7dGVsZW1ldHJ5LnF1YW50dW1QaGFzZURlZ33CsDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogR3JpZCBvZiBXZWFwb24gU2VjdGlvbnMgKDUgRGlzdGluY3QgV2VhcG9ucyB3aXRoIERlZGljYXRlZCBHbG9zc3kgUG90ZW50aW9tZXRlcnMpICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTZcIj5cblxuICAgICAgICB7LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL31cbiAgICAgICAgey8qIEJST8WDIDE6IERaSUHFgU8gU1BPUElFTEVOSUEgTEFTRVJPV0VHTyAoVULDk0ogR05JRCkgICAgICAgICAgICAgICAgICAgICAgICAgKi99XG4gICAgICAgIHsvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNiByb3VuZGVkLTN4bCBiZy16aW5jLTk1MC84NSBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNTAwLzMwIHNoYWRvdy0yeGwgc3BhY2UteS01XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IHNtOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTMgYm9yZGVyLWIgYm9yZGVyLXdoaXRlLzEwIHBiLTRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIuNSByb3VuZGVkLTJ4bCBiZy16aW5jLTkwMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNTAwLzQwIHRleHQtZW1lcmFsZC00MDAgc2hhZG93LW1kXCI+XG4gICAgICAgICAgICAgICAgPFNrdWxsIGNsYXNzTmFtZT1cInctNiBoLTZcIiAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtYm9sZCBmb250LW1vbm8gdGV4dC13aGl0ZSB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZVwiPlxuICAgICAgICAgICAgICAgICAgICAxLiBEWklBxYFPIFNQT1BJRUxFTklBIExBU0VST1dFR08gKFVCw5NKIEdOSUQpXG4gICAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMiBweS0wLjUgcm91bmRlZCBiZy1lbWVyYWxkLTk1MC84MCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNTAwLzUwIHRleHQtZW1lcmFsZC0zMDAgZm9udC1tb25vIHRleHQtWzEwcHhdIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgICAwIE1TIC8gSU5TVEFOVCBLSUxMXG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIGZvbnQtc2FucyBtdC0wLjUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgZmxleC13cmFwXCI+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5UeXAgRW5lcmdpaTogPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtMzAwIGZvbnQtbW9ub1wiPktvaGVyZW50bmEgUGxhem1hIEZvdG9ub3dhPC9zdHJvbmc+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+4oCiPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+TW9jIENpxIVnxYJhOiA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtd2hpdGUgZm9udC1tb25vXCI+e2xhc2VyUG93ZXJNdy50b0ZpeGVkKDMpfSBNVzwvc3Ryb25nPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIFF1aWNrIERpZ2l0YWwgR2F1Z2VzICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBmb250LW1vbm8gdGV4dC14c1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTMgcHktMS41IHJvdW5kZWQteGwgYmctemluYy05MDAgYm9yZGVyIGJvcmRlci13aGl0ZS8xMFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwIHRleHQtWzEwcHhdIGJsb2NrXCI+TkFQScSYQ0lFPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC0zMDAgZm9udC1ibGFja1wiPnt0ZWxlbWV0cnkubGFzZXJWb2x0YWdlS3YudG9GaXhlZCgxKX0ga1Y8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTMgcHktMS41IHJvdW5kZWQteGwgYmctemluYy05MDAgYm9yZGVyIGJvcmRlci13aGl0ZS8xMFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwIHRleHQtWzEwcHhdIGJsb2NrXCI+UFLEhEQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1hbWJlci0zMDAgZm9udC1ibGFja1wiPnt0ZWxlbWV0cnkubGFzZXJBbXBlcmFnZUEudG9GaXhlZCgwKX0gQTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtMyBweS0xLjUgcm91bmRlZC14bCBiZy16aW5jLTkwMCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDAgdGV4dC1bMTBweF0gYmxvY2tcIj5DWsSYU1RPVExJV0/FmsSGPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtY3lhbi0zMDAgZm9udC1ibGFja1wiPnt0ZWxlbWV0cnkubGFzZXJGcmVxdWVuY3lUaHoudG9GaXhlZCgxKX0gVEh6PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIFBvdGVudGlvbWV0ZXIgUm93IHdpdGggUXVpZXQgTHV4dXJ5IEZpbmlzaCAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgc206Z3JpZC1jb2xzLTQgZ2FwLTRcIj5cbiAgICAgICAgICAgIDxSb3RhcnlQb3RlbnRpb21ldGVyXG4gICAgICAgICAgICAgIGxhYmVsPVwiTmFwacSZY2llIER5c3p5IChrVilcIlxuICAgICAgICAgICAgICB1bml0PVwia1ZcIlxuICAgICAgICAgICAgICBtaW49ezEuMH1cbiAgICAgICAgICAgICAgbWF4PXsyNS4wfVxuICAgICAgICAgICAgICBzdGVwPXswLjF9XG4gICAgICAgICAgICAgIHZhbHVlPXt0ZWxlbWV0cnkubGFzZXJWb2x0YWdlS3Z9XG4gICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17REVGQVVMVF9URUxFTUVUUlkubGFzZXJWb2x0YWdlS3Z9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsodikgPT4gdXBkYXRlUGFyYW0oJ2xhc2VyVm9sdGFnZUt2Jywgdil9XG4gICAgICAgICAgICAgIGFjY2VudENvbG9yPVwiZW1lcmFsZFwiXG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uPVwiTmFwacSZY2llIGpvbml6YWNqaSBwbGF6bXkgZm90b25vd2VqXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8Um90YXJ5UG90ZW50aW9tZXRlclxuICAgICAgICAgICAgICBsYWJlbD1cIlByxIVkIER5c3p5IChBKVwiXG4gICAgICAgICAgICAgIHVuaXQ9XCJBXCJcbiAgICAgICAgICAgICAgbWluPXsxMC4wfVxuICAgICAgICAgICAgICBtYXg9ezUwMC4wfVxuICAgICAgICAgICAgICBzdGVwPXsxLjB9XG4gICAgICAgICAgICAgIGRlY2ltYWxzPXswfVxuICAgICAgICAgICAgICB2YWx1ZT17dGVsZW1ldHJ5Lmxhc2VyQW1wZXJhZ2VBfVxuICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e0RFRkFVTFRfVEVMRU1FVFJZLmxhc2VyQW1wZXJhZ2VBfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KHYpID0+IHVwZGF0ZVBhcmFtKCdsYXNlckFtcGVyYWdlQScsIHYpfVxuICAgICAgICAgICAgICBhY2NlbnRDb2xvcj1cImFtYmVyXCJcbiAgICAgICAgICAgICAgZGVzY3JpcHRpb249XCJOYXTEmcW8ZW5pZSB3ecWCYWRvd2FuaWEgdyBrb21vcnplXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8Um90YXJ5UG90ZW50aW9tZXRlclxuICAgICAgICAgICAgICBsYWJlbD1cIkN6xJlzdG90bGl3b8WbxIcgKFRIeilcIlxuICAgICAgICAgICAgICB1bml0PVwiVEh6XCJcbiAgICAgICAgICAgICAgbWluPXsxMDAuMH1cbiAgICAgICAgICAgICAgbWF4PXsxNTAwLjB9XG4gICAgICAgICAgICAgIHN0ZXA9ezAuNX1cbiAgICAgICAgICAgICAgdmFsdWU9e3RlbGVtZXRyeS5sYXNlckZyZXF1ZW5jeVRoen1cbiAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXtERUZBVUxUX1RFTEVNRVRSWS5sYXNlckZyZXF1ZW5jeVRoen1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyh2KSA9PiB1cGRhdGVQYXJhbSgnbGFzZXJGcmVxdWVuY3lUaHonLCB2KX1cbiAgICAgICAgICAgICAgYWNjZW50Q29sb3I9XCJjeWFuXCJcbiAgICAgICAgICAgICAgZGVzY3JpcHRpb249XCJExYJ1Z2/Fm8SHIGZhbGkgb3B0eWN6bmVqIHNwb3BpZWxlbmlhXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8Um90YXJ5UG90ZW50aW9tZXRlclxuICAgICAgICAgICAgICBsYWJlbD1cIk9nbmlza293YSAobW0pXCJcbiAgICAgICAgICAgICAgdW5pdD1cIm1tXCJcbiAgICAgICAgICAgICAgbWluPXswLjF9XG4gICAgICAgICAgICAgIG1heD17MTAuMH1cbiAgICAgICAgICAgICAgc3RlcD17MC4xfVxuICAgICAgICAgICAgICB2YWx1ZT17dGVsZW1ldHJ5Lmxhc2VyRm9jYWxNbX1cbiAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXtERUZBVUxUX1RFTEVNRVRSWS5sYXNlckZvY2FsTW19XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsodikgPT4gdXBkYXRlUGFyYW0oJ2xhc2VyRm9jYWxNbScsIHYpfVxuICAgICAgICAgICAgICBhY2NlbnRDb2xvcj1cImVtZXJhbGRcIlxuICAgICAgICAgICAgICBkZXNjcmlwdGlvbj1cIsWacmVkbmljYSBwbGFta2kgc2t1cGllbmlhIHdpxIV6a2lcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi99XG4gICAgICAgIHsvKiBCUk/FgyAyOiBNT0RVxYEgWkFNUkHFu0FOSUEgUkFNICYgSsSERFJBIChQQU5JQyBGUkVFWkUpICAgICAgICAgICAgICAgICAgICAgICAqL31cbiAgICAgICAgey8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC02IHJvdW5kZWQtM3hsIGJnLXppbmMtOTUwLzg1IGJvcmRlciBib3JkZXItcm9zZS01MDAvMzAgc2hhZG93LTJ4bCBzcGFjZS15LTVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgc206aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMyBib3JkZXItYiBib3JkZXItd2hpdGUvMTAgcGItNFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMi41IHJvdW5kZWQtMnhsIGJnLXppbmMtOTAwIGJvcmRlciBib3JkZXItcm9zZS01MDAvNDAgdGV4dC1yb3NlLTQwMCBzaGFkb3ctbWRcIj5cbiAgICAgICAgICAgICAgICA8QWxlcnRPY3RhZ29uIGNsYXNzTmFtZT1cInctNiBoLTZcIiAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtYm9sZCBmb250LW1vbm8gdGV4dC13aGl0ZSB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZVwiPlxuICAgICAgICAgICAgICAgICAgICAyLiBNT0RVxYEgWkFNUkHFu0FOSUEgUkFNICYgSsSERFJBIChQQU5JQyBGUkVFWkUpXG4gICAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMiBweS0wLjUgcm91bmRlZCBiZy1yb3NlLTk1MC84MCBib3JkZXIgYm9yZGVyLXJvc2UtNTAwLzUwIHRleHQtcm9zZS0zMDAgZm9udC1tb25vIHRleHQtWzEwcHhdIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgICBOVFNVU1BFTkQgLyBTSUdTVE9QXG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIGZvbnQtc2FucyBtdC0wLjUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgZmxleC13cmFwXCI+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5UeXAgRW5lcmdpaTogPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LXJvc2UtMzAwIGZvbnQtbW9ub1wiPlNwcnrEmXRvd2UgVMWCdW1pZW5pZSBOdFN1c3BlbmQgKEludGVycnVwdCBDbGFtcCk8L3N0cm9uZz48L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj7igKI8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5Nb2MgU3p5bnkgTG9naWN6bmVqOiA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtd2hpdGUgZm9udC1tb25vXCI+e3BhbmljUG93ZXJXLnRvRml4ZWQoMSl9IFc8L3N0cm9uZz48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgZm9udC1tb25vIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweC0zIHB5LTEuNSByb3VuZGVkLXhsIGJnLXppbmMtOTAwIGJvcmRlciBib3JkZXItd2hpdGUvMTBcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMCB0ZXh0LVsxMHB4XSBibG9ja1wiPlNaWU5BIFZDT1JFPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcm9zZS0zMDAgZm9udC1ibGFja1wiPnt0ZWxlbWV0cnkucGFuaWNWb2x0YWdlVi50b0ZpeGVkKDIpfSBWPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweC0zIHB5LTEuNSByb3VuZGVkLXhsIGJnLXppbmMtOTAwIGJvcmRlciBib3JkZXItd2hpdGUvMTBcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMCB0ZXh0LVsxMHB4XSBibG9ja1wiPlBSxIREIE1BR0lTVFJBTEk8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1hbWJlci0zMDAgZm9udC1ibGFja1wiPnt0ZWxlbWV0cnkucGFuaWNDdXJyZW50QS50b0ZpeGVkKDApfSBBPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweC0zIHB5LTEuNSByb3VuZGVkLXhsIGJnLXppbmMtOTAwIGJvcmRlciBib3JkZXItd2hpdGUvMTBcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMCB0ZXh0LVsxMHB4XSBibG9ja1wiPkNaQVMgWkFUUlpZTUFOSUE8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1jeWFuLTMwMCBmb250LWJsYWNrXCI+MC4wMCBtczwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBzbTpncmlkLWNvbHMtMyBnYXAtNFwiPlxuICAgICAgICAgICAgPFJvdGFyeVBvdGVudGlvbWV0ZXJcbiAgICAgICAgICAgICAgbGFiZWw9XCJOYXBpxJljaWUgVkNvcmUgKFYpXCJcbiAgICAgICAgICAgICAgdW5pdD1cIlZcIlxuICAgICAgICAgICAgICBtaW49ezAuOH1cbiAgICAgICAgICAgICAgbWF4PXsyLjV9XG4gICAgICAgICAgICAgIHN0ZXA9ezAuMDV9XG4gICAgICAgICAgICAgIGRlY2ltYWxzPXsyfVxuICAgICAgICAgICAgICB2YWx1ZT17dGVsZW1ldHJ5LnBhbmljVm9sdGFnZVZ9XG4gICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17REVGQVVMVF9URUxFTUVUUlkucGFuaWNWb2x0YWdlVn1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyh2KSA9PiB1cGRhdGVQYXJhbSgncGFuaWNWb2x0YWdlVicsIHYpfVxuICAgICAgICAgICAgICBhY2NlbnRDb2xvcj1cInJvc2VcIlxuICAgICAgICAgICAgICBkZXNjcmlwdGlvbj1cIk5hcGnEmWNpZSBzenlueSBwcnplcndhxYQgasSFZHJhXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8Um90YXJ5UG90ZW50aW9tZXRlclxuICAgICAgICAgICAgICBsYWJlbD1cIlByxIVkIFN6eW55IChBKVwiXG4gICAgICAgICAgICAgIHVuaXQ9XCJBXCJcbiAgICAgICAgICAgICAgbWluPXsxMC4wfVxuICAgICAgICAgICAgICBtYXg9ezIwMC4wfVxuICAgICAgICAgICAgICBzdGVwPXsxLjB9XG4gICAgICAgICAgICAgIGRlY2ltYWxzPXswfVxuICAgICAgICAgICAgICB2YWx1ZT17dGVsZW1ldHJ5LnBhbmljQ3VycmVudEF9XG4gICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17REVGQVVMVF9URUxFTUVUUlkucGFuaWNDdXJyZW50QX1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyh2KSA9PiB1cGRhdGVQYXJhbSgncGFuaWNDdXJyZW50QScsIHYpfVxuICAgICAgICAgICAgICBhY2NlbnRDb2xvcj1cImFtYmVyXCJcbiAgICAgICAgICAgICAgZGVzY3JpcHRpb249XCJQcsSFZCB0xYJ1bWllbmlhIHJlamVzdHLDs3cgQ1BVXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8Um90YXJ5UG90ZW50aW9tZXRlclxuICAgICAgICAgICAgICBsYWJlbD1cIlByw7NnIEJsb2thZHkgKCUpXCJcbiAgICAgICAgICAgICAgdW5pdD1cIiVcIlxuICAgICAgICAgICAgICBtaW49ezEuMH1cbiAgICAgICAgICAgICAgbWF4PXsxMDAuMH1cbiAgICAgICAgICAgICAgc3RlcD17MS4wfVxuICAgICAgICAgICAgICBkZWNpbWFscz17MH1cbiAgICAgICAgICAgICAgdmFsdWU9e3RlbGVtZXRyeS5wYW5pY1RocmVzaG9sZFBjdH1cbiAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXtERUZBVUxUX1RFTEVNRVRSWS5wYW5pY1RocmVzaG9sZFBjdH1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyh2KSA9PiB1cGRhdGVQYXJhbSgncGFuaWNUaHJlc2hvbGRQY3QnLCB2KX1cbiAgICAgICAgICAgICAgYWNjZW50Q29sb3I9XCJyb3NlXCJcbiAgICAgICAgICAgICAgZGVzY3JpcHRpb249XCJBZ3Jlc3l3bm/Fm8SHIHpyeXdhbmlhIHDEmXRsaSB3xIV0a8Ozd1wiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL31cbiAgICAgICAgey8qIEJST8WDIDM6IEdFTkVSQVRPUiBJTVBVTFNVIEVMRUtUUk9NQUdORVRZQ1pORUdPIChFTVAgU0hPQ0tXQVZFKSAgICAgICAgICAgICovfVxuICAgICAgICB7LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTYgcm91bmRlZC0zeGwgYmctemluYy05NTAvODUgYm9yZGVyIGJvcmRlci1jeWFuLTUwMC8zMCBzaGFkb3ctMnhsIHNwYWNlLXktNVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBzbTppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0zIGJvcmRlci1iIGJvcmRlci13aGl0ZS8xMCBwYi00XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yLjUgcm91bmRlZC0yeGwgYmctemluYy05MDAgYm9yZGVyIGJvcmRlci1jeWFuLTUwMC80MCB0ZXh0LWN5YW4tNDAwIHNoYWRvdy1tZFwiPlxuICAgICAgICAgICAgICAgIDxaYXAgY2xhc3NOYW1lPVwidy02IGgtNlwiIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWJhc2UgZm9udC1ib2xkIGZvbnQtbW9ubyB0ZXh0LXdoaXRlIHVwcGVyY2FzZSB0cmFja2luZy13aWRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDMuIEdFTkVSQVRPUiBJTVBVTFNVIEVMRUtUUk9NQUdORVRZQ1pORUdPIChGQUxBIEVNUClcbiAgICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0yIHB5LTAuNSByb3VuZGVkIGJnLWN5YW4tOTUwLzgwIGJvcmRlciBib3JkZXItY3lhbi01MDAvNTAgdGV4dC1jeWFuLTMwMCBmb250LW1vbm8gdGV4dC1bMTBweF0gZm9udC1ib2xkXCI+XG4gICAgICAgICAgICAgICAgICAgIEZMVVgtQ09NUFJFU1NJT04gUkZcbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDAgZm9udC1zYW5zIG10LTAuNSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBmbGV4LXdyYXBcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPlR5cCBFbmVyZ2lpOiA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtY3lhbi0zMDAgZm9udC1tb25vXCI+SW1wdWxzIFBvbGEgTWFnbmV0b2VsZWt0cnljem5lZ28gS29tcHJlc2ppIFN0cnVtaWVuaWE8L3N0cm9uZz48L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj7igKI8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5Nb2MgU3pjenl0b3dhOiA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtd2hpdGUgZm9udC1tb25vXCI+e2VtcFBvd2VyTXcudG9GaXhlZCgxKX0gTVc8L3N0cm9uZz48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgZm9udC1tb25vIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweC0zIHB5LTEuNSByb3VuZGVkLXhsIGJnLXppbmMtOTAwIGJvcmRlciBib3JkZXItd2hpdGUvMTBcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMCB0ZXh0LVsxMHB4XSBibG9ja1wiPk5BUEnEmENJRSBNQVJYPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtY3lhbi0zMDAgZm9udC1ibGFja1wiPnt0ZWxlbWV0cnkuZW1wVm9sdGFnZUt2LnRvRml4ZWQoMSl9IGtWPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweC0zIHB5LTEuNSByb3VuZGVkLXhsIGJnLXppbmMtOTAwIGJvcmRlciBib3JkZXItd2hpdGUvMTBcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMCB0ZXh0LVsxMHB4XSBibG9ja1wiPlBSxIREIFNaQ1pZVE9XWTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWFtYmVyLTMwMCBmb250LWJsYWNrXCI+e3RlbGVtZXRyeS5lbXBQZWFrQ3VycmVudEthLnRvRml4ZWQoMSl9IGtBPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweC0zIHB5LTEuNSByb3VuZGVkLXhsIGJnLXppbmMtOTAwIGJvcmRlciBib3JkZXItd2hpdGUvMTBcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMCB0ZXh0LVsxMHB4XSBibG9ja1wiPlBBU01PIFJGPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC0zMDAgZm9udC1ibGFja1wiPnt0ZWxlbWV0cnkuZW1wRnJlcXVlbmN5R2h6LnRvRml4ZWQoMil9IEdIejwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBzbTpncmlkLWNvbHMtNCBnYXAtNFwiPlxuICAgICAgICAgICAgPFJvdGFyeVBvdGVudGlvbWV0ZXJcbiAgICAgICAgICAgICAgbGFiZWw9XCJOYXBpxJljaWUgTUFSWCAoa1YpXCJcbiAgICAgICAgICAgICAgdW5pdD1cImtWXCJcbiAgICAgICAgICAgICAgbWluPXs1LjB9XG4gICAgICAgICAgICAgIG1heD17MTAwLjB9XG4gICAgICAgICAgICAgIHN0ZXA9ezAuNX1cbiAgICAgICAgICAgICAgdmFsdWU9e3RlbGVtZXRyeS5lbXBWb2x0YWdlS3Z9XG4gICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17REVGQVVMVF9URUxFTUVUUlkuZW1wVm9sdGFnZUt2fVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KHYpID0+IHVwZGF0ZVBhcmFtKCdlbXBWb2x0YWdlS3YnLCB2KX1cbiAgICAgICAgICAgICAgYWNjZW50Q29sb3I9XCJjeWFuXCJcbiAgICAgICAgICAgICAgZGVzY3JpcHRpb249XCJOYXBpxJljaWUgYmF0ZXJpaSBrb25kZW5zYXRvcsOzdyBNQVJYXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8Um90YXJ5UG90ZW50aW9tZXRlclxuICAgICAgICAgICAgICBsYWJlbD1cIlByxIVkIFN6Y3p5dG93eSAoa0EpXCJcbiAgICAgICAgICAgICAgdW5pdD1cImtBXCJcbiAgICAgICAgICAgICAgbWluPXsxLjB9XG4gICAgICAgICAgICAgIG1heD17NTAuMH1cbiAgICAgICAgICAgICAgc3RlcD17MC41fVxuICAgICAgICAgICAgICB2YWx1ZT17dGVsZW1ldHJ5LmVtcFBlYWtDdXJyZW50S2F9XG4gICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17REVGQVVMVF9URUxFTUVUUlkuZW1wUGVha0N1cnJlbnRLYX1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyh2KSA9PiB1cGRhdGVQYXJhbSgnZW1wUGVha0N1cnJlbnRLYScsIHYpfVxuICAgICAgICAgICAgICBhY2NlbnRDb2xvcj1cImFtYmVyXCJcbiAgICAgICAgICAgICAgZGVzY3JpcHRpb249XCJTemN6eXRvd3kgYW1wZXJhxbwgd3nFgmFkb3dhbmlhXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8Um90YXJ5UG90ZW50aW9tZXRlclxuICAgICAgICAgICAgICBsYWJlbD1cIkN6xJlzdG90bGl3b8WbxIcgUkYgKEdIeilcIlxuICAgICAgICAgICAgICB1bml0PVwiR0h6XCJcbiAgICAgICAgICAgICAgbWluPXswLjF9XG4gICAgICAgICAgICAgIG1heD17MTAuMH1cbiAgICAgICAgICAgICAgc3RlcD17MC4wNX1cbiAgICAgICAgICAgICAgZGVjaW1hbHM9ezJ9XG4gICAgICAgICAgICAgIHZhbHVlPXt0ZWxlbWV0cnkuZW1wRnJlcXVlbmN5R2h6fVxuICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e0RFRkFVTFRfVEVMRU1FVFJZLmVtcEZyZXF1ZW5jeUdoen1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyh2KSA9PiB1cGRhdGVQYXJhbSgnZW1wRnJlcXVlbmN5R2h6Jywgdil9XG4gICAgICAgICAgICAgIGFjY2VudENvbG9yPVwiY3lhblwiXG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uPVwiUGFzbW8gcGVuZXRyYWNqaSBtYWdpc3RyYWxpIFBDSWVcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxSb3RhcnlQb3RlbnRpb21ldGVyXG4gICAgICAgICAgICAgIGxhYmVsPVwiUHJvbWllxYQgRmFsaSAobSlcIlxuICAgICAgICAgICAgICB1bml0PVwibVwiXG4gICAgICAgICAgICAgIG1pbj17MTB9XG4gICAgICAgICAgICAgIG1heD17NTAwfVxuICAgICAgICAgICAgICBzdGVwPXs1fVxuICAgICAgICAgICAgICBkZWNpbWFscz17MH1cbiAgICAgICAgICAgICAgdmFsdWU9e3RlbGVtZXRyeS5lbXBSYWRpdXNNfVxuICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e0RFRkFVTFRfVEVMRU1FVFJZLmVtcFJhZGl1c019XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsodikgPT4gdXBkYXRlUGFyYW0oJ2VtcFJhZGl1c00nLCB2KX1cbiAgICAgICAgICAgICAgYWNjZW50Q29sb3I9XCJpbmRpZ29cIlxuICAgICAgICAgICAgICBkZXNjcmlwdGlvbj1cIlphc2nEmWcgc3RlcnlsaXphY2ppIGVsZWt0cm9tYWduZXR5Y3puZWpcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi99XG4gICAgICAgIHsvKiBCUk/FgyA0OiBIRUtTQUdPTkFMTkEgVEFSQ1pBIExBU0VST1dBIChIRVggTEFTRVIgQkFSUklFUikgICAgICAgICAgICAgICAgICAqL31cbiAgICAgICAgey8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC02IHJvdW5kZWQtM3hsIGJnLXppbmMtOTUwLzg1IGJvcmRlciBib3JkZXItYW1iZXItNTAwLzMwIHNoYWRvdy0yeGwgc3BhY2UteS01XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IHNtOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTMgYm9yZGVyLWIgYm9yZGVyLXdoaXRlLzEwIHBiLTRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIuNSByb3VuZGVkLTJ4bCBiZy16aW5jLTkwMCBib3JkZXIgYm9yZGVyLWFtYmVyLTUwMC80MCB0ZXh0LWFtYmVyLTQwMCBzaGFkb3ctbWRcIj5cbiAgICAgICAgICAgICAgICA8U2hpZWxkQ2hlY2sgY2xhc3NOYW1lPVwidy02IGgtNlwiIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWJhc2UgZm9udC1ib2xkIGZvbnQtbW9ubyB0ZXh0LXdoaXRlIHVwcGVyY2FzZSB0cmFja2luZy13aWRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDQuIEhFS1NBR09OQUxOQSBUQVJDWkEgTEFTRVJPV0EgKEtPUFXFgUEgT0NIUk9OTkEpXG4gICAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMiBweS0wLjUgcm91bmRlZCBiZy1hbWJlci05NTAvODAgYm9yZGVyIGJvcmRlci1hbWJlci01MDAvNTAgdGV4dC1hbWJlci0zMDAgZm9udC1tb25vIHRleHQtWzEwcHhdIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgICAxMCBQVUxTw5NXIC8gTUlOXG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIGZvbnQtc2FucyBtdC0wLjUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgZmxleC13cmFwXCI+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5UeXAgRW5lcmdpaTogPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LWFtYmVyLTMwMCBmb250LW1vbm9cIj5FbGVrdHJvZHluYW1pY3puYSBNYXRyeWNhIFNrYWxhcm5hIFBvbGFyeXphY2ppIFNpYXRraTwvc3Ryb25nPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPuKAojwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPk1vYyBDacSFZ8WCYSBUYXJjenk6IDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC13aGl0ZSBmb250LW1vbm9cIj57YmFycmllclBvd2VyS3cudG9GaXhlZCgxKX0ga1c8L3N0cm9uZz48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgZm9udC1tb25vIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweC0zIHB5LTEuNSByb3VuZGVkLXhsIGJnLXppbmMtOTAwIGJvcmRlciBib3JkZXItd2hpdGUvMTBcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMCB0ZXh0LVsxMHB4XSBibG9ja1wiPk5BUEnEmENJRSBTSUFUS0k8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1hbWJlci0zMDAgZm9udC1ibGFja1wiPnt0ZWxlbWV0cnkuYmFycmllclZvbHRhZ2VLdi50b0ZpeGVkKDEpfSBrVjwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtMyBweS0xLjUgcm91bmRlZC14bCBiZy16aW5jLTkwMCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDAgdGV4dC1bMTBweF0gYmxvY2tcIj5QUsSERCBQT0RUUlpZTUFOSUE8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1lbWVyYWxkLTMwMCBmb250LWJsYWNrXCI+e3RlbGVtZXRyeS5iYXJyaWVyQ3VycmVudEEudG9GaXhlZCgwKX0gQTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtMyBweS0xLjUgcm91bmRlZC14bCBiZy16aW5jLTkwMCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDAgdGV4dC1bMTBweF0gYmxvY2tcIj5QVUxTPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtY3lhbi0zMDAgZm9udC1ibGFja1wiPnt0ZWxlbWV0cnkuYmFycmllclB1bHNlUHBtLnRvRml4ZWQoMCl9IHBwbTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBzbTpncmlkLWNvbHMtNCBnYXAtNFwiPlxuICAgICAgICAgICAgPFJvdGFyeVBvdGVudGlvbWV0ZXJcbiAgICAgICAgICAgICAgbGFiZWw9XCJOYXBpxJljaWUgU2lhdGtpIChrVilcIlxuICAgICAgICAgICAgICB1bml0PVwia1ZcIlxuICAgICAgICAgICAgICBtaW49ezEuMH1cbiAgICAgICAgICAgICAgbWF4PXsyMC4wfVxuICAgICAgICAgICAgICBzdGVwPXswLjF9XG4gICAgICAgICAgICAgIHZhbHVlPXt0ZWxlbWV0cnkuYmFycmllclZvbHRhZ2VLdn1cbiAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXtERUZBVUxUX1RFTEVNRVRSWS5iYXJyaWVyVm9sdGFnZUt2fVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KHYpID0+IHVwZGF0ZVBhcmFtKCdiYXJyaWVyVm9sdGFnZUt2Jywgdil9XG4gICAgICAgICAgICAgIGFjY2VudENvbG9yPVwiYW1iZXJcIlxuICAgICAgICAgICAgICBkZXNjcmlwdGlvbj1cIk5hcGnEmWNpZSBwb2xhcnl6YWNqaSB6d2llcmNpYWRlxYIgaGV4XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8Um90YXJ5UG90ZW50aW9tZXRlclxuICAgICAgICAgICAgICBsYWJlbD1cIlByxIVkIFphc2lsYW5pYSAoQSlcIlxuICAgICAgICAgICAgICB1bml0PVwiQVwiXG4gICAgICAgICAgICAgIG1pbj17NS4wfVxuICAgICAgICAgICAgICBtYXg9ezEwMC4wfVxuICAgICAgICAgICAgICBzdGVwPXsxLjB9XG4gICAgICAgICAgICAgIGRlY2ltYWxzPXswfVxuICAgICAgICAgICAgICB2YWx1ZT17dGVsZW1ldHJ5LmJhcnJpZXJDdXJyZW50QX1cbiAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXtERUZBVUxUX1RFTEVNRVRSWS5iYXJyaWVyQ3VycmVudEF9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsodikgPT4gdXBkYXRlUGFyYW0oJ2JhcnJpZXJDdXJyZW50QScsIHYpfVxuICAgICAgICAgICAgICBhY2NlbnRDb2xvcj1cImVtZXJhbGRcIlxuICAgICAgICAgICAgICBkZXNjcmlwdGlvbj1cIlByxIVkIHN0YWJpbGl6YWNqaSBmYWxvd29kw7N3XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8Um90YXJ5UG90ZW50aW9tZXRlclxuICAgICAgICAgICAgICBsYWJlbD1cIkN6xJlzdG90bGl3b8WbxIcgKHBwbSlcIlxuICAgICAgICAgICAgICB1bml0PVwicHBtXCJcbiAgICAgICAgICAgICAgbWluPXsxLjB9XG4gICAgICAgICAgICAgIG1heD17NjAuMH1cbiAgICAgICAgICAgICAgc3RlcD17MS4wfVxuICAgICAgICAgICAgICBkZWNpbWFscz17MH1cbiAgICAgICAgICAgICAgdmFsdWU9e3RlbGVtZXRyeS5iYXJyaWVyUHVsc2VQcG19XG4gICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17REVGQVVMVF9URUxFTUVUUlkuYmFycmllclB1bHNlUHBtfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KHYpID0+IHVwZGF0ZVBhcmFtKCdiYXJyaWVyUHVsc2VQcG0nLCB2KX1cbiAgICAgICAgICAgICAgYWNjZW50Q29sb3I9XCJhbWJlclwiXG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uPVwiSWxvxZvEhyBwdWxzw7N3IGxhc2Vyb3d5Y2ggbmEgbWludXTEmVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPFJvdGFyeVBvdGVudGlvbWV0ZXJcbiAgICAgICAgICAgICAgbGFiZWw9XCJXxJl6xYJ5IFNpYXRraVwiXG4gICAgICAgICAgICAgIHVuaXQ9XCJ3xJl6xYLDs3dcIlxuICAgICAgICAgICAgICBtaW49ezEwMH1cbiAgICAgICAgICAgICAgbWF4PXsxMDAwfVxuICAgICAgICAgICAgICBzdGVwPXsxMH1cbiAgICAgICAgICAgICAgZGVjaW1hbHM9ezB9XG4gICAgICAgICAgICAgIHZhbHVlPXt0ZWxlbWV0cnkuYmFycmllck5vZGVzfVxuICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e0RFRkFVTFRfVEVMRU1FVFJZLmJhcnJpZXJOb2Rlc31cbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyh2KSA9PiB1cGRhdGVQYXJhbSgnYmFycmllck5vZGVzJywgdil9XG4gICAgICAgICAgICAgIGFjY2VudENvbG9yPVwiY3lhblwiXG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uPVwiR8SZc3RvxZvEhyBrb23Ds3JlayBoZWtzYWdvbmFsbnljaFwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL31cbiAgICAgICAgey8qIEJST8WDIDU6IE1PRFVMQVRPUiBLV0FOVE9XWSA5NDAsOCBUSHogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovfVxuICAgICAgICB7LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTYgcm91bmRlZC0zeGwgYmctemluYy05NTAvODUgYm9yZGVyIGJvcmRlci1pbmRpZ28tNTAwLzMwIHNoYWRvdy0yeGwgc3BhY2UteS01XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IHNtOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTMgYm9yZGVyLWIgYm9yZGVyLXdoaXRlLzEwIHBiLTRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIuNSByb3VuZGVkLTJ4bCBiZy16aW5jLTkwMCBib3JkZXIgYm9yZGVyLWluZGlnby01MDAvNDAgdGV4dC1pbmRpZ28tNDAwIHNoYWRvdy1tZFwiPlxuICAgICAgICAgICAgICAgIDxSYWRpbyBjbGFzc05hbWU9XCJ3LTYgaC02XCIgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJvbGQgZm9udC1tb25vIHRleHQtd2hpdGUgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVcIj5cbiAgICAgICAgICAgICAgICAgICAgNS4gTU9EVUxBVE9SIEtXQU5UT1dZIDk0MCw4IFRIeiAoUkVaT05BTlMgT1BUWUNaTlkpXG4gICAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMiBweS0wLjUgcm91bmRlZCBiZy1pbmRpZ28tOTUwLzgwIGJvcmRlciBib3JkZXItaW5kaWdvLTUwMC81MCB0ZXh0LWluZGlnby0zMDAgZm9udC1tb25vIHRleHQtWzEwcHhdIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgICBTVUItQ0FSUklFUiA5NDAuOCBUSHpcbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDAgZm9udC1zYW5zIG10LTAuNSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBmbGV4LXdyYXBcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPlR5cCBFbmVyZ2lpOiA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtaW5kaWdvLTMwMCBmb250LW1vbm9cIj5SZXpvbmFucyBTdWJhdG9tb3d5IEZhenkgT3B0eWN6bmVqPC9zdHJvbmc+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+4oCiPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+TW9jIFdpxIV6a2kgS3dhbnRvd2VqOiA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtd2hpdGUgZm9udC1tb25vXCI+e3F1YW50dW1Qb3dlckt3LnRvRml4ZWQoMil9IGtXPC9zdHJvbmc+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGZvbnQtbW9ubyB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtMyBweS0xLjUgcm91bmRlZC14bCBiZy16aW5jLTkwMCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDAgdGV4dC1bMTBweF0gYmxvY2tcIj5DWsSYU1RPVExJV0/FmsSGIE5PxZpOQTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWluZGlnby0zMDAgZm9udC1ibGFja1wiPnt0ZWxlbWV0cnkucXVhbnR1bUZyZXFUaHoudG9GaXhlZCgyKX0gVEh6PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweC0zIHB5LTEuNSByb3VuZGVkLXhsIGJnLXppbmMtOTAwIGJvcmRlciBib3JkZXItd2hpdGUvMTBcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMCB0ZXh0LVsxMHB4XSBibG9ja1wiPk5BUEnEmENJRSBLUllTWlRBxYFVPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtY3lhbi0zMDAgZm9udC1ibGFja1wiPnt0ZWxlbWV0cnkucXVhbnR1bVZvbHRhZ2VLdi50b0ZpeGVkKDEpfSBrVjwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtMyBweS0xLjUgcm91bmRlZC14bCBiZy16aW5jLTkwMCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDAgdGV4dC1bMTBweF0gYmxvY2tcIj5QUsSERCBFTUlTSkk8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1hbWJlci0zMDAgZm9udC1ibGFja1wiPnt0ZWxlbWV0cnkucXVhbnR1bUN1cnJlbnRBLnRvRml4ZWQoMSl9IEE8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgc206Z3JpZC1jb2xzLTQgZ2FwLTRcIj5cbiAgICAgICAgICAgIDxSb3RhcnlQb3RlbnRpb21ldGVyXG4gICAgICAgICAgICAgIGxhYmVsPVwiQ3rEmXN0b3RsaXdvxZvEhyAoVEh6KVwiXG4gICAgICAgICAgICAgIHVuaXQ9XCJUSHpcIlxuICAgICAgICAgICAgICBtaW49ezkwMC4wfVxuICAgICAgICAgICAgICBtYXg9ezEwMDAuMH1cbiAgICAgICAgICAgICAgc3RlcD17MC4xfVxuICAgICAgICAgICAgICB2YWx1ZT17dGVsZW1ldHJ5LnF1YW50dW1GcmVxVGh6fVxuICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e0RFRkFVTFRfVEVMRU1FVFJZLnF1YW50dW1GcmVxVGh6fVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KHYpID0+IHVwZGF0ZVBhcmFtKCdxdWFudHVtRnJlcVRoeicsIHYpfVxuICAgICAgICAgICAgICBhY2NlbnRDb2xvcj1cImluZGlnb1wiXG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uPVwiUHJlY3l6eWpuZSBkb3N0cm9qZW5pZSByZXpvbmFuc3VcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxSb3RhcnlQb3RlbnRpb21ldGVyXG4gICAgICAgICAgICAgIGxhYmVsPVwiTmFwacSZY2llIEtyeXN6dGHFgnUgKGtWKVwiXG4gICAgICAgICAgICAgIHVuaXQ9XCJrVlwiXG4gICAgICAgICAgICAgIG1pbj17MC41fVxuICAgICAgICAgICAgICBtYXg9ezEwLjB9XG4gICAgICAgICAgICAgIHN0ZXA9ezAuMX1cbiAgICAgICAgICAgICAgdmFsdWU9e3RlbGVtZXRyeS5xdWFudHVtVm9sdGFnZUt2fVxuICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e0RFRkFVTFRfVEVMRU1FVFJZLnF1YW50dW1Wb2x0YWdlS3Z9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsodikgPT4gdXBkYXRlUGFyYW0oJ3F1YW50dW1Wb2x0YWdlS3YnLCB2KX1cbiAgICAgICAgICAgICAgYWNjZW50Q29sb3I9XCJjeWFuXCJcbiAgICAgICAgICAgICAgZGVzY3JpcHRpb249XCJXemJ1ZHplbmllIGtyeXN6dGHFgnUgcmV6b25hdG9yYVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPFJvdGFyeVBvdGVudGlvbWV0ZXJcbiAgICAgICAgICAgICAgbGFiZWw9XCJQcsSFZCBFbWlzamkgKEEpXCJcbiAgICAgICAgICAgICAgdW5pdD1cIkFcIlxuICAgICAgICAgICAgICBtaW49ezEuMH1cbiAgICAgICAgICAgICAgbWF4PXs1MC4wfVxuICAgICAgICAgICAgICBzdGVwPXswLjJ9XG4gICAgICAgICAgICAgIHZhbHVlPXt0ZWxlbWV0cnkucXVhbnR1bUN1cnJlbnRBfVxuICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e0RFRkFVTFRfVEVMRU1FVFJZLnF1YW50dW1DdXJyZW50QX1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyh2KSA9PiB1cGRhdGVQYXJhbSgncXVhbnR1bUN1cnJlbnRBJywgdil9XG4gICAgICAgICAgICAgIGFjY2VudENvbG9yPVwiYW1iZXJcIlxuICAgICAgICAgICAgICBkZXNjcmlwdGlvbj1cIk5hdMSZxbxlbmllIHN1YmF0b21vd2VnbyBzdHJ1bWllbmlhXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8Um90YXJ5UG90ZW50aW9tZXRlclxuICAgICAgICAgICAgICBsYWJlbD1cIlByemVzdW5pxJljaWUgRmF6eSAowrApXCJcbiAgICAgICAgICAgICAgdW5pdD1cIsKwXCJcbiAgICAgICAgICAgICAgbWluPXswLjB9XG4gICAgICAgICAgICAgIG1heD17MzYwLjB9XG4gICAgICAgICAgICAgIHN0ZXA9ezEuMH1cbiAgICAgICAgICAgICAgZGVjaW1hbHM9ezB9XG4gICAgICAgICAgICAgIHZhbHVlPXt0ZWxlbWV0cnkucXVhbnR1bVBoYXNlRGVnfVxuICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e0RFRkFVTFRfVEVMRU1FVFJZLnF1YW50dW1QaGFzZURlZ31cbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyh2KSA9PiB1cGRhdGVQYXJhbSgncXVhbnR1bVBoYXNlRGVnJywgdil9XG4gICAgICAgICAgICAgIGFjY2VudENvbG9yPVwiaW5kaWdvXCJcbiAgICAgICAgICAgICAgZGVzY3JpcHRpb249XCJLxIV0IHN5bmNocm9uaXphY2ppIGhhcm1vbmljem55Y2hcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdLCJtYXBwaW5ncyI6IkFBdUlRO0FBdklSLFNBQWdCLGdCQUFnQjtBQUNoQztBQUFBLEVBQ0U7QUFBQSxFQUFLO0FBQUEsRUFBTztBQUFBLEVBQWM7QUFBQSxFQUFhO0FBQUEsRUFDVDtBQUFBLEVBQU87QUFBQSxFQUFtQjtBQUFBLE9BQ25EO0FBQ1AsU0FBUywyQkFBMkI7QUFpQ3BDLE1BQU0sb0JBQTBDO0FBQUEsRUFDOUMsZ0JBQWdCO0FBQUEsRUFDaEIsZ0JBQWdCO0FBQUEsRUFDaEIsbUJBQW1CO0FBQUEsRUFDbkIsY0FBYztBQUFBLEVBRWQsZUFBZTtBQUFBLEVBQ2YsZUFBZTtBQUFBLEVBQ2YsbUJBQW1CO0FBQUEsRUFFbkIsY0FBYztBQUFBLEVBQ2Qsa0JBQWtCO0FBQUEsRUFDbEIsaUJBQWlCO0FBQUEsRUFDakIsWUFBWTtBQUFBLEVBRVosa0JBQWtCO0FBQUEsRUFDbEIsaUJBQWlCO0FBQUEsRUFDakIsaUJBQWlCO0FBQUEsRUFDakIsY0FBYztBQUFBLEVBRWQsZ0JBQWdCO0FBQUEsRUFDaEIsa0JBQWtCO0FBQUEsRUFDbEIsaUJBQWlCO0FBQUEsRUFDakIsaUJBQWlCO0FBQ25CO0FBRU8sYUFBTSw4QkFBNkUsQ0FBQyxFQUFFLFNBQVMsTUFBTTtBQUMxRyxRQUFNLENBQUMsV0FBVyxZQUFZLElBQUksU0FBK0IsaUJBQWlCO0FBRWxGLFFBQU0sY0FBYyxDQUF1QyxLQUFRLFFBQWlDO0FBQ2xHLGlCQUFhLFdBQVMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxFQUFFO0FBQUEsRUFDaEQ7QUFHQSxRQUFNLGVBQWdCLFVBQVUsaUJBQWlCLFVBQVUsaUJBQWtCO0FBQzdFLFFBQU0sY0FBYyxVQUFVLGdCQUFnQixVQUFVO0FBQ3hELFFBQU0sYUFBYSxVQUFVLGVBQWUsVUFBVTtBQUN0RCxRQUFNLGlCQUFpQixVQUFVLG1CQUFtQixVQUFVO0FBQzlELFFBQU0saUJBQWlCLFVBQVUsbUJBQW1CLFVBQVU7QUFFOUQsUUFBTSx5QkFBeUIsZUFBZ0IsY0FBYyxNQUFXLGFBQWMsaUJBQWlCLE1BQVMsaUJBQWlCO0FBRWpJLFFBQU0scUJBQXFCLE1BQU07QUFDL0IsaUJBQWEsaUJBQWlCO0FBQzlCLGFBQVMsb0dBQW9HO0FBQUEsRUFDL0c7QUFFQSxRQUFNLGNBQWMsQ0FBQyxTQUFnRjtBQUNuRyxRQUFJLFNBQVMsWUFBWTtBQUN2QixtQkFBYTtBQUFBLFFBQ1gsR0FBRztBQUFBLFFBQ0gsZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCO0FBQUEsUUFDaEIsbUJBQW1CO0FBQUEsUUFDbkIsY0FBYztBQUFBLFFBQ2QsY0FBYztBQUFBLFFBQ2Qsa0JBQWtCO0FBQUEsTUFDcEIsQ0FBQztBQUNELGVBQVMsOEZBQThGO0FBQUEsSUFDekcsV0FBVyxTQUFTLGdCQUFnQjtBQUNsQyxtQkFBYTtBQUFBLFFBQ1gsR0FBRztBQUFBLFFBQ0gsa0JBQWtCO0FBQUEsUUFDbEIsaUJBQWlCO0FBQUEsUUFDakIsaUJBQWlCO0FBQUEsUUFDakIsY0FBYztBQUFBLE1BQ2hCLENBQUM7QUFDRCxlQUFTLHlGQUF5RjtBQUFBLElBQ3BHLFdBQVcsU0FBUyxxQkFBcUI7QUFDdkMsbUJBQWE7QUFBQSxRQUNYLEdBQUc7QUFBQSxRQUNILGdCQUFnQjtBQUFBLFFBQ2hCLGtCQUFrQjtBQUFBLFFBQ2xCLGlCQUFpQjtBQUFBLFFBQ2pCLGlCQUFpQjtBQUFBLE1BQ25CLENBQUM7QUFDRCxlQUFTLDBGQUEwRjtBQUFBLElBQ3JHLFdBQVcsU0FBUyxtQkFBbUI7QUFDckMsbUJBQWE7QUFBQSxRQUNYLEdBQUc7QUFBQSxRQUNILGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBLFFBQ2hCLGNBQWM7QUFBQSxRQUNkLGtCQUFrQjtBQUFBLFFBQ2xCLGtCQUFrQjtBQUFBLFFBQ2xCLGlCQUFpQjtBQUFBLE1BQ25CLENBQUM7QUFDRCxlQUFTLDRGQUE0RjtBQUFBLElBQ3ZHO0FBQUEsRUFDRjtBQUVBLFNBQ0UsdUJBQUMsU0FBSSxXQUFVLDZDQUdiO0FBQUEsMkJBQUMsU0FBSSxXQUFVLDBMQUViO0FBQUE7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLFdBQVU7QUFBQSxVQUNWLE9BQU87QUFBQSxZQUNMLFlBQVk7QUFBQSxVQUNkO0FBQUE7QUFBQSxRQUpGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUtBO0FBQUEsTUFFQSx1QkFBQyxTQUFJLFdBQVUsNkNBQ2I7QUFBQSwrQkFBQyxTQUFJLFdBQVUseUlBQ2IsaUNBQUMsU0FBTSxXQUFVLGFBQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBMkIsS0FEN0I7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUVBO0FBQUEsUUFDQSx1QkFBQyxTQUNDO0FBQUEsaUNBQUMsU0FBSSxXQUFVLHVDQUNiO0FBQUEsbUNBQUMsUUFBRyxXQUFVLGdGQUErRSx1RUFBN0Y7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFFQTtBQUFBLFlBQ0EsdUJBQUMsVUFBSyxXQUFVLGtJQUFpSSxrQ0FBako7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFFQTtBQUFBLGVBTkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFPQTtBQUFBLFVBQ0EsdUJBQUMsT0FBRSxXQUFVLG1EQUFrRCxxTEFBL0Q7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFFQTtBQUFBLGFBWEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQVlBO0FBQUEsV0FoQkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQWlCQTtBQUFBLE1BR0EsdUJBQUMsU0FBSSxXQUFVLG1EQUNiO0FBQUE7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUNDLFNBQVMsTUFBTSxZQUFZLFVBQVU7QUFBQSxZQUNyQyxXQUFVO0FBQUEsWUFDVixPQUFNO0FBQUEsWUFFTjtBQUFBLHFDQUFDLFNBQU0sV0FBVSxrQ0FBakI7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBZ0Q7QUFBQSxjQUNoRCx1QkFBQyxVQUFLLHdCQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQWM7QUFBQTtBQUFBO0FBQUEsVUFOaEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBT0E7QUFBQSxRQUVBO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFDQyxTQUFTLE1BQU0sWUFBWSxjQUFjO0FBQUEsWUFDekMsV0FBVTtBQUFBLFlBQ1YsT0FBTTtBQUFBLFlBRU47QUFBQSxxQ0FBQyxlQUFZLFdBQVUsZ0NBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQW9EO0FBQUEsY0FDcEQsdUJBQUMsVUFBSywwQkFBTjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUFnQjtBQUFBO0FBQUE7QUFBQSxVQU5sQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFPQTtBQUFBLFFBRUE7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUNDLFNBQVMsTUFBTSxZQUFZLG1CQUFtQjtBQUFBLFlBQzlDLFdBQVU7QUFBQSxZQUNWLE9BQU07QUFBQSxZQUVOO0FBQUEscUNBQUMsU0FBTSxXQUFVLGlDQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUErQztBQUFBLGNBQy9DLHVCQUFDLFVBQUsseUJBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBZTtBQUFBO0FBQUE7QUFBQSxVQU5qQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFPQTtBQUFBLFFBRUE7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUNDLFNBQVM7QUFBQSxZQUNULFdBQVU7QUFBQSxZQUNWLE9BQU07QUFBQSxZQUVOO0FBQUEscUNBQUMsYUFBVSxXQUFVLGdDQUFyQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUFrRDtBQUFBLGNBQ2xELHVCQUFDLFVBQUssMEJBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBZ0I7QUFBQTtBQUFBO0FBQUEsVUFObEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBT0E7QUFBQSxXQW5DRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBb0NBO0FBQUEsU0FqRUY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQWtFQTtBQUFBLElBR0EsdUJBQUMsU0FBSSxXQUFVLG1IQUNiO0FBQUEsNkJBQUMsU0FBSSxXQUFVLGdFQUNiO0FBQUEsK0JBQUMsU0FBSSxXQUFVLHdDQUF1QyxpQ0FBdEQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUF1RTtBQUFBLFFBQ3ZFLHVCQUFDLFNBQUksV0FBVSw4Q0FBOEM7QUFBQSx1QkFBYSxRQUFRLENBQUM7QUFBQSxVQUFFO0FBQUEsYUFBckY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUF3RjtBQUFBLFFBQ3hGLHVCQUFDLFNBQUksV0FBVSw2QkFBNkI7QUFBQSxvQkFBVSxlQUFlLFFBQVEsQ0FBQztBQUFBLFVBQUU7QUFBQSxVQUFPLFVBQVUsZUFBZSxRQUFRLENBQUM7QUFBQSxVQUFFO0FBQUEsYUFBM0g7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUE2SDtBQUFBLFdBSC9IO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFJQTtBQUFBLE1BRUEsdUJBQUMsU0FBSSxXQUFVLDZEQUNiO0FBQUEsK0JBQUMsU0FBSSxXQUFVLHdDQUF1QywrQkFBdEQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUFxRTtBQUFBLFFBQ3JFLHVCQUFDLFNBQUksV0FBVSwyQ0FBMkM7QUFBQSxzQkFBWSxRQUFRLENBQUM7QUFBQSxVQUFFO0FBQUEsYUFBakY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUFtRjtBQUFBLFFBQ25GLHVCQUFDLFNBQUksV0FBVSw2QkFBNkI7QUFBQSxvQkFBVSxjQUFjLFFBQVEsQ0FBQztBQUFBLFVBQUU7QUFBQSxVQUFNLFVBQVUsY0FBYyxRQUFRLENBQUM7QUFBQSxVQUFFO0FBQUEsYUFBeEg7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUEwSDtBQUFBLFdBSDVIO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFJQTtBQUFBLE1BRUEsdUJBQUMsU0FBSSxXQUFVLDZEQUNiO0FBQUEsK0JBQUMsU0FBSSxXQUFVLHdDQUF1Qyw2QkFBdEQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUFtRTtBQUFBLFFBQ25FLHVCQUFDLFNBQUksV0FBVSwyQ0FBMkM7QUFBQSxxQkFBVyxRQUFRLENBQUM7QUFBQSxVQUFFO0FBQUEsYUFBaEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUFtRjtBQUFBLFFBQ25GLHVCQUFDLFNBQUksV0FBVSw2QkFBNkI7QUFBQSxvQkFBVSxhQUFhLFFBQVEsQ0FBQztBQUFBLFVBQUU7QUFBQSxVQUFPLFVBQVUsaUJBQWlCLFFBQVEsQ0FBQztBQUFBLFVBQUU7QUFBQSxhQUEzSDtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQThIO0FBQUEsV0FIaEk7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUlBO0FBQUEsTUFFQSx1QkFBQyxTQUFJLFdBQVUsOERBQ2I7QUFBQSwrQkFBQyxTQUFJLFdBQVUsd0NBQXVDLGtDQUF0RDtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQXdFO0FBQUEsUUFDeEUsdUJBQUMsU0FBSSxXQUFVLDRDQUE0QztBQUFBLHlCQUFlLFFBQVEsQ0FBQztBQUFBLFVBQUU7QUFBQSxhQUFyRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQXdGO0FBQUEsUUFDeEYsdUJBQUMsU0FBSSxXQUFVLDZCQUE2QjtBQUFBLG9CQUFVLGlCQUFpQixRQUFRLENBQUM7QUFBQSxVQUFFO0FBQUEsVUFBTyxVQUFVO0FBQUEsVUFBYTtBQUFBLGFBQWhIO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBdUg7QUFBQSxXQUh6SDtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBSUE7QUFBQSxNQUVBLHVCQUFDLFNBQUksV0FBVSx3RkFDYjtBQUFBLCtCQUFDLFNBQUksV0FBVSx3Q0FBdUMsc0NBQXREO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBNEU7QUFBQSxRQUM1RSx1QkFBQyxTQUFJLFdBQVUsNkNBQTZDO0FBQUEseUJBQWUsUUFBUSxDQUFDO0FBQUEsVUFBRTtBQUFBLGFBQXRGO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBeUY7QUFBQSxRQUN6Rix1QkFBQyxTQUFJLFdBQVUsNkJBQTZCO0FBQUEsb0JBQVUsZUFBZSxRQUFRLENBQUM7QUFBQSxVQUFFO0FBQUEsVUFBUSxVQUFVO0FBQUEsVUFBZ0I7QUFBQSxhQUFsSDtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQW1IO0FBQUEsV0FIckg7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUlBO0FBQUEsU0E3QkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQThCQTtBQUFBLElBR0EsdUJBQUMsU0FBSSxXQUFVLGFBS2I7QUFBQSw2QkFBQyxTQUFJLFdBQVUsb0ZBQ2I7QUFBQSwrQkFBQyxTQUFJLFdBQVUsaUdBQ2I7QUFBQSxpQ0FBQyxTQUFJLFdBQVUsMkJBQ2I7QUFBQSxtQ0FBQyxTQUFJLFdBQVUseUZBQ2IsaUNBQUMsU0FBTSxXQUFVLGFBQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQTJCLEtBRDdCO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRUE7QUFBQSxZQUNBLHVCQUFDLFNBQ0M7QUFBQSxxQ0FBQyxTQUFJLFdBQVUsMkJBQ2I7QUFBQSx1Q0FBQyxRQUFHLFdBQVUsb0VBQW1FLDREQUFqRjtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUVBO0FBQUEsZ0JBQ0EsdUJBQUMsVUFBSyxXQUFVLHVIQUFzSCxtQ0FBdEk7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFFQTtBQUFBLG1CQU5GO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBT0E7QUFBQSxjQUNBLHVCQUFDLFNBQUksV0FBVSw2RUFDYjtBQUFBLHVDQUFDLFVBQUs7QUFBQTtBQUFBLGtCQUFhLHVCQUFDLFlBQU8sV0FBVSw4QkFBNkIsMENBQS9DO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBQXlFO0FBQUEscUJBQTVGO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQXFHO0FBQUEsZ0JBQ3JHLHVCQUFDLFVBQUssaUJBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBTztBQUFBLGdCQUNQLHVCQUFDLFVBQUs7QUFBQTtBQUFBLGtCQUFZLHVCQUFDLFlBQU8sV0FBVSx3QkFBd0I7QUFBQSxpQ0FBYSxRQUFRLENBQUM7QUFBQSxvQkFBRTtBQUFBLHVCQUFsRTtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUFxRTtBQUFBLHFCQUF2RjtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUFnRztBQUFBLG1CQUhsRztBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUlBO0FBQUEsaUJBYkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFjQTtBQUFBLGVBbEJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBbUJBO0FBQUEsVUFHQSx1QkFBQyxTQUFJLFdBQVUsNkNBQ2I7QUFBQSxtQ0FBQyxTQUFJLFdBQVUsNkRBQ2I7QUFBQSxxQ0FBQyxVQUFLLFdBQVUsb0NBQW1DLHdCQUFuRDtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUEyRDtBQUFBLGNBQzNELHVCQUFDLFVBQUssV0FBVSwrQkFBK0I7QUFBQSwwQkFBVSxlQUFlLFFBQVEsQ0FBQztBQUFBLGdCQUFFO0FBQUEsbUJBQW5GO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQXNGO0FBQUEsaUJBRnhGO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBR0E7QUFBQSxZQUNBLHVCQUFDLFNBQUksV0FBVSw2REFDYjtBQUFBLHFDQUFDLFVBQUssV0FBVSxvQ0FBbUMsb0JBQW5EO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQXVEO0FBQUEsY0FDdkQsdUJBQUMsVUFBSyxXQUFVLDZCQUE2QjtBQUFBLDBCQUFVLGVBQWUsUUFBUSxDQUFDO0FBQUEsZ0JBQUU7QUFBQSxtQkFBakY7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBbUY7QUFBQSxpQkFGckY7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFHQTtBQUFBLFlBQ0EsdUJBQUMsU0FBSSxXQUFVLDZEQUNiO0FBQUEscUNBQUMsVUFBSyxXQUFVLG9DQUFtQyw2QkFBbkQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBZ0U7QUFBQSxjQUNoRSx1QkFBQyxVQUFLLFdBQVUsNEJBQTRCO0FBQUEsMEJBQVUsa0JBQWtCLFFBQVEsQ0FBQztBQUFBLGdCQUFFO0FBQUEsbUJBQW5GO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQXVGO0FBQUEsaUJBRnpGO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBR0E7QUFBQSxlQVpGO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBYUE7QUFBQSxhQXBDRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBcUNBO0FBQUEsUUFHQSx1QkFBQyxTQUFJLFdBQVUseUNBQ2I7QUFBQTtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsT0FBTTtBQUFBLGNBQ04sTUFBSztBQUFBLGNBQ0wsS0FBSztBQUFBLGNBQ0wsS0FBSztBQUFBLGNBQ0wsTUFBTTtBQUFBLGNBQ04sT0FBTyxVQUFVO0FBQUEsY0FDakIsY0FBYyxrQkFBa0I7QUFBQSxjQUNoQyxVQUFVLENBQUMsTUFBTSxZQUFZLGtCQUFrQixDQUFDO0FBQUEsY0FDaEQsYUFBWTtBQUFBLGNBQ1osYUFBWTtBQUFBO0FBQUEsWUFWZDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFXQTtBQUFBLFVBQ0E7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLE9BQU07QUFBQSxjQUNOLE1BQUs7QUFBQSxjQUNMLEtBQUs7QUFBQSxjQUNMLEtBQUs7QUFBQSxjQUNMLE1BQU07QUFBQSxjQUNOLFVBQVU7QUFBQSxjQUNWLE9BQU8sVUFBVTtBQUFBLGNBQ2pCLGNBQWMsa0JBQWtCO0FBQUEsY0FDaEMsVUFBVSxDQUFDLE1BQU0sWUFBWSxrQkFBa0IsQ0FBQztBQUFBLGNBQ2hELGFBQVk7QUFBQSxjQUNaLGFBQVk7QUFBQTtBQUFBLFlBWGQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBWUE7QUFBQSxVQUNBO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FDQyxPQUFNO0FBQUEsY0FDTixNQUFLO0FBQUEsY0FDTCxLQUFLO0FBQUEsY0FDTCxLQUFLO0FBQUEsY0FDTCxNQUFNO0FBQUEsY0FDTixPQUFPLFVBQVU7QUFBQSxjQUNqQixjQUFjLGtCQUFrQjtBQUFBLGNBQ2hDLFVBQVUsQ0FBQyxNQUFNLFlBQVkscUJBQXFCLENBQUM7QUFBQSxjQUNuRCxhQUFZO0FBQUEsY0FDWixhQUFZO0FBQUE7QUFBQSxZQVZkO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQVdBO0FBQUEsVUFDQTtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsT0FBTTtBQUFBLGNBQ04sTUFBSztBQUFBLGNBQ0wsS0FBSztBQUFBLGNBQ0wsS0FBSztBQUFBLGNBQ0wsTUFBTTtBQUFBLGNBQ04sT0FBTyxVQUFVO0FBQUEsY0FDakIsY0FBYyxrQkFBa0I7QUFBQSxjQUNoQyxVQUFVLENBQUMsTUFBTSxZQUFZLGdCQUFnQixDQUFDO0FBQUEsY0FDOUMsYUFBWTtBQUFBLGNBQ1osYUFBWTtBQUFBO0FBQUEsWUFWZDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFXQTtBQUFBLGFBakRGO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFrREE7QUFBQSxXQTNGRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBNEZBO0FBQUEsTUFLQSx1QkFBQyxTQUFJLFdBQVUsaUZBQ2I7QUFBQSwrQkFBQyxTQUFJLFdBQVUsaUdBQ2I7QUFBQSxpQ0FBQyxTQUFJLFdBQVUsMkJBQ2I7QUFBQSxtQ0FBQyxTQUFJLFdBQVUsbUZBQ2IsaUNBQUMsZ0JBQWEsV0FBVSxhQUF4QjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUFrQyxLQURwQztBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUVBO0FBQUEsWUFDQSx1QkFBQyxTQUNDO0FBQUEscUNBQUMsU0FBSSxXQUFVLDJCQUNiO0FBQUEsdUNBQUMsUUFBRyxXQUFVLG9FQUFtRSw4REFBakY7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFFQTtBQUFBLGdCQUNBLHVCQUFDLFVBQUssV0FBVSw4R0FBNkcsbUNBQTdIO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBRUE7QUFBQSxtQkFORjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQU9BO0FBQUEsY0FDQSx1QkFBQyxTQUFJLFdBQVUsNkVBQ2I7QUFBQSx1Q0FBQyxVQUFLO0FBQUE7QUFBQSxrQkFBYSx1QkFBQyxZQUFPLFdBQVUsMkJBQTBCLCtEQUE1QztBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUEyRjtBQUFBLHFCQUE5RztBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUF1SDtBQUFBLGdCQUN2SCx1QkFBQyxVQUFLLGlCQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQU87QUFBQSxnQkFDUCx1QkFBQyxVQUFLO0FBQUE7QUFBQSxrQkFBcUIsdUJBQUMsWUFBTyxXQUFVLHdCQUF3QjtBQUFBLGdDQUFZLFFBQVEsQ0FBQztBQUFBLG9CQUFFO0FBQUEsdUJBQWpFO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBQW1FO0FBQUEscUJBQTlGO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQXVHO0FBQUEsbUJBSHpHO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBSUE7QUFBQSxpQkFiRjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQWNBO0FBQUEsZUFsQkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFtQkE7QUFBQSxVQUVBLHVCQUFDLFNBQUksV0FBVSw2Q0FDYjtBQUFBLG1DQUFDLFNBQUksV0FBVSw2REFDYjtBQUFBLHFDQUFDLFVBQUssV0FBVSxvQ0FBbUMsMkJBQW5EO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQThEO0FBQUEsY0FDOUQsdUJBQUMsVUFBSyxXQUFVLDRCQUE0QjtBQUFBLDBCQUFVLGNBQWMsUUFBUSxDQUFDO0FBQUEsZ0JBQUU7QUFBQSxtQkFBL0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBaUY7QUFBQSxpQkFGbkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFHQTtBQUFBLFlBQ0EsdUJBQUMsU0FBSSxXQUFVLDZEQUNiO0FBQUEscUNBQUMsVUFBSyxXQUFVLG9DQUFtQywrQkFBbkQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBa0U7QUFBQSxjQUNsRSx1QkFBQyxVQUFLLFdBQVUsNkJBQTZCO0FBQUEsMEJBQVUsY0FBYyxRQUFRLENBQUM7QUFBQSxnQkFBRTtBQUFBLG1CQUFoRjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUFrRjtBQUFBLGlCQUZwRjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUdBO0FBQUEsWUFDQSx1QkFBQyxTQUFJLFdBQVUsNkRBQ2I7QUFBQSxxQ0FBQyxVQUFLLFdBQVUsb0NBQW1DLGdDQUFuRDtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUFtRTtBQUFBLGNBQ25FLHVCQUFDLFVBQUssV0FBVSw0QkFBMkIsdUJBQTNDO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQWtEO0FBQUEsaUJBRnBEO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBR0E7QUFBQSxlQVpGO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBYUE7QUFBQSxhQW5DRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBb0NBO0FBQUEsUUFFQSx1QkFBQyxTQUFJLFdBQVUseUNBQ2I7QUFBQTtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsT0FBTTtBQUFBLGNBQ04sTUFBSztBQUFBLGNBQ0wsS0FBSztBQUFBLGNBQ0wsS0FBSztBQUFBLGNBQ0wsTUFBTTtBQUFBLGNBQ04sVUFBVTtBQUFBLGNBQ1YsT0FBTyxVQUFVO0FBQUEsY0FDakIsY0FBYyxrQkFBa0I7QUFBQSxjQUNoQyxVQUFVLENBQUMsTUFBTSxZQUFZLGlCQUFpQixDQUFDO0FBQUEsY0FDL0MsYUFBWTtBQUFBLGNBQ1osYUFBWTtBQUFBO0FBQUEsWUFYZDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFZQTtBQUFBLFVBQ0E7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLE9BQU07QUFBQSxjQUNOLE1BQUs7QUFBQSxjQUNMLEtBQUs7QUFBQSxjQUNMLEtBQUs7QUFBQSxjQUNMLE1BQU07QUFBQSxjQUNOLFVBQVU7QUFBQSxjQUNWLE9BQU8sVUFBVTtBQUFBLGNBQ2pCLGNBQWMsa0JBQWtCO0FBQUEsY0FDaEMsVUFBVSxDQUFDLE1BQU0sWUFBWSxpQkFBaUIsQ0FBQztBQUFBLGNBQy9DLGFBQVk7QUFBQSxjQUNaLGFBQVk7QUFBQTtBQUFBLFlBWGQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBWUE7QUFBQSxVQUNBO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FDQyxPQUFNO0FBQUEsY0FDTixNQUFLO0FBQUEsY0FDTCxLQUFLO0FBQUEsY0FDTCxLQUFLO0FBQUEsY0FDTCxNQUFNO0FBQUEsY0FDTixVQUFVO0FBQUEsY0FDVixPQUFPLFVBQVU7QUFBQSxjQUNqQixjQUFjLGtCQUFrQjtBQUFBLGNBQ2hDLFVBQVUsQ0FBQyxNQUFNLFlBQVkscUJBQXFCLENBQUM7QUFBQSxjQUNuRCxhQUFZO0FBQUEsY0FDWixhQUFZO0FBQUE7QUFBQSxZQVhkO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQVlBO0FBQUEsYUF2Q0Y7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQXdDQTtBQUFBLFdBL0VGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFnRkE7QUFBQSxNQUtBLHVCQUFDLFNBQUksV0FBVSxpRkFDYjtBQUFBLCtCQUFDLFNBQUksV0FBVSxpR0FDYjtBQUFBLGlDQUFDLFNBQUksV0FBVSwyQkFDYjtBQUFBLG1DQUFDLFNBQUksV0FBVSxtRkFDYixpQ0FBQyxPQUFJLFdBQVUsYUFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUF5QixLQUQzQjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUVBO0FBQUEsWUFDQSx1QkFBQyxTQUNDO0FBQUEscUNBQUMsU0FBSSxXQUFVLDJCQUNiO0FBQUEsdUNBQUMsUUFBRyxXQUFVLG9FQUFtRSxvRUFBakY7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFFQTtBQUFBLGdCQUNBLHVCQUFDLFVBQUssV0FBVSw4R0FBNkcsbUNBQTdIO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBRUE7QUFBQSxtQkFORjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQU9BO0FBQUEsY0FDQSx1QkFBQyxTQUFJLFdBQVUsNkVBQ2I7QUFBQSx1Q0FBQyxVQUFLO0FBQUE7QUFBQSxrQkFBYSx1QkFBQyxZQUFPLFdBQVUsMkJBQTBCLHFFQUE1QztBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUFpRztBQUFBLHFCQUFwSDtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUE2SDtBQUFBLGdCQUM3SCx1QkFBQyxVQUFLLGlCQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQU87QUFBQSxnQkFDUCx1QkFBQyxVQUFLO0FBQUE7QUFBQSxrQkFBZSx1QkFBQyxZQUFPLFdBQVUsd0JBQXdCO0FBQUEsK0JBQVcsUUFBUSxDQUFDO0FBQUEsb0JBQUU7QUFBQSx1QkFBaEU7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFBbUU7QUFBQSxxQkFBeEY7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBaUc7QUFBQSxtQkFIbkc7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFJQTtBQUFBLGlCQWJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBY0E7QUFBQSxlQWxCRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQW1CQTtBQUFBLFVBRUEsdUJBQUMsU0FBSSxXQUFVLDZDQUNiO0FBQUEsbUNBQUMsU0FBSSxXQUFVLDZEQUNiO0FBQUEscUNBQUMsVUFBSyxXQUFVLG9DQUFtQyw2QkFBbkQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBZ0U7QUFBQSxjQUNoRSx1QkFBQyxVQUFLLFdBQVUsNEJBQTRCO0FBQUEsMEJBQVUsYUFBYSxRQUFRLENBQUM7QUFBQSxnQkFBRTtBQUFBLG1CQUE5RTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUFpRjtBQUFBLGlCQUZuRjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUdBO0FBQUEsWUFDQSx1QkFBQyxTQUFJLFdBQVUsNkRBQ2I7QUFBQSxxQ0FBQyxVQUFLLFdBQVUsb0NBQW1DLDhCQUFuRDtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUFpRTtBQUFBLGNBQ2pFLHVCQUFDLFVBQUssV0FBVSw2QkFBNkI7QUFBQSwwQkFBVSxpQkFBaUIsUUFBUSxDQUFDO0FBQUEsZ0JBQUU7QUFBQSxtQkFBbkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBc0Y7QUFBQSxpQkFGeEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFHQTtBQUFBLFlBQ0EsdUJBQUMsU0FBSSxXQUFVLDZEQUNiO0FBQUEscUNBQUMsVUFBSyxXQUFVLG9DQUFtQyx3QkFBbkQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBMkQ7QUFBQSxjQUMzRCx1QkFBQyxVQUFLLFdBQVUsK0JBQStCO0FBQUEsMEJBQVUsZ0JBQWdCLFFBQVEsQ0FBQztBQUFBLGdCQUFFO0FBQUEsbUJBQXBGO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQXdGO0FBQUEsaUJBRjFGO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBR0E7QUFBQSxlQVpGO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBYUE7QUFBQSxhQW5DRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBb0NBO0FBQUEsUUFFQSx1QkFBQyxTQUFJLFdBQVUseUNBQ2I7QUFBQTtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsT0FBTTtBQUFBLGNBQ04sTUFBSztBQUFBLGNBQ0wsS0FBSztBQUFBLGNBQ0wsS0FBSztBQUFBLGNBQ0wsTUFBTTtBQUFBLGNBQ04sT0FBTyxVQUFVO0FBQUEsY0FDakIsY0FBYyxrQkFBa0I7QUFBQSxjQUNoQyxVQUFVLENBQUMsTUFBTSxZQUFZLGdCQUFnQixDQUFDO0FBQUEsY0FDOUMsYUFBWTtBQUFBLGNBQ1osYUFBWTtBQUFBO0FBQUEsWUFWZDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFXQTtBQUFBLFVBQ0E7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLE9BQU07QUFBQSxjQUNOLE1BQUs7QUFBQSxjQUNMLEtBQUs7QUFBQSxjQUNMLEtBQUs7QUFBQSxjQUNMLE1BQU07QUFBQSxjQUNOLE9BQU8sVUFBVTtBQUFBLGNBQ2pCLGNBQWMsa0JBQWtCO0FBQUEsY0FDaEMsVUFBVSxDQUFDLE1BQU0sWUFBWSxvQkFBb0IsQ0FBQztBQUFBLGNBQ2xELGFBQVk7QUFBQSxjQUNaLGFBQVk7QUFBQTtBQUFBLFlBVmQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBV0E7QUFBQSxVQUNBO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FDQyxPQUFNO0FBQUEsY0FDTixNQUFLO0FBQUEsY0FDTCxLQUFLO0FBQUEsY0FDTCxLQUFLO0FBQUEsY0FDTCxNQUFNO0FBQUEsY0FDTixVQUFVO0FBQUEsY0FDVixPQUFPLFVBQVU7QUFBQSxjQUNqQixjQUFjLGtCQUFrQjtBQUFBLGNBQ2hDLFVBQVUsQ0FBQyxNQUFNLFlBQVksbUJBQW1CLENBQUM7QUFBQSxjQUNqRCxhQUFZO0FBQUEsY0FDWixhQUFZO0FBQUE7QUFBQSxZQVhkO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQVlBO0FBQUEsVUFDQTtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsT0FBTTtBQUFBLGNBQ04sTUFBSztBQUFBLGNBQ0wsS0FBSztBQUFBLGNBQ0wsS0FBSztBQUFBLGNBQ0wsTUFBTTtBQUFBLGNBQ04sVUFBVTtBQUFBLGNBQ1YsT0FBTyxVQUFVO0FBQUEsY0FDakIsY0FBYyxrQkFBa0I7QUFBQSxjQUNoQyxVQUFVLENBQUMsTUFBTSxZQUFZLGNBQWMsQ0FBQztBQUFBLGNBQzVDLGFBQVk7QUFBQSxjQUNaLGFBQVk7QUFBQTtBQUFBLFlBWGQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBWUE7QUFBQSxhQWxERjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBbURBO0FBQUEsV0ExRkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQTJGQTtBQUFBLE1BS0EsdUJBQUMsU0FBSSxXQUFVLGtGQUNiO0FBQUEsK0JBQUMsU0FBSSxXQUFVLGlHQUNiO0FBQUEsaUNBQUMsU0FBSSxXQUFVLDJCQUNiO0FBQUEsbUNBQUMsU0FBSSxXQUFVLHFGQUNiLGlDQUFDLGVBQVksV0FBVSxhQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUFpQyxLQURuQztBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUVBO0FBQUEsWUFDQSx1QkFBQyxTQUNDO0FBQUEscUNBQUMsU0FBSSxXQUFVLDJCQUNiO0FBQUEsdUNBQUMsUUFBRyxXQUFVLG9FQUFtRSxpRUFBakY7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFFQTtBQUFBLGdCQUNBLHVCQUFDLFVBQUssV0FBVSxpSEFBZ0gsK0JBQWhJO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBRUE7QUFBQSxtQkFORjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQU9BO0FBQUEsY0FDQSx1QkFBQyxTQUFJLFdBQVUsNkVBQ2I7QUFBQSx1Q0FBQyxVQUFLO0FBQUE7QUFBQSxrQkFBYSx1QkFBQyxZQUFPLFdBQVUsNEJBQTJCLHFFQUE3QztBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUFrRztBQUFBLHFCQUFySDtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUE4SDtBQUFBLGdCQUM5SCx1QkFBQyxVQUFLLGlCQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQU87QUFBQSxnQkFDUCx1QkFBQyxVQUFLO0FBQUE7QUFBQSxrQkFBbUIsdUJBQUMsWUFBTyxXQUFVLHdCQUF3QjtBQUFBLG1DQUFlLFFBQVEsQ0FBQztBQUFBLG9CQUFFO0FBQUEsdUJBQXBFO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBQXVFO0FBQUEscUJBQWhHO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQXlHO0FBQUEsbUJBSDNHO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBSUE7QUFBQSxpQkFiRjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQWNBO0FBQUEsZUFsQkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFtQkE7QUFBQSxVQUVBLHVCQUFDLFNBQUksV0FBVSw2Q0FDYjtBQUFBLG1DQUFDLFNBQUksV0FBVSw2REFDYjtBQUFBLHFDQUFDLFVBQUssV0FBVSxvQ0FBbUMsK0JBQW5EO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQWtFO0FBQUEsY0FDbEUsdUJBQUMsVUFBSyxXQUFVLDZCQUE2QjtBQUFBLDBCQUFVLGlCQUFpQixRQUFRLENBQUM7QUFBQSxnQkFBRTtBQUFBLG1CQUFuRjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUFzRjtBQUFBLGlCQUZ4RjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUdBO0FBQUEsWUFDQSx1QkFBQyxTQUFJLFdBQVUsNkRBQ2I7QUFBQSxxQ0FBQyxVQUFLLFdBQVUsb0NBQW1DLGlDQUFuRDtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUFvRTtBQUFBLGNBQ3BFLHVCQUFDLFVBQUssV0FBVSwrQkFBK0I7QUFBQSwwQkFBVSxnQkFBZ0IsUUFBUSxDQUFDO0FBQUEsZ0JBQUU7QUFBQSxtQkFBcEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBc0Y7QUFBQSxpQkFGeEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFHQTtBQUFBLFlBQ0EsdUJBQUMsU0FBSSxXQUFVLDZEQUNiO0FBQUEscUNBQUMsVUFBSyxXQUFVLG9DQUFtQyxvQkFBbkQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBdUQ7QUFBQSxjQUN2RCx1QkFBQyxVQUFLLFdBQVUsNEJBQTRCO0FBQUEsMEJBQVUsZ0JBQWdCLFFBQVEsQ0FBQztBQUFBLGdCQUFFO0FBQUEsbUJBQWpGO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQXFGO0FBQUEsaUJBRnZGO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBR0E7QUFBQSxlQVpGO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBYUE7QUFBQSxhQW5DRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBb0NBO0FBQUEsUUFFQSx1QkFBQyxTQUFJLFdBQVUseUNBQ2I7QUFBQTtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsT0FBTTtBQUFBLGNBQ04sTUFBSztBQUFBLGNBQ0wsS0FBSztBQUFBLGNBQ0wsS0FBSztBQUFBLGNBQ0wsTUFBTTtBQUFBLGNBQ04sT0FBTyxVQUFVO0FBQUEsY0FDakIsY0FBYyxrQkFBa0I7QUFBQSxjQUNoQyxVQUFVLENBQUMsTUFBTSxZQUFZLG9CQUFvQixDQUFDO0FBQUEsY0FDbEQsYUFBWTtBQUFBLGNBQ1osYUFBWTtBQUFBO0FBQUEsWUFWZDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFXQTtBQUFBLFVBQ0E7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLE9BQU07QUFBQSxjQUNOLE1BQUs7QUFBQSxjQUNMLEtBQUs7QUFBQSxjQUNMLEtBQUs7QUFBQSxjQUNMLE1BQU07QUFBQSxjQUNOLFVBQVU7QUFBQSxjQUNWLE9BQU8sVUFBVTtBQUFBLGNBQ2pCLGNBQWMsa0JBQWtCO0FBQUEsY0FDaEMsVUFBVSxDQUFDLE1BQU0sWUFBWSxtQkFBbUIsQ0FBQztBQUFBLGNBQ2pELGFBQVk7QUFBQSxjQUNaLGFBQVk7QUFBQTtBQUFBLFlBWGQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBWUE7QUFBQSxVQUNBO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FDQyxPQUFNO0FBQUEsY0FDTixNQUFLO0FBQUEsY0FDTCxLQUFLO0FBQUEsY0FDTCxLQUFLO0FBQUEsY0FDTCxNQUFNO0FBQUEsY0FDTixVQUFVO0FBQUEsY0FDVixPQUFPLFVBQVU7QUFBQSxjQUNqQixjQUFjLGtCQUFrQjtBQUFBLGNBQ2hDLFVBQVUsQ0FBQyxNQUFNLFlBQVksbUJBQW1CLENBQUM7QUFBQSxjQUNqRCxhQUFZO0FBQUEsY0FDWixhQUFZO0FBQUE7QUFBQSxZQVhkO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQVlBO0FBQUEsVUFDQTtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsT0FBTTtBQUFBLGNBQ04sTUFBSztBQUFBLGNBQ0wsS0FBSztBQUFBLGNBQ0wsS0FBSztBQUFBLGNBQ0wsTUFBTTtBQUFBLGNBQ04sVUFBVTtBQUFBLGNBQ1YsT0FBTyxVQUFVO0FBQUEsY0FDakIsY0FBYyxrQkFBa0I7QUFBQSxjQUNoQyxVQUFVLENBQUMsTUFBTSxZQUFZLGdCQUFnQixDQUFDO0FBQUEsY0FDOUMsYUFBWTtBQUFBLGNBQ1osYUFBWTtBQUFBO0FBQUEsWUFYZDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFZQTtBQUFBLGFBbkRGO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFvREE7QUFBQSxXQTNGRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBNEZBO0FBQUEsTUFLQSx1QkFBQyxTQUFJLFdBQVUsbUZBQ2I7QUFBQSwrQkFBQyxTQUFJLFdBQVUsaUdBQ2I7QUFBQSxpQ0FBQyxTQUFJLFdBQVUsMkJBQ2I7QUFBQSxtQ0FBQyxTQUFJLFdBQVUsdUZBQ2IsaUNBQUMsU0FBTSxXQUFVLGFBQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQTJCLEtBRDdCO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRUE7QUFBQSxZQUNBLHVCQUFDLFNBQ0M7QUFBQSxxQ0FBQyxTQUFJLFdBQVUsMkJBQ2I7QUFBQSx1Q0FBQyxRQUFHLFdBQVUsb0VBQW1FLG1FQUFqRjtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUVBO0FBQUEsZ0JBQ0EsdUJBQUMsVUFBSyxXQUFVLG9IQUFtSCxxQ0FBbkk7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFFQTtBQUFBLG1CQU5GO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBT0E7QUFBQSxjQUNBLHVCQUFDLFNBQUksV0FBVSw2RUFDYjtBQUFBLHVDQUFDLFVBQUs7QUFBQTtBQUFBLGtCQUFhLHVCQUFDLFlBQU8sV0FBVSw2QkFBNEIsa0RBQTlDO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBQWdGO0FBQUEscUJBQW5HO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQTRHO0FBQUEsZ0JBQzVHLHVCQUFDLFVBQUssaUJBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBTztBQUFBLGdCQUNQLHVCQUFDLFVBQUs7QUFBQTtBQUFBLGtCQUFzQix1QkFBQyxZQUFPLFdBQVUsd0JBQXdCO0FBQUEsbUNBQWUsUUFBUSxDQUFDO0FBQUEsb0JBQUU7QUFBQSx1QkFBcEU7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFBdUU7QUFBQSxxQkFBbkc7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBNEc7QUFBQSxtQkFIOUc7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFJQTtBQUFBLGlCQWJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBY0E7QUFBQSxlQWxCRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQW1CQTtBQUFBLFVBRUEsdUJBQUMsU0FBSSxXQUFVLDZDQUNiO0FBQUEsbUNBQUMsU0FBSSxXQUFVLDZEQUNiO0FBQUEscUNBQUMsVUFBSyxXQUFVLG9DQUFtQyxtQ0FBbkQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBc0U7QUFBQSxjQUN0RSx1QkFBQyxVQUFLLFdBQVUsOEJBQThCO0FBQUEsMEJBQVUsZUFBZSxRQUFRLENBQUM7QUFBQSxnQkFBRTtBQUFBLG1CQUFsRjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUFzRjtBQUFBLGlCQUZ4RjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUdBO0FBQUEsWUFDQSx1QkFBQyxTQUFJLFdBQVUsNkRBQ2I7QUFBQSxxQ0FBQyxVQUFLLFdBQVUsb0NBQW1DLGtDQUFuRDtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUFxRTtBQUFBLGNBQ3JFLHVCQUFDLFVBQUssV0FBVSw0QkFBNEI7QUFBQSwwQkFBVSxpQkFBaUIsUUFBUSxDQUFDO0FBQUEsZ0JBQUU7QUFBQSxtQkFBbEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBcUY7QUFBQSxpQkFGdkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFHQTtBQUFBLFlBQ0EsdUJBQUMsU0FBSSxXQUFVLDZEQUNiO0FBQUEscUNBQUMsVUFBSyxXQUFVLG9DQUFtQywyQkFBbkQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBOEQ7QUFBQSxjQUM5RCx1QkFBQyxVQUFLLFdBQVUsNkJBQTZCO0FBQUEsMEJBQVUsZ0JBQWdCLFFBQVEsQ0FBQztBQUFBLGdCQUFFO0FBQUEsbUJBQWxGO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQW9GO0FBQUEsaUJBRnRGO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBR0E7QUFBQSxlQVpGO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBYUE7QUFBQSxhQW5DRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBb0NBO0FBQUEsUUFFQSx1QkFBQyxTQUFJLFdBQVUseUNBQ2I7QUFBQTtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsT0FBTTtBQUFBLGNBQ04sTUFBSztBQUFBLGNBQ0wsS0FBSztBQUFBLGNBQ0wsS0FBSztBQUFBLGNBQ0wsTUFBTTtBQUFBLGNBQ04sT0FBTyxVQUFVO0FBQUEsY0FDakIsY0FBYyxrQkFBa0I7QUFBQSxjQUNoQyxVQUFVLENBQUMsTUFBTSxZQUFZLGtCQUFrQixDQUFDO0FBQUEsY0FDaEQsYUFBWTtBQUFBLGNBQ1osYUFBWTtBQUFBO0FBQUEsWUFWZDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFXQTtBQUFBLFVBQ0E7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLE9BQU07QUFBQSxjQUNOLE1BQUs7QUFBQSxjQUNMLEtBQUs7QUFBQSxjQUNMLEtBQUs7QUFBQSxjQUNMLE1BQU07QUFBQSxjQUNOLE9BQU8sVUFBVTtBQUFBLGNBQ2pCLGNBQWMsa0JBQWtCO0FBQUEsY0FDaEMsVUFBVSxDQUFDLE1BQU0sWUFBWSxvQkFBb0IsQ0FBQztBQUFBLGNBQ2xELGFBQVk7QUFBQSxjQUNaLGFBQVk7QUFBQTtBQUFBLFlBVmQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBV0E7QUFBQSxVQUNBO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FDQyxPQUFNO0FBQUEsY0FDTixNQUFLO0FBQUEsY0FDTCxLQUFLO0FBQUEsY0FDTCxLQUFLO0FBQUEsY0FDTCxNQUFNO0FBQUEsY0FDTixPQUFPLFVBQVU7QUFBQSxjQUNqQixjQUFjLGtCQUFrQjtBQUFBLGNBQ2hDLFVBQVUsQ0FBQyxNQUFNLFlBQVksbUJBQW1CLENBQUM7QUFBQSxjQUNqRCxhQUFZO0FBQUEsY0FDWixhQUFZO0FBQUE7QUFBQSxZQVZkO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQVdBO0FBQUEsVUFDQTtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsT0FBTTtBQUFBLGNBQ04sTUFBSztBQUFBLGNBQ0wsS0FBSztBQUFBLGNBQ0wsS0FBSztBQUFBLGNBQ0wsTUFBTTtBQUFBLGNBQ04sVUFBVTtBQUFBLGNBQ1YsT0FBTyxVQUFVO0FBQUEsY0FDakIsY0FBYyxrQkFBa0I7QUFBQSxjQUNoQyxVQUFVLENBQUMsTUFBTSxZQUFZLG1CQUFtQixDQUFDO0FBQUEsY0FDakQsYUFBWTtBQUFBLGNBQ1osYUFBWTtBQUFBO0FBQUEsWUFYZDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFZQTtBQUFBLGFBakRGO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFrREE7QUFBQSxXQXpGRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBMEZBO0FBQUEsU0F0ZEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQXdkQTtBQUFBLE9BamtCRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBa2tCQTtBQUVKOyIsIm5hbWVzIjpbXX0=