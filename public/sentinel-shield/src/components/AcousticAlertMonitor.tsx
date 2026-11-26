import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"]; const useRef = __vite__cjsImport1_react["useRef"];
import {
  Volume2,
  VolumeX,
  Radio,
  Sparkles,
  Check,
  Activity,
  ShieldAlert,
  Waves,
  Play,
  Info
} from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import {
  acousticAlertEngine
} from "/sentinel-shield/src/utils/acousticAlertSystem.ts";
import { gnidaSensor } from "/sentinel-shield/src/utils/gnidaAutoFreezeSensor.ts";
export const AcousticAlertMonitor = ({
  compact = false,
  onSimulateThreatLaunch
}) => {
  const [settings, setSettings] = useState(() => acousticAlertEngine.getSettings());
  const [recentAlerts, setRecentAlerts] = useState(() => acousticAlertEngine.getRecentAlerts());
  const [isPlaying, setIsPlaying] = useState(() => acousticAlertEngine.isPlaying());
  const [sensorStatus, setSensorStatus] = useState(() => gnidaSensor.getStatus());
  const [testNotice, setTestNotice] = useState(null);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  useEffect(() => {
    const unsubAcoustic = acousticAlertEngine.subscribe((alerts, updatedSettings, playing) => {
      setRecentAlerts(alerts);
      setSettings(updatedSettings);
      setIsPlaying(playing);
    });
    const unsubSensor = gnidaSensor.subscribe((status) => {
      setSensorStatus(status);
    });
    return () => {
      unsubAcoustic();
      unsubSensor();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let phase = 0;
    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);
      const isPulseActive = isPlaying;
      const amplitude = isPulseActive ? height * 0.42 : height * 0.12;
      const frequency = isPulseActive ? 0.045 : 0.02;
      if (isPulseActive) {
        const gradient = ctx.createRadialGradient(width / 2, height / 2, 5, width / 2, height / 2, width / 2);
        gradient.addColorStop(0, "rgba(244, 63, 94, 0.25)");
        gradient.addColorStop(1, "rgba(244, 63, 94, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }
      ctx.beginPath();
      ctx.lineWidth = isPulseActive ? 3 : 1.5;
      ctx.strokeStyle = isPulseActive ? "#f43f5e" : "#6366f1";
      ctx.shadowBlur = isPulseActive ? 12 : 4;
      ctx.shadowColor = isPulseActive ? "#f43f5e" : "#6366f1";
      for (let x = 0; x < width; x++) {
        const y = height / 2 + Math.sin(x * frequency + phase) * amplitude;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = isPulseActive ? "#38bdf8" : "#3b82f6";
      ctx.shadowBlur = 0;
      for (let x = 0; x < width; x++) {
        const y = height / 2 + Math.sin(x * (frequency * 2) - phase * 1.5) * (amplitude * 0.45);
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      phase += isPulseActive ? 0.22 : 0.04;
      animationFrameRef.current = requestAnimationFrame(render);
    };
    render();
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying]);
  const handleTestAlert = () => {
    acousticAlertEngine.playTestAlert();
    setTestNotice("Wyemitowano niskoczęstotliwościowy ton haptyczny (~58 Hz)");
    setTimeout(() => setTestNotice(null), 3e3);
  };
  const handleSimulateHighThreat = () => {
    const threats = [
      { name: "flutter_topmost_hijacker.exe", pid: Math.floor(4e3 + Math.random() * 3e3) },
      { name: "python_overlay_screenlock.py", pid: Math.floor(2e3 + Math.random() * 3e3) },
      { name: "memory_spray_payload.exe", pid: Math.floor(5e3 + Math.random() * 3e3) },
      { name: "injected_stratum_miner.bin", pid: Math.floor(7e3 + Math.random() * 2e3) }
    ];
    const picked = threats[Math.floor(Math.random() * threats.length)];
    gnidaSensor.onHighThreatProcessLaunch(picked.name, picked.pid, "HIGH");
    setTestNotice(`Czujnik Gnid wykrył uruchomienie: ${picked.name} (PID: ${picked.pid})`);
    setTimeout(() => setTestNotice(null), 3500);
    if (onSimulateThreatLaunch) {
      onSimulateThreatLaunch();
    }
  };
  const handleProfileSelect = (profile) => {
    acousticAlertEngine.setProfile(profile);
  };
  const handleToggleEnable = () => {
    acousticAlertEngine.setEnabled(!settings.enabled);
  };
  const handleVolumeChange = (e) => {
    acousticAlertEngine.setVolume(parseFloat(e.target.value));
  };
  if (compact) {
    return /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 p-1.5 px-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs font-mono", children: [
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: handleToggleEnable,
          className: `p-1.5 rounded-lg transition-all cursor-pointer ${settings.enabled ? "text-rose-400 bg-rose-950/60 hover:bg-rose-900/60" : "text-zinc-500 bg-zinc-800 hover:bg-zinc-700"}`,
          title: settings.enabled ? "Acoustic Alert: Włączony" : "Acoustic Alert: Wyciszony",
          children: settings.enabled ? /* @__PURE__ */ jsxDEV(Volume2, { className: "w-4 h-4" }, void 0, false, {
            fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
            lineNumber: 172,
            columnNumber: 31
          }, this) : /* @__PURE__ */ jsxDEV(VolumeX, { className: "w-4 h-4" }, void 0, false, {
            fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
            lineNumber: 172,
            columnNumber: 65
          }, this)
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
          lineNumber: 163,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxDEV("span", { className: `w-2 h-2 rounded-full ${isPlaying ? "bg-rose-500 animate-ping" : settings.enabled ? "bg-emerald-400" : "bg-zinc-600"}` }, void 0, false, {
          fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
          lineNumber: 176,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-300 hidden sm:inline", children: "Acoustic Alert:" }, void 0, false, {
          fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
          lineNumber: 177,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-400 font-bold", children: settings.enabled ? "58 Hz Haptyk" : "Muted" }, void 0, false, {
          fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
          lineNumber: 178,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
        lineNumber: 175,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: handleTestAlert,
          className: "ml-1 px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-[10px] font-bold cursor-pointer transition-all",
          children: "Test"
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
          lineNumber: 181,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
      lineNumber: 162,
      columnNumber: 7
    }, this);
  }
  return /* @__PURE__ */ jsxDEV("div", { className: "rounded-3xl bg-zinc-950/95 border-2 border-rose-500/30 p-5 sm:p-6 shadow-2xl space-y-6 relative overflow-hidden backdrop-blur-xl", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" }, void 0, false, {
      fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
      lineNumber: 194,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-0 left-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" }, void 0, false, {
      fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
      lineNumber: 195,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4 relative z-10", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 mb-1.5", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-0.5 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-300 text-[11px] font-mono font-bold flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxDEV(Radio, { className: "w-3.5 h-3.5 text-rose-400 animate-pulse" }, void 0, false, {
              fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
              lineNumber: 202,
              columnNumber: 15
            }, this),
            "SYSTEM ACOUSTIC ALERT (WEB AUDIO API)"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
            lineNumber: 201,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded-full bg-zinc-800 text-[10px] font-mono text-zinc-400", children: "LOW-FREQUENCY SUB-BASS" }, void 0, false, {
            fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
            lineNumber: 205,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
          lineNumber: 200,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("h3", { className: "text-xl font-bold text-white tracking-tight flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "Niskoczęstotliwościowy Dźwiękowy Alert Haptyczny" }, void 0, false, {
            fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
            lineNumber: 210,
            columnNumber: 13
          }, this),
          isPlaying ? /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-0.5 rounded-full bg-rose-950 border border-rose-500/60 text-rose-300 text-xs font-mono font-bold flex items-center gap-1 animate-pulse", children: [
            /* @__PURE__ */ jsxDEV(Waves, { className: "w-3.5 h-3.5 text-rose-400" }, void 0, false, {
              fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
              lineNumber: 213,
              columnNumber: 17
            }, this),
            "EMISJA FALI 58 Hz"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
            lineNumber: 212,
            columnNumber: 15
          }, this) : null
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
          lineNumber: 209,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-zinc-400 mt-1 max-w-2xl leading-relaxed", children: "Emituje nieinwazyjny, ciepły ton niskiej częstotliwości (sub-bass 50–75 Hz z filtrem dolnoprzepustowym 180 Hz) w momencie wykrycia startu złośliwego procesu przez Czujnik Gnid (Gnida Sensor). Zapewnia natychmiastową informację zwrotną bez pisków i zmęczenia słuchu." }, void 0, false, {
          fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
          lineNumber: 218,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
        lineNumber: 199,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 self-stretch sm:self-auto shrink-0", children: /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: handleToggleEnable,
          className: `flex-1 sm:flex-none px-4 py-2.5 rounded-2xl font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer border shadow-lg ${settings.enabled ? "bg-gradient-to-r from-rose-950/80 to-zinc-900 border-rose-500/50 text-rose-200 hover:bg-rose-900/60" : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"}`,
          children: settings.enabled ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
            /* @__PURE__ */ jsxDEV(Volume2, { className: "w-4 h-4 text-rose-400" }, void 0, false, {
              fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
              lineNumber: 235,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Alert Akustyczny: WŁĄCZONY" }, void 0, false, {
              fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
              lineNumber: 236,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
            lineNumber: 234,
            columnNumber: 15
          }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
            /* @__PURE__ */ jsxDEV(VolumeX, { className: "w-4 h-4 text-zinc-500" }, void 0, false, {
              fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
              lineNumber: 240,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Alert Akustyczny: WYCISZONY" }, void 0, false, {
              fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
              lineNumber: 241,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
            lineNumber: 239,
            columnNumber: 15
          }, this)
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
          lineNumber: 225,
          columnNumber: 11
        },
        this
      ) }, void 0, false, {
        fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
        lineNumber: 224,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
      lineNumber: 198,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6 items-center", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-7 bg-black/80 rounded-2xl border border-zinc-800 p-4 space-y-3 relative overflow-hidden", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-xs font-mono text-zinc-400", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1.5 text-zinc-300 font-bold", children: [
            /* @__PURE__ */ jsxDEV(Activity, { className: "w-3.5 h-3.5 text-rose-400" }, void 0, false, {
              fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
              lineNumber: 254,
              columnNumber: 15
            }, this),
            "Oscyloskop Fali Sub-Basowej Web Audio API"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
            lineNumber: 253,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] text-zinc-400", children: [
            "Pasmo: 42–75 Hz | Filtr: ",
            settings.lowPassCutoffHz,
            " Hz"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
            lineNumber: 257,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
          lineNumber: 252,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "h-28 w-full bg-zinc-950/80 rounded-xl overflow-hidden border border-zinc-900 relative", children: [
          /* @__PURE__ */ jsxDEV(
            "canvas",
            {
              ref: canvasRef,
              width: 600,
              height: 112,
              className: "w-full h-full block"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
              lineNumber: 263,
              columnNumber: 13
            },
            this
          ),
          isPlaying && /* @__PURE__ */ jsxDEV("div", { className: "absolute top-2 right-3 px-2 py-0.5 rounded bg-rose-500/20 border border-rose-400/40 text-rose-300 font-mono text-[10px] font-bold animate-pulse", children: "IMPULS HAPTYCZNY AKTYWNY" }, void 0, false, {
            fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
            lineNumber: 270,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
          lineNumber: 262,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] font-mono text-zinc-400", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "Harmoniczne: Parzyste (Ciepłe)" }, void 0, false, {
            fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
            lineNumber: 277,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Atak: 15 ms (Bez trzasków)" }, void 0, false, {
            fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
            lineNumber: 278,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Zanikanie: 380 ms (Exponential)" }, void 0, false, {
            fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
            lineNumber: 279,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
          lineNumber: 276,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
        lineNumber: 251,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-5 space-y-3", children: /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-mono font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
            fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
            lineNumber: 287,
            columnNumber: 15
          }, this),
          "Test Audytywny & Symulacja Detekcji"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
          lineNumber: 286,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleTestAlert,
              className: "w-full py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-mono text-xs font-bold flex items-center justify-center gap-2 border border-zinc-700 transition-all cursor-pointer shadow active:scale-[0.98]",
              children: [
                /* @__PURE__ */ jsxDEV(Play, { className: "w-3.5 h-3.5 text-rose-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
                  lineNumber: 297,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Przetestuj Ton Haptyczny (~58 Hz)" }, void 0, false, {
                  fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
                  lineNumber: 298,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
              lineNumber: 293,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleSimulateHighThreat,
              className: "w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-900/80 to-rose-950 border border-rose-500/40 hover:border-rose-400 text-rose-200 font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-[0.98]",
              children: [
                /* @__PURE__ */ jsxDEV(ShieldAlert, { className: "w-3.5 h-3.5 text-rose-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
                  lineNumber: 306,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Symuluj Start Agresora (Czujnik Gnid)" }, void 0, false, {
                  fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
                  lineNumber: 307,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
              lineNumber: 302,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
          lineNumber: 291,
          columnNumber: 13
        }, this),
        testNotice && /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs font-mono flex items-center gap-2 animate-in fade-in duration-200", children: [
          /* @__PURE__ */ jsxDEV(Check, { className: "w-4 h-4 text-rose-400 shrink-0" }, void 0, false, {
            fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
            lineNumber: 313,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "truncate", children: testNotice }, void 0, false, {
            fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
            lineNumber: 314,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
          lineNumber: 312,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
        lineNumber: 285,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
        lineNumber: 284,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
      lineNumber: 249,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-6 pt-1", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "md:col-span-7 space-y-3", children: [
        /* @__PURE__ */ jsxDEV("label", { className: "text-xs font-mono text-zinc-400 font-bold block", children: "Wybór Profilu Akustycznego (Barwa & Charakterystyka):" }, void 0, false, {
          fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
          lineNumber: 325,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-2.5", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleProfileSelect("HAPTIC_SUB_PULSE"),
              className: `p-3 rounded-2xl border text-left font-mono transition-all cursor-pointer ${settings.profile === "HAPTIC_SUB_PULSE" ? "bg-rose-950/70 border-rose-500/60 text-white shadow-lg shadow-rose-950/40" : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200"}`,
              children: [
                /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-bold text-rose-300", children: "📳 Sub-Haptic Pulse" }, void 0, false, {
                  fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
                  lineNumber: 337,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-zinc-400 mt-1", children: "58 → 42 Hz (Głębokie tąpnięcie haptyczne)" }, void 0, false, {
                  fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
                  lineNumber: 338,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
              lineNumber: 329,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleProfileSelect("LOW_RESONANT_CHIME"),
              className: `p-3 rounded-2xl border text-left font-mono transition-all cursor-pointer ${settings.profile === "LOW_RESONANT_CHIME" ? "bg-indigo-950/70 border-indigo-500/60 text-white shadow-lg shadow-indigo-950/40" : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200"}`,
              children: [
                /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-bold text-indigo-300", children: "🔔 Resonant Chime" }, void 0, false, {
                  fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
                  lineNumber: 349,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-zinc-400 mt-1", children: "73.4 Hz + 146 Hz (Aksamitny dzwonek ostrzegawczy)" }, void 0, false, {
                  fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
                  lineNumber: 350,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
              lineNumber: 341,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleProfileSelect("SUB_TACTILE_HEARTBEAT"),
              className: `p-3 rounded-2xl border text-left font-mono transition-all cursor-pointer ${settings.profile === "SUB_TACTILE_HEARTBEAT" ? "bg-cyan-950/70 border-cyan-500/60 text-white shadow-lg shadow-cyan-950/40" : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200"}`,
              children: [
                /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-bold text-cyan-300", children: "💓 Tactile Heartbeat" }, void 0, false, {
                  fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
                  lineNumber: 361,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-zinc-400 mt-1", children: "52 Hz (Podwójne uderzenie sub-pulsu)" }, void 0, false, {
                  fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
                  lineNumber: 362,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
              lineNumber: 353,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
          lineNumber: 328,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
        lineNumber: 324,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "md:col-span-5 space-y-3", children: [
        /* @__PURE__ */ jsxDEV("label", { className: "text-xs font-mono text-zinc-400 font-bold block", children: "Poziom Głośności & Filtr Dolnoprzepustowy:" }, void 0, false, {
          fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
          lineNumber: 369,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between text-xs font-mono", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-400", children: "Głośność Tonu:" }, void 0, false, {
                fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
                lineNumber: 375,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-rose-300 font-bold", children: [
                Math.round(settings.volume * 100),
                "%"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
                lineNumber: 376,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
              lineNumber: 374,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "range",
                min: "0.05",
                max: "0.8",
                step: "0.05",
                value: settings.volume,
                onChange: handleVolumeChange,
                className: "w-full accent-rose-500 h-2 bg-zinc-800 rounded-lg cursor-pointer"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
                lineNumber: 378,
                columnNumber: 15
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
            lineNumber: 373,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-1 border-t border-zinc-800/80", children: [
            /* @__PURE__ */ jsxDEV("span", { children: "Wibracje dotykowe:" }, void 0, false, {
              fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
              lineNumber: 390,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-bold", children: "Navigator.vibrate ✓" }, void 0, false, {
              fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
              lineNumber: 391,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
            lineNumber: 389,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
          lineNumber: 372,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
        lineNumber: 368,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
      lineNumber: 322,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 pt-2 border-t border-zinc-800/80", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-xs font-mono text-zinc-400", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-zinc-300 flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxDEV(Info, { className: "w-3.5 h-3.5 text-rose-400" }, void 0, false, {
            fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
            lineNumber: 401,
            columnNumber: 13
          }, this),
          "Ostatnie Dźwiękowe Reakcje na Wykrycie Agresora (",
          recentAlerts.length,
          "):"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
          lineNumber: 400,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-zinc-400", children: "Działa w tle z Czujnikiem Gnid (0 ms)" }, void 0, false, {
          fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
          lineNumber: 404,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
        lineNumber: 399,
        columnNumber: 9
      }, this),
      recentAlerts.length === 0 ? /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-2xl bg-zinc-900/40 border border-dashed border-zinc-800 text-center text-xs font-mono text-zinc-400", children: 'Brak zarejestrowanych emisji alertu akustycznego. Kliknij "Symuluj Start Agresora", aby przetestować reakcję.' }, void 0, false, {
        fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
        lineNumber: 410,
        columnNumber: 11
      }, this) : /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5 max-h-36 overflow-y-auto pr-1", children: recentAlerts.slice(0, 5).map((alert) => /* @__PURE__ */ jsxDEV(
        "div",
        {
          className: "p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800/80 flex items-center justify-between text-xs font-mono",
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-rose-400 animate-pulse" }, void 0, false, {
                fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
                lineNumber: 421,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-200 font-bold", children: alert.threatName }, void 0, false, {
                fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
                lineNumber: 422,
                columnNumber: 19
              }, this),
              alert.pid && /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-zinc-400", children: [
                "PID: ",
                alert.pid
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
                lineNumber: 423,
                columnNumber: 33
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
              lineNumber: 420,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-zinc-400", children: [
                alert.fundamentalFreqHz,
                " Hz"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
                lineNumber: 426,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-zinc-400", children: alert.timestamp }, void 0, false, {
                fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
                lineNumber: 427,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
              lineNumber: 425,
              columnNumber: 17
            }, this)
          ]
        },
        alert.id,
        true,
        {
          fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
          lineNumber: 416,
          columnNumber: 15
        },
        this
      )) }, void 0, false, {
        fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
        lineNumber: 414,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
      lineNumber: 398,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/AcousticAlertMonitor.tsx",
    lineNumber: 193,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFjb3VzdGljQWxlcnRNb25pdG9yLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgXG4gIFZvbHVtZTIsIFZvbHVtZVgsIFJhZGlvLCBTcGFya2xlcywgQ2hlY2ssIFxuICBTbGlkZXJzLCBBY3Rpdml0eSwgU2hpZWxkQWxlcnQsIFdhdmVzLCBQbGF5LCBJbmZvXG59IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBcbiAgYWNvdXN0aWNBbGVydEVuZ2luZSwgXG4gIEFjb3VzdGljQWxlcnRFdmVudCwgXG4gIEFjb3VzdGljQWxlcnRTZXR0aW5ncywgXG4gIEFjb3VzdGljVG9uZVByb2ZpbGUgXG59IGZyb20gJy4uL3V0aWxzL2Fjb3VzdGljQWxlcnRTeXN0ZW0nO1xuaW1wb3J0IHsgZ25pZGFTZW5zb3IsIFNlbnNvckF1dG9tYXRvblN0YXR1cyB9IGZyb20gJy4uL3V0aWxzL2duaWRhQXV0b0ZyZWV6ZVNlbnNvcic7XG5cbmludGVyZmFjZSBBY291c3RpY0FsZXJ0TW9uaXRvclByb3BzIHtcbiAgY29tcGFjdD86IGJvb2xlYW47XG4gIG9uU2ltdWxhdGVUaHJlYXRMYXVuY2g/OiAoKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgY29uc3QgQWNvdXN0aWNBbGVydE1vbml0b3I6IFJlYWN0LkZDPEFjb3VzdGljQWxlcnRNb25pdG9yUHJvcHM+ID0gKHsgXG4gIGNvbXBhY3QgPSBmYWxzZSxcbiAgb25TaW11bGF0ZVRocmVhdExhdW5jaFxufSkgPT4ge1xuICBjb25zdCBbc2V0dGluZ3MsIHNldFNldHRpbmdzXSA9IHVzZVN0YXRlPEFjb3VzdGljQWxlcnRTZXR0aW5ncz4oKCkgPT4gYWNvdXN0aWNBbGVydEVuZ2luZS5nZXRTZXR0aW5ncygpKTtcbiAgY29uc3QgW3JlY2VudEFsZXJ0cywgc2V0UmVjZW50QWxlcnRzXSA9IHVzZVN0YXRlPEFjb3VzdGljQWxlcnRFdmVudFtdPigoKSA9PiBhY291c3RpY0FsZXJ0RW5naW5lLmdldFJlY2VudEFsZXJ0cygpKTtcbiAgY29uc3QgW2lzUGxheWluZywgc2V0SXNQbGF5aW5nXSA9IHVzZVN0YXRlPGJvb2xlYW4+KCgpID0+IGFjb3VzdGljQWxlcnRFbmdpbmUuaXNQbGF5aW5nKCkpO1xuICBjb25zdCBbc2Vuc29yU3RhdHVzLCBzZXRTZW5zb3JTdGF0dXNdID0gdXNlU3RhdGU8U2Vuc29yQXV0b21hdG9uU3RhdHVzPigoKSA9PiBnbmlkYVNlbnNvci5nZXRTdGF0dXMoKSk7XG4gIGNvbnN0IFt0ZXN0Tm90aWNlLCBzZXRUZXN0Tm90aWNlXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuXG4gIGNvbnN0IGNhbnZhc1JlZiA9IHVzZVJlZjxIVE1MQ2FudmFzRWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBhbmltYXRpb25GcmFtZVJlZiA9IHVzZVJlZjxudW1iZXIgfCBudWxsPihudWxsKTtcblxuICAvLyBTdWJzY3JpYmUgdG8gQWNvdXN0aWMgQWxlcnQgRW5naW5lIGFuZCBHbmlkYSBTZW5zb3JcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCB1bnN1YkFjb3VzdGljID0gYWNvdXN0aWNBbGVydEVuZ2luZS5zdWJzY3JpYmUoKGFsZXJ0cywgdXBkYXRlZFNldHRpbmdzLCBwbGF5aW5nKSA9PiB7XG4gICAgICBzZXRSZWNlbnRBbGVydHMoYWxlcnRzKTtcbiAgICAgIHNldFNldHRpbmdzKHVwZGF0ZWRTZXR0aW5ncyk7XG4gICAgICBzZXRJc1BsYXlpbmcocGxheWluZyk7XG4gICAgfSk7XG5cbiAgICBjb25zdCB1bnN1YlNlbnNvciA9IGduaWRhU2Vuc29yLnN1YnNjcmliZSgoc3RhdHVzKSA9PiB7XG4gICAgICBzZXRTZW5zb3JTdGF0dXMoc3RhdHVzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB1bnN1YkFjb3VzdGljKCk7XG4gICAgICB1bnN1YlNlbnNvcigpO1xuICAgICAgaWYgKGFuaW1hdGlvbkZyYW1lUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uRnJhbWVSZWYuY3VycmVudCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIC8vIFZpc3VhbGl6ZXIgQW5pbWF0aW9uIGZvciBMb3ctRnJlcXVlbmN5IEhhcHRpYyBXYXZlZm9ybVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGNhbnZhcyA9IGNhbnZhc1JlZi5jdXJyZW50O1xuICAgIGlmICghY2FudmFzKSByZXR1cm47XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgaWYgKCFjdHgpIHJldHVybjtcblxuICAgIGxldCBwaGFzZSA9IDA7XG4gICAgY29uc3QgcmVuZGVyID0gKCkgPT4ge1xuICAgICAgY29uc3Qgd2lkdGggPSBjYW52YXMud2lkdGg7XG4gICAgICBjb25zdCBoZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xuICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgICAgY29uc3QgaXNQdWxzZUFjdGl2ZSA9IGlzUGxheWluZztcbiAgICAgIGNvbnN0IGFtcGxpdHVkZSA9IGlzUHVsc2VBY3RpdmUgPyBoZWlnaHQgKiAwLjQyIDogaGVpZ2h0ICogMC4xMjtcbiAgICAgIGNvbnN0IGZyZXF1ZW5jeSA9IGlzUHVsc2VBY3RpdmUgPyAwLjA0NSA6IDAuMDI7XG5cbiAgICAgIC8vIEdsb3cgYmFja2Ryb3BcbiAgICAgIGlmIChpc1B1bHNlQWN0aXZlKSB7XG4gICAgICAgIGNvbnN0IGdyYWRpZW50ID0gY3R4LmNyZWF0ZVJhZGlhbEdyYWRpZW50KHdpZHRoIC8gMiwgaGVpZ2h0IC8gMiwgNSwgd2lkdGggLyAyLCBoZWlnaHQgLyAyLCB3aWR0aCAvIDIpO1xuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMCwgJ3JnYmEoMjQ0LCA2MywgOTQsIDAuMjUpJyk7XG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgxLCAncmdiYSgyNDQsIDYzLCA5NCwgMCknKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGdyYWRpZW50O1xuICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICB9XG5cbiAgICAgIC8vIERyYXcgc2luZSB3YXZlZm9ybVxuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4LmxpbmVXaWR0aCA9IGlzUHVsc2VBY3RpdmUgPyAzIDogMS41O1xuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gaXNQdWxzZUFjdGl2ZSA/ICcjZjQzZjVlJyA6ICcjNjM2NmYxJztcbiAgICAgIGN0eC5zaGFkb3dCbHVyID0gaXNQdWxzZUFjdGl2ZSA/IDEyIDogNDtcbiAgICAgIGN0eC5zaGFkb3dDb2xvciA9IGlzUHVsc2VBY3RpdmUgPyAnI2Y0M2Y1ZScgOiAnIzYzNjZmMSc7XG5cbiAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgd2lkdGg7IHgrKykge1xuICAgICAgICBjb25zdCB5ID0gaGVpZ2h0IC8gMiArIE1hdGguc2luKHggKiBmcmVxdWVuY3kgKyBwaGFzZSkgKiBhbXBsaXR1ZGU7XG4gICAgICAgIGlmICh4ID09PSAwKSB7XG4gICAgICAgICAgY3R4Lm1vdmVUbyh4LCB5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjdHgubGluZVRvKHgsIHkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjdHguc3Ryb2tlKCk7XG5cbiAgICAgIC8vIFNlY29uZCBoYXJtb25pYyBzdWJ0bGUgbGluZVxuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgICBjdHguc3Ryb2tlU3R5bGUgPSBpc1B1bHNlQWN0aXZlID8gJyMzOGJkZjgnIDogJyMzYjgyZjYnO1xuICAgICAgY3R4LnNoYWRvd0JsdXIgPSAwO1xuICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB3aWR0aDsgeCsrKSB7XG4gICAgICAgIGNvbnN0IHkgPSBoZWlnaHQgLyAyICsgTWF0aC5zaW4oeCAqIChmcmVxdWVuY3kgKiAyKSAtIHBoYXNlICogMS41KSAqIChhbXBsaXR1ZGUgKiAwLjQ1KTtcbiAgICAgICAgaWYgKHggPT09IDApIHtcbiAgICAgICAgICBjdHgubW92ZVRvKHgsIHkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGN0eC5saW5lVG8oeCwgeSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGN0eC5zdHJva2UoKTtcblxuICAgICAgcGhhc2UgKz0gaXNQdWxzZUFjdGl2ZSA/IDAuMjIgOiAwLjA0O1xuICAgICAgYW5pbWF0aW9uRnJhbWVSZWYuY3VycmVudCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuICAgIH07XG5cbiAgICByZW5kZXIoKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZiAoYW5pbWF0aW9uRnJhbWVSZWYuY3VycmVudCkge1xuICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShhbmltYXRpb25GcmFtZVJlZi5jdXJyZW50KTtcbiAgICAgIH1cbiAgICB9O1xuICB9LCBbaXNQbGF5aW5nXSk7XG5cbiAgY29uc3QgaGFuZGxlVGVzdEFsZXJ0ID0gKCkgPT4ge1xuICAgIGFjb3VzdGljQWxlcnRFbmdpbmUucGxheVRlc3RBbGVydCgpO1xuICAgIHNldFRlc3ROb3RpY2UoJ1d5ZW1pdG93YW5vIG5pc2tvY3rEmXN0b3RsaXdvxZtjaW93eSB0b24gaGFwdHljem55ICh+NTggSHopJyk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXRUZXN0Tm90aWNlKG51bGwpLCAzMDAwKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTaW11bGF0ZUhpZ2hUaHJlYXQgPSAoKSA9PiB7XG4gICAgY29uc3QgdGhyZWF0cyA9IFtcbiAgICAgIHsgbmFtZTogJ2ZsdXR0ZXJfdG9wbW9zdF9oaWphY2tlci5leGUnLCBwaWQ6IE1hdGguZmxvb3IoNDAwMCArIE1hdGgucmFuZG9tKCkgKiAzMDAwKSB9LFxuICAgICAgeyBuYW1lOiAncHl0aG9uX292ZXJsYXlfc2NyZWVubG9jay5weScsIHBpZDogTWF0aC5mbG9vcigyMDAwICsgTWF0aC5yYW5kb20oKSAqIDMwMDApIH0sXG4gICAgICB7IG5hbWU6ICdtZW1vcnlfc3ByYXlfcGF5bG9hZC5leGUnLCBwaWQ6IE1hdGguZmxvb3IoNTAwMCArIE1hdGgucmFuZG9tKCkgKiAzMDAwKSB9LFxuICAgICAgeyBuYW1lOiAnaW5qZWN0ZWRfc3RyYXR1bV9taW5lci5iaW4nLCBwaWQ6IE1hdGguZmxvb3IoNzAwMCArIE1hdGgucmFuZG9tKCkgKiAyMDAwKSB9LFxuICAgIF07XG4gICAgY29uc3QgcGlja2VkID0gdGhyZWF0c1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aHJlYXRzLmxlbmd0aCldO1xuICAgIGduaWRhU2Vuc29yLm9uSGlnaFRocmVhdFByb2Nlc3NMYXVuY2gocGlja2VkLm5hbWUsIHBpY2tlZC5waWQsICdISUdIJyk7XG4gICAgc2V0VGVzdE5vdGljZShgQ3p1am5payBHbmlkIHd5a3J5xYIgdXJ1Y2hvbWllbmllOiAke3BpY2tlZC5uYW1lfSAoUElEOiAke3BpY2tlZC5waWR9KWApO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0VGVzdE5vdGljZShudWxsKSwgMzUwMCk7XG5cbiAgICBpZiAob25TaW11bGF0ZVRocmVhdExhdW5jaCkge1xuICAgICAgb25TaW11bGF0ZVRocmVhdExhdW5jaCgpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVQcm9maWxlU2VsZWN0ID0gKHByb2ZpbGU6IEFjb3VzdGljVG9uZVByb2ZpbGUpID0+IHtcbiAgICBhY291c3RpY0FsZXJ0RW5naW5lLnNldFByb2ZpbGUocHJvZmlsZSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlVG9nZ2xlRW5hYmxlID0gKCkgPT4ge1xuICAgIGFjb3VzdGljQWxlcnRFbmdpbmUuc2V0RW5hYmxlZCghc2V0dGluZ3MuZW5hYmxlZCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlVm9sdW1lQ2hhbmdlID0gKGU6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XG4gICAgYWNvdXN0aWNBbGVydEVuZ2luZS5zZXRWb2x1bWUocGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSkpO1xuICB9O1xuXG4gIC8vIENvbXBhY3QgV2lkZ2V0IE1vZGUgKGUuZy4gZm9yIGhlYWRlciBvciBuYXZiYXIgYmFyKVxuICBpZiAoY29tcGFjdCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHAtMS41IHB4LTMgcm91bmRlZC14bCBiZy16aW5jLTkwMC85MCBib3JkZXIgYm9yZGVyLXppbmMtODAwIHRleHQteHMgZm9udC1tb25vXCI+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVUb2dnbGVFbmFibGV9XG4gICAgICAgICAgY2xhc3NOYW1lPXtgcC0xLjUgcm91bmRlZC1sZyB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciAke1xuICAgICAgICAgICAgc2V0dGluZ3MuZW5hYmxlZFxuICAgICAgICAgICAgICA/ICd0ZXh0LXJvc2UtNDAwIGJnLXJvc2UtOTUwLzYwIGhvdmVyOmJnLXJvc2UtOTAwLzYwJ1xuICAgICAgICAgICAgICA6ICd0ZXh0LXppbmMtNTAwIGJnLXppbmMtODAwIGhvdmVyOmJnLXppbmMtNzAwJ1xuICAgICAgICAgIH1gfVxuICAgICAgICAgIHRpdGxlPXtzZXR0aW5ncy5lbmFibGVkID8gJ0Fjb3VzdGljIEFsZXJ0OiBXxYLEhWN6b255JyA6ICdBY291c3RpYyBBbGVydDogV3ljaXN6b255J31cbiAgICAgICAgPlxuICAgICAgICAgIHtzZXR0aW5ncy5lbmFibGVkID8gPFZvbHVtZTIgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+IDogPFZvbHVtZVggY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+fVxuICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2B3LTIgaC0yIHJvdW5kZWQtZnVsbCAke2lzUGxheWluZyA/ICdiZy1yb3NlLTUwMCBhbmltYXRlLXBpbmcnIDogc2V0dGluZ3MuZW5hYmxlZCA/ICdiZy1lbWVyYWxkLTQwMCcgOiAnYmctemluYy02MDAnfWB9IC8+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC16aW5jLTMwMCBoaWRkZW4gc206aW5saW5lXCI+QWNvdXN0aWMgQWxlcnQ6PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtemluYy00MDAgZm9udC1ib2xkXCI+e3NldHRpbmdzLmVuYWJsZWQgPyAnNTggSHogSGFwdHlrJyA6ICdNdXRlZCd9PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgb25DbGljaz17aGFuZGxlVGVzdEFsZXJ0fVxuICAgICAgICAgIGNsYXNzTmFtZT1cIm1sLTEgcHgtMiBweS0wLjUgcm91bmRlZCBiZy16aW5jLTgwMCBob3ZlcjpiZy16aW5jLTcwMCB0ZXh0LXppbmMtMzAwIGhvdmVyOnRleHQtd2hpdGUgdGV4dC1bMTBweF0gZm9udC1ib2xkIGN1cnNvci1wb2ludGVyIHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgPlxuICAgICAgICAgIFRlc3RcbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgLy8gRnVsbCBFeHBhbmRlZCBNb25pdG9yIE1vZGVcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdW5kZWQtM3hsIGJnLXppbmMtOTUwLzk1IGJvcmRlci0yIGJvcmRlci1yb3NlLTUwMC8zMCBwLTUgc206cC02IHNoYWRvdy0yeGwgc3BhY2UteS02IHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlbiBiYWNrZHJvcC1ibHVyLXhsXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0wIHJpZ2h0LTAgdy04MCBoLTgwIGJnLXJvc2UtNTAwLzEwIHJvdW5kZWQtZnVsbCBibHVyLTN4bCBwb2ludGVyLWV2ZW50cy1ub25lXCIgLz5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLTAgbGVmdC0wIHctNzIgaC03MiBiZy1pbmRpZ28tNTAwLzEwIHJvdW5kZWQtZnVsbCBibHVyLTN4bCBwb2ludGVyLWV2ZW50cy1ub25lXCIgLz5cblxuICAgICAgey8qIEhlYWRlciBSb3cgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgc206aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNCBib3JkZXItYiBib3JkZXItemluYy04MDAvODAgcGItNCByZWxhdGl2ZSB6LTEwXCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBtYi0xLjVcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIuNSBweS0wLjUgcm91bmRlZC1mdWxsIGJnLXJvc2UtNTAwLzIwIGJvcmRlciBib3JkZXItcm9zZS00MDAvNDAgdGV4dC1yb3NlLTMwMCB0ZXh0LVsxMXB4XSBmb250LW1vbm8gZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgPFJhZGlvIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtcm9zZS00MDAgYW5pbWF0ZS1wdWxzZVwiIC8+XG4gICAgICAgICAgICAgIFNZU1RFTSBBQ09VU1RJQyBBTEVSVCAoV0VCIEFVRElPIEFQSSlcbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IHJvdW5kZWQtZnVsbCBiZy16aW5jLTgwMCB0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC16aW5jLTQwMFwiPlxuICAgICAgICAgICAgICBMT1ctRlJFUVVFTkNZIFNVQi1CQVNTXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkIHRleHQtd2hpdGUgdHJhY2tpbmctdGlnaHQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIuNVwiPlxuICAgICAgICAgICAgPHNwYW4+Tmlza29jesSZc3RvdGxpd2/Fm2Npb3d5IETFundpxJlrb3d5IEFsZXJ0IEhhcHR5Y3pueTwvc3Bhbj5cbiAgICAgICAgICAgIHtpc1BsYXlpbmcgPyAoXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIuNSBweS0wLjUgcm91bmRlZC1mdWxsIGJnLXJvc2UtOTUwIGJvcmRlciBib3JkZXItcm9zZS01MDAvNjAgdGV4dC1yb3NlLTMwMCB0ZXh0LXhzIGZvbnQtbW9ubyBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgYW5pbWF0ZS1wdWxzZVwiPlxuICAgICAgICAgICAgICAgIDxXYXZlcyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXJvc2UtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICBFTUlTSkEgRkFMSSA1OCBIelxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICA8L2gzPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC16aW5jLTQwMCBtdC0xIG1heC13LTJ4bCBsZWFkaW5nLXJlbGF4ZWRcIj5cbiAgICAgICAgICAgIEVtaXR1amUgbmllaW53YXp5am55LCBjaWVwxYJ5IHRvbiBuaXNraWVqIGN6xJlzdG90bGl3b8WbY2kgKHN1Yi1iYXNzIDUw4oCTNzUgSHogeiBmaWx0cmVtIGRvbG5vcHJ6ZXB1c3Rvd3ltIDE4MCBIeikgdyBtb21lbmNpZSB3eWtyeWNpYSBzdGFydHUgesWCb8WbbGl3ZWdvIHByb2Nlc3UgcHJ6ZXogQ3p1am5payBHbmlkIChHbmlkYSBTZW5zb3IpLiBaYXBld25pYSBuYXR5Y2htaWFzdG93xIUgaW5mb3JtYWNqxJkgendyb3RuxIUgYmV6IHBpc2vDs3cgaSB6bcSZY3plbmlhIHPFgnVjaHUuXG4gICAgICAgICAgPC9wPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogTWFzdGVyIFBvd2VyIFRvZ2dsZSBCdXR0b24gKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgc2VsZi1zdHJldGNoIHNtOnNlbGYtYXV0byBzaHJpbmstMFwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVRvZ2dsZUVuYWJsZX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXgtMSBzbTpmbGV4LW5vbmUgcHgtNCBweS0yLjUgcm91bmRlZC0yeGwgZm9udC1tb25vIHRleHQteHMgZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0yIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyIGJvcmRlciBzaGFkb3ctbGcgJHtcbiAgICAgICAgICAgICAgc2V0dGluZ3MuZW5hYmxlZFxuICAgICAgICAgICAgICAgID8gJ2JnLWdyYWRpZW50LXRvLXIgZnJvbS1yb3NlLTk1MC84MCB0by16aW5jLTkwMCBib3JkZXItcm9zZS01MDAvNTAgdGV4dC1yb3NlLTIwMCBob3ZlcjpiZy1yb3NlLTkwMC82MCdcbiAgICAgICAgICAgICAgICA6ICdiZy16aW5jLTkwMCBib3JkZXItemluYy04MDAgdGV4dC16aW5jLTQwMCBob3Zlcjp0ZXh0LXdoaXRlJ1xuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge3NldHRpbmdzLmVuYWJsZWQgPyAoXG4gICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgPFZvbHVtZTIgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXJvc2UtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5BbGVydCBBa3VzdHljem55OiBXxYHEhENaT05ZPC9zcGFuPlxuICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgPFZvbHVtZVggY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXppbmMtNTAwXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5BbGVydCBBa3VzdHljem55OiBXWUNJU1pPTlk8L3NwYW4+XG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIFZpc3VhbGl6ZXIgYW5kIExpdmUgV2F2ZWZvcm0gQ2FudmFzICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIGxnOmdyaWQtY29scy0xMiBnYXAtNiBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgey8qIENhbnZhcyBPc2NpbGxvc2NvcGUgKDcgQ29scykgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tNyBiZy1ibGFjay84MCByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXppbmMtODAwIHAtNCBzcGFjZS15LTMgcmVsYXRpdmUgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC14cyBmb250LW1vbm8gdGV4dC16aW5jLTQwMFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB0ZXh0LXppbmMtMzAwIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICA8QWN0aXZpdHkgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1yb3NlLTQwMFwiIC8+XG4gICAgICAgICAgICAgIE9zY3lsb3Nrb3AgRmFsaSBTdWItQmFzb3dlaiBXZWIgQXVkaW8gQVBJXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXppbmMtNDAwXCI+XG4gICAgICAgICAgICAgIFBhc21vOiA0MuKAkzc1IEh6IHwgRmlsdHI6IHtzZXR0aW5ncy5sb3dQYXNzQ3V0b2ZmSHp9IEh6XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImgtMjggdy1mdWxsIGJnLXppbmMtOTUwLzgwIHJvdW5kZWQteGwgb3ZlcmZsb3ctaGlkZGVuIGJvcmRlciBib3JkZXItemluYy05MDAgcmVsYXRpdmVcIj5cbiAgICAgICAgICAgIDxjYW52YXNcbiAgICAgICAgICAgICAgcmVmPXtjYW52YXNSZWZ9XG4gICAgICAgICAgICAgIHdpZHRoPXs2MDB9XG4gICAgICAgICAgICAgIGhlaWdodD17MTEyfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1mdWxsIGJsb2NrXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICB7aXNQbGF5aW5nICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMiByaWdodC0zIHB4LTIgcHktMC41IHJvdW5kZWQgYmctcm9zZS01MDAvMjAgYm9yZGVyIGJvcmRlci1yb3NlLTQwMC80MCB0ZXh0LXJvc2UtMzAwIGZvbnQtbW9ubyB0ZXh0LVsxMHB4XSBmb250LWJvbGQgYW5pbWF0ZS1wdWxzZVwiPlxuICAgICAgICAgICAgICAgIElNUFVMUyBIQVBUWUNaTlkgQUtUWVdOWVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTIgcHQtMSB0ZXh0LVsxMXB4XSBmb250LW1vbm8gdGV4dC16aW5jLTQwMFwiPlxuICAgICAgICAgICAgPHNwYW4+SGFybW9uaWN6bmU6IFBhcnp5c3RlIChDaWVwxYJlKTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuPkF0YWs6IDE1IG1zIChCZXogdHJ6YXNrw7N3KTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuPlphbmlrYW5pZTogMzgwIG1zIChFeHBvbmVudGlhbCk8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBRdWljayBBY3Rpb24gVHJpZ2dlcnMgKDUgQ29scykgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tNSBzcGFjZS15LTNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLTJ4bCBiZy16aW5jLTkwMC84MCBib3JkZXIgYm9yZGVyLXppbmMtODAwIHNwYWNlLXktM1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbW9ubyBmb250LWJvbGQgdGV4dC16aW5jLTIwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgPFNwYXJrbGVzIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1hbWJlci00MDBcIiAvPlxuICAgICAgICAgICAgICBUZXN0IEF1ZHl0eXdueSAmIFN5bXVsYWNqYSBEZXRla2NqaVxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgIHsvKiBUZXN0IEF1ZGlvIEJ1dHRvbiAqL31cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVRlc3RBbGVydH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHktMi41IHB4LTQgcm91bmRlZC14bCBiZy16aW5jLTgwMCBob3ZlcjpiZy16aW5jLTcwMCB0ZXh0LXppbmMtMTAwIGZvbnQtbW9ubyB0ZXh0LXhzIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiBib3JkZXIgYm9yZGVyLXppbmMtNzAwIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyIHNoYWRvdyBhY3RpdmU6c2NhbGUtWzAuOThdXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxQbGF5IGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtcm9zZS00MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPlByemV0ZXN0dWogVG9uIEhhcHR5Y3pueSAofjU4IEh6KTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgey8qIFNpbXVsYXRlIEhpZ2ggVGhyZWF0IFByb2Nlc3MgTGF1bmNoICovfVxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlU2ltdWxhdGVIaWdoVGhyZWF0fVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweS0yLjUgcHgtNCByb3VuZGVkLXhsIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1yb3NlLTkwMC84MCB0by1yb3NlLTk1MCBib3JkZXIgYm9yZGVyLXJvc2UtNTAwLzQwIGhvdmVyOmJvcmRlci1yb3NlLTQwMCB0ZXh0LXJvc2UtMjAwIGZvbnQtbW9ubyB0ZXh0LXhzIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBzaGFkb3ctbWQgYWN0aXZlOnNjYWxlLVswLjk4XVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8U2hpZWxkQWxlcnQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1yb3NlLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+U3ltdWx1aiBTdGFydCBBZ3Jlc29yYSAoQ3p1am5payBHbmlkKTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAge3Rlc3ROb3RpY2UgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMi41IHJvdW5kZWQteGwgYmctcm9zZS01MDAvMjAgYm9yZGVyIGJvcmRlci1yb3NlLTUwMC80MCB0ZXh0LXJvc2UtMjAwIHRleHQteHMgZm9udC1tb25vIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGFuaW1hdGUtaW4gZmFkZS1pbiBkdXJhdGlvbi0yMDBcIj5cbiAgICAgICAgICAgICAgICA8Q2hlY2sgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXJvc2UtNDAwIHNocmluay0wXCIgLz5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0cnVuY2F0ZVwiPnt0ZXN0Tm90aWNlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogUHJvZmlsZXMgJiBBdWRpbyBQYXJhbWV0ZXJzIFR1bmluZyAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMTIgZ2FwLTYgcHQtMVwiPlxuICAgICAgICB7LyogUHJvZmlsZSBTZWxlY3RvciAoNyBDb2xzKSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZDpjb2wtc3Bhbi03IHNwYWNlLXktM1wiPlxuICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LXppbmMtNDAwIGZvbnQtYm9sZCBibG9ja1wiPlxuICAgICAgICAgICAgV3liw7NyIFByb2ZpbHUgQWt1c3R5Y3puZWdvIChCYXJ3YSAmIENoYXJha3RlcnlzdHlrYSk6XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTMgZ2FwLTIuNVwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVQcm9maWxlU2VsZWN0KCdIQVBUSUNfU1VCX1BVTFNFJyl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHAtMyByb3VuZGVkLTJ4bCBib3JkZXIgdGV4dC1sZWZ0IGZvbnQtbW9ubyB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciAke1xuICAgICAgICAgICAgICAgIHNldHRpbmdzLnByb2ZpbGUgPT09ICdIQVBUSUNfU1VCX1BVTFNFJ1xuICAgICAgICAgICAgICAgICAgPyAnYmctcm9zZS05NTAvNzAgYm9yZGVyLXJvc2UtNTAwLzYwIHRleHQtd2hpdGUgc2hhZG93LWxnIHNoYWRvdy1yb3NlLTk1MC80MCdcbiAgICAgICAgICAgICAgICAgIDogJ2JnLXppbmMtOTAwLzYwIGJvcmRlci16aW5jLTgwMCB0ZXh0LXppbmMtNDAwIGhvdmVyOnRleHQtemluYy0yMDAnXG4gICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtcm9zZS0zMDBcIj7wn5OzIFN1Yi1IYXB0aWMgUHVsc2U8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXppbmMtNDAwIG10LTFcIj41OCAmcmFycjsgNDIgSHogKEfFgsSZYm9raWUgdMSFcG5pxJljaWUgaGFwdHljem5lKTwvZGl2PlxuICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlUHJvZmlsZVNlbGVjdCgnTE9XX1JFU09OQU5UX0NISU1FJyl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHAtMyByb3VuZGVkLTJ4bCBib3JkZXIgdGV4dC1sZWZ0IGZvbnQtbW9ubyB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciAke1xuICAgICAgICAgICAgICAgIHNldHRpbmdzLnByb2ZpbGUgPT09ICdMT1dfUkVTT05BTlRfQ0hJTUUnXG4gICAgICAgICAgICAgICAgICA/ICdiZy1pbmRpZ28tOTUwLzcwIGJvcmRlci1pbmRpZ28tNTAwLzYwIHRleHQtd2hpdGUgc2hhZG93LWxnIHNoYWRvdy1pbmRpZ28tOTUwLzQwJ1xuICAgICAgICAgICAgICAgICAgOiAnYmctemluYy05MDAvNjAgYm9yZGVyLXppbmMtODAwIHRleHQtemluYy00MDAgaG92ZXI6dGV4dC16aW5jLTIwMCdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC1pbmRpZ28tMzAwXCI+8J+UlCBSZXNvbmFudCBDaGltZTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtemluYy00MDAgbXQtMVwiPjczLjQgSHogKyAxNDYgSHogKEFrc2FtaXRueSBkendvbmVrIG9zdHJ6ZWdhd2N6eSk8L2Rpdj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVByb2ZpbGVTZWxlY3QoJ1NVQl9UQUNUSUxFX0hFQVJUQkVBVCcpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BwLTMgcm91bmRlZC0yeGwgYm9yZGVyIHRleHQtbGVmdCBmb250LW1vbm8gdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy5wcm9maWxlID09PSAnU1VCX1RBQ1RJTEVfSEVBUlRCRUFUJ1xuICAgICAgICAgICAgICAgICAgPyAnYmctY3lhbi05NTAvNzAgYm9yZGVyLWN5YW4tNTAwLzYwIHRleHQtd2hpdGUgc2hhZG93LWxnIHNoYWRvdy1jeWFuLTk1MC80MCdcbiAgICAgICAgICAgICAgICAgIDogJ2JnLXppbmMtOTAwLzYwIGJvcmRlci16aW5jLTgwMCB0ZXh0LXppbmMtNDAwIGhvdmVyOnRleHQtemluYy0yMDAnXG4gICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtY3lhbi0zMDBcIj7wn5KTIFRhY3RpbGUgSGVhcnRiZWF0PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC16aW5jLTQwMCBtdC0xXCI+NTIgSHogKFBvZHfDs2puZSB1ZGVyemVuaWUgc3ViLXB1bHN1KTwvZGl2PlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBWb2x1bWUgJiBGaWx0ZXIgQ29udHJvbHMgKDUgQ29scykgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWQ6Y29sLXNwYW4tNSBzcGFjZS15LTNcIj5cbiAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1vbm8gdGV4dC16aW5jLTQwMCBmb250LWJvbGQgYmxvY2tcIj5cbiAgICAgICAgICAgIFBvemlvbSBHxYJvxZtub8WbY2kgJiBGaWx0ciBEb2xub3ByemVwdXN0b3d5OlxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMuNSByb3VuZGVkLTJ4bCBiZy16aW5jLTkwMC84MCBib3JkZXIgYm9yZGVyLXppbmMtODAwIHNwYWNlLXktM1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiB0ZXh0LXhzIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtemluYy00MDBcIj5HxYJvxZtub8WbxIcgVG9udTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1yb3NlLTMwMCBmb250LWJvbGRcIj57TWF0aC5yb3VuZChzZXR0aW5ncy52b2x1bWUgKiAxMDApfSU8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB0eXBlPVwicmFuZ2VcIlxuICAgICAgICAgICAgICAgIG1pbj1cIjAuMDVcIlxuICAgICAgICAgICAgICAgIG1heD1cIjAuOFwiXG4gICAgICAgICAgICAgICAgc3RlcD1cIjAuMDVcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXtzZXR0aW5ncy52b2x1bWV9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZVZvbHVtZUNoYW5nZX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYWNjZW50LXJvc2UtNTAwIGgtMiBiZy16aW5jLTgwMCByb3VuZGVkLWxnIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LVsxMXB4XSBmb250LW1vbm8gdGV4dC16aW5jLTQwMCBwdC0xIGJvcmRlci10IGJvcmRlci16aW5jLTgwMC84MFwiPlxuICAgICAgICAgICAgICA8c3Bhbj5XaWJyYWNqZSBkb3R5a293ZTo8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC00MDAgZm9udC1ib2xkXCI+TmF2aWdhdG9yLnZpYnJhdGUg4pyTPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBSZWNlbnQgQWNvdXN0aWMgQWxlcnRzIEZlZWQgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMiBwdC0yIGJvcmRlci10IGJvcmRlci16aW5jLTgwMC84MFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LXppbmMtNDAwXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtemluYy0zMDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgPEluZm8gY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1yb3NlLTQwMFwiIC8+XG4gICAgICAgICAgICBPc3RhdG5pZSBExbp3acSZa293ZSBSZWFrY2plIG5hIFd5a3J5Y2llIEFncmVzb3JhICh7cmVjZW50QWxlcnRzLmxlbmd0aH0pOlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXppbmMtNDAwXCI+XG4gICAgICAgICAgICBEemlhxYJhIHcgdGxlIHogQ3p1am5pa2llbSBHbmlkICgwIG1zKVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAge3JlY2VudEFsZXJ0cy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMuNSByb3VuZGVkLTJ4bCBiZy16aW5jLTkwMC80MCBib3JkZXIgYm9yZGVyLWRhc2hlZCBib3JkZXItemluYy04MDAgdGV4dC1jZW50ZXIgdGV4dC14cyBmb250LW1vbm8gdGV4dC16aW5jLTQwMFwiPlxuICAgICAgICAgICAgQnJhayB6YXJlamVzdHJvd2FueWNoIGVtaXNqaSBhbGVydHUgYWt1c3R5Y3puZWdvLiBLbGlrbmlqICZxdW90O1N5bXVsdWogU3RhcnQgQWdyZXNvcmEmcXVvdDssIGFieSBwcnpldGVzdG93YcSHIHJlYWtjasSZLlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjUgbWF4LWgtMzYgb3ZlcmZsb3cteS1hdXRvIHByLTFcIj5cbiAgICAgICAgICAgIHtyZWNlbnRBbGVydHMuc2xpY2UoMCwgNSkubWFwKChhbGVydCkgPT4gKFxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAga2V5PXthbGVydC5pZH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTIuNSByb3VuZGVkLXhsIGJnLXppbmMtOTAwLzgwIGJvcmRlciBib3JkZXItemluYy04MDAvODAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQteHMgZm9udC1tb25vXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctMiBoLTIgcm91bmRlZC1mdWxsIGJnLXJvc2UtNDAwIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC16aW5jLTIwMCBmb250LWJvbGRcIj57YWxlcnQudGhyZWF0TmFtZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICB7YWxlcnQucGlkICYmIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtemluYy00MDBcIj5QSUQ6IHthbGVydC5waWR9PC9zcGFuPn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXppbmMtNDAwXCI+e2FsZXJ0LmZ1bmRhbWVudGFsRnJlcUh6fSBIejwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtemluYy00MDBcIj57YWxlcnQudGltZXN0YW1wfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdLCJtYXBwaW5ncyI6IkFBMks4QixTQThEaEIsVUE5RGdCO0FBM0s5QixTQUFnQixVQUFVLFdBQVcsY0FBYztBQUNuRDtBQUFBLEVBQ0U7QUFBQSxFQUFTO0FBQUEsRUFBUztBQUFBLEVBQU87QUFBQSxFQUFVO0FBQUEsRUFDMUI7QUFBQSxFQUFVO0FBQUEsRUFBYTtBQUFBLEVBQU87QUFBQSxFQUFNO0FBQUEsT0FDeEM7QUFDUDtBQUFBLEVBQ0U7QUFBQSxPQUlLO0FBQ1AsU0FBUyxtQkFBMEM7QUFPNUMsYUFBTSx1QkFBNEQsQ0FBQztBQUFBLEVBQ3hFLFVBQVU7QUFBQSxFQUNWO0FBQ0YsTUFBTTtBQUNKLFFBQU0sQ0FBQyxVQUFVLFdBQVcsSUFBSSxTQUFnQyxNQUFNLG9CQUFvQixZQUFZLENBQUM7QUFDdkcsUUFBTSxDQUFDLGNBQWMsZUFBZSxJQUFJLFNBQStCLE1BQU0sb0JBQW9CLGdCQUFnQixDQUFDO0FBQ2xILFFBQU0sQ0FBQyxXQUFXLFlBQVksSUFBSSxTQUFrQixNQUFNLG9CQUFvQixVQUFVLENBQUM7QUFDekYsUUFBTSxDQUFDLGNBQWMsZUFBZSxJQUFJLFNB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