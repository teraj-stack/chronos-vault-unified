import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"];
import {
  Terminal,
  Sparkles,
  Cpu,
  BookOpen,
  AlertTriangle,
  AlertOctagon,
  Activity,
  Skull,
  Crosshair,
  Wrench,
  Menu,
  X,
  ShieldCheck,
  Radio,
  Zap,
  HardDrive,
  Smartphone,
  Shield,
  Lock,
  Flame,
  Disc
} from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import { downloadCompleteOfflineStandaloneBundle } from "/sentinel-shield/src/utils/offlineStandaloneEnvironment.ts";
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
    { id: "loading", label: "Tarcza Laserowa", icon: Zap, badge: "Main", highlight: true },
    { id: "holotable", label: "Stół Hologramowy", icon: Disc, badge: "War Room", highlight: true },
    { id: "mobile", label: "Desant G.R.O.M.", icon: Smartphone, badge: "20s Akcja", highlight: true },
    { id: "immunization", label: "Immunizacja", icon: ShieldCheck, badge: "GPO/IFEO", highlight: true },
    { id: "stresstest", label: "Stress Test", icon: Flame, badge: "Panic Verify", highlight: true },
    { id: "pci", label: "Fale EM & Móżdżek", icon: Activity, badge: "Rezonans", highlight: true },
    { id: "freezeall", label: "Freeze-All Wtyczka", icon: Lock, badge: "NtSuspend", highlight: true },
    { id: "panic", label: "Panic Button", icon: AlertOctagon, badge: "Freeze", highlight: true },
    { id: "barrier", label: "Bariera Laserowa", icon: ShieldCheck, badge: "Hex" },
    { id: "offline", label: "Zrzut Offline", icon: HardDrive, badge: "Standalone" },
    { id: "healing", label: "Autonaprawa", icon: Wrench, badge: null },
    { id: "radar", label: "Radar Monolitu", icon: Radio, badge: null },
    { id: "hunter", label: "Łowca Gemini", icon: Crosshair, badge: "AI" },
    { id: "threats", label: "Baza Gnid", icon: Skull, badge: null },
    { id: "scripts", label: "Skrypty", icon: Terminal, badge: null },
    { id: "generator", label: "Kreator .py", icon: Cpu, badge: null },
    { id: "simulator", label: "Symulator", icon: AlertTriangle, badge: null },
    { id: "watchdog", label: "Watchdog", icon: Activity, badge: null },
    { id: "forensics", label: "Wiedza", icon: BookOpen, badge: null },
    { id: "ai", label: "AI Asystent", icon: Sparkles, badge: null }
  ];
  return /* @__PURE__ */ jsxDEV("header", { className: "sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-xl border-b border-white/10 shadow-2xl", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-3 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between h-16", children: [
      /* @__PURE__ */ jsxDEV(
        "div",
        {
          className: "flex items-center space-x-3 cursor-pointer shrink-0 group",
          onClick: () => setActiveTab("loading"),
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: "w-10 h-10 rounded-xl bg-gradient-to-b from-zinc-800 to-zinc-950 border border-amber-500/30 flex items-center justify-center shadow-lg group-hover:border-amber-400/60 transition-all", children: /* @__PURE__ */ jsxDEV(Shield, { className: "w-5 h-5 text-amber-400 transition-transform group-hover:scale-105" }, void 0, false, {
              fileName: "/app/applet/src/components/Navbar.tsx",
              lineNumber: 63,
              columnNumber: 15
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/Navbar.tsx",
              lineNumber: 62,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "font-mono font-bold text-sm sm:text-base tracking-wider text-slate-100 uppercase", children: "SENTINEL SHIELD" }, void 0, false, {
                  fileName: "/app/applet/src/components/Navbar.tsx",
                  lineNumber: 67,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] uppercase font-mono font-medium px-2 py-0.5 rounded-full bg-zinc-900 text-amber-300 border border-amber-500/30 hidden sm:inline-block", children: "QUIET LUXURY • v2.4" }, void 0, false, {
                  fileName: "/app/applet/src/components/Navbar.tsx",
                  lineNumber: 70,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 66,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-slate-400 font-sans hidden md:block", children: "Tarcza Heksagonalna • Łowca Gemini AI • Precyzyjna Eksterminacja" }, void 0, false, {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 74,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/Navbar.tsx",
              lineNumber: 65,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/Navbar.tsx",
          lineNumber: 58,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV("nav", { className: "hidden xl:flex items-center space-x-1", children: navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab(item.id),
            className: `flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${isActive ? "bg-zinc-800 text-amber-300 border border-amber-500/40 shadow-lg" : "text-slate-400 hover:text-slate-100 hover:bg-zinc-900/80 border border-transparent"}`,
            children: [
              /* @__PURE__ */ jsxDEV(Icon, { className: `w-3.5 h-3.5 ${isActive ? "text-amber-400" : "text-slate-400"}` }, void 0, false, {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 96,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: item.label }, void 0, false, {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 97,
                columnNumber: 19
              }, this),
              item.badge && /* @__PURE__ */ jsxDEV("span", { className: `text-[8px] font-mono px-1.5 py-0.2 rounded-full border ${isActive ? "bg-amber-950/80 text-amber-300 border-amber-500/30" : "bg-zinc-900 text-slate-400 border-white/5"}`, children: item.badge }, void 0, false, {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 99,
                columnNumber: 21
              }, this)
            ]
          },
          item.id,
          true,
          {
            fileName: "/app/applet/src/components/Navbar.tsx",
            lineNumber: 87,
            columnNumber: 17
          },
          this
        );
      }) }, void 0, false, {
        fileName: "/app/applet/src/components/Navbar.tsx",
        lineNumber: 81,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("nav", { className: "hidden md:flex xl:hidden items-center space-x-1", children: navItems.slice(0, 5).map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab(item.id),
            className: `flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-xs font-mono font-medium ${isActive ? "bg-zinc-800 text-amber-300 border border-amber-500/40" : "text-slate-400 hover:bg-zinc-900"}`,
            children: [
              /* @__PURE__ */ jsxDEV(Icon, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 123,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: item.label }, void 0, false, {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 124,
                columnNumber: 19
              }, this)
            ]
          },
          item.id,
          true,
          {
            fileName: "/app/applet/src/components/Navbar.tsx",
            lineNumber: 116,
            columnNumber: 17
          },
          this
        );
      }) }, void 0, false, {
        fileName: "/app/applet/src/components/Navbar.tsx",
        lineNumber: 111,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2.5", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: downloadCompleteOfflineStandaloneBundle,
            className: "hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-slate-300 hover:text-white text-xs font-mono font-medium cursor-pointer shadow-md transition-all",
            title: "Pobierz kompletny pakiet samootwierający się offline",
            children: [
              /* @__PURE__ */ jsxDEV(HardDrive, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 138,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Zrzut Offline" }, void 0, false, {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 139,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/Navbar.tsx",
            lineNumber: 133,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setMobileMenuOpen(!mobileMenuOpen),
            className: "xl:hidden p-2 rounded-xl bg-zinc-900 text-slate-300 hover:text-white border border-white/10 cursor-pointer",
            "aria-label": "Toggle menu",
            children: mobileMenuOpen ? /* @__PURE__ */ jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
              fileName: "/app/applet/src/components/Navbar.tsx",
              lineNumber: 148,
              columnNumber: 33
            }, this) : /* @__PURE__ */ jsxDEV(Menu, { className: "w-5 h-5" }, void 0, false, {
              fileName: "/app/applet/src/components/Navbar.tsx",
              lineNumber: 148,
              columnNumber: 61
            }, this)
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/Navbar.tsx",
            lineNumber: 143,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/Navbar.tsx",
        lineNumber: 131,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/Navbar.tsx",
      lineNumber: 56,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/Navbar.tsx",
      lineNumber: 55,
      columnNumber: 7
    }, this),
    mobileMenuOpen && /* @__PURE__ */ jsxDEV("div", { className: "xl:hidden bg-zinc-950/98 border-b border-white/10 px-4 py-3 space-y-1 backdrop-blur-xl", children: navItems.map((item) => {
      const Icon = item.icon;
      const isActive = activeTab === item.id;
      return /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => {
            setActiveTab(item.id);
            setMobileMenuOpen(false);
          },
          className: `w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono font-medium ${isActive ? "bg-zinc-800 text-amber-300 border border-amber-500/40" : "text-slate-400 hover:bg-zinc-900"}`,
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2.5", children: [
              /* @__PURE__ */ jsxDEV(Icon, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 172,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: item.label }, void 0, false, {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 173,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/Navbar.tsx",
              lineNumber: 171,
              columnNumber: 17
            }, this),
            item.badge && /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] font-mono px-2 py-0.5 rounded-full bg-zinc-900 text-amber-300 border border-amber-500/30", children: item.badge }, void 0, false, {
              fileName: "/app/applet/src/components/Navbar.tsx",
              lineNumber: 176,
              columnNumber: 19
            }, this)
          ]
        },
        item.id,
        true,
        {
          fileName: "/app/applet/src/components/Navbar.tsx",
          lineNumber: 161,
          columnNumber: 15
        },
        this
      );
    }) }, void 0, false, {
      fileName: "/app/applet/src/components/Navbar.tsx",
      lineNumber: 156,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/Navbar.tsx",
    lineNumber: 54,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk5hdmJhci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgXG4gIFNoaWVsZEFsZXJ0LCBUZXJtaW5hbCwgU3BhcmtsZXMsIENwdSwgQm9va09wZW4sIEFsZXJ0VHJpYW5nbGUsIEFsZXJ0T2N0YWdvbixcbiAgRG93bmxvYWQsIFBhbGV0dGUsIEFjdGl2aXR5LCBTa3VsbCwgQ3Jvc3NoYWlyLCBXcmVuY2gsIE1lbnUsIFgsIFNoaWVsZENoZWNrLCBIZWFydFB1bHNlLCBSYWRpbywgWmFwLCBIYXJkRHJpdmUsIFNtYXJ0cGhvbmUsIFNoaWVsZCwgTG9jaywgRmxhbWUsIERpc2Ncbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IE9TVHlwZSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGRvd25sb2FkQ29tcGxldGVPZmZsaW5lU3RhbmRhbG9uZUJ1bmRsZSB9IGZyb20gJy4uL3V0aWxzL29mZmxpbmVTdGFuZGFsb25lRW52aXJvbm1lbnQnO1xuXG5leHBvcnQgdHlwZSBUYWJUeXBlID0gJ2xvYWRpbmcnIHwgJ2hvbG90YWJsZScgfCAnc3RyZXNzdGVzdCcgfCAnaW1tdW5pemF0aW9uJyB8ICdmcmVlemVhbGwnIHwgJ3BjaScgfCAnbW9iaWxlJyB8ICdwYW5pYycgfCAnYmFycmllcicgfCAnb2ZmbGluZScgfCAncmFkYXInIHwgJ2h1bnRlcicgfCAndGhyZWF0cycgfCAnaGVhbGluZycgfCAnc2NyaXB0cycgfCAnZ2VuZXJhdG9yJyB8ICdzaW11bGF0b3InIHwgJ3dhdGNoZG9nJyB8ICdmb3JlbnNpY3MnIHwgJ2FpJztcblxuaW50ZXJmYWNlIE5hdmJhclByb3BzIHtcbiAgYWN0aXZlVGFiOiBUYWJUeXBlO1xuICBzZXRBY3RpdmVUYWI6ICh0YWI6IFRhYlR5cGUpID0+IHZvaWQ7XG4gIHNlbGVjdGVkT1M6IE9TVHlwZTtcbiAgc2V0U2VsZWN0ZWRPUzogKG9zOiBPU1R5cGUpID0+IHZvaWQ7XG4gIHRoZW1lOiAnY3liZXInIHwgJ3N0ZWFsdGgnIHwgJ3RhY3RpY2FsJztcbiAgc2V0VGhlbWU6ICh0aGVtZTogJ2N5YmVyJyB8ICdzdGVhbHRoJyB8ICd0YWN0aWNhbCcpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBjb25zdCBOYXZiYXI6IFJlYWN0LkZDPE5hdmJhclByb3BzPiA9ICh7XG4gIGFjdGl2ZVRhYixcbiAgc2V0QWN0aXZlVGFiLFxuICBzZWxlY3RlZE9TLFxuICBzZXRTZWxlY3RlZE9TLFxuICB0aGVtZSxcbiAgc2V0VGhlbWUsXG59KSA9PiB7XG4gIGNvbnN0IFttb2JpbGVNZW51T3Blbiwgc2V0TW9iaWxlTWVudU9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IG5hdkl0ZW1zID0gW1xuICAgIHsgaWQ6ICdsb2FkaW5nJyBhcyBUYWJUeXBlLCBsYWJlbDogJ1RhcmN6YSBMYXNlcm93YScsIGljb246IFphcCwgYmFkZ2U6ICdNYWluJywgaGlnaGxpZ2h0OiB0cnVlIH0sXG4gICAgeyBpZDogJ2hvbG90YWJsZScgYXMgVGFiVHlwZSwgbGFiZWw6ICdTdMOzxYIgSG9sb2dyYW1vd3knLCBpY29uOiBEaXNjLCBiYWRnZTogJ1dhciBSb29tJywgaGlnaGxpZ2h0OiB0cnVlIH0sXG4gICAgeyBpZDogJ21vYmlsZScgYXMgVGFiVHlwZSwgbGFiZWw6ICdEZXNhbnQgRy5SLk8uTS4nLCBpY29uOiBTbWFydHBob25lLCBiYWRnZTogJzIwcyBBa2NqYScsIGhpZ2hsaWdodDogdHJ1ZSB9LFxuICAgIHsgaWQ6ICdpbW11bml6YXRpb24nIGFzIFRhYlR5cGUsIGxhYmVsOiAnSW1tdW5pemFjamEnLCBpY29uOiBTaGllbGRDaGVjaywgYmFkZ2U6ICdHUE8vSUZFTycsIGhpZ2hsaWdodDogdHJ1ZSB9LFxuICAgIHsgaWQ6ICdzdHJlc3N0ZXN0JyBhcyBUYWJUeXBlLCBsYWJlbDogJ1N0cmVzcyBUZXN0JywgaWNvbjogRmxhbWUsIGJhZGdlOiAnUGFuaWMgVmVyaWZ5JywgaGlnaGxpZ2h0OiB0cnVlIH0sXG4gICAgeyBpZDogJ3BjaScgYXMgVGFiVHlwZSwgbGFiZWw6ICdGYWxlIEVNICYgTcOzxbxkxbxlaycsIGljb246IEFjdGl2aXR5LCBiYWRnZTogJ1Jlem9uYW5zJywgaGlnaGxpZ2h0OiB0cnVlIH0sXG4gICAgeyBpZDogJ2ZyZWV6ZWFsbCcgYXMgVGFiVHlwZSwgbGFiZWw6ICdGcmVlemUtQWxsIFd0eWN6a2EnLCBpY29uOiBMb2NrLCBiYWRnZTogJ050U3VzcGVuZCcsIGhpZ2hsaWdodDogdHJ1ZSB9LFxuICAgIHsgaWQ6ICdwYW5pYycgYXMgVGFiVHlwZSwgbGFiZWw6ICdQYW5pYyBCdXR0b24nLCBpY29uOiBBbGVydE9jdGFnb24sIGJhZGdlOiAnRnJlZXplJywgaGlnaGxpZ2h0OiB0cnVlIH0sXG4gICAgeyBpZDogJ2JhcnJpZXInIGFzIFRhYlR5cGUsIGxhYmVsOiAnQmFyaWVyYSBMYXNlcm93YScsIGljb246IFNoaWVsZENoZWNrLCBiYWRnZTogJ0hleCcgfSxcbiAgICB7IGlkOiAnb2ZmbGluZScgYXMgVGFiVHlwZSwgbGFiZWw6ICdacnp1dCBPZmZsaW5lJywgaWNvbjogSGFyZERyaXZlLCBiYWRnZTogJ1N0YW5kYWxvbmUnIH0sXG4gICAgeyBpZDogJ2hlYWxpbmcnIGFzIFRhYlR5cGUsIGxhYmVsOiAnQXV0b25hcHJhd2EnLCBpY29uOiBXcmVuY2gsIGJhZGdlOiBudWxsIH0sXG4gICAgeyBpZDogJ3JhZGFyJyBhcyBUYWJUeXBlLCBsYWJlbDogJ1JhZGFyIE1vbm9saXR1JywgaWNvbjogUmFkaW8sIGJhZGdlOiBudWxsIH0sXG4gICAgeyBpZDogJ2h1bnRlcicgYXMgVGFiVHlwZSwgbGFiZWw6ICfFgW93Y2EgR2VtaW5pJywgaWNvbjogQ3Jvc3NoYWlyLCBiYWRnZTogJ0FJJyB9LFxuICAgIHsgaWQ6ICd0aHJlYXRzJyBhcyBUYWJUeXBlLCBsYWJlbDogJ0JhemEgR25pZCcsIGljb246IFNrdWxsLCBiYWRnZTogbnVsbCB9LFxuICAgIHsgaWQ6ICdzY3JpcHRzJyBhcyBUYWJUeXBlLCBsYWJlbDogJ1NrcnlwdHknLCBpY29uOiBUZXJtaW5hbCwgYmFkZ2U6IG51bGwgfSxcbiAgICB7IGlkOiAnZ2VuZXJhdG9yJyBhcyBUYWJUeXBlLCBsYWJlbDogJ0tyZWF0b3IgLnB5JywgaWNvbjogQ3B1LCBiYWRnZTogbnVsbCB9LFxuICAgIHsgaWQ6ICdzaW11bGF0b3InIGFzIFRhYlR5cGUsIGxhYmVsOiAnU3ltdWxhdG9yJywgaWNvbjogQWxlcnRUcmlhbmdsZSwgYmFkZ2U6IG51bGwgfSxcbiAgICB7IGlkOiAnd2F0Y2hkb2cnIGFzIFRhYlR5cGUsIGxhYmVsOiAnV2F0Y2hkb2cnLCBpY29uOiBBY3Rpdml0eSwgYmFkZ2U6IG51bGwgfSxcbiAgICB7IGlkOiAnZm9yZW5zaWNzJyBhcyBUYWJUeXBlLCBsYWJlbDogJ1dpZWR6YScsIGljb246IEJvb2tPcGVuLCBiYWRnZTogbnVsbCB9LFxuICAgIHsgaWQ6ICdhaScgYXMgVGFiVHlwZSwgbGFiZWw6ICdBSSBBc3lzdGVudCcsIGljb246IFNwYXJrbGVzLCBiYWRnZTogbnVsbCB9LFxuICBdO1xuXG4gIHJldHVybiAoXG4gICAgPGhlYWRlciBjbGFzc05hbWU9XCJzdGlja3kgdG9wLTAgei00MCBiZy16aW5jLTk1MC85MCBiYWNrZHJvcC1ibHVyLXhsIGJvcmRlci1iIGJvcmRlci13aGl0ZS8xMCBzaGFkb3ctMnhsXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC13LTd4bCBteC1hdXRvIHB4LTMgc206cHgtNiBsZzpweC04XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGgtMTZcIj5cbiAgICAgICAgICB7LyogTG9nbyAvIEJyYW5kIChRdWlldCBMdXh1cnkpICovfVxuICAgICAgICAgIDxkaXYgXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTMgY3Vyc29yLXBvaW50ZXIgc2hyaW5rLTAgZ3JvdXBcIiBcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYignbG9hZGluZycpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xMCBoLTEwIHJvdW5kZWQteGwgYmctZ3JhZGllbnQtdG8tYiBmcm9tLXppbmMtODAwIHRvLXppbmMtOTUwIGJvcmRlciBib3JkZXItYW1iZXItNTAwLzMwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHNoYWRvdy1sZyBncm91cC1ob3Zlcjpib3JkZXItYW1iZXItNDAwLzYwIHRyYW5zaXRpb24tYWxsXCI+XG4gICAgICAgICAgICAgIDxTaGllbGQgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LWFtYmVyLTQwMCB0cmFuc2l0aW9uLXRyYW5zZm9ybSBncm91cC1ob3ZlcjpzY2FsZS0xMDVcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMlwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyBmb250LWJvbGQgdGV4dC1zbSBzbTp0ZXh0LWJhc2UgdHJhY2tpbmctd2lkZXIgdGV4dC1zbGF0ZS0xMDAgdXBwZXJjYXNlXCI+XG4gICAgICAgICAgICAgICAgICBTRU5USU5FTCBTSElFTERcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB1cHBlcmNhc2UgZm9udC1tb25vIGZvbnQtbWVkaXVtIHB4LTIgcHktMC41IHJvdW5kZWQtZnVsbCBiZy16aW5jLTkwMCB0ZXh0LWFtYmVyLTMwMCBib3JkZXIgYm9yZGVyLWFtYmVyLTUwMC8zMCBoaWRkZW4gc206aW5saW5lLWJsb2NrXCI+XG4gICAgICAgICAgICAgICAgICBRVUlFVCBMVVhVUlkg4oCiIHYyLjRcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCBmb250LXNhbnMgaGlkZGVuIG1kOmJsb2NrXCI+XG4gICAgICAgICAgICAgICAgVGFyY3phIEhla3NhZ29uYWxuYSDigKIgxYFvd2NhIEdlbWluaSBBSSDigKIgUHJlY3l6eWpuYSBFa3N0ZXJtaW5hY2phXG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIERlc2t0b3AgTmF2aWdhdGlvbiBUYWJzICovfVxuICAgICAgICAgIDxuYXYgY2xhc3NOYW1lPVwiaGlkZGVuIHhsOmZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMVwiPlxuICAgICAgICAgICAge25hdkl0ZW1zLm1hcChpdGVtID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgSWNvbiA9IGl0ZW0uaWNvbjtcbiAgICAgICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBhY3RpdmVUYWIgPT09IGl0ZW0uaWQ7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBrZXk9e2l0ZW0uaWR9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUYWIoaXRlbS5pZCl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTEgcHgtMi41IHB5LTEuNSByb3VuZGVkLXhsIHRleHQteHMgZm9udC1tb25vIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgICAgICAgIGlzQWN0aXZlXG4gICAgICAgICAgICAgICAgICAgICAgPyAnYmctemluYy04MDAgdGV4dC1hbWJlci0zMDAgYm9yZGVyIGJvcmRlci1hbWJlci01MDAvNDAgc2hhZG93LWxnJ1xuICAgICAgICAgICAgICAgICAgICAgIDogJ3RleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtc2xhdGUtMTAwIGhvdmVyOmJnLXppbmMtOTAwLzgwIGJvcmRlciBib3JkZXItdHJhbnNwYXJlbnQnXG4gICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8SWNvbiBjbGFzc05hbWU9e2B3LTMuNSBoLTMuNSAke2lzQWN0aXZlID8gJ3RleHQtYW1iZXItNDAwJyA6ICd0ZXh0LXNsYXRlLTQwMCd9YH0gLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPntpdGVtLmxhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIHtpdGVtLmJhZGdlICYmIChcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgdGV4dC1bOHB4XSBmb250LW1vbm8gcHgtMS41IHB5LTAuMiByb3VuZGVkLWZ1bGwgYm9yZGVyICR7XG4gICAgICAgICAgICAgICAgICAgICAgaXNBY3RpdmUgPyAnYmctYW1iZXItOTUwLzgwIHRleHQtYW1iZXItMzAwIGJvcmRlci1hbWJlci01MDAvMzAnIDogJ2JnLXppbmMtOTAwIHRleHQtc2xhdGUtNDAwIGJvcmRlci13aGl0ZS81J1xuICAgICAgICAgICAgICAgICAgICB9YH0+XG4gICAgICAgICAgICAgICAgICAgICAge2l0ZW0uYmFkZ2V9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L25hdj5cblxuICAgICAgICAgIHsvKiBDb21wYWN0IFRhYmxldCBOYXZpZ2F0aW9uICovfVxuICAgICAgICAgIDxuYXYgY2xhc3NOYW1lPVwiaGlkZGVuIG1kOmZsZXggeGw6aGlkZGVuIGl0ZW1zLWNlbnRlciBzcGFjZS14LTFcIj5cbiAgICAgICAgICAgIHtuYXZJdGVtcy5zbGljZSgwLCA1KS5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IEljb24gPSBpdGVtLmljb247XG4gICAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gYWN0aXZlVGFiID09PSBpdGVtLmlkO1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGtleT17aXRlbS5pZH1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYihpdGVtLmlkKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMSBweC0yLjUgcHktMS41IHJvdW5kZWQteGwgdGV4dC14cyBmb250LW1vbm8gZm9udC1tZWRpdW0gJHtcbiAgICAgICAgICAgICAgICAgICAgaXNBY3RpdmUgPyAnYmctemluYy04MDAgdGV4dC1hbWJlci0zMDAgYm9yZGVyIGJvcmRlci1hbWJlci01MDAvNDAnIDogJ3RleHQtc2xhdGUtNDAwIGhvdmVyOmJnLXppbmMtOTAwJ1xuICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPEljb24gY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+e2l0ZW0ubGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9uYXY+XG5cbiAgICAgICAgICB7LyogUmlnaHQgU2lkZTogTHV4dXJ5IEFjdGlvbnMgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTIuNVwiPlxuICAgICAgICAgICAgey8qIE9mZmxpbmUgQnVuZGxlIERvd25sb2FkICovfVxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtkb3dubG9hZENvbXBsZXRlT2ZmbGluZVN0YW5kYWxvbmVCdW5kbGV9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhpZGRlbiBzbTpmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTMgcHktMS41IHJvdW5kZWQteGwgYmctemluYy05MDAgaG92ZXI6YmctemluYy04MDAgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCB0ZXh0LXNsYXRlLTMwMCBob3Zlcjp0ZXh0LXdoaXRlIHRleHQteHMgZm9udC1tb25vIGZvbnQtbWVkaXVtIGN1cnNvci1wb2ludGVyIHNoYWRvdy1tZCB0cmFuc2l0aW9uLWFsbFwiXG4gICAgICAgICAgICAgIHRpdGxlPVwiUG9iaWVyeiBrb21wbGV0bnkgcGFraWV0IHNhbW9vdHdpZXJhasSFY3kgc2nEmSBvZmZsaW5lXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPEhhcmREcml2ZSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWFtYmVyLTQwMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPlpyenV0IE9mZmxpbmU8L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgey8qIE1vYmlsZSBNZW51IFRvZ2dsZSBCdXR0b24gKi99XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldE1vYmlsZU1lbnVPcGVuKCFtb2JpbGVNZW51T3Blbil9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInhsOmhpZGRlbiBwLTIgcm91bmRlZC14bCBiZy16aW5jLTkwMCB0ZXh0LXNsYXRlLTMwMCBob3Zlcjp0ZXh0LXdoaXRlIGJvcmRlciBib3JkZXItd2hpdGUvMTAgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiVG9nZ2xlIG1lbnVcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7bW9iaWxlTWVudU9wZW4gPyA8WCBjbGFzc05hbWU9XCJ3LTUgaC01XCIgLz4gOiA8TWVudSBjbGFzc05hbWU9XCJ3LTUgaC01XCIgLz59XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIE1vYmlsZSBEcmF3ZXIgTWVudSAqL31cbiAgICAgIHttb2JpbGVNZW51T3BlbiAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwieGw6aGlkZGVuIGJnLXppbmMtOTUwLzk4IGJvcmRlci1iIGJvcmRlci13aGl0ZS8xMCBweC00IHB5LTMgc3BhY2UteS0xIGJhY2tkcm9wLWJsdXIteGxcIj5cbiAgICAgICAgICB7bmF2SXRlbXMubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgY29uc3QgSWNvbiA9IGl0ZW0uaWNvbjtcbiAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gYWN0aXZlVGFiID09PSBpdGVtLmlkO1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGtleT17aXRlbS5pZH1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBzZXRBY3RpdmVUYWIoaXRlbS5pZCk7XG4gICAgICAgICAgICAgICAgICBzZXRNb2JpbGVNZW51T3BlbihmYWxzZSk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LWZ1bGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHB4LTMgcHktMiByb3VuZGVkLXhsIHRleHQteHMgZm9udC1tb25vIGZvbnQtbWVkaXVtICR7XG4gICAgICAgICAgICAgICAgICBpc0FjdGl2ZSA/ICdiZy16aW5jLTgwMCB0ZXh0LWFtYmVyLTMwMCBib3JkZXIgYm9yZGVyLWFtYmVyLTUwMC80MCcgOiAndGV4dC1zbGF0ZS00MDAgaG92ZXI6YmctemluYy05MDAnXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMi41XCI+XG4gICAgICAgICAgICAgICAgICA8SWNvbiBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtYW1iZXItNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPntpdGVtLmxhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB7aXRlbS5iYWRnZSAmJiAoXG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIGZvbnQtbW9ubyBweC0yIHB5LTAuNSByb3VuZGVkLWZ1bGwgYmctemluYy05MDAgdGV4dC1hbWJlci0zMDAgYm9yZGVyIGJvcmRlci1hbWJlci01MDAvMzBcIj5cbiAgICAgICAgICAgICAgICAgICAge2l0ZW0uYmFkZ2V9XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgPC9oZWFkZXI+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUE4RGM7QUE5RGQsU0FBZ0IsZ0JBQWdCO0FBQ2hDO0FBQUEsRUFDZTtBQUFBLEVBQVU7QUFBQSxFQUFVO0FBQUEsRUFBSztBQUFBLEVBQVU7QUFBQSxFQUFlO0FBQUEsRUFDNUM7QUFBQSxFQUFVO0FBQUEsRUFBTztBQUFBLEVBQVc7QUFBQSxFQUFRO0FBQUEsRUFBTTtBQUFBLEVBQUc7QUFBQSxFQUF5QjtBQUFBLEVBQU87QUFBQSxFQUFLO0FBQUEsRUFBVztBQUFBLEVBQVk7QUFBQSxFQUFRO0FBQUEsRUFB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