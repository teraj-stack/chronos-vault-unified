import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"];
import { Sparkles, Send, Bot, User, Loader2, Code, Download } from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import { downloadFullOfflineBundle } from "/sentinel-shield/src/utils/offlinePackageExporter.ts";
const PRESET_PROMPTS = [
  "Jak trwale unieruchomić złośliwy program, który blokuje wyskakujące okna i restartuje się po taskkill?",
  "Jak działa zamrażanie wątków w pamięci RAM (NtSuspendProcess) w porównaniu do zwykłego zabijania procesu?",
  "Jak uruchomić pełny pakiet obronny w 100% offline bez połączenia z internetem i bez pip?",
  "Jak odebrać uprawnienia do pliku wykonywalnego przez icacls i dodać blokadę IFEO w rejestrze Windows?"
];
export const AIAssistant = ({ selectedOS }) => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Witaj! Jestem asystentem inżynierii bezpieczeństwa systemowego i Pythona. 
Mogę pomóc Ci w:
1. Trwałym unieruchamianiu procesów w pamięci RAM (NtSuspendProcess / proc.suspend()).
2. Kwarantannie binarnej (blokada uprawnień icacls / zmiana nazwy / wpisy IFEO w Rejestrze).
3. Napisaniu spersonalizowanego skryptu w Pythonie działającego w 100% OFFLINE bez dostępu do sieci.
4. Przeanalizowaniu kodu źródłowego w Dart/Flutter lub logów systemowych.

Wpisz swoje pytanie lub wklej kod poniżej!`,
      timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString()
    }
  ]);
  const [promptInput, setPromptInput] = useState("");
  const [flutterCodeInput, setFlutterCodeInput] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSendMessage = async (customPrompt) => {
    const textToSend = customPrompt || promptInput;
    if (!textToSend.trim() && !flutterCodeInput.trim()) return;
    const userMessage = {
      role: "user",
      content: flutterCodeInput.trim() ? `${textToSend}

[Wklejony kod / logi]:
\`\`\`dart
${flutterCodeInput}
\`\`\`` : textToSend,
      timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString()
    };
    setMessages((prev) => [...prev, userMessage]);
    setPromptInput("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/ai-assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: textToSend,
          flutterCode: flutterCodeInput,
          osTarget: selectedOS
        })
      });
      const data = await res.json();
      const replyText = data.text || data.error || "Otrzymano odpowiedź z asystenta.";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: replyText,
          timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString()
        }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Wskazówka offline: Złośliwe programy blokujące wyskakujące okna i pulpit możesz natychmiast zamrozić skryptem '2_quarantine_anti_respawn.py' lub awaryjnym plikiem '1_URUCHOM_RATUNEK_AWARYJNY.bat'. Wszystkie skrypty w aplikacji są w 100% gotowe do pobrania i pracy offline bez połączenia z internetem.`,
          timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/80 border border-purple-900/40 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 text-purple-400 text-xs uppercase font-bold tracking-wider mb-1", children: [
          /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-4 h-4" }, void 0, false, {
            fileName: "/app/applet/src/components/AIAssistant.tsx",
            lineNumber: 103,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "AI Script Engineer & Forensic Defense" }, void 0, false, {
            fileName: "/app/applet/src/components/AIAssistant.tsx",
            lineNumber: 104,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/AIAssistant.tsx",
          lineNumber: 102,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("h2", { className: "text-xl sm:text-2xl font-bold text-white", children: "Zapytaj Asystenta AI o Unieruchomienie i Kwarantannę Złośliwych Procesów" }, void 0, false, {
          fileName: "/app/applet/src/components/AIAssistant.tsx",
          lineNumber: 106,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-slate-300 mt-1 max-w-2xl", children: "Skonsultuj zachowania procesów, dowiedz się jak zablokować ich autostart (IFEO) i jak zamrozić wątki w pamięci RAM." }, void 0, false, {
          fileName: "/app/applet/src/components/AIAssistant.tsx",
          lineNumber: 109,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/AIAssistant.tsx",
        lineNumber: 101,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: downloadFullOfflineBundle,
          className: "flex items-center gap-1.5 px-3 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-lg text-xs font-semibold shadow-lg transition-all",
          children: [
            /* @__PURE__ */ jsxDEV(Download, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/AIAssistant.tsx",
              lineNumber: 118,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Pobierz Pakiet Offline" }, void 0, false, {
              fileName: "/app/applet/src/components/AIAssistant.tsx",
              lineNumber: 119,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/AIAssistant.tsx",
          lineNumber: 114,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/AIAssistant.tsx",
      lineNumber: 100,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap gap-2", children: PRESET_PROMPTS.map((preset, idx) => /* @__PURE__ */ jsxDEV(
      "button",
      {
        onClick: () => handleSendMessage(preset),
        className: "text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 transition-all text-left",
        children: [
          "💡 ",
          preset
        ]
      },
      idx,
      true,
      {
        fileName: "/app/applet/src/components/AIAssistant.tsx",
        lineNumber: 126,
        columnNumber: 11
      },
      this
    )) }, void 0, false, {
      fileName: "/app/applet/src/components/AIAssistant.tsx",
      lineNumber: 124,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-4 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800", children: [
      messages.map((msg, idx) => {
        const isAssistant = msg.role === "assistant";
        return /* @__PURE__ */ jsxDEV(
          "div",
          {
            className: `flex items-start space-x-3 ${isAssistant ? "justify-start" : "justify-end"}`,
            children: [
              isAssistant && /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white flex-shrink-0 shadow-md shadow-purple-600/30", children: /* @__PURE__ */ jsxDEV(Bot, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/AIAssistant.tsx",
                lineNumber: 147,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/AIAssistant.tsx",
                lineNumber: 146,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV(
                "div",
                {
                  className: `max-w-2xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${isAssistant ? "bg-slate-900/90 border border-slate-800 text-slate-200" : "bg-purple-600 text-white shadow-md shadow-purple-600/20"}`,
                  children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-1 mb-2 border-b border-slate-800/60 text-[10px] text-slate-400 font-mono", children: [
                      /* @__PURE__ */ jsxDEV("span", { children: isAssistant ? "Ekspert Bezpieczeństwa (Python & OS Internals)" : "Twoje zapytanie" }, void 0, false, {
                        fileName: "/app/applet/src/components/AIAssistant.tsx",
                        lineNumber: 159,
                        columnNumber: 19
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { children: msg.timestamp }, void 0, false, {
                        fileName: "/app/applet/src/components/AIAssistant.tsx",
                        lineNumber: 160,
                        columnNumber: 19
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AIAssistant.tsx",
                      lineNumber: 158,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "whitespace-pre-wrap", children: msg.content }, void 0, false, {
                      fileName: "/app/applet/src/components/AIAssistant.tsx",
                      lineNumber: 162,
                      columnNumber: 17
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/AIAssistant.tsx",
                  lineNumber: 151,
                  columnNumber: 15
                },
                this
              ),
              !isAssistant && /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 flex-shrink-0 border border-slate-700", children: /* @__PURE__ */ jsxDEV(User, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/AIAssistant.tsx",
                lineNumber: 167,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/AIAssistant.tsx",
                lineNumber: 166,
                columnNumber: 17
              }, this)
            ]
          },
          idx,
          true,
          {
            fileName: "/app/applet/src/components/AIAssistant.tsx",
            lineNumber: 141,
            columnNumber: 13
          },
          this
        );
      }),
      isLoading && /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 text-slate-400 text-xs py-2", children: [
        /* @__PURE__ */ jsxDEV(Loader2, { className: "w-4 h-4 animate-spin text-purple-400" }, void 0, false, {
          fileName: "/app/applet/src/components/AIAssistant.tsx",
          lineNumber: 176,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: "Generowanie analizy i kodu defensywnego..." }, void 0, false, {
          fileName: "/app/applet/src/components/AIAssistant.tsx",
          lineNumber: 177,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/AIAssistant.tsx",
        lineNumber: 175,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/AIAssistant.tsx",
      lineNumber: 137,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3", children: [
      showCodeInput && /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxDEV("label", { className: "text-xs font-semibold text-slate-300 flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxDEV(Code, { className: "w-3.5 h-3.5 text-purple-400" }, void 0, false, {
            fileName: "/app/applet/src/components/AIAssistant.tsx",
            lineNumber: 187,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Wklej kod źródłowy Dart/Flutter lub logi procesu:" }, void 0, false, {
            fileName: "/app/applet/src/components/AIAssistant.tsx",
            lineNumber: 188,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/AIAssistant.tsx",
          lineNumber: 186,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(
          "textarea",
          {
            value: flutterCodeInput,
            onChange: (e) => setFlutterCodeInput(e.target.value),
            placeholder: "np. void main() { windowManager.setAlwaysOnTop(true); ... }",
            rows: 4,
            className: "w-full bg-slate-950 text-slate-200 border border-slate-700 rounded-xl p-3 text-xs font-mono focus:outline-none focus:border-purple-500"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/AIAssistant.tsx",
            lineNumber: 190,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/AIAssistant.tsx",
        lineNumber: 185,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setShowCodeInput(!showCodeInput),
            className: `px-3 py-2 rounded-xl text-xs font-medium border transition-colors flex items-center gap-1.5 ${showCodeInput ? "bg-purple-950 text-purple-300 border-purple-800" : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"}`,
            title: "Dodaj fragment kodu Dart/Flutter do analizy",
            children: [
              /* @__PURE__ */ jsxDEV(Code, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/AIAssistant.tsx",
                lineNumber: 210,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: showCodeInput ? "Ukryj pole kodu" : "+ Dołącz kod / logi" }, void 0, false, {
                fileName: "/app/applet/src/components/AIAssistant.tsx",
                lineNumber: 211,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/AIAssistant.tsx",
            lineNumber: 201,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "input",
          {
            type: "text",
            value: promptInput,
            onChange: (e) => setPromptInput(e.target.value),
            onKeyDown: (e) => e.key === "Enter" && handleSendMessage(),
            placeholder: "Opisz problem ze złośliwym programem lub poproś o modyfikację skryptu...",
            className: "flex-1 bg-slate-950 text-slate-100 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-purple-500"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/AIAssistant.tsx",
            lineNumber: 214,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => handleSendMessage(),
            disabled: isLoading || !promptInput.trim() && !flutterCodeInput.trim(),
            className: "px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-lg shadow-purple-600/30 transition-all",
            children: [
              /* @__PURE__ */ jsxDEV(Send, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/AIAssistant.tsx",
                lineNumber: 228,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Wyślij" }, void 0, false, {
                fileName: "/app/applet/src/components/AIAssistant.tsx",
                lineNumber: 229,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/AIAssistant.tsx",
            lineNumber: 223,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/AIAssistant.tsx",
        lineNumber: 200,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/AIAssistant.tsx",
      lineNumber: 183,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/AIAssistant.tsx",
    lineNumber: 98,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFJQXNzaXN0YW50LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBTcGFya2xlcywgU2VuZCwgQm90LCBVc2VyLCBMb2FkZXIyLCBDb2RlLCBUZXJtaW5hbCwgSGVscENpcmNsZSwgU2hpZWxkQ2hlY2ssIERvd25sb2FkLCBMb2NrLCBTaGllbGRBbGVydCB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBPU1R5cGUgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBDb2RlQmxvY2sgfSBmcm9tICcuL0NvZGVCbG9jayc7XG5pbXBvcnQgeyBkb3dubG9hZEZ1bGxPZmZsaW5lQnVuZGxlIH0gZnJvbSAnLi4vdXRpbHMvb2ZmbGluZVBhY2thZ2VFeHBvcnRlcic7XG5cbmludGVyZmFjZSBBSUFzc2lzdGFudFByb3BzIHtcbiAgc2VsZWN0ZWRPUzogT1NUeXBlO1xufVxuXG5pbnRlcmZhY2UgTWVzc2FnZSB7XG4gIHJvbGU6ICd1c2VyJyB8ICdhc3Npc3RhbnQnO1xuICBjb250ZW50OiBzdHJpbmc7XG4gIHRpbWVzdGFtcDogc3RyaW5nO1xufVxuXG5jb25zdCBQUkVTRVRfUFJPTVBUUyA9IFtcbiAgJ0phayB0cndhbGUgdW5pZXJ1Y2hvbWnEhyB6xYJvxZtsaXd5IHByb2dyYW0sIGt0w7NyeSBibG9rdWplIHd5c2tha3VqxIVjZSBva25hIGkgcmVzdGFydHVqZSBzacSZIHBvIHRhc2traWxsPycsXG4gICdKYWsgZHppYcWCYSB6YW1yYcW8YW5pZSB3xIV0a8OzdyB3IHBhbWnEmWNpIFJBTSAoTnRTdXNwZW5kUHJvY2VzcykgdyBwb3LDs3duYW5pdSBkbyB6d3lrxYJlZ28gemFiaWphbmlhIHByb2Nlc3U/JyxcbiAgJ0phayB1cnVjaG9tacSHIHBlxYJueSBwYWtpZXQgb2Jyb25ueSB3IDEwMCUgb2ZmbGluZSBiZXogcG/FgsSFY3plbmlhIHogaW50ZXJuZXRlbSBpIGJleiBwaXA/JyxcbiAgJ0phayBvZGVicmHEhyB1cHJhd25pZW5pYSBkbyBwbGlrdSB3eWtvbnl3YWxuZWdvIHByemV6IGljYWNscyBpIGRvZGHEhyBibG9rYWTEmSBJRkVPIHcgcmVqZXN0cnplIFdpbmRvd3M/Jyxcbl07XG5cbmV4cG9ydCBjb25zdCBBSUFzc2lzdGFudDogUmVhY3QuRkM8QUlBc3Npc3RhbnRQcm9wcz4gPSAoeyBzZWxlY3RlZE9TIH0pID0+IHtcbiAgY29uc3QgW21lc3NhZ2VzLCBzZXRNZXNzYWdlc10gPSB1c2VTdGF0ZTxNZXNzYWdlW10+KFtcbiAgICB7XG4gICAgICByb2xlOiAnYXNzaXN0YW50JyxcbiAgICAgIGNvbnRlbnQ6IGBXaXRhaiEgSmVzdGVtIGFzeXN0ZW50ZW0gaW7FvHluaWVyaWkgYmV6cGllY3plxYRzdHdhIHN5c3RlbW93ZWdvIGkgUHl0aG9uYS4gXG5Nb2fEmSBwb23Ds2MgQ2kgdzpcbjEuIFRyd2HFgnltIHVuaWVydWNoYW1pYW5pdSBwcm9jZXPDs3cgdyBwYW1pxJljaSBSQU0gKE50U3VzcGVuZFByb2Nlc3MgLyBwcm9jLnN1c3BlbmQoKSkuXG4yLiBLd2FyYW50YW5uaWUgYmluYXJuZWogKGJsb2thZGEgdXByYXduaWXFhCBpY2FjbHMgLyB6bWlhbmEgbmF6d3kgLyB3cGlzeSBJRkVPIHcgUmVqZXN0cnplKS5cbjMuIE5hcGlzYW5pdSBzcGVyc29uYWxpem93YW5lZ28gc2tyeXB0dSB3IFB5dGhvbmllIGR6aWHFgmFqxIVjZWdvIHcgMTAwJSBPRkZMSU5FIGJleiBkb3N0xJlwdSBkbyBzaWVjaS5cbjQuIFByemVhbmFsaXpvd2FuaXUga29kdSDFunLDs2TFgm93ZWdvIHcgRGFydC9GbHV0dGVyIGx1YiBsb2fDs3cgc3lzdGVtb3d5Y2guXG5cbldwaXN6IHN3b2plIHB5dGFuaWUgbHViIHdrbGVqIGtvZCBwb25pxbxlaiFgLFxuICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpLFxuICAgIH0sXG4gIF0pO1xuXG4gIGNvbnN0IFtwcm9tcHRJbnB1dCwgc2V0UHJvbXB0SW5wdXRdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbZmx1dHRlckNvZGVJbnB1dCwgc2V0Rmx1dHRlckNvZGVJbnB1dF0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtzaG93Q29kZUlucHV0LCBzZXRTaG93Q29kZUlucHV0XSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBoYW5kbGVTZW5kTWVzc2FnZSA9IGFzeW5jIChjdXN0b21Qcm9tcHQ/OiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCB0ZXh0VG9TZW5kID0gY3VzdG9tUHJvbXB0IHx8IHByb21wdElucHV0O1xuICAgIGlmICghdGV4dFRvU2VuZC50cmltKCkgJiYgIWZsdXR0ZXJDb2RlSW5wdXQudHJpbSgpKSByZXR1cm47XG5cbiAgICBjb25zdCB1c2VyTWVzc2FnZTogTWVzc2FnZSA9IHtcbiAgICAgIHJvbGU6ICd1c2VyJyxcbiAgICAgIGNvbnRlbnQ6IGZsdXR0ZXJDb2RlSW5wdXQudHJpbSgpXG4gICAgICAgID8gYCR7dGV4dFRvU2VuZH1cXG5cXG5bV2tsZWpvbnkga29kIC8gbG9naV06XFxuXFxgXFxgXFxgZGFydFxcbiR7Zmx1dHRlckNvZGVJbnB1dH1cXG5cXGBcXGBcXGBgXG4gICAgICAgIDogdGV4dFRvU2VuZCxcbiAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoKSxcbiAgICB9O1xuXG4gICAgc2V0TWVzc2FnZXMoKHByZXYpID0+IFsuLi5wcmV2LCB1c2VyTWVzc2FnZV0pO1xuICAgIHNldFByb21wdElucHV0KCcnKTtcbiAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goJy9hcGkvYWktYXNzaXN0Jywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBwcm9tcHQ6IHRleHRUb1NlbmQsXG4gICAgICAgICAgZmx1dHRlckNvZGU6IGZsdXR0ZXJDb2RlSW5wdXQsXG4gICAgICAgICAgb3NUYXJnZXQ6IHNlbGVjdGVkT1MsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpO1xuICAgICAgY29uc3QgcmVwbHlUZXh0ID0gZGF0YS50ZXh0IHx8IGRhdGEuZXJyb3IgfHwgJ090cnp5bWFubyBvZHBvd2llZMW6IHogYXN5c3RlbnRhLic7XG5cbiAgICAgIHNldE1lc3NhZ2VzKChwcmV2KSA9PiBbXG4gICAgICAgIC4uLnByZXYsXG4gICAgICAgIHtcbiAgICAgICAgICByb2xlOiAnYXNzaXN0YW50JyxcbiAgICAgICAgICBjb250ZW50OiByZXBseVRleHQsXG4gICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpLFxuICAgICAgICB9LFxuICAgICAgXSk7XG4gICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICAgIHNldE1lc3NhZ2VzKChwcmV2KSA9PiBbXG4gICAgICAgIC4uLnByZXYsXG4gICAgICAgIHtcbiAgICAgICAgICByb2xlOiAnYXNzaXN0YW50JyxcbiAgICAgICAgICBjb250ZW50OiBgV3NrYXrDs3drYSBvZmZsaW5lOiBaxYJvxZtsaXdlIHByb2dyYW15IGJsb2t1asSFY2Ugd3lza2FrdWrEhWNlIG9rbmEgaSBwdWxwaXQgbW/FvGVzeiBuYXR5Y2htaWFzdCB6YW1yb3ppxIcgc2tyeXB0ZW0gJzJfcXVhcmFudGluZV9hbnRpX3Jlc3Bhd24ucHknIGx1YiBhd2FyeWpueW0gcGxpa2llbSAnMV9VUlVDSE9NX1JBVFVORUtfQVdBUllKTlkuYmF0Jy4gV3N6eXN0a2llIHNrcnlwdHkgdyBhcGxpa2Fjamkgc8SFIHcgMTAwJSBnb3Rvd2UgZG8gcG9icmFuaWEgaSBwcmFjeSBvZmZsaW5lIGJleiBwb8WCxIVjemVuaWEgeiBpbnRlcm5ldGVtLmAsXG4gICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpLFxuICAgICAgICB9LFxuICAgICAgXSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTZcIj5cbiAgICAgIHsvKiBIZWFkZXIgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYWRpZW50LXRvLXIgZnJvbS1wdXJwbGUtOTUwLzgwIHZpYS1zbGF0ZS05MDAgdG8taW5kaWdvLTk1MC84MCBib3JkZXIgYm9yZGVyLXB1cnBsZS05MDAvNDAgcm91bmRlZC0yeGwgcC02IHNoYWRvdy14bCBmbGV4IGZsZXgtY29sIG1kOmZsZXgtcm93IGl0ZW1zLXN0YXJ0IG1kOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTRcIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMiB0ZXh0LXB1cnBsZS00MDAgdGV4dC14cyB1cHBlcmNhc2UgZm9udC1ib2xkIHRyYWNraW5nLXdpZGVyIG1iLTFcIj5cbiAgICAgICAgICAgIDxTcGFya2xlcyBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgIDxzcGFuPkFJIFNjcmlwdCBFbmdpbmVlciAmIEZvcmVuc2ljIERlZmVuc2U8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQteGwgc206dGV4dC0yeGwgZm9udC1ib2xkIHRleHQtd2hpdGVcIj5cbiAgICAgICAgICAgIFphcHl0YWogQXN5c3RlbnRhIEFJIG8gVW5pZXJ1Y2hvbWllbmllIGkgS3dhcmFudGFubsSZIFrFgm/Fm2xpd3ljaCBQcm9jZXPDs3dcbiAgICAgICAgICA8L2gyPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1zbGF0ZS0zMDAgbXQtMSBtYXgtdy0yeGxcIj5cbiAgICAgICAgICAgIFNrb25zdWx0dWogemFjaG93YW5pYSBwcm9jZXPDs3csIGRvd2llZHogc2nEmSBqYWsgemFibG9rb3dhxIcgaWNoIGF1dG9zdGFydCAoSUZFTykgaSBqYWsgemFtcm96acSHIHfEhXRraSB3IHBhbWnEmWNpIFJBTS5cbiAgICAgICAgICA8L3A+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBvbkNsaWNrPXtkb3dubG9hZEZ1bGxPZmZsaW5lQnVuZGxlfVxuICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgcHgtMyBweS0yIGJnLXB1cnBsZS03MDAgaG92ZXI6YmctcHVycGxlLTYwMCB0ZXh0LXdoaXRlIHJvdW5kZWQtbGcgdGV4dC14cyBmb250LXNlbWlib2xkIHNoYWRvdy1sZyB0cmFuc2l0aW9uLWFsbFwiXG4gICAgICAgID5cbiAgICAgICAgICA8RG93bmxvYWQgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgPHNwYW4+UG9iaWVyeiBQYWtpZXQgT2ZmbGluZTwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIFF1aWNrIFByb21wdHMgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGdhcC0yXCI+XG4gICAgICAgIHtQUkVTRVRfUFJPTVBUUy5tYXAoKHByZXNldCwgaWR4KSA9PiAoXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAga2V5PXtpZHh9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVTZW5kTWVzc2FnZShwcmVzZXQpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC14cyBiZy1zbGF0ZS05MDAgaG92ZXI6Ymctc2xhdGUtODAwIHRleHQtc2xhdGUtMzAwIGhvdmVyOnRleHQtd2hpdGUgcHgtMyBweS0xLjUgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0cmFuc2l0aW9uLWFsbCB0ZXh0LWxlZnRcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIPCfkqEge3ByZXNldH1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgKSl9XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIENoYXQgTWVzc2FnZXMgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLTJ4bCBwLTQgc206cC02IHNoYWRvdy0yeGwgc3BhY2UteS00IG1heC1oLVs1MDBweF0gb3ZlcmZsb3cteS1hdXRvIHNjcm9sbGJhci10aGluIHNjcm9sbGJhci10aHVtYi1zbGF0ZS04MDBcIj5cbiAgICAgICAge21lc3NhZ2VzLm1hcCgobXNnLCBpZHgpID0+IHtcbiAgICAgICAgICBjb25zdCBpc0Fzc2lzdGFudCA9IG1zZy5yb2xlID09PSAnYXNzaXN0YW50JztcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBrZXk9e2lkeH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZmxleCBpdGVtcy1zdGFydCBzcGFjZS14LTMgJHtpc0Fzc2lzdGFudCA/ICdqdXN0aWZ5LXN0YXJ0JyA6ICdqdXN0aWZ5LWVuZCd9YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2lzQXNzaXN0YW50ICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctOCBoLTggcm91bmRlZC1sZyBiZy1ncmFkaWVudC10by1iciBmcm9tLXB1cnBsZS02MDAgdG8taW5kaWdvLTYwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LXdoaXRlIGZsZXgtc2hyaW5rLTAgc2hhZG93LW1kIHNoYWRvdy1wdXJwbGUtNjAwLzMwXCI+XG4gICAgICAgICAgICAgICAgICA8Qm90IGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BtYXgtdy0yeGwgcm91bmRlZC0yeGwgcC00IHRleHQteHMgc206dGV4dC1zbSBsZWFkaW5nLXJlbGF4ZWQgJHtcbiAgICAgICAgICAgICAgICAgIGlzQXNzaXN0YW50XG4gICAgICAgICAgICAgICAgICAgID8gJ2JnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTIwMCdcbiAgICAgICAgICAgICAgICAgICAgOiAnYmctcHVycGxlLTYwMCB0ZXh0LXdoaXRlIHNoYWRvdy1tZCBzaGFkb3ctcHVycGxlLTYwMC8yMCdcbiAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHBiLTEgbWItMiBib3JkZXItYiBib3JkZXItc2xhdGUtODAwLzYwIHRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+e2lzQXNzaXN0YW50ID8gJ0Vrc3BlcnQgQmV6cGllY3plxYRzdHdhIChQeXRob24gJiBPUyBJbnRlcm5hbHMpJyA6ICdUd29qZSB6YXB5dGFuaWUnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPnttc2cudGltZXN0YW1wfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndoaXRlc3BhY2UtcHJlLXdyYXBcIj57bXNnLmNvbnRlbnR9PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHshaXNBc3Npc3RhbnQgJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy04IGgtOCByb3VuZGVkLWxnIGJnLXNsYXRlLTgwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LXNsYXRlLTMwMCBmbGV4LXNocmluay0wIGJvcmRlciBib3JkZXItc2xhdGUtNzAwXCI+XG4gICAgICAgICAgICAgICAgICA8VXNlciBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICk7XG4gICAgICAgIH0pfVxuXG4gICAgICAgIHtpc0xvYWRpbmcgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yIHRleHQtc2xhdGUtNDAwIHRleHQteHMgcHktMlwiPlxuICAgICAgICAgICAgPExvYWRlcjIgY2xhc3NOYW1lPVwidy00IGgtNCBhbmltYXRlLXNwaW4gdGV4dC1wdXJwbGUtNDAwXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPkdlbmVyb3dhbmllIGFuYWxpenkgaSBrb2R1IGRlZmVuc3l3bmVnby4uLjwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogSW5wdXQgQXJlYSAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQtMnhsIHAtNCBzaGFkb3cteGwgc3BhY2UteS0zXCI+XG4gICAgICAgIHtzaG93Q29kZUlucHV0ICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMVwiPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTMwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgIDxDb2RlIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtcHVycGxlLTQwMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPldrbGVqIGtvZCDFunLDs2TFgm93eSBEYXJ0L0ZsdXR0ZXIgbHViIGxvZ2kgcHJvY2VzdTo8L3NwYW4+XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICAgIHZhbHVlPXtmbHV0dGVyQ29kZUlucHV0fVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEZsdXR0ZXJDb2RlSW5wdXQoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIm5wLiB2b2lkIG1haW4oKSB7IHdpbmRvd01hbmFnZXIuc2V0QWx3YXlzT25Ub3AodHJ1ZSk7IC4uLiB9XCJcbiAgICAgICAgICAgICAgcm93cz17NH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTk1MCB0ZXh0LXNsYXRlLTIwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCByb3VuZGVkLXhsIHAtMyB0ZXh0LXhzIGZvbnQtbW9ubyBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXB1cnBsZS01MDBcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2hvd0NvZGVJbnB1dCghc2hvd0NvZGVJbnB1dCl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BweC0zIHB5LTIgcm91bmRlZC14bCB0ZXh0LXhzIGZvbnQtbWVkaXVtIGJvcmRlciB0cmFuc2l0aW9uLWNvbG9ycyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41ICR7XG4gICAgICAgICAgICAgIHNob3dDb2RlSW5wdXRcbiAgICAgICAgICAgICAgICA/ICdiZy1wdXJwbGUtOTUwIHRleHQtcHVycGxlLTMwMCBib3JkZXItcHVycGxlLTgwMCdcbiAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS04MDAgdGV4dC1zbGF0ZS0zMDAgYm9yZGVyLXNsYXRlLTcwMCBob3ZlcjpiZy1zbGF0ZS03MDAgaG92ZXI6dGV4dC13aGl0ZSdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgdGl0bGU9XCJEb2RhaiBmcmFnbWVudCBrb2R1IERhcnQvRmx1dHRlciBkbyBhbmFsaXp5XCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8Q29kZSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICA8c3Bhbj57c2hvd0NvZGVJbnB1dCA/ICdVa3J5aiBwb2xlIGtvZHUnIDogJysgRG/FgsSFY3oga29kIC8gbG9naSd9PC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICB2YWx1ZT17cHJvbXB0SW5wdXR9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFByb21wdElucHV0KGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgIG9uS2V5RG93bj17KGUpID0+IGUua2V5ID09PSAnRW50ZXInICYmIGhhbmRsZVNlbmRNZXNzYWdlKCl9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIk9waXN6IHByb2JsZW0gemUgesWCb8WbbGl3eW0gcHJvZ3JhbWVtIGx1YiBwb3Byb8WbIG8gbW9keWZpa2FjasSZIHNrcnlwdHUuLi5cIlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC0xIGJnLXNsYXRlLTk1MCB0ZXh0LXNsYXRlLTEwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCByb3VuZGVkLXhsIHB4LTQgcHktMi41IHRleHQteHMgc206dGV4dC1zbSBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXB1cnBsZS01MDBcIlxuICAgICAgICAgIC8+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVTZW5kTWVzc2FnZSgpfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2lzTG9hZGluZyB8fCAoIXByb21wdElucHV0LnRyaW0oKSAmJiAhZmx1dHRlckNvZGVJbnB1dC50cmltKCkpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0yLjUgYmctZ3JhZGllbnQtdG8tciBmcm9tLXB1cnBsZS02MDAgdG8tcGluay02MDAgaG92ZXI6ZnJvbS1wdXJwbGUtNTAwIGhvdmVyOnRvLXBpbmstNTAwIGRpc2FibGVkOm9wYWNpdHktNTAgdGV4dC13aGl0ZSByb3VuZGVkLXhsIHRleHQteHMgc206dGV4dC1zbSBmb250LXNlbWlib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgc2hhZG93LWxnIHNoYWRvdy1wdXJwbGUtNjAwLzMwIHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8U2VuZCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5XecWbbGlqPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdLCJtYXBwaW5ncyI6IkFBc0dZO0FBdEdaLFNBQWdCLGdCQUFnQjtBQUNoQyxTQUFTLFVBQVUsTUFBTSxLQUFLLE1BQU0sU0FBUyxNQUF5QyxnQkFBbUM7QUFHekgsU0FBUyxpQ0FBaUM7QUFZMUMsTUFBTSxpQkFBaUI7QUFBQSxFQUNyQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGO0FBRU8sYUFBTSxj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