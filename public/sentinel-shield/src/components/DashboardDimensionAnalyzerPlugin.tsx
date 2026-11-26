import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"];
import {
  Sliders,
  Layers,
  Zap,
  CheckCircle2,
  Download,
  Radio,
  Box,
  Share2,
  Gauge,
  Lock,
  Unlock
} from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import { emWaveResonanceEngine } from "/sentinel-shield/src/utils/emWaveResonanceEngine.ts";
export const DashboardDimensionAnalyzerPlugin = ({
  onNotify
}) => {
  const [engineState, setEngineState] = useState(() => emWaveResonanceEngine.getState());
  const plugin = engineState.plugin;
  const [lengthX, setLengthX] = useState(plugin.spatialDimensionsMm.lengthX);
  const [widthY, setWidthY] = useState(plugin.spatialDimensionsMm.widthY);
  const [heightZ, setHeightZ] = useState(plugin.spatialDimensionsMm.heightZ);
  const [selectedCarrierFreq, setSelectedCarrierFreq] = useState(245e7);
  const [copiedConfig, setCopiedConfig] = useState(false);
  useEffect(() => {
    const unsub = emWaveResonanceEngine.subscribe((s) => {
      setEngineState(s);
    });
    return () => unsub();
  }, []);
  const handleToggleConnection = () => {
    emWaveResonanceEngine.toggleDashboardPluginConnection();
    const isNowConnected = !plugin.isPluginConnected;
    if (onNotify) {
      onNotify(isNowConnected ? `🔌 Wtyczka podłączona pomyślnie do Dashboardu (${plugin.attachedSlot}) – mostek wymiarów 3D/4D aktywny!` : "🛑 Wtyczka Dashboardu odłączona – szyna pomiarowa zwolniona.");
    }
  };
  const handleDimensionsChange = (newX, newY, newZ) => {
    setLengthX(newX);
    setWidthY(newY);
    setHeightZ(newZ);
    emWaveResonanceEngine.updatePluginDimensions(newX, newY, newZ);
  };
  const handlePresetSelect = (preset) => {
    if (preset === "ATX") handleDimensionsChange(305, 244, 65);
    if (preset === "ITX") handleDimensionsChange(170, 170, 45);
    if (preset === "EATX") handleDimensionsChange(305, 330, 80);
    if (preset === "SMARTPHONE") handleDimensionsChange(160, 75, 9);
  };
  const handleExportJson = () => {
    const jsonStr = JSON.stringify({
      pluginMetadata: {
        name: "Sentinel Dashboard Dimension Analyzer Plugin",
        version: plugin.pluginVersion,
        slot: plugin.attachedSlot,
        connected: plugin.isPluginConnected,
        latencyMs: plugin.connectionLatencyMs,
        lastSync: plugin.lastSyncTimestamp
      },
      spatialDimensions: plugin.spatialDimensionsMm,
      waveElectrodynamicDimensions: {
        referenceCarrierHz: selectedCarrierFreq,
        wavelengthLambdaMeters: plugin.wavelengthLambdaMeters,
        nearFieldFresnelMm: plugin.nearFieldFresnelBoundaryMm,
        farFieldFraunhoferMm: plugin.farFieldFraunhoferBoundaryMm,
        phaseSpace4D: plugin.phaseSpaceDimensions4D,
        maxwellStressTensorMpa: plugin.maxwellStressTensorMpa
      },
      activeProbeChannels: plugin.activeProbeChannels
    }, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `SENTINEL_DASHBOARD_DIMENSION_PLUGIN_CONFIG.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    if (onNotify) onNotify("📥 Wyeksportowano konfigurację wtyczki do pliku JSON");
  };
  const handleCopyConfig = () => {
    const payload = JSON.stringify({
      slot: plugin.attachedSlot,
      dimensions: plugin.spatialDimensionsMm,
      fresnelMm: plugin.nearFieldFresnelBoundaryMm,
      fraunhoferMm: plugin.farFieldFraunhoferBoundaryMm,
      tensorMpa: plugin.maxwellStressTensorMpa
    }, null, 2);
    navigator.clipboard.writeText(payload);
    setCopiedConfig(true);
    setTimeout(() => setCopiedConfig(false), 2500);
    if (onNotify) onNotify("📋 Skopiowano parametry wtyczki do schowka");
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "w-full space-y-6 text-white", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "rounded-3xl bg-zinc-950/95 border-2 border-cyan-500/40 p-5 sm:p-6 shadow-2xl space-y-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-zinc-800", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3.5", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-950 via-blue-950 to-zinc-950 border-2 border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/20 shrink-0", children: /* @__PURE__ */ jsxDEV(Box, { className: "w-6 h-6 text-cyan-300 animate-pulse" }, void 0, false, {
            fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
            lineNumber: 114,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
            lineNumber: 113,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxDEV("h2", { className: "text-base sm:text-lg font-black font-mono tracking-tight text-white uppercase flex items-center gap-2", children: /* @__PURE__ */ jsxDEV("span", { children: "WTYCZKA PODŁĄCZANA DO DASHBOARDU • ANALIZATOR WYMIARÓW" }, void 0, false, {
                fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
                lineNumber: 119,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
                lineNumber: 118,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black border bg-cyan-950/80 border-cyan-400 text-cyan-300", children: [
                "HOT-PLUG • ",
                plugin.pluginVersion
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
                lineNumber: 121,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: `px-2 py-0.5 rounded-full text-[10px] font-mono border flex items-center gap-1.5 ${plugin.isPluginConnected ? "bg-emerald-950/80 border-emerald-400 text-emerald-300" : "bg-zinc-900 border-zinc-700 text-zinc-400"}`, children: [
                /* @__PURE__ */ jsxDEV("span", { className: `w-2 h-2 rounded-full ${plugin.isPluginConnected ? "bg-emerald-400 animate-ping" : "bg-zinc-600"}` }, void 0, false, {
                  fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
                  lineNumber: 129,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: plugin.isPluginConnected ? "PODŁĄCZONA DO DASHBOARDU" : "ODŁĄCZONA (STANDBY)" }, void 0, false, {
                  fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
                  lineNumber: 130,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
                lineNumber: 124,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
              lineNumber: 117,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-zinc-400 mt-0.5", children: "Architektura wtyczkowa (Plugin Bridge) mapująca rzeczywiste wymiary obudowy i płyty na granice stref Fresnela, długości fal $\\lambda$ i tensory naprężeń Maxwella." }, void 0, false, {
              fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
              lineNumber: 133,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
            lineNumber: 116,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
          lineNumber: 112,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleToggleConnection,
              className: `px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 border transition-all cursor-pointer shadow-lg ${plugin.isPluginConnected ? "bg-emerald-950 text-emerald-200 border-emerald-400 hover:bg-emerald-900" : "bg-cyan-950 text-cyan-200 border-cyan-400 hover:bg-cyan-900 animate-pulse"}`,
              children: [
                plugin.isPluginConnected ? /* @__PURE__ */ jsxDEV(Lock, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
                  lineNumber: 149,
                  columnNumber: 43
                }, this) : /* @__PURE__ */ jsxDEV(Unlock, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
                  lineNumber: 149,
                  columnNumber: 78
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: plugin.isPluginConnected ? "Wtyczka Podłączona" : "Podłącz Wtyczkę do Dashboardu" }, void 0, false, {
                  fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
                  lineNumber: 150,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
              lineNumber: 141,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleCopyConfig,
              className: "px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-mono font-bold flex items-center gap-2 cursor-pointer transition-all",
              children: [
                /* @__PURE__ */ jsxDEV(Share2, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
                  lineNumber: 157,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: copiedConfig ? "Skopiowano!" : "Kopiuj Konfig" }, void 0, false, {
                  fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
                  lineNumber: 158,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
              lineNumber: 153,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleExportJson,
              className: "px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold flex items-center gap-2 cursor-pointer transition-all",
              children: [
                /* @__PURE__ */ jsxDEV(Download, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
                  lineNumber: 165,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Pobierz JSON" }, void 0, false, {
                  fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
                  lineNumber: 166,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
              lineNumber: 161,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
          lineNumber: 140,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
        lineNumber: 111,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-2xl bg-zinc-900/80 border border-cyan-500/30", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] font-mono text-zinc-400 uppercase", children: "Magistrala Połączenia Dashboardu" }, void 0, false, {
            fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
            lineNumber: 174,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-sm font-black font-mono text-cyan-300 truncate mt-1", children: plugin.attachedSlot }, void 0, false, {
            fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
            lineNumber: 175,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-emerald-400 font-mono mt-0.5", children: [
            "Opóźnienie: ",
            plugin.connectionLatencyMs,
            " ms"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
            lineNumber: 178,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
          lineNumber: 173,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-2xl bg-zinc-900/80 border border-indigo-500/30", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] font-mono text-zinc-400 uppercase", children: "Objętość Geometryczna 3D" }, void 0, false, {
            fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
            lineNumber: 182,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-2xl font-black font-mono text-indigo-300 flex items-center gap-1.5 mt-0.5", children: [
            /* @__PURE__ */ jsxDEV(Layers, { className: "w-5 h-5 text-indigo-400" }, void 0, false, {
              fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
              lineNumber: 184,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              plugin.spatialDimensionsMm.volumeCm3,
              " cm³"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
              lineNumber: 185,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
            lineNumber: 183,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-zinc-400 font-mono mt-0.5", children: [
            lengthX,
            " × ",
            widthY,
            " × ",
            heightZ,
            " mm"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
            lineNumber: 187,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
          lineNumber: 181,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-2xl bg-zinc-900/80 border border-amber-500/30", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] font-mono text-zinc-400 uppercase", children: "Granica Pola Bliskiego (Fresnel)" }, void 0, false, {
            fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
            lineNumber: 191,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-2xl font-black font-mono text-amber-300 flex items-center gap-1.5 mt-0.5", children: [
            /* @__PURE__ */ jsxDEV(Gauge, { className: "w-5 h-5 text-amber-400" }, void 0, false, {
              fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
              lineNumber: 193,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              plugin.nearFieldFresnelBoundaryMm,
              " mm"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
              lineNumber: 194,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
            lineNumber: 192,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-amber-400 font-mono mt-0.5", children: "r < λ / 2π (Sprzężenie reaktywne)" }, void 0, false, {
            fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
            lineNumber: 196,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
          lineNumber: 190,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-2xl bg-zinc-900/80 border border-purple-500/30", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] font-mono text-zinc-400 uppercase", children: "Tensor Naprężeń Maxwella" }, void 0, false, {
            fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
            lineNumber: 200,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-2xl font-black font-mono text-purple-300 flex items-center gap-1.5 mt-0.5", children: [
            /* @__PURE__ */ jsxDEV(Zap, { className: "w-5 h-5 text-purple-400" }, void 0, false, {
              fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
              lineNumber: 202,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              plugin.maxwellStressTensorMpa,
              " MPa"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
              lineNumber: 203,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
            lineNumber: 201,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-emerald-400 font-mono mt-0.5", children: "W normie dielektrycznej FR4" }, void 0, false, {
            fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
            lineNumber: 205,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
          lineNumber: 199,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
        lineNumber: 172,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
      lineNumber: 110,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-6 rounded-3xl bg-zinc-950/95 border-2 border-zinc-800 p-5 space-y-5", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-zinc-800 pb-3 text-xs font-mono", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-200 font-bold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(Sliders, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
              fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
              lineNumber: 217,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "KALIBRATOR WYMIARÓW PRZESTRZENNYCH 3D (X / Y / Z)" }, void 0, false, {
              fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
              lineNumber: 218,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
            lineNumber: 216,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-zinc-400", children: "Jednostki: Milimetry [mm]" }, void 0, false, {
            fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
            lineNumber: 220,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
          lineNumber: 215,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono text-zinc-400 font-bold", children: "Standardy:" }, void 0, false, {
            fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
            lineNumber: 225,
            columnNumber: 13
          }, this),
          [
            { id: "ATX", label: "Standard ATX (305x244 mm)" },
            { id: "ITX", label: "Mini-ITX (170x170 mm)" },
            { id: "EATX", label: "E-ATX Workstation (305x330 mm)" },
            { id: "SMARTPHONE", label: "Smartfon (160x75 mm)" }
          ].map((p) => /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handlePresetSelect(p.id),
              className: "px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-cyan-500/60 hover:text-cyan-300 text-xs font-mono transition-all cursor-pointer",
              children: p.label
            },
            p.id,
            false,
            {
              fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
              lineNumber: 232,
              columnNumber: 15
            },
            this
          ))
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
          lineNumber: 224,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5 font-mono text-xs", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-300 font-bold", children: "Długość X (Wymiar wzdłuż listwy PCIe):" }, void 0, false, {
              fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
              lineNumber: 245,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-300 font-bold bg-zinc-900 px-2.5 py-0.5 rounded border border-zinc-800", children: [
              lengthX,
              " mm"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
              lineNumber: 246,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
            lineNumber: 244,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "range",
              min: 50,
              max: 500,
              step: 1,
              value: lengthX,
              onChange: (e) => handleDimensionsChange(Number(e.target.value), widthY, heightZ),
              className: "w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
              lineNumber: 248,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
          lineNumber: 243,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5 font-mono text-xs", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-300 font-bold", children: "Szerokość Y (Wymiar prostopadły do slotów):" }, void 0, false, {
              fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
              lineNumber: 262,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-indigo-300 font-bold bg-zinc-900 px-2.5 py-0.5 rounded border border-zinc-800", children: [
              widthY,
              " mm"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
              lineNumber: 263,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
            lineNumber: 261,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "range",
              min: 50,
              max: 500,
              step: 1,
              value: widthY,
              onChange: (e) => handleDimensionsChange(lengthX, Number(e.target.value), heightZ),
              className: "w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-400"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
              lineNumber: 265,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
          lineNumber: 260,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5 font-mono text-xs", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-300 font-bold", children: "Wysokość Z (Grubość laminatu i wysokość radiatorów):" }, void 0, false, {
              fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
              lineNumber: 279,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-amber-300 font-bold bg-zinc-900 px-2.5 py-0.5 rounded border border-zinc-800", children: [
              heightZ,
              " mm"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
              lineNumber: 280,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
            lineNumber: 278,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "range",
              min: 5,
              max: 200,
              step: 1,
              value: heightZ,
              onChange: (e) => handleDimensionsChange(lengthX, widthY, Number(e.target.value)),
              className: "w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
              lineNumber: 282,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
          lineNumber: 277,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "relative w-full h-44 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-center overflow-hidden", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:15px_15px] opacity-30" }, void 0, false, {
            fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
            lineNumber: 295,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "div",
            {
              style: {
                width: `${Math.min(260, Math.max(80, lengthX / 500 * 260))}px`,
                height: `${Math.min(130, Math.max(40, widthY / 500 * 130))}px`
              },
              className: "relative border-2 border-cyan-400 bg-cyan-950/40 rounded-xl shadow-lg shadow-cyan-500/20 flex flex-col items-center justify-center p-2 text-center transition-all duration-200",
              children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono font-bold text-white", children: "Strefa Propagacji EM" }, void 0, false, {
                  fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
                  lineNumber: 304,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] font-mono text-cyan-300", children: [
                  lengthX,
                  " × ",
                  widthY,
                  " × ",
                  heightZ,
                  " mm"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
                  lineNumber: 305,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "absolute top-1 right-1 text-[8px] font-mono text-zinc-400", children: [
                  "4D Phase: ",
                  plugin.phaseSpaceDimensions4D.dimPhasePhi,
                  "°"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
                  lineNumber: 306,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
              lineNumber: 297,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
          lineNumber: 294,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
        lineNumber: 214,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-6 rounded-3xl bg-zinc-950/95 border-2 border-zinc-800 p-5 space-y-5 flex flex-col justify-between", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-zinc-800 pb-3 text-xs font-mono", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-200 font-bold flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV(Radio, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
                lineNumber: 316,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "ELEKTRODYNAMICZNE WYMIARY FALOWE (λ, FRESNEL, FRAUNHOFER)" }, void 0, false, {
                fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
                lineNumber: 317,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
              lineNumber: 315,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-emerald-300", children: "Weryfikacja Maxwella" }, void 0, false, {
              fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
              lineNumber: 319,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
            lineNumber: 314,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-3 pt-3 font-mono text-xs", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-400 block font-bold text-[11px]", children: "Częstotliwość Nośna Odniesienia:" }, void 0, false, {
                fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
                lineNumber: 325,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-2 text-[11px]", children: [
                { freq: 7.83, label: "7.83 Hz (ELF Schumann)" },
                { freq: 50, label: "50 Hz (Sieć AC)" },
                { freq: 8e5, label: "800 kHz (VRM PWM)" },
                { freq: 245e7, label: "2.45 GHz (Wnęka RF)" }
              ].map((f) => /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => setSelectedCarrierFreq(f.freq),
                  className: `p-2 rounded-xl border text-left transition-all cursor-pointer ${selectedCarrierFreq === f.freq ? "bg-cyan-950 text-cyan-200 border-cyan-400 font-bold" : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200"}`,
                  children: f.label
                },
                f.freq,
                false,
                {
                  fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
                  lineNumber: 333,
                  columnNumber: 21
                },
                this
              )) }, void 0, false, {
                fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
                lineNumber: 326,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
              lineNumber: 324,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-2 pt-2", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-zinc-900/80 border border-zinc-800", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-zinc-400 block", children: "Długość Fali (λ = c / f):" }, void 0, false, {
                  fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
                  lineNumber: 351,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-sm font-black text-cyan-300 mt-0.5 block", children: selectedCarrierFreq < 100 ? `${(299792458 / selectedCarrierFreq / 1e3).toFixed(1)} km` : `${(299792458 / selectedCarrierFreq).toFixed(4)} m` }, void 0, false, {
                  fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
                  lineNumber: 352,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] text-zinc-500", children: "Prędkość światła c = 299 792 km/s" }, void 0, false, {
                  fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
                  lineNumber: 357,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
                lineNumber: 350,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-zinc-900/80 border border-zinc-800", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-zinc-400 block", children: "Strefa Bliska Fresnela (r < λ/2π):" }, void 0, false, {
                  fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
                  lineNumber: 361,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-sm font-black text-amber-300 mt-0.5 block", children: [
                  plugin.nearFieldFresnelBoundaryMm,
                  " mm"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
                  lineNumber: 362,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] text-zinc-500", children: "Reaktywne pole indukcyjne" }, void 0, false, {
                  fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
                  lineNumber: 365,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
                lineNumber: 360,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-zinc-900/80 border border-zinc-800", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-zinc-400 block", children: "Strefa Daleka Fraunhofera (2D²/λ):" }, void 0, false, {
                  fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
                  lineNumber: 369,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-sm font-black text-indigo-300 mt-0.5 block", children: [
                  plugin.farFieldFraunhoferBoundaryMm,
                  " mm"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
                  lineNumber: 370,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] text-zinc-500", children: "Promieniowanie fal poprzecznych TEM" }, void 0, false, {
                  fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
                  lineNumber: 373,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
                lineNumber: 368,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-zinc-900/80 border border-zinc-800", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-zinc-400 block", children: "Wymiar Przestrzeni Fazowej (4D):" }, void 0, false, {
                  fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
                  lineNumber: 377,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-sm font-black text-purple-300 mt-0.5 block", children: [
                  "[X, Y, Z, ",
                  plugin.phaseSpaceDimensions4D.dimPhasePhi,
                  "°]"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
                  lineNumber: 378,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] text-zinc-500", children: "Kąt przesunięcia fazowego Hilberta" }, void 0, false, {
                  fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
                  lineNumber: 381,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
                lineNumber: 376,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
              lineNumber: 349,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-1.5", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-zinc-400 uppercase font-bold block", children: "Aktywne Kanały Sond Pomiarowych Wtyczki:" }, void 0, false, {
                fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
                lineNumber: 387,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: plugin.activeProbeChannels.map((ch, i) => /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-[11px] text-zinc-300", children: [
                /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-3 h-3 text-emerald-400 shrink-0" }, void 0, false, {
                  fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
                  lineNumber: 391,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: ch }, void 0, false, {
                  fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
                  lineNumber: 392,
                  columnNumber: 23
                }, this)
              ] }, i, true, {
                fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
                lineNumber: 390,
                columnNumber: 21
              }, this)) }, void 0, false, {
                fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
                lineNumber: 388,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
              lineNumber: 386,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
            lineNumber: 322,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
          lineNumber: 313,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "pt-3 border-t border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-400", children: [
          /* @__PURE__ */ jsxDEV("span", { children: [
            "Status synchronizacji wtyczki: ",
            /* @__PURE__ */ jsxDEV("strong", { className: "text-emerald-400", children: plugin.exportStatus }, void 0, false, {
              fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
              lineNumber: 401,
              columnNumber: 50
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
            lineNumber: 401,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: [
            "Ostatni odczyt: ",
            plugin.lastSyncTimestamp
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
            lineNumber: 402,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
          lineNumber: 400,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
        lineNumber: 312,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
      lineNumber: 211,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/DashboardDimensionAnalyzerPlugin.tsx",
    lineNumber: 108,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRhc2hib2FyZERpbWVuc2lvbkFuYWx5emVyUGx1Z2luLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFxuICBTbGlkZXJzLCBMYXllcnMsIEFjdGl2aXR5LCBaYXAsIENwdSwgQ2hlY2tDaXJjbGUyLCBcbiAgQWxlcnRUcmlhbmdsZSwgUmVmcmVzaEN3LCBEb3dubG9hZCwgUmFkaW8sIFNoaWVsZCwgQm94LCBcbiAgTWF4aW1pemUyLCBTaGFyZTIsIENvcm5lckRvd25SaWdodCwgQXJyb3dVcFJpZ2h0LCBHYXVnZSwgTG9jaywgVW5sb2NrXG59IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBlbVdhdmVSZXNvbmFuY2VFbmdpbmUgfSBmcm9tICcuLi91dGlscy9lbVdhdmVSZXNvbmFuY2VFbmdpbmUnO1xuaW1wb3J0IHsgRGFzaGJvYXJkRGltZW5zaW9uUGx1Z2luU3RhdGUgfSBmcm9tICcuLi90eXBlcyc7XG5cbmludGVyZmFjZSBEYXNoYm9hcmREaW1lbnNpb25BbmFseXplclBsdWdpblByb3BzIHtcbiAgb25Ob3RpZnk/OiAobXNnOiBzdHJpbmcpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBjb25zdCBEYXNoYm9hcmREaW1lbnNpb25BbmFseXplclBsdWdpbjogUmVhY3QuRkM8RGFzaGJvYXJkRGltZW5zaW9uQW5hbHl6ZXJQbHVnaW5Qcm9wcz4gPSAoe1xuICBvbk5vdGlmeVxufSkgPT4ge1xuICBjb25zdCBbZW5naW5lU3RhdGUsIHNldEVuZ2luZVN0YXRlXSA9IHVzZVN0YXRlKCgpID0+IGVtV2F2ZVJlc29uYW5jZUVuZ2luZS5nZXRTdGF0ZSgpKTtcbiAgY29uc3QgcGx1Z2luID0gZW5naW5lU3RhdGUucGx1Z2luO1xuXG4gIGNvbnN0IFtsZW5ndGhYLCBzZXRMZW5ndGhYXSA9IHVzZVN0YXRlPG51bWJlcj4ocGx1Z2luLnNwYXRpYWxEaW1lbnNpb25zTW0ubGVuZ3RoWCk7XG4gIGNvbnN0IFt3aWR0aFksIHNldFdpZHRoWV0gPSB1c2VTdGF0ZTxudW1iZXI+KHBsdWdpbi5zcGF0aWFsRGltZW5zaW9uc01tLndpZHRoWSk7XG4gIGNvbnN0IFtoZWlnaHRaLCBzZXRIZWlnaHRaXSA9IHVzZVN0YXRlPG51bWJlcj4ocGx1Z2luLnNwYXRpYWxEaW1lbnNpb25zTW0uaGVpZ2h0Wik7XG4gIGNvbnN0IFtzZWxlY3RlZENhcnJpZXJGcmVxLCBzZXRTZWxlY3RlZENhcnJpZXJGcmVxXSA9IHVzZVN0YXRlPG51bWJlcj4oMjQ1MDAwMDAwMCk7IC8vIDIuNDUgR0h6IGRlZmF1bHRcbiAgY29uc3QgW2NvcGllZENvbmZpZywgc2V0Q29waWVkQ29uZmlnXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHVuc3ViID0gZW1XYXZlUmVzb25hbmNlRW5naW5lLnN1YnNjcmliZSgocykgPT4ge1xuICAgICAgc2V0RW5naW5lU3RhdGUocyk7XG4gICAgfSk7XG4gICAgcmV0dXJuICgpID0+IHVuc3ViKCk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBoYW5kbGVUb2dnbGVDb25uZWN0aW9uID0gKCkgPT4ge1xuICAgIGVtV2F2ZVJlc29uYW5jZUVuZ2luZS50b2dnbGVEYXNoYm9hcmRQbHVnaW5Db25uZWN0aW9uKCk7XG4gICAgY29uc3QgaXNOb3dDb25uZWN0ZWQgPSAhcGx1Z2luLmlzUGx1Z2luQ29ubmVjdGVkO1xuICAgIGlmIChvbk5vdGlmeSkge1xuICAgICAgb25Ob3RpZnkoaXNOb3dDb25uZWN0ZWQgXG4gICAgICAgID8gYPCflIwgV3R5Y3prYSBwb2TFgsSFY3pvbmEgcG9tecWbbG5pZSBkbyBEYXNoYm9hcmR1ICgke3BsdWdpbi5hdHRhY2hlZFNsb3R9KSDigJMgbW9zdGVrIHd5bWlhcsOzdyAzRC80RCBha3R5d255IWAgXG4gICAgICAgIDogJ/Cfm5EgV3R5Y3prYSBEYXNoYm9hcmR1IG9kxYLEhWN6b25hIOKAkyBzenluYSBwb21pYXJvd2EgendvbG5pb25hLicpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVEaW1lbnNpb25zQ2hhbmdlID0gKG5ld1g6IG51bWJlciwgbmV3WTogbnVtYmVyLCBuZXdaOiBudW1iZXIpID0+IHtcbiAgICBzZXRMZW5ndGhYKG5ld1gpO1xuICAgIHNldFdpZHRoWShuZXdZKTtcbiAgICBzZXRIZWlnaHRaKG5ld1opO1xuICAgIGVtV2F2ZVJlc29uYW5jZUVuZ2luZS51cGRhdGVQbHVnaW5EaW1lbnNpb25zKG5ld1gsIG5ld1ksIG5ld1opO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVByZXNldFNlbGVjdCA9IChwcmVzZXQ6ICdBVFgnIHwgJ0lUWCcgfCAnRUFUWCcgfCAnU01BUlRQSE9ORScpID0+IHtcbiAgICBpZiAocHJlc2V0ID09PSAnQVRYJykgaGFuZGxlRGltZW5zaW9uc0NoYW5nZSgzMDUsIDI0NCwgNjUpO1xuICAgIGlmIChwcmVzZXQgPT09ICdJVFgnKSBoYW5kbGVEaW1lbnNpb25zQ2hhbmdlKDE3MCwgMTcwLCA0NSk7XG4gICAgaWYgKHByZXNldCA9PT0gJ0VBVFgnKSBoYW5kbGVEaW1lbnNpb25zQ2hhbmdlKDMwNSwgMzMwLCA4MCk7XG4gICAgaWYgKHByZXNldCA9PT0gJ1NNQVJUUEhPTkUnKSBoYW5kbGVEaW1lbnNpb25zQ2hhbmdlKDE2MCwgNzUsIDkpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUV4cG9ydEpzb24gPSAoKSA9PiB7XG4gICAgY29uc3QganNvblN0ciA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIHBsdWdpbk1ldGFkYXRhOiB7XG4gICAgICAgIG5hbWU6ICdTZW50aW5lbCBEYXNoYm9hcmQgRGltZW5zaW9uIEFuYWx5emVyIFBsdWdpbicsXG4gICAgICAgIHZlcnNpb246IHBsdWdpbi5wbHVnaW5WZXJzaW9uLFxuICAgICAgICBzbG90OiBwbHVnaW4uYXR0YWNoZWRTbG90LFxuICAgICAgICBjb25uZWN0ZWQ6IHBsdWdpbi5pc1BsdWdpbkNvbm5lY3RlZCxcbiAgICAgICAgbGF0ZW5jeU1zOiBwbHVnaW4uY29ubmVjdGlvbkxhdGVuY3lNcyxcbiAgICAgICAgbGFzdFN5bmM6IHBsdWdpbi5sYXN0U3luY1RpbWVzdGFtcFxuICAgICAgfSxcbiAgICAgIHNwYXRpYWxEaW1lbnNpb25zOiBwbHVnaW4uc3BhdGlhbERpbWVuc2lvbnNNbSxcbiAgICAgIHdhdmVFbGVjdHJvZHluYW1pY0RpbWVuc2lvbnM6IHtcbiAgICAgICAgcmVmZXJlbmNlQ2Fycmllckh6OiBzZWxlY3RlZENhcnJpZXJGcmVxLFxuICAgICAgICB3YXZlbGVuZ3RoTGFtYmRhTWV0ZXJzOiBwbHVnaW4ud2F2ZWxlbmd0aExhbWJkYU1ldGVycyxcbiAgICAgICAgbmVhckZpZWxkRnJlc25lbE1tOiBwbHVnaW4ubmVhckZpZWxkRnJlc25lbEJvdW5kYXJ5TW0sXG4gICAgICAgIGZhckZpZWxkRnJhdW5ob2Zlck1tOiBwbHVnaW4uZmFyRmllbGRGcmF1bmhvZmVyQm91bmRhcnlNbSxcbiAgICAgICAgcGhhc2VTcGFjZTREOiBwbHVnaW4ucGhhc2VTcGFjZURpbWVuc2lvbnM0RCxcbiAgICAgICAgbWF4d2VsbFN0cmVzc1RlbnNvck1wYTogcGx1Z2luLm1heHdlbGxTdHJlc3NUZW5zb3JNcGFcbiAgICAgIH0sXG4gICAgICBhY3RpdmVQcm9iZUNoYW5uZWxzOiBwbHVnaW4uYWN0aXZlUHJvYmVDaGFubmVsc1xuICAgIH0sIG51bGwsIDIpO1xuXG4gICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtqc29uU3RyXSwgeyB0eXBlOiAnYXBwbGljYXRpb24vanNvbicgfSk7XG4gICAgY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGEuaHJlZiA9IHVybDtcbiAgICBhLmRvd25sb2FkID0gYFNFTlRJTkVMX0RBU0hCT0FSRF9ESU1FTlNJT05fUExVR0lOX0NPTkZJRy5qc29uYDtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGEpO1xuICAgIGEuY2xpY2soKTtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGEpO1xuICAgIFVSTC5yZXZva2VPYmplY3RVUkwodXJsKTtcblxuICAgIGlmIChvbk5vdGlmeSkgb25Ob3RpZnkoJ/Cfk6UgV3lla3Nwb3J0b3dhbm8ga29uZmlndXJhY2rEmSB3dHljemtpIGRvIHBsaWt1IEpTT04nKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVDb3B5Q29uZmlnID0gKCkgPT4ge1xuICAgIGNvbnN0IHBheWxvYWQgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBzbG90OiBwbHVnaW4uYXR0YWNoZWRTbG90LFxuICAgICAgZGltZW5zaW9uczogcGx1Z2luLnNwYXRpYWxEaW1lbnNpb25zTW0sXG4gICAgICBmcmVzbmVsTW06IHBsdWdpbi5uZWFyRmllbGRGcmVzbmVsQm91bmRhcnlNbSxcbiAgICAgIGZyYXVuaG9mZXJNbTogcGx1Z2luLmZhckZpZWxkRnJhdW5ob2ZlckJvdW5kYXJ5TW0sXG4gICAgICB0ZW5zb3JNcGE6IHBsdWdpbi5tYXh3ZWxsU3RyZXNzVGVuc29yTXBhXG4gICAgfSwgbnVsbCwgMik7XG5cbiAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dChwYXlsb2FkKTtcbiAgICBzZXRDb3BpZWRDb25maWcodHJ1ZSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXRDb3BpZWRDb25maWcoZmFsc2UpLCAyNTAwKTtcbiAgICBpZiAob25Ob3RpZnkpIG9uTm90aWZ5KCfwn5OLIFNrb3Bpb3dhbm8gcGFyYW1ldHJ5IHd0eWN6a2kgZG8gc2Nob3drYScpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgc3BhY2UteS02IHRleHQtd2hpdGVcIj5cbiAgICAgIHsvKiBUb3AgQmFubmVyICYgUGx1Z2luIENvbm5lY3Rpb24gU3RhdHVzICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3VuZGVkLTN4bCBiZy16aW5jLTk1MC85NSBib3JkZXItMiBib3JkZXItY3lhbi01MDAvNDAgcC01IHNtOnAtNiBzaGFkb3ctMnhsIHNwYWNlLXktNFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgbGc6ZmxleC1yb3cgaXRlbXMtc3RhcnQgbGc6aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNCBwYi00IGJvcmRlci1iIGJvcmRlci16aW5jLTgwMFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0zLjVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xMiBoLTEyIHJvdW5kZWQtMnhsIGJnLWdyYWRpZW50LXRvLWJyIGZyb20tY3lhbi05NTAgdmlhLWJsdWUtOTUwIHRvLXppbmMtOTUwIGJvcmRlci0yIGJvcmRlci1jeWFuLTQwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBzaGFkb3ctbGcgc2hhZG93LWN5YW4tNTAwLzIwIHNocmluay0wXCI+XG4gICAgICAgICAgICAgIDxCb3ggY2xhc3NOYW1lPVwidy02IGgtNiB0ZXh0LWN5YW4tMzAwIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGZsZXgtd3JhcFwiPlxuICAgICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LWJhc2Ugc206dGV4dC1sZyBmb250LWJsYWNrIGZvbnQtbW9ubyB0cmFja2luZy10aWdodCB0ZXh0LXdoaXRlIHVwcGVyY2FzZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+V1RZQ1pLQSBQT0TFgcSEQ1pBTkEgRE8gREFTSEJPQVJEVSDigKIgQU5BTElaQVRPUiBXWU1JQVLDk1c8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0yLjUgcHktMC41IHJvdW5kZWQtZnVsbCB0ZXh0LVsxMHB4XSBmb250LW1vbm8gZm9udC1ibGFjayBib3JkZXIgYmctY3lhbi05NTAvODAgYm9yZGVyLWN5YW4tNDAwIHRleHQtY3lhbi0zMDBcIj5cbiAgICAgICAgICAgICAgICAgIEhPVC1QTFVHIOKAoiB7cGx1Z2luLnBsdWdpblZlcnNpb259XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHB4LTIgcHktMC41IHJvdW5kZWQtZnVsbCB0ZXh0LVsxMHB4XSBmb250LW1vbm8gYm9yZGVyIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgJHtcbiAgICAgICAgICAgICAgICAgIHBsdWdpbi5pc1BsdWdpbkNvbm5lY3RlZCBcbiAgICAgICAgICAgICAgICAgICAgPyAnYmctZW1lcmFsZC05NTAvODAgYm9yZGVyLWVtZXJhbGQtNDAwIHRleHQtZW1lcmFsZC0zMDAnIFxuICAgICAgICAgICAgICAgICAgICA6ICdiZy16aW5jLTkwMCBib3JkZXItemluYy03MDAgdGV4dC16aW5jLTQwMCdcbiAgICAgICAgICAgICAgICB9YH0+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2B3LTIgaC0yIHJvdW5kZWQtZnVsbCAke3BsdWdpbi5pc1BsdWdpbkNvbm5lY3RlZCA/ICdiZy1lbWVyYWxkLTQwMCBhbmltYXRlLXBpbmcnIDogJ2JnLXppbmMtNjAwJ31gfSAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+e3BsdWdpbi5pc1BsdWdpbkNvbm5lY3RlZCA/ICdQT0TFgcSEQ1pPTkEgRE8gREFTSEJPQVJEVScgOiAnT0TFgcSEQ1pPTkEgKFNUQU5EQlkpJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXppbmMtNDAwIG10LTAuNVwiPlxuICAgICAgICAgICAgICAgIEFyY2hpdGVrdHVyYSB3dHljemtvd2EgKFBsdWdpbiBCcmlkZ2UpIG1hcHVqxIVjYSByemVjenl3aXN0ZSB3eW1pYXJ5IG9idWRvd3kgaSBwxYJ5dHkgbmEgZ3JhbmljZSBzdHJlZiBGcmVzbmVsYSwgZMWCdWdvxZtjaSBmYWwgJFxcbGFtYmRhJCBpIHRlbnNvcnkgbmFwcsSZxbxlxYQgTWF4d2VsbGEuXG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIFBsdWdpbiBIb3QtUGx1ZyBBY3Rpb24gQnV0dG9ucyAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGZsZXgtd3JhcFwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVUb2dnbGVDb25uZWN0aW9ufVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC00IHB5LTIgcm91bmRlZC14bCB0ZXh0LXhzIGZvbnQtbW9ubyBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgYm9yZGVyIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyIHNoYWRvdy1sZyAke1xuICAgICAgICAgICAgICAgIHBsdWdpbi5pc1BsdWdpbkNvbm5lY3RlZFxuICAgICAgICAgICAgICAgICAgPyAnYmctZW1lcmFsZC05NTAgdGV4dC1lbWVyYWxkLTIwMCBib3JkZXItZW1lcmFsZC00MDAgaG92ZXI6YmctZW1lcmFsZC05MDAnXG4gICAgICAgICAgICAgICAgICA6ICdiZy1jeWFuLTk1MCB0ZXh0LWN5YW4tMjAwIGJvcmRlci1jeWFuLTQwMCBob3ZlcjpiZy1jeWFuLTkwMCBhbmltYXRlLXB1bHNlJ1xuICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3BsdWdpbi5pc1BsdWdpbkNvbm5lY3RlZCA/IDxMb2NrIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz4gOiA8VW5sb2NrIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz59XG4gICAgICAgICAgICAgIDxzcGFuPntwbHVnaW4uaXNQbHVnaW5Db25uZWN0ZWQgPyAnV3R5Y3prYSBQb2TFgsSFY3pvbmEnIDogJ1BvZMWCxIVjeiBXdHljemvEmSBkbyBEYXNoYm9hcmR1J308L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVDb3B5Q29uZmlnfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zLjUgcHktMiByb3VuZGVkLXhsIGJnLXppbmMtOTAwIGhvdmVyOmJnLXppbmMtODAwIGJvcmRlciBib3JkZXItemluYy03MDAgdGV4dC16aW5jLTIwMCB0ZXh0LXhzIGZvbnQtbW9ubyBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgY3Vyc29yLXBvaW50ZXIgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8U2hhcmUyIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtY3lhbi00MDBcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj57Y29waWVkQ29uZmlnID8gJ1Nrb3Bpb3dhbm8hJyA6ICdLb3BpdWogS29uZmlnJ308L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVFeHBvcnRKc29ufVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zLjUgcHktMiByb3VuZGVkLXhsIGJnLXppbmMtOTAwIGhvdmVyOmJnLXppbmMtODAwIGJvcmRlciBib3JkZXItY3lhbi01MDAvNDAgdGV4dC1jeWFuLTMwMCB0ZXh0LXhzIGZvbnQtbW9ubyBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgY3Vyc29yLXBvaW50ZXIgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8RG93bmxvYWQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj5Qb2JpZXJ6IEpTT048L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIExpdmUgU2xvdCAmIENvbW11bmljYXRpb24gS1BJIHRpbGVzICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgc206Z3JpZC1jb2xzLTQgZ2FwLTNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMy41IHJvdW5kZWQtMnhsIGJnLXppbmMtOTAwLzgwIGJvcmRlciBib3JkZXItY3lhbi01MDAvMzBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIHRleHQtemluYy00MDAgdXBwZXJjYXNlXCI+TWFnaXN0cmFsYSBQb8WCxIVjemVuaWEgRGFzaGJvYXJkdTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtYmxhY2sgZm9udC1tb25vIHRleHQtY3lhbi0zMDAgdHJ1bmNhdGUgbXQtMVwiPlxuICAgICAgICAgICAgICB7cGx1Z2luLmF0dGFjaGVkU2xvdH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtZW1lcmFsZC00MDAgZm9udC1tb25vIG10LTAuNVwiPk9ww7PFum5pZW5pZToge3BsdWdpbi5jb25uZWN0aW9uTGF0ZW5jeU1zfSBtczwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMuNSByb3VuZGVkLTJ4bCBiZy16aW5jLTkwMC84MCBib3JkZXIgYm9yZGVyLWluZGlnby01MDAvMzBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIHRleHQtemluYy00MDAgdXBwZXJjYXNlXCI+T2JqxJl0b8WbxIcgR2VvbWV0cnljem5hIDNEPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYmxhY2sgZm9udC1tb25vIHRleHQtaW5kaWdvLTMwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IG10LTAuNVwiPlxuICAgICAgICAgICAgICA8TGF5ZXJzIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1pbmRpZ28tNDAwXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+e3BsdWdpbi5zcGF0aWFsRGltZW5zaW9uc01tLnZvbHVtZUNtM30gY23Cszwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtemluYy00MDAgZm9udC1tb25vIG10LTAuNVwiPntsZW5ndGhYfSDDlyB7d2lkdGhZfSDDlyB7aGVpZ2h0Wn0gbW08L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zLjUgcm91bmRlZC0yeGwgYmctemluYy05MDAvODAgYm9yZGVyIGJvcmRlci1hbWJlci01MDAvMzBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIHRleHQtemluYy00MDAgdXBwZXJjYXNlXCI+R3JhbmljYSBQb2xhIEJsaXNraWVnbyAoRnJlc25lbCk8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ibGFjayBmb250LW1vbm8gdGV4dC1hbWJlci0zMDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgPEdhdWdlIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1hbWJlci00MDBcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj57cGx1Z2luLm5lYXJGaWVsZEZyZXNuZWxCb3VuZGFyeU1tfSBtbTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtYW1iZXItNDAwIGZvbnQtbW9ubyBtdC0wLjVcIj5yICZsdDsgzrsgLyAyz4AgKFNwcnrEmcW8ZW5pZSByZWFrdHl3bmUpPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMy41IHJvdW5kZWQtMnhsIGJnLXppbmMtOTAwLzgwIGJvcmRlciBib3JkZXItcHVycGxlLTUwMC8zMFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC16aW5jLTQwMCB1cHBlcmNhc2VcIj5UZW5zb3IgTmFwcsSZxbxlxYQgTWF4d2VsbGE8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ibGFjayBmb250LW1vbm8gdGV4dC1wdXJwbGUtMzAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgbXQtMC41XCI+XG4gICAgICAgICAgICAgIDxaYXAgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LXB1cnBsZS00MDBcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj57cGx1Z2luLm1heHdlbGxTdHJlc3NUZW5zb3JNcGF9IE1QYTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtZW1lcmFsZC00MDAgZm9udC1tb25vIG10LTAuNVwiPlcgbm9ybWllIGRpZWxla3RyeWN6bmVqIEZSNDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogTWFpbiBEaW1lbnNpb24gQW5hbHlzaXMgJiBDb25maWd1cmF0aW9uIFdvcmtiZW5jaCAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBsZzpncmlkLWNvbHMtMTIgZ2FwLTZcIj5cbiAgICAgICAgXG4gICAgICAgIHsvKiBMZWZ0IENvbHVtbjogSW50ZXJhY3RpdmUgM0QgRGltZW5zaW9uIFNsaWRlcnMgJiBQcmVzZXRzICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTYgcm91bmRlZC0zeGwgYmctemluYy05NTAvOTUgYm9yZGVyLTIgYm9yZGVyLXppbmMtODAwIHAtNSBzcGFjZS15LTVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBib3JkZXItYiBib3JkZXItemluYy04MDAgcGItMyB0ZXh0LXhzIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC16aW5jLTIwMCBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgPFNsaWRlcnMgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWN5YW4tNDAwXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+S0FMSUJSQVRPUiBXWU1JQVLDk1cgUFJaRVNUUlpFTk5ZQ0ggM0QgKFggLyBZIC8gWik8L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXppbmMtNDAwXCI+SmVkbm9zdGtpOiBNaWxpbWV0cnkgW21tXTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBRdWljayBQcmVzZXRzICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgZmxleC13cmFwXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LXppbmMtNDAwIGZvbnQtYm9sZFwiPlN0YW5kYXJkeTo8L3NwYW4+XG4gICAgICAgICAgICB7W1xuICAgICAgICAgICAgICB7IGlkOiAnQVRYJywgbGFiZWw6ICdTdGFuZGFyZCBBVFggKDMwNXgyNDQgbW0pJyB9LFxuICAgICAgICAgICAgICB7IGlkOiAnSVRYJywgbGFiZWw6ICdNaW5pLUlUWCAoMTcweDE3MCBtbSknIH0sXG4gICAgICAgICAgICAgIHsgaWQ6ICdFQVRYJywgbGFiZWw6ICdFLUFUWCBXb3Jrc3RhdGlvbiAoMzA1eDMzMCBtbSknIH0sXG4gICAgICAgICAgICAgIHsgaWQ6ICdTTUFSVFBIT05FJywgbGFiZWw6ICdTbWFydGZvbiAoMTYweDc1IG1tKScgfVxuICAgICAgICAgICAgXS5tYXAoKHApID0+IChcbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGtleT17cC5pZH1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVQcmVzZXRTZWxlY3QocC5pZCBhcyBhbnkpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIuNSBweS0xIHJvdW5kZWQtbGcgYmctemluYy05MDAgYm9yZGVyIGJvcmRlci16aW5jLTgwMCBob3Zlcjpib3JkZXItY3lhbi01MDAvNjAgaG92ZXI6dGV4dC1jeWFuLTMwMCB0ZXh0LXhzIGZvbnQtbW9ubyB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7cC5sYWJlbH1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBTbGlkZXIgWCAoRMWCdWdvxZvEhykgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNSBmb250LW1vbm8gdGV4dC14c1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC16aW5jLTMwMCBmb250LWJvbGRcIj5ExYJ1Z2/Fm8SHIFggKFd5bWlhciB3emTFgnXFvCBsaXN0d3kgUENJZSk6PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWN5YW4tMzAwIGZvbnQtYm9sZCBiZy16aW5jLTkwMCBweC0yLjUgcHktMC41IHJvdW5kZWQgYm9yZGVyIGJvcmRlci16aW5jLTgwMFwiPntsZW5ndGhYfSBtbTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICB0eXBlPVwicmFuZ2VcIiBcbiAgICAgICAgICAgICAgbWluPXs1MH0gXG4gICAgICAgICAgICAgIG1heD17NTAwfSBcbiAgICAgICAgICAgICAgc3RlcD17MX1cbiAgICAgICAgICAgICAgdmFsdWU9e2xlbmd0aFh9IFxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IGhhbmRsZURpbWVuc2lvbnNDaGFuZ2UoTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSwgd2lkdGhZLCBoZWlnaHRaKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGgtMiBiZy16aW5jLTgwMCByb3VuZGVkLWxnIGFwcGVhcmFuY2Utbm9uZSBjdXJzb3ItcG9pbnRlciBhY2NlbnQtY3lhbi00MDBcIiBcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogU2xpZGVyIFkgKFN6ZXJva2/Fm8SHKSAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41IGZvbnQtbW9ubyB0ZXh0LXhzXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXppbmMtMzAwIGZvbnQtYm9sZFwiPlN6ZXJva2/Fm8SHIFkgKFd5bWlhciBwcm9zdG9wYWTFgnkgZG8gc2xvdMOzdyk6PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWluZGlnby0zMDAgZm9udC1ib2xkIGJnLXppbmMtOTAwIHB4LTIuNSBweS0wLjUgcm91bmRlZCBib3JkZXIgYm9yZGVyLXppbmMtODAwXCI+e3dpZHRoWX0gbW08L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgdHlwZT1cInJhbmdlXCIgXG4gICAgICAgICAgICAgIG1pbj17NTB9IFxuICAgICAgICAgICAgICBtYXg9ezUwMH0gXG4gICAgICAgICAgICAgIHN0ZXA9ezF9XG4gICAgICAgICAgICAgIHZhbHVlPXt3aWR0aFl9IFxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IGhhbmRsZURpbWVuc2lvbnNDaGFuZ2UobGVuZ3RoWCwgTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSwgaGVpZ2h0Wil9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBoLTIgYmctemluYy04MDAgcm91bmRlZC1sZyBhcHBlYXJhbmNlLW5vbmUgY3Vyc29yLXBvaW50ZXIgYWNjZW50LWluZGlnby00MDBcIiBcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogU2xpZGVyIFogKFd5c29rb8WbxIcgcHJvZmlsdSkgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNSBmb250LW1vbm8gdGV4dC14c1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC16aW5jLTMwMCBmb250LWJvbGRcIj5XeXNva2/Fm8SHIFogKEdydWJvxZvEhyBsYW1pbmF0dSBpIHd5c29rb8WbxIcgcmFkaWF0b3LDs3cpOjwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1hbWJlci0zMDAgZm9udC1ib2xkIGJnLXppbmMtOTAwIHB4LTIuNSBweS0wLjUgcm91bmRlZCBib3JkZXIgYm9yZGVyLXppbmMtODAwXCI+e2hlaWdodFp9IG1tPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgIHR5cGU9XCJyYW5nZVwiIFxuICAgICAgICAgICAgICBtaW49ezV9IFxuICAgICAgICAgICAgICBtYXg9ezIwMH0gXG4gICAgICAgICAgICAgIHN0ZXA9ezF9XG4gICAgICAgICAgICAgIHZhbHVlPXtoZWlnaHRafSBcbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBoYW5kbGVEaW1lbnNpb25zQ2hhbmdlKGxlbmd0aFgsIHdpZHRoWSwgTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBoLTIgYmctemluYy04MDAgcm91bmRlZC1sZyBhcHBlYXJhbmNlLW5vbmUgY3Vyc29yLXBvaW50ZXIgYWNjZW50LWFtYmVyLTQwMFwiIFxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiAzRCBXaXJlZnJhbWUgUHJldmlldyBCb3ggU2ltdWxhdGlvbiAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIHctZnVsbCBoLTQ0IHJvdW5kZWQtMnhsIGJnLXppbmMtOTAwLzYwIGJvcmRlciBib3JkZXItemluYy04MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgYmctW2xpbmVhci1ncmFkaWVudCh0b19yaWdodCwjMjcyNzJhXzFweCx0cmFuc3BhcmVudF8xcHgpLGxpbmVhci1ncmFkaWVudCh0b19ib3R0b20sIzI3MjcyYV8xcHgsdHJhbnNwYXJlbnRfMXB4KV0gYmctW3NpemU6MTVweF8xNXB4XSBvcGFjaXR5LTMwXCIgLz5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPGRpdiBcbiAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICB3aWR0aDogYCR7TWF0aC5taW4oMjYwLCBNYXRoLm1heCg4MCwgKGxlbmd0aFggLyA1MDApICogMjYwKSl9cHhgLFxuICAgICAgICAgICAgICAgIGhlaWdodDogYCR7TWF0aC5taW4oMTMwLCBNYXRoLm1heCg0MCwgKHdpZHRoWSAvIDUwMCkgKiAxMzApKX1weGAsXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlbGF0aXZlIGJvcmRlci0yIGJvcmRlci1jeWFuLTQwMCBiZy1jeWFuLTk1MC80MCByb3VuZGVkLXhsIHNoYWRvdy1sZyBzaGFkb3ctY3lhbi01MDAvMjAgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC0yIHRleHQtY2VudGVyIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTIwMFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyBmb250LWJvbGQgdGV4dC13aGl0ZVwiPlN0cmVmYSBQcm9wYWdhY2ppIEVNPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIGZvbnQtbW9ubyB0ZXh0LWN5YW4tMzAwXCI+e2xlbmd0aFh9IMOXIHt3aWR0aFl9IMOXIHtoZWlnaHRafSBtbTwvc3Bhbj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMSByaWdodC0xIHRleHQtWzhweF0gZm9udC1tb25vIHRleHQtemluYy00MDBcIj40RCBQaGFzZToge3BsdWdpbi5waGFzZVNwYWNlRGltZW5zaW9uczRELmRpbVBoYXNlUGhpfcKwPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIFJpZ2h0IENvbHVtbjogRWxlY3Ryb2R5bmFtaWMgV2F2ZSBEaW1lbnNpb24gRm9ybXVsYXMgJiBDYWxjdWxhdGlvbnMgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tNiByb3VuZGVkLTN4bCBiZy16aW5jLTk1MC85NSBib3JkZXItMiBib3JkZXItemluYy04MDAgcC01IHNwYWNlLXktNSBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBib3JkZXItYiBib3JkZXItemluYy04MDAgcGItMyB0ZXh0LXhzIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXppbmMtMjAwIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxSYWRpbyBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPkVMRUtUUk9EWU5BTUlDWk5FIFdZTUlBUlkgRkFMT1dFICjOuywgRlJFU05FTCwgRlJBVU5IT0ZFUik8L3NwYW4+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1lbWVyYWxkLTMwMFwiPldlcnlmaWthY2phIE1heHdlbGxhPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zIHB0LTMgZm9udC1tb25vIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgey8qIFJlZmVyZW5jZSBjYXJyaWVyIHNlbGVjdGlvbiAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXppbmMtNDAwIGJsb2NrIGZvbnQtYm9sZCB0ZXh0LVsxMXB4XVwiPkN6xJlzdG90bGl3b8WbxIcgTm/Fm25hIE9kbmllc2llbmlhOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTIgdGV4dC1bMTFweF1cIj5cbiAgICAgICAgICAgICAgICAgIHtbXG4gICAgICAgICAgICAgICAgICAgIHsgZnJlcTogNy44MywgbGFiZWw6ICc3LjgzIEh6IChFTEYgU2NodW1hbm4pJyB9LFxuICAgICAgICAgICAgICAgICAgICB7IGZyZXE6IDUwLjAsIGxhYmVsOiAnNTAgSHogKFNpZcSHIEFDKScgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBmcmVxOiA4MDAwMDAsIGxhYmVsOiAnODAwIGtIeiAoVlJNIFBXTSknIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgZnJlcTogMjQ1MDAwMDAwMCwgbGFiZWw6ICcyLjQ1IEdIeiAoV27EmWthIFJGKScgfSxcbiAgICAgICAgICAgICAgICAgIF0ubWFwKChmKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBrZXk9e2YuZnJlcX1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTZWxlY3RlZENhcnJpZXJGcmVxKGYuZnJlcSl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC0yIHJvdW5kZWQteGwgYm9yZGVyIHRleHQtbGVmdCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciAke1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRDYXJyaWVyRnJlcSA9PT0gZi5mcmVxXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWN5YW4tOTUwIHRleHQtY3lhbi0yMDAgYm9yZGVyLWN5YW4tNDAwIGZvbnQtYm9sZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctemluYy05MDAgdGV4dC16aW5jLTQwMCBib3JkZXItemluYy04MDAgaG92ZXI6dGV4dC16aW5jLTIwMCdcbiAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIHtmLmxhYmVsfVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogQ2FsY3VsYXRlZCBSZXN1bHRzIFRhYmxlICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTIgcHQtMlwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQteGwgYmctemluYy05MDAvODAgYm9yZGVyIGJvcmRlci16aW5jLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC16aW5jLTQwMCBibG9ja1wiPkTFgnVnb8WbxIcgRmFsaSAozrsgPSBjIC8gZik6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJsYWNrIHRleHQtY3lhbi0zMDAgbXQtMC41IGJsb2NrXCI+XG4gICAgICAgICAgICAgICAgICAgIHtzZWxlY3RlZENhcnJpZXJGcmVxIDwgMTAwIFxuICAgICAgICAgICAgICAgICAgICAgID8gYCR7KDI5OTc5MjQ1OCAvIHNlbGVjdGVkQ2FycmllckZyZXEgLyAxMDAwKS50b0ZpeGVkKDEpfSBrbWAgXG4gICAgICAgICAgICAgICAgICAgICAgOiBgJHsoMjk5NzkyNDU4IC8gc2VsZWN0ZWRDYXJyaWVyRnJlcSkudG9GaXhlZCg0KX0gbWB9XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtemluYy01MDBcIj5QcsSZZGtvxZvEhyDFm3dpYXTFgmEgYyA9IDI5OSA3OTIga20vczwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQteGwgYmctemluYy05MDAvODAgYm9yZGVyIGJvcmRlci16aW5jLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC16aW5jLTQwMCBibG9ja1wiPlN0cmVmYSBCbGlza2EgRnJlc25lbGEgKHIgJmx0OyDOuy8yz4ApOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ibGFjayB0ZXh0LWFtYmVyLTMwMCBtdC0wLjUgYmxvY2tcIj5cbiAgICAgICAgICAgICAgICAgICAge3BsdWdpbi5uZWFyRmllbGRGcmVzbmVsQm91bmRhcnlNbX0gbW1cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzlweF0gdGV4dC16aW5jLTUwMFwiPlJlYWt0eXduZSBwb2xlIGluZHVrY3lqbmU8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyByb3VuZGVkLXhsIGJnLXppbmMtOTAwLzgwIGJvcmRlciBib3JkZXItemluYy04MDBcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtemluYy00MDAgYmxvY2tcIj5TdHJlZmEgRGFsZWthIEZyYXVuaG9mZXJhICgyRMKyL867KTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtYmxhY2sgdGV4dC1pbmRpZ28tMzAwIG10LTAuNSBibG9ja1wiPlxuICAgICAgICAgICAgICAgICAgICB7cGx1Z2luLmZhckZpZWxkRnJhdW5ob2ZlckJvdW5kYXJ5TW19IG1tXG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtemluYy01MDBcIj5Qcm9taWVuaW93YW5pZSBmYWwgcG9wcnplY3pueWNoIFRFTTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQteGwgYmctemluYy05MDAvODAgYm9yZGVyIGJvcmRlci16aW5jLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC16aW5jLTQwMCBibG9ja1wiPld5bWlhciBQcnplc3RyemVuaSBGYXpvd2VqICg0RCk6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJsYWNrIHRleHQtcHVycGxlLTMwMCBtdC0wLjUgYmxvY2tcIj5cbiAgICAgICAgICAgICAgICAgICAgW1gsIFksIFosIHtwbHVnaW4ucGhhc2VTcGFjZURpbWVuc2lvbnM0RC5kaW1QaGFzZVBoaX3CsF1cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzlweF0gdGV4dC16aW5jLTUwMFwiPkvEhXQgcHJ6ZXN1bmnEmWNpYSBmYXpvd2VnbyBIaWxiZXJ0YTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIEFjdGl2ZSBTZW5zb3IgUHJvYmUgQ2hhbm5lbHMgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQteGwgYmctemluYy05MDAvNTAgYm9yZGVyIGJvcmRlci16aW5jLTgwMCBzcGFjZS15LTEuNVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtemluYy00MDAgdXBwZXJjYXNlIGZvbnQtYm9sZCBibG9ja1wiPkFrdHl3bmUgS2FuYcWCeSBTb25kIFBvbWlhcm93eWNoIFd0eWN6a2k6PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xXCI+XG4gICAgICAgICAgICAgICAgICB7cGx1Z2luLmFjdGl2ZVByb2JlQ2hhbm5lbHMubWFwKChjaCwgaSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aX0gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1bMTFweF0gdGV4dC16aW5jLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxDaGVja0NpcmNsZTIgY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LWVtZXJhbGQtNDAwIHNocmluay0wXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57Y2h9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdC0zIGJvcmRlci10IGJvcmRlci16aW5jLTgwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC14cyBmb250LW1vbm8gdGV4dC16aW5jLTQwMFwiPlxuICAgICAgICAgICAgPHNwYW4+U3RhdHVzIHN5bmNocm9uaXphY2ppIHd0eWN6a2k6IDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC1lbWVyYWxkLTQwMFwiPntwbHVnaW4uZXhwb3J0U3RhdHVzfTwvc3Ryb25nPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuPk9zdGF0bmkgb2Rjenl0OiB7cGx1Z2luLmxhc3RTeW5jVGltZXN0YW1wfTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdLCJtYXBwaW5ncyI6IkFBaUhjO0FBakhkLFNBQWdCLFVBQVUsaUJBQWlCO0FBQzNDO0FBQUEsRUFDRTtBQUFBLEVBQVM7QUFBQSxFQUFrQjtBQUFBLEVBQVU7QUFBQSxFQUNYO0FBQUEsRUFBVTtBQUFBLEVBQWU7QUFBQSxFQUN4QztBQUFBLEVBQXVDO0FBQUEsRUFBTztBQUFBLEVBQU07QUFBQSxPQUMxRDtBQUNQLFNBQVMsNkJBQTZCO0FBTy9CLGFBQU0sbUNBQW9GLENBQUM7QUFBQSxFQUNoRztBQUNGLE1BQU07QUFDSixRQUFNLENBQUMsYUFBYSxjQUFjLElBQUksU0FBUyxNQUFNLHNCQUFzQixTQUFTLENBQUM7QUFDckYsUUFBTSxTQUFTLFlBQVk7QUFFM0IsUUFBTSxDQUFDLFNBQVMsVUFBVSxJQUFJLFNBQWlCLE9BQU8sb0JBQW9CLE9BQU87QUFDakYsUUFBTSxDQUFDLFFBQVEsU0FBUyxJQUFJLFNBQWlCLE9BQU8sb0JBQW9CLE1BQU07QUFDOUUsUUFBTSxDQUFDLFNBQVMsVUFBVSxJQUFJLFNBQWlCLE9BQU8sb0JBQW9CLE9BQU87QUFDakYsUUFBTSxDQUFDLHFCQUFxQixzQkFBc0IsSUFBSSxTQUFpQixLQUFVO0FBQ2pGLFFBQU0sQ0FBQyxjQUFjLGVBQWUsSUFBSSxTQUFrQixLQUFLO0FBRS9ELFlBQVUsTUFBTTtBQUNkLFVBQU0sUUFBUSxzQkFBc0IsVUFBVSxDQUFDLE1BQU07QUFDbkQscUJBQWUsQ0FBQztBQUFBLElBQ2xCLENBQUM7QUFDRCxXQUFPLE1BQU0sTUFBTTtBQUFBLEVBQ3JCLEdBQUcsQ0FBQyxDQUFDO0FBRUwsUUFBTSx5QkFBeUIsTUFBTTtBQUNuQywwQkFBc0IsZ0NBQWdDO0FBQ3RELFVBQU0saUJBQWlCLENBQUMsT0FBTztBQUMvQixRQUFJLFVBQVU7QUFDWixlQUFTLGlCQUNMLGtEQUFrRCxPQUFPLFlBQVksdUNBQ3JFLDhEQUE4RDtBQUFBLElBQ3BFO0FBQUEsRUFDRjtBQUVBLFFBQU0seUJBQXlCLENBQUMsTUFBYyxNQUFjLFNBQWlCO0FBQzNFLGVBQVcsSUFBSTtBQUNmLGNBQVUsSUFBSTtBQUNkLGVBQVcsSUFBSTtBQUNmLDBCQUFzQix1QkFBdUIsTUFBTSxNQUFNLElBQUk7QUFBQSxFQUMvRDtBQUVBLFFBQU0scUJBQXFCLENBQUMsV0FBa0Q7QUFDNUUsUUFBSSxXQUFXLE1BQU8sd0JBQXVCLEtBQUssS0FBSyxFQUFFO0FBQ3pELFFBQUksV0FBVyxNQUFPLHdCQUF1QixLQUFLLEtBQUssRUFBRTtBQUN6RCxRQUFJLFdBQVcsT0FBUSx3QkFBdUIsS0FBSyxLQUFLLEVBQUU7QUFDMUQsUUFBSSxXQUFXLGFBQWMsd0JBQXVCLEtBQUssSUFBSSxDQUFDO0FBQUEsRUFDaEU7QUFFQSxRQUFNLG1CQUFtQixNQUFNO0FBQzdCLFVBQU0sVUFBVSxLQUFLLFVBQVU7QUFBQSxNQUM3QixnQkFBZ0I7QUFBQSxRQUNkLE1BQU07QUFBQSxRQUNOLFNBQVMsT0FBTztBQUFBLFFBQ2hCLE1BQU0sT0FBTztBQUFBLFFBQ2IsV0FBVyxPQUFPO0FBQUEsUUFDbEIsV0FBVyxPQUFPO0FBQUEsUUFDbEIsVUFBVSxPQUFPO0FBQUEsTUFDbkI7QUFBQSxNQUNBLG1CQUFtQixPQUFPO0FBQUEsTUFDMUIsOEJBQThCO0FBQUEsUUFDNUIsb0JBQW9CO0FBQUEsUUFDcEIsd0JBQXdCLE9BQU87QUFBQSxRQUMvQixvQkFBb0IsT0FBTztBQUFBLFFBQzNCLHNCQUFzQixPQUFPO0FBQUEsUUFDN0IsY0FBYyxPQUFPO0FBQUEsUUFDckIsd0JBQXdCLE9BQU87QUFBQSxNQUNqQztBQUFBLE1BQ0EscUJBQXFCLE9BQU87QUFBQSxJQUM5QixHQUFHLE1BQU0sQ0FBQztBQUVWLFVBQU0sT0FBTyxJQUFJLEtBQUssQ0FBQyxPQUFPLEdBQUcsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzdELFVBQU0sTUFBTSxJQUFJLGdCQUFnQixJQUFJO0FBQ3BDLFVBQU0sSUFBSSxTQUFTLGNBQWMsR0FBRztBQUNwQyxNQUFFLE9BQU87QUFDVCxNQUFFLFdBQVc7QUFDYixhQUFTLEtBQUssWUFBWSxDQUFDO0FBQzNCLE1BQUUsTUFBTTtBQUNSLGFBQVMsS0FBSyxZQUFZLENBQUM7QUFDM0IsUUFBSSxnQkFBZ0IsR0FBRztBQUV2QixRQUFJLFNBQVUsVUFBUyxzREFBc0Q7QUFBQSxFQUMvRTtBQUVBLFFBQU0sbUJBQW1CLE1BQU07QUFDN0IsVUFBTSxVQUFVLEtBQUssVUFBVTtBQUFBLE1BQzdCLE1BQU0sT0FBTztBQUFBLE1BQ2IsWUFBWSxPQUFPO0FBQUEsTUFDbkIsV0FBVyxPQUFPO0FBQUEsTUFDbEIsY0FBYyxPQUFPO0FBQUEsTUFDckIsV0FBVyxPQUFPO0FBQUEsSUFDcEIsR0FBRyxNQUFNLENBQUM7QUFFVixjQUFVLFVBQVUsVUFBVSxPQUFPO0FBQ3JDLG9CQUFnQixJQUFJO0FBQ3BCLGVBQVcsTUFBTSxnQkFBZ0IsS0FBSyxHQUFHLElBQUk7QUFDN0MsUUFBSSxTQUFVLFVBQVMsNENBQTRDO0FBQUEsRUFDckU7QUFFQSxTQUNFLHVCQUFDLFNBQUksV0FBVSwrQkFFYjtBQUFBLDJCQUFDLFNBQUksV0FBVSwwRkFDYjtBQUFBLDZCQUFDLFNBQUksV0FBVSw2R0FDYjtBQUFBLCtCQUFDLFNBQUksV0FBVSxpQ0FDYjtBQUFBLGlDQUFDLFNBQUksV0FBVSxrTEFDYixpQ0FBQyxPQUFJLFdBQVUseUNBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBcUQsS0FEdkQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFFQTtBQUFBLFVBQ0EsdUJBQUMsU0FDQztBQUFBLG1DQUFDLFNBQUksV0FBVSxxQ0FDYjtBQUFBLHFDQUFDLFFBQUcsV0FBVSx5R0FDWixpQ0FBQyxVQUFLLHNFQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQTRELEtBRDlEO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBRUE7QUFBQSxjQUNBLHVCQUFDLFVBQUssV0FBVSxtSEFBa0g7QUFBQTtBQUFBLGdCQUNwSCxPQUFPO0FBQUEsbUJBRHJCO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBRUE7QUFBQSxjQUNBLHVCQUFDLFVBQUssV0FBVyxtRkFDZixPQUFPLG9CQUNILDBEQUNBLDJDQUNOLElBQ0U7QUFBQSx1Q0FBQyxVQUFLLFdBQVcsd0JBQXdCLE9BQU8sb0JBQW9CLGdDQUFnQyxhQUFhLE1BQWpIO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQXFIO0FBQUEsZ0JBQ3JILHVCQUFDLFVBQU0saUJBQU8sb0JBQW9CLDZCQUE2Qix5QkFBL0Q7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBcUY7QUFBQSxtQkFOdkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFPQTtBQUFBLGlCQWRGO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBZUE7QUFBQSxZQUNBLHVCQUFDLE9BQUUsV0FBVSxnQ0FBK0IsbUxBQTVDO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRUE7QUFBQSxlQW5CRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQW9CQTtBQUFBLGFBeEJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUF5QkE7QUFBQSxRQUdBLHVCQUFDLFNBQUksV0FBVSxxQ0FDYjtBQUFBO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FDQyxTQUFTO0FBQUEsY0FDVCxXQUFXLDJIQUNULE9BQU8sb0JBQ0gsNEVBQ0EsMkVBQ047QUFBQSxjQUVDO0FBQUEsdUJBQU8sb0JBQW9CLHVCQUFDLFFBQUssV0FBVSxpQkFBaEI7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBOEIsSUFBSyx1QkFBQyxVQUFPLFdBQVUsaUJBQWxCO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQWdDO0FBQUEsZ0JBQy9GLHVCQUFDLFVBQU0saUJBQU8sb0JBQW9CLHVCQUF1QixtQ0FBekQ7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBeUY7QUFBQTtBQUFBO0FBQUEsWUFUM0Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBVUE7QUFBQSxVQUVBO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FDQyxTQUFTO0FBQUEsY0FDVCxXQUFVO0FBQUEsY0FFVjtBQUFBLHVDQUFDLFVBQU8sV0FBVSwrQkFBbEI7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBOEM7QUFBQSxnQkFDOUMsdUJBQUMsVUFBTSx5QkFBZSxnQkFBZ0IsbUJBQXRDO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQXNEO0FBQUE7QUFBQTtBQUFBLFlBTHhEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQU1BO0FBQUEsVUFFQTtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsU0FBUztBQUFBLGNBQ1QsV0FBVTtBQUFBLGNBRVY7QUFBQSx1Q0FBQyxZQUFTLFdBQVUsaUJBQXBCO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQWtDO0FBQUEsZ0JBQ2xDLHVCQUFDLFVBQUssNEJBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBa0I7QUFBQTtBQUFBO0FBQUEsWUFMcEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBTUE7QUFBQSxhQTNCRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBNEJBO0FBQUEsV0F6REY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQTBEQTtBQUFBLE1BR0EsdUJBQUMsU0FBSSxXQUFVLHlDQUNiO0FBQUEsK0JBQUMsU0FBSSxXQUFVLDhEQUNiO0FBQUEsaUNBQUMsU0FBSSxXQUFVLGlEQUFnRCxnREFBL0Q7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBK0Y7QUFBQSxVQUMvRix1QkFBQyxTQUFJLFdBQVUsNERBQ1osaUJBQU8sZ0JBRFY7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFFQTtBQUFBLFVBQ0EsdUJBQUMsU0FBSSxXQUFVLGdEQUErQztBQUFBO0FBQUEsWUFBYSxPQUFPO0FBQUEsWUFBb0I7QUFBQSxlQUF0RztBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUF5RztBQUFBLGFBTDNHO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFNQTtBQUFBLFFBRUEsdUJBQUMsU0FBSSxXQUFVLGdFQUNiO0FBQUEsaUNBQUMsU0FBSSxXQUFVLGlEQUFnRCx3Q0FBL0Q7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBdUY7QUFBQSxVQUN2Rix1QkFBQyxTQUFJLFdBQVUsa0ZBQ2I7QUFBQSxtQ0FBQyxVQUFPLFdBQVUsNkJBQWxCO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQTRDO0FBQUEsWUFDNUMsdUJBQUMsVUFBTTtBQUFBLHFCQUFPLG9CQUFvQjtBQUFBLGNBQVU7QUFBQSxpQkFBNUM7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBZ0Q7QUFBQSxlQUZsRDtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUdBO0FBQUEsVUFDQSx1QkFBQyxTQUFJLFdBQVUsNkNBQTZDO0FBQUE7QUFBQSxZQUFRO0FBQUEsWUFBSTtBQUFBLFlBQU87QUFBQSxZQUFJO0FBQUEsWUFBUTtBQUFBLGVBQTNGO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQThGO0FBQUEsYUFOaEc7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQU9BO0FBQUEsUUFFQSx1QkFBQyxTQUFJLFdBQVUsK0RBQ2I7QUFBQSxpQ0FBQyxTQUFJLFdBQVUsaURBQWdELGdEQUEvRDtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUErRjtBQUFBLFVBQy9GLHVCQUFDLFNBQUksV0FBVSxpRkFDYjtBQUFBLG1DQUFDLFNBQU0sV0FBVSw0QkFBakI7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBMEM7QUFBQSxZQUMxQyx1QkFBQyxVQUFNO0FBQUEscUJBQU87QUFBQSxjQUEyQjtBQUFBLGlCQUF6QztBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUE0QztBQUFBLGVBRjlDO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBR0E7QUFBQSxVQUNBLHVCQUFDLFNBQUksV0FBVSw4Q0FBNkMsaURBQTVEO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQWdHO0FBQUEsYUFObEc7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQU9BO0FBQUEsUUFFQSx1QkFBQyxTQUFJLFdBQVUsZ0VBQ2I7QUFBQSxpQ0FBQyxTQUFJLFdBQVUsaURBQWdELHdDQUEvRDtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUF1RjtBQUFBLFVBQ3ZGLHVCQUFDLFNBQUksV0FBVSxrRkFDYjtBQUFBLG1DQUFDLE9BQUksV0FBVSw2QkFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUF5QztBQUFBLFlBQ3pDLHVCQUFDLFVBQU07QUFBQSxxQkFBTztBQUFBLGNBQXVCO0FBQUEsaUJBQXJDO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQXlDO0FBQUEsZUFGM0M7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFHQTtBQUFBLFVBQ0EsdUJBQUMsU0FBSSxXQUFVLGdEQUErQywyQ0FBOUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBeUY7QUFBQSxhQU4zRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBT0E7QUFBQSxXQWxDRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBbUNBO0FBQUEsU0FqR0Y7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQWtHQTtBQUFBLElBR0EsdUJBQUMsU0FBSSxXQUFVLDBDQUdiO0FBQUEsNkJBQUMsU0FBSSxXQUFVLG1GQUNiO0FBQUEsK0JBQUMsU0FBSSxXQUFVLHFGQUNiO0FBQUEsaUNBQUMsVUFBSyxXQUFVLG1EQUNkO0FBQUEsbUNBQUMsV0FBUSxXQUFVLDJCQUFuQjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUEyQztBQUFBLFlBQzNDLHVCQUFDLFVBQUssaUVBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBdUQ7QUFBQSxlQUZ6RDtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUdBO0FBQUEsVUFDQSx1QkFBQyxVQUFLLFdBQVUsNkJBQTRCLHlDQUE1QztBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFxRTtBQUFBLGFBTHZFO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFNQTtBQUFBLFFBR0EsdUJBQUMsU0FBSSxXQUFVLHFDQUNiO0FBQUEsaUNBQUMsVUFBSyxXQUFVLDZDQUE0QywwQkFBNUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBc0U7QUFBQSxVQUNyRTtBQUFBLFlBQ0MsRUFBRSxJQUFJLE9BQU8sT0FBTyw0QkFBNEI7QUFBQSxZQUNoRCxFQUFFLElBQUksT0FBTyxPQUFPLHdCQUF3QjtBQUFBLFlBQzVDLEVBQUUsSUFBSSxRQUFRLE9BQU8saUNBQWlDO0FBQUEsWUFDdEQsRUFBRSxJQUFJLGNBQWMsT0FBTyx1QkFBdUI7QUFBQSxVQUNwRCxFQUFFLElBQUksQ0FBQyxNQUNMO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FFQyxTQUFTLE1BQU0sbUJBQW1CLEVBQUUsRUFBUztBQUFBLGNBQzdDLFdBQVU7QUFBQSxjQUVULFlBQUU7QUFBQTtBQUFBLFlBSkUsRUFBRTtBQUFBLFlBRFQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQU1BLENBQ0Q7QUFBQSxhQWZIO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFnQkE7QUFBQSxRQUdBLHVCQUFDLFNBQUksV0FBVSxpQ0FDYjtBQUFBLGlDQUFDLFNBQUksV0FBVSxxQ0FDYjtBQUFBLG1DQUFDLFVBQUssV0FBVSwyQkFBMEIsc0RBQTFDO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQWdGO0FBQUEsWUFDaEYsdUJBQUMsVUFBSyxXQUFVLG9GQUFvRjtBQUFBO0FBQUEsY0FBUTtBQUFBLGlCQUE1RztBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUErRztBQUFBLGVBRmpIO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBR0E7QUFBQSxVQUNBO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FDQyxNQUFLO0FBQUEsY0FDTCxLQUFLO0FBQUEsY0FDTCxLQUFLO0FBQUEsY0FDTCxNQUFNO0FBQUEsY0FDTixPQUFPO0FBQUEsY0FDUCxVQUFVLENBQUMsTUFBTSx1QkFBdUIsT0FBTyxFQUFFLE9BQU8sS0FBSyxHQUFHLFFBQVEsT0FBTztBQUFBLGNBQy9FLFdBQVU7QUFBQTtBQUFBLFlBUFo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBUUE7QUFBQSxhQWJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFjQTtBQUFBLFFBR0EsdUJBQUMsU0FBSSxXQUFVLGlDQUNiO0FBQUEsaUNBQUMsU0FBSSxXQUFVLHFDQUNiO0FBQUEsbUNBQUMsVUFBSyxXQUFVLDJCQUEwQiwyREFBMUM7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBcUY7QUFBQSxZQUNyRix1QkFBQyxVQUFLLFdBQVUsc0ZBQXNGO0FBQUE7QUFBQSxjQUFPO0FBQUEsaUJBQTdHO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQWdIO0FBQUEsZUFGbEg7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFHQTtBQUFBLFVBQ0E7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLE1BQUs7QUFBQSxjQUNMLEtBQUs7QUFBQSxjQUNMLEtBQUs7QUFBQSxjQUNMLE1BQU07QUFBQSxjQUNOLE9BQU87QUFBQSxjQUNQLFVBQVUsQ0FBQyxNQUFNLHVCQUF1QixTQUFTLE9BQU8sRUFBRSxPQUFPLEtBQUssR0FBRyxPQUFPO0FBQUEsY0FDaEYsV0FBVTtBQUFBO0FBQUEsWUFQWjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFRQTtBQUFBLGFBYkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQWNBO0FBQUEsUUFHQSx1QkFBQyxTQUFJLFdBQVUsaUNBQ2I7QUFBQSxpQ0FBQyxTQUFJLFdBQVUscUNBQ2I7QUFBQSxtQ0FBQyxVQUFLLFdBQVUsMkJBQTBCLG9FQUExQztBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUE4RjtBQUFBLFlBQzlGLHVCQUFDLFVBQUssV0FBVSxxRkFBcUY7QUFBQTtBQUFBLGNBQVE7QUFBQSxpQkFBN0c7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBZ0g7QUFBQSxlQUZsSDtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUdBO0FBQUEsVUFDQTtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsTUFBSztBQUFBLGNBQ0wsS0FBSztBQUFBLGNBQ0wsS0FBSztBQUFBLGNBQ0wsTUFBTTtBQUFBLGNBQ04sT0FBTztBQUFBLGNBQ1AsVUFBVSxDQUFDLE1BQU0sdUJBQXVCLFNBQVMsUUFBUSxPQUFPLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFBQSxjQUMvRSxXQUFVO0FBQUE7QUFBQSxZQVBaO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQVFBO0FBQUEsYUFiRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBY0E7QUFBQSxRQUdBLHVCQUFDLFNBQUksV0FBVSwySEFDYjtBQUFBLGlDQUFDLFNBQUksV0FBVSx1S0FBZjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFtTDtBQUFBLFVBRW5MO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FDQyxPQUFPO0FBQUEsZ0JBQ0wsT0FBTyxHQUFHLEtBQUssSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFLLFVBQVUsTUFBTyxHQUFHLENBQUMsQ0FBQztBQUFBLGdCQUM1RCxRQUFRLEdBQUcsS0FBSyxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUssU0FBUyxNQUFPLEdBQUcsQ0FBQyxDQUFDO0FBQUEsY0FDOUQ7QUFBQSxjQUNBLFdBQVU7QUFBQSxjQUVWO0FBQUEsdUNBQUMsVUFBSyxXQUFVLDhDQUE2QyxvQ0FBN0Q7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBaUY7QUFBQSxnQkFDakYsdUJBQUMsVUFBSyxXQUFVLHNDQUFzQztBQUFBO0FBQUEsa0JBQVE7QUFBQSxrQkFBSTtBQUFBLGtCQUFPO0FBQUEsa0JBQUk7QUFBQSxrQkFBUTtBQUFBLHFCQUFyRjtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUF3RjtBQUFBLGdCQUN4Rix1QkFBQyxTQUFJLFdBQVUsNkRBQTREO0FBQUE7QUFBQSxrQkFBVyxPQUFPLHVCQUF1QjtBQUFBLGtCQUFZO0FBQUEscUJBQWhJO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQWlJO0FBQUE7QUFBQTtBQUFBLFlBVG5JO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQVVBO0FBQUEsYUFiRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBY0E7QUFBQSxXQTlGRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBK0ZBO0FBQUEsTUFHQSx1QkFBQyxTQUFJLFdBQVUsaUhBQ2I7QUFBQSwrQkFBQyxTQUNDO0FBQUEsaUNBQUMsU0FBSSxXQUFVLHFGQUNiO0FBQUEsbUNBQUMsVUFBSyxXQUFVLG1EQUNkO0FBQUEscUNBQUMsU0FBTSxXQUFVLDhCQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUE0QztBQUFBLGNBQzVDLHVCQUFDLFVBQUsseUVBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBK0Q7QUFBQSxpQkFGakU7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFHQTtBQUFBLFlBQ0EsdUJBQUMsVUFBSyxXQUFVLGdDQUErQixvQ0FBL0M7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBbUU7QUFBQSxlQUxyRTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQU1BO0FBQUEsVUFFQSx1QkFBQyxTQUFJLFdBQVUsb0NBRWI7QUFBQSxtQ0FBQyxTQUFJLFdBQVUsYUFDYjtBQUFBLHFDQUFDLFVBQUssV0FBVSw2Q0FBNEMsZ0RBQTVEO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQTRGO0FBQUEsY0FDNUYsdUJBQUMsU0FBSSxXQUFVLHNDQUNaO0FBQUEsZ0JBQ0MsRUFBRSxNQUFNLE1BQU0sT0FBTyx5QkFBeUI7QUFBQSxnQkFDOUMsRUFBRSxNQUFNLElBQU0sT0FBTyxrQkFBa0I7QUFBQSxnQkFDdkMsRUFBRSxNQUFNLEtBQVEsT0FBTyxvQkFBb0I7QUFBQSxnQkFDM0MsRUFBRSxNQUFNLE9BQVksT0FBTyxzQkFBc0I7QUFBQSxjQUNuRCxFQUFFLElBQUksQ0FBQyxNQUNMO0FBQUEsZ0JBQUM7QUFBQTtBQUFBLGtCQUVDLFNBQVMsTUFBTSx1QkFBdUIsRUFBRSxJQUFJO0FBQUEsa0JBQzVDLFdBQVcsaUVBQ1Qsd0JBQXdCLEVBQUUsT0FDdEIsd0RBQ0EsK0RBQ047QUFBQSxrQkFFQyxZQUFFO0FBQUE7QUFBQSxnQkFSRSxFQUFFO0FBQUEsZ0JBRFQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxjQVVBLENBQ0QsS0FsQkg7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFtQkE7QUFBQSxpQkFyQkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFzQkE7QUFBQSxZQUdBLHVCQUFDLFNBQUksV0FBVSwrQkFDYjtBQUFBLHFDQUFDLFNBQUksV0FBVSx3REFDYjtBQUFBLHVDQUFDLFVBQUssV0FBVSxtQ0FBa0MseUNBQWxEO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQTJFO0FBQUEsZ0JBQzNFLHVCQUFDLFVBQUssV0FBVSxpREFDYixnQ0FBc0IsTUFDbkIsSUFBSSxZQUFZLHNCQUFzQixLQUFNLFFBQVEsQ0FBQyxDQUFDLFFBQ3RELElBQUksWUFBWSxxQkFBcUIsUUFBUSxDQUFDLENBQUMsUUFIckQ7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFJQTtBQUFBLGdCQUNBLHVCQUFDLFVBQUssV0FBVSw0QkFBMkIsaURBQTNDO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQTRFO0FBQUEsbUJBUDlFO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBUUE7QUFBQSxjQUVBLHVCQUFDLFNBQUksV0FBVSx3REFDYjtBQUFBLHVDQUFDLFVBQUssV0FBVSxtQ0FBa0Msa0RBQWxEO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQXVGO0FBQUEsZ0JBQ3ZGLHVCQUFDLFVBQUssV0FBVSxrREFDYjtBQUFBLHlCQUFPO0FBQUEsa0JBQTJCO0FBQUEscUJBRHJDO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBRUE7QUFBQSxnQkFDQSx1QkFBQyxVQUFLLFdBQVUsNEJBQTJCLHlDQUEzQztBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUFvRTtBQUFBLG1CQUx0RTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQU1BO0FBQUEsY0FFQSx1QkFBQyxTQUFJLFdBQVUsd0RBQ2I7QUFBQSx1Q0FBQyxVQUFLLFdBQVUsbUNBQWtDLGtEQUFsRDtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUFvRjtBQUFBLGdCQUNwRix1QkFBQyxVQUFLLFdBQVUsbURBQ2I7QUFBQSx5QkFBTztBQUFBLGtCQUE2QjtBQUFBLHFCQUR2QztBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUVBO0FBQUEsZ0JBQ0EsdUJBQUMsVUFBSyxXQUFVLDRCQUEyQixtREFBM0M7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBOEU7QUFBQSxtQkFMaEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFNQTtBQUFBLGNBRUEsdUJBQUMsU0FBSSxXQUFVLHdEQUNiO0FBQUEsdUNBQUMsVUFBSyxXQUFVLG1DQUFrQyxnREFBbEQ7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBa0Y7QUFBQSxnQkFDbEYsdUJBQUMsVUFBSyxXQUFVLG1EQUFrRDtBQUFBO0FBQUEsa0JBQ3JELE9BQU8sdUJBQXVCO0FBQUEsa0JBQVk7QUFBQSxxQkFEdkQ7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFFQTtBQUFBLGdCQUNBLHVCQUFDLFVBQUssV0FBVSw0QkFBMkIsa0RBQTNDO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQTZFO0FBQUEsbUJBTC9FO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBTUE7QUFBQSxpQkFqQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFrQ0E7QUFBQSxZQUdBLHVCQUFDLFNBQUksV0FBVSxvRUFDYjtBQUFBLHFDQUFDLFVBQUssV0FBVSx1REFBc0Qsd0RBQXRFO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQThHO0FBQUEsY0FDOUcsdUJBQUMsU0FBSSxXQUFVLGFBQ1osaUJBQU8sb0JBQW9CLElBQUksQ0FBQyxJQUFJLE1BQ25DLHVCQUFDLFNBQVksV0FBVSxxREFDckI7QUFBQSx1Q0FBQyxnQkFBYSxXQUFVLHVDQUF4QjtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUE0RDtBQUFBLGdCQUM1RCx1QkFBQyxVQUFNLGdCQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQVU7QUFBQSxtQkFGRixHQUFWO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBR0EsQ0FDRCxLQU5IO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBT0E7QUFBQSxpQkFURjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQVVBO0FBQUEsZUExRUY7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkEyRUE7QUFBQSxhQXBGRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBcUZBO0FBQUEsUUFFQSx1QkFBQyxTQUFJLFdBQVUsbUdBQ2I7QUFBQSxpQ0FBQyxVQUFLO0FBQUE7QUFBQSxZQUErQix1QkFBQyxZQUFPLFdBQVUsb0JBQW9CLGlCQUFPLGdCQUE3QztBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUEwRDtBQUFBLGVBQS9GO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQXdHO0FBQUEsVUFDeEcsdUJBQUMsVUFBSztBQUFBO0FBQUEsWUFBaUIsT0FBTztBQUFBLGVBQTlCO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQWdEO0FBQUEsYUFGbEQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUdBO0FBQUEsV0EzRkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQTRGQTtBQUFBLFNBak1GO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FtTUE7QUFBQSxPQTFTRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBMlNBO0FBRUo7IiwibmFtZXMiOltdfQ==