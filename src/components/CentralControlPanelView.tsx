import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, LayoutGroup, useReducedMotion } from 'motion/react';
import {
  Search,
  RefreshCw,
  FileDown,
  Send,
  Sliders,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Server,
  Users,
  TrendingUp,
  Layers,
  Plus,
  Trash2,
  ArrowRight,
  Download,
  ShieldCheck,
  Zap,
  Globe,
} from 'lucide-react';
import {
  CHANNEL_LABELS,
  ANOMALY_LABELS,
  runOnlineAdaptivePredictiveModel,
  computePersonalizedAnomalySplits,
  calculateVolumetricCapacityPlan,
  generateSeoExecutivePdfReport,
  type SeoChannel,
  type AnomalyKind,
  type SeoContentAssetRecord,
  type SharedUserProfileRecord,
  type SeoReportScheduleRecord,
  type AnomalyThresholds,
  type VolumetricPlanInputs,
} from '../lib/seoPredictiveEngine';
import { triggerBlobDownload } from '../lib/export';
import type { User } from '../lib/firebase';
import { NextJs3dArchitectureDocPanel } from './NextJs3dArchitectureDocPanel';

interface ControlPlaneTelemetryPoint {
  timestamp: string;
  rssMemoryMb: number;
  heapUsedMb: number;
  cpuLoadPct: number;
  eventLoopLagMs: number;
  p95LatencyMs: number;
  requestsPerMinute: number;
  activeInstances: number;
}

interface ControlPlaneAutoScale {
  autoScaleEnabled: boolean;
  minInstances: number;
  maxInstances: number;
  currentInstances: number;
  targetLatencyMs: number;
  scaleUpLoadPct: number;
  maxBatchDocsPerInstance: number;
  activeQueueDepth: number;
  lastScaledAt: string;
  lastScaleReason: string;
}

interface CloudFunctionEventItem {
  id: string;
  functionName: string;
  triggerType: string;
  source: string;
  timestamp: string;
  executionMs: number;
  payloadBytes: number;
  status: 'succeeded' | 'warning' | 'failed';
  summary: string;
}

interface ReportedErrorItem {
  id: string;
  fingerprint: string;
  subsystem: 'SEO/AEO AI' | 'Firestore Sync' | 'Cloud Functions' | 'PDF Mailer' | 'UI Runtime';
  severity: 'critical' | 'warning' | 'info';
  message: string;
  stackPreview: string;
  routeOrComponent: string;
  occurrences: number;
  firstSeenAt: string;
  lastSeenAt: string;
  status: 'open' | 'resolved';
}

interface EmailReceiptItem {
  id: string;
  scheduleName: string;
  recipients: string[];
  cadence: string;
  dispatchedAt: string;
  pdfFileName: string;
  pdfSizeBytes: number;
  sha256Digest: string;
  transportMode: string;
  statusDetail: string;
  emlContent: string;
}

interface ControlPlaneSnapshot {
  serverTimestamp: string;
  uptimeSeconds: number;
  nodeVersion: string;
  latestTelemetry: ControlPlaneTelemetryPoint;
  latencyStats: {
    p50Ms: number;
    p95Ms: number;
    p99Ms: number;
    avgMs: number;
    requestsPerMinute: number;
    bytesLast2Min: number;
  };
  telemetryHistory: ControlPlaneTelemetryPoint[];
  autoScale: ControlPlaneAutoScale;
  cloudEvents: CloudFunctionEventItem[];
  reportedErrors: ReportedErrorItem[];
  emailReceipts: EmailReceiptItem[];
}

interface AIOptimizationResult {
  optimizedKeyword: string;
  secondaryKeywords: string[];
  seoScore: number;
  aeoScore: number;
  projectedReachLiftPct: number;
  anomalyClassification: AnomalyKind;
  optimizedContentExcerpt: string;
  socialMediaAdaptation: string;
  reachAndStrategyInsights: string;
  schemaJsonLdSnippet: string;
}

interface CentralControlPanelViewProps {
  user: User | null;
  onSignInGoogle: () => Promise<string | null>;
  onSignOut: () => Promise<void>;
  seoAssets: SeoContentAssetRecord[];
  onCreateSeoAsset: (
    draft: Omit<SeoContentAssetRecord, 'id' | 'ownerId' | 'collaboratorEmails'>
  ) => Promise<void>;
  onUpdateSeoAsset: (
    assetId: string,
    patch: Partial<Omit<SeoContentAssetRecord, 'id' | 'ownerId' | 'collaboratorEmails'>>
  ) => Promise<void>;
  onDeleteSeoAsset: (assetId: string) => Promise<void>;
  sharedProfiles: SharedUserProfileRecord[];
  myProfile: SharedUserProfileRecord;
  onSaveMyProfile: (
    draft: Omit<SharedUserProfileRecord, 'id' | 'ownerId'>
  ) => Promise<void>;
  reportSchedule: SeoReportScheduleRecord;
  onSaveReportSchedule: (
    draft: Omit<SeoReportScheduleRecord, 'id' | 'ownerId'>
  ) => Promise<void>;
  onCreateFollowUpTask: (title: string, description: string, tags: string[]) => Promise<void>;
  onNavigateModule: (
    target: 'kanban' | 'calendar' | 'clinic_devices' | 'analytics' | 'ai_security' | 'team'
  ) => void;
}

type ControlSubTab =
  | 'seo_aeo_dashboard'
  | 'adaptive_anomalies'
  | 'cyclical_pdf_email'
  | 'cloud_volumetric_ops'
  | 'profiles_auth'
  | 'nextjs_3d_docs';

const SUB_TABS: Array<{ id: ControlSubTab; label: string }> = [
  { id: 'seo_aeo_dashboard', label: 'Silnik AI SEO, AEO i Zasięg' },
  { id: 'adaptive_anomalies', label: 'Model Uczący i Podziały Anomalii' },
  { id: 'cyclical_pdf_email', label: 'Cykliczne Raporty PDF i E-mail' },
  { id: 'cloud_volumetric_ops', label: 'Plan Objętościowy, Cloud i Skalowanie' },
  { id: 'profiles_auth', label: 'Autoryzacja i Profile Firestore' },
  { id: 'nextjs_3d_docs', label: 'Dokumentacja 3D & Next.js' },
];

export const CentralControlPanelView: React.FC<CentralControlPanelViewProps> = ({
  user,
  onSignInGoogle,
  onSignOut,
  seoAssets,
  onCreateSeoAsset,
  onUpdateSeoAsset,
  onDeleteSeoAsset,
  sharedProfiles,
  myProfile,
  onSaveMyProfile,
  reportSchedule,
  onSaveReportSchedule,
  onCreateFollowUpTask,
  onNavigateModule,
}) => {
  const prefersReducedMotion = useReducedMotion();

  // Synchronized compositor-only animation transition (<= 180ms routine feedback budget)
  const syncTransition = useMemo(
    () =>
      prefersReducedMotion
        ? { duration: 0 }
        : { duration: 0.18, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    [prefersReducedMotion]
  );

  // Synchronized pulse key so multi-element blocks animate together in exact unison on model/tab updates
  const [syncWaveKey, setSyncWaveKey] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<ControlSubTab>('seo_aeo_dashboard');
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  // --- Advanced Filtering State ---
  const [searchQuery, setSearchQuery] = useState('');
  const [channelFilter, setChannelFilter] = useState<'all' | SeoChannel>('all');
  const [anomalyFilter, setAnomalyFilter] = useState<'all' | AnomalyKind>('all');
  const [minStrengthFilter, setMinStrengthFilter] = useState<number>(0);

  // --- Real-Time Online Learning & Stale-Data Decay Parameters ---
  const [forgettingLambda, setForgettingLambda] = useState<number>(0.91);
  const [staleHalfLifeDays, setStaleHalfLifeDays] = useState<number>(21);
  const [onlineLearningStep, setOnlineLearningStep] = useState<number>(1);

  // Hypothetical Live Scenario Predictor inputs
  const [simSeo, setSimSeo] = useState<number>(88);
  const [simAeo, setSimAeo] = useState<number>(90);
  const [simAgeDays, setSimAgeDays] = useState<number>(3);
  const [simSocialReach, setSimSocialReach] = useState<number>(22000);

  // --- Personalized Anomaly Split Thresholds ---
  const [anomalyThresholds, setAnomalyThresholds] = useState<AnomalyThresholds>({
    minAeoScoreThreshold: 70,
    minPredictiveStrengthThreshold: 62,
    viralSocialRatioMultiplier: 1.8,
  });

  // --- Volumetric Data & Concurrency Capacity Planner Inputs ---
  const [volumetricInputs, setVolumetricInputs] = useState<VolumetricPlanInputs>({
    monitoredPagesCount: 240,
    blogPostsPerMonth: 36,
    socialPostsPerDay: 16,
    keywordsPerAsset: 12,
    scanIntervalMinutes: 30,
    avgPayloadKb: 26,
  });

  // --- AI SEO/AEO Active Optimization State ---
  const [optimizingAssetId, setOptimizingAssetId] = useState<string | null>(null);
  const [aiResultsByAsset, setAiResultsByAsset] = useState<Record<string, AIOptimizationResult>>({});
  const [aiError, setAiError] = useState<string | null>(null);

  // --- New Monitored Content Asset Form ---
  const [isAddAssetOpen, setIsAddAssetOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newChannel, setNewChannel] = useState<SeoChannel>('blog_post');
  const [newSlug, setNewSlug] = useState('');
  const [newKeyword, setNewKeyword] = useState('');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newOrgReach, setNewOrgReach] = useState('4500');
  const [newSocReach, setNewSocReach] = useState('2100');

  // --- Cyclical PDF & Email Schedule Form State ---
  const [schedName, setSchedName] = useState(reportSchedule.reportName);
  const [schedEmailsInput, setSchedEmailsInput] = useState(
    reportSchedule.recipientEmails.join(', ')
  );
  const [schedCadence, setSchedCadence] = useState<'daily' | 'weekly' | 'monthly'>(
    reportSchedule.cadence
  );
  const [schedScope, setSchedScope] = useState<'all' | 'web_and_blog' | 'social_only'>(
    reportSchedule.channelScope
  );
  const [schedIncludeAnomalies, setSchedIncludeAnomalies] = useState<boolean>(
    reportSchedule.includeAnomalyAlerts
  );
  const [schedActive, setSchedActive] = useState<boolean>(reportSchedule.isActive);
  const [isDispatchingEmail, setIsDispatchingEmail] = useState(false);

  useEffect(() => {
    setSchedName(reportSchedule.reportName);
    setSchedEmailsInput(reportSchedule.recipientEmails.join(', '));
    setSchedCadence(reportSchedule.cadence);
    setSchedScope(reportSchedule.channelScope);
    setSchedIncludeAnomalies(reportSchedule.includeAnomalyAlerts);
    setSchedActive(reportSchedule.isActive);
  }, [reportSchedule]);

  // --- Shared Firestore Profile Form State ---
  const [profHandle, setProfHandle] = useState(myProfile.handle);
  const [profDisplayName, setProfDisplayName] = useState(myProfile.displayName);
  const [profRole, setProfRole] = useState(myProfile.roleTitle);
  const [profDomain, setProfDomain] = useState(myProfile.organizationOrDomain);
  const [profBio, setProfBio] = useState(myProfile.bio);
  const [profSpecsInput, setProfSpecsInput] = useState(myProfile.specialties.join(', '));
  const [profPublic, setProfPublic] = useState(myProfile.isPubliclyShared);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  useEffect(() => {
    setProfHandle(myProfile.handle);
    setProfDisplayName(myProfile.displayName);
    setProfRole(myProfile.roleTitle);
    setProfDomain(myProfile.organizationOrDomain);
    setProfBio(myProfile.bio);
    setProfSpecsInput(myProfile.specialties.join(', '));
    setProfPublic(myProfile.isPubliclyShared);
  }, [myProfile]);

  // --- Server Control Plane State (Telemetry, Auto-Scaler, Cloud Functions, Errors) ---
  const [controlPlane, setControlPlane] = useState<ControlPlaneSnapshot | null>(null);
  const [isRunningBurst, setIsRunningBurst] = useState(false);
  const [burstDocsInput, setBurstDocsInput] = useState('220');

  const fetchControlPlane = useCallback(async () => {
    try {
      const resp = await fetch('/api/system/control-plane');
      if (!resp.ok) return;
      const data = (await resp.json()) as ControlPlaneSnapshot;
      setControlPlane(data);
    } catch {
      // Offline mode keeps last known snapshot
    }
  }, []);

  useEffect(() => {
    fetchControlPlane();
    const id = window.setInterval(fetchControlPlane, 12_000);
    return () => window.clearInterval(id);
  }, [fetchControlPlane]);

  // Capture unhandled client errors into centralized error reporter
  useEffect(() => {
    const onWindowError = (event: ErrorEvent) => {
      fetch('/api/system/errors/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subsystem: 'UI Runtime',
          severity: 'warning',
          message: event.message || 'Nieobsłużony wyjątek przeglądarki',
          routeOrComponent: window.location.pathname,
          stackPreview: event.error?.stack || `${event.filename}:${event.lineno}`,
        }),
      }).catch(() => {});
    };
    window.addEventListener('error', onWindowError);
    return () => window.removeEventListener('error', onWindowError);
  }, []);

  // --- Computed Online Model, Anomaly Splits & Volumetric Capacity ---
  const modelOutput = useMemo(
    () =>
      runOnlineAdaptivePredictiveModel(
        seoAssets,
        forgettingLambda,
        staleHalfLifeDays,
        onlineLearningStep
      ),
    [seoAssets, forgettingLambda, staleHalfLifeDays, onlineLearningStep]
  );

  const anomalySplits = useMemo(
    () => computePersonalizedAnomalySplits(seoAssets, modelOutput.evaluations, anomalyThresholds),
    [seoAssets, modelOutput.evaluations, anomalyThresholds]
  );

  const volumetricPlan = useMemo(
    () => calculateVolumetricCapacityPlan(volumetricInputs),
    [volumetricInputs]
  );

  // Live custom scenario prediction using learned online weights
  const simulatedPrediction = useMemo(() => {
    const freshness = Math.pow(0.5, Math.max(0, simAgeDays) / Math.max(3, staleHalfLifeDays));
    const feats = [
      simSeo / 100,
      simAeo / 100,
      freshness,
      Math.min(1, Math.log10(1 + Math.max(0, simSocialReach)) / 5),
      0.6,
    ];
    const score = feats.reduce(
      (sum, f, idx) => sum + f * (modelOutput.weights[idx]?.weight ?? 0.2),
      0
    );
    return {
      strength: Math.min(99, Math.max(10, Math.round(score * 108))),
      freshnessPct: Math.round(freshness * 100),
    };
  }, [simSeo, simAeo, simAgeDays, simSocialReach, staleHalfLifeDays, modelOutput.weights]);

  // Filtered monitored content assets
  const filteredAssets = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return seoAssets.filter((asset) => {
      const evalPred = modelOutput.evaluations[asset.id]?.predictedStrength ?? asset.predictiveStrength;
      if (channelFilter !== 'all' && asset.channel !== channelFilter) return false;
      if (anomalyFilter !== 'all' && asset.anomalyType !== anomalyFilter) return false;
      if (evalPred < minStrengthFilter) return false;
      if (!q) return true;
      return (
        asset.title.toLowerCase().includes(q) ||
        asset.primaryKeyword.toLowerCase().includes(q) ||
        asset.urlOrSlug.toLowerCase().includes(q) ||
        asset.contentExcerpt.toLowerCase().includes(q)
      );
    });
  }, [seoAssets, searchQuery, channelFilter, anomalyFilter, minStrengthFilter, modelOutput.evaluations]);

  // Aggregate KPI metrics
  const kpiSummary = useMemo(() => {
    if (seoAssets.length === 0) {
      return { avgSeo: 0, avgAeo: 0, avgPred: 0, totalOrganic: 0, totalSocial: 0 };
    }
    const avgSeo = Math.round(seoAssets.reduce((s, a) => s + a.seoScore, 0) / seoAssets.length);
    const avgAeo = Math.round(seoAssets.reduce((s, a) => s + a.aeoScore, 0) / seoAssets.length);
    const avgPred = Math.round(
      seoAssets.reduce(
        (s, a) => s + (modelOutput.evaluations[a.id]?.predictedStrength ?? a.predictiveStrength),
        0
      ) / seoAssets.length
    );
    const totalOrganic = seoAssets.reduce((s, a) => s + a.organicReach, 0);
    const totalSocial = seoAssets.reduce((s, a) => s + a.socialReach, 0);
    return { avgSeo, avgAeo, avgPred, totalOrganic, totalSocial };
  }, [seoAssets, modelOutput.evaluations]);

  // Channel Reach Chart Aggregation
  const channelReachBars = useMemo(() => {
    const channels: SeoChannel[] = ['web_page', 'blog_post', 'linkedin', 'instagram', 'x_social'];
    const rows = channels.map((ch) => {
      const matching = seoAssets.filter((a) => a.channel === ch);
      const organic = matching.reduce((s, a) => s + a.organicReach, 0);
      const social = matching.reduce((s, a) => s + a.socialReach, 0);
      return { channel: ch, label: CHANNEL_LABELS[ch], organic, social, total: organic + social };
    });
    const maxVal = Math.max(1000, ...rows.map((r) => r.total));
    return rows.map((r) => ({
      ...r,
      organicPct: Math.round((r.organic / maxVal) * 100),
      socialPct: Math.round((r.social / maxVal) * 100),
    }));
  }, [seoAssets]);

  // --- Handlers ---
  const handleRunAIOptimizeAsset = async (asset: SeoContentAssetRecord) => {
    setOptimizingAssetId(asset.id);
    setAiError(null);
    try {
      const resp = await fetch('/api/seo-control/analyze-and-optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: asset.title,
          channel: asset.channel,
          urlOrSlug: asset.urlOrSlug,
          contentExcerpt: asset.contentExcerpt,
          primaryKeyword: asset.primaryKeyword,
          keywordHistory: asset.keywordHistory,
          organicReach: asset.organicReach,
          socialReach: asset.socialReach,
        }),
      });
      const data = await resp.json();
      if (!resp.ok) {
        throw new Error(data.error || 'Nie udało się wykonać analizy AI SEO/AEO.');
      }
      setAiResultsByAsset((prev) => ({
        ...prev,
        [asset.id]: data as AIOptimizationResult,
      }));
      setSyncWaveKey((k) => k + 1);
      fetchControlPlane();
    } catch (err: unknown) {
      setAiError(
        err instanceof Error ? err.message : 'Błąd komunikacji z silnikiem AI SEO/AEO.'
      );
    } finally {
      setOptimizingAssetId(null);
    }
  };

  const handleApplyAIOptimization = async (
    asset: SeoContentAssetRecord,
    result: AIOptimizationResult
  ) => {
    const nextHistory = [
      ...asset.keywordHistory.filter((k) => k !== result.optimizedKeyword),
      result.optimizedKeyword,
    ].slice(-10);

    const validAnomaly: AnomalyKind = [
      'none',
      'reach_drop',
      'keyword_decay',
      'aeo_gap',
      'viral_spike',
    ].includes(result.anomalyClassification)
      ? result.anomalyClassification
      : 'none';

    const liftedOrganic = Math.round(
      asset.organicReach * (1 + Math.max(0, Math.min(80, result.projectedReachLiftPct)) / 200)
    );

    await onUpdateSeoAsset(asset.id, {
      previousKeyword: asset.primaryKeyword,
      primaryKeyword: result.optimizedKeyword.slice(0, 140),
      keywordHistory: nextHistory,
      contentExcerpt: result.optimizedContentExcerpt.slice(0, 3000),
      seoScore: Math.min(100, Math.max(0, Math.round(result.seoScore))),
      aeoScore: Math.min(100, Math.max(0, Math.round(result.aeoScore))),
      predictiveStrength: Math.min(
        100,
        Math.max(0, Math.round((result.seoScore + result.aeoScore) / 2))
      ),
      organicReach: liftedOrganic,
      anomalyType: validAnomaly === 'keyword_decay' ? 'none' : validAnomaly,
      aiRecommendation: result.reachAndStrategyInsights.slice(0, 1200),
      daysSinceLastRefresh: 0,
    });

    setSyncWaveKey((k) => k + 1);
    setStatusNotice(
      `Zaktualizowano frazę kluczową w czasie dla „${asset.title}” -> „${result.optimizedKeyword}”.`
    );
  };

  const handleAddMonitoredAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newKeyword.trim() || !newExcerpt.trim()) return;

    await onCreateSeoAsset({
      title: newTitle.trim().slice(0, 180),
      channel: newChannel,
      urlOrSlug: newSlug.trim().slice(0, 240) || '/nowa-publikacja',
      contentExcerpt: newExcerpt.trim().slice(0, 3000),
      primaryKeyword: newKeyword.trim().slice(0, 140),
      previousKeyword: '',
      keywordHistory: [newKeyword.trim().slice(0, 140)],
      seoScore: 72,
      aeoScore: 68,
      predictiveStrength: 70,
      organicReach: Math.max(0, Number(newOrgReach) || 0),
      socialReach: Math.max(0, Number(newSocReach) || 0),
      engagementRate: 4.5,
      anomalyType: 'none',
      aiRecommendation: 'Nowo dodany zasób — uruchom analizę AI SEO/AEO, aby zoptymalizować frazę i blok odpowiedzi.',
      daysSinceLastRefresh: 0,
    });

    setNewTitle('');
    setNewSlug('');
    setNewKeyword('');
    setNewExcerpt('');
    setIsAddAssetOpen(false);
    setSyncWaveKey((k) => k + 1);
    setStatusNotice('Dodano nowy monitorowany zasób treści do silnika SEO & AEO.');
  };

  const handleSaveAndDispatchCyclicalReport = async (dispatchEmailNow: boolean) => {
    const emails = schedEmailsInput
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter((s) => s.length >= 3 && s.includes('@'))
      .slice(0, 10);

    if (emails.length === 0) {
      setStatusNotice('Wpisz co najmniej jeden poprawny adres e-mail odbiorcy raportu.');
      return;
    }

    const scopedAssets = seoAssets.filter((a) => {
      if (schedScope === 'web_and_blog') {
        return a.channel === 'web_page' || a.channel === 'blog_post';
      }
      if (schedScope === 'social_only') {
        return a.channel === 'linkedin' || a.channel === 'instagram' || a.channel === 'x_social';
      }
      return true;
    });

    const cadenceDays = schedCadence === 'daily' ? 1 : schedCadence === 'weekly' ? 7 : 30;
    const nextIso = new Date(Date.now() + cadenceDays * 86400_000).toISOString().slice(0, 16);
    const nowIso = new Date().toISOString().slice(0, 16);

    await onSaveReportSchedule({
      reportName: schedName.trim().slice(0, 140) || 'Cykliczny Raport SEO, AEO i Zasięgu',
      recipientEmails: emails,
      cadence: schedCadence,
      channelScope: schedScope,
      includeAnomalyAlerts: schedIncludeAnomalies,
      isActive: schedActive,
      lastDispatchedAt: dispatchEmailNow ? nowIso : reportSchedule.lastDispatchedAt,
      nextRunAt: nextIso,
    });

    if (!dispatchEmailNow) {
      setStatusNotice(`Zapisano harmonogram cykliczny (${schedCadence}) dla ${emails.join(', ')}.`);
      return;
    }

    setIsDispatchingEmail(true);
    try {
      const pdfResult = generateSeoExecutivePdfReport({
        reportTitle: schedName.trim() || 'Cykliczny Raport SEO, AEO i Zasiegu',
        assets: scopedAssets,
        modelOutput,
        volumetricPlan,
        downloadImmediately: true,
      });

      const anomalySummaryText = schedIncludeAnomalies
        ? anomalySplits
            .filter((s) => s.id !== 'none' && s.items.length > 0)
            .map((s) => `- ${s.title}: ${s.items.length} zasobów`)
            .join('\n')
        : 'Alerty anomalii pominięte zgodnie z konfiguracją.';

      const resp = await fetch('/api/seo-control/dispatch-report-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scheduleName: schedName.trim(),
          recipients: emails,
          cadence: schedCadence,
          pdfFileName: pdfResult.fileName,
          pdfBase64: pdfResult.pdfBase64,
          summaryHighlights: `Średnie SEO: ${kpiSummary.avgSeo}/100 | Średnie AEO: ${kpiSummary.avgAeo}/100 | Średnia Siła Wskazująca: ${kpiSummary.avgPred}/100\nPodziały anomalii:\n${anomalySummaryText}`,
        }),
      });
      const payload = await resp.json();
      if (!resp.ok) {
        throw new Error(payload.error || 'Błąd wysyłki raportu PDF.');
      }
      await fetchControlPlane();
      setStatusNotice(
        `Pobrano raport PDF (${pdfResult.fileName}) oraz wysłano podsumowanie na: ${emails.join(', ')}.`
      );
    } catch (err: unknown) {
      setStatusNotice(
        err instanceof Error ? err.message : 'Wystąpił błąd podczas generowania lub wysyłki PDF.'
      );
    } finally {
      setIsDispatchingEmail(false);
    }
  };

  const handleApplyRecommendedAutoScale = async () => {
    try {
      await fetch('/api/system/autoscale/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          autoScaleEnabled: true,
          minInstances: Math.max(2, Math.floor(volumetricPlan.recommendedWorkerInstances / 2)),
          maxInstances: Math.max(4, volumetricPlan.recommendedWorkerInstances * 2),
          maxBatchDocsPerInstance: Math.max(
            15,
            Math.ceil(
              volumetricPlan.concurrentDocsPerCycle /
                Math.max(1, volumetricPlan.recommendedWorkerInstances)
            )
          ),
        }),
      });
      await fetchControlPlane();
      setSyncWaveKey((k) => k + 1);
      setStatusNotice(
        `Zastosowano plan objętościowy do Auto-Scalera (rekomendowana pula: ${volumetricPlan.recommendedWorkerInstances} instancji).`
      );
    } catch {
      setStatusNotice('Nie udało się zaktualizować konfiguracji Auto-Scalera.');
    }
  };

  const handleRunStressBurst = async () => {
    setIsRunningBurst(true);
    try {
      const docsCount = Math.min(1200, Math.max(20, Number(burstDocsInput) || 220));
      const resp = await fetch('/api/system/autoscale/burst', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ concurrentDocuments: docsCount }),
      });
      const data = await resp.json();
      if (resp.ok && data.controlPlane) {
        setControlPlane(data.controlPlane as ControlPlaneSnapshot);
        setSyncWaveKey((k) => k + 1);
        setStatusNotice(
          `Przetworzono równolegle ${data.burstResult.processedDocuments} dokumentów w ${data.burstResult.elapsedMs} ms (${data.burstResult.throughputDocsPerSec} dok./s, szczyt instancji: ${data.burstResult.peakInstances}).`
        );
      }
    } finally {
      setIsRunningBurst(false);
    }
  };

  const handleTriggerDiagnosticError = async () => {
    await fetch('/api/system/errors/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subsystem: 'SEO/AEO AI',
        severity: 'warning',
        message: 'Symulowany alert przekroczenia czasu indeksowania semantycznego JSON-LD (>280ms)',
        routeOrComponent: '/control-center/seo-indexer',
        stackPreview: 'at verifyStructuredDataGraph (seoIndexer.ts:142:19)',
      }),
    });
    await fetchControlPlane();
    setStatusNotice('Zarejestrowano testowe zgłoszenie w Centralnym Systemie Raportowania Błędów.');
  };

  const handleResolveError = async (errorId: string) => {
    await fetch('/api/system/errors/resolve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ errorId }),
    });
    await fetchControlPlane();
  };

  const handleSaveProfileForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    try {
      const specs = profSpecsInput
        .split(',')
        .map((s) => s.trim().slice(0, 64))
        .filter(Boolean)
        .slice(0, 8);

      await onSaveMyProfile({
        handle:
          profHandle
            .trim()
            .replace(/[^a-zA-Z0-9_-]/g, '_')
            .slice(0, 60) || 'ekspert_seo',
        displayName: profDisplayName.trim().slice(0, 100) || 'Użytkownik Chronos',
        roleTitle: profRole.trim().slice(0, 100),
        organizationOrDomain: profDomain.trim().slice(0, 160),
        bio: profBio.trim().slice(0, 500),
        specialties: specs,
        isPubliclyShared: profPublic,
        sharedAssetsCount: seoAssets.length,
        avgPredictiveScore: kpiSummary.avgPred,
      });
      setStatusNotice(
        user
          ? 'Zapisano i zsynchronizowano Twój profil bez danych PII w kolekcji Firestore /publicProfiles.'
          : 'Zapisano profil lokalnie — zaloguj się przez Firebase Auth, aby udostępnić profil w chmurze Firestore.'
      );
    } finally {
      setIsSavingProfile(false);
    }
  };

  // Synchronized multi-element Framer Motion variants (all elements animate in lockstep)
  const syncCardVariants = {
    initial: prefersReducedMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 8, scale: 0.992 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 },
  };

  return (
    <div className="space-y-6">
      {/* Contextual Header & Quick Cross-Module Control Strip */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>Centralny Panel Sterowania</span>
            <span aria-hidden="true">·</span>
            <span>Silnik AI SEO & AEO</span>
            <span aria-hidden="true">·</span>
            <span>Model Uczący Online (λ={forgettingLambda})</span>
            <span aria-hidden="true">·</span>
            <span>Cloud Functions v2 & Auto-Scaler</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 text-balance">
            Centrum Inteligencji Treści SEO/AEO, Predykcji Zasięgu i Infrastruktury
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            Monitoruj treści na stronie, blogu i w mediach społecznościowych, automatycznie optymalizuj frazy kluczowe w czasie, analizuj wygaszanie nieaktualnych danych oraz zarządzaj raportami PDF, profilami Firestore i skalowaniem.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setOnlineLearningStep((s) => s + 1);
              setSyncWaveKey((k) => k + 1);
              setStatusNotice(
                `Zsynchronizowano wagi modelu predykcyjnego (R²=${modelOutput.modelR2Fit}, wygaszono ${modelOutput.attenuatedStaleCount} nieaktualnych obserwacji).`
              );
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-100 transition-colors whitespace-nowrap shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
            Przelicz Model Online
          </button>
          <button
            type="button"
            onClick={() => setIsAddAssetOpen((v) => !v)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            Monitoruj Nową Treść / Post
          </button>
        </div>
      </div>

      {statusNotice && (
        <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 text-xs text-slate-800 dark:text-slate-200">
          <span>{statusNotice}</span>
          <button
            type="button"
            onClick={() => setStatusNotice(null)}
            className="text-slate-500 hover:text-slate-900 dark:hover:text-white font-semibold whitespace-nowrap shrink-0"
          >
            Zamknij
          </button>
        </div>
      )}

      {/* Synchronized 4-Metric Executive Row (Simultaneous Multi-Element Motion) */}
      <motion.div
        key={`kpi-wave-${syncWaveKey}`}
        initial="initial"
        animate="animate"
        variants={{
          initial: {},
          animate: { transition: { staggerChildren: 0 } },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
      >
        {[
          {
            title: 'Średni Wynik SEO Technicznego',
            value: `${kpiSummary.avgSeo}/100`,
            sub: `${seoAssets.length} monitorowanych stron i postów`,
            accent: 'text-slate-900 dark:text-white',
          },
          {
            title: 'Gotowość Cytowań AEO (Silniki AI)',
            value: `${kpiSummary.avgAeo}/100`,
            sub: `Próg alertu luki AEO: ${anomalyThresholds.minAeoScoreThreshold} pkt`,
            accent: 'text-blue-600 dark:text-sky-400',
          },
          {
            title: 'Łączny Zasięg (Organiczny + Social)',
            value: (kpiSummary.totalOrganic + kpiSummary.totalSocial).toLocaleString('pl-PL'),
            sub: `Org: ${kpiSummary.totalOrganic.toLocaleString('pl-PL')} · Social: ${kpiSummary.totalSocial.toLocaleString('pl-PL')}`,
            accent: 'text-emerald-600 dark:text-emerald-400',
          },
          {
            title: 'Siła Wskazująca Modelu Online',
            value: `${kpiSummary.avgPred}/100`,
            sub: `Dopasowanie R²=${modelOutput.modelR2Fit} · Wygaszone: ${modelOutput.attenuatedStaleCount}`,
            accent: 'text-amber-600 dark:text-amber-400',
          },
        ].map((kpi) => (
          <motion.div
            key={kpi.title}
            variants={syncCardVariants}
            transition={syncTransition}
            className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5"
          >
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {kpi.title}
            </div>
            <div className={`text-2xl font-bold font-mono tabular-nums ${kpi.accent}`}>
              {kpi.value}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono tabular-nums">
              {kpi.sub}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Sub-Console Segmented Navigation with Shared Framer Motion layoutId */}
      <LayoutGroup id="central-control-tabs">
        <div className="flex items-center gap-1.5 overflow-x-auto p-1.5 rounded-xl bg-slate-200/70 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          {SUB_TABS.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  setSyncWaveKey((k) => k + 1);
                }}
                className={`relative px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'text-slate-900 dark:text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="activeControlSubTabBg"
                    transition={syncTransition}
                    className="absolute inset-0 rounded-lg bg-white dark:bg-slate-800 shadow-xs border border-slate-200/80 dark:border-slate-700"
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </LayoutGroup>

      {/* Collapsible New Content Asset Form */}
      <AnimatePresence initial={false}>
        {isAddAssetOpen && (
          <motion.form
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={syncTransition}
            onSubmit={handleAddMonitoredAsset}
            className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Dodaj Stronę, Artykuł Blogowy lub Post Społecznościowy do Monitoringu SEO & AEO
              </h2>
              <button
                type="button"
                onClick={() => setIsAddAssetOpen(false)}
                className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                Anuluj
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Tytuł podstrony lub posta *
                </label>
                <input
                  type="text"
                  required
                  maxLength={180}
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Np. Jak wdrożyć automatyzację AEO w 2026"
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Kanał dystrybucji
                </label>
                <select
                  value={newChannel}
                  onChange={(e) => setNewChannel(e.target.value as SeoChannel)}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
                >
                  {Object.entries(CHANNEL_LABELS).map(([k, label]) => (
                    <option key={k} value={k}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Początkowa fraza kluczowa *
                </label>
                <input
                  type="text"
                  required
                  maxLength={140}
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  placeholder="Np. optymalizacja treści pod AI"
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Adres URL / Slug posta
                </label>
                <input
                  type="text"
                  maxLength={240}
                  value={newSlug}
                  onChange={(e) => setNewSlug(e.target.value)}
                  placeholder="/blog/automatyzacja-aeo"
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs font-mono text-slate-900 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Zasięg organiczny (wyświetlenia)
                </label>
                <input
                  type="number"
                  min={0}
                  value={newOrgReach}
                  onChange={(e) => setNewOrgReach(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs font-mono text-slate-900 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Zasięg społecznościowy (Social)
                </label>
                <input
                  type="number"
                  min={0}
                  value={newSocReach}
                  onChange={(e) => setNewSocReach(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs font-mono text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Monitorowana treść strony lub posta *
              </label>
              <textarea
                rows={3}
                required
                maxLength={3000}
                value={newExcerpt}
                onChange={(e) => setNewExcerpt(e.target.value)}
                placeholder="Wklej akapit otwierający podstronę, treść artykułu lub wpis na LinkedIn / Instagram..."
                className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold whitespace-nowrap shrink-0"
              >
                Zapisz i Rozpocznij Monitoring
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* TAB 1: SEO, AEO, Reach Charts & Temporal Keyword Optimizer */}
      <AnimatePresence mode="wait">
        {activeTab === 'seo_aeo_dashboard' && (
          <motion.div
            key="tab-seo-aeo"
            initial={syncCardVariants.initial}
            animate={syncCardVariants.animate}
            exit={syncCardVariants.exit}
            transition={syncTransition}
            className="space-y-6"
          >
            {/* Ciężkie wykresy 3D usunięte dla wyższej wydajności */}

            {/* Advanced Multi-Facet Filter Bar */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filtruj po frazie kluczowej, URL lub treści..."
                    className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 w-64"
                  />
                </div>

                <select
                  value={channelFilter}
                  onChange={(e) => setChannelFilter(e.target.value as 'all' | SeoChannel)}
                  className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200"
                >
                  <option value="all">Wszystkie kanały ({seoAssets.length})</option>
                  {Object.entries(CHANNEL_LABELS).map(([k, label]) => (
                    <option key={k} value={k}>
                      {label}
                    </option>
                  ))}
                </select>

                <select
                  value={anomalyFilter}
                  onChange={(e) => setAnomalyFilter(e.target.value as 'all' | AnomalyKind)}
                  className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200"
                >
                  <option value="all">Wszystkie stany anomalii</option>
                  {Object.entries(ANOMALY_LABELS).map(([k, label]) => (
                    <option key={k} value={k}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <label className="text-slate-600 dark:text-slate-400 whitespace-nowrap">
                  Min. Siła Wskazująca:{' '}
                  <span className="font-mono tabular-nums font-semibold text-slate-900 dark:text-white">
                    {minStrengthFilter} pkt
                  </span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={95}
                  step={5}
                  value={minStrengthFilter}
                  onChange={(e) => setMinStrengthFilter(Number(e.target.value))}
                  className="w-28 accent-blue-600"
                />
              </div>
            </div>

            {aiError && (
              <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300">
                {aiError}
              </div>
            )}

            {/* Monitored Content & Social Posts List with Temporal Keyword Evolution */}
            <div className="space-y-4">
              {filteredAssets.length === 0 ? (
                <div className="p-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-2">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    Brak zasobów spełniających wybrane kryteria filtrowania
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setChannelFilter('all');
                      setAnomalyFilter('all');
                      setMinStrengthFilter(0);
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-900 dark:bg-sky-500 text-white dark:text-slate-950 text-xs font-semibold"
                  >
                    Wyczyść filtry
                  </button>
                </div>
              ) : (
                filteredAssets.map((asset) => {
                  const evalItem = modelOutput.evaluations[asset.id];
                  const pred = evalItem ? evalItem.predictedStrength : asset.predictiveStrength;
                  const aiRes = aiResultsByAsset[asset.id];
                  const isRunning = optimizingAssetId === asset.id;

                  return (
                    <motion.article
                      key={asset.id}
                      initial={syncCardVariants.initial}
                      animate={syncCardVariants.animate}
                      transition={syncTransition}
                      className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                        <div className="space-y-1.5 max-w-3xl">
                          {/* Clean Unboxed Metadata Line (Zero-Pill Rule) */}
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                            <span className="font-semibold text-slate-800 dark:text-slate-200">
                              {CHANNEL_LABELS[asset.channel]}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono text-[11px]">{asset.urlOrSlug}</span>
                            <span aria-hidden="true">·</span>
                            <span
                              className={
                                asset.anomalyType === 'keyword_decay' ||
                                asset.anomalyType === 'reach_drop'
                                  ? 'text-red-600 dark:text-red-400 font-semibold'
                                  : asset.anomalyType === 'aeo_gap'
                                  ? 'text-amber-600 dark:text-amber-400 font-semibold'
                                  : asset.anomalyType === 'viral_spike'
                                  ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                                  : 'text-slate-500 dark:text-slate-400'
                              }
                            >
                              {ANOMALY_LABELS[asset.anomalyType]}
                            </span>
                            {evalItem?.isStaleObservation && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span className="text-amber-600 dark:text-amber-400 font-medium">
                                  Waga wygaszona (wsp. świeżości {evalItem.freshnessWeight})
                                </span>
                              </>
                            )}
                          </div>

                          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                            {asset.title}
                          </h3>

                          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                            {asset.contentExcerpt}
                          </p>

                          {/* Temporal Keyword Trajectory */}
                          <div className="pt-1 text-xs text-slate-600 dark:text-slate-300">
                            <span className="text-slate-500 dark:text-slate-400">
                              Ewolucja frazy kluczowej w czasie:{' '}
                            </span>
                            <span className="font-mono text-[11px] text-slate-700 dark:text-slate-300">
                              {asset.keywordHistory.join(' → ')}
                            </span>
                          </div>
                        </div>

                        {/* Right Numeric Metrics & AI Trigger */}
                        <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-3 shrink-0">
                          <div className="flex items-center gap-4 font-mono tabular-nums text-xs">
                            <div className="text-right">
                              <div className="text-[11px] text-slate-400">SEO / AEO</div>
                              <div className="font-bold text-slate-900 dark:text-white">
                                {asset.seoScore} / {asset.aeoScore}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-[11px] text-slate-400">Siła Pred.</div>
                              <div className="font-bold text-blue-600 dark:text-sky-400">
                                {pred}±{evalItem?.confidenceMargin ?? 3.2}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-[11px] text-slate-400">Zasięg 30d</div>
                              <div className="font-bold text-emerald-600 dark:text-emerald-400">
                                {(evalItem?.projected30dReach ?? asset.organicReach + asset.socialReach).toLocaleString('pl-PL')}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              disabled={isRunning}
                              onClick={() => handleRunAIOptimizeAsset(asset)}
                              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
                            >
                              <Zap className="w-3.5 h-3.5" />
                              {isRunning ? 'Analiza AI...' : 'Optymalizuj Frazę i AEO AI'}
                            </button>
                            <button
                              type="button"
                              onClick={() => onDeleteSeoAsset(asset.id)}
                              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-red-600 transition-colors"
                              title="Usuń z monitoringu"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <span>Wniosek zasięgowy: {asset.aiRecommendation}</span>
                        <button
                          type="button"
                          onClick={() => {
                            onCreateFollowUpTask(
                              `[SEO/AEO] Wdrożenie optymalizacji: ${asset.title.slice(0, 80)}`,
                              `Docelowa fraza kluczowa: ${asset.primaryKeyword}\nURL: ${asset.urlOrSlug}\nZalecenie: ${asset.aiRecommendation}`,
                              ['SEO', 'AEO', CHANNEL_LABELS[asset.channel]]
                            );
                            setStatusNotice('Utworzono zadanie wdrożeniowe na tablicy Kanban.');
                          }}
                          className="text-blue-600 dark:text-sky-400 hover:underline font-medium whitespace-nowrap shrink-0"
                        >
                          Przekaż do zadań Kanban →
                        </button>
                      </div>

                      {/* AI Optimization Result Drawer */}
                      {aiRes && (
                        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="text-xs font-semibold text-slate-900 dark:text-white">
                              Rekomendacja Silnika AI: Nowa fraza „{aiRes.optimizedKeyword}” (prognoza zasięgu +{aiRes.projectedReachLiftPct}%)
                            </div>
                            <button
                              type="button"
                              onClick={() => handleApplyAIOptimization(asset, aiRes)}
                              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold whitespace-nowrap shrink-0"
                            >
                              Zastosuj Nową Frazę i Treść
                            </button>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-xs">
                            <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
                              <div className="font-semibold text-slate-800 dark:text-slate-200">
                                Zoptymalizowany blok pod AEO i stronę/post:
                              </div>
                              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                {aiRes.optimizedContentExcerpt}
                              </p>
                              <div className="text-[11px] font-mono text-slate-500">
                                Frazy wspierające: {aiRes.secondaryKeywords.join(' · ')}
                              </div>
                            </div>

                            <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
                              <div className="font-semibold text-slate-800 dark:text-slate-200">
                                Adaptacja Social Media i Wnioski o Zasięgu:
                              </div>
                              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                {aiRes.socialMediaAdaptation}
                              </p>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                                {aiRes.reachAndStrategyInsights}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.article>
                  );
                })
              )}
            </div>
          </motion.div>
        )}

        {/* TAB 2: Real-Time Online Learning & Personalized Anomaly Splits */}
        {activeTab === 'adaptive_anomalies' && (
          <motion.div
            key="tab-adaptive-anomalies"
            initial={syncCardVariants.initial}
            animate={syncCardVariants.animate}
            exit={syncCardVariants.exit}
            transition={syncTransition}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 items-stretch">
              {/* Online Learning & Stale-Data Forgetting Controls */}
              <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Algorytm Uczący Się w Czasie Rzeczywistym i Wygaszanie Nieaktualnych Danych
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Regresja wykładnicza z czynnikiem zapominania (λ) osłabiającym przestarzałe sygnały fraz
                    </p>
                  </div>
                  <span className="font-mono tabular-nums text-xs font-semibold text-blue-600 dark:text-sky-400">
                    R² = {modelOutput.modelR2Fit}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600 dark:text-slate-300">
                        Współczynnik pamięci (λ)
                      </span>
                      <span className="font-mono tabular-nums font-semibold">
                        {forgettingLambda.toFixed(2)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0.75}
                      max={0.99}
                      step={0.01}
                      value={forgettingLambda}
                      onChange={(e) => {
                        setForgettingLambda(Number(e.target.value));
                        setSyncWaveKey((k) => k + 1);
                      }}
                      className="w-full accent-blue-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600 dark:text-slate-300">
                        Półokres dezaktualizacji (dni)
                      </span>
                      <span className="font-mono tabular-nums font-semibold">
                        {staleHalfLifeDays} dni
                      </span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={60}
                      step={1}
                      value={staleHalfLifeDays}
                      onChange={(e) => {
                        setStaleHalfLifeDays(Number(e.target.value));
                        setSyncWaveKey((k) => k + 1);
                      }}
                      className="w-full accent-blue-600"
                    />
                  </div>
                </div>

                <div className="space-y-2.5 pt-2">
                  {modelOutput.weights.map((w) => (
                    <div key={w.key} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-700 dark:text-slate-300">{w.label}</span>
                        <span className="font-mono tabular-nums text-slate-900 dark:text-white font-semibold">
                          {w.normalizedImpactPct.toFixed(1)}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={syncTransition}
                          style={{
                            width: `${Math.min(100, w.normalizedImpactPct * 2.2)}%`,
                            transformOrigin: 'left',
                          }}
                          className="h-full bg-blue-600 dark:bg-sky-400"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Predictive Strength Simulator */}
              <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Symulator Siły Wskazującej w Oparciu o Dane Wejściowe
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Sprawdź jak wiek publikacji i parametry SEO/AEO wpływają na predykcję zasięgu
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Wynik SEO</span>
                      <span className="font-mono tabular-nums font-semibold">{simSeo}/100</span>
                    </div>
                    <input
                      type="range"
                      min={20}
                      max={100}
                      value={simSeo}
                      onChange={(e) => setSimSeo(Number(e.target.value))}
                      className="w-full accent-blue-600"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Gotowość AEO</span>
                      <span className="font-mono tabular-nums font-semibold">{simAeo}/100</span>
                    </div>
                    <input
                      type="range"
                      min={20}
                      max={100}
                      value={simAeo}
                      onChange={(e) => setSimAeo(Number(e.target.value))}
                      className="w-full accent-emerald-600"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Wiek danych bez aktualizacji</span>
                      <span className="font-mono tabular-nums font-semibold">{simAgeDays} dni</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={90}
                      value={simAgeDays}
                      onChange={(e) => setSimAgeDays(Number(e.target.value))}
                      className="w-full accent-amber-600"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Impuls Social Reach</span>
                      <span className="font-mono tabular-nums font-semibold">
                        {simSocialReach.toLocaleString('pl-PL')}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100000}
                      step={1000}
                      value={simSocialReach}
                      onChange={(e) => setSimSocialReach(Number(e.target.value))}
                      className="w-full accent-blue-600"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Wyznaczona Siła Wskazująca (Predykcyjna)
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 font-mono tabular-nums">
                      Aktywna waga świeżości danych: {simulatedPrediction.freshnessPct}%
                    </div>
                  </div>
                  <div className="text-3xl font-bold font-mono tabular-nums text-blue-600 dark:text-sky-400">
                    {simulatedPrediction.strength}/100
                  </div>
                </div>
              </div>
            </div>

            {/* Personalized Anomaly Splits Controls & Buckets */}
            <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-blue-600 dark:text-sky-400" />
                    Spersonalizowane Podziały o Anomaliach
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Dostosuj progi czułości, aby dynamicznie podzielić publikacje według rodzaju odchylenia
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs">
                  <label className="flex items-center gap-2">
                    <span className="text-slate-600 dark:text-slate-400">Próg Luki AEO:</span>
                    <input
                      type="number"
                      min={30}
                      max={95}
                      value={anomalyThresholds.minAeoScoreThreshold}
                      onChange={(e) =>
                        setAnomalyThresholds((prev) => ({
                          ...prev,
                          minAeoScoreThreshold: Number(e.target.value) || 70,
                        }))
                      }
                      className="w-16 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-2 py-1 font-mono tabular-nums"
                    />
                  </label>
                  <label className="flex items-center gap-2">
                    <span className="text-slate-600 dark:text-slate-400">Min. Siła Pred.:</span>
                    <input
                      type="number"
                      min={20}
                      max={90}
                      value={anomalyThresholds.minPredictiveStrengthThreshold}
                      onChange={(e) =>
                        setAnomalyThresholds((prev) => ({
                          ...prev,
                          minPredictiveStrengthThreshold: Number(e.target.value) || 60,
                        }))
                      }
                      className="w-16 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-2 py-1 font-mono tabular-nums"
                    />
                  </label>
                  <label className="flex items-center gap-2">
                    <span className="text-slate-600 dark:text-slate-400">Mnożnik Viral:</span>
                    <input
                      type="number"
                      step={0.2}
                      min={1.2}
                      max={5}
                      value={anomalyThresholds.viralSocialRatioMultiplier}
                      onChange={(e) =>
                        setAnomalyThresholds((prev) => ({
                          ...prev,
                          viralSocialRatioMultiplier: Number(e.target.value) || 1.8,
                        }))
                      }
                      className="w-16 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-2 py-1 font-mono tabular-nums"
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">
                {anomalySplits.map((split) => (
                  <div
                    key={split.id}
                    className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                        {split.title}
                      </h3>
                      <span className="font-mono tabular-nums text-xs font-bold text-slate-700 dark:text-slate-300">
                        {split.items.length}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                      {split.description}
                    </p>
                    <div className="space-y-1.5 pt-1 border-t border-slate-200/70 dark:border-slate-800">
                      {split.items.length === 0 ? (
                        <div className="text-[11px] text-slate-400">Brak pozycji w tym paśmie</div>
                      ) : (
                        split.items.map((item) => (
                          <div
                            key={item.id}
                            className="text-[11px] text-slate-700 dark:text-slate-300 truncate"
                            title={item.title}
                          >
                            • {item.title}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 3: Cyclical PDF Summary Reports & Automated Email Dispatch */}
        {activeTab === 'cyclical_pdf_email' && (
          <motion.div
            key="tab-cyclical-pdf"
            initial={syncCardVariants.initial}
            animate={syncCardVariants.animate}
            exit={syncCardVariants.exit}
            transition={syncTransition}
            className="grid grid-cols-1 xl:grid-cols-2 gap-5 items-start"
          >
            <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <div>
                <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Konfiguracja Cyklicznych Raportów PDF z Wysyłką na E-mail
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Harmonogram zapisywany prywatnie w Firestore (/seoReportSchedules) i obsługiwany przez wyzwalacz serwerowy
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Nazwa raportu podsumowującego
                  </label>
                  <input
                    type="text"
                    maxLength={140}
                    value={schedName}
                    onChange={(e) => setSchedName(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Adresy e-mail odbiorców (oddzielone przecinkiem, maks. 10)
                  </label>
                  <input
                    type="text"
                    value={schedEmailsInput}
                    onChange={(e) => setSchedEmailsInput(e.target.value)}
                    placeholder="zarzad@firma.pl, marketing@firma.pl"
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs font-mono text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Cykl generowania i wysyłki
                    </label>
                    <select
                      value={schedCadence}
                      onChange={(e) =>
                        setSchedCadence(e.target.value as 'daily' | 'weekly' | 'monthly')
                      }
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
                    >
                      <option value="daily">Codziennie (08:00)</option>
                      <option value="weekly">Co tydzień (Poniedziałek)</option>
                      <option value="monthly">Co miesiąc (1. dzień miesiąca)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Zakres kanałów w raporcie PDF
                    </label>
                    <select
                      value={schedScope}
                      onChange={(e) =>
                        setSchedScope(
                          e.target.value as 'all' | 'web_and_blog' | 'social_only'
                        )
                      }
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
                    >
                      <option value="all">Wszystkie kanały (WWW + Blog + Social)</option>
                      <option value="web_and_blog">Tylko Strona WWW i Blog</option>
                      <option value="social_only">Tylko Media Społecznościowe</option>
                    </select>
                  </div>
                </div>

                <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={schedIncludeAnomalies}
                    onChange={(e) => setSchedIncludeAnomalies(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600"
                  />
                  <span>Dołącz tabelę spersonalizowanych podziałów anomalii i prognozę zasięgu</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={schedActive}
                    onChange={(e) => setSchedActive(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600"
                  />
                  <span>Aktywna automatyczna wysyłka cykliczna</span>
                </label>

                <div className="flex flex-wrap items-center gap-2.5 pt-2">
                  <button
                    type="button"
                    disabled={isDispatchingEmail}
                    onClick={() => handleSaveAndDispatchCyclicalReport(true)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-semibold whitespace-nowrap shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {isDispatchingEmail
                      ? 'Generowanie i wysyłka...'
                      : 'Wygeneruj PDF i Wyślij Teraz na E-mail'}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSaveAndDispatchCyclicalReport(false)}
                    className="px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 whitespace-nowrap shrink-0"
                  >
                    Zapisz Sam Harmonogram
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      generateSeoExecutivePdfReport({
                        reportTitle: schedName || 'Podsumowanie SEO, AEO i Zasiegu',
                        assets: seoAssets,
                        modelOutput,
                        volumetricPlan,
                        downloadImmediately: true,
                      });
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 whitespace-nowrap shrink-0"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    Pobierz PDF lokalnie
                  </button>
                </div>
              </div>
            </div>

            {/* Email Dispatch Receipts & RFC-5322 MIME Verification */}
            <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Rejestr Wysłanych Raportów Cyklicznych i Potwierdzeń SHA-256
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Następne uruchomienie harmonogramu: {reportSchedule.nextRunAt.replace('T', ' ')}
                  </p>
                </div>
              </div>

              {!controlPlane || controlPlane.emailReceipts.length === 0 ? (
                <div className="py-10 text-center text-xs text-slate-500 dark:text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-lg">
                  Brak wysłanych raportów w bieżącej sesji. Kliknij „Wygeneruj PDF i Wyślij Teraz na E-mail”, aby utworzyć i wysłać podsumowanie.
                </div>
              ) : (
                <div className="space-y-3">
                  {controlPlane.emailReceipts.map((rcpt) => (
                    <div
                      key={rcpt.id}
                      className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                          {rcpt.scheduleName}
                        </span>
                        <span className="font-mono tabular-nums text-[11px] text-slate-500">
                          {new Date(rcpt.dispatchedAt).toLocaleTimeString('pl-PL')}
                        </span>
                      </div>
                      <div className="text-slate-600 dark:text-slate-300">
                        Odbiorcy: {rcpt.recipients.join(', ')} · Załącznik: {rcpt.pdfFileName} (
                        {Math.round(rcpt.pdfSizeBytes / 1024)} KB)
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {rcpt.statusDetail}
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <span className="font-mono text-[10px] text-slate-400 truncate max-w-xs">
                          SHA-256: {rcpt.sha256Digest.slice(0, 24)}...
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const emlBlob = new Blob([rcpt.emlContent], {
                              type: 'message/rfc822',
                            });
                            triggerBlobDownload(emlBlob, `${rcpt.id}.eml`);
                          }}
                          className="flex items-center gap-1 text-blue-600 dark:text-sky-400 hover:underline font-medium whitespace-nowrap shrink-0"
                        >
                          <Download className="w-3 h-3" />
                          Pobierz pakiet .eml
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* TAB 4: Volumetric Capacity Planner, Cloud Functions v2, Real-Time Performance, Auto-Scaler & Error Reporter */}
        {activeTab === 'cloud_volumetric_ops' && (
          <motion.div
            key="tab-cloud-ops"
            initial={syncCardVariants.initial}
            animate={syncCardVariants.animate}
            exit={syncCardVariants.exit}
            transition={syncTransition}
            className="space-y-6"
          >
            {/* Section A: Volumetric Data & Concurrent Processing Capacity Planner */}
            <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-blue-600 dark:text-sky-400" />
                    Planowanie Objętościowe Równoczesnego Zbierania i Analizy Danych
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Kalkulacja przepustowości jednoczesnego okna analizy, tokenów AI, operacji Firestore i partycjonowania
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleApplyRecommendedAutoScale}
                  className="px-3.5 py-2 rounded-lg bg-slate-900 dark:bg-sky-500 text-white dark:text-slate-950 text-xs font-semibold whitespace-nowrap shrink-0"
                >
                  Zastosuj Wyliczoną Pulę ({volumetricPlan.recommendedWorkerInstances} inst.) do Auto-Scalera
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 text-xs">
                {[
                  {
                    label: 'Podstrony WWW',
                    val: volumetricInputs.monitoredPagesCount,
                    key: 'monitoredPagesCount' as const,
                    min: 10,
                    max: 20000,
                  },
                  {
                    label: 'Posty blogowe / mies.',
                    val: volumetricInputs.blogPostsPerMonth,
                    key: 'blogPostsPerMonth' as const,
                    min: 1,
                    max: 2000,
                  },
                  {
                    label: 'Posty Social / dzień',
                    val: volumetricInputs.socialPostsPerDay,
                    key: 'socialPostsPerDay' as const,
                    min: 1,
                    max: 500,
                  },
                  {
                    label: 'Frazy kluczowe / zasób',
                    val: volumetricInputs.keywordsPerAsset,
                    key: 'keywordsPerAsset' as const,
                    min: 1,
                    max: 100,
                  },
                  {
                    label: 'Interwał skanu (min)',
                    val: volumetricInputs.scanIntervalMinutes,
                    key: 'scanIntervalMinutes' as const,
                    min: 5,
                    max: 720,
                  },
                  {
                    label: 'Średni rozmiar (KB)',
                    val: volumetricInputs.avgPayloadKb,
                    key: 'avgPayloadKb' as const,
                    min: 4,
                    max: 512,
                  },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-[11px] text-slate-500 dark:text-slate-400 mb-1 truncate">
                      {field.label}
                    </label>
                    <input
                      type="number"
                      min={field.min}
                      max={field.max}
                      value={field.val}
                      onChange={(e) =>
                        setVolumetricInputs((prev) => ({
                          ...prev,
                          [field.key]: Math.max(field.min, Number(e.target.value) || field.min),
                        }))
                      }
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-2.5 py-1.5 font-mono tabular-nums text-xs text-slate-900 dark:text-slate-100"
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 pt-2">
                <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <div className="text-[11px] text-slate-500">Wsad równoczesny / cykl</div>
                  <div className="text-lg font-bold font-mono tabular-nums text-slate-900 dark:text-white mt-0.5">
                    {volumetricPlan.concurrentDocsPerCycle} dok. ({volumetricPlan.concurrentPayloadMb} MB)
                  </div>
                  <div className="text-[11px] font-mono tabular-nums text-slate-500">
                    ~{volumetricPlan.estimatedGeminiTokensPerCycle.toLocaleString('pl-PL')} tokenów AI / cykl
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <div className="text-[11px] text-slate-500">Wolumen dobowy i miesięczny</div>
                  <div className="text-lg font-bold font-mono tabular-nums text-blue-600 dark:text-sky-400 mt-0.5">
                    {volumetricPlan.dailyIngestedMb} MB/d · {volumetricPlan.monthlyIngestedGb} GB/mies.
                  </div>
                  <div className="text-[11px] font-mono tabular-nums text-slate-500">
                    Korpus aktywny: {volumetricPlan.totalActiveAssets.toLocaleString('pl-PL')} zasobów
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <div className="text-[11px] text-slate-500">Obciążenie Firestore / doba</div>
                  <div className="text-lg font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {volumetricPlan.dailyFirestoreReads.toLocaleString('pl-PL')} R /{' '}
                    {volumetricPlan.dailyFirestoreWrites.toLocaleString('pl-PL')} W
                  </div>
                  <div className="text-[11px] font-mono tabular-nums text-slate-500">
                    Rekomendowane partycje (shards): {volumetricPlan.recommendedCollectionShards}
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <div className="text-[11px] text-slate-500">Architektura docelowa</div>
                  <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 mt-1 leading-snug">
                    {volumetricPlan.architectureTierLabel}
                  </div>
                </div>
              </div>
            </div>

            {/* Section B: Real-Time Performance Monitor & Dynamic Auto-Scaler */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 items-stretch">
              <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      Monitoring Wydajności w Czasie Rzeczywistym
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Telemetria procesu Node.js, opóźnienia p50/p95/p99 oraz lag pętli zdarzeń
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={fetchControlPlane}
                    className="px-2.5 py-1 rounded border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Odśwież
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono tabular-nums text-xs">
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <div className="text-[10px] text-slate-500">Pamięć RSS / Heap</div>
                    <div className="font-bold text-slate-900 dark:text-white mt-0.5">
                      {controlPlane?.latestTelemetry.rssMemoryMb ?? 0} /{' '}
                      {controlPlane?.latestTelemetry.heapUsedMb ?? 0} MB
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <div className="text-[10px] text-slate-500">Obciążenie CPU</div>
                    <div className="font-bold text-blue-600 dark:text-sky-400 mt-0.5">
                      {controlPlane?.latestTelemetry.cpuLoadPct ?? 0}%
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <div className="text-[10px] text-slate-500">Latencja p95</div>
                    <div className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                      {controlPlane?.latencyStats.p95Ms ?? 0} ms
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <div className="text-[10px] text-slate-500">Event-Loop Lag</div>
                    <div className="font-bold text-amber-600 dark:text-amber-400 mt-0.5">
                      {controlPlane?.latestTelemetry.eventLoopLagMs ?? 0} ms
                    </div>
                  </div>
                </div>

                {/* Live SVG Performance Curve */}
                <svg
                  viewBox="0 0 520 120"
                  className="w-full h-28 overflow-visible"
                  role="img"
                  aria-label="Wykres obciążenia CPU i latencji w czasie"
                >
                  <line
                    x1={0}
                    x2={520}
                    y1={105}
                    y2={105}
                    stroke="currentColor"
                    className="text-slate-200 dark:text-slate-800"
                  />
                  {(() => {
                    const hist = controlPlane?.telemetryHistory || [];
                    if (hist.length < 2) return null;
                    const step = 500 / (hist.length - 1);
                    const cpuPts = hist
                      .map((p, idx) => `${10 + idx * step},${105 - Math.min(95, p.cpuLoadPct)}`)
                      .join(' ');
                    const latPts = hist
                      .map(
                        (p, idx) =>
                          `${10 + idx * step},${105 - Math.min(95, (p.p95LatencyMs / 400) * 95)}`
                      )
                      .join(' ');
                    return (
                      <>
                        <polyline
                          fill="none"
                          stroke="#0EA5E9"
                          strokeWidth="2"
                          points={cpuPts}
                        />
                        <polyline
                          fill="none"
                          stroke="#10B981"
                          strokeWidth="2"
                          strokeDasharray="4 2"
                          points={latPts}
                        />
                      </>
                    );
                  })()}
                </svg>
              </div>

              {/* Dynamic Auto-Scaler Console */}
              <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <Server className="w-4 h-4 text-blue-600 dark:text-sky-400" />
                      Mechanizm Automatycznego Skalowania Puli Instancji
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Dynamiczne dopasowanie liczby instancji roboczych do kolejki i latencji p95
                    </p>
                  </div>
                  <span className="font-mono tabular-nums text-sm font-bold text-blue-600 dark:text-sky-400">
                    Aktywne: {controlPlane?.autoScale.currentInstances ?? 2} /{' '}
                    {controlPlane?.autoScale.maxInstances ?? 12}
                  </span>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                  <div className="font-medium text-slate-800 dark:text-slate-200">
                    Ostatnia decyzja skalera:
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">
                    {controlPlane?.autoScale.lastScaleReason || 'Pula nominalna'}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-600 dark:text-slate-400">Wsad testowy (dok.):</span>
                    <input
                      type="number"
                      min={20}
                      max={1200}
                      value={burstDocsInput}
                      onChange={(e) => setBurstDocsInput(e.target.value)}
                      className="w-24 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-2.5 py-1.5 font-mono tabular-nums text-xs"
                    />
                  </div>
                  <button
                    type="button"
                    disabled={isRunningBurst}
                    onClick={handleRunStressBurst}
                    className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-semibold whitespace-nowrap shrink-0"
                  >
                    {isRunningBurst
                      ? 'Przetwarzanie wsadu...'
                      : 'Symuluj Szczyt Obciążenia i Auto-Scaling'}
                  </button>
                </div>
              </div>
            </div>

            {/* Section C: Cloud Functions v2 Event Stream & Centralized Error Reporting */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 items-start">
              {/* Cloud Functions v2 Event Log */}
              <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Zdarzenia Po Stronie Serwera (Cloud Functions v2 Event Bus)
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Dziennik wyzwalaczy optymalizacji fraz, wysyłki raportów PDF i skalowania
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={async () => {
                      await fetch('/api/system/cloud-events/emit', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          triggerType: 'seo.content.evaluated',
                          summary: `Ręczny audyt kontrolny ${seoAssets.length} zasobów SEO/AEO z panelu sterowania.`,
                        }),
                      });
                      await fetchControlPlane();
                    }}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 whitespace-nowrap shrink-0"
                  >
                    Wyzwól Zdarzenie
                  </button>
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {(controlPlane?.cloudEvents || []).slice(0, 10).map((evt) => (
                    <div
                      key={evt.id}
                      className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between font-mono tabular-nums text-[11px]">
                        <span className="font-semibold text-blue-600 dark:text-sky-400">
                          {evt.functionName}
                        </span>
                        <span className="text-slate-500">
                          {evt.executionMs} ms · {new Date(evt.timestamp).toLocaleTimeString('pl-PL')}
                        </span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300">{evt.summary}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Centralized Error Reporting System */}
              <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      Centralny System Raportowania Błędów
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Deduplikacja SHA-256 wyjątków UI, API oraz potoków AI
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleTriggerDiagnosticError}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 whitespace-nowrap shrink-0"
                  >
                    Zgłoś Testowy Wyjątek
                  </button>
                </div>

                {!controlPlane || controlPlane.reportedErrors.length === 0 ? (
                  <div className="py-10 text-center text-xs text-emerald-600 dark:text-emerald-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-lg flex flex-col items-center gap-1.5">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Zero aktywnych błędów wykonania w monitorowanych podsystemach</span>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {controlPlane.reportedErrors.map((err) => (
                      <div
                        key={err.id}
                        className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-slate-900 dark:text-slate-100">
                            [{err.subsystem}] {err.status === 'resolved' ? '(Rozwiązany)' : `×${err.occurrences}`}
                          </span>
                          {err.status === 'open' && (
                            <button
                              type="button"
                              onClick={() => handleResolveError(err.id)}
                              className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
                            >
                              Oznacz jako rozwiązany
                            </button>
                          )}
                        </div>
                        <div className="text-slate-700 dark:text-slate-300">{err.message}</div>
                        <div className="font-mono text-[10px] text-slate-400 truncate">
                          {err.routeOrComponent} · odcisk: {err.fingerprint}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 5: Firebase Auth & Shared User Profiles in Firestore */}
        {activeTab === 'profiles_auth' && (
          <motion.div
            key="tab-profiles-auth"
            initial={syncCardVariants.initial}
            animate={syncCardVariants.animate}
            exit={syncCardVariants.exit}
            transition={syncTransition}
            className="grid grid-cols-1 xl:grid-cols-2 gap-5 items-start"
          >
            {/* Firebase Auth Security & My Shared Profile Editor */}
            <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    Autoryzacja Firebase i Twój Profil w Firestore
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Architektura Split-Collection: udostępniany profil w /publicProfiles nie przechowuje prywatnego adresu e-mail ani telefonu (ochrona PII)
                  </p>
                </div>

                {user ? (
                  <button
                    type="button"
                    onClick={onSignOut}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 whitespace-nowrap shrink-0"
                  >
                    Wyloguj ({user.displayName || 'Konto'})
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onSignInGoogle}
                    className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold whitespace-nowrap shrink-0"
                  >
                    Zaloguj przez Firebase Google Auth
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveProfileForm} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Publiczny identyfikator (handle) *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={60}
                      value={profHandle}
                      onChange={(e) => setProfHandle(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs font-mono text-slate-900 dark:text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                       wyświetlana nazwa / Imię *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={100}
                      value={profDisplayName}
                      onChange={(e) => setProfDisplayName(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Rola / Specjalizacja
                    </label>
                    <input
                      type="text"
                      maxLength={100}
                      value={profRole}
                      onChange={(e) => setProfRole(e.target.value)}
                      placeholder="Np. Architekt SEO & AEO"
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Domena internetowa / Organizacja
                    </label>
                    <input
                      type="text"
                      maxLength={160}
                      value={profDomain}
                      onChange={(e) => setProfDomain(e.target.value)}
                      placeholder="twojadomena.pl"
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs font-mono text-slate-900 dark:text-slate-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Opis profilu i strategii treści
                  </label>
                  <textarea
                    rows={2}
                    maxLength={500}
                    value={profBio}
                    onChange={(e) => setProfBio(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Obszary kompetencji (oddzielone przecinkiem, maks. 8)
                  </label>
                  <input
                    type="text"
                    value={profSpecsInput}
                    onChange={(e) => setProfSpecsInput(e.target.value)}
                    placeholder="SEO Techniczne, AEO, LinkedIn Growth, Analityka"
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
                  />
                </div>

                <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profPublic}
                    onChange={(e) => setProfPublic(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600"
                  />
                  <span>Udostępniaj mój profil innym uwierzytelnionym użytkownikom w Firestore</span>
                </label>

                <button
                  type="submit"
                  disabled={isSavingProfile}
                  className="px-4 py-2 rounded-lg bg-slate-900 dark:bg-sky-500 text-white dark:text-slate-950 text-xs font-semibold disabled:opacity-50"
                >
                  {isSavingProfile ? 'Zapisywanie...' : 'Zapisz i Udostępnij Profil w Firestore'}
                </button>
              </form>
            </div>

            {/* Shared Profiles Directory */}
            <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600 dark:text-sky-400" />
                    Udostępnione Profile Specjalistów w Firestore ({sharedProfiles.length})
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Synchronizowane w czasie rzeczywistym z zachowaniem reguł bezpieczeństwa
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {sharedProfiles.map((prof) => (
                  <div
                    key={prof.id}
                    className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          {prof.displayName}
                        </span>
                        <span className="text-xs font-mono text-slate-500 ml-2">
                          @{prof.handle}
                        </span>
                      </div>
                      <span className="font-mono tabular-nums text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                        Śr. Predykcja: {prof.avgPredictiveScore}/100
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">
                      {prof.roleTitle || 'Specjalista'} ·{' '}
                      <span className="font-mono">{prof.organizationOrDomain || 'brak domeny'}</span>{' '}
                      · Zasoby: {prof.sharedAssetsCount}
                    </div>
                    {prof.bio && (
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        {prof.bio}
                      </p>
                    )}
                    {prof.specialties.length > 0 && (
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-0.5">
                        {prof.specialties.join(' · ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'nextjs_3d_docs' && (
          <motion.div
            key="tab-nextjs-3d-docs"
            initial={syncCardVariants.initial}
            animate={syncCardVariants.animate}
            exit={syncCardVariants.exit}
            transition={syncTransition}
          >
            <NextJs3dArchitectureDocPanel />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Integrated Platform Modules Bridge (All Workspace Logic Reachable from Central Control Panel) */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Szybkie Przejście do Pozostałych Modułów Operacyjnych Platformy
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2.5">
          {[
            { id: 'kanban' as const, label: 'Tablica Kanban E2EE', icon: Globe },
            { id: 'calendar' as const, label: 'Kalendarz Tygodniowy', icon: TrendingUp },
            { id: 'clinic_devices' as const, label: 'Grafiki Urządzeń i Kliniki', icon: Cpu },
            { id: 'analytics' as const, label: 'Analityka i Wyszukiwarka PDF', icon: FileDown },
            { id: 'ai_security' as const, label: 'Audyt Pracy i Antymalware', icon: ShieldCheck },
            { id: 'team' as const, label: 'Zespół i Klucze AES-256', icon: Users },
          ].map((mod) => {
            const Icon = mod.icon;
            return (
              <button
                key={mod.id}
                type="button"
                onClick={() => onNavigateModule(mod.id)}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200 transition-colors"
              >
                <span className="flex items-center gap-2 truncate">
                  <Icon className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400 shrink-0" />
                  <span className="truncate">{mod.label}</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
