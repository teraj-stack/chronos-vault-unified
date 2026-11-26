import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-toolkit/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=019a4779"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-toolkit/node_modules/.vite/deps/react.js?v=019a4779"; const useState = __vite__cjsImport1_react["useState"];
import {
  GitFork,
  FolderTree,
  ShieldAlert,
  Skull,
  ChevronRight,
  ChevronDown,
  AlertTriangle,
  CornerDownRight,
  Lock,
  Ban,
  Activity,
  Compass,
  Flame,
  ShieldCheck
} from "/sentinel-toolkit/node_modules/.vite/deps/lucide-react.js?v=6cbc5a0a";
export const ProcessTreeView = ({
  processes,
  onKillProcess,
  onKillProcessTree,
  onSuspendTree,
  onSabotageTree
}) => {
  const [selectedPid, setSelectedPid] = useState(8932);
  const [expandedPids, setExpandedPids] = useState({
    1044: true,
    3840: true,
    4820: true,
    8932: true
  });
  const toggleExpand = (pid) => {
    setExpandedPids((prev) => ({
      ...prev,
      [pid]: !prev[pid]
    }));
  };
  const processMap = /* @__PURE__ */ new Map();
  processes.forEach((p) => processMap.set(p.pid, p));
  const childrenMap = /* @__PURE__ */ new Map();
  const rootProcesses = [];
  processes.forEach((p) => {
    if (p.ppid && processMap.has(p.ppid) && p.ppid !== p.pid) {
      const list = childrenMap.get(p.ppid) || [];
      list.push(p);
      childrenMap.set(p.ppid, list);
    } else {
      rootProcesses.push(p);
    }
  });
  const getLineageChain = (pid) => {
    if (!pid) return [];
    const chain = [];
    let current = processMap.get(pid);
    while (current) {
      chain.unshift(current);
      if (current.ppid && current.ppid !== current.pid && processMap.has(current.ppid)) {
        current = processMap.get(current.ppid);
      } else {
        break;
      }
    }
    return chain;
  };
  const selectedProcess = selectedPid ? processMap.get(selectedPid) : null;
  const lineageChain = getLineageChain(selectedPid);
  const isSelectedRogue = selectedProcess?.isRogue || selectedProcess?.isTopMost || selectedProcess?.hasFlutterDll;
  const parentOfSelected = selectedProcess?.ppid ? processMap.get(selectedProcess.ppid) : null;
  const renderTreeNode = (proc, depth = 0) => {
    const children = childrenMap.get(proc.pid) || [];
    const hasChildren = children.length > 0;
    const isExpanded = expandedPids[proc.pid] ?? true;
    const isSelected = selectedPid === proc.pid;
    const windows = proc.windows || [];
    const isRunning = proc.status === "running";
    const isTerminated = proc.status === "terminated";
    const isQuarantined = proc.status === "quarantined";
    const isPeCorrupted = proc.status === "pe_corrupted";
    const isSuspended = proc.status === "suspended";
    return /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxDEV(
        "div",
        {
          onClick: () => setSelectedPid(proc.pid),
          className: `group flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer select-none ${isSelected ? "bg-purple-950/60 border-purple-500 shadow-md shadow-purple-950/50 ring-1 ring-purple-500/50" : proc.isRogue || proc.isTopMost ? "bg-red-950/30 border-red-800/80 hover:border-red-600" : proc.isParentDropper ? "bg-amber-950/30 border-amber-800/80 hover:border-amber-600" : "bg-slate-900/80 border-slate-800 hover:border-slate-700"}`,
          style: { marginLeft: `${Math.min(depth * 20, 100)}px` },
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 min-w-0", children: [
              hasChildren || windows.length > 0 ? /* @__PURE__ */ jsxDEV(
                "button",
                {
                  type: "button",
                  onClick: (e) => {
                    e.stopPropagation();
                    toggleExpand(proc.pid);
                  },
                  className: "w-5 h-5 flex items-center justify-center rounded bg-slate-800 text-slate-400 hover:text-white",
                  children: isExpanded ? /* @__PURE__ */ jsxDEV(ChevronDown, { className: "w-3.5 h-3.5" }, void 0, false, {
                    fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                    lineNumber: 118,
                    columnNumber: 31
                  }, this) : /* @__PURE__ */ jsxDEV(ChevronRight, { className: "w-3.5 h-3.5" }, void 0, false, {
                    fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                    lineNumber: 118,
                    columnNumber: 73
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                  lineNumber: 110,
                  columnNumber: 15
                },
                this
              ) : /* @__PURE__ */ jsxDEV("div", { className: "w-5 h-5 flex items-center justify-center text-slate-600", children: /* @__PURE__ */ jsxDEV(CornerDownRight, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                lineNumber: 122,
                columnNumber: 17
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                lineNumber: 121,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { children: isPeCorrupted ? /* @__PURE__ */ jsxDEV("div", { className: "w-6 h-6 rounded-lg bg-rose-950 border border-rose-600 flex items-center justify-center text-rose-400", children: /* @__PURE__ */ jsxDEV(Skull, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                lineNumber: 130,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                lineNumber: 129,
                columnNumber: 17
              }, this) : isQuarantined ? /* @__PURE__ */ jsxDEV("div", { className: "w-6 h-6 rounded-lg bg-purple-950 border border-purple-600 flex items-center justify-center text-purple-400", children: /* @__PURE__ */ jsxDEV(Lock, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                lineNumber: 134,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                lineNumber: 133,
                columnNumber: 17
              }, this) : isTerminated ? /* @__PURE__ */ jsxDEV("div", { className: "w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-500", children: /* @__PURE__ */ jsxDEV(Ban, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                lineNumber: 138,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                lineNumber: 137,
                columnNumber: 17
              }, this) : proc.isRogue || proc.isTopMost ? /* @__PURE__ */ jsxDEV("div", { className: "w-6 h-6 rounded-lg bg-red-600/30 border border-red-500 flex items-center justify-center text-red-400 animate-pulse", children: /* @__PURE__ */ jsxDEV(ShieldAlert, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                lineNumber: 142,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                lineNumber: 141,
                columnNumber: 17
              }, this) : proc.isParentDropper ? /* @__PURE__ */ jsxDEV("div", { className: "w-6 h-6 rounded-lg bg-amber-600/30 border border-amber-500 flex items-center justify-center text-amber-400", children: /* @__PURE__ */ jsxDEV(AlertTriangle, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                lineNumber: 146,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                lineNumber: 145,
                columnNumber: 17
              }, this) : /* @__PURE__ */ jsxDEV("div", { className: "w-6 h-6 rounded-lg bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400", children: /* @__PURE__ */ jsxDEV(Activity, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                lineNumber: 150,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                lineNumber: 149,
                columnNumber: 17
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                lineNumber: 127,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "truncate", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: `text-xs font-mono font-bold ${isTerminated ? "line-through text-slate-500" : "text-white"}`, children: proc.name }, void 0, false, {
                    fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                    lineNumber: 158,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400 font-mono bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800", children: [
                    "PID: ",
                    /* @__PURE__ */ jsxDEV("strong", { className: "text-slate-200", children: proc.pid }, void 0, false, {
                      fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                      lineNumber: 162,
                      columnNumber: 24
                    }, this),
                    " ",
                    proc.ppid ? `(PPID: ${proc.ppid})` : ""
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                    lineNumber: 161,
                    columnNumber: 17
                  }, this),
                  proc.isParentDropper && /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-bold font-mono", children: "⚠️ PARENT DROPPER" }, void 0, false, {
                    fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                    lineNumber: 167,
                    columnNumber: 19
                  }, this),
                  proc.isRogue && /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] px-1.5 py-0.5 rounded bg-red-950 text-red-300 border border-red-800 font-bold font-mono", children: "⚡ ROGUE FLUTTER" }, void 0, false, {
                    fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                    lineNumber: 172,
                    columnNumber: 19
                  }, this),
                  proc.isTopMost && /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-mono", children: "WS_EX_TOPMOST" }, void 0, false, {
                    fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                    lineNumber: 177,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                  lineNumber: 157,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400 truncate mt-0.5", children: proc.windowTitle || proc.filePath }, void 0, false, {
                  fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                  lineNumber: 182,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                lineNumber: 156,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProcessTreeView.tsx",
              lineNumber: 107,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 mt-2 sm:mt-0 pl-7 sm:pl-0", children: [
              /* @__PURE__ */ jsxDEV(
                "span",
                {
                  className: `text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${isPeCorrupted ? "bg-rose-950 text-rose-300 border border-rose-700" : isQuarantined ? "bg-purple-950 text-purple-300 border border-purple-700" : isTerminated ? "bg-slate-800 text-slate-500" : isSuspended ? "bg-cyan-950 text-cyan-300 border border-cyan-800" : proc.isTopMost ? "bg-red-950 text-red-300 border border-red-800" : "bg-emerald-950 text-emerald-400 border border-emerald-800"}`,
                  children: isPeCorrupted ? "PE 0xC000007B" : isQuarantined ? "KWARANTANNA" : isTerminated ? "ZABITY" : isSuspended ? "ZAMROŻONY" : proc.isTopMost ? "AKTYWNY OVERLAY" : "NORMALNY"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                  lineNumber: 190,
                  columnNumber: 13
                },
                this
              ),
              isRunning && /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-1", children: [
                (hasChildren || proc.isParentDropper) && /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    type: "button",
                    onClick: (e) => {
                      e.stopPropagation();
                      onKillProcessTree(proc.pid);
                    },
                    title: "Ubij ten proces wraz ze wszystkimi procesami i oknami potomnymi (/T)",
                    className: "px-2 py-1 bg-red-950 hover:bg-red-800 text-red-200 rounded text-[10px] font-mono border border-red-700 flex items-center gap-1 transition-all",
                    children: [
                      /* @__PURE__ */ jsxDEV(GitFork, { className: "w-3 h-3 text-red-400" }, void 0, false, {
                        fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                        lineNumber: 230,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { children: "Tree-Kill /T" }, void 0, false, {
                        fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                        lineNumber: 231,
                        columnNumber: 21
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                    lineNumber: 221,
                    columnNumber: 19
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    type: "button",
                    onClick: (e) => {
                      e.stopPropagation();
                      onKillProcess(proc.pid);
                    },
                    title: "Zabij tylko ten konkretny proces",
                    className: "px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[10px] font-mono border border-slate-700 transition-all",
                    children: "Kill"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                    lineNumber: 235,
                    columnNumber: 17
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                lineNumber: 219,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProcessTreeView.tsx",
              lineNumber: 189,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/ProcessTreeView.tsx",
          lineNumber: 94,
          columnNumber: 9
        },
        this
      ),
      isExpanded && windows.length > 0 && /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", style: { marginLeft: `${Math.min((depth + 1) * 20, 120)}px` }, children: windows.map((win) => /* @__PURE__ */ jsxDEV(
        "div",
        {
          className: `p-2 rounded-lg border text-[11px] font-mono flex items-center justify-between ${win.isTopMost ? "bg-red-950/40 border-red-800/70 text-red-200" : "bg-slate-950 border-slate-800/80 text-slate-400"}`,
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 truncate", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "w-4 h-4 rounded bg-slate-800 flex items-center justify-center text-[9px] text-slate-400 font-mono", children: "🪟" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                lineNumber: 264,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-300 font-bold truncate", children: [
                "HWND: ",
                /* @__PURE__ */ jsxDEV("strong", { className: "text-purple-300", children: win.hwnd }, void 0, false, {
                  fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                  lineNumber: 268,
                  columnNumber: 27
                }, this),
                ' - "',
                win.title,
                '"'
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                lineNumber: 267,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProcessTreeView.tsx",
              lineNumber: 263,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-1.5 flex-shrink-0", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] bg-slate-900 px-1.5 py-0.5 rounded text-slate-400 border border-slate-800", children: [
                "Klasa: ",
                win.className
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                lineNumber: 273,
                columnNumber: 19
              }, this),
              win.isTopMost && /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] bg-rose-950 text-rose-300 px-1.5 py-0.5 rounded border border-rose-800 font-bold", children: "WS_EX_TOPMOST" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                lineNumber: 277,
                columnNumber: 21
              }, this),
              win.isFullscreen && /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] bg-amber-950 text-amber-300 px-1.5 py-0.5 rounded border border-amber-800", children: [
                "Fullscreen (",
                win.bounds.width,
                "x",
                win.bounds.height,
                ")"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                lineNumber: 282,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProcessTreeView.tsx",
              lineNumber: 272,
              columnNumber: 17
            }, this)
          ]
        },
        win.hwnd,
        true,
        {
          fileName: "/app/applet/src/components/ProcessTreeView.tsx",
          lineNumber: 255,
          columnNumber: 15
        },
        this
      )) }, void 0, false, {
        fileName: "/app/applet/src/components/ProcessTreeView.tsx",
        lineNumber: 253,
        columnNumber: 11
      }, this),
      isExpanded && hasChildren && /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: children.map((child) => renderTreeNode(child, depth + 1)) }, void 0, false, {
        fileName: "/app/applet/src/components/ProcessTreeView.tsx",
        lineNumber: 294,
        columnNumber: 11
      }, this)
    ] }, proc.pid, true, {
      fileName: "/app/applet/src/components/ProcessTreeView.tsx",
      lineNumber: 92,
      columnNumber: 7
    }, this);
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-purple-950/70 via-slate-900 to-indigo-950/70 border border-purple-900/50 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-lg", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-start space-x-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-300", children: /* @__PURE__ */ jsxDEV(GitFork, { className: "w-5 h-5" }, void 0, false, {
          fileName: "/app/applet/src/components/ProcessTreeView.tsx",
          lineNumber: 308,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/ProcessTreeView.tsx",
          lineNumber: 307,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-bold text-white flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV("span", { children: "Drzewo Relacji Procesów & Detektor Pochodzenia Okna (PPID Lineage Tracker)" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessTreeView.tsx",
              lineNumber: 312,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] px-2 py-0.5 rounded bg-purple-900 text-purple-200 border border-purple-600 font-mono", children: "ORIGIN FORENSICS" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessTreeView.tsx",
              lineNumber: 313,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessTreeView.tsx",
            lineNumber: 311,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-300 mt-0.5 max-w-3xl", children: [
            "Złośliwe okna Fluttera są często generowane przez ukryte procesy-matki (tzw. ",
            /* @__PURE__ */ jsxDEV("em", { children: "Watchdog / Dropper" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessTreeView.tsx",
              lineNumber: 318,
              columnNumber: 92
            }, this),
            "). Zidentyfikuj prawdziwe źródło pochodzenia (Parent PID), aby zlikwidować cały łańcuch odradzania się blokady."
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessTreeView.tsx",
            lineNumber: 317,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessTreeView.tsx",
          lineNumber: 310,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ProcessTreeView.tsx",
        lineNumber: 306,
        columnNumber: 9
      }, this),
      selectedProcess && /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => onKillProcessTree(selectedProcess.ppid || selectedProcess.pid),
            className: "flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-red-700 to-pink-700 hover:from-red-600 hover:to-pink-600 text-white rounded-lg text-xs font-bold font-mono shadow transition-all border border-red-500/30",
            title: "Zlikwiduj proces nadrzędny i wszystkie jego dzieci",
            children: [
              /* @__PURE__ */ jsxDEV(Skull, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                lineNumber: 330,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Zlikwiduj Drzewo (/T)" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                lineNumber: 331,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/ProcessTreeView.tsx",
            lineNumber: 325,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => onSabotageTree(selectedProcess.ppid || selectedProcess.pid),
            className: "flex items-center gap-1.5 px-3 py-2 bg-purple-800 hover:bg-purple-700 text-white rounded-lg text-xs font-bold font-mono shadow transition-all border border-purple-500/30",
            title: "Zniszcz nagłówki PE pliku rodzica i dziecka na dysku",
            children: [
              /* @__PURE__ */ jsxDEV(Flame, { className: "w-3.5 h-3.5 text-pink-300" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                lineNumber: 339,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Sabotaż PE Drzewa" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                lineNumber: 340,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/ProcessTreeView.tsx",
            lineNumber: 334,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ProcessTreeView.tsx",
        lineNumber: 324,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ProcessTreeView.tsx",
      lineNumber: 305,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-2 border-b border-slate-800 text-xs", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-slate-300 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxDEV(FolderTree, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessTreeView.tsx",
              lineNumber: 352,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Hierarchia Procesów (Process Lineage Forest)" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessTreeView.tsx",
              lineNumber: 353,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessTreeView.tsx",
            lineNumber: 351,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400 font-mono", children: [
            "Węzłów: ",
            processes.length,
            " | Wybierz węzeł, aby zbadać pochodzenie"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessTreeView.tsx",
            lineNumber: 355,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessTreeView.tsx",
          lineNumber: 350,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5 max-h-[420px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800", children: rootProcesses.map((root) => renderTreeNode(root, 0)) }, void 0, false, {
          fileName: "/app/applet/src/components/ProcessTreeView.tsx",
          lineNumber: 361,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pt-2 border-t border-slate-900 text-[11px] text-slate-400 font-mono", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-amber-400" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessTreeView.tsx",
              lineNumber: 367,
              columnNumber: 15
            }, this),
            " Rodzic (Dropper/Watchdog)"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessTreeView.tsx",
            lineNumber: 366,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-red-400" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessTreeView.tsx",
              lineNumber: 370,
              columnNumber: 15
            }, this),
            " Złośliwy Flutter Child"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessTreeView.tsx",
            lineNumber: 369,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-purple-400" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessTreeView.tsx",
              lineNumber: 373,
              columnNumber: 15
            }, this),
            " HWND Win32 Overlay"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessTreeView.tsx",
            lineNumber: 372,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessTreeView.tsx",
          lineNumber: 365,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ProcessTreeView.tsx",
        lineNumber: 349,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-4 flex flex-col justify-between", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-2 border-b border-slate-800 text-xs", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-white flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxDEV(Compass, { className: "w-4 h-4 text-pink-400" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                lineNumber: 383,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Analiza Ścieżki Pochodzenia Okna" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                lineNumber: 384,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProcessTreeView.tsx",
              lineNumber: 382,
              columnNumber: 15
            }, this),
            selectedProcess && /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800", children: [
              "PID: ",
              selectedProcess.pid
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProcessTreeView.tsx",
              lineNumber: 387,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessTreeView.tsx",
            lineNumber: 381,
            columnNumber: 13
          }, this),
          selectedProcess ? /* @__PURE__ */ jsxDEV("div", { className: "space-y-3 text-xs", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-bold uppercase text-slate-400 block tracking-wider", children: "Łańcuch Tworzenia Procesu (PPID Lineage):" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                lineNumber: 397,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5", children: lineageChain.map((p, idx) => /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 text-[11px] font-mono", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "w-4 h-4 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center text-[9px] font-bold", children: idx + 1 }, void 0, false, {
                  fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                  lineNumber: 404,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: `p-1.5 rounded flex-1 flex items-center justify-between border ${p.pid === selectedProcess.pid ? "bg-purple-950/80 border-purple-500 text-purple-200" : p.isParentDropper ? "bg-amber-950/50 border-amber-800 text-amber-200" : "bg-slate-900 border-slate-800 text-slate-300"}`, children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "font-bold truncate", children: p.name }, void 0, false, {
                    fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                    lineNumber: 414,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400 font-normal", children: [
                    "PID ",
                    p.pid
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                    lineNumber: 415,
                    columnNumber: 27
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                  lineNumber: 407,
                  columnNumber: 25
                }, this)
              ] }, p.pid, true, {
                fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                lineNumber: 403,
                columnNumber: 23
              }, this)) }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                lineNumber: 401,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProcessTreeView.tsx",
              lineNumber: 396,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: `p-3 rounded-xl border space-y-1.5 ${isSelectedRogue ? "bg-red-950/30 border-red-800/80 text-red-200" : "bg-slate-950 border-slate-800 text-slate-300"}`, children: [
              /* @__PURE__ */ jsxDEV("div", { className: "font-bold flex items-center justify-between", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1.5", children: [
                  isSelectedRogue ? /* @__PURE__ */ jsxDEV(AlertTriangle, { className: "w-4 h-4 text-red-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                    lineNumber: 430,
                    columnNumber: 42
                  }, this) : /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                    lineNumber: 430,
                    columnNumber: 95
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: isSelectedRogue ? "Wykryto Podejrzane Pochodzenie" : "Standardowy Proces Systemowy" }, void 0, false, {
                    fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                    lineNumber: 431,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                  lineNumber: 429,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono", children: selectedProcess.status.toUpperCase() }, void 0, false, {
                  fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                  lineNumber: 433,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                lineNumber: 428,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-300 leading-relaxed", children: isSelectedRogue && parentOfSelected ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
                "Proces ",
                /* @__PURE__ */ jsxDEV("strong", { className: "text-white font-mono", children: selectedProcess.name }, void 0, false, {
                  fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                  lineNumber: 439,
                  columnNumber: 32
                }, this),
                " został wywołany przez rodzica ",
                /* @__PURE__ */ jsxDEV("strong", { className: "text-amber-300 font-mono", children: parentOfSelected.name }, void 0, false, {
                  fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                  lineNumber: 439,
                  columnNumber: 135
                }, this),
                " (PID: ",
                parentOfSelected.pid,
                "). Zabicie samego okna pozwoli rodzicowi na natychmiastowy restart!"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                lineNumber: 438,
                columnNumber: 23
              }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
                "Ścieżka pliku: ",
                /* @__PURE__ */ jsxDEV("code", { className: "text-slate-200 font-mono text-[10px] break-all", children: selectedProcess.filePath }, void 0, false, {
                  fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                  lineNumber: 443,
                  columnNumber: 40
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                lineNumber: 442,
                columnNumber: 23
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                lineNumber: 436,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProcessTreeView.tsx",
              lineNumber: 423,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 text-[11px] font-mono text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between py-0.5 border-b border-slate-900", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "Tytuł Okna:" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                  lineNumber: 452,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-slate-200 font-bold truncate max-w-[200px]", children: selectedProcess.windowTitle || "Brak okna" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                  lineNumber: 453,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                lineNumber: 451,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between py-0.5 border-b border-slate-900", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "Parent PID (PPID):" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                  lineNumber: 456,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-amber-300 font-bold", children: selectedProcess.ppid || "None (System Root)" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                  lineNumber: 457,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                lineNumber: 455,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between py-0.5 border-b border-slate-900", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "Moduł Flutter:" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                  lineNumber: 460,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: selectedProcess.hasFlutterDll ? "text-red-400 font-bold" : "text-slate-400", children: selectedProcess.hasFlutterDll ? "flutter_windows.dll (Wykryto)" : "Brak" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                  lineNumber: 461,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                lineNumber: 459,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between py-0.5", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "Z-Order TopMost:" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                  lineNumber: 466,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: selectedProcess.isTopMost ? "text-rose-400 font-bold" : "text-emerald-400", children: selectedProcess.isTopMost ? "WS_EX_TOPMOST (-1)" : "Standard" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                  lineNumber: 467,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                lineNumber: 465,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProcessTreeView.tsx",
              lineNumber: 450,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessTreeView.tsx",
            lineNumber: 394,
            columnNumber: 15
          }, this) : /* @__PURE__ */ jsxDEV("div", { className: "py-12 text-center text-slate-500 space-y-2", children: [
            /* @__PURE__ */ jsxDEV(Compass, { className: "w-8 h-8 mx-auto opacity-50" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessTreeView.tsx",
              lineNumber: 475,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs", children: "Wybierz dowolny proces z drzewa po lewej stronie, aby wyświetlić pełną analizę pochodzenia." }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessTreeView.tsx",
              lineNumber: 476,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessTreeView.tsx",
            lineNumber: 474,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessTreeView.tsx",
          lineNumber: 380,
          columnNumber: 11
        }, this),
        selectedProcess && /* @__PURE__ */ jsxDEV("div", { className: "pt-2 border-t border-slate-800 flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => onSuspendTree(selectedProcess.ppid || selectedProcess.pid),
              className: "flex-1 py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-mono font-semibold transition-all border border-slate-700 flex items-center justify-center gap-1",
              title: "Zamraża wszystkie wątki procesu i dzieci w pamięci RAM",
              children: [
                /* @__PURE__ */ jsxDEV(Lock, { className: "w-3 h-3 text-cyan-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                  lineNumber: 489,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Zamroź Drzewo" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                  lineNumber: 490,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/ProcessTreeView.tsx",
              lineNumber: 484,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => onKillProcessTree(selectedProcess.ppid || selectedProcess.pid),
              className: "flex-1 py-1.5 px-2 bg-red-700 hover:bg-red-600 text-white rounded-lg text-xs font-mono font-bold transition-all shadow flex items-center justify-center gap-1",
              title: "Zabija proces rodzica i wszystkie podokna",
              children: [
                /* @__PURE__ */ jsxDEV(Ban, { className: "w-3 h-3" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                  lineNumber: 498,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Tree Kill (/T)" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProcessTreeView.tsx",
                  lineNumber: 499,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/ProcessTreeView.tsx",
              lineNumber: 493,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessTreeView.tsx",
          lineNumber: 483,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ProcessTreeView.tsx",
        lineNumber: 379,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ProcessTreeView.tsx",
      lineNumber: 347,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/ProcessTreeView.tsx",
    lineNumber: 303,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlByb2Nlc3NUcmVlVmlldy50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgXG4gIEdpdEZvcmssIEZvbGRlclRyZWUsIFNoaWVsZEFsZXJ0LCBTa3VsbCwgQ2hlY2tDaXJjbGUyLCBDaGV2cm9uUmlnaHQsIFxuICBDaGV2cm9uRG93biwgVGVybWluYWwsIEV5ZSwgWmFwLCBBbGVydFRyaWFuZ2xlLCBDb3JuZXJEb3duUmlnaHQsIFxuICBMYXllcnMsIExvY2ssIEJhbiwgQWN0aXZpdHksIENvbXBhc3MsIEZsYW1lLCBTaGllbGRDaGVjaywgQXJyb3dSaWdodFxufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgU2ltdWxhdGVkUHJvY2VzcywgU2ltdWxhdGVkV2luZG93IH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5pbnRlcmZhY2UgUHJvY2Vzc1RyZWVWaWV3UHJvcHMge1xuICBwcm9jZXNzZXM6IFNpbXVsYXRlZFByb2Nlc3NbXTtcbiAgb25LaWxsUHJvY2VzczogKHBpZDogbnVtYmVyKSA9PiB2b2lkO1xuICBvbktpbGxQcm9jZXNzVHJlZTogKHJvb3RQaWQ6IG51bWJlcikgPT4gdm9pZDtcbiAgb25TdXNwZW5kVHJlZTogKHJvb3RQaWQ6IG51bWJlcikgPT4gdm9pZDtcbiAgb25TYWJvdGFnZVRyZWU6IChyb290UGlkOiBudW1iZXIpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBjb25zdCBQcm9jZXNzVHJlZVZpZXc6IFJlYWN0LkZDPFByb2Nlc3NUcmVlVmlld1Byb3BzPiA9ICh7XG4gIHByb2Nlc3NlcyxcbiAgb25LaWxsUHJvY2VzcyxcbiAgb25LaWxsUHJvY2Vzc1RyZWUsXG4gIG9uU3VzcGVuZFRyZWUsXG4gIG9uU2Fib3RhZ2VUcmVlLFxufSkgPT4ge1xuICBjb25zdCBbc2VsZWN0ZWRQaWQsIHNldFNlbGVjdGVkUGlkXSA9IHVzZVN0YXRlPG51bWJlciB8IG51bGw+KDg5MzIpO1xuICBjb25zdCBbZXhwYW5kZWRQaWRzLCBzZXRFeHBhbmRlZFBpZHNdID0gdXNlU3RhdGU8UmVjb3JkPG51bWJlciwgYm9vbGVhbj4+KHtcbiAgICAxMDQ0OiB0cnVlLFxuICAgIDM4NDA6IHRydWUsXG4gICAgNDgyMDogdHJ1ZSxcbiAgICA4OTMyOiB0cnVlLFxuICB9KTtcblxuICBjb25zdCB0b2dnbGVFeHBhbmQgPSAocGlkOiBudW1iZXIpID0+IHtcbiAgICBzZXRFeHBhbmRlZFBpZHMoKHByZXYpID0+ICh7XG4gICAgICAuLi5wcmV2LFxuICAgICAgW3BpZF06ICFwcmV2W3BpZF0sXG4gICAgfSkpO1xuICB9O1xuXG4gIC8vIEJ1aWxkIHRoZSBoaWVyYXJjaGljYWwgdHJlZTogZ3JvdXAgY2hpbGRyZW4gYnkgcHBpZFxuICBjb25zdCBwcm9jZXNzTWFwID0gbmV3IE1hcDxudW1iZXIsIFNpbXVsYXRlZFByb2Nlc3M+KCk7XG4gIHByb2Nlc3Nlcy5mb3JFYWNoKChwKSA9PiBwcm9jZXNzTWFwLnNldChwLnBpZCwgcCkpO1xuXG4gIGNvbnN0IGNoaWxkcmVuTWFwID0gbmV3IE1hcDxudW1iZXIsIFNpbXVsYXRlZFByb2Nlc3NbXT4oKTtcbiAgY29uc3Qgcm9vdFByb2Nlc3NlczogU2ltdWxhdGVkUHJvY2Vzc1tdID0gW107XG5cbiAgcHJvY2Vzc2VzLmZvckVhY2goKHApID0+IHtcbiAgICBpZiAocC5wcGlkICYmIHByb2Nlc3NNYXAuaGFzKHAucHBpZCkgJiYgcC5wcGlkICE9PSBwLnBpZCkge1xuICAgICAgY29uc3QgbGlzdCA9IGNoaWxkcmVuTWFwLmdldChwLnBwaWQpIHx8IFtdO1xuICAgICAgbGlzdC5wdXNoKHApO1xuICAgICAgY2hpbGRyZW5NYXAuc2V0KHAucHBpZCwgbGlzdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJvb3RQcm9jZXNzZXMucHVzaChwKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIENhbGN1bGF0ZSBsaW5lYWdlIGNoYWluIGZvciB0aGUgc2VsZWN0ZWQgcHJvY2Vzc1xuICBjb25zdCBnZXRMaW5lYWdlQ2hhaW4gPSAocGlkOiBudW1iZXIgfCBudWxsKTogU2ltdWxhdGVkUHJvY2Vzc1tdID0+IHtcbiAgICBpZiAoIXBpZCkgcmV0dXJuIFtdO1xuICAgIGNvbnN0IGNoYWluOiBTaW11bGF0ZWRQcm9jZXNzW10gPSBbXTtcbiAgICBsZXQgY3VycmVudCA9IHByb2Nlc3NNYXAuZ2V0KHBpZCk7XG4gICAgd2hpbGUgKGN1cnJlbnQpIHtcbiAgICAgIGNoYWluLnVuc2hpZnQoY3VycmVudCk7XG4gICAgICBpZiAoY3VycmVudC5wcGlkICYmIGN1cnJlbnQucHBpZCAhPT0gY3VycmVudC5waWQgJiYgcHJvY2Vzc01hcC5oYXMoY3VycmVudC5wcGlkKSkge1xuICAgICAgICBjdXJyZW50ID0gcHJvY2Vzc01hcC5nZXQoY3VycmVudC5wcGlkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY2hhaW47XG4gIH07XG5cbiAgY29uc3Qgc2VsZWN0ZWRQcm9jZXNzID0gc2VsZWN0ZWRQaWQgPyBwcm9jZXNzTWFwLmdldChzZWxlY3RlZFBpZCkgOiBudWxsO1xuICBjb25zdCBsaW5lYWdlQ2hhaW4gPSBnZXRMaW5lYWdlQ2hhaW4oc2VsZWN0ZWRQaWQpO1xuICBjb25zdCBpc1NlbGVjdGVkUm9ndWUgPSBzZWxlY3RlZFByb2Nlc3M/LmlzUm9ndWUgfHwgc2VsZWN0ZWRQcm9jZXNzPy5pc1RvcE1vc3QgfHwgc2VsZWN0ZWRQcm9jZXNzPy5oYXNGbHV0dGVyRGxsO1xuICBjb25zdCBwYXJlbnRPZlNlbGVjdGVkID0gc2VsZWN0ZWRQcm9jZXNzPy5wcGlkID8gcHJvY2Vzc01hcC5nZXQoc2VsZWN0ZWRQcm9jZXNzLnBwaWQpIDogbnVsbDtcblxuICAvLyBSZW5kZXIgcmVjdXJzaXZlIHRyZWUgbm9kZVxuICBjb25zdCByZW5kZXJUcmVlTm9kZSA9IChwcm9jOiBTaW11bGF0ZWRQcm9jZXNzLCBkZXB0aDogbnVtYmVyID0gMCkgPT4ge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gY2hpbGRyZW5NYXAuZ2V0KHByb2MucGlkKSB8fCBbXTtcbiAgICBjb25zdCBoYXNDaGlsZHJlbiA9IGNoaWxkcmVuLmxlbmd0aCA+IDA7XG4gICAgY29uc3QgaXNFeHBhbmRlZCA9IGV4cGFuZGVkUGlkc1twcm9jLnBpZF0gPz8gdHJ1ZTtcbiAgICBjb25zdCBpc1NlbGVjdGVkID0gc2VsZWN0ZWRQaWQgPT09IHByb2MucGlkO1xuICAgIGNvbnN0IHdpbmRvd3MgPSBwcm9jLndpbmRvd3MgfHwgW107XG5cbiAgICBjb25zdCBpc1J1bm5pbmcgPSBwcm9jLnN0YXR1cyA9PT0gJ3J1bm5pbmcnO1xuICAgIGNvbnN0IGlzVGVybWluYXRlZCA9IHByb2Muc3RhdHVzID09PSAndGVybWluYXRlZCc7XG4gICAgY29uc3QgaXNRdWFyYW50aW5lZCA9IHByb2Muc3RhdHVzID09PSAncXVhcmFudGluZWQnO1xuICAgIGNvbnN0IGlzUGVDb3JydXB0ZWQgPSBwcm9jLnN0YXR1cyA9PT0gJ3BlX2NvcnJ1cHRlZCc7XG4gICAgY29uc3QgaXNTdXNwZW5kZWQgPSBwcm9jLnN0YXR1cyA9PT0gJ3N1c3BlbmRlZCc7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBrZXk9e3Byb2MucGlkfSBjbGFzc05hbWU9XCJzcGFjZS15LTFcIj5cbiAgICAgICAgey8qIFByb2Nlc3MgUm93ICovfVxuICAgICAgICA8ZGl2XG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2VsZWN0ZWRQaWQocHJvYy5waWQpfVxuICAgICAgICAgIGNsYXNzTmFtZT17YGdyb3VwIGZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgc206aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBwLTIuNSByb3VuZGVkLXhsIGJvcmRlciB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBzZWxlY3Qtbm9uZSAke1xuICAgICAgICAgICAgaXNTZWxlY3RlZFxuICAgICAgICAgICAgICA/ICdiZy1wdXJwbGUtOTUwLzYwIGJvcmRlci1wdXJwbGUtNTAwIHNoYWRvdy1tZCBzaGFkb3ctcHVycGxlLTk1MC81MCByaW5nLTEgcmluZy1wdXJwbGUtNTAwLzUwJ1xuICAgICAgICAgICAgICA6IHByb2MuaXNSb2d1ZSB8fCBwcm9jLmlzVG9wTW9zdFxuICAgICAgICAgICAgICA/ICdiZy1yZWQtOTUwLzMwIGJvcmRlci1yZWQtODAwLzgwIGhvdmVyOmJvcmRlci1yZWQtNjAwJ1xuICAgICAgICAgICAgICA6IHByb2MuaXNQYXJlbnREcm9wcGVyXG4gICAgICAgICAgICAgID8gJ2JnLWFtYmVyLTk1MC8zMCBib3JkZXItYW1iZXItODAwLzgwIGhvdmVyOmJvcmRlci1hbWJlci02MDAnXG4gICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTkwMC84MCBib3JkZXItc2xhdGUtODAwIGhvdmVyOmJvcmRlci1zbGF0ZS03MDAnXG4gICAgICAgICAgfWB9XG4gICAgICAgICAgc3R5bGU9e3sgbWFyZ2luTGVmdDogYCR7TWF0aC5taW4oZGVwdGggKiAyMCwgMTAwKX1weGAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yIG1pbi13LTBcIj5cbiAgICAgICAgICAgIHsvKiBUcmVlIEJyYW5jaCBWaXN1YWwgQ29ubmVjdG9yIC8gRXhwYW5kIFRvZ2dsZSAqL31cbiAgICAgICAgICAgIHtoYXNDaGlsZHJlbiB8fCB3aW5kb3dzLmxlbmd0aCA+IDAgPyAoXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgIHRvZ2dsZUV4cGFuZChwcm9jLnBpZCk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTUgaC01IGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvdW5kZWQgYmctc2xhdGUtODAwIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGVcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2lzRXhwYW5kZWQgPyA8Q2hldnJvbkRvd24gY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPiA6IDxDaGV2cm9uUmlnaHQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPn1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctNSBoLTUgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1zbGF0ZS02MDBcIj5cbiAgICAgICAgICAgICAgICA8Q29ybmVyRG93blJpZ2h0IGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuXG4gICAgICAgICAgICB7LyogU3RhdHVzIEljb24gKi99XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICB7aXNQZUNvcnJ1cHRlZCA/IChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctNiBoLTYgcm91bmRlZC1sZyBiZy1yb3NlLTk1MCBib3JkZXIgYm9yZGVyLXJvc2UtNjAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtcm9zZS00MDBcIj5cbiAgICAgICAgICAgICAgICAgIDxTa3VsbCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICkgOiBpc1F1YXJhbnRpbmVkID8gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy02IGgtNiByb3VuZGVkLWxnIGJnLXB1cnBsZS05NTAgYm9yZGVyIGJvcmRlci1wdXJwbGUtNjAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtcHVycGxlLTQwMFwiPlxuICAgICAgICAgICAgICAgICAgPExvY2sgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApIDogaXNUZXJtaW5hdGVkID8gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy02IGgtNiByb3VuZGVkLWxnIGJnLXNsYXRlLTgwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LXNsYXRlLTUwMFwiPlxuICAgICAgICAgICAgICAgICAgPEJhbiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICkgOiBwcm9jLmlzUm9ndWUgfHwgcHJvYy5pc1RvcE1vc3QgPyAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTYgaC02IHJvdW5kZWQtbGcgYmctcmVkLTYwMC8zMCBib3JkZXIgYm9yZGVyLXJlZC01MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1yZWQtNDAwIGFuaW1hdGUtcHVsc2VcIj5cbiAgICAgICAgICAgICAgICAgIDxTaGllbGRBbGVydCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICkgOiBwcm9jLmlzUGFyZW50RHJvcHBlciA/IChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctNiBoLTYgcm91bmRlZC1sZyBiZy1hbWJlci02MDAvMzAgYm9yZGVyIGJvcmRlci1hbWJlci01MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1hbWJlci00MDBcIj5cbiAgICAgICAgICAgICAgICAgIDxBbGVydFRyaWFuZ2xlIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctNiBoLTYgcm91bmRlZC1sZyBiZy1lbWVyYWxkLTYwMC8yMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNTAwLzQwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtZW1lcmFsZC00MDBcIj5cbiAgICAgICAgICAgICAgICAgIDxBY3Rpdml0eSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIE5hbWUgYW5kIE1ldGEgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRydW5jYXRlXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgdGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkICR7aXNUZXJtaW5hdGVkID8gJ2xpbmUtdGhyb3VnaCB0ZXh0LXNsYXRlLTUwMCcgOiAndGV4dC13aGl0ZSd9YH0+XG4gICAgICAgICAgICAgICAgICB7cHJvYy5uYW1lfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCBmb250LW1vbm8gYmctc2xhdGUtOTUwIHB4LTEuNSBweS0wLjUgcm91bmRlZCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgUElEOiA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMjAwXCI+e3Byb2MucGlkfTwvc3Ryb25nPiB7cHJvYy5wcGlkID8gYChQUElEOiAke3Byb2MucHBpZH0pYCA6ICcnfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB7LyogVGFjdGljYWwgUm9sZSBCYWRnZXMgKi99XG4gICAgICAgICAgICAgICAge3Byb2MuaXNQYXJlbnREcm9wcGVyICYmIChcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzlweF0gcHgtMS41IHB5LTAuNSByb3VuZGVkIGJnLWFtYmVyLTk1MCB0ZXh0LWFtYmVyLTMwMCBib3JkZXIgYm9yZGVyLWFtYmVyLTgwMCBmb250LWJvbGQgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgICAgIOKaoO+4jyBQQVJFTlQgRFJPUFBFUlxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAge3Byb2MuaXNSb2d1ZSAmJiAoXG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHB4LTEuNSBweS0wLjUgcm91bmRlZCBiZy1yZWQtOTUwIHRleHQtcmVkLTMwMCBib3JkZXIgYm9yZGVyLXJlZC04MDAgZm9udC1ib2xkIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgICAgICDimqEgUk9HVUUgRkxVVFRFUlxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAge3Byb2MuaXNUb3BNb3N0ICYmIChcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzlweF0gcHgtMS41IHB5LTAuNSByb3VuZGVkIGJnLXJvc2UtOTUwIHRleHQtcm9zZS0zMDAgYm9yZGVyIGJvcmRlci1yb3NlLTgwMCBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgICAgICAgV1NfRVhfVE9QTU9TVFxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIHRydW5jYXRlIG10LTAuNVwiPlxuICAgICAgICAgICAgICAgIHtwcm9jLndpbmRvd1RpdGxlIHx8IHByb2MuZmlsZVBhdGh9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogQWN0aW9uIGFuZCBTdGF0ZSBCYWRnZXMgb24gUmlnaHQgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTIgbXQtMiBzbTptdC0wIHBsLTcgc206cGwtMFwiPlxuICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdGV4dC1bMTBweF0gZm9udC1tb25vIHB4LTIgcHktMC41IHJvdW5kZWQgZm9udC1zZW1pYm9sZCAke1xuICAgICAgICAgICAgICAgIGlzUGVDb3JydXB0ZWRcbiAgICAgICAgICAgICAgICAgID8gJ2JnLXJvc2UtOTUwIHRleHQtcm9zZS0zMDAgYm9yZGVyIGJvcmRlci1yb3NlLTcwMCdcbiAgICAgICAgICAgICAgICAgIDogaXNRdWFyYW50aW5lZFxuICAgICAgICAgICAgICAgICAgPyAnYmctcHVycGxlLTk1MCB0ZXh0LXB1cnBsZS0zMDAgYm9yZGVyIGJvcmRlci1wdXJwbGUtNzAwJ1xuICAgICAgICAgICAgICAgICAgOiBpc1Rlcm1pbmF0ZWRcbiAgICAgICAgICAgICAgICAgID8gJ2JnLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTUwMCdcbiAgICAgICAgICAgICAgICAgIDogaXNTdXNwZW5kZWRcbiAgICAgICAgICAgICAgICAgID8gJ2JnLWN5YW4tOTUwIHRleHQtY3lhbi0zMDAgYm9yZGVyIGJvcmRlci1jeWFuLTgwMCdcbiAgICAgICAgICAgICAgICAgIDogcHJvYy5pc1RvcE1vc3RcbiAgICAgICAgICAgICAgICAgID8gJ2JnLXJlZC05NTAgdGV4dC1yZWQtMzAwIGJvcmRlciBib3JkZXItcmVkLTgwMCdcbiAgICAgICAgICAgICAgICAgIDogJ2JnLWVtZXJhbGQtOTUwIHRleHQtZW1lcmFsZC00MDAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTgwMCdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtpc1BlQ29ycnVwdGVkXG4gICAgICAgICAgICAgICAgPyAnUEUgMHhDMDAwMDA3QidcbiAgICAgICAgICAgICAgICA6IGlzUXVhcmFudGluZWRcbiAgICAgICAgICAgICAgICA/ICdLV0FSQU5UQU5OQSdcbiAgICAgICAgICAgICAgICA6IGlzVGVybWluYXRlZFxuICAgICAgICAgICAgICAgID8gJ1pBQklUWSdcbiAgICAgICAgICAgICAgICA6IGlzU3VzcGVuZGVkXG4gICAgICAgICAgICAgICAgPyAnWkFNUk/Fu09OWSdcbiAgICAgICAgICAgICAgICA6IHByb2MuaXNUb3BNb3N0XG4gICAgICAgICAgICAgICAgPyAnQUtUWVdOWSBPVkVSTEFZJ1xuICAgICAgICAgICAgICAgIDogJ05PUk1BTE5ZJ31cbiAgICAgICAgICAgIDwvc3Bhbj5cblxuICAgICAgICAgICAge2lzUnVubmluZyAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0xXCI+XG4gICAgICAgICAgICAgICAgeyhoYXNDaGlsZHJlbiB8fCBwcm9jLmlzUGFyZW50RHJvcHBlcikgJiYgKFxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgIG9uS2lsbFByb2Nlc3NUcmVlKHByb2MucGlkKTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJVYmlqIHRlbiBwcm9jZXMgd3JheiB6ZSB3c3p5c3RraW1pIHByb2Nlc2FtaSBpIG9rbmFtaSBwb3RvbW55bWkgKC9UKVwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIgcHktMSBiZy1yZWQtOTUwIGhvdmVyOmJnLXJlZC04MDAgdGV4dC1yZWQtMjAwIHJvdW5kZWQgdGV4dC1bMTBweF0gZm9udC1tb25vIGJvcmRlciBib3JkZXItcmVkLTcwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSB0cmFuc2l0aW9uLWFsbFwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxHaXRGb3JrIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1yZWQtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+VHJlZS1LaWxsIC9UPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgb25LaWxsUHJvY2Vzcyhwcm9jLnBpZCk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgdGl0bGU9XCJaYWJpaiB0eWxrbyB0ZW4ga29ua3JldG55IHByb2Nlc1wiXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yIHB5LTEgYmctc2xhdGUtODAwIGhvdmVyOmJnLXNsYXRlLTcwMCB0ZXh0LXNsYXRlLTIwMCByb3VuZGVkIHRleHQtWzEwcHhdIGZvbnQtbW9ubyBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCB0cmFuc2l0aW9uLWFsbFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgS2lsbFxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBSZW5kZXIgQXR0YWNoZWQgSFdORCBDaGlsZCBXaW5kb3cgSGFuZGxlcyAqL31cbiAgICAgICAge2lzRXhwYW5kZWQgJiYgd2luZG93cy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMVwiIHN0eWxlPXt7IG1hcmdpbkxlZnQ6IGAke01hdGgubWluKChkZXB0aCArIDEpICogMjAsIDEyMCl9cHhgIH19PlxuICAgICAgICAgICAge3dpbmRvd3MubWFwKCh3aW4pID0+IChcbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGtleT17d2luLmh3bmR9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC0yIHJvdW5kZWQtbGcgYm9yZGVyIHRleHQtWzExcHhdIGZvbnQtbW9ubyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gJHtcbiAgICAgICAgICAgICAgICAgIHdpbi5pc1RvcE1vc3RcbiAgICAgICAgICAgICAgICAgICAgPyAnYmctcmVkLTk1MC80MCBib3JkZXItcmVkLTgwMC83MCB0ZXh0LXJlZC0yMDAnXG4gICAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTk1MCBib3JkZXItc2xhdGUtODAwLzgwIHRleHQtc2xhdGUtNDAwJ1xuICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTIgdHJ1bmNhdGVcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctNCBoLTQgcm91bmRlZCBiZy1zbGF0ZS04MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1bOXB4XSB0ZXh0LXNsYXRlLTQwMCBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgICAgICAg8J+qn1xuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS0zMDAgZm9udC1ib2xkIHRydW5jYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIEhXTkQ6IDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC1wdXJwbGUtMzAwXCI+e3dpbi5od25kfTwvc3Ryb25nPiAtIFwie3dpbi50aXRsZX1cIlxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTEuNSBmbGV4LXNocmluay0wXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIGJnLXNsYXRlLTkwMCBweC0xLjUgcHktMC41IHJvdW5kZWQgdGV4dC1zbGF0ZS00MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgS2xhc2E6IHt3aW4uY2xhc3NOYW1lfVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAge3dpbi5pc1RvcE1vc3QgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIGJnLXJvc2UtOTUwIHRleHQtcm9zZS0zMDAgcHgtMS41IHB5LTAuNSByb3VuZGVkIGJvcmRlciBib3JkZXItcm9zZS04MDAgZm9udC1ib2xkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgV1NfRVhfVE9QTU9TVFxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAge3dpbi5pc0Z1bGxzY3JlZW4gJiYgKFxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIGJnLWFtYmVyLTk1MCB0ZXh0LWFtYmVyLTMwMCBweC0xLjUgcHktMC41IHJvdW5kZWQgYm9yZGVyIGJvcmRlci1hbWJlci04MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICBGdWxsc2NyZWVuICh7d2luLmJvdW5kcy53aWR0aH14e3dpbi5ib3VuZHMuaGVpZ2h0fSlcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cblxuICAgICAgICB7LyogUmVjdXJzaXZlIENoaWxkcmVuIFJlbmRlcmluZyAqL31cbiAgICAgICAge2lzRXhwYW5kZWQgJiYgaGFzQ2hpbGRyZW4gJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xXCI+XG4gICAgICAgICAgICB7Y2hpbGRyZW4ubWFwKChjaGlsZCkgPT4gcmVuZGVyVHJlZU5vZGUoY2hpbGQsIGRlcHRoICsgMSkpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00XCI+XG4gICAgICB7LyogVG9wIEJhbm5lciBleHBsYWluaW5nIFBQSUQgT3JpZ2luIFRyYWNraW5nICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1yIGZyb20tcHVycGxlLTk1MC83MCB2aWEtc2xhdGUtOTAwIHRvLWluZGlnby05NTAvNzAgYm9yZGVyIGJvcmRlci1wdXJwbGUtOTAwLzUwIHJvdW5kZWQteGwgcC00IGZsZXggZmxleC1jb2wgbWQ6ZmxleC1yb3cgaXRlbXMtc3RhcnQgbWQ6aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMyBzaGFkb3ctbGdcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLXN0YXJ0IHNwYWNlLXgtM1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yLjUgcm91bmRlZC14bCBiZy1wdXJwbGUtNjAwLzIwIGJvcmRlciBib3JkZXItcHVycGxlLTUwMC8zMCB0ZXh0LXB1cnBsZS0zMDBcIj5cbiAgICAgICAgICAgIDxHaXRGb3JrIGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJvbGQgdGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICA8c3Bhbj5Ecnpld28gUmVsYWNqaSBQcm9jZXPDs3cgJiBEZXRla3RvciBQb2Nob2R6ZW5pYSBPa25hIChQUElEIExpbmVhZ2UgVHJhY2tlcik8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHB4LTIgcHktMC41IHJvdW5kZWQgYmctcHVycGxlLTkwMCB0ZXh0LXB1cnBsZS0yMDAgYm9yZGVyIGJvcmRlci1wdXJwbGUtNjAwIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgIE9SSUdJTiBGT1JFTlNJQ1NcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS0zMDAgbXQtMC41IG1heC13LTN4bFwiPlxuICAgICAgICAgICAgICBaxYJvxZtsaXdlIG9rbmEgRmx1dHRlcmEgc8SFIGN6xJlzdG8gZ2VuZXJvd2FuZSBwcnpleiB1a3J5dGUgcHJvY2VzeS1tYXRraSAodHp3LiA8ZW0+V2F0Y2hkb2cgLyBEcm9wcGVyPC9lbT4pLiBaaWRlbnR5ZmlrdWogcHJhd2R6aXdlIMW6csOzZMWCbyBwb2Nob2R6ZW5pYSAoUGFyZW50IFBJRCksIGFieSB6bGlrd2lkb3dhxIcgY2HFgnkgxYJhxYRjdWNoIG9kcmFkemFuaWEgc2nEmSBibG9rYWR5LlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7c2VsZWN0ZWRQcm9jZXNzICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGZsZXgtc2hyaW5rLTBcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25LaWxsUHJvY2Vzc1RyZWUoc2VsZWN0ZWRQcm9jZXNzLnBwaWQgfHwgc2VsZWN0ZWRQcm9jZXNzLnBpZCl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgcHgtMyBweS0yIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1yZWQtNzAwIHRvLXBpbmstNzAwIGhvdmVyOmZyb20tcmVkLTYwMCBob3Zlcjp0by1waW5rLTYwMCB0ZXh0LXdoaXRlIHJvdW5kZWQtbGcgdGV4dC14cyBmb250LWJvbGQgZm9udC1tb25vIHNoYWRvdyB0cmFuc2l0aW9uLWFsbCBib3JkZXIgYm9yZGVyLXJlZC01MDAvMzBcIlxuICAgICAgICAgICAgICB0aXRsZT1cIlpsaWt3aWR1aiBwcm9jZXMgbmFkcnrEmWRueSBpIHdzenlzdGtpZSBqZWdvIGR6aWVjaVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxTa3VsbCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPlpsaWt3aWR1aiBEcnpld28gKC9UKTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uU2Fib3RhZ2VUcmVlKHNlbGVjdGVkUHJvY2Vzcy5wcGlkIHx8IHNlbGVjdGVkUHJvY2Vzcy5waWQpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTMgcHktMiBiZy1wdXJwbGUtODAwIGhvdmVyOmJnLXB1cnBsZS03MDAgdGV4dC13aGl0ZSByb3VuZGVkLWxnIHRleHQteHMgZm9udC1ib2xkIGZvbnQtbW9ubyBzaGFkb3cgdHJhbnNpdGlvbi1hbGwgYm9yZGVyIGJvcmRlci1wdXJwbGUtNTAwLzMwXCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJabmlzemN6IG5hZ8WCw7N3a2kgUEUgcGxpa3Ugcm9kemljYSBpIGR6aWVja2EgbmEgZHlza3VcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8RmxhbWUgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1waW5rLTMwMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPlNhYm90YcW8IFBFIERyemV3YTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBNYWluIEdyaWQ6IFRyZWUgVmlldyAoTGVmdCkgJiBPcmlnaW4gQW5hbHlzaXMgSW5zcGVjdG9yIChSaWdodCkgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbGc6Z3JpZC1jb2xzLTEyIGdhcC00XCI+XG4gICAgICAgIHsvKiBMZWZ0IFRyZWUgSGllcmFyY2h5ICg3IGNvbHMpICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTcgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQteGwgcC00IHNwYWNlLXktM1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHBiLTIgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXhzXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtc2xhdGUtMzAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgPEZvbGRlclRyZWUgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXB1cnBsZS00MDBcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj5IaWVyYXJjaGlhIFByb2Nlc8OzdyAoUHJvY2VzcyBMaW5lYWdlIEZvcmVzdCk8L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgV8SZesWCw7N3OiB7cHJvY2Vzc2VzLmxlbmd0aH0gfCBXeWJpZXJ6IHfEmXplxYIsIGFieSB6YmFkYcSHIHBvY2hvZHplbmllXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogVHJlZSBOb2RlIENvbnRhaW5lciAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41IG1heC1oLVs0MjBweF0gb3ZlcmZsb3cteS1hdXRvIHByLTEgc2Nyb2xsYmFyLXRoaW4gc2Nyb2xsYmFyLXRodW1iLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAge3Jvb3RQcm9jZXNzZXMubWFwKChyb290KSA9PiByZW5kZXJUcmVlTm9kZShyb290LCAwKSl9XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBwdC0yIGJvcmRlci10IGJvcmRlci1zbGF0ZS05MDAgdGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDAgZm9udC1tb25vXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTIgaC0yIHJvdW5kZWQtZnVsbCBiZy1hbWJlci00MDBcIj48L3NwYW4+IFJvZHppYyAoRHJvcHBlci9XYXRjaGRvZylcbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctMiBoLTIgcm91bmRlZC1mdWxsIGJnLXJlZC00MDBcIj48L3NwYW4+IFrFgm/Fm2xpd3kgRmx1dHRlciBDaGlsZFxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0yIGgtMiByb3VuZGVkLWZ1bGwgYmctcHVycGxlLTQwMFwiPjwvc3Bhbj4gSFdORCBXaW4zMiBPdmVybGF5XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBSaWdodDogU2VsZWN0ZWQgTm9kZSBPcmlnaW4gSW5zcGVjdG9yICg1IGNvbHMpICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTUgYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQteGwgcC00IHNwYWNlLXktNCBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBwYi0yIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAgdGV4dC14c1wiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgIDxDb21wYXNzIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1waW5rLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+QW5hbGl6YSDFmmNpZcW8a2kgUG9jaG9kemVuaWEgT2tuYTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICB7c2VsZWN0ZWRQcm9jZXNzICYmIChcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gcHgtMiBweS0wLjUgcm91bmRlZCBiZy1zbGF0ZS05NTAgdGV4dC1zbGF0ZS0zMDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgICAgIFBJRDoge3NlbGVjdGVkUHJvY2Vzcy5waWR9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHtzZWxlY3RlZFByb2Nlc3MgPyAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgICB7LyogVmlzdWFsIExpbmVhZ2UgQ2hhaW4gQnJlYWRjcnVtYnMgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05NTAgcC0zIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgc3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LWJvbGQgdXBwZXJjYXNlIHRleHQtc2xhdGUtNDAwIGJsb2NrIHRyYWNraW5nLXdpZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIMWBYcWEY3VjaCBUd29yemVuaWEgUHJvY2VzdSAoUFBJRCBMaW5lYWdlKTpcbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNVwiPlxuICAgICAgICAgICAgICAgICAgICB7bGluZWFnZUNoYWluLm1hcCgocCwgaWR4KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e3AucGlkfSBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTIgdGV4dC1bMTFweF0gZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTQgaC00IHJvdW5kZWQtZnVsbCBiZy1zbGF0ZS04MDAgdGV4dC1zbGF0ZS00MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1bOXB4XSBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge2lkeCArIDF9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHAtMS41IHJvdW5kZWQgZmxleC0xIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBib3JkZXIgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcC5waWQgPT09IHNlbGVjdGVkUHJvY2Vzcy5waWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1wdXJwbGUtOTUwLzgwIGJvcmRlci1wdXJwbGUtNTAwIHRleHQtcHVycGxlLTIwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHAuaXNQYXJlbnREcm9wcGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctYW1iZXItOTUwLzUwIGJvcmRlci1hbWJlci04MDAgdGV4dC1hbWJlci0yMDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTAwIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS0zMDAnXG4gICAgICAgICAgICAgICAgICAgICAgICB9YH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0cnVuY2F0ZVwiPntwLm5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCBmb250LW5vcm1hbFwiPlBJRCB7cC5waWR9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7LyogRm9yZW5zaWMgRGlhZ25vc3RpYyBDYXJkICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgcC0zIHJvdW5kZWQteGwgYm9yZGVyIHNwYWNlLXktMS41ICR7XG4gICAgICAgICAgICAgICAgICBpc1NlbGVjdGVkUm9ndWVcbiAgICAgICAgICAgICAgICAgICAgPyAnYmctcmVkLTk1MC8zMCBib3JkZXItcmVkLTgwMC84MCB0ZXh0LXJlZC0yMDAnXG4gICAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTk1MCBib3JkZXItc2xhdGUtODAwIHRleHQtc2xhdGUtMzAwJ1xuICAgICAgICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgICAge2lzU2VsZWN0ZWRSb2d1ZSA/IDxBbGVydFRyaWFuZ2xlIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1yZWQtNDAwXCIgLz4gOiA8U2hpZWxkQ2hlY2sgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWVtZXJhbGQtNDAwXCIgLz59XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2lzU2VsZWN0ZWRSb2d1ZSA/ICdXeWtyeXRvIFBvZGVqcnphbmUgUG9jaG9kemVuaWUnIDogJ1N0YW5kYXJkb3d5IFByb2NlcyBTeXN0ZW1vd3knfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm9cIj57c2VsZWN0ZWRQcm9jZXNzLnN0YXR1cy50b1VwcGVyQ2FzZSgpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTMwMCBsZWFkaW5nLXJlbGF4ZWRcIj5cbiAgICAgICAgICAgICAgICAgICAge2lzU2VsZWN0ZWRSb2d1ZSAmJiBwYXJlbnRPZlNlbGVjdGVkID8gKFxuICAgICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgICBQcm9jZXMgPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlIGZvbnQtbW9ub1wiPntzZWxlY3RlZFByb2Nlc3MubmFtZX08L3N0cm9uZz4gem9zdGHFgiB3eXdvxYJhbnkgcHJ6ZXogcm9kemljYSA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtYW1iZXItMzAwIGZvbnQtbW9ub1wiPntwYXJlbnRPZlNlbGVjdGVkLm5hbWV9PC9zdHJvbmc+IChQSUQ6IHtwYXJlbnRPZlNlbGVjdGVkLnBpZH0pLiBaYWJpY2llIHNhbWVnbyBva25hIHBvendvbGkgcm9kemljb3dpIG5hIG5hdHljaG1pYXN0b3d5IHJlc3RhcnQhXG4gICAgICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgICAgIMWaY2llxbxrYSBwbGlrdTogPGNvZGUgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS0yMDAgZm9udC1tb25vIHRleHQtWzEwcHhdIGJyZWFrLWFsbFwiPntzZWxlY3RlZFByb2Nlc3MuZmlsZVBhdGh9PC9jb2RlPlxuICAgICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIERldGFpbHMgVGFibGUgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEgdGV4dC1bMTFweF0gZm9udC1tb25vIHRleHQtc2xhdGUtMzAwIGJnLXNsYXRlLTk1MCBwLTIuNSByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIHB5LTAuNSBib3JkZXItYiBib3JkZXItc2xhdGUtOTAwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwXCI+VHl0dcWCIE9rbmE6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTIwMCBmb250LWJvbGQgdHJ1bmNhdGUgbWF4LXctWzIwMHB4XVwiPntzZWxlY3RlZFByb2Nlc3Mud2luZG93VGl0bGUgfHwgJ0JyYWsgb2tuYSd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIHB5LTAuNSBib3JkZXItYiBib3JkZXItc2xhdGUtOTAwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwXCI+UGFyZW50IFBJRCAoUFBJRCk6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWFtYmVyLTMwMCBmb250LWJvbGRcIj57c2VsZWN0ZWRQcm9jZXNzLnBwaWQgfHwgJ05vbmUgKFN5c3RlbSBSb290KSd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIHB5LTAuNSBib3JkZXItYiBib3JkZXItc2xhdGUtOTAwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwXCI+TW9kdcWCIEZsdXR0ZXI6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3NlbGVjdGVkUHJvY2Vzcy5oYXNGbHV0dGVyRGxsID8gJ3RleHQtcmVkLTQwMCBmb250LWJvbGQnIDogJ3RleHQtc2xhdGUtNDAwJ30+XG4gICAgICAgICAgICAgICAgICAgICAge3NlbGVjdGVkUHJvY2Vzcy5oYXNGbHV0dGVyRGxsID8gJ2ZsdXR0ZXJfd2luZG93cy5kbGwgKFd5a3J5dG8pJyA6ICdCcmFrJ31cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIHB5LTAuNVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMFwiPlotT3JkZXIgVG9wTW9zdDo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17c2VsZWN0ZWRQcm9jZXNzLmlzVG9wTW9zdCA/ICd0ZXh0LXJvc2UtNDAwIGZvbnQtYm9sZCcgOiAndGV4dC1lbWVyYWxkLTQwMCd9PlxuICAgICAgICAgICAgICAgICAgICAgIHtzZWxlY3RlZFByb2Nlc3MuaXNUb3BNb3N0ID8gJ1dTX0VYX1RPUE1PU1QgKC0xKScgOiAnU3RhbmRhcmQnfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB5LTEyIHRleHQtY2VudGVyIHRleHQtc2xhdGUtNTAwIHNwYWNlLXktMlwiPlxuICAgICAgICAgICAgICAgIDxDb21wYXNzIGNsYXNzTmFtZT1cInctOCBoLTggbXgtYXV0byBvcGFjaXR5LTUwXCIgLz5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzXCI+V3liaWVyeiBkb3dvbG55IHByb2NlcyB6IGRyemV3YSBwbyBsZXdlaiBzdHJvbmllLCBhYnkgd3nFm3dpZXRsacSHIHBlxYJuxIUgYW5hbGl6xJkgcG9jaG9kemVuaWEuPC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogUXVpY2sgQWN0aW9uIEJhciBhdCBib3R0b20gKi99XG4gICAgICAgICAge3NlbGVjdGVkUHJvY2VzcyAmJiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0LTIgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTJcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uU3VzcGVuZFRyZWUoc2VsZWN0ZWRQcm9jZXNzLnBwaWQgfHwgc2VsZWN0ZWRQcm9jZXNzLnBpZCl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC0xIHB5LTEuNSBweC0yIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0yMDAgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtbW9ubyBmb250LXNlbWlib2xkIHRyYW5zaXRpb24tYWxsIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xXCJcbiAgICAgICAgICAgICAgICB0aXRsZT1cIlphbXJhxbxhIHdzenlzdGtpZSB3xIV0a2kgcHJvY2VzdSBpIGR6aWVjaSB3IHBhbWnEmWNpIFJBTVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8TG9jayBjbGFzc05hbWU9XCJ3LTMgaC0zIHRleHQtY3lhbi00MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPlphbXJvxbogRHJ6ZXdvPC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25LaWxsUHJvY2Vzc1RyZWUoc2VsZWN0ZWRQcm9jZXNzLnBwaWQgfHwgc2VsZWN0ZWRQcm9jZXNzLnBpZCl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC0xIHB5LTEuNSBweC0yIGJnLXJlZC03MDAgaG92ZXI6YmctcmVkLTYwMCB0ZXh0LXdoaXRlIHJvdW5kZWQtbGcgdGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkIHRyYW5zaXRpb24tYWxsIHNoYWRvdyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMVwiXG4gICAgICAgICAgICAgICAgdGl0bGU9XCJaYWJpamEgcHJvY2VzIHJvZHppY2EgaSB3c3p5c3RraWUgcG9kb2tuYVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8QmFuIGNsYXNzTmFtZT1cInctMyBoLTNcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPlRyZWUgS2lsbCAoL1QpPC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUFxSDhCLFNBZ1VSLFVBaFVRO0FBckg5QixTQUFnQixnQkFBZ0I7QUFDaEM7QUFBQSxFQUNFO0FBQUEsRUFBUztBQUFBLEVBQVk7QUFBQSxFQUFhO0FBQUEsRUFBcUI7QUFBQSxFQUN2RDtBQUFBLEVBQWlDO0FBQUEsRUFBZTtBQUFBLEVBQ3hDO0FBQUEsRUFBTTtBQUFBLEVBQUs7QUFBQSxFQUFVO0FBQUEsRUFBUztBQUFBLEVBQU87QUFBQSxPQUN4QztBQVdBLGFBQU0sa0JBQWtELENBQUM7QUFBQSxFQUM5RDtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQUFNO0FBQ0osUUFBTSxDQUFDLGFBQWEsY0FBYyxJQUFJLFNBQXdCLElBQUk7QUFDbEUsUUFBTSxDQUFDLGNBQWMsZUFBZSxJQUFJLFNBQWtDO0FBQUEsSUFDeEUsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1IsQ0FBQztBQUVELFFBQU0sZUFBZSxDQUFDLFFBQWdCO0FBQ3BDLG9CQUFnQixDQUFDLFVBQVU7QUFBQSxNQUN6QixHQUFHO0FBQUEsTUFDSCxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssR0FBRztBQUFBLElBQ2xCLEVBQUU7QUFBQSxFQUNKO0FBR0EsUUFBTSxhQUFhLG9CQUFJLElBQThCO0FBQ3JELFlBQVUsUUFBUSxDQUFDLE1BQU0sV0FBVyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFFakQsUUFBTSxjQUFjLG9CQUFJLElBQWdDO0FBQ3hELFFBQU0sZ0JBQW9DLENBQUM7QUFFM0MsWUFBVSxRQUFRLENBQUMsTUFBTTtBQUN2QixRQUFJLEVBQUUsUUFBUSxXQUFXLElBQUksRUFBRSxJQUFJLEtBQUssRUFBRSxTQUFTLEVBQUUsS0FBSztBQUN4RCxZQUFNLE9BQU8sWUFBWSxJQUFJLEVBQUUsSUFBSSxLQUFLLENBQUM7QUFDekMsV0FBSyxLQUFLLENBQUM7QUFDWCxrQkFBWSxJQUFJLEVBQUUsTUFBTSxJQUFJO0FBQUEsSUFDOUIsT0FBTztBQUNMLG9CQUFjLEtBQUssQ0FBQztBQUFBLElBQ3RCO0FBQUEsRUFDRixDQUFDO0FBR0QsUUFBTSxrQkFBa0IsQ0FBQyxRQUEyQztBQUNsRSxRQUFJLENBQUMsSUFBSyxRQUFPLENBQUM7QUFDbEIsVUFBTSxRQUE0QixDQUFDO0FBQ25DLFFBQUksVUFBVSxXQUFXLElBQUksR0FBRztBQUNoQyxXQUFPLFNBQVM7QUFDZCxZQUFNLFFBQVEsT0FBTztBQUNyQixVQUFJLFFBQVEsUUFBUSxRQUFRLFNBQVMsUUFBUSxPQUFPLFdBQVcsSUFBSSxRQUFRLElBQUksR0FBRztBQUNoRixrQkFBVSxXQUFXLElBQUksUUFBUSxJQUFJO0FBQUEsTUFDdkMsT0FBTztBQUNMO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0sa0JBQWtCLGNBQWMsV0FBVyxJQUFJLFdBQVcsSUFBSTtBQUNwRSxRQUFNLGVBQWUsZ0JBQWdCLFdBQVc7QUFDaEQsUUFBTSxrQkFBa0IsaUJBQWlCLFdBQVcsaUJBQWlCLGFBQWEsaUJBQWlCO0FBQ25HLFFBQU0sbUJBQW1CLGlCQUFpQixPQUFPLFdBQVcsSUFBSSxnQkFBZ0IsSUFBSSxJQUFJO0FBR3hGLFFBQU0saUJBQWlCLENBQUMsTUFBd0IsUUFBZ0IsTUFBTTtBQUNwRSxVQUFNLFdBQVcsWUFBWSxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDL0MsVUFBTSxjQUFjLFNBQVMsU0FBUztBQUN0QyxVQUFNLGFBQWEsYUFBYSxLQUFLLEdBQUcsS0FBSztBQUM3QyxVQUFNLGFBQWEsZ0JBQWdCLEtBQUs7QUFDeEMsVUFBTSxVQUFVLEtBQUssV0FBVyxDQUFDO0FBRWpDLFVBQU0sWUFBWSxLQUFLLFdBQVc7QUFDbEMsVUFBTSxlQUFlLEtBQUssV0FBVztBQUNyQyxVQUFNLGdCQUFnQixLQUFLLFdBQVc7QUFDdEMsVUFBTSxnQkFBZ0IsS0FBSyxXQUFXO0FBQ3RDLFVBQU0sY0FBYyxLQUFLLFdBQVc7QUFFcEMsV0FDRSx1QkFBQyxTQUFtQixXQUFVLGFBRTVCO0FBQUE7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLFNBQVMsTUFBTSxlQUFlLEtBQUssR0FBRztBQUFBLFVBQ3RDLFdBQVcscUlBQ1QsYUFDSSxnR0FDQSxLQUFLLFdBQVcsS0FBSyxZQUNyQix5REFDQSxLQUFLLGtCQUNMLCtEQUNBLHlEQUNOO0FBQUEsVUFDQSxPQUFPLEVBQUUsWUFBWSxHQUFHLEtBQUssSUFBSSxRQUFRLElBQUksR0FBRyxDQUFDLEtBQUs7QUFBQSxVQUV0RDtBQUFBLG1DQUFDLFNBQUksV0FBVSx1Q0FFWjtBQUFBLDZCQUFlLFFBQVEsU0FBUyxJQUMvQjtBQUFBLGdCQUFDO0FBQUE7QUFBQSxrQkFDQyxNQUFLO0FBQUEsa0JBQ0wsU0FBUyxDQUFDLE1BQU07QUFDZCxzQkFBRSxnQkFBZ0I7QUFDbEIsaUNBQWEsS0FBSyxHQUFHO0FBQUEsa0JBQ3ZCO0FBQUEsa0JBQ0EsV0FBVTtBQUFBLGtCQUVULHVCQUFhLHVCQUFDLGVBQVksV0FBVSxpQkFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFBcUMsSUFBSyx1QkFBQyxnQkFBYSxXQUFVLGlCQUF4QjtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUFzQztBQUFBO0FBQUEsZ0JBUmhHO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxjQVNBLElBRUEsdUJBQUMsU0FBSSxXQUFVLDJEQUNiLGlDQUFDLG1CQUFnQixXQUFVLGlCQUEzQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUF5QyxLQUQzQztBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUVBO0FBQUEsY0FJRix1QkFBQyxTQUNFLDBCQUNDLHVCQUFDLFNBQUksV0FBVSx3R0FDYixpQ0FBQyxTQUFNLFdBQVUsaUJBQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQStCLEtBRGpDO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBRUEsSUFDRSxnQkFDRix1QkFBQyxTQUFJLFdBQVUsOEdBQ2IsaUNBQUMsUUFBSyxXQUFVLGlCQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUE4QixLQURoQztBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUVBLElBQ0UsZUFDRix1QkFBQyxTQUFJLFdBQVUsMkdBQ2IsaUNBQUMsT0FBSSxXQUFVLGlCQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQTZCLEtBRC9CO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBRUEsSUFDRSxLQUFLLFdBQVcsS0FBSyxZQUN2Qix1QkFBQyxTQUFJLFdBQVUsc0hBQ2IsaUNBQUMsZUFBWSxXQUFVLGlCQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUFxQyxLQUR2QztBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUVBLElBQ0UsS0FBSyxrQkFDUCx1QkFBQyxTQUFJLFdBQVUsOEdBQ2IsaUNBQUMsaUJBQWMsV0FBVSxpQkFBekI7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBdUMsS0FEekM7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFFQSxJQUVBLHVCQUFDLFNBQUksV0FBVSx1SEFDYixpQ0FBQyxZQUFTLFdBQVUsaUJBQXBCO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQWtDLEtBRHBDO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBRUEsS0F4Qko7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkEwQkE7QUFBQSxjQUdBLHVCQUFDLFNBQUksV0FBVSxZQUNiO0FBQUEsdUNBQUMsU0FBSSxXQUFVLCtCQUNiO0FBQUEseUNBQUMsVUFBSyxXQUFXLCtCQUErQixlQUFlLGdDQUFnQyxZQUFZLElBQ3hHLGVBQUssUUFEUjtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUVBO0FBQUEsa0JBQ0EsdUJBQUMsVUFBSyxXQUFVLG1HQUFrRztBQUFBO0FBQUEsb0JBQzNHLHVCQUFDLFlBQU8sV0FBVSxrQkFBa0IsZUFBSyxPQUF6QztBQUFBO0FBQUE7QUFBQTtBQUFBLDJCQUE2QztBQUFBLG9CQUFTO0FBQUEsb0JBQUUsS0FBSyxPQUFPLFVBQVUsS0FBSyxJQUFJLE1BQU07QUFBQSx1QkFEcEc7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFFQTtBQUFBLGtCQUdDLEtBQUssbUJBQ0osdUJBQUMsVUFBSyxXQUFVLDRHQUEyRyxpQ0FBM0g7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFFQTtBQUFBLGtCQUVELEtBQUssV0FDSix1QkFBQyxVQUFLLFdBQVUsc0dBQXFHLCtCQUFySDtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUVBO0FBQUEsa0JBRUQsS0FBSyxhQUNKLHVCQUFDLFVBQUssV0FBVSwrRkFBOEYsNkJBQTlHO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBRUE7QUFBQSxxQkF0Qko7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkF3QkE7QUFBQSxnQkFDQSx1QkFBQyxTQUFJLFdBQVUsOENBQ1osZUFBSyxlQUFlLEtBQUssWUFENUI7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFFQTtBQUFBLG1CQTVCRjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQTZCQTtBQUFBLGlCQTlFRjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQStFQTtBQUFBLFlBR0EsdUJBQUMsU0FBSSxXQUFVLHlEQUNiO0FBQUE7QUFBQSxnQkFBQztBQUFBO0FBQUEsa0JBQ0MsV0FBVywyREFDVCxnQkFDSSxxREFDQSxnQkFDQSwyREFDQSxlQUNBLGdDQUNBLGNBQ0EscURBQ0EsS0FBSyxZQUNMLGtEQUNBLDJEQUNOO0FBQUEsa0JBRUMsMEJBQ0csa0JBQ0EsZ0JBQ0EsZ0JBQ0EsZUFDQSxXQUNBLGNBQ0EsY0FDQSxLQUFLLFlBQ0wsb0JBQ0E7QUFBQTtBQUFBLGdCQXpCTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsY0EwQkE7QUFBQSxjQUVDLGFBQ0MsdUJBQUMsU0FBSSxXQUFVLCtCQUNYO0FBQUEsZ0NBQWUsS0FBSyxvQkFDcEI7QUFBQSxrQkFBQztBQUFBO0FBQUEsb0JBQ0MsTUFBSztBQUFBLG9CQUNMLFNBQVMsQ0FBQyxNQUFNO0FBQ2Qsd0JBQUUsZ0JBQWdCO0FBQ2xCLHdDQUFrQixLQUFLLEdBQUc7QUFBQSxvQkFDNUI7QUFBQSxvQkFDQSxPQUFNO0FBQUEsb0JBQ04sV0FBVTtBQUFBLG9CQUVWO0FBQUEsNkNBQUMsV0FBUSxXQUFVLDBCQUFuQjtBQUFBO0FBQUE7QUFBQTtBQUFBLDZCQUEwQztBQUFBLHNCQUMxQyx1QkFBQyxVQUFLLDRCQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEsNkJBQWtCO0FBQUE7QUFBQTtBQUFBLGtCQVZwQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBV0E7QUFBQSxnQkFHRjtBQUFBLGtCQUFDO0FBQUE7QUFBQSxvQkFDQyxNQUFLO0FBQUEsb0JBQ0wsU0FBUyxDQUFDLE1BQU07QUFDZCx3QkFBRSxnQkFBZ0I7QUFDbEIsb0NBQWMsS0FBSyxHQUFHO0FBQUEsb0JBQ3hCO0FBQUEsb0JBQ0EsT0FBTTtBQUFBLG9CQUNOLFdBQVU7QUFBQSxvQkFDWDtBQUFBO0FBQUEsa0JBUkQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGdCQVVBO0FBQUEsbUJBMUJGO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBMkJBO0FBQUEsaUJBekRKO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBMkRBO0FBQUE7QUFBQTtBQUFBLFFBMUpGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQTJKQTtBQUFBLE1BR0MsY0FBYyxRQUFRLFNBQVMsS0FDOUIsdUJBQUMsU0FBSSxXQUFVLGFBQVksT0FBTyxFQUFFLFlBQVksR0FBRyxLQUFLLEtBQUssUUFBUSxLQUFLLElBQUksR0FBRyxDQUFDLEtBQUssR0FDcEYsa0JBQVEsSUFBSSxDQUFDLFFBQ1o7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUVDLFdBQVcsaUZBQ1QsSUFBSSxZQUNBLGlEQUNBLGlEQUNOO0FBQUEsVUFFQTtBQUFBLG1DQUFDLFNBQUksV0FBVSx3Q0FDYjtBQUFBLHFDQUFDLFVBQUssV0FBVSxxR0FBb0csa0JBQXBIO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBRUE7QUFBQSxjQUNBLHVCQUFDLFVBQUssV0FBVSxxQ0FBb0M7QUFBQTtBQUFBLGdCQUM1Qyx1QkFBQyxZQUFPLFdBQVUsbUJBQW1CLGNBQUksUUFBekM7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBOEM7QUFBQSxnQkFBUztBQUFBLGdCQUFLLElBQUk7QUFBQSxnQkFBTTtBQUFBLG1CQUQ5RTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUVBO0FBQUEsaUJBTkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFPQTtBQUFBLFlBRUEsdUJBQUMsU0FBSSxXQUFVLCtDQUNiO0FBQUEscUNBQUMsVUFBSyxXQUFVLHdGQUF1RjtBQUFBO0FBQUEsZ0JBQzdGLElBQUk7QUFBQSxtQkFEZDtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUVBO0FBQUEsY0FDQyxJQUFJLGFBQ0gsdUJBQUMsVUFBSyxXQUFVLCtGQUE4Riw2QkFBOUc7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFFQTtBQUFBLGNBRUQsSUFBSSxnQkFDSCx1QkFBQyxVQUFLLFdBQVUsd0ZBQXVGO0FBQUE7QUFBQSxnQkFDeEYsSUFBSSxPQUFPO0FBQUEsZ0JBQU07QUFBQSxnQkFBRSxJQUFJLE9BQU87QUFBQSxnQkFBTztBQUFBLG1CQURwRDtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUVBO0FBQUEsaUJBWko7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFjQTtBQUFBO0FBQUE7QUFBQSxRQTlCSyxJQUFJO0FBQUEsUUFEWDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BZ0NBLENBQ0QsS0FuQ0g7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQW9DQTtBQUFBLE1BSUQsY0FBYyxlQUNiLHVCQUFDLFNBQUksV0FBVSxhQUNaLG1CQUFTLElBQUksQ0FBQyxVQUFVLGVBQWUsT0FBTyxRQUFRLENBQUMsQ0FBQyxLQUQzRDtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBRUE7QUFBQSxTQTVNTSxLQUFLLEtBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQThNQTtBQUFBLEVBRUo7QUFFQSxTQUNFLHVCQUFDLFNBQUksV0FBVSxhQUViO0FBQUEsMkJBQUMsU0FBSSxXQUFVLHVNQUNiO0FBQUEsNkJBQUMsU0FBSSxXQUFVLDhCQUNiO0FBQUEsK0JBQUMsU0FBSSxXQUFVLGlGQUNiLGlDQUFDLFdBQVEsV0FBVSxhQUFuQjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQTZCLEtBRC9CO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFFQTtBQUFBLFFBQ0EsdUJBQUMsU0FDQztBQUFBLGlDQUFDLFFBQUcsV0FBVSx3REFDWjtBQUFBLG1DQUFDLFVBQUssMEZBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBZ0Y7QUFBQSxZQUNoRix1QkFBQyxVQUFLLFdBQVUsb0dBQW1HLGdDQUFuSDtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUVBO0FBQUEsZUFKRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUtBO0FBQUEsVUFDQSx1QkFBQyxPQUFFLFdBQVUsMkNBQTBDO0FBQUE7QUFBQSxZQUN3Qix1QkFBQyxRQUFHLGtDQUFKO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQXNCO0FBQUEsWUFBSztBQUFBLGVBRDFHO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBRUE7QUFBQSxhQVRGO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFVQTtBQUFBLFdBZEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQWVBO0FBQUEsTUFFQyxtQkFDQyx1QkFBQyxTQUFJLFdBQVUseUNBQ2I7QUFBQTtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsU0FBUyxNQUFNLGtCQUFrQixnQkFBZ0IsUUFBUSxnQkFBZ0IsR0FBRztBQUFBLFlBQzVFLFdBQVU7QUFBQSxZQUNWLE9BQU07QUFBQSxZQUVOO0FBQUEscUNBQUMsU0FBTSxXQUFVLGlCQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUErQjtBQUFBLGNBQy9CLHVCQUFDLFVBQUsscUNBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBMkI7QUFBQTtBQUFBO0FBQUEsVUFON0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBT0E7QUFBQSxRQUVBO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFDQyxTQUFTLE1BQU0sZUFBZSxnQkFBZ0IsUUFBUSxnQkFBZ0IsR0FBRztBQUFBLFlBQ3pFLFdBQVU7QUFBQSxZQUNWLE9BQU07QUFBQSxZQUVOO0FBQUEscUNBQUMsU0FBTSxXQUFVLCtCQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUE2QztBQUFBLGNBQzdDLHVCQUFDLFVBQUssaUNBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBdUI7QUFBQTtBQUFBO0FBQUEsVUFOekI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBT0E7QUFBQSxXQWpCRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBa0JBO0FBQUEsU0FyQ0o7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQXVDQTtBQUFBLElBR0EsdUJBQUMsU0FBSSxXQUFVLDBDQUViO0FBQUEsNkJBQUMsU0FBSSxXQUFVLCtFQUNiO0FBQUEsK0JBQUMsU0FBSSxXQUFVLDRFQUNiO0FBQUEsaUNBQUMsVUFBSyxXQUFVLDBEQUNkO0FBQUEsbUNBQUMsY0FBVyxXQUFVLDZCQUF0QjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUFnRDtBQUFBLFlBQ2hELHVCQUFDLFVBQUssNERBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBa0Q7QUFBQSxlQUZwRDtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUdBO0FBQUEsVUFDQSx1QkFBQyxVQUFLLFdBQVUsd0NBQXVDO0FBQUE7QUFBQSxZQUM1QyxVQUFVO0FBQUEsWUFBTztBQUFBLGVBRDVCO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBRUE7QUFBQSxhQVBGO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFRQTtBQUFBLFFBR0EsdUJBQUMsU0FBSSxXQUFVLDJGQUNaLHdCQUFjLElBQUksQ0FBQyxTQUFTLGVBQWUsTUFBTSxDQUFDLENBQUMsS0FEdEQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUVBO0FBQUEsUUFFQSx1QkFBQyxTQUFJLFdBQVUseUdBQ2I7QUFBQSxpQ0FBQyxVQUFLLFdBQVUsMkJBQ2Q7QUFBQSxtQ0FBQyxVQUFLLFdBQVUsdUNBQWhCO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQW9EO0FBQUEsWUFBTztBQUFBLGVBRDdEO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBRUE7QUFBQSxVQUNBLHVCQUFDLFVBQUssV0FBVSwyQkFDZDtBQUFBLG1DQUFDLFVBQUssV0FBVSxxQ0FBaEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBa0Q7QUFBQSxZQUFPO0FBQUEsZUFEM0Q7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFFQTtBQUFBLFVBQ0EsdUJBQUMsVUFBSyxXQUFVLDJCQUNkO0FBQUEsbUNBQUMsVUFBSyxXQUFVLHdDQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUFxRDtBQUFBLFlBQU87QUFBQSxlQUQ5RDtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUVBO0FBQUEsYUFURjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBVUE7QUFBQSxXQTFCRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBMkJBO0FBQUEsTUFHQSx1QkFBQyxTQUFJLFdBQVUsZ0hBQ2I7QUFBQSwrQkFBQyxTQUFJLFdBQVUsYUFDYjtBQUFBLGlDQUFDLFNBQUksV0FBVSw0RUFDYjtBQUFBLG1DQUFDLFVBQUssV0FBVSxzREFDZDtBQUFBLHFDQUFDLFdBQVEsV0FBVSwyQkFBbkI7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBMkM7QUFBQSxjQUMzQyx1QkFBQyxVQUFLLGdEQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQXNDO0FBQUEsaUJBRnhDO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBR0E7QUFBQSxZQUNDLG1CQUNDLHVCQUFDLFVBQUssV0FBVSxpR0FBZ0c7QUFBQTtBQUFBLGNBQ3hHLGdCQUFnQjtBQUFBLGlCQUR4QjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUVBO0FBQUEsZUFSSjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQVVBO0FBQUEsVUFFQyxrQkFDQyx1QkFBQyxTQUFJLFdBQVUscUJBRWI7QUFBQSxtQ0FBQyxTQUFJLFdBQVUsaUVBQ2I7QUFBQSxxQ0FBQyxVQUFLLFdBQVUsdUVBQXNFLHlEQUF0RjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUVBO0FBQUEsY0FFQSx1QkFBQyxTQUFJLFdBQVUsZUFDWix1QkFBYSxJQUFJLENBQUMsR0FBRyxRQUNwQix1QkFBQyxTQUFnQixXQUFVLHFEQUN6QjtBQUFBLHVDQUFDLFVBQUssV0FBVSwwR0FDYixnQkFBTSxLQURUO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBRUE7QUFBQSxnQkFDQSx1QkFBQyxTQUFJLFdBQVcsaUVBQ2QsRUFBRSxRQUFRLGdCQUFnQixNQUN0Qix1REFDQSxFQUFFLGtCQUNGLG9EQUNBLDhDQUNOLElBQ0U7QUFBQSx5Q0FBQyxVQUFLLFdBQVUsc0JBQXNCLFlBQUUsUUFBeEM7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFBNkM7QUFBQSxrQkFDN0MsdUJBQUMsVUFBSyxXQUFVLDBDQUF5QztBQUFBO0FBQUEsb0JBQUssRUFBRTtBQUFBLHVCQUFoRTtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUFvRTtBQUFBLHFCQVJ0RTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQVNBO0FBQUEsbUJBYlEsRUFBRSxLQUFaO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBY0EsQ0FDRCxLQWpCSDtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQWtCQTtBQUFBLGlCQXZCRjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQXdCQTtBQUFBLFlBR0EsdUJBQUMsU0FBSSxXQUFXLHFDQUNkLGtCQUNJLGlEQUNBLDhDQUNOLElBQ0U7QUFBQSxxQ0FBQyxTQUFJLFdBQVUsK0NBQ2I7QUFBQSx1Q0FBQyxVQUFLLFdBQVUsNkJBQ2I7QUFBQSxvQ0FBa0IsdUJBQUMsaUJBQWMsV0FBVSwwQkFBekI7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFBZ0QsSUFBSyx1QkFBQyxlQUFZLFdBQVUsOEJBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBQWtEO0FBQUEsa0JBQzFILHVCQUFDLFVBQU0sNEJBQWtCLG1DQUFtQyxrQ0FBNUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFBMkY7QUFBQSxxQkFGN0Y7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFHQTtBQUFBLGdCQUNBLHVCQUFDLFVBQUssV0FBVSx5QkFBeUIsMEJBQWdCLE9BQU8sWUFBWSxLQUE1RTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUE4RTtBQUFBLG1CQUxoRjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQU1BO0FBQUEsY0FFQSx1QkFBQyxPQUFFLFdBQVUsOENBQ1YsNkJBQW1CLG1CQUNsQixtQ0FBRTtBQUFBO0FBQUEsZ0JBQ08sdUJBQUMsWUFBTyxXQUFVLHdCQUF3QiwwQkFBZ0IsUUFBMUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBK0Q7QUFBQSxnQkFBUztBQUFBLGdCQUErQix1QkFBQyxZQUFPLFdBQVUsNEJBQTRCLDJCQUFpQixRQUEvRDtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUFvRTtBQUFBLGdCQUFTO0FBQUEsZ0JBQVEsaUJBQWlCO0FBQUEsZ0JBQUk7QUFBQSxtQkFEMU47QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFFQSxJQUVBLG1DQUFFO0FBQUE7QUFBQSxnQkFDZSx1QkFBQyxVQUFLLFdBQVUsa0RBQWtELDBCQUFnQixZQUFsRjtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUEyRjtBQUFBLG1CQUQ1RztBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUVBLEtBUko7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFVQTtBQUFBLGlCQXZCRjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQXdCQTtBQUFBLFlBR0EsdUJBQUMsU0FBSSxXQUFVLHdHQUNiO0FBQUEscUNBQUMsU0FBSSxXQUFVLHlEQUNiO0FBQUEsdUNBQUMsVUFBSyxXQUFVLGtCQUFpQiwyQkFBakM7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBNEM7QUFBQSxnQkFDNUMsdUJBQUMsVUFBSyxXQUFVLG1EQUFtRCwwQkFBZ0IsZUFBZSxlQUFsRztBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUE4RztBQUFBLG1CQUZoSDtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUdBO0FBQUEsY0FDQSx1QkFBQyxTQUFJLFdBQVUseURBQ2I7QUFBQSx1Q0FBQyxVQUFLLFdBQVUsa0JBQWlCLGtDQUFqQztBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUFtRDtBQUFBLGdCQUNuRCx1QkFBQyxVQUFLLFdBQVUsNEJBQTRCLDBCQUFnQixRQUFRLHdCQUFwRTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUF5RjtBQUFBLG1CQUYzRjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUdBO0FBQUEsY0FDQSx1QkFBQyxTQUFJLFdBQVUseURBQ2I7QUFBQSx1Q0FBQyxVQUFLLFdBQVUsa0JBQWlCLDhCQUFqQztBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUErQztBQUFBLGdCQUMvQyx1QkFBQyxVQUFLLFdBQVcsZ0JBQWdCLGdCQUFnQiwyQkFBMkIsa0JBQ3pFLDBCQUFnQixnQkFBZ0Isa0NBQWtDLFVBRHJFO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBRUE7QUFBQSxtQkFKRjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUtBO0FBQUEsY0FDQSx1QkFBQyxTQUFJLFdBQVUsK0JBQ2I7QUFBQSx1Q0FBQyxVQUFLLFdBQVUsa0JBQWlCLGdDQUFqQztBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUFpRDtBQUFBLGdCQUNqRCx1QkFBQyxVQUFLLFdBQVcsZ0JBQWdCLFlBQVksNEJBQTRCLG9CQUN0RSwwQkFBZ0IsWUFBWSx1QkFBdUIsY0FEdEQ7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFFQTtBQUFBLG1CQUpGO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBS0E7QUFBQSxpQkFwQkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFxQkE7QUFBQSxlQTdFRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQThFQSxJQUVBLHVCQUFDLFNBQUksV0FBVSw4Q0FDYjtBQUFBLG1DQUFDLFdBQVEsV0FBVSxnQ0FBbkI7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBZ0Q7QUFBQSxZQUNoRCx1QkFBQyxPQUFFLFdBQVUsV0FBVSwyR0FBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBa0g7QUFBQSxlQUZwSDtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUdBO0FBQUEsYUFqR0o7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQW1HQTtBQUFBLFFBR0MsbUJBQ0MsdUJBQUMsU0FBSSxXQUFVLDBFQUNiO0FBQUE7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLFNBQVMsTUFBTSxjQUFjLGdCQUFnQixRQUFRLGdCQUFnQixHQUFHO0FBQUEsY0FDeEUsV0FBVTtBQUFBLGNBQ1YsT0FBTTtBQUFBLGNBRU47QUFBQSx1Q0FBQyxRQUFLLFdBQVUsMkJBQWhCO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQXdDO0FBQUEsZ0JBQ3hDLHVCQUFDLFVBQUssNkJBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBbUI7QUFBQTtBQUFBO0FBQUEsWUFOckI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBT0E7QUFBQSxVQUVBO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FDQyxTQUFTLE1BQU0sa0JBQWtCLGdCQUFnQixRQUFRLGdCQUFnQixHQUFHO0FBQUEsY0FDNUUsV0FBVTtBQUFBLGNBQ1YsT0FBTTtBQUFBLGNBRU47QUFBQSx1Q0FBQyxPQUFJLFdBQVUsYUFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUF5QjtBQUFBLGdCQUN6Qix1QkFBQyxVQUFLLDhCQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQW9CO0FBQUE7QUFBQTtBQUFBLFlBTnRCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQU9BO0FBQUEsYUFqQkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQWtCQTtBQUFBLFdBMUhKO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUE0SEE7QUFBQSxTQTVKRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBNkpBO0FBQUEsT0F6TUY7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQTBNQTtBQUVKOyIsIm5hbWVzIjpbXX0=