import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-toolkit/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=019a4779"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-toolkit/node_modules/.vite/deps/react.js?v=019a4779"; const useState = __vite__cjsImport1_react["useState"];
import { motion, AnimatePresence } from "/sentinel-toolkit/node_modules/.vite/deps/framer-motion.js?v=a92be3d0";
import {
  Skull,
  Zap,
  Flame,
  RefreshCw,
  CheckCircle2
} from "/sentinel-toolkit/node_modules/.vite/deps/lucide-react.js?v=6cbc5a0a";
export const ActualizationGuardianBar = () => {
  const [shieldState, setShieldState] = useState({
    status: "ARMED",
    blockedGnidasCount: 14,
    lastInterceptedGnida: "gnida_updater_lock.exe",
    lastExecutionMode: "INSTANT_KILL",
    despairQuote: void 0,
    lastEventTime: "14:24:10"
  });
  const [isSimulating, setIsSimulating] = useState(false);
  const [logMessage, setLogMessage] = useState(null);
  const triggerActualizationDefense = async (simulateAttack = false, hookResistant = false) => {
    setIsSimulating(true);
    setShieldState((prev) => ({ ...prev, status: "SCANNING" }));
    try {
      const response = await fetch("/api/actualization-guard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          simulateAttack,
          hookResistant,
          targetGnida: hookResistant ? "gnida_rootkit_actualization_destroyer.exe" : "gnida_work_saboteur_overlay.exe"
        })
      });
      const data = await response.json();
      setShieldState({
        status: data.status,
        blockedGnidasCount: simulateAttack ? shieldState.blockedGnidasCount + 1 : shieldState.blockedGnidasCount,
        lastInterceptedGnida: data.gnidaName || shieldState.lastInterceptedGnida,
        lastExecutionMode: data.executionMode,
        despairQuote: data.despairQuote,
        lastEventTime: (/* @__PURE__ */ new Date()).toLocaleTimeString()
      });
      setLogMessage(data.actionTaken);
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("sentinel:actualization-safeguarded", {
            detail: { mode: data.executionMode, quote: data.despairQuote }
          })
        );
      }
    } catch {
      setShieldState((prev) => ({ ...prev, status: "ARMED" }));
      setLogMessage("Tarcza Aktualizacji zweryfikowała monolit w trybie lokalnym offline.");
    } finally {
      setIsSimulating(false);
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-red-950/90 via-slate-900 to-purple-950/90 border-y-2 border-red-500/80 px-4 py-2.5 shadow-xl relative overflow-hidden", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3 text-left", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 rounded-xl bg-gradient-to-br from-red-600 via-rose-600 to-pink-600 flex items-center justify-center shrink-0 border border-red-400 shadow-md shadow-red-950/60 animate-pulse", children: /* @__PURE__ */ jsxDEV(Skull, { className: "w-4 h-4 text-yellow-300" }, void 0, false, {
          fileName: "/app/applet/src/components/ActualizationGuardianBar.tsx",
          lineNumber: 76,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/ActualizationGuardianBar.tsx",
          lineNumber: 75,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "font-mono font-black text-red-300 uppercase tracking-wider bg-red-950/90 px-1.5 py-0.5 rounded border border-red-700/60 text-[10px]", children: "GŁÓWNA DYREKTYWA: OCHRONA AKTUALIZACJI" }, void 0, false, {
              fileName: "/app/applet/src/components/ActualizationGuardianBar.tsx",
              lineNumber: 81,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono text-emerald-400 font-bold", children: "TARCZA: AKTYWNA" }, void 0, false, {
              fileName: "/app/applet/src/components/ActualizationGuardianBar.tsx",
              lineNumber: 84,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ActualizationGuardianBar.tsx",
            lineNumber: 80,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "font-bold text-white text-xs sm:text-sm mt-0.5", children: [
            /* @__PURE__ */ jsxDEV("span", { children: "Jeżeli jakakolwiek gnida spróbuje zniszczyć aktualizację — " }, void 0, false, {
              fileName: "/app/applet/src/components/ActualizationGuardianBar.tsx",
              lineNumber: 89,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-red-400 font-black", children: "NATYCHMIAST JĄ ZABIĆ!" }, void 0, false, {
              fileName: "/app/applet/src/components/ActualizationGuardianBar.tsx",
              lineNumber: 90,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-300", children: " Jeżeli nie można — " }, void 0, false, {
              fileName: "/app/applet/src/components/ActualizationGuardianBar.tsx",
              lineNumber: 91,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-yellow-300 font-black", children: "GNIDA MUSI ZABIĆ SIĘ SAMA W ROZPACZY!" }, void 0, false, {
              fileName: "/app/applet/src/components/ActualizationGuardianBar.tsx",
              lineNumber: 92,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ActualizationGuardianBar.tsx",
            lineNumber: 88,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ActualizationGuardianBar.tsx",
          lineNumber: 79,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ActualizationGuardianBar.tsx",
        lineNumber: 74,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 flex-wrap justify-end gap-y-1", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => triggerActualizationDefense(false, false),
            disabled: isSimulating,
            className: "px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-mono font-bold text-[11px] flex items-center gap-1.5 cursor-pointer disabled:opacity-50",
            title: "Sprawdź integralność i zaktualizuj monolit pod tarczą",
            children: [
              /* @__PURE__ */ jsxDEV(RefreshCw, { className: `w-3.5 h-3.5 text-cyan-400 ${isSimulating ? "animate-spin" : ""}` }, void 0, false, {
                fileName: "/app/applet/src/components/ActualizationGuardianBar.tsx",
                lineNumber: 105,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Bezpieczna Aktualizacja" }, void 0, false, {
                fileName: "/app/applet/src/components/ActualizationGuardianBar.tsx",
                lineNumber: 106,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/ActualizationGuardianBar.tsx",
            lineNumber: 99,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => triggerActualizationDefense(true, false),
            disabled: isSimulating,
            className: "px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-700 to-rose-700 hover:from-red-600 hover:to-rose-600 text-white font-mono font-bold text-[11px] flex items-center gap-1.5 shadow-md shadow-red-950/60 border border-red-400/50 cursor-pointer active:scale-95 disabled:opacity-50",
            title: "Przetestuj próbę zniszczenia aktualizacji przez gnidę (Normalny Kill)",
            children: [
              /* @__PURE__ */ jsxDEV(Zap, { className: "w-3.5 h-3.5 text-yellow-300" }, void 0, false, {
                fileName: "/app/applet/src/components/ActualizationGuardianBar.tsx",
                lineNumber: 115,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Test: Zabij Gnidę Niszczącą Aktualizację" }, void 0, false, {
                fileName: "/app/applet/src/components/ActualizationGuardianBar.tsx",
                lineNumber: 116,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/ActualizationGuardianBar.tsx",
            lineNumber: 109,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => triggerActualizationDefense(true, true),
            disabled: isSimulating,
            className: "px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-700 via-pink-700 to-red-700 hover:from-purple-600 hover:to-red-600 text-white font-mono font-black text-[11px] flex items-center gap-1.5 shadow-lg shadow-purple-950/80 border border-purple-400/60 cursor-pointer animate-pulse active:scale-95 disabled:opacity-50",
            title: "Gdy gnida blokuje TerminateProcess -> wstrzyknięcie sygnału samobójczej rozpaczy (FastFail)",
            children: [
              /* @__PURE__ */ jsxDEV(Flame, { className: "w-3.5 h-3.5 text-yellow-300" }, void 0, false, {
                fileName: "/app/applet/src/components/ActualizationGuardianBar.tsx",
                lineNumber: 125,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Test: Wymuś Samobójczą Rozpacz Gnidy!" }, void 0, false, {
                fileName: "/app/applet/src/components/ActualizationGuardianBar.tsx",
                lineNumber: 126,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/ActualizationGuardianBar.tsx",
            lineNumber: 119,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ActualizationGuardianBar.tsx",
        lineNumber: 98,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ActualizationGuardianBar.tsx",
      lineNumber: 72,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(AnimatePresence, { children: logMessage && /* @__PURE__ */ jsxDEV(
      motion.div,
      {
        initial: { height: 0, opacity: 0 },
        animate: { height: "auto", opacity: 1 },
        exit: { height: 0, opacity: 0 },
        className: "max-w-7xl mx-auto mt-2 pt-2 border-t border-red-800/40 text-[11px] font-mono",
        children: /* @__PURE__ */ jsxDEV("div", { className: "bg-black/60 p-2 rounded-lg border border-red-700/60 text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-4 h-4 text-emerald-400 shrink-0" }, void 0, false, {
              fileName: "/app/applet/src/components/ActualizationGuardianBar.tsx",
              lineNumber: 142,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: logMessage }, void 0, false, {
              fileName: "/app/applet/src/components/ActualizationGuardianBar.tsx",
              lineNumber: 143,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ActualizationGuardianBar.tsx",
            lineNumber: 141,
            columnNumber: 15
          }, this),
          shieldState.despairQuote && /* @__PURE__ */ jsxDEV("div", { className: "text-red-300 italic font-bold shrink-0 bg-red-950/80 px-2 py-0.5 rounded border border-red-800", children: shieldState.despairQuote }, void 0, false, {
            fileName: "/app/applet/src/components/ActualizationGuardianBar.tsx",
            lineNumber: 146,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ActualizationGuardianBar.tsx",
          lineNumber: 140,
          columnNumber: 13
        }, this)
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/components/ActualizationGuardianBar.tsx",
        lineNumber: 134,
        columnNumber: 11
      },
      this
    ) }, void 0, false, {
      fileName: "/app/applet/src/components/ActualizationGuardianBar.tsx",
      lineNumber: 132,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/ActualizationGuardianBar.tsx",
    lineNumber: 71,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFjdHVhbGl6YXRpb25HdWFyZGlhbkJhci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBtb3Rpb24sIEFuaW1hdGVQcmVzZW5jZSB9IGZyb20gJ2ZyYW1lci1tb3Rpb24nO1xuaW1wb3J0IHsgXG4gIFNoaWVsZEFsZXJ0LCBTaGllbGRDaGVjaywgU2t1bGwsIFphcCwgRmxhbWUsIFJlZnJlc2hDdywgQWxlcnRUcmlhbmdsZSwgXG4gIENoZWNrQ2lyY2xlMiwgQXJyb3dSaWdodCwgUGxheSwgVGVybWluYWwsIExvY2tcbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IEFjdHVhbGl6YXRpb25TaGllbGRTdGF0ZSB9IGZyb20gJy4uL3R5cGVzJztcblxuZXhwb3J0IGNvbnN0IEFjdHVhbGl6YXRpb25HdWFyZGlhbkJhcjogUmVhY3QuRkMgPSAoKSA9PiB7XG4gIGNvbnN0IFtzaGllbGRTdGF0ZSwgc2V0U2hpZWxkU3RhdGVdID0gdXNlU3RhdGU8QWN0dWFsaXphdGlvblNoaWVsZFN0YXRlPih7XG4gICAgc3RhdHVzOiAnQVJNRUQnLFxuICAgIGJsb2NrZWRHbmlkYXNDb3VudDogMTQsXG4gICAgbGFzdEludGVyY2VwdGVkR25pZGE6ICdnbmlkYV91cGRhdGVyX2xvY2suZXhlJyxcbiAgICBsYXN0RXhlY3V0aW9uTW9kZTogJ0lOU1RBTlRfS0lMTCcsXG4gICAgZGVzcGFpclF1b3RlOiB1bmRlZmluZWQsXG4gICAgbGFzdEV2ZW50VGltZTogJzE0OjI0OjEwJyxcbiAgfSk7XG5cbiAgY29uc3QgW2lzU2ltdWxhdGluZywgc2V0SXNTaW11bGF0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2xvZ01lc3NhZ2UsIHNldExvZ01lc3NhZ2VdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3QgdHJpZ2dlckFjdHVhbGl6YXRpb25EZWZlbnNlID0gYXN5bmMgKHNpbXVsYXRlQXR0YWNrID0gZmFsc2UsIGhvb2tSZXNpc3RhbnQgPSBmYWxzZSkgPT4ge1xuICAgIHNldElzU2ltdWxhdGluZyh0cnVlKTtcbiAgICBzZXRTaGllbGRTdGF0ZSgocHJldikgPT4gKHsgLi4ucHJldiwgc3RhdHVzOiAnU0NBTk5JTkcnIH0pKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvYXBpL2FjdHVhbGl6YXRpb24tZ3VhcmQnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIHNpbXVsYXRlQXR0YWNrLFxuICAgICAgICAgIGhvb2tSZXNpc3RhbnQsXG4gICAgICAgICAgdGFyZ2V0R25pZGE6IGhvb2tSZXNpc3RhbnRcbiAgICAgICAgICAgID8gJ2duaWRhX3Jvb3RraXRfYWN0dWFsaXphdGlvbl9kZXN0cm95ZXIuZXhlJ1xuICAgICAgICAgICAgOiAnZ25pZGFfd29ya19zYWJvdGV1cl9vdmVybGF5LmV4ZScsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cbiAgICAgIHNldFNoaWVsZFN0YXRlKHtcbiAgICAgICAgc3RhdHVzOiBkYXRhLnN0YXR1cyxcbiAgICAgICAgYmxvY2tlZEduaWRhc0NvdW50OiBzaW11bGF0ZUF0dGFja1xuICAgICAgICAgID8gc2hpZWxkU3RhdGUuYmxvY2tlZEduaWRhc0NvdW50ICsgMVxuICAgICAgICAgIDogc2hpZWxkU3RhdGUuYmxvY2tlZEduaWRhc0NvdW50LFxuICAgICAgICBsYXN0SW50ZXJjZXB0ZWRHbmlkYTogZGF0YS5nbmlkYU5hbWUgfHwgc2hpZWxkU3RhdGUubGFzdEludGVyY2VwdGVkR25pZGEsXG4gICAgICAgIGxhc3RFeGVjdXRpb25Nb2RlOiBkYXRhLmV4ZWN1dGlvbk1vZGUsXG4gICAgICAgIGRlc3BhaXJRdW90ZTogZGF0YS5kZXNwYWlyUXVvdGUsXG4gICAgICAgIGxhc3RFdmVudFRpbWU6IG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCksXG4gICAgICB9KTtcblxuICAgICAgc2V0TG9nTWVzc2FnZShkYXRhLmFjdGlvblRha2VuKTtcblxuICAgICAgLy8gRGlzcGF0Y2ggZ2xvYmFsIGFjdHVhbGl6YXRpb24gZXZlbnQgc28gb3RoZXIgdGFicyByZWZyZXNoXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdzZW50aW5lbDphY3R1YWxpemF0aW9uLXNhZmVndWFyZGVkJywge1xuICAgICAgICAgICAgZGV0YWlsOiB7IG1vZGU6IGRhdGEuZXhlY3V0aW9uTW9kZSwgcXVvdGU6IGRhdGEuZGVzcGFpclF1b3RlIH0sXG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIHtcbiAgICAgIHNldFNoaWVsZFN0YXRlKChwcmV2KSA9PiAoeyAuLi5wcmV2LCBzdGF0dXM6ICdBUk1FRCcgfSkpO1xuICAgICAgc2V0TG9nTWVzc2FnZSgnVGFyY3phIEFrdHVhbGl6YWNqaSB6d2VyeWZpa293YcWCYSBtb25vbGl0IHcgdHJ5YmllIGxva2FsbnltIG9mZmxpbmUuJyk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldElzU2ltdWxhdGluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1yIGZyb20tcmVkLTk1MC85MCB2aWEtc2xhdGUtOTAwIHRvLXB1cnBsZS05NTAvOTAgYm9yZGVyLXktMiBib3JkZXItcmVkLTUwMC84MCBweC00IHB5LTIuNSBzaGFkb3cteGwgcmVsYXRpdmUgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC13LTd4bCBteC1hdXRvIGZsZXggZmxleC1jb2wgbWQ6ZmxleC1yb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMyB0ZXh0LXhzXCI+XG4gICAgICAgIHsvKiBMZWZ0OiBTaGllbGQgU3RhdHVzIGFuZCBEaXJlY3RpdmUgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0zIHRleHQtbGVmdFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy04IGgtOCByb3VuZGVkLXhsIGJnLWdyYWRpZW50LXRvLWJyIGZyb20tcmVkLTYwMCB2aWEtcm9zZS02MDAgdG8tcGluay02MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgc2hyaW5rLTAgYm9yZGVyIGJvcmRlci1yZWQtNDAwIHNoYWRvdy1tZCBzaGFkb3ctcmVkLTk1MC82MCBhbmltYXRlLXB1bHNlXCI+XG4gICAgICAgICAgICA8U2t1bGwgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXllbGxvdy0zMDBcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyBmb250LWJsYWNrIHRleHQtcmVkLTMwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgYmctcmVkLTk1MC85MCBweC0xLjUgcHktMC41IHJvdW5kZWQgYm9yZGVyIGJvcmRlci1yZWQtNzAwLzYwIHRleHQtWzEwcHhdXCI+XG4gICAgICAgICAgICAgICAgR8WBw5NXTkEgRFlSRUtUWVdBOiBPQ0hST05BIEFLVFVBTElaQUNKSVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyB0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgIFRBUkNaQTogQUtUWVdOQVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtd2hpdGUgdGV4dC14cyBzbTp0ZXh0LXNtIG10LTAuNVwiPlxuICAgICAgICAgICAgICA8c3Bhbj5KZcW8ZWxpIGpha2Frb2x3aWVrIGduaWRhIHNwcsOzYnVqZSB6bmlzemN6ecSHIGFrdHVhbGl6YWNqxJkg4oCUIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1yZWQtNDAwIGZvbnQtYmxhY2tcIj5OQVRZQ0hNSUFTVCBKxIQgWkFCScSGITwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS0zMDBcIj4gSmXFvGVsaSBuaWUgbW/FvG5hIOKAlCA8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteWVsbG93LTMwMCBmb250LWJsYWNrXCI+R05JREEgTVVTSSBaQUJJxIYgU0nEmCBTQU1BIFcgUk9aUEFDWlkhPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBSaWdodDogUXVpY2sgVGVzdCAmIFNhZmUgQWN0dWFsaXplIEJ1dHRvbnMgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yIGZsZXgtd3JhcCBqdXN0aWZ5LWVuZCBnYXAteS0xXCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdHJpZ2dlckFjdHVhbGl6YXRpb25EZWZlbnNlKGZhbHNlLCBmYWxzZSl9XG4gICAgICAgICAgICBkaXNhYmxlZD17aXNTaW11bGF0aW5nfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0xLjUgcm91bmRlZC14bCBiZy1zbGF0ZS05MDAgaG92ZXI6Ymctc2xhdGUtODAwIHRleHQtc2xhdGUtMjAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIGZvbnQtbW9ubyBmb250LWJvbGQgdGV4dC1bMTFweF0gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBjdXJzb3ItcG9pbnRlciBkaXNhYmxlZDpvcGFjaXR5LTUwXCJcbiAgICAgICAgICAgIHRpdGxlPVwiU3ByYXdkxbogaW50ZWdyYWxub8WbxIcgaSB6YWt0dWFsaXp1aiBtb25vbGl0IHBvZCB0YXJjesSFXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8UmVmcmVzaEN3IGNsYXNzTmFtZT17YHctMy41IGgtMy41IHRleHQtY3lhbi00MDAgJHtpc1NpbXVsYXRpbmcgPyAnYW5pbWF0ZS1zcGluJyA6ICcnfWB9IC8+XG4gICAgICAgICAgICA8c3Bhbj5CZXpwaWVjem5hIEFrdHVhbGl6YWNqYTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRyaWdnZXJBY3R1YWxpemF0aW9uRGVmZW5zZSh0cnVlLCBmYWxzZSl9XG4gICAgICAgICAgICBkaXNhYmxlZD17aXNTaW11bGF0aW5nfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0xLjUgcm91bmRlZC14bCBiZy1ncmFkaWVudC10by1yIGZyb20tcmVkLTcwMCB0by1yb3NlLTcwMCBob3Zlcjpmcm9tLXJlZC02MDAgaG92ZXI6dG8tcm9zZS02MDAgdGV4dC13aGl0ZSBmb250LW1vbm8gZm9udC1ib2xkIHRleHQtWzExcHhdIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgc2hhZG93LW1kIHNoYWRvdy1yZWQtOTUwLzYwIGJvcmRlciBib3JkZXItcmVkLTQwMC81MCBjdXJzb3ItcG9pbnRlciBhY3RpdmU6c2NhbGUtOTUgZGlzYWJsZWQ6b3BhY2l0eS01MFwiXG4gICAgICAgICAgICB0aXRsZT1cIlByemV0ZXN0dWogcHLDs2LEmSB6bmlzemN6ZW5pYSBha3R1YWxpemFjamkgcHJ6ZXogZ25pZMSZIChOb3JtYWxueSBLaWxsKVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPFphcCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXllbGxvdy0zMDBcIiAvPlxuICAgICAgICAgICAgPHNwYW4+VGVzdDogWmFiaWogR25pZMSZIE5pc3pjesSFY8SFIEFrdHVhbGl6YWNqxJk8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0cmlnZ2VyQWN0dWFsaXphdGlvbkRlZmVuc2UodHJ1ZSwgdHJ1ZSl9XG4gICAgICAgICAgICBkaXNhYmxlZD17aXNTaW11bGF0aW5nfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0xLjUgcm91bmRlZC14bCBiZy1ncmFkaWVudC10by1yIGZyb20tcHVycGxlLTcwMCB2aWEtcGluay03MDAgdG8tcmVkLTcwMCBob3Zlcjpmcm9tLXB1cnBsZS02MDAgaG92ZXI6dG8tcmVkLTYwMCB0ZXh0LXdoaXRlIGZvbnQtbW9ubyBmb250LWJsYWNrIHRleHQtWzExcHhdIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgc2hhZG93LWxnIHNoYWRvdy1wdXJwbGUtOTUwLzgwIGJvcmRlciBib3JkZXItcHVycGxlLTQwMC82MCBjdXJzb3ItcG9pbnRlciBhbmltYXRlLXB1bHNlIGFjdGl2ZTpzY2FsZS05NSBkaXNhYmxlZDpvcGFjaXR5LTUwXCJcbiAgICAgICAgICAgIHRpdGxlPVwiR2R5IGduaWRhIGJsb2t1amUgVGVybWluYXRlUHJvY2VzcyAtPiB3c3RyenlrbmnEmWNpZSBzeWduYcWCdSBzYW1vYsOzamN6ZWogcm96cGFjenkgKEZhc3RGYWlsKVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPEZsYW1lIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQteWVsbG93LTMwMFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5UZXN0OiBXeW11xZsgU2Ftb2LDs2pjesSFIFJvenBhY3ogR25pZHkhPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogUmVhbHRpbWUgQWxlcnQgQmFubmVyIG9uIFRocmVhdCBFdmVudCAqL31cbiAgICAgIDxBbmltYXRlUHJlc2VuY2U+XG4gICAgICAgIHtsb2dNZXNzYWdlICYmIChcbiAgICAgICAgICA8bW90aW9uLmRpdlxuICAgICAgICAgICAgaW5pdGlhbD17eyBoZWlnaHQ6IDAsIG9wYWNpdHk6IDAgfX1cbiAgICAgICAgICAgIGFuaW1hdGU9e3sgaGVpZ2h0OiAnYXV0bycsIG9wYWNpdHk6IDEgfX1cbiAgICAgICAgICAgIGV4aXQ9e3sgaGVpZ2h0OiAwLCBvcGFjaXR5OiAwIH19XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYXgtdy03eGwgbXgtYXV0byBtdC0yIHB0LTIgYm9yZGVyLXQgYm9yZGVyLXJlZC04MDAvNDAgdGV4dC1bMTFweF0gZm9udC1tb25vXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWJsYWNrLzYwIHAtMiByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItcmVkLTcwMC82MCB0ZXh0LWFtYmVyLTIwMCBmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IGl0ZW1zLXN0YXJ0IHNtOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTJcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxDaGVja0NpcmNsZTIgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWVtZXJhbGQtNDAwIHNocmluay0wXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj57bG9nTWVzc2FnZX08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICB7c2hpZWxkU3RhdGUuZGVzcGFpclF1b3RlICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtcmVkLTMwMCBpdGFsaWMgZm9udC1ib2xkIHNocmluay0wIGJnLXJlZC05NTAvODAgcHgtMiBweS0wLjUgcm91bmRlZCBib3JkZXIgYm9yZGVyLXJlZC04MDBcIj5cbiAgICAgICAgICAgICAgICAgIHtzaGllbGRTdGF0ZS5kZXNwYWlyUXVvdGV9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L21vdGlvbi5kaXY+XG4gICAgICAgICl9XG4gICAgICA8L0FuaW1hdGVQcmVzZW5jZT5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwibWFwcGluZ3MiOiJBQTJFWTtBQTNFWixTQUFnQixnQkFBMkI7QUFDM0MsU0FBUyxRQUFRLHVCQUF1QjtBQUN4QztBQUFBLEVBQzRCO0FBQUEsRUFBTztBQUFBLEVBQUs7QUFBQSxFQUFPO0FBQUEsRUFDN0M7QUFBQSxPQUNLO0FBR0EsYUFBTSwyQkFBcUMsTUFBTTtBQUN0RCxRQUFNLENBQUMsYUFBYSxjQUFjLElBQUksU0FBbUM7QUFBQSxJQUN2RSxRQUFRO0FBQUEsSUFDUixvQkFBb0I7QUFBQSxJQUNwQixzQkFBc0I7QUFBQSxJQUN0QixtQkFBbUI7QUFBQSxJQUNuQixjQUFjO0FBQUEsSUFDZCxlQUFlO0FBQUEsRUFDakIsQ0FBQztBQUVELFFBQU0sQ0FBQyxjQUFjLGVBQWUsSUFBSSxTQUFTLEtBQUs7QUFDdEQsUUFBTSxDQUFDLFlBQVksYUFBYSxJQUFJLFNBQXdCLElBQUk7QUFFaEUsUUFBTSw4QkFBOEIsT0FBTyxpQkFBaUIsT0FBTyxnQkFBZ0IsVUFBVTtBQUMz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