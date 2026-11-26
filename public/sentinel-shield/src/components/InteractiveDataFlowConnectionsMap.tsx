import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"]; const useRef = __vite__cjsImport1_react["useRef"]; const useMemo = __vite__cjsImport1_react["useMemo"];
import {
  Radio,
  Zap,
  ShieldCheck,
  Skull,
  Cpu,
  Globe,
  CreditCard,
  MessageSquare,
  HardDrive,
  Wifi,
  RefreshCw,
  Activity,
  Play,
  Pause,
  Filter,
  Sliders,
  Scissors
} from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import {
  dataFlowMatrixEngine
} from "/sentinel-shield/src/utils/dataFlowMatrixEngine.ts";
export const InteractiveDataFlowConnectionsMap = ({
  onNotify,
  isCompact = false
}) => {
  const [nodes, setNodes] = useState(() => dataFlowMatrixEngine.getNodes());
  const [links, setLinks] = useState(() => dataFlowMatrixEngine.getLinks());
  const [selectedNodeId, setSelectedNodeId] = useState("node-sentinel-core");
  const [selectedLinkId, setSelectedLinkId] = useState(null);
  const [filterProtocol, setFilterProtocol] = useState("ALL");
  const [minAggressionFilter, setMinAggressionFilter] = useState(0);
  const [isAnimationActive, setIsAnimationActive] = useState(true);
  const [draggedNodeId, setDraggedNodeId] = useState(null);
  const svgRef = useRef(null);
  useEffect(() => {
    const unsub = dataFlowMatrixEngine.subscribe((newNodes, newLinks) => {
      setNodes(newNodes);
      setLinks(newLinks);
    });
    return () => unsub();
  }, []);
  const totalGnidasOnMatrix = useMemo(() => {
    return links.reduce((acc, l) => acc + l.gnidasDetected, 0);
  }, [links]);
  const totalPurgedOnMatrix = useMemo(() => {
    return links.reduce((acc, l) => acc + l.gnidasPurged, 0);
  }, [links]);
  const selectedNode = useMemo(() => {
    return nodes.find((n) => n.id === selectedNodeId) || null;
  }, [nodes, selectedNodeId]);
  const selectedLink = useMemo(() => {
    return links.find((l) => l.id === selectedLinkId) || null;
  }, [links, selectedLinkId]);
  const filteredLinks = useMemo(() => {
    return links.filter((l) => {
      if (filterProtocol !== "ALL" && l.protocol !== filterProtocol) return false;
      if (l.aggressionScore < minAggressionFilter) return false;
      return true;
    });
  }, [links, filterProtocol, minAggressionFilter]);
  const getAggressionColor = (aggression) => {
    if (aggression === 0) {
      return {
        stroke: "#10b981",
        // emerald
        fill: "rgba(16, 185, 129, 0.15)",
        glow: "rgba(16, 185, 129, 0.7)",
        text: "text-emerald-400",
        label: "CZYSTY / SECURE (0%)"
      };
    } else if (aggression < 50) {
      return {
        stroke: "#facc15",
        // yellow
        fill: "rgba(250, 204, 21, 0.15)",
        glow: "rgba(250, 204, 21, 0.7)",
        text: "text-yellow-400",
        label: `OSTRZEGAWCZY (${aggression}%)`
      };
    } else if (aggression < 80) {
      return {
        stroke: "#f97316",
        // orange
        fill: "rgba(249, 115, 22, 0.2)",
        glow: "rgba(249, 115, 22, 0.8)",
        text: "text-orange-400",
        label: `WYSOKA AGRESJA (${aggression}%)`
      };
    } else {
      return {
        stroke: "#ef4444",
        // red
        fill: "rgba(239, 68, 68, 0.25)",
        glow: "rgba(239, 68, 68, 0.95)",
        text: "text-rose-500",
        label: `KRYTYCZNA / EKSTREMALNA (${aggression}%)`
      };
    }
  };
  const renderNodeIcon = (iconName, className = "w-4 h-4") => {
    switch (iconName) {
      case "ShieldCheck":
        return /* @__PURE__ */ jsxDEV(ShieldCheck, { className }, void 0, false, {
          fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
          lineNumber: 106,
          columnNumber: 34
        }, this);
      case "Cpu":
        return /* @__PURE__ */ jsxDEV(Cpu, { className }, void 0, false, {
          fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
          lineNumber: 107,
          columnNumber: 26
        }, this);
      case "Radio":
        return /* @__PURE__ */ jsxDEV(Radio, { className }, void 0, false, {
          fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
          lineNumber: 108,
          columnNumber: 28
        }, this);
      case "Globe":
        return /* @__PURE__ */ jsxDEV(Globe, { className }, void 0, false, {
          fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
          lineNumber: 109,
          columnNumber: 28
        }, this);
      case "CreditCard":
        return /* @__PURE__ */ jsxDEV(CreditCard, { className }, void 0, false, {
          fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
          lineNumber: 110,
          columnNumber: 33
        }, this);
      case "MessageSquare":
        return /* @__PURE__ */ jsxDEV(MessageSquare, { className }, void 0, false, {
          fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
          lineNumber: 111,
          columnNumber: 36
        }, this);
      case "Skull":
        return /* @__PURE__ */ jsxDEV(Skull, { className }, void 0, false, {
          fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
          lineNumber: 112,
          columnNumber: 28
        }, this);
      case "Wifi":
        return /* @__PURE__ */ jsxDEV(Wifi, { className }, void 0, false, {
          fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
          lineNumber: 113,
          columnNumber: 27
        }, this);
      case "HardDrive":
        return /* @__PURE__ */ jsxDEV(HardDrive, { className }, void 0, false, {
          fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
          lineNumber: 114,
          columnNumber: 32
        }, this);
      default:
        return /* @__PURE__ */ jsxDEV(Activity, { className }, void 0, false, {
          fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
          lineNumber: 115,
          columnNumber: 23
        }, this);
    }
  };
  const handleMouseDownNode = (id, e) => {
    e.stopPropagation();
    setDraggedNodeId(id);
    setSelectedNodeId(id);
    setSelectedLinkId(null);
  };
  const handleMouseMoveCanvas = (e) => {
    if (!draggedNodeId || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = Math.max(40, Math.min(rect.width - 40, e.clientX - rect.left));
    const y = Math.max(40, Math.min(rect.height - 40, e.clientY - rect.top));
    setNodes((prev) => prev.map((n) => {
      if (n.id === draggedNodeId) {
        return { ...n, x, y };
      }
      return n;
    }));
  };
  const handleMouseUpCanvas = () => {
    setDraggedNodeId(null);
  };
  const handlePurgeSelectedLink = () => {
    if (!selectedLinkId) return;
    dataFlowMatrixEngine.purgeLink(selectedLinkId);
    if (onNotify) onNotify(`⚡ Wypalono złącze promieniem laserowym! Wyczyszczono gnidy.`);
  };
  const handleSeverSelectedLink = () => {
    if (!selectedLinkId) return;
    dataFlowMatrixEngine.severLink(selectedLinkId);
    if (onNotify) onNotify(`✂️ Odcięto niebezpieczne złącze komunikacyjne (Reverse Tunnel Severed)!`);
  };
  const handleDisinfectSelectedNode = () => {
    if (!selectedNodeId) return;
    dataFlowMatrixEngine.disinfectNode(selectedNodeId);
    if (onNotify) onNotify(`🛡️ Oczyszczono węzeł procesu i wszystkie przylegające magistrale!`);
  };
  const handlePurgeEntireNetwork = () => {
    dataFlowMatrixEngine.purgeEntireDataFlow();
    if (onNotify) onNotify(`👑 NATYCHMIASTOWA EKSTERMINACJA: Wszystkie 9 węzłów i złączy oczyszczone z gnid!`);
  };
  const handleReset = () => {
    dataFlowMatrixEngine.resetToInitialState();
    if (onNotify) onNotify(`🔄 Zresetowano topologię połączeń procesów do stanu bazowego.`);
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "w-full rounded-3xl bg-slate-950/95 backdrop-blur-md border border-cyan-500/50 shadow-2xl p-4 sm:p-6 text-white space-y-5", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-slate-800", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3.5", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/30 shrink-0", children: /* @__PURE__ */ jsxDEV(Radio, { className: "w-6 h-6 text-cyan-300 animate-pulse" }, void 0, false, {
          fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
          lineNumber: 182,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
          lineNumber: 181,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxDEV("h2", { className: "text-base sm:text-lg font-black font-mono tracking-tight text-white uppercase flex items-center gap-2", children: /* @__PURE__ */ jsxDEV("span", { children: "Interaktywna Mapa Połączeń Aplikacji & Data Flow" }, void 0, false, {
              fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
              lineNumber: 187,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
              lineNumber: 186,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: `px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black border ${totalGnidasOnMatrix === 0 ? "bg-emerald-950 border-emerald-400 text-emerald-300 shadow-[0_0_10px_#10b981]" : "bg-rose-950 border-rose-500 text-rose-300 animate-pulse"}`, children: totalGnidasOnMatrix === 0 ? "👑 100% MAGISTRAL CZYSTYCH" : `⚠️ ${totalGnidasOnMatrix} AKTYWNYCH GNID` }, void 0, false, {
              fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
              lineNumber: 189,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
            lineNumber: 185,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-300 font-mono mt-0.5", children: "Wizualizacja przepływu danych w czasie rzeczywistym między procesami (Kernel, IPC, Web, Bank, Adware, C2). Kolory węzłów obrazują stopień agresji gnid." }, void 0, false, {
            fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
            lineNumber: 197,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
          lineNumber: 184,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
        lineNumber: 180,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap w-full lg:w-auto justify-end", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handlePurgeEntireNetwork,
            className: "flex-1 lg:flex-none px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-mono font-black text-xs flex items-center justify-center gap-1.5 shadow-xl border border-white cursor-pointer active:scale-95 transition-all",
            title: "Wypal wszystkie gnidy na wszystkich 9 węzłach i łączach",
            children: [
              /* @__PURE__ */ jsxDEV(Zap, { className: "w-3.5 h-3.5 fill-black" }, void 0, false, {
                fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                lineNumber: 210,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "WYPAL WSZYSTKIE GNIDY (0 MS)" }, void 0, false, {
                fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                lineNumber: 211,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
            lineNumber: 205,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setIsAnimationActive(!isAnimationActive),
            className: "px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono font-bold flex items-center gap-1 cursor-pointer transition-all",
            title: "Zatrzymaj / Wznów animację pakietów",
            children: [
              isAnimationActive ? /* @__PURE__ */ jsxDEV(Pause, { className: "w-3.5 h-3.5 text-yellow-400" }, void 0, false, {
                fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                lineNumber: 219,
                columnNumber: 34
              }, this) : /* @__PURE__ */ jsxDEV(Play, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                lineNumber: 219,
                columnNumber: 86
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: isAnimationActive ? "Pauza Pakietów" : "Wznów Ruch" }, void 0, false, {
                fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                lineNumber: 220,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
            lineNumber: 214,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleReset,
            className: "p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white cursor-pointer",
            title: "Resetuj topologię mapy",
            children: /* @__PURE__ */ jsxDEV(RefreshCw, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
              lineNumber: 228,
              columnNumber: 13
            }, this)
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
            lineNumber: 223,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
        lineNumber: 204,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
      lineNumber: 179,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-3 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs font-mono", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "md:col-span-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV(Filter, { className: "w-4 h-4 text-cyan-400 shrink-0" }, void 0, false, {
          fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
          lineNumber: 237,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 text-[11px]", children: "Protokół Złącza:" }, void 0, false, {
          fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
          lineNumber: 238,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(
          "select",
          {
            value: filterProtocol,
            onChange: (e) => setFilterProtocol(e.target.value),
            className: "flex-1 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-cyan-300 text-xs font-mono focus:outline-none focus:border-cyan-400",
            children: [
              /* @__PURE__ */ jsxDEV("option", { value: "ALL", children: [
                "Wszystkie Protokoły (",
                links.length,
                ")"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                lineNumber: 244,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "BINDER_IPC", children: "Binder IPC (/dev/binder)" }, void 0, false, {
                fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                lineNumber: 245,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "TCP_SOCKET", children: "Gniazda TCP / C2" }, void 0, false, {
                fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                lineNumber: 246,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "UNIX_SOCKET", children: "Unix Domain Sockets" }, void 0, false, {
                fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                lineNumber: 247,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "SHARED_MEM", children: "Pamięć Ashmem" }, void 0, false, {
                fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                lineNumber: 248,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "CONTENT_PROVIDER", children: "Content Provider" }, void 0, false, {
                fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                lineNumber: 249,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
            lineNumber: 239,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
        lineNumber: 236,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "md:col-span-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV(Sliders, { className: "w-4 h-4 text-orange-400 shrink-0" }, void 0, false, {
          fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
          lineNumber: 255,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 text-[11px]", children: "Min. Agresja:" }, void 0, false, {
          fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
          lineNumber: 256,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(
          "input",
          {
            type: "range",
            min: "0",
            max: "90",
            step: "10",
            value: minAggressionFilter,
            onChange: (e) => setMinAggressionFilter(Number(e.target.value)),
            className: "flex-1 accent-orange-500 cursor-pointer"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
            lineNumber: 257,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV("span", { className: "text-orange-400 font-bold w-10 text-right", children: [
          minAggressionFilter,
          "%+"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
          lineNumber: 266,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
        lineNumber: 254,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "md:col-span-4 flex items-center justify-end gap-2 flex-wrap text-[10px]", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]" }, void 0, false, {
            fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
            lineNumber: 271,
            columnNumber: 53
          }, this),
          " 0% Czyste"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
          lineNumber: 271,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "w-2.5 h-2.5 rounded-full bg-yellow-400 shadow-[0_0_6px_#facc15]" }, void 0, false, {
            fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
            lineNumber: 272,
            columnNumber: 53
          }, this),
          " 1-50% Średnia"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
          lineNumber: 272,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_6px_#f97316]" }, void 0, false, {
            fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
            lineNumber: 273,
            columnNumber: 53
          }, this),
          " 51-79% Wysoka"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
          lineNumber: 273,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_6px_#ef4444]" }, void 0, false, {
            fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
            lineNumber: 274,
            columnNumber: 53
          }, this),
          " 80%+ Gnida"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
          lineNumber: 274,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
        lineNumber: 270,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
      lineNumber: 234,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-5", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-8 relative rounded-3xl bg-slate-950 border-2 border-slate-800 overflow-hidden shadow-inner flex flex-col justify-between", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none text-[10px] font-mono text-slate-400", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "bg-slate-900/90 border border-slate-800 px-2.5 py-1 rounded-xl text-cyan-300 pointer-events-auto", children: "🖱️ Przeciągaj węzły myszką • Kliknij węzeł lub złącze, aby zbadać" }, void 0, false, {
            fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
            lineNumber: 286,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "bg-slate-900/90 border border-slate-800 px-2.5 py-1 rounded-xl text-emerald-400 pointer-events-auto", children: [
            "Aktywnych Złączy: ",
            filteredLinks.length,
            " / ",
            links.length
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
            lineNumber: 289,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
          lineNumber: 285,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(
          "svg",
          {
            ref: svgRef,
            className: "w-full h-[520px] select-none cursor-crosshair bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/40 via-slate-950 to-black",
            onMouseMove: handleMouseMoveCanvas,
            onMouseUp: handleMouseUpCanvas,
            onClick: () => {
              setSelectedLinkId(null);
            },
            children: [
              /* @__PURE__ */ jsxDEV("defs", { children: [
                /* @__PURE__ */ jsxDEV("pattern", { id: "grid-pattern", width: "30", height: "30", patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ jsxDEV("path", { d: "M 30 0 L 0 0 0 30", fill: "none", stroke: "rgba(0, 240, 255, 0.05)", strokeWidth: "1" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                  lineNumber: 307,
                  columnNumber: 17
                }, this) }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                  lineNumber: 306,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("filter", { id: "glow-emerald", x: "-20%", y: "-20%", width: "140%", height: "140%", children: [
                  /* @__PURE__ */ jsxDEV("feGaussianBlur", { stdDeviation: "4", result: "blur" }, void 0, false, {
                    fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                    lineNumber: 312,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("feComposite", { in: "SourceGraphic", in2: "blur", operator: "over" }, void 0, false, {
                    fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                    lineNumber: 313,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                  lineNumber: 311,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("filter", { id: "glow-red", x: "-20%", y: "-20%", width: "140%", height: "140%", children: [
                  /* @__PURE__ */ jsxDEV("feGaussianBlur", { stdDeviation: "5", result: "blur" }, void 0, false, {
                    fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                    lineNumber: 316,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("feComposite", { in: "SourceGraphic", in2: "blur", operator: "over" }, void 0, false, {
                    fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                    lineNumber: 317,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                  lineNumber: 315,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("filter", { id: "glow-laser", x: "-30%", y: "-30%", width: "160%", height: "160%", children: [
                  /* @__PURE__ */ jsxDEV("feGaussianBlur", { stdDeviation: "6", result: "blur" }, void 0, false, {
                    fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                    lineNumber: 320,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("feComposite", { in: "SourceGraphic", in2: "blur", operator: "over" }, void 0, false, {
                    fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                    lineNumber: 321,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                  lineNumber: 319,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                lineNumber: 305,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("rect", { width: "100%", height: "100%", fill: "url(#grid-pattern)" }, void 0, false, {
                fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                lineNumber: 325,
                columnNumber: 13
              }, this),
              filteredLinks.map((link) => {
                const sourceNode = nodes.find((n) => n.id === link.sourceNodeId);
                const targetNode = nodes.find((n) => n.id === link.targetNodeId);
                if (!sourceNode || !targetNode) return null;
                const isSelected = selectedLinkId === link.id;
                const colorCfg = getAggressionColor(link.aggressionScore);
                const isSevered = link.status === "SEVERED_BLOCKED";
                const isPurging = link.status === "PURGING_LASER";
                const midX = (sourceNode.x + targetNode.x) / 2;
                const midY = (sourceNode.y + targetNode.y) / 2;
                const dx = targetNode.x - sourceNode.x;
                const dy = targetNode.y - sourceNode.y;
                const norm = Math.hypot(dx, dy) || 1;
                const offset = 20;
                const cx = midX - dy / norm * offset;
                const cy = midY + dx / norm * offset;
                const pathD = `M ${sourceNode.x} ${sourceNode.y} Q ${cx} ${cy} ${targetNode.x} ${targetNode.y}`;
                return /* @__PURE__ */ jsxDEV("g", { className: "cursor-pointer", onClick: (e) => {
                  e.stopPropagation();
                  setSelectedLinkId(link.id);
                  setSelectedNodeId(null);
                }, children: [
                  /* @__PURE__ */ jsxDEV(
                    "path",
                    {
                      d: pathD,
                      fill: "none",
                      stroke: "transparent",
                      strokeWidth: "16"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                      lineNumber: 357,
                      columnNumber: 19
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV(
                    "path",
                    {
                      d: pathD,
                      fill: "none",
                      stroke: isSevered ? "#475569" : isPurging ? "#00ffff" : colorCfg.stroke,
                      strokeWidth: isSelected ? 3.5 : isPurging ? 3 : 2,
                      strokeDasharray: isSevered ? "4,4" : isPurging ? "8,4" : void 0,
                      strokeOpacity: isSelected ? 1 : 0.8,
                      filter: isSelected || isPurging ? "url(#glow-laser)" : void 0
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                      lineNumber: 365,
                      columnNumber: 19
                    },
                    this
                  ),
                  isAnimationActive && !isSevered && /* @__PURE__ */ jsxDEV("circle", { r: link.aggressionScore > 50 ? 3.5 : 2.5, fill: isPurging ? "#ffffff" : colorCfg.stroke, children: /* @__PURE__ */ jsxDEV(
                    "animateMotion",
                    {
                      path: pathD,
                      dur: `${Math.max(0.6, 2.5 - link.packetRate / 100)}s`,
                      repeatCount: "indefinite"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                      lineNumber: 378,
                      columnNumber: 23
                    },
                    this
                  ) }, void 0, false, {
                    fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                    lineNumber: 377,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("g", { transform: `translate(${cx}, ${cy})`, children: [
                    /* @__PURE__ */ jsxDEV(
                      "circle",
                      {
                        r: "10",
                        fill: "#020617",
                        stroke: colorCfg.stroke,
                        strokeWidth: "1.5"
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                        lineNumber: 388,
                        columnNumber: 21
                      },
                      this
                    ),
                    /* @__PURE__ */ jsxDEV(
                      "text",
                      {
                        textAnchor: "middle",
                        dy: "3.5",
                        fontSize: "9",
                        fontWeight: "bold",
                        fill: colorCfg.stroke,
                        fontFamily: "monospace",
                        children: link.gnidasDetected > 0 ? `!${link.gnidasDetected}` : "✓"
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                        lineNumber: 394,
                        columnNumber: 21
                      },
                      this
                    )
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                    lineNumber: 387,
                    columnNumber: 19
                  }, this)
                ] }, link.id, true, {
                  fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                  lineNumber: 351,
                  columnNumber: 17
                }, this);
              }),
              nodes.map((node) => {
                const isSelected = selectedNodeId === node.id;
                const colorCfg = getAggressionColor(node.aggressionLevel);
                const isBaseCore = node.nodeType === "SECURITY_GARRISON";
                return /* @__PURE__ */ jsxDEV(
                  "g",
                  {
                    transform: `translate(${node.x}, ${node.y})`,
                    className: "cursor-grab active:cursor-grabbing",
                    onMouseDown: (e) => handleMouseDownNode(node.id, e),
                    children: [
                      node.aggressionLevel > 50 && /* @__PURE__ */ jsxDEV(
                        "circle",
                        {
                          r: "28",
                          fill: "none",
                          stroke: colorCfg.stroke,
                          strokeWidth: "1.5",
                          strokeOpacity: "0.4",
                          className: "animate-ping"
                        },
                        void 0,
                        false,
                        {
                          fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                          lineNumber: 424,
                          columnNumber: 21
                        },
                        this
                      ),
                      isSelected && /* @__PURE__ */ jsxDEV(
                        "circle",
                        {
                          r: "25",
                          fill: "none",
                          stroke: "#00ffff",
                          strokeWidth: "2",
                          strokeDasharray: "4,3",
                          className: "animate-spin"
                        },
                        void 0,
                        false,
                        {
                          fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                          lineNumber: 436,
                          columnNumber: 21
                        },
                        this
                      ),
                      /* @__PURE__ */ jsxDEV(
                        "circle",
                        {
                          r: "20",
                          fill: isBaseCore ? "#064e3b" : "#090d16",
                          stroke: isSelected ? "#00ffff" : colorCfg.stroke,
                          strokeWidth: isSelected ? 2.5 : 2,
                          filter: isSelected ? "url(#glow-laser)" : void 0
                        },
                        void 0,
                        false,
                        {
                          fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                          lineNumber: 447,
                          columnNumber: 19
                        },
                        this
                      ),
                      /* @__PURE__ */ jsxDEV(
                        "text",
                        {
                          textAnchor: "middle",
                          dy: "4",
                          fontSize: "10",
                          fontWeight: "bold",
                          fill: isBaseCore ? "#34d399" : colorCfg.stroke,
                          fontFamily: "monospace",
                          children: isBaseCore ? "🛡️" : node.gnidasCount > 0 ? `☣️${node.gnidasCount}` : "⚡"
                        },
                        void 0,
                        false,
                        {
                          fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                          lineNumber: 456,
                          columnNumber: 19
                        },
                        this
                      ),
                      /* @__PURE__ */ jsxDEV("g", { transform: "translate(0, 32)", children: [
                        /* @__PURE__ */ jsxDEV(
                          "rect",
                          {
                            x: "-65",
                            y: "-8",
                            width: "130",
                            height: "16",
                            rx: "8",
                            fill: "#020617",
                            stroke: colorCfg.stroke,
                            strokeWidth: "0.8",
                            strokeOpacity: "0.7"
                          },
                          void 0,
                          false,
                          {
                            fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                            lineNumber: 469,
                            columnNumber: 21
                          },
                          this
                        ),
                        /* @__PURE__ */ jsxDEV(
                          "text",
                          {
                            textAnchor: "middle",
                            dy: "3.5",
                            fontSize: "8",
                            fontWeight: "bold",
                            fill: "#f8fafc",
                            fontFamily: "monospace",
                            children: node.name.length > 20 ? node.name.slice(0, 18) + "…" : node.name
                          },
                          void 0,
                          false,
                          {
                            fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                            lineNumber: 480,
                            columnNumber: 21
                          },
                          this
                        )
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                        lineNumber: 468,
                        columnNumber: 19
                      }, this),
                      /* @__PURE__ */ jsxDEV("g", { transform: "translate(0, 47)", children: /* @__PURE__ */ jsxDEV(
                        "text",
                        {
                          textAnchor: "middle",
                          fontSize: "7",
                          fill: colorCfg.stroke,
                          fontFamily: "monospace",
                          fontWeight: "bold",
                          children: [
                            "PID: ",
                            node.pid,
                            " | ",
                            node.aggressionLevel,
                            "% AGRESJA"
                          ]
                        },
                        void 0,
                        true,
                        {
                          fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                          lineNumber: 494,
                          columnNumber: 21
                        },
                        this
                      ) }, void 0, false, {
                        fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                        lineNumber: 493,
                        columnNumber: 19
                      }, this)
                    ]
                  },
                  node.id,
                  true,
                  {
                    fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                    lineNumber: 416,
                    columnNumber: 17
                  },
                  this
                );
              })
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
            lineNumber: 295,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
        lineNumber: 282,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-4 space-y-4", children: [
        selectedLink && /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-3xl bg-slate-900/90 border-2 border-cyan-500/60 shadow-xl space-y-3.5", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-slate-800 pb-2.5", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono font-black text-cyan-300 uppercase flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxDEV(Radio, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
                fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                lineNumber: 518,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Inspekcja Złącza I/O" }, void 0, false, {
                fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                lineNumber: 519,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
              lineNumber: 517,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: `px-2 py-0.5 rounded text-[10px] font-mono font-bold ${selectedLink.status === "CLEANSED_SECURE" ? "bg-emerald-950 text-emerald-300 border border-emerald-500" : "bg-rose-950 text-rose-300 border border-rose-500"}`, children: selectedLink.status }, void 0, false, {
              fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
              lineNumber: 521,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
            lineNumber: 516,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("h4", { className: "text-sm font-bold font-mono text-white", children: selectedLink.connectorName }, void 0, false, {
              fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
              lineNumber: 529,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] font-mono text-slate-400 mt-0.5", children: [
              "Protokół: ",
              /* @__PURE__ */ jsxDEV("strong", { className: "text-cyan-300", children: selectedLink.protocol }, void 0, false, {
                fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                lineNumber: 531,
                columnNumber: 29
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
              lineNumber: 530,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
            lineNumber: 528,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-2 text-xs font-mono", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-xl bg-slate-950 border border-slate-800", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400", children: "Gnid na złączu:" }, void 0, false, {
                fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                lineNumber: 538,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-base font-black text-rose-400", children: [
                selectedLink.gnidasDetected,
                " ",
                /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400 font-normal", children: [
                  "/ ",
                  selectedLink.gnidasPurged,
                  " purged"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                  lineNumber: 540,
                  columnNumber: 51
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                lineNumber: 539,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
              lineNumber: 537,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-xl bg-slate-950 border border-slate-800", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400", children: "Poziom Agresji:" }, void 0, false, {
                fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                lineNumber: 545,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: `text-base font-black ${getAggressionColor(selectedLink.aggressionScore).text}`, children: [
                selectedLink.aggressionScore,
                "%"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                lineNumber: 546,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
              lineNumber: 544,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-xl bg-slate-950 border border-slate-800", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400", children: "Przepustowość:" }, void 0, false, {
                fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                lineNumber: 552,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-bold text-slate-200 mt-0.5", children: selectedLink.bandwidth }, void 0, false, {
                fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                lineNumber: 553,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
              lineNumber: 551,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-xl bg-slate-950 border border-slate-800", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400", children: "Pakiety / sek:" }, void 0, false, {
                fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                lineNumber: 557,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-bold text-cyan-300 mt-0.5", children: [
                selectedLink.packetRate,
                " pkt/s"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                lineNumber: 558,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
              lineNumber: 556,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
            lineNumber: 536,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono space-y-1", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "text-slate-400", children: "Wektor Zagrożenia:" }, void 0, false, {
              fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
              lineNumber: 564,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-slate-200", children: selectedLink.threatDescription }, void 0, false, {
              fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
              lineNumber: 565,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "pt-1 text-[10px] text-slate-400", children: "Ostatnia Próbka Pakietu:" }, void 0, false, {
              fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
              lineNumber: 566,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-cyan-300 bg-slate-900 p-1.5 rounded font-mono truncate", children: selectedLink.lastPayloadSample }, void 0, false, {
              fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
              lineNumber: 567,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
            lineNumber: 563,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 pt-1", children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: handlePurgeSelectedLink,
                className: "flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-mono font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow active:scale-95 transition-all",
                children: [
                  /* @__PURE__ */ jsxDEV(Zap, { className: "w-3.5 h-3.5 fill-black" }, void 0, false, {
                    fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                    lineNumber: 578,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Wypal Złącze Laserem" }, void 0, false, {
                    fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                    lineNumber: 579,
                    columnNumber: 19
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                lineNumber: 574,
                columnNumber: 17
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: handleSeverSelectedLink,
                className: "py-2 px-3 rounded-xl bg-rose-950 hover:bg-rose-900 border border-rose-500 text-rose-200 font-mono font-bold text-xs flex items-center justify-center gap-1 cursor-pointer active:scale-95 transition-all",
                title: "Odcięcie połączenia i zerwanie gniazda",
                children: [
                  /* @__PURE__ */ jsxDEV(Scissors, { className: "w-3.5 h-3.5" }, void 0, false, {
                    fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                    lineNumber: 587,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Odetnij" }, void 0, false, {
                    fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                    lineNumber: 588,
                    columnNumber: 19
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                lineNumber: 582,
                columnNumber: 17
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
            lineNumber: 573,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
          lineNumber: 515,
          columnNumber: 13
        }, this),
        selectedNode && !selectedLink && /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-3xl bg-slate-900/90 border-2 border-slate-800 shadow-xl space-y-3.5", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-slate-800 pb-2.5", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono font-black text-cyan-300 uppercase flex items-center gap-1.5", children: [
              renderNodeIcon(selectedNode.iconName),
              /* @__PURE__ */ jsxDEV("span", { children: "Inspekcja Procesu" }, void 0, false, {
                fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                lineNumber: 600,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
              lineNumber: 598,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: `px-2 py-0.5 rounded text-[10px] font-mono font-bold ${selectedNode.status === "SECURED" ? "bg-emerald-950 text-emerald-300 border border-emerald-500" : "bg-rose-950 text-rose-300 border border-rose-500"}`, children: selectedNode.status }, void 0, false, {
              fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
              lineNumber: 602,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
            lineNumber: 597,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("h4", { className: "text-sm font-bold font-mono text-white", children: selectedNode.name }, void 0, false, {
              fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
              lineNumber: 610,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] font-mono text-slate-400 mt-0.5", children: [
              "Plik Wykonywalny: ",
              /* @__PURE__ */ jsxDEV("strong", { className: "text-cyan-300", children: selectedNode.processName }, void 0, false, {
                fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                lineNumber: 612,
                columnNumber: 37
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
              lineNumber: 611,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] font-mono text-slate-500 mt-0.5", children: [
              "Kategoria: ",
              selectedNode.category
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
              lineNumber: 614,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
            lineNumber: 609,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-2 text-xs font-mono", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-xl bg-slate-950 border border-slate-800", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400", children: "PID Procesu:" }, void 0, false, {
                fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                lineNumber: 620,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-sm font-black text-cyan-400 mt-0.5", children: [
                "#",
                selectedNode.pid
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                lineNumber: 621,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
              lineNumber: 619,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-xl bg-slate-950 border border-slate-800", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400", children: "Stopień Agresji:" }, void 0, false, {
                fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                lineNumber: 625,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: `text-sm font-black ${getAggressionColor(selectedNode.aggressionLevel).text}`, children: [
                selectedNode.aggressionLevel,
                "%"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                lineNumber: 626,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
              lineNumber: 624,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-xl bg-slate-950 border border-slate-800", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400", children: "Gnid w Procesie:" }, void 0, false, {
                fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                lineNumber: 632,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-sm font-black text-rose-400", children: selectedNode.gnidasCount }, void 0, false, {
                fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                lineNumber: 633,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
              lineNumber: 631,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-xl bg-slate-950 border border-slate-800", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400", children: "Obciążenie CPU:" }, void 0, false, {
                fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                lineNumber: 637,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-sm font-black text-slate-200", children: [
                selectedNode.cpuLoad,
                "%"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                lineNumber: 638,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
              lineNumber: 636,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
            lineNumber: 618,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Opis Operacyjny:" }, void 0, false, {
              fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
              lineNumber: 643,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-slate-200 mt-0.5 leading-relaxed", children: selectedNode.description }, void 0, false, {
              fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
              lineNumber: 644,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
            lineNumber: 642,
            columnNumber: 15
          }, this),
          selectedNode.status !== "SECURED" && /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleDisinfectSelectedNode,
              className: "w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-mono font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow active:scale-95 transition-all",
              children: [
                /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-4 h-4 fill-black" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                  lineNumber: 652,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Dezynfekuj Proces & Wszystkie Złącza" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
                  lineNumber: 653,
                  columnNumber: 19
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
              lineNumber: 648,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
          lineNumber: 596,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-3xl bg-slate-900/60 border border-slate-800 text-xs font-mono space-y-2", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400 uppercase font-bold", children: "Zbiorczy Bilans Połączeń:" }, void 0, false, {
            fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
            lineNumber: 661,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-slate-300", children: [
            /* @__PURE__ */ jsxDEV("span", { children: "Węzłów w sieci:" }, void 0, false, {
              fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
              lineNumber: 663,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("strong", { className: "text-cyan-300", children: [
              nodes.length,
              " procesów"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
              lineNumber: 664,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
            lineNumber: 662,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-slate-300", children: [
            /* @__PURE__ */ jsxDEV("span", { children: "Złączy komunikacyjnych:" }, void 0, false, {
              fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
              lineNumber: 667,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("strong", { className: "text-cyan-300", children: [
              links.length,
              " magistral"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
              lineNumber: 668,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
            lineNumber: 666,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-slate-300", children: [
            /* @__PURE__ */ jsxDEV("span", { children: "Wypalonych gnid łącznie:" }, void 0, false, {
              fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
              lineNumber: 671,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("strong", { className: "text-emerald-400", children: [
              totalPurgedOnMatrix,
              " zneutralizowanych"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
              lineNumber: 672,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
            lineNumber: 670,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
          lineNumber: 660,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
        lineNumber: 511,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
      lineNumber: 279,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/InteractiveDataFlowConnectionsMap.tsx",
    lineNumber: 176,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkludGVyYWN0aXZlRGF0YUZsb3dDb25uZWN0aW9uc01hcC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlTWVtbyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFxuICBSYWRpbywgWmFwLCBTaGllbGRDaGVjaywgU2t1bGwsIENwdSwgR2xvYmUsIENyZWRpdENhcmQsIFxuICBNZXNzYWdlU3F1YXJlLCBIYXJkRHJpdmUsIFdpZmksIExvY2ssIFVubG9jaywgUmVmcmVzaEN3LCBcbiAgQWN0aXZpdHksIEFsZXJ0VHJpYW5nbGUsIFBsYXksIFBhdXNlLCBGbGFtZSwgVGFyZ2V0LCBGaWx0ZXIsXG4gIExheWVycywgQ3Jvc3NoYWlyLCBBcnJvd1JpZ2h0LCBFeWUsIENoZWNrQ2lyY2xlMiwgU2xpZGVycywgU2Npc3NvcnNcbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IFxuICBkYXRhRmxvd01hdHJpeEVuZ2luZSwgXG4gIElOSVRJQUxfREFUQV9GTE9XX05PREVTLCBcbiAgSU5JVElBTF9EQVRBX0ZMT1dfTElOS1MgXG59IGZyb20gJy4uL3V0aWxzL2RhdGFGbG93TWF0cml4RW5naW5lJztcbmltcG9ydCB7IERhdGFGbG93UHJvY2Vzc05vZGUsIERhdGFGbG93Q29ubmVjdGlvbkxpbmsgfSBmcm9tICcuLi90eXBlcyc7XG5cbmludGVyZmFjZSBJbnRlcmFjdGl2ZURhdGFGbG93Q29ubmVjdGlvbnNNYXBQcm9wcyB7XG4gIG9uTm90aWZ5PzogKG1zZzogc3RyaW5nKSA9PiB2b2lkO1xuICBpc0NvbXBhY3Q/OiBib29sZWFuO1xufVxuXG5leHBvcnQgY29uc3QgSW50ZXJhY3RpdmVEYXRhRmxvd0Nvbm5lY3Rpb25zTWFwOiBSZWFjdC5GQzxJbnRlcmFjdGl2ZURhdGFGbG93Q29ubmVjdGlvbnNNYXBQcm9wcz4gPSAoe1xuICBvbk5vdGlmeSxcbiAgaXNDb21wYWN0ID0gZmFsc2Vcbn0pID0+IHtcbiAgY29uc3QgW25vZGVzLCBzZXROb2Rlc10gPSB1c2VTdGF0ZTxEYXRhRmxvd1Byb2Nlc3NOb2RlW10+KCgpID0+IGRhdGFGbG93TWF0cml4RW5naW5lLmdldE5vZGVzKCkpO1xuICBjb25zdCBbbGlua3MsIHNldExpbmtzXSA9IHVzZVN0YXRlPERhdGFGbG93Q29ubmVjdGlvbkxpbmtbXT4oKCkgPT4gZGF0YUZsb3dNYXRyaXhFbmdpbmUuZ2V0TGlua3MoKSk7XG4gIGNvbnN0IFtzZWxlY3RlZE5vZGVJZCwgc2V0U2VsZWN0ZWROb2RlSWRdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4oJ25vZGUtc2VudGluZWwtY29yZScpO1xuICBjb25zdCBbc2VsZWN0ZWRMaW5rSWQsIHNldFNlbGVjdGVkTGlua0lkXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbZmlsdGVyUHJvdG9jb2wsIHNldEZpbHRlclByb3RvY29sXSA9IHVzZVN0YXRlPHN0cmluZz4oJ0FMTCcpO1xuICBjb25zdCBbbWluQWdncmVzc2lvbkZpbHRlciwgc2V0TWluQWdncmVzc2lvbkZpbHRlcl0gPSB1c2VTdGF0ZTxudW1iZXI+KDApO1xuICBjb25zdCBbaXNBbmltYXRpb25BY3RpdmUsIHNldElzQW5pbWF0aW9uQWN0aXZlXSA9IHVzZVN0YXRlPGJvb2xlYW4+KHRydWUpO1xuICBjb25zdCBbZHJhZ2dlZE5vZGVJZCwgc2V0RHJhZ2dlZE5vZGVJZF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgY29uc3Qgc3ZnUmVmID0gdXNlUmVmPFNWR1NWR0VsZW1lbnQgfCBudWxsPihudWxsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHVuc3ViID0gZGF0YUZsb3dNYXRyaXhFbmdpbmUuc3Vic2NyaWJlKChuZXdOb2RlcywgbmV3TGlua3MpID0+IHtcbiAgICAgIHNldE5vZGVzKG5ld05vZGVzKTtcbiAgICAgIHNldExpbmtzKG5ld0xpbmtzKTtcbiAgICB9KTtcbiAgICByZXR1cm4gKCkgPT4gdW5zdWIoKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IHRvdGFsR25pZGFzT25NYXRyaXggPSB1c2VNZW1vKCgpID0+IHtcbiAgICByZXR1cm4gbGlua3MucmVkdWNlKChhY2MsIGwpID0+IGFjYyArIGwuZ25pZGFzRGV0ZWN0ZWQsIDApO1xuICB9LCBbbGlua3NdKTtcblxuICBjb25zdCB0b3RhbFB1cmdlZE9uTWF0cml4ID0gdXNlTWVtbygoKSA9PiB7XG4gICAgcmV0dXJuIGxpbmtzLnJlZHVjZSgoYWNjLCBsKSA9PiBhY2MgKyBsLmduaWRhc1B1cmdlZCwgMCk7XG4gIH0sIFtsaW5rc10pO1xuXG4gIGNvbnN0IHNlbGVjdGVkTm9kZSA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIHJldHVybiBub2Rlcy5maW5kKG4gPT4gbi5pZCA9PT0gc2VsZWN0ZWROb2RlSWQpIHx8IG51bGw7XG4gIH0sIFtub2Rlcywgc2VsZWN0ZWROb2RlSWRdKTtcblxuICBjb25zdCBzZWxlY3RlZExpbmsgPSB1c2VNZW1vKCgpID0+IHtcbiAgICByZXR1cm4gbGlua3MuZmluZChsID0+IGwuaWQgPT09IHNlbGVjdGVkTGlua0lkKSB8fCBudWxsO1xuICB9LCBbbGlua3MsIHNlbGVjdGVkTGlua0lkXSk7XG5cbiAgY29uc3QgZmlsdGVyZWRMaW5rcyA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIHJldHVybiBsaW5rcy5maWx0ZXIobCA9PiB7XG4gICAgICBpZiAoZmlsdGVyUHJvdG9jb2wgIT09ICdBTEwnICYmIGwucHJvdG9jb2wgIT09IGZpbHRlclByb3RvY29sKSByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAobC5hZ2dyZXNzaW9uU2NvcmUgPCBtaW5BZ2dyZXNzaW9uRmlsdGVyKSByZXR1cm4gZmFsc2U7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbiAgfSwgW2xpbmtzLCBmaWx0ZXJQcm90b2NvbCwgbWluQWdncmVzc2lvbkZpbHRlcl0pO1xuXG4gIC8vIENvbG9yIGhlbHBlciBiYXNlZCBvbiBBZ2dyZXNzaW9uIExldmVsXG4gIGNvbnN0IGdldEFnZ3Jlc3Npb25Db2xvciA9IChhZ2dyZXNzaW9uOiBudW1iZXIpID0+IHtcbiAgICBpZiAoYWdncmVzc2lvbiA9PT0gMCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3Ryb2tlOiAnIzEwYjk4MScsIC8vIGVtZXJhbGRcbiAgICAgICAgZmlsbDogJ3JnYmEoMTYsIDE4NSwgMTI5LCAwLjE1KScsXG4gICAgICAgIGdsb3c6ICdyZ2JhKDE2LCAxODUsIDEyOSwgMC43KScsXG4gICAgICAgIHRleHQ6ICd0ZXh0LWVtZXJhbGQtNDAwJyxcbiAgICAgICAgbGFiZWw6ICdDWllTVFkgLyBTRUNVUkUgKDAlKSdcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmIChhZ2dyZXNzaW9uIDwgNTApIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0cm9rZTogJyNmYWNjMTUnLCAvLyB5ZWxsb3dcbiAgICAgICAgZmlsbDogJ3JnYmEoMjUwLCAyMDQsIDIxLCAwLjE1KScsXG4gICAgICAgIGdsb3c6ICdyZ2JhKDI1MCwgMjA0LCAyMSwgMC43KScsXG4gICAgICAgIHRleHQ6ICd0ZXh0LXllbGxvdy00MDAnLFxuICAgICAgICBsYWJlbDogYE9TVFJaRUdBV0NaWSAoJHthZ2dyZXNzaW9ufSUpYFxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKGFnZ3Jlc3Npb24gPCA4MCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3Ryb2tlOiAnI2Y5NzMxNicsIC8vIG9yYW5nZVxuICAgICAgICBmaWxsOiAncmdiYSgyNDksIDExNSwgMjIsIDAuMiknLFxuICAgICAgICBnbG93OiAncmdiYSgyNDksIDExNSwgMjIsIDAuOCknLFxuICAgICAgICB0ZXh0OiAndGV4dC1vcmFuZ2UtNDAwJyxcbiAgICAgICAgbGFiZWw6IGBXWVNPS0EgQUdSRVNKQSAoJHthZ2dyZXNzaW9ufSUpYFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3Ryb2tlOiAnI2VmNDQ0NCcsIC8vIHJlZFxuICAgICAgICBmaWxsOiAncmdiYSgyMzksIDY4LCA2OCwgMC4yNSknLFxuICAgICAgICBnbG93OiAncmdiYSgyMzksIDY4LCA2OCwgMC45NSknLFxuICAgICAgICB0ZXh0OiAndGV4dC1yb3NlLTUwMCcsXG4gICAgICAgIGxhYmVsOiBgS1JZVFlDWk5BIC8gRUtTVFJFTUFMTkEgKCR7YWdncmVzc2lvbn0lKWBcbiAgICAgIH07XG4gICAgfVxuICB9O1xuXG4gIC8vIE5vZGUgSWNvbiByZW5kZXIgaGVscGVyXG4gIGNvbnN0IHJlbmRlck5vZGVJY29uID0gKGljb25OYW1lOiBzdHJpbmcsIGNsYXNzTmFtZTogc3RyaW5nID0gJ3ctNCBoLTQnKSA9PiB7XG4gICAgc3dpdGNoIChpY29uTmFtZSkge1xuICAgICAgY2FzZSAnU2hpZWxkQ2hlY2snOiByZXR1cm4gPFNoaWVsZENoZWNrIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSAvPjtcbiAgICAgIGNhc2UgJ0NwdSc6IHJldHVybiA8Q3B1IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSAvPjtcbiAgICAgIGNhc2UgJ1JhZGlvJzogcmV0dXJuIDxSYWRpbyBjbGFzc05hbWU9e2NsYXNzTmFtZX0gLz47XG4gICAgICBjYXNlICdHbG9iZSc6IHJldHVybiA8R2xvYmUgY2xhc3NOYW1lPXtjbGFzc05hbWV9IC8+O1xuICAgICAgY2FzZSAnQ3JlZGl0Q2FyZCc6IHJldHVybiA8Q3JlZGl0Q2FyZCBjbGFzc05hbWU9e2NsYXNzTmFtZX0gLz47XG4gICAgICBjYXNlICdNZXNzYWdlU3F1YXJlJzogcmV0dXJuIDxNZXNzYWdlU3F1YXJlIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSAvPjtcbiAgICAgIGNhc2UgJ1NrdWxsJzogcmV0dXJuIDxTa3VsbCBjbGFzc05hbWU9e2NsYXNzTmFtZX0gLz47XG4gICAgICBjYXNlICdXaWZpJzogcmV0dXJuIDxXaWZpIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSAvPjtcbiAgICAgIGNhc2UgJ0hhcmREcml2ZSc6IHJldHVybiA8SGFyZERyaXZlIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSAvPjtcbiAgICAgIGRlZmF1bHQ6IHJldHVybiA8QWN0aXZpdHkgY2xhc3NOYW1lPXtjbGFzc05hbWV9IC8+O1xuICAgIH1cbiAgfTtcblxuICAvLyBIYW5kbGUgRHJhZ2dpbmcgb2YgTm9kZXMgb24gU1ZHIGNhbnZhc1xuICBjb25zdCBoYW5kbGVNb3VzZURvd25Ob2RlID0gKGlkOiBzdHJpbmcsIGU6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHNldERyYWdnZWROb2RlSWQoaWQpO1xuICAgIHNldFNlbGVjdGVkTm9kZUlkKGlkKTtcbiAgICBzZXRTZWxlY3RlZExpbmtJZChudWxsKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVNb3VzZU1vdmVDYW52YXMgPSAoZTogUmVhY3QuTW91c2VFdmVudDxTVkdTVkdFbGVtZW50PikgPT4ge1xuICAgIGlmICghZHJhZ2dlZE5vZGVJZCB8fCAhc3ZnUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICBjb25zdCByZWN0ID0gc3ZnUmVmLmN1cnJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgeCA9IE1hdGgubWF4KDQwLCBNYXRoLm1pbihyZWN0LndpZHRoIC0gNDAsIGUuY2xpZW50WCAtIHJlY3QubGVmdCkpO1xuICAgIGNvbnN0IHkgPSBNYXRoLm1heCg0MCwgTWF0aC5taW4ocmVjdC5oZWlnaHQgLSA0MCwgZS5jbGllbnRZIC0gcmVjdC50b3ApKTtcblxuICAgIC8vIFVwZGF0ZSBub2RlIGNvb3JkaW5hdGVcbiAgICBzZXROb2RlcyhwcmV2ID0+IHByZXYubWFwKG4gPT4ge1xuICAgICAgaWYgKG4uaWQgPT09IGRyYWdnZWROb2RlSWQpIHtcbiAgICAgICAgcmV0dXJuIHsgLi4ubiwgeCwgeSB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIG47XG4gICAgfSkpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZU1vdXNlVXBDYW52YXMgPSAoKSA9PiB7XG4gICAgc2V0RHJhZ2dlZE5vZGVJZChudWxsKTtcbiAgfTtcblxuICAvLyBBY3Rpb25zXG4gIGNvbnN0IGhhbmRsZVB1cmdlU2VsZWN0ZWRMaW5rID0gKCkgPT4ge1xuICAgIGlmICghc2VsZWN0ZWRMaW5rSWQpIHJldHVybjtcbiAgICBkYXRhRmxvd01hdHJpeEVuZ2luZS5wdXJnZUxpbmsoc2VsZWN0ZWRMaW5rSWQpO1xuICAgIGlmIChvbk5vdGlmeSkgb25Ob3RpZnkoYOKaoSBXeXBhbG9ubyB6xYLEhWN6ZSBwcm9taWVuaWVtIGxhc2Vyb3d5bSEgV3ljenlzemN6b25vIGduaWR5LmApO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNldmVyU2VsZWN0ZWRMaW5rID0gKCkgPT4ge1xuICAgIGlmICghc2VsZWN0ZWRMaW5rSWQpIHJldHVybjtcbiAgICBkYXRhRmxvd01hdHJpeEVuZ2luZS5zZXZlckxpbmsoc2VsZWN0ZWRMaW5rSWQpO1xuICAgIGlmIChvbk5vdGlmeSkgb25Ob3RpZnkoYOKcgu+4jyBPZGNpxJl0byBuaWViZXpwaWVjem5lIHrFgsSFY3plIGtvbXVuaWthY3lqbmUgKFJldmVyc2UgVHVubmVsIFNldmVyZWQpIWApO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZURpc2luZmVjdFNlbGVjdGVkTm9kZSA9ICgpID0+IHtcbiAgICBpZiAoIXNlbGVjdGVkTm9kZUlkKSByZXR1cm47XG4gICAgZGF0YUZsb3dNYXRyaXhFbmdpbmUuZGlzaW5mZWN0Tm9kZShzZWxlY3RlZE5vZGVJZCk7XG4gICAgaWYgKG9uTm90aWZ5KSBvbk5vdGlmeShg8J+boe+4jyBPY3p5c3pjem9ubyB3xJl6ZcWCIHByb2Nlc3UgaSB3c3p5c3RraWUgcHJ6eWxlZ2FqxIVjZSBtYWdpc3RyYWxlIWApO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVB1cmdlRW50aXJlTmV0d29yayA9ICgpID0+IHtcbiAgICBkYXRhRmxvd01hdHJpeEVuZ2luZS5wdXJnZUVudGlyZURhdGFGbG93KCk7XG4gICAgaWYgKG9uTm90aWZ5KSBvbk5vdGlmeShg8J+RkSBOQVRZQ0hNSUFTVE9XQSBFS1NURVJNSU5BQ0pBOiBXc3p5c3RraWUgOSB3xJl6xYLDs3cgaSB6xYLEhWN6eSBvY3p5c3pjem9uZSB6IGduaWQhYCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUmVzZXQgPSAoKSA9PiB7XG4gICAgZGF0YUZsb3dNYXRyaXhFbmdpbmUucmVzZXRUb0luaXRpYWxTdGF0ZSgpO1xuICAgIGlmIChvbk5vdGlmeSkgb25Ob3RpZnkoYPCflIQgWnJlc2V0b3dhbm8gdG9wb2xvZ2nEmSBwb8WCxIVjemXFhCBwcm9jZXPDs3cgZG8gc3RhbnUgYmF6b3dlZ28uYCk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCByb3VuZGVkLTN4bCBiZy1zbGF0ZS05NTAvOTUgYmFja2Ryb3AtYmx1ci1tZCBib3JkZXIgYm9yZGVyLWN5YW4tNTAwLzUwIHNoYWRvdy0yeGwgcC00IHNtOnAtNiB0ZXh0LXdoaXRlIHNwYWNlLXktNVwiPlxuICAgICAgXG4gICAgICB7LyogSGVhZGVyIEJhciAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBsZzpmbGV4LXJvdyBpdGVtcy1zdGFydCBsZzppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00IHBiLTQgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMy41XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTEyIGgtMTIgcm91bmRlZC0yeGwgYmctY3lhbi05NTAgYm9yZGVyIGJvcmRlci1jeWFuLTQwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBzaGFkb3ctbGcgc2hhZG93LWN5YW4tNTAwLzMwIHNocmluay0wXCI+XG4gICAgICAgICAgICA8UmFkaW8gY2xhc3NOYW1lPVwidy02IGgtNiB0ZXh0LWN5YW4tMzAwIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGZsZXgtd3JhcFwiPlxuICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC1iYXNlIHNtOnRleHQtbGcgZm9udC1ibGFjayBmb250LW1vbm8gdHJhY2tpbmctdGlnaHQgdGV4dC13aGl0ZSB1cHBlcmNhc2UgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5JbnRlcmFrdHl3bmEgTWFwYSBQb8WCxIVjemXFhCBBcGxpa2FjamkgJiBEYXRhIEZsb3c8L3NwYW4+XG4gICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHB4LTIuNSBweS0wLjUgcm91bmRlZC1mdWxsIHRleHQtWzEwcHhdIGZvbnQtbW9ubyBmb250LWJsYWNrIGJvcmRlciAke1xuICAgICAgICAgICAgICAgIHRvdGFsR25pZGFzT25NYXRyaXggPT09IDBcbiAgICAgICAgICAgICAgICAgID8gJ2JnLWVtZXJhbGQtOTUwIGJvcmRlci1lbWVyYWxkLTQwMCB0ZXh0LWVtZXJhbGQtMzAwIHNoYWRvdy1bMF8wXzEwcHhfIzEwYjk4MV0nXG4gICAgICAgICAgICAgICAgICA6ICdiZy1yb3NlLTk1MCBib3JkZXItcm9zZS01MDAgdGV4dC1yb3NlLTMwMCBhbmltYXRlLXB1bHNlJ1xuICAgICAgICAgICAgICB9YH0+XG4gICAgICAgICAgICAgICAge3RvdGFsR25pZGFzT25NYXRyaXggPT09IDAgPyAn8J+RkSAxMDAlIE1BR0lTVFJBTCBDWllTVFlDSCcgOiBg4pqg77iPICR7dG90YWxHbmlkYXNPbk1hdHJpeH0gQUtUWVdOWUNIIEdOSURgfVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS0zMDAgZm9udC1tb25vIG10LTAuNVwiPlxuICAgICAgICAgICAgICBXaXp1YWxpemFjamEgcHJ6ZXDFgnl3dSBkYW55Y2ggdyBjemFzaWUgcnplY3p5d2lzdHltIG1pxJlkenkgcHJvY2VzYW1pIChLZXJuZWwsIElQQywgV2ViLCBCYW5rLCBBZHdhcmUsIEMyKS4gS29sb3J5IHfEmXrFgsOzdyBvYnJhenVqxIUgc3RvcGllxYQgYWdyZXNqaSBnbmlkLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogR2xvYmFsIEFjdGlvbiBCdXR0b25zICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGZsZXgtd3JhcCB3LWZ1bGwgbGc6dy1hdXRvIGp1c3RpZnktZW5kXCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17aGFuZGxlUHVyZ2VFbnRpcmVOZXR3b3JrfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC0xIGxnOmZsZXgtbm9uZSBweC00IHB5LTIgcm91bmRlZC14bCBiZy1ncmFkaWVudC10by1yIGZyb20tZW1lcmFsZC01MDAgdmlhLXRlYWwtNTAwIHRvLWN5YW4tNTAwIGhvdmVyOmZyb20tZW1lcmFsZC00MDAgaG92ZXI6dG8tY3lhbi00MDAgdGV4dC1ibGFjayBmb250LW1vbm8gZm9udC1ibGFjayB0ZXh0LXhzIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xLjUgc2hhZG93LXhsIGJvcmRlciBib3JkZXItd2hpdGUgY3Vyc29yLXBvaW50ZXIgYWN0aXZlOnNjYWxlLTk1IHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICAgIHRpdGxlPVwiV3lwYWwgd3N6eXN0a2llIGduaWR5IG5hIHdzenlzdGtpY2ggOSB3xJl6xYJhY2ggaSDFgsSFY3phY2hcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxaYXAgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgZmlsbC1ibGFja1wiIC8+XG4gICAgICAgICAgICA8c3Bhbj5XWVBBTCBXU1pZU1RLSUUgR05JRFkgKDAgTVMpPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNBbmltYXRpb25BY3RpdmUoIWlzQW5pbWF0aW9uQWN0aXZlKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMgcHktMiByb3VuZGVkLXhsIGJnLXNsYXRlLTkwMCBob3ZlcjpiZy1zbGF0ZS04MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0zMDAgdGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGN1cnNvci1wb2ludGVyIHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICAgIHRpdGxlPVwiWmF0cnp5bWFqIC8gV3puw7N3IGFuaW1hY2rEmSBwYWtpZXTDs3dcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtpc0FuaW1hdGlvbkFjdGl2ZSA/IDxQYXVzZSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXllbGxvdy00MDBcIiAvPiA6IDxQbGF5IGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtZW1lcmFsZC00MDBcIiAvPn1cbiAgICAgICAgICAgIDxzcGFuPntpc0FuaW1hdGlvbkFjdGl2ZSA/ICdQYXV6YSBQYWtpZXTDs3cnIDogJ1d6bsOzdyBSdWNoJ308L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVSZXNldH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMiByb3VuZGVkLXhsIGJnLXNsYXRlLTkwMCBob3ZlcjpiZy1zbGF0ZS04MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICB0aXRsZT1cIlJlc2V0dWogdG9wb2xvZ2nEmSBtYXB5XCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8UmVmcmVzaEN3IGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogQ29udHJvbCBGaWx0ZXIgQmFyICYgQWdncmVzc2lvbiBMZWdlbmQgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTEyIGdhcC0zIHAtMy41IHJvdW5kZWQtMnhsIGJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXhzIGZvbnQtbW9ub1wiPlxuICAgICAgICB7LyogUHJvdG9jb2wgRmlsdGVyICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1kOmNvbC1zcGFuLTQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICA8RmlsdGVyIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1jeWFuLTQwMCBzaHJpbmstMFwiIC8+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgdGV4dC1bMTFweF1cIj5Qcm90b2vDs8WCIFrFgsSFY3phOjwvc3Bhbj5cbiAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICB2YWx1ZT17ZmlsdGVyUHJvdG9jb2x9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEZpbHRlclByb3RvY29sKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgcm91bmRlZC1sZyBweC0yIHB5LTEgdGV4dC1jeWFuLTMwMCB0ZXh0LXhzIGZvbnQtbW9ubyBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLWN5YW4tNDAwXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiQUxMXCI+V3N6eXN0a2llIFByb3Rva2/FgnkgKHtsaW5rcy5sZW5ndGh9KTwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkJJTkRFUl9JUENcIj5CaW5kZXIgSVBDICgvZGV2L2JpbmRlcik8L29wdGlvbj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJUQ1BfU09DS0VUXCI+R25pYXpkYSBUQ1AgLyBDMjwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlVOSVhfU09DS0VUXCI+VW5peCBEb21haW4gU29ja2V0czwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlNIQVJFRF9NRU1cIj5QYW1pxJnEhyBBc2htZW08L29wdGlvbj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJDT05URU5UX1BST1ZJREVSXCI+Q29udGVudCBQcm92aWRlcjwvb3B0aW9uPlxuICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogTWluIEFnZ3Jlc3Npb24gRmlsdGVyICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1kOmNvbC1zcGFuLTQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICA8U2xpZGVycyBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtb3JhbmdlLTQwMCBzaHJpbmstMFwiIC8+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgdGV4dC1bMTFweF1cIj5NaW4uIEFncmVzamE6PC9zcGFuPlxuICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgIHR5cGU9XCJyYW5nZVwiIFxuICAgICAgICAgICAgbWluPVwiMFwiIFxuICAgICAgICAgICAgbWF4PVwiOTBcIiBcbiAgICAgICAgICAgIHN0ZXA9XCIxMFwiXG4gICAgICAgICAgICB2YWx1ZT17bWluQWdncmVzc2lvbkZpbHRlcn1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0TWluQWdncmVzc2lvbkZpbHRlcihOdW1iZXIoZS50YXJnZXQudmFsdWUpKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBhY2NlbnQtb3JhbmdlLTUwMCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgLz5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LW9yYW5nZS00MDAgZm9udC1ib2xkIHctMTAgdGV4dC1yaWdodFwiPnttaW5BZ2dyZXNzaW9uRmlsdGVyfSUrPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogQWdncmVzc2lvbiBDb2xvciBMZWdlbmQgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWQ6Y29sLXNwYW4tNCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWVuZCBnYXAtMiBmbGV4LXdyYXAgdGV4dC1bMTBweF1cIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPjxzcGFuIGNsYXNzTmFtZT1cInctMi41IGgtMi41IHJvdW5kZWQtZnVsbCBiZy1lbWVyYWxkLTUwMCBzaGFkb3ctWzBfMF82cHhfIzEwYjk4MV1cIiAvPiAwJSBDenlzdGU8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj48c3BhbiBjbGFzc05hbWU9XCJ3LTIuNSBoLTIuNSByb3VuZGVkLWZ1bGwgYmcteWVsbG93LTQwMCBzaGFkb3ctWzBfMF82cHhfI2ZhY2MxNV1cIiAvPiAxLTUwJSDFmnJlZG5pYTwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPjxzcGFuIGNsYXNzTmFtZT1cInctMi41IGgtMi41IHJvdW5kZWQtZnVsbCBiZy1vcmFuZ2UtNTAwIHNoYWRvdy1bMF8wXzZweF8jZjk3MzE2XVwiIC8+IDUxLTc5JSBXeXNva2E8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj48c3BhbiBjbGFzc05hbWU9XCJ3LTIuNSBoLTIuNSByb3VuZGVkLWZ1bGwgYmctcmVkLTUwMCBzaGFkb3ctWzBfMF82cHhfI2VmNDQ0NF1cIiAvPiA4MCUrIEduaWRhPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogTWFpbiBJbnRlcmFjdGl2ZSBUb3BvbG9neSBTVkcgQ2FudmFzICsgU2lkZSBJbnNwZWN0b3IgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbGc6Z3JpZC1jb2xzLTEyIGdhcC01XCI+XG4gICAgICAgIFxuICAgICAgICB7LyogTGVmdDogU1ZHIENhbnZhcyAoOCBjb2xzKSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi04IHJlbGF0aXZlIHJvdW5kZWQtM3hsIGJnLXNsYXRlLTk1MCBib3JkZXItMiBib3JkZXItc2xhdGUtODAwIG92ZXJmbG93LWhpZGRlbiBzaGFkb3ctaW5uZXIgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICBcbiAgICAgICAgICB7LyogVG9wIENhbnZhcyBCYXIgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMyBsZWZ0LTMgcmlnaHQtMyB6LTEwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBwb2ludGVyLWV2ZW50cy1ub25lIHRleHQtWzEwcHhdIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHB4LTIuNSBweS0xIHJvdW5kZWQteGwgdGV4dC1jeWFuLTMwMCBwb2ludGVyLWV2ZW50cy1hdXRvXCI+XG4gICAgICAgICAgICAgIPCflrHvuI8gUHJ6ZWNpxIVnYWogd8SZesWCeSBteXN6a8SFIOKAoiBLbGlrbmlqIHfEmXplxYIgbHViIHrFgsSFY3plLCBhYnkgemJhZGHEh1xuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHB4LTIuNSBweS0xIHJvdW5kZWQteGwgdGV4dC1lbWVyYWxkLTQwMCBwb2ludGVyLWV2ZW50cy1hdXRvXCI+XG4gICAgICAgICAgICAgIEFrdHl3bnljaCBaxYLEhWN6eToge2ZpbHRlcmVkTGlua3MubGVuZ3RofSAvIHtsaW5rcy5sZW5ndGh9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogU1ZHIE1hcCAqL31cbiAgICAgICAgICA8c3ZnXG4gICAgICAgICAgICByZWY9e3N2Z1JlZn1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBoLVs1MjBweF0gc2VsZWN0LW5vbmUgY3Vyc29yLWNyb3NzaGFpciBiZy1bcmFkaWFsLWdyYWRpZW50KGVsbGlwc2VfYXRfY2VudGVyLF92YXIoLS10dy1ncmFkaWVudC1zdG9wcykpXSBmcm9tLXNsYXRlLTkwMC80MCB2aWEtc2xhdGUtOTUwIHRvLWJsYWNrXCJcbiAgICAgICAgICAgIG9uTW91c2VNb3ZlPXtoYW5kbGVNb3VzZU1vdmVDYW52YXN9XG4gICAgICAgICAgICBvbk1vdXNlVXA9e2hhbmRsZU1vdXNlVXBDYW52YXN9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgIHNldFNlbGVjdGVkTGlua0lkKG51bGwpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7LyogR3JpZCBQYXR0ZXJuICovfVxuICAgICAgICAgICAgPGRlZnM+XG4gICAgICAgICAgICAgIDxwYXR0ZXJuIGlkPVwiZ3JpZC1wYXR0ZXJuXCIgd2lkdGg9XCIzMFwiIGhlaWdodD1cIjMwXCIgcGF0dGVyblVuaXRzPVwidXNlclNwYWNlT25Vc2VcIj5cbiAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTSAzMCAwIEwgMCAwIDAgMzBcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cInJnYmEoMCwgMjQwLCAyNTUsIDAuMDUpXCIgc3Ryb2tlV2lkdGg9XCIxXCIgLz5cbiAgICAgICAgICAgICAgPC9wYXR0ZXJuPlxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgey8qIEdsb3dpbmcgRmlsdGVycyAqL31cbiAgICAgICAgICAgICAgPGZpbHRlciBpZD1cImdsb3ctZW1lcmFsZFwiIHg9XCItMjAlXCIgeT1cIi0yMCVcIiB3aWR0aD1cIjE0MCVcIiBoZWlnaHQ9XCIxNDAlXCI+XG4gICAgICAgICAgICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj1cIjRcIiByZXN1bHQ9XCJibHVyXCIgLz5cbiAgICAgICAgICAgICAgICA8ZmVDb21wb3NpdGUgaW49XCJTb3VyY2VHcmFwaGljXCIgaW4yPVwiYmx1clwiIG9wZXJhdG9yPVwib3ZlclwiIC8+XG4gICAgICAgICAgICAgIDwvZmlsdGVyPlxuICAgICAgICAgICAgICA8ZmlsdGVyIGlkPVwiZ2xvdy1yZWRcIiB4PVwiLTIwJVwiIHk9XCItMjAlXCIgd2lkdGg9XCIxNDAlXCIgaGVpZ2h0PVwiMTQwJVwiPlxuICAgICAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249XCI1XCIgcmVzdWx0PVwiYmx1clwiIC8+XG4gICAgICAgICAgICAgICAgPGZlQ29tcG9zaXRlIGluPVwiU291cmNlR3JhcGhpY1wiIGluMj1cImJsdXJcIiBvcGVyYXRvcj1cIm92ZXJcIiAvPlxuICAgICAgICAgICAgICA8L2ZpbHRlcj5cbiAgICAgICAgICAgICAgPGZpbHRlciBpZD1cImdsb3ctbGFzZXJcIiB4PVwiLTMwJVwiIHk9XCItMzAlXCIgd2lkdGg9XCIxNjAlXCIgaGVpZ2h0PVwiMTYwJVwiPlxuICAgICAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249XCI2XCIgcmVzdWx0PVwiYmx1clwiIC8+XG4gICAgICAgICAgICAgICAgPGZlQ29tcG9zaXRlIGluPVwiU291cmNlR3JhcGhpY1wiIGluMj1cImJsdXJcIiBvcGVyYXRvcj1cIm92ZXJcIiAvPlxuICAgICAgICAgICAgICA8L2ZpbHRlcj5cbiAgICAgICAgICAgIDwvZGVmcz5cblxuICAgICAgICAgICAgPHJlY3Qgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIGZpbGw9XCJ1cmwoI2dyaWQtcGF0dGVybilcIiAvPlxuXG4gICAgICAgICAgICB7LyogMS4gUmVuZGVyIENvbm5lY3Rpb24gTGlua3MgKExpbmVzIC8gQ3VydmVzKSAqL31cbiAgICAgICAgICAgIHtmaWx0ZXJlZExpbmtzLm1hcChsaW5rID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qgc291cmNlTm9kZSA9IG5vZGVzLmZpbmQobiA9PiBuLmlkID09PSBsaW5rLnNvdXJjZU5vZGVJZCk7XG4gICAgICAgICAgICAgIGNvbnN0IHRhcmdldE5vZGUgPSBub2Rlcy5maW5kKG4gPT4gbi5pZCA9PT0gbGluay50YXJnZXROb2RlSWQpO1xuICAgICAgICAgICAgICBpZiAoIXNvdXJjZU5vZGUgfHwgIXRhcmdldE5vZGUpIHJldHVybiBudWxsO1xuXG4gICAgICAgICAgICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSBzZWxlY3RlZExpbmtJZCA9PT0gbGluay5pZDtcbiAgICAgICAgICAgICAgY29uc3QgY29sb3JDZmcgPSBnZXRBZ2dyZXNzaW9uQ29sb3IobGluay5hZ2dyZXNzaW9uU2NvcmUpO1xuICAgICAgICAgICAgICBjb25zdCBpc1NldmVyZWQgPSBsaW5rLnN0YXR1cyA9PT0gJ1NFVkVSRURfQkxPQ0tFRCc7XG4gICAgICAgICAgICAgIGNvbnN0IGlzUHVyZ2luZyA9IGxpbmsuc3RhdHVzID09PSAnUFVSR0lOR19MQVNFUic7XG5cbiAgICAgICAgICAgICAgLy8gTWlkcG9pbnQgZm9yIGN1cnZlIGNvbnRyb2xcbiAgICAgICAgICAgICAgY29uc3QgbWlkWCA9IChzb3VyY2VOb2RlLnggKyB0YXJnZXROb2RlLngpIC8gMjtcbiAgICAgICAgICAgICAgY29uc3QgbWlkWSA9IChzb3VyY2VOb2RlLnkgKyB0YXJnZXROb2RlLnkpIC8gMjtcbiAgICAgICAgICAgICAgY29uc3QgZHggPSB0YXJnZXROb2RlLnggLSBzb3VyY2VOb2RlLng7XG4gICAgICAgICAgICAgIGNvbnN0IGR5ID0gdGFyZ2V0Tm9kZS55IC0gc291cmNlTm9kZS55O1xuICAgICAgICAgICAgICBjb25zdCBub3JtID0gTWF0aC5oeXBvdChkeCwgZHkpIHx8IDE7XG4gICAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IDIwOyAvLyBjdXJ2ZSBjdXJ2YXR1cmVcbiAgICAgICAgICAgICAgY29uc3QgY3ggPSBtaWRYIC0gKGR5IC8gbm9ybSkgKiBvZmZzZXQ7XG4gICAgICAgICAgICAgIGNvbnN0IGN5ID0gbWlkWSArIChkeCAvIG5vcm0pICogb2Zmc2V0O1xuXG4gICAgICAgICAgICAgIGNvbnN0IHBhdGhEID0gYE0gJHtzb3VyY2VOb2RlLnh9ICR7c291cmNlTm9kZS55fSBRICR7Y3h9ICR7Y3l9ICR7dGFyZ2V0Tm9kZS54fSAke3RhcmdldE5vZGUueX1gO1xuXG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGcga2V5PXtsaW5rLmlkfSBjbGFzc05hbWU9XCJjdXJzb3ItcG9pbnRlclwiIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0ZWRMaW5rSWQobGluay5pZCk7XG4gICAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZE5vZGVJZChudWxsKTtcbiAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgIHsvKiBJbnZpc2libGUgYnJvYWQgc3Ryb2tlIGZvciBlYXNpZXIgY2xpY2tpbmcgKi99XG4gICAgICAgICAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgICAgICAgICBkPXtwYXRoRH1cbiAgICAgICAgICAgICAgICAgICAgZmlsbD1cIm5vbmVcIlxuICAgICAgICAgICAgICAgICAgICBzdHJva2U9XCJ0cmFuc3BhcmVudFwiXG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPVwiMTZcIlxuICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgey8qIE1haW4gTGluZSBTdHJva2UgKi99XG4gICAgICAgICAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgICAgICAgICBkPXtwYXRoRH1cbiAgICAgICAgICAgICAgICAgICAgZmlsbD1cIm5vbmVcIlxuICAgICAgICAgICAgICAgICAgICBzdHJva2U9e2lzU2V2ZXJlZCA/ICcjNDc1NTY5JyA6IGlzUHVyZ2luZyA/ICcjMDBmZmZmJyA6IGNvbG9yQ2ZnLnN0cm9rZX1cbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg9e2lzU2VsZWN0ZWQgPyAzLjUgOiBpc1B1cmdpbmcgPyAzIDogMn1cbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlRGFzaGFycmF5PXtpc1NldmVyZWQgPyAnNCw0JyA6IGlzUHVyZ2luZyA/ICc4LDQnIDogdW5kZWZpbmVkfVxuICAgICAgICAgICAgICAgICAgICBzdHJva2VPcGFjaXR5PXtpc1NlbGVjdGVkID8gMSA6IDAuOH1cbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyPXtpc1NlbGVjdGVkIHx8IGlzUHVyZ2luZyA/ICd1cmwoI2dsb3ctbGFzZXIpJyA6IHVuZGVmaW5lZH1cbiAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICAgIHsvKiBBbmltYXRlZCBUcmF2ZWxpbmcgRGF0YSBQYWNrZXRzIGFsb25nIFBhdGggKi99XG4gICAgICAgICAgICAgICAgICB7aXNBbmltYXRpb25BY3RpdmUgJiYgIWlzU2V2ZXJlZCAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgcj17bGluay5hZ2dyZXNzaW9uU2NvcmUgPiA1MCA/IDMuNSA6IDIuNX0gZmlsbD17aXNQdXJnaW5nID8gJyNmZmZmZmYnIDogY29sb3JDZmcuc3Ryb2tlfT5cbiAgICAgICAgICAgICAgICAgICAgICA8YW5pbWF0ZU1vdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aD17cGF0aER9XG4gICAgICAgICAgICAgICAgICAgICAgICBkdXI9e2Ake01hdGgubWF4KDAuNiwgMi41IC0gKGxpbmsucGFja2V0UmF0ZSAvIDEwMCkpfXNgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2NpcmNsZT5cbiAgICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICAgIHsvKiBNaWRwb2ludCBCYWRnZSAoVGhyZWF0ICYgR25pZGFzIENvdW50KSAqL31cbiAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgke2N4fSwgJHtjeX0pYH0+XG4gICAgICAgICAgICAgICAgICAgIDxjaXJjbGVcbiAgICAgICAgICAgICAgICAgICAgICByPVwiMTBcIlxuICAgICAgICAgICAgICAgICAgICAgIGZpbGw9XCIjMDIwNjE3XCJcbiAgICAgICAgICAgICAgICAgICAgICBzdHJva2U9e2NvbG9yQ2ZnLnN0cm9rZX1cbiAgICAgICAgICAgICAgICAgICAgICBzdHJva2VXaWR0aD1cIjEuNVwiXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDx0ZXh0XG4gICAgICAgICAgICAgICAgICAgICAgdGV4dEFuY2hvcj1cIm1pZGRsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgZHk9XCIzLjVcIlxuICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplPVwiOVwiXG4gICAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodD1cImJvbGRcIlxuICAgICAgICAgICAgICAgICAgICAgIGZpbGw9e2NvbG9yQ2ZnLnN0cm9rZX1cbiAgICAgICAgICAgICAgICAgICAgICBmb250RmFtaWx5PVwibW9ub3NwYWNlXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIHtsaW5rLmduaWRhc0RldGVjdGVkID4gMCA/IGAhJHtsaW5rLmduaWRhc0RldGVjdGVkfWAgOiAn4pyTJ31cbiAgICAgICAgICAgICAgICAgICAgPC90ZXh0PlxuICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pfVxuXG4gICAgICAgICAgICB7LyogMi4gUmVuZGVyIFByb2Nlc3MgTm9kZXMgKi99XG4gICAgICAgICAgICB7bm9kZXMubWFwKG5vZGUgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gc2VsZWN0ZWROb2RlSWQgPT09IG5vZGUuaWQ7XG4gICAgICAgICAgICAgIGNvbnN0IGNvbG9yQ2ZnID0gZ2V0QWdncmVzc2lvbkNvbG9yKG5vZGUuYWdncmVzc2lvbkxldmVsKTtcbiAgICAgICAgICAgICAgY29uc3QgaXNCYXNlQ29yZSA9IG5vZGUubm9kZVR5cGUgPT09ICdTRUNVUklUWV9HQVJSSVNPTic7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8Z1xuICAgICAgICAgICAgICAgICAga2V5PXtub2RlLmlkfVxuICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKCR7bm9kZS54fSwgJHtub2RlLnl9KWB9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJjdXJzb3ItZ3JhYiBhY3RpdmU6Y3Vyc29yLWdyYWJiaW5nXCJcbiAgICAgICAgICAgICAgICAgIG9uTW91c2VEb3duPXsoZSkgPT4gaGFuZGxlTW91c2VEb3duTm9kZShub2RlLmlkLCBlKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7LyogT3V0ZXIgUHVsc2luZyBBZ2dyZXNzaW9uIEF1cmEgKi99XG4gICAgICAgICAgICAgICAgICB7bm9kZS5hZ2dyZXNzaW9uTGV2ZWwgPiA1MCAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxjaXJjbGVcbiAgICAgICAgICAgICAgICAgICAgICByPVwiMjhcIlxuICAgICAgICAgICAgICAgICAgICAgIGZpbGw9XCJub25lXCJcbiAgICAgICAgICAgICAgICAgICAgICBzdHJva2U9e2NvbG9yQ2ZnLnN0cm9rZX1cbiAgICAgICAgICAgICAgICAgICAgICBzdHJva2VXaWR0aD1cIjEuNVwiXG4gICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlT3BhY2l0eT1cIjAuNFwiXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYW5pbWF0ZS1waW5nXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICAgIHsvKiBPdXRlciBTZWxlY3Rpb24gUmluZyAqL31cbiAgICAgICAgICAgICAgICAgIHtpc1NlbGVjdGVkICYmIChcbiAgICAgICAgICAgICAgICAgICAgPGNpcmNsZVxuICAgICAgICAgICAgICAgICAgICAgIHI9XCIyNVwiXG4gICAgICAgICAgICAgICAgICAgICAgZmlsbD1cIm5vbmVcIlxuICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZT1cIiMwMGZmZmZcIlxuICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPVwiMlwiXG4gICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlRGFzaGFycmF5PVwiNCwzXCJcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhbmltYXRlLXNwaW5cIlxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgICAgey8qIE5vZGUgQmFja2dyb3VuZCBCYXNlICovfVxuICAgICAgICAgICAgICAgICAgPGNpcmNsZVxuICAgICAgICAgICAgICAgICAgICByPVwiMjBcIlxuICAgICAgICAgICAgICAgICAgICBmaWxsPXtpc0Jhc2VDb3JlID8gJyMwNjRlM2InIDogJyMwOTBkMTYnfVxuICAgICAgICAgICAgICAgICAgICBzdHJva2U9e2lzU2VsZWN0ZWQgPyAnIzAwZmZmZicgOiBjb2xvckNmZy5zdHJva2V9XG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPXtpc1NlbGVjdGVkID8gMi41IDogMn1cbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyPXtpc1NlbGVjdGVkID8gJ3VybCgjZ2xvdy1sYXNlciknIDogdW5kZWZpbmVkfVxuICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgey8qIE5vZGUgSW5uZXIgU3ltYm9sIC8gVGV4dCAqL31cbiAgICAgICAgICAgICAgICAgIDx0ZXh0XG4gICAgICAgICAgICAgICAgICAgIHRleHRBbmNob3I9XCJtaWRkbGVcIlxuICAgICAgICAgICAgICAgICAgICBkeT1cIjRcIlxuICAgICAgICAgICAgICAgICAgICBmb250U2l6ZT1cIjEwXCJcbiAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodD1cImJvbGRcIlxuICAgICAgICAgICAgICAgICAgICBmaWxsPXtpc0Jhc2VDb3JlID8gJyMzNGQzOTknIDogY29sb3JDZmcuc3Ryb2tlfVxuICAgICAgICAgICAgICAgICAgICBmb250RmFtaWx5PVwibW9ub3NwYWNlXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge2lzQmFzZUNvcmUgPyAn8J+boe+4jycgOiBub2RlLmduaWRhc0NvdW50ID4gMCA/IGDimKPvuI8ke25vZGUuZ25pZGFzQ291bnR9YCA6ICfimqEnfVxuICAgICAgICAgICAgICAgICAgPC90ZXh0PlxuXG4gICAgICAgICAgICAgICAgICB7LyogTm9kZSBOYW1lIFRhZyAqL31cbiAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwLCAzMilcIj5cbiAgICAgICAgICAgICAgICAgICAgPHJlY3RcbiAgICAgICAgICAgICAgICAgICAgICB4PVwiLTY1XCJcbiAgICAgICAgICAgICAgICAgICAgICB5PVwiLThcIlxuICAgICAgICAgICAgICAgICAgICAgIHdpZHRoPVwiMTMwXCJcbiAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ9XCIxNlwiXG4gICAgICAgICAgICAgICAgICAgICAgcng9XCI4XCJcbiAgICAgICAgICAgICAgICAgICAgICBmaWxsPVwiIzAyMDYxN1wiXG4gICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlPXtjb2xvckNmZy5zdHJva2V9XG4gICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg9XCIwLjhcIlxuICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZU9wYWNpdHk9XCIwLjdcIlxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8dGV4dFxuICAgICAgICAgICAgICAgICAgICAgIHRleHRBbmNob3I9XCJtaWRkbGVcIlxuICAgICAgICAgICAgICAgICAgICAgIGR5PVwiMy41XCJcbiAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZT1cIjhcIlxuICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ9XCJib2xkXCJcbiAgICAgICAgICAgICAgICAgICAgICBmaWxsPVwiI2Y4ZmFmY1wiXG4gICAgICAgICAgICAgICAgICAgICAgZm9udEZhbWlseT1cIm1vbm9zcGFjZVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICB7bm9kZS5uYW1lLmxlbmd0aCA+IDIwID8gbm9kZS5uYW1lLnNsaWNlKDAsIDE4KSArICfigKYnIDogbm9kZS5uYW1lfVxuICAgICAgICAgICAgICAgICAgICA8L3RleHQ+XG4gICAgICAgICAgICAgICAgICA8L2c+XG5cbiAgICAgICAgICAgICAgICAgIHsvKiBQSUQgLyBBZ2dyZXNzaW9uIFN1YnRhZyAqL31cbiAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwLCA0NylcIj5cbiAgICAgICAgICAgICAgICAgICAgPHRleHRcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0QW5jaG9yPVwibWlkZGxlXCJcbiAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZT1cIjdcIlxuICAgICAgICAgICAgICAgICAgICAgIGZpbGw9e2NvbG9yQ2ZnLnN0cm9rZX1cbiAgICAgICAgICAgICAgICAgICAgICBmb250RmFtaWx5PVwibW9ub3NwYWNlXCJcbiAgICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0PVwiYm9sZFwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICBQSUQ6IHtub2RlLnBpZH0gfCB7bm9kZS5hZ2dyZXNzaW9uTGV2ZWx9JSBBR1JFU0pBXG4gICAgICAgICAgICAgICAgICAgIDwvdGV4dD5cbiAgICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIFJpZ2h0OiBEZXRhaWxlZCBUZWxlbWV0cnkgSW5zcGVjdG9yIFBhbmVsICg0IGNvbHMpICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTQgc3BhY2UteS00XCI+XG4gICAgICAgICAgXG4gICAgICAgICAgey8qIEluc3BlY3Rpb24gTW9kZTogU2VsZWN0ZWQgTGluayAqL31cbiAgICAgICAgICB7c2VsZWN0ZWRMaW5rICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQtM3hsIGJnLXNsYXRlLTkwMC85MCBib3JkZXItMiBib3JkZXItY3lhbi01MDAvNjAgc2hhZG93LXhsIHNwYWNlLXktMy41XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAgcGItMi41XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1vbm8gZm9udC1ibGFjayB0ZXh0LWN5YW4tMzAwIHVwcGVyY2FzZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICA8UmFkaW8gY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWN5YW4tNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPkluc3Bla2NqYSBaxYLEhWN6YSBJL088L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHB4LTIgcHktMC41IHJvdW5kZWQgdGV4dC1bMTBweF0gZm9udC1tb25vIGZvbnQtYm9sZCAke1xuICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRMaW5rLnN0YXR1cyA9PT0gJ0NMRUFOU0VEX1NFQ1VSRScgPyAnYmctZW1lcmFsZC05NTAgdGV4dC1lbWVyYWxkLTMwMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNTAwJyA6ICdiZy1yb3NlLTk1MCB0ZXh0LXJvc2UtMzAwIGJvcmRlciBib3JkZXItcm9zZS01MDAnXG4gICAgICAgICAgICAgICAgfWB9PlxuICAgICAgICAgICAgICAgICAge3NlbGVjdGVkTGluay5zdGF0dXN9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtYm9sZCBmb250LW1vbm8gdGV4dC13aGl0ZVwiPntzZWxlY3RlZExpbmsuY29ubmVjdG9yTmFtZX08L2g0PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1tb25vIHRleHQtc2xhdGUtNDAwIG10LTAuNVwiPlxuICAgICAgICAgICAgICAgICAgUHJvdG9rw7PFgjogPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LWN5YW4tMzAwXCI+e3NlbGVjdGVkTGluay5wcm90b2NvbH08L3N0cm9uZz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIE1ldHJpY3MgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtMiB0ZXh0LXhzIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yIHJvdW5kZWQteGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMFwiPkduaWQgbmEgesWCxIVjenU6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWJhc2UgZm9udC1ibGFjayB0ZXh0LXJvc2UtNDAwXCI+XG4gICAgICAgICAgICAgICAgICAgIHtzZWxlY3RlZExpbmsuZ25pZGFzRGV0ZWN0ZWR9IDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIGZvbnQtbm9ybWFsXCI+LyB7c2VsZWN0ZWRMaW5rLmduaWRhc1B1cmdlZH0gcHVyZ2VkPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMiByb3VuZGVkLXhsIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDBcIj5Qb3ppb20gQWdyZXNqaTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHRleHQtYmFzZSBmb250LWJsYWNrICR7Z2V0QWdncmVzc2lvbkNvbG9yKHNlbGVjdGVkTGluay5hZ2dyZXNzaW9uU2NvcmUpLnRleHR9YH0+XG4gICAgICAgICAgICAgICAgICAgIHtzZWxlY3RlZExpbmsuYWdncmVzc2lvblNjb3JlfSVcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwXCI+UHJ6ZXB1c3Rvd2/Fm8SHOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC1zbGF0ZS0yMDAgbXQtMC41XCI+e3NlbGVjdGVkTGluay5iYW5kd2lkdGh9PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMiByb3VuZGVkLXhsIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDBcIj5QYWtpZXR5IC8gc2VrOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC1jeWFuLTMwMCBtdC0wLjVcIj57c2VsZWN0ZWRMaW5rLnBhY2tldFJhdGV9IHBrdC9zPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBUaHJlYXQgRGVzY3JpcHRpb24gJiBQYXlsb2FkIFNhbXBsZSAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIuNSByb3VuZGVkLXhsIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LVsxMXB4XSBmb250LW1vbm8gc3BhY2UteS0xXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMFwiPldla3RvciBaYWdyb8W8ZW5pYTo8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMjAwXCI+e3NlbGVjdGVkTGluay50aHJlYXREZXNjcmlwdGlvbn08L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0LTEgdGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDBcIj5Pc3RhdG5pYSBQcsOzYmthIFBha2lldHU6PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LWN5YW4tMzAwIGJnLXNsYXRlLTkwMCBwLTEuNSByb3VuZGVkIGZvbnQtbW9ubyB0cnVuY2F0ZVwiPlxuICAgICAgICAgICAgICAgICAge3NlbGVjdGVkTGluay5sYXN0UGF5bG9hZFNhbXBsZX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIEFjdGlvbiBCdXR0b25zIGZvciB0aGlzIGxpbmsgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHQtMVwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVB1cmdlU2VsZWN0ZWRMaW5rfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC0xIHB5LTIgcHgtMyByb3VuZGVkLXhsIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1lbWVyYWxkLTUwMCB0by10ZWFsLTUwMCBob3Zlcjpmcm9tLWVtZXJhbGQtNDAwIGhvdmVyOnRvLXRlYWwtNDAwIHRleHQtYmxhY2sgZm9udC1tb25vIGZvbnQtYmxhY2sgdGV4dC14cyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMS41IGN1cnNvci1wb2ludGVyIHNoYWRvdyBhY3RpdmU6c2NhbGUtOTUgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxaYXAgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgZmlsbC1ibGFja1wiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5XeXBhbCBaxYLEhWN6ZSBMYXNlcmVtPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlU2V2ZXJTZWxlY3RlZExpbmt9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweS0yIHB4LTMgcm91bmRlZC14bCBiZy1yb3NlLTk1MCBob3ZlcjpiZy1yb3NlLTkwMCBib3JkZXIgYm9yZGVyLXJvc2UtNTAwIHRleHQtcm9zZS0yMDAgZm9udC1tb25vIGZvbnQtYm9sZCB0ZXh0LXhzIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xIGN1cnNvci1wb2ludGVyIGFjdGl2ZTpzY2FsZS05NSB0cmFuc2l0aW9uLWFsbFwiXG4gICAgICAgICAgICAgICAgICB0aXRsZT1cIk9kY2nEmWNpZSBwb8WCxIVjemVuaWEgaSB6ZXJ3YW5pZSBnbmlhemRhXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8U2Npc3NvcnMgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+T2RldG5pajwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAgey8qIEluc3BlY3Rpb24gTW9kZTogU2VsZWN0ZWQgTm9kZSAqL31cbiAgICAgICAgICB7c2VsZWN0ZWROb2RlICYmICFzZWxlY3RlZExpbmsgJiYgKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC0zeGwgYmctc2xhdGUtOTAwLzkwIGJvcmRlci0yIGJvcmRlci1zbGF0ZS04MDAgc2hhZG93LXhsIHNwYWNlLXktMy41XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAgcGItMi41XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1vbm8gZm9udC1ibGFjayB0ZXh0LWN5YW4tMzAwIHVwcGVyY2FzZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICB7cmVuZGVyTm9kZUljb24oc2VsZWN0ZWROb2RlLmljb25OYW1lKX1cbiAgICAgICAgICAgICAgICAgIDxzcGFuPkluc3Bla2NqYSBQcm9jZXN1PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2BweC0yIHB5LTAuNSByb3VuZGVkIHRleHQtWzEwcHhdIGZvbnQtbW9ubyBmb250LWJvbGQgJHtcbiAgICAgICAgICAgICAgICAgIHNlbGVjdGVkTm9kZS5zdGF0dXMgPT09ICdTRUNVUkVEJyA/ICdiZy1lbWVyYWxkLTk1MCB0ZXh0LWVtZXJhbGQtMzAwIGJvcmRlciBib3JkZXItZW1lcmFsZC01MDAnIDogJ2JnLXJvc2UtOTUwIHRleHQtcm9zZS0zMDAgYm9yZGVyIGJvcmRlci1yb3NlLTUwMCdcbiAgICAgICAgICAgICAgICB9YH0+XG4gICAgICAgICAgICAgICAgICB7c2VsZWN0ZWROb2RlLnN0YXR1c31cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIGZvbnQtbW9ubyB0ZXh0LXdoaXRlXCI+e3NlbGVjdGVkTm9kZS5uYW1lfTwvaDQ+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSBmb250LW1vbm8gdGV4dC1zbGF0ZS00MDAgbXQtMC41XCI+XG4gICAgICAgICAgICAgICAgICBQbGlrIFd5a29ueXdhbG55OiA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtY3lhbi0zMDBcIj57c2VsZWN0ZWROb2RlLnByb2Nlc3NOYW1lfTwvc3Ryb25nPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIHRleHQtc2xhdGUtNTAwIG10LTAuNVwiPkthdGVnb3JpYToge3NlbGVjdGVkTm9kZS5jYXRlZ29yeX08L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIE5vZGUgTWV0cmljcyAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0yIHRleHQteHMgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwXCI+UElEIFByb2Nlc3U6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtYmxhY2sgdGV4dC1jeWFuLTQwMCBtdC0wLjVcIj4je3NlbGVjdGVkTm9kZS5waWR9PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMiByb3VuZGVkLXhsIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDBcIj5TdG9waWXFhCBBZ3Jlc2ppOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgdGV4dC1zbSBmb250LWJsYWNrICR7Z2V0QWdncmVzc2lvbkNvbG9yKHNlbGVjdGVkTm9kZS5hZ2dyZXNzaW9uTGV2ZWwpLnRleHR9YH0+XG4gICAgICAgICAgICAgICAgICAgIHtzZWxlY3RlZE5vZGUuYWdncmVzc2lvbkxldmVsfSVcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwXCI+R25pZCB3IFByb2Nlc2llOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJsYWNrIHRleHQtcm9zZS00MDBcIj57c2VsZWN0ZWROb2RlLmduaWRhc0NvdW50fTwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwXCI+T2JjacSFxbxlbmllIENQVTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ibGFjayB0ZXh0LXNsYXRlLTIwMFwiPntzZWxlY3RlZE5vZGUuY3B1TG9hZH0lPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yLjUgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1bMTFweF0gZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDBcIj5PcGlzIE9wZXJhY3lqbnk6PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMjAwIG10LTAuNSBsZWFkaW5nLXJlbGF4ZWRcIj57c2VsZWN0ZWROb2RlLmRlc2NyaXB0aW9ufTwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAge3NlbGVjdGVkTm9kZS5zdGF0dXMgIT09ICdTRUNVUkVEJyAmJiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlRGlzaW5mZWN0U2VsZWN0ZWROb2RlfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB5LTIuNSBweC0zIHJvdW5kZWQteGwgYmctZ3JhZGllbnQtdG8tciBmcm9tLWVtZXJhbGQtNTAwIHRvLWN5YW4tNTAwIGhvdmVyOmZyb20tZW1lcmFsZC00MDAgaG92ZXI6dG8tY3lhbi00MDAgdGV4dC1ibGFjayBmb250LW1vbm8gZm9udC1ibGFjayB0ZXh0LXhzIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xLjUgY3Vyc29yLXBvaW50ZXIgc2hhZG93IGFjdGl2ZTpzY2FsZS05NSB0cmFuc2l0aW9uLWFsbFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPFNoaWVsZENoZWNrIGNsYXNzTmFtZT1cInctNCBoLTQgZmlsbC1ibGFja1wiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5EZXp5bmZla3VqIFByb2NlcyAmIFdzenlzdGtpZSBaxYLEhWN6YTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7LyogUXVpY2sgQWdncmVnYXRlIFN0YXRzIENhcmQgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMuNSByb3VuZGVkLTN4bCBiZy1zbGF0ZS05MDAvNjAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgdGV4dC14cyBmb250LW1vbm8gc3BhY2UteS0yXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZSBmb250LWJvbGRcIj5aYmlvcmN6eSBCaWxhbnMgUG/FgsSFY3plxYQ6PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LXNsYXRlLTMwMFwiPlxuICAgICAgICAgICAgICA8c3Bhbj5XxJl6xYLDs3cgdyBzaWVjaTo8L3NwYW4+XG4gICAgICAgICAgICAgIDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC1jeWFuLTMwMFwiPntub2Rlcy5sZW5ndGh9IHByb2Nlc8Ozdzwvc3Ryb25nPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LXNsYXRlLTMwMFwiPlxuICAgICAgICAgICAgICA8c3Bhbj5axYLEhWN6eSBrb211bmlrYWN5am55Y2g6PC9zcGFuPlxuICAgICAgICAgICAgICA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtY3lhbi0zMDBcIj57bGlua3MubGVuZ3RofSBtYWdpc3RyYWw8L3N0cm9uZz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC1zbGF0ZS0zMDBcIj5cbiAgICAgICAgICAgICAgPHNwYW4+V3lwYWxvbnljaCBnbmlkIMWCxIVjem5pZTo8L3NwYW4+XG4gICAgICAgICAgICAgIDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC1lbWVyYWxkLTQwMFwiPnt0b3RhbFB1cmdlZE9uTWF0cml4fSB6bmV1dHJhbGl6b3dhbnljaDwvc3Ryb25nPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICA8L2Rpdj5cblxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdLCJtYXBwaW5ncyI6IkFBeUdpQztBQXpHakMsU0FBZ0IsVUFBVSxXQUFXLFFBQVEsZUFBZTtBQUM1RDtBQUFBLEVBQ0U7QUFBQSxFQUFPO0FBQUEsRUFBSztBQUFBLEVBQWE7QUFBQSxFQUFPO0FBQUEsRUFBSztBQUFBLEVBQU87QUFBQSxFQUM1QztBQUFBLEVBQWU7QUFBQSxFQUFXO0FBQUEsRUFBb0I7QUFBQSxFQUM5QztBQUFBLEVBQXlCO0FBQUEsRUFBTTtBQUFBLEVBQXNCO0FBQUEsRUFDSDtBQUFB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