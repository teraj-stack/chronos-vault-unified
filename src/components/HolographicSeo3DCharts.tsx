import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, RotateCcw } from 'lucide-react';

export interface SeoWavePoint {
  id: string;
  label: string;
  title: string;
  seo: number;
  aeo: number;
  pred: number;
}

export interface ChannelSpectrumRow {
  channel: string;
  label: string;
  organic: number;
  social: number;
  organicPct: number;
  socialPct: number;
}

export interface AnomalyCoreSplit {
  id: string;
  title: string;
  description: string;
  items: { id: string; title: string }[];
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

/**
 * Chart 1 (Ultra-Detailed 3D Holographic Telemetry Waves — Graphic 3)
 * Features: additive volumetric bloom, 3 depth-of-field parallax planes,
 * dense dot-matrix particle curtains, foreground/background bokeh, star-flare peaks,
 * fine 2026 vertical telemetry hairlines.
 */
export const HolographicWaveChart3D: React.FC<{
  points: SeoWavePoint[];
}> = ({ points }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, hoverIdx: -1 });
  const [hovered, setHovered] = useState<SeoWavePoint | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || points.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    const startTime = performance.now();

    // Multi-depth floating micro-particles (far, mid, near)
    const dust = Array.from({ length: 150 }, (_, i) => ({
      x: ((i * 61.37 + 13) % 100) / 100,
      y: ((i * 37.91 + 7) % 100) / 100,
      z: 0.25 + (i % 5) * 0.25,
      r: 0.6 + (i % 4) * 0.55,
      speed: 0.004 + (i % 6) * 0.0025,
      rgb: i % 3 === 0 ? '56, 189, 248' : i % 3 === 1 ? '52, 211, 153' : '251, 191, 36',
      alpha: 0.18 + (i % 5) * 0.11,
    }));

    // Foreground & background cinematic bokeh orbs
    const bokehOrbs = [
      { x: 0.14, y: 0.82, r: 72, z: 1.5, color: 'rgba(14, 165, 233, 0.18)' },
      { x: 0.42, y: 0.18, r: 34, z: -0.6, color: 'rgba(125, 211, 252, 0.22)' },
      { x: 0.68, y: 0.72, r: 64, z: 1.2, color: 'rgba(245, 158, 11, 0.14)' },
      { x: 0.86, y: 0.3, r: 52, z: -0.4, color: 'rgba(16, 185, 129, 0.15)' },
      { x: 0.32, y: 0.88, r: 44, z: 1.8, color: 'rgba(251, 191, 36, 0.16)' },
    ];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const drawFlare = (x: number, y: number, color: string, size: number) => {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      const g = ctx.createRadialGradient(x, y, 0.5, x, y, size * 3.2);
      g.addColorStop(0, '#ffffff');
      g.addColorStop(0.25, color);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, size * 3.2, 0, Math.PI * 2);
      ctx.fill();

      // Subtle 4-point optical glint
      ctx.strokeStyle = 'rgba(255,255,255,0.65)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(x - size * 2.2, y);
      ctx.lineTo(x + size * 2.2, y);
      ctx.moveTo(x, y - size * 2.2);
      ctx.lineTo(x, y + size * 2.2);
      ctx.stroke();
      ctx.restore();
    };

    const drawRibbon = (
      w: number,
      h: number,
      values: number[],
      coreColor: string,
      auraRgb: string,
      zDepth: number,
      t: number,
      px: number,
      py: number,
      drawDots: boolean
    ) => {
      const padL = 42;
      const padR = 26;
      const padT = 44;
      const padB = 38;
      const plotW = w - padL - padR;
      const plotH = h - padT - padB;
      const n = values.length;

      // Dense interpolated micro-points for jagged-organic telemetry feel
      const dense: { x: number; y: number }[] = [];
      const stepsPerSeg = 6;
      for (let i = 0; i < n; i++) {
        const ratio = n > 1 ? i / (n - 1) : 0.5;
        const x = padL + ratio * plotW + px * zDepth * 14;
        const yNorm = Math.min(100, Math.max(0, values[i])) / 100;
        const wave = reducedMotion ? 0 : Math.sin(t * 1.25 + i * 0.85 + zDepth * 2) * 3;
        const y = padT + (1 - yNorm) * plotH + wave + py * zDepth * 9;
        dense.push({ x, y });

        if (i < n - 1) {
          const nextRatio = (i + 1) / (n - 1);
          const nx = padL + nextRatio * plotW + px * zDepth * 14;
          const nyNorm = Math.min(100, Math.max(0, values[i + 1])) / 100;
          const nWave = reducedMotion ? 0 : Math.sin(t * 1.25 + (i + 1) * 0.85 + zDepth * 2) * 3;
          const ny = padT + (1 - nyNorm) * plotH + nWave + py * zDepth * 9;
          for (let s = 1; s < stepsPerSeg; s++) {
            const u = s / stepsPerSeg;
            const jitter = Math.sin(i * 7.3 + s * 2.1 + zDepth * 3 + (reducedMotion ? 0 : t * 0.7)) * 3.2;
            dense.push({
              x: x + (nx - x) * u,
              y: y + (ny - y) * u + jitter,
            });
          }
        }
      }

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      // Dot-matrix particle curtain hanging beneath the curve
      if (drawDots) {
        for (let k = 0; k < dense.length; k += 2) {
          const pt = dense[k];
          const rows = 5;
          for (let r = 1; r <= rows; r++) {
            const dy = pt.y + r * 9.5;
            if (dy > h - padB) break;
            const fade = (1 - r / (rows + 1)) * 0.42;
            ctx.fillStyle = `rgba(${auraRgb}, ${fade.toFixed(2)})`;
            ctx.fillRect(pt.x - 0.75, dy, 1.5, 1.5);
          }
        }
      }

      // Volumetric area haze
      const areaGrad = ctx.createLinearGradient(0, padT, 0, h - padB);
      areaGrad.addColorStop(0, `rgba(${auraRgb}, 0.22)`);
      areaGrad.addColorStop(0.6, `rgba(${auraRgb}, 0.05)`);
      areaGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      dense.forEach((p, idx) => (idx === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
      ctx.lineTo(dense[dense.length - 1].x, h - padB);
      ctx.lineTo(dense[0].x, h - padB);
      ctx.closePath();
      ctx.fillStyle = areaGrad;
      ctx.fill();

      // Pass 1: Wide volumetric bloom
      ctx.strokeStyle = `rgba(${auraRgb}, 0.35)`;
      ctx.lineWidth = 7;
      ctx.lineJoin = 'round';
      ctx.beginPath();
      dense.forEach((p, idx) => (idx === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
      ctx.stroke();

      // Pass 2: Saturated neon core
      ctx.shadowColor = coreColor;
      ctx.shadowBlur = 14;
      ctx.strokeStyle = coreColor;
      ctx.lineWidth = 2.1;
      ctx.beginPath();
      dense.forEach((p, idx) => (idx === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
      ctx.stroke();

      // Pass 3: White-hot inner filament
      ctx.shadowBlur = 0;
      ctx.strokeStyle = 'rgba(255,255,255,0.65)';
      ctx.lineWidth = 0.75;
      ctx.stroke();
      ctx.restore();

      // Primary data point flares
      for (let i = 0; i < n; i++) {
        const pt = dense[i * stepsPerSeg];
        if (!pt) continue;
        const isHot = i === pointerRef.current.hoverIdx;
        drawFlare(pt.x, pt.y, coreColor, isHot ? 4.8 : 2.6);
      }
    };

    const render = (now: number) => {
      const t = (now - startTime) / 1000;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      pointerRef.current.x += (pointerRef.current.targetX - pointerRef.current.x) * 0.07;
      pointerRef.current.y += (pointerRef.current.targetY - pointerRef.current.y) * 0.07;
      const px = pointerRef.current.x;
      const py = pointerRef.current.y;

      // Deep space midnight gradient
      const bg = ctx.createRadialGradient(w * 0.58, h * 0.42, 18, w * 0.5, h * 0.5, Math.max(w, h) * 0.85);
      bg.addColorStop(0, '#0b1e34');
      bg.addColorStop(0.5, '#050c18');
      bg.addColorStop(1, '#02050b');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Background out-of-focus bokeh waves (depth-of-field illusion)
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      bokehOrbs.filter((b) => b.z < 0).forEach((b) => {
        const bx = b.x * w + px * b.z * 16;
        const by = b.y * h + py * b.z * 10;
        const g = ctx.createRadialGradient(bx, by, 1, bx, by, b.r);
        g.addColorStop(0, b.color);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(bx, by, b.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      // Fine atmospheric telemetry grid
      const padL = 42;
      const padR = 26;
      const padT = 44;
      const padB = 38;
      const plotW = w - padL - padR;
      const plotH = h - padT - padB;

      ctx.font = '10px ui-monospace, SFMono-Regular, Menlo, monospace';
      [25, 50, 75, 100].forEach((tick) => {
        const y = padT + (1 - tick / 100) * plotH;
        ctx.strokeStyle = 'rgba(125, 211, 252, 0.08)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padL, y);
        ctx.lineTo(w - padR, y);
        ctx.stroke();
        ctx.fillStyle = 'rgba(148, 163, 184, 0.55)';
        ctx.textAlign = 'left';
        ctx.fillText(String(tick), 10, y + 3);
      });

      // Micro vertical time spikes + 2026 glowing markers
      const n = points.length;
      for (let m = 0; m < 32; m++) {
        const mx = padL + (m / 31) * plotW;
        const spikeH = 18 + ((m * 37) % 52);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.07)';
        ctx.beginPath();
        ctx.moveTo(mx, h - padB);
        ctx.lineTo(mx, h - padB - spikeH);
        ctx.stroke();
      }

      points.forEach((pt, idx) => {
        const ratio = n > 1 ? idx / (n - 1) : 0.5;
        const x = padL + ratio * plotW;
        const isHot = idx === pointerRef.current.hoverIdx;
        ctx.strokeStyle = isHot ? 'rgba(56, 189, 248, 0.65)' : 'rgba(125, 211, 252, 0.16)';
        ctx.lineWidth = isHot ? 1.4 : 0.9;
        ctx.beginPath();
        ctx.moveTo(x, 22);
        ctx.lineTo(x, h - padB);
        ctx.stroke();

        if (idx === 1 || idx === Math.floor(n / 2)) {
          ctx.fillStyle = 'rgba(186, 230, 253, 0.88)';
          ctx.font = '600 11px ui-monospace, SFMono-Regular, Menlo, monospace';
          ctx.textAlign = 'center';
          ctx.fillText('2026', x, 16);
        }

        ctx.fillStyle = isHot ? '#f0f9ff' : 'rgba(148, 163, 184, 0.7)';
        ctx.font = '10px ui-monospace, SFMono-Regular, Menlo, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(pt.label, x, h - 14);
      });

      // Floating multi-depth particles
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      dust.forEach((p) => {
        const drift = reducedMotion ? 0 : (t * p.speed) % 1;
        const x = ((p.x + drift) % 1) * w + px * p.z * 12;
        const y = p.y * h + py * p.z * 8 + (reducedMotion ? 0 : Math.sin(t * 0.9 + p.x * 12) * 2.5);
        ctx.fillStyle = `rgba(${p.rgb}, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      // 3 volumetric depth-layered telemetry ribbons
      drawRibbon(w, h, points.map((p) => p.pred), '#fbbf24', '251, 191, 36', -0.8, t, px, py, false);
      drawRibbon(w, h, points.map((p) => p.aeo), '#34d399', '52, 211, 153', 0.15, t, px, py, true);
      drawRibbon(w, h, points.map((p) => p.seo), '#38bdf8', '56, 189, 248', 0.95, t, px, py, true);

      // Foreground soft bokeh depth-of-field pass
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      bokehOrbs.filter((b) => b.z > 0).forEach((b) => {
        const bx = b.x * w + px * b.z * 20;
        const by = b.y * h + py * b.z * 14;
        const g = ctx.createRadialGradient(bx, by, 2, bx, by, b.r);
        g.addColorStop(0, b.color);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(bx, by, b.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      if (!reducedMotion) {
        rafId = requestAnimationFrame(render);
      }
    };

    rafId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, [points, reducedMotion]);

  const handleMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    pointerRef.current.targetX = (nx - 0.5) * 2;
    pointerRef.current.targetY = (ny - 0.5) * 2;

    if (points.length > 0) {
      const padL = 42;
      const padR = 26;
      const plotW = Math.max(1, rect.width - padL - padR);
      const rel = Math.min(1, Math.max(0, (e.clientX - rect.left - padL) / plotW));
      const idx = Math.round(rel * (points.length - 1));
      pointerRef.current.hoverIdx = idx;
      setHovered(points[idx] || null);
    }
  };

  const handleLeave = () => {
    pointerRef.current.targetX = 0;
    pointerRef.current.targetY = 0;
    pointerRef.current.hoverIdx = -1;
    setHovered(null);
  };

  return (
    <div className="relative rounded-xl overflow-hidden border border-sky-500/30 bg-slate-950 shadow-[0_0_40px_rgba(14,165,233,0.16)]">
      <canvas
        ref={canvasRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="w-full h-72 block cursor-crosshair"
        role="img"
        aria-label="Holograficzny wykres 3D SEO, AEO i Siły Wskazującej"
      />
      <div className="pointer-events-none absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-sky-400/30 px-2.5 py-0.5 text-[10px] font-mono text-sky-300">
        <Sparkles className="w-3 h-3 text-sky-400" />
        VOLUMETRIC 3D · DOF TELEMETRY
      </div>
      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-none absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-xs rounded-lg bg-slate-950/90 backdrop-blur-md border border-sky-400/35 px-3 py-2 text-[11px] text-slate-200 shadow-xl"
        >
          <div className="font-semibold text-white truncate">{hovered.label} · {hovered.title}</div>
          <div className="mt-1 flex items-center gap-3 font-mono text-[10.5px]">
            <span className="text-sky-400">SEO: {hovered.seo}</span>
            <span className="text-emerald-400">AEO: {hovered.aeo}</span>
            <span className="text-amber-400">Pred: {hovered.pred}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

/**
 * Chart 2 (Ultra-Detailed 3D Volumetric Prism City + Circuit Floor + Dual Angled HUDs — Graphic 2)
 */
export const HolographicSpectrum3D: React.FC<{
  rows: ChannelSpectrumRow[];
}> = ({ rows }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const camRef = useRef({ yaw: -0.32, targetYaw: -0.32, pitch: 0.44, targetPitch: 0.44, dragging: false, lastX: 0, lastY: 0 });
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    const start = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // Dense 56-bar volumetric city spectrum across 4 depth rows
    const maxVal = Math.max(1, ...rows.map((r) => r.organic + r.social));
    const cols = 16;
    const depthRows = 4;
    const bars: { x: number; z: number; height: number; hue: number; rowIdx: number; hasThread: boolean }[] = [];

    for (let r = 0; r < depthRows; r++) {
      for (let c = 0; c < cols; c++) {
        const tCol = c / (cols - 1);
        const rowIdx = rows.length ? Math.min(rows.length - 1, Math.floor(tCol * rows.length)) : 0;
        const row = rows[rowIdx];
        const baseRatio = row ? (row.organic + row.social) / maxVal : 0.4;
        const centerBell = Math.exp(-Math.pow((tCol - 0.5) * 2.3, 2));
        const micro = 0.55 + 0.45 * Math.abs(Math.sin(c * 1.7 + r * 2.3));
        const height = Math.max(0.18, (0.35 + baseRatio * 1.85) * (0.45 + centerBell * 0.95) * micro);
        const hue = 186 + tCol * 144; // cyan -> electric blue -> violet -> magenta
        bars.push({
          x: (tCol - 0.5) * 6.6,
          z: (r - (depthRows - 1) / 2) * 0.62,
          height,
          hue,
          rowIdx,
          hasThread: height > 1.45 && (c + r) % 2 === 0,
        });
      }
    }

    const project = (x: number, y: number, z: number, w: number, h: number, yaw: number, pitch: number) => {
      const cy = Math.cos(yaw);
      const sy = Math.sin(yaw);
      const cp = Math.cos(pitch);
      const sp = Math.sin(pitch);

      const x1 = x * cy - z * sy;
      const z1 = x * sy + z * cy;
      const y2 = y * cp - z1 * sp;
      const z2 = y * sp + z1 * cp + 8.6;

      const fov = Math.min(w, h) * 1.38;
      const scale = fov / Math.max(1.5, z2);
      return {
        sx: w * 0.5 + x1 * scale,
        sy: h * 0.68 - y2 * scale,
        scale,
        depth: z2,
      };
    };

    const drawHudWing = (
      side: -1 | 1,
      w: number,
      h: number,
      yaw: number,
      pitch: number,
      t: number
    ) => {
      const xOuter = side * 4.55;
      const xInner = side * 2.45;
      const zOuter = -1.6;
      const zInner = -2.75;
      const yBot = 0.35;
      const yTop = 3.15;

      const tl = project(xOuter, yTop, zOuter, w, h, yaw, pitch);
      const tr = project(xInner, yTop, zInner, w, h, yaw, pitch);
      const br = project(xInner, yBot, zInner, w, h, yaw, pitch);
      const bl = project(xOuter, yBot, zOuter, w, h, yaw, pitch);

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(tl.sx, tl.sy);
      ctx.lineTo(tr.sx, tr.sy);
      ctx.lineTo(br.sx, br.sy);
      ctx.lineTo(bl.sx, bl.sy);
      ctx.closePath();

      const panelGrad = ctx.createLinearGradient(tl.sx, tl.sy, br.sx, br.sy);
      panelGrad.addColorStop(0, side < 0 ? 'rgba(14, 165, 233, 0.14)' : 'rgba(168, 85, 247, 0.14)');
      panelGrad.addColorStop(1, 'rgba(2, 6, 23, 0.45)');
      ctx.fillStyle = panelGrad;
      ctx.fill();
      ctx.strokeStyle = side < 0 ? 'rgba(56, 189, 248, 0.38)' : 'rgba(217, 70, 239, 0.38)';
      ctx.lineWidth = 1.1;
      ctx.stroke();

      // Miniature glowing telemetry bars inside each angled HUD wing
      for (let line = 0; line < 7; line++) {
        const u = 0.14 + line * 0.115;
        const pL = {
          x: tl.sx + (bl.sx - tl.sx) * u,
          y: tl.sy + (bl.sy - tl.sy) * u,
        };
        const pR = {
          x: tr.sx + (br.sx - tr.sx) * u,
          y: tr.sy + (br.sy - tr.sy) * u,
        };
        const frac = 0.25 + 0.55 * Math.abs(Math.sin(line * 1.4 + side + (reducedMotion ? 0 : t * 0.4)));
        ctx.strokeStyle = side < 0 ? 'rgba(56, 189, 248, 0.45)' : 'rgba(232, 121, 249, 0.45)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(pL.x + (pR.x - pL.x) * 0.1, pL.y + (pR.y - pL.y) * 0.1);
        ctx.lineTo(pL.x + (pR.x - pL.x) * (0.1 + frac * 0.8), pL.y + (pR.y - pL.y) * (0.1 + frac * 0.8));
        ctx.stroke();
      }
      ctx.restore();
    };

    const render = (now: number) => {
      const t = (now - start) / 1000;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      camRef.current.yaw += (camRef.current.targetYaw - camRef.current.yaw) * 0.08;
      camRef.current.pitch += (camRef.current.targetPitch - camRef.current.pitch) * 0.08;
      const yaw = camRef.current.yaw + (reducedMotion ? 0 : Math.sin(t * 0.32) * 0.07);
      const pitch = camRef.current.pitch;

      // Deep cyber-obsidian atmosphere
      const bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, '#020612');
      bg.addColorStop(0.5, '#07081c');
      bg.addColorStop(1, '#150520');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Dual angled holographic HUD wings in background space
      drawHudWing(-1, w, h, yaw, pitch, t);
      drawHudWing(1, w, h, yaw, pitch, t);

      // Floor volumetric glow pool
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      const floorGlow = ctx.createRadialGradient(w * 0.5, h * 0.74, 8, w * 0.5, h * 0.74, w * 0.54);
      floorGlow.addColorStop(0, 'rgba(139, 92, 246, 0.34)');
      floorGlow.addColorStop(0.45, 'rgba(14, 165, 233, 0.16)');
      floorGlow.addColorStop(0.78, 'rgba(236, 72, 153, 0.12)');
      floorGlow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = floorGlow;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();

      // Detailed luminous circuit-board floor grid on y = 0
      for (let gx = -4.5; gx <= 4.5; gx += 0.75) {
        const p1 = project(gx, 0, -2.6, w, h, yaw, pitch);
        const p2 = project(gx, 0, 2.6, w, h, yaw, pitch);
        const hue = 190 + ((gx + 4.5) / 9) * 140;
        ctx.strokeStyle = `hsla(${hue}, 95%, 62%, 0.22)`;
        ctx.lineWidth = 0.9;
        ctx.beginPath();
        ctx.moveTo(p1.sx, p1.sy);
        ctx.lineTo(p2.sx, p2.sy);
        ctx.stroke();
      }
      for (let gz = -2.6; gz <= 2.6; gz += 0.65) {
        const p1 = project(-4.5, 0, gz, w, h, yaw, pitch);
        const p2 = project(4.5, 0, gz, w, h, yaw, pitch);
        ctx.strokeStyle = gz > 1.2 ? 'rgba(244, 63, 94, 0.24)' : 'rgba(56, 189, 248, 0.18)';
        ctx.lineWidth = 0.9;
        ctx.beginPath();
        ctx.moveTo(p1.sx, p1.sy);
        ctx.lineTo(p2.sx, p2.sy);
        ctx.stroke();
      }

      // Painter's algorithm sort for 3D volumetric prisms
      const projected = bars
        .map((b, idx) => {
          const pulse = reducedMotion ? 1 : 0.92 + 0.08 * Math.sin(t * 2.1 + idx * 0.4);
          const bh = b.height * pulse;
          const base = project(b.x, 0, b.z, w, h, yaw, pitch);
          const top = project(b.x, bh, b.z, w, h, yaw, pitch);
          const refl = project(b.x, -bh * 0.22, b.z, w, h, yaw, pitch);
          const sky = project(b.x, bh + 1.15, b.z, w, h, yaw, pitch);
          return { ...b, base, top, refl, sky };
        })
        .sort((a, b) => b.base.depth - a.base.depth);

      projected.forEach((b) => {
        const bw = Math.max(3.5, b.base.scale * 0.13);
        const isActive = b.rowIdx === selectedIdx;
        const barH = Math.max(2, b.base.sy - b.top.sy);

        // Floor reflection
        ctx.fillStyle = `hsla(${b.hue}, 95%, 55%, 0.12)`;
        ctx.fillRect(b.base.sx - bw / 2, b.base.sy, bw, Math.max(2, b.refl.sy - b.base.sy));

        // Vertical rising data thread from tall peaks
        if (b.hasThread) {
          ctx.save();
          ctx.globalCompositeOperation = 'lighter';
          const tg = ctx.createLinearGradient(b.top.sx, b.top.sy, b.sky.sx, b.sky.sy);
          tg.addColorStop(0, `hsla(${b.hue}, 100%, 75%, 0.65)`);
          tg.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.strokeStyle = tg;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(b.top.sx, b.top.sy);
          ctx.lineTo(b.sky.sx, b.sky.sy);
          ctx.stroke();
          ctx.restore();
        }

        // Volumetric 3D prism front + side facet
        const grad = ctx.createLinearGradient(b.top.sx, b.top.sy, b.base.sx, b.base.sy);
        grad.addColorStop(0, `hsla(${b.hue}, 100%, ${isActive ? 78 : 68}%, 0.96)`);
        grad.addColorStop(0.65, `hsla(${b.hue}, 95%, 50%, 0.72)`);
        grad.addColorStop(1, `hsla(${b.hue}, 90%, 32%, 0.35)`);

        ctx.save();
        ctx.shadowColor = `hsla(${b.hue}, 100%, 62%, ${isActive ? 0.85 : 0.4})`;
        ctx.shadowBlur = isActive ? 14 : 7;
        ctx.fillStyle = grad;
        ctx.fillRect(b.top.sx - bw / 2, b.top.sy, bw, barH);

        // Shaded 3D right bevel
        ctx.fillStyle = `hsla(${b.hue}, 90%, 35%, 0.55)`;
        ctx.fillRect(b.top.sx + bw / 2, b.top.sy + 1, Math.max(1.5, bw * 0.35), barH);

        // White-hot glowing top cap
        ctx.fillStyle = `hsla(${b.hue}, 100%, 92%, 0.98)`;
        ctx.fillRect(b.top.sx - bw / 2, b.top.sy, bw, 2);
        ctx.restore();
      });

      if (!reducedMotion) {
        rafId = requestAnimationFrame(render);
      }
    };

    rafId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, [rows, selectedIdx, reducedMotion]);

  const activeRow = rows[selectedIdx] || rows[0];

  return (
    <div className="space-y-3">
      <div className="relative rounded-xl overflow-hidden border border-violet-500/30 bg-slate-950 shadow-[0_0_40px_rgba(139,92,246,0.18)]">
        <canvas
          ref={canvasRef}
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
            camRef.current.targetYaw = Math.max(-1.1, Math.min(1.1, camRef.current.targetYaw + dx * 0.008));
            camRef.current.targetPitch = Math.max(0.15, Math.min(0.85, camRef.current.targetPitch + dy * 0.006));
          }}
          onMouseUp={() => { camRef.current.dragging = false; }}
          onMouseLeave={() => { camRef.current.dragging = false; }}
          className="w-full h-64 block cursor-grab active:cursor-grabbing"
          role="img"
          aria-label="Spektrum 3D rozkładu zasięgu kanałów"
        />
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="rounded-full bg-slate-950/80 backdrop-blur-md border border-violet-400/30 px-2.5 py-0.5 text-[10px] font-mono text-fuchsia-300">
            3D VOLUMETRIC HUD · PRZECIĄGNIJ BY OBRÓCIĆ
          </span>
          <button
            type="button"
            onClick={() => {
              camRef.current.targetYaw = -0.32;
              camRef.current.targetPitch = 0.44;
            }}
            className="pointer-events-auto p-1 rounded-md bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white"
            title="Resetuj kamerę 3D"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
        {activeRow && (
          <div className="pointer-events-none absolute bottom-2.5 left-3 rounded-lg bg-slate-950/88 backdrop-blur-md border border-violet-400/35 px-2.5 py-1.5 text-[11px] font-mono text-slate-200">
            <span className="text-white font-semibold">{activeRow.label}</span>
            <span className="mx-2 text-slate-500">|</span>
            <span className="text-sky-400">Org: {activeRow.organic.toLocaleString('pl-PL')}</span>
            <span className="mx-1.5 text-slate-500">·</span>
            <span className="text-fuchsia-400">Social: {activeRow.social.toLocaleString('pl-PL')}</span>
          </div>
        )}
      </div>

      {/* Interactive HUD channel selectors */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {rows.map((row, idx) => (
          <button
            key={row.channel}
            type="button"
            onMouseEnter={() => setSelectedIdx(idx)}
            onClick={() => setSelectedIdx(idx)}
            className={`text-left px-2.5 py-1.5 rounded-lg border text-[11px] transition-colors ${
              idx === selectedIdx
                ? 'bg-violet-500/15 border-violet-400/50 text-slate-900 dark:text-white'
                : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-sky-500/40'
            }`}
          >
            <div className="font-medium truncate">{row.label}</div>
            <div className="font-mono text-[10px] opacity-80">
              {(row.organic + row.social).toLocaleString('pl-PL')}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

/**
 * Chart 3 (Ultra-Detailed 3D Glass Containment Core with Fractal Vascular Trunk & Micro-HUDs — Graphic 1)
 */
export const HolographicAnomalyCore3D: React.FC<{
  splits: AnomalyCoreSplit[];
}> = ({ splits }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const camRef = useRef({
    yaw: 0.25,
    targetYaw: 0.25,
    pitch: 0.14,
    targetPitch: 0.14,
    dragging: false,
    lastX: 0,
    lastY: 0,
  });
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    const start = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const nodeCount = Math.max(1, splits.length);
    const nodes = splits.map((s, i) => {
      const angle = (i / nodeCount) * Math.PI * 2 + 0.35;
      const radius = 2.15 + (i % 2) * 0.38;
      const y = -1.2 + (i / Math.max(1, nodeCount - 1)) * 2.4;
      const isAlert = s.items.length > 0 && !s.id.includes('stable') && !s.id.includes('none');
      return {
        idx: i,
        angle,
        radius,
        y,
        count: s.items.length,
        isAlert,
        title: s.title,
      };
    });

    // Organic secondary vascular tendrils radiating from the core trunk
    const tendrils = Array.from({ length: 28 }, (_, i) => ({
      angle: (i * 2.39996) % (Math.PI * 2),
      yStart: -1.35 + (i / 27) * 2.7,
      yEnd: -1.35 + (i / 27) * 2.7 + Math.sin(i * 1.9) * 0.45,
      len: 0.85 + (i % 5) * 0.34,
      bend: Math.cos(i * 1.3) * 0.35,
    }));

    // Vertical inner neural filaments
    const filaments = Array.from({ length: 24 }, (_, i) => ({
      angle: (i / 24) * Math.PI * 2,
      rad: 0.14 + (i % 5) * 0.075,
    }));

    const project = (x: number, y: number, z: number, w: number, h: number, yaw: number, pitch: number) => {
      const cy = Math.cos(yaw);
      const sy = Math.sin(yaw);
      const cp = Math.cos(pitch);
      const sp = Math.sin(pitch);

      const x1 = x * cy - z * sy;
      const z1 = x * sy + z * cy;
      const y2 = y * cp - z1 * sp;
      const z2 = y * sp + z1 * cp + 8.6;

      const fov = Math.min(w, h) * 1.55;
      const scale = fov / Math.max(1.5, z2);
      return {
        sx: w * 0.5 + x1 * scale,
        sy: h * 0.5 - y2 * scale,
        scale,
        depth: z2,
      };
    };

    const drawChamberRim = (y: number, radius: number, w: number, h: number, yaw: number, pitch: number, alpha: number, lw = 1.4) => {
      ctx.beginPath();
      const segs = 56;
      for (let i = 0; i <= segs; i++) {
        const a = (i / segs) * Math.PI * 2;
        const p = project(Math.cos(a) * radius, y, Math.sin(a) * radius, w, h, yaw, pitch);
        if (i === 0) ctx.moveTo(p.sx, p.sy);
        else ctx.lineTo(p.sx, p.sy);
      }
      ctx.strokeStyle = `rgba(147, 197, 253, ${alpha})`;
      ctx.lineWidth = lw;
      ctx.stroke();
    };

    const render = (now: number) => {
      const t = (now - start) / 1000;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      camRef.current.yaw += (camRef.current.targetYaw - camRef.current.yaw) * 0.08;
      camRef.current.pitch += (camRef.current.targetPitch - camRef.current.pitch) * 0.08;
      const yaw = camRef.current.yaw + (reducedMotion ? 0 : t * 0.14);
      const pitch = camRef.current.pitch;

      // Deep studio obsidian background with crimson volumetric core haze
      const bg = ctx.createRadialGradient(w * 0.5, h * 0.5, 14, w * 0.5, h * 0.5, Math.max(w, h) * 0.72);
      bg.addColorStop(0, '#260910');
      bg.addColorStop(0.38, '#0c0a18');
      bg.addColorStop(1, '#020409');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Containment chamber glass rims (top canopy + floor circuit plate)
      const cylR = 2.85;
      const cylTop = 1.75;
      const cylBot = -1.75;
      drawChamberRim(cylTop, cylR, w, h, yaw, pitch, 0.44, 1.8);
      drawChamberRim(cylTop, cylR * 0.72, w, h, yaw, pitch, 0.16, 0.9);
      drawChamberRim(cylBot, cylR, w, h, yaw, pitch, 0.48, 1.8);
      drawChamberRim(cylBot, cylR * 0.65, w, h, yaw, pitch, 0.22, 1);
      drawChamberRim(cylBot, cylR * 0.34, w, h, yaw, pitch, 0.32, 1.2);

      // Vertical hanging telemetry filaments & glass specular edges
      for (let v = -4; v <= 4; v++) {
        const vx = (v / 4) * cylR;
        const isEdge = Math.abs(v) === 4;
        const pTop = project(vx, cylTop, 0, w, h, 0, pitch);
        const pBot = project(vx, cylBot, 0, w, h, 0, pitch);
        const g = ctx.createLinearGradient(0, pTop.sy, 0, pBot.sy);
        g.addColorStop(0, isEdge ? 'rgba(186, 230, 253, 0.48)' : 'rgba(148, 163, 184, 0.14)');
        g.addColorStop(0.5, isEdge ? 'rgba(56, 189, 248, 0.16)' : 'rgba(251, 146, 60, 0.08)');
        g.addColorStop(1, isEdge ? 'rgba(186, 230, 253, 0.38)' : 'rgba(148, 163, 184, 0.12)');
        ctx.strokeStyle = g;
        ctx.lineWidth = isEdge ? 1.8 : 0.75;
        ctx.beginPath();
        ctx.moveTo(pTop.sx, pTop.sy);
        ctx.lineTo(pBot.sx, pBot.sy);
        ctx.stroke();
      }

      // Additive volumetric core trunk + floor energy pool
      const coreTop = project(0, cylTop * 0.94, 0, w, h, yaw, pitch);
      const coreBot = project(0, cylBot * 0.94, 0, w, h, yaw, pitch);
      const pulse = reducedMotion ? 1 : 0.88 + 0.12 * Math.sin(t * 2.4);

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      // Base & top red-amber emitter pools
      [coreBot, coreTop].forEach((ep, i) => {
        const pool = ctx.createRadialGradient(ep.sx, ep.sy, 2, ep.sx, ep.sy, i === 0 ? 58 : 44);
        pool.addColorStop(0, `rgba(254, 215, 170, ${0.8 * pulse})`);
        pool.addColorStop(0.35, `rgba(239, 68, 68, ${0.55 * pulse})`);
        pool.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = pool;
        ctx.beginPath();
        ctx.arc(ep.sx, ep.sy, i === 0 ? 58 : 44, 0, Math.PI * 2);
        ctx.fill();
      });

      // Outer crimson aura trunk
      const trunkGrad = ctx.createLinearGradient(coreTop.sx, coreTop.sy, coreBot.sx, coreBot.sy);
      trunkGrad.addColorStop(0, `rgba(251, 146, 60, ${0.72 * pulse})`);
      trunkGrad.addColorStop(0.5, `rgba(239, 68, 68, ${0.88 * pulse})`);
      trunkGrad.addColorStop(1, `rgba(249, 115, 22, ${0.82 * pulse})`);
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 32;
      ctx.strokeStyle = trunkGrad;
      ctx.lineWidth = Math.max(14, coreBot.scale * 0.28);
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(coreTop.sx, coreTop.sy);
      ctx.lineTo(coreBot.sx, coreBot.sy);
      ctx.stroke();

      // Fine twisting neural fibers inside trunk
      filaments.forEach((f) => {
        ctx.beginPath();
        for (let step = 0; step <= 16; step++) {
          const u = step / 16;
          const y = cylBot * 0.94 + u * (cylTop - cylBot) * 0.94;
          const twist = f.angle + u * 2.8 + (reducedMotion ? 0 : t * 0.55);
          const r = f.rad * (0.7 + 0.4 * Math.sin(u * Math.PI));
          const p = project(Math.cos(twist) * r, y, Math.sin(twist) * r, w, h, yaw, pitch);
          if (step === 0) ctx.moveTo(p.sx, p.sy);
          else ctx.lineTo(p.sx, p.sy);
        }
        ctx.shadowBlur = 5;
        ctx.strokeStyle = 'rgba(254, 215, 170, 0.34)';
        ctx.lineWidth = 0.9;
        ctx.stroke();
      });

      // Organic micro-vascular branching tendrils
      tendrils.forEach((tr) => {
        const p0 = project(0, tr.yStart, 0, w, h, yaw, pitch);
        const p1 = project(
          Math.cos(tr.angle) * tr.len * 0.55,
          (tr.yStart + tr.yEnd) * 0.5 + tr.bend,
          Math.sin(tr.angle) * tr.len * 0.55,
          w, h, yaw, pitch
        );
        const p2 = project(
          Math.cos(tr.angle) * tr.len,
          tr.yEnd,
          Math.sin(tr.angle) * tr.len,
          w, h, yaw, pitch
        );
        ctx.shadowBlur = 8;
        ctx.strokeStyle = 'rgba(249, 115, 22, 0.42)';
        ctx.lineWidth = 1.05;
        ctx.beginPath();
        ctx.moveTo(p0.sx, p0.sy);
        ctx.quadraticCurveTo(p1.sx, p1.sy, p2.sx, p2.sy);
        ctx.stroke();

        // Micro cyan/amber terminal spark
        ctx.fillStyle = tr.len > 1.5 ? 'rgba(56, 189, 248, 0.7)' : 'rgba(253, 186, 116, 0.65)';
        ctx.beginPath();
        ctx.arc(p2.sx, p2.sy, 1.8, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      // Project anomaly branch nodes & sort back-to-front
      const projectedNodes = nodes
        .map((n) => {
          const x = Math.cos(n.angle) * n.radius;
          const z = Math.sin(n.angle) * n.radius;
          const pNode = project(x, n.y, z, w, h, yaw, pitch);
          const pRoot = project(0, n.y * 0.62, 0, w, h, yaw, pitch);
          const pMid = project(x * 0.52, n.y * 0.85 + Math.sin(t + n.idx) * 0.08, z * 0.52, w, h, yaw, pitch);
          return { ...n, pNode, pRoot, pMid };
        })
        .sort((a, b) => b.pNode.depth - a.pNode.depth);

      projectedNodes.forEach((n) => {
        const isSelected = n.idx === selectedIdx;
        const nodeColor = isSelected ? '#38bdf8' : n.isAlert ? '#fb7185' : '#38bdf8';

        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.shadowColor = '#f97316';
        ctx.shadowBlur = isSelected ? 18 : 10;
        ctx.strokeStyle = isSelected ? '#fed7aa' : 'rgba(251, 113, 133, 0.78)';
        ctx.lineWidth = isSelected ? 2.5 : 1.5;
        ctx.beginPath();
        ctx.moveTo(n.pRoot.sx, n.pRoot.sy);
        ctx.quadraticCurveTo(n.pMid.sx, n.pMid.sy, n.pNode.sx, n.pNode.sy);
        ctx.stroke();

        if (!reducedMotion) {
          const pu = (t * 0.65 + n.idx * 0.21) % 1;
          const inv = 1 - pu;
          const px = inv * inv * n.pRoot.sx + 2 * inv * pu * n.pMid.sx + pu * pu * n.pNode.sx;
          const py = inv * inv * n.pRoot.sy + 2 * inv * pu * n.pMid.sy + pu * pu * n.pNode.sy;
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#fef08a';
          ctx.fill();
        }

        // Volumetric glowing cyan/crimson energy sphere with concentric halo
        const orbR = Math.max(8, Math.min(18, 9 + n.count * 2.2)) * (isSelected ? 1.25 : 1);
        const orbGrad = ctx.createRadialGradient(n.pNode.sx, n.pNode.sy, 1, n.pNode.sx, n.pNode.sy, orbR * 2.2);
        orbGrad.addColorStop(0, '#ffffff');
        orbGrad.addColorStop(0.32, nodeColor);
        orbGrad.addColorStop(0.65, 'rgba(14, 165, 233, 0.28)');
        orbGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = orbGrad;
        ctx.beginPath();
        ctx.arc(n.pNode.sx, n.pNode.sy, orbR * 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Suspended holographic glass data card with mini telemetry bars
        const shortLabel = `${n.title.slice(0, 18)}${n.title.length > 18 ? '…' : ''} (${n.count})`;
        ctx.font = '600 10px ui-monospace, SFMono-Regular, Menlo, monospace';
        const tw = ctx.measureText(shortLabel).width + 16;
        const cardX = n.pNode.sx + (n.pNode.sx >= w * 0.5 ? 14 : -tw - 14);
        const cardY = n.pNode.sy - 16;

        ctx.save();
        ctx.fillStyle = isSelected ? 'rgba(9, 17, 34, 0.92)' : 'rgba(9, 17, 34, 0.72)';
        ctx.strokeStyle = isSelected ? 'rgba(56, 189, 248, 0.85)' : 'rgba(148, 163, 184, 0.35)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(cardX, cardY, tw, 32, 6);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = isSelected ? '#e0f2fe' : '#cbd5e1';
        ctx.textAlign = 'left';
        ctx.fillText(shortLabel, cardX + 8, cardY + 13);

        // Micro telemetry progress bar inside glass card
        ctx.fillStyle = 'rgba(56, 189, 248, 0.2)';
        ctx.fillRect(cardX + 8, cardY + 20, tw - 16, 4);
        ctx.fillStyle = isSelected ? '#38bdf8' : '#fb7185';
        ctx.fillRect(cardX + 8, cardY + 20, Math.max(8, (tw - 16) * Math.min(1, 0.25 + n.count * 0.2)), 4);
        ctx.restore();
      });

      if (!reducedMotion) {
        rafId = requestAnimationFrame(render);
      }
    };

    rafId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, [splits, selectedIdx, reducedMotion]);

  const activeSplit = splits[selectedIdx] || splits[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
      <div className="lg:col-span-2 relative rounded-xl overflow-hidden border border-rose-500/30 bg-slate-950 shadow-[0_0_44px_rgba(239,68,68,0.18)]">
        <canvas
          ref={canvasRef}
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
            camRef.current.targetYaw += dx * 0.01;
            camRef.current.targetPitch = Math.max(-0.45, Math.min(0.65, camRef.current.targetPitch + dy * 0.008));
          }}
          onMouseUp={() => { camRef.current.dragging = false; }}
          onMouseLeave={() => { camRef.current.dragging = false; }}
          className="w-full h-96 block cursor-grab active:cursor-grabbing"
          role="img"
          aria-label="Szklany rdzeń 3D pasm anomalii"
        />
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="rounded-full bg-slate-950/80 backdrop-blur-md border border-rose-400/35 px-2.5 py-0.5 text-[10px] font-mono text-rose-300">
            3D VOLUMETRIC GLASS CORE · PRZECIĄGNIJ BY OBRÓCIĆ
          </span>
          <button
            type="button"
            onClick={() => {
              camRef.current.targetYaw = 0.25;
              camRef.current.targetPitch = 0.14;
            }}
            className="pointer-events-auto p-1 rounded-md bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white"
            title="Resetuj kamerę rdzenia 3D"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Suspended HUD Inspector Panel for Selected Anomaly Band */}
      <div className="rounded-xl border border-sky-500/30 bg-slate-950/95 p-4 flex flex-col justify-between space-y-3 text-slate-200 shadow-[0_0_28px_rgba(14,165,233,0.12)]">
        <div className="space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-wider text-sky-400">
            Węzeł Rdzenia 3D
          </div>
          <div className="flex flex-wrap gap-1.5">
            {splits.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedIdx(idx)}
                className={`px-2 py-1 rounded-md text-[10.5px] font-mono border transition-colors ${
                  idx === selectedIdx
                    ? 'bg-rose-500/20 border-rose-400/60 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-sky-500/40'
                }`}
              >
                #{idx + 1} ({s.items.length})
              </button>
            ))}
          </div>
          {activeSplit && (
            <div className="pt-2 space-y-1.5">
              <h3 className="text-sm font-semibold text-white">{activeSplit.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{activeSplit.description}</p>
            </div>
          )}
        </div>

        <div className="border-t border-slate-800 pt-2.5 space-y-1.5 max-h-44 overflow-y-auto">
          {!activeSplit || activeSplit.items.length === 0 ? (
            <div className="text-xs text-slate-500 font-mono">Brak publikacji w tym węźle</div>
          ) : (
            activeSplit.items.map((item) => (
              <div
                key={item.id}
                className="text-xs text-sky-200/90 bg-slate-900/80 border border-slate-800 rounded px-2.5 py-1 truncate"
                title={item.title}
              >
                • {item.title}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
