import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"];
import { Lock, AlertTriangle } from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
export const TitaniumToggleSwitch = ({
  label,
  sublabel,
  code = "SW-TITAN-884",
  checked,
  onChange,
  hasSafetyCover = false,
  dangerLevel = "NORMAL",
  disabled = false
}) => {
  const [isCoverLifted, setIsCoverLifted] = useState(!hasSafetyCover);
  const handleToggle = () => {
    if (disabled) return;
    if (hasSafetyCover && !isCoverLifted) {
      setIsCoverLifted(true);
      return;
    }
    onChange(!checked);
  };
  const handleCoverClick = (e) => {
    e.stopPropagation();
    setIsCoverLifted((prev) => !prev);
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between p-3 rounded-2xl titanium-steel-surface border border-slate-600/60 shadow-xl relative select-none", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "absolute top-1.5 left-1.5 milspec-rivet" }, void 0, false, {
      fileName: "/app/applet/src/components/TitaniumMilitarySwitch.tsx",
      lineNumber: 44,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "absolute top-1.5 right-1.5 milspec-rivet" }, void 0, false, {
      fileName: "/app/applet/src/components/TitaniumMilitarySwitch.tsx",
      lineNumber: 45,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-1.5 left-1.5 milspec-rivet" }, void 0, false, {
      fileName: "/app/applet/src/components/TitaniumMilitarySwitch.tsx",
      lineNumber: 46,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-1.5 right-1.5 milspec-rivet" }, void 0, false, {
      fileName: "/app/applet/src/components/TitaniumMilitarySwitch.tsx",
      lineNumber: 47,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "pl-3.5 pr-2", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[9px] text-slate-400 uppercase tracking-widest bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-700/80", children: code }, void 0, false, {
          fileName: "/app/applet/src/components/TitaniumMilitarySwitch.tsx",
          lineNumber: 52,
          columnNumber: 11
        }, this),
        dangerLevel === "CRITICAL" && /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[9px] text-red-400 font-bold px-1 rounded bg-red-950/80 border border-red-700/60 flex items-center gap-0.5", children: [
          /* @__PURE__ */ jsxDEV(AlertTriangle, { className: "w-2.5 h-2.5" }, void 0, false, {
            fileName: "/app/applet/src/components/TitaniumMilitarySwitch.tsx",
            lineNumber: 57,
            columnNumber: 15
          }, this),
          " ORDNANCE"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/TitaniumMilitarySwitch.tsx",
          lineNumber: 56,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/TitaniumMilitarySwitch.tsx",
        lineNumber: 51,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("h4", { className: "font-mono font-bold text-xs sm:text-sm text-slate-100 tracking-wide mt-1", children: label }, void 0, false, {
        fileName: "/app/applet/src/components/TitaniumMilitarySwitch.tsx",
        lineNumber: 61,
        columnNumber: 9
      }, this),
      sublabel && /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-slate-400 font-sans mt-0.5", children: sublabel }, void 0, false, {
        fileName: "/app/applet/src/components/TitaniumMilitarySwitch.tsx",
        lineNumber: 65,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/TitaniumMilitarySwitch.tsx",
      lineNumber: 50,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 pr-2", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center gap-1", children: [
        /* @__PURE__ */ jsxDEV(
          "div",
          {
            className: `w-3.5 h-3.5 rounded-full border transition-all duration-200 ${checked ? dangerLevel === "CRITICAL" ? "bg-red-500 border-red-300 shadow-[0_0_10px_#ef4444]" : "bg-emerald-400 border-emerald-200 shadow-[0_0_10px_#10b981]" : "bg-zinc-800 border-zinc-600"}`
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/TitaniumMilitarySwitch.tsx",
            lineNumber: 75,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[8px] text-slate-400", children: checked ? "ARMED" : "SAFE" }, void 0, false, {
          fileName: "/app/applet/src/components/TitaniumMilitarySwitch.tsx",
          lineNumber: 84,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/TitaniumMilitarySwitch.tsx",
        lineNumber: 74,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "relative", children: [
        hasSafetyCover && /* @__PURE__ */ jsxDEV(
          "div",
          {
            onClick: handleCoverClick,
            className: `absolute -top-3.5 -left-3 z-30 w-14 h-16 rounded-md cursor-pointer transition-transform duration-300 origin-top shadow-2xl ${isCoverLifted ? "-rotate-85 translate-y-[-6px] scale-90 opacity-90" : "rotate-0 opacity-100"}`,
            title: isCoverLifted ? "Kliknij, aby zamknąć osłonę bezpieczeństwa" : "PODNIEŚ OSŁONĘ BEZPIECZEŃSTWA (LIFT COVER)",
            children: /* @__PURE__ */ jsxDEV("div", { className: `w-full h-full rounded border-2 p-1 flex flex-col items-center justify-between shadow-inner ${dangerLevel === "CRITICAL" ? "milspec-hazard-stripes-danger border-red-500" : "milspec-hazard-stripes border-amber-500"}`, children: [
              /* @__PURE__ */ jsxDEV("div", { className: "bg-black/90 px-1 py-0.5 rounded text-[7px] font-mono font-bold text-yellow-300 tracking-tight", children: isCoverLifted ? "LIFTED" : "ARM GUARD" }, void 0, false, {
                fileName: "/app/applet/src/components/TitaniumMilitarySwitch.tsx",
                lineNumber: 105,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV(Lock, { className: "w-3.5 h-3.5 text-white drop-shadow" }, void 0, false, {
                fileName: "/app/applet/src/components/TitaniumMilitarySwitch.tsx",
                lineNumber: 108,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "bg-black/90 px-1 py-0.5 rounded text-[6px] font-mono text-slate-300", children: "STANAG-4569" }, void 0, false, {
                fileName: "/app/applet/src/components/TitaniumMilitarySwitch.tsx",
                lineNumber: 109,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/TitaniumMilitarySwitch.tsx",
              lineNumber: 102,
              columnNumber: 15
            }, this)
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/TitaniumMilitarySwitch.tsx",
            lineNumber: 93,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "div",
          {
            onClick: handleToggle,
            className: "w-10 h-16 rounded-xl titanium-switch-socket flex flex-col items-center justify-between p-1.5 cursor-pointer transition-all hover:border-slate-400 relative",
            children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-[8px] font-mono font-bold text-slate-400 tracking-tighter", children: "|" }, void 0, false, {
                fileName: "/app/applet/src/components/TitaniumMilitarySwitch.tsx",
                lineNumber: 122,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV(
                "div",
                {
                  className: `w-4 h-9 rounded-full titanium-switch-lever transition-all duration-200 transform relative ${checked ? "-translate-y-1 rotate-[-12deg]" : "translate-y-1 rotate-[12deg]"}`,
                  children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "absolute top-1 inset-x-0.5 h-1 border-t border-b border-black/50" }, void 0, false, {
                      fileName: "/app/applet/src/components/TitaniumMilitarySwitch.tsx",
                      lineNumber: 131,
                      columnNumber: 15
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "absolute top-3 inset-x-0.5 h-1 border-t border-b border-black/50" }, void 0, false, {
                      fileName: "/app/applet/src/components/TitaniumMilitarySwitch.tsx",
                      lineNumber: 132,
                      columnNumber: 15
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-1.5 inset-x-0.5 h-1.5 rounded-full bg-slate-300 shadow-[inset_0_1px_1px_#fff]" }, void 0, false, {
                      fileName: "/app/applet/src/components/TitaniumMilitarySwitch.tsx",
                      lineNumber: 133,
                      columnNumber: 15
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/TitaniumMilitarySwitch.tsx",
                  lineNumber: 125,
                  columnNumber: 13
                },
                this
              ),
              /* @__PURE__ */ jsxDEV("span", { className: "text-[8px] font-mono font-bold text-slate-500 tracking-tighter", children: "O" }, void 0, false, {
                fileName: "/app/applet/src/components/TitaniumMilitarySwitch.tsx",
                lineNumber: 136,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/TitaniumMilitarySwitch.tsx",
            lineNumber: 117,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/TitaniumMilitarySwitch.tsx",
        lineNumber: 90,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/TitaniumMilitarySwitch.tsx",
      lineNumber: 72,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/TitaniumMilitarySwitch.tsx",
    lineNumber: 42,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRpdGFuaXVtTWlsaXRhcnlTd2l0Y2gudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFNoaWVsZCwgTG9jaywgVW5sb2NrLCBBbGVydFRyaWFuZ2xlLCBaYXAsIENoZWNrIH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcblxuaW50ZXJmYWNlIFRpdGFuaXVtVG9nZ2xlU3dpdGNoUHJvcHMge1xuICBsYWJlbDogc3RyaW5nO1xuICBzdWJsYWJlbD86IHN0cmluZztcbiAgY29kZT86IHN0cmluZztcbiAgY2hlY2tlZDogYm9vbGVhbjtcbiAgb25DaGFuZ2U6ICh2YWw6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIGhhc1NhZmV0eUNvdmVyPzogYm9vbGVhbjtcbiAgZGFuZ2VyTGV2ZWw/OiAnTk9STUFMJyB8ICdISUdIJyB8ICdDUklUSUNBTCc7XG4gIGRpc2FibGVkPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IFRpdGFuaXVtVG9nZ2xlU3dpdGNoOiBSZWFjdC5GQzxUaXRhbml1bVRvZ2dsZVN3aXRjaFByb3BzPiA9ICh7XG4gIGxhYmVsLFxuICBzdWJsYWJlbCxcbiAgY29kZSA9ICdTVy1USVRBTi04ODQnLFxuICBjaGVja2VkLFxuICBvbkNoYW5nZSxcbiAgaGFzU2FmZXR5Q292ZXIgPSBmYWxzZSxcbiAgZGFuZ2VyTGV2ZWwgPSAnTk9STUFMJyxcbiAgZGlzYWJsZWQgPSBmYWxzZVxufSkgPT4ge1xuICBjb25zdCBbaXNDb3ZlckxpZnRlZCwgc2V0SXNDb3ZlckxpZnRlZF0gPSB1c2VTdGF0ZSghaGFzU2FmZXR5Q292ZXIpO1xuXG4gIGNvbnN0IGhhbmRsZVRvZ2dsZSA9ICgpID0+IHtcbiAgICBpZiAoZGlzYWJsZWQpIHJldHVybjtcbiAgICBpZiAoaGFzU2FmZXR5Q292ZXIgJiYgIWlzQ292ZXJMaWZ0ZWQpIHtcbiAgICAgIHNldElzQ292ZXJMaWZ0ZWQodHJ1ZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG9uQ2hhbmdlKCFjaGVja2VkKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVDb3ZlckNsaWNrID0gKGU6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHNldElzQ292ZXJMaWZ0ZWQocHJldiA9PiAhcHJldik7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBwLTMgcm91bmRlZC0yeGwgdGl0YW5pdW0tc3RlZWwtc3VyZmFjZSBib3JkZXIgYm9yZGVyLXNsYXRlLTYwMC82MCBzaGFkb3cteGwgcmVsYXRpdmUgc2VsZWN0LW5vbmVcIj5cbiAgICAgIHsvKiA0IE1pbC1TcGVjIENvcm5lciBIZXggUml2ZXRzICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMS41IGxlZnQtMS41IG1pbHNwZWMtcml2ZXRcIiAvPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMS41IHJpZ2h0LTEuNSBtaWxzcGVjLXJpdmV0XCIgLz5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLTEuNSBsZWZ0LTEuNSBtaWxzcGVjLXJpdmV0XCIgLz5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLTEuNSByaWdodC0xLjUgbWlsc3BlYy1yaXZldFwiIC8+XG5cbiAgICAgIHsvKiBMYWJlbCBhbmQgU3RlbmNpbGVkIE1ldGFkYXRhICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbC0zLjUgcHItMlwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bOXB4XSB0ZXh0LXNsYXRlLTQwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0IGJnLXNsYXRlLTkwMC84MCBweC0xLjUgcHktMC41IHJvdW5kZWQgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAvODBcIj5cbiAgICAgICAgICAgIHtjb2RlfVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICB7ZGFuZ2VyTGV2ZWwgPT09ICdDUklUSUNBTCcgJiYgKFxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzlweF0gdGV4dC1yZWQtNDAwIGZvbnQtYm9sZCBweC0xIHJvdW5kZWQgYmctcmVkLTk1MC84MCBib3JkZXIgYm9yZGVyLXJlZC03MDAvNjAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTAuNVwiPlxuICAgICAgICAgICAgICA8QWxlcnRUcmlhbmdsZSBjbGFzc05hbWU9XCJ3LTIuNSBoLTIuNVwiIC8+IE9SRE5BTkNFXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxoNCBjbGFzc05hbWU9XCJmb250LW1vbm8gZm9udC1ib2xkIHRleHQteHMgc206dGV4dC1zbSB0ZXh0LXNsYXRlLTEwMCB0cmFja2luZy13aWRlIG10LTFcIj5cbiAgICAgICAgICB7bGFiZWx9XG4gICAgICAgIDwvaDQ+XG4gICAgICAgIHtzdWJsYWJlbCAmJiAoXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDAgZm9udC1zYW5zIG10LTAuNVwiPlxuICAgICAgICAgICAge3N1YmxhYmVsfVxuICAgICAgICAgIDwvcD5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogSGFyZHdhcmUgU3dpdGNoIEhvdXNpbmcgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zIHByLTJcIj5cbiAgICAgICAgey8qIExFRCBJbmRpY2F0b3IgTGFtcCAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgIDxkaXYgXG4gICAgICAgICAgICBjbGFzc05hbWU9e2B3LTMuNSBoLTMuNSByb3VuZGVkLWZ1bGwgYm9yZGVyIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTIwMCAke1xuICAgICAgICAgICAgICBjaGVja2VkIFxuICAgICAgICAgICAgICAgID8gZGFuZ2VyTGV2ZWwgPT09ICdDUklUSUNBTCdcbiAgICAgICAgICAgICAgICAgID8gJ2JnLXJlZC01MDAgYm9yZGVyLXJlZC0zMDAgc2hhZG93LVswXzBfMTBweF8jZWY0NDQ0XSdcbiAgICAgICAgICAgICAgICAgIDogJ2JnLWVtZXJhbGQtNDAwIGJvcmRlci1lbWVyYWxkLTIwMCBzaGFkb3ctWzBfMF8xMHB4XyMxMGI5ODFdJ1xuICAgICAgICAgICAgICAgIDogJ2JnLXppbmMtODAwIGJvcmRlci16aW5jLTYwMCdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzhweF0gdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgIHtjaGVja2VkID8gJ0FSTUVEJyA6ICdTQUZFJ31cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBUYWN0aWxlIFRvZ2dsZSBNZWNoYW5pc20gKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cbiAgICAgICAgICB7LyogRmxpcC11cCBTYWZldHkgR3VhcmQgKGlmIGVuYWJsZWQpICovfVxuICAgICAgICAgIHtoYXNTYWZldHlDb3ZlciAmJiAoXG4gICAgICAgICAgICA8ZGl2IFxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVDb3ZlckNsaWNrfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BhYnNvbHV0ZSAtdG9wLTMuNSAtbGVmdC0zIHotMzAgdy0xNCBoLTE2IHJvdW5kZWQtbWQgY3Vyc29yLXBvaW50ZXIgdHJhbnNpdGlvbi10cmFuc2Zvcm0gZHVyYXRpb24tMzAwIG9yaWdpbi10b3Agc2hhZG93LTJ4bCAke1xuICAgICAgICAgICAgICAgIGlzQ292ZXJMaWZ0ZWQgXG4gICAgICAgICAgICAgICAgICA/ICctcm90YXRlLTg1IHRyYW5zbGF0ZS15LVstNnB4XSBzY2FsZS05MCBvcGFjaXR5LTkwJyBcbiAgICAgICAgICAgICAgICAgIDogJ3JvdGF0ZS0wIG9wYWNpdHktMTAwJ1xuICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgdGl0bGU9e2lzQ292ZXJMaWZ0ZWQgPyAnS2xpa25paiwgYWJ5IHphbWtuxIXEhyBvc8WCb27EmSBiZXpwaWVjemXFhHN0d2EnIDogJ1BPRE5JRcWaIE9TxYFPTsSYIEJFWlBJRUNaRcWDU1RXQSAoTElGVCBDT1ZFUiknfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHctZnVsbCBoLWZ1bGwgcm91bmRlZCBib3JkZXItMiBwLTEgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHNoYWRvdy1pbm5lciAke1xuICAgICAgICAgICAgICAgIGRhbmdlckxldmVsID09PSAnQ1JJVElDQUwnID8gJ21pbHNwZWMtaGF6YXJkLXN0cmlwZXMtZGFuZ2VyIGJvcmRlci1yZWQtNTAwJyA6ICdtaWxzcGVjLWhhemFyZC1zdHJpcGVzIGJvcmRlci1hbWJlci01MDAnXG4gICAgICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWJsYWNrLzkwIHB4LTEgcHktMC41IHJvdW5kZWQgdGV4dC1bN3B4XSBmb250LW1vbm8gZm9udC1ib2xkIHRleHQteWVsbG93LTMwMCB0cmFja2luZy10aWdodFwiPlxuICAgICAgICAgICAgICAgICAge2lzQ292ZXJMaWZ0ZWQgPyAnTElGVEVEJyA6ICdBUk0gR1VBUkQnfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxMb2NrIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtd2hpdGUgZHJvcC1zaGFkb3dcIiAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctYmxhY2svOTAgcHgtMSBweS0wLjUgcm91bmRlZCB0ZXh0LVs2cHhdIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgU1RBTkFHLTQ1NjlcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAgey8qIFRpdGFuaXVtIFN3aXRjaCBTb2NrZXQgQmV6ZWwgKi99XG4gICAgICAgICAgPGRpdiBcbiAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVRvZ2dsZX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMTAgaC0xNiByb3VuZGVkLXhsIHRpdGFuaXVtLXN3aXRjaC1zb2NrZXQgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHAtMS41IGN1cnNvci1wb2ludGVyIHRyYW5zaXRpb24tYWxsIGhvdmVyOmJvcmRlci1zbGF0ZS00MDAgcmVsYXRpdmVcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIHsvKiBVcHBlciBPbi9PZmYgaW5kaWNhdG9ycyBzdGFtcGVkICovfVxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bOHB4XSBmb250LW1vbm8gZm9udC1ib2xkIHRleHQtc2xhdGUtNDAwIHRyYWNraW5nLXRpZ2h0ZXJcIj58PC9zcGFuPlxuXG4gICAgICAgICAgICB7LyogSGVhdnktR2F1Z2UgVGl0YW5pdW0gTGV2ZXIgKi99XG4gICAgICAgICAgICA8ZGl2IFxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LTQgaC05IHJvdW5kZWQtZnVsbCB0aXRhbml1bS1zd2l0Y2gtbGV2ZXIgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMjAwIHRyYW5zZm9ybSByZWxhdGl2ZSAke1xuICAgICAgICAgICAgICAgIGNoZWNrZWQgPyAnLXRyYW5zbGF0ZS15LTEgcm90YXRlLVstMTJkZWddJyA6ICd0cmFuc2xhdGUteS0xIHJvdGF0ZS1bMTJkZWddJ1xuICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgey8qIEtudXJsZWQgc3RlZWwgZ3JpcCBiYW5kcyAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMSBpbnNldC14LTAuNSBoLTEgYm9yZGVyLXQgYm9yZGVyLWIgYm9yZGVyLWJsYWNrLzUwXCIgLz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMyBpbnNldC14LTAuNSBoLTEgYm9yZGVyLXQgYm9yZGVyLWIgYm9yZGVyLWJsYWNrLzUwXCIgLz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tMS41IGluc2V0LXgtMC41IGgtMS41IHJvdW5kZWQtZnVsbCBiZy1zbGF0ZS0zMDAgc2hhZG93LVtpbnNldF8wXzFweF8xcHhfI2ZmZl1cIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzhweF0gZm9udC1tb25vIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTUwMCB0cmFja2luZy10aWdodGVyXCI+Tzwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwibWFwcGluZ3MiOiJBQTJDTTtBQTNDTixTQUFnQixnQkFBZ0I7QUFDaEMsU0FBaUIsTUFBYyxxQkFBaUM7QUFhekQsYUFBTSx1QkFBNEQsQ0FBQztBQUFBLEVBQ3hFO0FBQUEsRUFDQTtBQUFBLEVBQ0EsT0FBTztBQUFBLEVBQ1A7QUFBQSxFQUNBO0FBQUEsRUFDQSxpQkFBaUI7QUFBQSxF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