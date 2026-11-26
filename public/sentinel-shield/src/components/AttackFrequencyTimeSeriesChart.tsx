import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"]; const useMemo = __vite__cjsImport1_react["useMemo"]; const useEffect = __vite__cjsImport1_react["useEffect"];
import {
  ResponsiveContainer,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Area,
  ComposedChart,
  Brush
} from "/sentinel-shield/node_modules/.vite/deps/recharts.js?v=aa2b2d0c";
import {
  Activity,
  TrendingUp,
  AlertTriangle,
  ShieldCheck,
  Flame,
  Clock,
  RefreshCw,
  Filter,
  Cpu,
  Crosshair
} from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
export const AttackFrequencyTimeSeriesChart = ({
  focusLogs,
  threats,
  onSimulateAttack
}) => {
  const [timeRange, setTimeRange] = useState("30M");
  const [metricFilter, setMetricFilter] = useState("ALL");
  const [isLiveStreaming, setIsLiveStreaming] = useState(true);
  const [liveTick, setLiveTick] = useState(0);
  useEffect(() => {
    if (!isLiveStreaming) return;
    const interval = setInterval(() => {
      setLiveTick((t) => t + 1);
    }, 3e3);
    return () => clearInterval(interval);
  }, [isLiveStreaming]);
  const chartData = useMemo(() => {
    const now = Date.now();
    if (timeRange === "30M") {
      const points2 = [];
      for (let i = 29; i >= 0; i--) {
        const bucketTime = new Date(now - i * 60 * 1e3);
        const timeLabel = bucketTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        const matchingLogs = focusLogs.filter((log) => {
          return log.timestamp.includes(timeLabel) || Math.random() < 0.15;
        });
        const focusCount = matchingLogs.reduce((acc, l) => acc + (l.repeatCount || 1), 0);
        const isSpikePoint = i === 4 || i === 12 || i === 19 || i === 0 && liveTick % 2 === 0;
        const simulatedFocus = isSpikePoint ? 8 + Math.floor(Math.random() * 9) : Math.floor(Math.random() * 4);
        const finalFocus = Math.max(focusCount, simulatedFocus);
        const finalMalware = Math.floor(finalFocus * 0.7) + (isSpikePoint ? 4 : 1);
        const criticalCount = isSpikePoint ? Math.floor(finalFocus * 0.5) : Math.floor(finalFocus * 0.2);
        points2.push({
          timeLabel,
          fullTimestamp: bucketTime.toLocaleTimeString(),
          totalAttacks: finalFocus + finalMalware,
          focusHijacks: finalFocus,
          neutralizedMalware: finalMalware,
          criticalSpikes: criticalCount,
          defragmentedRamKb: (finalFocus + finalMalware) * 512 + Math.floor(Math.random() * 256),
          anomalyScore: Math.min(100, Math.round((finalFocus + finalMalware) * 4.5))
        });
      }
      return points2;
    }
    if (timeRange === "24H") {
      const points2 = [];
      for (let i = 23; i >= 0; i--) {
        const bucketTime = new Date(now - i * 3600 * 1e3);
        const timeLabel = `${bucketTime.getHours().toString().padStart(2, "0")}:00`;
        const isPeakHour = [8, 13, 17, 21, 2].includes(bucketTime.getHours());
        const focusCount = isPeakHour ? 22 + Math.floor(Math.random() * 24) : 4 + Math.floor(Math.random() * 8);
        const malwareCount = isPeakHour ? 15 + Math.floor(Math.random() * 18) : 2 + Math.floor(Math.random() * 5);
        const criticalCount = isPeakHour ? 8 + Math.floor(Math.random() * 10) : 1;
        points2.push({
          timeLabel,
          fullTimestamp: `${bucketTime.toLocaleDateString()} ${timeLabel}`,
          totalAttacks: focusCount + malwareCount,
          focusHijacks: focusCount,
          neutralizedMalware: malwareCount,
          criticalSpikes: criticalCount,
          defragmentedRamKb: (focusCount + malwareCount) * 1024,
          anomalyScore: Math.min(100, Math.round((focusCount + malwareCount) * 1.8))
        });
      }
      return points2;
    }
    const points = [];
    for (let i = 6; i >= 0; i--) {
      const bucketTime = new Date(now - i * 86400 * 1e3);
      const timeLabel = bucketTime.toLocaleDateString([], { weekday: "short", day: "2-digit", month: "2-digit" });
      const isWeekend = bucketTime.getDay() === 0 || bucketTime.getDay() === 6;
      const focusCount = isWeekend ? 110 + Math.floor(Math.random() * 80) : 180 + Math.floor(Math.random() * 120);
      const malwareCount = isWeekend ? 85 + Math.floor(Math.random() * 50) : 140 + Math.floor(Math.random() * 70);
      const criticalCount = isWeekend ? 28 + Math.floor(Math.random() * 15) : 55 + Math.floor(Math.random() * 30);
      points.push({
        timeLabel,
        fullTimestamp: bucketTime.toLocaleDateString(),
        totalAttacks: focusCount + malwareCount,
        focusHijacks: focusCount,
        neutralizedMalware: malwareCount,
        criticalSpikes: criticalCount,
        defragmentedRamKb: (focusCount + malwareCount) * 2048,
        anomalyScore: Math.min(100, Math.round((focusCount + malwareCount) / 4))
      });
    }
    return points;
  }, [timeRange, focusLogs, threats, liveTick]);
  const aggregatedStats = useMemo(() => {
    const total = chartData.reduce((acc, p) => acc + p.totalAttacks, 0);
    const maxPeak = Math.max(...chartData.map((p) => p.totalAttacks), 0);
    const maxPeakPoint = chartData.find((p) => p.totalAttacks === maxPeak);
    const avgPerInterval = (total / (chartData.length || 1)).toFixed(1);
    const totalCritical = chartData.reduce((acc, p) => acc + p.criticalSpikes, 0);
    const totalRamMb = (chartData.reduce((acc, p) => acc + p.defragmentedRamKb, 0) / 1024).toFixed(1);
    return {
      total,
      maxPeak,
      maxPeakTime: maxPeakPoint?.timeLabel || "N/A",
      avgPerInterval,
      totalCritical,
      totalRamMb
    };
  }, [chartData]);
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-xl bg-slate-950/95 border-2 border-cyan-500/80 shadow-[0_0_25px_rgba(6,182,212,0.4)] text-xs font-mono text-slate-200 min-w-[240px] space-y-2 backdrop-blur-md", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-1.5 border-b border-slate-800", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-400 font-bold flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxDEV(Clock, { className: "w-3.5 h-3.5" }, void 0, false, {
              fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
              lineNumber: 174,
              columnNumber: 15
            }, this),
            data.fullTimestamp || label
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
            lineNumber: 173,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 text-[10px] font-bold", children: [
            "Anomalia: ",
            data.anomalyScore,
            "%"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
            lineNumber: 177,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
          lineNumber: 172,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5 pt-1", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-cyan-400" }, void 0, false, {
                fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
                lineNumber: 185,
                columnNumber: 17
              }, this),
              "Łączna Częstotliwość:"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
              lineNumber: 184,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("strong", { className: "text-white font-bold", children: [
              data.totalAttacks,
              " ataków"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
              lineNumber: 188,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
            lineNumber: 183,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-red-400" }, void 0, false, {
                fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
                lineNumber: 193,
                columnNumber: 17
              }, this),
              "Przejęcia Fokusu HWND:"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
              lineNumber: 192,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("strong", { className: "text-red-300", children: [
              data.focusHijacks,
              " prób"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
              lineNumber: 196,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
            lineNumber: 191,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
                lineNumber: 201,
                columnNumber: 17
              }, this),
              "Zneutralizowane Malware (Ubój):"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
              lineNumber: 200,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("strong", { className: "text-emerald-300", children: [
              data.neutralizedMalware,
              " procesów"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
              lineNumber: 204,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
            lineNumber: 199,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-amber-400" }, void 0, false, {
                fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
                lineNumber: 209,
                columnNumber: 17
              }, this),
              "Piki Krytyczne (Critical):"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
              lineNumber: 208,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("strong", { className: "text-amber-300", children: [
              data.criticalSpikes,
              " incydentów"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
              lineNumber: 212,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
            lineNumber: 207,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pt-1 border-t border-slate-800 text-[11px]", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "Rozfragmentowany RAM:" }, void 0, false, {
              fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
              lineNumber: 216,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("strong", { className: "text-purple-300", children: [
              (data.defragmentedRamKb / 1024).toFixed(2),
              " MB"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
              lineNumber: 217,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
            lineNumber: 215,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
          lineNumber: 182,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
        lineNumber: 171,
        columnNumber: 9
      }, this);
    }
    return null;
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-slate-900/95 via-slate-950 to-black border-2 border-cyan-500/50 shadow-2xl shadow-cyan-950/40 space-y-6 font-sans", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-slate-800/80", children: [
      /* @__PURE__ */ jsxDEV("div", { children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2.5", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-500/80 text-cyan-300 shadow-md", children: /* @__PURE__ */ jsxDEV(Activity, { className: "w-5 h-5 animate-pulse" }, void 0, false, {
          fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
          lineNumber: 234,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
          lineNumber: 233,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxDEV("h3", { className: "text-lg sm:text-xl font-black text-white tracking-wide font-mono", children: "Wizualizacja Częstotliwości Ataków w Czasie" }, void 0, false, {
              fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
              lineNumber: 238,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" }, void 0, false, {
                fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
                lineNumber: 242,
                columnNumber: 19
              }, this),
              "RECHARTS CYBER ENGINE (0 MS TELEMETRY)"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
              lineNumber: 241,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
            lineNumber: 237,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 font-mono mt-0.5", children: "Ciągła analiza spektralna powtarzalności prób przechwycenia fokusu, wstrzyknięć nakładek i natychmiastowego uboju złośliwych procesów." }, void 0, false, {
            fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
            lineNumber: 246,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
          lineNumber: 236,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
        lineNumber: 232,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
        lineNumber: 231,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2.5 flex-wrap font-mono text-xs", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex rounded-xl bg-slate-950 p-1 border border-slate-800", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setTimeRange("30M"),
              className: `px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${timeRange === "30M" ? "bg-cyan-600 text-white shadow-md shadow-cyan-950" : "text-slate-400 hover:text-white"}`,
              children: "30 Minut (Live)"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
              lineNumber: 257,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setTimeRange("24H"),
              className: `px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${timeRange === "24H" ? "bg-cyan-600 text-white shadow-md shadow-cyan-950" : "text-slate-400 hover:text-white"}`,
              children: "24 Godziny"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
              lineNumber: 267,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setTimeRange("7D"),
              className: `px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${timeRange === "7D" ? "bg-cyan-600 text-white shadow-md shadow-cyan-950" : "text-slate-400 hover:text-white"}`,
              children: "7 Dni"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
              lineNumber: 277,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
          lineNumber: 256,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setIsLiveStreaming(!isLiveStreaming),
            className: `px-3 py-1.5 rounded-xl border flex items-center gap-1.5 font-bold transition-all cursor-pointer ${isLiveStreaming ? "bg-emerald-950/80 text-emerald-300 border-emerald-500" : "bg-slate-900 text-slate-400 border-slate-700"}`,
            title: "Przełącz aktualizację danych na żywo",
            children: [
              /* @__PURE__ */ jsxDEV(RefreshCw, { className: `w-3.5 h-3.5 ${isLiveStreaming ? "animate-spin" : ""}` }, void 0, false, {
                fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
                lineNumber: 299,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: isLiveStreaming ? "Live (3s)" : "Wstrzymany" }, void 0, false, {
                fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
                lineNumber: 300,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
            lineNumber: 290,
            columnNumber: 11
          },
          this
        ),
        onSimulateAttack && /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: onSimulateAttack,
            className: "px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold flex items-center gap-1.5 shadow-md shadow-red-950 border border-red-400/40 active:scale-95 transition-all cursor-pointer",
            children: [
              /* @__PURE__ */ jsxDEV(Crosshair, { className: "w-3.5 h-3.5 text-yellow-300" }, void 0, false, {
                fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
                lineNumber: 308,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Wstrzyknij Pik Ataku" }, void 0, false, {
                fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
                lineNumber: 309,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
            lineNumber: 304,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
        lineNumber: 254,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
      lineNumber: 230,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400 uppercase tracking-wider block", children: "Łączna Liczba Ataków" }, void 0, false, {
          fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
          lineNumber: 318,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-xl font-black text-cyan-300 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV("span", { children: aggregatedStats.total }, void 0, false, {
            fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
            lineNumber: 320,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(TrendingUp, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
            fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
            lineNumber: 321,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
          lineNumber: 319,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500 block", children: [
          "Śr. ",
          aggregatedStats.avgPerInterval,
          " na interwał"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
          lineNumber: 323,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
        lineNumber: 317,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400 uppercase tracking-wider block", children: "Najwyższy Pik Zagrożenia" }, void 0, false, {
          fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
          lineNumber: 327,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-xl font-black text-rose-400 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV("span", { children: [
            aggregatedStats.maxPeak,
            " / min"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
            lineNumber: 329,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(Flame, { className: "w-4 h-4 text-rose-400 animate-bounce" }, void 0, false, {
            fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
            lineNumber: 330,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
          lineNumber: 328,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500 block", children: [
          "Zarejestrowano o: ",
          aggregatedStats.maxPeakTime
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
          lineNumber: 332,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
        lineNumber: 326,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400 uppercase tracking-wider block", children: "Piki Krytyczne (Critical)" }, void 0, false, {
          fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
          lineNumber: 336,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-xl font-black text-amber-300 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV("span", { children: aggregatedStats.totalCritical }, void 0, false, {
            fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
            lineNumber: 338,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(AlertTriangle, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
            fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
            lineNumber: 339,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
          lineNumber: 337,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500 block", children: "100% zaryglowane przez Sentinel" }, void 0, false, {
          fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
          lineNumber: 341,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
        lineNumber: 335,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400 uppercase tracking-wider block", children: "Rozfragmentowany RAM / VRAM" }, void 0, false, {
          fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
          lineNumber: 345,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-xl font-black text-emerald-300 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV("span", { children: [
            aggregatedStats.totalRamMb,
            " MB"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
            lineNumber: 347,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
            fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
            lineNumber: 348,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
          lineNumber: 346,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500 block", children: "Wyzerowane struktury pamięci" }, void 0, false, {
          fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
          lineNumber: 350,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
        lineNumber: 344,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
      lineNumber: 316,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between gap-2 flex-wrap font-mono text-xs pt-1", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 text-[11px] flex items-center gap-1", children: [
          /* @__PURE__ */ jsxDEV(Filter, { className: "w-3 h-3 text-cyan-400" }, void 0, false, {
            fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
            lineNumber: 358,
            columnNumber: 13
          }, this),
          "Warstwy Wykresu:"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
          lineNumber: 357,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setMetricFilter("ALL"),
            className: `px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${metricFilter === "ALL" ? "bg-cyan-950 text-cyan-300 border-cyan-500 font-bold" : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"}`,
            children: "Wszystkie Sygnały"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
            lineNumber: 361,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setMetricFilter("FOCUS_ONLY"),
            className: `px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${metricFilter === "FOCUS_ONLY" ? "bg-red-950 text-red-300 border-red-500 font-bold" : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"}`,
            children: "Tylko Przejęcia Fokusu"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
            lineNumber: 371,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setMetricFilter("MALWARE_ONLY"),
            className: `px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${metricFilter === "MALWARE_ONLY" ? "bg-emerald-950 text-emerald-300 border-emerald-500 font-bold" : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"}`,
            children: "Tylko Zneutralizowane Malware"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
            lineNumber: 381,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setMetricFilter("CRITICAL_SPIKES"),
            className: `px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${metricFilter === "CRITICAL_SPIKES" ? "bg-amber-950 text-amber-300 border-amber-500 font-bold" : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"}`,
            children: "Tylko Piki Krytyczne"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
            lineNumber: 391,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
        lineNumber: 356,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 text-[11px] text-slate-400", children: /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "w-2.5 h-0.5 bg-rose-500 inline-block" }, void 0, false, {
          fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
          lineNumber: 405,
          columnNumber: 13
        }, this),
        "Próg Alarmu Sentinel (12/min)"
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
        lineNumber: 404,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
        lineNumber: 403,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
      lineNumber: 355,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "w-full h-[360px] sm:h-[400px] p-2 rounded-2xl bg-black/60 border border-slate-800/80", children: /* @__PURE__ */ jsxDEV(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxDEV(
      ComposedChart,
      {
        data: chartData,
        margin: { top: 20, right: 25, left: -10, bottom: 10 },
        children: [
          /* @__PURE__ */ jsxDEV("defs", { children: [
            /* @__PURE__ */ jsxDEV("linearGradient", { id: "cyanAreaGradient", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsxDEV("stop", { offset: "5%", stopColor: "#06b6d4", stopOpacity: 0.4 }, void 0, false, {
                fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
                lineNumber: 421,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("stop", { offset: "95%", stopColor: "#06b6d4", stopOpacity: 0 }, void 0, false, {
                fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
                lineNumber: 422,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
              lineNumber: 420,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("linearGradient", { id: "redAreaGradient", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsxDEV("stop", { offset: "5%", stopColor: "#ef4444", stopOpacity: 0.35 }, void 0, false, {
                fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
                lineNumber: 425,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("stop", { offset: "95%", stopColor: "#ef4444", stopOpacity: 0 }, void 0, false, {
                fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
                lineNumber: 426,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
              lineNumber: 424,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("linearGradient", { id: "emeraldAreaGradient", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsxDEV("stop", { offset: "5%", stopColor: "#10b981", stopOpacity: 0.35 }, void 0, false, {
                fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
                lineNumber: 429,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("stop", { offset: "95%", stopColor: "#10b981", stopOpacity: 0 }, void 0, false, {
                fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
                lineNumber: 430,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
              lineNumber: 428,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
            lineNumber: 419,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(CartesianGrid, { strokeDasharray: "3 3", stroke: "#1e293b", vertical: false }, void 0, false, {
            fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
            lineNumber: 434,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            XAxis,
            {
              dataKey: "timeLabel",
              stroke: "#64748b",
              fontSize: 11,
              fontFamily: "monospace",
              tickLine: false,
              axisLine: { stroke: "#334155" }
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
              lineNumber: 436,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            YAxis,
            {
              stroke: "#64748b",
              fontSize: 11,
              fontFamily: "monospace",
              tickLine: false,
              axisLine: { stroke: "#334155" },
              domain: [0, "dataMax + 4"]
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
              lineNumber: 445,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(Tooltip, { content: /* @__PURE__ */ jsxDEV(CustomTooltip, {}, void 0, false, {
            fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
            lineNumber: 454,
            columnNumber: 31
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
            lineNumber: 454,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            Legend,
            {
              wrapperStyle: { fontFamily: "monospace", fontSize: "11px", paddingTop: "10px" }
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
              lineNumber: 456,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            ReferenceLine,
            {
              y: 12,
              stroke: "#f43f5e",
              strokeDasharray: "5 5",
              strokeWidth: 1.5,
              label: {
                value: "PRÓG INTERWENCJI UBOJU (12/MIN)",
                fill: "#fb7185",
                fontSize: 10,
                fontFamily: "monospace",
                position: "insideTopRight"
              }
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
              lineNumber: 461,
              columnNumber: 13
            },
            this
          ),
          metricFilter === "ALL" && /* @__PURE__ */ jsxDEV(
            Area,
            {
              type: "monotone",
              dataKey: "totalAttacks",
              name: "Łączna Częstotliwość",
              stroke: "#06b6d4",
              strokeWidth: 2.5,
              fillOpacity: 1,
              fill: "url(#cyanAreaGradient)",
              activeDot: { r: 6, stroke: "#22d3ee", strokeWidth: 2, fill: "#083344" }
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
              lineNumber: 477,
              columnNumber: 15
            },
            this
          ),
          (metricFilter === "ALL" || metricFilter === "FOCUS_ONLY") && /* @__PURE__ */ jsxDEV(
            Line,
            {
              type: "monotone",
              dataKey: "focusHijacks",
              name: "Próby Przejęcia Fokusu (HWND)",
              stroke: "#ef4444",
              strokeWidth: 2,
              dot: { r: 2, fill: "#ef4444" },
              activeDot: { r: 5, fill: "#b91c1c" }
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
              lineNumber: 491,
              columnNumber: 15
            },
            this
          ),
          (metricFilter === "ALL" || metricFilter === "MALWARE_ONLY") && /* @__PURE__ */ jsxDEV(
            Line,
            {
              type: "monotone",
              dataKey: "neutralizedMalware",
              name: "Zneutralizowane Malware (Ubój 0ms)",
              stroke: "#10b981",
              strokeWidth: 2,
              dot: { r: 2, fill: "#10b981" },
              activeDot: { r: 5, fill: "#047857" }
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
              lineNumber: 504,
              columnNumber: 15
            },
            this
          ),
          (metricFilter === "ALL" || metricFilter === "CRITICAL_SPIKES") && /* @__PURE__ */ jsxDEV(
            Line,
            {
              type: "stepAfter",
              dataKey: "criticalSpikes",
              name: "Piki Krytyczne (Critical Spikes)",
              stroke: "#f59e0b",
              strokeWidth: 2,
              dot: { r: 3, fill: "#f59e0b" },
              activeDot: { r: 6, fill: "#b45309" }
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
              lineNumber: 517,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            Brush,
            {
              dataKey: "timeLabel",
              height: 22,
              stroke: "#06b6d4",
              fill: "#020617",
              travellerWidth: 10
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
              lineNumber: 529,
              columnNumber: 13
            },
            this
          )
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
        lineNumber: 414,
        columnNumber: 11
      },
      this
    ) }, void 0, false, {
      fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
      lineNumber: 413,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
      lineNumber: 412,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-slate-400", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-1 rounded bg-purple-950 border border-purple-800 text-purple-300", children: /* @__PURE__ */ jsxDEV(Cpu, { className: "w-3.5 h-3.5" }, void 0, false, {
          fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
          lineNumber: 544,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
          lineNumber: 543,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: [
          "Wskaźnik Efektywności Pacyfikacji: ",
          /* @__PURE__ */ jsxDEV("strong", { className: "text-emerald-400", children: "99.98%" }, void 0, false, {
            fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
            lineNumber: 547,
            columnNumber: 48
          }, this),
          " • Średni Czas Zniszczenia: ",
          /* @__PURE__ */ jsxDEV("strong", { className: "text-cyan-300", children: "0.02 ms" }, void 0, false, {
            fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
            lineNumber: 547,
            columnNumber: 128
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
          lineNumber: 546,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
        lineNumber: 542,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] text-slate-500", children: [
        "Rejestr zsynchronizowany z modułem ",
        /* @__PURE__ */ jsxDEV("code", { className: "text-rose-400", children: "focusHijackTracker" }, void 0, false, {
          fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
          lineNumber: 551,
          columnNumber: 46
        }, this),
        " & ",
        /* @__PURE__ */ jsxDEV("code", { className: "text-amber-400", children: "browserMalwareAutoScanner" }, void 0, false, {
          fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
          lineNumber: 551,
          columnNumber: 106
        }, this),
        "."
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
        lineNumber: 550,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
      lineNumber: 541,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/AttackFrequencyTimeSeriesChart.tsx",
    lineNumber: 227,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkF0dGFja0ZyZXF1ZW5jeVRpbWVTZXJpZXNDaGFydC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VNZW1vLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICBSZXNwb25zaXZlQ29udGFpbmVyLFxuICBMaW5lQ2hhcnQsXG4gIExpbmUsXG4gIFhBeGlzLFxuICBZQXhpcyxcbiAgQ2FydGVzaWFuR3JpZCxcbiAgVG9vbHRpcCxcbiAgTGVnZW5kLFxuICBSZWZlcmVuY2VMaW5lLFxuICBBcmVhLFxuICBDb21wb3NlZENoYXJ0LFxuICBCcnVzaFxufSBmcm9tICdyZWNoYXJ0cyc7XG5pbXBvcnQgeyBcbiAgQWN0aXZpdHksIFRyZW5kaW5nVXAsIEFsZXJ0VHJpYW5nbGUsIFNoaWVsZENoZWNrLCBGbGFtZSwgXG4gIENsb2NrLCBSZWZyZXNoQ3csIEJhckNoYXJ0MiwgRmlsdGVyLCBaYXAsIFNrdWxsLCBDcHUsIENyb3NzaGFpclxufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgRm9jdXNIaWphY2tBdHRlbXB0LCBOZXV0cmFsaXplZFRocmVhdCB9IGZyb20gJy4uL3R5cGVzJztcblxuaW50ZXJmYWNlIEF0dGFja0ZyZXF1ZW5jeVRpbWVTZXJpZXNDaGFydFByb3BzIHtcbiAgZm9jdXNMb2dzOiBGb2N1c0hpamFja0F0dGVtcHRbXTtcbiAgdGhyZWF0czogTmV1dHJhbGl6ZWRUaHJlYXRbXTtcbiAgb25TaW11bGF0ZUF0dGFjaz86ICgpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGltZVNlcmllc0RhdGFQb2ludCB7XG4gIHRpbWVMYWJlbDogc3RyaW5nO1xuICBmdWxsVGltZXN0YW1wOiBzdHJpbmc7XG4gIHRvdGFsQXR0YWNrczogbnVtYmVyO1xuICBmb2N1c0hpamFja3M6IG51bWJlcjtcbiAgbmV1dHJhbGl6ZWRNYWx3YXJlOiBudW1iZXI7XG4gIGNyaXRpY2FsU3Bpa2VzOiBudW1iZXI7XG4gIGRlZnJhZ21lbnRlZFJhbUtiOiBudW1iZXI7XG4gIGFub21hbHlTY29yZTogbnVtYmVyO1xufVxuXG5leHBvcnQgY29uc3QgQXR0YWNrRnJlcXVlbmN5VGltZVNlcmllc0NoYXJ0OiBSZWFjdC5GQzxBdHRhY2tGcmVxdWVuY3lUaW1lU2VyaWVzQ2hhcnRQcm9wcz4gPSAoe1xuICBmb2N1c0xvZ3MsXG4gIHRocmVhdHMsXG4gIG9uU2ltdWxhdGVBdHRhY2tcbn0pID0+IHtcbiAgY29uc3QgW3RpbWVSYW5nZSwgc2V0VGltZVJhbmdlXSA9IHVzZVN0YXRlPCczME0nIHwgJzI0SCcgfCAnN0QnPignMzBNJyk7XG4gIGNvbnN0IFttZXRyaWNGaWx0ZXIsIHNldE1ldHJpY0ZpbHRlcl0gPSB1c2VTdGF0ZTwnQUxMJyB8ICdGT0NVU19PTkxZJyB8ICdNQUxXQVJFX09OTFknIHwgJ0NSSVRJQ0FMX1NQSUtFUyc+KCdBTEwnKTtcbiAgY29uc3QgW2lzTGl2ZVN0cmVhbWluZywgc2V0SXNMaXZlU3RyZWFtaW5nXSA9IHVzZVN0YXRlPGJvb2xlYW4+KHRydWUpO1xuICBjb25zdCBbbGl2ZVRpY2ssIHNldExpdmVUaWNrXSA9IHVzZVN0YXRlPG51bWJlcj4oMCk7XG5cbiAgLy8gTGl2ZSBzaW11bGF0aW9uIHRpY2sgZXZlcnkgMyBzZWNvbmRzIGlmIGFjdGl2ZVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaXNMaXZlU3RyZWFtaW5nKSByZXR1cm47XG4gICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBzZXRMaXZlVGljayh0ID0+IHQgKyAxKTtcbiAgICB9LCAzMDAwKTtcbiAgICByZXR1cm4gKCkgPT4gY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gIH0sIFtpc0xpdmVTdHJlYW1pbmddKTtcblxuICAvLyBHZW5lcmF0ZSBzdHJ1Y3R1cmVkIHRpbWUtc2VyaWVzIGRhdGEgY29tYmluaW5nIGZvY3VzIGxvZ3MsIG5ldXRyYWxpemVkIHRocmVhdHMsIGFuZCB0ZW1wb3JhbCBidWNrZXRzXG4gIGNvbnN0IGNoYXJ0RGF0YTogVGltZVNlcmllc0RhdGFQb2ludFtdID0gdXNlTWVtbygoKSA9PiB7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcblxuICAgIGlmICh0aW1lUmFuZ2UgPT09ICczME0nKSB7XG4gICAgICAvLyAzMCAxLW1pbnV0ZSBpbnRlcnZhbHMgZm9yIHRoZSBsYXN0IDMwIG1pbnV0ZXNcbiAgICAgIGNvbnN0IHBvaW50czogVGltZVNlcmllc0RhdGFQb2ludFtdID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMjk7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGNvbnN0IGJ1Y2tldFRpbWUgPSBuZXcgRGF0ZShub3cgLSBpICogNjAgKiAxMDAwKTtcbiAgICAgICAgY29uc3QgdGltZUxhYmVsID0gYnVja2V0VGltZS50b0xvY2FsZVRpbWVTdHJpbmcoW10sIHsgaG91cjogJzItZGlnaXQnLCBtaW51dGU6ICcyLWRpZ2l0JyB9KTtcbiAgICAgICAgXG4gICAgICAgIC8vIEJhc2Ugc2VlZCBmcm9tIGFjdHVhbCBmb2N1cyBsb2dzIGlmIHRpbWVzdGFtcHMgbWF0Y2hcbiAgICAgICAgY29uc3QgbWF0Y2hpbmdMb2dzID0gZm9jdXNMb2dzLmZpbHRlcihsb2cgPT4ge1xuICAgICAgICAgIHJldHVybiBsb2cudGltZXN0YW1wLmluY2x1ZGVzKHRpbWVMYWJlbCkgfHwgTWF0aC5yYW5kb20oKSA8IDAuMTU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGZvY3VzQ291bnQgPSBtYXRjaGluZ0xvZ3MucmVkdWNlKChhY2MsIGwpID0+IGFjYyArIChsLnJlcGVhdENvdW50IHx8IDEpLCAwKTtcbiAgICAgICAgY29uc3QgaXNTcGlrZVBvaW50ID0gaSA9PT0gNCB8fCBpID09PSAxMiB8fCBpID09PSAxOSB8fCAoaSA9PT0gMCAmJiBsaXZlVGljayAlIDIgPT09IDApO1xuICAgICAgICBjb25zdCBzaW11bGF0ZWRGb2N1cyA9IGlzU3Bpa2VQb2ludCA/IDggKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA5KSA6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDQpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgZmluYWxGb2N1cyA9IE1hdGgubWF4KGZvY3VzQ291bnQsIHNpbXVsYXRlZEZvY3VzKTtcbiAgICAgICAgY29uc3QgZmluYWxNYWx3YXJlID0gTWF0aC5mbG9vcihmaW5hbEZvY3VzICogMC43KSArIChpc1NwaWtlUG9pbnQgPyA0IDogMSk7XG4gICAgICAgIGNvbnN0IGNyaXRpY2FsQ291bnQgPSBpc1NwaWtlUG9pbnQgPyBNYXRoLmZsb29yKGZpbmFsRm9jdXMgKiAwLjUpIDogTWF0aC5mbG9vcihmaW5hbEZvY3VzICogMC4yKTtcblxuICAgICAgICBwb2ludHMucHVzaCh7XG4gICAgICAgICAgdGltZUxhYmVsLFxuICAgICAgICAgIGZ1bGxUaW1lc3RhbXA6IGJ1Y2tldFRpbWUudG9Mb2NhbGVUaW1lU3RyaW5nKCksXG4gICAgICAgICAgdG90YWxBdHRhY2tzOiBmaW5hbEZvY3VzICsgZmluYWxNYWx3YXJlLFxuICAgICAgICAgIGZvY3VzSGlqYWNrczogZmluYWxGb2N1cyxcbiAgICAgICAgICBuZXV0cmFsaXplZE1hbHdhcmU6IGZpbmFsTWFsd2FyZSxcbiAgICAgICAgICBjcml0aWNhbFNwaWtlczogY3JpdGljYWxDb3VudCxcbiAgICAgICAgICBkZWZyYWdtZW50ZWRSYW1LYjogKGZpbmFsRm9jdXMgKyBmaW5hbE1hbHdhcmUpICogNTEyICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU2KSxcbiAgICAgICAgICBhbm9tYWx5U2NvcmU6IE1hdGgubWluKDEwMCwgTWF0aC5yb3VuZCgoZmluYWxGb2N1cyArIGZpbmFsTWFsd2FyZSkgKiA0LjUpKVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwb2ludHM7XG4gICAgfSBcbiAgICBcbiAgICBpZiAodGltZVJhbmdlID09PSAnMjRIJykge1xuICAgICAgLy8gMjQgaG91cmx5IGJ1Y2tldHNcbiAgICAgIGNvbnN0IHBvaW50czogVGltZVNlcmllc0RhdGFQb2ludFtdID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMjM7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGNvbnN0IGJ1Y2tldFRpbWUgPSBuZXcgRGF0ZShub3cgLSBpICogMzYwMCAqIDEwMDApO1xuICAgICAgICBjb25zdCB0aW1lTGFiZWwgPSBgJHtidWNrZXRUaW1lLmdldEhvdXJzKCkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpfTowMGA7XG5cbiAgICAgICAgY29uc3QgaXNQZWFrSG91ciA9IFs4LCAxMywgMTcsIDIxLCAyXS5pbmNsdWRlcyhidWNrZXRUaW1lLmdldEhvdXJzKCkpO1xuICAgICAgICBjb25zdCBmb2N1c0NvdW50ID0gaXNQZWFrSG91ciA/IDIyICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjQpIDogNCArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDgpO1xuICAgICAgICBjb25zdCBtYWx3YXJlQ291bnQgPSBpc1BlYWtIb3VyID8gMTUgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxOCkgOiAyICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNSk7XG4gICAgICAgIGNvbnN0IGNyaXRpY2FsQ291bnQgPSBpc1BlYWtIb3VyID8gOCArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSA6IDE7XG5cbiAgICAgICAgcG9pbnRzLnB1c2goe1xuICAgICAgICAgIHRpbWVMYWJlbCxcbiAgICAgICAgICBmdWxsVGltZXN0YW1wOiBgJHtidWNrZXRUaW1lLnRvTG9jYWxlRGF0ZVN0cmluZygpfSAke3RpbWVMYWJlbH1gLFxuICAgICAgICAgIHRvdGFsQXR0YWNrczogZm9jdXNDb3VudCArIG1hbHdhcmVDb3VudCxcbiAgICAgICAgICBmb2N1c0hpamFja3M6IGZvY3VzQ291bnQsXG4gICAgICAgICAgbmV1dHJhbGl6ZWRNYWx3YXJlOiBtYWx3YXJlQ291bnQsXG4gICAgICAgICAgY3JpdGljYWxTcGlrZXM6IGNyaXRpY2FsQ291bnQsXG4gICAgICAgICAgZGVmcmFnbWVudGVkUmFtS2I6IChmb2N1c0NvdW50ICsgbWFsd2FyZUNvdW50KSAqIDEwMjQsXG4gICAgICAgICAgYW5vbWFseVNjb3JlOiBNYXRoLm1pbigxMDAsIE1hdGgucm91bmQoKGZvY3VzQ291bnQgKyBtYWx3YXJlQ291bnQpICogMS44KSlcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcG9pbnRzO1xuICAgIH1cblxuICAgIC8vIDdEICg3IERheXMgdGltZWxpbmUpXG4gICAgY29uc3QgcG9pbnRzOiBUaW1lU2VyaWVzRGF0YVBvaW50W10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gNjsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGNvbnN0IGJ1Y2tldFRpbWUgPSBuZXcgRGF0ZShub3cgLSBpICogODY0MDAgKiAxMDAwKTtcbiAgICAgIGNvbnN0IHRpbWVMYWJlbCA9IGJ1Y2tldFRpbWUudG9Mb2NhbGVEYXRlU3RyaW5nKFtdLCB7IHdlZWtkYXk6ICdzaG9ydCcsIGRheTogJzItZGlnaXQnLCBtb250aDogJzItZGlnaXQnIH0pO1xuICAgICAgXG4gICAgICBjb25zdCBpc1dlZWtlbmQgPSBidWNrZXRUaW1lLmdldERheSgpID09PSAwIHx8IGJ1Y2tldFRpbWUuZ2V0RGF5KCkgPT09IDY7XG4gICAgICBjb25zdCBmb2N1c0NvdW50ID0gaXNXZWVrZW5kID8gMTEwICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogODApIDogMTgwICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTIwKTtcbiAgICAgIGNvbnN0IG1hbHdhcmVDb3VudCA9IGlzV2Vla2VuZCA/IDg1ICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNTApIDogMTQwICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNzApO1xuICAgICAgY29uc3QgY3JpdGljYWxDb3VudCA9IGlzV2Vla2VuZCA/IDI4ICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTUpIDogNTUgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAzMCk7XG5cbiAgICAgIHBvaW50cy5wdXNoKHtcbiAgICAgICAgdGltZUxhYmVsLFxuICAgICAgICBmdWxsVGltZXN0YW1wOiBidWNrZXRUaW1lLnRvTG9jYWxlRGF0ZVN0cmluZygpLFxuICAgICAgICB0b3RhbEF0dGFja3M6IGZvY3VzQ291bnQgKyBtYWx3YXJlQ291bnQsXG4gICAgICAgIGZvY3VzSGlqYWNrczogZm9jdXNDb3VudCxcbiAgICAgICAgbmV1dHJhbGl6ZWRNYWx3YXJlOiBtYWx3YXJlQ291bnQsXG4gICAgICAgIGNyaXRpY2FsU3Bpa2VzOiBjcml0aWNhbENvdW50LFxuICAgICAgICBkZWZyYWdtZW50ZWRSYW1LYjogKGZvY3VzQ291bnQgKyBtYWx3YXJlQ291bnQpICogMjA0OCxcbiAgICAgICAgYW5vbWFseVNjb3JlOiBNYXRoLm1pbigxMDAsIE1hdGgucm91bmQoKGZvY3VzQ291bnQgKyBtYWx3YXJlQ291bnQpIC8gNCkpXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHBvaW50cztcbiAgfSwgW3RpbWVSYW5nZSwgZm9jdXNMb2dzLCB0aHJlYXRzLCBsaXZlVGlja10pO1xuXG4gIC8vIEFnZ3JlZ2F0ZSBtZXRyaWNzXG4gIGNvbnN0IGFnZ3JlZ2F0ZWRTdGF0cyA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IHRvdGFsID0gY2hhcnREYXRhLnJlZHVjZSgoYWNjLCBwKSA9PiBhY2MgKyBwLnRvdGFsQXR0YWNrcywgMCk7XG4gICAgY29uc3QgbWF4UGVhayA9IE1hdGgubWF4KC4uLmNoYXJ0RGF0YS5tYXAocCA9PiBwLnRvdGFsQXR0YWNrcyksIDApO1xuICAgIGNvbnN0IG1heFBlYWtQb2ludCA9IGNoYXJ0RGF0YS5maW5kKHAgPT4gcC50b3RhbEF0dGFja3MgPT09IG1heFBlYWspO1xuICAgIGNvbnN0IGF2Z1BlckludGVydmFsID0gKHRvdGFsIC8gKGNoYXJ0RGF0YS5sZW5ndGggfHwgMSkpLnRvRml4ZWQoMSk7XG4gICAgY29uc3QgdG90YWxDcml0aWNhbCA9IGNoYXJ0RGF0YS5yZWR1Y2UoKGFjYywgcCkgPT4gYWNjICsgcC5jcml0aWNhbFNwaWtlcywgMCk7XG4gICAgY29uc3QgdG90YWxSYW1NYiA9IChjaGFydERhdGEucmVkdWNlKChhY2MsIHApID0+IGFjYyArIHAuZGVmcmFnbWVudGVkUmFtS2IsIDApIC8gMTAyNCkudG9GaXhlZCgxKTtcblxuICAgIHJldHVybiB7XG4gICAgICB0b3RhbCxcbiAgICAgIG1heFBlYWssXG4gICAgICBtYXhQZWFrVGltZTogbWF4UGVha1BvaW50Py50aW1lTGFiZWwgfHwgJ04vQScsXG4gICAgICBhdmdQZXJJbnRlcnZhbCxcbiAgICAgIHRvdGFsQ3JpdGljYWwsXG4gICAgICB0b3RhbFJhbU1iXG4gICAgfTtcbiAgfSwgW2NoYXJ0RGF0YV0pO1xuXG4gIC8vIEN1c3RvbSBEYXJrIEN5YmVyIFRvb2x0aXAgQ29tcG9uZW50XG4gIGNvbnN0IEN1c3RvbVRvb2x0aXAgPSAoeyBhY3RpdmUsIHBheWxvYWQsIGxhYmVsIH06IGFueSkgPT4ge1xuICAgIGlmIChhY3RpdmUgJiYgcGF5bG9hZCAmJiBwYXlsb2FkLmxlbmd0aCkge1xuICAgICAgY29uc3QgZGF0YTogVGltZVNlcmllc0RhdGFQb2ludCA9IHBheWxvYWRbMF0ucGF5bG9hZDtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zLjUgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAvOTUgYm9yZGVyLTIgYm9yZGVyLWN5YW4tNTAwLzgwIHNoYWRvdy1bMF8wXzI1cHhfcmdiYSg2LDE4MiwyMTIsMC40KV0gdGV4dC14cyBmb250LW1vbm8gdGV4dC1zbGF0ZS0yMDAgbWluLXctWzI0MHB4XSBzcGFjZS15LTIgYmFja2Ryb3AtYmx1ci1tZFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHBiLTEuNSBib3JkZXItYiBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWN5YW4tNDAwIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgIDxDbG9jayBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgIHtkYXRhLmZ1bGxUaW1lc3RhbXAgfHwgbGFiZWx9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0xLjUgcHktMC41IHJvdW5kZWQgYmctcm9zZS05NTAgdGV4dC1yb3NlLTMwMCBib3JkZXIgYm9yZGVyLXJvc2UtODAwIHRleHQtWzEwcHhdIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICBBbm9tYWxpYToge2RhdGEuYW5vbWFseVNjb3JlfSVcbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjUgcHQtMVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTIgaC0yIHJvdW5kZWQtZnVsbCBiZy1jeWFuLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgxYHEhWN6bmEgQ3rEmXN0b3RsaXdvxZvEhzpcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtd2hpdGUgZm9udC1ib2xkXCI+e2RhdGEudG90YWxBdHRhY2tzfSBhdGFrw7N3PC9zdHJvbmc+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTIgaC0yIHJvdW5kZWQtZnVsbCBiZy1yZWQtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICBQcnplasSZY2lhIEZva3VzdSBIV05EOlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC1yZWQtMzAwXCI+e2RhdGEuZm9jdXNIaWphY2tzfSBwcsOzYjwvc3Ryb25nPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0yIGgtMiByb3VuZGVkLWZ1bGwgYmctZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgICAgICAgIFpuZXV0cmFsaXpvd2FuZSBNYWx3YXJlIChVYsOzaik6XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtMzAwXCI+e2RhdGEubmV1dHJhbGl6ZWRNYWx3YXJlfSBwcm9jZXPDs3c8L3N0cm9uZz5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctMiBoLTIgcm91bmRlZC1mdWxsIGJnLWFtYmVyLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgUGlraSBLcnl0eWN6bmUgKENyaXRpY2FsKTpcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtYW1iZXItMzAwXCI+e2RhdGEuY3JpdGljYWxTcGlrZXN9IGluY3lkZW50w7N3PC9zdHJvbmc+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcHQtMSBib3JkZXItdCBib3JkZXItc2xhdGUtODAwIHRleHQtWzExcHhdXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwXCI+Um96ZnJhZ21lbnRvd2FueSBSQU06PC9zcGFuPlxuICAgICAgICAgICAgICA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtcHVycGxlLTMwMFwiPnsoZGF0YS5kZWZyYWdtZW50ZWRSYW1LYiAvIDEwMjQpLnRvRml4ZWQoMil9IE1CPC9zdHJvbmc+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwicC01IHNtOnAtNiByb3VuZGVkLTJ4bCBiZy1ncmFkaWVudC10by1iIGZyb20tc2xhdGUtOTAwLzk1IHZpYS1zbGF0ZS05NTAgdG8tYmxhY2sgYm9yZGVyLTIgYm9yZGVyLWN5YW4tNTAwLzUwIHNoYWRvdy0yeGwgc2hhZG93LWN5YW4tOTUwLzQwIHNwYWNlLXktNiBmb250LXNhbnNcIj5cbiAgICAgIFxuICAgICAgey8qIENoYXJ0IFRvcCBIZWFkZXIgJiBDb250cm9scyAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBsZzpmbGV4LXJvdyBpdGVtcy1zdGFydCBsZzppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00IHBiLTQgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMC84MFwiPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yLjVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yLjUgcm91bmRlZC14bCBiZy1jeWFuLTk1MC84MCBib3JkZXIgYm9yZGVyLWN5YW4tNTAwLzgwIHRleHQtY3lhbi0zMDAgc2hhZG93LW1kXCI+XG4gICAgICAgICAgICAgIDxBY3Rpdml0eSBjbGFzc05hbWU9XCJ3LTUgaC01IGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGZsZXgtd3JhcFwiPlxuICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWxnIHNtOnRleHQteGwgZm9udC1ibGFjayB0ZXh0LXdoaXRlIHRyYWNraW5nLXdpZGUgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgICBXaXp1YWxpemFjamEgQ3rEmXN0b3RsaXdvxZtjaSBBdGFrw7N3IHcgQ3phc2llXG4gICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0yIHB5LTAuNSByb3VuZGVkLWZ1bGwgdGV4dC1bMTBweF0gZm9udC1tb25vIGZvbnQtYm9sZCBiZy1jeWFuLTk1MCB0ZXh0LWN5YW4tMzAwIGJvcmRlciBib3JkZXItY3lhbi01MDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctMS41IGgtMS41IHJvdW5kZWQtZnVsbCBiZy1jeWFuLTQwMCBhbmltYXRlLXBpbmdcIiAvPlxuICAgICAgICAgICAgICAgICAgUkVDSEFSVFMgQ1lCRVIgRU5HSU5FICgwIE1TIFRFTEVNRVRSWSlcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIGZvbnQtbW9ubyBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgICBDacSFZ8WCYSBhbmFsaXphIHNwZWt0cmFsbmEgcG93dGFyemFsbm/Fm2NpIHByw7NiIHByemVjaHd5Y2VuaWEgZm9rdXN1LCB3c3RyenlrbmnEmcSHIG5ha8WCYWRlayBpIG5hdHljaG1pYXN0b3dlZ28gdWJvanUgesWCb8WbbGl3eWNoIHByb2Nlc8Ozdy5cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBUaW1lZnJhbWUgJiBMaXZlIFN0cmVhbSBDb250cm9scyAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMi41IGZsZXgtd3JhcCBmb250LW1vbm8gdGV4dC14c1wiPlxuICAgICAgICAgIHsvKiBUaW1lIFJhbmdlIFNlbGVjdG9yICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCByb3VuZGVkLXhsIGJnLXNsYXRlLTk1MCBwLTEgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0VGltZVJhbmdlKCczME0nKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMyBweS0xLjUgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtYm9sZCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciAke1xuICAgICAgICAgICAgICAgIHRpbWVSYW5nZSA9PT0gJzMwTSdcbiAgICAgICAgICAgICAgICAgID8gJ2JnLWN5YW4tNjAwIHRleHQtd2hpdGUgc2hhZG93LW1kIHNoYWRvdy1jeWFuLTk1MCdcbiAgICAgICAgICAgICAgICAgIDogJ3RleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAzMCBNaW51dCAoTGl2ZSlcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRUaW1lUmFuZ2UoJzI0SCcpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0zIHB5LTEuNSByb3VuZGVkLWxnIHRleHQteHMgZm9udC1ib2xkIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgICAgdGltZVJhbmdlID09PSAnMjRIJ1xuICAgICAgICAgICAgICAgICAgPyAnYmctY3lhbi02MDAgdGV4dC13aGl0ZSBzaGFkb3ctbWQgc2hhZG93LWN5YW4tOTUwJ1xuICAgICAgICAgICAgICAgICAgOiAndGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDI0IEdvZHppbnlcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRUaW1lUmFuZ2UoJzdEJyl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTMgcHktMS41IHJvdW5kZWQtbGcgdGV4dC14cyBmb250LWJvbGQgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgICAgICB0aW1lUmFuZ2UgPT09ICc3RCdcbiAgICAgICAgICAgICAgICAgID8gJ2JnLWN5YW4tNjAwIHRleHQtd2hpdGUgc2hhZG93LW1kIHNoYWRvdy1jeWFuLTk1MCdcbiAgICAgICAgICAgICAgICAgIDogJ3RleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA3IERuaVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogTGl2ZSBTdHJlYW1pbmcgVG9nZ2xlICovfVxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldElzTGl2ZVN0cmVhbWluZyghaXNMaXZlU3RyZWFtaW5nKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTMgcHktMS41IHJvdW5kZWQteGwgYm9yZGVyIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgZm9udC1ib2xkIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgIGlzTGl2ZVN0cmVhbWluZ1xuICAgICAgICAgICAgICAgID8gJ2JnLWVtZXJhbGQtOTUwLzgwIHRleHQtZW1lcmFsZC0zMDAgYm9yZGVyLWVtZXJhbGQtNTAwJ1xuICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTkwMCB0ZXh0LXNsYXRlLTQwMCBib3JkZXItc2xhdGUtNzAwJ1xuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICB0aXRsZT1cIlByemXFgsSFY3ogYWt0dWFsaXphY2rEmSBkYW55Y2ggbmEgxbx5d29cIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxSZWZyZXNoQ3cgY2xhc3NOYW1lPXtgdy0zLjUgaC0zLjUgJHtpc0xpdmVTdHJlYW1pbmcgPyAnYW5pbWF0ZS1zcGluJyA6ICcnfWB9IC8+XG4gICAgICAgICAgICA8c3Bhbj57aXNMaXZlU3RyZWFtaW5nID8gJ0xpdmUgKDNzKScgOiAnV3N0cnp5bWFueSd9PC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAge29uU2ltdWxhdGVBdHRhY2sgJiYgKFxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtvblNpbXVsYXRlQXR0YWNrfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zLjUgcHktMS41IHJvdW5kZWQteGwgYmctZ3JhZGllbnQtdG8tciBmcm9tLXJlZC02MDAgdG8tcm9zZS02MDAgaG92ZXI6ZnJvbS1yZWQtNTAwIGhvdmVyOnRvLXJvc2UtNTAwIHRleHQtd2hpdGUgZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgc2hhZG93LW1kIHNoYWRvdy1yZWQtOTUwIGJvcmRlciBib3JkZXItcmVkLTQwMC80MCBhY3RpdmU6c2NhbGUtOTUgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8Q3Jvc3NoYWlyIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQteWVsbG93LTMwMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPldzdHJ6eWtuaWogUGlrIEF0YWt1PC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIEFnZ3JlZ2F0ZSBNZXRyaWMgSGlnaGxpZ2h0cyAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBzbTpncmlkLWNvbHMtNCBnYXAtMyBmb250LW1vbm9cIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMuNSByb3VuZGVkLXhsIGJnLXNsYXRlLTk1MC84MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBzcGFjZS15LTFcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgYmxvY2tcIj7FgcSFY3puYSBMaWN6YmEgQXRha8Ozdzwvc3Bhbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ibGFjayB0ZXh0LWN5YW4tMzAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICA8c3Bhbj57YWdncmVnYXRlZFN0YXRzLnRvdGFsfTwvc3Bhbj5cbiAgICAgICAgICAgIDxUcmVuZGluZ1VwIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1jeWFuLTQwMFwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS01MDAgYmxvY2tcIj7FmnIuIHthZ2dyZWdhdGVkU3RhdHMuYXZnUGVySW50ZXJ2YWx9IG5hIGludGVyd2HFgjwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMuNSByb3VuZGVkLXhsIGJnLXNsYXRlLTk1MC84MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBzcGFjZS15LTFcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgYmxvY2tcIj5OYWp3ecW8c3p5IFBpayBaYWdyb8W8ZW5pYTwvc3Bhbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ibGFjayB0ZXh0LXJvc2UtNDAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICA8c3Bhbj57YWdncmVnYXRlZFN0YXRzLm1heFBlYWt9IC8gbWluPC9zcGFuPlxuICAgICAgICAgICAgPEZsYW1lIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1yb3NlLTQwMCBhbmltYXRlLWJvdW5jZVwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS01MDAgYmxvY2tcIj5aYXJlamVzdHJvd2FubyBvOiB7YWdncmVnYXRlZFN0YXRzLm1heFBlYWtUaW1lfTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMuNSByb3VuZGVkLXhsIGJnLXNsYXRlLTk1MC84MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBzcGFjZS15LTFcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgYmxvY2tcIj5QaWtpIEtyeXR5Y3puZSAoQ3JpdGljYWwpPC9zcGFuPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJsYWNrIHRleHQtYW1iZXItMzAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICA8c3Bhbj57YWdncmVnYXRlZFN0YXRzLnRvdGFsQ3JpdGljYWx9PC9zcGFuPlxuICAgICAgICAgICAgPEFsZXJ0VHJpYW5nbGUgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWFtYmVyLTQwMFwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS01MDAgYmxvY2tcIj4xMDAlIHphcnlnbG93YW5lIHByemV6IFNlbnRpbmVsPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMy41IHJvdW5kZWQteGwgYmctc2xhdGUtOTUwLzgwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHNwYWNlLXktMVwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBibG9ja1wiPlJvemZyYWdtZW50b3dhbnkgUkFNIC8gVlJBTTwvc3Bhbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ibGFjayB0ZXh0LWVtZXJhbGQtMzAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICA8c3Bhbj57YWdncmVnYXRlZFN0YXRzLnRvdGFsUmFtTWJ9IE1CPC9zcGFuPlxuICAgICAgICAgICAgPFNoaWVsZENoZWNrIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1lbWVyYWxkLTQwMFwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS01MDAgYmxvY2tcIj5XeXplcm93YW5lIHN0cnVrdHVyeSBwYW1pxJljaTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIE1ldHJpYyBGaWx0ZXIgVGFicyAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0yIGZsZXgtd3JhcCBmb250LW1vbm8gdGV4dC14cyBwdC0xXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgZmxleC13cmFwXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgdGV4dC1bMTFweF0gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgIDxGaWx0ZXIgY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LWN5YW4tNDAwXCIgLz5cbiAgICAgICAgICAgIFdhcnN0d3kgV3lrcmVzdTpcbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0TWV0cmljRmlsdGVyKCdBTEwnKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTIuNSBweS0xIHJvdW5kZWQtbGcgYm9yZGVyIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgIG1ldHJpY0ZpbHRlciA9PT0gJ0FMTCdcbiAgICAgICAgICAgICAgICA/ICdiZy1jeWFuLTk1MCB0ZXh0LWN5YW4tMzAwIGJvcmRlci1jeWFuLTUwMCBmb250LWJvbGQnXG4gICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTUwIHRleHQtc2xhdGUtNDAwIGJvcmRlci1zbGF0ZS04MDAgaG92ZXI6dGV4dC13aGl0ZSdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIFdzenlzdGtpZSBTeWduYcWCeVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldE1ldHJpY0ZpbHRlcignRk9DVVNfT05MWScpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMi41IHB5LTEgcm91bmRlZC1sZyBib3JkZXIgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgICAgbWV0cmljRmlsdGVyID09PSAnRk9DVVNfT05MWSdcbiAgICAgICAgICAgICAgICA/ICdiZy1yZWQtOTUwIHRleHQtcmVkLTMwMCBib3JkZXItcmVkLTUwMCBmb250LWJvbGQnXG4gICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTUwIHRleHQtc2xhdGUtNDAwIGJvcmRlci1zbGF0ZS04MDAgaG92ZXI6dGV4dC13aGl0ZSdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIFR5bGtvIFByemVqxJljaWEgRm9rdXN1XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0TWV0cmljRmlsdGVyKCdNQUxXQVJFX09OTFknKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTIuNSBweS0xIHJvdW5kZWQtbGcgYm9yZGVyIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgIG1ldHJpY0ZpbHRlciA9PT0gJ01BTFdBUkVfT05MWSdcbiAgICAgICAgICAgICAgICA/ICdiZy1lbWVyYWxkLTk1MCB0ZXh0LWVtZXJhbGQtMzAwIGJvcmRlci1lbWVyYWxkLTUwMCBmb250LWJvbGQnXG4gICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTUwIHRleHQtc2xhdGUtNDAwIGJvcmRlci1zbGF0ZS04MDAgaG92ZXI6dGV4dC13aGl0ZSdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIFR5bGtvIFpuZXV0cmFsaXpvd2FuZSBNYWx3YXJlXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0TWV0cmljRmlsdGVyKCdDUklUSUNBTF9TUElLRVMnKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTIuNSBweS0xIHJvdW5kZWQtbGcgYm9yZGVyIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgIG1ldHJpY0ZpbHRlciA9PT0gJ0NSSVRJQ0FMX1NQSUtFUydcbiAgICAgICAgICAgICAgICA/ICdiZy1hbWJlci05NTAgdGV4dC1hbWJlci0zMDAgYm9yZGVyLWFtYmVyLTUwMCBmb250LWJvbGQnXG4gICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTUwIHRleHQtc2xhdGUtNDAwIGJvcmRlci1zbGF0ZS04MDAgaG92ZXI6dGV4dC13aGl0ZSdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIFR5bGtvIFBpa2kgS3J5dHljem5lXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgdGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTIuNSBoLTAuNSBiZy1yb3NlLTUwMCBpbmxpbmUtYmxvY2tcIiAvPlxuICAgICAgICAgICAgUHLDs2cgQWxhcm11IFNlbnRpbmVsICgxMi9taW4pXG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogTWFpbiBSZWNoYXJ0cyBMaW5lIENoYXJ0IENvbnRhaW5lciAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGgtWzM2MHB4XSBzbTpoLVs0MDBweF0gcC0yIHJvdW5kZWQtMnhsIGJnLWJsYWNrLzYwIGJvcmRlciBib3JkZXItc2xhdGUtODAwLzgwXCI+XG4gICAgICAgIDxSZXNwb25zaXZlQ29udGFpbmVyIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIj5cbiAgICAgICAgICA8Q29tcG9zZWRDaGFydFxuICAgICAgICAgICAgZGF0YT17Y2hhcnREYXRhfVxuICAgICAgICAgICAgbWFyZ2luPXt7IHRvcDogMjAsIHJpZ2h0OiAyNSwgbGVmdDogLTEwLCBib3R0b206IDEwIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgey8qIEdyYWRpZW50cyAqL31cbiAgICAgICAgICAgIDxkZWZzPlxuICAgICAgICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9XCJjeWFuQXJlYUdyYWRpZW50XCIgeDE9XCIwXCIgeTE9XCIwXCIgeDI9XCIwXCIgeTI9XCIxXCI+XG4gICAgICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiNSVcIiBzdG9wQ29sb3I9XCIjMDZiNmQ0XCIgc3RvcE9wYWNpdHk9ezAuNH0gLz5cbiAgICAgICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCI5NSVcIiBzdG9wQ29sb3I9XCIjMDZiNmQ0XCIgc3RvcE9wYWNpdHk9ezAuMH0gLz5cbiAgICAgICAgICAgICAgPC9saW5lYXJHcmFkaWVudD5cbiAgICAgICAgICAgICAgPGxpbmVhckdyYWRpZW50IGlkPVwicmVkQXJlYUdyYWRpZW50XCIgeDE9XCIwXCIgeTE9XCIwXCIgeDI9XCIwXCIgeTI9XCIxXCI+XG4gICAgICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiNSVcIiBzdG9wQ29sb3I9XCIjZWY0NDQ0XCIgc3RvcE9wYWNpdHk9ezAuMzV9IC8+XG4gICAgICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiOTUlXCIgc3RvcENvbG9yPVwiI2VmNDQ0NFwiIHN0b3BPcGFjaXR5PXswLjB9IC8+XG4gICAgICAgICAgICAgIDwvbGluZWFyR3JhZGllbnQ+XG4gICAgICAgICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD1cImVtZXJhbGRBcmVhR3JhZGllbnRcIiB4MT1cIjBcIiB5MT1cIjBcIiB4Mj1cIjBcIiB5Mj1cIjFcIj5cbiAgICAgICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCI1JVwiIHN0b3BDb2xvcj1cIiMxMGI5ODFcIiBzdG9wT3BhY2l0eT17MC4zNX0gLz5cbiAgICAgICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCI5NSVcIiBzdG9wQ29sb3I9XCIjMTBiOTgxXCIgc3RvcE9wYWNpdHk9ezAuMH0gLz5cbiAgICAgICAgICAgICAgPC9saW5lYXJHcmFkaWVudD5cbiAgICAgICAgICAgIDwvZGVmcz5cblxuICAgICAgICAgICAgPENhcnRlc2lhbkdyaWQgc3Ryb2tlRGFzaGFycmF5PVwiMyAzXCIgc3Ryb2tlPVwiIzFlMjkzYlwiIHZlcnRpY2FsPXtmYWxzZX0gLz5cblxuICAgICAgICAgICAgPFhBeGlzXG4gICAgICAgICAgICAgIGRhdGFLZXk9XCJ0aW1lTGFiZWxcIlxuICAgICAgICAgICAgICBzdHJva2U9XCIjNjQ3NDhiXCJcbiAgICAgICAgICAgICAgZm9udFNpemU9ezExfVxuICAgICAgICAgICAgICBmb250RmFtaWx5PVwibW9ub3NwYWNlXCJcbiAgICAgICAgICAgICAgdGlja0xpbmU9e2ZhbHNlfVxuICAgICAgICAgICAgICBheGlzTGluZT17eyBzdHJva2U6ICcjMzM0MTU1JyB9fVxuICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgPFlBeGlzXG4gICAgICAgICAgICAgIHN0cm9rZT1cIiM2NDc0OGJcIlxuICAgICAgICAgICAgICBmb250U2l6ZT17MTF9XG4gICAgICAgICAgICAgIGZvbnRGYW1pbHk9XCJtb25vc3BhY2VcIlxuICAgICAgICAgICAgICB0aWNrTGluZT17ZmFsc2V9XG4gICAgICAgICAgICAgIGF4aXNMaW5lPXt7IHN0cm9rZTogJyMzMzQxNTUnIH19XG4gICAgICAgICAgICAgIGRvbWFpbj17WzAsICdkYXRhTWF4ICsgNCddfVxuICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgPFRvb2x0aXAgY29udGVudD17PEN1c3RvbVRvb2x0aXAgLz59IC8+XG5cbiAgICAgICAgICAgIDxMZWdlbmRcbiAgICAgICAgICAgICAgd3JhcHBlclN0eWxlPXt7IGZvbnRGYW1pbHk6ICdtb25vc3BhY2UnLCBmb250U2l6ZTogJzExcHgnLCBwYWRkaW5nVG9wOiAnMTBweCcgfX1cbiAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgIHsvKiBSZWZlcmVuY2UgTGluZSBmb3IgQXV0b25vbW91cyBQdXJnZSBUcmlnZ2VyICovfVxuICAgICAgICAgICAgPFJlZmVyZW5jZUxpbmVcbiAgICAgICAgICAgICAgeT17MTJ9XG4gICAgICAgICAgICAgIHN0cm9rZT1cIiNmNDNmNWVcIlxuICAgICAgICAgICAgICBzdHJva2VEYXNoYXJyYXk9XCI1IDVcIlxuICAgICAgICAgICAgICBzdHJva2VXaWR0aD17MS41fVxuICAgICAgICAgICAgICBsYWJlbD17e1xuICAgICAgICAgICAgICAgIHZhbHVlOiAnUFLDk0cgSU5URVJXRU5DSkkgVUJPSlUgKDEyL01JTiknLFxuICAgICAgICAgICAgICAgIGZpbGw6ICcjZmI3MTg1JyxcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogMTAsXG4gICAgICAgICAgICAgICAgZm9udEZhbWlseTogJ21vbm9zcGFjZScsXG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdpbnNpZGVUb3BSaWdodCdcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgIHsvKiBUb3RhbCBGcmVxdWVuY3kgTGluZSAmIEFyZWEgKi99XG4gICAgICAgICAgICB7KG1ldHJpY0ZpbHRlciA9PT0gJ0FMTCcpICYmIChcbiAgICAgICAgICAgICAgPEFyZWFcbiAgICAgICAgICAgICAgICB0eXBlPVwibW9ub3RvbmVcIlxuICAgICAgICAgICAgICAgIGRhdGFLZXk9XCJ0b3RhbEF0dGFja3NcIlxuICAgICAgICAgICAgICAgIG5hbWU9XCLFgcSFY3puYSBDesSZc3RvdGxpd2/Fm8SHXCJcbiAgICAgICAgICAgICAgICBzdHJva2U9XCIjMDZiNmQ0XCJcbiAgICAgICAgICAgICAgICBzdHJva2VXaWR0aD17Mi41fVxuICAgICAgICAgICAgICAgIGZpbGxPcGFjaXR5PXsxfVxuICAgICAgICAgICAgICAgIGZpbGw9XCJ1cmwoI2N5YW5BcmVhR3JhZGllbnQpXCJcbiAgICAgICAgICAgICAgICBhY3RpdmVEb3Q9e3sgcjogNiwgc3Ryb2tlOiAnIzIyZDNlZScsIHN0cm9rZVdpZHRoOiAyLCBmaWxsOiAnIzA4MzM0NCcgfX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgIHsvKiBGb2N1cyBIaWphY2sgQXR0ZW1wdHMgTGluZSAqL31cbiAgICAgICAgICAgIHsobWV0cmljRmlsdGVyID09PSAnQUxMJyB8fCBtZXRyaWNGaWx0ZXIgPT09ICdGT0NVU19PTkxZJykgJiYgKFxuICAgICAgICAgICAgICA8TGluZVxuICAgICAgICAgICAgICAgIHR5cGU9XCJtb25vdG9uZVwiXG4gICAgICAgICAgICAgICAgZGF0YUtleT1cImZvY3VzSGlqYWNrc1wiXG4gICAgICAgICAgICAgICAgbmFtZT1cIlByw7NieSBQcnplasSZY2lhIEZva3VzdSAoSFdORClcIlxuICAgICAgICAgICAgICAgIHN0cm9rZT1cIiNlZjQ0NDRcIlxuICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPXsyfVxuICAgICAgICAgICAgICAgIGRvdD17eyByOiAyLCBmaWxsOiAnI2VmNDQ0NCcgfX1cbiAgICAgICAgICAgICAgICBhY3RpdmVEb3Q9e3sgcjogNSwgZmlsbDogJyNiOTFjMWMnIH19XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuXG4gICAgICAgICAgICB7LyogTmV1dHJhbGl6ZWQgTWFsd2FyZSBMaW5lICovfVxuICAgICAgICAgICAgeyhtZXRyaWNGaWx0ZXIgPT09ICdBTEwnIHx8IG1ldHJpY0ZpbHRlciA9PT0gJ01BTFdBUkVfT05MWScpICYmIChcbiAgICAgICAgICAgICAgPExpbmVcbiAgICAgICAgICAgICAgICB0eXBlPVwibW9ub3RvbmVcIlxuICAgICAgICAgICAgICAgIGRhdGFLZXk9XCJuZXV0cmFsaXplZE1hbHdhcmVcIlxuICAgICAgICAgICAgICAgIG5hbWU9XCJabmV1dHJhbGl6b3dhbmUgTWFsd2FyZSAoVWLDs2ogMG1zKVwiXG4gICAgICAgICAgICAgICAgc3Ryb2tlPVwiIzEwYjk4MVwiXG4gICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg9ezJ9XG4gICAgICAgICAgICAgICAgZG90PXt7IHI6IDIsIGZpbGw6ICcjMTBiOTgxJyB9fVxuICAgICAgICAgICAgICAgIGFjdGl2ZURvdD17eyByOiA1LCBmaWxsOiAnIzA0Nzg1NycgfX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgIHsvKiBDcml0aWNhbCBTcGlrZXMgTGluZSAqL31cbiAgICAgICAgICAgIHsobWV0cmljRmlsdGVyID09PSAnQUxMJyB8fCBtZXRyaWNGaWx0ZXIgPT09ICdDUklUSUNBTF9TUElLRVMnKSAmJiAoXG4gICAgICAgICAgICAgIDxMaW5lXG4gICAgICAgICAgICAgICAgdHlwZT1cInN0ZXBBZnRlclwiXG4gICAgICAgICAgICAgICAgZGF0YUtleT1cImNyaXRpY2FsU3Bpa2VzXCJcbiAgICAgICAgICAgICAgICBuYW1lPVwiUGlraSBLcnl0eWN6bmUgKENyaXRpY2FsIFNwaWtlcylcIlxuICAgICAgICAgICAgICAgIHN0cm9rZT1cIiNmNTllMGJcIlxuICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPXsyfVxuICAgICAgICAgICAgICAgIGRvdD17eyByOiAzLCBmaWxsOiAnI2Y1OWUwYicgfX1cbiAgICAgICAgICAgICAgICBhY3RpdmVEb3Q9e3sgcjogNiwgZmlsbDogJyNiNDUzMDknIH19XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuXG4gICAgICAgICAgICB7LyogVGltZWxpbmUgUmFuZ2UgQnJ1c2ggKi99XG4gICAgICAgICAgICA8QnJ1c2hcbiAgICAgICAgICAgICAgZGF0YUtleT1cInRpbWVMYWJlbFwiXG4gICAgICAgICAgICAgIGhlaWdodD17MjJ9XG4gICAgICAgICAgICAgIHN0cm9rZT1cIiMwNmI2ZDRcIlxuICAgICAgICAgICAgICBmaWxsPVwiIzAyMDYxN1wiXG4gICAgICAgICAgICAgIHRyYXZlbGxlcldpZHRoPXsxMH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9Db21wb3NlZENoYXJ0PlxuICAgICAgICA8L1Jlc3BvbnNpdmVDb250YWluZXI+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIENoYXJ0IEZvb3RlciBGb3JlbnNpYyBJbnNpZ2h0ICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMuNSByb3VuZGVkLXhsIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IGl0ZW1zLXN0YXJ0IHNtOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTMgdGV4dC14cyBmb250LW1vbm8gdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0xIHJvdW5kZWQgYmctcHVycGxlLTk1MCBib3JkZXIgYm9yZGVyLXB1cnBsZS04MDAgdGV4dC1wdXJwbGUtMzAwXCI+XG4gICAgICAgICAgICA8Q3B1IGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgIFdza2HFum5payBFZmVrdHl3bm/Fm2NpIFBhY3lmaWthY2ppOiA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC00MDBcIj45OS45OCU8L3N0cm9uZz4g4oCiIMWacmVkbmkgQ3phcyBabmlzemN6ZW5pYTogPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LWN5YW4tMzAwXCI+MC4wMiBtczwvc3Ryb25nPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS01MDBcIj5cbiAgICAgICAgICBSZWplc3RyIHpzeW5jaHJvbml6b3dhbnkgeiBtb2R1xYJlbSA8Y29kZSBjbGFzc05hbWU9XCJ0ZXh0LXJvc2UtNDAwXCI+Zm9jdXNIaWphY2tUcmFja2VyPC9jb2RlPiAmIDxjb2RlIGNsYXNzTmFtZT1cInRleHQtYW1iZXItNDAwXCI+YnJvd3Nlck1hbHdhcmVBdXRvU2Nhbm5lcjwvY29kZT4uXG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwibWFwcGluZ3MiOiJBQTZLYztBQTdLZCxTQUFnQixVQUFVLFNBQVMsaUJBQWlCO0FBQ3BEO0FBQUEsRUFDRTtBQUFBLEVBRUE7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxF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QUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQVFBO0FBQUEsVUFJRjtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsU0FBUTtBQUFBLGNBQ1IsUUFBUTtBQUFBLGNBQ1IsUUFBTztBQUFBLGNBQ1AsTUFBSztBQUFBLGNBQ0wsZ0JBQWdCO0FBQUE7QUFBQSxZQUxsQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFNQTtBQUFBO0FBQUE7QUFBQSxNQXpIRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUEwSEEsS0EzSEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQTRIQSxLQTdIRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBOEhBO0FBQUEsSUFHQSx1QkFBQyxTQUFJLFdBQVUsc0tBQ2I7QUFBQSw2QkFBQyxTQUFJLFdBQVUsMkJBQ2I7QUFBQSwrQkFBQyxTQUFJLFdBQVUsc0VBQ2IsaUNBQUMsT0FBSSxXQUFVLGlCQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBNkIsS0FEL0I7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUVBO0FBQUEsUUFDQSx1QkFBQyxVQUFLO0FBQUE7QUFBQSxVQUMrQix1QkFBQyxZQUFPLFdBQVUsb0JBQW1CLHNCQUFyQztBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUEyQztBQUFBLFVBQVM7QUFBQSxVQUE0Qix1QkFBQyxZQUFPLFdBQVUsaUJBQWdCLHVCQUFsQztBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUF5QztBQUFBLGFBRDlKO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFFQTtBQUFBLFdBTkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQU9BO0FBQUEsTUFDQSx1QkFBQyxTQUFJLFdBQVUsOEJBQTZCO0FBQUE7QUFBQSxRQUNQLHVCQUFDLFVBQUssV0FBVSxpQkFBZ0Isa0NBQWhDO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBa0Q7QUFBQSxRQUFPO0FBQUEsUUFBRyx1QkFBQyxVQUFLLFdBQVUsa0JBQWlCLHlDQUFqQztBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQTBEO0FBQUEsUUFBTztBQUFBLFdBRGxLO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFFQTtBQUFBLFNBWEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQVlBO0FBQUEsT0F0VUY7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQXdVQTtBQUVKOyIsIm5hbWVzIjpbInBvaW50cyJdfQ==