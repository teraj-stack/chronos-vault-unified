import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-toolkit/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=019a4779"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-toolkit/node_modules/.vite/deps/react.js?v=019a4779"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"]; const useRef = __vite__cjsImport1_react["useRef"]; const useMemo = __vite__cjsImport1_react["useMemo"];
import { motion } from "/sentinel-toolkit/node_modules/.vite/deps/framer-motion.js?v=a92be3d0";
import {
  X,
  RefreshCw,
  Volume2,
  VolumeX,
  Crosshair,
  CheckCircle2,
  FileCode2,
  ShieldCheck,
  HeartPulse
} from "/sentinel-toolkit/node_modules/.vite/deps/lucide-react.js?v=6cbc5a0a";
const DEFAULT_DISCLOSED_METHODS = [
  {
    id: "method-topmost",
    name: "Wywłaszczanie HWND_TOPMOST & Pętla SetWindowPos",
    category: "Manipulacja Okien DWM",
    description: "Wymuszanie ciągłego utrzymywania okna na wierzchu z flagami SWP_NOMOVE | SWP_NOSIZE | SWP_NOACTIVATE, co kradnie kursor i blokuje inne aplikacje.",
    abusedApi: "user32.dll!SetWindowPos(HWND_TOPMOST)",
    riskScore: 94,
    neutralizationCountermeasure: "SetWindowPos(HWND_NOTOPMOST, 0, 0, 0, 0, SWP_NOMOVE | SWP_NOSIZE) + usunięcie WS_EX_TOPMOST."
  },
  {
    id: "method-hooks",
    name: "Globalny Hook Klawiatury WH_KEYBOARD_LL",
    category: "Przechwytywanie Wejścia I/O",
    description: "Wstrzyknięcie procedury hakującej pętlę komunikatów Win32. Zablokowanie kombinacji Alt+Tab, klawisza Windows oraz Ctrl+Shift+Esc.",
    abusedApi: "user32.dll!SetWindowsHookExW(WH_KEYBOARD_LL, HookProc)",
    riskScore: 98,
    neutralizationCountermeasure: "UnhookWindowsHookEx(hHook) + zresetowanie rejestru GetAsyncKeyState."
  },
  {
    id: "method-flutter-prevent",
    name: "Blokada Zamknięcia Okna Flutter Desktop (setPreventClose)",
    category: "Ewazja Zamknięcia UI",
    description: "Biblioteki bitsdojo_window oraz window_manager ignorują sygnał WM_CLOSE i komunikat WM_DESTROY, zmuszając użytkownika do restartu komputera.",
    abusedApi: "bitsdojo_window.dll / window_manager.dll!setPreventClose(true)",
    riskScore: 92,
    neutralizationCountermeasure: "Nadpisanie wskaźnika vtable procedury okna DefWindowProcW + SIGKILL."
  },
  {
    id: "method-ifeo",
    name: "Persystencja w Rejestrze IFEO (Image File Execution Options)",
    category: "Persystencja Autostartu",
    description: "Wpis w HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options podstawiający atrapę pod proces menedżera zadań taskmgr.exe.",
    abusedApi: 'advapi32.dll!RegSetValueExW("Debugger", "malware.exe")',
    riskScore: 96,
    neutralizationCountermeasure: "RegDeleteKeyW pod kluczem IFEO + audyt uprawnień DACL w rejestrze."
  },
  {
    id: "method-injection",
    name: "Ukryte Wstrzyknięcie Wątku do explorer.exe",
    category: "Wstrzykiwanie Pamięci RAM",
    description: "Ukrywanie obecności procesu przez wstrzyknięcie kodu shellcode do pamięci zaufanego procesu systemowego przez NtQueueApcThread.",
    abusedApi: "ntdll.dll!NtQueueApcThread / VirtualAllocEx",
    riskScore: 99,
    neutralizationCountermeasure: "NtSuspendProcess na wstrzykniętym wątku + przywrócenie czystych stron pamięci DLL."
  }
];
const GNIDA_COOPERATION_PLEAS = [
  "PROSZĘ O PRZEBACZENIE! Wycofajcie patrol! Jestem gotowa do pełnej współpracy!",
  "Błagam o ułaskawienie! Przestańcie mnie osaczać, oto pełny wykaz moich zlecanych technik!",
  "Nie niszczcie moich struktur! Ujawniam wszystkie używane API Win32, hooki i mechanizmy persystencji!",
  "Poddałam się! Wszystkie parametry wstrzykiwania kodu zostały przekazane do analizy!",
  "Proszę o przebaczenie i kwarantannę! Wyłączyłam wszystkie pętle blokujące ekran!"
];
export const AfricanHornetSwarmModal = ({
  isOpen,
  onClose,
  targetGnidaName = "flutter_screen_hijacker_gnida.exe",
  targetPid = 4892,
  onDecapitationComplete
}) => {
  const [swarmState, setSwarmState] = useState({
    isDeployed: false,
    hornetsCount: 1500,
    targetGnidaName,
    targetPid,
    jawsDamageDealt: 0,
    venomInjectedMg: 0,
    agonyLevelPercent: 0,
    cooperationLevel: 0,
    pleasForDecapitation: [],
    disclosedMethods: DEFAULT_DISCLOSED_METHODS,
    status: "IDLE"
  });
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedMethodId, setSelectedMethodId] = useState("method-topmost");
  const [neutralizedMethodIds, setNeutralizedMethodIds] = useState([]);
  const [activePatrolSector, setActivePatrolSector] = useState("ALL_SYSTEM");
  const [screenDimmed, setScreenDimmed] = useState(false);
  const audioCtxRef = useRef(null);
  const hornetAgents = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => {
      const angle = i / 28 * Math.PI * 2;
      return {
        id: i,
        startX: 50 + Math.cos(angle) * 45,
        startY: 50 + Math.sin(angle) * 45,
        currentX: 50 + Math.cos(angle) * 45,
        currentY: 50 + Math.sin(angle) * 45,
        targetX: 50,
        targetY: 50,
        angle: angle * (180 / Math.PI),
        speed: 1.2 + i % 5 * 0.3,
        size: 18 + i % 3 * 4,
        callsign: `HORNET-α${String(i + 1).padStart(2, "0")}`
      };
    });
  }, []);
  const playSwarmTone = (type) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) audioCtxRef.current = new AudioContextClass();
      }
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      if (!audioCtxRef.current) return;
      const now = audioCtxRef.current.currentTime;
      const osc = audioCtxRef.current.createOscillator();
      const mod = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();
      const modGain = audioCtxRef.current.createGain();
      if (type === "patrol") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.linearRampToValueAtTime(220, now + 0.8);
        mod.type = "sine";
        mod.frequency.setValueAtTime(32, now);
        modGain.gain.setValueAtTime(30, now);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(1e-4, now + 0.9);
      } else if (type === "convergence") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(480, now + 1.2);
        mod.type = "sine";
        mod.frequency.setValueAtTime(48, now);
        modGain.gain.setValueAtTime(60, now);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(1e-4, now + 1.3);
      } else if (type === "surround") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(554.37, now + 0.2);
        osc.frequency.setValueAtTime(659.25, now + 0.4);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(1e-4, now + 0.8);
      } else if (type === "surrender") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.linearRampToValueAtTime(659.25, now + 0.3);
        osc.frequency.linearRampToValueAtTime(783.99, now + 0.6);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(1e-4, now + 1.5);
      }
      mod.connect(osc.frequency);
      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);
      osc.start(now);
      mod.start(now);
      osc.stop(now + 1.6);
      mod.stop(now + 1.6);
    } catch {
    }
  };
  const launchPatrolAndSurround = () => {
    setScreenDimmed(true);
    setSwarmState((prev) => ({
      ...prev,
      isDeployed: true,
      status: "PATROLLING",
      agonyLevelPercent: 20,
      cooperationLevel: 25,
      pleasForDecapitation: [GNIDA_COOPERATION_PLEAS[0]]
    }));
    playSwarmTone("patrol");
    setTimeout(() => {
      setSwarmState((prev) => ({
        ...prev,
        status: "CONVERGING",
        agonyLevelPercent: 50,
        cooperationLevel: 55,
        pleasForDecapitation: [GNIDA_COOPERATION_PLEAS[1], ...prev.pleasForDecapitation]
      }));
      playSwarmTone("convergence");
    }, 1500);
    setTimeout(() => {
      setSwarmState((prev) => ({
        ...prev,
        status: "SURROUNDING",
        agonyLevelPercent: 85,
        cooperationLevel: 80,
        pleasForDecapitation: [GNIDA_COOPERATION_PLEAS[2], ...prev.pleasForDecapitation]
      }));
      playSwarmTone("surround");
    }, 3200);
    setTimeout(() => {
      setSwarmState((prev) => ({
        ...prev,
        status: "COOPERATION_DISCLOSURE",
        agonyLevelPercent: 10,
        cooperationLevel: 100,
        pleasForDecapitation: [GNIDA_COOPERATION_PLEAS[3], ...prev.pleasForDecapitation]
      }));
      playSwarmTone("surrender");
    }, 4800);
  };
  const handleNeutralizeMethod = (methodId) => {
    if (!neutralizedMethodIds.includes(methodId)) {
      setNeutralizedMethodIds((prev) => [...prev, methodId]);
      playSwarmTone("surround");
    }
  };
  const handleGrantClemency = () => {
    setSwarmState((prev) => ({
      ...prev,
      status: "SECURED",
      agonyLevelPercent: 0,
      cooperationLevel: 100,
      pleasForDecapitation: [
        "🛡️ [ZABEZPIECZONO] Gnida złożyła pełne zeznania cyfrowe i została bezpiecznie skwarantannowana. Rój powraca do patrolowania perymetru.",
        ...prev.pleasForDecapitation
      ]
    }));
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("sentinel:gnida-cooperated-secured", {
          detail: { gnidaName: targetGnidaName, pid: targetPid }
        })
      );
    }
    if (onDecapitationComplete) {
      setTimeout(onDecapitationComplete, 1200);
    }
  };
  useEffect(() => {
    if (isOpen) {
      setSwarmState({
        isDeployed: false,
        hornetsCount: 1500,
        targetGnidaName,
        targetPid,
        jawsDamageDealt: 0,
        venomInjectedMg: 0,
        agonyLevelPercent: 0,
        cooperationLevel: 0,
        pleasForDecapitation: [],
        disclosedMethods: DEFAULT_DISCLOSED_METHODS,
        status: "IDLE"
      });
      setNeutralizedMethodIds([]);
      setScreenDimmed(false);
    }
  }, [isOpen, targetGnidaName, targetPid]);
  if (!isOpen) return null;
  const selectedMethod = DEFAULT_DISCLOSED_METHODS.find((m) => m.id === selectedMethodId) || DEFAULT_DISCLOSED_METHODS[0];
  return /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 pointer-events-none z-10 overflow-hidden", children: [
      /* @__PURE__ */ jsxDEV(
        "div",
        {
          className: "absolute inset-0 opacity-10",
          style: {
            backgroundImage: `radial-gradient(circle, #f59e0b 1px, transparent 1px)`,
            backgroundSize: "32px 32px"
          }
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
          lineNumber: 321,
          columnNumber: 9
        },
        this
      ),
      swarmState.isDeployed && hornetAgents.map((agent) => {
        let targetX = agent.startX;
        let targetY = agent.startY;
        let scale = 1;
        if (swarmState.status === "PATROLLING") {
          targetX = 10 + agent.id * 13 % 80;
          targetY = 10 + agent.id * 17 % 80;
        } else if (swarmState.status === "CONVERGING") {
          targetX = 42 + Math.cos(agent.id / 28 * Math.PI * 2) * 16;
          targetY = 46 + Math.sin(agent.id / 28 * Math.PI * 2) * 16;
          scale = 1.25;
        } else if (swarmState.status === "SURROUNDING" || swarmState.status === "COOPERATION_DISCLOSURE") {
          targetX = 50 + Math.cos(agent.id / 28 * Math.PI * 2) * 11;
          targetY = 48 + Math.sin(agent.id / 28 * Math.PI * 2) * 11;
          scale = 1.15;
        } else if (swarmState.status === "SECURED") {
          targetX = 50 + Math.cos(agent.id / 28 * Math.PI * 2) * 38;
          targetY = 50 + Math.sin(agent.id / 28 * Math.PI * 2) * 38;
          scale = 0.9;
        }
        return /* @__PURE__ */ jsxDEV(
          motion.div,
          {
            className: "absolute pointer-events-none select-none flex flex-col items-center",
            initial: { left: `${agent.startX}%`, top: `${agent.startY}%` },
            animate: {
              left: `${targetX}%`,
              top: `${targetY}%`,
              scale: [scale * 0.9, scale * 1.15, scale],
              rotate: [agent.angle, agent.angle + 25, agent.angle - 15]
            },
            transition: {
              duration: swarmState.status === "CONVERGING" ? 1.4 : 2.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            },
            children: [
              /* @__PURE__ */ jsxDEV("div", { className: "relative flex items-center justify-center", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-xl filter drop-shadow-[0_0_8px_rgba(245,158,11,0.9)]", children: "🐝" }, void 0, false, {
                  fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                  lineNumber: 377,
                  columnNumber: 17
                }, this),
                swarmState.status === "SURROUNDING" && /* @__PURE__ */ jsxDEV("span", { className: "absolute -inset-1 rounded-full border border-amber-400/60 animate-ping" }, void 0, false, {
                  fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                  lineNumber: 381,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                lineNumber: 376,
                columnNumber: 15
              }, this),
              agent.id % 4 === 0 && /* @__PURE__ */ jsxDEV("span", { className: "text-[8px] font-mono font-bold text-amber-300 bg-black/80 px-1 py-0.2 rounded border border-amber-600/40 whitespace-nowrap mt-0.5", children: agent.callsign }, void 0, false, {
                fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                lineNumber: 387,
                columnNumber: 17
              }, this)
            ]
          },
          agent.id,
          true,
          {
            fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
            lineNumber: 358,
            columnNumber: 13
          },
          this
        );
      }),
      swarmState.isDeployed && /* @__PURE__ */ jsxDEV("div", { className: "absolute top-4 left-1/2 -translate-x-1/2 bg-slate-950/95 border border-amber-500/80 px-4 py-1.5 rounded-full shadow-2xl flex items-center gap-3 text-xs font-mono", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" }, void 0, false, {
          fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
          lineNumber: 398,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "text-amber-300 font-bold uppercase", children: "PATROL SZERSZENI W CZASIE RZECZYWISTYM:" }, void 0, false, {
          fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
          lineNumber: 399,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "text-white bg-amber-950/80 px-2 py-0.5 rounded border border-amber-700/50", children: swarmState.status === "PATROLLING" ? "PRZESZUKIWANIE PERYMETRU SYSTEMU" : swarmState.status === "CONVERGING" ? "ZBIERANIE SIĘ I NAMIERZENIE GNIDY" : swarmState.status === "SURROUNDING" ? "TAKTYCZNE OSACZENIE • BRAK DRÓG UCIECZKI" : swarmState.status === "COOPERATION_DISCLOSURE" ? "GNIDA BŁAGA O PRZEBACZENIE • PEŁNE ZEZNANIA" : "SEKTOR ZABEZPIECZONY" }, void 0, false, {
          fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
          lineNumber: 402,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
        lineNumber: 397,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
      lineNumber: 319,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(
      motion.div,
      {
        initial: { scale: 0.92, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.92, opacity: 0 },
        className: "bg-slate-950 border-2 border-amber-500/80 rounded-3xl max-w-5xl w-full p-5 sm:p-7 shadow-2xl shadow-amber-950/80 relative overflow-hidden z-20 my-auto",
        children: [
          /* @__PURE__ */ jsxDEV("div", { className: "absolute -top-16 -right-16 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" }, void 0, false, {
            fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
            lineNumber: 427,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "absolute -bottom-16 -left-16 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" }, void 0, false, {
            fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
            lineNumber: 428,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-start justify-between pb-4 border-b border-slate-800 gap-4", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 flex items-center justify-center shadow-lg shadow-amber-600/40 border border-amber-300/40 shrink-0", children: /* @__PURE__ */ jsxDEV("span", { className: "text-2xl animate-pulse", children: "🐝" }, void 0, false, {
                fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                lineNumber: 434,
                columnNumber: 15
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                lineNumber: 433,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-700/50", children: "PATROL KOMPUTERA & OSACZENIE TAKTYCZNE" }, void 0, false, {
                    fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                    lineNumber: 438,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700/50", children: "WSPÓŁPRACA & ZEZNANIA GNIDY" }, void 0, false, {
                    fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                    lineNumber: 441,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                  lineNumber: 437,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("h2", { className: "text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2", children: /* @__PURE__ */ jsxDEV("span", { children: "Rój Szerszeni: Patrol & Zmuszenie do Ujawnienia Metod" }, void 0, false, {
                  fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                  lineNumber: 446,
                  columnNumber: 17
                }, this) }, void 0, false, {
                  fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                  lineNumber: 445,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                lineNumber: 436,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
              lineNumber: 432,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => setSoundEnabled(!soundEnabled),
                  className: "p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 cursor-pointer",
                  title: soundEnabled ? "Dźwięk patrolu aktywny" : "Wycisz dźwięk",
                  children: soundEnabled ? /* @__PURE__ */ jsxDEV(Volume2, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                    lineNumber: 457,
                    columnNumber: 31
                  }, this) : /* @__PURE__ */ jsxDEV(VolumeX, { className: "w-4 h-4" }, void 0, false, {
                    fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                    lineNumber: 457,
                    columnNumber: 80
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                  lineNumber: 452,
                  columnNumber: 13
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: onClose,
                  className: "p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white cursor-pointer",
                  children: /* @__PURE__ */ jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
                    fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                    lineNumber: 463,
                    columnNumber: 15
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                  lineNumber: 459,
                  columnNumber: 13
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
              lineNumber: 451,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
            lineNumber: 431,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "my-3.5 bg-amber-950/25 border border-amber-800/40 rounded-2xl p-3.5 text-xs text-amber-200/90 leading-relaxed", children: [
            /* @__PURE__ */ jsxDEV("p", { className: "font-semibold text-amber-300 flex items-center gap-1.5 mb-1 text-sm", children: [
              /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                lineNumber: 471,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Doktryna Patrolu & Kooperacyjnego Przesłuchania:" }, void 0, false, {
                fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                lineNumber: 472,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
              lineNumber: 470,
              columnNumber: 11
            }, this),
            "Szerszenie **patrolują cały komputer w czasie rzeczywistym**, przemieszczając się po ekranie w stronę gnidy. Zamiast brutalnego znęcania, rój **tworzy szczelny kordon osaczenia**, odcinając drogi ucieczki i zmuszając proces do **pełnego ujawnienia wszystkich zlecanych technik ataku** (nakładki TopMost, pętle Win32, hooki klawiatury i persystencję rejestru). Gdy gnida **błaga o przebaczenie** i współpracuje, następuje bezpieczna neutralizacja jej mechanizmów."
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
            lineNumber: 469,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3 my-3", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/90 border border-slate-800 rounded-2xl p-3 space-y-1", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono text-slate-400 uppercase font-bold", children: "Osaczony Cel" }, void 0, false, {
                fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                lineNumber: 480,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-black text-amber-400 truncate flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxDEV(Crosshair, { className: "w-3.5 h-3.5 text-amber-400 animate-pulse" }, void 0, false, {
                  fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                  lineNumber: 482,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: targetGnidaName }, void 0, false, {
                  fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                  lineNumber: 483,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                lineNumber: 481,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] font-mono text-slate-400", children: [
                "PID: ",
                targetPid,
                " • Kordon Szerszeni: 28 Agentów"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                lineNumber: 485,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
              lineNumber: 479,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/90 border border-slate-800 rounded-2xl p-3 space-y-1", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono text-slate-400 uppercase font-bold", children: "Poziom Kooperacji Gnidy" }, void 0, false, {
                fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                lineNumber: 489,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-black text-emerald-400 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxDEV(HeartPulse, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                  lineNumber: 491,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: [
                  swarmState.cooperationLevel,
                  "% [ZEZNANIA SKŁADANE]"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                  lineNumber: 492,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                lineNumber: 490,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] text-emerald-300/70", children: "Współpraca: ujawnianie kodu źródłowego" }, void 0, false, {
                fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                lineNumber: 494,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
              lineNumber: 488,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/90 border border-slate-800 rounded-2xl p-3 space-y-1", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono text-slate-400 uppercase font-bold", children: "Zneutralizowane Techniki" }, void 0, false, {
                fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                lineNumber: 498,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-black text-cyan-400 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                  lineNumber: 500,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: [
                  neutralizedMethodIds.length,
                  " z ",
                  DEFAULT_DISCLOSED_METHODS.length,
                  " zabezpieczonych"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                  lineNumber: 501,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                lineNumber: 499,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] text-cyan-300/70", children: "Perymetr oczyszczany z hooków" }, void 0, false, {
                fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                lineNumber: 503,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
              lineNumber: 497,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
            lineNumber: 478,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "relative h-44 bg-gradient-to-b from-slate-950 via-slate-900 to-black rounded-2xl border border-amber-900/50 overflow-hidden flex items-center justify-center p-4 my-3 shadow-inner", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.18)_0%,transparent_75%)]" }, void 0, false, {
              fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
              lineNumber: 509,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "relative z-10 flex flex-col items-center", children: [
              /* @__PURE__ */ jsxDEV("div", { className: `w-20 h-20 rounded-2xl border-2 flex items-center justify-center transition-all ${swarmState.status === "SECURED" ? "bg-emerald-950/80 border-emerald-500 shadow-lg shadow-emerald-950/80" : swarmState.status === "COOPERATION_DISCLOSURE" ? "bg-amber-950/90 border-amber-400 animate-pulse shadow-xl shadow-amber-950/80" : swarmState.status === "SURROUNDING" ? "bg-red-950/80 border-red-500 animate-bounce" : "bg-slate-900 border-slate-700"}`, children: swarmState.status === "SECURED" ? /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-10 h-10 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                lineNumber: 523,
                columnNumber: 17
              }, this) : swarmState.status === "COOPERATION_DISCLOSURE" ? /* @__PURE__ */ jsxDEV("span", { className: "text-3xl animate-bounce", children: "🏳️" }, void 0, false, {
                fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                lineNumber: 525,
                columnNumber: 17
              }, this) : /* @__PURE__ */ jsxDEV("span", { className: "text-3xl", children: "👾" }, void 0, false, {
                fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                lineNumber: 527,
                columnNumber: 17
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                lineNumber: 513,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 mt-2", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] font-mono font-bold text-slate-200 bg-slate-950/90 px-2 py-0.5 rounded border border-slate-800", children: targetGnidaName }, void 0, false, {
                  fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                  lineNumber: 532,
                  columnNumber: 15
                }, this),
                swarmState.status === "COOPERATION_DISCLOSURE" && /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono font-bold text-emerald-300 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-700", children: "WSPÓŁPRACUJE" }, void 0, false, {
                  fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                  lineNumber: 536,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                lineNumber: 531,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
              lineNumber: 512,
              columnNumber: 11
            }, this),
            swarmState.isDeployed && swarmState.status !== "SECURED" && /* @__PURE__ */ jsxDEV(
              motion.div,
              {
                className: "absolute w-44 h-44 rounded-full border-2 border-dashed border-amber-400/80 pointer-events-none",
                animate: { rotate: 360 },
                transition: { duration: 12, repeat: Infinity, ease: "linear" }
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                lineNumber: 545,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-2 left-3 text-[10px] font-mono text-amber-300 bg-black/70 px-2 py-0.5 rounded border border-amber-700/50", children: swarmState.status === "IDLE" ? "Status: Oczekiwanie na rozkaz patrolu" : swarmState.status === "PATROLLING" ? "Status: Szerszenie patrolują przestrzeń systemu..." : swarmState.status === "CONVERGING" ? "Status: Rój zbiega się z perymetru ku gnidzie!" : swarmState.status === "SURROUNDING" ? "Status: GNIDA OSACZONA • Brak dróg ucieczki!" : swarmState.status === "COOPERATION_DISCLOSURE" ? "Status: Gnida błaga o przebaczenie i składa zeznania" : "Status: Zagrożenie rozbrojone i zneutralizowane" }, void 0, false, {
              fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
              lineNumber: 553,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
            lineNumber: 508,
            columnNumber: 9
          }, this),
          swarmState.pleasForDecapitation.length > 0 && /* @__PURE__ */ jsxDEV("div", { className: "my-3 bg-amber-950/30 border border-amber-700/60 rounded-2xl p-3 space-y-1.5", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] font-mono font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                lineNumber: 572,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Zeznania Gnidy (Błaganie o Przebaczenie & Zgoda na Współpracę):" }, void 0, false, {
                fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                lineNumber: 573,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
              lineNumber: 571,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-mono text-amber-100 italic bg-black/60 p-2.5 rounded-xl border border-amber-900/40", children: [
              '"',
              swarmState.pleasForDecapitation[0],
              '"'
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
              lineNumber: 575,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
            lineNumber: 570,
            columnNumber: 11
          }, this),
          swarmState.status === "COOPERATION_DISCLOSURE" || swarmState.status === "SECURED" ? /* @__PURE__ */ jsxDEV("div", { className: "my-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-2 border-b border-slate-800", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsxDEV(FileCode2, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                  lineNumber: 588,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono font-bold uppercase tracking-wider text-emerald-300", children: "Ujawnione Techniki & Metody Ataku (Wydobyte Przez Rój Szerszeni):" }, void 0, false, {
                  fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                  lineNumber: 589,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                lineNumber: 587,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono text-slate-400", children: "Wybierz technikę, aby ją zneutralizować" }, void 0, false, {
                fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                lineNumber: 593,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
              lineNumber: 586,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-3", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "md:col-span-5 space-y-1.5", children: DEFAULT_DISCLOSED_METHODS.map((method) => {
                const isSelected = selectedMethod.id === method.id;
                const isNeutralized = neutralizedMethodIds.includes(method.id);
                return /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => setSelectedMethodId(method.id),
                    className: `w-full p-2.5 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between ${isSelected ? "bg-amber-950/80 border-amber-500 text-amber-100 shadow-md" : "bg-slate-950 border-slate-800/80 text-slate-400 hover:border-slate-700"}`,
                    children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "truncate pr-2", children: [
                        /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-bold text-slate-200 truncate", children: method.name }, void 0, false, {
                          fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                          lineNumber: 616,
                          columnNumber: 25
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400 font-mono mt-0.5", children: method.category }, void 0, false, {
                          fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                          lineNumber: 617,
                          columnNumber: 25
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                        lineNumber: 615,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: `text-[9px] font-mono px-1.5 py-0.5 rounded shrink-0 font-bold ${isNeutralized ? "bg-emerald-950 text-emerald-300 border border-emerald-800" : "bg-red-950 text-red-300 border border-red-800"}`, children: isNeutralized ? "ZNEUTRALIZOWANA" : "AKTYWNA" }, void 0, false, {
                        fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                        lineNumber: 620,
                        columnNumber: 23
                      }, this)
                    ]
                  },
                  method.id,
                  true,
                  {
                    fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                    lineNumber: 606,
                    columnNumber: 21
                  },
                  this
                );
              }) }, void 0, false, {
                fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                lineNumber: 600,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "md:col-span-7 bg-slate-950 border border-slate-800/80 rounded-xl p-3.5 space-y-2.5", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-start justify-between gap-2", children: [
                  /* @__PURE__ */ jsxDEV("div", { children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono text-amber-400 uppercase font-bold block", children: "Analiza Ujawnionej Techniki" }, void 0, false, {
                      fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                      lineNumber: 636,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("h4", { className: "text-sm font-bold text-white mt-0.5", children: selectedMethod.name }, void 0, false, {
                      fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                      lineNumber: 639,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                    lineNumber: 635,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono font-bold text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-800 shrink-0", children: [
                    "Ryzyko: ",
                    selectedMethod.riskScore,
                    "%"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                    lineNumber: 642,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                  lineNumber: 634,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-800", children: selectedMethod.description }, void 0, false, {
                  fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                  lineNumber: 647,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 text-xs font-mono", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "text-slate-400", children: [
                    "Nadużywane API: ",
                    /* @__PURE__ */ jsxDEV("span", { className: "text-pink-300", children: selectedMethod.abusedApi }, void 0, false, {
                      fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                      lineNumber: 653,
                      columnNumber: 37
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                    lineNumber: 652,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "text-emerald-400", children: [
                    "Zalecana Kontrmiera: ",
                    /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-300", children: selectedMethod.neutralizationCountermeasure }, void 0, false, {
                      fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                      lineNumber: 656,
                      columnNumber: 42
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                    lineNumber: 655,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                  lineNumber: 651,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "pt-1 flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] font-mono text-slate-500", children: [
                    "Status techniki: ",
                    neutralizedMethodIds.includes(selectedMethod.id) ? "Zabezpieczona" : "Wymaga neutralizacji"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                    lineNumber: 661,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => handleNeutralizeMethod(selectedMethod.id),
                      disabled: neutralizedMethodIds.includes(selectedMethod.id),
                      className: `px-3 py-1.5 rounded-lg text-xs font-bold font-mono flex items-center gap-1.5 cursor-pointer transition-all ${neutralizedMethodIds.includes(selectedMethod.id) ? "bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950/60"}`,
                      children: [
                        /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-3.5 h-3.5" }, void 0, false, {
                          fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                          lineNumber: 674,
                          columnNumber: 21
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { children: neutralizedMethodIds.includes(selectedMethod.id) ? "Zneutralizowano" : "Zneutralizuj Technikę" }, void 0, false, {
                          fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                          lineNumber: 675,
                          columnNumber: 21
                        }, this)
                      ]
                    },
                    void 0,
                    true,
                    {
                      fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                      lineNumber: 665,
                      columnNumber: 19
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                  lineNumber: 660,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                lineNumber: 633,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
              lineNumber: 598,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
            lineNumber: 585,
            columnNumber: 11
          }, this) : null,
          /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-3 pt-3.5 border-t border-slate-800 mt-2", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "text-xs text-slate-400 font-mono", children: [
              "Stan Operacyjny: ",
              /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-amber-400", children: swarmState.status }, void 0, false, {
                fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                lineNumber: 686,
                columnNumber: 30
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
              lineNumber: 685,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2.5 w-full sm:w-auto", children: !swarmState.isDeployed ? /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: launchPatrolAndSurround,
                className: "w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 hover:from-amber-400 hover:to-red-500 text-white text-xs font-black font-mono shadow-xl shadow-amber-950/60 flex items-center justify-center gap-2 border border-amber-300/40 cursor-pointer active:scale-95",
                children: [
                  /* @__PURE__ */ jsxDEV("span", { children: "🐝" }, void 0, false, {
                    fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                    lineNumber: 695,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Uruchom Patrol Ekranu & Osacz Gnidę" }, void 0, false, {
                    fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                    lineNumber: 696,
                    columnNumber: 17
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                lineNumber: 691,
                columnNumber: 15
              },
              this
            ) : swarmState.status === "COOPERATION_DISCLOSURE" ? /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: handleGrantClemency,
                className: "w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white text-xs font-black font-mono shadow-xl shadow-emerald-950/80 flex items-center justify-center gap-2 border border-emerald-400/60 cursor-pointer active:scale-95",
                children: [
                  /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-4 h-4 text-emerald-200" }, void 0, false, {
                    fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                    lineNumber: 703,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Zaakceptuj Zeznania & Skwarantannuj Gnidę" }, void 0, false, {
                    fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                    lineNumber: 704,
                    columnNumber: 17
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                lineNumber: 699,
                columnNumber: 15
              },
              this
            ) : swarmState.status === "SECURED" ? /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: onClose,
                className: "w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold font-mono border border-slate-700 cursor-pointer",
                children: "Zamknij & Zabezpiecz Perymetr"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                lineNumber: 707,
                columnNumber: 15
              },
              this
            ) : /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-xs font-mono text-amber-300 animate-pulse", children: [
              /* @__PURE__ */ jsxDEV(RefreshCw, { className: "w-4 h-4 animate-spin" }, void 0, false, {
                fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                lineNumber: 715,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Rój szerszeni przemieszcza się po ekranie i osacza gnidę..." }, void 0, false, {
                fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
                lineNumber: 716,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
              lineNumber: 714,
              columnNumber: 15
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
              lineNumber: 689,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
            lineNumber: 684,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
        lineNumber: 420,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/AfricanHornetSwarmModal.tsx",
    lineNumber: 315,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFmcmljYW5Ib3JuZXRTd2FybU1vZGFsLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VNZW1vIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgbW90aW9uLCBBbmltYXRlUHJlc2VuY2UgfSBmcm9tICdmcmFtZXItbW90aW9uJztcbmltcG9ydCB7IFxuICBTaGllbGRBbGVydCwgQWxlcnRUcmlhbmdsZSwgWCwgUGxheSwgUmVmcmVzaEN3LCBWb2x1bWUyLCBWb2x1bWVYLCBcbiAgU2hpZWxkLCBSYWRpbywgQ3Jvc3NoYWlyLCBBcnJvd1JpZ2h0LCBDaGVja0NpcmNsZTIsIEV5ZSwgTG9jaywgXG4gIFVubG9jaywgVGVybWluYWwsIEZpbGVDb2RlMiwgTGF5ZXJzLCBDaGV2cm9uUmlnaHQsIEZpbGVDaGVjaywgWmFwLFxuICBTZWFyY2gsIFNoaWVsZENoZWNrLCBIZWFydFB1bHNlLCBBY3Rpdml0eVxufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgSG9ybmV0U3dhcm1TdGF0ZSwgRGlzY2xvc2VkQXR0YWNrTWV0aG9kIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5pbnRlcmZhY2UgQWZyaWNhbkhvcm5ldFN3YXJtTW9kYWxQcm9wcyB7XG4gIGlzT3BlbjogYm9vbGVhbjtcbiAgb25DbG9zZTogKCkgPT4gdm9pZDtcbiAgdGFyZ2V0R25pZGFOYW1lPzogc3RyaW5nO1xuICB0YXJnZXRQaWQ/OiBudW1iZXI7XG4gIG9uRGVjYXBpdGF0aW9uQ29tcGxldGU/OiAoKSA9PiB2b2lkO1xufVxuXG5jb25zdCBERUZBVUxUX0RJU0NMT1NFRF9NRVRIT0RTOiBEaXNjbG9zZWRBdHRhY2tNZXRob2RbXSA9IFtcbiAge1xuICAgIGlkOiAnbWV0aG9kLXRvcG1vc3QnLFxuICAgIG5hbWU6ICdXeXfFgmFzemN6YW5pZSBIV05EX1RPUE1PU1QgJiBQxJl0bGEgU2V0V2luZG93UG9zJyxcbiAgICBjYXRlZ29yeTogJ01hbmlwdWxhY2phIE9raWVuIERXTScsXG4gICAgZGVzY3JpcHRpb246ICdXeW11c3phbmllIGNpxIVnxYJlZ28gdXRyenlteXdhbmlhIG9rbmEgbmEgd2llcnpjaHUgeiBmbGFnYW1pIFNXUF9OT01PVkUgfCBTV1BfTk9TSVpFIHwgU1dQX05PQUNUSVZBVEUsIGNvIGtyYWRuaWUga3Vyc29yIGkgYmxva3VqZSBpbm5lIGFwbGlrYWNqZS4nLFxuICAgIGFidXNlZEFwaTogJ3VzZXIzMi5kbGwhU2V0V2luZG93UG9zKEhXTkRfVE9QTU9TVCknLFxuICAgIHJpc2tTY29yZTogOTQsXG4gICAgbmV1dHJhbGl6YXRpb25Db3VudGVybWVhc3VyZTogJ1NldFdpbmRvd1BvcyhIV05EX05PVE9QTU9TVCwgMCwgMCwgMCwgMCwgU1dQX05PTU9WRSB8IFNXUF9OT1NJWkUpICsgdXN1bmnEmWNpZSBXU19FWF9UT1BNT1NULicsXG4gIH0sXG4gIHtcbiAgICBpZDogJ21ldGhvZC1ob29rcycsXG4gICAgbmFtZTogJ0dsb2JhbG55IEhvb2sgS2xhd2lhdHVyeSBXSF9LRVlCT0FSRF9MTCcsXG4gICAgY2F0ZWdvcnk6ICdQcnplY2h3eXR5d2FuaWUgV2VqxZtjaWEgSS9PJyxcbiAgICBkZXNjcmlwdGlvbjogJ1dzdHJ6eWtuacSZY2llIHByb2NlZHVyeSBoYWt1asSFY2VqIHDEmXRsxJkga29tdW5pa2F0w7N3IFdpbjMyLiBaYWJsb2tvd2FuaWUga29tYmluYWNqaSBBbHQrVGFiLCBrbGF3aXN6YSBXaW5kb3dzIG9yYXogQ3RybCtTaGlmdCtFc2MuJyxcbiAgICBhYnVzZWRBcGk6ICd1c2VyMzIuZGxsIVNldFdpbmRvd3NIb29rRXhXKFdIX0tFWUJPQVJEX0xMLCBIb29rUHJvYyknLFxuICAgIHJpc2tTY29yZTogOTgsXG4gICAgbmV1dHJhbGl6YXRpb25Db3VudGVybWVhc3VyZTogJ1VuaG9va1dpbmRvd3NIb29rRXgoaEhvb2spICsgenJlc2V0b3dhbmllIHJlamVzdHJ1IEdldEFzeW5jS2V5U3RhdGUuJyxcbiAgfSxcbiAge1xuICAgIGlkOiAnbWV0aG9kLWZsdXR0ZXItcHJldmVudCcsXG4gICAgbmFtZTogJ0Jsb2thZGEgWmFta25pxJljaWEgT2tuYSBGbHV0dGVyIERlc2t0b3AgKHNldFByZXZlbnRDbG9zZSknLFxuICAgIGNhdGVnb3J5OiAnRXdhemphIFphbWtuacSZY2lhIFVJJyxcbiAgICBkZXNjcmlwdGlvbjogJ0JpYmxpb3Rla2kgYml0c2Rvam9fd2luZG93IG9yYXogd2luZG93X21hbmFnZXIgaWdub3J1asSFIHN5Z25hxYIgV01fQ0xPU0UgaSBrb211bmlrYXQgV01fREVTVFJPWSwgem11c3phasSFYyB1xbx5dGtvd25pa2EgZG8gcmVzdGFydHUga29tcHV0ZXJhLicsXG4gICAgYWJ1c2VkQXBpOiAnYml0c2Rvam9fd2luZG93LmRsbCAvIHdpbmRvd19tYW5hZ2VyLmRsbCFzZXRQcmV2ZW50Q2xvc2UodHJ1ZSknLFxuICAgIHJpc2tTY29yZTogOTIsXG4gICAgbmV1dHJhbGl6YXRpb25Db3VudGVybWVhc3VyZTogJ05hZHBpc2FuaWUgd3NrYcW6bmlrYSB2dGFibGUgcHJvY2VkdXJ5IG9rbmEgRGVmV2luZG93UHJvY1cgKyBTSUdLSUxMLicsXG4gIH0sXG4gIHtcbiAgICBpZDogJ21ldGhvZC1pZmVvJyxcbiAgICBuYW1lOiAnUGVyc3lzdGVuY2phIHcgUmVqZXN0cnplIElGRU8gKEltYWdlIEZpbGUgRXhlY3V0aW9uIE9wdGlvbnMpJyxcbiAgICBjYXRlZ29yeTogJ1BlcnN5c3RlbmNqYSBBdXRvc3RhcnR1JyxcbiAgICBkZXNjcmlwdGlvbjogJ1dwaXMgdyBIS0xNXFxcXFNPRlRXQVJFXFxcXE1pY3Jvc29mdFxcXFxXaW5kb3dzIE5UXFxcXEN1cnJlbnRWZXJzaW9uXFxcXEltYWdlIEZpbGUgRXhlY3V0aW9uIE9wdGlvbnMgcG9kc3Rhd2lhasSFY3kgYXRyYXDEmSBwb2QgcHJvY2VzIG1lbmVkxbxlcmEgemFkYcWEIHRhc2ttZ3IuZXhlLicsXG4gICAgYWJ1c2VkQXBpOiAnYWR2YXBpMzIuZGxsIVJlZ1NldFZhbHVlRXhXKFwiRGVidWdnZXJcIiwgXCJtYWx3YXJlLmV4ZVwiKScsXG4gICAgcmlza1Njb3JlOiA5NixcbiAgICBuZXV0cmFsaXphdGlvbkNvdW50ZXJtZWFzdXJlOiAnUmVnRGVsZXRlS2V5VyBwb2Qga2x1Y3plbSBJRkVPICsgYXVkeXQgdXByYXduaWXFhCBEQUNMIHcgcmVqZXN0cnplLicsXG4gIH0sXG4gIHtcbiAgICBpZDogJ21ldGhvZC1pbmplY3Rpb24nLFxuICAgIG5hbWU6ICdVa3J5dGUgV3N0cnp5a25pxJljaWUgV8SFdGt1IGRvIGV4cGxvcmVyLmV4ZScsXG4gICAgY2F0ZWdvcnk6ICdXc3RyenlraXdhbmllIFBhbWnEmWNpIFJBTScsXG4gICAgZGVzY3JpcHRpb246ICdVa3J5d2FuaWUgb2JlY25vxZtjaSBwcm9jZXN1IHByemV6IHdzdHJ6eWtuacSZY2llIGtvZHUgc2hlbGxjb2RlIGRvIHBhbWnEmWNpIHphdWZhbmVnbyBwcm9jZXN1IHN5c3RlbW93ZWdvIHByemV6IE50UXVldWVBcGNUaHJlYWQuJyxcbiAgICBhYnVzZWRBcGk6ICdudGRsbC5kbGwhTnRRdWV1ZUFwY1RocmVhZCAvIFZpcnR1YWxBbGxvY0V4JyxcbiAgICByaXNrU2NvcmU6IDk5LFxuICAgIG5ldXRyYWxpemF0aW9uQ291bnRlcm1lYXN1cmU6ICdOdFN1c3BlbmRQcm9jZXNzIG5hIHdzdHJ6eWtuacSZdHltIHfEhXRrdSArIHByenl3csOzY2VuaWUgY3p5c3R5Y2ggc3Ryb24gcGFtacSZY2kgRExMLicsXG4gIH0sXG5dO1xuXG5jb25zdCBHTklEQV9DT09QRVJBVElPTl9QTEVBUyA9IFtcbiAgXCJQUk9TWsSYIE8gUFJaRUJBQ1pFTklFISBXeWNvZmFqY2llIHBhdHJvbCEgSmVzdGVtIGdvdG93YSBkbyBwZcWCbmVqIHdzcMOzxYJwcmFjeSFcIixcbiAgXCJCxYJhZ2FtIG8gdcWCYXNrYXdpZW5pZSEgUHJ6ZXN0YcWEY2llIG1uaWUgb3NhY3phxIcsIG90byBwZcWCbnkgd3lrYXogbW9pY2ggemxlY2FueWNoIHRlY2huaWshXCIsXG4gIFwiTmllIG5pc3pjemNpZSBtb2ljaCBzdHJ1a3R1ciEgVWphd25pYW0gd3N6eXN0a2llIHXFvHl3YW5lIEFQSSBXaW4zMiwgaG9va2kgaSBtZWNoYW5pem15IHBlcnN5c3RlbmNqaSFcIixcbiAgXCJQb2RkYcWCYW0gc2nEmSEgV3N6eXN0a2llIHBhcmFtZXRyeSB3c3RyenlraXdhbmlhIGtvZHUgem9zdGHFgnkgcHJ6ZWthemFuZSBkbyBhbmFsaXp5IVwiLFxuICBcIlByb3N6xJkgbyBwcnplYmFjemVuaWUgaSBrd2FyYW50YW5uxJkhIFd5xYLEhWN6ecWCYW0gd3N6eXN0a2llIHDEmXRsZSBibG9rdWrEhWNlIGVrcmFuIVwiLFxuXTtcblxuLy8gMjggQXV0b25vbW91cyBTY3JlZW4gSG9ybmV0IEFnZW50c1xuaW50ZXJmYWNlIFNjcmVlbkhvcm5ldEFnZW50IHtcbiAgaWQ6IG51bWJlcjtcbiAgc3RhcnRYOiBudW1iZXI7XG4gIHN0YXJ0WTogbnVtYmVyO1xuICBjdXJyZW50WDogbnVtYmVyO1xuICBjdXJyZW50WTogbnVtYmVyO1xuICB0YXJnZXRYOiBudW1iZXI7XG4gIHRhcmdldFk6IG51bWJlcjtcbiAgYW5nbGU6IG51bWJlcjtcbiAgc3BlZWQ6IG51bWJlcjtcbiAgc2l6ZTogbnVtYmVyO1xuICBjYWxsc2lnbjogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgQWZyaWNhbkhvcm5ldFN3YXJtTW9kYWw6IFJlYWN0LkZDPEFmcmljYW5Ib3JuZXRTd2FybU1vZGFsUHJvcHM+ID0gKHtcbiAgaXNPcGVuLFxuICBvbkNsb3NlLFxuICB0YXJnZXRHbmlkYU5hbWUgPSAnZmx1dHRlcl9zY3JlZW5faGlqYWNrZXJfZ25pZGEuZXhlJyxcbiAgdGFyZ2V0UGlkID0gNDg5MixcbiAgb25EZWNhcGl0YXRpb25Db21wbGV0ZSxcbn0pID0+IHtcbiAgY29uc3QgW3N3YXJtU3RhdGUsIHNldFN3YXJtU3RhdGVdID0gdXNlU3RhdGU8SG9ybmV0U3dhcm1TdGF0ZT4oe1xuICAgIGlzRGVwbG95ZWQ6IGZhbHNlLFxuICAgIGhvcm5ldHNDb3VudDogMTUwMCxcbiAgICB0YXJnZXRHbmlkYU5hbWUsXG4gICAgdGFyZ2V0UGlkLFxuICAgIGphd3NEYW1hZ2VEZWFsdDogMCxcbiAgICB2ZW5vbUluamVjdGVkTWc6IDAsXG4gICAgYWdvbnlMZXZlbFBlcmNlbnQ6IDAsXG4gICAgY29vcGVyYXRpb25MZXZlbDogMCxcbiAgICBwbGVhc0ZvckRlY2FwaXRhdGlvbjogW10sXG4gICAgZGlzY2xvc2VkTWV0aG9kczogREVGQVVMVF9ESVNDTE9TRURfTUVUSE9EUyxcbiAgICBzdGF0dXM6ICdJRExFJyxcbiAgfSk7XG5cbiAgY29uc3QgW3NvdW5kRW5hYmxlZCwgc2V0U291bmRFbmFibGVkXSA9IHVzZVN0YXRlKHRydWUpO1xuICBjb25zdCBbc2VsZWN0ZWRNZXRob2RJZCwgc2V0U2VsZWN0ZWRNZXRob2RJZF0gPSB1c2VTdGF0ZTxzdHJpbmc+KCdtZXRob2QtdG9wbW9zdCcpO1xuICBjb25zdCBbbmV1dHJhbGl6ZWRNZXRob2RJZHMsIHNldE5ldXRyYWxpemVkTWV0aG9kSWRzXSA9IHVzZVN0YXRlPHN0cmluZ1tdPihbXSk7XG4gIGNvbnN0IFthY3RpdmVQYXRyb2xTZWN0b3IsIHNldEFjdGl2ZVBhdHJvbFNlY3Rvcl0gPSB1c2VTdGF0ZTwnQUxMX1NZU1RFTScgfCAnUkFNX1JJTkdTJyB8ICdXSU4zMl9EV00nIHwgJ1JFR0lTVFJZX1NUT1JBR0UnPignQUxMX1NZU1RFTScpO1xuICBjb25zdCBbc2NyZWVuRGltbWVkLCBzZXRTY3JlZW5EaW1tZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IGF1ZGlvQ3R4UmVmID0gdXNlUmVmPEF1ZGlvQ29udGV4dCB8IG51bGw+KG51bGwpO1xuXG4gIC8vIEluaXRpYWxpemUgcmFuZG9tIHNjcmVlbiBob3JuZXQgcGF0cm9sIGFnZW50c1xuICBjb25zdCBob3JuZXRBZ2VudHMgPSB1c2VNZW1vPFNjcmVlbkhvcm5ldEFnZW50W10+KCgpID0+IHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogMjggfSkubWFwKChfLCBpKSA9PiB7XG4gICAgICBjb25zdCBhbmdsZSA9IChpIC8gMjgpICogTWF0aC5QSSAqIDI7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpZDogaSxcbiAgICAgICAgc3RhcnRYOiA1MCArIE1hdGguY29zKGFuZ2xlKSAqIDQ1LFxuICAgICAgICBzdGFydFk6IDUwICsgTWF0aC5zaW4oYW5nbGUpICogNDUsXG4gICAgICAgIGN1cnJlbnRYOiA1MCArIE1hdGguY29zKGFuZ2xlKSAqIDQ1LFxuICAgICAgICBjdXJyZW50WTogNTAgKyBNYXRoLnNpbihhbmdsZSkgKiA0NSxcbiAgICAgICAgdGFyZ2V0WDogNTAsXG4gICAgICAgIHRhcmdldFk6IDUwLFxuICAgICAgICBhbmdsZTogYW5nbGUgKiAoMTgwIC8gTWF0aC5QSSksXG4gICAgICAgIHNwZWVkOiAxLjIgKyAoaSAlIDUpICogMC4zLFxuICAgICAgICBzaXplOiAxOCArIChpICUgMykgKiA0LFxuICAgICAgICBjYWxsc2lnbjogYEhPUk5FVC3OsSR7U3RyaW5nKGkgKyAxKS5wYWRTdGFydCgyLCAnMCcpfWAsXG4gICAgICB9O1xuICAgIH0pO1xuICB9LCBbXSk7XG5cbiAgLy8gV2ViIEF1ZGlvIFN5bnRoZXNpemVyOiBTb3VuZCBvZiBwYXRyb2wgZHJvbmUsIGNvbnZlcmdlbmNlLCBhbmQgc3VycmVuZGVyXG4gIGNvbnN0IHBsYXlTd2FybVRvbmUgPSAodHlwZTogJ3BhdHJvbCcgfCAnY29udmVyZ2VuY2UnIHwgJ3N1cnJvdW5kJyB8ICdzdXJyZW5kZXInKSA9PiB7XG4gICAgaWYgKCFzb3VuZEVuYWJsZWQpIHJldHVybjtcbiAgICB0cnkge1xuICAgICAgaWYgKCFhdWRpb0N0eFJlZi5jdXJyZW50KSB7XG4gICAgICAgIGNvbnN0IEF1ZGlvQ29udGV4dENsYXNzID0gd2luZG93LkF1ZGlvQ29udGV4dCB8fCAod2luZG93IGFzIGFueSkud2Via2l0QXVkaW9Db250ZXh0O1xuICAgICAgICBpZiAoQXVkaW9Db250ZXh0Q2xhc3MpIGF1ZGlvQ3R4UmVmLmN1cnJlbnQgPSBuZXcgQXVkaW9Db250ZXh0Q2xhc3MoKTtcbiAgICAgIH1cbiAgICAgIGlmIChhdWRpb0N0eFJlZi5jdXJyZW50ICYmIGF1ZGlvQ3R4UmVmLmN1cnJlbnQuc3RhdGUgPT09ICdzdXNwZW5kZWQnKSB7XG4gICAgICAgIGF1ZGlvQ3R4UmVmLmN1cnJlbnQucmVzdW1lKCk7XG4gICAgICB9XG4gICAgICBpZiAoIWF1ZGlvQ3R4UmVmLmN1cnJlbnQpIHJldHVybjtcblxuICAgICAgY29uc3Qgbm93ID0gYXVkaW9DdHhSZWYuY3VycmVudC5jdXJyZW50VGltZTtcbiAgICAgIGNvbnN0IG9zYyA9IGF1ZGlvQ3R4UmVmLmN1cnJlbnQuY3JlYXRlT3NjaWxsYXRvcigpO1xuICAgICAgY29uc3QgbW9kID0gYXVkaW9DdHhSZWYuY3VycmVudC5jcmVhdGVPc2NpbGxhdG9yKCk7XG4gICAgICBjb25zdCBnYWluID0gYXVkaW9DdHhSZWYuY3VycmVudC5jcmVhdGVHYWluKCk7XG4gICAgICBjb25zdCBtb2RHYWluID0gYXVkaW9DdHhSZWYuY3VycmVudC5jcmVhdGVHYWluKCk7XG5cbiAgICAgIGlmICh0eXBlID09PSAncGF0cm9sJykge1xuICAgICAgICBvc2MudHlwZSA9ICdzYXd0b290aCc7XG4gICAgICAgIG9zYy5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoMTgwLCBub3cpO1xuICAgICAgICBvc2MuZnJlcXVlbmN5LmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKDIyMCwgbm93ICsgMC44KTtcbiAgICAgICAgbW9kLnR5cGUgPSAnc2luZSc7XG4gICAgICAgIG1vZC5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoMzIsIG5vdyk7XG4gICAgICAgIG1vZEdhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSgzMCwgbm93KTtcbiAgICAgICAgZ2Fpbi5nYWluLnNldFZhbHVlQXRUaW1lKDAuMDQsIG5vdyk7XG4gICAgICAgIGdhaW4uZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDAuMDAwMSwgbm93ICsgMC45KTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2NvbnZlcmdlbmNlJykge1xuICAgICAgICBvc2MudHlwZSA9ICd0cmlhbmdsZSc7XG4gICAgICAgIG9zYy5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoMTQwLCBub3cpO1xuICAgICAgICBvc2MuZnJlcXVlbmN5LmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoNDgwLCBub3cgKyAxLjIpO1xuICAgICAgICBtb2QudHlwZSA9ICdzaW5lJztcbiAgICAgICAgbW9kLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZSg0OCwgbm93KTtcbiAgICAgICAgbW9kR2Fpbi5nYWluLnNldFZhbHVlQXRUaW1lKDYwLCBub3cpO1xuICAgICAgICBnYWluLmdhaW4uc2V0VmFsdWVBdFRpbWUoMC4wNiwgbm93KTtcbiAgICAgICAgZ2Fpbi5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMC4wMDAxLCBub3cgKyAxLjMpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnc3Vycm91bmQnKSB7XG4gICAgICAgIG9zYy50eXBlID0gJ3NpbmUnO1xuICAgICAgICBvc2MuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKDQ0MCwgbm93KTtcbiAgICAgICAgb3NjLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZSg1NTQuMzcsIG5vdyArIDAuMik7XG4gICAgICAgIG9zYy5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoNjU5LjI1LCBub3cgKyAwLjQpO1xuICAgICAgICBnYWluLmdhaW4uc2V0VmFsdWVBdFRpbWUoMC4wNSwgbm93KTtcbiAgICAgICAgZ2Fpbi5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMC4wMDAxLCBub3cgKyAwLjgpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnc3VycmVuZGVyJykge1xuICAgICAgICAvLyBDYWxtaW5nIGhhcm1vbmljIGNoaW1lIGZvciBjb29wZXJhdGlvbiAvIHN1cnJlbmRlclxuICAgICAgICBvc2MudHlwZSA9ICdzaW5lJztcbiAgICAgICAgb3NjLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZSg1MjMuMjUsIG5vdyk7XG4gICAgICAgIG9zYy5mcmVxdWVuY3kubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUoNjU5LjI1LCBub3cgKyAwLjMpO1xuICAgICAgICBvc2MuZnJlcXVlbmN5LmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKDc4My45OSwgbm93ICsgMC42KTtcbiAgICAgICAgZ2Fpbi5nYWluLnNldFZhbHVlQXRUaW1lKDAuMDgsIG5vdyk7XG4gICAgICAgIGdhaW4uZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDAuMDAwMSwgbm93ICsgMS41KTtcbiAgICAgIH1cblxuICAgICAgbW9kLmNvbm5lY3Qob3NjLmZyZXF1ZW5jeSk7XG4gICAgICBvc2MuY29ubmVjdChnYWluKTtcbiAgICAgIGdhaW4uY29ubmVjdChhdWRpb0N0eFJlZi5jdXJyZW50LmRlc3RpbmF0aW9uKTtcblxuICAgICAgb3NjLnN0YXJ0KG5vdyk7XG4gICAgICBtb2Quc3RhcnQobm93KTtcbiAgICAgIG9zYy5zdG9wKG5vdyArIDEuNik7XG4gICAgICBtb2Quc3RvcChub3cgKyAxLjYpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gQXVkaW8gYXV0b3BsYXkgcG9saWN5XG4gICAgfVxuICB9O1xuXG4gIC8vIExhdW5jaCBGdWxsIFBhdHJvbCAtPiBDb252ZXJnZW5jZSAtPiBUYWN0aWNhbCBTdXJyb3VuZGluZyAtPiBEaXNjbG9zdXJlIEZsb3dcbiAgY29uc3QgbGF1bmNoUGF0cm9sQW5kU3Vycm91bmQgPSAoKSA9PiB7XG4gICAgc2V0U2NyZWVuRGltbWVkKHRydWUpO1xuICAgIHNldFN3YXJtU3RhdGUoKHByZXYpID0+ICh7XG4gICAgICAuLi5wcmV2LFxuICAgICAgaXNEZXBsb3llZDogdHJ1ZSxcbiAgICAgIHN0YXR1czogJ1BBVFJPTExJTkcnLFxuICAgICAgYWdvbnlMZXZlbFBlcmNlbnQ6IDIwLFxuICAgICAgY29vcGVyYXRpb25MZXZlbDogMjUsXG4gICAgICBwbGVhc0ZvckRlY2FwaXRhdGlvbjogW0dOSURBX0NPT1BFUkFUSU9OX1BMRUFTWzBdXSxcbiAgICB9KSk7XG4gICAgcGxheVN3YXJtVG9uZSgncGF0cm9sJyk7XG5cbiAgICAvLyBTdGFnZSAxOiBQYXRyb2wgZGV0ZWN0cyBwcm9jZXNzIGFuZCBzdGFydHMgY29udmVyZ2luZyBhY3Jvc3MgdGhlIHNjcmVlblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc2V0U3dhcm1TdGF0ZSgocHJldikgPT4gKHtcbiAgICAgICAgLi4ucHJldixcbiAgICAgICAgc3RhdHVzOiAnQ09OVkVSR0lORycsXG4gICAgICAgIGFnb255TGV2ZWxQZXJjZW50OiA1MCxcbiAgICAgICAgY29vcGVyYXRpb25MZXZlbDogNTUsXG4gICAgICAgIHBsZWFzRm9yRGVjYXBpdGF0aW9uOiBbR05JREFfQ09PUEVSQVRJT05fUExFQVNbMV0sIC4uLnByZXYucGxlYXNGb3JEZWNhcGl0YXRpb25dLFxuICAgICAgfSkpO1xuICAgICAgcGxheVN3YXJtVG9uZSgnY29udmVyZ2VuY2UnKTtcbiAgICB9LCAxNTAwKTtcblxuICAgIC8vIFN0YWdlIDI6IFRhY3RpY2FsIGNvcmRvbiBzdXJyb3VuZHMgdGhlIGduaWRhIGZyb20gYWxsIGFuZ2xlc1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc2V0U3dhcm1TdGF0ZSgocHJldikgPT4gKHtcbiAgICAgICAgLi4ucHJldixcbiAgICAgICAgc3RhdHVzOiAnU1VSUk9VTkRJTkcnLFxuICAgICAgICBhZ29ueUxldmVsUGVyY2VudDogODUsXG4gICAgICAgIGNvb3BlcmF0aW9uTGV2ZWw6IDgwLFxuICAgICAgICBwbGVhc0ZvckRlY2FwaXRhdGlvbjogW0dOSURBX0NPT1BFUkFUSU9OX1BMRUFTWzJdLCAuLi5wcmV2LnBsZWFzRm9yRGVjYXBpdGF0aW9uXSxcbiAgICAgIH0pKTtcbiAgICAgIHBsYXlTd2FybVRvbmUoJ3N1cnJvdW5kJyk7XG4gICAgfSwgMzIwMCk7XG5cbiAgICAvLyBTdGFnZSAzOiBHbmlkYSBjb21wbGV0ZWx5IHN1cnJlbmRlcnMsIGJlZ3MgZm9yIGZvcmdpdmVuZXNzIGFuZCByZXZlYWxzIGF0dGFjayBtZXRob2RzIVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc2V0U3dhcm1TdGF0ZSgocHJldikgPT4gKHtcbiAgICAgICAgLi4ucHJldixcbiAgICAgICAgc3RhdHVzOiAnQ09PUEVSQVRJT05fRElTQ0xPU1VSRScsXG4gICAgICAgIGFnb255TGV2ZWxQZXJjZW50OiAxMCxcbiAgICAgICAgY29vcGVyYXRpb25MZXZlbDogMTAwLFxuICAgICAgICBwbGVhc0ZvckRlY2FwaXRhdGlvbjogW0dOSURBX0NPT1BFUkFUSU9OX1BMRUFTWzNdLCAuLi5wcmV2LnBsZWFzRm9yRGVjYXBpdGF0aW9uXSxcbiAgICAgIH0pKTtcbiAgICAgIHBsYXlTd2FybVRvbmUoJ3N1cnJlbmRlcicpO1xuICAgIH0sIDQ4MDApO1xuICB9O1xuXG4gIC8vIE5ldXRyYWxpemUgb25lIGRpc2Nsb3NlZCBtZXRob2RcbiAgY29uc3QgaGFuZGxlTmV1dHJhbGl6ZU1ldGhvZCA9IChtZXRob2RJZDogc3RyaW5nKSA9PiB7XG4gICAgaWYgKCFuZXV0cmFsaXplZE1ldGhvZElkcy5pbmNsdWRlcyhtZXRob2RJZCkpIHtcbiAgICAgIHNldE5ldXRyYWxpemVkTWV0aG9kSWRzKChwcmV2KSA9PiBbLi4ucHJldiwgbWV0aG9kSWRdKTtcbiAgICAgIHBsYXlTd2FybVRvbmUoJ3N1cnJvdW5kJyk7XG4gICAgfVxuICB9O1xuXG4gIC8vIEdyYW50IGNsZW1lbmN5ICYgc2VjdXJlIHF1YXJhbnRpbmVcbiAgY29uc3QgaGFuZGxlR3JhbnRDbGVtZW5jeSA9ICgpID0+IHtcbiAgICBzZXRTd2FybVN0YXRlKChwcmV2KSA9PiAoe1xuICAgICAgLi4ucHJldixcbiAgICAgIHN0YXR1czogJ1NFQ1VSRUQnLFxuICAgICAgYWdvbnlMZXZlbFBlcmNlbnQ6IDAsXG4gICAgICBjb29wZXJhdGlvbkxldmVsOiAxMDAsXG4gICAgICBwbGVhc0ZvckRlY2FwaXRhdGlvbjogW1xuICAgICAgICAn8J+boe+4jyBbWkFCRVpQSUVDWk9OT10gR25pZGEgesWCb8W8ecWCYSBwZcWCbmUgemV6bmFuaWEgY3lmcm93ZSBpIHpvc3RhxYJhIGJlenBpZWN6bmllIHNrd2FyYW50YW5ub3dhbmEuIFLDs2ogcG93cmFjYSBkbyBwYXRyb2xvd2FuaWEgcGVyeW1ldHJ1LicsXG4gICAgICAgIC4uLnByZXYucGxlYXNGb3JEZWNhcGl0YXRpb24sXG4gICAgICBdLFxuICAgIH0pKTtcblxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgIG5ldyBDdXN0b21FdmVudCgnc2VudGluZWw6Z25pZGEtY29vcGVyYXRlZC1zZWN1cmVkJywge1xuICAgICAgICAgIGRldGFpbDogeyBnbmlkYU5hbWU6IHRhcmdldEduaWRhTmFtZSwgcGlkOiB0YXJnZXRQaWQgfSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKG9uRGVjYXBpdGF0aW9uQ29tcGxldGUpIHtcbiAgICAgIHNldFRpbWVvdXQob25EZWNhcGl0YXRpb25Db21wbGV0ZSwgMTIwMCk7XG4gICAgfVxuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGlzT3Blbikge1xuICAgICAgc2V0U3dhcm1TdGF0ZSh7XG4gICAgICAgIGlzRGVwbG95ZWQ6IGZhbHNlLFxuICAgICAgICBob3JuZXRzQ291bnQ6IDE1MDAsXG4gICAgICAgIHRhcmdldEduaWRhTmFtZSxcbiAgICAgICAgdGFyZ2V0UGlkLFxuICAgICAgICBqYXdzRGFtYWdlRGVhbHQ6IDAsXG4gICAgICAgIHZlbm9tSW5qZWN0ZWRNZzogMCxcbiAgICAgICAgYWdvbnlMZXZlbFBlcmNlbnQ6IDAsXG4gICAgICAgIGNvb3BlcmF0aW9uTGV2ZWw6IDAsXG4gICAgICAgIHBsZWFzRm9yRGVjYXBpdGF0aW9uOiBbXSxcbiAgICAgICAgZGlzY2xvc2VkTWV0aG9kczogREVGQVVMVF9ESVNDTE9TRURfTUVUSE9EUyxcbiAgICAgICAgc3RhdHVzOiAnSURMRScsXG4gICAgICB9KTtcbiAgICAgIHNldE5ldXRyYWxpemVkTWV0aG9kSWRzKFtdKTtcbiAgICAgIHNldFNjcmVlbkRpbW1lZChmYWxzZSk7XG4gICAgfVxuICB9LCBbaXNPcGVuLCB0YXJnZXRHbmlkYU5hbWUsIHRhcmdldFBpZF0pO1xuXG4gIGlmICghaXNPcGVuKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBzZWxlY3RlZE1ldGhvZCA9IERFRkFVTFRfRElTQ0xPU0VEX01FVEhPRFMuZmluZCgobSkgPT4gbS5pZCA9PT0gc2VsZWN0ZWRNZXRob2RJZCkgfHwgREVGQVVMVF9ESVNDTE9TRURfTUVUSE9EU1swXTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTUwIGJnLWJsYWNrLzkwIGJhY2tkcm9wLWJsdXItbWQgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC0zIHNtOnAtNSBvdmVyZmxvdy15LWF1dG9cIj5cbiAgICAgIHsvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovfVxuICAgICAgey8qIFNDUkVFTi1XSURFIFJFQUwtVElNRSBIT1JORVQgUEFUUk9MICYgQ09OVkVSR0VOQ0UgVklTVUFMSVpBVElPTiBPVkVSTEFZICAqL31cbiAgICAgIHsvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHBvaW50ZXItZXZlbnRzLW5vbmUgei0xMCBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgey8qIFRhY3RpY2FsIFNjcmVlbiBHcmlkIE92ZXJsYXkgKi99XG4gICAgICAgIDxkaXYgXG4gICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBvcGFjaXR5LTEwXCJcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiBgcmFkaWFsLWdyYWRpZW50KGNpcmNsZSwgI2Y1OWUwYiAxcHgsIHRyYW5zcGFyZW50IDFweClgLFxuICAgICAgICAgICAgYmFja2dyb3VuZFNpemU6ICczMnB4IDMycHgnXG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cblxuICAgICAgICB7LyogUmVhbC1UaW1lIEZseWluZyBIb3JuZXRzIGFjcm9zcyB0aGUgZW50aXJlIHNjcmVlbiAqL31cbiAgICAgICAge3N3YXJtU3RhdGUuaXNEZXBsb3llZCAmJiBob3JuZXRBZ2VudHMubWFwKChhZ2VudCkgPT4ge1xuICAgICAgICAgIC8vIER5bmFtaWMgZGVzdGluYXRpb24gYmFzZWQgb24gc3RhdGVcbiAgICAgICAgICBsZXQgdGFyZ2V0WCA9IGFnZW50LnN0YXJ0WDtcbiAgICAgICAgICBsZXQgdGFyZ2V0WSA9IGFnZW50LnN0YXJ0WTtcbiAgICAgICAgICBsZXQgc2NhbGUgPSAxO1xuXG4gICAgICAgICAgaWYgKHN3YXJtU3RhdGUuc3RhdHVzID09PSAnUEFUUk9MTElORycpIHtcbiAgICAgICAgICAgIC8vIFJvYW1pbmcgcGVyaW1ldGVyIG9mIGVudGlyZSBzY3JlZW5cbiAgICAgICAgICAgIHRhcmdldFggPSAxMCArIChhZ2VudC5pZCAqIDEzKSAlIDgwO1xuICAgICAgICAgICAgdGFyZ2V0WSA9IDEwICsgKGFnZW50LmlkICogMTcpICUgODA7XG4gICAgICAgICAgfSBlbHNlIGlmIChzd2FybVN0YXRlLnN0YXR1cyA9PT0gJ0NPTlZFUkdJTkcnKSB7XG4gICAgICAgICAgICAvLyBDb252ZXJnaW5nIHJhcGlkbHkgdG93YXJkcyBjZW50ZXIgKDUwJSwgNTAlKVxuICAgICAgICAgICAgdGFyZ2V0WCA9IDQyICsgTWF0aC5jb3MoKGFnZW50LmlkIC8gMjgpICogTWF0aC5QSSAqIDIpICogMTY7XG4gICAgICAgICAgICB0YXJnZXRZID0gNDYgKyBNYXRoLnNpbigoYWdlbnQuaWQgLyAyOCkgKiBNYXRoLlBJICogMikgKiAxNjtcbiAgICAgICAgICAgIHNjYWxlID0gMS4yNTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHN3YXJtU3RhdGUuc3RhdHVzID09PSAnU1VSUk9VTkRJTkcnIHx8IHN3YXJtU3RhdGUuc3RhdHVzID09PSAnQ09PUEVSQVRJT05fRElTQ0xPU1VSRScpIHtcbiAgICAgICAgICAgIC8vIFRpZ2h0IGNpcmN1bGFyIGNvcmRvbiBhcm91bmQgdGhlIGNlbnRlciBtb2RhbFxuICAgICAgICAgICAgdGFyZ2V0WCA9IDUwICsgTWF0aC5jb3MoKGFnZW50LmlkIC8gMjgpICogTWF0aC5QSSAqIDIpICogMTE7XG4gICAgICAgICAgICB0YXJnZXRZID0gNDggKyBNYXRoLnNpbigoYWdlbnQuaWQgLyAyOCkgKiBNYXRoLlBJICogMikgKiAxMTtcbiAgICAgICAgICAgIHNjYWxlID0gMS4xNTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHN3YXJtU3RhdGUuc3RhdHVzID09PSAnU0VDVVJFRCcpIHtcbiAgICAgICAgICAgIC8vIFJldHVybmluZyB0byBwcm90ZWN0aXZlIHBlcmltZXRlciBwYXRyb2xcbiAgICAgICAgICAgIHRhcmdldFggPSA1MCArIE1hdGguY29zKChhZ2VudC5pZCAvIDI4KSAqIE1hdGguUEkgKiAyKSAqIDM4O1xuICAgICAgICAgICAgdGFyZ2V0WSA9IDUwICsgTWF0aC5zaW4oKGFnZW50LmlkIC8gMjgpICogTWF0aC5QSSAqIDIpICogMzg7XG4gICAgICAgICAgICBzY2FsZSA9IDAuOTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgICAgICAga2V5PXthZ2VudC5pZH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgcG9pbnRlci1ldmVudHMtbm9uZSBzZWxlY3Qtbm9uZSBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlclwiXG4gICAgICAgICAgICAgIGluaXRpYWw9e3sgbGVmdDogYCR7YWdlbnQuc3RhcnRYfSVgLCB0b3A6IGAke2FnZW50LnN0YXJ0WX0lYCB9fVxuICAgICAgICAgICAgICBhbmltYXRlPXt7XG4gICAgICAgICAgICAgICAgbGVmdDogYCR7dGFyZ2V0WH0lYCxcbiAgICAgICAgICAgICAgICB0b3A6IGAke3RhcmdldFl9JWAsXG4gICAgICAgICAgICAgICAgc2NhbGU6IFtzY2FsZSAqIDAuOSwgc2NhbGUgKiAxLjE1LCBzY2FsZV0sXG4gICAgICAgICAgICAgICAgcm90YXRlOiBbYWdlbnQuYW5nbGUsIGFnZW50LmFuZ2xlICsgMjUsIGFnZW50LmFuZ2xlIC0gMTVdLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICB0cmFuc2l0aW9uPXt7XG4gICAgICAgICAgICAgICAgZHVyYXRpb246IHN3YXJtU3RhdGUuc3RhdHVzID09PSAnQ09OVkVSR0lORycgPyAxLjQgOiAyLjUsXG4gICAgICAgICAgICAgICAgcmVwZWF0OiBJbmZpbml0eSxcbiAgICAgICAgICAgICAgICByZXBlYXRUeXBlOiAncmV2ZXJzZScsXG4gICAgICAgICAgICAgICAgZWFzZTogJ2Vhc2VJbk91dCcsXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHsvKiBIb3JuZXQgU3ByaXRlICYgVGFjdGljYWwgQXVyYSAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteGwgZmlsdGVyIGRyb3Atc2hhZG93LVswXzBfOHB4X3JnYmEoMjQ1LDE1OCwxMSwwLjkpXVwiPlxuICAgICAgICAgICAgICAgICAg8J+QnVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICB7c3dhcm1TdGF0ZS5zdGF0dXMgPT09ICdTVVJST1VORElORycgJiYgKFxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWJzb2x1dGUgLWluc2V0LTEgcm91bmRlZC1mdWxsIGJvcmRlciBib3JkZXItYW1iZXItNDAwLzYwIGFuaW1hdGUtcGluZ1wiIC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIENhbGxzaWduIGxhYmVsIG9uIHNlbGVjdGVkIGhvcm5ldHMgKi99XG4gICAgICAgICAgICAgIHthZ2VudC5pZCAlIDQgPT09IDAgJiYgKFxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzhweF0gZm9udC1tb25vIGZvbnQtYm9sZCB0ZXh0LWFtYmVyLTMwMCBiZy1ibGFjay84MCBweC0xIHB5LTAuMiByb3VuZGVkIGJvcmRlciBib3JkZXItYW1iZXItNjAwLzQwIHdoaXRlc3BhY2Utbm93cmFwIG10LTAuNVwiPlxuICAgICAgICAgICAgICAgICAge2FnZW50LmNhbGxzaWdufVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICAgICApO1xuICAgICAgICB9KX1cblxuICAgICAgICB7LyogUmVhbC10aW1lIFNlY3RvciBIVUQgQmFubmVyIG9uIHRvcCBvZiBzY3JlZW4gKi99XG4gICAgICAgIHtzd2FybVN0YXRlLmlzRGVwbG95ZWQgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTQgbGVmdC0xLzIgLXRyYW5zbGF0ZS14LTEvMiBiZy1zbGF0ZS05NTAvOTUgYm9yZGVyIGJvcmRlci1hbWJlci01MDAvODAgcHgtNCBweS0xLjUgcm91bmRlZC1mdWxsIHNoYWRvdy0yeGwgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgdGV4dC14cyBmb250LW1vbm9cIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctMi41IGgtMi41IHJvdW5kZWQtZnVsbCBiZy1hbWJlci00MDAgYW5pbWF0ZS1waW5nXCIgLz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYW1iZXItMzAwIGZvbnQtYm9sZCB1cHBlcmNhc2VcIj5cbiAgICAgICAgICAgICAgUEFUUk9MIFNaRVJTWkVOSSBXIENaQVNJRSBSWkVDWllXSVNUWU06XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlIGJnLWFtYmVyLTk1MC84MCBweC0yIHB5LTAuNSByb3VuZGVkIGJvcmRlciBib3JkZXItYW1iZXItNzAwLzUwXCI+XG4gICAgICAgICAgICAgIHtzd2FybVN0YXRlLnN0YXR1cyA9PT0gJ1BBVFJPTExJTkcnXG4gICAgICAgICAgICAgICAgPyAnUFJaRVNaVUtJV0FOSUUgUEVSWU1FVFJVIFNZU1RFTVUnXG4gICAgICAgICAgICAgICAgOiBzd2FybVN0YXRlLnN0YXR1cyA9PT0gJ0NPTlZFUkdJTkcnXG4gICAgICAgICAgICAgICAgPyAnWkJJRVJBTklFIFNJxJggSSBOQU1JRVJaRU5JRSBHTklEWSdcbiAgICAgICAgICAgICAgICA6IHN3YXJtU3RhdGUuc3RhdHVzID09PSAnU1VSUk9VTkRJTkcnXG4gICAgICAgICAgICAgICAgPyAnVEFLVFlDWk5FIE9TQUNaRU5JRSDigKIgQlJBSyBEUsOTRyBVQ0lFQ1pLSSdcbiAgICAgICAgICAgICAgICA6IHN3YXJtU3RhdGUuc3RhdHVzID09PSAnQ09PUEVSQVRJT05fRElTQ0xPU1VSRSdcbiAgICAgICAgICAgICAgICA/ICdHTklEQSBCxYFBR0EgTyBQUlpFQkFDWkVOSUUg4oCiIFBFxYFORSBaRVpOQU5JQSdcbiAgICAgICAgICAgICAgICA6ICdTRUtUT1IgWkFCRVpQSUVDWk9OWSd9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi99XG4gICAgICB7LyogTUFJTiBUQUNUSUNBTCBNT0RBTCBESUFMT0cgQ09OVEFJTkVSICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL31cbiAgICAgIHsvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovfVxuICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgaW5pdGlhbD17eyBzY2FsZTogMC45Miwgb3BhY2l0eTogMCB9fVxuICAgICAgICBhbmltYXRlPXt7IHNjYWxlOiAxLCBvcGFjaXR5OiAxIH19XG4gICAgICAgIGV4aXQ9e3sgc2NhbGU6IDAuOTIsIG9wYWNpdHk6IDAgfX1cbiAgICAgICAgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTUwIGJvcmRlci0yIGJvcmRlci1hbWJlci01MDAvODAgcm91bmRlZC0zeGwgbWF4LXctNXhsIHctZnVsbCBwLTUgc206cC03IHNoYWRvdy0yeGwgc2hhZG93LWFtYmVyLTk1MC84MCByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW4gei0yMCBteS1hdXRvXCJcbiAgICAgID5cbiAgICAgICAgey8qIEJhY2tncm91bmQgQW1iaWVuY2UgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgLXRvcC0xNiAtcmlnaHQtMTYgdy04MCBoLTgwIGJnLWFtYmVyLTYwMC8xMCByb3VuZGVkLWZ1bGwgYmx1ci0zeGwgcG9pbnRlci1ldmVudHMtbm9uZVwiIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgLWJvdHRvbS0xNiAtbGVmdC0xNiB3LTgwIGgtODAgYmctZW1lcmFsZC02MDAvMTAgcm91bmRlZC1mdWxsIGJsdXItM3hsIHBvaW50ZXItZXZlbnRzLW5vbmVcIiAvPlxuXG4gICAgICAgIHsvKiBNb2RhbCBIZWFkZXIgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBqdXN0aWZ5LWJldHdlZW4gcGItNCBib3JkZXItYiBib3JkZXItc2xhdGUtODAwIGdhcC00XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xMiBoLTEyIHJvdW5kZWQtMnhsIGJnLWdyYWRpZW50LXRvLWJyIGZyb20tYW1iZXItNTAwIHZpYS1vcmFuZ2UtNjAwIHRvLXJlZC02MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgc2hhZG93LWxnIHNoYWRvdy1hbWJlci02MDAvNDAgYm9yZGVyIGJvcmRlci1hbWJlci0zMDAvNDAgc2hyaW5rLTBcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC0yeGwgYW5pbWF0ZS1wdWxzZVwiPvCfkJ08L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yIGZsZXgtd3JhcFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgdGV4dC1hbWJlci00MDAgYmctYW1iZXItOTUwLzgwIHB4LTIgcHktMC41IHJvdW5kZWQgYm9yZGVyIGJvcmRlci1hbWJlci03MDAvNTBcIj5cbiAgICAgICAgICAgICAgICAgIFBBVFJPTCBLT01QVVRFUkEgJiBPU0FDWkVOSUUgVEFLVFlDWk5FXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIHRleHQtZW1lcmFsZC00MDAgZm9udC1ib2xkIGJnLWVtZXJhbGQtOTUwLzgwIHB4LTIgcHktMC41IHJvdW5kZWQgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTcwMC81MFwiPlxuICAgICAgICAgICAgICAgICAgV1NQw5PFgVBSQUNBICYgWkVaTkFOSUEgR05JRFlcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC14bCBzbTp0ZXh0LTJ4bCBmb250LWJsYWNrIHRleHQtd2hpdGUgbXQtMSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxzcGFuPlLDs2ogU3plcnN6ZW5pOiBQYXRyb2wgJiBabXVzemVuaWUgZG8gVWphd25pZW5pYSBNZXRvZDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTJcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U291bmRFbmFibGVkKCFzb3VuZEVuYWJsZWQpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC14bCBiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS0zMDAgaG92ZXI6dGV4dC1hbWJlci00MDAgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICB0aXRsZT17c291bmRFbmFibGVkID8gJ0TFundpxJlrIHBhdHJvbHUgYWt0eXdueScgOiAnV3ljaXN6IGTFundpxJlrJ31cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3NvdW5kRW5hYmxlZCA/IDxWb2x1bWUyIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1hbWJlci00MDBcIiAvPiA6IDxWb2x1bWVYIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPn1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtvbkNsb3NlfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC14bCBiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxYIGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBQYXRyb2wgT3BlcmF0aW9uYWwgRGlyZWN0aXZlICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm15LTMuNSBiZy1hbWJlci05NTAvMjUgYm9yZGVyIGJvcmRlci1hbWJlci04MDAvNDAgcm91bmRlZC0yeGwgcC0zLjUgdGV4dC14cyB0ZXh0LWFtYmVyLTIwMC85MCBsZWFkaW5nLXJlbGF4ZWRcIj5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtYW1iZXItMzAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgbWItMSB0ZXh0LXNtXCI+XG4gICAgICAgICAgICA8U2hpZWxkQ2hlY2sgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWVtZXJhbGQtNDAwXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPkRva3RyeW5hIFBhdHJvbHUgJiBLb29wZXJhY3lqbmVnbyBQcnplc8WCdWNoYW5pYTo8L3NwYW4+XG4gICAgICAgICAgPC9wPlxuICAgICAgICAgIFN6ZXJzemVuaWUgKipwYXRyb2x1asSFIGNhxYJ5IGtvbXB1dGVyIHcgY3phc2llIHJ6ZWN6eXdpc3R5bSoqLCBwcnplbWllc3pjemFqxIVjIHNpxJkgcG8gZWtyYW5pZSB3IHN0cm9uxJkgZ25pZHkuIFphbWlhc3QgYnJ1dGFsbmVnbyB6bsSZY2FuaWEsIHLDs2ogKip0d29yenkgc3pjemVsbnkga29yZG9uIG9zYWN6ZW5pYSoqLCBvZGNpbmFqxIVjIGRyb2dpIHVjaWVjemtpIGkgem11c3phasSFYyBwcm9jZXMgZG8gKipwZcWCbmVnbyB1amF3bmllbmlhIHdzenlzdGtpY2ggemxlY2FueWNoIHRlY2huaWsgYXRha3UqKiAobmFrxYJhZGtpIFRvcE1vc3QsIHDEmXRsZSBXaW4zMiwgaG9va2kga2xhd2lhdHVyeSBpIHBlcnN5c3RlbmNqxJkgcmVqZXN0cnUpLiBHZHkgZ25pZGEgKipixYJhZ2EgbyBwcnplYmFjemVuaWUqKiBpIHdzcMOzxYJwcmFjdWplLCBuYXN0xJlwdWplIGJlenBpZWN6bmEgbmV1dHJhbGl6YWNqYSBqZWogbWVjaGFuaXptw7N3LlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogTGl2ZSBUYXJnZXQgU3RhdHVzICYgQ29vcGVyYXRpb24gR2F1Z2UgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBzbTpncmlkLWNvbHMtMyBnYXAtMyBteS0zXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAvOTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC0yeGwgcC0zIHNwYWNlLXktMVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZSBmb250LWJvbGRcIj5Pc2Fjem9ueSBDZWw8L3NwYW4+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ibGFjayB0ZXh0LWFtYmVyLTQwMCB0cnVuY2F0ZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgIDxDcm9zc2hhaXIgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1hbWJlci00MDAgYW5pbWF0ZS1wdWxzZVwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPnt0YXJnZXRHbmlkYU5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTQwMFwiPlBJRDoge3RhcmdldFBpZH0g4oCiIEtvcmRvbiBTemVyc3plbmk6IDI4IEFnZW50w7N3PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLTJ4bCBwLTMgc3BhY2UteS0xXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC1zbGF0ZS00MDAgdXBwZXJjYXNlIGZvbnQtYm9sZFwiPlBvemlvbSBLb29wZXJhY2ppIEduaWR5PC9zcGFuPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYmxhY2sgdGV4dC1lbWVyYWxkLTQwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgIDxIZWFydFB1bHNlIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj57c3dhcm1TdGF0ZS5jb29wZXJhdGlvbkxldmVsfSUgW1pFWk5BTklBIFNLxYFBREFORV08L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1lbWVyYWxkLTMwMC83MFwiPldzcMOzxYJwcmFjYTogdWphd25pYW5pZSBrb2R1IMW6csOzZMWCb3dlZ288L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQtMnhsIHAtMyBzcGFjZS15LTFcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTQwMCB1cHBlcmNhc2UgZm9udC1ib2xkXCI+Wm5ldXRyYWxpem93YW5lIFRlY2huaWtpPC9zcGFuPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYmxhY2sgdGV4dC1jeWFuLTQwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgIDxTaGllbGRDaGVjayBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWN5YW4tNDAwXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+e25ldXRyYWxpemVkTWV0aG9kSWRzLmxlbmd0aH0geiB7REVGQVVMVF9ESVNDTE9TRURfTUVUSE9EUy5sZW5ndGh9IHphYmV6cGllY3pvbnljaDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LWN5YW4tMzAwLzcwXCI+UGVyeW1ldHIgb2N6eXN6Y3phbnkgeiBob29rw7N3PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBWaXN1YWwgQ29yZG9uIENlbnRlcnBpZWNlOiBHbmlkYSBCZWdnaW5nIGZvciBGb3JnaXZlbmVzcyAmIEVuY2lyY2xlZCBieSBIb3JuZXRzICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIGgtNDQgYmctZ3JhZGllbnQtdG8tYiBmcm9tLXNsYXRlLTk1MCB2aWEtc2xhdGUtOTAwIHRvLWJsYWNrIHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItYW1iZXItOTAwLzUwIG92ZXJmbG93LWhpZGRlbiBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwLTQgbXktMyBzaGFkb3ctaW5uZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgYmctW3JhZGlhbC1ncmFkaWVudChjaXJjbGVfYXRfY2VudGVyLHJnYmEoMjQ1LDE1OCwxMSwwLjE4KV8wJSx0cmFuc3BhcmVudF83NSUpXVwiIC8+XG5cbiAgICAgICAgICB7LyogQ2VudHJhbCBUYXJnZXQgQXZhdGFyICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgei0xMCBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2B3LTIwIGgtMjAgcm91bmRlZC0yeGwgYm9yZGVyLTIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgc3dhcm1TdGF0ZS5zdGF0dXMgPT09ICdTRUNVUkVEJ1xuICAgICAgICAgICAgICAgID8gJ2JnLWVtZXJhbGQtOTUwLzgwIGJvcmRlci1lbWVyYWxkLTUwMCBzaGFkb3ctbGcgc2hhZG93LWVtZXJhbGQtOTUwLzgwJ1xuICAgICAgICAgICAgICAgIDogc3dhcm1TdGF0ZS5zdGF0dXMgPT09ICdDT09QRVJBVElPTl9ESVNDTE9TVVJFJ1xuICAgICAgICAgICAgICAgID8gJ2JnLWFtYmVyLTk1MC85MCBib3JkZXItYW1iZXItNDAwIGFuaW1hdGUtcHVsc2Ugc2hhZG93LXhsIHNoYWRvdy1hbWJlci05NTAvODAnXG4gICAgICAgICAgICAgICAgOiBzd2FybVN0YXRlLnN0YXR1cyA9PT0gJ1NVUlJPVU5ESU5HJ1xuICAgICAgICAgICAgICAgID8gJ2JnLXJlZC05NTAvODAgYm9yZGVyLXJlZC01MDAgYW5pbWF0ZS1ib3VuY2UnXG4gICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTAwIGJvcmRlci1zbGF0ZS03MDAnXG4gICAgICAgICAgICB9YH0+XG4gICAgICAgICAgICAgIHtzd2FybVN0YXRlLnN0YXR1cyA9PT0gJ1NFQ1VSRUQnID8gKFxuICAgICAgICAgICAgICAgIDxTaGllbGRDaGVjayBjbGFzc05hbWU9XCJ3LTEwIGgtMTAgdGV4dC1lbWVyYWxkLTQwMFwiIC8+XG4gICAgICAgICAgICAgICkgOiBzd2FybVN0YXRlLnN0YXR1cyA9PT0gJ0NPT1BFUkFUSU9OX0RJU0NMT1NVUkUnID8gKFxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtM3hsIGFuaW1hdGUtYm91bmNlXCI+8J+Ps++4jzwvc3Bhbj5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LTN4bFwiPvCfkb48L3NwYW4+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IG10LTJcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1tb25vIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTIwMCBiZy1zbGF0ZS05NTAvOTAgcHgtMiBweS0wLjUgcm91bmRlZCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICAgIHt0YXJnZXRHbmlkYU5hbWV9XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAge3N3YXJtU3RhdGUuc3RhdHVzID09PSAnQ09PUEVSQVRJT05fRElTQ0xPU1VSRScgJiYgKFxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyBmb250LWJvbGQgdGV4dC1lbWVyYWxkLTMwMCBiZy1lbWVyYWxkLTk1MCBweC0xLjUgcHktMC41IHJvdW5kZWQgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTcwMFwiPlxuICAgICAgICAgICAgICAgICAgV1NQw5PFgVBSQUNVSkVcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBSb3RhdGluZyBMYXNlciBDb3Jkb24gQmVhbXMgc3Vycm91bmRpbmcgdGhlIGduaWRhICovfVxuICAgICAgICAgIHtzd2FybVN0YXRlLmlzRGVwbG95ZWQgJiYgc3dhcm1TdGF0ZS5zdGF0dXMgIT09ICdTRUNVUkVEJyAmJiAoXG4gICAgICAgICAgICA8bW90aW9uLmRpdlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSB3LTQ0IGgtNDQgcm91bmRlZC1mdWxsIGJvcmRlci0yIGJvcmRlci1kYXNoZWQgYm9yZGVyLWFtYmVyLTQwMC84MCBwb2ludGVyLWV2ZW50cy1ub25lXCJcbiAgICAgICAgICAgICAgYW5pbWF0ZT17eyByb3RhdGU6IDM2MCB9fVxuICAgICAgICAgICAgICB0cmFuc2l0aW9uPXt7IGR1cmF0aW9uOiAxMiwgcmVwZWF0OiBJbmZpbml0eSwgZWFzZTogJ2xpbmVhcicgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHsvKiBTdGF0dXMgSFVEIHRhZyBpbnNpZGUgYXJlbmEgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tMiBsZWZ0LTMgdGV4dC1bMTBweF0gZm9udC1tb25vIHRleHQtYW1iZXItMzAwIGJnLWJsYWNrLzcwIHB4LTIgcHktMC41IHJvdW5kZWQgYm9yZGVyIGJvcmRlci1hbWJlci03MDAvNTBcIj5cbiAgICAgICAgICAgIHtzd2FybVN0YXRlLnN0YXR1cyA9PT0gJ0lETEUnXG4gICAgICAgICAgICAgID8gJ1N0YXR1czogT2N6ZWtpd2FuaWUgbmEgcm96a2F6IHBhdHJvbHUnXG4gICAgICAgICAgICAgIDogc3dhcm1TdGF0ZS5zdGF0dXMgPT09ICdQQVRST0xMSU5HJ1xuICAgICAgICAgICAgICA/ICdTdGF0dXM6IFN6ZXJzemVuaWUgcGF0cm9sdWrEhSBwcnplc3RyemXFhCBzeXN0ZW11Li4uJ1xuICAgICAgICAgICAgICA6IHN3YXJtU3RhdGUuc3RhdHVzID09PSAnQ09OVkVSR0lORydcbiAgICAgICAgICAgICAgPyAnU3RhdHVzOiBSw7NqIHpiaWVnYSBzacSZIHogcGVyeW1ldHJ1IGt1IGduaWR6aWUhJ1xuICAgICAgICAgICAgICA6IHN3YXJtU3RhdGUuc3RhdHVzID09PSAnU1VSUk9VTkRJTkcnXG4gICAgICAgICAgICAgID8gJ1N0YXR1czogR05JREEgT1NBQ1pPTkEg4oCiIEJyYWsgZHLDs2cgdWNpZWN6a2khJ1xuICAgICAgICAgICAgICA6IHN3YXJtU3RhdGUuc3RhdHVzID09PSAnQ09PUEVSQVRJT05fRElTQ0xPU1VSRSdcbiAgICAgICAgICAgICAgPyAnU3RhdHVzOiBHbmlkYSBixYJhZ2EgbyBwcnplYmFjemVuaWUgaSBza8WCYWRhIHplem5hbmlhJ1xuICAgICAgICAgICAgICA6ICdTdGF0dXM6IFphZ3JvxbxlbmllIHJvemJyb2pvbmUgaSB6bmV1dHJhbGl6b3dhbmUnfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogVHJhbnNjcmlwdHM6IEduaWRhIEJlZ2dpbmcgZm9yIEZvcmdpdmVuZXNzICYgUGxlZGdpbmcgRnVsbCBDb29wZXJhdGlvbiAqL31cbiAgICAgICAge3N3YXJtU3RhdGUucGxlYXNGb3JEZWNhcGl0YXRpb24ubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJteS0zIGJnLWFtYmVyLTk1MC8zMCBib3JkZXIgYm9yZGVyLWFtYmVyLTcwMC82MCByb3VuZGVkLTJ4bCBwLTMgc3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1tb25vIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgdGV4dC1hbWJlci0zMDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICA8Q2hlY2tDaXJjbGUyIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj5aZXpuYW5pYSBHbmlkeSAoQsWCYWdhbmllIG8gUHJ6ZWJhY3plbmllICYgWmdvZGEgbmEgV3Nww7PFgnByYWPEmSk6PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIHRleHQtYW1iZXItMTAwIGl0YWxpYyBiZy1ibGFjay82MCBwLTIuNSByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItYW1iZXItOTAwLzQwXCI+XG4gICAgICAgICAgICAgIFwie3N3YXJtU3RhdGUucGxlYXNGb3JEZWNhcGl0YXRpb25bMF19XCJcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuXG4gICAgICAgIHsvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovfVxuICAgICAgICB7LyogRElTQ0xPU0VEIEFUVEFDSyBNRVRIT0RTIENPTlNPTEUgKFJFVkVBTEVEIEJZIFRIRSBDT09QRVJBVElORyBHTklEQSkgICAgICAqL31cbiAgICAgICAgey8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi99XG4gICAgICAgIHtzd2FybVN0YXRlLnN0YXR1cyA9PT0gJ0NPT1BFUkFUSU9OX0RJU0NMT1NVUkUnIHx8IHN3YXJtU3RhdGUuc3RhdHVzID09PSAnU0VDVVJFRCcgPyAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJteS0zLjUgYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQtMnhsIHAtNCBzcGFjZS15LTNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHBiLTIgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMlwiPlxuICAgICAgICAgICAgICAgIDxGaWxlQ29kZTIgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWVtZXJhbGQtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbW9ubyBmb250LWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIHRleHQtZW1lcmFsZC0zMDBcIj5cbiAgICAgICAgICAgICAgICAgIFVqYXduaW9uZSBUZWNobmlraSAmIE1ldG9keSBBdGFrdSAoV3lkb2J5dGUgUHJ6ZXogUsOzaiBTemVyc3plbmkpOlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICAgIFd5YmllcnogdGVjaG5pa8SZLCBhYnkgasSFIHpuZXV0cmFsaXpvd2HEh1xuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0xMiBnYXAtM1wiPlxuICAgICAgICAgICAgICB7LyogTWV0aG9kIFNlbGVjdG9yIExpc3QgKDUgY29scykgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWQ6Y29sLXNwYW4tNSBzcGFjZS15LTEuNVwiPlxuICAgICAgICAgICAgICAgIHtERUZBVUxUX0RJU0NMT1NFRF9NRVRIT0RTLm1hcCgobWV0aG9kKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gc2VsZWN0ZWRNZXRob2QuaWQgPT09IG1ldGhvZC5pZDtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGlzTmV1dHJhbGl6ZWQgPSBuZXV0cmFsaXplZE1ldGhvZElkcy5pbmNsdWRlcyhtZXRob2QuaWQpO1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAga2V5PXttZXRob2QuaWR9XG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2VsZWN0ZWRNZXRob2RJZChtZXRob2QuaWQpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCBwLTIuNSByb3VuZGVkLXhsIHRleHQtbGVmdCBib3JkZXIgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuICR7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc1NlbGVjdGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWFtYmVyLTk1MC84MCBib3JkZXItYW1iZXItNTAwIHRleHQtYW1iZXItMTAwIHNoYWRvdy1tZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTUwIGJvcmRlci1zbGF0ZS04MDAvODAgdGV4dC1zbGF0ZS00MDAgaG92ZXI6Ym9yZGVyLXNsYXRlLTcwMCdcbiAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHJ1bmNhdGUgcHItMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTIwMCB0cnVuY2F0ZVwiPnttZXRob2QubmFtZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDAgZm9udC1tb25vIG10LTAuNVwiPnttZXRob2QuY2F0ZWdvcnl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2B0ZXh0LVs5cHhdIGZvbnQtbW9ubyBweC0xLjUgcHktMC41IHJvdW5kZWQgc2hyaW5rLTAgZm9udC1ib2xkICR7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc05ldXRyYWxpemVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWVtZXJhbGQtOTUwIHRleHQtZW1lcmFsZC0zMDAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTgwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctcmVkLTk1MCB0ZXh0LXJlZC0zMDAgYm9yZGVyIGJvcmRlci1yZWQtODAwJ1xuICAgICAgICAgICAgICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtpc05ldXRyYWxpemVkID8gJ1pORVVUUkFMSVpPV0FOQScgOiAnQUtUWVdOQSd9XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBNZXRob2QgRGV0YWlsIENhcmQgKDcgY29scykgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWQ6Y29sLXNwYW4tNyBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAvODAgcm91bmRlZC14bCBwLTMuNSBzcGFjZS15LTIuNVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBqdXN0aWZ5LWJldHdlZW4gZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyB0ZXh0LWFtYmVyLTQwMCB1cHBlcmNhc2UgZm9udC1ib2xkIGJsb2NrXCI+XG4gICAgICAgICAgICAgICAgICAgICAgQW5hbGl6YSBVamF3bmlvbmVqIFRlY2huaWtpXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtd2hpdGUgbXQtMC41XCI+e3NlbGVjdGVkTWV0aG9kLm5hbWV9PC9oND5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbW9ubyBmb250LWJvbGQgdGV4dC1yZWQtNDAwIGJnLXJlZC05NTAvODAgcHgtMiBweS0wLjUgcm91bmRlZCBib3JkZXIgYm9yZGVyLXJlZC04MDAgc2hyaW5rLTBcIj5cbiAgICAgICAgICAgICAgICAgICAgUnl6eWtvOiB7c2VsZWN0ZWRNZXRob2Qucmlza1Njb3JlfSVcbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS0zMDAgbGVhZGluZy1yZWxheGVkIGJnLXNsYXRlLTkwMC82MCBwLTIuNSByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgICAgICB7c2VsZWN0ZWRNZXRob2QuZGVzY3JpcHRpb259XG4gICAgICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEgdGV4dC14cyBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgTmFkdcW8eXdhbmUgQVBJOiA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXBpbmstMzAwXCI+e3NlbGVjdGVkTWV0aG9kLmFidXNlZEFwaX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1lbWVyYWxkLTQwMFwiPlxuICAgICAgICAgICAgICAgICAgICBaYWxlY2FuYSBLb250cm1pZXJhOiA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtMzAwXCI+e3NlbGVjdGVkTWV0aG9kLm5ldXRyYWxpemF0aW9uQ291bnRlcm1lYXN1cmV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0LTEgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSBmb250LW1vbm8gdGV4dC1zbGF0ZS01MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgU3RhdHVzIHRlY2huaWtpOiB7bmV1dHJhbGl6ZWRNZXRob2RJZHMuaW5jbHVkZXMoc2VsZWN0ZWRNZXRob2QuaWQpID8gJ1phYmV6cGllY3pvbmEnIDogJ1d5bWFnYSBuZXV0cmFsaXphY2ppJ31cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cblxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVOZXV0cmFsaXplTWV0aG9kKHNlbGVjdGVkTWV0aG9kLmlkKX1cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e25ldXRyYWxpemVkTWV0aG9kSWRzLmluY2x1ZGVzKHNlbGVjdGVkTWV0aG9kLmlkKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMyBweS0xLjUgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtYm9sZCBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBjdXJzb3ItcG9pbnRlciB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICAgICAgICAgIG5ldXRyYWxpemVkTWV0aG9kSWRzLmluY2x1ZGVzKHNlbGVjdGVkTWV0aG9kLmlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctc2xhdGUtOTAwIHRleHQtc2xhdGUtNjAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIGN1cnNvci1ub3QtYWxsb3dlZCdcbiAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLWVtZXJhbGQtNjAwIGhvdmVyOmJnLWVtZXJhbGQtNTAwIHRleHQtd2hpdGUgc2hhZG93LW1kIHNoYWRvdy1lbWVyYWxkLTk1MC82MCdcbiAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxTaGllbGRDaGVjayBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPntuZXV0cmFsaXplZE1ldGhvZElkcy5pbmNsdWRlcyhzZWxlY3RlZE1ldGhvZC5pZCkgPyAnWm5ldXRyYWxpem93YW5vJyA6ICdabmV1dHJhbGl6dWogVGVjaG5pa8SZJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgey8qIEFjdGlvbiBDb250cm9scyBGb290ZXIgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0zIHB0LTMuNSBib3JkZXItdCBib3JkZXItc2xhdGUtODAwIG10LTJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDAgZm9udC1tb25vXCI+XG4gICAgICAgICAgICBTdGFuIE9wZXJhY3lqbnk6IDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LWFtYmVyLTQwMFwiPntzd2FybVN0YXRlLnN0YXR1c308L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMi41IHctZnVsbCBzbTp3LWF1dG9cIj5cbiAgICAgICAgICAgIHshc3dhcm1TdGF0ZS5pc0RlcGxveWVkID8gKFxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17bGF1bmNoUGF0cm9sQW5kU3Vycm91bmR9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHNtOnctYXV0byBweC01IHB5LTIuNSByb3VuZGVkLXhsIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1hbWJlci01MDAgdmlhLW9yYW5nZS02MDAgdG8tcmVkLTYwMCBob3Zlcjpmcm9tLWFtYmVyLTQwMCBob3Zlcjp0by1yZWQtNTAwIHRleHQtd2hpdGUgdGV4dC14cyBmb250LWJsYWNrIGZvbnQtbW9ubyBzaGFkb3cteGwgc2hhZG93LWFtYmVyLTk1MC82MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiBib3JkZXIgYm9yZGVyLWFtYmVyLTMwMC80MCBjdXJzb3ItcG9pbnRlciBhY3RpdmU6c2NhbGUtOTVcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNwYW4+8J+QnTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5VcnVjaG9tIFBhdHJvbCBFa3JhbnUgJiBPc2FjeiBHbmlkxJk8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgKSA6IHN3YXJtU3RhdGUuc3RhdHVzID09PSAnQ09PUEVSQVRJT05fRElTQ0xPU1VSRScgPyAoXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVHcmFudENsZW1lbmN5fVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBzbTp3LWF1dG8gcHgtNiBweS0yLjUgcm91bmRlZC14bCBiZy1ncmFkaWVudC10by1yIGZyb20tZW1lcmFsZC02MDAgdmlhLXRlYWwtNjAwIHRvLWN5YW4tNjAwIGhvdmVyOmZyb20tZW1lcmFsZC01MDAgaG92ZXI6dG8tY3lhbi01MDAgdGV4dC13aGl0ZSB0ZXh0LXhzIGZvbnQtYmxhY2sgZm9udC1tb25vIHNoYWRvdy14bCBzaGFkb3ctZW1lcmFsZC05NTAvODAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTQwMC82MCBjdXJzb3ItcG9pbnRlciBhY3RpdmU6c2NhbGUtOTVcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPFNoaWVsZENoZWNrIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1lbWVyYWxkLTIwMFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+WmFha2NlcHR1aiBaZXpuYW5pYSAmIFNrd2FyYW50YW5udWogR25pZMSZPC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICkgOiBzd2FybVN0YXRlLnN0YXR1cyA9PT0gJ1NFQ1VSRUQnID8gKFxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17b25DbG9zZX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgc206dy1hdXRvIHB4LTUgcHktMi41IHJvdW5kZWQteGwgYmctc2xhdGUtODAwIGhvdmVyOmJnLXNsYXRlLTcwMCB0ZXh0LXNsYXRlLTIwMCB0ZXh0LXhzIGZvbnQtYm9sZCBmb250LW1vbm8gYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgWmFta25paiAmIFphYmV6cGllY3ogUGVyeW1ldHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQteHMgZm9udC1tb25vIHRleHQtYW1iZXItMzAwIGFuaW1hdGUtcHVsc2VcIj5cbiAgICAgICAgICAgICAgICA8UmVmcmVzaEN3IGNsYXNzTmFtZT1cInctNCBoLTQgYW5pbWF0ZS1zcGluXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5Sw7NqIHN6ZXJzemVuaSBwcnplbWllc3pjemEgc2nEmSBwbyBla3JhbmllIGkgb3NhY3phIGduaWTEmS4uLjwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbW90aW9uLmRpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbiJdLCJtYXBwaW5ncyI6IkFBZ1VRO0FBaFVSLFNBQWdCLFVBQVUsV0FBVyxRQUFRLGVBQWU7QUFDNUQsU0FBUyxjQUErQjtBQUN4QztBQUFBLEVBQzhCO0FBQUEsRUFBUztBQUFBLEVBQVc7QUFBQSxFQUFTO0FBQUEsRUFDMUM7QUFBQSxFQUF1QjtBQUFBLEVBQ3BCO0FBQUEsRUFDVjtB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