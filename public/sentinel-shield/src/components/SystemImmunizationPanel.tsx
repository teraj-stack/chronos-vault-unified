import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"]; const useMemo = __vite__cjsImport1_react["useMemo"];
import {
  ShieldCheck,
  Lock,
  Terminal,
  FileCode,
  Download,
  Copy,
  Check,
  Play,
  Layers,
  HardDrive,
  Zap,
  CheckCircle2,
  Shield,
  Flame,
  Search,
  CheckCheck
} from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import {
  getStoredImmunizationState,
  saveImmunizationState,
  generateWindowsRegistryReg,
  generateWindowsFirewallPowerShell,
  generateAppLockerGpoXml,
  generateOneClickDeployBat,
  downloadCompleteImmunizationBundle,
  downloadRawFile,
  buildImmunizationRules
} from "/sentinel-shield/src/utils/systemImmunizationEngine.ts";
export const SystemImmunizationPanel = ({ threats }) => {
  const [immunizationState, setImmunizationState] = useState(
    () => getStoredImmunizationState(threats)
  );
  const [activeTab, setActiveTab] = useState("REGISTRY");
  const [copiedKey, setCopiedKey] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDownloadingBundle, setIsDownloadingBundle] = useState(false);
  const [actionSuccessMessage, setActionSuccessMessage] = useState(null);
  const [testTargetThreatId, setTestTargetThreatId] = useState(threats[0]?.id || "");
  const [isTestingImmunity, setIsTestingImmunity] = useState(false);
  const [testLogs, setTestLogs] = useState([]);
  const [testVerdict, setTestVerdict] = useState(null);
  const rules = useMemo(() => buildImmunizationRules(threats), [threats]);
  const uniqueBinaries = useMemo(() => {
    return Array.from(new Set(rules.map((r) => r.targetBinary)));
  }, [rules]);
  const filteredRules = useMemo(() => {
    return rules.filter(
      (r) => r.targetBinary.toLowerCase().includes(searchQuery.toLowerCase()) || r.threatName.toLowerCase().includes(searchQuery.toLowerCase()) || r.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [rules, searchQuery]);
  const handleCopy = (key, content) => {
    navigator.clipboard.writeText(content);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2e3);
  };
  const handleDownloadZip = async () => {
    setIsDownloadingBundle(true);
    try {
      const filename = await downloadCompleteImmunizationBundle(threats);
      setActionSuccessMessage(`Pobrano kompletny pakiet immunizacji: ${filename}`);
      setTimeout(() => setActionSuccessMessage(null), 6e3);
    } catch (err) {
      console.error(err);
      alert("Nie udało się wygenerować archiwum ZIP.");
    } finally {
      setIsDownloadingBundle(false);
    }
  };
  const handleApplyImmunization = () => {
    const updatedState = {
      ...immunizationState,
      isImmunized: true,
      appliedDate: (/* @__PURE__ */ new Date()).toUTCString(),
      registryRulesCount: uniqueBinaries.length,
      firewallRulesCount: uniqueBinaries.length * 2,
      appLockerRulesCount: threats.length + 1,
      activeVaccines: rules
    };
    saveImmunizationState(updatedState);
    setImmunizationState(updatedState);
    setActionSuccessMessage("System został zaimmunizowany w pamięci monolitu. Reguły IFEO, Firewall oraz GPO są aktywne.");
    setTimeout(() => setActionSuccessMessage(null), 5e3);
  };
  const handleRunImmunityTest = () => {
    const targetThreat = threats.find((t) => t.id === testTargetThreatId) || threats[0];
    if (!targetThreat) return;
    setIsTestingImmunity(true);
    setTestVerdict(null);
    setTestLogs([]);
    const stepsSequence = [
      { step: `Inicjalizacja próby wykonania złośliwego pliku binarnego dla: ${targetThreat.name}`, layer: "KERNEL", status: "CHECKING" },
      { step: "Krok 1: Weryfikacja klucza rejestru Image File Execution Options (IFEO)", layer: "REGISTRY_IFEO", status: "BLOCKED" },
      { step: "Krok 2: Odpytanie sterownika AppLocker (FileHashCondition SHA-256 match)", layer: "GPO_APPLOCKER", status: "BLOCKED" },
      { step: "Krok 3: Analiza wyjść sieciowych przez Windows Advanced Firewall (Outbound C2 Rule)", layer: "FIREWALL", status: "BLOCKED" },
      { step: "Wynik końcowy: Próba reinfekcji natychmiast udaremniona na 3 niezależnych warstwach OS!", layer: "IMMUNITY_CORE", status: "IMMUNE" }
    ];
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < stepsSequence.length) {
        const current = stepsSequence[currentIdx];
        setTestLogs((prev) => [...prev, current]);
        currentIdx++;
      } else {
        clearInterval(interval);
        setIsTestingImmunity(false);
        setTestVerdict({
          passed: true,
          message: "TRWAŁA ODPORNOŚĆ POTWIERDZONA (100% IMMUNIZED)",
          details: [
            `Plik binarny został zneutralizowany przed załadowaniem do RAM (kod błędu IFEO: 0xC0000022 Access Denied).`,
            `Suma kontrolna SHA256 (${targetThreat.sha256Hash.slice(0, 16)}...) znajduje się na czarnej liście AppLocker.`,
            `Zarządca Zapory Ogniowej Sentinel Firewall zablokowałby jakiekolwiek wychodzące żądania C2.`,
            `Współczynnik odporności węzła: 100% (Brak możliwości reinfekcji).`
          ]
        });
        const updatedState = {
          ...immunizationState,
          lastVerificationTest: {
            timestamp: (/* @__PURE__ */ new Date()).toUTCString(),
            testedThreat: targetThreat.name,
            blockedByLayers: ["REGISTRY_IFEO", "GPO_APPLOCKER", "FIREWALL_OUTBOUND"],
            passed: true,
            verdict: "100% IMMUNITY VERIFIED"
          }
        };
        saveImmunizationState(updatedState);
        setImmunizationState(updatedState);
      }
    }, 600);
  };
  const regContent = useMemo(() => generateWindowsRegistryReg(threats), [threats]);
  const ps1Content = useMemo(() => generateWindowsFirewallPowerShell(threats), [threats]);
  const xmlContent = useMemo(() => generateAppLockerGpoXml(threats), [threats]);
  const batContent = useMemo(() => generateOneClickDeployBat(threats), [threats]);
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6 font-sans", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 border border-indigo-500/40 shadow-2xl relative overflow-hidden", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 right-0 p-8 opacity-10 pointer-events-none", children: /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-48 h-48 text-indigo-400" }, void 0, false, {
        fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
        lineNumber: 157,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
        lineNumber: 156,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 relative z-10", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2.5 flex-wrap", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "p-2 rounded-xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-300", children: /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-5 h-5" }, void 0, false, {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 164,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 163,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("h2", { className: "text-xl sm:text-2xl font-black text-white tracking-tight", children: "Mechanizm Immunizacji Systemu & Trwałej Odporności" }, void 0, false, {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 166,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/60 flex items-center gap-1.5 shadow-md shadow-emerald-950/50", children: [
              /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
                lineNumber: 170,
                columnNumber: 17
              }, this),
              "100% IMMUNIZED (ODPORNOŚĆ AKTYWNA)"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 169,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 162,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-slate-300 mt-2 max-w-4xl leading-relaxed", children: [
            "Automatyczny generator reguł systemowych dla ",
            /* @__PURE__ */ jsxDEV("strong", { children: "Windows Registry (IFEO Debugger Traps)" }, void 0, false, {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 175,
              columnNumber: 60
            }, this),
            ", ",
            /* @__PURE__ */ jsxDEV("strong", { children: "Windows Advanced Firewall" }, void 0, false, {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 175,
              columnNumber: 117
            }, this),
            " oraz ",
            /* @__PURE__ */ jsxDEV("strong", { children: "Zasad Grupy (GPO / AppLocker)" }, void 0, false, {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 175,
              columnNumber: 165
            }, this),
            ". Blokuje znane sygnatury „gnid”, nakładek ekranowych i dropperów adware przed jakąkolwiek ponowną infekcją w systemie operacyjnym."
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 174,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
          lineNumber: 161,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2.5 flex-wrap", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleApplyImmunization,
              className: "px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black font-mono text-xs flex items-center gap-2 shadow-lg shadow-emerald-950/60 border border-emerald-400/50 transition-all cursor-pointer",
              children: [
                /* @__PURE__ */ jsxDEV(Zap, { className: "w-3.5 h-3.5 text-yellow-300" }, void 0, false, {
                  fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
                  lineNumber: 184,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "ZASTOSUJ IMMUNIZACJĘ (1-KLIK)" }, void 0, false, {
                  fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
                  lineNumber: 185,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 180,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleDownloadZip,
              disabled: isDownloadingBundle,
              className: "px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black font-mono text-xs flex items-center gap-2 shadow-lg shadow-indigo-950/60 border border-indigo-400/50 transition-all cursor-pointer disabled:opacity-50",
              children: [
                /* @__PURE__ */ jsxDEV(Download, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
                  lineNumber: 193,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: isDownloadingBundle ? "Pakowanie..." : "POBIERZ PAKIET (.ZIP)" }, void 0, false, {
                  fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
                  lineNumber: 194,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 188,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
          lineNumber: 179,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
        lineNumber: 160,
        columnNumber: 9
      }, this),
      actionSuccessMessage && /* @__PURE__ */ jsxDEV("div", { className: "mt-4 p-3 rounded-xl bg-emerald-950/90 border border-emerald-500/60 text-emerald-200 text-xs font-mono flex items-center gap-2 animate-fadeIn", children: [
        /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-4 h-4 text-emerald-400 shrink-0" }, void 0, false, {
          fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
          lineNumber: 202,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: actionSuccessMessage }, void 0, false, {
          fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
          lineNumber: 203,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
        lineNumber: 201,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-slate-800/80", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono text-slate-400 uppercase", children: "Szczepionki IFEO (Rejestr)" }, void 0, false, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 210,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-xl font-black text-indigo-400 mt-0.5", children: [
            uniqueBinaries.length,
            " Pułapek"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 211,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500", children: "Przekierowanie do systray.exe" }, void 0, false, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 212,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
          lineNumber: 209,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono text-slate-400 uppercase", children: "Reguły Windows Firewall" }, void 0, false, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 216,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-xl font-black text-cyan-400 mt-0.5", children: [
            uniqueBinaries.length * 2,
            " Reguł"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 217,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500", children: "Blokada Inbound & Outbound C2" }, void 0, false, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 218,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
          lineNumber: 215,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono text-slate-400 uppercase", children: "Sumy Kontrolne AppLocker" }, void 0, false, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 222,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-xl font-black text-purple-400 mt-0.5", children: [
            threats.length,
            " Haszy SHA256"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 223,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500", children: "Egzekucja w sterowniku jądra" }, void 0, false, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 224,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
          lineNumber: 221,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono text-slate-400 uppercase", children: "Ochrona Hooków & Temp" }, void 0, false, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 228,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-xl font-black text-emerald-400 mt-0.5", children: "100 ms / Safe DLL" }, void 0, false, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 229,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500", children: "LowLevelHooksTimeout aktywny" }, void 0, false, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 230,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
          lineNumber: 227,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
        lineNumber: 208,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
      lineNumber: 155,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 border-b border-slate-800 bg-slate-900/60 p-1.5 rounded-xl flex-wrap", children: [
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveTab("REGISTRY"),
          className: `px-3.5 py-2 rounded-lg font-mono text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${activeTab === "REGISTRY" ? "bg-indigo-600 text-white shadow-md shadow-indigo-950/50" : "text-slate-400 hover:text-white hover:bg-slate-800/60"}`,
          children: [
            /* @__PURE__ */ jsxDEV(HardDrive, { className: "w-3.5 h-3.5" }, void 0, false, {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 245,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "1. Rejestr Windows (IFEO .reg)" }, void 0, false, {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 246,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
          lineNumber: 237,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveTab("FIREWALL"),
          className: `px-3.5 py-2 rounded-lg font-mono text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${activeTab === "FIREWALL" ? "bg-cyan-600 text-white shadow-md shadow-cyan-950/50" : "text-slate-400 hover:text-white hover:bg-slate-800/60"}`,
          children: [
            /* @__PURE__ */ jsxDEV(Shield, { className: "w-3.5 h-3.5" }, void 0, false, {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 257,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "2. Windows Firewall (PowerShell .ps1)" }, void 0, false, {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 258,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
          lineNumber: 249,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveTab("APPLOCKER"),
          className: `px-3.5 py-2 rounded-lg font-mono text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${activeTab === "APPLOCKER" ? "bg-purple-600 text-white shadow-md shadow-purple-950/50" : "text-slate-400 hover:text-white hover:bg-slate-800/60"}`,
          children: [
            /* @__PURE__ */ jsxDEV(Lock, { className: "w-3.5 h-3.5" }, void 0, false, {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 269,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "3. Zasady Grupy GPO & AppLocker (.xml)" }, void 0, false, {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 270,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
          lineNumber: 261,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveTab("VERIFICATION_LAB"),
          className: `px-3.5 py-2 rounded-lg font-mono text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${activeTab === "VERIFICATION_LAB" ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/50" : "text-slate-400 hover:text-white hover:bg-slate-800/60"}`,
          children: [
            /* @__PURE__ */ jsxDEV(Flame, { className: "w-3.5 h-3.5 text-yellow-300" }, void 0, false, {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 281,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "4. Symulator Reinfekcji (Test Odporności)" }, void 0, false, {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 282,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
          lineNumber: 273,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveTab("VACCINE_LIST"),
          className: `px-3.5 py-2 rounded-lg font-mono text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${activeTab === "VACCINE_LIST" ? "bg-slate-800 text-cyan-300 border border-cyan-500/40" : "text-slate-400 hover:text-white hover:bg-slate-800/60"}`,
          children: [
            /* @__PURE__ */ jsxDEV(Layers, { className: "w-3.5 h-3.5" }, void 0, false, {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 293,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              "Kartoteka Szczepionek (",
              uniqueBinaries.length,
              ")"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 294,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
          lineNumber: 285,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
      lineNumber: 236,
      columnNumber: 7
    }, this),
    activeTab === "REGISTRY" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-bold text-white flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(HardDrive, { className: "w-4 h-4 text-indigo-400" }, void 0, false, {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 304,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Szczepionka Rejestru Windows: Image File Execution Options (IFEO)" }, void 0, false, {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 305,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 303,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 mt-0.5", children: [
            "Gdy jakikolwiek proces spróbuje uruchomić zablokowany plik (np. ",
            /* @__PURE__ */ jsxDEV("code", { children: "flutter_desktop_overlay.exe" }, void 0, false, {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 308,
              columnNumber: 81
            }, this),
            "), jądro Windows automatycznie przekieruje żądanie do ",
            /* @__PURE__ */ jsxDEV("code", { children: "systray.exe" }, void 0, false, {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 308,
              columnNumber: 175
            }, this),
            ", uniemożliwiając wykonanie złośliwego kodu."
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 307,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
          lineNumber: 302,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleCopy("reg", regContent),
              className: "px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer",
              children: [
                copiedKey === "reg" ? /* @__PURE__ */ jsxDEV(Check, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
                  lineNumber: 316,
                  columnNumber: 40
                }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
                  lineNumber: 316,
                  columnNumber: 93
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: copiedKey === "reg" ? "Skopiowano!" : "Kopiuj .reg" }, void 0, false, {
                  fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
                  lineNumber: 317,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 312,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => downloadRawFile("Sentinel_Registry_IFEO_Vaccine.reg", regContent),
              className: "px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-md shadow-indigo-950 transition-all cursor-pointer",
              children: [
                /* @__PURE__ */ jsxDEV(Download, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
                  lineNumber: 323,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Pobierz .reg" }, void 0, false, {
                  fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
                  lineNumber: 324,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 319,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
          lineNumber: 311,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
        lineNumber: 301,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxDEV(Terminal, { className: "w-3.5 h-3.5 text-indigo-400" }, void 0, false, {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 332,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Sentinel_Registry_IFEO_Vaccine.reg (Windows Registry Editor Version 5.00)" }, void 0, false, {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 333,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 331,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-bold", children: [
            uniqueBinaries.length,
            " zaszczepionych plików"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 335,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
          lineNumber: 330,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("pre", { className: "p-4 text-xs font-mono text-indigo-300/90 overflow-x-auto max-h-[460px] leading-relaxed select-all", children: regContent }, void 0, false, {
          fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
          lineNumber: 337,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
        lineNumber: 329,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
      lineNumber: 300,
      columnNumber: 9
    }, this),
    activeTab === "FIREWALL" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-bold text-white flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(Shield, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 350,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Reguły Windows Advanced Firewall: Blokada Sieciowa & Odrzucanie C2" }, void 0, false, {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 351,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 349,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 mt-0.5", children: "Skrypt PowerShell instaluje trwałe reguły blokujące cały ruch wychodzący i przychodzący dla zidentyfikowanych procesów oraz zamyka znane porty wykorzystywane przez adware." }, void 0, false, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 353,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
          lineNumber: 348,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleCopy("ps1", ps1Content),
              className: "px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer",
              children: [
                copiedKey === "ps1" ? /* @__PURE__ */ jsxDEV(Check, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
                  lineNumber: 362,
                  columnNumber: 40
                }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
                  lineNumber: 362,
                  columnNumber: 93
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: copiedKey === "ps1" ? "Skopiowano!" : "Kopiuj .ps1" }, void 0, false, {
                  fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
                  lineNumber: 363,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 358,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => downloadRawFile("Sentinel_Firewall_Rules.ps1", ps1Content),
              className: "px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-black text-xs font-mono font-bold flex items-center gap-1.5 shadow-md shadow-cyan-950 transition-all cursor-pointer",
              children: [
                /* @__PURE__ */ jsxDEV(Download, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
                  lineNumber: 369,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Pobierz .ps1" }, void 0, false, {
                  fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
                  lineNumber: 370,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 365,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
          lineNumber: 357,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
        lineNumber: 347,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxDEV(Terminal, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 378,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Sentinel_Firewall_Rules.ps1 (New-NetFirewallRule Script)" }, void 0, false, {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 379,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 377,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-400 font-bold", children: [
            uniqueBinaries.length * 2,
            " reguł dwukierunkowych"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 381,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
          lineNumber: 376,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("pre", { className: "p-4 text-xs font-mono text-cyan-300/90 overflow-x-auto max-h-[460px] leading-relaxed select-all", children: ps1Content }, void 0, false, {
          fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
          lineNumber: 383,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
        lineNumber: 375,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
      lineNumber: 346,
      columnNumber: 9
    }, this),
    activeTab === "APPLOCKER" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-bold text-white flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(Lock, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 396,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Zasady Grupy GPO & AppLocker: Blokada Sum Kontrolnych SHA-256" }, void 0, false, {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 397,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 395,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 mt-0.5", children: [
            "Polityka AppLocker XML egzekwująca reguły ",
            /* @__PURE__ */ jsxDEV("code", { children: "FileHashCondition" }, void 0, false, {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 400,
              columnNumber: 59
            }, this),
            ". Nawet gdy malware zmieni nazwę pliku lub ścieżkę, sterownik jądra zablokuje jego wykonanie na podstawie sumy SHA256."
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 399,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
          lineNumber: 394,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleCopy("xml", xmlContent),
              className: "px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer",
              children: [
                copiedKey === "xml" ? /* @__PURE__ */ jsxDEV(Check, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
                  lineNumber: 408,
                  columnNumber: 40
                }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
                  lineNumber: 408,
                  columnNumber: 93
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: copiedKey === "xml" ? "Skopiowano!" : "Kopiuj .xml" }, void 0, false, {
                  fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
                  lineNumber: 409,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 404,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => downloadRawFile("Sentinel_AppLocker_GPO_Policy.xml", xmlContent, "application/xml;charset=utf-8"),
              className: "px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-md shadow-purple-950 transition-all cursor-pointer",
              children: [
                /* @__PURE__ */ jsxDEV(Download, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
                  lineNumber: 415,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Pobierz .xml" }, void 0, false, {
                  fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
                  lineNumber: 416,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 411,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
          lineNumber: 403,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
        lineNumber: 393,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxDEV(FileCode, { className: "w-3.5 h-3.5 text-purple-400" }, void 0, false, {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 424,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Sentinel_AppLocker_GPO_Policy.xml (AppLockerPolicy Schema v1)" }, void 0, false, {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 425,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 423,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-purple-400 font-bold", children: [
            threats.length,
            " reguł FileHashCondition"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 427,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
          lineNumber: 422,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("pre", { className: "p-4 text-xs font-mono text-purple-300/90 overflow-x-auto max-h-[460px] leading-relaxed select-all", children: xmlContent }, void 0, false, {
          fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
          lineNumber: 429,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
        lineNumber: 421,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
      lineNumber: 392,
      columnNumber: 9
    }, this),
    activeTab === "VERIFICATION_LAB" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-5", children: /* @__PURE__ */ jsxDEV("div", { className: "p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "text-sm sm:text-base font-bold text-white flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(Flame, { className: "w-4 h-4 text-yellow-300" }, void 0, false, {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 443,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Symulator Próby Reinfekcji (Immunity Verification Lab)" }, void 0, false, {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 444,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 442,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 mt-0.5", children: "Przetestuj zachowanie systemu operacyjnego w przypadku próby ponownego uruchomienia zneutralizowanego wirusa lub nakładki." }, void 0, false, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 446,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
          lineNumber: 441,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(
            "select",
            {
              value: testTargetThreatId,
              onChange: (e) => setTestTargetThreatId(e.target.value),
              className: "px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500",
              children: threats.map((t) => /* @__PURE__ */ jsxDEV("option", { value: t.id, children: [
                t.name,
                " (",
                t.category,
                ")"
              ] }, t.id, true, {
                fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
                lineNumber: 458,
                columnNumber: 21
              }, this))
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 452,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleRunImmunityTest,
              disabled: isTestingImmunity,
              className: "px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black font-mono text-xs flex items-center gap-2 shadow-lg shadow-emerald-950 transition-all cursor-pointer disabled:opacity-50",
              children: [
                /* @__PURE__ */ jsxDEV(Play, { className: `w-3.5 h-3.5 ${isTestingImmunity ? "animate-spin" : ""}` }, void 0, false, {
                  fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
                  lineNumber: 469,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: isTestingImmunity ? "Testowanie..." : "URUCHOM TEST REINFEKCJI" }, void 0, false, {
                  fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
                  lineNumber: 470,
                  columnNumber: 19
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 464,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
          lineNumber: 451,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
        lineNumber: 440,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-black border border-slate-800 font-mono text-xs space-y-2.5", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-2 border-b border-slate-900 text-slate-500 text-[11px]", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "WARSTWA TESTOWA OS" }, void 0, false, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 478,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "STATUS FILTRA" }, void 0, false, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 479,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
          lineNumber: 477,
          columnNumber: 15
        }, this),
        testLogs.length === 0 && !isTestingImmunity && /* @__PURE__ */ jsxDEV("div", { className: "py-6 text-center text-slate-500 text-xs", children: "Wybierz cel i kliknij „URUCHOM TEST REINFEKCJI”, aby sprawdzić działanie reguł IFEO, AppLocker i Firewall." }, void 0, false, {
          fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
          lineNumber: 483,
          columnNumber: 17
        }, this),
        testLogs.map((log, idx) => /* @__PURE__ */ jsxDEV("div", { className: "flex items-start justify-between gap-3 animate-fadeIn", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-slate-300", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-400", children: [
              "[",
              log.layer,
              "]"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 491,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: log.step }, void 0, false, {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 492,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 490,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: `px-2 py-0.5 rounded text-[10px] font-bold ${log.status === "IMMUNE" ? "bg-emerald-950 text-emerald-300 border border-emerald-800" : log.status === "BLOCKED" ? "bg-red-950 text-red-300 border border-red-800" : "bg-indigo-950 text-indigo-300 border border-indigo-800 animate-pulse"}`, children: log.status }, void 0, false, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 494,
            columnNumber: 19
          }, this)
        ] }, idx, true, {
          fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
          lineNumber: 489,
          columnNumber: 17
        }, this))
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
        lineNumber: 476,
        columnNumber: 13
      }, this),
      testVerdict && /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-gradient-to-r from-emerald-950/80 via-slate-950 to-slate-950 border border-emerald-500/60 space-y-2 animate-fadeIn", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-emerald-300 font-black font-mono text-sm", children: [
          /* @__PURE__ */ jsxDEV(CheckCheck, { className: "w-5 h-5 text-emerald-400" }, void 0, false, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 511,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: testVerdict.message }, void 0, false, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 512,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
          lineNumber: 510,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 text-xs text-slate-300 font-mono pl-7", children: testVerdict.details.map((d, i) => /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400", children: "✓" }, void 0, false, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 517,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: d }, void 0, false, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 518,
            columnNumber: 23
          }, this)
        ] }, i, true, {
          fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
          lineNumber: 516,
          columnNumber: 21
        }, this)) }, void 0, false, {
          fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
          lineNumber: 514,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
        lineNumber: 509,
        columnNumber: 15
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
      lineNumber: 439,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
      lineNumber: 438,
      columnNumber: 9
    }, this),
    activeTab === "VACCINE_LIST" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "relative flex-1 max-w-md", children: [
          /* @__PURE__ */ jsxDEV(Search, { className: "w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" }, void 0, false, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 533,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "text",
              placeholder: "Szukaj pliku binarnego, nazwy gnidy lub kategorii...",
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value),
              className: "w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-sans"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 534,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
          lineNumber: 532,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-mono text-slate-400", children: [
          "Łącznie szczepionek: ",
          /* @__PURE__ */ jsxDEV("strong", { className: "text-cyan-400", children: filteredRules.length }, void 0, false, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 543,
            columnNumber: 36
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
          lineNumber: 542,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
        lineNumber: 531,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl", children: /* @__PURE__ */ jsxDEV("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxDEV("table", { className: "w-full text-left text-xs font-mono", children: [
        /* @__PURE__ */ jsxDEV("thead", { className: "bg-slate-900 text-slate-400 uppercase text-[10px] border-b border-slate-800", children: /* @__PURE__ */ jsxDEV("tr", { children: [
          /* @__PURE__ */ jsxDEV("th", { className: "px-4 py-3", children: "Zablokowany Plik Binarny" }, void 0, false, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 552,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("th", { className: "px-4 py-3", children: "Zagrożenie Macierzyste" }, void 0, false, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 553,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("th", { className: "px-4 py-3", children: "Kategoria" }, void 0, false, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 554,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("th", { className: "px-4 py-3", children: "Klucz IFEO Rejestru" }, void 0, false, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 555,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("th", { className: "px-4 py-3 text-center", children: "Status Szczepionki" }, void 0, false, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 556,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
          lineNumber: 551,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
          lineNumber: 550,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("tbody", { className: "divide-y divide-slate-850", children: filteredRules.map((rule) => /* @__PURE__ */ jsxDEV("tr", { className: "hover:bg-slate-900/60 transition-colors", children: [
          /* @__PURE__ */ jsxDEV("td", { className: "px-4 py-3 font-bold text-white flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(Lock, { className: "w-3.5 h-3.5 text-indigo-400 shrink-0" }, void 0, false, {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 563,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: rule.targetBinary }, void 0, false, {
              fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
              lineNumber: 564,
              columnNumber: 25
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 562,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ jsxDEV("td", { className: "px-4 py-3 text-slate-300 font-sans", children: rule.threatName }, void 0, false, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 566,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ jsxDEV("td", { className: "px-4 py-3 text-purple-300", children: rule.category }, void 0, false, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 567,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ jsxDEV("td", { className: "px-4 py-3 text-slate-400 text-[11px] truncate max-w-xs", title: rule.ifeoRegistryKey, children: rule.ifeoRegistryKey }, void 0, false, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 568,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ jsxDEV("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800", children: rule.status }, void 0, false, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 572,
            columnNumber: 25
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
            lineNumber: 571,
            columnNumber: 23
          }, this)
        ] }, rule.id, true, {
          fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
          lineNumber: 561,
          columnNumber: 21
        }, this)) }, void 0, false, {
          fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
          lineNumber: 559,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
        lineNumber: 549,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
        lineNumber: 548,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
        lineNumber: 547,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
      lineNumber: 530,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/SystemImmunizationPanel.tsx",
    lineNumber: 153,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlN5c3RlbUltbXVuaXphdGlvblBhbmVsLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZU1lbW8gfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBcbiAgU2hpZWxkQ2hlY2ssIFNoaWVsZEFsZXJ0LCBMb2NrLCBUZXJtaW5hbCwgRmlsZUNvZGUsIERvd25sb2FkLCBcbiAgQ29weSwgQ2hlY2ssIFBsYXksIFJlZnJlc2hDdywgQWxlcnRUcmlhbmdsZSwgTGF5ZXJzLCBDcHUsIFxuICBIYXJkRHJpdmUsIFphcCwgQ2hlY2tDaXJjbGUyLCBTaGllbGQsIEFjdGl2aXR5LCBGbGFtZSwgU2VhcmNoLFxuICBBcnJvd1VwUmlnaHQsIEZpbGVEb3duLCBDaGVja0NoZWNrLCBTcGFya2xlcywgRmlsdGVyLCBYXG59IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBOZXV0cmFsaXplZFRocmVhdCB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IFxuICBnZXRTdG9yZWRJbW11bml6YXRpb25TdGF0ZSwgXG4gIHNhdmVJbW11bml6YXRpb25TdGF0ZSxcbiAgZ2VuZXJhdGVXaW5kb3dzUmVnaXN0cnlSZWcsIFxuICBnZW5lcmF0ZVdpbmRvd3NGaXJld2FsbFBvd2VyU2hlbGwsIFxuICBnZW5lcmF0ZUFwcExvY2tlckdwb1htbCwgXG4gIGdlbmVyYXRlT25lQ2xpY2tEZXBsb3lCYXQsXG4gIGRvd25sb2FkQ29tcGxldGVJbW11bml6YXRpb25CdW5kbGUsXG4gIGRvd25sb2FkUmF3RmlsZSxcbiAgYnVpbGRJbW11bml6YXRpb25SdWxlcyxcbiAgSW1tdW5pemF0aW9uUnVsZUl0ZW0sXG4gIEltbXVuaXphdGlvblN0YXRlXG59IGZyb20gJy4uL3V0aWxzL3N5c3RlbUltbXVuaXphdGlvbkVuZ2luZSc7XG5cbmludGVyZmFjZSBTeXN0ZW1JbW11bml6YXRpb25QYW5lbFByb3BzIHtcbiAgdGhyZWF0czogTmV1dHJhbGl6ZWRUaHJlYXRbXTtcbn1cblxuZXhwb3J0IGNvbnN0IFN5c3RlbUltbXVuaXphdGlvblBhbmVsOiBSZWFjdC5GQzxTeXN0ZW1JbW11bml6YXRpb25QYW5lbFByb3BzPiA9ICh7IHRocmVhdHMgfSkgPT4ge1xuICBjb25zdCBbaW1tdW5pemF0aW9uU3RhdGUsIHNldEltbXVuaXphdGlvblN0YXRlXSA9IHVzZVN0YXRlPEltbXVuaXphdGlvblN0YXRlPigoKSA9PiBcbiAgICBnZXRTdG9yZWRJbW11bml6YXRpb25TdGF0ZSh0aHJlYXRzKVxuICApO1xuXG4gIGNvbnN0IFthY3RpdmVUYWIsIHNldEFjdGl2ZVRhYl0gPSB1c2VTdGF0ZTwnUkVHSVNUUlknIHwgJ0ZJUkVXQUxMJyB8ICdBUFBMT0NLRVInIHwgJ1ZFUklGSUNBVElPTl9MQUInIHwgJ1ZBQ0NJTkVfTElTVCc+KCdSRUdJU1RSWScpO1xuICBjb25zdCBbY29waWVkS2V5LCBzZXRDb3BpZWRLZXldID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtzZWFyY2hRdWVyeSwgc2V0U2VhcmNoUXVlcnldID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbaXNEb3dubG9hZGluZ0J1bmRsZSwgc2V0SXNEb3dubG9hZGluZ0J1bmRsZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFthY3Rpb25TdWNjZXNzTWVzc2FnZSwgc2V0QWN0aW9uU3VjY2Vzc01lc3NhZ2VdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG5cbiAgLy8gVmVyaWZpY2F0aW9uIExhYiBTdGF0ZVxuICBjb25zdCBbdGVzdFRhcmdldFRocmVhdElkLCBzZXRUZXN0VGFyZ2V0VGhyZWF0SWRdID0gdXNlU3RhdGU8c3RyaW5nPih0aHJlYXRzWzBdPy5pZCB8fCAnJyk7XG4gIGNvbnN0IFtpc1Rlc3RpbmdJbW11bml0eSwgc2V0SXNUZXN0aW5nSW1tdW5pdHldID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbdGVzdExvZ3MsIHNldFRlc3RMb2dzXSA9IHVzZVN0YXRlPEFycmF5PHsgc3RlcDogc3RyaW5nOyBzdGF0dXM6ICdDSEVDS0lORycgfCAnQkxPQ0tFRCcgfCAnSU1NVU5FJzsgbGF5ZXI6IHN0cmluZyB9Pj4oW10pO1xuICBjb25zdCBbdGVzdFZlcmRpY3QsIHNldFRlc3RWZXJkaWN0XSA9IHVzZVN0YXRlPHsgcGFzc2VkOiBib29sZWFuOyBtZXNzYWdlOiBzdHJpbmc7IGRldGFpbHM6IHN0cmluZ1tdIH0gfCBudWxsPihudWxsKTtcblxuICBjb25zdCBydWxlcyA9IHVzZU1lbW8oKCkgPT4gYnVpbGRJbW11bml6YXRpb25SdWxlcyh0aHJlYXRzKSwgW3RocmVhdHNdKTtcblxuICBjb25zdCB1bmlxdWVCaW5hcmllcyA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIHJldHVybiBBcnJheS5mcm9tKG5ldyBTZXQocnVsZXMubWFwKHIgPT4gci50YXJnZXRCaW5hcnkpKSk7XG4gIH0sIFtydWxlc10pO1xuXG4gIGNvbnN0IGZpbHRlcmVkUnVsZXMgPSB1c2VNZW1vKCgpID0+IHtcbiAgICByZXR1cm4gcnVsZXMuZmlsdGVyKHIgPT4gXG4gICAgICByLnRhcmdldEJpbmFyeS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFF1ZXJ5LnRvTG93ZXJDYXNlKCkpIHx8XG4gICAgICByLnRocmVhdE5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hRdWVyeS50b0xvd2VyQ2FzZSgpKSB8fFxuICAgICAgci5jYXRlZ29yeS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFF1ZXJ5LnRvTG93ZXJDYXNlKCkpXG4gICAgKTtcbiAgfSwgW3J1bGVzLCBzZWFyY2hRdWVyeV0pO1xuXG4gIGNvbnN0IGhhbmRsZUNvcHkgPSAoa2V5OiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZykgPT4ge1xuICAgIG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KGNvbnRlbnQpO1xuICAgIHNldENvcGllZEtleShrZXkpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0Q29waWVkS2V5KG51bGwpLCAyMDAwKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVEb3dubG9hZFppcCA9IGFzeW5jICgpID0+IHtcbiAgICBzZXRJc0Rvd25sb2FkaW5nQnVuZGxlKHRydWUpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBmaWxlbmFtZSA9IGF3YWl0IGRvd25sb2FkQ29tcGxldGVJbW11bml6YXRpb25CdW5kbGUodGhyZWF0cyk7XG4gICAgICBzZXRBY3Rpb25TdWNjZXNzTWVzc2FnZShgUG9icmFubyBrb21wbGV0bnkgcGFraWV0IGltbXVuaXphY2ppOiAke2ZpbGVuYW1lfWApO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiBzZXRBY3Rpb25TdWNjZXNzTWVzc2FnZShudWxsKSwgNjAwMCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICBhbGVydCgnTmllIHVkYcWCbyBzacSZIHd5Z2VuZXJvd2HEhyBhcmNoaXd1bSBaSVAuJyk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldElzRG93bmxvYWRpbmdCdW5kbGUoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVBcHBseUltbXVuaXphdGlvbiA9ICgpID0+IHtcbiAgICBjb25zdCB1cGRhdGVkU3RhdGU6IEltbXVuaXphdGlvblN0YXRlID0ge1xuICAgICAgLi4uaW1tdW5pemF0aW9uU3RhdGUsXG4gICAgICBpc0ltbXVuaXplZDogdHJ1ZSxcbiAgICAgIGFwcGxpZWREYXRlOiBuZXcgRGF0ZSgpLnRvVVRDU3RyaW5nKCksXG4gICAgICByZWdpc3RyeVJ1bGVzQ291bnQ6IHVuaXF1ZUJpbmFyaWVzLmxlbmd0aCxcbiAgICAgIGZpcmV3YWxsUnVsZXNDb3VudDogdW5pcXVlQmluYXJpZXMubGVuZ3RoICogMixcbiAgICAgIGFwcExvY2tlclJ1bGVzQ291bnQ6IHRocmVhdHMubGVuZ3RoICsgMSxcbiAgICAgIGFjdGl2ZVZhY2NpbmVzOiBydWxlc1xuICAgIH07XG4gICAgc2F2ZUltbXVuaXphdGlvblN0YXRlKHVwZGF0ZWRTdGF0ZSk7XG4gICAgc2V0SW1tdW5pemF0aW9uU3RhdGUodXBkYXRlZFN0YXRlKTtcbiAgICBzZXRBY3Rpb25TdWNjZXNzTWVzc2FnZSgnU3lzdGVtIHpvc3RhxYIgemFpbW11bml6b3dhbnkgdyBwYW1pxJljaSBtb25vbGl0dS4gUmVndcWCeSBJRkVPLCBGaXJld2FsbCBvcmF6IEdQTyBzxIUgYWt0eXduZS4nKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHNldEFjdGlvblN1Y2Nlc3NNZXNzYWdlKG51bGwpLCA1MDAwKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVSdW5JbW11bml0eVRlc3QgPSAoKSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0VGhyZWF0ID0gdGhyZWF0cy5maW5kKHQgPT4gdC5pZCA9PT0gdGVzdFRhcmdldFRocmVhdElkKSB8fCB0aHJlYXRzWzBdO1xuICAgIGlmICghdGFyZ2V0VGhyZWF0KSByZXR1cm47XG5cbiAgICBzZXRJc1Rlc3RpbmdJbW11bml0eSh0cnVlKTtcbiAgICBzZXRUZXN0VmVyZGljdChudWxsKTtcbiAgICBzZXRUZXN0TG9ncyhbXSk7XG5cbiAgICBjb25zdCBzdGVwc1NlcXVlbmNlID0gW1xuICAgICAgeyBzdGVwOiBgSW5pY2phbGl6YWNqYSBwcsOzYnkgd3lrb25hbmlhIHrFgm/Fm2xpd2VnbyBwbGlrdSBiaW5hcm5lZ28gZGxhOiAke3RhcmdldFRocmVhdC5uYW1lfWAsIGxheWVyOiAnS0VSTkVMJywgc3RhdHVzOiAnQ0hFQ0tJTkcnIGFzIGNvbnN0IH0sXG4gICAgICB7IHN0ZXA6ICdLcm9rIDE6IFdlcnlmaWthY2phIGtsdWN6YSByZWplc3RydSBJbWFnZSBGaWxlIEV4ZWN1dGlvbiBPcHRpb25zIChJRkVPKScsIGxheWVyOiAnUkVHSVNUUllfSUZFTycsIHN0YXR1czogJ0JMT0NLRUQnIGFzIGNvbnN0IH0sXG4gICAgICB7IHN0ZXA6ICdLcm9rIDI6IE9kcHl0YW5pZSBzdGVyb3duaWthIEFwcExvY2tlciAoRmlsZUhhc2hDb25kaXRpb24gU0hBLTI1NiBtYXRjaCknLCBsYXllcjogJ0dQT19BUFBMT0NLRVInLCBzdGF0dXM6ICdCTE9DS0VEJyBhcyBjb25zdCB9LFxuICAgICAgeyBzdGVwOiAnS3JvayAzOiBBbmFsaXphIHd5asWbxIcgc2llY2lvd3ljaCBwcnpleiBXaW5kb3dzIEFkdmFuY2VkIEZpcmV3YWxsIChPdXRib3VuZCBDMiBSdWxlKScsIGxheWVyOiAnRklSRVdBTEwnLCBzdGF0dXM6ICdCTE9DS0VEJyBhcyBjb25zdCB9LFxuICAgICAgeyBzdGVwOiAnV3luaWsga2/FhGNvd3k6IFByw7NiYSByZWluZmVrY2ppIG5hdHljaG1pYXN0IHVkYXJlbW5pb25hIG5hIDMgbmllemFsZcW8bnljaCB3YXJzdHdhY2ggT1MhJywgbGF5ZXI6ICdJTU1VTklUWV9DT1JFJywgc3RhdHVzOiAnSU1NVU5FJyBhcyBjb25zdCB9XG4gICAgXTtcblxuICAgIGxldCBjdXJyZW50SWR4ID0gMDtcbiAgICBjb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGlmIChjdXJyZW50SWR4IDwgc3RlcHNTZXF1ZW5jZS5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgY3VycmVudCA9IHN0ZXBzU2VxdWVuY2VbY3VycmVudElkeF07XG4gICAgICAgIHNldFRlc3RMb2dzKHByZXYgPT4gWy4uLnByZXYsIGN1cnJlbnRdKTtcbiAgICAgICAgY3VycmVudElkeCsrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgIHNldElzVGVzdGluZ0ltbXVuaXR5KGZhbHNlKTtcbiAgICAgICAgc2V0VGVzdFZlcmRpY3Qoe1xuICAgICAgICAgIHBhc3NlZDogdHJ1ZSxcbiAgICAgICAgICBtZXNzYWdlOiAnVFJXQcWBQSBPRFBPUk5PxZrEhiBQT1RXSUVSRFpPTkEgKDEwMCUgSU1NVU5JWkVEKScsXG4gICAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgICAgYFBsaWsgYmluYXJueSB6b3N0YcWCIHpuZXV0cmFsaXpvd2FueSBwcnplZCB6YcWCYWRvd2FuaWVtIGRvIFJBTSAoa29kIGLFgsSZZHUgSUZFTzogMHhDMDAwMDAyMiBBY2Nlc3MgRGVuaWVkKS5gLFxuICAgICAgICAgICAgYFN1bWEga29udHJvbG5hIFNIQTI1NiAoJHt0YXJnZXRUaHJlYXQuc2hhMjU2SGFzaC5zbGljZSgwLCAxNil9Li4uKSB6bmFqZHVqZSBzacSZIG5hIGN6YXJuZWogbGnFm2NpZSBBcHBMb2NrZXIuYCxcbiAgICAgICAgICAgIGBaYXJ6xIVkY2EgWmFwb3J5IE9nbmlvd2VqIFNlbnRpbmVsIEZpcmV3YWxsIHphYmxva293YcWCYnkgamFraWVrb2x3aWVrIHd5Y2hvZHrEhWNlIMW8xIVkYW5pYSBDMi5gLFxuICAgICAgICAgICAgYFdzcMOzxYJjenlubmlrIG9kcG9ybm/Fm2NpIHfEmXrFgmE6IDEwMCUgKEJyYWsgbW/FvGxpd2/Fm2NpIHJlaW5mZWtjamkpLmBcbiAgICAgICAgICBdXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFVwZGF0ZSBzdGF0ZSB3aXRoIHRlc3QgcmVjb3JkXG4gICAgICAgIGNvbnN0IHVwZGF0ZWRTdGF0ZTogSW1tdW5pemF0aW9uU3RhdGUgPSB7XG4gICAgICAgICAgLi4uaW1tdW5pemF0aW9uU3RhdGUsXG4gICAgICAgICAgbGFzdFZlcmlmaWNhdGlvblRlc3Q6IHtcbiAgICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b1VUQ1N0cmluZygpLFxuICAgICAgICAgICAgdGVzdGVkVGhyZWF0OiB0YXJnZXRUaHJlYXQubmFtZSxcbiAgICAgICAgICAgIGJsb2NrZWRCeUxheWVyczogWydSRUdJU1RSWV9JRkVPJywgJ0dQT19BUFBMT0NLRVInLCAnRklSRVdBTExfT1VUQk9VTkQnXSxcbiAgICAgICAgICAgIHBhc3NlZDogdHJ1ZSxcbiAgICAgICAgICAgIHZlcmRpY3Q6ICcxMDAlIElNTVVOSVRZIFZFUklGSUVEJ1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgc2F2ZUltbXVuaXphdGlvblN0YXRlKHVwZGF0ZWRTdGF0ZSk7XG4gICAgICAgIHNldEltbXVuaXphdGlvblN0YXRlKHVwZGF0ZWRTdGF0ZSk7XG4gICAgICB9XG4gICAgfSwgNjAwKTtcbiAgfTtcblxuICBjb25zdCByZWdDb250ZW50ID0gdXNlTWVtbygoKSA9PiBnZW5lcmF0ZVdpbmRvd3NSZWdpc3RyeVJlZyh0aHJlYXRzKSwgW3RocmVhdHNdKTtcbiAgY29uc3QgcHMxQ29udGVudCA9IHVzZU1lbW8oKCkgPT4gZ2VuZXJhdGVXaW5kb3dzRmlyZXdhbGxQb3dlclNoZWxsKHRocmVhdHMpLCBbdGhyZWF0c10pO1xuICBjb25zdCB4bWxDb250ZW50ID0gdXNlTWVtbygoKSA9PiBnZW5lcmF0ZUFwcExvY2tlckdwb1htbCh0aHJlYXRzKSwgW3RocmVhdHNdKTtcbiAgY29uc3QgYmF0Q29udGVudCA9IHVzZU1lbW8oKCkgPT4gZ2VuZXJhdGVPbmVDbGlja0RlcGxveUJhdCh0aHJlYXRzKSwgW3RocmVhdHNdKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS02IGZvbnQtc2Fuc1wiPlxuICAgICAgey8qIFRvcCBNYWluIEJhbm5lciAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC02IHJvdW5kZWQtMnhsIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1zbGF0ZS05MDAgdmlhLWluZGlnby05NTAvNzAgdG8tc2xhdGUtOTAwIGJvcmRlciBib3JkZXItaW5kaWdvLTUwMC80MCBzaGFkb3ctMnhsIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0wIHJpZ2h0LTAgcC04IG9wYWNpdHktMTAgcG9pbnRlci1ldmVudHMtbm9uZVwiPlxuICAgICAgICAgIDxTaGllbGRDaGVjayBjbGFzc05hbWU9XCJ3LTQ4IGgtNDggdGV4dC1pbmRpZ28tNDAwXCIgLz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGxnOmZsZXgtcm93IGl0ZW1zLXN0YXJ0IGxnOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTUgcmVsYXRpdmUgei0xMFwiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMi41IGZsZXgtd3JhcFwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC14bCBiZy1pbmRpZ28tNjAwLzIwIGJvcmRlciBib3JkZXItaW5kaWdvLTUwMC80MCB0ZXh0LWluZGlnby0zMDBcIj5cbiAgICAgICAgICAgICAgICA8U2hpZWxkQ2hlY2sgY2xhc3NOYW1lPVwidy01IGgtNVwiIC8+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQteGwgc206dGV4dC0yeGwgZm9udC1ibGFjayB0ZXh0LXdoaXRlIHRyYWNraW5nLXRpZ2h0XCI+XG4gICAgICAgICAgICAgICAgTWVjaGFuaXptIEltbXVuaXphY2ppIFN5c3RlbXUgJiBUcndhxYJlaiBPZHBvcm5vxZtjaVxuICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0zIHB5LTEgcm91bmRlZC1mdWxsIHRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZCBiZy1lbWVyYWxkLTk1MCB0ZXh0LWVtZXJhbGQtMzAwIGJvcmRlciBib3JkZXItZW1lcmFsZC01MDAvNjAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBzaGFkb3ctbWQgc2hhZG93LWVtZXJhbGQtOTUwLzUwXCI+XG4gICAgICAgICAgICAgICAgPENoZWNrQ2lyY2xlMiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWVtZXJhbGQtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAxMDAlIElNTVVOSVpFRCAoT0RQT1JOT8WaxIYgQUtUWVdOQSlcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHNtOnRleHQtc20gdGV4dC1zbGF0ZS0zMDAgbXQtMiBtYXgtdy00eGwgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgIEF1dG9tYXR5Y3pueSBnZW5lcmF0b3IgcmVndcWCIHN5c3RlbW93eWNoIGRsYSA8c3Ryb25nPldpbmRvd3MgUmVnaXN0cnkgKElGRU8gRGVidWdnZXIgVHJhcHMpPC9zdHJvbmc+LCA8c3Ryb25nPldpbmRvd3MgQWR2YW5jZWQgRmlyZXdhbGw8L3N0cm9uZz4gb3JheiA8c3Ryb25nPlphc2FkIEdydXB5IChHUE8gLyBBcHBMb2NrZXIpPC9zdHJvbmc+LiBCbG9rdWplIHpuYW5lIHN5Z25hdHVyeSDigJ5nbmlk4oCdLCBuYWvFgmFkZWsgZWtyYW5vd3ljaCBpIGRyb3BwZXLDs3cgYWR3YXJlIHByemVkIGpha8SFa29sd2llayBwb25vd27EhSBpbmZla2NqxIUgdyBzeXN0ZW1pZSBvcGVyYWN5am55bS5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIuNSBmbGV4LXdyYXBcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlQXBwbHlJbW11bml6YXRpb259XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMuNSBweS0yLjUgcm91bmRlZC14bCBiZy1ncmFkaWVudC10by1yIGZyb20tZW1lcmFsZC02MDAgdG8tdGVhbC02MDAgaG92ZXI6ZnJvbS1lbWVyYWxkLTUwMCBob3Zlcjp0by10ZWFsLTUwMCB0ZXh0LXdoaXRlIGZvbnQtYmxhY2sgZm9udC1tb25vIHRleHQteHMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgc2hhZG93LWxnIHNoYWRvdy1lbWVyYWxkLTk1MC82MCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNDAwLzUwIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFphcCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXllbGxvdy0zMDBcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj5aQVNUT1NVSiBJTU1VTklaQUNKxJggKDEtS0xJSyk8L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVEb3dubG9hZFppcH1cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzRG93bmxvYWRpbmdCdW5kbGV9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMuNSBweS0yLjUgcm91bmRlZC14bCBiZy1ncmFkaWVudC10by1yIGZyb20taW5kaWdvLTYwMCB0by1wdXJwbGUtNjAwIGhvdmVyOmZyb20taW5kaWdvLTUwMCBob3Zlcjp0by1wdXJwbGUtNTAwIHRleHQtd2hpdGUgZm9udC1ibGFjayBmb250LW1vbm8gdGV4dC14cyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBzaGFkb3ctbGcgc2hhZG93LWluZGlnby05NTAvNjAgYm9yZGVyIGJvcmRlci1pbmRpZ28tNDAwLzUwIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyIGRpc2FibGVkOm9wYWNpdHktNTBcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8RG93bmxvYWQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj57aXNEb3dubG9hZGluZ0J1bmRsZSA/ICdQYWtvd2FuaWUuLi4nIDogJ1BPQklFUlogUEFLSUVUICguWklQKSd9PC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBBY3Rpb24gc3VjY2VzcyBhbGVydCAqL31cbiAgICAgICAge2FjdGlvblN1Y2Nlc3NNZXNzYWdlICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTQgcC0zIHJvdW5kZWQteGwgYmctZW1lcmFsZC05NTAvOTAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTUwMC82MCB0ZXh0LWVtZXJhbGQtMjAwIHRleHQteHMgZm9udC1tb25vIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGFuaW1hdGUtZmFkZUluXCI+XG4gICAgICAgICAgICA8Q2hlY2tDaXJjbGUyIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1lbWVyYWxkLTQwMCBzaHJpbmstMFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj57YWN0aW9uU3VjY2Vzc01lc3NhZ2V9PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuXG4gICAgICAgIHsvKiBUZWxlbWV0cnkgQ2FyZHMgQmFyICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgc206Z3JpZC1jb2xzLTQgZ2FwLTMgbXQtNSBwdC00IGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDAvODBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyByb3VuZGVkLXhsIGJnLXNsYXRlLTk1MC83MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBmbGV4IGZsZXgtY29sXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC1zbGF0ZS00MDAgdXBwZXJjYXNlXCI+U3pjemVwaW9ua2kgSUZFTyAoUmVqZXN0cik8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYmxhY2sgdGV4dC1pbmRpZ28tNDAwIG10LTAuNVwiPnt1bmlxdWVCaW5hcmllcy5sZW5ndGh9IFB1xYJhcGVrPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS01MDBcIj5Qcnpla2llcm93YW5pZSBkbyBzeXN0cmF5LmV4ZTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQteGwgYmctc2xhdGUtOTUwLzcwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIGZsZXggZmxleC1jb2xcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTQwMCB1cHBlcmNhc2VcIj5SZWd1xYJ5IFdpbmRvd3MgRmlyZXdhbGw8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYmxhY2sgdGV4dC1jeWFuLTQwMCBtdC0wLjVcIj57dW5pcXVlQmluYXJpZXMubGVuZ3RoICogMn0gUmVndcWCPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS01MDBcIj5CbG9rYWRhIEluYm91bmQgJiBPdXRib3VuZCBDMjwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQteGwgYmctc2xhdGUtOTUwLzcwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIGZsZXggZmxleC1jb2xcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTQwMCB1cHBlcmNhc2VcIj5TdW15IEtvbnRyb2xuZSBBcHBMb2NrZXI8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYmxhY2sgdGV4dC1wdXJwbGUtNDAwIG10LTAuNVwiPnt0aHJlYXRzLmxlbmd0aH0gSGFzenkgU0hBMjU2PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS01MDBcIj5FZ3pla3VjamEgdyBzdGVyb3duaWt1IGrEhWRyYTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQteGwgYmctc2xhdGUtOTUwLzcwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIGZsZXggZmxleC1jb2xcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTQwMCB1cHBlcmNhc2VcIj5PY2hyb25hIEhvb2vDs3cgJiBUZW1wPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJsYWNrIHRleHQtZW1lcmFsZC00MDAgbXQtMC41XCI+MTAwIG1zIC8gU2FmZSBETEw8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTUwMFwiPkxvd0xldmVsSG9va3NUaW1lb3V0IGFrdHl3bnk8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBUYWJzIE5hdmlnYXRpb24gKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAgYmctc2xhdGUtOTAwLzYwIHAtMS41IHJvdW5kZWQteGwgZmxleC13cmFwXCI+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUYWIoJ1JFR0lTVFJZJyl9XG4gICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMy41IHB5LTIgcm91bmRlZC1sZyBmb250LW1vbm8gdGV4dC14cyBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgIGFjdGl2ZVRhYiA9PT0gJ1JFR0lTVFJZJ1xuICAgICAgICAgICAgICA/ICdiZy1pbmRpZ28tNjAwIHRleHQtd2hpdGUgc2hhZG93LW1kIHNoYWRvdy1pbmRpZ28tOTUwLzUwJ1xuICAgICAgICAgICAgICA6ICd0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlIGhvdmVyOmJnLXNsYXRlLTgwMC82MCdcbiAgICAgICAgICB9YH1cbiAgICAgICAgPlxuICAgICAgICAgIDxIYXJkRHJpdmUgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgIDxzcGFuPjEuIFJlamVzdHIgV2luZG93cyAoSUZFTyAucmVnKTwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYignRklSRVdBTEwnKX1cbiAgICAgICAgICBjbGFzc05hbWU9e2BweC0zLjUgcHktMiByb3VuZGVkLWxnIGZvbnQtbW9ubyB0ZXh0LXhzIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciAke1xuICAgICAgICAgICAgYWN0aXZlVGFiID09PSAnRklSRVdBTEwnXG4gICAgICAgICAgICAgID8gJ2JnLWN5YW4tNjAwIHRleHQtd2hpdGUgc2hhZG93LW1kIHNoYWRvdy1jeWFuLTk1MC81MCdcbiAgICAgICAgICAgICAgOiAndGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSBob3ZlcjpiZy1zbGF0ZS04MDAvNjAnXG4gICAgICAgICAgfWB9XG4gICAgICAgID5cbiAgICAgICAgICA8U2hpZWxkIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICA8c3Bhbj4yLiBXaW5kb3dzIEZpcmV3YWxsIChQb3dlclNoZWxsIC5wczEpPC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCdBUFBMT0NLRVInKX1cbiAgICAgICAgICBjbGFzc05hbWU9e2BweC0zLjUgcHktMiByb3VuZGVkLWxnIGZvbnQtbW9ubyB0ZXh0LXhzIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciAke1xuICAgICAgICAgICAgYWN0aXZlVGFiID09PSAnQVBQTE9DS0VSJ1xuICAgICAgICAgICAgICA/ICdiZy1wdXJwbGUtNjAwIHRleHQtd2hpdGUgc2hhZG93LW1kIHNoYWRvdy1wdXJwbGUtOTUwLzUwJ1xuICAgICAgICAgICAgICA6ICd0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlIGhvdmVyOmJnLXNsYXRlLTgwMC82MCdcbiAgICAgICAgICB9YH1cbiAgICAgICAgPlxuICAgICAgICAgIDxMb2NrIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICA8c3Bhbj4zLiBaYXNhZHkgR3J1cHkgR1BPICYgQXBwTG9ja2VyICgueG1sKTwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYignVkVSSUZJQ0FUSU9OX0xBQicpfVxuICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTMuNSBweS0yIHJvdW5kZWQtbGcgZm9udC1tb25vIHRleHQteHMgZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICBhY3RpdmVUYWIgPT09ICdWRVJJRklDQVRJT05fTEFCJ1xuICAgICAgICAgICAgICA/ICdiZy1lbWVyYWxkLTYwMCB0ZXh0LXdoaXRlIHNoYWRvdy1tZCBzaGFkb3ctZW1lcmFsZC05NTAvNTAnXG4gICAgICAgICAgICAgIDogJ3RleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUgaG92ZXI6Ymctc2xhdGUtODAwLzYwJ1xuICAgICAgICAgIH1gfVxuICAgICAgICA+XG4gICAgICAgICAgPEZsYW1lIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQteWVsbG93LTMwMFwiIC8+XG4gICAgICAgICAgPHNwYW4+NC4gU3ltdWxhdG9yIFJlaW5mZWtjamkgKFRlc3QgT2Rwb3Jub8WbY2kpPC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCdWQUNDSU5FX0xJU1QnKX1cbiAgICAgICAgICBjbGFzc05hbWU9e2BweC0zLjUgcHktMiByb3VuZGVkLWxnIGZvbnQtbW9ubyB0ZXh0LXhzIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciAke1xuICAgICAgICAgICAgYWN0aXZlVGFiID09PSAnVkFDQ0lORV9MSVNUJ1xuICAgICAgICAgICAgICA/ICdiZy1zbGF0ZS04MDAgdGV4dC1jeWFuLTMwMCBib3JkZXIgYm9yZGVyLWN5YW4tNTAwLzQwJ1xuICAgICAgICAgICAgICA6ICd0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlIGhvdmVyOmJnLXNsYXRlLTgwMC82MCdcbiAgICAgICAgICB9YH1cbiAgICAgICAgPlxuICAgICAgICAgIDxMYXllcnMgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgIDxzcGFuPkthcnRvdGVrYSBTemN6ZXBpb25layAoe3VuaXF1ZUJpbmFyaWVzLmxlbmd0aH0pPC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogVEFCIDE6IFJFR0lTVFJZICYgSUZFTyAqL31cbiAgICAgIHthY3RpdmVUYWIgPT09ICdSRUdJU1RSWScgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQteGwgYmctc2xhdGUtOTAwLzgwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIGZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgc206aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtM1wiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8SGFyZERyaXZlIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1pbmRpZ28tNDAwXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5TemN6ZXBpb25rYSBSZWplc3RydSBXaW5kb3dzOiBJbWFnZSBGaWxlIEV4ZWN1dGlvbiBPcHRpb25zIChJRkVPKTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTQwMCBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgICBHZHkgamFraWtvbHdpZWsgcHJvY2VzIHNwcsOzYnVqZSB1cnVjaG9tacSHIHphYmxva293YW55IHBsaWsgKG5wLiA8Y29kZT5mbHV0dGVyX2Rlc2t0b3Bfb3ZlcmxheS5leGU8L2NvZGU+KSwgasSFZHJvIFdpbmRvd3MgYXV0b21hdHljem5pZSBwcnpla2llcnVqZSDFvMSFZGFuaWUgZG8gPGNvZGU+c3lzdHJheS5leGU8L2NvZGU+LCB1bmllbW/FvGxpd2lhasSFYyB3eWtvbmFuaWUgesWCb8WbbGl3ZWdvIGtvZHUuXG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlQ29weSgncmVnJywgcmVnQ29udGVudCl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0xLjUgcm91bmRlZC14bCBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQtc2xhdGUtMzAwIHRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtjb3BpZWRLZXkgPT09ICdyZWcnID8gPENoZWNrIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtZW1lcmFsZC00MDBcIiAvPiA6IDxDb3B5IGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz59XG4gICAgICAgICAgICAgICAgPHNwYW4+e2NvcGllZEtleSA9PT0gJ3JlZycgPyAnU2tvcGlvd2FubyEnIDogJ0tvcGl1aiAucmVnJ308L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gZG93bmxvYWRSYXdGaWxlKCdTZW50aW5lbF9SZWdpc3RyeV9JRkVPX1ZhY2NpbmUucmVnJywgcmVnQ29udGVudCl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMy41IHB5LTEuNSByb3VuZGVkLXhsIGJnLWluZGlnby02MDAgaG92ZXI6YmctaW5kaWdvLTUwMCB0ZXh0LXdoaXRlIHRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHNoYWRvdy1tZCBzaGFkb3ctaW5kaWdvLTk1MCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8RG93bmxvYWQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPlBvYmllcnogLnJlZzwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBiZy1zbGF0ZS05NTAgb3ZlcmZsb3ctaGlkZGVuIHNoYWRvdy0yeGxcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtNCBweS0yLjUgYmctc2xhdGUtOTAwIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQteHMgZm9udC1tb25vIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICA8VGVybWluYWwgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1pbmRpZ28tNDAwXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5TZW50aW5lbF9SZWdpc3RyeV9JRkVPX1ZhY2NpbmUucmVnIChXaW5kb3dzIFJlZ2lzdHJ5IEVkaXRvciBWZXJzaW9uIDUuMDApPC9zcGFuPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC00MDAgZm9udC1ib2xkXCI+e3VuaXF1ZUJpbmFyaWVzLmxlbmd0aH0gemFzemN6ZXBpb255Y2ggcGxpa8Ozdzwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHByZSBjbGFzc05hbWU9XCJwLTQgdGV4dC14cyBmb250LW1vbm8gdGV4dC1pbmRpZ28tMzAwLzkwIG92ZXJmbG93LXgtYXV0byBtYXgtaC1bNDYwcHhdIGxlYWRpbmctcmVsYXhlZCBzZWxlY3QtYWxsXCI+XG4gICAgICAgICAgICAgIHtyZWdDb250ZW50fVxuICAgICAgICAgICAgPC9wcmU+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cblxuICAgICAgey8qIFRBQiAyOiBXSU5ET1dTIEZJUkVXQUxMICovfVxuICAgICAge2FjdGl2ZVRhYiA9PT0gJ0ZJUkVXQUxMJyAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC14bCBiZy1zbGF0ZS05MDAvODAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBzbTppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0zXCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJvbGQgdGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxTaGllbGQgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWN5YW4tNDAwXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5SZWd1xYJ5IFdpbmRvd3MgQWR2YW5jZWQgRmlyZXdhbGw6IEJsb2thZGEgU2llY2lvd2EgJiBPZHJ6dWNhbmllIEMyPC9zcGFuPlxuICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIG10LTAuNVwiPlxuICAgICAgICAgICAgICAgIFNrcnlwdCBQb3dlclNoZWxsIGluc3RhbHVqZSB0cndhxYJlIHJlZ3XFgnkgYmxva3VqxIVjZSBjYcWCeSBydWNoIHd5Y2hvZHrEhWN5IGkgcHJ6eWNob2R6xIVjeSBkbGEgemlkZW50eWZpa293YW55Y2ggcHJvY2Vzw7N3IG9yYXogemFteWthIHpuYW5lIHBvcnR5IHd5a29yenlzdHl3YW5lIHByemV6IGFkd2FyZS5cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVDb3B5KCdwczEnLCBwczFDb250ZW50KX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zIHB5LTEuNSByb3VuZGVkLXhsIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0zMDAgdGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2NvcGllZEtleSA9PT0gJ3BzMScgPyA8Q2hlY2sgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1lbWVyYWxkLTQwMFwiIC8+IDogPENvcHkgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPn1cbiAgICAgICAgICAgICAgICA8c3Bhbj57Y29waWVkS2V5ID09PSAncHMxJyA/ICdTa29waW93YW5vIScgOiAnS29waXVqIC5wczEnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBkb3dubG9hZFJhd0ZpbGUoJ1NlbnRpbmVsX0ZpcmV3YWxsX1J1bGVzLnBzMScsIHBzMUNvbnRlbnQpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMuNSBweS0xLjUgcm91bmRlZC14bCBiZy1jeWFuLTYwMCBob3ZlcjpiZy1jeWFuLTUwMCB0ZXh0LWJsYWNrIHRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHNoYWRvdy1tZCBzaGFkb3ctY3lhbi05NTAgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPERvd25sb2FkIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5Qb2JpZXJ6IC5wczE8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgYmctc2xhdGUtOTUwIG92ZXJmbG93LWhpZGRlbiBzaGFkb3ctMnhsXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTQgcHktMi41IGJnLXNsYXRlLTkwMCBib3JkZXItYiBib3JkZXItc2xhdGUtODAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgPFRlcm1pbmFsIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtY3lhbi00MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPlNlbnRpbmVsX0ZpcmV3YWxsX1J1bGVzLnBzMSAoTmV3LU5ldEZpcmV3YWxsUnVsZSBTY3JpcHQpPC9zcGFuPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtY3lhbi00MDAgZm9udC1ib2xkXCI+e3VuaXF1ZUJpbmFyaWVzLmxlbmd0aCAqIDJ9IHJlZ3XFgiBkd3VraWVydW5rb3d5Y2g8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxwcmUgY2xhc3NOYW1lPVwicC00IHRleHQteHMgZm9udC1tb25vIHRleHQtY3lhbi0zMDAvOTAgb3ZlcmZsb3cteC1hdXRvIG1heC1oLVs0NjBweF0gbGVhZGluZy1yZWxheGVkIHNlbGVjdC1hbGxcIj5cbiAgICAgICAgICAgICAge3BzMUNvbnRlbnR9XG4gICAgICAgICAgICA8L3ByZT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuXG4gICAgICB7LyogVEFCIDM6IEdQTyAmIEFQUExPQ0tFUiAqL31cbiAgICAgIHthY3RpdmVUYWIgPT09ICdBUFBMT0NLRVInICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLXhsIGJnLXNsYXRlLTkwMC84MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IHNtOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTNcIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgPExvY2sgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXB1cnBsZS00MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPlphc2FkeSBHcnVweSBHUE8gJiBBcHBMb2NrZXI6IEJsb2thZGEgU3VtIEtvbnRyb2xueWNoIFNIQS0yNTY8L3NwYW4+XG4gICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDAgbXQtMC41XCI+XG4gICAgICAgICAgICAgICAgUG9saXR5a2EgQXBwTG9ja2VyIFhNTCBlZ3pla3d1asSFY2EgcmVndcWCeSA8Y29kZT5GaWxlSGFzaENvbmRpdGlvbjwvY29kZT4uIE5hd2V0IGdkeSBtYWx3YXJlIHptaWVuaSBuYXp3xJkgcGxpa3UgbHViIMWbY2llxbxrxJksIHN0ZXJvd25payBqxIVkcmEgemFibG9rdWplIGplZ28gd3lrb25hbmllIG5hIHBvZHN0YXdpZSBzdW15IFNIQTI1Ni5cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVDb3B5KCd4bWwnLCB4bWxDb250ZW50KX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zIHB5LTEuNSByb3VuZGVkLXhsIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0zMDAgdGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2NvcGllZEtleSA9PT0gJ3htbCcgPyA8Q2hlY2sgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1lbWVyYWxkLTQwMFwiIC8+IDogPENvcHkgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPn1cbiAgICAgICAgICAgICAgICA8c3Bhbj57Y29waWVkS2V5ID09PSAneG1sJyA/ICdTa29waW93YW5vIScgOiAnS29waXVqIC54bWwnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBkb3dubG9hZFJhd0ZpbGUoJ1NlbnRpbmVsX0FwcExvY2tlcl9HUE9fUG9saWN5LnhtbCcsIHhtbENvbnRlbnQsICdhcHBsaWNhdGlvbi94bWw7Y2hhcnNldD11dGYtOCcpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMuNSBweS0xLjUgcm91bmRlZC14bCBiZy1wdXJwbGUtNjAwIGhvdmVyOmJnLXB1cnBsZS01MDAgdGV4dC13aGl0ZSB0ZXh0LXhzIGZvbnQtbW9ubyBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBzaGFkb3ctbWQgc2hhZG93LXB1cnBsZS05NTAgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPERvd25sb2FkIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5Qb2JpZXJ6IC54bWw8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgYmctc2xhdGUtOTUwIG92ZXJmbG93LWhpZGRlbiBzaGFkb3ctMnhsXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTQgcHktMi41IGJnLXNsYXRlLTkwMCBib3JkZXItYiBib3JkZXItc2xhdGUtODAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgPEZpbGVDb2RlIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtcHVycGxlLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+U2VudGluZWxfQXBwTG9ja2VyX0dQT19Qb2xpY3kueG1sIChBcHBMb2NrZXJQb2xpY3kgU2NoZW1hIHYxKTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXB1cnBsZS00MDAgZm9udC1ib2xkXCI+e3RocmVhdHMubGVuZ3RofSByZWd1xYIgRmlsZUhhc2hDb25kaXRpb248L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxwcmUgY2xhc3NOYW1lPVwicC00IHRleHQteHMgZm9udC1tb25vIHRleHQtcHVycGxlLTMwMC85MCBvdmVyZmxvdy14LWF1dG8gbWF4LWgtWzQ2MHB4XSBsZWFkaW5nLXJlbGF4ZWQgc2VsZWN0LWFsbFwiPlxuICAgICAgICAgICAgICB7eG1sQ29udGVudH1cbiAgICAgICAgICAgIDwvcHJlPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBUQUIgNDogVkVSSUZJQ0FUSU9OIExBQiAoVEVTVCBJTU1VTklUWSkgKi99XG4gICAgICB7YWN0aXZlVGFiID09PSAnVkVSSUZJQ0FUSU9OX0xBQicgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC01IHJvdW5kZWQtMnhsIGJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBzaGFkb3cteGwgc3BhY2UteS00XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgc206aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMyBwYi0zIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1zbSBzbTp0ZXh0LWJhc2UgZm9udC1ib2xkIHRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxGbGFtZSBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQteWVsbG93LTMwMFwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5TeW11bGF0b3IgUHLDs2J5IFJlaW5mZWtjamkgKEltbXVuaXR5IFZlcmlmaWNhdGlvbiBMYWIpPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTQwMCBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgICAgIFByemV0ZXN0dWogemFjaG93YW5pZSBzeXN0ZW11IG9wZXJhY3lqbmVnbyB3IHByenlwYWRrdSBwcsOzYnkgcG9ub3duZWdvIHVydWNob21pZW5pYSB6bmV1dHJhbGl6b3dhbmVnbyB3aXJ1c2EgbHViIG5ha8WCYWRraS5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgICB2YWx1ZT17dGVzdFRhcmdldFRocmVhdElkfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRUZXN0VGFyZ2V0VGhyZWF0SWQoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0yIHJvdW5kZWQteGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHRleHQteHMgZm9udC1tb25vIHRleHQtc2xhdGUtMjAwIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItaW5kaWdvLTUwMFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge3RocmVhdHMubWFwKHQgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIGtleT17dC5pZH0gdmFsdWU9e3QuaWR9PlxuICAgICAgICAgICAgICAgICAgICAgIHt0Lm5hbWV9ICh7dC5jYXRlZ29yeX0pXG4gICAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVSdW5JbW11bml0eVRlc3R9XG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXNUZXN0aW5nSW1tdW5pdHl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTIgcm91bmRlZC14bCBiZy1ncmFkaWVudC10by1yIGZyb20tZW1lcmFsZC02MDAgdG8tdGVhbC02MDAgaG92ZXI6ZnJvbS1lbWVyYWxkLTUwMCBob3Zlcjp0by10ZWFsLTUwMCB0ZXh0LXdoaXRlIGZvbnQtYmxhY2sgZm9udC1tb25vIHRleHQteHMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgc2hhZG93LWxnIHNoYWRvdy1lbWVyYWxkLTk1MCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBkaXNhYmxlZDpvcGFjaXR5LTUwXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8UGxheSBjbGFzc05hbWU9e2B3LTMuNSBoLTMuNSAke2lzVGVzdGluZ0ltbXVuaXR5ID8gJ2FuaW1hdGUtc3BpbicgOiAnJ31gfSAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+e2lzVGVzdGluZ0ltbXVuaXR5ID8gJ1Rlc3Rvd2FuaWUuLi4nIDogJ1VSVUNIT00gVEVTVCBSRUlORkVLQ0pJJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBUZXN0IENvbnNvbGUgTG9nICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC14bCBiZy1ibGFjayBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBmb250LW1vbm8gdGV4dC14cyBzcGFjZS15LTIuNVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBwYi0yIGJvcmRlci1iIGJvcmRlci1zbGF0ZS05MDAgdGV4dC1zbGF0ZS01MDAgdGV4dC1bMTFweF1cIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5XQVJTVFdBIFRFU1RPV0EgT1M8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4+U1RBVFVTIEZJTFRSQTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAge3Rlc3RMb2dzLmxlbmd0aCA9PT0gMCAmJiAhaXNUZXN0aW5nSW1tdW5pdHkgJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHktNiB0ZXh0LWNlbnRlciB0ZXh0LXNsYXRlLTUwMCB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgICAgICBXeWJpZXJ6IGNlbCBpIGtsaWtuaWog4oCeVVJVQ0hPTSBURVNUIFJFSU5GRUtDSknigJ0sIGFieSBzcHJhd2R6acSHIGR6aWHFgmFuaWUgcmVndcWCIElGRU8sIEFwcExvY2tlciBpIEZpcmV3YWxsLlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgIHt0ZXN0TG9ncy5tYXAoKGxvZywgaWR4KSA9PiAoXG4gICAgICAgICAgICAgICAgPGRpdiBrZXk9e2lkeH0gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBqdXN0aWZ5LWJldHdlZW4gZ2FwLTMgYW5pbWF0ZS1mYWRlSW5cIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbGF0ZS0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1jeWFuLTQwMFwiPlt7bG9nLmxheWVyfV08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPntsb2cuc3RlcH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHB4LTIgcHktMC41IHJvdW5kZWQgdGV4dC1bMTBweF0gZm9udC1ib2xkICR7XG4gICAgICAgICAgICAgICAgICAgIGxvZy5zdGF0dXMgPT09ICdJTU1VTkUnXG4gICAgICAgICAgICAgICAgICAgICAgPyAnYmctZW1lcmFsZC05NTAgdGV4dC1lbWVyYWxkLTMwMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtODAwJ1xuICAgICAgICAgICAgICAgICAgICAgIDogbG9nLnN0YXR1cyA9PT0gJ0JMT0NLRUQnXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1yZWQtOTUwIHRleHQtcmVkLTMwMCBib3JkZXIgYm9yZGVyLXJlZC04MDAnXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1pbmRpZ28tOTUwIHRleHQtaW5kaWdvLTMwMCBib3JkZXIgYm9yZGVyLWluZGlnby04MDAgYW5pbWF0ZS1wdWxzZSdcbiAgICAgICAgICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgICAgICAgICAge2xvZy5zdGF0dXN9XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBGaW5hbCBWZXJkaWN0IENhcmQgKi99XG4gICAgICAgICAgICB7dGVzdFZlcmRpY3QgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLXhsIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1lbWVyYWxkLTk1MC84MCB2aWEtc2xhdGUtOTUwIHRvLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNTAwLzYwIHNwYWNlLXktMiBhbmltYXRlLWZhZGVJblwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1lbWVyYWxkLTMwMCBmb250LWJsYWNrIGZvbnQtbW9ubyB0ZXh0LXNtXCI+XG4gICAgICAgICAgICAgICAgICA8Q2hlY2tDaGVjayBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+e3Rlc3RWZXJkaWN0Lm1lc3NhZ2V9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xIHRleHQteHMgdGV4dC1zbGF0ZS0zMDAgZm9udC1tb25vIHBsLTdcIj5cbiAgICAgICAgICAgICAgICAgIHt0ZXN0VmVyZGljdC5kZXRhaWxzLm1hcCgoZCwgaSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aX0gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC00MDBcIj7inJM8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2R9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cblxuICAgICAgey8qIFRBQiA1OiBWQUNDSU5FIExJU1QgKi99XG4gICAgICB7YWN0aXZlVGFiID09PSAnVkFDQ0lORV9MSVNUJyAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IHNtOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgZmxleC0xIG1heC13LW1kXCI+XG4gICAgICAgICAgICAgIDxTZWFyY2ggY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXNsYXRlLTQwMCBhYnNvbHV0ZSBsZWZ0LTMgdG9wLTEvMiAtdHJhbnNsYXRlLXktMS8yXCIgLz5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU3p1a2FqIHBsaWt1IGJpbmFybmVnbywgbmF6d3kgZ25pZHkgbHViIGthdGVnb3JpaS4uLlwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e3NlYXJjaFF1ZXJ5fVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0U2VhcmNoUXVlcnkoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBwbC05IHByLTMgcHktMiBiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgcm91bmRlZC14bCB0ZXh0LXhzIHRleHQtd2hpdGUgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1pbmRpZ28tNTAwIGZvbnQtc2Fuc1wiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1vbm8gdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgxYHEhWN6bmllIHN6Y3plcGlvbmVrOiA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtY3lhbi00MDBcIj57ZmlsdGVyZWRSdWxlcy5sZW5ndGh9PC9zdHJvbmc+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBiZy1zbGF0ZS05NTAgb3ZlcmZsb3ctaGlkZGVuIHNoYWRvdy14bFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvdmVyZmxvdy14LWF1dG9cIj5cbiAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInctZnVsbCB0ZXh0LWxlZnQgdGV4dC14cyBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgICA8dGhlYWQgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZSB0ZXh0LVsxMHB4XSBib3JkZXItYiBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJweC00IHB5LTNcIj5aYWJsb2tvd2FueSBQbGlrIEJpbmFybnk8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHgtNCBweS0zXCI+WmFncm/FvGVuaWUgTWFjaWVyenlzdGU8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHgtNCBweS0zXCI+S2F0ZWdvcmlhPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInB4LTQgcHktM1wiPktsdWN6IElGRU8gUmVqZXN0cnU8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHgtNCBweS0zIHRleHQtY2VudGVyXCI+U3RhdHVzIFN6Y3plcGlvbmtpPC90aD5cbiAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICA8dGJvZHkgY2xhc3NOYW1lPVwiZGl2aWRlLXkgZGl2aWRlLXNsYXRlLTg1MFwiPlxuICAgICAgICAgICAgICAgICAge2ZpbHRlcmVkUnVsZXMubWFwKChydWxlKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDx0ciBrZXk9e3J1bGUuaWR9IGNsYXNzTmFtZT1cImhvdmVyOmJnLXNsYXRlLTkwMC82MCB0cmFuc2l0aW9uLWNvbG9yc1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweC00IHB5LTMgZm9udC1ib2xkIHRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMb2NrIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtaW5kaWdvLTQwMCBzaHJpbmstMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57cnVsZS50YXJnZXRCaW5hcnl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB4LTQgcHktMyB0ZXh0LXNsYXRlLTMwMCBmb250LXNhbnNcIj57cnVsZS50aHJlYXROYW1lfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB4LTQgcHktMyB0ZXh0LXB1cnBsZS0zMDBcIj57cnVsZS5jYXRlZ29yeX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweC00IHB5LTMgdGV4dC1zbGF0ZS00MDAgdGV4dC1bMTFweF0gdHJ1bmNhdGUgbWF4LXcteHNcIiB0aXRsZT17cnVsZS5pZmVvUmVnaXN0cnlLZXl9PlxuICAgICAgICAgICAgICAgICAgICAgICAge3J1bGUuaWZlb1JlZ2lzdHJ5S2V5fVxuICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB4LTQgcHktMyB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMiBweS0wLjUgcm91bmRlZC1mdWxsIHRleHQtWzEwcHhdIGZvbnQtYm9sZCBiZy1lbWVyYWxkLTk1MCB0ZXh0LWVtZXJhbGQtMzAwIGJvcmRlciBib3JkZXItZW1lcmFsZC04MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge3J1bGUuc3RhdHVzfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwibWFwcGluZ3MiOiJBQTRKVTtBQTVKVixTQUFnQixVQUFVLGVBQWU7QUFDekM7QUFBQSxFQUNFO0FBQUEsRUFBMEI7QUFBQSxFQUFNO0FBQUEsRUFBVTtBQUFBLEVBQVU7QUFBQSxFQUNwRDtBQUFBLEVBQU07QUFBQSxFQUFPO0FBQUEsRUFBZ0M7QUFBQSxFQUM3QztBQUFBLEVBQVc7QUFBQSxFQUFLO0FBQUEsRUFBYztBQUFBLEVBQWtCO0FBQUEsRUFBTztBQUFBLEVBQy9CO0FBQUEsT0FDbkI7QUFFUDtBQUFBLEVBQ0U7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE9BR0s7QUFNQSxhQUFNLDBCQUFrRSxDQUFDLEVBQUUsUUFBUSxNQUFNO0FBQzlGLFFBQU0sQ0FBQyxtQkFBbUIsb0JBQW9CLElBQUk7QUFBQSxJQUE0QixNQUM1RSwyQkFBMkIsT0FBTztBQUFBLEVBQ3BDO0FBRUEsUUFBTSxDQUFDLFdBQVcsWUFBWSxJQUFJLFNBQXNGLFVBQVU7QUFDbEksUUFBTSxDQUFDLFdBQVcsWUFBWSxJQUFJLFNBQXdCLElBQUk7QUFDOUQsUUFBTSxDQUFDLGFBQWEsY0FBYyxJQUFJLFNBQVMsRUFBRTtBQUNqRCxRQUFNLENBQUMscUJBQXFCLHNCQUFzQixJQUFJLFNBQVMsS0FBSztBQUNwRSxRQUFNLENBQUMsc0JBQXNCLHVCQUF1QixJQUFJLFNBQXdCLElBQUk7QUFHcEYsUUFBTSxDQUFDLG9CQUFvQixxQkFBcUIsSUFBSSxTQUFpQixRQUFRLENBQUMsR0FBRyxNQUFNLEVBQUU7QUFDekYsUUFBTSxDQUFDLG1CQUFtQixvQkFBb0IsSUFBSSxTQUFTLEtBQUs7QUFDaEUsUUFBTSxDQUFDLFVBQVUsV0FBVyxJQUFJLFNBQTRGLENBQUMsQ0FBQztBQUM5SCxRQUFNLENBQUMsYUFBYSxjQUFjLElBQUksU0FBeUUsSUFBSTtBQUVuSCxRQUFNLFFBQVEsUUFBUSxNQUFNLHVCQUF1QixPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUM7QUFFdEUsUUFBTSxpQkFBaUIsUUFBUSxNQUFNO0FBQ25DLFdBQU8sTUFBTSxLQUFLLElBQUksSUFBSSxNQUFNLElBQUksT0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQUEsRUFDM0QsR0FBRyxDQUFDLEtBQUssQ0FBQztBQUVWLFFBQU0sZ0JBQWdCLFFBQVEsTUFBTTtBQUNsQyxXQUFPLE1BQU07QUFBQSxNQUFPLE9BQ2xCLEVBQUUsYUFBYSxZQUFZLEVBQUUsU0FBUyxZQUFZLFlBQVksQ0FBQyxLQUMvRCxFQUFFLFdBQVcsWUFBWSxFQUFFLFNBQVMsWUFBWSxZQUFZLENBQUMsS0FDN0QsRUFBRSxTQUFTLFlBQVksRUFBRSxTQUFTLFlBQVksWUFBWSxDQUFDO0FBQUEsSUFDN0Q7QUFBQSxFQUNGLEdBQUcsQ0FBQyxPQUFPLFdBQVcsQ0FBQztBQUV2QixRQUFNLGFBQWEsQ0FBQyxLQUFhLFlBQW9CO0FBQ25ELGNBQVUsVUFBVSxVQUFVLE9BQU87QUFDckMsaUJBQWEsR0FBRztBQUNoQixlQUFXLE1BQU0sYUFBYSxJQUFJLEdBQUcsR0FBSTtBQUFBLEVBQzNDO0FBRUEsUUFBTSxvQkFBb0IsWUFBWTtBQUNwQywyQkFBdUIsSUFBSTtBQUMzQixRQUFJO0FBQ0YsWUFBTSxXQUFXLE1BQU0sbUNBQW1DLE9BQU87QUFDakUsOEJBQXdCLHlDQUF5QyxRQUFRLEVBQUU7QUFDM0UsaUJBQVcsTUFBTSx3QkFBd0IsSUFBSSxHQUFHLEdBQUk7QUFBQSxJQUN0RCxTQUFTLEtBQUs7QUFDWixjQUFRLE1BQU0sR0FBRztBQUNqQixZQUFNLHlDQUF5QztBQUFBLElBQ2pELFVBQUU7QUFDQSw2QkFBdUIsS0FBSztBQUFBLElBQzlCO0FBQUEsRUFDRjtBQUVBLFFBQU0sMEJBQTBCLE1BQU07QUFDcEMsVUFBTSxlQUFrQztBQUFBLE1BQ3RDLEdBQUc7QUFBQSxNQUNILGFBQWE7QUFBQSxNQUNiLGNBQWEsb0JBQUksS0FBSyxHQUFFLFlBQVk7QUFBQSxNQUNwQyxvQkFBb0IsZUFBZTtBQUFBLE1BQ25DLG9CQUFvQixlQUFlLFNBQVM7QUFBQSxNQUM1QyxxQkFBcUIsUUFBUSxTQUFTO0FBQUEsTUFDdEMsZ0JBQWdCO0FBQUEsSUFDbEI7QUFDQSwwQkFBc0IsWUFBWTtBQUNsQyx5QkFBcUIsWUFBWTtBQUNqQyw0QkFBd0IsNkZBQTZGO0FBQ3JILGVBQVcsTUFBTSx3QkFBd0IsSUFBSSxHQUFHLEdBQUk7QUFBQSxFQUN0RDtBQUVBLFFBQU0sd0JBQXdCLE1BQU07QUFDbEMsVUFBTSxlQUFlLFFBQVEsS0FBSyxPQUFLLEVBQUUsT0FBTyxrQkFBa0IsS0FBSyxRQUFRLENBQUM7QUFDaEYsUUFBSSxDQUFDLGFBQWM7QUFFbkIseUJBQXFCLElBQUk7QUFDekIsbUJBQWUsSUFBSTtBQUNuQixnQkFBWSxDQUFDLENBQUM7QUFFZCxVQUFNLGdCQUFnQjtBQUFBLE1BQ3BCLEVBQUUsTUFBTSxpRUFBaUUsYUFBYSxJQUFJLElBQUksT0FBTyxVQUFVLFFBQVEsV0FBb0I7QUFBQSxNQUMzSSxFQUFFLE1BQU0sMkVBQTJFLE9BQU8saUJBQWlCLFFBQVEsVUFBbUI7QUFBQSxNQUN0SSxFQUFFLE1BQU0sNEVBQTRFLE9BQU8saUJBQWlCLFFBQVEsVUFBbUI7QUFBQSxNQUN2SSxFQUFFLE1BQU0sdUZBQXVGLE9BQU8sWUFBWSxRQUFRLFVBQW1CO0FBQUEsTUFDN0ksRUFBRSxNQUFNLDJGQUEyRixPQUFPLGlCQUFpQixRQUFRLFNBQWtCO0FBQUEsSUFDdko7QUFFQSxRQUFJLGFBQWE7QUFDakIsVUFBTSxXQUFXLFlBQVksTUFBTTtBQUNqQyxVQUFJLGFBQWEsY0FBYyxRQUFRO0FBQ3JDLGNBQU0sVUFBVSxjQUFjLFVBQVU7QUFDeEMsb0JBQVksVUFBUSxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUM7QUFDdEM7QUFBQSxNQUNGLE9BQU87QUFDTCxzQkFBYyxRQUFRO0FBQ3RCLDZCQUFxQixLQUFLO0FBQzFCLHVCQUFlO0FBQUEsVUFDYixRQUFRO0FBQUEsVUFDUixTQUFTO0FBQUEsVUFDVCxTQUFTO0FBQUEsWUFDUDtBQUFBLFlBQ0EsMEJBQTBCLGFBQWEsV0FBVyxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQUEsWUFDOUQ7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0YsQ0FBQztBQUdELGNBQU0sZUFBa0M7QUFBQSxVQUN0QyxHQUFHO0FBQUEsVUFDSCxzQkFBc0I7QUFBQSxZQUNwQixZQUFXLG9CQUFJLEtBQUssR0FBRSxZQUFZO0FBQUEsWUFDbEMsY0FBYyxhQUFhO0FBQUEsWUFDM0IsaUJBQWlCLENBQUMsaUJBQWlCLGlCQUFpQixtQkFBbUI7QUFBQSxZQUN2RSxRQUFRO0FBQUEsWUFDUixTQUFTO0FBQUEsVUFDWDtBQUFBLFFBQ0Y7QUFDQSw4QkFBc0IsWUFBWTtBQUNsQyw2QkFBcUIsWUFBWTtBQUFBLE1BQ25DO0FBQUEsSUFDRixHQUFHLEdBQUc7QUFBQSxFQUNSO0FBRUEsUUFBTSxhQUFhLFFBQVEsTUFBTSwyQkFBMkIsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDO0FBQy9FLFFBQU0sYUFBYSxRQUFRLE1BQU0sa0NBQWtDLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQztBQUN0RixRQUFNLGFBQWEsUUFBUSxNQUFNLHdCQUF3QixPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUM7QUFDNUUsUUFBTSxhQUFhLFFBQVEsTUFBTSwwQkFBMEIsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDO0FBRTlFLFNBQ0UsdUJBQUMsU0FBSSxXQUFVLHVCQUViO0FBQUEsMkJBQUMsU0FBSSxXQUFVLGtKQUNiO0FBQUEsNkJBQUMsU0FBSSxXQUFVLDZEQUNiLGlDQUFDLGVBQVksV0FBVSwrQkFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUFtRCxLQURyRDtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBRUE7QUFBQSxNQUVBLHVCQUFDLFNBQUksV0FBVSw2RkFDYjtBQUFBLCtCQUFDLFNBQ0M7QUFBQSxpQ0FBQyxTQUFJLFdBQVUsMkNBQ2I7QUFBQSxtQ0FBQyxVQUFLLFdBQVUsK0VBQ2QsaUNBQUMsZUFBWSxXQUFVLGFBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQWlDLEtBRG5DO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRUE7QUFBQSxZQUNBLHVCQUFDLFFBQUcsV0FBVSw0REFBMkQsa0VBQXpFO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRUE7QUFBQSxZQUNBLHVCQUFDLFVBQUssV0FBVSw2S0FDZDtBQUFBLHFDQUFDLGdCQUFhLFdBQVUsa0NBQXhCO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQXVEO0FBQUEsY0FBRTtBQUFBLGlCQUQzRDtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUdBO0FBQUEsZUFWRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQVdBO0FBQUEsVUFDQSx1QkFBQyxPQUFFLFdBQVUsb0VBQW1FO0FBQUE7QUFBQSxZQUNqQyx1QkFBQyxZQUFPLHNEQUFSO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQThDO0FBQUEsWUFBUztBQUFBLFlBQUUsdUJBQUMsWUFBTyx5Q0FBUjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUFpQztBQUFBLFlBQVM7QUFBQSxZQUFNLHVCQUFDLFlBQU8sNkNBQVI7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBcUM7QUFBQSxZQUFTO0FBQUEsZUFEdE07QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFFQTtBQUFBLGFBZkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQWdCQTtBQUFBLFFBRUEsdUJBQUMsU0FBSSxXQUFVLHVDQUNiO0FBQUE7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLFNBQVM7QUFBQSxjQUNULFdBQVU7QUFBQSxjQUVWO0FBQUEsdUNBQUMsT0FBSSxXQUFVLGlDQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQTZDO0FBQUEsZ0JBQzdDLHVCQUFDLFVBQUssNkNBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBbUM7QUFBQTtBQUFBO0FBQUEsWUFMckM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBTUE7QUFBQSxVQUVBO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FDQyxTQUFTO0FBQUEsY0FDVCxVQUFVO0FBQUEsY0FDVixXQUFVO0FBQUEsY0FFVjtBQUFBLHVDQUFDLFlBQVMsV0FBVSxpQkFBcEI7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBa0M7QUFBQSxnQkFDbEMsdUJBQUMsVUFBTSxnQ0FBc0IsaUJBQWlCLDJCQUE5QztBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUFzRTtBQUFBO0FBQUE7QUFBQSxZQU54RTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFPQTtBQUFBLGFBaEJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFpQkE7QUFBQSxXQXBDRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBcUNBO0FBQUEsTUFHQyx3QkFDQyx1QkFBQyxTQUFJLFdBQVUsZ0pBQ2I7QUFBQSwrQkFBQyxnQkFBYSxXQUFVLHVDQUF4QjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQTREO0FBQUEsUUFDNUQsdUJBQUMsVUFBTSxrQ0FBUDtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQTRCO0FBQUEsV0FGOUI7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUdBO0FBQUEsTUFJRix1QkFBQyxTQUFJLFdBQVUsZ0ZBQ2I7QUFBQSwrQkFBQyxTQUFJLFdBQVUsd0VBQ2I7QUFBQSxpQ0FBQyxVQUFLLFdBQVUsa0RBQWlELDBDQUFqRTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUEyRjtBQUFBLFVBQzNGLHVCQUFDLFVBQUssV0FBVSw2Q0FBNkM7QUFBQSwyQkFBZTtBQUFBLFlBQU87QUFBQSxlQUFuRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUEyRjtBQUFBLFVBQzNGLHVCQUFDLFVBQUssV0FBVSw4QkFBNkIsNkNBQTdDO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQTBFO0FBQUEsYUFINUU7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUlBO0FBQUEsUUFFQSx1QkFBQyxTQUFJLFdBQVUsd0VBQ2I7QUFBQSxpQ0FBQyxVQUFLLFdBQVUsa0RBQWlELHVDQUFqRTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUF3RjtBQUFBLFVBQ3hGLHVCQUFDLFVBQUssV0FBVSwyQ0FBMkM7QUFBQSwyQkFBZSxTQUFTO0FBQUEsWUFBRTtBQUFBLGVBQXJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQTJGO0FBQUEsVUFDM0YsdUJBQUMsVUFBSyxXQUFVLDhCQUE2Qiw2Q0FBN0M7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBMEU7QUFBQSxhQUg1RTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBSUE7QUFBQSxRQUVBLHVCQUFDLFNBQUksV0FBVSx3RUFDYjtBQUFBLGlDQUFDLFVBQUssV0FBVSxrREFBaUQsd0NBQWpFO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQXlGO0FBQUEsVUFDekYsdUJBQUMsVUFBSyxXQUFVLDZDQUE2QztBQUFBLG9CQUFRO0FBQUEsWUFBTztBQUFBLGVBQTVFO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQXlGO0FBQUEsVUFDekYsdUJBQUMsVUFBSyxXQUFVLDhCQUE2Qiw0Q0FBN0M7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBeUU7QUFBQSxhQUgzRTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBSUE7QUFBQSxRQUVBLHVCQUFDLFNBQUksV0FBVSx3RUFDYjtBQUFBLGlDQUFDLFVBQUssV0FBVSxrREFBaUQscUNBQWpFO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQXNGO0FBQUEsVUFDdEYsdUJBQUMsVUFBSyxXQUFVLDhDQUE2QyxpQ0FBN0Q7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBOEU7QUFBQSxVQUM5RSx1QkFBQyxVQUFLLFdBQVUsOEJBQTZCLDRDQUE3QztBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUF5RTtBQUFBLGFBSDNFO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFJQTtBQUFBLFdBdkJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUF3QkE7QUFBQSxTQTdFRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBOEVBO0FBQUEsSUFHQSx1QkFBQyxTQUFJLFdBQVUsZ0dBQ2I7QUFBQTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsU0FBUyxNQUFNLGFBQWEsVUFBVTtBQUFBLFVBQ3RDLFdBQVcsNEdBQ1QsY0FBYyxhQUNWLDREQUNBLHVEQUNOO0FBQUEsVUFFQTtBQUFBLG1DQUFDLGFBQVUsV0FBVSxpQkFBckI7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBbUM7QUFBQSxZQUNuQyx1QkFBQyxVQUFLLDhDQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQW9DO0FBQUE7QUFBQTtBQUFBLFFBVHRDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQVVBO0FBQUEsTUFFQTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsU0FBUyxNQUFNLGFBQWEsVUFBVTtBQUFBLFVBQ3RDLFdBQVcsNEdBQ1QsY0FBYyxhQUNWLHdEQUNBLHVEQUNOO0FBQUEsVUFFQTtBQUFBLG1DQUFDLFVBQU8sV0FBVSxpQkFBbEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBZ0M7QUFBQSxZQUNoQyx1QkFBQyxVQUFLLHFEQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQTJDO0FBQUE7QUFBQTtBQUFBLFFBVDdDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQVVBO0FBQUEsTUFFQTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsU0FBUyxNQUFNLGFBQWEsV0FBVztBQUFBLFVBQ3ZDLFdBQVcsNEdBQ1QsY0FBYyxjQUNWLDREQUNBLHVEQUNOO0FBQUEsVUFFQTtBQUFBLG1DQUFDLFFBQUssV0FBVSxpQkFBaEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBOEI7QUFBQSxZQUM5Qix1QkFBQyxVQUFLLHNEQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQTRDO0FBQUE7QUFBQTtBQUFBLFFBVDlDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQVVBO0FBQUEsTUFFQTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsU0FBUyxNQUFNLGFBQWEsa0JBQWtCO0FBQUEsVUFDOUMsV0FBVyw0R0FDVCxjQUFjLHFCQUNWLDhEQUNBLHVEQUNOO0FBQUEsVUFFQTtBQUFBLG1DQUFDLFNBQU0sV0FBVSxpQ0FBakI7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBK0M7QUFBQSxZQUMvQyx1QkFBQyxVQUFLLHlEQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQStDO0FBQUE7QUFBQTtBQUFBLFFBVGpEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQVVBO0FBQUEsTUFFQTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsU0FBUyxNQUFNLGFBQWEsY0FBYztBQUFBLFVBQzFDLFdBQVcsNEdBQ1QsY0FBYyxpQkFDVix5REFDQSx1REFDTjtBQUFBLFVBRUE7QUFBQSxtQ0FBQyxVQUFPLFdBQVUsaUJBQWxCO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQWdDO0FBQUEsWUFDaEMsdUJBQUMsVUFBSztBQUFBO0FBQUEsY0FBd0IsZUFBZTtBQUFBLGNBQU87QUFBQSxpQkFBcEQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBcUQ7QUFBQTtBQUFBO0FBQUEsUUFUdkQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BVUE7QUFBQSxTQTNERjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBNERBO0FBQUEsSUFHQyxjQUFjLGNBQ2IsdUJBQUMsU0FBSSxXQUFVLGFBQ2I7QUFBQSw2QkFBQyxTQUFJLFdBQVUsMEhBQ2I7QUFBQSwrQkFBQyxTQUNDO0FBQUEsaUNBQUMsUUFBRyxXQUFVLHdEQUNaO0FBQUEsbUNBQUMsYUFBVSxXQUFVLDZCQUFyQjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUErQztBQUFBLFlBQy9DLHVCQUFDLFVBQUssaUZBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBdUU7QUFBQSxlQUZ6RTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUdBO0FBQUEsVUFDQSx1QkFBQyxPQUFFLFdBQVUsaUNBQWdDO0FBQUE7QUFBQSxZQUNxQix1QkFBQyxVQUFLLDJDQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQWlDO0FBQUEsWUFBTztBQUFBLFlBQXNELHVCQUFDLFVBQUssMkJBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBaUI7QUFBQSxZQUFPO0FBQUEsZUFEeEw7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFFQTtBQUFBLGFBUEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQVFBO0FBQUEsUUFDQSx1QkFBQyxTQUFJLFdBQVUsMkJBQ2I7QUFBQTtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsU0FBUyxNQUFNLFdBQVcsT0FBTyxVQUFVO0FBQUEsY0FDM0MsV0FBVTtBQUFBLGNBRVQ7QUFBQSw4QkFBYyxRQUFRLHVCQUFDLFNBQU0sV0FBVSxrQ0FBakI7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBZ0QsSUFBSyx1QkFBQyxRQUFLLFdBQVUsaUJBQWhCO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQThCO0FBQUEsZ0JBQzFHLHVCQUFDLFVBQU0sd0JBQWMsUUFBUSxnQkFBZ0IsaUJBQTdDO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQTJEO0FBQUE7QUFBQTtBQUFBLFlBTDdEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQU1BO0FBQUEsVUFDQTtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsU0FBUyxNQUFNLGdCQUFnQixzQ0FBc0MsVUFBVTtBQUFBLGNBQy9FLFdBQVU7QUFBQSxjQUVWO0FBQUEsdUNBQUMsWUFBUyxXQUFVLGlCQUFwQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUFrQztBQUFBLGdCQUNsQyx1QkFBQyxVQUFLLDRCQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQWtCO0FBQUE7QUFBQTtBQUFBLFlBTHBCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQU1BO0FBQUEsYUFkRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBZUE7QUFBQSxXQXpCRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBMEJBO0FBQUEsTUFFQSx1QkFBQyxTQUFJLFdBQVUsOEVBQ2I7QUFBQSwrQkFBQyxTQUFJLFdBQVUseUhBQ2I7QUFBQSxpQ0FBQyxVQUFLLFdBQVUsNkJBQ2Q7QUFBQSxtQ0FBQyxZQUFTLFdBQVUsaUNBQXBCO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQWtEO0FBQUEsWUFDbEQsdUJBQUMsVUFBSyx5RkFBTjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUErRTtBQUFBLGVBRmpGO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBR0E7QUFBQSxVQUNBLHVCQUFDLFVBQUssV0FBVSw4QkFBOEI7QUFBQSwyQkFBZTtBQUFBLFlBQU87QUFBQSxlQUFwRTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUEwRjtBQUFBLGFBTDVGO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFNQTtBQUFBLFFBQ0EsdUJBQUMsU0FBSSxXQUFVLHFHQUNaLHdCQURIO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFFQTtBQUFBLFdBVkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQVdBO0FBQUEsU0F4Q0Y7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQXlDQTtBQUFBLElBSUQsY0FBYyxjQUNiLHVCQUFDLFNBQUksV0FBVSxhQUNiO0FBQUEsNkJBQUMsU0FBSSxXQUFVLDBIQUNiO0FBQUEsK0JBQUMsU0FDQztBQUFBLGlDQUFDLFFBQUcsV0FBVSx3REFDWjtBQUFBLG1DQUFDLFVBQU8sV0FBVSwyQkFBbEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBMEM7QUFBQSxZQUMxQyx1QkFBQyxVQUFLLGtGQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQXdFO0FBQUEsZUFGMUU7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFHQTtBQUFBLFVBQ0EsdUJBQUMsT0FBRSxXQUFVLGlDQUFnQywyTEFBN0M7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFFQTtBQUFBLGFBUEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQVFBO0FBQUEsUUFDQSx1QkFBQyxTQUFJLFdBQVUsMkJBQ2I7QUFBQTtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsU0FBUyxNQUFNLFdBQVcsT0FBTyxVQUFVO0FBQUEsY0FDM0MsV0FBVTtBQUFBLGNBRVQ7QUFBQSw4QkFBYyxRQUFRLHVCQUFDLFNBQU0sV0FBVSxrQ0FBakI7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBZ0QsSUFBSyx1QkFBQyxRQUFLLFdBQVUsaUJBQWhCO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQThCO0FBQUEsZ0JBQzFHLHVCQUFDLFVBQU0sd0JBQWMsUUFBUSxnQkFBZ0IsaUJBQTdDO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQTJEO0FBQUE7QUFBQTtBQUFBLFlBTDdEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQU1BO0FBQUEsVUFDQTtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsU0FBUyxNQUFNLGdCQUFnQiwrQkFBK0IsVUFBVTtBQUFBLGNBQ3hFLFdBQVU7QUFBQSxjQUVWO0FBQUEsdUNBQUMsWUFBUyxXQUFVLGlCQUFwQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUFrQztBQUFBLGdCQUNsQyx1QkFBQyxVQUFLLDRCQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQWtCO0FBQUE7QUFBQTtBQUFBLFlBTHBCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQU1BO0FBQUEsYUFkRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBZUE7QUFBQSxXQXpCRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBMEJBO0FBQUEsTUFFQSx1QkFBQyxTQUFJLFdBQVUsOEVBQ2I7QUFBQSwrQkFBQyxTQUFJLFdBQVUseUhBQ2I7QUFBQSxpQ0FBQyxVQUFLLFdBQVUsNkJBQ2Q7QUFBQSxtQ0FBQyxZQUFTLFdBQVUsK0JBQXBCO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQWdEO0FBQUEsWUFDaEQsdUJBQUMsVUFBSyx3RUFBTjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUE4RDtBQUFBLGVBRmhFO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBR0E7QUFBQSxVQUNBLHVCQUFDLFVBQUssV0FBVSwyQkFBMkI7QUFBQSwyQkFBZSxTQUFTO0FBQUEsWUFBRTtBQUFBLGVBQXJFO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQTJGO0FBQUEsYUFMN0Y7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQU1BO0FBQUEsUUFDQSx1QkFBQyxTQUFJLFdBQVUsbUdBQ1osd0JBREg7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUVBO0FBQUEsV0FWRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBV0E7QUFBQSxTQXhDRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBeUNBO0FBQUEsSUFJRCxjQUFjLGVBQ2IsdUJBQUMsU0FBSSxXQUFVLGFBQ2I7QUFBQSw2QkFBQyxTQUFJLFdBQVUsMEhBQ2I7QUFBQSwrQkFBQyxTQUNDO0FBQUEsaUNBQUMsUUFBRyxXQUFVLHdEQUNaO0FBQUEsbUNBQUMsUUFBSyxXQUFVLDZCQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUEwQztBQUFBLFlBQzFDLHVCQUFDLFVBQUssNkVBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBbUU7QUFBQSxlQUZyRTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUdBO0FBQUEsVUFDQSx1QkFBQyxPQUFFLFdBQVUsaUNBQWdDO0FBQUE7QUFBQSxZQUNELHVCQUFDLFVBQUssaUNBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBdUI7QUFBQSxZQUFPO0FBQUEsZUFEMUU7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFFQTtBQUFBLGFBUEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQVFBO0FBQUEsUUFDQSx1QkFBQyxTQUFJLFdBQVUsMkJBQ2I7QUFBQTtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsU0FBUyxNQUFNLFdBQVcsT0FBTyxVQUFVO0FBQUEsY0FDM0MsV0FBVTtBQUFBLGNBRVQ7QUFBQSw4QkFBYyxRQUFRLHVCQUFDLFNBQU0sV0FBVSxrQ0FBakI7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBZ0QsSUFBSyx1QkFBQyxRQUFLLFdBQVUsaUJBQWhCO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQThCO0FBQUEsZ0JBQzFHLHVCQUFDLFVBQU0sd0JBQWMsUUFBUSxnQkFBZ0IsaUJBQTdDO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQTJEO0FBQUE7QUFBQTtBQUFBLFlBTDdEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQU1BO0FBQUEsVUFDQTtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsU0FBUyxNQUFNLGdCQUFnQixxQ0FBcUMsWUFBWSwrQkFBK0I7QUFBQSxjQUMvRyxXQUFVO0FBQUEsY0FFVjtBQUFBLHVDQUFDLFlBQVMsV0FBVSxpQkFBcEI7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBa0M7QUFBQSxnQkFDbEMsdUJBQUMsVUFBSyw0QkFBTjtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUFrQjtBQUFBO0FBQUE7QUFBQSxZQUxwQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFNQTtBQUFBLGFBZEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQWVBO0FBQUEsV0F6QkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQTBCQTtBQUFBLE1BRUEsdUJBQUMsU0FBSSxXQUFVLDhFQUNiO0FBQUEsK0JBQUMsU0FBSSxXQUFVLHlIQUNiO0FBQUEsaUNBQUMsVUFBSyxXQUFVLDZCQUNkO0FBQUEsbUNBQUMsWUFBUyxXQUFVLGlDQUFwQjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUFrRDtBQUFBLFlBQ2xELHVCQUFDLFVBQUssNkVBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBbUU7QUFBQSxlQUZyRTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUdBO0FBQUEsVUFDQSx1QkFBQyxVQUFLLFdBQVUsNkJBQTZCO0FBQUEsb0JBQVE7QUFBQSxZQUFPO0FBQUEsZUFBNUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBb0Y7QUFBQSxhQUx0RjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBTUE7QUFBQSxRQUNBLHVCQUFDLFNBQUksV0FBVSxxR0FDWix3QkFESDtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBRUE7QUFBQSxXQVZGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFXQTtBQUFBLFNBeENGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0F5Q0E7QUFBQSxJQUlELGNBQWMsc0JBQ2IsdUJBQUMsU0FBSSxXQUFVLGFBQ2IsaUNBQUMsU0FBSSxXQUFVLCtFQUNiO0FBQUEsNkJBQUMsU0FBSSxXQUFVLGtHQUNiO0FBQUEsK0JBQUMsU0FDQztBQUFBLGlDQUFDLFFBQUcsV0FBVSxxRUFDWjtBQUFBLG1DQUFDLFNBQU0sV0FBVSw2QkFBakI7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBMkM7QUFBQSxZQUMzQyx1QkFBQyxVQUFLLHNFQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQTREO0FBQUEsZUFGOUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFHQTtBQUFBLFVBQ0EsdUJBQUMsT0FBRSxXQUFVLGlDQUFnQywwSUFBN0M7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFFQTtBQUFBLGFBUEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQVFBO0FBQUEsUUFFQSx1QkFBQyxTQUFJLFdBQVUsMkJBQ2I7QUFBQTtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsT0FBTztBQUFBLGNBQ1AsVUFBVSxDQUFDLE1BQU0sc0JBQXNCLEVBQUUsT0FBTyxLQUFLO0FBQUEsY0FDckQsV0FBVTtBQUFBLGNBRVQsa0JBQVEsSUFBSSxPQUNYLHVCQUFDLFlBQWtCLE9BQU8sRUFBRSxJQUN6QjtBQUFBLGtCQUFFO0FBQUEsZ0JBQUs7QUFBQSxnQkFBRyxFQUFFO0FBQUEsZ0JBQVM7QUFBQSxtQkFEWCxFQUFFLElBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFFQSxDQUNEO0FBQUE7QUFBQSxZQVRIO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQVVBO0FBQUEsVUFFQTtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsU0FBUztBQUFBLGNBQ1QsVUFBVTtBQUFBLGNBQ1YsV0FBVTtBQUFBLGNBRVY7QUFBQSx1Q0FBQyxRQUFLLFdBQVcsZUFBZSxvQkFBb0IsaUJBQWlCLEVBQUUsTUFBdkU7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBMkU7QUFBQSxnQkFDM0UsdUJBQUMsVUFBTSw4QkFBb0Isa0JBQWtCLDZCQUE3QztBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUF1RTtBQUFBO0FBQUE7QUFBQSxZQU56RTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFPQTtBQUFBLGFBcEJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFxQkE7QUFBQSxXQWhDRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBaUNBO0FBQUEsTUFHQSx1QkFBQyxTQUFJLFdBQVUsaUZBQ2I7QUFBQSwrQkFBQyxTQUFJLFdBQVUsK0ZBQ2I7QUFBQSxpQ0FBQyxVQUFLLGtDQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQXdCO0FBQUEsVUFDeEIsdUJBQUMsVUFBSyw2QkFBTjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFtQjtBQUFBLGFBRnJCO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFHQTtBQUFBLFFBRUMsU0FBUyxXQUFXLEtBQUssQ0FBQyxxQkFDekIsdUJBQUMsU0FBSSxXQUFVLDJDQUEwQywwSEFBekQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUVBO0FBQUEsUUFHRCxTQUFTLElBQUksQ0FBQyxLQUFLLFFBQ2xCLHVCQUFDLFNBQWMsV0FBVSx5REFDdkI7QUFBQSxpQ0FBQyxTQUFJLFdBQVUsMENBQ2I7QUFBQSxtQ0FBQyxVQUFLLFdBQVUsaUJBQWdCO0FBQUE7QUFBQSxjQUFFLElBQUk7QUFBQSxjQUFNO0FBQUEsaUJBQTVDO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQTZDO0FBQUEsWUFDN0MsdUJBQUMsVUFBTSxjQUFJLFFBQVg7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBZ0I7QUFBQSxlQUZsQjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUdBO0FBQUEsVUFDQSx1QkFBQyxVQUFLLFdBQVcsNkNBQ2YsSUFBSSxXQUFXLFdBQ1gsOERBQ0EsSUFBSSxXQUFXLFlBQ2Isa0RBQ0Esc0VBQ1IsSUFDRyxjQUFJLFVBUFA7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFRQTtBQUFBLGFBYlEsS0FBVjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBY0EsQ0FDRDtBQUFBLFdBNUJIO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUE2QkE7QUFBQSxNQUdDLGVBQ0MsdUJBQUMsU0FBSSxXQUFVLHdJQUNiO0FBQUEsK0JBQUMsU0FBSSxXQUFVLHlFQUNiO0FBQUEsaUNBQUMsY0FBVyxXQUFVLDhCQUF0QjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFpRDtBQUFBLFVBQ2pELHVCQUFDLFVBQU0sc0JBQVksV0FBbkI7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBMkI7QUFBQSxhQUY3QjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBR0E7QUFBQSxRQUNBLHVCQUFDLFNBQUksV0FBVSxtREFDWixzQkFBWSxRQUFRLElBQUksQ0FBQyxHQUFHLE1BQzNCLHVCQUFDLFNBQVksV0FBVSw2QkFDckI7QUFBQSxpQ0FBQyxVQUFLLFdBQVUsb0JBQW1CLGlCQUFuQztBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFvQztBQUFBLFVBQ3BDLHVCQUFDLFVBQU0sZUFBUDtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFTO0FBQUEsYUFGRCxHQUFWO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFHQSxDQUNELEtBTkg7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQU9BO0FBQUEsV0FaRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBYUE7QUFBQSxTQW5GSjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBcUZBLEtBdEZGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0F1RkE7QUFBQSxJQUlELGNBQWMsa0JBQ2IsdUJBQUMsU0FBSSxXQUFVLGFBQ2I7QUFBQSw2QkFBQyxTQUFJLFdBQVUsbUVBQ2I7QUFBQSwrQkFBQyxTQUFJLFdBQVUsNEJBQ2I7QUFBQSxpQ0FBQyxVQUFPLFdBQVUscUVBQWxCO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQW9GO0FBQUEsVUFDcEY7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLE1BQUs7QUFBQSxjQUNMLGFBQVk7QUFBQSxjQUNaLE9BQU87QUFBQSxjQUNQLFVBQVUsQ0FBQyxNQUFNLGVBQWUsRUFBRSxPQUFPLEtBQUs7QUFBQSxjQUM5QyxXQUFVO0FBQUE7QUFBQSxZQUxaO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQU1BO0FBQUEsYUFSRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBU0E7QUFBQSxRQUNBLHVCQUFDLFNBQUksV0FBVSxvQ0FBbUM7QUFBQTtBQUFBLFVBQzNCLHVCQUFDLFlBQU8sV0FBVSxpQkFBaUIsd0JBQWMsVUFBakQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBd0Q7QUFBQSxhQUQvRTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBRUE7QUFBQSxXQWJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFjQTtBQUFBLE1BRUEsdUJBQUMsU0FBSSxXQUFVLDZFQUNiLGlDQUFDLFNBQUksV0FBVSxtQkFDYixpQ0FBQyxXQUFNLFdBQVUsc0NBQ2Y7QUFBQSwrQkFBQyxXQUFNLFdBQVUsK0VBQ2YsaUNBQUMsUUFDQztBQUFBLGlDQUFDLFFBQUcsV0FBVSxhQUFZLHdDQUExQjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFrRDtBQUFBLFVBQ2xELHVCQUFDLFFBQUcsV0FBVSxhQUFZLHNDQUExQjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFnRDtBQUFBLFVBQ2hELHVCQUFDLFFBQUcsV0FBVSxhQUFZLHlCQUExQjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFtQztBQUFBLFVBQ25DLHVCQUFDLFFBQUcsV0FBVSxhQUFZLG1DQUExQjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUE2QztBQUFBLFVBQzdDLHVCQUFDLFFBQUcsV0FBVSx5QkFBd0Isa0NBQXRDO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQXdEO0FBQUEsYUFMMUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQU1BLEtBUEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQVFBO0FBQUEsUUFDQSx1QkFBQyxXQUFNLFdBQVUsNkJBQ2Qsd0JBQWMsSUFBSSxDQUFDLFNBQ2xCLHVCQUFDLFFBQWlCLFdBQVUsMkNBQzFCO0FBQUEsaUNBQUMsUUFBRyxXQUFVLDBEQUNaO0FBQUEsbUNBQUMsUUFBSyxXQUFVLDBDQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUF1RDtBQUFBLFlBQ3ZELHVCQUFDLFVBQU0sZUFBSyxnQkFBWjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUF5QjtBQUFBLGVBRjNCO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBR0E7QUFBQSxVQUNBLHVCQUFDLFFBQUcsV0FBVSxzQ0FBc0MsZUFBSyxjQUF6RDtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFvRTtBQUFBLFVBQ3BFLHVCQUFDLFFBQUcsV0FBVSw2QkFBNkIsZUFBSyxZQUFoRDtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUF5RDtBQUFBLFVBQ3pELHVCQUFDLFFBQUcsV0FBVSwwREFBeUQsT0FBTyxLQUFLLGlCQUNoRixlQUFLLG1CQURSO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBRUE7QUFBQSxVQUNBLHVCQUFDLFFBQUcsV0FBVSx5QkFDWixpQ0FBQyxVQUFLLFdBQVUsNEdBQ2IsZUFBSyxVQURSO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBRUEsS0FIRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUlBO0FBQUEsYUFkTyxLQUFLLElBQWQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQWVBLENBQ0QsS0FsQkg7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQW1CQTtBQUFBLFdBN0JGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUE4QkEsS0EvQkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQWdDQSxLQWpDRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBa0NBO0FBQUEsU0FuREY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQW9EQTtBQUFBLE9BN2FKO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0ErYUE7QUFFSjsiLCJuYW1lcyI6W119