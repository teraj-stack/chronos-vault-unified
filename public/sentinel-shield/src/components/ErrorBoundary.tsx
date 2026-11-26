import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const React = __vite__cjsImport1_react.__esModule ? __vite__cjsImport1_react.default : __vite__cjsImport1_react;
import { RefreshCw, Wrench, Terminal, AlertOctagon } from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import { selfHealingEngine } from "/sentinel-shield/src/utils/selfRepairSystem.ts";
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.handleInstantRepair = async () => {
      this.setState({ isSelfHealing: true });
      try {
        await selfHealingEngine.performFullSelfRepair();
        setTimeout(() => {
          this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
            isSelfHealing: false,
            repairedSuccessfully: true
          });
          if (this.props.onReset) {
            this.props.onReset();
          }
        }, 600);
      } catch {
        this.setState({ isSelfHealing: false });
      }
    };
    this.handleHardReset = () => {
      try {
        window.localStorage.clear();
        window.sessionStorage.clear();
        window.location.reload();
      } catch {
        window.location.reload();
      }
    };
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      isSelfHealing: false,
      repairedSuccessfully: false
    };
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
      errorInfo: null,
      isSelfHealing: false,
      repairedSuccessfully: false
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error(`[Sentinel Protective Barrier] Intercepted crash in "${this.props.moduleName || "App Module"}":`, error, errorInfo);
    selfHealingEngine.addAuditLog(
      "PRZECHWYCENIE BŁĘDU MODUŁU (ERROR BOUNDARY)",
      this.props.moduleName || "Unassigned Module",
      "REVERTED",
      `Wyjątek: ${error.message || "Nieznany błąd wykonania"}`
    );
    this.setState({ errorInfo });
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsxDEV("div", { className: "p-6 rounded-2xl bg-gradient-to-b from-red-950/80 via-slate-900 to-slate-950 border-2 border-red-600/50 shadow-2xl text-slate-100 max-w-4xl mx-auto my-8 font-sans", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-start space-x-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-red-600/20 rounded-xl border border-red-500/40 text-red-400", children: /* @__PURE__ */ jsxDEV(AlertOctagon, { className: "w-8 h-8 animate-pulse" }, void 0, false, {
          fileName: "/app/applet/src/components/ErrorBoundary.tsx",
          lineNumber: 90,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/ErrorBoundary.tsx",
          lineNumber: 89,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono font-bold px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800", children: "BARIERA OCHRONNA SENTINEL: AKTYWNA" }, void 0, false, {
              fileName: "/app/applet/src/components/ErrorBoundary.tsx",
              lineNumber: 95,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs text-slate-400", children: [
              "Moduł: ",
              this.props.moduleName || "Komponent Aplikacji"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ErrorBoundary.tsx",
              lineNumber: 98,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ErrorBoundary.tsx",
            lineNumber: 94,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("h2", { className: "text-xl font-bold text-white mt-1", children: this.props.fallbackTitle || "Przechwycono i Zneutralizowano Potencjalny Crash Kodu" }, void 0, false, {
            fileName: "/app/applet/src/components/ErrorBoundary.tsx",
            lineNumber: 103,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-slate-300 mt-1", children: "Bariera ochronna zapobiegła rozprzestrzenieniu się błędu na całą aplikację. Stan pamięci podręcznej i wątki zostały bezpiecznie odizolowane w sandboxie." }, void 0, false, {
            fileName: "/app/applet/src/components/ErrorBoundary.tsx",
            lineNumber: 107,
            columnNumber: 15
          }, this),
          this.state.error && /* @__PURE__ */ jsxDEV("div", { className: "mt-4 p-3 bg-black/70 rounded-xl border border-red-900/60 font-mono text-xs text-red-300 overflow-x-auto", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "font-bold text-red-200 mb-1 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxDEV(Terminal, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/ErrorBoundary.tsx",
                lineNumber: 114,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Szczegóły Wyjątku:" }, void 0, false, {
                fileName: "/app/applet/src/components/ErrorBoundary.tsx",
                lineNumber: 115,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ErrorBoundary.tsx",
              lineNumber: 113,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-red-400 break-words", children: this.state.error.toString() }, void 0, false, {
              fileName: "/app/applet/src/components/ErrorBoundary.tsx",
              lineNumber: 117,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ErrorBoundary.tsx",
            lineNumber: 112,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap items-center gap-3 mt-5", children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: this.handleInstantRepair,
                disabled: this.state.isSelfHealing,
                className: "px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-emerald-950/50 transition-all cursor-pointer",
                children: [
                  /* @__PURE__ */ jsxDEV(Wrench, { className: `w-4 h-4 ${this.state.isSelfHealing ? "animate-spin" : ""}` }, void 0, false, {
                    fileName: "/app/applet/src/components/ErrorBoundary.tsx",
                    lineNumber: 128,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: this.state.isSelfHealing ? "Trwa Autonaprawa i Rekonstrukcja..." : "Uruchom Błyskawiczną Autonaprawę Modułu" }, void 0, false, {
                    fileName: "/app/applet/src/components/ErrorBoundary.tsx",
                    lineNumber: 129,
                    columnNumber: 19
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/ErrorBoundary.tsx",
                lineNumber: 123,
                columnNumber: 17
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: this.handleHardReset,
                className: "px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors cursor-pointer",
                children: [
                  /* @__PURE__ */ jsxDEV(RefreshCw, { className: "w-3.5 h-3.5 text-slate-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/ErrorBoundary.tsx",
                    lineNumber: 138,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Pełny Reset Pamięci i Restart" }, void 0, false, {
                    fileName: "/app/applet/src/components/ErrorBoundary.tsx",
                    lineNumber: 139,
                    columnNumber: 19
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/ErrorBoundary.tsx",
                lineNumber: 134,
                columnNumber: 17
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ErrorBoundary.tsx",
            lineNumber: 122,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ErrorBoundary.tsx",
          lineNumber: 93,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ErrorBoundary.tsx",
        lineNumber: 88,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/ErrorBoundary.tsx",
        lineNumber: 87,
        columnNumber: 9
      }, this);
    }
    return this.props.children;
  }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkVycm9yQm91bmRhcnkudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBSZWZyZXNoQ3csIFdyZW5jaCwgVGVybWluYWwsIEFsZXJ0T2N0YWdvbiB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBzZWxmSGVhbGluZ0VuZ2luZSB9IGZyb20gJy4uL3V0aWxzL3NlbGZSZXBhaXJTeXN0ZW0nO1xuXG5leHBvcnQgaW50ZXJmYWNlIEVycm9yQm91bmRhcnlQcm9wcyB7XG4gIGNoaWxkcmVuOiBSZWFjdC5SZWFjdE5vZGU7XG4gIGZhbGxiYWNrVGl0bGU/OiBzdHJpbmc7XG4gIG1vZHVsZU5hbWU/OiBzdHJpbmc7XG4gIG9uUmVzZXQ/OiAoKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEVycm9yQm91bmRhcnlTdGF0ZSB7XG4gIGhhc0Vycm9yOiBib29sZWFuO1xuICBlcnJvcjogRXJyb3IgfCBudWxsO1xuICBlcnJvckluZm86IFJlYWN0LkVycm9ySW5mbyB8IG51bGw7XG4gIGlzU2VsZkhlYWxpbmc6IGJvb2xlYW47XG4gIHJlcGFpcmVkU3VjY2Vzc2Z1bGx5OiBib29sZWFuO1xufVxuXG5leHBvcnQgY2xhc3MgRXJyb3JCb3VuZGFyeSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxFcnJvckJvdW5kYXJ5UHJvcHMsIEVycm9yQm91bmRhcnlTdGF0ZT4ge1xuICBjb25zdHJ1Y3Rvcihwcm9wczogRXJyb3JCb3VuZGFyeVByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBoYXNFcnJvcjogZmFsc2UsXG4gICAgICBlcnJvcjogbnVsbCxcbiAgICAgIGVycm9ySW5mbzogbnVsbCxcbiAgICAgIGlzU2VsZkhlYWxpbmc6IGZhbHNlLFxuICAgICAgcmVwYWlyZWRTdWNjZXNzZnVsbHk6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0RGVyaXZlZFN0YXRlRnJvbUVycm9yKGVycm9yOiBFcnJvcik6IFBhcnRpYWw8RXJyb3JCb3VuZGFyeVN0YXRlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGhhc0Vycm9yOiB0cnVlLFxuICAgICAgZXJyb3IsXG4gICAgICBlcnJvckluZm86IG51bGwsXG4gICAgICBpc1NlbGZIZWFsaW5nOiBmYWxzZSxcbiAgICAgIHJlcGFpcmVkU3VjY2Vzc2Z1bGx5OiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50RGlkQ2F0Y2goZXJyb3I6IEVycm9yLCBlcnJvckluZm86IFJlYWN0LkVycm9ySW5mbyk6IHZvaWQge1xuICAgIGNvbnNvbGUuZXJyb3IoYFtTZW50aW5lbCBQcm90ZWN0aXZlIEJhcnJpZXJdIEludGVyY2VwdGVkIGNyYXNoIGluIFwiJHt0aGlzLnByb3BzLm1vZHVsZU5hbWUgfHwgJ0FwcCBNb2R1bGUnfVwiOmAsIGVycm9yLCBlcnJvckluZm8pO1xuICAgIHNlbGZIZWFsaW5nRW5naW5lLmFkZEF1ZGl0TG9nKFxuICAgICAgJ1BSWkVDSFdZQ0VOSUUgQsWBxJhEVSBNT0RVxYFVIChFUlJPUiBCT1VOREFSWSknLFxuICAgICAgdGhpcy5wcm9wcy5tb2R1bGVOYW1lIHx8ICdVbmFzc2lnbmVkIE1vZHVsZScsXG4gICAgICAnUkVWRVJURUQnLFxuICAgICAgYFd5asSFdGVrOiAke2Vycm9yLm1lc3NhZ2UgfHwgJ05pZXpuYW55IGLFgsSFZCB3eWtvbmFuaWEnfWBcbiAgICApO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBlcnJvckluZm8gfSk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZUluc3RhbnRSZXBhaXIgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGlzU2VsZkhlYWxpbmc6IHRydWUgfSk7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHNlbGZIZWFsaW5nRW5naW5lLnBlcmZvcm1GdWxsU2VsZlJlcGFpcigpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIGhhc0Vycm9yOiBmYWxzZSxcbiAgICAgICAgICBlcnJvcjogbnVsbCxcbiAgICAgICAgICBlcnJvckluZm86IG51bGwsXG4gICAgICAgICAgaXNTZWxmSGVhbGluZzogZmFsc2UsXG4gICAgICAgICAgcmVwYWlyZWRTdWNjZXNzZnVsbHk6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5vblJlc2V0KSB7XG4gICAgICAgICAgdGhpcy5wcm9wcy5vblJlc2V0KCk7XG4gICAgICAgIH1cbiAgICAgIH0sIDYwMCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgaXNTZWxmSGVhbGluZzogZmFsc2UgfSk7XG4gICAgfVxuICB9O1xuXG4gIHByaXZhdGUgaGFuZGxlSGFyZFJlc2V0ID0gKCk6IHZvaWQgPT4ge1xuICAgIHRyeSB7XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuY2xlYXIoKTtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9XG4gIH07XG5cbiAgcmVuZGVyKCk6IFJlYWN0LlJlYWN0Tm9kZSB7XG4gICAgaWYgKHRoaXMuc3RhdGUuaGFzRXJyb3IpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC02IHJvdW5kZWQtMnhsIGJnLWdyYWRpZW50LXRvLWIgZnJvbS1yZWQtOTUwLzgwIHZpYS1zbGF0ZS05MDAgdG8tc2xhdGUtOTUwIGJvcmRlci0yIGJvcmRlci1yZWQtNjAwLzUwIHNoYWRvdy0yeGwgdGV4dC1zbGF0ZS0xMDAgbWF4LXctNHhsIG14LWF1dG8gbXktOCBmb250LXNhbnNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtc3RhcnQgc3BhY2UteC00XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyBiZy1yZWQtNjAwLzIwIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1yZWQtNTAwLzQwIHRleHQtcmVkLTQwMFwiPlxuICAgICAgICAgICAgICA8QWxlcnRPY3RhZ29uIGNsYXNzTmFtZT1cInctOCBoLTggYW5pbWF0ZS1wdWxzZVwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTFcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTJcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbW9ubyBmb250LWJvbGQgcHgtMiBweS0wLjUgcm91bmRlZCBiZy1yZWQtOTUwIHRleHQtcmVkLTMwMCBib3JkZXIgYm9yZGVyLXJlZC04MDBcIj5cbiAgICAgICAgICAgICAgICAgIEJBUklFUkEgT0NIUk9OTkEgU0VOVElORUw6IEFLVFlXTkFcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICAgICAgTW9kdcWCOiB7dGhpcy5wcm9wcy5tb2R1bGVOYW1lIHx8ICdLb21wb25lbnQgQXBsaWthY2ppJ31cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIG10LTFcIj5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5mYWxsYmFja1RpdGxlIHx8ICdQcnplY2h3eWNvbm8gaSBabmV1dHJhbGl6b3dhbm8gUG90ZW5jamFsbnkgQ3Jhc2ggS29kdSd9XG4gICAgICAgICAgICAgIDwvaDI+XG5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXNsYXRlLTMwMCBtdC0xXCI+XG4gICAgICAgICAgICAgICAgQmFyaWVyYSBvY2hyb25uYSB6YXBvYmllZ8WCYSByb3pwcnplc3RyemVuaWVuaXUgc2nEmSBixYLEmWR1IG5hIGNhxYLEhSBhcGxpa2FjasSZLiBTdGFuIHBhbWnEmWNpIHBvZHLEmWN6bmVqIGkgd8SFdGtpIHpvc3RhxYJ5IGJlenBpZWN6bmllIG9kaXpvbG93YW5lIHcgc2FuZGJveGllLlxuICAgICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgICAge3RoaXMuc3RhdGUuZXJyb3IgJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtNCBwLTMgYmctYmxhY2svNzAgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXJlZC05MDAvNjAgZm9udC1tb25vIHRleHQteHMgdGV4dC1yZWQtMzAwIG92ZXJmbG93LXgtYXV0b1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1yZWQtMjAwIG1iLTEgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgICA8VGVybWluYWwgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5TemN6ZWfDs8WCeSBXeWrEhXRrdTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1yZWQtNDAwIGJyZWFrLXdvcmRzXCI+e3RoaXMuc3RhdGUuZXJyb3IudG9TdHJpbmcoKX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICB7LyogQWN0aW9uIEJ1dHRvbnMgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGdhcC0zIG10LTVcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUluc3RhbnRSZXBhaXJ9XG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5zdGF0ZS5pc1NlbGZIZWFsaW5nfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0yIHJvdW5kZWQteGwgYmctZ3JhZGllbnQtdG8tciBmcm9tLWVtZXJhbGQtNjAwIHRvLXRlYWwtNjAwIGhvdmVyOmZyb20tZW1lcmFsZC01MDAgaG92ZXI6dG8tdGVhbC01MDAgdGV4dC13aGl0ZSB0ZXh0LXhzIHNtOnRleHQtc20gZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHNoYWRvdy1sZyBzaGFkb3ctZW1lcmFsZC05NTAvNTAgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxXcmVuY2ggY2xhc3NOYW1lPXtgdy00IGgtNCAke3RoaXMuc3RhdGUuaXNTZWxmSGVhbGluZyA/ICdhbmltYXRlLXNwaW4nIDogJyd9YH0gLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5pc1NlbGZIZWFsaW5nID8gJ1Ryd2EgQXV0b25hcHJhd2EgaSBSZWtvbnN0cnVrY2phLi4uJyA6ICdVcnVjaG9tIELFgnlza2F3aWN6bsSFIEF1dG9uYXByYXfEmSBNb2R1xYJ1J31cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlSGFyZFJlc2V0fVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMy41IHB5LTIgcm91bmRlZC14bCBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHRleHQtc2xhdGUtMjAwIHRleHQteHMgc206dGV4dC1zbSBmb250LXNlbWlib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdHJhbnNpdGlvbi1jb2xvcnMgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxSZWZyZXNoQ3cgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1zbGF0ZS00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+UGXFgm55IFJlc2V0IFBhbWnEmWNpIGkgUmVzdGFydDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xuICB9XG59XG5cblxuIl0sIm1hcHBpbmdzIjoiQUF5RmM7QUF6RmQsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsV0FBVyxRQUFRLFVBQVUsb0JBQW9CO0FBQzFELFNBQVMseUJBQXlCO0FBaUIzQixhQUFNLHNCQUFzQixNQUFNLFVBQWtEO0FBQUEsRUFDekYsWUFBWSxPQUEyQjtBQUNyQyxVQUFNLEtBQUs7QUErQmIsU0FBUSxzQkFBc0IsWUFBMkI7QUFDdkQsV0FBSyxTQUFTLEVBQUUsZUFBZSxLQUFLLENBQUM7QUFDckMsVUFBSTtBQUNGLGNBQU0sa0JBQWtCLHNCQUFzQjtBQUM5QyxtQkFBVyxNQUFNO0FBQ2YsZUFBSyxTQUFTO0FBQUEsWUFDWixVQUFVO0FBQUEsWUFDVixPQUFPO0FBQUEsWUFDUCxXQUFXO0FBQUEsWUFDWCxlQUFlO0FBQUEsWUFDZixzQkFBc0I7QUFBQSxVQUN4QixDQUFDO0FBQ0QsY0FBSSxL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