import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-toolkit/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=019a4779"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-toolkit/node_modules/.vite/deps/react.js?v=019a4779"; const useState = __vite__cjsImport1_react["useState"]; const useMemo = __vite__cjsImport1_react["useMemo"];
import {
  Activity,
  RefreshCw,
  Skull,
  Search,
  Zap
} from "/sentinel-toolkit/node_modules/.vite/deps/lucide-react.js?v=6cbc5a0a";
import { getGnidaThreatScore, getThreatColor } from "/sentinel-toolkit/src/components/MilitaryRadarScanner.tsx";
export const ActiveRadarProcessRoster = ({
  gnidas,
  selectedTargetId,
  sweepAngle,
  sweepSpeedRpm,
  illuminatedGnidaIds,
  isForceRefreshing,
  onSelectTarget,
  onTriggerOmniScan,
  onSpawnGnida,
  onTriggerCascade,
  onOpenDossier,
  systemIntegrityPercent
}) => {
  const [filterMode, setFilterMode] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const activeCount = useMemo(() => gnidas.filter((g) => g.state !== "ZNISZCZONA").length, [gnidas]);
  const purgedCount = useMemo(() => gnidas.filter((g) => g.state === "ZNISZCZONA").length, [gnidas]);
  const criticalCount = useMemo(() => gnidas.filter((g) => getGnidaThreatScore(g) >= 80).length, [gnidas]);
  const filteredGnidas = useMemo(() => {
    let list = gnidas;
    if (filterMode === "ACTIVE") {
      list = list.filter((g) => g.state !== "ZNISZCZONA");
    } else if (filterMode === "CRITICAL") {
      list = list.filter((g) => getGnidaThreatScore(g) >= 80);
    } else if (filterMode === "PURGED") {
      list = list.filter((g) => g.state === "ZNISZCZONA");
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (g) => g.name.toLowerCase().includes(q) || g.activeProcessName.toLowerCase().includes(q) || g.typeLabel.toLowerCase().includes(q) || g.associatedIONodeId.toLowerCase().includes(q)
      );
    }
    return list;
  }, [gnidas, filterMode, searchTerm]);
  return /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-slate-900/95 border border-emerald-800/70 shadow-2xl space-y-3.5 relative overflow-hidden backdrop-blur-md", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "radar-scanline-effect" }, void 0, false, {
      fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
      lineNumber: 72,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80", children: [
      /* @__PURE__ */ jsxDEV("div", { children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm", children: /* @__PURE__ */ jsxDEV(Activity, { className: "w-4 h-4 text-emerald-400 animate-pulse" }, void 0, false, {
          fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
          lineNumber: 79,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
          lineNumber: 78,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-black text-white font-mono tracking-wide", children: "AKTYWNY RADAR: WYKRYTE PROCESY (GNIDY)" }, void 0, false, {
              fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
              lineNumber: 83,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-600 animate-pulse", children: "X-BAND 9.4 GHz" }, void 0, false, {
              fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
              lineNumber: 86,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
            lineNumber: 82,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] font-mono text-emerald-400/90 flex items-center gap-2 mt-0.5", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" }, void 0, false, {
              fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
              lineNumber: 91,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              "Kąt wiązki: ",
              Math.round(sweepAngle),
              "° | Echa w locie: ",
              activeCount,
              " | ",
              sweepSpeedRpm,
              " RPM"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
              lineNumber: 92,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
            lineNumber: 90,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
          lineNumber: 81,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
        lineNumber: 77,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
        lineNumber: 76,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: onTriggerOmniScan,
            disabled: isForceRefreshing,
            className: "px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-emerald-300 border border-emerald-700/60 text-xs font-mono font-bold flex items-center gap-1 transition-all cursor-pointer shadow-sm hover:border-emerald-400 active:scale-95",
            title: "Wymuś pełny skan dookólny 360° i odświeżenie echa procesów",
            children: [
              /* @__PURE__ */ jsxDEV(RefreshCw, { className: `w-3 h-3 ${isForceRefreshing ? "animate-spin text-emerald-400" : ""}` }, void 0, false, {
                fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
                lineNumber: 106,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: isForceRefreshing ? "Odświeżanie..." : "Odśwież Skan" }, void 0, false, {
                fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
                lineNumber: 107,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
            lineNumber: 100,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: onSpawnGnida,
            className: "px-2.5 py-1 rounded-lg bg-purple-950/80 hover:bg-purple-900 text-purple-300 border border-purple-700/60 text-xs font-mono font-bold flex items-center gap-1 transition-all cursor-pointer shadow-sm active:scale-95",
            title: "Wypuść nową wrogą gnidę na ekran radaru",
            children: [
              /* @__PURE__ */ jsxDEV(Skull, { className: "w-3 h-3 text-purple-400" }, void 0, false, {
                fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
                lineNumber: 115,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "+ Wypuść Gnidę" }, void 0, false, {
                fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
                lineNumber: 116,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
            lineNumber: 110,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
        lineNumber: 99,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
      lineNumber: 75,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "relative", children: [
        /* @__PURE__ */ jsxDEV(Search, { className: "w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" }, void 0, false, {
          fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
          lineNumber: 124,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(
          "input",
          {
            type: "text",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            placeholder: "Szukaj procesu (np. flutter, hook, wiper, PID)...",
            className: "w-full pl-8 pr-7 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-500 placeholder:text-slate-600"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
            lineNumber: 125,
            columnNumber: 11
          },
          this
        ),
        searchTerm && /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setSearchTerm(""),
            className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white text-xs font-mono",
            children: "✕"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
            lineNumber: 133,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
        lineNumber: 123,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 overflow-x-auto pb-0.5 text-[11px] font-mono", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setFilterMode("ALL"),
            className: `px-2 py-0.5 rounded-lg border transition-colors cursor-pointer ${filterMode === "ALL" ? "bg-emerald-950 text-emerald-300 border-emerald-500 font-bold" : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"}`,
            children: [
              "Wszystkie (",
              gnidas.length,
              ")"
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
            lineNumber: 144,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setFilterMode("ACTIVE"),
            className: `px-2 py-0.5 rounded-lg border transition-colors cursor-pointer ${filterMode === "ACTIVE" ? "bg-red-950 text-red-300 border-red-500 font-bold" : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"}`,
            children: [
              "Aktywne (",
              activeCount,
              ")"
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
            lineNumber: 154,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setFilterMode("CRITICAL"),
            className: `px-2 py-0.5 rounded-lg border transition-colors cursor-pointer ${filterMode === "CRITICAL" ? "bg-rose-950 text-rose-300 border-rose-500 font-bold" : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"}`,
            children: [
              "Krytyczne (",
              criticalCount,
              ")"
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
            lineNumber: 164,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setFilterMode("PURGED"),
            className: `px-2 py-0.5 rounded-lg border transition-colors cursor-pointer ${filterMode === "PURGED" ? "bg-purple-950 text-purple-300 border-purple-500 font-bold" : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"}`,
            children: [
              "Ubite (",
              purgedCount,
              ")"
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
            lineNumber: 174,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
        lineNumber: 143,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
      lineNumber: 122,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 max-h-[380px] overflow-y-auto pr-1", children: filteredGnidas.length === 0 ? /* @__PURE__ */ jsxDEV("div", { className: "p-6 text-center text-slate-500 text-xs font-mono bg-slate-950/60 rounded-xl border border-slate-800", children: "Brak procesów spełniających kryteria filtru." }, void 0, false, {
      fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
      lineNumber: 190,
      columnNumber: 11
    }, this) : filteredGnidas.map((gnida) => {
      const score = getGnidaThreatScore(gnida);
      const colorCfg = getThreatColor(score);
      const isSelected = gnida.id === selectedTargetId;
      const isDestroyed = gnida.state === "ZNISZCZONA";
      const lastIlluminated = illuminatedGnidaIds[gnida.id] || 0;
      const isIlluminated = Boolean(Date.now() - lastIlluminated < 1400) || isForceRefreshing;
      const processPid = 3e3 + Math.abs(gnida.id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % 6e3);
      return /* @__PURE__ */ jsxDEV(
        "div",
        {
          onClick: () => onSelectTarget(gnida.id),
          className: `p-3 rounded-xl border transition-all cursor-pointer relative overflow-hidden text-xs font-mono ${isIlluminated ? "radar-hit-active" : ""} ${isSelected ? "bg-slate-950 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)] ring-1 ring-emerald-500/50" : "bg-slate-950/80 hover:bg-slate-900 border-slate-800 hover:border-slate-700"}`,
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 min-w-0", children: [
                /* @__PURE__ */ jsxDEV(
                  "span",
                  {
                    className: `w-2.5 h-2.5 rounded-full flex-shrink-0 ${!isDestroyed ? "radar-ping-dot" : ""}`,
                    style: {
                      backgroundColor: isDestroyed ? "#64748b" : colorCfg.hex,
                      boxShadow: isDestroyed ? "none" : `0 0 8px ${colorCfg.glowHex}`
                    }
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
                    lineNumber: 221,
                    columnNumber: 21
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-white truncate text-[13px]", children: gnida.activeProcessName }, void 0, false, {
                  fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
                  lineNumber: 230,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "px-1.5 py-0.2 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400", children: [
                  "PID: ",
                  processPid
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
                  lineNumber: 233,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
                lineNumber: 219,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 flex-shrink-0", children: [
                !isDestroyed && /* @__PURE__ */ jsxDEV("div", { className: "flex items-end gap-0.5 h-3", title: "Poziom sygnału echa radarowego 9.4 GHz", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "w-1 h-1.5 bg-emerald-400 rounded-xs" }, void 0, false, {
                    fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
                    lineNumber: 242,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "w-1 h-2.5 bg-emerald-400 rounded-xs" }, void 0, false, {
                    fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
                    lineNumber: 243,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "w-1 h-3 bg-emerald-400 rounded-xs" }, void 0, false, {
                    fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
                    lineNumber: 244,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "w-1 h-3.5 bg-emerald-400/60 rounded-xs" }, void 0, false, {
                    fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
                    lineNumber: 245,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
                  lineNumber: 241,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "span",
                  {
                    className: `px-2 py-0.5 rounded text-[10px] font-black ${isDestroyed ? "bg-slate-900 text-slate-400 border border-slate-700" : "text-white"}`,
                    style: {
                      backgroundColor: isDestroyed ? void 0 : colorCfg.hex
                    },
                    children: isDestroyed ? "100% PURGED" : `${score}% THREAT`
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
                    lineNumber: 249,
                    columnNumber: 21
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
                lineNumber: 238,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
              lineNumber: 218,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "mt-2 grid grid-cols-3 gap-2 text-[10px] text-slate-400 pt-1.5 border-t border-slate-900", children: [
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 block", children: "AZYMUT / KĄT" }, void 0, false, {
                  fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
                  lineNumber: 267,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-300 font-bold", children: [
                  gnida.bearingDeg,
                  "°"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
                  lineNumber: 268,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
                lineNumber: 266,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 block", children: "DYSTANS (KM)" }, void 0, false, {
                  fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
                  lineNumber: 271,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-300 font-bold", children: [
                  Math.round(gnida.distanceRatio * 100),
                  " KM"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
                  lineNumber: 272,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
                lineNumber: 270,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 block", children: "ZAINFEKOWANY WĘZEŁ" }, void 0, false, {
                  fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
                  lineNumber: 275,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-amber-300 font-bold truncate block", children: gnida.associatedIONodeId }, void 0, false, {
                  fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
                  lineNumber: 276,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
                lineNumber: 274,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
              lineNumber: 265,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "mt-2.5 pt-2 border-t border-slate-900/90 flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500 truncate flex items-center gap-1", children: isIlluminated ? /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-bold flex items-center gap-1", children: [
                /* @__PURE__ */ jsxDEV(Zap, { className: "w-3 h-3 text-emerald-400 animate-pulse" }, void 0, false, {
                  fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
                  lineNumber: 285,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "ECHO WIĄZKI RADARU: WYKRYTY" }, void 0, false, {
                  fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
                  lineNumber: 286,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
                lineNumber: 284,
                columnNumber: 23
              }, this) : gnida.typeLabel }, void 0, false, {
                fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
                lineNumber: 282,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: (e) => {
                      e.stopPropagation();
                      onSelectTarget(gnida.id);
                      onOpenDossier(gnida.id);
                    },
                    className: "px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-[10px] transition-colors cursor-pointer",
                    title: "Otwórz pełne dossier kryminalistyczne procesu",
                    children: "Dossier"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
                    lineNumber: 294,
                    columnNumber: 21
                  },
                  this
                ),
                !isDestroyed && /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: (e) => {
                      e.stopPropagation();
                      onTriggerCascade(gnida);
                    },
                    className: "px-2 py-0.5 rounded bg-red-700 hover:bg-red-600 text-white font-bold text-[10px] transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95",
                    title: "Natychmiastowy ubój i kordon sanitarny 0 ms",
                    children: "Ubój (0 ms)"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
                    lineNumber: 307,
                    columnNumber: 23
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
                lineNumber: 293,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
              lineNumber: 281,
              columnNumber: 17
            }, this)
          ]
        },
        gnida.id,
        true,
        {
          fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
          lineNumber: 206,
          columnNumber: 15
        },
        this
      );
    }) }, void 0, false, {
      fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
      lineNumber: 188,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400", children: [
      /* @__PURE__ */ jsxDEV("span", { children: [
        "Skaner X-Band • Odświeżanie: Ciągłe (",
        sweepSpeedRpm,
        " RPM)"
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
        lineNumber: 328,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-bold", children: [
        "Monolit: ",
        systemIntegrityPercent,
        "%"
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
        lineNumber: 329,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
      lineNumber: 327,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/ActiveRadarProcessRoster.tsx",
    lineNumber: 70,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFjdGl2ZVJhZGFyUHJvY2Vzc1Jvc3Rlci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VNZW1vIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgXG4gIFJhZGlvLCBBY3Rpdml0eSwgUmVmcmVzaEN3LCBTa3VsbCwgU2VhcmNoLCBGaWx0ZXIsXG4gIFNoaWVsZCwgU2hpZWxkQWxlcnQsIFNoaWVsZENoZWNrLCBaYXAsIENyb3NzaGFpciwgVGFyZ2V0LFxuICBDaGV2cm9uUmlnaHQsIEFycm93VXBSaWdodCwgRmxhbWUsIExheWVycywgTG9jaywgQ3B1XG59IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBSYWRhckduaWRhVGFyZ2V0IH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgZ2V0R25pZGFUaHJlYXRTY29yZSwgZ2V0VGhyZWF0Q29sb3IgfSBmcm9tICcuL01pbGl0YXJ5UmFkYXJTY2FubmVyJztcblxuaW50ZXJmYWNlIFByb3BzIHtcbiAgZ25pZGFzOiBSYWRhckduaWRhVGFyZ2V0W107XG4gIHNlbGVjdGVkVGFyZ2V0SWQ6IHN0cmluZyB8IG51bGw7XG4gIHN3ZWVwQW5nbGU6IG51bWJlcjtcbiAgc3dlZXBTcGVlZFJwbTogbnVtYmVyO1xuICBpbGx1bWluYXRlZEduaWRhSWRzOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+O1xuICBpc0ZvcmNlUmVmcmVzaGluZzogYm9vbGVhbjtcbiAgb25TZWxlY3RUYXJnZXQ6IChpZDogc3RyaW5nKSA9PiB2b2lkO1xuICBvblRyaWdnZXJPbW5pU2NhbjogKCkgPT4gdm9pZDtcbiAgb25TcGF3bkduaWRhOiAoKSA9PiB2b2lkO1xuICBvblRyaWdnZXJDYXNjYWRlOiAoZ25pZGE6IFJhZGFyR25pZGFUYXJnZXQpID0+IHZvaWQ7XG4gIG9uT3BlbkRvc3NpZXI6IChpZDogc3RyaW5nKSA9PiB2b2lkO1xuICBzeXN0ZW1JbnRlZ3JpdHlQZXJjZW50OiBudW1iZXI7XG59XG5cbmV4cG9ydCBjb25zdCBBY3RpdmVSYWRhclByb2Nlc3NSb3N0ZXI6IFJlYWN0LkZDPFByb3BzPiA9ICh7XG4gIGduaWRhcyxcbiAgc2VsZWN0ZWRUYXJnZXRJZCxcbiAgc3dlZXBBbmdsZSxcbiAgc3dlZXBTcGVlZFJwbSxcbiAgaWxsdW1pbmF0ZWRHbmlkYUlkcyxcbiAgaXNGb3JjZVJlZnJlc2hpbmcsXG4gIG9uU2VsZWN0VGFyZ2V0LFxuICBvblRyaWdnZXJPbW5pU2NhbixcbiAgb25TcGF3bkduaWRhLFxuICBvblRyaWdnZXJDYXNjYWRlLFxuICBvbk9wZW5Eb3NzaWVyLFxuICBzeXN0ZW1JbnRlZ3JpdHlQZXJjZW50LFxufSkgPT4ge1xuICBjb25zdCBbZmlsdGVyTW9kZSwgc2V0RmlsdGVyTW9kZV0gPSB1c2VTdGF0ZTwnQUxMJyB8ICdBQ1RJVkUnIHwgJ0NSSVRJQ0FMJyB8ICdQVVJHRUQnPignQUxMJyk7XG4gIGNvbnN0IFtzZWFyY2hUZXJtLCBzZXRTZWFyY2hUZXJtXSA9IHVzZVN0YXRlKCcnKTtcblxuICBjb25zdCBhY3RpdmVDb3VudCA9IHVzZU1lbW8oKCkgPT4gZ25pZGFzLmZpbHRlcihnID0+IGcuc3RhdGUgIT09ICdaTklTWkNaT05BJykubGVuZ3RoLCBbZ25pZGFzXSk7XG4gIGNvbnN0IHB1cmdlZENvdW50ID0gdXNlTWVtbygoKSA9PiBnbmlkYXMuZmlsdGVyKGcgPT4gZy5zdGF0ZSA9PT0gJ1pOSVNaQ1pPTkEnKS5sZW5ndGgsIFtnbmlkYXNdKTtcbiAgY29uc3QgY3JpdGljYWxDb3VudCA9IHVzZU1lbW8oKCkgPT4gZ25pZGFzLmZpbHRlcihnID0+IGdldEduaWRhVGhyZWF0U2NvcmUoZykgPj0gODApLmxlbmd0aCwgW2duaWRhc10pO1xuXG4gIGNvbnN0IGZpbHRlcmVkR25pZGFzID0gdXNlTWVtbygoKSA9PiB7XG4gICAgbGV0IGxpc3QgPSBnbmlkYXM7XG4gICAgaWYgKGZpbHRlck1vZGUgPT09ICdBQ1RJVkUnKSB7XG4gICAgICBsaXN0ID0gbGlzdC5maWx0ZXIoZyA9PiBnLnN0YXRlICE9PSAnWk5JU1pDWk9OQScpO1xuICAgIH0gZWxzZSBpZiAoZmlsdGVyTW9kZSA9PT0gJ0NSSVRJQ0FMJykge1xuICAgICAgbGlzdCA9IGxpc3QuZmlsdGVyKGcgPT4gZ2V0R25pZGFUaHJlYXRTY29yZShnKSA+PSA4MCk7XG4gICAgfSBlbHNlIGlmIChmaWx0ZXJNb2RlID09PSAnUFVSR0VEJykge1xuICAgICAgbGlzdCA9IGxpc3QuZmlsdGVyKGcgPT4gZy5zdGF0ZSA9PT0gJ1pOSVNaQ1pPTkEnKTtcbiAgICB9XG5cbiAgICBpZiAoc2VhcmNoVGVybS50cmltKCkpIHtcbiAgICAgIGNvbnN0IHEgPSBzZWFyY2hUZXJtLnRvTG93ZXJDYXNlKCk7XG4gICAgICBsaXN0ID0gbGlzdC5maWx0ZXIoZyA9PlxuICAgICAgICBnLm5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxKSB8fFxuICAgICAgICBnLmFjdGl2ZVByb2Nlc3NOYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocSkgfHxcbiAgICAgICAgZy50eXBlTGFiZWwudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxKSB8fFxuICAgICAgICBnLmFzc29jaWF0ZWRJT05vZGVJZC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHEpXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBsaXN0O1xuICB9LCBbZ25pZGFzLCBmaWx0ZXJNb2RlLCBzZWFyY2hUZXJtXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLTJ4bCBiZy1zbGF0ZS05MDAvOTUgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTgwMC83MCBzaGFkb3ctMnhsIHNwYWNlLXktMy41IHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlbiBiYWNrZHJvcC1ibHVyLW1kXCI+XG4gICAgICB7LyogQ1NTLUFuaW1hdGVkIExhc2VyIFNjYW5saW5lIHJ1bm5pbmcgYWNyb3NzIHRoZSByYWRhciBjb25zb2xlICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyYWRhci1zY2FubGluZS1lZmZlY3RcIiAvPlxuXG4gICAgICB7LyogSGVhZGVyIEJhciAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBpdGVtcy1zdGFydCBzbTppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0yIHBiLTMgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMC84MFwiPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInAtMS41IHJvdW5kZWQtbGcgYmctZW1lcmFsZC01MDAvMjAgdGV4dC1lbWVyYWxkLTMwMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNTAwLzUwIHNoYWRvdy1zbVwiPlxuICAgICAgICAgICAgICA8QWN0aXZpdHkgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWVtZXJhbGQtNDAwIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtYmxhY2sgdGV4dC13aGl0ZSBmb250LW1vbm8gdHJhY2tpbmctd2lkZVwiPlxuICAgICAgICAgICAgICAgICAgQUtUWVdOWSBSQURBUjogV1lLUllURSBQUk9DRVNZIChHTklEWSlcbiAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTEuNSBweS0wLjIgcm91bmRlZCB0ZXh0LVs5cHhdIGZvbnQtbW9ubyBmb250LWJvbGQgYmctZW1lcmFsZC05NTAgdGV4dC1lbWVyYWxkLTMwMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNjAwIGFuaW1hdGUtcHVsc2VcIj5cbiAgICAgICAgICAgICAgICAgIFgtQkFORCA5LjQgR0h6XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC1lbWVyYWxkLTQwMC85MCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTEuNSBoLTEuNSByb3VuZGVkLWZ1bGwgYmctZW1lcmFsZC00MDAgYW5pbWF0ZS1waW5nXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5LxIV0IHdpxIV6a2k6IHtNYXRoLnJvdW5kKHN3ZWVwQW5nbGUpfcKwIHwgRWNoYSB3IGxvY2llOiB7YWN0aXZlQ291bnR9IHwge3N3ZWVwU3BlZWRScG19IFJQTTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIEFjdGlvbiBDb250cm9scyAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IGZsZXgtd3JhcFwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e29uVHJpZ2dlck9tbmlTY2FufVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2lzRm9yY2VSZWZyZXNoaW5nfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMi41IHB5LTEgcm91bmRlZC1sZyBiZy1zbGF0ZS05NTAgaG92ZXI6Ymctc2xhdGUtODAwIHRleHQtZW1lcmFsZC0zMDAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTcwMC82MCB0ZXh0LXhzIGZvbnQtbW9ubyBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgc2hhZG93LXNtIGhvdmVyOmJvcmRlci1lbWVyYWxkLTQwMCBhY3RpdmU6c2NhbGUtOTVcIlxuICAgICAgICAgICAgdGl0bGU9XCJXeW11xZsgcGXFgm55IHNrYW4gZG9va8OzbG55IDM2MMKwIGkgb2TFm3dpZcW8ZW5pZSBlY2hhIHByb2Nlc8Ozd1wiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPFJlZnJlc2hDdyBjbGFzc05hbWU9e2B3LTMgaC0zICR7aXNGb3JjZVJlZnJlc2hpbmcgPyAnYW5pbWF0ZS1zcGluIHRleHQtZW1lcmFsZC00MDAnIDogJyd9YH0gLz5cbiAgICAgICAgICAgIDxzcGFuPntpc0ZvcmNlUmVmcmVzaGluZyA/ICdPZMWbd2llxbxhbmllLi4uJyA6ICdPZMWbd2llxbwgU2thbid9PC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17b25TcGF3bkduaWRhfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMi41IHB5LTEgcm91bmRlZC1sZyBiZy1wdXJwbGUtOTUwLzgwIGhvdmVyOmJnLXB1cnBsZS05MDAgdGV4dC1wdXJwbGUtMzAwIGJvcmRlciBib3JkZXItcHVycGxlLTcwMC82MCB0ZXh0LXhzIGZvbnQtbW9ubyBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgc2hhZG93LXNtIGFjdGl2ZTpzY2FsZS05NVwiXG4gICAgICAgICAgICB0aXRsZT1cIld5cHXFm8SHIG5vd8SFIHdyb2fEhSBnbmlkxJkgbmEgZWtyYW4gcmFkYXJ1XCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8U2t1bGwgY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LXB1cnBsZS00MDBcIiAvPlxuICAgICAgICAgICAgPHNwYW4+KyBXeXB1xZvEhyBHbmlkxJk8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBTZWFyY2ggJiBGaWx0ZXIgVG9vbGJhciAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cbiAgICAgICAgICA8U2VhcmNoIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtc2xhdGUtNTAwIGFic29sdXRlIGxlZnQtMi41IHRvcC0xLzIgLXRyYW5zbGF0ZS15LTEvMlwiIC8+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICB2YWx1ZT17c2VhcmNoVGVybX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHNldFNlYXJjaFRlcm0oZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTenVrYWogcHJvY2VzdSAobnAuIGZsdXR0ZXIsIGhvb2ssIHdpcGVyLCBQSUQpLi4uXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBwbC04IHByLTcgcHktMS41IHJvdW5kZWQteGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHRleHQteHMgZm9udC1tb25vIHRleHQtc2xhdGUtMjAwIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItZW1lcmFsZC01MDAgcGxhY2Vob2xkZXI6dGV4dC1zbGF0ZS02MDBcIlxuICAgICAgICAgIC8+XG4gICAgICAgICAge3NlYXJjaFRlcm0gJiYgKFxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTZWFyY2hUZXJtKCcnKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgcmlnaHQtMi41IHRvcC0xLzIgLXRyYW5zbGF0ZS15LTEvMiB0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXdoaXRlIHRleHQteHMgZm9udC1tb25vXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAg4pyVXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogRmlsdGVyIFBpbGxzICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgb3ZlcmZsb3cteC1hdXRvIHBiLTAuNSB0ZXh0LVsxMXB4XSBmb250LW1vbm9cIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRGaWx0ZXJNb2RlKCdBTEwnKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTIgcHktMC41IHJvdW5kZWQtbGcgYm9yZGVyIHRyYW5zaXRpb24tY29sb3JzIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgIGZpbHRlck1vZGUgPT09ICdBTEwnXG4gICAgICAgICAgICAgICAgPyAnYmctZW1lcmFsZC05NTAgdGV4dC1lbWVyYWxkLTMwMCBib3JkZXItZW1lcmFsZC01MDAgZm9udC1ib2xkJ1xuICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTk1MCB0ZXh0LXNsYXRlLTQwMCBib3JkZXItc2xhdGUtODAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICBXc3p5c3RraWUgKHtnbmlkYXMubGVuZ3RofSlcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRGaWx0ZXJNb2RlKCdBQ1RJVkUnKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTIgcHktMC41IHJvdW5kZWQtbGcgYm9yZGVyIHRyYW5zaXRpb24tY29sb3JzIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgIGZpbHRlck1vZGUgPT09ICdBQ1RJVkUnXG4gICAgICAgICAgICAgICAgPyAnYmctcmVkLTk1MCB0ZXh0LXJlZC0zMDAgYm9yZGVyLXJlZC01MDAgZm9udC1ib2xkJ1xuICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTk1MCB0ZXh0LXNsYXRlLTQwMCBib3JkZXItc2xhdGUtODAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICBBa3R5d25lICh7YWN0aXZlQ291bnR9KVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEZpbHRlck1vZGUoJ0NSSVRJQ0FMJyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BweC0yIHB5LTAuNSByb3VuZGVkLWxnIGJvcmRlciB0cmFuc2l0aW9uLWNvbG9ycyBjdXJzb3ItcG9pbnRlciAke1xuICAgICAgICAgICAgICBmaWx0ZXJNb2RlID09PSAnQ1JJVElDQUwnXG4gICAgICAgICAgICAgICAgPyAnYmctcm9zZS05NTAgdGV4dC1yb3NlLTMwMCBib3JkZXItcm9zZS01MDAgZm9udC1ib2xkJ1xuICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTk1MCB0ZXh0LXNsYXRlLTQwMCBib3JkZXItc2xhdGUtODAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICBLcnl0eWN6bmUgKHtjcml0aWNhbENvdW50fSlcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRGaWx0ZXJNb2RlKCdQVVJHRUQnKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTIgcHktMC41IHJvdW5kZWQtbGcgYm9yZGVyIHRyYW5zaXRpb24tY29sb3JzIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgIGZpbHRlck1vZGUgPT09ICdQVVJHRUQnXG4gICAgICAgICAgICAgICAgPyAnYmctcHVycGxlLTk1MCB0ZXh0LXB1cnBsZS0zMDAgYm9yZGVyLXB1cnBsZS01MDAgZm9udC1ib2xkJ1xuICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTk1MCB0ZXh0LXNsYXRlLTQwMCBib3JkZXItc2xhdGUtODAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICBVYml0ZSAoe3B1cmdlZENvdW50fSlcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIER5bmFtaWMgUHJvY2VzcyBMaXN0IHdpdGggTGl2ZSBDU1MgQW5pbWF0aW9ucyAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yIG1heC1oLVszODBweF0gb3ZlcmZsb3cteS1hdXRvIHByLTFcIj5cbiAgICAgICAge2ZpbHRlcmVkR25pZGFzLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNiB0ZXh0LWNlbnRlciB0ZXh0LXNsYXRlLTUwMCB0ZXh0LXhzIGZvbnQtbW9ubyBiZy1zbGF0ZS05NTAvNjAgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgQnJhayBwcm9jZXPDs3cgc3BlxYJuaWFqxIVjeWNoIGtyeXRlcmlhIGZpbHRydS5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICBmaWx0ZXJlZEduaWRhcy5tYXAoZ25pZGEgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2NvcmUgPSBnZXRHbmlkYVRocmVhdFNjb3JlKGduaWRhKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbG9yQ2ZnID0gZ2V0VGhyZWF0Q29sb3Ioc2NvcmUpO1xuICAgICAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IGduaWRhLmlkID09PSBzZWxlY3RlZFRhcmdldElkO1xuICAgICAgICAgICAgY29uc3QgaXNEZXN0cm95ZWQgPSBnbmlkYS5zdGF0ZSA9PT0gJ1pOSVNaQ1pPTkEnO1xuICAgICAgICAgICAgY29uc3QgbGFzdElsbHVtaW5hdGVkID0gaWxsdW1pbmF0ZWRHbmlkYUlkc1tnbmlkYS5pZF0gfHwgMDtcbiAgICAgICAgICAgIGNvbnN0IGlzSWxsdW1pbmF0ZWQgPSBCb29sZWFuKERhdGUubm93KCkgLSBsYXN0SWxsdW1pbmF0ZWQgPCAxNDAwKSB8fCBpc0ZvcmNlUmVmcmVzaGluZztcblxuICAgICAgICAgICAgLy8gR2VuZXJhdGUgZGV0ZXJtaW5pc3RpYyBzaW11bGF0ZWQgUElEXG4gICAgICAgICAgICBjb25zdCBwcm9jZXNzUGlkID0gMzAwMCArIE1hdGguYWJzKGduaWRhLmlkLnNwbGl0KCcnKS5yZWR1Y2UoKGFjYywgYykgPT4gYWNjICsgYy5jaGFyQ29kZUF0KDApLCAwKSAlIDYwMDApO1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAga2V5PXtnbmlkYS5pZH1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblNlbGVjdFRhcmdldChnbmlkYS5pZCl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC0zIHJvdW5kZWQteGwgYm9yZGVyIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlbiB0ZXh0LXhzIGZvbnQtbW9ubyAke1xuICAgICAgICAgICAgICAgICAgaXNJbGx1bWluYXRlZCA/ICdyYWRhci1oaXQtYWN0aXZlJyA6ICcnXG4gICAgICAgICAgICAgICAgfSAke1xuICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZFxuICAgICAgICAgICAgICAgICAgICA/ICdiZy1zbGF0ZS05NTAgYm9yZGVyLWVtZXJhbGQtNDAwIHNoYWRvdy1bMF8wXzE1cHhfcmdiYSgxNiwxODUsMTI5LDAuMyldIHJpbmctMSByaW5nLWVtZXJhbGQtNTAwLzUwJ1xuICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05NTAvODAgaG92ZXI6Ymctc2xhdGUtOTAwIGJvcmRlci1zbGF0ZS04MDAgaG92ZXI6Ym9yZGVyLXNsYXRlLTcwMCdcbiAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHsvKiBIZWFkZXIgcm93OiBQcm9jZXNzIG5hbWUsIFBJRCwgdGhyZWF0IGJhZGdlICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIG1pbi13LTBcIj5cbiAgICAgICAgICAgICAgICAgICAgey8qIFB1bHNpbmcgcmFkYXIgYmxpcCBpbmRpY2F0b3Igd2l0aCBDU1MgYW5pbWF0aW9uICovfVxuICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctMi41IGgtMi41IHJvdW5kZWQtZnVsbCBmbGV4LXNocmluay0wICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAhaXNEZXN0cm95ZWQgPyAncmFkYXItcGluZy1kb3QnIDogJydcbiAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBpc0Rlc3Ryb3llZCA/ICcjNjQ3NDhiJyA6IGNvbG9yQ2ZnLmhleCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJveFNoYWRvdzogaXNEZXN0cm95ZWQgPyAnbm9uZScgOiBgMCAwIDhweCAke2NvbG9yQ2ZnLmdsb3dIZXh9YFxuICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LXdoaXRlIHRydW5jYXRlIHRleHQtWzEzcHhdXCI+XG4gICAgICAgICAgICAgICAgICAgICAge2duaWRhLmFjdGl2ZVByb2Nlc3NOYW1lfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTEuNSBweS0wLjIgcm91bmRlZCBiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICBQSUQ6IHtwcm9jZXNzUGlkfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IGZsZXgtc2hyaW5rLTBcIj5cbiAgICAgICAgICAgICAgICAgICAgey8qIEFuaW1hdGVkIENTUyBzaWduYWwgcmVjZXB0aW9uIGJhcnMgKi99XG4gICAgICAgICAgICAgICAgICAgIHshaXNEZXN0cm95ZWQgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1lbmQgZ2FwLTAuNSBoLTNcIiB0aXRsZT1cIlBvemlvbSBzeWduYcWCdSBlY2hhIHJhZGFyb3dlZ28gOS40IEdIelwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0xIGgtMS41IGJnLWVtZXJhbGQtNDAwIHJvdW5kZWQteHNcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0xIGgtMi41IGJnLWVtZXJhbGQtNDAwIHJvdW5kZWQteHNcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0xIGgtMyBiZy1lbWVyYWxkLTQwMCByb3VuZGVkLXhzXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctMSBoLTMuNSBiZy1lbWVyYWxkLTQwMC82MCByb3VuZGVkLXhzXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTIgcHktMC41IHJvdW5kZWQgdGV4dC1bMTBweF0gZm9udC1ibGFjayAke1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNEZXN0cm95ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctc2xhdGUtOTAwIHRleHQtc2xhdGUtNDAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICA6ICd0ZXh0LXdoaXRlJ1xuICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGlzRGVzdHJveWVkID8gdW5kZWZpbmVkIDogY29sb3JDZmcuaGV4XG4gICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIHtpc0Rlc3Ryb3llZCA/ICcxMDAlIFBVUkdFRCcgOiBgJHtzY29yZX0lIFRIUkVBVGB9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIFJhZGFyIENvb3JkaW5hdGVzICYgTm9kZSBWZWN0b3IgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0yIGdyaWQgZ3JpZC1jb2xzLTMgZ2FwLTIgdGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDAgcHQtMS41IGJvcmRlci10IGJvcmRlci1zbGF0ZS05MDBcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwIGJsb2NrXCI+QVpZTVVUIC8gS8SEVDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1lbWVyYWxkLTMwMCBmb250LWJvbGRcIj57Z25pZGEuYmVhcmluZ0RlZ33CsDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDAgYmxvY2tcIj5EWVNUQU5TIChLTSk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtY3lhbi0zMDAgZm9udC1ib2xkXCI+e01hdGgucm91bmQoZ25pZGEuZGlzdGFuY2VSYXRpbyAqIDEwMCl9IEtNPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMCBibG9ja1wiPlpBSU5GRUtPV0FOWSBXxJhaRcWBPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWFtYmVyLTMwMCBmb250LWJvbGQgdHJ1bmNhdGUgYmxvY2tcIj57Z25pZGEuYXNzb2NpYXRlZElPTm9kZUlkfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIEJvdHRvbSBSb3cgQWN0aW9ucyAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTIuNSBwdC0yIGJvcmRlci10IGJvcmRlci1zbGF0ZS05MDAvOTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTUwMCB0cnVuY2F0ZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICAgICAgICB7aXNJbGx1bWluYXRlZCA/IChcbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFphcCBjbGFzc05hbWU9XCJ3LTMgaC0zIHRleHQtZW1lcmFsZC00MDAgYW5pbWF0ZS1wdWxzZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5FQ0hPIFdJxIRaS0kgUkFEQVJVOiBXWUtSWVRZPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICBnbmlkYS50eXBlTGFiZWxcbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cblxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0VGFyZ2V0KGduaWRhLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uT3BlbkRvc3NpZXIoZ25pZGEuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMiBweS0wLjUgcm91bmRlZCBiZy1zbGF0ZS05MDAgaG92ZXI6Ymctc2xhdGUtODAwIHRleHQtc2xhdGUtMzAwIGhvdmVyOnRleHQtd2hpdGUgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1bMTBweF0gdHJhbnNpdGlvbi1jb2xvcnMgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiT3R3w7NyeiBwZcWCbmUgZG9zc2llciBrcnltaW5hbGlzdHljem5lIHByb2Nlc3VcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgRG9zc2llclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgICB7IWlzRGVzdHJveWVkICYmIChcbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBvblRyaWdnZXJDYXNjYWRlKGduaWRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yIHB5LTAuNSByb3VuZGVkIGJnLXJlZC03MDAgaG92ZXI6YmctcmVkLTYwMCB0ZXh0LXdoaXRlIGZvbnQtYm9sZCB0ZXh0LVsxMHB4XSB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBzaGFkb3ctc20gaG92ZXI6c2NhbGUtMTA1IGFjdGl2ZTpzY2FsZS05NVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIk5hdHljaG1pYXN0b3d5IHViw7NqIGkga29yZG9uIHNhbml0YXJueSAwIG1zXCJcbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBVYsOzaiAoMCBtcylcbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSlcbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogVGVsZW1ldHJ5IEZvb3RlciAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtMiBib3JkZXItdCBib3JkZXItc2xhdGUtODAwLzgwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LVsxMXB4XSBmb250LW1vbm8gdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgPHNwYW4+U2thbmVyIFgtQmFuZCDigKIgT2TFm3dpZcW8YW5pZTogQ2nEhWfFgmUgKHtzd2VlcFNwZWVkUnBtfSBSUE0pPC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtYm9sZFwiPk1vbm9saXQ6IHtzeXN0ZW1JbnRlZ3JpdHlQZXJjZW50fSU8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwibWFwcGluZ3MiOiJBQXVFTTtBQXZFTixTQUFnQixVQUFVLGVBQWU7QUFDekM7QUFBQSxFQUNTO0FBQUEsRUFBVTtBQUFBLEVBQVc7QUFBQSxFQUFPO0FBQUEsRUFDRDtBQUFBLE9BRTdCO0FBRVAsU0FBUyxxQkFBcUIsc0JBQXNCO0FBaUI3QyxhQUFNLDJCQUE0QyxDQUFDO0FBQUEsRUFDeEQ7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLE1BQU07QUFDSixRQUFNLENBQUMsWUFBWSxh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