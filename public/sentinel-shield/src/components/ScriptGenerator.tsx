import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"]; const useMemo = __vite__cjsImport1_react["useMemo"];
import {
  Shield,
  Sliders,
  Terminal,
  Download,
  Eye,
  Zap,
  Plus,
  X,
  ShieldAlert,
  Lock,
  Ban,
  Skull,
  KeyRound,
  Flame,
  FileCode2
} from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import { generateCustomPythonScript } from "/sentinel-shield/src/utils/customScriptBuilder.ts";
import { CodeBlock } from "/sentinel-shield/src/components/CodeBlock.tsx";
import { downloadFullOfflineBundle } from "/sentinel-shield/src/utils/offlinePackageExporter.ts";
import { UltraShortFreezeModal } from "/sentinel-shield/src/components/UltraShortFreezeModal.tsx";
export const ScriptGenerator = ({ initialOS }) => {
  const [isUltraFreezeModalOpen, setIsUltraFreezeModalOpen] = useState(false);
  const [config, setConfig] = useState({
    os: initialOS || "windows",
    action: "hybrid_sabotage",
    pollIntervalMs: 300,
    checkFlutterDlls: true,
    checkFullScreenBounds: true,
    checkTopMostFlag: true,
    hotkey: "ctrl+alt+k",
    whitelist: ["explorer.exe", "taskmgr.exe", "discord.exe", "chrome.exe", "code.exe"],
    processKeywords: ["flutter", "flutter_runner", "dart.exe"],
    playAlertSound: true,
    logToConsole: true,
    runAsDaemon: false,
    enableFileQuarantine: true,
    enableIfeoBlock: true,
    peCorruptionMethod: "zero_mz_and_pe",
    aclInheritanceRemoval: true,
    aclDenyFullControl: true
  });
  const [newWhitelistItem, setNewWhitelistItem] = useState("");
  const [newKeywordItem, setNewKeywordItem] = useState("");
  const generatedCode = useMemo(() => {
    return generateCustomPythonScript(config);
  }, [config]);
  const handleAddWhitelist = () => {
    if (newWhitelistItem.trim() && !config.whitelist.includes(newWhitelistItem.trim().toLowerCase())) {
      setConfig({
        ...config,
        whitelist: [...config.whitelist, newWhitelistItem.trim().toLowerCase()]
      });
      setNewWhitelistItem("");
    }
  };
  const handleRemoveWhitelist = (item) => {
    setConfig({
      ...config,
      whitelist: config.whitelist.filter((w) => w !== item)
    });
  };
  const handleAddKeyword = () => {
    if (newKeywordItem.trim() && !config.processKeywords.includes(newKeywordItem.trim().toLowerCase())) {
      setConfig({
        ...config,
        processKeywords: [...config.processKeywords, newKeywordItem.trim().toLowerCase()]
      });
      setNewKeywordItem("");
    }
  };
  const handleRemoveKeyword = (item) => {
    setConfig({
      ...config,
      processKeywords: config.processKeywords.filter((k) => k !== item)
    });
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "absolute -right-10 -bottom-10 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" }, void 0, false, {
        fileName: "/app/applet/src/components/ScriptGenerator.tsx",
        lineNumber: 84,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col md:flex-row items-start md:items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 text-purple-400 text-xs uppercase font-bold tracking-wider mb-1", children: [
            /* @__PURE__ */ jsxDEV(Sliders, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 88,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Interaktywny Generator Kodu Python (100% OFFLINE)" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 89,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptGenerator.tsx",
            lineNumber: 87,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("h2", { className: "text-xl sm:text-2xl font-bold text-white flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV("span", { children: "Generator Skryptów: Uszkodzenie PE & Blokada ACL" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 92,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs px-2.5 py-0.5 rounded-full bg-red-950 text-red-300 border border-red-800 font-mono", children: "PE Sabotage Ready" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 93,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptGenerator.tsx",
            lineNumber: 91,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-slate-400 mt-1 max-w-2xl", children: [
            "Wygeneruj skrypt Pythona implementujący **trwałe uszkodzenie nagłówka PE (zerowanie sygnatury MZ/PE)**, **pancerną blokadę ACL (`icacls /inheritance:r /deny Everyone`)** oraz zamrażanie w RAM (",
            /* @__PURE__ */ jsxDEV("code", { className: "text-purple-400 font-mono", children: "NtSuspendProcess" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 98,
              columnNumber: 208
            }, this),
            ")."
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptGenerator.tsx",
            lineNumber: 97,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScriptGenerator.tsx",
          lineNumber: 86,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3 flex-wrap gap-y-2", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setIsUltraFreezeModalOpen(true),
              className: "flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 hover:from-amber-400 hover:to-red-500 text-white rounded-lg text-xs font-bold shadow-lg transition-all cursor-pointer border border-amber-300/40",
              children: [
                /* @__PURE__ */ jsxDEV(Zap, { className: "w-4 h-4 text-yellow-200 animate-bounce" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 107,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "⚡ Mikro-Polecenie Freeze & Wtyczki" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 108,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 103,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: downloadFullOfflineBundle,
              className: "flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-purple-700 to-pink-700 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg text-xs font-semibold shadow-lg transition-all",
              children: [
                /* @__PURE__ */ jsxDEV(Download, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 114,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Pobierz Pakiet (.bat + .py)" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 115,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 110,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "select",
            {
              value: config.os,
              onChange: (e) => setConfig({ ...config, os: e.target.value }),
              className: "bg-slate-950 text-slate-200 border border-slate-700 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:border-purple-500",
              children: [
                /* @__PURE__ */ jsxDEV("option", { value: "windows", children: "Windows 10 / 11" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 122,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: "linux", children: "Linux (X11 / Wayland)" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 123,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: "macos", children: "macOS" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 124,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 117,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScriptGenerator.tsx",
          lineNumber: 102,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ScriptGenerator.tsx",
        lineNumber: 85,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ScriptGenerator.tsx",
      lineNumber: 83,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-5 space-y-5", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "text-xs font-bold uppercase text-slate-300 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxDEV(Zap, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 138,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Główna Metoda Reakcji & Neutralizacji" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 139,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 137,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-purple-400 font-mono font-bold", children: "TAKTYKA OBRONNA" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 141,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptGenerator.tsx",
            lineNumber: 136,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                type: "button",
                onClick: () => setConfig({ ...config, action: "hybrid_sabotage" }),
                className: `w-full p-3 rounded-xl text-left border transition-all ${config.action === "hybrid_sabotage" ? "bg-gradient-to-br from-purple-950/90 to-red-950/80 border-purple-400 text-purple-100 shadow-lg shadow-purple-950/50 ring-1 ring-purple-400/50" : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"}`,
                children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-bold flex items-center justify-between text-purple-200", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxDEV(Flame, { className: "w-4 h-4 text-pink-400 animate-pulse" }, void 0, false, {
                        fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                        lineNumber: 157,
                        columnNumber: 21
                      }, this),
                      "★ HYBRYDOWY SABOTAŻ (PE Corrupt + ACL Deny + IFEO)"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                      lineNumber: 156,
                      columnNumber: 19
                    }, this),
                    config.action === "hybrid_sabotage" && /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] bg-purple-500/30 text-purple-300 px-2 py-0.5 rounded font-mono font-bold", children: "MAKSYMALNA OCHRONA" }, void 0, false, {
                      fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                      lineNumber: 161,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                    lineNumber: 155,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] text-purple-300/80 mt-1.5 leading-relaxed", children: "Najwyższy poziom restrykcji: natychmiastowe zamrożenie w RAM, fizyczne zniszczenie nagłówka PE pliku na dysku, zerwanie dziedziczenia ACL i blokada rejestru IFEO." }, void 0, false, {
                    fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                    lineNumber: 166,
                    columnNumber: 17
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 146,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                type: "button",
                onClick: () => setConfig({ ...config, action: "corrupt_pe" }),
                className: `w-full p-3 rounded-xl text-left border transition-all ${config.action === "corrupt_pe" ? "bg-red-950/80 border-red-500 text-red-100 shadow-md shadow-red-950/40 ring-1 ring-red-500/40" : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"}`,
                children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-bold flex items-center justify-between text-red-200", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxDEV(Skull, { className: "w-4 h-4 text-red-400" }, void 0, false, {
                        fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                        lineNumber: 183,
                        columnNumber: 21
                      }, this),
                      "💥 Trwałe Uszkodzenie Nagłówka PE (DOS & NT Header Corruption)"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                      lineNumber: 182,
                      columnNumber: 19
                    }, this),
                    config.action === "corrupt_pe" && /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-red-400" }, void 0, false, {
                      fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                      lineNumber: 186,
                      columnNumber: 54
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                    lineNumber: 181,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] text-red-300/80 mt-1", children: [
                    "Nadpisuje bajty sygnatury ",
                    /* @__PURE__ */ jsxDEV("code", { className: "bg-red-950/80 px-1 rounded font-mono", children: "MZ" }, void 0, false, {
                      fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                      lineNumber: 189,
                      columnNumber: 45
                    }, this),
                    " (0x5A4D) i nagłówka PE zerami. Windows odrzuca plik z błędem ",
                    /* @__PURE__ */ jsxDEV("span", { className: "text-amber-300 font-mono", children: "0xC000007B (STATUS_INVALID_IMAGE_FORMAT)" }, void 0, false, {
                      fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                      lineNumber: 189,
                      columnNumber: 171
                    }, this),
                    "."
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                    lineNumber: 188,
                    columnNumber: 17
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 172,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                type: "button",
                onClick: () => setConfig({ ...config, action: "acl_lockout" }),
                className: `w-full p-3 rounded-xl text-left border transition-all ${config.action === "acl_lockout" ? "bg-amber-950/80 border-amber-500 text-amber-100 shadow-md shadow-amber-950/40 ring-1 ring-amber-500/40" : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"}`,
                children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-bold flex items-center justify-between text-amber-200", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxDEV(KeyRound, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
                        fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                        lineNumber: 205,
                        columnNumber: 21
                      }, this),
                      "🔒 Blokada ACL (DACL Lockout / icacls /deny Everyone)"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                      lineNumber: 204,
                      columnNumber: 19
                    }, this),
                    config.action === "acl_lockout" && /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-amber-400" }, void 0, false, {
                      fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                      lineNumber: 208,
                      columnNumber: 55
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                    lineNumber: 203,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] text-amber-300/80 mt-1", children: [
                    "Odina wszelkie prawa (Execute, Read, Write) grupie Wszyscy (",
                    /* @__PURE__ */ jsxDEV("code", { className: "bg-amber-950/80 px-1 rounded font-mono", children: "*S-1-1-0" }, void 0, false, {
                      fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                      lineNumber: 211,
                      columnNumber: 79
                    }, this),
                    "). Próba uruchomienia kończy się ",
                    /* @__PURE__ */ jsxDEV("span", { className: "text-amber-300 font-mono", children: "Access Denied (Błąd 5)" }, void 0, false, {
                      fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                      lineNumber: 211,
                      columnNumber: 184
                    }, this),
                    "."
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                    lineNumber: 210,
                    columnNumber: 17
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 194,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-2 pt-1", children: [
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  type: "button",
                  onClick: () => setConfig({ ...config, action: "quarantine_lock" }),
                  className: `p-2.5 rounded-lg text-left border transition-all ${config.action === "quarantine_lock" ? "bg-purple-950/70 border-purple-500 text-purple-200" : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"}`,
                  children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-bold flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxDEV(ShieldAlert, { className: "w-3.5 h-3.5 text-purple-400" }, void 0, false, {
                        fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                        lineNumber: 227,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { children: "Kwarantanna Pliku" }, void 0, false, {
                        fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                        lineNumber: 228,
                        columnNumber: 21
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                      lineNumber: 226,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400 mt-0.5", children: "Zmiana nazwy na .quarantine" }, void 0, false, {
                      fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                      lineNumber: 230,
                      columnNumber: 19
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 217,
                  columnNumber: 17
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  type: "button",
                  onClick: () => setConfig({ ...config, action: "kill" }),
                  className: `p-2.5 rounded-lg text-left border transition-all ${config.action === "kill" ? "bg-rose-950/70 border-rose-500 text-rose-200" : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"}`,
                  children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-bold flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxDEV(Ban, { className: "w-3.5 h-3.5 text-rose-400" }, void 0, false, {
                        fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                        lineNumber: 243,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { children: "Zwykły Kill (SIGKILL)" }, void 0, false, {
                        fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                        lineNumber: 244,
                        columnNumber: 21
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                      lineNumber: 242,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400 mt-0.5", children: "Natychmiastowe zabicie" }, void 0, false, {
                      fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                      lineNumber: 246,
                      columnNumber: 19
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 233,
                  columnNumber: 17
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 216,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptGenerator.tsx",
            lineNumber: 144,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScriptGenerator.tsx",
          lineNumber: 135,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "text-xs font-bold uppercase text-slate-300 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxDEV(FileCode2, { className: "w-4 h-4 text-pink-400" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 256,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Parametry Sabotażu Binarnego (PE & ACL)" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 257,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 255,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-pink-400 font-mono", children: "WIN32 INTERNALS" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 259,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptGenerator.tsx",
            lineNumber: 254,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-2.5 text-xs", children: [
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-300 font-medium block mb-1", children: "Metoda uszkodzenia struktury Portable Executable (PE):" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 264,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV(
                "select",
                {
                  value: config.peCorruptionMethod || "zero_mz_and_pe",
                  onChange: (e) => setConfig({
                    ...config,
                    peCorruptionMethod: e.target.value
                  }),
                  className: "w-full bg-slate-950 text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-pink-500",
                  children: [
                    /* @__PURE__ */ jsxDEV("option", { value: "zero_mz_and_pe", children: "Zerowanie sygnatury DOS 'MZ' (0x5A4D) + wskaźnika PE (0x3C e_lfanew)" }, void 0, false, {
                      fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                      lineNumber: 277,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("option", { value: "wipe_first_1kb", children: "Całkowite wyzerowanie pierwszych 1024 bajtów nagłówka (\\\\x00 * 1024)" }, void 0, false, {
                      fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                      lineNumber: 280,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("option", { value: "random_urandom", children: "Kryptograficzne nadpisanie losowymi śmieciami (os.urandom 2048 bajtów)" }, void 0, false, {
                      fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                      lineNumber: 283,
                      columnNumber: 19
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 267,
                  columnNumber: 17
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 263,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("label", { className: "flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 cursor-pointer hover:border-slate-700", children: [
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-slate-200 block", children: "Zerwanie dziedziczenia ACL (/inheritance:r)" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 291,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 text-[11px]", children: "Odłącza plik od uprawnień nadrzędnego folderu (C:\\\\Users\\\\...)" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 292,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 290,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "checkbox",
                  checked: config.aclInheritanceRemoval !== false,
                  onChange: (e) => setConfig({ ...config, aclInheritanceRemoval: e.target.checked }),
                  className: "w-4 h-4 rounded text-pink-600 focus:ring-pink-500 bg-slate-900 border-slate-700"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 294,
                  columnNumber: 17
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 289,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("label", { className: "flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 cursor-pointer hover:border-slate-700", children: [
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-slate-200 block", children: "Blokada ponownego startu w Rejestrze (IFEO)" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 304,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 text-[11px]", children: "Image File Execution Options przekierowuje start na atrapę" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 305,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 303,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "checkbox",
                  checked: config.enableIfeoBlock,
                  onChange: (e) => setConfig({ ...config, enableIfeoBlock: e.target.checked }),
                  className: "w-4 h-4 rounded text-purple-600 focus:ring-purple-500 bg-slate-900 border-slate-700"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 307,
                  columnNumber: 17
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 302,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptGenerator.tsx",
            lineNumber: 262,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScriptGenerator.tsx",
          lineNumber: 253,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "text-xs font-bold uppercase text-slate-300 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxDEV(Eye, { className: "w-4 h-4 text-red-400" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 320,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Warunki Detekcji Złośliwych Okien / Modułów" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 321,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptGenerator.tsx",
            lineNumber: 319,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 text-xs", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80 cursor-pointer hover:border-slate-700", children: [
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-slate-200 block", children: "Flaga WS_EX_TOPMOST (Always-On-Top)" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 327,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 text-[11px]", children: "Wykrywaj okna z wymuszeniem wierzchniej warstwy Z-Order" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 328,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 326,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "checkbox",
                  checked: config.checkTopMostFlag,
                  onChange: (e) => setConfig({ ...config, checkTopMostFlag: e.target.checked }),
                  className: "w-4 h-4 rounded text-red-600 focus:ring-red-500 bg-slate-900 border-slate-700"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 330,
                  columnNumber: 17
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 325,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("label", { className: "flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80 cursor-pointer hover:border-slate-700", children: [
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-slate-200 block", children: "Pełne pokrycie ekranu (Fullscreen >= 90%)" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 340,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 text-[11px]", children: "Wykrywaj okna zasłaniające pasek zadań" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 341,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 339,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "checkbox",
                  checked: config.checkFullScreenBounds,
                  onChange: (e) => setConfig({ ...config, checkFullScreenBounds: e.target.checked }),
                  className: "w-4 h-4 rounded text-red-600 focus:ring-red-500 bg-slate-900 border-slate-700"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 343,
                  columnNumber: 17
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 338,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("label", { className: "flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80 cursor-pointer hover:border-slate-700", children: [
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-slate-200 block", children: "Skanowanie pamięci RAM pod kątem bibliotek Flutter" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 353,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 text-[11px]", children: "flutter_windows.dll / flutter_engine.dll" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 354,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 352,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "checkbox",
                  checked: config.checkFlutterDlls,
                  onChange: (e) => setConfig({ ...config, checkFlutterDlls: e.target.checked }),
                  className: "w-4 h-4 rounded text-red-600 focus:ring-red-500 bg-slate-900 border-slate-700"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 356,
                  columnNumber: 17
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 351,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptGenerator.tsx",
            lineNumber: 324,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScriptGenerator.tsx",
          lineNumber: 318,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "text-xs font-bold uppercase text-slate-300 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxDEV(Shield, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 370,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Biała lista procesów (Chronione)" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 371,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 369,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] text-slate-400 font-normal", children: "Nigdy nie uszkadzaj" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 373,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptGenerator.tsx",
            lineNumber: 368,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap gap-1.5", children: config.whitelist.map((item) => /* @__PURE__ */ jsxDEV(
            "span",
            {
              className: "inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700",
              children: [
                /* @__PURE__ */ jsxDEV("span", { children: item }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 382,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => handleRemoveWhitelist(item),
                    className: "text-slate-500 hover:text-red-400",
                    children: /* @__PURE__ */ jsxDEV(X, { className: "w-3 h-3" }, void 0, false, {
                      fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                      lineNumber: 387,
                      columnNumber: 21
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                    lineNumber: 383,
                    columnNumber: 19
                  },
                  this
                )
              ]
            },
            item,
            true,
            {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 378,
              columnNumber: 17
            },
            this
          )) }, void 0, false, {
            fileName: "/app/applet/src/components/ScriptGenerator.tsx",
            lineNumber: 376,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 pt-1", children: [
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "text",
                placeholder: "np. obs64.exe",
                value: newWhitelistItem,
                onChange: (e) => setNewWhitelistItem(e.target.value),
                onKeyDown: (e) => e.key === "Enter" && handleAddWhitelist(),
                className: "flex-1 bg-slate-950 text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-mono"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 394,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: handleAddWhitelist,
                className: "px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs flex items-center gap-1 border border-slate-700",
                children: [
                  /* @__PURE__ */ jsxDEV(Plus, { className: "w-3.5 h-3.5" }, void 0, false, {
                    fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                    lineNumber: 406,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Dodaj" }, void 0, false, {
                    fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                    lineNumber: 407,
                    columnNumber: 17
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 402,
                columnNumber: 15
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptGenerator.tsx",
            lineNumber: 393,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScriptGenerator.tsx",
          lineNumber: 367,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ScriptGenerator.tsx",
        lineNumber: 133,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-7 space-y-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsxDEV(Terminal, { className: "w-4 h-4 text-pink-400" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 417,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-sm font-bold text-white", children: [
              "Wygenerowany plik Python: ",
              /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-pink-400", children: "custom_overlay_sentinel.py" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 419,
                columnNumber: 43
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 418,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptGenerator.tsx",
            lineNumber: 416,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5", children: /* @__PURE__ */ jsxDEV("span", { className: "text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono font-bold", children: "100% OFFLINE" }, void 0, false, {
            fileName: "/app/applet/src/components/ScriptGenerator.tsx",
            lineNumber: 423,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/ScriptGenerator.tsx",
            lineNumber: 422,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScriptGenerator.tsx",
          lineNumber: 415,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(
          CodeBlock,
          {
            code: generatedCode,
            language: "python",
            filename: "custom_overlay_sentinel.py"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/ScriptGenerator.tsx",
            lineNumber: 429,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "bg-red-950/40 border border-red-800/60 rounded-xl p-3 text-xs space-y-1", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "font-bold text-red-300 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxDEV(Skull, { className: "w-4 h-4 text-red-400" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 439,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Skutek Uszkodzenia Nagłówka PE:" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 440,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 438,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-slate-300 text-[11px] leading-relaxed", children: [
              "Gdy Windows PE Loader (",
              /* @__PURE__ */ jsxDEV("code", { className: "text-red-300 font-mono", children: "ntdll.dll!LdrpInitializeProcess" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 443,
                columnNumber: 40
              }, this),
              ") wykryje brak sygnatury ",
              /* @__PURE__ */ jsxDEV("code", { className: "text-red-300 font-mono", children: "MZ" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 443,
                columnNumber: 144
              }, this),
              " lub niepoprawny offset ",
              /* @__PURE__ */ jsxDEV("code", { className: "text-red-300 font-mono", children: "e_lfanew" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 443,
                columnNumber: 218
              }, this),
              ", zwróci błąd ",
              /* @__PURE__ */ jsxDEV("span", { className: "text-red-200 font-bold", children: "0xC000007B (STATUS_INVALID_IMAGE_FORMAT)" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 443,
                columnNumber: 288
              }, this),
              "."
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 442,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptGenerator.tsx",
            lineNumber: 437,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "bg-amber-950/40 border border-amber-800/60 rounded-xl p-3 text-xs space-y-1", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "font-bold text-amber-300 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxDEV(Lock, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 449,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Skutek Blokady ACL (icacls Deny):" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 450,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 448,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-slate-300 text-[11px] leading-relaxed", children: [
              "Security Reference Monitor (SRM) w NTFS odrzuca wszelkie żądania otwarcia pliku (",
              /* @__PURE__ */ jsxDEV("code", { className: "text-amber-300 font-mono", children: "FILE_EXECUTE / FILE_READ_DATA" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 453,
                columnNumber: 98
              }, this),
              "). Windows zwraca natychmiast błąd ",
              /* @__PURE__ */ jsxDEV("span", { className: "text-amber-200 font-bold", children: "Access Denied (0x5)" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 453,
                columnNumber: 212
              }, this),
              "."
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 452,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptGenerator.tsx",
            lineNumber: 447,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScriptGenerator.tsx",
          lineNumber: 436,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/90 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 space-y-2", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "font-semibold text-white flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-pink-400 animate-ping" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 461,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Instrukcja uruchomienia skryptu w trybie offline:" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 462,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptGenerator.tsx",
            lineNumber: 460,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("ol", { className: "list-decimal list-inside space-y-1 text-slate-400 pl-1", children: [
            /* @__PURE__ */ jsxDEV("li", { children: [
              "Zapisz wygenerowany kod jako plik ",
              /* @__PURE__ */ jsxDEV("code", { className: "bg-slate-950 px-1.5 py-0.5 rounded text-pink-300 font-mono", children: "custom_overlay_sentinel.py" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 466,
                columnNumber: 51
              }, this),
              " na dysku C: lub pulpicie."
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 465,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("li", { children: "Otwórz Wiersz Poleceń (CMD) jako **Administrator** (Prawy przycisk myszy → *Uruchom jako administrator*)." }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 468,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("li", { children: [
              "Wpisz polecenie: ",
              /* @__PURE__ */ jsxDEV("code", { className: "bg-slate-950 px-1.5 py-0.5 rounded text-pink-300 font-mono", children: "python custom_overlay_sentinel.py" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 472,
                columnNumber: 34
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 471,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("li", { children: [
              "Skrypt w ułamku sekundy wykryje blokujące okno/proces, zamrozi go w RAM (",
              /* @__PURE__ */ jsxDEV("code", { className: "text-purple-300 font-mono", children: "NtSuspendProcess" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 475,
                columnNumber: 90
              }, this),
              ") i trwale unieszkodliwi plik wykonywalny na dysku, uniemożliwiając jego ponowne uruchomienie."
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 474,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptGenerator.tsx",
            lineNumber: 464,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScriptGenerator.tsx",
          lineNumber: 459,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ScriptGenerator.tsx",
        lineNumber: 414,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ScriptGenerator.tsx",
      lineNumber: 131,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(
      UltraShortFreezeModal,
      {
        isOpen: isUltraFreezeModalOpen,
        onClose: () => setIsUltraFreezeModalOpen(false)
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/components/ScriptGenerator.tsx",
        lineNumber: 483,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/ScriptGenerator.tsx",
    lineNumber: 81,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNjcmlwdEdlbmVyYXRvci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VNZW1vIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgXG4gIFNldHRpbmdzLCBTaGllbGQsIFNsaWRlcnMsIFBsYXksIFRlcm1pbmFsLCBEb3dubG9hZCwgU3BhcmtsZXMsIENwdSwgRXllLCBcbiAgWmFwLCBWb2x1bWUyLCBQbHVzLCBYLCBTaGllbGRBbGVydCwgTG9jaywgQmFuLCBTa3VsbCwgRmlsZVgsIEtleVJvdW5kLCBcbiAgRmxhbWUsIENoZWNrQ2lyY2xlLCBBbGVydFRyaWFuZ2xlLCBGaWxlQ29kZTIsIExheWVyc1xufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgU2NyaXB0T3B0aW9uQ29uZmlnLCBPU1R5cGUsIEFjdGlvblR5cGUgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBnZW5lcmF0ZUN1c3RvbVB5dGhvblNjcmlwdCB9IGZyb20gJy4uL3V0aWxzL2N1c3RvbVNjcmlwdEJ1aWxkZXInO1xuaW1wb3J0IHsgQ29kZUJsb2NrIH0gZnJvbSAnLi9Db2RlQmxvY2snO1xuaW1wb3J0IHsgZG93bmxvYWRGdWxsT2ZmbGluZUJ1bmRsZSB9IGZyb20gJy4uL3V0aWxzL29mZmxpbmVQYWNrYWdlRXhwb3J0ZXInO1xuaW1wb3J0IHsgVWx0cmFTaG9ydEZyZWV6ZU1vZGFsIH0gZnJvbSAnLi9VbHRyYVNob3J0RnJlZXplTW9kYWwnO1xuXG5pbnRlcmZhY2UgU2NyaXB0R2VuZXJhdG9yUHJvcHMge1xuICBpbml0aWFsT1M6IE9TVHlwZTtcbn1cblxuZXhwb3J0IGNvbnN0IFNjcmlwdEdlbmVyYXRvcjogUmVhY3QuRkM8U2NyaXB0R2VuZXJhdG9yUHJvcHM+ID0gKHsgaW5pdGlhbE9TIH0pID0+IHtcbiAgY29uc3QgW2lzVWx0cmFGcmVlemVNb2RhbE9wZW4sIHNldElzVWx0cmFGcmVlemVNb2RhbE9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbY29uZmlnLCBzZXRDb25maWddID0gdXNlU3RhdGU8U2NyaXB0T3B0aW9uQ29uZmlnPih7XG4gICAgb3M6IGluaXRpYWxPUyB8fCAnd2luZG93cycsXG4gICAgYWN0aW9uOiAnaHlicmlkX3NhYm90YWdlJyxcbiAgICBwb2xsSW50ZXJ2YWxNczogMzAwLFxuICAgIGNoZWNrRmx1dHRlckRsbHM6IHRydWUsXG4gICAgY2hlY2tGdWxsU2NyZWVuQm91bmRzOiB0cnVlLFxuICAgIGNoZWNrVG9wTW9zdEZsYWc6IHRydWUsXG4gICAgaG90a2V5OiAnY3RybCthbHQraycsXG4gICAgd2hpdGVsaXN0OiBbJ2V4cGxvcmVyLmV4ZScsICd0YXNrbWdyLmV4ZScsICdkaXNjb3JkLmV4ZScsICdjaHJvbWUuZXhlJywgJ2NvZGUuZXhlJ10sXG4gICAgcHJvY2Vzc0tleXdvcmRzOiBbJ2ZsdXR0ZXInLCAnZmx1dHRlcl9ydW5uZXInLCAnZGFydC5leGUnXSxcbiAgICBwbGF5QWxlcnRTb3VuZDogdHJ1ZSxcbiAgICBsb2dUb0NvbnNvbGU6IHRydWUsXG4gICAgcnVuQXNEYWVtb246IGZhbHNlLFxuICAgIGVuYWJsZUZpbGVRdWFyYW50aW5lOiB0cnVlLFxuICAgIGVuYWJsZUlmZW9CbG9jazogdHJ1ZSxcbiAgICBwZUNvcnJ1cHRpb25NZXRob2Q6ICd6ZXJvX216X2FuZF9wZScsXG4gICAgYWNsSW5oZXJpdGFuY2VSZW1vdmFsOiB0cnVlLFxuICAgIGFjbERlbnlGdWxsQ29udHJvbDogdHJ1ZSxcbiAgfSk7XG5cbiAgY29uc3QgW25ld1doaXRlbGlzdEl0ZW0sIHNldE5ld1doaXRlbGlzdEl0ZW1dID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbbmV3S2V5d29yZEl0ZW0sIHNldE5ld0tleXdvcmRJdGVtXSA9IHVzZVN0YXRlKCcnKTtcblxuICBjb25zdCBnZW5lcmF0ZWRDb2RlID0gdXNlTWVtbygoKSA9PiB7XG4gICAgcmV0dXJuIGdlbmVyYXRlQ3VzdG9tUHl0aG9uU2NyaXB0KGNvbmZpZyk7XG4gIH0sIFtjb25maWddKTtcblxuICBjb25zdCBoYW5kbGVBZGRXaGl0ZWxpc3QgPSAoKSA9PiB7XG4gICAgaWYgKG5ld1doaXRlbGlzdEl0ZW0udHJpbSgpICYmICFjb25maWcud2hpdGVsaXN0LmluY2x1ZGVzKG5ld1doaXRlbGlzdEl0ZW0udHJpbSgpLnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgICBzZXRDb25maWcoe1xuICAgICAgICAuLi5jb25maWcsXG4gICAgICAgIHdoaXRlbGlzdDogWy4uLmNvbmZpZy53aGl0ZWxpc3QsIG5ld1doaXRlbGlzdEl0ZW0udHJpbSgpLnRvTG93ZXJDYXNlKCldLFxuICAgICAgfSk7XG4gICAgICBzZXROZXdXaGl0ZWxpc3RJdGVtKCcnKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUmVtb3ZlV2hpdGVsaXN0ID0gKGl0ZW06IHN0cmluZykgPT4ge1xuICAgIHNldENvbmZpZyh7XG4gICAgICAuLi5jb25maWcsXG4gICAgICB3aGl0ZWxpc3Q6IGNvbmZpZy53aGl0ZWxpc3QuZmlsdGVyKCh3KSA9PiB3ICE9PSBpdGVtKSxcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVBZGRLZXl3b3JkID0gKCkgPT4ge1xuICAgIGlmIChuZXdLZXl3b3JkSXRlbS50cmltKCkgJiYgIWNvbmZpZy5wcm9jZXNzS2V5d29yZHMuaW5jbHVkZXMobmV3S2V5d29yZEl0ZW0udHJpbSgpLnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgICBzZXRDb25maWcoe1xuICAgICAgICAuLi5jb25maWcsXG4gICAgICAgIHByb2Nlc3NLZXl3b3JkczogWy4uLmNvbmZpZy5wcm9jZXNzS2V5d29yZHMsIG5ld0tleXdvcmRJdGVtLnRyaW0oKS50b0xvd2VyQ2FzZSgpXSxcbiAgICAgIH0pO1xuICAgICAgc2V0TmV3S2V5d29yZEl0ZW0oJycpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVSZW1vdmVLZXl3b3JkID0gKGl0ZW06IHN0cmluZykgPT4ge1xuICAgIHNldENvbmZpZyh7XG4gICAgICAuLi5jb25maWcsXG4gICAgICBwcm9jZXNzS2V5d29yZHM6IGNvbmZpZy5wcm9jZXNzS2V5d29yZHMuZmlsdGVyKChrKSA9PiBrICE9PSBpdGVtKSxcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS02XCI+XG4gICAgICB7LyogSGVhZGVyIEJhbm5lciAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQtMnhsIHAtNiBzaGFkb3cteGwgcmVsYXRpdmUgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgLXJpZ2h0LTEwIC1ib3R0b20tMTAgdy00OCBoLTQ4IGJnLXB1cnBsZS02MDAvMTAgcm91bmRlZC1mdWxsIGJsdXItM3hsIHBvaW50ZXItZXZlbnRzLW5vbmVcIiAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgbWQ6ZmxleC1yb3cgaXRlbXMtc3RhcnQgbWQ6aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNFwiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMiB0ZXh0LXB1cnBsZS00MDAgdGV4dC14cyB1cHBlcmNhc2UgZm9udC1ib2xkIHRyYWNraW5nLXdpZGVyIG1iLTFcIj5cbiAgICAgICAgICAgICAgPFNsaWRlcnMgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPkludGVyYWt0eXdueSBHZW5lcmF0b3IgS29kdSBQeXRob24gKDEwMCUgT0ZGTElORSk8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LXhsIHNtOnRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgIDxzcGFuPkdlbmVyYXRvciBTa3J5cHTDs3c6IFVzemtvZHplbmllIFBFICYgQmxva2FkYSBBQ0w8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgcHgtMi41IHB5LTAuNSByb3VuZGVkLWZ1bGwgYmctcmVkLTk1MCB0ZXh0LXJlZC0zMDAgYm9yZGVyIGJvcmRlci1yZWQtODAwIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgIFBFIFNhYm90YWdlIFJlYWR5XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtc2xhdGUtNDAwIG10LTEgbWF4LXctMnhsXCI+XG4gICAgICAgICAgICAgIFd5Z2VuZXJ1aiBza3J5cHQgUHl0aG9uYSBpbXBsZW1lbnR1asSFY3kgKip0cndhxYJlIHVzemtvZHplbmllIG5hZ8WCw7N3a2EgUEUgKHplcm93YW5pZSBzeWduYXR1cnkgTVovUEUpKiosICoqcGFuY2VybsSFIGJsb2thZMSZIEFDTCAoYGljYWNscyAvaW5oZXJpdGFuY2U6ciAvZGVueSBFdmVyeW9uZWApKiogb3JheiB6YW1yYcW8YW5pZSB3IFJBTSAoPGNvZGUgY2xhc3NOYW1lPVwidGV4dC1wdXJwbGUtNDAwIGZvbnQtbW9ub1wiPk50U3VzcGVuZFByb2Nlc3M8L2NvZGU+KS5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0zIGZsZXgtd3JhcCBnYXAteS0yXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldElzVWx0cmFGcmVlemVNb2RhbE9wZW4odHJ1ZSl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgcHgtMyBweS0yIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1hbWJlci01MDAgdmlhLW9yYW5nZS02MDAgdG8tcmVkLTYwMCBob3Zlcjpmcm9tLWFtYmVyLTQwMCBob3Zlcjp0by1yZWQtNTAwIHRleHQtd2hpdGUgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtYm9sZCBzaGFkb3ctbGcgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgYm9yZGVyIGJvcmRlci1hbWJlci0zMDAvNDBcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8WmFwIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC15ZWxsb3ctMjAwIGFuaW1hdGUtYm91bmNlXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+4pqhIE1pa3JvLVBvbGVjZW5pZSBGcmVlemUgJiBXdHljemtpPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2Rvd25sb2FkRnVsbE9mZmxpbmVCdW5kbGV9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgcHgtMyBweS0yIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1wdXJwbGUtNzAwIHRvLXBpbmstNzAwIGhvdmVyOmZyb20tcHVycGxlLTYwMCBob3Zlcjp0by1waW5rLTYwMCB0ZXh0LXdoaXRlIHJvdW5kZWQtbGcgdGV4dC14cyBmb250LXNlbWlib2xkIHNoYWRvdy1sZyB0cmFuc2l0aW9uLWFsbFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxEb3dubG9hZCBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+UG9iaWVyeiBQYWtpZXQgKC5iYXQgKyAucHkpPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgIHZhbHVlPXtjb25maWcub3N9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0Q29uZmlnKHsgLi4uY29uZmlnLCBvczogZS50YXJnZXQudmFsdWUgYXMgT1NUeXBlIH0pfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZy1zbGF0ZS05NTAgdGV4dC1zbGF0ZS0yMDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgcm91bmRlZC1sZyBweC0zIHB5LTIgdGV4dC14cyBmb250LXNlbWlib2xkIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItcHVycGxlLTUwMFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJ3aW5kb3dzXCI+V2luZG93cyAxMCAvIDExPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJsaW51eFwiPkxpbnV4IChYMTEgLyBXYXlsYW5kKTwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwibWFjb3NcIj5tYWNPUzwvb3B0aW9uPlxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBUd28gQ29sdW1uIExheW91dDogT3B0aW9ucyBhbmQgR2VuZXJhdGVkIENvZGUgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbGc6Z3JpZC1jb2xzLTEyIGdhcC02XCI+XG4gICAgICAgIHsvKiBMZWZ0IENvbHVtbjogQ29uZmlnIFBhbmVsICg1IGNvbHMpICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTUgc3BhY2UteS01XCI+XG4gICAgICAgICAgey8qIEFjdGlvbiBNb2RlIENhcmQgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAvOTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC14bCBwLTQgc3BhY2UteS0zXCI+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdXBwZXJjYXNlIHRleHQtc2xhdGUtMzAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgPFphcCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcHVycGxlLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+R8WCw7N3bmEgTWV0b2RhIFJlYWtjamkgJiBOZXV0cmFsaXphY2ppPC9zcGFuPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtcHVycGxlLTQwMCBmb250LW1vbm8gZm9udC1ib2xkXCI+VEFLVFlLQSBPQlJPTk5BPC9zcGFuPlxuICAgICAgICAgICAgPC9sYWJlbD5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgey8qIEhZQlJZRE9XWSBQQU5DRVJOWSBTQUJPVEHFuyAqL31cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldENvbmZpZyh7IC4uLmNvbmZpZywgYWN0aW9uOiAnaHlicmlkX3NhYm90YWdlJyB9KX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LWZ1bGwgcC0zIHJvdW5kZWQteGwgdGV4dC1sZWZ0IGJvcmRlciB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICAgICAgY29uZmlnLmFjdGlvbiA9PT0gJ2h5YnJpZF9zYWJvdGFnZSdcbiAgICAgICAgICAgICAgICAgICAgPyAnYmctZ3JhZGllbnQtdG8tYnIgZnJvbS1wdXJwbGUtOTUwLzkwIHRvLXJlZC05NTAvODAgYm9yZGVyLXB1cnBsZS00MDAgdGV4dC1wdXJwbGUtMTAwIHNoYWRvdy1sZyBzaGFkb3ctcHVycGxlLTk1MC81MCByaW5nLTEgcmluZy1wdXJwbGUtNDAwLzUwJ1xuICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05NTAgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTQwMCBob3Zlcjpib3JkZXItc2xhdGUtNzAwJ1xuICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC1wdXJwbGUtMjAwXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgIDxGbGFtZSBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcGluay00MDAgYW5pbWF0ZS1wdWxzZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIOKYhSBIWUJSWURPV1kgU0FCT1RBxbsgKFBFIENvcnJ1cHQgKyBBQ0wgRGVueSArIElGRU8pXG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICB7Y29uZmlnLmFjdGlvbiA9PT0gJ2h5YnJpZF9zYWJvdGFnZScgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBiZy1wdXJwbGUtNTAwLzMwIHRleHQtcHVycGxlLTMwMCBweC0yIHB5LTAuNSByb3VuZGVkIGZvbnQtbW9ubyBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICBNQUtTWU1BTE5BIE9DSFJPTkFcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtcHVycGxlLTMwMC84MCBtdC0xLjUgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgICAgICBOYWp3ecW8c3p5IHBvemlvbSByZXN0cnlrY2ppOiBuYXR5Y2htaWFzdG93ZSB6YW1yb8W8ZW5pZSB3IFJBTSwgZml6eWN6bmUgem5pc3pjemVuaWUgbmFnxYLDs3drYSBQRSBwbGlrdSBuYSBkeXNrdSwgemVyd2FuaWUgZHppZWR6aWN6ZW5pYSBBQ0wgaSBibG9rYWRhIHJlamVzdHJ1IElGRU8uXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgIHsvKiBUUldBxYFFIFVTWktPRFpFTklFIE5BR8WBw5NXS0EgUEUgKi99XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRDb25maWcoeyAuLi5jb25maWcsIGFjdGlvbjogJ2NvcnJ1cHRfcGUnIH0pfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCBwLTMgcm91bmRlZC14bCB0ZXh0LWxlZnQgYm9yZGVyIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICBjb25maWcuYWN0aW9uID09PSAnY29ycnVwdF9wZSdcbiAgICAgICAgICAgICAgICAgICAgPyAnYmctcmVkLTk1MC84MCBib3JkZXItcmVkLTUwMCB0ZXh0LXJlZC0xMDAgc2hhZG93LW1kIHNoYWRvdy1yZWQtOTUwLzQwIHJpbmctMSByaW5nLXJlZC01MDAvNDAnXG4gICAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTk1MCBib3JkZXItc2xhdGUtODAwIHRleHQtc2xhdGUtNDAwIGhvdmVyOmJvcmRlci1zbGF0ZS03MDAnXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LXJlZC0yMDBcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgPFNrdWxsIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1yZWQtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAg8J+SpSBUcndhxYJlIFVzemtvZHplbmllIE5hZ8WCw7N3a2EgUEUgKERPUyAmIE5UIEhlYWRlciBDb3JydXB0aW9uKVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAge2NvbmZpZy5hY3Rpb24gPT09ICdjb3JydXB0X3BlJyAmJiA8c3BhbiBjbGFzc05hbWU9XCJ3LTIgaC0yIHJvdW5kZWQtZnVsbCBiZy1yZWQtNDAwXCI+PC9zcGFuPn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtcmVkLTMwMC84MCBtdC0xXCI+XG4gICAgICAgICAgICAgICAgICBOYWRwaXN1amUgYmFqdHkgc3lnbmF0dXJ5IDxjb2RlIGNsYXNzTmFtZT1cImJnLXJlZC05NTAvODAgcHgtMSByb3VuZGVkIGZvbnQtbW9ub1wiPk1aPC9jb2RlPiAoMHg1QTREKSBpIG5hZ8WCw7N3a2EgUEUgemVyYW1pLiBXaW5kb3dzIG9kcnp1Y2EgcGxpayB6IGLFgsSZZGVtIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYW1iZXItMzAwIGZvbnQtbW9ub1wiPjB4QzAwMDAwN0IgKFNUQVRVU19JTlZBTElEX0lNQUdFX0ZPUk1BVCk8L3NwYW4+LlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICB7LyogQkxPS0FEQSBVUFJBV05JRcWDIEFDTCAqL31cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldENvbmZpZyh7IC4uLmNvbmZpZywgYWN0aW9uOiAnYWNsX2xvY2tvdXQnIH0pfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCBwLTMgcm91bmRlZC14bCB0ZXh0LWxlZnQgYm9yZGVyIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICBjb25maWcuYWN0aW9uID09PSAnYWNsX2xvY2tvdXQnXG4gICAgICAgICAgICAgICAgICAgID8gJ2JnLWFtYmVyLTk1MC84MCBib3JkZXItYW1iZXItNTAwIHRleHQtYW1iZXItMTAwIHNoYWRvdy1tZCBzaGFkb3ctYW1iZXItOTUwLzQwIHJpbmctMSByaW5nLWFtYmVyLTUwMC80MCdcbiAgICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTUwIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS00MDAgaG92ZXI6Ym9yZGVyLXNsYXRlLTcwMCdcbiAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQtYW1iZXItMjAwXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgIDxLZXlSb3VuZCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtYW1iZXItNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAg8J+UkiBCbG9rYWRhIEFDTCAoREFDTCBMb2Nrb3V0IC8gaWNhY2xzIC9kZW55IEV2ZXJ5b25lKVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAge2NvbmZpZy5hY3Rpb24gPT09ICdhY2xfbG9ja291dCcgJiYgPHNwYW4gY2xhc3NOYW1lPVwidy0yIGgtMiByb3VuZGVkLWZ1bGwgYmctYW1iZXItNDAwXCI+PC9zcGFuPn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtYW1iZXItMzAwLzgwIG10LTFcIj5cbiAgICAgICAgICAgICAgICAgIE9kaW5hIHdzemVsa2llIHByYXdhIChFeGVjdXRlLCBSZWFkLCBXcml0ZSkgZ3J1cGllIFdzenlzY3kgKDxjb2RlIGNsYXNzTmFtZT1cImJnLWFtYmVyLTk1MC84MCBweC0xIHJvdW5kZWQgZm9udC1tb25vXCI+KlMtMS0xLTA8L2NvZGU+KS4gUHLDs2JhIHVydWNob21pZW5pYSBrb8WEY3p5IHNpxJkgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1hbWJlci0zMDAgZm9udC1tb25vXCI+QWNjZXNzIERlbmllZCAoQsWCxIVkIDUpPC9zcGFuPi5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgey8qIFBvem9zdGHFgmUgc3RhbmRhcmRvd2Ugb3BjamUgdyBzaWF0Y2UgMngyICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTIgcHQtMVwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0Q29uZmlnKHsgLi4uY29uZmlnLCBhY3Rpb246ICdxdWFyYW50aW5lX2xvY2snIH0pfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC0yLjUgcm91bmRlZC1sZyB0ZXh0LWxlZnQgYm9yZGVyIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5hY3Rpb24gPT09ICdxdWFyYW50aW5lX2xvY2snXG4gICAgICAgICAgICAgICAgICAgICAgPyAnYmctcHVycGxlLTk1MC83MCBib3JkZXItcHVycGxlLTUwMCB0ZXh0LXB1cnBsZS0yMDAnXG4gICAgICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTUwIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS00MDAgaG92ZXI6Ym9yZGVyLXNsYXRlLTcwMCdcbiAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgPFNoaWVsZEFsZXJ0IGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtcHVycGxlLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPkt3YXJhbnRhbm5hIFBsaWt1PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIG10LTAuNVwiPlptaWFuYSBuYXp3eSBuYSAucXVhcmFudGluZTwvZGl2PlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRDb25maWcoeyAuLi5jb25maWcsIGFjdGlvbjogJ2tpbGwnIH0pfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC0yLjUgcm91bmRlZC1sZyB0ZXh0LWxlZnQgYm9yZGVyIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5hY3Rpb24gPT09ICdraWxsJ1xuICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXJvc2UtOTUwLzcwIGJvcmRlci1yb3NlLTUwMCB0ZXh0LXJvc2UtMjAwJ1xuICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTk1MCBib3JkZXItc2xhdGUtODAwIHRleHQtc2xhdGUtNDAwIGhvdmVyOmJvcmRlci1zbGF0ZS03MDAnXG4gICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgICAgIDxCYW4gY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1yb3NlLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlp3eWvFgnkgS2lsbCAoU0lHS0lMTCk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDAgbXQtMC41XCI+TmF0eWNobWlhc3Rvd2UgemFiaWNpZTwvZGl2PlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIERlZHlrb3dhbnkgUGFuZWwgS29uZmlndXJhY2ppIFVzemthZHphbmlhIFBFICYgQmxva2FkeSBBQ0wgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAvOTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC14bCBwLTQgc3BhY2UteS0zXCI+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdXBwZXJjYXNlIHRleHQtc2xhdGUtMzAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgPEZpbGVDb2RlMiBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcGluay00MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPlBhcmFtZXRyeSBTYWJvdGHFvHUgQmluYXJuZWdvIChQRSAmIEFDTCk8L3NwYW4+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1waW5rLTQwMCBmb250LW1vbm9cIj5XSU4zMiBJTlRFUk5BTFM8L3NwYW4+XG4gICAgICAgICAgICA8L2xhYmVsPlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMi41IHRleHQteHNcIj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTMwMCBmb250LW1lZGl1bSBibG9jayBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICBNZXRvZGEgdXN6a29kemVuaWEgc3RydWt0dXJ5IFBvcnRhYmxlIEV4ZWN1dGFibGUgKFBFKTpcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2NvbmZpZy5wZUNvcnJ1cHRpb25NZXRob2QgfHwgJ3plcm9fbXpfYW5kX3BlJ31cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgc2V0Q29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgICAuLi5jb25maWcsXG4gICAgICAgICAgICAgICAgICAgICAgcGVDb3JydXB0aW9uTWV0aG9kOiBlLnRhcmdldC52YWx1ZSBhcyBhbnksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtOTUwIHRleHQtc2xhdGUtMjAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHJvdW5kZWQtbGcgcHgtMi41IHB5LTEuNSB0ZXh0LXhzIGZvbnQtbW9ubyBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXBpbmstNTAwXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiemVyb19tel9hbmRfcGVcIj5cbiAgICAgICAgICAgICAgICAgICAgWmVyb3dhbmllIHN5Z25hdHVyeSBET1MgJ01aJyAoMHg1QTREKSArIHdza2HFum5pa2EgUEUgKDB4M0MgZV9sZmFuZXcpXG4gICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJ3aXBlX2ZpcnN0XzFrYlwiPlxuICAgICAgICAgICAgICAgICAgICBDYcWCa293aXRlIHd5emVyb3dhbmllIHBpZXJ3c3p5Y2ggMTAyNCBiYWp0w7N3IG5hZ8WCw7N3a2EgKFxcXFx4MDAgKiAxMDI0KVxuICAgICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicmFuZG9tX3VyYW5kb21cIj5cbiAgICAgICAgICAgICAgICAgICAgS3J5cHRvZ3JhZmljem5lIG5hZHBpc2FuaWUgbG9zb3d5bWkgxZttaWVjaWFtaSAob3MudXJhbmRvbSAyMDQ4IGJhanTDs3cpXG4gICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBwLTIuNSByb3VuZGVkLWxnIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMC84MCBjdXJzb3ItcG9pbnRlciBob3Zlcjpib3JkZXItc2xhdGUtNzAwXCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS0yMDAgYmxvY2tcIj5aZXJ3YW5pZSBkemllZHppY3plbmlhIEFDTCAoL2luaGVyaXRhbmNlOnIpPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgdGV4dC1bMTFweF1cIj5PZMWCxIVjemEgcGxpayBvZCB1cHJhd25pZcWEIG5hZHJ6xJlkbmVnbyBmb2xkZXJ1IChDOlxcXFxVc2Vyc1xcXFwuLi4pPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e2NvbmZpZy5hY2xJbmhlcml0YW5jZVJlbW92YWwgIT09IGZhbHNlfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRDb25maWcoeyAuLi5jb25maWcsIGFjbEluaGVyaXRhbmNlUmVtb3ZhbDogZS50YXJnZXQuY2hlY2tlZCB9KX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctNCBoLTQgcm91bmRlZCB0ZXh0LXBpbmstNjAwIGZvY3VzOnJpbmctcGluay01MDAgYmctc2xhdGUtOTAwIGJvcmRlci1zbGF0ZS03MDBcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvbGFiZWw+XG5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBwLTIuNSByb3VuZGVkLWxnIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMC84MCBjdXJzb3ItcG9pbnRlciBob3Zlcjpib3JkZXItc2xhdGUtNzAwXCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS0yMDAgYmxvY2tcIj5CbG9rYWRhIHBvbm93bmVnbyBzdGFydHUgdyBSZWplc3RyemUgKElGRU8pPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgdGV4dC1bMTFweF1cIj5JbWFnZSBGaWxlIEV4ZWN1dGlvbiBPcHRpb25zIHByemVraWVyb3d1amUgc3RhcnQgbmEgYXRyYXDEmTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICBjaGVja2VkPXtjb25maWcuZW5hYmxlSWZlb0Jsb2NrfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRDb25maWcoeyAuLi5jb25maWcsIGVuYWJsZUlmZW9CbG9jazogZS50YXJnZXQuY2hlY2tlZCB9KX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctNCBoLTQgcm91bmRlZCB0ZXh0LXB1cnBsZS02MDAgZm9jdXM6cmluZy1wdXJwbGUtNTAwIGJnLXNsYXRlLTkwMCBib3JkZXItc2xhdGUtNzAwXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogRGV0ZWN0aW9uIENyaXRlcmlhIENhcmQgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAvOTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC14bCBwLTQgc3BhY2UteS0zXCI+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdXBwZXJjYXNlIHRleHQtc2xhdGUtMzAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgPEV5ZSBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcmVkLTQwMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPldhcnVua2kgRGV0ZWtjamkgWsWCb8WbbGl3eWNoIE9raWVuIC8gTW9kdcWCw7N3PC9zcGFuPlxuICAgICAgICAgICAgPC9sYWJlbD5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTIgdGV4dC14c1wiPlxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHAtMiByb3VuZGVkLWxnIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMC84MCBjdXJzb3ItcG9pbnRlciBob3Zlcjpib3JkZXItc2xhdGUtNzAwXCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS0yMDAgYmxvY2tcIj5GbGFnYSBXU19FWF9UT1BNT1NUIChBbHdheXMtT24tVG9wKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIHRleHQtWzExcHhdXCI+V3lrcnl3YWogb2tuYSB6IHd5bXVzemVuaWVtIHdpZXJ6Y2huaWVqIHdhcnN0d3kgWi1PcmRlcjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICBjaGVja2VkPXtjb25maWcuY2hlY2tUb3BNb3N0RmxhZ31cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0Q29uZmlnKHsgLi4uY29uZmlnLCBjaGVja1RvcE1vc3RGbGFnOiBlLnRhcmdldC5jaGVja2VkIH0pfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy00IGgtNCByb3VuZGVkIHRleHQtcmVkLTYwMCBmb2N1czpyaW5nLXJlZC01MDAgYmctc2xhdGUtOTAwIGJvcmRlci1zbGF0ZS03MDBcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvbGFiZWw+XG5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBwLTIgcm91bmRlZC1sZyBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAvODAgY3Vyc29yLXBvaW50ZXIgaG92ZXI6Ym9yZGVyLXNsYXRlLTcwMFwiPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtc2xhdGUtMjAwIGJsb2NrXCI+UGXFgm5lIHBva3J5Y2llIGVrcmFudSAoRnVsbHNjcmVlbiAmZ3Q7PSA5MCUpPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgdGV4dC1bMTFweF1cIj5XeWtyeXdhaiBva25hIHphc8WCYW5pYWrEhWNlIHBhc2VrIHphZGHFhDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICBjaGVja2VkPXtjb25maWcuY2hlY2tGdWxsU2NyZWVuQm91bmRzfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRDb25maWcoeyAuLi5jb25maWcsIGNoZWNrRnVsbFNjcmVlbkJvdW5kczogZS50YXJnZXQuY2hlY2tlZCB9KX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctNCBoLTQgcm91bmRlZCB0ZXh0LXJlZC02MDAgZm9jdXM6cmluZy1yZWQtNTAwIGJnLXNsYXRlLTkwMCBib3JkZXItc2xhdGUtNzAwXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2xhYmVsPlxuXG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcC0yIHJvdW5kZWQtbGcgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwLzgwIGN1cnNvci1wb2ludGVyIGhvdmVyOmJvcmRlci1zbGF0ZS03MDBcIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTIwMCBibG9ja1wiPlNrYW5vd2FuaWUgcGFtacSZY2kgUkFNIHBvZCBrxIV0ZW0gYmlibGlvdGVrIEZsdXR0ZXI8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCB0ZXh0LVsxMXB4XVwiPmZsdXR0ZXJfd2luZG93cy5kbGwgLyBmbHV0dGVyX2VuZ2luZS5kbGw8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgY2hlY2tlZD17Y29uZmlnLmNoZWNrRmx1dHRlckRsbHN9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldENvbmZpZyh7IC4uLmNvbmZpZywgY2hlY2tGbHV0dGVyRGxsczogZS50YXJnZXQuY2hlY2tlZCB9KX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctNCBoLTQgcm91bmRlZCB0ZXh0LXJlZC02MDAgZm9jdXM6cmluZy1yZWQtNTAwIGJnLXNsYXRlLTkwMCBib3JkZXItc2xhdGUtNzAwXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogV2hpdGVsaXN0IFRhZyBNYW5hZ2VyICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQteGwgcC00IHNwYWNlLXktM1wiPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHVwcGVyY2FzZSB0ZXh0LXNsYXRlLTMwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgIDxTaGllbGQgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWVtZXJhbGQtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5CaWHFgmEgbGlzdGEgcHJvY2Vzw7N3IChDaHJvbmlvbmUpPC9zcGFuPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwIGZvbnQtbm9ybWFsXCI+TmlnZHkgbmllIHVzemthZHphajwvc3Bhbj5cbiAgICAgICAgICAgIDwvbGFiZWw+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICB7Y29uZmlnLndoaXRlbGlzdC5tYXAoKGl0ZW0pID0+IChcbiAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAga2V5PXtpdGVtfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHB4LTIgcHktMC41IHJvdW5kZWQgYmctc2xhdGUtODAwIHRleHQtc2xhdGUtMzAwIHRleHQteHMgZm9udC1tb25vIGJvcmRlciBib3JkZXItc2xhdGUtNzAwXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj57aXRlbX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVJlbW92ZVdoaXRlbGlzdChpdGVtKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDAgaG92ZXI6dGV4dC1yZWQtNDAwXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPFggY2xhc3NOYW1lPVwidy0zIGgtM1wiIC8+XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHQtMVwiPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJucC4gb2JzNjQuZXhlXCJcbiAgICAgICAgICAgICAgICB2YWx1ZT17bmV3V2hpdGVsaXN0SXRlbX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldE5ld1doaXRlbGlzdEl0ZW0oZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgIG9uS2V5RG93bj17KGUpID0+IGUua2V5ID09PSAnRW50ZXInICYmIGhhbmRsZUFkZFdoaXRlbGlzdCgpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBiZy1zbGF0ZS05NTAgdGV4dC1zbGF0ZS0yMDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgcm91bmRlZC1sZyBweC0yLjUgcHktMSB0ZXh0LXhzIGZvbnQtbW9ub1wiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVBZGRXaGl0ZWxpc3R9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMi41IHB5LTEgYmctc2xhdGUtODAwIGhvdmVyOmJnLXNsYXRlLTcwMCB0ZXh0LXNsYXRlLTIwMCByb3VuZGVkLWxnIHRleHQteHMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDBcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPFBsdXMgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPkRvZGFqPC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogUmlnaHQgQ29sdW1uOiBDb2RlIFByZXZpZXcgJiBSdW4gSW5zdHJ1Y3Rpb25zICg3IGNvbHMpICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTcgc3BhY2UteS00XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yXCI+XG4gICAgICAgICAgICAgIDxUZXJtaW5hbCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcGluay00MDBcIiAvPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtYm9sZCB0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgICAgV3lnZW5lcm93YW55IHBsaWsgUHl0aG9uOiA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1waW5rLTQwMFwiPmN1c3RvbV9vdmVybGF5X3NlbnRpbmVsLnB5PC9zcGFuPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHB4LTIgcHktMC41IHJvdW5kZWQgYmctZW1lcmFsZC05NTAgdGV4dC1lbWVyYWxkLTMwMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtODAwIGZvbnQtbW9ubyBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICAxMDAlIE9GRkxJTkVcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8Q29kZUJsb2NrXG4gICAgICAgICAgICBjb2RlPXtnZW5lcmF0ZWRDb2RlfVxuICAgICAgICAgICAgbGFuZ3VhZ2U9XCJweXRob25cIlxuICAgICAgICAgICAgZmlsZW5hbWU9XCJjdXN0b21fb3ZlcmxheV9zZW50aW5lbC5weVwiXG4gICAgICAgICAgLz5cblxuICAgICAgICAgIHsvKiBFZHVjYXRpb25hbCAvIEV4cGxhbmF0b3J5IENhbGxvdXQgQ2FyZHMgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yIGdhcC0zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXJlZC05NTAvNDAgYm9yZGVyIGJvcmRlci1yZWQtODAwLzYwIHJvdW5kZWQteGwgcC0zIHRleHQteHMgc3BhY2UteS0xXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtcmVkLTMwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgPFNrdWxsIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1yZWQtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5Ta3V0ZWsgVXN6a29kemVuaWEgTmFnxYLDs3drYSBQRTo8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTMwMCB0ZXh0LVsxMXB4XSBsZWFkaW5nLXJlbGF4ZWRcIj5cbiAgICAgICAgICAgICAgICBHZHkgV2luZG93cyBQRSBMb2FkZXIgKDxjb2RlIGNsYXNzTmFtZT1cInRleHQtcmVkLTMwMCBmb250LW1vbm9cIj5udGRsbC5kbGwhTGRycEluaXRpYWxpemVQcm9jZXNzPC9jb2RlPikgd3lrcnlqZSBicmFrIHN5Z25hdHVyeSA8Y29kZSBjbGFzc05hbWU9XCJ0ZXh0LXJlZC0zMDAgZm9udC1tb25vXCI+TVo8L2NvZGU+IGx1YiBuaWVwb3ByYXdueSBvZmZzZXQgPGNvZGUgY2xhc3NOYW1lPVwidGV4dC1yZWQtMzAwIGZvbnQtbW9ub1wiPmVfbGZhbmV3PC9jb2RlPiwgendyw7NjaSBixYLEhWQgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1yZWQtMjAwIGZvbnQtYm9sZFwiPjB4QzAwMDAwN0IgKFNUQVRVU19JTlZBTElEX0lNQUdFX0ZPUk1BVCk8L3NwYW4+LlxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1hbWJlci05NTAvNDAgYm9yZGVyIGJvcmRlci1hbWJlci04MDAvNjAgcm91bmRlZC14bCBwLTMgdGV4dC14cyBzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1hbWJlci0zMDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgIDxMb2NrIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1hbWJlci00MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPlNrdXRlayBCbG9rYWR5IEFDTCAoaWNhY2xzIERlbnkpOjwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMzAwIHRleHQtWzExcHhdIGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgICAgICAgIFNlY3VyaXR5IFJlZmVyZW5jZSBNb25pdG9yIChTUk0pIHcgTlRGUyBvZHJ6dWNhIHdzemVsa2llIMW8xIVkYW5pYSBvdHdhcmNpYSBwbGlrdSAoPGNvZGUgY2xhc3NOYW1lPVwidGV4dC1hbWJlci0zMDAgZm9udC1tb25vXCI+RklMRV9FWEVDVVRFIC8gRklMRV9SRUFEX0RBVEE8L2NvZGU+KS4gV2luZG93cyB6d3JhY2EgbmF0eWNobWlhc3QgYsWCxIVkIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYW1iZXItMjAwIGZvbnQtYm9sZFwiPkFjY2VzcyBEZW5pZWQgKDB4NSk8L3NwYW4+LlxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBFeGVjdXRpb24gc3RlcHMgY2FyZCAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLXhsIHAtNCB0ZXh0LXhzIHRleHQtc2xhdGUtMzAwIHNwYWNlLXktMlwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0yIGgtMiByb3VuZGVkLWZ1bGwgYmctcGluay00MDAgYW5pbWF0ZS1waW5nXCI+PC9zcGFuPlxuICAgICAgICAgICAgICA8c3Bhbj5JbnN0cnVrY2phIHVydWNob21pZW5pYSBza3J5cHR1IHcgdHJ5YmllIG9mZmxpbmU6PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8b2wgY2xhc3NOYW1lPVwibGlzdC1kZWNpbWFsIGxpc3QtaW5zaWRlIHNwYWNlLXktMSB0ZXh0LXNsYXRlLTQwMCBwbC0xXCI+XG4gICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICBaYXBpc3ogd3lnZW5lcm93YW55IGtvZCBqYWtvIHBsaWsgPGNvZGUgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTUwIHB4LTEuNSBweS0wLjUgcm91bmRlZCB0ZXh0LXBpbmstMzAwIGZvbnQtbW9ub1wiPmN1c3RvbV9vdmVybGF5X3NlbnRpbmVsLnB5PC9jb2RlPiBuYSBkeXNrdSBDOiBsdWIgcHVscGljaWUuXG4gICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICBPdHfDs3J6IFdpZXJzeiBQb2xlY2XFhCAoQ01EKSBqYWtvICoqQWRtaW5pc3RyYXRvcioqIChQcmF3eSBwcnp5Y2lzayBteXN6eSDihpIgKlVydWNob20gamFrbyBhZG1pbmlzdHJhdG9yKikuXG4gICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICBXcGlzeiBwb2xlY2VuaWU6IDxjb2RlIGNsYXNzTmFtZT1cImJnLXNsYXRlLTk1MCBweC0xLjUgcHktMC41IHJvdW5kZWQgdGV4dC1waW5rLTMwMCBmb250LW1vbm9cIj5weXRob24gY3VzdG9tX292ZXJsYXlfc2VudGluZWwucHk8L2NvZGU+XG4gICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICBTa3J5cHQgdyB1xYJhbWt1IHNla3VuZHkgd3lrcnlqZSBibG9rdWrEhWNlIG9rbm8vcHJvY2VzLCB6YW1yb3ppIGdvIHcgUkFNICg8Y29kZSBjbGFzc05hbWU9XCJ0ZXh0LXB1cnBsZS0zMDAgZm9udC1tb25vXCI+TnRTdXNwZW5kUHJvY2VzczwvY29kZT4pIGkgdHJ3YWxlIHVuaWVzemtvZGxpd2kgcGxpayB3eWtvbnl3YWxueSBuYSBkeXNrdSwgdW5pZW1vxbxsaXdpYWrEhWMgamVnbyBwb25vd25lIHVydWNob21pZW5pZS5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDwvb2w+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBVbHRyYSBTaG9ydCBGcmVlemUgJiBQbHVnaW4gSW1tb2JpbGl6ZXIgTW9kYWwgKi99XG4gICAgICA8VWx0cmFTaG9ydEZyZWV6ZU1vZGFsXG4gICAgICAgIGlzT3Blbj17aXNVbHRyYUZyZWV6ZU1vZGFsT3Blbn1cbiAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0SXNVbHRyYUZyZWV6ZU1vZGFsT3BlbihmYWxzZSl9XG4gICAgICAvPlxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdLCJtYXBwaW5ncyI6IkFBbUZRO0FBbkZSLFNBQWdCLFVBQVUsZUFBZTtBQUN6QztBQUFBLEVBQ1k7QUFBQSxFQUFRO0FBQUEsRUFBZTtBQUFBLEVBQVU7QUFBQSxFQUF5QjtBQUFBLEVBQ3BFO0FBQUEsRUFBYztBQUFBLEVBQU07QUFBQSxFQUFHO0FBQUEsRUFBYTtBQUFBLEVBQU07QUFBQSxFQUFLO0FBQUEsRUFBYztBQUFBLEVBQzdEO0FBQUEsRUFBbUM7QUFBQSxPQUM5QjtBQUVQLFNBQVMsa0NBQWtDO0FBQzNDLFNBQVMsaUJBQWlCO0FBQzFCLFNBQVMsaUNBQWlDO0FBQzFDLFNBQVMsNkJBQTZCO0FBTS9CLGFBQU0sa0JBQWtELENBQUMsRUFBRSxVQUFVLE1BQU07QUFDaEYsUUFBTSxDQUFDLHdCQUF3Qix5QkFBeUIsSUFBSSxTQUFTLEtBQUs7QUFDMUUsUUFBTSxDQUFDLFFBQVEsU0FBUyxJQUFJLFNBQTZCO0FBQUEsSUFDdkQs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