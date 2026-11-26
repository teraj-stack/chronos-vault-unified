import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"];
import {
  Activity,
  Zap,
  Shield,
  Cpu,
  Gauge,
  AlertTriangle,
  Play,
  Pause,
  Crosshair,
  Sliders,
  Layers,
  Waves,
  ShieldAlert,
  Sparkles,
  Eye
} from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from "/sentinel-shield/node_modules/.vite/deps/recharts.js?v=aa2b2d0c";
import { pciTelemetryEngine } from "/sentinel-shield/src/utils/pciTelemetryEngine.ts";
import { EmWaveResonanceSuperpositionSystem } from "/sentinel-shield/src/components/EmWaveResonanceSuperpositionSystem.tsx";
import { DashboardDimensionAnalyzerPlugin } from "/sentinel-shield/src/components/DashboardDimensionAnalyzerPlugin.tsx";
import { CerebellumWaveWellbeingChart } from "/sentinel-shield/src/components/CerebellumWaveWellbeingChart.tsx";
import { ComprehensiveWaveEnergyReport } from "/sentinel-shield/src/components/ComprehensiveWaveEnergyReport.tsx";
export const PciHardwareTelemetryMonitor = ({
  onNotify,
  defaultSubModule = "EM_WAVES"
}) => {
  const [activeSubModule, setActiveSubModule] = useState(defaultSubModule);
  const [telemetryState, setTelemetryState] = useState(() => pciTelemetryEngine.getState());
  const [selectedConnectorId, setSelectedConnectorId] = useState("ALL");
  const [selectedMetric, setSelectedMetric] = useState("voltage");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [showCoordinates, setShowCoordinates] = useState(true);
  const [hoveredPointCoords, setHoveredPointCoords] = useState(null);
  useEffect(() => {
    const unsub = pciTelemetryEngine.subscribe((newState) => {
      setTelemetryState(newState);
    });
    return () => unsub();
  }, []);
  const handleToggleStreaming = () => {
    pciTelemetryEngine.toggleStreaming();
    if (onNotify) {
      onNotify(telemetryState.isStreaming ? "⏸️ Zatrzymano strumieniowanie oscyloskopu" : "▶️ Wznowiono próbkowanie w czasie rzeczywistym (500 Hz)");
    }
  };
  const handleApplyGrounding = (connId) => {
    pciTelemetryEngine.applyHardwareGroundingClamping(connId);
    if (onNotify) {
      onNotify("⚡ Zastosowano uziemienie ekranujące & tłumienie harmonicznych na szynie");
    }
  };
  const handleInjectTestPulse = () => {
    pciTelemetryEngine.injectTestHarmonicPulse(selectedConnectorId === "ALL" ? "conn-pcie-1" : selectedConnectorId);
    if (onNotify) {
      onNotify("⚠️ Wstrzyknięto impuls testowy rezonansu pola elektromagnetycznego");
    }
  };
  const filteredConnectors = telemetryState.connectors.filter((c) => {
    if (selectedCategory !== "ALL" && c.category !== selectedCategory) return false;
    if (selectedConnectorId !== "ALL" && c.id !== selectedConnectorId) return false;
    return true;
  });
  const selectedSingleConnector = telemetryState.connectors.find((c) => c.id === selectedConnectorId);
  const chartData = telemetryState.globalOscilloscopeHistory;
  return /* @__PURE__ */ jsxDEV("div", { className: "w-full space-y-6 text-white", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "rounded-2xl bg-zinc-950/95 border-2 border-indigo-500/30 p-2 sm:p-2.5 shadow-2xl flex items-center justify-between gap-2 overflow-x-auto", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 sm:gap-2 flex-nowrap sm:flex-wrap", children: [
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveSubModule("EM_WAVES"),
          className: `px-3 sm:px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 border transition-all cursor-pointer whitespace-nowrap ${activeSubModule === "EM_WAVES" ? "bg-indigo-950 text-indigo-200 border-indigo-400 shadow-lg shadow-indigo-950" : "bg-zinc-900/90 text-zinc-400 border-zinc-800 hover:text-zinc-200"}`,
          children: [
            /* @__PURE__ */ jsxDEV(Waves, { className: "w-4 h-4 text-indigo-400" }, void 0, false, {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 102,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "🌊 Fale EM, Superpozycja & Znoszenie Rezonansu" }, void 0, false, {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 103,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
          lineNumber: 94,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveSubModule("CEREBELLUM"),
          className: `px-3 sm:px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 border transition-all cursor-pointer whitespace-nowrap ${activeSubModule === "CEREBELLUM" ? "bg-emerald-950 text-emerald-200 border-emerald-400 shadow-lg shadow-emerald-950" : "bg-zinc-900/90 text-zinc-400 border-zinc-800 hover:text-zinc-200"}`,
          children: [
            /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 114,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "🧠 Wykres Wpływu na Móżdżek & Samopoczucie" }, void 0, false, {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 115,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
          lineNumber: 106,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveSubModule("DASH_PLUGIN"),
          className: `px-3 sm:px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 border transition-all cursor-pointer whitespace-nowrap ${activeSubModule === "DASH_PLUGIN" ? "bg-cyan-950 text-cyan-200 border-cyan-400 shadow-lg shadow-cyan-950" : "bg-zinc-900/90 text-zinc-400 border-zinc-800 hover:text-zinc-200"}`,
          children: [
            /* @__PURE__ */ jsxDEV(Layers, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 126,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "🔌 Wtyczka Wymiarów do Dashboardu" }, void 0, false, {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 127,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
          lineNumber: 118,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveSubModule("PCI_CONNECTORS"),
          className: `px-3 sm:px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 border transition-all cursor-pointer whitespace-nowrap ${activeSubModule === "PCI_CONNECTORS" ? "bg-blue-950 text-blue-200 border-blue-400 shadow-lg shadow-blue-950" : "bg-zinc-900/90 text-zinc-400 border-zinc-800 hover:text-zinc-200"}`,
          children: [
            /* @__PURE__ */ jsxDEV(Activity, { className: "w-4 h-4 text-blue-400" }, void 0, false, {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 138,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "⚡ Złącza & Listwy PCI (Wykres)" }, void 0, false, {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 139,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
          lineNumber: 130,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveSubModule("REPORT"),
          className: `px-3 sm:px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 border transition-all cursor-pointer whitespace-nowrap ${activeSubModule === "REPORT" ? "bg-amber-950 text-amber-200 border-amber-400 shadow-lg shadow-amber-950" : "bg-zinc-900/90 text-zinc-400 border-zinc-800 hover:text-zinc-200"}`,
          children: [
            /* @__PURE__ */ jsxDEV(ShieldAlert, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 150,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "📜 Obszerny Raport: Fale & Hiperbolizacja" }, void 0, false, {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 151,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
          lineNumber: 142,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
      lineNumber: 93,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
      lineNumber: 92,
      columnNumber: 7
    }, this),
    activeSubModule === "EM_WAVES" && /* @__PURE__ */ jsxDEV(EmWaveResonanceSuperpositionSystem, { onNotify }, void 0, false, {
      fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
      lineNumber: 158,
      columnNumber: 9
    }, this),
    activeSubModule === "CEREBELLUM" && /* @__PURE__ */ jsxDEV(CerebellumWaveWellbeingChart, { onNotify }, void 0, false, {
      fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
      lineNumber: 162,
      columnNumber: 9
    }, this),
    activeSubModule === "DASH_PLUGIN" && /* @__PURE__ */ jsxDEV(DashboardDimensionAnalyzerPlugin, { onNotify }, void 0, false, {
      fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
      lineNumber: 166,
      columnNumber: 9
    }, this),
    activeSubModule === "REPORT" && /* @__PURE__ */ jsxDEV(ComprehensiveWaveEnergyReport, { onNotify }, void 0, false, {
      fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
      lineNumber: 170,
      columnNumber: 9
    }, this),
    activeSubModule === "PCI_CONNECTORS" && /* @__PURE__ */ jsxDEV(Fragment, { children: [
      /* @__PURE__ */ jsxDEV("div", { className: "rounded-3xl bg-zinc-950/95 border-2 border-cyan-500/40 p-4 sm:p-6 shadow-2xl space-y-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-zinc-800", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3.5", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-950 via-indigo-950 to-zinc-950 border-2 border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/30 shrink-0", children: /* @__PURE__ */ jsxDEV(Activity, { className: "w-6 h-6 text-cyan-300 animate-pulse" }, void 0, false, {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 180,
              columnNumber: 15
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 179,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxDEV("h1", { className: "text-base sm:text-lg font-black font-mono tracking-tight text-white uppercase flex items-center gap-2", children: /* @__PURE__ */ jsxDEV("span", { children: "ODCZYTY Z ODBIORNIKÓW WYJŚĆ ZŁĄCZY & LISTWY PCI" }, void 0, false, {
                  fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                  lineNumber: 185,
                  columnNumber: 19
                }, this) }, void 0, false, {
                  fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                  lineNumber: 184,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black border bg-cyan-950/80 border-cyan-500 text-cyan-300", children: "DASHBOARD MOUNT • 500 Hz" }, void 0, false, {
                  fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                  lineNumber: 187,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded-full text-[10px] font-mono border bg-indigo-950/60 border-indigo-500/40 text-indigo-300", children: [
                  telemetryState.totalConnectorsMonitored,
                  " Odbiorników Fizycznych"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                  lineNumber: 190,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                lineNumber: 183,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-zinc-400 mt-0.5", children: "Graficzna telemetria oscyloskopowa energii elektrycznej, napięć, natężeń, częstotliwości nośnych i indukcji pola EM na magistralach PCIe i I/O z zaznaczonymi współrzędnymi." }, void 0, false, {
                fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                lineNumber: 194,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 182,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
            lineNumber: 178,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: handleToggleStreaming,
                className: `px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 border transition-all cursor-pointer shadow-lg ${telemetryState.isStreaming ? "bg-emerald-950 text-emerald-200 border-emerald-500 shadow-emerald-950/50" : "bg-amber-950 text-amber-200 border-amber-500 shadow-amber-950/50"}`,
                children: [
                  telemetryState.isStreaming ? /* @__PURE__ */ jsxDEV(Pause, { className: "w-3.5 h-3.5" }, void 0, false, {
                    fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                    lineNumber: 210,
                    columnNumber: 45
                  }, this) : /* @__PURE__ */ jsxDEV(Play, { className: "w-3.5 h-3.5" }, void 0, false, {
                    fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                    lineNumber: 210,
                    columnNumber: 81
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: telemetryState.isStreaming ? "Zatrzymaj Próbkowanie" : "Wznów Oscyloskop" }, void 0, false, {
                    fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                    lineNumber: 211,
                    columnNumber: 15
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                lineNumber: 202,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => handleApplyGrounding("ALL"),
                className: "px-3.5 py-2 rounded-xl bg-cyan-900/80 hover:bg-cyan-800 text-cyan-200 border border-cyan-400 text-xs font-mono font-bold flex items-center gap-2 shadow-lg shadow-cyan-950 transition-all cursor-pointer",
                title: "Zastosuj uziemienie i stłum zakłócenia harmoniczne",
                children: [
                  /* @__PURE__ */ jsxDEV(Shield, { className: "w-3.5 h-3.5 text-cyan-300" }, void 0, false, {
                    fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                    lineNumber: 219,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Uziemienie Listwy PCI" }, void 0, false, {
                    fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                    lineNumber: 220,
                    columnNumber: 15
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                lineNumber: 214,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: handleInjectTestPulse,
                className: "px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-rose-500/40 text-rose-300 text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer",
                title: "Wstrzyknij impuls rezonansowy pola EM",
                children: [
                  /* @__PURE__ */ jsxDEV(Zap, { className: "w-3.5 h-3.5 text-rose-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                    lineNumber: 228,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Test Impulsu EM" }, void 0, false, {
                    fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                    lineNumber: 229,
                    columnNumber: 15
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                lineNumber: 223,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
            lineNumber: 201,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
          lineNumber: 177,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-2xl bg-zinc-900/80 border border-cyan-500/30", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] font-mono text-zinc-400 uppercase", children: "Całkowita Moc Pobierana" }, void 0, false, {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 237,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-2xl font-black font-mono text-cyan-300 flex items-center gap-2 mt-0.5", children: [
              /* @__PURE__ */ jsxDEV(Zap, { className: "w-5 h-5 text-cyan-400" }, void 0, false, {
                fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                lineNumber: 239,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: [
                telemetryState.totalPowerDrawnWatts,
                " W"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                lineNumber: 240,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 238,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-zinc-400 font-mono mt-0.5", children: "6 Aktywnych Magistral I/O" }, void 0, false, {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 242,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
            lineNumber: 236,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-2xl bg-zinc-900/80 border border-indigo-500/30", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] font-mono text-zinc-400 uppercase", children: "Średnie Pole Indukcji EM" }, void 0, false, {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 246,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-2xl font-black font-mono text-indigo-300 flex items-center gap-2 mt-0.5", children: [
              /* @__PURE__ */ jsxDEV(Waves, { className: "w-5 h-5 text-indigo-400" }, void 0, false, {
                fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                lineNumber: 248,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: [
                telemetryState.averageEmFieldVpm,
                " V/m"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                lineNumber: 249,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 247,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-emerald-400 font-mono mt-0.5", children: "W normie bezpieczeństwa (< 10 V/m)" }, void 0, false, {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 251,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
            lineNumber: 245,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-2xl bg-zinc-900/80 border border-amber-500/30", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] font-mono text-zinc-400 uppercase", children: "Maksymalna Częstotliwość" }, void 0, false, {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 255,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-2xl font-black font-mono text-amber-300 flex items-center gap-2 mt-0.5", children: [
              /* @__PURE__ */ jsxDEV(Gauge, { className: "w-5 h-5 text-amber-400" }, void 0, false, {
                fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                lineNumber: 257,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: [
                telemetryState.peakFrequencyGhz,
                " GHz"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                lineNumber: 258,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 256,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-amber-400 font-mono mt-0.5", children: "Thunderbolt 4 / PCIe Gen5 PHY" }, void 0, false, {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 260,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
            lineNumber: 254,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-2xl bg-zinc-900/80 border border-rose-500/30", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] font-mono text-zinc-400 uppercase", children: "Anomalie & Pętle Prądowe" }, void 0, false, {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 264,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-2xl font-black font-mono text-rose-400 flex items-center gap-2 mt-0.5", children: [
              /* @__PURE__ */ jsxDEV(AlertTriangle, { className: "w-5 h-5 text-rose-500" }, void 0, false, {
                fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                lineNumber: 266,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: telemetryState.activeAnomaliesCount }, void 0, false, {
                fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                lineNumber: 267,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 265,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-emerald-400 font-mono mt-0.5", children: "0 ms Automatyczna Izolacja" }, void 0, false, {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 269,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
            lineNumber: 263,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
          lineNumber: 235,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
        lineNumber: 176,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "rounded-3xl bg-zinc-950/90 border border-zinc-800 p-4 space-y-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs font-mono", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-400 uppercase font-bold flex items-center gap-1", children: [
              /* @__PURE__ */ jsxDEV(Sliders, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
                fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                lineNumber: 281,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Mierzony Parametr:" }, void 0, false, {
                fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                lineNumber: 282,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 280,
              columnNumber: 13
            }, this),
            [
              { id: "voltage", label: "⚡ Napięcie (V)" },
              { id: "current", label: "🔌 Natężenie (A)" },
              { id: "emField", label: "📡 Pole EM (V/m)" },
              { id: "power", label: "🔥 Moc (W)" },
              { id: "frequency", label: "📈 Częstotliwość (MHz)" }
            ].map((m) => /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => setSelectedMetric(m.id),
                className: `px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${selectedMetric === m.id ? "bg-cyan-950 text-cyan-200 border-cyan-400 shadow-md shadow-cyan-950" : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200"}`,
                children: m.label
              },
              m.id,
              false,
              {
                fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                lineNumber: 292,
                columnNumber: 15
              },
              this
            ))
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
            lineNumber: 279,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setShowCoordinates(!showCoordinates),
              className: `px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer ${showCoordinates ? "bg-indigo-950 text-indigo-200 border-indigo-400 shadow-md shadow-indigo-950" : "bg-zinc-900 text-zinc-400 border-zinc-800"}`,
              children: [
                /* @__PURE__ */ jsxDEV(Eye, { className: "w-3.5 h-3.5 text-indigo-300" }, void 0, false, {
                  fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                  lineNumber: 316,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: [
                  "Siatka Współrzędnych X/Y: ",
                  showCoordinates ? "WŁĄCZONA" : "WYŁĄCZONA"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                  lineNumber: 317,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 308,
              columnNumber: 13
            },
            this
          ) }, void 0, false, {
            fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
            lineNumber: 307,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
          lineNumber: 276,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap border-t border-zinc-800/80 pt-3 text-xs font-mono", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-400 uppercase font-bold", children: "Wybór Odbiornika / Złącza:" }, void 0, false, {
            fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
            lineNumber: 324,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setSelectedConnectorId("ALL"),
              className: `px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${selectedConnectorId === "ALL" ? "bg-white text-zinc-950 font-bold border-white" : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200"}`,
              children: "Wszystkie Magistrale (Widok Zbiorczy)"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 325,
              columnNumber: 11
            },
            this
          ),
          telemetryState.connectors.map((c) => /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setSelectedConnectorId(c.id),
              className: `px-2.5 py-1 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${selectedConnectorId === c.id ? "bg-cyan-950 text-cyan-200 border-cyan-400 shadow-sm" : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200"}`,
              children: [
                /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-cyan-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                  lineNumber: 346,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: c.name.split(" (")[0] }, void 0, false, {
                  fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                  lineNumber: 347,
                  columnNumber: 15
                }, this),
                showCoordinates && /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] text-zinc-500", children: [
                  "[",
                  c.coords.x,
                  ",",
                  c.coords.y,
                  "]"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                  lineNumber: 349,
                  columnNumber: 17
                }, this)
              ]
            },
            c.id,
            true,
            {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 337,
              columnNumber: 13
            },
            this
          ))
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
          lineNumber: 323,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
        lineNumber: 275,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "rounded-3xl bg-zinc-950/95 border-2 border-cyan-500/30 p-4 sm:p-6 shadow-2xl space-y-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(Activity, { className: "w-5 h-5 text-cyan-400" }, void 0, false, {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 360,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("h2", { className: "text-sm sm:text-base font-black font-mono text-white uppercase", children: [
              "WYKRES LINIOWY OSCYLOSKOPU • ",
              selectedMetric.toUpperCase(),
              " W CZASIE RZECZYWISTYM"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 361,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
            lineNumber: 359,
            columnNumber: 11
          }, this),
          hoveredPointCoords && /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-mono bg-zinc-900 px-3 py-1 rounded-lg border border-cyan-500/40 text-cyan-300 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(Crosshair, { className: "w-3.5 h-3.5 text-rose-400" }, void 0, false, {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 367,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              "Współrzędne Kursora: ",
              /* @__PURE__ */ jsxDEV("strong", { children: [
                "T=",
                hoveredPointCoords.x
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                lineNumber: 368,
                columnNumber: 42
              }, this),
              " | ",
              /* @__PURE__ */ jsxDEV("strong", { children: [
                "Wartość=",
                hoveredPointCoords.val.toFixed(2)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                lineNumber: 368,
                columnNumber: 86
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 368,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
            lineNumber: 366,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
          lineNumber: 358,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "w-full h-80 sm:h-96", children: /* @__PURE__ */ jsxDEV(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxDEV(
          LineChart,
          {
            data: chartData,
            onMouseMove: (e) => {
              if (e && e.activePayload && e.activePayload.length > 0) {
                setHoveredPointCoords({
                  x: e.activeLabel || "",
                  y: e.activePayload[0].name || "",
                  val: e.activePayload[0].value || 0
                });
              }
            },
            onMouseLeave: () => setHoveredPointCoords(null),
            margin: { top: 15, right: 25, left: 0, bottom: 25 },
            children: [
              /* @__PURE__ */ jsxDEV(CartesianGrid, { strokeDasharray: "3 3", stroke: "#27272a" }, void 0, false, {
                fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                lineNumber: 390,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV(
                XAxis,
                {
                  dataKey: "time",
                  stroke: "#71717a",
                  tick: { fill: "#a1a1aa", fontSize: 10, fontFamily: "monospace" },
                  label: { value: "Czas Pomiaru (Współrzędna T)", position: "insideBottom", offset: -15, fill: "#71717a", fontSize: 10 }
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                  lineNumber: 391,
                  columnNumber: 15
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                YAxis,
                {
                  stroke: "#71717a",
                  tick: { fill: "#a1a1aa", fontSize: 10, fontFamily: "monospace" },
                  label: {
                    value: selectedMetric === "voltage" ? "Napięcie [V]" : selectedMetric === "current" ? "Natężenie [A]" : selectedMetric === "emField" ? "Pole EM [V/m]" : "Wartość",
                    angle: -90,
                    position: "insideLeft",
                    fill: "#71717a",
                    fontSize: 10
                  }
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                  lineNumber: 397,
                  columnNumber: 15
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                Tooltip,
                {
                  contentStyle: {
                    backgroundColor: "#09090b",
                    borderColor: "#06b6d4",
                    borderRadius: "12px",
                    fontFamily: "monospace",
                    fontSize: "11px",
                    color: "#fff",
                    boxShadow: "0 0 20px rgba(6,182,212,0.3)"
                  },
                  formatter: (value, name) => [
                    `${Number(value).toFixed(2)} ${selectedMetric === "voltage" ? "V" : selectedMetric === "current" ? "A" : selectedMetric === "emField" ? "V/m" : "W"}`,
                    name
                  ],
                  labelFormatter: (label) => `Współrzędna Czasowa: ${label}`
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                  lineNumber: 408,
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
                  fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                  lineNumber: 424,
                  columnNumber: 15
                },
                this
              ),
              selectedMetric === "emField" && /* @__PURE__ */ jsxDEV(ReferenceLine, { y: 10, stroke: "#f43f5e", strokeDasharray: "4 4", label: { value: "PRÓG BEZPIECZEŃSTWA (10 V/m)", fill: "#f43f5e", fontSize: 10 } }, void 0, false, {
                fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                lineNumber: 432,
                columnNumber: 17
              }, this),
              selectedMetric === "voltage" && /* @__PURE__ */ jsxDEV(ReferenceLine, { y: 12, stroke: "#06b6d4", strokeDasharray: "3 3", label: { value: "Linia Bazowa PCIe (12.0V)", fill: "#06b6d4", fontSize: 10 } }, void 0, false, {
                fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                lineNumber: 435,
                columnNumber: 17
              }, this),
              (selectedConnectorId === "ALL" || selectedConnectorId === "conn-pcie-1") && /* @__PURE__ */ jsxDEV(
                Line,
                {
                  type: "monotone",
                  dataKey: selectedMetric === "voltage" ? "pcie1_voltage" : selectedMetric === "current" ? "pcie1_current" : "pcie1_emField",
                  name: "PCIe Gen5 x16 [X:120, Y:180]",
                  stroke: "#06b6d4",
                  strokeWidth: 2.5,
                  dot: { r: 3, fill: "#06b6d4" },
                  activeDot: { r: 6, stroke: "#fff", strokeWidth: 2 }
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                  lineNumber: 440,
                  columnNumber: 17
                },
                this
              ),
              (selectedConnectorId === "ALL" || selectedConnectorId === "conn-vrm-rail") && /* @__PURE__ */ jsxDEV(
                Line,
                {
                  type: "monotone",
                  dataKey: selectedMetric === "voltage" ? "vrm_voltage" : selectedMetric === "current" ? "vrm_current" : "vrm_emField",
                  name: "12VHPWR VRM [X:260, Y:80]",
                  stroke: "#a855f7",
                  strokeWidth: 2.5,
                  dot: { r: 3, fill: "#a855f7" },
                  activeDot: { r: 6, stroke: "#fff", strokeWidth: 2 }
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                  lineNumber: 452,
                  columnNumber: 17
                },
                this
              ),
              (selectedConnectorId === "ALL" || selectedConnectorId === "conn-usbc-pd") && /* @__PURE__ */ jsxDEV(
                Line,
                {
                  type: "monotone",
                  dataKey: selectedMetric === "voltage" ? "usbc_voltage" : selectedMetric === "current" ? "usbc_current" : "usbc_emField",
                  name: "USB-C / Thunderbolt [X:40, Y:110]",
                  stroke: "#eab308",
                  strokeWidth: 2,
                  dot: { r: 2.5, fill: "#eab308" }
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                  lineNumber: 464,
                  columnNumber: 17
                },
                this
              ),
              (selectedConnectorId === "ALL" || selectedConnectorId === "conn-pcie-2") && /* @__PURE__ */ jsxDEV(
                Line,
                {
                  type: "monotone",
                  dataKey: selectedMetric === "voltage" ? "pcie2_voltage" : selectedMetric === "current" ? "pcie2_current" : "pcie2_emField",
                  name: "PCIe x4 NVMe [X:120, Y:320]",
                  stroke: "#10b981",
                  strokeWidth: 2,
                  dot: { r: 2.5, fill: "#10b981" }
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                  lineNumber: 475,
                  columnNumber: 17
                },
                this
              ),
              (selectedConnectorId === "ALL" || selectedConnectorId === "conn-dp-hdmi") && /* @__PURE__ */ jsxDEV(
                Line,
                {
                  type: "monotone",
                  dataKey: selectedMetric === "voltage" ? "dp_voltage" : selectedMetric === "current" ? "dp_current" : "dp_emField",
                  name: "DP / HDMI Video [X:40, Y:220]",
                  stroke: "#f97316",
                  strokeWidth: 1.5,
                  dot: { r: 2, fill: "#f97316" }
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                  lineNumber: 486,
                  columnNumber: 17
                },
                this
              ),
              (selectedConnectorId === "ALL" || selectedConnectorId === "conn-gpio-bus") && /* @__PURE__ */ jsxDEV(
                Line,
                {
                  type: "monotone",
                  dataKey: selectedMetric === "voltage" ? "gpio_voltage" : selectedMetric === "current" ? "gpio_current" : "gpio_emField",
                  name: "GPIO / JTAG [X:340, Y:360]",
                  stroke: "#64748b",
                  strokeWidth: 1.5,
                  dot: { r: 2, fill: "#64748b" }
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                  lineNumber: 497,
                  columnNumber: 17
                },
                this
              )
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
            lineNumber: 376,
            columnNumber: 13
          },
          this
        ) }, void 0, false, {
          fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
          lineNumber: 375,
          columnNumber: 11
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
          lineNumber: 374,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-2 border-t border-zinc-800/80", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "* Próbkowanie ciągłe: 500 próbek/sekundę z interpolacją wielomianową spline." }, void 0, false, {
            fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
            lineNumber: 511,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-300", children: "Współrzędne w legendzie wskazują fizyczne położenie na płycie [X, Y, Piny]" }, void 0, false, {
            fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
            lineNumber: 512,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
          lineNumber: 510,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
        lineNumber: 357,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-7 rounded-3xl bg-zinc-950/95 border-2 border-zinc-800 p-5 space-y-4", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-zinc-800 pb-3 text-xs font-mono", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-200 font-bold flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV(Layers, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
                fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                lineNumber: 523,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "SCHEMAT FIZYCZNY LISTWY PCI & ZŁĄCZY ZE WSPÓŁRZĘDNYMI [X, Y]" }, void 0, false, {
                fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                lineNumber: 524,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 522,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-700", children: "Siatka 400x400 mm" }, void 0, false, {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 526,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
            lineNumber: 521,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "relative w-full h-80 rounded-2xl bg-zinc-900/60 border-2 border-dashed border-zinc-700/80 p-4 flex items-center justify-center overflow-hidden", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:20px_20px] opacity-40" }, void 0, false, {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 534,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "absolute left-[180px] top-[140px] w-24 h-24 rounded-2xl bg-zinc-950 border-2 border-indigo-500/50 flex flex-col items-center justify-center shadow-lg", children: [
              /* @__PURE__ */ jsxDEV(Cpu, { className: "w-7 h-7 text-indigo-400 animate-pulse" }, void 0, false, {
                fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                lineNumber: 538,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] font-mono text-zinc-400 mt-1", children: "SoC / CPU" }, void 0, false, {
                fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                lineNumber: 539,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-[8px] font-mono text-indigo-300", children: "[X:200, Y:160]" }, void 0, false, {
                fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                lineNumber: 540,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 537,
              columnNumber: 13
            }, this),
            telemetryState.connectors.map((c) => {
              const isSelected = selectedConnectorId === c.id;
              return /* @__PURE__ */ jsxDEV(
                "div",
                {
                  onClick: () => setSelectedConnectorId(c.id),
                  style: {
                    left: `${c.coords.x / 400 * 100}%`,
                    top: `${c.coords.y / 400 * 100}%`
                  },
                  className: `absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-1.5 select-none shadow-xl ${isSelected ? "bg-cyan-950 border-cyan-400 shadow-cyan-500/40 scale-105 z-20" : "bg-zinc-950/90 border-zinc-700 hover:border-cyan-500/60 z-10"}`,
                  title: `${c.name} - Kliknij, aby wyizolować odczyt`,
                  children: [
                    /* @__PURE__ */ jsxDEV("div", { className: `w-2.5 h-2.5 rounded-full ${c.status === "ANOMALY_DETECTED" ? "bg-rose-500 animate-ping" : "bg-cyan-400 animate-pulse"}` }, void 0, false, {
                      fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                      lineNumber: 561,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "font-mono text-[10px]", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "font-bold text-white leading-tight", children: c.name.split(" ")[0] }, void 0, false, {
                        fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                        lineNumber: 563,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "text-[8px] text-cyan-300", children: [
                        "X:",
                        c.coords.x,
                        " Y:",
                        c.coords.y
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                        lineNumber: 564,
                        columnNumber: 21
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                      lineNumber: 562,
                      columnNumber: 19
                    }, this)
                  ]
                },
                c.id,
                true,
                {
                  fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                  lineNumber: 547,
                  columnNumber: 17
                },
                this
              );
            })
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
            lineNumber: 532,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] font-mono text-zinc-400 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { children: "Kliknij dowolne złącze na schemacie, aby podejrzeć jego szczegółowe parametry prądu." }, void 0, false, {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 572,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => setSelectedConnectorId("ALL"),
                className: "text-cyan-400 hover:underline cursor-pointer",
                children: "Resetuj do widoku ogólnego"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                lineNumber: 573,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
            lineNumber: 571,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
          lineNumber: 520,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-5 rounded-3xl bg-zinc-950/95 border-2 border-zinc-800 p-5 space-y-4 flex flex-col justify-between", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-zinc-800 pb-3 text-xs font-mono", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-200 font-bold flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV(Zap, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                  lineNumber: 587,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "PARAMETRY ENERGII ELEKTRYCZNEJ" }, void 0, false, {
                  fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                  lineNumber: 588,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                lineNumber: 586,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40", children: [
                "STAN: ",
                selectedSingleConnector ? selectedSingleConnector.status : "WSZYSTKIE OPTYMALNE"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                lineNumber: 590,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 585,
              columnNumber: 13
            }, this),
            selectedSingleConnector ? /* @__PURE__ */ jsxDEV("div", { className: "space-y-3 pt-3 font-mono", children: [
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("div", { className: "text-sm font-bold text-white", children: selectedSingleConnector.name }, void 0, false, {
                  fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                  lineNumber: 598,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-xs text-zinc-400", children: selectedSingleConnector.physicalLocation }, void 0, false, {
                  fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                  lineNumber: 599,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                lineNumber: 597,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-2 text-xs", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-xl bg-zinc-900 border border-zinc-800", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-zinc-400 block", children: "Napięcie (V):" }, void 0, false, {
                    fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                    lineNumber: 604,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-base font-black text-cyan-300", children: [
                    selectedSingleConnector.voltageV,
                    " V"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                    lineNumber: 605,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                  lineNumber: 603,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-xl bg-zinc-900 border border-zinc-800", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-zinc-400 block", children: "Natężenie (A):" }, void 0, false, {
                    fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                    lineNumber: 609,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-base font-black text-amber-300", children: [
                    selectedSingleConnector.currentAmperes,
                    " A"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                    lineNumber: 610,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                  lineNumber: 608,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-xl bg-zinc-900 border border-zinc-800", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-zinc-400 block", children: "Moc Chwilowa (W):" }, void 0, false, {
                    fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                    lineNumber: 614,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-base font-black text-indigo-300", children: [
                    selectedSingleConnector.powerWatts,
                    " W"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                    lineNumber: 615,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                  lineNumber: 613,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-xl bg-zinc-900 border border-zinc-800", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-zinc-400 block", children: "Pole Indukcji EM:" }, void 0, false, {
                    fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                    lineNumber: 619,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-base font-black text-rose-300", children: [
                    selectedSingleConnector.emFieldStrengthVpm,
                    " V/m"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                    lineNumber: 620,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                  lineNumber: 618,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-xl bg-zinc-900 border border-zinc-800", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-zinc-400 block", children: "Częstotliwość Nośna:" }, void 0, false, {
                    fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                    lineNumber: 624,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-white", children: [
                    selectedSingleConnector.frequencyMhz,
                    " MHz"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                    lineNumber: 625,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                  lineNumber: 623,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-xl bg-zinc-900 border border-zinc-800", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-zinc-400 block", children: "Temperatura Styków:" }, void 0, false, {
                    fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                    lineNumber: 629,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-emerald-400", children: [
                    selectedSingleConnector.temperatureC,
                    "°C"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                    lineNumber: 630,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                  lineNumber: 628,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                lineNumber: 602,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-[11px] text-zinc-300", children: [
                /* @__PURE__ */ jsxDEV("strong", { children: "Współrzędne Płyty:" }, void 0, false, {
                  fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                  lineNumber: 635,
                  columnNumber: 19
                }, this),
                " X = ",
                selectedSingleConnector.coords.x,
                " mm, Y = ",
                selectedSingleConnector.coords.y,
                " mm (",
                selectedSingleConnector.coords.pinCount,
                " styków/pinów)."
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                lineNumber: 634,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 596,
              columnNumber: 15
            }, this) : /* @__PURE__ */ jsxDEV("div", { className: "space-y-2.5 pt-3 font-mono text-xs", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "text-zinc-300", children: "Lista wszystkich aktywnych odbiorników:" }, void 0, false, {
                fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                lineNumber: 640,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 max-h-60 overflow-y-auto pr-1", children: telemetryState.connectors.map((c) => /* @__PURE__ */ jsxDEV(
                "div",
                {
                  onClick: () => setSelectedConnectorId(c.id),
                  className: "p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-cyan-500/60 flex items-center justify-between cursor-pointer transition-all",
                  children: [
                    /* @__PURE__ */ jsxDEV("div", { children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "text-white font-bold", children: c.name.split(" (")[0] }, void 0, false, {
                        fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                        lineNumber: 649,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-zinc-400", children: [
                        "Koordynaty: [",
                        c.coords.x,
                        ", ",
                        c.coords.y,
                        "]"
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                        lineNumber: 650,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                      lineNumber: 648,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "text-right", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "text-cyan-300 font-bold", children: [
                        c.voltageV,
                        "V / ",
                        c.currentAmperes,
                        "A"
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                        lineNumber: 653,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-rose-300", children: [
                        c.emFieldStrengthVpm,
                        " V/m"
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                        lineNumber: 654,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                      lineNumber: 652,
                      columnNumber: 23
                    }, this)
                  ]
                },
                c.id,
                true,
                {
                  fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                  lineNumber: 643,
                  columnNumber: 21
                },
                this
              )) }, void 0, false, {
                fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                lineNumber: 641,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 639,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
            lineNumber: 584,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleApplyGrounding(selectedConnectorId === "ALL" ? void 0 : selectedConnectorId),
              className: "w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-mono font-bold uppercase flex items-center justify-center gap-2 border border-cyan-400 shadow-lg cursor-pointer",
              children: [
                /* @__PURE__ */ jsxDEV(Shield, { className: "w-4 h-4 text-cyan-200" }, void 0, false, {
                  fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                  lineNumber: 667,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Zastosuj Uziemienie Ekranujące" }, void 0, false, {
                  fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                  lineNumber: 668,
                  columnNumber: 13
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 663,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
          lineNumber: 583,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
        lineNumber: 517,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "rounded-3xl bg-zinc-950/95 border-2 border-zinc-800 p-4 sm:p-6 space-y-3 font-mono text-xs", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-zinc-800 pb-2", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-200 font-bold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(Activity, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 678,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "REJESTR ZDARZEŃ ENERGETYCZNYCH & PRÓBKOWANIA SPRZĘTOWEGO" }, void 0, false, {
              fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
              lineNumber: 679,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
            lineNumber: 677,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-zinc-400", children: "Aktualizacja na żywo" }, void 0, false, {
            fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
            lineNumber: 681,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
          lineNumber: 676,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "max-h-40 overflow-y-auto space-y-1.5 pr-1 text-[11px]", children: telemetryState.recentIncidents.map((inc) => /* @__PURE__ */ jsxDEV(
          "div",
          {
            className: "p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-zinc-700",
            children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-400 font-bold", children: [
                  "[",
                  inc.connectorName,
                  "]"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                  lineNumber: 691,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-200", children: inc.actionTaken }, void 0, false, {
                  fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                  lineNumber: 692,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                lineNumber: 690,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 shrink-0 text-[10px] text-zinc-400", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-amber-400", children: inc.recordedValues }, void 0, false, {
                  fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                  lineNumber: 695,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-500", children: inc.timestamp }, void 0, false, {
                  fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                  lineNumber: 696,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
                lineNumber: 694,
                columnNumber: 15
              }, this)
            ]
          },
          inc.id,
          true,
          {
            fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
            lineNumber: 686,
            columnNumber: 13
          },
          this
        )) }, void 0, false, {
          fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
          lineNumber: 684,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
        lineNumber: 675,
        columnNumber: 7
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
      lineNumber: 174,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/PciHardwareTelemetryMonitor.tsx",
    lineNumber: 89,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBjaUhhcmR3YXJlVGVsZW1ldHJ5TW9uaXRvci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBcbiAgQWN0aXZpdHksIFphcCwgU2hpZWxkLCBDcHUsIEdhdWdlLCBBbGVydFRyaWFuZ2xlLCBQbGF5LCBQYXVzZSwgXG4gIFJlZnJlc2hDdywgQ2hlY2tDaXJjbGUyLCBDcm9zc2hhaXIsIERvd25sb2FkLCBTbGlkZXJzLCBMYXllcnMsIFxuICBSYWRpbywgV2F2ZXMsIFNoaWVsZEFsZXJ0LCBTcGFya2xlcywgRmlsdGVyLCBDaGV2cm9uUmlnaHQsIEV5ZVxufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgXG4gIFJlc3BvbnNpdmVDb250YWluZXIsIFxuICBMaW5lQ2hhcnQsIFxuICBMaW5lLCBcbiAgWEF4aXMsIFxuICBZQXhpcywgXG4gIENhcnRlc2lhbkdyaWQsIFxuICBUb29sdGlwLCBcbiAgTGVnZW5kLCBcbiAgUmVmZXJlbmNlTGluZSxcbiAgQXJlYUNoYXJ0LFxuICBBcmVhXG59IGZyb20gJ3JlY2hhcnRzJztcbmltcG9ydCB7IHBjaVRlbGVtZXRyeUVuZ2luZSB9IGZyb20gJy4uL3V0aWxzL3BjaVRlbGVtZXRyeUVuZ2luZSc7XG5pbXBvcnQgeyBcbiAgUGNpSGFyZHdhcmVTdGF0ZSwgXG4gIFBjaUNvbm5lY3RvclNlbnNvck5vZGUsIFxuICBDb25uZWN0b3JDYXRlZ29yeSwgXG4gIFBjaVRlbGVtZXRyeUZpbHRlck9wdGlvbnMgXG59IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IEVtV2F2ZVJlc29uYW5jZVN1cGVycG9zaXRpb25TeXN0ZW0gfSBmcm9tICcuL0VtV2F2ZVJlc29uYW5jZVN1cGVycG9zaXRpb25TeXN0ZW0nO1xuaW1wb3J0IHsgRGFzaGJvYXJkRGltZW5zaW9uQW5hbHl6ZXJQbHVnaW4gfSBmcm9tICcuL0Rhc2hib2FyZERpbWVuc2lvbkFuYWx5emVyUGx1Z2luJztcbmltcG9ydCB7IENlcmViZWxsdW1XYXZlV2VsbGJlaW5nQ2hhcnQgfSBmcm9tICcuL0NlcmViZWxsdW1XYXZlV2VsbGJlaW5nQ2hhcnQnO1xuaW1wb3J0IHsgQ29tcHJlaGVuc2l2ZVdhdmVFbmVyZ3lSZXBvcnQgfSBmcm9tICcuL0NvbXByZWhlbnNpdmVXYXZlRW5lcmd5UmVwb3J0JztcblxuaW50ZXJmYWNlIFBjaUhhcmR3YXJlVGVsZW1ldHJ5TW9uaXRvclByb3BzIHtcbiAgb25Ob3RpZnk/OiAobXNnOiBzdHJpbmcpID0+IHZvaWQ7XG4gIGRlZmF1bHRTdWJNb2R1bGU/OiAnRU1fV0FWRVMnIHwgJ0NFUkVCRUxMVU0nIHwgJ1BDSV9DT05ORUNUT1JTJyB8ICdEQVNIX1BMVUdJTicgfCAnUkVQT1JUJztcbn1cblxuZXhwb3J0IGNvbnN0IFBjaUhhcmR3YXJlVGVsZW1ldHJ5TW9uaXRvcjogUmVhY3QuRkM8UGNpSGFyZHdhcmVUZWxlbWV0cnlNb25pdG9yUHJvcHM+ID0gKHtcbiAgb25Ob3RpZnksXG4gIGRlZmF1bHRTdWJNb2R1bGUgPSAnRU1fV0FWRVMnXG59KSA9PiB7XG4gIGNvbnN0IFthY3RpdmVTdWJNb2R1bGUsIHNldEFjdGl2ZVN1Yk1vZHVsZV0gPSB1c2VTdGF0ZTwnRU1fV0FWRVMnIHwgJ0NFUkVCRUxMVU0nIHwgJ1BDSV9DT05ORUNUT1JTJyB8ICdEQVNIX1BMVUdJTicgfCAnUkVQT1JUJz4oZGVmYXVsdFN1Yk1vZHVsZSk7XG4gIGNvbnN0IFt0ZWxlbWV0cnlTdGF0ZSwgc2V0VGVsZW1ldHJ5U3RhdGVdID0gdXNlU3RhdGU8UGNpSGFyZHdhcmVTdGF0ZT4oKCkgPT4gcGNpVGVsZW1ldHJ5RW5naW5lLmdldFN0YXRlKCkpO1xuICBjb25zdCBbc2VsZWN0ZWRDb25uZWN0b3JJZCwgc2V0U2VsZWN0ZWRDb25uZWN0b3JJZF0gPSB1c2VTdGF0ZTxzdHJpbmc+KCdBTEwnKTtcbiAgY29uc3QgW3NlbGVjdGVkTWV0cmljLCBzZXRTZWxlY3RlZE1ldHJpY10gPSB1c2VTdGF0ZTwndm9sdGFnZScgfCAnY3VycmVudCcgfCAncG93ZXInIHwgJ2ZyZXF1ZW5jeScgfCAnZW1GaWVsZCc+KCd2b2x0YWdlJyk7XG4gIGNvbnN0IFtzZWxlY3RlZENhdGVnb3J5LCBzZXRTZWxlY3RlZENhdGVnb3J5XSA9IHVzZVN0YXRlPENvbm5lY3RvckNhdGVnb3J5IHwgJ0FMTCc+KCdBTEwnKTtcbiAgY29uc3QgW3Nob3dDb29yZGluYXRlcywgc2V0U2hvd0Nvb3JkaW5hdGVzXSA9IHVzZVN0YXRlPGJvb2xlYW4+KHRydWUpO1xuICBjb25zdCBbaG92ZXJlZFBvaW50Q29vcmRzLCBzZXRIb3ZlcmVkUG9pbnRDb29yZHNdID0gdXNlU3RhdGU8eyB4OiBzdHJpbmc7IHk6IHN0cmluZzsgdmFsOiBudW1iZXIgfSB8IG51bGw+KG51bGwpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgdW5zdWIgPSBwY2lUZWxlbWV0cnlFbmdpbmUuc3Vic2NyaWJlKChuZXdTdGF0ZSkgPT4ge1xuICAgICAgc2V0VGVsZW1ldHJ5U3RhdGUobmV3U3RhdGUpO1xuICAgIH0pO1xuICAgIHJldHVybiAoKSA9PiB1bnN1YigpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgaGFuZGxlVG9nZ2xlU3RyZWFtaW5nID0gKCkgPT4ge1xuICAgIHBjaVRlbGVtZXRyeUVuZ2luZS50b2dnbGVTdHJlYW1pbmcoKTtcbiAgICBpZiAob25Ob3RpZnkpIHtcbiAgICAgIG9uTm90aWZ5KHRlbGVtZXRyeVN0YXRlLmlzU3RyZWFtaW5nID8gJ+KPuO+4jyBaYXRyenltYW5vIHN0cnVtaWVuaW93YW5pZSBvc2N5bG9za29wdScgOiAn4pa277iPIFd6bm93aW9ubyBwcsOzYmtvd2FuaWUgdyBjemFzaWUgcnplY3p5d2lzdHltICg1MDAgSHopJyk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUFwcGx5R3JvdW5kaW5nID0gKGNvbm5JZD86IHN0cmluZykgPT4ge1xuICAgIHBjaVRlbGVtZXRyeUVuZ2luZS5hcHBseUhhcmR3YXJlR3JvdW5kaW5nQ2xhbXBpbmcoY29ubklkKTtcbiAgICBpZiAob25Ob3RpZnkpIHtcbiAgICAgIG9uTm90aWZ5KCfimqEgWmFzdG9zb3dhbm8gdXppZW1pZW5pZSBla3JhbnVqxIVjZSAmIHTFgnVtaWVuaWUgaGFybW9uaWN6bnljaCBuYSBzenluaWUnKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlSW5qZWN0VGVzdFB1bHNlID0gKCkgPT4ge1xuICAgIHBjaVRlbGVtZXRyeUVuZ2luZS5pbmplY3RUZXN0SGFybW9uaWNQdWxzZShzZWxlY3RlZENvbm5lY3RvcklkID09PSAnQUxMJyA/ICdjb25uLXBjaWUtMScgOiBzZWxlY3RlZENvbm5lY3RvcklkKTtcbiAgICBpZiAob25Ob3RpZnkpIHtcbiAgICAgIG9uTm90aWZ5KCfimqDvuI8gV3N0cnp5a25pxJl0byBpbXB1bHMgdGVzdG93eSByZXpvbmFuc3UgcG9sYSBlbGVrdHJvbWFnbmV0eWN6bmVnbycpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBmaWx0ZXJlZENvbm5lY3RvcnMgPSB0ZWxlbWV0cnlTdGF0ZS5jb25uZWN0b3JzLmZpbHRlcihjID0+IHtcbiAgICBpZiAoc2VsZWN0ZWRDYXRlZ29yeSAhPT0gJ0FMTCcgJiYgYy5jYXRlZ29yeSAhPT0gc2VsZWN0ZWRDYXRlZ29yeSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChzZWxlY3RlZENvbm5lY3RvcklkICE9PSAnQUxMJyAmJiBjLmlkICE9PSBzZWxlY3RlZENvbm5lY3RvcklkKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0pO1xuXG4gIGNvbnN0IHNlbGVjdGVkU2luZ2xlQ29ubmVjdG9yID0gdGVsZW1ldHJ5U3RhdGUuY29ubmVjdG9ycy5maW5kKGMgPT4gYy5pZCA9PT0gc2VsZWN0ZWRDb25uZWN0b3JJZCk7XG5cbiAgLy8gRGFuZSBkbyB3eWtyZXN1IHdpZWxvbGluaW93ZWdvXG4gIGNvbnN0IGNoYXJ0RGF0YSA9IHRlbGVtZXRyeVN0YXRlLmdsb2JhbE9zY2lsbG9zY29wZUhpc3Rvcnk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBzcGFjZS15LTYgdGV4dC13aGl0ZVwiPlxuICAgICAgXG4gICAgICB7LyogU3ViLW1vZHVsZSBOYXZpZ2F0aW9uIFN3aXRjaGVyIFRhYnMgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdW5kZWQtMnhsIGJnLXppbmMtOTUwLzk1IGJvcmRlci0yIGJvcmRlci1pbmRpZ28tNTAwLzMwIHAtMiBzbTpwLTIuNSBzaGFkb3ctMnhsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMiBvdmVyZmxvdy14LWF1dG9cIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHNtOmdhcC0yIGZsZXgtbm93cmFwIHNtOmZsZXgtd3JhcFwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVN1Yk1vZHVsZSgnRU1fV0FWRVMnKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTMgc206cHgtNCBweS0yIHJvdW5kZWQteGwgdGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGJvcmRlciB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciB3aGl0ZXNwYWNlLW5vd3JhcCAke1xuICAgICAgICAgICAgICBhY3RpdmVTdWJNb2R1bGUgPT09ICdFTV9XQVZFUydcbiAgICAgICAgICAgICAgICA/ICdiZy1pbmRpZ28tOTUwIHRleHQtaW5kaWdvLTIwMCBib3JkZXItaW5kaWdvLTQwMCBzaGFkb3ctbGcgc2hhZG93LWluZGlnby05NTAnXG4gICAgICAgICAgICAgICAgOiAnYmctemluYy05MDAvOTAgdGV4dC16aW5jLTQwMCBib3JkZXItemluYy04MDAgaG92ZXI6dGV4dC16aW5jLTIwMCdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxXYXZlcyBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtaW5kaWdvLTQwMFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj7wn4yKIEZhbGUgRU0sIFN1cGVycG96eWNqYSAmIFpub3N6ZW5pZSBSZXpvbmFuc3U8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVTdWJNb2R1bGUoJ0NFUkVCRUxMVU0nKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTMgc206cHgtNCBweS0yIHJvdW5kZWQteGwgdGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGJvcmRlciB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciB3aGl0ZXNwYWNlLW5vd3JhcCAke1xuICAgICAgICAgICAgICBhY3RpdmVTdWJNb2R1bGUgPT09ICdDRVJFQkVMTFVNJ1xuICAgICAgICAgICAgICAgID8gJ2JnLWVtZXJhbGQtOTUwIHRleHQtZW1lcmFsZC0yMDAgYm9yZGVyLWVtZXJhbGQtNDAwIHNoYWRvdy1sZyBzaGFkb3ctZW1lcmFsZC05NTAnXG4gICAgICAgICAgICAgICAgOiAnYmctemluYy05MDAvOTAgdGV4dC16aW5jLTQwMCBib3JkZXItemluYy04MDAgaG92ZXI6dGV4dC16aW5jLTIwMCdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxTcGFya2xlcyBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgICAgPHNwYW4+8J+noCBXeWtyZXMgV3DFgnl3dSBuYSBNw7PFvGTFvGVrICYgU2Ftb3BvY3p1Y2llPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlU3ViTW9kdWxlKCdEQVNIX1BMVUdJTicpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMyBzbTpweC00IHB5LTIgcm91bmRlZC14bCB0ZXh0LXhzIGZvbnQtbW9ubyBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgYm9yZGVyIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyIHdoaXRlc3BhY2Utbm93cmFwICR7XG4gICAgICAgICAgICAgIGFjdGl2ZVN1Yk1vZHVsZSA9PT0gJ0RBU0hfUExVR0lOJ1xuICAgICAgICAgICAgICAgID8gJ2JnLWN5YW4tOTUwIHRleHQtY3lhbi0yMDAgYm9yZGVyLWN5YW4tNDAwIHNoYWRvdy1sZyBzaGFkb3ctY3lhbi05NTAnXG4gICAgICAgICAgICAgICAgOiAnYmctemluYy05MDAvOTAgdGV4dC16aW5jLTQwMCBib3JkZXItemluYy04MDAgaG92ZXI6dGV4dC16aW5jLTIwMCdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxMYXllcnMgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWN5YW4tNDAwXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPvCflIwgV3R5Y3prYSBXeW1pYXLDs3cgZG8gRGFzaGJvYXJkdTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVN1Yk1vZHVsZSgnUENJX0NPTk5FQ1RPUlMnKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTMgc206cHgtNCBweS0yIHJvdW5kZWQteGwgdGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGJvcmRlciB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciB3aGl0ZXNwYWNlLW5vd3JhcCAke1xuICAgICAgICAgICAgICBhY3RpdmVTdWJNb2R1bGUgPT09ICdQQ0lfQ09OTkVDVE9SUydcbiAgICAgICAgICAgICAgICA/ICdiZy1ibHVlLTk1MCB0ZXh0LWJsdWUtMjAwIGJvcmRlci1ibHVlLTQwMCBzaGFkb3ctbGcgc2hhZG93LWJsdWUtOTUwJ1xuICAgICAgICAgICAgICAgIDogJ2JnLXppbmMtOTAwLzkwIHRleHQtemluYy00MDAgYm9yZGVyLXppbmMtODAwIGhvdmVyOnRleHQtemluYy0yMDAnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8QWN0aXZpdHkgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWJsdWUtNDAwXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPuKaoSBaxYLEhWN6YSAmIExpc3R3eSBQQ0kgKFd5a3Jlcyk8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVTdWJNb2R1bGUoJ1JFUE9SVCcpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMyBzbTpweC00IHB5LTIgcm91bmRlZC14bCB0ZXh0LXhzIGZvbnQtbW9ubyBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgYm9yZGVyIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyIHdoaXRlc3BhY2Utbm93cmFwICR7XG4gICAgICAgICAgICAgIGFjdGl2ZVN1Yk1vZHVsZSA9PT0gJ1JFUE9SVCdcbiAgICAgICAgICAgICAgICA/ICdiZy1hbWJlci05NTAgdGV4dC1hbWJlci0yMDAgYm9yZGVyLWFtYmVyLTQwMCBzaGFkb3ctbGcgc2hhZG93LWFtYmVyLTk1MCdcbiAgICAgICAgICAgICAgICA6ICdiZy16aW5jLTkwMC85MCB0ZXh0LXppbmMtNDAwIGJvcmRlci16aW5jLTgwMCBob3Zlcjp0ZXh0LXppbmMtMjAwJ1xuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPFNoaWVsZEFsZXJ0IGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1hbWJlci00MDBcIiAvPlxuICAgICAgICAgICAgPHNwYW4+8J+TnCBPYnN6ZXJueSBSYXBvcnQ6IEZhbGUgJiBIaXBlcmJvbGl6YWNqYTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIFJlbmRlciBTdWItbW9kdWxlIGNvbmRpdGlvbmFsIHZpZXdzICovfVxuICAgICAge2FjdGl2ZVN1Yk1vZHVsZSA9PT0gJ0VNX1dBVkVTJyAmJiAoXG4gICAgICAgIDxFbVdhdmVSZXNvbmFuY2VTdXBlcnBvc2l0aW9uU3lzdGVtIG9uTm90aWZ5PXtvbk5vdGlmeX0gLz5cbiAgICAgICl9XG5cbiAgICAgIHthY3RpdmVTdWJNb2R1bGUgPT09ICdDRVJFQkVMTFVNJyAmJiAoXG4gICAgICAgIDxDZXJlYmVsbHVtV2F2ZVdlbGxiZWluZ0NoYXJ0IG9uTm90aWZ5PXtvbk5vdGlmeX0gLz5cbiAgICAgICl9XG5cbiAgICAgIHthY3RpdmVTdWJNb2R1bGUgPT09ICdEQVNIX1BMVUdJTicgJiYgKFxuICAgICAgICA8RGFzaGJvYXJkRGltZW5zaW9uQW5hbHl6ZXJQbHVnaW4gb25Ob3RpZnk9e29uTm90aWZ5fSAvPlxuICAgICAgKX1cblxuICAgICAge2FjdGl2ZVN1Yk1vZHVsZSA9PT0gJ1JFUE9SVCcgJiYgKFxuICAgICAgICA8Q29tcHJlaGVuc2l2ZVdhdmVFbmVyZ3lSZXBvcnQgb25Ob3RpZnk9e29uTm90aWZ5fSAvPlxuICAgICAgKX1cblxuICAgICAge2FjdGl2ZVN1Yk1vZHVsZSA9PT0gJ1BDSV9DT05ORUNUT1JTJyAmJiAoXG4gICAgICAgIDw+XG4gICAgICAgICAgey8qIFRvcCBCYW5uZXIgJiBDb250cm9sIEJhciAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdW5kZWQtM3hsIGJnLXppbmMtOTUwLzk1IGJvcmRlci0yIGJvcmRlci1jeWFuLTUwMC80MCBwLTQgc206cC02IHNoYWRvdy0yeGwgc3BhY2UteS00XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBsZzpmbGV4LXJvdyBpdGVtcy1zdGFydCBsZzppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00IHBiLTQgYm9yZGVyLWIgYm9yZGVyLXppbmMtODAwXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTMuNVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTEyIGgtMTIgcm91bmRlZC0yeGwgYmctZ3JhZGllbnQtdG8tYnIgZnJvbS1jeWFuLTk1MCB2aWEtaW5kaWdvLTk1MCB0by16aW5jLTk1MCBib3JkZXItMiBib3JkZXItY3lhbi00MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgc2hhZG93LWxnIHNoYWRvdy1jeWFuLTUwMC8zMCBzaHJpbmstMFwiPlxuICAgICAgICAgICAgICA8QWN0aXZpdHkgY2xhc3NOYW1lPVwidy02IGgtNiB0ZXh0LWN5YW4tMzAwIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGZsZXgtd3JhcFwiPlxuICAgICAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LWJhc2Ugc206dGV4dC1sZyBmb250LWJsYWNrIGZvbnQtbW9ubyB0cmFja2luZy10aWdodCB0ZXh0LXdoaXRlIHVwcGVyY2FzZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+T0RDWllUWSBaIE9EQklPUk5JS8OTVyBXWUrFmsSGIFrFgcSEQ1pZICYgTElTVFdZIFBDSTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2gxPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIuNSBweS0wLjUgcm91bmRlZC1mdWxsIHRleHQtWzEwcHhdIGZvbnQtbW9ubyBmb250LWJsYWNrIGJvcmRlciBiZy1jeWFuLTk1MC84MCBib3JkZXItY3lhbi01MDAgdGV4dC1jeWFuLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgREFTSEJPQVJEIE1PVU5UIOKAoiA1MDAgSHpcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMiBweS0wLjUgcm91bmRlZC1mdWxsIHRleHQtWzEwcHhdIGZvbnQtbW9ubyBib3JkZXIgYmctaW5kaWdvLTk1MC82MCBib3JkZXItaW5kaWdvLTUwMC80MCB0ZXh0LWluZGlnby0zMDBcIj5cbiAgICAgICAgICAgICAgICAgIHt0ZWxlbWV0cnlTdGF0ZS50b3RhbENvbm5lY3RvcnNNb25pdG9yZWR9IE9kYmlvcm5pa8OzdyBGaXp5Y3pueWNoXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXppbmMtNDAwIG10LTAuNVwiPlxuICAgICAgICAgICAgICAgIEdyYWZpY3puYSB0ZWxlbWV0cmlhIG9zY3lsb3Nrb3Bvd2EgZW5lcmdpaSBlbGVrdHJ5Y3puZWosIG5hcGnEmcSHLCBuYXTEmcW8ZcWELCBjesSZc3RvdGxpd2/Fm2NpIG5vxZtueWNoIGkgaW5kdWtjamkgcG9sYSBFTSBuYSBtYWdpc3RyYWxhY2ggUENJZSBpIEkvTyB6IHphem5hY3pvbnltaSB3c3DDs8WCcnrEmWRueW1pLlxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBRdWljayBBY3Rpb24gQnV0dG9ucyAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGZsZXgtd3JhcFwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVUb2dnbGVTdHJlYW1pbmd9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTMuNSBweS0yIHJvdW5kZWQteGwgdGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGJvcmRlciB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBzaGFkb3ctbGcgJHtcbiAgICAgICAgICAgICAgICB0ZWxlbWV0cnlTdGF0ZS5pc1N0cmVhbWluZ1xuICAgICAgICAgICAgICAgICAgPyAnYmctZW1lcmFsZC05NTAgdGV4dC1lbWVyYWxkLTIwMCBib3JkZXItZW1lcmFsZC01MDAgc2hhZG93LWVtZXJhbGQtOTUwLzUwJ1xuICAgICAgICAgICAgICAgICAgOiAnYmctYW1iZXItOTUwIHRleHQtYW1iZXItMjAwIGJvcmRlci1hbWJlci01MDAgc2hhZG93LWFtYmVyLTk1MC81MCdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHt0ZWxlbWV0cnlTdGF0ZS5pc1N0cmVhbWluZyA/IDxQYXVzZSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+IDogPFBsYXkgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPn1cbiAgICAgICAgICAgICAgPHNwYW4+e3RlbGVtZXRyeVN0YXRlLmlzU3RyZWFtaW5nID8gJ1phdHJ6eW1haiBQcsOzYmtvd2FuaWUnIDogJ1d6bsOzdyBPc2N5bG9za29wJ308L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVBcHBseUdyb3VuZGluZygnQUxMJyl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMuNSBweS0yIHJvdW5kZWQteGwgYmctY3lhbi05MDAvODAgaG92ZXI6YmctY3lhbi04MDAgdGV4dC1jeWFuLTIwMCBib3JkZXIgYm9yZGVyLWN5YW4tNDAwIHRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBzaGFkb3ctbGcgc2hhZG93LWN5YW4tOTUwIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJaYXN0b3N1aiB1emllbWllbmllIGkgc3TFgnVtIHpha8WCw7NjZW5pYSBoYXJtb25pY3puZVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxTaGllbGQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1jeWFuLTMwMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPlV6aWVtaWVuaWUgTGlzdHd5IFBDSTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUluamVjdFRlc3RQdWxzZX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMy41IHB5LTIgcm91bmRlZC14bCBiZy16aW5jLTkwMCBob3ZlcjpiZy16aW5jLTgwMCBib3JkZXIgYm9yZGVyLXJvc2UtNTAwLzQwIHRleHQtcm9zZS0zMDAgdGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJXc3RyenlrbmlqIGltcHVscyByZXpvbmFuc293eSBwb2xhIEVNXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFphcCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXJvc2UtNDAwXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+VGVzdCBJbXB1bHN1IEVNPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBHbG9iYWwgU3VtbWFyeSBLUEkgVGlsZXMgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBzbTpncmlkLWNvbHMtNCBnYXAtM1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zLjUgcm91bmRlZC0yeGwgYmctemluYy05MDAvODAgYm9yZGVyIGJvcmRlci1jeWFuLTUwMC8zMFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC16aW5jLTQwMCB1cHBlcmNhc2VcIj5DYcWCa293aXRhIE1vYyBQb2JpZXJhbmE8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ibGFjayBmb250LW1vbm8gdGV4dC1jeWFuLTMwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgPFphcCBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtY3lhbi00MDBcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj57dGVsZW1ldHJ5U3RhdGUudG90YWxQb3dlckRyYXduV2F0dHN9IFc8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB0ZXh0LXppbmMtNDAwIGZvbnQtbW9ubyBtdC0wLjVcIj42IEFrdHl3bnljaCBNYWdpc3RyYWwgSS9PPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMy41IHJvdW5kZWQtMnhsIGJnLXppbmMtOTAwLzgwIGJvcmRlciBib3JkZXItaW5kaWdvLTUwMC8zMFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC16aW5jLTQwMCB1cHBlcmNhc2VcIj7FmnJlZG5pZSBQb2xlIEluZHVrY2ppIEVNPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYmxhY2sgZm9udC1tb25vIHRleHQtaW5kaWdvLTMwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgPFdhdmVzIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1pbmRpZ28tNDAwXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+e3RlbGVtZXRyeVN0YXRlLmF2ZXJhZ2VFbUZpZWxkVnBtfSBWL208L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtbW9ubyBtdC0wLjVcIj5XIG5vcm1pZSBiZXpwaWVjemXFhHN0d2EgKCZsdDsgMTAgVi9tKTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMuNSByb3VuZGVkLTJ4bCBiZy16aW5jLTkwMC84MCBib3JkZXIgYm9yZGVyLWFtYmVyLTUwMC8zMFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC16aW5jLTQwMCB1cHBlcmNhc2VcIj5NYWtzeW1hbG5hIEN6xJlzdG90bGl3b8WbxIc8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ibGFjayBmb250LW1vbm8gdGV4dC1hbWJlci0zMDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgbXQtMC41XCI+XG4gICAgICAgICAgICAgIDxHYXVnZSBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtYW1iZXItNDAwXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+e3RlbGVtZXRyeVN0YXRlLnBlYWtGcmVxdWVuY3lHaHp9IEdIejwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtYW1iZXItNDAwIGZvbnQtbW9ubyBtdC0wLjVcIj5UaHVuZGVyYm9sdCA0IC8gUENJZSBHZW41IFBIWTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMuNSByb3VuZGVkLTJ4bCBiZy16aW5jLTkwMC84MCBib3JkZXIgYm9yZGVyLXJvc2UtNTAwLzMwXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyB0ZXh0LXppbmMtNDAwIHVwcGVyY2FzZVwiPkFub21hbGllICYgUMSZdGxlIFByxIVkb3dlPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYmxhY2sgZm9udC1tb25vIHRleHQtcm9zZS00MDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgbXQtMC41XCI+XG4gICAgICAgICAgICAgIDxBbGVydFRyaWFuZ2xlIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1yb3NlLTUwMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPnt0ZWxlbWV0cnlTdGF0ZS5hY3RpdmVBbm9tYWxpZXNDb3VudH08L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtbW9ubyBtdC0wLjVcIj4wIG1zIEF1dG9tYXR5Y3puYSBJem9sYWNqYTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogSW50ZXJhY3RpdmUgRmlsdGVyICYgRGlzcGxheSBNb2RlIFNlbGVjdGlvbiBCYXIgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdW5kZWQtM3hsIGJnLXppbmMtOTUwLzkwIGJvcmRlciBib3JkZXItemluYy04MDAgcC00IHNwYWNlLXktNFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgbWQ6ZmxleC1yb3cgaXRlbXMtc3RhcnQgbWQ6aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMyB0ZXh0LXhzIGZvbnQtbW9ub1wiPlxuICAgICAgICAgIFxuICAgICAgICAgIHsvKiBNZXRyaWMgU2VsZWN0b3IgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBmbGV4LXdyYXBcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtemluYy00MDAgdXBwZXJjYXNlIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICA8U2xpZGVycyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWN5YW4tNDAwXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+TWllcnpvbnkgUGFyYW1ldHI6PC9zcGFuPlxuICAgICAgICAgICAgPC9zcGFuPlxuXG4gICAgICAgICAgICB7W1xuICAgICAgICAgICAgICB7IGlkOiAndm9sdGFnZScsIGxhYmVsOiAn4pqhIE5hcGnEmWNpZSAoViknIH0sXG4gICAgICAgICAgICAgIHsgaWQ6ICdjdXJyZW50JywgbGFiZWw6ICfwn5SMIE5hdMSZxbxlbmllIChBKScgfSxcbiAgICAgICAgICAgICAgeyBpZDogJ2VtRmllbGQnLCBsYWJlbDogJ/Cfk6EgUG9sZSBFTSAoVi9tKScgfSxcbiAgICAgICAgICAgICAgeyBpZDogJ3Bvd2VyJywgbGFiZWw6ICfwn5SlIE1vYyAoVyknIH0sXG4gICAgICAgICAgICAgIHsgaWQ6ICdmcmVxdWVuY3knLCBsYWJlbDogJ/Cfk4ggQ3rEmXN0b3RsaXdvxZvEhyAoTUh6KScgfSxcbiAgICAgICAgICAgIF0ubWFwKChtKSA9PiAoXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBrZXk9e20uaWR9XG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2VsZWN0ZWRNZXRyaWMobS5pZCBhcyBhbnkpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTMgcHktMS41IHJvdW5kZWQteGwgYm9yZGVyIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgICAgICBzZWxlY3RlZE1ldHJpYyA9PT0gbS5pZFxuICAgICAgICAgICAgICAgICAgICA/ICdiZy1jeWFuLTk1MCB0ZXh0LWN5YW4tMjAwIGJvcmRlci1jeWFuLTQwMCBzaGFkb3ctbWQgc2hhZG93LWN5YW4tOTUwJ1xuICAgICAgICAgICAgICAgICAgICA6ICdiZy16aW5jLTkwMCB0ZXh0LXppbmMtNDAwIGJvcmRlci16aW5jLTgwMCBob3Zlcjpib3JkZXItemluYy03MDAgaG92ZXI6dGV4dC16aW5jLTIwMCdcbiAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHttLmxhYmVsfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIENvb3JkaW5hdGVzIFRvZ2dsZSAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNob3dDb29yZGluYXRlcyghc2hvd0Nvb3JkaW5hdGVzKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMyBweS0xLjUgcm91bmRlZC14bCBib3JkZXIgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciAke1xuICAgICAgICAgICAgICAgIHNob3dDb29yZGluYXRlc1xuICAgICAgICAgICAgICAgICAgPyAnYmctaW5kaWdvLTk1MCB0ZXh0LWluZGlnby0yMDAgYm9yZGVyLWluZGlnby00MDAgc2hhZG93LW1kIHNoYWRvdy1pbmRpZ28tOTUwJ1xuICAgICAgICAgICAgICAgICAgOiAnYmctemluYy05MDAgdGV4dC16aW5jLTQwMCBib3JkZXItemluYy04MDAnXG4gICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8RXllIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtaW5kaWdvLTMwMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPlNpYXRrYSBXc3DDs8WCcnrEmWRueWNoIFgvWToge3Nob3dDb29yZGluYXRlcyA/ICdXxYHEhENaT05BJyA6ICdXWcWBxIRDWk9OQSd9PC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBDb25uZWN0b3IgRmlsdGVyIFRhYnMgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgZmxleC13cmFwIGJvcmRlci10IGJvcmRlci16aW5jLTgwMC84MCBwdC0zIHRleHQteHMgZm9udC1tb25vXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC16aW5jLTQwMCB1cHBlcmNhc2UgZm9udC1ib2xkXCI+V3liw7NyIE9kYmlvcm5pa2EgLyBaxYLEhWN6YTo8L3NwYW4+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2VsZWN0ZWRDb25uZWN0b3JJZCgnQUxMJyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BweC0yLjUgcHktMSByb3VuZGVkLWxnIGJvcmRlciB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciAke1xuICAgICAgICAgICAgICBzZWxlY3RlZENvbm5lY3RvcklkID09PSAnQUxMJ1xuICAgICAgICAgICAgICAgID8gJ2JnLXdoaXRlIHRleHQtemluYy05NTAgZm9udC1ib2xkIGJvcmRlci13aGl0ZSdcbiAgICAgICAgICAgICAgICA6ICdiZy16aW5jLTkwMCB0ZXh0LXppbmMtNDAwIGJvcmRlci16aW5jLTgwMCBob3Zlcjp0ZXh0LXppbmMtMjAwJ1xuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgV3N6eXN0a2llIE1hZ2lzdHJhbGUgKFdpZG9rIFpiaW9yY3p5KVxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAge3RlbGVtZXRyeVN0YXRlLmNvbm5lY3RvcnMubWFwKChjKSA9PiAoXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIGtleT17Yy5pZH1cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2VsZWN0ZWRDb25uZWN0b3JJZChjLmlkKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMi41IHB5LTEgcm91bmRlZC1sZyBib3JkZXIgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSAke1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ29ubmVjdG9ySWQgPT09IGMuaWRcbiAgICAgICAgICAgICAgICAgID8gJ2JnLWN5YW4tOTUwIHRleHQtY3lhbi0yMDAgYm9yZGVyLWN5YW4tNDAwIHNoYWRvdy1zbSdcbiAgICAgICAgICAgICAgICAgIDogJ2JnLXppbmMtOTAwIHRleHQtemluYy00MDAgYm9yZGVyLXppbmMtODAwIGhvdmVyOnRleHQtemluYy0yMDAnXG4gICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTIgaC0yIHJvdW5kZWQtZnVsbCBiZy1jeWFuLTQwMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPntjLm5hbWUuc3BsaXQoJyAoJylbMF19PC9zcGFuPlxuICAgICAgICAgICAgICB7c2hvd0Nvb3JkaW5hdGVzICYmIChcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtemluYy01MDBcIj5be2MuY29vcmRzLnh9LHtjLmNvb3Jkcy55fV08L3NwYW4+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIE1haW4gR3JhcGhpY2FsIERpc3BsYXk6IExJTkUgQ0hBUlQgV0lUSCBNQVJLRUQgQ09PUkRJTkFURVMgJiBPU0NJTExPU0NPUEUgVFJBQ0VTICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3VuZGVkLTN4bCBiZy16aW5jLTk1MC85NSBib3JkZXItMiBib3JkZXItY3lhbi01MDAvMzAgcC00IHNtOnAtNiBzaGFkb3ctMnhsIHNwYWNlLXktNFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgc206aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMiBib3JkZXItYiBib3JkZXItemluYy04MDAgcGItM1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgIDxBY3Rpdml0eSBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtY3lhbi00MDBcIiAvPlxuICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtc20gc206dGV4dC1iYXNlIGZvbnQtYmxhY2sgZm9udC1tb25vIHRleHQtd2hpdGUgdXBwZXJjYXNlXCI+XG4gICAgICAgICAgICAgIFdZS1JFUyBMSU5JT1dZIE9TQ1lMT1NLT1BVIOKAoiB7c2VsZWN0ZWRNZXRyaWMudG9VcHBlckNhc2UoKX0gVyBDWkFTSUUgUlpFQ1pZV0lTVFlNXG4gICAgICAgICAgICA8L2gyPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHtob3ZlcmVkUG9pbnRDb29yZHMgJiYgKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbW9ubyBiZy16aW5jLTkwMCBweC0zIHB5LTEgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLWN5YW4tNTAwLzQwIHRleHQtY3lhbi0zMDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgPENyb3NzaGFpciBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXJvc2UtNDAwXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+V3Nww7PFgnJ6xJlkbmUgS3Vyc29yYTogPHN0cm9uZz5UPXtob3ZlcmVkUG9pbnRDb29yZHMueH08L3N0cm9uZz4gfCA8c3Ryb25nPldhcnRvxZvEhz17aG92ZXJlZFBvaW50Q29vcmRzLnZhbC50b0ZpeGVkKDIpfTwvc3Ryb25nPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBEeW5hbWljIExpbmUgQ2hhcnQgKFJlY2hhcnRzKSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgaC04MCBzbTpoLTk2XCI+XG4gICAgICAgICAgPFJlc3BvbnNpdmVDb250YWluZXIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiPlxuICAgICAgICAgICAgPExpbmVDaGFydFxuICAgICAgICAgICAgICBkYXRhPXtjaGFydERhdGF9XG4gICAgICAgICAgICAgIG9uTW91c2VNb3ZlPXsoZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGUgJiYgZS5hY3RpdmVQYXlsb2FkICYmIGUuYWN0aXZlUGF5bG9hZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICBzZXRIb3ZlcmVkUG9pbnRDb29yZHMoe1xuICAgICAgICAgICAgICAgICAgICB4OiBlLmFjdGl2ZUxhYmVsIHx8ICcnLFxuICAgICAgICAgICAgICAgICAgICB5OiBlLmFjdGl2ZVBheWxvYWRbMF0ubmFtZSB8fCAnJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsOiBlLmFjdGl2ZVBheWxvYWRbMF0udmFsdWUgfHwgMFxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBvbk1vdXNlTGVhdmU9eygpID0+IHNldEhvdmVyZWRQb2ludENvb3JkcyhudWxsKX1cbiAgICAgICAgICAgICAgbWFyZ2luPXt7IHRvcDogMTUsIHJpZ2h0OiAyNSwgbGVmdDogMCwgYm90dG9tOiAyNSB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8Q2FydGVzaWFuR3JpZCBzdHJva2VEYXNoYXJyYXk9XCIzIDNcIiBzdHJva2U9XCIjMjcyNzJhXCIgLz5cbiAgICAgICAgICAgICAgPFhBeGlzIFxuICAgICAgICAgICAgICAgIGRhdGFLZXk9XCJ0aW1lXCIgXG4gICAgICAgICAgICAgICAgc3Ryb2tlPVwiIzcxNzE3YVwiIFxuICAgICAgICAgICAgICAgIHRpY2s9e3sgZmlsbDogJyNhMWExYWEnLCBmb250U2l6ZTogMTAsIGZvbnRGYW1pbHk6ICdtb25vc3BhY2UnIH19XG4gICAgICAgICAgICAgICAgbGFiZWw9e3sgdmFsdWU6ICdDemFzIFBvbWlhcnUgKFdzcMOzxYJyesSZZG5hIFQpJywgcG9zaXRpb246ICdpbnNpZGVCb3R0b20nLCBvZmZzZXQ6IC0xNSwgZmlsbDogJyM3MTcxN2EnLCBmb250U2l6ZTogMTAgfX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPFlBeGlzIFxuICAgICAgICAgICAgICAgIHN0cm9rZT1cIiM3MTcxN2FcIiBcbiAgICAgICAgICAgICAgICB0aWNrPXt7IGZpbGw6ICcjYTFhMWFhJywgZm9udFNpemU6IDEwLCBmb250RmFtaWx5OiAnbW9ub3NwYWNlJyB9fVxuICAgICAgICAgICAgICAgIGxhYmVsPXt7IFxuICAgICAgICAgICAgICAgICAgdmFsdWU6IHNlbGVjdGVkTWV0cmljID09PSAndm9sdGFnZScgPyAnTmFwacSZY2llIFtWXScgOiBzZWxlY3RlZE1ldHJpYyA9PT0gJ2N1cnJlbnQnID8gJ05hdMSZxbxlbmllIFtBXScgOiBzZWxlY3RlZE1ldHJpYyA9PT0gJ2VtRmllbGQnID8gJ1BvbGUgRU0gW1YvbV0nIDogJ1dhcnRvxZvEhycsIFxuICAgICAgICAgICAgICAgICAgYW5nbGU6IC05MCwgXG4gICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2luc2lkZUxlZnQnLCBcbiAgICAgICAgICAgICAgICAgIGZpbGw6ICcjNzE3MTdhJywgXG4gICAgICAgICAgICAgICAgICBmb250U2l6ZTogMTAgXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPFRvb2x0aXAgXG4gICAgICAgICAgICAgICAgY29udGVudFN0eWxlPXt7IFxuICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzA5MDkwYicsIFxuICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6ICcjMDZiNmQ0JywgXG4gICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcxMnB4JyxcbiAgICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6ICdtb25vc3BhY2UnLFxuICAgICAgICAgICAgICAgICAgZm9udFNpemU6ICcxMXB4JyxcbiAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI2ZmZicsXG4gICAgICAgICAgICAgICAgICBib3hTaGFkb3c6ICcwIDAgMjBweCByZ2JhKDYsMTgyLDIxMiwwLjMpJ1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgZm9ybWF0dGVyPXsodmFsdWU6IGFueSwgbmFtZTogYW55KSA9PiBbXG4gICAgICAgICAgICAgICAgICBgJHtOdW1iZXIodmFsdWUpLnRvRml4ZWQoMil9ICR7c2VsZWN0ZWRNZXRyaWMgPT09ICd2b2x0YWdlJyA/ICdWJyA6IHNlbGVjdGVkTWV0cmljID09PSAnY3VycmVudCcgPyAnQScgOiBzZWxlY3RlZE1ldHJpYyA9PT0gJ2VtRmllbGQnID8gJ1YvbScgOiAnVyd9YCxcbiAgICAgICAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgIGxhYmVsRm9ybWF0dGVyPXsobGFiZWwpID0+IGBXc3DDs8WCcnrEmWRuYSBDemFzb3dhOiAke2xhYmVsfWB9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxMZWdlbmQgXG4gICAgICAgICAgICAgICAgdmVydGljYWxBbGlnbj1cInRvcFwiIFxuICAgICAgICAgICAgICAgIGhlaWdodD17MzZ9IFxuICAgICAgICAgICAgICAgIHdyYXBwZXJTdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBmb250RmFtaWx5OiAnbW9ub3NwYWNlJywgY29sb3I6ICcjYTFhMWFhJyB9fSBcbiAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICB7LyogUmVmZXJlbmNlIHRocmVzaG9sZCBsaW5lcyBmb3Igc2VjdXJpdHkgY2hlY2sgKi99XG4gICAgICAgICAgICAgIHtzZWxlY3RlZE1ldHJpYyA9PT0gJ2VtRmllbGQnICYmIChcbiAgICAgICAgICAgICAgICA8UmVmZXJlbmNlTGluZSB5PXsxMC4wfSBzdHJva2U9XCIjZjQzZjVlXCIgc3Ryb2tlRGFzaGFycmF5PVwiNCA0XCIgbGFiZWw9e3sgdmFsdWU6ICdQUsOTRyBCRVpQSUVDWkXFg1NUV0EgKDEwIFYvbSknLCBmaWxsOiAnI2Y0M2Y1ZScsIGZvbnRTaXplOiAxMCB9fSAvPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICB7c2VsZWN0ZWRNZXRyaWMgPT09ICd2b2x0YWdlJyAmJiAoXG4gICAgICAgICAgICAgICAgPFJlZmVyZW5jZUxpbmUgeT17MTIuMH0gc3Ryb2tlPVwiIzA2YjZkNFwiIHN0cm9rZURhc2hhcnJheT1cIjMgM1wiIGxhYmVsPXt7IHZhbHVlOiAnTGluaWEgQmF6b3dhIFBDSWUgKDEyLjBWKScsIGZpbGw6ICcjMDZiNmQ0JywgZm9udFNpemU6IDEwIH19IC8+XG4gICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgey8qIExpbmUgVHJhY2VzIHBlciBjb25uZWN0b3IgYmFzZWQgb24gc2VsZWN0ZWQgbWV0cmljICovfVxuICAgICAgICAgICAgICB7KHNlbGVjdGVkQ29ubmVjdG9ySWQgPT09ICdBTEwnIHx8IHNlbGVjdGVkQ29ubmVjdG9ySWQgPT09ICdjb25uLXBjaWUtMScpICYmIChcbiAgICAgICAgICAgICAgICA8TGluZVxuICAgICAgICAgICAgICAgICAgdHlwZT1cIm1vbm90b25lXCJcbiAgICAgICAgICAgICAgICAgIGRhdGFLZXk9e3NlbGVjdGVkTWV0cmljID09PSAndm9sdGFnZScgPyAncGNpZTFfdm9sdGFnZScgOiBzZWxlY3RlZE1ldHJpYyA9PT0gJ2N1cnJlbnQnID8gJ3BjaWUxX2N1cnJlbnQnIDogJ3BjaWUxX2VtRmllbGQnfVxuICAgICAgICAgICAgICAgICAgbmFtZT1cIlBDSWUgR2VuNSB4MTYgW1g6MTIwLCBZOjE4MF1cIlxuICAgICAgICAgICAgICAgICAgc3Ryb2tlPVwiIzA2YjZkNFwiXG4gICAgICAgICAgICAgICAgICBzdHJva2VXaWR0aD17Mi41fVxuICAgICAgICAgICAgICAgICAgZG90PXt7IHI6IDMsIGZpbGw6ICcjMDZiNmQ0JyB9fVxuICAgICAgICAgICAgICAgICAgYWN0aXZlRG90PXt7IHI6IDYsIHN0cm9rZTogJyNmZmYnLCBzdHJva2VXaWR0aDogMiB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgeyhzZWxlY3RlZENvbm5lY3RvcklkID09PSAnQUxMJyB8fCBzZWxlY3RlZENvbm5lY3RvcklkID09PSAnY29ubi12cm0tcmFpbCcpICYmIChcbiAgICAgICAgICAgICAgICA8TGluZVxuICAgICAgICAgICAgICAgICAgdHlwZT1cIm1vbm90b25lXCJcbiAgICAgICAgICAgICAgICAgIGRhdGFLZXk9e3NlbGVjdGVkTWV0cmljID09PSAndm9sdGFnZScgPyAndnJtX3ZvbHRhZ2UnIDogc2VsZWN0ZWRNZXRyaWMgPT09ICdjdXJyZW50JyA/ICd2cm1fY3VycmVudCcgOiAndnJtX2VtRmllbGQnfVxuICAgICAgICAgICAgICAgICAgbmFtZT1cIjEyVkhQV1IgVlJNIFtYOjI2MCwgWTo4MF1cIlxuICAgICAgICAgICAgICAgICAgc3Ryb2tlPVwiI2E4NTVmN1wiXG4gICAgICAgICAgICAgICAgICBzdHJva2VXaWR0aD17Mi41fVxuICAgICAgICAgICAgICAgICAgZG90PXt7IHI6IDMsIGZpbGw6ICcjYTg1NWY3JyB9fVxuICAgICAgICAgICAgICAgICAgYWN0aXZlRG90PXt7IHI6IDYsIHN0cm9rZTogJyNmZmYnLCBzdHJva2VXaWR0aDogMiB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgeyhzZWxlY3RlZENvbm5lY3RvcklkID09PSAnQUxMJyB8fCBzZWxlY3RlZENvbm5lY3RvcklkID09PSAnY29ubi11c2JjLXBkJykgJiYgKFxuICAgICAgICAgICAgICAgIDxMaW5lXG4gICAgICAgICAgICAgICAgICB0eXBlPVwibW9ub3RvbmVcIlxuICAgICAgICAgICAgICAgICAgZGF0YUtleT17c2VsZWN0ZWRNZXRyaWMgPT09ICd2b2x0YWdlJyA/ICd1c2JjX3ZvbHRhZ2UnIDogc2VsZWN0ZWRNZXRyaWMgPT09ICdjdXJyZW50JyA/ICd1c2JjX2N1cnJlbnQnIDogJ3VzYmNfZW1GaWVsZCd9XG4gICAgICAgICAgICAgICAgICBuYW1lPVwiVVNCLUMgLyBUaHVuZGVyYm9sdCBbWDo0MCwgWToxMTBdXCJcbiAgICAgICAgICAgICAgICAgIHN0cm9rZT1cIiNlYWIzMDhcIlxuICAgICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg9ezJ9XG4gICAgICAgICAgICAgICAgICBkb3Q9e3sgcjogMi41LCBmaWxsOiAnI2VhYjMwOCcgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgIHsoc2VsZWN0ZWRDb25uZWN0b3JJZCA9PT0gJ0FMTCcgfHwgc2VsZWN0ZWRDb25uZWN0b3JJZCA9PT0gJ2Nvbm4tcGNpZS0yJykgJiYgKFxuICAgICAgICAgICAgICAgIDxMaW5lXG4gICAgICAgICAgICAgICAgICB0eXBlPVwibW9ub3RvbmVcIlxuICAgICAgICAgICAgICAgICAgZGF0YUtleT17c2VsZWN0ZWRNZXRyaWMgPT09ICd2b2x0YWdlJyA/ICdwY2llMl92b2x0YWdlJyA6IHNlbGVjdGVkTWV0cmljID09PSAnY3VycmVudCcgPyAncGNpZTJfY3VycmVudCcgOiAncGNpZTJfZW1GaWVsZCd9XG4gICAgICAgICAgICAgICAgICBuYW1lPVwiUENJZSB4NCBOVk1lIFtYOjEyMCwgWTozMjBdXCJcbiAgICAgICAgICAgICAgICAgIHN0cm9rZT1cIiMxMGI5ODFcIlxuICAgICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg9ezJ9XG4gICAgICAgICAgICAgICAgICBkb3Q9e3sgcjogMi41LCBmaWxsOiAnIzEwYjk4MScgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgIHsoc2VsZWN0ZWRDb25uZWN0b3JJZCA9PT0gJ0FMTCcgfHwgc2VsZWN0ZWRDb25uZWN0b3JJZCA9PT0gJ2Nvbm4tZHAtaGRtaScpICYmIChcbiAgICAgICAgICAgICAgICA8TGluZVxuICAgICAgICAgICAgICAgICAgdHlwZT1cIm1vbm90b25lXCJcbiAgICAgICAgICAgICAgICAgIGRhdGFLZXk9e3NlbGVjdGVkTWV0cmljID09PSAndm9sdGFnZScgPyAnZHBfdm9sdGFnZScgOiBzZWxlY3RlZE1ldHJpYyA9PT0gJ2N1cnJlbnQnID8gJ2RwX2N1cnJlbnQnIDogJ2RwX2VtRmllbGQnfVxuICAgICAgICAgICAgICAgICAgbmFtZT1cIkRQIC8gSERNSSBWaWRlbyBbWDo0MCwgWToyMjBdXCJcbiAgICAgICAgICAgICAgICAgIHN0cm9rZT1cIiNmOTczMTZcIlxuICAgICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg9ezEuNX1cbiAgICAgICAgICAgICAgICAgIGRvdD17eyByOiAyLCBmaWxsOiAnI2Y5NzMxNicgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgIHsoc2VsZWN0ZWRDb25uZWN0b3JJZCA9PT0gJ0FMTCcgfHwgc2VsZWN0ZWRDb25uZWN0b3JJZCA9PT0gJ2Nvbm4tZ3Bpby1idXMnKSAmJiAoXG4gICAgICAgICAgICAgICAgPExpbmVcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJtb25vdG9uZVwiXG4gICAgICAgICAgICAgICAgICBkYXRhS2V5PXtzZWxlY3RlZE1ldHJpYyA9PT0gJ3ZvbHRhZ2UnID8gJ2dwaW9fdm9sdGFnZScgOiBzZWxlY3RlZE1ldHJpYyA9PT0gJ2N1cnJlbnQnID8gJ2dwaW9fY3VycmVudCcgOiAnZ3Bpb19lbUZpZWxkJ31cbiAgICAgICAgICAgICAgICAgIG5hbWU9XCJHUElPIC8gSlRBRyBbWDozNDAsIFk6MzYwXVwiXG4gICAgICAgICAgICAgICAgICBzdHJva2U9XCIjNjQ3NDhiXCJcbiAgICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPXsxLjV9XG4gICAgICAgICAgICAgICAgICBkb3Q9e3sgcjogMiwgZmlsbDogJyM2NDc0OGInIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvTGluZUNoYXJ0PlxuICAgICAgICAgIDwvUmVzcG9uc2l2ZUNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC1bMTFweF0gZm9udC1tb25vIHRleHQtemluYy00MDAgcHQtMiBib3JkZXItdCBib3JkZXItemluYy04MDAvODBcIj5cbiAgICAgICAgICA8c3Bhbj4qIFByw7Nia293YW5pZSBjacSFZ8WCZTogNTAwIHByw7NiZWsvc2VrdW5kxJkgeiBpbnRlcnBvbGFjasSFIHdpZWxvbWlhbm93xIUgc3BsaW5lLjwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWN5YW4tMzAwXCI+V3Nww7PFgnJ6xJlkbmUgdyBsZWdlbmR6aWUgd3NrYXp1asSFIGZpenljem5lIHBvxYJvxbxlbmllIG5hIHDFgnljaWUgW1gsIFksIFBpbnldPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogUGh5c2ljYWwgSGFyZHdhcmUgTW90aGVyYm9hcmQgTWF0cml4IE1hcCAoR3JhcGhpYyBDb29yZHMgJiBTb2NrZXRzKSAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBsZzpncmlkLWNvbHMtMTIgZ2FwLTZcIj5cbiAgICAgICAgXG4gICAgICAgIHsvKiBNb3RoZXJib2FyZCBQaHlzaWNhbCBTY2hlbWF0aWMgd2l0aCBDb29yZGluYXRlIE1hcmtlcnMgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tNyByb3VuZGVkLTN4bCBiZy16aW5jLTk1MC85NSBib3JkZXItMiBib3JkZXItemluYy04MDAgcC01IHNwYWNlLXktNFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGJvcmRlci1iIGJvcmRlci16aW5jLTgwMCBwYi0zIHRleHQteHMgZm9udC1tb25vXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXppbmMtMjAwIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICA8TGF5ZXJzIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1jeWFuLTQwMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPlNDSEVNQVQgRklaWUNaTlkgTElTVFdZIFBDSSAmIFrFgcSEQ1pZIFpFIFdTUMOTxYFSWsSYRE5ZTUkgW1gsIFldPC9zcGFuPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC16aW5jLTQwMCBiZy16aW5jLTkwMCBweC0yIHB5LTAuNSByb3VuZGVkIGJvcmRlciBib3JkZXItemluYy03MDBcIj5cbiAgICAgICAgICAgICAgU2lhdGthIDQwMHg0MDAgbW1cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBHcmFwaGljYWwgTW90aGVyYm9hcmQgQ2FudmFzIExheW91dCAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIHctZnVsbCBoLTgwIHJvdW5kZWQtMnhsIGJnLXppbmMtOTAwLzYwIGJvcmRlci0yIGJvcmRlci1kYXNoZWQgYm9yZGVyLXppbmMtNzAwLzgwIHAtNCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgICAgIHsvKiBDb29yZGluYXRlIEdyaWQgQmFja2dyb3VuZCAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1bbGluZWFyLWdyYWRpZW50KHRvX3JpZ2h0LCMyNzI3MmFfMXB4LHRyYW5zcGFyZW50XzFweCksbGluZWFyLWdyYWRpZW50KHRvX2JvdHRvbSwjMjcyNzJhXzFweCx0cmFuc3BhcmVudF8xcHgpXSBiZy1bc2l6ZToyMHB4XzIwcHhdIG9wYWNpdHktNDBcIiAvPlxuXG4gICAgICAgICAgICB7LyogU29ja2V0IENQVSByZXByZXNlbnRhdGlvbiBpbiBjZW50ZXIgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGxlZnQtWzE4MHB4XSB0b3AtWzE0MHB4XSB3LTI0IGgtMjQgcm91bmRlZC0yeGwgYmctemluYy05NTAgYm9yZGVyLTIgYm9yZGVyLWluZGlnby01MDAvNTAgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgc2hhZG93LWxnXCI+XG4gICAgICAgICAgICAgIDxDcHUgY2xhc3NOYW1lPVwidy03IGgtNyB0ZXh0LWluZGlnby00MDAgYW5pbWF0ZS1wdWxzZVwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzlweF0gZm9udC1tb25vIHRleHQtemluYy00MDAgbXQtMVwiPlNvQyAvIENQVTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bOHB4XSBmb250LW1vbm8gdGV4dC1pbmRpZ28tMzAwXCI+W1g6MjAwLCBZOjE2MF08L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIEludGVyYWN0aXZlIFBoeXNpY2FsIFNlbnNvciBQaW5zIGZvciBlYWNoIGNvbm5lY3RvciAqL31cbiAgICAgICAgICAgIHt0ZWxlbWV0cnlTdGF0ZS5jb25uZWN0b3JzLm1hcCgoYykgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gc2VsZWN0ZWRDb25uZWN0b3JJZCA9PT0gYy5pZDtcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICBrZXk9e2MuaWR9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTZWxlY3RlZENvbm5lY3RvcklkKGMuaWQpfVxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogYCR7KGMuY29vcmRzLnggLyA0MDApICogMTAwfSVgLFxuICAgICAgICAgICAgICAgICAgICB0b3A6IGAkeyhjLmNvb3Jkcy55IC8gNDAwKSAqIDEwMH0lYCxcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BhYnNvbHV0ZSAtdHJhbnNsYXRlLXgtMS8yIC10cmFuc2xhdGUteS0xLzIgcC0yIHJvdW5kZWQteGwgYm9yZGVyLTIgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBzZWxlY3Qtbm9uZSBzaGFkb3cteGwgJHtcbiAgICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZFxuICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWN5YW4tOTUwIGJvcmRlci1jeWFuLTQwMCBzaGFkb3ctY3lhbi01MDAvNDAgc2NhbGUtMTA1IHotMjAnXG4gICAgICAgICAgICAgICAgICAgICAgOiAnYmctemluYy05NTAvOTAgYm9yZGVyLXppbmMtNzAwIGhvdmVyOmJvcmRlci1jeWFuLTUwMC82MCB6LTEwJ1xuICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICB0aXRsZT17YCR7Yy5uYW1lfSAtIEtsaWtuaWosIGFieSB3eWl6b2xvd2HEhyBvZGN6eXRgfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgdy0yLjUgaC0yLjUgcm91bmRlZC1mdWxsICR7Yy5zdGF0dXMgPT09ICdBTk9NQUxZX0RFVEVDVEVEJyA/ICdiZy1yb3NlLTUwMCBhbmltYXRlLXBpbmcnIDogJ2JnLWN5YW4tNDAwIGFuaW1hdGUtcHVsc2UnfWB9IC8+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVsxMHB4XVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LXdoaXRlIGxlYWRpbmctdGlnaHRcIj57Yy5uYW1lLnNwbGl0KCcgJylbMF19PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bOHB4XSB0ZXh0LWN5YW4tMzAwXCI+WDp7Yy5jb29yZHMueH0gWTp7Yy5jb29yZHMueX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtbW9ubyB0ZXh0LXppbmMtNDAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgPHNwYW4+S2xpa25paiBkb3dvbG5lIHrFgsSFY3plIG5hIHNjaGVtYWNpZSwgYWJ5IHBvZGVqcnplxIcgamVnbyBzemN6ZWfDs8WCb3dlIHBhcmFtZXRyeSBwcsSFZHUuPC9zcGFuPlxuICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2VsZWN0ZWRDb25uZWN0b3JJZCgnQUxMJyl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtY3lhbi00MDAgaG92ZXI6dW5kZXJsaW5lIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgUmVzZXR1aiBkbyB3aWRva3Ugb2fDs2xuZWdvXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIERldGFpbGVkIEVsZWN0cmljYWwgUGFyYW1ldGVycyBUYWJsZSBwZXIgQ29ubmVjdG9yICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTUgcm91bmRlZC0zeGwgYmctemluYy05NTAvOTUgYm9yZGVyLTIgYm9yZGVyLXppbmMtODAwIHAtNSBzcGFjZS15LTQgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gYm9yZGVyLWIgYm9yZGVyLXppbmMtODAwIHBiLTMgdGV4dC14cyBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC16aW5jLTIwMCBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8WmFwIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1hbWJlci00MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPlBBUkFNRVRSWSBFTkVSR0lJIEVMRUtUUllDWk5FSjwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LWVtZXJhbGQtNDAwIGJnLWVtZXJhbGQtOTUwLzYwIHB4LTIgcHktMC41IHJvdW5kZWQgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTUwMC80MFwiPlxuICAgICAgICAgICAgICAgIFNUQU46IHtzZWxlY3RlZFNpbmdsZUNvbm5lY3RvciA/IHNlbGVjdGVkU2luZ2xlQ29ubmVjdG9yLnN0YXR1cyA6ICdXU1pZU1RLSUUgT1BUWU1BTE5FJ31cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHtzZWxlY3RlZFNpbmdsZUNvbm5lY3RvciA/IChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTMgcHQtMyBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtYm9sZCB0ZXh0LXdoaXRlXCI+e3NlbGVjdGVkU2luZ2xlQ29ubmVjdG9yLm5hbWV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC16aW5jLTQwMFwiPntzZWxlY3RlZFNpbmdsZUNvbm5lY3Rvci5waHlzaWNhbExvY2F0aW9ufTwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0yIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yLjUgcm91bmRlZC14bCBiZy16aW5jLTkwMCBib3JkZXIgYm9yZGVyLXppbmMtODAwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtemluYy00MDAgYmxvY2tcIj5OYXBpxJljaWUgKFYpOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtYmxhY2sgdGV4dC1jeWFuLTMwMFwiPntzZWxlY3RlZFNpbmdsZUNvbm5lY3Rvci52b2x0YWdlVn0gVjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMi41IHJvdW5kZWQteGwgYmctemluYy05MDAgYm9yZGVyIGJvcmRlci16aW5jLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXppbmMtNDAwIGJsb2NrXCI+TmF0xJnFvGVuaWUgKEEpOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtYmxhY2sgdGV4dC1hbWJlci0zMDBcIj57c2VsZWN0ZWRTaW5nbGVDb25uZWN0b3IuY3VycmVudEFtcGVyZXN9IEE8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIuNSByb3VuZGVkLXhsIGJnLXppbmMtOTAwIGJvcmRlciBib3JkZXItemluYy04MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC16aW5jLTQwMCBibG9ja1wiPk1vYyBDaHdpbG93YSAoVyk6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWJhc2UgZm9udC1ibGFjayB0ZXh0LWluZGlnby0zMDBcIj57c2VsZWN0ZWRTaW5nbGVDb25uZWN0b3IucG93ZXJXYXR0c30gVzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMi41IHJvdW5kZWQteGwgYmctemluYy05MDAgYm9yZGVyIGJvcmRlci16aW5jLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXppbmMtNDAwIGJsb2NrXCI+UG9sZSBJbmR1a2NqaSBFTTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJsYWNrIHRleHQtcm9zZS0zMDBcIj57c2VsZWN0ZWRTaW5nbGVDb25uZWN0b3IuZW1GaWVsZFN0cmVuZ3RoVnBtfSBWL208L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIuNSByb3VuZGVkLXhsIGJnLXppbmMtOTAwIGJvcmRlciBib3JkZXItemluYy04MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC16aW5jLTQwMCBibG9ja1wiPkN6xJlzdG90bGl3b8WbxIcgTm/Fm25hOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC13aGl0ZVwiPntzZWxlY3RlZFNpbmdsZUNvbm5lY3Rvci5mcmVxdWVuY3lNaHp9IE1Iejwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMi41IHJvdW5kZWQteGwgYmctemluYy05MDAgYm9yZGVyIGJvcmRlci16aW5jLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXppbmMtNDAwIGJsb2NrXCI+VGVtcGVyYXR1cmEgU3R5a8Ozdzo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtZW1lcmFsZC00MDBcIj57c2VsZWN0ZWRTaW5nbGVDb25uZWN0b3IudGVtcGVyYXR1cmVDfcKwQzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMgcm91bmRlZC14bCBiZy16aW5jLTkwMC82MCBib3JkZXIgYm9yZGVyLXppbmMtODAwIHRleHQtWzExcHhdIHRleHQtemluYy0zMDBcIj5cbiAgICAgICAgICAgICAgICAgIDxzdHJvbmc+V3Nww7PFgnJ6xJlkbmUgUMWCeXR5Ojwvc3Ryb25nPiBYID0ge3NlbGVjdGVkU2luZ2xlQ29ubmVjdG9yLmNvb3Jkcy54fSBtbSwgWSA9IHtzZWxlY3RlZFNpbmdsZUNvbm5lY3Rvci5jb29yZHMueX0gbW0gKHtzZWxlY3RlZFNpbmdsZUNvbm5lY3Rvci5jb29yZHMucGluQ291bnR9IHN0eWvDs3cvcGluw7N3KS5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMi41IHB0LTMgZm9udC1tb25vIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtemluYy0zMDBcIj5MaXN0YSB3c3p5c3RraWNoIGFrdHl3bnljaCBvZGJpb3JuaWvDs3c6PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTIgbWF4LWgtNjAgb3ZlcmZsb3cteS1hdXRvIHByLTFcIj5cbiAgICAgICAgICAgICAgICAgIHt0ZWxlbWV0cnlTdGF0ZS5jb25uZWN0b3JzLm1hcCgoYykgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IFxuICAgICAgICAgICAgICAgICAgICAgIGtleT17Yy5pZH0gXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2VsZWN0ZWRDb25uZWN0b3JJZChjLmlkKX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTIuNSByb3VuZGVkLXhsIGJnLXppbmMtOTAwIGJvcmRlciBib3JkZXItemluYy04MDAgaG92ZXI6Ym9yZGVyLWN5YW4tNTAwLzYwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBjdXJzb3ItcG9pbnRlciB0cmFuc2l0aW9uLWFsbFwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlIGZvbnQtYm9sZFwiPntjLm5hbWUuc3BsaXQoJyAoJylbMF19PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtemluYy00MDBcIj5Lb29yZHluYXR5OiBbe2MuY29vcmRzLnh9LCB7Yy5jb29yZHMueX1dPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY3lhbi0zMDAgZm9udC1ib2xkXCI+e2Mudm9sdGFnZVZ9ViAvIHtjLmN1cnJlbnRBbXBlcmVzfUE8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1yb3NlLTMwMFwiPntjLmVtRmllbGRTdHJlbmd0aFZwbX0gVi9tPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZUFwcGx5R3JvdW5kaW5nKHNlbGVjdGVkQ29ubmVjdG9ySWQgPT09ICdBTEwnID8gdW5kZWZpbmVkIDogc2VsZWN0ZWRDb25uZWN0b3JJZCl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHktMi41IHB4LTQgcm91bmRlZC14bCBiZy1ncmFkaWVudC10by1yIGZyb20tY3lhbi02MDAgdG8taW5kaWdvLTYwMCBob3Zlcjpmcm9tLWN5YW4tNTAwIGhvdmVyOnRvLWluZGlnby01MDAgdGV4dC13aGl0ZSB0ZXh0LXhzIGZvbnQtbW9ubyBmb250LWJvbGQgdXBwZXJjYXNlIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0yIGJvcmRlciBib3JkZXItY3lhbi00MDAgc2hhZG93LWxnIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8U2hpZWxkIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1jeWFuLTIwMFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5aYXN0b3N1aiBVemllbWllbmllIEVrcmFudWrEhWNlPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBIYXJkd2FyZSBJbmNpZGVudCAmIFRlbGVtZXRyeSBBdWRpdCBMb2cgVGFibGUgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdW5kZWQtM3hsIGJnLXppbmMtOTUwLzk1IGJvcmRlci0yIGJvcmRlci16aW5jLTgwMCBwLTQgc206cC02IHNwYWNlLXktMyBmb250LW1vbm8gdGV4dC14c1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBib3JkZXItYiBib3JkZXItemluYy04MDAgcGItMlwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtemluYy0yMDAgZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICA8QWN0aXZpdHkgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWN5YW4tNDAwXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPlJFSkVTVFIgWkRBUlpFxYMgRU5FUkdFVFlDWk5ZQ0ggJiBQUsOTQktPV0FOSUEgU1BSWsSYVE9XRUdPPC9zcGFuPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXppbmMtNDAwXCI+QWt0dWFsaXphY2phIG5hIMW8eXdvPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC1oLTQwIG92ZXJmbG93LXktYXV0byBzcGFjZS15LTEuNSBwci0xIHRleHQtWzExcHhdXCI+XG4gICAgICAgICAge3RlbGVtZXRyeVN0YXRlLnJlY2VudEluY2lkZW50cy5tYXAoKGluYykgPT4gKFxuICAgICAgICAgICAgPGRpdiBcbiAgICAgICAgICAgICAga2V5PXtpbmMuaWR9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMi41IHJvdW5kZWQteGwgYmctemluYy05MDAgYm9yZGVyIGJvcmRlci16aW5jLTgwMCBmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IHNtOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTIgaG92ZXI6Ym9yZGVyLXppbmMtNzAwXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtY3lhbi00MDAgZm9udC1ib2xkXCI+W3tpbmMuY29ubmVjdG9yTmFtZX1dPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtemluYy0yMDBcIj57aW5jLmFjdGlvblRha2VufTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgc2hyaW5rLTAgdGV4dC1bMTBweF0gdGV4dC16aW5jLTQwMFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYW1iZXItNDAwXCI+e2luYy5yZWNvcmRlZFZhbHVlc308L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC16aW5jLTUwMFwiPntpbmMudGltZXN0YW1wfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDwvPlxuICAgICAgKX1cblxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdLCJtYXBwaW5ncyI6IkFBcUdZLFNBd0VKLFVBeEVJO0FBckdaLFNBQWdCLFVBQVUsaUJBQWlCO0FBQzNDO0FBQUEsRUFDRTtBQUFBLEVBQVU7QUFBQSxFQUFLO0FBQUEsRUFBUTtBQUFBLEVBQUs7QUFBQSxFQUFPO0FBQUEsRUFBZTtBQUFBLEVBQU07QUFBQSxFQUMvQjtBQUFBLEVBQXFCO0FBQUEsRUFBUztBQUFBLEVBQ2hEO0FBQUEsRUFBTztBQUFBLEVBQWE7QUFBQSxFQUFnQztBQUFBLE9BQ3REO0FBQ1A7QUFBQSxFQUNFO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxPQUdLO0FBQ1AsU0FBUywwQkFBMEI7QUFPbkMs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