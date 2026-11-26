import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-toolkit/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=019a4779"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-toolkit/node_modules/.vite/deps/react.js?v=019a4779"; const useState = __vite__cjsImport1_react["useState"]; const useMemo = __vite__cjsImport1_react["useMemo"];
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
  Flame
} from "/sentinel-toolkit/node_modules/.vite/deps/lucide-react.js?v=6cbc5a0a";
import { INITIAL_NEUTRALIZED_THREATS } from "/sentinel-toolkit/src/data/neutralizedViruses.ts";
import { safeStorage } from "/sentinel-toolkit/src/utils/selfRepairSystem.ts";
export const NeutralizedThreatsLedger = () => {
  const [threats, setThreats] = useState(() => {
    const custom = safeStorage.get("sentinel_custom_threats", []);
    return [...INITIAL_NEUTRALIZED_THREATS, ...custom];
  });
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
Bariery Ochronne: AKTYWNE (NtSuspendProcess + PE Header Sabotage + ACL Deny)
================================================================================

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
    a.download = `sentinel_neutralized_threats_dossier_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6 font-sans", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-purple-950/70 to-slate-900 border border-purple-800/40 shadow-xl relative overflow-hidden", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 right-0 p-8 opacity-10 pointer-events-none", children: /* @__PURE__ */ jsxDEV(Skull, { className: "w-48 h-48 text-purple-400" }, void 0, false, {
        fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
        lineNumber: 242,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
        lineNumber: 241,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2.5", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "p-2 rounded-xl bg-purple-600/20 border border-purple-500/40 text-purple-300", children: /* @__PURE__ */ jsxDEV(Skull, { className: "w-5 h-5" }, void 0, false, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 249,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 248,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("h2", { className: "text-xl sm:text-2xl font-black text-white tracking-tight", children: "Kartoteka Zniszczonych Wirusów & Rejestr Uboju" }, void 0, false, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 251,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800/60 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 255,
                columnNumber: 17
              }, this),
              threats.length,
              " Zlikwidowanych Zagrożeń"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 254,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 247,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl", children: [
            "Szczegółowa baza danych zneutralizowanego malware'u, nakładek ekranowych (Flutter/Win32) i trojanów. Zawiera precyzyjną analizę ",
            /* @__PURE__ */ jsxDEV("strong", { children: "mechanizmu agresji" }, void 0, false, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 260,
              columnNumber: 143
            }, this),
            ", ",
            /* @__PURE__ */ jsxDEV("strong", { children: "sposobu wniknięcia do systemu" }, void 0, false, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 260,
              columnNumber: 180
            }, this),
            " oraz ",
            /* @__PURE__ */ jsxDEV("strong", { children: "procedury binarnego uboju" }, void 0, false, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 260,
              columnNumber: 232
            }, this),
            "."
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 259,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
          lineNumber: 246,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setIsAddModalOpen(true),
              className: "px-3.5 py-2 rounded-xl bg-purple-700 hover:bg-purple-600 text-white text-xs font-bold font-mono flex items-center gap-1.5 shadow-md shadow-purple-900/40 border border-purple-400/30 transition-all cursor-pointer",
              children: [
                /* @__PURE__ */ jsxDEV(PlusCircle, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 269,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Dodaj Własny Incydent" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 270,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 265,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleExportForensicReport,
              className: "px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold font-mono flex items-center gap-1.5 transition-all cursor-pointer",
              children: [
                /* @__PURE__ */ jsxDEV(Download, { className: "w-3.5 h-3.5 text-purple-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 277,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Eksportuj Raport (.txt)" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 278,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 273,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
          lineNumber: 264,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
        lineNumber: 245,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "relative", children: [
          /* @__PURE__ */ jsxDEV(Search, { className: "w-4 h-4 text-slate-400 absolute left-3 top-2.5" }, void 0, false, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 286,
            columnNumber: 13
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
              lineNumber: 287,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
          lineNumber: 285,
          columnNumber: 11
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
                lineNumber: 303,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "Screen Locker", children: "Screen Locker (Nakładki Ekranowe)" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 304,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "Trojan Overlay", children: "Trojan Overlay (Szpiegowskie Nakładki)" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 305,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "Ransomware", children: "Ransomware (Okup & Szyfrowanie)" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 306,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "Process Wiper", children: "Process Wiper (Destrukcja Dysku)" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 307,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "Stealth Miner", children: "Stealth Miner (Ukryta Koparka)" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 308,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "Rootkit Hook", children: "Rootkit Hook (Bezplikowe)" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 309,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 297,
            columnNumber: 13
          },
          this
        ) }, void 0, false, {
          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
          lineNumber: 296,
          columnNumber: 11
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
                lineNumber: 320,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "EXTREME", children: "EXTREME (Krytyczne Zniszczenie)" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 321,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "CRITICAL", children: "CRITICAL (Blokada Systemu)" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 322,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "HIGH", children: "HIGH (Wysokie Zagrożenie)" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 323,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 314,
            columnNumber: 13
          },
          this
        ) }, void 0, false, {
          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
          lineNumber: 313,
          columnNumber: 11
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
                lineNumber: 334,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "windows", children: "Windows (Win32 / Ctypes / NTDLL)" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 335,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "linux", children: "Linux (X11 / Wayland / SIGKILL)" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 336,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "macos", children: "macOS (Quartz / CoreGraphics)" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 337,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 328,
            columnNumber: 13
          },
          this
        ) }, void 0, false, {
          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
          lineNumber: 327,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
        lineNumber: 284,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
      lineNumber: 240,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-4 space-y-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-xs font-mono text-slate-400 px-1", children: [
          /* @__PURE__ */ jsxDEV("span", { children: [
            "Zidentyfikowane Zagrożenia (",
            filteredThreats.length,
            ")"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 348,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Status: 100% Zlikwidowane" }, void 0, false, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 349,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
          lineNumber: 347,
          columnNumber: 11
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
                        lineNumber: 374,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("h4", { className: "font-bold text-xs sm:text-sm text-white truncate max-w-[200px]", children: threat.name }, void 0, false, {
                        fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                        lineNumber: 375,
                        columnNumber: 23
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                      lineNumber: 373,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: `text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${severityColor}`, children: threat.severity }, void 0, false, {
                      fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                      lineNumber: 379,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 372,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 mt-2 text-[11px] text-slate-400", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "px-1.5 py-0.5 bg-slate-950 rounded text-purple-300 font-mono text-[10px]", children: threat.category }, void 0, false, {
                      fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                      lineNumber: 385,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "•" }, void 0, false, {
                      fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                      lineNumber: 388,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 font-mono text-[10px]", children: [
                      "SHA: ",
                      threat.sha256Hash.substring(0, 8),
                      "..."
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                      lineNumber: 389,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 384,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed", children: threat.description }, void 0, false, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 394,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-emerald-400", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-3 h-3" }, void 0, false, {
                        fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                        lineNumber: 400,
                        columnNumber: 23
                      }, this),
                      threat.status
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                      lineNumber: 399,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 flex items-center gap-0.5", children: [
                      "Badaj ",
                      /* @__PURE__ */ jsxDEV(ChevronRight, { className: "w-3 h-3" }, void 0, false, {
                        fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                        lineNumber: 404,
                        columnNumber: 29
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                      lineNumber: 403,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 398,
                    columnNumber: 19
                  }, this)
                ]
              },
              threat.id,
              true,
              {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 363,
                columnNumber: 17
              },
              this
            );
          }),
          filteredThreats.length === 0 && /* @__PURE__ */ jsxDEV("div", { className: "p-8 text-center bg-slate-900/60 rounded-xl border border-slate-800 text-slate-400 text-xs", children: "Nie znaleziono zagrożeń spełniających podane kryteria wyszukiwania." }, void 0, false, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 412,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
          lineNumber: 352,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
        lineNumber: 346,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-8 space-y-6", children: activeThreat && /* @__PURE__ */ jsxDEV("div", { className: "p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800/80 font-bold", children: activeThreat.category.toUpperCase() }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 427,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800/60", children: [
                "OS: ",
                activeThreat.targetOS.join(" / ").toUpperCase()
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 430,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800", children: [
                "ENTROPIA: ",
                activeThreat.entropy
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 433,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 426,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("h3", { className: "text-xl sm:text-2xl font-black text-white mt-2", children: activeThreat.name }, void 0, false, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 438,
              columnNumber: 19
            }, this),
            activeThreat.alias && /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-purple-400 font-mono mt-0.5", children: [
              "Alias: ",
              activeThreat.alias
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 442,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 425,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleStartLiveSlaughter(activeThreat),
              disabled: simulatingThreatId === activeThreat.id,
              className: "px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white text-xs sm:text-sm font-bold font-mono flex items-center gap-2 shadow-lg shadow-red-950/60 border border-red-400/40 transition-all cursor-pointer",
              children: [
                /* @__PURE__ */ jsxDEV(Flame, { className: `w-4 h-4 ${simulatingThreatId === activeThreat.id ? "animate-bounce text-yellow-300" : ""}` }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 455,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: simulatingThreatId === activeThreat.id ? "Trwa Ubój na Żywo..." : "Symuluj Ubój na Żywo" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 456,
                  columnNumber: 21
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 450,
              columnNumber: 19
            },
            this
          ) }, void 0, false, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 449,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
          lineNumber: 424,
          columnNumber: 15
        }, this),
        simulatingThreatId === activeThreat.id && /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-black border-2 border-red-500/80 shadow-2xl font-mono text-xs text-slate-200 space-y-2", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-2 border-b border-red-900/60 text-red-400 font-bold", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV(Skull, { className: "w-4 h-4 animate-spin text-red-500" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 468,
                columnNumber: 23
              }, this),
              "AUTONOMICZNY PROTOKÓŁ UBOJU W TOKU (LIVE SENTINEL EXECUTION)"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 467,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] bg-red-950 px-2 py-0.5 rounded border border-red-800", children: [
              "Krok: ",
              simulationCurrentStep
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 471,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 466,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5 max-h-48 overflow-y-auto pt-1 text-slate-300", children: simulationLogs.map((log, idx) => /* @__PURE__ */ jsxDEV("div", { className: log.includes("[KROK") ? "text-yellow-400 font-bold" : log.includes("[PURGE") ? "text-emerald-400 font-bold" : "text-slate-400", children: log }, idx, false, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 478,
            columnNumber: 23
          }, this)) }, void 0, false, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 476,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
          lineNumber: 465,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-xs sm:text-sm text-slate-300 leading-relaxed", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-purple-400 font-bold block mb-1 font-mono text-xs", children: "[PROFIL WYWIADOWCZY / FORENSIC OVERVIEW]:" }, void 0, false, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 488,
            columnNumber: 17
          }, this),
          activeThreat.description
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
          lineNumber: 487,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-red-950/20 border border-red-800/40 space-y-3", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 text-red-400 font-bold text-xs sm:text-sm", children: [
              /* @__PURE__ */ jsxDEV(ShieldAlert, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 499,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "MECHANIZM AGRESJI (JAK ATAKUJE)" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 500,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 498,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-semibold text-white font-mono", children: activeThreat.aggressionMechanism.title }, void 0, false, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 503,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-300 leading-relaxed", children: activeThreat.aggressionMechanism.summary }, void 0, false, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 507,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5 pt-1", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] font-mono text-red-300 font-bold block", children: "Kluczowe Działania Niszczące:" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 512,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("ul", { className: "space-y-1 text-xs text-slate-300", children: activeThreat.aggressionMechanism.technicalDetails.map((detail, idx) => /* @__PURE__ */ jsxDEV("li", { className: "flex items-start gap-1.5", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-red-400 font-mono font-bold", children: "•" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 518,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: detail }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 519,
                  columnNumber: 27
                }, this)
              ] }, idx, true, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 517,
                columnNumber: 25
              }, this)) }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 515,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 511,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "pt-2", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono text-slate-400 block mb-1", children: "Nadużywane Funkcje API:" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 526,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap gap-1", children: activeThreat.aggressionMechanism.apisAbused.map((api, idx) => /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-900", children: api }, idx, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 531,
                columnNumber: 25
              }, this)) }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 529,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 525,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 497,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-purple-950/20 border border-purple-800/40 space-y-3", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 text-purple-400 font-bold text-xs sm:text-sm", children: [
              /* @__PURE__ */ jsxDEV(Zap, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 542,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "SPOSÓB WNIKNIĘCIA DO KOMPUTERA" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 543,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 541,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-semibold text-white font-mono", children: [
              "Kanał: ",
              activeThreat.infectionVector.channel
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 546,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-300 leading-relaxed", children: [
              /* @__PURE__ */ jsxDEV("strong", { children: "Metoda:" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 551,
                columnNumber: 21
              }, this),
              " ",
              activeThreat.infectionVector.method
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 550,
              columnNumber: 19
            }, this),
            activeThreat.infectionVector.vulnerabilityCve && /* @__PURE__ */ jsxDEV("div", { className: "text-xs text-amber-300 font-mono bg-amber-950/40 p-2 rounded-lg border border-amber-800/60", children: [
              /* @__PURE__ */ jsxDEV("strong", { children: "Podatność CVE:" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 556,
                columnNumber: 23
              }, this),
              " ",
              activeThreat.infectionVector.vulnerabilityCve
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 555,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5 pt-1", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] font-mono text-purple-300 font-bold block", children: "Łańcuch Wniknięcia (Exploit Chain):" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 561,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 text-xs text-slate-300", children: activeThreat.infectionVector.exploitChain.map((step, idx) => /* @__PURE__ */ jsxDEV("div", { className: "p-1.5 bg-slate-950/60 rounded border border-purple-900/40 font-mono text-[11px]", children: step }, idx, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 566,
                columnNumber: 25
              }, this)) }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 564,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 560,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 540,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
          lineNumber: 495,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-5 rounded-xl bg-slate-950 border border-emerald-900/40 space-y-4", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 text-emerald-400 font-bold text-xs sm:text-sm", children: [
              /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 579,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "PROCEDURA UBOJU & NEUTRALIZACJI (SLAUGHTER CHAIN)" }, void 0, false, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 580,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 578,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold", children: activeThreat.status }, void 0, false, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 582,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 577,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-xs text-slate-300", children: [
            /* @__PURE__ */ jsxDEV("strong", { className: "text-emerald-300 font-mono", children: [
              activeThreat.neutralizationDetails.methodName,
              ":"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 588,
              columnNumber: 19
            }, this),
            " ",
            activeThreat.neutralizationDetails.slaughterMechanism
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 587,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] font-mono text-slate-400 font-bold block", children: "Forensic Execution Steps:" }, void 0, false, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 593,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5 font-mono text-xs", children: activeThreat.neutralizationDetails.executionSteps.map((step) => /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 bg-slate-900/90 rounded-lg border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "w-5 h-5 rounded-full bg-emerald-900/80 text-emerald-300 flex items-center justify-center font-bold text-[10px]", children: step.step }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 600,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-slate-200", children: step.action }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 603,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 599,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-right sm:text-right", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-semibold", children: step.result }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 606,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500 ml-2", children: [
                  "(",
                  step.timestamp,
                  ")"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 607,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 605,
                columnNumber: 25
              }, this)
            ] }, step.step, true, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 598,
              columnNumber: 23
            }, this)) }, void 0, false, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 596,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 592,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "pt-2 space-y-2", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono text-purple-300 font-bold flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxDEV(FileCode, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 618,
                  columnNumber: 23
                }, this),
                "Skrypt Eksterminacji w Pythonie (Ready-To-Run):"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 617,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => handleCopyCode(activeThreat.id, activeThreat.neutralizationDetails.pythonKillSnippet),
                  className: "px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1 transition-colors cursor-pointer",
                  children: copiedCodeId === activeThreat.id ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
                    /* @__PURE__ */ jsxDEV(Check, { className: "w-3 h-3 text-emerald-400" }, void 0, false, {
                      fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                      lineNumber: 627,
                      columnNumber: 27
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400", children: "Skopiowano" }, void 0, false, {
                      fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                      lineNumber: 628,
                      columnNumber: 27
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 626,
                    columnNumber: 25
                  }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
                    /* @__PURE__ */ jsxDEV(Copy, { className: "w-3 h-3" }, void 0, false, {
                      fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                      lineNumber: 632,
                      columnNumber: 27
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "Kopiuj .py" }, void 0, false, {
                      fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                      lineNumber: 633,
                      columnNumber: 27
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 631,
                    columnNumber: 25
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                  lineNumber: 621,
                  columnNumber: 21
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 616,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("pre", { className: "p-3 bg-black/90 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto", children: /* @__PURE__ */ jsxDEV("code", { children: activeThreat.neutralizationDetails.pythonKillSnippet }, void 0, false, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 640,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 639,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 615,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
          lineNumber: 576,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
        lineNumber: 422,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
        lineNumber: 420,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
      lineNumber: 344,
      columnNumber: 7
    }, this),
    isAddModalOpen && /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-3 border-b border-slate-800", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 text-white font-bold text-lg", children: [
          /* @__PURE__ */ jsxDEV(PlusCircle, { className: "w-5 h-5 text-purple-400" }, void 0, false, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 655,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Dodaj Nowy Incydent Zagrożenia" }, void 0, false, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 656,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
          lineNumber: 654,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setIsAddModalOpen(false),
            className: "text-slate-400 hover:text-white cursor-pointer",
            children: /* @__PURE__ */ jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 662,
              columnNumber: 17
            }, this)
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 658,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
        lineNumber: 653,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("form", { onSubmit: handleSaveCustomIncident, className: "space-y-4 text-xs text-slate-200", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-300 font-mono mb-1", children: "Nazwa Zagrożenia / Sygnatura:" }, void 0, false, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 668,
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
              lineNumber: 669,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
          lineNumber: 667,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-300 font-mono mb-1", children: "Kategoria:" }, void 0, false, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 681,
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
                    lineNumber: 687,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("option", { value: "Trojan Overlay", children: "Trojan Overlay" }, void 0, false, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 688,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("option", { value: "Ransomware", children: "Ransomware" }, void 0, false, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 689,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("option", { value: "Process Wiper", children: "Process Wiper" }, void 0, false, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 690,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("option", { value: "Stealth Miner", children: "Stealth Miner" }, void 0, false, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 691,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("option", { value: "Rootkit Hook", children: "Rootkit Hook" }, void 0, false, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 692,
                    columnNumber: 21
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 682,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 680,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-300 font-mono mb-1", children: "Poziom Ryzyka:" }, void 0, false, {
              fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
              lineNumber: 697,
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
                    lineNumber: 703,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("option", { value: "CRITICAL", children: "CRITICAL" }, void 0, false, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 704,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("option", { value: "HIGH", children: "HIGH" }, void 0, false, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 705,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("option", { value: "MEDIUM", children: "MEDIUM" }, void 0, false, {
                    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                    lineNumber: 706,
                    columnNumber: 21
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
                lineNumber: 698,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 696,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
          lineNumber: 679,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-300 font-mono mb-1", children: "Opis Działania:" }, void 0, false, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 712,
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
              lineNumber: 713,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
          lineNumber: 711,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-300 font-mono mb-1", children: "Mechanizm Agresji (Jak atakuje):" }, void 0, false, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 723,
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
              lineNumber: 724,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
          lineNumber: 722,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-300 font-mono mb-1", children: "Sposób Wniknięcia do Komputera:" }, void 0, false, {
            fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
            lineNumber: 734,
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
              lineNumber: 735,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
          lineNumber: 733,
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
              lineNumber: 745,
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
              lineNumber: 752,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
          lineNumber: 744,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
        lineNumber: 666,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
      lineNumber: 652,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
      lineNumber: 651,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/NeutralizedThreatsLedger.tsx",
    lineNumber: 238,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk5ldXRyYWxpemVkVGhyZWF0c0xlZGdlci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VNZW1vIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgXG4gIFNoaWVsZENoZWNrLCBTaGllbGRBbGVydCwgU2t1bGwsIFRlcm1pbmFsLCBGaWxlQ29kZSwgQ2hlY2tDaXJjbGUyLCBcbiAgQWxlcnRUcmlhbmdsZSwgU2VhcmNoLCBGaWx0ZXIsIFBsYXksIERvd25sb2FkLCBDb3B5LCBDaGVjaywgQ2hldnJvblJpZ2h0LCBcbiAgTGF5ZXJzLCBMb2NrLCBVbmxvY2ssIFphcCwgQWN0aXZpdHksIEluZm8sIFBsdXNDaXJjbGUsIFgsIEV4dGVybmFsTGluaywgRmxhbWVcbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IElOSVRJQUxfTkVVVFJBTElaRURfVEhSRUFUUyB9IGZyb20gJy4uL2RhdGEvbmV1dHJhbGl6ZWRWaXJ1c2VzJztcbmltcG9ydCB7IE5ldXRyYWxpemVkVGhyZWF0LCBPU1R5cGUsIFRocmVhdENhdGVnb3J5LCBUaHJlYXRTZXZlcml0eSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IHNhZmVTdG9yYWdlIH0gZnJvbSAnLi4vdXRpbHMvc2VsZlJlcGFpclN5c3RlbSc7XG5cbmV4cG9ydCBjb25zdCBOZXV0cmFsaXplZFRocmVhdHNMZWRnZXI6IFJlYWN0LkZDID0gKCkgPT4ge1xuICBjb25zdCBbdGhyZWF0cywgc2V0VGhyZWF0c10gPSB1c2VTdGF0ZTxOZXV0cmFsaXplZFRocmVhdFtdPigoKSA9PiB7XG4gICAgY29uc3QgY3VzdG9tID0gc2FmZVN0b3JhZ2UuZ2V0PE5ldXRyYWxpemVkVGhyZWF0W10+KCdzZW50aW5lbF9jdXN0b21fdGhyZWF0cycsIFtdKTtcbiAgICByZXR1cm4gWy4uLklOSVRJQUxfTkVVVFJBTElaRURfVEhSRUFUUywgLi4uY3VzdG9tXTtcbiAgfSk7XG5cbiAgY29uc3QgW3NlYXJjaFF1ZXJ5LCBzZXRTZWFyY2hRdWVyeV0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtzZWxlY3RlZENhdGVnb3J5LCBzZXRTZWxlY3RlZENhdGVnb3J5XSA9IHVzZVN0YXRlPHN0cmluZz4oJ0FMTCcpO1xuICBjb25zdCBbc2VsZWN0ZWRTZXZlcml0eSwgc2V0U2VsZWN0ZWRTZXZlcml0eV0gPSB1c2VTdGF0ZTxzdHJpbmc+KCdBTEwnKTtcbiAgY29uc3QgW3NlbGVjdGVkT1MsIHNldFNlbGVjdGVkT1NdID0gdXNlU3RhdGU8c3RyaW5nPignQUxMJyk7XG4gIGNvbnN0IFthY3RpdmVUaHJlYXRJZCwgc2V0QWN0aXZlVGhyZWF0SWRdID0gdXNlU3RhdGU8c3RyaW5nPih0aHJlYXRzWzBdPy5pZCB8fCAndGhyZWF0LWZsdXR0ZXItbG9ja2VyJyk7XG4gIFxuICAvLyBMaXZlIFNsYXVnaHRlciBTaW11bGF0aW9uIFN0YXRlXG4gIGNvbnN0IFtzaW11bGF0aW5nVGhyZWF0SWQsIHNldFNpbXVsYXRpbmdUaHJlYXRJZF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3NpbXVsYXRpb25DdXJyZW50U3RlcCwgc2V0U2ltdWxhdGlvbkN1cnJlbnRTdGVwXSA9IHVzZVN0YXRlPG51bWJlcj4oMCk7XG4gIGNvbnN0IFtzaW11bGF0aW9uTG9ncywgc2V0U2ltdWxhdGlvbkxvZ3NdID0gdXNlU3RhdGU8c3RyaW5nW10+KFtdKTtcbiAgY29uc3QgW2NvcGllZENvZGVJZCwgc2V0Q29waWVkQ29kZUlkXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuXG4gIC8vIE5ldyBJbmNpZGVudCBNb2RhbFxuICBjb25zdCBbaXNBZGRNb2RhbE9wZW4sIHNldElzQWRkTW9kYWxPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW25ld1RocmVhdE5hbWUsIHNldE5ld1RocmVhdE5hbWVdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbbmV3VGhyZWF0Q2F0ZWdvcnksIHNldE5ld1RocmVhdENhdGVnb3J5XSA9IHVzZVN0YXRlPFRocmVhdENhdGVnb3J5PignU2NyZWVuIExvY2tlcicpO1xuICBjb25zdCBbbmV3VGhyZWF0U2V2ZXJpdHksIHNldE5ld1RocmVhdFNldmVyaXR5XSA9IHVzZVN0YXRlPFRocmVhdFNldmVyaXR5PignQ1JJVElDQUwnKTtcbiAgY29uc3QgW25ld1RocmVhdERlc2MsIHNldE5ld1RocmVhdERlc2NdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbbmV3VGhyZWF0QWdncmVzc2lvbiwgc2V0TmV3VGhyZWF0QWdncmVzc2lvbl0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtuZXdUaHJlYXRWZWN0b3IsIHNldE5ld1RocmVhdFZlY3Rvcl0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtuZXdUaHJlYXROZXV0cmFsaXphdGlvbiwgc2V0TmV3VGhyZWF0TmV1dHJhbGl6YXRpb25dID0gdXNlU3RhdGUoJycpO1xuXG4gIGNvbnN0IGFjdGl2ZVRocmVhdCA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIHJldHVybiB0aHJlYXRzLmZpbmQodCA9PiB0LmlkID09PSBhY3RpdmVUaHJlYXRJZCkgfHwgdGhyZWF0c1swXTtcbiAgfSwgW3RocmVhdHMsIGFjdGl2ZVRocmVhdElkXSk7XG5cbiAgY29uc3QgZmlsdGVyZWRUaHJlYXRzID0gdXNlTWVtbygoKSA9PiB7XG4gICAgcmV0dXJuIHRocmVhdHMuZmlsdGVyKHQgPT4ge1xuICAgICAgY29uc3QgbWF0Y2hlc1NlYXJjaCA9IFxuICAgICAgICB0Lm5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hRdWVyeS50b0xvd2VyQ2FzZSgpKSB8fFxuICAgICAgICB0LmRlc2NyaXB0aW9uLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoUXVlcnkudG9Mb3dlckNhc2UoKSkgfHxcbiAgICAgICAgdC5hZ2dyZXNzaW9uTWVjaGFuaXNtLnRpdGxlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoUXVlcnkudG9Mb3dlckNhc2UoKSkgfHxcbiAgICAgICAgdC5pbmZlY3Rpb25WZWN0b3IuY2hhbm5lbC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFF1ZXJ5LnRvTG93ZXJDYXNlKCkpO1xuXG4gICAgICBjb25zdCBtYXRjaGVzQ2F0ID0gc2VsZWN0ZWRDYXRlZ29yeSA9PT0gJ0FMTCcgfHwgdC5jYXRlZ29yeSA9PT0gc2VsZWN0ZWRDYXRlZ29yeTtcbiAgICAgIGNvbnN0IG1hdGNoZXNTZXYgPSBzZWxlY3RlZFNldmVyaXR5ID09PSAnQUxMJyB8fCB0LnNldmVyaXR5ID09PSBzZWxlY3RlZFNldmVyaXR5O1xuICAgICAgY29uc3QgbWF0Y2hlc09TID0gc2VsZWN0ZWRPUyA9PT0gJ0FMTCcgfHwgdC50YXJnZXRPUy5pbmNsdWRlcyhzZWxlY3RlZE9TIGFzIE9TVHlwZSk7XG5cbiAgICAgIHJldHVybiBtYXRjaGVzU2VhcmNoICYmIG1hdGNoZXNDYXQgJiYgbWF0Y2hlc1NldiAmJiBtYXRjaGVzT1M7XG4gICAgfSk7XG4gIH0sIFt0aHJlYXRzLCBzZWFyY2hRdWVyeSwgc2VsZWN0ZWRDYXRlZ29yeSwgc2VsZWN0ZWRTZXZlcml0eSwgc2VsZWN0ZWRPU10pO1xuXG4gIGNvbnN0IGhhbmRsZUNvcHlDb2RlID0gKGlkOiBzdHJpbmcsIGNvZGU6IHN0cmluZykgPT4ge1xuICAgIG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KGNvZGUpO1xuICAgIHNldENvcGllZENvZGVJZChpZCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXRDb3BpZWRDb2RlSWQobnVsbCksIDIwMDApO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVN0YXJ0TGl2ZVNsYXVnaHRlciA9ICh0aHJlYXQ6IE5ldXRyYWxpemVkVGhyZWF0KSA9PiB7XG4gICAgc2V0U2ltdWxhdGluZ1RocmVhdElkKHRocmVhdC5pZCk7XG4gICAgc2V0U2ltdWxhdGlvbkN1cnJlbnRTdGVwKDApO1xuICAgIHNldFNpbXVsYXRpb25Mb2dzKFtcbiAgICAgIGBbU0VOVElORUwgQ09SRV0gSW5pY2phbGl6YWNqYSBwcm9jZWR1cnkgdWJvanUgZGxhOiAke3RocmVhdC5uYW1lfWAsXG4gICAgICBgW0ZPUkVOU0lDU10gU3VtYSBrb250cm9sbmEgU0hBMjU2OiAke3RocmVhdC5zaGEyNTZIYXNoLnN1YnN0cmluZygwLCAyNCl9Li4uYCxcbiAgICAgIGBbV0FUQ0hET0ddIEVudHJvcGlhIGJpbmFybmEgY2VsdTogJHt0aHJlYXQuZW50cm9weX0gKFBha293YW5pZSB3eWtyeXRlKWBcbiAgICBdKTtcblxuICAgIGNvbnN0IHN0ZXBzID0gdGhyZWF0Lm5ldXRyYWxpemF0aW9uRGV0YWlscy5leGVjdXRpb25TdGVwcztcbiAgICBsZXQgc3RlcElkeCA9IDA7XG5cbiAgICBjb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGlmIChzdGVwSWR4IDwgc3RlcHMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IGN1cnIgPSBzdGVwc1tzdGVwSWR4XTtcbiAgICAgICAgc2V0U2ltdWxhdGlvbkN1cnJlbnRTdGVwKGN1cnIuc3RlcCk7XG4gICAgICAgIHNldFNpbXVsYXRpb25Mb2dzKHByZXYgPT4gW1xuICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgYFtLUk9LICR7Y3Vyci5zdGVwfS8ke3N0ZXBzLmxlbmd0aH1dICR7Y3Vyci5hY3Rpb259YCxcbiAgICAgICAgICBgICAgIC0+IFd5d2/FgmFuaWUgQVBJOiAke2N1cnIudGFyZ2V0QXBpfWAsXG4gICAgICAgICAgYCAgICAtPiBTdGF0dXM6ICR7Y3Vyci5yZXN1bHR9YFxuICAgICAgICBdKTtcbiAgICAgICAgc3RlcElkeCsrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgIHNldFNpbXVsYXRpb25Mb2dzKHByZXYgPT4gW1xuICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgYFtQVVJHRSBDT01QTEVURV0gWmFncm/FvGVuaWUgJHt0aHJlYXQubmFtZX0gem9zdGHFgm8gdyAxMDAlIHpsaWt3aWRvd2FuZSBpIHphcnlnbG93YW5lIHcgcGFtacSZY2kgUkFNLmAsXG4gICAgICAgICAgYFtRVUFSQU5USU5FIFBST09GXSAke3RocmVhdC5uZXV0cmFsaXphdGlvbkRldGFpbHMucXVhcmFudGluZVByb29mfWBcbiAgICAgICAgXSk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHNldFNpbXVsYXRpbmdUaHJlYXRJZChudWxsKTtcbiAgICAgICAgfSwgNTAwMCk7XG4gICAgICB9XG4gICAgfSwgOTAwKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTYXZlQ3VzdG9tSW5jaWRlbnQgPSAoZTogUmVhY3QuRm9ybUV2ZW50KSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICghbmV3VGhyZWF0TmFtZS50cmltKCkpIHJldHVybjtcblxuICAgIGNvbnN0IG5ld0VudHJ5OiBOZXV0cmFsaXplZFRocmVhdCA9IHtcbiAgICAgIGlkOiAnY3VzdG9tLScgKyBEYXRlLm5vdygpLFxuICAgICAgbmFtZTogbmV3VGhyZWF0TmFtZSxcbiAgICAgIGNhdGVnb3J5OiBuZXdUaHJlYXRDYXRlZ29yeSxcbiAgICAgIHNldmVyaXR5OiBuZXdUaHJlYXRTZXZlcml0eSxcbiAgICAgIHN0YXR1czogJ1pOSVNaQ1pPTlkgKDEwMCUgUFVSR0VEKScsXG4gICAgICBmaXJzdFNwb3R0ZWQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdLFxuICAgICAgbmV1dHJhbGl6ZWRBdDogbmV3IERhdGUoKS50b1VUQ1N0cmluZygpLFxuICAgICAgdGFyZ2V0T1M6IFsnd2luZG93cyddLFxuICAgICAgc2hhMjU2SGFzaDogQXJyYXkuZnJvbSh7IGxlbmd0aDogNjQgfSwgKCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTYpLnRvU3RyaW5nKDE2KSkuam9pbignJyksXG4gICAgICBlbnRyb3B5OiA3LjgyLFxuICAgICAgZGVzY3JpcHRpb246IG5ld1RocmVhdERlc2MgfHwgJ1pnxYJvc3pvbnkgaW5jeWRlbnQgesWCb8WbbGl3ZWdvIG9wcm9ncmFtb3dhbmlhIGJsb2t1asSFY2VnbyBwdWxwaXQuJyxcbiAgICAgIGFnZ3Jlc3Npb25NZWNoYW5pc206IHtcbiAgICAgICAgdGl0bGU6ICdQcnplY2h3eWNlbmllIFphc29iw7N3IGkgQmxva2FkYSBHVUknLFxuICAgICAgICBzdW1tYXJ5OiBuZXdUaHJlYXRBZ2dyZXNzaW9uIHx8ICdOYWR1xbx5Y2llIHVjaHd5dMOzdyBva2llbmtvd3ljaCBpIHByaW9yeXRldMOzdyBqxIVkcmEuJyxcbiAgICAgICAgdGVjaG5pY2FsRGV0YWlsczogW1xuICAgICAgICAgICdaYXJlamVzdHJvd2FubyB3eXfFgmFzemN6YWrEhWNlIHDEmXRsZSBrb211bmlrYXTDs3cuJyxcbiAgICAgICAgICAnV3ltdXN6ZW5pZSBzdGHFgmVnbyB1dHJ6eW15d2FuaWEgd2llcnpjaHUgKEFsd2F5cyBvbiBUb3ApLidcbiAgICAgICAgXSxcbiAgICAgICAgYXBpc0FidXNlZDogWydTZXRXaW5kb3dQb3MnLCAnU2V0Rm9yZWdyb3VuZFdpbmRvdyddXG4gICAgICB9LFxuICAgICAgaW5mZWN0aW9uVmVjdG9yOiB7XG4gICAgICAgIGNoYW5uZWw6ICdQb2JyYW55IHBsaWsgLyBQb2RhdG5vxZvEhyBhcGxpa2FjamknLFxuICAgICAgICBtZXRob2Q6IG5ld1RocmVhdFZlY3RvciB8fCAnU2tvbXByb21pdG93YW55IGluc3RhbGF0b3IgbHViIGZhxYJzenl3eSBtb2R1xYIuJyxcbiAgICAgICAgcGF5bG9hZFR5cGU6ICdTdGFuZGFsb25lIEV4ZWN1dGFibGUnLFxuICAgICAgICBleHBsb2l0Q2hhaW46IFtcbiAgICAgICAgICAnMS4gVXJ1Y2hvbWllbmllIHrFgm/Fm2xpd2VnbyBwbGlrdS4nLFxuICAgICAgICAgICcyLiBXeXdvxYJhbmllIGJsb2thZHkgb2tpZW5rb3dlai4nLFxuICAgICAgICAgICczLiBOZXV0cmFsaXphY2phIHByemV6IFNlbnRpbmVsIFNoaWVsZC4nXG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICBuZXV0cmFsaXphdGlvbkRldGFpbHM6IHtcbiAgICAgICAgbWV0aG9kTmFtZTogJ0R5bmFtaWN6bmEgRGVrYXBpdGFjamEgUHJvY2Vzb3dhJyxcbiAgICAgICAgc2xhdWdodGVyTWVjaGFuaXNtOiBuZXdUaHJlYXROZXV0cmFsaXphdGlvbiB8fCAnTnRTdXNwZW5kUHJvY2VzcyAtPiBTSUdLSUxMIC0+IEFDTCBMb2Nrb3V0JyxcbiAgICAgICAgZXhlY3V0aW9uU3RlcHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzdGVwOiAxLFxuICAgICAgICAgICAgYWN0aW9uOiAnV3N0cnp5bWFuaWUgd8SFdGvDs3cgdyBSQU0nLFxuICAgICAgICAgICAgdGFyZ2V0QXBpOiAnTnRTdXNwZW5kUHJvY2VzcycsXG4gICAgICAgICAgICByZXN1bHQ6ICdXxIV0a2kgdW5pZXJ1Y2hvbWlvbmUnLFxuICAgICAgICAgICAgdGltZXN0YW1wOiAnMDA6MDAuMDAyJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3RlcDogMixcbiAgICAgICAgICAgIGFjdGlvbjogJ1Viw7NqIHByb2Nlc3UnLFxuICAgICAgICAgICAgdGFyZ2V0QXBpOiAnVGVybWluYXRlUHJvY2VzcycsXG4gICAgICAgICAgICByZXN1bHQ6ICdQcm9jZXMgemxpa3dpZG93YW55JyxcbiAgICAgICAgICAgIHRpbWVzdGFtcDogJzAwOjAwLjAwNidcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIHF1YXJhbnRpbmVQcm9vZjogJ1N0YXR1czogWmxpa3dpZG93YW55IHwgV3BpcyBkb2RhbnkgZG8gcmVqZXN0cnUnLFxuICAgICAgICBweXRob25LaWxsU25pcHBldDogYGltcG9ydCBwc3V0aWwsIG9zXG5cbmRlZiBwdXJnZV9jdXN0b21fdGhyZWF0KCk6XG4gICAgZm9yIHAgaW4gcHN1dGlsLnByb2Nlc3NfaXRlcihbJ3BpZCcsICduYW1lJ10pOlxuICAgICAgICBpZiBcIiR7bmV3VGhyZWF0TmFtZS50b0xvd2VyQ2FzZSgpfVwiIGluIChwLmluZm9bJ25hbWUnXSBvciAnJykubG93ZXIoKTpcbiAgICAgICAgICAgIHAua2lsbCgpXG5gXG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IGN1cnJlbnRDdXN0b20gPSBzYWZlU3RvcmFnZS5nZXQ8TmV1dHJhbGl6ZWRUaHJlYXRbXT4oJ3NlbnRpbmVsX2N1c3RvbV90aHJlYXRzJywgW10pO1xuICAgIGNvbnN0IHVwZGF0ZWRDdXN0b20gPSBbbmV3RW50cnksIC4uLmN1cnJlbnRDdXN0b21dO1xuICAgIHNhZmVTdG9yYWdlLnNldCgnc2VudGluZWxfY3VzdG9tX3RocmVhdHMnLCB1cGRhdGVkQ3VzdG9tKTtcbiAgICBzZXRUaHJlYXRzKFsuLi5JTklUSUFMX05FVVRSQUxJWkVEX1RIUkVBVFMsIC4uLnVwZGF0ZWRDdXN0b21dKTtcbiAgICBzZXRBY3RpdmVUaHJlYXRJZChuZXdFbnRyeS5pZCk7XG4gICAgc2V0SXNBZGRNb2RhbE9wZW4oZmFsc2UpO1xuXG4gICAgLy8gUmVzZXQgRm9ybVxuICAgIHNldE5ld1RocmVhdE5hbWUoJycpO1xuICAgIHNldE5ld1RocmVhdERlc2MoJycpO1xuICAgIHNldE5ld1RocmVhdEFnZ3Jlc3Npb24oJycpO1xuICAgIHNldE5ld1RocmVhdFZlY3RvcignJyk7XG4gICAgc2V0TmV3VGhyZWF0TmV1dHJhbGl6YXRpb24oJycpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUV4cG9ydEZvcmVuc2ljUmVwb3J0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHJlcG9ydFRleHQgPSBgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblNFTlRJTkVMIEZPUkVOU0lDIERPU1NJRVIgLSBSQVBPUlQgWk5JU1pDWk9OWUNIIFpBR1JPxbtFxYMgJiBVQk9KVSBNQUxXQVJFXG5EYXRhIHd5Z2VuZXJvd2FuaWE6ICR7bmV3IERhdGUoKS50b1VUQ1N0cmluZygpfVxuTGljemJhIHpuZXV0cmFsaXpvd2FueWNoIGluY3lkZW50w7N3OiAke3RocmVhdHMubGVuZ3RofVxuQmFyaWVyeSBPY2hyb25uZTogQUtUWVdORSAoTnRTdXNwZW5kUHJvY2VzcyArIFBFIEhlYWRlciBTYWJvdGFnZSArIEFDTCBEZW55KVxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuJHt0aHJlYXRzLm1hcCgodCwgaSkgPT4gYFxuW0lOQ0lERU5UICMke2kgKyAxfV0gJHt0Lm5hbWV9ICgke3QuY2F0ZWdvcnl9KVxuLSBTdGF0dXMgVWJvanU6ICR7dC5zdGF0dXN9XG4tIFBvemlvbSBaYWdyb8W8ZW5pYTogJHt0LnNldmVyaXR5fVxuLSBTSEEyNTY6ICR7dC5zaGEyNTZIYXNofVxuLSBFbnRyb3BpYTogJHt0LmVudHJvcHl9IC8gOC4wMFxuLSBEYXRhIG5ldXRyYWxpemFjamk6ICR7dC5uZXV0cmFsaXplZEF0fVxuLSBTeXN0ZW15IGRvY2Vsb3dlOiAke3QudGFyZ2V0T1Muam9pbignLCAnKX1cblxuMS4gT1BJUyBaQUdST8W7RU5JQTpcbiAgICR7dC5kZXNjcmlwdGlvbn1cblxuMi4gTUVDSEFOSVpNIEFHUkVTSkkgKEpBSyBBVEFLT1dBxYEpOlxuICAgVHl0dcWCOiAke3QuYWdncmVzc2lvbk1lY2hhbmlzbS50aXRsZX1cbiAgIFBvZHN1bW93YW5pZTogJHt0LmFnZ3Jlc3Npb25NZWNoYW5pc20uc3VtbWFyeX1cbiAgIE5hZHXFvHl3YW5lIEFQSTogJHt0LmFnZ3Jlc3Npb25NZWNoYW5pc20uYXBpc0FidXNlZC5qb2luKCcsICcpfVxuICAgU3pjemVnw7PFgnkgdGVjaG5pY3puZTpcbiR7dC5hZ2dyZXNzaW9uTWVjaGFuaXNtLnRlY2huaWNhbERldGFpbHMubWFwKGQgPT4gYCAgICAgKiAke2R9YCkuam9pbignXFxuJyl9XG5cbjMuIFNQT1PDk0IgV05JS05JxJhDSUEgRE8gS09NUFVURVJBIChXRUtUT1IgSU5GRUtDSkkpOlxuICAgS2FuYcWCOiAke3QuaW5mZWN0aW9uVmVjdG9yLmNoYW5uZWx9XG4gICBNZXRvZGE6ICR7dC5pbmZlY3Rpb25WZWN0b3IubWV0aG9kfVxuICAgVHlwIFBheWxvYWR1OiAke3QuaW5mZWN0aW9uVmVjdG9yLnBheWxvYWRUeXBlfVxuICAgQ1ZFOiAke3QuaW5mZWN0aW9uVmVjdG9yLnZ1bG5lcmFiaWxpdHlDdmUgfHwgJ0JyYWsnfVxuICAgxYFhxYRjdWNoIGluZmVrY2ppOlxuJHt0LmluZmVjdGlvblZlY3Rvci5leHBsb2l0Q2hhaW4ubWFwKGMgPT4gYCAgICAgJHtjfWApLmpvaW4oJ1xcbicpfVxuXG40LiBNRVRPREEgVUJPSlUgSSBORVVUUkFMSVpBQ0pJOlxuICAgTWV0b2RhOiAke3QubmV1dHJhbGl6YXRpb25EZXRhaWxzLm1ldGhvZE5hbWV9XG4gICBNZWNoYW5pem06ICR7dC5uZXV0cmFsaXphdGlvbkRldGFpbHMuc2xhdWdodGVyTWVjaGFuaXNtfVxuICAgRG93w7NkIGt3YXJhbnRhbm55OiAke3QubmV1dHJhbGl6YXRpb25EZXRhaWxzLnF1YXJhbnRpbmVQcm9vZn1cbiAgIFNla3dlbmNqYSBlZ3pla3Vjamk6XG4ke3QubmV1dHJhbGl6YXRpb25EZXRhaWxzLmV4ZWN1dGlvblN0ZXBzLm1hcChzID0+IGAgICAgIEtyb2sgJHtzLnN0ZXB9IFske3MudGltZXN0YW1wfV06ICR7cy5hY3Rpb259IC0+ICR7cy5yZXN1bHR9YCkuam9pbignXFxuJyl9XG5cbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5gKS5qb2luKCdcXG4nKX1cbmA7XG5cbiAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW3JlcG9ydFRleHRdLCB7IHR5cGU6ICd0ZXh0L3BsYWluO2NoYXJzZXQ9dXRmLTgnIH0pO1xuICAgIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgY29uc3QgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBhLmhyZWYgPSB1cmw7XG4gICAgYS5kb3dubG9hZCA9IGBzZW50aW5lbF9uZXV0cmFsaXplZF90aHJlYXRzX2Rvc3NpZXJfJHtEYXRlLm5vdygpfS50eHRgO1xuICAgIGEuY2xpY2soKTtcbiAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNiBmb250LXNhbnNcIj5cbiAgICAgIHsvKiBUb3AgSGVhZGVyIEJhbm5lciAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC02IHJvdW5kZWQtMnhsIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1zbGF0ZS05MDAgdmlhLXB1cnBsZS05NTAvNzAgdG8tc2xhdGUtOTAwIGJvcmRlciBib3JkZXItcHVycGxlLTgwMC80MCBzaGFkb3cteGwgcmVsYXRpdmUgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTAgcmlnaHQtMCBwLTggb3BhY2l0eS0xMCBwb2ludGVyLWV2ZW50cy1ub25lXCI+XG4gICAgICAgICAgPFNrdWxsIGNsYXNzTmFtZT1cInctNDggaC00OCB0ZXh0LXB1cnBsZS00MDBcIiAvPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgbWQ6ZmxleC1yb3cgaXRlbXMtc3RhcnQgbWQ6aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNCByZWxhdGl2ZSB6LTEwXCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yLjVcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicC0yIHJvdW5kZWQteGwgYmctcHVycGxlLTYwMC8yMCBib3JkZXIgYm9yZGVyLXB1cnBsZS01MDAvNDAgdGV4dC1wdXJwbGUtMzAwXCI+XG4gICAgICAgICAgICAgICAgPFNrdWxsIGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LXhsIHNtOnRleHQtMnhsIGZvbnQtYmxhY2sgdGV4dC13aGl0ZSB0cmFja2luZy10aWdodFwiPlxuICAgICAgICAgICAgICAgIEthcnRvdGVrYSBabmlzemN6b255Y2ggV2lydXPDs3cgJiBSZWplc3RyIFVib2p1XG4gICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIuNSBweS0wLjUgcm91bmRlZC1mdWxsIHRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZCBiZy1lbWVyYWxkLTk1MCB0ZXh0LWVtZXJhbGQtMzAwIGJvcmRlciBib3JkZXItZW1lcmFsZC04MDAvNjAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICA8U2hpZWxkQ2hlY2sgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgIHt0aHJlYXRzLmxlbmd0aH0gWmxpa3dpZG93YW55Y2ggWmFncm/FvGXFhFxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgc206dGV4dC1zbSB0ZXh0LXNsYXRlLTMwMCBtdC0yIG1heC13LTN4bFwiPlxuICAgICAgICAgICAgICBTemN6ZWfDs8WCb3dhIGJhemEgZGFueWNoIHpuZXV0cmFsaXpvd2FuZWdvIG1hbHdhcmUndSwgbmFrxYJhZGVrIGVrcmFub3d5Y2ggKEZsdXR0ZXIvV2luMzIpIGkgdHJvamFuw7N3LiBaYXdpZXJhIHByZWN5enlqbsSFIGFuYWxpesSZIDxzdHJvbmc+bWVjaGFuaXptdSBhZ3Jlc2ppPC9zdHJvbmc+LCA8c3Ryb25nPnNwb3NvYnUgd25pa25pxJljaWEgZG8gc3lzdGVtdTwvc3Ryb25nPiBvcmF6IDxzdHJvbmc+cHJvY2VkdXJ5IGJpbmFybmVnbyB1Ym9qdTwvc3Ryb25nPi5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgZmxleC13cmFwXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldElzQWRkTW9kYWxPcGVuKHRydWUpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zLjUgcHktMiByb3VuZGVkLXhsIGJnLXB1cnBsZS03MDAgaG92ZXI6YmctcHVycGxlLTYwMCB0ZXh0LXdoaXRlIHRleHQteHMgZm9udC1ib2xkIGZvbnQtbW9ubyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHNoYWRvdy1tZCBzaGFkb3ctcHVycGxlLTkwMC80MCBib3JkZXIgYm9yZGVyLXB1cnBsZS00MDAvMzAgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8UGx1c0NpcmNsZSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPkRvZGFqIFfFgmFzbnkgSW5jeWRlbnQ8L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVFeHBvcnRGb3JlbnNpY1JlcG9ydH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMy41IHB5LTIgcm91bmRlZC14bCBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHRleHQtc2xhdGUtMjAwIHRleHQteHMgZm9udC1ib2xkIGZvbnQtbW9ubyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPERvd25sb2FkIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtcHVycGxlLTQwMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPkVrc3BvcnR1aiBSYXBvcnQgKC50eHQpPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBGaWx0ZXIgJiBTZWFyY2ggQmFyICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTUgZ3JpZCBncmlkLWNvbHMtMSBzbTpncmlkLWNvbHMtMiBsZzpncmlkLWNvbHMtNCBnYXAtMyBwdC00IGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDAvODBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XG4gICAgICAgICAgICA8U2VhcmNoIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1zbGF0ZS00MDAgYWJzb2x1dGUgbGVmdC0zIHRvcC0yLjVcIiAvPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTenVrYWogd2lydXNhLCBtZWNoYW5pem11IGFncmVzamkuLi5cIlxuICAgICAgICAgICAgICB2YWx1ZT17c2VhcmNoUXVlcnl9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHNldFNlYXJjaFF1ZXJ5KGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHBsLTkgcHItMyBweS0xLjUgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAvODAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgdGV4dC14cyB0ZXh0LXdoaXRlIHBsYWNlaG9sZGVyLXNsYXRlLTUwMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXB1cnBsZS01MDBcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgIHZhbHVlPXtzZWxlY3RlZENhdGVnb3J5fVxuICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiBzZXRTZWxlY3RlZENhdGVnb3J5KGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIkZpbHRydWogd2VkxYJ1ZyBrYXRlZ29yaWlcIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHgtMyBweS0xLjUgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAvODAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgdGV4dC14cyB0ZXh0LXNsYXRlLTIwMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXB1cnBsZS01MDBcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiQUxMXCI+V3N6eXN0a2llIEthdGVnb3JpZTwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiU2NyZWVuIExvY2tlclwiPlNjcmVlbiBMb2NrZXIgKE5ha8WCYWRraSBFa3Jhbm93ZSk8L29wdGlvbj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlRyb2phbiBPdmVybGF5XCI+VHJvamFuIE92ZXJsYXkgKFN6cGllZ293c2tpZSBOYWvFgmFka2kpPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJSYW5zb213YXJlXCI+UmFuc29td2FyZSAoT2t1cCAmIFN6eWZyb3dhbmllKTwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiUHJvY2VzcyBXaXBlclwiPlByb2Nlc3MgV2lwZXIgKERlc3RydWtjamEgRHlza3UpPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJTdGVhbHRoIE1pbmVyXCI+U3RlYWx0aCBNaW5lciAoVWtyeXRhIEtvcGFya2EpPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJSb290a2l0IEhvb2tcIj5Sb290a2l0IEhvb2sgKEJlenBsaWtvd2UpPC9vcHRpb24+XG4gICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgIHZhbHVlPXtzZWxlY3RlZFNldmVyaXR5fVxuICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiBzZXRTZWxlY3RlZFNldmVyaXR5KGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIkZpbHRydWogd2VkxYJ1ZyBwb3ppb211IHphZ3JvxbxlbmlhXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB4LTMgcHktMS41IHJvdW5kZWQteGwgYmctc2xhdGUtOTUwLzgwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHRleHQteHMgdGV4dC1zbGF0ZS0yMDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1wdXJwbGUtNTAwXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkFMTFwiPldzenlzdGtpZSBQb3ppb215IFJ5enlrYTwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiRVhUUkVNRVwiPkVYVFJFTUUgKEtyeXR5Y3puZSBabmlzemN6ZW5pZSk8L29wdGlvbj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkNSSVRJQ0FMXCI+Q1JJVElDQUwgKEJsb2thZGEgU3lzdGVtdSk8L29wdGlvbj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkhJR0hcIj5ISUdIIChXeXNva2llIFphZ3JvxbxlbmllKTwvb3B0aW9uPlxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRPU31cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0U2VsZWN0ZWRPUyhlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJGaWx0cnVqIHdlZMWCdWcgc3lzdGVtdSBvcGVyYWN5am5lZ29cIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHgtMyBweS0xLjUgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAvODAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgdGV4dC14cyB0ZXh0LXNsYXRlLTIwMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXB1cnBsZS01MDBcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiQUxMXCI+V3N6eXN0a2llIFN5c3RlbXkgKFdpbi9MaW51eC9NYWMpPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJ3aW5kb3dzXCI+V2luZG93cyAoV2luMzIgLyBDdHlwZXMgLyBOVERMTCk8L29wdGlvbj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImxpbnV4XCI+TGludXggKFgxMSAvIFdheWxhbmQgLyBTSUdLSUxMKTwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwibWFjb3NcIj5tYWNPUyAoUXVhcnR6IC8gQ29yZUdyYXBoaWNzKTwvb3B0aW9uPlxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBNYWluIEdyaWQ6IExlZnQgTGlzdCArIFJpZ2h0IERlZXAgSW5zcGVjdGlvbiBDYXJkICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIGxnOmdyaWQtY29scy0xMiBnYXAtNlwiPlxuICAgICAgICB7LyogTGVmdCBDb2x1bW46IFRocmVhdHMgTGlzdCAoNCBjb2xzKSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi00IHNwYWNlLXktM1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQteHMgZm9udC1tb25vIHRleHQtc2xhdGUtNDAwIHB4LTFcIj5cbiAgICAgICAgICAgIDxzcGFuPlppZGVudHlmaWtvd2FuZSBaYWdyb8W8ZW5pYSAoe2ZpbHRlcmVkVGhyZWF0cy5sZW5ndGh9KTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuPlN0YXR1czogMTAwJSBabGlrd2lkb3dhbmU8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMi41IG1heC1oLVs3MDBweF0gb3ZlcmZsb3cteS1hdXRvIHByLTFcIj5cbiAgICAgICAgICAgIHtmaWx0ZXJlZFRocmVhdHMubWFwKHRocmVhdCA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSB0aHJlYXQuaWQgPT09IGFjdGl2ZVRocmVhdElkO1xuICAgICAgICAgICAgICBjb25zdCBzZXZlcml0eUNvbG9yID0ge1xuICAgICAgICAgICAgICAgIEVYVFJFTUU6ICd0ZXh0LXJlZC00MDAgYmctcmVkLTk1MC82MCBib3JkZXItcmVkLTgwMC84MCcsXG4gICAgICAgICAgICAgICAgQ1JJVElDQUw6ICd0ZXh0LW9yYW5nZS00MDAgYmctb3JhbmdlLTk1MC82MCBib3JkZXItb3JhbmdlLTgwMC84MCcsXG4gICAgICAgICAgICAgICAgSElHSDogJ3RleHQtYW1iZXItNDAwIGJnLWFtYmVyLTk1MC82MCBib3JkZXItYW1iZXItODAwLzgwJyxcbiAgICAgICAgICAgICAgICBNRURJVU06ICd0ZXh0LWJsdWUtNDAwIGJnLWJsdWUtOTUwLzYwIGJvcmRlci1ibHVlLTgwMC84MCcsXG4gICAgICAgICAgICAgIH1bdGhyZWF0LnNldmVyaXR5XTtcblxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgIGtleT17dGhyZWF0LmlkfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGhyZWF0SWQodGhyZWF0LmlkKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHAtMy41IHJvdW5kZWQteGwgYm9yZGVyIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWRcbiAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1wdXJwbGUtOTUwLzYwIGJvcmRlci1wdXJwbGUtNTAwLzgwIHNoYWRvdy1sZyBzaGFkb3ctcHVycGxlLTk1MC81MCdcbiAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05MDAvODAgYm9yZGVyLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS04MDAvNjAgaG92ZXI6Ym9yZGVyLXNsYXRlLTcwMCdcbiAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBqdXN0aWZ5LWJldHdlZW4gZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTIgaC0yIHJvdW5kZWQtZnVsbCBiZy1yZWQtNTAwIGFuaW1hdGUtcHVsc2VcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LXhzIHNtOnRleHQtc20gdGV4dC13aGl0ZSB0cnVuY2F0ZSBtYXgtdy1bMjAwcHhdXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhyZWF0Lm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHRleHQtWzEwcHhdIGZvbnQtbW9ubyBmb250LWJvbGQgcHgtMS41IHB5LTAuNSByb3VuZGVkIGJvcmRlciAke3NldmVyaXR5Q29sb3J9YH0+XG4gICAgICAgICAgICAgICAgICAgICAge3RocmVhdC5zZXZlcml0eX1cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBtdC0yIHRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTEuNSBweS0wLjUgYmctc2xhdGUtOTUwIHJvdW5kZWQgdGV4dC1wdXJwbGUtMzAwIGZvbnQtbW9ubyB0ZXh0LVsxMHB4XVwiPlxuICAgICAgICAgICAgICAgICAgICAgIHt0aHJlYXQuY2F0ZWdvcnl9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+4oCiPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMCBmb250LW1vbm8gdGV4dC1bMTBweF1cIj5cbiAgICAgICAgICAgICAgICAgICAgICBTSEE6IHt0aHJlYXQuc2hhMjU2SGFzaC5zdWJzdHJpbmcoMCwgOCl9Li4uXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtMzAwIG10LTIgbGluZS1jbGFtcC0yIGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgICAgICAgICAgICB7dGhyZWF0LmRlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTIuNSBwdC0yIGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDAvNjAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQtWzEwcHhdIGZvbnQtbW9ubyB0ZXh0LWVtZXJhbGQtNDAwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPENoZWNrQ2lyY2xlMiBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICB7dGhyZWF0LnN0YXR1c31cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMC41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgQmFkYWogPENoZXZyb25SaWdodCBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KX1cblxuICAgICAgICAgICAge2ZpbHRlcmVkVGhyZWF0cy5sZW5ndGggPT09IDAgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtOCB0ZXh0LWNlbnRlciBiZy1zbGF0ZS05MDAvNjAgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTQwMCB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgICAgTmllIHpuYWxlemlvbm8gemFncm/FvGXFhCBzcGXFgm5pYWrEhWN5Y2ggcG9kYW5lIGtyeXRlcmlhIHd5c3p1a2l3YW5pYS5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogUmlnaHQgQ29sdW1uOiBEZWVwIEZvcmVuc2ljIERvc3NpZXIgKDggY29scykgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tOCBzcGFjZS15LTZcIj5cbiAgICAgICAgICB7YWN0aXZlVGhyZWF0ICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC02IHJvdW5kZWQtMnhsIGJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBzaGFkb3ctMnhsIHNwYWNlLXktNlwiPlxuICAgICAgICAgICAgICB7LyogSGVhZGVyIERldGFpbHMgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBzbTppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00IHBiLTUgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMlwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbW9ubyBweC0yIHB5LTAuNSByb3VuZGVkIGJnLXJlZC05NTAgdGV4dC1yZWQtMzAwIGJvcmRlciBib3JkZXItcmVkLTgwMC84MCBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7YWN0aXZlVGhyZWF0LmNhdGVnb3J5LnRvVXBwZXJDYXNlKCl9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1vbm8gcHgtMiBweS0wLjUgcm91bmRlZCBiZy1wdXJwbGUtOTUwIHRleHQtcHVycGxlLTMwMCBib3JkZXIgYm9yZGVyLXB1cnBsZS04MDAvNjBcIj5cbiAgICAgICAgICAgICAgICAgICAgICBPUzoge2FjdGl2ZVRocmVhdC50YXJnZXRPUy5qb2luKCcgLyAnKS50b1VwcGVyQ2FzZSgpfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIHB4LTIgcHktMC41IHJvdW5kZWQgYmctZW1lcmFsZC05NTAgdGV4dC1lbWVyYWxkLTMwMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtODAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgRU5UUk9QSUE6IHthY3RpdmVUaHJlYXQuZW50cm9weX1cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXhsIHNtOnRleHQtMnhsIGZvbnQtYmxhY2sgdGV4dC13aGl0ZSBtdC0yXCI+XG4gICAgICAgICAgICAgICAgICAgIHthY3RpdmVUaHJlYXQubmFtZX1cbiAgICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgICB7YWN0aXZlVGhyZWF0LmFsaWFzICYmIChcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXB1cnBsZS00MDAgZm9udC1tb25vIG10LTAuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgIEFsaWFzOiB7YWN0aXZlVGhyZWF0LmFsaWFzfVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIFNpbXVsYXRpb24gQnV0dG9uICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlU3RhcnRMaXZlU2xhdWdodGVyKGFjdGl2ZVRocmVhdCl9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtzaW11bGF0aW5nVGhyZWF0SWQgPT09IGFjdGl2ZVRocmVhdC5pZH1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0yIHJvdW5kZWQteGwgYmctZ3JhZGllbnQtdG8tciBmcm9tLXJlZC02MDAgdmlhLXBpbmstNjAwIHRvLXB1cnBsZS02MDAgaG92ZXI6ZnJvbS1yZWQtNTAwIGhvdmVyOnRvLXB1cnBsZS01MDAgdGV4dC13aGl0ZSB0ZXh0LXhzIHNtOnRleHQtc20gZm9udC1ib2xkIGZvbnQtbW9ubyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBzaGFkb3ctbGcgc2hhZG93LXJlZC05NTAvNjAgYm9yZGVyIGJvcmRlci1yZWQtNDAwLzQwIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPEZsYW1lIGNsYXNzTmFtZT17YHctNCBoLTQgJHtzaW11bGF0aW5nVGhyZWF0SWQgPT09IGFjdGl2ZVRocmVhdC5pZCA/ICdhbmltYXRlLWJvdW5jZSB0ZXh0LXllbGxvdy0zMDAnIDogJyd9YH0gLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAge3NpbXVsYXRpbmdUaHJlYXRJZCA9PT0gYWN0aXZlVGhyZWF0LmlkID8gJ1Ryd2EgVWLDs2ogbmEgxbt5d28uLi4nIDogJ1N5bXVsdWogVWLDs2ogbmEgxbt5d28nfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIExpdmUgU2xhdWdodGVyIFRlcm1pbmFsIEJveCAoaWYgc2ltdWxhdGluZykgKi99XG4gICAgICAgICAgICAgIHtzaW11bGF0aW5nVGhyZWF0SWQgPT09IGFjdGl2ZVRocmVhdC5pZCAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC14bCBiZy1ibGFjayBib3JkZXItMiBib3JkZXItcmVkLTUwMC84MCBzaGFkb3ctMnhsIGZvbnQtbW9ubyB0ZXh0LXhzIHRleHQtc2xhdGUtMjAwIHNwYWNlLXktMlwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcGItMiBib3JkZXItYiBib3JkZXItcmVkLTkwMC82MCB0ZXh0LXJlZC00MDAgZm9udC1ib2xkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPFNrdWxsIGNsYXNzTmFtZT1cInctNCBoLTQgYW5pbWF0ZS1zcGluIHRleHQtcmVkLTUwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgQVVUT05PTUlDWk5ZIFBST1RPS8OTxYEgVUJPSlUgVyBUT0tVIChMSVZFIFNFTlRJTkVMIEVYRUNVVElPTilcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBiZy1yZWQtOTUwIHB4LTIgcHktMC41IHJvdW5kZWQgYm9yZGVyIGJvcmRlci1yZWQtODAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgS3Jvazoge3NpbXVsYXRpb25DdXJyZW50U3RlcH1cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjUgbWF4LWgtNDggb3ZlcmZsb3cteS1hdXRvIHB0LTEgdGV4dC1zbGF0ZS0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAge3NpbXVsYXRpb25Mb2dzLm1hcCgobG9nLCBpZHgpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aWR4fSBjbGFzc05hbWU9e2xvZy5pbmNsdWRlcygnW0tST0snKSA/ICd0ZXh0LXllbGxvdy00MDAgZm9udC1ib2xkJyA6IGxvZy5pbmNsdWRlcygnW1BVUkdFJykgPyAndGV4dC1lbWVyYWxkLTQwMCBmb250LWJvbGQnIDogJ3RleHQtc2xhdGUtNDAwJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICB7bG9nfVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgIHsvKiBEZXNjcmlwdGlvbiAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAvODAgdGV4dC14cyBzbTp0ZXh0LXNtIHRleHQtc2xhdGUtMzAwIGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcHVycGxlLTQwMCBmb250LWJvbGQgYmxvY2sgbWItMSBmb250LW1vbm8gdGV4dC14c1wiPlxuICAgICAgICAgICAgICAgICAgW1BST0ZJTCBXWVdJQURPV0NaWSAvIEZPUkVOU0lDIE9WRVJWSUVXXTpcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAge2FjdGl2ZVRocmVhdC5kZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIFR3byBDb2x1bW4gTGF5b3V0OiBBZ2dyZXNzaW9uIE1lY2hhbmlzbSAmIEluZmVjdGlvbiBWZWN0b3IgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNVwiPlxuICAgICAgICAgICAgICAgIHsvKiAxLiBBZ2dyZXNzaW9uIE1lY2hhbmlzbSAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLXhsIGJnLXJlZC05NTAvMjAgYm9yZGVyIGJvcmRlci1yZWQtODAwLzQwIHNwYWNlLXktM1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTIgdGV4dC1yZWQtNDAwIGZvbnQtYm9sZCB0ZXh0LXhzIHNtOnRleHQtc21cIj5cbiAgICAgICAgICAgICAgICAgICAgPFNoaWVsZEFsZXJ0IGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5NRUNIQU5JWk0gQUdSRVNKSSAoSkFLIEFUQUtVSkUpPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtd2hpdGUgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgICAgIHthY3RpdmVUaHJlYXQuYWdncmVzc2lvbk1lY2hhbmlzbS50aXRsZX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtMzAwIGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgICAgICAgICAgICB7YWN0aXZlVGhyZWF0LmFnZ3Jlc3Npb25NZWNoYW5pc20uc3VtbWFyeX1cbiAgICAgICAgICAgICAgICAgIDwvcD5cblxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNSBwdC0xXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtbW9ubyB0ZXh0LXJlZC0zMDAgZm9udC1ib2xkIGJsb2NrXCI+XG4gICAgICAgICAgICAgICAgICAgICAgS2x1Y3pvd2UgRHppYcWCYW5pYSBOaXN6Y3rEhWNlOlxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJzcGFjZS15LTEgdGV4dC14cyB0ZXh0LXNsYXRlLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIHthY3RpdmVUaHJlYXQuYWdncmVzc2lvbk1lY2hhbmlzbS50ZWNobmljYWxEZXRhaWxzLm1hcCgoZGV0YWlsLCBpZHgpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBrZXk9e2lkeH0gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcmVkLTQwMCBmb250LW1vbm8gZm9udC1ib2xkXCI+4oCiPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57ZGV0YWlsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdC0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTQwMCBibG9jayBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgTmFkdcW8eXdhbmUgRnVua2NqZSBBUEk6XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBnYXAtMVwiPlxuICAgICAgICAgICAgICAgICAgICAgIHthY3RpdmVUaHJlYXQuYWdncmVzc2lvbk1lY2hhbmlzbS5hcGlzQWJ1c2VkLm1hcCgoYXBpLCBpZHgpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGtleT17aWR4fSBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gcHgtMiBweS0wLjUgcm91bmRlZCBiZy1yZWQtOTUwIHRleHQtcmVkLTMwMCBib3JkZXIgYm9yZGVyLXJlZC05MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge2FwaX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHsvKiAyLiBJbmZlY3Rpb24gVmVjdG9yICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQteGwgYmctcHVycGxlLTk1MC8yMCBib3JkZXIgYm9yZGVyLXB1cnBsZS04MDAvNDAgc3BhY2UteS0zXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMiB0ZXh0LXB1cnBsZS00MDAgZm9udC1ib2xkIHRleHQteHMgc206dGV4dC1zbVwiPlxuICAgICAgICAgICAgICAgICAgICA8WmFwIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5TUE9Tw5NCIFdOSUtOScSYQ0lBIERPIEtPTVBVVEVSQTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXdoaXRlIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgICAgICBLYW5hxYI6IHthY3RpdmVUaHJlYXQuaW5mZWN0aW9uVmVjdG9yLmNoYW5uZWx9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTMwMCBsZWFkaW5nLXJlbGF4ZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz5NZXRvZGE6PC9zdHJvbmc+IHthY3RpdmVUaHJlYXQuaW5mZWN0aW9uVmVjdG9yLm1ldGhvZH1cbiAgICAgICAgICAgICAgICAgIDwvcD5cblxuICAgICAgICAgICAgICAgICAge2FjdGl2ZVRocmVhdC5pbmZlY3Rpb25WZWN0b3IudnVsbmVyYWJpbGl0eUN2ZSAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LWFtYmVyLTMwMCBmb250LW1vbm8gYmctYW1iZXItOTUwLzQwIHAtMiByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItYW1iZXItODAwLzYwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz5Qb2RhdG5vxZvEhyBDVkU6PC9zdHJvbmc+IHthY3RpdmVUaHJlYXQuaW5mZWN0aW9uVmVjdG9yLnZ1bG5lcmFiaWxpdHlDdmV9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNSBwdC0xXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtbW9ubyB0ZXh0LXB1cnBsZS0zMDAgZm9udC1ib2xkIGJsb2NrXCI+XG4gICAgICAgICAgICAgICAgICAgICAgxYFhxYRjdWNoIFduaWtuacSZY2lhIChFeHBsb2l0IENoYWluKTpcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMSB0ZXh0LXhzIHRleHQtc2xhdGUtMzAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAge2FjdGl2ZVRocmVhdC5pbmZlY3Rpb25WZWN0b3IuZXhwbG9pdENoYWluLm1hcCgoc3RlcCwgaWR4KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aWR4fSBjbGFzc05hbWU9XCJwLTEuNSBiZy1zbGF0ZS05NTAvNjAgcm91bmRlZCBib3JkZXIgYm9yZGVyLXB1cnBsZS05MDAvNDAgZm9udC1tb25vIHRleHQtWzExcHhdXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtzdGVwfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiAzLiBOZXV0cmFsaXphdGlvbiAmIFNsYXVnaHRlciBFeGVjdXRpb24gTG9nICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNSByb3VuZGVkLXhsIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtOTAwLzQwIHNwYWNlLXktNFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMiB0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtYm9sZCB0ZXh0LXhzIHNtOnRleHQtc21cIj5cbiAgICAgICAgICAgICAgICAgICAgPENoZWNrQ2lyY2xlMiBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+UFJPQ0VEVVJBIFVCT0pVICYgTkVVVFJBTElaQUNKSSAoU0xBVUdIVEVSIENIQUlOKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1vbm8gcHgtMiBweS0wLjUgcm91bmRlZCBiZy1lbWVyYWxkLTk1MCB0ZXh0LWVtZXJhbGQtMzAwIGJvcmRlciBib3JkZXItZW1lcmFsZC04MDAgZm9udC1ib2xkXCI+XG4gICAgICAgICAgICAgICAgICAgIHthY3RpdmVUaHJlYXQuc3RhdHVzfVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtMzAwXCI+XG4gICAgICAgICAgICAgICAgICA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC0zMDAgZm9udC1tb25vXCI+e2FjdGl2ZVRocmVhdC5uZXV0cmFsaXphdGlvbkRldGFpbHMubWV0aG9kTmFtZX06PC9zdHJvbmc+IHthY3RpdmVUaHJlYXQubmV1dHJhbGl6YXRpb25EZXRhaWxzLnNsYXVnaHRlck1lY2hhbmlzbX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHsvKiBTdGVwcyBUYWJsZSAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1tb25vIHRleHQtc2xhdGUtNDAwIGZvbnQtYm9sZCBibG9ja1wiPlxuICAgICAgICAgICAgICAgICAgICBGb3JlbnNpYyBFeGVjdXRpb24gU3RlcHM6XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41IGZvbnQtbW9ubyB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgICAgICAgIHthY3RpdmVUaHJlYXQubmV1dHJhbGl6YXRpb25EZXRhaWxzLmV4ZWN1dGlvblN0ZXBzLm1hcChzdGVwID0+IChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17c3RlcC5zdGVwfSBjbGFzc05hbWU9XCJwLTIuNSBiZy1zbGF0ZS05MDAvOTAgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IHNtOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctNSBoLTUgcm91bmRlZC1mdWxsIGJnLWVtZXJhbGQtOTAwLzgwIHRleHQtZW1lcmFsZC0zMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZm9udC1ib2xkIHRleHQtWzEwcHhdXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3N0ZXAuc3RlcH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTIwMFwiPntzdGVwLmFjdGlvbn08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1yaWdodCBzbTp0ZXh0LXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC00MDAgZm9udC1zZW1pYm9sZFwiPntzdGVwLnJlc3VsdH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNTAwIG1sLTJcIj4oe3N0ZXAudGltZXN0YW1wfSk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHsvKiBQeXRob24gS2lsbCBDb2RlIFNuaXBwZXQgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdC0yIHNwYWNlLXktMlwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1vbm8gdGV4dC1wdXJwbGUtMzAwIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPEZpbGVDb2RlIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICBTa3J5cHQgRWtzdGVybWluYWNqaSB3IFB5dGhvbmllIChSZWFkeS1Uby1SdW4pOlxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVDb3B5Q29kZShhY3RpdmVUaHJlYXQuaWQsIGFjdGl2ZVRocmVhdC5uZXV0cmFsaXphdGlvbkRldGFpbHMucHl0aG9uS2lsbFNuaXBwZXQpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIuNSBweS0xIHJvdW5kZWQtbGcgYmctc2xhdGUtODAwIGhvdmVyOmJnLXNsYXRlLTcwMCB0ZXh0LXNsYXRlLTMwMCBob3Zlcjp0ZXh0LXdoaXRlIHRleHQteHMgZm9udC1tb25vIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHRyYW5zaXRpb24tY29sb3JzIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIHtjb3BpZWRDb2RlSWQgPT09IGFjdGl2ZVRocmVhdC5pZCA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxDaGVjayBjbGFzc05hbWU9XCJ3LTMgaC0zIHRleHQtZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtNDAwXCI+U2tvcGlvd2Fubzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8Q29weSBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+S29waXVqIC5weTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIDxwcmUgY2xhc3NOYW1lPVwicC0zIGJnLWJsYWNrLzkwIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgZm9udC1tb25vIHRleHQteHMgdGV4dC1lbWVyYWxkLTMwMCBvdmVyZmxvdy14LWF1dG9cIj5cbiAgICAgICAgICAgICAgICAgICAgPGNvZGU+e2FjdGl2ZVRocmVhdC5uZXV0cmFsaXphdGlvbkRldGFpbHMucHl0aG9uS2lsbFNuaXBwZXR9PC9jb2RlPlxuICAgICAgICAgICAgICAgICAgPC9wcmU+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIE1vZGFsOiBEb2RhaiBXxYJhc255IEluY3lkZW50ICovfVxuICAgICAge2lzQWRkTW9kYWxPcGVuICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNTAgYmctYmxhY2svODAgYmFja2Ryb3AtYmx1ci1zbSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwLTRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCByb3VuZGVkLTJ4bCBtYXgtdy14bCB3LWZ1bGwgcC02IHNwYWNlLXktNSBzaGFkb3ctMnhsXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBwYi0zIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTIgdGV4dC13aGl0ZSBmb250LWJvbGQgdGV4dC1sZ1wiPlxuICAgICAgICAgICAgICAgIDxQbHVzQ2lyY2xlIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1wdXJwbGUtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5Eb2RhaiBOb3d5IEluY3lkZW50IFphZ3JvxbxlbmlhPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldElzQWRkTW9kYWxPcGVuKGZhbHNlKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxYIGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8Zm9ybSBvblN1Ym1pdD17aGFuZGxlU2F2ZUN1c3RvbUluY2lkZW50fSBjbGFzc05hbWU9XCJzcGFjZS15LTQgdGV4dC14cyB0ZXh0LXNsYXRlLTIwMFwiPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNsYXRlLTMwMCBmb250LW1vbm8gbWItMVwiPk5hendhIFphZ3JvxbxlbmlhIC8gU3lnbmF0dXJhOjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJucC4gRmx1dHRlclRyYXAueDY0LCBSb2d1ZUluamVjdG9yLldpbjMyXCJcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtuZXdUaHJlYXROYW1lfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0TmV3VGhyZWF0TmFtZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHgtMyBweS0yIHJvdW5kZWQteGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHRleHQtd2hpdGUgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1wdXJwbGUtNTAwXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtc2xhdGUtMzAwIGZvbnQtbW9ubyBtYi0xXCI+S2F0ZWdvcmlhOjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtuZXdUaHJlYXRDYXRlZ29yeX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0TmV3VGhyZWF0Q2F0ZWdvcnkoZS50YXJnZXQudmFsdWUgYXMgVGhyZWF0Q2F0ZWdvcnkpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHgtMyBweS0yIHJvdW5kZWQteGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHRleHQtd2hpdGUgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1wdXJwbGUtNTAwXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlNjcmVlbiBMb2NrZXJcIj5TY3JlZW4gTG9ja2VyPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJUcm9qYW4gT3ZlcmxheVwiPlRyb2phbiBPdmVybGF5PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJSYW5zb213YXJlXCI+UmFuc29td2FyZTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiUHJvY2VzcyBXaXBlclwiPlByb2Nlc3MgV2lwZXI8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlN0ZWFsdGggTWluZXJcIj5TdGVhbHRoIE1pbmVyPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJSb290a2l0IEhvb2tcIj5Sb290a2l0IEhvb2s8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNsYXRlLTMwMCBmb250LW1vbm8gbWItMVwiPlBvemlvbSBSeXp5a2E6PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e25ld1RocmVhdFNldmVyaXR5fVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiBzZXROZXdUaHJlYXRTZXZlcml0eShlLnRhcmdldC52YWx1ZSBhcyBUaHJlYXRTZXZlcml0eSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC0zIHB5LTIgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgdGV4dC13aGl0ZSBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXB1cnBsZS01MDBcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiRVhUUkVNRVwiPkVYVFJFTUU8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkNSSVRJQ0FMXCI+Q1JJVElDQUw8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkhJR0hcIj5ISUdIPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJNRURJVU1cIj5NRURJVU08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNsYXRlLTMwMCBmb250LW1vbm8gbWItMVwiPk9waXMgRHppYcWCYW5pYTo8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICAgICAgcm93cz17Mn1cbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiS3LDs3RraSBvcGlzIHphY2hvd2FuaWEgd2lydXNhLi4uXCJcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtuZXdUaHJlYXREZXNjfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0TmV3VGhyZWF0RGVzYyhlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHgtMyBweS0yIHJvdW5kZWQteGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHRleHQtd2hpdGUgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1wdXJwbGUtNTAwXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNsYXRlLTMwMCBmb250LW1vbm8gbWItMVwiPk1lY2hhbml6bSBBZ3Jlc2ppIChKYWsgYXRha3VqZSk6PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwibnAuIEhXTkRfVE9QTU9TVCBob29rLCB3eXfFgmFzemN6YW5pZSBmb2t1c3UsIGJsb2thZGEga2xhd2lhdHVyeVwiXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17bmV3VGhyZWF0QWdncmVzc2lvbn1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHNldE5ld1RocmVhdEFnZ3Jlc3Npb24oZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB4LTMgcHktMiByb3VuZGVkLXhsIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCB0ZXh0LXdoaXRlIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItcHVycGxlLTUwMFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1zbGF0ZS0zMDAgZm9udC1tb25vIG1iLTFcIj5TcG9zw7NiIFduaWtuacSZY2lhIGRvIEtvbXB1dGVyYTo8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJucC4gUGhpc2hpbmcgZS1tYWlsLCBwb2Ryb2Jpb25hIHBhY3prYSBucG0sIGNyYWNrL3RvcnJlbnRcIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9e25ld1RocmVhdFZlY3Rvcn1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHNldE5ld1RocmVhdFZlY3RvcihlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHgtMyBweS0yIHJvdW5kZWQteGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHRleHQtd2hpdGUgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1wdXJwbGUtNTAwXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktZW5kIGdhcC0zIHB0LTNcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldElzQWRkTW9kYWxPcGVuKGZhbHNlKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMiByb3VuZGVkLXhsIGJnLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTMwMCBob3Zlcjp0ZXh0LXdoaXRlIGZvbnQtc2VtaWJvbGQgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIEFudWx1alxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0yIHJvdW5kZWQteGwgYmctcHVycGxlLTYwMCBob3ZlcjpiZy1wdXJwbGUtNTAwIHRleHQtd2hpdGUgZm9udC1ib2xkIGZvbnQtbW9ubyBzaGFkb3ctbGcgc2hhZG93LXB1cnBsZS05NTAgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIFphcGlzeiB3IFJlamVzdHJ6ZVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdLCJtYXBwaW5ncyI6IkFBaVBVLFNBZ1ljLFVBaFlkO0FBalBWLFNBQWdCLFVBQVUsZUFBZTtBQUN6QztBQUFBLEVBQ0U7QUFBQSxFQUFhO0FBQUEsRUFBYTtBQUFBLEVBQWlCO0FBQUEsRUFBVTtBQUFBLEVBQ3RDO0FBQUEsRUFBc0I7QUFBQSxFQUFVO0FBQUEsRUFBTTtBQUFBLEVBQU87QUFBQSxFQUN0QztBQUFBLEVBQXFCO0FBQUEsRUFBWTtBQUFBLEVBQWlCO0FBQUEsT0FDbkU7QUFDUCxTQUFTLG1DQUFtQztBQUU1QyxTQUFTLG1CQUFtQjtBQUVyQixhQUFNLDJCQUFxQyxNQUFNO0FBQ3RELFFBQU0sQ0FBQyxTQUFTLFVBQVUsSUFBSSxTQUE4QixNQUFNO0FBQ2hFLFVBQU0sU0FBUyxZQUFZLElBQXlCLDJCQUEyQixDQUFDLENBQUM7QUFDakYsV0FBTyxDQUFDLEdBQUcsNkJBQTZCLEdBQUcsTUFBTTtBQUFBLEVBQ25ELENBQUM7QUFFRCxRQUFNLENBQUMsYUFBYSxjQUFjLElBQUksU0FBUyxFQUFFO0FBQ2pELFFBQU0sQ0FBQyxrQkFBa0IsbUJBQW1CLElBQUksU0FBaUIsS0FBSztBQUN0RSxRQUFNLENBQUMsa0JBQWtCLG1CQUFtQixJQUFJLFNBQWlCLEtBQUs7QUFDdEUsUUFBTSxDQUFDLFlBQVksYUFBYSxJQUFJLFNBQWlCLEtBQUs7QUFDMUQsUUFBTSxDQUFDLGdCQUFnQixpQkFBaUIsSUFBSSxTQUFpQixRQUFRLENBQUMsR0FBRyxNQUFNLHVCQUF1QjtBQUd0RyxRQUFNLENBQUMsb0JBQW9CLHFCQUFxQixJQUFJLFNBQXdCLElBQUk7QUFDaEYsUUFBTSxDQUFDLHVCQUF1Qix3QkFBd0IsSUFBSSxTQUFpQixDQUFD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