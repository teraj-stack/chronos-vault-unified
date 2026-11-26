import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-toolkit/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=019a4779"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-toolkit/node_modules/.vite/deps/react.js?v=019a4779"; const useEffect = __vite__cjsImport1_react["useEffect"]; const useRef = __vite__cjsImport1_react["useRef"]; const useState = __vite__cjsImport1_react["useState"]; const useMemo = __vite__cjsImport1_react["useMemo"];
import * as d3 from "/sentinel-toolkit/node_modules/.vite/deps/d3.js?v=fbdf8837";
import {
  PieChart as PieIcon,
  RefreshCw
} from "/sentinel-toolkit/node_modules/.vite/deps/lucide-react.js?v=6cbc5a0a";
const DEFAULT_THREAT_CATEGORIES = [
  {
    id: "flutter_overlay",
    label: "Flutter Overlay & Screen Hijackers",
    shortLabel: "Flutter Overlay",
    count: 142,
    color: "#8b5cf6",
    // purple-500
    glowColor: "rgba(139, 92, 246, 0.4)",
    primaryVector: "bitsdojo_window / window_manager z wymuszeniem HWND_TOPMOST i blokadą Alt+Tab",
    neutralizationMethod: "NtSuspendProcess -> Zdjęcie HWND_TOPMOST -> Nadpisanie nagłówka PE zerami",
    typicalApis: ["SetWindowPos(HWND_TOPMOST)", "window_manager.setPreventClose", "SetForegroundWindow"],
    severity: "CRITICAL"
  },
  {
    id: "keyboard_hook",
    label: "Hook Klawiatury & Focus Stealers",
    shortLabel: "Hook Klawiatury",
    count: 118,
    color: "#06b6d4",
    // cyan-500
    glowColor: "rgba(6, 182, 212, 0.4)",
    primaryVector: "Globalny WH_KEYBOARD_LL blokujący ESC, WIN, TAB i rejestrujący znaki",
    neutralizationMethod: "UnhookWindowsHookEx -> Zwolnienie procedury hooka z pamięci -> Ubój wątku",
    typicalApis: ["SetWindowsHookExW(WH_KEYBOARD_LL)", "CallNextHookEx", "GetAsyncKeyState"],
    severity: "HIGH"
  },
  {
    id: "mbr_wiper",
    label: "Destrukcyjne procesy MBR & Disk Wiper",
    shortLabel: "Procesy MBR / Wiper",
    count: 86,
    color: "#ef4444",
    // red-500
    glowColor: "rgba(239, 68, 68, 0.4)",
    primaryVector: "Bezpośredni zapis do \\\\.\\PhysicalDrive0 i zerowanie tablicy partycji GPT/MBR",
    neutralizationMethod: "Odebranie SeLoadDriverPrivilege -> Zwolnienie FSCTL_LOCK_VOLUME -> Twardy SIGKILL",
    typicalApis: ["CreateFileW(PhysicalDrive0)", "DeviceIoControl(FSCTL_LOCK)", "NtRaiseHardError"],
    severity: "EXTREME"
  },
  {
    id: "layered_stealer",
    label: "Infostealer & Przezroczyste Okna WS_EX_LAYERED",
    shortLabel: "WS_EX_LAYERED Spy",
    count: 94,
    color: "#f59e0b",
    // amber-500
    glowColor: "rgba(245, 158, 11, 0.4)",
    primaryVector: "Przezroczysta nakładka z WS_EX_TRANSPARENT kradnąca kliknięcia i dane formularzy",
    neutralizationMethod: "Zresetowanie socketów C2 (MIB_TCP_STATE_DELETE) -> Blokada rejestru IFEO",
    typicalApis: ["SetWindowLongPtr(WS_EX_LAYERED)", "VirtualAllocEx", "SetClipboardData"],
    severity: "HIGH"
  },
  {
    id: "ransom_locker",
    label: "Ransomware & Niszczyciele Kopii Cieniowych VSS",
    shortLabel: "Ransomware / VSS",
    count: 73,
    color: "#ec4899",
    // pink-500
    glowColor: "rgba(236, 72, 153, 0.4)",
    primaryVector: "Asynchroniczne szyfrowanie ChaCha20 + vssadmin delete shadows /all /quiet",
    neutralizationMethod: "Wielowątkowe zamrożenie NtSuspendProcess -> Ochrona wolumenów VSS -> Odblokowanie taskmgr",
    typicalApis: ["OpenSCManagerW", "vssadmin.exe delete shadows", "CryptGenRandom"],
    severity: "CRITICAL"
  },
  {
    id: "memory_injection",
    label: "Iniekcje Pamięci & APC / Ghost Threads",
    shortLabel: "Ghost Memory APC",
    count: 65,
    color: "#10b981",
    // emerald-500
    glowColor: "rgba(16, 185, 129, 0.4)",
    primaryVector: "Wstrzykiwanie shellcode do explorer.exe za pomocą QueueUserAPC i Process Hollowing",
    neutralizationMethod: "NtUnmapViewOfSection -> Zwolnienie VirtualFreeEx -> Zrzucenie wątku potomnego",
    typicalApis: ["QueueUserAPC", "NtCreateSection", "WriteProcessMemory"],
    severity: "HIGH"
  }
];
export const ThreatDistributionPieChart = ({
  onSelectCategory,
  additionalTargetThreat
}) => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [categories, setCategories] = useState(DEFAULT_THREAT_CATEGORIES);
  const [selectedCategoryId, setSelectedCategoryId] = useState("flutter_overlay");
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
  const [chartMode, setChartMode] = useState("donut");
  const [filterSeverity, setFilterSeverity] = useState("ALL");
  const filteredData = useMemo(() => {
    let list = categories;
    if (filterSeverity !== "ALL") {
      list = list.filter((item) => item.severity === filterSeverity);
    }
    const total = list.reduce((sum, item) => sum + item.count, 0);
    return list.map((item) => ({
      ...item,
      percentage: total > 0 ? item.count / total * 100 : 0
    }));
  }, [categories, filterSeverity]);
  const totalThreatsCount = useMemo(() => {
    return filteredData.reduce((acc, curr) => acc + curr.count, 0);
  }, [filteredData]);
  const activeCategory = useMemo(() => {
    const targetId = hoveredCategoryId || selectedCategoryId;
    return filteredData.find((c) => c.id === targetId) || filteredData[0] || null;
  }, [hoveredCategoryId, selectedCategoryId, filteredData]);
  const handleSimulateNeutralization = () => {
    const availableIds = ["flutter_overlay", "keyboard_hook", "mbr_wiper", "layered_stealer", "ransom_locker", "memory_injection"];
    const randomId = availableIds[Math.floor(Math.random() * availableIds.length)];
    const increment = Math.floor(Math.random() * 8) + 3;
    setCategories((prev) => prev.map((item) => {
      if (item.id === randomId) {
        return { ...item, count: item.count + increment };
      }
      return item;
    }));
    setSelectedCategoryId(randomId);
  };
  const handleResetData = () => {
    setCategories(DEFAULT_THREAT_CATEGORIES);
  };
  useEffect(() => {
    if (!svgRef.current || filteredData.length === 0) return;
    const width = 360;
    const height = 360;
    const radius = Math.min(width, height) / 2;
    const innerRadius = chartMode === "donut" ? radius * 0.58 : 0;
    const hoverOuterRadius = radius - 6;
    const baseOuterRadius = radius - 16;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    const g = svg.attr("viewBox", `0 0 ${width} ${height}`).attr("width", "100%").attr("height", "100%").append("g").attr("transform", `translate(${width / 2}, ${height / 2})`);
    const pie = d3.pie().value((d) => d.count).sort(null).padAngle(0.025);
    const arcGenerator = d3.arc().innerRadius(innerRadius).outerRadius((d) => {
      const isHovered = d.data.id === (hoveredCategoryId || selectedCategoryId);
      return isHovered ? hoverOuterRadius : baseOuterRadius;
    }).cornerRadius(4);
    const outlineArc = d3.arc().innerRadius(innerRadius > 0 ? innerRadius - 3 : 0).outerRadius(baseOuterRadius + 3).cornerRadius(4);
    const pieData = pie(filteredData);
    const defs = svg.append("defs");
    filteredData.forEach((d) => {
      const filter = defs.append("filter").attr("id", `glow-${d.id}`).attr("x", "-50%").attr("y", "-50%").attr("width", "200%").attr("height", "200%");
      filter.append("feGaussianBlur").attr("stdDeviation", "4").attr("result", "coloredBlur");
      const feMerge = filter.append("feMerge");
      feMerge.append("feMergeNode").attr("in", "coloredBlur");
      feMerge.append("feMergeNode").attr("in", "SourceGraphic");
    });
    g.append("circle").attr("r", baseOuterRadius + 10).attr("fill", "none").attr("stroke", "#334155").attr("stroke-width", 1).attr("stroke-dasharray", "4 4").attr("opacity", 0.5);
    const sliceGroups = g.selectAll(".arc").data(pieData).enter().append("g").attr("class", "arc").style("cursor", "pointer");
    sliceGroups.append("path").attr("d", arcGenerator).attr("fill", (d) => d.data.color).attr("stroke", "#0f172a").attr("stroke-width", 2.5).attr("opacity", (d) => {
      const isTarget = d.data.id === (hoveredCategoryId || selectedCategoryId);
      if (hoveredCategoryId || selectedCategoryId) {
        return isTarget ? 1 : 0.65;
      }
      return 0.9;
    }).style("filter", (d) => {
      const isTarget = d.data.id === (hoveredCategoryId || selectedCategoryId);
      return isTarget ? `url(#glow-${d.data.id})` : "none";
    }).on("mouseenter", function(event, d) {
      setHoveredCategoryId(d.data.id);
      d3.select(this).transition().duration(180).attr("opacity", 1).attr(
        "d",
        d3.arc().innerRadius(innerRadius).outerRadius(hoverOuterRadius).cornerRadius(4)
      );
    }).on("mouseleave", function() {
      setHoveredCategoryId(null);
    }).on("click", function(event, d) {
      setSelectedCategoryId(d.data.id);
      if (onSelectCategory) {
        onSelectCategory(d.data);
      }
    });
    sliceGroups.append("text").attr("transform", (d) => {
      const [x, y] = arcGenerator.centroid(d);
      return `translate(${x}, ${y})`;
    }).attr("text-anchor", "middle").attr("dy", ".35em").attr("font-size", "10px").attr("font-family", "ui-monospace, monospace").attr("font-weight", "bold").attr("fill", "#ffffff").attr("pointer-events", "none").text((d) => {
      const pct = d.data.percentage || 0;
      return pct >= 8 ? `${pct.toFixed(0)}%` : "";
    });
    if (chartMode === "donut" && activeCategory) {
      const centerG = g.append("g").attr("class", "center-info").attr("pointer-events", "none");
      centerG.append("text").attr("text-anchor", "middle").attr("dy", "-18px").attr("font-size", "10px").attr("font-family", "ui-monospace, monospace").attr("fill", "#94a3b8").text("UDZIAŁ KATEGORII");
      centerG.append("text").attr("text-anchor", "middle").attr("dy", "6px").attr("font-size", "20px").attr("font-family", "ui-monospace, monospace").attr("font-weight", "900").attr("fill", activeCategory.color).text(`${(activeCategory.percentage || 0).toFixed(1)}%`);
      centerG.append("text").attr("text-anchor", "middle").attr("dy", "24px").attr("font-size", "11px").attr("font-family", "ui-sans-serif, system-ui").attr("font-weight", "bold").attr("fill", "#f8fafc").text(`${activeCategory.count} zneutralizowanych`);
    }
  }, [filteredData, chartMode, hoveredCategoryId, selectedCategoryId, activeCategory, onSelectCategory]);
  return /* @__PURE__ */ jsxDEV("div", { className: "p-5 rounded-2xl bg-slate-900/90 border border-purple-900/60 shadow-2xl relative overflow-hidden backdrop-blur-sm", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "p-1.5 rounded-lg bg-purple-600/20 border border-purple-500/40 text-purple-300", children: /* @__PURE__ */ jsxDEV(PieIcon, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
            fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
            lineNumber: 339,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
            lineNumber: 338,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-bold text-white flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV("span", { children: "Rozkład Zneutralizowanych Zagrożeń" }, void 0, false, {
              fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
              lineNumber: 342,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-700/60", children: "d3.js Engine" }, void 0, false, {
              fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
              lineNumber: 343,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
            lineNumber: 341,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
          lineNumber: 337,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 mt-1", children: [
          "Dynamiczna analiza kryminalistyczna proporcji ataków i wektorów w pamięci RAM. Łącznie zutylizowano: ",
          /* @__PURE__ */ jsxDEV("strong", { className: "text-purple-300 font-mono", children: [
            totalThreatsCount,
            " procesów"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
            lineNumber: 349,
            columnNumber: 114
          }, this),
          "."
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
          lineNumber: 348,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
        lineNumber: 336,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-mono", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setChartMode("donut"),
              className: `px-2 py-0.5 rounded transition-colors cursor-pointer ${chartMode === "donut" ? "bg-purple-600 text-white font-bold" : "text-slate-400 hover:text-white"}`,
              children: "Donut"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
              lineNumber: 357,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setChartMode("solid"),
              className: `px-2 py-0.5 rounded transition-colors cursor-pointer ${chartMode === "solid" ? "bg-purple-600 text-white font-bold" : "text-slate-400 hover:text-white"}`,
              children: "Pełne Koło"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
              lineNumber: 365,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
          lineNumber: 356,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(
          "select",
          {
            value: filterSeverity,
            onChange: (e) => setFilterSeverity(e.target.value),
            className: "px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 focus:outline-none focus:border-purple-500",
            children: [
              /* @__PURE__ */ jsxDEV("option", { value: "ALL", children: "Wszystkie Poziomy" }, void 0, false, {
                fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
                lineNumber: 381,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "CRITICAL", children: "Tylko CRITICAL" }, void 0, false, {
                fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
                lineNumber: 382,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "EXTREME", children: "Tylko EXTREME" }, void 0, false, {
                fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
                lineNumber: 383,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
            lineNumber: 376,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleSimulateNeutralization,
            className: "px-2.5 py-1 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow transition-all cursor-pointer",
            title: "Zarejestruj nowo zneutralizowane zagrożenie w bazie",
            children: [
              /* @__PURE__ */ jsxDEV(RefreshCw, { className: "w-3 h-3 animate-spin", style: { animationDuration: "6s" } }, void 0, false, {
                fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
                lineNumber: 392,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "+ Rejestruj Ubój" }, void 0, false, {
                fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
                lineNumber: 393,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
            lineNumber: 387,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
        lineNumber: 354,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
      lineNumber: 335,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-5 mt-4 items-center", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-5 flex flex-col items-center justify-center p-2 relative", children: [
        /* @__PURE__ */ jsxDEV(
          "div",
          {
            ref: containerRef,
            className: "w-full max-w-[340px] aspect-square relative flex items-center justify-center",
            children: /* @__PURE__ */ jsxDEV(
              "svg",
              {
                ref: svgRef,
                className: "w-full h-full drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
                lineNumber: 406,
                columnNumber: 13
              },
              this
            )
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
            lineNumber: 402,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] font-mono text-slate-400 mt-2 flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-emerald-400 animate-pulse" }, void 0, false, {
            fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
            lineNumber: 412,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Interaktywny wykres: kliknij lub najedź na wycinek" }, void 0, false, {
            fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
            lineNumber: 413,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
          lineNumber: 411,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
        lineNumber: 401,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-7 space-y-4", children: [
        activeCategory && /* @__PURE__ */ jsxDEV(
          "div",
          {
            className: "p-3.5 rounded-xl border transition-all",
            style: {
              backgroundColor: "rgba(15, 23, 42, 0.85)",
              borderColor: activeCategory.color,
              boxShadow: `0 0 20px ${activeCategory.glowColor}`
            },
            children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between gap-2 pb-2 border-b border-slate-800", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxDEV(
                    "span",
                    {
                      className: "w-3 h-3 rounded-full flex-shrink-0",
                      style: { backgroundColor: activeCategory.color }
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
                      lineNumber: 431,
                      columnNumber: 19
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-sm font-black text-white", children: activeCategory.label }, void 0, false, {
                    fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
                    lineNumber: 435,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
                  lineNumber: 430,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-900 border border-slate-700 text-slate-300", children: [
                    activeCategory.count,
                    " incydentów"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
                    lineNumber: 440,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV(
                    "span",
                    {
                      className: "px-2 py-0.5 rounded text-[10px] font-mono font-black text-white",
                      style: { backgroundColor: activeCategory.color },
                      children: [
                        (activeCategory.percentage || 0).toFixed(1),
                        "%"
                      ]
                    },
                    void 0,
                    true,
                    {
                      fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
                      lineNumber: 443,
                      columnNumber: 19
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
                  lineNumber: 439,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
                lineNumber: 429,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "mt-2.5 space-y-1.5 text-xs", children: [
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 font-mono text-[11px]", children: "Wektor Agresji: " }, void 0, false, {
                    fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
                    lineNumber: 454,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-200", children: activeCategory.primaryVector }, void 0, false, {
                    fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
                    lineNumber: 455,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
                  lineNumber: 453,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-mono text-[11px]", children: "Metoda Uboju: " }, void 0, false, {
                    fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
                    lineNumber: 458,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-200", children: activeCategory.neutralizationMethod }, void 0, false, {
                    fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
                    lineNumber: 459,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
                  lineNumber: 457,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 flex-wrap pt-1", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 font-mono text-[11px]", children: "Nadużywane API:" }, void 0, false, {
                    fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
                    lineNumber: 462,
                    columnNumber: 19
                  }, this),
                  activeCategory.typicalApis.map((api, idx) => /* @__PURE__ */ jsxDEV(
                    "span",
                    {
                      className: "px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 font-mono text-[10px] text-cyan-300",
                      children: api
                    },
                    idx,
                    false,
                    {
                      fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
                      lineNumber: 464,
                      columnNumber: 21
                    },
                    this
                  ))
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
                  lineNumber: 461,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
                lineNumber: 452,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
            lineNumber: 421,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5 max-h-56 overflow-y-auto pr-1", children: filteredData.map((item) => {
          const isSelected = item.id === (hoveredCategoryId || selectedCategoryId);
          return /* @__PURE__ */ jsxDEV(
            "div",
            {
              onClick: () => {
                setSelectedCategoryId(item.id);
                if (onSelectCategory) onSelectCategory(item);
              },
              onMouseEnter: () => setHoveredCategoryId(item.id),
              onMouseLeave: () => setHoveredCategoryId(null),
              className: `p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 text-xs ${isSelected ? "bg-slate-800/90 border-slate-600 shadow-md scale-[1.01]" : "bg-slate-950/60 hover:bg-slate-800/50 border-slate-800/80 text-slate-400"}`,
              children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2.5 min-w-0", children: [
                  /* @__PURE__ */ jsxDEV(
                    "span",
                    {
                      className: "w-2.5 h-2.5 rounded-full flex-shrink-0",
                      style: { backgroundColor: item.color }
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
                      lineNumber: 496,
                      columnNumber: 21
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-slate-200 truncate", children: item.shortLabel }, void 0, false, {
                    fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
                    lineNumber: 500,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
                  lineNumber: 495,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "w-16 h-1.5 bg-slate-900 rounded-full overflow-hidden hidden sm:block", children: /* @__PURE__ */ jsxDEV(
                    "div",
                    {
                      className: "h-full rounded-full transition-all duration-500",
                      style: {
                        width: `${item.percentage || 0}%`,
                        backgroundColor: item.color
                      }
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
                      lineNumber: 508,
                      columnNumber: 23
                    },
                    this
                  ) }, void 0, false, {
                    fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
                    lineNumber: 507,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-slate-400 text-[11px]", children: item.count }, void 0, false, {
                    fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
                    lineNumber: 517,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV(
                    "span",
                    {
                      className: "font-mono font-bold text-[11px] w-12 text-right",
                      style: { color: item.color },
                      children: [
                        (item.percentage || 0).toFixed(1),
                        "%"
                      ]
                    },
                    void 0,
                    true,
                    {
                      fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
                      lineNumber: 520,
                      columnNumber: 21
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
                  lineNumber: 505,
                  columnNumber: 19
                }, this)
              ]
            },
            item.id,
            true,
            {
              fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
              lineNumber: 481,
              columnNumber: 17
            },
            this
          );
        }) }, void 0, false, {
          fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
          lineNumber: 477,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "pt-2 flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-slate-800/80", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "Algorytm: d3.pie() + d3.arc() + SVG Filters" }, void 0, false, {
            fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
            lineNumber: 534,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleResetData,
              className: "text-slate-400 hover:text-white transition-colors cursor-pointer",
              children: "Resetuj Statystyki"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
              lineNumber: 535,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
          lineNumber: 533,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
        lineNumber: 418,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
      lineNumber: 399,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/ThreatDistributionPieChart.tsx",
    lineNumber: 333,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRocmVhdERpc3RyaWJ1dGlvblBpZUNoYXJ0LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlLCB1c2VNZW1vIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgZDMgZnJvbSAnZDMnO1xuaW1wb3J0IHsgXG4gIFBpZUNoYXJ0IGFzIFBpZUljb24sIFNoaWVsZEFsZXJ0LCBTcGFya2xlcywgUmVmcmVzaEN3LCBcbiAgTGF5ZXJzLCBGaWx0ZXIsIENoZXZyb25SaWdodCwgQWN0aXZpdHksIFphcCwgQ2hlY2tDaXJjbGUyLFxuICBTa3VsbCwgQWxlcnRPY3RhZ29uLCBUZXJtaW5hbFxufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFRocmVhdENhdGVnb3J5RGF0YSB7XG4gIGlkOiBzdHJpbmc7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHNob3J0TGFiZWw6IHN0cmluZztcbiAgY291bnQ6IG51bWJlcjtcbiAgcGVyY2VudGFnZT86IG51bWJlcjtcbiAgY29sb3I6IHN0cmluZztcbiAgZ2xvd0NvbG9yOiBzdHJpbmc7XG4gIHByaW1hcnlWZWN0b3I6IHN0cmluZztcbiAgbmV1dHJhbGl6YXRpb25NZXRob2Q6IHN0cmluZztcbiAgdHlwaWNhbEFwaXM6IHN0cmluZ1tdO1xuICBzZXZlcml0eTogJ0NSSVRJQ0FMJyB8ICdFWFRSRU1FJyB8ICdISUdIJztcbn1cblxuY29uc3QgREVGQVVMVF9USFJFQVRfQ0FURUdPUklFUzogVGhyZWF0Q2F0ZWdvcnlEYXRhW10gPSBbXG4gIHtcbiAgICBpZDogJ2ZsdXR0ZXJfb3ZlcmxheScsXG4gICAgbGFiZWw6ICdGbHV0dGVyIE92ZXJsYXkgJiBTY3JlZW4gSGlqYWNrZXJzJyxcbiAgICBzaG9ydExhYmVsOiAnRmx1dHRlciBPdmVybGF5JyxcbiAgICBjb3VudDogMTQyLFxuICAgIGNvbG9yOiAnIzhiNWNmNicsIC8vIHB1cnBsZS01MDBcbiAgICBnbG93Q29sb3I6ICdyZ2JhKDEzOSwgOTIsIDI0NiwgMC40KScsXG4gICAgcHJpbWFyeVZlY3RvcjogJ2JpdHNkb2pvX3dpbmRvdyAvIHdpbmRvd19tYW5hZ2VyIHogd3ltdXN6ZW5pZW0gSFdORF9UT1BNT1NUIGkgYmxva2FkxIUgQWx0K1RhYicsXG4gICAgbmV1dHJhbGl6YXRpb25NZXRob2Q6ICdOdFN1c3BlbmRQcm9jZXNzIC0+IFpkasSZY2llIEhXTkRfVE9QTU9TVCAtPiBOYWRwaXNhbmllIG5hZ8WCw7N3a2EgUEUgemVyYW1pJyxcbiAgICB0eXBpY2FsQXBpczogWydTZXRXaW5kb3dQb3MoSFdORF9UT1BNT1NUKScsICd3aW5kb3dfbWFuYWdlci5zZXRQcmV2ZW50Q2xvc2UnLCAnU2V0Rm9yZWdyb3VuZFdpbmRvdyddLFxuICAgIHNldmVyaXR5OiAnQ1JJVElDQUwnXG4gIH0sXG4gIHtcbiAgICBpZDogJ2tleWJvYXJkX2hvb2snLFxuICAgIGxhYmVsOiAnSG9vayBLbGF3aWF0dXJ5ICYgRm9jdXMgU3RlYWxlcnMnLFxuICAgIHNob3J0TGFiZWw6ICdIb29rIEtsYXdpYXR1cnknLFxuICAgIGNvdW50OiAxMTgsXG4gICAgY29sb3I6ICcjMDZiNmQ0JywgLy8gY3lhbi01MDBcbiAgICBnbG93Q29sb3I6ICdyZ2JhKDYsIDE4MiwgMjEyLCAwLjQpJyxcbiAgICBwcmltYXJ5VmVjdG9yOiAnR2xvYmFsbnkgV0hfS0VZQk9BUkRfTEwgYmxva3VqxIVjeSBFU0MsIFdJTiwgVEFCIGkgcmVqZXN0cnVqxIVjeSB6bmFraScsXG4gICAgbmV1dHJhbGl6YXRpb25NZXRob2Q6ICdVbmhvb2tXaW5kb3dzSG9va0V4IC0+IFp3b2xuaWVuaWUgcHJvY2VkdXJ5IGhvb2thIHogcGFtacSZY2kgLT4gVWLDs2ogd8SFdGt1JyxcbiAgICB0eXBpY2FsQXBpczogWydTZXRXaW5kb3dzSG9va0V4VyhXSF9LRVlCT0FSRF9MTCknLCAnQ2FsbE5leHRIb29rRXgnLCAnR2V0QXN5bmNLZXlTdGF0ZSddLFxuICAgIHNldmVyaXR5OiAnSElHSCdcbiAgfSxcbiAge1xuICAgIGlkOiAnbWJyX3dpcGVyJyxcbiAgICBsYWJlbDogJ0Rlc3RydWtjeWpuZSBwcm9jZXN5IE1CUiAmIERpc2sgV2lwZXInLFxuICAgIHNob3J0TGFiZWw6ICdQcm9jZXN5IE1CUiAvIFdpcGVyJyxcbiAgICBjb3VudDogODYsXG4gICAgY29sb3I6ICcjZWY0NDQ0JywgLy8gcmVkLTUwMFxuICAgIGdsb3dDb2xvcjogJ3JnYmEoMjM5LCA2OCwgNjgsIDAuNCknLFxuICAgIHByaW1hcnlWZWN0b3I6ICdCZXpwb8WbcmVkbmkgemFwaXMgZG8gXFxcXFxcXFwuXFxcXFBoeXNpY2FsRHJpdmUwIGkgemVyb3dhbmllIHRhYmxpY3kgcGFydHljamkgR1BUL01CUicsXG4gICAgbmV1dHJhbGl6YXRpb25NZXRob2Q6ICdPZGVicmFuaWUgU2VMb2FkRHJpdmVyUHJpdmlsZWdlIC0+IFp3b2xuaWVuaWUgRlNDVExfTE9DS19WT0xVTUUgLT4gVHdhcmR5IFNJR0tJTEwnLFxuICAgIHR5cGljYWxBcGlzOiBbJ0NyZWF0ZUZpbGVXKFBoeXNpY2FsRHJpdmUwKScsICdEZXZpY2VJb0NvbnRyb2woRlNDVExfTE9DSyknLCAnTnRSYWlzZUhhcmRFcnJvciddLFxuICAgIHNldmVyaXR5OiAnRVhUUkVNRSdcbiAgfSxcbiAge1xuICAgIGlkOiAnbGF5ZXJlZF9zdGVhbGVyJyxcbiAgICBsYWJlbDogJ0luZm9zdGVhbGVyICYgUHJ6ZXpyb2N6eXN0ZSBPa25hIFdTX0VYX0xBWUVSRUQnLFxuICAgIHNob3J0TGFiZWw6ICdXU19FWF9MQVlFUkVEIFNweScsXG4gICAgY291bnQ6IDk0LFxuICAgIGNvbG9yOiAnI2Y1OWUwYicsIC8vIGFtYmVyLTUwMFxuICAgIGdsb3dDb2xvcjogJ3JnYmEoMjQ1LCAxNTgsIDExLCAwLjQpJyxcbiAgICBwcmltYXJ5VmVjdG9yOiAnUHJ6ZXpyb2N6eXN0YSBuYWvFgmFka2EgeiBXU19FWF9UUkFOU1BBUkVOVCBrcmFkbsSFY2Ega2xpa25pxJljaWEgaSBkYW5lIGZvcm11bGFyenknLFxuICAgIG5ldXRyYWxpemF0aW9uTWV0aG9kOiAnWnJlc2V0b3dhbmllIHNvY2tldMOzdyBDMiAoTUlCX1RDUF9TVEFURV9ERUxFVEUpIC0+IEJsb2thZGEgcmVqZXN0cnUgSUZFTycsXG4gICAgdHlwaWNhbEFwaXM6IFsnU2V0V2luZG93TG9uZ1B0cihXU19FWF9MQVlFUkVEKScsICdWaXJ0dWFsQWxsb2NFeCcsICdTZXRDbGlwYm9hcmREYXRhJ10sXG4gICAgc2V2ZXJpdHk6ICdISUdIJ1xuICB9LFxuICB7XG4gICAgaWQ6ICdyYW5zb21fbG9ja2VyJyxcbiAgICBsYWJlbDogJ1JhbnNvbXdhcmUgJiBOaXN6Y3p5Y2llbGUgS29waWkgQ2llbmlvd3ljaCBWU1MnLFxuICAgIHNob3J0TGFiZWw6ICdSYW5zb213YXJlIC8gVlNTJyxcbiAgICBjb3VudDogNzMsXG4gICAgY29sb3I6ICcjZWM0ODk5JywgLy8gcGluay01MDBcbiAgICBnbG93Q29sb3I6ICdyZ2JhKDIzNiwgNzIsIDE1MywgMC40KScsXG4gICAgcHJpbWFyeVZlY3RvcjogJ0FzeW5jaHJvbmljem5lIHN6eWZyb3dhbmllIENoYUNoYTIwICsgdnNzYWRtaW4gZGVsZXRlIHNoYWRvd3MgL2FsbCAvcXVpZXQnLFxuICAgIG5ldXRyYWxpemF0aW9uTWV0aG9kOiAnV2llbG93xIV0a293ZSB6YW1yb8W8ZW5pZSBOdFN1c3BlbmRQcm9jZXNzIC0+IE9jaHJvbmEgd29sdW1lbsOzdyBWU1MgLT4gT2RibG9rb3dhbmllIHRhc2ttZ3InLFxuICAgIHR5cGljYWxBcGlzOiBbJ09wZW5TQ01hbmFnZXJXJywgJ3Zzc2FkbWluLmV4ZSBkZWxldGUgc2hhZG93cycsICdDcnlwdEdlblJhbmRvbSddLFxuICAgIHNldmVyaXR5OiAnQ1JJVElDQUwnXG4gIH0sXG4gIHtcbiAgICBpZDogJ21lbW9yeV9pbmplY3Rpb24nLFxuICAgIGxhYmVsOiAnSW5pZWtjamUgUGFtacSZY2kgJiBBUEMgLyBHaG9zdCBUaHJlYWRzJyxcbiAgICBzaG9ydExhYmVsOiAnR2hvc3QgTWVtb3J5IEFQQycsXG4gICAgY291bnQ6IDY1LFxuICAgIGNvbG9yOiAnIzEwYjk4MScsIC8vIGVtZXJhbGQtNTAwXG4gICAgZ2xvd0NvbG9yOiAncmdiYSgxNiwgMTg1LCAxMjksIDAuNCknLFxuICAgIHByaW1hcnlWZWN0b3I6ICdXc3RyenlraXdhbmllIHNoZWxsY29kZSBkbyBleHBsb3Jlci5leGUgemEgcG9tb2PEhSBRdWV1ZVVzZXJBUEMgaSBQcm9jZXNzIEhvbGxvd2luZycsXG4gICAgbmV1dHJhbGl6YXRpb25NZXRob2Q6ICdOdFVubWFwVmlld09mU2VjdGlvbiAtPiBad29sbmllbmllIFZpcnR1YWxGcmVlRXggLT4gWnJ6dWNlbmllIHfEhXRrdSBwb3RvbW5lZ28nLFxuICAgIHR5cGljYWxBcGlzOiBbJ1F1ZXVlVXNlckFQQycsICdOdENyZWF0ZVNlY3Rpb24nLCAnV3JpdGVQcm9jZXNzTWVtb3J5J10sXG4gICAgc2V2ZXJpdHk6ICdISUdIJ1xuICB9XG5dO1xuXG5pbnRlcmZhY2UgUHJvcHMge1xuICBvblNlbGVjdENhdGVnb3J5PzogKGNhdGVnb3J5OiBUaHJlYXRDYXRlZ29yeURhdGEpID0+IHZvaWQ7XG4gIGFkZGl0aW9uYWxUYXJnZXRUaHJlYXQ/OiBzdHJpbmcgfCBudWxsO1xufVxuXG5leHBvcnQgY29uc3QgVGhyZWF0RGlzdHJpYnV0aW9uUGllQ2hhcnQ6IFJlYWN0LkZDPFByb3BzPiA9ICh7IFxuICBvblNlbGVjdENhdGVnb3J5LFxuICBhZGRpdGlvbmFsVGFyZ2V0VGhyZWF0IFxufSkgPT4ge1xuICBjb25zdCBzdmdSZWYgPSB1c2VSZWY8U1ZHU1ZHRWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBjb250YWluZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcblxuICBjb25zdCBbY2F0ZWdvcmllcywgc2V0Q2F0ZWdvcmllc10gPSB1c2VTdGF0ZTxUaHJlYXRDYXRlZ29yeURhdGFbXT4oREVGQVVMVF9USFJFQVRfQ0FURUdPUklFUyk7XG4gIGNvbnN0IFtzZWxlY3RlZENhdGVnb3J5SWQsIHNldFNlbGVjdGVkQ2F0ZWdvcnlJZF0gPSB1c2VTdGF0ZTxzdHJpbmc+KCdmbHV0dGVyX292ZXJsYXknKTtcbiAgY29uc3QgW2hvdmVyZWRDYXRlZ29yeUlkLCBzZXRIb3ZlcmVkQ2F0ZWdvcnlJZF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2NoYXJ0TW9kZSwgc2V0Q2hhcnRNb2RlXSA9IHVzZVN0YXRlPCdkb251dCcgfCAnc29saWQnPignZG9udXQnKTtcbiAgY29uc3QgW2ZpbHRlclNldmVyaXR5LCBzZXRGaWx0ZXJTZXZlcml0eV0gPSB1c2VTdGF0ZTwnQUxMJyB8ICdDUklUSUNBTCcgfCAnRVhUUkVNRSc+KCdBTEwnKTtcblxuICAvLyBGaWx0ZXJlZCBjYXRlZ29yaWVzXG4gIGNvbnN0IGZpbHRlcmVkRGF0YSA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGxldCBsaXN0ID0gY2F0ZWdvcmllcztcbiAgICBpZiAoZmlsdGVyU2V2ZXJpdHkgIT09ICdBTEwnKSB7XG4gICAgICBsaXN0ID0gbGlzdC5maWx0ZXIoaXRlbSA9PiBpdGVtLnNldmVyaXR5ID09PSBmaWx0ZXJTZXZlcml0eSk7XG4gICAgfVxuICAgIGNvbnN0IHRvdGFsID0gbGlzdC5yZWR1Y2UoKHN1bSwgaXRlbSkgPT4gc3VtICsgaXRlbS5jb3VudCwgMCk7XG4gICAgcmV0dXJuIGxpc3QubWFwKGl0ZW0gPT4gKHtcbiAgICAgIC4uLml0ZW0sXG4gICAgICBwZXJjZW50YWdlOiB0b3RhbCA+IDAgPyAoaXRlbS5jb3VudCAvIHRvdGFsKSAqIDEwMCA6IDBcbiAgICB9KSk7XG4gIH0sIFtjYXRlZ29yaWVzLCBmaWx0ZXJTZXZlcml0eV0pO1xuXG4gIGNvbnN0IHRvdGFsVGhyZWF0c0NvdW50ID0gdXNlTWVtbygoKSA9PiB7XG4gICAgcmV0dXJuIGZpbHRlcmVkRGF0YS5yZWR1Y2UoKGFjYywgY3VycikgPT4gYWNjICsgY3Vyci5jb3VudCwgMCk7XG4gIH0sIFtmaWx0ZXJlZERhdGFdKTtcblxuICBjb25zdCBhY3RpdmVDYXRlZ29yeSA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IHRhcmdldElkID0gaG92ZXJlZENhdGVnb3J5SWQgfHwgc2VsZWN0ZWRDYXRlZ29yeUlkO1xuICAgIHJldHVybiBmaWx0ZXJlZERhdGEuZmluZChjID0+IGMuaWQgPT09IHRhcmdldElkKSB8fCBmaWx0ZXJlZERhdGFbMF0gfHwgbnVsbDtcbiAgfSwgW2hvdmVyZWRDYXRlZ29yeUlkLCBzZWxlY3RlZENhdGVnb3J5SWQsIGZpbHRlcmVkRGF0YV0pO1xuXG4gIC8vIFNpbXVsYXRlIHJlZ2lzdGVyaW5nIGEgbmV3IG5ldXRyYWxpemVkIHRocmVhdCBkeW5hbWljYWxseVxuICBjb25zdCBoYW5kbGVTaW11bGF0ZU5ldXRyYWxpemF0aW9uID0gKCkgPT4ge1xuICAgIGNvbnN0IGF2YWlsYWJsZUlkcyA9IFsnZmx1dHRlcl9vdmVybGF5JywgJ2tleWJvYXJkX2hvb2snLCAnbWJyX3dpcGVyJywgJ2xheWVyZWRfc3RlYWxlcicsICdyYW5zb21fbG9ja2VyJywgJ21lbW9yeV9pbmplY3Rpb24nXTtcbiAgICBjb25zdCByYW5kb21JZCA9IGF2YWlsYWJsZUlkc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhdmFpbGFibGVJZHMubGVuZ3RoKV07XG4gICAgY29uc3QgaW5jcmVtZW50ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOCkgKyAzO1xuXG4gICAgc2V0Q2F0ZWdvcmllcyhwcmV2ID0+IHByZXYubWFwKGl0ZW0gPT4ge1xuICAgICAgaWYgKGl0ZW0uaWQgPT09IHJhbmRvbUlkKSB7XG4gICAgICAgIHJldHVybiB7IC4uLml0ZW0sIGNvdW50OiBpdGVtLmNvdW50ICsgaW5jcmVtZW50IH07XG4gICAgICB9XG4gICAgICByZXR1cm4gaXRlbTtcbiAgICB9KSk7XG4gICAgc2V0U2VsZWN0ZWRDYXRlZ29yeUlkKHJhbmRvbUlkKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVSZXNldERhdGEgPSAoKSA9PiB7XG4gICAgc2V0Q2F0ZWdvcmllcyhERUZBVUxUX1RIUkVBVF9DQVRFR09SSUVTKTtcbiAgfTtcblxuICAvLyBSZW5kZXIgRDMgcGllIGNoYXJ0XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFzdmdSZWYuY3VycmVudCB8fCBmaWx0ZXJlZERhdGEubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgICBjb25zdCB3aWR0aCA9IDM2MDtcbiAgICBjb25zdCBoZWlnaHQgPSAzNjA7XG4gICAgY29uc3QgcmFkaXVzID0gTWF0aC5taW4od2lkdGgsIGhlaWdodCkgLyAyO1xuICAgIGNvbnN0IGlubmVyUmFkaXVzID0gY2hhcnRNb2RlID09PSAnZG9udXQnID8gcmFkaXVzICogMC41OCA6IDA7XG4gICAgY29uc3QgaG92ZXJPdXRlclJhZGl1cyA9IHJhZGl1cyAtIDY7XG4gICAgY29uc3QgYmFzZU91dGVyUmFkaXVzID0gcmFkaXVzIC0gMTY7XG5cbiAgICBjb25zdCBzdmcgPSBkMy5zZWxlY3Qoc3ZnUmVmLmN1cnJlbnQpO1xuICAgIHN2Zy5zZWxlY3RBbGwoJyonKS5yZW1vdmUoKTtcblxuICAgIC8vIENyZWF0ZSBjb250YWluZXIgZ3JvdXAgdHJhbnNsYXRlZCB0byBjZW50ZXJcbiAgICBjb25zdCBnID0gc3ZnXG4gICAgICAuYXR0cigndmlld0JveCcsIGAwIDAgJHt3aWR0aH0gJHtoZWlnaHR9YClcbiAgICAgIC5hdHRyKCd3aWR0aCcsICcxMDAlJylcbiAgICAgIC5hdHRyKCdoZWlnaHQnLCAnMTAwJScpXG4gICAgICAuYXBwZW5kKCdnJylcbiAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKCR7d2lkdGggLyAyfSwgJHtoZWlnaHQgLyAyfSlgKTtcblxuICAgIC8vIEQzIFBpZSBHZW5lcmF0b3JcbiAgICBjb25zdCBwaWUgPSBkMy5waWU8VGhyZWF0Q2F0ZWdvcnlEYXRhPigpXG4gICAgICAudmFsdWUoZCA9PiBkLmNvdW50KVxuICAgICAgLnNvcnQobnVsbClcbiAgICAgIC5wYWRBbmdsZSgwLjAyNSk7XG5cbiAgICAvLyBEMyBBcmMgR2VuZXJhdG9yXG4gICAgY29uc3QgYXJjR2VuZXJhdG9yID0gZDMuYXJjPGQzLlBpZUFyY0RhdHVtPFRocmVhdENhdGVnb3J5RGF0YT4+KClcbiAgICAgIC5pbm5lclJhZGl1cyhpbm5lclJhZGl1cylcbiAgICAgIC5vdXRlclJhZGl1cyhkID0+IHtcbiAgICAgICAgY29uc3QgaXNIb3ZlcmVkID0gZC5kYXRhLmlkID09PSAoaG92ZXJlZENhdGVnb3J5SWQgfHwgc2VsZWN0ZWRDYXRlZ29yeUlkKTtcbiAgICAgICAgcmV0dXJuIGlzSG92ZXJlZCA/IGhvdmVyT3V0ZXJSYWRpdXMgOiBiYXNlT3V0ZXJSYWRpdXM7XG4gICAgICB9KVxuICAgICAgLmNvcm5lclJhZGl1cyg0KTtcblxuICAgIC8vIE91dGxpbmUgYXJjIGZvciBjeWJlciBhZXN0aGV0aWNcbiAgICBjb25zdCBvdXRsaW5lQXJjID0gZDMuYXJjPGQzLlBpZUFyY0RhdHVtPFRocmVhdENhdGVnb3J5RGF0YT4+KClcbiAgICAgIC5pbm5lclJhZGl1cyhpbm5lclJhZGl1cyA+IDAgPyBpbm5lclJhZGl1cyAtIDMgOiAwKVxuICAgICAgLm91dGVyUmFkaXVzKGJhc2VPdXRlclJhZGl1cyArIDMpXG4gICAgICAuY29ybmVyUmFkaXVzKDQpO1xuXG4gICAgY29uc3QgcGllRGF0YSA9IHBpZShmaWx0ZXJlZERhdGEpO1xuXG4gICAgLy8gQWRkIGZpbHRlciBnbG93IGRlZnNcbiAgICBjb25zdCBkZWZzID0gc3ZnLmFwcGVuZCgnZGVmcycpO1xuICAgIFxuICAgIC8vIENyZWF0ZSBnbG93IGZpbHRlcnMgZm9yIGVhY2ggY2F0ZWdvcnlcbiAgICBmaWx0ZXJlZERhdGEuZm9yRWFjaChkID0+IHtcbiAgICAgIGNvbnN0IGZpbHRlciA9IGRlZnMuYXBwZW5kKCdmaWx0ZXInKVxuICAgICAgICAuYXR0cignaWQnLCBgZ2xvdy0ke2QuaWR9YClcbiAgICAgICAgLmF0dHIoJ3gnLCAnLTUwJScpXG4gICAgICAgIC5hdHRyKCd5JywgJy01MCUnKVxuICAgICAgICAuYXR0cignd2lkdGgnLCAnMjAwJScpXG4gICAgICAgIC5hdHRyKCdoZWlnaHQnLCAnMjAwJScpO1xuXG4gICAgICBmaWx0ZXIuYXBwZW5kKCdmZUdhdXNzaWFuQmx1cicpXG4gICAgICAgIC5hdHRyKCdzdGREZXZpYXRpb24nLCAnNCcpXG4gICAgICAgIC5hdHRyKCdyZXN1bHQnLCAnY29sb3JlZEJsdXInKTtcblxuICAgICAgY29uc3QgZmVNZXJnZSA9IGZpbHRlci5hcHBlbmQoJ2ZlTWVyZ2UnKTtcbiAgICAgIGZlTWVyZ2UuYXBwZW5kKCdmZU1lcmdlTm9kZScpLmF0dHIoJ2luJywgJ2NvbG9yZWRCbHVyJyk7XG4gICAgICBmZU1lcmdlLmFwcGVuZCgnZmVNZXJnZU5vZGUnKS5hdHRyKCdpbicsICdTb3VyY2VHcmFwaGljJyk7XG4gICAgfSk7XG5cbiAgICAvLyBPdXRlciBzdWJ0bGUgcmFkYXIgY2lyY2xlXG4gICAgZy5hcHBlbmQoJ2NpcmNsZScpXG4gICAgICAuYXR0cigncicsIGJhc2VPdXRlclJhZGl1cyArIDEwKVxuICAgICAgLmF0dHIoJ2ZpbGwnLCAnbm9uZScpXG4gICAgICAuYXR0cignc3Ryb2tlJywgJyMzMzQxNTUnKVxuICAgICAgLmF0dHIoJ3N0cm9rZS13aWR0aCcsIDEpXG4gICAgICAuYXR0cignc3Ryb2tlLWRhc2hhcnJheScsICc0IDQnKVxuICAgICAgLmF0dHIoJ29wYWNpdHknLCAwLjUpO1xuXG4gICAgLy8gR3JvdXAgZm9yIHNsaWNlc1xuICAgIGNvbnN0IHNsaWNlR3JvdXBzID0gZy5zZWxlY3RBbGwoJy5hcmMnKVxuICAgICAgLmRhdGEocGllRGF0YSlcbiAgICAgIC5lbnRlcigpXG4gICAgICAuYXBwZW5kKCdnJylcbiAgICAgIC5hdHRyKCdjbGFzcycsICdhcmMnKVxuICAgICAgLnN0eWxlKCdjdXJzb3InLCAncG9pbnRlcicpO1xuXG4gICAgLy8gU2xpY2UgcGF0aHNcbiAgICBzbGljZUdyb3Vwcy5hcHBlbmQoJ3BhdGgnKVxuICAgICAgLmF0dHIoJ2QnLCBhcmNHZW5lcmF0b3IgYXMgYW55KVxuICAgICAgLmF0dHIoJ2ZpbGwnLCBkID0+IGQuZGF0YS5jb2xvcilcbiAgICAgIC5hdHRyKCdzdHJva2UnLCAnIzBmMTcyYScpXG4gICAgICAuYXR0cignc3Ryb2tlLXdpZHRoJywgMi41KVxuICAgICAgLmF0dHIoJ29wYWNpdHknLCBkID0+IHtcbiAgICAgICAgY29uc3QgaXNUYXJnZXQgPSBkLmRhdGEuaWQgPT09IChob3ZlcmVkQ2F0ZWdvcnlJZCB8fCBzZWxlY3RlZENhdGVnb3J5SWQpO1xuICAgICAgICBpZiAoaG92ZXJlZENhdGVnb3J5SWQgfHwgc2VsZWN0ZWRDYXRlZ29yeUlkKSB7XG4gICAgICAgICAgcmV0dXJuIGlzVGFyZ2V0ID8gMSA6IDAuNjU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDAuOTtcbiAgICAgIH0pXG4gICAgICAuc3R5bGUoJ2ZpbHRlcicsIGQgPT4ge1xuICAgICAgICBjb25zdCBpc1RhcmdldCA9IGQuZGF0YS5pZCA9PT0gKGhvdmVyZWRDYXRlZ29yeUlkIHx8IHNlbGVjdGVkQ2F0ZWdvcnlJZCk7XG4gICAgICAgIHJldHVybiBpc1RhcmdldCA/IGB1cmwoI2dsb3ctJHtkLmRhdGEuaWR9KWAgOiAnbm9uZSc7XG4gICAgICB9KVxuICAgICAgLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oZXZlbnQsIGQpIHtcbiAgICAgICAgc2V0SG92ZXJlZENhdGVnb3J5SWQoZC5kYXRhLmlkKTtcbiAgICAgICAgZDMuc2VsZWN0KHRoaXMpXG4gICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5kdXJhdGlvbigxODApXG4gICAgICAgICAgLmF0dHIoJ29wYWNpdHknLCAxKVxuICAgICAgICAgIC5hdHRyKCdkJywgZDMuYXJjPGQzLlBpZUFyY0RhdHVtPFRocmVhdENhdGVnb3J5RGF0YT4+KClcbiAgICAgICAgICAgIC5pbm5lclJhZGl1cyhpbm5lclJhZGl1cylcbiAgICAgICAgICAgIC5vdXRlclJhZGl1cyhob3Zlck91dGVyUmFkaXVzKVxuICAgICAgICAgICAgLmNvcm5lclJhZGl1cyg0KSBhcyBhbnlcbiAgICAgICAgICApO1xuICAgICAgfSlcbiAgICAgIC5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBzZXRIb3ZlcmVkQ2F0ZWdvcnlJZChudWxsKTtcbiAgICAgIH0pXG4gICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQsIGQpIHtcbiAgICAgICAgc2V0U2VsZWN0ZWRDYXRlZ29yeUlkKGQuZGF0YS5pZCk7XG4gICAgICAgIGlmIChvblNlbGVjdENhdGVnb3J5KSB7XG4gICAgICAgICAgb25TZWxlY3RDYXRlZ29yeShkLmRhdGEpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIC8vIEluLXNsaWNlIHNtYWxsIHBlcmNlbnRhZ2UgbGFiZWxzIGlmIGFyYyBpcyBsYXJnZSBlbm91Z2hcbiAgICBzbGljZUdyb3Vwcy5hcHBlbmQoJ3RleHQnKVxuICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGQgPT4ge1xuICAgICAgICBjb25zdCBbeCwgeV0gPSBhcmNHZW5lcmF0b3IuY2VudHJvaWQoZCBhcyBhbnkpO1xuICAgICAgICByZXR1cm4gYHRyYW5zbGF0ZSgke3h9LCAke3l9KWA7XG4gICAgICB9KVxuICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgICAuYXR0cignZHknLCAnLjM1ZW0nKVxuICAgICAgLmF0dHIoJ2ZvbnQtc2l6ZScsICcxMHB4JylcbiAgICAgIC5hdHRyKCdmb250LWZhbWlseScsICd1aS1tb25vc3BhY2UsIG1vbm9zcGFjZScpXG4gICAgICAuYXR0cignZm9udC13ZWlnaHQnLCAnYm9sZCcpXG4gICAgICAuYXR0cignZmlsbCcsICcjZmZmZmZmJylcbiAgICAgIC5hdHRyKCdwb2ludGVyLWV2ZW50cycsICdub25lJylcbiAgICAgIC50ZXh0KGQgPT4ge1xuICAgICAgICBjb25zdCBwY3QgPSBkLmRhdGEucGVyY2VudGFnZSB8fCAwO1xuICAgICAgICByZXR1cm4gcGN0ID49IDggPyBgJHtwY3QudG9GaXhlZCgwKX0lYCA6ICcnO1xuICAgICAgfSk7XG5cbiAgICAvLyBDZW50ZXIgRGlzcGxheSBmb3IgRG9udXQgTW9kZVxuICAgIGlmIChjaGFydE1vZGUgPT09ICdkb251dCcgJiYgYWN0aXZlQ2F0ZWdvcnkpIHtcbiAgICAgIGNvbnN0IGNlbnRlckcgPSBnLmFwcGVuZCgnZycpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdjZW50ZXItaW5mbycpXG4gICAgICAgIC5hdHRyKCdwb2ludGVyLWV2ZW50cycsICdub25lJyk7XG5cbiAgICAgIGNlbnRlckcuYXBwZW5kKCd0ZXh0JylcbiAgICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgICAgIC5hdHRyKCdkeScsICctMThweCcpXG4gICAgICAgIC5hdHRyKCdmb250LXNpemUnLCAnMTBweCcpXG4gICAgICAgIC5hdHRyKCdmb250LWZhbWlseScsICd1aS1tb25vc3BhY2UsIG1vbm9zcGFjZScpXG4gICAgICAgIC5hdHRyKCdmaWxsJywgJyM5NGEzYjgnKVxuICAgICAgICAudGV4dCgnVURaSUHFgSBLQVRFR09SSUknKTtcblxuICAgICAgY2VudGVyRy5hcHBlbmQoJ3RleHQnKVxuICAgICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICAgICAgLmF0dHIoJ2R5JywgJzZweCcpXG4gICAgICAgIC5hdHRyKCdmb250LXNpemUnLCAnMjBweCcpXG4gICAgICAgIC5hdHRyKCdmb250LWZhbWlseScsICd1aS1tb25vc3BhY2UsIG1vbm9zcGFjZScpXG4gICAgICAgIC5hdHRyKCdmb250LXdlaWdodCcsICc5MDAnKVxuICAgICAgICAuYXR0cignZmlsbCcsIGFjdGl2ZUNhdGVnb3J5LmNvbG9yKVxuICAgICAgICAudGV4dChgJHsoYWN0aXZlQ2F0ZWdvcnkucGVyY2VudGFnZSB8fCAwKS50b0ZpeGVkKDEpfSVgKTtcblxuICAgICAgY2VudGVyRy5hcHBlbmQoJ3RleHQnKVxuICAgICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICAgICAgLmF0dHIoJ2R5JywgJzI0cHgnKVxuICAgICAgICAuYXR0cignZm9udC1zaXplJywgJzExcHgnKVxuICAgICAgICAuYXR0cignZm9udC1mYW1pbHknLCAndWktc2Fucy1zZXJpZiwgc3lzdGVtLXVpJylcbiAgICAgICAgLmF0dHIoJ2ZvbnQtd2VpZ2h0JywgJ2JvbGQnKVxuICAgICAgICAuYXR0cignZmlsbCcsICcjZjhmYWZjJylcbiAgICAgICAgLnRleHQoYCR7YWN0aXZlQ2F0ZWdvcnkuY291bnR9IHpuZXV0cmFsaXpvd2FueWNoYCk7XG4gICAgfVxuXG4gIH0sIFtmaWx0ZXJlZERhdGEsIGNoYXJ0TW9kZSwgaG92ZXJlZENhdGVnb3J5SWQsIHNlbGVjdGVkQ2F0ZWdvcnlJZCwgYWN0aXZlQ2F0ZWdvcnksIG9uU2VsZWN0Q2F0ZWdvcnldKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwicC01IHJvdW5kZWQtMnhsIGJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLXB1cnBsZS05MDAvNjAgc2hhZG93LTJ4bCByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW4gYmFja2Ryb3AtYmx1ci1zbVwiPlxuICAgICAgey8qIFRvcCBIZWFkZXIgQmFyICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IGl0ZW1zLXN0YXJ0IHNtOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTMgcGItNCBib3JkZXItYiBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicC0xLjUgcm91bmRlZC1sZyBiZy1wdXJwbGUtNjAwLzIwIGJvcmRlciBib3JkZXItcHVycGxlLTUwMC80MCB0ZXh0LXB1cnBsZS0zMDBcIj5cbiAgICAgICAgICAgICAgPFBpZUljb24gY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXB1cnBsZS00MDBcIiAvPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJvbGQgdGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICA8c3Bhbj5Sb3prxYJhZCBabmV1dHJhbGl6b3dhbnljaCBaYWdyb8W8ZcWEPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gcHgtMiBweS0wLjUgcm91bmRlZCBiZy1wdXJwbGUtOTUwIHRleHQtcHVycGxlLTMwMCBib3JkZXIgYm9yZGVyLXB1cnBsZS03MDAvNjBcIj5cbiAgICAgICAgICAgICAgICBkMy5qcyBFbmdpbmVcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIG10LTFcIj5cbiAgICAgICAgICAgIER5bmFtaWN6bmEgYW5hbGl6YSBrcnltaW5hbGlzdHljem5hIHByb3BvcmNqaSBhdGFrw7N3IGkgd2VrdG9yw7N3IHcgcGFtacSZY2kgUkFNLiDFgcSFY3puaWUgenV0eWxpem93YW5vOiA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtcHVycGxlLTMwMCBmb250LW1vbm9cIj57dG90YWxUaHJlYXRzQ291bnR9IHByb2Nlc8Ozdzwvc3Ryb25nPi5cbiAgICAgICAgICA8L3A+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBDb250cm9scyBUb29sYmFyICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGZsZXgtd3JhcFwiPlxuICAgICAgICAgIHsvKiBDaGFydCBtb2RlIHN3aXRjaCAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGJnLXNsYXRlLTk1MCBwLTEgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXhzIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRDaGFydE1vZGUoJ2RvbnV0Jyl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTIgcHktMC41IHJvdW5kZWQgdHJhbnNpdGlvbi1jb2xvcnMgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgICAgICBjaGFydE1vZGUgPT09ICdkb251dCcgPyAnYmctcHVycGxlLTYwMCB0ZXh0LXdoaXRlIGZvbnQtYm9sZCcgOiAndGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIERvbnV0XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0Q2hhcnRNb2RlKCdzb2xpZCcpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0yIHB5LTAuNSByb3VuZGVkIHRyYW5zaXRpb24tY29sb3JzIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgICAgY2hhcnRNb2RlID09PSAnc29saWQnID8gJ2JnLXB1cnBsZS02MDAgdGV4dC13aGl0ZSBmb250LWJvbGQnIDogJ3RleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBQZcWCbmUgS2/Fgm9cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIFNldmVyaXR5IGZpbHRlciAqL31cbiAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICB2YWx1ZT17ZmlsdGVyU2V2ZXJpdHl9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEZpbHRlclNldmVyaXR5KGUudGFyZ2V0LnZhbHVlIGFzIGFueSl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yIHB5LTEgcm91bmRlZC1sZyBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgdGV4dC14cyBmb250LW1vbm8gdGV4dC1zbGF0ZS0zMDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1wdXJwbGUtNTAwXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiQUxMXCI+V3N6eXN0a2llIFBvemlvbXk8L29wdGlvbj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJDUklUSUNBTFwiPlR5bGtvIENSSVRJQ0FMPC9vcHRpb24+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiRVhUUkVNRVwiPlR5bGtvIEVYVFJFTUU8L29wdGlvbj5cbiAgICAgICAgICA8L3NlbGVjdD5cblxuICAgICAgICAgIHsvKiBTaW11bGF0ZSBuZXcga2lsbCBidXR0b24gKi99XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17aGFuZGxlU2ltdWxhdGVOZXV0cmFsaXphdGlvbn1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIuNSBweS0xIHJvdW5kZWQtbGcgYmctZ3JhZGllbnQtdG8tciBmcm9tLXB1cnBsZS02MDAgdG8taW5kaWdvLTYwMCBob3Zlcjpmcm9tLXB1cnBsZS01MDAgaG92ZXI6dG8taW5kaWdvLTUwMCB0ZXh0LXdoaXRlIHRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHNoYWRvdyB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICB0aXRsZT1cIlphcmVqZXN0cnVqIG5vd28gem5ldXRyYWxpem93YW5lIHphZ3JvxbxlbmllIHcgYmF6aWVcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxSZWZyZXNoQ3cgY2xhc3NOYW1lPVwidy0zIGgtMyBhbmltYXRlLXNwaW5cIiBzdHlsZT17eyBhbmltYXRpb25EdXJhdGlvbjogJzZzJyB9fSAvPlxuICAgICAgICAgICAgPHNwYW4+KyBSZWplc3RydWogVWLDs2o8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBNYWluIEdyaWQ6IEQzIENoYXJ0IFNWRyArIEludGVyYWN0aXZlIExlZ2VuZCAmIEZvcmVuc2ljIERldGFpbHMgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbGc6Z3JpZC1jb2xzLTEyIGdhcC01IG10LTQgaXRlbXMtY2VudGVyXCI+XG4gICAgICAgIHsvKiBMZWZ0IENvbHVtbjogSW50ZXJhY3RpdmUgRDMgQ2hhcnQgKDUgY29scykgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tNSBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwLTIgcmVsYXRpdmVcIj5cbiAgICAgICAgICA8ZGl2IFxuICAgICAgICAgICAgcmVmPXtjb250YWluZXJSZWZ9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgbWF4LXctWzM0MHB4XSBhc3BlY3Qtc3F1YXJlIHJlbGF0aXZlIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3ZnIFxuICAgICAgICAgICAgICByZWY9e3N2Z1JlZn0gXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGwgZHJvcC1zaGFkb3ctWzBfMTBweF8yNXB4X3JnYmEoMCwwLDAsMC42KV1cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTQwMCBtdC0yIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctMiBoLTIgcm91bmRlZC1mdWxsIGJnLWVtZXJhbGQtNDAwIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgPHNwYW4+SW50ZXJha3R5d255IHd5a3Jlczoga2xpa25paiBsdWIgbmFqZWTFuiBuYSB3eWNpbmVrPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogUmlnaHQgQ29sdW1uOiBCcmVha2Rvd24gVGFibGUgJiBGb3JlbnNpYyBEcmlsbGRvd24gKDcgY29scykgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tNyBzcGFjZS15LTRcIj5cbiAgICAgICAgICB7LyogQWN0aXZlIENhdGVnb3J5IERldGFpbCBDYXJkICovfVxuICAgICAgICAgIHthY3RpdmVDYXRlZ29yeSAmJiAoXG4gICAgICAgICAgICA8ZGl2IFxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTMuNSByb3VuZGVkLXhsIGJvcmRlciB0cmFuc2l0aW9uLWFsbFwiXG4gICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAncmdiYSgxNSwgMjMsIDQyLCAwLjg1KScsXG4gICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IGFjdGl2ZUNhdGVnb3J5LmNvbG9yLFxuICAgICAgICAgICAgICAgIGJveFNoYWRvdzogYDAgMCAyMHB4ICR7YWN0aXZlQ2F0ZWdvcnkuZ2xvd0NvbG9yfWBcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTIgcGItMiBib3JkZXItYiBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMyBoLTMgcm91bmRlZC1mdWxsIGZsZXgtc2hyaW5rLTBcIlxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kQ29sb3I6IGFjdGl2ZUNhdGVnb3J5LmNvbG9yIH19XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJsYWNrIHRleHQtd2hpdGVcIj5cbiAgICAgICAgICAgICAgICAgICAge2FjdGl2ZUNhdGVnb3J5LmxhYmVsfVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IHJvdW5kZWQgdGV4dC1bMTBweF0gZm9udC1tb25vIGZvbnQtYm9sZCBiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAge2FjdGl2ZUNhdGVnb3J5LmNvdW50fSBpbmN5ZGVudMOzd1xuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IHJvdW5kZWQgdGV4dC1bMTBweF0gZm9udC1tb25vIGZvbnQtYmxhY2sgdGV4dC13aGl0ZVwiXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmRDb2xvcjogYWN0aXZlQ2F0ZWdvcnkuY29sb3IgfX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgeyhhY3RpdmVDYXRlZ29yeS5wZXJjZW50YWdlIHx8IDApLnRvRml4ZWQoMSl9JVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTIuNSBzcGFjZS15LTEuNSB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIGZvbnQtbW9ubyB0ZXh0LVsxMXB4XVwiPldla3RvciBBZ3Jlc2ppOiA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTIwMFwiPnthY3RpdmVDYXRlZ29yeS5wcmltYXJ5VmVjdG9yfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1lbWVyYWxkLTQwMCBmb250LW1vbm8gdGV4dC1bMTFweF1cIj5NZXRvZGEgVWJvanU6IDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC0yMDBcIj57YWN0aXZlQ2F0ZWdvcnkubmV1dHJhbGl6YXRpb25NZXRob2R9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBmbGV4LXdyYXAgcHQtMVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgZm9udC1tb25vIHRleHQtWzExcHhdXCI+TmFkdcW8eXdhbmUgQVBJOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIHthY3RpdmVDYXRlZ29yeS50eXBpY2FsQXBpcy5tYXAoKGFwaSwgaWR4KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIFxuICAgICAgICAgICAgICAgICAgICAgIGtleT17aWR4fSBcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0xLjUgcHktMC41IHJvdW5kZWQgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIGZvbnQtbW9ubyB0ZXh0LVsxMHB4XSB0ZXh0LWN5YW4tMzAwXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIHthcGl9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7LyogQ2F0ZWdvcnkgTGlzdCAmIFF1aWNrIFRvZ2dsZXMgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNSBtYXgtaC01NiBvdmVyZmxvdy15LWF1dG8gcHItMVwiPlxuICAgICAgICAgICAge2ZpbHRlcmVkRGF0YS5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSBpdGVtLmlkID09PSAoaG92ZXJlZENhdGVnb3J5SWQgfHwgc2VsZWN0ZWRDYXRlZ29yeUlkKTtcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICBrZXk9e2l0ZW0uaWR9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdGVkQ2F0ZWdvcnlJZChpdGVtLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9uU2VsZWN0Q2F0ZWdvcnkpIG9uU2VsZWN0Q2F0ZWdvcnkoaXRlbSk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiBzZXRIb3ZlcmVkQ2F0ZWdvcnlJZChpdGVtLmlkKX1cbiAgICAgICAgICAgICAgICAgIG9uTW91c2VMZWF2ZT17KCkgPT4gc2V0SG92ZXJlZENhdGVnb3J5SWQobnVsbCl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BwLTIgcm91bmRlZC14bCBib3JkZXIgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0yIHRleHQteHMgJHtcbiAgICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZCBcbiAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1zbGF0ZS04MDAvOTAgYm9yZGVyLXNsYXRlLTYwMCBzaGFkb3ctbWQgc2NhbGUtWzEuMDFdJyBcbiAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05NTAvNjAgaG92ZXI6Ymctc2xhdGUtODAwLzUwIGJvcmRlci1zbGF0ZS04MDAvODAgdGV4dC1zbGF0ZS00MDAnXG4gICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yLjUgbWluLXctMFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTIuNSBoLTIuNSByb3VuZGVkLWZ1bGwgZmxleC1zaHJpbmstMFwiXG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgYmFja2dyb3VuZENvbG9yOiBpdGVtLmNvbG9yIH19XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS0yMDAgdHJ1bmNhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7aXRlbS5zaG9ydExhYmVsfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBmbGV4LXNocmluay0wXCI+XG4gICAgICAgICAgICAgICAgICAgIHsvKiBWaXN1YWwgbWluaSBiYXIgKi99XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xNiBoLTEuNSBiZy1zbGF0ZS05MDAgcm91bmRlZC1mdWxsIG92ZXJmbG93LWhpZGRlbiBoaWRkZW4gc206YmxvY2tcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaC1mdWxsIHJvdW5kZWQtZnVsbCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi01MDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBgJHtpdGVtLnBlcmNlbnRhZ2UgfHwgMH0lYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBpdGVtLmNvbG9yIFxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1zbGF0ZS00MDAgdGV4dC1bMTFweF1cIj5cbiAgICAgICAgICAgICAgICAgICAgICB7aXRlbS5jb3VudH1cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb250LW1vbm8gZm9udC1ib2xkIHRleHQtWzExcHhdIHctMTIgdGV4dC1yaWdodFwiXG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgY29sb3I6IGl0ZW0uY29sb3IgfX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIHsoaXRlbS5wZXJjZW50YWdlIHx8IDApLnRvRml4ZWQoMSl9JVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIFF1aWNrIEFjdGlvbiBGb290ZXIgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdC0yIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LVsxMXB4XSBmb250LW1vbm8gdGV4dC1zbGF0ZS00MDAgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMC84MFwiPlxuICAgICAgICAgICAgPHNwYW4+QWxnb3J5dG06IGQzLnBpZSgpICsgZDMuYXJjKCkgKyBTVkcgRmlsdGVyczwvc3Bhbj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlUmVzZXREYXRhfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlIHRyYW5zaXRpb24tY29sb3JzIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgUmVzZXR1aiBTdGF0eXN0eWtpXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwibWFwcGluZ3MiOiJBQWtWYztBQWxWZCxTQUFnQixXQUFXLFFBQVEsVUFBVSxlQUFlO0FBQzVELFlBQVksUUFBUTtBQUNwQjtBQUFBLEVBQ0UsWUFBWTtBQUFBLEVBQWdDO0FBQUEsT0FHdkM7QUFnQlAsTUFBTSw0QkFBa0Q7QUFBQSxFQUN0RDtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osT0FBTztBQUFBLElBQ1AsWUFBWTtBQUFBLElBQ1osT0FBTztBQUFBLElBQ1AsT0FBTztBQUFBO0FBQUEsSUFDUCxXQUFXO0FBQUEsSUFDWCxlQUFlO0FBQUEsSUFDZixzQkFBc0I7QUFBQSxJQUN0QixhQUFhLENBQUMsOEJBQThCLGtDQUFrQyxxQkFBcUI7QUFBQSxJQUNuRyxVQUFVO0FBQUEsRUFDWjtBQUFBLEVBQ0E7QUFBQSxJQUNFLElBQUk7QUFBQSxJQUNKLE9BQU87QUFBQSxJQUNQLFlBQVk7QUFBQSxJQUNaLE9BQU87QUFBQSxJQUNQLE9BQU87QUFBQTtBQUFBLElBQ1AsV0FBVztBQUFBLElBQ1gsZUFBZTtBQUFBLElBQ2Ysc0JBQXNCO0FBQUEsSUFDdEIsYUFBYSxDQUFDLHFDQUFxQyxrQkFBa0Isa0JBQWtCO0FBQUEsSUFDdkYsVUFBVTtBQUFBLEVBQ1o7QUFBQSxFQUNBO0FBQUEsSUFDRSxJQUFJO0FBQUEsSUFDSixPQUFPO0FBQUEsSUFDUCxZQUFZO0FBQUEsSUFDWixPQUFPO0FBQUEsSUFDUCxPQUFPO0FBQUE7QUFBQSxJQUNQLFdBQVc7QUFBQSxJQUNYLGVBQWU7QUFBQSxJQUNmLHNCQUFzQjtBQUFBLElBQ3RCLGFBQWEsQ0FBQywrQkFBK0IsK0JBQStCLGtCQUFrQjtBQUFBLElBQzlGLFVBQVU7QUFBQSxFQUNaO0FBQUEsRUFDQTtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osT0FBTztBQUFB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