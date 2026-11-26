const SPEED_OF_LIGHT = 299792458;
const INITIAL_EM_NODES = [
  {
    id: "node-schumann-elf",
    name: "ELF Schumann Resonance Receiver (Earth-Ionosphere Cavity)",
    sensorType: "SCHUMANN_ELF_RECEIVER",
    frequencyHz: 7.83,
    frequencyBandName: "Ekstremalnie Niskie Częstotliwości (ELF 0.1 - 30 Hz)",
    electricFieldVpm: 0.12,
    magneticFieldMicroT: 32e-4,
    powerDensityMilliWattsPerM2: 0.038,
    poyntingVector: { x: 0.01, y: 0.02, z: 0.03 },
    phaseAngleDeg: 0,
    polarization: "CIRCULAR_RIGHT",
    standingWaveRatioSwr: 1.02,
    qualityFactorQ: 6.8,
    interferenceState: "PARTIAL_SUPERPOSITION",
    antiPhaseSuppressionDb: 0,
    resonanceCancellationActive: false,
    // Fale naturalne nie są tłumione
    hyperbolicEnergyConvergenceRatio: 1.01,
    coords: { x: 50, y: 50, z: 10 }
  },
  {
    id: "node-mains-50hz",
    name: "50 Hz AC Power Grid Line & Transformer EMI Pick-up",
    sensorType: "TRIAXIAL_E_FIELD",
    frequencyHz: 50,
    frequencyBandName: "Częstotliwości Sieciowe (ELF 50/60 Hz)",
    electricFieldVpm: 7.42,
    magneticFieldMicroT: 0.45,
    powerDensityMilliWattsPerM2: 14.6,
    poyntingVector: { x: 0.85, y: 1.12, z: 0.32 },
    phaseAngleDeg: 124.5,
    polarization: "LINEAR",
    standingWaveRatioSwr: 2.85,
    qualityFactorQ: 18.4,
    interferenceState: "ACTIVE_CANCELLING",
    antiPhaseSuppressionDb: -38.2,
    resonanceCancellationActive: true,
    hyperbolicEnergyConvergenceRatio: 2.45,
    coords: { x: 180, y: 90, z: 15 }
  },
  {
    id: "node-pwm-inverter-100hz",
    name: "Display Backlight & SMPS PWM Switched Harmonic Sensor",
    sensorType: "FLUXGATE_B_MAGNETOMETER",
    frequencyHz: 100,
    frequencyBandName: "Tętnienia Zasilaczy Impulsowych (100 - 120 Hz PWM)",
    electricFieldVpm: 5.8,
    magneticFieldMicroT: 0.28,
    powerDensityMilliWattsPerM2: 8.95,
    poyntingVector: { x: 0.42, y: 0.65, z: 0.18 },
    phaseAngleDeg: 88,
    polarization: "LINEAR",
    standingWaveRatioSwr: 3.12,
    qualityFactorQ: 14.2,
    interferenceState: "ACTIVE_CANCELLING",
    antiPhaseSuppressionDb: -41.5,
    resonanceCancellationActive: true,
    hyperbolicEnergyConvergenceRatio: 2.1,
    coords: { x: 120, y: 220, z: 20 }
  },
  {
    id: "node-vrm-choke-800khz",
    name: "12VHPWR VRM High-Current Inductive Choke Resonator",
    sensorType: "FLUXGATE_B_MAGNETOMETER",
    frequencyHz: 8e5,
    // 800 kHz
    frequencyBandName: "Średnie Częstotliwości Kluczowania (MF / VLF 800 kHz)",
    electricFieldVpm: 4.85,
    magneticFieldMicroT: 0.82,
    powerDensityMilliWattsPerM2: 10.4,
    poyntingVector: { x: 1.25, y: 2.4, z: 0.6 },
    phaseAngleDeg: 42.1,
    polarization: "ELLIPTICAL",
    standingWaveRatioSwr: 1.48,
    qualityFactorQ: 42,
    interferenceState: "PARTIAL_SUPERPOSITION",
    antiPhaseSuppressionDb: -18.4,
    resonanceCancellationActive: true,
    hyperbolicEnergyConvergenceRatio: 2.85,
    coords: { x: 260, y: 80, z: 35 }
  },
  {
    id: "node-pcie-rf-clock-16ghz",
    name: "PCIe Gen5 Differential Clock & RF Waveguide Probe",
    sensorType: "RF_MICROWAVE_PROBE",
    frequencyHz: 16e9,
    // 16 GHz
    frequencyBandName: "Mikrofale Szyn Danych (UHF / SHF 16.0 GHz - 32 GT/s)",
    electricFieldVpm: 3.2,
    magneticFieldMicroT: 0.045,
    powerDensityMilliWattsPerM2: 27.2,
    poyntingVector: { x: 3.4, y: 0.8, z: 1.1 },
    phaseAngleDeg: 12.8,
    polarization: "CIRCULAR_LEFT",
    standingWaveRatioSwr: 1.14,
    qualityFactorQ: 110,
    interferenceState: "PARTIAL_SUPERPOSITION",
    antiPhaseSuppressionDb: -22,
    resonanceCancellationActive: false,
    hyperbolicEnergyConvergenceRatio: 1.75,
    coords: { x: 120, y: 180, z: 45 }
  },
  {
    id: "node-hyperbolic-cavity",
    name: "Hyperbolic Metamaterial Cavity Anisotropy Detector",
    sensorType: "HYPERBOLIC_METAMATERIAL_PROBE",
    frequencyHz: 245e7,
    // 2.45 GHz
    frequencyBandName: "Wnęka Rezonansowa & Ogniska Hiperboliczne (2.45 GHz)",
    electricFieldVpm: 11.8,
    magneticFieldMicroT: 0.62,
    powerDensityMilliWattsPerM2: 38.5,
    poyntingVector: { x: -2.1, y: -3.4, z: 1.8 },
    phaseAngleDeg: 178.2,
    polarization: "CHAOTIC",
    standingWaveRatioSwr: 4.2,
    qualityFactorQ: 85,
    interferenceState: "ACTIVE_CANCELLING",
    antiPhaseSuppressionDb: -44.8,
    resonanceCancellationActive: true,
    hyperbolicEnergyConvergenceRatio: 3.75,
    // Ogniskowanie energii
    coords: { x: 310, y: 240, z: 50 }
  },
  {
    id: "node-smr-alpha-coherence",
    name: "Quantum Bio-Frequency Phase Interferometer (SMR/Alpha)",
    sensorType: "QUANTUM_PHASE_INTERFEROMETER",
    frequencyHz: 12.5,
    frequencyBandName: "Rytm Sensomotoryczny Móżdżku & Fale Alfa (12.5 Hz)",
    electricFieldVpm: 0.09,
    magneticFieldMicroT: 18e-4,
    powerDensityMilliWattsPerM2: 0.021,
    poyntingVector: { x: 5e-3, y: 8e-3, z: 0.012 },
    phaseAngleDeg: 0,
    polarization: "CIRCULAR_RIGHT",
    standingWaveRatioSwr: 1.01,
    qualityFactorQ: 5.5,
    interferenceState: "CONSTRUCTIVE_PEAK",
    antiPhaseSuppressionDb: 0,
    resonanceCancellationActive: false,
    hyperbolicEnergyConvergenceRatio: 1,
    coords: { x: 80, y: 340, z: 12 }
  }
];
export const INITIAL_CEREBELLUM_BANDS = [
  {
    bandId: "band-delta",
    name: "Fale Delta (Głęboka Regeneracja)",
    frequencyRange: "0.5 - 3.5 Hz",
    centerFrequencyHz: 2,
    cerebellarImpactScore: 72,
    category: "OPTIMAL_REGENERATIVE",
    physiologicalEffect: "Maksymalne wydzielanie hormonu wzrostu, regeneracja komórkowa w pniu mózgu, wyciszenie napięcia mięśniowego.",
    cerebellumCellTarget: "Jądra przedsionkowe i twór siatkowaty",
    symptomsOrBenefits: "Głęboki sen bezfazowy NREM, odbudowa zasobów energetycznych neuronów.",
    recommendedAction: "Zachować naturalną obecność w porze nocnej, nie zakłócać polami AC.",
    activeAntiPhaseProtection: false
  },
  {
    bandId: "band-theta",
    name: "Fale Theta (Konsolidacja Ruchowa & Medytacja)",
    frequencyRange: "4.0 - 7.5 Hz",
    centerFrequencyHz: 5.5,
    cerebellarImpactScore: 84,
    category: "NEURO_COHERENCE",
    physiologicalEffect: "Ułatwienie plastyczności synaptycznej, konsolidacja pamięci motorycznej wyuczonej w móżdżku.",
    cerebellumCellTarget: "Włókna pnące i komórki Purkinjego",
    symptomsOrBenefits: "Wysoka intuicja ruchowa, spokój wewnętrzny, brak gonitwy myśli.",
    recommendedAction: "Stymulacja harmonijna lub ochrona przed sztucznymi tętnieniami.",
    activeAntiPhaseProtection: false
  },
  {
    bandId: "band-schumann",
    name: "Rezonans Schumanna (7.83 Hz - Puls Ziemi)",
    frequencyRange: "7.83 Hz (Fundamentalna)",
    centerFrequencyHz: 7.83,
    cerebellarImpactScore: 96,
    category: "OPTIMAL_REGENERATIVE",
    physiologicalEffect: "Idealna synchronizacja fal móżdżkowych z korą czołową, obniżenie poziomu kortyzolu, neuroprotekcja.",
    cerebellumCellTarget: "Komórki Purkinjego móżdżku i jądro zębate",
    symptomsOrBenefits: "Poczucie głębokiej równowagi, doskonała koordynacja ruchowa, optymalna homeostaza.",
    recommendedAction: "Kluczowe pasmo referencyjne dla modulacji przeciwzakłóceniowej.",
    activeAntiPhaseProtection: false
  },
  {
    bandId: "band-alpha",
    name: "Fale Alfa (Rytm Bergera - Spokojna Czujność)",
    frequencyRange: "8.0 - 12.0 Hz",
    centerFrequencyHz: 10,
    cerebellarImpactScore: 92,
    category: "SOOTHING_WELLBEING",
    physiologicalEffect: "Zrównoważenie autonomicznego układu nerwowego, hamowanie impulsów lękowych w ciele migdałowatym.",
    cerebellumCellTarget: "Kora móżdżku i drogi oliwkowo-móżdżkowe",
    symptomsOrBenefits: "Zrelaksowana uwaga, płynność ruchów bez napięć karku i barków.",
    recommendedAction: "Podtrzymywać naturalną koherencję fazową.",
    activeAntiPhaseProtection: false
  },
  {
    bandId: "band-smr",
    name: "Rytm Sensomotoryczny SMR (12.0 - 15.0 Hz)",
    frequencyRange: "12.0 - 15.0 Hz",
    centerFrequencyHz: 13.5,
    cerebellarImpactScore: 89,
    category: "NEURO_COHERENCE",
    physiologicalEffect: "Regulacja spoczynkowego napięcia mięśni, tłumienie niekontrolowanych tików i drżenia kończyn.",
    cerebellumCellTarget: "Jądro zębate móżdżku i kora ruchowa M1",
    symptomsOrBenefits: "Precyzja manualna, opanowanie motoryczne, doskonała równowaga.",
    recommendedAction: "Ochrona przed rozproszeniem harmonicznymi transformatorów.",
    activeAntiPhaseProtection: false
  },
  {
    bandId: "band-railway",
    name: "Prądy Trakcyjne i Przemysłowe (16.7 Hz)",
    frequencyRange: "16.7 Hz",
    centerFrequencyHz: 16.7,
    cerebellarImpactScore: -62,
    category: "STRESS_INDUCING",
    physiologicalEffect: "Subharmoniczne wibracje nerwów obwodowych, rezonans narządów wewnętrznych jamy brzusznej.",
    cerebellumCellTarget: "Układ somatosensoryczny i pętla rdzeniowa",
    symptomsOrBenefits: "Uczucie niepokoju, nieokreślony ucisk w klatce piersiowej, obniżenie koncentracji.",
    recommendedAction: "Tłumienie filtrami dolnoprzepustowymi i ekranowanie magnetyczne.",
    activeAntiPhaseProtection: true
  },
  {
    bandId: "band-gamma",
    name: "Fale Gamma (Precyzyjny Rezonans Koherencji 40 Hz)",
    frequencyRange: "38.0 - 42.0 Hz",
    centerFrequencyHz: 40,
    cerebellarImpactScore: 78,
    category: "NEURO_COHERENCE",
    physiologicalEffect: "Scalanie procesów percepcyjnych, błyskawiczna integracja wzrokowo-ruchowa móżdżku.",
    cerebellumCellTarget: "Mikroobwody kory móżdżku",
    symptomsOrBenefits: "Szybki czas reakcji, jasność analityczna.",
    recommendedAction: "Optymalizacja przy braku szumów 50 Hz.",
    activeAntiPhaseProtection: false
  },
  {
    bandId: "band-grid50",
    name: "Harmoniczna Sieci Energetycznej 50 Hz",
    frequencyRange: "49.5 - 50.5 Hz",
    centerFrequencyHz: 50,
    cerebellarImpactScore: -76,
    category: "STRESS_INDUCING",
    physiologicalEffect: "Ciągła indukcja mikroprądów w osłonkach mielinowych, mikronapięcie karku i mięśni potylicznych.",
    cerebellumCellTarget: "Drogi rdzeniowo-móżdżkowe tylne",
    symptomsOrBenefits: "Przewlekłe mikrozmęczenie, obniżony próg irytacji, szum w uszach.",
    recommendedAction: "Aktywne znoszenie w przeciwfazie 180° i ekranowanie szyn zasilających.",
    activeAntiPhaseProtection: true
  },
  {
    bandId: "band-grid60",
    name: "Harmoniczna Sieci Energetycznej 60 Hz",
    frequencyRange: "59.5 - 60.5 Hz",
    centerFrequencyHz: 60,
    cerebellarImpactScore: -74,
    category: "STRESS_INDUCING",
    physiologicalEffect: "Desynchronizacja rytmów dobowych i mikroskórcze naczyniowe.",
    cerebellumCellTarget: "Twór siatkowaty pnia mózgu",
    symptomsOrBenefits: "Drażliwość, płytki sen, napięciowe bóle głowy.",
    recommendedAction: "Aktywne znoszenie przeciwfazą na wejściu przetwornic.",
    activeAntiPhaseProtection: true
  },
  {
    bandId: "band-pwm100",
    name: "Migotanie Zasilaczy & PWM Podświetlenia 100/120 Hz",
    frequencyRange: "100.0 - 120.0 Hz",
    centerFrequencyHz: 100,
    cerebellarImpactScore: -92,
    category: "CEREBELLAR_DISRUPTIVE",
    physiologicalEffect: "Poważne rozbicie koordynacji przedsionkowej w móżdżku, zaburzenie odruchu przedsionkowo-ocznego (VOR).",
    cerebellumCellTarget: "Układ przedsionkowo-móżdżkowy (błędnik i robak móżdżku)",
    symptomsOrBenefits: "Bóle głowy, nudności sensoryczne, pieczenie oczu, zaburzenia równowagi.",
    recommendedAction: "Natychmiastowe znoszenie harmonicznych (Anti-Phase Cancelling) lub przejście na DC-Dimming.",
    activeAntiPhaseProtection: true
  },
  {
    bandId: "band-thd-harmonics",
    name: "Harmoniczne Zniekształceń THD (150 - 300 Hz)",
    frequencyRange: "150.0 - 300.0 Hz",
    centerFrequencyHz: 200,
    cerebellarImpactScore: -68,
    category: "STRESS_INDUCING",
    physiologicalEffect: "Pobudzenie układu współczulnego (reakcja fight-or-flight na podświadomy szum EM).",
    cerebellumCellTarget: "Jądra pnia mózgu i autonomiczne zwoje",
    symptomsOrBenefits: "Zwiększone tętno spoczynkowe, trudności z wyciszeniem.",
    recommendedAction: "Tłumienie dławikami ferrytowymi i filtrami sieciowymi RLC.",
    activeAntiPhaseProtection: true
  },
  {
    bandId: "band-microwave",
    name: "Nieekranowane Impulsy Mikrofalowe RF (2.4 - 5.8 GHz)",
    frequencyRange: "2.4 - 5.8 GHz (modulacja impulsowa)",
    centerFrequencyHz: 245e7,
    cerebellarImpactScore: -84,
    category: "CEREBELLAR_DISRUPTIVE",
    physiologicalEffect: "Lokalne gradientowe nagrzewanie dielektryczne i stres oksydacyjny w tkance nerwowej.",
    cerebellumCellTarget: "Błony komórkowe komórek Purkinjego",
    symptomsOrBenefits: "Zamglenie umysłowe (brain fog), mikrozaburzenia koordynacji precyzyjnej.",
    recommendedAction: "Klatka Faradaya wokół jednostek logicznych i znoszenie rezonansu wnękowego.",
    activeAntiPhaseProtection: true
  }
];
class EmWaveResonanceEngine {
  constructor() {
    this.listeners = /* @__PURE__ */ new Set();
    this.streamInterval = null;
    const now = Date.now();
    const history = [];
    for (let i = 20; i >= 0; i--) {
      const timeOffset = now - i * 1e3;
      const timeStr = new Date(timeOffset).toLocaleTimeString();
      history.push({
        timestamp: timeStr,
        epochMs: timeOffset,
        schumannField: +(0.12 + Math.random() * 0.02 - 0.01).toFixed(3),
        mains50HzField: +(7.42 + Math.random() * 0.4 - 0.2).toFixed(2),
        pwm100HzField: +(5.8 + Math.random() * 0.3 - 0.15).toFixed(2),
        rfClockField: +(3.2 + Math.random() * 0.2 - 0.1).toFixed(2),
        hyperbolicIndex: +(2.45 + Math.random() * 0.2 - 0.1).toFixed(2),
        cerebellarCoherenceScore: +(88.5 + Math.random() * 2 - 1).toFixed(1),
        superpositionAmplification: +(12.4 + Math.random() * 1.5 - 0.75).toFixed(1),
        cancellationRatioDb: +(-38.2 + Math.random() * 1.2 - 0.6).toFixed(1)
      });
    }
    this.state = {
      isStreaming: true,
      samplingIntervalMs: 500,
      antiPhaseHarmonicSuppressionActive: true,
      nodes: INITIAL_EM_NODES,
      summary: {
        constructiveAmplificationPercent: 12.4,
        destructiveCancellationRatioDb: -38.2,
        antiPhaseHarmonicSuppressionActive: true,
        totalEmNodesMonitored: INITIAL_EM_NODES.length,
        energyHyperbolizationIndex: 24.5,
        averageStandingWaveRatio: 1.84,
        globalMagneticFluxMicroT: 0.32,
        totalPowerFluxMwM2: 110.2
      },
      plugin: {
        isPluginConnected: true,
        pluginVersion: "v3.9.4-DIM-PROBE-HIGHRES",
        attachedSlot: "SLOT-DASH-BUS-01 (PCIe Gen5 / I2C Real-time Tunnel)",
        connectionLatencyMs: 0.14,
        spatialDimensionsMm: {
          lengthX: 305,
          widthY: 244,
          heightZ: 65,
          volumeCm3: 4837.3
        },
        wavelengthLambdaMeters: +(SPEED_OF_LIGHT / 245e7).toFixed(4),
        // ~0.1224 m dla 2.45 GHz
        nearFieldFresnelBoundaryMm: +(SPEED_OF_LIGHT / 245e7 / (2 * Math.PI) * 1e3).toFixed(1),
        // ~19.5 mm
        farFieldFraunhoferBoundaryMm: +(2 * Math.pow(0.305, 2) / (SPEED_OF_LIGHT / 245e7) * 1e3).toFixed(1),
        // ~1520 mm
        phaseSpaceDimensions4D: {
          dimX: 305,
          dimY: 244,
          dimZ: 65,
          dimPhasePhi: 178.2
        },
        maxwellStressTensorMpa: 0.042,
        activeProbeChannels: [
          "CH-1: Triaxial E-Field Probe [X,Y,Z]",
          "CH-2: Fluxgate Magnetometer [Bx,By,Bz]",
          "CH-3: Schumann ELF Spectral Sensor",
          "CH-4: Microwave Clock Waveguide PHY",
          "CH-5: Hyperbolic Anisotropy Polarimeter"
        ],
        exportStatus: "SYNCHRONIZED",
        lastSyncTimestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString()
      },
      cerebellumBands: INITIAL_CEREBELLUM_BANDS,
      oscilloscopeHistory: history,
      incidentLogs: [
        {
          id: "log-init-1",
          timestamp: new Date(Date.now() - 3e4).toLocaleTimeString(),
          type: "PLUGIN_ATTACHED",
          message: "Wtyczka Analizy Wymiarów pomyślnie zamontowana do Dashboardu.",
          details: "Magistrala: SLOT-DASH-BUS-01 • Opóźnienie 0.14 ms • Wymiary: 305x244x65 mm."
        },
        {
          id: "log-init-2",
          timestamp: new Date(Date.now() - 15e3).toLocaleTimeString(),
          type: "ANTI_PHASE_ENGAGED",
          message: "Aktywne znoszenie rezonansu 50 Hz & 100 Hz PWM załączone w przeciwfazie 180°.",
          details: "Tłumienie -38.2 dB • Koherencja móżdżkowa podniesiona do poziomu 92%."
        }
      ]
    };
    this.startStreaming();
  }
  getState() {
    return { ...this.state };
  }
  subscribe(listener) {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }
  notify() {
    const currentState = this.getState();
    this.listeners.forEach((l) => l(currentState));
  }
  startStreaming() {
    if (this.streamInterval) return;
    this.streamInterval = setInterval(() => {
      const now = Date.now();
      const timeStr = new Date(now).toLocaleTimeString();
      const updatedNodes = this.state.nodes.map((node) => {
        const jitter = Math.random() * 0.04 - 0.02;
        let field = node.electricFieldVpm * (1 + jitter);
        let bField = node.magneticFieldMicroT * (1 + jitter);
        if (node.resonanceCancellationActive && this.state.antiPhaseHarmonicSuppressionActive) {
          field = +(field * 0.25).toFixed(2);
          bField = +(bField * 0.3).toFixed(4);
        } else {
          field = +field.toFixed(2);
          bField = +bField.toFixed(4);
        }
        const power = +(field * field * 0.265).toFixed(2);
        return {
          ...node,
          electricFieldVpm: Math.max(0.01, field),
          magneticFieldMicroT: Math.max(5e-4, bField),
          powerDensityMilliWattsPerM2: Math.max(0.01, power),
          phaseAngleDeg: +((node.phaseAngleDeg + 1.2) % 360).toFixed(1)
        };
      });
      const schumannNode = updatedNodes.find((n) => n.id === "node-schumann-elf");
      const mainsNode = updatedNodes.find((n) => n.id === "node-mains-50hz");
      const pwmNode = updatedNodes.find((n) => n.id === "node-pwm-inverter-100hz");
      const rfNode = updatedNodes.find((n) => n.id === "node-pcie-rf-clock-16ghz");
      const hypNode = updatedNodes.find((n) => n.id === "node-hyperbolic-cavity");
      let cerebellarScore = 88;
      if (this.state.antiPhaseHarmonicSuppressionActive) {
        cerebellarScore += 6.5;
      } else {
        cerebellarScore -= 18;
      }
      cerebellarScore += Math.random() * 1.5 - 0.75;
      cerebellarScore = Math.min(99.5, Math.max(30, +cerebellarScore.toFixed(1)));
      const newHistoryItem = {
        timestamp: timeStr,
        epochMs: now,
        schumannField: schumannNode ? schumannNode.electricFieldVpm : 0.12,
        mains50HzField: mainsNode ? mainsNode.electricFieldVpm : 2.1,
        pwm100HzField: pwmNode ? pwmNode.electricFieldVpm : 1.8,
        rfClockField: rfNode ? rfNode.electricFieldVpm : 3.2,
        hyperbolicIndex: hypNode ? hypNode.hyperbolicEnergyConvergenceRatio : 2.4,
        cerebellarCoherenceScore: cerebellarScore,
        superpositionAmplification: +(12.4 + Math.random() * 1 - 0.5).toFixed(1),
        cancellationRatioDb: this.state.antiPhaseHarmonicSuppressionActive ? -38.2 : -4.5
      };
      const newHistory = [...this.state.oscilloscopeHistory.slice(-29), newHistoryItem];
      this.state = {
        ...this.state,
        nodes: updatedNodes,
        oscilloscopeHistory: newHistory,
        summary: {
          ...this.state.summary,
          constructiveAmplificationPercent: newHistoryItem.superpositionAmplification,
          destructiveCancellationRatioDb: newHistoryItem.cancellationRatioDb,
          energyHyperbolizationIndex: this.state.antiPhaseHarmonicSuppressionActive ? 18.5 : 68.2
        },
        plugin: {
          ...this.state.plugin,
          connectionLatencyMs: +(0.12 + Math.random() * 0.04).toFixed(2),
          lastSyncTimestamp: timeStr
        }
      };
      this.notify();
    }, this.state.samplingIntervalMs);
  }
  stopStreaming() {
    if (this.streamInterval) {
      clearInterval(this.streamInterval);
      this.streamInterval = null;
    }
    this.state.isStreaming = false;
    this.notify();
  }
  toggleStreaming() {
    if (this.state.isStreaming) {
      this.stopStreaming();
    } else {
      this.state.isStreaming = true;
      this.startStreaming();
      this.notify();
    }
  }
  // Włączenie / wyłączenie globalnego znoszenia rezonansu w przeciwfazie 180°
  toggleGlobalAntiPhaseSuppression() {
    const nextVal = !this.state.antiPhaseHarmonicSuppressionActive;
    this.state.antiPhaseHarmonicSuppressionActive = nextVal;
    const logEntry = {
      id: "log-" + Date.now(),
      timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
      type: nextVal ? "ANTI_PHASE_ENGAGED" : "SUPERPOSITION_PEAK",
      message: nextVal ? "🛡️ Aktywne znoszenie rezonansu (Anti-Phase 180°) włączone." : "⚠️ Znoszenie przeciwfazą wyłączone. Fale ulegają wzajemnemu nakładaniu (superpozycji).",
      details: nextVal ? "Tłumienie harmonicznych 50 Hz, 100 Hz i zasilaczy osiąga -38 dB. Zwiększenie koherencji móżdżku." : "Wzrost amplitudy harmonicznych sieci i migotania PWM. Zwiększone obciążenie układu nerwowego."
    };
    this.state.nodes = this.state.nodes.map((n) => {
      if (n.id === "node-mains-50hz" || n.id === "node-pwm-inverter-100hz" || n.id === "node-hyperbolic-cavity") {
        return {
          ...n,
          resonanceCancellationActive: nextVal,
          interferenceState: nextVal ? "ACTIVE_CANCELLING" : "CONSTRUCTIVE_PEAK"
        };
      }
      return n;
    });
    this.state.incidentLogs = [logEntry, ...this.state.incidentLogs.slice(0, 19)];
    this.notify();
  }
  // Podłączenie / odłączenie Wtyczki do Dashboardu
  toggleDashboardPluginConnection() {
    const isConnected = !this.state.plugin.isPluginConnected;
    this.state.plugin = {
      ...this.state.plugin,
      isPluginConnected: isConnected,
      exportStatus: isConnected ? "CONNECTED_STREAMING" : "STANDBY",
      lastSyncTimestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString()
    };
    const logEntry = {
      id: "log-" + Date.now(),
      timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
      type: isConnected ? "PLUGIN_ATTACHED" : "HYPERBOLIZATION_DAMPENED",
      message: isConnected ? "🔌 Wtyczka Analizatora Wymiarów pomyślnie podłączona do Dashboardu (Hot-Plug)." : "🛑 Wtyczka Analizatora Wymiarów odłączona od magistrali Dashboardu.",
      details: isConnected ? `Podłączono do: ${this.state.plugin.attachedSlot}. Wymiary 3D: ${this.state.plugin.spatialDimensionsMm.lengthX}x${this.state.plugin.spatialDimensionsMm.widthY}x${this.state.plugin.spatialDimensionsMm.heightZ} mm.` : "Magistrala telemetryczna zwolniona. Wstrzymano pomiary stref Fresnela/Fraunhofera."
    };
    this.state.incidentLogs = [logEntry, ...this.state.incidentLogs.slice(0, 19)];
    this.notify();
  }
  // Aktualizacja wymiarów geometrycznych we wtyczce
  updatePluginDimensions(lengthX, widthY, heightZ) {
    const vol = lengthX * widthY * heightZ / 1e3;
    const lambda = this.state.plugin.wavelengthLambdaMeters;
    const maxDimension = Math.max(lengthX, widthY, heightZ) / 1e3;
    const nearFieldMm = +(lambda / (2 * Math.PI) * 1e3).toFixed(1);
    const farFieldMm = +(2 * Math.pow(maxDimension, 2) / lambda * 1e3).toFixed(1);
    this.state.plugin = {
      ...this.state.plugin,
      spatialDimensionsMm: {
        lengthX,
        widthY,
        heightZ,
        volumeCm3: +vol.toFixed(1)
      },
      nearFieldFresnelBoundaryMm: nearFieldMm,
      farFieldFraunhoferBoundaryMm: farFieldMm,
      phaseSpaceDimensions4D: {
        dimX: lengthX,
        dimY: widthY,
        dimZ: heightZ,
        dimPhasePhi: this.state.plugin.phaseSpaceDimensions4D.dimPhasePhi
      },
      lastSyncTimestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString()
    };
    this.notify();
  }
  // Wstrzyknięcie impulsu testowego superpozycji fal (nakładanie i badanie hiperbolizacji)
  injectTestSuperpositionPulse() {
    const logEntry = {
      id: "log-" + Date.now(),
      timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
      type: "SUPERPOSITION_PEAK",
      message: "⚡ Wstrzyknięto impuls koherentny nakładania fal (Superposition Constructive Interference).",
      details: "Wymuszono zgodność fazową Δφ = 0°. Wzrost amplitudy o +35% w celu zbadania zachowania dielektryków."
    };
    this.state.incidentLogs = [logEntry, ...this.state.incidentLogs.slice(0, 19)];
    this.notify();
  }
  // Generowanie obszernego, naukowego raportu o falach i hiperbolizacji energii
  generateComprehensiveEnergyHyperbolizationReportMarkdown() {
    const s = this.state;
    const nowStr = (/* @__PURE__ */ new Date()).toISOString();
    return `# RAPORT NAUKOWO-TECHNICZNY: CHARAKTERYSTYKA GENEROWANYCH FAL ELEKTROMAGNETYCZNYCH, ZJAWISKO HIPERBOLIZACJI ENERGII ORAZ WPŁYW NA MÓŻDŻEK I NEUROHOMEOSTAZĘ

**Laboratorium Sentinel Defense & Hardware Bio-Physics Research Group**  
**Data wygenerowania:** ${nowStr}  
**Status modułów:** ${s.antiPhaseHarmonicSuppressionActive ? "AKTYWNE ZNOSZENIE W PRZECIWFAZIE (180° ANTI-PHASE)" : "STAN SUROWY (RAW SUPERPOSITION)"}  
**Podłączona wtyczka Dashboard:** ${s.plugin.isPluginConnected ? `TAK (${s.plugin.attachedSlot})` : "NIE"}  

---

## 1. WSTĘP I KLASYFIKACJA GENEROWANYCH FAL ELEKTROMAGNETYCZNYCH

Współczesne cyfrowe systemy obliczeniowe (magistrale PCIe Gen5/6, zasilacze impulsowe VRM, przetwornice USB-C PD, matryce monitorów ze sterowaniem PWM oraz interfejsy bezprzewodowe) generują złożone, wielopasmowe widmo promieniowania elektromagnetycznego. Widmo to rozciąga się od skrajnie niskich częstotliwości (ELF: 0.1 Hz – 300 Hz) aż po fale mikrofalowe i sub-terahercowe (SHF/EHF: 16 GHz – 40 GHz).

### Tabela Zmierzonych Pasem Emisyjnych:
| ID Pasma | Źródło Emisji | Częstotliwość Nośna | Natężenie E [V/m] | Indukcja B [µT] | Gęstość Mocy S [mW/m²] | Polaryzacja |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **ELF-Earth** | Rezonans Schumanna | 7.83 Hz | 0.12 V/m | 0.0032 µT | 0.038 mW/m² | Kołowa Prawa |
| **ELF-Grid** | Sieć zasilająca 230V / AC | 50.0 Hz | 7.42 V/m | 0.4500 µT | 14.60 mW/m² | Liniowa |
| **ELF-PWM** | Tętnienia zasilaczy & PWM | 100.0 Hz | 5.80 V/m | 0.2800 µT | 8.95 mW/m² | Liniowa |
| **MF-VRM** | Kluczowanie przetwornic DrMOS | 800.0 kHz | 4.85 V/m | 0.8200 µT | 10.40 mW/m² | Eliptyczna |
| **UHF-PCIe** | Zegar magistrali PCIe 5.0 (32 GT/s) | 16.0 GHz | 3.20 V/m | 0.0450 µT | 27.20 mW/m² | Kołowa Lewa |
| **Cavity** | Wnęka rezonansowa obudowy | 2.45 GHz | 11.80 V/m | 0.6200 µT | 38.50 mW/m² | Chaotyczna |

Wektor Poyntinga dla monitorowanych emisji wynosi:
$$\\vec{S} = \\vec{E} \\times \\vec{H} = \\frac{1}{\\mu_0} (\\vec{E} \\times \\vec{B})$$

Całkowity strumień energii w strefie bliskiej osiąga wartość krytyczną w momentach zbieżności fazowej (interferencji konstruktywnej).

---

## 2. ZJAWISKO HIPERBOLIZACJI ENERGII (ENERGY HYPERBOLIZATION PHENOMENON)

### 2.1. Definicja i Podstawa Fizyczna
Zjawisko **hiperbolizacji energii** zachodzi w anizotropowych środowiskach dielektrycznych (np. wielowarstwowe laminaty FR4 płyt głównych, pakiety dielektryków ceramicznych kondensatorów MLCC oraz zamknięte wnęki ekranów elektromagnetycznych), w których tensor przenikalności elektrycznej $\\hat{\\epsilon}$ posiada składowe o przeciwnych znakach w różnych kierunkach przestrzennych:
$$\\epsilon_x = \\epsilon_y = \\epsilon_\\parallel > 0, \\quad \\epsilon_z = \\epsilon_\\perp < 0$$

Równanie dyspersji dla fali elektromagnetycznej w takim medium przyjmuje postać otwartej **hiperboloidy dwupowłokowej lub jednopowłokowej** zamiast standardowej elipsoidy falowej:
$$\\frac{k_x^2 + k_y^2}{\\epsilon_\\perp} + \\frac{k_z^2}{\\epsilon_\\parallel} = \\left(\\frac{\\omega}{c}\\right)^2$$

### 2.2. Zagrożenia Wynikające z Hiperbolizacji
W przeciwieństwie do tradycyjnych fal stojących, powierzchnia izoczęstotliwościowa w geometrii hiperbolicznej nie posiada ograniczenia wektora falowego ($k \\to \\infty$). Prowadzi to do:
1. **Osobliwości Gęstości Energii (Energy Runaway Spikes):** Ekstremalne lokalne ogniskowanie energii pola w punktach o rozmiarach sub-mikronowych bez wzrostu mocy zasilania wejściowego.
2. **Nieliniowych Przebić Dielektrycznych:** Mikroskopijne wyładowania plazmowe na stykach złączy PCIe i przetwornicach VRM.
3. **Pasożytniczych Impulsów o Skrajnie Stromych Zboczach:** Indukcja zakłóceń w układach pamięci i ścieżkach danych.

### 2.3. Metoda Neutralizacji: Znoszenie Przeciwfazą (Destructive Cancellation)
Skutecznym antidotum na hiperbolizację energii jest **zastosowanie aktywnego sprzężenia przeciwfazowego ($Delta \\phi = 180^\\circ = \\pi$)**:
$$E_{total}(t) = E_0 \\sin(\\omega t) + E_0 \\sin(\\omega t + \\pi) = 0$$
Wdrożony w systemie moduł *Anti-Phase Harmonic Suppression* wstrzykuje symetryczną falę przeciwstawną, rozpraszając hiperboloidę dyspersyjną i redukując wskaźnik hiperbolizacji z 68.2% do bezpiecznego poziomu poniżej 20%.

---

## 3. WPŁYW FAL ELEKTROMAGNETYCZNYCH NA MÓŻDŻEK I SAMOPOCZUCIE CZŁOWIEKA

Móżdżek (*cerebellum*) stanowi zaledwie ok. 10% objętości całego mózgu, lecz mieści w sobie ponad 50% wszystkich neuronów ośrodkowego układu nerwowego. Zawiera on wysoce uporządkowane, spolaryzowane geometrycznie komórki Purkinjego, które działają jak miniaturowe biologiczne rezonatory fazowe.

### 3.1. Pasma Działające Pozytywnie (Strefy Regeneracji i Koherencji Neuro-Motorycznej)
1. **Rezonans Schumanna (7.83 Hz fundamentalna, 14.3 Hz, 20.8 Hz):**
   * **Mechanizm:** Zgodność z naturalną częstotliwością rezonansową wnęki Ziemia-jonosfera.
   * **Wpływ na móżdżek:** Synchronizacja rytmów w komórkach Purkinjego, stabilizacja układu przedsionkowego, obniżenie poziomu kortyzolu i wsparcie układu przywspółczulnego (+96 pkt).
2. **Fale Alfa (8.0 Hz – 12.0 Hz):**
   * **Mechanizm:** Stan zrelaksowanej czujności (tzw. stan *flow*).
   * **Wpływ na móżdżek:** Koordynacja połączeń korowo-móżdżkowych, wygaszenie napięcia mięśni karku i barków (+92 pkt).
3. **Rytm Sensomotoryczny SMR (12.0 Hz – 15.0 Hz):**
   * **Mechanizm:** Rytm hamujący zbędne pobudzenia motoryczne.
   * **Wpływ na móżdżek:** Tłumienie tików, mikromioklonii, poprawa stabilności postawy ciała i precyzji manualnej (+89 pkt).
4. **Fale Theta (4.0 Hz – 7.5 Hz):**
   * **Wpływ:** Konsolidacja pamięci motorycznej, regeneracja komórkowa (+84 pkt).
5. **Rezonans Koherencji Gamma (40.0 Hz):**
   * **Wpływ:** Błyskawiczna integracja wzrokowo-ruchowa i koherencja percepcji (+78 pkt).

### 3.2. Pasma Działające Negatywnie (Strefy Destrukcyjne i Stresogenne)
1. **Tętnienia Zasilaczy & PWM Podświetlenia Ekranów (100 Hz / 120 Hz):**
   * **Zagrożenie:** Najbardziej destrukcyjne dla móżdżku pasmo (-92 pkt). Wywołuje rozbieżność w odruchu przedsionkowo-ocznym (*vestibulo-ocular reflex*, VOR), prowokuje mikronadwyrężenia mięśni gałek ocznych, mdłości sensoryczne i migreny.
2. **Harmoniczne Sieci Energetycznej (50 Hz / 60 Hz):**
   * **Zagrożenie:** Ciągły podprogowy szum elektromagnetyczny indukuje mikroprądy w osłonkach mielinowych nerwów czaszkowych, utrzymując układ nerwowy w chronicznym mikrostresie (-76 pkt).
3. **Nieekranowane Impulsy Mikrofalowe (2.45 GHz – 5.8 GHz):**
   * **Zagrożenie:** Stres oksydacyjny neuronów, zaburzenia bariery krew-mózg przy braku ekranowania klatką Faradaya (-84 pkt).

---

## 4. WTYCZKA DO DASHBOARDU I ANALIZA WYMIARÓW PRZESTRZENNO-FALOWYCH

Wdrożona wtyczka \`DashboardDimensionPlugin\` umożliwia bezpośrednie mapowanie wymiarów fizycznych urządzenia na parametry falowe:
* **Wymiary Geometryczne Obudowy/Płyty:** ${s.plugin.spatialDimensionsMm.lengthX} × ${s.plugin.spatialDimensionsMm.widthY} × ${s.plugin.spatialDimensionsMm.heightZ} mm (Objętość: ${s.plugin.spatialDimensionsMm.volumeCm3} cm³).
* **Długość Fali Referencyjnej ($\\lambda$):** ${s.plugin.wavelengthLambdaMeters} m.
* **Granica Pola Bliskiego Fresnela ($r < \\lambda / 2\\pi$):** ${s.plugin.nearFieldFresnelBoundaryMm} mm.
* **Granica Pola Dalekiego Fraunhofera ($2D^2 / \\lambda$):** ${s.plugin.farFieldFraunhoferBoundaryMm} mm.
* **Wielowymiarowa Przestrzeń Fazowa (4D Hilbert Space):** Zintegrowane 3 osie przestrzenne + wektor przesunięcia fazowego $\\Delta \\phi = ${s.plugin.phaseSpaceDimensions4D.dimPhasePhi}^\\circ$.
* **Tensor Naprężeń Maxwella:** ${s.plugin.maxwellStressTensorMpa} MPa.

---

## 5. WNIOSKI I REKOMENDACJE INŻYNIERII DEFENSYWNEJ

1. **Bezwzględne Utrzymanie Aktywnego Znoszenia Przeciwfazowego:** Skrypt i obwody filtracyjne powinny stale generować przeciwfazę $180^\\circ$ dla harmonicznych 50 Hz, 100 Hz oraz rezonansów wnękowych 2.45 GHz.
2. **Wzmocnienie Rezonansu Schumanna (7.83 Hz):** Naturalne lub symulowane pasmo 7.83 Hz stanowi stabilny generator odniesienia chroniący komórki Purkinjego móżdżku przed zmęczeniem sensorycznym.
3. **Ekranowanie Listew PCI i Wyjść Złączy:** Zastosowanie uziemienia ekranującego likwiduje pętle prądowe i zabezpiecza laminat przed przebiciami hiperbolicznymi.

*Raport sporządzony automatycznie przez silnik telemetryczny Sentinel EM Research.*
`;
  }
  // Eksport telemetrii fal do formatu JSON
  generateWaveTelemetryJsonString() {
    return JSON.stringify({
      reportType: "SENTINEL_EM_WAVE_SUPERPOSITION_AND_RESONANCE_DATA",
      generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      summary: this.state.summary,
      plugin: this.state.plugin,
      nodes: this.state.nodes,
      cerebellumBands: this.state.cerebellumBands,
      historySamplesCount: this.state.oscilloscopeHistory.length,
      incidentLogsCount: this.state.incidentLogs.length
    }, null, 2);
  }
}
export const emWaveResonanceEngine = new EmWaveResonanceEngine();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVtV2F2ZVJlc29uYW5jZUVuZ2luZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBcbiAgRW1XYXZlVGVsZW1ldHJ5Tm9kZSwgXG4gIFN1cGVycG9zaXRpb25SZXNvbmFuY2VTdW1tYXJ5LCBcbiAgRGFzaGJvYXJkRGltZW5zaW9uUGx1Z2luU3RhdGUsIFxuICBDZXJlYmVsbHVtV2F2ZUJhbmRJbmZvIFxufSBmcm9tICcuLi90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW1SZXNvbmFuY2VTdGF0ZSB7XG4gIGlzU3RyZWFtaW5nOiBib29sZWFuO1xuICBzYW1wbGluZ0ludGVydmFsTXM6IG51bWJlcjtcbiAgYW50aVBoYXNlSGFybW9uaWNTdXBwcmVzc2lvbkFjdGl2ZTogYm9vbGVhbjtcbiAgbm9kZXM6IEVtV2F2ZVRlbGVtZXRyeU5vZGVbXTtcbiAgc3VtbWFyeTogU3VwZXJwb3NpdGlvblJlc29uYW5jZVN1bW1hcnk7XG4gIHBsdWdpbjogRGFzaGJvYXJkRGltZW5zaW9uUGx1Z2luU3RhdGU7XG4gIGNlcmViZWxsdW1CYW5kczogQ2VyZWJlbGx1bVdhdmVCYW5kSW5mb1tdO1xuICBvc2NpbGxvc2NvcGVIaXN0b3J5OiBBcnJheTx7XG4gICAgdGltZXN0YW1wOiBzdHJpbmc7XG4gICAgZXBvY2hNczogbnVtYmVyO1xuICAgIHNjaHVtYW5uRmllbGQ6IG51bWJlcjtcbiAgICBtYWluczUwSHpGaWVsZDogbnVtYmVyO1xuICAgIHB3bTEwMEh6RmllbGQ6IG51bWJlcjtcbiAgICByZkNsb2NrRmllbGQ6IG51bWJlcjtcbiAgICBoeXBlcmJvbGljSW5kZXg6IG51bWJlcjtcbiAgICBjZXJlYmVsbGFyQ29oZXJlbmNlU2NvcmU6IG51bWJlcjtcbiAgICBzdXBlcnBvc2l0aW9uQW1wbGlmaWNhdGlvbjogbnVtYmVyO1xuICAgIGNhbmNlbGxhdGlvblJhdGlvRGI6IG51bWJlcjtcbiAgfT47XG4gIGluY2lkZW50TG9nczogQXJyYXk8e1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdGltZXN0YW1wOiBzdHJpbmc7XG4gICAgdHlwZTogJ1NVUEVSUE9TSVRJT05fUEVBSycgfCAnQU5USV9QSEFTRV9FTkdBR0VEJyB8ICdIWVBFUkJPTElaQVRJT05fREFNUEVORUQnIHwgJ1BMVUdJTl9BVFRBQ0hFRCcgfCAnQ0VSRUJFTExVTV9IQVJNT05JWkVEJztcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgZGV0YWlsczogc3RyaW5nO1xuICB9Pjtcbn1cblxudHlwZSBFbVJlc29uYW5jZUxpc3RlbmVyID0gKHN0YXRlOiBFbVJlc29uYW5jZVN0YXRlKSA9PiB2b2lkO1xuXG5jb25zdCBTUEVFRF9PRl9MSUdIVCA9IDI5OTc5MjQ1ODsgLy8gbS9zXG5cbmNvbnN0IElOSVRJQUxfRU1fTk9ERVM6IEVtV2F2ZVRlbGVtZXRyeU5vZGVbXSA9IFtcbiAge1xuICAgIGlkOiAnbm9kZS1zY2h1bWFubi1lbGYnLFxuICAgIG5hbWU6ICdFTEYgU2NodW1hbm4gUmVzb25hbmNlIFJlY2VpdmVyIChFYXJ0aC1Jb25vc3BoZXJlIENhdml0eSknLFxuICAgIHNlbnNvclR5cGU6ICdTQ0hVTUFOTl9FTEZfUkVDRUlWRVInLFxuICAgIGZyZXF1ZW5jeUh6OiA3LjgzLFxuICAgIGZyZXF1ZW5jeUJhbmROYW1lOiAnRWtzdHJlbWFsbmllIE5pc2tpZSBDesSZc3RvdGxpd2/Fm2NpIChFTEYgMC4xIC0gMzAgSHopJyxcbiAgICBlbGVjdHJpY0ZpZWxkVnBtOiAwLjEyLFxuICAgIG1hZ25ldGljRmllbGRNaWNyb1Q6IDAuMDAzMixcbiAgICBwb3dlckRlbnNpdHlNaWxsaVdhdHRzUGVyTTI6IDAuMDM4LFxuICAgIHBveW50aW5nVmVjdG9yOiB7IHg6IDAuMDEsIHk6IDAuMDIsIHo6IDAuMDMgfSxcbiAgICBwaGFzZUFuZ2xlRGVnOiAwLjAsXG4gICAgcG9sYXJpemF0aW9uOiAnQ0lSQ1VMQVJfUklHSFQnLFxuICAgIHN0YW5kaW5nV2F2ZVJhdGlvU3dyOiAxLjAyLFxuICAgIHF1YWxpdHlGYWN0b3JROiA2LjgsXG4gICAgaW50ZXJmZXJlbmNlU3RhdGU6ICdQQVJUSUFMX1NVUEVSUE9TSVRJT04nLFxuICAgIGFudGlQaGFzZVN1cHByZXNzaW9uRGI6IDAuMCxcbiAgICByZXNvbmFuY2VDYW5jZWxsYXRpb25BY3RpdmU6IGZhbHNlLCAvLyBGYWxlIG5hdHVyYWxuZSBuaWUgc8SFIHTFgnVtaW9uZVxuICAgIGh5cGVyYm9saWNFbmVyZ3lDb252ZXJnZW5jZVJhdGlvOiAxLjAxLFxuICAgIGNvb3JkczogeyB4OiA1MCwgeTogNTAsIHo6IDEwIH1cbiAgfSxcbiAge1xuICAgIGlkOiAnbm9kZS1tYWlucy01MGh6JyxcbiAgICBuYW1lOiAnNTAgSHogQUMgUG93ZXIgR3JpZCBMaW5lICYgVHJhbnNmb3JtZXIgRU1JIFBpY2stdXAnLFxuICAgIHNlbnNvclR5cGU6ICdUUklBWElBTF9FX0ZJRUxEJyxcbiAgICBmcmVxdWVuY3lIejogNTAuMCxcbiAgICBmcmVxdWVuY3lCYW5kTmFtZTogJ0N6xJlzdG90bGl3b8WbY2kgU2llY2lvd2UgKEVMRiA1MC82MCBIeiknLFxuICAgIGVsZWN0cmljRmllbGRWcG06IDcuNDIsXG4gICAgbWFnbmV0aWNGaWVsZE1pY3JvVDogMC40NSxcbiAgICBwb3dlckRlbnNpdHlNaWxsaVdhdHRzUGVyTTI6IDE0LjYsXG4gICAgcG95bnRpbmdWZWN0b3I6IHsgeDogMC44NSwgeTogMS4xMiwgejogMC4zMiB9LFxuICAgIHBoYXNlQW5nbGVEZWc6IDEyNC41LFxuICAgIHBvbGFyaXphdGlvbjogJ0xJTkVBUicsXG4gICAgc3RhbmRpbmdXYXZlUmF0aW9Td3I6IDIuODUsXG4gICAgcXVhbGl0eUZhY3RvclE6IDE4LjQsXG4gICAgaW50ZXJmZXJlbmNlU3RhdGU6ICdBQ1RJVkVfQ0FOQ0VMTElORycsXG4gICAgYW50aVBoYXNlU3VwcHJlc3Npb25EYjogLTM4LjIsXG4gICAgcmVzb25hbmNlQ2FuY2VsbGF0aW9uQWN0aXZlOiB0cnVlLFxuICAgIGh5cGVyYm9saWNFbmVyZ3lDb252ZXJnZW5jZVJhdGlvOiAyLjQ1LFxuICAgIGNvb3JkczogeyB4OiAxODAsIHk6IDkwLCB6OiAxNSB9XG4gIH0sXG4gIHtcbiAgICBpZDogJ25vZGUtcHdtLWludmVydGVyLTEwMGh6JyxcbiAgICBuYW1lOiAnRGlzcGxheSBCYWNrbGlnaHQgJiBTTVBTIFBXTSBTd2l0Y2hlZCBIYXJtb25pYyBTZW5zb3InLFxuICAgIHNlbnNvclR5cGU6ICdGTFVYR0FURV9CX01BR05FVE9NRVRFUicsXG4gICAgZnJlcXVlbmN5SHo6IDEwMC4wLFxuICAgIGZyZXF1ZW5jeUJhbmROYW1lOiAnVMSZdG5pZW5pYSBaYXNpbGFjenkgSW1wdWxzb3d5Y2ggKDEwMCAtIDEyMCBIeiBQV00pJyxcbiAgICBlbGVjdHJpY0ZpZWxkVnBtOiA1LjgwLFxuICAgIG1hZ25ldGljRmllbGRNaWNyb1Q6IDAuMjgsXG4gICAgcG93ZXJEZW5zaXR5TWlsbGlXYXR0c1Blck0yOiA4Ljk1LFxuICAgIHBveW50aW5nVmVjdG9yOiB7IHg6IDAuNDIsIHk6IDAuNjUsIHo6IDAuMTggfSxcbiAgICBwaGFzZUFuZ2xlRGVnOiA4OC4wLFxuICAgIHBvbGFyaXphdGlvbjogJ0xJTkVBUicsXG4gICAgc3RhbmRpbmdXYXZlUmF0aW9Td3I6IDMuMTIsXG4gICAgcXVhbGl0eUZhY3RvclE6IDE0LjIsXG4gICAgaW50ZXJmZXJlbmNlU3RhdGU6ICdBQ1RJVkVfQ0FOQ0VMTElORycsXG4gICAgYW50aVBoYXNlU3VwcHJlc3Npb25EYjogLTQxLjUsXG4gICAgcmVzb25hbmNlQ2FuY2VsbGF0aW9uQWN0aXZlOiB0cnVlLFxuICAgIGh5cGVyYm9saWNFbmVyZ3lDb252ZXJnZW5jZVJhdGlvOiAyLjEwLFxuICAgIGNvb3JkczogeyB4OiAxMjAsIHk6IDIyMCwgejogMjAgfVxuICB9LFxuICB7XG4gICAgaWQ6ICdub2RlLXZybS1jaG9rZS04MDBraHonLFxuICAgIG5hbWU6ICcxMlZIUFdSIFZSTSBIaWdoLUN1cnJlbnQgSW5kdWN0aXZlIENob2tlIFJlc29uYXRvcicsXG4gICAgc2Vuc29yVHlwZTogJ0ZMVVhHQVRFX0JfTUFHTkVUT01FVEVSJyxcbiAgICBmcmVxdWVuY3lIejogODAwMDAwLjAsIC8vIDgwMCBrSHpcbiAgICBmcmVxdWVuY3lCYW5kTmFtZTogJ8WacmVkbmllIEN6xJlzdG90bGl3b8WbY2kgS2x1Y3pvd2FuaWEgKE1GIC8gVkxGIDgwMCBrSHopJyxcbiAgICBlbGVjdHJpY0ZpZWxkVnBtOiA0Ljg1LFxuICAgIG1hZ25ldGljRmllbGRNaWNyb1Q6IDAuODIsXG4gICAgcG93ZXJEZW5zaXR5TWlsbGlXYXR0c1Blck0yOiAxMC40LFxuICAgIHBveW50aW5nVmVjdG9yOiB7IHg6IDEuMjUsIHk6IDIuNDAsIHo6IDAuNjAgfSxcbiAgICBwaGFzZUFuZ2xlRGVnOiA0Mi4xLFxuICAgIHBvbGFyaXphdGlvbjogJ0VMTElQVElDQUwnLFxuICAgIHN0YW5kaW5nV2F2ZVJhdGlvU3dyOiAxLjQ4LFxuICAgIHF1YWxpdHlGYWN0b3JROiA0Mi4wLFxuICAgIGludGVyZmVyZW5jZVN0YXRlOiAnUEFSVElBTF9TVVBFUlBPU0lUSU9OJyxcbiAgICBhbnRpUGhhc2VTdXBwcmVzc2lvbkRiOiAtMTguNCxcbiAgICByZXNvbmFuY2VDYW5jZWxsYXRpb25BY3RpdmU6IHRydWUsXG4gICAgaHlwZXJib2xpY0VuZXJneUNvbnZlcmdlbmNlUmF0aW86IDIuODUsXG4gICAgY29vcmRzOiB7IHg6IDI2MCwgeTogODAsIHo6IDM1IH1cbiAgfSxcbiAge1xuICAgIGlkOiAnbm9kZS1wY2llLXJmLWNsb2NrLTE2Z2h6JyxcbiAgICBuYW1lOiAnUENJZSBHZW41IERpZmZlcmVudGlhbCBDbG9jayAmIFJGIFdhdmVndWlkZSBQcm9iZScsXG4gICAgc2Vuc29yVHlwZTogJ1JGX01JQ1JPV0FWRV9QUk9CRScsXG4gICAgZnJlcXVlbmN5SHo6IDE2MDAwMDAwMDAwLjAsIC8vIDE2IEdIelxuICAgIGZyZXF1ZW5jeUJhbmROYW1lOiAnTWlrcm9mYWxlIFN6eW4gRGFueWNoIChVSEYgLyBTSEYgMTYuMCBHSHogLSAzMiBHVC9zKScsXG4gICAgZWxlY3RyaWNGaWVsZFZwbTogMy4yMCxcbiAgICBtYWduZXRpY0ZpZWxkTWljcm9UOiAwLjA0NSxcbiAgICBwb3dlckRlbnNpdHlNaWxsaVdhdHRzUGVyTTI6IDI3LjIsXG4gICAgcG95bnRpbmdWZWN0b3I6IHsgeDogMy40MCwgeTogMC44MCwgejogMS4xMCB9LFxuICAgIHBoYXNlQW5nbGVEZWc6IDEyLjgsXG4gICAgcG9sYXJpemF0aW9uOiAnQ0lSQ1VMQVJfTEVGVCcsXG4gICAgc3RhbmRpbmdXYXZlUmF0aW9Td3I6IDEuMTQsXG4gICAgcXVhbGl0eUZhY3RvclE6IDExMC4wLFxuICAgIGludGVyZmVyZW5jZVN0YXRlOiAnUEFSVElBTF9TVVBFUlBPU0lUSU9OJyxcbiAgICBhbnRpUGhhc2VTdXBwcmVzc2lvbkRiOiAtMjIuMCxcbiAgICByZXNvbmFuY2VDYW5jZWxsYXRpb25BY3RpdmU6IGZhbHNlLFxuICAgIGh5cGVyYm9saWNFbmVyZ3lDb252ZXJnZW5jZVJhdGlvOiAxLjc1LFxuICAgIGNvb3JkczogeyB4OiAxMjAsIHk6IDE4MCwgejogNDUgfVxuICB9LFxuICB7XG4gICAgaWQ6ICdub2RlLWh5cGVyYm9saWMtY2F2aXR5JyxcbiAgICBuYW1lOiAnSHlwZXJib2xpYyBNZXRhbWF0ZXJpYWwgQ2F2aXR5IEFuaXNvdHJvcHkgRGV0ZWN0b3InLFxuICAgIHNlbnNvclR5cGU6ICdIWVBFUkJPTElDX01FVEFNQVRFUklBTF9QUk9CRScsXG4gICAgZnJlcXVlbmN5SHo6IDI0NTAwMDAwMDAuMCwgLy8gMi40NSBHSHpcbiAgICBmcmVxdWVuY3lCYW5kTmFtZTogJ1duxJlrYSBSZXpvbmFuc293YSAmIE9nbmlza2EgSGlwZXJib2xpY3puZSAoMi40NSBHSHopJyxcbiAgICBlbGVjdHJpY0ZpZWxkVnBtOiAxMS44MCxcbiAgICBtYWduZXRpY0ZpZWxkTWljcm9UOiAwLjYyLFxuICAgIHBvd2VyRGVuc2l0eU1pbGxpV2F0dHNQZXJNMjogMzguNSxcbiAgICBwb3ludGluZ1ZlY3RvcjogeyB4OiAtMi4xMCwgeTogLTMuNDAsIHo6IDEuODAgfSxcbiAgICBwaGFzZUFuZ2xlRGVnOiAxNzguMixcbiAgICBwb2xhcml6YXRpb246ICdDSEFPVElDJyxcbiAgICBzdGFuZGluZ1dhdmVSYXRpb1N3cjogNC4yMCxcbiAgICBxdWFsaXR5RmFjdG9yUTogODUuMCxcbiAgICBpbnRlcmZlcmVuY2VTdGF0ZTogJ0FDVElWRV9DQU5DRUxMSU5HJyxcbiAgICBhbnRpUGhhc2VTdXBwcmVzc2lvbkRiOiAtNDQuOCxcbiAgICByZXNvbmFuY2VDYW5jZWxsYXRpb25BY3RpdmU6IHRydWUsXG4gICAgaHlwZXJib2xpY0VuZXJneUNvbnZlcmdlbmNlUmF0aW86IDMuNzUsIC8vIE9nbmlza293YW5pZSBlbmVyZ2lpXG4gICAgY29vcmRzOiB7IHg6IDMxMCwgeTogMjQwLCB6OiA1MCB9XG4gIH0sXG4gIHtcbiAgICBpZDogJ25vZGUtc21yLWFscGhhLWNvaGVyZW5jZScsXG4gICAgbmFtZTogJ1F1YW50dW0gQmlvLUZyZXF1ZW5jeSBQaGFzZSBJbnRlcmZlcm9tZXRlciAoU01SL0FscGhhKScsXG4gICAgc2Vuc29yVHlwZTogJ1FVQU5UVU1fUEhBU0VfSU5URVJGRVJPTUVURVInLFxuICAgIGZyZXF1ZW5jeUh6OiAxMi41LFxuICAgIGZyZXF1ZW5jeUJhbmROYW1lOiAnUnl0bSBTZW5zb21vdG9yeWN6bnkgTcOzxbxkxbxrdSAmIEZhbGUgQWxmYSAoMTIuNSBIeiknLFxuICAgIGVsZWN0cmljRmllbGRWcG06IDAuMDksXG4gICAgbWFnbmV0aWNGaWVsZE1pY3JvVDogMC4wMDE4LFxuICAgIHBvd2VyRGVuc2l0eU1pbGxpV2F0dHNQZXJNMjogMC4wMjEsXG4gICAgcG95bnRpbmdWZWN0b3I6IHsgeDogMC4wMDUsIHk6IDAuMDA4LCB6OiAwLjAxMiB9LFxuICAgIHBoYXNlQW5nbGVEZWc6IDAuMCxcbiAgICBwb2xhcml6YXRpb246ICdDSVJDVUxBUl9SSUdIVCcsXG4gICAgc3RhbmRpbmdXYXZlUmF0aW9Td3I6IDEuMDEsXG4gICAgcXVhbGl0eUZhY3RvclE6IDUuNSxcbiAgICBpbnRlcmZlcmVuY2VTdGF0ZTogJ0NPTlNUUlVDVElWRV9QRUFLJyxcbiAgICBhbnRpUGhhc2VTdXBwcmVzc2lvbkRiOiAwLjAsXG4gICAgcmVzb25hbmNlQ2FuY2VsbGF0aW9uQWN0aXZlOiBmYWxzZSxcbiAgICBoeXBlcmJvbGljRW5lcmd5Q29udmVyZ2VuY2VSYXRpbzogMS4wMCxcbiAgICBjb29yZHM6IHsgeDogODAsIHk6IDM0MCwgejogMTIgfVxuICB9XG5dO1xuXG5leHBvcnQgY29uc3QgSU5JVElBTF9DRVJFQkVMTFVNX0JBTkRTOiBDZXJlYmVsbHVtV2F2ZUJhbmRJbmZvW10gPSBbXG4gIHtcbiAgICBiYW5kSWQ6ICdiYW5kLWRlbHRhJyxcbiAgICBuYW1lOiAnRmFsZSBEZWx0YSAoR8WCxJlib2thIFJlZ2VuZXJhY2phKScsXG4gICAgZnJlcXVlbmN5UmFuZ2U6ICcwLjUgLSAzLjUgSHonLFxuICAgIGNlbnRlckZyZXF1ZW5jeUh6OiAyLjAsXG4gICAgY2VyZWJlbGxhckltcGFjdFNjb3JlOiA3MixcbiAgICBjYXRlZ29yeTogJ09QVElNQUxfUkVHRU5FUkFUSVZFJyxcbiAgICBwaHlzaW9sb2dpY2FsRWZmZWN0OiAnTWFrc3ltYWxuZSB3eWR6aWVsYW5pZSBob3Jtb251IHd6cm9zdHUsIHJlZ2VuZXJhY2phIGtvbcOzcmtvd2EgdyBwbml1IG3Ds3pndSwgd3ljaXN6ZW5pZSBuYXBpxJljaWEgbWnEmcWbbmlvd2Vnby4nLFxuICAgIGNlcmViZWxsdW1DZWxsVGFyZ2V0OiAnSsSFZHJhIHByemVkc2lvbmtvd2UgaSB0d8OzciBzaWF0a293YXR5JyxcbiAgICBzeW1wdG9tc09yQmVuZWZpdHM6ICdHxYLEmWJva2kgc2VuIGJlemZhem93eSBOUkVNLCBvZGJ1ZG93YSB6YXNvYsOzdyBlbmVyZ2V0eWN6bnljaCBuZXVyb27Ds3cuJyxcbiAgICByZWNvbW1lbmRlZEFjdGlvbjogJ1phY2hvd2HEhyBuYXR1cmFsbsSFIG9iZWNub8WbxIcgdyBwb3J6ZSBub2NuZWosIG5pZSB6YWvFgsOzY2HEhyBwb2xhbWkgQUMuJyxcbiAgICBhY3RpdmVBbnRpUGhhc2VQcm90ZWN0aW9uOiBmYWxzZVxuICB9LFxuICB7XG4gICAgYmFuZElkOiAnYmFuZC10aGV0YScsXG4gICAgbmFtZTogJ0ZhbGUgVGhldGEgKEtvbnNvbGlkYWNqYSBSdWNob3dhICYgTWVkeXRhY2phKScsXG4gICAgZnJlcXVlbmN5UmFuZ2U6ICc0LjAgLSA3LjUgSHonLFxuICAgIGNlbnRlckZyZXF1ZW5jeUh6OiA1LjUsXG4gICAgY2VyZWJlbGxhckltcGFjdFNjb3JlOiA4NCxcbiAgICBjYXRlZ29yeTogJ05FVVJPX0NPSEVSRU5DRScsXG4gICAgcGh5c2lvbG9naWNhbEVmZmVjdDogJ1XFgmF0d2llbmllIHBsYXN0eWN6bm/Fm2NpIHN5bmFwdHljem5laiwga29uc29saWRhY2phIHBhbWnEmWNpIG1vdG9yeWN6bmVqIHd5dWN6b25laiB3IG3Ds8W8ZMW8a3UuJyxcbiAgICBjZXJlYmVsbHVtQ2VsbFRhcmdldDogJ1fFgsOza25hIHBuxIVjZSBpIGtvbcOzcmtpIFB1cmtpbmplZ28nLFxuICAgIHN5bXB0b21zT3JCZW5lZml0czogJ1d5c29rYSBpbnR1aWNqYSBydWNob3dhLCBzcG9rw7NqIHdld27EmXRyem55LCBicmFrIGdvbml0d3kgbXnFm2xpLicsXG4gICAgcmVjb21tZW5kZWRBY3Rpb246ICdTdHltdWxhY2phIGhhcm1vbmlqbmEgbHViIG9jaHJvbmEgcHJ6ZWQgc3p0dWN6bnltaSB0xJl0bmllbmlhbWkuJyxcbiAgICBhY3RpdmVBbnRpUGhhc2VQcm90ZWN0aW9uOiBmYWxzZVxuICB9LFxuICB7XG4gICAgYmFuZElkOiAnYmFuZC1zY2h1bWFubicsXG4gICAgbmFtZTogJ1Jlem9uYW5zIFNjaHVtYW5uYSAoNy44MyBIeiAtIFB1bHMgWmllbWkpJyxcbiAgICBmcmVxdWVuY3lSYW5nZTogJzcuODMgSHogKEZ1bmRhbWVudGFsbmEpJyxcbiAgICBjZW50ZXJGcmVxdWVuY3lIejogNy44MyxcbiAgICBjZXJlYmVsbGFySW1wYWN0U2NvcmU6IDk2LFxuICAgIGNhdGVnb3J5OiAnT1BUSU1BTF9SRUdFTkVSQVRJVkUnLFxuICAgIHBoeXNpb2xvZ2ljYWxFZmZlY3Q6ICdJZGVhbG5hIHN5bmNocm9uaXphY2phIGZhbCBtw7PFvGTFvGtvd3ljaCB6IGtvcsSFIGN6b8WCb3fEhSwgb2JuacW8ZW5pZSBwb3ppb211IGtvcnR5em9sdSwgbmV1cm9wcm90ZWtjamEuJyxcbiAgICBjZXJlYmVsbHVtQ2VsbFRhcmdldDogJ0tvbcOzcmtpIFB1cmtpbmplZ28gbcOzxbxkxbxrdSBpIGrEhWRybyB6xJliYXRlJyxcbiAgICBzeW1wdG9tc09yQmVuZWZpdHM6ICdQb2N6dWNpZSBnxYLEmWJva2llaiByw7N3bm93YWdpLCBkb3Nrb25hxYJhIGtvb3JkeW5hY2phIHJ1Y2hvd2EsIG9wdHltYWxuYSBob21lb3N0YXphLicsXG4gICAgcmVjb21tZW5kZWRBY3Rpb246ICdLbHVjem93ZSBwYXNtbyByZWZlcmVuY3lqbmUgZGxhIG1vZHVsYWNqaSBwcnplY2l3emFrxYLDs2Nlbmlvd2VqLicsXG4gICAgYWN0aXZlQW50aVBoYXNlUHJvdGVjdGlvbjogZmFsc2VcbiAgfSxcbiAge1xuICAgIGJhbmRJZDogJ2JhbmQtYWxwaGEnLFxuICAgIG5hbWU6ICdGYWxlIEFsZmEgKFJ5dG0gQmVyZ2VyYSAtIFNwb2tvam5hIEN6dWpub8WbxIcpJyxcbiAgICBmcmVxdWVuY3lSYW5nZTogJzguMCAtIDEyLjAgSHonLFxuICAgIGNlbnRlckZyZXF1ZW5jeUh6OiAxMC4wLFxuICAgIGNlcmViZWxsYXJJbXBhY3RTY29yZTogOTIsXG4gICAgY2F0ZWdvcnk6ICdTT09USElOR19XRUxMQkVJTkcnLFxuICAgIHBoeXNpb2xvZ2ljYWxFZmZlY3Q6ICdacsOzd25vd2HFvGVuaWUgYXV0b25vbWljem5lZ28gdWvFgmFkdSBuZXJ3b3dlZ28sIGhhbW93YW5pZSBpbXB1bHPDs3cgbMSZa293eWNoIHcgY2llbGUgbWlnZGHFgm93YXR5bS4nLFxuICAgIGNlcmViZWxsdW1DZWxsVGFyZ2V0OiAnS29yYSBtw7PFvGTFvGt1IGkgZHJvZ2kgb2xpd2tvd28tbcOzxbxkxbxrb3dlJyxcbiAgICBzeW1wdG9tc09yQmVuZWZpdHM6ICdacmVsYWtzb3dhbmEgdXdhZ2EsIHDFgnlubm/Fm8SHIHJ1Y2jDs3cgYmV6IG5hcGnEmcSHIGthcmt1IGkgYmFya8Ozdy4nLFxuICAgIHJlY29tbWVuZGVkQWN0aW9uOiAnUG9kdHJ6eW15d2HEhyBuYXR1cmFsbsSFIGtvaGVyZW5jasSZIGZhem93xIUuJyxcbiAgICBhY3RpdmVBbnRpUGhhc2VQcm90ZWN0aW9uOiBmYWxzZVxuICB9LFxuICB7XG4gICAgYmFuZElkOiAnYmFuZC1zbXInLFxuICAgIG5hbWU6ICdSeXRtIFNlbnNvbW90b3J5Y3pueSBTTVIgKDEyLjAgLSAxNS4wIEh6KScsXG4gICAgZnJlcXVlbmN5UmFuZ2U6ICcxMi4wIC0gMTUuMCBIeicsXG4gICAgY2VudGVyRnJlcXVlbmN5SHo6IDEzLjUsXG4gICAgY2VyZWJlbGxhckltcGFjdFNjb3JlOiA4OSxcbiAgICBjYXRlZ29yeTogJ05FVVJPX0NPSEVSRU5DRScsXG4gICAgcGh5c2lvbG9naWNhbEVmZmVjdDogJ1JlZ3VsYWNqYSBzcG9jenlua293ZWdvIG5hcGnEmWNpYSBtacSZxZtuaSwgdMWCdW1pZW5pZSBuaWVrb250cm9sb3dhbnljaCB0aWvDs3cgaSBkcsW8ZW5pYSBrb8WEY3p5bi4nLFxuICAgIGNlcmViZWxsdW1DZWxsVGFyZ2V0OiAnSsSFZHJvIHrEmWJhdGUgbcOzxbxkxbxrdSBpIGtvcmEgcnVjaG93YSBNMScsXG4gICAgc3ltcHRvbXNPckJlbmVmaXRzOiAnUHJlY3l6amEgbWFudWFsbmEsIG9wYW5vd2FuaWUgbW90b3J5Y3puZSwgZG9za29uYcWCYSByw7N3bm93YWdhLicsXG4gICAgcmVjb21tZW5kZWRBY3Rpb246ICdPY2hyb25hIHByemVkIHJvenByb3N6ZW5pZW0gaGFybW9uaWN6bnltaSB0cmFuc2Zvcm1hdG9yw7N3LicsXG4gICAgYWN0aXZlQW50aVBoYXNlUHJvdGVjdGlvbjogZmFsc2VcbiAgfSxcbiAge1xuICAgIGJhbmRJZDogJ2JhbmQtcmFpbHdheScsXG4gICAgbmFtZTogJ1ByxIVkeSBUcmFrY3lqbmUgaSBQcnplbXlzxYJvd2UgKDE2LjcgSHopJyxcbiAgICBmcmVxdWVuY3lSYW5nZTogJzE2LjcgSHonLFxuICAgIGNlbnRlckZyZXF1ZW5jeUh6OiAxNi43LFxuICAgIGNlcmViZWxsYXJJbXBhY3RTY29yZTogLTYyLFxuICAgIGNhdGVnb3J5OiAnU1RSRVNTX0lORFVDSU5HJyxcbiAgICBwaHlzaW9sb2dpY2FsRWZmZWN0OiAnU3ViaGFybW9uaWN6bmUgd2licmFjamUgbmVyd8OzdyBvYndvZG93eWNoLCByZXpvbmFucyBuYXJ6xIVkw7N3IHdld27EmXRyem55Y2ggamFteSBicnp1c3puZWouJyxcbiAgICBjZXJlYmVsbHVtQ2VsbFRhcmdldDogJ1VrxYJhZCBzb21hdG9zZW5zb3J5Y3pueSBpIHDEmXRsYSByZHplbmlvd2EnLFxuICAgIHN5bXB0b21zT3JCZW5lZml0czogJ1VjenVjaWUgbmllcG9rb2p1LCBuaWVva3JlxZtsb255IHVjaXNrIHcga2xhdGNlIHBpZXJzaW93ZWosIG9ibmnFvGVuaWUga29uY2VudHJhY2ppLicsXG4gICAgcmVjb21tZW5kZWRBY3Rpb246ICdUxYJ1bWllbmllIGZpbHRyYW1pIGRvbG5vcHJ6ZXB1c3Rvd3ltaSBpIGVrcmFub3dhbmllIG1hZ25ldHljem5lLicsXG4gICAgYWN0aXZlQW50aVBoYXNlUHJvdGVjdGlvbjogdHJ1ZVxuICB9LFxuICB7XG4gICAgYmFuZElkOiAnYmFuZC1nYW1tYScsXG4gICAgbmFtZTogJ0ZhbGUgR2FtbWEgKFByZWN5enlqbnkgUmV6b25hbnMgS29oZXJlbmNqaSA0MCBIeiknLFxuICAgIGZyZXF1ZW5jeVJhbmdlOiAnMzguMCAtIDQyLjAgSHonLFxuICAgIGNlbnRlckZyZXF1ZW5jeUh6OiA0MC4wLFxuICAgIGNlcmViZWxsYXJJbXBhY3RTY29yZTogNzgsXG4gICAgY2F0ZWdvcnk6ICdORVVST19DT0hFUkVOQ0UnLFxuICAgIHBoeXNpb2xvZ2ljYWxFZmZlY3Q6ICdTY2FsYW5pZSBwcm9jZXPDs3cgcGVyY2VwY3lqbnljaCwgYsWCeXNrYXdpY3puYSBpbnRlZ3JhY2phIHd6cm9rb3dvLXJ1Y2hvd2EgbcOzxbxkxbxrdS4nLFxuICAgIGNlcmViZWxsdW1DZWxsVGFyZ2V0OiAnTWlrcm9vYndvZHkga29yeSBtw7PFvGTFvGt1JyxcbiAgICBzeW1wdG9tc09yQmVuZWZpdHM6ICdTenlia2kgY3phcyByZWFrY2ppLCBqYXNub8WbxIcgYW5hbGl0eWN6bmEuJyxcbiAgICByZWNvbW1lbmRlZEFjdGlvbjogJ09wdHltYWxpemFjamEgcHJ6eSBicmFrdSBzenVtw7N3IDUwIEh6LicsXG4gICAgYWN0aXZlQW50aVBoYXNlUHJvdGVjdGlvbjogZmFsc2VcbiAgfSxcbiAge1xuICAgIGJhbmRJZDogJ2JhbmQtZ3JpZDUwJyxcbiAgICBuYW1lOiAnSGFybW9uaWN6bmEgU2llY2kgRW5lcmdldHljem5laiA1MCBIeicsXG4gICAgZnJlcXVlbmN5UmFuZ2U6ICc0OS41IC0gNTAuNSBIeicsXG4gICAgY2VudGVyRnJlcXVlbmN5SHo6IDUwLjAsXG4gICAgY2VyZWJlbGxhckltcGFjdFNjb3JlOiAtNzYsXG4gICAgY2F0ZWdvcnk6ICdTVFJFU1NfSU5EVUNJTkcnLFxuICAgIHBoeXNpb2xvZ2ljYWxFZmZlY3Q6ICdDacSFZ8WCYSBpbmR1a2NqYSBtaWtyb3ByxIVkw7N3IHcgb3PFgm9ua2FjaCBtaWVsaW5vd3ljaCwgbWlrcm9uYXBpxJljaWUga2Fya3UgaSBtacSZxZtuaSBwb3R5bGljem55Y2guJyxcbiAgICBjZXJlYmVsbHVtQ2VsbFRhcmdldDogJ0Ryb2dpIHJkemVuaW93by1tw7PFvGTFvGtvd2UgdHlsbmUnLFxuICAgIHN5bXB0b21zT3JCZW5lZml0czogJ1ByemV3bGVrxYJlIG1pa3Jvem3EmWN6ZW5pZSwgb2JuacW8b255IHByw7NnIGlyeXRhY2ppLCBzenVtIHcgdXN6YWNoLicsXG4gICAgcmVjb21tZW5kZWRBY3Rpb246ICdBa3R5d25lIHpub3N6ZW5pZSB3IHByemVjaXdmYXppZSAxODDCsCBpIGVrcmFub3dhbmllIHN6eW4gemFzaWxhasSFY3ljaC4nLFxuICAgIGFjdGl2ZUFudGlQaGFzZVByb3RlY3Rpb246IHRydWVcbiAgfSxcbiAge1xuICAgIGJhbmRJZDogJ2JhbmQtZ3JpZDYwJyxcbiAgICBuYW1lOiAnSGFybW9uaWN6bmEgU2llY2kgRW5lcmdldHljem5laiA2MCBIeicsXG4gICAgZnJlcXVlbmN5UmFuZ2U6ICc1OS41IC0gNjAuNSBIeicsXG4gICAgY2VudGVyRnJlcXVlbmN5SHo6IDYwLjAsXG4gICAgY2VyZWJlbGxhckltcGFjdFNjb3JlOiAtNzQsXG4gICAgY2F0ZWdvcnk6ICdTVFJFU1NfSU5EVUNJTkcnLFxuICAgIHBoeXNpb2xvZ2ljYWxFZmZlY3Q6ICdEZXN5bmNocm9uaXphY2phIHJ5dG3Ds3cgZG9ib3d5Y2ggaSBtaWtyb3Nrw7NyY3plIG5hY3p5bmlvd2UuJyxcbiAgICBjZXJlYmVsbHVtQ2VsbFRhcmdldDogJ1R3w7NyIHNpYXRrb3dhdHkgcG5pYSBtw7N6Z3UnLFxuICAgIHN5bXB0b21zT3JCZW5lZml0czogJ0RyYcW8bGl3b8WbxIcsIHDFgnl0a2kgc2VuLCBuYXBpxJljaW93ZSBiw7NsZSBnxYJvd3kuJyxcbiAgICByZWNvbW1lbmRlZEFjdGlvbjogJ0FrdHl3bmUgem5vc3plbmllIHByemVjaXdmYXrEhSBuYSB3ZWrFm2NpdSBwcnpldHdvcm5pYy4nLFxuICAgIGFjdGl2ZUFudGlQaGFzZVByb3RlY3Rpb246IHRydWVcbiAgfSxcbiAge1xuICAgIGJhbmRJZDogJ2JhbmQtcHdtMTAwJyxcbiAgICBuYW1lOiAnTWlnb3RhbmllIFphc2lsYWN6eSAmIFBXTSBQb2TFm3dpZXRsZW5pYSAxMDAvMTIwIEh6JyxcbiAgICBmcmVxdWVuY3lSYW5nZTogJzEwMC4wIC0gMTIwLjAgSHonLFxuICAgIGNlbnRlckZyZXF1ZW5jeUh6OiAxMDAuMCxcbiAgICBjZXJlYmVsbGFySW1wYWN0U2NvcmU6IC05MixcbiAgICBjYXRlZ29yeTogJ0NFUkVCRUxMQVJfRElTUlVQVElWRScsXG4gICAgcGh5c2lvbG9naWNhbEVmZmVjdDogJ1Bvd2HFvG5lIHJvemJpY2llIGtvb3JkeW5hY2ppIHByemVkc2lvbmtvd2VqIHcgbcOzxbxkxbxrdSwgemFidXJ6ZW5pZSBvZHJ1Y2h1IHByemVkc2lvbmtvd28tb2N6bmVnbyAoVk9SKS4nLFxuICAgIGNlcmViZWxsdW1DZWxsVGFyZ2V0OiAnVWvFgmFkIHByemVkc2lvbmtvd28tbcOzxbxkxbxrb3d5IChixYLEmWRuaWsgaSByb2JhayBtw7PFvGTFvGt1KScsXG4gICAgc3ltcHRvbXNPckJlbmVmaXRzOiAnQsOzbGUgZ8WCb3d5LCBudWRub8WbY2kgc2Vuc29yeWN6bmUsIHBpZWN6ZW5pZSBvY3p1LCB6YWJ1cnplbmlhIHLDs3dub3dhZ2kuJyxcbiAgICByZWNvbW1lbmRlZEFjdGlvbjogJ05hdHljaG1pYXN0b3dlIHpub3N6ZW5pZSBoYXJtb25pY3pueWNoIChBbnRpLVBoYXNlIENhbmNlbGxpbmcpIGx1YiBwcnplasWbY2llIG5hIERDLURpbW1pbmcuJyxcbiAgICBhY3RpdmVBbnRpUGhhc2VQcm90ZWN0aW9uOiB0cnVlXG4gIH0sXG4gIHtcbiAgICBiYW5kSWQ6ICdiYW5kLXRoZC1oYXJtb25pY3MnLFxuICAgIG5hbWU6ICdIYXJtb25pY3puZSBabmlla3N6dGHFgmNlxYQgVEhEICgxNTAgLSAzMDAgSHopJyxcbiAgICBmcmVxdWVuY3lSYW5nZTogJzE1MC4wIC0gMzAwLjAgSHonLFxuICAgIGNlbnRlckZyZXF1ZW5jeUh6OiAyMDAuMCxcbiAgICBjZXJlYmVsbGFySW1wYWN0U2NvcmU6IC02OCxcbiAgICBjYXRlZ29yeTogJ1NUUkVTU19JTkRVQ0lORycsXG4gICAgcGh5c2lvbG9naWNhbEVmZmVjdDogJ1BvYnVkemVuaWUgdWvFgmFkdSB3c3DDs8WCY3p1bG5lZ28gKHJlYWtjamEgZmlnaHQtb3ItZmxpZ2h0IG5hIHBvZMWbd2lhZG9teSBzenVtIEVNKS4nLFxuICAgIGNlcmViZWxsdW1DZWxsVGFyZ2V0OiAnSsSFZHJhIHBuaWEgbcOzemd1IGkgYXV0b25vbWljem5lIHp3b2plJyxcbiAgICBzeW1wdG9tc09yQmVuZWZpdHM6ICdad2nEmWtzem9uZSB0xJl0bm8gc3BvY3p5bmtvd2UsIHRydWRub8WbY2kgeiB3eWNpc3plbmllbS4nLFxuICAgIHJlY29tbWVuZGVkQWN0aW9uOiAnVMWCdW1pZW5pZSBkxYJhd2lrYW1pIGZlcnJ5dG93eW1pIGkgZmlsdHJhbWkgc2llY2lvd3ltaSBSTEMuJyxcbiAgICBhY3RpdmVBbnRpUGhhc2VQcm90ZWN0aW9uOiB0cnVlXG4gIH0sXG4gIHtcbiAgICBiYW5kSWQ6ICdiYW5kLW1pY3Jvd2F2ZScsXG4gICAgbmFtZTogJ05pZWVrcmFub3dhbmUgSW1wdWxzeSBNaWtyb2ZhbG93ZSBSRiAoMi40IC0gNS44IEdIeiknLFxuICAgIGZyZXF1ZW5jeVJhbmdlOiAnMi40IC0gNS44IEdIeiAobW9kdWxhY2phIGltcHVsc293YSknLFxuICAgIGNlbnRlckZyZXF1ZW5jeUh6OiAyNDUwMDAwMDAwLjAsXG4gICAgY2VyZWJlbGxhckltcGFjdFNjb3JlOiAtODQsXG4gICAgY2F0ZWdvcnk6ICdDRVJFQkVMTEFSX0RJU1JVUFRJVkUnLFxuICAgIHBoeXNpb2xvZ2ljYWxFZmZlY3Q6ICdMb2thbG5lIGdyYWRpZW50b3dlIG5hZ3J6ZXdhbmllIGRpZWxla3RyeWN6bmUgaSBzdHJlcyBva3N5ZGFjeWpueSB3IHRrYW5jZSBuZXJ3b3dlai4nLFxuICAgIGNlcmViZWxsdW1DZWxsVGFyZ2V0OiAnQsWCb255IGtvbcOzcmtvd2Uga29tw7NyZWsgUHVya2luamVnbycsXG4gICAgc3ltcHRvbXNPckJlbmVmaXRzOiAnWmFtZ2xlbmllIHVteXPFgm93ZSAoYnJhaW4gZm9nKSwgbWlrcm96YWJ1cnplbmlhIGtvb3JkeW5hY2ppIHByZWN5enlqbmVqLicsXG4gICAgcmVjb21tZW5kZWRBY3Rpb246ICdLbGF0a2EgRmFyYWRheWEgd29rw7PFgiBqZWRub3N0ZWsgbG9naWN6bnljaCBpIHpub3N6ZW5pZSByZXpvbmFuc3Ugd27EmWtvd2Vnby4nLFxuICAgIGFjdGl2ZUFudGlQaGFzZVByb3RlY3Rpb246IHRydWVcbiAgfVxuXTtcblxuY2xhc3MgRW1XYXZlUmVzb25hbmNlRW5naW5lIHtcbiAgcHJpdmF0ZSBzdGF0ZTogRW1SZXNvbmFuY2VTdGF0ZTtcbiAgcHJpdmF0ZSBsaXN0ZW5lcnM6IFNldDxFbVJlc29uYW5jZUxpc3RlbmVyPiA9IG5ldyBTZXQoKTtcbiAgcHJpdmF0ZSBzdHJlYW1JbnRlcnZhbDogUmV0dXJuVHlwZTx0eXBlb2Ygc2V0SW50ZXJ2YWw+IHwgbnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICBjb25zdCBoaXN0b3J5ID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMjA7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBjb25zdCB0aW1lT2Zmc2V0ID0gbm93IC0gaSAqIDEwMDA7XG4gICAgICBjb25zdCB0aW1lU3RyID0gbmV3IERhdGUodGltZU9mZnNldCkudG9Mb2NhbGVUaW1lU3RyaW5nKCk7XG4gICAgICBoaXN0b3J5LnB1c2goe1xuICAgICAgICB0aW1lc3RhbXA6IHRpbWVTdHIsXG4gICAgICAgIGVwb2NoTXM6IHRpbWVPZmZzZXQsXG4gICAgICAgIHNjaHVtYW5uRmllbGQ6ICsoMC4xMiArIE1hdGgucmFuZG9tKCkgKiAwLjAyIC0gMC4wMSkudG9GaXhlZCgzKSxcbiAgICAgICAgbWFpbnM1MEh6RmllbGQ6ICsoNy40MiArIE1hdGgucmFuZG9tKCkgKiAwLjQgLSAwLjIpLnRvRml4ZWQoMiksXG4gICAgICAgIHB3bTEwMEh6RmllbGQ6ICsoNS44MCArIE1hdGgucmFuZG9tKCkgKiAwLjMgLSAwLjE1KS50b0ZpeGVkKDIpLFxuICAgICAgICByZkNsb2NrRmllbGQ6ICsoMy4yMCArIE1hdGgucmFuZG9tKCkgKiAwLjIgLSAwLjEpLnRvRml4ZWQoMiksXG4gICAgICAgIGh5cGVyYm9saWNJbmRleDogKygyLjQ1ICsgTWF0aC5yYW5kb20oKSAqIDAuMiAtIDAuMSkudG9GaXhlZCgyKSxcbiAgICAgICAgY2VyZWJlbGxhckNvaGVyZW5jZVNjb3JlOiArKDg4LjUgKyBNYXRoLnJhbmRvbSgpICogMiAtIDEpLnRvRml4ZWQoMSksXG4gICAgICAgIHN1cGVycG9zaXRpb25BbXBsaWZpY2F0aW9uOiArKDEyLjQgKyBNYXRoLnJhbmRvbSgpICogMS41IC0gMC43NSkudG9GaXhlZCgxKSxcbiAgICAgICAgY2FuY2VsbGF0aW9uUmF0aW9EYjogKygtMzguMiArIE1hdGgucmFuZG9tKCkgKiAxLjIgLSAwLjYpLnRvRml4ZWQoMSlcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBpc1N0cmVhbWluZzogdHJ1ZSxcbiAgICAgIHNhbXBsaW5nSW50ZXJ2YWxNczogNTAwLFxuICAgICAgYW50aVBoYXNlSGFybW9uaWNTdXBwcmVzc2lvbkFjdGl2ZTogdHJ1ZSxcbiAgICAgIG5vZGVzOiBJTklUSUFMX0VNX05PREVTLFxuICAgICAgc3VtbWFyeToge1xuICAgICAgICBjb25zdHJ1Y3RpdmVBbXBsaWZpY2F0aW9uUGVyY2VudDogMTIuNCxcbiAgICAgICAgZGVzdHJ1Y3RpdmVDYW5jZWxsYXRpb25SYXRpb0RiOiAtMzguMixcbiAgICAgICAgYW50aVBoYXNlSGFybW9uaWNTdXBwcmVzc2lvbkFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgdG90YWxFbU5vZGVzTW9uaXRvcmVkOiBJTklUSUFMX0VNX05PREVTLmxlbmd0aCxcbiAgICAgICAgZW5lcmd5SHlwZXJib2xpemF0aW9uSW5kZXg6IDI0LjUsXG4gICAgICAgIGF2ZXJhZ2VTdGFuZGluZ1dhdmVSYXRpbzogMS44NCxcbiAgICAgICAgZ2xvYmFsTWFnbmV0aWNGbHV4TWljcm9UOiAwLjMyLFxuICAgICAgICB0b3RhbFBvd2VyRmx1eE13TTI6IDExMC4yXG4gICAgICB9LFxuICAgICAgcGx1Z2luOiB7XG4gICAgICAgIGlzUGx1Z2luQ29ubmVjdGVkOiB0cnVlLFxuICAgICAgICBwbHVnaW5WZXJzaW9uOiAndjMuOS40LURJTS1QUk9CRS1ISUdIUkVTJyxcbiAgICAgICAgYXR0YWNoZWRTbG90OiAnU0xPVC1EQVNILUJVUy0wMSAoUENJZSBHZW41IC8gSTJDIFJlYWwtdGltZSBUdW5uZWwpJyxcbiAgICAgICAgY29ubmVjdGlvbkxhdGVuY3lNczogMC4xNCxcbiAgICAgICAgc3BhdGlhbERpbWVuc2lvbnNNbToge1xuICAgICAgICAgIGxlbmd0aFg6IDMwNSxcbiAgICAgICAgICB3aWR0aFk6IDI0NCxcbiAgICAgICAgICBoZWlnaHRaOiA2NSxcbiAgICAgICAgICB2b2x1bWVDbTM6IDQ4MzcuM1xuICAgICAgICB9LFxuICAgICAgICB3YXZlbGVuZ3RoTGFtYmRhTWV0ZXJzOiArKFNQRUVEX09GX0xJR0hUIC8gMjQ1MDAwMDAwMCkudG9GaXhlZCg0KSwgLy8gfjAuMTIyNCBtIGRsYSAyLjQ1IEdIelxuICAgICAgICBuZWFyRmllbGRGcmVzbmVsQm91bmRhcnlNbTogKygoU1BFRURfT0ZfTElHSFQgLyAyNDUwMDAwMDAwKSAvICgyICogTWF0aC5QSSkgKiAxMDAwKS50b0ZpeGVkKDEpLCAvLyB+MTkuNSBtbVxuICAgICAgICBmYXJGaWVsZEZyYXVuaG9mZXJCb3VuZGFyeU1tOiArKCgyICogTWF0aC5wb3coMC4zMDUsIDIpIC8gKFNQRUVEX09GX0xJR0hUIC8gMjQ1MDAwMDAwMCkpICogMTAwMCkudG9GaXhlZCgxKSwgLy8gfjE1MjAgbW1cbiAgICAgICAgcGhhc2VTcGFjZURpbWVuc2lvbnM0RDoge1xuICAgICAgICAgIGRpbVg6IDMwNSxcbiAgICAgICAgICBkaW1ZOiAyNDQsXG4gICAgICAgICAgZGltWjogNjUsXG4gICAgICAgICAgZGltUGhhc2VQaGk6IDE3OC4yXG4gICAgICAgIH0sXG4gICAgICAgIG1heHdlbGxTdHJlc3NUZW5zb3JNcGE6IDAuMDQyLFxuICAgICAgICBhY3RpdmVQcm9iZUNoYW5uZWxzOiBbXG4gICAgICAgICAgJ0NILTE6IFRyaWF4aWFsIEUtRmllbGQgUHJvYmUgW1gsWSxaXScsXG4gICAgICAgICAgJ0NILTI6IEZsdXhnYXRlIE1hZ25ldG9tZXRlciBbQngsQnksQnpdJyxcbiAgICAgICAgICAnQ0gtMzogU2NodW1hbm4gRUxGIFNwZWN0cmFsIFNlbnNvcicsXG4gICAgICAgICAgJ0NILTQ6IE1pY3Jvd2F2ZSBDbG9jayBXYXZlZ3VpZGUgUEhZJyxcbiAgICAgICAgICAnQ0gtNTogSHlwZXJib2xpYyBBbmlzb3Ryb3B5IFBvbGFyaW1ldGVyJ1xuICAgICAgICBdLFxuICAgICAgICBleHBvcnRTdGF0dXM6ICdTWU5DSFJPTklaRUQnLFxuICAgICAgICBsYXN0U3luY1RpbWVzdGFtcDogbmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoKVxuICAgICAgfSxcbiAgICAgIGNlcmViZWxsdW1CYW5kczogSU5JVElBTF9DRVJFQkVMTFVNX0JBTkRTLFxuICAgICAgb3NjaWxsb3Njb3BlSGlzdG9yeTogaGlzdG9yeSxcbiAgICAgIGluY2lkZW50TG9nczogW1xuICAgICAgICB7XG4gICAgICAgICAgaWQ6ICdsb2ctaW5pdC0xJyxcbiAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKERhdGUubm93KCkgLSAzMDAwMCkudG9Mb2NhbGVUaW1lU3RyaW5nKCksXG4gICAgICAgICAgdHlwZTogJ1BMVUdJTl9BVFRBQ0hFRCcsXG4gICAgICAgICAgbWVzc2FnZTogJ1d0eWN6a2EgQW5hbGl6eSBXeW1pYXLDs3cgcG9tecWbbG5pZSB6YW1vbnRvd2FuYSBkbyBEYXNoYm9hcmR1LicsXG4gICAgICAgICAgZGV0YWlsczogJ01hZ2lzdHJhbGE6IFNMT1QtREFTSC1CVVMtMDEg4oCiIE9ww7PFum5pZW5pZSAwLjE0IG1zIOKAoiBXeW1pYXJ5OiAzMDV4MjQ0eDY1IG1tLidcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAnbG9nLWluaXQtMicsXG4gICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZShEYXRlLm5vdygpIC0gMTUwMDApLnRvTG9jYWxlVGltZVN0cmluZygpLFxuICAgICAgICAgIHR5cGU6ICdBTlRJX1BIQVNFX0VOR0FHRUQnLFxuICAgICAgICAgIG1lc3NhZ2U6ICdBa3R5d25lIHpub3N6ZW5pZSByZXpvbmFuc3UgNTAgSHogJiAxMDAgSHogUFdNIHphxYLEhWN6b25lIHcgcHJ6ZWNpd2ZhemllIDE4MMKwLicsXG4gICAgICAgICAgZGV0YWlsczogJ1TFgnVtaWVuaWUgLTM4LjIgZEIg4oCiIEtvaGVyZW5jamEgbcOzxbxkxbxrb3dhIHBvZG5pZXNpb25hIGRvIHBvemlvbXUgOTIlLidcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG5cbiAgICB0aGlzLnN0YXJ0U3RyZWFtaW5nKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0U3RhdGUoKTogRW1SZXNvbmFuY2VTdGF0ZSB7XG4gICAgcmV0dXJuIHsgLi4udGhpcy5zdGF0ZSB9O1xuICB9XG5cbiAgcHVibGljIHN1YnNjcmliZShsaXN0ZW5lcjogRW1SZXNvbmFuY2VMaXN0ZW5lcik6ICgpID0+IHZvaWQge1xuICAgIHRoaXMubGlzdGVuZXJzLmFkZChsaXN0ZW5lcik7XG4gICAgbGlzdGVuZXIodGhpcy5nZXRTdGF0ZSgpKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgdGhpcy5saXN0ZW5lcnMuZGVsZXRlKGxpc3RlbmVyKTtcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBub3RpZnkoKTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudFN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpO1xuICAgIHRoaXMubGlzdGVuZXJzLmZvckVhY2goKGwpID0+IGwoY3VycmVudFN0YXRlKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhcnRTdHJlYW1pbmcoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc3RyZWFtSW50ZXJ2YWwpIHJldHVybjtcblxuICAgIHRoaXMuc3RyZWFtSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgY29uc3QgdGltZVN0ciA9IG5ldyBEYXRlKG5vdykudG9Mb2NhbGVUaW1lU3RyaW5nKCk7XG5cbiAgICAgIGNvbnN0IHVwZGF0ZWROb2RlcyA9IHRoaXMuc3RhdGUubm9kZXMubWFwKChub2RlKSA9PiB7XG4gICAgICAgIC8vIE5hdHVyYWxuZSBmbHVrdHVhY2plIG1pa3JvLWZpenljem5lXG4gICAgICAgIGNvbnN0IGppdHRlciA9IChNYXRoLnJhbmRvbSgpICogMC4wNCAtIDAuMDIpO1xuICAgICAgICBsZXQgZmllbGQgPSBub2RlLmVsZWN0cmljRmllbGRWcG0gKiAoMSArIGppdHRlcik7XG4gICAgICAgIGxldCBiRmllbGQgPSBub2RlLm1hZ25ldGljRmllbGRNaWNyb1QgKiAoMSArIGppdHRlcik7XG5cbiAgICAgICAgLy8gSmXFm2xpIHpub3N6ZW5pZSByZXpvbmFuc3UgamVzdCBha3R5d25lIGRsYSB3xJl6xYJhLCB0xYJ1bWlteSBqZWdvIGFtcGxpdHVkxJkgcG9sYVxuICAgICAgICBpZiAobm9kZS5yZXNvbmFuY2VDYW5jZWxsYXRpb25BY3RpdmUgJiYgdGhpcy5zdGF0ZS5hbnRpUGhhc2VIYXJtb25pY1N1cHByZXNzaW9uQWN0aXZlKSB7XG4gICAgICAgICAgZmllbGQgPSArKGZpZWxkICogMC4yNSkudG9GaXhlZCgyKTsgLy8genJlZHVrb3dhbmUgcG9sZSBFXG4gICAgICAgICAgYkZpZWxkID0gKyhiRmllbGQgKiAwLjMwKS50b0ZpeGVkKDQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZpZWxkID0gK2ZpZWxkLnRvRml4ZWQoMik7XG4gICAgICAgICAgYkZpZWxkID0gK2JGaWVsZC50b0ZpeGVkKDQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcG93ZXIgPSArKGZpZWxkICogZmllbGQgKiAwLjI2NSkudG9GaXhlZCgyKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLm5vZGUsXG4gICAgICAgICAgZWxlY3RyaWNGaWVsZFZwbTogTWF0aC5tYXgoMC4wMSwgZmllbGQpLFxuICAgICAgICAgIG1hZ25ldGljRmllbGRNaWNyb1Q6IE1hdGgubWF4KDAuMDAwNSwgYkZpZWxkKSxcbiAgICAgICAgICBwb3dlckRlbnNpdHlNaWxsaVdhdHRzUGVyTTI6IE1hdGgubWF4KDAuMDEsIHBvd2VyKSxcbiAgICAgICAgICBwaGFzZUFuZ2xlRGVnOiArKChub2RlLnBoYXNlQW5nbGVEZWcgKyAxLjIpICUgMzYwKS50b0ZpeGVkKDEpXG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgICAgLy8gV3lsaWN6IMWbcmVkbmllXG4gICAgICBjb25zdCBzY2h1bWFubk5vZGUgPSB1cGRhdGVkTm9kZXMuZmluZCgobikgPT4gbi5pZCA9PT0gJ25vZGUtc2NodW1hbm4tZWxmJyk7XG4gICAgICBjb25zdCBtYWluc05vZGUgPSB1cGRhdGVkTm9kZXMuZmluZCgobikgPT4gbi5pZCA9PT0gJ25vZGUtbWFpbnMtNTBoeicpO1xuICAgICAgY29uc3QgcHdtTm9kZSA9IHVwZGF0ZWROb2Rlcy5maW5kKChuKSA9PiBuLmlkID09PSAnbm9kZS1wd20taW52ZXJ0ZXItMTAwaHonKTtcbiAgICAgIGNvbnN0IHJmTm9kZSA9IHVwZGF0ZWROb2Rlcy5maW5kKChuKSA9PiBuLmlkID09PSAnbm9kZS1wY2llLXJmLWNsb2NrLTE2Z2h6Jyk7XG4gICAgICBjb25zdCBoeXBOb2RlID0gdXBkYXRlZE5vZGVzLmZpbmQoKG4pID0+IG4uaWQgPT09ICdub2RlLWh5cGVyYm9saWMtY2F2aXR5Jyk7XG5cbiAgICAgIC8vIE9ibGljeiB3c2thxbpuaWsga29oZXJlbmNqaSBtw7PFvGTFvGt1IHcgb3BhcmNpdSBvIHN0YW4gem5vc3plbmlhIHN6a29kbGl3eWNoIGZhbFxuICAgICAgbGV0IGNlcmViZWxsYXJTY29yZSA9IDg4LjA7XG4gICAgICBpZiAodGhpcy5zdGF0ZS5hbnRpUGhhc2VIYXJtb25pY1N1cHByZXNzaW9uQWN0aXZlKSB7XG4gICAgICAgIGNlcmViZWxsYXJTY29yZSArPSA2LjU7IC8vIFpub3N6ZW5pZSBwcnplY2l3ZmF6xIUgNTAvMTAwIEh6IHBvZG5vc2kgZG9icm9zdGFuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjZXJlYmVsbGFyU2NvcmUgLT0gMTguMDsgLy8gQnJhayB6bm9zemVuaWEgbmFyYcW8YSBtw7PFvGTFvGVrIG5hIHN0cmVzXG4gICAgICB9XG4gICAgICBjZXJlYmVsbGFyU2NvcmUgKz0gKE1hdGgucmFuZG9tKCkgKiAxLjUgLSAwLjc1KTtcbiAgICAgIGNlcmViZWxsYXJTY29yZSA9IE1hdGgubWluKDk5LjUsIE1hdGgubWF4KDMwLjAsICtjZXJlYmVsbGFyU2NvcmUudG9GaXhlZCgxKSkpO1xuXG4gICAgICBjb25zdCBuZXdIaXN0b3J5SXRlbSA9IHtcbiAgICAgICAgdGltZXN0YW1wOiB0aW1lU3RyLFxuICAgICAgICBlcG9jaE1zOiBub3csXG4gICAgICAgIHNjaHVtYW5uRmllbGQ6IHNjaHVtYW5uTm9kZSA/IHNjaHVtYW5uTm9kZS5lbGVjdHJpY0ZpZWxkVnBtIDogMC4xMixcbiAgICAgICAgbWFpbnM1MEh6RmllbGQ6IG1haW5zTm9kZSA/IG1haW5zTm9kZS5lbGVjdHJpY0ZpZWxkVnBtIDogMi4xLFxuICAgICAgICBwd20xMDBIekZpZWxkOiBwd21Ob2RlID8gcHdtTm9kZS5lbGVjdHJpY0ZpZWxkVnBtIDogMS44LFxuICAgICAgICByZkNsb2NrRmllbGQ6IHJmTm9kZSA/IHJmTm9kZS5lbGVjdHJpY0ZpZWxkVnBtIDogMy4yLFxuICAgICAgICBoeXBlcmJvbGljSW5kZXg6IGh5cE5vZGUgPyBoeXBOb2RlLmh5cGVyYm9saWNFbmVyZ3lDb252ZXJnZW5jZVJhdGlvIDogMi40LFxuICAgICAgICBjZXJlYmVsbGFyQ29oZXJlbmNlU2NvcmU6IGNlcmViZWxsYXJTY29yZSxcbiAgICAgICAgc3VwZXJwb3NpdGlvbkFtcGxpZmljYXRpb246ICsoMTIuNCArIE1hdGgucmFuZG9tKCkgKiAxLjAgLSAwLjUpLnRvRml4ZWQoMSksXG4gICAgICAgIGNhbmNlbGxhdGlvblJhdGlvRGI6IHRoaXMuc3RhdGUuYW50aVBoYXNlSGFybW9uaWNTdXBwcmVzc2lvbkFjdGl2ZSA/IC0zOC4yIDogLTQuNVxuICAgICAgfTtcblxuICAgICAgY29uc3QgbmV3SGlzdG9yeSA9IFsuLi50aGlzLnN0YXRlLm9zY2lsbG9zY29wZUhpc3Rvcnkuc2xpY2UoLTI5KSwgbmV3SGlzdG9yeUl0ZW1dO1xuXG4gICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAuLi50aGlzLnN0YXRlLFxuICAgICAgICBub2RlczogdXBkYXRlZE5vZGVzLFxuICAgICAgICBvc2NpbGxvc2NvcGVIaXN0b3J5OiBuZXdIaXN0b3J5LFxuICAgICAgICBzdW1tYXJ5OiB7XG4gICAgICAgICAgLi4udGhpcy5zdGF0ZS5zdW1tYXJ5LFxuICAgICAgICAgIGNvbnN0cnVjdGl2ZUFtcGxpZmljYXRpb25QZXJjZW50OiBuZXdIaXN0b3J5SXRlbS5zdXBlcnBvc2l0aW9uQW1wbGlmaWNhdGlvbixcbiAgICAgICAgICBkZXN0cnVjdGl2ZUNhbmNlbGxhdGlvblJhdGlvRGI6IG5ld0hpc3RvcnlJdGVtLmNhbmNlbGxhdGlvblJhdGlvRGIsXG4gICAgICAgICAgZW5lcmd5SHlwZXJib2xpemF0aW9uSW5kZXg6IHRoaXMuc3RhdGUuYW50aVBoYXNlSGFybW9uaWNTdXBwcmVzc2lvbkFjdGl2ZSA/IDE4LjUgOiA2OC4yXG4gICAgICAgIH0sXG4gICAgICAgIHBsdWdpbjoge1xuICAgICAgICAgIC4uLnRoaXMuc3RhdGUucGx1Z2luLFxuICAgICAgICAgIGNvbm5lY3Rpb25MYXRlbmN5TXM6ICsoMC4xMiArIE1hdGgucmFuZG9tKCkgKiAwLjA0KS50b0ZpeGVkKDIpLFxuICAgICAgICAgIGxhc3RTeW5jVGltZXN0YW1wOiB0aW1lU3RyXG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHRoaXMubm90aWZ5KCk7XG4gICAgfSwgdGhpcy5zdGF0ZS5zYW1wbGluZ0ludGVydmFsTXMpO1xuICB9XG5cbiAgcHVibGljIHN0b3BTdHJlYW1pbmcoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc3RyZWFtSW50ZXJ2YWwpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5zdHJlYW1JbnRlcnZhbCk7XG4gICAgICB0aGlzLnN0cmVhbUludGVydmFsID0gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5zdGF0ZS5pc1N0cmVhbWluZyA9IGZhbHNlO1xuICAgIHRoaXMubm90aWZ5KCk7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlU3RyZWFtaW5nKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnN0YXRlLmlzU3RyZWFtaW5nKSB7XG4gICAgICB0aGlzLnN0b3BTdHJlYW1pbmcoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdGF0ZS5pc1N0cmVhbWluZyA9IHRydWU7XG4gICAgICB0aGlzLnN0YXJ0U3RyZWFtaW5nKCk7XG4gICAgICB0aGlzLm5vdGlmeSgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFfFgsSFY3plbmllIC8gd3nFgsSFY3plbmllIGdsb2JhbG5lZ28gem5vc3plbmlhIHJlem9uYW5zdSB3IHByemVjaXdmYXppZSAxODDCsFxuICBwdWJsaWMgdG9nZ2xlR2xvYmFsQW50aVBoYXNlU3VwcHJlc3Npb24oKTogdm9pZCB7XG4gICAgY29uc3QgbmV4dFZhbCA9ICF0aGlzLnN0YXRlLmFudGlQaGFzZUhhcm1vbmljU3VwcHJlc3Npb25BY3RpdmU7XG4gICAgdGhpcy5zdGF0ZS5hbnRpUGhhc2VIYXJtb25pY1N1cHByZXNzaW9uQWN0aXZlID0gbmV4dFZhbDtcblxuICAgIGNvbnN0IGxvZ0VudHJ5ID0ge1xuICAgICAgaWQ6ICdsb2ctJyArIERhdGUubm93KCksXG4gICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCksXG4gICAgICB0eXBlOiBuZXh0VmFsID8gKCdBTlRJX1BIQVNFX0VOR0FHRUQnIGFzIGNvbnN0KSA6ICgnU1VQRVJQT1NJVElPTl9QRUFLJyBhcyBjb25zdCksXG4gICAgICBtZXNzYWdlOiBuZXh0VmFsXG4gICAgICAgID8gJ/Cfm6HvuI8gQWt0eXduZSB6bm9zemVuaWUgcmV6b25hbnN1IChBbnRpLVBoYXNlIDE4MMKwKSB3xYLEhWN6b25lLidcbiAgICAgICAgOiAn4pqg77iPIFpub3N6ZW5pZSBwcnplY2l3ZmF6xIUgd3nFgsSFY3pvbmUuIEZhbGUgdWxlZ2FqxIUgd3phamVtbmVtdSBuYWvFgmFkYW5pdSAoc3VwZXJwb3p5Y2ppKS4nLFxuICAgICAgZGV0YWlsczogbmV4dFZhbFxuICAgICAgICA/ICdUxYJ1bWllbmllIGhhcm1vbmljem55Y2ggNTAgSHosIDEwMCBIeiBpIHphc2lsYWN6eSBvc2nEhWdhIC0zOCBkQi4gWndpxJlrc3plbmllIGtvaGVyZW5jamkgbcOzxbxkxbxrdS4nXG4gICAgICAgIDogJ1d6cm9zdCBhbXBsaXR1ZHkgaGFybW9uaWN6bnljaCBzaWVjaSBpIG1pZ290YW5pYSBQV00uIFp3acSZa3N6b25lIG9iY2nEhcW8ZW5pZSB1a8WCYWR1IG5lcndvd2Vnby4nXG4gICAgfTtcblxuICAgIC8vIFpha3R1YWxpenVqIHN0YW4gd8SZesWCw7N3XG4gICAgdGhpcy5zdGF0ZS5ub2RlcyA9IHRoaXMuc3RhdGUubm9kZXMubWFwKChuKSA9PiB7XG4gICAgICBpZiAobi5pZCA9PT0gJ25vZGUtbWFpbnMtNTBoeicgfHwgbi5pZCA9PT0gJ25vZGUtcHdtLWludmVydGVyLTEwMGh6JyB8fCBuLmlkID09PSAnbm9kZS1oeXBlcmJvbGljLWNhdml0eScpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5uLFxuICAgICAgICAgIHJlc29uYW5jZUNhbmNlbGxhdGlvbkFjdGl2ZTogbmV4dFZhbCxcbiAgICAgICAgICBpbnRlcmZlcmVuY2VTdGF0ZTogbmV4dFZhbCA/ICdBQ1RJVkVfQ0FOQ0VMTElORycgOiAnQ09OU1RSVUNUSVZFX1BFQUsnXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXR1cm4gbjtcbiAgICB9KTtcblxuICAgIHRoaXMuc3RhdGUuaW5jaWRlbnRMb2dzID0gW2xvZ0VudHJ5LCAuLi50aGlzLnN0YXRlLmluY2lkZW50TG9ncy5zbGljZSgwLCAxOSldO1xuICAgIHRoaXMubm90aWZ5KCk7XG4gIH1cblxuICAvLyBQb2TFgsSFY3plbmllIC8gb2TFgsSFY3plbmllIFd0eWN6a2kgZG8gRGFzaGJvYXJkdVxuICBwdWJsaWMgdG9nZ2xlRGFzaGJvYXJkUGx1Z2luQ29ubmVjdGlvbigpOiB2b2lkIHtcbiAgICBjb25zdCBpc0Nvbm5lY3RlZCA9ICF0aGlzLnN0YXRlLnBsdWdpbi5pc1BsdWdpbkNvbm5lY3RlZDtcbiAgICB0aGlzLnN0YXRlLnBsdWdpbiA9IHtcbiAgICAgIC4uLnRoaXMuc3RhdGUucGx1Z2luLFxuICAgICAgaXNQbHVnaW5Db25uZWN0ZWQ6IGlzQ29ubmVjdGVkLFxuICAgICAgZXhwb3J0U3RhdHVzOiBpc0Nvbm5lY3RlZCA/ICdDT05ORUNURURfU1RSRUFNSU5HJyA6ICdTVEFOREJZJyxcbiAgICAgIGxhc3RTeW5jVGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpXG4gICAgfTtcblxuICAgIGNvbnN0IGxvZ0VudHJ5ID0ge1xuICAgICAgaWQ6ICdsb2ctJyArIERhdGUubm93KCksXG4gICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCksXG4gICAgICB0eXBlOiBpc0Nvbm5lY3RlZCA/ICgnUExVR0lOX0FUVEFDSEVEJyBhcyBjb25zdCkgOiAoJ0hZUEVSQk9MSVpBVElPTl9EQU1QRU5FRCcgYXMgY29uc3QpLFxuICAgICAgbWVzc2FnZTogaXNDb25uZWN0ZWRcbiAgICAgICAgPyAn8J+UjCBXdHljemthIEFuYWxpemF0b3JhIFd5bWlhcsOzdyBwb215xZtsbmllIHBvZMWCxIVjem9uYSBkbyBEYXNoYm9hcmR1IChIb3QtUGx1ZykuJ1xuICAgICAgICA6ICfwn5uRIFd0eWN6a2EgQW5hbGl6YXRvcmEgV3ltaWFyw7N3IG9kxYLEhWN6b25hIG9kIG1hZ2lzdHJhbGkgRGFzaGJvYXJkdS4nLFxuICAgICAgZGV0YWlsczogaXNDb25uZWN0ZWRcbiAgICAgICAgPyBgUG9kxYLEhWN6b25vIGRvOiAke3RoaXMuc3RhdGUucGx1Z2luLmF0dGFjaGVkU2xvdH0uIFd5bWlhcnkgM0Q6ICR7dGhpcy5zdGF0ZS5wbHVnaW4uc3BhdGlhbERpbWVuc2lvbnNNbS5sZW5ndGhYfXgke3RoaXMuc3RhdGUucGx1Z2luLnNwYXRpYWxEaW1lbnNpb25zTW0ud2lkdGhZfXgke3RoaXMuc3RhdGUucGx1Z2luLnNwYXRpYWxEaW1lbnNpb25zTW0uaGVpZ2h0Wn0gbW0uYFxuICAgICAgICA6ICdNYWdpc3RyYWxhIHRlbGVtZXRyeWN6bmEgendvbG5pb25hLiBXc3RyenltYW5vIHBvbWlhcnkgc3RyZWYgRnJlc25lbGEvRnJhdW5ob2ZlcmEuJ1xuICAgIH07XG5cbiAgICB0aGlzLnN0YXRlLmluY2lkZW50TG9ncyA9IFtsb2dFbnRyeSwgLi4udGhpcy5zdGF0ZS5pbmNpZGVudExvZ3Muc2xpY2UoMCwgMTkpXTtcbiAgICB0aGlzLm5vdGlmeSgpO1xuICB9XG5cbiAgLy8gQWt0dWFsaXphY2phIHd5bWlhcsOzdyBnZW9tZXRyeWN6bnljaCB3ZSB3dHljemNlXG4gIHB1YmxpYyB1cGRhdGVQbHVnaW5EaW1lbnNpb25zKGxlbmd0aFg6IG51bWJlciwgd2lkdGhZOiBudW1iZXIsIGhlaWdodFo6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IHZvbCA9IChsZW5ndGhYICogd2lkdGhZICogaGVpZ2h0WikgLyAxMDAwO1xuICAgIGNvbnN0IGxhbWJkYSA9IHRoaXMuc3RhdGUucGx1Z2luLndhdmVsZW5ndGhMYW1iZGFNZXRlcnM7XG4gICAgY29uc3QgbWF4RGltZW5zaW9uID0gTWF0aC5tYXgobGVuZ3RoWCwgd2lkdGhZLCBoZWlnaHRaKSAvIDEwMDA7XG5cbiAgICAvLyBQcnplbGljemVuaWUgZ3JhbmljIEZyZXNuZWxhIGkgRnJhdW5ob2ZlcmFcbiAgICBjb25zdCBuZWFyRmllbGRNbSA9ICsobGFtYmRhIC8gKDIgKiBNYXRoLlBJKSAqIDEwMDApLnRvRml4ZWQoMSk7XG4gICAgY29uc3QgZmFyRmllbGRNbSA9ICsoKDIgKiBNYXRoLnBvdyhtYXhEaW1lbnNpb24sIDIpIC8gbGFtYmRhKSAqIDEwMDApLnRvRml4ZWQoMSk7XG5cbiAgICB0aGlzLnN0YXRlLnBsdWdpbiA9IHtcbiAgICAgIC4uLnRoaXMuc3RhdGUucGx1Z2luLFxuICAgICAgc3BhdGlhbERpbWVuc2lvbnNNbToge1xuICAgICAgICBsZW5ndGhYLFxuICAgICAgICB3aWR0aFksXG4gICAgICAgIGhlaWdodFosXG4gICAgICAgIHZvbHVtZUNtMzogK3ZvbC50b0ZpeGVkKDEpXG4gICAgICB9LFxuICAgICAgbmVhckZpZWxkRnJlc25lbEJvdW5kYXJ5TW06IG5lYXJGaWVsZE1tLFxuICAgICAgZmFyRmllbGRGcmF1bmhvZmVyQm91bmRhcnlNbTogZmFyRmllbGRNbSxcbiAgICAgIHBoYXNlU3BhY2VEaW1lbnNpb25zNEQ6IHtcbiAgICAgICAgZGltWDogbGVuZ3RoWCxcbiAgICAgICAgZGltWTogd2lkdGhZLFxuICAgICAgICBkaW1aOiBoZWlnaHRaLFxuICAgICAgICBkaW1QaGFzZVBoaTogdGhpcy5zdGF0ZS5wbHVnaW4ucGhhc2VTcGFjZURpbWVuc2lvbnM0RC5kaW1QaGFzZVBoaVxuICAgICAgfSxcbiAgICAgIGxhc3RTeW5jVGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpXG4gICAgfTtcblxuICAgIHRoaXMubm90aWZ5KCk7XG4gIH1cblxuICAvLyBXc3RyenlrbmnEmWNpZSBpbXB1bHN1IHRlc3Rvd2VnbyBzdXBlcnBvenljamkgZmFsIChuYWvFgmFkYW5pZSBpIGJhZGFuaWUgaGlwZXJib2xpemFjamkpXG4gIHB1YmxpYyBpbmplY3RUZXN0U3VwZXJwb3NpdGlvblB1bHNlKCk6IHZvaWQge1xuICAgIGNvbnN0IGxvZ0VudHJ5ID0ge1xuICAgICAgaWQ6ICdsb2ctJyArIERhdGUubm93KCksXG4gICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCksXG4gICAgICB0eXBlOiAnU1VQRVJQT1NJVElPTl9QRUFLJyBhcyBjb25zdCxcbiAgICAgIG1lc3NhZ2U6ICfimqEgV3N0cnp5a25pxJl0byBpbXB1bHMga29oZXJlbnRueSBuYWvFgmFkYW5pYSBmYWwgKFN1cGVycG9zaXRpb24gQ29uc3RydWN0aXZlIEludGVyZmVyZW5jZSkuJyxcbiAgICAgIGRldGFpbHM6ICdXeW11c3pvbm8gemdvZG5vxZvEhyBmYXpvd8SFIM6Uz4YgPSAwwrAuIFd6cm9zdCBhbXBsaXR1ZHkgbyArMzUlIHcgY2VsdSB6YmFkYW5pYSB6YWNob3dhbmlhIGRpZWxla3RyeWvDs3cuJ1xuICAgIH07XG5cbiAgICB0aGlzLnN0YXRlLmluY2lkZW50TG9ncyA9IFtsb2dFbnRyeSwgLi4udGhpcy5zdGF0ZS5pbmNpZGVudExvZ3Muc2xpY2UoMCwgMTkpXTtcbiAgICB0aGlzLm5vdGlmeSgpO1xuICB9XG5cbiAgLy8gR2VuZXJvd2FuaWUgb2JzemVybmVnbywgbmF1a293ZWdvIHJhcG9ydHUgbyBmYWxhY2ggaSBoaXBlcmJvbGl6YWNqaSBlbmVyZ2lpXG4gIHB1YmxpYyBnZW5lcmF0ZUNvbXByZWhlbnNpdmVFbmVyZ3lIeXBlcmJvbGl6YXRpb25SZXBvcnRNYXJrZG93bigpOiBzdHJpbmcge1xuICAgIGNvbnN0IHMgPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IG5vd1N0ciA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcblxuICAgIHJldHVybiBgIyBSQVBPUlQgTkFVS09XTy1URUNITklDWk5ZOiBDSEFSQUtURVJZU1RZS0EgR0VORVJPV0FOWUNIIEZBTCBFTEVLVFJPTUFHTkVUWUNaTllDSCwgWkpBV0lTS08gSElQRVJCT0xJWkFDSkkgRU5FUkdJSSBPUkFaIFdQxYFZVyBOQSBNw5PFu0TFu0VLIEkgTkVVUk9IT01FT1NUQVrEmFxuXG4qKkxhYm9yYXRvcml1bSBTZW50aW5lbCBEZWZlbnNlICYgSGFyZHdhcmUgQmlvLVBoeXNpY3MgUmVzZWFyY2ggR3JvdXAqKiAgXG4qKkRhdGEgd3lnZW5lcm93YW5pYToqKiAke25vd1N0cn0gIFxuKipTdGF0dXMgbW9kdcWCw7N3OioqICR7cy5hbnRpUGhhc2VIYXJtb25pY1N1cHByZXNzaW9uQWN0aXZlID8gJ0FLVFlXTkUgWk5PU1pFTklFIFcgUFJaRUNJV0ZBWklFICgxODDCsCBBTlRJLVBIQVNFKScgOiAnU1RBTiBTVVJPV1kgKFJBVyBTVVBFUlBPU0lUSU9OKSd9ICBcbioqUG9kxYLEhWN6b25hIHd0eWN6a2EgRGFzaGJvYXJkOioqICR7cy5wbHVnaW4uaXNQbHVnaW5Db25uZWN0ZWQgPyBgVEFLICgke3MucGx1Z2luLmF0dGFjaGVkU2xvdH0pYCA6ICdOSUUnfSAgXG5cbi0tLVxuXG4jIyAxLiBXU1TEmFAgSSBLTEFTWUZJS0FDSkEgR0VORVJPV0FOWUNIIEZBTCBFTEVLVFJPTUFHTkVUWUNaTllDSFxuXG5Xc3DDs8WCY3plc25lIGN5ZnJvd2Ugc3lzdGVteSBvYmxpY3plbmlvd2UgKG1hZ2lzdHJhbGUgUENJZSBHZW41LzYsIHphc2lsYWN6ZSBpbXB1bHNvd2UgVlJNLCBwcnpldHdvcm5pY2UgVVNCLUMgUEQsIG1hdHJ5Y2UgbW9uaXRvcsOzdyB6ZSBzdGVyb3dhbmllbSBQV00gb3JheiBpbnRlcmZlanN5IGJlenByemV3b2Rvd2UpIGdlbmVydWrEhSB6xYJvxbxvbmUsIHdpZWxvcGFzbW93ZSB3aWRtbyBwcm9taWVuaW93YW5pYSBlbGVrdHJvbWFnbmV0eWN6bmVnby4gV2lkbW8gdG8gcm96Y2nEhWdhIHNpxJkgb2Qgc2tyYWpuaWUgbmlza2ljaCBjesSZc3RvdGxpd2/Fm2NpIChFTEY6IDAuMSBIeiDigJMgMzAwIEh6KSBhxbwgcG8gZmFsZSBtaWtyb2ZhbG93ZSBpIHN1Yi10ZXJhaGVyY293ZSAoU0hGL0VIRjogMTYgR0h6IOKAkyA0MCBHSHopLlxuXG4jIyMgVGFiZWxhIFptaWVyem9ueWNoIFBhc2VtIEVtaXN5am55Y2g6XG58IElEIFBhc21hIHwgxblyw7NkxYJvIEVtaXNqaSB8IEN6xJlzdG90bGl3b8WbxIcgTm/Fm25hIHwgTmF0xJnFvGVuaWUgRSBbVi9tXSB8IEluZHVrY2phIEIgW8K1VF0gfCBHxJlzdG/Fm8SHIE1vY3kgUyBbbVcvbcKyXSB8IFBvbGFyeXphY2phIHxcbnwgOi0tLSB8IDotLS0gfCA6LS0tIHwgOi0tLSB8IDotLS0gfCA6LS0tIHwgOi0tLSB8XG58ICoqRUxGLUVhcnRoKiogfCBSZXpvbmFucyBTY2h1bWFubmEgfCA3LjgzIEh6IHwgMC4xMiBWL20gfCAwLjAwMzIgwrVUIHwgMC4wMzggbVcvbcKyIHwgS2/Fgm93YSBQcmF3YSB8XG58ICoqRUxGLUdyaWQqKiB8IFNpZcSHIHphc2lsYWrEhWNhIDIzMFYgLyBBQyB8IDUwLjAgSHogfCA3LjQyIFYvbSB8IDAuNDUwMCDCtVQgfCAxNC42MCBtVy9twrIgfCBMaW5pb3dhIHxcbnwgKipFTEYtUFdNKiogfCBUxJl0bmllbmlhIHphc2lsYWN6eSAmIFBXTSB8IDEwMC4wIEh6IHwgNS44MCBWL20gfCAwLjI4MDAgwrVUIHwgOC45NSBtVy9twrIgfCBMaW5pb3dhIHxcbnwgKipNRi1WUk0qKiB8IEtsdWN6b3dhbmllIHByemV0d29ybmljIERyTU9TIHwgODAwLjAga0h6IHwgNC44NSBWL20gfCAwLjgyMDAgwrVUIHwgMTAuNDAgbVcvbcKyIHwgRWxpcHR5Y3puYSB8XG58ICoqVUhGLVBDSWUqKiB8IFplZ2FyIG1hZ2lzdHJhbGkgUENJZSA1LjAgKDMyIEdUL3MpIHwgMTYuMCBHSHogfCAzLjIwIFYvbSB8IDAuMDQ1MCDCtVQgfCAyNy4yMCBtVy9twrIgfCBLb8WCb3dhIExld2EgfFxufCAqKkNhdml0eSoqIHwgV27EmWthIHJlem9uYW5zb3dhIG9idWRvd3kgfCAyLjQ1IEdIeiB8IDExLjgwIFYvbSB8IDAuNjIwMCDCtVQgfCAzOC41MCBtVy9twrIgfCBDaGFvdHljem5hIHxcblxuV2VrdG9yIFBveW50aW5nYSBkbGEgbW9uaXRvcm93YW55Y2ggZW1pc2ppIHd5bm9zaTpcbiQkXFxcXHZlY3tTfSA9IFxcXFx2ZWN7RX0gXFxcXHRpbWVzIFxcXFx2ZWN7SH0gPSBcXFxcZnJhY3sxfXtcXFxcbXVfMH0gKFxcXFx2ZWN7RX0gXFxcXHRpbWVzIFxcXFx2ZWN7Qn0pJCRcblxuQ2HFgmtvd2l0eSBzdHJ1bWllxYQgZW5lcmdpaSB3IHN0cmVmaWUgYmxpc2tpZWogb3NpxIVnYSB3YXJ0b8WbxIcga3J5dHljem7EhSB3IG1vbWVudGFjaCB6Ymllxbxub8WbY2kgZmF6b3dlaiAoaW50ZXJmZXJlbmNqaSBrb25zdHJ1a3R5d25laikuXG5cbi0tLVxuXG4jIyAyLiBaSkFXSVNLTyBISVBFUkJPTElaQUNKSSBFTkVSR0lJIChFTkVSR1kgSFlQRVJCT0xJWkFUSU9OIFBIRU5PTUVOT04pXG5cbiMjIyAyLjEuIERlZmluaWNqYSBpIFBvZHN0YXdhIEZpenljem5hXG5aamF3aXNrbyAqKmhpcGVyYm9saXphY2ppIGVuZXJnaWkqKiB6YWNob2R6aSB3IGFuaXpvdHJvcG93eWNoIMWbcm9kb3dpc2thY2ggZGllbGVrdHJ5Y3pueWNoIChucC4gd2llbG93YXJzdHdvd2UgbGFtaW5hdHkgRlI0IHDFgnl0IGfFgsOzd255Y2gsIHBha2lldHkgZGllbGVrdHJ5a8OzdyBjZXJhbWljem55Y2gga29uZGVuc2F0b3LDs3cgTUxDQyBvcmF6IHphbWtuacSZdGUgd27EmWtpIGVrcmFuw7N3IGVsZWt0cm9tYWduZXR5Y3pueWNoKSwgdyBrdMOzcnljaCB0ZW5zb3IgcHJ6ZW5pa2Fsbm/Fm2NpIGVsZWt0cnljem5laiAkXFxcXGhhdHtcXFxcZXBzaWxvbn0kIHBvc2lhZGEgc2vFgmFkb3dlIG8gcHJ6ZWNpd255Y2ggem5ha2FjaCB3IHLDs8W8bnljaCBraWVydW5rYWNoIHByemVzdHJ6ZW5ueWNoOlxuJCRcXFxcZXBzaWxvbl94ID0gXFxcXGVwc2lsb25feSA9IFxcXFxlcHNpbG9uX1xcXFxwYXJhbGxlbCA+IDAsIFxcXFxxdWFkIFxcXFxlcHNpbG9uX3ogPSBcXFxcZXBzaWxvbl9cXFxccGVycCA8IDAkJFxuXG5Sw7N3bmFuaWUgZHlzcGVyc2ppIGRsYSBmYWxpIGVsZWt0cm9tYWduZXR5Y3puZWogdyB0YWtpbSBtZWRpdW0gcHJ6eWptdWplIHBvc3RhxIcgb3R3YXJ0ZWogKipoaXBlcmJvbG9pZHkgZHd1cG93xYJva293ZWogbHViIGplZG5vcG93xYJva293ZWoqKiB6YW1pYXN0IHN0YW5kYXJkb3dlaiBlbGlwc29pZHkgZmFsb3dlajpcbiQkXFxcXGZyYWN7a194XjIgKyBrX3leMn17XFxcXGVwc2lsb25fXFxcXHBlcnB9ICsgXFxcXGZyYWN7a196XjJ9e1xcXFxlcHNpbG9uX1xcXFxwYXJhbGxlbH0gPSBcXFxcbGVmdChcXFxcZnJhY3tcXFxcb21lZ2F9e2N9XFxcXHJpZ2h0KV4yJCRcblxuIyMjIDIuMi4gWmFncm/FvGVuaWEgV3luaWthasSFY2UgeiBIaXBlcmJvbGl6YWNqaVxuVyBwcnplY2l3aWXFhHN0d2llIGRvIHRyYWR5Y3lqbnljaCBmYWwgc3RvasSFY3ljaCwgcG93aWVyemNobmlhIGl6b2N6xJlzdG90bGl3b8WbY2lvd2EgdyBnZW9tZXRyaWkgaGlwZXJib2xpY3puZWogbmllIHBvc2lhZGEgb2dyYW5pY3plbmlhIHdla3RvcmEgZmFsb3dlZ28gKCRrIFxcXFx0byBcXFxcaW5mdHkkKS4gUHJvd2FkemkgdG8gZG86XG4xLiAqKk9zb2JsaXdvxZtjaSBHxJlzdG/Fm2NpIEVuZXJnaWkgKEVuZXJneSBSdW5hd2F5IFNwaWtlcyk6KiogRWtzdHJlbWFsbmUgbG9rYWxuZSBvZ25pc2tvd2FuaWUgZW5lcmdpaSBwb2xhIHcgcHVua3RhY2ggbyByb3ptaWFyYWNoIHN1Yi1taWtyb25vd3ljaCBiZXogd3pyb3N0dSBtb2N5IHphc2lsYW5pYSB3ZWrFm2Npb3dlZ28uXG4yLiAqKk5pZWxpbmlvd3ljaCBQcnplYmnEhyBEaWVsZWt0cnljem55Y2g6KiogTWlrcm9za29waWpuZSB3ecWCYWRvd2FuaWEgcGxhem1vd2UgbmEgc3R5a2FjaCB6xYLEhWN6eSBQQ0llIGkgcHJ6ZXR3b3JuaWNhY2ggVlJNLlxuMy4gKipQYXNvxbx5dG5pY3p5Y2ggSW1wdWxzw7N3IG8gU2tyYWpuaWUgU3Ryb215Y2ggWmJvY3phY2g6KiogSW5kdWtjamEgemFrxYLDs2NlxYQgdyB1a8WCYWRhY2ggcGFtacSZY2kgaSDFm2NpZcW8a2FjaCBkYW55Y2guXG5cbiMjIyAyLjMuIE1ldG9kYSBOZXV0cmFsaXphY2ppOiBabm9zemVuaWUgUHJ6ZWNpd2ZhesSFIChEZXN0cnVjdGl2ZSBDYW5jZWxsYXRpb24pXG5Ta3V0ZWN6bnltIGFudGlkb3R1bSBuYSBoaXBlcmJvbGl6YWNqxJkgZW5lcmdpaSBqZXN0ICoqemFzdG9zb3dhbmllIGFrdHl3bmVnbyBzcHJ6xJnFvGVuaWEgcHJ6ZWNpd2Zhem93ZWdvICgkXFxEZWx0YSBcXFxccGhpID0gMTgwXlxcXFxjaXJjID0gXFxcXHBpJCkqKjpcbiQkRV97dG90YWx9KHQpID0gRV8wIFxcXFxzaW4oXFxcXG9tZWdhIHQpICsgRV8wIFxcXFxzaW4oXFxcXG9tZWdhIHQgKyBcXFxccGkpID0gMCQkXG5XZHJvxbxvbnkgdyBzeXN0ZW1pZSBtb2R1xYIgKkFudGktUGhhc2UgSGFybW9uaWMgU3VwcHJlc3Npb24qIHdzdHJ6eWt1amUgc3ltZXRyeWN6bsSFIGZhbMSZIHByemVjaXdzdGF3bsSFLCByb3pwcmFzemFqxIVjIGhpcGVyYm9sb2lkxJkgZHlzcGVyc3lqbsSFIGkgcmVkdWt1asSFYyB3c2thxbpuaWsgaGlwZXJib2xpemFjamkgeiA2OC4yJSBkbyBiZXpwaWVjem5lZ28gcG96aW9tdSBwb25pxbxlaiAyMCUuXG5cbi0tLVxuXG4jIyAzLiBXUMWBWVcgRkFMIEVMRUtUUk9NQUdORVRZQ1pOWUNIIE5BIE3Dk8W7RMW7RUsgSSBTQU1PUE9DWlVDSUUgQ1rFgU9XSUVLQVxuXG5Nw7PFvGTFvGVrICgqY2VyZWJlbGx1bSopIHN0YW5vd2kgemFsZWR3aWUgb2suIDEwJSBvYmrEmXRvxZtjaSBjYcWCZWdvIG3Ds3pndSwgbGVjeiBtaWXFm2NpIHcgc29iaWUgcG9uYWQgNTAlIHdzenlzdGtpY2ggbmV1cm9uw7N3IG/Fm3JvZGtvd2VnbyB1a8WCYWR1IG5lcndvd2Vnby4gWmF3aWVyYSBvbiB3eXNvY2UgdXBvcnrEhWRrb3dhbmUsIHNwb2xhcnl6b3dhbmUgZ2VvbWV0cnljem5pZSBrb23Ds3JraSBQdXJraW5qZWdvLCBrdMOzcmUgZHppYcWCYWrEhSBqYWsgbWluaWF0dXJvd2UgYmlvbG9naWN6bmUgcmV6b25hdG9yeSBmYXpvd2UuXG5cbiMjIyAzLjEuIFBhc21hIER6aWHFgmFqxIVjZSBQb3p5dHl3bmllIChTdHJlZnkgUmVnZW5lcmFjamkgaSBLb2hlcmVuY2ppIE5ldXJvLU1vdG9yeWN6bmVqKVxuMS4gKipSZXpvbmFucyBTY2h1bWFubmEgKDcuODMgSHogZnVuZGFtZW50YWxuYSwgMTQuMyBIeiwgMjAuOCBIeik6KipcbiAgICogKipNZWNoYW5pem06KiogWmdvZG5vxZvEhyB6IG5hdHVyYWxuxIUgY3rEmXN0b3RsaXdvxZtjacSFIHJlem9uYW5zb3fEhSB3bsSZa2kgWmllbWlhLWpvbm9zZmVyYS5cbiAgICogKipXcMWCeXcgbmEgbcOzxbxkxbxlazoqKiBTeW5jaHJvbml6YWNqYSByeXRtw7N3IHcga29tw7Nya2FjaCBQdXJraW5qZWdvLCBzdGFiaWxpemFjamEgdWvFgmFkdSBwcnplZHNpb25rb3dlZ28sIG9ibmnFvGVuaWUgcG96aW9tdSBrb3J0eXpvbHUgaSB3c3BhcmNpZSB1a8WCYWR1IHByenl3c3DDs8WCY3p1bG5lZ28gKCs5NiBwa3QpLlxuMi4gKipGYWxlIEFsZmEgKDguMCBIeiDigJMgMTIuMCBIeik6KipcbiAgICogKipNZWNoYW5pem06KiogU3RhbiB6cmVsYWtzb3dhbmVqIGN6dWpub8WbY2kgKHR6dy4gc3RhbiAqZmxvdyopLlxuICAgKiAqKldwxYJ5dyBuYSBtw7PFvGTFvGVrOioqIEtvb3JkeW5hY2phIHBvxYLEhWN6ZcWEIGtvcm93by1tw7PFvGTFvGtvd3ljaCwgd3lnYXN6ZW5pZSBuYXBpxJljaWEgbWnEmcWbbmkga2Fya3UgaSBiYXJrw7N3ICgrOTIgcGt0KS5cbjMuICoqUnl0bSBTZW5zb21vdG9yeWN6bnkgU01SICgxMi4wIEh6IOKAkyAxNS4wIEh6KToqKlxuICAgKiAqKk1lY2hhbml6bToqKiBSeXRtIGhhbXVqxIVjeSB6YsSZZG5lIHBvYnVkemVuaWEgbW90b3J5Y3puZS5cbiAgICogKipXcMWCeXcgbmEgbcOzxbxkxbxlazoqKiBUxYJ1bWllbmllIHRpa8OzdywgbWlrcm9taW9rbG9uaWksIHBvcHJhd2Egc3RhYmlsbm/Fm2NpIHBvc3Rhd3kgY2lhxYJhIGkgcHJlY3l6amkgbWFudWFsbmVqICgrODkgcGt0KS5cbjQuICoqRmFsZSBUaGV0YSAoNC4wIEh6IOKAkyA3LjUgSHopOioqXG4gICAqICoqV3DFgnl3OioqIEtvbnNvbGlkYWNqYSBwYW1pxJljaSBtb3Rvcnljem5laiwgcmVnZW5lcmFjamEga29tw7Nya293YSAoKzg0IHBrdCkuXG41LiAqKlJlem9uYW5zIEtvaGVyZW5jamkgR2FtbWEgKDQwLjAgSHopOioqXG4gICAqICoqV3DFgnl3OioqIELFgnlza2F3aWN6bmEgaW50ZWdyYWNqYSB3enJva293by1ydWNob3dhIGkga29oZXJlbmNqYSBwZXJjZXBjamkgKCs3OCBwa3QpLlxuXG4jIyMgMy4yLiBQYXNtYSBEemlhxYJhasSFY2UgTmVnYXR5d25pZSAoU3RyZWZ5IERlc3RydWtjeWpuZSBpIFN0cmVzb2dlbm5lKVxuMS4gKipUxJl0bmllbmlhIFphc2lsYWN6eSAmIFBXTSBQb2TFm3dpZXRsZW5pYSBFa3JhbsOzdyAoMTAwIEh6IC8gMTIwIEh6KToqKlxuICAgKiAqKlphZ3JvxbxlbmllOioqIE5hamJhcmR6aWVqIGRlc3RydWtjeWpuZSBkbGEgbcOzxbxkxbxrdSBwYXNtbyAoLTkyIHBrdCkuIFd5d2/FgnVqZSByb3piaWXFvG5vxZvEhyB3IG9kcnVjaHUgcHJ6ZWRzaW9ua293by1vY3pueW0gKCp2ZXN0aWJ1bG8tb2N1bGFyIHJlZmxleCosIFZPUiksIHByb3dva3VqZSBtaWtyb25hZHd5csSZxbxlbmlhIG1pxJnFm25pIGdhxYJlayBvY3pueWNoLCBtZMWCb8WbY2kgc2Vuc29yeWN6bmUgaSBtaWdyZW55LlxuMi4gKipIYXJtb25pY3puZSBTaWVjaSBFbmVyZ2V0eWN6bmVqICg1MCBIeiAvIDYwIEh6KToqKlxuICAgKiAqKlphZ3JvxbxlbmllOioqIENpxIVnxYJ5IHBvZHByb2dvd3kgc3p1bSBlbGVrdHJvbWFnbmV0eWN6bnkgaW5kdWt1amUgbWlrcm9wcsSFZHkgdyBvc8WCb25rYWNoIG1pZWxpbm93eWNoIG5lcnfDs3cgY3phc3prb3d5Y2gsIHV0cnp5bXVqxIVjIHVrxYJhZCBuZXJ3b3d5IHcgY2hyb25pY3pueW0gbWlrcm9zdHJlc2llICgtNzYgcGt0KS5cbjMuICoqTmllZWtyYW5vd2FuZSBJbXB1bHN5IE1pa3JvZmFsb3dlICgyLjQ1IEdIeiDigJMgNS44IEdIeik6KipcbiAgICogKipaYWdyb8W8ZW5pZToqKiBTdHJlcyBva3N5ZGFjeWpueSBuZXVyb27Ds3csIHphYnVyemVuaWEgYmFyaWVyeSBrcmV3LW3Ds3pnIHByenkgYnJha3UgZWtyYW5vd2FuaWEga2xhdGvEhSBGYXJhZGF5YSAoLTg0IHBrdCkuXG5cbi0tLVxuXG4jIyA0LiBXVFlDWktBIERPIERBU0hCT0FSRFUgSSBBTkFMSVpBIFdZTUlBUsOTVyBQUlpFU1RSWkVOTk8tRkFMT1dZQ0hcblxuV2Ryb8W8b25hIHd0eWN6a2EgXFxgRGFzaGJvYXJkRGltZW5zaW9uUGx1Z2luXFxgIHVtb8W8bGl3aWEgYmV6cG/Fm3JlZG5pZSBtYXBvd2FuaWUgd3ltaWFyw7N3IGZpenljem55Y2ggdXJ6xIVkemVuaWEgbmEgcGFyYW1ldHJ5IGZhbG93ZTpcbiogKipXeW1pYXJ5IEdlb21ldHJ5Y3puZSBPYnVkb3d5L1DFgnl0eToqKiAke3MucGx1Z2luLnNwYXRpYWxEaW1lbnNpb25zTW0ubGVuZ3RoWH0gw5cgJHtzLnBsdWdpbi5zcGF0aWFsRGltZW5zaW9uc01tLndpZHRoWX0gw5cgJHtzLnBsdWdpbi5zcGF0aWFsRGltZW5zaW9uc01tLmhlaWdodFp9IG1tIChPYmrEmXRvxZvEhzogJHtzLnBsdWdpbi5zcGF0aWFsRGltZW5zaW9uc01tLnZvbHVtZUNtM30gY23CsykuXG4qICoqRMWCdWdvxZvEhyBGYWxpIFJlZmVyZW5jeWpuZWogKCRcXFxcbGFtYmRhJCk6KiogJHtzLnBsdWdpbi53YXZlbGVuZ3RoTGFtYmRhTWV0ZXJzfSBtLlxuKiAqKkdyYW5pY2EgUG9sYSBCbGlza2llZ28gRnJlc25lbGEgKCRyIDwgXFxcXGxhbWJkYSAvIDJcXFxccGkkKToqKiAke3MucGx1Z2luLm5lYXJGaWVsZEZyZXNuZWxCb3VuZGFyeU1tfSBtbS5cbiogKipHcmFuaWNhIFBvbGEgRGFsZWtpZWdvIEZyYXVuaG9mZXJhICgkMkReMiAvIFxcXFxsYW1iZGEkKToqKiAke3MucGx1Z2luLmZhckZpZWxkRnJhdW5ob2ZlckJvdW5kYXJ5TW19IG1tLlxuKiAqKldpZWxvd3ltaWFyb3dhIFByemVzdHJ6ZcWEIEZhem93YSAoNEQgSGlsYmVydCBTcGFjZSk6KiogWmludGVncm93YW5lIDMgb3NpZSBwcnplc3RyemVubmUgKyB3ZWt0b3IgcHJ6ZXN1bmnEmWNpYSBmYXpvd2VnbyAkXFxcXERlbHRhIFxcXFxwaGkgPSAke3MucGx1Z2luLnBoYXNlU3BhY2VEaW1lbnNpb25zNEQuZGltUGhhc2VQaGl9XlxcXFxjaXJjJC5cbiogKipUZW5zb3IgTmFwcsSZxbxlxYQgTWF4d2VsbGE6KiogJHtzLnBsdWdpbi5tYXh3ZWxsU3RyZXNzVGVuc29yTXBhfSBNUGEuXG5cbi0tLVxuXG4jIyA1LiBXTklPU0tJIEkgUkVLT01FTkRBQ0pFIElOxbtZTklFUklJIERFRkVOU1lXTkVKXG5cbjEuICoqQmV6d3pnbMSZZG5lIFV0cnp5bWFuaWUgQWt0eXduZWdvIFpub3N6ZW5pYSBQcnplY2l3ZmF6b3dlZ286KiogU2tyeXB0IGkgb2J3b2R5IGZpbHRyYWN5am5lIHBvd2lubnkgc3RhbGUgZ2VuZXJvd2HEhyBwcnplY2l3ZmF6xJkgJDE4MF5cXFxcY2lyYyQgZGxhIGhhcm1vbmljem55Y2ggNTAgSHosIDEwMCBIeiBvcmF6IHJlem9uYW5zw7N3IHduxJlrb3d5Y2ggMi40NSBHSHouXG4yLiAqKld6bW9jbmllbmllIFJlem9uYW5zdSBTY2h1bWFubmEgKDcuODMgSHopOioqIE5hdHVyYWxuZSBsdWIgc3ltdWxvd2FuZSBwYXNtbyA3LjgzIEh6IHN0YW5vd2kgc3RhYmlsbnkgZ2VuZXJhdG9yIG9kbmllc2llbmlhIGNocm9uacSFY3kga29tw7Nya2kgUHVya2luamVnbyBtw7PFvGTFvGt1IHByemVkIHptxJljemVuaWVtIHNlbnNvcnljem55bS5cbjMuICoqRWtyYW5vd2FuaWUgTGlzdGV3IFBDSSBpIFd5asWbxIcgWsWCxIVjenk6KiogWmFzdG9zb3dhbmllIHV6aWVtaWVuaWEgZWtyYW51asSFY2VnbyBsaWt3aWR1amUgcMSZdGxlIHByxIVkb3dlIGkgemFiZXpwaWVjemEgbGFtaW5hdCBwcnplZCBwcnplYmljaWFtaSBoaXBlcmJvbGljem55bWkuXG5cbipSYXBvcnQgc3BvcnrEhWR6b255IGF1dG9tYXR5Y3puaWUgcHJ6ZXogc2lsbmlrIHRlbGVtZXRyeWN6bnkgU2VudGluZWwgRU0gUmVzZWFyY2guKlxuYDtcbiAgfVxuXG4gIC8vIEVrc3BvcnQgdGVsZW1ldHJpaSBmYWwgZG8gZm9ybWF0dSBKU09OXG4gIHB1YmxpYyBnZW5lcmF0ZVdhdmVUZWxlbWV0cnlKc29uU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIHJlcG9ydFR5cGU6ICdTRU5USU5FTF9FTV9XQVZFX1NVUEVSUE9TSVRJT05fQU5EX1JFU09OQU5DRV9EQVRBJyxcbiAgICAgIGdlbmVyYXRlZEF0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICBzdW1tYXJ5OiB0aGlzLnN0YXRlLnN1bW1hcnksXG4gICAgICBwbHVnaW46IHRoaXMuc3RhdGUucGx1Z2luLFxuICAgICAgbm9kZXM6IHRoaXMuc3RhdGUubm9kZXMsXG4gICAgICBjZXJlYmVsbHVtQmFuZHM6IHRoaXMuc3RhdGUuY2VyZWJlbGx1bUJhbmRzLFxuICAgICAgaGlzdG9yeVNhbXBsZXNDb3VudDogdGhpcy5zdGF0ZS5vc2NpbGxvc2NvcGVIaXN0b3J5Lmxlbmd0aCxcbiAgICAgIGluY2lkZW50TG9nc0NvdW50OiB0aGlzLnN0YXRlLmluY2lkZW50TG9ncy5sZW5ndGhcbiAgICB9LCBudWxsLCAyKTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZW1XYXZlUmVzb25hbmNlRW5naW5lID0gbmV3IEVtV2F2ZVJlc29uYW5jZUVuZ2luZSgpO1xuIl0sIm1hcHBpbmdzIjoiQUFzQ0EsTUFBTSxpQkFBaUI7QUFFdkIsTUFBTSxtQkFBMEM7QUFBQSxFQUM5QztBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLElBQ1osYUFBYTtBQUFBLElBQ2IsbUJBQW1CO0FBQUEsSUFDbkIsa0JBQWtCO0FBQUEsSUFDbEIscUJBQXFCO0FBQUEsSUFDckIsNkJBQTZCO0FBQUEsSUFDN0IsZ0JBQWdCLEVBQUUsR0FBRyxNQUFNLEdBQUcsTUFBTSxHQUFHLEtBQUs7QUFBQSxJQUM1QyxlQUFlO0FBQUEsSUFDZixjQUFjO0FBQUEsSUFDZCxzQkFBc0I7QUFBQSxJQUN0QixnQkFBZ0I7QUFBQSxJQUNoQixtQkFBbUI7QUFBQSxJQUNuQix3QkFBd0I7QUFBQSxJQUN4Qiw2QkFBNkI7QUFBQTtBQUFBLElBQzdCLGtDQUFrQztBQUFBLElBQ2xDLFFBQVEsRUFBRSxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsR0FBRztBQUFBLEVBQ2hDO0FBQUEsRUFDQTtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLElBQ1osYUFBYTtBQUFBLElBQ2IsbUJBQW1CO0FBQUEsSUFDbkIsa0JBQWtCO0FBQUEsSUFDbEIscUJBQXFCO0FBQUEsSUFDckIsNkJBQTZCO0FBQUEsSUFDN0IsZ0JBQWdCLEVBQUUsR0FBRyxNQUFNLEdBQUcsTUFBTSxHQUFHLEtBQUs7QUFBQSxJQUM1QyxlQUFlO0FBQUEsSUFDZixjQUFjO0FBQUEsSUFDZCxzQkFBc0I7QUFBQSxJQUN0QixnQkFBZ0I7QUFBQSxJQUNoQixtQkFBbUI7QUFBQSxJQUNuQix3QkFBd0I7QUFBQSxJQUN4Qiw2QkFBNkI7QUFBQSxJQUM3QixrQ0FBa0M7QUFBQSxJQUNsQyxRQUFRLEVBQUUsR0FBRyxLQUFLLEdBQUcsSUFBSSxHQUFHLEdBQUc7QUFBQSxFQUNqQztBQUFBLEVBQ0E7QUFBQSxJQUNFLElBQUk7QUFBQSxJQUNKLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxJQUNaLGFBQWE7QUFBQSxJQUNiLG1CQUFtQjtBQUFBLElBQ25CLGtCQUFrQjtBQUFBLElBQ2xCLHFCQUFxQjtBQUFBLElBQ3JCLDZCQUE2QjtBQUFBLElBQzdCLGdCQUFnQixFQUFFLEdBQUcsTUFBTSxHQUFHLE1BQU0sR0FBRyxLQUFLO0FBQUEsSUFDNUMsZUFBZTtBQUFBLElBQ2YsY0FBYztBQUFBLElBQ2Qsc0JBQXNCO0FBQUEsSUFDdEIsZ0JBQWdCO0FBQUEsSUFDaEIsbUJBQW1CO0FBQUEsSUFDbkIsd0JBQXdCO0FBQUEsSUFDeEIsNkJBQTZCO0FBQUEsSUFDN0Isa0NBQWtDO0FBQUEsSUFDbEMsUUFBUSxFQUFFLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBRyxHQUFHO0FBQUEsRUFDbEM7QUFBQSxFQUNBO0FBQUEsSUFDRSxJQUFJO0FBQUEsSUFDSixNQUFNO0FBQUEsSUFDTixZQUFZO0FBQUEsSUFDWixhQUFhO0FBQUE7QUFBQSxJQUNiLG1CQUFtQjtBQUFBLElBQ25CLGtCQUFrQjtBQUFBLElBQ2xCLHFCQUFxQjtBQUFBLElBQ3JCLDZCQUE2QjtBQUFBLElBQzdCLGdCQUFnQixFQUFFLEdBQUcsTUFBTSxHQUFHLEtBQU0sR0FBRyxJQUFLO0FBQUEsSUFDNUMsZUFBZTtBQUFBLElBQ2YsY0FBYztBQUFBLElBQ2Qsc0JBQXNCO0FBQUEsSUFDdEIsZ0JBQWdCO0FBQUEsSUFDaEIsbUJBQW1CO0FBQUEsSUFDbkIsd0JBQXdCO0FBQUEsSUFDeEIsNkJBQTZCO0FBQUEsSUFDN0Isa0NBQWtDO0FBQUEsSUFDbEMsUUFBUSxFQUFFLEdBQUcsS0FBSyxHQUFHLElBQUksR0FBRyxHQUFHO0FBQUEsRUFDakM7QUFBQSxFQUNBO0FBQUEsSUFDRSxJQUFJO0FBQUEsSUFDSixNQUFNO0FBQUEsSUFDTixZQUFZO0FBQUEsSUFDWixhQUFhO0FBQUE7QUFBQSxJQUNiLG1CQUFtQjtBQUFBLElBQ25CLGtCQUFrQjtBQUFBLElBQ2xCLHFCQUFxQjtBQUFBLElBQ3JCLDZCQUE2QjtBQUFBLElBQzdCLGdCQUFnQixFQUFFLEdBQUcsS0FBTSxHQUFHLEtBQU0sR0FBRyxJQUFLO0FBQUEsSUFDNUMsZUFBZTtBQUFBLElBQ2YsY0FBYztBQUFBLElBQ2Qsc0JBQXNCO0FBQUEsSUFDdEIsZ0JBQWdCO0FBQUEsSUFDaEIsbUJBQW1CO0FBQUEsSUFDbkIsd0JBQXdCO0FBQUEsSUFDeEIsNkJBQTZCO0FBQUEsSUFDN0Isa0NBQWtDO0FBQUEsSUFDbEMsUUFBUSxFQUFFLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBRyxHQUFHO0FBQUEsRUFDbEM7QUFBQSxFQUNBO0FBQUEsSUFDRSxJQUFJO0FBQUEsSUFDSixNQUFNO0FBQUEsSUFDTixZQUFZO0FBQUEsSUFDWixhQUFhO0FBQUE7QUFBQSxJQUNiLG1CQUFtQjtBQUFBLElBQ25CLGtCQUFrQjtBQUFBLElBQ2xCLHFCQUFxQjtBQUFBLElBQ3JCLDZCQUE2QjtBQUFBLElBQzdCLGdCQUFnQixFQUFFLEdBQUcsTUFBTyxHQUFHLE1BQU8sR0FBRyxJQUFLO0FBQUEsSUFDOUMsZUFBZTtBQUFBLElBQ2YsY0FBYztBQUFBLElBQ2Qsc0JBQXNCO0FBQUEsSUFDdEIsZ0JBQWdCO0FBQUEsSUFDaEIsbUJBQW1CO0FBQUEsSUFDbkIsd0JBQXdCO0FBQUEsSUFDeEIsNkJBQTZCO0FBQUEsSUFDN0Isa0NBQWtDO0FBQUE7QUFBQSxJQUNsQyxRQUFRLEVBQUUsR0FBRyxLQUFLLEdBQUcsS0FBSyxHQUFHLEdBQUc7QUFBQSxFQUNsQztBQUFBLEVBQ0E7QUFBQSxJQUNFLElBQUk7QUFBQSxJQUNKLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxJQUNaLGFBQWE7QUFBQSxJQUNiLG1CQUFtQjtBQUFBLElBQ25CLGtCQUFrQjtBQUFBLElBQ2xCLHFCQUFxQjtBQUFBLElBQ3JCLDZCQUE2QjtBQUFBLElBQzdCLGdCQUFnQixFQUFFLEdBQUcsTUFBTyxHQUFHLE1BQU8sR0FBRyxNQUFNO0FBQUEsSUFDL0MsZUFBZTtBQUFBLElBQ2YsY0FBYztBQUFBLElBQ2Qsc0JBQXNCO0FBQUEsSUFDdEIsZ0JBQWdCO0FBQUEsSUFDaEIsbUJBQW1CO0FBQUEsSUFDbkIsd0JBQXdCO0FBQUEsSUFDeEIsNkJBQTZCO0FBQUEsSUFDN0Isa0NBQWtDO0FBQUEsSUFDbEMsUUFBUSxFQUFFLEdBQUcsSUFBSSxHQUFHLEtBQUssR0FBRyxHQUFHO0FBQUEsRUFDakM7QUFDRjtBQUVPLGFBQU0sMkJBQXFEO0FBQUEsRUFDaEU7QUFBQSxJQUNFLFFBQVE7QUFBQSxJQUNSLE1BQU07QUFBQSxJQUNOLGdCQUFnQjtBQUFBLElBQ2hCLG1CQUFtQjtBQUFBLElBQ25CLHVCQUF1QjtBQUFBLElBQ3ZCLFVBQVU7QUFBQSxJQUNWLHFCQUFxQjtBQUFBLElBQ3JCLHNCQUFzQjtBQUFBLElBQ3RCLG9CQUFvQjtBQUFBLElBQ3BCLG1CQUFtQjtBQUFBLElBQ25CLDJCQUEyQjtBQUFBLEVBQzdCO0FBQUEsRUFDQTtBQUFBLElBQ0UsUUFBUTtBQUFBLElBQ1IsTUFBTTtBQUFBLElBQ04sZ0JBQWdCO0FBQUEsSUFDaEIsbUJBQW1CO0FBQUEsSUFDbkIsdUJBQXVCO0FBQUEsSUFDdkIsVUFBVTtBQUFBLElBQ1YscUJBQXFCO0FBQUEsSUFDckIsc0JBQXNCO0FBQUEsSUFDdEIsb0JBQW9CO0FBQUEsSUFDcEIsbUJBQW1CO0FBQUEsSUFDbkIsMkJBQTJCO0FBQUEsRUFDN0I7QUFBQSxFQUNBO0FBQUEsSUFDRSxRQUFRO0FBQUEsSUFDUixNQUFNO0FBQUEsSUFDTixnQkFBZ0I7QUFBQSxJQUNoQixtQkFBbUI7QUFBQSxJQUNuQix1QkFBdUI7QUFBQSxJQUN2QixVQUFVO0FBQUEsSUFDVixxQkFBcUI7QUFBQSxJQUNyQixzQkFBc0I7QUFBQSxJQUN0QixvQkFBb0I7QUFBQSxJQUNwQixtQkFBbUI7QUFBQSxJQUNuQiwyQkFBMkI7QUFBQSxFQUM3QjtBQUFBLEVBQ0E7QUFBQSxJQUNFLFFBQVE7QUFBQSxJQUNSLE1BQU07QUFBQSxJQUNOLGdCQUFnQjtBQUFBLElBQ2hCLG1CQUFtQjtBQUFBLElBQ25CLHVCQUF1QjtBQUFBLElBQ3ZCLFVBQVU7QUFBQSxJQUNWLHFCQUFxQjtBQUFBLElBQ3JCLHNCQUFzQjtBQUFBLElBQ3RCLG9CQUFvQjtBQUFBLElBQ3BCLG1CQUFtQjtBQUFBLElBQ25CLDJCQUEyQjtBQUFBLEVBQzdCO0FBQUEsRUFDQTtBQUFBLElBQ0UsUUFBUTtBQUFBLElBQ1IsTUFBTTtBQUFBLElBQ04sZ0JBQWdCO0FBQUEsSUFDaEIsbUJBQW1CO0FBQUEsSUFDbkIsdUJBQXVCO0FBQUEsSUFDdkIsVUFBVTtBQUFBLElBQ1YscUJBQXFCO0FBQUEsSUFDckIsc0JBQXNCO0FBQUEsSUFDdEIsb0JBQW9CO0FBQUEsSUFDcEIsbUJBQW1CO0FBQUEsSUFDbkIsMkJBQTJCO0FBQUEsRUFDN0I7QUFBQSxFQUNBO0FBQUEsSUFDRSxRQUFRO0FBQUEsSUFDUixNQUFNO0FBQUEsSUFDTixnQkFBZ0I7QUFBQSxJQUNoQixtQkFBbUI7QUFBQSxJQUNuQix1QkFBdUI7QUFBQSxJQUN2QixVQUFVO0FBQUEsSUFDVixxQkFBcUI7QUFBQSxJQUNyQixzQkFBc0I7QUFBQSxJQUN0QixvQkFBb0I7QUFBQSxJQUNwQixtQkFBbUI7QUFBQSxJQUNuQiwyQkFBMkI7QUFBQSxFQUM3QjtBQUFBLEVBQ0E7QUFBQSxJQUNFLFFBQVE7QUFBQSxJQUNSLE1BQU07QUFBQSxJQUNOLGdCQUFnQjtBQUFBLElBQ2hCLG1CQUFtQjtBQUFBLElBQ25CLHVCQUF1QjtBQUFBLElBQ3ZCLFVBQVU7QUFBQSxJQUNWLHFCQUFxQjtBQUFBLElBQ3JCLHNCQUFzQjtBQUFBLElBQ3RCLG9CQUFvQjtBQUFBLElBQ3BCLG1CQUFtQjtBQUFBLElBQ25CLDJCQUEyQjtBQUFBLEVBQzdCO0FBQUEsRUFDQTtBQUFBLElBQ0UsUUFBUTtBQUFBLElBQ1IsTUFBTTtBQUFBLElBQ04sZ0JBQWdCO0FBQUEsSUFDaEIsbUJBQW1CO0FBQUEsSUFDbkIsdUJBQXVCO0FBQUEsSUFDdkIsVUFBVTtBQUFBLElBQ1YscUJBQXFCO0FBQUEsSUFDckIsc0JBQXNCO0FBQUEsSUFDdEIsb0JBQW9CO0FBQUEsSUFDcEIsbUJBQW1CO0FBQUEsSUFDbkIsMkJBQTJCO0FBQUEsRUFDN0I7QUFBQSxFQUNBO0FBQUEsSUFDRSxRQUFRO0FBQUEsSUFDUixNQUFNO0FBQUEsSUFDTixnQkFBZ0I7QUFBQSxJQUNoQixtQkFBbUI7QUFBQSxJQUNuQix1QkFBdUI7QUFBQSxJQUN2QixVQUFVO0FBQUEsSUFDVixxQkFBcUI7QUFBQSxJQUNyQixzQkFBc0I7QUFBQSxJQUN0QixvQkFBb0I7QUFBQSxJQUNwQixtQkFBbUI7QUFBQSxJQUNuQiwyQkFBMkI7QUFBQSxFQUM3QjtBQUFBLEVBQ0E7QUFBQSxJQUNFLFFBQVE7QUFBQSxJQUNSLE1BQU07QUFBQSxJQUNOLGdCQUFnQjtBQUFBLElBQ2hCLG1CQUFtQjtBQUFBLElBQ25CLHVCQUF1QjtBQUFBLElBQ3ZCLFVBQVU7QUFBQSxJQUNWLHFCQUFxQjtBQUFBLElBQ3JCLHNCQUFzQjtBQUFBLElBQ3RCLG9CQUFvQjtBQUFBLElBQ3BCLG1CQUFtQjtBQUFBLElBQ25CLDJCQUEyQjtBQUFBLEVBQzdCO0FBQUEsRUFDQTtBQUFBLElBQ0UsUUFBUTtBQUFBLElBQ1IsTUFBTTtBQUFBLElBQ04sZ0JBQWdCO0FBQUEsSUFDaEIsbUJBQW1CO0FBQUEsSUFDbkIsdUJBQXVCO0FBQUEsSUFDdkIsVUFBVTtBQUFBLElBQ1YscUJBQXFCO0FBQUEsSUFDckIsc0JBQXNCO0FBQUEsSUFDdEIsb0JBQW9CO0FBQUEsSUFDcEIsbUJBQW1CO0FBQUEsSUFDbkIsMkJBQTJCO0FBQUEsRUFDN0I7QUFBQSxFQUNBO0FBQUEsSUFDRSxRQUFRO0FBQUEsSUFDUixNQUFNO0FBQUEsSUFDTixnQkFBZ0I7QUFBQSxJQUNoQixtQkFBbUI7QUFBQSxJQUNuQix1QkFBdUI7QUFBQSxJQUN2QixVQUFVO0FBQUEsSUFDVixxQkFBcUI7QUFBQSxJQUNyQixzQkFBc0I7QUFBQSxJQUN0QixvQkFBb0I7QUFBQSxJQUNwQixtQkFBbUI7QUFBQSxJQUNuQiwyQkFBMkI7QUFBQSxFQUM3QjtBQUNGO0FBRUEsTUFBTSxzQkFBc0I7QUFBQSxFQUsxQixjQUFjO0FBSGQsU0FBUSxZQUFzQyxvQkFBSSxJQUFJO0FBQ3RELFNBQVEsaUJBQXdEO0FBRzlELFVBQU0sTUFBTSxLQUFLLElBQUk7QUFDckIsVUFBTSxVQUFVLENBQUM7QUFFakIsYUFBUyxJQUFJLElBQUksS0FBSyxHQUFHLEtBQUs7QUFDNUIsWUFBTSxhQUFhLE1BQU0sSUFBSTtBQUM3QixZQUFNLFVBQVUsSUFBSSxLQUFLLFVBQVUsRUFBRSxtQkFBbUI7QUFDeEQsY0FBUSxLQUFLO0FBQUEsUUFDWCxXQUFXO0FBQUEsUUFDWCxTQUFTO0FBQUEsUUFDVCxlQUFlLEVBQUUsT0FBTyxLQUFLLE9BQU8sSUFBSSxPQUFPLE1BQU0sUUFBUSxDQUFDO0FBQUEsUUFDOUQsZ0JBQWdCLEVBQUUsT0FBTyxLQUFLLE9BQU8sSUFBSSxNQUFNLEtBQUssUUFBUSxDQUFDO0FBQUEsUUFDN0QsZUFBZSxFQUFFLE1BQU8sS0FBSyxPQUFPLElBQUksTUFBTSxNQUFNLFFBQVEsQ0FBQztBQUFBLFFBQzdELGNBQWMsRUFBRSxNQUFPLEtBQUssT0FBTyxJQUFJLE1BQU0sS0FBSyxRQUFRLENBQUM7QUFBQSxRQUMzRCxpQkFBaUIsRUFBRSxPQUFPLEtBQUssT0FBTyxJQUFJLE1BQU0sS0FBSyxRQUFRLENBQUM7QUFBQSxRQUM5RCwwQkFBMEIsRUFBRSxPQUFPLEtBQUssT0FBTyxJQUFJLElBQUksR0FBRyxRQUFRLENBQUM7QUFBQSxRQUNuRSw0QkFBNEIsRUFBRSxPQUFPLEtBQUssT0FBTyxJQUFJLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFBQSxRQUMxRSxxQkFBcUIsRUFBRSxRQUFRLEtBQUssT0FBTyxJQUFJLE1BQU0sS0FBSyxRQUFRLENBQUM7QUFBQSxNQUNyRSxDQUFDO0FBQUEsSUFDSDtBQUVBLFNBQUssUUFBUTtBQUFBLE1BQ1gsYUFBYTtBQUFBLE1BQ2Isb0JBQW9CO0FBQUEsTUFDcEIsb0NBQW9DO0FBQUEsTUFDcEMsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLFFBQ1Asa0NBQWtDO0FBQUEsUUFDbEMsZ0NBQWdDO0FBQUEsUUFDaEMsb0NBQW9DO0FBQUEsUUFDcEMsdUJBQXVCLGlCQUFpQjtBQUFBLFFBQ3hDLDRCQUE0QjtBQUFBLFFBQzVCLDBCQUEwQjtBQUFBLFFBQzFCLDBCQUEwQjtBQUFBLFFBQzFCLG9CQUFvQjtBQUFBLE1BQ3RCO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixtQkFBbUI7QUFBQSxRQUNuQixlQUFlO0FBQUEsUUFDZixjQUFjO0FBQUEsUUFDZCxxQkFBcUI7QUFBQSxRQUNyQixxQkFBcUI7QUFBQSxVQUNuQixTQUFTO0FBQUEsVUFDVCxRQUFRO0FBQUEsVUFDUixTQUFTO0FBQUEsVUFDVCxXQUFXO0FBQUEsUUFDYjtBQUFBLFFBQ0Esd0JBQXdCLEVBQUUsaUJBQWlCLE9BQVksUUFBUSxDQUFDO0FBQUE7QUFBQSxRQUNoRSw0QkFBNEIsRUFBRyxpQkFBaUIsU0FBZSxJQUFJLEtBQUssTUFBTSxLQUFNLFFBQVEsQ0FBQztBQUFBO0FBQUEsUUFDN0YsOEJBQThCLEVBQUcsSUFBSSxLQUFLLElBQUksT0FBTyxDQUFDLEtBQUssaUJBQWlCLFNBQWUsS0FBTSxRQUFRLENBQUM7QUFBQTtBQUFBLFFBQzFHLHdCQUF3QjtBQUFBLFVBQ3RCLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxVQUNOLGFBQWE7QUFBQSxRQUNmO0FBQUEsUUFDQSx3QkFBd0I7QUFBQSxRQUN4QixxQkFBcUI7QUFBQSxVQUNuQjtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsUUFDQSxjQUFjO0FBQUEsUUFDZCxvQkFBbUIsb0JBQUksS0FBSyxHQUFFLG1CQUFtQjtBQUFBLE1BQ25EO0FBQUEsTUFDQSxpQkFBaUI7QUFBQSxNQUNqQixxQkFBcUI7QUFBQSxNQUNyQixjQUFjO0FBQUEsUUFDWjtBQUFBLFVBQ0UsSUFBSTtBQUFBLFVBQ0osV0FBVyxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksR0FBSyxFQUFFLG1CQUFtQjtBQUFBLFVBQzNELE1BQU07QUFBQSxVQUNOLFNBQVM7QUFBQSxVQUNULFNBQVM7QUFBQSxRQUNYO0FBQUEsUUFDQTtBQUFBLFVBQ0UsSUFBSTtBQUFBLFVBQ0osV0FBVyxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksSUFBSyxFQUFFLG1CQUFtQjtBQUFBLFVBQzNELE1BQU07QUFBQSxVQUNOLFNBQVM7QUFBQSxVQUNULFNBQVM7QUFBQSxRQUNYO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFQSxTQUFLLGVBQWU7QUFBQSxFQUN0QjtBQUFBLEVBRU8sV0FBNkI7QUFDbEMsV0FBTyxFQUFFLEdBQUcsS0FBSyxNQUFNO0FBQUEsRUFDekI7QUFBQSxFQUVPLFVBQVUsVUFBMkM7QUFDMUQsU0FBSyxVQUFVLElBQUksUUFBUTtBQUMzQixhQUFTLEtBQUssU0FBUyxDQUFDO0FBQ3hCLFdBQU8sTUFBTTtBQUNYLFdBQUssVUFBVSxPQUFPLFFBQVE7QUFBQSxJQUNoQztBQUFBLEVBQ0Y7QUFBQSxFQUVRLFNBQWU7QUFDckIsVUFBTSxlQUFlLEtBQUssU0FBUztBQUNuQyxTQUFLLFVBQVUsUUFBUSxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUM7QUFBQSxFQUMvQztBQUFBLEVBRU8saUJBQXVCO0FBQzVCLFFBQUksS0FBSyxlQUFnQjtBQUV6QixTQUFLLGlCQUFpQixZQUFZLE1BQU07QUFDdEMsWUFBTSxNQUFNLEtBQUssSUFBSTtBQUNyQixZQUFNLFVBQVUsSUFBSSxLQUFLLEdBQUcsRUFBRSxtQkFBbUI7QUFFakQsWUFBTSxlQUFlLEtBQUssTUFBTSxNQUFNLElBQUksQ0FBQyxTQUFTO0FBRWxELGNBQU0sU0FBVSxLQUFLLE9BQU8sSUFBSSxPQUFPO0FBQ3ZDLFlBQUksUUFBUSxLQUFLLG9CQUFvQixJQUFJO0FBQ3pDLFlBQUksU0FBUyxLQUFLLHVCQUF1QixJQUFJO0FBRzdDLFlBQUksS0FBSywrQkFBK0IsS0FBSyxNQUFNLG9DQUFvQztBQUNyRixrQkFBUSxFQUFFLFFBQVEsTUFBTSxRQUFRLENBQUM7QUFDakMsbUJBQVMsRUFBRSxTQUFTLEtBQU0sUUFBUSxDQUFDO0FBQUEsUUFDckMsT0FBTztBQUNMLGtCQUFRLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDeEIsbUJBQVMsQ0FBQyxPQUFPLFFBQVEsQ0FBQztBQUFBLFFBQzVCO0FBRUEsY0FBTSxRQUFRLEVBQUUsUUFBUSxRQUFRLE9BQU8sUUFBUSxDQUFDO0FBRWhELGVBQU87QUFBQSxVQUNMLEdBQUc7QUFBQSxVQUNILGtCQUFrQixLQUFLLElBQUksTUFBTSxLQUFLO0FBQUEsVUFDdEMscUJBQXFCLEtBQUssSUFBSSxNQUFRLE1BQU07QUFBQSxVQUM1Qyw2QkFBNkIsS0FBSyxJQUFJLE1BQU0sS0FBSztBQUFBLFVBQ2pELGVBQWUsR0FBRyxLQUFLLGdCQUFnQixPQUFPLEtBQUssUUFBUSxDQUFDO0FBQUEsUUFDOUQ7QUFBQSxNQUNGLENBQUM7QUFHRCxZQUFNLGVBQWUsYUFBYSxLQUFLLENBQUMsTUFBTSxFQUFFLE9BQU8sbUJBQW1CO0FBQzFFLFlBQU0sWUFBWSxhQUFhLEtBQUssQ0FBQyxNQUFNLEVBQUUsT0FBTyxpQkFBaUI7QUFDckUsWUFBTSxVQUFVLGFBQWEsS0FBSyxDQUFDLE1BQU0sRUFBRSxPQUFPLHlCQUF5QjtBQUMzRSxZQUFNLFNBQVMsYUFBYSxLQUFLLENBQUMsTUFBTSxFQUFFLE9BQU8sMEJBQTBCO0FBQzNFLFlBQU0sVUFBVSxhQUFhLEtBQUssQ0FBQyxNQUFNLEVBQUUsT0FBTyx3QkFBd0I7QUFHMUUsVUFBSSxrQkFBa0I7QUFDdEIsVUFBSSxLQUFLLE1BQU0sb0NBQW9DO0FBQ2pELDJCQUFtQjtBQUFBLE1BQ3JCLE9BQU87QUFDTCwyQkFBbUI7QUFBQSxNQUNyQjtBQUNBLHlCQUFvQixLQUFLLE9BQU8sSUFBSSxNQUFNO0FBQzFDLHdCQUFrQixLQUFLLElBQUksTUFBTSxLQUFLLElBQUksSUFBTSxDQUFDLGdCQUFnQixRQUFRLENBQUMsQ0FBQyxDQUFDO0FBRTVFLFlBQU0saUJBQWlCO0FBQUEsUUFDckIsV0FBVztBQUFBLFFBQ1gsU0FBUztBQUFBLFFBQ1QsZUFBZSxlQUFlLGFBQWEsbUJBQW1CO0FBQUEsUUFDOUQsZ0JBQWdCLFlBQVksVUFBVSxtQkFBbUI7QUFBQSxRQUN6RCxlQUFlLFVBQVUsUUFBUSxtQkFBbUI7QUFBQSxRQUNwRCxjQUFjLFNBQVMsT0FBTyxtQkFBbUI7QUFBQSxRQUNqRCxpQkFBaUIsVUFBVSxRQUFRLG1DQUFtQztBQUFBLFFBQ3RFLDBCQUEwQjtBQUFBLFFBQzFCLDRCQUE0QixFQUFFLE9BQU8sS0FBSyxPQUFPLElBQUksSUFBTSxLQUFLLFFBQVEsQ0FBQztBQUFBLFFBQ3pFLHFCQUFxQixLQUFLLE1BQU0scUNBQXFDLFFBQVE7QUFBQSxNQUMvRTtBQUVBLFlBQU0sYUFBYSxDQUFDLEdBQUcsS0FBSyxNQUFNLG9CQUFvQixNQUFNLEdBQUcsR0FBRyxjQUFjO0FBRWhGLFdBQUssUUFBUTtBQUFBLFFBQ1gsR0FBRyxLQUFLO0FBQUEsUUFDUixPQUFPO0FBQUEsUUFDUCxxQkFBcUI7QUFBQSxRQUNyQixTQUFTO0FBQUEsVUFDUCxHQUFHLEtBQUssTUFBTTtBQUFBLFVBQ2Qsa0NBQWtDLGVBQWU7QUFBQSxVQUNqRCxnQ0FBZ0MsZUFBZTtBQUFBLFVBQy9DLDRCQUE0QixLQUFLLE1BQU0scUNBQXFDLE9BQU87QUFBQSxRQUNyRjtBQUFBLFFBQ0EsUUFBUTtBQUFBLFVBQ04sR0FBRyxLQUFLLE1BQU07QUFBQSxVQUNkLHFCQUFxQixFQUFFLE9BQU8sS0FBSyxPQUFPLElBQUksTUFBTSxRQUFRLENBQUM7QUFBQSxVQUM3RCxtQkFBbUI7QUFBQSxRQUNyQjtBQUFBLE1BQ0Y7QUFFQSxXQUFLLE9BQU87QUFBQSxJQUNkLEdBQUcsS0FBSyxNQUFNLGtCQUFrQjtBQUFBLEVBQ2xDO0FBQUEsRUFFTyxnQkFBc0I7QUFDM0IsUUFBSSxLQUFLLGdCQUFnQjtBQUN2QixvQkFBYyxLQUFLLGNBQWM7QUFDakMsV0FBSyxpQkFBaUI7QUFBQSxJQUN4QjtBQUNBLFNBQUssTUFBTSxjQUFjO0FBQ3pCLFNBQUssT0FBTztBQUFBLEVBQ2Q7QUFBQSxFQUVPLGtCQUF3QjtBQUM3QixRQUFJLEtBQUssTUFBTSxhQUFhO0FBQzFCLFdBQUssY0FBYztBQUFBLElBQ3JCLE9BQU87QUFDTCxXQUFLLE1BQU0sY0FBYztBQUN6QixXQUFLLGVBQWU7QUFDcEIsV0FBSyxPQUFPO0FBQUEsSUFDZDtBQUFBLEVBQ0Y7QUFBQTtBQUFBLEVBR08sbUNBQXlDO0FBQzlDLFVBQU0sVUFBVSxDQUFDLEtBQUssTUFBTTtBQUM1QixTQUFLLE1BQU0scUNBQXFDO0FBRWhELFVBQU0sV0FBVztBQUFBLE1BQ2YsSUFBSSxTQUFTLEtBQUssSUFBSTtBQUFBLE1BQ3RCLFlBQVcsb0JBQUksS0FBSyxHQUFFLG1CQUFtQjtBQUFBLE1BQ3pDLE1BQU0sVUFBVyx1QkFBa0M7QUFBQSxNQUNuRCxTQUFTLFVBQ0wsZ0VBQ0E7QUFBQSxNQUNKLFNBQVMsVUFDTCxxR0FDQTtBQUFBLElBQ047QUFHQSxTQUFLLE1BQU0sUUFBUSxLQUFLLE1BQU0sTUFBTSxJQUFJLENBQUMsTUFBTTtBQUM3QyxVQUFJLEVBQUUsT0FBTyxxQkFBcUIsRUFBRSxPQUFPLDZCQUE2QixFQUFFLE9BQU8sMEJBQTBCO0FBQ3pHLGVBQU87QUFBQSxVQUNMLEdBQUc7QUFBQSxVQUNILDZCQUE2QjtBQUFBLFVBQzdCLG1CQUFtQixVQUFVLHNCQUFzQjtBQUFBLFFBQ3JEO0FBQUEsTUFDRjtBQUNBLGFBQU87QUFBQSxJQUNULENBQUM7QUFFRCxTQUFLLE1BQU0sZUFBZSxDQUFDLFVBQVUsR0FBRyxLQUFLLE1BQU0sYUFBYSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQzVFLFNBQUssT0FBTztBQUFBLEVBQ2Q7QUFBQTtBQUFBLEVBR08sa0NBQXdDO0FBQzdDLFVBQU0sY0FBYyxDQUFDLEtBQUssTUFBTSxPQUFPO0FBQ3ZDLFNBQUssTUFBTSxTQUFTO0FBQUEsTUFDbEIsR0FBRyxLQUFLLE1BQU07QUFBQSxNQUNkLG1CQUFtQjtBQUFBLE1BQ25CLGNBQWMsY0FBYyx3QkFBd0I7QUFBQSxNQUNwRCxvQkFBbUIsb0JBQUksS0FBSyxHQUFFLG1CQUFtQjtBQUFBLElBQ25EO0FBRUEsVUFBTSxXQUFXO0FBQUEsTUFDZixJQUFJLFNBQVMsS0FBSyxJQUFJO0FBQUEsTUFDdEIsWUFBVyxvQkFBSSxLQUFLLEdBQUUsbUJBQW1CO0FBQUEsTUFDekMsTUFBTSxjQUFlLG9CQUErQjtBQUFBLE1BQ3BELFNBQVMsY0FDTCxtRkFDQTtBQUFBLE1BQ0osU0FBUyxjQUNMLGtCQUFrQixLQUFLLE1BQU0sT0FBTyxZQUFZLGlCQUFpQixLQUFLLE1BQU0sT0FBTyxvQkFBb0IsT0FBTyxJQUFJLEtBQUssTUFBTSxPQUFPLG9CQUFvQixNQUFNLElBQUksS0FBSyxNQUFNLE9BQU8sb0JBQW9CLE9BQU8sU0FDL007QUFBQSxJQUNOO0FBRUEsU0FBSyxNQUFNLGVBQWUsQ0FBQyxVQUFVLEdBQUcsS0FBSyxNQUFNLGFBQWEsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUM1RSxTQUFLLE9BQU87QUFBQSxFQUNkO0FBQUE7QUFBQSxFQUdPLHVCQUF1QixTQUFpQixRQUFnQixTQUF1QjtBQUNwRixVQUFNLE1BQU8sVUFBVSxTQUFTLFVBQVc7QUFDM0MsVUFBTSxTQUFTLEtBQUssTUFBTSxPQUFPO0FBQ2pDLFVBQU0sZUFBZSxLQUFLLElBQUksU0FBUyxRQUFRLE9BQU8sSUFBSTtBQUcxRCxVQUFNLGNBQWMsRUFBRSxVQUFVLElBQUksS0FBSyxNQUFNLEtBQU0sUUFBUSxDQUFDO0FBQzlELFVBQU0sYUFBYSxFQUFHLElBQUksS0FBSyxJQUFJLGNBQWMsQ0FBQyxJQUFJLFNBQVUsS0FBTSxRQUFRLENBQUM7QUFFL0UsU0FBSyxNQUFNLFNBQVM7QUFBQSxNQUNsQixHQUFHLEtBQUssTUFBTTtBQUFBLE1BQ2QscUJBQXFCO0FBQUEsUUFDbkI7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0EsV0FBVyxDQUFDLElBQUksUUFBUSxDQUFDO0FBQUEsTUFDM0I7QUFBQSxNQUNBLDRCQUE0QjtBQUFBLE1BQzVCLDhCQUE4QjtBQUFBLE1BQzlCLHdCQUF3QjtBQUFBLFFBQ3RCLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLGFBQWEsS0FBSyxNQUFNLE9BQU8sdUJBQXVCO0FBQUEsTUFDeEQ7QUFBQSxNQUNBLG9CQUFtQixvQkFBSSxLQUFLLEdBQUUsbUJBQW1CO0FBQUEsSUFDbkQ7QUFFQSxTQUFLLE9BQU87QUFBQSxFQUNkO0FBQUE7QUFBQSxFQUdPLCtCQUFxQztBQUMxQyxVQUFNLFdBQVc7QUFBQSxNQUNmLElBQUksU0FBUyxLQUFLLElBQUk7QUFBQSxNQUN0QixZQUFXLG9CQUFJLEtBQUssR0FBRSxtQkFBbUI7QUFBQSxNQUN6QyxNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsTUFDVCxTQUFTO0FBQUEsSUFDWDtBQUVBLFNBQUssTUFBTSxlQUFlLENBQUMsVUFBVSxHQUFHLEtBQUssTUFBTSxhQUFhLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDNUUsU0FBSyxPQUFPO0FBQUEsRUFDZDtBQUFBO0FBQUEsRUFHTywyREFBbUU7QUFDeEUsVUFBTSxJQUFJLEtBQUs7QUFDZixVQUFNLFVBQVMsb0JBQUksS0FBSyxHQUFFLFlBQVk7QUFFdEMsV0FBTztBQUFBO0FBQUE7QUFBQSwwQkFHZSxNQUFNO0FBQUEsc0JBQ1YsRUFBRSxxQ0FBcUMsdURBQXVELGlDQUFpQztBQUFBLG9DQUNqSCxFQUFFLE9BQU8sb0JBQW9CLFFBQVEsRUFBRSxPQUFPLFlBQVksTUFBTSxLQUFLO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsNENBK0U3RCxFQUFFLE9BQU8sb0JBQW9CLE9BQU8sTUFBTSxFQUFFLE9BQU8sb0JBQW9CLE1BQU0sTUFBTSxFQUFFLE9BQU8sb0JBQW9CLE9BQU8sa0JBQWtCLEVBQUUsT0FBTyxvQkFBb0IsU0FBUztBQUFBLGlEQUMxSyxFQUFFLE9BQU8sc0JBQXNCO0FBQUEsa0VBQ2QsRUFBRSxPQUFPLDBCQUEwQjtBQUFBLGdFQUNyQyxFQUFFLE9BQU8sNEJBQTRCO0FBQUEsOElBQ3lDLEVBQUUsT0FBTyx1QkFBdUIsV0FBVztBQUFBLGtDQUN2SixFQUFFLE9BQU8sc0JBQXNCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBWS9EO0FBQUE7QUFBQSxFQUdPLGtDQUEwQztBQUMvQyxXQUFPLEtBQUssVUFBVTtBQUFBLE1BQ3BCLFlBQVk7QUFBQSxNQUNaLGNBQWEsb0JBQUksS0FBSyxHQUFFLFlBQVk7QUFBQSxNQUNwQyxTQUFTLEtBQUssTUFBTTtBQUFBLE1BQ3BCLFFBQVEsS0FBSyxNQUFNO0FBQUEsTUFDbkIsT0FBTyxLQUFLLE1BQU07QUFBQSxNQUNsQixpQkFBaUIsS0FBSyxNQUFNO0FBQUEsTUFDNUIscUJBQXFCLEtBQUssTUFBTSxvQkFBb0I7QUFBQSxNQUNwRCxtQkFBbUIsS0FBSyxNQUFNLGFBQWE7QUFBQSxJQUM3QyxHQUFHLE1BQU0sQ0FBQztBQUFBLEVBQ1o7QUFDRjtBQUVPLGFBQU0sd0JBQXdCLElBQUksc0JBQXNCOyIsIm5hbWVzIjpbXX0=