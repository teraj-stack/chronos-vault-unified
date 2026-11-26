import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const React = __vite__cjsImport1_react.__esModule ? __vite__cjsImport1_react.default : __vite__cjsImport1_react; const useState = __vite__cjsImport1_react["useState"]; const useMemo = __vite__cjsImport1_react["useMemo"]; const useEffect = __vite__cjsImport1_react["useEffect"];
import {
  ShieldCheck,
  ShieldAlert,
  Skull,
  FileCode,
  CheckCircle2,
  Search,
  Download,
  Copy,
  Check,
  ChevronRight,
  Zap,
  PlusCircle,
  X,
  Flame,
  Clock,
  RefreshCw,
  Trash2,
  Crosshair,
  AlertOctagon,
  BarChart3,
  TrendingUp,
  Share2,
  FileJson,
  FileDown
} from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import { INITIAL_NEUTRALIZED_THREATS } from "/sentinel-shield/src/data/neutralizedViruses.ts";
import { safeStorage } from "/sentinel-shield/src/utils/selfRepairSystem.ts";
import { focusTracker } from "/sentinel-shield/src/utils/focusHijackTracker.ts";
import { AttackFrequencyTimeSeriesChart } from "/sentinel-shield/src/components/AttackFrequencyTimeSeriesChart.tsx";
import { Retro100CopiesPurgeModal } from "/sentinel-shield/src/components/Retro100CopiesPurgeModal.tsx";
import { LiveThreatPulseSidebar } from "/sentinel-shield/src/components/LiveThreatPulseSidebar.tsx";
import { ThreatDatabaseExportModal } from "/sentinel-shield/src/components/ThreatDatabaseExportModal.tsx";
import { ForensicsPdfExportModal } from "/sentinel-shield/src/components/ForensicsPdfExportModal.tsx";
import { downloadThreatDatabaseJson } from "/sentinel-shield/src/utils/threatDatabaseExporter.ts";
import { downloadNeutralizedThreatsPdf } from "/sentinel-shield/src/utils/forensicsPdfExporter.ts";
import { downloadCompleteImmunizationBundle } from "/sentinel-shield/src/utils/systemImmunizationEngine.ts";
export const NeutralizedThreatsLedger = () => {
  const [activeTab, setActiveTab] = useState("ATTACK_FREQUENCY_CHART");
  const [isRetro100ModalOpen, setIsRetro100ModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isQuickPdfLoading, setIsQuickPdfLoading] = useState(false);
  const [threats, setThreats] = useState(() => {
    const custom = safeStorage.get("sentinel_custom_threats", []);
    return [...INITIAL_NEUTRALIZED_THREATS, ...custom];
  });
  const [focusLogs, setFocusLogs] = useState(() => focusTracker.getLogs());
  const [focusSearch, setFocusSearch] = useState("");
  const [focusFilterLevel, setFocusFilterLevel] = useState("ALL");
  const [selectedLogId, setSelectedLogId] = useState(null);
  const handleSelectBreachFromPulse = (log) => {
    setActiveTab("FOCUS_HIJACK_LOGS");
    setSelectedLogId(log.id);
  };
  useEffect(() => {
    const unsubscribe = focusTracker.subscribe((logs) => {
      setFocusLogs(logs);
    });
    return () => unsubscribe();
  }, []);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedSeverity, setSelectedSeverity] = useState("ALL");
  const [selectedOS, setSelectedOS] = useState("ALL");
  const [activeThreatId, setActiveThreatId] = useState(threats[0]?.id || "threat-flutter-locker");
  const [simulatingThreatId, setSimulatingThreatId] = useState(null);
  const [simulationCurrentStep, setSimulationCurrentStep] = useState(0);
  const [simulationLogs, setSimulationLogs] = useState([]);
  const [copiedCodeId, setCopiedCodeId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newThreatName, setNewThreatName] = useState("");
  const [newThreatCategory, setNewThreatCategory] = useState("Screen Locker");
  const [newThreatSeverity, setNewThreatSeverity] = useState("CRITICAL");
  const [newThreatDesc, setNewThreatDesc] = useState("");
  const [newThreatAggression, setNewThreatAggression] = useState("");
  const [newThreatVector, setNewThreatVector] = useState("");
  const [newThreatNeutralization, setNewThreatNeutralization] = useState("");
  const activeThreat = useMemo(() => {
    return threats.find((t) => t.id === activeThreatId) || threats[0];
  }, [threats, activeThreatId]);
  const filteredThreats = useMemo(() => {
    return threats.filter((t) => {
      const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.description.toLowerCase().includes(searchQuery.toLowerCase()) || t.aggressionMechanism.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.infectionVector.channel.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = selectedCategory === "ALL" || t.category === selectedCategory;
      const matchesSev = selectedSeverity === "ALL" || t.severity === selectedSeverity;
      const matchesOS = selectedOS === "ALL" || t.targetOS.includes(selectedOS);
      return matchesSearch && matchesCat && matchesSev && matchesOS;
    });
  }, [threats, searchQuery, selectedCategory, selectedSeverity, selectedOS]);
  const filteredFocusLogs = useMemo(() => {
    return focusLogs.filter((log) => {
      const matchesText = log.processName.toLowerCase().includes(focusSearch.toLowerCase()) || log.windowTitle.toLowerCase().includes(focusSearch.toLowerCase()) || log.abusedApi.toLowerCase().includes(focusSearch.toLowerCase()) || log.sourceVector.toLowerCase().includes(focusSearch.toLowerCase()) || log.details.toLowerCase().includes(focusSearch.toLowerCase());
      const matchesLevel = focusFilterLevel === "ALL" || log.aggressionLevel === focusFilterLevel;
      return matchesText && matchesLevel;
    });
  }, [focusLogs, focusSearch, focusFilterLevel]);
  const focusStats = useMemo(() => {
    const totalAttempts = focusLogs.reduce((acc, l) => acc + l.repeatCount, 0);
    const uniqueProcesses = new Set(focusLogs.map((l) => l.processName)).size;
    const topAttacker = [...focusLogs].sort((a, b) => b.repeatCount - a.repeatCount)[0];
    const criticalCount = focusLogs.filter((l) => l.aggressionLevel === "CRITICAL").length;
    return {
      totalAttempts,
      uniqueProcesses,
      topAttacker,
      criticalCount
    };
  }, [focusLogs]);
  const handleSimulateFocusAttack = () => {
    const rogues = [
      { name: "flutter_trap_overlay.exe", pid: 8940, title: "FLUTTER_SURFACE_LOCKER_TOPMOST", api: "SetForegroundWindow(HWND)", sev: "CRITICAL", vec: "HWND_TOPMOST Direct Injection", details: "Próba zablokowania pulpitu i wywłaszczenia okna roboczego." },
      { name: "gnida_stealth_spammer.exe", pid: 7312, title: "Critical Security Alert Dialog", api: "AttachThreadInput + SetFocus", sev: "HIGH", vec: "Thread Queue Hook", details: "Wymuszanie okna dialogowego na wierzchu eksploratora." },
      { name: "rogue_miner_watchdog.exe", pid: 5120, title: "Host Process Service Helper", api: "SwitchToThisWindow", sev: "HIGH", vec: "DWM Z-Order Forcing", details: "Próba ukrycia okna roboczego pod fałszywym procesem tła." },
      { name: "adware_popup_cascade.exe", pid: 4890, title: "Special Crypto Bonus Modal", api: "SetWindowPos(HWND_TOPMOST)", sev: "CRITICAL", vec: "Modal Cascade Loop", details: "Wstrzyknięcie pętli 60Hz SetWindowPos." }
    ];
    const picked = rogues[Math.floor(Math.random() * rogues.length)];
    focusTracker.recordAttempt(
      picked.name,
      picked.pid,
      picked.title,
      picked.api,
      picked.sev,
      picked.vec,
      picked.details
    );
  };
  const handleCopyCode = (id, code) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2e3);
  };
  const handleStartLiveSlaughter = (threat) => {
    setSimulatingThreatId(threat.id);
    setSimulationCurrentStep(0);
    setSimulationLogs([
      `[SENTINEL CORE] Inicjalizacja procedury uboju dla: ${threat.name}`,
      `[FORENSICS] Suma kontrolna SHA256: ${threat.sha256Hash.substring(0, 24)}...`,
      `[WATCHDOG] Entropia binarna celu: ${threat.entropy} (Pakowanie wykryte)`
    ]);
    const steps = threat.neutralizationDetails.executionSteps;
    let stepIdx = 0;
    const interval = setInterval(() => {
      if (stepIdx < steps.length) {
        const curr = steps[stepIdx];
        setSimulationCurrentStep(curr.step);
        setSimulationLogs((prev) => [
          ...prev,
          `[KROK ${curr.step}/${steps.length}] ${curr.action}`,
          `    -> Wywołanie API: ${curr.targetApi}`,
          `    -> Status: ${curr.result}`
        ]);
        stepIdx++;
      } else {
        clearInterval(interval);
        setSimulationLogs((prev) => [
          ...prev,
          `[PURGE COMPLETE] Zagrożenie ${threat.name} zostało w 100% zlikwidowane i zaryglowane w pamięci RAM.`,
          `[QUARANTINE PROOF] ${threat.neutralizationDetails.quarantineProof}`
        ]);
        setTimeout(() => {
          setSimulatingThreatId(null);
        }, 5e3);
      }
    }, 900);
  };
  const handleSaveCustomIncident = (e) => {
    e.preventDefault();
    if (!newThreatName.trim()) return;
    const newEntry = {
      id: "custom-" + Date.now(),
      name: newThreatName,
      category: newThreatCategory,
      severity: newThreatSeverity,
      status: "ZNISZCZONY (100% PURGED)",
      firstSpotted: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      neutralizedAt: (/* @__PURE__ */ new Date()).toUTCString(),
      targetOS: ["windows"],
      sha256Hash: Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(""),
      entropy: 7.82,
      description: newThreatDesc || "Zgłoszony incydent złośliwego oprogramowania blokującego pulpit.",
      aggressionMechanism: {
        title: "Przechwycenie Zasobów i Blokada GUI",
        summary: newThreatAggression || "Nadużycie uchwytów okienkowych i priorytetów jądra.",
        technicalDetails: [
          "Zarejestrowano wywłaszczające pętle komunikatów.",
          "Wymuszenie stałego utrzymywania wierzchu (Always on Top)."
        ],
        apisAbused: ["SetWindowPos", "SetForegroundWindow"]
      },
      infectionVector: {
        channel: "Pobrany plik / Podatność aplikacji",
        method: newThreatVector || "Skompromitowany instalator lub fałszywy moduł.",
        payloadType: "Standalone Executable",
        exploitChain: [
          "1. Uruchomienie złośliwego pliku.",
          "2. Wywołanie blokady okienkowej.",
          "3. Neutralizacja przez Sentinel Shield."
        ]
      },
      neutralizationDetails: {
        methodName: "Dynamiczna Dekapitacja Procesowa",
        slaughterMechanism: newThreatNeutralization || "NtSuspendProcess -> SIGKILL -> ACL Lockout",
        executionSteps: [
          {
            step: 1,
            action: "Wstrzymanie wątków w RAM",
            targetApi: "NtSuspendProcess",
            result: "Wątki unieruchomione",
            timestamp: "00:00.002"
          },
          {
            step: 2,
            action: "Ubój procesu",
            targetApi: "TerminateProcess",
            result: "Proces zlikwidowany",
            timestamp: "00:00.006"
          }
        ],
        quarantineProof: "Status: Zlikwidowany | Wpis dodany do rejestru",
        pythonKillSnippet: `import psutil, os

def purge_custom_threat():
    for p in psutil.process_iter(['pid', 'name']):
        if "${newThreatName.toLowerCase()}" in (p.info['name'] or '').lower():
            p.kill()
`
      }
    };
    const currentCustom = safeStorage.get("sentinel_custom_threats", []);
    const updatedCustom = [newEntry, ...currentCustom];
    safeStorage.set("sentinel_custom_threats", updatedCustom);
    setThreats([...INITIAL_NEUTRALIZED_THREATS, ...updatedCustom]);
    setActiveThreatId(newEntry.id);
    setIsAddModalOpen(false);
    setNewThreatName("");
    setNewThreatDesc("");
    setNewThreatAggression("");
    setNewThreatVector("");
    setNewThreatNeutralization("");
  };
  const handleExportForensicReport = () => {
    const reportText = `================================================================================
SENTINEL FORENSIC DOSSIER - RAPORT ZNISZCZONYCH ZAGROŻEŃ & UBOJU MALWARE
Data wygenerowania: ${(/* @__PURE__ */ new Date()).toUTCString()}
Liczba zneutralizowanych incydentów: ${threats.length}
Zarejestrowane próby przechwycenia fokusu: ${focusLogs.reduce((a2, b) => a2 + b.repeatCount, 0)} zdarzeń
Bariery Ochronne: AKTYWNE (NtSuspendProcess + PE Header Sabotage + ACL Deny)
================================================================================

[CZĘŚĆ I: HISTORIA PRZECHWYTYWANIA FOKUSU OKNA (FOCUS HIJACK ATTEMPTS)]
${focusLogs.map((fl, idx) => `
#${idx + 1} [${fl.timestamp}] Proces: ${fl.processName} (PID: ${fl.pid})
- Tytuł Okna: ${fl.windowTitle}
- Nadużywane API: ${fl.abusedApi}
- Poziom Agresji: ${fl.aggressionLevel} | Wektor: ${fl.sourceVector}
- Liczba powtórzeń ataku (Recurrence): ${fl.repeatCount}x
- Szczegóły blokady: ${fl.details}
--------------------------------------------------------------------------------`).join("\n")}

[CZĘŚĆ II: KARTOTEKA ZNISZCZONYCH WIRUSÓW]
${threats.map((t, i) => `
[INCIDENT #${i + 1}] ${t.name} (${t.category})
- Status Uboju: ${t.status}
- Poziom Zagrożenia: ${t.severity}
- SHA256: ${t.sha256Hash}
- Entropia: ${t.entropy} / 8.00
- Data neutralizacji: ${t.neutralizedAt}
- Systemy docelowe: ${t.targetOS.join(", ")}

1. OPIS ZAGROŻENIA:
   ${t.description}

2. MECHANIZM AGRESJI (JAK ATAKOWAŁ):
   Tytuł: ${t.aggressionMechanism.title}
   Podsumowanie: ${t.aggressionMechanism.summary}
   Nadużywane API: ${t.aggressionMechanism.apisAbused.join(", ")}
   Szczegóły techniczne:
${t.aggressionMechanism.technicalDetails.map((d) => `     * ${d}`).join("\n")}

3. SPOSÓB WNIKNIĘCIA DO KOMPUTERA (WEKTOR INFEKCJI):
   Kanał: ${t.infectionVector.channel}
   Metoda: ${t.infectionVector.method}
   Typ Payloadu: ${t.infectionVector.payloadType}
   CVE: ${t.infectionVector.vulnerabilityCve || "Brak"}
   Łańcuch infekcji:
${t.infectionVector.exploitChain.map((c) => `     ${c}`).join("\n")}

4. METODA UBOJU I NEUTRALIZACJI:
   Metoda: ${t.neutralizationDetails.methodName}
   Mechanizm: ${t.neutralizationDetails.slaughterMechanism}
   Dowód kwarantanny: ${t.neutralizationDetails.quarantineProof}
   Sekwencja egzekucji:
${t.neutralizationDetails.executionSteps.map((s) => `     Krok ${s.step} [${s.timestamp}]: ${s.action} -> ${s.result}`).join("\n")}

--------------------------------------------------------------------------------
`).join("\n")}
`;
    const blob = new Blob([reportText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sentinel_forensic_dossier_with_focus_logs_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6 font-sans", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-purple-950/70 to-slate-900 border border-purple-800/40 shadow-xl relative overflow-hidden", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 right-0 p-8 opacity-10 pointer-events-none", children: /* @__PURE__ */ jsxDEV(Skull, { className: "w-48 h-48 text-purple-400" }, void 0, false, {
        fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
        lineNumber: 338,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
        lineNumber: 337,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2.5", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "p-2 rounded-xl bg-purple-600/20 border border-purple-500/40 text-purple-300", children: /* @__PURE__ */ jsxDEV(Skull, { className: "w-5 h-5" }, void 0, false, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 345,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 344,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("h2", { className: "text-xl sm:text-2xl font-black text-white tracking-tight", children: "Kartoteka Zniszczonych Wirusów & Rejestr Uboju" }, void 0, false, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 347,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800/60 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 351,
                columnNumber: 17
              }, this),
              threats.length,
              " Zlikwidowanych Zagrożeń"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 350,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 343,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl", children: [
            "Szczegółowa baza danych zneutralizowanego malware'u, nakładek ekranowych (Flutter/Win32) i trojanów. Zawiera rejestr ",
            /* @__PURE__ */ jsxDEV("strong", { children: "historii przechwytywania fokusu okna" }, void 0, false, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 356,
              columnNumber: 132
            }, this),
            " (localStorage) ze śledzeniem powtarzalności ataków."
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 355,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
          lineNumber: 342,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setIsRetro100ModalOpen(true),
              className: "px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-700 via-rose-700 to-purple-800 hover:from-red-600 hover:to-purple-700 text-white text-xs font-black font-mono flex items-center gap-1.5 shadow-md shadow-red-950/80 border border-red-400/60 transition-all cursor-pointer animate-pulse",
              title: "Rozkaz: Zabij i trwale unieszkodliw do 100 kopii wstecz każde malware, które miało kiedykolwiek kontakt z tą aplikacją",
              children: [
                /* @__PURE__ */ jsxDEV(Flame, { className: "w-3.5 h-3.5 text-yellow-300 fill-yellow-300" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 366,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "⚡ UBÓJ 100 KOPII WSTECZ (0 MS)" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 367,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 361,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setIsPdfModalOpen(true),
              className: "px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-600 via-purple-700 to-indigo-700 hover:from-red-500 hover:to-indigo-600 text-white font-black font-mono text-xs flex items-center gap-1.5 shadow-lg shadow-purple-950/80 border border-purple-400/60 transition-all cursor-pointer animate-pulse",
              title: "Eksportuj sformatowany, ostemplowany czasowo raport PDF do celów audytu bezpieczeństwa i logowania incydentów (ISO/IEC 27037 & RFC 3161)",
              children: [
                /* @__PURE__ */ jsxDEV(FileDown, { className: "w-3.5 h-3.5 text-yellow-300" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 375,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "📄 RAPORT PDF (FORENSICS)" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 376,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 370,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => downloadCompleteImmunizationBundle(threats),
              className: "px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-black font-mono text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-950/80 border border-emerald-400/60 transition-all cursor-pointer",
              title: "Pobierz kompletny pakiet immunizacji (Windows GPO / Firewall / IFEO Registry) blokujący ponowną infekcję",
              children: [
                /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-3.5 h-3.5 text-emerald-300" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 384,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "💉 PAKIET IMMUNIZACJI (.ZIP)" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 385,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 379,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setIsExportModalOpen(true),
              className: "px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-black font-black font-mono text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-950/80 border border-cyan-400 transition-all cursor-pointer",
              title: "Eksportuj lub importuj bazę sygnatur i zneutralizowanych zagrożeń w formacie JSON dla innych jednostek Sentinel",
              children: [
                /* @__PURE__ */ jsxDEV(Share2, { className: "w-3.5 h-3.5 text-black" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 393,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "📁 WSPÓŁDZIELENIE BAZY JSON" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 394,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 388,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => downloadThreatDatabaseJson(threats, focusLogs, "FULL_THREAT_LEDGER"),
              className: "px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 text-xs font-bold font-mono flex items-center gap-1.5 transition-all cursor-pointer",
              title: "Szybki pobór pełnej bazy w JSON",
              children: [
                /* @__PURE__ */ jsxDEV(FileJson, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 402,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Pobierz .json" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 403,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 397,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setIsAddModalOpen(true),
              className: "px-3.5 py-2 rounded-xl bg-purple-700 hover:bg-purple-600 text-white text-xs font-bold font-mono flex items-center gap-1.5 shadow-md shadow-purple-900/40 border border-purple-400/30 transition-all cursor-pointer",
              children: [
                /* @__PURE__ */ jsxDEV(PlusCircle, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 410,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Dodaj Własny Incydent" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 411,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 406,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleExportForensicReport,
              className: "px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-bold font-mono flex items-center gap-1.5 transition-all cursor-pointer",
              title: "Pobierz surowy zrzut tekstowy",
              children: [
                /* @__PURE__ */ jsxDEV(Download, { className: "w-3.5 h-3.5 text-purple-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 419,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Zrzut (.txt)" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 420,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 414,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
          lineNumber: 360,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
        lineNumber: 341,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2.5 mt-5 pt-4 border-t border-slate-800/80 flex-wrap", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab("ATTACK_FREQUENCY_CHART"),
            className: `px-4 py-2 rounded-xl text-xs sm:text-sm font-bold font-mono flex items-center gap-2 transition-all cursor-pointer relative ${activeTab === "ATTACK_FREQUENCY_CHART" ? "bg-cyan-600 text-white shadow-lg shadow-cyan-950/60 border border-cyan-400/50" : "bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"}`,
            children: [
              /* @__PURE__ */ jsxDEV(TrendingUp, { className: `w-4 h-4 ${activeTab === "ATTACK_FREQUENCY_CHART" ? "text-white" : "text-cyan-400"}` }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 435,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "WYKRES CZĘSTOTLIWOŚCI ATAKÓW W CZASIE (RECHARTS)" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 436,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700 text-[10px] font-mono font-bold animate-pulse", children: "LIVE" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 437,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 427,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab("VIRUS_DOSSIER"),
            className: `px-4 py-2 rounded-xl text-xs sm:text-sm font-bold font-mono flex items-center gap-2 transition-all cursor-pointer ${activeTab === "VIRUS_DOSSIER" ? "bg-purple-600 text-white shadow-lg shadow-purple-900/50 border border-purple-400/40" : "bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"}`,
            children: [
              /* @__PURE__ */ jsxDEV(Skull, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 450,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: [
                "KARTOTEKA WIRUSÓW (",
                threats.length,
                ")"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 451,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 442,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab("FOCUS_HIJACK_LOGS"),
            className: `px-4 py-2 rounded-xl text-xs sm:text-sm font-bold font-mono flex items-center gap-2 transition-all cursor-pointer relative ${activeTab === "FOCUS_HIJACK_LOGS" ? "bg-red-700 text-white shadow-lg shadow-red-950/60 border border-red-400/40" : "bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"}`,
            children: [
              /* @__PURE__ */ jsxDEV(Crosshair, { className: "w-4 h-4 text-red-400" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 462,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "HISTORIA PRZECHWYTYWANIA FOKUSU OKNA" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 463,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded-full bg-red-950 text-red-300 border border-red-800 text-[10px] font-mono font-bold", children: [
                focusStats.totalAttempts,
                " ataków"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 464,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 454,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
        lineNumber: 426,
        columnNumber: 9
      }, this),
      activeTab === "VIRUS_DOSSIER" && /* @__PURE__ */ jsxDEV("div", { className: "mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-slate-800/40", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "relative", children: [
          /* @__PURE__ */ jsxDEV(Search, { className: "w-4 h-4 text-slate-400 absolute left-3 top-2.5" }, void 0, false, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 474,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "text",
              placeholder: "Szukaj wirusa, mechanizmu agresji...",
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value),
              className: "w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 475,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
          lineNumber: 473,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: /* @__PURE__ */ jsxDEV(
          "select",
          {
            value: selectedCategory,
            onChange: (e) => setSelectedCategory(e.target.value),
            "aria-label": "Filtruj według kategorii",
            className: "w-full px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-purple-500",
            children: [
              /* @__PURE__ */ jsxDEV("option", { value: "ALL", children: "Wszystkie Kategorie" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 491,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "Screen Locker", children: "Screen Locker (Nakładki Ekranowe)" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 492,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "Trojan Overlay", children: "Trojan Overlay (Szpiegowskie Nakładki)" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 493,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "Ransomware", children: "Ransomware (Okup & Szyfrowanie)" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 494,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "Process Wiper", children: "Process Wiper (Destrukcja Dysku)" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 495,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "Stealth Miner", children: "Stealth Miner (Ukryta Koparka)" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 496,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "Rootkit Hook", children: "Rootkit Hook (Bezplikowe)" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 497,
                columnNumber: 17
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 485,
            columnNumber: 15
          },
          this
        ) }, void 0, false, {
          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
          lineNumber: 484,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: /* @__PURE__ */ jsxDEV(
          "select",
          {
            value: selectedSeverity,
            onChange: (e) => setSelectedSeverity(e.target.value),
            "aria-label": "Filtruj według poziomu zagrożenia",
            className: "w-full px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-purple-500",
            children: [
              /* @__PURE__ */ jsxDEV("option", { value: "ALL", children: "Wszystkie Poziomy Ryzyka" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 508,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "EXTREME", children: "EXTREME (Krytyczne Zniszczenie)" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 509,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "CRITICAL", children: "CRITICAL (Blokada Systemu)" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 510,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "HIGH", children: "HIGH (Wysokie Zagrożenie)" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 511,
                columnNumber: 17
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 502,
            columnNumber: 15
          },
          this
        ) }, void 0, false, {
          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
          lineNumber: 501,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: /* @__PURE__ */ jsxDEV(
          "select",
          {
            value: selectedOS,
            onChange: (e) => setSelectedOS(e.target.value),
            "aria-label": "Filtruj według systemu operacyjnego",
            className: "w-full px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-purple-500",
            children: [
              /* @__PURE__ */ jsxDEV("option", { value: "ALL", children: "Wszystkie Systemy (Win/Linux/Mac)" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 522,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "windows", children: "Windows (Win32 / Ctypes / NTDLL)" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 523,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "linux", children: "Linux (X11 / Wayland / SIGKILL)" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 524,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "macos", children: "macOS (Quartz / CoreGraphics)" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 525,
                columnNumber: 17
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 516,
            columnNumber: 15
          },
          this
        ) }, void 0, false, {
          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
          lineNumber: 515,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
        lineNumber: 472,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
      lineNumber: 336,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col xl:flex-row gap-6 items-start", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex-1 w-full min-w-0", children: [
        activeTab === "ATTACK_FREQUENCY_CHART" && /* @__PURE__ */ jsxDEV(
          AttackFrequencyTimeSeriesChart,
          {
            focusLogs,
            threats,
            onSimulateAttack: handleSimulateFocusAttack
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 540,
            columnNumber: 13
          },
          this
        ),
        activeTab === "VIRUS_DOSSIER" && /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-4 space-y-3", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-xs font-mono text-slate-400 px-1", children: [
              /* @__PURE__ */ jsxDEV("span", { children: [
                "Zidentyfikowane Zagrożenia (",
                filteredThreats.length,
                ")"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 555,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Status: 100% Zlikwidowane" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 556,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 554,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-2.5 max-h-[700px] overflow-y-auto pr-1", children: [
              filteredThreats.map((threat) => {
                const isSelected = threat.id === activeThreatId;
                const severityColor = {
                  EXTREME: "text-red-400 bg-red-950/60 border-red-800/80",
                  CRITICAL: "text-orange-400 bg-orange-950/60 border-orange-800/80",
                  HIGH: "text-amber-400 bg-amber-950/60 border-amber-800/80",
                  MEDIUM: "text-blue-400 bg-blue-950/60 border-blue-800/80"
                }[threat.severity];
                return /* @__PURE__ */ jsxDEV(
                  "div",
                  {
                    onClick: () => setActiveThreatId(threat.id),
                    className: `p-3.5 rounded-xl border transition-all cursor-pointer ${isSelected ? "bg-purple-950/60 border-purple-500/80 shadow-lg shadow-purple-950/50" : "bg-slate-900/80 border-slate-800 hover:bg-slate-800/60 hover:border-slate-700"}`,
                    children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "flex items-start justify-between gap-2", children: [
                        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
                          /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-red-500 animate-pulse" }, void 0, false, {
                            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                            lineNumber: 581,
                            columnNumber: 25
                          }, this),
                          /* @__PURE__ */ jsxDEV("h4", { className: "font-bold text-xs sm:text-sm text-white truncate max-w-[200px]", children: threat.name }, void 0, false, {
                            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                            lineNumber: 582,
                            columnNumber: 25
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                          lineNumber: 580,
                          columnNumber: 23
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: `text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${severityColor}`, children: threat.severity }, void 0, false, {
                          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                          lineNumber: 586,
                          columnNumber: 23
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                        lineNumber: 579,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 mt-2 text-[11px] text-slate-400", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "px-1.5 py-0.5 bg-slate-950 rounded text-purple-300 font-mono text-[10px]", children: threat.category }, void 0, false, {
                          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                          lineNumber: 592,
                          columnNumber: 23
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { children: "•" }, void 0, false, {
                          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                          lineNumber: 595,
                          columnNumber: 23
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 font-mono text-[10px]", children: [
                          "SHA: ",
                          threat.sha256Hash.substring(0, 8),
                          "..."
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                          lineNumber: 596,
                          columnNumber: 23
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                        lineNumber: 591,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed", children: threat.description }, void 0, false, {
                        fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                        lineNumber: 601,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-emerald-400", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1", children: [
                          /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-3 h-3" }, void 0, false, {
                            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                            lineNumber: 607,
                            columnNumber: 25
                          }, this),
                          threat.status
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                          lineNumber: 606,
                          columnNumber: 23
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 flex items-center gap-0.5", children: [
                          "Badaj ",
                          /* @__PURE__ */ jsxDEV(ChevronRight, { className: "w-3 h-3" }, void 0, false, {
                            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                            lineNumber: 611,
                            columnNumber: 31
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                          lineNumber: 610,
                          columnNumber: 23
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                        lineNumber: 605,
                        columnNumber: 21
                      }, this)
                    ]
                  },
                  threat.id,
                  true,
                  {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 570,
                    columnNumber: 19
                  },
                  this
                );
              }),
              filteredThreats.length === 0 && /* @__PURE__ */ jsxDEV("div", { className: "p-8 text-center bg-slate-900/60 rounded-xl border border-slate-800 text-slate-400 text-xs", children: "Nie znaleziono zagrożeń spełniających podane kryteria wyszukiwania." }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 619,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 559,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 553,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-8 space-y-6", children: activeThreat && /* @__PURE__ */ jsxDEV("div", { className: "p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800", children: [
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800/80 font-bold", children: activeThreat.category.toUpperCase() }, void 0, false, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 634,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800/60", children: [
                    "OS: ",
                    activeThreat.targetOS.join(" / ").toUpperCase()
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 637,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800", children: [
                    "ENTROPIA: ",
                    activeThreat.entropy
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 640,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 633,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("h3", { className: "text-xl sm:text-2xl font-black text-white mt-2", children: activeThreat.name }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 645,
                  columnNumber: 21
                }, this),
                activeThreat.alias && /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-purple-400 font-mono mt-0.5", children: [
                  "Alias: ",
                  activeThreat.alias
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 649,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 632,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => {
                      downloadNeutralizedThreatsPdf(threats, focusLogs, {
                        reportTitle: `SENTINEL FORENSIC DOSSIER: ${activeThreat.name.toUpperCase()}`,
                        selectedThreatIds: [activeThreat.id]
                      });
                    },
                    className: "px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-purple-500/40 text-purple-200 text-xs sm:text-sm font-bold font-mono flex items-center gap-1.5 shadow-md shadow-black/50 transition-all cursor-pointer",
                    title: "Wygeneruj i pobierz ostemplowany czasowo raport PDF dedykowany dla tego konkretnego zagrożenia",
                    children: [
                      /* @__PURE__ */ jsxDEV(FileDown, { className: "w-3.5 h-3.5 text-purple-400" }, void 0, false, {
                        fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                        lineNumber: 667,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { children: "Dossier PDF" }, void 0, false, {
                        fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                        lineNumber: 668,
                        columnNumber: 23
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 657,
                    columnNumber: 21
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => handleStartLiveSlaughter(activeThreat),
                    disabled: simulatingThreatId === activeThreat.id,
                    className: "px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white text-xs sm:text-sm font-bold font-mono flex items-center gap-2 shadow-lg shadow-red-950/60 border border-red-400/40 transition-all cursor-pointer",
                    children: [
                      /* @__PURE__ */ jsxDEV(Flame, { className: `w-4 h-4 ${simulatingThreatId === activeThreat.id ? "animate-bounce text-yellow-300" : ""}` }, void 0, false, {
                        fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                        lineNumber: 676,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { children: simulatingThreatId === activeThreat.id ? "Trwa Ubój na Żywo..." : "Symuluj Ubój na Żywo" }, void 0, false, {
                        fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                        lineNumber: 677,
                        columnNumber: 23
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 671,
                    columnNumber: 21
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 656,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 631,
              columnNumber: 17
            }, this),
            simulatingThreatId === activeThreat.id && /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-black border-2 border-red-500/80 shadow-2xl font-mono text-xs text-slate-200 space-y-2", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-2 border-b border-red-900/60 text-red-400 font-bold", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxDEV(Skull, { className: "w-4 h-4 animate-spin text-red-500" }, void 0, false, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 689,
                    columnNumber: 25
                  }, this),
                  "AUTONOMICZNY PROTOKÓŁ UBOJU W TOKU (LIVE SENTINEL EXECUTION)"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 688,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] bg-red-950 px-2 py-0.5 rounded border border-red-800", children: [
                  "Krok: ",
                  simulationCurrentStep
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 692,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 687,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5 max-h-48 overflow-y-auto pt-1 text-slate-300", children: simulationLogs.map((log, idx) => /* @__PURE__ */ jsxDEV("div", { className: log.includes("[KROK") ? "text-yellow-400 font-bold" : log.includes("[PURGE") ? "text-emerald-400 font-bold" : "text-slate-400", children: log }, idx, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 699,
                columnNumber: 25
              }, this)) }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 697,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 686,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-xs sm:text-sm text-slate-300 leading-relaxed", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-purple-400 font-bold block mb-1 font-mono text-xs", children: "[PROFIL WYWIADOWCZY / FORENSIC OVERVIEW]:" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 709,
                columnNumber: 19
              }, this),
              activeThreat.description
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 708,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-red-950/20 border border-red-800/40 space-y-3", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 text-red-400 font-bold text-xs sm:text-sm", children: [
                  /* @__PURE__ */ jsxDEV(ShieldAlert, { className: "w-4 h-4" }, void 0, false, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 720,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "MECHANIZM AGRESJI (JAK ATAKUJE)" }, void 0, false, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 721,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 719,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-semibold text-white font-mono", children: activeThreat.aggressionMechanism.title }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 724,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-300 leading-relaxed", children: activeThreat.aggressionMechanism.summary }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 728,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5 pt-1", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] font-mono text-red-300 font-bold block", children: "Kluczowe Działania Niszczące:" }, void 0, false, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 733,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("ul", { className: "space-y-1 text-xs text-slate-300", children: activeThreat.aggressionMechanism.technicalDetails.map((detail, idx) => /* @__PURE__ */ jsxDEV("li", { className: "flex items-start gap-1.5", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-red-400 font-mono font-bold", children: "•" }, void 0, false, {
                      fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                      lineNumber: 739,
                      columnNumber: 29
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: detail }, void 0, false, {
                      fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                      lineNumber: 740,
                      columnNumber: 29
                    }, this)
                  ] }, idx, true, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 738,
                    columnNumber: 27
                  }, this)) }, void 0, false, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 736,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 732,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "pt-2", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono text-slate-400 block mb-1", children: "Nadużywane Funkcje API:" }, void 0, false, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 747,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap gap-1", children: activeThreat.aggressionMechanism.apisAbused.map((api, idx) => /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-900", children: api }, idx, false, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 752,
                    columnNumber: 27
                  }, this)) }, void 0, false, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 750,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 746,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 718,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-purple-950/20 border border-purple-800/40 space-y-3", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 text-purple-400 font-bold text-xs sm:text-sm", children: [
                  /* @__PURE__ */ jsxDEV(Zap, { className: "w-4 h-4" }, void 0, false, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 763,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "SPOSÓB WNIKNIĘCIA DO KOMPUTERA" }, void 0, false, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 764,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 762,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-semibold text-white font-mono", children: [
                  "Kanał: ",
                  activeThreat.infectionVector.channel
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 767,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-300 leading-relaxed", children: [
                  /* @__PURE__ */ jsxDEV("strong", { children: "Metoda:" }, void 0, false, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 772,
                    columnNumber: 23
                  }, this),
                  " ",
                  activeThreat.infectionVector.method
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 771,
                  columnNumber: 21
                }, this),
                activeThreat.infectionVector.vulnerabilityCve && /* @__PURE__ */ jsxDEV("div", { className: "text-xs text-amber-300 font-mono bg-amber-950/40 p-2 rounded-lg border border-amber-800/60", children: [
                  /* @__PURE__ */ jsxDEV("strong", { children: "Podatność CVE:" }, void 0, false, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 777,
                    columnNumber: 25
                  }, this),
                  " ",
                  activeThreat.infectionVector.vulnerabilityCve
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 776,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5 pt-1", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] font-mono text-purple-300 font-bold block", children: "Łańcuch Wniknięcia (Exploit Chain):" }, void 0, false, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 782,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 text-xs text-slate-300", children: activeThreat.infectionVector.exploitChain.map((step, idx) => /* @__PURE__ */ jsxDEV("div", { className: "p-1.5 bg-slate-950/60 rounded border border-purple-900/40 font-mono text-[11px]", children: step }, idx, false, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 787,
                    columnNumber: 27
                  }, this)) }, void 0, false, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 785,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 781,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 761,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 716,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "p-5 rounded-xl bg-slate-950 border border-emerald-900/40 space-y-4", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 text-emerald-400 font-bold text-xs sm:text-sm", children: [
                  /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-4 h-4" }, void 0, false, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 800,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "PROCEDURA UBOJU & NEUTRALIZACJI (SLAUGHTER CHAIN)" }, void 0, false, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 801,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 799,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold", children: activeThreat.status }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 803,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 798,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-xs text-slate-300", children: [
                /* @__PURE__ */ jsxDEV("strong", { className: "text-emerald-300 font-mono", children: [
                  activeThreat.neutralizationDetails.methodName,
                  ":"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 809,
                  columnNumber: 21
                }, this),
                " ",
                activeThreat.neutralizationDetails.slaughterMechanism
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 808,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] font-mono text-slate-400 font-bold block", children: "Forensic Execution Steps:" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 814,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5 font-mono text-xs", children: activeThreat.neutralizationDetails.executionSteps.map((step) => /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 bg-slate-900/90 rounded-lg border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "w-5 h-5 rounded-full bg-emerald-900/80 text-emerald-300 flex items-center justify-center font-bold text-[10px]", children: step.step }, void 0, false, {
                      fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                      lineNumber: 821,
                      columnNumber: 29
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-200", children: step.action }, void 0, false, {
                      fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                      lineNumber: 824,
                      columnNumber: 29
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 820,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "text-right sm:text-right", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-semibold", children: step.result }, void 0, false, {
                      fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                      lineNumber: 827,
                      columnNumber: 29
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500 ml-2", children: [
                      "(",
                      step.timestamp,
                      ")"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                      lineNumber: 828,
                      columnNumber: 29
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 826,
                    columnNumber: 27
                  }, this)
                ] }, step.step, true, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 819,
                  columnNumber: 25
                }, this)) }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 817,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 813,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "pt-2 space-y-2", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono text-purple-300 font-bold flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxDEV(FileCode, { className: "w-3.5 h-3.5" }, void 0, false, {
                      fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                      lineNumber: 839,
                      columnNumber: 25
                    }, this),
                    "Skrypt Eksterminacji w Pythonie (Ready-To-Run):"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 838,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => handleCopyCode(activeThreat.id, activeThreat.neutralizationDetails.pythonKillSnippet),
                      className: "px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1 transition-colors cursor-pointer",
                      children: copiedCodeId === activeThreat.id ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
                        /* @__PURE__ */ jsxDEV(Check, { className: "w-3 h-3 text-emerald-400" }, void 0, false, {
                          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                          lineNumber: 848,
                          columnNumber: 29
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400", children: "Skopiowano" }, void 0, false, {
                          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                          lineNumber: 849,
                          columnNumber: 29
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                        lineNumber: 847,
                        columnNumber: 27
                      }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
                        /* @__PURE__ */ jsxDEV(Copy, { className: "w-3 h-3" }, void 0, false, {
                          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                          lineNumber: 853,
                          columnNumber: 29
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { children: "Kopiuj .py" }, void 0, false, {
                          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                          lineNumber: 854,
                          columnNumber: 29
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                        lineNumber: 852,
                        columnNumber: 27
                      }, this)
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                      lineNumber: 842,
                      columnNumber: 23
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 837,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("pre", { className: "p-3 bg-black/90 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto", children: /* @__PURE__ */ jsxDEV("code", { children: activeThreat.neutralizationDetails.pythonKillSnippet }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 861,
                  columnNumber: 23
                }, this) }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 860,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 836,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 797,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 629,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 627,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
          lineNumber: 551,
          columnNumber: 9
        }, this),
        activeTab === "FOCUS_HIJACK_LOGS" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-slate-900/90 border border-red-600/40 shadow-lg", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono text-slate-400", children: "ŁĄCZNA LICZBA ATAKÓW" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 880,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV(AlertOctagon, { className: "w-4 h-4 text-red-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 881,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 879,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-2xl font-black text-white font-mono mt-1", children: focusStats.totalAttempts }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 883,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-red-300 font-mono mt-0.5", children: "Przechwyconych w locie przez Sentinel" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 886,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 878,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-slate-900/90 border border-orange-500/40 shadow-lg", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono text-slate-400", children: "AGRESYWNE PROCESY" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 893,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV(Skull, { className: "w-4 h-4 text-orange-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 894,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 892,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-2xl font-black text-white font-mono mt-1", children: focusStats.uniqueProcesses }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 896,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-orange-300 font-mono mt-0.5", children: "Unikalne binarne źródła zakłóceń" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 899,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 891,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-slate-900/90 border border-purple-500/40 shadow-lg", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono text-slate-400", children: "NAJCZĘSTSZY AGRESOR" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 906,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV(BarChart3, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 907,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 905,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-sm font-black text-purple-300 font-mono mt-1 truncate", title: focusStats.topAttacker?.processName, children: focusStats.topAttacker?.processName || "Brak" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 909,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400 font-mono mt-0.5", children: [
                "Powtórzeń ataku: ",
                focusStats.topAttacker?.repeatCount || 0,
                "x"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 912,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 904,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/40 shadow-lg", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono text-slate-400", children: "STATUS BARIERY FOKUSU" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 919,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 920,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 918,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-sm font-black text-emerald-300 font-mono mt-1 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-emerald-400 animate-ping" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 923,
                  columnNumber: 17
                }, this),
                "AKTYWNA (LOCALSTORAGE)"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 922,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400 font-mono mt-0.5", children: [
                "Pamięć stała: ",
                focusLogs.length,
                " wpisów"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 926,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 917,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 877,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 flex-1 flex-wrap", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "relative flex-1 min-w-[220px]", children: [
                /* @__PURE__ */ jsxDEV(Search, { className: "w-4 h-4 text-slate-400 absolute left-3 top-2.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 936,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "input",
                  {
                    type: "text",
                    placeholder: "Filtruj po procesie, API, tytule okna...",
                    value: focusSearch,
                    onChange: (e) => setFocusSearch(e.target.value),
                    className: "w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 937,
                    columnNumber: 17
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 935,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV(
                "select",
                {
                  value: focusFilterLevel,
                  onChange: (e) => setFocusFilterLevel(e.target.value),
                  "aria-label": "Filtruj poziom agresji",
                  className: "px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-red-500",
                  children: [
                    /* @__PURE__ */ jsxDEV("option", { value: "ALL", children: "Wszystkie Poziomy Ryzyka" }, void 0, false, {
                      fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                      lineNumber: 952,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV("option", { value: "CRITICAL", children: "Krytyczne (CRITICAL)" }, void 0, false, {
                      fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                      lineNumber: 953,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV("option", { value: "HIGH", children: "Wysokie (HIGH)" }, void 0, false, {
                      fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                      lineNumber: 954,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV("option", { value: "MEDIUM", children: "Średnie (MEDIUM)" }, void 0, false, {
                      fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                      lineNumber: 955,
                      columnNumber: 17
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 946,
                  columnNumber: 15
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 934,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: handleSimulateFocusAttack,
                  className: "px-3.5 py-1.5 rounded-xl bg-red-700 hover:bg-red-600 text-white text-xs font-mono font-bold flex items-center gap-1.5 border border-red-500/40 shadow-md transition-all cursor-pointer",
                  title: "Wstrzyknij symulowaną próbę przejęcia fokusu w tle",
                  children: [
                    /* @__PURE__ */ jsxDEV(Crosshair, { className: "w-3.5 h-3.5 text-yellow-300" }, void 0, false, {
                      fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                      lineNumber: 965,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "Symuluj Próbę Przechwycenia" }, void 0, false, {
                      fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                      lineNumber: 966,
                      columnNumber: 17
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 960,
                  columnNumber: 15
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => focusTracker.resetToDefaults(),
                  className: "px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer",
                  title: "Przywróć wzorcowe logi forensic",
                  children: [
                    /* @__PURE__ */ jsxDEV(RefreshCw, { className: "w-3.5 h-3.5 text-slate-400" }, void 0, false, {
                      fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                      lineNumber: 974,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "Wzorce" }, void 0, false, {
                      fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                      lineNumber: 975,
                      columnNumber: 17
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 969,
                  columnNumber: 15
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => focusTracker.clearHistory(),
                  className: "px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-red-950/80 border border-red-900/60 text-red-300 text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer",
                  title: "Wyczyść całą historię z localStorage",
                  children: [
                    /* @__PURE__ */ jsxDEV(Trash2, { className: "w-3.5 h-3.5 text-red-400" }, void 0, false, {
                      fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                      lineNumber: 983,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "Wyczyść Logi" }, void 0, false, {
                      fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                      lineNumber: 984,
                      columnNumber: 17
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 978,
                  columnNumber: 15
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 959,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 933,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 text-xs font-mono text-slate-300", children: [
                /* @__PURE__ */ jsxDEV(Clock, { className: "w-4 h-4 text-red-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 993,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "font-bold", children: "REJESTR POWTARZALNOŚCI ATAKÓW FOKUSU (LOCALSTORAGE LOGS)" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 994,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: [
                  "(",
                  filteredFocusLogs.length,
                  " incydentów)"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 995,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 992,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono text-slate-400", children: [
                "Klucz Storage: ",
                /* @__PURE__ */ jsxDEV("code", { className: "text-purple-300", children: "sentinel_focus_hijack_history" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 998,
                  columnNumber: 32
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 997,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 991,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxDEV("table", { className: "w-full text-left font-mono text-xs", children: [
              /* @__PURE__ */ jsxDEV("thead", { children: /* @__PURE__ */ jsxDEV("tr", { className: "bg-slate-950/50 text-slate-400 border-b border-slate-800/80", children: [
                /* @__PURE__ */ jsxDEV("th", { className: "py-3 px-4", children: "TIMESTAMP" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 1006,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("th", { className: "py-3 px-4", children: "PROCES & PID" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 1007,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("th", { className: "py-3 px-4", children: "TYTUŁ OKNA (HWND)" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 1008,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("th", { className: "py-3 px-4", children: "NADUŻYWANE API" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 1009,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("th", { className: "py-3 px-4", children: "POZIOM" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 1010,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("th", { className: "py-3 px-4 text-center", children: "POWTÓRZENIA" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 1011,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("th", { className: "py-3 px-4", children: "STATUS" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 1012,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("th", { className: "py-3 px-4 text-right", children: "AKCJA" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 1013,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 1005,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 1004,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("tbody", { className: "divide-y divide-slate-800/60", children: [
                filteredFocusLogs.map((log) => {
                  const isSelected = selectedLogId === log.id;
                  const levelBadge = {
                    CRITICAL: "bg-red-950 text-red-300 border-red-800",
                    HIGH: "bg-orange-950 text-orange-300 border-orange-800",
                    MEDIUM: "bg-blue-950 text-blue-300 border-blue-800"
                  }[log.aggressionLevel];
                  return /* @__PURE__ */ jsxDEV(React.Fragment, { children: [
                    /* @__PURE__ */ jsxDEV(
                      "tr",
                      {
                        onClick: () => setSelectedLogId(isSelected ? null : log.id),
                        className: `hover:bg-slate-800/50 transition-colors cursor-pointer ${isSelected ? "bg-purple-950/40" : ""}`,
                        children: [
                          /* @__PURE__ */ jsxDEV("td", { className: "py-3.5 px-4 text-slate-300 whitespace-nowrap", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5", children: [
                            /* @__PURE__ */ jsxDEV("span", { className: "w-1.5 h-1.5 rounded-full bg-red-400" }, void 0, false, {
                              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                              lineNumber: 1035,
                              columnNumber: 31
                            }, this),
                            /* @__PURE__ */ jsxDEV("span", { children: log.timestamp }, void 0, false, {
                              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                              lineNumber: 1036,
                              columnNumber: 31
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                            lineNumber: 1034,
                            columnNumber: 29
                          }, this) }, void 0, false, {
                            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                            lineNumber: 1033,
                            columnNumber: 27
                          }, this),
                          /* @__PURE__ */ jsxDEV("td", { className: "py-3.5 px-4 font-bold text-white whitespace-nowrap", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5", children: [
                            /* @__PURE__ */ jsxDEV("span", { className: "text-purple-300", children: log.processName }, void 0, false, {
                              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                              lineNumber: 1042,
                              columnNumber: 31
                            }, this),
                            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 text-[10px] font-normal", children: [
                              "[",
                              log.pid,
                              "]"
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                              lineNumber: 1043,
                              columnNumber: 31
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                            lineNumber: 1041,
                            columnNumber: 29
                          }, this) }, void 0, false, {
                            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                            lineNumber: 1040,
                            columnNumber: 27
                          }, this),
                          /* @__PURE__ */ jsxDEV("td", { className: "py-3.5 px-4 text-slate-300 max-w-[200px] truncate", title: log.windowTitle, children: log.windowTitle }, void 0, false, {
                            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                            lineNumber: 1047,
                            columnNumber: 27
                          }, this),
                          /* @__PURE__ */ jsxDEV("td", { className: "py-3.5 px-4 text-amber-300 text-[11px] whitespace-nowrap", children: log.abusedApi }, void 0, false, {
                            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                            lineNumber: 1051,
                            columnNumber: 27
                          }, this),
                          /* @__PURE__ */ jsxDEV("td", { className: "py-3.5 px-4 whitespace-nowrap", children: /* @__PURE__ */ jsxDEV("span", { className: `px-2 py-0.5 rounded border text-[10px] font-bold ${levelBadge}`, children: log.aggressionLevel }, void 0, false, {
                            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                            lineNumber: 1056,
                            columnNumber: 29
                          }, this) }, void 0, false, {
                            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                            lineNumber: 1055,
                            columnNumber: 27
                          }, this),
                          /* @__PURE__ */ jsxDEV("td", { className: "py-3.5 px-4 text-center whitespace-nowrap", children: /* @__PURE__ */ jsxDEV("span", { className: `px-2.5 py-1 rounded-full text-xs font-black border ${log.repeatCount > 15 ? "bg-red-950 text-red-300 border-red-700 animate-pulse" : log.repeatCount > 5 ? "bg-amber-950 text-amber-300 border-amber-700" : "bg-slate-800 text-slate-300 border-slate-700"}`, children: [
                            log.repeatCount,
                            "x"
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                            lineNumber: 1062,
                            columnNumber: 29
                          }, this) }, void 0, false, {
                            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                            lineNumber: 1061,
                            columnNumber: 27
                          }, this),
                          /* @__PURE__ */ jsxDEV("td", { className: "py-3.5 px-4 whitespace-nowrap", children: /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-bold flex items-center gap-1", children: [
                            /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-3.5 h-3.5" }, void 0, false, {
                              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                              lineNumber: 1075,
                              columnNumber: 31
                            }, this),
                            "ZABLOKOWANY"
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                            lineNumber: 1074,
                            columnNumber: 29
                          }, this) }, void 0, false, {
                            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                            lineNumber: 1073,
                            columnNumber: 27
                          }, this),
                          /* @__PURE__ */ jsxDEV("td", { className: "py-3.5 px-4 text-right whitespace-nowrap", children: /* @__PURE__ */ jsxDEV(
                            "button",
                            {
                              onClick: (e) => {
                                e.stopPropagation();
                                setSelectedLogId(isSelected ? null : log.id);
                              },
                              className: "text-slate-400 hover:text-white text-xs flex items-center gap-1 ml-auto cursor-pointer",
                              children: [
                                /* @__PURE__ */ jsxDEV("span", { children: isSelected ? "Zwiń" : "Szczegóły" }, void 0, false, {
                                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                                  lineNumber: 1088,
                                  columnNumber: 31
                                }, this),
                                /* @__PURE__ */ jsxDEV(ChevronRight, { className: `w-3.5 h-3.5 transition-transform ${isSelected ? "rotate-90" : ""}` }, void 0, false, {
                                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                                  lineNumber: 1089,
                                  columnNumber: 31
                                }, this)
                              ]
                            },
                            void 0,
                            true,
                            {
                              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                              lineNumber: 1081,
                              columnNumber: 29
                            },
                            this
                          ) }, void 0, false, {
                            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                            lineNumber: 1080,
                            columnNumber: 27
                          }, this)
                        ]
                      },
                      void 0,
                      true,
                      {
                        fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                        lineNumber: 1027,
                        columnNumber: 25
                      },
                      this
                    ),
                    isSelected && /* @__PURE__ */ jsxDEV("tr", { className: "bg-black/60 border-y border-purple-900/50", children: /* @__PURE__ */ jsxDEV("td", { colSpan: 8, className: "p-4", children: /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-slate-800 pb-2", children: [
                        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ jsxDEV(ShieldAlert, { className: "w-4 h-4 text-red-400" }, void 0, false, {
                            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                            lineNumber: 1101,
                            columnNumber: 37
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-white", children: [
                            "SZCZEGÓŁY ATATKU PRZECHWYCENIA FOKUSU (",
                            log.processName,
                            ")"
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                            lineNumber: 1102,
                            columnNumber: 37
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                          lineNumber: 1100,
                          columnNumber: 35
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500 font-mono", children: [
                          "ID: ",
                          log.id
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                          lineNumber: 1106,
                          columnNumber: 35
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                        lineNumber: 1099,
                        columnNumber: 33
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs", children: [
                        /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-lg bg-slate-900/90 border border-slate-800", children: [
                          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 block text-[10px]", children: "WEKTOR ZAGROŻENIA" }, void 0, false, {
                            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                            lineNumber: 1113,
                            columnNumber: 37
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { className: "text-purple-300 font-bold mt-0.5 block", children: log.sourceVector }, void 0, false, {
                            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                            lineNumber: 1114,
                            columnNumber: 37
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                          lineNumber: 1112,
                          columnNumber: 35
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-lg bg-slate-900/90 border border-slate-800", children: [
                          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 block text-[10px]", children: "POWTARZALNOŚĆ / FREKWENCJA" }, void 0, false, {
                            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                            lineNumber: 1117,
                            columnNumber: 37
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { className: "text-red-300 font-bold mt-0.5 block", children: [
                            log.repeatCount,
                            " udaremnionych prób"
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                            lineNumber: 1118,
                            columnNumber: 37
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                          lineNumber: 1116,
                          columnNumber: 35
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-lg bg-slate-900/90 border border-slate-800", children: [
                          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 block text-[10px]", children: "MECHANIZM BLOKADY" }, void 0, false, {
                            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                            lineNumber: 1121,
                            columnNumber: 37
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-300 font-bold mt-0.5 block", children: "LockSetForegroundWindow (Spike Clamp)" }, void 0, false, {
                            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                            lineNumber: 1122,
                            columnNumber: 37
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                          lineNumber: 1120,
                          columnNumber: 35
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                        lineNumber: 1111,
                        columnNumber: 33
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "text-purple-400 font-bold block mb-1 font-mono text-[10px]", children: "ANALIZA FORENSIC:" }, void 0, false, {
                          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                          lineNumber: 1127,
                          columnNumber: 35
                        }, this),
                        log.details
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                        lineNumber: 1126,
                        columnNumber: 33
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                      lineNumber: 1098,
                      columnNumber: 31
                    }, this) }, void 0, false, {
                      fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                      lineNumber: 1097,
                      columnNumber: 29
                    }, this) }, void 0, false, {
                      fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                      lineNumber: 1096,
                      columnNumber: 27
                    }, this)
                  ] }, log.id, true, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 1026,
                    columnNumber: 23
                  }, this);
                }),
                filteredFocusLogs.length === 0 && /* @__PURE__ */ jsxDEV("tr", { children: /* @__PURE__ */ jsxDEV("td", { colSpan: 8, className: "py-8 text-center text-slate-400 text-xs", children: "Brak zarejestrowanych prób przechwycenia fokusu dla podanych kryteriów." }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 1140,
                  columnNumber: 23
                }, this) }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 1139,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 1016,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 1003,
              columnNumber: 15
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 1002,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 990,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
          lineNumber: 875,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
        lineNumber: 535,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(
        LiveThreatPulseSidebar,
        {
          logs: focusLogs,
          onSelectLog: handleSelectBreachFromPulse,
          onNavigateToTab: setActiveTab
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
          lineNumber: 1154,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
      lineNumber: 533,
      columnNumber: 7
    }, this),
    isAddModalOpen && /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-3 border-b border-slate-800", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 text-white font-bold text-lg", children: [
          /* @__PURE__ */ jsxDEV(PlusCircle, { className: "w-5 h-5 text-purple-400" }, void 0, false, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 1167,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Dodaj Nowy Incydent Zagrożenia" }, void 0, false, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 1168,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
          lineNumber: 1166,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setIsAddModalOpen(false),
            className: "text-slate-400 hover:text-white cursor-pointer",
            children: /* @__PURE__ */ jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 1174,
              columnNumber: 17
            }, this)
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 1170,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
        lineNumber: 1165,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("form", { onSubmit: handleSaveCustomIncident, className: "space-y-4 text-xs text-slate-200", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-300 font-mono mb-1", children: "Nazwa Zagrożenia / Sygnatura:" }, void 0, false, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 1180,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "text",
              required: true,
              placeholder: "np. FlutterTrap.x64, RogueInjector.Win32",
              value: newThreatName,
              onChange: (e) => setNewThreatName(e.target.value),
              className: "w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 1181,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
          lineNumber: 1179,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-300 font-mono mb-1", children: "Kategoria:" }, void 0, false, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 1193,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV(
              "select",
              {
                value: newThreatCategory,
                onChange: (e) => setNewThreatCategory(e.target.value),
                className: "w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-purple-500",
                children: [
                  /* @__PURE__ */ jsxDEV("option", { value: "Screen Locker", children: "Screen Locker" }, void 0, false, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 1199,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("option", { value: "Trojan Overlay", children: "Trojan Overlay" }, void 0, false, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 1200,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("option", { value: "Ransomware", children: "Ransomware" }, void 0, false, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 1201,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("option", { value: "Process Wiper", children: "Process Wiper" }, void 0, false, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 1202,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("option", { value: "Stealth Miner", children: "Stealth Miner" }, void 0, false, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 1203,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("option", { value: "Rootkit Hook", children: "Rootkit Hook" }, void 0, false, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 1204,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("option", { value: "Focus Hijacker", children: "Focus Hijacker" }, void 0, false, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 1205,
                    columnNumber: 21
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 1194,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 1192,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-300 font-mono mb-1", children: "Poziom Ryzyka:" }, void 0, false, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 1210,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV(
              "select",
              {
                value: newThreatSeverity,
                onChange: (e) => setNewThreatSeverity(e.target.value),
                className: "w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-purple-500",
                children: [
                  /* @__PURE__ */ jsxDEV("option", { value: "EXTREME", children: "EXTREME" }, void 0, false, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 1216,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("option", { value: "CRITICAL", children: "CRITICAL" }, void 0, false, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 1217,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("option", { value: "HIGH", children: "HIGH" }, void 0, false, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 1218,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("option", { value: "MEDIUM", children: "MEDIUM" }, void 0, false, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 1219,
                    columnNumber: 21
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 1211,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 1209,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
          lineNumber: 1191,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-300 font-mono mb-1", children: "Opis Działania:" }, void 0, false, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 1225,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "textarea",
            {
              rows: 2,
              placeholder: "Krótki opis zachowania wirusa...",
              value: newThreatDesc,
              onChange: (e) => setNewThreatDesc(e.target.value),
              className: "w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 1226,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
          lineNumber: 1224,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-300 font-mono mb-1", children: "Mechanizm Agresji (Jak atakuje):" }, void 0, false, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 1236,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "text",
              placeholder: "np. HWND_TOPMOST hook, wywłaszczanie fokusu, blokada klawiatury",
              value: newThreatAggression,
              onChange: (e) => setNewThreatAggression(e.target.value),
              className: "w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 1237,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
          lineNumber: 1235,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-300 font-mono mb-1", children: "Sposób Wniknięcia do Komputera:" }, void 0, false, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 1247,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "text",
              placeholder: "np. Phishing e-mail, podrobiona paczka npm, crack/torrent",
              value: newThreatVector,
              onChange: (e) => setNewThreatVector(e.target.value),
              className: "w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 1248,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
          lineNumber: 1246,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-end gap-3 pt-3", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              type: "button",
              onClick: () => setIsAddModalOpen(false),
              className: "px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-semibold cursor-pointer",
              children: "Anuluj"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 1258,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              type: "submit",
              className: "px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold font-mono shadow-lg shadow-purple-950 cursor-pointer",
              children: "Zapisz w Rejestrze"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 1265,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
          lineNumber: 1257,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
        lineNumber: 1178,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
      lineNumber: 1164,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
      lineNumber: 1163,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV(
      Retro100CopiesPurgeModal,
      {
        isOpen: isRetro100ModalOpen,
        onClose: () => setIsRetro100ModalOpen(false)
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
        lineNumber: 1278,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(
      ThreatDatabaseExportModal,
      {
        isOpen: isExportModalOpen,
        onClose: () => setIsExportModalOpen(false),
        threats,
        focusLogs,
        onThreatsUpdated: (updated) => setThreats(updated)
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
        lineNumber: 1284,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(
      ForensicsPdfExportModal,
      {
        isOpen: isPdfModalOpen,
        onClose: () => setIsPdfModalOpen(false),
        threats,
        focusLogs
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
        lineNumber: 1293,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
    lineNumber: 334,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk5ldXRyYWxpemVkVGhyZWF0c0xlZGdlci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VNZW1vLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBcbiAgU2hpZWxkQ2hlY2ssIFNoaWVsZEFsZXJ0LCBTa3VsbCwgVGVybWluYWwsIEZpbGVDb2RlLCBDaGVja0NpcmNsZTIsIFxuICBBbGVydFRyaWFuZ2xlLCBTZWFyY2gsIEZpbHRlciwgUGxheSwgRG93bmxvYWQsIENvcHksIENoZWNrLCBDaGV2cm9uUmlnaHQsIFxuICBMYXllcnMsIExvY2ssIFVubG9jaywgWmFwLCBBY3Rpdml0eSwgSW5mbywgUGx1c0NpcmNsZSwgWCwgRXh0ZXJuYWxMaW5rLCBGbGFtZSxcbiAgQ2xvY2ssIEV5ZSwgUmVmcmVzaEN3LCBUcmFzaDIsIENyb3NzaGFpciwgQWxlcnRPY3RhZ29uLCBBcnJvd1VwUmlnaHQsIEJhckNoYXJ0MyxcbiAgVHJlbmRpbmdVcCwgTGluZUNoYXJ0IGFzIENoYXJ0TGluZUljb24sIFNoYXJlMiwgRmlsZUpzb24sIERhdGFiYXNlLCBGaWxlRG93biwgRmlsZVRleHRcbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IElOSVRJQUxfTkVVVFJBTElaRURfVEhSRUFUUyB9IGZyb20gJy4uL2RhdGEvbmV1dHJhbGl6ZWRWaXJ1c2VzJztcbmltcG9ydCB7IE5ldXRyYWxpemVkVGhyZWF0LCBPU1R5cGUsIFRocmVhdENhdGVnb3J5LCBUaHJlYXRTZXZlcml0eSwgRm9jdXNIaWphY2tBdHRlbXB0IH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgc2FmZVN0b3JhZ2UgfSBmcm9tICcuLi91dGlscy9zZWxmUmVwYWlyU3lzdGVtJztcbmltcG9ydCB7IGZvY3VzVHJhY2tlciB9IGZyb20gJy4uL3V0aWxzL2ZvY3VzSGlqYWNrVHJhY2tlcic7XG5pbXBvcnQgeyBBdHRhY2tGcmVxdWVuY3lUaW1lU2VyaWVzQ2hhcnQgfSBmcm9tICcuL0F0dGFja0ZyZXF1ZW5jeVRpbWVTZXJpZXNDaGFydCc7XG5pbXBvcnQgeyBSZXRybzEwMENvcGllc1B1cmdlTW9kYWwgfSBmcm9tICcuL1JldHJvMTAwQ29waWVzUHVyZ2VNb2RhbCc7XG5pbXBvcnQgeyBMaXZlVGhyZWF0UHVsc2VTaWRlYmFyIH0gZnJvbSAnLi9MaXZlVGhyZWF0UHVsc2VTaWRlYmFyJztcbmltcG9ydCB7IFRocmVhdERhdGFiYXNlRXhwb3J0TW9kYWwgfSBmcm9tICcuL1RocmVhdERhdGFiYXNlRXhwb3J0TW9kYWwnO1xuaW1wb3J0IHsgRm9yZW5zaWNzUGRmRXhwb3J0TW9kYWwgfSBmcm9tICcuL0ZvcmVuc2ljc1BkZkV4cG9ydE1vZGFsJztcbmltcG9ydCB7IGRvd25sb2FkVGhyZWF0RGF0YWJhc2VKc29uIH0gZnJvbSAnLi4vdXRpbHMvdGhyZWF0RGF0YWJhc2VFeHBvcnRlcic7XG5pbXBvcnQgeyBkb3dubG9hZE5ldXRyYWxpemVkVGhyZWF0c1BkZiB9IGZyb20gJy4uL3V0aWxzL2ZvcmVuc2ljc1BkZkV4cG9ydGVyJztcbmltcG9ydCB7IGRvd25sb2FkQ29tcGxldGVJbW11bml6YXRpb25CdW5kbGUgfSBmcm9tICcuLi91dGlscy9zeXN0ZW1JbW11bml6YXRpb25FbmdpbmUnO1xuXG5leHBvcnQgY29uc3QgTmV1dHJhbGl6ZWRUaHJlYXRzTGVkZ2VyOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgY29uc3QgW2FjdGl2ZVRhYiwgc2V0QWN0aXZlVGFiXSA9IHVzZVN0YXRlPCdWSVJVU19ET1NTSUVSJyB8ICdGT0NVU19ISUpBQ0tfTE9HUycgfCAnQVRUQUNLX0ZSRVFVRU5DWV9DSEFSVCc+KCdBVFRBQ0tfRlJFUVVFTkNZX0NIQVJUJyk7XG4gIGNvbnN0IFtpc1JldHJvMTAwTW9kYWxPcGVuLCBzZXRJc1JldHJvMTAwTW9kYWxPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2lzRXhwb3J0TW9kYWxPcGVuLCBzZXRJc0V4cG9ydE1vZGFsT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtpc1BkZk1vZGFsT3Blbiwgc2V0SXNQZGZNb2RhbE9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbaXNRdWlja1BkZkxvYWRpbmcsIHNldElzUXVpY2tQZGZMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBbdGhyZWF0cywgc2V0VGhyZWF0c10gPSB1c2VTdGF0ZTxOZXV0cmFsaXplZFRocmVhdFtdPigoKSA9PiB7XG4gICAgY29uc3QgY3VzdG9tID0gc2FmZVN0b3JhZ2UuZ2V0PE5ldXRyYWxpemVkVGhyZWF0W10+KCdzZW50aW5lbF9jdXN0b21fdGhyZWF0cycsIFtdKTtcbiAgICByZXR1cm4gWy4uLklOSVRJQUxfTkVVVFJBTElaRURfVEhSRUFUUywgLi4uY3VzdG9tXTtcbiAgfSk7XG5cbiAgLy8gRm9jdXMgSGlqYWNrIEhpc3RvcnkgU3RhdGVcbiAgY29uc3QgW2ZvY3VzTG9ncywgc2V0Rm9jdXNMb2dzXSA9IHVzZVN0YXRlPEZvY3VzSGlqYWNrQXR0ZW1wdFtdPigoKSA9PiBmb2N1c1RyYWNrZXIuZ2V0TG9ncygpKTtcbiAgY29uc3QgW2ZvY3VzU2VhcmNoLCBzZXRGb2N1c1NlYXJjaF0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtmb2N1c0ZpbHRlckxldmVsLCBzZXRGb2N1c0ZpbHRlckxldmVsXSA9IHVzZVN0YXRlPHN0cmluZz4oJ0FMTCcpO1xuICBjb25zdCBbc2VsZWN0ZWRMb2dJZCwgc2V0U2VsZWN0ZWRMb2dJZF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcblxuICBjb25zdCBoYW5kbGVTZWxlY3RCcmVhY2hGcm9tUHVsc2UgPSAobG9nOiBGb2N1c0hpamFja0F0dGVtcHQpID0+IHtcbiAgICBzZXRBY3RpdmVUYWIoJ0ZPQ1VTX0hJSkFDS19MT0dTJyk7XG4gICAgc2V0U2VsZWN0ZWRMb2dJZChsb2cuaWQpO1xuICB9O1xuXG4gIC8vIFN1YnNjcmliZSB0byBGb2N1cyBUcmFja2VyIHVwZGF0ZXNcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCB1bnN1YnNjcmliZSA9IGZvY3VzVHJhY2tlci5zdWJzY3JpYmUoKGxvZ3MpID0+IHtcbiAgICAgIHNldEZvY3VzTG9ncyhsb2dzKTtcbiAgICB9KTtcbiAgICByZXR1cm4gKCkgPT4gdW5zdWJzY3JpYmUoKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IFtzZWFyY2hRdWVyeSwgc2V0U2VhcmNoUXVlcnldID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbc2VsZWN0ZWRDYXRlZ29yeSwgc2V0U2VsZWN0ZWRDYXRlZ29yeV0gPSB1c2VTdGF0ZTxzdHJpbmc+KCdBTEwnKTtcbiAgY29uc3QgW3NlbGVjdGVkU2V2ZXJpdHksIHNldFNlbGVjdGVkU2V2ZXJpdHldID0gdXNlU3RhdGU8c3RyaW5nPignQUxMJyk7XG4gIGNvbnN0IFtzZWxlY3RlZE9TLCBzZXRTZWxlY3RlZE9TXSA9IHVzZVN0YXRlPHN0cmluZz4oJ0FMTCcpO1xuICBjb25zdCBbYWN0aXZlVGhyZWF0SWQsIHNldEFjdGl2ZVRocmVhdElkXSA9IHVzZVN0YXRlPHN0cmluZz4odGhyZWF0c1swXT8uaWQgfHwgJ3RocmVhdC1mbHV0dGVyLWxvY2tlcicpO1xuICBcbiAgLy8gTGl2ZSBTbGF1Z2h0ZXIgU2ltdWxhdGlvbiBTdGF0ZVxuICBjb25zdCBbc2ltdWxhdGluZ1RocmVhdElkLCBzZXRTaW11bGF0aW5nVGhyZWF0SWRdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtzaW11bGF0aW9uQ3VycmVudFN0ZXAsIHNldFNpbXVsYXRpb25DdXJyZW50U3RlcF0gPSB1c2VTdGF0ZTxudW1iZXI+KDApO1xuICBjb25zdCBbc2ltdWxhdGlvbkxvZ3MsIHNldFNpbXVsYXRpb25Mb2dzXSA9IHVzZVN0YXRlPHN0cmluZ1tdPihbXSk7XG4gIGNvbnN0IFtjb3BpZWRDb2RlSWQsIHNldENvcGllZENvZGVJZF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcblxuICAvLyBOZXcgSW5jaWRlbnQgTW9kYWxcbiAgY29uc3QgW2lzQWRkTW9kYWxPcGVuLCBzZXRJc0FkZE1vZGFsT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtuZXdUaHJlYXROYW1lLCBzZXROZXdUaHJlYXROYW1lXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW25ld1RocmVhdENhdGVnb3J5LCBzZXROZXdUaHJlYXRDYXRlZ29yeV0gPSB1c2VTdGF0ZTxUaHJlYXRDYXRlZ29yeT4oJ1NjcmVlbiBMb2NrZXInKTtcbiAgY29uc3QgW25ld1RocmVhdFNldmVyaXR5LCBzZXROZXdUaHJlYXRTZXZlcml0eV0gPSB1c2VTdGF0ZTxUaHJlYXRTZXZlcml0eT4oJ0NSSVRJQ0FMJyk7XG4gIGNvbnN0IFtuZXdUaHJlYXREZXNjLCBzZXROZXdUaHJlYXREZXNjXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW25ld1RocmVhdEFnZ3Jlc3Npb24sIHNldE5ld1RocmVhdEFnZ3Jlc3Npb25dID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbbmV3VGhyZWF0VmVjdG9yLCBzZXROZXdUaHJlYXRWZWN0b3JdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbbmV3VGhyZWF0TmV1dHJhbGl6YXRpb24sIHNldE5ld1RocmVhdE5ldXRyYWxpemF0aW9uXSA9IHVzZVN0YXRlKCcnKTtcblxuICBjb25zdCBhY3RpdmVUaHJlYXQgPSB1c2VNZW1vKCgpID0+IHtcbiAgICByZXR1cm4gdGhyZWF0cy5maW5kKHQgPT4gdC5pZCA9PT0gYWN0aXZlVGhyZWF0SWQpIHx8IHRocmVhdHNbMF07XG4gIH0sIFt0aHJlYXRzLCBhY3RpdmVUaHJlYXRJZF0pO1xuXG4gIGNvbnN0IGZpbHRlcmVkVGhyZWF0cyA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIHJldHVybiB0aHJlYXRzLmZpbHRlcih0ID0+IHtcbiAgICAgIGNvbnN0IG1hdGNoZXNTZWFyY2ggPSBcbiAgICAgICAgdC5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoUXVlcnkudG9Mb3dlckNhc2UoKSkgfHxcbiAgICAgICAgdC5kZXNjcmlwdGlvbi50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFF1ZXJ5LnRvTG93ZXJDYXNlKCkpIHx8XG4gICAgICAgIHQuYWdncmVzc2lvbk1lY2hhbmlzbS50aXRsZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFF1ZXJ5LnRvTG93ZXJDYXNlKCkpIHx8XG4gICAgICAgIHQuaW5mZWN0aW9uVmVjdG9yLmNoYW5uZWwudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hRdWVyeS50b0xvd2VyQ2FzZSgpKTtcblxuICAgICAgY29uc3QgbWF0Y2hlc0NhdCA9IHNlbGVjdGVkQ2F0ZWdvcnkgPT09ICdBTEwnIHx8IHQuY2F0ZWdvcnkgPT09IHNlbGVjdGVkQ2F0ZWdvcnk7XG4gICAgICBjb25zdCBtYXRjaGVzU2V2ID0gc2VsZWN0ZWRTZXZlcml0eSA9PT0gJ0FMTCcgfHwgdC5zZXZlcml0eSA9PT0gc2VsZWN0ZWRTZXZlcml0eTtcbiAgICAgIGNvbnN0IG1hdGNoZXNPUyA9IHNlbGVjdGVkT1MgPT09ICdBTEwnIHx8IHQudGFyZ2V0T1MuaW5jbHVkZXMoc2VsZWN0ZWRPUyBhcyBPU1R5cGUpO1xuXG4gICAgICByZXR1cm4gbWF0Y2hlc1NlYXJjaCAmJiBtYXRjaGVzQ2F0ICYmIG1hdGNoZXNTZXYgJiYgbWF0Y2hlc09TO1xuICAgIH0pO1xuICB9LCBbdGhyZWF0cywgc2VhcmNoUXVlcnksIHNlbGVjdGVkQ2F0ZWdvcnksIHNlbGVjdGVkU2V2ZXJpdHksIHNlbGVjdGVkT1NdKTtcblxuICAvLyBGb2N1cyBMb2dzIENvbXB1dGVkIFN0YXRzICYgRmlsdGVyZWQgRGF0YVxuICBjb25zdCBmaWx0ZXJlZEZvY3VzTG9ncyA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIHJldHVybiBmb2N1c0xvZ3MuZmlsdGVyKGxvZyA9PiB7XG4gICAgICBjb25zdCBtYXRjaGVzVGV4dCA9IFxuICAgICAgICBsb2cucHJvY2Vzc05hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhmb2N1c1NlYXJjaC50b0xvd2VyQ2FzZSgpKSB8fFxuICAgICAgICBsb2cud2luZG93VGl0bGUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhmb2N1c1NlYXJjaC50b0xvd2VyQ2FzZSgpKSB8fFxuICAgICAgICBsb2cuYWJ1c2VkQXBpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoZm9jdXNTZWFyY2gudG9Mb3dlckNhc2UoKSkgfHxcbiAgICAgICAgbG9nLnNvdXJjZVZlY3Rvci50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKGZvY3VzU2VhcmNoLnRvTG93ZXJDYXNlKCkpIHx8XG4gICAgICAgIGxvZy5kZXRhaWxzLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoZm9jdXNTZWFyY2gudG9Mb3dlckNhc2UoKSk7XG5cbiAgICAgIGNvbnN0IG1hdGNoZXNMZXZlbCA9IGZvY3VzRmlsdGVyTGV2ZWwgPT09ICdBTEwnIHx8IGxvZy5hZ2dyZXNzaW9uTGV2ZWwgPT09IGZvY3VzRmlsdGVyTGV2ZWw7XG4gICAgICByZXR1cm4gbWF0Y2hlc1RleHQgJiYgbWF0Y2hlc0xldmVsO1xuICAgIH0pO1xuICB9LCBbZm9jdXNMb2dzLCBmb2N1c1NlYXJjaCwgZm9jdXNGaWx0ZXJMZXZlbF0pO1xuXG4gIC8vIFN0YXRzIG9uIFJlY3VycmluZyBQcm9jZXNzIEF0dGFja3NcbiAgY29uc3QgZm9jdXNTdGF0cyA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IHRvdGFsQXR0ZW1wdHMgPSBmb2N1c0xvZ3MucmVkdWNlKChhY2MsIGwpID0+IGFjYyArIGwucmVwZWF0Q291bnQsIDApO1xuICAgIGNvbnN0IHVuaXF1ZVByb2Nlc3NlcyA9IG5ldyBTZXQoZm9jdXNMb2dzLm1hcChsID0+IGwucHJvY2Vzc05hbWUpKS5zaXplO1xuICAgIGNvbnN0IHRvcEF0dGFja2VyID0gWy4uLmZvY3VzTG9nc10uc29ydCgoYSwgYikgPT4gYi5yZXBlYXRDb3VudCAtIGEucmVwZWF0Q291bnQpWzBdO1xuICAgIGNvbnN0IGNyaXRpY2FsQ291bnQgPSBmb2N1c0xvZ3MuZmlsdGVyKGwgPT4gbC5hZ2dyZXNzaW9uTGV2ZWwgPT09ICdDUklUSUNBTCcpLmxlbmd0aDtcbiAgICByZXR1cm4ge1xuICAgICAgdG90YWxBdHRlbXB0cyxcbiAgICAgIHVuaXF1ZVByb2Nlc3NlcyxcbiAgICAgIHRvcEF0dGFja2VyLFxuICAgICAgY3JpdGljYWxDb3VudFxuICAgIH07XG4gIH0sIFtmb2N1c0xvZ3NdKTtcblxuICBjb25zdCBoYW5kbGVTaW11bGF0ZUZvY3VzQXR0YWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHJvZ3VlcyA9IFtcbiAgICAgIHsgbmFtZTogJ2ZsdXR0ZXJfdHJhcF9vdmVybGF5LmV4ZScsIHBpZDogODk0MCwgdGl0bGU6ICdGTFVUVEVSX1NVUkZBQ0VfTE9DS0VSX1RPUE1PU1QnLCBhcGk6ICdTZXRGb3JlZ3JvdW5kV2luZG93KEhXTkQpJywgc2V2OiAnQ1JJVElDQUwnIGFzIGNvbnN0LCB2ZWM6ICdIV05EX1RPUE1PU1QgRGlyZWN0IEluamVjdGlvbicsIGRldGFpbHM6ICdQcsOzYmEgemFibG9rb3dhbmlhIHB1bHBpdHUgaSB3eXfFgmFzemN6ZW5pYSBva25hIHJvYm9jemVnby4nIH0sXG4gICAgICB7IG5hbWU6ICdnbmlkYV9zdGVhbHRoX3NwYW1tZXIuZXhlJywgcGlkOiA3MzEyLCB0aXRsZTogJ0NyaXRpY2FsIFNlY3VyaXR5IEFsZXJ0IERpYWxvZycsIGFwaTogJ0F0dGFjaFRocmVhZElucHV0ICsgU2V0Rm9jdXMnLCBzZXY6ICdISUdIJyBhcyBjb25zdCwgdmVjOiAnVGhyZWFkIFF1ZXVlIEhvb2snLCBkZXRhaWxzOiAnV3ltdXN6YW5pZSBva25hIGRpYWxvZ293ZWdvIG5hIHdpZXJ6Y2h1IGVrc3Bsb3JhdG9yYS4nIH0sXG4gICAgICB7IG5hbWU6ICdyb2d1ZV9taW5lcl93YXRjaGRvZy5leGUnLCBwaWQ6IDUxMjAsIHRpdGxlOiAnSG9zdCBQcm9jZXNzIFNlcnZpY2UgSGVscGVyJywgYXBpOiAnU3dpdGNoVG9UaGlzV2luZG93Jywgc2V2OiAnSElHSCcgYXMgY29uc3QsIHZlYzogJ0RXTSBaLU9yZGVyIEZvcmNpbmcnLCBkZXRhaWxzOiAnUHLDs2JhIHVrcnljaWEgb2tuYSByb2JvY3plZ28gcG9kIGZhxYJzenl3eW0gcHJvY2VzZW0gdMWCYS4nIH0sXG4gICAgICB7IG5hbWU6ICdhZHdhcmVfcG9wdXBfY2FzY2FkZS5leGUnLCBwaWQ6IDQ4OTAsIHRpdGxlOiAnU3BlY2lhbCBDcnlwdG8gQm9udXMgTW9kYWwnLCBhcGk6ICdTZXRXaW5kb3dQb3MoSFdORF9UT1BNT1NUKScsIHNldjogJ0NSSVRJQ0FMJyBhcyBjb25zdCwgdmVjOiAnTW9kYWwgQ2FzY2FkZSBMb29wJywgZGV0YWlsczogJ1dzdHJ6eWtuacSZY2llIHDEmXRsaSA2MEh6IFNldFdpbmRvd1Bvcy4nIH1cbiAgICBdO1xuICAgIGNvbnN0IHBpY2tlZCA9IHJvZ3Vlc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiByb2d1ZXMubGVuZ3RoKV07XG4gICAgZm9jdXNUcmFja2VyLnJlY29yZEF0dGVtcHQoXG4gICAgICBwaWNrZWQubmFtZSxcbiAgICAgIHBpY2tlZC5waWQsXG4gICAgICBwaWNrZWQudGl0bGUsXG4gICAgICBwaWNrZWQuYXBpLFxuICAgICAgcGlja2VkLnNldixcbiAgICAgIHBpY2tlZC52ZWMsXG4gICAgICBwaWNrZWQuZGV0YWlsc1xuICAgICk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ29weUNvZGUgPSAoaWQ6IHN0cmluZywgY29kZTogc3RyaW5nKSA9PiB7XG4gICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQoY29kZSk7XG4gICAgc2V0Q29waWVkQ29kZUlkKGlkKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHNldENvcGllZENvZGVJZChudWxsKSwgMjAwMCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU3RhcnRMaXZlU2xhdWdodGVyID0gKHRocmVhdDogTmV1dHJhbGl6ZWRUaHJlYXQpID0+IHtcbiAgICBzZXRTaW11bGF0aW5nVGhyZWF0SWQodGhyZWF0LmlkKTtcbiAgICBzZXRTaW11bGF0aW9uQ3VycmVudFN0ZXAoMCk7XG4gICAgc2V0U2ltdWxhdGlvbkxvZ3MoW1xuICAgICAgYFtTRU5USU5FTCBDT1JFXSBJbmljamFsaXphY2phIHByb2NlZHVyeSB1Ym9qdSBkbGE6ICR7dGhyZWF0Lm5hbWV9YCxcbiAgICAgIGBbRk9SRU5TSUNTXSBTdW1hIGtvbnRyb2xuYSBTSEEyNTY6ICR7dGhyZWF0LnNoYTI1Nkhhc2guc3Vic3RyaW5nKDAsIDI0KX0uLi5gLFxuICAgICAgYFtXQVRDSERPR10gRW50cm9waWEgYmluYXJuYSBjZWx1OiAke3RocmVhdC5lbnRyb3B5fSAoUGFrb3dhbmllIHd5a3J5dGUpYFxuICAgIF0pO1xuXG4gICAgY29uc3Qgc3RlcHMgPSB0aHJlYXQubmV1dHJhbGl6YXRpb25EZXRhaWxzLmV4ZWN1dGlvblN0ZXBzO1xuICAgIGxldCBzdGVwSWR4ID0gMDtcblxuICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgaWYgKHN0ZXBJZHggPCBzdGVwcy5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgY3VyciA9IHN0ZXBzW3N0ZXBJZHhdO1xuICAgICAgICBzZXRTaW11bGF0aW9uQ3VycmVudFN0ZXAoY3Vyci5zdGVwKTtcbiAgICAgICAgc2V0U2ltdWxhdGlvbkxvZ3MocHJldiA9PiBbXG4gICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICBgW0tST0sgJHtjdXJyLnN0ZXB9LyR7c3RlcHMubGVuZ3RofV0gJHtjdXJyLmFjdGlvbn1gLFxuICAgICAgICAgIGAgICAgLT4gV3l3b8WCYW5pZSBBUEk6ICR7Y3Vyci50YXJnZXRBcGl9YCxcbiAgICAgICAgICBgICAgIC0+IFN0YXR1czogJHtjdXJyLnJlc3VsdH1gXG4gICAgICAgIF0pO1xuICAgICAgICBzdGVwSWR4Kys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgc2V0U2ltdWxhdGlvbkxvZ3MocHJldiA9PiBbXG4gICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICBgW1BVUkdFIENPTVBMRVRFXSBaYWdyb8W8ZW5pZSAke3RocmVhdC5uYW1lfSB6b3N0YcWCbyB3IDEwMCUgemxpa3dpZG93YW5lIGkgemFyeWdsb3dhbmUgdyBwYW1pxJljaSBSQU0uYCxcbiAgICAgICAgICBgW1FVQVJBTlRJTkUgUFJPT0ZdICR7dGhyZWF0Lm5ldXRyYWxpemF0aW9uRGV0YWlscy5xdWFyYW50aW5lUHJvb2Z9YFxuICAgICAgICBdKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgc2V0U2ltdWxhdGluZ1RocmVhdElkKG51bGwpO1xuICAgICAgICB9LCA1MDAwKTtcbiAgICAgIH1cbiAgICB9LCA5MDApO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNhdmVDdXN0b21JbmNpZGVudCA9IChlOiBSZWFjdC5Gb3JtRXZlbnQpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKCFuZXdUaHJlYXROYW1lLnRyaW0oKSkgcmV0dXJuO1xuXG4gICAgY29uc3QgbmV3RW50cnk6IE5ldXRyYWxpemVkVGhyZWF0ID0ge1xuICAgICAgaWQ6ICdjdXN0b20tJyArIERhdGUubm93KCksXG4gICAgICBuYW1lOiBuZXdUaHJlYXROYW1lLFxuICAgICAgY2F0ZWdvcnk6IG5ld1RocmVhdENhdGVnb3J5LFxuICAgICAgc2V2ZXJpdHk6IG5ld1RocmVhdFNldmVyaXR5LFxuICAgICAgc3RhdHVzOiAnWk5JU1pDWk9OWSAoMTAwJSBQVVJHRUQpJyxcbiAgICAgIGZpcnN0U3BvdHRlZDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF0sXG4gICAgICBuZXV0cmFsaXplZEF0OiBuZXcgRGF0ZSgpLnRvVVRDU3RyaW5nKCksXG4gICAgICB0YXJnZXRPUzogWyd3aW5kb3dzJ10sXG4gICAgICBzaGEyNTZIYXNoOiBBcnJheS5mcm9tKHsgbGVuZ3RoOiA2NCB9LCAoKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxNikudG9TdHJpbmcoMTYpKS5qb2luKCcnKSxcbiAgICAgIGVudHJvcHk6IDcuODIsXG4gICAgICBkZXNjcmlwdGlvbjogbmV3VGhyZWF0RGVzYyB8fCAnWmfFgm9zem9ueSBpbmN5ZGVudCB6xYJvxZtsaXdlZ28gb3Byb2dyYW1vd2FuaWEgYmxva3VqxIVjZWdvIHB1bHBpdC4nLFxuICAgICAgYWdncmVzc2lvbk1lY2hhbmlzbToge1xuICAgICAgICB0aXRsZTogJ1ByemVjaHd5Y2VuaWUgWmFzb2LDs3cgaSBCbG9rYWRhIEdVSScsXG4gICAgICAgIHN1bW1hcnk6IG5ld1RocmVhdEFnZ3Jlc3Npb24gfHwgJ05hZHXFvHljaWUgdWNod3l0w7N3IG9raWVua293eWNoIGkgcHJpb3J5dGV0w7N3IGrEhWRyYS4nLFxuICAgICAgICB0ZWNobmljYWxEZXRhaWxzOiBbXG4gICAgICAgICAgJ1phcmVqZXN0cm93YW5vIHd5d8WCYXN6Y3phasSFY2UgcMSZdGxlIGtvbXVuaWthdMOzdy4nLFxuICAgICAgICAgICdXeW11c3plbmllIHN0YcWCZWdvIHV0cnp5bXl3YW5pYSB3aWVyemNodSAoQWx3YXlzIG9uIFRvcCkuJ1xuICAgICAgICBdLFxuICAgICAgICBhcGlzQWJ1c2VkOiBbJ1NldFdpbmRvd1BvcycsICdTZXRGb3JlZ3JvdW5kV2luZG93J11cbiAgICAgIH0sXG4gICAgICBpbmZlY3Rpb25WZWN0b3I6IHtcbiAgICAgICAgY2hhbm5lbDogJ1BvYnJhbnkgcGxpayAvIFBvZGF0bm/Fm8SHIGFwbGlrYWNqaScsXG4gICAgICAgIG1ldGhvZDogbmV3VGhyZWF0VmVjdG9yIHx8ICdTa29tcHJvbWl0b3dhbnkgaW5zdGFsYXRvciBsdWIgZmHFgnN6eXd5IG1vZHXFgi4nLFxuICAgICAgICBwYXlsb2FkVHlwZTogJ1N0YW5kYWxvbmUgRXhlY3V0YWJsZScsXG4gICAgICAgIGV4cGxvaXRDaGFpbjogW1xuICAgICAgICAgICcxLiBVcnVjaG9taWVuaWUgesWCb8WbbGl3ZWdvIHBsaWt1LicsXG4gICAgICAgICAgJzIuIFd5d2/FgmFuaWUgYmxva2FkeSBva2llbmtvd2VqLicsXG4gICAgICAgICAgJzMuIE5ldXRyYWxpemFjamEgcHJ6ZXogU2VudGluZWwgU2hpZWxkLidcbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIG5ldXRyYWxpemF0aW9uRGV0YWlsczoge1xuICAgICAgICBtZXRob2ROYW1lOiAnRHluYW1pY3puYSBEZWthcGl0YWNqYSBQcm9jZXNvd2EnLFxuICAgICAgICBzbGF1Z2h0ZXJNZWNoYW5pc206IG5ld1RocmVhdE5ldXRyYWxpemF0aW9uIHx8ICdOdFN1c3BlbmRQcm9jZXNzIC0+IFNJR0tJTEwgLT4gQUNMIExvY2tvdXQnLFxuICAgICAgICBleGVjdXRpb25TdGVwczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHN0ZXA6IDEsXG4gICAgICAgICAgICBhY3Rpb246ICdXc3RyenltYW5pZSB3xIV0a8OzdyB3IFJBTScsXG4gICAgICAgICAgICB0YXJnZXRBcGk6ICdOdFN1c3BlbmRQcm9jZXNzJyxcbiAgICAgICAgICAgIHJlc3VsdDogJ1fEhXRraSB1bmllcnVjaG9taW9uZScsXG4gICAgICAgICAgICB0aW1lc3RhbXA6ICcwMDowMC4wMDInXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzdGVwOiAyLFxuICAgICAgICAgICAgYWN0aW9uOiAnVWLDs2ogcHJvY2VzdScsXG4gICAgICAgICAgICB0YXJnZXRBcGk6ICdUZXJtaW5hdGVQcm9jZXNzJyxcbiAgICAgICAgICAgIHJlc3VsdDogJ1Byb2NlcyB6bGlrd2lkb3dhbnknLFxuICAgICAgICAgICAgdGltZXN0YW1wOiAnMDA6MDAuMDA2J1xuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgcXVhcmFudGluZVByb29mOiAnU3RhdHVzOiBabGlrd2lkb3dhbnkgfCBXcGlzIGRvZGFueSBkbyByZWplc3RydScsXG4gICAgICAgIHB5dGhvbktpbGxTbmlwcGV0OiBgaW1wb3J0IHBzdXRpbCwgb3NcblxuZGVmIHB1cmdlX2N1c3RvbV90aHJlYXQoKTpcbiAgICBmb3IgcCBpbiBwc3V0aWwucHJvY2Vzc19pdGVyKFsncGlkJywgJ25hbWUnXSk6XG4gICAgICAgIGlmIFwiJHtuZXdUaHJlYXROYW1lLnRvTG93ZXJDYXNlKCl9XCIgaW4gKHAuaW5mb1snbmFtZSddIG9yICcnKS5sb3dlcigpOlxuICAgICAgICAgICAgcC5raWxsKClcbmBcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgY3VycmVudEN1c3RvbSA9IHNhZmVTdG9yYWdlLmdldDxOZXV0cmFsaXplZFRocmVhdFtdPignc2VudGluZWxfY3VzdG9tX3RocmVhdHMnLCBbXSk7XG4gICAgY29uc3QgdXBkYXRlZEN1c3RvbSA9IFtuZXdFbnRyeSwgLi4uY3VycmVudEN1c3RvbV07XG4gICAgc2FmZVN0b3JhZ2Uuc2V0KCdzZW50aW5lbF9jdXN0b21fdGhyZWF0cycsIHVwZGF0ZWRDdXN0b20pO1xuICAgIHNldFRocmVhdHMoWy4uLklOSVRJQUxfTkVVVFJBTElaRURfVEhSRUFUUywgLi4udXBkYXRlZEN1c3RvbV0pO1xuICAgIHNldEFjdGl2ZVRocmVhdElkKG5ld0VudHJ5LmlkKTtcbiAgICBzZXRJc0FkZE1vZGFsT3BlbihmYWxzZSk7XG5cbiAgICAvLyBSZXNldCBGb3JtXG4gICAgc2V0TmV3VGhyZWF0TmFtZSgnJyk7XG4gICAgc2V0TmV3VGhyZWF0RGVzYygnJyk7XG4gICAgc2V0TmV3VGhyZWF0QWdncmVzc2lvbignJyk7XG4gICAgc2V0TmV3VGhyZWF0VmVjdG9yKCcnKTtcbiAgICBzZXROZXdUaHJlYXROZXV0cmFsaXphdGlvbignJyk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRXhwb3J0Rm9yZW5zaWNSZXBvcnQgPSAoKSA9PiB7XG4gICAgY29uc3QgcmVwb3J0VGV4dCA9IGA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuU0VOVElORUwgRk9SRU5TSUMgRE9TU0lFUiAtIFJBUE9SVCBaTklTWkNaT05ZQ0ggWkFHUk/Fu0XFgyAmIFVCT0pVIE1BTFdBUkVcbkRhdGEgd3lnZW5lcm93YW5pYTogJHtuZXcgRGF0ZSgpLnRvVVRDU3RyaW5nKCl9XG5MaWN6YmEgem5ldXRyYWxpem93YW55Y2ggaW5jeWRlbnTDs3c6ICR7dGhyZWF0cy5sZW5ndGh9XG5aYXJlamVzdHJvd2FuZSBwcsOzYnkgcHJ6ZWNod3ljZW5pYSBmb2t1c3U6ICR7Zm9jdXNMb2dzLnJlZHVjZSgoYSwgYikgPT4gYSArIGIucmVwZWF0Q291bnQsIDApfSB6ZGFyemXFhFxuQmFyaWVyeSBPY2hyb25uZTogQUtUWVdORSAoTnRTdXNwZW5kUHJvY2VzcyArIFBFIEhlYWRlciBTYWJvdGFnZSArIEFDTCBEZW55KVxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuW0NaxJjFmsSGIEk6IEhJU1RPUklBIFBSWkVDSFdZVFlXQU5JQSBGT0tVU1UgT0tOQSAoRk9DVVMgSElKQUNLIEFUVEVNUFRTKV1cbiR7Zm9jdXNMb2dzLm1hcCgoZmwsIGlkeCkgPT4gYFxuIyR7aWR4ICsgMX0gWyR7ZmwudGltZXN0YW1wfV0gUHJvY2VzOiAke2ZsLnByb2Nlc3NOYW1lfSAoUElEOiAke2ZsLnBpZH0pXG4tIFR5dHXFgiBPa25hOiAke2ZsLndpbmRvd1RpdGxlfVxuLSBOYWR1xbx5d2FuZSBBUEk6ICR7ZmwuYWJ1c2VkQXBpfVxuLSBQb3ppb20gQWdyZXNqaTogJHtmbC5hZ2dyZXNzaW9uTGV2ZWx9IHwgV2VrdG9yOiAke2ZsLnNvdXJjZVZlY3Rvcn1cbi0gTGljemJhIHBvd3TDs3J6ZcWEIGF0YWt1IChSZWN1cnJlbmNlKTogJHtmbC5yZXBlYXRDb3VudH14XG4tIFN6Y3plZ8OzxYJ5IGJsb2thZHk6ICR7ZmwuZGV0YWlsc31cbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tYCkuam9pbignXFxuJyl9XG5cbltDWsSYxZrEhiBJSTogS0FSVE9URUtBIFpOSVNaQ1pPTllDSCBXSVJVU8OTV11cbiR7dGhyZWF0cy5tYXAoKHQsIGkpID0+IGBcbltJTkNJREVOVCAjJHtpICsgMX1dICR7dC5uYW1lfSAoJHt0LmNhdGVnb3J5fSlcbi0gU3RhdHVzIFVib2p1OiAke3Quc3RhdHVzfVxuLSBQb3ppb20gWmFncm/FvGVuaWE6ICR7dC5zZXZlcml0eX1cbi0gU0hBMjU2OiAke3Quc2hhMjU2SGFzaH1cbi0gRW50cm9waWE6ICR7dC5lbnRyb3B5fSAvIDguMDBcbi0gRGF0YSBuZXV0cmFsaXphY2ppOiAke3QubmV1dHJhbGl6ZWRBdH1cbi0gU3lzdGVteSBkb2NlbG93ZTogJHt0LnRhcmdldE9TLmpvaW4oJywgJyl9XG5cbjEuIE9QSVMgWkFHUk/Fu0VOSUE6XG4gICAke3QuZGVzY3JpcHRpb259XG5cbjIuIE1FQ0hBTklaTSBBR1JFU0pJIChKQUsgQVRBS09XQcWBKTpcbiAgIFR5dHXFgjogJHt0LmFnZ3Jlc3Npb25NZWNoYW5pc20udGl0bGV9XG4gICBQb2RzdW1vd2FuaWU6ICR7dC5hZ2dyZXNzaW9uTWVjaGFuaXNtLnN1bW1hcnl9XG4gICBOYWR1xbx5d2FuZSBBUEk6ICR7dC5hZ2dyZXNzaW9uTWVjaGFuaXNtLmFwaXNBYnVzZWQuam9pbignLCAnKX1cbiAgIFN6Y3plZ8OzxYJ5IHRlY2huaWN6bmU6XG4ke3QuYWdncmVzc2lvbk1lY2hhbmlzbS50ZWNobmljYWxEZXRhaWxzLm1hcChkID0+IGAgICAgICogJHtkfWApLmpvaW4oJ1xcbicpfVxuXG4zLiBTUE9Tw5NCIFdOSUtOScSYQ0lBIERPIEtPTVBVVEVSQSAoV0VLVE9SIElORkVLQ0pJKTpcbiAgIEthbmHFgjogJHt0LmluZmVjdGlvblZlY3Rvci5jaGFubmVsfVxuICAgTWV0b2RhOiAke3QuaW5mZWN0aW9uVmVjdG9yLm1ldGhvZH1cbiAgIFR5cCBQYXlsb2FkdTogJHt0LmluZmVjdGlvblZlY3Rvci5wYXlsb2FkVHlwZX1cbiAgIENWRTogJHt0LmluZmVjdGlvblZlY3Rvci52dWxuZXJhYmlsaXR5Q3ZlIHx8ICdCcmFrJ31cbiAgIMWBYcWEY3VjaCBpbmZla2NqaTpcbiR7dC5pbmZlY3Rpb25WZWN0b3IuZXhwbG9pdENoYWluLm1hcChjID0+IGAgICAgICR7Y31gKS5qb2luKCdcXG4nKX1cblxuNC4gTUVUT0RBIFVCT0pVIEkgTkVVVFJBTElaQUNKSTpcbiAgIE1ldG9kYTogJHt0Lm5ldXRyYWxpemF0aW9uRGV0YWlscy5tZXRob2ROYW1lfVxuICAgTWVjaGFuaXptOiAke3QubmV1dHJhbGl6YXRpb25EZXRhaWxzLnNsYXVnaHRlck1lY2hhbmlzbX1cbiAgIERvd8OzZCBrd2FyYW50YW5ueTogJHt0Lm5ldXRyYWxpemF0aW9uRGV0YWlscy5xdWFyYW50aW5lUHJvb2Z9XG4gICBTZWt3ZW5jamEgZWd6ZWt1Y2ppOlxuJHt0Lm5ldXRyYWxpemF0aW9uRGV0YWlscy5leGVjdXRpb25TdGVwcy5tYXAocyA9PiBgICAgICBLcm9rICR7cy5zdGVwfSBbJHtzLnRpbWVzdGFtcH1dOiAke3MuYWN0aW9ufSAtPiAke3MucmVzdWx0fWApLmpvaW4oJ1xcbicpfVxuXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuYCkuam9pbignXFxuJyl9XG5gO1xuXG4gICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtyZXBvcnRUZXh0XSwgeyB0eXBlOiAndGV4dC9wbGFpbjtjaGFyc2V0PXV0Zi04JyB9KTtcbiAgICBjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgIGNvbnN0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgYS5ocmVmID0gdXJsO1xuICAgIGEuZG93bmxvYWQgPSBgc2VudGluZWxfZm9yZW5zaWNfZG9zc2llcl93aXRoX2ZvY3VzX2xvZ3NfJHtEYXRlLm5vdygpfS50eHRgO1xuICAgIGEuY2xpY2soKTtcbiAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNiBmb250LXNhbnNcIj5cbiAgICAgIHsvKiBUb3AgSGVhZGVyIEJhbm5lciAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC02IHJvdW5kZWQtMnhsIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1zbGF0ZS05MDAgdmlhLXB1cnBsZS05NTAvNzAgdG8tc2xhdGUtOTAwIGJvcmRlciBib3JkZXItcHVycGxlLTgwMC80MCBzaGFkb3cteGwgcmVsYXRpdmUgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTAgcmlnaHQtMCBwLTggb3BhY2l0eS0xMCBwb2ludGVyLWV2ZW50cy1ub25lXCI+XG4gICAgICAgICAgPFNrdWxsIGNsYXNzTmFtZT1cInctNDggaC00OCB0ZXh0LXB1cnBsZS00MDBcIiAvPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgbWQ6ZmxleC1yb3cgaXRlbXMtc3RhcnQgbWQ6aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNCByZWxhdGl2ZSB6LTEwXCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yLjVcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicC0yIHJvdW5kZWQteGwgYmctcHVycGxlLTYwMC8yMCBib3JkZXIgYm9yZGVyLXB1cnBsZS01MDAvNDAgdGV4dC1wdXJwbGUtMzAwXCI+XG4gICAgICAgICAgICAgICAgPFNrdWxsIGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LXhsIHNtOnRleHQtMnhsIGZvbnQtYmxhY2sgdGV4dC13aGl0ZSB0cmFja2luZy10aWdodFwiPlxuICAgICAgICAgICAgICAgIEthcnRvdGVrYSBabmlzemN6b255Y2ggV2lydXPDs3cgJiBSZWplc3RyIFVib2p1XG4gICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIuNSBweS0wLjUgcm91bmRlZC1mdWxsIHRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZCBiZy1lbWVyYWxkLTk1MCB0ZXh0LWVtZXJhbGQtMzAwIGJvcmRlciBib3JkZXItZW1lcmFsZC04MDAvNjAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICA8U2hpZWxkQ2hlY2sgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgIHt0aHJlYXRzLmxlbmd0aH0gWmxpa3dpZG93YW55Y2ggWmFncm/FvGXFhFxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgc206dGV4dC1zbSB0ZXh0LXNsYXRlLTMwMCBtdC0yIG1heC13LTN4bFwiPlxuICAgICAgICAgICAgICBTemN6ZWfDs8WCb3dhIGJhemEgZGFueWNoIHpuZXV0cmFsaXpvd2FuZWdvIG1hbHdhcmUndSwgbmFrxYJhZGVrIGVrcmFub3d5Y2ggKEZsdXR0ZXIvV2luMzIpIGkgdHJvamFuw7N3LiBaYXdpZXJhIHJlamVzdHIgPHN0cm9uZz5oaXN0b3JpaSBwcnplY2h3eXR5d2FuaWEgZm9rdXN1IG9rbmE8L3N0cm9uZz4gKGxvY2FsU3RvcmFnZSkgemUgxZtsZWR6ZW5pZW0gcG93dGFyemFsbm/Fm2NpIGF0YWvDs3cuXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGZsZXgtd3JhcFwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc1JldHJvMTAwTW9kYWxPcGVuKHRydWUpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zLjUgcHktMiByb3VuZGVkLXhsIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1yZWQtNzAwIHZpYS1yb3NlLTcwMCB0by1wdXJwbGUtODAwIGhvdmVyOmZyb20tcmVkLTYwMCBob3Zlcjp0by1wdXJwbGUtNzAwIHRleHQtd2hpdGUgdGV4dC14cyBmb250LWJsYWNrIGZvbnQtbW9ubyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHNoYWRvdy1tZCBzaGFkb3ctcmVkLTk1MC84MCBib3JkZXIgYm9yZGVyLXJlZC00MDAvNjAgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgYW5pbWF0ZS1wdWxzZVwiXG4gICAgICAgICAgICAgIHRpdGxlPVwiUm96a2F6OiBaYWJpaiBpIHRyd2FsZSB1bmllc3prb2RsaXcgZG8gMTAwIGtvcGlpIHdzdGVjeiBrYcW8ZGUgbWFsd2FyZSwga3TDs3JlIG1pYcWCbyBraWVkeWtvbHdpZWsga29udGFrdCB6IHTEhSBhcGxpa2FjasSFXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPEZsYW1lIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQteWVsbG93LTMwMCBmaWxsLXllbGxvdy0zMDBcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj7imqEgVULDk0ogMTAwIEtPUElJIFdTVEVDWiAoMCBNUyk8L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc1BkZk1vZGFsT3Blbih0cnVlKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMy41IHB5LTIgcm91bmRlZC14bCBiZy1ncmFkaWVudC10by1yIGZyb20tcmVkLTYwMCB2aWEtcHVycGxlLTcwMCB0by1pbmRpZ28tNzAwIGhvdmVyOmZyb20tcmVkLTUwMCBob3Zlcjp0by1pbmRpZ28tNjAwIHRleHQtd2hpdGUgZm9udC1ibGFjayBmb250LW1vbm8gdGV4dC14cyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHNoYWRvdy1sZyBzaGFkb3ctcHVycGxlLTk1MC84MCBib3JkZXIgYm9yZGVyLXB1cnBsZS00MDAvNjAgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgYW5pbWF0ZS1wdWxzZVwiXG4gICAgICAgICAgICAgIHRpdGxlPVwiRWtzcG9ydHVqIHNmb3JtYXRvd2FueSwgb3N0ZW1wbG93YW55IGN6YXNvd28gcmFwb3J0IFBERiBkbyBjZWzDs3cgYXVkeXR1IGJlenBpZWN6ZcWEc3R3YSBpIGxvZ293YW5pYSBpbmN5ZGVudMOzdyAoSVNPL0lFQyAyNzAzNyAmIFJGQyAzMTYxKVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxGaWxlRG93biBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXllbGxvdy0zMDBcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj7wn5OEIFJBUE9SVCBQREYgKEZPUkVOU0lDUyk8L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBkb3dubG9hZENvbXBsZXRlSW1tdW5pemF0aW9uQnVuZGxlKHRocmVhdHMpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zLjUgcHktMiByb3VuZGVkLXhsIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1lbWVyYWxkLTYwMCB2aWEtdGVhbC02MDAgdG8taW5kaWdvLTYwMCBob3Zlcjpmcm9tLWVtZXJhbGQtNTAwIGhvdmVyOnRvLWluZGlnby01MDAgdGV4dC13aGl0ZSBmb250LWJsYWNrIGZvbnQtbW9ubyB0ZXh0LXhzIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgc2hhZG93LWxnIHNoYWRvdy1lbWVyYWxkLTk1MC84MCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNDAwLzYwIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJQb2JpZXJ6IGtvbXBsZXRueSBwYWtpZXQgaW1tdW5pemFjamkgKFdpbmRvd3MgR1BPIC8gRmlyZXdhbGwgLyBJRkVPIFJlZ2lzdHJ5KSBibG9rdWrEhWN5IHBvbm93bsSFIGluZmVrY2rEmVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxTaGllbGRDaGVjayBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWVtZXJhbGQtMzAwXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+8J+SiSBQQUtJRVQgSU1NVU5JWkFDSkkgKC5aSVApPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNFeHBvcnRNb2RhbE9wZW4odHJ1ZSl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMuNSBweS0yIHJvdW5kZWQteGwgYmctZ3JhZGllbnQtdG8tciBmcm9tLWN5YW4tNjAwIHRvLWJsdWUtNjAwIGhvdmVyOmZyb20tY3lhbi01MDAgaG92ZXI6dG8tYmx1ZS01MDAgdGV4dC1ibGFjayBmb250LWJsYWNrIGZvbnQtbW9ubyB0ZXh0LXhzIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgc2hhZG93LWxnIHNoYWRvdy1jeWFuLTk1MC84MCBib3JkZXIgYm9yZGVyLWN5YW4tNDAwIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJFa3Nwb3J0dWogbHViIGltcG9ydHVqIGJhesSZIHN5Z25hdHVyIGkgem5ldXRyYWxpem93YW55Y2ggemFncm/FvGXFhCB3IGZvcm1hY2llIEpTT04gZGxhIGlubnljaCBqZWRub3N0ZWsgU2VudGluZWxcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8U2hhcmUyIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtYmxhY2tcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj7wn5OBIFdTUMOTxYFEWklFTEVOSUUgQkFaWSBKU09OPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gZG93bmxvYWRUaHJlYXREYXRhYmFzZUpzb24odGhyZWF0cywgZm9jdXNMb2dzLCAnRlVMTF9USFJFQVRfTEVER0VSJyl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMgcHktMiByb3VuZGVkLXhsIGJnLXNsYXRlLTkwMCBob3ZlcjpiZy1zbGF0ZS04MDAgYm9yZGVyIGJvcmRlci1jeWFuLTUwMC80MCB0ZXh0LWN5YW4tMzAwIHRleHQteHMgZm9udC1ib2xkIGZvbnQtbW9ubyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJTenlia2kgcG9iw7NyIHBlxYJuZWogYmF6eSB3IEpTT05cIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8RmlsZUpzb24gY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1jeWFuLTQwMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPlBvYmllcnogLmpzb248L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc0FkZE1vZGFsT3Blbih0cnVlKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMy41IHB5LTIgcm91bmRlZC14bCBiZy1wdXJwbGUtNzAwIGhvdmVyOmJnLXB1cnBsZS02MDAgdGV4dC13aGl0ZSB0ZXh0LXhzIGZvbnQtYm9sZCBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBzaGFkb3ctbWQgc2hhZG93LXB1cnBsZS05MDAvNDAgYm9yZGVyIGJvcmRlci1wdXJwbGUtNDAwLzMwIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFBsdXNDaXJjbGUgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj5Eb2RhaiBXxYJhc255IEluY3lkZW50PC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlRXhwb3J0Rm9yZW5zaWNSZXBvcnR9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMgcHktMiByb3VuZGVkLXhsIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0zMDAgdGV4dC14cyBmb250LWJvbGQgZm9udC1tb25vIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICB0aXRsZT1cIlBvYmllcnogc3Vyb3d5IHpyenV0IHRla3N0b3d5XCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPERvd25sb2FkIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtcHVycGxlLTQwMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPlpyenV0ICgudHh0KTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogTmF2aWdhdGlvbiBUYWJzOiBWaXJ1cyBEb3NzaWVyIHZzIEZvY3VzIEhpamFjayBUcmFja2VyIHZzIEZyZXF1ZW5jeSBDaGFydCAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMi41IG10LTUgcHQtNCBib3JkZXItdCBib3JkZXItc2xhdGUtODAwLzgwIGZsZXgtd3JhcFwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYignQVRUQUNLX0ZSRVFVRU5DWV9DSEFSVCcpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtNCBweS0yIHJvdW5kZWQteGwgdGV4dC14cyBzbTp0ZXh0LXNtIGZvbnQtYm9sZCBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgcmVsYXRpdmUgJHtcbiAgICAgICAgICAgICAgYWN0aXZlVGFiID09PSAnQVRUQUNLX0ZSRVFVRU5DWV9DSEFSVCdcbiAgICAgICAgICAgICAgICA/ICdiZy1jeWFuLTYwMCB0ZXh0LXdoaXRlIHNoYWRvdy1sZyBzaGFkb3ctY3lhbi05NTAvNjAgYm9yZGVyIGJvcmRlci1jeWFuLTQwMC81MCdcbiAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05MDAvODAgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSBob3ZlcjpiZy1zbGF0ZS04MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8VHJlbmRpbmdVcCBjbGFzc05hbWU9e2B3LTQgaC00ICR7YWN0aXZlVGFiID09PSAnQVRUQUNLX0ZSRVFVRU5DWV9DSEFSVCcgPyAndGV4dC13aGl0ZScgOiAndGV4dC1jeWFuLTQwMCd9YH0gLz5cbiAgICAgICAgICAgIDxzcGFuPldZS1JFUyBDWsSYU1RPVExJV0/FmkNJIEFUQUvDk1cgVyBDWkFTSUUgKFJFQ0hBUlRTKTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IHJvdW5kZWQtZnVsbCBiZy1jeWFuLTk1MCB0ZXh0LWN5YW4tMzAwIGJvcmRlciBib3JkZXItY3lhbi03MDAgdGV4dC1bMTBweF0gZm9udC1tb25vIGZvbnQtYm9sZCBhbmltYXRlLXB1bHNlXCI+XG4gICAgICAgICAgICAgIExJVkVcbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYignVklSVVNfRE9TU0lFUicpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtNCBweS0yIHJvdW5kZWQteGwgdGV4dC14cyBzbTp0ZXh0LXNtIGZvbnQtYm9sZCBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgICAgYWN0aXZlVGFiID09PSAnVklSVVNfRE9TU0lFUidcbiAgICAgICAgICAgICAgICA/ICdiZy1wdXJwbGUtNjAwIHRleHQtd2hpdGUgc2hhZG93LWxnIHNoYWRvdy1wdXJwbGUtOTAwLzUwIGJvcmRlciBib3JkZXItcHVycGxlLTQwMC80MCdcbiAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05MDAvODAgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSBob3ZlcjpiZy1zbGF0ZS04MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8U2t1bGwgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5LQVJUT1RFS0EgV0lSVVPDk1cgKHt0aHJlYXRzLmxlbmd0aH0pPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCdGT0NVU19ISUpBQ0tfTE9HUycpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtNCBweS0yIHJvdW5kZWQteGwgdGV4dC14cyBzbTp0ZXh0LXNtIGZvbnQtYm9sZCBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgcmVsYXRpdmUgJHtcbiAgICAgICAgICAgICAgYWN0aXZlVGFiID09PSAnRk9DVVNfSElKQUNLX0xPR1MnXG4gICAgICAgICAgICAgICAgPyAnYmctcmVkLTcwMCB0ZXh0LXdoaXRlIHNoYWRvdy1sZyBzaGFkb3ctcmVkLTk1MC82MCBib3JkZXIgYm9yZGVyLXJlZC00MDAvNDAnXG4gICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTAwLzgwIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUgaG92ZXI6Ymctc2xhdGUtODAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwJ1xuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPENyb3NzaGFpciBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcmVkLTQwMFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5ISVNUT1JJQSBQUlpFQ0hXWVRZV0FOSUEgRk9LVVNVIE9LTkE8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0yIHB5LTAuNSByb3VuZGVkLWZ1bGwgYmctcmVkLTk1MCB0ZXh0LXJlZC0zMDAgYm9yZGVyIGJvcmRlci1yZWQtODAwIHRleHQtWzEwcHhdIGZvbnQtbW9ubyBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAge2ZvY3VzU3RhdHMudG90YWxBdHRlbXB0c30gYXRha8Ozd1xuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogRmlsdGVyICYgU2VhcmNoIEJhciAoT25seSBzaG93biB3aGVuIG9uIFZJUlVTX0RPU1NJRVIpICovfVxuICAgICAgICB7YWN0aXZlVGFiID09PSAnVklSVVNfRE9TU0lFUicgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtNCBncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy00IGdhcC0zIHB0LTMgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMC80MFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICAgICAgICA8U2VhcmNoIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1zbGF0ZS00MDAgYWJzb2x1dGUgbGVmdC0zIHRvcC0yLjVcIiAvPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTenVrYWogd2lydXNhLCBtZWNoYW5pem11IGFncmVzamkuLi5cIlxuICAgICAgICAgICAgICAgIHZhbHVlPXtzZWFyY2hRdWVyeX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiBzZXRTZWFyY2hRdWVyeShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHBsLTkgcHItMyBweS0xLjUgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAvODAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgdGV4dC14cyB0ZXh0LXdoaXRlIHBsYWNlaG9sZGVyLXNsYXRlLTUwMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXB1cnBsZS01MDBcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRDYXRlZ29yeX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiBzZXRTZWxlY3RlZENhdGVnb3J5KGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiRmlsdHJ1aiB3ZWTFgnVnIGthdGVnb3JpaVwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB4LTMgcHktMS41IHJvdW5kZWQteGwgYmctc2xhdGUtOTUwLzgwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHRleHQteHMgdGV4dC1zbGF0ZS0yMDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1wdXJwbGUtNTAwXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJBTExcIj5Xc3p5c3RraWUgS2F0ZWdvcmllPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlNjcmVlbiBMb2NrZXJcIj5TY3JlZW4gTG9ja2VyIChOYWvFgmFka2kgRWtyYW5vd2UpPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlRyb2phbiBPdmVybGF5XCI+VHJvamFuIE92ZXJsYXkgKFN6cGllZ293c2tpZSBOYWvFgmFka2kpPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlJhbnNvbXdhcmVcIj5SYW5zb213YXJlIChPa3VwICYgU3p5ZnJvd2FuaWUpPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlByb2Nlc3MgV2lwZXJcIj5Qcm9jZXNzIFdpcGVyIChEZXN0cnVrY2phIER5c2t1KTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJTdGVhbHRoIE1pbmVyXCI+U3RlYWx0aCBNaW5lciAoVWtyeXRhIEtvcGFya2EpPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlJvb3RraXQgSG9va1wiPlJvb3RraXQgSG9vayAoQmV6cGxpa293ZSk8L29wdGlvbj5cbiAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgIHZhbHVlPXtzZWxlY3RlZFNldmVyaXR5fVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHNldFNlbGVjdGVkU2V2ZXJpdHkoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJGaWx0cnVqIHdlZMWCdWcgcG96aW9tdSB6YWdyb8W8ZW5pYVwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB4LTMgcHktMS41IHJvdW5kZWQteGwgYmctc2xhdGUtOTUwLzgwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHRleHQteHMgdGV4dC1zbGF0ZS0yMDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1wdXJwbGUtNTAwXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJBTExcIj5Xc3p5c3RraWUgUG96aW9teSBSeXp5a2E8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiRVhUUkVNRVwiPkVYVFJFTUUgKEtyeXR5Y3puZSBabmlzemN6ZW5pZSk8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiQ1JJVElDQUxcIj5DUklUSUNBTCAoQmxva2FkYSBTeXN0ZW11KTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJISUdIXCI+SElHSCAoV3lzb2tpZSBaYWdyb8W8ZW5pZSk8L29wdGlvbj5cbiAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgIHZhbHVlPXtzZWxlY3RlZE9TfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHNldFNlbGVjdGVkT1MoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJGaWx0cnVqIHdlZMWCdWcgc3lzdGVtdSBvcGVyYWN5am5lZ29cIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC0zIHB5LTEuNSByb3VuZGVkLXhsIGJnLXNsYXRlLTk1MC84MCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCB0ZXh0LXhzIHRleHQtc2xhdGUtMjAwIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItcHVycGxlLTUwMFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiQUxMXCI+V3N6eXN0a2llIFN5c3RlbXkgKFdpbi9MaW51eC9NYWMpPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIndpbmRvd3NcIj5XaW5kb3dzIChXaW4zMiAvIEN0eXBlcyAvIE5URExMKTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJsaW51eFwiPkxpbnV4IChYMTEgLyBXYXlsYW5kIC8gU0lHS0lMTCk8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwibWFjb3NcIj5tYWNPUyAoUXVhcnR6IC8gQ29yZUdyYXBoaWNzKTwvb3B0aW9uPlxuICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBNYWluIFdvcmtzcGFjZSBMYXlvdXQgd2l0aCBBbmltYXRlZCBMaXZlIFRocmVhdCBQdWxzZSBTaWRlYmFyICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHhsOmZsZXgtcm93IGdhcC02IGl0ZW1zLXN0YXJ0XCI+XG4gICAgICAgIHsvKiBNYWluIFRhYnMgQ29udGFpbmVyICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMSB3LWZ1bGwgbWluLXctMFwiPlxuICAgICAgICAgIHsvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovfVxuICAgICAgICAgIHsvKiBUQUIgMDogUkVDSEFSVFMgQVRUQUNLIEZSRVFVRU5DWSBPVkVSIFRJTUUgU0VSSUVTIFZJU1VBTElaRVIgICAgICAgICAgICAgICAqL31cbiAgICAgICAgICB7LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL31cbiAgICAgICAgICB7YWN0aXZlVGFiID09PSAnQVRUQUNLX0ZSRVFVRU5DWV9DSEFSVCcgJiYgKFxuICAgICAgICAgICAgPEF0dGFja0ZyZXF1ZW5jeVRpbWVTZXJpZXNDaGFydFxuICAgICAgICAgICAgICBmb2N1c0xvZ3M9e2ZvY3VzTG9nc31cbiAgICAgICAgICAgICAgdGhyZWF0cz17dGhyZWF0c31cbiAgICAgICAgICAgICAgb25TaW11bGF0ZUF0dGFjaz17aGFuZGxlU2ltdWxhdGVGb2N1c0F0dGFja31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cblxuICAgICAgey8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi99XG4gICAgICB7LyogVEFCIDE6IEtBUlRPVEVLQSBaTklTWkNaT05ZQ0ggV0lSVVPDk1cgKE9SSUdJTkFMIERFRVAgRE9TU0lFUikgICAgICAgICAgICAgICovfVxuICAgICAgey8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi99XG4gICAgICB7YWN0aXZlVGFiID09PSAnVklSVVNfRE9TU0lFUicgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbGc6Z3JpZC1jb2xzLTEyIGdhcC02XCI+XG4gICAgICAgICAgey8qIExlZnQgQ29sdW1uOiBUaHJlYXRzIExpc3QgKDQgY29scykgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi00IHNwYWNlLXktM1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC14cyBmb250LW1vbm8gdGV4dC1zbGF0ZS00MDAgcHgtMVwiPlxuICAgICAgICAgICAgICA8c3Bhbj5aaWRlbnR5Zmlrb3dhbmUgWmFncm/FvGVuaWEgKHtmaWx0ZXJlZFRocmVhdHMubGVuZ3RofSk8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuPlN0YXR1czogMTAwJSBabGlrd2lkb3dhbmU8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTIuNSBtYXgtaC1bNzAwcHhdIG92ZXJmbG93LXktYXV0byBwci0xXCI+XG4gICAgICAgICAgICAgIHtmaWx0ZXJlZFRocmVhdHMubWFwKHRocmVhdCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IHRocmVhdC5pZCA9PT0gYWN0aXZlVGhyZWF0SWQ7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2V2ZXJpdHlDb2xvciA9IHtcbiAgICAgICAgICAgICAgICAgIEVYVFJFTUU6ICd0ZXh0LXJlZC00MDAgYmctcmVkLTk1MC82MCBib3JkZXItcmVkLTgwMC84MCcsXG4gICAgICAgICAgICAgICAgICBDUklUSUNBTDogJ3RleHQtb3JhbmdlLTQwMCBiZy1vcmFuZ2UtOTUwLzYwIGJvcmRlci1vcmFuZ2UtODAwLzgwJyxcbiAgICAgICAgICAgICAgICAgIEhJR0g6ICd0ZXh0LWFtYmVyLTQwMCBiZy1hbWJlci05NTAvNjAgYm9yZGVyLWFtYmVyLTgwMC84MCcsXG4gICAgICAgICAgICAgICAgICBNRURJVU06ICd0ZXh0LWJsdWUtNDAwIGJnLWJsdWUtOTUwLzYwIGJvcmRlci1ibHVlLTgwMC84MCcsXG4gICAgICAgICAgICAgICAgfVt0aHJlYXQuc2V2ZXJpdHldO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAga2V5PXt0aHJlYXQuaWR9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRocmVhdElkKHRocmVhdC5pZCl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHAtMy41IHJvdW5kZWQteGwgYm9yZGVyIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZFxuICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctcHVycGxlLTk1MC82MCBib3JkZXItcHVycGxlLTUwMC84MCBzaGFkb3ctbGcgc2hhZG93LXB1cnBsZS05NTAvNTAnXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05MDAvODAgYm9yZGVyLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS04MDAvNjAgaG92ZXI6Ym9yZGVyLXNsYXRlLTcwMCdcbiAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBqdXN0aWZ5LWJldHdlZW4gZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0yIGgtMiByb3VuZGVkLWZ1bGwgYmctcmVkLTUwMCBhbmltYXRlLXB1bHNlXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LXhzIHNtOnRleHQtc20gdGV4dC13aGl0ZSB0cnVuY2F0ZSBtYXgtdy1bMjAwcHhdXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHt0aHJlYXQubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgdGV4dC1bMTBweF0gZm9udC1tb25vIGZvbnQtYm9sZCBweC0xLjUgcHktMC41IHJvdW5kZWQgYm9yZGVyICR7c2V2ZXJpdHlDb2xvcn1gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt0aHJlYXQuc2V2ZXJpdHl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgbXQtMiB0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTEuNSBweS0wLjUgYmctc2xhdGUtOTUwIHJvdW5kZWQgdGV4dC1wdXJwbGUtMzAwIGZvbnQtbW9ubyB0ZXh0LVsxMHB4XVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3RocmVhdC5jYXRlZ29yeX1cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+4oCiPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwIGZvbnQtbW9ubyB0ZXh0LVsxMHB4XVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgU0hBOiB7dGhyZWF0LnNoYTI1Nkhhc2guc3Vic3RyaW5nKDAsIDgpfS4uLlxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTMwMCBtdC0yIGxpbmUtY2xhbXAtMiBsZWFkaW5nLXJlbGF4ZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7dGhyZWF0LmRlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0yLjUgcHQtMiBib3JkZXItdCBib3JkZXItc2xhdGUtODAwLzYwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC1lbWVyYWxkLTQwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Q2hlY2tDaXJjbGUyIGNsYXNzTmFtZT1cInctMyBoLTNcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAge3RocmVhdC5zdGF0dXN9XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0wLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIEJhZGFqIDxDaGV2cm9uUmlnaHQgY2xhc3NOYW1lPVwidy0zIGgtM1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pfVxuXG4gICAgICAgICAgICAgIHtmaWx0ZXJlZFRocmVhdHMubGVuZ3RoID09PSAwICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtOCB0ZXh0LWNlbnRlciBiZy1zbGF0ZS05MDAvNjAgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTQwMCB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgICAgICBOaWUgem5hbGV6aW9ubyB6YWdyb8W8ZcWEIHNwZcWCbmlhasSFY3ljaCBwb2RhbmUga3J5dGVyaWEgd3lzenVraXdhbmlhLlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogUmlnaHQgQ29sdW1uOiBEZWVwIEZvcmVuc2ljIERvc3NpZXIgKDggY29scykgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi04IHNwYWNlLXktNlwiPlxuICAgICAgICAgICAge2FjdGl2ZVRocmVhdCAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC02IHJvdW5kZWQtMnhsIGJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBzaGFkb3ctMnhsIHNwYWNlLXktNlwiPlxuICAgICAgICAgICAgICAgIHsvKiBIZWFkZXIgRGV0YWlscyAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgc206aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNCBwYi01IGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1vbm8gcHgtMiBweS0wLjUgcm91bmRlZCBiZy1yZWQtOTUwIHRleHQtcmVkLTMwMCBib3JkZXIgYm9yZGVyLXJlZC04MDAvODAgZm9udC1ib2xkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aXZlVGhyZWF0LmNhdGVnb3J5LnRvVXBwZXJDYXNlKCl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIHB4LTIgcHktMC41IHJvdW5kZWQgYmctcHVycGxlLTk1MCB0ZXh0LXB1cnBsZS0zMDAgYm9yZGVyIGJvcmRlci1wdXJwbGUtODAwLzYwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBPUzoge2FjdGl2ZVRocmVhdC50YXJnZXRPUy5qb2luKCcgLyAnKS50b1VwcGVyQ2FzZSgpfVxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbW9ubyBweC0yIHB5LTAuNSByb3VuZGVkIGJnLWVtZXJhbGQtOTUwIHRleHQtZW1lcmFsZC0zMDAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgRU5UUk9QSUE6IHthY3RpdmVUaHJlYXQuZW50cm9weX1cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXhsIHNtOnRleHQtMnhsIGZvbnQtYmxhY2sgdGV4dC13aGl0ZSBtdC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAge2FjdGl2ZVRocmVhdC5uYW1lfVxuICAgICAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgICAgICB7YWN0aXZlVGhyZWF0LmFsaWFzICYmIChcbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtcHVycGxlLTQwMCBmb250LW1vbm8gbXQtMC41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBBbGlhczoge2FjdGl2ZVRocmVhdC5hbGlhc31cbiAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgey8qIEFjdGlvbiBCdXR0b25zICovfVxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBmbGV4LXdyYXBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvd25sb2FkTmV1dHJhbGl6ZWRUaHJlYXRzUGRmKHRocmVhdHMsIGZvY3VzTG9ncywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXBvcnRUaXRsZTogYFNFTlRJTkVMIEZPUkVOU0lDIERPU1NJRVI6ICR7YWN0aXZlVGhyZWF0Lm5hbWUudG9VcHBlckNhc2UoKX1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFRocmVhdElkczogW2FjdGl2ZVRocmVhdC5pZF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMy41IHB5LTIgcm91bmRlZC14bCBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIGJvcmRlciBib3JkZXItcHVycGxlLTUwMC80MCB0ZXh0LXB1cnBsZS0yMDAgdGV4dC14cyBzbTp0ZXh0LXNtIGZvbnQtYm9sZCBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBzaGFkb3ctbWQgc2hhZG93LWJsYWNrLzUwIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIld5Z2VuZXJ1aiBpIHBvYmllcnogb3N0ZW1wbG93YW55IGN6YXNvd28gcmFwb3J0IFBERiBkZWR5a293YW55IGRsYSB0ZWdvIGtvbmtyZXRuZWdvIHphZ3JvxbxlbmlhXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxGaWxlRG93biBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXB1cnBsZS00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkRvc3NpZXIgUERGPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlU3RhcnRMaXZlU2xhdWdodGVyKGFjdGl2ZVRocmVhdCl9XG4gICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3NpbXVsYXRpbmdUaHJlYXRJZCA9PT0gYWN0aXZlVGhyZWF0LmlkfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMiByb3VuZGVkLXhsIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1yZWQtNjAwIHZpYS1waW5rLTYwMCB0by1wdXJwbGUtNjAwIGhvdmVyOmZyb20tcmVkLTUwMCBob3Zlcjp0by1wdXJwbGUtNTAwIHRleHQtd2hpdGUgdGV4dC14cyBzbTp0ZXh0LXNtIGZvbnQtYm9sZCBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgc2hhZG93LWxnIHNoYWRvdy1yZWQtOTUwLzYwIGJvcmRlciBib3JkZXItcmVkLTQwMC80MCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8RmxhbWUgY2xhc3NOYW1lPXtgdy00IGgtNCAke3NpbXVsYXRpbmdUaHJlYXRJZCA9PT0gYWN0aXZlVGhyZWF0LmlkID8gJ2FuaW1hdGUtYm91bmNlIHRleHQteWVsbG93LTMwMCcgOiAnJ31gfSAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAge3NpbXVsYXRpbmdUaHJlYXRJZCA9PT0gYWN0aXZlVGhyZWF0LmlkID8gJ1Ryd2EgVWLDs2ogbmEgxbt5d28uLi4nIDogJ1N5bXVsdWogVWLDs2ogbmEgxbt5d28nfVxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHsvKiBMaXZlIFNsYXVnaHRlciBUZXJtaW5hbCBCb3ggKGlmIHNpbXVsYXRpbmcpICovfVxuICAgICAgICAgICAgICAgIHtzaW11bGF0aW5nVGhyZWF0SWQgPT09IGFjdGl2ZVRocmVhdC5pZCAmJiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLXhsIGJnLWJsYWNrIGJvcmRlci0yIGJvcmRlci1yZWQtNTAwLzgwIHNoYWRvdy0yeGwgZm9udC1tb25vIHRleHQteHMgdGV4dC1zbGF0ZS0yMDAgc3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHBiLTIgYm9yZGVyLWIgYm9yZGVyLXJlZC05MDAvNjAgdGV4dC1yZWQtNDAwIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8U2t1bGwgY2xhc3NOYW1lPVwidy00IGgtNCBhbmltYXRlLXNwaW4gdGV4dC1yZWQtNTAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIEFVVE9OT01JQ1pOWSBQUk9UT0vDk8WBIFVCT0pVIFcgVE9LVSAoTElWRSBTRU5USU5FTCBFWEVDVVRJT04pXG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGJnLXJlZC05NTAgcHgtMiBweS0wLjUgcm91bmRlZCBib3JkZXIgYm9yZGVyLXJlZC04MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIEtyb2s6IHtzaW11bGF0aW9uQ3VycmVudFN0ZXB9XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41IG1heC1oLTQ4IG92ZXJmbG93LXktYXV0byBwdC0xIHRleHQtc2xhdGUtMzAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAge3NpbXVsYXRpb25Mb2dzLm1hcCgobG9nLCBpZHgpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpZHh9IGNsYXNzTmFtZT17bG9nLmluY2x1ZGVzKCdbS1JPSycpID8gJ3RleHQteWVsbG93LTQwMCBmb250LWJvbGQnIDogbG9nLmluY2x1ZGVzKCdbUFVSR0UnKSA/ICd0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtYm9sZCcgOiAndGV4dC1zbGF0ZS00MDAnfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge2xvZ31cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICB7LyogRGVzY3JpcHRpb24gKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAvODAgdGV4dC14cyBzbTp0ZXh0LXNtIHRleHQtc2xhdGUtMzAwIGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1wdXJwbGUtNDAwIGZvbnQtYm9sZCBibG9jayBtYi0xIGZvbnQtbW9ubyB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgICAgICAgIFtQUk9GSUwgV1lXSUFET1dDWlkgLyBGT1JFTlNJQyBPVkVSVklFV106XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICB7YWN0aXZlVGhyZWF0LmRlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIFR3byBDb2x1bW4gTGF5b3V0OiBBZ2dyZXNzaW9uIE1lY2hhbmlzbSAmIEluZmVjdGlvbiBWZWN0b3IgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC01XCI+XG4gICAgICAgICAgICAgICAgICB7LyogMS4gQWdncmVzc2lvbiBNZWNoYW5pc20gKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLXhsIGJnLXJlZC05NTAvMjAgYm9yZGVyIGJvcmRlci1yZWQtODAwLzQwIHNwYWNlLXktM1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMiB0ZXh0LXJlZC00MDAgZm9udC1ib2xkIHRleHQteHMgc206dGV4dC1zbVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxTaGllbGRBbGVydCBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5NRUNIQU5JWk0gQUdSRVNKSSAoSkFLIEFUQUtVSkUpPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXdoaXRlIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgICAgICAgIHthY3RpdmVUaHJlYXQuYWdncmVzc2lvbk1lY2hhbmlzbS50aXRsZX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTMwMCBsZWFkaW5nLXJlbGF4ZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7YWN0aXZlVGhyZWF0LmFnZ3Jlc3Npb25NZWNoYW5pc20uc3VtbWFyeX1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjUgcHQtMVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtbW9ubyB0ZXh0LXJlZC0zMDAgZm9udC1ib2xkIGJsb2NrXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBLbHVjem93ZSBEemlhxYJhbmlhIE5pc3pjesSFY2U6XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJzcGFjZS15LTEgdGV4dC14cyB0ZXh0LXNsYXRlLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGl2ZVRocmVhdC5hZ2dyZXNzaW9uTWVjaGFuaXNtLnRlY2huaWNhbERldGFpbHMubWFwKChkZXRhaWwsIGlkeCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkga2V5PXtpZHh9IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtc3RhcnQgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcmVkLTQwMCBmb250LW1vbm8gZm9udC1ib2xkXCI+4oCiPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntkZXRhaWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIHRleHQtc2xhdGUtNDAwIGJsb2NrIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIE5hZHXFvHl3YW5lIEZ1bmtjamUgQVBJOlxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aXZlVGhyZWF0LmFnZ3Jlc3Npb25NZWNoYW5pc20uYXBpc0FidXNlZC5tYXAoKGFwaSwgaWR4KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGtleT17aWR4fSBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gcHgtMiBweS0wLjUgcm91bmRlZCBiZy1yZWQtOTUwIHRleHQtcmVkLTMwMCBib3JkZXIgYm9yZGVyLXJlZC05MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7YXBpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgey8qIDIuIEluZmVjdGlvbiBWZWN0b3IgKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLXhsIGJnLXB1cnBsZS05NTAvMjAgYm9yZGVyIGJvcmRlci1wdXJwbGUtODAwLzQwIHNwYWNlLXktM1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMiB0ZXh0LXB1cnBsZS00MDAgZm9udC1ib2xkIHRleHQteHMgc206dGV4dC1zbVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxaYXAgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+U1BPU8OTQiBXTklLTknEmENJQSBETyBLT01QVVRFUkE8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtd2hpdGUgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgICAgICAgS2FuYcWCOiB7YWN0aXZlVGhyZWF0LmluZmVjdGlvblZlY3Rvci5jaGFubmVsfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtMzAwIGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+TWV0b2RhOjwvc3Ryb25nPiB7YWN0aXZlVGhyZWF0LmluZmVjdGlvblZlY3Rvci5tZXRob2R9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cblxuICAgICAgICAgICAgICAgICAgICB7YWN0aXZlVGhyZWF0LmluZmVjdGlvblZlY3Rvci52dWxuZXJhYmlsaXR5Q3ZlICYmIChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1hbWJlci0zMDAgZm9udC1tb25vIGJnLWFtYmVyLTk1MC80MCBwLTIgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLWFtYmVyLTgwMC82MFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz5Qb2RhdG5vxZvEhyBDVkU6PC9zdHJvbmc+IHthY3RpdmVUaHJlYXQuaW5mZWN0aW9uVmVjdG9yLnZ1bG5lcmFiaWxpdHlDdmV9XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNSBwdC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1tb25vIHRleHQtcHVycGxlLTMwMCBmb250LWJvbGQgYmxvY2tcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIMWBYcWEY3VjaCBXbmlrbmnEmWNpYSAoRXhwbG9pdCBDaGFpbik6XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xIHRleHQteHMgdGV4dC1zbGF0ZS0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3RpdmVUaHJlYXQuaW5mZWN0aW9uVmVjdG9yLmV4cGxvaXRDaGFpbi5tYXAoKHN0ZXAsIGlkeCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aWR4fSBjbGFzc05hbWU9XCJwLTEuNSBiZy1zbGF0ZS05NTAvNjAgcm91bmRlZCBib3JkZXIgYm9yZGVyLXB1cnBsZS05MDAvNDAgZm9udC1tb25vIHRleHQtWzExcHhdXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3N0ZXB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7LyogMy4gTmV1dHJhbGl6YXRpb24gJiBTbGF1Z2h0ZXIgRXhlY3V0aW9uIExvZyAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNSByb3VuZGVkLXhsIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtOTAwLzQwIHNwYWNlLXktNFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTIgdGV4dC1lbWVyYWxkLTQwMCBmb250LWJvbGQgdGV4dC14cyBzbTp0ZXh0LXNtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPENoZWNrQ2lyY2xlMiBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5QUk9DRURVUkEgVUJPSlUgJiBORVVUUkFMSVpBQ0pJIChTTEFVR0hURVIgQ0hBSU4pPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1vbm8gcHgtMiBweS0wLjUgcm91bmRlZCBiZy1lbWVyYWxkLTk1MCB0ZXh0LWVtZXJhbGQtMzAwIGJvcmRlciBib3JkZXItZW1lcmFsZC04MDAgZm9udC1ib2xkXCI+XG4gICAgICAgICAgICAgICAgICAgICAge2FjdGl2ZVRocmVhdC5zdGF0dXN9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtMzAwIGZvbnQtbW9ub1wiPnthY3RpdmVUaHJlYXQubmV1dHJhbGl6YXRpb25EZXRhaWxzLm1ldGhvZE5hbWV9Ojwvc3Ryb25nPiB7YWN0aXZlVGhyZWF0Lm5ldXRyYWxpemF0aW9uRGV0YWlscy5zbGF1Z2h0ZXJNZWNoYW5pc219XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgey8qIFN0ZXBzIFRhYmxlICovfVxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1tb25vIHRleHQtc2xhdGUtNDAwIGZvbnQtYm9sZCBibG9ja1wiPlxuICAgICAgICAgICAgICAgICAgICAgIEZvcmVuc2ljIEV4ZWN1dGlvbiBTdGVwczpcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41IGZvbnQtbW9ubyB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgICAgICAgICAge2FjdGl2ZVRocmVhdC5uZXV0cmFsaXphdGlvbkRldGFpbHMuZXhlY3V0aW9uU3RlcHMubWFwKHN0ZXAgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e3N0ZXAuc3RlcH0gY2xhc3NOYW1lPVwicC0yLjUgYmctc2xhdGUtOTAwLzkwIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBzbTppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy01IGgtNSByb3VuZGVkLWZ1bGwgYmctZW1lcmFsZC05MDAvODAgdGV4dC1lbWVyYWxkLTMwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBmb250LWJvbGQgdGV4dC1bMTBweF1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzdGVwLnN0ZXB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMjAwXCI+e3N0ZXAuYWN0aW9ufTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1yaWdodCBzbTp0ZXh0LXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1lbWVyYWxkLTQwMCBmb250LXNlbWlib2xkXCI+e3N0ZXAucmVzdWx0fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTUwMCBtbC0yXCI+KHtzdGVwLnRpbWVzdGFtcH0pPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICB7LyogUHl0aG9uIEtpbGwgQ29kZSBTbmlwcGV0ICovfVxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdC0yIHNwYWNlLXktMlwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIHRleHQtcHVycGxlLTMwMCBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZpbGVDb2RlIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIFNrcnlwdCBFa3N0ZXJtaW5hY2ppIHcgUHl0aG9uaWUgKFJlYWR5LVRvLVJ1bik6XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZUNvcHlDb2RlKGFjdGl2ZVRocmVhdC5pZCwgYWN0aXZlVGhyZWF0Lm5ldXRyYWxpemF0aW9uRGV0YWlscy5weXRob25LaWxsU25pcHBldCl9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yLjUgcHktMSByb3VuZGVkLWxnIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0zMDAgaG92ZXI6dGV4dC13aGl0ZSB0ZXh0LXhzIGZvbnQtbW9ubyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSB0cmFuc2l0aW9uLWNvbG9ycyBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAge2NvcGllZENvZGVJZCA9PT0gYWN0aXZlVGhyZWF0LmlkID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDaGVjayBjbGFzc05hbWU9XCJ3LTMgaC0zIHRleHQtZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC00MDBcIj5Ta29waW93YW5vPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENvcHkgY2xhc3NOYW1lPVwidy0zIGgtM1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+S29waXVqIC5weTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8cHJlIGNsYXNzTmFtZT1cInAtMyBiZy1ibGFjay85MCByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtODAwIGZvbnQtbW9ubyB0ZXh0LXhzIHRleHQtZW1lcmFsZC0zMDAgb3ZlcmZsb3cteC1hdXRvXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGNvZGU+e2FjdGl2ZVRocmVhdC5uZXV0cmFsaXphdGlvbkRldGFpbHMucHl0aG9uS2lsbFNuaXBwZXR9PC9jb2RlPlxuICAgICAgICAgICAgICAgICAgICA8L3ByZT5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cblxuICAgICAgey8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi99XG4gICAgICB7LyogVEFCIDI6IEhJU1RPUklBIFBSWkVDSFdZVFlXQU5JQSBGT0tVU1UgT0tOQSAoTE9DQUxTVE9SQUdFIFBFUlNJU1RFTkNFKSAgICAgKi99XG4gICAgICB7LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL31cbiAgICAgIHthY3RpdmVUYWIgPT09ICdGT0NVU19ISUpBQ0tfTE9HUycgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNlwiPlxuICAgICAgICAgIHsvKiBRdWljayBNZXRyaWNzIEJhciBvbiBGb2N1cyBIaWphY2tpbmcgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIHNtOmdyaWQtY29scy00IGdhcC00XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLTJ4bCBiZy1zbGF0ZS05MDAvOTAgYm9yZGVyIGJvcmRlci1yZWQtNjAwLzQwIHNoYWRvdy1sZ1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIHRleHQtc2xhdGUtNDAwXCI+xYHEhENaTkEgTElDWkJBIEFUQUvDk1c8L3NwYW4+XG4gICAgICAgICAgICAgICAgPEFsZXJ0T2N0YWdvbiBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcmVkLTQwMFwiIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYmxhY2sgdGV4dC13aGl0ZSBmb250LW1vbm8gbXQtMVwiPlxuICAgICAgICAgICAgICAgIHtmb2N1c1N0YXRzLnRvdGFsQXR0ZW1wdHN9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtcmVkLTMwMCBmb250LW1vbm8gbXQtMC41XCI+XG4gICAgICAgICAgICAgICAgUHJ6ZWNod3ljb255Y2ggdyBsb2NpZSBwcnpleiBTZW50aW5lbFxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLTJ4bCBiZy1zbGF0ZS05MDAvOTAgYm9yZGVyIGJvcmRlci1vcmFuZ2UtNTAwLzQwIHNoYWRvdy1sZ1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIHRleHQtc2xhdGUtNDAwXCI+QUdSRVNZV05FIFBST0NFU1k8L3NwYW4+XG4gICAgICAgICAgICAgICAgPFNrdWxsIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1vcmFuZ2UtNDAwXCIgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ibGFjayB0ZXh0LXdoaXRlIGZvbnQtbW9ubyBtdC0xXCI+XG4gICAgICAgICAgICAgICAge2ZvY3VzU3RhdHMudW5pcXVlUHJvY2Vzc2VzfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LW9yYW5nZS0zMDAgZm9udC1tb25vIG10LTAuNVwiPlxuICAgICAgICAgICAgICAgIFVuaWthbG5lIGJpbmFybmUgxbpyw7NkxYJhIHpha8WCw7NjZcWEXG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQtMnhsIGJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLXB1cnBsZS01MDAvNDAgc2hhZG93LWxnXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1vbm8gdGV4dC1zbGF0ZS00MDBcIj5OQUpDWsSYU1RTWlkgQUdSRVNPUjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8QmFyQ2hhcnQzIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1wdXJwbGUtNDAwXCIgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJsYWNrIHRleHQtcHVycGxlLTMwMCBmb250LW1vbm8gbXQtMSB0cnVuY2F0ZVwiIHRpdGxlPXtmb2N1c1N0YXRzLnRvcEF0dGFja2VyPy5wcm9jZXNzTmFtZX0+XG4gICAgICAgICAgICAgICAge2ZvY3VzU3RhdHMudG9wQXR0YWNrZXI/LnByb2Nlc3NOYW1lIHx8ICdCcmFrJ31cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDAgZm9udC1tb25vIG10LTAuNVwiPlxuICAgICAgICAgICAgICAgIFBvd3TDs3J6ZcWEIGF0YWt1OiB7Zm9jdXNTdGF0cy50b3BBdHRhY2tlcj8ucmVwZWF0Q291bnQgfHwgMH14XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQtMnhsIGJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNTAwLzQwIHNoYWRvdy1sZ1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIHRleHQtc2xhdGUtNDAwXCI+U1RBVFVTIEJBUklFUlkgRk9LVVNVPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxTaGllbGRDaGVjayBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtYmxhY2sgdGV4dC1lbWVyYWxkLTMwMCBmb250LW1vbm8gbXQtMSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0yIGgtMiByb3VuZGVkLWZ1bGwgYmctZW1lcmFsZC00MDAgYW5pbWF0ZS1waW5nXCIgLz5cbiAgICAgICAgICAgICAgICBBS1RZV05BIChMT0NBTFNUT1JBR0UpXG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIGZvbnQtbW9ubyBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgICBQYW1pxJnEhyBzdGHFgmE6IHtmb2N1c0xvZ3MubGVuZ3RofSB3cGlzw7N3XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogQWN0aW9uIFRvb2xiYXIgJiBGaWx0ZXJzICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQtMnhsIGJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBzaGFkb3cteGwgZmxleCBmbGV4LWNvbCBtZDpmbGV4LXJvdyBpdGVtcy1zdHJldGNoIG1kOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgZmxleC0xIGZsZXgtd3JhcFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIGZsZXgtMSBtaW4tdy1bMjIwcHhdXCI+XG4gICAgICAgICAgICAgICAgPFNlYXJjaCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtc2xhdGUtNDAwIGFic29sdXRlIGxlZnQtMyB0b3AtMi41XCIgLz5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRmlsdHJ1aiBwbyBwcm9jZXNpZSwgQVBJLCB0eXR1bGUgb2tuYS4uLlwiXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17Zm9jdXNTZWFyY2h9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiBzZXRGb2N1c1NlYXJjaChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcGwtOSBwci0zIHB5LTEuNSByb3VuZGVkLXhsIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCB0ZXh0LXhzIHRleHQtd2hpdGUgcGxhY2Vob2xkZXItc2xhdGUtNTAwIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItcmVkLTUwMFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgIHZhbHVlPXtmb2N1c0ZpbHRlckxldmVsfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHNldEZvY3VzRmlsdGVyTGV2ZWwoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJGaWx0cnVqIHBvemlvbSBhZ3Jlc2ppXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zIHB5LTEuNSByb3VuZGVkLXhsIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCB0ZXh0LXhzIHRleHQtc2xhdGUtMjAwIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItcmVkLTUwMFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiQUxMXCI+V3N6eXN0a2llIFBvemlvbXkgUnl6eWthPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkNSSVRJQ0FMXCI+S3J5dHljem5lIChDUklUSUNBTCk8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiSElHSFwiPld5c29raWUgKEhJR0gpPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIk1FRElVTVwiPsWacmVkbmllIChNRURJVU0pPC9vcHRpb24+XG4gICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgZmxleC13cmFwXCI+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVTaW11bGF0ZUZvY3VzQXR0YWNrfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMuNSBweS0xLjUgcm91bmRlZC14bCBiZy1yZWQtNzAwIGhvdmVyOmJnLXJlZC02MDAgdGV4dC13aGl0ZSB0ZXh0LXhzIGZvbnQtbW9ubyBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBib3JkZXIgYm9yZGVyLXJlZC01MDAvNDAgc2hhZG93LW1kIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICB0aXRsZT1cIldzdHJ6eWtuaWogc3ltdWxvd2FuxIUgcHLDs2LEmSBwcnplasSZY2lhIGZva3VzdSB3IHRsZVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8Q3Jvc3NoYWlyIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQteWVsbG93LTMwMFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+U3ltdWx1aiBQcsOzYsSZIFByemVjaHd5Y2VuaWE8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBmb2N1c1RyYWNrZXIucmVzZXRUb0RlZmF1bHRzKCl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0xLjUgcm91bmRlZC14bCBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHRleHQtc2xhdGUtMzAwIHRleHQteHMgZm9udC1tb25vIGZvbnQtc2VtaWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgICAgdGl0bGU9XCJQcnp5d3LDs8SHIHd6b3Jjb3dlIGxvZ2kgZm9yZW5zaWNcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPFJlZnJlc2hDdyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXNsYXRlLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+V3pvcmNlPC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gZm9jdXNUcmFja2VyLmNsZWFySGlzdG9yeSgpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMgcHktMS41IHJvdW5kZWQteGwgYmctemluYy05MDAgaG92ZXI6YmctcmVkLTk1MC84MCBib3JkZXIgYm9yZGVyLXJlZC05MDAvNjAgdGV4dC1yZWQtMzAwIHRleHQteHMgZm9udC1tb25vIGZvbnQtc2VtaWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgICAgdGl0bGU9XCJXeWN6ecWbxIcgY2HFgsSFIGhpc3RvcmnEmSB6IGxvY2FsU3RvcmFnZVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8VHJhc2gyIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtcmVkLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+V3ljennFm8SHIExvZ2k8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogTWFpbiBGb2N1cyBMb2dzIFRhYmxlICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwLzkwIHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItc2xhdGUtODAwIG92ZXJmbG93LWhpZGRlbiBzaGFkb3ctMnhsXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCBiZy1zbGF0ZS05NTAvODAgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTIgdGV4dC14cyBmb250LW1vbm8gdGV4dC1zbGF0ZS0zMDBcIj5cbiAgICAgICAgICAgICAgICA8Q2xvY2sgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXJlZC00MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYm9sZFwiPlJFSkVTVFIgUE9XVEFSWkFMTk/FmkNJIEFUQUvDk1cgRk9LVVNVIChMT0NBTFNUT1JBR0UgTE9HUyk8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDBcIj4oe2ZpbHRlcmVkRm9jdXNMb2dzLmxlbmd0aH0gaW5jeWRlbnTDs3cpPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICAgICAgS2x1Y3ogU3RvcmFnZTogPGNvZGUgY2xhc3NOYW1lPVwidGV4dC1wdXJwbGUtMzAwXCI+c2VudGluZWxfZm9jdXNfaGlqYWNrX2hpc3Rvcnk8L2NvZGU+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm92ZXJmbG93LXgtYXV0b1wiPlxuICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwidy1mdWxsIHRleHQtbGVmdCBmb250LW1vbm8gdGV4dC14c1wiPlxuICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgIDx0ciBjbGFzc05hbWU9XCJiZy1zbGF0ZS05NTAvNTAgdGV4dC1zbGF0ZS00MDAgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMC84MFwiPlxuICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHktMyBweC00XCI+VElNRVNUQU1QPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInB5LTMgcHgtNFwiPlBST0NFUyAmIFBJRDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJweS0zIHB4LTRcIj5UWVRVxYEgT0tOQSAoSFdORCk8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHktMyBweC00XCI+TkFEVcW7WVdBTkUgQVBJPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInB5LTMgcHgtNFwiPlBPWklPTTwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJweS0zIHB4LTQgdGV4dC1jZW50ZXJcIj5QT1dUw5NSWkVOSUE8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHktMyBweC00XCI+U1RBVFVTPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInB5LTMgcHgtNCB0ZXh0LXJpZ2h0XCI+QUtDSkE8L3RoPlxuICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgIDx0Ym9keSBjbGFzc05hbWU9XCJkaXZpZGUteSBkaXZpZGUtc2xhdGUtODAwLzYwXCI+XG4gICAgICAgICAgICAgICAgICB7ZmlsdGVyZWRGb2N1c0xvZ3MubWFwKChsb2cpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IHNlbGVjdGVkTG9nSWQgPT09IGxvZy5pZDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGV2ZWxCYWRnZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICBDUklUSUNBTDogJ2JnLXJlZC05NTAgdGV4dC1yZWQtMzAwIGJvcmRlci1yZWQtODAwJyxcbiAgICAgICAgICAgICAgICAgICAgICBISUdIOiAnYmctb3JhbmdlLTk1MCB0ZXh0LW9yYW5nZS0zMDAgYm9yZGVyLW9yYW5nZS04MDAnLFxuICAgICAgICAgICAgICAgICAgICAgIE1FRElVTTogJ2JnLWJsdWUtOTUwIHRleHQtYmx1ZS0zMDAgYm9yZGVyLWJsdWUtODAwJ1xuICAgICAgICAgICAgICAgICAgICB9W2xvZy5hZ2dyZXNzaW9uTGV2ZWxdO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgPFJlYWN0LkZyYWdtZW50IGtleT17bG9nLmlkfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2VsZWN0ZWRMb2dJZChpc1NlbGVjdGVkID8gbnVsbCA6IGxvZy5pZCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGhvdmVyOmJnLXNsYXRlLTgwMC81MCB0cmFuc2l0aW9uLWNvbG9ycyBjdXJzb3ItcG9pbnRlciAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWQgPyAnYmctcHVycGxlLTk1MC80MCcgOiAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTMuNSBweC00IHRleHQtc2xhdGUtMzAwIHdoaXRlc3BhY2Utbm93cmFwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTEuNSBoLTEuNSByb3VuZGVkLWZ1bGwgYmctcmVkLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57bG9nLnRpbWVzdGFtcH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTMuNSBweC00IGZvbnQtYm9sZCB0ZXh0LXdoaXRlIHdoaXRlc3BhY2Utbm93cmFwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXB1cnBsZS0zMDBcIj57bG9nLnByb2Nlc3NOYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwIHRleHQtWzEwcHhdIGZvbnQtbm9ybWFsXCI+W3tsb2cucGlkfV08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTMuNSBweC00IHRleHQtc2xhdGUtMzAwIG1heC13LVsyMDBweF0gdHJ1bmNhdGVcIiB0aXRsZT17bG9nLndpbmRvd1RpdGxlfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bG9nLndpbmRvd1RpdGxlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweS0zLjUgcHgtNCB0ZXh0LWFtYmVyLTMwMCB0ZXh0LVsxMXB4XSB3aGl0ZXNwYWNlLW5vd3JhcFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsb2cuYWJ1c2VkQXBpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweS0zLjUgcHgtNCB3aGl0ZXNwYWNlLW5vd3JhcFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHB4LTIgcHktMC41IHJvdW5kZWQgYm9yZGVyIHRleHQtWzEwcHhdIGZvbnQtYm9sZCAke2xldmVsQmFkZ2V9YH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bG9nLmFnZ3Jlc3Npb25MZXZlbH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTMuNSBweC00IHRleHQtY2VudGVyIHdoaXRlc3BhY2Utbm93cmFwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgcHgtMi41IHB5LTEgcm91bmRlZC1mdWxsIHRleHQteHMgZm9udC1ibGFjayBib3JkZXIgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvZy5yZXBlYXRDb3VudCA+IDE1IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1yZWQtOTUwIHRleHQtcmVkLTMwMCBib3JkZXItcmVkLTcwMCBhbmltYXRlLXB1bHNlJyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBsb2cucmVwZWF0Q291bnQgPiA1IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWFtYmVyLTk1MCB0ZXh0LWFtYmVyLTMwMCBib3JkZXItYW1iZXItNzAwJyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS04MDAgdGV4dC1zbGF0ZS0zMDAgYm9yZGVyLXNsYXRlLTcwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9YH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bG9nLnJlcGVhdENvdW50fXhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTMuNSBweC00IHdoaXRlc3BhY2Utbm93cmFwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1lbWVyYWxkLTQwMCBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDaGVja0NpcmNsZTIgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWkFCTE9LT1dBTllcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTMuNSBweC00IHRleHQtcmlnaHQgd2hpdGVzcGFjZS1ub3dyYXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZExvZ0lkKGlzU2VsZWN0ZWQgPyBudWxsIDogbG9nLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlIHRleHQteHMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgbWwtYXV0byBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2lzU2VsZWN0ZWQgPyAnWndpxYQnIDogJ1N6Y3plZ8OzxYJ5J308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hldnJvblJpZ2h0IGNsYXNzTmFtZT17YHctMy41IGgtMy41IHRyYW5zaXRpb24tdHJhbnNmb3JtICR7aXNTZWxlY3RlZCA/ICdyb3RhdGUtOTAnIDogJyd9YH0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBFeHBhbmRlZCBEZWVwIEluc3BlY3Rpb24gRGV0YWlscyAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgIHtpc1NlbGVjdGVkICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGNsYXNzTmFtZT1cImJnLWJsYWNrLzYwIGJvcmRlci15IGJvcmRlci1wdXJwbGUtOTAwLzUwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNvbFNwYW49ezh9IGNsYXNzTmFtZT1cInAtNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgc3BhY2UteS0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAgcGItMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTaGllbGRBbGVydCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcmVkLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNaQ1pFR8OTxYFZIEFUQVRLVSBQUlpFQ0hXWUNFTklBIEZPS1VTVSAoe2xvZy5wcm9jZXNzTmFtZX0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS01MDAgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJRDoge2xvZy5pZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBzbTpncmlkLWNvbHMtMyBnYXAtMyB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIuNSByb3VuZGVkLWxnIGJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgYmxvY2sgdGV4dC1bMTBweF1cIj5XRUtUT1IgWkFHUk/Fu0VOSUE8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXB1cnBsZS0zMDAgZm9udC1ib2xkIG10LTAuNSBibG9ja1wiPntsb2cuc291cmNlVmVjdG9yfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMi41IHJvdW5kZWQtbGcgYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCBibG9jayB0ZXh0LVsxMHB4XVwiPlBPV1RBUlpBTE5PxZrEhiAvIEZSRUtXRU5DSkE8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXJlZC0zMDAgZm9udC1ib2xkIG10LTAuNSBibG9ja1wiPntsb2cucmVwZWF0Q291bnR9IHVkYXJlbW5pb255Y2ggcHLDs2I8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIuNSByb3VuZGVkLWxnIGJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgYmxvY2sgdGV4dC1bMTBweF1cIj5NRUNIQU5JWk0gQkxPS0FEWTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC0zMDAgZm9udC1ib2xkIG10LTAuNSBibG9ja1wiPkxvY2tTZXRGb3JlZ3JvdW5kV2luZG93IChTcGlrZSBDbGFtcCk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQtbGcgYmctc2xhdGUtOTAwLzYwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHRleHQteHMgdGV4dC1zbGF0ZS0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXB1cnBsZS00MDAgZm9udC1ib2xkIGJsb2NrIG1iLTEgZm9udC1tb25vIHRleHQtWzEwcHhdXCI+QU5BTElaQSBGT1JFTlNJQzo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2xvZy5kZXRhaWxzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICB9KX1cblxuICAgICAgICAgICAgICAgICAge2ZpbHRlcmVkRm9jdXNMb2dzLmxlbmd0aCA9PT0gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICA8dGQgY29sU3Bhbj17OH0gY2xhc3NOYW1lPVwicHktOCB0ZXh0LWNlbnRlciB0ZXh0LXNsYXRlLTQwMCB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBCcmFrIHphcmVqZXN0cm93YW55Y2ggcHLDs2IgcHJ6ZWNod3ljZW5pYSBmb2t1c3UgZGxhIHBvZGFueWNoIGtyeXRlcmnDs3cuXG4gICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBMaXZlIFRocmVhdCBQdWxzZSBTaWRlYmFyIChMYXN0IDUgRGV0ZWN0ZWQgQnJlYWNoIEF0dGVtcHRzIHdpdGggQ29sb3IgUmlzayBDb2RpbmcpICovfVxuICAgICAgICA8TGl2ZVRocmVhdFB1bHNlU2lkZWJhclxuICAgICAgICAgIGxvZ3M9e2ZvY3VzTG9nc31cbiAgICAgICAgICBvblNlbGVjdExvZz17aGFuZGxlU2VsZWN0QnJlYWNoRnJvbVB1bHNlfVxuICAgICAgICAgIG9uTmF2aWdhdGVUb1RhYj17c2V0QWN0aXZlVGFifVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBNb2RhbDogRG9kYWogV8WCYXNueSBJbmN5ZGVudCAqL31cbiAgICAgIHtpc0FkZE1vZGFsT3BlbiAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTUwIGJnLWJsYWNrLzgwIGJhY2tkcm9wLWJsdXItc20gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC00XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgcm91bmRlZC0yeGwgbWF4LXcteGwgdy1mdWxsIHAtNiBzcGFjZS15LTUgc2hhZG93LTJ4bFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcGItMyBib3JkZXItYiBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yIHRleHQtd2hpdGUgZm9udC1ib2xkIHRleHQtbGdcIj5cbiAgICAgICAgICAgICAgICA8UGx1c0NpcmNsZSBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtcHVycGxlLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+RG9kYWogTm93eSBJbmN5ZGVudCBaYWdyb8W8ZW5pYTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc0FkZE1vZGFsT3BlbihmYWxzZSl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8WCBjbGFzc05hbWU9XCJ3LTUgaC01XCIgLz5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGZvcm0gb25TdWJtaXQ9e2hhbmRsZVNhdmVDdXN0b21JbmNpZGVudH0gY2xhc3NOYW1lPVwic3BhY2UteS00IHRleHQteHMgdGV4dC1zbGF0ZS0yMDBcIj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1zbGF0ZS0zMDAgZm9udC1tb25vIG1iLTFcIj5OYXp3YSBaYWdyb8W8ZW5pYSAvIFN5Z25hdHVyYTo8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwibnAuIEZsdXR0ZXJUcmFwLng2NCwgUm9ndWVJbmplY3Rvci5XaW4zMlwiXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17bmV3VGhyZWF0TmFtZX1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHNldE5ld1RocmVhdE5hbWUoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB4LTMgcHktMiByb3VuZGVkLXhsIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCB0ZXh0LXdoaXRlIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItcHVycGxlLTUwMFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0zXCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNsYXRlLTMwMCBmb250LW1vbm8gbWItMVwiPkthdGVnb3JpYTo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bmV3VGhyZWF0Q2F0ZWdvcnl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHNldE5ld1RocmVhdENhdGVnb3J5KGUudGFyZ2V0LnZhbHVlIGFzIFRocmVhdENhdGVnb3J5KX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB4LTMgcHktMiByb3VuZGVkLXhsIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCB0ZXh0LXdoaXRlIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItcHVycGxlLTUwMFwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJTY3JlZW4gTG9ja2VyXCI+U2NyZWVuIExvY2tlcjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiVHJvamFuIE92ZXJsYXlcIj5Ucm9qYW4gT3ZlcmxheTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiUmFuc29td2FyZVwiPlJhbnNvbXdhcmU8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlByb2Nlc3MgV2lwZXJcIj5Qcm9jZXNzIFdpcGVyPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJTdGVhbHRoIE1pbmVyXCI+U3RlYWx0aCBNaW5lcjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiUm9vdGtpdCBIb29rXCI+Um9vdGtpdCBIb29rPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJGb2N1cyBIaWphY2tlclwiPkZvY3VzIEhpamFja2VyPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1zbGF0ZS0zMDAgZm9udC1tb25vIG1iLTFcIj5Qb3ppb20gUnl6eWthOjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtuZXdUaHJlYXRTZXZlcml0eX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0TmV3VGhyZWF0U2V2ZXJpdHkoZS50YXJnZXQudmFsdWUgYXMgVGhyZWF0U2V2ZXJpdHkpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHgtMyBweS0yIHJvdW5kZWQteGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHRleHQtd2hpdGUgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1wdXJwbGUtNTAwXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkVYVFJFTUVcIj5FWFRSRU1FPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJDUklUSUNBTFwiPkNSSVRJQ0FMPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJISUdIXCI+SElHSDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiTUVESVVNXCI+TUVESVVNPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1zbGF0ZS0zMDAgZm9udC1tb25vIG1iLTFcIj5PcGlzIER6aWHFgmFuaWE6PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgICAgIHJvd3M9ezJ9XG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIktyw7N0a2kgb3BpcyB6YWNob3dhbmlhIHdpcnVzYS4uLlwiXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17bmV3VGhyZWF0RGVzY31cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHNldE5ld1RocmVhdERlc2MoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB4LTMgcHktMiByb3VuZGVkLXhsIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCB0ZXh0LXdoaXRlIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItcHVycGxlLTUwMFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1zbGF0ZS0zMDAgZm9udC1tb25vIG1iLTFcIj5NZWNoYW5pem0gQWdyZXNqaSAoSmFrIGF0YWt1amUpOjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIm5wLiBIV05EX1RPUE1PU1QgaG9vaywgd3l3xYJhc3pjemFuaWUgZm9rdXN1LCBibG9rYWRhIGtsYXdpYXR1cnlcIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9e25ld1RocmVhdEFnZ3Jlc3Npb259XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiBzZXROZXdUaHJlYXRBZ2dyZXNzaW9uKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC0zIHB5LTIgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgdGV4dC13aGl0ZSBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXB1cnBsZS01MDBcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtc2xhdGUtMzAwIGZvbnQtbW9ubyBtYi0xXCI+U3Bvc8OzYiBXbmlrbmnEmWNpYSBkbyBLb21wdXRlcmE6PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwibnAuIFBoaXNoaW5nIGUtbWFpbCwgcG9kcm9iaW9uYSBwYWN6a2EgbnBtLCBjcmFjay90b3JyZW50XCJcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtuZXdUaHJlYXRWZWN0b3J9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiBzZXROZXdUaHJlYXRWZWN0b3IoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB4LTMgcHktMiByb3VuZGVkLXhsIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCB0ZXh0LXdoaXRlIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItcHVycGxlLTUwMFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWVuZCBnYXAtMyBwdC0zXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc0FkZE1vZGFsT3BlbihmYWxzZSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTIgcm91bmRlZC14bCBiZy1zbGF0ZS04MDAgdGV4dC1zbGF0ZS0zMDAgaG92ZXI6dGV4dC13aGl0ZSBmb250LXNlbWlib2xkIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICBBbnVsdWpcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwic3VibWl0XCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMiByb3VuZGVkLXhsIGJnLXB1cnBsZS02MDAgaG92ZXI6YmctcHVycGxlLTUwMCB0ZXh0LXdoaXRlIGZvbnQtYm9sZCBmb250LW1vbm8gc2hhZG93LWxnIHNoYWRvdy1wdXJwbGUtOTUwIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICBaYXBpc3ogdyBSZWplc3RyemVcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cblxuICAgICAgey8qIFJldHJvIDEwMCBDb3BpZXMgUHVyZ2UgTW9kYWwgKi99XG4gICAgICA8UmV0cm8xMDBDb3BpZXNQdXJnZU1vZGFsXG4gICAgICAgIGlzT3Blbj17aXNSZXRybzEwME1vZGFsT3Blbn1cbiAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0SXNSZXRybzEwME1vZGFsT3BlbihmYWxzZSl9XG4gICAgICAvPlxuXG4gICAgICB7LyogVGhyZWF0IERhdGFiYXNlIEpTT04gQWlyLUdhcCBFeHBvcnQvSW1wb3J0IE1vZGFsICovfVxuICAgICAgPFRocmVhdERhdGFiYXNlRXhwb3J0TW9kYWxcbiAgICAgICAgaXNPcGVuPXtpc0V4cG9ydE1vZGFsT3Blbn1cbiAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0SXNFeHBvcnRNb2RhbE9wZW4oZmFsc2UpfVxuICAgICAgICB0aHJlYXRzPXt0aHJlYXRzfVxuICAgICAgICBmb2N1c0xvZ3M9e2ZvY3VzTG9nc31cbiAgICAgICAgb25UaHJlYXRzVXBkYXRlZD17KHVwZGF0ZWQpID0+IHNldFRocmVhdHModXBkYXRlZCl9XG4gICAgICAvPlxuXG4gICAgICB7LyogRm9yZW5zaWNzIFBERiBTZWN1cml0eSBMb2dnaW5nICYgQXVkaXQgUmVwb3J0IE1vZGFsICovfVxuICAgICAgPEZvcmVuc2ljc1BkZkV4cG9ydE1vZGFsXG4gICAgICAgIGlzT3Blbj17aXNQZGZNb2RhbE9wZW59XG4gICAgICAgIG9uQ2xvc2U9eygpID0+IHNldElzUGRmTW9kYWxPcGVuKGZhbHNlKX1cbiAgICAgICAgdGhyZWF0cz17dGhyZWF0c31cbiAgICAgICAgZm9jdXNMb2dzPXtmb2N1c0xvZ3N9XG4gICAgICAvPlxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdLCJtYXBwaW5ncyI6IkFBaVZVLFNBNmZnQixVQTdmaEI7QUFqVlYsT0FBTyxTQUFTLFVBQVUsU0FBUyxpQkFBaUI7QUFDcEQ7QUFBQSxFQUNFO0FBQUEsRUFBYTtBQUFBLEVBQWE7QUFBQSxFQUFpQjtBQUFBLEVBQVU7QUFBQSxFQUN0QztBQUFBLEVBQXNCO0FBQUEsRUFBVTtBQUFBLEVBQU07QUFBQSxFQUFPO0FBQUEsRUFDdEM7QUFBQSxFQUFxQjtBQUFBLEVBQVk7QUFBQSxFQUFpQjtBQUFBLEVBQ3hFO0FBQUEsRUFBWTtBQUFBLEVBQVc7QUFBQSxFQUFRO0FBQUEsRUFBVztBQUFBLEVBQTRCO0FBQUEsRUFDdEU7QUFBQSxFQUF3QztBQUFBLEVBQVE7QUFBQSxFQUFvQjtBQUFBLE9BQy9EO0FBQ1AsU0FBUyxtQ0FBbUM7QUFFNUMsU0FBUyxtQkFBbUI7QUFDNUIsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxzQ0FBc0M7QUFDL0MsU0FBUyxnQ0FBZ0M7QUFDekMsU0FBUyw4QkFBOEI7QUFDdkMsU0FBUyxpQ0FBaUM7QUFDMUMsU0FBUywrQkFBK0I7QUFDeEMsU0FBUyxrQ0FBa0M7QUFDM0MsU0FBUyxxQ0FBcUM7QUFDOUMsU0FBUywwQ0FBMEM7QUFFNUMsYUFBTSwyQkFBcUMsTUFBTTtBQUN0RCxRQUFNLENBQUMsV0FBVyxZQUFZLElBQUksU0FBMkUsd0JBQXdCO0FBQ3JJLFFBQU0sQ0FBQyxxQkFB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