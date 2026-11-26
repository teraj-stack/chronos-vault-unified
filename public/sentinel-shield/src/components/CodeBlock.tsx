import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"];
import { Check, Copy, Download } from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
export const CodeBlock = ({
  code,
  language = "python",
  filename = "flutter_overlay_killer.py",
  title
}) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/x-python;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950/90 shadow-2xl backdrop-blur-md", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex space-x-1.5", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "w-3 h-3 rounded-full bg-red-500/80 inline-block" }, void 0, false, {
            fileName: "/app/applet/src/components/CodeBlock.tsx",
            lineNumber: 42,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "w-3 h-3 rounded-full bg-amber-500/80 inline-block" }, void 0, false, {
            fileName: "/app/applet/src/components/CodeBlock.tsx",
            lineNumber: 43,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "w-3 h-3 rounded-full bg-emerald-500/80 inline-block" }, void 0, false, {
            fileName: "/app/applet/src/components/CodeBlock.tsx",
            lineNumber: 44,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CodeBlock.tsx",
          lineNumber: 41,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono text-slate-400 pl-2", children: filename || (title ? title : `${language} script`) }, void 0, false, {
          fileName: "/app/applet/src/components/CodeBlock.tsx",
          lineNumber: 46,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/CodeBlock.tsx",
        lineNumber: 40,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleCopy,
            className: "flex items-center space-x-1 px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700/80 rounded-md transition-colors",
            title: "Kopiuj kod do schowka",
            children: copied ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
              /* @__PURE__ */ jsxDEV(Check, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/CodeBlock.tsx",
                lineNumber: 59,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400", children: "Skopiowano!" }, void 0, false, {
                fileName: "/app/applet/src/components/CodeBlock.tsx",
                lineNumber: 60,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/CodeBlock.tsx",
              lineNumber: 58,
              columnNumber: 15
            }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
              /* @__PURE__ */ jsxDEV(Copy, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/CodeBlock.tsx",
                lineNumber: 64,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Kopiuj" }, void 0, false, {
                fileName: "/app/applet/src/components/CodeBlock.tsx",
                lineNumber: 65,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/CodeBlock.tsx",
              lineNumber: 63,
              columnNumber: 15
            }, this)
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/CodeBlock.tsx",
            lineNumber: 52,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleDownload,
            className: "flex items-center space-x-1 px-2.5 py-1 text-xs font-medium text-emerald-400 hover:text-emerald-300 bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-700/40 rounded-md transition-colors",
            title: "Pobierz jako plik .py",
            children: [
              /* @__PURE__ */ jsxDEV(Download, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/CodeBlock.tsx",
                lineNumber: 75,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Pobierz .py" }, void 0, false, {
                fileName: "/app/applet/src/components/CodeBlock.tsx",
                lineNumber: 76,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/CodeBlock.tsx",
            lineNumber: 70,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/CodeBlock.tsx",
        lineNumber: 51,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/CodeBlock.tsx",
      lineNumber: 39,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "p-4 overflow-x-auto max-h-[500px] overflow-y-auto text-xs sm:text-sm font-mono text-slate-200 leading-relaxed scrollbar-thin scrollbar-thumb-slate-700", children: /* @__PURE__ */ jsxDEV("pre", { className: "whitespace-pre", children: /* @__PURE__ */ jsxDEV("code", { children: code }, void 0, false, {
      fileName: "/app/applet/src/components/CodeBlock.tsx",
      lineNumber: 83,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/CodeBlock.tsx",
      lineNumber: 82,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/CodeBlock.tsx",
      lineNumber: 81,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/CodeBlock.tsx",
    lineNumber: 38,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvZGVCbG9jay50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQ2hlY2ssIENvcHksIERvd25sb2FkIH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcblxuaW50ZXJmYWNlIENvZGVCbG9ja1Byb3BzIHtcbiAgY29kZTogc3RyaW5nO1xuICBsYW5ndWFnZT86IHN0cmluZztcbiAgZmlsZW5hbWU/OiBzdHJpbmc7XG4gIHRpdGxlPzogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgQ29kZUJsb2NrOiBSZWFjdC5GQzxDb2RlQmxvY2tQcm9wcz4gPSAoe1xuICBjb2RlLFxuICBsYW5ndWFnZSA9ICdweXRob24nLFxuICBmaWxlbmFtZSA9ICdmbHV0dGVyX292ZXJsYXlfa2lsbGVyLnB5JyxcbiAgdGl0bGUsXG59KSA9PiB7XG4gIGNvbnN0IFtjb3BpZWQsIHNldENvcGllZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgaGFuZGxlQ29weSA9ICgpID0+IHtcbiAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dChjb2RlKTtcbiAgICBzZXRDb3BpZWQodHJ1ZSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXRDb3BpZWQoZmFsc2UpLCAyMDAwKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVEb3dubG9hZCA9ICgpID0+IHtcbiAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2NvZGVdLCB7IHR5cGU6ICd0ZXh0L3gtcHl0aG9uO2NoYXJzZXQ9dXRmLTgnIH0pO1xuICAgIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgY29uc3QgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBhLmhyZWYgPSB1cmw7XG4gICAgYS5kb3dubG9hZCA9IGZpbGVuYW1lO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYSk7XG4gICAgYS5jbGljaygpO1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYSk7XG4gICAgVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJyb3VuZGVkLXhsIG92ZXJmbG93LWhpZGRlbiBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMC84MCBiZy1zbGF0ZS05NTAvOTAgc2hhZG93LTJ4bCBiYWNrZHJvcC1ibHVyLW1kXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBweC00IHB5LTIuNSBiZy1zbGF0ZS05MDAvOTAgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMlwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBzcGFjZS14LTEuNVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0zIGgtMyByb3VuZGVkLWZ1bGwgYmctcmVkLTUwMC84MCBpbmxpbmUtYmxvY2tcIj48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTMgaC0zIHJvdW5kZWQtZnVsbCBiZy1hbWJlci01MDAvODAgaW5saW5lLWJsb2NrXCI+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0zIGgtMyByb3VuZGVkLWZ1bGwgYmctZW1lcmFsZC01MDAvODAgaW5saW5lLWJsb2NrXCI+PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIHRleHQtc2xhdGUtNDAwIHBsLTJcIj5cbiAgICAgICAgICAgIHtmaWxlbmFtZSB8fCAodGl0bGUgPyB0aXRsZSA6IGAke2xhbmd1YWdlfSBzY3JpcHRgKX1cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yXCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17aGFuZGxlQ29weX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMSBweC0yLjUgcHktMSB0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtc2xhdGUtMzAwIGhvdmVyOnRleHQtd2hpdGUgYmctc2xhdGUtODAwIGhvdmVyOmJnLXNsYXRlLTcwMC84MCByb3VuZGVkLW1kIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgIHRpdGxlPVwiS29waXVqIGtvZCBkbyBzY2hvd2thXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7Y29waWVkID8gKFxuICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgIDxDaGVjayBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWVtZXJhbGQtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtNDAwXCI+U2tvcGlvd2FubyE8L3NwYW4+XG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICA8Q29weSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+S29waXVqPC9zcGFuPlxuICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVEb3dubG9hZH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMSBweC0yLjUgcHktMSB0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtZW1lcmFsZC00MDAgaG92ZXI6dGV4dC1lbWVyYWxkLTMwMCBiZy1lbWVyYWxkLTk1MC81MCBob3ZlcjpiZy1lbWVyYWxkLTkwMC82MCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNzAwLzQwIHJvdW5kZWQtbWQgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgdGl0bGU9XCJQb2JpZXJ6IGpha28gcGxpayAucHlcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxEb3dubG9hZCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5Qb2JpZXJ6IC5weTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgb3ZlcmZsb3cteC1hdXRvIG1heC1oLVs1MDBweF0gb3ZlcmZsb3cteS1hdXRvIHRleHQteHMgc206dGV4dC1zbSBmb250LW1vbm8gdGV4dC1zbGF0ZS0yMDAgbGVhZGluZy1yZWxheGVkIHNjcm9sbGJhci10aGluIHNjcm9sbGJhci10aHVtYi1zbGF0ZS03MDBcIj5cbiAgICAgICAgPHByZSBjbGFzc05hbWU9XCJ3aGl0ZXNwYWNlLXByZVwiPlxuICAgICAgICAgIDxjb2RlPntjb2RlfTwvY29kZT5cbiAgICAgICAgPC9wcmU+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwibWFwcGluZ3MiOiJBQXlDWSxTQWdCRSxVQWhCRjtBQXpDWixTQUFnQixnQkFBZ0I7QUFDaEMsU0FBUyxPQUFPLE1BQU0sZ0JBQWdCO0FBUy9CLGFBQU0sWUFBc0MsQ0FBQztBQUFBLEVBQ2xEO0FBQUEsRUFDQSxXQUFXO0FBQUEsRUFDWCxXQUFXO0FBQUEsRUFDWDtBQUNGLE1BQU07QUFDSixRQUFNLENBQUMsUUFBUSxTQUFTLElBQUksU0FBUyxLQUFLO0FBRTFDLFFBQU0sYUFBYSxNQUFNO0FBQ3ZCLGNBQVUsVUFBVSxVQUFVLElBQUk7QUFDbEMsY0FB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