import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"];
import {
  Cpu,
  Flame,
  Snowflake,
  Activity,
  ShieldCheck,
  Sliders,
  TrendingDown,
  Thermometer,
  CheckCircle2
} from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import { cpuThermalGovernorEngine } from "/sentinel-shield/src/utils/cpuThermalGovernorEngine.ts";
export const CpuThermalGovernorPanel = ({
  onNotify,
  isCompact = false
}) => {
  const [thermalState, setThermalState] = useState(() => cpuThermalGovernorEngine.getState());
  const [isCryoAnimating, setIsCryoAnimating] = useState(false);
  useEffect(() => {
    const unsub = cpuThermalGovernorEngine.subscribe((newState) => {
      setThermalState(newState);
    });
    return () => unsub();
  }, []);
  const handleCryoPulse = () => {
    setIsCryoAnimating(true);
    cpuThermalGovernorEngine.triggerCryoPulseCooldown("Ręczny Impuls Kriogeniczny Panelu Kontroli");
    if (onNotify) {
      onNotify("❄️ IMPULS KRIOGENICZNY: Zmniejszono temperaturę procesora o 25°C w ułamku sekundy!");
    }
    setTimeout(() => {
      setIsCryoAnimating(false);
    }, 1200);
  };
  const handleGovernorChange = (mode) => {
    cpuThermalGovernorEngine.setGovernorMode(mode);
    if (onNotify) {
      onNotify(`⚙️ Zmieniono profil zarządcy termicznego na: [${mode}]`);
    }
  };
  const handleSimulateMalwareHeatSpike = () => {
    cpuThermalGovernorEngine.simulateMalwareThermalSpike("Pętla Stealth Miner / CPU Burner");
    if (onNotify) {
      onNotify("🔥 Symulacja przeciążenia termicznego: Wykryto malware, strażnik automatycznie schłodził CPU!");
    }
  };
  const getTempColor = (temp) => {
    if (temp < 40) return { text: "text-cyan-400", bg: "bg-cyan-950/60", border: "border-cyan-500/40", bar: "bg-cyan-400" };
    if (temp < 60) return { text: "text-emerald-400", bg: "bg-emerald-950/60", border: "border-emerald-500/40", bar: "bg-emerald-400" };
    if (temp < 75) return { text: "text-yellow-400", bg: "bg-yellow-950/60", border: "border-yellow-500/40", bar: "bg-yellow-400" };
    if (temp < 88) return { text: "text-orange-400", bg: "bg-orange-950/60", border: "border-orange-500/40", bar: "bg-orange-400" };
    return { text: "text-rose-500", bg: "bg-rose-950/60", border: "border-rose-500/80", bar: "bg-rose-500" };
  };
  const currentTheme = getTempColor(thermalState.packageTempC);
  return /* @__PURE__ */ jsxDEV("div", { className: "w-full rounded-3xl bg-zinc-950/95 border-2 border-indigo-500/40 shadow-2xl p-4 sm:p-6 text-white space-y-6 relative overflow-hidden", children: [
    isCryoAnimating && /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-cyan-500/20 backdrop-blur-xs z-30 pointer-events-none flex items-center justify-center animate-in fade-in duration-200", children: /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-3xl bg-zinc-950/90 border-2 border-cyan-400 shadow-[0_0_30px_#06b6d4] flex items-center gap-3", children: [
      /* @__PURE__ */ jsxDEV(Snowflake, { className: "w-8 h-8 text-cyan-300 animate-spin" }, void 0, false, {
        fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
        lineNumber: 72,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-sm font-mono font-black text-white", children: "IMPULS KRIOGENICZNY AKTYWNY" }, void 0, false, {
          fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
          lineNumber: 74,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-mono text-cyan-300", children: "-24.5°C Zrzut Ciepła w 0 ms" }, void 0, false, {
          fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
          lineNumber: 75,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
        lineNumber: 73,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
      lineNumber: 71,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
      lineNumber: 70,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-zinc-800", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3.5", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-900 via-cyan-950 to-zinc-950 border-2 border-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-500/30 shrink-0", children: /* @__PURE__ */ jsxDEV(Cpu, { className: "w-6 h-6 text-indigo-300 animate-pulse" }, void 0, false, {
          fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
          lineNumber: 85,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
          lineNumber: 84,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxDEV("h2", { className: "text-base sm:text-lg font-black font-mono tracking-tight text-white uppercase flex items-center gap-2", children: /* @__PURE__ */ jsxDEV("span", { children: "Mechanizm Kontroli Temperatury CPU & SoC" }, void 0, false, {
              fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
              lineNumber: 90,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
              lineNumber: 89,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: `px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black border ${currentTheme.bg} ${currentTheme.border} ${currentTheme.text}`, children: thermalState.coolingStatus }, void 0, false, {
              fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
              lineNumber: 92,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded-full text-[10px] font-mono border bg-zinc-900 border-zinc-700 text-zinc-300", children: [
              "Wentylator: ",
              thermalState.fanSpeedRpm,
              " RPM"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
              lineNumber: 95,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
            lineNumber: 88,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-zinc-400 mt-0.5", children: "Aktywny zarządca termiczny, ochrona przed throttlingiem i kryogeniczne schładzanie rdzeni podczas intensywnych walk z malware." }, void 0, false, {
            fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
            lineNumber: 99,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
          lineNumber: 87,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
        lineNumber: 83,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleCryoPulse,
            className: "px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 via-teal-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-mono font-black uppercase flex items-center gap-2 border border-cyan-300 shadow-[0_0_15px_#06b6d4] active:scale-95 transition-all cursor-pointer",
            children: [
              /* @__PURE__ */ jsxDEV(Snowflake, { className: "w-4 h-4 text-cyan-200 animate-spin" }, void 0, false, {
                fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
                lineNumber: 111,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Impuls Kriogeniczny (-25°C)" }, void 0, false, {
                fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
                lineNumber: 112,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
            lineNumber: 107,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleSimulateMalwareHeatSpike,
            className: "px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-orange-500/40 text-orange-300 text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer",
            title: "Symuluj przeciążenie termiczne przez malware",
            children: [
              /* @__PURE__ */ jsxDEV(Flame, { className: "w-3.5 h-3.5 text-orange-400" }, void 0, false, {
                fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
                lineNumber: 120,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Symuluj Atak Termiczny" }, void 0, false, {
                fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
                lineNumber: 121,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
            lineNumber: 115,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
        lineNumber: 106,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
      lineNumber: 82,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] font-mono text-zinc-400 uppercase", children: "Temperatura Pakietu CPU" }, void 0, false, {
          fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
          lineNumber: 129,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: `text-2xl font-black font-mono flex items-center gap-2 mt-0.5 ${currentTheme.text}`, children: [
          /* @__PURE__ */ jsxDEV(Thermometer, { className: "w-5 h-5" }, void 0, false, {
            fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
            lineNumber: 131,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: [
            thermalState.packageTempC,
            "°C"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
            lineNumber: 132,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
          lineNumber: 130,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-zinc-400 font-mono mt-0.5", children: [
          "TjMax Limit: ",
          thermalState.tjMaxC,
          "°C"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
          lineNumber: 134,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
        lineNumber: 128,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] font-mono text-zinc-400 uppercase", children: "Zapas Termiczny (Headroom)" }, void 0, false, {
          fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
          lineNumber: 138,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-2xl font-black font-mono text-emerald-400 flex items-center gap-2 mt-0.5", children: [
          /* @__PURE__ */ jsxDEV(TrendingDown, { className: "w-5 h-5 text-emerald-500" }, void 0, false, {
            fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
            lineNumber: 140,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: [
            "+",
            thermalState.thermalHeadroomC,
            "°C"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
            lineNumber: 141,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
          lineNumber: 139,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-emerald-400 font-mono mt-0.5", children: "Bezpieczna rezerwa mocy" }, void 0, false, {
          fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
          lineNumber: 143,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
        lineNumber: 137,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] font-mono text-zinc-400 uppercase", children: "Zablokowane Throttlingi" }, void 0, false, {
          fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
          lineNumber: 147,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-2xl font-black font-mono text-indigo-300 flex items-center gap-2 mt-0.5", children: [
          /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-5 h-5 text-indigo-400" }, void 0, false, {
            fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
            lineNumber: 149,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: thermalState.totalThermalThrottlesPrevented }, void 0, false, {
            fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
            lineNumber: 150,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
          lineNumber: 148,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-indigo-400 font-mono mt-0.5", children: "Ochrona VCore & Rdzeni" }, void 0, false, {
          fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
          lineNumber: 152,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
        lineNumber: 146,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] font-mono text-zinc-400 uppercase", children: "Płyn Kriogeniczny" }, void 0, false, {
          fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
          lineNumber: 156,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-2xl font-black font-mono text-cyan-300 flex items-center gap-2 mt-0.5", children: [
          /* @__PURE__ */ jsxDEV(Snowflake, { className: "w-5 h-5 text-cyan-400" }, void 0, false, {
            fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
            lineNumber: 158,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: [
            thermalState.cryoCoolantLevelPercent,
            "%"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
            lineNumber: 159,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
          lineNumber: 157,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-cyan-400 font-mono mt-0.5", children: "Zbiornik R-134a / Ciecz" }, void 0, false, {
          fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
          lineNumber: 161,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
        lineNumber: 155,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
      lineNumber: 127,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-2.5", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-xs font-mono", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-300 font-bold flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxDEV(Sliders, { className: "w-3.5 h-3.5 text-indigo-400" }, void 0, false, {
            fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
            lineNumber: 169,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "PROFIL ZARZĄDCY TERMICZNEGO (THERMAL GOVERNOR):" }, void 0, false, {
            fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
            lineNumber: 170,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
          lineNumber: 168,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => cpuThermalGovernorEngine.toggleAutoThermalDefense(),
            className: `text-[10px] font-mono px-2 py-0.5 rounded border transition-colors cursor-pointer ${thermalState.autoThermalDefenseActive ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/40" : "bg-zinc-900 text-zinc-500 border-zinc-700"}`,
            children: [
              "Auto-Strażnik Przegrzania: ",
              thermalState.autoThermalDefenseActive ? "WŁĄCZONY" : "WYŁĄCZONY"
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
            lineNumber: 172,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
        lineNumber: 167,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2", children: [
        { id: "CRYO_PURGE", label: "❄️ KRIOGENICZNY", desc: "Maks. chłodzenie (28-34°C)" },
        { id: "DYNAMIC_GOVERNOR", label: "⚡ INTELIGENTNY", desc: "Zbalansowany adaptacyjny" },
        { id: "COMBAT_TURBO", label: "🚀 BOJOWY TURBO", desc: "Maks. taktowanie z kompensacją" },
        { id: "SILENT_COOLED", label: "🌙 CICHY & CHŁODNY", desc: "Niski pobór energii" }
      ].map((item) => /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => handleGovernorChange(item.id),
          className: `p-2.5 rounded-xl text-left border transition-all cursor-pointer ${thermalState.governorMode === item.id ? "bg-indigo-950/80 text-white border-indigo-400 shadow-md shadow-indigo-950" : "bg-zinc-950/80 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200"}`,
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-mono font-bold", children: item.label }, void 0, false, {
              fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
              lineNumber: 200,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-zinc-400 mt-0.5", children: item.desc }, void 0, false, {
              fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
              lineNumber: 201,
              columnNumber: 15
            }, this)
          ]
        },
        item.id,
        true,
        {
          fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
          lineNumber: 191,
          columnNumber: 13
        },
        this
      )) }, void 0, false, {
        fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
        lineNumber: 184,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
      lineNumber: 166,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-xs font-mono", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-300 font-bold flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxDEV(Activity, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
            fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
            lineNumber: 211,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "TELEMETRIA RDZENI CPU, GPU & AKCELERATORA NPU:" }, void 0, false, {
            fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
            lineNumber: 212,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
          lineNumber: 210,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-zinc-400", children: "7 Bloków Obliczeniowych" }, void 0, false, {
          fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
          lineNumber: 214,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
        lineNumber: 209,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5", children: thermalState.cores.map((core) => {
        const coreColor = getTempColor(core.currentTempC);
        const loadPercent = Math.min(100, Math.max(0, core.currentTempC / thermalState.tjMaxC * 100));
        return /* @__PURE__ */ jsxDEV(
          "div",
          {
            className: "p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between space-y-2 hover:border-zinc-700 transition-colors",
            children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-mono font-bold text-zinc-100", children: core.name }, void 0, false, {
                  fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
                  lineNumber: 228,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: `text-[10px] font-mono font-bold ${coreColor.text}`, children: [
                  core.currentTempC,
                  "°C"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
                  lineNumber: 229,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
                lineNumber: 227,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "w-full h-2 rounded-full bg-zinc-950 overflow-hidden border border-zinc-800", children: /* @__PURE__ */ jsxDEV(
                "div",
                {
                  className: `h-full transition-all duration-500 ${coreColor.bar}`,
                  style: { width: `${loadPercent}%` }
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
                  lineNumber: 236,
                  columnNumber: 19
                },
                this
              ) }, void 0, false, {
                fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
                lineNumber: 235,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-[10px] font-mono text-zinc-400", children: [
                /* @__PURE__ */ jsxDEV("span", { children: [
                  "Taktowanie: ",
                  core.currentClockGhz,
                  " GHz"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
                  lineNumber: 243,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: [
                  "Napięcie: ",
                  core.voltageV,
                  " V"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
                  lineNumber: 244,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: core.throttlingActive ? "text-rose-400 font-bold" : "text-emerald-400", children: core.throttlingActive ? "THROTTLE" : "NORMAL" }, void 0, false, {
                  fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
                  lineNumber: 245,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
                lineNumber: 242,
                columnNumber: 17
              }, this)
            ]
          },
          core.coreId,
          true,
          {
            fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
            lineNumber: 223,
            columnNumber: 15
          },
          this
        );
      }) }, void 0, false, {
        fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
        lineNumber: 217,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
      lineNumber: 208,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2 font-mono text-xs", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-300 font-bold flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
            fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
            lineNumber: 259,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "HISTORIA ZDARZEŃ TERMICZNYCH I SCHŁADZANIA CPU" }, void 0, false, {
            fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
            lineNumber: 260,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
          lineNumber: 258,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-zinc-400", children: "Autonomiczny strażnik temperatury" }, void 0, false, {
          fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
          lineNumber: 262,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
        lineNumber: 257,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "max-h-36 overflow-y-auto space-y-1.5 pr-1 text-[11px]", children: thermalState.recentLogs.map((log) => /* @__PURE__ */ jsxDEV(
        "div",
        {
          className: "p-2 rounded-xl bg-zinc-950/80 border border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 hover:border-zinc-700",
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-400 font-bold", children: [
                "[",
                log.eventType,
                "]"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
                lineNumber: 272,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-200", children: log.actionTaken }, void 0, false, {
                fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
                lineNumber: 273,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
              lineNumber: 271,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 shrink-0 text-[10px] text-zinc-400", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-orange-400", children: [
                log.temperatureBeforeC,
                "°C"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
                lineNumber: 276,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "➔" }, void 0, false, {
                fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
                lineNumber: 277,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-400 font-bold", children: [
                log.temperatureAfterC,
                "°C"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
                lineNumber: 278,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-500", children: log.timestamp }, void 0, false, {
                fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
                lineNumber: 279,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
              lineNumber: 275,
              columnNumber: 15
            }, this)
          ]
        },
        log.id,
        true,
        {
          fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
          lineNumber: 267,
          columnNumber: 13
        },
        this
      )) }, void 0, false, {
        fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
        lineNumber: 265,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
      lineNumber: 256,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/CpuThermalGovernorPanel.tsx",
    lineNumber: 66,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNwdVRoZXJtYWxHb3Zlcm5vclBhbmVsLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFxuICBDcHUsIEZsYW1lLCBTbm93Zmxha2UsIFphcCwgQWN0aXZpdHksIFNoaWVsZENoZWNrLCBBbGVydFRyaWFuZ2xlLFxuICBTbGlkZXJzLCBSZWZyZXNoQ3csIEdhdWdlLCBBcnJvd0Rvd24sIFRyZW5kaW5nRG93biwgVGhlcm1vbWV0ZXIsXG4gIFNoaWVsZEFsZXJ0LCBTbGlkZXJzSG9yaXpvbnRhbCwgQ2hlY2tDaXJjbGUyLCBQbGF5LCBDaGV2cm9uUmlnaHRcbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IGNwdVRoZXJtYWxHb3Zlcm5vckVuZ2luZSB9IGZyb20gJy4uL3V0aWxzL2NwdVRoZXJtYWxHb3Zlcm5vckVuZ2luZSc7XG5pbXBvcnQgeyBDcHVUaGVybWFsU3RhdGUsIFRoZXJtYWxHb3Zlcm5vck1vZGUgfSBmcm9tICcuLi90eXBlcyc7XG5cbmludGVyZmFjZSBDcHVUaGVybWFsR292ZXJub3JQYW5lbFByb3BzIHtcbiAgb25Ob3RpZnk/OiAobXNnOiBzdHJpbmcpID0+IHZvaWQ7XG4gIGlzQ29tcGFjdD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjb25zdCBDcHVUaGVybWFsR292ZXJub3JQYW5lbDogUmVhY3QuRkM8Q3B1VGhlcm1hbEdvdmVybm9yUGFuZWxQcm9wcz4gPSAoe1xuICBvbk5vdGlmeSxcbiAgaXNDb21wYWN0ID0gZmFsc2Vcbn0pID0+IHtcbiAgY29uc3QgW3RoZXJtYWxTdGF0ZSwgc2V0VGhlcm1hbFN0YXRlXSA9IHVzZVN0YXRlPENwdVRoZXJtYWxTdGF0ZT4oKCkgPT4gY3B1VGhlcm1hbEdvdmVybm9yRW5naW5lLmdldFN0YXRlKCkpO1xuICBjb25zdCBbaXNDcnlvQW5pbWF0aW5nLCBzZXRJc0NyeW9BbmltYXRpbmddID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgdW5zdWIgPSBjcHVUaGVybWFsR292ZXJub3JFbmdpbmUuc3Vic2NyaWJlKChuZXdTdGF0ZSkgPT4ge1xuICAgICAgc2V0VGhlcm1hbFN0YXRlKG5ld1N0YXRlKTtcbiAgICB9KTtcbiAgICByZXR1cm4gKCkgPT4gdW5zdWIoKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGhhbmRsZUNyeW9QdWxzZSA9ICgpID0+IHtcbiAgICBzZXRJc0NyeW9BbmltYXRpbmcodHJ1ZSk7XG4gICAgY3B1VGhlcm1hbEdvdmVybm9yRW5naW5lLnRyaWdnZXJDcnlvUHVsc2VDb29sZG93bignUsSZY3pueSBJbXB1bHMgS3Jpb2dlbmljem55IFBhbmVsdSBLb250cm9saScpO1xuICAgIGlmIChvbk5vdGlmeSkge1xuICAgICAgb25Ob3RpZnkoJ+KdhO+4jyBJTVBVTFMgS1JJT0dFTklDWk5ZOiBabW5pZWpzem9ubyB0ZW1wZXJhdHVyxJkgcHJvY2Vzb3JhIG8gMjXCsEMgdyB1xYJhbWt1IHNla3VuZHkhJyk7XG4gICAgfVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc2V0SXNDcnlvQW5pbWF0aW5nKGZhbHNlKTtcbiAgICB9LCAxMjAwKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVHb3Zlcm5vckNoYW5nZSA9IChtb2RlOiBUaGVybWFsR292ZXJub3JNb2RlKSA9PiB7XG4gICAgY3B1VGhlcm1hbEdvdmVybm9yRW5naW5lLnNldEdvdmVybm9yTW9kZShtb2RlKTtcbiAgICBpZiAob25Ob3RpZnkpIHtcbiAgICAgIG9uTm90aWZ5KGDimpnvuI8gWm1pZW5pb25vIHByb2ZpbCB6YXJ6xIVkY3kgdGVybWljem5lZ28gbmE6IFske21vZGV9XWApO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVTaW11bGF0ZU1hbHdhcmVIZWF0U3Bpa2UgPSAoKSA9PiB7XG4gICAgY3B1VGhlcm1hbEdvdmVybm9yRW5naW5lLnNpbXVsYXRlTWFsd2FyZVRoZXJtYWxTcGlrZSgnUMSZdGxhIFN0ZWFsdGggTWluZXIgLyBDUFUgQnVybmVyJyk7XG4gICAgaWYgKG9uTm90aWZ5KSB7XG4gICAgICBvbk5vdGlmeSgn8J+UpSBTeW11bGFjamEgcHJ6ZWNpxIXFvGVuaWEgdGVybWljem5lZ286IFd5a3J5dG8gbWFsd2FyZSwgc3RyYcW8bmlrIGF1dG9tYXR5Y3puaWUgc2NoxYJvZHppxYIgQ1BVIScpO1xuICAgIH1cbiAgfTtcblxuICAvLyBDb2xvciBtYXBwaW5nIGJhc2VkIG9uIHBhY2thZ2UgdGVtcGVyYXR1cmVcbiAgY29uc3QgZ2V0VGVtcENvbG9yID0gKHRlbXA6IG51bWJlcikgPT4ge1xuICAgIGlmICh0ZW1wIDwgNDApIHJldHVybiB7IHRleHQ6ICd0ZXh0LWN5YW4tNDAwJywgYmc6ICdiZy1jeWFuLTk1MC82MCcsIGJvcmRlcjogJ2JvcmRlci1jeWFuLTUwMC80MCcsIGJhcjogJ2JnLWN5YW4tNDAwJyB9O1xuICAgIGlmICh0ZW1wIDwgNjApIHJldHVybiB7IHRleHQ6ICd0ZXh0LWVtZXJhbGQtNDAwJywgYmc6ICdiZy1lbWVyYWxkLTk1MC82MCcsIGJvcmRlcjogJ2JvcmRlci1lbWVyYWxkLTUwMC80MCcsIGJhcjogJ2JnLWVtZXJhbGQtNDAwJyB9O1xuICAgIGlmICh0ZW1wIDwgNzUpIHJldHVybiB7IHRleHQ6ICd0ZXh0LXllbGxvdy00MDAnLCBiZzogJ2JnLXllbGxvdy05NTAvNjAnLCBib3JkZXI6ICdib3JkZXIteWVsbG93LTUwMC80MCcsIGJhcjogJ2JnLXllbGxvdy00MDAnIH07XG4gICAgaWYgKHRlbXAgPCA4OCkgcmV0dXJuIHsgdGV4dDogJ3RleHQtb3JhbmdlLTQwMCcsIGJnOiAnYmctb3JhbmdlLTk1MC82MCcsIGJvcmRlcjogJ2JvcmRlci1vcmFuZ2UtNTAwLzQwJywgYmFyOiAnYmctb3JhbmdlLTQwMCcgfTtcbiAgICByZXR1cm4geyB0ZXh0OiAndGV4dC1yb3NlLTUwMCcsIGJnOiAnYmctcm9zZS05NTAvNjAnLCBib3JkZXI6ICdib3JkZXItcm9zZS01MDAvODAnLCBiYXI6ICdiZy1yb3NlLTUwMCcgfTtcbiAgfTtcblxuICBjb25zdCBjdXJyZW50VGhlbWUgPSBnZXRUZW1wQ29sb3IodGhlcm1hbFN0YXRlLnBhY2thZ2VUZW1wQyk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCByb3VuZGVkLTN4bCBiZy16aW5jLTk1MC85NSBib3JkZXItMiBib3JkZXItaW5kaWdvLTUwMC80MCBzaGFkb3ctMnhsIHAtNCBzbTpwLTYgdGV4dC13aGl0ZSBzcGFjZS15LTYgcmVsYXRpdmUgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICBcbiAgICAgIHsvKiBDcnlvIGZyb3N0IHZpc3VhbCBlZmZlY3Qgb3ZlcmxheSAqL31cbiAgICAgIHtpc0NyeW9BbmltYXRpbmcgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgYmctY3lhbi01MDAvMjAgYmFja2Ryb3AtYmx1ci14cyB6LTMwIHBvaW50ZXItZXZlbnRzLW5vbmUgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYW5pbWF0ZS1pbiBmYWRlLWluIGR1cmF0aW9uLTIwMFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQtM3hsIGJnLXppbmMtOTUwLzkwIGJvcmRlci0yIGJvcmRlci1jeWFuLTQwMCBzaGFkb3ctWzBfMF8zMHB4XyMwNmI2ZDRdIGZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICA8U25vd2ZsYWtlIGNsYXNzTmFtZT1cInctOCBoLTggdGV4dC1jeWFuLTMwMCBhbmltYXRlLXNwaW5cIiAvPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtbW9ubyBmb250LWJsYWNrIHRleHQtd2hpdGVcIj5JTVBVTFMgS1JJT0dFTklDWk5ZIEFLVFlXTlk8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LWN5YW4tMzAwXCI+LTI0LjXCsEMgWnJ6dXQgQ2llcMWCYSB3IDAgbXM8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBIZWFkZXIgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgbGc6ZmxleC1yb3cgaXRlbXMtc3RhcnQgbGc6aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNCBwYi00IGJvcmRlci1iIGJvcmRlci16aW5jLTgwMFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMy41XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTEyIGgtMTIgcm91bmRlZC0yeGwgYmctZ3JhZGllbnQtdG8tYnIgZnJvbS1pbmRpZ28tOTAwIHZpYS1jeWFuLTk1MCB0by16aW5jLTk1MCBib3JkZXItMiBib3JkZXItaW5kaWdvLTQwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBzaGFkb3ctbGcgc2hhZG93LWluZGlnby01MDAvMzAgc2hyaW5rLTBcIj5cbiAgICAgICAgICAgIDxDcHUgY2xhc3NOYW1lPVwidy02IGgtNiB0ZXh0LWluZGlnby0zMDAgYW5pbWF0ZS1wdWxzZVwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgZmxleC13cmFwXCI+XG4gICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LWJhc2Ugc206dGV4dC1sZyBmb250LWJsYWNrIGZvbnQtbW9ubyB0cmFja2luZy10aWdodCB0ZXh0LXdoaXRlIHVwcGVyY2FzZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxzcGFuPk1lY2hhbml6bSBLb250cm9saSBUZW1wZXJhdHVyeSBDUFUgJiBTb0M8L3NwYW4+XG4gICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHB4LTIuNSBweS0wLjUgcm91bmRlZC1mdWxsIHRleHQtWzEwcHhdIGZvbnQtbW9ubyBmb250LWJsYWNrIGJvcmRlciAke2N1cnJlbnRUaGVtZS5iZ30gJHtjdXJyZW50VGhlbWUuYm9yZGVyfSAke2N1cnJlbnRUaGVtZS50ZXh0fWB9PlxuICAgICAgICAgICAgICAgIHt0aGVybWFsU3RhdGUuY29vbGluZ1N0YXR1c31cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0yIHB5LTAuNSByb3VuZGVkLWZ1bGwgdGV4dC1bMTBweF0gZm9udC1tb25vIGJvcmRlciBiZy16aW5jLTkwMCBib3JkZXItemluYy03MDAgdGV4dC16aW5jLTMwMFwiPlxuICAgICAgICAgICAgICAgIFdlbnR5bGF0b3I6IHt0aGVybWFsU3RhdGUuZmFuU3BlZWRScG19IFJQTVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC16aW5jLTQwMCBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgQWt0eXdueSB6YXJ6xIVkY2EgdGVybWljem55LCBvY2hyb25hIHByemVkIHRocm90dGxpbmdpZW0gaSBrcnlvZ2VuaWN6bmUgc2NoxYJhZHphbmllIHJkemVuaSBwb2RjemFzIGludGVuc3l3bnljaCB3YWxrIHogbWFsd2FyZS5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIEJpZyBBY3Rpb24gQnV0dG9ucyAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBmbGV4LXdyYXBcIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVDcnlvUHVsc2V9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTIgcm91bmRlZC14bCBiZy1ncmFkaWVudC10by1yIGZyb20tY3lhbi02MDAgdmlhLXRlYWwtNjAwIHRvLWluZGlnby02MDAgaG92ZXI6ZnJvbS1jeWFuLTUwMCBob3Zlcjp0by1pbmRpZ28tNTAwIHRleHQtd2hpdGUgdGV4dC14cyBmb250LW1vbm8gZm9udC1ibGFjayB1cHBlcmNhc2UgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgYm9yZGVyIGJvcmRlci1jeWFuLTMwMCBzaGFkb3ctWzBfMF8xNXB4XyMwNmI2ZDRdIGFjdGl2ZTpzY2FsZS05NSB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPFNub3dmbGFrZSBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtY3lhbi0yMDAgYW5pbWF0ZS1zcGluXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPkltcHVscyBLcmlvZ2VuaWN6bnkgKC0yNcKwQyk8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVTaW11bGF0ZU1hbHdhcmVIZWF0U3Bpa2V9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zLjUgcHktMiByb3VuZGVkLXhsIGJnLXppbmMtOTAwIGhvdmVyOmJnLXppbmMtODAwIGJvcmRlciBib3JkZXItb3JhbmdlLTUwMC80MCB0ZXh0LW9yYW5nZS0zMDAgdGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgIHRpdGxlPVwiU3ltdWx1aiBwcnplY2nEhcW8ZW5pZSB0ZXJtaWN6bmUgcHJ6ZXogbWFsd2FyZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPEZsYW1lIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtb3JhbmdlLTQwMFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5TeW11bHVqIEF0YWsgVGVybWljem55PC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogTWFpbiBTdGF0cyBSb3cgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgc206Z3JpZC1jb2xzLTQgZ2FwLTNcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMuNSByb3VuZGVkLTJ4bCBiZy16aW5jLTkwMC84MCBib3JkZXIgYm9yZGVyLXppbmMtODAwXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC16aW5jLTQwMCB1cHBlcmNhc2VcIj5UZW1wZXJhdHVyYSBQYWtpZXR1IENQVTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgdGV4dC0yeGwgZm9udC1ibGFjayBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgbXQtMC41ICR7Y3VycmVudFRoZW1lLnRleHR9YH0+XG4gICAgICAgICAgICA8VGhlcm1vbWV0ZXIgY2xhc3NOYW1lPVwidy01IGgtNVwiIC8+XG4gICAgICAgICAgICA8c3Bhbj57dGhlcm1hbFN0YXRlLnBhY2thZ2VUZW1wQ33CsEM8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtemluYy00MDAgZm9udC1tb25vIG10LTAuNVwiPlRqTWF4IExpbWl0OiB7dGhlcm1hbFN0YXRlLnRqTWF4Q33CsEM8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMuNSByb3VuZGVkLTJ4bCBiZy16aW5jLTkwMC84MCBib3JkZXIgYm9yZGVyLXppbmMtODAwXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC16aW5jLTQwMCB1cHBlcmNhc2VcIj5aYXBhcyBUZXJtaWN6bnkgKEhlYWRyb29tKTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ibGFjayBmb250LW1vbm8gdGV4dC1lbWVyYWxkLTQwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBtdC0wLjVcIj5cbiAgICAgICAgICAgIDxUcmVuZGluZ0Rvd24gY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LWVtZXJhbGQtNTAwXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPit7dGhlcm1hbFN0YXRlLnRoZXJtYWxIZWFkcm9vbUN9wrBDPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtbW9ubyBtdC0wLjVcIj5CZXpwaWVjem5hIHJlemVyd2EgbW9jeTwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMy41IHJvdW5kZWQtMnhsIGJnLXppbmMtOTAwLzgwIGJvcmRlciBib3JkZXItemluYy04MDBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyB0ZXh0LXppbmMtNDAwIHVwcGVyY2FzZVwiPlphYmxva293YW5lIFRocm90dGxpbmdpPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJsYWNrIGZvbnQtbW9ubyB0ZXh0LWluZGlnby0zMDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgbXQtMC41XCI+XG4gICAgICAgICAgICA8U2hpZWxkQ2hlY2sgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LWluZGlnby00MDBcIiAvPlxuICAgICAgICAgICAgPHNwYW4+e3RoZXJtYWxTdGF0ZS50b3RhbFRoZXJtYWxUaHJvdHRsZXNQcmV2ZW50ZWR9PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB0ZXh0LWluZGlnby00MDAgZm9udC1tb25vIG10LTAuNVwiPk9jaHJvbmEgVkNvcmUgJiBSZHplbmk8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMuNSByb3VuZGVkLTJ4bCBiZy16aW5jLTkwMC84MCBib3JkZXIgYm9yZGVyLXppbmMtODAwXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC16aW5jLTQwMCB1cHBlcmNhc2VcIj5QxYJ5biBLcmlvZ2VuaWN6bnk8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYmxhY2sgZm9udC1tb25vIHRleHQtY3lhbi0zMDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgbXQtMC41XCI+XG4gICAgICAgICAgICA8U25vd2ZsYWtlIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1jeWFuLTQwMFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj57dGhlcm1hbFN0YXRlLmNyeW9Db29sYW50TGV2ZWxQZXJjZW50fSU8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtY3lhbi00MDAgZm9udC1tb25vIG10LTAuNVwiPlpiaW9ybmlrIFItMTM0YSAvIENpZWN6PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBHb3Zlcm5vciBTZWxlY3RvciBCYXIgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLTJ4bCBiZy16aW5jLTkwMC83MCBib3JkZXIgYm9yZGVyLXppbmMtODAwIHNwYWNlLXktMi41XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQteHMgZm9udC1tb25vXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC16aW5jLTMwMCBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgPFNsaWRlcnMgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1pbmRpZ28tNDAwXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPlBST0ZJTCBaQVJaxIREQ1kgVEVSTUlDWk5FR08gKFRIRVJNQUwgR09WRVJOT1IpOjwvc3Bhbj5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGNwdVRoZXJtYWxHb3Zlcm5vckVuZ2luZS50b2dnbGVBdXRvVGhlcm1hbERlZmVuc2UoKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHRleHQtWzEwcHhdIGZvbnQtbW9ubyBweC0yIHB5LTAuNSByb3VuZGVkIGJvcmRlciB0cmFuc2l0aW9uLWNvbG9ycyBjdXJzb3ItcG9pbnRlciAke1xuICAgICAgICAgICAgICB0aGVybWFsU3RhdGUuYXV0b1RoZXJtYWxEZWZlbnNlQWN0aXZlXG4gICAgICAgICAgICAgICAgPyAnYmctZW1lcmFsZC05NTAvODAgdGV4dC1lbWVyYWxkLTMwMCBib3JkZXItZW1lcmFsZC01MDAvNDAnXG4gICAgICAgICAgICAgICAgOiAnYmctemluYy05MDAgdGV4dC16aW5jLTUwMCBib3JkZXItemluYy03MDAnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICBBdXRvLVN0cmHFvG5payBQcnplZ3J6YW5pYToge3RoZXJtYWxTdGF0ZS5hdXRvVGhlcm1hbERlZmVuc2VBY3RpdmUgPyAnV8WBxIRDWk9OWScgOiAnV1nFgcSEQ1pPTlknfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgc206Z3JpZC1jb2xzLTQgZ2FwLTJcIj5cbiAgICAgICAgICB7W1xuICAgICAgICAgICAgeyBpZDogJ0NSWU9fUFVSR0UnIGFzIFRoZXJtYWxHb3Zlcm5vck1vZGUsIGxhYmVsOiAn4p2E77iPIEtSSU9HRU5JQ1pOWScsIGRlc2M6ICdNYWtzLiBjaMWCb2R6ZW5pZSAoMjgtMzTCsEMpJyB9LFxuICAgICAgICAgICAgeyBpZDogJ0RZTkFNSUNfR09WRVJOT1InIGFzIFRoZXJtYWxHb3Zlcm5vck1vZGUsIGxhYmVsOiAn4pqhIElOVEVMSUdFTlROWScsIGRlc2M6ICdaYmFsYW5zb3dhbnkgYWRhcHRhY3lqbnknIH0sXG4gICAgICAgICAgICB7IGlkOiAnQ09NQkFUX1RVUkJPJyBhcyBUaGVybWFsR292ZXJub3JNb2RlLCBsYWJlbDogJ/CfmoAgQk9KT1dZIFRVUkJPJywgZGVzYzogJ01ha3MuIHRha3Rvd2FuaWUgeiBrb21wZW5zYWNqxIUnIH0sXG4gICAgICAgICAgICB7IGlkOiAnU0lMRU5UX0NPT0xFRCcgYXMgVGhlcm1hbEdvdmVybm9yTW9kZSwgbGFiZWw6ICfwn4yZIENJQ0hZICYgQ0jFgU9ETlknLCBkZXNjOiAnTmlza2kgcG9iw7NyIGVuZXJnaWknIH0sXG4gICAgICAgICAgXS5tYXAoKGl0ZW0pID0+IChcbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAga2V5PXtpdGVtLmlkfVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVHb3Zlcm5vckNoYW5nZShpdGVtLmlkKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC0yLjUgcm91bmRlZC14bCB0ZXh0LWxlZnQgYm9yZGVyIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgICAgdGhlcm1hbFN0YXRlLmdvdmVybm9yTW9kZSA9PT0gaXRlbS5pZFxuICAgICAgICAgICAgICAgICAgPyAnYmctaW5kaWdvLTk1MC84MCB0ZXh0LXdoaXRlIGJvcmRlci1pbmRpZ28tNDAwIHNoYWRvdy1tZCBzaGFkb3ctaW5kaWdvLTk1MCdcbiAgICAgICAgICAgICAgICAgIDogJ2JnLXppbmMtOTUwLzgwIHRleHQtemluYy00MDAgYm9yZGVyLXppbmMtODAwIGhvdmVyOmJvcmRlci16aW5jLTcwMCBob3Zlcjp0ZXh0LXppbmMtMjAwJ1xuICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbW9ubyBmb250LWJvbGRcIj57aXRlbS5sYWJlbH08L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXppbmMtNDAwIG10LTAuNVwiPntpdGVtLmRlc2N9PC9kaXY+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIENvcmUtYnktQ29yZSBUaGVybWFsIEJyZWFrZG93biAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQteHMgZm9udC1tb25vXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC16aW5jLTMwMCBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgPEFjdGl2aXR5IGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtY3lhbi00MDBcIiAvPlxuICAgICAgICAgICAgPHNwYW4+VEVMRU1FVFJJQSBSRFpFTkkgQ1BVLCBHUFUgJiBBS0NFTEVSQVRPUkEgTlBVOjwvc3Bhbj5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC16aW5jLTQwMFwiPjcgQmxva8OzdyBPYmxpY3plbmlvd3ljaDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy0zIGdhcC0yLjVcIj5cbiAgICAgICAgICB7dGhlcm1hbFN0YXRlLmNvcmVzLm1hcCgoY29yZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29yZUNvbG9yID0gZ2V0VGVtcENvbG9yKGNvcmUuY3VycmVudFRlbXBDKTtcbiAgICAgICAgICAgIGNvbnN0IGxvYWRQZXJjZW50ID0gTWF0aC5taW4oMTAwLCBNYXRoLm1heCgwLCAoY29yZS5jdXJyZW50VGVtcEMgLyB0aGVybWFsU3RhdGUudGpNYXhDKSAqIDEwMCkpO1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8ZGl2IFxuICAgICAgICAgICAgICAgIGtleT17Y29yZS5jb3JlSWR9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQtMnhsIGJnLXppbmMtOTAwLzYwIGJvcmRlciBib3JkZXItemluYy04MDAgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW4gc3BhY2UteS0yIGhvdmVyOmJvcmRlci16aW5jLTcwMCB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbW9ubyBmb250LWJvbGQgdGV4dC16aW5jLTEwMFwiPntjb3JlLm5hbWV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2B0ZXh0LVsxMHB4XSBmb250LW1vbm8gZm9udC1ib2xkICR7Y29yZUNvbG9yLnRleHR9YH0+XG4gICAgICAgICAgICAgICAgICAgIHtjb3JlLmN1cnJlbnRUZW1wQ33CsENcbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHsvKiBQcm9ncmVzcyBiYXIgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgaC0yIHJvdW5kZWQtZnVsbCBiZy16aW5jLTk1MCBvdmVyZmxvdy1oaWRkZW4gYm9yZGVyIGJvcmRlci16aW5jLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgaC1mdWxsIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTUwMCAke2NvcmVDb2xvci5iYXJ9YH1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgd2lkdGg6IGAke2xvYWRQZXJjZW50fSVgIH19XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC1bMTBweF0gZm9udC1tb25vIHRleHQtemluYy00MDBcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPlRha3Rvd2FuaWU6IHtjb3JlLmN1cnJlbnRDbG9ja0doen0gR0h6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+TmFwacSZY2llOiB7Y29yZS52b2x0YWdlVn0gVjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y29yZS50aHJvdHRsaW5nQWN0aXZlID8gJ3RleHQtcm9zZS00MDAgZm9udC1ib2xkJyA6ICd0ZXh0LWVtZXJhbGQtNDAwJ30+XG4gICAgICAgICAgICAgICAgICAgIHtjb3JlLnRocm90dGxpbmdBY3RpdmUgPyAnVEhST1RUTEUnIDogJ05PUk1BTCd9XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIFRoZXJtYWwgRXZlbnQgQXVkaXQgTG9nICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMuNSByb3VuZGVkLTJ4bCBiZy16aW5jLTkwMC82MCBib3JkZXIgYm9yZGVyLXppbmMtODAwIHNwYWNlLXktMiBmb250LW1vbm8gdGV4dC14c1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtemluYy0zMDAgZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgIDxDaGVja0NpcmNsZTIgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1lbWVyYWxkLTQwMFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5ISVNUT1JJQSBaREFSWkXFgyBURVJNSUNaTllDSCBJIFNDSMWBQURaQU5JQSBDUFU8L3NwYW4+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtemluYy00MDBcIj5BdXRvbm9taWN6bnkgc3RyYcW8bmlrIHRlbXBlcmF0dXJ5PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC1oLTM2IG92ZXJmbG93LXktYXV0byBzcGFjZS15LTEuNSBwci0xIHRleHQtWzExcHhdXCI+XG4gICAgICAgICAge3RoZXJtYWxTdGF0ZS5yZWNlbnRMb2dzLm1hcCgobG9nKSA9PiAoXG4gICAgICAgICAgICA8ZGl2IFxuICAgICAgICAgICAgICBrZXk9e2xvZy5pZH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0yIHJvdW5kZWQteGwgYmctemluYy05NTAvODAgYm9yZGVyIGJvcmRlci16aW5jLTgwMC84MCBmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IHNtOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTEuNSBob3Zlcjpib3JkZXItemluYy03MDBcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1jeWFuLTQwMCBmb250LWJvbGRcIj5be2xvZy5ldmVudFR5cGV9XTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXppbmMtMjAwXCI+e2xvZy5hY3Rpb25UYWtlbn08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHNocmluay0wIHRleHQtWzEwcHhdIHRleHQtemluYy00MDBcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LW9yYW5nZS00MDBcIj57bG9nLnRlbXBlcmF0dXJlQmVmb3JlQ33CsEM8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4+4p6UPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtY3lhbi00MDAgZm9udC1ib2xkXCI+e2xvZy50ZW1wZXJhdHVyZUFmdGVyQ33CsEM8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC16aW5jLTUwMFwiPntsb2cudGltZXN0YW1wfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAg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