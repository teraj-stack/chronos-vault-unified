import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"];
import {
  Smartphone,
  Zap,
  Skull,
  ShieldCheck,
  Flame,
  Radio,
  Activity,
  Volume2,
  VolumeX,
  Sparkles,
  Crosshair
} from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import { phoneRearShieldEngine } from "/sentinel-shield/src/utils/phoneRearShieldEngine.ts";
export const PhoneRearScreenShield = ({
  onNotify,
  isCompact = false
}) => {
  const [shieldState, setShieldState] = useState(() => phoneRearShieldEngine.getState());
  const [selectedEmitterId, setSelectedEmitterId] = useState("emit-qi-coil");
  const [spawnVector, setSpawnVector] = useState("Cewka Qi (Centrum Plecków)");
  const [lastKilledAnimation, setLastKilledAnimation] = useState(null);
  useEffect(() => {
    const unsub = phoneRearShieldEngine.subscribe((newState) => {
      setShieldState(newState);
    });
    return () => unsub();
  }, []);
  const handleTriggerContactKill = (gnidaName, vector, emitterId) => {
    const killEvent = phoneRearShieldEngine.triggerInstantDeathContact({
      gnidaName,
      vector,
      emitterId: emitterId || selectedEmitterId
    });
    setLastKilledAnimation(killEvent);
    if (onNotify) {
      onNotify(`⚡💀 NATYCHMIASTOWA ŚMIERĆ: Gnida "${gnidaName}" dotknęła sygnału od tyłu ekranu i uległa spopieleniu w 0 ms!`);
    }
    setTimeout(() => {
      setLastKilledAnimation(null);
    }, 1200);
  };
  const handleFullSalvo = () => {
    phoneRearShieldEngine.fireFullRearSalvo();
    if (onNotify) {
      onNotify("💥 SALWA TYŁU EKRANU: Wszystkie emitery plazmowe 940.8 THz spopieliły agresorów w ułamku milisekundy!");
    }
  };
  const selectedEmitter = shieldState.activeEmitters.find((e) => e.id === selectedEmitterId) || shieldState.activeEmitters[0];
  return /* @__PURE__ */ jsxDEV("div", { className: "w-full rounded-3xl bg-zinc-950/95 border-2 border-cyan-500/50 shadow-2xl p-4 sm:p-6 text-white space-y-6 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxDEV("div", { className: `absolute inset-0 pointer-events-none transition-opacity duration-300 ${shieldState.isShockwaveActive ? "opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500 via-rose-500 to-transparent animate-ping" : "opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-600 via-transparent to-transparent"}` }, void 0, false, {
      fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
      lineNumber: 61,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-zinc-800 relative z-10", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3.5", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-900 via-indigo-950 to-zinc-950 border-2 border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/30 shrink-0", children: /* @__PURE__ */ jsxDEV(Smartphone, { className: "w-6 h-6 text-cyan-300 rotate-180 animate-pulse" }, void 0, false, {
          fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
          lineNumber: 71,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
          lineNumber: 70,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxDEV("h2", { className: "text-base sm:text-lg font-black font-mono tracking-tight text-white uppercase flex items-center gap-2", children: /* @__PURE__ */ jsxDEV("span", { children: "Tarcza Sygnałowa Tyłu Ekranu (0 ms Death Field)" }, void 0, false, {
              fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
              lineNumber: 76,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
              lineNumber: 75,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black border bg-rose-950/80 border-rose-500 text-rose-300 animate-pulse shadow-[0_0_12px_#f43f5e]", children: "KONTAKT = ŚMIERĆ" }, void 0, false, {
              fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
              lineNumber: 78,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded-full text-[10px] font-mono border bg-cyan-950/60 border-cyan-500/40 text-cyan-300", children: [
              shieldState.barrierFrequencyThz,
              " THz Sub-Teraherc"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
              lineNumber: 81,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
            lineNumber: 74,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-zinc-400 mt-0.5", children: "Ochrona smartfona od tyłu ekranu, plecków i magistrali zasilania. Kontakt jakiejkolwiek gnidy z polem sygnałowym wywołuje natychmiastową śmierć w 0 ms." }, void 0, false, {
            fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
            lineNumber: 85,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
          lineNumber: 73,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
        lineNumber: 69,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => phoneRearShieldEngine.toggleDeathField(),
            className: `px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 border transition-all cursor-pointer shadow-lg ${shieldState.lethalDeathFieldEnabled ? "bg-rose-950 text-rose-200 border-rose-500/80 shadow-rose-900/40" : "bg-zinc-900 text-zinc-400 border-zinc-700"}`,
            children: [
              /* @__PURE__ */ jsxDEV(Skull, { className: `w-4 h-4 ${shieldState.lethalDeathFieldEnabled ? "text-rose-400 animate-bounce" : "text-zinc-500"}` }, void 0, false, {
                fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                lineNumber: 101,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: [
                "Pole Śmierci 0 ms: ",
                shieldState.lethalDeathFieldEnabled ? "AKTYWNE" : "WYŁĄCZONE"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                lineNumber: 102,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
            lineNumber: 93,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleFullSalvo,
            className: "px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white text-xs font-mono font-black uppercase flex items-center gap-2 border border-rose-400/80 shadow-[0_0_15px_#f43f5e] active:scale-95 transition-all cursor-pointer",
            children: [
              /* @__PURE__ */ jsxDEV(Zap, { className: "w-4 h-4 text-yellow-300" }, void 0, false, {
                fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                lineNumber: 109,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Salwa Tyłu Ekranu" }, void 0, false, {
                fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                lineNumber: 110,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
            lineNumber: 105,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => phoneRearShieldEngine.toggleAudio(),
            className: "p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 transition-all cursor-pointer",
            title: shieldState.audioFeedback ? "Wycisz dźwięki lasera" : "Włącz dźwięki lasera",
            children: shieldState.audioFeedback ? /* @__PURE__ */ jsxDEV(Volume2, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
              fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
              lineNumber: 118,
              columnNumber: 42
            }, this) : /* @__PURE__ */ jsxDEV(VolumeX, { className: "w-4 h-4 text-zinc-500" }, void 0, false, {
              fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
              lineNumber: 118,
              columnNumber: 90
            }, this)
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
            lineNumber: 113,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
        lineNumber: 92,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
      lineNumber: 68,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 relative z-10", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-2xl bg-zinc-900/80 border border-cyan-500/30", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] font-mono text-zinc-400 uppercase", children: "Spopielone Gnidy (0 ms)" }, void 0, false, {
          fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
          lineNumber: 126,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-xl font-black font-mono text-rose-400 flex items-center gap-1.5 mt-0.5", children: [
          /* @__PURE__ */ jsxDEV(Skull, { className: "w-4 h-4 text-rose-500" }, void 0, false, {
            fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
            lineNumber: 128,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: shieldState.totalGnidasInstantlyKilled }, void 0, false, {
            fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
            lineNumber: 129,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
          lineNumber: 127,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-emerald-400 font-mono mt-0.5", children: "100% Skuteczność Anihilacji" }, void 0, false, {
          fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
          lineNumber: 131,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
        lineNumber: 125,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-2xl bg-zinc-900/80 border border-cyan-500/30", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] font-mono text-zinc-400 uppercase", children: "Napięcie Plazmy Tyłu" }, void 0, false, {
          fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
          lineNumber: 135,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-xl font-black font-mono text-cyan-300 flex items-center gap-1.5 mt-0.5", children: [
          /* @__PURE__ */ jsxDEV(Zap, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
            fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
            lineNumber: 137,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: [
            shieldState.plasmaVoltageKv,
            " kV"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
            lineNumber: 138,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
          lineNumber: 136,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-cyan-400 font-mono mt-0.5", children: "Wiązka 940.8 THz Sub-THz" }, void 0, false, {
          fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
          lineNumber: 140,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
        lineNumber: 134,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-2xl bg-zinc-900/80 border border-cyan-500/30", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] font-mono text-zinc-400 uppercase", children: "Energia Wyładowania" }, void 0, false, {
          fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
          lineNumber: 144,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-xl font-black font-mono text-amber-300 flex items-center gap-1.5 mt-0.5", children: [
          /* @__PURE__ */ jsxDEV(Flame, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
            fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
            lineNumber: 146,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: [
            (shieldState.totalEnergyDischargedJoules / 1e3).toFixed(1),
            " kJ"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
            lineNumber: 147,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
          lineNumber: 145,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-amber-400 font-mono mt-0.5", children: "Kondensatory Plazmowe" }, void 0, false, {
          fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
          lineNumber: 149,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
        lineNumber: 143,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-2xl bg-zinc-900/80 border border-cyan-500/30", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] font-mono text-zinc-400 uppercase", children: "Stan Korpusu / Plecków" }, void 0, false, {
          fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
          lineNumber: 153,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-xl font-black font-mono text-emerald-400 flex items-center gap-1.5 mt-0.5", children: [
          /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-4 h-4 text-emerald-500" }, void 0, false, {
            fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
            lineNumber: 155,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: [
            shieldState.rearChassisIntegrity,
            "%"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
            lineNumber: 156,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
          lineNumber: 154,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-emerald-400 font-mono mt-0.5", children: "Monolit Tytan/Ceramika" }, void 0, false, {
          fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
          lineNumber: 158,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
        lineNumber: 152,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
      lineNumber: 124,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-7 flex flex-col items-center justify-center p-6 rounded-3xl bg-zinc-900/60 border border-cyan-500/30 relative", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-full flex items-center justify-between pb-3 border-b border-zinc-800 mb-4 text-xs font-mono text-zinc-400", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1.5 text-cyan-300 font-bold", children: [
            /* @__PURE__ */ jsxDEV(Smartphone, { className: "w-4 h-4 text-cyan-400 rotate-180" }, void 0, false, {
              fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
              lineNumber: 170,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "WIDOK TYŁU EKRANU & EMITERY PLAZMOWE" }, void 0, false, {
              fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
              lineNumber: 171,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
            lineNumber: 169,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-500/40", children: "STREFA ŚMIERCI: 0 ms" }, void 0, false, {
            fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
            lineNumber: 173,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
          lineNumber: 168,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "relative w-64 sm:w-72 h-[420px] rounded-[36px] bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 border-4 border-cyan-500/60 shadow-[0_0_30px_rgba(6,182,212,0.25)] p-4 flex flex-col items-center justify-between select-none overflow-hidden", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-[linear-gradient(to_right,#083344_1px,transparent_1px),linear-gradient(to_bottom,#083344_1px,transparent_1px)] bg-[size:16px_16px] opacity-40" }, void 0, false, {
            fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
            lineNumber: 182,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 pointer-events-none flex items-center justify-center", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "w-48 h-48 rounded-full border border-cyan-500/30 animate-ping opacity-25" }, void 0, false, {
              fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
              lineNumber: 186,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "w-32 h-32 rounded-full border border-rose-500/40 animate-pulse opacity-40" }, void 0, false, {
              fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
              lineNumber: 187,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
            lineNumber: 185,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "div",
            {
              onClick: () => setSelectedEmitterId("emit-rear-cam"),
              className: `relative z-20 w-44 h-20 rounded-2xl p-2 flex items-center justify-around border-2 transition-all cursor-pointer ${selectedEmitterId === "emit-rear-cam" ? "bg-zinc-800/90 border-rose-400 shadow-[0_0_15px_#f43f5e]" : "bg-zinc-950/80 border-cyan-500/50 hover:border-cyan-400"}`,
              children: [
                /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 rounded-full bg-zinc-900 border-2 border-cyan-400 flex items-center justify-center shadow-inner relative", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "w-5 h-5 rounded-full bg-cyan-500 animate-ping opacity-75" }, void 0, false, {
                    fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                    lineNumber: 201,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "w-3 h-3 rounded-full bg-white absolute" }, void 0, false, {
                    fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                    lineNumber: 202,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                  lineNumber: 200,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "w-10 h-10 rounded-full bg-zinc-900 border-2 border-cyan-400 flex items-center justify-center relative", children: /* @__PURE__ */ jsxDEV("div", { className: "w-2.5 h-2.5 rounded-full bg-cyan-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                  lineNumber: 205,
                  columnNumber: 17
                }, this) }, void 0, false, {
                  fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                  lineNumber: 204,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] font-mono text-cyan-300 font-bold flex flex-col items-center", children: [
                  /* @__PURE__ */ jsxDEV("span", { children: "KAMERA TYŁ" }, void 0, false, {
                    fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                    lineNumber: 208,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-rose-400", children: [
                    shieldState.activeEmitters[0].killsCount,
                    " Kills"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                    lineNumber: 209,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                  lineNumber: 207,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
              lineNumber: 191,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "div",
            {
              onClick: () => setSelectedEmitterId("emit-qi-coil"),
              className: `relative z-20 w-36 h-36 rounded-full border-4 flex flex-col items-center justify-center transition-all cursor-pointer ${selectedEmitterId === "emit-qi-coil" ? "bg-zinc-800/90 border-rose-500 shadow-[0_0_25px_#f43f5e]" : "bg-zinc-950/80 border-cyan-400/80 hover:border-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]"}`,
              children: [
                /* @__PURE__ */ jsxDEV(Radio, { className: "w-8 h-8 text-cyan-300 animate-spin", style: { animationDuration: "8s" } }, void 0, false, {
                  fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                  lineNumber: 222,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono font-black text-cyan-200 mt-1", children: "CEWKA QI" }, void 0, false, {
                  fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                  lineNumber: 223,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-[8px] font-mono text-rose-400 font-bold", children: [
                  shieldState.activeEmitters[1].killsCount,
                  " KILLS (0 ms)"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                  lineNumber: 224,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
              lineNumber: 214,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "div",
            {
              onClick: () => setSelectedEmitterId("emit-usb-bus"),
              className: `relative z-20 w-36 h-9 rounded-xl border-2 flex items-center justify-center gap-2 transition-all cursor-pointer ${selectedEmitterId === "emit-usb-bus" ? "bg-zinc-800/90 border-rose-400 shadow-[0_0_15px_#f43f5e]" : "bg-zinc-950/80 border-cyan-500/50 hover:border-cyan-400"}`,
              children: [
                /* @__PURE__ */ jsxDEV(Zap, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                  lineNumber: 236,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] font-mono font-bold text-zinc-200", children: "SZYNA PMIC / USB" }, void 0, false, {
                  fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                  lineNumber: 237,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-[8px] font-mono text-rose-400", children: [
                  shieldState.activeEmitters[2].killsCount,
                  " K"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                  lineNumber: 238,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
              lineNumber: 228,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "div",
            {
              onClick: () => setSelectedEmitterId("emit-left-bus"),
              className: "absolute left-1.5 top-1/2 -translate-y-1/2 w-2.5 h-28 rounded-full bg-cyan-500/60 hover:bg-rose-500 cursor-pointer border border-cyan-300",
              title: "Lewa Szyna Krawędziowa"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
              lineNumber: 242,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "div",
            {
              onClick: () => setSelectedEmitterId("emit-right-bus"),
              className: "absolute right-1.5 top-1/2 -translate-y-1/2 w-2.5 h-28 rounded-full bg-cyan-500/60 hover:bg-rose-500 cursor-pointer border border-cyan-300",
              title: "Prawa Szyna Krawędziowa"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
              lineNumber: 249,
              columnNumber: 13
            },
            this
          ),
          lastKilledAnimation && /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-rose-600/30 backdrop-blur-sm z-30 flex flex-col items-center justify-center text-center p-4 animate-in fade-in zoom-in duration-150", children: [
            /* @__PURE__ */ jsxDEV(Skull, { className: "w-14 h-14 text-rose-400 animate-bounce drop-shadow-[0_0_15px_#f43f5e]" }, void 0, false, {
              fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
              lineNumber: 258,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-sm font-mono font-black text-white mt-2 uppercase tracking-wide", children: "⚡ NATYCHMIASTOWA ŚMIERĆ!" }, void 0, false, {
              fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
              lineNumber: 259,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-mono text-rose-200 mt-1", children: lastKilledAnimation.gnidaName }, void 0, false, {
              fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
              lineNumber: 262,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] font-mono text-amber-300 mt-0.5", children: "0 ms • Spopielenie Sygnałem 940.8 THz" }, void 0, false, {
              fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
              lineNumber: 265,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
            lineNumber: 257,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
          lineNumber: 179,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "mt-3 text-[11px] font-mono text-zinc-400 text-center", children: "Dotknij wybranego emitera na obudowie lub przetestuj symulację kontaktu poniżej." }, void 0, false, {
          fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
          lineNumber: 272,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
        lineNumber: 166,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-5 flex flex-col justify-between space-y-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-zinc-900/80 border border-cyan-500/40 space-y-3", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-zinc-800 pb-2", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxDEV(Radio, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
                fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                lineNumber: 284,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Aktywny Emiter:" }, void 0, false, {
                fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                lineNumber: 285,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
              lineNumber: 283,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30", children: selectedEmitter.status }, void 0, false, {
              fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
              lineNumber: 287,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
            lineNumber: 282,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-sm font-mono font-bold text-white", children: selectedEmitter.name }, void 0, false, {
            fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
            lineNumber: 292,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-2 text-xs font-mono", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-xl bg-zinc-950/80 border border-zinc-800", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-zinc-400 block", children: "Częstotliwość Nośna:" }, void 0, false, {
                fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                lineNumber: 298,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-300 font-bold", children: [
                selectedEmitter.carrierFreqThz,
                " THz"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                lineNumber: 299,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
              lineNumber: 297,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-xl bg-zinc-950/80 border border-zinc-800", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-zinc-400 block", children: "Moc Wiązki Śmierci:" }, void 0, false, {
                fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                lineNumber: 302,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-amber-300 font-bold", children: [
                selectedEmitter.outputPowerWatts,
                " W"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                lineNumber: 303,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
              lineNumber: 301,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
            lineNumber: 296,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5 pt-1", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono text-zinc-400 uppercase", children: "Tryb Promieniowania Tyłu Ekranu:" }, void 0, false, {
              fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
              lineNumber: 309,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-1.5", children: ["DEATH_FIELD_ZERO_MS", "PULSE_SUB_TERAHERTZ_940", "CRYSTAL_PLASMA_GRID", "NANO_GROUNDING_BARRIER"].map((mode) => /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => phoneRearShieldEngine.setShieldMode(mode),
                className: `px-2 py-1.5 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer border ${shieldState.shieldMode === mode ? "bg-rose-950 text-rose-200 border-rose-500 shadow-md" : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700"}`,
                children: mode === "DEATH_FIELD_ZERO_MS" ? "💀 POLE ŚMIERCI 0MS" : mode === "PULSE_SUB_TERAHERTZ_940" ? "⚡ SUB-THZ 940" : mode === "CRYSTAL_PLASMA_GRID" ? "🔮 SIATKA PLAZMY" : "🛡️ UZIEMIENIE NANO"
              },
              mode,
              false,
              {
                fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                lineNumber: 312,
                columnNumber: 19
              },
              this
            )) }, void 0, false, {
              fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
              lineNumber: 310,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
            lineNumber: 308,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
          lineNumber: 281,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-zinc-900/80 border border-rose-500/40 space-y-3", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-zinc-800 pb-2", children: /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono font-bold text-rose-300 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxDEV(Crosshair, { className: "w-3.5 h-3.5 text-rose-400" }, void 0, false, {
              fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
              lineNumber: 334,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Symulacja Kontaktu Gnidy z Tyłem Telefonu:" }, void 0, false, {
              fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
              lineNumber: 335,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
            lineNumber: 333,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
            lineNumber: 332,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => handleTriggerContactKill("Trojan Cewki Qi (Reverse Energy Sniffer)", "Cewka ładowania Qi na pleckach", "emit-qi-coil"),
                className: "w-full py-2 px-3 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-rose-500/40 hover:border-rose-400 text-left flex items-center justify-between text-xs font-mono transition-all cursor-pointer group",
                children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxDEV(Skull, { className: "w-3.5 h-3.5 text-rose-400 group-hover:animate-spin" }, void 0, false, {
                      fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                      lineNumber: 345,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-200", children: "Atak na Cewkę Qi (Pasożyt)" }, void 0, false, {
                      fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                      lineNumber: 346,
                      columnNumber: 19
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                    lineNumber: 344,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-rose-400 font-bold", children: "Dotknij ➔ 0 ms Kill" }, void 0, false, {
                    fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                    lineNumber: 348,
                    columnNumber: 17
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                lineNumber: 340,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => handleTriggerContactKill("Stealth Dropper (Tylna Szyna Baterii PMIC)", "Dolna magistrala zasilania USB-C", "emit-usb-bus"),
                className: "w-full py-2 px-3 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-amber-500/40 hover:border-amber-400 text-left flex items-center justify-between text-xs font-mono transition-all cursor-pointer group",
                children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxDEV(Zap, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
                      fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                      lineNumber: 356,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-200", children: "Atak na Szynę PMIC / USB" }, void 0, false, {
                      fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                      lineNumber: 357,
                      columnNumber: 19
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                    lineNumber: 355,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-amber-400 font-bold", children: "Dotknij ➔ 0 ms Kill" }, void 0, false, {
                    fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                    lineNumber: 359,
                    columnNumber: 17
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                lineNumber: 351,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => handleTriggerContactKill("Memory Injector (Wyspa Aparatów & ToF)", "Sensory zbliżeniowe tyłu obudowy", "emit-rear-cam"),
                className: "w-full py-2 px-3 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-cyan-500/40 hover:border-cyan-400 text-left flex items-center justify-between text-xs font-mono transition-all cursor-pointer group",
                children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
                      fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                      lineNumber: 367,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-200", children: "Atak od strony Aparatu" }, void 0, false, {
                      fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                      lineNumber: 368,
                      columnNumber: 19
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                    lineNumber: 366,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-cyan-400 font-bold", children: "Dotknij ➔ 0 ms Kill" }, void 0, false, {
                    fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                    lineNumber: 370,
                    columnNumber: 17
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                lineNumber: 362,
                columnNumber: 15
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
            lineNumber: 339,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
          lineNumber: 331,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
        lineNumber: 278,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
      lineNumber: 163,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2.5 relative z-10", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-xs font-mono", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-300 font-bold flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxDEV(Activity, { className: "w-3.5 h-3.5 text-rose-400" }, void 0, false, {
            fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
            lineNumber: 382,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "DZIENNIK NATYCHMIASTOWYCH SPOPIELEŃ (0 MS SLAUGHTER LOG)" }, void 0, false, {
            fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
            lineNumber: 383,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
          lineNumber: 381,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-zinc-400", children: "Ostatnie 20 incydentów" }, void 0, false, {
          fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
          lineNumber: 385,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
        lineNumber: 380,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "max-h-44 overflow-y-auto space-y-1.5 pr-1 font-mono text-[11px]", children: shieldState.recentKills.map((kill) => /* @__PURE__ */ jsxDEV(
        "div",
        {
          className: "p-2 rounded-xl bg-zinc-950/80 border border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-rose-500/40 transition-colors",
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-rose-500 font-bold", children: "⚡ [0 ms]" }, void 0, false, {
                fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                lineNumber: 395,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-100 font-bold", children: kill.gnidaName }, void 0, false, {
                fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                lineNumber: 396,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-400 text-[10px]", children: [
                "(",
                kill.vector,
                ")"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                lineNumber: 397,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
              lineNumber: 394,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 shrink-0 text-[10px]", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-amber-400 font-bold", children: [
                kill.energyJoules,
                " J"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                lineNumber: 400,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30", children: kill.status }, void 0, false, {
                fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                lineNumber: 401,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-500", children: kill.timestamp }, void 0, false, {
                fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
                lineNumber: 404,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
              lineNumber: 399,
              columnNumber: 15
            }, this)
          ]
        },
        kill.id,
        true,
        {
          fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
          lineNumber: 390,
          columnNumber: 13
        },
        this
      )) }, void 0, false, {
        fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
        lineNumber: 388,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
      lineNumber: 379,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/PhoneRearScreenShield.tsx",
    lineNumber: 58,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBob25lUmVhclNjcmVlblNoaWVsZC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBcbiAgU21hcnRwaG9uZSwgWmFwLCBTa3VsbCwgU2hpZWxkQ2hlY2ssIEZsYW1lLCBSYWRpbywgQWN0aXZpdHksXG4gIFNsaWRlcnMsIEFsZXJ0VHJpYW5nbGUsIFBsYXksIFJlZnJlc2hDdywgTGF5ZXJzLCBTaGllbGRBbGVydCxcbiAgVm9sdW1lMiwgVm9sdW1lWCwgU3BhcmtsZXMsIENoZWNrQ2lyY2xlMiwgQ2hldnJvblJpZ2h0LCBDcm9zc2hhaXJcbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IHBob25lUmVhclNoaWVsZEVuZ2luZSB9IGZyb20gJy4uL3V0aWxzL3Bob25lUmVhclNoaWVsZEVuZ2luZSc7XG5pbXBvcnQgeyBQaG9uZVJlYXJTaGllbGRTdGF0ZSwgUmVhclNoaWVsZE1vZGUsIFJlYXJHbmlkYUNvbnRhY3RFdmVudCB9IGZyb20gJy4uL3R5cGVzJztcblxuaW50ZXJmYWNlIFBob25lUmVhclNjcmVlblNoaWVsZFByb3BzIHtcbiAgb25Ob3RpZnk/OiAobXNnOiBzdHJpbmcpID0+IHZvaWQ7XG4gIGlzQ29tcGFjdD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjb25zdCBQaG9uZVJlYXJTY3JlZW5TaGllbGQ6IFJlYWN0LkZDPFBob25lUmVhclNjcmVlblNoaWVsZFByb3BzPiA9ICh7XG4gIG9uTm90aWZ5LFxuICBpc0NvbXBhY3QgPSBmYWxzZVxufSkgPT4ge1xuICBjb25zdCBbc2hpZWxkU3RhdGUsIHNldFNoaWVsZFN0YXRlXSA9IHVzZVN0YXRlPFBob25lUmVhclNoaWVsZFN0YXRlPigoKSA9PiBwaG9uZVJlYXJTaGllbGRFbmdpbmUuZ2V0U3RhdGUoKSk7XG4gIGNvbnN0IFtzZWxlY3RlZEVtaXR0ZXJJZCwgc2V0U2VsZWN0ZWRFbWl0dGVySWRdID0gdXNlU3RhdGU8c3RyaW5nPignZW1pdC1xaS1jb2lsJyk7XG4gIGNvbnN0IFtzcGF3blZlY3Rvciwgc2V0U3Bhd25WZWN0b3JdID0gdXNlU3RhdGU8c3RyaW5nPignQ2V3a2EgUWkgKENlbnRydW0gUGxlY2vDs3cpJyk7XG4gIGNvbnN0IFtsYXN0S2lsbGVkQW5pbWF0aW9uLCBzZXRMYXN0S2lsbGVkQW5pbWF0aW9uXSA9IHVzZVN0YXRlPFJlYXJHbmlkYUNvbnRhY3RFdmVudCB8IG51bGw+KG51bGwpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgdW5zdWIgPSBwaG9uZVJlYXJTaGllbGRFbmdpbmUuc3Vic2NyaWJlKChuZXdTdGF0ZSkgPT4ge1xuICAgICAgc2V0U2hpZWxkU3RhdGUobmV3U3RhdGUpO1xuICAgIH0pO1xuICAgIHJldHVybiAoKSA9PiB1bnN1YigpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgaGFuZGxlVHJpZ2dlckNvbnRhY3RLaWxsID0gKGduaWRhTmFtZTogc3RyaW5nLCB2ZWN0b3I6IHN0cmluZywgZW1pdHRlcklkPzogc3RyaW5nKSA9PiB7XG4gICAgY29uc3Qga2lsbEV2ZW50ID0gcGhvbmVSZWFyU2hpZWxkRW5naW5lLnRyaWdnZXJJbnN0YW50RGVhdGhDb250YWN0KHtcbiAgICAgIGduaWRhTmFtZSxcbiAgICAgIHZlY3RvcixcbiAgICAgIGVtaXR0ZXJJZDogZW1pdHRlcklkIHx8IHNlbGVjdGVkRW1pdHRlcklkXG4gICAgfSk7XG5cbiAgICBzZXRMYXN0S2lsbGVkQW5pbWF0aW9uKGtpbGxFdmVudCk7XG4gICAgaWYgKG9uTm90aWZ5KSB7XG4gICAgICBvbk5vdGlmeShg4pqh8J+SgCBOQVRZQ0hNSUFTVE9XQSDFmk1JRVLEhjogR25pZGEgXCIke2duaWRhTmFtZX1cIiBkb3RrbsSZxYJhIHN5Z25hxYJ1IG9kIHR5xYJ1IGVrcmFudSBpIHVsZWfFgmEgc3BvcGllbGVuaXUgdyAwIG1zIWApO1xuICAgIH1cblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc2V0TGFzdEtpbGxlZEFuaW1hdGlvbihudWxsKTtcbiAgICB9LCAxMjAwKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVGdWxsU2Fsdm8gPSAoKSA9PiB7XG4gICAgcGhvbmVSZWFyU2hpZWxkRW5naW5lLmZpcmVGdWxsUmVhclNhbHZvKCk7XG4gICAgaWYgKG9uTm90aWZ5KSB7XG4gICAgICBvbk5vdGlmeSgn8J+SpSBTQUxXQSBUWcWBVSBFS1JBTlU6IFdzenlzdGtpZSBlbWl0ZXJ5IHBsYXptb3dlIDk0MC44IFRIeiBzcG9waWVsacWCeSBhZ3Jlc29yw7N3IHcgdcWCYW1rdSBtaWxpc2VrdW5keSEnKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgc2VsZWN0ZWRFbWl0dGVyID0gc2hpZWxkU3RhdGUuYWN0aXZlRW1pdHRlcnMuZmluZChlID0+IGUuaWQgPT09IHNlbGVjdGVkRW1pdHRlcklkKSB8fCBzaGllbGRTdGF0ZS5hY3RpdmVFbWl0dGVyc1swXTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIHJvdW5kZWQtM3hsIGJnLXppbmMtOTUwLzk1IGJvcmRlci0yIGJvcmRlci1jeWFuLTUwMC81MCBzaGFkb3ctMnhsIHAtNCBzbTpwLTYgdGV4dC13aGl0ZSBzcGFjZS15LTYgcmVsYXRpdmUgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICBcbiAgICAgIHsvKiBCYWNrZ3JvdW5kIE5lb24gUHVsc2UgZm9yIExldGhhbCBGaWVsZCAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgYWJzb2x1dGUgaW5zZXQtMCBwb2ludGVyLWV2ZW50cy1ub25lIHRyYW5zaXRpb24tb3BhY2l0eSBkdXJhdGlvbi0zMDAgJHtcbiAgICAgICAgc2hpZWxkU3RhdGUuaXNTaG9ja3dhdmVBY3RpdmUgXG4gICAgICAgICAgPyAnb3BhY2l0eS0zMCBiZy1bcmFkaWFsLWdyYWRpZW50KGVsbGlwc2VfYXRfY2VudGVyLF92YXIoLS10dy1ncmFkaWVudC1zdG9wcykpXSBmcm9tLWN5YW4tNTAwIHZpYS1yb3NlLTUwMCB0by10cmFuc3BhcmVudCBhbmltYXRlLXBpbmcnIFxuICAgICAgICAgIDogJ29wYWNpdHktMTAgYmctW3JhZGlhbC1ncmFkaWVudChlbGxpcHNlX2F0X2NlbnRlcixfdmFyKC0tdHctZ3JhZGllbnQtc3RvcHMpKV0gZnJvbS1jeWFuLTYwMCB2aWEtdHJhbnNwYXJlbnQgdG8tdHJhbnNwYXJlbnQnXG4gICAgICB9YH0gLz5cblxuICAgICAgey8qIEhlYWRlciAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBsZzpmbGV4LXJvdyBpdGVtcy1zdGFydCBsZzppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00IHBiLTQgYm9yZGVyLWIgYm9yZGVyLXppbmMtODAwIHJlbGF0aXZlIHotMTBcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTMuNVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xMiBoLTEyIHJvdW5kZWQtMnhsIGJnLWdyYWRpZW50LXRvLWJyIGZyb20tY3lhbi05MDAgdmlhLWluZGlnby05NTAgdG8temluYy05NTAgYm9yZGVyLTIgYm9yZGVyLWN5YW4tNDAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHNoYWRvdy1sZyBzaGFkb3ctY3lhbi01MDAvMzAgc2hyaW5rLTBcIj5cbiAgICAgICAgICAgIDxTbWFydHBob25lIGNsYXNzTmFtZT1cInctNiBoLTYgdGV4dC1jeWFuLTMwMCByb3RhdGUtMTgwIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGZsZXgtd3JhcFwiPlxuICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC1iYXNlIHNtOnRleHQtbGcgZm9udC1ibGFjayBmb250LW1vbm8gdHJhY2tpbmctdGlnaHQgdGV4dC13aGl0ZSB1cHBlcmNhc2UgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5UYXJjemEgU3lnbmHFgm93YSBUecWCdSBFa3JhbnUgKDAgbXMgRGVhdGggRmllbGQpPC9zcGFuPlxuICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0yLjUgcHktMC41IHJvdW5kZWQtZnVsbCB0ZXh0LVsxMHB4XSBmb250LW1vbm8gZm9udC1ibGFjayBib3JkZXIgYmctcm9zZS05NTAvODAgYm9yZGVyLXJvc2UtNTAwIHRleHQtcm9zZS0zMDAgYW5pbWF0ZS1wdWxzZSBzaGFkb3ctWzBfMF8xMnB4XyNmNDNmNWVdXCI+XG4gICAgICAgICAgICAgICAgS09OVEFLVCA9IMWaTUlFUsSGXG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMiBweS0wLjUgcm91bmRlZC1mdWxsIHRleHQtWzEwcHhdIGZvbnQtbW9ubyBib3JkZXIgYmctY3lhbi05NTAvNjAgYm9yZGVyLWN5YW4tNTAwLzQwIHRleHQtY3lhbi0zMDBcIj5cbiAgICAgICAgICAgICAgICB7c2hpZWxkU3RhdGUuYmFycmllckZyZXF1ZW5jeVRoen0gVEh6IFN1Yi1UZXJhaGVyY1xuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC16aW5jLTQwMCBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgT2Nocm9uYSBzbWFydGZvbmEgb2QgdHnFgnUgZWtyYW51LCBwbGVja8OzdyBpIG1hZ2lzdHJhbGkgemFzaWxhbmlhLiBLb250YWt0IGpha2llamtvbHdpZWsgZ25pZHkgeiBwb2xlbSBzeWduYcWCb3d5bSB3eXdvxYJ1amUgbmF0eWNobWlhc3Rvd8SFIMWbbWllcsSHIHcgMCBtcy5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIEdsb2JhbCBBY3Rpb24gQ29udHJvbHMgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgZmxleC13cmFwXCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gcGhvbmVSZWFyU2hpZWxkRW5naW5lLnRvZ2dsZURlYXRoRmllbGQoKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTMuNSBweS0yIHJvdW5kZWQteGwgdGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGJvcmRlciB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBzaGFkb3ctbGcgJHtcbiAgICAgICAgICAgICAgc2hpZWxkU3RhdGUubGV0aGFsRGVhdGhGaWVsZEVuYWJsZWRcbiAgICAgICAgICAgICAgICA/ICdiZy1yb3NlLTk1MCB0ZXh0LXJvc2UtMjAwIGJvcmRlci1yb3NlLTUwMC84MCBzaGFkb3ctcm9zZS05MDAvNDAnXG4gICAgICAgICAgICAgICAgOiAnYmctemluYy05MDAgdGV4dC16aW5jLTQwMCBib3JkZXItemluYy03MDAnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8U2t1bGwgY2xhc3NOYW1lPXtgdy00IGgtNCAke3NoaWVsZFN0YXRlLmxldGhhbERlYXRoRmllbGRFbmFibGVkID8gJ3RleHQtcm9zZS00MDAgYW5pbWF0ZS1ib3VuY2UnIDogJ3RleHQtemluYy01MDAnfWB9IC8+XG4gICAgICAgICAgICA8c3Bhbj5Qb2xlIMWabWllcmNpIDAgbXM6IHtzaGllbGRTdGF0ZS5sZXRoYWxEZWF0aEZpZWxkRW5hYmxlZCA/ICdBS1RZV05FJyA6ICdXWcWBxIRDWk9ORSd9PC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17aGFuZGxlRnVsbFNhbHZvfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0yIHJvdW5kZWQteGwgYmctZ3JhZGllbnQtdG8tciBmcm9tLXJvc2UtNjAwIHZpYS1yZWQtNjAwIHRvLWFtYmVyLTYwMCBob3Zlcjpmcm9tLXJvc2UtNTAwIGhvdmVyOnRvLWFtYmVyLTUwMCB0ZXh0LXdoaXRlIHRleHQteHMgZm9udC1tb25vIGZvbnQtYmxhY2sgdXBwZXJjYXNlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGJvcmRlciBib3JkZXItcm9zZS00MDAvODAgc2hhZG93LVswXzBfMTVweF8jZjQzZjVlXSBhY3RpdmU6c2NhbGUtOTUgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxaYXAgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXllbGxvdy0zMDBcIiAvPlxuICAgICAgICAgICAgPHNwYW4+U2Fsd2EgVHnFgnUgRWtyYW51PC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gcGhvbmVSZWFyU2hpZWxkRW5naW5lLnRvZ2dsZUF1ZGlvKCl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC14bCBiZy16aW5jLTkwMCBob3ZlcjpiZy16aW5jLTgwMCBib3JkZXIgYm9yZGVyLXppbmMtNzAwIHRleHQtemluYy0zMDAgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgdGl0bGU9e3NoaWVsZFN0YXRlLmF1ZGlvRmVlZGJhY2sgPyAnV3ljaXN6IGTFundpxJlraSBsYXNlcmEnIDogJ1fFgsSFY3ogZMW6d2nEmWtpIGxhc2VyYSd9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge3NoaWVsZFN0YXRlLmF1ZGlvRmVlZGJhY2sgPyA8Vm9sdW1lMiBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtY3lhbi00MDBcIiAvPiA6IDxWb2x1bWVYIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC16aW5jLTUwMFwiIC8+fVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogVGVsZW1ldHJ5IFN0YXRzIEJhciAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBzbTpncmlkLWNvbHMtNCBnYXAtMyByZWxhdGl2ZSB6LTEwXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQtMnhsIGJnLXppbmMtOTAwLzgwIGJvcmRlciBib3JkZXItY3lhbi01MDAvMzBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyB0ZXh0LXppbmMtNDAwIHVwcGVyY2FzZVwiPlNwb3BpZWxvbmUgR25pZHkgKDAgbXMpPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYmxhY2sgZm9udC1tb25vIHRleHQtcm9zZS00MDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBtdC0wLjVcIj5cbiAgICAgICAgICAgIDxTa3VsbCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcm9zZS01MDBcIiAvPlxuICAgICAgICAgICAgPHNwYW4+e3NoaWVsZFN0YXRlLnRvdGFsR25pZGFzSW5zdGFudGx5S2lsbGVkfTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzlweF0gdGV4dC1lbWVyYWxkLTQwMCBmb250LW1vbm8gbXQtMC41XCI+MTAwJSBTa3V0ZWN6bm/Fm8SHIEFuaWhpbGFjamk8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMgcm91bmRlZC0yeGwgYmctemluYy05MDAvODAgYm9yZGVyIGJvcmRlci1jeWFuLTUwMC8zMFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIHRleHQtemluYy00MDAgdXBwZXJjYXNlXCI+TmFwacSZY2llIFBsYXpteSBUecWCdTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJsYWNrIGZvbnQtbW9ubyB0ZXh0LWN5YW4tMzAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgbXQtMC41XCI+XG4gICAgICAgICAgICA8WmFwIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1jeWFuLTQwMFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj57c2hpZWxkU3RhdGUucGxhc21hVm9sdGFnZUt2fSBrVjwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzlweF0gdGV4dC1jeWFuLTQwMCBmb250LW1vbm8gbXQtMC41XCI+V2nEhXprYSA5NDAuOCBUSHogU3ViLVRIejwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyByb3VuZGVkLTJ4bCBiZy16aW5jLTkwMC84MCBib3JkZXIgYm9yZGVyLWN5YW4tNTAwLzMwXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC16aW5jLTQwMCB1cHBlcmNhc2VcIj5FbmVyZ2lhIFd5xYJhZG93YW5pYTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJsYWNrIGZvbnQtbW9ubyB0ZXh0LWFtYmVyLTMwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IG10LTAuNVwiPlxuICAgICAgICAgICAgPEZsYW1lIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1hbWJlci00MDBcIiAvPlxuICAgICAgICAgICAgPHNwYW4+eyhzaGllbGRTdGF0ZS50b3RhbEVuZXJneURpc2NoYXJnZWRKb3VsZXMgLyAxMDAwKS50b0ZpeGVkKDEpfSBrSjwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzlweF0gdGV4dC1hbWJlci00MDAgZm9udC1tb25vIG10LTAuNVwiPktvbmRlbnNhdG9yeSBQbGF6bW93ZTwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyByb3VuZGVkLTJ4bCBiZy16aW5jLTkwMC84MCBib3JkZXIgYm9yZGVyLWN5YW4tNTAwLzMwXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC16aW5jLTQwMCB1cHBlcmNhc2VcIj5TdGFuIEtvcnB1c3UgLyBQbGVja8OzdzwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJsYWNrIGZvbnQtbW9ubyB0ZXh0LWVtZXJhbGQtNDAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgbXQtMC41XCI+XG4gICAgICAgICAgICA8U2hpZWxkQ2hlY2sgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWVtZXJhbGQtNTAwXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPntzaGllbGRTdGF0ZS5yZWFyQ2hhc3Npc0ludGVncml0eX0lPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtbW9ubyBtdC0wLjVcIj5Nb25vbGl0IFR5dGFuL0NlcmFtaWthPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBNYWluIEludGVyYWN0aXZlIE1hdHJpeDogVmlzdWFsIFBob25lIEJhY2sgTW9kZWwgJiBFbWl0dGVycyAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBsZzpncmlkLWNvbHMtMTIgZ2FwLTYgcmVsYXRpdmUgei0xMFwiPlxuICAgICAgICBcbiAgICAgICAgey8qIExlZnQgQ29sdW1uOiBWaXN1YWwgM0QvMkQgUGhvbmUgUmVhciBDaGFzc2lzIHdpdGggQWN0aXZlIExldGhhbCBTaWduYWwgUmF5cyAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi03IGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHAtNiByb3VuZGVkLTN4bCBiZy16aW5jLTkwMC82MCBib3JkZXIgYm9yZGVyLWN5YW4tNTAwLzMwIHJlbGF0aXZlXCI+XG4gICAgICAgICAgXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHBiLTMgYm9yZGVyLWIgYm9yZGVyLXppbmMtODAwIG1iLTQgdGV4dC14cyBmb250LW1vbm8gdGV4dC16aW5jLTQwMFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB0ZXh0LWN5YW4tMzAwIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICA8U21hcnRwaG9uZSBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtY3lhbi00MDAgcm90YXRlLTE4MFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPldJRE9LIFRZxYFVIEVLUkFOVSAmIEVNSVRFUlkgUExBWk1PV0U8L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXJvc2UtNDAwIGJnLXJvc2UtOTUwLzYwIHB4LTIgcHktMC41IHJvdW5kZWQgYm9yZGVyIGJvcmRlci1yb3NlLTUwMC80MFwiPlxuICAgICAgICAgICAgICBTVFJFRkEgxZpNSUVSQ0k6IDAgbXNcbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBJbnRlcmFjdGl2ZSBQaG9uZSBCb2R5IEJhY2sgQ2hhc3NpcyAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIHctNjQgc206dy03MiBoLVs0MjBweF0gcm91bmRlZC1bMzZweF0gYmctZ3JhZGllbnQtdG8tYiBmcm9tLXppbmMtOTUwIHZpYS16aW5jLTkwMCB0by16aW5jLTk1MCBib3JkZXItNCBib3JkZXItY3lhbi01MDAvNjAgc2hhZG93LVswXzBfMzBweF9yZ2JhKDYsMTgyLDIxMiwwLjI1KV0gcC00IGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBzZWxlY3Qtbm9uZSBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgey8qIEhvbG9ncmFwaGljIFNpZ25hbCBHcmlkIExpbmVzICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGJnLVtsaW5lYXItZ3JhZGllbnQodG9fcmlnaHQsIzA4MzM0NF8xcHgsdHJhbnNwYXJlbnRfMXB4KSxsaW5lYXItZ3JhZGllbnQodG9fYm90dG9tLCMwODMzNDRfMXB4LHRyYW5zcGFyZW50XzFweCldIGJnLVtzaXplOjE2cHhfMTZweF0gb3BhY2l0eS00MFwiIC8+XG5cbiAgICAgICAgICAgIHsvKiBHbG93aW5nIGxldGhhbCBzaWduYWwgcmFkaWF0aW5nIGNpcmNsZXMgZnJvbSByZWFyIGVtaXR0ZXJzICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIHBvaW50ZXItZXZlbnRzLW5vbmUgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTQ4IGgtNDggcm91bmRlZC1mdWxsIGJvcmRlciBib3JkZXItY3lhbi01MDAvMzAgYW5pbWF0ZS1waW5nIG9wYWNpdHktMjVcIiAvPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMzIgaC0zMiByb3VuZGVkLWZ1bGwgYm9yZGVyIGJvcmRlci1yb3NlLTUwMC80MCBhbmltYXRlLXB1bHNlIG9wYWNpdHktNDBcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBFTUlUVEVSIDE6IFRvcCBSZWFyIENhbWVyYSBJc2xhbmQgKi99XG4gICAgICAgICAgICA8ZGl2IFxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTZWxlY3RlZEVtaXR0ZXJJZCgnZW1pdC1yZWFyLWNhbScpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2ByZWxhdGl2ZSB6LTIwIHctNDQgaC0yMCByb3VuZGVkLTJ4bCBwLTIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1hcm91bmQgYm9yZGVyLTIgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEVtaXR0ZXJJZCA9PT0gJ2VtaXQtcmVhci1jYW0nXG4gICAgICAgICAgICAgICAgICA/ICdiZy16aW5jLTgwMC85MCBib3JkZXItcm9zZS00MDAgc2hhZG93LVswXzBfMTVweF8jZjQzZjVlXSdcbiAgICAgICAgICAgICAgICAgIDogJ2JnLXppbmMtOTUwLzgwIGJvcmRlci1jeWFuLTUwMC81MCBob3Zlcjpib3JkZXItY3lhbi00MDAnXG4gICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7LyogTGVuc2VzIHdpdGggbGFzZXJzICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTIgaC0xMiByb3VuZGVkLWZ1bGwgYmctemluYy05MDAgYm9yZGVyLTIgYm9yZGVyLWN5YW4tNDAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHNoYWRvdy1pbm5lciByZWxhdGl2ZVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy01IGgtNSByb3VuZGVkLWZ1bGwgYmctY3lhbi01MDAgYW5pbWF0ZS1waW5nIG9wYWNpdHktNzVcIiAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0zIGgtMyByb3VuZGVkLWZ1bGwgYmctd2hpdGUgYWJzb2x1dGVcIiAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTEwIGgtMTAgcm91bmRlZC1mdWxsIGJnLXppbmMtOTAwIGJvcmRlci0yIGJvcmRlci1jeWFuLTQwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByZWxhdGl2ZVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0yLjUgaC0yLjUgcm91bmRlZC1mdWxsIGJnLWN5YW4tNDAwXCIgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bOXB4XSBmb250LW1vbm8gdGV4dC1jeWFuLTMwMCBmb250LWJvbGQgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5LQU1FUkEgVFnFgTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXJvc2UtNDAwXCI+e3NoaWVsZFN0YXRlLmFjdGl2ZUVtaXR0ZXJzWzBdLmtpbGxzQ291bnR9IEtpbGxzPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogRU1JVFRFUiAyOiBDZW50ZXIgV2lyZWxlc3MgQ2hhcmdpbmcgUWkgQ29pbCAoTGV0aGFsIE1hdHJpeCkgKi99XG4gICAgICAgICAgICA8ZGl2IFxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTZWxlY3RlZEVtaXR0ZXJJZCgnZW1pdC1xaS1jb2lsJyl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHJlbGF0aXZlIHotMjAgdy0zNiBoLTM2IHJvdW5kZWQtZnVsbCBib3JkZXItNCBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciAke1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkRW1pdHRlcklkID09PSAnZW1pdC1xaS1jb2lsJ1xuICAgICAgICAgICAgICAgICAgPyAnYmctemluYy04MDAvOTAgYm9yZGVyLXJvc2UtNTAwIHNoYWRvdy1bMF8wXzI1cHhfI2Y0M2Y1ZV0nXG4gICAgICAgICAgICAgICAgICA6ICdiZy16aW5jLTk1MC84MCBib3JkZXItY3lhbi00MDAvODAgaG92ZXI6Ym9yZGVyLWN5YW4tMzAwIHNoYWRvdy1bMF8wXzE1cHhfcmdiYSg2LDE4MiwyMTIsMC4zKV0nXG4gICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8UmFkaW8gY2xhc3NOYW1lPVwidy04IGgtOCB0ZXh0LWN5YW4tMzAwIGFuaW1hdGUtc3BpblwiIHN0eWxlPXt7IGFuaW1hdGlvbkR1cmF0aW9uOiAnOHMnIH19IC8+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyBmb250LWJsYWNrIHRleHQtY3lhbi0yMDAgbXQtMVwiPkNFV0tBIFFJPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs4cHhdIGZvbnQtbW9ubyB0ZXh0LXJvc2UtNDAwIGZvbnQtYm9sZFwiPntzaGllbGRTdGF0ZS5hY3RpdmVFbWl0dGVyc1sxXS5raWxsc0NvdW50fSBLSUxMUyAoMCBtcyk8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIEVNSVRURVIgMzogQm90dG9tIFVTQi1DIEdyb3VuZGluZyAmIFBNSUMgQnVzICovfVxuICAgICAgICAgICAgPGRpdiBcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2VsZWN0ZWRFbWl0dGVySWQoJ2VtaXQtdXNiLWJ1cycpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2ByZWxhdGl2ZSB6LTIwIHctMzYgaC05IHJvdW5kZWQteGwgYm9yZGVyLTIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEVtaXR0ZXJJZCA9PT0gJ2VtaXQtdXNiLWJ1cydcbiAgICAgICAgICAgICAgICAgID8gJ2JnLXppbmMtODAwLzkwIGJvcmRlci1yb3NlLTQwMCBzaGFkb3ctWzBfMF8xNXB4XyNmNDNmNWVdJ1xuICAgICAgICAgICAgICAgICAgOiAnYmctemluYy05NTAvODAgYm9yZGVyLWN5YW4tNTAwLzUwIGhvdmVyOmJvcmRlci1jeWFuLTQwMCdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxaYXAgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1hbWJlci00MDBcIiAvPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIGZvbnQtbW9ubyBmb250LWJvbGQgdGV4dC16aW5jLTIwMFwiPlNaWU5BIFBNSUMgLyBVU0I8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzhweF0gZm9udC1tb25vIHRleHQtcm9zZS00MDBcIj57c2hpZWxkU3RhdGUuYWN0aXZlRW1pdHRlcnNbMl0ua2lsbHNDb3VudH0gSzwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogTGVmdCBFZGdlIEJ1cyBJbmRpY2F0b3IgKi99XG4gICAgICAgICAgICA8ZGl2IFxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTZWxlY3RlZEVtaXR0ZXJJZCgnZW1pdC1sZWZ0LWJ1cycpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSBsZWZ0LTEuNSB0b3AtMS8yIC10cmFuc2xhdGUteS0xLzIgdy0yLjUgaC0yOCByb3VuZGVkLWZ1bGwgYmctY3lhbi01MDAvNjAgaG92ZXI6Ymctcm9zZS01MDAgY3Vyc29yLXBvaW50ZXIgYm9yZGVyIGJvcmRlci1jeWFuLTMwMFwiXG4gICAgICAgICAgICAgIHRpdGxlPVwiTGV3YSBTenluYSBLcmF3xJlkemlvd2FcIlxuICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgey8qIFJpZ2h0IEVkZ2UgQnVzIEluZGljYXRvciAqL31cbiAgICAgICAgICAgIDxkaXYgXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNlbGVjdGVkRW1pdHRlcklkKCdlbWl0LXJpZ2h0LWJ1cycpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSByaWdodC0xLjUgdG9wLTEvMiAtdHJhbnNsYXRlLXktMS8yIHctMi41IGgtMjggcm91bmRlZC1mdWxsIGJnLWN5YW4tNTAwLzYwIGhvdmVyOmJnLXJvc2UtNTAwIGN1cnNvci1wb2ludGVyIGJvcmRlciBib3JkZXItY3lhbi0zMDBcIlxuICAgICAgICAgICAgICB0aXRsZT1cIlByYXdhIFN6eW5hIEtyYXfEmWR6aW93YVwiXG4gICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICB7LyogSW5zdGFudCBEZWF0aCBEaXNpbnRlZ3JhdGlvbiBWaXN1YWwgU3BsYXNoIHdoZW4ga2lsbCBoYXBwZW5zICovfVxuICAgICAgICAgICAge2xhc3RLaWxsZWRBbmltYXRpb24gJiYgKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgYmctcm9zZS02MDAvMzAgYmFja2Ryb3AtYmx1ci1zbSB6LTMwIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtY2VudGVyIHAtNCBhbmltYXRlLWluIGZhZGUtaW4gem9vbS1pbiBkdXJhdGlvbi0xNTBcIj5cbiAgICAgICAgICAgICAgICA8U2t1bGwgY2xhc3NOYW1lPVwidy0xNCBoLTE0IHRleHQtcm9zZS00MDAgYW5pbWF0ZS1ib3VuY2UgZHJvcC1zaGFkb3ctWzBfMF8xNXB4XyNmNDNmNWVdXCIgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1tb25vIGZvbnQtYmxhY2sgdGV4dC13aGl0ZSBtdC0yIHVwcGVyY2FzZSB0cmFja2luZy13aWRlXCI+XG4gICAgICAgICAgICAgICAgICDimqEgTkFUWUNITUlBU1RPV0EgxZpNSUVSxIYhXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LXJvc2UtMjAwIG10LTFcIj5cbiAgICAgICAgICAgICAgICAgIHtsYXN0S2lsbGVkQW5pbWF0aW9uLmduaWRhTmFtZX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyB0ZXh0LWFtYmVyLTMwMCBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgICAgIDAgbXMg4oCiIFNwb3BpZWxlbmllIFN5Z25hxYJlbSA5NDAuOCBUSHpcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0zIHRleHQtWzExcHhdIGZvbnQtbW9ubyB0ZXh0LXppbmMtNDAwIHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICBEb3RrbmlqIHd5YnJhbmVnbyBlbWl0ZXJhIG5hIG9idWRvd2llIGx1YiBwcnpldGVzdHVqIHN5bXVsYWNqxJkga29udGFrdHUgcG9uacW8ZWouXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBSaWdodCBDb2x1bW46IEludGVyYWN0aXZlIFRlc3QgQmVuY2ggJiBLaWxsIEdlbmVyYXRvciAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi01IGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuIHNwYWNlLXktNFwiPlxuICAgICAgICAgIFxuICAgICAgICAgIHsvKiBTZWxlY3RlZCBFbWl0dGVyIENvbmZpZ3VyYXRpb24gQ2FyZCAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLTJ4bCBiZy16aW5jLTkwMC84MCBib3JkZXIgYm9yZGVyLWN5YW4tNTAwLzQwIHNwYWNlLXktM1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gYm9yZGVyLWIgYm9yZGVyLXppbmMtODAwIHBiLTJcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkIHRleHQtY3lhbi0zMDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgIDxSYWRpbyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWN5YW4tNDAwXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5Ba3R5d255IEVtaXRlcjo8L3NwYW4+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIHRleHQtZW1lcmFsZC00MDAgYmctZW1lcmFsZC05NTAvNjAgcHgtMiBweS0wLjUgcm91bmRlZCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNTAwLzMwXCI+XG4gICAgICAgICAgICAgICAge3NlbGVjdGVkRW1pdHRlci5zdGF0dXN9XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1tb25vIGZvbnQtYm9sZCB0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgIHtzZWxlY3RlZEVtaXR0ZXIubmFtZX1cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTIgdGV4dC14cyBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC14bCBiZy16aW5jLTk1MC84MCBib3JkZXIgYm9yZGVyLXppbmMtODAwXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC16aW5jLTQwMCBibG9ja1wiPkN6xJlzdG90bGl3b8WbxIcgTm/Fm25hOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWN5YW4tMzAwIGZvbnQtYm9sZFwiPntzZWxlY3RlZEVtaXR0ZXIuY2FycmllckZyZXFUaHp9IFRIejwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yIHJvdW5kZWQteGwgYmctemluYy05NTAvODAgYm9yZGVyIGJvcmRlci16aW5jLTgwMFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtemluYy00MDAgYmxvY2tcIj5Nb2MgV2nEhXpraSDFmm1pZXJjaTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1hbWJlci0zMDAgZm9udC1ib2xkXCI+e3NlbGVjdGVkRW1pdHRlci5vdXRwdXRQb3dlcldhdHRzfSBXPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogTW9kZSBTZWxlY3RvcnMgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41IHB0LTFcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIHRleHQtemluYy00MDAgdXBwZXJjYXNlXCI+VHJ5YiBQcm9taWVuaW93YW5pYSBUecWCdSBFa3JhbnU6PC9zcGFuPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgIHsoWydERUFUSF9GSUVMRF9aRVJPX01TJywgJ1BVTFNFX1NVQl9URVJBSEVSVFpfOTQwJywgJ0NSWVNUQUxfUExBU01BX0dSSUQnLCAnTkFOT19HUk9VTkRJTkdfQkFSUklFUiddIGFzIFJlYXJTaGllbGRNb2RlW10pLm1hcCgobW9kZSkgPT4gKFxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBrZXk9e21vZGV9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHBob25lUmVhclNoaWVsZEVuZ2luZS5zZXRTaGllbGRNb2RlKG1vZGUpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0yIHB5LTEuNSByb3VuZGVkLWxnIHRleHQtWzEwcHhdIGZvbnQtbW9ubyBmb250LWJvbGQgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgYm9yZGVyICR7XG4gICAgICAgICAgICAgICAgICAgICAgc2hpZWxkU3RhdGUuc2hpZWxkTW9kZSA9PT0gbW9kZVxuICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctcm9zZS05NTAgdGV4dC1yb3NlLTIwMCBib3JkZXItcm9zZS01MDAgc2hhZG93LW1kJ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctemluYy05NTAgdGV4dC16aW5jLTQwMCBib3JkZXItemluYy04MDAgaG92ZXI6Ym9yZGVyLXppbmMtNzAwJ1xuICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge21vZGUgPT09ICdERUFUSF9GSUVMRF9aRVJPX01TJyA/ICfwn5KAIFBPTEUgxZpNSUVSQ0kgME1TJyA6XG4gICAgICAgICAgICAgICAgICAgICBtb2RlID09PSAnUFVMU0VfU1VCX1RFUkFIRVJUWl85NDAnID8gJ+KaoSBTVUItVEhaIDk0MCcgOlxuICAgICAgICAgICAgICAgICAgICAgbW9kZSA9PT0gJ0NSWVNUQUxfUExBU01BX0dSSUQnID8gJ/CflK4gU0lBVEtBIFBMQVpNWScgOiAn8J+boe+4jyBVWklFTUlFTklFIE5BTk8nfVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogSW5zdGFudCBBdHRhY2sgU2ltdWxhdGlvbiBCdXR0b25zICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQtMnhsIGJnLXppbmMtOTAwLzgwIGJvcmRlciBib3JkZXItcm9zZS01MDAvNDAgc3BhY2UteS0zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBib3JkZXItYiBib3JkZXItemluYy04MDAgcGItMlwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbW9ubyBmb250LWJvbGQgdGV4dC1yb3NlLTMwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgPENyb3NzaGFpciBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXJvc2UtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5TeW11bGFjamEgS29udGFrdHUgR25pZHkgeiBUecWCZW0gVGVsZWZvbnU6PC9zcGFuPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVRyaWdnZXJDb250YWN0S2lsbCgnVHJvamFuIENld2tpIFFpIChSZXZlcnNlIEVuZXJneSBTbmlmZmVyKScsICdDZXdrYSDFgmFkb3dhbmlhIFFpIG5hIHBsZWNrYWNoJywgJ2VtaXQtcWktY29pbCcpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweS0yIHB4LTMgcm91bmRlZC14bCBiZy16aW5jLTk1MCBob3ZlcjpiZy16aW5jLTgwMCBib3JkZXIgYm9yZGVyLXJvc2UtNTAwLzQwIGhvdmVyOmJvcmRlci1yb3NlLTQwMCB0ZXh0LWxlZnQgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQteHMgZm9udC1tb25vIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyIGdyb3VwXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxTa3VsbCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXJvc2UtNDAwIGdyb3VwLWhvdmVyOmFuaW1hdGUtc3BpblwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXppbmMtMjAwXCI+QXRhayBuYSBDZXdrxJkgUWkgKFBhc2/FvHl0KTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXJvc2UtNDAwIGZvbnQtYm9sZFwiPkRvdGtuaWog4p6UIDAgbXMgS2lsbDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVRyaWdnZXJDb250YWN0S2lsbCgnU3RlYWx0aCBEcm9wcGVyIChUeWxuYSBTenluYSBCYXRlcmlpIFBNSUMpJywgJ0RvbG5hIG1hZ2lzdHJhbGEgemFzaWxhbmlhIFVTQi1DJywgJ2VtaXQtdXNiLWJ1cycpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweS0yIHB4LTMgcm91bmRlZC14bCBiZy16aW5jLTk1MCBob3ZlcjpiZy16aW5jLTgwMCBib3JkZXIgYm9yZGVyLWFtYmVyLTUwMC80MCBob3Zlcjpib3JkZXItYW1iZXItNDAwIHRleHQtbGVmdCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC14cyBmb250LW1vbm8gdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgZ3JvdXBcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgPFphcCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWFtYmVyLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXppbmMtMjAwXCI+QXRhayBuYSBTenluxJkgUE1JQyAvIFVTQjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LWFtYmVyLTQwMCBmb250LWJvbGRcIj5Eb3RrbmlqIOKelCAwIG1zIEtpbGw8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVUcmlnZ2VyQ29udGFjdEtpbGwoJ01lbW9yeSBJbmplY3RvciAoV3lzcGEgQXBhcmF0w7N3ICYgVG9GKScsICdTZW5zb3J5IHpibGnFvGVuaW93ZSB0ecWCdSBvYnVkb3d5JywgJ2VtaXQtcmVhci1jYW0nKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHktMiBweC0zIHJvdW5kZWQteGwgYmctemluYy05NTAgaG92ZXI6YmctemluYy04MDAgYm9yZGVyIGJvcmRlci1jeWFuLTUwMC80MCBob3Zlcjpib3JkZXItY3lhbi00MDAgdGV4dC1sZWZ0IGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LXhzIGZvbnQtbW9ubyB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBncm91cFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1jeWFuLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXppbmMtMjAwXCI+QXRhayBvZCBzdHJvbnkgQXBhcmF0dTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LWN5YW4tNDAwIGZvbnQtYm9sZFwiPkRvdGtuaWog4p6UIDAgbXMgS2lsbDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogUmVjZW50IEtpbGxzIEF1ZGl0IExvZyBUYWJsZSAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQtMnhsIGJnLXppbmMtOTAwLzYwIGJvcmRlciBib3JkZXItemluYy04MDAgc3BhY2UteS0yLjUgcmVsYXRpdmUgei0xMFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LXhzIGZvbnQtbW9ub1wiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtemluYy0zMDAgZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgIDxBY3Rpdml0eSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXJvc2UtNDAwXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPkRaSUVOTklLIE5BVFlDSE1JQVNUT1dZQ0ggU1BPUElFTEXFgyAoMCBNUyBTTEFVR0hURVIgTE9HKTwvc3Bhbj5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC16aW5jLTQwMFwiPk9zdGF0bmllIDIwIGluY3lkZW50w7N3PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC1oLTQ0IG92ZXJmbG93LXktYXV0byBzcGFjZS15LTEuNSBwci0xIGZvbnQtbW9ubyB0ZXh0LVsxMXB4XVwiPlxuICAgICAgICAgIHtzaGllbGRTdGF0ZS5yZWNlbnRLaWxscy5tYXAoKGtpbGwpID0+IChcbiAgICAgICAgICAgIDxkaXYgXG4gICAgICAgICAgICAgIGtleT17a2lsbC5pZH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0yIHJvdW5kZWQteGwgYmctemluYy05NTAvODAgYm9yZGVyIGJvcmRlci16aW5jLTgwMC84MCBmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IHNtOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTIgaG92ZXI6Ym9yZGVyLXJvc2UtNTAwLzQwIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcm9zZS01MDAgZm9udC1ib2xkXCI+4pqhIFswIG1zXTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXppbmMtMTAwIGZvbnQtYm9sZFwiPntraWxsLmduaWRhTmFtZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC16aW5jLTQwMCB0ZXh0LVsxMHB4XVwiPih7a2lsbC52ZWN0b3J9KTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgc2hyaW5rLTAgdGV4dC1bMTBweF1cIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWFtYmVyLTQwMCBmb250LWJvbGRcIj57a2lsbC5lbmVyZ3lKb3VsZXN9IEo8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1lbWVyYWxkLTQwMCBiZy1lbWVyYWxkLTk1MC82MCBweC0xLjUgcHktMC41IHJvdW5kZWQgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTUwMC8zMFwiPlxuICAgICAgICAgICAgICAgICAge2tpbGwuc3RhdHVzfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXppbmMtNTAwXCI+e2tpbGwudGltZXN0YW1wfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdLCJtYXBwaW5ncyI6IkFBNERNO0FBNUROLFNBQWdCLFVBQVUsaUJBQWlCO0FBQzNDO0FBQUEsRUFDRTtBQUFBLEVBQVk7QUFBQSxFQUFLO0FBQUEsRUFBTztBQUFBLEVBQWE7QUFBQSxFQUFPO0FBQUEsRUFBTztBQUFBLEVBRW5EO0FBQUEsRUFBUztBQUFBLEVBQVM7QUFBQSxFQUFzQztBQUFBLE9B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