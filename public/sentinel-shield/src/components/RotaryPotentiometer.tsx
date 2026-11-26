import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"]; const useRef = __vite__cjsImport1_react["useRef"]; const useEffect = __vite__cjsImport1_react["useEffect"]; const useCallback = __vite__cjsImport1_react["useCallback"]; const useId = __vite__cjsImport1_react["useId"];
import { ChevronUp, ChevronDown, RotateCcw } from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
export const RotaryPotentiometer = ({
  label,
  unit,
  min,
  max,
  step = 0.1,
  value,
  onChange,
  accentColor = "amber",
  description,
  decimals = 1,
  defaultValue
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const knobRef = useRef(null);
  const dragStartY = useRef(0);
  const dragStartX = useRef(0);
  const startVal = useRef(value);
  const gradientId = useId();
  const normalized = Math.min(Math.max((value - min) / (max - min), 0), 1);
  const targetAngle = -135 + normalized * 270;
  const [animatedAngle, setAnimatedAngle] = useState(targetAngle);
  const angleRef = useRef(targetAngle);
  const animFrameRef = useRef(null);
  const lastSoundTickAngle = useRef(targetAngle);
  const playTickSound = useCallback((speedFactor = 1) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      const baseFreq = 2200 + Math.min(speedFactor * 300, 1e3);
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.012);
      const vol = Math.min(0.04 + speedFactor * 0.02, 0.08);
      gain.gain.setValueAtTime(vol, now);
      gain.gain.exponentialRampToValueAtTime(1e-3, now + 0.015);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.016);
    } catch {
    }
  }, []);
  useEffect(() => {
    const updatePhysics = () => {
      const diff = targetAngle - angleRef.current;
      if (Math.abs(diff) > 0.05) {
        const lerpRate = isDragging ? 0.38 : 0.18;
        angleRef.current += diff * lerpRate;
        setAnimatedAngle(angleRef.current);
        if (Math.abs(angleRef.current - lastSoundTickAngle.current) > 6.5) {
          playTickSound(Math.abs(diff) / 20);
          lastSoundTickAngle.current = angleRef.current;
        }
        animFrameRef.current = requestAnimationFrame(updatePhysics);
      } else {
        angleRef.current = targetAngle;
        setAnimatedAngle(targetAngle);
      }
    };
    animFrameRef.current = requestAnimationFrame(updatePhysics);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [targetAngle, isDragging, playTickSound]);
  const colorPalettes = {
    amber: {
      ring: "stroke-amber-400",
      glowFilter: "rgba(245, 158, 11, 0.5)",
      text: "text-amber-300",
      bgGlow: "rgba(245, 158, 11, 0.22)",
      indicator: "#f59e0b",
      indicatorGlow: "0 0 8px #fbbf24, 0 0 16px rgba(245, 158, 11, 0.7)",
      trackActive: "#f59e0b",
      dialBevel: "border-amber-500/20",
      jewelGlow: "bg-amber-400 shadow-[0_0_10px_#f59e0b]"
    },
    cyan: {
      ring: "stroke-cyan-400",
      glowFilter: "rgba(6, 182, 212, 0.5)",
      text: "text-cyan-300",
      bgGlow: "rgba(6, 182, 212, 0.22)",
      indicator: "#06b6d4",
      indicatorGlow: "0 0 8px #22d3ee, 0 0 16px rgba(6, 182, 212, 0.7)",
      trackActive: "#06b6d4",
      dialBevel: "border-cyan-500/20",
      jewelGlow: "bg-cyan-400 shadow-[0_0_10px_#06b6d4]"
    },
    emerald: {
      ring: "stroke-emerald-400",
      glowFilter: "rgba(16, 185, 129, 0.5)",
      text: "text-emerald-300",
      bgGlow: "rgba(16, 185, 129, 0.22)",
      indicator: "#10b981",
      indicatorGlow: "0 0 8px #34d399, 0 0 16px rgba(16, 185, 129, 0.7)",
      trackActive: "#10b981",
      dialBevel: "border-emerald-500/20",
      jewelGlow: "bg-emerald-400 shadow-[0_0_10px_#10b981]"
    },
    rose: {
      ring: "stroke-rose-400",
      glowFilter: "rgba(244, 63, 94, 0.5)",
      text: "text-rose-300",
      bgGlow: "rgba(244, 63, 94, 0.22)",
      indicator: "#f43f5e",
      indicatorGlow: "0 0 8px #fb7185, 0 0 16px rgba(244, 63, 94, 0.7)",
      trackActive: "#f43f5e",
      dialBevel: "border-rose-500/20",
      jewelGlow: "bg-rose-400 shadow-[0_0_10px_#f43f5e]"
    },
    indigo: {
      ring: "stroke-indigo-400",
      glowFilter: "rgba(99, 102, 241, 0.5)",
      text: "text-indigo-300",
      bgGlow: "rgba(99, 102, 241, 0.22)",
      indicator: "#6366f1",
      indicatorGlow: "0 0 8px #818cf8, 0 0 16px rgba(99, 102, 241, 0.7)",
      trackActive: "#6366f1",
      dialBevel: "border-indigo-500/20",
      jewelGlow: "bg-indigo-400 shadow-[0_0_10px_#6366f1]"
    }
  }[accentColor];
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartY.current = e.clientY;
    dragStartX.current = e.clientX;
    startVal.current = value;
  };
  const handleTouchStart = (e) => {
    setIsDragging(true);
    dragStartY.current = e.touches[0].clientY;
    dragStartX.current = e.touches[0].clientX;
    startVal.current = value;
  };
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? step : -step;
    const fineStep = e.shiftKey ? step * 0.1 : step;
    const actualDelta = e.deltaY < 0 ? fineStep : -fineStep;
    const newVal = Math.min(Math.max(value + actualDelta, min), max);
    const stepped = Math.round(newVal / (e.shiftKey ? step * 0.1 : step)) * (e.shiftKey ? step * 0.1 : step);
    if (stepped !== value) {
      onChange(Number(stepped.toFixed(decimals + (e.shiftKey ? 1 : 0))));
      playTickSound(0.8);
    }
  };
  const nudge = (direction) => {
    const delta = direction === "up" ? step : -step;
    const newVal = Math.min(Math.max(value + delta, min), max);
    const stepped = Math.round(newVal / step) * step;
    if (stepped !== value) {
      onChange(Number(stepped.toFixed(decimals)));
      playTickSound(1.2);
    }
  };
  const resetToDefault = (e) => {
    e.stopPropagation();
    if (defaultValue !== void 0) {
      onChange(defaultValue);
      playTickSound(1.5);
    }
  };
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const deltaY = dragStartY.current - e.clientY;
      const deltaX = e.clientX - dragStartX.current;
      const combinedDelta = deltaY + deltaX * 0.4;
      const range = max - min;
      const sensitivity = e.shiftKey ? 600 : 200;
      const deltaVal = combinedDelta / sensitivity * range;
      let newVal = startVal.current + deltaVal;
      newVal = Math.min(Math.max(newVal, min), max);
      const currentStep = e.shiftKey ? step * 0.2 : step;
      const stepped = Math.round(newVal / currentStep) * currentStep;
      if (stepped !== value) {
        onChange(Number(stepped.toFixed(decimals)));
      }
    };
    const handleTouchMove = (e) => {
      if (!isDragging) return;
      const deltaY = dragStartY.current - e.touches[0].clientY;
      const deltaX = e.touches[0].clientX - dragStartX.current;
      const combinedDelta = deltaY + deltaX * 0.4;
      const range = max - min;
      const sensitivity = 220;
      const deltaVal = combinedDelta / sensitivity * range;
      let newVal = startVal.current + deltaVal;
      newVal = Math.min(Math.max(newVal, min), max);
      const stepped = Math.round(newVal / step) * step;
      if (stepped !== value) {
        onChange(Number(stepped.toFixed(decimals)));
      }
    };
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, max, min, step, decimals, value, onChange]);
  const radius = 31;
  const totalLength = 2 * Math.PI * radius * (270 / 360);
  const animatedNormalized = Math.min(Math.max((animatedAngle + 135) / 270, 0), 1);
  const strokeDashoffset = totalLength - animatedNormalized * totalLength;
  const tickMarks = Array.from({ length: 11 }, (_, i) => {
    const tickNormalized = i / 10;
    const tickAngle = -135 + tickNormalized * 270;
    const isPassed = animatedNormalized >= tickNormalized - 0.01;
    const isMajor = i % 5 === 0;
    return {
      index: i,
      angle: tickAngle,
      isPassed,
      isMajor
    };
  });
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      onWheel: handleWheel,
      className: `relative flex flex-col items-center p-3.5 rounded-2xl bg-gradient-to-b from-zinc-900/90 via-zinc-950/95 to-black border transition-all duration-300 group select-none ${isDragging ? "border-white/30 shadow-[0_0_25px_rgba(0,0,0,0.8)] scale-[1.02]" : isHovered ? "border-white/20 shadow-xl shadow-black/60" : "border-white/5 shadow-lg shadow-black/40"}`,
      children: [
        /* @__PURE__ */ jsxDEV(
          "div",
          {
            className: "absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100",
            style: {
              background: `radial-gradient(circle at 50% 45%, ${colorPalettes.bgGlow} 0%, transparent 70%)`
            }
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
            lineNumber: 303,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ jsxDEV("div", { className: "relative z-10 w-full flex items-center justify-between gap-1 mb-1.5 px-0.5", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] font-mono font-bold text-slate-200 uppercase tracking-wider truncate flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "w-1.5 h-1.5 rounded-full", style: { backgroundColor: colorPalettes.indicator } }, void 0, false, {
              fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
              lineNumber: 313,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "truncate", children: label }, void 0, false, {
              fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
              lineNumber: 314,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
            lineNumber: 312,
            columnNumber: 9
          }, this),
          defaultValue !== void 0 && value !== defaultValue && /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: resetToDefault,
              className: "text-[9px] font-mono text-slate-400 hover:text-amber-300 p-0.5 rounded transition-colors opacity-0 group-hover:opacity-100 cursor-pointer",
              title: `Przywróć wartość fabryczną: ${defaultValue} ${unit}`,
              children: /* @__PURE__ */ jsxDEV(RotateCcw, { className: "w-2.5 h-2.5" }, void 0, false, {
                fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
                lineNumber: 323,
                columnNumber: 13
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
              lineNumber: 318,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
          lineNumber: 311,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV(
          "div",
          {
            ref: knobRef,
            onMouseDown: handleMouseDown,
            onTouchStart: handleTouchStart,
            className: `relative w-28 h-28 flex items-center justify-center cursor-ns-resize transition-transform select-none ${isDragging ? "scale-105" : "active:scale-98"}`,
            title: `Przeciągnij w pionie lub użyj rolki myszy (Hold Shift = mikro-strojenie) • ${min} - ${max} ${unit}`,
            children: [
              /* @__PURE__ */ jsxDEV("svg", { className: "w-28 h-28 -rotate-90 pointer-events-none drop-shadow-md", viewBox: "0 0 80 80", children: [
                /* @__PURE__ */ jsxDEV("defs", { children: [
                  /* @__PURE__ */ jsxDEV("linearGradient", { id: `${gradientId}-active`, x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
                    /* @__PURE__ */ jsxDEV("stop", { offset: "0%", stopColor: "#ffffff", stopOpacity: "0.9" }, void 0, false, {
                      fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
                      lineNumber: 342,
                      columnNumber: 15
                    }, this),
                    /* @__PURE__ */ jsxDEV("stop", { offset: "50%", stopColor: colorPalettes.trackActive, stopOpacity: "1" }, void 0, false, {
                      fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
                      lineNumber: 343,
                      columnNumber: 15
                    }, this),
                    /* @__PURE__ */ jsxDEV("stop", { offset: "100%", stopColor: colorPalettes.trackActive, stopOpacity: "0.75" }, void 0, false, {
                      fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
                      lineNumber: 344,
                      columnNumber: 15
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
                    lineNumber: 341,
                    columnNumber: 13
                  }, this),
                  /* @__PURE__ */ jsxDEV("filter", { id: `${gradientId}-glow`, x: "-20%", y: "-20%", width: "140%", height: "140%", children: /* @__PURE__ */ jsxDEV("feDropShadow", { dx: "0", dy: "0", stdDeviation: "1.5", floodColor: colorPalettes.glowFilter }, void 0, false, {
                    fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
                    lineNumber: 347,
                    columnNumber: 15
                  }, this) }, void 0, false, {
                    fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
                    lineNumber: 346,
                    columnNumber: 13
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
                  lineNumber: 340,
                  columnNumber: 11
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "circle",
                  {
                    cx: "40",
                    cy: "40",
                    r: radius,
                    fill: "transparent",
                    stroke: "rgba(255, 255, 255, 0.07)",
                    strokeWidth: "4",
                    strokeDasharray: `${totalLength} 1000`,
                    strokeDashoffset: "0",
                    strokeLinecap: "round",
                    transform: "rotate(135 40 40)"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
                    lineNumber: 352,
                    columnNumber: 11
                  },
                  this
                ),
                tickMarks.map((t) => {
                  const rad = (t.angle - 90) * Math.PI / 180;
                  const r1 = 36.5;
                  const r2 = t.isMajor ? 39 : 37.8;
                  const x1 = 40 + r1 * Math.cos(rad);
                  const y1 = 40 + r1 * Math.sin(rad);
                  const x2 = 40 + r2 * Math.cos(rad);
                  const y2 = 40 + r2 * Math.sin(rad);
                  return /* @__PURE__ */ jsxDEV(
                    "line",
                    {
                      x1,
                      y1,
                      x2,
                      y2,
                      stroke: t.isPassed ? colorPalettes.trackActive : "rgba(255,255,255,0.18)",
                      strokeWidth: t.isMajor ? 1.5 : 1,
                      strokeOpacity: t.isPassed ? 0.9 : 0.4,
                      className: "transition-colors duration-150"
                    },
                    t.index,
                    false,
                    {
                      fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
                      lineNumber: 375,
                      columnNumber: 15
                    },
                    this
                  );
                }),
                /* @__PURE__ */ jsxDEV(
                  "circle",
                  {
                    cx: "40",
                    cy: "40",
                    r: radius,
                    fill: "transparent",
                    stroke: `url(#${gradientId}-active)`,
                    strokeWidth: "4.5",
                    strokeDasharray: `${totalLength} 1000`,
                    strokeDashoffset,
                    strokeLinecap: "round",
                    filter: `url(#${gradientId}-glow)`,
                    transform: "rotate(135 40 40)"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
                    lineNumber: 390,
                    columnNumber: 11
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
                lineNumber: 339,
                columnNumber: 9
              }, this),
              /* @__PURE__ */ jsxDEV(
                "div",
                {
                  className: "absolute w-20 h-20 rounded-full bg-gradient-to-b from-zinc-800 via-zinc-900 to-black border border-white/20 flex items-center justify-center transition-shadow duration-300",
                  style: {
                    boxShadow: `
              inset 0 2px 3px rgba(255, 255, 255, 0.22),
              inset 0 -3px 8px rgba(0, 0, 0, 0.95),
              0 6px 14px rgba(0, 0, 0, 0.8),
              ${isDragging ? `0 0 16px ${colorPalettes.bgGlow}` : "0 0 0 rgba(0,0,0,0)"}
            `
                  },
                  children: [
                    /* @__PURE__ */ jsxDEV(
                      "div",
                      {
                        className: "absolute inset-1 rounded-full border border-dashed border-white/10 opacity-70 pointer-events-none",
                        style: {
                          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
                          backgroundSize: "4px 4px"
                        }
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
                        lineNumber: 418,
                        columnNumber: 11
                      },
                      this
                    ),
                    /* @__PURE__ */ jsxDEV(
                      "div",
                      {
                        className: "absolute inset-2 rounded-full border border-white/15 overflow-hidden flex items-center justify-center pointer-events-none",
                        style: {
                          background: "radial-gradient(circle at 40% 30%, #27272a 0%, #18181b 50%, #09090b 100%)",
                          boxShadow: "inset 0 2px 6px rgba(0,0,0,0.9), 0 1px 2px rgba(255,255,255,0.08)"
                        },
                        children: [
                          /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 rounded-full border border-white/5 opacity-40" }, void 0, false, {
                            fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
                            lineNumber: 435,
                            columnNumber: 13
                          }, this),
                          /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-1.5 rounded-full border border-white/5 opacity-30" }, void 0, false, {
                            fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
                            lineNumber: 436,
                            columnNumber: 13
                          }, this),
                          /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-3 rounded-full border border-white/5 opacity-20" }, void 0, false, {
                            fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
                            lineNumber: 437,
                            columnNumber: 13
                          }, this)
                        ]
                      },
                      void 0,
                      true,
                      {
                        fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
                        lineNumber: 427,
                        columnNumber: 11
                      },
                      this
                    ),
                    /* @__PURE__ */ jsxDEV(
                      "div",
                      {
                        className: "absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform",
                        style: {
                          transform: `rotate(${animatedAngle}deg)`,
                          transformOrigin: "50% 50%"
                        },
                        children: [
                          /* @__PURE__ */ jsxDEV("div", { className: "absolute top-2 w-1 h-7 flex flex-col items-center", children: [
                            /* @__PURE__ */ jsxDEV(
                              "div",
                              {
                                className: "w-2 h-2.5 rounded-full -mt-1 relative z-20",
                                style: {
                                  backgroundColor: colorPalettes.indicator,
                                  boxShadow: colorPalettes.indicatorGlow
                                },
                                children: /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0.5 rounded-full bg-white/90" }, void 0, false, {
                                  fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
                                  lineNumber: 459,
                                  columnNumber: 17
                                }, this)
                              },
                              void 0,
                              false,
                              {
                                fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
                                lineNumber: 451,
                                columnNumber: 15
                              },
                              this
                            ),
                            /* @__PURE__ */ jsxDEV(
                              "div",
                              {
                                className: "w-1 h-6 bg-gradient-to-b from-white via-slate-300 to-zinc-600 rounded-b shadow-sm relative z-10",
                                style: {
                                  boxShadow: "0 0 4px rgba(255,255,255,0.4)"
                                }
                              },
                              void 0,
                              false,
                              {
                                fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
                                lineNumber: 463,
                                columnNumber: 15
                              },
                              this
                            )
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
                            lineNumber: 449,
                            columnNumber: 13
                          }, this),
                          /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-3 w-1.5 h-2 bg-gradient-to-t from-zinc-700 to-zinc-900 rounded-full border border-white/10 opacity-75" }, void 0, false, {
                            fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
                            lineNumber: 472,
                            columnNumber: 13
                          }, this)
                        ]
                      },
                      void 0,
                      true,
                      {
                        fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
                        lineNumber: 441,
                        columnNumber: 11
                      },
                      this
                    ),
                    /* @__PURE__ */ jsxDEV(
                      "div",
                      {
                        className: "relative z-20 w-8 h-8 rounded-full bg-gradient-to-tr from-zinc-950 via-zinc-850 to-zinc-700 border border-white/20 flex items-center justify-center shadow-lg pointer-events-none",
                        style: {
                          boxShadow: "inset 0 1px 2px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.85), 0 3px 6px rgba(0,0,0,0.7)"
                        },
                        children: /* @__PURE__ */ jsxDEV("div", { className: `w-2.5 h-2.5 rounded-full ${colorPalettes.jewelGlow} transition-all duration-300 flex items-center justify-center`, children: /* @__PURE__ */ jsxDEV("div", { className: "w-1 h-1 rounded-full bg-white/90 shadow-sm" }, void 0, false, {
                          fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
                          lineNumber: 484,
                          columnNumber: 15
                        }, this) }, void 0, false, {
                          fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
                          lineNumber: 483,
                          columnNumber: 13
                        }, this)
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
                        lineNumber: 476,
                        columnNumber: 11
                      },
                      this
                    ),
                    /* @__PURE__ */ jsxDEV(
                      "div",
                      {
                        className: "absolute inset-0 rounded-full pointer-events-none overflow-hidden",
                        style: {
                          background: `
                linear-gradient(
                  135deg, 
                  rgba(255, 255, 255, 0.32) 0%, 
                  rgba(255, 255, 255, 0.10) 35%, 
                  rgba(255, 255, 255, 0.00) 55%, 
                  rgba(255, 255, 255, 0.05) 100%
                )
              `,
                          boxShadow: "inset 0 1px 2px rgba(255,255,255,0.4), inset 0 -1px 3px rgba(0,0,0,0.4)"
                        },
                        children: [
                          /* @__PURE__ */ jsxDEV(
                            "div",
                            {
                              className: "absolute -top-1 left-2 right-2 h-7 rounded-[100%] bg-gradient-to-b from-white/35 via-white/10 to-transparent pointer-events-none opacity-85"
                            },
                            void 0,
                            false,
                            {
                              fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
                              lineNumber: 507,
                              columnNumber: 13
                            },
                            this
                          ),
                          /* @__PURE__ */ jsxDEV(
                            "div",
                            {
                              className: "absolute -bottom-1 left-4 right-4 h-4 rounded-[100%] bg-gradient-to-t from-white/10 to-transparent pointer-events-none opacity-40"
                            },
                            void 0,
                            false,
                            {
                              fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
                              lineNumber: 511,
                              columnNumber: 13
                            },
                            this
                          )
                        ]
                      },
                      void 0,
                      true,
                      {
                        fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
                        lineNumber: 491,
                        columnNumber: 11
                      },
                      this
                    )
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
                  lineNumber: 406,
                  columnNumber: 9
                },
                this
              ),
              isDragging && /* @__PURE__ */ jsxDEV(
                "div",
                {
                  className: "absolute inset-0 rounded-full pointer-events-none animate-pulse",
                  style: {
                    boxShadow: `0 0 24px ${colorPalettes.bgGlow}`
                  }
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
                  lineNumber: 520,
                  columnNumber: 11
                },
                this
              )
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
            lineNumber: 329,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ jsxDEV("div", { className: "relative z-10 w-full mt-2 flex items-center justify-between px-1", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              type: "button",
              onClick: () => nudge("down"),
              className: "p-1 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-slate-400 hover:text-white border border-white/5 transition-all opacity-40 group-hover:opacity-100 cursor-pointer active:scale-95",
              title: `Zmniejsz o ${step} ${unit}`,
              children: /* @__PURE__ */ jsxDEV(ChevronDown, { className: "w-3 h-3" }, void 0, false, {
                fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
                lineNumber: 538,
                columnNumber: 11
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
              lineNumber: 532,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("div", { className: "text-center font-mono", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-baseline justify-center gap-1", children: [
              /* @__PURE__ */ jsxDEV("span", { className: `text-base font-black tracking-tight ${colorPalettes.text}`, children: value.toFixed(decimals) }, void 0, false, {
                fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
                lineNumber: 544,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-bold text-slate-400 uppercase", children: unit }, void 0, false, {
                fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
                lineNumber: 547,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
              lineNumber: 543,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between gap-2 text-[8.5px] font-mono text-slate-500 mt-0.5", children: [
              /* @__PURE__ */ jsxDEV("span", { children: min }, void 0, false, {
                fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
                lineNumber: 554,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-600", children: "•" }, void 0, false, {
                fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
                lineNumber: 555,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: max }, void 0, false, {
                fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
                lineNumber: 556,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
              lineNumber: 553,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
            lineNumber: 542,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              type: "button",
              onClick: () => nudge("up"),
              className: "p-1 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-slate-400 hover:text-white border border-white/5 transition-all opacity-40 group-hover:opacity-100 cursor-pointer active:scale-95",
              title: `Zwiększ o ${step} ${unit}`,
              children: /* @__PURE__ */ jsxDEV(ChevronUp, { className: "w-3 h-3" }, void 0, false, {
                fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
                lineNumber: 567,
                columnNumber: 11
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
              lineNumber: 561,
              columnNumber: 9
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
          lineNumber: 530,
          columnNumber: 7
        }, this),
        description && /* @__PURE__ */ jsxDEV("div", { className: "relative z-10 mt-1.5 text-[9px] text-slate-400 text-center font-sans line-clamp-1 opacity-75 group-hover:opacity-100 transition-opacity", children: description }, void 0, false, {
          fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
          lineNumber: 573,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/applet/src/components/RotaryPotentiometer.tsx",
      lineNumber: 290,
      columnNumber: 5
    },
    this
  );
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJvdGFyeVBvdGVudGlvbWV0ZXIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlUmVmLCB1c2VFZmZlY3QsIHVzZUNhbGxiYWNrLCB1c2VJZCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IERpc2MsIENoZXZyb25VcCwgQ2hldnJvbkRvd24sIFJvdGF0ZUNjdyB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm90YXJ5UG90ZW50aW9tZXRlclByb3BzIHtcbiAgbGFiZWw6IHN0cmluZztcbiAgdW5pdDogc3RyaW5nO1xuICBtaW46IG51bWJlcjtcbiAgbWF4OiBudW1iZXI7XG4gIHN0ZXA/OiBudW1iZXI7XG4gIHZhbHVlOiBudW1iZXI7XG4gIG9uQ2hhbmdlOiAodmFsOiBudW1iZXIpID0+IHZvaWQ7XG4gIGFjY2VudENvbG9yPzogJ2FtYmVyJyB8ICdjeWFuJyB8ICdlbWVyYWxkJyB8ICdyb3NlJyB8ICdpbmRpZ28nO1xuICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgZGVjaW1hbHM/OiBudW1iZXI7XG4gIGRlZmF1bHRWYWx1ZT86IG51bWJlcjtcbn1cblxuZXhwb3J0IGNvbnN0IFJvdGFyeVBvdGVudGlvbWV0ZXI6IFJlYWN0LkZDPFJvdGFyeVBvdGVudGlvbWV0ZXJQcm9wcz4gPSAoe1xuICBsYWJlbCxcbiAgdW5pdCxcbiAgbWluLFxuICBtYXgsXG4gIHN0ZXAgPSAwLjEsXG4gIHZhbHVlLFxuICBvbkNoYW5nZSxcbiAgYWNjZW50Q29sb3IgPSAnYW1iZXInLFxuICBkZXNjcmlwdGlvbixcbiAgZGVjaW1hbHMgPSAxLFxuICBkZWZhdWx0VmFsdWVcbn0pID0+IHtcbiAgY29uc3QgW2lzRHJhZ2dpbmcsIHNldElzRHJhZ2dpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbaXNIb3ZlcmVkLCBzZXRJc0hvdmVyZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBrbm9iUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50PihudWxsKTtcbiAgY29uc3QgZHJhZ1N0YXJ0WSA9IHVzZVJlZjxudW1iZXI+KDApO1xuICBjb25zdCBkcmFnU3RhcnRYID0gdXNlUmVmPG51bWJlcj4oMCk7XG4gIGNvbnN0IHN0YXJ0VmFsID0gdXNlUmVmPG51bWJlcj4odmFsdWUpO1xuICBjb25zdCBncmFkaWVudElkID0gdXNlSWQoKTtcblxuICAvLyBJbnRlcm5hbCBhbmltYXRlZCBhbmdsZSBzdGF0ZSBmb3IgYnV0dGVyeSBzcHJpbmcvbGVycCBwaHlzaWNzXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBNYXRoLm1pbihNYXRoLm1heCgodmFsdWUgLSBtaW4pIC8gKG1heCAtIG1pbiksIDApLCAxKTtcbiAgY29uc3QgdGFyZ2V0QW5nbGUgPSAtMTM1ICsgbm9ybWFsaXplZCAqIDI3MDsgLy8gMjcwIGRlZ3JlZSBzd2VlcCAoLTEzNcKwIHRvICsxMzXCsClcblxuICBjb25zdCBbYW5pbWF0ZWRBbmdsZSwgc2V0QW5pbWF0ZWRBbmdsZV0gPSB1c2VTdGF0ZSh0YXJnZXRBbmdsZSk7XG4gIGNvbnN0IGFuZ2xlUmVmID0gdXNlUmVmKHRhcmdldEFuZ2xlKTtcbiAgY29uc3QgYW5pbUZyYW1lUmVmID0gdXNlUmVmPG51bWJlciB8IG51bGw+KG51bGwpO1xuICBjb25zdCBsYXN0U291bmRUaWNrQW5nbGUgPSB1c2VSZWY8bnVtYmVyPih0YXJnZXRBbmdsZSk7XG5cbiAgLy8gU3VidGxlIGFjb3VzdGljIGNsaWNrIHdoZW4gcmF0Y2hldGluZ1xuICBjb25zdCBwbGF5VGlja1NvdW5kID0gdXNlQ2FsbGJhY2soKHNwZWVkRmFjdG9yID0gMSkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBBdWRpb0N0eCA9IHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgKHdpbmRvdyBhcyB1bmtub3duIGFzIHsgd2Via2l0QXVkaW9Db250ZXh0OiB0eXBlb2YgQXVkaW9Db250ZXh0IH0pLndlYmtpdEF1ZGlvQ29udGV4dDtcbiAgICAgIGlmICghQXVkaW9DdHgpIHJldHVybjtcbiAgICAgIGNvbnN0IGN0eCA9IG5ldyBBdWRpb0N0eCgpO1xuICAgICAgY29uc3Qgbm93ID0gY3R4LmN1cnJlbnRUaW1lO1xuICAgICAgY29uc3Qgb3NjID0gY3R4LmNyZWF0ZU9zY2lsbGF0b3IoKTtcbiAgICAgIGNvbnN0IGdhaW4gPSBjdHguY3JlYXRlR2FpbigpO1xuICAgICAgXG4gICAgICBvc2MudHlwZSA9ICd0cmlhbmdsZSc7XG4gICAgICBjb25zdCBiYXNlRnJlcSA9IDIyMDAgKyBNYXRoLm1pbihzcGVlZEZhY3RvciAqIDMwMCwgMTAwMCk7XG4gICAgICBvc2MuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKGJhc2VGcmVxLCBub3cpO1xuICAgICAgb3NjLmZyZXF1ZW5jeS5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDYwMCwgbm93ICsgMC4wMTIpO1xuICAgICAgXG4gICAgICBjb25zdCB2b2wgPSBNYXRoLm1pbigwLjA0ICsgc3BlZWRGYWN0b3IgKiAwLjAyLCAwLjA4KTtcbiAgICAgIGdhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSh2b2wsIG5vdyk7XG4gICAgICBnYWluLmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgwLjAwMSwgbm93ICsgMC4wMTUpO1xuICAgICAgXG4gICAgICBvc2MuY29ubmVjdChnYWluKTtcbiAgICAgIGdhaW4uY29ubmVjdChjdHguZGVzdGluYXRpb24pO1xuICAgICAgb3NjLnN0YXJ0KG5vdyk7XG4gICAgICBvc2Muc3RvcChub3cgKyAwLjAxNik7XG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBBdWRpbyBmYWxsYmFja1xuICAgIH1cbiAgfSwgW10pO1xuXG4gIC8vIFNtb290aCBTcHJpbmcvTGVycCBQaHlzaWNzIGZvciB0aGUgTmVlZGxlXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgdXBkYXRlUGh5c2ljcyA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGRpZmYgPSB0YXJnZXRBbmdsZSAtIGFuZ2xlUmVmLmN1cnJlbnQ7XG4gICAgICBcbiAgICAgIGlmIChNYXRoLmFicyhkaWZmKSA+IDAuMDUpIHtcbiAgICAgICAgLy8gRmFzdCByZXNwb25zZSB3aGVuIGRyYWdnaW5nLCBnZW50bGUgZWxlZ2FudCBnbGlkZSB3aGVuIHNldHRpbmcgcHJvZ3JhbW1hdGljIHByZXNldHNcbiAgICAgICAgY29uc3QgbGVycFJhdGUgPSBpc0RyYWdnaW5nID8gMC4zOCA6IDAuMTg7XG4gICAgICAgIGFuZ2xlUmVmLmN1cnJlbnQgKz0gZGlmZiAqIGxlcnBSYXRlO1xuICAgICAgICBzZXRBbmltYXRlZEFuZ2xlKGFuZ2xlUmVmLmN1cnJlbnQpO1xuXG4gICAgICAgIC8vIE1pY3JvLXRpY2sgc291bmQgb24gYW5nbGUgdGhyZXNob2xkIGNyb3NzaW5nXG4gICAgICAgIGlmIChNYXRoLmFicyhhbmdsZVJlZi5jdXJyZW50IC0gbGFzdFNvdW5kVGlja0FuZ2xlLmN1cnJlbnQpID4gNi41KSB7XG4gICAgICAgICAgcGxheVRpY2tTb3VuZChNYXRoLmFicyhkaWZmKSAvIDIwKTtcbiAgICAgICAgICBsYXN0U291bmRUaWNrQW5nbGUuY3VycmVudCA9IGFuZ2xlUmVmLmN1cnJlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBhbmltRnJhbWVSZWYuY3VycmVudCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGVQaHlzaWNzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFuZ2xlUmVmLmN1cnJlbnQgPSB0YXJnZXRBbmdsZTtcbiAgICAgICAgc2V0QW5pbWF0ZWRBbmdsZSh0YXJnZXRBbmdsZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGFuaW1GcmFtZVJlZi5jdXJyZW50ID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZVBoeXNpY3MpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZiAoYW5pbUZyYW1lUmVmLmN1cnJlbnQpIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGFuaW1GcmFtZVJlZi5jdXJyZW50KTtcbiAgICB9O1xuICB9LCBbdGFyZ2V0QW5nbGUsIGlzRHJhZ2dpbmcsIHBsYXlUaWNrU291bmRdKTtcblxuICBjb25zdCBjb2xvclBhbGV0dGVzID0ge1xuICAgIGFtYmVyOiB7XG4gICAgICByaW5nOiAnc3Ryb2tlLWFtYmVyLTQwMCcsXG4gICAgICBnbG93RmlsdGVyOiAncmdiYSgyNDUsIDE1OCwgMTEsIDAuNSknLFxuICAgICAgdGV4dDogJ3RleHQtYW1iZXItMzAwJyxcbiAgICAgIGJnR2xvdzogJ3JnYmEoMjQ1LCAxNTgsIDExLCAwLjIyKScsXG4gICAgICBpbmRpY2F0b3I6ICcjZjU5ZTBiJyxcbiAgICAgIGluZGljYXRvckdsb3c6ICcwIDAgOHB4ICNmYmJmMjQsIDAgMCAxNnB4IHJnYmEoMjQ1LCAxNTgsIDExLCAwLjcpJyxcbiAgICAgIHRyYWNrQWN0aXZlOiAnI2Y1OWUwYicsXG4gICAgICBkaWFsQmV2ZWw6ICdib3JkZXItYW1iZXItNTAwLzIwJyxcbiAgICAgIGpld2VsR2xvdzogJ2JnLWFtYmVyLTQwMCBzaGFkb3ctWzBfMF8xMHB4XyNmNTllMGJdJ1xuICAgIH0sXG4gICAgY3lhbjoge1xuICAgICAgcmluZzogJ3N0cm9rZS1jeWFuLTQwMCcsXG4gICAgICBnbG93RmlsdGVyOiAncmdiYSg2LCAxODIsIDIxMiwgMC41KScsXG4gICAgICB0ZXh0OiAndGV4dC1jeWFuLTMwMCcsXG4gICAgICBiZ0dsb3c6ICdyZ2JhKDYsIDE4MiwgMjEyLCAwLjIyKScsXG4gICAgICBpbmRpY2F0b3I6ICcjMDZiNmQ0JyxcbiAgICAgIGluZGljYXRvckdsb3c6ICcwIDAgOHB4ICMyMmQzZWUsIDAgMCAxNnB4IHJnYmEoNiwgMTgyLCAyMTIsIDAuNyknLFxuICAgICAgdHJhY2tBY3RpdmU6ICcjMDZiNmQ0JyxcbiAgICAgIGRpYWxCZXZlbDogJ2JvcmRlci1jeWFuLTUwMC8yMCcsXG4gICAgICBqZXdlbEdsb3c6ICdiZy1jeWFuLTQwMCBzaGFkb3ctWzBfMF8xMHB4XyMwNmI2ZDRdJ1xuICAgIH0sXG4gICAgZW1lcmFsZDoge1xuICAgICAgcmluZzogJ3N0cm9rZS1lbWVyYWxkLTQwMCcsXG4gICAgICBnbG93RmlsdGVyOiAncmdiYSgxNiwgMTg1LCAxMjksIDAuNSknLFxuICAgICAgdGV4dDogJ3RleHQtZW1lcmFsZC0zMDAnLFxuICAgICAgYmdHbG93OiAncmdiYSgxNiwgMTg1LCAxMjksIDAuMjIpJyxcbiAgICAgIGluZGljYXRvcjogJyMxMGI5ODEnLFxuICAgICAgaW5kaWNhdG9yR2xvdzogJzAgMCA4cHggIzM0ZDM5OSwgMCAwIDE2cHggcmdiYSgxNiwgMTg1LCAxMjksIDAuNyknLFxuICAgICAgdHJhY2tBY3RpdmU6ICcjMTBiOTgxJyxcbiAgICAgIGRpYWxCZXZlbDogJ2JvcmRlci1lbWVyYWxkLTUwMC8yMCcsXG4gICAgICBqZXdlbEdsb3c6ICdiZy1lbWVyYWxkLTQwMCBzaGFkb3ctWzBfMF8xMHB4XyMxMGI5ODFdJ1xuICAgIH0sXG4gICAgcm9zZToge1xuICAgICAgcmluZzogJ3N0cm9rZS1yb3NlLTQwMCcsXG4gICAgICBnbG93RmlsdGVyOiAncmdiYSgyNDQsIDYzLCA5NCwgMC41KScsXG4gICAgICB0ZXh0OiAndGV4dC1yb3NlLTMwMCcsXG4gICAgICBiZ0dsb3c6ICdyZ2JhKDI0NCwgNjMsIDk0LCAwLjIyKScsXG4gICAgICBpbmRpY2F0b3I6ICcjZjQzZjVlJyxcbiAgICAgIGluZGljYXRvckdsb3c6ICcwIDAgOHB4ICNmYjcxODUsIDAgMCAxNnB4IHJnYmEoMjQ0LCA2MywgOTQsIDAuNyknLFxuICAgICAgdHJhY2tBY3RpdmU6ICcjZjQzZjVlJyxcbiAgICAgIGRpYWxCZXZlbDogJ2JvcmRlci1yb3NlLTUwMC8yMCcsXG4gICAgICBqZXdlbEdsb3c6ICdiZy1yb3NlLTQwMCBzaGFkb3ctWzBfMF8xMHB4XyNmNDNmNWVdJ1xuICAgIH0sXG4gICAgaW5kaWdvOiB7XG4gICAgICByaW5nOiAnc3Ryb2tlLWluZGlnby00MDAnLFxuICAgICAgZ2xvd0ZpbHRlcjogJ3JnYmEoOTksIDEwMiwgMjQxLCAwLjUpJyxcbiAgICAgIHRleHQ6ICd0ZXh0LWluZGlnby0zMDAnLFxuICAgICAgYmdHbG93OiAncmdiYSg5OSwgMTAyLCAyNDEsIDAuMjIpJyxcbiAgICAgIGluZGljYXRvcjogJyM2MzY2ZjEnLFxuICAgICAgaW5kaWNhdG9yR2xvdzogJzAgMCA4cHggIzgxOGNmOCwgMCAwIDE2cHggcmdiYSg5OSwgMTAyLCAyNDEsIDAuNyknLFxuICAgICAgdHJhY2tBY3RpdmU6ICcjNjM2NmYxJyxcbiAgICAgIGRpYWxCZXZlbDogJ2JvcmRlci1pbmRpZ28tNTAwLzIwJyxcbiAgICAgIGpld2VsR2xvdzogJ2JnLWluZGlnby00MDAgc2hhZG93LVswXzBfMTBweF8jNjM2NmYxXSdcbiAgICB9XG4gIH1bYWNjZW50Q29sb3JdO1xuXG4gIC8vIE1vdXNlICYgVG91Y2ggSW50ZXJhY3Rpb24gd2l0aCBTbW9vdGggUHJlY2lzaW9uXG4gIGNvbnN0IGhhbmRsZU1vdXNlRG93biA9IChlOiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHNldElzRHJhZ2dpbmcodHJ1ZSk7XG4gICAgZHJhZ1N0YXJ0WS5jdXJyZW50ID0gZS5jbGllbnRZO1xuICAgIGRyYWdTdGFydFguY3VycmVudCA9IGUuY2xpZW50WDtcbiAgICBzdGFydFZhbC5jdXJyZW50ID0gdmFsdWU7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlVG91Y2hTdGFydCA9IChlOiBSZWFjdC5Ub3VjaEV2ZW50KSA9PiB7XG4gICAgc2V0SXNEcmFnZ2luZyh0cnVlKTtcbiAgICBkcmFnU3RhcnRZLmN1cnJlbnQgPSBlLnRvdWNoZXNbMF0uY2xpZW50WTtcbiAgICBkcmFnU3RhcnRYLmN1cnJlbnQgPSBlLnRvdWNoZXNbMF0uY2xpZW50WDtcbiAgICBzdGFydFZhbC5jdXJyZW50ID0gdmFsdWU7XG4gIH07XG5cbiAgLy8gV2hlZWwgaW50ZXJhY3Rpb24gZm9yIG1pY3Jvc2NvcGljIHF1aWV0IGx1eHVyeSBwcmVjaXNpb25cbiAgY29uc3QgaGFuZGxlV2hlZWwgPSAoZTogUmVhY3QuV2hlZWxFdmVudCkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBkZWx0YSA9IGUuZGVsdGFZIDwgMCA/IHN0ZXAgOiAtc3RlcDtcbiAgICBjb25zdCBmaW5lU3RlcCA9IGUuc2hpZnRLZXkgPyBzdGVwICogMC4xIDogc3RlcDtcbiAgICBjb25zdCBhY3R1YWxEZWx0YSA9IGUuZGVsdGFZIDwgMCA/IGZpbmVTdGVwIDogLWZpbmVTdGVwO1xuICAgIGNvbnN0IG5ld1ZhbCA9IE1hdGgubWluKE1hdGgubWF4KHZhbHVlICsgYWN0dWFsRGVsdGEsIG1pbiksIG1heCk7XG4gICAgY29uc3Qgc3RlcHBlZCA9IE1hdGgucm91bmQobmV3VmFsIC8gKGUuc2hpZnRLZXkgPyBzdGVwICogMC4xIDogc3RlcCkpICogKGUuc2hpZnRLZXkgPyBzdGVwICogMC4xIDogc3RlcCk7XG4gICAgaWYgKHN0ZXBwZWQgIT09IHZhbHVlKSB7XG4gICAgICBvbkNoYW5nZShOdW1iZXIoc3RlcHBlZC50b0ZpeGVkKGRlY2ltYWxzICsgKGUuc2hpZnRLZXkgPyAxIDogMCkpKSk7XG4gICAgICBwbGF5VGlja1NvdW5kKDAuOCk7XG4gICAgfVxuICB9O1xuXG4gIC8vIEluY3JlbWVudCAvIERlY3JlbWVudCBmaW5lIGJ1dHRvbnNcbiAgY29uc3QgbnVkZ2UgPSAoZGlyZWN0aW9uOiAndXAnIHwgJ2Rvd24nKSA9PiB7XG4gICAgY29uc3QgZGVsdGEgPSBkaXJlY3Rpb24gPT09ICd1cCcgPyBzdGVwIDogLXN0ZXA7XG4gICAgY29uc3QgbmV3VmFsID0gTWF0aC5taW4oTWF0aC5tYXgodmFsdWUgKyBkZWx0YSwgbWluKSwgbWF4KTtcbiAgICBjb25zdCBzdGVwcGVkID0gTWF0aC5yb3VuZChuZXdWYWwgLyBzdGVwKSAqIHN0ZXA7XG4gICAgaWYgKHN0ZXBwZWQgIT09IHZhbHVlKSB7XG4gICAgICBvbkNoYW5nZShOdW1iZXIoc3RlcHBlZC50b0ZpeGVkKGRlY2ltYWxzKSkpO1xuICAgICAgcGxheVRpY2tTb3VuZCgxLjIpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCByZXNldFRvRGVmYXVsdCA9IChlOiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBpZiAoZGVmYXVsdFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIG9uQ2hhbmdlKGRlZmF1bHRWYWx1ZSk7XG4gICAgICBwbGF5VGlja1NvdW5kKDEuNSk7XG4gICAgfVxuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlTW91c2VNb3ZlID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgIGlmICghaXNEcmFnZ2luZykgcmV0dXJuO1xuICAgICAgLy8gU3VwcG9ydCB2ZXJ0aWNhbCBhbmQgc2xpZ2h0IGhvcml6b250YWwgZHJhZyB3aXRoIGhpZ2ggc2Vuc2l0aXZpdHkgcHJlY2lzaW9uXG4gICAgICBjb25zdCBkZWx0YVkgPSBkcmFnU3RhcnRZLmN1cnJlbnQgLSBlLmNsaWVudFk7XG4gICAgICBjb25zdCBkZWx0YVggPSBlLmNsaWVudFggLSBkcmFnU3RhcnRYLmN1cnJlbnQ7XG4gICAgICBjb25zdCBjb21iaW5lZERlbHRhID0gZGVsdGFZICsgKGRlbHRhWCAqIDAuNCk7XG4gICAgICBcbiAgICAgIGNvbnN0IHJhbmdlID0gbWF4IC0gbWluO1xuICAgICAgY29uc3Qgc2Vuc2l0aXZpdHkgPSBlLnNoaWZ0S2V5ID8gNjAwIDogMjAwOyAvLyBTaGlmdCBmb3IgdWx0cmEgZmluZSB0dW5pbmdcbiAgICAgIGNvbnN0IGRlbHRhVmFsID0gKGNvbWJpbmVkRGVsdGEgLyBzZW5zaXRpdml0eSkgKiByYW5nZTtcbiAgICAgIGxldCBuZXdWYWwgPSBzdGFydFZhbC5jdXJyZW50ICsgZGVsdGFWYWw7XG4gICAgICBuZXdWYWwgPSBNYXRoLm1pbihNYXRoLm1heChuZXdWYWwsIG1pbiksIG1heCk7XG4gICAgICBcbiAgICAgIGNvbnN0IGN1cnJlbnRTdGVwID0gZS5zaGlmdEtleSA/IHN0ZXAgKiAwLjIgOiBzdGVwO1xuICAgICAgY29uc3Qgc3RlcHBlZCA9IE1hdGgucm91bmQobmV3VmFsIC8gY3VycmVudFN0ZXApICogY3VycmVudFN0ZXA7XG4gICAgICBpZiAoc3RlcHBlZCAhPT0gdmFsdWUpIHtcbiAgICAgICAgb25DaGFuZ2UoTnVtYmVyKHN0ZXBwZWQudG9GaXhlZChkZWNpbWFscykpKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlVG91Y2hNb3ZlID0gKGU6IFRvdWNoRXZlbnQpID0+IHtcbiAgICAgIGlmICghaXNEcmFnZ2luZykgcmV0dXJuO1xuICAgICAgY29uc3QgZGVsdGFZID0gZHJhZ1N0YXJ0WS5jdXJyZW50IC0gZS50b3VjaGVzWzBdLmNsaWVudFk7XG4gICAgICBjb25zdCBkZWx0YVggPSBlLnRvdWNoZXNbMF0uY2xpZW50WCAtIGRyYWdTdGFydFguY3VycmVudDtcbiAgICAgIGNvbnN0IGNvbWJpbmVkRGVsdGEgPSBkZWx0YVkgKyAoZGVsdGFYICogMC40KTtcbiAgICAgIFxuICAgICAgY29uc3QgcmFuZ2UgPSBtYXggLSBtaW47XG4gICAgICBjb25zdCBzZW5zaXRpdml0eSA9IDIyMDtcbiAgICAgIGNvbnN0IGRlbHRhVmFsID0gKGNvbWJpbmVkRGVsdGEgLyBzZW5zaXRpdml0eSkgKiByYW5nZTtcbiAgICAgIGxldCBuZXdWYWwgPSBzdGFydFZhbC5jdXJyZW50ICsgZGVsdGFWYWw7XG4gICAgICBuZXdWYWwgPSBNYXRoLm1pbihNYXRoLm1heChuZXdWYWwsIG1pbiksIG1heCk7XG4gICAgICBjb25zdCBzdGVwcGVkID0gTWF0aC5yb3VuZChuZXdWYWwgLyBzdGVwKSAqIHN0ZXA7XG4gICAgICBpZiAoc3RlcHBlZCAhPT0gdmFsdWUpIHtcbiAgICAgICAgb25DaGFuZ2UoTnVtYmVyKHN0ZXBwZWQudG9GaXhlZChkZWNpbWFscykpKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlTW91c2VVcCA9ICgpID0+IHtcbiAgICAgIHNldElzRHJhZ2dpbmcoZmFsc2UpO1xuICAgIH07XG5cbiAgICBpZiAoaXNEcmFnZ2luZykge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGhhbmRsZU1vdXNlTW92ZSk7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGhhbmRsZU1vdXNlVXApO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGhhbmRsZVRvdWNoTW92ZSk7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBoYW5kbGVNb3VzZVVwKTtcbiAgICB9XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBoYW5kbGVNb3VzZU1vdmUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBoYW5kbGVNb3VzZVVwKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBoYW5kbGVUb3VjaE1vdmUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgaGFuZGxlTW91c2VVcCk7XG4gICAgfTtcbiAgfSwgW2lzRHJhZ2dpbmcsIG1heCwgbWluLCBzdGVwLCBkZWNpbWFscywgdmFsdWUsIG9uQ2hhbmdlXSk7XG5cbiAgLy8gQ2lyY3VtZmVyZW5jZSBmb3IgMjcwIGRlZyBhcmMgd2l0aCByYWRpdXMgMzFcbiAgY29uc3QgcmFkaXVzID0gMzE7XG4gIGNvbnN0IHRvdGFsTGVuZ3RoID0gMiAqIE1hdGguUEkgKiByYWRpdXMgKiAoMjcwIC8gMzYwKTtcbiAgY29uc3QgYW5pbWF0ZWROb3JtYWxpemVkID0gTWF0aC5taW4oTWF0aC5tYXgoKGFuaW1hdGVkQW5nbGUgKyAxMzUpIC8gMjcwLCAwKSwgMSk7XG4gIGNvbnN0IHN0cm9rZURhc2hvZmZzZXQgPSB0b3RhbExlbmd0aCAtIChhbmltYXRlZE5vcm1hbGl6ZWQgKiB0b3RhbExlbmd0aCk7XG5cbiAgLy8gR2VuZXJhdGUgMTEgY2FsaWJyYXRlZCBsYXNlciB0aWNrIG1hcmtzIGFyb3VuZCB0aGUgYmV6ZWwgKDAlLCAxMCUsIDIwJSAuLi4gMTAwJSlcbiAgY29uc3QgdGlja01hcmtzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTEgfSwgKF8sIGkpID0+IHtcbiAgICBjb25zdCB0aWNrTm9ybWFsaXplZCA9IGkgLyAxMDtcbiAgICBjb25zdCB0aWNrQW5nbGUgPSAtMTM1ICsgdGlja05vcm1hbGl6ZWQgKiAyNzA7XG4gICAgY29uc3QgaXNQYXNzZWQgPSBhbmltYXRlZE5vcm1hbGl6ZWQgPj0gdGlja05vcm1hbGl6ZWQgLSAwLjAxO1xuICAgIGNvbnN0IGlzTWFqb3IgPSBpICUgNSA9PT0gMDtcbiAgICByZXR1cm4ge1xuICAgICAgaW5kZXg6IGksXG4gICAgICBhbmdsZTogdGlja0FuZ2xlLFxuICAgICAgaXNQYXNzZWQsXG4gICAgICBpc01ham9yXG4gICAgfTtcbiAgfSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IFxuICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiBzZXRJc0hvdmVyZWQodHJ1ZSl9XG4gICAgICBvbk1vdXNlTGVhdmU9eygpID0+IHNldElzSG92ZXJlZChmYWxzZSl9XG4gICAgICBvbldoZWVsPXtoYW5kbGVXaGVlbH1cbiAgICAgIGNsYXNzTmFtZT17YHJlbGF0aXZlIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIHAtMy41IHJvdW5kZWQtMnhsIGJnLWdyYWRpZW50LXRvLWIgZnJvbS16aW5jLTkwMC85MCB2aWEtemluYy05NTAvOTUgdG8tYmxhY2sgYm9yZGVyIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCBncm91cCBzZWxlY3Qtbm9uZSAke1xuICAgICAgICBpc0RyYWdnaW5nIFxuICAgICAgICAgID8gJ2JvcmRlci13aGl0ZS8zMCBzaGFkb3ctWzBfMF8yNXB4X3JnYmEoMCwwLDAsMC44KV0gc2NhbGUtWzEuMDJdJyBcbiAgICAgICAgICA6IGlzSG92ZXJlZCBcbiAgICAgICAgICAgID8gJ2JvcmRlci13aGl0ZS8yMCBzaGFkb3cteGwgc2hhZG93LWJsYWNrLzYwJyBcbiAgICAgICAgICAgIDogJ2JvcmRlci13aGl0ZS81IHNoYWRvdy1sZyBzaGFkb3ctYmxhY2svNDAnXG4gICAgICB9YH1cbiAgICA+XG4gICAgICB7LyogUXVpZXQgTHV4dXJ5IEFtYmllbnQgVW5kZXItR2xvdyAqL31cbiAgICAgIDxkaXYgXG4gICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgcm91bmRlZC0yeGwgcG9pbnRlci1ldmVudHMtbm9uZSB0cmFuc2l0aW9uLW9wYWNpdHkgZHVyYXRpb24tNTAwIG9wYWNpdHktMCBncm91cC1ob3ZlcjpvcGFjaXR5LTEwMFwiXG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgYmFja2dyb3VuZDogYHJhZGlhbC1ncmFkaWVudChjaXJjbGUgYXQgNTAlIDQ1JSwgJHtjb2xvclBhbGV0dGVzLmJnR2xvd30gMCUsIHRyYW5zcGFyZW50IDcwJSlgXG4gICAgICAgIH19XG4gICAgICAvPlxuXG4gICAgICB7LyogSGVhZGVyIExhYmVsICYgUXVpY2sgQWN0aW9ucyAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgei0xMCB3LWZ1bGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0xIG1iLTEuNSBweC0wLjVcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSBmb250LW1vbm8gZm9udC1ib2xkIHRleHQtc2xhdGUtMjAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciB0cnVuY2F0ZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0xLjUgaC0xLjUgcm91bmRlZC1mdWxsXCIgc3R5bGU9e3sgYmFja2dyb3VuZENvbG9yOiBjb2xvclBhbGV0dGVzLmluZGljYXRvciB9fSAvPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRydW5jYXRlXCI+e2xhYmVsfTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAge2RlZmF1bHRWYWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBkZWZhdWx0VmFsdWUgJiYgKFxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e3Jlc2V0VG9EZWZhdWx0fVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1bOXB4XSBmb250LW1vbm8gdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC1hbWJlci0zMDAgcC0wLjUgcm91bmRlZCB0cmFuc2l0aW9uLWNvbG9ycyBvcGFjaXR5LTAgZ3JvdXAtaG92ZXI6b3BhY2l0eS0xMDAgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgdGl0bGU9e2BQcnp5d3LDs8SHIHdhcnRvxZvEhyBmYWJyeWN6bsSFOiAke2RlZmF1bHRWYWx1ZX0gJHt1bml0fWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPFJvdGF0ZUNjdyBjbGFzc05hbWU9XCJ3LTIuNSBoLTIuNVwiIC8+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIE1haW4gUG90ZW50aW9tZXRlciBEaWFsIE91dGVyIFNvY2tldCAqL31cbiAgICAgIDxkaXYgXG4gICAgICAgIHJlZj17a25vYlJlZn1cbiAgICAgICAgb25Nb3VzZURvd249e2hhbmRsZU1vdXNlRG93bn1cbiAgICAgICAgb25Ub3VjaFN0YXJ0PXtoYW5kbGVUb3VjaFN0YXJ0fVxuICAgICAgICBjbGFzc05hbWU9e2ByZWxhdGl2ZSB3LTI4IGgtMjggZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgY3Vyc29yLW5zLXJlc2l6ZSB0cmFuc2l0aW9uLXRyYW5zZm9ybSBzZWxlY3Qtbm9uZSAke1xuICAgICAgICAgIGlzRHJhZ2dpbmcgPyAnc2NhbGUtMTA1JyA6ICdhY3RpdmU6c2NhbGUtOTgnXG4gICAgICAgIH1gfVxuICAgICAgICB0aXRsZT17YFByemVjacSFZ25paiB3IHBpb25pZSBsdWIgdcW8eWogcm9sa2kgbXlzenkgKEhvbGQgU2hpZnQgPSBtaWtyby1zdHJvamVuaWUpIOKAoiAke21pbn0gLSAke21heH0gJHt1bml0fWB9XG4gICAgICA+XG4gICAgICAgIHsvKiBTVkcgQXJjIFRyYWNrICYgQWN0aXZlIEZpbGwgd2l0aCBRdWlldCBMdXh1cnkgR2xvd2luZyBSaW5nICovfVxuICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cInctMjggaC0yOCAtcm90YXRlLTkwIHBvaW50ZXItZXZlbnRzLW5vbmUgZHJvcC1zaGFkb3ctbWRcIiB2aWV3Qm94PVwiMCAwIDgwIDgwXCI+XG4gICAgICAgICAgPGRlZnM+XG4gICAgICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9e2Ake2dyYWRpZW50SWR9LWFjdGl2ZWB9IHgxPVwiMCVcIiB5MT1cIjAlXCIgeDI9XCIxMDAlXCIgeTI9XCIxMDAlXCI+XG4gICAgICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjAlXCIgc3RvcENvbG9yPVwiI2ZmZmZmZlwiIHN0b3BPcGFjaXR5PVwiMC45XCIgLz5cbiAgICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiNTAlXCIgc3RvcENvbG9yPXtjb2xvclBhbGV0dGVzLnRyYWNrQWN0aXZlfSBzdG9wT3BhY2l0eT1cIjFcIiAvPlxuICAgICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIxMDAlXCIgc3RvcENvbG9yPXtjb2xvclBhbGV0dGVzLnRyYWNrQWN0aXZlfSBzdG9wT3BhY2l0eT1cIjAuNzVcIiAvPlxuICAgICAgICAgICAgPC9saW5lYXJHcmFkaWVudD5cbiAgICAgICAgICAgIDxmaWx0ZXIgaWQ9e2Ake2dyYWRpZW50SWR9LWdsb3dgfSB4PVwiLTIwJVwiIHk9XCItMjAlXCIgd2lkdGg9XCIxNDAlXCIgaGVpZ2h0PVwiMTQwJVwiPlxuICAgICAgICAgICAgICA8ZmVEcm9wU2hhZG93IGR4PVwiMFwiIGR5PVwiMFwiIHN0ZERldmlhdGlvbj1cIjEuNVwiIGZsb29kQ29sb3I9e2NvbG9yUGFsZXR0ZXMuZ2xvd0ZpbHRlcn0gLz5cbiAgICAgICAgICAgIDwvZmlsdGVyPlxuICAgICAgICAgIDwvZGVmcz5cblxuICAgICAgICAgIHsvKiBCYWNrZ3JvdW5kIE91dGVyIERhcmsgVHJhY2sgKi99XG4gICAgICAgICAgPGNpcmNsZVxuICAgICAgICAgICAgY3g9XCI0MFwiXG4gICAgICAgICAgICBjeT1cIjQwXCJcbiAgICAgICAgICAgIHI9e3JhZGl1c31cbiAgICAgICAgICAgIGZpbGw9XCJ0cmFuc3BhcmVudFwiXG4gICAgICAgICAgICBzdHJva2U9XCJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDcpXCJcbiAgICAgICAgICAgIHN0cm9rZVdpZHRoPVwiNFwiXG4gICAgICAgICAgICBzdHJva2VEYXNoYXJyYXk9e2Ake3RvdGFsTGVuZ3RofSAxMDAwYH1cbiAgICAgICAgICAgIHN0cm9rZURhc2hvZmZzZXQ9XCIwXCJcbiAgICAgICAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXG4gICAgICAgICAgICB0cmFuc2Zvcm09XCJyb3RhdGUoMTM1IDQwIDQwKVwiXG4gICAgICAgICAgLz5cblxuICAgICAgICAgIHsvKiBDYWxpYnJhdGVkIFRpY2sgTWFya3MgaW4gU1ZHIHNwYWNlICovfVxuICAgICAgICAgIHt0aWNrTWFya3MubWFwKHQgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmFkID0gKCh0LmFuZ2xlIC0gOTApICogTWF0aC5QSSkgLyAxODA7XG4gICAgICAgICAgICBjb25zdCByMSA9IDM2LjU7XG4gICAgICAgICAgICBjb25zdCByMiA9IHQuaXNNYWpvciA/IDM5IDogMzcuODtcbiAgICAgICAgICAgIGNvbnN0IHgxID0gNDAgKyByMSAqIE1hdGguY29zKHJhZCk7XG4gICAgICAgICAgICBjb25zdCB5MSA9IDQwICsgcjEgKiBNYXRoLnNpbihyYWQpO1xuICAgICAgICAgICAgY29uc3QgeDIgPSA0MCArIHIyICogTWF0aC5jb3MocmFkKTtcbiAgICAgICAgICAgIGNvbnN0IHkyID0gNDAgKyByMiAqIE1hdGguc2luKHJhZCk7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8bGluZVxuICAgICAgICAgICAgICAgIGtleT17dC5pbmRleH1cbiAgICAgICAgICAgICAgICB4MT17eDF9XG4gICAgICAgICAgICAgICAgeTE9e3kxfVxuICAgICAgICAgICAgICAgIHgyPXt4Mn1cbiAgICAgICAgICAgICAgICB5Mj17eTJ9XG4gICAgICAgICAgICAgICAgc3Ryb2tlPXt0LmlzUGFzc2VkID8gY29sb3JQYWxldHRlcy50cmFja0FjdGl2ZSA6ICdyZ2JhKDI1NSwyNTUsMjU1LDAuMTgpJ31cbiAgICAgICAgICAgICAgICBzdHJva2VXaWR0aD17dC5pc01ham9yID8gMS41IDogMX1cbiAgICAgICAgICAgICAgICBzdHJva2VPcGFjaXR5PXt0LmlzUGFzc2VkID8gMC45IDogMC40fVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRyYW5zaXRpb24tY29sb3JzIGR1cmF0aW9uLTE1MFwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pfVxuXG4gICAgICAgICAgey8qIEFjdGl2ZSBHbG93aW5nIEFyYyB3aXRoIExpcXVpZCBTbW9vdGggQW5pbWF0aW9uICovfVxuICAgICAgICAgIDxjaXJjbGVcbiAgICAgICAgICAgIGN4PVwiNDBcIlxuICAgICAgICAgICAgY3k9XCI0MFwiXG4gICAgICAgICAgICByPXtyYWRpdXN9XG4gICAgICAgICAgICBmaWxsPVwidHJhbnNwYXJlbnRcIlxuICAgICAgICAgICAgc3Ryb2tlPXtgdXJsKCMke2dyYWRpZW50SWR9LWFjdGl2ZSlgfVxuICAgICAgICAgICAgc3Ryb2tlV2lkdGg9XCI0LjVcIlxuICAgICAgICAgICAgc3Ryb2tlRGFzaGFycmF5PXtgJHt0b3RhbExlbmd0aH0gMTAwMGB9XG4gICAgICAgICAgICBzdHJva2VEYXNob2Zmc2V0PXtzdHJva2VEYXNob2Zmc2V0fVxuICAgICAgICAgICAgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCJcbiAgICAgICAgICAgIGZpbHRlcj17YHVybCgjJHtncmFkaWVudElkfS1nbG93KWB9XG4gICAgICAgICAgICB0cmFuc2Zvcm09XCJyb3RhdGUoMTM1IDQwIDQwKVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9zdmc+XG5cbiAgICAgICAgey8qIDNEIFBoeXNpY2FsIEtudXJsZWQgQmV6ZWwgJiBNYWNoaW5lZCBDZXJhbWljIEhvdXNpbmcgKi99XG4gICAgICAgIDxkaXYgXG4gICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdy0yMCBoLTIwIHJvdW5kZWQtZnVsbCBiZy1ncmFkaWVudC10by1iIGZyb20temluYy04MDAgdmlhLXppbmMtOTAwIHRvLWJsYWNrIGJvcmRlciBib3JkZXItd2hpdGUvMjAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdHJhbnNpdGlvbi1zaGFkb3cgZHVyYXRpb24tMzAwXCJcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgYm94U2hhZG93OiBgXG4gICAgICAgICAgICAgIGluc2V0IDAgMnB4IDNweCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjIpLFxuICAgICAgICAgICAgICBpbnNldCAwIC0zcHggOHB4IHJnYmEoMCwgMCwgMCwgMC45NSksXG4gICAgICAgICAgICAgIDAgNnB4IDE0cHggcmdiYSgwLCAwLCAwLCAwLjgpLFxuICAgICAgICAgICAgICAke2lzRHJhZ2dpbmcgPyBgMCAwIDE2cHggJHtjb2xvclBhbGV0dGVzLmJnR2xvd31gIDogJzAgMCAwIHJnYmEoMCwwLDAsMCknfVxuICAgICAgICAgICAgYFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICB7LyogTWljcm8tS251cmxlZCBPdXRlciBHcmlwIFJpbmcgKE1hY2hpbmVkIFRleHR1cmUpICovfVxuICAgICAgICAgIDxkaXYgXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0xIHJvdW5kZWQtZnVsbCBib3JkZXIgYm9yZGVyLWRhc2hlZCBib3JkZXItd2hpdGUvMTAgb3BhY2l0eS03MCBwb2ludGVyLWV2ZW50cy1ub25lXCJcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogJ3JhZGlhbC1ncmFkaWVudChjaXJjbGUsIHJnYmEoMjU1LDI1NSwyNTUsMC4wOCkgMXB4LCB0cmFuc3BhcmVudCAxcHgpJyxcbiAgICAgICAgICAgICAgYmFja2dyb3VuZFNpemU6ICc0cHggNHB4J1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAvPlxuXG4gICAgICAgICAgey8qIElubmVyIFJlY2Vzc2VkIEJlemVsIHdpdGggQ29uaWNhbCBBbmlzb3Ryb3BpYyBIaWdobGlnaHQgKi99XG4gICAgICAgICAgPGRpdiBcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTIgcm91bmRlZC1mdWxsIGJvcmRlciBib3JkZXItd2hpdGUvMTUgb3ZlcmZsb3ctaGlkZGVuIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHBvaW50ZXItZXZlbnRzLW5vbmVcIlxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ3JhZGlhbC1ncmFkaWVudChjaXJjbGUgYXQgNDAlIDMwJSwgIzI3MjcyYSAwJSwgIzE4MTgxYiA1MCUsICMwOTA5MGIgMTAwJSknLFxuICAgICAgICAgICAgICBib3hTaGFkb3c6ICdpbnNldCAwIDJweCA2cHggcmdiYSgwLDAsMCwwLjkpLCAwIDFweCAycHggcmdiYSgyNTUsMjU1LDI1NSwwLjA4KSdcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgey8qIENvbmNlbnRyaWMgVmlueWwvTGF0aGUgTWFjaGluaW5nIEdyb292ZXMgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgcm91bmRlZC1mdWxsIGJvcmRlciBib3JkZXItd2hpdGUvNSBvcGFjaXR5LTQwXCIgLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMS41IHJvdW5kZWQtZnVsbCBib3JkZXIgYm9yZGVyLXdoaXRlLzUgb3BhY2l0eS0zMFwiIC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTMgcm91bmRlZC1mdWxsIGJvcmRlciBib3JkZXItd2hpdGUvNSBvcGFjaXR5LTIwXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBST1RBVElORyBST1RPUiBXSVRIIFVMVFJBLVNNT09USCBORUVETEUgKElHxYFBKSAqL31cbiAgICAgICAgICA8ZGl2IFxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwb2ludGVyLWV2ZW50cy1ub25lIHdpbGwtY2hhbmdlLXRyYW5zZm9ybVwiXG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICB0cmFuc2Zvcm06IGByb3RhdGUoJHthbmltYXRlZEFuZ2xlfWRlZylgLFxuICAgICAgICAgICAgICB0cmFuc2Zvcm1PcmlnaW46ICc1MCUgNTAlJ1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7LyogTHVtaW5vdXMgVGFwZXJlZCBQb2ludGVyIE5lZWRsZSAoSWfFgmEpICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMiB3LTEgaC03IGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICAgIHsvKiBJbGx1bWluYXRlZCBOZWVkbGUgVGlwIChMdW1pbm91cyBCZWFkICYgTGlnaHQgQmxvb20pICovfVxuICAgICAgICAgICAgICA8ZGl2IFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMiBoLTIuNSByb3VuZGVkLWZ1bGwgLW10LTEgcmVsYXRpdmUgei0yMFwiXG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogY29sb3JQYWxldHRlcy5pbmRpY2F0b3IsXG4gICAgICAgICAgICAgICAgICBib3hTaGFkb3c6IGNvbG9yUGFsZXR0ZXMuaW5kaWNhdG9yR2xvd1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7LyogTWljcm8gV2hpdGUgSG90IENlbnRlciAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAuNSByb3VuZGVkLWZ1bGwgYmctd2hpdGUvOTBcIiAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogVGFwZXJlZCBIaWdoLVByZWNpc2lvbiBOZWVkbGUgU3BpbmUgKi99XG4gICAgICAgICAgICAgIDxkaXYgXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0xIGgtNiBiZy1ncmFkaWVudC10by1iIGZyb20td2hpdGUgdmlhLXNsYXRlLTMwMCB0by16aW5jLTYwMCByb3VuZGVkLWIgc2hhZG93LXNtIHJlbGF0aXZlIHotMTBcIlxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICBib3hTaGFkb3c6ICcwIDAgNHB4IHJnYmEoMjU1LDI1NSwyNTUsMC40KSdcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBOZWVkbGUgQ291bnRlcmJhbGFuY2UgVGFpbCBhdCB0aGUgNi1vJ2Nsb2NrIHBvc2l0aW9uICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tMyB3LTEuNSBoLTIgYmctZ3JhZGllbnQtdG8tdCBmcm9tLXppbmMtNzAwIHRvLXppbmMtOTAwIHJvdW5kZWQtZnVsbCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIG9wYWNpdHktNzVcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIENlbnRyYWwgTHV4dXJ5IEh1YiAvIEpld2VsIENhcCB3aXRoIERpYW1vbmQtQ3V0IFJpbmcgKi99XG4gICAgICAgICAgPGRpdiBcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlbGF0aXZlIHotMjAgdy04IGgtOCByb3VuZGVkLWZ1bGwgYmctZ3JhZGllbnQtdG8tdHIgZnJvbS16aW5jLTk1MCB2aWEtemluYy04NTAgdG8temluYy03MDAgYm9yZGVyIGJvcmRlci13aGl0ZS8yMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBzaGFkb3ctbGcgcG9pbnRlci1ldmVudHMtbm9uZVwiXG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICBib3hTaGFkb3c6ICdpbnNldCAwIDFweCAycHggcmdiYSgyNTUsMjU1LDI1NSwwLjMpLCBpbnNldCAwIC0ycHggNHB4IHJnYmEoMCwwLDAsMC44NSksIDAgM3B4IDZweCByZ2JhKDAsMCwwLDAuNyknXG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHsvKiBKZXdlbCBDZW50ZXIgRG90IHdpdGggRHluYW1pYyBBY2NlbnQgR2xvdyAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgdy0yLjUgaC0yLjUgcm91bmRlZC1mdWxsICR7Y29sb3JQYWxldHRlcy5qZXdlbEdsb3d9IHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlcmB9PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMSBoLTEgcm91bmRlZC1mdWxsIGJnLXdoaXRlLzkwIHNoYWRvdy1zbVwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovfVxuICAgICAgICAgIHsvKiBTVUJUTEUgR0xPU1NZIFNBUFBISVJFIEdMQVNTIFNIRUVOIE9WRVJMQVkgKFFVSUVUIExVWFVSWSkgICAgICAgICAgICAgICAgICAqL31cbiAgICAgICAgICB7LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL31cbiAgICAgICAgICA8ZGl2IFxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCByb3VuZGVkLWZ1bGwgcG9pbnRlci1ldmVudHMtbm9uZSBvdmVyZmxvdy1oaWRkZW5cIlxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogYFxuICAgICAgICAgICAgICAgIGxpbmVhci1ncmFkaWVudChcbiAgICAgICAgICAgICAgICAgIDEzNWRlZywgXG4gICAgICAgICAgICAgICAgICByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMzIpIDAlLCBcbiAgICAgICAgICAgICAgICAgIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xMCkgMzUlLCBcbiAgICAgICAgICAgICAgICAgIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMCkgNTUlLCBcbiAgICAgICAgICAgICAgICAgIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSkgMTAwJVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgYCxcbiAgICAgICAgICAgICAgYm94U2hhZG93OiAnaW5zZXQgMCAxcHggMnB4IHJnYmEoMjU1LDI1NSwyNTUsMC40KSwgaW5zZXQgMCAtMXB4IDNweCByZ2JhKDAsMCwwLDAuNCknXG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHsvKiBUb3AtQXJjIFNwZWN1bGFyIEdsb3NzIEhpZ2hsaWdodCAoQW50aS1yZWZsZWN0aXZlIFNhcHBoaXJlIExlbnMgQ3VydmUpICovfVxuICAgICAgICAgICAgPGRpdiBcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgLXRvcC0xIGxlZnQtMiByaWdodC0yIGgtNyByb3VuZGVkLVsxMDAlXSBiZy1ncmFkaWVudC10by1iIGZyb20td2hpdGUvMzUgdmlhLXdoaXRlLzEwIHRvLXRyYW5zcGFyZW50IHBvaW50ZXItZXZlbnRzLW5vbmUgb3BhY2l0eS04NVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgey8qIEJvdHRvbSBTdWJ0bGUgUmVmbGVjdGlvbiBBcmMgKi99XG4gICAgICAgICAgICA8ZGl2IFxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSAtYm90dG9tLTEgbGVmdC00IHJpZ2h0LTQgaC00IHJvdW5kZWQtWzEwMCVdIGJnLWdyYWRpZW50LXRvLXQgZnJvbS13aGl0ZS8xMCB0by10cmFuc3BhcmVudCBwb2ludGVyLWV2ZW50cy1ub25lIG9wYWNpdHktNDBcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogQW1iaWVudCBSaW5nIEFjdGl2ZSBQdWxzZSAqL31cbiAgICAgICAge2lzRHJhZ2dpbmcgJiYgKFxuICAgICAgICAgIDxkaXYgXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIHJvdW5kZWQtZnVsbCBwb2ludGVyLWV2ZW50cy1ub25lIGFuaW1hdGUtcHVsc2VcIlxuICAgICAgICAgICAgc3R5bGU9e3sgXG4gICAgICAgICAgICAgIGJveFNoYWRvdzogYDAgMCAyNHB4ICR7Y29sb3JQYWxldHRlcy5iZ0dsb3d9YCBcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogRGlnaXRhbCBSZWFsLVRpbWUgUmVhZG91dCBWYWx1ZSB3aXRoIFN0ZXBwZXIgQ29udHJvbHMgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIHotMTAgdy1mdWxsIG10LTIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHB4LTFcIj5cbiAgICAgICAgey8qIE51ZGdlIERvd24gQnV0dG9uICovfVxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gbnVkZ2UoJ2Rvd24nKX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJwLTEgcm91bmRlZC1sZyBiZy16aW5jLTkwMC84MCBob3ZlcjpiZy16aW5jLTgwMCB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlIGJvcmRlciBib3JkZXItd2hpdGUvNSB0cmFuc2l0aW9uLWFsbCBvcGFjaXR5LTQwIGdyb3VwLWhvdmVyOm9wYWNpdHktMTAwIGN1cnNvci1wb2ludGVyIGFjdGl2ZTpzY2FsZS05NVwiXG4gICAgICAgICAgdGl0bGU9e2BabW5pZWpzeiBvICR7c3RlcH0gJHt1bml0fWB9XG4gICAgICAgID5cbiAgICAgICAgICA8Q2hldnJvbkRvd24gY2xhc3NOYW1lPVwidy0zIGgtM1wiIC8+XG4gICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgIHsvKiBDZW50cmFsIE51bWVyaWMgUmVhZG91dCAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciBmb250LW1vbm9cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtYmFzZWxpbmUganVzdGlmeS1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHRleHQtYmFzZSBmb250LWJsYWNrIHRyYWNraW5nLXRpZ2h0ICR7Y29sb3JQYWxldHRlcy50ZXh0fWB9PlxuICAgICAgICAgICAgICB7dmFsdWUudG9GaXhlZChkZWNpbWFscyl9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LWJvbGQgdGV4dC1zbGF0ZS00MDAgdXBwZXJjYXNlXCI+XG4gICAgICAgICAgICAgIHt1bml0fVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIFNjYWxlIE1pbiAvIE1heCBIaW50cyAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMiB0ZXh0LVs4LjVweF0gZm9udC1tb25vIHRleHQtc2xhdGUtNTAwIG10LTAuNVwiPlxuICAgICAgICAgICAgPHNwYW4+e21pbn08L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTYwMFwiPuKAojwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuPnttYXh9PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogTnVkZ2UgVXAgQnV0dG9uICovfVxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gbnVkZ2UoJ3VwJyl9XG4gICAgICAgICAgY2xhc3NOYW1lPVwicC0xIHJvdW5kZWQtbGcgYmctemluYy05MDAvODAgaG92ZXI6YmctemluYy04MDAgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSBib3JkZXIgYm9yZGVyLXdoaXRlLzUgdHJhbnNpdGlvbi1hbGwgb3BhY2l0eS00MCBncm91cC1ob3ZlcjpvcGFjaXR5LTEwMCBjdXJzb3ItcG9pbnRlciBhY3RpdmU6c2NhbGUtOTVcIlxuICAgICAgICAgIHRpdGxlPXtgWndpxJlrc3ogbyAke3N0ZXB9ICR7dW5pdH1gfVxuICAgICAgICA+XG4gICAgICAgICAgPENoZXZyb25VcCBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIERlc2NyaXB0aW9uIHRvb2x0aXAvaGludCAqL31cbiAgICAgIHtkZXNjcmlwdGlvbiAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgei0xMCBtdC0xLjUgdGV4dC1bOXB4XSB0ZXh0LXNsYXRlLTQwMCB0ZXh0LWNlbnRlciBmb250LXNhbnMgbGluZS1jbGFtcC0xIG9wYWNpdHktNzUgZ3JvdXAtaG92ZXI6b3BhY2l0eS0xMDAgdHJhbnNpdGlvbi1vcGFjaXR5XCI+XG4gICAgICAgICAge2Rlc2NyaXB0aW9ufVxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUE4U007QUE5U04sU0FBZ0IsVUFBVSxRQUFRLFdBQVcsYUFBYSxhQUFhO0FBQ3ZFLFNBQWUsV0FBVyxhQUFhLGlCQUFpQjtBQWdCakQsYUFBTSxzQkFBMEQsQ0FBQztBQUFBLEVBQ3RFO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxPQUFPO0FBQUEsRUFDUDtBQUFBLEVBQ0E7QUFBQSxFQUNBLGNBQWM7QUFBQSxFQUNkO0FBQUEsRUFDQSxXQUFXO0FBQUEsRUFDWDtBQUNGLE1BQU07QUFDSixRQUFNLENBQUMsWUFBWSxhQUFhLElBQUksU0FBUyxLQUFLO0FBQ2xELFFBQU0sQ0FBQyxXQUFXLFlBQVksSUFBSSxTQUFTLEtBQUs7QUFDaEQsUUFBTSxVQUFVLE9BQXVCLElBQUk7QUFDM0MsUUFBTSxhQUFhLE9BQWUsQ0FBQztBQUNuQyxRQUFNLGFBQWEsT0FBZSxDQUFDO0FBQ25DLFFBQU0sV0FBVyxPQUFlLEtBQUs7QUFDckMsUUFBTSxhQUFhLE1BQU07QUFHekIsUUFBTSxhQUFhLEtBQUssSUFBSSxL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