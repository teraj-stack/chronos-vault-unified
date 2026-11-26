import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-toolkit/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=019a4779"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-toolkit/node_modules/.vite/deps/react.js?v=019a4779"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"]; const useRef = __vite__cjsImport1_react["useRef"];
import * as THREE from "/sentinel-toolkit/node_modules/.vite/deps/three.js?v=5dbce604";
import {
  Building2,
  Globe,
  Shield,
  Activity,
  Radio,
  Camera,
  Eye,
  Zap,
  Download,
  Play,
  Square,
  Layers,
  Sparkles,
  Crosshair,
  Lock,
  Wind,
  Compass,
  Sun,
  Terminal,
  Sliders,
  Volume2,
  VolumeX,
  ShieldAlert,
  Satellite
} from "/sentinel-toolkit/node_modules/.vite/deps/lucide-react.js?v=6cbc5a0a";
export const HolographicPenthouseDeck = () => {
  const [viewMode, setViewMode] = useState("hologram_room");
  const [activeHoloTab, setActiveHoloTab] = useState("city");
  const [selectedCCTV, setSelectedCCTV] = useState("cam-1");
  const [cctvNightVision, setCctvNightVision] = useState(false);
  const [audioFeedback, setAudioFeedback] = useState(true);
  const [glassOpacity, setGlassOpacity] = useState(35);
  const [activeHoloLayer, setActiveHoloLayer] = useState("all");
  const canvasRef = useRef(null);
  const [holoRotationSpeed, setHoloRotationSpeed] = useState(8e-3);
  const [isRotating, setIsRotating] = useState(true);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [scanLaserActive, setScanLaserActive] = useState(true);
  const [threatDetectedInCity, setThreatDetectedInCity] = useState(false);
  const [defconLevel, setDefconLevel] = useState(2);
  const [penthouseShieldActive, setPenthouseShieldActive] = useState(true);
  const [droneDefenseActive, setDroneDefenseActive] = useState(true);
  const [laserSafetyCoverOpen, setLaserSafetyCoverOpen] = useState(false);
  const [penthouseAlarmLevel, setPenthouseAlarmLevel] = useState("normal");
  const [hologramColor, setHologramColor] = useState("cyan");
  const [lastActionMessage, setLastActionMessage] = useState("Matryca hologramowa 50P zsynchronizowana. Sektor obrony aktywowany.");
  const [realTime, setRealTime] = useState("");
  const [barometricPressure, setBarometricPressure] = useState(1013.2);
  const [windSpeed, setWindSpeed] = useState(38.4);
  const [co2Level, setCo2Level] = useState(418);
  const playHoloSound = (type) => {
    if (!audioFeedback || typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (type === "switch") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.06);
        gain.gain.setValueAtTime(0.09, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(1e-3, ctx.currentTime + 0.06);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.06);
      } else if (type === "beep") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(1e-3, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === "laser") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(2400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.18);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(1e-3, ctx.currentTime + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.18);
      } else if (type === "activate") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(1320, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(1e-3, ctx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else if (type === "alarm") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime(700, ctx.currentTime);
        osc.frequency.setValueAtTime(950, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(1e-3, ctx.currentTime + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.22);
      } else if (type === "cctv") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(600, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(1e-3, ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      }
    } catch {
    }
  };
  useEffect(() => {
    const updateTime = () => {
      const now = /* @__PURE__ */ new Date();
      setRealTime(now.toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1e3);
    const weatherInterval = setInterval(() => {
      setBarometricPressure((prev) => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1));
      setWindSpeed((prev) => +Math.max(15, Math.min(65, prev + (Math.random() * 2 - 1))).toFixed(1));
      setCo2Level((prev) => Math.floor(410 + Math.random() * 15));
    }, 4e3);
    return () => {
      clearInterval(interval);
      clearInterval(weatherInterval);
    };
  }, []);
  const networkNodes = [
    { id: "waw", name: "Warszawa Centrala", country: "PL", threatLevel: "low", latency: 4, activeAttacks: 0, shieldStrength: 99.9 },
    { id: "tyo", name: "Tokio Neo-Chiyoda", country: "JP", threatLevel: "elevated", latency: 142, activeAttacks: 2, shieldStrength: 97.4 },
    { id: "nyc", name: "Nowy Jork Manhattan", country: "US", threatLevel: "low", latency: 88, activeAttacks: 0, shieldStrength: 99.1 },
    { id: "lon", name: "Londyn Canary Wharf", country: "UK", threatLevel: "low", latency: 29, activeAttacks: 0, shieldStrength: 98.7 },
    { id: "sgp", name: "Singapur Marina Bay", country: "SG", threatLevel: "critical", latency: 198, activeAttacks: 7, shieldStrength: 88.2 },
    { id: "fra", name: "Frankfurt Cyber Hub", country: "DE", threatLevel: "low", latency: 18, activeAttacks: 0, shieldStrength: 99.8 }
  ];
  const cctvFeeds = [
    { id: "cam-1", name: "CAM-01 • Taras Widokowy 50P", location: "Penthouse Perimeter West", status: "ONLINE", fps: 60, colorScheme: "cyan", description: "Panorama zachodu słońca i korytarz powietrzny" },
    { id: "cam-2", name: "CAM-02 • Sala Konferencyjna", location: "Executive Boardroom 50P", status: "RECORDING", fps: 60, colorScheme: "amber", description: "Stół konferencyjny Bujok Medical i projektor holo" },
    { id: "cam-3", name: "CAM-03 • Helipad Dachowy", location: "Roof Skyport Tower A", status: "ONLINE", fps: 30, colorScheme: "emerald", description: "Gotowość eskorty medycznej i lądowiska" },
    { id: "cam-4", name: "CAM-04 • Serwerownia Piętro 49", location: "Monolith Core Vault", status: "ONLINE", fps: 60, colorScheme: "violet", description: "Macierz światłowodowa i reaktor Three.js" },
    { id: "cam-5", name: "CAM-05 • Akwarium Gnid", location: "Sub-level Cryo Lab", status: "ALERT", fps: 60, colorScheme: "red", description: "Przeszklony zbiornik zneutralizowanych wirusów" },
    { id: "cam-6", name: "CAM-06 • Śluza Bezpieczeństwa", location: "Elevator Shaft 50P Express", status: "ONLINE", fps: 60, colorScheme: "cyan", description: "Biometryczna winda magnetyczna" }
  ];
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const width = canvas.clientWidth || 600;
    const height = canvas.clientHeight || 400;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(132631, 0.035);
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 7, 12);
    camera.lookAt(0, 1, 0);
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const baseRingGeo = new THREE.RingGeometry(4.2, 4.4, 64);
    const baseRingMat = new THREE.MeshBasicMaterial({
      color: hologramColor === "cyan" ? 440020 : hologramColor === "violet" ? 11032055 : hologramColor === "emerald" ? 1096065 : 16096779,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7
    });
    const baseRing = new THREE.Mesh(baseRingGeo, baseRingMat);
    baseRing.rotation.x = Math.PI / 2;
    scene.add(baseRing);
    const gridHelper = new THREE.GridHelper(8, 16, 440020, 1976635);
    gridHelper.position.y = -0.05;
    scene.add(gridHelper);
    const cityGroup = new THREE.Group();
    scene.add(cityGroup);
    const buildingMaterial = new THREE.MeshStandardMaterial({
      color: hologramColor === "cyan" ? 61695 : hologramColor === "violet" ? 9133302 : hologramColor === "emerald" ? 1096065 : 16096779,
      emissive: hologramColor === "cyan" ? 17510 : hologramColor === "violet" ? 3868516 : hologramColor === "emerald" ? 413243 : 7877903,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: wireframeMode,
      transparent: true,
      opacity: 0.95
    });
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 16777215,
      transparent: true,
      opacity: 0.85
    });
    const landmarkHeight = 5.8;
    const landmarkGeo = new THREE.BoxGeometry(0.8, landmarkHeight, 0.8);
    const landmark = new THREE.Mesh(landmarkGeo, buildingMaterial);
    landmark.position.set(0, landmarkHeight / 2, 0);
    cityGroup.add(landmark);
    const randomSeed = [
      { x: 1.2, z: 0.6, h: 4.2, w: 0.6 },
      { x: -1.1, z: 0.8, h: 3.6, w: 0.5 },
      { x: 0.7, z: -1.3, h: 4.5, w: 0.7 },
      { x: -0.9, z: -1.1, h: 3.9, w: 0.6 },
      { x: 1.8, z: 1.4, h: 3.1, w: 0.5 },
      { x: -1.9, z: 1.2, h: 2.8, w: 0.6 },
      { x: 2.1, z: -0.9, h: 3.4, w: 0.5 },
      { x: -2, z: -1.5, h: 2.6, w: 0.6 },
      { x: 0.2, z: 2.2, h: 2.9, w: 0.7 },
      { x: -0.3, z: -2.3, h: 3.3, w: 0.5 },
      { x: 2.7, z: 0.3, h: 2.1, w: 0.4 },
      { x: -2.8, z: 0.2, h: 2.2, w: 0.5 },
      { x: 1.5, z: -2.4, h: 2.5, w: 0.5 },
      { x: -1.6, z: 2.5, h: 2.3, w: 0.5 },
      { x: 2.5, z: 2.1, h: 1.8, w: 0.4 },
      { x: -2.6, z: -2.2, h: 1.9, w: 0.4 },
      { x: 3.2, z: -1.5, h: 1.5, w: 0.4 },
      { x: -3.3, z: 1.6, h: 1.4, w: 0.4 },
      { x: 0.9, z: 3.1, h: 1.7, w: 0.4 },
      { x: -1.1, z: -3.2, h: 1.6, w: 0.4 }
    ];
    randomSeed.forEach((spec) => {
      const bGeo = new THREE.BoxGeometry(spec.w, spec.h, spec.w);
      const bMesh = new THREE.Mesh(bGeo, buildingMaterial);
      bMesh.position.set(spec.x, spec.h / 2, spec.z);
      cityGroup.add(bMesh);
      const edges = new THREE.EdgesGeometry(bGeo);
      const line = new THREE.LineSegments(edges, edgeMaterial);
      bMesh.add(line);
    });
    const scanPlaneGeo = new THREE.PlaneGeometry(7.5, 7.5);
    const scanPlaneMat = new THREE.MeshBasicMaterial({
      color: 3718648,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide
    });
    const scanPlane = new THREE.Mesh(scanPlaneGeo, scanPlaneMat);
    scanPlane.rotation.x = Math.PI / 2;
    scene.add(scanPlane);
    const threatGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const threatMat = new THREE.MeshBasicMaterial({ color: 15680580 });
    const threatBeacon = new THREE.Mesh(threatGeo, threatMat);
    threatBeacon.position.set(1.2, 4.3, 0.6);
    threatBeacon.visible = threatDetectedInCity;
    cityGroup.add(threatBeacon);
    const ambientLight = new THREE.AmbientLight(16777215, 0.6);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(3718648, 1.2);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);
    let animationFrameId;
    let scanY = 0;
    let scanDirection = 1;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (isRotating) {
        cityGroup.rotation.y += holoRotationSpeed;
      }
      if (scanLaserActive) {
        scanY += 0.03 * scanDirection;
        if (scanY > 5.5) scanDirection = -1;
        else if (scanY < 0) scanDirection = 1;
        scanPlane.position.y = scanY;
        scanPlane.visible = true;
      } else {
        scanPlane.visible = false;
      }
      if (threatBeacon.visible) {
        const scale = 1 + Math.sin(Date.now() * 0.01) * 0.3;
        threatBeacon.scale.set(scale, scale, scale);
      }
      renderer.render(scene, camera);
    };
    animate();
    const handleResize = () => {
      if (!canvas) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, [holoRotationSpeed, isRotating, wireframeMode, scanLaserActive, threatDetectedInCity, hologramColor]);
  const exportHologramTelemetry = () => {
    playHoloSound("beep");
    const telemetryReport = {
      facility: "BUJOK MEDICAL COMMAND PENTHOUSE",
      floor: 50,
      altitude_meters: 210,
      defconLevel,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      penthouseStatus: {
        alarmLevel: penthouseAlarmLevel,
        perimeterShield: penthouseShieldActive ? "100% TITANIUM-FORCEFIELD" : "DISENGAGED",
        droneDefense: droneDefenseActive ? "ACTIVE EMP JAMMING" : "STANDBY",
        barometricPressure: `${barometricPressure} hPa`,
        windVelocity: `${windSpeed} km/h`,
        co2Atmosphere: `${co2Level} ppm`
      },
      globalNetworkNodes: networkNodes,
      surveillanceCCTV: cctvFeeds.map((c) => ({ id: c.id, name: c.name, status: c.status }))
    };
    const blob = new Blob([JSON.stringify(telemetryReport, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bujok-medical-penthouse-50p-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setLastActionMessage("Pobrano zaszyfrowany raport telemetryczny NATO STANAG (JSON).");
  };
  const triggerCityThreatScan = () => {
    playHoloSound("laser");
    setScanLaserActive(true);
    setThreatDetectedInCity(true);
    setLastActionMessage("Skaner laserowy namierzył wrogi proces w Sektorze Wschodnim! Przesłano koordynaty do baterii.");
    setTimeout(() => {
      setThreatDetectedInCity(false);
      setLastActionMessage("Wektor zagrożenia zdezintegrowany przez impuls Cewki Tesli Bujok Medical.");
      playHoloSound("activate");
    }, 4500);
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6 w-full text-slate-100", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "p-4 sm:p-6 rounded-3xl bg-slate-900/95 border-2 border-cyan-500/50 shadow-2xl backdrop-blur-xl relative overflow-hidden", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "absolute -top-24 -left-24 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl pointer-events-none" }, void 0, false, {
        fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
        lineNumber: 417,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" }, void 0, false, {
        fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
        lineNumber: 418,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 flex-wrap", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "p-3 rounded-2xl bg-gradient-to-br from-amber-500/30 via-cyan-500/20 to-purple-500/30 border border-amber-400/70 shadow-lg", children: /* @__PURE__ */ jsxDEV(Building2, { className: "w-7 h-7 text-amber-300" }, void 0, false, {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 424,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 423,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxDEV("h1", { className: "text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxDEV("span", { children: "BUJOK MEDICAL" }, void 0, false, {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 429,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-400 font-mono text-sm sm:text-base font-bold", children: "/ PENTHOUSE DECK 50. PIĘTRO" }, void 0, false, {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 430,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 428,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black bg-amber-500/25 text-amber-300 border border-amber-400/80 shadow", children: "STANAG MIL-STD-810" }, void 0, false, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 432,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: `px-2 py-0.5 rounded text-[10px] font-mono font-black ${defconLevel === 1 ? "bg-red-950 text-red-300 border border-red-500 animate-pulse" : defconLevel === 2 ? "bg-amber-950 text-amber-300 border border-amber-500" : "bg-emerald-950 text-emerald-300 border border-emerald-500"}`, children: [
                  "DEFCON-",
                  defconLevel
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 435,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 427,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-slate-300 mt-1", children: "Sala konferencyjna ze stołem prezydenckim, przezroczystymi ekranami hologramowymi i panelami tytanowo-stalowymi." }, void 0, false, {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 443,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 426,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
            lineNumber: 422,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 sm:gap-3 mt-3 text-xs font-mono text-slate-400 flex-wrap", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/90 border border-slate-700 shadow-sm", children: [
              /* @__PURE__ */ jsxDEV(Compass, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 452,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: [
                "Wysokość: ",
                /* @__PURE__ */ jsxDEV("b", { className: "text-white", children: "210 m (50P)" }, void 0, false, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 453,
                  columnNumber: 33
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 453,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 451,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/90 border border-slate-700 shadow-sm", children: [
              /* @__PURE__ */ jsxDEV(Sun, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 456,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: [
                "Widok: ",
                /* @__PURE__ */ jsxDEV("b", { className: "text-amber-200", children: "Zachód Słońca" }, void 0, false, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 457,
                  columnNumber: 30
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 457,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 455,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/90 border border-slate-700 shadow-sm", children: [
              /* @__PURE__ */ jsxDEV(Wind, { className: "w-3.5 h-3.5 text-blue-400" }, void 0, false, {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 460,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: [
                "Wiatr: ",
                /* @__PURE__ */ jsxDEV("b", { className: "text-white", children: [
                  windSpeed,
                  " km/h"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 461,
                  columnNumber: 30
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 461,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 459,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/90 border border-slate-700 shadow-sm", children: [
              /* @__PURE__ */ jsxDEV(Activity, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 464,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: [
                "CO₂: ",
                /* @__PURE__ */ jsxDEV("b", { className: "text-white", children: [
                  co2Level,
                  " ppm"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 465,
                  columnNumber: 28
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 465,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 463,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
            lineNumber: 450,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
          lineNumber: 421,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => {
                playHoloSound("switch");
                setViewMode(viewMode === "hologram_room" ? "tactical_console" : "hologram_room");
              },
              className: "btn-glass-polished px-3.5 py-2 text-xs font-mono font-bold flex items-center gap-1.5",
              children: [
                viewMode === "hologram_room" ? /* @__PURE__ */ jsxDEV(Sliders, { className: "w-3.5 h-3.5 text-cyan-200" }, void 0, false, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 479,
                  columnNumber: 47
                }, this) : /* @__PURE__ */ jsxDEV(Eye, { className: "w-3.5 h-3.5 text-cyan-200" }, void 0, false, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 479,
                  columnNumber: 99
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: viewMode === "hologram_room" ? "Konsola Operacyjna" : "Widok Panoramiczny 50P" }, void 0, false, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 480,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 472,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => {
                playHoloSound("switch");
                setDefconLevel(defconLevel === 1 ? 3 : defconLevel === 2 ? 1 : 2);
                setLastActionMessage(`Zmieniono poziom gotowości bojowej na DEFCON-${defconLevel === 1 ? 3 : defconLevel === 2 ? 1 : 2}`);
              },
              className: "btn-titanium-steel px-3 py-2 text-xs rounded-xl flex items-center gap-1.5",
              children: [
                /* @__PURE__ */ jsxDEV(ShieldAlert, { className: "w-3.5 h-3.5 text-amber-300" }, void 0, false, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 491,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: [
                  "DEFCON: ",
                  defconLevel
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 492,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 483,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: exportHologramTelemetry,
              className: "btn-glossy btn-glossy-primary px-3 py-2 text-xs font-mono font-bold flex items-center gap-1.5",
              children: [
                /* @__PURE__ */ jsxDEV(Download, { className: "w-3.5 h-3.5 text-cyan-200" }, void 0, false, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 499,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Eksport JSON" }, void 0, false, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 500,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 495,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setAudioFeedback(!audioFeedback),
              className: `btn-glass-polished p-2 text-xs ${audioFeedback ? "text-cyan-300" : "text-slate-500"}`,
              title: audioFeedback ? "Dźwięki aktywne" : "Dźwięki wyciszone",
              children: audioFeedback ? /* @__PURE__ */ jsxDEV(Volume2, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 508,
                columnNumber: 32
              }, this) : /* @__PURE__ */ jsxDEV(VolumeX, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 508,
                columnNumber: 66
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 503,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
          lineNumber: 471,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
        lineNumber: 420,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "mt-3 py-1.5 px-3 rounded-xl bg-slate-950/85 border border-slate-800 text-xs font-mono text-cyan-300 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-cyan-400 animate-ping shrink-0" }, void 0, false, {
            fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
            lineNumber: 516,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "TELEMETRIA 50P:" }, void 0, false, {
            fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
            lineNumber: 517,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: lastActionMessage }, void 0, false, {
            fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
            lineNumber: 518,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
          lineNumber: 515,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 text-[11px] shrink-0 font-mono hidden sm:inline", children: [
          realTime,
          " GMT+1"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
          lineNumber: 520,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
        lineNumber: 514,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
      lineNumber: 415,
      columnNumber: 7
    }, this),
    viewMode === "hologram_room" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "relative w-full rounded-3xl overflow-hidden border-2 border-cyan-500/50 shadow-2xl bg-slate-950 min-h-[640px] lg:min-h-[760px] flex flex-col justify-between", children: [
        /* @__PURE__ */ jsxDEV(
          "div",
          {
            className: "absolute inset-0 bg-cover bg-center transition-all duration-700",
            style: {
              backgroundImage: `url('/assets/aistudio/Obrazek_Apple_Creator_Studio_2026-10-25_06-35-31_2_6caadac1.png')`,
              filter: defconLevel === 1 ? "hue-rotate(320deg) contrast(1.15)" : "none"
            }
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
            lineNumber: 530,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-950/95 via-transparent to-slate-950/70 pointer-events-none" }, void 0, false, {
          fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
          lineNumber: 539,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" }, void 0, false, {
          fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
          lineNumber: 540,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "relative z-20 p-4 sm:p-6 flex items-start justify-between gap-4 pointer-events-none", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "pointer-events-auto btn-glass-polished p-3.5 rounded-2xl border border-cyan-400/60 shadow-xl max-w-xs", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 mb-1.5", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center font-serif font-black text-slate-950 text-sm shadow", children: "B" }, void 0, false, {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 547,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("h3", { className: "text-xs font-black tracking-wider text-white", children: "BUJOK MEDICAL HQ" }, void 0, false, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 551,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-amber-300 font-mono", children: "PENTHOUSE SUITE 5001" }, void 0, false, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 552,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 550,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 546,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 text-[11px] font-mono text-slate-300 pt-1 border-t border-slate-700/80", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Pancerz Szyb:" }, void 0, false, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 557,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-bold", children: "100% Tytan-Krzem" }, void 0, false, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 558,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 556,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Cewka Tesli 50P:" }, void 0, false, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 561,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-300 font-bold", children: "UZBROJONA" }, void 0, false, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 562,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 560,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 555,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
            lineNumber: 545,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "pointer-events-auto hidden md:flex items-center gap-3 btn-glass-polished px-4 py-2 rounded-2xl border border-cyan-400/60 text-xs font-mono shadow-xl", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1.5 text-cyan-300", children: [
              /* @__PURE__ */ jsxDEV(Wind, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 570,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: [
                "Ciśnienie: ",
                barometricPressure,
                " hPa"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 571,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 569,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "w-1 h-3 bg-slate-600 rounded-full" }, void 0, false, {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 573,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1.5 text-amber-300", children: [
              /* @__PURE__ */ jsxDEV(Sun, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 575,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Widoczność: 48 km" }, void 0, false, {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 576,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 574,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "w-1 h-3 bg-slate-600 rounded-full" }, void 0, false, {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 578,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1.5 text-purple-300", children: [
              /* @__PURE__ */ jsxDEV(Shield, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 580,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Tarcza EMP: WŁĄCZONA" }, void 0, false, {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 581,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 579,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
            lineNumber: 568,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "pointer-events-auto flex items-center gap-2 btn-glass-polished px-3 py-1.5 rounded-2xl border border-cyan-400/60 text-xs font-mono", children: [
            /* @__PURE__ */ jsxDEV(Eye, { className: "w-3.5 h-3.5 text-cyan-300" }, void 0, false, {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 587,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-300", children: "Szkło Holo:" }, void 0, false, {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 588,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "range",
                min: "15",
                max: "85",
                value: glassOpacity,
                onChange: (e) => setGlassOpacity(Number(e.target.value)),
                className: "w-16 h-1.5 accent-cyan-400 bg-slate-800 rounded cursor-pointer",
                title: "Reguluj przezroczystość szklanych ekranów hologramowych przy stole"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 589,
                columnNumber: 17
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-cyan-300 font-bold", children: [
              glassOpacity,
              "%"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 598,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
            lineNumber: 586,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
          lineNumber: 543,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "relative z-10 flex-1 flex flex-col items-center justify-center p-2 sm:p-4", children: /* @__PURE__ */ jsxDEV("div", { className: "relative w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxDEV(
            "div",
            {
              className: "hologram-glass-screen w-full md:w-64 p-3.5 rounded-2xl border border-cyan-400/70 shadow-2xl relative transition-all duration-300 pointer-events-auto",
              style: {
                backgroundColor: `rgba(6, 182, 212, ${glassOpacity / 350})`,
                backdropFilter: `blur(${Math.max(6, glassOpacity / 5)}px)`
              },
              children: [
                /* @__PURE__ */ jsxDEV("div", { className: "holo-bracket-tl" }, void 0, false, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 615,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "holo-bracket-tr" }, void 0, false, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 616,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "holo-bracket-bl" }, void 0, false, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 617,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "holo-bracket-br" }, void 0, false, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 618,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "holo-scan-sweep" }, void 0, false, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 619,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-2 border-b border-cyan-500/40 text-xs font-mono", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1.5 text-cyan-300 font-bold", children: [
                    /* @__PURE__ */ jsxDEV(Radio, { className: "w-4 h-4 text-cyan-400 animate-pulse" }, void 0, false, {
                      fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                      lineNumber: 623,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "SEKTOR POWIETRZNY 50P" }, void 0, false, {
                      fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                      lineNumber: 624,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 622,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800", children: "RADAR 360°" }, void 0, false, {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 626,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 621,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "mt-3 relative w-full aspect-square max-w-[140px] mx-auto rounded-full border border-cyan-400/50 flex items-center justify-center bg-cyan-950/20 overflow-hidden", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 border border-cyan-500/30 rounded-full scale-75" }, void 0, false, {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 633,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 border border-cyan-500/20 rounded-full scale-50" }, void 0, false, {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 634,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "absolute w-full h-[1px] bg-cyan-500/30" }, void 0, false, {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 635,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "absolute h-full w-[1px] bg-cyan-500/30" }, void 0, false, {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 636,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(6,182,212,0.35)_90deg,transparent_91deg)] animate-spin", style: { animationDuration: "3.5s" } }, void 0, false, {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 639,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute top-6 right-8" }, void 0, false, {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 642,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "w-1.5 h-1.5 rounded-full bg-cyan-300 absolute bottom-8 left-10" }, void 0, false, {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 643,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 632,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "mt-3 space-y-1 text-[10px] font-mono text-slate-300 border-t border-cyan-500/30 pt-2", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Korytarz Dronowy:" }, void 0, false, {
                      fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                      lineNumber: 648,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-bold", children: "ZABEZPIECZONY" }, void 0, false, {
                      fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                      lineNumber: 649,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 647,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Azymut Ochrony:" }, void 0, false, {
                      fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                      lineNumber: 652,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-300", children: "274° Zachód" }, void 0, false, {
                      fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                      lineNumber: 653,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 651,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Zakłócenia EMP:" }, void 0, false, {
                      fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                      lineNumber: 656,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-amber-300", children: "0.02% (Czyste)" }, void 0, false, {
                      fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                      lineNumber: 657,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 655,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 646,
                  columnNumber: 19
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 608,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("div", { className: "relative flex-1 flex flex-col items-center justify-center max-w-lg", children: [
            /* @__PURE__ */ jsxDEV(
              "div",
              {
                className: "hologram-glass-screen mb-2 px-4 py-1.5 rounded-full border border-cyan-400 shadow-xl text-xs font-mono text-cyan-300 flex items-center gap-2 pointer-events-auto",
                style: {
                  backgroundColor: `rgba(6, 182, 212, ${glassOpacity / 350})`,
                  backdropFilter: `blur(${Math.max(6, glassOpacity / 5)}px)`
                },
                children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-cyan-400 animate-ping" }, void 0, false, {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 672,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "font-bold", children: "PROJEKTOR CENTRALNY: METROPOLIA BUJOK" }, void 0, false, {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 673,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-200 border border-cyan-700", children: "42 WIEŻOWCE" }, void 0, false, {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 674,
                    columnNumber: 21
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 665,
                columnNumber: 19
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("div", { className: "relative w-full aspect-[16/10] flex items-center justify-center", children: /* @__PURE__ */ jsxDEV(
              "canvas",
              {
                ref: canvasRef,
                className: "w-full h-full drop-shadow-[0_0_35px_rgba(6,182,212,0.65)] cursor-grab active:cursor-grabbing pointer-events-auto",
                title: "Kliknij i przeciągnij, aby obrócić hologram metropolii"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 681,
                columnNumber: 21
              },
              this
            ) }, void 0, false, {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 680,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
            lineNumber: 663,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "div",
            {
              className: "hologram-glass-screen w-full md:w-64 p-3.5 rounded-2xl border border-purple-400/70 shadow-2xl relative transition-all duration-300 pointer-events-auto",
              style: {
                backgroundColor: `rgba(168, 85, 247, ${glassOpacity / 400})`,
                backdropFilter: `blur(${Math.max(6, glassOpacity / 5)}px)`
              },
              children: [
                /* @__PURE__ */ jsxDEV("div", { className: "holo-bracket-tl", style: { borderColor: "#c084fc" } }, void 0, false, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 697,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "holo-bracket-tr", style: { borderColor: "#c084fc" } }, void 0, false, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 698,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "holo-bracket-bl", style: { borderColor: "#c084fc" } }, void 0, false, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 699,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "holo-bracket-br", style: { borderColor: "#c084fc" } }, void 0, false, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 700,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "holo-scan-sweep", style: { background: "linear-gradient(90deg, transparent, rgba(192, 132, 252, 0.9), transparent)" } }, void 0, false, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 701,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-2 border-b border-purple-500/40 text-xs font-mono", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1.5 text-purple-300 font-bold", children: [
                    /* @__PURE__ */ jsxDEV(Activity, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
                      fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                      lineNumber: 705,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "BUJOK SERFANTAKER" }, void 0, false, {
                      fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                      lineNumber: 706,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 704,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-800", children: "BIO-STASIS" }, void 0, false, {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 708,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 703,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "mt-3 p-2 rounded-xl bg-slate-950/60 border border-purple-500/30 text-[10px] font-mono space-y-2", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center text-slate-300", children: [
                    /* @__PURE__ */ jsxDEV("span", { children: "Puls Biometryczny Sali:" }, void 0, false, {
                      fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                      lineNumber: 716,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-bold", children: "72 BPM (Norma)" }, void 0, false, {
                      fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                      lineNumber: 717,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 715,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "h-6 flex items-end gap-1 px-1 bg-purple-950/30 rounded border border-purple-800/40 overflow-hidden", children: [40, 65, 30, 85, 95, 45, 60, 80, 50, 70, 90, 40].map((h, i) => /* @__PURE__ */ jsxDEV("div", { className: "flex-1 bg-gradient-to-t from-purple-600 to-cyan-400 rounded-t", style: { height: `${h}%` } }, i, false, {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 722,
                    columnNumber: 25
                  }, this)) }, void 0, false, {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 720,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center text-slate-300 pt-1", children: [
                    /* @__PURE__ */ jsxDEV("span", { children: "Komora Kriostazy Gnid:" }, void 0, false, {
                      fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                      lineNumber: 727,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-300 font-bold", children: "-196°C Stabilna" }, void 0, false, {
                      fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                      lineNumber: 728,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 726,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center text-slate-300", children: [
                    /* @__PURE__ */ jsxDEV("span", { children: "Filtracja Wirusów:" }, void 0, false, {
                      fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                      lineNumber: 731,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-300 font-bold", children: "ISO-1 HEPA (100%)" }, void 0, false, {
                      fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                      lineNumber: 732,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 730,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 714,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "mt-3 pt-2 border-t border-purple-500/30 flex items-center justify-between", children: /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => {
                      playHoloSound("laser");
                      setLastActionMessage("Wysłano sygnał NtSuspendProcess do krio-stazy w komorze.");
                    },
                    className: "btn-glass-polished w-full py-1 text-[10px] font-mono font-bold text-purple-200",
                    children: "Zamroź Wirusy w RAM"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 737,
                    columnNumber: 21
                  },
                  this
                ) }, void 0, false, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 736,
                  columnNumber: 19
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 690,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
          lineNumber: 605,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
          lineNumber: 603,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "relative z-20 p-4 sm:p-5 titanium-steel-panel border-t-2 border-cyan-400/80 shadow-2xl", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "h-2 w-full military-hazard-stripes rounded-full mb-3" }, void 0, false, {
            fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
            lineNumber: 755,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col lg:flex-row items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 flex-wrap", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-700 shadow-inner", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] font-mono font-bold text-slate-300 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxDEV(Shield, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 763,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "POLE SIŁOWE:" }, void 0, false, {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 764,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 762,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => {
                      playHoloSound("switch");
                      setPenthouseShieldActive(!penthouseShieldActive);
                      setLastActionMessage(penthouseShieldActive ? "Pole siłowe 50P wyłączone." : "Pole siłowe 50P aktywowane na 100%!");
                    },
                    className: `switch-titanium w-12 h-6 ${penthouseShieldActive ? "border-cyan-400 bg-cyan-950/80" : "border-slate-700"}`,
                    children: /* @__PURE__ */ jsxDEV("div", { className: `switch-titanium-thumb transform ${penthouseShieldActive ? "translate-x-6 bg-cyan-400" : "translate-x-0"}` }, void 0, false, {
                      fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                      lineNumber: 774,
                      columnNumber: 23
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 766,
                    columnNumber: 21
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV("span", { className: `text-[10px] font-mono font-bold ${penthouseShieldActive ? "text-emerald-400" : "text-slate-500"}`, children: penthouseShieldActive ? "100%" : "OFF" }, void 0, false, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 776,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 761,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-700 shadow-inner", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] font-mono font-bold text-slate-300 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxDEV(Zap, { className: "w-3.5 h-3.5 text-amber-300" }, void 0, false, {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 784,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "ANTY-DRON EMP:" }, void 0, false, {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 785,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 783,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => {
                      playHoloSound("switch");
                      setDroneDefenseActive(!droneDefenseActive);
                      setLastActionMessage(droneDefenseActive ? "Zagłuszacz EMP wyłączony." : "Zagłuszacz EMP aktywny w promieniu 500m wokół wieżowca!");
                    },
                    className: `switch-titanium w-12 h-6 ${droneDefenseActive ? "border-amber-400 bg-amber-950/80" : "border-slate-700"}`,
                    children: /* @__PURE__ */ jsxDEV("div", { className: `switch-titanium-thumb transform ${droneDefenseActive ? "translate-x-6 bg-amber-400" : "translate-x-0"}` }, void 0, false, {
                      fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                      lineNumber: 795,
                      columnNumber: 23
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 787,
                    columnNumber: 21
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV("span", { className: `text-[10px] font-mono font-bold ${droneDefenseActive ? "text-amber-300" : "text-slate-500"}`, children: droneDefenseActive ? "EMP 500M" : "OFF" }, void 0, false, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 797,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 782,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => {
                    playHoloSound("switch");
                    setIsRotating(!isRotating);
                  },
                  className: `btn-glass-polished px-3 py-1.5 text-xs font-mono font-bold flex items-center gap-1.5 ${isRotating ? "border-cyan-300" : "text-slate-400"}`,
                  children: [
                    isRotating ? /* @__PURE__ */ jsxDEV(Square, { className: "w-3 h-3 text-cyan-200" }, void 0, false, {
                      fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                      lineNumber: 812,
                      columnNumber: 35
                    }, this) : /* @__PURE__ */ jsxDEV(Play, { className: "w-3 h-3 text-cyan-200" }, void 0, false, {
                      fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                      lineNumber: 812,
                      columnNumber: 82
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: isRotating ? "Zatrzymaj Obrót" : "Obracaj" }, void 0, false, {
                      fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                      lineNumber: 813,
                      columnNumber: 21
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 803,
                  columnNumber: 19
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => {
                    playHoloSound("switch");
                    setWireframeMode(!wireframeMode);
                  },
                  className: "btn-titanium-steel px-3 py-1.5 text-xs rounded-xl flex items-center gap-1.5",
                  children: [
                    /* @__PURE__ */ jsxDEV(Layers, { className: "w-3 h-3 text-purple-200" }, void 0, false, {
                      fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                      lineNumber: 823,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: wireframeMode ? "Bryły" : "Wireframe" }, void 0, false, {
                      fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                      lineNumber: 824,
                      columnNumber: 21
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 816,
                  columnNumber: 19
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: triggerCityThreatScan,
                  className: "btn-glossy btn-glossy-red px-3.5 py-1.5 text-xs font-mono font-bold flex items-center gap-1.5 animate-pulse",
                  children: [
                    /* @__PURE__ */ jsxDEV(Crosshair, { className: "w-3.5 h-3.5 text-yellow-200" }, void 0, false, {
                      fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                      lineNumber: 831,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "Skan Bojowy Metropolii" }, void 0, false, {
                      fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                      lineNumber: 832,
                      columnNumber: 21
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 827,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 759,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 flex-wrap", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 bg-slate-950/90 p-2 rounded-xl border border-red-900/80 shadow-md", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "text-right", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono font-bold block text-red-400", children: "BEZPIECZNIK LASERA:" }, void 0, false, {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 841,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] font-mono text-slate-400", children: laserSafetyCoverOpen ? "ODBEZPIECZONY" : "ZABEZPIECZONY" }, void 0, false, {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 842,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 840,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => {
                      playHoloSound("switch");
                      setLaserSafetyCoverOpen(!laserSafetyCoverOpen);
                      setLastActionMessage(laserSafetyCoverOpen ? "Zabezpieczono działo laserowe osłoną." : "ODBEZPIECZONO działo laserowe na dachu 50P!");
                    },
                    className: `px-2.5 py-1 rounded text-xs font-mono font-black border transition-all ${laserSafetyCoverOpen ? "bg-red-600 text-white border-red-300 shadow-lg shadow-red-950 animate-pulse" : "bg-slate-800 text-slate-300 border-slate-600"}`,
                    children: laserSafetyCoverOpen ? "FIRE READY" : "SAFE"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 845,
                    columnNumber: 21
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 839,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => {
                    playHoloSound("activate");
                    const colors = ["cyan", "violet", "amber", "emerald"];
                    const nextIdx = (colors.indexOf(hologramColor) + 1) % colors.length;
                    setHologramColor(colors[nextIdx]);
                    setLastActionMessage(`Zmieniono spektrum luminescencji hologramu na: ${colors[nextIdx].toUpperCase()}`);
                  },
                  className: "btn-glass-polished px-3 py-1.5 text-xs font-mono font-bold flex items-center gap-1.5",
                  children: [
                    /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-3.5 h-3.5 text-cyan-200" }, void 0, false, {
                      fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                      lineNumber: 871,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: [
                      "Kolor: ",
                      hologramColor.toUpperCase()
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                      lineNumber: 872,
                      columnNumber: 21
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 861,
                  columnNumber: 19
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => {
                    playHoloSound("cctv");
                    setActiveHoloTab("cctv");
                  },
                  className: "btn-titanium-steel px-3.5 py-1.5 text-xs rounded-xl flex items-center gap-1.5",
                  children: [
                    /* @__PURE__ */ jsxDEV(Camera, { className: "w-3.5 h-3.5 text-cyan-300" }, void 0, false, {
                      fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                      lineNumber: 882,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "Kamery CCTV" }, void 0, false, {
                      fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                      lineNumber: 883,
                      columnNumber: 21
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 875,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 837,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
            lineNumber: 757,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
          lineNumber: 753,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
        lineNumber: 528,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-5 rounded-3xl bg-slate-900/90 border border-cyan-500/30 shadow-xl backdrop-blur-md flex flex-col justify-between", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-3 border-b border-slate-800", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40", children: /* @__PURE__ */ jsxDEV(Globe, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 898,
                  columnNumber: 23
                }, this) }, void 0, false, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 897,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-black text-white", children: "Globalna Sieć Telemetrii" }, void 0, false, {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 901,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-slate-400 font-mono", children: "Światłowód Bujok Medical 50P" }, void 0, false, {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 902,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 900,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 896,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800", children: "6 Węzłów" }, void 0, false, {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 905,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 895,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "mt-4 space-y-2.5", children: networkNodes.map((node) => /* @__PURE__ */ jsxDEV(
              "div",
              {
                className: "p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 transition-colors flex items-center justify-between text-xs font-mono",
                children: [
                  /* @__PURE__ */ jsxDEV("div", { children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxDEV("span", { className: `w-2 h-2 rounded-full ${node.threatLevel === "low" ? "bg-emerald-400" : node.threatLevel === "elevated" ? "bg-amber-400 animate-ping" : "bg-red-500 animate-ping"}` }, void 0, false, {
                        fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                        lineNumber: 918,
                        columnNumber: 27
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: "text-white font-bold", children: node.name }, void 0, false, {
                        fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                        lineNumber: 919,
                        columnNumber: 27
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                      lineNumber: 917,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400", children: [
                      "Ping: ",
                      node.latency,
                      " ms • Tarcza: ",
                      node.shieldStrength,
                      "%"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                      lineNumber: 921,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 916,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: `px-2 py-0.5 rounded text-[10px] font-bold ${node.threatLevel === "low" ? "bg-emerald-950 text-emerald-300 border border-emerald-800" : node.threatLevel === "elevated" ? "bg-amber-950 text-amber-300 border border-amber-800" : "bg-red-950 text-red-300 border border-red-800"}`, children: node.activeAttacks === 0 ? "CZYSTY" : `${node.activeAttacks} ATAKÓW` }, void 0, false, {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 923,
                    columnNumber: 23
                  }, this)
                ]
              },
              node.id,
              true,
              {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 912,
                columnNumber: 21
              },
              this
            )) }, void 0, false, {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 910,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
            lineNumber: 894,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "mt-4 pt-3 border-t border-slate-800 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] font-mono text-slate-400", children: "Przepustowość: 120 Tbps" }, void 0, false, {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 936,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => {
                  playHoloSound("beep");
                  setLastActionMessage("Przetestowano ping 6 globalnych węzłów: status stabilny.");
                },
                className: "btn-titanium-steel px-3 py-1 text-xs rounded-lg font-bold",
                children: "Testuj Węzły"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 937,
                columnNumber: 17
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
            lineNumber: 935,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
          lineNumber: 893,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-5 rounded-3xl bg-slate-900/90 border border-purple-500/30 shadow-xl backdrop-blur-md flex flex-col justify-between", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-3 border-b border-slate-800", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/40", children: /* @__PURE__ */ jsxDEV(Activity, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 955,
                  columnNumber: 23
                }, this) }, void 0, false, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 954,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-black text-white", children: "Bujok Medical: Serfantaker" }, void 0, false, {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 958,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-purple-300 font-mono", children: "Biometryczny Pancerz & Kriostaza" }, void 0, false, {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 959,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 957,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 953,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950 text-purple-300 border border-purple-800", children: "BIO-SHIELD" }, void 0, false, {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 962,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 952,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "mt-4 space-y-3 text-xs font-mono", children: /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center text-slate-300", children: [
                /* @__PURE__ */ jsxDEV("span", { children: "Zawartość O₂ w Penthouse:" }, void 0, false, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 970,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-bold", children: "21.4% (Optymalna)" }, void 0, false, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 971,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 969,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "w-full bg-slate-800 h-1.5 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-emerald-500 h-full w-[94%]" }, void 0, false, {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 974,
                columnNumber: 23
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 973,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center text-slate-300 pt-1", children: [
                /* @__PURE__ */ jsxDEV("span", { children: "Filtracja Wirusów & Toksyn:" }, void 0, false, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 978,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-400 font-bold", children: "Klasa ISO-1 HEPA" }, void 0, false, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 979,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 977,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "w-full bg-slate-800 h-1.5 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-cyan-500 h-full w-[99%]" }, void 0, false, {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 982,
                columnNumber: 23
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 981,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 968,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 967,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
            lineNumber: 951,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: [
              "Bujok Medical Guard: ",
              /* @__PURE__ */ jsxDEV("b", { className: "text-emerald-400", children: "ON" }, void 0, false, {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 989,
                columnNumber: 71
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 989,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] text-purple-300 font-bold", children: "DNA Enforced" }, void 0, false, {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 990,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
            lineNumber: 988,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
          lineNumber: 950,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-5 rounded-3xl bg-slate-900/90 border border-cyan-500/30 shadow-xl backdrop-blur-md flex flex-col justify-between", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-3 border-b border-slate-800", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40", children: /* @__PURE__ */ jsxDEV(Camera, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 1e3,
                  columnNumber: 23
                }, this) }, void 0, false, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 999,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-black text-white", children: "Matryca Kamer CCTV 50P" }, void 0, false, {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 1003,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-cyan-300 font-mono", children: "Terminal dotykowy na stole" }, void 0, false, {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 1004,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 1002,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 998,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => {
                    playHoloSound("cctv");
                    setCctvNightVision(!cctvNightVision);
                  },
                  className: `px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-colors ${cctvNightVision ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-300"}`,
                  children: cctvNightVision ? "NIGHT VISION" : "IR OFF"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 1007,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 997,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "mt-4 grid grid-cols-3 gap-1.5", children: cctvFeeds.map((cam) => {
              const isSelected = selectedCCTV === cam.id;
              return /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => {
                    playHoloSound("cctv");
                    setSelectedCCTV(cam.id);
                  },
                  className: `p-1.5 rounded-lg border text-left transition-all ${isSelected ? "bg-cyan-950/90 border-cyan-400 shadow-md shadow-cyan-950/60" : "bg-slate-950/80 border-slate-800 hover:border-slate-700"}`,
                  children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono font-bold text-white", children: cam.id.toUpperCase() }, void 0, false, {
                        fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                        lineNumber: 1037,
                        columnNumber: 27
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: `w-1.5 h-1.5 rounded-full ${cam.status === "ALERT" ? "bg-red-500 animate-ping" : "bg-emerald-400"}` }, void 0, false, {
                        fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                        lineNumber: 1038,
                        columnNumber: 27
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                      lineNumber: 1036,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] text-slate-400 block truncate mt-0.5", children: cam.location }, void 0, false, {
                      fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                      lineNumber: 1040,
                      columnNumber: 25
                    }, this)
                  ]
                },
                cam.id,
                true,
                {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 1024,
                  columnNumber: 23
                },
                this
              );
            }) }, void 0, false, {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 1020,
              columnNumber: 17
            }, this),
            (() => {
              const currentCam = cctvFeeds.find((c) => c.id === selectedCCTV) || cctvFeeds[0];
              return /* @__PURE__ */ jsxDEV("div", { className: `mt-3 p-3 rounded-2xl border ${cctvNightVision ? "bg-emerald-950/80 border-emerald-500/60 text-emerald-200" : "bg-slate-950 border-cyan-900/60 text-cyan-200"} relative overflow-hidden font-mono text-xs shadow-inner`, children: [
                /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:100%_3px] pointer-events-none" }, void 0, false, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 1052,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center text-[10px] mb-1", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1 font-bold", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-red-500 animate-pulse" }, void 0, false, {
                      fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                      lineNumber: 1056,
                      columnNumber: 27
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: [
                      "LIVE: ",
                      currentCam.name
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                      lineNumber: 1057,
                      columnNumber: 27
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 1055,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: [
                    currentCam.fps,
                    " FPS"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                    lineNumber: 1059,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 1054,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-300 mt-1", children: currentCam.description }, void 0, false, {
                  fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                  lineNumber: 1061,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 1049,
                columnNumber: 21
              }, this);
            })()
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
            lineNumber: 996,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "mt-4 pt-3 border-t border-slate-800 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] font-mono text-slate-400", children: "Rejestrator: 30 Dni" }, void 0, false, {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 1068,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => {
                  playHoloSound("beep");
                  setLastActionMessage("Wygenerowano zrzut klatki CCTV do pamięci.");
                },
                className: "btn-titanium-steel px-3 py-1 text-xs rounded-lg font-bold",
                children: "Zapisz Klatkę"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 1069,
                columnNumber: 17
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
            lineNumber: 1067,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
          lineNumber: 995,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
        lineNumber: 891,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
      lineNumber: 526,
      columnNumber: 9
    }, this),
    viewMode === "tactical_console" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: /* @__PURE__ */ jsxDEV("div", { className: "p-6 rounded-3xl titanium-steel-panel shadow-2xl backdrop-blur-xl", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-700", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h2", { className: "text-lg font-black text-white flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(Terminal, { className: "w-5 h-5 text-cyan-400" }, void 0, false, {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 1091,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "KONSOLA DOWODZENIA PENTHOUSE • TRYB OPERACYJNY" }, void 0, false, {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 1092,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
            lineNumber: 1090,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-300 mt-1", children: "Militarny system obronny 50. piętra: Cewka Tesli, tarcza EMP, ryglowanie wind magnetycznych oraz kryptografia kwantowa." }, void 0, false, {
            fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
            lineNumber: 1094,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
          lineNumber: 1089,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setViewMode("hologram_room"),
            className: "btn-glass-polished px-4 py-2 text-xs font-mono font-bold flex items-center gap-1.5",
            children: [
              /* @__PURE__ */ jsxDEV(Eye, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 1103,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Powrót do Widoku Sali" }, void 0, false, {
                fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
                lineNumber: 1104,
                columnNumber: 17
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
            lineNumber: 1099,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
        lineNumber: 1088,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-slate-950/90 border border-slate-700", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center mb-2", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold font-mono text-cyan-300", children: "ZAGŁUSZACZ EMP DRONÓW" }, void 0, false, {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 1112,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV(Zap, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 1113,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
            lineNumber: 1111,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400 mb-3", children: "Zabezpiecza szklaną kopułę 50P przed wrogimi dronami szpiegowskimi." }, void 0, false, {
            fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
            lineNumber: 1115,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => {
                playHoloSound("switch");
                setDroneDefenseActive(!droneDefenseActive);
              },
              className: `btn-titanium-steel w-full py-1.5 text-xs rounded-xl ${droneDefenseActive ? "border-cyan-400 text-cyan-200" : "text-slate-400"}`,
              children: droneDefenseActive ? "EMP Aktywny (500m)" : "Włącz Zagłuszacz"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 1116,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
          lineNumber: 1110,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-slate-950/90 border border-slate-700", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center mb-2", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold font-mono text-amber-300", children: "POLARYZACJA SZYB" }, void 0, false, {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 1132,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV(Sun, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 1133,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
            lineNumber: 1131,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400 mb-3", children: "Chroni salę przed oślepieniem zachodem słońca i laserami szpiegowskimi." }, void 0, false, {
            fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
            lineNumber: 1135,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => {
                playHoloSound("beep");
                setLastActionMessage("Zwiększono polaryzację szyb do 95%.");
              },
              className: "btn-titanium-steel w-full py-1.5 text-xs rounded-xl text-amber-200",
              children: "Polaryzuj Szyby (95%)"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 1136,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
          lineNumber: 1130,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-slate-950/90 border border-slate-700", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center mb-2", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold font-mono text-purple-300", children: "WINDA MAGNETYCZNA 50P" }, void 0, false, {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 1150,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV(Lock, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 1151,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
            lineNumber: 1149,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400 mb-3", children: "Dostęp do penthausu wyłącznie z biometrycznym kluczem DNA Bujok." }, void 0, false, {
            fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
            lineNumber: 1153,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => {
                playHoloSound("switch");
                setLastActionMessage("Zablokowano szyb windy magnetycznej na piętrze 49.");
              },
              className: "btn-titanium-steel w-full py-1.5 text-xs rounded-xl text-purple-200",
              children: "Zablokuj Szyb Windy"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 1154,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
          lineNumber: 1148,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-slate-950/90 border border-slate-700", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center mb-2", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold font-mono text-emerald-300", children: "ŁĄCZE SATELITARNE QUANTUM" }, void 0, false, {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 1168,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV(Satellite, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 1169,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
            lineNumber: 1167,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400 mb-3", children: "Bezpośredni szyfrowany link z flotą satelitów Bujok Medical Orbit-1." }, void 0, false, {
            fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
            lineNumber: 1171,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => {
                playHoloSound("beep");
                setLastActionMessage("Re-synchronizacja kluczy kwantowych z satelitą zakończona sukcesem.");
              },
              className: "btn-titanium-steel w-full py-1.5 text-xs rounded-xl text-emerald-200",
              children: "Re-synchronizuj Link"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
              lineNumber: 1172,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
          lineNumber: 1166,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
        lineNumber: 1108,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
      lineNumber: 1087,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
      lineNumber: 1086,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/HolographicPenthouseDeck.tsx",
    lineNumber: 413,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkhvbG9ncmFwaGljUGVudGhvdXNlRGVjay50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFxuICBCdWlsZGluZzIsIEdsb2JlLCBTaGllbGQsIEFjdGl2aXR5LCBSYWRpbywgQ3B1LCBDYW1lcmEsIEV5ZSwgWmFwLCBcbiAgQWxlcnRUcmlhbmdsZSwgUmVmcmVzaEN3LCBEb3dubG9hZCwgUGxheSwgU3F1YXJlLCBMYXllcnMsIFNwYXJrbGVzLCBcbiAgQ3Jvc3NoYWlyLCBMb2NrLCBVbmxvY2ssIFdpbmQsIENvbXBhc3MsIFN1biwgVGVybWluYWwsIENoZWNrQ2lyY2xlMixcbiAgU2xpZGVycywgTWF4aW1pemUyLCBNaW5pbWl6ZTIsIFZpZGVvLCBWb2x1bWUyLCBWb2x1bWVYLCBTaGllbGRBbGVydCxcbiAgRmxhbWUsIFRhcmdldCwgU2F0ZWxsaXRlXG59IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5cbmludGVyZmFjZSBDaXR5Tm9kZSB7XG4gIGlkOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgY291bnRyeTogc3RyaW5nO1xuICB0aHJlYXRMZXZlbDogJ2xvdycgfCAnZWxldmF0ZWQnIHwgJ2NyaXRpY2FsJztcbiAgbGF0ZW5jeTogbnVtYmVyO1xuICBhY3RpdmVBdHRhY2tzOiBudW1iZXI7XG4gIHNoaWVsZFN0cmVuZ3RoOiBudW1iZXI7XG59XG5cbmludGVyZmFjZSBDQ1RWQ2FtZXJhIHtcbiAgaWQ6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICBsb2NhdGlvbjogc3RyaW5nO1xuICBzdGF0dXM6ICdPTkxJTkUnIHwgJ1JFQ09SRElORycgfCAnQUxFUlQnO1xuICBmcHM6IG51bWJlcjtcbiAgY29sb3JTY2hlbWU6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IEhvbG9ncmFwaGljUGVudGhvdXNlRGVjazogUmVhY3QuRkMgPSAoKSA9PiB7XG4gIC8vIE5hdmlnYXRpb24gJiBWaWV3IE1vZGVcbiAgY29uc3QgW3ZpZXdNb2RlLCBzZXRWaWV3TW9kZV0gPSB1c2VTdGF0ZTwnaG9sb2dyYW1fcm9vbScgfCAndGFjdGljYWxfY29uc29sZSc+KCdob2xvZ3JhbV9yb29tJyk7XG4gIGNvbnN0IFthY3RpdmVIb2xvVGFiLCBzZXRBY3RpdmVIb2xvVGFiXSA9IHVzZVN0YXRlPCduZXR3b3JrJyB8ICdjaXR5JyB8ICdtZWRpY2FsJyB8ICdjY3R2JyB8ICdkZWZlbnNlJz4oJ2NpdHknKTtcbiAgY29uc3QgW3NlbGVjdGVkQ0NUViwgc2V0U2VsZWN0ZWRDQ1RWXSA9IHVzZVN0YXRlPHN0cmluZz4oJ2NhbS0xJyk7XG4gIGNvbnN0IFtjY3R2TmlnaHRWaXNpb24sIHNldENjdHZOaWdodFZpc2lvbl0gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gIGNvbnN0IFthdWRpb0ZlZWRiYWNrLCBzZXRBdWRpb0ZlZWRiYWNrXSA9IHVzZVN0YXRlPGJvb2xlYW4+KHRydWUpO1xuXG4gIC8vIEhvbG9ncmFwaGljIEdsYXNzIFRyYW5zcGFyZW5jeSBDb250cm9sc1xuICBjb25zdCBbZ2xhc3NPcGFjaXR5LCBzZXRHbGFzc09wYWNpdHldID0gdXNlU3RhdGU8bnVtYmVyPigzNSk7IC8vIDE1JSAtIDg1JVxuICBjb25zdCBbYWN0aXZlSG9sb0xheWVyLCBzZXRBY3RpdmVIb2xvTGF5ZXJdID0gdXNlU3RhdGU8J2FsbCcgfCAnYWlyc3BhY2UnIHwgJ2Jpb21ldHJpY3MnIHwgJ2dyaWQnPignYWxsJyk7XG5cbiAgLy8gM0QgTWV0cm9wb2xpcyBIb2xvZ3JhbSBTdGF0ZVxuICBjb25zdCBjYW52YXNSZWYgPSB1c2VSZWY8SFRNTENhbnZhc0VsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2hvbG9Sb3RhdGlvblNwZWVkLCBzZXRIb2xvUm90YXRpb25TcGVlZF0gPSB1c2VTdGF0ZTxudW1iZXI+KDAuMDA4KTtcbiAgY29uc3QgW2lzUm90YXRpbmcsIHNldElzUm90YXRpbmddID0gdXNlU3RhdGU8Ym9vbGVhbj4odHJ1ZSk7XG4gIGNvbnN0IFt3aXJlZnJhbWVNb2RlLCBzZXRXaXJlZnJhbWVNb2RlXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcbiAgY29uc3QgW3NjYW5MYXNlckFjdGl2ZSwgc2V0U2Nhbkxhc2VyQWN0aXZlXSA9IHVzZVN0YXRlPGJvb2xlYW4+KHRydWUpO1xuICBjb25zdCBbdGhyZWF0RGV0ZWN0ZWRJbkNpdHksIHNldFRocmVhdERldGVjdGVkSW5DaXR5XSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcblxuICAvLyBNaWxpdGFyeSAmIERlZmVuc2UgQ29udHJvbHNcbiAgY29uc3QgW2RlZmNvbkxldmVsLCBzZXREZWZjb25MZXZlbF0gPSB1c2VTdGF0ZTxudW1iZXI+KDIpO1xuICBjb25zdCBbcGVudGhvdXNlU2hpZWxkQWN0aXZlLCBzZXRQZW50aG91c2VTaGllbGRBY3RpdmVdID0gdXNlU3RhdGU8Ym9vbGVhbj4odHJ1ZSk7XG4gIGNvbnN0IFtkcm9uZURlZmVuc2VBY3RpdmUsIHNldERyb25lRGVmZW5zZUFjdGl2ZV0gPSB1c2VTdGF0ZTxib29sZWFuPih0cnVlKTtcbiAgY29uc3QgW2xhc2VyU2FmZXR5Q292ZXJPcGVuLCBzZXRMYXNlclNhZmV0eUNvdmVyT3Blbl0gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gIGNvbnN0IFtwZW50aG91c2VBbGFybUxldmVsLCBzZXRQZW50aG91c2VBbGFybUxldmVsXSA9IHVzZVN0YXRlPCdub3JtYWwnIHwgJ2NhdXRpb24nIHwgJ2xvY2tkb3duJz4oJ25vcm1hbCcpO1xuICBjb25zdCBbaG9sb2dyYW1Db2xvciwgc2V0SG9sb2dyYW1Db2xvcl0gPSB1c2VTdGF0ZTwnY3lhbicgfCAndmlvbGV0JyB8ICdhbWJlcicgfCAnZW1lcmFsZCc+KCdjeWFuJyk7XG4gIGNvbnN0IFtsYXN0QWN0aW9uTWVzc2FnZSwgc2V0TGFzdEFjdGlvbk1lc3NhZ2VdID0gdXNlU3RhdGU8c3RyaW5nPignTWF0cnljYSBob2xvZ3JhbW93YSA1MFAgenN5bmNocm9uaXpvd2FuYS4gU2VrdG9yIG9icm9ueSBha3R5d293YW55LicpO1xuXG4gIC8vIFRlbGVtZXRyeSByZWFsLXRpbWUgY2xvY2tzICYgYXRtb3NwaGVyZVxuICBjb25zdCBbcmVhbFRpbWUsIHNldFJlYWxUaW1lXSA9IHVzZVN0YXRlPHN0cmluZz4oJycpO1xuICBjb25zdCBbYmFyb21ldHJpY1ByZXNzdXJlLCBzZXRCYXJvbWV0cmljUHJlc3N1cmVdID0gdXNlU3RhdGU8bnVtYmVyPigxMDEzLjIpO1xuICBjb25zdCBbd2luZFNwZWVkLCBzZXRXaW5kU3BlZWRdID0gdXNlU3RhdGU8bnVtYmVyPigzOC40KTtcbiAgY29uc3QgW2NvMkxldmVsLCBzZXRDbzJMZXZlbF0gPSB1c2VTdGF0ZTxudW1iZXI+KDQxOCk7XG5cbiAgLy8gV2ViIEF1ZGlvIFN5bnRoIGZvciBmdXR1cmlzdGljIGhvbG9ncmFtIHNvdW5kc1xuICBjb25zdCBwbGF5SG9sb1NvdW5kID0gKHR5cGU6ICdiZWVwJyB8ICdsYXNlcicgfCAnYWxhcm0nIHwgJ2FjdGl2YXRlJyB8ICdjY3R2JyB8ICdzd2l0Y2gnKSA9PiB7XG4gICAgaWYgKCFhdWRpb0ZlZWRiYWNrIHx8IHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSByZXR1cm47XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IEF1ZGlvQ3R4ID0gd2luZG93LkF1ZGlvQ29udGV4dCB8fCAod2luZG93IGFzIHVua25vd24gYXMgeyB3ZWJraXRBdWRpb0NvbnRleHQ6IHR5cGVvZiBBdWRpb0NvbnRleHQgfSkud2Via2l0QXVkaW9Db250ZXh0O1xuICAgICAgaWYgKCFBdWRpb0N0eCkgcmV0dXJuO1xuICAgICAgY29uc3QgY3R4ID0gbmV3IEF1ZGlvQ3R4KCk7XG5cbiAgICAgIGlmICh0eXBlID09PSAnc3dpdGNoJykge1xuICAgICAgICBjb25zdCBvc2MgPSBjdHguY3JlYXRlT3NjaWxsYXRvcigpO1xuICAgICAgICBjb25zdCBnYWluID0gY3R4LmNyZWF0ZUdhaW4oKTtcbiAgICAgICAgb3NjLnR5cGUgPSAndHJpYW5nbGUnO1xuICAgICAgICBvc2MuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKDMyMCwgY3R4LmN1cnJlbnRUaW1lKTtcbiAgICAgICAgb3NjLmZyZXF1ZW5jeS5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDEyMCwgY3R4LmN1cnJlbnRUaW1lICsgMC4wNik7XG4gICAgICAgIGdhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLjA5LCBjdHguY3VycmVudFRpbWUpO1xuICAgICAgICBnYWluLmdhaW4ubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUoMC4wMDEsIGN0eC5jdXJyZW50VGltZSArIDAuMDYpO1xuICAgICAgICBvc2MuY29ubmVjdChnYWluKTtcbiAgICAgICAgZ2Fpbi5jb25uZWN0KGN0eC5kZXN0aW5hdGlvbik7XG4gICAgICAgIG9zYy5zdGFydCgpO1xuICAgICAgICBvc2Muc3RvcChjdHguY3VycmVudFRpbWUgKyAwLjA2KTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2JlZXAnKSB7XG4gICAgICAgIGNvbnN0IG9zYyA9IGN0eC5jcmVhdGVPc2NpbGxhdG9yKCk7XG4gICAgICAgIGNvbnN0IGdhaW4gPSBjdHguY3JlYXRlR2FpbigpO1xuICAgICAgICBvc2MudHlwZSA9ICdzaW5lJztcbiAgICAgICAgb3NjLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZSg4ODAsIGN0eC5jdXJyZW50VGltZSk7XG4gICAgICAgIG9zYy5mcmVxdWVuY3kuZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgxNzYwLCBjdHguY3VycmVudFRpbWUgKyAwLjA4KTtcbiAgICAgICAgZ2Fpbi5nYWluLnNldFZhbHVlQXRUaW1lKDAuMDgsIGN0eC5jdXJyZW50VGltZSk7XG4gICAgICAgIGdhaW4uZ2Fpbi5saW5lYXJSYW1wVG9WYWx1ZUF0VGltZSgwLjAwMSwgY3R4LmN1cnJlbnRUaW1lICsgMC4wOCk7XG4gICAgICAgIG9zYy5jb25uZWN0KGdhaW4pO1xuICAgICAgICBnYWluLmNvbm5lY3QoY3R4LmRlc3RpbmF0aW9uKTtcbiAgICAgICAgb3NjLnN0YXJ0KCk7XG4gICAgICAgIG9zYy5zdG9wKGN0eC5jdXJyZW50VGltZSArIDAuMDgpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnbGFzZXInKSB7XG4gICAgICAgIGNvbnN0IG9zYyA9IGN0eC5jcmVhdGVPc2NpbGxhdG9yKCk7XG4gICAgICAgIGNvbnN0IGdhaW4gPSBjdHguY3JlYXRlR2FpbigpO1xuICAgICAgICBvc2MudHlwZSA9ICdzYXd0b290aCc7XG4gICAgICAgIG9zYy5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoMjQwMCwgY3R4LmN1cnJlbnRUaW1lKTtcbiAgICAgICAgb3NjLmZyZXF1ZW5jeS5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDMyMCwgY3R4LmN1cnJlbnRUaW1lICsgMC4xOCk7XG4gICAgICAgIGdhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLjEyLCBjdHguY3VycmVudFRpbWUpO1xuICAgICAgICBnYWluLmdhaW4ubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUoMC4wMDEsIGN0eC5jdXJyZW50VGltZSArIDAuMTgpO1xuICAgICAgICBvc2MuY29ubmVjdChnYWluKTtcbiAgICAgICAgZ2Fpbi5jb25uZWN0KGN0eC5kZXN0aW5hdGlvbik7XG4gICAgICAgIG9zYy5zdGFydCgpO1xuICAgICAgICBvc2Muc3RvcChjdHguY3VycmVudFRpbWUgKyAwLjE4KTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2FjdGl2YXRlJykge1xuICAgICAgICBjb25zdCBvc2MgPSBjdHguY3JlYXRlT3NjaWxsYXRvcigpO1xuICAgICAgICBjb25zdCBnYWluID0gY3R4LmNyZWF0ZUdhaW4oKTtcbiAgICAgICAgb3NjLnR5cGUgPSAndHJpYW5nbGUnO1xuICAgICAgICBvc2MuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKDQ0MCwgY3R4LmN1cnJlbnRUaW1lKTtcbiAgICAgICAgb3NjLmZyZXF1ZW5jeS5saW5lYXJSYW1wVG9WYWx1ZUF0VGltZSgxMzIwLCBjdHguY3VycmVudFRpbWUgKyAwLjI1KTtcbiAgICAgICAgZ2Fpbi5nYWluLnNldFZhbHVlQXRUaW1lKDAuMSwgY3R4LmN1cnJlbnRUaW1lKTtcbiAgICAgICAgZ2Fpbi5nYWluLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKDAuMDAxLCBjdHguY3VycmVudFRpbWUgKyAwLjI1KTtcbiAgICAgICAgb3NjLmNvbm5lY3QoZ2Fpbik7XG4gICAgICAgIGdhaW4uY29ubmVjdChjdHguZGVzdGluYXRpb24pO1xuICAgICAgICBvc2Muc3RhcnQoKTtcbiAgICAgICAgb3NjLnN0b3AoY3R4LmN1cnJlbnRUaW1lICsgMC4yNSk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdhbGFybScpIHtcbiAgICAgICAgY29uc3Qgb3NjID0gY3R4LmNyZWF0ZU9zY2lsbGF0b3IoKTtcbiAgICAgICAgY29uc3QgZ2FpbiA9IGN0eC5jcmVhdGVHYWluKCk7XG4gICAgICAgIG9zYy50eXBlID0gJ3NxdWFyZSc7XG4gICAgICAgIG9zYy5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoNzAwLCBjdHguY3VycmVudFRpbWUpO1xuICAgICAgICBvc2MuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKDk1MCwgY3R4LmN1cnJlbnRUaW1lICsgMC4xKTtcbiAgICAgICAgZ2Fpbi5nYWluLnNldFZhbHVlQXRUaW1lKDAuMTUsIGN0eC5jdXJyZW50VGltZSk7XG4gICAgICAgIGdhaW4uZ2Fpbi5saW5lYXJSYW1wVG9WYWx1ZUF0VGltZSgwLjAwMSwgY3R4LmN1cnJlbnRUaW1lICsgMC4yMik7XG4gICAgICAgIG9zYy5jb25uZWN0KGdhaW4pO1xuICAgICAgICBnYWluLmNvbm5lY3QoY3R4LmRlc3RpbmF0aW9uKTtcbiAgICAgICAgb3NjLnN0YXJ0KCk7XG4gICAgICAgIG9zYy5zdG9wKGN0eC5jdXJyZW50VGltZSArIDAuMjIpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnY2N0dicpIHtcbiAgICAgICAgY29uc3Qgb3NjID0gY3R4LmNyZWF0ZU9zY2lsbGF0b3IoKTtcbiAgICAgICAgY29uc3QgZ2FpbiA9IGN0eC5jcmVhdGVHYWluKCk7XG4gICAgICAgIG9zYy50eXBlID0gJ3NpbmUnO1xuICAgICAgICBvc2MuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKDEyMDAsIGN0eC5jdXJyZW50VGltZSk7XG4gICAgICAgIG9zYy5mcmVxdWVuY3kubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUoNjAwLCBjdHguY3VycmVudFRpbWUgKyAwLjA1KTtcbiAgICAgICAgZ2Fpbi5nYWluLnNldFZhbHVlQXRUaW1lKDAuMDUsIGN0eC5jdXJyZW50VGltZSk7XG4gICAgICAgIGdhaW4uZ2Fpbi5saW5lYXJSYW1wVG9WYWx1ZUF0VGltZSgwLjAwMSwgY3R4LmN1cnJlbnRUaW1lICsgMC4wNSk7XG4gICAgICAgIG9zYy5jb25uZWN0KGdhaW4pO1xuICAgICAgICBnYWluLmNvbm5lY3QoY3R4LmRlc3RpbmF0aW9uKTtcbiAgICAgICAgb3NjLnN0YXJ0KCk7XG4gICAgICAgIG9zYy5zdG9wKGN0eC5jdXJyZW50VGltZSArIDAuMDUpO1xuICAgICAgfVxuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gSWdub3JlZFxuICAgIH1cbiAgfTtcblxuICAvLyBMaXZlIENsb2NrICYgQXRtb3NwaGVyaWMgZmx1Y3R1YXRpb25cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCB1cGRhdGVUaW1lID0gKCkgPT4ge1xuICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgIHNldFJlYWxUaW1lKG5vdy50b0xvY2FsZVRpbWVTdHJpbmcoJ3BsLVBMJywgeyBob3VyOiAnMi1kaWdpdCcsIG1pbnV0ZTogJzItZGlnaXQnLCBzZWNvbmQ6ICcyLWRpZ2l0JyB9KSk7XG4gICAgfTtcbiAgICB1cGRhdGVUaW1lKCk7XG4gICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCh1cGRhdGVUaW1lLCAxMDAwKTtcblxuICAgIGNvbnN0IHdlYXRoZXJJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIHNldEJhcm9tZXRyaWNQcmVzc3VyZShwcmV2ID0+ICsocHJldiArIChNYXRoLnJhbmRvbSgpICogMC40IC0gMC4yKSkudG9GaXhlZCgxKSk7XG4gICAgICBzZXRXaW5kU3BlZWQocHJldiA9PiArKE1hdGgubWF4KDE1LCBNYXRoLm1pbig2NSwgcHJldiArIChNYXRoLnJhbmRvbSgpICogMiAtIDEpKSkpLnRvRml4ZWQoMSkpO1xuICAgICAgc2V0Q28yTGV2ZWwocHJldiA9PiBNYXRoLmZsb29yKDQxMCArIE1hdGgucmFuZG9tKCkgKiAxNSkpO1xuICAgIH0sIDQwMDApO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgY2xlYXJJbnRlcnZhbCh3ZWF0aGVySW50ZXJ2YWwpO1xuICAgIH07XG4gIH0sIFtdKTtcblxuICAvLyBHbG9iYWwgTmV0d29yayBOb2Rlc1xuICBjb25zdCBuZXR3b3JrTm9kZXM6IENpdHlOb2RlW10gPSBbXG4gICAgeyBpZDogJ3dhdycsIG5hbWU6ICdXYXJzemF3YSBDZW50cmFsYScsIGNvdW50cnk6ICdQTCcsIHRocmVhdExldmVsOiAnbG93JywgbGF0ZW5jeTogNCwgYWN0aXZlQXR0YWNrczogMCwgc2hpZWxkU3RyZW5ndGg6IDk5LjkgfSxcbiAgICB7IGlkOiAndHlvJywgbmFtZTogJ1Rva2lvIE5lby1DaGl5b2RhJywgY291bnRyeTogJ0pQJywgdGhyZWF0TGV2ZWw6ICdlbGV2YXRlZCcsIGxhdGVuY3k6IDE0MiwgYWN0aXZlQXR0YWNrczogMiwgc2hpZWxkU3RyZW5ndGg6IDk3LjQgfSxcbiAgICB7IGlkOiAnbnljJywgbmFtZTogJ05vd3kgSm9yayBNYW5oYXR0YW4nLCBjb3VudHJ5OiAnVVMnLCB0aHJlYXRMZXZlbDogJ2xvdycsIGxhdGVuY3k6IDg4LCBhY3RpdmVBdHRhY2tzOiAwLCBzaGllbGRTdHJlbmd0aDogOTkuMSB9LFxuICAgIHsgaWQ6ICdsb24nLCBuYW1lOiAnTG9uZHluIENhbmFyeSBXaGFyZicsIGNvdW50cnk6ICdVSycsIHRocmVhdExldmVsOiAnbG93JywgbGF0ZW5jeTogMjksIGFjdGl2ZUF0dGFja3M6IDAsIHNoaWVsZFN0cmVuZ3RoOiA5OC43IH0sXG4gICAgeyBpZDogJ3NncCcsIG5hbWU6ICdTaW5nYXB1ciBNYXJpbmEgQmF5JywgY291bnRyeTogJ1NHJywgdGhyZWF0TGV2ZWw6ICdjcml0aWNhbCcsIGxhdGVuY3k6IDE5OCwgYWN0aXZlQXR0YWNrczogNywgc2hpZWxkU3RyZW5ndGg6IDg4LjIgfSxcbiAgICB7IGlkOiAnZnJhJywgbmFtZTogJ0ZyYW5rZnVydCBDeWJlciBIdWInLCBjb3VudHJ5OiAnREUnLCB0aHJlYXRMZXZlbDogJ2xvdycsIGxhdGVuY3k6IDE4LCBhY3RpdmVBdHRhY2tzOiAwLCBzaGllbGRTdHJlbmd0aDogOTkuOCB9LFxuICBdO1xuXG4gIC8vIENDVFYgRmVlZHNcbiAgY29uc3QgY2N0dkZlZWRzOiBDQ1RWQ2FtZXJhW10gPSBbXG4gICAgeyBpZDogJ2NhbS0xJywgbmFtZTogJ0NBTS0wMSDigKIgVGFyYXMgV2lkb2tvd3kgNTBQJywgbG9jYXRpb246ICdQZW50aG91c2UgUGVyaW1ldGVyIFdlc3QnLCBzdGF0dXM6ICdPTkxJTkUnLCBmcHM6IDYwLCBjb2xvclNjaGVtZTogJ2N5YW4nLCBkZXNjcmlwdGlvbjogJ1Bhbm9yYW1hIHphY2hvZHUgc8WCb8WEY2EgaSBrb3J5dGFyeiBwb3dpZXRyem55JyB9LFxuICAgIHsgaWQ6ICdjYW0tMicsIG5hbWU6ICdDQU0tMDIg4oCiIFNhbGEgS29uZmVyZW5jeWpuYScsIGxvY2F0aW9uOiAnRXhlY3V0aXZlIEJvYXJkcm9vbSA1MFAnLCBzdGF0dXM6ICdSRUNPUkRJTkcnLCBmcHM6IDYwLCBjb2xvclNjaGVtZTogJ2FtYmVyJywgZGVzY3JpcHRpb246ICdTdMOzxYIga29uZmVyZW5jeWpueSBCdWpvayBNZWRpY2FsIGkgcHJvamVrdG9yIGhvbG8nIH0sXG4gICAgeyBpZDogJ2NhbS0zJywgbmFtZTogJ0NBTS0wMyDigKIgSGVsaXBhZCBEYWNob3d5JywgbG9jYXRpb246ICdSb29mIFNreXBvcnQgVG93ZXIgQScsIHN0YXR1czogJ09OTElORScsIGZwczogMzAsIGNvbG9yU2NoZW1lOiAnZW1lcmFsZCcsIGRlc2NyaXB0aW9uOiAnR290b3dvxZvEhyBlc2tvcnR5IG1lZHljem5laiBpIGzEhWRvd2lza2EnIH0sXG4gICAgeyBpZDogJ2NhbS00JywgbmFtZTogJ0NBTS0wNCDigKIgU2Vyd2Vyb3duaWEgUGnEmXRybyA0OScsIGxvY2F0aW9uOiAnTW9ub2xpdGggQ29yZSBWYXVsdCcsIHN0YXR1czogJ09OTElORScsIGZwczogNjAsIGNvbG9yU2NoZW1lOiAndmlvbGV0JywgZGVzY3JpcHRpb246ICdNYWNpZXJ6IMWbd2lhdMWCb3dvZG93YSBpIHJlYWt0b3IgVGhyZWUuanMnIH0sXG4gICAgeyBpZDogJ2NhbS01JywgbmFtZTogJ0NBTS0wNSDigKIgQWt3YXJpdW0gR25pZCcsIGxvY2F0aW9uOiAnU3ViLWxldmVsIENyeW8gTGFiJywgc3RhdHVzOiAnQUxFUlQnLCBmcHM6IDYwLCBjb2xvclNjaGVtZTogJ3JlZCcsIGRlc2NyaXB0aW9uOiAnUHJ6ZXN6a2xvbnkgemJpb3JuaWsgem5ldXRyYWxpem93YW55Y2ggd2lydXPDs3cnIH0sXG4gICAgeyBpZDogJ2NhbS02JywgbmFtZTogJ0NBTS0wNiDigKIgxZpsdXphIEJlenBpZWN6ZcWEc3R3YScsIGxvY2F0aW9uOiAnRWxldmF0b3IgU2hhZnQgNTBQIEV4cHJlc3MnLCBzdGF0dXM6ICdPTkxJTkUnLCBmcHM6IDYwLCBjb2xvclNjaGVtZTogJ2N5YW4nLCBkZXNjcmlwdGlvbjogJ0Jpb21ldHJ5Y3puYSB3aW5kYSBtYWduZXR5Y3puYScgfSxcbiAgXTtcblxuICAvLyAzRCBUaHJlZS5qcyBIb2xvZ3JhbSBDaXR5IEdlbmVyYXRvciBvdmVyIHRoZSBjb25mZXJlbmNlIHRhYmxlIHByb2plY3RvclxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghY2FudmFzUmVmLmN1cnJlbnQpIHJldHVybjtcblxuICAgIGNvbnN0IGNhbnZhcyA9IGNhbnZhc1JlZi5jdXJyZW50O1xuICAgIGNvbnN0IHdpZHRoID0gY2FudmFzLmNsaWVudFdpZHRoIHx8IDYwMDtcbiAgICBjb25zdCBoZWlnaHQgPSBjYW52YXMuY2xpZW50SGVpZ2h0IHx8IDQwMDtcblxuICAgIGNvbnN0IHNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG4gICAgc2NlbmUuZm9nID0gbmV3IFRIUkVFLkZvZ0V4cDIoMHgwMjA2MTcsIDAuMDM1KTtcblxuICAgIGNvbnN0IGNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg0NSwgd2lkdGggLyBoZWlnaHQsIDAuMSwgMTAwKTtcbiAgICBjYW1lcmEucG9zaXRpb24uc2V0KDAsIDcsIDEyKTtcbiAgICBjYW1lcmEubG9va0F0KDAsIDEsIDApO1xuXG4gICAgY29uc3QgcmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcih7XG4gICAgICBjYW52YXMsXG4gICAgICBhbHBoYTogdHJ1ZSxcbiAgICAgIGFudGlhbGlhczogdHJ1ZSxcbiAgICAgIHBvd2VyUHJlZmVyZW5jZTogJ2hpZ2gtcGVyZm9ybWFuY2UnXG4gICAgfSk7XG4gICAgcmVuZGVyZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICByZW5kZXJlci5zZXRQaXhlbFJhdGlvKE1hdGgubWluKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvLCAyKSk7XG5cbiAgICBjb25zdCBiYXNlUmluZ0dlbyA9IG5ldyBUSFJFRS5SaW5nR2VvbWV0cnkoNC4yLCA0LjQsIDY0KTtcbiAgICBjb25zdCBiYXNlUmluZ01hdCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gICAgICBjb2xvcjogaG9sb2dyYW1Db2xvciA9PT0gJ2N5YW4nID8gMHgwNmI2ZDQgOiBob2xvZ3JhbUNvbG9yID09PSAndmlvbGV0JyA/IDB4YTg1NWY3IDogaG9sb2dyYW1Db2xvciA9PT0gJ2VtZXJhbGQnID8gMHgxMGI5ODEgOiAweGY1OWUwYixcbiAgICAgIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGUsXG4gICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgIG9wYWNpdHk6IDAuN1xuICAgIH0pO1xuICAgIGNvbnN0IGJhc2VSaW5nID0gbmV3IFRIUkVFLk1lc2goYmFzZVJpbmdHZW8sIGJhc2VSaW5nTWF0KTtcbiAgICBiYXNlUmluZy5yb3RhdGlvbi54ID0gTWF0aC5QSSAvIDI7XG4gICAgc2NlbmUuYWRkKGJhc2VSaW5nKTtcblxuICAgIGNvbnN0IGdyaWRIZWxwZXIgPSBuZXcgVEhSRUUuR3JpZEhlbHBlcig4LCAxNiwgMHgwNmI2ZDQsIDB4MWUyOTNiKTtcbiAgICBncmlkSGVscGVyLnBvc2l0aW9uLnkgPSAtMC4wNTtcbiAgICBzY2VuZS5hZGQoZ3JpZEhlbHBlcik7XG5cbiAgICBjb25zdCBjaXR5R3JvdXAgPSBuZXcgVEhSRUUuR3JvdXAoKTtcbiAgICBzY2VuZS5hZGQoY2l0eUdyb3VwKTtcblxuICAgIGNvbnN0IGJ1aWxkaW5nTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoe1xuICAgICAgY29sb3I6IGhvbG9ncmFtQ29sb3IgPT09ICdjeWFuJyA/IDB4MDBmMGZmIDogaG9sb2dyYW1Db2xvciA9PT0gJ3Zpb2xldCcgPyAweDhiNWNmNiA6IGhvbG9ncmFtQ29sb3IgPT09ICdlbWVyYWxkJyA/IDB4MTBiOTgxIDogMHhmNTllMGIsXG4gICAgICBlbWlzc2l2ZTogaG9sb2dyYW1Db2xvciA9PT0gJ2N5YW4nID8gMHgwMDQ0NjYgOiBob2xvZ3JhbUNvbG9yID09PSAndmlvbGV0JyA/IDB4M2IwNzY0IDogaG9sb2dyYW1Db2xvciA9PT0gJ2VtZXJhbGQnID8gMHgwNjRlM2IgOiAweDc4MzUwZixcbiAgICAgIHJvdWdobmVzczogMC4yLFxuICAgICAgbWV0YWxuZXNzOiAwLjgsXG4gICAgICB3aXJlZnJhbWU6IHdpcmVmcmFtZU1vZGUsXG4gICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgIG9wYWNpdHk6IDAuOTVcbiAgICB9KTtcblxuICAgIGNvbnN0IGVkZ2VNYXRlcmlhbCA9IG5ldyBUSFJFRS5MaW5lQmFzaWNNYXRlcmlhbCh7XG4gICAgICBjb2xvcjogMHhmZmZmZmYsXG4gICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgIG9wYWNpdHk6IDAuODVcbiAgICB9KTtcblxuICAgIC8vIENlbnRyYWwgTGFuZG1hcmsgQnVqb2sgVG93ZXJcbiAgICBjb25zdCBsYW5kbWFya0hlaWdodCA9IDUuODtcbiAgICBjb25zdCBsYW5kbWFya0dlbyA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSgwLjgsIGxhbmRtYXJrSGVpZ2h0LCAwLjgpO1xuICAgIGNvbnN0IGxhbmRtYXJrID0gbmV3IFRIUkVFLk1lc2gobGFuZG1hcmtHZW8sIGJ1aWxkaW5nTWF0ZXJpYWwpO1xuICAgIGxhbmRtYXJrLnBvc2l0aW9uLnNldCgwLCBsYW5kbWFya0hlaWdodCAvIDIsIDApO1xuICAgIGNpdHlHcm91cC5hZGQobGFuZG1hcmspO1xuXG4gICAgY29uc3QgcmFuZG9tU2VlZCA9IFtcbiAgICAgIHsgeDogMS4yLCB6OiAwLjYsIGg6IDQuMiwgdzogMC42IH0sXG4gICAgICB7IHg6IC0xLjEsIHo6IDAuOCwgaDogMy42LCB3OiAwLjUgfSxcbiAgICAgIHsgeDogMC43LCB6OiAtMS4zLCBoOiA0LjUsIHc6IDAuNyB9LFxuICAgICAgeyB4OiAtMC45LCB6OiAtMS4xLCBoOiAzLjksIHc6IDAuNiB9LFxuICAgICAgeyB4OiAxLjgsIHo6IDEuNCwgaDogMy4xLCB3OiAwLjUgfSxcbiAgICAgIHsgeDogLTEuOSwgejogMS4yLCBoOiAyLjgsIHc6IDAuNiB9LFxuICAgICAgeyB4OiAyLjEsIHo6IC0wLjksIGg6IDMuNCwgdzogMC41IH0sXG4gICAgICB7IHg6IC0yLjAsIHo6IC0xLjUsIGg6IDIuNiwgdzogMC42IH0sXG4gICAgICB7IHg6IDAuMiwgejogMi4yLCBoOiAyLjksIHc6IDAuNyB9LFxuICAgICAgeyB4OiAtMC4zLCB6OiAtMi4zLCBoOiAzLjMsIHc6IDAuNSB9LFxuICAgICAgeyB4OiAyLjcsIHo6IDAuMywgaDogMi4xLCB3OiAwLjQgfSxcbiAgICAgIHsgeDogLTIuOCwgejogMC4yLCBoOiAyLjIsIHc6IDAuNSB9LFxuICAgICAgeyB4OiAxLjUsIHo6IC0yLjQsIGg6IDIuNSwgdzogMC41IH0sXG4gICAgICB7IHg6IC0xLjYsIHo6IDIuNSwgaDogMi4zLCB3OiAwLjUgfSxcbiAgICAgIHsgeDogMi41LCB6OiAyLjEsIGg6IDEuOCwgdzogMC40IH0sXG4gICAgICB7IHg6IC0yLjYsIHo6IC0yLjIsIGg6IDEuOSwgdzogMC40IH0sXG4gICAgICB7IHg6IDMuMiwgejogLTEuNSwgaDogMS41LCB3OiAwLjQgfSxcbiAgICAgIHsgeDogLTMuMywgejogMS42LCBoOiAxLjQsIHc6IDAuNCB9LFxuICAgICAgeyB4OiAwLjksIHo6IDMuMSwgaDogMS43LCB3OiAwLjQgfSxcbiAgICAgIHsgeDogLTEuMSwgejogLTMuMiwgaDogMS42LCB3OiAwLjQgfSxcbiAgICBdO1xuXG4gICAgcmFuZG9tU2VlZC5mb3JFYWNoKChzcGVjKSA9PiB7XG4gICAgICBjb25zdCBiR2VvID0gbmV3IFRIUkVFLkJveEdlb21ldHJ5KHNwZWMudywgc3BlYy5oLCBzcGVjLncpO1xuICAgICAgY29uc3QgYk1lc2ggPSBuZXcgVEhSRUUuTWVzaChiR2VvLCBidWlsZGluZ01hdGVyaWFsKTtcbiAgICAgIGJNZXNoLnBvc2l0aW9uLnNldChzcGVjLngsIHNwZWMuaCAvIDIsIHNwZWMueik7XG4gICAgICBjaXR5R3JvdXAuYWRkKGJNZXNoKTtcblxuICAgICAgY29uc3QgZWRnZXMgPSBuZXcgVEhSRUUuRWRnZXNHZW9tZXRyeShiR2VvKTtcbiAgICAgIGNvbnN0IGxpbmUgPSBuZXcgVEhSRUUuTGluZVNlZ21lbnRzKGVkZ2VzLCBlZGdlTWF0ZXJpYWwpO1xuICAgICAgYk1lc2guYWRkKGxpbmUpO1xuICAgIH0pO1xuXG4gICAgY29uc3Qgc2NhblBsYW5lR2VvID0gbmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkoNy41LCA3LjUpO1xuICAgIGNvbnN0IHNjYW5QbGFuZU1hdCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gICAgICBjb2xvcjogMHgzOGJkZjgsXG4gICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgIG9wYWNpdHk6IDAuMjUsXG4gICAgICBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlXG4gICAgfSk7XG4gICAgY29uc3Qgc2NhblBsYW5lID0gbmV3IFRIUkVFLk1lc2goc2NhblBsYW5lR2VvLCBzY2FuUGxhbmVNYXQpO1xuICAgIHNjYW5QbGFuZS5yb3RhdGlvbi54ID0gTWF0aC5QSSAvIDI7XG4gICAgc2NlbmUuYWRkKHNjYW5QbGFuZSk7XG5cbiAgICBjb25zdCB0aHJlYXRHZW8gPSBuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoMC4xOCwgMTYsIDE2KTtcbiAgICBjb25zdCB0aHJlYXRNYXQgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoeyBjb2xvcjogMHhlZjQ0NDQgfSk7XG4gICAgY29uc3QgdGhyZWF0QmVhY29uID0gbmV3IFRIUkVFLk1lc2godGhyZWF0R2VvLCB0aHJlYXRNYXQpO1xuICAgIHRocmVhdEJlYWNvbi5wb3NpdGlvbi5zZXQoMS4yLCA0LjMsIDAuNik7XG4gICAgdGhyZWF0QmVhY29uLnZpc2libGUgPSB0aHJlYXREZXRlY3RlZEluQ2l0eTtcbiAgICBjaXR5R3JvdXAuYWRkKHRocmVhdEJlYWNvbik7XG5cbiAgICBjb25zdCBhbWJpZW50TGlnaHQgPSBuZXcgVEhSRUUuQW1iaWVudExpZ2h0KDB4ZmZmZmZmLCAwLjYpO1xuICAgIHNjZW5lLmFkZChhbWJpZW50TGlnaHQpO1xuXG4gICAgY29uc3QgZGlyTGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweDM4YmRmOCwgMS4yKTtcbiAgICBkaXJMaWdodC5wb3NpdGlvbi5zZXQoNSwgMTAsIDcpO1xuICAgIHNjZW5lLmFkZChkaXJMaWdodCk7XG5cbiAgICBsZXQgYW5pbWF0aW9uRnJhbWVJZDogbnVtYmVyO1xuICAgIGxldCBzY2FuWSA9IDA7XG4gICAgbGV0IHNjYW5EaXJlY3Rpb24gPSAxO1xuXG4gICAgY29uc3QgYW5pbWF0ZSA9ICgpID0+IHtcbiAgICAgIGFuaW1hdGlvbkZyYW1lSWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XG5cbiAgICAgIGlmIChpc1JvdGF0aW5nKSB7XG4gICAgICAgIGNpdHlHcm91cC5yb3RhdGlvbi55ICs9IGhvbG9Sb3RhdGlvblNwZWVkO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2Nhbkxhc2VyQWN0aXZlKSB7XG4gICAgICAgIHNjYW5ZICs9IDAuMDMgKiBzY2FuRGlyZWN0aW9uO1xuICAgICAgICBpZiAoc2NhblkgPiA1LjUpIHNjYW5EaXJlY3Rpb24gPSAtMTtcbiAgICAgICAgZWxzZSBpZiAoc2NhblkgPCAwKSBzY2FuRGlyZWN0aW9uID0gMTtcbiAgICAgICAgc2NhblBsYW5lLnBvc2l0aW9uLnkgPSBzY2FuWTtcbiAgICAgICAgc2NhblBsYW5lLnZpc2libGUgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2NhblBsYW5lLnZpc2libGUgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRocmVhdEJlYWNvbi52aXNpYmxlKSB7XG4gICAgICAgIGNvbnN0IHNjYWxlID0gMSArIE1hdGguc2luKERhdGUubm93KCkgKiAwLjAxKSAqIDAuMztcbiAgICAgICAgdGhyZWF0QmVhY29uLnNjYWxlLnNldChzY2FsZSwgc2NhbGUsIHNjYWxlKTtcbiAgICAgIH1cblxuICAgICAgcmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEpO1xuICAgIH07XG5cbiAgICBhbmltYXRlKCk7XG5cbiAgICBjb25zdCBoYW5kbGVSZXNpemUgPSAoKSA9PiB7XG4gICAgICBpZiAoIWNhbnZhcykgcmV0dXJuO1xuICAgICAgY29uc3QgdyA9IGNhbnZhcy5jbGllbnRXaWR0aDtcbiAgICAgIGNvbnN0IGggPSBjYW52YXMuY2xpZW50SGVpZ2h0O1xuICAgICAgY2FtZXJhLmFzcGVjdCA9IHcgLyBoO1xuICAgICAgY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgICAgIHJlbmRlcmVyLnNldFNpemUodywgaCk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVSZXNpemUpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGFuaW1hdGlvbkZyYW1lSWQpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZVJlc2l6ZSk7XG4gICAgICByZW5kZXJlci5kaXNwb3NlKCk7XG4gICAgfTtcbiAgfSwgW2hvbG9Sb3RhdGlvblNwZWVkLCBpc1JvdGF0aW5nLCB3aXJlZnJhbWVNb2RlLCBzY2FuTGFzZXJBY3RpdmUsIHRocmVhdERldGVjdGVkSW5DaXR5LCBob2xvZ3JhbUNvbG9yXSk7XG5cbiAgLy8gRXhwb3J0IEZvcmVuc2ljL0hvbG8gVGVsZW1ldHJ5IHRvIEpTT05cbiAgY29uc3QgZXhwb3J0SG9sb2dyYW1UZWxlbWV0cnkgPSAoKSA9PiB7XG4gICAgcGxheUhvbG9Tb3VuZCgnYmVlcCcpO1xuICAgIGNvbnN0IHRlbGVtZXRyeVJlcG9ydCA9IHtcbiAgICAgIGZhY2lsaXR5OiBcIkJVSk9LIE1FRElDQUwgQ09NTUFORCBQRU5USE9VU0VcIixcbiAgICAgIGZsb29yOiA1MCxcbiAgICAgIGFsdGl0dWRlX21ldGVyczogMjEwLFxuICAgICAgZGVmY29uTGV2ZWwsXG4gICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgIHBlbnRob3VzZVN0YXR1czoge1xuICAgICAgICBhbGFybUxldmVsOiBwZW50aG91c2VBbGFybUxldmVsLFxuICAgICAgICBwZXJpbWV0ZXJTaGllbGQ6IHBlbnRob3VzZVNoaWVsZEFjdGl2ZSA/IFwiMTAwJSBUSVRBTklVTS1GT1JDRUZJRUxEXCIgOiBcIkRJU0VOR0FHRURcIixcbiAgICAgICAgZHJvbmVEZWZlbnNlOiBkcm9uZURlZmVuc2VBY3RpdmUgPyBcIkFDVElWRSBFTVAgSkFNTUlOR1wiIDogXCJTVEFOREJZXCIsXG4gICAgICAgIGJhcm9tZXRyaWNQcmVzc3VyZTogYCR7YmFyb21ldHJpY1ByZXNzdXJlfSBoUGFgLFxuICAgICAgICB3aW5kVmVsb2NpdHk6IGAke3dpbmRTcGVlZH0ga20vaGAsXG4gICAgICAgIGNvMkF0bW9zcGhlcmU6IGAke2NvMkxldmVsfSBwcG1gLFxuICAgICAgfSxcbiAgICAgIGdsb2JhbE5ldHdvcmtOb2RlczogbmV0d29ya05vZGVzLFxuICAgICAgc3VydmVpbGxhbmNlQ0NUVjogY2N0dkZlZWRzLm1hcChjID0+ICh7IGlkOiBjLmlkLCBuYW1lOiBjLm5hbWUsIHN0YXR1czogYy5zdGF0dXMgfSkpXG4gICAgfTtcblxuICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbSlNPTi5zdHJpbmdpZnkodGVsZW1ldHJ5UmVwb3J0LCBudWxsLCAyKV0sIHsgdHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nIH0pO1xuICAgIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgY29uc3QgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBhLmhyZWYgPSB1cmw7XG4gICAgYS5kb3dubG9hZCA9IGBidWpvay1tZWRpY2FsLXBlbnRob3VzZS01MHAtJHtEYXRlLm5vdygpfS5qc29uYDtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGEpO1xuICAgIGEuY2xpY2soKTtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGEpO1xuICAgIFVSTC5yZXZva2VPYmplY3RVUkwodXJsKTtcblxuICAgIHNldExhc3RBY3Rpb25NZXNzYWdlKCdQb2JyYW5vIHphc3p5ZnJvd2FueSByYXBvcnQgdGVsZW1ldHJ5Y3pueSBOQVRPIFNUQU5BRyAoSlNPTikuJyk7XG4gIH07XG5cbiAgY29uc3QgdHJpZ2dlckNpdHlUaHJlYXRTY2FuID0gKCkgPT4ge1xuICAgIHBsYXlIb2xvU291bmQoJ2xhc2VyJyk7XG4gICAgc2V0U2Nhbkxhc2VyQWN0aXZlKHRydWUpO1xuICAgIHNldFRocmVhdERldGVjdGVkSW5DaXR5KHRydWUpO1xuICAgIHNldExhc3RBY3Rpb25NZXNzYWdlKCdTa2FuZXIgbGFzZXJvd3kgbmFtaWVyennFgiB3cm9naSBwcm9jZXMgdyBTZWt0b3J6ZSBXc2Nob2RuaW0hIFByemVzxYJhbm8ga29vcmR5bmF0eSBkbyBiYXRlcmlpLicpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc2V0VGhyZWF0RGV0ZWN0ZWRJbkNpdHkoZmFsc2UpO1xuICAgICAgc2V0TGFzdEFjdGlvbk1lc3NhZ2UoJ1dla3RvciB6YWdyb8W8ZW5pYSB6ZGV6aW50ZWdyb3dhbnkgcHJ6ZXogaW1wdWxzIENld2tpIFRlc2xpIEJ1am9rIE1lZGljYWwuJyk7XG4gICAgICBwbGF5SG9sb1NvdW5kKCdhY3RpdmF0ZScpO1xuICAgIH0sIDQ1MDApO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTYgdy1mdWxsIHRleHQtc2xhdGUtMTAwXCI+XG4gICAgICB7LyogVG9wIERlY2sgSGVhZGVyOiBQZW50aG91c2UgNTB0aCBGbG9vciBFeGVjdXRpdmUgTmF2aWdhdGlvbiAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHNtOnAtNiByb3VuZGVkLTN4bCBiZy1zbGF0ZS05MDAvOTUgYm9yZGVyLTIgYm9yZGVyLWN5YW4tNTAwLzUwIHNoYWRvdy0yeGwgYmFja2Ryb3AtYmx1ci14bCByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgey8qIEdsb3cgYmFja2Ryb3AgcmliYm9uICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIC10b3AtMjQgLWxlZnQtMjQgdy05NiBoLTk2IGJnLWN5YW4tNjAwLzIwIHJvdW5kZWQtZnVsbCBibHVyLTN4bCBwb2ludGVyLWV2ZW50cy1ub25lXCIgLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSAtYm90dG9tLTI0IC1yaWdodC0yNCB3LTk2IGgtOTYgYmctcHVycGxlLTYwMC8yMCByb3VuZGVkLWZ1bGwgYmx1ci0zeGwgcG9pbnRlci1ldmVudHMtbm9uZVwiIC8+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGxnOmZsZXgtcm93IGl0ZW1zLXN0YXJ0IGxnOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTQgcmVsYXRpdmUgei0xMFwiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zIGZsZXgtd3JhcFwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwLTMgcm91bmRlZC0yeGwgYmctZ3JhZGllbnQtdG8tYnIgZnJvbS1hbWJlci01MDAvMzAgdmlhLWN5YW4tNTAwLzIwIHRvLXB1cnBsZS01MDAvMzAgYm9yZGVyIGJvcmRlci1hbWJlci00MDAvNzAgc2hhZG93LWxnXCI+XG4gICAgICAgICAgICAgICAgPEJ1aWxkaW5nMiBjbGFzc05hbWU9XCJ3LTcgaC03IHRleHQtYW1iZXItMzAwXCIgLz5cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgZmxleC13cmFwXCI+XG4gICAgICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC14bCBzbTp0ZXh0LTJ4bCBmb250LWJsYWNrIHRyYWNraW5nLXRpZ2h0IHRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+QlVKT0sgTUVESUNBTDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1jeWFuLTQwMCBmb250LW1vbm8gdGV4dC1zbSBzbTp0ZXh0LWJhc2UgZm9udC1ib2xkXCI+LyBQRU5USE9VU0UgREVDSyA1MC4gUEnEmFRSTzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvaDE+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0yLjUgcHktMC41IHJvdW5kZWQtZnVsbCB0ZXh0LVsxMHB4XSBmb250LW1vbm8gZm9udC1ibGFjayBiZy1hbWJlci01MDAvMjUgdGV4dC1hbWJlci0zMDAgYm9yZGVyIGJvcmRlci1hbWJlci00MDAvODAgc2hhZG93XCI+XG4gICAgICAgICAgICAgICAgICAgIFNUQU5BRyBNSUwtU1RELTgxMFxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgcHgtMiBweS0wLjUgcm91bmRlZCB0ZXh0LVsxMHB4XSBmb250LW1vbm8gZm9udC1ibGFjayAke1xuICAgICAgICAgICAgICAgICAgICBkZWZjb25MZXZlbCA9PT0gMSA/ICdiZy1yZWQtOTUwIHRleHQtcmVkLTMwMCBib3JkZXIgYm9yZGVyLXJlZC01MDAgYW5pbWF0ZS1wdWxzZScgOlxuICAgICAgICAgICAgICAgICAgICBkZWZjb25MZXZlbCA9PT0gMiA/ICdiZy1hbWJlci05NTAgdGV4dC1hbWJlci0zMDAgYm9yZGVyIGJvcmRlci1hbWJlci01MDAnIDpcbiAgICAgICAgICAgICAgICAgICAgJ2JnLWVtZXJhbGQtOTUwIHRleHQtZW1lcmFsZC0zMDAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTUwMCdcbiAgICAgICAgICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgICAgICAgICAgREVGQ09OLXtkZWZjb25MZXZlbH1cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHNtOnRleHQtc20gdGV4dC1zbGF0ZS0zMDAgbXQtMVwiPlxuICAgICAgICAgICAgICAgICAgU2FsYSBrb25mZXJlbmN5am5hIHplIHN0b8WCZW0gcHJlenlkZW5ja2ltLCBwcnplenJvY3p5c3R5bWkgZWtyYW5hbWkgaG9sb2dyYW1vd3ltaSBpIHBhbmVsYW1pIHR5dGFub3dvLXN0YWxvd3ltaS5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBFbnZpcm9ubWVudGFsIE1pY3JvLUJhciAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgc206Z2FwLTMgbXQtMyB0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTQwMCBmbGV4LXdyYXBcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0yLjUgcHktMSByb3VuZGVkLWxnIGJnLXNsYXRlLTk1MC85MCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCBzaGFkb3ctc21cIj5cbiAgICAgICAgICAgICAgICA8Q29tcGFzcyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWN5YW4tNDAwXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5XeXNva2/Fm8SHOiA8YiBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlXCI+MjEwIG0gKDUwUCk8L2I+PC9zcGFuPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgcHgtMi41IHB5LTEgcm91bmRlZC1sZyBiZy1zbGF0ZS05NTAvOTAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgc2hhZG93LXNtXCI+XG4gICAgICAgICAgICAgICAgPFN1biBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWFtYmVyLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+V2lkb2s6IDxiIGNsYXNzTmFtZT1cInRleHQtYW1iZXItMjAwXCI+WmFjaMOzZCBTxYJvxYRjYTwvYj48L3NwYW4+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0yLjUgcHktMSByb3VuZGVkLWxnIGJnLXNsYXRlLTk1MC85MCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCBzaGFkb3ctc21cIj5cbiAgICAgICAgICAgICAgICA8V2luZCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWJsdWUtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5XaWF0cjogPGIgY2xhc3NOYW1lPVwidGV4dC13aGl0ZVwiPnt3aW5kU3BlZWR9IGttL2g8L2I+PC9zcGFuPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgcHgtMi41IHB5LTEgcm91bmRlZC1sZyBiZy1zbGF0ZS05NTAvOTAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgc2hhZG93LXNtXCI+XG4gICAgICAgICAgICAgICAgPEFjdGl2aXR5IGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPkNP4oKCOiA8YiBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlXCI+e2NvMkxldmVsfSBwcG08L2I+PC9zcGFuPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBQb2xpc2hlZCBHbGFzcyAmIFRpdGFuaXVtIEFjdGlvbiBCdXR0b25zICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgZmxleC13cmFwXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICBwbGF5SG9sb1NvdW5kKCdzd2l0Y2gnKTtcbiAgICAgICAgICAgICAgICBzZXRWaWV3TW9kZSh2aWV3TW9kZSA9PT0gJ2hvbG9ncmFtX3Jvb20nID8gJ3RhY3RpY2FsX2NvbnNvbGUnIDogJ2hvbG9ncmFtX3Jvb20nKTtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuLWdsYXNzLXBvbGlzaGVkIHB4LTMuNSBweS0yIHRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3ZpZXdNb2RlID09PSAnaG9sb2dyYW1fcm9vbScgPyA8U2xpZGVycyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWN5YW4tMjAwXCIgLz4gOiA8RXllIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtY3lhbi0yMDBcIiAvPn1cbiAgICAgICAgICAgICAgPHNwYW4+e3ZpZXdNb2RlID09PSAnaG9sb2dyYW1fcm9vbScgPyAnS29uc29sYSBPcGVyYWN5am5hJyA6ICdXaWRvayBQYW5vcmFtaWN6bnkgNTBQJ308L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgcGxheUhvbG9Tb3VuZCgnc3dpdGNoJyk7XG4gICAgICAgICAgICAgICAgc2V0RGVmY29uTGV2ZWwoZGVmY29uTGV2ZWwgPT09IDEgPyAzIDogZGVmY29uTGV2ZWwgPT09IDIgPyAxIDogMik7XG4gICAgICAgICAgICAgICAgc2V0TGFzdEFjdGlvbk1lc3NhZ2UoYFptaWVuaW9ubyBwb3ppb20gZ290b3dvxZtjaSBib2pvd2VqIG5hIERFRkNPTi0ke2RlZmNvbkxldmVsID09PSAxID8gMyA6IGRlZmNvbkxldmVsID09PSAyID8gMSA6IDJ9YCk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0bi10aXRhbml1bS1zdGVlbCBweC0zIHB5LTIgdGV4dC14cyByb3VuZGVkLXhsIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8U2hpZWxkQWxlcnQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1hbWJlci0zMDBcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj5ERUZDT046IHtkZWZjb25MZXZlbH08L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtleHBvcnRIb2xvZ3JhbVRlbGVtZXRyeX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuLWdsb3NzeSBidG4tZ2xvc3N5LXByaW1hcnkgcHgtMyBweS0yIHRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPERvd25sb2FkIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtY3lhbi0yMDBcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj5Fa3Nwb3J0IEpTT048L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBdWRpb0ZlZWRiYWNrKCFhdWRpb0ZlZWRiYWNrKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYnRuLWdsYXNzLXBvbGlzaGVkIHAtMiB0ZXh0LXhzICR7YXVkaW9GZWVkYmFjayA/ICd0ZXh0LWN5YW4tMzAwJyA6ICd0ZXh0LXNsYXRlLTUwMCd9YH1cbiAgICAgICAgICAgICAgdGl0bGU9e2F1ZGlvRmVlZGJhY2sgPyBcIkTFundpxJlraSBha3R5d25lXCIgOiBcIkTFundpxJlraSB3eWNpc3pvbmVcIn1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2F1ZGlvRmVlZGJhY2sgPyA8Vm9sdW1lMiBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz4gOiA8Vm9sdW1lWCBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz59XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIExpdmUgbm90aWZpY2F0aW9uIHRpY2tlciAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0zIHB5LTEuNSBweC0zIHJvdW5kZWQteGwgYmctc2xhdGUtOTUwLzg1IGJvcmRlciBib3JkZXItc2xhdGUtODAwIHRleHQteHMgZm9udC1tb25vIHRleHQtY3lhbi0zMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBvdmVyZmxvdy1oaWRkZW4gdGV4dC1lbGxpcHNpcyB3aGl0ZXNwYWNlLW5vd3JhcFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0yIGgtMiByb3VuZGVkLWZ1bGwgYmctY3lhbi00MDAgYW5pbWF0ZS1waW5nIHNocmluay0wXCIgLz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwXCI+VEVMRU1FVFJJQSA1MFA6PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4+e2xhc3RBY3Rpb25NZXNzYWdlfTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMCB0ZXh0LVsxMXB4XSBzaHJpbmstMCBmb250LW1vbm8gaGlkZGVuIHNtOmlubGluZVwiPntyZWFsVGltZX0gR01UKzE8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBWSUVXIDE6IFBBTk9SQU1JQyBIT0xPR1JBTSBST09NIFdJVEggVFJBTlNQQVJFTlQgU0NSRUVOUyBBVCBDT05GRVJFTkNFIFRBQkxFICovfVxuICAgICAge3ZpZXdNb2RlID09PSAnaG9sb2dyYW1fcm9vbScgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNlwiPlxuICAgICAgICAgIHsvKiBNYWluIFZpc3VhbCBTdGFnZTogNTB0aCBGbG9vciBQYW5vcmFtaWMgQm9hcmRyb29tICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgdy1mdWxsIHJvdW5kZWQtM3hsIG92ZXJmbG93LWhpZGRlbiBib3JkZXItMiBib3JkZXItY3lhbi01MDAvNTAgc2hhZG93LTJ4bCBiZy1zbGF0ZS05NTAgbWluLWgtWzY0MHB4XSBsZzptaW4taC1bNzYwcHhdIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICB7LyogQmFja2dyb3VuZCBJbWFnZTogUGVudGhvdXNlIE9mZmljZSBhdCA1MHRoIEZsb29yICovfVxuICAgICAgICAgICAgPGRpdiBcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1jb3ZlciBiZy1jZW50ZXIgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tNzAwXCJcbiAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJy9hc3NldHMvYWlzdHVkaW8vT2JyYXpla19BcHBsZV9DcmVhdG9yX1N0dWRpb18yMDI2LTEwLTI1XzA2LTM1LTMxXzJfNmNhYWRhYzEucG5nJylgLFxuICAgICAgICAgICAgICAgIGZpbHRlcjogZGVmY29uTGV2ZWwgPT09IDEgPyAnaHVlLXJvdGF0ZSgzMjBkZWcpIGNvbnRyYXN0KDEuMTUpJyA6ICdub25lJ1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgey8qIFN1YnRsZSBhdG1vc3BoZXJpYyB2aWduZXR0ZSBhbmQgc2NhbmxpbmVzICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGJnLWdyYWRpZW50LXRvLXQgZnJvbS1zbGF0ZS05NTAvOTUgdmlhLXRyYW5zcGFyZW50IHRvLXNsYXRlLTk1MC83MCBwb2ludGVyLWV2ZW50cy1ub25lXCIgLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1bbGluZWFyLWdyYWRpZW50KHJnYmEoNiwxODIsMjEyLDAuMDMpXzFweCx0cmFuc3BhcmVudF8xcHgpXSBiZy1bc2l6ZToxMDAlXzRweF0gcG9pbnRlci1ldmVudHMtbm9uZVwiIC8+XG5cbiAgICAgICAgICAgIHsvKiBUT1AgU0tZTElORSBPVkVSTEFZIEhVRCAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgei0yMCBwLTQgc206cC02IGZsZXggaXRlbXMtc3RhcnQganVzdGlmeS1iZXR3ZWVuIGdhcC00IHBvaW50ZXItZXZlbnRzLW5vbmVcIj5cbiAgICAgICAgICAgICAgey8qIExlZnQgRmxvYXRpbmcgQ3Jlc3QgSFVEICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBvaW50ZXItZXZlbnRzLWF1dG8gYnRuLWdsYXNzLXBvbGlzaGVkIHAtMy41IHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItY3lhbi00MDAvNjAgc2hhZG93LXhsIG1heC13LXhzXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBtYi0xLjVcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy03IGgtNyByb3VuZGVkLWxnIGJnLWdyYWRpZW50LXRvLWJyIGZyb20tYW1iZXItNTAwIHRvLWFtYmVyLTcwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBmb250LXNlcmlmIGZvbnQtYmxhY2sgdGV4dC1zbGF0ZS05NTAgdGV4dC1zbSBzaGFkb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgQlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJsYWNrIHRyYWNraW5nLXdpZGVyIHRleHQtd2hpdGVcIj5CVUpPSyBNRURJQ0FMIEhRPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1hbWJlci0zMDAgZm9udC1tb25vXCI+UEVOVEhPVVNFIFNVSVRFIDUwMDE8L3A+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMSB0ZXh0LVsxMXB4XSBmb250LW1vbm8gdGV4dC1zbGF0ZS0zMDAgcHQtMSBib3JkZXItdCBib3JkZXItc2xhdGUtNzAwLzgwXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwXCI+UGFuY2VyeiBTenliOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1lbWVyYWxkLTQwMCBmb250LWJvbGRcIj4xMDAlIFR5dGFuLUtyemVtPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwXCI+Q2V3a2EgVGVzbGkgNTBQOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1jeWFuLTMwMCBmb250LWJvbGRcIj5VWkJST0pPTkE8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIENlbnRlciBTa3kgVGVsZW1ldHJ5IEhVRCAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwb2ludGVyLWV2ZW50cy1hdXRvIGhpZGRlbiBtZDpmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyBidG4tZ2xhc3MtcG9saXNoZWQgcHgtNCBweS0yIHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItY3lhbi00MDAvNjAgdGV4dC14cyBmb250LW1vbm8gc2hhZG93LXhsXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB0ZXh0LWN5YW4tMzAwXCI+XG4gICAgICAgICAgICAgICAgICA8V2luZCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtY3lhbi00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+Q2nFm25pZW5pZToge2Jhcm9tZXRyaWNQcmVzc3VyZX0gaFBhPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTEgaC0zIGJnLXNsYXRlLTYwMCByb3VuZGVkLWZ1bGxcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdGV4dC1hbWJlci0zMDBcIj5cbiAgICAgICAgICAgICAgICAgIDxTdW4gY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWFtYmVyLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5XaWRvY3pub8WbxIc6IDQ4IGttPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTEgaC0zIGJnLXNsYXRlLTYwMCByb3VuZGVkLWZ1bGxcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdGV4dC1wdXJwbGUtMzAwXCI+XG4gICAgICAgICAgICAgICAgICA8U2hpZWxkIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1wdXJwbGUtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPlRhcmN6YSBFTVA6IFfFgcSEQ1pPTkE8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogUmlnaHQgVHJhbnNwYXJlbmN5IFNsaWRlciBmb3IgSG9sb2dyYW0gR2xhc3MgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9pbnRlci1ldmVudHMtYXV0byBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBidG4tZ2xhc3MtcG9saXNoZWQgcHgtMyBweS0xLjUgcm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci1jeWFuLTQwMC82MCB0ZXh0LXhzIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgIDxFeWUgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1jeWFuLTMwMFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS0zMDBcIj5TemvFgm8gSG9sbzo8L3NwYW4+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPVwicmFuZ2VcIlxuICAgICAgICAgICAgICAgICAgbWluPVwiMTVcIlxuICAgICAgICAgICAgICAgICAgbWF4PVwiODVcIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2dsYXNzT3BhY2l0eX1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0R2xhc3NPcGFjaXR5KE51bWJlcihlLnRhcmdldC52YWx1ZSkpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0xNiBoLTEuNSBhY2NlbnQtY3lhbi00MDAgYmctc2xhdGUtODAwIHJvdW5kZWQgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgICAgdGl0bGU9XCJSZWd1bHVqIHByemV6cm9jenlzdG/Fm8SHIHN6a2xhbnljaCBla3JhbsOzdyBob2xvZ3JhbW93eWNoIHByenkgc3RvbGVcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1jeWFuLTMwMCBmb250LWJvbGRcIj57Z2xhc3NPcGFjaXR5fSU8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBDT05GRVJFTkNFIFRBQkxFIEFSRUE6IFBSWkVaUk9DWllTVEUgRUtSQU5ZIEhPTE9HUkFNT1dFIFBSWlkgU1RPTEUgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIHotMTAgZmxleC0xIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHAtMiBzbTpwLTRcIj5cbiAgICAgICAgICAgICAgey8qIE91dGVyIGNvbnRhaW5lciBncm91cGluZyB0cmFuc3BhcmVudCBzY3JlZW5zIGFyb3VuZCB0aGUgY2VudHJhbCB0YWJsZSBwcm9qZWN0b3IgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgdy1mdWxsIG1heC13LTV4bCBmbGV4IGZsZXgtY29sIG1kOmZsZXgtcm93IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTRcIj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB7LyogMS4gTEVXWSBQUlpFWlJPQ1pZU1RZIEVLUkFOIEhPTE9HUkFNT1dZOiBTZWt0b3IgT2Jyb255IFBvd2lldHJ6bmVqICYgS29yeXRhcnogRHJvbm93eSAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IFxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaG9sb2dyYW0tZ2xhc3Mtc2NyZWVuIHctZnVsbCBtZDp3LTY0IHAtMy41IHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItY3lhbi00MDAvNzAgc2hhZG93LTJ4bCByZWxhdGl2ZSB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgcG9pbnRlci1ldmVudHMtYXV0b1wiXG4gICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGByZ2JhKDYsIDE4MiwgMjEyLCAke2dsYXNzT3BhY2l0eSAvIDM1MH0pYCxcbiAgICAgICAgICAgICAgICAgICAgYmFja2Ryb3BGaWx0ZXI6IGBibHVyKCR7TWF0aC5tYXgoNiwgZ2xhc3NPcGFjaXR5IC8gNSl9cHgpYFxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhvbG8tYnJhY2tldC10bFwiIC8+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhvbG8tYnJhY2tldC10clwiIC8+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhvbG8tYnJhY2tldC1ibFwiIC8+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhvbG8tYnJhY2tldC1iclwiIC8+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhvbG8tc2Nhbi1zd2VlcFwiIC8+XG5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHBiLTIgYm9yZGVyLWIgYm9yZGVyLWN5YW4tNTAwLzQwIHRleHQteHMgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdGV4dC1jeWFuLTMwMCBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8UmFkaW8gY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWN5YW4tNDAwIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlNFS1RPUiBQT1dJRVRSWk5ZIDUwUDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHB4LTEuNSBweS0wLjIgcm91bmRlZCBiZy1jeWFuLTk1MCB0ZXh0LWN5YW4tMzAwIGJvcmRlciBib3JkZXItY3lhbi04MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICBSQURBUiAzNjDCsFxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgey8qIEhvbG9ncmFwaGljIFJhZGFyIENpcmN1bGFyIFJldGljbGUgKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTMgcmVsYXRpdmUgdy1mdWxsIGFzcGVjdC1zcXVhcmUgbWF4LXctWzE0MHB4XSBteC1hdXRvIHJvdW5kZWQtZnVsbCBib3JkZXIgYm9yZGVyLWN5YW4tNDAwLzUwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLWN5YW4tOTUwLzIwIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgYm9yZGVyIGJvcmRlci1jeWFuLTUwMC8zMCByb3VuZGVkLWZ1bGwgc2NhbGUtNzVcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgYm9yZGVyIGJvcmRlci1jeWFuLTUwMC8yMCByb3VuZGVkLWZ1bGwgc2NhbGUtNTBcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHctZnVsbCBoLVsxcHhdIGJnLWN5YW4tNTAwLzMwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBoLWZ1bGwgdy1bMXB4XSBiZy1jeWFuLTUwMC8zMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB7LyogUm90YXRpbmcgcmFkYXIgc3dlZXAgKi99XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCByb3VuZGVkLWZ1bGwgYmctW2NvbmljLWdyYWRpZW50KGZyb21fMGRlZyx0cmFuc3BhcmVudF8wZGVnLHJnYmEoNiwxODIsMjEyLDAuMzUpXzkwZGVnLHRyYW5zcGFyZW50XzkxZGVnKV0gYW5pbWF0ZS1zcGluXCIgc3R5bGU9e3sgYW5pbWF0aW9uRHVyYXRpb246ICczLjVzJyB9fSAvPlxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgey8qIFBpbmcgZG90cyAqL31cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTIgaC0yIHJvdW5kZWQtZnVsbCBiZy1lbWVyYWxkLTQwMCBhbmltYXRlLXBpbmcgYWJzb2x1dGUgdG9wLTYgcmlnaHQtOFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xLjUgaC0xLjUgcm91bmRlZC1mdWxsIGJnLWN5YW4tMzAwIGFic29sdXRlIGJvdHRvbS04IGxlZnQtMTBcIiAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMyBzcGFjZS15LTEgdGV4dC1bMTBweF0gZm9udC1tb25vIHRleHQtc2xhdGUtMzAwIGJvcmRlci10IGJvcmRlci1jeWFuLTUwMC8zMCBwdC0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMFwiPktvcnl0YXJ6IERyb25vd3k6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC00MDAgZm9udC1ib2xkXCI+WkFCRVpQSUVDWk9OWTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMFwiPkF6eW11dCBPY2hyb255Ojwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWN5YW4tMzAwXCI+Mjc0wrAgWmFjaMOzZDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMFwiPlpha8WCw7NjZW5pYSBFTVA6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYW1iZXItMzAwXCI+MC4wMiUgKEN6eXN0ZSk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7LyogMi4gQ0VOVFJBTE5ZIFBST0pFS1RPUiAzRCAmIFBSWkVaUk9DWllTVEEgVEFGTEEgTkEgU1RPTEUgS09ORkVSRU5DWUpOWU0gKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBmbGV4LTEgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgbWF4LXctbGdcIj5cbiAgICAgICAgICAgICAgICAgIHsvKiBGbG9hdGluZyBIb2xvZ3JhcGhpYyBIZWFkZXIgQWJvdmUgVGFibGUgUHJvamVjdG9yICovfVxuICAgICAgICAgICAgICAgICAgPGRpdiBcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaG9sb2dyYW0tZ2xhc3Mtc2NyZWVuIG1iLTIgcHgtNCBweS0xLjUgcm91bmRlZC1mdWxsIGJvcmRlciBib3JkZXItY3lhbi00MDAgc2hhZG93LXhsIHRleHQteHMgZm9udC1tb25vIHRleHQtY3lhbi0zMDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcG9pbnRlci1ldmVudHMtYXV0b1wiXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBgcmdiYSg2LCAxODIsIDIxMiwgJHtnbGFzc09wYWNpdHkgLyAzNTB9KWAsXG4gICAgICAgICAgICAgICAgICAgICAgYmFja2Ryb3BGaWx0ZXI6IGBibHVyKCR7TWF0aC5tYXgoNiwgZ2xhc3NPcGFjaXR5IC8gNSl9cHgpYFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTIgaC0yIHJvdW5kZWQtZnVsbCBiZy1jeWFuLTQwMCBhbmltYXRlLXBpbmdcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvbGRcIj5QUk9KRUtUT1IgQ0VOVFJBTE5ZOiBNRVRST1BPTElBIEJVSk9LPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBweC0xLjUgcHktMC4yIHJvdW5kZWQgYmctY3lhbi05NTAgdGV4dC1jeWFuLTIwMCBib3JkZXIgYm9yZGVyLWN5YW4tNzAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgNDIgV0lFxbtPV0NFXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICB7LyogM0QgV2ViR0wgQ2FudmFzIG92ZXIgY29uZmVyZW5jZSB0YWJsZSAqL31cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgdy1mdWxsIGFzcGVjdC1bMTYvMTBdIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxjYW52YXMgXG4gICAgICAgICAgICAgICAgICAgICAgcmVmPXtjYW52YXNSZWZ9IFxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGwgZHJvcC1zaGFkb3ctWzBfMF8zNXB4X3JnYmEoNiwxODIsMjEyLDAuNjUpXSBjdXJzb3ItZ3JhYiBhY3RpdmU6Y3Vyc29yLWdyYWJiaW5nIHBvaW50ZXItZXZlbnRzLWF1dG9cIlxuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiS2xpa25paiBpIHByemVjacSFZ25paiwgYWJ5IG9icsOzY2nEhyBob2xvZ3JhbSBtZXRyb3BvbGlpXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIDMuIFBSQVdZIFBSWkVaUk9DWllTVFkgRUtSQU4gSE9MT0dSQU1PV1k6IEJpb21ldHJpYSAmIEl6b2xhY2phIEJ1am9rIE1lZGljYWwgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhvbG9ncmFtLWdsYXNzLXNjcmVlbiB3LWZ1bGwgbWQ6dy02NCBwLTMuNSByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXB1cnBsZS00MDAvNzAgc2hhZG93LTJ4bCByZWxhdGl2ZSB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgcG9pbnRlci1ldmVudHMtYXV0b1wiXG4gICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGByZ2JhKDE2OCwgODUsIDI0NywgJHtnbGFzc09wYWNpdHkgLyA0MDB9KWAsXG4gICAgICAgICAgICAgICAgICAgIGJhY2tkcm9wRmlsdGVyOiBgYmx1cigke01hdGgubWF4KDYsIGdsYXNzT3BhY2l0eSAvIDUpfXB4KWBcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJob2xvLWJyYWNrZXQtdGxcIiBzdHlsZT17eyBib3JkZXJDb2xvcjogJyNjMDg0ZmMnIH19IC8+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhvbG8tYnJhY2tldC10clwiIHN0eWxlPXt7IGJvcmRlckNvbG9yOiAnI2MwODRmYycgfX0gLz5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaG9sby1icmFja2V0LWJsXCIgc3R5bGU9e3sgYm9yZGVyQ29sb3I6ICcjYzA4NGZjJyB9fSAvPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJob2xvLWJyYWNrZXQtYnJcIiBzdHlsZT17eyBib3JkZXJDb2xvcjogJyNjMDg0ZmMnIH19IC8+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhvbG8tc2Nhbi1zd2VlcFwiIHN0eWxlPXt7IGJhY2tncm91bmQ6ICdsaW5lYXItZ3JhZGllbnQoOTBkZWcsIHRyYW5zcGFyZW50LCByZ2JhKDE5MiwgMTMyLCAyNTIsIDAuOSksIHRyYW5zcGFyZW50KScgfX0gLz5cblxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcGItMiBib3JkZXItYiBib3JkZXItcHVycGxlLTUwMC80MCB0ZXh0LXhzIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHRleHQtcHVycGxlLTMwMCBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8QWN0aXZpdHkgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXB1cnBsZS00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkJVSk9LIFNFUkZBTlRBS0VSPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzlweF0gcHgtMS41IHB5LTAuMiByb3VuZGVkIGJnLXB1cnBsZS05NTAgdGV4dC1wdXJwbGUtMzAwIGJvcmRlciBib3JkZXItcHVycGxlLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIEJJTy1TVEFTSVNcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIHsvKiBCaW9tZXRyaWMgUHVsc2UgV2F2ZSBTaW11bGF0b3IgKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTMgcC0yIHJvdW5kZWQteGwgYmctc2xhdGUtOTUwLzYwIGJvcmRlciBib3JkZXItcHVycGxlLTUwMC8zMCB0ZXh0LVsxMHB4XSBmb250LW1vbm8gc3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyIHRleHQtc2xhdGUtMzAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+UHVscyBCaW9tZXRyeWN6bnkgU2FsaTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1lbWVyYWxkLTQwMCBmb250LWJvbGRcIj43MiBCUE0gKE5vcm1hKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoLTYgZmxleCBpdGVtcy1lbmQgZ2FwLTEgcHgtMSBiZy1wdXJwbGUtOTUwLzMwIHJvdW5kZWQgYm9yZGVyIGJvcmRlci1wdXJwbGUtODAwLzQwIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICAgICAgICAgICAgICAgIHtbNDAsIDY1LCAzMCwgODUsIDk1LCA0NSwgNjAsIDgwLCA1MCwgNzAsIDkwLCA0MF0ubWFwKChoLCBpKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aX0gY2xhc3NOYW1lPVwiZmxleC0xIGJnLWdyYWRpZW50LXRvLXQgZnJvbS1wdXJwbGUtNjAwIHRvLWN5YW4tNDAwIHJvdW5kZWQtdFwiIHN0eWxlPXt7IGhlaWdodDogYCR7aH0lYCB9fSAvPlxuICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciB0ZXh0LXNsYXRlLTMwMCBwdC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+S29tb3JhIEtyaW9zdGF6eSBHbmlkOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWN5YW4tMzAwIGZvbnQtYm9sZFwiPi0xOTbCsEMgU3RhYmlsbmE8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciB0ZXh0LXNsYXRlLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkZpbHRyYWNqYSBXaXJ1c8Ozdzo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1lbWVyYWxkLTMwMCBmb250LWJvbGRcIj5JU08tMSBIRVBBICgxMDAlKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0zIHB0LTIgYm9yZGVyLXQgYm9yZGVyLXB1cnBsZS01MDAvMzAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5SG9sb1NvdW5kKCdsYXNlcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0TGFzdEFjdGlvbk1lc3NhZ2UoJ1d5c8WCYW5vIHN5Z25hxYIgTnRTdXNwZW5kUHJvY2VzcyBkbyBrcmlvLXN0YXp5IHcga29tb3J6ZS4nKTtcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0bi1nbGFzcy1wb2xpc2hlZCB3LWZ1bGwgcHktMSB0ZXh0LVsxMHB4XSBmb250LW1vbm8gZm9udC1ib2xkIHRleHQtcHVycGxlLTIwMFwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICBaYW1yb8W6IFdpcnVzeSB3IFJBTVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBCT1RUT00gQ09NTUFORCBET0NLOiBQUlpFxYHEhENaTklLSSBUWVRBTk9XTy1TVEFMT1dFICYgUFJaWUNJU0tJIFBPTEVST1dBTkUgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIHotMjAgcC00IHNtOnAtNSB0aXRhbml1bS1zdGVlbC1wYW5lbCBib3JkZXItdC0yIGJvcmRlci1jeWFuLTQwMC84MCBzaGFkb3ctMnhsXCI+XG4gICAgICAgICAgICAgIHsvKiBNaWxpdGFyeSBIYXphcmQgV2FybmluZyBTdHJpcCBhbG9uZyB0b3AgZWRnZSAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoLTIgdy1mdWxsIG1pbGl0YXJ5LWhhemFyZC1zdHJpcGVzIHJvdW5kZWQtZnVsbCBtYi0zXCIgLz5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgbGc6ZmxleC1yb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNFwiPlxuICAgICAgICAgICAgICAgIHsvKiBNZWNoYW5pY2FsIFRpdGFuaXVtIFN3aXRjaGVzICYgTGFzZXIgQ29udHJvbHMgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyBmbGV4LXdyYXBcIj5cbiAgICAgICAgICAgICAgICAgIHsvKiBUaXRhbml1bSBUb2dnbGU6IFBvbGUgU2nFgm93ZSA1MFAgKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGJnLXNsYXRlLTk1MC84MCBweC0zIHB5LTEuNSByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHNoYWRvdy1pbm5lclwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSBmb250LW1vbm8gZm9udC1ib2xkIHRleHQtc2xhdGUtMzAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPFNoaWVsZCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWN5YW4tNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5QT0xFIFNJxYFPV0U6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5SG9sb1NvdW5kKCdzd2l0Y2gnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFBlbnRob3VzZVNoaWVsZEFjdGl2ZSghcGVudGhvdXNlU2hpZWxkQWN0aXZlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldExhc3RBY3Rpb25NZXNzYWdlKHBlbnRob3VzZVNoaWVsZEFjdGl2ZSA/ICdQb2xlIHNpxYJvd2UgNTBQIHd5xYLEhWN6b25lLicgOiAnUG9sZSBzacWCb3dlIDUwUCBha3R5d293YW5lIG5hIDEwMCUhJyk7XG4gICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Bzd2l0Y2gtdGl0YW5pdW0gdy0xMiBoLTYgJHtwZW50aG91c2VTaGllbGRBY3RpdmUgPyAnYm9yZGVyLWN5YW4tNDAwIGJnLWN5YW4tOTUwLzgwJyA6ICdib3JkZXItc2xhdGUtNzAwJ31gfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Bzd2l0Y2gtdGl0YW5pdW0tdGh1bWIgdHJhbnNmb3JtICR7cGVudGhvdXNlU2hpZWxkQWN0aXZlID8gJ3RyYW5zbGF0ZS14LTYgYmctY3lhbi00MDAnIDogJ3RyYW5zbGF0ZS14LTAnfWB9IC8+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2B0ZXh0LVsxMHB4XSBmb250LW1vbm8gZm9udC1ib2xkICR7cGVudGhvdXNlU2hpZWxkQWN0aXZlID8gJ3RleHQtZW1lcmFsZC00MDAnIDogJ3RleHQtc2xhdGUtNTAwJ31gfT5cbiAgICAgICAgICAgICAgICAgICAgICB7cGVudGhvdXNlU2hpZWxkQWN0aXZlID8gJzEwMCUnIDogJ09GRid9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICB7LyogVGl0YW5pdW0gVG9nZ2xlOiBaYWfFgnVzemFjeiBEcm9uw7N3IEVNUCAqL31cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgYmctc2xhdGUtOTUwLzgwIHB4LTMgcHktMS41IHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgc2hhZG93LWlubmVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtbW9ubyBmb250LWJvbGQgdGV4dC1zbGF0ZS0zMDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8WmFwIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtYW1iZXItMzAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5BTlRZLURST04gRU1QOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheUhvbG9Tb3VuZCgnc3dpdGNoJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXREcm9uZURlZmVuc2VBY3RpdmUoIWRyb25lRGVmZW5zZUFjdGl2ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRMYXN0QWN0aW9uTWVzc2FnZShkcm9uZURlZmVuc2VBY3RpdmUgPyAnWmFnxYJ1c3phY3ogRU1QIHd5xYLEhWN6b255LicgOiAnWmFnxYJ1c3phY3ogRU1QIGFrdHl3bnkgdyBwcm9taWVuaXUgNTAwbSB3b2vDs8WCIHdpZcW8b3djYSEnKTtcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHN3aXRjaC10aXRhbml1bSB3LTEyIGgtNiAke2Ryb25lRGVmZW5zZUFjdGl2ZSA/ICdib3JkZXItYW1iZXItNDAwIGJnLWFtYmVyLTk1MC84MCcgOiAnYm9yZGVyLXNsYXRlLTcwMCd9YH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgc3dpdGNoLXRpdGFuaXVtLXRodW1iIHRyYW5zZm9ybSAke2Ryb25lRGVmZW5zZUFjdGl2ZSA/ICd0cmFuc2xhdGUteC02IGJnLWFtYmVyLTQwMCcgOiAndHJhbnNsYXRlLXgtMCd9YH0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHRleHQtWzEwcHhdIGZvbnQtbW9ubyBmb250LWJvbGQgJHtkcm9uZURlZmVuc2VBY3RpdmUgPyAndGV4dC1hbWJlci0zMDAnIDogJ3RleHQtc2xhdGUtNTAwJ31gfT5cbiAgICAgICAgICAgICAgICAgICAgICB7ZHJvbmVEZWZlbnNlQWN0aXZlID8gJ0VNUCA1MDBNJyA6ICdPRkYnfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgey8qIFBvbGlzaGVkIEdsYXNzIEJ1dHRvbnMgZm9yIEhvbG9ncmFtIENvbnRyb2xzICovfVxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgcGxheUhvbG9Tb3VuZCgnc3dpdGNoJyk7XG4gICAgICAgICAgICAgICAgICAgICAgc2V0SXNSb3RhdGluZyghaXNSb3RhdGluZyk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGJ0bi1nbGFzcy1wb2xpc2hlZCBweC0zIHB5LTEuNSB0ZXh0LXhzIGZvbnQtbW9ubyBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSAke1xuICAgICAgICAgICAgICAgICAgICAgIGlzUm90YXRpbmcgPyAnYm9yZGVyLWN5YW4tMzAwJyA6ICd0ZXh0LXNsYXRlLTQwMCdcbiAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtpc1JvdGF0aW5nID8gPFNxdWFyZSBjbGFzc05hbWU9XCJ3LTMgaC0zIHRleHQtY3lhbi0yMDBcIiAvPiA6IDxQbGF5IGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1jeWFuLTIwMFwiIC8+fVxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj57aXNSb3RhdGluZyA/ICdaYXRyenltYWogT2Jyw7N0JyA6ICdPYnJhY2FqJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgcGxheUhvbG9Tb3VuZCgnc3dpdGNoJyk7XG4gICAgICAgICAgICAgICAgICAgICAgc2V0V2lyZWZyYW1lTW9kZSghd2lyZWZyYW1lTW9kZSk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0bi10aXRhbml1bS1zdGVlbCBweC0zIHB5LTEuNSB0ZXh0LXhzIHJvdW5kZWQteGwgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxMYXllcnMgY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LXB1cnBsZS0yMDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj57d2lyZWZyYW1lTW9kZSA/ICdCcnnFgnknIDogJ1dpcmVmcmFtZSd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dHJpZ2dlckNpdHlUaHJlYXRTY2FufVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4tZ2xvc3N5IGJ0bi1nbG9zc3ktcmVkIHB4LTMuNSBweS0xLjUgdGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgYW5pbWF0ZS1wdWxzZVwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxDcm9zc2hhaXIgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC15ZWxsb3ctMjAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+U2thbiBCb2pvd3kgTWV0cm9wb2xpaTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIFJpZ2h0OiBNaWxpdGFyeSBMYXNlciBCYXR0ZXJ5IHdpdGggU2FmZXR5IENvdmVyICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgZmxleC13cmFwXCI+XG4gICAgICAgICAgICAgICAgICB7LyogTGFzZXIgU2FmZXR5IEZsaXAtQ292ZXIgU3dpdGNoICovfVxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBiZy1zbGF0ZS05NTAvOTAgcC0yIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1yZWQtOTAwLzgwIHNoYWRvdy1tZFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtcmlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gZm9udC1ib2xkIGJsb2NrIHRleHQtcmVkLTQwMFwiPkJFWlBJRUNaTklLIExBU0VSQTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bOXB4XSBmb250LW1vbm8gdGV4dC1zbGF0ZS00MDBcIj57bGFzZXJTYWZldHlDb3Zlck9wZW4gPyAnT0RCRVpQSUVDWk9OWScgOiAnWkFCRVpQSUVDWk9OWSd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheUhvbG9Tb3VuZCgnc3dpdGNoJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRMYXNlclNhZmV0eUNvdmVyT3BlbighbGFzZXJTYWZldHlDb3Zlck9wZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0TGFzdEFjdGlvbk1lc3NhZ2UobGFzZXJTYWZldHlDb3Zlck9wZW4gPyAnWmFiZXpwaWVjem9ubyBkemlhxYJvIGxhc2Vyb3dlIG9zxYJvbsSFLicgOiAnT0RCRVpQSUVDWk9OTyBkemlhxYJvIGxhc2Vyb3dlIG5hIGRhY2h1IDUwUCEnKTtcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTIuNSBweS0xIHJvdW5kZWQgdGV4dC14cyBmb250LW1vbm8gZm9udC1ibGFjayBib3JkZXIgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc2VyU2FmZXR5Q292ZXJPcGVuXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXJlZC02MDAgdGV4dC13aGl0ZSBib3JkZXItcmVkLTMwMCBzaGFkb3ctbGcgc2hhZG93LXJlZC05NTAgYW5pbWF0ZS1wdWxzZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtODAwIHRleHQtc2xhdGUtMzAwIGJvcmRlci1zbGF0ZS02MDAnXG4gICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICB7bGFzZXJTYWZldHlDb3Zlck9wZW4gPyAnRklSRSBSRUFEWScgOiAnU0FGRSd9XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHBsYXlIb2xvU291bmQoJ2FjdGl2YXRlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29sb3JzOiBBcnJheTwnY3lhbicgfCAndmlvbGV0JyB8ICdhbWJlcicgfCAnZW1lcmFsZCc+ID0gWydjeWFuJywgJ3Zpb2xldCcsICdhbWJlcicsICdlbWVyYWxkJ107XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dElkeCA9IChjb2xvcnMuaW5kZXhPZihob2xvZ3JhbUNvbG9yKSArIDEpICUgY29sb3JzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICBzZXRIb2xvZ3JhbUNvbG9yKGNvbG9yc1tuZXh0SWR4XSk7XG4gICAgICAgICAgICAgICAgICAgICAgc2V0TGFzdEFjdGlvbk1lc3NhZ2UoYFptaWVuaW9ubyBzcGVrdHJ1bSBsdW1pbmVzY2VuY2ppIGhvbG9ncmFtdSBuYTogJHtjb2xvcnNbbmV4dElkeF0udG9VcHBlckNhc2UoKX1gKTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuLWdsYXNzLXBvbGlzaGVkIHB4LTMgcHktMS41IHRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPFNwYXJrbGVzIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtY3lhbi0yMDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5Lb2xvcjoge2hvbG9ncmFtQ29sb3IudG9VcHBlckNhc2UoKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgcGxheUhvbG9Tb3VuZCgnY2N0dicpO1xuICAgICAgICAgICAgICAgICAgICAgIHNldEFjdGl2ZUhvbG9UYWIoJ2NjdHYnKTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuLXRpdGFuaXVtLXN0ZWVsIHB4LTMuNSBweS0xLjUgdGV4dC14cyByb3VuZGVkLXhsIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8Q2FtZXJhIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtY3lhbi0zMDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5LYW1lcnkgQ0NUVjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIExPV0VSIElOVEVSQUNUSVZFIE1PRFVMRVMgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIGxnOmdyaWQtY29scy0zIGdhcC02XCI+XG4gICAgICAgICAgICB7LyogU2NyZWVuIDE6IEdsb2JhbCBOZXR3b3JrICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTUgcm91bmRlZC0zeGwgYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItY3lhbi01MDAvMzAgc2hhZG93LXhsIGJhY2tkcm9wLWJsdXItbWQgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBwYi0zIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicC0yIHJvdW5kZWQteGwgYmctY3lhbi01MDAvMjAgdGV4dC1jeWFuLTQwMCBib3JkZXIgYm9yZGVyLWN5YW4tNTAwLzQwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPEdsb2JlIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ibGFjayB0ZXh0LXdoaXRlXCI+R2xvYmFsbmEgU2llxIcgVGVsZW1ldHJpaTwvaDM+XG4gICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDAgZm9udC1tb25vXCI+xZp3aWF0xYJvd8OzZCBCdWpvayBNZWRpY2FsIDUwUDwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IHJvdW5kZWQgdGV4dC1bMTBweF0gZm9udC1tb25vIGJnLWN5YW4tOTUwIHRleHQtY3lhbi0zMDAgYm9yZGVyIGJvcmRlci1jeWFuLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgICA2IFfEmXrFgsOzd1xuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC00IHNwYWNlLXktMi41XCI+XG4gICAgICAgICAgICAgICAgICB7bmV0d29ya05vZGVzLm1hcCgobm9kZSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IFxuICAgICAgICAgICAgICAgICAgICAgIGtleT17bm9kZS5pZH0gXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0yLjUgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAvODAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgaG92ZXI6Ym9yZGVyLWN5YW4tNTAwLzUwIHRyYW5zaXRpb24tY29sb3JzIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LXhzIGZvbnQtbW9ub1wiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHctMiBoLTIgcm91bmRlZC1mdWxsICR7bm9kZS50aHJlYXRMZXZlbCA9PT0gJ2xvdycgPyAnYmctZW1lcmFsZC00MDAnIDogbm9kZS50aHJlYXRMZXZlbCA9PT0gJ2VsZXZhdGVkJyA/ICdiZy1hbWJlci00MDAgYW5pbWF0ZS1waW5nJyA6ICdiZy1yZWQtNTAwIGFuaW1hdGUtcGluZyd9YH0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC13aGl0ZSBmb250LWJvbGRcIj57bm9kZS5uYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDBcIj5QaW5nOiB7bm9kZS5sYXRlbmN5fSBtcyDigKIgVGFyY3phOiB7bm9kZS5zaGllbGRTdHJlbmd0aH0lPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHB4LTIgcHktMC41IHJvdW5kZWQgdGV4dC1bMTBweF0gZm9udC1ib2xkICR7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnRocmVhdExldmVsID09PSAnbG93JyA/ICdiZy1lbWVyYWxkLTk1MCB0ZXh0LWVtZXJhbGQtMzAwIGJvcmRlciBib3JkZXItZW1lcmFsZC04MDAnIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUudGhyZWF0TGV2ZWwgPT09ICdlbGV2YXRlZCcgPyAnYmctYW1iZXItOTUwIHRleHQtYW1iZXItMzAwIGJvcmRlciBib3JkZXItYW1iZXItODAwJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAnYmctcmVkLTk1MCB0ZXh0LXJlZC0zMDAgYm9yZGVyIGJvcmRlci1yZWQtODAwJ1xuICAgICAgICAgICAgICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtub2RlLmFjdGl2ZUF0dGFja3MgPT09IDAgPyAnQ1pZU1RZJyA6IGAke25vZGUuYWN0aXZlQXR0YWNrc30gQVRBS8OTV2B9XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTQgcHQtMyBib3JkZXItdCBib3JkZXItc2xhdGUtODAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTQwMFwiPlByemVwdXN0b3dvxZvEhzogMTIwIFRicHM8L3NwYW4+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBwbGF5SG9sb1NvdW5kKCdiZWVwJyk7XG4gICAgICAgICAgICAgICAgICAgIHNldExhc3RBY3Rpb25NZXNzYWdlKCdQcnpldGVzdG93YW5vIHBpbmcgNiBnbG9iYWxueWNoIHfEmXrFgsOzdzogc3RhdHVzIHN0YWJpbG55LicpO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0bi10aXRhbml1bS1zdGVlbCBweC0zIHB5LTEgdGV4dC14cyByb3VuZGVkLWxnIGZvbnQtYm9sZFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgVGVzdHVqIFfEmXrFgnlcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIFNjcmVlbiAyOiBCdWpvayBNZWRpY2FsIFNlcmZhbnRha2VyICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTUgcm91bmRlZC0zeGwgYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItcHVycGxlLTUwMC8zMCBzaGFkb3cteGwgYmFja2Ryb3AtYmx1ci1tZCBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHBiLTMgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC14bCBiZy1wdXJwbGUtNTAwLzIwIHRleHQtcHVycGxlLTQwMCBib3JkZXIgYm9yZGVyLXB1cnBsZS01MDAvNDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8QWN0aXZpdHkgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJsYWNrIHRleHQtd2hpdGVcIj5CdWpvayBNZWRpY2FsOiBTZXJmYW50YWtlcjwvaDM+XG4gICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1wdXJwbGUtMzAwIGZvbnQtbW9ub1wiPkJpb21ldHJ5Y3pueSBQYW5jZXJ6ICYgS3Jpb3N0YXphPC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMiBweS0wLjUgcm91bmRlZCB0ZXh0LVsxMHB4XSBmb250LW1vbm8gYmctcHVycGxlLTk1MCB0ZXh0LXB1cnBsZS0zMDAgYm9yZGVyIGJvcmRlci1wdXJwbGUtODAwXCI+XG4gICAgICAgICAgICAgICAgICAgIEJJTy1TSElFTERcbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtNCBzcGFjZS15LTMgdGV4dC14cyBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQteGwgYmctc2xhdGUtOTUwLzgwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHNwYWNlLXktMlwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciB0ZXh0LXNsYXRlLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlphd2FydG/Fm8SHIE/igoIgdyBQZW50aG91c2U6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC00MDAgZm9udC1ib2xkXCI+MjEuNCUgKE9wdHltYWxuYSk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS04MDAgaC0xLjUgcm91bmRlZC1mdWxsIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZW1lcmFsZC01MDAgaC1mdWxsIHctWzk0JV1cIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciB0ZXh0LXNsYXRlLTMwMCBwdC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+RmlsdHJhY2phIFdpcnVzw7N3ICYgVG9rc3luOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWN5YW4tNDAwIGZvbnQtYm9sZFwiPktsYXNhIElTTy0xIEhFUEE8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS04MDAgaC0xLjUgcm91bmRlZC1mdWxsIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctY3lhbi01MDAgaC1mdWxsIHctWzk5JV1cIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTQgcHQtMyBib3JkZXItdCBib3JkZXItc2xhdGUtODAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LXhzIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwXCI+QnVqb2sgTWVkaWNhbCBHdWFyZDogPGIgY2xhc3NOYW1lPVwidGV4dC1lbWVyYWxkLTQwMFwiPk9OPC9iPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXB1cnBsZS0zMDAgZm9udC1ib2xkXCI+RE5BIEVuZm9yY2VkPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogU2NyZWVuIDM6IENDVFYgTWF0cml4ICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTUgcm91bmRlZC0zeGwgYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItY3lhbi01MDAvMzAgc2hhZG93LXhsIGJhY2tkcm9wLWJsdXItbWQgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBwYi0zIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicC0yIHJvdW5kZWQteGwgYmctY3lhbi01MDAvMjAgdGV4dC1jeWFuLTQwMCBib3JkZXIgYm9yZGVyLWN5YW4tNTAwLzQwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPENhbWVyYSBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtYmxhY2sgdGV4dC13aGl0ZVwiPk1hdHJ5Y2EgS2FtZXIgQ0NUViA1MFA8L2gzPlxuICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtY3lhbi0zMDAgZm9udC1tb25vXCI+VGVybWluYWwgZG90eWtvd3kgbmEgc3RvbGU8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBwbGF5SG9sb1NvdW5kKCdjY3R2Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgc2V0Q2N0dk5pZ2h0VmlzaW9uKCFjY3R2TmlnaHRWaXNpb24pO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0yIHB5LTAuNSByb3VuZGVkIHRleHQtWzEwcHhdIGZvbnQtbW9ubyBmb250LWJvbGQgdHJhbnNpdGlvbi1jb2xvcnMgJHtcbiAgICAgICAgICAgICAgICAgICAgICBjY3R2TmlnaHRWaXNpb24gPyAnYmctZW1lcmFsZC01MDAgdGV4dC1zbGF0ZS05NTAnIDogJ2JnLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTMwMCdcbiAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtjY3R2TmlnaHRWaXNpb24gPyAnTklHSFQgVklTSU9OJyA6ICdJUiBPRkYnfVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTQgZ3JpZCBncmlkLWNvbHMtMyBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICB7Y2N0dkZlZWRzLm1hcCgoY2FtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSBzZWxlY3RlZENDVFYgPT09IGNhbS5pZDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2NhbS5pZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheUhvbG9Tb3VuZCgnY2N0dicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZENDVFYoY2FtLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BwLTEuNSByb3VuZGVkLWxnIGJvcmRlciB0ZXh0LWxlZnQgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWN5YW4tOTUwLzkwIGJvcmRlci1jeWFuLTQwMCBzaGFkb3ctbWQgc2hhZG93LWN5YW4tOTUwLzYwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTk1MC84MCBib3JkZXItc2xhdGUtODAwIGhvdmVyOmJvcmRlci1zbGF0ZS03MDAnXG4gICAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gZm9udC1ib2xkIHRleHQtd2hpdGVcIj57Y2FtLmlkLnRvVXBwZXJDYXNlKCl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2B3LTEuNSBoLTEuNSByb3VuZGVkLWZ1bGwgJHtjYW0uc3RhdHVzID09PSAnQUxFUlQnID8gJ2JnLXJlZC01MDAgYW5pbWF0ZS1waW5nJyA6ICdiZy1lbWVyYWxkLTQwMCd9YH0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB0ZXh0LXNsYXRlLTQwMCBibG9jayB0cnVuY2F0ZSBtdC0wLjVcIj57Y2FtLmxvY2F0aW9ufTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgeygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50Q2FtID0gY2N0dkZlZWRzLmZpbmQoYyA9PiBjLmlkID09PSBzZWxlY3RlZENDVFYpIHx8IGNjdHZGZWVkc1swXTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgbXQtMyBwLTMgcm91bmRlZC0yeGwgYm9yZGVyICR7XG4gICAgICAgICAgICAgICAgICAgICAgY2N0dk5pZ2h0VmlzaW9uID8gJ2JnLWVtZXJhbGQtOTUwLzgwIGJvcmRlci1lbWVyYWxkLTUwMC82MCB0ZXh0LWVtZXJhbGQtMjAwJyA6ICdiZy1zbGF0ZS05NTAgYm9yZGVyLWN5YW4tOTAwLzYwIHRleHQtY3lhbi0yMDAnXG4gICAgICAgICAgICAgICAgICAgIH0gcmVsYXRpdmUgb3ZlcmZsb3ctaGlkZGVuIGZvbnQtbW9ubyB0ZXh0LXhzIHNoYWRvdy1pbm5lcmB9PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1bbGluZWFyLWdyYWRpZW50KHJnYmEoMjU1LDI1NSwyNTUsMC4wNClfMXB4LHRyYW5zcGFyZW50XzFweCldIGJnLVtzaXplOjEwMCVfM3B4XSBwb2ludGVyLWV2ZW50cy1ub25lXCIgLz5cblxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyIHRleHQtWzEwcHhdIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTIgaC0yIHJvdW5kZWQtZnVsbCBiZy1yZWQtNTAwIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5MSVZFOiB7Y3VycmVudENhbS5uYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntjdXJyZW50Q2FtLmZwc30gRlBTPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtMzAwIG10LTFcIj57Y3VycmVudENhbS5kZXNjcmlwdGlvbn08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KSgpfVxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTQgcHQtMyBib3JkZXItdCBib3JkZXItc2xhdGUtODAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTQwMFwiPlJlamVzdHJhdG9yOiAzMCBEbmk8L3NwYW4+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBwbGF5SG9sb1NvdW5kKCdiZWVwJyk7XG4gICAgICAgICAgICAgICAgICAgIHNldExhc3RBY3Rpb25NZXNzYWdlKCdXeWdlbmVyb3dhbm8genJ6dXQga2xhdGtpIENDVFYgZG8gcGFtacSZY2kuJyk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuLXRpdGFuaXVtLXN0ZWVsIHB4LTMgcHktMSB0ZXh0LXhzIHJvdW5kZWQtbGcgZm9udC1ib2xkXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICBaYXBpc3ogS2xhdGvEmVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBWSUVXIDI6IEVYUEFOREVEIFRBQ1RJQ0FMIENPTlNPTEUgKi99XG4gICAgICB7dmlld01vZGUgPT09ICd0YWN0aWNhbF9jb25zb2xlJyAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS02XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTYgcm91bmRlZC0zeGwgdGl0YW5pdW0tc3RlZWwtcGFuZWwgc2hhZG93LTJ4bCBiYWNrZHJvcC1ibHVyLXhsXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgbWQ6ZmxleC1yb3cgaXRlbXMtc3RhcnQgbWQ6aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNCBwYi00IGJvcmRlci1iIGJvcmRlci1zbGF0ZS03MDBcIj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LWJsYWNrIHRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxUZXJtaW5hbCBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtY3lhbi00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+S09OU09MQSBET1dPRFpFTklBIFBFTlRIT1VTRSDigKIgVFJZQiBPUEVSQUNZSk5ZPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTMwMCBtdC0xXCI+XG4gICAgICAgICAgICAgICAgICBNaWxpdGFybnkgc3lzdGVtIG9icm9ubnkgNTAuIHBpxJl0cmE6IENld2thIFRlc2xpLCB0YXJjemEgRU1QLCByeWdsb3dhbmllIHdpbmQgbWFnbmV0eWN6bnljaCBvcmF6IGtyeXB0b2dyYWZpYSBrd2FudG93YS5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRWaWV3TW9kZSgnaG9sb2dyYW1fcm9vbScpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0bi1nbGFzcy1wb2xpc2hlZCBweC00IHB5LTIgdGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPEV5ZSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+UG93csOzdCBkbyBXaWRva3UgU2FsaTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy00IGdhcC00IG10LTZcIj5cbiAgICAgICAgICAgICAgey8qIENhcmQgMTogQW50aS1Ecm9uZSBFTVAgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQtMnhsIGJnLXNsYXRlLTk1MC85MCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyIG1iLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIGZvbnQtbW9ubyB0ZXh0LWN5YW4tMzAwXCI+WkFHxYFVU1pBQ1ogRU1QIERST07Dk1c8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8WmFwIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1jeWFuLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDAgbWItM1wiPlphYmV6cGllY3phIHN6a2xhbsSFIGtvcHXFgsSZIDUwUCBwcnplZCB3cm9naW1pIGRyb25hbWkgc3pwaWVnb3dza2ltaS48L3A+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBwbGF5SG9sb1NvdW5kKCdzd2l0Y2gnKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0RHJvbmVEZWZlbnNlQWN0aXZlKCFkcm9uZURlZmVuc2VBY3RpdmUpO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGJ0bi10aXRhbml1bS1zdGVlbCB3LWZ1bGwgcHktMS41IHRleHQteHMgcm91bmRlZC14bCAke1xuICAgICAgICAgICAgICAgICAgICBkcm9uZURlZmVuc2VBY3RpdmUgPyAnYm9yZGVyLWN5YW4tNDAwIHRleHQtY3lhbi0yMDAnIDogJ3RleHQtc2xhdGUtNDAwJ1xuICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge2Ryb25lRGVmZW5zZUFjdGl2ZSA/ICdFTVAgQWt0eXdueSAoNTAwbSknIDogJ1fFgsSFY3ogWmFnxYJ1c3phY3onfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogQ2FyZCAyOiBHbGFzcyBQb2xhcml6YXRpb24gKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQtMnhsIGJnLXNsYXRlLTk1MC85MCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyIG1iLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIGZvbnQtbW9ubyB0ZXh0LWFtYmVyLTMwMFwiPlBPTEFSWVpBQ0pBIFNaWUI8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8U3VuIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1hbWJlci00MDBcIiAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwIG1iLTNcIj5DaHJvbmkgc2FsxJkgcHJ6ZWQgb8WbbGVwaWVuaWVtIHphY2hvZGVtIHPFgm/FhGNhIGkgbGFzZXJhbWkgc3pwaWVnb3dza2ltaS48L3A+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBwbGF5SG9sb1NvdW5kKCdiZWVwJyk7XG4gICAgICAgICAgICAgICAgICAgIHNldExhc3RBY3Rpb25NZXNzYWdlKCdad2nEmWtzem9ubyBwb2xhcnl6YWNqxJkgc3p5YiBkbyA5NSUuJyk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuLXRpdGFuaXVtLXN0ZWVsIHctZnVsbCBweS0xLjUgdGV4dC14cyByb3VuZGVkLXhsIHRleHQtYW1iZXItMjAwXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICBQb2xhcnl6dWogU3p5YnkgKDk1JSlcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIENhcmQgMzogTWFnbmV0aWMgRWxldmF0b3IgTG9jayAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC0yeGwgYmctc2xhdGUtOTUwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXIgbWItMlwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgZm9udC1tb25vIHRleHQtcHVycGxlLTMwMFwiPldJTkRBIE1BR05FVFlDWk5BIDUwUDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxMb2NrIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1wdXJwbGUtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMCBtYi0zXCI+RG9zdMSZcCBkbyBwZW50aGF1c3Ugd3nFgsSFY3puaWUgeiBiaW9tZXRyeWN6bnltIGtsdWN6ZW0gRE5BIEJ1am9rLjwvcD5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXlIb2xvU291bmQoJ3N3aXRjaCcpO1xuICAgICAgICAgICAgICAgICAgICBzZXRMYXN0QWN0aW9uTWVzc2FnZSgnWmFibG9rb3dhbm8gc3p5YiB3aW5keSBtYWduZXR5Y3puZWogbmEgcGnEmXRyemUgNDkuJyk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuLXRpdGFuaXVtLXN0ZWVsIHctZnVsbCBweS0xLjUgdGV4dC14cyByb3VuZGVkLXhsIHRleHQtcHVycGxlLTIwMFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgWmFibG9rdWogU3p5YiBXaW5keVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogQ2FyZCA0OiBTYXRlbGxpdGUgVXBsaW5rICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLTJ4bCBiZy1zbGF0ZS05NTAvOTAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDBcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciBtYi0yXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCBmb250LW1vbm8gdGV4dC1lbWVyYWxkLTMwMFwiPsWBxIRDWkUgU0FURUxJVEFSTkUgUVVBTlRVTTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxTYXRlbGxpdGUgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWVtZXJhbGQtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMCBtYi0zXCI+QmV6cG/Fm3JlZG5pIHN6eWZyb3dhbnkgbGluayB6IGZsb3TEhSBzYXRlbGl0w7N3IEJ1am9rIE1lZGljYWwgT3JiaXQtMS48L3A+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBwbGF5SG9sb1NvdW5kKCdiZWVwJyk7XG4gICAgICAgICAgICAgICAgICAgIHNldExhc3RBY3Rpb25NZXNzYWdlKCdSZS1zeW5jaHJvbml6YWNqYSBrbHVjenkga3dhbnRvd3ljaCB6IHNhdGVsaXTEhSB6YWtvxYRjem9uYSBzdWtjZXNlbS4nKTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4tdGl0YW5pdW0tc3RlZWwgdy1mdWxsIHB5LTEuNSB0ZXh0LXhzIHJvdW5kZWQteGwgdGV4dC1lbWVyYWxkLTIwMFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgUmUtc3luY2hyb25penVqIExpbmtcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdLCJtYXBwaW5ncyI6IkFBZ2FRO0FBaGFSLFNBQWdCLFVBQVUsV0FBVyxjQUFjO0FBQ25ELFlBQVksV0FBVztBQUN2QjtBQUFBLEVBQ0U7QUFBQSxFQUFXO0FBQUEsRUFBTztBQUFBLEVBQVE7QUFBQSxFQUFVO0FBQUEsRUFBWTtBQUFBLEVBQVE7QUFBQSxFQUFLO0FBQUEsRUFDbkM7QUFBQSxFQUFVO0FBQUEsRUFBTTtB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