export const INITIAL_DATA_FLOW_NODES = [
  {
    id: "node-sentinel-core",
    name: "Sentinel Base Core (Główna Tarcza)",
    processName: "sentinel_shield_core.elf",
    pid: 1044,
    nodeType: "SECURITY_GARRISON",
    x: 480,
    y: 280,
    category: "Ochrona & Dowodzenie",
    gnidasCount: 0,
    aggressionLevel: 0,
    status: "SECURED",
    bandwidth: "450.0 MB/s",
    cpuLoad: 2.1,
    description: "Niewzruszony rdzeń bazy obronnej Sentinel Shield. Nadzoruje wszystkie węzły i magistrale.",
    iconName: "ShieldCheck"
  },
  {
    id: "node-kernel-zygote",
    name: "Kernel IPC & Zygote Master",
    processName: "zygote64 / /system/bin/app_process64",
    pid: 420,
    nodeType: "KERNEL_CORE",
    x: 280,
    y: 140,
    category: "Rdzeń Systemu & Pamięć",
    gnidasCount: 14,
    aggressionLevel: 75,
    status: "INFECTED",
    bandwidth: "185.4 MB/s",
    cpuLoad: 12.4,
    description: "Główny demon rozruchowy procesów Androida. Przechwytuje żądania fork() i magistralę Binder.",
    iconName: "Cpu"
  },
  {
    id: "node-binder-bus",
    name: "Magistrala Binder IPC (/dev/binder)",
    processName: "binder_driver_core.ko",
    pid: 1,
    nodeType: "COMMUNICATION_BUS",
    x: 480,
    y: 110,
    category: "Magistrala Międzyprocesowa",
    gnidasCount: 22,
    aggressionLevel: 92,
    status: "INFECTED",
    bandwidth: "310.2 MB/s",
    cpuLoad: 8.9,
    description: "Kluczowe złącze wymiany danych i Intentów między aplikacjami. Wykryto złośliwe wywołania transact().",
    iconName: "Radio"
  },
  {
    id: "node-chrome-browser",
    name: "Przeglądarka Web (Chromium Engine)",
    processName: "com.android.chrome:sandboxed_process0",
    pid: 3892,
    nodeType: "USER_APP",
    x: 180,
    y: 290,
    category: "Aplikacja Użytkownika",
    gnidasCount: 8,
    aggressionLevel: 65,
    status: "WARNING",
    bandwidth: "42.8 MB/s",
    cpuLoad: 18.5,
    description: "Proces renderera przeglądarki. Podatny na skrypty cryptominerów i złośliwe ramki iframe.",
    iconName: "Globe"
  },
  {
    id: "node-banking-wallet",
    name: "Mobilna Bankowość & Płatności NFC",
    processName: "pl.bank.securemobile:auth",
    pid: 4102,
    nodeType: "USER_APP",
    x: 740,
    y: 160,
    category: "Finanse & Kryptografia",
    gnidasCount: 6,
    aggressionLevel: 45,
    status: "WARNING",
    bandwidth: "12.5 MB/s",
    cpuLoad: 3.2,
    description: "Obsługa portfela tokenów i autoryzacji biometrycznej. Cel agresywnych prób przechwycenia kursorów DB.",
    iconName: "CreditCard"
  },
  {
    id: "node-encrypted-messenger",
    name: "Szyfrowany Komunikator Signal/SMS",
    processName: "org.thoughtcrime.securesms",
    pid: 5210,
    nodeType: "USER_APP",
    x: 780,
    y: 330,
    category: "Komunikacja P2P",
    gnidasCount: 5,
    aggressionLevel: 30,
    status: "WARNING",
    bandwidth: "18.9 MB/s",
    cpuLoad: 4,
    description: "Szyfrowana wymiana wiadomości. Monitorowany pod kątem wycieków z bufora pamięci schowka.",
    iconName: "MessageSquare"
  },
  {
    id: "node-adware-trojan",
    name: "Zainfekowany Agent Adware TopMost",
    processName: "com.adware.arcade.fakegame:bg_daemon",
    pid: 8819,
    nodeType: "USER_APP",
    x: 230,
    y: 450,
    category: "Złośliwe Oprogramowanie / Gnida",
    gnidasCount: 28,
    aggressionLevel: 98,
    status: "INFECTED",
    bandwidth: "94.2 MB/s",
    cpuLoad: 34,
    description: "Agresywny proces rysujący nakładki TOPMOST, kradnący dotknięcia Accessibility i pompujący reklamy.",
    iconName: "Skull"
  },
  {
    id: "node-c2-socket",
    name: "Zewnętrzny Port C2 (TCP:443 / 8080)",
    processName: "socat / remote_reverse_tunnel",
    pid: 9901,
    nodeType: "EXTERNAL_SOCKET",
    x: 480,
    y: 480,
    category: "Gniazdo Sieciowe C2",
    gnidasCount: 19,
    aggressionLevel: 95,
    status: "INFECTED",
    bandwidth: "58.1 MB/s",
    cpuLoad: 7.8,
    description: "Kanał telemetrii i komend botnetu. Wysyła wykradzione poświadczenia na zewnętrzne adresy IP.",
    iconName: "Wifi"
  },
  {
    id: "node-shared-ashmem",
    name: "Pamięć Współdzielona /dev/ashmem",
    processName: "ashmem_subsystem_pool",
    pid: 2,
    nodeType: "COMMUNICATION_BUS",
    x: 730,
    y: 470,
    category: "Magistrala Pamięci RAM",
    gnidasCount: 11,
    aggressionLevel: 70,
    status: "INFECTED",
    bandwidth: "240.0 MB/s",
    cpuLoad: 5.5,
    description: "Anonimowe bufory pamięci. Zauważono próby wstrzykiwania kodu PE i bibliotek .so.",
    iconName: "HardDrive"
  }
];
export const INITIAL_DATA_FLOW_LINKS = [
  {
    id: "link-sentinel-binder",
    sourceNodeId: "node-sentinel-core",
    targetNodeId: "node-binder-bus",
    connectorName: "Kernel Binder Laser Shielding Bus",
    protocol: "BINDER_IPC",
    gnidasDetected: 2,
    gnidasPurged: 2,
    aggressionScore: 10,
    packetRate: 140,
    bandwidth: "120 MB/s",
    status: "CLEANSED_SECURE",
    threatDescription: "Wiązka kontrolna tarczy Sentinel chroni transakcje IPC.",
    lastPayloadSample: "SENTINEL_IPC_TOKEN_VERIFIED_OK"
  },
  {
    id: "link-zygote-binder",
    sourceNodeId: "node-kernel-zygote",
    targetNodeId: "node-binder-bus",
    connectorName: "Zygote Fork Transact Dispatcher",
    protocol: "BINDER_IPC",
    gnidasDetected: 14,
    gnidasPurged: 0,
    aggressionScore: 78,
    packetRate: 95,
    bandwidth: "84 MB/s",
    status: "ACTIVE_INFECTED",
    threatDescription: "Gnidy wstrzykują intenty z flagą FLAG_RECEIVER_FOREGROUND.",
    lastPayloadSample: "INTENT_ACTION_BOOT_POISON_PAYLOAD"
  },
  {
    id: "link-chrome-zygote",
    sourceNodeId: "node-chrome-browser",
    targetNodeId: "node-kernel-zygote",
    connectorName: "Renderer Sandbox Memory Channel",
    protocol: "UNIX_SOCKET",
    gnidasDetected: 8,
    gnidasPurged: 0,
    aggressionScore: 65,
    packetRate: 60,
    bandwidth: "35 MB/s",
    status: "ACTIVE_INFECTED",
    threatDescription: "Złośliwe skrypty JS próbują uciec z piaskownicy Chromium.",
    lastPayloadSample: "V8_EXPLOIT_MEMORY_CORRUPTION_PROBE"
  },
  {
    id: "link-adware-c2",
    sourceNodeId: "node-adware-trojan",
    targetNodeId: "node-c2-socket",
    connectorName: "C2 Exfiltration Reverse Channel",
    protocol: "TCP_SOCKET",
    gnidasDetected: 19,
    gnidasPurged: 0,
    aggressionScore: 98,
    packetRate: 180,
    bandwidth: "58 MB/s",
    status: "ACTIVE_INFECTED",
    threatDescription: "Nieustanne wysyłanie telemetrycznych pakietów spyware do serwera C2.",
    lastPayloadSample: "POST /c2/beacon?keylog=ACTIVE&screen=ON"
  },
  {
    id: "link-adware-zygote",
    sourceNodeId: "node-adware-trojan",
    targetNodeId: "node-kernel-zygote",
    connectorName: "Accessibility Overlay Injection Hook",
    protocol: "BINDER_IPC",
    gnidasDetected: 9,
    gnidasPurged: 0,
    aggressionScore: 92,
    packetRate: 110,
    bandwidth: "44 MB/s",
    status: "ACTIVE_INFECTED",
    threatDescription: "Przechwytywanie zdarzeń dotyku i wstrzykiwanie niewidzialnych okien.",
    lastPayloadSample: "TYPE_WINDOW_STATE_CHANGED_OVERLAY_HIJACK"
  },
  {
    id: "link-banking-binder",
    sourceNodeId: "node-banking-wallet",
    targetNodeId: "node-binder-bus",
    connectorName: "Secure Keystore & 2FA Content Provider",
    protocol: "CONTENT_PROVIDER",
    gnidasDetected: 6,
    gnidasPurged: 0,
    aggressionScore: 45,
    packetRate: 40,
    bandwidth: "12 MB/s",
    status: "ACTIVE_INFECTED",
    threatDescription: "Próby odczytu kodów SMS 2FA przez podsłuchiwanie kursorów SQLite.",
    lastPayloadSample: "CONTENT_URI://sms/inbox_QUERY_ATTEMPT"
  },
  {
    id: "link-messenger-ashmem",
    sourceNodeId: "node-encrypted-messenger",
    targetNodeId: "node-shared-ashmem",
    connectorName: "Crypto Buffer Ashmem Bridge",
    protocol: "SHARED_MEM",
    gnidasDetected: 5,
    gnidasPurged: 0,
    aggressionScore: 30,
    packetRate: 35,
    bandwidth: "18 MB/s",
    status: "ACTIVE_INFECTED",
    threatDescription: "Podejrzenie zrzutu kluczy AES-256 z pamięci podręcznej.",
    lastPayloadSample: "KEY_EXCHANGE_RAM_DUMP_PROBE"
  },
  {
    id: "link-sentinel-c2",
    sourceNodeId: "node-sentinel-core",
    targetNodeId: "node-c2-socket",
    connectorName: "Laser Interceptor Jammer Link",
    protocol: "TCP_SOCKET",
    gnidasDetected: 0,
    gnidasPurged: 19,
    aggressionScore: 0,
    packetRate: 200,
    bandwidth: "300 MB/s",
    status: "PURGING_LASER",
    threatDescription: "Aktywna wiązka lasera Sentinel blokuje pakiety i smaży gniazdo C2.",
    lastPayloadSample: "SENTINEL_TCP_RST_AND_FIREWALL_BLOCK"
  },
  {
    id: "link-sentinel-ashmem",
    sourceNodeId: "node-sentinel-core",
    targetNodeId: "node-shared-ashmem",
    connectorName: "RAM Sanitizer & Guard Matrix",
    protocol: "SHARED_MEM",
    gnidasDetected: 11,
    gnidasPurged: 0,
    aggressionScore: 70,
    packetRate: 85,
    bandwidth: "90 MB/s",
    status: "ACTIVE_INFECTED",
    threatDescription: "Skanowanie deskryptorów FD w poszukiwaniu złośliwych bibliotek .so.",
    lastPayloadSample: "ASHMEM_MEMSET_ZERO_PROTECTION_SWEEP"
  }
];
class DataFlowMatrixEngine {
  constructor() {
    this.listeners = [];
    this.pulseTimer = null;
    this.nodes = JSON.parse(JSON.stringify(INITIAL_DATA_FLOW_NODES));
    this.links = JSON.parse(JSON.stringify(INITIAL_DATA_FLOW_LINKS));
    this.startLiveSimulation();
  }
  getNodes() {
    return [...this.nodes];
  }
  getLinks() {
    return [...this.links];
  }
  subscribe(listener) {
    this.listeners.push(listener);
    listener(this.getNodes(), this.getLinks());
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
  notify() {
    this.listeners.forEach((l) => l(this.getNodes(), this.getLinks()));
  }
  startLiveSimulation() {
    if (this.pulseTimer) return;
    this.pulseTimer = window.setInterval(() => {
      this.links.forEach((link) => {
        if (link.status === "ACTIVE_INFECTED") {
          link.packetRate = Math.max(20, link.packetRate + (Math.floor(Math.random() * 9) - 4));
        } else if (link.status === "PURGING_LASER") {
          link.aggressionScore = Math.max(0, link.aggressionScore - 5);
          if (link.aggressionScore <= 0) {
            link.status = "CLEANSED_SECURE";
            link.gnidasPurged += link.gnidasDetected;
            link.gnidasDetected = 0;
          }
        }
      });
      this.notify();
    }, 1500);
  }
  // Purge / Laser Disinfect a single connection link
  purgeLink(linkId) {
    const link = this.links.find((l) => l.id === linkId);
    if (!link) return;
    link.status = "CLEANSED_SECURE";
    link.gnidasPurged += link.gnidasDetected;
    link.gnidasDetected = 0;
    link.aggressionScore = 0;
    link.lastPayloadSample = "SENTINEL_PURGE_SUCCESSFUL_CLEANSED";
    this.recalculateNodeAggression(link.targetNodeId);
    this.recalculateNodeAggression(link.sourceNodeId);
    this.notify();
  }
  // Sever / Cut off connection
  severLink(linkId) {
    const link = this.links.find((l) => l.id === linkId);
    if (!link) return;
    link.status = "SEVERED_BLOCKED";
    link.aggressionScore = 0;
    link.packetRate = 0;
    link.bandwidth = "0.0 KB/s (BLOCKED)";
    link.lastPayloadSample = "CONNECTION_SEVERED_BY_SENTINEL_WALL";
    this.recalculateNodeAggression(link.targetNodeId);
    this.notify();
  }
  // Disinfect whole process node and all its connected links
  disinfectNode(nodeId) {
    const node = this.nodes.find((n) => n.id === nodeId);
    if (!node) return;
    node.gnidasCount = 0;
    node.aggressionLevel = 0;
    node.status = "SECURED";
    this.links.forEach((link) => {
      if (link.sourceNodeId === nodeId || link.targetNodeId === nodeId) {
        link.status = "CLEANSED_SECURE";
        link.gnidasPurged += link.gnidasDetected;
        link.gnidasDetected = 0;
        link.aggressionScore = 0;
      }
    });
    this.notify();
  }
  // Laser Decapitation on entire network (100% Purge)
  purgeEntireDataFlow() {
    this.links.forEach((l) => {
      l.status = "CLEANSED_SECURE";
      l.gnidasPurged += l.gnidasDetected;
      l.gnidasDetected = 0;
      l.aggressionScore = 0;
    });
    this.nodes.forEach((n) => {
      n.gnidasCount = 0;
      n.aggressionLevel = 0;
      n.status = "SECURED";
    });
    this.notify();
  }
  // Reset to initial state
  resetToInitialState() {
    this.nodes = JSON.parse(JSON.stringify(INITIAL_DATA_FLOW_NODES));
    this.links = JSON.parse(JSON.stringify(INITIAL_DATA_FLOW_LINKS));
    this.notify();
  }
  recalculateNodeAggression(nodeId) {
    const node = this.nodes.find((n) => n.id === nodeId);
    if (!node) return;
    const connectedLinks = this.links.filter((l) => l.sourceNodeId === nodeId || l.targetNodeId === nodeId);
    const activeInfectedLinks = connectedLinks.filter((l) => l.status === "ACTIVE_INFECTED");
    if (activeInfectedLinks.length === 0) {
      node.gnidasCount = 0;
      node.aggressionLevel = 0;
      node.status = "SECURED";
    } else {
      const maxAggression = Math.max(...activeInfectedLinks.map((l) => l.aggressionScore));
      node.aggressionLevel = maxAggression;
      node.status = maxAggression > 80 ? "INFECTED" : "WARNING";
    }
  }
}
export const dataFlowMatrixEngine = new DataFlowMatrixEngine();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGFGbG93TWF0cml4RW5naW5lLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGFGbG93UHJvY2Vzc05vZGUsIERhdGFGbG93Q29ubmVjdGlvbkxpbmsgfSBmcm9tICcuLi90eXBlcyc7XG5cbmV4cG9ydCBjb25zdCBJTklUSUFMX0RBVEFfRkxPV19OT0RFUzogRGF0YUZsb3dQcm9jZXNzTm9kZVtdID0gW1xuICB7XG4gICAgaWQ6ICdub2RlLXNlbnRpbmVsLWNvcmUnLFxuICAgIG5hbWU6ICdTZW50aW5lbCBCYXNlIENvcmUgKEfFgsOzd25hIFRhcmN6YSknLFxuICAgIHByb2Nlc3NOYW1lOiAnc2VudGluZWxfc2hpZWxkX2NvcmUuZWxmJyxcbiAgICBwaWQ6IDEwNDQsXG4gICAgbm9kZVR5cGU6ICdTRUNVUklUWV9HQVJSSVNPTicsXG4gICAgeDogNDgwLFxuICAgIHk6IDI4MCxcbiAgICBjYXRlZ29yeTogJ09jaHJvbmEgJiBEb3dvZHplbmllJyxcbiAgICBnbmlkYXNDb3VudDogMCxcbiAgICBhZ2dyZXNzaW9uTGV2ZWw6IDAsXG4gICAgc3RhdHVzOiAnU0VDVVJFRCcsXG4gICAgYmFuZHdpZHRoOiAnNDUwLjAgTUIvcycsXG4gICAgY3B1TG9hZDogMi4xLFxuICAgIGRlc2NyaXB0aW9uOiAnTmlld3pydXN6b255IHJkemXFhCBiYXp5IG9icm9ubmVqIFNlbnRpbmVsIFNoaWVsZC4gTmFkem9ydWplIHdzenlzdGtpZSB3xJl6xYJ5IGkgbWFnaXN0cmFsZS4nLFxuICAgIGljb25OYW1lOiAnU2hpZWxkQ2hlY2snXG4gIH0sXG4gIHtcbiAgICBpZDogJ25vZGUta2VybmVsLXp5Z290ZScsXG4gICAgbmFtZTogJ0tlcm5lbCBJUEMgJiBaeWdvdGUgTWFzdGVyJyxcbiAgICBwcm9jZXNzTmFtZTogJ3p5Z290ZTY0IC8gL3N5c3RlbS9iaW4vYXBwX3Byb2Nlc3M2NCcsXG4gICAgcGlkOiA0MjAsXG4gICAgbm9kZVR5cGU6ICdLRVJORUxfQ09SRScsXG4gICAgeDogMjgwLFxuICAgIHk6IDE0MCxcbiAgICBjYXRlZ29yeTogJ1JkemXFhCBTeXN0ZW11ICYgUGFtacSZxIcnLFxuICAgIGduaWRhc0NvdW50OiAxNCxcbiAgICBhZ2dyZXNzaW9uTGV2ZWw6IDc1LFxuICAgIHN0YXR1czogJ0lORkVDVEVEJyxcbiAgICBiYW5kd2lkdGg6ICcxODUuNCBNQi9zJyxcbiAgICBjcHVMb2FkOiAxMi40LFxuICAgIGRlc2NyaXB0aW9uOiAnR8WCw7N3bnkgZGVtb24gcm96cnVjaG93eSBwcm9jZXPDs3cgQW5kcm9pZGEuIFByemVjaHd5dHVqZSDFvMSFZGFuaWEgZm9yaygpIGkgbWFnaXN0cmFsxJkgQmluZGVyLicsXG4gICAgaWNvbk5hbWU6ICdDcHUnXG4gIH0sXG4gIHtcbiAgICBpZDogJ25vZGUtYmluZGVyLWJ1cycsXG4gICAgbmFtZTogJ01hZ2lzdHJhbGEgQmluZGVyIElQQyAoL2Rldi9iaW5kZXIpJyxcbiAgICBwcm9jZXNzTmFtZTogJ2JpbmRlcl9kcml2ZXJfY29yZS5rbycsXG4gICAgcGlkOiAxLFxuICAgIG5vZGVUeXBlOiAnQ09NTVVOSUNBVElPTl9CVVMnLFxuICAgIHg6IDQ4MCxcbiAgICB5OiAxMTAsXG4gICAgY2F0ZWdvcnk6ICdNYWdpc3RyYWxhIE1pxJlkenlwcm9jZXNvd2EnLFxuICAgIGduaWRhc0NvdW50OiAyMixcbiAgICBhZ2dyZXNzaW9uTGV2ZWw6IDkyLFxuICAgIHN0YXR1czogJ0lORkVDVEVEJyxcbiAgICBiYW5kd2lkdGg6ICczMTAuMiBNQi9zJyxcbiAgICBjcHVMb2FkOiA4LjksXG4gICAgZGVzY3JpcHRpb246ICdLbHVjem93ZSB6xYLEhWN6ZSB3eW1pYW55IGRhbnljaCBpIEludGVudMOzdyBtacSZZHp5IGFwbGlrYWNqYW1pLiBXeWtyeXRvIHrFgm/Fm2xpd2Ugd3l3b8WCYW5pYSB0cmFuc2FjdCgpLicsXG4gICAgaWNvbk5hbWU6ICdSYWRpbydcbiAgfSxcbiAge1xuICAgIGlkOiAnbm9kZS1jaHJvbWUtYnJvd3NlcicsXG4gICAgbmFtZTogJ1ByemVnbMSFZGFya2EgV2ViIChDaHJvbWl1bSBFbmdpbmUpJyxcbiAgICBwcm9jZXNzTmFtZTogJ2NvbS5hbmRyb2lkLmNocm9tZTpzYW5kYm94ZWRfcHJvY2VzczAnLFxuICAgIHBpZDogMzg5MixcbiAgICBub2RlVHlwZTogJ1VTRVJfQVBQJyxcbiAgICB4OiAxODAsXG4gICAgeTogMjkwLFxuICAgIGNhdGVnb3J5OiAnQXBsaWthY2phIFXFvHl0a293bmlrYScsXG4gICAgZ25pZGFzQ291bnQ6IDgsXG4gICAgYWdncmVzc2lvbkxldmVsOiA2NSxcbiAgICBzdGF0dXM6ICdXQVJOSU5HJyxcbiAgICBiYW5kd2lkdGg6ICc0Mi44IE1CL3MnLFxuICAgIGNwdUxvYWQ6IDE4LjUsXG4gICAgZGVzY3JpcHRpb246ICdQcm9jZXMgcmVuZGVyZXJhIHByemVnbMSFZGFya2kuIFBvZGF0bnkgbmEgc2tyeXB0eSBjcnlwdG9taW5lcsOzdyBpIHrFgm/Fm2xpd2UgcmFta2kgaWZyYW1lLicsXG4gICAgaWNvbk5hbWU6ICdHbG9iZSdcbiAgfSxcbiAge1xuICAgIGlkOiAnbm9kZS1iYW5raW5nLXdhbGxldCcsXG4gICAgbmFtZTogJ01vYmlsbmEgQmFua293b8WbxIcgJiBQxYJhdG5vxZtjaSBORkMnLFxuICAgIHByb2Nlc3NOYW1lOiAncGwuYmFuay5zZWN1cmVtb2JpbGU6YXV0aCcsXG4gICAgcGlkOiA0MTAyLFxuICAgIG5vZGVUeXBlOiAnVVNFUl9BUFAnLFxuICAgIHg6IDc0MCxcbiAgICB5OiAxNjAsXG4gICAgY2F0ZWdvcnk6ICdGaW5hbnNlICYgS3J5cHRvZ3JhZmlhJyxcbiAgICBnbmlkYXNDb3VudDogNixcbiAgICBhZ2dyZXNzaW9uTGV2ZWw6IDQ1LFxuICAgIHN0YXR1czogJ1dBUk5JTkcnLFxuICAgIGJhbmR3aWR0aDogJzEyLjUgTUIvcycsXG4gICAgY3B1TG9hZDogMy4yLFxuICAgIGRlc2NyaXB0aW9uOiAnT2JzxYJ1Z2EgcG9ydGZlbGEgdG9rZW7Ds3cgaSBhdXRvcnl6YWNqaSBiaW9tZXRyeWN6bmVqLiBDZWwgYWdyZXN5d255Y2ggcHLDs2IgcHJ6ZWNod3ljZW5pYSBrdXJzb3LDs3cgREIuJyxcbiAgICBpY29uTmFtZTogJ0NyZWRpdENhcmQnXG4gIH0sXG4gIHtcbiAgICBpZDogJ25vZGUtZW5jcnlwdGVkLW1lc3NlbmdlcicsXG4gICAgbmFtZTogJ1N6eWZyb3dhbnkgS29tdW5pa2F0b3IgU2lnbmFsL1NNUycsXG4gICAgcHJvY2Vzc05hbWU6ICdvcmcudGhvdWdodGNyaW1lLnNlY3VyZXNtcycsXG4gICAgcGlkOiA1MjEwLFxuICAgIG5vZGVUeXBlOiAnVVNFUl9BUFAnLFxuICAgIHg6IDc4MCxcbiAgICB5OiAzMzAsXG4gICAgY2F0ZWdvcnk6ICdLb211bmlrYWNqYSBQMlAnLFxuICAgIGduaWRhc0NvdW50OiA1LFxuICAgIGFnZ3Jlc3Npb25MZXZlbDogMzAsXG4gICAgc3RhdHVzOiAnV0FSTklORycsXG4gICAgYmFuZHdpZHRoOiAnMTguOSBNQi9zJyxcbiAgICBjcHVMb2FkOiA0LjAsXG4gICAgZGVzY3JpcHRpb246ICdTenlmcm93YW5hIHd5bWlhbmEgd2lhZG9tb8WbY2kuIE1vbml0b3Jvd2FueSBwb2Qga8SFdGVtIHd5Y2lla8OzdyB6IGJ1Zm9yYSBwYW1pxJljaSBzY2hvd2thLicsXG4gICAgaWNvbk5hbWU6ICdNZXNzYWdlU3F1YXJlJ1xuICB9LFxuICB7XG4gICAgaWQ6ICdub2RlLWFkd2FyZS10cm9qYW4nLFxuICAgIG5hbWU6ICdaYWluZmVrb3dhbnkgQWdlbnQgQWR3YXJlIFRvcE1vc3QnLFxuICAgIHByb2Nlc3NOYW1lOiAnY29tLmFkd2FyZS5hcmNhZGUuZmFrZWdhbWU6YmdfZGFlbW9uJyxcbiAgICBwaWQ6IDg4MTksXG4gICAgbm9kZVR5cGU6ICdVU0VSX0FQUCcsXG4gICAgeDogMjMwLFxuICAgIHk6IDQ1MCxcbiAgICBjYXRlZ29yeTogJ1rFgm/Fm2xpd2UgT3Byb2dyYW1vd2FuaWUgLyBHbmlkYScsXG4gICAgZ25pZGFzQ291bnQ6IDI4LFxuICAgIGFnZ3Jlc3Npb25MZXZlbDogOTgsXG4gICAgc3RhdHVzOiAnSU5GRUNURUQnLFxuICAgIGJhbmR3aWR0aDogJzk0LjIgTUIvcycsXG4gICAgY3B1TG9hZDogMzQuMCxcbiAgICBkZXNjcmlwdGlvbjogJ0FncmVzeXdueSBwcm9jZXMgcnlzdWrEhWN5IG5ha8WCYWRraSBUT1BNT1NULCBrcmFkbsSFY3kgZG90a25pxJljaWEgQWNjZXNzaWJpbGl0eSBpIHBvbXB1asSFY3kgcmVrbGFteS4nLFxuICAgIGljb25OYW1lOiAnU2t1bGwnXG4gIH0sXG4gIHtcbiAgICBpZDogJ25vZGUtYzItc29ja2V0JyxcbiAgICBuYW1lOiAnWmV3bsSZdHJ6bnkgUG9ydCBDMiAoVENQOjQ0MyAvIDgwODApJyxcbiAgICBwcm9jZXNzTmFtZTogJ3NvY2F0IC8gcmVtb3RlX3JldmVyc2VfdHVubmVsJyxcbiAgICBwaWQ6IDk5MDEsXG4gICAgbm9kZVR5cGU6ICdFWFRFUk5BTF9TT0NLRVQnLFxuICAgIHg6IDQ4MCxcbiAgICB5OiA0ODAsXG4gICAgY2F0ZWdvcnk6ICdHbmlhemRvIFNpZWNpb3dlIEMyJyxcbiAgICBnbmlkYXNDb3VudDogMTksXG4gICAgYWdncmVzc2lvbkxldmVsOiA5NSxcbiAgICBzdGF0dXM6ICdJTkZFQ1RFRCcsXG4gICAgYmFuZHdpZHRoOiAnNTguMSBNQi9zJyxcbiAgICBjcHVMb2FkOiA3LjgsXG4gICAgZGVzY3JpcHRpb246ICdLYW5hxYIgdGVsZW1ldHJpaSBpIGtvbWVuZCBib3RuZXR1LiBXeXN5xYJhIHd5a3JhZHppb25lIHBvxZt3aWFkY3plbmlhIG5hIHpld27EmXRyem5lIGFkcmVzeSBJUC4nLFxuICAgIGljb25OYW1lOiAnV2lmaSdcbiAgfSxcbiAge1xuICAgIGlkOiAnbm9kZS1zaGFyZWQtYXNobWVtJyxcbiAgICBuYW1lOiAnUGFtacSZxIcgV3Nww7PFgmR6aWVsb25hIC9kZXYvYXNobWVtJyxcbiAgICBwcm9jZXNzTmFtZTogJ2FzaG1lbV9zdWJzeXN0ZW1fcG9vbCcsXG4gICAgcGlkOiAyLFxuICAgIG5vZGVUeXBlOiAnQ09NTVVOSUNBVElPTl9CVVMnLFxuICAgIHg6IDczMCxcbiAgICB5OiA0NzAsXG4gICAgY2F0ZWdvcnk6ICdNYWdpc3RyYWxhIFBhbWnEmWNpIFJBTScsXG4gICAgZ25pZGFzQ291bnQ6IDExLFxuICAgIGFnZ3Jlc3Npb25MZXZlbDogNzAsXG4gICAgc3RhdHVzOiAnSU5GRUNURUQnLFxuICAgIGJhbmR3aWR0aDogJzI0MC4wIE1CL3MnLFxuICAgIGNwdUxvYWQ6IDUuNSxcbiAgICBkZXNjcmlwdGlvbjogJ0Fub25pbW93ZSBidWZvcnkgcGFtacSZY2kuIFphdXdhxbxvbm8gcHLDs2J5IHdzdHJ6eWtpd2FuaWEga29kdSBQRSBpIGJpYmxpb3RlayAuc28uJyxcbiAgICBpY29uTmFtZTogJ0hhcmREcml2ZSdcbiAgfVxuXTtcblxuZXhwb3J0IGNvbnN0IElOSVRJQUxfREFUQV9GTE9XX0xJTktTOiBEYXRhRmxvd0Nvbm5lY3Rpb25MaW5rW10gPSBbXG4gIHtcbiAgICBpZDogJ2xpbmstc2VudGluZWwtYmluZGVyJyxcbiAgICBzb3VyY2VOb2RlSWQ6ICdub2RlLXNlbnRpbmVsLWNvcmUnLFxuICAgIHRhcmdldE5vZGVJZDogJ25vZGUtYmluZGVyLWJ1cycsXG4gICAgY29ubmVjdG9yTmFtZTogJ0tlcm5lbCBCaW5kZXIgTGFzZXIgU2hpZWxkaW5nIEJ1cycsXG4gICAgcHJvdG9jb2w6ICdCSU5ERVJfSVBDJyxcbiAgICBnbmlkYXNEZXRlY3RlZDogMixcbiAgICBnbmlkYXNQdXJnZWQ6IDIsXG4gICAgYWdncmVzc2lvblNjb3JlOiAxMCxcbiAgICBwYWNrZXRSYXRlOiAxNDAsXG4gICAgYmFuZHdpZHRoOiAnMTIwIE1CL3MnLFxuICAgIHN0YXR1czogJ0NMRUFOU0VEX1NFQ1VSRScsXG4gICAgdGhyZWF0RGVzY3JpcHRpb246ICdXacSFemthIGtvbnRyb2xuYSB0YXJjenkgU2VudGluZWwgY2hyb25pIHRyYW5zYWtjamUgSVBDLicsXG4gICAgbGFzdFBheWxvYWRTYW1wbGU6ICdTRU5USU5FTF9JUENfVE9LRU5fVkVSSUZJRURfT0snXG4gIH0sXG4gIHtcbiAgICBpZDogJ2xpbmstenlnb3RlLWJpbmRlcicsXG4gICAgc291cmNlTm9kZUlkOiAnbm9kZS1rZXJuZWwtenlnb3RlJyxcbiAgICB0YXJnZXROb2RlSWQ6ICdub2RlLWJpbmRlci1idXMnLFxuICAgIGNvbm5lY3Rvck5hbWU6ICdaeWdvdGUgRm9yayBUcmFuc2FjdCBEaXNwYXRjaGVyJyxcbiAgICBwcm90b2NvbDogJ0JJTkRFUl9JUEMnLFxuICAgIGduaWRhc0RldGVjdGVkOiAxNCxcbiAgICBnbmlkYXNQdXJnZWQ6IDAsXG4gICAgYWdncmVzc2lvblNjb3JlOiA3OCxcbiAgICBwYWNrZXRSYXRlOiA5NSxcbiAgICBiYW5kd2lkdGg6ICc4NCBNQi9zJyxcbiAgICBzdGF0dXM6ICdBQ1RJVkVfSU5GRUNURUQnLFxuICAgIHRocmVhdERlc2NyaXB0aW9uOiAnR25pZHkgd3N0cnp5a3VqxIUgaW50ZW50eSB6IGZsYWfEhSBGTEFHX1JFQ0VJVkVSX0ZPUkVHUk9VTkQuJyxcbiAgICBsYXN0UGF5bG9hZFNhbXBsZTogJ0lOVEVOVF9BQ1RJT05fQk9PVF9QT0lTT05fUEFZTE9BRCdcbiAgfSxcbiAge1xuICAgIGlkOiAnbGluay1jaHJvbWUtenlnb3RlJyxcbiAgICBzb3VyY2VOb2RlSWQ6ICdub2RlLWNocm9tZS1icm93c2VyJyxcbiAgICB0YXJnZXROb2RlSWQ6ICdub2RlLWtlcm5lbC16eWdvdGUnLFxuICAgIGNvbm5lY3Rvck5hbWU6ICdSZW5kZXJlciBTYW5kYm94IE1lbW9yeSBDaGFubmVsJyxcbiAgICBwcm90b2NvbDogJ1VOSVhfU09DS0VUJyxcbiAgICBnbmlkYXNEZXRlY3RlZDogOCxcbiAgICBnbmlkYXNQdXJnZWQ6IDAsXG4gICAgYWdncmVzc2lvblNjb3JlOiA2NSxcbiAgICBwYWNrZXRSYXRlOiA2MCxcbiAgICBiYW5kd2lkdGg6ICczNSBNQi9zJyxcbiAgICBzdGF0dXM6ICdBQ1RJVkVfSU5GRUNURUQnLFxuICAgIHRocmVhdERlc2NyaXB0aW9uOiAnWsWCb8WbbGl3ZSBza3J5cHR5IEpTIHByw7NidWrEhSB1Y2llYyB6IHBpYXNrb3duaWN5IENocm9taXVtLicsXG4gICAgbGFzdFBheWxvYWRTYW1wbGU6ICdWOF9FWFBMT0lUX01FTU9SWV9DT1JSVVBUSU9OX1BST0JFJ1xuICB9LFxuICB7XG4gICAgaWQ6ICdsaW5rLWFkd2FyZS1jMicsXG4gICAgc291cmNlTm9kZUlkOiAnbm9kZS1hZHdhcmUtdHJvamFuJyxcbiAgICB0YXJnZXROb2RlSWQ6ICdub2RlLWMyLXNvY2tldCcsXG4gICAgY29ubmVjdG9yTmFtZTogJ0MyIEV4ZmlsdHJhdGlvbiBSZXZlcnNlIENoYW5uZWwnLFxuICAgIHByb3RvY29sOiAnVENQX1NPQ0tFVCcsXG4gICAgZ25pZGFzRGV0ZWN0ZWQ6IDE5LFxuICAgIGduaWRhc1B1cmdlZDogMCxcbiAgICBhZ2dyZXNzaW9uU2NvcmU6IDk4LFxuICAgIHBhY2tldFJhdGU6IDE4MCxcbiAgICBiYW5kd2lkdGg6ICc1OCBNQi9zJyxcbiAgICBzdGF0dXM6ICdBQ1RJVkVfSU5GRUNURUQnLFxuICAgIHRocmVhdERlc2NyaXB0aW9uOiAnTmlldXN0YW5uZSB3eXN5xYJhbmllIHRlbGVtZXRyeWN6bnljaCBwYWtpZXTDs3cgc3B5d2FyZSBkbyBzZXJ3ZXJhIEMyLicsXG4gICAgbGFzdFBheWxvYWRTYW1wbGU6ICdQT1NUIC9jMi9iZWFjb24/a2V5bG9nPUFDVElWRSZzY3JlZW49T04nXG4gIH0sXG4gIHtcbiAgICBpZDogJ2xpbmstYWR3YXJlLXp5Z290ZScsXG4gICAgc291cmNlTm9kZUlkOiAnbm9kZS1hZHdhcmUtdHJvamFuJyxcbiAgICB0YXJnZXROb2RlSWQ6ICdub2RlLWtlcm5lbC16eWdvdGUnLFxuICAgIGNvbm5lY3Rvck5hbWU6ICdBY2Nlc3NpYmlsaXR5IE92ZXJsYXkgSW5qZWN0aW9uIEhvb2snLFxuICAgIHByb3RvY29sOiAnQklOREVSX0lQQycsXG4gICAgZ25pZGFzRGV0ZWN0ZWQ6IDksXG4gICAgZ25pZGFzUHVyZ2VkOiAwLFxuICAgIGFnZ3Jlc3Npb25TY29yZTogOTIsXG4gICAgcGFja2V0UmF0ZTogMTEwLFxuICAgIGJhbmR3aWR0aDogJzQ0IE1CL3MnLFxuICAgIHN0YXR1czogJ0FDVElWRV9JTkZFQ1RFRCcsXG4gICAgdGhyZWF0RGVzY3JpcHRpb246ICdQcnplY2h3eXR5d2FuaWUgemRhcnplxYQgZG90eWt1IGkgd3N0cnp5a2l3YW5pZSBuaWV3aWR6aWFsbnljaCBva2llbi4nLFxuICAgIGxhc3RQYXlsb2FkU2FtcGxlOiAnVFlQRV9XSU5ET1dfU1RBVEVfQ0hBTkdFRF9PVkVSTEFZX0hJSkFDSydcbiAgfSxcbiAge1xuICAgIGlkOiAnbGluay1iYW5raW5nLWJpbmRlcicsXG4gICAgc291cmNlTm9kZUlkOiAnbm9kZS1iYW5raW5nLXdhbGxldCcsXG4gICAgdGFyZ2V0Tm9kZUlkOiAnbm9kZS1iaW5kZXItYnVzJyxcbiAgICBjb25uZWN0b3JOYW1lOiAnU2VjdXJlIEtleXN0b3JlICYgMkZBIENvbnRlbnQgUHJvdmlkZXInLFxuICAgIHByb3RvY29sOiAnQ09OVEVOVF9QUk9WSURFUicsXG4gICAgZ25pZGFzRGV0ZWN0ZWQ6IDYsXG4gICAgZ25pZGFzUHVyZ2VkOiAwLFxuICAgIGFnZ3Jlc3Npb25TY29yZTogNDUsXG4gICAgcGFja2V0UmF0ZTogNDAsXG4gICAgYmFuZHdpZHRoOiAnMTIgTUIvcycsXG4gICAgc3RhdHVzOiAnQUNUSVZFX0lORkVDVEVEJyxcbiAgICB0aHJlYXREZXNjcmlwdGlvbjogJ1Byw7NieSBvZGN6eXR1IGtvZMOzdyBTTVMgMkZBIHByemV6IHBvZHPFgnVjaGl3YW5pZSBrdXJzb3LDs3cgU1FMaXRlLicsXG4gICAgbGFzdFBheWxvYWRTYW1wbGU6ICdDT05URU5UX1VSSTovL3Ntcy9pbmJveF9RVUVSWV9BVFRFTVBUJ1xuICB9LFxuICB7XG4gICAgaWQ6ICdsaW5rLW1lc3Nlbmdlci1hc2htZW0nLFxuICAgIHNvdXJjZU5vZGVJZDogJ25vZGUtZW5jcnlwdGVkLW1lc3NlbmdlcicsXG4gICAgdGFyZ2V0Tm9kZUlkOiAnbm9kZS1zaGFyZWQtYXNobWVtJyxcbiAgICBjb25uZWN0b3JOYW1lOiAnQ3J5cHRvIEJ1ZmZlciBBc2htZW0gQnJpZGdlJyxcbiAgICBwcm90b2NvbDogJ1NIQVJFRF9NRU0nLFxuICAgIGduaWRhc0RldGVjdGVkOiA1LFxuICAgIGduaWRhc1B1cmdlZDogMCxcbiAgICBhZ2dyZXNzaW9uU2NvcmU6IDMwLFxuICAgIHBhY2tldFJhdGU6IDM1LFxuICAgIGJhbmR3aWR0aDogJzE4IE1CL3MnLFxuICAgIHN0YXR1czogJ0FDVElWRV9JTkZFQ1RFRCcsXG4gICAgdGhyZWF0RGVzY3JpcHRpb246ICdQb2RlanJ6ZW5pZSB6cnp1dHUga2x1Y3p5IEFFUy0yNTYgeiBwYW1pxJljaSBwb2RyxJljem5lai4nLFxuICAgIGxhc3RQYXlsb2FkU2FtcGxlOiAnS0VZX0VYQ0hBTkdFX1JBTV9EVU1QX1BST0JFJ1xuICB9LFxuICB7XG4gICAgaWQ6ICdsaW5rLXNlbnRpbmVsLWMyJyxcbiAgICBzb3VyY2VOb2RlSWQ6ICdub2RlLXNlbnRpbmVsLWNvcmUnLFxuICAgIHRhcmdldE5vZGVJZDogJ25vZGUtYzItc29ja2V0JyxcbiAgICBjb25uZWN0b3JOYW1lOiAnTGFzZXIgSW50ZXJjZXB0b3IgSmFtbWVyIExpbmsnLFxuICAgIHByb3RvY29sOiAnVENQX1NPQ0tFVCcsXG4gICAgZ25pZGFzRGV0ZWN0ZWQ6IDAsXG4gICAgZ25pZGFzUHVyZ2VkOiAxOSxcbiAgICBhZ2dyZXNzaW9uU2NvcmU6IDAsXG4gICAgcGFja2V0UmF0ZTogMjAwLFxuICAgIGJhbmR3aWR0aDogJzMwMCBNQi9zJyxcbiAgICBzdGF0dXM6ICdQVVJHSU5HX0xBU0VSJyxcbiAgICB0aHJlYXREZXNjcmlwdGlvbjogJ0FrdHl3bmEgd2nEhXprYSBsYXNlcmEgU2VudGluZWwgYmxva3VqZSBwYWtpZXR5IGkgc21hxbx5IGduaWF6ZG8gQzIuJyxcbiAgICBsYXN0UGF5bG9hZFNhbXBsZTogJ1NFTlRJTkVMX1RDUF9SU1RfQU5EX0ZJUkVXQUxMX0JMT0NLJ1xuICB9LFxuICB7XG4gICAgaWQ6ICdsaW5rLXNlbnRpbmVsLWFzaG1lbScsXG4gICAgc291cmNlTm9kZUlkOiAnbm9kZS1zZW50aW5lbC1jb3JlJyxcbiAgICB0YXJnZXROb2RlSWQ6ICdub2RlLXNoYXJlZC1hc2htZW0nLFxuICAgIGNvbm5lY3Rvck5hbWU6ICdSQU0gU2FuaXRpemVyICYgR3VhcmQgTWF0cml4JyxcbiAgICBwcm90b2NvbDogJ1NIQVJFRF9NRU0nLFxuICAgIGduaWRhc0RldGVjdGVkOiAxMSxcbiAgICBnbmlkYXNQdXJnZWQ6IDAsXG4gICAgYWdncmVzc2lvblNjb3JlOiA3MCxcbiAgICBwYWNrZXRSYXRlOiA4NSxcbiAgICBiYW5kd2lkdGg6ICc5MCBNQi9zJyxcbiAgICBzdGF0dXM6ICdBQ1RJVkVfSU5GRUNURUQnLFxuICAgIHRocmVhdERlc2NyaXB0aW9uOiAnU2thbm93YW5pZSBkZXNrcnlwdG9yw7N3IEZEIHcgcG9zenVraXdhbml1IHrFgm/Fm2xpd3ljaCBiaWJsaW90ZWsgLnNvLicsXG4gICAgbGFzdFBheWxvYWRTYW1wbGU6ICdBU0hNRU1fTUVNU0VUX1pFUk9fUFJPVEVDVElPTl9TV0VFUCdcbiAgfVxuXTtcblxuY2xhc3MgRGF0YUZsb3dNYXRyaXhFbmdpbmUge1xuICBwcml2YXRlIG5vZGVzOiBEYXRhRmxvd1Byb2Nlc3NOb2RlW107XG4gIHByaXZhdGUgbGlua3M6IERhdGFGbG93Q29ubmVjdGlvbkxpbmtbXTtcbiAgcHJpdmF0ZSBsaXN0ZW5lcnM6IEFycmF5PChub2RlczogRGF0YUZsb3dQcm9jZXNzTm9kZVtdLCBsaW5rczogRGF0YUZsb3dDb25uZWN0aW9uTGlua1tdKSA9PiB2b2lkPiA9IFtdO1xuICBwcml2YXRlIHB1bHNlVGltZXI6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubm9kZXMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KElOSVRJQUxfREFUQV9GTE9XX05PREVTKSk7XG4gICAgdGhpcy5saW5rcyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoSU5JVElBTF9EQVRBX0ZMT1dfTElOS1MpKTtcbiAgICB0aGlzLnN0YXJ0TGl2ZVNpbXVsYXRpb24oKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXROb2RlcygpOiBEYXRhRmxvd1Byb2Nlc3NOb2RlW10ge1xuICAgIHJldHVybiBbLi4udGhpcy5ub2Rlc107XG4gIH1cblxuICBwdWJsaWMgZ2V0TGlua3MoKTogRGF0YUZsb3dDb25uZWN0aW9uTGlua1tdIHtcbiAgICByZXR1cm4gWy4uLnRoaXMubGlua3NdO1xuICB9XG5cbiAgcHVibGljIHN1YnNjcmliZShsaXN0ZW5lcjogKG5vZGVzOiBEYXRhRmxvd1Byb2Nlc3NOb2RlW10sIGxpbmtzOiBEYXRhRmxvd0Nvbm5lY3Rpb25MaW5rW10pID0+IHZvaWQpOiAoKSA9PiB2b2lkIHtcbiAgICB0aGlzLmxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICBsaXN0ZW5lcih0aGlzLmdldE5vZGVzKCksIHRoaXMuZ2V0TGlua3MoKSk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHRoaXMubGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnMuZmlsdGVyKGwgPT4gbCAhPT0gbGlzdGVuZXIpO1xuICAgIH07XG4gIH1cblxuICBwcml2YXRlIG5vdGlmeSgpIHtcbiAgICB0aGlzLmxpc3RlbmVycy5mb3JFYWNoKGwgPT4gbCh0aGlzLmdldE5vZGVzKCksIHRoaXMuZ2V0TGlua3MoKSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGFydExpdmVTaW11bGF0aW9uKCkge1xuICAgIGlmICh0aGlzLnB1bHNlVGltZXIpIHJldHVybjtcbiAgICB0aGlzLnB1bHNlVGltZXIgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgLy8gRHluYW1pYyBtaWNybyBmbHVjdHVhdGlvbnMgaW4gcGFja2V0IHJhdGVzIGFuZCBhZ2dyZXNzaW9uXG4gICAgICB0aGlzLmxpbmtzLmZvckVhY2gobGluayA9PiB7XG4gICAgICAgIGlmIChsaW5rLnN0YXR1cyA9PT0gJ0FDVElWRV9JTkZFQ1RFRCcpIHtcbiAgICAgICAgICBsaW5rLnBhY2tldFJhdGUgPSBNYXRoLm1heCgyMCwgbGluay5wYWNrZXRSYXRlICsgKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDkpIC0gNCkpO1xuICAgICAgICB9IGVsc2UgaWYgKGxpbmsuc3RhdHVzID09PSAnUFVSR0lOR19MQVNFUicpIHtcbiAgICAgICAgICBsaW5rLmFnZ3Jlc3Npb25TY29yZSA9IE1hdGgubWF4KDAsIGxpbmsuYWdncmVzc2lvblNjb3JlIC0gNSk7XG4gICAgICAgICAgaWYgKGxpbmsuYWdncmVzc2lvblNjb3JlIDw9IDApIHtcbiAgICAgICAgICAgIGxpbmsuc3RhdHVzID0gJ0NMRUFOU0VEX1NFQ1VSRSc7XG4gICAgICAgICAgICBsaW5rLmduaWRhc1B1cmdlZCArPSBsaW5rLmduaWRhc0RldGVjdGVkO1xuICAgICAgICAgICAgbGluay5nbmlkYXNEZXRlY3RlZCA9IDA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRoaXMubm90aWZ5KCk7XG4gICAgfSwgMTUwMCk7XG4gIH1cblxuICAvLyBQdXJnZSAvIExhc2VyIERpc2luZmVjdCBhIHNpbmdsZSBjb25uZWN0aW9uIGxpbmtcbiAgcHVibGljIHB1cmdlTGluayhsaW5rSWQ6IHN0cmluZykge1xuICAgIGNvbnN0IGxpbmsgPSB0aGlzLmxpbmtzLmZpbmQobCA9PiBsLmlkID09PSBsaW5rSWQpO1xuICAgIGlmICghbGluaykgcmV0dXJuO1xuXG4gICAgbGluay5zdGF0dXMgPSAnQ0xFQU5TRURfU0VDVVJFJztcbiAgICBsaW5rLmduaWRhc1B1cmdlZCArPSBsaW5rLmduaWRhc0RldGVjdGVkO1xuICAgIGxpbmsuZ25pZGFzRGV0ZWN0ZWQgPSAwO1xuICAgIGxpbmsuYWdncmVzc2lvblNjb3JlID0gMDtcbiAgICBsaW5rLmxhc3RQYXlsb2FkU2FtcGxlID0gJ1NFTlRJTkVMX1BVUkdFX1NVQ0NFU1NGVUxfQ0xFQU5TRUQnO1xuXG4gICAgLy8gUmVjYWxjdWxhdGUgdGFyZ2V0IG5vZGUgYWdncmVzc2lvblxuICAgIHRoaXMucmVjYWxjdWxhdGVOb2RlQWdncmVzc2lvbihsaW5rLnRhcmdldE5vZGVJZCk7XG4gICAgdGhpcy5yZWNhbGN1bGF0ZU5vZGVBZ2dyZXNzaW9uKGxpbmsuc291cmNlTm9kZUlkKTtcbiAgICB0aGlzLm5vdGlmeSgpO1xuICB9XG5cbiAgLy8gU2V2ZXIgLyBDdXQgb2ZmIGNvbm5lY3Rpb25cbiAgcHVibGljIHNldmVyTGluayhsaW5rSWQ6IHN0cmluZykge1xuICAgIGNvbnN0IGxpbmsgPSB0aGlzLmxpbmtzLmZpbmQobCA9PiBsLmlkID09PSBsaW5rSWQpO1xuICAgIGlmICghbGluaykgcmV0dXJuO1xuXG4gICAgbGluay5zdGF0dXMgPSAnU0VWRVJFRF9CTE9DS0VEJztcbiAgICBsaW5rLmFnZ3Jlc3Npb25TY29yZSA9IDA7XG4gICAgbGluay5wYWNrZXRSYXRlID0gMDtcbiAgICBsaW5rLmJhbmR3aWR0aCA9ICcwLjAgS0IvcyAoQkxPQ0tFRCknO1xuICAgIGxpbmsubGFzdFBheWxvYWRTYW1wbGUgPSAnQ09OTkVDVElPTl9TRVZFUkVEX0JZX1NFTlRJTkVMX1dBTEwnO1xuICAgIHRoaXMucmVjYWxjdWxhdGVOb2RlQWdncmVzc2lvbihsaW5rLnRhcmdldE5vZGVJZCk7XG4gICAgdGhpcy5ub3RpZnkoKTtcbiAgfVxuXG4gIC8vIERpc2luZmVjdCB3aG9sZSBwcm9jZXNzIG5vZGUgYW5kIGFsbCBpdHMgY29ubmVjdGVkIGxpbmtzXG4gIHB1YmxpYyBkaXNpbmZlY3ROb2RlKG5vZGVJZDogc3RyaW5nKSB7XG4gICAgY29uc3Qgbm9kZSA9IHRoaXMubm9kZXMuZmluZChuID0+IG4uaWQgPT09IG5vZGVJZCk7XG4gICAgaWYgKCFub2RlKSByZXR1cm47XG5cbiAgICBub2RlLmduaWRhc0NvdW50ID0gMDtcbiAgICBub2RlLmFnZ3Jlc3Npb25MZXZlbCA9IDA7XG4gICAgbm9kZS5zdGF0dXMgPSAnU0VDVVJFRCc7XG5cbiAgICAvLyBEaXNpbmZlY3QgYWxsIGxpbmtzIGNvbm5lY3RlZCB0byB0aGlzIG5vZGVcbiAgICB0aGlzLmxpbmtzLmZvckVhY2gobGluayA9PiB7XG4gICAgICBpZiAobGluay5zb3VyY2VOb2RlSWQgPT09IG5vZGVJZCB8fCBsaW5rLnRhcmdldE5vZGVJZCA9PT0gbm9kZUlkKSB7XG4gICAgICAgIGxpbmsuc3RhdHVzID0gJ0NMRUFOU0VEX1NFQ1VSRSc7XG4gICAgICAgIGxpbmsuZ25pZGFzUHVyZ2VkICs9IGxpbmsuZ25pZGFzRGV0ZWN0ZWQ7XG4gICAgICAgIGxpbmsuZ25pZGFzRGV0ZWN0ZWQgPSAwO1xuICAgICAgICBsaW5rLmFnZ3Jlc3Npb25TY29yZSA9IDA7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLm5vdGlmeSgpO1xuICB9XG5cbiAgLy8gTGFzZXIgRGVjYXBpdGF0aW9uIG9uIGVudGlyZSBuZXR3b3JrICgxMDAlIFB1cmdlKVxuICBwdWJsaWMgcHVyZ2VFbnRpcmVEYXRhRmxvdygpIHtcbiAgICB0aGlzLmxpbmtzLmZvckVhY2gobCA9PiB7XG4gICAgICBsLnN0YXR1cyA9ICdDTEVBTlNFRF9TRUNVUkUnO1xuICAgICAgbC5nbmlkYXNQdXJnZWQgKz0gbC5nbmlkYXNEZXRlY3RlZDtcbiAgICAgIGwuZ25pZGFzRGV0ZWN0ZWQgPSAwO1xuICAgICAgbC5hZ2dyZXNzaW9uU2NvcmUgPSAwO1xuICAgIH0pO1xuXG4gICAgdGhpcy5ub2Rlcy5mb3JFYWNoKG4gPT4ge1xuICAgICAgbi5nbmlkYXNDb3VudCA9IDA7XG4gICAgICBuLmFnZ3Jlc3Npb25MZXZlbCA9IDA7XG4gICAgICBuLnN0YXR1cyA9ICdTRUNVUkVEJztcbiAgICB9KTtcblxuICAgIHRoaXMubm90aWZ5KCk7XG4gIH1cblxuICAvLyBSZXNldCB0byBpbml0aWFsIHN0YXRlXG4gIHB1YmxpYyByZXNldFRvSW5pdGlhbFN0YXRlKCkge1xuICAgIHRoaXMubm9kZXMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KElOSVRJQUxfREFUQV9GTE9XX05PREVTKSk7XG4gICAgdGhpcy5saW5rcyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoSU5JVElBTF9EQVRBX0ZMT1dfTElOS1MpKTtcbiAgICB0aGlzLm5vdGlmeSgpO1xuICB9XG5cbiAgcHJpdmF0ZSByZWNhbGN1bGF0ZU5vZGVBZ2dyZXNzaW9uKG5vZGVJZDogc3RyaW5nKSB7XG4gICAgY29uc3Qgbm9kZSA9IHRoaXMubm9kZXMuZmluZChuID0+IG4uaWQgPT09IG5vZGVJZCk7XG4gICAgaWYgKCFub2RlKSByZXR1cm47XG5cbiAgICBjb25zdCBjb25uZWN0ZWRMaW5rcyA9IHRoaXMubGlua3MuZmlsdGVyKGwgPT4gbC5zb3VyY2VOb2RlSWQgPT09IG5vZGVJZCB8fCBsLnRhcmdldE5vZGVJZCA9PT0gbm9kZUlkKTtcbiAgICBjb25zdCBhY3RpdmVJbmZlY3RlZExpbmtzID0gY29ubmVjdGVkTGlua3MuZmlsdGVyKGwgPT4gbC5zdGF0dXMgPT09ICdBQ1RJVkVfSU5GRUNURUQnKTtcblxuICAgIGlmIChhY3RpdmVJbmZlY3RlZExpbmtzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgbm9kZS5nbmlkYXNDb3VudCA9IDA7XG4gICAgICBub2RlLmFnZ3Jlc3Npb25MZXZlbCA9IDA7XG4gICAgICBub2RlLnN0YXR1cyA9ICdTRUNVUkVEJztcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbWF4QWdncmVzc2lvbiA9IE1hdGgubWF4KC4uLmFjdGl2ZUluZmVjdGVkTGlua3MubWFwKGwgPT4gbC5hZ2dyZXNzaW9uU2NvcmUpKTtcbiAgICAgIG5vZGUuYWdncmVzc2lvbkxldmVsID0gbWF4QWdncmVzc2lvbjtcbiAgICAgIG5vZGUuc3RhdHVzID0gbWF4QWdncmVzc2lvbiA+IDgwID8gJ0lORkVDVEVEJyA6ICdXQVJOSU5HJztcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGRhdGFGbG93TWF0cml4RW5naW5lID0gbmV3IERhdGFGbG93TWF0cml4RW5naW5lKCk7XG4iXSwibWFwcGluZ3MiOiJBQUVPLGFBQU0sMEJBQWlEO0FBQUEsRUFDNUQ7QUFBQSxJQUNFLElBQUk7QUFBQSxJQUNKLE1BQU07QUFBQSxJQUNOLGFBQWE7QUFBQSxJQUNiLEtBQUs7QUFBQSxJQUNMLFVBQVU7QUFBQSxJQUNWLEdBQUc7QUFBQSxJQUNILEdBQUc7QUFBQSxJQUNILFVBQVU7QUFBQSxJQUNWLGFBQWE7QUFBQSxJQUNiLGlCQUFpQjtBQUFBLElBQ2pCLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQSxJQUNYLFNBQVM7QUFBQSxJQUNULGFBQWE7QUFBQSxJQUNiLFVBQVU7QUFBQSxFQUNaO0FBQUEsRUFDQTtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osTUFBTTtBQUFBLElBQ04sYUFBYTtBQUFBLElBQ2IsS0FBSztBQUFBLElBQ0wsVUFBVTtBQUFBLElBQ1YsR0FBRztBQUFBLElBQ0gsR0FBRztBQUFBLElBQ0gsVUFBVTtBQUFBLElBQ1YsYUFBYTtBQUFBLElBQ2IsaUJBQWlCO0FBQUEsSUFDakIsUUFBUTtBQUFBLElBQ1IsV0FBVztBQUFBLElBQ1gsU0FBUztBQUFBLElBQ1QsYUFBYTtBQUFBLElBQ2IsVUFBVTtBQUFBLEVBQ1o7QUFBQSxFQUNBO0FBQUEsSUFDRSxJQUFJO0FBQUEsSUFDSixNQUFNO0FBQUEsSUFDTixhQUFhO0FBQUEsSUFDYixLQUFLO0FBQUEsSUFDTCxVQUFVO0FBQUEsSUFDVixHQUFHO0FBQUEsSUFDSCxHQUFHO0FBQUEsSUFDSCxVQUFVO0FBQUEsSUFDVixhQUFhO0FBQUEsSUFDYixpQkFBaUI7QUFBQSxJQUNqQixRQUFRO0FBQUEsSUFDUixXQUFXO0FBQUEsSUFDWCxTQUFTO0FBQUEsSUFDVCxhQUFhO0FBQUEsSUFDYixVQUFVO0FBQUEsRUFDWjtBQUFBLEVBQ0E7QUFB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