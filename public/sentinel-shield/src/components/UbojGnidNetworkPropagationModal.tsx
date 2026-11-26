import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"];
import {
  X,
  Network,
  Download,
  Server,
  Activity,
  Cpu,
  HardDrive,
  Wifi,
  Send
} from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import {
  ubojGnidNetworkPropagation
} from "/sentinel-shield/src/utils/ubojGnidNetworkPropagation.ts";
export const UbojGnidNetworkPropagationModal = ({ isOpen, onClose }) => {
  const [propState, setPropState] = useState(() => ubojGnidNetworkPropagation.getState());
  const [selectedSubCmd, setSelectedSubCmd] = useState(null);
  const [customThreatTarget, setCustomThreatTarget] = useState("flutter_desktop_overlay.exe / stealth_miner.exe");
  const [activeTab, setActiveTab] = useState("COMMANDS_TABLE");
  useEffect(() => {
    const unsub = ubojGnidNetworkPropagation.subscribe((s) => {
      setPropState(s);
    });
    return unsub;
  }, []);
  if (!isOpen) return null;
  const handleBroadcastNow = () => {
    ubojGnidNetworkPropagation.broadcastUbojGnidCommand(customThreatTarget);
  };
  const handleDownloadPython = () => {
    const script = ubojGnidNetworkPropagation.generatePythonBroadcasterScript();
    const blob = new Blob([script], { type: "text/x-python;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `uboj_gnid_network_broadcaster_${Date.now()}.py`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const handleDownloadPowerShell = () => {
    const script = ubojGnidNetworkPropagation.generatePowerShellBroadcasterScript();
    const blob = new Blob([script], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Invoke-UbojGnidNetworkBroadcast_${Date.now()}.ps1`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200", children: /* @__PURE__ */ jsxDEV("div", { className: "relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl bg-slate-950 border-2 border-cyan-500/80 shadow-[0_0_60px_rgba(6,182,212,0.35)] overflow-hidden", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "p-5 border-b border-cyan-500/30 bg-gradient-to-r from-cyan-950/80 via-slate-950 to-rose-950/80 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-2xl bg-cyan-900/60 border border-cyan-500/80 text-cyan-300 shadow-md", children: /* @__PURE__ */ jsxDEV(Network, { className: "w-6 h-6 animate-pulse" }, void 0, false, {
          fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
          lineNumber: 71,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
          lineNumber: 70,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-black font-mono text-white tracking-wider", children: "ROZCHODZENIE PO SIECI ROZKAZU: UBÓJ GNID" }, void 0, false, {
              fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
              lineNumber: 75,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950 border border-cyan-500 text-cyan-300", children: "PAKIET 6 POLECEŃ (0 MS)" }, void 0, false, {
              fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
              lineNumber: 78,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
            lineNumber: 74,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-300 font-mono mt-0.5", children: "Wielokanałowa propagacja pakietu dekapitacji i defragmentacji: THz Optical Bus, Multicast UDP (239.255.42.99:9876), PCIe Ring & WebMesh." }, void 0, false, {
            fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
            lineNumber: 82,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
          lineNumber: 73,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
        lineNumber: 69,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: onClose,
          className: "p-2 rounded-xl bg-slate-900 hover:bg-cyan-950 border border-slate-700 hover:border-cyan-500/50 text-slate-400 hover:text-white transition-all cursor-pointer",
          children: /* @__PURE__ */ jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
            fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
            lineNumber: 92,
            columnNumber: 13
          }, this)
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
          lineNumber: 88,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
      lineNumber: 68,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "p-4 bg-slate-900/90 border-b border-slate-800 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 font-mono text-xs", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-1", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 text-[11px] shrink-0", children: "Cel Pacyfikacji:" }, void 0, false, {
          fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
          lineNumber: 99,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(
          "input",
          {
            type: "text",
            value: customThreatTarget,
            onChange: (e) => setCustomThreatTarget(e.target.value),
            placeholder: "Wpisz nazwę procesu/malware...",
            className: "px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-cyan-300 text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-full"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
            lineNumber: 100,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
        lineNumber: 98,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 shrink-0", children: /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: handleBroadcastNow,
          disabled: propState.isBroadcasting,
          className: "px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-rose-600 to-amber-500 hover:from-cyan-400 hover:to-amber-400 text-white font-black text-xs flex items-center gap-2 shadow-lg shadow-cyan-950/60 active:scale-95 transition-all cursor-pointer",
          children: [
            /* @__PURE__ */ jsxDEV(Send, { className: `w-4 h-4 ${propState.isBroadcasting ? "animate-spin" : "animate-bounce"}` }, void 0, false, {
              fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
              lineNumber: 115,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: propState.isBroadcasting ? "ROZCHODZENIE PO SIECI..." : "⚡ ROZGŁOŚ ROZKAZ UBÓJ GNID (0 MS)" }, void 0, false, {
              fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
              lineNumber: 116,
              columnNumber: 15
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
          lineNumber: 110,
          columnNumber: 13
        },
        this
      ) }, void 0, false, {
        fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
        lineNumber: 109,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
      lineNumber: 97,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "px-5 pt-3 bg-slate-950 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab("COMMANDS_TABLE"),
            className: `px-3 py-2 border-b-2 font-bold transition-all cursor-pointer ${activeTab === "COMMANDS_TABLE" ? "border-cyan-400 text-cyan-300" : "border-transparent text-slate-400 hover:text-white"}`,
            children: "1. Pakiet 6 Poleceń Składowych"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
            lineNumber: 124,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab("NETWORK_MESH"),
            className: `px-3 py-2 border-b-2 font-bold transition-all cursor-pointer ${activeTab === "NETWORK_MESH" ? "border-cyan-400 text-cyan-300" : "border-transparent text-slate-400 hover:text-white"}`,
            children: "2. Węzły Sieciowe & Topologia (4 Węzły <10m)"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
            lineNumber: 134,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab("SCRIPT_EXPORTERS"),
            className: `px-3 py-2 border-b-2 font-bold transition-all cursor-pointer ${activeTab === "SCRIPT_EXPORTERS" ? "border-cyan-400 text-cyan-300" : "border-transparent text-slate-400 hover:text-white"}`,
            children: "3. Generator Skryptów Sieciowych (.py / .ps1)"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
            lineNumber: 144,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
        lineNumber: 123,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 text-[11px] text-slate-400 pb-2 sm:pb-0", children: [
        /* @__PURE__ */ jsxDEV("span", { children: [
          "Wysłano Pakietów: ",
          /* @__PURE__ */ jsxDEV("strong", { className: "text-cyan-300", children: propState.totalPacketsBroadcasted }, void 0, false, {
            fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
            lineNumber: 157,
            columnNumber: 37
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
          lineNumber: 157,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: [
          "Egzekucji 0ms: ",
          /* @__PURE__ */ jsxDEV("strong", { className: "text-rose-400", children: propState.totalSubCommandsExecuted }, void 0, false, {
            fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
            lineNumber: 158,
            columnNumber: 34
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
          lineNumber: 158,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: [
          "Nośna: ",
          /* @__PURE__ */ jsxDEV("strong", { className: "text-purple-300", children: [
            propState.carrierFrequencyThz,
            " THz"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
            lineNumber: 159,
            columnNumber: 26
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
          lineNumber: 159,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
        lineNumber: 156,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
      lineNumber: 122,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex-1 overflow-y-auto p-5 space-y-4 max-h-[520px]", children: [
      activeTab === "COMMANDS_TABLE" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-3 font-mono text-xs", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-slate-300 leading-relaxed", children: [
          "Każde wywołanie rozkazu ",
          /* @__PURE__ */ jsxDEV("strong", { className: "text-rose-400", children: '"Ubój gnid"' }, void 0, false, {
            fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
            lineNumber: 170,
            columnNumber: 41
          }, this),
          " generuje nierozerwalny pakiet 6 poleceń atomowych, które rozchodzą się symultanicznie po magistralach sprzętowych i sieci LAN, uniemożliwiając agresorowi mutację lub ucieczkę w pamięci."
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
          lineNumber: 169,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 gap-2.5", children: propState.subCommands.map((cmd) => /* @__PURE__ */ jsxDEV(
          "div",
          {
            onClick: () => setSelectedSubCmd(cmd),
            className: "p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/60 transition-all cursor-pointer space-y-2 group",
            children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-start justify-between gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded-lg bg-rose-950 border border-rose-500/70 text-rose-300 font-bold text-[11px]", children: cmd.cmdId }, void 0, false, {
                    fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                    lineNumber: 182,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "font-black text-white text-sm group-hover:text-cyan-300 transition-colors", children: cmd.name }, void 0, false, {
                      fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                      lineNumber: 186,
                      columnNumber: 27
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400", children: [
                      "Kod: ",
                      /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-400 font-bold", children: cmd.code }, void 0, false, {
                        fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                        lineNumber: 190,
                        columnNumber: 34
                      }, this),
                      " • Podsystem: ",
                      /* @__PURE__ */ jsxDEV("span", { className: "text-slate-300", children: cmd.targetSubsystem }, void 0, false, {
                        fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                        lineNumber: 190,
                        columnNumber: 107
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                      lineNumber: 189,
                      columnNumber: 27
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                    lineNumber: 185,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                  lineNumber: 181,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-950 border border-slate-700 text-slate-300", children: cmd.channel }, void 0, false, {
                    fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                    lineNumber: 196,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-600", children: cmd.executionStatus }, void 0, false, {
                    fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                    lineNumber: 199,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                  lineNumber: 195,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                lineNumber: 180,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-300 leading-relaxed", children: cmd.description }, void 0, false, {
                fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                lineNumber: 205,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px] pt-1 border-t border-slate-800/80 text-slate-400", children: [
                /* @__PURE__ */ jsxDEV("div", { children: [
                  "Protokół: ",
                  /* @__PURE__ */ jsxDEV("strong", { className: "text-rose-300 font-mono", children: cmd.actionProtocol }, void 0, false, {
                    fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                    lineNumber: 210,
                    columnNumber: 38
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                  lineNumber: 210,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("div", { children: [
                  "Opóźnienie: ",
                  /* @__PURE__ */ jsxDEV("strong", { className: "text-emerald-400 font-mono", children: [
                    cmd.propagationLatencyMs,
                    " ms"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                    lineNumber: 211,
                    columnNumber: 40
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                  lineNumber: 211,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("div", { children: [
                  "Rozmiar / SHA: ",
                  /* @__PURE__ */ jsxDEV("strong", { className: "text-cyan-300 font-mono", children: [
                    cmd.payloadSizeHexBytes,
                    " (",
                    cmd.checksumSha256.slice(0, 10),
                    "...)"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                    lineNumber: 212,
                    columnNumber: 43
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                  lineNumber: 212,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                lineNumber: 209,
                columnNumber: 21
              }, this)
            ]
          },
          cmd.cmdId,
          true,
          {
            fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
            lineNumber: 175,
            columnNumber: 19
          },
          this
        )) }, void 0, false, {
          fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
          lineNumber: 173,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
        lineNumber: 168,
        columnNumber: 13
      }, this),
      activeTab === "NETWORK_MESH" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-4 font-mono text-xs", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-2xl bg-slate-900 border border-cyan-500/40 flex items-center justify-between flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "font-bold text-white flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxDEV(Wifi, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
                fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                lineNumber: 226,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "ZAMKNIĘTA TOPOLOGIA ROZCHODZENIA (MODEL 4 WĘZŁÓW W ZASIĘGU < 10M)" }, void 0, false, {
                fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                lineNumber: 227,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
              lineNumber: 225,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] text-slate-400 mt-0.5", children: [
              "Multicast Broadcast: ",
              propState.multicastGroupIp,
              ":",
              propState.multicastPort,
              " • Nośna Optyczna: ",
              propState.carrierFrequencyThz,
              " THz"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
              lineNumber: 229,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
            lineNumber: 224,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "px-2.5 py-1 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-300 text-[10px] font-bold", children: "UTRATA PAKIETÓW: 0.00%" }, void 0, false, {
            fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
            lineNumber: 233,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
          lineNumber: 223,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: propState.meshNodes.map((node) => /* @__PURE__ */ jsxDEV(
          "div",
          {
            className: "p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 transition-all space-y-2",
            children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-xl bg-slate-950 border border-cyan-500/50 text-cyan-300", children: /* @__PURE__ */ jsxDEV(Server, { className: "w-4 h-4" }, void 0, false, {
                    fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                    lineNumber: 247,
                    columnNumber: 27
                  }, this) }, void 0, false, {
                    fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                    lineNumber: 246,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "font-black text-white", children: node.callsign }, void 0, false, {
                      fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                      lineNumber: 250,
                      columnNumber: 27
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400", children: [
                      "ID: ",
                      node.nodeId,
                      " • Dystans: ",
                      /* @__PURE__ */ jsxDEV("strong", { className: "text-cyan-300", children: [
                        node.distanceMeters,
                        " m"
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                        lineNumber: 251,
                        columnNumber: 100
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                      lineNumber: 251,
                      columnNumber: 27
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                    lineNumber: 249,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                  lineNumber: 245,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-600", children: node.status }, void 0, false, {
                  fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                  lineNumber: 254,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                lineNumber: 244,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 text-[11px] text-slate-300 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800/80", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Adres / Magistrala:" }, void 0, false, {
                    fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                    lineNumber: 261,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-300 font-bold", children: node.ipAddress }, void 0, false, {
                    fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                    lineNumber: 262,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                  lineNumber: 260,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Magistrala Fizyczna:" }, void 0, false, {
                    fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                    lineNumber: 265,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-200", children: node.hardwareBus }, void 0, false, {
                    fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                    lineNumber: 266,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                  lineNumber: 264,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Czas Dotarcia Pakietu:" }, void 0, false, {
                    fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                    lineNumber: 269,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-bold", children: [
                    node.propagationDelayMs,
                    " ms"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                    lineNumber: 270,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                  lineNumber: 268,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Odebrane Polecenia:" }, void 0, false, {
                    fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                    lineNumber: 273,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-amber-300 font-bold", children: [
                    node.receivedSubCommandsCount,
                    " / 6 Poleceń (100%)"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                    lineNumber: 274,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                  lineNumber: 272,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                lineNumber: 259,
                columnNumber: 21
              }, this)
            ]
          },
          node.nodeId,
          true,
          {
            fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
            lineNumber: 240,
            columnNumber: 19
          },
          this
        )) }, void 0, false, {
          fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
          lineNumber: 238,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "font-bold text-white text-[11px] flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxDEV(Activity, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
              fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
              lineNumber: 284,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "HISTORIA OSTATNICH ROZGŁOSZEŃ ROZKAZU W SIECI" }, void 0, false, {
              fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
              lineNumber: 285,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
            lineNumber: 283,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5 max-h-36 overflow-y-auto", children: propState.propagationHistory.map((h) => /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-xl bg-slate-950 border border-slate-800/80 text-[10px] flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-400 font-bold", children: h.timestamp }, void 0, false, {
                fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                lineNumber: 291,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-200 truncate max-w-[220px]", children: h.targetThreat }, void 0, false, {
                fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                lineNumber: 292,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
              lineNumber: 290,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: [
                h.subCommandsDelivered,
                " poleceń / ",
                h.networkReachNodes,
                " węzły (",
                h.avgLatencyMs,
                " ms)"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                lineNumber: 295,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-bold", children: h.status }, void 0, false, {
                fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                lineNumber: 296,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
              lineNumber: 294,
              columnNumber: 23
            }, this)
          ] }, h.id, true, {
            fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
            lineNumber: 289,
            columnNumber: 21
          }, this)) }, void 0, false, {
            fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
            lineNumber: 287,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
          lineNumber: 282,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
        lineNumber: 222,
        columnNumber: 13
      }, this),
      activeTab === "SCRIPT_EXPORTERS" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-4 font-mono text-xs", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-2xl bg-slate-900 border border-cyan-500/40 text-slate-300", children: 'Pobierz gotowe skrypty sieciowe do wysyłania pełnego pakietu 6 poleceń rozkazu "Ubój gnid" w środowisku zewnętrznym Windows, Linux lub routerach przemysłowych.' }, void 0, false, {
          fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
          lineNumber: 308,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "font-black text-white text-sm flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV(HardDrive, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                  lineNumber: 317,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Python Raw Sockets & Multicast Broadcaster" }, void 0, false, {
                  fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                  lineNumber: 318,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                lineNumber: 316,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-600 font-bold", children: ".PY SCRIPT" }, void 0, false, {
                fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                lineNumber: 320,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
              lineNumber: 315,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400 leading-relaxed", children: "Wysyła ramki 6 poleceń po gnieździe UDP Multicast 239.255.42.99:9876, wylicza sumy SHA-256 i wymusza dekapitację w pamięci operacyjnej." }, void 0, false, {
              fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
              lineNumber: 324,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: handleDownloadPython,
                className: "w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-emerald-500/50 text-emerald-300 font-bold flex items-center justify-center gap-2 transition-all cursor-pointer",
                children: [
                  /* @__PURE__ */ jsxDEV(Download, { className: "w-4 h-4" }, void 0, false, {
                    fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                    lineNumber: 331,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Pobierz uboj_gnid_network_broadcaster.py" }, void 0, false, {
                    fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                    lineNumber: 332,
                    columnNumber: 21
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                lineNumber: 327,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
            lineNumber: 314,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "font-black text-white text-sm flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV(Cpu, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                  lineNumber: 340,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "PowerShell Windows Native Broadcaster" }, void 0, false, {
                  fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                  lineNumber: 341,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                lineNumber: 339,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-600 font-bold", children: ".PS1 SCRIPT" }, void 0, false, {
                fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                lineNumber: 343,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
              lineNumber: 338,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400 leading-relaxed", children: "Natywny skrypt PowerShell wykorzystujący System.Net.Sockets.UdpClient do natychmiastowego rozgłaszania poleceń do wszystkich urządzeń w LAN." }, void 0, false, {
              fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
              lineNumber: 347,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: handleDownloadPowerShell,
                className: "w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-cyan-500/50 text-cyan-300 font-bold flex items-center justify-center gap-2 transition-all cursor-pointer",
                children: [
                  /* @__PURE__ */ jsxDEV(Download, { className: "w-4 h-4" }, void 0, false, {
                    fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                    lineNumber: 354,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Pobierz Invoke-UbojGnidNetworkBroadcast.ps1" }, void 0, false, {
                    fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                    lineNumber: 355,
                    columnNumber: 21
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
                lineNumber: 350,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
            lineNumber: 337,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
          lineNumber: 312,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
        lineNumber: 307,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
      lineNumber: 164,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between font-mono text-xs", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "text-slate-500 text-[11px]", children: "Sentinel Multi-Channel Broadcast Engine • Nośna 940.8 THz • Multicast 239.255.42.99:9876" }, void 0, false, {
        fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
        lineNumber: 366,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: onClose,
          className: "px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-cyan-950 border border-slate-700 hover:border-cyan-500/50 text-slate-300 hover:text-white transition-all cursor-pointer",
          children: "Zamknij"
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
          lineNumber: 369,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
      lineNumber: 365,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
    lineNumber: 65,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/applet/src/components/UbojGnidNetworkPropagationModal.tsx",
    lineNumber: 64,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlVib2pHbmlkTmV0d29ya1Byb3BhZ2F0aW9uTW9kYWwudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgXG4gIFgsIFJhZGlvLCBOZXR3b3JrLCBaYXAsIENoZWNrQ2lyY2xlMiwgU2hpZWxkLCBGbGFtZSwgXG4gIERvd25sb2FkLCBBcnJvd1JpZ2h0LCBTZXJ2ZXIsIEFjdGl2aXR5LCBMb2NrLCBTa3VsbCwgXG4gIFNwYXJrbGVzLCBSZWZyZXNoQ3csIENwdSwgTGF5ZXJzLCBIYXJkRHJpdmUsIFdpZmksIFNlbmRcbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IFxuICB1Ym9qR25pZE5ldHdvcmtQcm9wYWdhdGlvbiwgXG4gIE5ldHdvcmtQcm9wYWdhdGlvblN0YXRlLCBcbiAgVWJvakduaWRTdWJDb21tYW5kIFxufSBmcm9tICcuLi91dGlscy91Ym9qR25pZE5ldHdvcmtQcm9wYWdhdGlvbic7XG5cbmludGVyZmFjZSBQcm9wcyB7XG4gIGlzT3BlbjogYm9vbGVhbjtcbiAgb25DbG9zZTogKCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGNvbnN0IFVib2pHbmlkTmV0d29ya1Byb3BhZ2F0aW9uTW9kYWw6IFJlYWN0LkZDPFByb3BzPiA9ICh7IGlzT3Blbiwgb25DbG9zZSB9KSA9PiB7XG4gIGNvbnN0IFtwcm9wU3RhdGUsIHNldFByb3BTdGF0ZV0gPSB1c2VTdGF0ZTxOZXR3b3JrUHJvcGFnYXRpb25TdGF0ZT4oKCkgPT4gdWJvakduaWROZXR3b3JrUHJvcGFnYXRpb24uZ2V0U3RhdGUoKSk7XG4gIGNvbnN0IFtzZWxlY3RlZFN1YkNtZCwgc2V0U2VsZWN0ZWRTdWJDbWRdID0gdXNlU3RhdGU8VWJvakduaWRTdWJDb21tYW5kIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtjdXN0b21UaHJlYXRUYXJnZXQsIHNldEN1c3RvbVRocmVhdFRhcmdldF0gPSB1c2VTdGF0ZTxzdHJpbmc+KCdmbHV0dGVyX2Rlc2t0b3Bfb3ZlcmxheS5leGUgLyBzdGVhbHRoX21pbmVyLmV4ZScpO1xuICBjb25zdCBbYWN0aXZlVGFiLCBzZXRBY3RpdmVUYWJdID0gdXNlU3RhdGU8J0NPTU1BTkRTX1RBQkxFJyB8ICdORVRXT1JLX01FU0gnIHwgJ1NDUklQVF9FWFBPUlRFUlMnPignQ09NTUFORFNfVEFCTEUnKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHVuc3ViID0gdWJvakduaWROZXR3b3JrUHJvcGFnYXRpb24uc3Vic2NyaWJlKHMgPT4ge1xuICAgICAgc2V0UHJvcFN0YXRlKHMpO1xuICAgIH0pO1xuICAgIHJldHVybiB1bnN1YjtcbiAgfSwgW10pO1xuXG4gIGlmICghaXNPcGVuKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBoYW5kbGVCcm9hZGNhc3ROb3cgPSAoKSA9PiB7XG4gICAgdWJvakduaWROZXR3b3JrUHJvcGFnYXRpb24uYnJvYWRjYXN0VWJvakduaWRDb21tYW5kKGN1c3RvbVRocmVhdFRhcmdldCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRG93bmxvYWRQeXRob24gPSAoKSA9PiB7XG4gICAgY29uc3Qgc2NyaXB0ID0gdWJvakduaWROZXR3b3JrUHJvcGFnYXRpb24uZ2VuZXJhdGVQeXRob25Ccm9hZGNhc3RlclNjcmlwdCgpO1xuICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbc2NyaXB0XSwgeyB0eXBlOiAndGV4dC94LXB5dGhvbjtjaGFyc2V0PXV0Zi04JyB9KTtcbiAgICBjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgIGNvbnN0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgYS5ocmVmID0gdXJsO1xuICAgIGEuZG93bmxvYWQgPSBgdWJval9nbmlkX25ldHdvcmtfYnJvYWRjYXN0ZXJfJHtEYXRlLm5vdygpfS5weWA7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhKTtcbiAgICBhLmNsaWNrKCk7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChhKTtcbiAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRG93bmxvYWRQb3dlclNoZWxsID0gKCkgPT4ge1xuICAgIGNvbnN0IHNjcmlwdCA9IHVib2pHbmlkTmV0d29ya1Byb3BhZ2F0aW9uLmdlbmVyYXRlUG93ZXJTaGVsbEJyb2FkY2FzdGVyU2NyaXB0KCk7XG4gICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtzY3JpcHRdLCB7IHR5cGU6ICd0ZXh0L3BsYWluO2NoYXJzZXQ9dXRmLTgnIH0pO1xuICAgIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgY29uc3QgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBhLmhyZWYgPSB1cmw7XG4gICAgYS5kb3dubG9hZCA9IGBJbnZva2UtVWJvakduaWROZXR3b3JrQnJvYWRjYXN0XyR7RGF0ZS5ub3coKX0ucHMxYDtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGEpO1xuICAgIGEuY2xpY2soKTtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGEpO1xuICAgIFVSTC5yZXZva2VPYmplY3RVUkwodXJsKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTUwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHAtNCBiZy1ibGFjay84NSBiYWNrZHJvcC1ibHVyLW1kIGFuaW1hdGUtaW4gZmFkZS1pbiBkdXJhdGlvbi0yMDBcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgdy1mdWxsIG1heC13LTV4bCBtYXgtaC1bOTJ2aF0gZmxleCBmbGV4LWNvbCByb3VuZGVkLTN4bCBiZy1zbGF0ZS05NTAgYm9yZGVyLTIgYm9yZGVyLWN5YW4tNTAwLzgwIHNoYWRvdy1bMF8wXzYwcHhfcmdiYSg2LDE4MiwyMTIsMC4zNSldIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICBcbiAgICAgICAgey8qIE1vZGFsIEhlYWRlciAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTUgYm9yZGVyLWIgYm9yZGVyLWN5YW4tNTAwLzMwIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1jeWFuLTk1MC84MCB2aWEtc2xhdGUtOTUwIHRvLXJvc2UtOTUwLzgwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMi41IHJvdW5kZWQtMnhsIGJnLWN5YW4tOTAwLzYwIGJvcmRlciBib3JkZXItY3lhbi01MDAvODAgdGV4dC1jeWFuLTMwMCBzaGFkb3ctbWRcIj5cbiAgICAgICAgICAgICAgPE5ldHdvcmsgY2xhc3NOYW1lPVwidy02IGgtNiBhbmltYXRlLXB1bHNlXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBmbGV4LXdyYXBcIj5cbiAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LWJsYWNrIGZvbnQtbW9ubyB0ZXh0LXdoaXRlIHRyYWNraW5nLXdpZGVyXCI+XG4gICAgICAgICAgICAgICAgICBST1pDSE9EWkVOSUUgUE8gU0lFQ0kgUk9aS0FaVTogVULDk0ogR05JRFxuICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMiBweS0wLjUgcm91bmRlZC1mdWxsIHRleHQtWzEwcHhdIGZvbnQtbW9ubyBmb250LWJvbGQgYmctY3lhbi05NTAgYm9yZGVyIGJvcmRlci1jeWFuLTUwMCB0ZXh0LWN5YW4tMzAwXCI+XG4gICAgICAgICAgICAgICAgICBQQUtJRVQgNiBQT0xFQ0XFgyAoMCBNUylcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtMzAwIGZvbnQtbW9ubyBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgICBXaWVsb2thbmHFgm93YSBwcm9wYWdhY2phIHBha2lldHUgZGVrYXBpdGFjamkgaSBkZWZyYWdtZW50YWNqaTogVEh6IE9wdGljYWwgQnVzLCBNdWx0aWNhc3QgVURQICgyMzkuMjU1LjQyLjk5Ojk4NzYpLCBQQ0llIFJpbmcgJiBXZWJNZXNoLlxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2xvc2V9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC14bCBiZy1zbGF0ZS05MDAgaG92ZXI6YmctY3lhbi05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgaG92ZXI6Ym9yZGVyLWN5YW4tNTAwLzUwIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxYIGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogR2xvYmFsIEJyb2FkY2FzdCBBY3Rpb24gQmFyICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCBiZy1zbGF0ZS05MDAvOTAgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMCBmbGV4IGZsZXgtY29sIGxnOmZsZXgtcm93IGl0ZW1zLXN0cmV0Y2ggbGc6aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMyBmb250LW1vbm8gdGV4dC14c1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgZmxleC0xXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCB0ZXh0LVsxMXB4XSBzaHJpbmstMFwiPkNlbCBQYWN5ZmlrYWNqaTo8L3NwYW4+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICB2YWx1ZT17Y3VzdG9tVGhyZWF0VGFyZ2V0fVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEN1c3RvbVRocmVhdFRhcmdldChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiV3Bpc3ogbmF6d8SZIHByb2Nlc3UvbWFsd2FyZS4uLlwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMgcHktMS41IHJvdW5kZWQteGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHRleHQtY3lhbi0zMDAgdGV4dC14cyBwbGFjZWhvbGRlci1zbGF0ZS01MDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1jeWFuLTUwMCB3LWZ1bGxcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgc2hyaW5rLTBcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlQnJvYWRjYXN0Tm93fVxuICAgICAgICAgICAgICBkaXNhYmxlZD17cHJvcFN0YXRlLmlzQnJvYWRjYXN0aW5nfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTIgcm91bmRlZC14bCBiZy1ncmFkaWVudC10by1yIGZyb20tY3lhbi01MDAgdmlhLXJvc2UtNjAwIHRvLWFtYmVyLTUwMCBob3Zlcjpmcm9tLWN5YW4tNDAwIGhvdmVyOnRvLWFtYmVyLTQwMCB0ZXh0LXdoaXRlIGZvbnQtYmxhY2sgdGV4dC14cyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBzaGFkb3ctbGcgc2hhZG93LWN5YW4tOTUwLzYwIGFjdGl2ZTpzY2FsZS05NSB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxTZW5kIGNsYXNzTmFtZT17YHctNCBoLTQgJHtwcm9wU3RhdGUuaXNCcm9hZGNhc3RpbmcgPyAnYW5pbWF0ZS1zcGluJyA6ICdhbmltYXRlLWJvdW5jZSd9YH0gLz5cbiAgICAgICAgICAgICAgPHNwYW4+e3Byb3BTdGF0ZS5pc0Jyb2FkY2FzdGluZyA/ICdST1pDSE9EWkVOSUUgUE8gU0lFQ0kuLi4nIDogJ+KaoSBST1pHxYFPxZogUk9aS0FaIFVCw5NKIEdOSUQgKDAgTVMpJ308L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIE5hdmlnYXRpb24gVGFicyAmIE1ldHJpY3MgU3VtbWFyeSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweC01IHB0LTMgYmctc2xhdGUtOTUwIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAgZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBzbTppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0yIGZvbnQtbW9ubyB0ZXh0LXhzXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTJcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCdDT01NQU5EU19UQUJMRScpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0zIHB5LTIgYm9yZGVyLWItMiBmb250LWJvbGQgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgICAgICBhY3RpdmVUYWIgPT09ICdDT01NQU5EU19UQUJMRSdcbiAgICAgICAgICAgICAgICAgID8gJ2JvcmRlci1jeWFuLTQwMCB0ZXh0LWN5YW4tMzAwJ1xuICAgICAgICAgICAgICAgICAgOiAnYm9yZGVyLXRyYW5zcGFyZW50IHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAxLiBQYWtpZXQgNiBQb2xlY2XFhCBTa8WCYWRvd3ljaFxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYignTkVUV09SS19NRVNIJyl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTMgcHktMiBib3JkZXItYi0yIGZvbnQtYm9sZCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciAke1xuICAgICAgICAgICAgICAgIGFjdGl2ZVRhYiA9PT0gJ05FVFdPUktfTUVTSCdcbiAgICAgICAgICAgICAgICAgID8gJ2JvcmRlci1jeWFuLTQwMCB0ZXh0LWN5YW4tMzAwJ1xuICAgICAgICAgICAgICAgICAgOiAnYm9yZGVyLXRyYW5zcGFyZW50IHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAyLiBXxJl6xYJ5IFNpZWNpb3dlICYgVG9wb2xvZ2lhICg0IFfEmXrFgnkgJmx0OzEwbSlcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUYWIoJ1NDUklQVF9FWFBPUlRFUlMnKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMyBweS0yIGJvcmRlci1iLTIgZm9udC1ib2xkIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgICAgYWN0aXZlVGFiID09PSAnU0NSSVBUX0VYUE9SVEVSUydcbiAgICAgICAgICAgICAgICAgID8gJ2JvcmRlci1jeWFuLTQwMCB0ZXh0LWN5YW4tMzAwJ1xuICAgICAgICAgICAgICAgICAgOiAnYm9yZGVyLXRyYW5zcGFyZW50IHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAzLiBHZW5lcmF0b3IgU2tyeXB0w7N3IFNpZWNpb3d5Y2ggKC5weSAvIC5wczEpXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgdGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDAgcGItMiBzbTpwYi0wXCI+XG4gICAgICAgICAgICA8c3Bhbj5XeXPFgmFubyBQYWtpZXTDs3c6IDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC1jeWFuLTMwMFwiPntwcm9wU3RhdGUudG90YWxQYWNrZXRzQnJvYWRjYXN0ZWR9PC9zdHJvbmc+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4+RWd6ZWt1Y2ppIDBtczogPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LXJvc2UtNDAwXCI+e3Byb3BTdGF0ZS50b3RhbFN1YkNvbW1hbmRzRXhlY3V0ZWR9PC9zdHJvbmc+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4+Tm/Fm25hOiA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtcHVycGxlLTMwMFwiPntwcm9wU3RhdGUuY2FycmllckZyZXF1ZW5jeVRoen0gVEh6PC9zdHJvbmc+PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogTW9kYWwgQm9keSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgb3ZlcmZsb3cteS1hdXRvIHAtNSBzcGFjZS15LTQgbWF4LWgtWzUyMHB4XVwiPlxuICAgICAgICAgIFxuICAgICAgICAgIHsvKiBUQUIgMTogNiBTVUItQ09NTUFORFMgVEFCTEUgKi99XG4gICAgICAgICAge2FjdGl2ZVRhYiA9PT0gJ0NPTU1BTkRTX1RBQkxFJyAmJiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMyBmb250LW1vbm8gdGV4dC14c1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyByb3VuZGVkLTJ4bCBiZy1jeWFuLTk1MC80MCBib3JkZXIgYm9yZGVyLWN5YW4tNTAwLzMwIHRleHQtc2xhdGUtMzAwIGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgICAgICAgIEthxbxkZSB3eXdvxYJhbmllIHJvemthenUgPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LXJvc2UtNDAwXCI+XCJVYsOzaiBnbmlkXCI8L3N0cm9uZz4gZ2VuZXJ1amUgbmllcm96ZXJ3YWxueSBwYWtpZXQgNiBwb2xlY2XFhCBhdG9tb3d5Y2gsIGt0w7NyZSByb3pjaG9kesSFIHNpxJkgc3ltdWx0YW5pY3puaWUgcG8gbWFnaXN0cmFsYWNoIHNwcnrEmXRvd3ljaCBpIHNpZWNpIExBTiwgdW5pZW1vxbxsaXdpYWrEhWMgYWdyZXNvcm93aSBtdXRhY2rEmSBsdWIgdWNpZWN6a8SZIHcgcGFtacSZY2kuXG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBnYXAtMi41XCI+XG4gICAgICAgICAgICAgICAge3Byb3BTdGF0ZS5zdWJDb21tYW5kcy5tYXAoKGNtZCkgPT4gKFxuICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBrZXk9e2NtZC5jbWRJZH1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2VsZWN0ZWRTdWJDbWQoY21kKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0zLjUgcm91bmRlZC0yeGwgYmctc2xhdGUtOTAwLzgwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIGhvdmVyOmJvcmRlci1jeWFuLTUwMC82MCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBzcGFjZS15LTIgZ3JvdXBcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtc3RhcnQganVzdGlmeS1iZXR3ZWVuIGdhcC0yIGZsZXgtd3JhcFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IHJvdW5kZWQtbGcgYmctcm9zZS05NTAgYm9yZGVyIGJvcmRlci1yb3NlLTUwMC83MCB0ZXh0LXJvc2UtMzAwIGZvbnQtYm9sZCB0ZXh0LVsxMXB4XVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7Y21kLmNtZElkfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb250LWJsYWNrIHRleHQtd2hpdGUgdGV4dC1zbSBncm91cC1ob3Zlcjp0ZXh0LWN5YW4tMzAwIHRyYW5zaXRpb24tY29sb3JzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2NtZC5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEtvZDogPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1jeWFuLTQwMCBmb250LWJvbGRcIj57Y21kLmNvZGV9PC9zcGFuPiDigKIgUG9kc3lzdGVtOiA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTMwMFwiPntjbWQudGFyZ2V0U3Vic3lzdGVtfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IHJvdW5kZWQtZnVsbCB0ZXh0LVsxMHB4XSBmb250LWJvbGQgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHRleHQtc2xhdGUtMzAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtjbWQuY2hhbm5lbH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IHJvdW5kZWQtZnVsbCB0ZXh0LVsxMHB4XSBmb250LWJvbGQgYmctZW1lcmFsZC05NTAgdGV4dC1lbWVyYWxkLTMwMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNjAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtjbWQuZXhlY3V0aW9uU3RhdHVzfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTMwMCBsZWFkaW5nLXJlbGF4ZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7Y21kLmRlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0zIGdhcC0yIHRleHQtWzEwcHhdIHB0LTEgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMC84MCB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXY+UHJvdG9rw7PFgjogPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LXJvc2UtMzAwIGZvbnQtbW9ub1wiPntjbWQuYWN0aW9uUHJvdG9jb2x9PC9zdHJvbmc+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdj5PcMOzxbpuaWVuaWU6IDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC1lbWVyYWxkLTQwMCBmb250LW1vbm9cIj57Y21kLnByb3BhZ2F0aW9uTGF0ZW5jeU1zfSBtczwvc3Ryb25nPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXY+Um96bWlhciAvIFNIQTogPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LWN5YW4tMzAwIGZvbnQtbW9ub1wiPntjbWQucGF5bG9hZFNpemVIZXhCeXRlc30gKHtjbWQuY2hlY2tzdW1TaGEyNTYuc2xpY2UoMCwgMTApfS4uLik8L3N0cm9uZz48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAgey8qIFRBQiAyOiBORVRXT1JLIE1FU0ggJiBUT1BPTE9HWSAqL31cbiAgICAgICAgICB7YWN0aXZlVGFiID09PSAnTkVUV09SS19NRVNIJyAmJiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNCBmb250LW1vbm8gdGV4dC14c1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMy41IHJvdW5kZWQtMnhsIGJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLWN5YW4tNTAwLzQwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBmbGV4LXdyYXAgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgIDxXaWZpIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1jeWFuLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlpBTUtOScSYVEEgVE9QT0xPR0lBIFJPWkNIT0RaRU5JQSAoTU9ERUwgNCBXxJhaxYHDk1cgVyBaQVNJxJhHVSAmbHQ7IDEwTSk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDAgbXQtMC41XCI+XG4gICAgICAgICAgICAgICAgICAgIE11bHRpY2FzdCBCcm9hZGNhc3Q6IHtwcm9wU3RhdGUubXVsdGljYXN0R3JvdXBJcH06e3Byb3BTdGF0ZS5tdWx0aWNhc3RQb3J0fSDigKIgTm/Fm25hIE9wdHljem5hOiB7cHJvcFN0YXRlLmNhcnJpZXJGcmVxdWVuY3lUaHp9IFRIelxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweC0yLjUgcHktMSByb3VuZGVkLXhsIGJnLWVtZXJhbGQtOTUwIGJvcmRlciBib3JkZXItZW1lcmFsZC01MDAgdGV4dC1lbWVyYWxkLTMwMCB0ZXh0LVsxMHB4XSBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgIFVUUkFUQSBQQUtJRVTDk1c6IDAuMDAlXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtM1wiPlxuICAgICAgICAgICAgICAgIHtwcm9wU3RhdGUubWVzaE5vZGVzLm1hcCgobm9kZSkgPT4gKFxuICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBrZXk9e25vZGUubm9kZUlkfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC0yeGwgYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIGhvdmVyOmJvcmRlci1jeWFuLTUwMC81MCB0cmFuc2l0aW9uLWFsbCBzcGFjZS15LTJcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtc3RhcnQganVzdGlmeS1iZXR3ZWVuIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1jeWFuLTUwMC81MCB0ZXh0LWN5YW4tMzAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxTZXJ2ZXIgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9udC1ibGFjayB0ZXh0LXdoaXRlXCI+e25vZGUuY2FsbHNpZ259PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDBcIj5JRDoge25vZGUubm9kZUlkfSDigKIgRHlzdGFuczogPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LWN5YW4tMzAwXCI+e25vZGUuZGlzdGFuY2VNZXRlcnN9IG08L3N0cm9uZz48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IHJvdW5kZWQtZnVsbCB0ZXh0LVsxMHB4XSBmb250LWJvbGQgYmctZW1lcmFsZC05NTAgdGV4dC1lbWVyYWxkLTMwMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNjAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7bm9kZS5zdGF0dXN9XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMSB0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTMwMCBiZy1zbGF0ZS05NTAvODAgcC0yLjUgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMC84MFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwXCI+QWRyZXMgLyBNYWdpc3RyYWxhOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtY3lhbi0zMDAgZm9udC1ib2xkXCI+e25vZGUuaXBBZGRyZXNzfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMFwiPk1hZ2lzdHJhbGEgRml6eWN6bmE6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS0yMDBcIj57bm9kZS5oYXJkd2FyZUJ1c308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDBcIj5DemFzIERvdGFyY2lhIFBha2lldHU6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1lbWVyYWxkLTQwMCBmb250LWJvbGRcIj57bm9kZS5wcm9wYWdhdGlvbkRlbGF5TXN9IG1zPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwXCI+T2RlYnJhbmUgUG9sZWNlbmlhOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYW1iZXItMzAwIGZvbnQtYm9sZFwiPntub2RlLnJlY2VpdmVkU3ViQ29tbWFuZHNDb3VudH0gLyA2IFBvbGVjZcWEICgxMDAlKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIFByb3BhZ2F0aW9uIExvZyBIaXN0b3J5ICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMy41IHJvdW5kZWQtMnhsIGJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LXdoaXRlIHRleHQtWzExcHhdIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICAgIDxBY3Rpdml0eSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWN5YW4tNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPkhJU1RPUklBIE9TVEFUTklDSCBST1pHxYFPU1pFxYMgUk9aS0FaVSBXIFNJRUNJPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjUgbWF4LWgtMzYgb3ZlcmZsb3cteS1hdXRvXCI+XG4gICAgICAgICAgICAgICAgICB7cHJvcFN0YXRlLnByb3BhZ2F0aW9uSGlzdG9yeS5tYXAoKGgpID0+IChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2guaWR9IGNsYXNzTmFtZT1cInAtMiByb3VuZGVkLXhsIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMC84MCB0ZXh0LVsxMHB4XSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWN5YW4tNDAwIGZvbnQtYm9sZFwiPntoLnRpbWVzdGFtcH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTIwMCB0cnVuY2F0ZSBtYXgtdy1bMjIwcHhdXCI+e2gudGFyZ2V0VGhyZWF0fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMFwiPntoLnN1YkNvbW1hbmRzRGVsaXZlcmVkfSBwb2xlY2XFhCAvIHtoLm5ldHdvcmtSZWFjaE5vZGVzfSB3xJl6xYJ5ICh7aC5hdmdMYXRlbmN5TXN9IG1zKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC00MDAgZm9udC1ib2xkXCI+e2guc3RhdHVzfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAgey8qIFRBQiAzOiBTQ1JJUFQgRVhQT1JURVJTICovfVxuICAgICAgICAgIHthY3RpdmVUYWIgPT09ICdTQ1JJUFRfRVhQT1JURVJTJyAmJiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNCBmb250LW1vbm8gdGV4dC14c1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMy41IHJvdW5kZWQtMnhsIGJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLWN5YW4tNTAwLzQwIHRleHQtc2xhdGUtMzAwXCI+XG4gICAgICAgICAgICAgICAgUG9iaWVyeiBnb3Rvd2Ugc2tyeXB0eSBzaWVjaW93ZSBkbyB3eXN5xYJhbmlhIHBlxYJuZWdvIHBha2lldHUgNiBwb2xlY2XFhCByb3prYXp1IFwiVWLDs2ogZ25pZFwiIHcgxZtyb2Rvd2lza3UgemV3bsSZdHJ6bnltIFdpbmRvd3MsIExpbnV4IGx1YiByb3V0ZXJhY2ggcHJ6ZW15c8WCb3d5Y2guXG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNFwiPlxuICAgICAgICAgICAgICAgIHsvKiBQeXRob24gQ2FyZCAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLTJ4bCBiZy1zbGF0ZS05MDAvOTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgc3BhY2UteS0zXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvbnQtYmxhY2sgdGV4dC13aGl0ZSB0ZXh0LXNtIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPEhhcmREcml2ZSBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlB5dGhvbiBSYXcgU29ja2V0cyAmIE11bHRpY2FzdCBCcm9hZGNhc3Rlcjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IHJvdW5kZWQgdGV4dC1bMTBweF0gYmctZW1lcmFsZC05NTAgdGV4dC1lbWVyYWxkLTMwMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNjAwIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgICAgIC5QWSBTQ1JJUFRcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMCBsZWFkaW5nLXJlbGF4ZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgV3lzecWCYSByYW1raSA2IHBvbGVjZcWEIHBvIGduaWXFumR6aWUgVURQIE11bHRpY2FzdCAyMzkuMjU1LjQyLjk5Ojk4NzYsIHd5bGljemEgc3VteSBTSEEtMjU2IGkgd3ltdXN6YSBkZWthcGl0YWNqxJkgdyBwYW1pxJljaSBvcGVyYWN5am5lai5cbiAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlRG93bmxvYWRQeXRob259XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweS0yLjUgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAgaG92ZXI6Ymctc2xhdGUtODAwIGJvcmRlciBib3JkZXItZW1lcmFsZC01MDAvNTAgdGV4dC1lbWVyYWxkLTMwMCBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8RG93bmxvYWQgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlBvYmllcnogdWJval9nbmlkX25ldHdvcmtfYnJvYWRjYXN0ZXIucHk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHsvKiBQb3dlclNoZWxsIENhcmQgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC0yeGwgYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHNwYWNlLXktM1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb250LWJsYWNrIHRleHQtd2hpdGUgdGV4dC1zbSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxDcHUgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWN5YW4tNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5Qb3dlclNoZWxsIFdpbmRvd3MgTmF0aXZlIEJyb2FkY2FzdGVyPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMiBweS0wLjUgcm91bmRlZCB0ZXh0LVsxMHB4XSBiZy1jeWFuLTk1MCB0ZXh0LWN5YW4tMzAwIGJvcmRlciBib3JkZXItY3lhbi02MDAgZm9udC1ib2xkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgLlBTMSBTQ1JJUFRcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMCBsZWFkaW5nLXJlbGF4ZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgTmF0eXdueSBza3J5cHQgUG93ZXJTaGVsbCB3eWtvcnp5c3R1asSFY3kgU3lzdGVtLk5ldC5Tb2NrZXRzLlVkcENsaWVudCBkbyBuYXR5Y2htaWFzdG93ZWdvIHJvemfFgmFzemFuaWEgcG9sZWNlxYQgZG8gd3N6eXN0a2ljaCB1cnrEhWR6ZcWEIHcgTEFOLlxuICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVEb3dubG9hZFBvd2VyU2hlbGx9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweS0yLjUgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAgaG92ZXI6Ymctc2xhdGUtODAwIGJvcmRlciBib3JkZXItY3lhbi01MDAvNTAgdGV4dC1jeWFuLTMwMCBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8RG93bmxvYWQgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlBvYmllcnogSW52b2tlLVVib2pHbmlkTmV0d29ya0Jyb2FkY2FzdC5wczE8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuXG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBNb2RhbCBGb290ZXIgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IGJnLXNsYXRlLTk1MCBib3JkZXItdCBib3JkZXItc2xhdGUtODAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBmb250LW1vbm8gdGV4dC14c1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDAgdGV4dC1bMTFweF1cIj5cbiAgICAgICAgICAgIFNlbnRpbmVsIE11bHRpLUNoYW5uZWwgQnJvYWRjYXN0IEVuZ2luZSDigKIgTm/Fm25hIDk0MC44IFRIeiDigKIgTXVsdGljYXN0IDIzOS4yNTUuNDIuOTk6OTg3NlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2xvc2V9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTEuNSByb3VuZGVkLXhsIGJnLXNsYXRlLTkwMCBob3ZlcjpiZy1jeWFuLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCBob3Zlcjpib3JkZXItY3lhbi01MDAvNTAgdGV4dC1zbGF0ZS0zMDAgaG92ZXI6dGV4dC13aGl0ZSB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgWmFta25palxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUFzRWM7QUF0RWQsU0FBZ0IsVUFBVSxpQkFBaUI7QUFDM0M7QUFBQSxFQUNFO0FBQUEsRUFBVTtBQUFBLEVBQ1Y7QUFBQSxFQUFzQjtBQUFBLEVBQVE7QUFBQSxFQUNUO0FBQUEsRUFBYTtBQUFBLEVBQVc7QUFBQSxFQUFNO0FBQUEsT0FDOUM7QUFDUDtBQUFBLEVBQ0U7QUFBQSxPQUdLO0FBT0EsYUFBTSxrQ0FBbUQsQ0FBQyxFQUFFLFFBQVEsUUFBUSxNQUFNO0FBQ3ZGLFFBQU0sQ0FBQyxXQUFXLFlBQVksSUFBSSxTQUFrQyxNQUFNLDJCQUEyQixTQUFTLENBQUM7QUFDL0csUUFBTSxDQUFDLGdCQUFnQixpQkFBaUIsSUFBSSxTQUFvQyxJQUFJO0FBQ3BGLFFBQU0sQ0FBQyxvQkFBb0IscUJBQXFCLElBQUksU0FBaUIsaURBQWlEO0FBQ3RILFFBQU0sQ0FBQyxXQUFXLFlBQVksSUFBSSxTQUFpRSxnQkFBZ0I7QUFF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