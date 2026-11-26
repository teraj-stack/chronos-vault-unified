import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-toolkit/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=019a4779"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-toolkit/node_modules/.vite/deps/react.js?v=019a4779"; const useEffect = __vite__cjsImport1_react["useEffect"]; const useRef = __vite__cjsImport1_react["useRef"]; const useState = __vite__cjsImport1_react["useState"];
import * as THREE from "/sentinel-toolkit/node_modules/.vite/deps/three.js?v=5dbce604";
import {
  RotateCw,
  Zap,
  Layers,
  ShieldCheck,
  Volume2,
  VolumeX
} from "/sentinel-toolkit/node_modules/.vite/deps/lucide-react.js?v=6cbc5a0a";
export const ThreeDDefenseCore = ({ className = "" }) => {
  const mountRef = useRef(null);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState("normal");
  const [coreStatus, setCoreStatus] = useState("OPTIMAL");
  const [activeIlluminatedRing, setActiveIlluminatedRing] = useState(null);
  const [fps, setFps] = useState(60);
  const [teslaCoilActive, setTeslaCoilActive] = useState(true);
  const [teslaVoltageKV, setTeslaVoltageKV] = useState(750);
  const [teslaDischargeMode, setTeslaDischargeMode] = useState("continuous");
  const [plasmaMode, setPlasmaMode] = useState("vortex");
  const [particleCount, setParticleCount] = useState(280);
  const [totalCollisions, setTotalCollisions] = useState(0);
  const [collisionsPerSec, setCollisionsPerSec] = useState(0);
  const [audioFeedback, setAudioFeedback] = useState(true);
  const [selectedProcessId, setSelectedProcessId] = useState("proc-gnida");
  const [elasticity, setElasticity] = useState(0.85);
  const playSoundRef = useRef({
    collision: () => {
    },
    teslaArc: () => {
    }
  });
  useEffect(() => {
    let audioCtx = null;
    let lastSoundTime = 0;
    let lastTeslaSoundTime = 0;
    const getAudioCtx = () => {
      if (!audioCtx || audioCtx.state === "suspended") {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          audioCtx = new AudioCtx();
        }
      }
      return audioCtx;
    };
    playSoundRef.current.collision = (pitchMultiplier = 1) => {
      if (!audioFeedback || typeof window === "undefined") return;
      const now = performance.now();
      if (now - lastSoundTime < 40) return;
      lastSoundTime = now;
      try {
        const ctx = getAudioCtx();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        const baseFreq = 950 * pitchMultiplier + Math.random() * 200;
        osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.35, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(1e-3, ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } catch {
      }
    };
    playSoundRef.current.teslaArc = () => {
      if (!audioFeedback || typeof window === "undefined") return;
      const now = performance.now();
      if (now - lastTeslaSoundTime < 180) return;
      lastTeslaSoundTime = now;
      try {
        const ctx = getAudioCtx();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(140, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(80, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(1e-3, ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      } catch {
      }
    };
    return () => {
      if (audioCtx) {
        audioCtx.close();
      }
    };
  }, [audioFeedback]);
  const processesRef = useRef([
    {
      id: "proc-gnida",
      name: "gnida_overlay.exe",
      type: "hostile",
      pid: 6612,
      radius: 0.9,
      color: 15680580,
      emissive: 10033947,
      position: new THREE.Vector3(4.2, 0.5, 0),
      baseOrbitRadius: 4.2,
      orbitSpeed: 0.012,
      orbitAngle: 0,
      integrity: 42,
      collisionsCount: 0,
      lastHitTime: 0
    },
    {
      id: "proc-winlogon",
      name: "winlogon.exe",
      type: "system",
      pid: 492,
      radius: 0.75,
      color: 1096065,
      emissive: 417606,
      position: new THREE.Vector3(-4.5, 1.2, 0),
      baseOrbitRadius: 4.5,
      orbitSpeed: -8e-3,
      orbitAngle: Math.PI * 0.8,
      integrity: 99.8,
      collisionsCount: 0,
      lastHitTime: 0
    },
    {
      id: "proc-svchost",
      name: "svchost.exe [DcomLaunch]",
      type: "system",
      pid: 884,
      radius: 0.65,
      color: 440020,
      emissive: 1400437,
      position: new THREE.Vector3(0, -3.8, 2.5),
      baseOrbitRadius: 4,
      orbitSpeed: 0.015,
      orbitAngle: Math.PI * 1.5,
      integrity: 98.4,
      collisionsCount: 0,
      lastHitTime: 0
    },
    {
      id: "proc-csrss",
      name: "csrss.exe [Win32 Subsystem]",
      type: "system",
      pid: 540,
      radius: 0.7,
      color: 9133302,
      emissive: 5972406,
      position: new THREE.Vector3(-2.8, -1.8, -3.2),
      baseOrbitRadius: 4.6,
      orbitSpeed: -0.011,
      orbitAngle: Math.PI * 0.3,
      integrity: 100,
      collisionsCount: 0,
      lastHitTime: 0
    },
    {
      id: "proc-driver",
      name: "dxgkrnl.sys [WDDM 3D Driver]",
      type: "driver",
      pid: 4,
      radius: 0.8,
      color: 16096779,
      emissive: 9584654,
      position: new THREE.Vector3(3.5, -2.2, -2.5),
      baseOrbitRadius: 4.8,
      orbitSpeed: 9e-3,
      orbitAngle: Math.PI * 1.1,
      integrity: 96.5,
      collisionsCount: 0,
      lastHitTime: 0
    }
  ]);
  const [processesState, setProcessesState] = useState(processesRef.current);
  const sceneObjectsRef = useRef({ impactRings: [] });
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(132631, 0.022);
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1e3);
    camera.position.set(0, 4.8, 12.5);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);
    const ambientLight = new THREE.AmbientLight(3718648, 0.85);
    scene.add(ambientLight);
    const pointLightWhite = new THREE.PointLight(16777215, 5, 30);
    pointLightWhite.position.set(0, 2.5, 0);
    scene.add(pointLightWhite);
    const pointLightCyan = new THREE.PointLight(61695, 3.5, 35);
    pointLightCyan.position.set(5, 6, 5);
    scene.add(pointLightCyan);
    const pointLightViolet = new THREE.PointLight(11032055, 4, 35);
    pointLightViolet.position.set(-5, -6, -5);
    scene.add(pointLightViolet);
    const teslaGroup = new THREE.Group();
    scene.add(teslaGroup);
    const baseGeo = new THREE.CylinderGeometry(1.4, 1.6, 0.35, 32);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 3359061,
      metalness: 0.9,
      roughness: 0.25,
      wireframe: wireframeMode
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -2.2;
    teslaGroup.add(baseMesh);
    const primGeo = new THREE.CylinderGeometry(1.25, 1.45, 0.7, 32, 1, true);
    const primMat = new THREE.MeshStandardMaterial({
      color: 11817737,
      emissive: 7877903,
      emissiveIntensity: 0.8,
      metalness: 0.95,
      roughness: 0.2,
      wireframe: true
    });
    const primMesh = new THREE.Mesh(primGeo, primMat);
    primMesh.position.y = -1.75;
    teslaGroup.add(primMesh);
    const secGeo = new THREE.CylinderGeometry(0.55, 0.55, 3.2, 32);
    const secMat = new THREE.MeshStandardMaterial({
      color: 14251782,
      emissive: 9584654,
      emissiveIntensity: 0.9,
      metalness: 0.9,
      roughness: 0.15,
      wireframe: wireframeMode
    });
    const secMesh = new THREE.Mesh(secGeo, secMat);
    secMesh.position.y = 0.1;
    teslaGroup.add(secMesh);
    const toroidGeo = new THREE.TorusGeometry(1.2, 0.38, 24, 64);
    const toroidMat = new THREE.MeshStandardMaterial({
      color: 16317180,
      emissive: 3718648,
      emissiveIntensity: 0.95,
      metalness: 0.98,
      roughness: 0.1,
      wireframe: wireframeMode
    });
    const toroidMesh = new THREE.Mesh(toroidGeo, toroidMat);
    toroidMesh.rotation.x = Math.PI / 2;
    toroidMesh.position.y = 1.8;
    teslaGroup.add(toroidMesh);
    const tipGeo = new THREE.SphereGeometry(0.28, 16, 16);
    const tipMat = new THREE.MeshBasicMaterial({ color: 16777215 });
    const tipMesh = new THREE.Mesh(tipGeo, tipMat);
    tipMesh.position.y = 1.9;
    teslaGroup.add(tipMesh);
    const maxLightningSegments = 80;
    const lightningPositions = new Float32Array(maxLightningSegments * 6);
    const lightningColors = new Float32Array(maxLightningSegments * 6);
    const lightningGeom = new THREE.BufferGeometry();
    lightningGeom.setAttribute("position", new THREE.BufferAttribute(lightningPositions, 3));
    lightningGeom.setAttribute("color", new THREE.BufferAttribute(lightningColors, 3));
    const lightningMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      linewidth: 2
    });
    const lightningLines = new THREE.LineSegments(lightningGeom, lightningMat);
    scene.add(lightningLines);
    const processMeshesGroup = new THREE.Group();
    scene.add(processMeshesGroup);
    processesRef.current.forEach((proc) => {
      let geom;
      if (proc.type === "hostile") {
        geom = new THREE.OctahedronGeometry(proc.radius, 0);
      } else if (proc.type === "system") {
        geom = new THREE.DodecahedronGeometry(proc.radius, 1);
      } else {
        geom = new THREE.BoxGeometry(proc.radius * 1.4, proc.radius * 1.4, proc.radius * 1.4);
      }
      const mat = new THREE.MeshStandardMaterial({
        color: proc.color,
        emissive: proc.emissive,
        emissiveIntensity: 0.9,
        roughness: 0.3,
        metalness: 0.7,
        wireframe: wireframeMode
      });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.copy(proc.position);
      processMeshesGroup.add(mesh);
      proc.mesh = mesh;
      const glowGeom = new THREE.SphereGeometry(proc.radius * 1.25, 16, 16);
      const glowMat = new THREE.MeshBasicMaterial({
        color: proc.color,
        transparent: true,
        opacity: 0.25,
        wireframe: true
      });
      const glowMesh = new THREE.Mesh(glowGeom, glowMat);
      mesh.add(glowMesh);
      proc.glowMesh = glowMesh;
    });
    const count = particleCount;
    const particlePositions = new Float32Array(count * 3);
    const particleColors = new Float32Array(count * 3);
    const particleVelocities = [];
    const particleLifespans = [];
    const particleOriginalRadii = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const elev = (Math.random() - 0.5) * Math.PI;
      const dist = 1.9 + Math.random() * 4.2;
      const px = dist * Math.cos(elev) * Math.cos(angle);
      const py = dist * Math.sin(elev);
      const pz = dist * Math.cos(elev) * Math.sin(angle);
      particlePositions[i * 3] = px;
      particlePositions[i * 3 + 1] = py;
      particlePositions[i * 3 + 2] = pz;
      const speed = 0.04 + Math.random() * 0.05;
      const vx = -Math.sin(angle) * speed + (Math.random() - 0.5) * 0.02;
      const vy = (Math.random() - 0.5) * 0.03;
      const vz = Math.cos(angle) * speed + (Math.random() - 0.5) * 0.02;
      particleVelocities.push(new THREE.Vector3(vx, vy, vz));
      particleLifespans.push(Math.random() * 100);
      particleOriginalRadii.push(dist);
      const seed = Math.random();
      if (seed < 0.35) {
        particleColors[i * 3] = 1;
        particleColors[i * 3 + 1] = 1;
        particleColors[i * 3 + 2] = 1;
      } else if (seed < 0.7) {
        particleColors[i * 3] = 0.22;
        particleColors[i * 3 + 1] = 0.74;
        particleColors[i * 3 + 2] = 0.97;
      } else {
        particleColors[i * 3] = 0.66;
        particleColors[i * 3 + 1] = 0.33;
        particleColors[i * 3 + 2] = 0.97;
      }
    }
    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeom.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    const particlesPoints = new THREE.Points(particleGeom, particleMat);
    scene.add(particlesPoints);
    const impactRings = [];
    const impactRingGeom = new THREE.RingGeometry(0.1, 0.18, 24);
    const createImpactShockwave = (position, color) => {
      const impactMat = new THREE.MeshBasicMaterial({
        color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.95
      });
      const ringMesh = new THREE.Mesh(impactRingGeom, impactMat);
      ringMesh.position.copy(position);
      ringMesh.lookAt(camera.position);
      scene.add(ringMesh);
      impactRings.push({ mesh: ringMesh, life: 0, maxLife: 20 });
    };
    sceneObjectsRef.current = {
      scene,
      camera,
      renderer,
      teslaCoilGroup: teslaGroup,
      teslaToroidMesh: toroidMesh,
      lightningLines,
      impactRings
    };
    let animationFrameId;
    let clock = new THREE.Clock();
    let frameCount = 0;
    let lastFpsUpdate = performance.now();
    let collisionsInSecond = 0;
    let lastCollisionSecTime = performance.now();
    const pPos = new THREE.Vector3();
    const hitNormal = new THREE.Vector3();
    const toroidTopPos = new THREE.Vector3(0, 1.8, 0);
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();
      const mult = rotationSpeed === "fast" ? 2.2 : rotationSpeed === "slow" ? 0.45 : 1;
      if (toroidMesh) {
        toroidMesh.rotation.z += 0.02 * mult;
        const toroidPulse = 0.8 + Math.sin(elapsed * 8) * 0.3;
        toroidMesh.material.emissiveIntensity = toroidPulse;
      }
      processesRef.current.forEach((proc) => {
        proc.orbitAngle += proc.orbitSpeed * mult;
        const r = proc.baseOrbitRadius;
        const px = r * Math.cos(proc.orbitAngle);
        const pz = r * Math.sin(proc.orbitAngle) * 0.85;
        const py = Math.sin(elapsed * 1.5 + proc.orbitAngle * 2) * 0.8;
        proc.position.set(px, py, pz);
        if (proc.mesh) {
          proc.mesh.position.copy(proc.position);
          proc.mesh.rotation.y += 0.02 * mult;
          proc.mesh.rotation.x += 0.01 * mult;
          const timeSinceHit = performance.now() - proc.lastHitTime;
          if (timeSinceHit < 300) {
            const hitFactor = 1 - timeSinceHit / 300;
            proc.mesh.material.emissiveIntensity = 1 + hitFactor * 2.5;
            if (proc.glowMesh) {
              const scale = 1.25 + hitFactor * 0.35;
              proc.glowMesh.scale.set(scale, scale, scale);
              proc.glowMesh.material.opacity = 0.3 + hitFactor * 0.5;
            }
          } else {
            proc.mesh.material.emissiveIntensity = 0.8;
            if (proc.glowMesh) {
              proc.glowMesh.scale.set(1.25, 1.25, 1.25);
              proc.glowMesh.material.opacity = 0.25;
            }
          }
        }
      });
      if (teslaCoilActive && lightningLines) {
        const lPosAttr = lightningGeom.getAttribute("position");
        const lColAttr = lightningGeom.getAttribute("color");
        const lPosArr = lPosAttr.array;
        const lColArr = lColAttr.array;
        const targetProc = processesRef.current.find((p) => p.id === selectedProcessId) || processesRef.current[0];
        const targetPoint = targetProc.position;
        let arcIndex = 0;
        const activeArcs = teslaDischargeMode === "overdrive" ? 6 : teslaDischargeMode === "pulse" ? 2 : 4;
        for (let a = 0; a < activeArcs; a++) {
          let currX = toroidTopPos.x + (Math.random() - 0.5) * 0.4;
          let currY = toroidTopPos.y + 0.1;
          let currZ = toroidTopPos.z + (Math.random() - 0.5) * 0.4;
          const steps = 6;
          for (let s = 0; s < steps; s++) {
            if (arcIndex >= maxLightningSegments) break;
            const t = (s + 1) / steps;
            const destX = THREE.MathUtils.lerp(toroidTopPos.x, targetPoint.x, t) + (Math.random() - 0.5) * 0.6;
            const destY = THREE.MathUtils.lerp(toroidTopPos.y, targetPoint.y, t) + (Math.random() - 0.5) * 0.6;
            const destZ = THREE.MathUtils.lerp(toroidTopPos.z, targetPoint.z, t) + (Math.random() - 0.5) * 0.6;
            const baseIdx = arcIndex * 6;
            lPosArr[baseIdx] = currX;
            lPosArr[baseIdx + 1] = currY;
            lPosArr[baseIdx + 2] = currZ;
            lPosArr[baseIdx + 3] = destX;
            lPosArr[baseIdx + 4] = destY;
            lPosArr[baseIdx + 5] = destZ;
            const isWhite = Math.random() < 0.4;
            lColArr[baseIdx] = isWhite ? 1 : 0.22;
            lColArr[baseIdx + 1] = isWhite ? 1 : 0.74;
            lColArr[baseIdx + 2] = 1;
            lColArr[baseIdx + 3] = isWhite ? 1 : 0.66;
            lColArr[baseIdx + 4] = isWhite ? 1 : 0.33;
            lColArr[baseIdx + 5] = 1;
            currX = destX;
            currY = destY;
            currZ = destZ;
            arcIndex++;
          }
        }
        for (let rem = arcIndex * 6; rem < lPosArr.length; rem++) {
          lPosArr[rem] = 0;
          lColArr[rem] = 0;
        }
        lPosAttr.needsUpdate = true;
        lColAttr.needsUpdate = true;
        lightningLines.visible = true;
        if (Math.random() < 0.12 && playSoundRef.current.teslaArc) {
          playSoundRef.current.teslaArc();
        }
      } else if (lightningLines) {
        lightningLines.visible = false;
      }
      const posAttr = particleGeom.getAttribute("position");
      const colAttr = particleGeom.getAttribute("color");
      const positionsArr = posAttr.array;
      const colorsArr = colAttr.array;
      for (let i = 0; i < count; i++) {
        let px = positionsArr[i * 3];
        let py = positionsArr[i * 3 + 1];
        let pz = positionsArr[i * 3 + 2];
        const vel = particleVelocities[i];
        if (plasmaMode === "vortex") {
          const curDist = Math.sqrt(px * px + pz * pz);
          const targetDist = particleOriginalRadii[i];
          const distDiff = targetDist - curDist;
          vel.x += -pz / (curDist + 0.1) * 2e-3 * mult;
          vel.z += px / (curDist + 0.1) * 2e-3 * mult;
          vel.x += px / (curDist + 0.1) * distDiff * 1e-3;
          vel.z += pz / (curDist + 0.1) * distDiff * 1e-3;
          vel.y += -py * 2e-3;
        } else if (plasmaMode === "cyclotron") {
          vel.x += -py * 0.015 * mult;
          vel.y += px * 0.015 * mult;
        } else if (plasmaMode === "storm") {
          vel.x += (Math.random() - 0.5) * 0.015;
          vel.y += (Math.random() - 0.5) * 0.015;
          vel.z += (Math.random() - 0.5) * 0.015;
        }
        px += vel.x;
        py += vel.y;
        pz += vel.z;
        pPos.set(px, py, pz);
        for (let pIdx = 0; pIdx < processesRef.current.length; pIdx++) {
          const proc = processesRef.current[pIdx];
          const collisionRadius = proc.radius * 1.15;
          const distSq = pPos.distanceToSquared(proc.position);
          if (distSq < collisionRadius * collisionRadius) {
            const dist = Math.sqrt(distSq);
            if (dist > 1e-3) {
              hitNormal.subVectors(pPos, proc.position).normalize();
            } else {
              hitNormal.set(0, 1, 0);
            }
            const dot = vel.dot(hitNormal);
            if (dot < 0) {
              vel.sub(hitNormal.clone().multiplyScalar((1 + elasticity) * dot));
              vel.x += (Math.random() - 0.5) * 0.02;
              vel.y += (Math.random() - 0.5) * 0.02;
              vel.z += (Math.random() - 0.5) * 0.02;
            }
            pPos.copy(proc.position).add(hitNormal.multiplyScalar(collisionRadius + 0.05));
            px = pPos.x;
            py = pPos.y;
            pz = pPos.z;
            colorsArr[i * 3] = 1;
            colorsArr[i * 3 + 1] = 0.9;
            colorsArr[i * 3 + 2] = 0.3;
            proc.collisionsCount += 1;
            proc.lastHitTime = performance.now();
            collisionsInSecond++;
            setTotalCollisions((prev) => prev + 1);
            if (proc.type === "hostile") {
              proc.integrity = Math.max(0, +(proc.integrity - 0.04).toFixed(1));
              if (proc.integrity === 0) {
                proc.integrity = 100;
              }
            }
            if (Math.random() < 0.25) {
              createImpactShockwave(pPos, proc.color);
            }
            if (playSoundRef.current.collision) {
              playSoundRef.current.collision(proc.type === "hostile" ? 1.4 : 0.9);
            }
            break;
          }
        }
        if (Math.abs(px) < 0.9 && Math.abs(pz) < 0.9 && py > -2.2 && py < 2.2) {
          vel.x = -vel.x * elasticity;
          vel.z = -vel.z * elasticity;
          px += vel.x * 0.1;
          pz += vel.z * 0.1;
        }
        const coreDistSq = px * px + py * py + pz * pz;
        if (coreDistSq > 50) {
          px = (Math.random() - 0.5) * 3;
          py = (Math.random() - 0.5) * 3;
          pz = (Math.random() - 0.5) * 3;
          vel.set((Math.random() - 0.5) * 0.04, (Math.random() - 0.5) * 0.04, (Math.random() - 0.5) * 0.04);
        }
        colorsArr[i * 3] = THREE.MathUtils.lerp(colorsArr[i * 3], 0.22, 0.02);
        colorsArr[i * 3 + 1] = THREE.MathUtils.lerp(colorsArr[i * 3 + 1], 0.74, 0.02);
        colorsArr[i * 3 + 2] = THREE.MathUtils.lerp(colorsArr[i * 3 + 2], 0.97, 0.02);
        positionsArr[i * 3] = px;
        positionsArr[i * 3 + 1] = py;
        positionsArr[i * 3 + 2] = pz;
      }
      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;
      for (let sIdx = impactRings.length - 1; sIdx >= 0; sIdx--) {
        const item = impactRings[sIdx];
        item.life++;
        const progress = item.life / item.maxLife;
        const scale = 1 + progress * 2.8;
        item.mesh.scale.set(scale, scale, scale);
        item.mesh.material.opacity = 0.95 * (1 - progress);
        if (item.life >= item.maxLife) {
          scene.remove(item.mesh);
          item.mesh.geometry.dispose();
          item.mesh.material.dispose();
          impactRings.splice(sIdx, 1);
        }
      }
      renderer.render(scene, camera);
      frameCount++;
      const now = performance.now();
      if (now - lastFpsUpdate >= 1e3) {
        setFps(Math.round(frameCount * 1e3 / (now - lastFpsUpdate)));
        frameCount = 0;
        lastFpsUpdate = now;
      }
      if (now - lastCollisionSecTime >= 1e3) {
        setCollisionsPerSec(collisionsInSecond);
        collisionsInSecond = 0;
        lastCollisionSecTime = now;
        setProcessesState([...processesRef.current]);
      }
    };
    animate();
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      baseGeo.dispose();
      baseMat.dispose();
      primGeo.dispose();
      primMat.dispose();
      secGeo.dispose();
      secMat.dispose();
      toroidGeo.dispose();
      toroidMat.dispose();
      tipGeo.dispose();
      tipMat.dispose();
      lightningGeom.dispose();
      lightningMat.dispose();
      processMeshesGroup.children.forEach((c) => {
        const m = c;
        if (m.geometry) m.geometry.dispose();
        if (m.material) m.material.dispose();
      });
      particleGeom.dispose();
      particleMat.dispose();
      impactRings.forEach((item) => {
        scene.remove(item.mesh);
        item.mesh.geometry.dispose();
        item.mesh.material.dispose();
      });
      renderer.dispose();
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [wireframeMode, rotationSpeed, plasmaMode, particleCount, elasticity, teslaCoilActive, teslaDischargeMode]);
  const firePlasmaDischargeAtTarget = () => {
    setCoreStatus("TESLA_DISCHARGE");
    const target = processesRef.current.find((p) => p.id === selectedProcessId);
    if (target && sceneObjectsRef.current.scene) {
      if (playSoundRef.current.teslaArc) {
        playSoundRef.current.teslaArc();
      }
      target.collisionsCount += 48;
      target.lastHitTime = performance.now();
      if (target.type === "hostile") {
        target.integrity = Math.max(0, +(target.integrity - 18).toFixed(1));
      }
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("sentinel:plasma-shockwave", {
            detail: { x: window.innerWidth / 2, y: window.innerHeight * 0.4 }
          })
        );
      }
    }
    setTimeout(() => {
      setCoreStatus("OPTIMAL");
      setProcessesState([...processesRef.current]);
    }, 700);
  };
  return /* @__PURE__ */ jsxDEV("div", { className: `space-y-4 ${className}`, children: [
    /* @__PURE__ */ jsxDEV("div", { className: "relative rounded-3xl bg-slate-950/90 border-2 border-cyan-500/50 shadow-2xl overflow-hidden", children: [
      /* @__PURE__ */ jsxDEV("div", { ref: mountRef, className: "w-full h-[470px] cursor-grab active:cursor-grabbing relative z-10" }, void 0, false, {
        fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
        lineNumber: 865,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute top-4 left-4 z-20 flex flex-col gap-2 pointer-events-none", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "p-2.5 rounded-2xl bg-cyan-950/85 border border-cyan-400 text-cyan-300 shadow-xl backdrop-blur-md", children: /* @__PURE__ */ jsxDEV(Zap, { className: "w-5 h-5 text-amber-300 animate-pulse" }, void 0, false, {
          fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
          lineNumber: 871,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
          lineNumber: 870,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "btn-glass-polished p-3 rounded-2xl border border-cyan-400/80 shadow-2xl pointer-events-auto", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-black text-white flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV("span", { children: "Cewka Tesli 3D & Reaktor Kolizyjny" }, void 0, false, {
              fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
              lineNumber: 875,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/80 shadow", children: [
              fps,
              " FPS"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
              lineNumber: 876,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/80 shadow", children: [
              collisionsPerSec,
              " zderzeń/s"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
              lineNumber: 879,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
            lineNumber: 874,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] font-mono text-slate-300 mt-1 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV("span", { children: [
              "Napięcie Cewki: ",
              /* @__PURE__ */ jsxDEV("b", { className: "text-amber-300", children: [
                teslaVoltageKV,
                " kV"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
                lineNumber: 884,
                columnNumber: 39
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
              lineNumber: 884,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "•" }, void 0, false, {
              fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
              lineNumber: 885,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              "Łuki: ",
              /* @__PURE__ */ jsxDEV("b", { className: teslaCoilActive ? "text-cyan-300" : "text-slate-500", children: teslaCoilActive ? "AKTYWNE" : "WYŁ" }, void 0, false, {
                fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
                lineNumber: 886,
                columnNumber: 29
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
              lineNumber: 886,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "•" }, void 0, false, {
              fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
              lineNumber: 887,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              "Stan: ",
              /* @__PURE__ */ jsxDEV("b", { className: coreStatus === "TESLA_DISCHARGE" ? "text-amber-400 font-bold" : "text-emerald-300", children: coreStatus }, void 0, false, {
                fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
                lineNumber: 888,
                columnNumber: 29
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
              lineNumber: 888,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
            lineNumber: 883,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
          lineNumber: 873,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
        lineNumber: 869,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
        lineNumber: 868,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute top-4 right-4 z-20 flex items-center gap-2 pointer-events-auto", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/90 border border-amber-500/60 text-xs font-mono font-bold shadow-lg", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "w-3 h-3 rounded-full bg-amber-400 animate-ping inline-block" }, void 0, false, {
            fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
            lineNumber: 898,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-amber-300", children: "DEFCON-2" }, void 0, false, {
            fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
            lineNumber: 899,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "|" }, void 0, false, {
            fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
            lineNumber: 900,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-300", children: "CEWKA TESLI: 750kV" }, void 0, false, {
            fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
            lineNumber: 901,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
          lineNumber: 897,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 bg-slate-950/90 backdrop-blur-md p-1.5 rounded-2xl border border-cyan-500/60 shadow-xl text-xs font-mono", children: processesState.map((proc) => {
          const isSel = selectedProcessId === proc.id;
          return /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setSelectedProcessId(proc.id),
              className: `px-2.5 py-1 rounded-xl font-bold transition-all ${isSel ? proc.type === "hostile" ? "btn-glossy-red is-active shadow-md" : "btn-glossy-cyan is-active shadow-md" : "text-slate-400 hover:text-white bg-slate-900/60"}`,
              children: proc.type === "hostile" ? "⚠️ GNIDA" : proc.name.split(".")[0]
            },
            proc.id,
            false,
            {
              fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
              lineNumber: 909,
              columnNumber: 17
            },
            this
          );
        }) }, void 0, false, {
          fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
          lineNumber: 905,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
        lineNumber: 895,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-4 inset-x-4 z-20 flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl titanium-steel-panel shadow-2xl", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 flex-wrap", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-700 shadow-inner", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] font-mono font-bold text-slate-300 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxDEV(Zap, { className: "w-3.5 h-3.5 text-amber-300" }, void 0, false, {
                fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
                lineNumber: 934,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "CEWKA TESLI:" }, void 0, false, {
                fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
                lineNumber: 935,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
              lineNumber: 933,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => {
                  setTeslaCoilActive(!teslaCoilActive);
                  if (playSoundRef.current.teslaArc) playSoundRef.current.teslaArc();
                },
                className: `switch-titanium w-12 h-6 ${teslaCoilActive ? "border-cyan-400 bg-cyan-950/80" : "border-slate-700"}`,
                title: "Przełącznik tytanowy zasilania Cewki Tesli",
                children: /* @__PURE__ */ jsxDEV("div", { className: `switch-titanium-thumb transform ${teslaCoilActive ? "translate-x-6 bg-cyan-400" : "translate-x-0"}` }, void 0, false, {
                  fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
                  lineNumber: 946,
                  columnNumber: 17
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
                lineNumber: 938,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("span", { className: `text-[10px] font-mono font-bold ${teslaCoilActive ? "text-cyan-300" : "text-slate-500"}`, children: teslaCoilActive ? "750 kV ON" : "OFF" }, void 0, false, {
              fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
              lineNumber: 949,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
            lineNumber: 932,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setPlasmaMode("vortex"),
              className: `btn-glass-polished px-3 py-1.5 text-xs font-mono font-bold ${plasmaMode === "vortex" ? "border-cyan-300 shadow-cyan-500/50" : "text-slate-300"}`,
              children: "Wir Grawitacyjny"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
              lineNumber: 955,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setPlasmaMode("cyclotron"),
              className: `btn-glass-polished px-3 py-1.5 text-xs font-mono font-bold ${plasmaMode === "cyclotron" ? "border-purple-300 shadow-purple-500/50" : "text-slate-300"}`,
              children: "Wiązka Cyklotronu"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
              lineNumber: 964,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setPlasmaMode("storm"),
              className: `btn-glass-polished px-3 py-1.5 text-xs font-mono font-bold ${plasmaMode === "storm" ? "border-amber-300 shadow-amber-500/50" : "text-slate-300"}`,
              children: "Burza Plazmowa"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
              lineNumber: 973,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setWireframeMode(!wireframeMode),
              className: "btn-titanium-steel px-3 py-1.5 text-xs flex items-center gap-1.5 rounded-xl",
              children: [
                /* @__PURE__ */ jsxDEV(Layers, { className: "w-3.5 h-3.5 text-cyan-300" }, void 0, false, {
                  fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
                  lineNumber: 986,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: wireframeMode ? "Siatka Wireframe" : "Bryły 3D" }, void 0, false, {
                  fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
                  lineNumber: 987,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
              lineNumber: 982,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
          lineNumber: 930,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: firePlasmaDischargeAtTarget,
              className: "btn-glossy btn-glossy-red px-4 py-2 text-xs font-mono font-black flex items-center gap-2 animate-pulse shadow-lg",
              title: "Wystrzel łuk elektryczny Cewki Tesli prosto w namierzony proces!",
              children: [
                /* @__PURE__ */ jsxDEV(Zap, { className: "w-4 h-4 text-yellow-300" }, void 0, false, {
                  fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
                  lineNumber: 998,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Wyładowanie Cewki Tesli w Cel" }, void 0, false, {
                  fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
                  lineNumber: 999,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
              lineNumber: 993,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => {
                const speeds = ["slow", "normal", "fast"];
                const nextIdx = (speeds.indexOf(rotationSpeed) + 1) % speeds.length;
                setRotationSpeed(speeds[nextIdx]);
              },
              className: "btn-titanium-steel px-3 py-1.5 text-xs rounded-xl flex items-center gap-1",
              children: [
                /* @__PURE__ */ jsxDEV(RotateCw, { className: "w-3.5 h-3.5 text-cyan-300" }, void 0, false, {
                  fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
                  lineNumber: 1010,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: [
                  "Rotacja: ",
                  rotationSpeed.toUpperCase()
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
                  lineNumber: 1011,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
              lineNumber: 1002,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setAudioFeedback(!audioFeedback),
              className: `btn-glass-polished p-2 text-xs ${audioFeedback ? "text-cyan-300" : "text-slate-500"}`,
              title: audioFeedback ? "Dźwięki wyładowań aktywne" : "Dźwięki wyciszone",
              children: audioFeedback ? /* @__PURE__ */ jsxDEV(Volume2, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
                lineNumber: 1019,
                columnNumber: 32
              }, this) : /* @__PURE__ */ jsxDEV(VolumeX, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
                lineNumber: 1019,
                columnNumber: 66
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
              lineNumber: 1014,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
          lineNumber: 992,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
        lineNumber: 928,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
      lineNumber: 863,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [
      processesState.map((proc) => {
        const isSelected = selectedProcessId === proc.id;
        return /* @__PURE__ */ jsxDEV(
          "div",
          {
            onClick: () => setSelectedProcessId(proc.id),
            className: `p-4 rounded-2xl border transition-all cursor-pointer ${isSelected ? proc.type === "hostile" ? "bg-red-950/70 border-red-500 shadow-2xl shadow-red-950/60" : "bg-cyan-950/70 border-cyan-400 shadow-2xl shadow-cyan-950/60" : "bg-slate-900/80 border-slate-800 hover:border-slate-700"}`,
            children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: `w-3 h-3 rounded-full ${proc.type === "hostile" ? "bg-red-500 animate-ping" : proc.type === "system" ? "bg-emerald-400" : "bg-amber-400"}` }, void 0, false, {
                    fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
                    lineNumber: 1043,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { children: [
                    /* @__PURE__ */ jsxDEV("h4", { className: "text-xs font-black font-mono text-white", children: proc.name }, void 0, false, {
                      fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
                      lineNumber: 1045,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono text-slate-400", children: [
                      "PID: ",
                      proc.pid,
                      " • Promień: ",
                      proc.radius,
                      "m"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
                      lineNumber: 1046,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
                    lineNumber: 1044,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
                  lineNumber: 1042,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: `px-2 py-0.5 rounded text-[10px] font-mono font-bold ${proc.type === "hostile" ? "bg-red-950 text-red-300 border border-red-700" : "bg-emerald-950 text-emerald-300 border border-emerald-700"}`, children: proc.type.toUpperCase() }, void 0, false, {
                  fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
                  lineNumber: 1049,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
                lineNumber: 1041,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "mt-3 space-y-1.5 text-xs font-mono", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between text-slate-300 text-[11px]", children: [
                  /* @__PURE__ */ jsxDEV("span", { children: "Kolizje z cząsteczkami & łukami:" }, void 0, false, {
                    fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
                    lineNumber: 1061,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-300 font-bold", children: proc.collisionsCount.toLocaleString() }, void 0, false, {
                    fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
                    lineNumber: 1062,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
                  lineNumber: 1060,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between text-slate-300 text-[11px]", children: [
                  /* @__PURE__ */ jsxDEV("span", { children: "Integralność Osłony:" }, void 0, false, {
                    fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
                    lineNumber: 1066,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: proc.integrity < 50 ? "text-red-400 font-bold" : "text-emerald-400 font-bold", children: [
                    proc.integrity,
                    "%"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
                    lineNumber: 1067,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
                  lineNumber: 1065,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800", children: /* @__PURE__ */ jsxDEV(
                  "div",
                  {
                    className: `h-full transition-all duration-300 ${proc.type === "hostile" ? "bg-red-500" : "bg-gradient-to-r from-cyan-500 to-emerald-400"}`,
                    style: { width: `${proc.integrity}%` }
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
                    lineNumber: 1073,
                    columnNumber: 19
                  },
                  this
                ) }, void 0, false, {
                  fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
                  lineNumber: 1072,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between text-[10px] text-slate-500 pt-1", children: [
                  /* @__PURE__ */ jsxDEV("span", { children: [
                    "Porażenie Cewką Tesli: ",
                    teslaCoilActive ? "GOTOWE" : "STANDBY"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
                    lineNumber: 1082,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: [
                    "Promień orbity: ",
                    proc.baseOrbitRadius,
                    "m"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
                    lineNumber: 1083,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
                  lineNumber: 1081,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
                lineNumber: 1059,
                columnNumber: 15
              }, this)
            ]
          },
          proc.id,
          true,
          {
            fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
            lineNumber: 1030,
            columnNumber: 13
          },
          this
        );
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl titanium-steel-panel flex flex-col justify-between", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between mb-2", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-4 h-4 text-cyan-300" }, void 0, false, {
                fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
                lineNumber: 1095,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("h4", { className: "text-xs font-black text-white font-mono", children: "PROTOKÓŁ TESLI: STANAG-750" }, void 0, false, {
                fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
                lineNumber: 1096,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
              lineNumber: 1094,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-cyan-400 animate-ping" }, void 0, false, {
              fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
              lineNumber: 1098,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
            lineNumber: 1093,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-300", children: "Wysokonapięciowa cewka Tesli generuje łuki wyładowcze rozbijające wrogie nakładki GUI i procesy malware na poziomie mikroarchitektury CPU." }, void 0, false, {
            fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
            lineNumber: 1100,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
          lineNumber: 1092,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "mt-3 pt-2 border-t border-slate-700/80 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono text-slate-300", children: [
            "Iskrownik: ",
            /* @__PURE__ */ jsxDEV("b", { className: "text-emerald-400", children: "ZSYNCHRONIZOWANY" }, void 0, false, {
              fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
              lineNumber: 1106,
              columnNumber: 79
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
            lineNumber: 1106,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setParticleCount(particleCount === 280 ? 450 : 280),
              className: "btn-titanium-steel px-2.5 py-1 text-[10px] rounded-lg",
              children: particleCount === 280 ? "Gęstość Max (450)" : "Gęstość Standard (280)"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
              lineNumber: 1107,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
          lineNumber: 1105,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
        lineNumber: 1091,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
      lineNumber: 1026,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/ThreeDDefenseCore.tsx",
    lineNumber: 861,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRocmVlRERlZmVuc2VDb3JlLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgXG4gIEJveCwgU3BhcmtsZXMsIEFjdGl2aXR5LCBTaGllbGQsIFJvdGF0ZUN3LCBFeWUsIFphcCwgTGF5ZXJzLCBSZWZyZXNoQ3csIFxuICBUYXJnZXQsIEFsZXJ0VHJpYW5nbGUsIFNoaWVsZENoZWNrLCBGbGFtZSwgU2xpZGVycywgVm9sdW1lMiwgVm9sdW1lWCwgQ3Jvc3NoYWlyLFxuICBSYWRpbywgQ29tcGFzcywgU3VuLCBXaW5kXG59IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5cbmludGVyZmFjZSBQcm9jZXNzTm9kZSB7XG4gIGlkOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgdHlwZTogJ3N5c3RlbScgfCAnZHJpdmVyJyB8ICdob3N0aWxlJyB8ICduZXR3b3JrJztcbiAgcGlkOiBudW1iZXI7XG4gIHJhZGl1czogbnVtYmVyO1xuICBjb2xvcjogbnVtYmVyO1xuICBlbWlzc2l2ZTogbnVtYmVyO1xuICBtZXNoPzogVEhSRUUuTWVzaDtcbiAgZ2xvd01lc2g/OiBUSFJFRS5NZXNoO1xuICBwb3NpdGlvbjogVEhSRUUuVmVjdG9yMztcbiAgYmFzZU9yYml0UmFkaXVzOiBudW1iZXI7XG4gIG9yYml0U3BlZWQ6IG51bWJlcjtcbiAgb3JiaXRBbmdsZTogbnVtYmVyO1xuICBpbnRlZ3JpdHk6IG51bWJlcjtcbiAgY29sbGlzaW9uc0NvdW50OiBudW1iZXI7XG4gIGxhc3RIaXRUaW1lOiBudW1iZXI7XG59XG5cbmludGVyZmFjZSBQcm9wcyB7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IFRocmVlRERlZmVuc2VDb3JlOiBSZWFjdC5GQzxQcm9wcz4gPSAoeyBjbGFzc05hbWUgPSAnJyB9KSA9PiB7XG4gIGNvbnN0IG1vdW50UmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFt3aXJlZnJhbWVNb2RlLCBzZXRXaXJlZnJhbWVNb2RlXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcbiAgY29uc3QgW3JvdGF0aW9uU3BlZWQsIHNldFJvdGF0aW9uU3BlZWRdID0gdXNlU3RhdGU8J3Nsb3cnIHwgJ25vcm1hbCcgfCAnZmFzdCc+KCdub3JtYWwnKTtcbiAgY29uc3QgW2NvcmVTdGF0dXMsIHNldENvcmVTdGF0dXNdID0gdXNlU3RhdGU8J09QVElNQUwnIHwgJ09WRVJDSEFSR0VEJyB8ICdDT0xMSVNJT05fQlVSU1QnIHwgJ1RFU0xBX0RJU0NIQVJHRSc+KCdPUFRJTUFMJyk7XG4gIGNvbnN0IFthY3RpdmVJbGx1bWluYXRlZFJpbmcsIHNldEFjdGl2ZUlsbHVtaW5hdGVkUmluZ10gPSB1c2VTdGF0ZTxudW1iZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2Zwcywgc2V0RnBzXSA9IHVzZVN0YXRlPG51bWJlcj4oNjApO1xuICBcbiAgLy8gVGVzbGEgQ29pbCBDb250cm9scyAmIFN0YXRlc1xuICBjb25zdCBbdGVzbGFDb2lsQWN0aXZlLCBzZXRUZXNsYUNvaWxBY3RpdmVdID0gdXNlU3RhdGU8Ym9vbGVhbj4odHJ1ZSk7XG4gIGNvbnN0IFt0ZXNsYVZvbHRhZ2VLViwgc2V0VGVzbGFWb2x0YWdlS1ZdID0gdXNlU3RhdGU8bnVtYmVyPig3NTApO1xuICBjb25zdCBbdGVzbGFEaXNjaGFyZ2VNb2RlLCBzZXRUZXNsYURpc2NoYXJnZU1vZGVdID0gdXNlU3RhdGU8J2NvbnRpbnVvdXMnIHwgJ3B1bHNlJyB8ICdvdmVyZHJpdmUnPignY29udGludW91cycpO1xuICBjb25zdCBbcGxhc21hTW9kZSwgc2V0UGxhc21hTW9kZV0gPSB1c2VTdGF0ZTwndm9ydGV4JyB8ICdjeWNsb3Ryb24nIHwgJ3N0b3JtJz4oJ3ZvcnRleCcpO1xuICBjb25zdCBbcGFydGljbGVDb3VudCwgc2V0UGFydGljbGVDb3VudF0gPSB1c2VTdGF0ZTxudW1iZXI+KDI4MCk7XG4gIGNvbnN0IFt0b3RhbENvbGxpc2lvbnMsIHNldFRvdGFsQ29sbGlzaW9uc10gPSB1c2VTdGF0ZTxudW1iZXI+KDApO1xuICBjb25zdCBbY29sbGlzaW9uc1BlclNlYywgc2V0Q29sbGlzaW9uc1BlclNlY10gPSB1c2VTdGF0ZTxudW1iZXI+KDApO1xuICBjb25zdCBbYXVkaW9GZWVkYmFjaywgc2V0QXVkaW9GZWVkYmFja10gPSB1c2VTdGF0ZTxib29sZWFuPih0cnVlKTtcbiAgY29uc3QgW3NlbGVjdGVkUHJvY2Vzc0lkLCBzZXRTZWxlY3RlZFByb2Nlc3NJZF0gPSB1c2VTdGF0ZTxzdHJpbmc+KCdwcm9jLWduaWRhJyk7XG4gIGNvbnN0IFtlbGFzdGljaXR5LCBzZXRFbGFzdGljaXR5XSA9IHVzZVN0YXRlPG51bWJlcj4oMC44NSk7XG5cbiAgLy8gU291bmQgc3ludGhlc2lzIHZpYSBXZWIgQXVkaW8gQVBJIGZvciBjb2xsaXNpb24gY2xpY2tzIGFuZCBUZXNsYSBoaWdoLXZvbHRhZ2UgZWxlY3RyaWMgY3JhY2tsZXNcbiAgY29uc3QgcGxheVNvdW5kUmVmID0gdXNlUmVmPHtcbiAgICBjb2xsaXNpb246IChwaXRjaDogbnVtYmVyKSA9PiB2b2lkO1xuICAgIHRlc2xhQXJjOiAoKSA9PiB2b2lkO1xuICB9Pih7XG4gICAgY29sbGlzaW9uOiAoKSA9PiB7fSxcbiAgICB0ZXNsYUFyYzogKCkgPT4ge31cbiAgfSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsZXQgYXVkaW9DdHg6IEF1ZGlvQ29udGV4dCB8IG51bGwgPSBudWxsO1xuICAgIGxldCBsYXN0U291bmRUaW1lID0gMDtcbiAgICBsZXQgbGFzdFRlc2xhU291bmRUaW1lID0gMDtcblxuICAgIGNvbnN0IGdldEF1ZGlvQ3R4ID0gKCkgPT4ge1xuICAgICAgaWYgKCFhdWRpb0N0eCB8fCBhdWRpb0N0eC5zdGF0ZSA9PT0gJ3N1c3BlbmRlZCcpIHtcbiAgICAgICAgY29uc3QgQXVkaW9DdHggPSB3aW5kb3cuQXVkaW9Db250ZXh0IHx8ICh3aW5kb3cgYXMgdW5rbm93biBhcyB7IHdlYmtpdEF1ZGlvQ29udGV4dDogdHlwZW9mIEF1ZGlvQ29udGV4dCB9KS53ZWJraXRBdWRpb0NvbnRleHQ7XG4gICAgICAgIGlmIChBdWRpb0N0eCkge1xuICAgICAgICAgIGF1ZGlvQ3R4ID0gbmV3IEF1ZGlvQ3R4KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBhdWRpb0N0eDtcbiAgICB9O1xuXG4gICAgcGxheVNvdW5kUmVmLmN1cnJlbnQuY29sbGlzaW9uID0gKHBpdGNoTXVsdGlwbGllciA9IDEuMCkgPT4ge1xuICAgICAgaWYgKCFhdWRpb0ZlZWRiYWNrIHx8IHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSByZXR1cm47XG4gICAgICBjb25zdCBub3cgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgIGlmIChub3cgLSBsYXN0U291bmRUaW1lIDwgNDApIHJldHVybjtcbiAgICAgIGxhc3RTb3VuZFRpbWUgPSBub3c7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGN0eCA9IGdldEF1ZGlvQ3R4KCk7XG4gICAgICAgIGlmICghY3R4KSByZXR1cm47XG5cbiAgICAgICAgY29uc3Qgb3NjID0gY3R4LmNyZWF0ZU9zY2lsbGF0b3IoKTtcbiAgICAgICAgY29uc3QgZ2FpbiA9IGN0eC5jcmVhdGVHYWluKCk7XG4gICAgICAgIG9zYy50eXBlID0gJ3NpbmUnO1xuICAgICAgICBjb25zdCBiYXNlRnJlcSA9IDk1MCAqIHBpdGNoTXVsdGlwbGllciArIE1hdGgucmFuZG9tKCkgKiAyMDA7XG4gICAgICAgIG9zYy5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoYmFzZUZyZXEsIGN0eC5jdXJyZW50VGltZSk7XG4gICAgICAgIG9zYy5mcmVxdWVuY3kuZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZShiYXNlRnJlcSAqIDAuMzUsIGN0eC5jdXJyZW50VGltZSArIDAuMDUpO1xuXG4gICAgICAgIGdhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLjA0LCBjdHguY3VycmVudFRpbWUpO1xuICAgICAgICBnYWluLmdhaW4ubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUoMC4wMDEsIGN0eC5jdXJyZW50VGltZSArIDAuMDUpO1xuXG4gICAgICAgIG9zYy5jb25uZWN0KGdhaW4pO1xuICAgICAgICBnYWluLmNvbm5lY3QoY3R4LmRlc3RpbmF0aW9uKTtcbiAgICAgICAgb3NjLnN0YXJ0KCk7XG4gICAgICAgIG9zYy5zdG9wKGN0eC5jdXJyZW50VGltZSArIDAuMDUpO1xuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIC8vIFN1cHByZXNzZWRcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcGxheVNvdW5kUmVmLmN1cnJlbnQudGVzbGFBcmMgPSAoKSA9PiB7XG4gICAgICBpZiAoIWF1ZGlvRmVlZGJhY2sgfHwgdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcbiAgICAgIGNvbnN0IG5vdyA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgaWYgKG5vdyAtIGxhc3RUZXNsYVNvdW5kVGltZSA8IDE4MCkgcmV0dXJuO1xuICAgICAgbGFzdFRlc2xhU291bmRUaW1lID0gbm93O1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBjdHggPSBnZXRBdWRpb0N0eCgpO1xuICAgICAgICBpZiAoIWN0eCkgcmV0dXJuO1xuXG4gICAgICAgIC8vIFRlc2xhIHNwYXJrIGJ1eno6IHNhd3Rvb3RoICsgbm9pc2UgYnVyc3RcbiAgICAgICAgY29uc3Qgb3NjID0gY3R4LmNyZWF0ZU9zY2lsbGF0b3IoKTtcbiAgICAgICAgY29uc3QgZ2FpbiA9IGN0eC5jcmVhdGVHYWluKCk7XG4gICAgICAgIG9zYy50eXBlID0gJ3Nhd3Rvb3RoJztcbiAgICAgICAgb3NjLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZSgxNDAsIGN0eC5jdXJyZW50VGltZSk7XG4gICAgICAgIG9zYy5mcmVxdWVuY3kubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUoODAsIGN0eC5jdXJyZW50VGltZSArIDAuMTIpO1xuXG4gICAgICAgIGdhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLjA4LCBjdHguY3VycmVudFRpbWUpO1xuICAgICAgICBnYWluLmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgwLjAwMSwgY3R4LmN1cnJlbnRUaW1lICsgMC4xMik7XG5cbiAgICAgICAgb3NjLmNvbm5lY3QoZ2Fpbik7XG4gICAgICAgIGdhaW4uY29ubmVjdChjdHguZGVzdGluYXRpb24pO1xuICAgICAgICBvc2Muc3RhcnQoKTtcbiAgICAgICAgb3NjLnN0b3AoY3R4LmN1cnJlbnRUaW1lICsgMC4xMik7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgLy8gU3VwcHJlc3NlZFxuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKGF1ZGlvQ3R4KSB7XG4gICAgICAgIGF1ZGlvQ3R4LmNsb3NlKCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSwgW2F1ZGlvRmVlZGJhY2tdKTtcblxuICAvLyBEeW5hbWljIFByb2Nlc3MgbGlzdCBpbiBwaHlzaWNhbCBzdGF0ZVxuICBjb25zdCBwcm9jZXNzZXNSZWYgPSB1c2VSZWY8UHJvY2Vzc05vZGVbXT4oW1xuICAgIHtcbiAgICAgIGlkOiAncHJvYy1nbmlkYScsXG4gICAgICBuYW1lOiAnZ25pZGFfb3ZlcmxheS5leGUnLFxuICAgICAgdHlwZTogJ2hvc3RpbGUnLFxuICAgICAgcGlkOiA2NjEyLFxuICAgICAgcmFkaXVzOiAwLjksXG4gICAgICBjb2xvcjogMHhlZjQ0NDQsXG4gICAgICBlbWlzc2l2ZTogMHg5OTFiMWIsXG4gICAgICBwb3NpdGlvbjogbmV3IFRIUkVFLlZlY3RvcjMoNC4yLCAwLjUsIDApLFxuICAgICAgYmFzZU9yYml0UmFkaXVzOiA0LjIsXG4gICAgICBvcmJpdFNwZWVkOiAwLjAxMixcbiAgICAgIG9yYml0QW5nbGU6IDAsXG4gICAgICBpbnRlZ3JpdHk6IDQyLFxuICAgICAgY29sbGlzaW9uc0NvdW50OiAwLFxuICAgICAgbGFzdEhpdFRpbWU6IDBcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiAncHJvYy13aW5sb2dvbicsXG4gICAgICBuYW1lOiAnd2lubG9nb24uZXhlJyxcbiAgICAgIHR5cGU6ICdzeXN0ZW0nLFxuICAgICAgcGlkOiA0OTIsXG4gICAgICByYWRpdXM6IDAuNzUsXG4gICAgICBjb2xvcjogMHgxMGI5ODEsXG4gICAgICBlbWlzc2l2ZTogMHgwNjVmNDYsXG4gICAgICBwb3NpdGlvbjogbmV3IFRIUkVFLlZlY3RvcjMoLTQuNSwgMS4yLCAwKSxcbiAgICAgIGJhc2VPcmJpdFJhZGl1czogNC41LFxuICAgICAgb3JiaXRTcGVlZDogLTAuMDA4LFxuICAgICAgb3JiaXRBbmdsZTogTWF0aC5QSSAqIDAuOCxcbiAgICAgIGludGVncml0eTogOTkuOCxcbiAgICAgIGNvbGxpc2lvbnNDb3VudDogMCxcbiAgICAgIGxhc3RIaXRUaW1lOiAwXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogJ3Byb2Mtc3ZjaG9zdCcsXG4gICAgICBuYW1lOiAnc3ZjaG9zdC5leGUgW0Rjb21MYXVuY2hdJyxcbiAgICAgIHR5cGU6ICdzeXN0ZW0nLFxuICAgICAgcGlkOiA4ODQsXG4gICAgICByYWRpdXM6IDAuNjUsXG4gICAgICBjb2xvcjogMHgwNmI2ZDQsXG4gICAgICBlbWlzc2l2ZTogMHgxNTVlNzUsXG4gICAgICBwb3NpdGlvbjogbmV3IFRIUkVFLlZlY3RvcjMoMCwgLTMuOCwgMi41KSxcbiAgICAgIGJhc2VPcmJpdFJhZGl1czogNC4wLFxuICAgICAgb3JiaXRTcGVlZDogMC4wMTUsXG4gICAgICBvcmJpdEFuZ2xlOiBNYXRoLlBJICogMS41LFxuICAgICAgaW50ZWdyaXR5OiA5OC40LFxuICAgICAgY29sbGlzaW9uc0NvdW50OiAwLFxuICAgICAgbGFzdEhpdFRpbWU6IDBcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiAncHJvYy1jc3JzcycsXG4gICAgICBuYW1lOiAnY3Nyc3MuZXhlIFtXaW4zMiBTdWJzeXN0ZW1dJyxcbiAgICAgIHR5cGU6ICdzeXN0ZW0nLFxuICAgICAgcGlkOiA1NDAsXG4gICAgICByYWRpdXM6IDAuNyxcbiAgICAgIGNvbG9yOiAweDhiNWNmNixcbiAgICAgIGVtaXNzaXZlOiAweDViMjFiNixcbiAgICAgIHBvc2l0aW9uOiBuZXcgVEhSRUUuVmVjdG9yMygtMi44LCAtMS44LCAtMy4yKSxcbiAgICAgIGJhc2VPcmJpdFJhZGl1czogNC42LFxuICAgICAgb3JiaXRTcGVlZDogLTAuMDExLFxuICAgICAgb3JiaXRBbmdsZTogTWF0aC5QSSAqIDAuMyxcbiAgICAgIGludGVncml0eTogMTAwLFxuICAgICAgY29sbGlzaW9uc0NvdW50OiAwLFxuICAgICAgbGFzdEhpdFRpbWU6IDBcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiAncHJvYy1kcml2ZXInLFxuICAgICAgbmFtZTogJ2R4Z2tybmwuc3lzIFtXRERNIDNEIERyaXZlcl0nLFxuICAgICAgdHlwZTogJ2RyaXZlcicsXG4gICAgICBwaWQ6IDQsXG4gICAgICByYWRpdXM6IDAuOCxcbiAgICAgIGNvbG9yOiAweGY1OWUwYixcbiAgICAgIGVtaXNzaXZlOiAweDkyNDAwZSxcbiAgICAgIHBvc2l0aW9uOiBuZXcgVEhSRUUuVmVjdG9yMygzLjUsIC0yLjIsIC0yLjUpLFxuICAgICAgYmFzZU9yYml0UmFkaXVzOiA0LjgsXG4gICAgICBvcmJpdFNwZWVkOiAwLjAwOSxcbiAgICAgIG9yYml0QW5nbGU6IE1hdGguUEkgKiAxLjEsXG4gICAgICBpbnRlZ3JpdHk6IDk2LjUsXG4gICAgICBjb2xsaXNpb25zQ291bnQ6IDAsXG4gICAgICBsYXN0SGl0VGltZTogMFxuICAgIH1cbiAgXSk7XG5cbiAgY29uc3QgW3Byb2Nlc3Nlc1N0YXRlLCBzZXRQcm9jZXNzZXNTdGF0ZV0gPSB1c2VTdGF0ZTxQcm9jZXNzTm9kZVtdPihwcm9jZXNzZXNSZWYuY3VycmVudCk7XG5cbiAgLy8gUmVmZXJlbmNlcyB0byAzRCBzY2VuZSBvYmplY3RzXG4gIGNvbnN0IHNjZW5lT2JqZWN0c1JlZiA9IHVzZVJlZjx7XG4gICAgc2NlbmU/OiBUSFJFRS5TY2VuZTtcbiAgICBjYW1lcmE/OiBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYTtcbiAgICByZW5kZXJlcj86IFRIUkVFLldlYkdMUmVuZGVyZXI7XG4gICAgdGVzbGFDb2lsR3JvdXA/OiBUSFJFRS5Hcm91cDtcbiAgICB0ZXNsYVRvcm9pZE1lc2g/OiBUSFJFRS5NZXNoO1xuICAgIGxpZ2h0bmluZ0xpbmVzPzogVEhSRUUuTGluZVNlZ21lbnRzO1xuICAgIGltcGFjdFJpbmdzOiB7IG1lc2g6IFRIUkVFLk1lc2g7IGxpZmU6IG51bWJlcjsgbWF4TGlmZTogbnVtYmVyIH1bXTtcbiAgfT4oeyBpbXBhY3RSaW5nczogW10gfSk7XG5cbiAgLy8gTWFpbiAzRCBXZWJHTCBTZXR1cDogVGVzbGEgQ29pbCwgUGxhc21hIFBhcnRpY2xlcyAmIFBoeXNpY2FsIENvbGxpc2lvbnNcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBjb250YWluZXIgPSBtb3VudFJlZi5jdXJyZW50O1xuICAgIGlmICghY29udGFpbmVyKSByZXR1cm47XG5cbiAgICBjb25zdCB3aWR0aCA9IGNvbnRhaW5lci5jbGllbnRXaWR0aCB8fCA2MDA7XG4gICAgY29uc3QgaGVpZ2h0ID0gY29udGFpbmVyLmNsaWVudEhlaWdodCB8fCA0NTA7XG5cbiAgICAvLyAxLiBTQ0VORVxuICAgIGNvbnN0IHNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG4gICAgc2NlbmUuZm9nID0gbmV3IFRIUkVFLkZvZ0V4cDIoMHgwMjA2MTcsIDAuMDIyKTtcblxuICAgIC8vIDIuIENBTUVSQVxuICAgIGNvbnN0IGNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg1MCwgd2lkdGggLyBoZWlnaHQsIDAuMSwgMTAwMCk7XG4gICAgY2FtZXJhLnBvc2l0aW9uLnNldCgwLCA0LjgsIDEyLjUpO1xuICAgIGNhbWVyYS5sb29rQXQoMCwgMCwgMCk7XG5cbiAgICAvLyAzLiBSRU5ERVJFUlxuICAgIGNvbnN0IHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoe1xuICAgICAgYW50aWFsaWFzOiB0cnVlLFxuICAgICAgYWxwaGE6IHRydWUsXG4gICAgICBwb3dlclByZWZlcmVuY2U6ICdoaWdoLXBlcmZvcm1hbmNlJ1xuICAgIH0pO1xuICAgIHJlbmRlcmVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgcmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyhNYXRoLm1pbih3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbywgMikpO1xuICAgIHJlbmRlcmVyLm91dHB1dENvbG9yU3BhY2UgPSBUSFJFRS5TUkdCQ29sb3JTcGFjZTtcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuXG4gICAgLy8gNC4gTElHSFRJTkcgUklHXG4gICAgY29uc3QgYW1iaWVudExpZ2h0ID0gbmV3IFRIUkVFLkFtYmllbnRMaWdodCgweDM4YmRmOCwgMC44NSk7XG4gICAgc2NlbmUuYWRkKGFtYmllbnRMaWdodCk7XG5cbiAgICBjb25zdCBwb2ludExpZ2h0V2hpdGUgPSBuZXcgVEhSRUUuUG9pbnRMaWdodCgweGZmZmZmZiwgNSwgMzApO1xuICAgIHBvaW50TGlnaHRXaGl0ZS5wb3NpdGlvbi5zZXQoMCwgMi41LCAwKTtcbiAgICBzY2VuZS5hZGQocG9pbnRMaWdodFdoaXRlKTtcblxuICAgIGNvbnN0IHBvaW50TGlnaHRDeWFuID0gbmV3IFRIUkVFLlBvaW50TGlnaHQoMHgwMGYwZmYsIDMuNSwgMzUpO1xuICAgIHBvaW50TGlnaHRDeWFuLnBvc2l0aW9uLnNldCg1LCA2LCA1KTtcbiAgICBzY2VuZS5hZGQocG9pbnRMaWdodEN5YW4pO1xuXG4gICAgY29uc3QgcG9pbnRMaWdodFZpb2xldCA9IG5ldyBUSFJFRS5Qb2ludExpZ2h0KDB4YTg1NWY3LCA0LjAsIDM1KTtcbiAgICBwb2ludExpZ2h0VmlvbGV0LnBvc2l0aW9uLnNldCgtNSwgLTYsIC01KTtcbiAgICBzY2VuZS5hZGQocG9pbnRMaWdodFZpb2xldCk7XG5cbiAgICAvLyA1LiAzRCBURVNMQSBDT0lMIEFQUEFSQVRVUyAoQ2V3a2EgVGVzbGkpIElOIFRIRSBDRU5URVJcbiAgICBjb25zdCB0ZXNsYUdyb3VwID0gbmV3IFRIUkVFLkdyb3VwKCk7XG4gICAgc2NlbmUuYWRkKHRlc2xhR3JvdXApO1xuXG4gICAgLy8gQS4gVGl0YW5pdW0gSGVhdnkgUGVkZXN0YWwgQmFzZVxuICAgIGNvbnN0IGJhc2VHZW8gPSBuZXcgVEhSRUUuQ3lsaW5kZXJHZW9tZXRyeSgxLjQsIDEuNiwgMC4zNSwgMzIpO1xuICAgIGNvbnN0IGJhc2VNYXQgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoe1xuICAgICAgY29sb3I6IDB4MzM0MTU1LFxuICAgICAgbWV0YWxuZXNzOiAwLjksXG4gICAgICByb3VnaG5lc3M6IDAuMjUsXG4gICAgICB3aXJlZnJhbWU6IHdpcmVmcmFtZU1vZGVcbiAgICB9KTtcbiAgICBjb25zdCBiYXNlTWVzaCA9IG5ldyBUSFJFRS5NZXNoKGJhc2VHZW8sIGJhc2VNYXQpO1xuICAgIGJhc2VNZXNoLnBvc2l0aW9uLnkgPSAtMi4yO1xuICAgIHRlc2xhR3JvdXAuYWRkKGJhc2VNZXNoKTtcblxuICAgIC8vIEIuIFByaW1hcnkgQ29pbCBXaW5kaW5nIChUaGljayBDb3BwZXIgb3V0ZXIgY29uaWNhbCB0dXJucylcbiAgICBjb25zdCBwcmltR2VvID0gbmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkoMS4yNSwgMS40NSwgMC43LCAzMiwgMSwgdHJ1ZSk7XG4gICAgY29uc3QgcHJpbU1hdCA9IG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7XG4gICAgICBjb2xvcjogMHhiNDUzMDksXG4gICAgICBlbWlzc2l2ZTogMHg3ODM1MGYsXG4gICAgICBlbWlzc2l2ZUludGVuc2l0eTogMC44LFxuICAgICAgbWV0YWxuZXNzOiAwLjk1LFxuICAgICAgcm91Z2huZXNzOiAwLjIsXG4gICAgICB3aXJlZnJhbWU6IHRydWVcbiAgICB9KTtcbiAgICBjb25zdCBwcmltTWVzaCA9IG5ldyBUSFJFRS5NZXNoKHByaW1HZW8sIHByaW1NYXQpO1xuICAgIHByaW1NZXNoLnBvc2l0aW9uLnkgPSAtMS43NTtcbiAgICB0ZXNsYUdyb3VwLmFkZChwcmltTWVzaCk7XG5cbiAgICAvLyBDLiBTZWNvbmRhcnkgQ29pbCBQaWxsYXIgKFRhbGwgdGlnaHRseSB3b3VuZCBjb3BwZXIgaGVsaXggY3lsaW5kZXIpXG4gICAgY29uc3Qgc2VjR2VvID0gbmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkoMC41NSwgMC41NSwgMy4yLCAzMik7XG4gICAgY29uc3Qgc2VjTWF0ID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcbiAgICAgIGNvbG9yOiAweGQ5NzcwNixcbiAgICAgIGVtaXNzaXZlOiAweDkyNDAwZSxcbiAgICAgIGVtaXNzaXZlSW50ZW5zaXR5OiAwLjksXG4gICAgICBtZXRhbG5lc3M6IDAuOSxcbiAgICAgIHJvdWdobmVzczogMC4xNSxcbiAgICAgIHdpcmVmcmFtZTogd2lyZWZyYW1lTW9kZVxuICAgIH0pO1xuICAgIGNvbnN0IHNlY01lc2ggPSBuZXcgVEhSRUUuTWVzaChzZWNHZW8sIHNlY01hdCk7XG4gICAgc2VjTWVzaC5wb3NpdGlvbi55ID0gMC4xO1xuICAgIHRlc2xhR3JvdXAuYWRkKHNlY01lc2gpO1xuXG4gICAgLy8gRC4gVG9wIFRvcm9pZCBEaXNjaGFyZ2UgVGVybWluYWwgKFBvbGlzaGVkIENocm9tZSAvIFRpdGFuaXVtIFRvcnVzIEVsZWN0cm9kZSlcbiAgICBjb25zdCB0b3JvaWRHZW8gPSBuZXcgVEhSRUUuVG9ydXNHZW9tZXRyeSgxLjIsIDAuMzgsIDI0LCA2NCk7XG4gICAgY29uc3QgdG9yb2lkTWF0ID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcbiAgICAgIGNvbG9yOiAweGY4ZmFmYyxcbiAgICAgIGVtaXNzaXZlOiAweDM4YmRmOCxcbiAgICAgIGVtaXNzaXZlSW50ZW5zaXR5OiAwLjk1LFxuICAgICAgbWV0YWxuZXNzOiAwLjk4LFxuICAgICAgcm91Z2huZXNzOiAwLjEsXG4gICAgICB3aXJlZnJhbWU6IHdpcmVmcmFtZU1vZGVcbiAgICB9KTtcbiAgICBjb25zdCB0b3JvaWRNZXNoID0gbmV3IFRIUkVFLk1lc2godG9yb2lkR2VvLCB0b3JvaWRNYXQpO1xuICAgIHRvcm9pZE1lc2gucm90YXRpb24ueCA9IE1hdGguUEkgLyAyO1xuICAgIHRvcm9pZE1lc2gucG9zaXRpb24ueSA9IDEuODtcbiAgICB0ZXNsYUdyb3VwLmFkZCh0b3JvaWRNZXNoKTtcblxuICAgIC8vIEUuIEdsb3dpbmcgSGlnaC1Wb2x0YWdlIFNwYXJrIE5vZGUgYXQgdG9wIHRpcFxuICAgIGNvbnN0IHRpcEdlbyA9IG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeSgwLjI4LCAxNiwgMTYpO1xuICAgIGNvbnN0IHRpcE1hdCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IGNvbG9yOiAweGZmZmZmZiB9KTtcbiAgICBjb25zdCB0aXBNZXNoID0gbmV3IFRIUkVFLk1lc2godGlwR2VvLCB0aXBNYXQpO1xuICAgIHRpcE1lc2gucG9zaXRpb24ueSA9IDEuOTtcbiAgICB0ZXNsYUdyb3VwLmFkZCh0aXBNZXNoKTtcblxuICAgIC8vIEYuIFRlc2xhIERpc2NoYXJnZSBMaWdodG5pbmcgQXJjcyAoRHluYW1pYyBCcmFuY2hpbmcgTGluZVNlZ21lbnRzKVxuICAgIGNvbnN0IG1heExpZ2h0bmluZ1NlZ21lbnRzID0gODA7XG4gICAgY29uc3QgbGlnaHRuaW5nUG9zaXRpb25zID0gbmV3IEZsb2F0MzJBcnJheShtYXhMaWdodG5pbmdTZWdtZW50cyAqIDYpO1xuICAgIGNvbnN0IGxpZ2h0bmluZ0NvbG9ycyA9IG5ldyBGbG9hdDMyQXJyYXkobWF4TGlnaHRuaW5nU2VnbWVudHMgKiA2KTtcblxuICAgIGNvbnN0IGxpZ2h0bmluZ0dlb20gPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKTtcbiAgICBsaWdodG5pbmdHZW9tLnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKGxpZ2h0bmluZ1Bvc2l0aW9ucywgMykpO1xuICAgIGxpZ2h0bmluZ0dlb20uc2V0QXR0cmlidXRlKCdjb2xvcicsIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobGlnaHRuaW5nQ29sb3JzLCAzKSk7XG5cbiAgICBjb25zdCBsaWdodG5pbmdNYXQgPSBuZXcgVEhSRUUuTGluZUJhc2ljTWF0ZXJpYWwoe1xuICAgICAgdmVydGV4Q29sb3JzOiB0cnVlLFxuICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICBvcGFjaXR5OiAwLjk1LFxuICAgICAgYmxlbmRpbmc6IFRIUkVFLkFkZGl0aXZlQmxlbmRpbmcsXG4gICAgICBsaW5ld2lkdGg6IDJcbiAgICB9KTtcblxuICAgIGNvbnN0IGxpZ2h0bmluZ0xpbmVzID0gbmV3IFRIUkVFLkxpbmVTZWdtZW50cyhsaWdodG5pbmdHZW9tLCBsaWdodG5pbmdNYXQpO1xuICAgIHNjZW5lLmFkZChsaWdodG5pbmdMaW5lcyk7XG5cbiAgICAvLyA2LiAzRCBQUk9DRVNTIE5PREVTIE9CSkVDVFMgKFN5c3RlbSBQcm9jZXNzZXMpXG4gICAgY29uc3QgcHJvY2Vzc01lc2hlc0dyb3VwID0gbmV3IFRIUkVFLkdyb3VwKCk7XG4gICAgc2NlbmUuYWRkKHByb2Nlc3NNZXNoZXNHcm91cCk7XG5cbiAgICBwcm9jZXNzZXNSZWYuY3VycmVudC5mb3JFYWNoKChwcm9jKSA9PiB7XG4gICAgICBsZXQgZ2VvbTogVEhSRUUuQnVmZmVyR2VvbWV0cnk7XG4gICAgICBpZiAocHJvYy50eXBlID09PSAnaG9zdGlsZScpIHtcbiAgICAgICAgZ2VvbSA9IG5ldyBUSFJFRS5PY3RhaGVkcm9uR2VvbWV0cnkocHJvYy5yYWRpdXMsIDApO1xuICAgICAgfSBlbHNlIGlmIChwcm9jLnR5cGUgPT09ICdzeXN0ZW0nKSB7XG4gICAgICAgIGdlb20gPSBuZXcgVEhSRUUuRG9kZWNhaGVkcm9uR2VvbWV0cnkocHJvYy5yYWRpdXMsIDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ2VvbSA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeShwcm9jLnJhZGl1cyAqIDEuNCwgcHJvYy5yYWRpdXMgKiAxLjQsIHByb2MucmFkaXVzICogMS40KTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbWF0ID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcbiAgICAgICAgY29sb3I6IHByb2MuY29sb3IsXG4gICAgICAgIGVtaXNzaXZlOiBwcm9jLmVtaXNzaXZlLFxuICAgICAgICBlbWlzc2l2ZUludGVuc2l0eTogMC45LFxuICAgICAgICByb3VnaG5lc3M6IDAuMyxcbiAgICAgICAgbWV0YWxuZXNzOiAwLjcsXG4gICAgICAgIHdpcmVmcmFtZTogd2lyZWZyYW1lTW9kZVxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IG1lc2ggPSBuZXcgVEhSRUUuTWVzaChnZW9tLCBtYXQpO1xuICAgICAgbWVzaC5wb3NpdGlvbi5jb3B5KHByb2MucG9zaXRpb24pO1xuICAgICAgcHJvY2Vzc01lc2hlc0dyb3VwLmFkZChtZXNoKTtcbiAgICAgIHByb2MubWVzaCA9IG1lc2g7XG5cbiAgICAgIC8vIEZvcmNlZmllbGQgYXVyYVxuICAgICAgY29uc3QgZ2xvd0dlb20gPSBuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkocHJvYy5yYWRpdXMgKiAxLjI1LCAxNiwgMTYpO1xuICAgICAgY29uc3QgZ2xvd01hdCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gICAgICAgIGNvbG9yOiBwcm9jLmNvbG9yLFxuICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgICAgb3BhY2l0eTogMC4yNSxcbiAgICAgICAgd2lyZWZyYW1lOiB0cnVlXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGdsb3dNZXNoID0gbmV3IFRIUkVFLk1lc2goZ2xvd0dlb20sIGdsb3dNYXQpO1xuICAgICAgbWVzaC5hZGQoZ2xvd01lc2gpO1xuICAgICAgcHJvYy5nbG93TWVzaCA9IGdsb3dNZXNoO1xuICAgIH0pO1xuXG4gICAgLy8gNy4gUEhZU0lDQUwgUExBU01BIFBBUlRJQ0xFU1xuICAgIGNvbnN0IGNvdW50ID0gcGFydGljbGVDb3VudDtcbiAgICBjb25zdCBwYXJ0aWNsZVBvc2l0aW9ucyA9IG5ldyBGbG9hdDMyQXJyYXkoY291bnQgKiAzKTtcbiAgICBjb25zdCBwYXJ0aWNsZUNvbG9ycyA9IG5ldyBGbG9hdDMyQXJyYXkoY291bnQgKiAzKTtcbiAgICBjb25zdCBwYXJ0aWNsZVZlbG9jaXRpZXM6IFRIUkVFLlZlY3RvcjNbXSA9IFtdO1xuICAgIGNvbnN0IHBhcnRpY2xlTGlmZXNwYW5zOiBudW1iZXJbXSA9IFtdO1xuICAgIGNvbnN0IHBhcnRpY2xlT3JpZ2luYWxSYWRpaTogbnVtYmVyW10gPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgY29uc3QgYW5nbGUgPSBNYXRoLnJhbmRvbSgpICogTWF0aC5QSSAqIDI7XG4gICAgICBjb25zdCBlbGV2ID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogTWF0aC5QSTtcbiAgICAgIGNvbnN0IGRpc3QgPSAxLjkgKyBNYXRoLnJhbmRvbSgpICogNC4yO1xuXG4gICAgICBjb25zdCBweCA9IGRpc3QgKiBNYXRoLmNvcyhlbGV2KSAqIE1hdGguY29zKGFuZ2xlKTtcbiAgICAgIGNvbnN0IHB5ID0gZGlzdCAqIE1hdGguc2luKGVsZXYpO1xuICAgICAgY29uc3QgcHogPSBkaXN0ICogTWF0aC5jb3MoZWxldikgKiBNYXRoLnNpbihhbmdsZSk7XG5cbiAgICAgIHBhcnRpY2xlUG9zaXRpb25zW2kgKiAzXSA9IHB4O1xuICAgICAgcGFydGljbGVQb3NpdGlvbnNbaSAqIDMgKyAxXSA9IHB5O1xuICAgICAgcGFydGljbGVQb3NpdGlvbnNbaSAqIDMgKyAyXSA9IHB6O1xuXG4gICAgICBjb25zdCBzcGVlZCA9IDAuMDQgKyBNYXRoLnJhbmRvbSgpICogMC4wNTtcbiAgICAgIGNvbnN0IHZ4ID0gLU1hdGguc2luKGFuZ2xlKSAqIHNwZWVkICsgKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMC4wMjtcbiAgICAgIGNvbnN0IHZ5ID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMC4wMztcbiAgICAgIGNvbnN0IHZ6ID0gTWF0aC5jb3MoYW5nbGUpICogc3BlZWQgKyAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAwLjAyO1xuXG4gICAgICBwYXJ0aWNsZVZlbG9jaXRpZXMucHVzaChuZXcgVEhSRUUuVmVjdG9yMyh2eCwgdnksIHZ6KSk7XG4gICAgICBwYXJ0aWNsZUxpZmVzcGFucy5wdXNoKE1hdGgucmFuZG9tKCkgKiAxMDApO1xuICAgICAgcGFydGljbGVPcmlnaW5hbFJhZGlpLnB1c2goZGlzdCk7XG5cbiAgICAgIC8vIFdoaXRlLCBDeWFuLCBWaW9sZXQgcGFsZXR0ZVxuICAgICAgY29uc3Qgc2VlZCA9IE1hdGgucmFuZG9tKCk7XG4gICAgICBpZiAoc2VlZCA8IDAuMzUpIHtcbiAgICAgICAgcGFydGljbGVDb2xvcnNbaSAqIDNdID0gMS4wOyBwYXJ0aWNsZUNvbG9yc1tpICogMyArIDFdID0gMS4wOyBwYXJ0aWNsZUNvbG9yc1tpICogMyArIDJdID0gMS4wO1xuICAgICAgfSBlbHNlIGlmIChzZWVkIDwgMC43MCkge1xuICAgICAgICBwYXJ0aWNsZUNvbG9yc1tpICogM10gPSAwLjIyOyBwYXJ0aWNsZUNvbG9yc1tpICogMyArIDFdID0gMC43NDsgcGFydGljbGVDb2xvcnNbaSAqIDMgKyAyXSA9IDAuOTc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJ0aWNsZUNvbG9yc1tpICogM10gPSAwLjY2OyBwYXJ0aWNsZUNvbG9yc1tpICogMyArIDFdID0gMC4zMzsgcGFydGljbGVDb2xvcnNbaSAqIDMgKyAyXSA9IDAuOTc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcGFydGljbGVHZW9tID0gbmV3IFRIUkVFLkJ1ZmZlckdlb21ldHJ5KCk7XG4gICAgcGFydGljbGVHZW9tLnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKHBhcnRpY2xlUG9zaXRpb25zLCAzKSk7XG4gICAgcGFydGljbGVHZW9tLnNldEF0dHJpYnV0ZSgnY29sb3InLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKHBhcnRpY2xlQ29sb3JzLCAzKSk7XG5cbiAgICBjb25zdCBwYXJ0aWNsZU1hdCA9IG5ldyBUSFJFRS5Qb2ludHNNYXRlcmlhbCh7XG4gICAgICBzaXplOiAwLjE2LFxuICAgICAgdmVydGV4Q29sb3JzOiB0cnVlLFxuICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICBvcGFjaXR5OiAwLjksXG4gICAgICBibGVuZGluZzogVEhSRUUuQWRkaXRpdmVCbGVuZGluZ1xuICAgIH0pO1xuXG4gICAgY29uc3QgcGFydGljbGVzUG9pbnRzID0gbmV3IFRIUkVFLlBvaW50cyhwYXJ0aWNsZUdlb20sIHBhcnRpY2xlTWF0KTtcbiAgICBzY2VuZS5hZGQocGFydGljbGVzUG9pbnRzKTtcblxuICAgIC8vIDguIElNUEFDVCBTSE9DS1dBVkVTIFBPT0xcbiAgICBjb25zdCBpbXBhY3RSaW5nczogeyBtZXNoOiBUSFJFRS5NZXNoOyBsaWZlOiBudW1iZXI7IG1heExpZmU6IG51bWJlciB9W10gPSBbXTtcbiAgICBjb25zdCBpbXBhY3RSaW5nR2VvbSA9IG5ldyBUSFJFRS5SaW5nR2VvbWV0cnkoMC4xLCAwLjE4LCAyNCk7XG4gICAgY29uc3QgY3JlYXRlSW1wYWN0U2hvY2t3YXZlID0gKHBvc2l0aW9uOiBUSFJFRS5WZWN0b3IzLCBjb2xvcjogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBpbXBhY3RNYXQgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICAgICAgICBjb2xvcixcbiAgICAgICAgc2lkZTogVEhSRUUuRG91YmxlU2lkZSxcbiAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICAgIG9wYWNpdHk6IDAuOTVcbiAgICAgIH0pO1xuICAgICAgY29uc3QgcmluZ01lc2ggPSBuZXcgVEhSRUUuTWVzaChpbXBhY3RSaW5nR2VvbSwgaW1wYWN0TWF0KTtcbiAgICAgIHJpbmdNZXNoLnBvc2l0aW9uLmNvcHkocG9zaXRpb24pO1xuICAgICAgcmluZ01lc2gubG9va0F0KGNhbWVyYS5wb3NpdGlvbik7XG4gICAgICBzY2VuZS5hZGQocmluZ01lc2gpO1xuICAgICAgaW1wYWN0UmluZ3MucHVzaCh7IG1lc2g6IHJpbmdNZXNoLCBsaWZlOiAwLCBtYXhMaWZlOiAyMCB9KTtcbiAgICB9O1xuXG4gICAgc2NlbmVPYmplY3RzUmVmLmN1cnJlbnQgPSB7XG4gICAgICBzY2VuZSxcbiAgICAgIGNhbWVyYSxcbiAgICAgIHJlbmRlcmVyLFxuICAgICAgdGVzbGFDb2lsR3JvdXA6IHRlc2xhR3JvdXAsXG4gICAgICB0ZXNsYVRvcm9pZE1lc2g6IHRvcm9pZE1lc2gsXG4gICAgICBsaWdodG5pbmdMaW5lcyxcbiAgICAgIGltcGFjdFJpbmdzXG4gICAgfTtcblxuICAgIC8vIDkuIEFOSU1BVElPTiBMT09QIFdJVEggVEVTTEEgRElTQ0hBUkdFICYgQ09MTElTSU9OIFBIWVNJQ1NcbiAgICBsZXQgYW5pbWF0aW9uRnJhbWVJZDogbnVtYmVyO1xuICAgIGxldCBjbG9jayA9IG5ldyBUSFJFRS5DbG9jaygpO1xuICAgIGxldCBmcmFtZUNvdW50ID0gMDtcbiAgICBsZXQgbGFzdEZwc1VwZGF0ZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgIGxldCBjb2xsaXNpb25zSW5TZWNvbmQgPSAwO1xuICAgIGxldCBsYXN0Q29sbGlzaW9uU2VjVGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXG4gICAgY29uc3QgcFBvcyA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG4gICAgY29uc3QgaGl0Tm9ybWFsID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbiAgICBjb25zdCB0b3JvaWRUb3BQb3MgPSBuZXcgVEhSRUUuVmVjdG9yMygwLCAxLjgsIDApO1xuXG4gICAgY29uc3QgYW5pbWF0ZSA9ICgpID0+IHtcbiAgICAgIGFuaW1hdGlvbkZyYW1lSWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XG5cbiAgICAgIGNvbnN0IGRlbHRhID0gY2xvY2suZ2V0RGVsdGEoKTtcbiAgICAgIGNvbnN0IGVsYXBzZWQgPSBjbG9jay5nZXRFbGFwc2VkVGltZSgpO1xuICAgICAgY29uc3QgbXVsdCA9IHJvdGF0aW9uU3BlZWQgPT09ICdmYXN0JyA/IDIuMiA6IHJvdGF0aW9uU3BlZWQgPT09ICdzbG93JyA/IDAuNDUgOiAxLjA7XG5cbiAgICAgIC8vIEEuIFNwaW4gVGVzbGEgQ29pbCBUb3JvaWQgJiBIaWdoLVZvbHRhZ2UgZ2xvd1xuICAgICAgaWYgKHRvcm9pZE1lc2gpIHtcbiAgICAgICAgdG9yb2lkTWVzaC5yb3RhdGlvbi56ICs9IDAuMDIgKiBtdWx0O1xuICAgICAgICBjb25zdCB0b3JvaWRQdWxzZSA9IDAuOCArIE1hdGguc2luKGVsYXBzZWQgKiA4KSAqIDAuMztcbiAgICAgICAgKHRvcm9pZE1lc2gubWF0ZXJpYWwgYXMgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwpLmVtaXNzaXZlSW50ZW5zaXR5ID0gdG9yb2lkUHVsc2U7XG4gICAgICB9XG5cbiAgICAgIC8vIEIuIEFuaW1hdGUgUHJvY2VzcyAzRCBPYmplY3RzIGluIE9yYml0YWwgUGF0aHNcbiAgICAgIHByb2Nlc3Nlc1JlZi5jdXJyZW50LmZvckVhY2goKHByb2MpID0+IHtcbiAgICAgICAgcHJvYy5vcmJpdEFuZ2xlICs9IHByb2Mub3JiaXRTcGVlZCAqIG11bHQ7XG4gICAgICAgIGNvbnN0IHIgPSBwcm9jLmJhc2VPcmJpdFJhZGl1cztcbiAgICAgICAgY29uc3QgcHggPSByICogTWF0aC5jb3MocHJvYy5vcmJpdEFuZ2xlKTtcbiAgICAgICAgY29uc3QgcHogPSByICogTWF0aC5zaW4ocHJvYy5vcmJpdEFuZ2xlKSAqIDAuODU7XG4gICAgICAgIGNvbnN0IHB5ID0gTWF0aC5zaW4oZWxhcHNlZCAqIDEuNSArIHByb2Mub3JiaXRBbmdsZSAqIDIpICogMC44O1xuXG4gICAgICAgIHByb2MucG9zaXRpb24uc2V0KHB4LCBweSwgcHopO1xuXG4gICAgICAgIGlmIChwcm9jLm1lc2gpIHtcbiAgICAgICAgICBwcm9jLm1lc2gucG9zaXRpb24uY29weShwcm9jLnBvc2l0aW9uKTtcbiAgICAgICAgICBwcm9jLm1lc2gucm90YXRpb24ueSArPSAwLjAyICogbXVsdDtcbiAgICAgICAgICBwcm9jLm1lc2gucm90YXRpb24ueCArPSAwLjAxICogbXVsdDtcblxuICAgICAgICAgIGNvbnN0IHRpbWVTaW5jZUhpdCA9IHBlcmZvcm1hbmNlLm5vdygpIC0gcHJvYy5sYXN0SGl0VGltZTtcbiAgICAgICAgICBpZiAodGltZVNpbmNlSGl0IDwgMzAwKSB7XG4gICAgICAgICAgICBjb25zdCBoaXRGYWN0b3IgPSAxIC0gdGltZVNpbmNlSGl0IC8gMzAwO1xuICAgICAgICAgICAgKHByb2MubWVzaC5tYXRlcmlhbCBhcyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCkuZW1pc3NpdmVJbnRlbnNpdHkgPSAxLjAgKyBoaXRGYWN0b3IgKiAyLjU7XG4gICAgICAgICAgICBpZiAocHJvYy5nbG93TWVzaCkge1xuICAgICAgICAgICAgICBjb25zdCBzY2FsZSA9IDEuMjUgKyBoaXRGYWN0b3IgKiAwLjM1O1xuICAgICAgICAgICAgICBwcm9jLmdsb3dNZXNoLnNjYWxlLnNldChzY2FsZSwgc2NhbGUsIHNjYWxlKTtcbiAgICAgICAgICAgICAgKHByb2MuZ2xvd01lc2gubWF0ZXJpYWwgYXMgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwpLm9wYWNpdHkgPSAwLjMgKyBoaXRGYWN0b3IgKiAwLjU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIChwcm9jLm1lc2gubWF0ZXJpYWwgYXMgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwpLmVtaXNzaXZlSW50ZW5zaXR5ID0gMC44O1xuICAgICAgICAgICAgaWYgKHByb2MuZ2xvd01lc2gpIHtcbiAgICAgICAgICAgICAgcHJvYy5nbG93TWVzaC5zY2FsZS5zZXQoMS4yNSwgMS4yNSwgMS4yNSk7XG4gICAgICAgICAgICAgIChwcm9jLmdsb3dNZXNoLm1hdGVyaWFsIGFzIFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKS5vcGFjaXR5ID0gMC4yNTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBDLiBURVNMQSBDT0lMIEVMRUNUUklDIExJR0hUTklORyBESVNDSEFSR0UgQVJDU1xuICAgICAgaWYgKHRlc2xhQ29pbEFjdGl2ZSAmJiBsaWdodG5pbmdMaW5lcykge1xuICAgICAgICBjb25zdCBsUG9zQXR0ciA9IGxpZ2h0bmluZ0dlb20uZ2V0QXR0cmlidXRlKCdwb3NpdGlvbicpIGFzIFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcbiAgICAgICAgY29uc3QgbENvbEF0dHIgPSBsaWdodG5pbmdHZW9tLmdldEF0dHJpYnV0ZSgnY29sb3InKSBhcyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG4gICAgICAgIGNvbnN0IGxQb3NBcnIgPSBsUG9zQXR0ci5hcnJheSBhcyBGbG9hdDMyQXJyYXk7XG4gICAgICAgIGNvbnN0IGxDb2xBcnIgPSBsQ29sQXR0ci5hcnJheSBhcyBGbG9hdDMyQXJyYXk7XG5cbiAgICAgICAgLy8gVGFyZ2V0OiBob3N0aWxlIHByb2Nlc3Mgb3IgcmFuZG9tIHByb2Nlc3NcbiAgICAgICAgY29uc3QgdGFyZ2V0UHJvYyA9IHByb2Nlc3Nlc1JlZi5jdXJyZW50LmZpbmQocCA9PiBwLmlkID09PSBzZWxlY3RlZFByb2Nlc3NJZCkgfHwgcHJvY2Vzc2VzUmVmLmN1cnJlbnRbMF07XG4gICAgICAgIGNvbnN0IHRhcmdldFBvaW50ID0gdGFyZ2V0UHJvYy5wb3NpdGlvbjtcblxuICAgICAgICAvLyBHZW5lcmF0ZSBqYWdnZWQgZWxlY3RyaWMgYXJjcyBmcm9tIHRvcm9pZCB0b3AgdG8gdGFyZ2V0IGFuZCBzdXJyb3VuZGluZ3NcbiAgICAgICAgbGV0IGFyY0luZGV4ID0gMDtcbiAgICAgICAgY29uc3QgYWN0aXZlQXJjcyA9IHRlc2xhRGlzY2hhcmdlTW9kZSA9PT0gJ292ZXJkcml2ZScgPyA2IDogdGVzbGFEaXNjaGFyZ2VNb2RlID09PSAncHVsc2UnID8gMiA6IDQ7XG5cbiAgICAgICAgZm9yIChsZXQgYSA9IDA7IGEgPCBhY3RpdmVBcmNzOyBhKyspIHtcbiAgICAgICAgICBsZXQgY3VyclggPSB0b3JvaWRUb3BQb3MueCArIChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDAuNDtcbiAgICAgICAgICBsZXQgY3VyclkgPSB0b3JvaWRUb3BQb3MueSArIDAuMTtcbiAgICAgICAgICBsZXQgY3VyclogPSB0b3JvaWRUb3BQb3MueiArIChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDAuNDtcblxuICAgICAgICAgIGNvbnN0IHN0ZXBzID0gNjtcbiAgICAgICAgICBmb3IgKGxldCBzID0gMDsgcyA8IHN0ZXBzOyBzKyspIHtcbiAgICAgICAgICAgIGlmIChhcmNJbmRleCA+PSBtYXhMaWdodG5pbmdTZWdtZW50cykgYnJlYWs7XG5cbiAgICAgICAgICAgIGNvbnN0IHQgPSAocyArIDEpIC8gc3RlcHM7XG4gICAgICAgICAgICBjb25zdCBkZXN0WCA9IFRIUkVFLk1hdGhVdGlscy5sZXJwKHRvcm9pZFRvcFBvcy54LCB0YXJnZXRQb2ludC54LCB0KSArIChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDAuNjtcbiAgICAgICAgICAgIGNvbnN0IGRlc3RZID0gVEhSRUUuTWF0aFV0aWxzLmxlcnAodG9yb2lkVG9wUG9zLnksIHRhcmdldFBvaW50LnksIHQpICsgKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMC42O1xuICAgICAgICAgICAgY29uc3QgZGVzdFogPSBUSFJFRS5NYXRoVXRpbHMubGVycCh0b3JvaWRUb3BQb3MueiwgdGFyZ2V0UG9pbnQueiwgdCkgKyAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAwLjY7XG5cbiAgICAgICAgICAgIC8vIExpbmUgc2VnbWVudDogc3RhcnQgLT4gZW5kXG4gICAgICAgICAgICBjb25zdCBiYXNlSWR4ID0gYXJjSW5kZXggKiA2O1xuICAgICAgICAgICAgbFBvc0FycltiYXNlSWR4XSA9IGN1cnJYO1xuICAgICAgICAgICAgbFBvc0FycltiYXNlSWR4ICsgMV0gPSBjdXJyWTtcbiAgICAgICAgICAgIGxQb3NBcnJbYmFzZUlkeCArIDJdID0gY3Vyclo7XG5cbiAgICAgICAgICAgIGxQb3NBcnJbYmFzZUlkeCArIDNdID0gZGVzdFg7XG4gICAgICAgICAgICBsUG9zQXJyW2Jhc2VJZHggKyA0XSA9IGRlc3RZO1xuICAgICAgICAgICAgbFBvc0FycltiYXNlSWR4ICsgNV0gPSBkZXN0WjtcblxuICAgICAgICAgICAgLy8gRWxlY3RyaWMgY29sb3I6IFdoaXRlLCBDeWFuLCBWaW9sZXRcbiAgICAgICAgICAgIGNvbnN0IGlzV2hpdGUgPSBNYXRoLnJhbmRvbSgpIDwgMC40O1xuICAgICAgICAgICAgbENvbEFycltiYXNlSWR4XSA9IGlzV2hpdGUgPyAxLjAgOiAwLjIyO1xuICAgICAgICAgICAgbENvbEFycltiYXNlSWR4ICsgMV0gPSBpc1doaXRlID8gMS4wIDogMC43NDtcbiAgICAgICAgICAgIGxDb2xBcnJbYmFzZUlkeCArIDJdID0gMS4wO1xuXG4gICAgICAgICAgICBsQ29sQXJyW2Jhc2VJZHggKyAzXSA9IGlzV2hpdGUgPyAxLjAgOiAwLjY2O1xuICAgICAgICAgICAgbENvbEFycltiYXNlSWR4ICsgNF0gPSBpc1doaXRlID8gMS4wIDogMC4zMztcbiAgICAgICAgICAgIGxDb2xBcnJbYmFzZUlkeCArIDVdID0gMS4wO1xuXG4gICAgICAgICAgICBjdXJyWCA9IGRlc3RYO1xuICAgICAgICAgICAgY3VyclkgPSBkZXN0WTtcbiAgICAgICAgICAgIGN1cnJaID0gZGVzdFo7XG4gICAgICAgICAgICBhcmNJbmRleCsrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENsZWFyIHJlbWFpbmluZyBzZWdtZW50c1xuICAgICAgICBmb3IgKGxldCByZW0gPSBhcmNJbmRleCAqIDY7IHJlbSA8IGxQb3NBcnIubGVuZ3RoOyByZW0rKykge1xuICAgICAgICAgIGxQb3NBcnJbcmVtXSA9IDA7XG4gICAgICAgICAgbENvbEFycltyZW1dID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxQb3NBdHRyLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgbENvbEF0dHIubmVlZHNVcGRhdGUgPSB0cnVlO1xuICAgICAgICBsaWdodG5pbmdMaW5lcy52aXNpYmxlID0gdHJ1ZTtcblxuICAgICAgICAvLyBBdWRpbyBkaXNjaGFyZ2UgY3JhY2tsZVxuICAgICAgICBpZiAoTWF0aC5yYW5kb20oKSA8IDAuMTIgJiYgcGxheVNvdW5kUmVmLmN1cnJlbnQudGVzbGFBcmMpIHtcbiAgICAgICAgICBwbGF5U291bmRSZWYuY3VycmVudC50ZXNsYUFyYygpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGxpZ2h0bmluZ0xpbmVzKSB7XG4gICAgICAgIGxpZ2h0bmluZ0xpbmVzLnZpc2libGUgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLy8gRC4gUEhZU0lDQUwgUExBU01BIFBBUlRJQ0xFUyBDT0xMSVNJT04gU0lNVUxBVElPTlxuICAgICAgY29uc3QgcG9zQXR0ciA9IHBhcnRpY2xlR2VvbS5nZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJykgYXMgVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuICAgICAgY29uc3QgY29sQXR0ciA9IHBhcnRpY2xlR2VvbS5nZXRBdHRyaWJ1dGUoJ2NvbG9yJykgYXMgVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuICAgICAgY29uc3QgcG9zaXRpb25zQXJyID0gcG9zQXR0ci5hcnJheSBhcyBGbG9hdDMyQXJyYXk7XG4gICAgICBjb25zdCBjb2xvcnNBcnIgPSBjb2xBdHRyLmFycmF5IGFzIEZsb2F0MzJBcnJheTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgIGxldCBweCA9IHBvc2l0aW9uc0FycltpICogM107XG4gICAgICAgIGxldCBweSA9IHBvc2l0aW9uc0FycltpICogMyArIDFdO1xuICAgICAgICBsZXQgcHogPSBwb3NpdGlvbnNBcnJbaSAqIDMgKyAyXTtcbiAgICAgICAgY29uc3QgdmVsID0gcGFydGljbGVWZWxvY2l0aWVzW2ldO1xuXG4gICAgICAgIGlmIChwbGFzbWFNb2RlID09PSAndm9ydGV4Jykge1xuICAgICAgICAgIGNvbnN0IGN1ckRpc3QgPSBNYXRoLnNxcnQocHggKiBweCArIHB6ICogcHopO1xuICAgICAgICAgIGNvbnN0IHRhcmdldERpc3QgPSBwYXJ0aWNsZU9yaWdpbmFsUmFkaWlbaV07XG4gICAgICAgICAgY29uc3QgZGlzdERpZmYgPSB0YXJnZXREaXN0IC0gY3VyRGlzdDtcbiAgICAgICAgICB2ZWwueCArPSAoLXB6IC8gKGN1ckRpc3QgKyAwLjEpKSAqIDAuMDAyICogbXVsdDtcbiAgICAgICAgICB2ZWwueiArPSAocHggLyAoY3VyRGlzdCArIDAuMSkpICogMC4wMDIgKiBtdWx0O1xuICAgICAgICAgIHZlbC54ICs9IChweCAvIChjdXJEaXN0ICsgMC4xKSkgKiBkaXN0RGlmZiAqIDAuMDAxO1xuICAgICAgICAgIHZlbC56ICs9IChweiAvIChjdXJEaXN0ICsgMC4xKSkgKiBkaXN0RGlmZiAqIDAuMDAxO1xuICAgICAgICAgIHZlbC55ICs9IC1weSAqIDAuMDAyO1xuICAgICAgICB9IGVsc2UgaWYgKHBsYXNtYU1vZGUgPT09ICdjeWNsb3Ryb24nKSB7XG4gICAgICAgICAgdmVsLnggKz0gLXB5ICogMC4wMTUgKiBtdWx0O1xuICAgICAgICAgIHZlbC55ICs9IHB4ICogMC4wMTUgKiBtdWx0O1xuICAgICAgICB9IGVsc2UgaWYgKHBsYXNtYU1vZGUgPT09ICdzdG9ybScpIHtcbiAgICAgICAgICB2ZWwueCArPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAwLjAxNTtcbiAgICAgICAgICB2ZWwueSArPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAwLjAxNTtcbiAgICAgICAgICB2ZWwueiArPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAwLjAxNTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB4ICs9IHZlbC54O1xuICAgICAgICBweSArPSB2ZWwueTtcbiAgICAgICAgcHogKz0gdmVsLno7XG5cbiAgICAgICAgcFBvcy5zZXQocHgsIHB5LCBweik7XG5cbiAgICAgICAgLy8gUGh5c2ljYWwgQ29sbGlzaW9ucyB3aXRoIFByb2Nlc3MgTm9kZXNcbiAgICAgICAgZm9yIChsZXQgcElkeCA9IDA7IHBJZHggPCBwcm9jZXNzZXNSZWYuY3VycmVudC5sZW5ndGg7IHBJZHgrKykge1xuICAgICAgICAgIGNvbnN0IHByb2MgPSBwcm9jZXNzZXNSZWYuY3VycmVudFtwSWR4XTtcbiAgICAgICAgICBjb25zdCBjb2xsaXNpb25SYWRpdXMgPSBwcm9jLnJhZGl1cyAqIDEuMTU7XG4gICAgICAgICAgY29uc3QgZGlzdFNxID0gcFBvcy5kaXN0YW5jZVRvU3F1YXJlZChwcm9jLnBvc2l0aW9uKTtcblxuICAgICAgICAgIGlmIChkaXN0U3EgPCBjb2xsaXNpb25SYWRpdXMgKiBjb2xsaXNpb25SYWRpdXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpc3QgPSBNYXRoLnNxcnQoZGlzdFNxKTtcbiAgICAgICAgICAgIGlmIChkaXN0ID4gMC4wMDEpIHtcbiAgICAgICAgICAgICAgaGl0Tm9ybWFsLnN1YlZlY3RvcnMocFBvcywgcHJvYy5wb3NpdGlvbikubm9ybWFsaXplKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBoaXROb3JtYWwuc2V0KDAsIDEsIDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBkb3QgPSB2ZWwuZG90KGhpdE5vcm1hbCk7XG4gICAgICAgICAgICBpZiAoZG90IDwgMCkge1xuICAgICAgICAgICAgICB2ZWwuc3ViKGhpdE5vcm1hbC5jbG9uZSgpLm11bHRpcGx5U2NhbGFyKCgxICsgZWxhc3RpY2l0eSkgKiBkb3QpKTtcbiAgICAgICAgICAgICAgdmVsLnggKz0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMC4wMjtcbiAgICAgICAgICAgICAgdmVsLnkgKz0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMC4wMjtcbiAgICAgICAgICAgICAgdmVsLnogKz0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMC4wMjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcFBvcy5jb3B5KHByb2MucG9zaXRpb24pLmFkZChoaXROb3JtYWwubXVsdGlwbHlTY2FsYXIoY29sbGlzaW9uUmFkaXVzICsgMC4wNSkpO1xuICAgICAgICAgICAgcHggPSBwUG9zLng7XG4gICAgICAgICAgICBweSA9IHBQb3MueTtcbiAgICAgICAgICAgIHB6ID0gcFBvcy56O1xuXG4gICAgICAgICAgICBjb2xvcnNBcnJbaSAqIDNdID0gMS4wO1xuICAgICAgICAgICAgY29sb3JzQXJyW2kgKiAzICsgMV0gPSAwLjk7XG4gICAgICAgICAgICBjb2xvcnNBcnJbaSAqIDMgKyAyXSA9IDAuMztcblxuICAgICAgICAgICAgcHJvYy5jb2xsaXNpb25zQ291bnQgKz0gMTtcbiAgICAgICAgICAgIHByb2MubGFzdEhpdFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgICAgICAgIGNvbGxpc2lvbnNJblNlY29uZCsrO1xuICAgICAgICAgICAgc2V0VG90YWxDb2xsaXNpb25zKChwcmV2KSA9PiBwcmV2ICsgMSk7XG5cbiAgICAgICAgICAgIGlmIChwcm9jLnR5cGUgPT09ICdob3N0aWxlJykge1xuICAgICAgICAgICAgICBwcm9jLmludGVncml0eSA9IE1hdGgubWF4KDAsICsocHJvYy5pbnRlZ3JpdHkgLSAwLjA0KS50b0ZpeGVkKDEpKTtcbiAgICAgICAgICAgICAgaWYgKHByb2MuaW50ZWdyaXR5ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcHJvYy5pbnRlZ3JpdHkgPSAxMDA7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPCAwLjI1KSB7XG4gICAgICAgICAgICAgIGNyZWF0ZUltcGFjdFNob2Nrd2F2ZShwUG9zLCBwcm9jLmNvbG9yKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHBsYXlTb3VuZFJlZi5jdXJyZW50LmNvbGxpc2lvbikge1xuICAgICAgICAgICAgICBwbGF5U291bmRSZWYuY3VycmVudC5jb2xsaXNpb24ocHJvYy50eXBlID09PSAnaG9zdGlsZScgPyAxLjQgOiAwLjkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZWNvbmRhcnkgQ29sbGlzaW9uOiBUZXNsYSBCYXNlICYgU2Vjb25kYXJ5IENvaWwgQ29sdW1uXG4gICAgICAgIGlmIChNYXRoLmFicyhweCkgPCAwLjkgJiYgTWF0aC5hYnMocHopIDwgMC45ICYmIHB5ID4gLTIuMiAmJiBweSA8IDIuMikge1xuICAgICAgICAgIHZlbC54ID0gLXZlbC54ICogZWxhc3RpY2l0eTtcbiAgICAgICAgICB2ZWwueiA9IC12ZWwueiAqIGVsYXN0aWNpdHk7XG4gICAgICAgICAgcHggKz0gdmVsLnggKiAwLjE7XG4gICAgICAgICAgcHogKz0gdmVsLnogKiAwLjE7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb3JlRGlzdFNxID0gcHggKiBweCArIHB5ICogcHkgKyBweiAqIHB6O1xuICAgICAgICBpZiAoY29yZURpc3RTcSA+IDUwKSB7XG4gICAgICAgICAgcHggPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAzO1xuICAgICAgICAgIHB5ID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMztcbiAgICAgICAgICBweiA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDM7XG4gICAgICAgICAgdmVsLnNldCgoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAwLjA0LCAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAwLjA0LCAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAwLjA0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbG9yc0FycltpICogM10gPSBUSFJFRS5NYXRoVXRpbHMubGVycChjb2xvcnNBcnJbaSAqIDNdLCAwLjIyLCAwLjAyKTtcbiAgICAgICAgY29sb3JzQXJyW2kgKiAzICsgMV0gPSBUSFJFRS5NYXRoVXRpbHMubGVycChjb2xvcnNBcnJbaSAqIDMgKyAxXSwgMC43NCwgMC4wMik7XG4gICAgICAgIGNvbG9yc0FycltpICogMyArIDJdID0gVEhSRUUuTWF0aFV0aWxzLmxlcnAoY29sb3JzQXJyW2kgKiAzICsgMl0sIDAuOTcsIDAuMDIpO1xuXG4gICAgICAgIHBvc2l0aW9uc0FycltpICogM10gPSBweDtcbiAgICAgICAgcG9zaXRpb25zQXJyW2kgKiAzICsgMV0gPSBweTtcbiAgICAgICAgcG9zaXRpb25zQXJyW2kgKiAzICsgMl0gPSBwejtcbiAgICAgIH1cblxuICAgICAgcG9zQXR0ci5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gICAgICBjb2xBdHRyLm5lZWRzVXBkYXRlID0gdHJ1ZTtcblxuICAgICAgLy8gRS4gVXBkYXRlIEltcGFjdCBTaG9ja3dhdmVzXG4gICAgICBmb3IgKGxldCBzSWR4ID0gaW1wYWN0UmluZ3MubGVuZ3RoIC0gMTsgc0lkeCA+PSAwOyBzSWR4LS0pIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IGltcGFjdFJpbmdzW3NJZHhdO1xuICAgICAgICBpdGVtLmxpZmUrKztcbiAgICAgICAgY29uc3QgcHJvZ3Jlc3MgPSBpdGVtLmxpZmUgLyBpdGVtLm1heExpZmU7XG4gICAgICAgIGNvbnN0IHNjYWxlID0gMS4wICsgcHJvZ3Jlc3MgKiAyLjg7XG4gICAgICAgIGl0ZW0ubWVzaC5zY2FsZS5zZXQoc2NhbGUsIHNjYWxlLCBzY2FsZSk7XG4gICAgICAgIChpdGVtLm1lc2gubWF0ZXJpYWwgYXMgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwpLm9wYWNpdHkgPSAwLjk1ICogKDEgLSBwcm9ncmVzcyk7XG5cbiAgICAgICAgaWYgKGl0ZW0ubGlmZSA+PSBpdGVtLm1heExpZmUpIHtcbiAgICAgICAgICBzY2VuZS5yZW1vdmUoaXRlbS5tZXNoKTtcbiAgICAgICAgICBpdGVtLm1lc2guZ2VvbWV0cnkuZGlzcG9zZSgpO1xuICAgICAgICAgIChpdGVtLm1lc2gubWF0ZXJpYWwgYXMgVEhSRUUuTWF0ZXJpYWwpLmRpc3Bvc2UoKTtcbiAgICAgICAgICBpbXBhY3RSaW5ncy5zcGxpY2Uoc0lkeCwgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEpO1xuXG4gICAgICBmcmFtZUNvdW50Kys7XG4gICAgICBjb25zdCBub3cgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgIGlmIChub3cgLSBsYXN0RnBzVXBkYXRlID49IDEwMDApIHtcbiAgICAgICAgc2V0RnBzKE1hdGgucm91bmQoKGZyYW1lQ291bnQgKiAxMDAwKSAvIChub3cgLSBsYXN0RnBzVXBkYXRlKSkpO1xuICAgICAgICBmcmFtZUNvdW50ID0gMDtcbiAgICAgICAgbGFzdEZwc1VwZGF0ZSA9IG5vdztcbiAgICAgIH1cblxuICAgICAgaWYgKG5vdyAtIGxhc3RDb2xsaXNpb25TZWNUaW1lID49IDEwMDApIHtcbiAgICAgICAgc2V0Q29sbGlzaW9uc1BlclNlYyhjb2xsaXNpb25zSW5TZWNvbmQpO1xuICAgICAgICBjb2xsaXNpb25zSW5TZWNvbmQgPSAwO1xuICAgICAgICBsYXN0Q29sbGlzaW9uU2VjVGltZSA9IG5vdztcbiAgICAgICAgc2V0UHJvY2Vzc2VzU3RhdGUoWy4uLnByb2Nlc3Nlc1JlZi5jdXJyZW50XSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGFuaW1hdGUoKTtcblxuICAgIGNvbnN0IGhhbmRsZVJlc2l6ZSA9ICgpID0+IHtcbiAgICAgIGlmICghY29udGFpbmVyIHx8ICFyZW5kZXJlciB8fCAhY2FtZXJhKSByZXR1cm47XG4gICAgICBjb25zdCBuZXdXaWR0aCA9IGNvbnRhaW5lci5jbGllbnRXaWR0aDtcbiAgICAgIGNvbnN0IG5ld0hlaWdodCA9IGNvbnRhaW5lci5jbGllbnRIZWlnaHQ7XG4gICAgICBjYW1lcmEuYXNwZWN0ID0gbmV3V2lkdGggLyBuZXdIZWlnaHQ7XG4gICAgICBjYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICAgICAgcmVuZGVyZXIuc2V0U2l6ZShuZXdXaWR0aCwgbmV3SGVpZ2h0KTtcbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZVJlc2l6ZSk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZVJlc2l6ZSk7XG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShhbmltYXRpb25GcmFtZUlkKTtcblxuICAgICAgYmFzZUdlby5kaXNwb3NlKCk7XG4gICAgICBiYXNlTWF0LmRpc3Bvc2UoKTtcbiAgICAgIHByaW1HZW8uZGlzcG9zZSgpO1xuICAgICAgcHJpbU1hdC5kaXNwb3NlKCk7XG4gICAgICBzZWNHZW8uZGlzcG9zZSgpO1xuICAgICAgc2VjTWF0LmRpc3Bvc2UoKTtcbiAgICAgIHRvcm9pZEdlby5kaXNwb3NlKCk7XG4gICAgICB0b3JvaWRNYXQuZGlzcG9zZSgpO1xuICAgICAgdGlwR2VvLmRpc3Bvc2UoKTtcbiAgICAgIHRpcE1hdC5kaXNwb3NlKCk7XG4gICAgICBsaWdodG5pbmdHZW9tLmRpc3Bvc2UoKTtcbiAgICAgIGxpZ2h0bmluZ01hdC5kaXNwb3NlKCk7XG5cbiAgICAgIHByb2Nlc3NNZXNoZXNHcm91cC5jaGlsZHJlbi5mb3JFYWNoKChjKSA9PiB7XG4gICAgICAgIGNvbnN0IG0gPSBjIGFzIFRIUkVFLk1lc2g7XG4gICAgICAgIGlmIChtLmdlb21ldHJ5KSBtLmdlb21ldHJ5LmRpc3Bvc2UoKTtcbiAgICAgICAgaWYgKG0ubWF0ZXJpYWwpIChtLm1hdGVyaWFsIGFzIFRIUkVFLk1hdGVyaWFsKS5kaXNwb3NlKCk7XG4gICAgICB9KTtcbiAgICAgIHBhcnRpY2xlR2VvbS5kaXNwb3NlKCk7XG4gICAgICBwYXJ0aWNsZU1hdC5kaXNwb3NlKCk7XG4gICAgICBpbXBhY3RSaW5ncy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIHNjZW5lLnJlbW92ZShpdGVtLm1lc2gpO1xuICAgICAgICBpdGVtLm1lc2guZ2VvbWV0cnkuZGlzcG9zZSgpO1xuICAgICAgICAoaXRlbS5tZXNoLm1hdGVyaWFsIGFzIFRIUkVFLk1hdGVyaWFsKS5kaXNwb3NlKCk7XG4gICAgICB9KTtcbiAgICAgIHJlbmRlcmVyLmRpc3Bvc2UoKTtcbiAgICAgIGlmIChjb250YWluZXIpIHtcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgfVxuICAgIH07XG4gIH0sIFt3aXJlZnJhbWVNb2RlLCByb3RhdGlvblNwZWVkLCBwbGFzbWFNb2RlLCBwYXJ0aWNsZUNvdW50LCBlbGFzdGljaXR5LCB0ZXNsYUNvaWxBY3RpdmUsIHRlc2xhRGlzY2hhcmdlTW9kZV0pO1xuXG4gIC8vIEFjdGlvbjogS2luZXRpYyBUZXNsYSBEaXNjaGFyZ2UgQmFycmFnZVxuICBjb25zdCBmaXJlUGxhc21hRGlzY2hhcmdlQXRUYXJnZXQgPSAoKSA9PiB7XG4gICAgc2V0Q29yZVN0YXR1cygnVEVTTEFfRElTQ0hBUkdFJyk7XG4gICAgY29uc3QgdGFyZ2V0ID0gcHJvY2Vzc2VzUmVmLmN1cnJlbnQuZmluZCgocCkgPT4gcC5pZCA9PT0gc2VsZWN0ZWRQcm9jZXNzSWQpO1xuXG4gICAgaWYgKHRhcmdldCAmJiBzY2VuZU9iamVjdHNSZWYuY3VycmVudC5zY2VuZSkge1xuICAgICAgaWYgKHBsYXlTb3VuZFJlZi5jdXJyZW50LnRlc2xhQXJjKSB7XG4gICAgICAgIHBsYXlTb3VuZFJlZi5jdXJyZW50LnRlc2xhQXJjKCk7XG4gICAgICB9XG4gICAgICB0YXJnZXQuY29sbGlzaW9uc0NvdW50ICs9IDQ4O1xuICAgICAgdGFyZ2V0Lmxhc3RIaXRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICBpZiAodGFyZ2V0LnR5cGUgPT09ICdob3N0aWxlJykge1xuICAgICAgICB0YXJnZXQuaW50ZWdyaXR5ID0gTWF0aC5tYXgoMCwgKyh0YXJnZXQuaW50ZWdyaXR5IC0gMTgpLnRvRml4ZWQoMSkpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdzZW50aW5lbDpwbGFzbWEtc2hvY2t3YXZlJywge1xuICAgICAgICAgICAgZGV0YWlsOiB7IHg6IHdpbmRvdy5pbm5lcldpZHRoIC8gMiwgeTogd2luZG93LmlubmVySGVpZ2h0ICogMC40IH1cbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc2V0Q29yZVN0YXR1cygnT1BUSU1BTCcpO1xuICAgICAgc2V0UHJvY2Vzc2VzU3RhdGUoWy4uLnByb2Nlc3Nlc1JlZi5jdXJyZW50XSk7XG4gICAgfSwgNzAwKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtgc3BhY2UteS00ICR7Y2xhc3NOYW1lfWB9PlxuICAgICAgey8qIDNEIFdlYkdMIENhbnZhcyB3aXRoIEdsYXNzICYgVGl0YW5pdW0gU2hlbGwgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIHJvdW5kZWQtM3hsIGJnLXNsYXRlLTk1MC85MCBib3JkZXItMiBib3JkZXItY3lhbi01MDAvNTAgc2hhZG93LTJ4bCBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgey8qIENhbnZhcyAqL31cbiAgICAgICAgPGRpdiByZWY9e21vdW50UmVmfSBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1bNDcwcHhdIGN1cnNvci1ncmFiIGFjdGl2ZTpjdXJzb3ItZ3JhYmJpbmcgcmVsYXRpdmUgei0xMFwiIC8+XG5cbiAgICAgICAgey8qIFRvcC1MZWZ0IFRlbGVtZXRyeSBHbGFzcyBIVUQgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTQgbGVmdC00IHotMjAgZmxleCBmbGV4LWNvbCBnYXAtMiBwb2ludGVyLWV2ZW50cy1ub25lXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicC0yLjUgcm91bmRlZC0yeGwgYmctY3lhbi05NTAvODUgYm9yZGVyIGJvcmRlci1jeWFuLTQwMCB0ZXh0LWN5YW4tMzAwIHNoYWRvdy14bCBiYWNrZHJvcC1ibHVyLW1kXCI+XG4gICAgICAgICAgICAgIDxaYXAgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LWFtYmVyLTMwMCBhbmltYXRlLXB1bHNlXCIgLz5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdsYXNzLXBvbGlzaGVkIHAtMyByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLWN5YW4tNDAwLzgwIHNoYWRvdy0yeGwgcG9pbnRlci1ldmVudHMtYXV0b1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ibGFjayB0ZXh0LXdoaXRlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+Q2V3a2EgVGVzbGkgM0QgJiBSZWFrdG9yIEtvbGl6eWpueTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gcHgtMiBweS0wLjUgcm91bmRlZC1mdWxsIGJnLWVtZXJhbGQtOTUwIHRleHQtZW1lcmFsZC0zMDAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTUwMC84MCBzaGFkb3dcIj5cbiAgICAgICAgICAgICAgICAgIHtmcHN9IEZQU1xuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gcHgtMiBweS0wLjUgcm91bmRlZC1mdWxsIGJnLWN5YW4tOTUwIHRleHQtY3lhbi0zMDAgYm9yZGVyIGJvcmRlci1jeWFuLTUwMC84MCBzaGFkb3dcIj5cbiAgICAgICAgICAgICAgICAgIHtjb2xsaXNpb25zUGVyU2VjfSB6ZGVyemXFhC9zXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC1zbGF0ZS0zMDAgbXQtMSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxzcGFuPk5hcGnEmWNpZSBDZXdraTogPGIgY2xhc3NOYW1lPVwidGV4dC1hbWJlci0zMDBcIj57dGVzbGFWb2x0YWdlS1Z9IGtWPC9iPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3Bhbj7igKI8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4+xYF1a2k6IDxiIGNsYXNzTmFtZT17dGVzbGFDb2lsQWN0aXZlID8gJ3RleHQtY3lhbi0zMDAnIDogJ3RleHQtc2xhdGUtNTAwJ30+e3Rlc2xhQ29pbEFjdGl2ZSA/ICdBS1RZV05FJyA6ICdXWcWBJ308L2I+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuPuKAojwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5TdGFuOiA8YiBjbGFzc05hbWU9e2NvcmVTdGF0dXMgPT09ICdURVNMQV9ESVNDSEFSR0UnID8gJ3RleHQtYW1iZXItNDAwIGZvbnQtYm9sZCcgOiAndGV4dC1lbWVyYWxkLTMwMCd9Pntjb3JlU3RhdHVzfTwvYj48L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBUb3AtUmlnaHQgTWlsaXRhcnkgREVGQ09OICYgVGFyZ2V0IEhVRCAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtNCByaWdodC00IHotMjAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcG9pbnRlci1ldmVudHMtYXV0b1wiPlxuICAgICAgICAgIHsvKiBNaWxpdGFyeSBIYXphcmQgU3RlbmNpbCBCYWRnZSAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhpZGRlbiBzbTpmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBweC0zIHB5LTEuNSByb3VuZGVkLXhsIGJnLXNsYXRlLTk1MC85MCBib3JkZXIgYm9yZGVyLWFtYmVyLTUwMC82MCB0ZXh0LXhzIGZvbnQtbW9ubyBmb250LWJvbGQgc2hhZG93LWxnXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTMgaC0zIHJvdW5kZWQtZnVsbCBiZy1hbWJlci00MDAgYW5pbWF0ZS1waW5nIGlubGluZS1ibG9ja1wiIC8+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWFtYmVyLTMwMFwiPkRFRkNPTi0yPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDBcIj58PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS0zMDBcIj5DRVdLQSBURVNMSTogNzUwa1Y8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogUXVpY2sgVGFyZ2V0IFBpbiAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgYmctc2xhdGUtOTUwLzkwIGJhY2tkcm9wLWJsdXItbWQgcC0xLjUgcm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci1jeWFuLTUwMC82MCBzaGFkb3cteGwgdGV4dC14cyBmb250LW1vbm9cIj5cbiAgICAgICAgICAgIHtwcm9jZXNzZXNTdGF0ZS5tYXAoKHByb2MpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgaXNTZWwgPSBzZWxlY3RlZFByb2Nlc3NJZCA9PT0gcHJvYy5pZDtcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBrZXk9e3Byb2MuaWR9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTZWxlY3RlZFByb2Nlc3NJZChwcm9jLmlkKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTIuNSBweS0xIHJvdW5kZWQteGwgZm9udC1ib2xkIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICAgIGlzU2VsXG4gICAgICAgICAgICAgICAgICAgICAgPyBwcm9jLnR5cGUgPT09ICdob3N0aWxlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyAnYnRuLWdsb3NzeS1yZWQgaXMtYWN0aXZlIHNoYWRvdy1tZCdcbiAgICAgICAgICAgICAgICAgICAgICAgIDogJ2J0bi1nbG9zc3ktY3lhbiBpcy1hY3RpdmUgc2hhZG93LW1kJ1xuICAgICAgICAgICAgICAgICAgICAgIDogJ3RleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUgYmctc2xhdGUtOTAwLzYwJ1xuICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge3Byb2MudHlwZSA9PT0gJ2hvc3RpbGUnID8gJ+KaoO+4jyBHTklEQScgOiBwcm9jLm5hbWUuc3BsaXQoJy4nKVswXX1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogQm90dG9tIENvbW1hbmQgRG9jazogVGl0YW5pdW0tU3RlZWwgU3dpdGNoZXMgJiBQb2xpc2hlZCBHbGFzcyBCdXR0b25zICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGJvdHRvbS00IGluc2V0LXgtNCB6LTIwIGZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTMgcC0zLjUgcm91bmRlZC0yeGwgdGl0YW5pdW0tc3RlZWwtcGFuZWwgc2hhZG93LTJ4bFwiPlxuICAgICAgICAgIHsvKiBMZWZ0OiBUaXRhbml1bS1TdGVlbCBNZWNoYW5pY2FsIFRvZ2dsZSBmb3IgVGVzbGEgQ29pbCAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zIGZsZXgtd3JhcFwiPlxuICAgICAgICAgICAgey8qIFRlc2xhIENvaWwgVG9nZ2xlIFN3aXRjaCAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgYmctc2xhdGUtOTUwLzgwIHB4LTMgcHktMS41IHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgc2hhZG93LWlubmVyXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtbW9ubyBmb250LWJvbGQgdGV4dC1zbGF0ZS0zMDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICA8WmFwIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtYW1iZXItMzAwXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5DRVdLQSBURVNMSTo8L3NwYW4+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cblxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgc2V0VGVzbGFDb2lsQWN0aXZlKCF0ZXNsYUNvaWxBY3RpdmUpO1xuICAgICAgICAgICAgICAgICAgaWYgKHBsYXlTb3VuZFJlZi5jdXJyZW50LnRlc2xhQXJjKSBwbGF5U291bmRSZWYuY3VycmVudC50ZXNsYUFyYygpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgc3dpdGNoLXRpdGFuaXVtIHctMTIgaC02ICR7dGVzbGFDb2lsQWN0aXZlID8gJ2JvcmRlci1jeWFuLTQwMCBiZy1jeWFuLTk1MC84MCcgOiAnYm9yZGVyLXNsYXRlLTcwMCd9YH1cbiAgICAgICAgICAgICAgICB0aXRsZT1cIlByemXFgsSFY3puaWsgdHl0YW5vd3kgemFzaWxhbmlhIENld2tpIFRlc2xpXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgc3dpdGNoLXRpdGFuaXVtLXRodW1iIHRyYW5zZm9ybSAke3Rlc2xhQ29pbEFjdGl2ZSA/ICd0cmFuc2xhdGUteC02IGJnLWN5YW4tNDAwJyA6ICd0cmFuc2xhdGUteC0wJ31gfSAvPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2B0ZXh0LVsxMHB4XSBmb250LW1vbm8gZm9udC1ib2xkICR7dGVzbGFDb2lsQWN0aXZlID8gJ3RleHQtY3lhbi0zMDAnIDogJ3RleHQtc2xhdGUtNTAwJ31gfT5cbiAgICAgICAgICAgICAgICB7dGVzbGFDb2lsQWN0aXZlID8gJzc1MCBrViBPTicgOiAnT0ZGJ31cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBQb2xpc2hlZCBHbGFzcyBNb2RlIEJ1dHRvbnMgKi99XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBsYXNtYU1vZGUoJ3ZvcnRleCcpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BidG4tZ2xhc3MtcG9saXNoZWQgcHgtMyBweS0xLjUgdGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkICR7XG4gICAgICAgICAgICAgICAgcGxhc21hTW9kZSA9PT0gJ3ZvcnRleCcgPyAnYm9yZGVyLWN5YW4tMzAwIHNoYWRvdy1jeWFuLTUwMC81MCcgOiAndGV4dC1zbGF0ZS0zMDAnXG4gICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBXaXIgR3Jhd2l0YWN5am55XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQbGFzbWFNb2RlKCdjeWNsb3Ryb24nKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYnRuLWdsYXNzLXBvbGlzaGVkIHB4LTMgcHktMS41IHRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZCAke1xuICAgICAgICAgICAgICAgIHBsYXNtYU1vZGUgPT09ICdjeWNsb3Ryb24nID8gJ2JvcmRlci1wdXJwbGUtMzAwIHNoYWRvdy1wdXJwbGUtNTAwLzUwJyA6ICd0ZXh0LXNsYXRlLTMwMCdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIFdpxIV6a2EgQ3lrbG90cm9udVxuICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGxhc21hTW9kZSgnc3Rvcm0nKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYnRuLWdsYXNzLXBvbGlzaGVkIHB4LTMgcHktMS41IHRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZCAke1xuICAgICAgICAgICAgICAgIHBsYXNtYU1vZGUgPT09ICdzdG9ybScgPyAnYm9yZGVyLWFtYmVyLTMwMCBzaGFkb3ctYW1iZXItNTAwLzUwJyA6ICd0ZXh0LXNsYXRlLTMwMCdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIEJ1cnphIFBsYXptb3dhXG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRXaXJlZnJhbWVNb2RlKCF3aXJlZnJhbWVNb2RlKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuLXRpdGFuaXVtLXN0ZWVsIHB4LTMgcHktMS41IHRleHQteHMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSByb3VuZGVkLXhsXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPExheWVycyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWN5YW4tMzAwXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+e3dpcmVmcmFtZU1vZGUgPyAnU2lhdGthIFdpcmVmcmFtZScgOiAnQnJ5xYJ5IDNEJ308L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBSaWdodDogSGlnaC1FbmVyZ3kgS2luZXRpYyBEaXNjaGFyZ2UgJiBQb2xpc2hlZCBDb250cm9scyAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGZsZXgtd3JhcFwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtmaXJlUGxhc21hRGlzY2hhcmdlQXRUYXJnZXR9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0bi1nbG9zc3kgYnRuLWdsb3NzeS1yZWQgcHgtNCBweS0yIHRleHQteHMgZm9udC1tb25vIGZvbnQtYmxhY2sgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgYW5pbWF0ZS1wdWxzZSBzaGFkb3ctbGdcIlxuICAgICAgICAgICAgICB0aXRsZT1cIld5c3RyemVsIMWCdWsgZWxla3RyeWN6bnkgQ2V3a2kgVGVzbGkgcHJvc3RvIHcgbmFtaWVyem9ueSBwcm9jZXMhXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFphcCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQteWVsbG93LTMwMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPld5xYJhZG93YW5pZSBDZXdraSBUZXNsaSB3IENlbDwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzcGVlZHM6ICgnc2xvdycgfCAnbm9ybWFsJyB8ICdmYXN0JylbXSA9IFsnc2xvdycsICdub3JtYWwnLCAnZmFzdCddO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5leHRJZHggPSAoc3BlZWRzLmluZGV4T2Yocm90YXRpb25TcGVlZCkgKyAxKSAlIHNwZWVkcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgc2V0Um90YXRpb25TcGVlZChzcGVlZHNbbmV4dElkeF0pO1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4tdGl0YW5pdW0tc3RlZWwgcHgtMyBweS0xLjUgdGV4dC14cyByb3VuZGVkLXhsIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFJvdGF0ZUN3IGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtY3lhbi0zMDBcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj5Sb3RhY2phOiB7cm90YXRpb25TcGVlZC50b1VwcGVyQ2FzZSgpfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEF1ZGlvRmVlZGJhY2soIWF1ZGlvRmVlZGJhY2spfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BidG4tZ2xhc3MtcG9saXNoZWQgcC0yIHRleHQteHMgJHthdWRpb0ZlZWRiYWNrID8gJ3RleHQtY3lhbi0zMDAnIDogJ3RleHQtc2xhdGUtNTAwJ31gfVxuICAgICAgICAgICAgICB0aXRsZT17YXVkaW9GZWVkYmFjayA/IFwiRMW6d2nEmWtpIHd5xYJhZG93YcWEIGFrdHl3bmVcIiA6IFwiRMW6d2nEmWtpIHd5Y2lzem9uZVwifVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7YXVkaW9GZWVkYmFjayA/IDxWb2x1bWUyIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPiA6IDxWb2x1bWVYIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPn1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogUHJvY2VzcyBOb2RlcyBQaHlzaWNhbCBUZWxlbWV0cnkgR3JpZCAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBsZzpncmlkLWNvbHMtMyBnYXAtNFwiPlxuICAgICAgICB7cHJvY2Vzc2VzU3RhdGUubWFwKChwcm9jKSA9PiB7XG4gICAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IHNlbGVjdGVkUHJvY2Vzc0lkID09PSBwcm9jLmlkO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGtleT17cHJvYy5pZH1cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2VsZWN0ZWRQcm9jZXNzSWQocHJvYy5pZCl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHAtNCByb3VuZGVkLTJ4bCBib3JkZXIgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgICAgICBpc1NlbGVjdGVkXG4gICAgICAgICAgICAgICAgICA/IHByb2MudHlwZSA9PT0gJ2hvc3RpbGUnXG4gICAgICAgICAgICAgICAgICAgID8gJ2JnLXJlZC05NTAvNzAgYm9yZGVyLXJlZC01MDAgc2hhZG93LTJ4bCBzaGFkb3ctcmVkLTk1MC82MCdcbiAgICAgICAgICAgICAgICAgICAgOiAnYmctY3lhbi05NTAvNzAgYm9yZGVyLWN5YW4tNDAwIHNoYWRvdy0yeGwgc2hhZG93LWN5YW4tOTUwLzYwJ1xuICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTAwLzgwIGJvcmRlci1zbGF0ZS04MDAgaG92ZXI6Ym9yZGVyLXNsYXRlLTcwMCdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgdy0zIGgtMyByb3VuZGVkLWZ1bGwgJHtwcm9jLnR5cGUgPT09ICdob3N0aWxlJyA/ICdiZy1yZWQtNTAwIGFuaW1hdGUtcGluZycgOiBwcm9jLnR5cGUgPT09ICdzeXN0ZW0nID8gJ2JnLWVtZXJhbGQtNDAwJyA6ICdiZy1hbWJlci00MDAnfWB9IC8+XG4gICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJsYWNrIGZvbnQtbW9ubyB0ZXh0LXdoaXRlXCI+e3Byb2MubmFtZX08L2g0PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC1zbGF0ZS00MDBcIj5QSUQ6IHtwcm9jLnBpZH0g4oCiIFByb21pZcWEOiB7cHJvYy5yYWRpdXN9bTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHB4LTIgcHktMC41IHJvdW5kZWQgdGV4dC1bMTBweF0gZm9udC1tb25vIGZvbnQtYm9sZCAke1xuICAgICAgICAgICAgICAgICAgcHJvYy50eXBlID09PSAnaG9zdGlsZSdcbiAgICAgICAgICAgICAgICAgICAgPyAnYmctcmVkLTk1MCB0ZXh0LXJlZC0zMDAgYm9yZGVyIGJvcmRlci1yZWQtNzAwJ1xuICAgICAgICAgICAgICAgICAgICA6ICdiZy1lbWVyYWxkLTk1MCB0ZXh0LWVtZXJhbGQtMzAwIGJvcmRlciBib3JkZXItZW1lcmFsZC03MDAnXG4gICAgICAgICAgICAgICAgfWB9PlxuICAgICAgICAgICAgICAgICAge3Byb2MudHlwZS50b1VwcGVyQ2FzZSgpfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIENvbGxpc2lvbiBNZXRyaWNzICYgU2hpZWxkIEJhciAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0zIHNwYWNlLXktMS41IHRleHQteHMgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiB0ZXh0LXNsYXRlLTMwMCB0ZXh0LVsxMXB4XVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+S29saXpqZSB6IGN6xIVzdGVjemthbWkgJiDFgnVrYW1pOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtY3lhbi0zMDAgZm9udC1ib2xkXCI+e3Byb2MuY29sbGlzaW9uc0NvdW50LnRvTG9jYWxlU3RyaW5nKCl9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiB0ZXh0LXNsYXRlLTMwMCB0ZXh0LVsxMXB4XVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+SW50ZWdyYWxub8WbxIcgT3PFgm9ueTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3Byb2MuaW50ZWdyaXR5IDwgNTAgPyAndGV4dC1yZWQtNDAwIGZvbnQtYm9sZCcgOiAndGV4dC1lbWVyYWxkLTQwMCBmb250LWJvbGQnfT5cbiAgICAgICAgICAgICAgICAgICAge3Byb2MuaW50ZWdyaXR5fSVcbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTk1MCBoLTEuNSByb3VuZGVkLWZ1bGwgb3ZlcmZsb3ctaGlkZGVuIGJvcmRlciBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGgtZnVsbCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgJHtcbiAgICAgICAgICAgICAgICAgICAgICBwcm9jLnR5cGUgPT09ICdob3N0aWxlJyA/ICdiZy1yZWQtNTAwJyA6ICdiZy1ncmFkaWVudC10by1yIGZyb20tY3lhbi01MDAgdG8tZW1lcmFsZC00MDAnXG4gICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyB3aWR0aDogYCR7cHJvYy5pbnRlZ3JpdHl9JWAgfX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIHRleHQtWzEwcHhdIHRleHQtc2xhdGUtNTAwIHB0LTFcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPlBvcmHFvGVuaWUgQ2V3a8SFIFRlc2xpOiB7dGVzbGFDb2lsQWN0aXZlID8gJ0dPVE9XRScgOiAnU1RBTkRCWSd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+UHJvbWllxYQgb3JiaXR5OiB7cHJvYy5iYXNlT3JiaXRSYWRpdXN9bTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApO1xuICAgICAgICB9KX1cblxuICAgICAgICB7LyogTWlsaXRhcnkgRGVmZW5zZSBQcm90b2NvbCBDYXJkIHdpdGggVGl0YW5pdW0gRmluaXNoICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLTJ4bCB0aXRhbml1bS1zdGVlbC1wYW5lbCBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBtYi0yXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8U2hpZWxkQ2hlY2sgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWN5YW4tMzAwXCIgLz5cbiAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJsYWNrIHRleHQtd2hpdGUgZm9udC1tb25vXCI+UFJPVE9Lw5PFgSBURVNMSTogU1RBTkFHLTc1MDwvaDQ+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTIgaC0yIHJvdW5kZWQtZnVsbCBiZy1jeWFuLTQwMCBhbmltYXRlLXBpbmdcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTMwMFwiPlxuICAgICAgICAgICAgICBXeXNva29uYXBpxJljaW93YSBjZXdrYSBUZXNsaSBnZW5lcnVqZSDFgnVraSB3ecWCYWRvd2N6ZSByb3piaWphasSFY2Ugd3JvZ2llIG5ha8WCYWRraSBHVUkgaSBwcm9jZXN5IG1hbHdhcmUgbmEgcG96aW9taWUgbWlrcm9hcmNoaXRla3R1cnkgQ1BVLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0zIHB0LTIgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTcwMC84MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTMwMFwiPklza3Jvd25pazogPGIgY2xhc3NOYW1lPVwidGV4dC1lbWVyYWxkLTQwMFwiPlpTWU5DSFJPTklaT1dBTlk8L2I+PC9zcGFuPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQYXJ0aWNsZUNvdW50KHBhcnRpY2xlQ291bnQgPT09IDI4MCA/IDQ1MCA6IDI4MCl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0bi10aXRhbml1bS1zdGVlbCBweC0yLjUgcHktMSB0ZXh0LVsxMHB4XSByb3VuZGVkLWxnXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3BhcnRpY2xlQ291bnQgPT09IDI4MCA/ICdHxJlzdG/Fm8SHIE1heCAoNDUwKScgOiAnR8SZc3RvxZvEhyBTdGFuZGFyZCAoMjgwKSd9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwibWFwcGluZ3MiOiJBQWcyQlE7QUFoMkJSLFNBQWdCLFdBQVcsUUFBUSxnQkFBZ0I7QUFDbkQsWUFBWSxXQUFXO0FBQ3ZCO0FBQUEsRUFDbUM7QUFBQSxFQUFlO0FBQUEsRUFBSztBQUFBLEVBQzlCO0FBQUEsRUFBNkI7QUFBQSxFQUFTO0FBQUEsT0FFeEQ7QUF5QkEsYUFBTSxvQkFBcUMsQ0FBQyxFQUFFLFlBQVksR0FBRyxNQUFNO0FBQ3hFLFFBQU0sV0FBVyxPQUE4QixJQUFJO0FBQ25ELFFBQU0sQ0FBQyxlQUFlLGdCQUFnQixJQUFJLFNBQWtCLEtBQUs7QUFDakUsUUFBTSxDQUFDLGVBQWUsZ0JBQWdCLElBQUksU0FBcUMsUUFBUTtBQUN2RixRQUFNLENBQUMsWUFBWSxhQUFhLElBQUksU0FBNEUsU0FBUztBQUN6SCxRQUFNLENBQUMsdUJBQXVCLHdCQUF3QixJQUFJLFNBQXdCLElBQUk7QUFDdEYsUUFBTSxDQUFDLEtBQUssTUFBTSxJQUFJLFNBQWlCLEVBQUU7QUFHekMsUUFBTSxDQUFDLGlCQUFpQixrQkFBa0IsSUFBSSxTQUFrQixJQUFJO0FBQ3BFLFFBQU0sQ0FBQyxnQkFBZ0IsaUJBQWlCLElBQUksU0FBaUIsR0FBRztBQUNoRSxRQUFNLENBQUMsb0JBQW9CLHFCQUFxQixJQUFJLFNBQStDLFlBQVk7QUFDL0csUUFBTSxDQUFDLFlBQVksYUFBYSxJQUFJLFNBQTJDLFFBQVE7QUFDdkYsUUFBTSxDQUFDLGVBQWUsZ0JBQWdCLElBQUksU0FBaUIsR0FBRztBQUM5RCxRQUFNLENBQUMsaUJBQWlCLGtCQUFrQixJQUFJLFNBQWlCLENBQUM7QUFDaEUsUUFBTSxDQUFDLGtCQUFrQixtQkFBbUIsSUFBSSxTQUFpQixDQUFDO0FBQ2xFLFFBQU0sQ0FBQyxlQUFlLGdCQUFnQixJQUFJLFNBQWtCLElBQUk7QUFDaEUsUUFBTSxDQUFDLG1CQUFtQixvQkFBb0IsSUFB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