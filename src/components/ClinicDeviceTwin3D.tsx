import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  RotateCcw,
  Download,
  Cpu,
  Zap,
  ThermometerSnowflake,
  Crosshair,
  AlertTriangle,
} from 'lucide-react';
import type { ClinicDeviceRecord, ClinicTreatmentRecord } from '../lib/clinicModels';

interface ClinicDeviceTwin3DProps {
  devices: ClinicDeviceRecord[];
  treatments: ClinicTreatmentRecord[];
}

type SubAssemblyId = 'all' | 'laser_head' | 'cooling_core' | 'power_module';

const SUB_ASSEMBLIES: {
  id: SubAssemblyId;
  label: string;
  desc: string;
  icon: React.ReactNode;
}[] = [
  {
    id: 'all',
    label: 'Cały System',
    desc: 'Pełny widok cyfrowego bliźniaka aparatury klinicznej z pierścieniem statusu i sondami LiDAR.',
    icon: <Cpu className="w-3.5 h-3.5" />,
  },
  {
    id: 'laser_head',
    label: 'Głowica Laserowa',
    desc: 'Ramię przegubowe i głowica optyczna — monitorowanie zużycia impulsów i kalibracji wiązki.',
    icon: <Crosshair className="w-3.5 h-3.5" />,
  },
  {
    id: 'cooling_core',
    label: 'Układ Chłodzenia',
    desc: 'Kriogeniczny moduł termiczny stabilizujący pracę podczas intensywnych serii zabiegów.',
    icon: <ThermometerSnowflake className="w-3.5 h-3.5" />,
  },
  {
    id: 'power_module',
    label: 'Moduł Zasilania',
    desc: 'Sekcja kondensatorów i motogodzin pracy — kontrola cyklu przeglądów technicznych.',
    icon: <Zap className="w-3.5 h-3.5" />,
  },
];

function serializeGroupToOBJ(root: THREE.Object3D, title: string): string {
  const lines: string[] = [`# Chronos Vault 3D Digital Twin — ${title}`, `o ${title.replace(/\s+/g, '_')}`];
  let vertexOffset = 1;
  root.updateMatrixWorld(true);
  const v = new THREE.Vector3();

  root.traverse((obj) => {
    if (!(obj instanceof THREE.Mesh)) return;
    const geom = obj.geometry;
    const pos = geom.getAttribute('position');
    if (!pos) return;
    lines.push(`g ${obj.name || 'part'}`);
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i).applyMatrix4(obj.matrixWorld);
      lines.push(`v ${v.x.toFixed(4)} ${v.y.toFixed(4)} ${v.z.toFixed(4)}`);
    }
    const index = geom.getIndex();
    if (index) {
      for (let i = 0; i < index.count; i += 3) {
        const a = index.getX(i) + vertexOffset;
        const b = index.getX(i + 1) + vertexOffset;
        const c = index.getX(i + 2) + vertexOffset;
        lines.push(`f ${a} ${b} ${c}`);
      }
    } else {
      for (let i = 0; i < pos.count; i += 3) {
        lines.push(`f ${vertexOffset + i} ${vertexOffset + i + 1} ${vertexOffset + i + 2}`);
      }
    }
    vertexOffset += pos.count;
  });

  return lines.join('\n');
}

function createBeveledBox(w: number, h: number, d: number, bevel = 0.04): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  const hw = w / 2;
  const hd = d / 2;
  shape.moveTo(-hw, -hd);
  shape.lineTo(hw, -hd);
  shape.lineTo(hw, hd);
  shape.lineTo(-hw, hd);
  shape.closePath();

  const geom = new THREE.ExtrudeGeometry(shape, {
    depth: h,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: bevel,
    bevelThickness: bevel,
  });
  geom.rotateX(-Math.PI / 2);
  geom.computeVertexNormals();
  return geom;
}

export const ClinicDeviceTwin3D: React.FC<ClinicDeviceTwin3DProps> = ({
  devices,
  treatments,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const deviceGroupRef = useRef<THREE.Group | null>(null);
  const camRef = useRef({
    yaw: 0.55,
    targetYaw: 0.55,
    pitch: 0.34,
    targetPitch: 0.34,
    dist: 5.8,
    targetDist: 5.8,
    dragging: false,
    lastX: 0,
    lastY: 0,
  });

  const [selectedDeviceId, setSelectedDeviceId] = useState<string>(() => devices[0]?.id || '');
  const [selectedPart, setSelectedPart] = useState<SubAssemblyId>('all');

  const activeDevice = useMemo(
    () => devices.find((d) => d.id === selectedDeviceId) || devices[0] || null,
    [devices, selectedDeviceId]
  );

  // Compute wear % and schedule collisions for active device
  const telemetry = useMemo(() => {
    if (!activeDevice) {
      return { hoursPct: 0, pulsesPct: 0, hasCollision: false, scheduledCount: 0 };
    }
    const hoursPct = Math.min(
      100,
      Math.round((activeDevice.usedHours / Math.max(1, activeDevice.maxServiceHours)) * 100)
    );
    const pulsesPct = Math.min(
      100,
      Math.round((activeDevice.usedPulses / Math.max(1, activeDevice.maxPulses)) * 100)
    );
    const devTreatments = treatments.filter(
      (t) => t.deviceId === activeDevice.id && t.status !== 'cancelled'
    );

    // Check overlapping slots on same date
    let hasCollision = false;
    for (let i = 0; i < devTreatments.length; i++) {
      for (let j = i + 1; j < devTreatments.length; j++) {
        const a = devTreatments[i];
        const b = devTreatments[j];
        if (a.scheduledDate === b.scheduledDate && a.startTime < b.endTime && b.startTime < a.endTime) {
          hasCollision = true;
        }
      }
    }

    return {
      hoursPct,
      pulsesPct,
      hasCollision,
      scheduledCount: devTreatments.length,
    };
  }, [activeDevice, treatments]);

  // Status ring color: red = collision, amber = maintenance or >=80% wear, cyan = in_use, emerald = operational
  const statusHex = useMemo(() => {
    if (telemetry.hasCollision) return 0xef4444;
    if (
      activeDevice?.status === 'maintenance' ||
      telemetry.hoursPct >= 80 ||
      telemetry.pulsesPct >= 80
    ) {
      return 0xf59e0b;
    }
    if (activeDevice?.status === 'in_use') return 0x38bdf8;
    return 0x10b981;
  }, [activeDevice, telemetry]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050914, 0.065);

    const width = Math.max(1, container.clientWidth);
    const height = Math.max(1, container.clientHeight);
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 60);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 3-point clinical holographic lighting (Platinum Monolith + Emerald LiDAR)
    scene.add(new THREE.AmbientLight(0x94a3b8, 0.65));
    const keyLight = new THREE.DirectionalLight(0xe2e8f0, 1.55);
    keyLight.position.set(4.5, 7, 4.5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.1);
    rimLight.position.set(-5, 4, -4);
    scene.add(rimLight);

    const statusPointLight = new THREE.PointLight(statusHex, 2.2, 8);
    statusPointLight.position.set(0, 1.9, 0.8);
    scene.add(statusPointLight);

    // Holographic LiDAR calibration floor grid + concentric rings
    const grid = new THREE.GridHelper(9, 18, 0x10b981, 0x1e293b);
    grid.position.y = 0;
    scene.add(grid);

    const ringGeo = new THREE.RingGeometry(1.55, 1.62, 64);
    ringGeo.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: statusHex,
      transparent: true,
      opacity: 0.55,
      side: THREE.DoubleSide,
    });
    const floorRing = new THREE.Mesh(ringGeo, ringMat);
    floorRing.position.y = 0.01;
    scene.add(floorRing);

    // Procedural 9-part Clinical Laser/Medical Device Group
    const deviceGroup = new THREE.Group();
    deviceGroupRef.current = deviceGroup;

    const platinumMat = new THREE.MeshStandardMaterial({
      color: 0xdbe4ee,
      metalness: 0.45,
      roughness: 0.28,
    });
    const darkTrimMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.65,
      roughness: 0.35,
    });
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.34,
      roughness: 0.12,
      metalness: 0.1,
    });

    const partMaterials = {
      power_module: new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        emissive: selectedPart === 'power_module' ? 0x38bdf8 : 0x0b1220,
        emissiveIntensity: selectedPart === 'power_module' ? 0.9 : 0.2,
        metalness: 0.7,
        roughness: 0.3,
      }),
      cooling_core: new THREE.MeshStandardMaterial({
        color: 0x0ea5e9,
        emissive: 0x10b981,
        emissiveIntensity: selectedPart === 'cooling_core' ? 1.5 : 0.65,
        metalness: 0.2,
        roughness: 0.15,
      }),
      laser_head: new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        emissive: selectedPart === 'laser_head' ? 0x38bdf8 : 0x000000,
        emissiveIntensity: selectedPart === 'laser_head' ? 0.85 : 0,
        metalness: 0.8,
        roughness: 0.2,
      }),
    };

    // 1. Mobile wheeled base plinth
    const basePlinth = new THREE.Mesh(createBeveledBox(1.35, 0.22, 1.55, 0.05), darkTrimMat);
    basePlinth.name = 'mobile_base_plinth';
    basePlinth.position.y = 0.18;
    deviceGroup.add(basePlinth);

    // 4 caster wheels
    [
      [-0.54, -0.62],
      [0.54, -0.62],
      [-0.54, 0.62],
      [0.54, 0.62],
    ].forEach(([wx, wz], idx) => {
      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.09, 16), darkTrimMat);
      wheel.name = `caster_wheel_${idx + 1}`;
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(wx, 0.11, wz);
      deviceGroup.add(wheel);
    });

    // 2. Power supply & capacitor lower module
    const powerBlock = new THREE.Mesh(createBeveledBox(1.05, 0.72, 1.12, 0.04), partMaterials.power_module);
    powerBlock.name = 'power_supply_module';
    powerBlock.position.set(0, 0.42, -0.05);
    deviceGroup.add(powerBlock);

    // 3. Main platinum-monolith clinical tower chassis
    const mainChassis = new THREE.Mesh(createBeveledBox(1.1, 1.45, 1.05, 0.06), platinumMat);
    mainChassis.name = 'main_clinical_chassis';
    mainChassis.position.set(0, 1.14, -0.04);
    deviceGroup.add(mainChassis);

    // 4. Translucent cryo-cooling core inside side ribs
    const coolingCore = new THREE.Mesh(
      new THREE.CylinderGeometry(0.28, 0.28, 1.05, 24),
      partMaterials.cooling_core
    );
    coolingCore.name = 'cryo_cooling_core';
    coolingCore.position.set(0, 1.68, 0.02);
    deviceGroup.add(coolingCore);

    const glassSleeve = new THREE.Mesh(
      new THREE.CylinderGeometry(0.46, 0.46, 1.15, 24, 1, true),
      glassMat
    );
    glassSleeve.name = 'cooling_glass_jacket';
    glassSleeve.position.set(0, 1.68, 0.02);
    deviceGroup.add(glassSleeve);

    // 5. Glowing holographic status halo collar
    const statusHaloMat = new THREE.MeshStandardMaterial({
      color: statusHex,
      emissive: statusHex,
      emissiveIntensity: 1.4,
      roughness: 0.2,
    });
    const statusCollar = new THREE.Mesh(new THREE.TorusGeometry(0.68, 0.042, 16, 48), statusHaloMat);
    statusCollar.name = 'telemetry_status_ring';
    statusCollar.rotation.x = Math.PI / 2;
    statusCollar.position.set(0, 2.52, -0.02);
    deviceGroup.add(statusCollar);

    // 6. Tilted front clinical touch-console screen
    const screenFrame = new THREE.Mesh(createBeveledBox(0.86, 0.07, 0.56, 0.02), darkTrimMat);
    screenFrame.name = 'touch_console_frame';
    screenFrame.position.set(0, 2.66, 0.34);
    screenFrame.rotation.x = 0.52;
    deviceGroup.add(screenFrame);

    const screenGlass = new THREE.Mesh(
      new THREE.PlaneGeometry(0.76, 0.46),
      new THREE.MeshBasicMaterial({ color: 0x0ea5e9, transparent: true, opacity: 0.82 })
    );
    screenGlass.name = 'touch_console_display';
    screenGlass.position.set(0, 2.71, 0.37);
    screenGlass.rotation.x = -Math.PI / 2 + 0.52;
    deviceGroup.add(screenGlass);

    // 7. Articulated 3-segment laser arm + optical handpiece head
    const armPivot = new THREE.Group();
    armPivot.name = 'articulated_laser_arm';
    armPivot.position.set(0.32, 2.58, -0.18);

    const seg1 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.075, 1.05, 16), partMaterials.laser_head);
    seg1.position.set(0.18, 0.48, 0.14);
    seg1.rotation.z = -0.34;
    seg1.rotation.x = 0.26;
    armPivot.add(seg1);

    const elbowJoint = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), darkTrimMat);
    elbowJoint.position.set(0.36, 0.94, 0.28);
    armPivot.add(elbowJoint);

    const seg2 = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.95, 16), partMaterials.laser_head);
    seg2.position.set(0.68, 0.72, 0.54);
    seg2.rotation.z = -0.95;
    seg2.rotation.x = 0.48;
    armPivot.add(seg2);

    const laserHead = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.055, 0.42, 20), partMaterials.laser_head);
    laserHead.name = 'optical_laser_head';
    laserHead.position.set(1.04, 0.36, 0.78);
    laserHead.rotation.x = 0.12;
    armPivot.add(laserHead);

    // Volumetric optical beam cone
    const beamMat = new THREE.MeshBasicMaterial({
      color: statusHex,
      transparent: true,
      opacity: 0.28,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const beamCone = new THREE.Mesh(new THREE.ConeGeometry(0.24, 1.25, 24, 1, true), beamMat);
    beamCone.name = 'laser_emitter_beam';
    beamCone.position.set(1.04, -0.42, 0.84);
    armPivot.add(beamCone);

    deviceGroup.add(armPivot);
    scene.add(deviceGroup);

    // Autonomous HoloArch-style LiDAR scanner probes (AG-01, AG-02)
    const probes = [0, 1].map((i) => {
      const g = new THREE.Group();
      const body = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.085, 0),
        new THREE.MeshBasicMaterial({ color: i === 0 ? 0x38bdf8 : 0x10b981 })
      );
      g.add(body);
      scene.add(g);
      return g;
    });

    let rafId = 0;
    const start = performance.now();

    const animate = (now: number) => {
      const t = (now - start) / 1000;
      camRef.current.yaw += (camRef.current.targetYaw - camRef.current.yaw) * 0.08;
      camRef.current.pitch += (camRef.current.targetPitch - camRef.current.pitch) * 0.08;
      camRef.current.dist += (camRef.current.targetDist - camRef.current.dist) * 0.08;

      const yaw = camRef.current.yaw + (reducedMotion ? 0 : t * 0.18);
      const pitch = camRef.current.pitch;
      const dist = camRef.current.dist;

      const targetY =
        selectedPart === 'laser_head'
          ? 2.65
          : selectedPart === 'cooling_core'
          ? 1.68
          : selectedPart === 'power_module'
          ? 0.75
          : 1.55;

      camera.position.set(
        Math.sin(yaw) * Math.cos(pitch) * dist,
        targetY + Math.sin(pitch) * dist,
        Math.cos(yaw) * Math.cos(pitch) * dist
      );
      camera.lookAt(0.15, targetY, 0.05);

      if (!reducedMotion) {
        beamMat.opacity = 0.18 + 0.16 * Math.abs(Math.sin(t * 3.1));
        statusHaloMat.emissiveIntensity = 1.15 + 0.45 * Math.sin(t * 2.5);
        probes.forEach((probe, idx) => {
          const a = t * (0.85 + idx * 0.35) + idx * Math.PI;
          const r = 1.95 + idx * 0.35;
          probe.position.set(Math.cos(a) * r, 1.45 + Math.sin(t * 1.8 + idx) * 0.65, Math.sin(a) * r);
          probe.rotation.y = -a;
        });
      } else {
        probes[0].position.set(1.95, 1.7, 0.4);
        probes[1].position.set(-2.1, 1.3, -0.5);
      }

      renderer.render(scene, camera);
      if (!reducedMotion) {
        rafId = requestAnimationFrame(animate);
      }
    };

    const handleResize = () => {
      const w = Math.max(1, container.clientWidth);
      const h = Math.max(1, container.clientHeight);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
    };
  }, [statusHex, selectedPart, activeDevice?.id]);

  const handleExportOBJ = () => {
    if (!deviceGroupRef.current || !activeDevice) return;
    const objText = serializeGroupToOBJ(deviceGroupRef.current, activeDevice.name);
    const blob = new Blob([objText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeDevice.name.toLowerCase().replace(/[^a-z0-9]+/gi, '-')}-twin-3d.obj`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const activePartMeta = SUB_ASSEMBLIES.find((p) => p.id === selectedPart) || SUB_ASSEMBLIES[0];

  return (
    <section className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Cyfrowy Bliźniak 3D Urządzeń Klinicznych (Three.js · Platynowy Monolit & LiDAR)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Proceduralny model 3D aparatury medycznej z pierścieniem statusu na żywo, podzespołami i eksportem CAD `.OBJ`
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {devices.length > 0 && (
            <select
              value={activeDevice?.id || ''}
              onChange={(e) => setSelectedDeviceId(e.target.value)}
              className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-2.5 py-1.5 text-xs text-slate-900 dark:text-slate-100"
              aria-label="Wybierz urządzenie do podglądu 3D"
            >
              {devices.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} {d.clinicLocation ? `(${d.clinicLocation})` : ''}
                </option>
              ))}
            </select>
          )}
          <button
            type="button"
            onClick={handleExportOBJ}
            disabled={!activeDevice}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-medium"
          >
            <Download className="w-3.5 h-3.5" />
            Eksport .OBJ
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
        {/* 3D WebGL Viewport */}
        <div className="lg:col-span-2 relative rounded-xl overflow-hidden border border-emerald-500/30 bg-[#050914] shadow-[0_0_36px_rgba(16,185,129,0.14)]">
          <div
            ref={mountRef}
            onMouseDown={(e) => {
              camRef.current.dragging = true;
              camRef.current.lastX = e.clientX;
              camRef.current.lastY = e.clientY;
            }}
            onMouseMove={(e) => {
              if (!camRef.current.dragging) return;
              const dx = e.clientX - camRef.current.lastX;
              const dy = e.clientY - camRef.current.lastY;
              camRef.current.lastX = e.clientX;
              camRef.current.lastY = e.clientY;
              camRef.current.targetYaw -= dx * 0.01;
              camRef.current.targetPitch = Math.max(0.08, Math.min(1.05, camRef.current.targetPitch + dy * 0.008));
            }}
            onMouseUp={() => { camRef.current.dragging = false; }}
            onMouseLeave={() => { camRef.current.dragging = false; }}
            onWheel={(e) => {
              camRef.current.targetDist = Math.max(3.4, Math.min(9.5, camRef.current.targetDist + e.deltaY * 0.004));
            }}
            className="w-full h-80 cursor-grab active:cursor-grabbing"
            role="img"
            aria-label="Cyfrowy bliźniak 3D urządzenia klinicznego"
          />

          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span className="rounded-full bg-slate-950/80 backdrop-blur-md border border-emerald-400/35 px-2.5 py-0.5 text-[10px] font-mono text-emerald-300">
              THREE.JS DIGITAL TWIN · PRZECIĄGNIJ BY OBRÓCIĆ
            </span>
            <button
              type="button"
              onClick={() => {
                camRef.current.targetYaw = 0.55;
                camRef.current.targetPitch = 0.34;
                camRef.current.targetDist = 5.8;
                setSelectedPart('all');
              }}
              className="pointer-events-auto p-1.5 rounded-md bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white"
              title="Resetuj kamerę 3D"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {telemetry.hasCollision && (
            <div className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-lg bg-red-950/90 border border-red-500/50 px-2.5 py-1 text-[11px] font-mono text-red-200">
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              WYKRYTO KOLIZJĘ TERMINÓW W GRAFIKU
            </div>
          )}
        </div>

        {/* Interactive HUD Telemetry & Sub-Assembly Inspector */}
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 flex flex-col justify-between space-y-3 text-slate-200">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">
                Inspektor Podzespołów 3D
              </span>
              {activeDevice && (
                <span className="text-[10px] font-mono text-slate-400">
                  {activeDevice.modelOrSerial || 'SERIA PRO'}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {SUB_ASSEMBLIES.map((part) => (
                <button
                  key={part.id}
                  type="button"
                  onClick={() => setSelectedPart(part.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-medium transition-colors ${
                    selectedPart === part.id
                      ? 'bg-emerald-500/20 border-emerald-400/60 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-sky-500/40'
                  }`}
                >
                  {part.icon}
                  <span className="truncate">{part.label}</span>
                </button>
              ))}
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">{activePartMeta.desc}</p>
          </div>

          {activeDevice ? (
            <div className="space-y-2.5 border-t border-slate-800 pt-3 text-xs">
              <div className="font-semibold text-white truncate">{activeDevice.name}</div>

              <div className="space-y-1">
                <div className="flex justify-between font-mono text-[11px]">
                  <span className="text-slate-400">Motogodziny</span>
                  <span className="text-sky-300">
                    {activeDevice.usedHours} / {activeDevice.maxServiceHours} h ({telemetry.hoursPct}%)
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full ${telemetry.hoursPct >= 80 ? 'bg-amber-400' : 'bg-sky-400'}`}
                    style={{ width: `${telemetry.hoursPct}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-mono text-[11px]">
                  <span className="text-slate-400">Impulsy głowicy</span>
                  <span className="text-emerald-300">
                    {activeDevice.usedPulses.toLocaleString('pl-PL')} / {activeDevice.maxPulses.toLocaleString('pl-PL')} ({telemetry.pulsesPct}%)
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full ${telemetry.pulsesPct >= 80 ? 'bg-amber-400' : 'bg-emerald-400'}`}
                    style={{ width: `${telemetry.pulsesPct}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-slate-400">
                <span>Następny przegląd: {activeDevice.nextServiceDate || '—'}</span>
                <span>Zabiegi: {telemetry.scheduledCount}</span>
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-500 font-mono">
              Dodaj urządzenie kliniczne, aby uruchomić telemetrię 3D.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
