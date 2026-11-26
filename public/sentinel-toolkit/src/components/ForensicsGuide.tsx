import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-toolkit/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=019a4779"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-toolkit/node_modules/.vite/deps/react.js?v=019a4779"; const useState = __vite__cjsImport1_react["useState"];
import { BookOpen, AlertOctagon, Terminal, Layers, CheckCircle2, ChevronRight, Lock } from "/sentinel-toolkit/node_modules/.vite/deps/lucide-react.js?v=6cbc5a0a";
import { FORENSICS_TOPICS } from "/sentinel-toolkit/src/data/forensicsGuide.ts";
import { CodeBlock } from "/sentinel-toolkit/src/components/CodeBlock.tsx";
export const ForensicsGuide = () => {
  const [selectedTopicId, setSelectedTopicId] = useState(FORENSICS_TOPICS[0].id);
  const selectedTopic = FORENSICS_TOPICS.find((t) => t.id === selectedTopicId) || FORENSICS_TOPICS[0];
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 text-rose-400 text-xs uppercase font-bold tracking-wider mb-1", children: [
        /* @__PURE__ */ jsxDEV(BookOpen, { className: "w-4 h-4" }, void 0, false, {
          fileName: "/app/applet/src/components/ForensicsGuide.tsx",
          lineNumber: 16,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: "Baza Wiedzy i Inżynieria Wsteczna" }, void 0, false, {
          fileName: "/app/applet/src/components/ForensicsGuide.tsx",
          lineNumber: 17,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ForensicsGuide.tsx",
        lineNumber: 15,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("h2", { className: "text-xl sm:text-2xl font-bold text-white", children: "Jak Działają Nakładki Flutter i Mechanizmy Blokad" }, void 0, false, {
        fileName: "/app/applet/src/components/ForensicsGuide.tsx",
        lineNumber: 19,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-slate-400 mt-1 max-w-2xl", children: "Kompendium wiedzy o strukturach okien Win32, bibliotekach Fluttera (window_manager, bitsdojo_window), bezpiecznym pulpicie Windows oraz procedurach awaryjnych." }, void 0, false, {
        fileName: "/app/applet/src/components/ForensicsGuide.tsx",
        lineNumber: 22,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ForensicsGuide.tsx",
      lineNumber: 14,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-4 space-y-2", children: FORENSICS_TOPICS.map((topic) => {
        const isSelected = topic.id === selectedTopicId;
        return /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setSelectedTopicId(topic.id),
            className: `w-full text-left p-3.5 rounded-xl border transition-all flex items-start justify-between ${isSelected ? "bg-rose-950/50 border-rose-500/60 text-white shadow-lg shadow-rose-950/40" : "bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:text-white"}`,
            children: [
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
                  topic.category === "flutter_mechanics" && /* @__PURE__ */ jsxDEV(Lock, { className: "w-3.5 h-3.5 text-rose-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/ForensicsGuide.tsx",
                    lineNumber: 45,
                    columnNumber: 64
                  }, this),
                  topic.category === "emergency_bypass" && /* @__PURE__ */ jsxDEV(AlertOctagon, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/ForensicsGuide.tsx",
                    lineNumber: 46,
                    columnNumber: 63
                  }, this),
                  topic.category === "powershell_cmd" && /* @__PURE__ */ jsxDEV(Terminal, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/ForensicsGuide.tsx",
                    lineNumber: 47,
                    columnNumber: 61
                  }, this),
                  topic.category === "os_internals" && /* @__PURE__ */ jsxDEV(Layers, { className: "w-3.5 h-3.5 text-blue-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/ForensicsGuide.tsx",
                    lineNumber: 48,
                    columnNumber: 59
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold", children: topic.title }, void 0, false, {
                    fileName: "/app/applet/src/components/ForensicsGuide.tsx",
                    lineNumber: 49,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ForensicsGuide.tsx",
                  lineNumber: 44,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400 line-clamp-2", children: topic.summary }, void 0, false, {
                  fileName: "/app/applet/src/components/ForensicsGuide.tsx",
                  lineNumber: 51,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ForensicsGuide.tsx",
                lineNumber: 43,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV(ChevronRight, { className: `w-4 h-4 mt-0.5 transition-transform ${isSelected ? "text-rose-400 translate-x-1" : "text-slate-600"}` }, void 0, false, {
                fileName: "/app/applet/src/components/ForensicsGuide.tsx",
                lineNumber: 53,
                columnNumber: 17
              }, this)
            ]
          },
          topic.id,
          true,
          {
            fileName: "/app/applet/src/components/ForensicsGuide.tsx",
            lineNumber: 34,
            columnNumber: 15
          },
          this
        );
      }) }, void 0, false, {
        fileName: "/app/applet/src/components/ForensicsGuide.tsx",
        lineNumber: 30,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 text-rose-400 text-xs font-mono uppercase", children: /* @__PURE__ */ jsxDEV("span", { children: [
            "Sekcja: ",
            selectedTopic.category
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ForensicsGuide.tsx",
            lineNumber: 63,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/ForensicsGuide.tsx",
            lineNumber: 62,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("h3", { className: "text-xl font-bold text-white mt-1", children: selectedTopic.title }, void 0, false, {
            fileName: "/app/applet/src/components/ForensicsGuide.tsx",
            lineNumber: 65,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-slate-300 mt-2 leading-relaxed", children: selectedTopic.details }, void 0, false, {
            fileName: "/app/applet/src/components/ForensicsGuide.tsx",
            lineNumber: 66,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ForensicsGuide.tsx",
          lineNumber: 61,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold uppercase text-slate-200 block mb-2", children: "Kluczowe zagadnienia techniczne:" }, void 0, false, {
            fileName: "/app/applet/src/components/ForensicsGuide.tsx",
            lineNumber: 71,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("ul", { className: "space-y-2", children: selectedTopic.bulletPoints.map((bp, idx) => /* @__PURE__ */ jsxDEV("li", { className: "flex items-start space-x-2 text-xs sm:text-sm text-slate-300", children: [
            /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" }, void 0, false, {
              fileName: "/app/applet/src/components/ForensicsGuide.tsx",
              lineNumber: 77,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: bp }, void 0, false, {
              fileName: "/app/applet/src/components/ForensicsGuide.tsx",
              lineNumber: 78,
              columnNumber: 19
            }, this)
          ] }, idx, true, {
            fileName: "/app/applet/src/components/ForensicsGuide.tsx",
            lineNumber: 76,
            columnNumber: 17
          }, this)) }, void 0, false, {
            fileName: "/app/applet/src/components/ForensicsGuide.tsx",
            lineNumber: 74,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ForensicsGuide.tsx",
          lineNumber: 70,
          columnNumber: 11
        }, this),
        selectedTopic.codeSnippet && /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-slate-300 block", children: "Przykładowy kod / polecenia:" }, void 0, false, {
            fileName: "/app/applet/src/components/ForensicsGuide.tsx",
            lineNumber: 87,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            CodeBlock,
            {
              code: selectedTopic.codeSnippet,
              language: selectedTopic.category === "powershell_cmd" ? "bash" : "dart",
              filename: selectedTopic.category === "powershell_cmd" ? "terminal_commands.sh" : "blocking_overlay.dart"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ForensicsGuide.tsx",
              lineNumber: 88,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ForensicsGuide.tsx",
          lineNumber: 86,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ForensicsGuide.tsx",
        lineNumber: 60,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ForensicsGuide.tsx",
      lineNumber: 28,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/ForensicsGuide.tsx",
    lineNumber: 12,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkZvcmVuc2ljc0d1aWRlLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCb29rT3BlbiwgU2hpZWxkQ2hlY2ssIEFsZXJ0T2N0YWdvbiwgVGVybWluYWwsIEhlbHBDaXJjbGUsIExheWVycywgQ2hlY2tDaXJjbGUyLCBDaGV2cm9uUmlnaHQsIExvY2sgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgRk9SRU5TSUNTX1RPUElDUywgRm9yZW5zaWNzVG9waWMgfSBmcm9tICcuLi9kYXRhL2ZvcmVuc2ljc0d1aWRlJztcbmltcG9ydCB7IENvZGVCbG9jayB9IGZyb20gJy4vQ29kZUJsb2NrJztcblxuZXhwb3J0IGNvbnN0IEZvcmVuc2ljc0d1aWRlOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgY29uc3QgW3NlbGVjdGVkVG9waWNJZCwgc2V0U2VsZWN0ZWRUb3BpY0lkXSA9IHVzZVN0YXRlPHN0cmluZz4oRk9SRU5TSUNTX1RPUElDU1swXS5pZCk7XG5cbiAgY29uc3Qgc2VsZWN0ZWRUb3BpYyA9IEZPUkVOU0lDU19UT1BJQ1MuZmluZCgodCkgPT4gdC5pZCA9PT0gc2VsZWN0ZWRUb3BpY0lkKSB8fCBGT1JFTlNJQ1NfVE9QSUNTWzBdO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTZcIj5cbiAgICAgIHsvKiBUb3AgQmFubmVyICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAvOTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC0yeGwgcC02IHNoYWRvdy14bFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMiB0ZXh0LXJvc2UtNDAwIHRleHQteHMgdXBwZXJjYXNlIGZvbnQtYm9sZCB0cmFja2luZy13aWRlciBtYi0xXCI+XG4gICAgICAgICAgPEJvb2tPcGVuIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgIDxzcGFuPkJhemEgV2llZHp5IGkgSW7FvHluaWVyaWEgV3N0ZWN6bmE8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC14bCBzbTp0ZXh0LTJ4bCBmb250LWJvbGQgdGV4dC13aGl0ZVwiPlxuICAgICAgICAgIEphayBEemlhxYJhasSFIE5ha8WCYWRraSBGbHV0dGVyIGkgTWVjaGFuaXpteSBCbG9rYWRcbiAgICAgICAgPC9oMj5cbiAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXNsYXRlLTQwMCBtdC0xIG1heC13LTJ4bFwiPlxuICAgICAgICAgIEtvbXBlbmRpdW0gd2llZHp5IG8gc3RydWt0dXJhY2ggb2tpZW4gV2luMzIsIGJpYmxpb3Rla2FjaCBGbHV0dGVyYSAod2luZG93X21hbmFnZXIsIGJpdHNkb2pvX3dpbmRvdyksIGJlenBpZWN6bnltIHB1bHBpY2llIFdpbmRvd3Mgb3JheiBwcm9jZWR1cmFjaCBhd2FyeWpueWNoLlxuICAgICAgICA8L3A+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIEd1aWRlIENvbnRlbnQgTGF5b3V0ICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIGxnOmdyaWQtY29scy0xMiBnYXAtNlwiPlxuICAgICAgICB7LyogVG9waWMgTGlzdCBTaWRlYmFyICg0IGNvbHMpICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTQgc3BhY2UteS0yXCI+XG4gICAgICAgICAge0ZPUkVOU0lDU19UT1BJQ1MubWFwKCh0b3BpYykgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IHRvcGljLmlkID09PSBzZWxlY3RlZFRvcGljSWQ7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAga2V5PXt0b3BpYy5pZH1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTZWxlY3RlZFRvcGljSWQodG9waWMuaWQpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCB0ZXh0LWxlZnQgcC0zLjUgcm91bmRlZC14bCBib3JkZXIgdHJhbnNpdGlvbi1hbGwgZmxleCBpdGVtcy1zdGFydCBqdXN0aWZ5LWJldHdlZW4gJHtcbiAgICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWRcbiAgICAgICAgICAgICAgICAgICAgPyAnYmctcm9zZS05NTAvNTAgYm9yZGVyLXJvc2UtNTAwLzYwIHRleHQtd2hpdGUgc2hhZG93LWxnIHNoYWRvdy1yb3NlLTk1MC80MCdcbiAgICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTAwLzYwIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS0zMDAgaG92ZXI6Ymctc2xhdGUtODAwLzgwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMVwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTJcIj5cbiAgICAgICAgICAgICAgICAgICAge3RvcGljLmNhdGVnb3J5ID09PSAnZmx1dHRlcl9tZWNoYW5pY3MnICYmIDxMb2NrIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtcm9zZS00MDBcIiAvPn1cbiAgICAgICAgICAgICAgICAgICAge3RvcGljLmNhdGVnb3J5ID09PSAnZW1lcmdlbmN5X2J5cGFzcycgJiYgPEFsZXJ0T2N0YWdvbiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWFtYmVyLTQwMFwiIC8+fVxuICAgICAgICAgICAgICAgICAgICB7dG9waWMuY2F0ZWdvcnkgPT09ICdwb3dlcnNoZWxsX2NtZCcgJiYgPFRlcm1pbmFsIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtZW1lcmFsZC00MDBcIiAvPn1cbiAgICAgICAgICAgICAgICAgICAge3RvcGljLmNhdGVnb3J5ID09PSAnb3NfaW50ZXJuYWxzJyAmJiA8TGF5ZXJzIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtYmx1ZS00MDBcIiAvPn1cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGRcIj57dG9waWMudGl0bGV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMCBsaW5lLWNsYW1wLTJcIj57dG9waWMuc3VtbWFyeX08L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPENoZXZyb25SaWdodCBjbGFzc05hbWU9e2B3LTQgaC00IG10LTAuNSB0cmFuc2l0aW9uLXRyYW5zZm9ybSAke2lzU2VsZWN0ZWQgPyAndGV4dC1yb3NlLTQwMCB0cmFuc2xhdGUteC0xJyA6ICd0ZXh0LXNsYXRlLTYwMCd9YH0gLz5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pfVxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogU2VsZWN0ZWQgVG9waWMgQ29udGVudCAoOCBjb2xzKSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi04IGJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLTJ4bCBwLTYgc2hhZG93LXhsIHNwYWNlLXktNVwiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMiB0ZXh0LXJvc2UtNDAwIHRleHQteHMgZm9udC1tb25vIHVwcGVyY2FzZVwiPlxuICAgICAgICAgICAgICA8c3Bhbj5TZWtjamE6IHtzZWxlY3RlZFRvcGljLmNhdGVnb3J5fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkIHRleHQtd2hpdGUgbXQtMVwiPntzZWxlY3RlZFRvcGljLnRpdGxlfTwvaDM+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtc2xhdGUtMzAwIG10LTIgbGVhZGluZy1yZWxheGVkXCI+e3NlbGVjdGVkVG9waWMuZGV0YWlsc308L3A+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogS2V5IEJ1bGxldCBQb2ludHMgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05NTAvODAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC14bCBwLTQgc3BhY2UteS0yXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB1cHBlcmNhc2UgdGV4dC1zbGF0ZS0yMDAgYmxvY2sgbWItMlwiPlxuICAgICAgICAgICAgICBLbHVjem93ZSB6YWdhZG5pZW5pYSB0ZWNobmljem5lOlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxuICAgICAgICAgICAgICB7c2VsZWN0ZWRUb3BpYy5idWxsZXRQb2ludHMubWFwKChicCwgaWR4KSA9PiAoXG4gICAgICAgICAgICAgICAgPGxpIGtleT17aWR4fSBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLXN0YXJ0IHNwYWNlLXgtMiB0ZXh0LXhzIHNtOnRleHQtc20gdGV4dC1zbGF0ZS0zMDBcIj5cbiAgICAgICAgICAgICAgICAgIDxDaGVja0NpcmNsZTIgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXJvc2UtNDAwIGZsZXgtc2hyaW5rLTAgbXQtMC41XCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPnticH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIENvZGUgU25pcHBldCBpZiBwcmVzZW50ICovfVxuICAgICAgICAgIHtzZWxlY3RlZFRvcGljLmNvZGVTbmlwcGV0ICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtc2xhdGUtMzAwIGJsb2NrXCI+UHJ6eWvFgmFkb3d5IGtvZCAvIHBvbGVjZW5pYTo8L3NwYW4+XG4gICAgICAgICAgICAgIDxDb2RlQmxvY2tcbiAgICAgICAgICAgICAgICBjb2RlPXtzZWxlY3RlZFRvcGljLmNvZGVTbmlwcGV0fVxuICAgICAgICAgICAgICAgIGxhbmd1YWdlPXtzZWxlY3RlZFRvcGljLmNhdGVnb3J5ID09PSAncG93ZXJzaGVsbF9jbWQnID8gJ2Jhc2gnIDogJ2RhcnQnfVxuICAgICAgICAgICAgICAgIGZpbGVuYW1lPXtzZWxlY3RlZFRvcGljLmNhdGVnb3J5ID09PSAncG93ZXJzaGVsbF9jbWQnID8gJ3Rlcm1pbmFsX2NvbW1hbmRzLnNoJyA6ICdibG9ja2luZ19vdmVybGF5LmRhcnQnfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwibWFwcGluZ3MiOiJBQWVVO0FBZlYsU0FBZ0IsZ0JBQWdCO0FBQ2hDLFNBQVMsVUFBdUIsY0FBYyxVQUFzQixRQUFRLGNBQWMsY0FBYyxZQUFZO0FBQ3BILFNBQVMsd0JBQXdDO0FBQ2pELFNBQVMsaUJBQWlCO0FBRW5CLGFBQU0saUJBQTJCLE1BQU07QUFDNUMsUUFBTSxDQUFDLGlCQUFpQixr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