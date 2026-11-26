import React, { useState } from 'react';
import { Copy, Check, FileDown, Layers, Cpu, Box, Activity, Code2 } from 'lucide-react';

const DOC_MARKDOWN_EXPORT = `# Dokumentacja Architektoniczna: Trójwymiarowe Frontendy i Złożone Wykresy 3D Czasu Rzeczywistego w Next.js 15

Pełna specyfikacja techniczna znajduje się w repozytorium w pliku docs/NEXTJS_3D_REALTIME_CHARTS_ARCHITECTURE.md.
Obejmuje:
1. Dekompozycję 4 stref wizualizacji 3D (Multi-Ribbon Spectral Surface, Extruded Radial Rings & Constellation, Instanced Spectrum Bars, Semantic DOM Overlay).
2. Strukturę Next.js 15 App Router (Server Components + dynamiczne wyspy 'use client' z ssr: false + Custom Server HTTP/WebSocket na porcie 3000).
3. Dwuścieżkowy potok animacji 60-120 FPS (TelemetryRingBuffer Float32Array poza VDOM Reacta + interpolacja wykładnicza THREE.MathUtils.damp).
4. Shadery GLSL z efektem Fresnela, InstancedMesh (1 draw call), Selective UnrealBloomPass, ochronę Software-WebGL (fenceSync) oraz eksport klatek 3D do raportów PDF.`;

const RING_BUFFER_SNIPPET = `// src/lib/realtime/telemetryRingBuffer.ts
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

  pushSample(sampleVector: number[]): void {
    const baseOffset = this.writeCursor * this.seriesCount;
    for (let s = 0; s < this.seriesCount; s++) {
      this.targetValues[baseOffset + s] = sampleVector[s] ?? 0;
    }
    this.writeCursor = (this.writeCursor + 1) % this.capacity;
  }

  stepExponentialDamping(lambda: number, deltaSeconds: number): void {
    const decay = 1 - Math.exp(-lambda * deltaSeconds);
    for (let i = 0; i < this.currentValues.length; i++) {
      this.currentValues[i] += (this.targetValues[i] - this.currentValues[i]) * decay;
    }
  }
}`;

const NEXTJS_DYNAMIC_SNIPPET = `// src/app/page.tsx (Next.js 15 Server Component + Dynamic WebGL Island)
import dynamic from 'next/dynamic';

const TelemetrySceneViewport = dynamic(
  () => import('@/components/three/TelemetrySceneCanvas').then((m) => m.TelemetrySceneCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[620px] rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center">
        <span className="text-xs font-mono text-slate-400">
          Inicjalizacja potoku graficznego WebGL2 i kompilacja shaderów GLSL...
        </span>
      </div>
    ),
  }
);

export default function Realtime3dAnalyticsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 space-y-6">
      <TelemetrySceneViewport />
    </main>
  );
}`;

const SHADER_INSTANCED_SNIPPET = `// Fragment Shadera Wstęgi Spektralnej 3D + Aktualizacja InstancedMesh (Zero-GC)
const fragmentShader = \`
  uniform vec3 uColorLow;
  uniform vec3 uColorHigh;
  uniform vec3 uAccent;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    float h = clamp((vElevation + 2.0) / 5.0, 0.0, 1.0);
    vec3 col = mix(uColorLow, uColorHigh, smoothstep(0.0, 1.0, h));
    float crest = pow(vUv.y, 5.0);
    vec3 finalCol = mix(col, uAccent, crest * 0.28) + vec3(crest * 0.55);
    gl_FragColor = vec4(finalCol, mix(0.06, 0.88, pow(vUv.y, 1.6)));
  }
\`;`;

export const NextJs3dArchitectureDocPanel: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  const handleCopy = async (id: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 1800);
    } catch {
      // Ignore clipboard failure in restricted iframes
    }
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([DOC_MARKDOWN_EXPORT + '\n\n' + NEXTJS_DYNAMIC_SNIPPET + '\n\n' + RING_BUFFER_SNIPPET], {
      type: 'text/markdown;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chronos-vault-nextjs-3d-realtime-architecture.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Hero Split: Architectural Summary + Uploaded Holographic Reference Blueprint */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="text-xs font-medium text-blue-600 dark:text-sky-400">
              Specyfikacja Architektoniczna · Next.js 15 App Router · Three.js WebGL2 / GLSL
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white text-balance">
              Dokumentacja Budowy Trójwymiarowych Frontendów i Złożonych Wykresów Animowanych w Czasie Rzeczywistym
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Kompletna adaptacja platformy analityczno-operacyjnej do środowiska{' '}
              <strong className="font-semibold text-slate-900 dark:text-white">Next.js 15</strong> z
              wykorzystaniem akcelerowanych sprzętowo powierzchni spektralnych 3D, instancjonowanych
              widm kolumnowych (<code className="font-mono">THREE.InstancedMesh</code>), wytłaczanych
              pierścieni radialnych oraz dwuścieżkowego bufora kołowego{' '}
              <code className="font-mono">Float32Array</code> zapewniającego płynność 60–120 FPS bez
              przeciążania cyklu renderowania Reacta.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-slate-100">
                <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400 shrink-0" />
                <span>4 Warstwy Złożonych Wykresów 3D</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Wstęgi powierzchniowe GLSL, wytłaczane wycinki fazowane, topologia konstelacji słów
                kluczowych oraz widmo 1-draw-call z selektywnym Bloom.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-slate-100">
                <Activity className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Potok Real-Time Zero-GC</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Strumień WebSocket na porcie 3000 + subskrypcje Firestore zapisywane bezpośrednio do
                typowanego bufora z tłumieniem wykładniczym.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">
              Docelowy budżet klatki: &le; 8.3 ms (120 Hz) · 0 B alokacji GC / klatkę
            </div>
            <button
              type="button"
              onClick={handleDownloadMarkdown}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 dark:bg-sky-500 text-white dark:text-slate-950 text-xs font-semibold hover:bg-slate-800 dark:hover:bg-sky-400 transition-colors whitespace-nowrap shrink-0"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Pobierz Specyfikację (.md)</span>
            </button>
          </div>
        </div>

        {/* Visual Reference Card */}
        <div className="lg:col-span-5 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-200">
              Referencja Wizualna Układu Spektralnego 3D
            </span>
            <span className="text-[11px] font-mono text-sky-400">WebGL2 + Selective Bloom</span>
          </div>

          <div className="relative flex-1 min-h-[260px] rounded-lg overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
            {!imageError ? (
              <img
                src="/assets/aistudio/-0_1f95cff2.jpg"
                alt="Referencyjny trójwymiarowy pulpit spektralny z wielowarstwowymi wykresami czasu rzeczywistego"
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-full max-h-[340px] object-contain"
              />
            ) : (
              <div className="p-6 text-center space-y-2">
                <Box className="w-8 h-8 text-sky-400 mx-auto" />
                <div className="text-xs font-semibold text-slate-200">
                  Makieta Referencyjna Pulpitu Spektralnego 3D
                </div>
                <div className="text-[11px] text-slate-400">
                  Wstęgi powierzchniowe GLSL · Pierścienie radialne · Widmo kolumnowe InstancedMesh
                </div>
              </div>
            )}
          </div>

          <div className="text-[11px] text-slate-400 leading-relaxed">
            Odwzorowanie 4 stref z referencji: (1) Górne wstęgi powierzchniowe, (2) Kwartet
            wytłaczanych pierścieni i topologii węzłów, (3) Dolne widmo kolumnowe z poświatą
            horyzontu, (4) Semantyczna matryca DOM.
          </div>
        </div>
      </div>

      {/* 4-Zone Spatial Chart Decomposition */}
      <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            01. Specyfikacja Złożonych Form Wykresów 3D i Geometrii Proceduralnej
          </h3>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Three.js r160+ · ACESFilmic · RoomEnvironment
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            {
              zone: 'Strefa I · Górny Wykres Główny',
              title: 'Wstęgi Spektralne 3D (Multi-Ribbon)',
              tech: 'PlaneGeometry (DynamicDrawUsage) + TubeGeometry + Custom GLSL',
              desc: 'Półprzezroczyste powierzchnie z podświetleniem grzbietu Fresnela, pionowymi rzutami LineSegments i sferycznym węzłem ogniskowym dla wykrytej anomalii AEO/SEO.',
            },
            {
              zone: 'Strefa II-A · Lewe Panele Kołowe',
              title: 'Wytłaczane Wycinki Radialne 3D',
              tech: 'THREE.Shape + ExtrudeGeometry (bevelEnabled) + MeshPhysicalMaterial',
              desc: 'Fazowane sektory kołowe o zróżnicowanej głębokości osi Z prezentujące rozkład zasięgu między stronami WWW, blogiem i kanałami społecznościowymi.',
            },
            {
              zone: 'Strefa II-B · Środkowe Konstelacje',
              title: 'Pierścienie Toroidalne i Graf Ścieżek',
              tech: 'TorusGeometry + CatmullRomCurve3 + InstancedMesh węzłów',
              desc: 'Trójwymiarowa mapa ewolucji fraz kluczowych w czasie i przepływu zadań z płynnym przejściem kamery po kliknięciu wybranego klastra.',
            },
            {
              zone: 'Strefa III · Dolne Widmo Horyzontu',
              title: 'Widmo Kolumnowe (1 Draw Call)',
              tech: 'THREE.InstancedMesh (512+ kolumn) + Selective UnrealBloomPass',
              desc: 'Setki animowanych równolegle słupków z dynamicznym mieszaniem barw (kobalt → cyjan → magenta) bez alokacji obiektów w pętli klatkowej.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2"
            >
              <div className="text-[11px] font-mono text-blue-600 dark:text-sky-400">
                {item.zone}
              </div>
              <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                {item.title}
              </div>
              <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                {item.tech}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Next.js 15 Migration Matrix */}
      <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            02. Adaptacja Modułów Aplikacji do Architektury Next.js 15 (App Router)
          </h3>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            RSC + Dynamic Client Islands + Custom WS Server
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <th className="py-2.5 pr-4 font-semibold">Warstwa / Moduł</th>
                <th className="py-2.5 px-4 font-semibold">Rozwiązanie w Next.js 15</th>
                <th className="py-2.5 pl-4 font-semibold">Integracja z Wykresami 3D Czasu Rzeczywistego</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800/70 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="py-2.5 pr-4 font-medium text-slate-900 dark:text-slate-100">
                  Renderowanie Sceny WebGL2
                </td>
                <td className="py-2.5 px-4 font-mono text-[11px]">
                  next/dynamic(..., &#123; ssr: false &#125;) + transpilePackages: [&apos;three&apos;]
                </td>
                <td className="py-2.5 pl-4">
                  Izolowany kontener <code className="font-mono">useRef</code>; brak hydratacji SSR dla obiektów GPU i brak rozmycia <code className="font-mono">backdrop-blur</code> nad płótnem.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-medium text-slate-900 dark:text-slate-100">
                  Strumień Danych Real-Time
                </td>
                <td className="py-2.5 px-4 font-mono text-[11px]">
                  server.ts (HTTP + ws upgrade /ws/telemetry na porcie 3000)
                </td>
                <td className="py-2.5 pl-4">
                  Delty z serwera i Firestore <code className="font-mono">onSnapshot</code> trafiają do <code className="font-mono">TelemetryRingBuffer</code> bez wywoływania re-renderów Reacta.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-medium text-slate-900 dark:text-slate-100">
                  Silnik AI SEO/AEO i Raporty PDF
                </td>
                <td className="py-2.5 px-4 font-mono text-[11px]">
                  app/api/seo-control/*/route.ts + app/layout.tsx Metadata API
                </td>
                <td className="py-2.5 pl-4">
                  Natywne generowanie JSON-LD w Server Components oraz synchroniczny zrzut sceny 3D (<code className="font-mono">toDataURL</code>) na okładkę raportu PDF.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-medium text-slate-900 dark:text-slate-100">
                  Kliniki, Kalendarz i Kanban E2EE
                </td>
                <td className="py-2.5 px-4 font-mono text-[11px]">
                  app/kliniki-urzadzenia/page.tsx · app/kanban-e2ee/page.tsx
                </td>
                <td className="py-2.5 pl-4">
                  Przestrzenne wykresy zużycia głowic/impulsów urządzeń w lokalizacjach klinik oraz szyfrowanie Web Crypto po stronie klienta.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Ready-to-Copy Next.js + Three.js Implementation Blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {[
          {
            id: 'nextjs-island',
            title: '03. Wyspa Klienta 3D w Next.js App Router',
            code: NEXTJS_DYNAMIC_SNIPPET,
          },
          {
            id: 'ring-buffer',
            title: '04. Bufor Kołowy Float32Array (Zero-GC)',
            code: RING_BUFFER_SNIPPET,
          },
          {
            id: 'glsl-ribbon',
            title: '05. Shader GLSL Wstęgi Spektralnej',
            code: SHADER_INSTANCED_SNIPPET,
          },
        ].map((block) => (
          <div
            key={block.id}
            className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-3"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2 text-xs font-semibold text-slate-200 truncate">
                <Code2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span className="truncate">{block.title}</span>
              </span>
              <button
                type="button"
                onClick={() => handleCopy(block.id, block.code)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] font-medium text-slate-300 transition-colors whitespace-nowrap shrink-0"
              >
                {copiedId === block.id ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Skopiowano</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Kopiuj</span>
                  </>
                )}
              </button>
            </div>
            <pre className="text-[11px] font-mono text-slate-300 overflow-x-auto leading-relaxed p-3 rounded-lg bg-slate-900/90 border border-slate-800/80">
              <code>{block.code}</code>
            </pre>
          </div>
        ))}
      </div>

      {/* Hardware & Software WebGL Resilience Checklist */}
      <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-blue-600 dark:text-sky-400 shrink-0" />
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            06. Standardy Inżynieryjne Produkcyjnego Frontendu 3D w Next.js
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <div>
            <strong className="block text-slate-900 dark:text-slate-100 mb-1">
              Ochrona Software WebGL i Utraty Kontekstu
            </strong>
            Detekcja rasteryzatorów programowych z parametru <code className="font-mono">UNMASKED_RENDERER_WEBGL</code>, taktowanie pętli przez <code className="font-mono">gl.fenceSync</code> oraz pełne zwalnianie geometrii i tekstur w funkcji czyszczącej efektu.
          </div>
          <div>
            <strong className="block text-slate-900 dark:text-slate-100 mb-1">
              Semantyczna Warstwa DOM i Zwijany Dok
            </strong>
            Liczby tabelaryczne (<code className="font-mono">tabular-nums</code>), etykiety osi i filtry renderowane jako ostry tekst HTML nad płótnem 3D, a przełączniki kamery zgrupowane w zwijanym dolnym doku (skrót <code className="font-mono">H</code>).
          </div>
          <div>
            <strong className="block text-slate-900 dark:text-slate-100 mb-1">
              Dostępność i Tryb Redukcji Ruchu
            </strong>
            Wykrycie <code className="font-mono">prefers-reduced-motion</code> automatycznie wyłącza ciągłe oscylacje falowe, przełączając scenę w oszczędny tryb renderowania na żądanie przy zachowaniu pełnej czytelności danych.
          </div>
        </div>
      </div>
    </div>
  );
};
