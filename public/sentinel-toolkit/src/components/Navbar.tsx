import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-toolkit/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=019a4779"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-toolkit/node_modules/.vite/deps/react.js?v=019a4779"; const useState = __vite__cjsImport1_react["useState"];
import {
  ShieldAlert,
  Terminal,
  Sparkles,
  Cpu,
  BookOpen,
  AlertTriangle,
  Download,
  Activity,
  Skull,
  Crosshair,
  Wrench,
  Menu,
  X,
  Radio,
  Zap,
  Box,
  Building2
} from "/sentinel-toolkit/node_modules/.vite/deps/lucide-react.js?v=6cbc5a0a";
import { downloadFullOfflineBundle } from "/sentinel-toolkit/src/utils/offlinePackageExporter.ts";
export const Navbar = ({
  activeTab,
  setActiveTab,
  selectedOS,
  setSelectedOS,
  theme,
  setTheme
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = [
    { id: "hologram", label: "Biuro 50P", icon: Building2, badge: "Holo 50P", highlight: true },
    { id: "radar", label: "Radar Skaner", icon: Radio, badge: "Monolit I/O", highlight: true },
    { id: "threed", label: "Grafika 3D", icon: Box, badge: "Three.js", highlight: true },
    { id: "optimizer", label: "AI Optymalizator", icon: Zap, badge: "Permanentny AI", highlight: true },
    { id: "hunter", label: "Łowca Gemini", icon: Crosshair, badge: "AI Hunt" },
    { id: "threats", label: "Baza Gnid", icon: Skull, badge: "Zniszczone" },
    { id: "healing", label: "Autonaprawa", icon: Wrench, badge: "Bariery" },
    { id: "scripts", label: "Skrypty", icon: Terminal, badge: null },
    { id: "generator", label: "Kreator .py & Studio", icon: Cpu, badge: "Wypieranie" },
    { id: "simulator", label: "Symulator", icon: AlertTriangle, badge: "Live" },
    { id: "watchdog", label: "Watchdog", icon: Activity, badge: "CPU/RAM" },
    { id: "forensics", label: "Wiedza", icon: BookOpen, badge: null },
    { id: "ai", label: "AI Asystent", icon: Sparkles, badge: null }
  ];
  return /* @__PURE__ */ jsxDEV("header", { className: "sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-xl", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-3 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between h-16", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2.5 cursor-pointer shrink-0", onClick: () => setActiveTab("scripts"), children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 flex items-center justify-center shadow-lg shadow-purple-500/20", children: /* @__PURE__ */ jsxDEV(ShieldAlert, { className: "w-5 h-5 text-white animate-pulse" }, void 0, false, {
          fileName: "/app/applet/src/components/Navbar.tsx",
          lineNumber: 53,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/Navbar.tsx",
          lineNumber: 52,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-1.5", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "font-extrabold text-sm sm:text-base bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent", children: "Sentinel Sentinel Shield" }, void 0, false, {
              fileName: "/app/applet/src/components/Navbar.tsx",
              lineNumber: 57,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] uppercase font-mono font-bold px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-800/60 hidden sm:inline-block", children: "v2.4" }, void 0, false, {
              fileName: "/app/applet/src/components/Navbar.tsx",
              lineNumber: 60,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Navbar.tsx",
            lineNumber: 56,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-slate-400 hidden md:block", children: "Łowca Gemini AI • Baza Zniszczonych Wirusów • Autonaprawa" }, void 0, false, {
            fileName: "/app/applet/src/components/Navbar.tsx",
            lineNumber: 64,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/Navbar.tsx",
          lineNumber: 55,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/Navbar.tsx",
        lineNumber: 51,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("nav", { className: "hidden xl:flex items-center space-x-1", children: navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab(item.id),
            className: `btn-glossy flex items-center space-x-1 px-2.5 py-1.5 text-xs font-semibold transition-all ${isActive ? item.highlight ? "btn-glossy-primary is-active shadow-lg shadow-indigo-950/60" : "btn-glossy-purple is-active shadow-lg shadow-purple-950/60" : "bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800/90 border border-slate-800"}`,
            children: [
              /* @__PURE__ */ jsxDEV(Icon, { className: `w-3.5 h-3.5 ${item.highlight && isActive ? "animate-pulse text-yellow-300" : ""}` }, void 0, false, {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 88,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: item.label }, void 0, false, {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 89,
                columnNumber: 19
              }, this),
              item.badge && /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] font-mono px-1 py-0.2 rounded bg-black/50 text-cyan-200 border border-cyan-800/40", children: item.badge }, void 0, false, {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 91,
                columnNumber: 21
              }, this)
            ]
          },
          item.id,
          true,
          {
            fileName: "/app/applet/src/components/Navbar.tsx",
            lineNumber: 77,
            columnNumber: 17
          },
          this
        );
      }) }, void 0, false, {
        fileName: "/app/applet/src/components/Navbar.tsx",
        lineNumber: 71,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("nav", { className: "hidden md:flex xl:hidden items-center space-x-1", children: navItems.slice(0, 6).map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab(item.id),
            className: `btn-glossy flex items-center space-x-1 px-2 py-1.5 text-xs font-semibold ${isActive ? "btn-glossy-purple is-active" : "bg-slate-900 text-slate-300 hover:bg-slate-800"}`,
            children: [
              /* @__PURE__ */ jsxDEV(Icon, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 113,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: item.label }, void 0, false, {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 114,
                columnNumber: 19
              }, this)
            ]
          },
          item.id,
          true,
          {
            fileName: "/app/applet/src/components/Navbar.tsx",
            lineNumber: 106,
            columnNumber: 17
          },
          this
        );
      }) }, void 0, false, {
        fileName: "/app/applet/src/components/Navbar.tsx",
        lineNumber: 101,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "hidden sm:flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-[11px]", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setTheme("cyber"),
              title: "Motyw Cyber Matrix",
              className: `btn-glossy px-2 py-0.5 rounded-md font-medium transition-colors ${theme === "cyber" ? "btn-glossy-purple text-white" : "text-slate-400 hover:text-white"}`,
              children: "Cyber"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/Navbar.tsx",
              lineNumber: 124,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setTheme("tactical"),
              title: "Motyw Tactical Red",
              className: `btn-glossy px-2 py-0.5 rounded-md font-medium transition-colors ${theme === "tactical" ? "btn-glossy-red text-white" : "text-slate-400 hover:text-white"}`,
              children: "Tactical"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/Navbar.tsx",
              lineNumber: 133,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/Navbar.tsx",
          lineNumber: 123,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: downloadFullOfflineBundle,
            className: "btn-glossy btn-glossy-emerald hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold",
            title: "Pobierz pakiet awaryjny .bat + .py",
            children: [
              /* @__PURE__ */ jsxDEV(Download, { className: "w-3.5 h-3.5 text-emerald-200" }, void 0, false, {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 150,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Pakiet .zip" }, void 0, false, {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 151,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/Navbar.tsx",
            lineNumber: 145,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setMobileMenuOpen(!mobileMenuOpen),
            className: "xl:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white cursor-pointer",
            "aria-label": "Toggle menu",
            children: mobileMenuOpen ? /* @__PURE__ */ jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
              fileName: "/app/applet/src/components/Navbar.tsx",
              lineNumber: 160,
              columnNumber: 33
            }, this) : /* @__PURE__ */ jsxDEV(Menu, { className: "w-5 h-5" }, void 0, false, {
              fileName: "/app/applet/src/components/Navbar.tsx",
              lineNumber: 160,
              columnNumber: 61
            }, this)
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/Navbar.tsx",
            lineNumber: 155,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/Navbar.tsx",
        lineNumber: 121,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/Navbar.tsx",
      lineNumber: 49,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/Navbar.tsx",
      lineNumber: 48,
      columnNumber: 7
    }, this),
    mobileMenuOpen && /* @__PURE__ */ jsxDEV("div", { className: "xl:hidden bg-slate-950/98 border-b border-slate-800 px-4 py-3 space-y-1", children: navItems.map((item) => {
      const Icon = item.icon;
      const isActive = activeTab === item.id;
      return /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => {
            setActiveTab(item.id);
            setMobileMenuOpen(false);
          },
          className: `w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold ${isActive ? "bg-purple-600 text-white" : "text-slate-300 hover:bg-slate-800"}`,
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsxDEV(Icon, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 184,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: item.label }, void 0, false, {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 185,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/Navbar.tsx",
              lineNumber: 183,
              columnNumber: 17
            }, this),
            item.badge && /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/50 text-purple-200", children: item.badge }, void 0, false, {
              fileName: "/app/applet/src/components/Navbar.tsx",
              lineNumber: 188,
              columnNumber: 19
            }, this)
          ]
        },
        item.id,
        true,
        {
          fileName: "/app/applet/src/components/Navbar.tsx",
          lineNumber: 173,
          columnNumber: 15
        },
        this
      );
    }) }, void 0, false, {
      fileName: "/app/applet/src/components/Navbar.tsx",
      lineNumber: 168,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/Navbar.tsx",
    lineNumber: 47,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk5hdmJhci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgXG4gIFNoaWVsZEFsZXJ0LCBUZXJtaW5hbCwgU3BhcmtsZXMsIENwdSwgQm9va09wZW4sIEFsZXJ0VHJpYW5nbGUsIFxuICBEb3dubG9hZCwgUGFsZXR0ZSwgQWN0aXZpdHksIFNrdWxsLCBDcm9zc2hhaXIsIFdyZW5jaCwgTWVudSwgWCwgU2hpZWxkQ2hlY2ssIEhlYXJ0UHVsc2UsIFJhZGlvLCBaYXAsIEJveCwgQnVpbGRpbmcyXG59IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBPU1R5cGUgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBkb3dubG9hZEZ1bGxPZmZsaW5lQnVuZGxlIH0gZnJvbSAnLi4vdXRpbHMvb2ZmbGluZVBhY2thZ2VFeHBvcnRlcic7XG5cbmV4cG9ydCB0eXBlIFRhYlR5cGUgPSAnaG9sb2dyYW0nIHwgJ3JhZGFyJyB8ICd0aHJlZWQnIHwgJ29wdGltaXplcicgfCAnaHVudGVyJyB8ICd0aHJlYXRzJyB8ICdoZWFsaW5nJyB8ICdzY3JpcHRzJyB8ICdnZW5lcmF0b3InIHwgJ3NpbXVsYXRvcicgfCAnd2F0Y2hkb2cnIHwgJ2ZvcmVuc2ljcycgfCAnYWknO1xuXG5pbnRlcmZhY2UgTmF2YmFyUHJvcHMge1xuICBhY3RpdmVUYWI6IFRhYlR5cGU7XG4gIHNldEFjdGl2ZVRhYjogKHRhYjogVGFiVHlwZSkgPT4gdm9pZDtcbiAgc2VsZWN0ZWRPUzogT1NUeXBlO1xuICBzZXRTZWxlY3RlZE9TOiAob3M6IE9TVHlwZSkgPT4gdm9pZDtcbiAgdGhlbWU6ICdjeWJlcicgfCAnc3RlYWx0aCcgfCAndGFjdGljYWwnO1xuICBzZXRUaGVtZTogKHRoZW1lOiAnY3liZXInIHwgJ3N0ZWFsdGgnIHwgJ3RhY3RpY2FsJykgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGNvbnN0IE5hdmJhcjogUmVhY3QuRkM8TmF2YmFyUHJvcHM+ID0gKHtcbiAgYWN0aXZlVGFiLFxuICBzZXRBY3RpdmVUYWIsXG4gIHNlbGVjdGVkT1MsXG4gIHNldFNlbGVjdGVkT1MsXG4gIHRoZW1lLFxuICBzZXRUaGVtZSxcbn0pID0+IHtcbiAgY29uc3QgW21vYmlsZU1lbnVPcGVuLCBzZXRNb2JpbGVNZW51T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgbmF2SXRlbXMgPSBbXG4gICAgeyBpZDogJ2hvbG9ncmFtJyBhcyBUYWJUeXBlLCBsYWJlbDogJ0JpdXJvIDUwUCcsIGljb246IEJ1aWxkaW5nMiwgYmFkZ2U6ICdIb2xvIDUwUCcsIGhpZ2hsaWdodDogdHJ1ZSB9LFxuICAgIHsgaWQ6ICdyYWRhcicgYXMgVGFiVHlwZSwgbGFiZWw6ICdSYWRhciBTa2FuZXInLCBpY29uOiBSYWRpbywgYmFkZ2U6ICdNb25vbGl0IEkvTycsIGhpZ2hsaWdodDogdHJ1ZSB9LFxuICAgIHsgaWQ6ICd0aHJlZWQnIGFzIFRhYlR5cGUsIGxhYmVsOiAnR3JhZmlrYSAzRCcsIGljb246IEJveCwgYmFkZ2U6ICdUaHJlZS5qcycsIGhpZ2hsaWdodDogdHJ1ZSB9LFxuICAgIHsgaWQ6ICdvcHRpbWl6ZXInIGFzIFRhYlR5cGUsIGxhYmVsOiAnQUkgT3B0eW1hbGl6YXRvcicsIGljb246IFphcCwgYmFkZ2U6ICdQZXJtYW5lbnRueSBBSScsIGhpZ2hsaWdodDogdHJ1ZSB9LFxuICAgIHsgaWQ6ICdodW50ZXInIGFzIFRhYlR5cGUsIGxhYmVsOiAnxYFvd2NhIEdlbWluaScsIGljb246IENyb3NzaGFpciwgYmFkZ2U6ICdBSSBIdW50JyB9LFxuICAgIHsgaWQ6ICd0aHJlYXRzJyBhcyBUYWJUeXBlLCBsYWJlbDogJ0JhemEgR25pZCcsIGljb246IFNrdWxsLCBiYWRnZTogJ1puaXN6Y3pvbmUnIH0sXG4gICAgeyBpZDogJ2hlYWxpbmcnIGFzIFRhYlR5cGUsIGxhYmVsOiAnQXV0b25hcHJhd2EnLCBpY29uOiBXcmVuY2gsIGJhZGdlOiAnQmFyaWVyeScgfSxcbiAgICB7IGlkOiAnc2NyaXB0cycgYXMgVGFiVHlwZSwgbGFiZWw6ICdTa3J5cHR5JywgaWNvbjogVGVybWluYWwsIGJhZGdlOiBudWxsIH0sXG4gICAgeyBpZDogJ2dlbmVyYXRvcicgYXMgVGFiVHlwZSwgbGFiZWw6ICdLcmVhdG9yIC5weSAmIFN0dWRpbycsIGljb246IENwdSwgYmFkZ2U6ICdXeXBpZXJhbmllJyB9LFxuICAgIHsgaWQ6ICdzaW11bGF0b3InIGFzIFRhYlR5cGUsIGxhYmVsOiAnU3ltdWxhdG9yJywgaWNvbjogQWxlcnRUcmlhbmdsZSwgYmFkZ2U6ICdMaXZlJyB9LFxuICAgIHsgaWQ6ICd3YXRjaGRvZycgYXMgVGFiVHlwZSwgbGFiZWw6ICdXYXRjaGRvZycsIGljb246IEFjdGl2aXR5LCBiYWRnZTogJ0NQVS9SQU0nIH0sXG4gICAgeyBpZDogJ2ZvcmVuc2ljcycgYXMgVGFiVHlwZSwgbGFiZWw6ICdXaWVkemEnLCBpY29uOiBCb29rT3BlbiwgYmFkZ2U6IG51bGwgfSxcbiAgICB7IGlkOiAnYWknIGFzIFRhYlR5cGUsIGxhYmVsOiAnQUkgQXN5c3RlbnQnLCBpY29uOiBTcGFya2xlcywgYmFkZ2U6IG51bGwgfSxcbiAgXTtcblxuICByZXR1cm4gKFxuICAgIDxoZWFkZXIgY2xhc3NOYW1lPVwic3RpY2t5IHRvcC0wIHotNDAgYmctc2xhdGUtOTAwLzk1IGJhY2tkcm9wLWJsdXItbWQgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMCBzaGFkb3cteGxcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctN3hsIG14LWF1dG8gcHgtMyBzbTpweC02IGxnOnB4LThcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gaC0xNlwiPlxuICAgICAgICAgIHsvKiBMb2dvIC8gQnJhbmQgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTIuNSBjdXJzb3ItcG9pbnRlciBzaHJpbmstMFwiIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYignc2NyaXB0cycpfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy05IGgtOSByb3VuZGVkLXhsIGJnLWdyYWRpZW50LXRvLWJyIGZyb20tcHVycGxlLTYwMCB2aWEtcGluay02MDAgdG8tcmVkLTYwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBzaGFkb3ctbGcgc2hhZG93LXB1cnBsZS01MDAvMjBcIj5cbiAgICAgICAgICAgICAgPFNoaWVsZEFsZXJ0IGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC13aGl0ZSBhbmltYXRlLXB1bHNlXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTEuNVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtZXh0cmFib2xkIHRleHQtc20gc206dGV4dC1iYXNlIGJnLWdyYWRpZW50LXRvLXIgZnJvbS13aGl0ZSB2aWEtc2xhdGUtMTAwIHRvLXNsYXRlLTMwMCBiZy1jbGlwLXRleHQgdGV4dC10cmFuc3BhcmVudFwiPlxuICAgICAgICAgICAgICAgICAgU2VudGluZWwgU2VudGluZWwgU2hpZWxkXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzlweF0gdXBwZXJjYXNlIGZvbnQtbW9ubyBmb250LWJvbGQgcHgtMS41IHB5LTAuMiByb3VuZGVkIGJnLXB1cnBsZS05NTAgdGV4dC1wdXJwbGUtMzAwIGJvcmRlciBib3JkZXItcHVycGxlLTgwMC82MCBoaWRkZW4gc206aW5saW5lLWJsb2NrXCI+XG4gICAgICAgICAgICAgICAgICB2Mi40XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDAgaGlkZGVuIG1kOmJsb2NrXCI+XG4gICAgICAgICAgICAgICAgxYFvd2NhIEdlbWluaSBBSSDigKIgQmF6YSBabmlzemN6b255Y2ggV2lydXPDs3cg4oCiIEF1dG9uYXByYXdhXG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIERlc2t0b3AgTmF2aWdhdGlvbiBUYWJzICovfVxuICAgICAgICAgIDxuYXYgY2xhc3NOYW1lPVwiaGlkZGVuIHhsOmZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMVwiPlxuICAgICAgICAgICAge25hdkl0ZW1zLm1hcChpdGVtID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgSWNvbiA9IGl0ZW0uaWNvbjtcbiAgICAgICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBhY3RpdmVUYWIgPT09IGl0ZW0uaWQ7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBrZXk9e2l0ZW0uaWR9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUYWIoaXRlbS5pZCl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BidG4tZ2xvc3N5IGZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMSBweC0yLjUgcHktMS41IHRleHQteHMgZm9udC1zZW1pYm9sZCB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICAgICAgICBpc0FjdGl2ZVxuICAgICAgICAgICAgICAgICAgICAgID8gaXRlbS5oaWdobGlnaHRcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ2J0bi1nbG9zc3ktcHJpbWFyeSBpcy1hY3RpdmUgc2hhZG93LWxnIHNoYWRvdy1pbmRpZ28tOTUwLzYwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiAnYnRuLWdsb3NzeS1wdXJwbGUgaXMtYWN0aXZlIHNoYWRvdy1sZyBzaGFkb3ctcHVycGxlLTk1MC82MCdcbiAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05MDAvODAgdGV4dC1zbGF0ZS0zMDAgaG92ZXI6dGV4dC13aGl0ZSBob3ZlcjpiZy1zbGF0ZS04MDAvOTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAnXG4gICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8SWNvbiBjbGFzc05hbWU9e2B3LTMuNSBoLTMuNSAke2l0ZW0uaGlnaGxpZ2h0ICYmIGlzQWN0aXZlID8gJ2FuaW1hdGUtcHVsc2UgdGV4dC15ZWxsb3ctMzAwJyA6ICcnfWB9IC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj57aXRlbS5sYWJlbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICB7aXRlbS5iYWRnZSAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzlweF0gZm9udC1tb25vIHB4LTEgcHktMC4yIHJvdW5kZWQgYmctYmxhY2svNTAgdGV4dC1jeWFuLTIwMCBib3JkZXIgYm9yZGVyLWN5YW4tODAwLzQwXCI+XG4gICAgICAgICAgICAgICAgICAgICAge2l0ZW0uYmFkZ2V9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L25hdj5cblxuICAgICAgICAgIHsvKiBDb21wYWN0IFRhYmxldCBOYXZpZ2F0aW9uICovfVxuICAgICAgICAgIDxuYXYgY2xhc3NOYW1lPVwiaGlkZGVuIG1kOmZsZXggeGw6aGlkZGVuIGl0ZW1zLWNlbnRlciBzcGFjZS14LTFcIj5cbiAgICAgICAgICAgIHtuYXZJdGVtcy5zbGljZSgwLCA2KS5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IEljb24gPSBpdGVtLmljb247XG4gICAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gYWN0aXZlVGFiID09PSBpdGVtLmlkO1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGtleT17aXRlbS5pZH1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYihpdGVtLmlkKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGJ0bi1nbG9zc3kgZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0xIHB4LTIgcHktMS41IHRleHQteHMgZm9udC1zZW1pYm9sZCAke1xuICAgICAgICAgICAgICAgICAgICBpc0FjdGl2ZSA/ICdidG4tZ2xvc3N5LXB1cnBsZSBpcy1hY3RpdmUnIDogJ2JnLXNsYXRlLTkwMCB0ZXh0LXNsYXRlLTMwMCBob3ZlcjpiZy1zbGF0ZS04MDAnXG4gICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8SWNvbiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj57aXRlbS5sYWJlbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L25hdj5cblxuICAgICAgICAgIHsvKiBSaWdodCBTaWRlOiBUaGVtZSAmIEFjdGlvbiBCdXR0b25zICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yXCI+XG4gICAgICAgICAgICB7LyogVGhlbWUgc3dpdGNoZXIgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhpZGRlbiBzbTpmbGV4IGl0ZW1zLWNlbnRlciBiZy1zbGF0ZS05NTAgcC0wLjUgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LVsxMXB4XVwiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0VGhlbWUoJ2N5YmVyJyl9XG4gICAgICAgICAgICAgICAgdGl0bGU9XCJNb3R5dyBDeWJlciBNYXRyaXhcIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGJ0bi1nbG9zc3kgcHgtMiBweS0wLjUgcm91bmRlZC1tZCBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWNvbG9ycyAke1xuICAgICAgICAgICAgICAgICAgdGhlbWUgPT09ICdjeWJlcicgPyAnYnRuLWdsb3NzeS1wdXJwbGUgdGV4dC13aGl0ZScgOiAndGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSdcbiAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIEN5YmVyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0VGhlbWUoJ3RhY3RpY2FsJyl9XG4gICAgICAgICAgICAgICAgdGl0bGU9XCJNb3R5dyBUYWN0aWNhbCBSZWRcIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGJ0bi1nbG9zc3kgcHgtMiBweS0wLjUgcm91bmRlZC1tZCBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWNvbG9ycyAke1xuICAgICAgICAgICAgICAgICAgdGhlbWUgPT09ICd0YWN0aWNhbCcgPyAnYnRuLWdsb3NzeS1yZWQgdGV4dC13aGl0ZScgOiAndGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSdcbiAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIFRhY3RpY2FsXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBPZmZsaW5lIEJ1bmRsZSBEb3dubG9hZCAqL31cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17ZG93bmxvYWRGdWxsT2ZmbGluZUJ1bmRsZX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuLWdsb3NzeSBidG4tZ2xvc3N5LWVtZXJhbGQgaGlkZGVuIHNtOmZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgcHgtMyBweS0xLjUgdGV4dC14cyBmb250LWJvbGRcIlxuICAgICAgICAgICAgICB0aXRsZT1cIlBvYmllcnogcGFraWV0IGF3YXJ5am55IC5iYXQgKyAucHlcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8RG93bmxvYWQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1lbWVyYWxkLTIwMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPlBha2lldCAuemlwPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgIHsvKiBNb2JpbGUgTWVudSBUb2dnbGUgQnV0dG9uICovfVxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRNb2JpbGVNZW51T3BlbighbW9iaWxlTWVudU9wZW4pfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ4bDpoaWRkZW4gcC0yIHJvdW5kZWQtbGcgYmctc2xhdGUtODAwIHRleHQtc2xhdGUtMzAwIGhvdmVyOnRleHQtd2hpdGUgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiVG9nZ2xlIG1lbnVcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7bW9iaWxlTWVudU9wZW4gPyA8WCBjbGFzc05hbWU9XCJ3LTUgaC01XCIgLz4gOiA8TWVudSBjbGFzc05hbWU9XCJ3LTUgaC01XCIgLz59XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIE1vYmlsZSBEcmF3ZXIgTWVudSAqL31cbiAgICAgIHttb2JpbGVNZW51T3BlbiAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwieGw6aGlkZGVuIGJnLXNsYXRlLTk1MC85OCBib3JkZXItYiBib3JkZXItc2xhdGUtODAwIHB4LTQgcHktMyBzcGFjZS15LTFcIj5cbiAgICAgICAgICB7bmF2SXRlbXMubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgY29uc3QgSWNvbiA9IGl0ZW0uaWNvbjtcbiAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gYWN0aXZlVGFiID09PSBpdGVtLmlkO1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGtleT17aXRlbS5pZH1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBzZXRBY3RpdmVUYWIoaXRlbS5pZCk7XG4gICAgICAgICAgICAgICAgICBzZXRNb2JpbGVNZW51T3BlbihmYWxzZSk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LWZ1bGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHB4LTMgcHktMiByb3VuZGVkLWxnIHRleHQteHMgZm9udC1zZW1pYm9sZCAke1xuICAgICAgICAgICAgICAgICAgaXNBY3RpdmUgPyAnYmctcHVycGxlLTYwMCB0ZXh0LXdoaXRlJyA6ICd0ZXh0LXNsYXRlLTMwMCBob3ZlcjpiZy1zbGF0ZS04MDAnXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMlwiPlxuICAgICAgICAgICAgICAgICAgPEljb24gY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj57aXRlbS5sYWJlbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAge2l0ZW0uYmFkZ2UgJiYgKFxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIHB4LTEuNSBweS0wLjUgcm91bmRlZCBiZy1ibGFjay81MCB0ZXh0LXB1cnBsZS0yMDBcIj5cbiAgICAgICAgICAgICAgICAgICAge2l0ZW0uYmFkZ2V9XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgPC9oZWFkZXI+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUFvRGM7QUFwRGQsU0FBZ0IsZ0JBQWdCO0FBQ2hDO0FBQUEsRUFDRTtBQUFBLEVBQWE7QUFBQSxFQUFVO0FBQUEsRUFBVTtBQUFBLEVBQUs7QUFBQSxFQUFVO0FBQUEsRUFDaEQ7QUFBQSxFQUFtQjtBQUFBLEVBQVU7QUFBQSxFQUFPO0FBQUEsRUFBVztBQUFBLEVBQVE7QUFBQSxFQUFNO0FBQUEsRUFBNEI7QUFBQSxFQUFPO0FBQUEsRUFBSztBQUFBLEVBQUs7QUFBQSxPQUNyRztBQUVQLFNBQVMsaUNBQWlDO0FBYW5DLGFBQU0sU0FBZ0MsQ0FBQztBQUFBLEVBQzVDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQUFNO0FBQ0osUUFBTSxDQUFDLGdCQUFnQixpQkFBaUIsSUFBSSxTQUFTLEtBQUs7QUFFMUQsUUFBTSxXQUFXO0FBQUEsSUFDZixFQUFFLElBQUksWUFBdUIsT0FBTyxhQUFhLE1BQU0sV0FBVyxPQUFPLFlBQVksV0FBVyxLQUFLO0FBQUEsSUFDckcsRUFBRSxJQUFJLFNBQW9CLE9BQU8sZ0JBQWdCLE1BQU0sT0FBTyxPQUFPLGVBQWUsV0FBVyxLQUFLO0FBQUEsSUFDcEcsRUFBRSxJQUFJLFVBQXFCLE9BQU8sY0FBYyxNQUFNLEtBQUssT0FBTyxZQUFZLFdBQVcsS0FBSztBQUFBLElBQzlGLEVBQUUsSUFBSSxhQUF3QixPQUFPLG9CQUFvQixNQUFNLEtBQUssT0FBTyxrQkFBa0IsV0FBVyxLQUFLO0FBQUEsSUFDN0csRUFBRSxJQUFJLFVBQXFCLE9BQU8sZ0JBQWdCLE1BQU0sV0FBVyxPQUFPLFVBQVU7QUFBQSxJQUNwRixFQUFFLElBQUksV0FBc0IsT0FBTyxhQUFhLE1BQU0sT0FBTyxPQUFPLGFBQWE7QUFBQSxJQUNqRixFQUFFLElBQUksV0FBc0IsT0FBTyxlQUFlLE1BQU0sUUFBUSxPQUFPLFVBQVU7QUFBQSxJQUNqRixFQUFFLElBQUksV0FBc0IsT0FBTyxXQUFXLE1BQU0sVUFBVSxPQUFPLEtBQUs7QUFBQSxJQUMxRSxFQUFFLElBQUksYUFBd0IsT0FBTyx3QkFBd0IsTUFBTSxLQUFLLE9BQU8sYUFBYTtBQUFBLElBQzVGLEVBQUUsSUFBSSxhQUF3QixPQUFPLGFBQWEsTUFBTSxlQUFlLE9BQU8sT0FBTztBQUFBLElBQ3JGLEVBQUUsSUFBSSxZQUF1QixPQUFPLFlBQVksTUFBTSxVQUFVLE9BQU8sVUFBVTtBQUFBLElBQ2pGLEVBQUUsSUFBSSxhQUF3QixPQUFPLFVBQVUsTUFBTSxVQUFVLE9BQU8sS0FBSztBQUFBLElBQzNFLEVBQUUsSUFBSSxNQUFpQixPQUFPLGVBQWUsTUFBTSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQzNFO0FBRUEsU0FDRSx1QkFBQyxZQUFPLFdBQVUsMEZBQ2hCO0FBQUEsMkJBQUMsU0FBSSxXQUFVLDBDQUNiLGlDQUFDLFNBQUksV0FBVSwwQ0FFYjtBQUFBLDZCQUFDLFNBQUksV0FBVSx5REFBd0QsU0FBUyxNQUFNLGFBQWEsU0FBUyxHQUMxRztBQUFBLCtCQUFDLFNBQUksV0FBVSxnSkFDYixpQ0FBQyxlQUFZLFdBQVUsc0NBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBMEQsS0FENUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUVBO0FBQUEsUUFDQSx1QkFBQyxTQUNDO0FBQUEsaUNBQUMsU0FBSSxXQUFVLGlDQUNiO0FBQUEsbUNBQUMsVUFBSyxXQUFVLDRIQUEySCx3Q0FBM0k7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFFQTtBQUFBLFlBQ0EsdUJBQUMsVUFBSyxXQUFVLG1KQUFrSixvQkFBbEs7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFFQTtBQUFBLGVBTkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFPQTtBQUFBLFVBQ0EsdUJBQUMsT0FBRSxXQUFVLDhDQUE2Qyx5RUFBMUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFFQTtBQUFBLGFBWEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQVlBO0FBQUEsV0FoQkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQWlCQTtBQUFBLE1BR0EsdUJBQUMsU0FBSSxXQUFVLHlDQUNaLG1CQUFTLElBQUksVUFBUTtBQUNwQixjQUFNLE9BQU8sS0FBSztBQUNsQixjQUFNLFdBQVcsY0FBYyxLQUFLO0FBRXBDLGVBQ0U7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUVDLFNBQVMsTUFBTSxhQUFhLEtBQUssRUFBRTtBQUFBLFlBQ25DLFdBQVcsNkZBQ1QsV0FDSSxLQUFLLFlBQ0gsZ0VBQ0EsK0RBQ0YsK0ZBQ047QUFBQSxZQUVBO0FBQUEscUNBQUMsUUFBSyxXQUFXLGVBQWUsS0FBSyxhQUFhLFdBQVcsa0NBQWtDLEVBQUUsTUFBakc7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBcUc7QUFBQSxjQUNyRyx1QkFBQyxVQUFNLGVBQUssU0FBWjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUFrQjtBQUFBLGNBQ2pCLEtBQUssU0FDSix1QkFBQyxVQUFLLFdBQVUsZ0dBQ2IsZUFBSyxTQURSO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBRUE7QUFBQTtBQUFBO0FBQUEsVUFmRyxLQUFLO0FBQUEsVUFEWjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBa0JBO0FBQUEsTUFFSixDQUFDLEtBMUJIO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUEyQkE7QUFBQSxNQUdBLHVCQUFDLFNBQUksV0FBVSxtREFDWixtQkFBUyxNQUFNLEdBQUcsQ0FBQyxFQUFFLElBQUksVUFBUTtBQUNoQyxjQUFNLE9BQU8sS0FBSztBQUNsQixjQUFNLFdBQVcsY0FBYyxLQUFLO0FBQ3BDLGVBQ0U7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUVDLFNBQVMsTUFBTSxhQUFhLEtBQUssRUFBRTtBQUFBLFlBQ25DLFdBQVcsNEVBQ1QsV0FBVyxnQ0FBZ0MsZ0RBQzdDO0FBQUEsWUFFQTtBQUFBLHFDQUFDLFFBQUssV0FBVSxpQkFBaEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBOEI7QUFBQSxjQUM5Qix1QkFBQyxVQUFNLGVBQUssU0FBWjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUFrQjtBQUFBO0FBQUE7QUFBQSxVQVBiLEtBQUs7QUFBQSxVQURaO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFTQTtBQUFBLE1BRUosQ0FBQyxLQWhCSDtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBaUJBO0FBQUEsTUFHQSx1QkFBQyxTQUFJLFdBQVUsK0JBRWI7QUFBQSwrQkFBQyxTQUFJLFdBQVUsaUdBQ2I7QUFBQTtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsU0FBUyxNQUFNLFNBQVMsT0FBTztBQUFBLGNBQy9CLE9BQU07QUFBQSxjQUNOLFdBQVcsbUVBQ1QsVUFBVSxVQUFVLGlDQUFpQyxpQ0FDdkQ7QUFBQSxjQUNEO0FBQUE7QUFBQSxZQU5EO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQVFBO0FBQUEsVUFDQTtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsU0FBUyxNQUFNLFNBQVMsVUFBVTtBQUFBLGNBQ2xDLE9BQU07QUFBQSxjQUNOLFdBQVcsbUVBQ1QsVUFBVSxhQUFhLDhCQUE4QixpQ0FDdkQ7QUFBQSxjQUNEO0FBQUE7QUFBQSxZQU5EO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQVFBO0FBQUEsYUFsQkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQW1CQTtBQUFBLFFBR0E7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUNDLFNBQVM7QUFBQSxZQUNULFdBQVU7QUFBQSxZQUNWLE9BQU07QUFBQSxZQUVOO0FBQUEscUNBQUMsWUFBUyxXQUFVLGtDQUFwQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUFtRDtBQUFBLGNBQ25ELHVCQUFDLFVBQUssMkJBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBaUI7QUFBQTtBQUFBO0FBQUEsVUFObkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBT0E7QUFBQSxRQUdBO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFDQyxTQUFTLE1BQU0sa0JBQWtCLENBQUMsY0FBYztBQUFBLFlBQ2hELFdBQVU7QUFBQSxZQUNWLGNBQVc7QUFBQSxZQUVWLDJCQUFpQix1QkFBQyxLQUFFLFdBQVUsYUFBYjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUF1QixJQUFLLHVCQUFDLFFBQUssV0FBVSxhQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUEwQjtBQUFBO0FBQUEsVUFMMUU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBTUE7QUFBQSxXQXhDRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBeUNBO0FBQUEsU0FqSEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQWtIQSxLQW5IRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBb0hBO0FBQUEsSUFHQyxrQkFDQyx1QkFBQyxTQUFJLFdBQVUsMkVBQ1osbUJBQVMsSUFBSSxVQUFRO0FBQ3BCLFlBQU0sT0FBTyxLQUFLO0FBQ2xCLFlBQU0sV0FBVyxjQUFjLEtBQUs7QUFDcEMsYUFDRTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBRUMsU0FBUyxNQUFNO0FBQ2IseUJBQWEsS0FBSyxFQUFFO0FBQ3BCLDhCQUFrQixLQUFLO0FBQUEsVUFDekI7QUFBQSxVQUNBLFdBQVcsdUZBQ1QsV0FBVyw2QkFBNkIsbUNBQzFDO0FBQUEsVUFFQTtBQUFBLG1DQUFDLFNBQUksV0FBVSwrQkFDYjtBQUFBLHFDQUFDLFFBQUssV0FBVSxhQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUEwQjtBQUFBLGNBQzFCLHVCQUFDLFVBQU0sZUFBSyxTQUFaO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQWtCO0FBQUEsaUJBRnBCO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBR0E7QUFBQSxZQUNDLEtBQUssU0FDSix1QkFBQyxVQUFLLFdBQVUsMkVBQ2IsZUFBSyxTQURSO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRUE7QUFBQTtBQUFBO0FBQUEsUUFoQkcsS0FBSztBQUFBLFFBRFo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQW1CQTtBQUFBLElBRUosQ0FBQyxLQTFCSDtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBMkJBO0FBQUEsT0FwSko7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQXNKQTtBQUVKOyIsIm5hbWVzIjpbXX0=