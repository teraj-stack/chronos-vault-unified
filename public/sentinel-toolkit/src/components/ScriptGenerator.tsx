import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-toolkit/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=019a4779"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-toolkit/node_modules/.vite/deps/react.js?v=019a4779"; const useState = __vite__cjsImport1_react["useState"]; const useMemo = __vite__cjsImport1_react["useMemo"];
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
} from "/sentinel-toolkit/node_modules/.vite/deps/lucide-react.js?v=6cbc5a0a";
import { generateCustomPythonScript } from "/sentinel-toolkit/src/utils/customScriptBuilder.ts";
import { CodeBlock } from "/sentinel-toolkit/src/components/CodeBlock.tsx";
import { downloadFullOfflineBundle } from "/sentinel-toolkit/src/utils/offlinePackageExporter.ts";
import { ScriptWritingStudio } from "/sentinel-toolkit/src/components/ScriptWritingStudio.tsx";
export const ScriptGenerator = ({ initialOS }) => {
  const [subTab, setSubTab] = useState("studio");
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
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: downloadFullOfflineBundle,
              className: "flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-purple-700 to-pink-700 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg text-xs font-semibold shadow-lg transition-all",
              children: [
                /* @__PURE__ */ jsxDEV(Download, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 107,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Pobierz Pakiet (.bat + .py)" }, void 0, false, {
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
            "select",
            {
              value: config.os,
              onChange: (e) => setConfig({ ...config, os: e.target.value }),
              className: "bg-slate-950 text-slate-200 border border-slate-700 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:border-purple-500",
              children: [
                /* @__PURE__ */ jsxDEV("option", { value: "windows", children: "Windows 10 / 11" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 115,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: "linux", children: "Linux (X11 / Wayland)" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 116,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: "macos", children: "macOS" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 117,
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
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 pt-4 mt-4 border-t border-slate-800", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setSubTab("studio"),
            className: `px-4 py-2 rounded-xl text-xs font-black font-mono flex items-center gap-2 cursor-pointer transition-all ${subTab === "studio" ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg shadow-purple-950/50" : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"}`,
            children: [
              /* @__PURE__ */ jsxDEV(FileCode2, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 132,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Studio Pisania Skryptów & Narzędzia Wypierania Gnid" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 133,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] bg-pink-950 text-pink-300 px-1.5 py-0.5 rounded border border-pink-700", children: "NOWE" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 134,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/ScriptGenerator.tsx",
            lineNumber: 124,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setSubTab("generator"),
            className: `px-4 py-2 rounded-xl text-xs font-bold font-mono flex items-center gap-2 cursor-pointer transition-all ${subTab === "generator" ? "bg-purple-600 text-white shadow-lg shadow-purple-950/50" : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"}`,
            children: [
              /* @__PURE__ */ jsxDEV(Sliders, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 145,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Kreator Parametryczny & Generator PE Sabotage" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 146,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/ScriptGenerator.tsx",
            lineNumber: 137,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ScriptGenerator.tsx",
        lineNumber: 123,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ScriptGenerator.tsx",
      lineNumber: 83,
      columnNumber: 7
    }, this),
    subTab === "studio" ? /* @__PURE__ */ jsxDEV(ScriptWritingStudio, {}, void 0, false, {
      fileName: "/app/applet/src/components/ScriptGenerator.tsx",
      lineNumber: 152,
      columnNumber: 9
    }, this) : (
      /* Two Column Layout: Options and Generated Code */
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-5 space-y-5", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "text-xs font-bold uppercase text-slate-300 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxDEV(Zap, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 162,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Główna Metoda Reakcji & Neutralizacji" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 163,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 161,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-purple-400 font-mono font-bold", children: "TAKTYKA OBRONNA" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 165,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 160,
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
                          lineNumber: 181,
                          columnNumber: 21
                        }, this),
                        "★ HYBRYDOWY SABOTAŻ (PE Corrupt + ACL Deny + IFEO)"
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                        lineNumber: 180,
                        columnNumber: 19
                      }, this),
                      config.action === "hybrid_sabotage" && /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] bg-purple-500/30 text-purple-300 px-2 py-0.5 rounded font-mono font-bold", children: "MAKSYMALNA OCHRONA" }, void 0, false, {
                        fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                        lineNumber: 185,
                        columnNumber: 21
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                      lineNumber: 179,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] text-purple-300/80 mt-1.5 leading-relaxed", children: "Najwyższy poziom restrykcji: natychmiastowe zamrożenie w RAM, fizyczne zniszczenie nagłówka PE pliku na dysku, zerwanie dziedziczenia ACL i blokada rejestru IFEO." }, void 0, false, {
                      fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                      lineNumber: 190,
                      columnNumber: 17
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 170,
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
                          lineNumber: 207,
                          columnNumber: 21
                        }, this),
                        "💥 Trwałe Uszkodzenie Nagłówka PE (DOS & NT Header Corruption)"
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                        lineNumber: 206,
                        columnNumber: 19
                      }, this),
                      config.action === "corrupt_pe" && /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-red-400" }, void 0, false, {
                        fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                        lineNumber: 210,
                        columnNumber: 54
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                      lineNumber: 205,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] text-red-300/80 mt-1", children: [
                      "Nadpisuje bajty sygnatury ",
                      /* @__PURE__ */ jsxDEV("code", { className: "bg-red-950/80 px-1 rounded font-mono", children: "MZ" }, void 0, false, {
                        fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                        lineNumber: 213,
                        columnNumber: 45
                      }, this),
                      " (0x5A4D) i nagłówka PE zerami. Windows odrzuca plik z błędem ",
                      /* @__PURE__ */ jsxDEV("span", { className: "text-amber-300 font-mono", children: "0xC000007B (STATUS_INVALID_IMAGE_FORMAT)" }, void 0, false, {
                        fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                        lineNumber: 213,
                        columnNumber: 171
                      }, this),
                      "."
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                      lineNumber: 212,
                      columnNumber: 17
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 196,
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
                          lineNumber: 229,
                          columnNumber: 21
                        }, this),
                        "🔒 Blokada ACL (DACL Lockout / icacls /deny Everyone)"
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                        lineNumber: 228,
                        columnNumber: 19
                      }, this),
                      config.action === "acl_lockout" && /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-amber-400" }, void 0, false, {
                        fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                        lineNumber: 232,
                        columnNumber: 55
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                      lineNumber: 227,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] text-amber-300/80 mt-1", children: [
                      "Odina wszelkie prawa (Execute, Read, Write) grupie Wszyscy (",
                      /* @__PURE__ */ jsxDEV("code", { className: "bg-amber-950/80 px-1 rounded font-mono", children: "*S-1-1-0" }, void 0, false, {
                        fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                        lineNumber: 235,
                        columnNumber: 79
                      }, this),
                      "). Próba uruchomienia kończy się ",
                      /* @__PURE__ */ jsxDEV("span", { className: "text-amber-300 font-mono", children: "Access Denied (Błąd 5)" }, void 0, false, {
                        fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                        lineNumber: 235,
                        columnNumber: 184
                      }, this),
                      "."
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                      lineNumber: 234,
                      columnNumber: 17
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 218,
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
                          lineNumber: 251,
                          columnNumber: 21
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { children: "Kwarantanna Pliku" }, void 0, false, {
                          fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                          lineNumber: 252,
                          columnNumber: 21
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                        lineNumber: 250,
                        columnNumber: 19
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400 mt-0.5", children: "Zmiana nazwy na .quarantine" }, void 0, false, {
                        fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                        lineNumber: 254,
                        columnNumber: 19
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                    lineNumber: 241,
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
                          lineNumber: 267,
                          columnNumber: 21
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { children: "Zwykły Kill (SIGKILL)" }, void 0, false, {
                          fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                          lineNumber: 268,
                          columnNumber: 21
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                        lineNumber: 266,
                        columnNumber: 19
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400 mt-0.5", children: "Natychmiastowe zabicie" }, void 0, false, {
                        fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                        lineNumber: 270,
                        columnNumber: 19
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                    lineNumber: 257,
                    columnNumber: 17
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 240,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 168,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptGenerator.tsx",
            lineNumber: 159,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "text-xs font-bold uppercase text-slate-300 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxDEV(FileCode2, { className: "w-4 h-4 text-pink-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 280,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Parametry Sabotażu Binarnego (PE & ACL)" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 281,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 279,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-pink-400 font-mono", children: "WIN32 INTERNALS" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 283,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 278,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-2.5 text-xs", children: [
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-slate-300 font-medium block mb-1", children: "Metoda uszkodzenia struktury Portable Executable (PE):" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 288,
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
                        lineNumber: 301,
                        columnNumber: 19
                      }, this),
                      /* @__PURE__ */ jsxDEV("option", { value: "wipe_first_1kb", children: "Całkowite wyzerowanie pierwszych 1024 bajtów nagłówka (\\\\x00 * 1024)" }, void 0, false, {
                        fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                        lineNumber: 304,
                        columnNumber: 19
                      }, this),
                      /* @__PURE__ */ jsxDEV("option", { value: "random_urandom", children: "Kryptograficzne nadpisanie losowymi śmieciami (os.urandom 2048 bajtów)" }, void 0, false, {
                        fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                        lineNumber: 307,
                        columnNumber: 19
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                    lineNumber: 291,
                    columnNumber: 17
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 287,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("label", { className: "flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 cursor-pointer hover:border-slate-700", children: [
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-slate-200 block", children: "Zerwanie dziedziczenia ACL (/inheritance:r)" }, void 0, false, {
                    fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                    lineNumber: 315,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 text-[11px]", children: "Odłącza plik od uprawnień nadrzędnego folderu (C:\\\\Users\\\\...)" }, void 0, false, {
                    fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                    lineNumber: 316,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 314,
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
                    lineNumber: 318,
                    columnNumber: 17
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 313,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("label", { className: "flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 cursor-pointer hover:border-slate-700", children: [
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-slate-200 block", children: "Blokada ponownego startu w Rejestrze (IFEO)" }, void 0, false, {
                    fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                    lineNumber: 328,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 text-[11px]", children: "Image File Execution Options przekierowuje start na atrapę" }, void 0, false, {
                    fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                    lineNumber: 329,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 327,
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
                    lineNumber: 331,
                    columnNumber: 17
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 326,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 286,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptGenerator.tsx",
            lineNumber: 277,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "text-xs font-bold uppercase text-slate-300 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxDEV(Eye, { className: "w-4 h-4 text-red-400" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 344,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Warunki Detekcji Złośliwych Okien / Modułów" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 345,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 343,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 text-xs", children: [
              /* @__PURE__ */ jsxDEV("label", { className: "flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80 cursor-pointer hover:border-slate-700", children: [
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-slate-200 block", children: "Flaga WS_EX_TOPMOST (Always-On-Top)" }, void 0, false, {
                    fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                    lineNumber: 351,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 text-[11px]", children: "Wykrywaj okna z wymuszeniem wierzchniej warstwy Z-Order" }, void 0, false, {
                    fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                    lineNumber: 352,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 350,
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
                    lineNumber: 354,
                    columnNumber: 17
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 349,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("label", { className: "flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80 cursor-pointer hover:border-slate-700", children: [
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-slate-200 block", children: "Pełne pokrycie ekranu (Fullscreen >= 90%)" }, void 0, false, {
                    fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                    lineNumber: 364,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 text-[11px]", children: "Wykrywaj okna zasłaniające pasek zadań" }, void 0, false, {
                    fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                    lineNumber: 365,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 363,
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
                    lineNumber: 367,
                    columnNumber: 17
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 362,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("label", { className: "flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80 cursor-pointer hover:border-slate-700", children: [
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-slate-200 block", children: "Skanowanie pamięci RAM pod kątem bibliotek Flutter" }, void 0, false, {
                    fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                    lineNumber: 377,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 text-[11px]", children: "flutter_windows.dll / flutter_engine.dll" }, void 0, false, {
                    fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                    lineNumber: 378,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 376,
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
                    lineNumber: 380,
                    columnNumber: 17
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 375,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 348,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptGenerator.tsx",
            lineNumber: 342,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "text-xs font-bold uppercase text-slate-300 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxDEV(Shield, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 394,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Biała lista procesów (Chronione)" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 395,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 393,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] text-slate-400 font-normal", children: "Nigdy nie uszkadzaj" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 397,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 392,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap gap-1.5", children: config.whitelist.map((item) => /* @__PURE__ */ jsxDEV(
              "span",
              {
                className: "inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700",
                children: [
                  /* @__PURE__ */ jsxDEV("span", { children: item }, void 0, false, {
                    fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                    lineNumber: 406,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => handleRemoveWhitelist(item),
                      className: "text-slate-500 hover:text-red-400",
                      children: /* @__PURE__ */ jsxDEV(X, { className: "w-3 h-3" }, void 0, false, {
                        fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                        lineNumber: 411,
                        columnNumber: 21
                      }, this)
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                      lineNumber: 407,
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
                lineNumber: 402,
                columnNumber: 17
              },
              this
            )) }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 400,
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
                  lineNumber: 418,
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
                      lineNumber: 430,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "Dodaj" }, void 0, false, {
                      fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                      lineNumber: 431,
                      columnNumber: 17
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 426,
                  columnNumber: 15
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 417,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptGenerator.tsx",
            lineNumber: 391,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScriptGenerator.tsx",
          lineNumber: 157,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-7 space-y-4", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsxDEV(Terminal, { className: "w-4 h-4 text-pink-400" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 441,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-sm font-bold text-white", children: [
                "Wygenerowany plik Python: ",
                /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-pink-400", children: "custom_overlay_sentinel.py" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 443,
                  columnNumber: 43
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 442,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 440,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5", children: /* @__PURE__ */ jsxDEV("span", { className: "text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono font-bold", children: "100% OFFLINE" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 447,
              columnNumber: 15
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 446,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptGenerator.tsx",
            lineNumber: 439,
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
              lineNumber: 453,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "bg-red-950/40 border border-red-800/60 rounded-xl p-3 text-xs space-y-1", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "font-bold text-red-300 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxDEV(Skull, { className: "w-4 h-4 text-red-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 463,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Skutek Uszkodzenia Nagłówka PE:" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 464,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 462,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-slate-300 text-[11px] leading-relaxed", children: [
                "Gdy Windows PE Loader (",
                /* @__PURE__ */ jsxDEV("code", { className: "text-red-300 font-mono", children: "ntdll.dll!LdrpInitializeProcess" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 467,
                  columnNumber: 40
                }, this),
                ") wykryje brak sygnatury ",
                /* @__PURE__ */ jsxDEV("code", { className: "text-red-300 font-mono", children: "MZ" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 467,
                  columnNumber: 144
                }, this),
                " lub niepoprawny offset ",
                /* @__PURE__ */ jsxDEV("code", { className: "text-red-300 font-mono", children: "e_lfanew" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 467,
                  columnNumber: 218
                }, this),
                ", zwróci błąd ",
                /* @__PURE__ */ jsxDEV("span", { className: "text-red-200 font-bold", children: "0xC000007B (STATUS_INVALID_IMAGE_FORMAT)" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 467,
                  columnNumber: 288
                }, this),
                "."
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 466,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 461,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "bg-amber-950/40 border border-amber-800/60 rounded-xl p-3 text-xs space-y-1", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "font-bold text-amber-300 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxDEV(Lock, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 473,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Skutek Blokady ACL (icacls Deny):" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 474,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 472,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-slate-300 text-[11px] leading-relaxed", children: [
                "Security Reference Monitor (SRM) w NTFS odrzuca wszelkie żądania otwarcia pliku (",
                /* @__PURE__ */ jsxDEV("code", { className: "text-amber-300 font-mono", children: "FILE_EXECUTE / FILE_READ_DATA" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 477,
                  columnNumber: 98
                }, this),
                "). Windows zwraca natychmiast błąd ",
                /* @__PURE__ */ jsxDEV("span", { className: "text-amber-200 font-bold", children: "Access Denied (0x5)" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 477,
                  columnNumber: 212
                }, this),
                "."
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 476,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 471,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptGenerator.tsx",
            lineNumber: 460,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/90 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 space-y-2", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "font-semibold text-white flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-pink-400 animate-ping" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 485,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Instrukcja uruchomienia skryptu w trybie offline:" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 486,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 484,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("ol", { className: "list-decimal list-inside space-y-1 text-slate-400 pl-1", children: [
              /* @__PURE__ */ jsxDEV("li", { children: [
                "Zapisz wygenerowany kod jako plik ",
                /* @__PURE__ */ jsxDEV("code", { className: "bg-slate-950 px-1.5 py-0.5 rounded text-pink-300 font-mono", children: "custom_overlay_sentinel.py" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 490,
                  columnNumber: 51
                }, this),
                " na dysku C: lub pulpicie."
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 489,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("li", { children: "Otwórz Wiersz Poleceń (CMD) jako **Administrator** (Prawy przycisk myszy → *Uruchom jako administrator*)." }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 492,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("li", { children: [
                "Wpisz polecenie: ",
                /* @__PURE__ */ jsxDEV("code", { className: "bg-slate-950 px-1.5 py-0.5 rounded text-pink-300 font-mono", children: "python custom_overlay_sentinel.py" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 496,
                  columnNumber: 34
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 495,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("li", { children: [
                "Skrypt w ułamku sekundy wykryje blokujące okno/proces, zamrozi go w RAM (",
                /* @__PURE__ */ jsxDEV("code", { className: "text-purple-300 font-mono", children: "NtSuspendProcess" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                  lineNumber: 499,
                  columnNumber: 90
                }, this),
                ") i trwale unieszkodliwi plik wykonywalny na dysku, uniemożliwiając jego ponowne uruchomienie."
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScriptGenerator.tsx",
                lineNumber: 498,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScriptGenerator.tsx",
              lineNumber: 488,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptGenerator.tsx",
            lineNumber: 483,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScriptGenerator.tsx",
          lineNumber: 438,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ScriptGenerator.tsx",
        lineNumber: 155,
        columnNumber: 9
      }, this)
    )
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/ScriptGenerator.tsx",
    lineNumber: 81,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNjcmlwdEdlbmVyYXRvci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VNZW1vIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgXG4gIFNldHRpbmdzLCBTaGllbGQsIFNsaWRlcnMsIFBsYXksIFRlcm1pbmFsLCBEb3dubG9hZCwgU3BhcmtsZXMsIENwdSwgRXllLCBcbiAgWmFwLCBWb2x1bWUyLCBQbHVzLCBYLCBTaGllbGRBbGVydCwgTG9jaywgQmFuLCBTa3VsbCwgRmlsZVgsIEtleVJvdW5kLCBcbiAgRmxhbWUsIENoZWNrQ2lyY2xlLCBBbGVydFRyaWFuZ2xlLCBGaWxlQ29kZTIsIExheWVyc1xufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgU2NyaXB0T3B0aW9uQ29uZmlnLCBPU1R5cGUsIEFjdGlvblR5cGUgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBnZW5lcmF0ZUN1c3RvbVB5dGhvblNjcmlwdCB9IGZyb20gJy4uL3V0aWxzL2N1c3RvbVNjcmlwdEJ1aWxkZXInO1xuaW1wb3J0IHsgQ29kZUJsb2NrIH0gZnJvbSAnLi9Db2RlQmxvY2snO1xuaW1wb3J0IHsgZG93bmxvYWRGdWxsT2ZmbGluZUJ1bmRsZSB9IGZyb20gJy4uL3V0aWxzL29mZmxpbmVQYWNrYWdlRXhwb3J0ZXInO1xuaW1wb3J0IHsgU2NyaXB0V3JpdGluZ1N0dWRpbyB9IGZyb20gJy4vU2NyaXB0V3JpdGluZ1N0dWRpbyc7XG5cbmludGVyZmFjZSBTY3JpcHRHZW5lcmF0b3JQcm9wcyB7XG4gIGluaXRpYWxPUzogT1NUeXBlO1xufVxuXG5leHBvcnQgY29uc3QgU2NyaXB0R2VuZXJhdG9yOiBSZWFjdC5GQzxTY3JpcHRHZW5lcmF0b3JQcm9wcz4gPSAoeyBpbml0aWFsT1MgfSkgPT4ge1xuICBjb25zdCBbc3ViVGFiLCBzZXRTdWJUYWJdID0gdXNlU3RhdGU8J2dlbmVyYXRvcicgfCAnc3R1ZGlvJz4oJ3N0dWRpbycpO1xuICBjb25zdCBbY29uZmlnLCBzZXRDb25maWddID0gdXNlU3RhdGU8U2NyaXB0T3B0aW9uQ29uZmlnPih7XG4gICAgb3M6IGluaXRpYWxPUyB8fCAnd2luZG93cycsXG4gICAgYWN0aW9uOiAnaHlicmlkX3NhYm90YWdlJyxcbiAgICBwb2xsSW50ZXJ2YWxNczogMzAwLFxuICAgIGNoZWNrRmx1dHRlckRsbHM6IHRydWUsXG4gICAgY2hlY2tGdWxsU2NyZWVuQm91bmRzOiB0cnVlLFxuICAgIGNoZWNrVG9wTW9zdEZsYWc6IHRydWUsXG4gICAgaG90a2V5OiAnY3RybCthbHQraycsXG4gICAgd2hpdGVsaXN0OiBbJ2V4cGxvcmVyLmV4ZScsICd0YXNrbWdyLmV4ZScsICdkaXNjb3JkLmV4ZScsICdjaHJvbWUuZXhlJywgJ2NvZGUuZXhlJ10sXG4gICAgcHJvY2Vzc0tleXdvcmRzOiBbJ2ZsdXR0ZXInLCAnZmx1dHRlcl9ydW5uZXInLCAnZGFydC5leGUnXSxcbiAgICBwbGF5QWxlcnRTb3VuZDogdHJ1ZSxcbiAgICBsb2dUb0NvbnNvbGU6IHRydWUsXG4gICAgcnVuQXNEYWVtb246IGZhbHNlLFxuICAgIGVuYWJsZUZpbGVRdWFyYW50aW5lOiB0cnVlLFxuICAgIGVuYWJsZUlmZW9CbG9jazogdHJ1ZSxcbiAgICBwZUNvcnJ1cHRpb25NZXRob2Q6ICd6ZXJvX216X2FuZF9wZScsXG4gICAgYWNsSW5oZXJpdGFuY2VSZW1vdmFsOiB0cnVlLFxuICAgIGFjbERlbnlGdWxsQ29udHJvbDogdHJ1ZSxcbiAgfSk7XG5cbiAgY29uc3QgW25ld1doaXRlbGlzdEl0ZW0sIHNldE5ld1doaXRlbGlzdEl0ZW1dID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbbmV3S2V5d29yZEl0ZW0sIHNldE5ld0tleXdvcmRJdGVtXSA9IHVzZVN0YXRlKCcnKTtcblxuICBjb25zdCBnZW5lcmF0ZWRDb2RlID0gdXNlTWVtbygoKSA9PiB7XG4gICAgcmV0dXJuIGdlbmVyYXRlQ3VzdG9tUHl0aG9uU2NyaXB0KGNvbmZpZyk7XG4gIH0sIFtjb25maWddKTtcblxuICBjb25zdCBoYW5kbGVBZGRXaGl0ZWxpc3QgPSAoKSA9PiB7XG4gICAgaWYgKG5ld1doaXRlbGlzdEl0ZW0udHJpbSgpICYmICFjb25maWcud2hpdGVsaXN0LmluY2x1ZGVzKG5ld1doaXRlbGlzdEl0ZW0udHJpbSgpLnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgICBzZXRDb25maWcoe1xuICAgICAgICAuLi5jb25maWcsXG4gICAgICAgIHdoaXRlbGlzdDogWy4uLmNvbmZpZy53aGl0ZWxpc3QsIG5ld1doaXRlbGlzdEl0ZW0udHJpbSgpLnRvTG93ZXJDYXNlKCldLFxuICAgICAgfSk7XG4gICAgICBzZXROZXdXaGl0ZWxpc3RJdGVtKCcnKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUmVtb3ZlV2hpdGVsaXN0ID0gKGl0ZW06IHN0cmluZykgPT4ge1xuICAgIHNldENvbmZpZyh7XG4gICAgICAuLi5jb25maWcsXG4gICAgICB3aGl0ZWxpc3Q6IGNvbmZpZy53aGl0ZWxpc3QuZmlsdGVyKCh3KSA9PiB3ICE9PSBpdGVtKSxcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVBZGRLZXl3b3JkID0gKCkgPT4ge1xuICAgIGlmIChuZXdLZXl3b3JkSXRlbS50cmltKCkgJiYgIWNvbmZpZy5wcm9jZXNzS2V5d29yZHMuaW5jbHVkZXMobmV3S2V5d29yZEl0ZW0udHJpbSgpLnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgICBzZXRDb25maWcoe1xuICAgICAgICAuLi5jb25maWcsXG4gICAgICAgIHByb2Nlc3NLZXl3b3JkczogWy4uLmNvbmZpZy5wcm9jZXNzS2V5d29yZHMsIG5ld0tleXdvcmRJdGVtLnRyaW0oKS50b0xvd2VyQ2FzZSgpXSxcbiAgICAgIH0pO1xuICAgICAgc2V0TmV3S2V5d29yZEl0ZW0oJycpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVSZW1vdmVLZXl3b3JkID0gKGl0ZW06IHN0cmluZykgPT4ge1xuICAgIHNldENvbmZpZyh7XG4gICAgICAuLi5jb25maWcsXG4gICAgICBwcm9jZXNzS2V5d29yZHM6IGNvbmZpZy5wcm9jZXNzS2V5d29yZHMuZmlsdGVyKChrKSA9PiBrICE9PSBpdGVtKSxcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS02XCI+XG4gICAgICB7LyogSGVhZGVyIEJhbm5lciAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQtMnhsIHAtNiBzaGFkb3cteGwgcmVsYXRpdmUgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgLXJpZ2h0LTEwIC1ib3R0b20tMTAgdy00OCBoLTQ4IGJnLXB1cnBsZS02MDAvMTAgcm91bmRlZC1mdWxsIGJsdXItM3hsIHBvaW50ZXItZXZlbnRzLW5vbmVcIiAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgbWQ6ZmxleC1yb3cgaXRlbXMtc3RhcnQgbWQ6aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNFwiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMiB0ZXh0LXB1cnBsZS00MDAgdGV4dC14cyB1cHBlcmNhc2UgZm9udC1ib2xkIHRyYWNraW5nLXdpZGVyIG1iLTFcIj5cbiAgICAgICAgICAgICAgPFNsaWRlcnMgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPkludGVyYWt0eXdueSBHZW5lcmF0b3IgS29kdSBQeXRob24gKDEwMCUgT0ZGTElORSk8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LXhsIHNtOnRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgIDxzcGFuPkdlbmVyYXRvciBTa3J5cHTDs3c6IFVzemtvZHplbmllIFBFICYgQmxva2FkYSBBQ0w8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgcHgtMi41IHB5LTAuNSByb3VuZGVkLWZ1bGwgYmctcmVkLTk1MCB0ZXh0LXJlZC0zMDAgYm9yZGVyIGJvcmRlci1yZWQtODAwIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgIFBFIFNhYm90YWdlIFJlYWR5XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtc2xhdGUtNDAwIG10LTEgbWF4LXctMnhsXCI+XG4gICAgICAgICAgICAgIFd5Z2VuZXJ1aiBza3J5cHQgUHl0aG9uYSBpbXBsZW1lbnR1asSFY3kgKip0cndhxYJlIHVzemtvZHplbmllIG5hZ8WCw7N3a2EgUEUgKHplcm93YW5pZSBzeWduYXR1cnkgTVovUEUpKiosICoqcGFuY2VybsSFIGJsb2thZMSZIEFDTCAoYGljYWNscyAvaW5oZXJpdGFuY2U6ciAvZGVueSBFdmVyeW9uZWApKiogb3JheiB6YW1yYcW8YW5pZSB3IFJBTSAoPGNvZGUgY2xhc3NOYW1lPVwidGV4dC1wdXJwbGUtNDAwIGZvbnQtbW9ub1wiPk50U3VzcGVuZFByb2Nlc3M8L2NvZGU+KS5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0zXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2Rvd25sb2FkRnVsbE9mZmxpbmVCdW5kbGV9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgcHgtMyBweS0yIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1wdXJwbGUtNzAwIHRvLXBpbmstNzAwIGhvdmVyOmZyb20tcHVycGxlLTYwMCBob3Zlcjp0by1waW5rLTYwMCB0ZXh0LXdoaXRlIHJvdW5kZWQtbGcgdGV4dC14cyBmb250LXNlbWlib2xkIHNoYWRvdy1sZyB0cmFuc2l0aW9uLWFsbFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxEb3dubG9hZCBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+UG9iaWVyeiBQYWtpZXQgKC5iYXQgKyAucHkpPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgIHZhbHVlPXtjb25maWcub3N9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0Q29uZmlnKHsgLi4uY29uZmlnLCBvczogZS50YXJnZXQudmFsdWUgYXMgT1NUeXBlIH0pfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZy1zbGF0ZS05NTAgdGV4dC1zbGF0ZS0yMDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgcm91bmRlZC1sZyBweC0zIHB5LTIgdGV4dC14cyBmb250LXNlbWlib2xkIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItcHVycGxlLTUwMFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJ3aW5kb3dzXCI+V2luZG93cyAxMCAvIDExPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJsaW51eFwiPkxpbnV4IChYMTEgLyBXYXlsYW5kKTwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwibWFjb3NcIj5tYWNPUzwvb3B0aW9uPlxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBTdWItdGFiIE5hdmlnYXRpb246IFN0dWRpbyBQaXNhbmlhIFNrcnlwdMOzdyB2cyBLcmVhdG9yICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMiBwdC00IG10LTQgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFN1YlRhYignc3R1ZGlvJyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BweC00IHB5LTIgcm91bmRlZC14bCB0ZXh0LXhzIGZvbnQtYmxhY2sgZm9udC1tb25vIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGN1cnNvci1wb2ludGVyIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgIHN1YlRhYiA9PT0gJ3N0dWRpbydcbiAgICAgICAgICAgICAgICA/ICdiZy1ncmFkaWVudC10by1yIGZyb20tcGluay02MDAgdG8tcHVycGxlLTYwMCB0ZXh0LXdoaXRlIHNoYWRvdy1sZyBzaGFkb3ctcHVycGxlLTk1MC81MCdcbiAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05NTAgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxGaWxlQ29kZTIgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5TdHVkaW8gUGlzYW5pYSBTa3J5cHTDs3cgJiBOYXJ6xJlkemlhIFd5cGllcmFuaWEgR25pZDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzlweF0gYmctcGluay05NTAgdGV4dC1waW5rLTMwMCBweC0xLjUgcHktMC41IHJvdW5kZWQgYm9yZGVyIGJvcmRlci1waW5rLTcwMFwiPk5PV0U8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTdWJUYWIoJ2dlbmVyYXRvcicpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtNCBweS0yIHJvdW5kZWQteGwgdGV4dC14cyBmb250LWJvbGQgZm9udC1tb25vIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGN1cnNvci1wb2ludGVyIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgIHN1YlRhYiA9PT0gJ2dlbmVyYXRvcidcbiAgICAgICAgICAgICAgICA/ICdiZy1wdXJwbGUtNjAwIHRleHQtd2hpdGUgc2hhZG93LWxnIHNoYWRvdy1wdXJwbGUtOTUwLzUwJ1xuICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTk1MCB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlIGJvcmRlciBib3JkZXItc2xhdGUtODAwJ1xuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPFNsaWRlcnMgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5LcmVhdG9yIFBhcmFtZXRyeWN6bnkgJiBHZW5lcmF0b3IgUEUgU2Fib3RhZ2U8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHtzdWJUYWIgPT09ICdzdHVkaW8nID8gKFxuICAgICAgICA8U2NyaXB0V3JpdGluZ1N0dWRpbyAvPlxuICAgICAgKSA6IChcbiAgICAgICAgLyogVHdvIENvbHVtbiBMYXlvdXQ6IE9wdGlvbnMgYW5kIEdlbmVyYXRlZCBDb2RlICovXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBsZzpncmlkLWNvbHMtMTIgZ2FwLTZcIj5cbiAgICAgICAgey8qIExlZnQgQ29sdW1uOiBDb25maWcgUGFuZWwgKDUgY29scykgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tNSBzcGFjZS15LTVcIj5cbiAgICAgICAgICB7LyogQWN0aW9uIE1vZGUgQ2FyZCAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLXhsIHAtNCBzcGFjZS15LTNcIj5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB1cHBlcmNhc2UgdGV4dC1zbGF0ZS0zMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICA8WmFwIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1wdXJwbGUtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5HxYLDs3duYSBNZXRvZGEgUmVha2NqaSAmIE5ldXRyYWxpemFjamk8L3NwYW4+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1wdXJwbGUtNDAwIGZvbnQtbW9ubyBmb250LWJvbGRcIj5UQUtUWUtBIE9CUk9OTkE8L3NwYW4+XG4gICAgICAgICAgICA8L2xhYmVsPlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxuICAgICAgICAgICAgICB7LyogSFlCUllET1dZIFBBTkNFUk5ZIFNBQk9UQcW7ICovfVxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0Q29uZmlnKHsgLi4uY29uZmlnLCBhY3Rpb246ICdoeWJyaWRfc2Fib3RhZ2UnIH0pfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCBwLTMgcm91bmRlZC14bCB0ZXh0LWxlZnQgYm9yZGVyIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICBjb25maWcuYWN0aW9uID09PSAnaHlicmlkX3NhYm90YWdlJ1xuICAgICAgICAgICAgICAgICAgICA/ICdiZy1ncmFkaWVudC10by1iciBmcm9tLXB1cnBsZS05NTAvOTAgdG8tcmVkLTk1MC84MCBib3JkZXItcHVycGxlLTQwMCB0ZXh0LXB1cnBsZS0xMDAgc2hhZG93LWxnIHNoYWRvdy1wdXJwbGUtOTUwLzUwIHJpbmctMSByaW5nLXB1cnBsZS00MDAvNTAnXG4gICAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTk1MCBib3JkZXItc2xhdGUtODAwIHRleHQtc2xhdGUtNDAwIGhvdmVyOmJvcmRlci1zbGF0ZS03MDAnXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LXB1cnBsZS0yMDBcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgPEZsYW1lIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1waW5rLTQwMCBhbmltYXRlLXB1bHNlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAg4piFIEhZQlJZRE9XWSBTQUJPVEHFuyAoUEUgQ29ycnVwdCArIEFDTCBEZW55ICsgSUZFTylcbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIHtjb25maWcuYWN0aW9uID09PSAnaHlicmlkX3NhYm90YWdlJyAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGJnLXB1cnBsZS01MDAvMzAgdGV4dC1wdXJwbGUtMzAwIHB4LTIgcHktMC41IHJvdW5kZWQgZm9udC1tb25vIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgICAgIE1BS1NZTUFMTkEgT0NIUk9OQVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1wdXJwbGUtMzAwLzgwIG10LTEuNSBsZWFkaW5nLXJlbGF4ZWRcIj5cbiAgICAgICAgICAgICAgICAgIE5hand5xbxzenkgcG96aW9tIHJlc3RyeWtjamk6IG5hdHljaG1pYXN0b3dlIHphbXJvxbxlbmllIHcgUkFNLCBmaXp5Y3puZSB6bmlzemN6ZW5pZSBuYWfFgsOzd2thIFBFIHBsaWt1IG5hIGR5c2t1LCB6ZXJ3YW5pZSBkemllZHppY3plbmlhIEFDTCBpIGJsb2thZGEgcmVqZXN0cnUgSUZFTy5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgey8qIFRSV0HFgUUgVVNaS09EWkVOSUUgTkFHxYHDk1dLQSBQRSAqL31cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldENvbmZpZyh7IC4uLmNvbmZpZywgYWN0aW9uOiAnY29ycnVwdF9wZScgfSl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy1mdWxsIHAtMyByb3VuZGVkLXhsIHRleHQtbGVmdCBib3JkZXIgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgICAgIGNvbmZpZy5hY3Rpb24gPT09ICdjb3JydXB0X3BlJ1xuICAgICAgICAgICAgICAgICAgICA/ICdiZy1yZWQtOTUwLzgwIGJvcmRlci1yZWQtNTAwIHRleHQtcmVkLTEwMCBzaGFkb3ctbWQgc2hhZG93LXJlZC05NTAvNDAgcmluZy0xIHJpbmctcmVkLTUwMC80MCdcbiAgICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTUwIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS00MDAgaG92ZXI6Ym9yZGVyLXNsYXRlLTcwMCdcbiAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQtcmVkLTIwMFwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgICA8U2t1bGwgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXJlZC00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICDwn5KlIFRyd2HFgmUgVXN6a29kemVuaWUgTmFnxYLDs3drYSBQRSAoRE9TICYgTlQgSGVhZGVyIENvcnJ1cHRpb24pXG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICB7Y29uZmlnLmFjdGlvbiA9PT0gJ2NvcnJ1cHRfcGUnICYmIDxzcGFuIGNsYXNzTmFtZT1cInctMiBoLTIgcm91bmRlZC1mdWxsIGJnLXJlZC00MDBcIj48L3NwYW4+fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1yZWQtMzAwLzgwIG10LTFcIj5cbiAgICAgICAgICAgICAgICAgIE5hZHBpc3VqZSBiYWp0eSBzeWduYXR1cnkgPGNvZGUgY2xhc3NOYW1lPVwiYmctcmVkLTk1MC84MCBweC0xIHJvdW5kZWQgZm9udC1tb25vXCI+TVo8L2NvZGU+ICgweDVBNEQpIGkgbmFnxYLDs3drYSBQRSB6ZXJhbWkuIFdpbmRvd3Mgb2RyenVjYSBwbGlrIHogYsWCxJlkZW0gPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1hbWJlci0zMDAgZm9udC1tb25vXCI+MHhDMDAwMDA3QiAoU1RBVFVTX0lOVkFMSURfSU1BR0VfRk9STUFUKTwvc3Bhbj4uXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgIHsvKiBCTE9LQURBIFVQUkFXTklFxYMgQUNMICovfVxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0Q29uZmlnKHsgLi4uY29uZmlnLCBhY3Rpb246ICdhY2xfbG9ja291dCcgfSl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy1mdWxsIHAtMyByb3VuZGVkLXhsIHRleHQtbGVmdCBib3JkZXIgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgICAgIGNvbmZpZy5hY3Rpb24gPT09ICdhY2xfbG9ja291dCdcbiAgICAgICAgICAgICAgICAgICAgPyAnYmctYW1iZXItOTUwLzgwIGJvcmRlci1hbWJlci01MDAgdGV4dC1hbWJlci0xMDAgc2hhZG93LW1kIHNoYWRvdy1hbWJlci05NTAvNDAgcmluZy0xIHJpbmctYW1iZXItNTAwLzQwJ1xuICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05NTAgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTQwMCBob3Zlcjpib3JkZXItc2xhdGUtNzAwJ1xuICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC1hbWJlci0yMDBcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgPEtleVJvdW5kIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1hbWJlci00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICDwn5SSIEJsb2thZGEgQUNMIChEQUNMIExvY2tvdXQgLyBpY2FjbHMgL2RlbnkgRXZlcnlvbmUpXG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICB7Y29uZmlnLmFjdGlvbiA9PT0gJ2FjbF9sb2Nrb3V0JyAmJiA8c3BhbiBjbGFzc05hbWU9XCJ3LTIgaC0yIHJvdW5kZWQtZnVsbCBiZy1hbWJlci00MDBcIj48L3NwYW4+fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1hbWJlci0zMDAvODAgbXQtMVwiPlxuICAgICAgICAgICAgICAgICAgT2RpbmEgd3N6ZWxraWUgcHJhd2EgKEV4ZWN1dGUsIFJlYWQsIFdyaXRlKSBncnVwaWUgV3N6eXNjeSAoPGNvZGUgY2xhc3NOYW1lPVwiYmctYW1iZXItOTUwLzgwIHB4LTEgcm91bmRlZCBmb250LW1vbm9cIj4qUy0xLTEtMDwvY29kZT4pLiBQcsOzYmEgdXJ1Y2hvbWllbmlhIGtvxYRjenkgc2nEmSA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWFtYmVyLTMwMCBmb250LW1vbm9cIj5BY2Nlc3MgRGVuaWVkIChCxYLEhWQgNSk8L3NwYW4+LlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICB7LyogUG96b3N0YcWCZSBzdGFuZGFyZG93ZSBvcGNqZSB3IHNpYXRjZSAyeDIgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtMiBwdC0xXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRDb25maWcoeyAuLi5jb25maWcsIGFjdGlvbjogJ3F1YXJhbnRpbmVfbG9jaycgfSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BwLTIuNSByb3VuZGVkLWxnIHRleHQtbGVmdCBib3JkZXIgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnLmFjdGlvbiA9PT0gJ3F1YXJhbnRpbmVfbG9jaydcbiAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1wdXJwbGUtOTUwLzcwIGJvcmRlci1wdXJwbGUtNTAwIHRleHQtcHVycGxlLTIwMCdcbiAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05NTAgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTQwMCBob3Zlcjpib3JkZXItc2xhdGUtNzAwJ1xuICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICAgICAgICA8U2hpZWxkQWxlcnQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1wdXJwbGUtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+S3dhcmFudGFubmEgUGxpa3U8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDAgbXQtMC41XCI+Wm1pYW5hIG5hend5IG5hIC5xdWFyYW50aW5lPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldENvbmZpZyh7IC4uLmNvbmZpZywgYWN0aW9uOiAna2lsbCcgfSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BwLTIuNSByb3VuZGVkLWxnIHRleHQtbGVmdCBib3JkZXIgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnLmFjdGlvbiA9PT0gJ2tpbGwnXG4gICAgICAgICAgICAgICAgICAgICAgPyAnYmctcm9zZS05NTAvNzAgYm9yZGVyLXJvc2UtNTAwIHRleHQtcm9zZS0yMDAnXG4gICAgICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTUwIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS00MDAgaG92ZXI6Ym9yZGVyLXNsYXRlLTcwMCdcbiAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgPEJhbiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXJvc2UtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+Wnd5a8WCeSBLaWxsIChTSUdLSUxMKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCBtdC0wLjVcIj5OYXR5Y2htaWFzdG93ZSB6YWJpY2llPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogRGVkeWtvd2FueSBQYW5lbCBLb25maWd1cmFjamkgVXN6a2FkemFuaWEgUEUgJiBCbG9rYWR5IEFDTCAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLXhsIHAtNCBzcGFjZS15LTNcIj5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB1cHBlcmNhc2UgdGV4dC1zbGF0ZS0zMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICA8RmlsZUNvZGUyIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1waW5rLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+UGFyYW1ldHJ5IFNhYm90YcW8dSBCaW5hcm5lZ28gKFBFICYgQUNMKTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXBpbmstNDAwIGZvbnQtbW9ub1wiPldJTjMyIElOVEVSTkFMUzwvc3Bhbj5cbiAgICAgICAgICAgIDwvbGFiZWw+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yLjUgdGV4dC14c1wiPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMzAwIGZvbnQtbWVkaXVtIGJsb2NrIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgIE1ldG9kYSB1c3prb2R6ZW5pYSBzdHJ1a3R1cnkgUG9ydGFibGUgRXhlY3V0YWJsZSAoUEUpOlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgICB2YWx1ZT17Y29uZmlnLnBlQ29ycnVwdGlvbk1ldGhvZCB8fCAnemVyb19tel9hbmRfcGUnfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICBzZXRDb25maWcoe1xuICAgICAgICAgICAgICAgICAgICAgIC4uLmNvbmZpZyxcbiAgICAgICAgICAgICAgICAgICAgICBwZUNvcnJ1cHRpb25NZXRob2Q6IGUudGFyZ2V0LnZhbHVlIGFzIGFueSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS05NTAgdGV4dC1zbGF0ZS0yMDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgcm91bmRlZC1sZyBweC0yLjUgcHktMS41IHRleHQteHMgZm9udC1tb25vIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItcGluay01MDBcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJ6ZXJvX216X2FuZF9wZVwiPlxuICAgICAgICAgICAgICAgICAgICBaZXJvd2FuaWUgc3lnbmF0dXJ5IERPUyAnTVonICgweDVBNEQpICsgd3NrYcW6bmlrYSBQRSAoMHgzQyBlX2xmYW5ldylcbiAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIndpcGVfZmlyc3RfMWtiXCI+XG4gICAgICAgICAgICAgICAgICAgIENhxYJrb3dpdGUgd3l6ZXJvd2FuaWUgcGllcndzenljaCAxMDI0IGJhanTDs3cgbmFnxYLDs3drYSAoXFxcXHgwMCAqIDEwMjQpXG4gICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyYW5kb21fdXJhbmRvbVwiPlxuICAgICAgICAgICAgICAgICAgICBLcnlwdG9ncmFmaWN6bmUgbmFkcGlzYW5pZSBsb3Nvd3ltaSDFm21pZWNpYW1pIChvcy51cmFuZG9tIDIwNDggYmFqdMOzdylcbiAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHAtMi41IHJvdW5kZWQtbGcgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwLzgwIGN1cnNvci1wb2ludGVyIGhvdmVyOmJvcmRlci1zbGF0ZS03MDBcIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTIwMCBibG9ja1wiPlplcndhbmllIGR6aWVkemljemVuaWEgQUNMICgvaW5oZXJpdGFuY2U6cik8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCB0ZXh0LVsxMXB4XVwiPk9kxYLEhWN6YSBwbGlrIG9kIHVwcmF3bmllxYQgbmFkcnrEmWRuZWdvIGZvbGRlcnUgKEM6XFxcXFVzZXJzXFxcXC4uLik8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgY2hlY2tlZD17Y29uZmlnLmFjbEluaGVyaXRhbmNlUmVtb3ZhbCAhPT0gZmFsc2V9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldENvbmZpZyh7IC4uLmNvbmZpZywgYWNsSW5oZXJpdGFuY2VSZW1vdmFsOiBlLnRhcmdldC5jaGVja2VkIH0pfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy00IGgtNCByb3VuZGVkIHRleHQtcGluay02MDAgZm9jdXM6cmluZy1waW5rLTUwMCBiZy1zbGF0ZS05MDAgYm9yZGVyLXNsYXRlLTcwMFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9sYWJlbD5cblxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHAtMi41IHJvdW5kZWQtbGcgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwLzgwIGN1cnNvci1wb2ludGVyIGhvdmVyOmJvcmRlci1zbGF0ZS03MDBcIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTIwMCBibG9ja1wiPkJsb2thZGEgcG9ub3duZWdvIHN0YXJ0dSB3IFJlamVzdHJ6ZSAoSUZFTyk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCB0ZXh0LVsxMXB4XVwiPkltYWdlIEZpbGUgRXhlY3V0aW9uIE9wdGlvbnMgcHJ6ZWtpZXJvd3VqZSBzdGFydCBuYSBhdHJhcMSZPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e2NvbmZpZy5lbmFibGVJZmVvQmxvY2t9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldENvbmZpZyh7IC4uLmNvbmZpZywgZW5hYmxlSWZlb0Jsb2NrOiBlLnRhcmdldC5jaGVja2VkIH0pfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy00IGgtNCByb3VuZGVkIHRleHQtcHVycGxlLTYwMCBmb2N1czpyaW5nLXB1cnBsZS01MDAgYmctc2xhdGUtOTAwIGJvcmRlci1zbGF0ZS03MDBcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBEZXRlY3Rpb24gQ3JpdGVyaWEgQ2FyZCAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLXhsIHAtNCBzcGFjZS15LTNcIj5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB1cHBlcmNhc2UgdGV4dC1zbGF0ZS0zMDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICA8RXllIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1yZWQtNDAwXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+V2FydW5raSBEZXRla2NqaSBaxYJvxZtsaXd5Y2ggT2tpZW4gLyBNb2R1xYLDs3c8L3NwYW4+XG4gICAgICAgICAgICA8L2xhYmVsPlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMiB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcC0yIHJvdW5kZWQtbGcgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwLzgwIGN1cnNvci1wb2ludGVyIGhvdmVyOmJvcmRlci1zbGF0ZS03MDBcIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTIwMCBibG9ja1wiPkZsYWdhIFdTX0VYX1RPUE1PU1QgKEFsd2F5cy1Pbi1Ub3ApPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgdGV4dC1bMTFweF1cIj5XeWtyeXdhaiBva25hIHogd3ltdXN6ZW5pZW0gd2llcnpjaG5pZWogd2Fyc3R3eSBaLU9yZGVyPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e2NvbmZpZy5jaGVja1RvcE1vc3RGbGFnfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRDb25maWcoeyAuLi5jb25maWcsIGNoZWNrVG9wTW9zdEZsYWc6IGUudGFyZ2V0LmNoZWNrZWQgfSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTQgaC00IHJvdW5kZWQgdGV4dC1yZWQtNjAwIGZvY3VzOnJpbmctcmVkLTUwMCBiZy1zbGF0ZS05MDAgYm9yZGVyLXNsYXRlLTcwMFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9sYWJlbD5cblxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHAtMiByb3VuZGVkLWxnIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMC84MCBjdXJzb3ItcG9pbnRlciBob3Zlcjpib3JkZXItc2xhdGUtNzAwXCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS0yMDAgYmxvY2tcIj5QZcWCbmUgcG9rcnljaWUgZWtyYW51IChGdWxsc2NyZWVuICZndDs9IDkwJSk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCB0ZXh0LVsxMXB4XVwiPld5a3J5d2FqIG9rbmEgemFzxYJhbmlhasSFY2UgcGFzZWsgemFkYcWEPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e2NvbmZpZy5jaGVja0Z1bGxTY3JlZW5Cb3VuZHN9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldENvbmZpZyh7IC4uLmNvbmZpZywgY2hlY2tGdWxsU2NyZWVuQm91bmRzOiBlLnRhcmdldC5jaGVja2VkIH0pfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy00IGgtNCByb3VuZGVkIHRleHQtcmVkLTYwMCBmb2N1czpyaW5nLXJlZC01MDAgYmctc2xhdGUtOTAwIGJvcmRlci1zbGF0ZS03MDBcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvbGFiZWw+XG5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBwLTIgcm91bmRlZC1sZyBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAvODAgY3Vyc29yLXBvaW50ZXIgaG92ZXI6Ym9yZGVyLXNsYXRlLTcwMFwiPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtc2xhdGUtMjAwIGJsb2NrXCI+U2thbm93YW5pZSBwYW1pxJljaSBSQU0gcG9kIGvEhXRlbSBiaWJsaW90ZWsgRmx1dHRlcjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIHRleHQtWzExcHhdXCI+Zmx1dHRlcl93aW5kb3dzLmRsbCAvIGZsdXR0ZXJfZW5naW5lLmRsbDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICBjaGVja2VkPXtjb25maWcuY2hlY2tGbHV0dGVyRGxsc31cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0Q29uZmlnKHsgLi4uY29uZmlnLCBjaGVja0ZsdXR0ZXJEbGxzOiBlLnRhcmdldC5jaGVja2VkIH0pfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy00IGgtNCByb3VuZGVkIHRleHQtcmVkLTYwMCBmb2N1czpyaW5nLXJlZC01MDAgYmctc2xhdGUtOTAwIGJvcmRlci1zbGF0ZS03MDBcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBXaGl0ZWxpc3QgVGFnIE1hbmFnZXIgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAvOTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC14bCBwLTQgc3BhY2UteS0zXCI+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdXBwZXJjYXNlIHRleHQtc2xhdGUtMzAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgPFNoaWVsZCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPkJpYcWCYSBsaXN0YSBwcm9jZXPDs3cgKENocm9uaW9uZSk8L3NwYW4+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDAgZm9udC1ub3JtYWxcIj5OaWdkeSBuaWUgdXN6a2FkemFqPC9zcGFuPlxuICAgICAgICAgICAgPC9sYWJlbD5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBnYXAtMS41XCI+XG4gICAgICAgICAgICAgIHtjb25maWcud2hpdGVsaXN0Lm1hcCgoaXRlbSkgPT4gKFxuICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICBrZXk9e2l0ZW19XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgcHgtMiBweS0wLjUgcm91bmRlZCBiZy1zbGF0ZS04MDAgdGV4dC1zbGF0ZS0zMDAgdGV4dC14cyBmb250LW1vbm8gYm9yZGVyIGJvcmRlci1zbGF0ZS03MDBcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPntpdGVtfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlUmVtb3ZlV2hpdGVsaXN0KGl0ZW0pfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXJlZC00MDBcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8WCBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBwdC0xXCI+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIm5wLiBvYnM2NC5leGVcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXtuZXdXaGl0ZWxpc3RJdGVtfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0TmV3V2hpdGVsaXN0SXRlbShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgb25LZXlEb3duPXsoZSkgPT4gZS5rZXkgPT09ICdFbnRlcicgJiYgaGFuZGxlQWRkV2hpdGVsaXN0KCl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC0xIGJnLXNsYXRlLTk1MCB0ZXh0LXNsYXRlLTIwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCByb3VuZGVkLWxnIHB4LTIuNSBweS0xIHRleHQteHMgZm9udC1tb25vXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUFkZFdoaXRlbGlzdH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yLjUgcHktMSBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQtc2xhdGUtMjAwIHJvdW5kZWQtbGcgdGV4dC14cyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8UGx1cyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+RG9kYWo8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBSaWdodCBDb2x1bW46IENvZGUgUHJldmlldyAmIFJ1biBJbnN0cnVjdGlvbnMgKDcgY29scykgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tNyBzcGFjZS15LTRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTJcIj5cbiAgICAgICAgICAgICAgPFRlcm1pbmFsIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1waW5rLTQwMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtd2hpdGVcIj5cbiAgICAgICAgICAgICAgICBXeWdlbmVyb3dhbnkgcGxpayBQeXRob246IDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LXBpbmstNDAwXCI+Y3VzdG9tX292ZXJsYXlfc2VudGluZWwucHk8L3NwYW4+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgcHgtMiBweS0wLjUgcm91bmRlZCBiZy1lbWVyYWxkLTk1MCB0ZXh0LWVtZXJhbGQtMzAwIGJvcmRlciBib3JkZXItZW1lcmFsZC04MDAgZm9udC1tb25vIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgIDEwMCUgT0ZGTElORVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxDb2RlQmxvY2tcbiAgICAgICAgICAgIGNvZGU9e2dlbmVyYXRlZENvZGV9XG4gICAgICAgICAgICBsYW5ndWFnZT1cInB5dGhvblwiXG4gICAgICAgICAgICBmaWxlbmFtZT1cImN1c3RvbV9vdmVybGF5X3NlbnRpbmVsLnB5XCJcbiAgICAgICAgICAvPlxuXG4gICAgICAgICAgey8qIEVkdWNhdGlvbmFsIC8gRXhwbGFuYXRvcnkgQ2FsbG91dCBDYXJkcyAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTIgZ2FwLTNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctcmVkLTk1MC80MCBib3JkZXIgYm9yZGVyLXJlZC04MDAvNjAgcm91bmRlZC14bCBwLTMgdGV4dC14cyBzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1yZWQtMzAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICA8U2t1bGwgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXJlZC00MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPlNrdXRlayBVc3prb2R6ZW5pYSBOYWfFgsOzd2thIFBFOjwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMzAwIHRleHQtWzExcHhdIGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgICAgICAgIEdkeSBXaW5kb3dzIFBFIExvYWRlciAoPGNvZGUgY2xhc3NOYW1lPVwidGV4dC1yZWQtMzAwIGZvbnQtbW9ub1wiPm50ZGxsLmRsbCFMZHJwSW5pdGlhbGl6ZVByb2Nlc3M8L2NvZGU+KSB3eWtyeWplIGJyYWsgc3lnbmF0dXJ5IDxjb2RlIGNsYXNzTmFtZT1cInRleHQtcmVkLTMwMCBmb250LW1vbm9cIj5NWjwvY29kZT4gbHViIG5pZXBvcHJhd255IG9mZnNldCA8Y29kZSBjbGFzc05hbWU9XCJ0ZXh0LXJlZC0zMDAgZm9udC1tb25vXCI+ZV9sZmFuZXc8L2NvZGU+LCB6d3LDs2NpIGLFgsSFZCA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXJlZC0yMDAgZm9udC1ib2xkXCI+MHhDMDAwMDA3QiAoU1RBVFVTX0lOVkFMSURfSU1BR0VfRk9STUFUKTwvc3Bhbj4uXG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWFtYmVyLTk1MC80MCBib3JkZXIgYm9yZGVyLWFtYmVyLTgwMC82MCByb3VuZGVkLXhsIHAtMyB0ZXh0LXhzIHNwYWNlLXktMVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LWFtYmVyLTMwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgPExvY2sgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWFtYmVyLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+U2t1dGVrIEJsb2thZHkgQUNMIChpY2FjbHMgRGVueSk6PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS0zMDAgdGV4dC1bMTFweF0gbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgICAgU2VjdXJpdHkgUmVmZXJlbmNlIE1vbml0b3IgKFNSTSkgdyBOVEZTIG9kcnp1Y2Egd3N6ZWxraWUgxbzEhWRhbmlhIG90d2FyY2lhIHBsaWt1ICg8Y29kZSBjbGFzc05hbWU9XCJ0ZXh0LWFtYmVyLTMwMCBmb250LW1vbm9cIj5GSUxFX0VYRUNVVEUgLyBGSUxFX1JFQURfREFUQTwvY29kZT4pLiBXaW5kb3dzIHp3cmFjYSBuYXR5Y2htaWFzdCBixYLEhWQgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1hbWJlci0yMDAgZm9udC1ib2xkXCI+QWNjZXNzIERlbmllZCAoMHg1KTwvc3Bhbj4uXG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIEV4ZWN1dGlvbiBzdGVwcyBjYXJkICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQteGwgcC00IHRleHQteHMgdGV4dC1zbGF0ZS0zMDAgc3BhY2UteS0yXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTIgaC0yIHJvdW5kZWQtZnVsbCBiZy1waW5rLTQwMCBhbmltYXRlLXBpbmdcIj48L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuPkluc3RydWtjamEgdXJ1Y2hvbWllbmlhIHNrcnlwdHUgdyB0cnliaWUgb2ZmbGluZTo8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxvbCBjbGFzc05hbWU9XCJsaXN0LWRlY2ltYWwgbGlzdC1pbnNpZGUgc3BhY2UteS0xIHRleHQtc2xhdGUtNDAwIHBsLTFcIj5cbiAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgIFphcGlzeiB3eWdlbmVyb3dhbnkga29kIGpha28gcGxpayA8Y29kZSBjbGFzc05hbWU9XCJiZy1zbGF0ZS05NTAgcHgtMS41IHB5LTAuNSByb3VuZGVkIHRleHQtcGluay0zMDAgZm9udC1tb25vXCI+Y3VzdG9tX292ZXJsYXlfc2VudGluZWwucHk8L2NvZGU+IG5hIGR5c2t1IEM6IGx1YiBwdWxwaWNpZS5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgIE90d8OzcnogV2llcnN6IFBvbGVjZcWEIChDTUQpIGpha28gKipBZG1pbmlzdHJhdG9yKiogKFByYXd5IHByenljaXNrIG15c3p5IOKGkiAqVXJ1Y2hvbSBqYWtvIGFkbWluaXN0cmF0b3IqKS5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgIFdwaXN6IHBvbGVjZW5pZTogPGNvZGUgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTUwIHB4LTEuNSBweS0wLjUgcm91bmRlZCB0ZXh0LXBpbmstMzAwIGZvbnQtbW9ub1wiPnB5dGhvbiBjdXN0b21fb3ZlcmxheV9zZW50aW5lbC5weTwvY29kZT5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgIFNrcnlwdCB3IHXFgmFta3Ugc2VrdW5keSB3eWtyeWplIGJsb2t1asSFY2Ugb2tuby9wcm9jZXMsIHphbXJvemkgZ28gdyBSQU0gKDxjb2RlIGNsYXNzTmFtZT1cInRleHQtcHVycGxlLTMwMCBmb250LW1vbm9cIj5OdFN1c3BlbmRQcm9jZXNzPC9jb2RlPikgaSB0cndhbGUgdW5pZXN6a29kbGl3aSBwbGlrIHd5a29ueXdhbG55IG5hIGR5c2t1LCB1bmllbW/FvGxpd2lhasSFYyBqZWdvIHBvbm93bmUgdXJ1Y2hvbWllbmllLlxuICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPC9vbD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUFtRlE7QUFuRlIsU0FBZ0IsVUFBVSxlQUFlO0FBQ3pDO0FBQUEsRUFDWTtBQUFBLEVBQVE7QUFBQSxFQUFlO0FBQUEsRUFBVTtBQUFBLEVBQXlCO0FBQUEsRUFDcEU7QUFBQSxFQUFjO0FBQUEsRUFBTTtBQUFBLEVBQUc7QUFBQSxFQUFhO0FBQUEsRUFBTTtBQUFBLEVBQUs7QUFBQSxFQUFjO0FBQUEsRUFDN0Q7QUFBQSxFQUFtQztBQUFBLE9BQzlCO0FBRVAsU0FBUyxrQ0FBa0M7QUFDM0MsU0FBUyxpQkFBaUI7QUFDMUIsU0FBUyxpQ0FBaUM7QUFDMUMsU0FBUywyQkFBMkI7QUFNN0IsYUFBTSxrQkFBa0QsQ0FBQyxFQUFFLFVBQVUsTUFBTTtBQUNoRixRQUFNLENBQUMsUUFBUSxTQUFTLElBQUksU0FBaUMsUUFBUTtBQUNyRSxRQUFNLENBQUMsUUFBUSxTQUFTLElBQUksU0FBNkI7QUFBQSxJQUN2RCxJQUFJLGFBQWE7QUFBQSxJQUNqQixRQUFRO0FBQUEsSUFDUixnQkFBZ0I7QUFBQSxJQUNoQixrQkFBa0I7QUFBQSxJQUNs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