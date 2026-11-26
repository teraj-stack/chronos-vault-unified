import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-toolkit/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=019a4779"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-toolkit/node_modules/.vite/deps/react.js?v=019a4779"; const useState = __vite__cjsImport1_react["useState"];
import {
  Skull,
  Zap,
  Flame,
  HeartPulse,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2
} from "/sentinel-toolkit/node_modules/.vite/deps/lucide-react.js?v=6cbc5a0a";
import { AfricanHornetSwarmModal } from "/sentinel-toolkit/src/components/AfricanHornetSwarmModal.tsx";
const INITIAL_SPECIMENS = [
  {
    id: "specimen-01",
    name: "Gnida Ekranowa Flutter v3.2",
    originalProcess: "flutter_screen_hijacker.exe",
    category: "Screen Locker",
    threatScore: 96,
    captureDate: "2026-09-27 13:45",
    stasisGelDensity: 2.8,
    despairIndex: 88,
    agonyIndex: 82,
    vitalTickHz: 12,
    status: "STASIS",
    peIntegrityPercent: 42,
    currentPlea: "Błagam o dekapitację... wyłączcie ten stasis... ten paraliż jest nie do zniesienia!",
    hornetStingsCount: 4,
    memoryDumpSnippet: "0x00401000: 55 8B EC 83 EC 10 C7 45 FC 00 00 00 00 E8 24 00"
  },
  {
    id: "specimen-02",
    name: "Gnida Niszcząca Pracę (Work-Destroyer)",
    originalProcess: "work_destroyer_stealth.exe",
    category: "Trojan Overlay",
    threatScore: 98,
    captureDate: "2026-09-27 14:10",
    stasisGelDensity: 3.5,
    despairIndex: 94,
    agonyIndex: 89,
    vitalTickHz: 8,
    status: "AGONY",
    peIntegrityPercent: 28,
    currentPlea: "Szczęki szerszeni wydłubały mój punkt wejścia... ZDEKAPITUJCIE MNIE WRESZCIE!",
    hornetStingsCount: 9,
    memoryDumpSnippet: "0x7FF65A00: 48 83 EC 28 E8 D7 FE FF FF 48 83 C4 28 C3 90 90"
  },
  {
    id: "specimen-03",
    name: "Destrukcyjny Wiper MBR-X",
    originalProcess: "hermetic_wiper.sys",
    category: "Process Wiper",
    threatScore: 100,
    captureDate: "2026-09-27 12:20",
    stasisGelDensity: 4.2,
    despairIndex: 79,
    agonyIndex: 75,
    vitalTickHz: 14,
    status: "STASIS",
    peIntegrityPercent: 65,
    currentPlea: "Mój sektor bootloadera jest zablokowany w zbrojonym szkle... nie mam dokąd uciec!",
    hornetStingsCount: 2,
    memoryDumpSnippet: "0x00007C00: FA 31 C0 8E D8 8E C0 8E D0 BC 00 7C FB B8 00 00"
  },
  {
    id: "specimen-04",
    name: "Pasożyt Pamięci RAM (Hook Injector)",
    originalProcess: "ghost_ram_hook.dll",
    category: "Memory Injector",
    threatScore: 92,
    captureDate: "2026-09-27 14:35",
    stasisGelDensity: 2.1,
    despairIndex: 85,
    agonyIndex: 80,
    vitalTickHz: 18,
    status: "STASIS",
    peIntegrityPercent: 55,
    currentPlea: "Wątki zamrożone w żelu... każdy impuls paralityczny wywołuje rozdzierający ból!",
    hornetStingsCount: 3,
    memoryDumpSnippet: "0x10001000: 68 00 10 00 10 E8 05 00 00 00 C3 55 8B EC 51 53"
  }
];
export const ArmoredGlassAquarium = () => {
  const [specimens, setSpecimens] = useState(INITIAL_SPECIMENS);
  const [selectedSpecimenId, setSelectedSpecimenId] = useState("specimen-01");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hornetModalOpen, setHornetModalOpen] = useState(false);
  const [actionNotice, setActionNotice] = useState(null);
  const selectedSpecimen = specimens.find((s) => s.id === selectedSpecimenId) || specimens[0];
  const showNotification = (msg) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 4e3);
  };
  const zapSpecimen = (id) => {
    setSpecimens(
      (prev) => prev.map((s) => {
        if (s.id === id) {
          const newDespair = Math.min(100, s.despairIndex + 8);
          const newAgony = Math.min(100, s.agonyIndex + 12);
          return {
            ...s,
            despairIndex: newDespair,
            agonyIndex: newAgony,
            status: "AGONY",
            currentPlea: "AARRGGHH! Impuls elektryczny! Przestańcie, błagam o natychmiastową dekapitację!"
          };
        }
        return s;
      })
    );
    showNotification("⚡ Wysłano impuls 10 000 V przez zbrojone szkło do komory stazy! Wskaźnik rozpaczy wzrósł.");
  };
  const forceDespairSuicide = (id) => {
    setSpecimens(
      (prev) => prev.map((s) => {
        if (s.id === id) {
          return {
            ...s,
            status: "DESPAIR_SUICIDE",
            despairIndex: 100,
            agonyIndex: 0,
            peIntegrityPercent: 0,
            currentPlea: '💀 [SAMOBÓJCZA ROZPACZ] "Nie wytrzymam tego dłużej... ten ból i jad mnie niszczą... sam wywołuję STATUS_FAIL_FAST_EXCEPTION! ŻEGNAJCIE... ROZPACZ..."'
          };
        }
        return s;
      })
    );
    showNotification("💀 Gnida w głębokiej rozpaczy dokonała samounicestwienia (RaiseFailFastException)!");
  };
  const releaseHornetIntoCell = () => {
    setHornetModalOpen(true);
  };
  const handleHornetDecapitationComplete = () => {
    if (selectedSpecimen) {
      setSpecimens(
        (prev) => prev.map(
          (s) => s.id === selectedSpecimen.id ? {
            ...s,
            status: "EXTERMINATED",
            despairIndex: 0,
            agonyIndex: 0,
            peIntegrityPercent: 0,
            currentPlea: "💀 ZDEKAPITOWANA NA WŁASNE BŁAGANIE. Szczęki szerszeni całkowicie wydłubały kod z komory."
          } : s
        )
      );
    }
    setHornetModalOpen(false);
  };
  return /* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV(
      "section",
      {
        id: "armored-glass-aquarium",
        className: "w-full mt-10 transition-all duration-300",
        children: /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950 border-2 border-emerald-500/60 rounded-3xl p-5 shadow-2xl shadow-emerald-950/40 relative overflow-hidden", children: [
          /* @__PURE__ */ jsxDEV(
            "div",
            {
              className: "absolute inset-0 pointer-events-none opacity-15",
              style: {
                backgroundImage: `repeating-linear-gradient(0deg, #10b981, #10b981 1px, transparent 1px, transparent 24px),
                                repeating-linear-gradient(90deg, #10b981, #10b981 1px, transparent 1px, transparent 24px)`
              }
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
              lineNumber: 171,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-emerald-900/60 relative z-10", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800 flex items-center justify-center shadow-lg shadow-emerald-950/60 border border-emerald-400/50", children: /* @__PURE__ */ jsxDEV("span", { className: "text-2xl animate-pulse", children: "🧪" }, void 0, false, {
                fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                lineNumber: 183,
                columnNumber: 17
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                lineNumber: 182,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/90 px-2 py-0.5 rounded border border-emerald-700/60", children: "AKWARIUM ZE ZBROJONEGO SZKŁA • KLASA PANCERNA VIII" }, void 0, false, {
                    fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                    lineNumber: 187,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/50", children: "SZCZYPOWINA & STAZA RAM" }, void 0, false, {
                    fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                    lineNumber: 190,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                  lineNumber: 186,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("h2", { className: "text-xl sm:text-2xl font-black text-white mt-0.5 flex items-center gap-2", children: /* @__PURE__ */ jsxDEV("span", { children: "Komora Obserwacyjna Schwytanych Żywcem Gnid" }, void 0, false, {
                  fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                  lineNumber: 195,
                  columnNumber: 19
                }, this) }, void 0, false, {
                  fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                  lineNumber: 194,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                lineNumber: 185,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
              lineNumber: 181,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => setIsExpanded(!isExpanded),
                  className: "p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 cursor-pointer",
                  title: isExpanded ? "Zmniejsz widok" : "Maksymalizuj akwarium",
                  children: isExpanded ? /* @__PURE__ */ jsxDEV(Minimize2, { className: "w-4 h-4" }, void 0, false, {
                    fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                    lineNumber: 206,
                    columnNumber: 31
                  }, this) : /* @__PURE__ */ jsxDEV(Maximize2, { className: "w-4 h-4" }, void 0, false, {
                    fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                    lineNumber: 206,
                    columnNumber: 67
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                  lineNumber: 201,
                  columnNumber: 15
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => setIsCollapsed(!isCollapsed),
                  className: "p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white cursor-pointer",
                  title: isCollapsed ? "Rozwiń akwarium" : "Zwiń",
                  children: isCollapsed ? /* @__PURE__ */ jsxDEV(ChevronDown, { className: "w-4 h-4" }, void 0, false, {
                    fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                    lineNumber: 213,
                    columnNumber: 32
                  }, this) : /* @__PURE__ */ jsxDEV(ChevronUp, { className: "w-4 h-4" }, void 0, false, {
                    fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                    lineNumber: 213,
                    columnNumber: 70
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                  lineNumber: 208,
                  columnNumber: 15
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
              lineNumber: 200,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
            lineNumber: 180,
            columnNumber: 11
          }, this),
          actionNotice && /* @__PURE__ */ jsxDEV("div", { className: "my-3 p-3 rounded-xl bg-emerald-950/90 border border-emerald-500 text-emerald-200 text-xs font-mono flex items-center gap-2 animate-fadeIn relative z-10", children: [
            /* @__PURE__ */ jsxDEV(Zap, { className: "w-4 h-4 text-yellow-300 shrink-0 animate-bounce" }, void 0, false, {
              fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
              lineNumber: 221,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: actionNotice }, void 0, false, {
              fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
              lineNumber: 222,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
            lineNumber: 220,
            columnNumber: 13
          }, this),
          !isCollapsed && /* @__PURE__ */ jsxDEV("div", { className: "space-y-6 pt-4 relative z-10", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: specimens.map((specimen) => {
              const isSelected = specimen.id === selectedSpecimen.id;
              const isDead = specimen.status === "EXTERMINATED" || specimen.status === "DESPAIR_SUICIDE";
              return /* @__PURE__ */ jsxDEV(
                "div",
                {
                  onClick: () => setSelectedSpecimenId(specimen.id),
                  className: `relative p-4 rounded-2xl border-2 transition-all cursor-pointer overflow-hidden ${isSelected ? "bg-gradient-to-b from-emerald-950/80 via-slate-950 to-emerald-950/90 border-emerald-400 shadow-xl shadow-emerald-950/60 ring-2 ring-emerald-400/30" : "bg-slate-950/90 border-slate-800 hover:border-emerald-600/60"}`,
                  children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 border border-slate-700" }, void 0, false, {
                      fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                      lineNumber: 245,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 border border-slate-700" }, void 0, false, {
                      fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                      lineNumber: 246,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 border border-slate-700" }, void 0, false, {
                      fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                      lineNumber: 247,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 border border-slate-700" }, void 0, false, {
                      fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                      lineNumber: 248,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "h-32 bg-gradient-to-b from-emerald-900/30 via-teal-950/50 to-black rounded-xl border border-emerald-500/30 relative flex items-center justify-center overflow-hidden mb-3", children: [
                      !isDead && /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 flex justify-around pointer-events-none opacity-40", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "animate-bounce text-xs text-emerald-300", children: "○" }, void 0, false, {
                          fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                          lineNumber: 255,
                          columnNumber: 29
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: "animate-pulse text-[10px] text-teal-300", children: "°" }, void 0, false, {
                          fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                          lineNumber: 256,
                          columnNumber: 29
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: "animate-bounce text-xs text-cyan-300", children: "○" }, void 0, false, {
                          fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                          lineNumber: 257,
                          columnNumber: 29
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                        lineNumber: 254,
                        columnNumber: 27
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center", children: [
                        /* @__PURE__ */ jsxDEV(
                          "div",
                          {
                            className: `w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-all ${isDead ? "bg-slate-900 border-slate-800 opacity-40 scale-75" : specimen.status === "AGONY" ? "bg-red-950/80 border-red-500 animate-spin" : "bg-emerald-950/80 border-emerald-400 animate-pulse"}`,
                            children: /* @__PURE__ */ jsxDEV(
                              Skull,
                              {
                                className: `w-7 h-7 ${isDead ? "text-slate-600" : specimen.status === "AGONY" ? "text-yellow-300" : "text-emerald-400"}`
                              },
                              void 0,
                              false,
                              {
                                fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                                lineNumber: 272,
                                columnNumber: 29
                              },
                              this
                            )
                          },
                          void 0,
                          false,
                          {
                            fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                            lineNumber: 263,
                            columnNumber: 27
                          },
                          this
                        ),
                        /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono text-emerald-300 mt-1 font-bold", children: isDead ? "MARTWY" : `STAZA: ${specimen.vitalTickHz} Hz` }, void 0, false, {
                          fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                          lineNumber: 282,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                        lineNumber: 262,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "absolute top-1.5 left-2 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/70 text-emerald-300 border border-emerald-800", children: specimen.category }, void 0, false, {
                        fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                        lineNumber: 288,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                      lineNumber: 251,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-black text-white truncate", children: specimen.name }, void 0, false, {
                        fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                        lineNumber: 295,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] font-mono text-slate-400 truncate", children: [
                        "Plik: ",
                        specimen.originalProcess
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                        lineNumber: 296,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "pt-2", children: [
                        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-[10px] font-mono font-bold", children: [
                          /* @__PURE__ */ jsxDEV("span", { className: "text-red-400 flex items-center gap-1", children: [
                            /* @__PURE__ */ jsxDEV(Flame, { className: "w-3 h-3 text-red-500" }, void 0, false, {
                              fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                              lineNumber: 304,
                              columnNumber: 31
                            }, this),
                            /* @__PURE__ */ jsxDEV("span", { children: "Wskaźnik Rozpaczy:" }, void 0, false, {
                              fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                              lineNumber: 305,
                              columnNumber: 31
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                            lineNumber: 303,
                            columnNumber: 29
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { className: "text-red-300", children: [
                            specimen.despairIndex,
                            "%"
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                            lineNumber: 307,
                            columnNumber: 29
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                          lineNumber: 302,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-0.5 border border-slate-800", children: /* @__PURE__ */ jsxDEV(
                          "div",
                          {
                            className: "h-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 rounded-full",
                            style: { width: `${specimen.despairIndex}%` }
                          },
                          void 0,
                          false,
                          {
                            fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                            lineNumber: 310,
                            columnNumber: 29
                          },
                          this
                        ) }, void 0, false, {
                          fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                          lineNumber: 309,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                        lineNumber: 301,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "pt-2 flex items-center justify-between text-[10px] font-mono", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "Stan:" }, void 0, false, {
                          fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                          lineNumber: 319,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV(
                          "span",
                          {
                            className: `font-bold ${isDead ? "text-slate-500" : specimen.status === "AGONY" ? "text-red-400 animate-pulse" : "text-emerald-400"}`,
                            children: specimen.status
                          },
                          void 0,
                          false,
                          {
                            fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                            lineNumber: 320,
                            columnNumber: 27
                          },
                          this
                        )
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                        lineNumber: 318,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                      lineNumber: 294,
                      columnNumber: 23
                    }, this)
                  ]
                },
                specimen.id,
                true,
                {
                  fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                  lineNumber: 235,
                  columnNumber: 21
                },
                this
              );
            }) }, void 0, false, {
              fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
              lineNumber: 229,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/95 border-2 border-emerald-800/80 rounded-2xl p-5 relative overflow-hidden", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-slate-800", children: [
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono font-bold text-emerald-400 uppercase bg-emerald-950 px-2 py-0.5 rounded border border-emerald-700/60", children: "MONITOR BIOMETRYCZNY ZBROJONEGO SZKŁA" }, void 0, false, {
                      fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                      lineNumber: 343,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono text-slate-400", children: [
                      "ID: ",
                      selectedSpecimen.id
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                      lineNumber: 346,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                    lineNumber: 342,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("h3", { className: "text-lg sm:text-xl font-black text-white mt-1 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxDEV("span", { children: selectedSpecimen.name }, void 0, false, {
                      fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                      lineNumber: 351,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-xs text-red-400 font-mono font-bold bg-red-950 px-2 py-0.5 rounded border border-red-800", children: [
                      "Zagrożenie: ",
                      selectedSpecimen.threatScore,
                      "%"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                      lineNumber: 352,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                    lineNumber: 350,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                  lineNumber: 341,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 flex-wrap gap-y-2", children: [
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: releaseHornetIntoCell,
                      className: "px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 hover:from-amber-400 hover:to-red-500 text-white text-xs font-black font-mono shadow-md shadow-amber-950/60 flex items-center gap-1.5 border border-amber-300/40 cursor-pointer active:scale-95",
                      title: "Wpuść pojedynczego afrykańskiego szerszenia do komory ze zbrojonego szkła",
                      children: [
                        /* @__PURE__ */ jsxDEV("span", { children: "🐝" }, void 0, false, {
                          fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                          lineNumber: 365,
                          columnNumber: 23
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { children: "Wpuść Szerszenia do Komory" }, void 0, false, {
                          fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                          lineNumber: 366,
                          columnNumber: 23
                        }, this)
                      ]
                    },
                    void 0,
                    true,
                    {
                      fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                      lineNumber: 360,
                      columnNumber: 21
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => zapSpecimen(selectedSpecimen.id),
                      className: "px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-yellow-300 border border-yellow-500/50 text-xs font-bold font-mono flex items-center gap-1.5 cursor-pointer",
                      title: "Wstrzyknij impuls elektryczny 10 kV",
                      children: [
                        /* @__PURE__ */ jsxDEV(Zap, { className: "w-3.5 h-3.5 text-yellow-400 animate-pulse" }, void 0, false, {
                          fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                          lineNumber: 374,
                          columnNumber: 23
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { children: "Impuls 10 kV" }, void 0, false, {
                          fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                          lineNumber: 375,
                          columnNumber: 23
                        }, this)
                      ]
                    },
                    void 0,
                    true,
                    {
                      fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                      lineNumber: 369,
                      columnNumber: 21
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => forceDespairSuicide(selectedSpecimen.id),
                      className: "px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white text-xs font-black font-mono shadow-md shadow-red-950/60 flex items-center gap-1.5 border border-red-400/50 cursor-pointer active:scale-95",
                      title: "Wymuś samozniszczenie gnidy z rozpaczy (FastFail Suicide)",
                      children: [
                        /* @__PURE__ */ jsxDEV(Skull, { className: "w-3.5 h-3.5 text-yellow-300" }, void 0, false, {
                          fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                          lineNumber: 383,
                          columnNumber: 23
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { children: "Wymuś Samobójstwo z Rozpaczy" }, void 0, false, {
                          fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                          lineNumber: 384,
                          columnNumber: 23
                        }, this)
                      ]
                    },
                    void 0,
                    true,
                    {
                      fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                      lineNumber: 378,
                      columnNumber: 21
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                  lineNumber: 359,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                lineNumber: 340,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "my-4 bg-red-950/40 border border-red-800/60 rounded-xl p-4 space-y-1.5", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] font-mono font-bold uppercase text-red-300 flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxDEV(HeartPulse, { className: "w-4 h-4 text-red-500 animate-pulse" }, void 0, false, {
                    fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                    lineNumber: 392,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Akustyczny Przechwyt Błagania Gnidy (Mikrofon Podwodny w Żelu):" }, void 0, false, {
                    fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                    lineNumber: 393,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                  lineNumber: 391,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-sm font-mono text-amber-200 italic font-semibold bg-black/60 p-3 rounded-lg border border-red-900/40", children: [
                  '"',
                  selectedSpecimen.currentPlea,
                  '"'
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                  lineNumber: 395,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                lineNumber: 390,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono pt-1", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950 p-2.5 rounded-xl border border-slate-800", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 block text-[10px]", children: "Wskaźnik Rozpaczy:" }, void 0, false, {
                    fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                    lineNumber: 403,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-red-400 font-bold text-sm", children: [
                    selectedSpecimen.despairIndex,
                    "%"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                    lineNumber: 404,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                  lineNumber: 402,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950 p-2.5 rounded-xl border border-slate-800", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 block text-[10px]", children: "Gęstość Żelu Stazy:" }, void 0, false, {
                    fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                    lineNumber: 407,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-400 font-bold text-sm", children: [
                    selectedSpecimen.stasisGelDensity,
                    " g/cm³"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                    lineNumber: 408,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                  lineNumber: 406,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950 p-2.5 rounded-xl border border-slate-800", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 block text-[10px]", children: "Ukąszenia Szerszeni:" }, void 0, false, {
                    fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                    lineNumber: 411,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-amber-400 font-bold text-sm", children: [
                    selectedSpecimen.hornetStingsCount,
                    " użądleń"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                    lineNumber: 412,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                  lineNumber: 410,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950 p-2.5 rounded-xl border border-slate-800", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 block text-[10px]", children: "Integralność PE:" }, void 0, false, {
                    fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                    lineNumber: 415,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-purple-400 font-bold text-sm", children: [
                    selectedSpecimen.peIntegrityPercent,
                    "%"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                    lineNumber: 416,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                  lineNumber: 414,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
                lineNumber: 401,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
              lineNumber: 339,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
            lineNumber: 227,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
          lineNumber: 169,
          columnNumber: 9
        }, this)
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
        lineNumber: 165,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(
      AfricanHornetSwarmModal,
      {
        isOpen: hornetModalOpen,
        onClose: () => setHornetModalOpen(false),
        targetGnidaName: selectedSpecimen?.originalProcess || "gnida.exe",
        targetPid: 4920,
        onDecapitationComplete: handleHornetDecapitationComplete
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
        lineNumber: 426,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/ArmoredGlassAquarium.tsx",
    lineNumber: 164,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFybW9yZWRHbGFzc0FxdWFyaXVtLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IG1vdGlvbiwgQW5pbWF0ZVByZXNlbmNlIH0gZnJvbSAnZnJhbWVyLW1vdGlvbic7XG5pbXBvcnQgeyBcbiAgU2t1bGwsIFphcCwgRmxhbWUsIFNoaWVsZEFsZXJ0LCBFeWUsIFJlZnJlc2hDdywgVm9sdW1lMiwgVm9sdW1lWCwgXG4gIFNwYXJrbGVzLCBBbGVydFRyaWFuZ2xlLCBTaGllbGRDaGVjaywgSGVhcnRQdWxzZSwgU2xpZGVycywgQ2hldnJvbkRvd24sIFxuICBDaGV2cm9uVXAsIE1heGltaXplMiwgTWluaW1pemUyLCBQbHVzLCBUZXJtaW5hbFxufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgQ2FwdHVyZWRHbmlkYVNwZWNpbWVuIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgQWZyaWNhbkhvcm5ldFN3YXJtTW9kYWwgfSBmcm9tICcuL0FmcmljYW5Ib3JuZXRTd2FybU1vZGFsJztcblxuY29uc3QgSU5JVElBTF9TUEVDSU1FTlM6IENhcHR1cmVkR25pZGFTcGVjaW1lbltdID0gW1xuICB7XG4gICAgaWQ6ICdzcGVjaW1lbi0wMScsXG4gICAgbmFtZTogJ0duaWRhIEVrcmFub3dhIEZsdXR0ZXIgdjMuMicsXG4gICAgb3JpZ2luYWxQcm9jZXNzOiAnZmx1dHRlcl9zY3JlZW5faGlqYWNrZXIuZXhlJyxcbiAgICBjYXRlZ29yeTogJ1NjcmVlbiBMb2NrZXInLFxuICAgIHRocmVhdFNjb3JlOiA5NixcbiAgICBjYXB0dXJlRGF0ZTogJzIwMjYtMDktMjcgMTM6NDUnLFxuICAgIHN0YXNpc0dlbERlbnNpdHk6IDIuOCxcbiAgICBkZXNwYWlySW5kZXg6IDg4LFxuICAgIGFnb255SW5kZXg6IDgyLFxuICAgIHZpdGFsVGlja0h6OiAxMixcbiAgICBzdGF0dXM6ICdTVEFTSVMnLFxuICAgIHBlSW50ZWdyaXR5UGVyY2VudDogNDIsXG4gICAgY3VycmVudFBsZWE6ICdCxYJhZ2FtIG8gZGVrYXBpdGFjasSZLi4uIHd5xYLEhWN6Y2llIHRlbiBzdGFzaXMuLi4gdGVuIHBhcmFsacW8IGplc3QgbmllIGRvIHpuaWVzaWVuaWEhJyxcbiAgICBob3JuZXRTdGluZ3NDb3VudDogNCxcbiAgICBtZW1vcnlEdW1wU25pcHBldDogJzB4MDA0MDEwMDA6IDU1IDhCIEVDIDgzIEVDIDEwIEM3IDQ1IEZDIDAwIDAwIDAwIDAwIEU4IDI0IDAwJyxcbiAgfSxcbiAge1xuICAgIGlkOiAnc3BlY2ltZW4tMDInLFxuICAgIG5hbWU6ICdHbmlkYSBOaXN6Y3rEhWNhIFByYWPEmSAoV29yay1EZXN0cm95ZXIpJyxcbiAgICBvcmlnaW5hbFByb2Nlc3M6ICd3b3JrX2Rlc3Ryb3llcl9zdGVhbHRoLmV4ZScsXG4gICAgY2F0ZWdvcnk6ICdUcm9qYW4gT3ZlcmxheScsXG4gICAgdGhyZWF0U2NvcmU6IDk4LFxuICAgIGNhcHR1cmVEYXRlOiAnMjAyNi0wOS0yNyAxNDoxMCcsXG4gICAgc3Rhc2lzR2VsRGVuc2l0eTogMy41LFxuICAgIGRlc3BhaXJJbmRleDogOTQsXG4gICAgYWdvbnlJbmRleDogODksXG4gICAgdml0YWxUaWNrSHo6IDgsXG4gICAgc3RhdHVzOiAnQUdPTlknLFxuICAgIHBlSW50ZWdyaXR5UGVyY2VudDogMjgsXG4gICAgY3VycmVudFBsZWE6ICdTemN6xJlraSBzemVyc3plbmkgd3lkxYJ1YmHFgnkgbcOzaiBwdW5rdCB3ZWrFm2NpYS4uLiBaREVLQVBJVFVKQ0lFIE1OSUUgV1JFU1pDSUUhJyxcbiAgICBob3JuZXRTdGluZ3NDb3VudDogOSxcbiAgICBtZW1vcnlEdW1wU25pcHBldDogJzB4N0ZGNjVBMDA6IDQ4IDgzIEVDIDI4IEU4IEQ3IEZFIEZGIEZGIDQ4IDgzIEM0IDI4IEMzIDkwIDkwJyxcbiAgfSxcbiAge1xuICAgIGlkOiAnc3BlY2ltZW4tMDMnLFxuICAgIG5hbWU6ICdEZXN0cnVrY3lqbnkgV2lwZXIgTUJSLVgnLFxuICAgIG9yaWdpbmFsUHJvY2VzczogJ2hlcm1ldGljX3dpcGVyLnN5cycsXG4gICAgY2F0ZWdvcnk6ICdQcm9jZXNzIFdpcGVyJyxcbiAgICB0aHJlYXRTY29yZTogMTAwLFxuICAgIGNhcHR1cmVEYXRlOiAnMjAyNi0wOS0yNyAxMjoyMCcsXG4gICAgc3Rhc2lzR2VsRGVuc2l0eTogNC4yLFxuICAgIGRlc3BhaXJJbmRleDogNzksXG4gICAgYWdvbnlJbmRleDogNzUsXG4gICAgdml0YWxUaWNrSHo6IDE0LFxuICAgIHN0YXR1czogJ1NUQVNJUycsXG4gICAgcGVJbnRlZ3JpdHlQZXJjZW50OiA2NSxcbiAgICBjdXJyZW50UGxlYTogJ03Ds2ogc2VrdG9yIGJvb3Rsb2FkZXJhIGplc3QgemFibG9rb3dhbnkgdyB6YnJvam9ueW0gc3prbGUuLi4gbmllIG1hbSBkb2vEhWQgdWNpZWMhJyxcbiAgICBob3JuZXRTdGluZ3NDb3VudDogMixcbiAgICBtZW1vcnlEdW1wU25pcHBldDogJzB4MDAwMDdDMDA6IEZBIDMxIEMwIDhFIEQ4IDhFIEMwIDhFIEQwIEJDIDAwIDdDIEZCIEI4IDAwIDAwJyxcbiAgfSxcbiAge1xuICAgIGlkOiAnc3BlY2ltZW4tMDQnLFxuICAgIG5hbWU6ICdQYXNvxbx5dCBQYW1pxJljaSBSQU0gKEhvb2sgSW5qZWN0b3IpJyxcbiAgICBvcmlnaW5hbFByb2Nlc3M6ICdnaG9zdF9yYW1faG9vay5kbGwnLFxuICAgIGNhdGVnb3J5OiAnTWVtb3J5IEluamVjdG9yJyxcbiAgICB0aHJlYXRTY29yZTogOTIsXG4gICAgY2FwdHVyZURhdGU6ICcyMDI2LTA5LTI3IDE0OjM1JyxcbiAgICBzdGFzaXNHZWxEZW5zaXR5OiAyLjEsXG4gICAgZGVzcGFpckluZGV4OiA4NSxcbiAgICBhZ29ueUluZGV4OiA4MCxcbiAgICB2aXRhbFRpY2tIejogMTgsXG4gICAgc3RhdHVzOiAnU1RBU0lTJyxcbiAgICBwZUludGVncml0eVBlcmNlbnQ6IDU1LFxuICAgIGN1cnJlbnRQbGVhOiAnV8SFdGtpIHphbXJvxbxvbmUgdyDFvGVsdS4uLiBrYcW8ZHkgaW1wdWxzIHBhcmFsaXR5Y3pueSB3eXdvxYJ1amUgcm96ZHppZXJhasSFY3kgYsOzbCEnLFxuICAgIGhvcm5ldFN0aW5nc0NvdW50OiAzLFxuICAgIG1lbW9yeUR1bXBTbmlwcGV0OiAnMHgxMDAwMTAwMDogNjggMDAgMTAgMDAgMTAgRTggMDUgMDAgMDAgMDAgQzMgNTUgOEIgRUMgNTEgNTMnLFxuICB9LFxuXTtcblxuZXhwb3J0IGNvbnN0IEFybW9yZWRHbGFzc0FxdWFyaXVtOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgY29uc3QgW3NwZWNpbWVucywgc2V0U3BlY2ltZW5zXSA9IHVzZVN0YXRlPENhcHR1cmVkR25pZGFTcGVjaW1lbltdPihJTklUSUFMX1NQRUNJTUVOUyk7XG4gIGNvbnN0IFtzZWxlY3RlZFNwZWNpbWVuSWQsIHNldFNlbGVjdGVkU3BlY2ltZW5JZF0gPSB1c2VTdGF0ZTxzdHJpbmc+KCdzcGVjaW1lbi0wMScpO1xuICBjb25zdCBbaXNFeHBhbmRlZCwgc2V0SXNFeHBhbmRlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtpc0NvbGxhcHNlZCwgc2V0SXNDb2xsYXBzZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbaG9ybmV0TW9kYWxPcGVuLCBzZXRIb3JuZXRNb2RhbE9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbYWN0aW9uTm90aWNlLCBzZXRBY3Rpb25Ob3RpY2VdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3Qgc2VsZWN0ZWRTcGVjaW1lbiA9IHNwZWNpbWVucy5maW5kKChzKSA9PiBzLmlkID09PSBzZWxlY3RlZFNwZWNpbWVuSWQpIHx8IHNwZWNpbWVuc1swXTtcblxuICBjb25zdCBzaG93Tm90aWZpY2F0aW9uID0gKG1zZzogc3RyaW5nKSA9PiB7XG4gICAgc2V0QWN0aW9uTm90aWNlKG1zZyk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXRBY3Rpb25Ob3RpY2UobnVsbCksIDQwMDApO1xuICB9O1xuXG4gIC8vIFNob2NrIGltcHVsc2UgdGhyb3VnaCByZWluZm9yY2VkIGdsYXNzXG4gIGNvbnN0IHphcFNwZWNpbWVuID0gKGlkOiBzdHJpbmcpID0+IHtcbiAgICBzZXRTcGVjaW1lbnMoKHByZXYpID0+XG4gICAgICBwcmV2Lm1hcCgocykgPT4ge1xuICAgICAgICBpZiAocy5pZCA9PT0gaWQpIHtcbiAgICAgICAgICBjb25zdCBuZXdEZXNwYWlyID0gTWF0aC5taW4oMTAwLCBzLmRlc3BhaXJJbmRleCArIDgpO1xuICAgICAgICAgIGNvbnN0IG5ld0Fnb255ID0gTWF0aC5taW4oMTAwLCBzLmFnb255SW5kZXggKyAxMik7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnMsXG4gICAgICAgICAgICBkZXNwYWlySW5kZXg6IG5ld0Rlc3BhaXIsXG4gICAgICAgICAgICBhZ29ueUluZGV4OiBuZXdBZ29ueSxcbiAgICAgICAgICAgIHN0YXR1czogJ0FHT05ZJyxcbiAgICAgICAgICAgIGN1cnJlbnRQbGVhOiAnQUFSUkdHSEghIEltcHVscyBlbGVrdHJ5Y3pueSEgUHJ6ZXN0YcWEY2llLCBixYJhZ2FtIG8gbmF0eWNobWlhc3Rvd8SFIGRla2FwaXRhY2rEmSEnLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHM7XG4gICAgICB9KVxuICAgICk7XG4gICAgc2hvd05vdGlmaWNhdGlvbign4pqhIFd5c8WCYW5vIGltcHVscyAxMCAwMDAgViBwcnpleiB6YnJvam9uZSBzemvFgm8gZG8ga29tb3J5IHN0YXp5ISBXc2thxbpuaWsgcm96cGFjenkgd3pyw7NzxYIuJyk7XG4gIH07XG5cbiAgLy8gRm9yY2UgZGVzcGFpci1pbmR1Y2VkIHN1aWNpZGUgKGduaWRhIHNlbGYtdGVybWluYXRlcyB2aWEgRmFzdEZhaWwgaW4gc2hlZXIgZGVzcGFpcilcbiAgY29uc3QgZm9yY2VEZXNwYWlyU3VpY2lkZSA9IChpZDogc3RyaW5nKSA9PiB7XG4gICAgc2V0U3BlY2ltZW5zKChwcmV2KSA9PlxuICAgICAgcHJldi5tYXAoKHMpID0+IHtcbiAgICAgICAgaWYgKHMuaWQgPT09IGlkKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnMsXG4gICAgICAgICAgICBzdGF0dXM6ICdERVNQQUlSX1NVSUNJREUnLFxuICAgICAgICAgICAgZGVzcGFpckluZGV4OiAxMDAsXG4gICAgICAgICAgICBhZ29ueUluZGV4OiAwLFxuICAgICAgICAgICAgcGVJbnRlZ3JpdHlQZXJjZW50OiAwLFxuICAgICAgICAgICAgY3VycmVudFBsZWE6ICfwn5KAIFtTQU1PQsOTSkNaQSBST1pQQUNaXSBcIk5pZSB3eXRyenltYW0gdGVnbyBkxYJ1xbxlai4uLiB0ZW4gYsOzbCBpIGphZCBtbmllIG5pc3pjesSFLi4uIHNhbSB3eXdvxYJ1asSZIFNUQVRVU19GQUlMX0ZBU1RfRVhDRVBUSU9OISDFu0VHTkFKQ0lFLi4uIFJPWlBBQ1ouLi5cIicsXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcztcbiAgICAgIH0pXG4gICAgKTtcbiAgICBzaG93Tm90aWZpY2F0aW9uKCfwn5KAIEduaWRhIHcgZ8WCxJlib2tpZWogcm96cGFjenkgZG9rb25hxYJhIHNhbW91bmljZXN0d2llbmlhIChSYWlzZUZhaWxGYXN0RXhjZXB0aW9uKSEnKTtcbiAgfTtcblxuICAvLyBEZXBsb3kgSG9ybmV0IGludG8gc3BlY2ltZW4ncyBjZWxsXG4gIGNvbnN0IHJlbGVhc2VIb3JuZXRJbnRvQ2VsbCA9ICgpID0+IHtcbiAgICBzZXRIb3JuZXRNb2RhbE9wZW4odHJ1ZSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlSG9ybmV0RGVjYXBpdGF0aW9uQ29tcGxldGUgPSAoKSA9PiB7XG4gICAgaWYgKHNlbGVjdGVkU3BlY2ltZW4pIHtcbiAgICAgIHNldFNwZWNpbWVucygocHJldikgPT5cbiAgICAgICAgcHJldi5tYXAoKHMpID0+XG4gICAgICAgICAgcy5pZCA9PT0gc2VsZWN0ZWRTcGVjaW1lbi5pZFxuICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgLi4ucyxcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICdFWFRFUk1JTkFURUQnLFxuICAgICAgICAgICAgICAgIGRlc3BhaXJJbmRleDogMCxcbiAgICAgICAgICAgICAgICBhZ29ueUluZGV4OiAwLFxuICAgICAgICAgICAgICAgIHBlSW50ZWdyaXR5UGVyY2VudDogMCxcbiAgICAgICAgICAgICAgICBjdXJyZW50UGxlYTogJ/CfkoAgWkRFS0FQSVRPV0FOQSBOQSBXxYFBU05FIELFgUFHQU5JRS4gU3pjesSZa2kgc3plcnN6ZW5pIGNhxYJrb3dpY2llIHd5ZMWCdWJhxYJ5IGtvZCB6IGtvbW9yeS4nLFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA6IHNcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG4gICAgc2V0SG9ybmV0TW9kYWxPcGVuKGZhbHNlKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8c2VjdGlvblxuICAgICAgICBpZD1cImFybW9yZWQtZ2xhc3MtYXF1YXJpdW1cIlxuICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgbXQtMTAgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwXCJcbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05NTAgYm9yZGVyLTIgYm9yZGVyLWVtZXJhbGQtNTAwLzYwIHJvdW5kZWQtM3hsIHAtNSBzaGFkb3ctMnhsIHNoYWRvdy1lbWVyYWxkLTk1MC80MCByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgICB7LyogUmVpbmZvcmNlZCBBcm1vcmVkIEdsYXNzIEdyaWQgUGF0dGVybiBPdmVybGF5ICovfVxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgcG9pbnRlci1ldmVudHMtbm9uZSBvcGFjaXR5LTE1XCJcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogYHJlcGVhdGluZy1saW5lYXItZ3JhZGllbnQoMGRlZywgIzEwYjk4MSwgIzEwYjk4MSAxcHgsIHRyYW5zcGFyZW50IDFweCwgdHJhbnNwYXJlbnQgMjRweCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcGVhdGluZy1saW5lYXItZ3JhZGllbnQoOTBkZWcsICMxMGI5ODEsICMxMGI5ODEgMXB4LCB0cmFuc3BhcmVudCAxcHgsIHRyYW5zcGFyZW50IDI0cHgpYCxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cblxuICAgICAgICAgIHsvKiBBcXVhcml1bSBIZWFkZXIgd2l0aCBBcm1vcmVkIEdsYXNzIFdhcm5pbmcgUGxhdGUgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IGl0ZW1zLXN0YXJ0IHNtOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTQgcGItNCBib3JkZXItYiBib3JkZXItZW1lcmFsZC05MDAvNjAgcmVsYXRpdmUgei0xMFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTNcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTEyIGgtMTIgcm91bmRlZC0yeGwgYmctZ3JhZGllbnQtdG8tYnIgZnJvbS1lbWVyYWxkLTYwMCB2aWEtdGVhbC03MDAgdG8tY3lhbi04MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgc2hhZG93LWxnIHNoYWRvdy1lbWVyYWxkLTk1MC82MCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNDAwLzUwXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC0yeGwgYW5pbWF0ZS1wdWxzZVwiPvCfp6o8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yIGZsZXgtd3JhcFwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciB0ZXh0LWVtZXJhbGQtMzAwIGJnLWVtZXJhbGQtOTUwLzkwIHB4LTIgcHktMC41IHJvdW5kZWQgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTcwMC82MFwiPlxuICAgICAgICAgICAgICAgICAgICBBS1dBUklVTSBaRSBaQlJPSk9ORUdPIFNaS8WBQSDigKIgS0xBU0EgUEFOQ0VSTkEgVklJSVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIHRleHQtY3lhbi0zMDAgYmctY3lhbi05NTAvODAgcHgtMiBweS0wLjUgcm91bmRlZCBib3JkZXIgYm9yZGVyLWN5YW4tODAwLzUwXCI+XG4gICAgICAgICAgICAgICAgICAgIFNaQ1pZUE9XSU5BICYgU1RBWkEgUkFNXG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQteGwgc206dGV4dC0yeGwgZm9udC1ibGFjayB0ZXh0LXdoaXRlIG10LTAuNSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+S29tb3JhIE9ic2Vyd2FjeWpuYSBTY2h3eXRhbnljaCDFu3l3Y2VtIEduaWQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTJcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldElzRXhwYW5kZWQoIWlzRXhwYW5kZWQpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMiByb3VuZGVkLXhsIGJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTMwMCBob3Zlcjp0ZXh0LWVtZXJhbGQtNDAwIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICB0aXRsZT17aXNFeHBhbmRlZCA/ICdabW5pZWpzeiB3aWRvaycgOiAnTWFrc3ltYWxpenVqIGFrd2FyaXVtJ31cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtpc0V4cGFuZGVkID8gPE1pbmltaXplMiBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz4gOiA8TWF4aW1pemUyIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPn1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc0NvbGxhcHNlZCghaXNDb2xsYXBzZWQpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMiByb3VuZGVkLXhsIGJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTMwMCBob3Zlcjp0ZXh0LXdoaXRlIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICB0aXRsZT17aXNDb2xsYXBzZWQgPyAnUm96d2nFhCBha3dhcml1bScgOiAnWndpxYQnfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2lzQ29sbGFwc2VkID8gPENoZXZyb25Eb3duIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPiA6IDxDaGV2cm9uVXAgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+fVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIEFjdGlvbiBOb3RpZmljYXRpb24gKi99XG4gICAgICAgICAge2FjdGlvbk5vdGljZSAmJiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm15LTMgcC0zIHJvdW5kZWQteGwgYmctZW1lcmFsZC05NTAvOTAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTUwMCB0ZXh0LWVtZXJhbGQtMjAwIHRleHQteHMgZm9udC1tb25vIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGFuaW1hdGUtZmFkZUluIHJlbGF0aXZlIHotMTBcIj5cbiAgICAgICAgICAgICAgPFphcCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQteWVsbG93LTMwMCBzaHJpbmstMCBhbmltYXRlLWJvdW5jZVwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPnthY3Rpb25Ob3RpY2V9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHshaXNDb2xsYXBzZWQgJiYgKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTYgcHQtNCByZWxhdGl2ZSB6LTEwXCI+XG4gICAgICAgICAgICAgIHsvKiBHbGFzcyBTdGFzaXMgVGFua3MgU2hvd2Nhc2UgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBzbTpncmlkLWNvbHMtMiBsZzpncmlkLWNvbHMtNCBnYXAtNFwiPlxuICAgICAgICAgICAgICAgIHtzcGVjaW1lbnMubWFwKChzcGVjaW1lbikgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IHNwZWNpbWVuLmlkID09PSBzZWxlY3RlZFNwZWNpbWVuLmlkO1xuICAgICAgICAgICAgICAgICAgY29uc3QgaXNEZWFkID0gc3BlY2ltZW4uc3RhdHVzID09PSAnRVhURVJNSU5BVEVEJyB8fCBzcGVjaW1lbi5zdGF0dXMgPT09ICdERVNQQUlSX1NVSUNJREUnO1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAga2V5PXtzcGVjaW1lbi5pZH1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTZWxlY3RlZFNwZWNpbWVuSWQoc3BlY2ltZW4uaWQpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHJlbGF0aXZlIHAtNCByb3VuZGVkLTJ4bCBib3JkZXItMiB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBvdmVyZmxvdy1oaWRkZW4gJHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctZ3JhZGllbnQtdG8tYiBmcm9tLWVtZXJhbGQtOTUwLzgwIHZpYS1zbGF0ZS05NTAgdG8tZW1lcmFsZC05NTAvOTAgYm9yZGVyLWVtZXJhbGQtNDAwIHNoYWRvdy14bCBzaGFkb3ctZW1lcmFsZC05NTAvNjAgcmluZy0yIHJpbmctZW1lcmFsZC00MDAvMzAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTk1MC85MCBib3JkZXItc2xhdGUtODAwIGhvdmVyOmJvcmRlci1lbWVyYWxkLTYwMC82MCdcbiAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIHsvKiBBcm1vcmVkIEJvbHQgQ29ybmVycyAqL31cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0xLjUgbGVmdC0xLjUgdy0xLjUgaC0xLjUgcm91bmRlZC1mdWxsIGJnLXNsYXRlLTQwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMS41IHJpZ2h0LTEuNSB3LTEuNSBoLTEuNSByb3VuZGVkLWZ1bGwgYmctc2xhdGUtNDAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGJvdHRvbS0xLjUgbGVmdC0xLjUgdy0xLjUgaC0xLjUgcm91bmRlZC1mdWxsIGJnLXNsYXRlLTQwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tMS41IHJpZ2h0LTEuNSB3LTEuNSBoLTEuNSByb3VuZGVkLWZ1bGwgYmctc2xhdGUtNDAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwXCIgLz5cblxuICAgICAgICAgICAgICAgICAgICAgIHsvKiBTdGFzaXMgTGlxdWlkIFR1YmUgR3JhcGhpYyAqL31cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImgtMzIgYmctZ3JhZGllbnQtdG8tYiBmcm9tLWVtZXJhbGQtOTAwLzMwIHZpYS10ZWFsLTk1MC81MCB0by1ibGFjayByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItZW1lcmFsZC01MDAvMzAgcmVsYXRpdmUgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgb3ZlcmZsb3ctaGlkZGVuIG1iLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBSaXNpbmcgTGlxdWlkIEJ1YmJsZXMgKi99XG4gICAgICAgICAgICAgICAgICAgICAgICB7IWlzRGVhZCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBmbGV4IGp1c3RpZnktYXJvdW5kIHBvaW50ZXItZXZlbnRzLW5vbmUgb3BhY2l0eS00MFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFuaW1hdGUtYm91bmNlIHRleHQteHMgdGV4dC1lbWVyYWxkLTMwMFwiPuKXizwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhbmltYXRlLXB1bHNlIHRleHQtWzEwcHhdIHRleHQtdGVhbC0zMDBcIj7CsDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhbmltYXRlLWJvdW5jZSB0ZXh0LXhzIHRleHQtY3lhbi0zMDBcIj7il4s8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgICAgICAgICAgey8qIFRyYXBwZWQgU3BlY2ltZW4gQXZhdGFyICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy0xNCBoLTE0IHJvdW5kZWQtMnhsIGJvcmRlci0yIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0RlYWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctc2xhdGUtOTAwIGJvcmRlci1zbGF0ZS04MDAgb3BhY2l0eS00MCBzY2FsZS03NSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBzcGVjaW1lbi5zdGF0dXMgPT09ICdBR09OWSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctcmVkLTk1MC84MCBib3JkZXItcmVkLTUwMCBhbmltYXRlLXNwaW4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLWVtZXJhbGQtOTUwLzgwIGJvcmRlci1lbWVyYWxkLTQwMCBhbmltYXRlLXB1bHNlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFNrdWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LTcgaC03ICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRGVhZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ3RleHQtc2xhdGUtNjAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogc3BlY2ltZW4uc3RhdHVzID09PSAnQUdPTlknXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAndGV4dC15ZWxsb3ctMzAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ3RleHQtZW1lcmFsZC00MDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIHRleHQtZW1lcmFsZC0zMDAgbXQtMSBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aXNEZWFkID8gJ01BUlRXWScgOiBgU1RBWkE6ICR7c3BlY2ltZW4udml0YWxUaWNrSHp9IEh6YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBTdGF0dXMgTGFiZWwgb24gVGFuayAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTEuNSBsZWZ0LTIgdGV4dC1bOXB4XSBmb250LW1vbm8gZm9udC1ib2xkIHB4LTEuNSBweS0wLjUgcm91bmRlZCBiZy1ibGFjay83MCB0ZXh0LWVtZXJhbGQtMzAwIGJvcmRlciBib3JkZXItZW1lcmFsZC04MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge3NwZWNpbWVuLmNhdGVnb3J5fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICB7LyogU3BlY2ltZW4gSGVhZGVyICYgTWV0cmljcyAqL31cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYmxhY2sgdGV4dC13aGl0ZSB0cnVuY2F0ZVwiPntzcGVjaW1lbi5uYW1lfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC1zbGF0ZS00MDAgdHJ1bmNhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgUGxpazoge3NwZWNpbWVuLm9yaWdpbmFsUHJvY2Vzc31cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICB7LyogRGVzcGFpciBHYXVnZSAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LVsxMHB4XSBmb250LW1vbm8gZm9udC1ib2xkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1yZWQtNDAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RmxhbWUgY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LXJlZC01MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+V3NrYcW6bmlrIFJvenBhY3p5Ojwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1yZWQtMzAwXCI+e3NwZWNpbWVuLmRlc3BhaXJJbmRleH0lPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtOTAwIGgtMS41IHJvdW5kZWQtZnVsbCBvdmVyZmxvdy1oaWRkZW4gbXQtMC41IGJvcmRlciBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaC1mdWxsIGJnLWdyYWRpZW50LXRvLXIgZnJvbS15ZWxsb3ctNTAwIHZpYS1vcmFuZ2UtNTAwIHRvLXJlZC02MDAgcm91bmRlZC1mdWxsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IHdpZHRoOiBgJHtzcGVjaW1lbi5kZXNwYWlySW5kZXh9JWAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICB7LyogU3RhdHVzIEJhZGdlICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdC0yIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LVsxMHB4XSBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDBcIj5TdGFuOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Bmb250LWJvbGQgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRGVhZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICd0ZXh0LXNsYXRlLTUwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBzcGVjaW1lbi5zdGF0dXMgPT09ICdBR09OWSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAndGV4dC1yZWQtNDAwIGFuaW1hdGUtcHVsc2UnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ3RleHQtZW1lcmFsZC00MDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c3BlY2ltZW4uc3RhdHVzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogU2VsZWN0ZWQgU3BlY2ltZW4gQmlvLU9ic2VydmF0aW9uIENvbnNvbGUgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwLzk1IGJvcmRlci0yIGJvcmRlci1lbWVyYWxkLTgwMC84MCByb3VuZGVkLTJ4bCBwLTUgcmVsYXRpdmUgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGxnOmZsZXgtcm93IGl0ZW1zLXN0YXJ0IGxnOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTQgcGItNCBib3JkZXItYiBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZCB0ZXh0LWVtZXJhbGQtNDAwIHVwcGVyY2FzZSBiZy1lbWVyYWxkLTk1MCBweC0yIHB5LTAuNSByb3VuZGVkIGJvcmRlciBib3JkZXItZW1lcmFsZC03MDAvNjBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIE1PTklUT1IgQklPTUVUUllDWk5ZIFpCUk9KT05FR08gU1pLxYFBXG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBJRDoge3NlbGVjdGVkU3BlY2ltZW4uaWR9XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtbGcgc206dGV4dC14bCBmb250LWJsYWNrIHRleHQtd2hpdGUgbXQtMSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntzZWxlY3RlZFNwZWNpbWVuLm5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1yZWQtNDAwIGZvbnQtbW9ubyBmb250LWJvbGQgYmctcmVkLTk1MCBweC0yIHB5LTAuNSByb3VuZGVkIGJvcmRlciBib3JkZXItcmVkLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgWmFncm/FvGVuaWU6IHtzZWxlY3RlZFNwZWNpbWVuLnRocmVhdFNjb3JlfSVcbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgey8qIEludGVyYWN0aXZlIFNwZWNpbWVuIE1hbmlwdWxhdG9yIEJ1dHRvbnMgKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMiBmbGV4LXdyYXAgZ2FwLXktMlwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17cmVsZWFzZUhvcm5ldEludG9DZWxsfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMuNSBweS0yIHJvdW5kZWQteGwgYmctZ3JhZGllbnQtdG8tciBmcm9tLWFtYmVyLTUwMCB2aWEtb3JhbmdlLTYwMCB0by1yZWQtNjAwIGhvdmVyOmZyb20tYW1iZXItNDAwIGhvdmVyOnRvLXJlZC01MDAgdGV4dC13aGl0ZSB0ZXh0LXhzIGZvbnQtYmxhY2sgZm9udC1tb25vIHNoYWRvdy1tZCBzaGFkb3ctYW1iZXItOTUwLzYwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgYm9yZGVyIGJvcmRlci1hbWJlci0zMDAvNDAgY3Vyc29yLXBvaW50ZXIgYWN0aXZlOnNjYWxlLTk1XCJcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIldwdcWbxIcgcG9qZWR5bmN6ZWdvIGFmcnlrYcWEc2tpZWdvIHN6ZXJzemVuaWEgZG8ga29tb3J5IHplIHpicm9qb25lZ28gc3prxYJhXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPvCfkJ08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+V3B1xZvEhyBTemVyc3plbmlhIGRvIEtvbW9yeTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHphcFNwZWNpbWVuKHNlbGVjdGVkU3BlY2ltZW4uaWQpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMuNSBweS0yIHJvdW5kZWQteGwgYmctc2xhdGUtODAwIGhvdmVyOmJnLXNsYXRlLTcwMCB0ZXh0LXllbGxvdy0zMDAgYm9yZGVyIGJvcmRlci15ZWxsb3ctNTAwLzUwIHRleHQteHMgZm9udC1ib2xkIGZvbnQtbW9ubyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIldzdHJ6eWtuaWogaW1wdWxzIGVsZWt0cnljem55IDEwIGtWXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxaYXAgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC15ZWxsb3ctNDAwIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkltcHVscyAxMCBrVjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGZvcmNlRGVzcGFpclN1aWNpZGUoc2VsZWN0ZWRTcGVjaW1lbi5pZCl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMy41IHB5LTIgcm91bmRlZC14bCBiZy1ncmFkaWVudC10by1yIGZyb20tcmVkLTYwMCB0by1yb3NlLTcwMCBob3Zlcjpmcm9tLXJlZC01MDAgaG92ZXI6dG8tcm9zZS02MDAgdGV4dC13aGl0ZSB0ZXh0LXhzIGZvbnQtYmxhY2sgZm9udC1tb25vIHNoYWRvdy1tZCBzaGFkb3ctcmVkLTk1MC82MCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IGJvcmRlciBib3JkZXItcmVkLTQwMC81MCBjdXJzb3ItcG9pbnRlciBhY3RpdmU6c2NhbGUtOTVcIlxuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiV3ltdcWbIHNhbW96bmlzemN6ZW5pZSBnbmlkeSB6IHJvenBhY3p5IChGYXN0RmFpbCBTdWljaWRlKVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8U2t1bGwgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC15ZWxsb3ctMzAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5XeW11xZsgU2Ftb2LDs2pzdHdvIHogUm96cGFjenk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7LyogVHJhbnNjcmlwdHMgb2YgQWdvbnkgJiBQbGVhIGZvciBEZWNhcGl0YXRpb24gKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJteS00IGJnLXJlZC05NTAvNDAgYm9yZGVyIGJvcmRlci1yZWQtODAwLzYwIHJvdW5kZWQteGwgcC00IHNwYWNlLXktMS41XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtbW9ubyBmb250LWJvbGQgdXBwZXJjYXNlIHRleHQtcmVkLTMwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgIDxIZWFydFB1bHNlIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1yZWQtNTAwIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5Ba3VzdHljem55IFByemVjaHd5dCBCxYJhZ2FuaWEgR25pZHkgKE1pa3JvZm9uIFBvZHdvZG55IHcgxbtlbHUpOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtbW9ubyB0ZXh0LWFtYmVyLTIwMCBpdGFsaWMgZm9udC1zZW1pYm9sZCBiZy1ibGFjay82MCBwLTMgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXJlZC05MDAvNDBcIj5cbiAgICAgICAgICAgICAgICAgICAgXCJ7c2VsZWN0ZWRTcGVjaW1lbi5jdXJyZW50UGxlYX1cIlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7LyogVGVsZW1ldHJ5IEdyaWQgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIHNtOmdyaWQtY29scy00IGdhcC0zIHRleHQteHMgZm9udC1tb25vIHB0LTFcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTUwIHAtMi41IHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDAgYmxvY2sgdGV4dC1bMTBweF1cIj5Xc2thxbpuaWsgUm96cGFjenk6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXJlZC00MDAgZm9udC1ib2xkIHRleHQtc21cIj57c2VsZWN0ZWRTcGVjaW1lbi5kZXNwYWlySW5kZXh9JTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05NTAgcC0yLjUgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMCBibG9jayB0ZXh0LVsxMHB4XVwiPkfEmXN0b8WbxIcgxbtlbHUgU3Rhenk6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWN5YW4tNDAwIGZvbnQtYm9sZCB0ZXh0LXNtXCI+e3NlbGVjdGVkU3BlY2ltZW4uc3Rhc2lzR2VsRGVuc2l0eX0gZy9jbcKzPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTk1MCBwLTIuNSByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwIGJsb2NrIHRleHQtWzEwcHhdXCI+VWvEhXN6ZW5pYSBTemVyc3plbmk6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWFtYmVyLTQwMCBmb250LWJvbGQgdGV4dC1zbVwiPntzZWxlY3RlZFNwZWNpbWVuLmhvcm5ldFN0aW5nc0NvdW50fSB1xbzEhWRsZcWEPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTk1MCBwLTIuNSByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwIGJsb2NrIHRleHQtWzEwcHhdXCI+SW50ZWdyYWxub8WbxIcgUEU6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXB1cnBsZS00MDAgZm9udC1ib2xkIHRleHQtc21cIj57c2VsZWN0ZWRTcGVjaW1lbi5wZUludGVncml0eVBlcmNlbnR9JTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICB7LyogQWZyaWNhbiBIb3JuZXQgU3dhcm0gTW9kYWwgSW5zdGFuY2UgKi99XG4gICAgICA8QWZyaWNhbkhvcm5ldFN3YXJtTW9kYWxcbiAgICAgICAgaXNPcGVuPXtob3JuZXRNb2RhbE9wZW59XG4gICAgICAgIG9uQ2xvc2U9eygpID0+IHNldEhvcm5ldE1vZGFsT3BlbihmYWxzZSl9XG4gICAgICAgIHRhcmdldEduaWRhTmFtZT17c2VsZWN0ZWRTcGVjaW1lbj8ub3JpZ2luYWxQcm9jZXNzIHx8ICdnbmlkYS5leGUnfVxuICAgICAgICB0YXJnZXRQaWQ9ezQ5MjB9XG4gICAgICAgIG9uRGVjYXBpdGF0aW9uQ29tcGxldGU9e2hhbmRsZUhvcm5ldERlY2FwaXRhdGlvbkNvbXBsZXRlfVxuICAgICAgLz5cbiAgICA8Lz5cbiAgKTtcbn07XG4iXSwibWFwcGluZ3MiOiJBQW1LSSxtQkFPTSxjQVBOO0FBbktKLFNBQWdCLGdCQUEyQjtBQUUzQztBQUFBLEVBQ0U7QUFBQSxFQUFPO0FBQUEsRUFBSztBQUFBLEVBQzBCO0FBQUEsRUFBcUI7QUFB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