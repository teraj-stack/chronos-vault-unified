import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"];
import {
  FileText,
  Download,
  Copy,
  Check,
  Brain,
  Waves,
  Shield,
  Zap,
  Sparkles,
  Layers
} from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import { emWaveResonanceEngine } from "/sentinel-shield/src/utils/emWaveResonanceEngine.ts";
export const ComprehensiveWaveEnergyReport = ({
  onNotify
}) => {
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);
  const [activeSection, setActiveSection] = useState("ALL");
  const reportMarkdown = emWaveResonanceEngine.generateComprehensiveEnergyHyperbolizationReportMarkdown();
  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(reportMarkdown);
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 2500);
    if (onNotify) onNotify("📋 Skopiowano kompletny raport naukowy w formacie Markdown do schowka");
  };
  const handleDownloadMarkdown = () => {
    const blob = new Blob([reportMarkdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `RAPORT_NAUKOWY_FALE_EM_HIPERBOLIZACJA_ENERGII_MOZDZEK_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    if (onNotify) onNotify("📥 Pobrano plik raportu naukowego (.md)");
  };
  const handleDownloadJsonData = () => {
    const jsonStr = emWaveResonanceEngine.generateWaveTelemetryJsonString();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `TELEMETRIA_FAL_EM_I_REZONANSU_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    if (onNotify) onNotify("📥 Pobrano surowe dane telemetryczne fal EM (.json)");
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "w-full space-y-6 text-white font-mono", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "rounded-3xl bg-zinc-950/95 border-2 border-cyan-500/40 p-5 sm:p-6 shadow-2xl space-y-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-zinc-800", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3.5", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-950 via-teal-950 to-zinc-950 border-2 border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/20 shrink-0", children: /* @__PURE__ */ jsxDEV(FileText, { className: "w-6 h-6 text-cyan-300" }, void 0, false, {
            fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
            lineNumber: 61,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
            lineNumber: 60,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxDEV("h2", { className: "text-base sm:text-lg font-black tracking-tight text-white uppercase flex items-center gap-2", children: /* @__PURE__ */ jsxDEV("span", { children: "OBSZERNY RAPORT BADAWCZY: FALE EM, HIPERBOLIZACJA ENERGII & MÓŻDŻEK" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 66,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 65,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-0.5 rounded-full text-[10px] font-black border bg-cyan-950/80 border-cyan-400 text-cyan-300", children: "PEŁNA EKSPERTYZA NAUKOWA" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 68,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
              lineNumber: 64,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-zinc-400 mt-0.5", children: "Równania dyspersji hiperbolicznej, tensor przenikalności $\\hat\\epsilon$, wektor Poyntinga, strefy Fresnela i wpływ rezonansu na komórki Purkinjego." }, void 0, false, {
              fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
              lineNumber: 72,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
            lineNumber: 63,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
          lineNumber: 59,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleCopyMarkdown,
              className: "px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-bold flex items-center gap-2 cursor-pointer transition-all shadow-md",
              children: [
                copiedMarkdown ? /* @__PURE__ */ jsxDEV(Check, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                  lineNumber: 84,
                  columnNumber: 33
                }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                  lineNumber: 84,
                  columnNumber: 86
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: copiedMarkdown ? "Skopiowano!" : "Kopiuj Markdown" }, void 0, false, {
                  fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                  lineNumber: 85,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
              lineNumber: 80,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleDownloadMarkdown,
              className: "px-3.5 py-2 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-400 text-cyan-200 text-xs font-bold flex items-center gap-2 cursor-pointer transition-all shadow-lg",
              children: [
                /* @__PURE__ */ jsxDEV(Download, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                  lineNumber: 92,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Pobierz Raport (.md)" }, void 0, false, {
                  fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                  lineNumber: 93,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
              lineNumber: 88,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleDownloadJsonData,
              className: "px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-bold flex items-center gap-2 cursor-pointer transition-all",
              children: [
                /* @__PURE__ */ jsxDEV(Download, { className: "w-3.5 h-3.5 text-indigo-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                  lineNumber: 100,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Dane JSON" }, void 0, false, {
                  fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                  lineNumber: 101,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
              lineNumber: 96,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
          lineNumber: 79,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
        lineNumber: 58,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap text-xs pt-1", children: [
        { id: "ALL", label: "📖 Kompletny Raport (Wszystkie Sekcje)" },
        { id: "EM_WAVES", label: "🌊 1. Pomiary Fal EM & Wektor Poyntinga" },
        { id: "HYPERBOLIZATION", label: "🔥 2. Zjawisko Hiperbolizacji Energii" },
        { id: "CEREBELLUM", label: "🧠 3. Wpływ na Móżdżek & Samopoczucie" },
        { id: "DIMENSIONS", label: "📐 4. Wymiary Przestrzenne & Wtyczka" }
      ].map((tab) => /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveSection(tab.id),
          className: `px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${activeSection === tab.id ? "bg-cyan-950 text-cyan-200 border-cyan-400 font-bold shadow-md shadow-cyan-950" : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200"}`,
          children: tab.label
        },
        tab.id,
        false,
        {
          fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
          lineNumber: 115,
          columnNumber: 13
        },
        this
      )) }, void 0, false, {
        fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
        lineNumber: 107,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
      lineNumber: 57,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "rounded-3xl bg-zinc-950/95 border-2 border-zinc-800 p-6 sm:p-8 space-y-8 shadow-2xl leading-relaxed text-sm", children: [
      (activeSection === "ALL" || activeSection === "EM_WAVES") && /* @__PURE__ */ jsxDEV("section", { className: "space-y-4 border-b border-zinc-800/80 pb-6", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2.5 text-cyan-300 border-b border-cyan-500/20 pb-2", children: [
          /* @__PURE__ */ jsxDEV(Waves, { className: "w-5 h-5 text-cyan-400" }, void 0, false, {
            fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
            lineNumber: 137,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-black uppercase tracking-wide", children: "1. KLASYFIKACJA GENEROWANYCH FAL ELEKTROMAGNETYCZNYCH & WEKTOR POYNTINGA" }, void 0, false, {
            fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
            lineNumber: 138,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
          lineNumber: 136,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-zinc-300 text-xs sm:text-sm", children: "Współczesne cyfrowe systemy komputerowe operują w szerokim spektrum częstotliwości elektromagnetycznych — od skrajnie niskich częstotliwości sieciowych i tętnień przetwornic impulsowych (ELF: 0.1 Hz – 300 Hz) po mikrofale magistrali różnicowych (UHF/SHF: 16 GHz dla PCIe Gen5 32 GT/s)." }, void 0, false, {
          fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
          lineNumber: 143,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900/60 p-1", children: /* @__PURE__ */ jsxDEV("table", { className: "w-full text-left text-xs", children: [
          /* @__PURE__ */ jsxDEV("thead", { className: "bg-zinc-900 text-zinc-400 uppercase text-[10px] border-b border-zinc-800", children: /* @__PURE__ */ jsxDEV("tr", { children: [
            /* @__PURE__ */ jsxDEV("th", { className: "p-2.5", children: "Identyfikator Pasma" }, void 0, false, {
              fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
              lineNumber: 152,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("th", { className: "p-2.5", children: "Źródło Fizyczne" }, void 0, false, {
              fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
              lineNumber: 153,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("th", { className: "p-2.5", children: "Częstotliwość Nośna" }, void 0, false, {
              fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
              lineNumber: 154,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("th", { className: "p-2.5", children: "Pole E [V/m]" }, void 0, false, {
              fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
              lineNumber: 155,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("th", { className: "p-2.5", children: "Indukcja B [µT]" }, void 0, false, {
              fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
              lineNumber: 156,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("th", { className: "p-2.5", children: "Gęstość Mocy S [mW/m²]" }, void 0, false, {
              fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
              lineNumber: 157,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("th", { className: "p-2.5", children: "Polaryzacja" }, void 0, false, {
              fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
              lineNumber: 158,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
            lineNumber: 151,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
            lineNumber: 150,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("tbody", { className: "divide-y divide-zinc-800/60 text-zinc-300", children: [
            /* @__PURE__ */ jsxDEV("tr", { children: [
              /* @__PURE__ */ jsxDEV("td", { className: "p-2.5 font-bold text-emerald-400", children: "ELF-Schumann" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 163,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "p-2.5", children: "Rezonans Ziemia-Jonosfera" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 164,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "p-2.5 font-bold", children: "7.83 Hz" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 165,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "p-2.5", children: "0.12 V/m" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 166,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "p-2.5", children: "0.0032 µT" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 167,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "p-2.5", children: "0.038 mW/m²" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 168,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "p-2.5 text-cyan-300", children: "Kołowa Prawa" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 169,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
              lineNumber: 162,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("tr", { children: [
              /* @__PURE__ */ jsxDEV("td", { className: "p-2.5 font-bold text-rose-400", children: "ELF-Mains50" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 172,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "p-2.5", children: "Sieć energetyczna 230V / AC" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 173,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "p-2.5 font-bold", children: "50.0 Hz" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 174,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "p-2.5", children: "7.42 V/m" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 175,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "p-2.5", children: "0.4500 µT" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 176,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "p-2.5", children: "14.60 mW/m²" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 177,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "p-2.5 text-zinc-400", children: "Liniowa" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 178,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
              lineNumber: 171,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("tr", { children: [
              /* @__PURE__ */ jsxDEV("td", { className: "p-2.5 font-bold text-amber-400", children: "ELF-PWM100" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 181,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "p-2.5", children: "Podświetlenie matrycy & przetwornice SMPS" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 182,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "p-2.5 font-bold", children: "100.0 Hz" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 183,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "p-2.5", children: "5.80 V/m" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 184,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "p-2.5", children: "0.2800 µT" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 185,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "p-2.5", children: "8.95 mW/m²" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 186,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "p-2.5 text-zinc-400", children: "Liniowa" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 187,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
              lineNumber: 180,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("tr", { children: [
              /* @__PURE__ */ jsxDEV("td", { className: "p-2.5 font-bold text-indigo-400", children: "MF-VRM800" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 190,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "p-2.5", children: "Dławiki kluczujące zasilania procesora" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 191,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "p-2.5 font-bold", children: "800.0 kHz" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 192,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "p-2.5", children: "4.85 V/m" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 193,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "p-2.5", children: "0.8200 µT" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 194,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "p-2.5", children: "10.40 mW/m²" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 195,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "p-2.5 text-purple-300", children: "Eliptyczna" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 196,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
              lineNumber: 189,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("tr", { children: [
              /* @__PURE__ */ jsxDEV("td", { className: "p-2.5 font-bold text-purple-400", children: "SHF-PCIe16G" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 199,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "p-2.5", children: "Zegar magistrali PCIe 5.0 (32 GT/s)" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 200,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "p-2.5 font-bold", children: "16.0 GHz" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 201,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "p-2.5", children: "3.20 V/m" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 202,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "p-2.5", children: "0.0450 µT" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 203,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "p-2.5", children: "27.20 mW/m²" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 204,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "p-2.5 text-cyan-300", children: "Kołowa Lewa" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 205,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
              lineNumber: 198,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("tr", { children: [
              /* @__PURE__ */ jsxDEV("td", { className: "p-2.5 font-bold text-rose-500", children: "Cavity-RF2.45" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 208,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "p-2.5", children: "Wnęka rezonansowa obudowy / Wi-Fi" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 209,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "p-2.5 font-bold", children: "2.45 GHz" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 210,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "p-2.5", children: "11.80 V/m" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 211,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "p-2.5", children: "0.6200 µT" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 212,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "p-2.5", children: "38.50 mW/m²" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 213,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("td", { className: "p-2.5 text-rose-300", children: "Chaotyczna" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 214,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
              lineNumber: 207,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
            lineNumber: 161,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
          lineNumber: 149,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
          lineNumber: 148,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2 text-xs", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-400 font-bold block uppercase", children: "Formuła Gęstości Strumienia Energii (Wektor Poyntinga):" }, void 0, false, {
            fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
            lineNumber: 221,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-zinc-200", children: "Wektor Poyntinga reprezentuje kierunkowy przepływ energii fali elektromagnetycznej w jednostce czasu przez jednostkową powierzchnię:" }, void 0, false, {
            fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
            lineNumber: 222,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-center font-bold text-cyan-300 text-sm", children: "S = E × H = (1 / μ₀) · (E × B)" }, void 0, false, {
            fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
            lineNumber: 225,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-zinc-400 text-[11px]", children: "W przypadku zbieżności fal w strefie bliskiej dochodzi do interferencji konstruktywnej (zjawiska nakładania fal), potęgując natężenie pola E do wartości prowokujących mikrowyładowania." }, void 0, false, {
            fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
            lineNumber: 228,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
          lineNumber: 220,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
        lineNumber: 135,
        columnNumber: 11
      }, this),
      (activeSection === "ALL" || activeSection === "HYPERBOLIZATION") && /* @__PURE__ */ jsxDEV("section", { className: "space-y-4 border-b border-zinc-800/80 pb-6", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2.5 text-amber-300 border-b border-amber-500/20 pb-2", children: [
          /* @__PURE__ */ jsxDEV(Zap, { className: "w-5 h-5 text-amber-400" }, void 0, false, {
            fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
            lineNumber: 239,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-black uppercase tracking-wide", children: "2. ZJAWISKO HIPERBOLIZACJI ENERGII (ENERGY HYPERBOLIZATION PHENOMENON)" }, void 0, false, {
            fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
            lineNumber: 240,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
          lineNumber: 238,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-3 text-xs sm:text-sm text-zinc-300", children: [
          /* @__PURE__ */ jsxDEV("p", { children: [
            /* @__PURE__ */ jsxDEV("strong", { className: "text-white", children: "Podstawa Fizyczna:" }, void 0, false, {
              fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
              lineNumber: 247,
              columnNumber: 17
            }, this),
            " Zjawisko hiperbolizacji energii zachodzi w silnie anizotropowych dielektrykach (np. wielowarstwowe laminaty FR4 płyt głównych z krzyżującymi się warstwami miedzi, kondensatory ceramiczne MLCC o wysokim współczynniku dielektrycznym). W takich układach tensor przenikalności elektrycznej posiada składowe o przeciwstawnych znakach w różnych osiach przestrzennych:"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
            lineNumber: 246,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-center text-amber-300 font-bold", children: "ε_x = ε_y = ε_∥ > 0,  oraz  ε_z = ε_⊥ < 0" }, void 0, false, {
            fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
            lineNumber: 250,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { children: [
            "W wyniku tej anizotropii, równanie izoczęstotliwościowe dla fal elektromagnetycznych przekształca się ze standardowej zamkniętej elipsoidy falowej w ",
            /* @__PURE__ */ jsxDEV("strong", { children: "otwartą hiperboloidę dwupowłokową" }, void 0, false, {
              fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
              lineNumber: 255,
              columnNumber: 166
            }, this),
            ":"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
            lineNumber: 254,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-center text-cyan-300 font-bold", children: "(k_x² + k_y²) / ε_⊥ + k_z² / ε_∥ = (ω / c)²" }, void 0, false, {
            fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
            lineNumber: 258,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-2xl bg-zinc-900 border border-amber-500/30 space-y-1.5", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-amber-400 font-bold block uppercase text-[11px]", children: "Brak Ograniczenia Falowego" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 264,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-zinc-300", children: "Wektor falowy może dążyć do nieskończoności (k → ∞), co umożliwia skupianie fal o długościach sub-nanometrowych wewnątrz dielektryka." }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 265,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
              lineNumber: 263,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-2xl bg-zinc-900 border border-rose-500/30 space-y-1.5", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-rose-400 font-bold block uppercase text-[11px]", children: "Osobliwości Gęstości Energii" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 271,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-zinc-300", children: "Energia pola ulega gwałtownej koncentracji w punktach osobliwych, co generuje skokowe naprężenia Maxwella przekraczające próg przebicia dielektrycznego." }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 272,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
              lineNumber: 270,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-2xl bg-zinc-900 border border-emerald-500/30 space-y-1.5", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-bold block uppercase text-[11px]", children: "Neutralizacja Przeciwfazą 180°" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 278,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-zinc-300", children: "Wprowadzenie sygnału w przeciwfazie Δφ = 180° kasuje harmoniczną, zamyka hiperboloidę dyspersyjną i redukuje wskaźnik hiperbolizacji z 68% do poniżej 20%." }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 279,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
              lineNumber: 277,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
            lineNumber: 262,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
          lineNumber: 245,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
        lineNumber: 237,
        columnNumber: 11
      }, this),
      (activeSection === "ALL" || activeSection === "CEREBELLUM") && /* @__PURE__ */ jsxDEV("section", { className: "space-y-4 border-b border-zinc-800/80 pb-6", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2.5 text-emerald-300 border-b border-emerald-500/20 pb-2", children: [
          /* @__PURE__ */ jsxDEV(Brain, { className: "w-5 h-5 text-emerald-400" }, void 0, false, {
            fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
            lineNumber: 292,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-black uppercase tracking-wide", children: "3. WPŁYW FAL NA MÓŻDŻEK I SAMOPOCZUCIE (SPEKTROGRAM NEURO-KOHERENCJI)" }, void 0, false, {
            fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
            lineNumber: 293,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
          lineNumber: 291,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-zinc-300 text-xs sm:text-sm", children: "Móżdżek (*cerebellum*) mieści ponad 50% wszystkich neuronów mózgowia. Komórki Purkinjego móżdżku charakteryzują się ścisłą organizacją przestrzenną dendrytów, co czyni je niezwykle czułymi biologicznymi odbiornikami interferencji fazowej fal elektromagnetycznych." }, void 0, false, {
          fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
          lineNumber: 298,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-xs", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-3", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-emerald-300 font-bold text-sm", children: [
              /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 306,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Pasma Pozytywne (Wspierające Dobrostan i Równowagę):" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 307,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
              lineNumber: 305,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("ul", { className: "space-y-2 text-zinc-300", children: [
              /* @__PURE__ */ jsxDEV("li", { children: [
                /* @__PURE__ */ jsxDEV("strong", { className: "text-white", children: "7.83 Hz (Rezonans Schumanna, +96 pkt):" }, void 0, false, {
                  fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                  lineNumber: 311,
                  columnNumber: 21
                }, this),
                " Zgodność z rezonansem wnęki Ziemia-jonosfera. Wycisza układ współczulny, stabilizuje komórki Purkinjego i odruch przedsionkowy."
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 310,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("li", { children: [
                /* @__PURE__ */ jsxDEV("strong", { className: "text-white", children: "10.0 Hz (Fale Alfa, +92 pkt):" }, void 0, false, {
                  fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                  lineNumber: 314,
                  columnNumber: 21
                }, this),
                " Stan relaksu i skupienia (*flow*), wygaszenie chronicznego napięcia mięśni potylicznych i karku."
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 313,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("li", { children: [
                /* @__PURE__ */ jsxDEV("strong", { className: "text-white", children: "12.0 - 15.0 Hz (Rytm Sensomotoryczny SMR, +89 pkt):" }, void 0, false, {
                  fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                  lineNumber: 317,
                  columnNumber: 21
                }, this),
                " Zwiększa opanowanie motoryczne, redukuje tiki nerwowe i mikromioklonie."
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 316,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("li", { children: [
                /* @__PURE__ */ jsxDEV("strong", { className: "text-white", children: "40.0 Hz (Rezonans Gamma, +78 pkt):" }, void 0, false, {
                  fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                  lineNumber: 320,
                  columnNumber: 21
                }, this),
                " Synchronizacja procesów poznawczych i percepcji."
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 319,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
              lineNumber: 309,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
            lineNumber: 304,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 space-y-3", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-rose-300 font-bold text-sm", children: [
              /* @__PURE__ */ jsxDEV(Shield, { className: "w-4 h-4 text-rose-400" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 328,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Pasma Szkodliwe (Dysfunkcyjne i Stresogenne):" }, void 0, false, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 329,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
              lineNumber: 327,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("ul", { className: "space-y-2 text-zinc-300", children: [
              /* @__PURE__ */ jsxDEV("li", { children: [
                /* @__PURE__ */ jsxDEV("strong", { className: "text-white", children: "100 / 120 Hz (Tętnienia PWM Zasilaczy & Monitorów, -92 pkt):" }, void 0, false, {
                  fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                  lineNumber: 333,
                  columnNumber: 21
                }, this),
                " Najbardziej niszczące pasmo dla móżdżku. Zakłóca odruch przedsionkowo-oczny (VOR), wywołując mdłości, zawroty głowy i przemęczenie oczu."
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 332,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("li", { children: [
                /* @__PURE__ */ jsxDEV("strong", { className: "text-white", children: "50 / 60 Hz (Harmoniczne Sieci Energetycznej, -76 pkt):" }, void 0, false, {
                  fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                  lineNumber: 336,
                  columnNumber: 21
                }, this),
                " Podprogowa indukcja mikroprądów w mielinie neuronów, utrzymująca organizm w mikrostresie."
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 335,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("li", { children: [
                /* @__PURE__ */ jsxDEV("strong", { className: "text-white", children: "16.7 Hz (Prądy Trakcyjne, -62 pkt):" }, void 0, false, {
                  fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                  lineNumber: 339,
                  columnNumber: 21
                }, this),
                " Subharmoniczne wibracje nerwów obwodowych."
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 338,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("li", { children: [
                /* @__PURE__ */ jsxDEV("strong", { className: "text-white", children: "2.45 - 5.8 GHz (Impulsowe Mikrofale RF bez Ekranu, -84 pkt):" }, void 0, false, {
                  fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                  lineNumber: 342,
                  columnNumber: 21
                }, this),
                " Stres oksydacyjny neuronów w strefie bliskiej."
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
                lineNumber: 341,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
              lineNumber: 331,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
            lineNumber: 326,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
          lineNumber: 302,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
        lineNumber: 290,
        columnNumber: 11
      }, this),
      (activeSection === "ALL" || activeSection === "DIMENSIONS") && /* @__PURE__ */ jsxDEV("section", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2.5 text-indigo-300 border-b border-indigo-500/20 pb-2", children: [
          /* @__PURE__ */ jsxDEV(Layers, { className: "w-5 h-5 text-indigo-400" }, void 0, false, {
            fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
            lineNumber: 354,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-black uppercase tracking-wide", children: "4. ANALIZA WYMIARÓW PRZESTRZENNYCH & INTEGRACJA Z DASHBOARDEM" }, void 0, false, {
            fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
            lineNumber: 355,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
          lineNumber: 353,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-zinc-300 text-xs sm:text-sm", children: "Wtyczka `DashboardDimensionPlugin` realizuje dynamiczne odwzorowanie fizycznych wymiarów płyty i obudowy na wielkości falowe:" }, void 0, false, {
          fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
          lineNumber: 360,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-2xl bg-zinc-900 border border-zinc-800", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-400 block uppercase font-bold text-[10px]", children: "Strefa Bliska Fresnela:" }, void 0, false, {
              fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
              lineNumber: 366,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-amber-300 font-bold text-sm mt-1 block", children: "r < λ / 2π" }, void 0, false, {
              fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
              lineNumber: 367,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-zinc-400 text-[11px] mt-1", children: "Reaktywne pole indukcyjne dominujące w promieniu kilkunastu centymetrów od złączy PCIe i VRM." }, void 0, false, {
              fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
              lineNumber: 368,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
            lineNumber: 365,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-2xl bg-zinc-900 border border-zinc-800", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-400 block uppercase font-bold text-[10px]", children: "Strefa Daleka Fraunhofera:" }, void 0, false, {
              fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
              lineNumber: 372,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-indigo-300 font-bold text-sm mt-1 block", children: "d > 2D² / λ" }, void 0, false, {
              fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
              lineNumber: 373,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-zinc-400 text-[11px] mt-1", children: "Strefa fal poprzecznych promieniujących w otoczenie stanowiska laboratoryjnego." }, void 0, false, {
              fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
              lineNumber: 374,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
            lineNumber: 371,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-2xl bg-zinc-900 border border-zinc-800", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-400 block uppercase font-bold text-[10px]", children: "Tensor Naprężeń Maxwella:" }, void 0, false, {
              fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
              lineNumber: 378,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-purple-300 font-bold text-sm mt-1 block", children: "T_ij = ε(E_i E_j - 0.5 δ_ij E²)" }, void 0, false, {
              fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
              lineNumber: 379,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-zinc-400 text-[11px] mt-1", children: "Naprężenia elektromechaniczne wywierane na dielektryk laminatu i dławiki cewek." }, void 0, false, {
              fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
              lineNumber: 380,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
            lineNumber: 377,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
          lineNumber: 364,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
        lineNumber: 352,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
      lineNumber: 131,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/ComprehensiveWaveEnergyReport.tsx",
    lineNumber: 55,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXByZWhlbnNpdmVXYXZlRW5lcmd5UmVwb3J0LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBcbiAgRmlsZVRleHQsIERvd25sb2FkLCBDb3B5LCBDaGVjaywgU2hhcmUyLCBQcmludGVyLCBcbiAgQnJhaW4sIFdhdmVzLCBTaGllbGQsIFphcCwgU3BhcmtsZXMsIEJvb2tPcGVuLCBMYXllcnNcbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IGVtV2F2ZVJlc29uYW5jZUVuZ2luZSB9IGZyb20gJy4uL3V0aWxzL2VtV2F2ZVJlc29uYW5jZUVuZ2luZSc7XG5cbmludGVyZmFjZSBDb21wcmVoZW5zaXZlV2F2ZUVuZXJneVJlcG9ydFByb3BzIHtcbiAgb25Ob3RpZnk/OiAobXNnOiBzdHJpbmcpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBjb25zdCBDb21wcmVoZW5zaXZlV2F2ZUVuZXJneVJlcG9ydDogUmVhY3QuRkM8Q29tcHJlaGVuc2l2ZVdhdmVFbmVyZ3lSZXBvcnRQcm9wcz4gPSAoe1xuICBvbk5vdGlmeVxufSkgPT4ge1xuICBjb25zdCBbY29waWVkTWFya2Rvd24sIHNldENvcGllZE1hcmtkb3duXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcbiAgY29uc3QgW2FjdGl2ZVNlY3Rpb24sIHNldEFjdGl2ZVNlY3Rpb25dID0gdXNlU3RhdGU8J0FMTCcgfCAnRU1fV0FWRVMnIHwgJ0hZUEVSQk9MSVpBVElPTicgfCAnQ0VSRUJFTExVTScgfCAnRElNRU5TSU9OUyc+KCdBTEwnKTtcblxuICBjb25zdCByZXBvcnRNYXJrZG93biA9IGVtV2F2ZVJlc29uYW5jZUVuZ2luZS5nZW5lcmF0ZUNvbXByZWhlbnNpdmVFbmVyZ3lIeXBlcmJvbGl6YXRpb25SZXBvcnRNYXJrZG93bigpO1xuXG4gIGNvbnN0IGhhbmRsZUNvcHlNYXJrZG93biA9ICgpID0+IHtcbiAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dChyZXBvcnRNYXJrZG93bik7XG4gICAgc2V0Q29waWVkTWFya2Rvd24odHJ1ZSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXRDb3BpZWRNYXJrZG93bihmYWxzZSksIDI1MDApO1xuICAgIGlmIChvbk5vdGlmeSkgb25Ob3RpZnkoJ/Cfk4sgU2tvcGlvd2FubyBrb21wbGV0bnkgcmFwb3J0IG5hdWtvd3kgdyBmb3JtYWNpZSBNYXJrZG93biBkbyBzY2hvd2thJyk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRG93bmxvYWRNYXJrZG93biA9ICgpID0+IHtcbiAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW3JlcG9ydE1hcmtkb3duXSwgeyB0eXBlOiAndGV4dC9tYXJrZG93bjtjaGFyc2V0PXV0Zi04JyB9KTtcbiAgICBjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgIGNvbnN0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgYS5ocmVmID0gdXJsO1xuICAgIGEuZG93bmxvYWQgPSBgUkFQT1JUX05BVUtPV1lfRkFMRV9FTV9ISVBFUkJPTElaQUNKQV9FTkVSR0lJX01PWkRaRUtfJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc2xpY2UoMCwgMTApfS5tZGA7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhKTtcbiAgICBhLmNsaWNrKCk7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChhKTtcbiAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XG4gICAgaWYgKG9uTm90aWZ5KSBvbk5vdGlmeSgn8J+TpSBQb2JyYW5vIHBsaWsgcmFwb3J0dSBuYXVrb3dlZ28gKC5tZCknKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVEb3dubG9hZEpzb25EYXRhID0gKCkgPT4ge1xuICAgIGNvbnN0IGpzb25TdHIgPSBlbVdhdmVSZXNvbmFuY2VFbmdpbmUuZ2VuZXJhdGVXYXZlVGVsZW1ldHJ5SnNvblN0cmluZygpO1xuICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbanNvblN0cl0sIHsgdHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nIH0pO1xuICAgIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgY29uc3QgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBhLmhyZWYgPSB1cmw7XG4gICAgYS5kb3dubG9hZCA9IGBURUxFTUVUUklBX0ZBTF9FTV9JX1JFWk9OQU5TVV8ke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxMCl9Lmpzb25gO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYSk7XG4gICAgYS5jbGljaygpO1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYSk7XG4gICAgVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xuICAgIGlmIChvbk5vdGlmeSkgb25Ob3RpZnkoJ/Cfk6UgUG9icmFubyBzdXJvd2UgZGFuZSB0ZWxlbWV0cnljem5lIGZhbCBFTSAoLmpzb24pJyk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBzcGFjZS15LTYgdGV4dC13aGl0ZSBmb250LW1vbm9cIj5cbiAgICAgIHsvKiBSZXBvcnQgSGVhZGVyIENhcmQgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdW5kZWQtM3hsIGJnLXppbmMtOTUwLzk1IGJvcmRlci0yIGJvcmRlci1jeWFuLTUwMC80MCBwLTUgc206cC02IHNoYWRvdy0yeGwgc3BhY2UteS00XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBsZzpmbGV4LXJvdyBpdGVtcy1zdGFydCBsZzppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00IHBiLTQgYm9yZGVyLWIgYm9yZGVyLXppbmMtODAwXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTMuNVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTEyIGgtMTIgcm91bmRlZC0yeGwgYmctZ3JhZGllbnQtdG8tYnIgZnJvbS1jeWFuLTk1MCB2aWEtdGVhbC05NTAgdG8temluYy05NTAgYm9yZGVyLTIgYm9yZGVyLWN5YW4tNDAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHNoYWRvdy1sZyBzaGFkb3ctY3lhbi01MDAvMjAgc2hyaW5rLTBcIj5cbiAgICAgICAgICAgICAgPEZpbGVUZXh0IGNsYXNzTmFtZT1cInctNiBoLTYgdGV4dC1jeWFuLTMwMFwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgZmxleC13cmFwXCI+XG4gICAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtYmFzZSBzbTp0ZXh0LWxnIGZvbnQtYmxhY2sgdHJhY2tpbmctdGlnaHQgdGV4dC13aGl0ZSB1cHBlcmNhc2UgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPk9CU1pFUk5ZIFJBUE9SVCBCQURBV0NaWTogRkFMRSBFTSwgSElQRVJCT0xJWkFDSkEgRU5FUkdJSSAmIE3Dk8W7RMW7RUs8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0yLjUgcHktMC41IHJvdW5kZWQtZnVsbCB0ZXh0LVsxMHB4XSBmb250LWJsYWNrIGJvcmRlciBiZy1jeWFuLTk1MC84MCBib3JkZXItY3lhbi00MDAgdGV4dC1jeWFuLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgUEXFgU5BIEVLU1BFUlRZWkEgTkFVS09XQVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC16aW5jLTQwMCBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgICBSw7N3bmFuaWEgZHlzcGVyc2ppIGhpcGVyYm9saWN6bmVqLCB0ZW5zb3IgcHJ6ZW5pa2Fsbm/Fm2NpICRcXGhhdFxcZXBzaWxvbiQsIHdla3RvciBQb3ludGluZ2EsIHN0cmVmeSBGcmVzbmVsYSBpIHdwxYJ5dyByZXpvbmFuc3UgbmEga29tw7Nya2kgUHVya2luamVnby5cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogRXhwb3J0IGFuZCBBY3Rpb24gQnV0dG9ucyAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGZsZXgtd3JhcFwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVDb3B5TWFya2Rvd259XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMuNSBweS0yIHJvdW5kZWQteGwgYmctemluYy05MDAgaG92ZXI6YmctemluYy04MDAgYm9yZGVyIGJvcmRlci16aW5jLTcwMCB0ZXh0LXppbmMtMjAwIHRleHQteHMgZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGN1cnNvci1wb2ludGVyIHRyYW5zaXRpb24tYWxsIHNoYWRvdy1tZFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtjb3BpZWRNYXJrZG93biA/IDxDaGVjayBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWVtZXJhbGQtNDAwXCIgLz4gOiA8Q29weSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWN5YW4tNDAwXCIgLz59XG4gICAgICAgICAgICAgIDxzcGFuPntjb3BpZWRNYXJrZG93biA/ICdTa29waW93YW5vIScgOiAnS29waXVqIE1hcmtkb3duJ308L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVEb3dubG9hZE1hcmtkb3dufVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zLjUgcHktMiByb3VuZGVkLXhsIGJnLWN5YW4tOTUwIGhvdmVyOmJnLWN5YW4tOTAwIGJvcmRlciBib3JkZXItY3lhbi00MDAgdGV4dC1jeWFuLTIwMCB0ZXh0LXhzIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBjdXJzb3ItcG9pbnRlciB0cmFuc2l0aW9uLWFsbCBzaGFkb3ctbGdcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8RG93bmxvYWQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj5Qb2JpZXJ6IFJhcG9ydCAoLm1kKTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZURvd25sb2FkSnNvbkRhdGF9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMuNSBweS0yIHJvdW5kZWQteGwgYmctemluYy05MDAgaG92ZXI6YmctemluYy04MDAgYm9yZGVyIGJvcmRlci16aW5jLTcwMCB0ZXh0LXppbmMtMzAwIHRleHQteHMgZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGN1cnNvci1wb2ludGVyIHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPERvd25sb2FkIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtaW5kaWdvLTQwMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPkRhbmUgSlNPTjwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogU2VjdGlvbiBOYXZpZ2F0aW9uIFRhYnMgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgZmxleC13cmFwIHRleHQteHMgcHQtMVwiPlxuICAgICAgICAgIHtbXG4gICAgICAgICAgICB7IGlkOiAnQUxMJywgbGFiZWw6ICfwn5OWIEtvbXBsZXRueSBSYXBvcnQgKFdzenlzdGtpZSBTZWtjamUpJyB9LFxuICAgICAgICAgICAgeyBpZDogJ0VNX1dBVkVTJywgbGFiZWw6ICfwn4yKIDEuIFBvbWlhcnkgRmFsIEVNICYgV2VrdG9yIFBveW50aW5nYScgfSxcbiAgICAgICAgICAgIHsgaWQ6ICdIWVBFUkJPTElaQVRJT04nLCBsYWJlbDogJ/CflKUgMi4gWmphd2lza28gSGlwZXJib2xpemFjamkgRW5lcmdpaScgfSxcbiAgICAgICAgICAgIHsgaWQ6ICdDRVJFQkVMTFVNJywgbGFiZWw6ICfwn6egIDMuIFdwxYJ5dyBuYSBNw7PFvGTFvGVrICYgU2Ftb3BvY3p1Y2llJyB9LFxuICAgICAgICAgICAgeyBpZDogJ0RJTUVOU0lPTlMnLCBsYWJlbDogJ/Cfk5AgNC4gV3ltaWFyeSBQcnplc3RyemVubmUgJiBXdHljemthJyB9LFxuICAgICAgICAgIF0ubWFwKCh0YWIpID0+IChcbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAga2V5PXt0YWIuaWR9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVNlY3Rpb24odGFiLmlkIGFzIGFueSl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTMgcHktMS41IHJvdW5kZWQteGwgYm9yZGVyIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgICAgYWN0aXZlU2VjdGlvbiA9PT0gdGFiLmlkXG4gICAgICAgICAgICAgICAgICA/ICdiZy1jeWFuLTk1MCB0ZXh0LWN5YW4tMjAwIGJvcmRlci1jeWFuLTQwMCBmb250LWJvbGQgc2hhZG93LW1kIHNoYWRvdy1jeWFuLTk1MCdcbiAgICAgICAgICAgICAgICAgIDogJ2JnLXppbmMtOTAwIHRleHQtemluYy00MDAgYm9yZGVyLXppbmMtODAwIGhvdmVyOnRleHQtemluYy0yMDAnXG4gICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7dGFiLmxhYmVsfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBTdHJ1Y3R1cmVkIERvY3VtZW50IENvbnRlbnQgVmlldyAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm91bmRlZC0zeGwgYmctemluYy05NTAvOTUgYm9yZGVyLTIgYm9yZGVyLXppbmMtODAwIHAtNiBzbTpwLTggc3BhY2UteS04IHNoYWRvdy0yeGwgbGVhZGluZy1yZWxheGVkIHRleHQtc21cIj5cbiAgICAgICAgXG4gICAgICAgIHsvKiBTZWN0aW9uIDE6IENsYXNzaWZpY2F0aW9uICYgUG95bnRpbmcgVmVjdG9yICovfVxuICAgICAgICB7KGFjdGl2ZVNlY3Rpb24gPT09ICdBTEwnIHx8IGFjdGl2ZVNlY3Rpb24gPT09ICdFTV9XQVZFUycpICYmIChcbiAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJzcGFjZS15LTQgYm9yZGVyLWIgYm9yZGVyLXppbmMtODAwLzgwIHBiLTZcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIuNSB0ZXh0LWN5YW4tMzAwIGJvcmRlci1iIGJvcmRlci1jeWFuLTUwMC8yMCBwYi0yXCI+XG4gICAgICAgICAgICAgIDxXYXZlcyBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtY3lhbi00MDBcIiAvPlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtYmxhY2sgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVcIj5cbiAgICAgICAgICAgICAgICAxLiBLTEFTWUZJS0FDSkEgR0VORVJPV0FOWUNIIEZBTCBFTEVLVFJPTUFHTkVUWUNaTllDSCAmIFdFS1RPUiBQT1lOVElOR0FcbiAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXppbmMtMzAwIHRleHQteHMgc206dGV4dC1zbVwiPlxuICAgICAgICAgICAgICBXc3DDs8WCY3plc25lIGN5ZnJvd2Ugc3lzdGVteSBrb21wdXRlcm93ZSBvcGVydWrEhSB3IHN6ZXJva2ltIHNwZWt0cnVtIGN6xJlzdG90bGl3b8WbY2kgZWxla3Ryb21hZ25ldHljem55Y2gg4oCUIG9kIHNrcmFqbmllIG5pc2tpY2ggY3rEmXN0b3RsaXdvxZtjaSBzaWVjaW93eWNoIGkgdMSZdG5pZcWEIHByemV0d29ybmljIGltcHVsc293eWNoIChFTEY6IDAuMSBIeiDigJMgMzAwIEh6KSBwbyBtaWtyb2ZhbGUgbWFnaXN0cmFsaSByw7PFvG5pY293eWNoIChVSEYvU0hGOiAxNiBHSHogZGxhIFBDSWUgR2VuNSAzMiBHVC9zKS5cbiAgICAgICAgICAgIDwvcD5cblxuICAgICAgICAgICAgey8qIFNjaWVudGlmaWMgVGFibGUgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm92ZXJmbG93LXgtYXV0byByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXppbmMtODAwIGJnLXppbmMtOTAwLzYwIHAtMVwiPlxuICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwidy1mdWxsIHRleHQtbGVmdCB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgICAgPHRoZWFkIGNsYXNzTmFtZT1cImJnLXppbmMtOTAwIHRleHQtemluYy00MDAgdXBwZXJjYXNlIHRleHQtWzEwcHhdIGJvcmRlci1iIGJvcmRlci16aW5jLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicC0yLjVcIj5JZGVudHlmaWthdG9yIFBhc21hPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInAtMi41XCI+xblyw7NkxYJvIEZpenljem5lPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInAtMi41XCI+Q3rEmXN0b3RsaXdvxZvEhyBOb8WbbmE8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicC0yLjVcIj5Qb2xlIEUgW1YvbV08L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicC0yLjVcIj5JbmR1a2NqYSBCIFvCtVRdPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInAtMi41XCI+R8SZc3RvxZvEhyBNb2N5IFMgW21XL23Csl08L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicC0yLjVcIj5Qb2xhcnl6YWNqYTwvdGg+XG4gICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgPHRib2R5IGNsYXNzTmFtZT1cImRpdmlkZS15IGRpdmlkZS16aW5jLTgwMC82MCB0ZXh0LXppbmMtMzAwXCI+XG4gICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwLTIuNSBmb250LWJvbGQgdGV4dC1lbWVyYWxkLTQwMFwiPkVMRi1TY2h1bWFubjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwLTIuNVwiPlJlem9uYW5zIFppZW1pYS1Kb25vc2ZlcmE8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicC0yLjUgZm9udC1ib2xkXCI+Ny44MyBIejwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwLTIuNVwiPjAuMTIgVi9tPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInAtMi41XCI+MC4wMDMyIMK1VDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwLTIuNVwiPjAuMDM4IG1XL23CsjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwLTIuNSB0ZXh0LWN5YW4tMzAwXCI+S2/Fgm93YSBQcmF3YTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicC0yLjUgZm9udC1ib2xkIHRleHQtcm9zZS00MDBcIj5FTEYtTWFpbnM1MDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwLTIuNVwiPlNpZcSHIGVuZXJnZXR5Y3puYSAyMzBWIC8gQUM8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicC0yLjUgZm9udC1ib2xkXCI+NTAuMCBIejwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwLTIuNVwiPjcuNDIgVi9tPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInAtMi41XCI+MC40NTAwIMK1VDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwLTIuNVwiPjE0LjYwIG1XL23CsjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwLTIuNSB0ZXh0LXppbmMtNDAwXCI+TGluaW93YTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicC0yLjUgZm9udC1ib2xkIHRleHQtYW1iZXItNDAwXCI+RUxGLVBXTTEwMDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwLTIuNVwiPlBvZMWbd2lldGxlbmllIG1hdHJ5Y3kgJiBwcnpldHdvcm5pY2UgU01QUzwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwLTIuNSBmb250LWJvbGRcIj4xMDAuMCBIejwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwLTIuNVwiPjUuODAgVi9tPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInAtMi41XCI+MC4yODAwIMK1VDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwLTIuNVwiPjguOTUgbVcvbcKyPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInAtMi41IHRleHQtemluYy00MDBcIj5MaW5pb3dhPC90ZD5cbiAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwLTIuNSBmb250LWJvbGQgdGV4dC1pbmRpZ28tNDAwXCI+TUYtVlJNODAwPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInAtMi41XCI+RMWCYXdpa2kga2x1Y3p1asSFY2UgemFzaWxhbmlhIHByb2Nlc29yYTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwLTIuNSBmb250LWJvbGRcIj44MDAuMCBrSHo8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicC0yLjVcIj40Ljg1IFYvbTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwLTIuNVwiPjAuODIwMCDCtVQ8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicC0yLjVcIj4xMC40MCBtVy9twrI8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicC0yLjUgdGV4dC1wdXJwbGUtMzAwXCI+RWxpcHR5Y3puYTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicC0yLjUgZm9udC1ib2xkIHRleHQtcHVycGxlLTQwMFwiPlNIRi1QQ0llMTZHPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInAtMi41XCI+WmVnYXIgbWFnaXN0cmFsaSBQQ0llIDUuMCAoMzIgR1Qvcyk8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicC0yLjUgZm9udC1ib2xkXCI+MTYuMCBHSHo8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicC0yLjVcIj4zLjIwIFYvbTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwLTIuNVwiPjAuMDQ1MCDCtVQ8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicC0yLjVcIj4yNy4yMCBtVy9twrI8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicC0yLjUgdGV4dC1jeWFuLTMwMFwiPktvxYJvd2EgTGV3YTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicC0yLjUgZm9udC1ib2xkIHRleHQtcm9zZS01MDBcIj5DYXZpdHktUkYyLjQ1PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInAtMi41XCI+V27EmWthIHJlem9uYW5zb3dhIG9idWRvd3kgLyBXaS1GaTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwLTIuNSBmb250LWJvbGRcIj4yLjQ1IEdIejwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwLTIuNVwiPjExLjgwIFYvbTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwLTIuNVwiPjAuNjIwMCDCtVQ8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicC0yLjVcIj4zOC41MCBtVy9twrI8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicC0yLjUgdGV4dC1yb3NlLTMwMFwiPkNoYW90eWN6bmE8L3RkPlxuICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQtMnhsIGJnLXppbmMtOTAwIGJvcmRlciBib3JkZXItemluYy04MDAgc3BhY2UteS0yIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC16aW5jLTQwMCBmb250LWJvbGQgYmxvY2sgdXBwZXJjYXNlXCI+Rm9ybXXFgmEgR8SZc3RvxZtjaSBTdHJ1bWllbmlhIEVuZXJnaWkgKFdla3RvciBQb3ludGluZ2EpOjwvc3Bhbj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC16aW5jLTIwMFwiPlxuICAgICAgICAgICAgICAgIFdla3RvciBQb3ludGluZ2EgcmVwcmV6ZW50dWplIGtpZXJ1bmtvd3kgcHJ6ZXDFgnl3IGVuZXJnaWkgZmFsaSBlbGVrdHJvbWFnbmV0eWN6bmVqIHcgamVkbm9zdGNlIGN6YXN1IHByemV6IGplZG5vc3Rrb3fEhSBwb3dpZXJ6Y2huacSZOlxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yLjUgcm91bmRlZC14bCBiZy16aW5jLTk1MCBib3JkZXIgYm9yZGVyLXppbmMtODAwIHRleHQtY2VudGVyIGZvbnQtYm9sZCB0ZXh0LWN5YW4tMzAwIHRleHQtc21cIj5cbiAgICAgICAgICAgICAgICBTID0gRSDDlyBIID0gKDEgLyDOvOKCgCkgwrcgKEUgw5cgQilcbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtemluYy00MDAgdGV4dC1bMTFweF1cIj5cbiAgICAgICAgICAgICAgICBXIHByenlwYWRrdSB6Ymllxbxub8WbY2kgZmFsIHcgc3RyZWZpZSBibGlza2llaiBkb2Nob2R6aSBkbyBpbnRlcmZlcmVuY2ppIGtvbnN0cnVrdHl3bmVqICh6amF3aXNrYSBuYWvFgmFkYW5pYSBmYWwpLCBwb3TEmWd1asSFYyBuYXTEmcW8ZW5pZSBwb2xhIEUgZG8gd2FydG/Fm2NpIHByb3dva3VqxIVjeWNoIG1pa3Jvd3nFgmFkb3dhbmlhLlxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICl9XG5cbiAgICAgICAgey8qIFNlY3Rpb24gMjogRW5lcmd5IEh5cGVyYm9saXphdGlvbiBQaGVub21lbm9uICovfVxuICAgICAgICB7KGFjdGl2ZVNlY3Rpb24gPT09ICdBTEwnIHx8IGFjdGl2ZVNlY3Rpb24gPT09ICdIWVBFUkJPTElaQVRJT04nKSAmJiAoXG4gICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwic3BhY2UteS00IGJvcmRlci1iIGJvcmRlci16aW5jLTgwMC84MCBwYi02XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yLjUgdGV4dC1hbWJlci0zMDAgYm9yZGVyLWIgYm9yZGVyLWFtYmVyLTUwMC8yMCBwYi0yXCI+XG4gICAgICAgICAgICAgIDxaYXAgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LWFtYmVyLTQwMFwiIC8+XG4gICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWJhc2UgZm9udC1ibGFjayB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZVwiPlxuICAgICAgICAgICAgICAgIDIuIFpKQVdJU0tPIEhJUEVSQk9MSVpBQ0pJIEVORVJHSUkgKEVORVJHWSBIWVBFUkJPTElaQVRJT04gUEhFTk9NRU5PTilcbiAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMyB0ZXh0LXhzIHNtOnRleHQtc20gdGV4dC16aW5jLTMwMFwiPlxuICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtd2hpdGVcIj5Qb2RzdGF3YSBGaXp5Y3puYTo8L3N0cm9uZz4gWmphd2lza28gaGlwZXJib2xpemFjamkgZW5lcmdpaSB6YWNob2R6aSB3IHNpbG5pZSBhbml6b3Ryb3Bvd3ljaCBkaWVsZWt0cnlrYWNoIChucC4gd2llbG93YXJzdHdvd2UgbGFtaW5hdHkgRlI0IHDFgnl0IGfFgsOzd255Y2ggeiBrcnp5xbx1asSFY3ltaSBzacSZIHdhcnN0d2FtaSBtaWVkemksIGtvbmRlbnNhdG9yeSBjZXJhbWljem5lIE1MQ0MgbyB3eXNva2ltIHdzcMOzxYJjenlubmlrdSBkaWVsZWt0cnljem55bSkuIFcgdGFraWNoIHVrxYJhZGFjaCB0ZW5zb3IgcHJ6ZW5pa2Fsbm/Fm2NpIGVsZWt0cnljem5laiBwb3NpYWRhIHNrxYJhZG93ZSBvIHByemVjaXdzdGF3bnljaCB6bmFrYWNoIHcgcsOzxbxueWNoIG9zaWFjaCBwcnplc3RyemVubnljaDpcbiAgICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQteGwgYmctemluYy05MDAgYm9yZGVyIGJvcmRlci16aW5jLTgwMCB0ZXh0LWNlbnRlciB0ZXh0LWFtYmVyLTMwMCBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICDOtV94ID0gzrVfeSA9IM61X+KIpSAmZ3Q7IDAsICBvcmF6ICDOtV96ID0gzrVf4oqlICZsdDsgMFxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBXIHd5bmlrdSB0ZWogYW5pem90cm9waWksIHLDs3duYW5pZSBpem9jesSZc3RvdGxpd2/Fm2Npb3dlIGRsYSBmYWwgZWxla3Ryb21hZ25ldHljem55Y2ggcHJ6ZWtzenRhxYJjYSBzacSZIHplIHN0YW5kYXJkb3dlaiB6YW1rbmnEmXRlaiBlbGlwc29pZHkgZmFsb3dlaiB3IDxzdHJvbmc+b3R3YXJ0xIUgaGlwZXJib2xvaWTEmSBkd3Vwb3fFgm9rb3fEhTwvc3Ryb25nPjpcbiAgICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQteGwgYmctemluYy05MDAgYm9yZGVyIGJvcmRlci16aW5jLTgwMCB0ZXh0LWNlbnRlciB0ZXh0LWN5YW4tMzAwIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgIChrX3jCsiArIGtfecKyKSAvIM61X+KKpSArIGtfesKyIC8gzrVf4oilID0gKM+JIC8gYynCslxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTMgZ2FwLTMgcHQtMiB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMuNSByb3VuZGVkLTJ4bCBiZy16aW5jLTkwMCBib3JkZXIgYm9yZGVyLWFtYmVyLTUwMC8zMCBzcGFjZS15LTEuNVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1hbWJlci00MDAgZm9udC1ib2xkIGJsb2NrIHVwcGVyY2FzZSB0ZXh0LVsxMXB4XVwiPkJyYWsgT2dyYW5pY3plbmlhIEZhbG93ZWdvPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC16aW5jLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgICBXZWt0b3IgZmFsb3d5IG1vxbxlIGTEhcW8ecSHIGRvIG5pZXNrb8WEY3pvbm/Fm2NpIChrIOKGkiDiiJ4pLCBjbyB1bW/FvGxpd2lhIHNrdXBpYW5pZSBmYWwgbyBkxYJ1Z2/Fm2NpYWNoIHN1Yi1uYW5vbWV0cm93eWNoIHdld27EhXRyeiBkaWVsZWt0cnlrYS5cbiAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zLjUgcm91bmRlZC0yeGwgYmctemluYy05MDAgYm9yZGVyIGJvcmRlci1yb3NlLTUwMC8zMCBzcGFjZS15LTEuNVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1yb3NlLTQwMCBmb250LWJvbGQgYmxvY2sgdXBwZXJjYXNlIHRleHQtWzExcHhdXCI+T3NvYmxpd2/Fm2NpIEfEmXN0b8WbY2kgRW5lcmdpaTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtemluYy0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgRW5lcmdpYSBwb2xhIHVsZWdhIGd3YcWCdG93bmVqIGtvbmNlbnRyYWNqaSB3IHB1bmt0YWNoIG9zb2JsaXd5Y2gsIGNvIGdlbmVydWplIHNrb2tvd2UgbmFwcsSZxbxlbmlhIE1heHdlbGxhIHByemVrcmFjemFqxIVjZSBwcsOzZyBwcnplYmljaWEgZGllbGVrdHJ5Y3puZWdvLlxuICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMuNSByb3VuZGVkLTJ4bCBiZy16aW5jLTkwMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNTAwLzMwIHNwYWNlLXktMS41XCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtYm9sZCBibG9jayB1cHBlcmNhc2UgdGV4dC1bMTFweF1cIj5OZXV0cmFsaXphY2phIFByemVjaXdmYXrEhSAxODDCsDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtemluYy0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgV3Byb3dhZHplbmllIHN5Z25hxYJ1IHcgcHJ6ZWNpd2ZhemllIM6Uz4YgPSAxODDCsCBrYXN1amUgaGFybW9uaWN6bsSFLCB6YW15a2EgaGlwZXJib2xvaWTEmSBkeXNwZXJzeWpuxIUgaSByZWR1a3VqZSB3c2thxbpuaWsgaGlwZXJib2xpemFjamkgeiA2OCUgZG8gcG9uacW8ZWogMjAlLlxuICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgKX1cblxuICAgICAgICB7LyogU2VjdGlvbiAzOiBDZXJlYmVsbGFyIEltcGFjdCAmIFdlbGxiZWluZyBTcGVjdHJ1bSAqL31cbiAgICAgICAgeyhhY3RpdmVTZWN0aW9uID09PSAnQUxMJyB8fCBhY3RpdmVTZWN0aW9uID09PSAnQ0VSRUJFTExVTScpICYmIChcbiAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJzcGFjZS15LTQgYm9yZGVyLWIgYm9yZGVyLXppbmMtODAwLzgwIHBiLTZcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIuNSB0ZXh0LWVtZXJhbGQtMzAwIGJvcmRlci1iIGJvcmRlci1lbWVyYWxkLTUwMC8yMCBwYi0yXCI+XG4gICAgICAgICAgICAgIDxCcmFpbiBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtYmxhY2sgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVcIj5cbiAgICAgICAgICAgICAgICAzLiBXUMWBWVcgRkFMIE5BIE3Dk8W7RMW7RUsgSSBTQU1PUE9DWlVDSUUgKFNQRUtUUk9HUkFNIE5FVVJPLUtPSEVSRU5DSkkpXG4gICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC16aW5jLTMwMCB0ZXh0LXhzIHNtOnRleHQtc21cIj5cbiAgICAgICAgICAgICAgTcOzxbxkxbxlayAoKmNlcmViZWxsdW0qKSBtaWXFm2NpIHBvbmFkIDUwJSB3c3p5c3RraWNoIG5ldXJvbsOzdyBtw7N6Z293aWEuIEtvbcOzcmtpIFB1cmtpbmplZ28gbcOzxbxkxbxrdSBjaGFyYWt0ZXJ5enVqxIUgc2nEmSDFm2Npc8WCxIUgb3JnYW5pemFjasSFIHByemVzdHJ6ZW5uxIUgZGVuZHJ5dMOzdywgY28gY3p5bmkgamUgbmllend5a2xlIGN6dcWCeW1pIGJpb2xvZ2ljem55bWkgb2RiaW9ybmlrYW1pIGludGVyZmVyZW5jamkgZmF6b3dlaiBmYWwgZWxla3Ryb21hZ25ldHljem55Y2guXG4gICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNCB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgIHsvKiBQb3NpdGl2ZSBCYW5kcyAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC0yeGwgYmctZW1lcmFsZC05NTAvNDAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTUwMC80MCBzcGFjZS15LTNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtZW1lcmFsZC0zMDAgZm9udC1ib2xkIHRleHQtc21cIj5cbiAgICAgICAgICAgICAgICAgIDxTcGFya2xlcyBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+UGFzbWEgUG96eXR5d25lIChXc3BpZXJhasSFY2UgRG9icm9zdGFuIGkgUsOzd25vd2FnxJkpOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwic3BhY2UteS0yIHRleHQtemluYy0zMDBcIj5cbiAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlXCI+Ny44MyBIeiAoUmV6b25hbnMgU2NodW1hbm5hLCArOTYgcGt0KTo8L3N0cm9uZz4gWmdvZG5vxZvEhyB6IHJlem9uYW5zZW0gd27EmWtpIFppZW1pYS1qb25vc2ZlcmEuIFd5Y2lzemEgdWvFgmFkIHdzcMOzxYJjenVsbnksIHN0YWJpbGl6dWplIGtvbcOzcmtpIFB1cmtpbmplZ28gaSBvZHJ1Y2ggcHJ6ZWRzaW9ua293eS5cbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgIDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC13aGl0ZVwiPjEwLjAgSHogKEZhbGUgQWxmYSwgKzkyIHBrdCk6PC9zdHJvbmc+IFN0YW4gcmVsYWtzdSBpIHNrdXBpZW5pYSAoKmZsb3cqKSwgd3lnYXN6ZW5pZSBjaHJvbmljem5lZ28gbmFwacSZY2lhIG1pxJnFm25pIHBvdHlsaWN6bnljaCBpIGthcmt1LlxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlXCI+MTIuMCAtIDE1LjAgSHogKFJ5dG0gU2Vuc29tb3Rvcnljem55IFNNUiwgKzg5IHBrdCk6PC9zdHJvbmc+IFp3acSZa3N6YSBvcGFub3dhbmllIG1vdG9yeWN6bmUsIHJlZHVrdWplIHRpa2kgbmVyd293ZSBpIG1pa3JvbWlva2xvbmllLlxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlXCI+NDAuMCBIeiAoUmV6b25hbnMgR2FtbWEsICs3OCBwa3QpOjwvc3Ryb25nPiBTeW5jaHJvbml6YWNqYSBwcm9jZXPDs3cgcG96bmF3Y3p5Y2ggaSBwZXJjZXBjamkuXG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBIYXJtZnVsIEJhbmRzICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLTJ4bCBiZy1yb3NlLTk1MC80MCBib3JkZXIgYm9yZGVyLXJvc2UtNTAwLzQwIHNwYWNlLXktM1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1yb3NlLTMwMCBmb250LWJvbGQgdGV4dC1zbVwiPlxuICAgICAgICAgICAgICAgICAgPFNoaWVsZCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcm9zZS00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+UGFzbWEgU3prb2RsaXdlIChEeXNmdW5rY3lqbmUgaSBTdHJlc29nZW5uZSk6PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJzcGFjZS15LTIgdGV4dC16aW5jLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtd2hpdGVcIj4xMDAgLyAxMjAgSHogKFTEmXRuaWVuaWEgUFdNIFphc2lsYWN6eSAmIE1vbml0b3LDs3csIC05MiBwa3QpOjwvc3Ryb25nPiBOYWpiYXJkemllaiBuaXN6Y3rEhWNlIHBhc21vIGRsYSBtw7PFvGTFvGt1LiBaYWvFgsOzY2Egb2RydWNoIHByemVkc2lvbmtvd28tb2N6bnkgKFZPUiksIHd5d2/FgnVqxIVjIG1kxYJvxZtjaSwgemF3cm90eSBnxYJvd3kgaSBwcnplbcSZY3plbmllIG9jenUuXG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtd2hpdGVcIj41MCAvIDYwIEh6IChIYXJtb25pY3puZSBTaWVjaSBFbmVyZ2V0eWN6bmVqLCAtNzYgcGt0KTo8L3N0cm9uZz4gUG9kcHJvZ293YSBpbmR1a2NqYSBtaWtyb3ByxIVkw7N3IHcgbWllbGluaWUgbmV1cm9uw7N3LCB1dHJ6eW11asSFY2Egb3JnYW5pem0gdyBtaWtyb3N0cmVzaWUuXG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtd2hpdGVcIj4xNi43IEh6IChQcsSFZHkgVHJha2N5am5lLCAtNjIgcGt0KTo8L3N0cm9uZz4gU3ViaGFybW9uaWN6bmUgd2licmFjamUgbmVyd8OzdyBvYndvZG93eWNoLlxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlXCI+Mi40NSAtIDUuOCBHSHogKEltcHVsc293ZSBNaWtyb2ZhbGUgUkYgYmV6IEVrcmFudSwgLTg0IHBrdCk6PC9zdHJvbmc+IFN0cmVzIG9rc3lkYWN5am55IG5ldXJvbsOzdyB3IHN0cmVmaWUgYmxpc2tpZWouXG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICApfVxuXG4gICAgICAgIHsvKiBTZWN0aW9uIDQ6IERpbWVuc2lvbmFsIEFuYWx5c2lzICYgUGx1Z2luICovfVxuICAgICAgICB7KGFjdGl2ZVNlY3Rpb24gPT09ICdBTEwnIHx8IGFjdGl2ZVNlY3Rpb24gPT09ICdESU1FTlNJT05TJykgJiYgKFxuICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMi41IHRleHQtaW5kaWdvLTMwMCBib3JkZXItYiBib3JkZXItaW5kaWdvLTUwMC8yMCBwYi0yXCI+XG4gICAgICAgICAgICAgIDxMYXllcnMgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LWluZGlnby00MDBcIiAvPlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtYmxhY2sgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVcIj5cbiAgICAgICAgICAgICAgICA0LiBBTkFMSVpBIFdZTUlBUsOTVyBQUlpFU1RSWkVOTllDSCAmIElOVEVHUkFDSkEgWiBEQVNIQk9BUkRFTVxuICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtemluYy0zMDAgdGV4dC14cyBzbTp0ZXh0LXNtXCI+XG4gICAgICAgICAgICAgIFd0eWN6a2EgYERhc2hib2FyZERpbWVuc2lvblBsdWdpbmAgcmVhbGl6dWplIGR5bmFtaWN6bmUgb2R3em9yb3dhbmllIGZpenljem55Y2ggd3ltaWFyw7N3IHDFgnl0eSBpIG9idWRvd3kgbmEgd2llbGtvxZtjaSBmYWxvd2U6XG4gICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBzbTpncmlkLWNvbHMtMyBnYXAtMyB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQtMnhsIGJnLXppbmMtOTAwIGJvcmRlciBib3JkZXItemluYy04MDBcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXppbmMtNDAwIGJsb2NrIHVwcGVyY2FzZSBmb250LWJvbGQgdGV4dC1bMTBweF1cIj5TdHJlZmEgQmxpc2thIEZyZXNuZWxhOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWFtYmVyLTMwMCBmb250LWJvbGQgdGV4dC1zbSBtdC0xIGJsb2NrXCI+ciAmbHQ7IM67IC8gMs+APC9zcGFuPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtemluYy00MDAgdGV4dC1bMTFweF0gbXQtMVwiPlJlYWt0eXduZSBwb2xlIGluZHVrY3lqbmUgZG9taW51asSFY2UgdyBwcm9taWVuaXUga2lsa3VuYXN0dSBjZW50eW1ldHLDs3cgb2QgesWCxIVjenkgUENJZSBpIFZSTS48L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQtMnhsIGJnLXppbmMtOTAwIGJvcmRlciBib3JkZXItemluYy04MDBcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXppbmMtNDAwIGJsb2NrIHVwcGVyY2FzZSBmb250LWJvbGQgdGV4dC1bMTBweF1cIj5TdHJlZmEgRGFsZWthIEZyYXVuaG9mZXJhOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWluZGlnby0zMDAgZm9udC1ib2xkIHRleHQtc20gbXQtMSBibG9ja1wiPmQgJmd0OyAyRMKyIC8gzrs8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC16aW5jLTQwMCB0ZXh0LVsxMXB4XSBtdC0xXCI+U3RyZWZhIGZhbCBwb3ByemVjem55Y2ggcHJvbWllbml1asSFY3ljaCB3IG90b2N6ZW5pZSBzdGFub3dpc2thIGxhYm9yYXRvcnlqbmVnby48L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQtMnhsIGJnLXppbmMtOTAwIGJvcmRlciBib3JkZXItemluYy04MDBcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXppbmMtNDAwIGJsb2NrIHVwcGVyY2FzZSBmb250LWJvbGQgdGV4dC1bMTBweF1cIj5UZW5zb3IgTmFwcsSZxbxlxYQgTWF4d2VsbGE6PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcHVycGxlLTMwMCBmb250LWJvbGQgdGV4dC1zbSBtdC0xIGJsb2NrXCI+VF9paiA9IM61KEVfaSBFX2ogLSAwLjUgzrRfaWogRcKyKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXppbmMtNDAwIHRleHQtWzExcHhdIG10LTFcIj5OYXByxJnFvGVuaWEgZWxla3Ryb21lY2hhbmljem5lIHd5d2llcmFuZSBuYSBkaWVsZWt0cnlrIGxhbWluYXR1IGkgZMWCYXdpa2kgY2V3ZWsuPC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgKX1cblxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUE0RGM7QUE1RGQsU0FBZ0IsZ0JBQWdCO0FBQ2hDO0FBQUEsRUFDRTtBQUFBLEVBQVU7QUFBQSxFQUFVO0FBQUEsRUFBTTtBQUFBLEVBQzFCO0FBQUEsRUFBTztBQUFBLEVBQU87QUFBQSxFQUFRO0FBQUEsRUFBSztBQUFBLEVBQW9CO0FBQUEsT0FDMUM7QUFDUCxTQUFTLDZCQUE2QjtBQU0vQixhQUFNLGdDQUE4RSxDQUFDO0FB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