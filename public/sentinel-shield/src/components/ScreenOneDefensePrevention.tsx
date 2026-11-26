import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"];
import {
  ShieldCheck,
  Scissors,
  HardDrive,
  RefreshCw,
  CheckCircle2,
  Shield
} from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import { adwarePopupDestroyer } from "/sentinel-shield/src/utils/adwarePopupDestroyer.ts";
import { hexLaserBarrierSystem } from "/sentinel-shield/src/utils/hexagonalLaserBarrierSystem.ts";
import { gnidaSensorsMatrix } from "/sentinel-shield/src/utils/gnidaSensorsMatrix.ts";
export const ScreenOneDefensePrevention = ({ onNotify }) => {
  const [adwareTargets, setAdwareTargets] = useState(() => adwarePopupDestroyer.getTargets());
  const [isDefragmenting, setIsDefragmenting] = useState(false);
  const [defragProgress, setDefragProgress] = useState(100);
  const [preventiveShieldActive, setPreventiveShieldActive] = useState(true);
  const [topMostStrippedCount, setTopMostStrippedCount] = useState(14);
  const [defragCyclesCount, setDefragCyclesCount] = useState(6);
  const [reclaimedRamMb, setReclaimedRamMb] = useState(342.8);
  const [memoryGrid, setMemoryGrid] = useState(() => {
    return Array.from({ length: 32 }, (_, i) => {
      const isInfected = [3, 7, 12, 18, 23, 29].includes(i);
      return {
        id: i,
        status: isInfected ? "infected" : "clean",
        processName: isInfected ? `malware_cluster_${i}.dll` : `sys_kernel_page_${i}.sys`,
        address: `0x7FFF_${(i * 1024).toString(16).toUpperCase().padStart(4, "0")}`,
        sizeKb: Math.floor(Math.random() * 4096) + 512
      };
    });
  });
  useEffect(() => {
    const unsub = adwarePopupDestroyer.subscribe(setAdwareTargets);
    return () => unsub();
  }, []);
  const handleDecapitateAll = () => {
    const { killedCount, purgedKeys } = adwarePopupDestroyer.killAllAdwareAndPopups();
    setTopMostStrippedCount((prev) => prev + killedCount);
    gnidaSensorsMatrix.triggerGnidaRecognition(
      "SENSOR_DWM_SCREEN",
      "hostile_popup_matrix.exe",
      9210,
      "Dekapitacja Okien Popup & TopMost Stripper",
      `Ścięto nagłówki ${killedCount} wrogich okien HWND, usunięto WS_EX_TOPMOST i zerowano Z-Order pulpitu.`
    );
    onNotify(`✂️ DEKAPITACJA ZAKOŃCZONA: Zlikwidowano ${killedCount} okien adware, zresetowano Z-Order i wyczyszczono ${purgedKeys} wpisów rejestru!`);
  };
  const handleSingleDecapitation = (id, name) => {
    adwarePopupDestroyer.decapitateTarget(id, "KILL_GNIDA_STRIKE");
    setTopMostStrippedCount((prev) => prev + 1);
    onNotify(`✂️ Zdekapitowano okno: ${name} (HWND zwolniony, zresetowano pozycję kursora)`);
  };
  const handleRunGnidaDefragmentation = () => {
    if (isDefragmenting) return;
    setIsDefragmenting(true);
    setDefragProgress(0);
    const interval = setInterval(() => {
      setDefragProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDefragmenting(false);
          setDefragCyclesCount((c) => c + 1);
          setReclaimedRamMb((r) => Number((r + 48.6).toFixed(1)));
          setMemoryGrid((grid) => grid.map((b) => ({
            ...b,
            status: b.status === "infected" ? "defragmented" : "clean"
          })));
          onNotify("🧩 DEFRAGMENTACJA GNID UKOŃCZONA: Rozbito klastry malware w RAM, zoptymalizowano tablice deskryptorów i odzyskano 48.6 MB!");
          return 100;
        }
        return prev + 15;
      });
    }, 180);
  };
  const togglePreventiveShield = () => {
    const newState = !preventiveShieldActive;
    setPreventiveShieldActive(newState);
    if (newState) {
      hexLaserBarrierSystem.activateInstantly();
      onNotify("🛡️ TARCZA PREWENCYJNA: Włączono automatyczne filtrowanie socketów i prewencję autostartu.");
    } else {
      onNotify("⚠️ TARCZA PREWENCYJNA: Przełączono w tryb pasywny.");
    }
  };
  const activePopups = adwareTargets.filter((t) => !t.isDecapitated);
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6 animate-in fade-in duration-300", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "p-5 rounded-3xl bg-zinc-950/90 border border-white/10 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3.5", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-zinc-900 border border-amber-500/30 rounded-2xl text-amber-400 shadow-md", children: /* @__PURE__ */ jsxDEV(Shield, { className: "w-6 h-6" }, void 0, false, {
          fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
          lineNumber: 118,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
          lineNumber: 117,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2.5 flex-wrap", children: [
            /* @__PURE__ */ jsxDEV("h2", { className: "text-lg font-bold font-mono text-white uppercase tracking-wider", children: "EKRAN 1: PREWENCJA & DEKAPITACJA I DEFRAGMENTACJA GNID" }, void 0, false, {
              fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
              lineNumber: 122,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-0.5 rounded-full bg-zinc-900 border border-amber-500/40 text-amber-300 text-[10px] font-mono font-medium", children: "MODUŁ OBRONNO-ZAPOBIEGAWCZY" }, void 0, false, {
              fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
              lineNumber: 125,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
            lineNumber: 121,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 font-sans mt-0.5", children: "Usuwanie agresywnych flag TopMost, unieważnianie deskryptorów HWND, prewencyjne rozbijanie skondensowanych struktur malware w pamięci RAM." }, void 0, false, {
            fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
            lineNumber: 129,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
          lineNumber: 120,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
        lineNumber: 116,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: togglePreventiveShield,
          className: `px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 border transition-all cursor-pointer shadow-md ${preventiveShieldActive ? "bg-zinc-900 border-emerald-500/40 text-emerald-300" : "bg-zinc-950 border-white/10 text-slate-400"}`,
          children: [
            /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
              fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
              lineNumber: 144,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              "Tarcza Prewencyjna: ",
              preventiveShieldActive ? "AKTYWNA" : "CZUWANIE"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
              lineNumber: 145,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
          lineNumber: 136,
          columnNumber: 11
        },
        this
      ) }, void 0, false, {
        fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
        lineNumber: 135,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
      lineNumber: 115,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-5", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "p-5 rounded-3xl bg-zinc-950/85 border border-white/10 shadow-2xl flex flex-col justify-between space-y-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-white/10 pb-3", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-xl bg-zinc-900 border border-rose-500/30 text-rose-400", children: /* @__PURE__ */ jsxDEV(Scissors, { className: "w-5 h-5" }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                lineNumber: 161,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                lineNumber: 160,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-bold font-mono text-slate-100 uppercase tracking-wide", children: "Dekapitacja Okien HWND & TopMost" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                  lineNumber: 164,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400", children: "Ścinanie flag WS_EX_TOPMOST, zerowanie Z-Order i uwalnianie kursora myszy." }, void 0, false, {
                  fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                  lineNumber: 167,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                lineNumber: 163,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
              lineNumber: 159,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-1 rounded-full bg-rose-950/70 border border-rose-500/40 text-rose-300 text-xs font-mono font-bold", children: [
              activePopups.length,
              " Aktywnych"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
              lineNumber: 173,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
            lineNumber: 158,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-3 gap-2 text-center font-mono", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-2xl bg-zinc-900/90 border border-white/5", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400 uppercase", children: "Ścięte TopMost" }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                lineNumber: 181,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-base font-black text-rose-300 mt-0.5", children: topMostStrippedCount }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                lineNumber: 182,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
              lineNumber: 180,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-2xl bg-zinc-900/90 border border-white/5", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400 uppercase", children: "Unieważnione HWND" }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                lineNumber: 185,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-base font-black text-amber-300 mt-0.5", children: topMostStrippedCount * 3 }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                lineNumber: 186,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
              lineNumber: 184,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-2xl bg-zinc-900/90 border border-white/5", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400 uppercase", children: "Czas Reakcji" }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                lineNumber: 189,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-base font-black text-emerald-400 mt-0.5", children: "0.0 ms" }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                lineNumber: 190,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
              lineNumber: 188,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
            lineNumber: 179,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 max-h-56 overflow-y-auto pr-1", children: activePopups.length === 0 ? /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-zinc-900/40 border border-emerald-500/20 text-center text-xs text-emerald-300 font-mono flex items-center justify-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
              fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
              lineNumber: 198,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Wszystkie wrogie okna zostały ścięte i zneutralizowane. Pulpit bezpieczny." }, void 0, false, {
              fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
              lineNumber: 199,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
            lineNumber: 197,
            columnNumber: 17
          }, this) : activePopups.map((popup) => /* @__PURE__ */ jsxDEV(
            "div",
            {
              className: "p-3 rounded-2xl bg-zinc-900/80 border border-rose-500/20 hover:border-rose-500/40 transition-all flex items-center justify-between gap-3 text-xs font-mono",
              children: [
                /* @__PURE__ */ jsxDEV("div", { className: "space-y-0.5", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-slate-200", children: popup.title }, void 0, false, {
                      fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                      lineNumber: 209,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-800", children: [
                      "PID: ",
                      popup.pid
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                      lineNumber: 210,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                    lineNumber: 208,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400 font-sans", children: [
                    "HWND: ",
                    /* @__PURE__ */ jsxDEV("code", { className: "text-amber-300 font-mono", children: popup.hwnd }, void 0, false, {
                      fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                      lineNumber: 215,
                      columnNumber: 31
                    }, this),
                    " • Typ: ",
                    /* @__PURE__ */ jsxDEV("code", { className: "text-slate-300 font-mono", children: popup.popupType }, void 0, false, {
                      fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                      lineNumber: 215,
                      columnNumber: 101
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                    lineNumber: 214,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                  lineNumber: 207,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => handleSingleDecapitation(popup.id, popup.title),
                    className: "px-2.5 py-1.5 rounded-xl bg-zinc-950 hover:bg-rose-950 border border-rose-500/40 text-rose-300 text-xs font-mono font-bold flex items-center gap-1 cursor-pointer transition-all shrink-0",
                    title: "Śnij to okno i usuń flagę TopMost",
                    children: [
                      /* @__PURE__ */ jsxDEV(Scissors, { className: "w-3.5 h-3.5 text-rose-400" }, void 0, false, {
                        fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                        lineNumber: 224,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { children: "Śnij" }, void 0, false, {
                        fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                        lineNumber: 225,
                        columnNumber: 23
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                    lineNumber: 219,
                    columnNumber: 21
                  },
                  this
                )
              ]
            },
            popup.id,
            true,
            {
              fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
              lineNumber: 203,
              columnNumber: 19
            },
            this
          )) }, void 0, false, {
            fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
            lineNumber: 195,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
          lineNumber: 157,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleDecapitateAll,
            className: "w-full py-3.5 px-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-rose-500/40 hover:border-rose-400 text-rose-200 hover:text-white font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-xl active:translate-y-0.5 transition-all cursor-pointer",
            children: [
              /* @__PURE__ */ jsxDEV(Scissors, { className: "w-4 h-4 text-rose-400" }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                lineNumber: 238,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "WYKONAJ MASOWĄ DEKAPITACJĘ WSZYSTKICH OKIEN (TOPMOST STRIPPER)" }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                lineNumber: 239,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
            lineNumber: 234,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
        lineNumber: 156,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-5 rounded-3xl bg-zinc-950/85 border border-white/10 shadow-2xl flex flex-col justify-between space-y-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-white/10 pb-3", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-xl bg-zinc-900 border border-cyan-500/30 text-cyan-400", children: /* @__PURE__ */ jsxDEV(HardDrive, { className: "w-5 h-5" }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                lineNumber: 251,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                lineNumber: 250,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-bold font-mono text-slate-100 uppercase tracking-wide", children: "Defragmentacja Gnid & Pamięci RAM" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                  lineNumber: 254,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400", children: "Rozbijanie sklejonych klastrów malware w RAM DDR5 i czyszczenie stron pamięci." }, void 0, false, {
                  fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                  lineNumber: 257,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                lineNumber: 253,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
              lineNumber: 249,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold", children: [
              defragCyclesCount,
              " Cykli Wykonanych"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
              lineNumber: 263,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
            lineNumber: 248,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-3 gap-2 text-center font-mono", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-2xl bg-zinc-900/90 border border-white/5", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400 uppercase", children: "Odzyskany RAM" }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                lineNumber: 271,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-base font-black text-cyan-300 mt-0.5", children: [
                reclaimedRamMb,
                " MB"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                lineNumber: 272,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
              lineNumber: 270,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-2xl bg-zinc-900/90 border border-white/5", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400 uppercase", children: "Stan Pamięci" }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                lineNumber: 275,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-base font-black text-emerald-400 mt-0.5", children: "ZOPTYMALIZOWANY" }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                lineNumber: 276,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
              lineNumber: 274,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-2xl bg-zinc-900/90 border border-white/5", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400 uppercase", children: "Integralność Stron" }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                lineNumber: 279,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-base font-black text-amber-300 mt-0.5", children: "100.0%" }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                lineNumber: 280,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
              lineNumber: 278,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
            lineNumber: 269,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-[10px] font-mono text-slate-400", children: [
              /* @__PURE__ */ jsxDEV("span", { children: "Macierz Stron Pamięci DDR5 (32 Klastry):" }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                lineNumber: 287,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded bg-emerald-500 inline-block" }, void 0, false, {
                    fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                    lineNumber: 289,
                    columnNumber: 61
                  }, this),
                  " Czyste"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                  lineNumber: 289,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded bg-rose-500 inline-block" }, void 0, false, {
                    fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                    lineNumber: 290,
                    columnNumber: 61
                  }, this),
                  " Skażone Gnidą"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                  lineNumber: 290,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded bg-cyan-400 inline-block" }, void 0, false, {
                    fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                    lineNumber: 291,
                    columnNumber: 61
                  }, this),
                  " Zdefragmentowane"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                  lineNumber: 291,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                lineNumber: 288,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
              lineNumber: 286,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-8 gap-1.5 p-3 rounded-2xl bg-zinc-900/80 border border-white/5", children: memoryGrid.map((block) => /* @__PURE__ */ jsxDEV(
              "div",
              {
                className: `h-7 rounded-lg border flex items-center justify-center font-mono text-[9px] font-bold transition-all cursor-help ${block.status === "infected" ? "bg-rose-950/80 border-rose-500 text-rose-200 animate-pulse" : block.status === "defragmented" ? "bg-cyan-950/80 border-cyan-400 text-cyan-200" : "bg-zinc-950 border-white/10 text-slate-400 hover:border-emerald-500/40 hover:text-emerald-300"}`,
                title: `${block.processName} (${block.address}) - ${block.sizeKb} KB`,
                children: block.id.toString().padStart(2, "0")
              },
              block.id,
              false,
              {
                fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                lineNumber: 297,
                columnNumber: 19
              },
              this
            )) }, void 0, false, {
              fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
              lineNumber: 295,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
            lineNumber: 285,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
          lineNumber: 247,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
          isDefragmenting && /* @__PURE__ */ jsxDEV("div", { className: "w-full bg-zinc-900 rounded-full h-2 overflow-hidden border border-white/10", children: /* @__PURE__ */ jsxDEV(
            "div",
            {
              className: "bg-cyan-400 h-full transition-all duration-150",
              style: { width: `${defragProgress}%` }
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
              lineNumber: 319,
              columnNumber: 17
            },
            this
          ) }, void 0, false, {
            fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
            lineNumber: 318,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleRunGnidaDefragmentation,
              disabled: isDefragmenting,
              className: "w-full py-3.5 px-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-cyan-500/40 hover:border-cyan-400 text-cyan-200 hover:text-white font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-xl active:translate-y-0.5 transition-all cursor-pointer disabled:opacity-50",
              children: [
                /* @__PURE__ */ jsxDEV(RefreshCw, { className: `w-4 h-4 text-cyan-400 ${isDefragmenting ? "animate-spin" : ""}` }, void 0, false, {
                  fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                  lineNumber: 331,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: isDefragmenting ? `DEFRAGMENTACJA W TOKU (${defragProgress}%)...` : "ROZPOCZNIJ DEFRAGMENTACJĘ GNID W RAM (COMPACT MEMORY)" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
                  lineNumber: 332,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
              lineNumber: 326,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
          lineNumber: 316,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
        lineNumber: 246,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
      lineNumber: 151,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/ScreenOneDefensePrevention.tsx",
    lineNumber: 113,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNjcmVlbk9uZURlZmVuc2VQcmV2ZW50aW9uLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFxuICBTaGllbGRDaGVjaywgU2Npc3NvcnMsIEhhcmREcml2ZSwgUmVmcmVzaEN3LCBDcHUsIExheWVycywgXG4gIFRyYXNoMiwgU2hpZWxkQWxlcnQsIENoZWNrQ2lyY2xlMiwgU3BhcmtsZXMsIEFjdGl2aXR5LCBBbGVydFRyaWFuZ2xlLFxuICBMb2NrLCBaYXAsIEV5ZSwgVGVybWluYWwsIFBsYXksIFJhZGlvLCBTaGllbGRcbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IGFkd2FyZVBvcHVwRGVzdHJveWVyIH0gZnJvbSAnLi4vdXRpbHMvYWR3YXJlUG9wdXBEZXN0cm95ZXInO1xuaW1wb3J0IHsgaGV4TGFzZXJCYXJyaWVyU3lzdGVtIH0gZnJvbSAnLi4vdXRpbHMvaGV4YWdvbmFsTGFzZXJCYXJyaWVyU3lzdGVtJztcbmltcG9ydCB7IGduaWRhU2Vuc29yc01hdHJpeCB9IGZyb20gJy4uL3V0aWxzL2duaWRhU2Vuc29yc01hdHJpeCc7XG5pbXBvcnQgeyBBZHdhcmVQb3B1cFRhcmdldCB9IGZyb20gJy4uL3R5cGVzJztcblxuaW50ZXJmYWNlIE1lbW9yeUJsb2NrIHtcbiAgaWQ6IG51bWJlcjtcbiAgc3RhdHVzOiAnY2xlYW4nIHwgJ2luZmVjdGVkJyB8ICdkZWZyYWdtZW50ZWQnIHwgJ3F1YXJhbnRpbmVkJztcbiAgcHJvY2Vzc05hbWU6IHN0cmluZztcbiAgYWRkcmVzczogc3RyaW5nO1xuICBzaXplS2I6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNvbnN0IFNjcmVlbk9uZURlZmVuc2VQcmV2ZW50aW9uOiBSZWFjdC5GQzx7IG9uTm90aWZ5OiAobXNnOiBzdHJpbmcpID0+IHZvaWQgfT4gPSAoeyBvbk5vdGlmeSB9KSA9PiB7XG4gIGNvbnN0IFthZHdhcmVUYXJnZXRzLCBzZXRBZHdhcmVUYXJnZXRzXSA9IHVzZVN0YXRlPEFkd2FyZVBvcHVwVGFyZ2V0W10+KCgpID0+IGFkd2FyZVBvcHVwRGVzdHJveWVyLmdldFRhcmdldHMoKSk7XG4gIGNvbnN0IFtpc0RlZnJhZ21lbnRpbmcsIHNldElzRGVmcmFnbWVudGluZ10gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gIGNvbnN0IFtkZWZyYWdQcm9ncmVzcywgc2V0RGVmcmFnUHJvZ3Jlc3NdID0gdXNlU3RhdGU8bnVtYmVyPigxMDApO1xuICBjb25zdCBbcHJldmVudGl2ZVNoaWVsZEFjdGl2ZSwgc2V0UHJldmVudGl2ZVNoaWVsZEFjdGl2ZV0gPSB1c2VTdGF0ZTxib29sZWFuPih0cnVlKTtcbiAgY29uc3QgW3RvcE1vc3RTdHJpcHBlZENvdW50LCBzZXRUb3BNb3N0U3RyaXBwZWRDb3VudF0gPSB1c2VTdGF0ZTxudW1iZXI+KDE0KTtcbiAgY29uc3QgW2RlZnJhZ0N5Y2xlc0NvdW50LCBzZXREZWZyYWdDeWNsZXNDb3VudF0gPSB1c2VTdGF0ZTxudW1iZXI+KDYpO1xuICBjb25zdCBbcmVjbGFpbWVkUmFtTWIsIHNldFJlY2xhaW1lZFJhbU1iXSA9IHVzZVN0YXRlPG51bWJlcj4oMzQyLjgpO1xuXG4gIC8vIFNpbXVsYXRlZCBSQU0gTWF0cml4IEdyaWQgKDMyIGJsb2NrcylcbiAgY29uc3QgW21lbW9yeUdyaWQsIHNldE1lbW9yeUdyaWRdID0gdXNlU3RhdGU8TWVtb3J5QmxvY2tbXT4oKCkgPT4ge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiAzMiB9LCAoXywgaSkgPT4ge1xuICAgICAgY29uc3QgaXNJbmZlY3RlZCA9IFszLCA3LCAxMiwgMTgsIDIzLCAyOV0uaW5jbHVkZXMoaSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpZDogaSxcbiAgICAgICAgc3RhdHVzOiBpc0luZmVjdGVkID8gJ2luZmVjdGVkJyA6ICdjbGVhbicsXG4gICAgICAgIHByb2Nlc3NOYW1lOiBpc0luZmVjdGVkID8gYG1hbHdhcmVfY2x1c3Rlcl8ke2l9LmRsbGAgOiBgc3lzX2tlcm5lbF9wYWdlXyR7aX0uc3lzYCxcbiAgICAgICAgYWRkcmVzczogYDB4N0ZGRl8keyhpICogMTAyNCkudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCkucGFkU3RhcnQoNCwgJzAnKX1gLFxuICAgICAgICBzaXplS2I6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDQwOTYpICsgNTEyXG4gICAgICB9O1xuICAgIH0pO1xuICB9KTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHVuc3ViID0gYWR3YXJlUG9wdXBEZXN0cm95ZXIuc3Vic2NyaWJlKHNldEFkd2FyZVRhcmdldHMpO1xuICAgIHJldHVybiAoKSA9PiB1bnN1YigpO1xuICB9LCBbXSk7XG5cbiAgLy8gMS4gREVLQVBJVEFDSkEgT0tJRU4gSSBQUk9DRVPDk1cgKFRvcE1vc3QgU3RyaXBwZXIgJiBaLU9yZGVyIEVyYWRpY2F0aW9uKVxuICBjb25zdCBoYW5kbGVEZWNhcGl0YXRlQWxsID0gKCkgPT4ge1xuICAgIGNvbnN0IHsga2lsbGVkQ291bnQsIHB1cmdlZEtleXMgfSA9IGFkd2FyZVBvcHVwRGVzdHJveWVyLmtpbGxBbGxBZHdhcmVBbmRQb3B1cHMoKTtcbiAgICBzZXRUb3BNb3N0U3RyaXBwZWRDb3VudChwcmV2ID0+IHByZXYgKyBraWxsZWRDb3VudCk7XG4gICAgXG4gICAgZ25pZGFTZW5zb3JzTWF0cml4LnRyaWdnZXJHbmlkYVJlY29nbml0aW9uKFxuICAgICAgJ1NFTlNPUl9EV01fU0NSRUVOJyxcbiAgICAgICdob3N0aWxlX3BvcHVwX21hdHJpeC5leGUnLFxuICAgICAgOTIxMCxcbiAgICAgICdEZWthcGl0YWNqYSBPa2llbiBQb3B1cCAmIFRvcE1vc3QgU3RyaXBwZXInLFxuICAgICAgYMWaY2nEmXRvIG5hZ8WCw7N3a2kgJHtraWxsZWRDb3VudH0gd3JvZ2ljaCBva2llbiBIV05ELCB1c3VuacSZdG8gV1NfRVhfVE9QTU9TVCBpIHplcm93YW5vIFotT3JkZXIgcHVscGl0dS5gXG4gICAgKTtcblxuICAgIG9uTm90aWZ5KGDinILvuI8gREVLQVBJVEFDSkEgWkFLT8WDQ1pPTkE6IFpsaWt3aWRvd2FubyAke2tpbGxlZENvdW50fSBva2llbiBhZHdhcmUsIHpyZXNldG93YW5vIFotT3JkZXIgaSB3eWN6eXN6Y3pvbm8gJHtwdXJnZWRLZXlzfSB3cGlzw7N3IHJlamVzdHJ1IWApO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNpbmdsZURlY2FwaXRhdGlvbiA9IChpZDogc3RyaW5nLCBuYW1lOiBzdHJpbmcpID0+IHtcbiAgICBhZHdhcmVQb3B1cERlc3Ryb3llci5kZWNhcGl0YXRlVGFyZ2V0KGlkLCAnS0lMTF9HTklEQV9TVFJJS0UnKTtcbiAgICBzZXRUb3BNb3N0U3RyaXBwZWRDb3VudChwcmV2ID0+IHByZXYgKyAxKTtcbiAgICBvbk5vdGlmeShg4pyC77iPIFpkZWthcGl0b3dhbm8gb2tubzogJHtuYW1lfSAoSFdORCB6d29sbmlvbnksIHpyZXNldG93YW5vIHBvenljasSZIGt1cnNvcmEpYCk7XG4gIH07XG5cbiAgLy8gMi4gREVGUkFHTUVOVEFDSkEgR05JRCAmIFBBTUnEmENJIFJBTVxuICBjb25zdCBoYW5kbGVSdW5HbmlkYURlZnJhZ21lbnRhdGlvbiA9ICgpID0+IHtcbiAgICBpZiAoaXNEZWZyYWdtZW50aW5nKSByZXR1cm47XG4gICAgc2V0SXNEZWZyYWdtZW50aW5nKHRydWUpO1xuICAgIHNldERlZnJhZ1Byb2dyZXNzKDApO1xuXG4gICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBzZXREZWZyYWdQcm9ncmVzcyhwcmV2ID0+IHtcbiAgICAgICAgaWYgKHByZXYgPj0gMTAwKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgc2V0SXNEZWZyYWdtZW50aW5nKGZhbHNlKTtcbiAgICAgICAgICBzZXREZWZyYWdDeWNsZXNDb3VudChjID0+IGMgKyAxKTtcbiAgICAgICAgICBzZXRSZWNsYWltZWRSYW1NYihyID0+IE51bWJlcigociArIDQ4LjYpLnRvRml4ZWQoMSkpKTtcbiAgICAgICAgICBcbiAgICAgICAgICAvLyBUdXJuIGFsbCBpbmZlY3RlZCBibG9ja3MgaW50byBkZWZyYWdtZW50ZWQvY2xlYW5cbiAgICAgICAgICBzZXRNZW1vcnlHcmlkKGdyaWQgPT4gZ3JpZC5tYXAoYiA9PiAoe1xuICAgICAgICAgICAgLi4uYixcbiAgICAgICAgICAgIHN0YXR1czogYi5zdGF0dXMgPT09ICdpbmZlY3RlZCcgPyAnZGVmcmFnbWVudGVkJyA6ICdjbGVhbidcbiAgICAgICAgICB9KSkpO1xuXG4gICAgICAgICAgb25Ob3RpZnkoJ/Cfp6kgREVGUkFHTUVOVEFDSkEgR05JRCBVS0/Fg0NaT05BOiBSb3piaXRvIGtsYXN0cnkgbWFsd2FyZSB3IFJBTSwgem9wdHltYWxpem93YW5vIHRhYmxpY2UgZGVza3J5cHRvcsOzdyBpIG9kenlza2FubyA0OC42IE1CIScpO1xuICAgICAgICAgIHJldHVybiAxMDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByZXYgKyAxNTtcbiAgICAgIH0pO1xuICAgIH0sIDE4MCk7XG4gIH07XG5cbiAgLy8gMy4gUFJFVkVOVElWRSBTSElFTEQgVE9HR0xFXG4gIGNvbnN0IHRvZ2dsZVByZXZlbnRpdmVTaGllbGQgPSAoKSA9PiB7XG4gICAgY29uc3QgbmV3U3RhdGUgPSAhcHJldmVudGl2ZVNoaWVsZEFjdGl2ZTtcbiAgICBzZXRQcmV2ZW50aXZlU2hpZWxkQWN0aXZlKG5ld1N0YXRlKTtcbiAgICBpZiAobmV3U3RhdGUpIHtcbiAgICAgIGhleExhc2VyQmFycmllclN5c3RlbS5hY3RpdmF0ZUluc3RhbnRseSgpO1xuICAgICAgb25Ob3RpZnkoJ/Cfm6HvuI8gVEFSQ1pBIFBSRVdFTkNZSk5BOiBXxYLEhWN6b25vIGF1dG9tYXR5Y3puZSBmaWx0cm93YW5pZSBzb2NrZXTDs3cgaSBwcmV3ZW5jasSZIGF1dG9zdGFydHUuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9uTm90aWZ5KCfimqDvuI8gVEFSQ1pBIFBSRVdFTkNZSk5BOiBQcnplxYLEhWN6b25vIHcgdHJ5YiBwYXN5d255LicpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBhY3RpdmVQb3B1cHMgPSBhZHdhcmVUYXJnZXRzLmZpbHRlcih0ID0+ICF0LmlzRGVjYXBpdGF0ZWQpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTYgYW5pbWF0ZS1pbiBmYWRlLWluIGR1cmF0aW9uLTMwMFwiPlxuICAgICAgey8qIEhlYWRlciBCYW5uZXIgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNSByb3VuZGVkLTN4bCBiZy16aW5jLTk1MC85MCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHNoYWRvdy0yeGwgYmFja2Ryb3AtYmx1ci14bCBmbGV4IGZsZXgtY29sIG1kOmZsZXgtcm93IGl0ZW1zLXN0YXJ0IG1kOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTRcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTMuNVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIGJnLXppbmMtOTAwIGJvcmRlciBib3JkZXItYW1iZXItNTAwLzMwIHJvdW5kZWQtMnhsIHRleHQtYW1iZXItNDAwIHNoYWRvdy1tZFwiPlxuICAgICAgICAgICAgPFNoaWVsZCBjbGFzc05hbWU9XCJ3LTYgaC02XCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMi41IGZsZXgtd3JhcFwiPlxuICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LWJvbGQgZm9udC1tb25vIHRleHQtd2hpdGUgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyXCI+XG4gICAgICAgICAgICAgICAgRUtSQU4gMTogUFJFV0VOQ0pBICYgREVLQVBJVEFDSkEgSSBERUZSQUdNRU5UQUNKQSBHTklEXG4gICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIuNSBweS0wLjUgcm91bmRlZC1mdWxsIGJnLXppbmMtOTAwIGJvcmRlciBib3JkZXItYW1iZXItNTAwLzQwIHRleHQtYW1iZXItMzAwIHRleHQtWzEwcHhdIGZvbnQtbW9ubyBmb250LW1lZGl1bVwiPlxuICAgICAgICAgICAgICAgIE1PRFXFgSBPQlJPTk5PLVpBUE9CSUVHQVdDWllcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIGZvbnQtc2FucyBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgVXN1d2FuaWUgYWdyZXN5d255Y2ggZmxhZyBUb3BNb3N0LCB1bmlld2HFvG5pYW5pZSBkZXNrcnlwdG9yw7N3IEhXTkQsIHByZXdlbmN5am5lIHJvemJpamFuaWUgc2tvbmRlbnNvd2FueWNoIHN0cnVrdHVyIG1hbHdhcmUgdyBwYW1pxJljaSBSQU0uXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXt0b2dnbGVQcmV2ZW50aXZlU2hpZWxkfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtNCBweS0yIHJvdW5kZWQteGwgdGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGJvcmRlciB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBzaGFkb3ctbWQgJHtcbiAgICAgICAgICAgICAgcHJldmVudGl2ZVNoaWVsZEFjdGl2ZSBcbiAgICAgICAgICAgICAgICA/ICdiZy16aW5jLTkwMCBib3JkZXItZW1lcmFsZC01MDAvNDAgdGV4dC1lbWVyYWxkLTMwMCcgXG4gICAgICAgICAgICAgICAgOiAnYmctemluYy05NTAgYm9yZGVyLXdoaXRlLzEwIHRleHQtc2xhdGUtNDAwJ1xuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPFNoaWVsZENoZWNrIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1lbWVyYWxkLTQwMFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5UYXJjemEgUHJld2VuY3lqbmE6IHtwcmV2ZW50aXZlU2hpZWxkQWN0aXZlID8gJ0FLVFlXTkEnIDogJ0NaVVdBTklFJ308L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBNYWluIFNwbGl0IEdyaWQ6IDEuIERla2FwaXRhY2phIEFkd2FyZS9Qb3B1cMOzdyB8IDIuIERlZnJhZ21lbnRhY2phIEduaWQgdyBSQU0gKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbGc6Z3JpZC1jb2xzLTIgZ2FwLTVcIj5cbiAgICAgICAgXG4gICAgICAgIHsvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovfVxuICAgICAgICB7LyogU0VLQ0pBIDE6IERFS0FQSVRBQ0pBIEdOSUQgJiBPS0lFTiBQT1BVUCAoVE9QTU9TVCBTVFJJUFBFUikgICAgICAgICAgICAgICAqL31cbiAgICAgICAgey8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC01IHJvdW5kZWQtM3hsIGJnLXppbmMtOTUwLzg1IGJvcmRlciBib3JkZXItd2hpdGUvMTAgc2hhZG93LTJ4bCBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlbiBzcGFjZS15LTRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktM1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gYm9yZGVyLWIgYm9yZGVyLXdoaXRlLzEwIHBiLTNcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMi41XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC14bCBiZy16aW5jLTkwMCBib3JkZXIgYm9yZGVyLXJvc2UtNTAwLzMwIHRleHQtcm9zZS00MDBcIj5cbiAgICAgICAgICAgICAgICAgIDxTY2lzc29ycyBjbGFzc05hbWU9XCJ3LTUgaC01XCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTEwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZVwiPlxuICAgICAgICAgICAgICAgICAgICBEZWthcGl0YWNqYSBPa2llbiBIV05EICYgVG9wTW9zdFxuICAgICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICAgICAgICAgIMWaY2luYW5pZSBmbGFnIFdTX0VYX1RPUE1PU1QsIHplcm93YW5pZSBaLU9yZGVyIGkgdXdhbG5pYW5pZSBrdXJzb3JhIG15c3p5LlxuICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0yLjUgcHktMSByb3VuZGVkLWZ1bGwgYmctcm9zZS05NTAvNzAgYm9yZGVyIGJvcmRlci1yb3NlLTUwMC80MCB0ZXh0LXJvc2UtMzAwIHRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgIHthY3RpdmVQb3B1cHMubGVuZ3RofSBBa3R5d255Y2hcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBNZXRyaWNzIFRlbGVtZXRyeSAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMyBnYXAtMiB0ZXh0LWNlbnRlciBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIuNSByb3VuZGVkLTJ4bCBiZy16aW5jLTkwMC85MCBib3JkZXIgYm9yZGVyLXdoaXRlLzVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZVwiPsWaY2nEmXRlIFRvcE1vc3Q8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJsYWNrIHRleHQtcm9zZS0zMDAgbXQtMC41XCI+e3RvcE1vc3RTdHJpcHBlZENvdW50fTwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIuNSByb3VuZGVkLTJ4bCBiZy16aW5jLTkwMC85MCBib3JkZXIgYm9yZGVyLXdoaXRlLzVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZVwiPlVuaWV3YcW8bmlvbmUgSFdORDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtYmxhY2sgdGV4dC1hbWJlci0zMDAgbXQtMC41XCI+e3RvcE1vc3RTdHJpcHBlZENvdW50ICogM308L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yLjUgcm91bmRlZC0yeGwgYmctemluYy05MDAvOTAgYm9yZGVyIGJvcmRlci13aGl0ZS81XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCB1cHBlcmNhc2VcIj5DemFzIFJlYWtjamk8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJsYWNrIHRleHQtZW1lcmFsZC00MDAgbXQtMC41XCI+MC4wIG1zPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBMaXN0IG9mIERldGVjdGVkIEhvc3RpbGUgUG9wdXBzICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTIgbWF4LWgtNTYgb3ZlcmZsb3cteS1hdXRvIHByLTFcIj5cbiAgICAgICAgICAgICAge2FjdGl2ZVBvcHVwcy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC0yeGwgYmctemluYy05MDAvNDAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTUwMC8yMCB0ZXh0LWNlbnRlciB0ZXh0LXhzIHRleHQtZW1lcmFsZC0zMDAgZm9udC1tb25vIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICA8Q2hlY2tDaXJjbGUyIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1lbWVyYWxkLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5Xc3p5c3RraWUgd3JvZ2llIG9rbmEgem9zdGHFgnkgxZtjacSZdGUgaSB6bmV1dHJhbGl6b3dhbmUuIFB1bHBpdCBiZXpwaWVjem55Ljwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICBhY3RpdmVQb3B1cHMubWFwKChwb3B1cCkgPT4gKFxuICAgICAgICAgICAgICAgICAgPGRpdiBcbiAgICAgICAgICAgICAgICAgICAga2V5PXtwb3B1cC5pZH1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQtMnhsIGJnLXppbmMtOTAwLzgwIGJvcmRlciBib3JkZXItcm9zZS01MDAvMjAgaG92ZXI6Ym9yZGVyLXJvc2UtNTAwLzQwIHRyYW5zaXRpb24tYWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMyB0ZXh0LXhzIGZvbnQtbW9ub1wiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0wLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1zbGF0ZS0yMDBcIj57cG9wdXAudGl0bGV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bOXB4XSBweC0xLjUgcHktMC4yIHJvdW5kZWQgYmctcm9zZS05NTAgdGV4dC1yb3NlLTMwMCBib3JkZXIgYm9yZGVyLXJvc2UtODAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFBJRDoge3BvcHVwLnBpZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIGZvbnQtc2Fuc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgSFdORDogPGNvZGUgY2xhc3NOYW1lPVwidGV4dC1hbWJlci0zMDAgZm9udC1tb25vXCI+e3BvcHVwLmh3bmR9PC9jb2RlPiDigKIgVHlwOiA8Y29kZSBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTMwMCBmb250LW1vbm9cIj57cG9wdXAucG9wdXBUeXBlfTwvY29kZT5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVNpbmdsZURlY2FwaXRhdGlvbihwb3B1cC5pZCwgcG9wdXAudGl0bGUpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIuNSBweS0xLjUgcm91bmRlZC14bCBiZy16aW5jLTk1MCBob3ZlcjpiZy1yb3NlLTk1MCBib3JkZXIgYm9yZGVyLXJvc2UtNTAwLzQwIHRleHQtcm9zZS0zMDAgdGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGN1cnNvci1wb2ludGVyIHRyYW5zaXRpb24tYWxsIHNocmluay0wXCJcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIsWabmlqIHRvIG9rbm8gaSB1c3XFhCBmbGFnxJkgVG9wTW9zdFwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8U2Npc3NvcnMgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1yb3NlLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+xZpuaWo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKSlcbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIEFjdGlvbiBUcmlnZ2VyIEJ1dHRvbiAqL31cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVEZWNhcGl0YXRlQWxsfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB5LTMuNSBweC00IHJvdW5kZWQtMnhsIGJnLXppbmMtOTAwIGhvdmVyOmJnLXppbmMtODAwIGJvcmRlciBib3JkZXItcm9zZS01MDAvNDAgaG92ZXI6Ym9yZGVyLXJvc2UtNDAwIHRleHQtcm9zZS0yMDAgaG92ZXI6dGV4dC13aGl0ZSBmb250LW1vbm8gZm9udC1ib2xkIHRleHQteHMgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIgc2hhZG93LXhsIGFjdGl2ZTp0cmFuc2xhdGUteS0wLjUgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxTY2lzc29ycyBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcm9zZS00MDBcIiAvPlxuICAgICAgICAgICAgPHNwYW4+V1lLT05BSiBNQVNPV8SEIERFS0FQSVRBQ0rEmCBXU1pZU1RLSUNIIE9LSUVOIChUT1BNT1NUIFNUUklQUEVSKTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi99XG4gICAgICAgIHsvKiBTRUtDSkEgMjogREVGUkFHTUVOVEFDSkEgR05JRCAmIE9DWllTWkNaQU5JRSBSQU0gRERSNSAgICAgICAgICAgICAgICAgICAgICovfVxuICAgICAgICB7LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTUgcm91bmRlZC0zeGwgYmctemluYy05NTAvODUgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCBzaGFkb3ctMnhsIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuIHNwYWNlLXktNFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBib3JkZXItYiBib3JkZXItd2hpdGUvMTAgcGItM1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yLjVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMiByb3VuZGVkLXhsIGJnLXppbmMtOTAwIGJvcmRlciBib3JkZXItY3lhbi01MDAvMzAgdGV4dC1jeWFuLTQwMFwiPlxuICAgICAgICAgICAgICAgICAgPEhhcmREcml2ZSBjbGFzc05hbWU9XCJ3LTUgaC01XCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTEwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZVwiPlxuICAgICAgICAgICAgICAgICAgICBEZWZyYWdtZW50YWNqYSBHbmlkICYgUGFtacSZY2kgUkFNXG4gICAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgUm96YmlqYW5pZSBza2xlam9ueWNoIGtsYXN0csOzdyBtYWx3YXJlIHcgUkFNIEREUjUgaSBjenlzemN6ZW5pZSBzdHJvbiBwYW1pxJljaS5cbiAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMi41IHB5LTEgcm91bmRlZC1mdWxsIGJnLWN5YW4tOTUwLzcwIGJvcmRlciBib3JkZXItY3lhbi01MDAvNDAgdGV4dC1jeWFuLTMwMCB0ZXh0LXhzIGZvbnQtbW9ubyBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICB7ZGVmcmFnQ3ljbGVzQ291bnR9IEN5a2xpIFd5a29uYW55Y2hcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBUZWxlbWV0cnkgTnVtYmVycyAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMyBnYXAtMiB0ZXh0LWNlbnRlciBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIuNSByb3VuZGVkLTJ4bCBiZy16aW5jLTkwMC85MCBib3JkZXIgYm9yZGVyLXdoaXRlLzVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZVwiPk9kenlza2FueSBSQU08L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJsYWNrIHRleHQtY3lhbi0zMDAgbXQtMC41XCI+e3JlY2xhaW1lZFJhbU1ifSBNQjwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIuNSByb3VuZGVkLTJ4bCBiZy16aW5jLTkwMC85MCBib3JkZXIgYm9yZGVyLXdoaXRlLzVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZVwiPlN0YW4gUGFtacSZY2k8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJsYWNrIHRleHQtZW1lcmFsZC00MDAgbXQtMC41XCI+Wk9QVFlNQUxJWk9XQU5ZPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMi41IHJvdW5kZWQtMnhsIGJnLXppbmMtOTAwLzkwIGJvcmRlciBib3JkZXItd2hpdGUvNVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDAgdXBwZXJjYXNlXCI+SW50ZWdyYWxub8WbxIcgU3Ryb248L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJsYWNrIHRleHQtYW1iZXItMzAwIG10LTAuNVwiPjEwMC4wJTwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogSW50ZXJhY3RpdmUgTWVtb3J5IEJsb2NrIFZpc3VhbGl6YXRpb24gR3JpZCAoMzIgYmxvY2tzKSAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC1bMTBweF0gZm9udC1tb25vIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+TWFjaWVyeiBTdHJvbiBQYW1pxJljaSBERFI1ICgzMiBLbGFzdHJ5KTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj48c3BhbiBjbGFzc05hbWU9XCJ3LTIgaC0yIHJvdW5kZWQgYmctZW1lcmFsZC01MDAgaW5saW5lLWJsb2NrXCIgLz4gQ3p5c3RlPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj48c3BhbiBjbGFzc05hbWU9XCJ3LTIgaC0yIHJvdW5kZWQgYmctcm9zZS01MDAgaW5saW5lLWJsb2NrXCIgLz4gU2thxbxvbmUgR25pZMSFPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj48c3BhbiBjbGFzc05hbWU9XCJ3LTIgaC0yIHJvdW5kZWQgYmctY3lhbi00MDAgaW5saW5lLWJsb2NrXCIgLz4gWmRlZnJhZ21lbnRvd2FuZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy04IGdhcC0xLjUgcC0zIHJvdW5kZWQtMnhsIGJnLXppbmMtOTAwLzgwIGJvcmRlciBib3JkZXItd2hpdGUvNVwiPlxuICAgICAgICAgICAgICAgIHttZW1vcnlHcmlkLm1hcCgoYmxvY2spID0+IChcbiAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAga2V5PXtibG9jay5pZH1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgaC03IHJvdW5kZWQtbGcgYm9yZGVyIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGZvbnQtbW9ubyB0ZXh0LVs5cHhdIGZvbnQtYm9sZCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItaGVscCAke1xuICAgICAgICAgICAgICAgICAgICAgIGJsb2NrLnN0YXR1cyA9PT0gJ2luZmVjdGVkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctcm9zZS05NTAvODAgYm9yZGVyLXJvc2UtNTAwIHRleHQtcm9zZS0yMDAgYW5pbWF0ZS1wdWxzZSdcbiAgICAgICAgICAgICAgICAgICAgICAgIDogYmxvY2suc3RhdHVzID09PSAnZGVmcmFnbWVudGVkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctY3lhbi05NTAvODAgYm9yZGVyLWN5YW4tNDAwIHRleHQtY3lhbi0yMDAnXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy16aW5jLTk1MCBib3JkZXItd2hpdGUvMTAgdGV4dC1zbGF0ZS00MDAgaG92ZXI6Ym9yZGVyLWVtZXJhbGQtNTAwLzQwIGhvdmVyOnRleHQtZW1lcmFsZC0zMDAnXG4gICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICB0aXRsZT17YCR7YmxvY2sucHJvY2Vzc05hbWV9ICgke2Jsb2NrLmFkZHJlc3N9KSAtICR7YmxvY2suc2l6ZUtifSBLQmB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtibG9jay5pZC50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyl9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBBY3Rpb24gVHJpZ2dlciBCdXR0b24gd2l0aCBQcm9ncmVzcyBCYXIgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICAgIHtpc0RlZnJhZ21lbnRpbmcgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBiZy16aW5jLTkwMCByb3VuZGVkLWZ1bGwgaC0yIG92ZXJmbG93LWhpZGRlbiBib3JkZXIgYm9yZGVyLXdoaXRlLzEwXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLWN5YW4tNDAwIGgtZnVsbCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0xNTBcIlxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgd2lkdGg6IGAke2RlZnJhZ1Byb2dyZXNzfSVgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVJ1bkduaWRhRGVmcmFnbWVudGF0aW9ufVxuICAgICAgICAgICAgICBkaXNhYmxlZD17aXNEZWZyYWdtZW50aW5nfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHktMy41IHB4LTQgcm91bmRlZC0yeGwgYmctemluYy05MDAgaG92ZXI6YmctemluYy04MDAgYm9yZGVyIGJvcmRlci1jeWFuLTUwMC80MCBob3Zlcjpib3JkZXItY3lhbi00MDAgdGV4dC1jeWFuLTIwMCBob3Zlcjp0ZXh0LXdoaXRlIGZvbnQtbW9ubyBmb250LWJvbGQgdGV4dC14cyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiBzaGFkb3cteGwgYWN0aXZlOnRyYW5zbGF0ZS15LTAuNSB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBkaXNhYmxlZDpvcGFjaXR5LTUwXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFJlZnJlc2hDdyBjbGFzc05hbWU9e2B3LTQgaC00IHRleHQtY3lhbi00MDAgJHtpc0RlZnJhZ21lbnRpbmcgPyAnYW5pbWF0ZS1zcGluJyA6ICcnfWB9IC8+XG4gICAgICAgICAgICAgIDxzcGFuPntpc0RlZnJhZ21lbnRpbmcgPyBgREVGUkFHTUVOVEFDSkEgVyBUT0tVICgke2RlZnJhZ1Byb2dyZXNzfSUpLi4uYCA6ICdST1pQT0NaTklKIERFRlJBR01FTlRBQ0rEmCBHTklEIFcgUkFNIChDT01QQUNUIE1FTU9SWSknfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUFxSFk7QUFySFosU0FBZ0IsVUFBVSxpQkFBaUI7QUFDM0M7QUFBQSxFQUNFO0FBQUEsRUFBYTtBQUFBLEVBQVU7QUFBQSxFQUFXO0FBQUEsRUFDYjtBQUFBLEVBQ2tCO0FBQUEsT0FDbEM7QUFDUCxTQUFTLDRCQUE0QjtBQUNyQyxTQUFTLDZCQUE2QjtBQUN0QyxTQUFTLDBCQUEwQjtBQVc1QixhQUFNLDZCQUE0RSxDQUFDLEVBQUUsU0FBUyxNQUFNO0FBQ3pHLFFBQU0sQ0FBQyxlQUFlLGdCQUFnQixJQUFJLFNBQThCLE1BQU0scUJBQXFCLFdBQVcsQ0FBQztBQUMvRyxRQUFNLENBQUMsaUJBQWlCLGtCQUFrQixJQUFJLFNBQWtCLEtBQUs7QUFDckUsUUFBTSxDQUFDLGdCQUFnQixpQkFBaUIsSUFBSSxTQUFpQixHQUFHO0FBQ2hFLFFBQU0sQ0FBQyx3QkFBd0IseUJBQXlCLElBQUksU0FBa0IsSUFBSTtBQUNsRixRQUFNLENBQUMsc0JBQXNCLHVCQUF1QixJQUFJLFNBQWlCLEVBQUU7QUFDM0UsUUFBTSxDQUFDLG1CQUFtQixvQkFBb0IsSUFBSSxTQUFpQixDQUFDO0FBQ3BFLFFBQU0sQ0FBQyxnQkFBZ0IsaUJBQWlCLElBQUksU0FBaUIsS0FBSztBQUdsRSxRQUFNLENBQUMsWUFBWSxhQUFhLElBQUksU0FBd0IsTUFBTTtBQUNoRSxXQUFPLE1BQU0sS0FBSyxFQUFFLFFBQVEsR0FBRyxHQUFHLENBQUMsR0FBRyxNQUFNO0FBQzFDLFlBQU0sYUFBYSxDQUFDLEdBQUcsR0FBRyxJQUFJLElBQUksSUFBSSxFQUFFLEVBQUUsU0FBUyxDQUFDO0FBQ3BELGFBQU87QUFBQSxRQUNMLElBQUk7QUFBQSxRQUNKLFFBQVEsYUFBYSxhQUFhO0FBQUEsUUFDbEMs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