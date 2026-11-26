# Dokumentacja Architektoniczna i Wdrożeniowa: Trójwymiarowe Frontendy i Złożone Wykresy 3D Animowane w Czasie Rzeczywistym w Next.js

Niniejsza dokumentacja definiuje architekturę techniczną, potok strumieniowania danych w czasie rzeczywistym, matematykę geometrii i shaderów **Three.js (WebGL2 / WebGPU)** oraz pełną adaptację platformy **Chronos Vault (Centralny Panel Sterowania AI SEO/AEO, Model Predykcyjny Online, Operacje Kliniczne i Zespołowe E2EE)** do ekosystemu **Next.js 15 (App Router)**.

Projekt wizualny bazuje na referencyjnym pulpicie spektralnym (`/assets/aistudio/-0_1f95cff2.jpg`): głębokim obsydianowym płótnie z wielowarstwowymi wstęgami powierzchniowymi 3D, przestrzennymi grafami konstelacji, wytłaczanymi pierścieniami radialnymi oraz instancjonowanym widmem kolumnowym z selektywną poświatą horyzontalną.

---

## 1. Dekompozycja Wizualna i Przestrzenna Sceny 3D

Zamiast płaskich wykresów SVG/Canvas 2D, interfejs analityczny dzieli przestrzeń na **cztery zsynchronizowane warstwy wizualizacji** łączące scenę WebGL z semantyczną warstwą DOM:

1. **Strefa I — Wielowarstwowe Wstęgi Spektralne i Trajektorie Predykcji (`3D Multi-Ribbon Spectral Surface`)**:
   - Złożone siatki powierzchniowe `THREE.BufferGeometry` z atrybutem pozycji aktualizowanym w trybie `THREE.DynamicDrawUsage`, rozpięte nad trójwymiarową siatką współrzędnych (`LineSegments` z `polygonOffset`, aby wyeliminować zjawisko *Z-fighting*).
   - Główne grzbiety serii danych (np. *Wynik SEO, Gotowość AEO, Siła Wskazująca Modelu Online*) prowadzone krzywymi gładkimi `THREE.CatmullRomCurve3` wytłaczanymi w `THREE.TubeGeometry` z pionowymi liniami rzutowania na płaszczyznę bazową oraz sferycznym węzłem ogniskowym anomalii.
2. **Strefa II — Kwartet Złożonych Mikro-Wizualizacji Przestrzennych**:
   - **Wytłaczane Wycinki Radialne 3D (`Beveled Extruded Radial Sectors`)**: Budowane z `THREE.Shape` + `THREE.ExtrudeGeometry` (`bevelEnabled: true`, zróżnicowane wysokości osi $Z$ proporcjonalne do udziału kanału *WWW / Blog / LinkedIn / Meta / X*).
   - **Toroidalne Pierścienie KPI (`3D Torus Gauges`)**: Wieloczęściowe grupy `THREE.Group` łączące łuki `TorusGeometry` o zróżnicowanej chropowatości (`roughness` różniące się o $\ge 0.25$ między pierścieniem bazowym a aktywnym łukiem).
   - **Przestrzenna Topologia Ścieżek i Konstelacji (`3D Node-Link Constellation`)**: Węzły słów kluczowych i klastrów tematycznych renderowane przez `THREE.InstancedMesh` połączone krzywymi Beziera obrazującymi ewolucję fraz w czasie.
   - **Objętościowe Klastry Orbitalne (`Volumetric Bubble Clusters`)**: Sfery z materiałem fizycznym `MeshPhysicalMaterial` (`transmission`, `clearcoat`, `ior: 1.55`) prezentujące korelację zasięgu organicznego, społecznościowego i współczynnika zaangażowania.
3. **Strefa III — Instancjonowane Widmo Kolumnowe i Fala Horyzontu (`Instanced Bar Spectrum & Horizon Wave`)**:
   - Od `256` do `2048` prostopadłościennych lub heksagonalnych kolumn renderowanych w **jednym wywołaniu rysowania GPU (`1 draw call`)** za pomocą `THREE.InstancedMesh` z buforem kolorów `InstancedBufferAttribute`.
   - Nałożone wieloseryjne trajektorie punktowo-liniowe oraz kontrolowana selektywna poświata (`UnrealBloomPass` na dedykowanej warstwie `BLOOM_LAYER = 1`) koncentrująca energię świetlną u podstawy widma.
4. **Strefa IV — Semantyczna Matryca Analityczna DOM i Zwijany Dok Sterujący (`Zero-Occlusion HUD`)**:
   - Wszystkie etykiety osi, wartości liczbowe (`font-mono tabular-nums`), filtry anomalii i nawigacja renderowane są w czystym HTML/Tailwind CSS ponad płótnem `<canvas>` (`z-10`), gwarantując ostrość typografii, dostępność czytników ekranu (WCAG AA) oraz indeksację SEO.
   - **Zakaz stosowania `backdrop-filter` (`backdrop-blur`) nad aktywnym płótnem WebGL**: nakładki HUD używają półprzezroczystych powierzchni `bg-slate-950/85 border border-slate-800`, co zapobiega kosztownemu ponownemu próbkowaniu bufora klatki GPU.

---

## 2. Architektura Aplikacji w Next.js 15 (App Router)

### 2.1. Podział Odpowiedzialności: Server Components vs. Wyspy WebGL (`'use client'`)

W Next.js 15 silnik Three.js odwołuje się bezpośrednio do API przeglądarki (`window`, `document`, `WebGL2RenderingContext`). Aby zachować błyskawiczny czas pierwszego wyrenderowania (**SSR / Streaming RSC**) oraz pełne wsparcie metadanych SEO/AEO, warstwy dzielimy następująco:

- **React Server Components (`app/**/page.tsx`, `app/layout.tsx`)**:
  - Generują nagłówki SEO, karty OpenGraph oraz bloki **Schema.org JSON-LD** (`WebApplication`, `FAQPage`).
  - Wstępnie pobierają konfigurację widoków i zagregowane migawki KPI po stronie serwera.
- **Dynamiczne Wyspy Klienta 3D (`next/dynamic` z `{ ssr: false }`)**:
  - Komponenty sceny WebGL są ładowane leniwie z wyłączonym renderowaniem serwerowym oraz natychmiastowym szkieletem zastępczym (brak czarnej pustki podczas inicjalizacji shaderów).
- **Własny Serwer Node.js + Next.js (`server.ts` na porcie `3000`)**:
  - Obsługuje żądania HTTP/RSC Next.js oraz przechwytuje zdarzenie `server.on('upgrade', ...)` dla serwera **WebSocket (`ws`)**, zapewniając strumieniowanie telemetrii o niskim opóźnieniu bez odpytywania (pollingu).

### 2.2. Struktura Katalogów Projektu Next.js

```text
chronos-vault-nextjs-3d/
├── server.ts                                  # Custom HTTP + WebSocket Server (port 3000) z Next.js handlerem
├── next.config.ts                             # Konfiguracja transpilePackages: ['three'] i nagłówków bezpieczeństwa
├── firebase-blueprint.json                    # Schemat encji Firestore (zadania, kliniki, SEO/AEO, profile)
├── firestore.rules                            # Reguły bezpieczeństwa Cloud Firestore
├── public/
│   └── assets/aistudio/-0_1f95cff2.jpg        # Referencja wizualna spektralnego pulpitu 3D
└── src/
    ├── app/
    │   ├── layout.tsx                         # Root Layout: czcionki (Plus Jakarta Sans + JetBrains Mono), JSON-LD, ThemeProvider
    │   ├── globals.css                        # Tailwind CSS v4 (@import "tailwindcss"; @custom-variant dark ...)
    │   ├── page.tsx                           # Główny Server Component ładujący Centralny Panel Sterowania i Scenę 3D
    │   ├── kalendarz/page.tsx                 # Widok Kalendarza Tygodniowego + Synchronizacja Google/Outlook
    │   ├── kliniki-urzadzenia/page.tsx        # Grafiki Urządzeń, Zużycie Sprzętu i Plan Zabiegów (z wizualizacją 3D obłożenia)
    │   ├── kanban-e2ee/page.tsx               # Tablica Kanban z szyfrowaniem Zero-Knowledge AES-256-GCM
    │   ├── audyt-bezpieczenstwa/page.tsx      # Audyt pracy AI + Konektor Antymalware OSV.dev / Webhook SAST
    │   └── api/
    │       ├── seo-control/
    │       │   ├── analyze-and-optimize/route.ts   # POST: Silnik AI SEO/AEO i optymalizacja fraz w czasie
    │       │   └── dispatch-report-email/route.ts  # POST: Wysyłka cyklicznych raportów PDF + generator MIME .eml
    │       ├── system/
    │       │   ├── control-plane/route.ts          # GET: Telemetria pętli zdarzeń, Auto-Skaler i błędy
    │       │   ├── autoscale/route.ts              # POST: Konfiguracja i symulacja piku obciążenia
    │       │   └── cloud-events/route.ts           # POST: Serwerowy silnik zdarzeń w architekturze Cloud Functions
    │       └── security/
    │           └── malware-scan/route.ts           # POST: Skaner zależności OSV.dev i analiza zagrożeń kodu
    ├── components/
    │   ├── three/
    │   │   ├── TelemetrySceneCanvas.tsx       # Kontener WebGL (<div ref={mountRef} />), cykl życia, utrata kontekstu
    │   │   ├── SpectralRibbonSurface.ts       # Wstęgi 3D BufferGeometry + TubeGeometry + Custom GLSL Shader
    │   │   ├── InstancedSpectrumBars.ts       # Widmo kolumnowe THREE.InstancedMesh (1 draw call, dynamiczne kolory)
    │   │   ├── ExtrudedRadialRings.ts         # Wytłaczane wycinki kołowe 3D i pierścienie toroidalne KPI
    │   │   ├── ConstellationTopology.ts       # Przestrzenny graf ewolucji słów kluczowych i anomalii
    │   │   └── SelectiveBloomPipeline.ts      # Post-processing: RenderPass + Selective UnrealBloomPass + FXAA
    │   ├── hud/
    │   │   ├── SemanticChartOverlay.tsx       # Warstwa etykiet DOM, tooltipy raycastingu i matryca 4-kolumnowa
    │   │   └── CollapsibleControlDock.tsx     # Zwijany dolny dok sterowania (tryb Cinema/Zen, filtry, kamera)
    │   └── modules/                           # Zaadaptowane moduły funkcjonalne platformy
    └── lib/
        ├── realtime/
        │   ├── telemetryRingBuffer.ts         # Współdzielony bufor kołowy Float32Array (Zero-GC poza stanem Reacta)
        │   └── wsStreamClient.ts              # Klient WebSocket z auto-rekonekcją i idempotentną synchronizacją delt
        ├── seoPredictiveEngine.ts             # Algorytm uczący online (regresja z wygaszaniem nieaktualnych danych)
        ├── pdf3dSnapshotExporter.ts           # Przechwytywanie klatki WebGL do raportów jsPDF + indeks pełnotekstowy
        ├── cryptoE2ee.ts                      # Web Crypto API (AES-256-GCM + PBKDF2)
        └── firebaseClient.ts                  # Inicjalizacja Firebase Auth i Cloud Firestore po stronie klienta
```

---

## 3. Potok Animacji w Czasie Rzeczywistym (Zero-GC 60–120 FPS)

Najczęstszym błędem podczas łączenia Reacta z wykresami 3D czasu rzeczywistego jest wywoływanie `useState` dla każdego pakietu danych z WebSocketa (np. 30–60 razy na sekundę), co wymusza przebudowę drzewa VDOM i dławi główny wątek.

### 3.1. Architektura Dwuścieżkowa (Fast Path vs. Semantic Path)

```text
[ Strumień WebSocket (ws) / Firestore onSnapshot / Model Predykcyjny Online ]
                                     │
         ┌───────────────────────────┴───────────────────────────┐
         ▼ (Fast Path: 60 Hz, Zero React Re-renders)             ▼ (Semantic Path: Throttled 2–4 Hz)
[ TelemetryRingBuffer (Float32Array w pamięci poza VDOM) ]   [ Lekki stan podsumowań HUD / Tabela DOM ]
         │
         ▼ (co klatkę requestAnimationFrame / afterDraw)
[ Interpolacja wykładnicza: THREE.MathUtils.damp(..., delta) ]
         │
         ├──► Aktualizacja bufora wierzchołków Wstęg 3D (position.needsUpdate = true)
         ├──► Aktualizacja macierzy i kolorów InstancedMesh (instanceMatrix.needsUpdate = true)
         └──► Aktualizacja uniformu uTime w shaderach GLSL
```

### 3.2. Implementacja Bufora Kołowego (`src/lib/realtime/telemetryRingBuffer.ts`)

```ts
export class TelemetryRingBuffer {
  readonly capacity: number;
  readonly seriesCount: number;
  readonly currentValues: Float32Array;
  readonly targetValues: Float32Array;
  private writeCursor = 0;

  constructor(seriesCount = 4, capacity = 128) {
    this.seriesCount = seriesCount;
    this.capacity = capacity;
    this.currentValues = new Float32Array(seriesCount * capacity);
    this.targetValues = new Float32Array(seriesCount * capacity);
  }

  /** Wywoływane przy odbiorze delty z WebSocket lub przeliczeniu modelu online */
  pushSample(sampleVector: number[]): void {
    const baseOffset = this.writeCursor * this.seriesCount;
    for (let s = 0; s < this.seriesCount; s++) {
      this.targetValues[baseOffset + s] = sampleVector[s] ?? 0;
    }
    this.writeCursor = (this.writeCursor + 1) % this.capacity;
  }

  /** Wywoływane wewnątrz pętli renderowania Three.js (Zero alokacji pamięci) */
  stepExponentialDamping(lambda: number, deltaSeconds: number): void {
    const decay = 1 - Math.exp(-lambda * deltaSeconds);
    const total = this.currentValues.length;
    for (let i = 0; i < total; i++) {
      const diff = this.targetValues[i] - this.currentValues[i];
      this.currentValues[i] += diff * decay;
    }
  }

  /** Odczyt uporządkowanej chronologicznie próbki (0 = najstarsza, capacity - 1 = najnowsza) */
  getOrderedValue(seriesIndex: number, chronologicalSlot: number): number {
    const physicalSlot = (this.writeCursor + chronologicalSlot) % this.capacity;
    return this.currentValues[physicalSlot * this.seriesCount + seriesIndex];
  }
}
```

---

## 4. Implementacja Złożonych Form Wykresów 3D w Next.js

### 4.1. Konfiguracja `next.config.ts`

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  experimental: {
    optimizePackageImports: ['lucide-react', 'motion'],
  },
};

export default nextConfig;
```

### 4.2. Bezpieczne Osadzenie Wyspy 3D w Next.js Server Component (`src/app/page.tsx`)

```tsx
import dynamic from 'next/dynamic';

const TelemetrySceneViewport = dynamic(
  () => import('@/components/three/TelemetrySceneCanvas').then((m) => m.TelemetrySceneCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[640px] rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center">
        <span className="text-xs font-mono text-slate-400">
          Inicjalizacja potoku graficznego WebGL2 i kompilacja shaderów...
        </span>
      </div>
    ),
  }
);

export default function Analytics3dDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 space-y-6">
      <TelemetrySceneViewport />
    </main>
  );
}
```

### 4.3. Inicjalizacja Renderer'a, Ochrona Software-WebGL i Środowisko PBR (`TelemetrySceneCanvas.tsx`)

Poniższy wzorzec spełnia rygorystyczne wymogi produkcyjne:
- Wykrywa programowe rasteryzatory (`SwiftShader`, `llvmpipe`, `Basic Render`) i dopasowuje koszt renderowania bez zmiany zawartości sceny,
- Używa synchronizacji GPU `gl.fenceSync` (`afterDraw`) na urządzeniach bez akceleracji sprzętowej,
- Generuje proceduralną mapę odbić `RoomEnvironment` dla szkła i metalicznych pierścieni 3D bez zewnętrznych plików `.hdr` (zero błędów `404`),
- Obsługuje zdarzenia `webglcontextlost` oraz pełne zwalnianie pamięci GPU (`dispose()`).

```tsx
'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { TelemetryRingBuffer } from '@/lib/realtime/telemetryRingBuffer';
import { createSpectralRibbonMesh } from './SpectralRibbonSurface';
import { createInstancedSpectrumBars } from './InstancedSpectrumBars';

function detectSoftwareWebGL(): boolean {
  const probeCanvas = document.createElement('canvas');
  const gl = probeCanvas.getContext('webgl2');
  if (!gl) return true;
  const dbg = gl.getExtension('WEBGL_debug_renderer_info');
  const rendererName = String(
    gl.getParameter(dbg ? dbg.UNMASKED_RENDERER_WEBGL : gl.RENDERER)
  );
  gl.getExtension('WEBGL_lose_context')?.loseContext();
  return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(rendererName);
}

export const TelemetrySceneCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const ringBufferRef = useRef(new TelemetryRingBuffer(3, 96));

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareWebGL();
    const width = container.clientWidth || 1200;
    const height = container.clientHeight || 640;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x030712);
    scene.fog = new THREE.FogExp2(0x030712, 0.018);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 250);
    camera.position.set(0, 11, 28);

    // Proceduralne oświetlenie środowiskowe PBR (zero zewnętrznych plików HDR)
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    pmrem.dispose();

    // Trójpunktowy zestaw oświetlenia (ciepłe światło kluczowe + chłodne wypełnienie)
    const keyLight = new THREE.DirectionalLight(0xe0f2fe, 2.2);
    keyLight.position.set(14, 22, 16);
    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x0f172a, 0.85);
    const rimLight = new THREE.DirectionalLight(0xec4899, 1.35);
    rimLight.position.set(-16, 8, -14);
    scene.add(keyLight, hemiLight, rimLight);

    // 1. Górna wstęga spektralna 3D + 2. Dolne widmo kolumnowe InstancedMesh
    const ribbon = createSpectralRibbonMesh(96);
    ribbon.mesh.position.set(0, 4.5, -2);
    scene.add(ribbon.mesh);

    const spectrum = createInstancedSpectrumBars(96);
    spectrum.mesh.position.set(0, -4.5, 2);
    scene.add(spectrum.mesh);

    // Post-processing z poświatą Bloom (aktywny na GPU sprzętowym)
    let composer: EffectComposer | null = null;
    if (!isSoftwareGl) {
      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(width, height),
        0.85, // siła poświaty
        0.38, // promień rozproszenia
        0.72  // próg luminancji (świecą tylko jasne grzbiety wykresów)
      );
      composer.addPass(bloomPass);
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.06;
    controls.maxPolarAngle = Math.PI * 0.52;

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    const clock = new THREE.Clock();
    let frameHandle = 0;
    let disposed = false;

    const afterDraw = (nextTick: () => void) => {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) return;
        const status = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (status === gl.UNSIGNALED) {
          frameHandle = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameHandle = window.setTimeout(nextTick, 80);
        }
      };
      frameHandle = window.setTimeout(poll, 5);
    };

    const tick = () => {
      if (disposed) return;
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      ringBufferRef.current.stepExponentialDamping(9.5, delta);
      ribbon.updateFromBuffer(ringBufferRef.current, elapsed);
      spectrum.updateFromBuffer(ringBufferRef.current, elapsed);

      if (controls.enableDamping) controls.update();

      if (composer && !isSoftwareGl) {
        composer.render();
      } else {
        renderer.render(scene, camera);
      }

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameHandle = window.requestAnimationFrame(tick);
      }
    };

    tick();

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer?.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      disposed = true;
      window.removeEventListener('resize', onResize);
      window.cancelAnimationFrame(frameHandle);
      window.clearTimeout(frameHandle);
      controls.dispose();
      ribbon.dispose();
      spectrum.dispose();
      envTex.dispose();
      composer?.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative w-full h-[640px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
      {/* Izolowany kontener WebGL (nigdy nie przebudowywany przez Reacta) */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
```

### 4.4. Wstęga Spektralna 3D z Shaderem GLSL (`SpectralRibbonSurface.ts`)

Wstęga tworzy półprzezroczystą powierzchnię danych z podświetleniem grzbietu i efektem Fresnela, dokładnie odwzorowując górny wykres z referencji wizualnej:

```ts
import * as THREE from 'three';
import type { TelemetryRingBuffer } from '@/lib/realtime/telemetryRingBuffer';

export function createSpectralRibbonMesh(segments = 96) {
  const geometry = new THREE.PlaneGeometry(26, 5, segments - 1, 1);
  geometry.rotateX(-Math.PI * 0.35);

  const posAttr = geometry.attributes.position as THREE.BufferAttribute;
  posAttr.setUsage(THREE.DynamicDrawUsage);

  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uColorLow: { value: new THREE.Color(0x1d4ed8) },  // Głęboki kobalt
      uColorHigh: { value: new THREE.Color(0x22d3ee) }, // Jasny cyjan na szczytach
      uAccent: { value: new THREE.Color(0xec4899) },    // Akcent magenty dla anomalii
    },
    vertexShader: `
      varying vec2 vUv;
      varying float vElevation;
      void main() {
        vUv = uv;
        vElevation = position.y;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColorLow;
      uniform vec3 uColorHigh;
      uniform vec3 uAccent;
      varying vec2 vUv;
      varying float vElevation;

      void main() {
        float heightNorm = clamp((vElevation + 2.0) / 5.0, 0.0, 1.0);
        vec3 baseCol = mix(uColorLow, uColorHigh, smoothstep(0.0, 1.0, heightNorm));
        // Jasna krawędź grzbietu danych (górna granica wstęgi vUv.y -> 1.0)
        float crestGlow = pow(vUv.y, 5.0);
        vec3 finalCol = mix(baseCol, uAccent, crestGlow * 0.28) + vec3(crestGlow * 0.55);
        float alpha = mix(0.06, 0.88, pow(vUv.y, 1.6));
        gl_FragColor = vec4(finalCol, alpha);
      }
    `,
  });

  const mesh = new THREE.Mesh(geometry, material);

  return {
    mesh,
    updateFromBuffer(buffer: TelemetryRingBuffer, elapsed: number) {
      material.uniforms.uTime.value = elapsed;
      // Pierwszy wiersz wierzchołków (i = 0..segments-1) to górny grzbiet wstęgi
      for (let i = 0; i < segments; i++) {
        const normalizedMetric = buffer.getOrderedValue(0, i) / 100; // skala 0..1
        const crestY = normalizedMetric * 4.2;
        posAttr.setY(i, crestY);
      }
      posAttr.needsUpdate = true;
      geometry.computeVertexNormals();
    },
    dispose() {
      geometry.dispose();
      material.dispose();
    },
  };
}
```

### 4.5. Instancjonowane Widmo Kolumnowe Zero-GC (`InstancedSpectrumBars.ts`)

Pre-alokacja obiektów pomocniczych (`_dummy`, `_colorLow`, `_colorHigh`, `_workColor`) poza pętlą klatkową gwarantuje **zero alokacji sterty (0 B/klatkę)** nawet przy tysiącu animowanych słupków 3D:

```ts
import * as THREE from 'three';
import type { TelemetryRingBuffer } from '@/lib/realtime/telemetryRingBuffer';

const _dummy = new THREE.Object3D();
const _colorCyan = new THREE.Color(0x06b6d4);
const _colorCobalt = new THREE.Color(0x2563eb);
const _colorMagenta = new THREE.Color(0xec4899);
const _workColor = new THREE.Color();

export function createInstancedSpectrumBars(count = 96) {
  // Przesunięcie punktu obrotu (pivot) na dolną podstawę kolumny (y = 0..1)
  const geometry = new THREE.BoxGeometry(0.18, 1, 0.18);
  geometry.translate(0, 0.5, 0);

  const material = new THREE.MeshStandardMaterial({
    roughness: 0.22,
    metalness: 0.65,
  });

  const mesh = new THREE.InstancedMesh(geometry, material, count);
  mesh.frustumCulled = false; // Instancje zmieniają wysokość dynamicznie w każdej klatce
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

  const spreadWidth = 26;
  const stepX = spreadWidth / count;

  for (let i = 0; i < count; i++) {
    _dummy.position.set(-spreadWidth / 2 + i * stepX, 0, 0);
    _dummy.scale.set(1, 0.2, 1);
    _dummy.updateMatrix();
    mesh.setMatrixAt(i, _dummy.matrix);
    mesh.setColorAt(i, _colorCobalt);
  }

  return {
    mesh,
    updateFromBuffer(buffer: TelemetryRingBuffer, elapsed: number) {
      for (let i = 0; i < count; i++) {
        const val = buffer.getOrderedValue(1, i) / 100; // Siła Wskazująca / Zasięg (0..1)
        const wave = 0.08 * Math.sin(elapsed * 2.4 + i * 0.18);
        const barHeight = Math.max(0.08, (val + wave) * 4.5);

        _dummy.position.set(-spreadWidth / 2 + i * stepX, 0, 0);
        _dummy.scale.set(1, barHeight, 1);
        _dummy.updateMatrix();
        mesh.setMatrixAt(i, _dummy.matrix);

        // Horyzontalne skupienie energetyczne w centrum + skoki anomalii
        const centerProximity = Math.exp(-Math.pow((i - count / 2) / (count * 0.16), 2));
        _workColor.copy(_colorCobalt).lerp(_colorCyan, val).lerp(_colorMagenta, centerProximity * 0.55);
        mesh.setColorAt(i, _workColor);
      }
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    },
    dispose() {
      geometry.dispose();
      material.dispose();
    },
  };
}
```

### 4.6. Wytłaczane Pierścienie i Wycinki Radialne 3D (`ExtrudedRadialRings.ts`)

Dla okrągłych wskaźników procentowych (np. `81.2% Gotowości AEO`, `96% Spójności Urządzeń Klinicznych`) zamiast płaskiego SVG budujemy wieloczęściowy model `THREE.Group` z fazowanym `ExtrudeGeometry`:

```ts
import * as THREE from 'three';

export function createBeveledSector3D(
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number,
  depth: number,
  colorHex: number
): THREE.Mesh {
  const shape = new THREE.Shape();
  shape.absarc(0, 0, outerRadius, startAngle, endAngle, false);
  shape.absarc(0, 0, innerRadius, endAngle, startAngle, true);
  shape.closePath();

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.03,
    bevelSegments: 3,
    curveSegments: 36,
  });
  geometry.computeTangents();

  const material = new THREE.MeshPhysicalMaterial({
    color: colorHex,
    metalness: 0.35,
    roughness: 0.18,
    clearcoat: 0.9,
    clearcoatRoughness: 0.12,
  });

  return new THREE.Mesh(geometry, material);
}
```

---

## 5. Serwer Next.js z Obsługą WebSocket i Silnikiem Zdarzeń (`server.ts`)

Aby obsłużyć dwukierunkową telemetrię czasu rzeczywistego bez pollingu na jednym porcie `3000`, Next.js uruchamiamy wewnątrz niestandardowego serwera HTTP z serwerem WebSocket (`ws`):

```ts
import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { WebSocketServer, WebSocket } from 'ws';

const dev = process.env.NODE_ENV !== 'production';
const port = Number(process.env.PORT) || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url || '/', true);
    handle(req, res, parsedUrl);
  });

  const wss = new WebSocketServer({ noServer: true });

  httpServer.on('upgrade', (req, socket, head) => {
    const { pathname } = parse(req.url || '/', true);
    if (pathname === '/ws/telemetry') {
      wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit('connection', ws, req);
      });
    }
  });

  // Rozgłaszanie autorytatywnych delt z silnika predykcyjnego SEO/AEO i auto-skalera
  wss.on('connection', (ws: WebSocket) => {
    ws.send(
      JSON.stringify({
        type: 'telemetry:init',
        timestamp: Date.now(),
        series: [84, 79, 88],
      })
    );
  });

  httpServer.listen(port, '0.0.0.0', () => {
    console.log(`Next.js 3D Realtime Server ready on http://0.0.0.0:${port}`);
  });
});
```

---

## 6. Mapowanie Wszystkich Modułów Obecnej Aplikacji do Next.js + 3D

| Moduł Aplikacji | Warstwa Danych i Backend w Next.js | Forma Wizualizacji 3D Czasu Rzeczywistego |
| :--- | :--- | :--- |
| **Silnik AI SEO & AEO + Frazy** | Route Handler `POST /api/seo-control/analyze-and-optimize` + kolekcja Firestore `/seoContentAssets` | Górna wielowarstwowa wstęga spektralna 3D (`SpectralRibbonSurface`) + graf konstelacji ewolucji fraz w czasie |
| **Algorytm Uczący Online i Anomalie** | Biblioteka `seoPredictiveEngine.ts` + strumień delt `/ws/telemetry` | Sferyczne węzły anomalii na warstwie `BLOOM_LAYER` + dolne widmo kolumnowe `InstancedMesh` z barwieniem pasm anomalii |
| **Cykliczne Raporty PDF + E-mail** | Route Handler `POST /api/seo-control/dispatch-report-email` + `/seoReportSchedules` | Bezpośredni zrzut bufora sceny 3D (`renderer.render()` → `canvas.toDataURL('image/png')`) osadzany na okładce raportu `jsPDF` |
| **Grafiki Urządzeń i Lokalizacje Klinik** | Kolekcje Firestore `/clinicDevices` i `/clinicTreatments` | Wytłaczane pierścienie radialne 3D zużycia impulsów/motogodzin oraz przestrzenna oś obłożenia gabinetów bez kolizji |
| **Plan Objętościowy, Cloud i Skalowanie** | Route Handlers `/api/system/control-plane` i `/api/system/autoscale` | Trójwymiarowa powierzchnia obciążenia równoległego (IOPS / RAM / p95 latencji) reagująca na żywo na symulację piku ruchu |
| **Tablica Kanban E2EE i Kalendarz** | Web Crypto API (`AES-256-GCM`), Google Calendar OAuth, `.ics` | Przestrzenny tunel przepływu zadań między kolumnami oraz 7-dniowy przekrój obciążenia tygodnia |

---

## 7. Eksport Raportu PDF z Klatką Sceny 3D

Ponieważ domyślnie WebGL czyści bufor rysowania po zaprezentowaniu klatki na ekranie (`preserveDrawingBuffer: false` dla maksymalnej wydajności), zrzut wykresu 3D do raportu PDF wykonujemy synchronicznie w jednej klatce:

```ts
export function captureHighRes3dChartForPdf(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.Camera
): string {
  // Wymuszenie świeżego wyrenderowania bezpośrednio przed odczytem bufora
  renderer.render(scene, camera);
  return renderer.domElement.toDataURL('image/png', 0.92);
}
```

---

## 8. Dostępność, Tryb Ciemny/Jasny i Budżety Jakościowe

1. **Obsługa `prefers-reduced-motion`**: Gdy użytkownik ma włączoną redukcję ruchu w systemie operacyjnym, pętla ciągła przełącza się w tryb renderowania na żądanie (`requestRender()` tylko przy zmianie danych lub obróceniu kamery), wygaszając oscylacje falowe.
2. **Interaktywny Raycasting na Warstwie Proxy**: Najechanie kursorem na kolumnę lub węzeł używa `raycaster.intersectObject(instancedMesh)` z odczytem `instanceId` (throttling `pointermove` co `32 ms`), wyświetlając precyzyjny tooltip DOM z wartością SEO, AEO, frazą kluczową i zasięgiem.
3. **Zwijany Dolny Dok Sterujący (`Cinema / Zen Mode`)**: Wszystkie przełączniki perspektywy kamery (*Widok Spektralny, Izometria 3D, Rzut z Góry*), suwak współczynnika zapominania $\lambda$ oraz filtry kanałów zgrupowane są w pojedynczym zwijanym doku na dole ekranu (skrót klawiszowy `H`), pozostawiając centralne okno 3D w 100% odsłonięte.
4. **Spójny Motyw Jasny / Ciemny w Tailwind CSS v4**: W `src/app/globals.css` deklarujemy `@custom-variant dark (&:where(.dark, .dark *));` pod `@import "tailwindcss";`, synchronizując paletę tła sceny Three.js (`0x030712` w trybie ciemnym / `0xf8fafc` w trybie jasnym) z warstwą semantyczną DOM.
