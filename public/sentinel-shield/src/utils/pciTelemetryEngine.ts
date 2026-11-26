const INITIAL_CONNECTORS = [
  {
    id: "conn-pcie-1",
    name: "PCIe Gen5 x16 Slot #1 (Primary Accelerator / GPU)",
    category: "PCI_EXPRESS",
    slotIndex: 1,
    physicalLocation: "Główna Magistrala Płyty Głównej (Szyna Górna)",
    status: "OPTIMAL",
    voltageV: 12.08,
    currentAmperes: 14.85,
    powerWatts: 179.39,
    frequencyMhz: 32e3,
    // 32 GT/s
    impedanceOhms: 85.2,
    noiseSnrDb: 42.6,
    emFieldStrengthVpm: 3.4,
    phaseAngleDeg: 1.2,
    temperatureC: 44.5,
    coords: { x: 120, y: 180, pinCount: 164 },
    waveformType: "PULSE_SQUARE",
    sampleHistory: []
  },
  {
    id: "conn-pcie-2",
    name: "PCIe Gen4 x4 Slot #2 (NVMe RAID Direct Bus)",
    category: "PCI_EXPRESS",
    slotIndex: 2,
    physicalLocation: "Magistrala PCI-E Dolna (Mostek PCH)",
    status: "OPTIMAL",
    voltageV: 3.32,
    currentAmperes: 3.12,
    powerWatts: 10.36,
    frequencyMhz: 16e3,
    impedanceOhms: 84.8,
    noiseSnrDb: 46.1,
    emFieldStrengthVpm: 1.1,
    phaseAngleDeg: 0.5,
    temperatureC: 38.2,
    coords: { x: 120, y: 320, pinCount: 64 },
    waveformType: "SINE",
    sampleHistory: []
  },
  {
    id: "conn-usbc-pd",
    name: "USB-C PD 3.1 & Thunderbolt 4 High-Speed Bus",
    category: "USB_C_THUNDERBOLT",
    slotIndex: 3,
    physicalLocation: "Tylny Panel Złączy I/O - Port 1",
    status: "OPTIMAL",
    voltageV: 20.05,
    currentAmperes: 4.82,
    powerWatts: 96.64,
    frequencyMhz: 4e4,
    impedanceOhms: 90.1,
    noiseSnrDb: 39.8,
    emFieldStrengthVpm: 2.8,
    phaseAngleDeg: 2.1,
    temperatureC: 36.9,
    coords: { x: 40, y: 110, pinCount: 24 },
    waveformType: "BURST_DISCHARGE",
    sampleHistory: []
  },
  {
    id: "conn-dp-hdmi",
    name: "DisplayPort 2.1 / HDMI 2.1 Video PHY Stream",
    category: "DISPLAYPORT_HDMI",
    slotIndex: 4,
    physicalLocation: "Tylny Panel Wyjść Wideo DisplayPort",
    status: "OPTIMAL",
    voltageV: 3.28,
    currentAmperes: 1.45,
    powerWatts: 4.76,
    frequencyMhz: 1e4,
    impedanceOhms: 100.2,
    noiseSnrDb: 48.3,
    emFieldStrengthVpm: 0.9,
    phaseAngleDeg: 0.3,
    temperatureC: 33.1,
    coords: { x: 40, y: 220, pinCount: 20 },
    waveformType: "SINE",
    sampleHistory: []
  },
  {
    id: "conn-vrm-rail",
    name: "12VHPWR High-Current VRM Rail & Power Delivery",
    category: "POWER_RAIL_VRM",
    slotIndex: 5,
    physicalLocation: "Sekcja Zasilania Płyty (Mosfety DrMOS & Dławiki)",
    status: "OPTIMAL",
    voltageV: 12.14,
    currentAmperes: 26.4,
    powerWatts: 320.5,
    frequencyMhz: 800,
    // PWM switching freq kHz/MHz
    impedanceOhms: 0.08,
    noiseSnrDb: 54,
    emFieldStrengthVpm: 4.9,
    phaseAngleDeg: 3.8,
    temperatureC: 51.2,
    coords: { x: 260, y: 80, pinCount: 16 },
    waveformType: "HARMONIC_SAWTOOTH",
    sampleHistory: []
  },
  {
    id: "conn-gpio-bus",
    name: "Low-Latency GPIO / SPI / I2C Bus & Sensor Line",
    category: "GPIO_HEADER",
    slotIndex: 6,
    physicalLocation: "Listwa Szpilkowa Płyty (Header JTAG/GPIO)",
    status: "OPTIMAL",
    voltageV: 3.3,
    currentAmperes: 0.35,
    powerWatts: 1.15,
    frequencyMhz: 50,
    impedanceOhms: 50,
    noiseSnrDb: 58.2,
    emFieldStrengthVpm: 0.3,
    phaseAngleDeg: 0.1,
    temperatureC: 29.4,
    coords: { x: 340, y: 360, pinCount: 40 },
    waveformType: "PULSE_SQUARE",
    sampleHistory: []
  }
];
class PciTelemetryEngine {
  constructor() {
    this.listeners = /* @__PURE__ */ new Set();
    this.telemetryInterval = null;
    this.stressSimulation = {
      active: false,
      cpuPercent: 0,
      ramPercent: 0
    };
    const now = Date.now();
    const initializedConnectors = INITIAL_CONNECTORS.map((c) => {
      const history = [];
      for (let i = 20; i >= 0; i--) {
        const timeOffset = now - i * 1e3;
        const timeStr = new Date(timeOffset).toLocaleTimeString();
        history.push({
          timestamp: timeStr,
          epochMs: timeOffset,
          voltage: +(c.voltageV + (Math.random() * 0.1 - 0.05)).toFixed(2),
          current: +(c.currentAmperes + (Math.random() * 0.2 - 0.1)).toFixed(2),
          power: +(c.powerWatts + (Math.random() * 2 - 1)).toFixed(2),
          frequency: +(c.frequencyMhz + (Math.random() * 5 - 2.5)).toFixed(1),
          emField: +(c.emFieldStrengthVpm + (Math.random() * 0.2 - 0.1)).toFixed(2),
          phase: +(c.phaseAngleDeg + (Math.random() * 0.2 - 0.1)).toFixed(2)
        });
      }
      return {
        ...c,
        sampleHistory: history
      };
    });
    const globalHistory = [];
    for (let i = 20; i >= 0; i--) {
      const timeOffset = now - i * 1e3;
      const timeStr = new Date(timeOffset).toLocaleTimeString();
      globalHistory.push({
        time: timeStr,
        epochMs: timeOffset,
        pcie1_voltage: 12.08 + (Math.random() * 0.1 - 0.05),
        pcie1_current: 14.85 + (Math.random() * 0.4 - 0.2),
        pcie1_emField: 3.4 + (Math.random() * 0.2 - 0.1),
        pcie2_voltage: 3.32 + (Math.random() * 0.04 - 0.02),
        pcie2_current: 3.12 + (Math.random() * 0.1 - 0.05),
        pcie2_emField: 1.1 + (Math.random() * 0.1 - 0.05),
        usbc_voltage: 20.05 + (Math.random() * 0.1 - 0.05),
        usbc_current: 4.82 + (Math.random() * 0.2 - 0.1),
        usbc_emField: 2.8 + (Math.random() * 0.2 - 0.1),
        vrm_voltage: 12.14 + (Math.random() * 0.1 - 0.05),
        vrm_current: 26.4 + (Math.random() * 0.6 - 0.3),
        vrm_emField: 4.9 + (Math.random() * 0.3 - 0.15),
        dp_voltage: 3.28 + (Math.random() * 0.02 - 0.01),
        dp_current: 1.45 + (Math.random() * 0.05 - 0.02),
        dp_emField: 0.9 + (Math.random() * 0.05 - 0.02),
        gpio_voltage: 3.3 + (Math.random() * 0.02 - 0.01),
        gpio_current: 0.35 + (Math.random() * 0.02 - 0.01),
        gpio_emField: 0.3 + (Math.random() * 0.02 - 0.01),
        aggregatePowerW: +(179.39 + 10.36 + 96.64 + 4.76 + 320.5 + 1.15).toFixed(2),
        harmonicDistortionThd: +(0.85 + Math.random() * 0.15).toFixed(2)
      });
    }
    this.state = {
      isStreaming: true,
      samplingRateHz: 500,
      totalConnectorsMonitored: initializedConnectors.length,
      activeAnomaliesCount: 0,
      totalPowerDrawnWatts: 612.8,
      averageEmFieldVpm: 2.23,
      peakFrequencyGhz: 40,
      connectors: initializedConnectors,
      globalOscilloscopeHistory: globalHistory,
      recentIncidents: [
        {
          id: "inc-pci-init-1",
          timestamp: new Date(Date.now() - 45e3).toLocaleTimeString(),
          connectorId: "conn-pcie-1",
          connectorName: "PCIe Gen5 x16 Slot #1",
          anomalyType: "HARMONIC_PULSE_STABILIZED",
          severity: "LOW",
          recordedValues: "V=12.18V, I=15.4A, EM=3.6 V/m",
          actionTaken: "Filtracja zakłóceń EMI na szynie PCIe x16 zakończona sukcesem."
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
    if (this.telemetryInterval) return;
    this.telemetryInterval = setInterval(() => {
      const now = Date.now();
      const timeStr = new Date(now).toLocaleTimeString();
      let totalWatts = 0;
      let totalEm = 0;
      let anomalyCount = 0;
      const isStress = this.stressSimulation.active;
      const cpuFactor = isStress ? this.stressSimulation.cpuPercent / 100 : 0;
      const ramFactor = isStress ? this.stressSimulation.ramPercent / 100 : 0;
      const updatedConnectors = this.state.connectors.map((c) => {
        const vNoise = Math.random() * 0.08 - 0.04;
        const iNoise = Math.random() * 0.15 - 0.075;
        const emNoise = Math.random() * 0.1 - 0.05;
        let baseV = c.voltageV;
        let baseI = c.currentAmperes;
        let baseEm = c.emFieldStrengthVpm;
        if (isStress) {
          if (c.id === "conn-vrm-rail") {
            baseI = 26.4 + cpuFactor * 68;
            baseV = Math.max(11.4, 12.14 - cpuFactor * 0.45);
            baseEm = 4.9 + cpuFactor * 9.5;
          } else if (c.id === "conn-pcie-1") {
            baseI = 14.85 + (cpuFactor * 0.7 + ramFactor * 0.3) * 18;
            baseEm = 3.4 + cpuFactor * 6.2;
          } else if (c.id === "conn-pcie-2") {
            baseI = 3.12 + ramFactor * 8.4;
            baseEm = 1.1 + ramFactor * 4.8;
          } else {
            baseI = c.currentAmperes * (1 + cpuFactor * 0.35);
            baseEm = c.emFieldStrengthVpm * (1 + cpuFactor * 0.5);
          }
        }
        const newV = +Math.max(0, baseV + vNoise).toFixed(2);
        const newI = +Math.max(0, baseI + iNoise).toFixed(2);
        const newP = +(newV * newI).toFixed(2);
        const newEm = +Math.max(0.1, baseEm + emNoise).toFixed(2);
        totalWatts += newP;
        totalEm += newEm;
        let status = c.status;
        if (newEm > 8 || newV > c.voltageV * 1.25) {
          status = "ANOMALY_DETECTED";
          anomalyCount++;
        } else if (newEm > 5) {
          status = "HARMONIC_SPIKE";
        } else if (status !== "ISOLATED") {
          status = "OPTIMAL";
        }
        const newHistory = [
          ...c.sampleHistory.slice(-24),
          {
            timestamp: timeStr,
            epochMs: now,
            voltage: newV,
            current: newI,
            power: newP,
            frequency: c.frequencyMhz,
            emField: newEm,
            phase: c.phaseAngleDeg
          }
        ];
        return {
          ...c,
          voltageV: newV,
          currentAmperes: newI,
          powerWatts: newP,
          emFieldStrengthVpm: newEm,
          status,
          sampleHistory: newHistory
        };
      });
      const pcie1 = updatedConnectors.find((c) => c.id === "conn-pcie-1") || updatedConnectors[0];
      const pcie2 = updatedConnectors.find((c) => c.id === "conn-pcie-2") || updatedConnectors[1];
      const usbc = updatedConnectors.find((c) => c.id === "conn-usbc-pd") || updatedConnectors[2];
      const vrm = updatedConnectors.find((c) => c.id === "conn-vrm-rail") || updatedConnectors[4];
      const dp = updatedConnectors.find((c) => c.id === "conn-dp-hdmi") || updatedConnectors[3];
      const gpio = updatedConnectors.find((c) => c.id === "conn-gpio-bus") || updatedConnectors[5];
      const newGlobalPoint = {
        time: timeStr,
        epochMs: now,
        pcie1_voltage: pcie1.voltageV,
        pcie1_current: pcie1.currentAmperes,
        pcie1_emField: pcie1.emFieldStrengthVpm,
        pcie2_voltage: pcie2.voltageV,
        pcie2_current: pcie2.currentAmperes,
        pcie2_emField: pcie2.emFieldStrengthVpm,
        usbc_voltage: usbc.voltageV,
        usbc_current: usbc.currentAmperes,
        usbc_emField: usbc.emFieldStrengthVpm,
        vrm_voltage: vrm.voltageV,
        vrm_current: vrm.currentAmperes,
        vrm_emField: vrm.emFieldStrengthVpm,
        dp_voltage: dp.voltageV,
        dp_current: dp.currentAmperes,
        dp_emField: dp.emFieldStrengthVpm,
        gpio_voltage: gpio.voltageV,
        gpio_current: gpio.currentAmperes,
        gpio_emField: gpio.emFieldStrengthVpm,
        aggregatePowerW: +totalWatts.toFixed(2),
        harmonicDistortionThd: +(0.8 + Math.random() * 0.25 + (isStress ? cpuFactor * 4.8 : 0)).toFixed(2)
      };
      this.state = {
        ...this.state,
        totalPowerDrawnWatts: +totalWatts.toFixed(2),
        averageEmFieldVpm: +(totalEm / updatedConnectors.length).toFixed(2),
        activeAnomaliesCount: anomalyCount,
        connectors: updatedConnectors,
        globalOscilloscopeHistory: [...this.state.globalOscilloscopeHistory.slice(-24), newGlobalPoint]
      };
      this.notify();
    }, 1500);
  }
  stopStreaming() {
    if (this.telemetryInterval) {
      clearInterval(this.telemetryInterval);
      this.telemetryInterval = null;
    }
    this.state = { ...this.state, isStreaming: false };
    this.notify();
  }
  toggleStreaming() {
    if (this.state.isStreaming) {
      this.stopStreaming();
    } else {
      this.state = { ...this.state, isStreaming: true };
      this.startStreaming();
    }
  }
  // Wymuszenie stabilizacji i tłumienia zakłóceń na wybranym złączu lub na wszystkich
  applyHardwareGroundingClamping(connectorId) {
    const nowTime = (/* @__PURE__ */ new Date()).toLocaleTimeString();
    if (connectorId && connectorId !== "ALL") {
      this.state.connectors = this.state.connectors.map((c) => {
        if (c.id === connectorId) {
          return {
            ...c,
            status: "OPTIMAL",
            emFieldStrengthVpm: +Math.min(c.emFieldStrengthVpm, 1.5).toFixed(2),
            noiseSnrDb: Math.max(c.noiseSnrDb, 50)
          };
        }
        return c;
      });
      this.state.recentIncidents = [
        {
          id: `clamp-${Date.now()}`,
          timestamp: nowTime,
          connectorId,
          connectorName: this.state.connectors.find((c) => c.id === connectorId)?.name || "Wybrane Złącze",
          anomalyType: "EM_CLAMPING_APPLIED",
          severity: "LOW",
          recordedValues: "Tłumienie indukcji i uziemienie warkocza ekranującego",
          actionTaken: "Skutecznie zredukowano pole EM i wyeliminowano przepięcia w pętli."
        },
        ...this.state.recentIncidents.slice(0, 19)
      ];
    } else {
      this.state.connectors = this.state.connectors.map((c) => ({
        ...c,
        status: "OPTIMAL",
        emFieldStrengthVpm: +Math.min(c.emFieldStrengthVpm, 1.8).toFixed(2),
        noiseSnrDb: Math.max(c.noiseSnrDb, 48)
      }));
      this.state.recentIncidents = [
        {
          id: `clamp-all-${Date.now()}`,
          timestamp: nowTime,
          connectorId: "ALL",
          connectorName: "Wszystkie Szyny PCI & Porty I/O",
          anomalyType: "GLOBAL_EM_HARMONIC_PURGE",
          severity: "MEDIUM",
          recordedValues: "Zastosowano globalne uziemienie plazmowe 0.05 Ohm",
          actionTaken: "Zredukowano pole EM na całej listwie PCI do wartości nominalnych < 2.0 V/m."
        },
        ...this.state.recentIncidents.slice(0, 19)
      ];
    }
    this.notify();
  }
  // Symulacja ataku indukcyjnego / rezonansu na szynie PCI dla celów diagnostycznych
  injectTestHarmonicPulse(connectorId = "conn-pcie-1") {
    const nowTime = (/* @__PURE__ */ new Date()).toLocaleTimeString();
    this.state.connectors = this.state.connectors.map((c) => {
      if (c.id === connectorId) {
        return {
          ...c,
          status: "ANOMALY_DETECTED",
          emFieldStrengthVpm: +(c.emFieldStrengthVpm + 8.5).toFixed(2),
          voltageV: +(c.voltageV * 1.15).toFixed(2),
          currentAmperes: +(c.currentAmperes * 1.35).toFixed(2),
          powerWatts: +(c.powerWatts * 1.55).toFixed(2)
        };
      }
      return c;
    });
    this.state.recentIncidents = [
      {
        id: `inject-${Date.now()}`,
        timestamp: nowTime,
        connectorId,
        connectorName: this.state.connectors.find((c) => c.id === connectorId)?.name || "Szyna PCI",
        anomalyType: "SIMULATED_RESONANCE_INDUCTION",
        severity: "HIGH",
        recordedValues: "Skok pola EM +8.5 V/m, wzrost prądu o 35%",
        actionTaken: "Wstrzyknięto impuls testowy rezonansu elektromagnetycznego."
      },
      ...this.state.recentIncidents.slice(0, 19)
    ];
    this.notify();
  }
  setStressSimulation(active, cpuPercent = 0, ramPercent = 0) {
    this.stressSimulation = {
      active,
      cpuPercent: Math.max(0, Math.min(100, cpuPercent)),
      ramPercent: Math.max(0, Math.min(100, ramPercent))
    };
    this.notify();
  }
  getStressSimulation() {
    return { ...this.stressSimulation };
  }
}
export const pciTelemetryEngine = new PciTelemetryEngine();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBjaVRlbGVtZXRyeUVuZ2luZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBcbiAgUGNpSGFyZHdhcmVTdGF0ZSwgXG4gIFBjaUNvbm5lY3RvclNlbnNvck5vZGUsIFxuICBDb25uZWN0b3JDYXRlZ29yeSBcbn0gZnJvbSAnLi4vdHlwZXMnO1xuXG50eXBlIFBjaVRlbGVtZXRyeUxpc3RlbmVyID0gKHN0YXRlOiBQY2lIYXJkd2FyZVN0YXRlKSA9PiB2b2lkO1xuXG4vLyBQcmVkZWZpbmlvd2FuZSBmaXp5Y3puZSBvZGJpb3JuaWtpIHBvZMWCxIVjem9uZSBkbyBsaXN0ZXcgUENJIGkgd3lqxZvEhyBtYWdpc3RyYWxpXG5jb25zdCBJTklUSUFMX0NPTk5FQ1RPUlM6IFBjaUNvbm5lY3RvclNlbnNvck5vZGVbXSA9IFtcbiAge1xuICAgIGlkOiAnY29ubi1wY2llLTEnLFxuICAgIG5hbWU6ICdQQ0llIEdlbjUgeDE2IFNsb3QgIzEgKFByaW1hcnkgQWNjZWxlcmF0b3IgLyBHUFUpJyxcbiAgICBjYXRlZ29yeTogJ1BDSV9FWFBSRVNTJyxcbiAgICBzbG90SW5kZXg6IDEsXG4gICAgcGh5c2ljYWxMb2NhdGlvbjogJ0fFgsOzd25hIE1hZ2lzdHJhbGEgUMWCeXR5IEfFgsOzd25laiAoU3p5bmEgR8Ozcm5hKScsXG4gICAgc3RhdHVzOiAnT1BUSU1BTCcsXG4gICAgdm9sdGFnZVY6IDEyLjA4LFxuICAgIGN1cnJlbnRBbXBlcmVzOiAxNC44NSxcbiAgICBwb3dlcldhdHRzOiAxNzkuMzksXG4gICAgZnJlcXVlbmN5TWh6OiAzMjAwMC4wLCAvLyAzMiBHVC9zXG4gICAgaW1wZWRhbmNlT2htczogODUuMixcbiAgICBub2lzZVNuckRiOiA0Mi42LFxuICAgIGVtRmllbGRTdHJlbmd0aFZwbTogMy40LFxuICAgIHBoYXNlQW5nbGVEZWc6IDEuMixcbiAgICB0ZW1wZXJhdHVyZUM6IDQ0LjUsXG4gICAgY29vcmRzOiB7IHg6IDEyMCwgeTogMTgwLCBwaW5Db3VudDogMTY0IH0sXG4gICAgd2F2ZWZvcm1UeXBlOiAnUFVMU0VfU1FVQVJFJyxcbiAgICBzYW1wbGVIaXN0b3J5OiBbXVxuICB9LFxuICB7XG4gICAgaWQ6ICdjb25uLXBjaWUtMicsXG4gICAgbmFtZTogJ1BDSWUgR2VuNCB4NCBTbG90ICMyIChOVk1lIFJBSUQgRGlyZWN0IEJ1cyknLFxuICAgIGNhdGVnb3J5OiAnUENJX0VYUFJFU1MnLFxuICAgIHNsb3RJbmRleDogMixcbiAgICBwaHlzaWNhbExvY2F0aW9uOiAnTWFnaXN0cmFsYSBQQ0ktRSBEb2xuYSAoTW9zdGVrIFBDSCknLFxuICAgIHN0YXR1czogJ09QVElNQUwnLFxuICAgIHZvbHRhZ2VWOiAzLjMyLFxuICAgIGN1cnJlbnRBbXBlcmVzOiAzLjEyLFxuICAgIHBvd2VyV2F0dHM6IDEwLjM2LFxuICAgIGZyZXF1ZW5jeU1oejogMTYwMDAuMCxcbiAgICBpbXBlZGFuY2VPaG1zOiA4NC44LFxuICAgIG5vaXNlU25yRGI6IDQ2LjEsXG4gICAgZW1GaWVsZFN0cmVuZ3RoVnBtOiAxLjEsXG4gICAgcGhhc2VBbmdsZURlZzogMC41LFxuICAgIHRlbXBlcmF0dXJlQzogMzguMixcbiAgICBjb29yZHM6IHsgeDogMTIwLCB5OiAzMjAsIHBpbkNvdW50OiA2NCB9LFxuICAgIHdhdmVmb3JtVHlwZTogJ1NJTkUnLFxuICAgIHNhbXBsZUhpc3Rvcnk6IFtdXG4gIH0sXG4gIHtcbiAgICBpZDogJ2Nvbm4tdXNiYy1wZCcsXG4gICAgbmFtZTogJ1VTQi1DIFBEIDMuMSAmIFRodW5kZXJib2x0IDQgSGlnaC1TcGVlZCBCdXMnLFxuICAgIGNhdGVnb3J5OiAnVVNCX0NfVEhVTkRFUkJPTFQnLFxuICAgIHNsb3RJbmRleDogMyxcbiAgICBwaHlzaWNhbExvY2F0aW9uOiAnVHlsbnkgUGFuZWwgWsWCxIVjenkgSS9PIC0gUG9ydCAxJyxcbiAgICBzdGF0dXM6ICdPUFRJTUFMJyxcbiAgICB2b2x0YWdlVjogMjAuMDUsXG4gICAgY3VycmVudEFtcGVyZXM6IDQuODIsXG4gICAgcG93ZXJXYXR0czogOTYuNjQsXG4gICAgZnJlcXVlbmN5TWh6OiA0MDAwMC4wLFxuICAgIGltcGVkYW5jZU9obXM6IDkwLjEsXG4gICAgbm9pc2VTbnJEYjogMzkuOCxcbiAgICBlbUZpZWxkU3RyZW5ndGhWcG06IDIuOCxcbiAgICBwaGFzZUFuZ2xlRGVnOiAyLjEsXG4gICAgdGVtcGVyYXR1cmVDOiAzNi45LFxuICAgIGNvb3JkczogeyB4OiA0MCwgeTogMTEwLCBwaW5Db3VudDogMjQgfSxcbiAgICB3YXZlZm9ybVR5cGU6ICdCVVJTVF9ESVNDSEFSR0UnLFxuICAgIHNhbXBsZUhpc3Rvcnk6IFtdXG4gIH0sXG4gIHtcbiAgICBpZDogJ2Nvbm4tZHAtaGRtaScsXG4gICAgbmFtZTogJ0Rpc3BsYXlQb3J0IDIuMSAvIEhETUkgMi4xIFZpZGVvIFBIWSBTdHJlYW0nLFxuICAgIGNhdGVnb3J5OiAnRElTUExBWVBPUlRfSERNSScsXG4gICAgc2xvdEluZGV4OiA0LFxuICAgIHBoeXNpY2FsTG9jYXRpb246ICdUeWxueSBQYW5lbCBXeWrFm8SHIFdpZGVvIERpc3BsYXlQb3J0JyxcbiAgICBzdGF0dXM6ICdPUFRJTUFMJyxcbiAgICB2b2x0YWdlVjogMy4yOCxcbiAgICBjdXJyZW50QW1wZXJlczogMS40NSxcbiAgICBwb3dlcldhdHRzOiA0Ljc2LFxuICAgIGZyZXF1ZW5jeU1oejogMTAwMDAuMCxcbiAgICBpbXBlZGFuY2VPaG1zOiAxMDAuMixcbiAgICBub2lzZVNuckRiOiA0OC4zLFxuICAgIGVtRmllbGRTdHJlbmd0aFZwbTogMC45LFxuICAgIHBoYXNlQW5nbGVEZWc6IDAuMyxcbiAgICB0ZW1wZXJhdHVyZUM6IDMzLjEsXG4gICAgY29vcmRzOiB7IHg6IDQwLCB5OiAyMjAsIHBpbkNvdW50OiAyMCB9LFxuICAgIHdhdmVmb3JtVHlwZTogJ1NJTkUnLFxuICAgIHNhbXBsZUhpc3Rvcnk6IFtdXG4gIH0sXG4gIHtcbiAgICBpZDogJ2Nvbm4tdnJtLXJhaWwnLFxuICAgIG5hbWU6ICcxMlZIUFdSIEhpZ2gtQ3VycmVudCBWUk0gUmFpbCAmIFBvd2VyIERlbGl2ZXJ5JyxcbiAgICBjYXRlZ29yeTogJ1BPV0VSX1JBSUxfVlJNJyxcbiAgICBzbG90SW5kZXg6IDUsXG4gICAgcGh5c2ljYWxMb2NhdGlvbjogJ1Nla2NqYSBaYXNpbGFuaWEgUMWCeXR5IChNb3NmZXR5IERyTU9TICYgRMWCYXdpa2kpJyxcbiAgICBzdGF0dXM6ICdPUFRJTUFMJyxcbiAgICB2b2x0YWdlVjogMTIuMTQsXG4gICAgY3VycmVudEFtcGVyZXM6IDI2LjQwLFxuICAgIHBvd2VyV2F0dHM6IDMyMC41MCxcbiAgICBmcmVxdWVuY3lNaHo6IDgwMC4wLCAvLyBQV00gc3dpdGNoaW5nIGZyZXEga0h6L01IelxuICAgIGltcGVkYW5jZU9obXM6IDAuMDgsXG4gICAgbm9pc2VTbnJEYjogNTQuMCxcbiAgICBlbUZpZWxkU3RyZW5ndGhWcG06IDQuOSxcbiAgICBwaGFzZUFuZ2xlRGVnOiAzLjgsXG4gICAgdGVtcGVyYXR1cmVDOiA1MS4yLFxuICAgIGNvb3JkczogeyB4OiAyNjAsIHk6IDgwLCBwaW5Db3VudDogMTYgfSxcbiAgICB3YXZlZm9ybVR5cGU6ICdIQVJNT05JQ19TQVdUT09USCcsXG4gICAgc2FtcGxlSGlzdG9yeTogW11cbiAgfSxcbiAge1xuICAgIGlkOiAnY29ubi1ncGlvLWJ1cycsXG4gICAgbmFtZTogJ0xvdy1MYXRlbmN5IEdQSU8gLyBTUEkgLyBJMkMgQnVzICYgU2Vuc29yIExpbmUnLFxuICAgIGNhdGVnb3J5OiAnR1BJT19IRUFERVInLFxuICAgIHNsb3RJbmRleDogNixcbiAgICBwaHlzaWNhbExvY2F0aW9uOiAnTGlzdHdhIFN6cGlsa293YSBQxYJ5dHkgKEhlYWRlciBKVEFHL0dQSU8pJyxcbiAgICBzdGF0dXM6ICdPUFRJTUFMJyxcbiAgICB2b2x0YWdlVjogMy4zMCxcbiAgICBjdXJyZW50QW1wZXJlczogMC4zNSxcbiAgICBwb3dlcldhdHRzOiAxLjE1LFxuICAgIGZyZXF1ZW5jeU1oejogNTAuMCxcbiAgICBpbXBlZGFuY2VPaG1zOiA1MC4wLFxuICAgIG5vaXNlU25yRGI6IDU4LjIsXG4gICAgZW1GaWVsZFN0cmVuZ3RoVnBtOiAwLjMsXG4gICAgcGhhc2VBbmdsZURlZzogMC4xLFxuICAgIHRlbXBlcmF0dXJlQzogMjkuNCxcbiAgICBjb29yZHM6IHsgeDogMzQwLCB5OiAzNjAsIHBpbkNvdW50OiA0MCB9LFxuICAgIHdhdmVmb3JtVHlwZTogJ1BVTFNFX1NRVUFSRScsXG4gICAgc2FtcGxlSGlzdG9yeTogW11cbiAgfVxuXTtcblxuY2xhc3MgUGNpVGVsZW1ldHJ5RW5naW5lIHtcbiAgcHJpdmF0ZSBzdGF0ZTogUGNpSGFyZHdhcmVTdGF0ZTtcbiAgcHJpdmF0ZSBsaXN0ZW5lcnM6IFNldDxQY2lUZWxlbWV0cnlMaXN0ZW5lcj4gPSBuZXcgU2V0KCk7XG4gIHByaXZhdGUgdGVsZW1ldHJ5SW50ZXJ2YWw6IFJldHVyblR5cGU8dHlwZW9mIHNldEludGVydmFsPiB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIHN0cmVzc1NpbXVsYXRpb24gPSB7XG4gICAgYWN0aXZlOiBmYWxzZSxcbiAgICBjcHVQZXJjZW50OiAwLFxuICAgIHJhbVBlcmNlbnQ6IDBcbiAgfTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyBJbmljamFsaXphY2phIGhpc3RvcmlpIHByw7NiZWsgZGxhIGthxbxkZWdvIHrFgsSFY3phXG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICBjb25zdCBpbml0aWFsaXplZENvbm5lY3RvcnMgPSBJTklUSUFMX0NPTk5FQ1RPUlMubWFwKChjKSA9PiB7XG4gICAgICBjb25zdCBoaXN0b3J5ID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMjA7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGNvbnN0IHRpbWVPZmZzZXQgPSBub3cgLSBpICogMTAwMDtcbiAgICAgICAgY29uc3QgdGltZVN0ciA9IG5ldyBEYXRlKHRpbWVPZmZzZXQpLnRvTG9jYWxlVGltZVN0cmluZygpO1xuICAgICAgICBoaXN0b3J5LnB1c2goe1xuICAgICAgICAgIHRpbWVzdGFtcDogdGltZVN0cixcbiAgICAgICAgICBlcG9jaE1zOiB0aW1lT2Zmc2V0LFxuICAgICAgICAgIHZvbHRhZ2U6ICsoYy52b2x0YWdlViArIChNYXRoLnJhbmRvbSgpICogMC4xIC0gMC4wNSkpLnRvRml4ZWQoMiksXG4gICAgICAgICAgY3VycmVudDogKyhjLmN1cnJlbnRBbXBlcmVzICsgKE1hdGgucmFuZG9tKCkgKiAwLjIgLSAwLjEpKS50b0ZpeGVkKDIpLFxuICAgICAgICAgIHBvd2VyOiArKGMucG93ZXJXYXR0cyArIChNYXRoLnJhbmRvbSgpICogMiAtIDEpKS50b0ZpeGVkKDIpLFxuICAgICAgICAgIGZyZXF1ZW5jeTogKyhjLmZyZXF1ZW5jeU1oeiArIChNYXRoLnJhbmRvbSgpICogNSAtIDIuNSkpLnRvRml4ZWQoMSksXG4gICAgICAgICAgZW1GaWVsZDogKyhjLmVtRmllbGRTdHJlbmd0aFZwbSArIChNYXRoLnJhbmRvbSgpICogMC4yIC0gMC4xKSkudG9GaXhlZCgyKSxcbiAgICAgICAgICBwaGFzZTogKyhjLnBoYXNlQW5nbGVEZWcgKyAoTWF0aC5yYW5kb20oKSAqIDAuMiAtIDAuMSkpLnRvRml4ZWQoMiksXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uYyxcbiAgICAgICAgc2FtcGxlSGlzdG9yeTogaGlzdG9yeVxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIC8vIEluaWNqYWxpemFjamEgZ2xvYmFsbmVqIGhpc3RvcmlpIG9zY3lsb3Nrb3B1XG4gICAgY29uc3QgZ2xvYmFsSGlzdG9yeSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAyMDsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGNvbnN0IHRpbWVPZmZzZXQgPSBub3cgLSBpICogMTAwMDtcbiAgICAgIGNvbnN0IHRpbWVTdHIgPSBuZXcgRGF0ZSh0aW1lT2Zmc2V0KS50b0xvY2FsZVRpbWVTdHJpbmcoKTtcbiAgICAgIGdsb2JhbEhpc3RvcnkucHVzaCh7XG4gICAgICAgIHRpbWU6IHRpbWVTdHIsXG4gICAgICAgIGVwb2NoTXM6IHRpbWVPZmZzZXQsXG4gICAgICAgIHBjaWUxX3ZvbHRhZ2U6IDEyLjA4ICsgKE1hdGgucmFuZG9tKCkgKiAwLjEgLSAwLjA1KSxcbiAgICAgICAgcGNpZTFfY3VycmVudDogMTQuODUgKyAoTWF0aC5yYW5kb20oKSAqIDAuNCAtIDAuMiksXG4gICAgICAgIHBjaWUxX2VtRmllbGQ6IDMuNCArIChNYXRoLnJhbmRvbSgpICogMC4yIC0gMC4xKSxcbiAgICAgICAgcGNpZTJfdm9sdGFnZTogMy4zMiArIChNYXRoLnJhbmRvbSgpICogMC4wNCAtIDAuMDIpLFxuICAgICAgICBwY2llMl9jdXJyZW50OiAzLjEyICsgKE1hdGgucmFuZG9tKCkgKiAwLjEgLSAwLjA1KSxcbiAgICAgICAgcGNpZTJfZW1GaWVsZDogMS4xICsgKE1hdGgucmFuZG9tKCkgKiAwLjEgLSAwLjA1KSxcbiAgICAgICAgdXNiY192b2x0YWdlOiAyMC4wNSArIChNYXRoLnJhbmRvbSgpICogMC4xIC0gMC4wNSksXG4gICAgICAgIHVzYmNfY3VycmVudDogNC44MiArIChNYXRoLnJhbmRvbSgpICogMC4yIC0gMC4xKSxcbiAgICAgICAgdXNiY19lbUZpZWxkOiAyLjggKyAoTWF0aC5yYW5kb20oKSAqIDAuMiAtIDAuMSksXG4gICAgICAgIHZybV92b2x0YWdlOiAxMi4xNCArIChNYXRoLnJhbmRvbSgpICogMC4xIC0gMC4wNSksXG4gICAgICAgIHZybV9jdXJyZW50OiAyNi40MCArIChNYXRoLnJhbmRvbSgpICogMC42IC0gMC4zKSxcbiAgICAgICAgdnJtX2VtRmllbGQ6IDQuOSArIChNYXRoLnJhbmRvbSgpICogMC4zIC0gMC4xNSksXG4gICAgICAgIGRwX3ZvbHRhZ2U6IDMuMjggKyAoTWF0aC5yYW5kb20oKSAqIDAuMDIgLSAwLjAxKSxcbiAgICAgICAgZHBfY3VycmVudDogMS40NSArIChNYXRoLnJhbmRvbSgpICogMC4wNSAtIDAuMDIpLFxuICAgICAgICBkcF9lbUZpZWxkOiAwLjkgKyAoTWF0aC5yYW5kb20oKSAqIDAuMDUgLSAwLjAyKSxcbiAgICAgICAgZ3Bpb192b2x0YWdlOiAzLjMwICsgKE1hdGgucmFuZG9tKCkgKiAwLjAyIC0gMC4wMSksXG4gICAgICAgIGdwaW9fY3VycmVudDogMC4zNSArIChNYXRoLnJhbmRvbSgpICogMC4wMiAtIDAuMDEpLFxuICAgICAgICBncGlvX2VtRmllbGQ6IDAuMyArIChNYXRoLnJhbmRvbSgpICogMC4wMiAtIDAuMDEpLFxuICAgICAgICBhZ2dyZWdhdGVQb3dlclc6ICsoMTc5LjM5ICsgMTAuMzYgKyA5Ni42NCArIDQuNzYgKyAzMjAuNTAgKyAxLjE1KS50b0ZpeGVkKDIpLFxuICAgICAgICBoYXJtb25pY0Rpc3RvcnRpb25UaGQ6ICsoMC44NSArIE1hdGgucmFuZG9tKCkgKiAwLjE1KS50b0ZpeGVkKDIpXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgaXNTdHJlYW1pbmc6IHRydWUsXG4gICAgICBzYW1wbGluZ1JhdGVIejogNTAwLFxuICAgICAgdG90YWxDb25uZWN0b3JzTW9uaXRvcmVkOiBpbml0aWFsaXplZENvbm5lY3RvcnMubGVuZ3RoLFxuICAgICAgYWN0aXZlQW5vbWFsaWVzQ291bnQ6IDAsXG4gICAgICB0b3RhbFBvd2VyRHJhd25XYXR0czogNjEyLjgsXG4gICAgICBhdmVyYWdlRW1GaWVsZFZwbTogMi4yMyxcbiAgICAgIHBlYWtGcmVxdWVuY3lHaHo6IDQwLjAsXG4gICAgICBjb25uZWN0b3JzOiBpbml0aWFsaXplZENvbm5lY3RvcnMsXG4gICAgICBnbG9iYWxPc2NpbGxvc2NvcGVIaXN0b3J5OiBnbG9iYWxIaXN0b3J5LFxuICAgICAgcmVjZW50SW5jaWRlbnRzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogJ2luYy1wY2ktaW5pdC0xJyxcbiAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKERhdGUubm93KCkgLSA0NTAwMCkudG9Mb2NhbGVUaW1lU3RyaW5nKCksXG4gICAgICAgICAgY29ubmVjdG9ySWQ6ICdjb25uLXBjaWUtMScsXG4gICAgICAgICAgY29ubmVjdG9yTmFtZTogJ1BDSWUgR2VuNSB4MTYgU2xvdCAjMScsXG4gICAgICAgICAgYW5vbWFseVR5cGU6ICdIQVJNT05JQ19QVUxTRV9TVEFCSUxJWkVEJyxcbiAgICAgICAgICBzZXZlcml0eTogJ0xPVycsXG4gICAgICAgICAgcmVjb3JkZWRWYWx1ZXM6ICdWPTEyLjE4ViwgST0xNS40QSwgRU09My42IFYvbScsXG4gICAgICAgICAgYWN0aW9uVGFrZW46ICdGaWx0cmFjamEgemFrxYLDs2NlxYQgRU1JIG5hIHN6eW5pZSBQQ0llIHgxNiB6YWtvxYRjem9uYSBzdWtjZXNlbS4nXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9O1xuXG4gICAgdGhpcy5zdGFydFN0cmVhbWluZygpO1xuICB9XG5cbiAgcHVibGljIGdldFN0YXRlKCk6IFBjaUhhcmR3YXJlU3RhdGUge1xuICAgIHJldHVybiB7IC4uLnRoaXMuc3RhdGUgfTtcbiAgfVxuXG4gIHB1YmxpYyBzdWJzY3JpYmUobGlzdGVuZXI6IFBjaVRlbGVtZXRyeUxpc3RlbmVyKTogKCkgPT4gdm9pZCB7XG4gICAgdGhpcy5saXN0ZW5lcnMuYWRkKGxpc3RlbmVyKTtcbiAgICBsaXN0ZW5lcih0aGlzLmdldFN0YXRlKCkpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB0aGlzLmxpc3RlbmVycy5kZWxldGUobGlzdGVuZXIpO1xuICAgIH07XG4gIH1cblxuICBwcml2YXRlIG5vdGlmeSgpOiB2b2lkIHtcbiAgICBjb25zdCBjdXJyZW50U3RhdGUgPSB0aGlzLmdldFN0YXRlKCk7XG4gICAgdGhpcy5saXN0ZW5lcnMuZm9yRWFjaCgobCkgPT4gbChjdXJyZW50U3RhdGUpKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGFydFN0cmVhbWluZygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy50ZWxlbWV0cnlJbnRlcnZhbCkgcmV0dXJuO1xuXG4gICAgdGhpcy50ZWxlbWV0cnlJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICBjb25zdCB0aW1lU3RyID0gbmV3IERhdGUobm93KS50b0xvY2FsZVRpbWVTdHJpbmcoKTtcblxuICAgICAgbGV0IHRvdGFsV2F0dHMgPSAwO1xuICAgICAgbGV0IHRvdGFsRW0gPSAwO1xuICAgICAgbGV0IGFub21hbHlDb3VudCA9IDA7XG5cbiAgICAgIGNvbnN0IGlzU3RyZXNzID0gdGhpcy5zdHJlc3NTaW11bGF0aW9uLmFjdGl2ZTtcbiAgICAgIGNvbnN0IGNwdUZhY3RvciA9IGlzU3RyZXNzID8gKHRoaXMuc3RyZXNzU2ltdWxhdGlvbi5jcHVQZXJjZW50IC8gMTAwKSA6IDA7XG4gICAgICBjb25zdCByYW1GYWN0b3IgPSBpc1N0cmVzcyA/ICh0aGlzLnN0cmVzc1NpbXVsYXRpb24ucmFtUGVyY2VudCAvIDEwMCkgOiAwO1xuXG4gICAgICBjb25zdCB1cGRhdGVkQ29ubmVjdG9ycyA9IHRoaXMuc3RhdGUuY29ubmVjdG9ycy5tYXAoKGMpID0+IHtcbiAgICAgICAgLy8gTmF0dXJhbG5lIGRyb2JuZSBmbHVrdHVhY2plIGxhYm9yYXRvcnlqbmVcbiAgICAgICAgY29uc3Qgdk5vaXNlID0gKE1hdGgucmFuZG9tKCkgKiAwLjA4IC0gMC4wNCk7XG4gICAgICAgIGNvbnN0IGlOb2lzZSA9IChNYXRoLnJhbmRvbSgpICogMC4xNSAtIDAuMDc1KTtcbiAgICAgICAgY29uc3QgZW1Ob2lzZSA9IChNYXRoLnJhbmRvbSgpICogMC4xIC0gMC4wNSk7XG5cbiAgICAgICAgbGV0IGJhc2VWID0gYy52b2x0YWdlVjtcbiAgICAgICAgbGV0IGJhc2VJID0gYy5jdXJyZW50QW1wZXJlcztcbiAgICAgICAgbGV0IGJhc2VFbSA9IGMuZW1GaWVsZFN0cmVuZ3RoVnBtO1xuXG4gICAgICAgIC8vIFN0cmVzcyB0ZXN0IGNhbGN1bGF0aW9uc1xuICAgICAgICBpZiAoaXNTdHJlc3MpIHtcbiAgICAgICAgICBpZiAoYy5pZCA9PT0gJ2Nvbm4tdnJtLXJhaWwnKSB7XG4gICAgICAgICAgICAvLyBVbmRlciBoaWdoIENQVSBzdHJlc3MsIFZSTSBjdXJyZW50IGp1bXBzIHVwIHRvIDk1QSwgdm9sdGFnZSBzYWdzIHNsaWdodGx5LCBFTSBmaWVsZCBzcGlrZXNcbiAgICAgICAgICAgIGJhc2VJID0gMjYuNCArIGNwdUZhY3RvciAqIDY4LjA7XG4gICAgICAgICAgICBiYXNlViA9IE1hdGgubWF4KDExLjQsIDEyLjE0IC0gY3B1RmFjdG9yICogMC40NSk7XG4gICAgICAgICAgICBiYXNlRW0gPSA0LjkgKyBjcHVGYWN0b3IgKiA5LjU7XG4gICAgICAgICAgfSBlbHNlIGlmIChjLmlkID09PSAnY29ubi1wY2llLTEnKSB7XG4gICAgICAgICAgICAvLyBQQ0llIGFjY2VsZXJhdG9yIGRyYXdzIGhlYXZ5IHBvd2VyXG4gICAgICAgICAgICBiYXNlSSA9IDE0Ljg1ICsgKGNwdUZhY3RvciAqIDAuNyArIHJhbUZhY3RvciAqIDAuMykgKiAxOC4wO1xuICAgICAgICAgICAgYmFzZUVtID0gMy40ICsgY3B1RmFjdG9yICogNi4yO1xuICAgICAgICAgIH0gZWxzZSBpZiAoYy5pZCA9PT0gJ2Nvbm4tcGNpZS0yJykge1xuICAgICAgICAgICAgLy8gUkFNIHBhZ2luZyAvIE5WTWUgZGlyZWN0IG1lbW9yeSBjaGFubmVsXG4gICAgICAgICAgICBiYXNlSSA9IDMuMTIgKyByYW1GYWN0b3IgKiA4LjQ7XG4gICAgICAgICAgICBiYXNlRW0gPSAxLjEgKyByYW1GYWN0b3IgKiA0Ljg7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJhc2VJID0gYy5jdXJyZW50QW1wZXJlcyAqICgxICsgY3B1RmFjdG9yICogMC4zNSk7XG4gICAgICAgICAgICBiYXNlRW0gPSBjLmVtRmllbGRTdHJlbmd0aFZwbSAqICgxICsgY3B1RmFjdG9yICogMC41KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuZXdWID0gKyhNYXRoLm1heCgwLCBiYXNlViArIHZOb2lzZSkpLnRvRml4ZWQoMik7XG4gICAgICAgIGNvbnN0IG5ld0kgPSArKE1hdGgubWF4KDAsIGJhc2VJICsgaU5vaXNlKSkudG9GaXhlZCgyKTtcbiAgICAgICAgY29uc3QgbmV3UCA9ICsobmV3ViAqIG5ld0kpLnRvRml4ZWQoMik7XG4gICAgICAgIGNvbnN0IG5ld0VtID0gKyhNYXRoLm1heCgwLjEsIGJhc2VFbSArIGVtTm9pc2UpKS50b0ZpeGVkKDIpO1xuXG4gICAgICAgIHRvdGFsV2F0dHMgKz0gbmV3UDtcbiAgICAgICAgdG90YWxFbSArPSBuZXdFbTtcblxuICAgICAgICBsZXQgc3RhdHVzID0gYy5zdGF0dXM7XG4gICAgICAgIGlmIChuZXdFbSA+IDguMCB8fCBuZXdWID4gYy52b2x0YWdlViAqIDEuMjUpIHtcbiAgICAgICAgICBzdGF0dXMgPSAnQU5PTUFMWV9ERVRFQ1RFRCc7XG4gICAgICAgICAgYW5vbWFseUNvdW50Kys7XG4gICAgICAgIH0gZWxzZSBpZiAobmV3RW0gPiA1LjApIHtcbiAgICAgICAgICBzdGF0dXMgPSAnSEFSTU9OSUNfU1BJS0UnO1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyAhPT0gJ0lTT0xBVEVEJykge1xuICAgICAgICAgIHN0YXR1cyA9ICdPUFRJTUFMJztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5ld0hpc3RvcnkgPSBbXG4gICAgICAgICAgLi4uYy5zYW1wbGVIaXN0b3J5LnNsaWNlKC0yNCksXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGltZXN0YW1wOiB0aW1lU3RyLFxuICAgICAgICAgICAgZXBvY2hNczogbm93LFxuICAgICAgICAgICAgdm9sdGFnZTogbmV3VixcbiAgICAgICAgICAgIGN1cnJlbnQ6IG5ld0ksXG4gICAgICAgICAgICBwb3dlcjogbmV3UCxcbiAgICAgICAgICAgIGZyZXF1ZW5jeTogYy5mcmVxdWVuY3lNaHosXG4gICAgICAgICAgICBlbUZpZWxkOiBuZXdFbSxcbiAgICAgICAgICAgIHBoYXNlOiBjLnBoYXNlQW5nbGVEZWdcbiAgICAgICAgICB9XG4gICAgICAgIF07XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5jLFxuICAgICAgICAgIHZvbHRhZ2VWOiBuZXdWLFxuICAgICAgICAgIGN1cnJlbnRBbXBlcmVzOiBuZXdJLFxuICAgICAgICAgIHBvd2VyV2F0dHM6IG5ld1AsXG4gICAgICAgICAgZW1GaWVsZFN0cmVuZ3RoVnBtOiBuZXdFbSxcbiAgICAgICAgICBzdGF0dXMsXG4gICAgICAgICAgc2FtcGxlSGlzdG9yeTogbmV3SGlzdG9yeVxuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHBjaWUxID0gdXBkYXRlZENvbm5lY3RvcnMuZmluZChjID0+IGMuaWQgPT09ICdjb25uLXBjaWUtMScpIHx8IHVwZGF0ZWRDb25uZWN0b3JzWzBdO1xuICAgICAgY29uc3QgcGNpZTIgPSB1cGRhdGVkQ29ubmVjdG9ycy5maW5kKGMgPT4gYy5pZCA9PT0gJ2Nvbm4tcGNpZS0yJykgfHwgdXBkYXRlZENvbm5lY3RvcnNbMV07XG4gICAgICBjb25zdCB1c2JjID0gdXBkYXRlZENvbm5lY3RvcnMuZmluZChjID0+IGMuaWQgPT09ICdjb25uLXVzYmMtcGQnKSB8fCB1cGRhdGVkQ29ubmVjdG9yc1syXTtcbiAgICAgIGNvbnN0IHZybSA9IHVwZGF0ZWRDb25uZWN0b3JzLmZpbmQoYyA9PiBjLmlkID09PSAnY29ubi12cm0tcmFpbCcpIHx8IHVwZGF0ZWRDb25uZWN0b3JzWzRdO1xuICAgICAgY29uc3QgZHAgPSB1cGRhdGVkQ29ubmVjdG9ycy5maW5kKGMgPT4gYy5pZCA9PT0gJ2Nvbm4tZHAtaGRtaScpIHx8IHVwZGF0ZWRDb25uZWN0b3JzWzNdO1xuICAgICAgY29uc3QgZ3BpbyA9IHVwZGF0ZWRDb25uZWN0b3JzLmZpbmQoYyA9PiBjLmlkID09PSAnY29ubi1ncGlvLWJ1cycpIHx8IHVwZGF0ZWRDb25uZWN0b3JzWzVdO1xuXG4gICAgICBjb25zdCBuZXdHbG9iYWxQb2ludCA9IHtcbiAgICAgICAgdGltZTogdGltZVN0cixcbiAgICAgICAgZXBvY2hNczogbm93LFxuICAgICAgICBwY2llMV92b2x0YWdlOiBwY2llMS52b2x0YWdlVixcbiAgICAgICAgcGNpZTFfY3VycmVudDogcGNpZTEuY3VycmVudEFtcGVyZXMsXG4gICAgICAgIHBjaWUxX2VtRmllbGQ6IHBjaWUxLmVtRmllbGRTdHJlbmd0aFZwbSxcbiAgICAgICAgcGNpZTJfdm9sdGFnZTogcGNpZTIudm9sdGFnZVYsXG4gICAgICAgIHBjaWUyX2N1cnJlbnQ6IHBjaWUyLmN1cnJlbnRBbXBlcmVzLFxuICAgICAgICBwY2llMl9lbUZpZWxkOiBwY2llMi5lbUZpZWxkU3RyZW5ndGhWcG0sXG4gICAgICAgIHVzYmNfdm9sdGFnZTogdXNiYy52b2x0YWdlVixcbiAgICAgICAgdXNiY19jdXJyZW50OiB1c2JjLmN1cnJlbnRBbXBlcmVzLFxuICAgICAgICB1c2JjX2VtRmllbGQ6IHVzYmMuZW1GaWVsZFN0cmVuZ3RoVnBtLFxuICAgICAgICB2cm1fdm9sdGFnZTogdnJtLnZvbHRhZ2VWLFxuICAgICAgICB2cm1fY3VycmVudDogdnJtLmN1cnJlbnRBbXBlcmVzLFxuICAgICAgICB2cm1fZW1GaWVsZDogdnJtLmVtRmllbGRTdHJlbmd0aFZwbSxcbiAgICAgICAgZHBfdm9sdGFnZTogZHAudm9sdGFnZVYsXG4gICAgICAgIGRwX2N1cnJlbnQ6IGRwLmN1cnJlbnRBbXBlcmVzLFxuICAgICAgICBkcF9lbUZpZWxkOiBkcC5lbUZpZWxkU3RyZW5ndGhWcG0sXG4gICAgICAgIGdwaW9fdm9sdGFnZTogZ3Bpby52b2x0YWdlVixcbiAgICAgICAgZ3Bpb19jdXJyZW50OiBncGlvLmN1cnJlbnRBbXBlcmVzLFxuICAgICAgICBncGlvX2VtRmllbGQ6IGdwaW8uZW1GaWVsZFN0cmVuZ3RoVnBtLFxuICAgICAgICBhZ2dyZWdhdGVQb3dlclc6ICt0b3RhbFdhdHRzLnRvRml4ZWQoMiksXG4gICAgICAgIGhhcm1vbmljRGlzdG9ydGlvblRoZDogKygwLjggKyBNYXRoLnJhbmRvbSgpICogMC4yNSArIChpc1N0cmVzcyA/IGNwdUZhY3RvciAqIDQuOCA6IDApKS50b0ZpeGVkKDIpXG4gICAgICB9O1xuXG4gICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAuLi50aGlzLnN0YXRlLFxuICAgICAgICB0b3RhbFBvd2VyRHJhd25XYXR0czogK3RvdGFsV2F0dHMudG9GaXhlZCgyKSxcbiAgICAgICAgYXZlcmFnZUVtRmllbGRWcG06ICsodG90YWxFbSAvIHVwZGF0ZWRDb25uZWN0b3JzLmxlbmd0aCkudG9GaXhlZCgyKSxcbiAgICAgICAgYWN0aXZlQW5vbWFsaWVzQ291bnQ6IGFub21hbHlDb3VudCxcbiAgICAgICAgY29ubmVjdG9yczogdXBkYXRlZENvbm5lY3RvcnMsXG4gICAgICAgIGdsb2JhbE9zY2lsbG9zY29wZUhpc3Rvcnk6IFsuLi50aGlzLnN0YXRlLmdsb2JhbE9zY2lsbG9zY29wZUhpc3Rvcnkuc2xpY2UoLTI0KSwgbmV3R2xvYmFsUG9pbnRdXG4gICAgICB9O1xuXG4gICAgICB0aGlzLm5vdGlmeSgpO1xuICAgIH0sIDE1MDApO1xuICB9XG5cbiAgcHVibGljIHN0b3BTdHJlYW1pbmcoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudGVsZW1ldHJ5SW50ZXJ2YWwpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50ZWxlbWV0cnlJbnRlcnZhbCk7XG4gICAgICB0aGlzLnRlbGVtZXRyeUludGVydmFsID0gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5zdGF0ZSA9IHsgLi4udGhpcy5zdGF0ZSwgaXNTdHJlYW1pbmc6IGZhbHNlIH07XG4gICAgdGhpcy5ub3RpZnkoKTtcbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGVTdHJlYW1pbmcoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc3RhdGUuaXNTdHJlYW1pbmcpIHtcbiAgICAgIHRoaXMuc3RvcFN0cmVhbWluZygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXRlID0geyAuLi50aGlzLnN0YXRlLCBpc1N0cmVhbWluZzogdHJ1ZSB9O1xuICAgICAgdGhpcy5zdGFydFN0cmVhbWluZygpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFd5bXVzemVuaWUgc3RhYmlsaXphY2ppIGkgdMWCdW1pZW5pYSB6YWvFgsOzY2XFhCBuYSB3eWJyYW55bSB6xYLEhWN6dSBsdWIgbmEgd3N6eXN0a2ljaFxuICBwdWJsaWMgYXBwbHlIYXJkd2FyZUdyb3VuZGluZ0NsYW1waW5nKGNvbm5lY3RvcklkPzogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3Qgbm93VGltZSA9IG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCk7XG5cbiAgICBpZiAoY29ubmVjdG9ySWQgJiYgY29ubmVjdG9ySWQgIT09ICdBTEwnKSB7XG4gICAgICB0aGlzLnN0YXRlLmNvbm5lY3RvcnMgPSB0aGlzLnN0YXRlLmNvbm5lY3RvcnMubWFwKGMgPT4ge1xuICAgICAgICBpZiAoYy5pZCA9PT0gY29ubmVjdG9ySWQpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uYyxcbiAgICAgICAgICAgIHN0YXR1czogJ09QVElNQUwnLFxuICAgICAgICAgICAgZW1GaWVsZFN0cmVuZ3RoVnBtOiArKE1hdGgubWluKGMuZW1GaWVsZFN0cmVuZ3RoVnBtLCAxLjUpKS50b0ZpeGVkKDIpLFxuICAgICAgICAgICAgbm9pc2VTbnJEYjogTWF0aC5tYXgoYy5ub2lzZVNuckRiLCA1MC4wKVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGM7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zdGF0ZS5yZWNlbnRJbmNpZGVudHMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogYGNsYW1wLSR7RGF0ZS5ub3coKX1gLFxuICAgICAgICAgIHRpbWVzdGFtcDogbm93VGltZSxcbiAgICAgICAgICBjb25uZWN0b3JJZCxcbiAgICAgICAgICBjb25uZWN0b3JOYW1lOiB0aGlzLnN0YXRlLmNvbm5lY3RvcnMuZmluZChjID0+IGMuaWQgPT09IGNvbm5lY3RvcklkKT8ubmFtZSB8fCAnV3licmFuZSBaxYLEhWN6ZScsXG4gICAgICAgICAgYW5vbWFseVR5cGU6ICdFTV9DTEFNUElOR19BUFBMSUVEJyxcbiAgICAgICAgICBzZXZlcml0eTogJ0xPVycsXG4gICAgICAgICAgcmVjb3JkZWRWYWx1ZXM6ICdUxYJ1bWllbmllIGluZHVrY2ppIGkgdXppZW1pZW5pZSB3YXJrb2N6YSBla3JhbnVqxIVjZWdvJyxcbiAgICAgICAgICBhY3Rpb25UYWtlbjogJ1NrdXRlY3puaWUgenJlZHVrb3dhbm8gcG9sZSBFTSBpIHd5ZWxpbWlub3dhbm8gcHJ6ZXBpxJljaWEgdyBwxJl0bGkuJ1xuICAgICAgICB9LFxuICAgICAgICAuLi50aGlzLnN0YXRlLnJlY2VudEluY2lkZW50cy5zbGljZSgwLCAxOSlcbiAgICAgIF07XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIENsYW1waW5nIGFsbFxuICAgICAgdGhpcy5zdGF0ZS5jb25uZWN0b3JzID0gdGhpcy5zdGF0ZS5jb25uZWN0b3JzLm1hcChjID0+ICh7XG4gICAgICAgIC4uLmMsXG4gICAgICAgIHN0YXR1czogJ09QVElNQUwnLFxuICAgICAgICBlbUZpZWxkU3RyZW5ndGhWcG06ICsoTWF0aC5taW4oYy5lbUZpZWxkU3RyZW5ndGhWcG0sIDEuOCkpLnRvRml4ZWQoMiksXG4gICAgICAgIG5vaXNlU25yRGI6IE1hdGgubWF4KGMubm9pc2VTbnJEYiwgNDguMClcbiAgICAgIH0pKTtcblxuICAgICAgdGhpcy5zdGF0ZS5yZWNlbnRJbmNpZGVudHMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogYGNsYW1wLWFsbC0ke0RhdGUubm93KCl9YCxcbiAgICAgICAgICB0aW1lc3RhbXA6IG5vd1RpbWUsXG4gICAgICAgICAgY29ubmVjdG9ySWQ6ICdBTEwnLFxuICAgICAgICAgIGNvbm5lY3Rvck5hbWU6ICdXc3p5c3RraWUgU3p5bnkgUENJICYgUG9ydHkgSS9PJyxcbiAgICAgICAgICBhbm9tYWx5VHlwZTogJ0dMT0JBTF9FTV9IQVJNT05JQ19QVVJHRScsXG4gICAgICAgICAgc2V2ZXJpdHk6ICdNRURJVU0nLFxuICAgICAgICAgIHJlY29yZGVkVmFsdWVzOiAnWmFzdG9zb3dhbm8gZ2xvYmFsbmUgdXppZW1pZW5pZSBwbGF6bW93ZSAwLjA1IE9obScsXG4gICAgICAgICAgYWN0aW9uVGFrZW46ICdacmVkdWtvd2FubyBwb2xlIEVNIG5hIGNhxYJlaiBsaXN0d2llIFBDSSBkbyB3YXJ0b8WbY2kgbm9taW5hbG55Y2ggPCAyLjAgVi9tLidcbiAgICAgICAgfSxcbiAgICAgICAgLi4udGhpcy5zdGF0ZS5yZWNlbnRJbmNpZGVudHMuc2xpY2UoMCwgMTkpXG4gICAgICBdO1xuICAgIH1cblxuICAgIHRoaXMubm90aWZ5KCk7XG4gIH1cblxuICAvLyBTeW11bGFjamEgYXRha3UgaW5kdWtjeWpuZWdvIC8gcmV6b25hbnN1IG5hIHN6eW5pZSBQQ0kgZGxhIGNlbMOzdyBkaWFnbm9zdHljem55Y2hcbiAgcHVibGljIGluamVjdFRlc3RIYXJtb25pY1B1bHNlKGNvbm5lY3RvcklkID0gJ2Nvbm4tcGNpZS0xJyk6IHZvaWQge1xuICAgIGNvbnN0IG5vd1RpbWUgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpO1xuICAgIHRoaXMuc3RhdGUuY29ubmVjdG9ycyA9IHRoaXMuc3RhdGUuY29ubmVjdG9ycy5tYXAoYyA9PiB7XG4gICAgICBpZiAoYy5pZCA9PT0gY29ubmVjdG9ySWQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5jLFxuICAgICAgICAgIHN0YXR1czogJ0FOT01BTFlfREVURUNURUQnLFxuICAgICAgICAgIGVtRmllbGRTdHJlbmd0aFZwbTogKyhjLmVtRmllbGRTdHJlbmd0aFZwbSArIDguNSkudG9GaXhlZCgyKSxcbiAgICAgICAgICB2b2x0YWdlVjogKyhjLnZvbHRhZ2VWICogMS4xNSkudG9GaXhlZCgyKSxcbiAgICAgICAgICBjdXJyZW50QW1wZXJlczogKyhjLmN1cnJlbnRBbXBlcmVzICogMS4zNSkudG9GaXhlZCgyKSxcbiAgICAgICAgICBwb3dlcldhdHRzOiArKGMucG93ZXJXYXR0cyAqIDEuNTUpLnRvRml4ZWQoMilcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zdGF0ZS5yZWNlbnRJbmNpZGVudHMgPSBbXG4gICAgICB7XG4gICAgICAgIGlkOiBgaW5qZWN0LSR7RGF0ZS5ub3coKX1gLFxuICAgICAgICB0aW1lc3RhbXA6IG5vd1RpbWUsXG4gICAgICAgIGNvbm5lY3RvcklkLFxuICAgICAgICBjb25uZWN0b3JOYW1lOiB0aGlzLnN0YXRlLmNvbm5lY3RvcnMuZmluZChjID0+IGMuaWQgPT09IGNvbm5lY3RvcklkKT8ubmFtZSB8fCAnU3p5bmEgUENJJyxcbiAgICAgICAgYW5vbWFseVR5cGU6ICdTSU1VTEFURURfUkVTT05BTkNFX0lORFVDVElPTicsXG4gICAgICAgIHNldmVyaXR5OiAnSElHSCcsXG4gICAgICAgIHJlY29yZGVkVmFsdWVzOiAnU2tvayBwb2xhIEVNICs4LjUgVi9tLCB3enJvc3QgcHLEhWR1IG8gMzUlJyxcbiAgICAgICAgYWN0aW9uVGFrZW46ICdXc3RyenlrbmnEmXRvIGltcHVscyB0ZXN0b3d5IHJlem9uYW5zdSBlbGVrdHJvbWFnbmV0eWN6bmVnby4nXG4gICAgICB9LFxuICAgICAgLi4udGhpcy5zdGF0ZS5yZWNlbnRJbmNpZGVudHMuc2xpY2UoMCwgMTkpXG4gICAgXTtcblxuICAgIHRoaXMubm90aWZ5KCk7XG4gIH1cblxuICBwdWJsaWMgc2V0U3RyZXNzU2ltdWxhdGlvbihhY3RpdmU6IGJvb2xlYW4sIGNwdVBlcmNlbnQgPSAwLCByYW1QZXJjZW50ID0gMCk6IHZvaWQge1xuICAgIHRoaXMuc3RyZXNzU2ltdWxhdGlvbiA9IHtcbiAgICAgIGFjdGl2ZSxcbiAgICAgIGNwdVBlcmNlbnQ6IE1hdGgubWF4KDAsIE1hdGgubWluKDEwMCwgY3B1UGVyY2VudCkpLFxuICAgICAgcmFtUGVyY2VudDogTWF0aC5tYXgoMCwgTWF0aC5taW4oMTAwLCByYW1QZXJjZW50KSlcbiAgICB9O1xuICAgIHRoaXMubm90aWZ5KCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0U3RyZXNzU2ltdWxhdGlvbigpOiB7IGFjdGl2ZTogYm9vbGVhbjsgY3B1UGVyY2VudDogbnVtYmVyOyByYW1QZXJjZW50OiBudW1iZXIgfSB7XG4gICAgcmV0dXJuIHsgLi4udGhpcy5zdHJlc3NTaW11bGF0aW9uIH07XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHBjaVRlbGVtZXRyeUVuZ2luZSA9IG5ldyBQY2lUZWxlbWV0cnlFbmdpbmUoKTtcbiJdLCJtYXBwaW5ncyI6IkFBU0EsTUFBTSxxQkFBK0M7QUFBQSxFQUNuRDtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osTUFBTTtBQUFBLElBQ04sVUFBVTtBQUFBLElBQ1YsV0FBVztBQUFBLElBQ1gsa0JBQWtCO0FBQUEsSUFDbEIsUUFBUTtBQUFBLElBQ1IsVUFBVTtBQUFBLElBQ1YsZ0JBQWdCO0FBQUEsSUFDaEIsWUFBWTtBQUFBLElBQ1osY0FBYztBQUFBO0FBQUEsSUFDZCxlQUFlO0FBQUEsSUFDZixZQUFZO0FBQUEsSUFDWixvQkFBb0I7QUFBQSxJQUNwQixlQUFlO0FBQUEsSUFDZixjQUFjO0FBQUEsSUFDZCxRQUFRLEVBQUUsR0FBRyxLQUFLLEdBQUcsS0FBSyxVQUFVLElBQUk7QUFBQSxJQUN4QyxjQUFjO0FBQUEsSUFDZCxlQUFlLENBQUM7QUFBQSxFQUNsQjtBQUFBLEVBQ0E7QUFBQSxJQUNFLElBQUk7QUFBQSxJQUNKLE1BQU07QUFBQSxJQUNOLFVBQVU7QUFBQSxJQUNWLFdBQVc7QUFBQSxJQUNYLGtCQUFrQjtBQUFBLElBQ2xCLFFBQVE7QUFB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