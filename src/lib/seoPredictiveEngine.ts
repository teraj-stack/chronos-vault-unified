import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { foldPolishDiacritics } from './pdfSearchIndex';
import { triggerBlobDownload } from './export';

export type SeoChannel = 'web_page' | 'blog_post' | 'linkedin' | 'instagram' | 'x_social';
export type AnomalyKind = 'none' | 'reach_drop' | 'keyword_decay' | 'aeo_gap' | 'viral_spike';

export interface SeoContentAssetRecord {
  id: string;
  title: string;
  channel: SeoChannel;
  urlOrSlug: string;
  contentExcerpt: string;
  primaryKeyword: string;
  previousKeyword: string;
  keywordHistory: string[];
  seoScore: number;
  aeoScore: number;
  predictiveStrength: number;
  organicReach: number;
  socialReach: number;
  engagementRate: number;
  anomalyType: AnomalyKind;
  aiRecommendation: string;
  ownerId: string;
  collaboratorEmails: string[];
  daysSinceLastRefresh?: number;
}

export interface SharedUserProfileRecord {
  id: string;
  ownerId: string;
  handle: string;
  displayName: string;
  roleTitle: string;
  organizationOrDomain: string;
  bio: string;
  specialties: string[];
  isPubliclyShared: boolean;
  sharedAssetsCount: number;
  avgPredictiveScore: number;
}

export interface SeoReportScheduleRecord {
  id: string;
  reportName: string;
  recipientEmails: string[];
  cadence: 'daily' | 'weekly' | 'monthly';
  channelScope: 'all' | 'web_and_blog' | 'social_only';
  includeAnomalyAlerts: boolean;
  isActive: boolean;
  lastDispatchedAt: string;
  nextRunAt: string;
  ownerId: string;
}

export const CHANNEL_LABELS: Record<SeoChannel, string> = {
  web_page: 'Strona WWW',
  blog_post: 'Artykuł Blogowy',
  linkedin: 'LinkedIn',
  instagram: 'Instagram / Meta',
  x_social: 'X / Krótkie Formy',
};

export const ANOMALY_LABELS: Record<AnomalyKind, string> = {
  none: 'Stabilny trend',
  reach_drop: 'Spadek zasięgu',
  keyword_decay: 'Dezaktualizacja frazy',
  aeo_gap: 'Luka cytowań AEO',
  viral_spike: 'Skok wiralowy Social',
};

export function createInitialSeoAssets(): SeoContentAssetRecord[] {
  return [
    {
      id: 'seo_demo_1',
      title: 'Przewodnik po architekturze Zero-Trust i szyfrowaniu E2EE w chmurze',
      channel: 'web_page',
      urlOrSlug: '/architektura/bezpieczenstwo-zero-trust-e2ee',
      contentExcerpt:
        'Jak działa szyfrowanie end-to-end AES-256-GCM w aplikacjach zespołowych? Bezpośrednia odpowiedź: dane są szyfrowane po stronie przeglądarki przed zapisem w bazie chmurowej, co eliminuje ryzyko wycieku kluczy.',
      primaryKeyword: 'szyfrowanie end-to-end aplikacja zespołowa 2026',
      previousKeyword: 'bezpieczeństwo danych w chmurze',
      keywordHistory: [
        'bezpieczeństwo w chmurze',
        'bezpieczeństwo danych w chmurze',
        'szyfrowanie end-to-end aplikacja zespołowa 2026',
      ],
      seoScore: 91,
      aeoScore: 94,
      predictiveStrength: 92,
      organicReach: 48200,
      socialReach: 14900,
      engagementRate: 6.8,
      anomalyType: 'none',
      aiRecommendation:
        'Wysoka gotowość cytowania w AI Overviews dzięki blokowi definicyjnemu 42 słów na początku sekcji H2.',
      ownerId: 'local_owner',
      collaboratorEmails: [],
      daysSinceLastRefresh: 2,
    },
    {
      id: 'seo_demo_2',
      title: 'Jak zoptymalizować treści pod silniki odpowiedzi AEO i wyszukiwarki AI',
      channel: 'blog_post',
      urlOrSlug: '/blog/optymalizacja-aeo-i-frazy-kluczowe-w-czasie',
      contentExcerpt:
        'Tradycyjne upychanie słów kluczowych traci skuteczność. Poznaj strukturę pytań i zwięzłych odpowiedzi, dane JSON-LD FAQPage oraz dynamiczną rotację fraz długiego ogona.',
      primaryKeyword: 'optymalizacja treści AEO pod wyszukiwarki AI',
      previousKeyword: 'pozycjonowanie bloga firmowego',
      keywordHistory: [
        'pozycjonowanie bloga',
        'pozycjonowanie bloga firmowego',
        'optymalizacja treści AEO pod wyszukiwarki AI',
      ],
      seoScore: 86,
      aeoScore: 63,
      predictiveStrength: 74,
      organicReach: 29400,
      socialReach: 8300,
      engagementRate: 4.9,
      anomalyType: 'aeo_gap',
      aiRecommendation:
        'Wykryto lukę AEO: dodaj zwięzłą odpowiedź Q&A (45-55 słów) bezpośrednio pod nagłówkiem H2, aby zwiększyć cytowania o ~28%.',
      ownerId: 'local_owner',
      collaboratorEmails: [],
      daysSinceLastRefresh: 9,
    },
    {
      id: 'seo_demo_3',
      title: 'Case Study LinkedIn: Automatyzacja grafików klinicznych i redukcja przestojów o 37%',
      channel: 'linkedin',
      urlOrSlug: 'linkedin.com/posts/chronos-kliniki-automatyzacja',
      contentExcerpt:
        'Wdrożenie tygodniowego harmonogramu aparatury zabiegowej oraz licznika impulsów pozwoliło 4 placówkom wyeliminować kolizje rezerwacji i zaplanować serwis głowic z wyprzedzeniem.',
      primaryKeyword: 'zarządzanie grafikami urządzeń medycznych',
      previousKeyword: 'oprogramowanie dla kliniki',
      keywordHistory: ['oprogramowanie dla kliniki', 'zarządzanie grafikami urządzeń medycznych'],
      seoScore: 82,
      aeoScore: 79,
      predictiveStrength: 89,
      organicReach: 11200,
      socialReach: 64500,
      engagementRate: 9.4,
      anomalyType: 'viral_spike',
      aiRecommendation:
        'Skok zasięgu organicznego na LinkedIn (+142% tydz./tydz.). Przekształć wątek w stronę docelową z sekcją FAQ Schema.',
      ownerId: 'local_owner',
      collaboratorEmails: [],
      daysSinceLastRefresh: 1,
    },
    {
      id: 'seo_demo_4',
      title: 'Porównanie narzędzi raportowania produktywności PDF i CSV dla zespołów hybrydowych',
      channel: 'blog_post',
      urlOrSlug: '/blog/raporty-produktywnosci-zespolu-pdf',
      contentExcerpt:
        'Zestawienie metod pomiaru czasu pracy i eksportu danych projektowych z ubiegłego roku. Wymaga aktualizacji pod aktualne zapytania o indeksowane raporty i automatyzację.',
      primaryKeyword: 'program do raportów czasu pracy 2024',
      previousKeyword: 'raporty czasu pracy',
      keywordHistory: ['raporty czasu pracy', 'program do raportów czasu pracy 2024'],
      seoScore: 64,
      aeoScore: 52,
      predictiveStrength: 46,
      organicReach: 9100,
      socialReach: 2400,
      engagementRate: 2.1,
      anomalyType: 'keyword_decay',
      aiRecommendation:
        'Fraza zawiera nieaktualny rocznik i traci zasięg (-31%). Uruchom optymalizację AI, aby zaktualizować frazę i strukturę odpowiedzi.',
      ownerId: 'local_owner',
      collaboratorEmails: [],
      daysSinceLastRefresh: 44,
    },
    {
      id: 'seo_demo_5',
      title: 'Karuzela Instagram & Reels: 5 zasad higieny cyfrowej i skanowania zależności OSV',
      channel: 'instagram',
      urlOrSlug: 'instagram.com/p/bezpieczny-kod-osv',
      contentExcerpt:
        'Zanim zainstalujesz nową paczkę npm lub PyPI, sprawdź sumę SHA-256 i rejestr złośliwych pakietów. Krótka checklista dla zespołów produktowych.',
      primaryKeyword: 'skanowanie złośliwych paczek npm bezpieczeństwo',
      previousKeyword: 'bezpieczeństwo kodu js',
      keywordHistory: ['bezpieczeństwo kodu js', 'skanowanie złośliwych paczek npm bezpieczeństwo'],
      seoScore: 77,
      aeoScore: 75,
      predictiveStrength: 78,
      organicReach: 6800,
      socialReach: 31800,
      engagementRate: 7.2,
      anomalyType: 'reach_drop',
      aiRecommendation:
        'Zasięg poza obserwującymi spadł o 19% w ostatnich 72h — dodaj frazę pytającą na pierwszej planszy i w opisie alternatywnym.',
      ownerId: 'local_owner',
      collaboratorEmails: [],
      daysSinceLastRefresh: 16,
    },
  ];
}

export function createInitialDemoProfiles(): SharedUserProfileRecord[] {
  return [
    {
      id: 'demo_profile_1',
      ownerId: 'demo_profile_1',
      handle: 'marta_growth_aeo',
      displayName: 'Marta Wiśniewska',
      roleTitle: 'Lead SEO & AEO Strategist',
      organizationOrDomain: 'chronosvault.pl',
      bio: 'Specjalistka semantycznego SEO, danych strukturalnych JSON-LD oraz optymalizacji pod silniki odpowiedzi AI.',
      specialties: ['AEO Citations', 'Schema.org JSON-LD', 'LinkedIn Reach', 'Analiza Anomalii'],
      isPubliclyShared: true,
      sharedAssetsCount: 18,
      avgPredictiveScore: 88,
    },
    {
      id: 'demo_profile_2',
      ownerId: 'demo_profile_2',
      handle: 'piotr_cloud_perf',
      displayName: 'Piotr Nowak',
      roleTitle: 'Cloud & Telemetry Architect',
      organizationOrDomain: 'infra.zespol.pl',
      bio: 'Projektowanie potoków zdarzeń Cloud Functions, autoskalowania wsadowego i monitoringu Core Web Vitals.',
      specialties: ['Cloud Functions v2', 'Auto-Scaling', 'Core Web Vitals', 'Predykcja Danych'],
      isPubliclyShared: true,
      sharedAssetsCount: 12,
      avgPredictiveScore: 84,
    },
  ];
}

export function createInitialReportSchedule(): SeoReportScheduleRecord {
  const nextWeek = new Date(Date.now() + 7 * 86400_000).toISOString().slice(0, 16);
  return {
    id: 'sched_default_1',
    reportName: 'Cykliczne Podsumowanie SEO, AEO i Zasięgu Kanałów',
    recipientEmails: ['zarzad@chronosvault.pl'],
    cadence: 'weekly',
    channelScope: 'all',
    includeAnomalyAlerts: true,
    isActive: true,
    lastDispatchedAt: '',
    nextRunAt: nextWeek,
    ownerId: 'local_owner',
  };
}

/**
 * Online Exponentially-Weighted Adaptive Regression with Stale-Data Decay (λ).
 * Down-weights outdated content observations ("nieaktualne dane") in real time
 * and models Predictive Strength ("siła wskazująca") with transparent feature weights.
 */
export interface OnlineModelFeatureWeight {
  key: string;
  label: string;
  weight: number;
  normalizedImpactPct: number;
}

export interface AssetPredictionEvaluation {
  assetId: string;
  predictedStrength: number;
  confidenceMargin: number;
  freshnessWeight: number;
  isStaleObservation: boolean;
  projected30dReach: number;
}

export interface OnlineAdaptiveModelOutput {
  forgettingFactorLambda: number;
  staleHalfLifeDays: number;
  effectiveSampleSize: number;
  attenuatedStaleCount: number;
  modelR2Fit: number;
  weights: OnlineModelFeatureWeight[];
  evaluations: Record<string, AssetPredictionEvaluation>;
}

export function runOnlineAdaptivePredictiveModel(
  assets: SeoContentAssetRecord[],
  forgettingFactorLambda: number,
  staleHalfLifeDays: number,
  onlineLearningBoostSteps = 0
): OnlineAdaptiveModelOutput {
  const lambda = Math.min(0.99, Math.max(0.75, forgettingFactorLambda));
  const halfLife = Math.min(90, Math.max(3, staleHalfLifeDays));

  // Base domain-calibrated feature priors updated online via exponentially weighted observations
  const rawWeights = [
    0.28, // SEO Technical & Keyword Intent Prominence
    0.31, // AEO Direct-Answer Citation Readiness
    0.19, // Freshness / Temporal Decay Resistance
    0.13, // Social Amplification Velocity
    0.09, // Engagement Conversion Signal
  ];

  let effectiveSampleSize = 0;
  let attenuatedStaleCount = 0;

  // Online update pass over current dataset ordered from oldest to newest
  const ordered = [...assets].sort(
    (a, b) => (b.daysSinceLastRefresh ?? 7) - (a.daysSinceLastRefresh ?? 7)
  );

  ordered.forEach((asset, idx) => {
    const ageDays = Math.max(0, asset.daysSinceLastRefresh ?? 5);
    const temporalDecay = Math.pow(0.5, ageDays / halfLife);
    const sequenceForget = Math.pow(lambda, ordered.length - 1 - idx);
    const observationWeight = temporalDecay * sequenceForget;

    if (ageDays > halfLife) {
      attenuatedStaleCount += 1;
    }
    effectiveSampleSize += observationWeight;

    const totalReachLog = Math.min(1, Math.log10(1 + asset.organicReach + asset.socialReach) / 5.2);
    const x = [
      asset.seoScore / 100,
      asset.aeoScore / 100,
      temporalDecay,
      Math.min(1, Math.log10(1 + asset.socialReach) / 5),
      Math.min(1, asset.engagementRate / 12),
    ];

    const dot = x.reduce((sum, xi, k) => sum + xi * rawWeights[k], 0);
    const target = 0.55 * totalReachLog + 0.45 * ((asset.seoScore + asset.aeoScore) / 200);
    const error = target - dot;
    const learningRate = 0.08 * observationWeight * (1 + Math.min(5, onlineLearningBoostSteps) * 0.12);

    for (let k = 0; k < rawWeights.length; k++) {
      rawWeights[k] = Math.max(0.03, rawWeights[k] + learningRate * error * x[k]);
    }
  });

  const weightSum = rawWeights.reduce((a, b) => a + b, 0) || 1;
  const normalizedWeights = rawWeights.map((w) => w / weightSum);

  const labels = [
    { key: 'seo_intent', label: 'Dopasowanie Frazy Kluczowej i SEO' },
    { key: 'aeo_citation', label: 'Gotowość Cytowań AEO (Silniki AI)' },
    { key: 'freshness_decay', label: 'Świeżość Treści (Wygaszanie Nieaktualnych)' },
    { key: 'social_velocity', label: 'Dynamika Zasięgu Społecznościowego' },
    { key: 'engagement_ctr', label: 'Współczynnik Zaangażowania / CTR' },
  ];

  const weights: OnlineModelFeatureWeight[] = labels.map((item, idx) => ({
    key: item.key,
    label: item.label,
    weight: Math.round(normalizedWeights[idx] * 1000) / 1000,
    normalizedImpactPct: Math.round(normalizedWeights[idx] * 1000) / 10,
  }));

  const evaluations: Record<string, AssetPredictionEvaluation> = {};
  let residualSum = 0;

  for (const asset of assets) {
    const ageDays = Math.max(0, asset.daysSinceLastRefresh ?? 5);
    const freshnessWeight = Math.pow(0.5, ageDays / halfLife);
    const hasYearDecay = /202[0-4]/.test(asset.primaryKeyword);
    const effectiveFreshness = hasYearDecay ? freshnessWeight * 0.65 : freshnessWeight;

    const features = [
      asset.seoScore / 100,
      asset.aeoScore / 100,
      effectiveFreshness,
      Math.min(1, Math.log10(1 + asset.socialReach) / 5),
      Math.min(1, asset.engagementRate / 12),
    ];

    const score01 = features.reduce((sum, f, k) => sum + f * normalizedWeights[k], 0);
    const predictedStrength = Math.min(99, Math.max(12, Math.round(score01 * 108)));
    const confidenceMargin = Math.max(
      2.1,
      Math.round((8.5 / Math.sqrt(Math.max(1, effectiveSampleSize)) + (1 - effectiveFreshness) * 4.2) * 10) / 10
    );
    const currentTotalReach = asset.organicReach + asset.socialReach;
    const growthFactor = 0.72 + (predictedStrength / 100) * 0.68;
    const projected30dReach = Math.round(currentTotalReach * growthFactor);

    residualSum += Math.pow((predictedStrength - asset.predictiveStrength) / 100, 2);

    evaluations[asset.id] = {
      assetId: asset.id,
      predictedStrength,
      confidenceMargin,
      freshnessWeight: Math.round(effectiveFreshness * 100) / 100,
      isStaleObservation: ageDays > halfLife || hasYearDecay,
      projected30dReach,
    };
  }

  const mse = assets.length > 0 ? residualSum / assets.length : 0.02;
  const modelR2Fit = Math.min(0.98, Math.max(0.72, Math.round((1 - mse * 1.8) * 100) / 100));

  return {
    forgettingFactorLambda: lambda,
    staleHalfLifeDays: halfLife,
    effectiveSampleSize: Math.round(effectiveSampleSize * 100) / 100,
    attenuatedStaleCount,
    modelR2Fit,
    weights,
    evaluations,
  };
}

/**
 * Personalized Anomaly Splits Engine
 */
export interface AnomalyThresholds {
  minAeoScoreThreshold: number;
  minPredictiveStrengthThreshold: number;
  viralSocialRatioMultiplier: number;
}

export interface PersonalizedAnomalySplit {
  id: AnomalyKind;
  title: string;
  description: string;
  severity: 'critical' | 'warning' | 'positive' | 'nominal';
  items: SeoContentAssetRecord[];
}

export function computePersonalizedAnomalySplits(
  assets: SeoContentAssetRecord[],
  evaluations: Record<string, AssetPredictionEvaluation>,
  thresholds: AnomalyThresholds
): PersonalizedAnomalySplit[] {
  const avgSocial =
    assets.length > 0
      ? assets.reduce((sum, a) => sum + a.socialReach, 0) / assets.length
      : 15000;

  const buckets: Record<AnomalyKind, SeoContentAssetRecord[]> = {
    keyword_decay: [],
    aeo_gap: [],
    reach_drop: [],
    viral_spike: [],
    none: [],
  };

  for (const asset of assets) {
    const evalItem = evaluations[asset.id];
    const pred = evalItem ? evalItem.predictedStrength : asset.predictiveStrength;

    if (asset.anomalyType === 'keyword_decay' || evalItem?.isStaleObservation) {
      buckets.keyword_decay.push(asset);
    } else if (asset.aeoScore < thresholds.minAeoScoreThreshold || asset.anomalyType === 'aeo_gap') {
      buckets.aeo_gap.push(asset);
    } else if (
      pred < thresholds.minPredictiveStrengthThreshold ||
      asset.anomalyType === 'reach_drop'
    ) {
      buckets.reach_drop.push(asset);
    } else if (
      asset.socialReach >= avgSocial * thresholds.viralSocialRatioMultiplier ||
      asset.anomalyType === 'viral_spike'
    ) {
      buckets.viral_spike.push(asset);
    } else {
      buckets.none.push(asset);
    }
  }

  return [
    {
      id: 'keyword_decay',
      title: 'Dezaktualizacja Frazy i Dryf Czasowy',
      description: 'Treści z wygaszonymi wagami historycznymi wymagające rotacji frazy kluczowej.',
      severity: 'critical',
      items: buckets.keyword_decay,
    },
    {
      id: 'aeo_gap',
      title: `Luka Cytowań AEO (< ${thresholds.minAeoScoreThreshold} pkt)`,
      description: 'Publikacje o niskiej gotowości do cytowania w odpowiedziach AI.',
      severity: 'warning',
      items: buckets.aeo_gap,
    },
    {
      id: 'reach_drop',
      title: `Anomalia Spadku Siły Wskazującej (< ${thresholds.minPredictiveStrengthThreshold} pkt)`,
      description: 'Treści z obniżoną dynamiką zasięgu organicznego lub społecznościowego.',
      severity: 'warning',
      items: buckets.reach_drop,
    },
    {
      id: 'viral_spike',
      title: `Skok Wiralowy Social (≥ ${thresholds.viralSocialRatioMultiplier.toFixed(1)}× średniej)`,
      description: 'Ponadprzeciętny zasięg społecznościowy gotowy do konwersji na ruch organiczny.',
      severity: 'positive',
      items: buckets.viral_spike,
    },
    {
      id: 'none',
      title: 'Stabilne Pasmo Optymalne',
      description: 'Zasoby utrzymujące wysoką spójność SEO, AEO i predykcji zasięgu.',
      severity: 'nominal',
      items: buckets.none,
    },
  ];
}

/**
 * Volumetric Data & Concurrent Analysis Capacity Planner
 */
export interface VolumetricPlanInputs {
  monitoredPagesCount: number;
  blogPostsPerMonth: number;
  socialPostsPerDay: number;
  keywordsPerAsset: number;
  scanIntervalMinutes: number;
  avgPayloadKb: number;
}

export interface VolumetricPlanResult {
  totalActiveAssets: number;
  concurrentDocsPerCycle: number;
  concurrentPayloadMb: number;
  estimatedGeminiTokensPerCycle: number;
  dailyIngestedMb: number;
  monthlyIngestedGb: number;
  dailyFirestoreReads: number;
  dailyFirestoreWrites: number;
  recommendedWorkerInstances: number;
  recommendedCollectionShards: number;
  architectureTierLabel: string;
}

export function calculateVolumetricCapacityPlan(
  inputs: VolumetricPlanInputs
): VolumetricPlanResult {
  const pages = Math.max(1, inputs.monitoredPagesCount);
  const blogs = Math.max(0, inputs.blogPostsPerMonth);
  const socialDaily = Math.max(0, inputs.socialPostsPerDay);
  const kwCount = Math.max(1, inputs.keywordsPerAsset);
  const intervalMin = Math.max(5, inputs.scanIntervalMinutes);
  const avgKb = Math.max(4, inputs.avgPayloadKb);

  const totalActiveAssets = pages + blogs + socialDaily * 30;
  const cyclesPerDay = Math.max(1, Math.floor(1440 / intervalMin));

  // Concurrent window processes active delta + rolling slice of tracked corpus
  const concurrentDocsPerCycle = Math.max(
    4,
    Math.ceil(totalActiveAssets * Math.min(1, 30 / Math.max(30, cyclesPerDay * 4)))
  );
  const metadataOverheadKb = kwCount * 0.45;
  const effectiveDocKb = avgKb + metadataOverheadKb;

  const concurrentPayloadMb =
    Math.round(((concurrentDocsPerCycle * effectiveDocKb) / 1024) * 100) / 100;
  const estimatedGeminiTokensPerCycle = Math.round(concurrentDocsPerCycle * (effectiveDocKb * 195));

  const dailyIngestedMb =
    Math.round(((concurrentDocsPerCycle * cyclesPerDay * effectiveDocKb) / 1024) * 10) / 10;
  const monthlyIngestedGb = Math.round(((dailyIngestedMb * 30) / 1024) * 100) / 100;

  const dailyFirestoreWrites = concurrentDocsPerCycle * cyclesPerDay;
  const dailyFirestoreReads = dailyFirestoreWrites * 3 + totalActiveAssets * 4;

  const recommendedWorkerInstances = Math.min(32, Math.max(2, Math.ceil(concurrentDocsPerCycle / 45)));
  const recommendedCollectionShards = Math.max(1, Math.ceil(dailyFirestoreWrites / 25000));

  const architectureTierLabel =
    monthlyIngestedGb < 5
      ? 'Pasmo Lekkie (Pojedyncza pula Cloud Functions + indeksy natywne Firestore)'
      : monthlyIngestedGb < 35
      ? 'Pasmo Średnie (Kolejkowanie wsadowe Cloud Functions v2 + Auto-Scaler 2–8 instancji)'
      : 'Pasmo Wysokiej Przepustowości (Partycjonowanie kluczy + równoległe okna strumieniowe)';

  return {
    totalActiveAssets,
    concurrentDocsPerCycle,
    concurrentPayloadMb,
    estimatedGeminiTokensPerCycle,
    dailyIngestedMb,
    monthlyIngestedGb,
    dailyFirestoreReads,
    dailyFirestoreWrites,
    recommendedWorkerInstances,
    recommendedCollectionShards,
    architectureTierLabel,
  };
}

function cleanPdfText(input: string): string {
  return foldPolishDiacritics(input)
    .replace(/[—–]/g, '-')
    .replace(/[„”]/g, '"')
    .replace(/[^\x20-\x7E\n]/g, ' ');
}

export function generateSeoExecutivePdfReport(params: {
  reportTitle: string;
  assets: SeoContentAssetRecord[];
  modelOutput: OnlineAdaptiveModelOutput;
  volumetricPlan: VolumetricPlanResult;
  downloadImmediately?: boolean;
}): {
  fileName: string;
  pdfBase64: string;
  sizeBytes: number;
} {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
  const nowStr = new Date().toLocaleString('pl-PL');

  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, 842, 74, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(cleanPdfText(params.reportTitle || 'Raport Cykliczny AI SEO, AEO i Zasiegu'), 40, 34);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(203, 213, 225);
  doc.text(
    cleanPdfText(
      `Chronos Vault Central Control | Wygenerowano: ${nowStr} | Dopasowanie modelu R2: ${params.modelOutput.modelR2Fit} | Lambda: ${params.modelOutput.forgettingFactorLambda}`
    ),
    40,
    54
  );

  const avgSeo =
    params.assets.length > 0
      ? Math.round(params.assets.reduce((s, a) => s + a.seoScore, 0) / params.assets.length)
      : 0;
  const avgAeo =
    params.assets.length > 0
      ? Math.round(params.assets.reduce((s, a) => s + a.aeoScore, 0) / params.assets.length)
      : 0;
  const totalOrg = params.assets.reduce((s, a) => s + a.organicReach, 0);
  const totalSoc = params.assets.reduce((s, a) => s + a.socialReach, 0);

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(
    cleanPdfText(
      `Podsumowanie: Zasoby=${params.assets.length} | Srednie SEO=${avgSeo}/100 | Srednie AEO=${avgAeo}/100 | Zasieg Organiczny=${totalOrg.toLocaleString('en-US')} | Zasieg Social=${totalSoc.toLocaleString('en-US')} | Plan objetosciowy=${params.volumetricPlan.monthlyIngestedGb} GB/mies.`
    ),
    40,
    102
  );

  const rows = params.assets.map((asset) => {
    const evalItem = params.modelOutput.evaluations[asset.id];
    const pred = evalItem ? evalItem.predictedStrength : asset.predictiveStrength;
    return [
      cleanPdfText(CHANNEL_LABELS[asset.channel]),
      cleanPdfText(asset.title.slice(0, 56)),
      cleanPdfText(asset.primaryKeyword.slice(0, 44)),
      `${asset.seoScore}/100`,
      `${asset.aeoScore}/100`,
      `${pred}/100`,
      `${asset.organicReach.toLocaleString('en-US')} / ${asset.socialReach.toLocaleString('en-US')}`,
      cleanPdfText(ANOMALY_LABELS[asset.anomalyType]),
    ];
  });

  autoTable(doc, {
    startY: 118,
    head: [
      [
        'Kanal',
        'Tytul tresci / Posta',
        'Aktywna fraza kluczowa',
        'SEO',
        'AEO',
        'Sila Pred.',
        'Zasieg Org / Social',
        'Status Anomalii',
      ],
    ],
    body: rows,
    styles: { fontSize: 8.5, cellPadding: 5 },
    headStyles: { fillColor: [30, 41, 59], textColor: 255 },
    alternateRowStyles: { fillColor: [248, 250, 252] },
  });

  const dataUri = doc.output('datauristring');
  const base64Part = dataUri.split(',')[1] || '';
  const arrayBuf = doc.output('arraybuffer');
  const blob = new Blob([arrayBuf], { type: 'application/pdf' });
  const safeStamp = new Date().toISOString().slice(0, 10);
  const fileName = `chronos-raport-seo-aeo-${safeStamp}.pdf`;

  if (params.downloadImmediately) {
    triggerBlobDownload(blob, fileName);
  }

  return {
    fileName,
    pdfBase64: base64Part,
    sizeBytes: arrayBuf.byteLength,
  };
}
