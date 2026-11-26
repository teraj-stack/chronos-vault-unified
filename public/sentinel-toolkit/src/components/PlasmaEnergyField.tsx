import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-toolkit/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=019a4779"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-toolkit/node_modules/.vite/deps/react.js?v=019a4779"; const useEffect = __vite__cjsImport1_react["useEffect"]; const useRef = __vite__cjsImport1_react["useRef"]; const useState = __vite__cjsImport1_react["useState"]; const useCallback = __vite__cjsImport1_react["useCallback"];
import { Zap } from "/sentinel-toolkit/node_modules/.vite/deps/lucide-react.js?v=6cbc5a0a";
export const PlasmaEnergyField = () => {
  const canvasRef = useRef(null);
  const [fieldMode, setFieldMode] = useState("normal");
  const [lightningCount, setLightningCount] = useState(0);
  const [isHudVisible, setIsHudVisible] = useState(true);
  const [lastDischargeTime, setLastDischargeTime] = useState("GOTOWY");
  const triggerLightningDischarge = useCallback((targetX, targetY) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("sentinel:plasma-shockwave", {
          detail: { x: targetX, y: targetY }
        })
      );
    }
  }, []);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationFrameId;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    let plasmaTime = 0;
    const expandingRings = [
      { radius: 0, speed: 0.8, maxRadius: Math.max(width, height) * 0.9, phase: 0 },
      { radius: 150, speed: 0.7, maxRadius: Math.max(width, height) * 0.9, phase: 1.5 },
      { radius: 320, speed: 0.6, maxRadius: Math.max(width, height) * 0.9, phase: 3 },
      { radius: 520, speed: 0.5, maxRadius: Math.max(width, height) * 0.9, phase: 4.5 },
      { radius: 720, speed: 0.45, maxRadius: Math.max(width, height) * 0.9, phase: 6 }
    ];
    let activeLightnings = [];
    let sparks = [];
    let shockwaves = [];
    let lastLightningTime = performance.now();
    const createLightningSegments = (x1, y1, x2, y2, displacement, iterations) => {
      let points = [
        { x: x1, y: y1 },
        { x: x2, y: y2 }
      ];
      for (let i = 0; i < iterations; i++) {
        const nextPoints = [];
        for (let j = 0; j < points.length - 1; j++) {
          const p1 = points[j];
          const p2 = points[j + 1];
          const midX = (p1.x + p2.x) / 2;
          const midY = (p1.y + p2.y) / 2;
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const len = Math.hypot(dx, dy);
          const nx = -dy / (len || 1);
          const ny = dx / (len || 1);
          const offset = (Math.random() - 0.5) * displacement;
          const jitterX = midX + nx * offset;
          const jitterY = midY + ny * offset;
          nextPoints.push(p1);
          nextPoints.push({ x: jitterX, y: jitterY });
        }
        nextPoints.push(points[points.length - 1]);
        points = nextPoints;
        displacement *= 0.55;
      }
      return points;
    };
    const spawnLightningBolt = (customTargetX, customTargetY) => {
      const startX = customTargetX !== void 0 ? customTargetX + (Math.random() - 0.5) * 120 : Math.random() * width;
      const startY = 0;
      const endX = customTargetX !== void 0 ? customTargetX : Math.random() * width;
      const endY = customTargetY !== void 0 ? customTargetY : Math.random() * (height * 0.8) + height * 0.2;
      const mainSegments = createLightningSegments(startX, startY, endX, endY, 90, 5);
      activeLightnings.push({
        startX,
        startY,
        endX,
        endY,
        segments: mainSegments,
        alpha: 1,
        width: 3.5,
        color: "#ffffff"
      });
      const branchCount = Math.floor(Math.random() * 3) + 2;
      for (let b = 0; b < branchCount; b++) {
        const randomPointIdx = Math.floor(Math.random() * (mainSegments.length - 2)) + 1;
        const bStart = mainSegments[randomPointIdx];
        const angle = Math.atan2(endY - startY, endX - startX) + (Math.random() - 0.5) * 1.5;
        const branchLen = Math.random() * 160 + 60;
        const bEndX = bStart.x + Math.cos(angle) * branchLen;
        const bEndY = bStart.y + Math.sin(angle) * branchLen;
        activeLightnings.push({
          startX: bStart.x,
          startY: bStart.y,
          endX: bEndX,
          endY: bEndY,
          segments: createLightningSegments(bStart.x, bStart.y, bEndX, bEndY, 40, 4),
          alpha: 0.9,
          width: 1.8,
          color: b % 2 === 0 ? "#38bdf8" : "#c084fc"
        });
      }
      const sparkCount = 20;
      for (let s = 0; s < sparkCount; s++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;
        sparks.push({
          x: endX,
          y: endY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: Math.random() * 0.03 + 0.02,
          size: Math.random() * 2.5 + 1.2,
          color: s % 3 === 0 ? "#ffffff" : s % 3 === 1 ? "#00f0ff" : "#a855f7"
        });
      }
      shockwaves.push({
        x: endX,
        y: endY,
        radius: 5,
        maxRadius: 240,
        speed: 7,
        alpha: 0.9,
        colorType: "white"
      });
      setLightningCount((prev) => prev + 1);
      setLastDischargeTime((/* @__PURE__ */ new Date()).toLocaleTimeString());
    };
    const handleCustomShockwave = (e) => {
      const customEvent = e;
      const targetX = customEvent.detail?.x ?? width / 2;
      const targetY = customEvent.detail?.y ?? height * 0.4;
      spawnLightningBolt(targetX, targetY);
      shockwaves.push({
        x: targetX,
        y: targetY,
        radius: 10,
        maxRadius: 400,
        speed: 9,
        alpha: 1,
        colorType: "blue"
      });
      shockwaves.push({
        x: targetX,
        y: targetY,
        radius: 5,
        maxRadius: 320,
        speed: 6,
        alpha: 0.9,
        colorType: "violet"
      });
    };
    window.addEventListener("sentinel:plasma-shockwave", handleCustomShockwave);
    const render = (timestamp) => {
      plasmaTime += 0.012;
      ctx.clearRect(0, 0, width, height);
      const centerX = width / 2;
      const topY = height * 0.15;
      if (fieldMode !== "minimal") {
        const plasmaPulse = Math.sin(plasmaTime * 1.5) * 0.15 + 0.85;
        const baseGradient = ctx.createRadialGradient(
          centerX,
          topY,
          20,
          centerX,
          topY,
          Math.max(width, height) * 0.85
        );
        baseGradient.addColorStop(0, "rgba(255, 255, 255, 0.08)");
        baseGradient.addColorStop(0.2, "rgba(56, 189, 248, 0.07)");
        baseGradient.addColorStop(0.45, "rgba(139, 92, 246, 0.06)");
        baseGradient.addColorStop(0.75, "rgba(76, 29, 149, 0.03)");
        baseGradient.addColorStop(1, "rgba(2, 6, 23, 0)");
        ctx.fillStyle = baseGradient;
        ctx.fillRect(0, 0, width, height);
        expandingRings.forEach((ring) => {
          ring.radius += ring.speed;
          if (ring.radius > ring.maxRadius) {
            ring.radius = 0;
          }
          const progress = ring.radius / ring.maxRadius;
          const ringAlpha = Math.sin(progress * Math.PI) * 0.45 * plasmaPulse;
          if (ringAlpha > 0.01) {
            ctx.save();
            ctx.beginPath();
            ctx.ellipse(centerX, topY + ring.radius * 0.25, ring.radius, ring.radius * 0.65, 0, 0, Math.PI * 2);
            const ringGradient = ctx.createLinearGradient(0, topY, width, topY + ring.radius);
            ringGradient.addColorStop(0, `rgba(255, 255, 255, ${ringAlpha * 0.85})`);
            ringGradient.addColorStop(0.35, `rgba(56, 189, 248, ${ringAlpha * 0.95})`);
            ringGradient.addColorStop(0.7, `rgba(168, 85, 247, ${ringAlpha * 0.9})`);
            ringGradient.addColorStop(1, `rgba(76, 29, 149, ${ringAlpha * 0.4})`);
            ctx.strokeStyle = ringGradient;
            ctx.lineWidth = 1.5 + Math.sin(plasmaTime + ring.phase) * 0.8;
            ctx.shadowBlur = 16;
            ctx.shadowColor = "#8b5cf6";
            ctx.stroke();
            ctx.restore();
          }
        });
        const leftNodeGradient = ctx.createRadialGradient(80, height * 0.4, 10, 80, height * 0.4, 300);
        leftNodeGradient.addColorStop(0, "rgba(0, 240, 255, 0.07)");
        leftNodeGradient.addColorStop(0.5, "rgba(124, 58, 237, 0.04)");
        leftNodeGradient.addColorStop(1, "transparent");
        ctx.fillStyle = leftNodeGradient;
        ctx.fillRect(0, height * 0.1, 400, height * 0.7);
        const rightNodeGradient = ctx.createRadialGradient(width - 80, height * 0.4, 10, width - 80, height * 0.4, 300);
        rightNodeGradient.addColorStop(0, "rgba(192, 132, 252, 0.08)");
        rightNodeGradient.addColorStop(0.5, "rgba(56, 189, 248, 0.04)");
        rightNodeGradient.addColorStop(1, "transparent");
        ctx.fillStyle = rightNodeGradient;
        ctx.fillRect(width - 400, height * 0.1, 400, height * 0.7);
      }
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += sw.speed;
        sw.alpha -= 0.018;
        if (sw.alpha <= 0 || sw.radius >= sw.maxRadius) {
          shockwaves.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        let strokeColor = `rgba(255, 255, 255, ${sw.alpha})`;
        let glowColor = "#ffffff";
        if (sw.colorType === "blue") {
          strokeColor = `rgba(56, 189, 248, ${sw.alpha})`;
          glowColor = "#00f0ff";
        } else if (sw.colorType === "violet") {
          strokeColor = `rgba(168, 85, 247, ${sw.alpha})`;
          glowColor = "#a855f7";
        }
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = Math.max(1, (1 - sw.radius / sw.maxRadius) * 4);
        ctx.shadowBlur = 18;
        ctx.shadowColor = glowColor;
        ctx.stroke();
        ctx.restore();
      }
      const interval = fieldMode === "surge" ? 1200 : fieldMode === "minimal" ? 8e3 : 3200;
      if (timestamp - lastLightningTime > interval) {
        lastLightningTime = timestamp;
        spawnLightningBolt();
      }
      for (let i = activeLightnings.length - 1; i >= 0; i--) {
        const bolt = activeLightnings[i];
        bolt.alpha -= 0.045;
        if (bolt.alpha <= 0) {
          activeLightnings.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.beginPath();
        if (bolt.segments.length > 0) {
          ctx.moveTo(bolt.segments[0].x, bolt.segments[0].y);
          for (let p = 1; p < bolt.segments.length; p++) {
            ctx.lineTo(bolt.segments[p].x, bolt.segments[p].y);
          }
        }
        ctx.strokeStyle = `rgba(168, 85, 247, ${bolt.alpha * 0.5})`;
        ctx.lineWidth = bolt.width * 3.5;
        ctx.shadowBlur = 24;
        ctx.shadowColor = "#c084fc";
        ctx.stroke();
        ctx.strokeStyle = `rgba(56, 189, 248, ${bolt.alpha * 0.8})`;
        ctx.lineWidth = bolt.width * 1.6;
        ctx.shadowBlur = 14;
        ctx.shadowColor = "#00f0ff";
        ctx.stroke();
        ctx.strokeStyle = `rgba(255, 255, 255, ${bolt.alpha})`;
        ctx.lineWidth = Math.max(1, bolt.width * 0.6);
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#ffffff";
        ctx.stroke();
        ctx.restore();
      }
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.94;
        s.vy *= 0.94;
        s.alpha -= s.decay;
        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      animationFrameId = requestAnimationFrame(render);
    };
    animationFrameId = requestAnimationFrame(render);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("sentinel:plasma-shockwave", handleCustomShockwave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [fieldMode]);
  return /* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV(
      "canvas",
      {
        ref: canvasRef,
        className: "fixed inset-0 pointer-events-none z-0",
        style: { opacity: fieldMode === "minimal" ? 0.35 : 0.92 }
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/components/PlasmaEnergyField.tsx",
        lineNumber: 443,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV("div", { className: "fixed bottom-4 left-4 z-40 hidden sm:block", children: /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-2xl bg-slate-950/85 backdrop-blur-xl border border-purple-500/40 shadow-2xl shadow-purple-950/60 font-mono text-xs text-slate-300 space-y-2 max-w-xs transition-all", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between gap-3 border-b border-purple-900/50 pb-1.5", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "relative flex h-2.5 w-2.5", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" }, void 0, false, {
              fileName: "/app/applet/src/components/PlasmaEnergyField.tsx",
              lineNumber: 455,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" }, void 0, false, {
              fileName: "/app/applet/src/components/PlasmaEnergyField.tsx",
              lineNumber: 456,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PlasmaEnergyField.tsx",
            lineNumber: 454,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-white text-[11px] tracking-wide flex items-center gap-1", children: [
            /* @__PURE__ */ jsxDEV(Zap, { className: "w-3.5 h-3.5 text-cyan-400 animate-pulse" }, void 0, false, {
              fileName: "/app/applet/src/components/PlasmaEnergyField.tsx",
              lineNumber: 459,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "POLE PLAZMOWE & BŁYSKAWICE" }, void 0, false, {
              fileName: "/app/applet/src/components/PlasmaEnergyField.tsx",
              lineNumber: 460,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PlasmaEnergyField.tsx",
            lineNumber: 458,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PlasmaEnergyField.tsx",
          lineNumber: 453,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setIsHudVisible(!isHudVisible),
            className: "text-[10px] text-purple-300 hover:text-white px-1.5 py-0.5 rounded bg-purple-950/70 border border-purple-800/50 cursor-pointer",
            children: isHudVisible ? "Zwiń" : "Opcje"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/PlasmaEnergyField.tsx",
            lineNumber: 464,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PlasmaEnergyField.tsx",
        lineNumber: 452,
        columnNumber: 11
      }, this),
      isHudVisible && /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 pt-1 text-[11px]", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-slate-400", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "Widmo energii:" }, void 0, false, {
            fileName: "/app/applet/src/components/PlasmaEnergyField.tsx",
            lineNumber: 475,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-white font-bold text-[10px] flex items-center gap-1", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-white inline-block shadow-[0_0_8px_#fff]", title: "Biały" }, void 0, false, {
              fileName: "/app/applet/src/components/PlasmaEnergyField.tsx",
              lineNumber: 477,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-cyan-400 inline-block shadow-[0_0_8px_#38bdf8]", title: "Niebieski" }, void 0, false, {
              fileName: "/app/applet/src/components/PlasmaEnergyField.tsx",
              lineNumber: 478,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-purple-500 inline-block shadow-[0_0_8px_#a855f7]", title: "Fioletowy" }, void 0, false, {
              fileName: "/app/applet/src/components/PlasmaEnergyField.tsx",
              lineNumber: 479,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Biało-Niebiesko-Fioletowe" }, void 0, false, {
              fileName: "/app/applet/src/components/PlasmaEnergyField.tsx",
              lineNumber: 480,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PlasmaEnergyField.tsx",
            lineNumber: 476,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PlasmaEnergyField.tsx",
          lineNumber: 474,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-slate-400", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "Wyładowania łukowe:" }, void 0, false, {
            fileName: "/app/applet/src/components/PlasmaEnergyField.tsx",
            lineNumber: 485,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-300 font-bold", children: [
            lightningCount,
            " impulsów"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PlasmaEnergyField.tsx",
            lineNumber: 486,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PlasmaEnergyField.tsx",
          lineNumber: 484,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-slate-400", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "Ostatni łuk:" }, void 0, false, {
            fileName: "/app/applet/src/components/PlasmaEnergyField.tsx",
            lineNumber: 490,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-purple-300", children: lastDischargeTime }, void 0, false, {
            fileName: "/app/applet/src/components/PlasmaEnergyField.tsx",
            lineNumber: 491,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PlasmaEnergyField.tsx",
          lineNumber: 489,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-3 gap-1 pt-1", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setFieldMode("minimal"),
              className: `py-1 px-1 rounded-lg text-center text-[10px] font-bold border transition-all cursor-pointer ${fieldMode === "minimal" ? "bg-purple-900/60 border-purple-500 text-white shadow-sm" : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"}`,
              children: "Dyskretne"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/PlasmaEnergyField.tsx",
              lineNumber: 496,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setFieldMode("normal"),
              className: `py-1 px-1 rounded-lg text-center text-[10px] font-bold border transition-all cursor-pointer ${fieldMode === "normal" ? "bg-cyan-900/60 border-cyan-400 text-white shadow-sm" : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"}`,
              children: "Normalne"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/PlasmaEnergyField.tsx",
              lineNumber: 506,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setFieldMode("surge"),
              className: `py-1 px-1 rounded-lg text-center text-[10px] font-bold border transition-all cursor-pointer ${fieldMode === "surge" ? "bg-red-900/60 border-red-500 text-white shadow-sm" : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"}`,
              children: "Burza"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/PlasmaEnergyField.tsx",
              lineNumber: 516,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PlasmaEnergyField.tsx",
          lineNumber: 495,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => triggerLightningDischarge(),
            className: "w-full mt-2 py-1.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-950/50 border border-cyan-300/60 transition-all cursor-pointer active:scale-95 relative overflow-hidden group",
            children: [
              /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-white/45 via-white/15 to-transparent pointer-events-none rounded-t-xl" }, void 0, false, {
                fileName: "/app/applet/src/components/PlasmaEnergyField.tsx",
                lineNumber: 534,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 w-1/3 bg-white/25 -skew-x-12 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-700 pointer-events-none" }, void 0, false, {
                fileName: "/app/applet/src/components/PlasmaEnergyField.tsx",
                lineNumber: 536,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV(Zap, { className: "w-3.5 h-3.5 text-yellow-200 animate-bounce" }, void 0, false, {
                fileName: "/app/applet/src/components/PlasmaEnergyField.tsx",
                lineNumber: 537,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "relative z-10", children: "Wyładuj Błyskawicę Plazmową" }, void 0, false, {
                fileName: "/app/applet/src/components/PlasmaEnergyField.tsx",
                lineNumber: 538,
                columnNumber: 17
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/PlasmaEnergyField.tsx",
            lineNumber: 529,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PlasmaEnergyField.tsx",
        lineNumber: 473,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/PlasmaEnergyField.tsx",
      lineNumber: 451,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/PlasmaEnergyField.tsx",
      lineNumber: 450,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/PlasmaEnergyField.tsx",
    lineNumber: 441,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBsYXNtYUVuZXJneUZpZWxkLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlLCB1c2VDYWxsYmFjayB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFphcCwgQWN0aXZpdHksIFNwYXJrbGVzLCBTbGlkZXJzLCBTaGllbGQgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuXG5pbnRlcmZhY2UgTGlnaHRuaW5nQnJhbmNoIHtcbiAgc3RhcnRYOiBudW1iZXI7XG4gIHN0YXJ0WTogbnVtYmVyO1xuICBlbmRYOiBudW1iZXI7XG4gIGVuZFk6IG51bWJlcjtcbiAgc2VnbWVudHM6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfVtdO1xuICBhbHBoYTogbnVtYmVyO1xuICB3aWR0aDogbnVtYmVyO1xuICBjb2xvcjogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgU3Bhcmsge1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcbiAgdng6IG51bWJlcjtcbiAgdnk6IG51bWJlcjtcbiAgYWxwaGE6IG51bWJlcjtcbiAgZGVjYXk6IG51bWJlcjtcbiAgc2l6ZTogbnVtYmVyO1xuICBjb2xvcjogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgU2hvY2t3YXZlIHtcbiAgeDogbnVtYmVyO1xuICB5OiBudW1iZXI7XG4gIHJhZGl1czogbnVtYmVyO1xuICBtYXhSYWRpdXM6IG51bWJlcjtcbiAgc3BlZWQ6IG51bWJlcjtcbiAgYWxwaGE6IG51bWJlcjtcbiAgY29sb3JUeXBlOiAnd2hpdGUnIHwgJ2JsdWUnIHwgJ3Zpb2xldCc7XG59XG5cbmV4cG9ydCBjb25zdCBQbGFzbWFFbmVyZ3lGaWVsZDogUmVhY3QuRkMgPSAoKSA9PiB7XG4gIGNvbnN0IGNhbnZhc1JlZiA9IHVzZVJlZjxIVE1MQ2FudmFzRWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbZmllbGRNb2RlLCBzZXRGaWVsZE1vZGVdID0gdXNlU3RhdGU8J25vcm1hbCcgfCAnc3VyZ2UnIHwgJ21pbmltYWwnPignbm9ybWFsJyk7XG4gIGNvbnN0IFtsaWdodG5pbmdDb3VudCwgc2V0TGlnaHRuaW5nQ291bnRdID0gdXNlU3RhdGU8bnVtYmVyPigwKTtcbiAgY29uc3QgW2lzSHVkVmlzaWJsZSwgc2V0SXNIdWRWaXNpYmxlXSA9IHVzZVN0YXRlPGJvb2xlYW4+KHRydWUpO1xuICBjb25zdCBbbGFzdERpc2NoYXJnZVRpbWUsIHNldExhc3REaXNjaGFyZ2VUaW1lXSA9IHVzZVN0YXRlPHN0cmluZz4oJ0dPVE9XWScpO1xuXG4gIC8vIFRyaWdnZXIgbWFudWFsIGxpZ2h0bmluZyBzaG9ja3dhdmVcbiAgY29uc3QgdHJpZ2dlckxpZ2h0bmluZ0Rpc2NoYXJnZSA9IHVzZUNhbGxiYWNrKCh0YXJnZXRYPzogbnVtYmVyLCB0YXJnZXRZPzogbnVtYmVyKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdzZW50aW5lbDpwbGFzbWEtc2hvY2t3YXZlJywge1xuICAgICAgICAgIGRldGFpbDogeyB4OiB0YXJnZXRYLCB5OiB0YXJnZXRZIH1cbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuICB9LCBbXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBjYW52YXMgPSBjYW52YXNSZWYuY3VycmVudDtcbiAgICBpZiAoIWNhbnZhcykgcmV0dXJuO1xuXG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgaWYgKCFjdHgpIHJldHVybjtcblxuICAgIGxldCBhbmltYXRpb25GcmFtZUlkOiBudW1iZXI7XG4gICAgbGV0IHdpZHRoID0gKGNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoKTtcbiAgICBsZXQgaGVpZ2h0ID0gKGNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuXG4gICAgY29uc3QgaGFuZGxlUmVzaXplID0gKCkgPT4ge1xuICAgICAgaWYgKCFjYW52YXMpIHJldHVybjtcbiAgICAgIHdpZHRoID0gY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICBoZWlnaHQgPSBjYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlUmVzaXplKTtcblxuICAgIC8vIEVuZXJneSBGaWVsZCBQbGFzbWEgV2F2ZXMgU3RhdGVcbiAgICBsZXQgcGxhc21hVGltZSA9IDA7XG4gICAgY29uc3QgZXhwYW5kaW5nUmluZ3M6IHsgcmFkaXVzOiBudW1iZXI7IHNwZWVkOiBudW1iZXI7IG1heFJhZGl1czogbnVtYmVyOyBwaGFzZTogbnVtYmVyIH1bXSA9IFtcbiAgICAgIHsgcmFkaXVzOiAwLCBzcGVlZDogMC44LCBtYXhSYWRpdXM6IE1hdGgubWF4KHdpZHRoLCBoZWlnaHQpICogMC45LCBwaGFzZTogMCB9LFxuICAgICAgeyByYWRpdXM6IDE1MCwgc3BlZWQ6IDAuNywgbWF4UmFkaXVzOiBNYXRoLm1heCh3aWR0aCwgaGVpZ2h0KSAqIDAuOSwgcGhhc2U6IDEuNSB9LFxuICAgICAgeyByYWRpdXM6IDMyMCwgc3BlZWQ6IDAuNiwgbWF4UmFkaXVzOiBNYXRoLm1heCh3aWR0aCwgaGVpZ2h0KSAqIDAuOSwgcGhhc2U6IDMuMCB9LFxuICAgICAgeyByYWRpdXM6IDUyMCwgc3BlZWQ6IDAuNSwgbWF4UmFkaXVzOiBNYXRoLm1heCh3aWR0aCwgaGVpZ2h0KSAqIDAuOSwgcGhhc2U6IDQuNSB9LFxuICAgICAgeyByYWRpdXM6IDcyMCwgc3BlZWQ6IDAuNDUsIG1heFJhZGl1czogTWF0aC5tYXgod2lkdGgsIGhlaWdodCkgKiAwLjksIHBoYXNlOiA2LjAgfSxcbiAgICBdO1xuXG4gICAgLy8gTGlnaHRuaW5nIEFyY3MgJiBTcGFya3MgU3RhdGVcbiAgICBsZXQgYWN0aXZlTGlnaHRuaW5nczogTGlnaHRuaW5nQnJhbmNoW10gPSBbXTtcbiAgICBsZXQgc3BhcmtzOiBTcGFya1tdID0gW107XG4gICAgbGV0IHNob2Nrd2F2ZXM6IFNob2Nrd2F2ZVtdID0gW107XG4gICAgbGV0IGxhc3RMaWdodG5pbmdUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cbiAgICAvLyBNaWRwb2ludCBkaXNwbGFjZW1lbnQgYWxnb3JpdGhtIGZvciBvcmdhbmljIGVsZWN0cmljIGFyY3NcbiAgICBjb25zdCBjcmVhdGVMaWdodG5pbmdTZWdtZW50cyA9IChcbiAgICAgIHgxOiBudW1iZXIsXG4gICAgICB5MTogbnVtYmVyLFxuICAgICAgeDI6IG51bWJlcixcbiAgICAgIHkyOiBudW1iZXIsXG4gICAgICBkaXNwbGFjZW1lbnQ6IG51bWJlcixcbiAgICAgIGl0ZXJhdGlvbnM6IG51bWJlclxuICAgICk6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfVtdID0+IHtcbiAgICAgIGxldCBwb2ludHMgPSBbXG4gICAgICAgIHsgeDogeDEsIHk6IHkxIH0sXG4gICAgICAgIHsgeDogeDIsIHk6IHkyIH1cbiAgICAgIF07XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlcmF0aW9uczsgaSsrKSB7XG4gICAgICAgIGNvbnN0IG5leHRQb2ludHM6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfVtdID0gW107XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcG9pbnRzLmxlbmd0aCAtIDE7IGorKykge1xuICAgICAgICAgIGNvbnN0IHAxID0gcG9pbnRzW2pdO1xuICAgICAgICAgIGNvbnN0IHAyID0gcG9pbnRzW2ogKyAxXTtcbiAgICAgICAgICBjb25zdCBtaWRYID0gKHAxLnggKyBwMi54KSAvIDI7XG4gICAgICAgICAgY29uc3QgbWlkWSA9IChwMS55ICsgcDIueSkgLyAyO1xuXG4gICAgICAgICAgLy8gTm9ybWFsIHZlY3RvciBmb3Igaml0dGVyXG4gICAgICAgICAgY29uc3QgZHggPSBwMi54IC0gcDEueDtcbiAgICAgICAgICBjb25zdCBkeSA9IHAyLnkgLSBwMS55O1xuICAgICAgICAgIGNvbnN0IGxlbiA9IE1hdGguaHlwb3QoZHgsIGR5KTtcbiAgICAgICAgICBjb25zdCBueCA9IC1keSAvIChsZW4gfHwgMSk7XG4gICAgICAgICAgY29uc3QgbnkgPSBkeCAvIChsZW4gfHwgMSk7XG5cbiAgICAgICAgICBjb25zdCBvZmZzZXQgPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiBkaXNwbGFjZW1lbnQ7XG4gICAgICAgICAgY29uc3Qgaml0dGVyWCA9IG1pZFggKyBueCAqIG9mZnNldDtcbiAgICAgICAgICBjb25zdCBqaXR0ZXJZID0gbWlkWSArIG55ICogb2Zmc2V0O1xuXG4gICAgICAgICAgbmV4dFBvaW50cy5wdXNoKHAxKTtcbiAgICAgICAgICBuZXh0UG9pbnRzLnB1c2goeyB4OiBqaXR0ZXJYLCB5OiBqaXR0ZXJZIH0pO1xuICAgICAgICB9XG4gICAgICAgIG5leHRQb2ludHMucHVzaChwb2ludHNbcG9pbnRzLmxlbmd0aCAtIDFdKTtcbiAgICAgICAgcG9pbnRzID0gbmV4dFBvaW50cztcbiAgICAgICAgZGlzcGxhY2VtZW50ICo9IDAuNTU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwb2ludHM7XG4gICAgfTtcblxuICAgIGNvbnN0IHNwYXduTGlnaHRuaW5nQm9sdCA9IChjdXN0b21UYXJnZXRYPzogbnVtYmVyLCBjdXN0b21UYXJnZXRZPzogbnVtYmVyKSA9PiB7XG4gICAgICAvLyBFbWl0dGVyIGNhbiBiZSB0b3AgYmFyIG9yIHNjcmVlbiBlZGdlc1xuICAgICAgY29uc3Qgc3RhcnRYID0gY3VzdG9tVGFyZ2V0WCAhPT0gdW5kZWZpbmVkID8gY3VzdG9tVGFyZ2V0WCArIChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDEyMCA6IE1hdGgucmFuZG9tKCkgKiB3aWR0aDtcbiAgICAgIGNvbnN0IHN0YXJ0WSA9IDA7XG4gICAgICBjb25zdCBlbmRYID0gY3VzdG9tVGFyZ2V0WCAhPT0gdW5kZWZpbmVkID8gY3VzdG9tVGFyZ2V0WCA6IE1hdGgucmFuZG9tKCkgKiB3aWR0aDtcbiAgICAgIGNvbnN0IGVuZFkgPSBjdXN0b21UYXJnZXRZICE9PSB1bmRlZmluZWQgPyBjdXN0b21UYXJnZXRZIDogTWF0aC5yYW5kb20oKSAqIChoZWlnaHQgKiAwLjgpICsgaGVpZ2h0ICogMC4yO1xuXG4gICAgICBjb25zdCBtYWluU2VnbWVudHMgPSBjcmVhdGVMaWdodG5pbmdTZWdtZW50cyhzdGFydFgsIHN0YXJ0WSwgZW5kWCwgZW5kWSwgOTAsIDUpO1xuXG4gICAgICAvLyBNYWluIFdoaXRlLUN5YW4gVHJ1bmtcbiAgICAgIGFjdGl2ZUxpZ2h0bmluZ3MucHVzaCh7XG4gICAgICAgIHN0YXJ0WCxcbiAgICAgICAgc3RhcnRZLFxuICAgICAgICBlbmRYLFxuICAgICAgICBlbmRZLFxuICAgICAgICBzZWdtZW50czogbWFpblNlZ21lbnRzLFxuICAgICAgICBhbHBoYTogMS4wLFxuICAgICAgICB3aWR0aDogMy41LFxuICAgICAgICBjb2xvcjogJyNmZmZmZmYnXG4gICAgICB9KTtcblxuICAgICAgLy8gU3ViLWJyYW5jaGVzIGluIG5lb24gY3lhbiAmIHZpb2xldFxuICAgICAgY29uc3QgYnJhbmNoQ291bnQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAzKSArIDI7XG4gICAgICBmb3IgKGxldCBiID0gMDsgYiA8IGJyYW5jaENvdW50OyBiKyspIHtcbiAgICAgICAgY29uc3QgcmFuZG9tUG9pbnRJZHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWFpblNlZ21lbnRzLmxlbmd0aCAtIDIpKSArIDE7XG4gICAgICAgIGNvbnN0IGJTdGFydCA9IG1haW5TZWdtZW50c1tyYW5kb21Qb2ludElkeF07XG4gICAgICAgIGNvbnN0IGFuZ2xlID0gTWF0aC5hdGFuMihlbmRZIC0gc3RhcnRZLCBlbmRYIC0gc3RhcnRYKSArIChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDEuNTtcbiAgICAgICAgY29uc3QgYnJhbmNoTGVuID0gTWF0aC5yYW5kb20oKSAqIDE2MCArIDYwO1xuICAgICAgICBjb25zdCBiRW5kWCA9IGJTdGFydC54ICsgTWF0aC5jb3MoYW5nbGUpICogYnJhbmNoTGVuO1xuICAgICAgICBjb25zdCBiRW5kWSA9IGJTdGFydC55ICsgTWF0aC5zaW4oYW5nbGUpICogYnJhbmNoTGVuO1xuXG4gICAgICAgIGFjdGl2ZUxpZ2h0bmluZ3MucHVzaCh7XG4gICAgICAgICAgc3RhcnRYOiBiU3RhcnQueCxcbiAgICAgICAgICBzdGFydFk6IGJTdGFydC55LFxuICAgICAgICAgIGVuZFg6IGJFbmRYLFxuICAgICAgICAgIGVuZFk6IGJFbmRZLFxuICAgICAgICAgIHNlZ21lbnRzOiBjcmVhdGVMaWdodG5pbmdTZWdtZW50cyhiU3RhcnQueCwgYlN0YXJ0LnksIGJFbmRYLCBiRW5kWSwgNDAsIDQpLFxuICAgICAgICAgIGFscGhhOiAwLjksXG4gICAgICAgICAgd2lkdGg6IDEuOCxcbiAgICAgICAgICBjb2xvcjogYiAlIDIgPT09IDAgPyAnIzM4YmRmOCcgOiAnI2MwODRmYydcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFNwYXduIGVsZWN0cmljYWwgc3BhcmtzIGF0IHRoZSBpbXBhY3QgbG9jYXRpb25cbiAgICAgIGNvbnN0IHNwYXJrQ291bnQgPSAyMDtcbiAgICAgIGZvciAobGV0IHMgPSAwOyBzIDwgc3BhcmtDb3VudDsgcysrKSB7XG4gICAgICAgIGNvbnN0IGFuZ2xlID0gTWF0aC5yYW5kb20oKSAqIE1hdGguUEkgKiAyO1xuICAgICAgICBjb25zdCBzcGVlZCA9IE1hdGgucmFuZG9tKCkgKiA2ICsgMjtcbiAgICAgICAgc3BhcmtzLnB1c2goe1xuICAgICAgICAgIHg6IGVuZFgsXG4gICAgICAgICAgeTogZW5kWSxcbiAgICAgICAgICB2eDogTWF0aC5jb3MoYW5nbGUpICogc3BlZWQsXG4gICAgICAgICAgdnk6IE1hdGguc2luKGFuZ2xlKSAqIHNwZWVkLFxuICAgICAgICAgIGFscGhhOiAxLjAsXG4gICAgICAgICAgZGVjYXk6IE1hdGgucmFuZG9tKCkgKiAwLjAzICsgMC4wMixcbiAgICAgICAgICBzaXplOiBNYXRoLnJhbmRvbSgpICogMi41ICsgMS4yLFxuICAgICAgICAgIGNvbG9yOiBzICUgMyA9PT0gMCA/ICcjZmZmZmZmJyA6IHMgJSAzID09PSAxID8gJyMwMGYwZmYnIDogJyNhODU1ZjcnXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBBZGQgc2hvY2t3YXZlIHJpbmcgYXQgcG9pbnRcbiAgICAgIHNob2Nrd2F2ZXMucHVzaCh7XG4gICAgICAgIHg6IGVuZFgsXG4gICAgICAgIHk6IGVuZFksXG4gICAgICAgIHJhZGl1czogNSxcbiAgICAgICAgbWF4UmFkaXVzOiAyNDAsXG4gICAgICAgIHNwZWVkOiA3LFxuICAgICAgICBhbHBoYTogMC45LFxuICAgICAgICBjb2xvclR5cGU6ICd3aGl0ZSdcbiAgICAgIH0pO1xuXG4gICAgICBzZXRMaWdodG5pbmdDb3VudChwcmV2ID0+IHByZXYgKyAxKTtcbiAgICAgIHNldExhc3REaXNjaGFyZ2VUaW1lKG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCkpO1xuICAgIH07XG5cbiAgICAvLyBDdXN0b20gc2hvY2t3YXZlIGV2ZW50IGxpc3RlbmVyXG4gICAgY29uc3QgaGFuZGxlQ3VzdG9tU2hvY2t3YXZlID0gKGU6IEV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBjdXN0b21FdmVudCA9IGUgYXMgQ3VzdG9tRXZlbnQ7XG4gICAgICBjb25zdCB0YXJnZXRYID0gY3VzdG9tRXZlbnQuZGV0YWlsPy54ID8/IHdpZHRoIC8gMjtcbiAgICAgIGNvbnN0IHRhcmdldFkgPSBjdXN0b21FdmVudC5kZXRhaWw/LnkgPz8gaGVpZ2h0ICogMC40O1xuICAgICAgc3Bhd25MaWdodG5pbmdCb2x0KHRhcmdldFgsIHRhcmdldFkpO1xuXG4gICAgICAvLyBUcmlnZ2VyIGludGVuc2UgcmFkaWFsIHBsYXNtYSBidXJzdFxuICAgICAgc2hvY2t3YXZlcy5wdXNoKHtcbiAgICAgICAgeDogdGFyZ2V0WCxcbiAgICAgICAgeTogdGFyZ2V0WSxcbiAgICAgICAgcmFkaXVzOiAxMCxcbiAgICAgICAgbWF4UmFkaXVzOiA0MDAsXG4gICAgICAgIHNwZWVkOiA5LFxuICAgICAgICBhbHBoYTogMS4wLFxuICAgICAgICBjb2xvclR5cGU6ICdibHVlJ1xuICAgICAgfSk7XG4gICAgICBzaG9ja3dhdmVzLnB1c2goe1xuICAgICAgICB4OiB0YXJnZXRYLFxuICAgICAgICB5OiB0YXJnZXRZLFxuICAgICAgICByYWRpdXM6IDUsXG4gICAgICAgIG1heFJhZGl1czogMzIwLFxuICAgICAgICBzcGVlZDogNixcbiAgICAgICAgYWxwaGE6IDAuOSxcbiAgICAgICAgY29sb3JUeXBlOiAndmlvbGV0J1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzZW50aW5lbDpwbGFzbWEtc2hvY2t3YXZlJywgaGFuZGxlQ3VzdG9tU2hvY2t3YXZlKTtcblxuICAgIC8vIE1haW4gYW5pbWF0aW9uIGxvb3BcbiAgICBjb25zdCByZW5kZXIgPSAodGltZXN0YW1wOiBudW1iZXIpID0+IHtcbiAgICAgIHBsYXNtYVRpbWUgKz0gMC4wMTI7XG5cbiAgICAgIC8vIENsZWFyIHdpdGggZGFyayB2b2lkXG4gICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgICAvLyAxLiBEWU5BTUlDIEFNQklFTlQgUExBU01BIEVORVJHWSBXQVZFUyAoV2hpdGUsIEJsdWUsIFZpb2xldClcbiAgICAgIGNvbnN0IGNlbnRlclggPSB3aWR0aCAvIDI7XG4gICAgICBjb25zdCB0b3BZID0gaGVpZ2h0ICogMC4xNTsgLy8gRm9jYWwgYXBleCBuZWFyIHRoZSBoZWFkZXIgY29uZHVpdFxuXG4gICAgICAvLyBTbG93bHkgb3NjaWxsYXRpbmcgYW1iaWVudCBwbGFzbWEgZmllbGRcbiAgICAgIGlmIChmaWVsZE1vZGUgIT09ICdtaW5pbWFsJykge1xuICAgICAgICBjb25zdCBwbGFzbWFQdWxzZSA9IE1hdGguc2luKHBsYXNtYVRpbWUgKiAxLjUpICogMC4xNSArIDAuODU7XG5cbiAgICAgICAgLy8gQmFzZSBwbGFzbWEgcmFkaWFudCBhdXJhIChEZWVwIFZpb2xldCAmIFJveWFsIEJsdWUgQ29yZSlcbiAgICAgICAgY29uc3QgYmFzZUdyYWRpZW50ID0gY3R4LmNyZWF0ZVJhZGlhbEdyYWRpZW50KFxuICAgICAgICAgIGNlbnRlclgsXG4gICAgICAgICAgdG9wWSxcbiAgICAgICAgICAyMCxcbiAgICAgICAgICBjZW50ZXJYLFxuICAgICAgICAgIHRvcFksXG4gICAgICAgICAgTWF0aC5tYXgod2lkdGgsIGhlaWdodCkgKiAwLjg1XG4gICAgICAgICk7XG4gICAgICAgIGJhc2VHcmFkaWVudC5hZGRDb2xvclN0b3AoMCwgJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4wOCknKTtcbiAgICAgICAgYmFzZUdyYWRpZW50LmFkZENvbG9yU3RvcCgwLjIsICdyZ2JhKDU2LCAxODksIDI0OCwgMC4wNyknKTtcbiAgICAgICAgYmFzZUdyYWRpZW50LmFkZENvbG9yU3RvcCgwLjQ1LCAncmdiYSgxMzksIDkyLCAyNDYsIDAuMDYpJyk7XG4gICAgICAgIGJhc2VHcmFkaWVudC5hZGRDb2xvclN0b3AoMC43NSwgJ3JnYmEoNzYsIDI5LCAxNDksIDAuMDMpJyk7XG4gICAgICAgIGJhc2VHcmFkaWVudC5hZGRDb2xvclN0b3AoMSwgJ3JnYmEoMiwgNiwgMjMsIDApJyk7XG5cbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGJhc2VHcmFkaWVudDtcbiAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgICAgIC8vIFNsb3dseSBleHBhbmRpbmcgZW5lcmd5IHJpbmdzIChCaWHFgm8tTmllYmllc2tvLUZpb2xldG93ZSBmYWxlKVxuICAgICAgICBleHBhbmRpbmdSaW5ncy5mb3JFYWNoKHJpbmcgPT4ge1xuICAgICAgICAgIHJpbmcucmFkaXVzICs9IHJpbmcuc3BlZWQ7XG4gICAgICAgICAgaWYgKHJpbmcucmFkaXVzID4gcmluZy5tYXhSYWRpdXMpIHtcbiAgICAgICAgICAgIHJpbmcucmFkaXVzID0gMDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBwcm9ncmVzcyA9IHJpbmcucmFkaXVzIC8gcmluZy5tYXhSYWRpdXM7XG4gICAgICAgICAgLy8gRmFkZSBpbiBhdCBjZW50ZXIsIHN0cm9uZ2VzdCBhdCBtaWQtZXhwYW5zaW9uLCBkaXNzaXBhdGUgc21vb3RobHkgYXQgcGVyaW1ldGVyXG4gICAgICAgICAgY29uc3QgcmluZ0FscGhhID0gTWF0aC5zaW4ocHJvZ3Jlc3MgKiBNYXRoLlBJKSAqIDAuNDUgKiBwbGFzbWFQdWxzZTtcblxuICAgICAgICAgIGlmIChyaW5nQWxwaGEgPiAwLjAxKSB7XG4gICAgICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgLy8gU3VidGxlIGVsbGlwdGljYWwgc3RyZXRjaGluZyBmb3IgZHJhbWF0aWMgaG9yaXpvbiBwZXJzcGVjdGl2ZVxuICAgICAgICAgICAgY3R4LmVsbGlwc2UoY2VudGVyWCwgdG9wWSArIHJpbmcucmFkaXVzICogMC4yNSwgcmluZy5yYWRpdXMsIHJpbmcucmFkaXVzICogMC42NSwgMCwgMCwgTWF0aC5QSSAqIDIpO1xuXG4gICAgICAgICAgICBjb25zdCByaW5nR3JhZGllbnQgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgdG9wWSwgd2lkdGgsIHRvcFkgKyByaW5nLnJhZGl1cyk7XG4gICAgICAgICAgICByaW5nR3JhZGllbnQuYWRkQ29sb3JTdG9wKDAsIGByZ2JhKDI1NSwgMjU1LCAyNTUsICR7cmluZ0FscGhhICogMC44NX0pYCk7XG4gICAgICAgICAgICByaW5nR3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuMzUsIGByZ2JhKDU2LCAxODksIDI0OCwgJHtyaW5nQWxwaGEgKiAwLjk1fSlgKTtcbiAgICAgICAgICAgIHJpbmdHcmFkaWVudC5hZGRDb2xvclN0b3AoMC43LCBgcmdiYSgxNjgsIDg1LCAyNDcsICR7cmluZ0FscGhhICogMC45fSlgKTtcbiAgICAgICAgICAgIHJpbmdHcmFkaWVudC5hZGRDb2xvclN0b3AoMSwgYHJnYmEoNzYsIDI5LCAxNDksICR7cmluZ0FscGhhICogMC40fSlgKTtcblxuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gcmluZ0dyYWRpZW50O1xuICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDEuNSArIE1hdGguc2luKHBsYXNtYVRpbWUgKyByaW5nLnBoYXNlKSAqIDAuODtcbiAgICAgICAgICAgIGN0eC5zaGFkb3dCbHVyID0gMTY7XG4gICAgICAgICAgICBjdHguc2hhZG93Q29sb3IgPSAnIzhiNWNmNic7XG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gTGF0ZXJhbCBzZWNvbmRhcnkgZW5lcmd5IG5vZGUgKExlZnQgJiBSaWdodCBDb25kdWl0cylcbiAgICAgICAgY29uc3QgbGVmdE5vZGVHcmFkaWVudCA9IGN0eC5jcmVhdGVSYWRpYWxHcmFkaWVudCg4MCwgaGVpZ2h0ICogMC40LCAxMCwgODAsIGhlaWdodCAqIDAuNCwgMzAwKTtcbiAgICAgICAgbGVmdE5vZGVHcmFkaWVudC5hZGRDb2xvclN0b3AoMCwgJ3JnYmEoMCwgMjQwLCAyNTUsIDAuMDcpJyk7XG4gICAgICAgIGxlZnROb2RlR3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuNSwgJ3JnYmEoMTI0LCA1OCwgMjM3LCAwLjA0KScpO1xuICAgICAgICBsZWZ0Tm9kZUdyYWRpZW50LmFkZENvbG9yU3RvcCgxLCAndHJhbnNwYXJlbnQnKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGxlZnROb2RlR3JhZGllbnQ7XG4gICAgICAgIGN0eC5maWxsUmVjdCgwLCBoZWlnaHQgKiAwLjEsIDQwMCwgaGVpZ2h0ICogMC43KTtcblxuICAgICAgICBjb25zdCByaWdodE5vZGVHcmFkaWVudCA9IGN0eC5jcmVhdGVSYWRpYWxHcmFkaWVudCh3aWR0aCAtIDgwLCBoZWlnaHQgKiAwLjQsIDEwLCB3aWR0aCAtIDgwLCBoZWlnaHQgKiAwLjQsIDMwMCk7XG4gICAgICAgIHJpZ2h0Tm9kZUdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCAncmdiYSgxOTIsIDEzMiwgMjUyLCAwLjA4KScpO1xuICAgICAgICByaWdodE5vZGVHcmFkaWVudC5hZGRDb2xvclN0b3AoMC41LCAncmdiYSg1NiwgMTg5LCAyNDgsIDAuMDQpJyk7XG4gICAgICAgIHJpZ2h0Tm9kZUdyYWRpZW50LmFkZENvbG9yU3RvcCgxLCAndHJhbnNwYXJlbnQnKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHJpZ2h0Tm9kZUdyYWRpZW50O1xuICAgICAgICBjdHguZmlsbFJlY3Qod2lkdGggLSA0MDAsIGhlaWdodCAqIDAuMSwgNDAwLCBoZWlnaHQgKiAwLjcpO1xuICAgICAgfVxuXG4gICAgICAvLyAyLiBTSE9DS1dBVkUgUFVMU0VTIChFeHBsb2RpbmcgRW5lcmd5IFdhdmVzKVxuICAgICAgZm9yIChsZXQgaSA9IHNob2Nrd2F2ZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgY29uc3Qgc3cgPSBzaG9ja3dhdmVzW2ldO1xuICAgICAgICBzdy5yYWRpdXMgKz0gc3cuc3BlZWQ7XG4gICAgICAgIHN3LmFscGhhIC09IDAuMDE4O1xuXG4gICAgICAgIGlmIChzdy5hbHBoYSA8PSAwIHx8IHN3LnJhZGl1cyA+PSBzdy5tYXhSYWRpdXMpIHtcbiAgICAgICAgICBzaG9ja3dhdmVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LmFyYyhzdy54LCBzdy55LCBzdy5yYWRpdXMsIDAsIE1hdGguUEkgKiAyKTtcblxuICAgICAgICBsZXQgc3Ryb2tlQ29sb3IgPSBgcmdiYSgyNTUsIDI1NSwgMjU1LCAke3N3LmFscGhhfSlgO1xuICAgICAgICBsZXQgZ2xvd0NvbG9yID0gJyNmZmZmZmYnO1xuXG4gICAgICAgIGlmIChzdy5jb2xvclR5cGUgPT09ICdibHVlJykge1xuICAgICAgICAgIHN0cm9rZUNvbG9yID0gYHJnYmEoNTYsIDE4OSwgMjQ4LCAke3N3LmFscGhhfSlgO1xuICAgICAgICAgIGdsb3dDb2xvciA9ICcjMDBmMGZmJztcbiAgICAgICAgfSBlbHNlIGlmIChzdy5jb2xvclR5cGUgPT09ICd2aW9sZXQnKSB7XG4gICAgICAgICAgc3Ryb2tlQ29sb3IgPSBgcmdiYSgxNjgsIDg1LCAyNDcsICR7c3cuYWxwaGF9KWA7XG4gICAgICAgICAgZ2xvd0NvbG9yID0gJyNhODU1ZjcnO1xuICAgICAgICB9XG5cbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gc3Ryb2tlQ29sb3I7XG4gICAgICAgIGN0eC5saW5lV2lkdGggPSBNYXRoLm1heCgxLCAoMSAtIHN3LnJhZGl1cyAvIHN3Lm1heFJhZGl1cykgKiA0KTtcbiAgICAgICAgY3R4LnNoYWRvd0JsdXIgPSAxODtcbiAgICAgICAgY3R4LnNoYWRvd0NvbG9yID0gZ2xvd0NvbG9yO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIDMuIFBFUklPRElDIEFVVE9NQVRJQyBMSUdIVE5JTkcgQk9MVFMgKELFgnlza2F3aWNlKVxuICAgICAgY29uc3QgaW50ZXJ2YWwgPSBmaWVsZE1vZGUgPT09ICdzdXJnZScgPyAxMjAwIDogZmllbGRNb2RlID09PSAnbWluaW1hbCcgPyA4MDAwIDogMzIwMDtcbiAgICAgIGlmICh0aW1lc3RhbXAgLSBsYXN0TGlnaHRuaW5nVGltZSA+IGludGVydmFsKSB7XG4gICAgICAgIGxhc3RMaWdodG5pbmdUaW1lID0gdGltZXN0YW1wO1xuICAgICAgICBzcGF3bkxpZ2h0bmluZ0JvbHQoKTtcbiAgICAgIH1cblxuICAgICAgLy8gNC4gRFJBVyBBQ1RJVkUgTElHSFROSU5HIEFSQ1NcbiAgICAgIGZvciAobGV0IGkgPSBhY3RpdmVMaWdodG5pbmdzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGNvbnN0IGJvbHQgPSBhY3RpdmVMaWdodG5pbmdzW2ldO1xuICAgICAgICBib2x0LmFscGhhIC09IDAuMDQ1OyAvLyBSYXBpZCBlbGVjdHJpY2FsIGZsYXNoIGRlY2F5XG5cbiAgICAgICAgaWYgKGJvbHQuYWxwaGEgPD0gMCkge1xuICAgICAgICAgIGFjdGl2ZUxpZ2h0bmluZ3Muc3BsaWNlKGksIDEpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBpZiAoYm9sdC5zZWdtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgY3R4Lm1vdmVUbyhib2x0LnNlZ21lbnRzWzBdLngsIGJvbHQuc2VnbWVudHNbMF0ueSk7XG4gICAgICAgICAgZm9yIChsZXQgcCA9IDE7IHAgPCBib2x0LnNlZ21lbnRzLmxlbmd0aDsgcCsrKSB7XG4gICAgICAgICAgICBjdHgubGluZVRvKGJvbHQuc2VnbWVudHNbcF0ueCwgYm9sdC5zZWdtZW50c1twXS55KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQYXNzIDE6IE91dGVyIFZpb2xldCBQbGFzbWEgSGFsb1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBgcmdiYSgxNjgsIDg1LCAyNDcsICR7Ym9sdC5hbHBoYSAqIDAuNX0pYDtcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IGJvbHQud2lkdGggKiAzLjU7XG4gICAgICAgIGN0eC5zaGFkb3dCbHVyID0gMjQ7XG4gICAgICAgIGN0eC5zaGFkb3dDb2xvciA9ICcjYzA4NGZjJztcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuXG4gICAgICAgIC8vIFBhc3MgMjogRWxlY3RyaWMgQ3lhbiBDb3JlXG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IGByZ2JhKDU2LCAxODksIDI0OCwgJHtib2x0LmFscGhhICogMC44fSlgO1xuICAgICAgICBjdHgubGluZVdpZHRoID0gYm9sdC53aWR0aCAqIDEuNjtcbiAgICAgICAgY3R4LnNoYWRvd0JsdXIgPSAxNDtcbiAgICAgICAgY3R4LnNoYWRvd0NvbG9yID0gJyMwMGYwZmYnO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG5cbiAgICAgICAgLy8gUGFzcyAzOiBQdXJlIFdoaXRlIEZsYXNoIENlbnRlclxuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBgcmdiYSgyNTUsIDI1NSwgMjU1LCAke2JvbHQuYWxwaGF9KWA7XG4gICAgICAgIGN0eC5saW5lV2lkdGggPSBNYXRoLm1heCgxLCBib2x0LndpZHRoICogMC42KTtcbiAgICAgICAgY3R4LnNoYWRvd0JsdXIgPSA4O1xuICAgICAgICBjdHguc2hhZG93Q29sb3IgPSAnI2ZmZmZmZic7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcblxuICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgICAgfVxuXG4gICAgICAvLyA1LiBEUkFXIFNQQVJLIFBBUlRJQ0xFU1xuICAgICAgZm9yIChsZXQgaSA9IHNwYXJrcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBjb25zdCBzID0gc3BhcmtzW2ldO1xuICAgICAgICBzLnggKz0gcy52eDtcbiAgICAgICAgcy55ICs9IHMudnk7XG4gICAgICAgIHMudnggKj0gMC45NDsgLy8gQWlyIGRyYWdcbiAgICAgICAgcy52eSAqPSAwLjk0O1xuICAgICAgICBzLmFscGhhIC09IHMuZGVjYXk7XG5cbiAgICAgICAgaWYgKHMuYWxwaGEgPD0gMCkge1xuICAgICAgICAgIHNwYXJrcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gcy5jb2xvcjtcbiAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gcy5hbHBoYTtcbiAgICAgICAgY3R4LnNoYWRvd0JsdXIgPSAxMDtcbiAgICAgICAgY3R4LnNoYWRvd0NvbG9yID0gcy5jb2xvcjtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguYXJjKHMueCwgcy55LCBzLnNpemUsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICAgIH1cblxuICAgICAgYW5pbWF0aW9uRnJhbWVJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuICAgIH07XG5cbiAgICBhbmltYXRpb25GcmFtZUlkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcik7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZVJlc2l6ZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2VudGluZWw6cGxhc21hLXNob2Nrd2F2ZScsIGhhbmRsZUN1c3RvbVNob2Nrd2F2ZSk7XG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShhbmltYXRpb25GcmFtZUlkKTtcbiAgICB9O1xuICB9LCBbZmllbGRNb2RlXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgey8qIEJhY2tncm91bmQgQW1iaWVudCBQbGFzbWEgQ2FudmFzICovfVxuICAgICAgPGNhbnZhc1xuICAgICAgICByZWY9e2NhbnZhc1JlZn1cbiAgICAgICAgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCBwb2ludGVyLWV2ZW50cy1ub25lIHotMFwiXG4gICAgICAgIHN0eWxlPXt7IG9wYWNpdHk6IGZpZWxkTW9kZSA9PT0gJ21pbmltYWwnID8gMC4zNSA6IDAuOTIgfX1cbiAgICAgIC8+XG5cbiAgICAgIHsvKiBGbG9hdGluZyBUYWN0aWNhbCBQbGFzbWEgQ29uZHVjdG9yICYgQ29udHJvbHMgSFVEICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBib3R0b20tNCBsZWZ0LTQgei00MCBoaWRkZW4gc206YmxvY2tcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIuNSByb3VuZGVkLTJ4bCBiZy1zbGF0ZS05NTAvODUgYmFja2Ryb3AtYmx1ci14bCBib3JkZXIgYm9yZGVyLXB1cnBsZS01MDAvNDAgc2hhZG93LTJ4bCBzaGFkb3ctcHVycGxlLTk1MC82MCBmb250LW1vbm8gdGV4dC14cyB0ZXh0LXNsYXRlLTMwMCBzcGFjZS15LTIgbWF4LXcteHMgdHJhbnNpdGlvbi1hbGxcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMyBib3JkZXItYiBib3JkZXItcHVycGxlLTkwMC81MCBwYi0xLjVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBmbGV4IGgtMi41IHctMi41XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYW5pbWF0ZS1waW5nIGFic29sdXRlIGlubGluZS1mbGV4IGgtZnVsbCB3LWZ1bGwgcm91bmRlZC1mdWxsIGJnLWN5YW4tNDAwIG9wYWNpdHktNzVcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVsYXRpdmUgaW5saW5lLWZsZXggcm91bmRlZC1mdWxsIGgtMi41IHctMi41IGJnLWN5YW4tNTAwXCI+PC9zcGFuPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LXdoaXRlIHRleHQtWzExcHhdIHRyYWNraW5nLXdpZGUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICA8WmFwIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtY3lhbi00MDAgYW5pbWF0ZS1wdWxzZVwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+UE9MRSBQTEFaTU9XRSAmIELFgVlTS0FXSUNFPC9zcGFuPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc0h1ZFZpc2libGUoIWlzSHVkVmlzaWJsZSl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtcHVycGxlLTMwMCBob3Zlcjp0ZXh0LXdoaXRlIHB4LTEuNSBweS0wLjUgcm91bmRlZCBiZy1wdXJwbGUtOTUwLzcwIGJvcmRlciBib3JkZXItcHVycGxlLTgwMC81MCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtpc0h1ZFZpc2libGUgPyAnWndpxYQnIDogJ09wY2plJ31cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAge2lzSHVkVmlzaWJsZSAmJiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMiBwdC0xIHRleHQtWzExcHhdXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+V2lkbW8gZW5lcmdpaTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC13aGl0ZSBmb250LWJvbGQgdGV4dC1bMTBweF0gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctMiBoLTIgcm91bmRlZC1mdWxsIGJnLXdoaXRlIGlubGluZS1ibG9jayBzaGFkb3ctWzBfMF84cHhfI2ZmZl1cIiB0aXRsZT1cIkJpYcWCeVwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTIgaC0yIHJvdW5kZWQtZnVsbCBiZy1jeWFuLTQwMCBpbmxpbmUtYmxvY2sgc2hhZG93LVswXzBfOHB4XyMzOGJkZjhdXCIgdGl0bGU9XCJOaWViaWVza2lcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0yIGgtMiByb3VuZGVkLWZ1bGwgYmctcHVycGxlLTUwMCBpbmxpbmUtYmxvY2sgc2hhZG93LVswXzBfOHB4XyNhODU1ZjddXCIgdGl0bGU9XCJGaW9sZXRvd3lcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+QmlhxYJvLU5pZWJpZXNrby1GaW9sZXRvd2U8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuPld5xYJhZG93YW5pYSDFgnVrb3dlOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWN5YW4tMzAwIGZvbnQtYm9sZFwiPntsaWdodG5pbmdDb3VudH0gaW1wdWxzw7N3PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuPk9zdGF0bmkgxYJ1azo8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1wdXJwbGUtMzAwXCI+e2xhc3REaXNjaGFyZ2VUaW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIE1vZGUgU2VsZWN0b3IgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMyBnYXAtMSBwdC0xXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0RmllbGRNb2RlKCdtaW5pbWFsJyl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweS0xIHB4LTEgcm91bmRlZC1sZyB0ZXh0LWNlbnRlciB0ZXh0LVsxMHB4XSBmb250LWJvbGQgYm9yZGVyIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgICAgICAgIGZpZWxkTW9kZSA9PT0gJ21pbmltYWwnXG4gICAgICAgICAgICAgICAgICAgICAgPyAnYmctcHVycGxlLTkwMC82MCBib3JkZXItcHVycGxlLTUwMCB0ZXh0LXdoaXRlIHNoYWRvdy1zbSdcbiAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05MDAgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXNsYXRlLTIwMCdcbiAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIER5c2tyZXRuZVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEZpZWxkTW9kZSgnbm9ybWFsJyl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweS0xIHB4LTEgcm91bmRlZC1sZyB0ZXh0LWNlbnRlciB0ZXh0LVsxMHB4XSBmb250LWJvbGQgYm9yZGVyIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgICAgICAgIGZpZWxkTW9kZSA9PT0gJ25vcm1hbCdcbiAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1jeWFuLTkwMC82MCBib3JkZXItY3lhbi00MDAgdGV4dC13aGl0ZSBzaGFkb3ctc20nXG4gICAgICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTAwIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC1zbGF0ZS0yMDAnXG4gICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICBOb3JtYWxuZVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEZpZWxkTW9kZSgnc3VyZ2UnKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB5LTEgcHgtMSByb3VuZGVkLWxnIHRleHQtY2VudGVyIHRleHQtWzEwcHhdIGZvbnQtYm9sZCBib3JkZXIgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgICAgICAgICAgZmllbGRNb2RlID09PSAnc3VyZ2UnXG4gICAgICAgICAgICAgICAgICAgICAgPyAnYmctcmVkLTkwMC82MCBib3JkZXItcmVkLTUwMCB0ZXh0LXdoaXRlIHNoYWRvdy1zbSdcbiAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05MDAgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXNsYXRlLTIwMCdcbiAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIEJ1cnphXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBQb2xpc2hlZCBTaGlueSBEaXNjaGFyZ2UgVHJpZ2dlciBCdXR0b24gKi99XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0cmlnZ2VyTGlnaHRuaW5nRGlzY2hhcmdlKCl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIG10LTIgcHktMS41IHB4LTMgcm91bmRlZC14bCBiZy1ncmFkaWVudC10by1yIGZyb20tY3lhbi01MDAgdmlhLWJsdWUtNjAwIHRvLXB1cnBsZS02MDAgaG92ZXI6ZnJvbS1jeWFuLTQwMCBob3Zlcjp0by1wdXJwbGUtNTAwIHRleHQtd2hpdGUgZm9udC1ib2xkIHRleHQteHMgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTEuNSBzaGFkb3ctbGcgc2hhZG93LWN5YW4tOTUwLzUwIGJvcmRlciBib3JkZXItY3lhbi0zMDAvNjAgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgYWN0aXZlOnNjYWxlLTk1IHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlbiBncm91cFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7LyogR2xvc3N5IHNwZWN1bGFyIHRvcCBzaGVlbiAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LXgtMCB0b3AtMCBoLVs0OCVdIGJnLWdyYWRpZW50LXRvLWIgZnJvbS13aGl0ZS80NSB2aWEtd2hpdGUvMTUgdG8tdHJhbnNwYXJlbnQgcG9pbnRlci1ldmVudHMtbm9uZSByb3VuZGVkLXQteGxcIiAvPlxuICAgICAgICAgICAgICAgIHsvKiBTaGlueSBnbGludCBzd2VlcCBvbiBob3ZlciAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgdy0xLzMgYmctd2hpdGUvMjUgLXNrZXcteC0xMiAtdHJhbnNsYXRlLXgtZnVsbCBncm91cC1ob3Zlcjp0cmFuc2xhdGUteC1bNDAwJV0gdHJhbnNpdGlvbi10cmFuc2Zvcm0gZHVyYXRpb24tNzAwIHBvaW50ZXItZXZlbnRzLW5vbmVcIiAvPlxuICAgICAgICAgICAgICAgIDxaYXAgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC15ZWxsb3ctMjAwIGFuaW1hdGUtYm91bmNlXCIgLz5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSB6LTEwXCI+V3nFgmFkdWogQsWCeXNrYXdpY8SZIFBsYXptb3fEhTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvPlxuICApO1xufTtcbiJdLCJtYXBwaW5ncyI6IkFBd2JJLG1CQUVFLGNBRkY7QUF4YkosU0FBZ0IsV0FBVyxRQUFRLFVBQVUsbUJBQW1CO0FBQ2hFLFNBQVMsV0FBZ0Q7QUFrQ2xELGFBQU0sb0JBQThCLE1BQU07QUFDL0MsUUFBTSxZQUFZLE9BQWlDLElBQUk7QUFDdkQsUUFBTSxDQUFDLFdBQVcsWUFBWSxJQUFJLFNBQXlDLFFBQVE7QUFDbkYsUUFBTSxDQUFDLGdCQUFnQixpQkFBaUIsSUFBSSxTQUFpQixDQUFDO0FBQzlELFFBQU0sQ0FBQyxjQUFjLGVBQWUsSUFBSSxTQUFrQixJQUFJO0FBQzlELFFBQU0sQ0FBQyxtQkFBbUIsb0JBQW9CLElBQUksU0FBaUIsUUFBUTtBQUczRSxRQUFNLDRCQUE0QixZQUFZLENBQUMsU0FBa0IsWUFBcUI7QUFDcEYsUUFBSSxPQUFPLFdBQVcsYUFBYTtBQUNqQyxhQUFPO0FBQUEsUUFDTCxJQUFJLFlBQVksNkJBQTZCO0FBQUEsVUFDM0MsUUFBUSxFQUFFLEdBQUcsU0FBUyxHQUFHLFFBQVE7QUFBQSxRQUNuQyxDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0Y7QUFBQSxFQUNGLEdBQUcsQ0FBQyxD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