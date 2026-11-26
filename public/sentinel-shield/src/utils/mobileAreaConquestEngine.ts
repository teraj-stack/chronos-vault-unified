export const INITIAL_CONNECTORS_REPORT = [
  {
    id: "conn-binder-ipc",
    name: "Binder IPC Master Bus (/dev/binder)",
    connectorType: "BINDER_IPC",
    gnidasDetectedCount: 14,
    gnidasPurgedCount: 0,
    threatDescription: "Przechwytywanie transakcji międzyprocesowych, próby wstrzykiwania Intentów z flagami FLAG_ACTIVITY_NEW_TASK.",
    securityStatus: "INFECTED",
    throughputBandwidth: "124.8 MB/s",
    firewallAction: "FILTERED",
    lastLog: "Wykryto 14 złośliwych wywołań transact() z nieautoryzowanego UID."
  },
  {
    id: "conn-content-provider",
    name: "Content Provider: Kontakty, SMS & Magazyn Danych",
    connectorType: "CONTENT_PROVIDER",
    gnidasDetectedCount: 9,
    gnidasPurgedCount: 0,
    threatDescription: "Próby wycieku kursorów bazodanowych SQLite oraz nieuprawniony odczyt kodów autoryzacyjnych 2FA SMS.",
    securityStatus: "INFECTED",
    throughputBandwidth: "45.2 MB/s",
    firewallAction: "SEALED",
    lastLog: "Zablokowano zapytanie query() do uri://sms/inbox bez zgody użytkownika."
  },
  {
    id: "conn-broadcast-receivers",
    name: "Broadcast Receivers (BOOT_COMPLETED, SMS_RECEIVED)",
    connectorType: "BROADCAST_RECEIVER",
    gnidasDetectedCount: 12,
    gnidasPurgedCount: 0,
    threatDescription: "Ukryte rejestracje odbiorników autostartu w tle, wybudzanie demonów po zmianie stanu sieci lub ładowarki.",
    securityStatus: "INFECTED",
    throughputBandwidth: "18.4 msg/s",
    firewallAction: "DISINFECTED",
    lastLog: "Zneutralizowano 12 odbiorników Intent-Filter podszywających się pod usługi systemowe."
  },
  {
    id: "conn-tcp-udp-sockets",
    name: "Gniazda Sieciowe TCP/UDP (Porty C2 443 & 8080)",
    connectorType: "TCP_UDP_SOCKET",
    gnidasDetectedCount: 8,
    gnidasPurgedCount: 0,
    threatDescription: "Otwarte gniazda Reverse Shell i próby transferu telemetrii na serwery botnetu.",
    securityStatus: "INFECTED",
    throughputBandwidth: "3.2 MB/s",
    firewallAction: "SEALED",
    lastLog: "Zerwano 8 nieautoryzowanych połączeń TCP SYN na porty zewnętrzne."
  },
  {
    id: "conn-unix-domain-sockets",
    name: "Unix Domain Sockets (/dev/socket/zygote, logd)",
    connectorType: "UNIX_DOMAIN_SOCKET",
    gnidasDetectedCount: 6,
    gnidasPurgedCount: 0,
    threatDescription: "Nieautoryzowane polecenia fork() i próby podglądu bufora logów systemowych logcat.",
    securityStatus: "INFECTED",
    throughputBandwidth: "88.1 MB/s",
    firewallAction: "FILTERED",
    lastLog: "Zablokowano komendę forkAndSpecialize() kierowaną do demona Zygote."
  },
  {
    id: "conn-shared-memory",
    name: "Pamięć Współdzielona (ashmem / /dev/ion)",
    connectorType: "SHARED_MEMORY",
    gnidasDetectedCount: 11,
    gnidasPurgedCount: 0,
    threatDescription: "Ukryte zrzucanie złośliwych bibliotek .so w anonimowych blokach pamięci podręcznej RAM.",
    securityStatus: "INFECTED",
    throughputBandwidth: "512 MB Pool",
    firewallAction: "DISINFECTED",
    lastLog: "Wyczyszczono 11 zanieczyszczonych deskryptorów fd w buforze ashmem."
  },
  {
    id: "conn-accessibility-api",
    name: "Usługi Dostępności & Hooki Nakładek TopMost",
    connectorType: "ACCESSIBILITY_API",
    gnidasDetectedCount: 16,
    gnidasPurgedCount: 0,
    threatDescription: "Agresywny keylogger Dostępności odczytujący dotknięcia ekranu i rysujący niewidoczne ramki dotyku.",
    securityStatus: "INFECTED",
    throughputBandwidth: "60 Hz Polling",
    firewallAction: "SEALED",
    lastLog: "Odcięto uprawnienia AccessibilityService dla podejrzanego procesu overlay."
  },
  {
    id: "conn-clipboard-bridge",
    name: "Mostek Schowka Systemowego (Clipboard Sniffer)",
    connectorType: "CLIPBOARD_BRIDGE",
    gnidasDetectedCount: 7,
    gnidasPurgedCount: 0,
    threatDescription: "Podmienianie adresów portfeli kryptowalut i haseł w buforze kopiowania.",
    securityStatus: "INFECTED",
    throughputBandwidth: "Real-Time Sync",
    firewallAction: "DISINFECTED",
    lastLog: "Wykryto i wyczyszczono 7 reguł podmiany tekstu w ClipboardManager."
  }
];
export const INITIAL_PHONE_APPS = [
  // EKRAN 1: Ekran Główny (Pulpit Smartfona)
  {
    id: "app-base",
    screenIndex: 1,
    packageName: "com.sentinel.shield.base",
    appName: "Baza Sentinel Shield",
    category: "Główna Baza Dowodzenia",
    iconName: "ShieldCheck",
    isBaseApp: true,
    conquestState: "CONQUERED_AND_CLEANSED",
    gnidaCount: 0,
    laserGarrisonPower: 100,
    desantUnitType: "BASE_COMMAND_CORE",
    securedAt: "2026-08-17 04:50:00",
    liveThroughput: "480.2 MB/s (Laser Guarded)",
    aggressionScore: 0,
    connections: [
      { id: "sub-b1", name: "Binder Command Bus", type: "BINDER_IPC", gnidasDetected: 0, gnidasPurged: 4, bandwidth: "240 MB/s", aggressionPercent: 0, status: "CLEANSED" },
      { id: "sub-b2", name: "Laser Core Gateway", type: "TCP_SOCKET", gnidasDetected: 0, gnidasPurged: 2, bandwidth: "180 MB/s", aggressionPercent: 0, status: "CLEANSED" },
      { id: "sub-b3", name: "Encrypted Vault Storage", type: "SHARED_MEM", gnidasDetected: 0, gnidasPurged: 3, bandwidth: "60 MB/s", aggressionPercent: 0, status: "CLEANSED" }
    ]
  },
  {
    id: "app-browser",
    screenIndex: 1,
    packageName: "com.android.chrome.secure",
    appName: "Przeglądarka Web",
    category: "Internet & Pobieranie",
    iconName: "Globe",
    isBaseApp: false,
    conquestState: "UNTOUCHED",
    gnidaCount: 8,
    laserGarrisonPower: 0,
    desantUnitType: "LASER_TOWER_BEAM",
    liveThroughput: "42.8 MB/s",
    aggressionScore: 65,
    connections: [
      { id: "sub-br1", name: "Chromium Sandbox Socket", type: "UNIX_SOCKET", gnidasDetected: 4, gnidasPurged: 0, bandwidth: "24 MB/s", aggressionPercent: 65, status: "INFECTED" },
      { id: "sub-br2", name: "Download Cache Provider", type: "CONTENT_PROVIDER", gnidasDetected: 2, gnidasPurged: 0, bandwidth: "12 MB/s", aggressionPercent: 50, status: "INFECTED" },
      { id: "sub-br3", name: "WebRTC Peer Channel", type: "TCP_SOCKET", gnidasDetected: 2, gnidasPurged: 0, bandwidth: "6.8 MB/s", aggressionPercent: 70, status: "INFECTED" }
    ]
  },
  {
    id: "app-messenger",
    screenIndex: 1,
    packageName: "org.thoughtcrime.securesms",
    appName: "Komunikator Szyfrowany",
    category: "Wiadomości & Połączenia",
    iconName: "MessageSquare",
    isBaseApp: false,
    conquestState: "UNTOUCHED",
    gnidaCount: 6,
    laserGarrisonPower: 0,
    desantUnitType: "KITTEN_DRONE_GARRISON",
    liveThroughput: "18.9 MB/s",
    aggressionScore: 40,
    connections: [
      { id: "sub-ms1", name: "E2EE Signal Protocol Socket", type: "TCP_SOCKET", gnidasDetected: 2, gnidasPurged: 0, bandwidth: "10 MB/s", aggressionPercent: 40, status: "INFECTED" },
      { id: "sub-ms2", name: "Media Cache Ashmem", type: "SHARED_MEM", gnidasDetected: 2, gnidasPurged: 0, bandwidth: "5.5 MB/s", aggressionPercent: 35, status: "INFECTED" },
      { id: "sub-ms3", name: "Contacts Sync Cursor", type: "CONTENT_PROVIDER", gnidasDetected: 2, gnidasPurged: 0, bandwidth: "3.4 MB/s", aggressionPercent: 45, status: "INFECTED" }
    ]
  },
  {
    id: "app-banking",
    screenIndex: 1,
    packageName: "pl.bank.securemobile",
    appName: "Bankowość & Portfel",
    category: "Finanse & Płatności",
    iconName: "CreditCard",
    isBaseApp: false,
    conquestState: "UNTOUCHED",
    gnidaCount: 12,
    laserGarrisonPower: 0,
    desantUnitType: "EMP_RESONATOR",
    liveThroughput: "12.5 MB/s",
    aggressionScore: 78,
    connections: [
      { id: "sub-bk1", name: "Keystore HSM Crypto Bridge", type: "BINDER_IPC", gnidasDetected: 5, gnidasPurged: 0, bandwidth: "4.2 MB/s", aggressionPercent: 85, status: "INFECTED" },
      { id: "sub-bk2", name: "NFC Host Card Emulation", type: "UNIX_SOCKET", gnidasDetected: 3, gnidasPurged: 0, bandwidth: "1.8 MB/s", aggressionPercent: 70, status: "INFECTED" },
      { id: "sub-bk3", name: "2FA SMS Interceptor Target", type: "CONTENT_PROVIDER", gnidasDetected: 4, gnidasPurged: 0, bandwidth: "6.5 MB/s", aggressionPercent: 80, status: "INFECTED" }
    ]
  },
  {
    id: "app-gallery",
    screenIndex: 1,
    packageName: "com.google.android.apps.photos",
    appName: "Galeria Mediów",
    category: "Zdjęcia & Pliki",
    iconName: "Image",
    isBaseApp: false,
    conquestState: "UNTOUCHED",
    gnidaCount: 5,
    laserGarrisonPower: 0,
    desantUnitType: "KITTEN_DRONE_GARRISON",
    liveThroughput: "55.0 MB/s",
    aggressionScore: 35,
    connections: [
      { id: "sub-gl1", name: "MediaStore Image Content Provider", type: "CONTENT_PROVIDER", gnidasDetected: 3, gnidasPurged: 0, bandwidth: "38 MB/s", aggressionPercent: 40, status: "INFECTED" },
      { id: "sub-gl2", name: "Exif Metadata Parser Pipe", type: "SHARED_MEM", gnidasDetected: 2, gnidasPurged: 0, bandwidth: "17 MB/s", aggressionPercent: 30, status: "INFECTED" }
    ]
  },
  {
    id: "app-store",
    screenIndex: 1,
    packageName: "com.android.vending",
    appName: "Sklep Aplikacji",
    category: "Instalatory Paczek APK",
    iconName: "ShoppingBag",
    isBaseApp: false,
    conquestState: "UNTOUCHED",
    gnidaCount: 9,
    laserGarrisonPower: 0,
    desantUnitType: "LASER_TOWER_BEAM",
    liveThroughput: "68.4 MB/s",
    aggressionScore: 72,
    connections: [
      { id: "sub-st1", name: "PackageInstaller Service IPC", type: "BINDER_IPC", gnidasDetected: 5, gnidasPurged: 0, bandwidth: "45 MB/s", aggressionPercent: 75, status: "INFECTED" },
      { id: "sub-st2", name: "In-App Billing Daemon", type: "TCP_SOCKET", gnidasDetected: 4, gnidasPurged: 0, bandwidth: "23.4 MB/s", aggressionPercent: 68, status: "INFECTED" }
    ]
  },
  // EKRAN 2: Narzędzia & System
  {
    id: "app-settings",
    screenIndex: 2,
    packageName: "com.android.settings",
    appName: "Ustawienia Systemu & Uprawnienia",
    category: "Konfiguracja Jądra",
    iconName: "Settings",
    isBaseApp: false,
    conquestState: "UNTOUCHED",
    gnidaCount: 14,
    laserGarrisonPower: 0,
    desantUnitType: "BASE_COMMAND_CORE",
    liveThroughput: "14.2 MB/s",
    aggressionScore: 84,
    connections: [
      { id: "sub-stg1", name: "DevicePolicyManager Admin IPC", type: "BINDER_IPC", gnidasDetected: 6, gnidasPurged: 0, bandwidth: "5.2 MB/s", aggressionPercent: 88, status: "INFECTED" },
      { id: "sub-stg2", name: "AppOps Permission Registry", type: "CONTENT_PROVIDER", gnidasDetected: 5, gnidasPurged: 0, bandwidth: "4.8 MB/s", aggressionPercent: 82, status: "INFECTED" },
      { id: "sub-stg3", name: "Accessibility Service Bridge", type: "ACCESSIBILITY_API", gnidasDetected: 3, gnidasPurged: 0, bandwidth: "4.2 MB/s", aggressionPercent: 80, status: "INFECTED" }
    ]
  },
  {
    id: "app-filemanager",
    screenIndex: 2,
    packageName: "com.android.documentsui",
    appName: "Menedżer Plików /sdcard",
    category: "Pamięć Flash & Root",
    iconName: "Folder",
    isBaseApp: false,
    conquestState: "UNTOUCHED",
    gnidaCount: 7,
    laserGarrisonPower: 0,
    desantUnitType: "LASER_TOWER_BEAM",
    liveThroughput: "85.0 MB/s",
    aggressionScore: 55,
    connections: [
      { id: "sub-fm1", name: "Scoped Storage Virtual FS", type: "SHARED_MEM", gnidasDetected: 4, gnidasPurged: 0, bandwidth: "60 MB/s", aggressionPercent: 60, status: "INFECTED" },
      { id: "sub-fm2", name: "Root Explorer Pipe Channel", type: "UNIX_SOCKET", gnidasDetected: 3, gnidasPurged: 0, bandwidth: "25 MB/s", aggressionPercent: 50, status: "INFECTED" }
    ]
  },
  {
    id: "app-terminal",
    screenIndex: 2,
    packageName: "com.termux.sentinel",
    appName: "Mobilny Terminal Termux",
    category: "Powłoka Shell /bin/sh",
    iconName: "Terminal",
    isBaseApp: false,
    conquestState: "UNTOUCHED",
    gnidaCount: 4,
    laserGarrisonPower: 0,
    desantUnitType: "EMP_RESONATOR",
    liveThroughput: "8.4 MB/s",
    aggressionScore: 45,
    connections: [
      { id: "sub-tm1", name: "PTY Master/Slave Terminal", type: "UNIX_SOCKET", gnidasDetected: 2, gnidasPurged: 0, bandwidth: "5.1 MB/s", aggressionPercent: 45, status: "INFECTED" },
      { id: "sub-tm2", name: "Subprocess Fork Pipeline", type: "BINDER_IPC", gnidasDetected: 2, gnidasPurged: 0, bandwidth: "3.3 MB/s", aggressionPercent: 45, status: "INFECTED" }
    ]
  },
  {
    id: "app-camera",
    screenIndex: 2,
    packageName: "com.android.camera2",
    appName: "Aparat & Sensory",
    category: "Biometria & Mikrofony",
    iconName: "Camera",
    isBaseApp: false,
    conquestState: "UNTOUCHED",
    gnidaCount: 6,
    laserGarrisonPower: 0,
    desantUnitType: "KITTEN_DRONE_GARRISON",
    liveThroughput: "120.0 MB/s",
    aggressionScore: 50,
    connections: [
      { id: "sub-cm1", name: "Camera HAL Native Buffer", type: "SHARED_MEM", gnidasDetected: 3, gnidasPurged: 0, bandwidth: "95 MB/s", aggressionPercent: 55, status: "INFECTED" },
      { id: "sub-cm2", name: "AudioRecord Stream Socket", type: "UNIX_SOCKET", gnidasDetected: 3, gnidasPurged: 0, bandwidth: "25 MB/s", aggressionPercent: 45, status: "INFECTED" }
    ]
  },
  {
    id: "app-vpn",
    screenIndex: 2,
    packageName: "com.wireguard.android",
    appName: "Tunel WireGuard VPN",
    category: "Szyfrowanie Sieci",
    iconName: "Lock",
    isBaseApp: false,
    conquestState: "UNTOUCHED",
    gnidaCount: 3,
    laserGarrisonPower: 0,
    desantUnitType: "LASER_TOWER_BEAM",
    liveThroughput: "94.0 MB/s",
    aggressionScore: 30,
    connections: [
      { id: "sub-vpn1", name: "TUN Virtual Adapter Socket", type: "TCP_SOCKET", gnidasDetected: 2, gnidasPurged: 0, bandwidth: "80 MB/s", aggressionPercent: 30, status: "INFECTED" },
      { id: "sub-vpn2", name: "VpnService Builder IPC", type: "BINDER_IPC", gnidasDetected: 1, gnidasPurged: 0, bandwidth: "14 MB/s", aggressionPercent: 30, status: "INFECTED" }
    ]
  },
  {
    id: "app-notes",
    screenIndex: 2,
    packageName: "org.keepassdroid",
    appName: "Baza Haseł & Notatnik",
    category: "Kryptografia Bazy",
    iconName: "Key",
    isBaseApp: false,
    conquestState: "UNTOUCHED",
    gnidaCount: 5,
    laserGarrisonPower: 0,
    desantUnitType: "BASE_COMMAND_CORE",
    liveThroughput: "2.1 MB/s",
    aggressionScore: 60,
    connections: [
      { id: "sub-kp1", name: "AES-256 Vault Memory Block", type: "SHARED_MEM", gnidasDetected: 3, gnidasPurged: 0, bandwidth: "1.2 MB/s", aggressionPercent: 65, status: "INFECTED" },
      { id: "sub-kp2", name: "Clipboard Auto-Clear Hook", type: "CLIPBOARD_BRIDGE", gnidasDetected: 2, gnidasPurged: 0, bandwidth: "0.9 MB/s", aggressionPercent: 55, status: "INFECTED" }
    ]
  },
  // EKRAN 3: Aplikacje w Tle & Gry
  {
    id: "app-game1",
    screenIndex: 3,
    packageName: "com.adware.arcade.fakegame",
    appName: "Zainfekowana Gra Adware",
    category: "Gry & Reklamy TopMost",
    iconName: "Gamepad2",
    isBaseApp: false,
    conquestState: "UNTOUCHED",
    gnidaCount: 19,
    laserGarrisonPower: 0,
    desantUnitType: "EMP_RESONATOR",
    liveThroughput: "75.2 MB/s",
    aggressionScore: 98,
    connections: [
      { id: "sub-gm1", name: "TopMost Window Overlay Hook", type: "ACCESSIBILITY_API", gnidasDetected: 8, gnidasPurged: 0, bandwidth: "30 MB/s", aggressionPercent: 99, status: "INFECTED" },
      { id: "sub-gm2", name: "Adware C2 Reverse Tunnel", type: "TCP_SOCKET", gnidasDetected: 7, gnidasPurged: 0, bandwidth: "28 MB/s", aggressionPercent: 98, status: "INFECTED" },
      { id: "sub-gm3", name: "WakeLock Battery Drainer", type: "BINDER_IPC", gnidasDetected: 4, gnidasPurged: 0, bandwidth: "17.2 MB/s", aggressionPercent: 95, status: "INFECTED" }
    ]
  },
  {
    id: "app-social",
    screenIndex: 3,
    packageName: "com.social.tracker.client",
    appName: "Klient Social Media",
    category: "Telemetria w Tle",
    iconName: "Share2",
    isBaseApp: false,
    conquestState: "UNTOUCHED",
    gnidaCount: 11,
    laserGarrisonPower: 0,
    desantUnitType: "KITTEN_DRONE_GARRISON",
    liveThroughput: "38.0 MB/s",
    aggressionScore: 80,
    connections: [
      { id: "sub-sc1", name: "Background Tracking Daemon", type: "TCP_SOCKET", gnidasDetected: 5, gnidasPurged: 0, bandwidth: "20 MB/s", aggressionPercent: 85, status: "INFECTED" },
      { id: "sub-sc2", name: "Location Probe Polling Service", type: "BINDER_IPC", gnidasDetected: 4, gnidasPurged: 0, bandwidth: "12 MB/s", aggressionPercent: 78, status: "INFECTED" },
      { id: "sub-sc3", name: "Microphone Buffer Sniffer", type: "SHARED_MEM", gnidasDetected: 2, gnidasPurged: 0, bandwidth: "6 MB/s", aggressionPercent: 75, status: "INFECTED" }
    ]
  },
  {
    id: "app-streaming",
    screenIndex: 3,
    packageName: "com.media.player.stream",
    appName: "Odtwarzacz Strumieniowy",
    category: "Kodeki Audio/Video",
    iconName: "PlaySquare",
    isBaseApp: false,
    conquestState: "UNTOUCHED",
    gnidaCount: 8,
    laserGarrisonPower: 0,
    desantUnitType: "LASER_TOWER_BEAM",
    liveThroughput: "150.0 MB/s",
    aggressionScore: 45,
    connections: [
      { id: "sub-strm1", name: "HLS Media Stream Socket", type: "TCP_SOCKET", gnidasDetected: 4, gnidasPurged: 0, bandwidth: "120 MB/s", aggressionPercent: 45, status: "INFECTED" },
      { id: "sub-strm2", name: "Decoder Ring Buffer", type: "SHARED_MEM", gnidasDetected: 4, gnidasPurged: 0, bandwidth: "30 MB/s", aggressionPercent: 45, status: "INFECTED" }
    ]
  },
  {
    id: "app-cloud",
    screenIndex: 3,
    packageName: "com.cloud.sync.drive",
    appName: "Synchronizacja Chmury",
    category: "Zdalny Backup",
    iconName: "Cloud",
    isBaseApp: false,
    conquestState: "UNTOUCHED",
    gnidaCount: 7,
    laserGarrisonPower: 0,
    desantUnitType: "BASE_COMMAND_CORE",
    liveThroughput: "44.0 MB/s",
    aggressionScore: 50,
    connections: [
      { id: "sub-cld1", name: "SyncAdapter Sync Provider", type: "CONTENT_PROVIDER", gnidasDetected: 4, gnidasPurged: 0, bandwidth: "28 MB/s", aggressionPercent: 55, status: "INFECTED" },
      { id: "sub-cld2", name: "Remote REST Upload Socket", type: "TCP_SOCKET", gnidasDetected: 3, gnidasPurged: 0, bandwidth: "16 MB/s", aggressionPercent: 45, status: "INFECTED" }
    ]
  },
  {
    id: "app-maps",
    screenIndex: 3,
    packageName: "com.google.android.apps.maps",
    appName: "Mapy & Geolokalizacja",
    category: "Nawigacja Satelitarna",
    iconName: "MapPin",
    isBaseApp: false,
    conquestState: "UNTOUCHED",
    gnidaCount: 5,
    laserGarrisonPower: 0,
    desantUnitType: "KITTEN_DRONE_GARRISON",
    liveThroughput: "22.0 MB/s",
    aggressionScore: 35,
    connections: [
      { id: "sub-map1", name: "GPS FusedLocationProvider IPC", type: "BINDER_IPC", gnidasDetected: 3, gnidasPurged: 0, bandwidth: "14 MB/s", aggressionPercent: 40, status: "INFECTED" },
      { id: "sub-map2", name: "Vector Tile Cache Ashmem", type: "SHARED_MEM", gnidasDetected: 2, gnidasPurged: 0, bandwidth: "8 MB/s", aggressionPercent: 30, status: "INFECTED" }
    ]
  },
  {
    id: "app-crypto",
    screenIndex: 3,
    packageName: "io.metamask.wallet",
    appName: "Portfel Web3 & Node",
    category: "Blockchain & Smart Contracts",
    iconName: "Coins",
    isBaseApp: false,
    conquestState: "UNTOUCHED",
    gnidaCount: 10,
    laserGarrisonPower: 0,
    desantUnitType: "EMP_RESONATOR",
    liveThroughput: "16.0 MB/s",
    aggressionScore: 82,
    connections: [
      { id: "sub-w3-1", name: "JSON-RPC Eth Node Socket", type: "TCP_SOCKET", gnidasDetected: 5, gnidasPurged: 0, bandwidth: "10 MB/s", aggressionPercent: 85, status: "INFECTED" },
      { id: "sub-w3-2", name: "Seed Phrase Secure Element", type: "SHARED_MEM", gnidasDetected: 3, gnidasPurged: 0, bandwidth: "3.5 MB/s", aggressionPercent: 80, status: "INFECTED" },
      { id: "sub-w3-3", name: "DeepLink Intent Filter", type: "BINDER_IPC", gnidasDetected: 2, gnidasPurged: 0, bandwidth: "2.5 MB/s", aggressionPercent: 80, status: "INFECTED" }
    ]
  },
  // EKRAN 4: Pasek Powiadomień & Belka Statusu (Notification Drawer / System UI)
  {
    id: "app-notif-bar",
    screenIndex: 4,
    packageName: "com.android.systemui.statusbar",
    appName: "Pasek Powiadomień & Szybkie Ustawienia",
    category: "Panel SystemUI & Quick Settings",
    iconName: "Sliders",
    isBaseApp: false,
    conquestState: "UNTOUCHED",
    gnidaCount: 15,
    laserGarrisonPower: 0,
    desantUnitType: "LASER_TOWER_BEAM",
    liveThroughput: "48.0 MB/s",
    aggressionScore: 90,
    connections: [
      { id: "sub-nt1", name: "NotificationManager Service IPC", type: "BINDER_IPC", gnidasDetected: 7, gnidasPurged: 0, bandwidth: "22 MB/s", aggressionPercent: 92, status: "INFECTED" },
      { id: "sub-nt2", name: "StatusBar View Hierarchy Ashmem", type: "SHARED_MEM", gnidasDetected: 5, gnidasPurged: 0, bandwidth: "16 MB/s", aggressionPercent: 88, status: "INFECTED" },
      { id: "sub-nt3", name: "Heads-Up Popup Dispatcher", type: "ACCESSIBILITY_API", gnidasDetected: 3, gnidasPurged: 0, bandwidth: "10 MB/s", aggressionPercent: 90, status: "INFECTED" }
    ]
  },
  {
    id: "app-lockscreen",
    screenIndex: 4,
    packageName: "com.android.keyguard.biometrics",
    appName: "Ekran Blokady & Biometria",
    category: "Keyguard & Odcisk Palca",
    iconName: "Fingerprint",
    isBaseApp: false,
    conquestState: "UNTOUCHED",
    gnidaCount: 8,
    laserGarrisonPower: 0,
    desantUnitType: "BASE_COMMAND_CORE",
    liveThroughput: "18.0 MB/s",
    aggressionScore: 75,
    connections: [
      { id: "sub-lk1", name: "Fingerprint HAL Daemon Socket", type: "UNIX_SOCKET", gnidasDetected: 4, gnidasPurged: 0, bandwidth: "10 MB/s", aggressionPercent: 80, status: "INFECTED" },
      { id: "sub-lk2", name: "TrustAgent PIN Verification IPC", type: "BINDER_IPC", gnidasDetected: 4, gnidasPurged: 0, bandwidth: "8 MB/s", aggressionPercent: 70, status: "INFECTED" }
    ]
  },
  {
    id: "app-splitwindow",
    screenIndex: 4,
    packageName: "com.android.wm.split",
    appName: "Multi-Window & Podział Ekranu",
    category: "Menedżer Okien DWM/SurfaceFlinger",
    iconName: "LayoutGrid",
    isBaseApp: false,
    conquestState: "UNTOUCHED",
    gnidaCount: 13,
    laserGarrisonPower: 0,
    desantUnitType: "EMP_RESONATOR",
    liveThroughput: "135.0 MB/s",
    aggressionScore: 88,
    connections: [
      { id: "sub-sp1", name: "SurfaceFlinger Layer Mixer", type: "SHARED_MEM", gnidasDetected: 7, gnidasPurged: 0, bandwidth: "85 MB/s", aggressionPercent: 90, status: "INFECTED" },
      { id: "sub-sp2", name: "WindowManager Service IPC", type: "BINDER_IPC", gnidasDetected: 6, gnidasPurged: 0, bandwidth: "50 MB/s", aggressionPercent: 85, status: "INFECTED" }
    ]
  },
  {
    id: "app-background-services",
    screenIndex: 4,
    packageName: "android.os.ServiceManager",
    appName: "Demony & Usługi w Tle",
    category: "Kernel Init & Zygote Services",
    iconName: "Cpu",
    isBaseApp: false,
    conquestState: "UNTOUCHED",
    gnidaCount: 17,
    laserGarrisonPower: 0,
    desantUnitType: "KITTEN_DRONE_GARRISON",
    liveThroughput: "210.0 MB/s",
    aggressionScore: 95,
    connections: [
      { id: "sub-bg1", name: "ServiceManager Daemon /dev/binder", type: "BINDER_IPC", gnidasDetected: 9, gnidasPurged: 0, bandwidth: "120 MB/s", aggressionPercent: 95, status: "INFECTED" },
      { id: "sub-bg2", name: "Zygote Socket Listener", type: "UNIX_SOCKET", gnidasDetected: 5, gnidasPurged: 0, bandwidth: "60 MB/s", aggressionPercent: 95, status: "INFECTED" },
      { id: "sub-bg3", name: "BatteryStats Telemetry Pool", type: "CONTENT_PROVIDER", gnidasDetected: 3, gnidasPurged: 0, bandwidth: "30 MB/s", aggressionPercent: 90, status: "INFECTED" }
    ]
  }
];
class MobileAreaConquestEngine {
  constructor() {
    this.listeners = [];
    this.autoTimer = null;
    this.microPulseTimer = null;
    this.connectors = JSON.parse(JSON.stringify(INITIAL_CONNECTORS_REPORT));
    this.apps = JSON.parse(JSON.stringify(INITIAL_PHONE_APPS));
    const totalGnidas = this.connectors.reduce((acc, c) => acc + c.gnidasDetectedCount, 0);
    this.state = {
      currentStage: "IDLE",
      stageProgress: 0,
      overallProgress: 5,
      isAutoExecuting: false,
      isCompleted: false,
      totalGnidasOnConnectors: totalGnidas,
      totalGnidasPurgedOnConnectors: 0,
      totalAppsConquered: 1,
      // Baza Sentinel jest macierzysta
      totalScreensSecured: 0,
      activeScreenView: 1,
      draggedUnitType: null,
      currentActionLog: "System w gotowości. Aplikacja włączona na telefonie. Oczekiwanie na rozkaz zajęcia obszaru.",
      lastAssaultLog: [
        "📱 Wykryto uruchomienie bazy Sentinel Shield na smartfonie.",
        "🛡️ Inicjalizacja rdzenia obronnego aplikacji macierzystej.",
        "📡 Złącza komunikacyjne IPC/Binder w stanie gotowości do skanowania."
      ]
    };
    this.startLiveTelemetrySimulation();
  }
  startLiveTelemetrySimulation() {
    if (this.microPulseTimer) return;
    this.microPulseTimer = window.setInterval(() => {
      this.apps.forEach((app) => {
        if (app.conquestState === "CONQUERED_AND_CLEANSED") {
          app.laserGarrisonPower = 100;
          app.aggressionScore = 0;
        }
      });
      this.notify();
    }, 2500);
  }
  getState() {
    return { ...this.state };
  }
  getConnectors() {
    return [...this.connectors];
  }
  getApps() {
    return [...this.apps];
  }
  subscribe(listener) {
    this.listeners.push(listener);
    listener(this.getState(), this.getConnectors(), this.getApps());
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
  notify() {
    this.listeners.forEach((l) => l(this.getState(), this.getConnectors(), this.getApps()));
  }
  setActiveScreenView(screenIndex) {
    this.state.activeScreenView = screenIndex;
    this.notify();
  }
  setDraggedUnitType(unitType) {
    this.state.draggedUnitType = unitType;
    this.notify();
  }
  // ============================================================================
  // DEPLOY DESANT VECTOR DIRECTLY (DRAG-AND-DROP OR CLICK)
  // ============================================================================
  deployDesantVectorToApp(appId, unitType) {
    const app = this.apps.find((a) => a.id === appId);
    if (!app) return;
    app.conquestState = "CONQUERED_AND_CLEANSED";
    app.laserGarrisonPower = 100;
    app.desantUnitType = unitType;
    app.securedAt = (/* @__PURE__ */ new Date()).toLocaleTimeString();
    app.aggressionScore = 0;
    if (app.connections) {
      app.connections.forEach((sub) => {
        sub.gnidasPurged += sub.gnidasDetected;
        sub.gnidasDetected = 0;
        sub.status = "CLEANSED";
        sub.aggressionPercent = 0;
      });
    }
    const previousGnidas = app.gnidaCount;
    app.gnidaCount = 0;
    const conquered = this.apps.filter((a) => a.conquestState === "CONQUERED_AND_CLEANSED").length;
    this.state.totalAppsConquered = conquered;
    const screenApps = this.apps.filter((a) => a.screenIndex === app.screenIndex);
    const screenSecured = screenApps.every((a) => a.conquestState === "CONQUERED_AND_CLEANSED");
    const securedScreensCount = [1, 2, 3, 4].filter((idx) => {
      return this.apps.filter((a) => a.screenIndex === idx).every((a) => a.conquestState === "CONQUERED_AND_CLEANSED");
    }).length;
    this.state.totalScreensSecured = securedScreensCount;
    this.state.currentActionLog = `🎯 DESANT TAKTYCZNY: Zrzucono ${unitType} na "${app.appName}"! Zniszczono ${previousGnidas} gnid. Złącza zdezynfekowane.`;
    this.state.lastAssaultLog.unshift(
      `💥 [DESANT RĘCZNY] Jednostka ${unitType} zneutralizowała zagrożenie w ${app.packageName} (Ekran ${app.screenIndex}).`
    );
    if (conquered === this.apps.length) {
      this.state.isCompleted = true;
      this.state.overallProgress = 100;
      this.state.currentStage = "STAGE_4_MULTI_SCREEN";
    }
    this.notify();
  }
  // Cleanse specific sub-connection in an app
  cleanseSubConnection(appId, connId) {
    const app = this.apps.find((a) => a.id === appId);
    if (!app || !app.connections) return;
    const conn = app.connections.find((c) => c.id === connId);
    if (!conn) return;
    conn.gnidasPurged += conn.gnidasDetected;
    conn.gnidasDetected = 0;
    conn.status = "CLEANSED";
    conn.aggressionPercent = 0;
    const totalRemaining = app.connections.reduce((acc, c) => acc + c.gnidasDetected, 0);
    app.gnidaCount = totalRemaining;
    if (totalRemaining === 0) {
      app.conquestState = "CONQUERED_AND_CLEANSED";
      app.laserGarrisonPower = 100;
      app.aggressionScore = 0;
    } else {
      app.aggressionScore = Math.max(...app.connections.map((c) => c.aggressionPercent));
    }
    this.notify();
  }
  // ============================================================================
  // ETAP 1: Zajęcie aplikacji macierzystej (Host Base)
  // ============================================================================
  executeStage1HostBase() {
    this.state.currentStage = "STAGE_1_HOST_APP";
    this.state.stageProgress = 100;
    this.state.overallProgress = 25;
    this.state.activeScreenView = 1;
    const baseApp = this.apps.find((a) => a.isBaseApp);
    if (baseApp) {
      baseApp.conquestState = "CONQUERED_AND_CLEANSED";
      baseApp.laserGarrisonPower = 100;
      baseApp.gnidaCount = 0;
      baseApp.securedAt = (/* @__PURE__ */ new Date()).toLocaleTimeString();
    }
    this.state.currentActionLog = "ETAP 1: Przejęto 100% kontroli nad aplikacją macierzystą. Pamięć ART i bufor graficzny zablokowane tarczą laserową.";
    this.state.lastAssaultLog.unshift(
      "🏰 ETAP 1 ZAKOŃCZONY: Baza Sentinel Shield zabezpieczona. Utworzono niezniszczalny garnizon w aplikacji macierzystej."
    );
    this.notify();
  }
  // ============================================================================
  // ETAP 2: Oczyszczenie wejść i wyjść (Złącza i Raport Gnid)
  // ============================================================================
  executeStage2CleanseConnectors() {
    this.state.currentStage = "STAGE_2_CONNECTORS";
    this.state.stageProgress = 100;
    this.state.overallProgress = 50;
    let purgedInThisStage = 0;
    this.connectors.forEach((conn) => {
      purgedInThisStage += conn.gnidasDetectedCount;
      conn.gnidasPurgedCount = conn.gnidasDetectedCount;
      conn.securityStatus = "100% SECURE & PURGED";
      conn.firewallAction = "DISINFECTED";
      conn.lastLog = `Oczyszczono ${conn.gnidasDetectedCount} gnid. Złącze uszczelnione tarczą laserową.`;
    });
    this.state.totalGnidasPurgedOnConnectors = purgedInThisStage;
    this.state.currentActionLog = `ETAP 2: Przeczyszczono wszystkie wejścia/wyjścia (8 złączy). Zniszczono ${purgedInThisStage} gnid na magistralach komunikacyjnych!`;
    this.state.lastAssaultLog.unshift(
      `⚡ ETAP 2 ZAKOŃCZONY: Raport złączy wygenerowany. Zniszczono ${purgedInThisStage} gnid na złączach Binder, Sockets, Content Providers i pamięci.`
    );
    this.notify();
  }
  // ============================================================================
  // ETAP 3: Desant z aplikacji na sąsiednie aplikacje (Ekran 1)
  // ============================================================================
  executeStage3Screen1Desant() {
    this.state.currentStage = "STAGE_3_SCREEN_DESANT";
    this.state.stageProgress = 100;
    this.state.overallProgress = 75;
    this.state.activeScreenView = 1;
    let conqueredInScreen1 = 0;
    this.apps.filter((a) => a.screenIndex === 1).forEach((app) => {
      app.conquestState = "CONQUERED_AND_CLEANSED";
      app.laserGarrisonPower = 100;
      app.gnidaCount = 0;
      app.aggressionScore = 0;
      app.securedAt = (/* @__PURE__ */ new Date()).toLocaleTimeString();
      if (app.connections) {
        app.connections.forEach((c) => {
          c.gnidasPurged += c.gnidasDetected;
          c.gnidasDetected = 0;
          c.status = "CLEANSED";
          c.aggressionPercent = 0;
        });
      }
      conqueredInScreen1++;
    });
    const totalConquered = this.apps.filter((a) => a.conquestState === "CONQUERED_AND_CLEANSED").length;
    this.state.totalAppsConquered = totalConquered;
    this.state.totalScreensSecured = 1;
    this.state.currentActionLog = `ETAP 3: Desant na sąsiednie aplikacje powiódł się! Zdobyto i oczyszczono cały Ekran 1 (${conqueredInScreen1} aplikacji).`;
    this.state.lastAssaultLog.unshift(
      `🛩️ ETAP 3 ZAKOŃCZONY: Desant z bazy opanował Przeglądarkę, Komunikator, Bankowość, Galerię i Sklep. Cały Ekran 1 w 100% pod kontrolą!`
    );
    this.notify();
  }
  // ============================================================================
  // ETAP 4: Desant na kolejne ekrany (Ekran 2, Ekran 3, Pasek Powiadomień)
  // ============================================================================
  executeStage4MultiScreenDesant() {
    this.state.currentStage = "STAGE_4_MULTI_SCREEN";
    this.state.stageProgress = 100;
    this.state.overallProgress = 100;
    this.state.isCompleted = true;
    this.state.isAutoExecuting = false;
    this.apps.forEach((app) => {
      app.conquestState = "CONQUERED_AND_CLEANSED";
      app.laserGarrisonPower = 100;
      app.gnidaCount = 0;
      app.aggressionScore = 0;
      if (app.connections) {
        app.connections.forEach((c) => {
          c.gnidasPurged += c.gnidasDetected;
          c.gnidasDetected = 0;
          c.status = "CLEANSED";
          c.aggressionPercent = 0;
        });
      }
      if (!app.securedAt) {
        app.securedAt = (/* @__PURE__ */ new Date()).toLocaleTimeString();
      }
    });
    this.connectors.forEach((c) => {
      c.gnidasPurgedCount = c.gnidasDetectedCount;
      c.securityStatus = "100% SECURE & PURGED";
    });
    this.state.totalGnidasPurgedOnConnectors = this.state.totalGnidasOnConnectors;
    this.state.totalAppsConquered = this.apps.length;
    this.state.totalScreensSecured = 4;
    this.state.currentActionLog = "ETAP 4: PEŁNA DOMINACJA! Desant opanował Ekran Narzędzi (2), Ekran Gier/Tła (3) oraz Pasek Powiadomień i SystemUI (4). Cały telefon oczyszczony!";
    this.state.lastAssaultLog.unshift(
      "🏆 ETAP 4 ZAKOŃCZONY: Wszystkie 4 ekrany smartfona zdobyte i oczyszczone. Zero gnid w systemie mobilnym!"
    );
    if (this.autoTimer) {
      clearInterval(this.autoTimer);
      this.autoTimer = null;
    }
    this.notify();
  }
  // ============================================================================
  // AUTOMATYCZNE PRZEPROWADZENIE CAŁEGO CYKLU (AUTO OCCUPATION & DESANT)
  // ============================================================================
  startAutomatedConquest() {
    if (this.state.isAutoExecuting) return;
    this.state.isAutoExecuting = true;
    this.state.isCompleted = false;
    this.state.currentActionLog = "Rozpoczynanie w pełni automatycznego zajmowania obszaru na telefonie...";
    this.state.lastAssaultLog.unshift("🚀 Uruchomiono automatyczny protokół 4-etapowego desantu.");
    this.notify();
    setTimeout(() => {
      this.executeStage1HostBase();
      setTimeout(() => {
        this.executeStage2CleanseConnectors();
        setTimeout(() => {
          this.executeStage3Screen1Desant();
          setTimeout(() => {
            this.executeStage4MultiScreenDesant();
          }, 1200);
        }, 1200);
      }, 1200);
    }, 800);
  }
  // ============================================================================
  // POJEDYNCZY KROK DESANTU (MANUAL STEP-BY-STEP)
  // ============================================================================
  advanceNextStep() {
    switch (this.state.currentStage) {
      case "IDLE":
        this.executeStage1HostBase();
        break;
      case "STAGE_1_HOST_APP":
        this.executeStage2CleanseConnectors();
        break;
      case "STAGE_2_CONNECTORS":
        this.executeStage3Screen1Desant();
        break;
      case "STAGE_3_SCREEN_DESANT":
        this.executeStage4MultiScreenDesant();
        break;
      case "STAGE_4_MULTI_SCREEN":
        this.resetToInitialState();
        break;
    }
  }
  // ============================================================================
  // OCZYSZCZENIE KONKRETNEGO ZŁĄCZA (INTERACTION)
  // ============================================================================
  cleanseSpecificConnector(id) {
    const conn = this.connectors.find((c) => c.id === id);
    if (!conn) return;
    conn.gnidasPurgedCount = conn.gnidasDetectedCount;
    conn.securityStatus = "100% SECURE & PURGED";
    conn.firewallAction = "DISINFECTED";
    conn.lastLog = `Ręcznie oczyszczono ${conn.gnidasDetectedCount} gnid z magistrali. Nałożono filtr laserowy.`;
    const totalPurged = this.connectors.reduce((acc, c) => acc + c.gnidasPurgedCount, 0);
    this.state.totalGnidasPurgedOnConnectors = totalPurged;
    this.state.lastAssaultLog.unshift(`🛡️ Ręczne oczyszczenie złącza: ${conn.name} -> 100% zabezpieczone.`);
    this.notify();
  }
  desantOnSpecificApp(appId) {
    this.deployDesantVectorToApp(appId, "LASER_TOWER_BEAM");
  }
  // ============================================================================
  // GENERATOR SKRYPTU PYTHON/ADB DLA SYSTEMU MOBILNEGO
  // ============================================================================
  generateMobileConquestScript() {
    return `#!/usr/bin/env python3
# ==============================================================================
#  SENTINEL MOBILE TACTICAL DESANT & AREA CONQUEST PROTOCOL (ANDROID / LINUX)
#  Plik: sentinel_mobile_area_conquest.py
#  Opis: 4-etapowe automatyczne zajęcie obszaru telefonu, oczyszczenie złączy,
#        raport ilości gnid oraz desant na ekran bieżący i kolejne ekrany.
# ==============================================================================
import os
import sys
import time

CONNECTORS = [
    {"name": "Binder IPC Master Bus (/dev/binder)", "type": "BINDER_IPC", "gnidas": 14},
    {"name": "Content Provider: Kontakty, SMS & Telephony", "type": "CONTENT_PROVIDER", "gnidas": 9},
    {"name": "Broadcast Receivers (BOOT_COMPLETED, SMS)", "type": "BROADCAST_RECEIVER", "gnidas": 12},
    {"name": "Gniazda Sieciowe TCP/UDP (Porty C2 443/8080)", "type": "TCP_UDP_SOCKET", "gnidas": 8},
    {"name": "Unix Domain Sockets (/dev/socket/zygote)", "type": "UNIX_DOMAIN_SOCKET", "gnidas": 6},
    {"name": "Pamięć Współdzielona (ashmem / /dev/ion)", "type": "SHARED_MEMORY", "gnidas": 11},
    {"name": "Usługi Dostępności & Hooki Nakładek TopMost", "type": "ACCESSIBILITY_API", "gnidas": 16},
    {"name": "Mostek Schowka Systemowego (Clipboard Sniffer)", "type": "CLIPBOARD_BRIDGE", "gnidas": 7}
]

TARGET_SCREENS = {
    "EKRAN 1 (GŁÓWNY)": [
        "com.android.chrome.secure (Przeglądarka Web)",
        "org.thoughtcrime.securesms (Komunikator Szyfrowany)",
        "pl.bank.securemobile (Bankowość & Portfel)",
        "com.google.android.apps.photos (Galeria Mediów)",
        "com.android.vending (Sklep Aplikacji)"
    ],
    "EKRAN 2 (NARZĘDZIA)": [
        "com.android.settings (Ustawienia Systemu)",
        "com.android.documentsui (Menedżer Plików)",
        "com.termux.sentinel (Mobilny Terminal Termux)",
        "com.android.camera2 (Aparat & Sensory)",
        "com.wireguard.android (Tunel WireGuard VPN)",
        "org.keepassdroid (Baza Haseł)"
    ],
    "EKRAN 3 (TŁO / GRY)": [
        "com.adware.arcade.fakegame (Zainfekowana Gra)",
        "com.social.tracker.client (Klient Social Media)",
        "com.media.player.stream (Odtwarzacz Wideo)",
        "com.cloud.sync.drive (Chmura Backup)",
        "io.metamask.wallet (Portfel Web3)"
    ],
    "EKRAN 4 (SYSTEM UI / POWIADOMIENIA)": [
        "com.android.systemui.statusbar (Pasek Powiadomień)",
        "com.android.keyguard.biometrics (Ekran Blokady)",
        "com.android.wm.split (Multi-Window Podział)",
        "android.os.ServiceManager (Demony w Tle)"
    ]
}

def banner():
    print("=" * 80)
    print("  SENTINEL MOBILE SHIELD: AUTOMATYCZNE ZAJMOWANIE OBSZARU SMARTFONA")
    print("  Wersja: 2.4-MOBILE | Protokół: Kill Gnida Desant Engine")
    print("=" * 80)

def stage_1_host_base():
    print("\\n[ETAP 1/4] ZAJĘCIE APLIKACJI MACIERZYSTEJ (SENTINEL BASE LOCKDOWN)...")
    time.sleep(0.4)
    print("  [+] Przejęto bufor renderowania SurfaceFlinger i pamięć ART.")
    print("  [+] Wątki bazy objęte 100% tarczą laserową.")
    print("  [V] ETAP 1 UKOŃCZONY: Aplikacja macierzysta zabezpieczona!")

def stage_2_cleanse_connectors():
    print("\\n[ETAP 2/4] OCZYSZCZANIE WEJŚĆ I WYJŚĆ (ZŁĄCZY) & RAPORT ILOŚCI GNID...")
    time.sleep(0.4)
    print("-" * 80)
    print(f"  {'ZŁĄCZE / MAGISTRALA':<45} | {'TYP':<18} | {'GNIDY':<6} | {'STATUS'}")
    print("-" * 80)
    total_gnidas = 0
    for conn in CONNECTORS:
        total_gnidas += conn['gnidas']
        print(f"  {conn['name']:<45} | {conn['type']:<18} | {conn['gnidas']:<6} | [100% OCZYSZCZONE]")
        time.sleep(0.04)
    print("-" * 80)
    print(f"  [>>>] RAPORT KOŃCOWY ZŁĄCZY: Wykryto i spopielono {total_gnidas} GNID na wejściach/wyjściach!")
    print("  [V] ETAP 2 UKOŃCZONY: Wszystkie złącza IPC/Binder/Sockets zdezynfekowane.")

def stage_3_screen_1_desant():
    print("\\n[ETAP 3/4] DESANT Z APLIKACJI NA SĄSIEDNIE KAFELKI (EKRAN 1)...")
    time.sleep(0.4)
    for pkg in TARGET_SCREENS["EKRAN 1 (GŁÓWNY)"]:
        print(f"  [🛩️ DESANT] Opanowanie: {pkg} -> Ustanowiono garnizon laserowy.")
        time.sleep(0.08)
    print("  [V] ETAP 3 UKOŃCZONY: Zdobyto 100% powierzchni Ekranu Głównego!")

def stage_4_multi_screen_desant():
    print("\\n[ETAP 4/4] DESANT NA KOLEJNE EKRANY (EKRANY 2, 3 ORAZ SYSTEM_UI)...")
    time.sleep(0.4)
    for screen_name, pkgs in TARGET_SCREENS.items():
        if screen_name == "EKRAN 1 (GŁÓWNY)": continue
        print(f"\\n  --- Zdobywanie: {screen_name} ---")
        for pkg in pkgs:
            print(f"    [💥 ZDOBYTO] {pkg} -> Zlikwidowano gnidy, ustanowiono garnizon Sentinel.")
            time.sleep(0.06)
    print("\\n" + "=" * 80)
    print("  [🏆 SUKCES KOŃCOWY] 100% SMARTFONA ZDOBYTE I OCZYSZCZONE! ZERO GNID!")
    print("=" * 80)

def main():
    banner()
    stage_1_host_base()
    stage_2_cleanse_connectors()
    stage_3_screen_1_desant()
    stage_4_multi_screen_desant()

if __name__ == '__main__':
    main()
`;
  }
  // ============================================================================
  // RESET DO STANU POCZĄTKOWEGO
  // ============================================================================
  resetToInitialState() {
    this.connectors = JSON.parse(JSON.stringify(INITIAL_CONNECTORS_REPORT));
    this.apps = JSON.parse(JSON.stringify(INITIAL_PHONE_APPS));
    const totalGnidas = this.connectors.reduce((acc, c) => acc + c.gnidasDetectedCount, 0);
    this.state = {
      currentStage: "IDLE",
      stageProgress: 0,
      overallProgress: 5,
      isAutoExecuting: false,
      isCompleted: false,
      totalGnidasOnConnectors: totalGnidas,
      totalGnidasPurgedOnConnectors: 0,
      totalAppsConquered: 1,
      totalScreensSecured: 0,
      activeScreenView: 1,
      draggedUnitType: null,
      currentActionLog: "Zresetowano stan modułu mobilnego. Baza Sentinel gotowa do ponownego desantu.",
      lastAssaultLog: ["🔄 Zresetowano matrycę desantu smartfona."]
    };
    this.notify();
  }
}
export const mobileAreaConquestEngine = new MobileAreaConquestEngine();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vYmlsZUFyZWFDb25xdWVzdEVuZ2luZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBcbiAgTW9iaWxlRGVzYW50U3RhZ2UsIFxuICBBcHBDb25uZWN0b3JSZXBvcnRJdGVtLCBcbiAgUGhvbmVTY3JlZW5BcHBOb2RlLCBcbiAgTW9iaWxlQXJlYUNvbnF1ZXN0U3RhdGUsXG4gIEFwcFN1YkNvbm5lY3Rpb25UZWxlbWV0cnkgXG59IGZyb20gJy4uL3R5cGVzJztcblxuZXhwb3J0IGNvbnN0IElOSVRJQUxfQ09OTkVDVE9SU19SRVBPUlQ6IEFwcENvbm5lY3RvclJlcG9ydEl0ZW1bXSA9IFtcbiAge1xuICAgIGlkOiAnY29ubi1iaW5kZXItaXBjJyxcbiAgICBuYW1lOiAnQmluZGVyIElQQyBNYXN0ZXIgQnVzICgvZGV2L2JpbmRlciknLFxuICAgIGNvbm5lY3RvclR5cGU6ICdCSU5ERVJfSVBDJyxcbiAgICBnbmlkYXNEZXRlY3RlZENvdW50OiAxNCxcbiAgICBnbmlkYXNQdXJnZWRDb3VudDogMCxcbiAgICB0aHJlYXREZXNjcmlwdGlvbjogJ1ByemVjaHd5dHl3YW5pZSB0cmFuc2FrY2ppIG1pxJlkenlwcm9jZXNvd3ljaCwgcHLDs2J5IHdzdHJ6eWtpd2FuaWEgSW50ZW50w7N3IHogZmxhZ2FtaSBGTEFHX0FDVElWSVRZX05FV19UQVNLLicsXG4gICAgc2VjdXJpdHlTdGF0dXM6ICdJTkZFQ1RFRCcsXG4gICAgdGhyb3VnaHB1dEJhbmR3aWR0aDogJzEyNC44IE1CL3MnLFxuICAgIGZpcmV3YWxsQWN0aW9uOiAnRklMVEVSRUQnLFxuICAgIGxhc3RMb2c6ICdXeWtyeXRvIDE0IHrFgm/Fm2xpd3ljaCB3eXdvxYJhxYQgdHJhbnNhY3QoKSB6IG5pZWF1dG9yeXpvd2FuZWdvIFVJRC4nXG4gIH0sXG4gIHtcbiAgICBpZDogJ2Nvbm4tY29udGVudC1wcm92aWRlcicsXG4gICAgbmFtZTogJ0NvbnRlbnQgUHJvdmlkZXI6IEtvbnRha3R5LCBTTVMgJiBNYWdhenluIERhbnljaCcsXG4gICAgY29ubmVjdG9yVHlwZTogJ0NPTlRFTlRfUFJPVklERVInLFxuICAgIGduaWRhc0RldGVjdGVkQ291bnQ6IDksXG4gICAgZ25pZGFzUHVyZ2VkQ291bnQ6IDAsXG4gICAgdGhyZWF0RGVzY3JpcHRpb246ICdQcsOzYnkgd3ljaWVrdSBrdXJzb3LDs3cgYmF6b2Rhbm93eWNoIFNRTGl0ZSBvcmF6IG5pZXVwcmF3bmlvbnkgb2Rjenl0IGtvZMOzdyBhdXRvcnl6YWN5am55Y2ggMkZBIFNNUy4nLFxuICAgIHNlY3VyaXR5U3RhdHVzOiAnSU5GRUNURUQnLFxuICAgIHRocm91Z2hwdXRCYW5kd2lkdGg6ICc0NS4yIE1CL3MnLFxuICAgIGZpcmV3YWxsQWN0aW9uOiAnU0VBTEVEJyxcbiAgICBsYXN0TG9nOiAnWmFibG9rb3dhbm8gemFweXRhbmllIHF1ZXJ5KCkgZG8gdXJpOi8vc21zL2luYm94IGJleiB6Z29keSB1xbx5dGtvd25pa2EuJ1xuICB9LFxuICB7XG4gICAgaWQ6ICdjb25uLWJyb2FkY2FzdC1yZWNlaXZlcnMnLFxuICAgIG5hbWU6ICdCcm9hZGNhc3QgUmVjZWl2ZXJzIChCT09UX0NPTVBMRVRFRCwgU01TX1JFQ0VJVkVEKScsXG4gICAgY29ubmVjdG9yVHlwZTogJ0JST0FEQ0FTVF9SRUNFSVZFUicsXG4gICAgZ25pZGFzRGV0ZWN0ZWRDb3VudDogMTIsXG4gICAgZ25pZGFzUHVyZ2VkQ291bnQ6IDAsXG4gICAgdGhyZWF0RGVzY3JpcHRpb246ICdVa3J5dGUgcmVqZXN0cmFjamUgb2RiaW9ybmlrw7N3IGF1dG9zdGFydHUgdyB0bGUsIHd5YnVkemFuaWUgZGVtb27Ds3cgcG8gem1pYW5pZSBzdGFudSBzaWVjaSBsdWIgxYJhZG93YXJraS4nLFxuICAgIHNlY3VyaXR5U3RhdHVzOiAnSU5GRUNURUQnLFxuICAgIHRocm91Z2hwdXRCYW5kd2lkdGg6ICcxOC40IG1zZy9zJyxcbiAgICBmaXJld2FsbEFjdGlvbjogJ0RJU0lORkVDVEVEJyxcbiAgICBsYXN0TG9nOiAnWm5ldXRyYWxpem93YW5vIDEyIG9kYmlvcm5pa8OzdyBJbnRlbnQtRmlsdGVyIHBvZHN6eXdhasSFY3ljaCBzacSZIHBvZCB1c8WCdWdpIHN5c3RlbW93ZS4nXG4gIH0sXG4gIHtcbiAgICBpZDogJ2Nvbm4tdGNwLXVkcC1zb2NrZXRzJyxcbiAgICBuYW1lOiAnR25pYXpkYSBTaWVjaW93ZSBUQ1AvVURQIChQb3J0eSBDMiA0NDMgJiA4MDgwKScsXG4gICAgY29ubmVjdG9yVHlwZTogJ1RDUF9VRFBfU09DS0VUJyxcbiAgICBnbmlkYXNEZXRlY3RlZENvdW50OiA4LFxuICAgIGduaWRhc1B1cmdlZENvdW50OiAwLFxuICAgIHRocmVhdERlc2NyaXB0aW9uOiAnT3R3YXJ0ZSBnbmlhemRhIFJldmVyc2UgU2hlbGwgaSBwcsOzYnkgdHJhbnNmZXJ1IHRlbGVtZXRyaWkgbmEgc2Vyd2VyeSBib3RuZXR1LicsXG4gICAgc2VjdXJpdHlTdGF0dXM6ICdJTkZFQ1RFRCcsXG4gICAgdGhyb3VnaHB1dEJhbmR3aWR0aDogJzMuMiBNQi9zJyxcbiAgICBmaXJld2FsbEFjdGlvbjogJ1NFQUxFRCcsXG4gICAgbGFzdExvZzogJ1plcndhbm8gOCBuaWVhdXRvcnl6b3dhbnljaCBwb8WCxIVjemXFhCBUQ1AgU1lOIG5hIHBvcnR5IHpld27EmXRyem5lLidcbiAgfSxcbiAge1xuICAgIGlkOiAnY29ubi11bml4LWRvbWFpbi1zb2NrZXRzJyxcbiAgICBuYW1lOiAnVW5peCBEb21haW4gU29ja2V0cyAoL2Rldi9zb2NrZXQvenlnb3RlLCBsb2dkKScsXG4gICAgY29ubmVjdG9yVHlwZTogJ1VOSVhfRE9NQUlOX1NPQ0tFVCcsXG4gICAgZ25pZGFzRGV0ZWN0ZWRDb3VudDogNixcbiAgICBnbmlkYXNQdXJnZWRDb3VudDogMCxcbiAgICB0aHJlYXREZXNjcmlwdGlvbjogJ05pZWF1dG9yeXpvd2FuZSBwb2xlY2VuaWEgZm9yaygpIGkgcHLDs2J5IHBvZGdsxIVkdSBidWZvcmEgbG9nw7N3IHN5c3RlbW93eWNoIGxvZ2NhdC4nLFxuICAgIHNlY3VyaXR5U3RhdHVzOiAnSU5GRUNURUQnLFxuICAgIHRocm91Z2hwdXRCYW5kd2lkdGg6ICc4OC4xIE1CL3MnLFxuICAgIGZpcmV3YWxsQWN0aW9uOiAnRklMVEVSRUQnLFxuICAgIGxhc3RMb2c6ICdaYWJsb2tvd2FubyBrb21lbmTEmSBmb3JrQW5kU3BlY2lhbGl6ZSgpIGtpZXJvd2FuxIUgZG8gZGVtb25hIFp5Z290ZS4nXG4gIH0sXG4gIHtcbiAgICBpZDogJ2Nvbm4tc2hhcmVkLW1lbW9yeScsXG4gICAgbmFtZTogJ1BhbWnEmcSHIFdzcMOzxYJkemllbG9uYSAoYXNobWVtIC8gL2Rldi9pb24pJyxcbiAgICBjb25uZWN0b3JUeXBlOiAnU0hBUkVEX01FTU9SWScsXG4gICAgZ25pZGFzRGV0ZWN0ZWRDb3VudDogMTEsXG4gICAgZ25pZGFzUHVyZ2VkQ291bnQ6IDAsXG4gICAgdGhyZWF0RGVzY3JpcHRpb246ICdVa3J5dGUgenJ6dWNhbmllIHrFgm/Fm2xpd3ljaCBiaWJsaW90ZWsgLnNvIHcgYW5vbmltb3d5Y2ggYmxva2FjaCBwYW1pxJljaSBwb2RyxJljem5laiBSQU0uJyxcbiAgICBzZWN1cml0eVN0YXR1czogJ0lORkVDVEVEJyxcbiAgICB0aHJvdWdocHV0QmFuZHdpZHRoOiAnNTEyIE1CIFBvb2wnLFxuICAgIGZpcmV3YWxsQWN0aW9uOiAnRElTSU5GRUNURUQnLFxuICAgIGxhc3RMb2c6ICdXeWN6eXN6Y3pvbm8gMTEgemFuaWVjenlzemN6b255Y2ggZGVza3J5cHRvcsOzdyBmZCB3IGJ1Zm9yemUgYXNobWVtLidcbiAgfSxcbiAge1xuICAgIGlkOiAnY29ubi1hY2Nlc3NpYmlsaXR5LWFwaScsXG4gICAgbmFtZTogJ1VzxYJ1Z2kgRG9zdMSZcG5vxZtjaSAmIEhvb2tpIE5ha8WCYWRlayBUb3BNb3N0JyxcbiAgICBjb25uZWN0b3JUeXBlOiAnQUNDRVNTSUJJTElUWV9BUEknLFxuICAgIGduaWRhc0RldGVjdGVkQ291bnQ6IDE2LFxuICAgIGduaWRhc1B1cmdlZENvdW50OiAwLFxuICAgIHRocmVhdERlc2NyaXB0aW9uOiAnQWdyZXN5d255IGtleWxvZ2dlciBEb3N0xJlwbm/Fm2NpIG9kY3p5dHVqxIVjeSBkb3RrbmnEmWNpYSBla3JhbnUgaSByeXN1asSFY3kgbmlld2lkb2N6bmUgcmFta2kgZG90eWt1LicsXG4gICAgc2VjdXJpdHlTdGF0dXM6ICdJTkZFQ1RFRCcsXG4gICAgdGhyb3VnaHB1dEJhbmR3aWR0aDogJzYwIEh6IFBvbGxpbmcnLFxuICAgIGZpcmV3YWxsQWN0aW9uOiAnU0VBTEVEJyxcbiAgICBsYXN0TG9nOiAnT2RjacSZdG8gdXByYXduaWVuaWEgQWNjZXNzaWJpbGl0eVNlcnZpY2UgZGxhIHBvZGVqcnphbmVnbyBwcm9jZXN1IG92ZXJsYXkuJ1xuICB9LFxuICB7XG4gICAgaWQ6ICdjb25uLWNsaXBib2FyZC1icmlkZ2UnLFxuICAgIG5hbWU6ICdNb3N0ZWsgU2Nob3drYSBTeXN0ZW1vd2VnbyAoQ2xpcGJvYXJkIFNuaWZmZXIpJyxcbiAgICBjb25uZWN0b3JUeXBlOiAnQ0xJUEJPQVJEX0JSSURHRScsXG4gICAgZ25pZGFzRGV0ZWN0ZWRDb3VudDogNyxcbiAgICBnbmlkYXNQdXJnZWRDb3VudDogMCxcbiAgICB0aHJlYXREZXNjcmlwdGlvbjogJ1BvZG1pZW5pYW5pZSBhZHJlc8OzdyBwb3J0ZmVsaSBrcnlwdG93YWx1dCBpIGhhc2XFgiB3IGJ1Zm9yemUga29waW93YW5pYS4nLFxuICAgIHNlY3VyaXR5U3RhdHVzOiAnSU5GRUNURUQnLFxuICAgIHRocm91Z2hwdXRCYW5kd2lkdGg6ICdSZWFsLVRpbWUgU3luYycsXG4gICAgZmlyZXdhbGxBY3Rpb246ICdESVNJTkZFQ1RFRCcsXG4gICAgbGFzdExvZzogJ1d5a3J5dG8gaSB3eWN6eXN6Y3pvbm8gNyByZWd1xYIgcG9kbWlhbnkgdGVrc3R1IHcgQ2xpcGJvYXJkTWFuYWdlci4nXG4gIH1cbl07XG5cbmV4cG9ydCBjb25zdCBJTklUSUFMX1BIT05FX0FQUFM6IFBob25lU2NyZWVuQXBwTm9kZVtdID0gW1xuICAvLyBFS1JBTiAxOiBFa3JhbiBHxYLDs3dueSAoUHVscGl0IFNtYXJ0Zm9uYSlcbiAge1xuICAgIGlkOiAnYXBwLWJhc2UnLFxuICAgIHNjcmVlbkluZGV4OiAxLFxuICAgIHBhY2thZ2VOYW1lOiAnY29tLnNlbnRpbmVsLnNoaWVsZC5iYXNlJyxcbiAgICBhcHBOYW1lOiAnQmF6YSBTZW50aW5lbCBTaGllbGQnLFxuICAgIGNhdGVnb3J5OiAnR8WCw7N3bmEgQmF6YSBEb3dvZHplbmlhJyxcbiAgICBpY29uTmFtZTogJ1NoaWVsZENoZWNrJyxcbiAgICBpc0Jhc2VBcHA6IHRydWUsXG4gICAgY29ucXVlc3RTdGF0ZTogJ0NPTlFVRVJFRF9BTkRfQ0xFQU5TRUQnLFxuICAgIGduaWRhQ291bnQ6IDAsXG4gICAgbGFzZXJHYXJyaXNvblBvd2VyOiAxMDAsXG4gICAgZGVzYW50VW5pdFR5cGU6ICdCQVNFX0NPTU1BTkRfQ09SRScsXG4gICAgc2VjdXJlZEF0OiAnMjAyNi0wOC0xNyAwNDo1MDowMCcsXG4gICAgbGl2ZVRocm91Z2hwdXQ6ICc0ODAuMiBNQi9zIChMYXNlciBHdWFyZGVkKScsXG4gICAgYWdncmVzc2lvblNjb3JlOiAwLFxuICAgIGNvbm5lY3Rpb25zOiBbXG4gICAgICB7IGlkOiAnc3ViLWIxJywgbmFtZTogJ0JpbmRlciBDb21tYW5kIEJ1cycsIHR5cGU6ICdCSU5ERVJfSVBDJywgZ25pZGFzRGV0ZWN0ZWQ6IDAsIGduaWRhc1B1cmdlZDogNCwgYmFuZHdpZHRoOiAnMjQwIE1CL3MnLCBhZ2dyZXNzaW9uUGVyY2VudDogMCwgc3RhdHVzOiAnQ0xFQU5TRUQnIH0sXG4gICAgICB7IGlkOiAnc3ViLWIyJywgbmFtZTogJ0xhc2VyIENvcmUgR2F0ZXdheScsIHR5cGU6ICdUQ1BfU09DS0VUJywgZ25pZGFzRGV0ZWN0ZWQ6IDAsIGduaWRhc1B1cmdlZDogMiwgYmFuZHdpZHRoOiAnMTgwIE1CL3MnLCBhZ2dyZXNzaW9uUGVyY2VudDogMCwgc3RhdHVzOiAnQ0xFQU5TRUQnIH0sXG4gICAgICB7IGlkOiAnc3ViLWIzJywgbmFtZTogJ0VuY3J5cHRlZCBWYXVsdCBTdG9yYWdlJywgdHlwZTogJ1NIQVJFRF9NRU0nLCBnbmlkYXNEZXRlY3RlZDogMCwgZ25pZGFzUHVyZ2VkOiAzLCBiYW5kd2lkdGg6ICc2MCBNQi9zJywgYWdncmVzc2lvblBlcmNlbnQ6IDAsIHN0YXR1czogJ0NMRUFOU0VEJyB9XG4gICAgXVxuICB9LFxuICB7XG4gICAgaWQ6ICdhcHAtYnJvd3NlcicsXG4gICAgc2NyZWVuSW5kZXg6IDEsXG4gICAgcGFja2FnZU5hbWU6ICdjb20uYW5kcm9pZC5jaHJvbWUuc2VjdXJlJyxcbiAgICBhcHBOYW1lOiAnUHJ6ZWdsxIVkYXJrYSBXZWInLFxuICAgIGNhdGVnb3J5OiAnSW50ZXJuZXQgJiBQb2JpZXJhbmllJyxcbiAgICBpY29uTmFtZTogJ0dsb2JlJyxcbiAgICBpc0Jhc2VBcHA6IGZhbHNlLFxuICAgIGNvbnF1ZXN0U3RhdGU6ICdVTlRPVUNIRUQnLFxuICAgIGduaWRhQ291bnQ6IDgsXG4gICAgbGFzZXJHYXJyaXNvblBvd2VyOiAwLFxuICAgIGRlc2FudFVuaXRUeXBlOiAnTEFTRVJfVE9XRVJfQkVBTScsXG4gICAgbGl2ZVRocm91Z2hwdXQ6ICc0Mi44IE1CL3MnLFxuICAgIGFnZ3Jlc3Npb25TY29yZTogNjUsXG4gICAgY29ubmVjdGlvbnM6IFtcbiAgICAgIHsgaWQ6ICdzdWItYnIxJywgbmFtZTogJ0Nocm9taXVtIFNhbmRib3ggU29ja2V0JywgdHlwZTogJ1VOSVhfU09DS0VUJywgZ25pZGFzRGV0ZWN0ZWQ6IDQsIGduaWRhc1B1cmdlZDogMCwgYmFuZHdpZHRoOiAnMjQgTUIvcycsIGFnZ3Jlc3Npb25QZXJjZW50OiA2NSwgc3RhdHVzOiAnSU5GRUNURUQnIH0sXG4gICAgICB7IGlkOiAnc3ViLWJyMicsIG5hbWU6ICdEb3dubG9hZCBDYWNoZSBQcm92aWRlcicsIHR5cGU6ICdDT05URU5UX1BST1ZJREVSJywgZ25pZGFzRGV0ZWN0ZWQ6IDIsIGduaWRhc1B1cmdlZDogMCwgYmFuZHdpZHRoOiAnMTIgTUIvcycsIGFnZ3Jlc3Npb25QZXJjZW50OiA1MCwgc3RhdHVzOiAnSU5GRUNURUQnIH0sXG4gICAgICB7IGlkOiAnc3ViLWJyMycsIG5hbWU6ICdXZWJSVEMgUGVlciBDaGFubmVsJywgdHlwZTogJ1RDUF9TT0NLRVQnLCBnbmlkYXNEZXRlY3RlZDogMiwgZ25pZGFzUHVyZ2VkOiAwLCBiYW5kd2lkdGg6ICc2LjggTUIvcycsIGFnZ3Jlc3Npb25QZXJjZW50OiA3MCwgc3RhdHVzOiAnSU5GRUNURUQnIH1cbiAgICBdXG4gIH0sXG4gIHtcbiAgICBpZDogJ2FwcC1tZXNzZW5nZXInLFxuICAgIHNjcmVlbkluZGV4OiAxLFxuICAgIHBhY2thZ2VOYW1lOiAnb3JnLnRob3VnaHRjcmltZS5zZWN1cmVzbXMnLFxuICAgIGFwcE5hbWU6ICdLb211bmlrYXRvciBTenlmcm93YW55JyxcbiAgICBjYXRlZ29yeTogJ1dpYWRvbW/Fm2NpICYgUG/FgsSFY3plbmlhJyxcbiAgICBpY29uTmFtZTogJ01lc3NhZ2VTcXVhcmUnLFxuICAgIGlzQmFzZUFwcDogZmFsc2UsXG4gICAgY29ucXVlc3RTdGF0ZTogJ1VOVE9VQ0hFRCcsXG4gICAgZ25pZGFDb3VudDogNixcbiAgICBsYXNlckdhcnJpc29uUG93ZXI6IDAsXG4gICAgZGVzYW50VW5pdFR5cGU6ICdLSVRURU5fRFJPTkVfR0FSUklTT04nLFxuICAgIGxpdmVUaHJvdWdocHV0OiAnMTguOSBNQi9zJyxcbiAgICBhZ2dyZXNzaW9uU2NvcmU6IDQwLFxuICAgIGNvbm5lY3Rpb25zOiBbXG4gICAgICB7IGlkOiAnc3ViLW1zMScsIG5hbWU6ICdFMkVFIFNpZ25hbCBQcm90b2NvbCBTb2NrZXQnLCB0eXBlOiAnVENQX1NPQ0tFVCcsIGduaWRhc0RldGVjdGVkOiAyLCBnbmlkYXNQdXJnZWQ6IDAsIGJhbmR3aWR0aDogJzEwIE1CL3MnLCBhZ2dyZXNzaW9uUGVyY2VudDogNDAsIHN0YXR1czogJ0lORkVDVEVEJyB9LFxuICAgICAgeyBpZDogJ3N1Yi1tczInLCBuYW1lOiAnTWVkaWEgQ2FjaGUgQXNobWVtJywgdHlwZTogJ1NIQVJFRF9NRU0nLCBnbmlkYXNEZXRlY3RlZDogMiwgZ25pZGFzUHVyZ2VkOiAwLCBiYW5kd2lkdGg6ICc1LjUgTUIvcycsIGFnZ3Jlc3Npb25QZXJjZW50OiAzNSwgc3RhdHVzOiAnSU5GRUNURUQnIH0sXG4gICAgICB7IGlkOiAnc3ViLW1zMycsIG5hbWU6ICdDb250YWN0cyBTeW5jIEN1cnNvcicsIHR5cGU6ICdDT05URU5UX1BST1ZJREVSJywgZ25pZGFzRGV0ZWN0ZWQ6IDIsIGduaWRhc1B1cmdlZDogMCwgYmFuZHdpZHRoOiAnMy40IE1CL3MnLCBhZ2dyZXNzaW9uUGVyY2VudDogNDUsIHN0YXR1czogJ0lORkVDVEVEJyB9XG4gICAgXVxuICB9LFxuICB7XG4gICAgaWQ6ICdhcHAtYmFua2luZycsXG4gICAgc2NyZWVuSW5kZXg6IDEsXG4gICAgcGFja2FnZU5hbWU6ICdwbC5iYW5rLnNlY3VyZW1vYmlsZScsXG4gICAgYXBwTmFtZTogJ0Jhbmtvd2/Fm8SHICYgUG9ydGZlbCcsXG4gICAgY2F0ZWdvcnk6ICdGaW5hbnNlICYgUMWCYXRub8WbY2knLFxuICAgIGljb25OYW1lOiAnQ3JlZGl0Q2FyZCcsXG4gICAgaXNCYXNlQXBwOiBmYWxzZSxcbiAgICBjb25xdWVzdFN0YXRlOiAnVU5UT1VDSEVEJyxcbiAgICBnbmlkYUNvdW50OiAxMixcbiAgICBsYXNlckdhcnJpc29uUG93ZXI6IDAsXG4gICAgZGVzYW50VW5pdFR5cGU6ICdFTVBfUkVTT05BVE9SJyxcbiAgICBsaXZlVGhyb3VnaHB1dDogJzEyLjUgTUIvcycsXG4gICAgYWdncmVzc2lvblNjb3JlOiA3OCxcbiAgICBjb25uZWN0aW9uczogW1xuICAgICAgeyBpZDogJ3N1Yi1iazEnLCBuYW1lOiAnS2V5c3RvcmUgSFNNIENyeXB0byBCcmlkZ2UnLCB0eXBlOiAnQklOREVSX0lQQycsIGduaWRhc0RldGVjdGVkOiA1LCBnbmlkYXNQdXJnZWQ6IDAsIGJhbmR3aWR0aDogJzQuMiBNQi9zJywgYWdncmVzc2lvblBlcmNlbnQ6IDg1LCBzdGF0dXM6ICdJTkZFQ1RFRCcgfSxcbiAgICAgIHsgaWQ6ICdzdWItYmsyJywgbmFtZTogJ05GQyBIb3N0IENhcmQgRW11bGF0aW9uJywgdHlwZTogJ1VOSVhfU09DS0VUJywgZ25pZGFzRGV0ZWN0ZWQ6IDMsIGduaWRhc1B1cmdlZDogMCwgYmFuZHdpZHRoOiAnMS44IE1CL3MnLCBhZ2dyZXNzaW9uUGVyY2VudDogNzAsIHN0YXR1czogJ0lORkVDVEVEJyB9LFxuICAgICAgeyBpZDogJ3N1Yi1iazMnLCBuYW1lOiAnMkZBIFNNUyBJbnRlcmNlcHRvciBUYXJnZXQnLCB0eXBlOiAnQ09OVEVOVF9QUk9WSURFUicsIGduaWRhc0RldGVjdGVkOiA0LCBnbmlkYXNQdXJnZWQ6IDAsIGJhbmR3aWR0aDogJzYuNSBNQi9zJywgYWdncmVzc2lvblBlcmNlbnQ6IDgwLCBzdGF0dXM6ICdJTkZFQ1RFRCcgfVxuICAgIF1cbiAgfSxcbiAge1xuICAgIGlkOiAnYXBwLWdhbGxlcnknLFxuICAgIHNjcmVlbkluZGV4OiAxLFxuICAgIHBhY2thZ2VOYW1lOiAnY29tLmdvb2dsZS5hbmRyb2lkLmFwcHMucGhvdG9zJyxcbiAgICBhcHBOYW1lOiAnR2FsZXJpYSBNZWRpw7N3JyxcbiAgICBjYXRlZ29yeTogJ1pkasSZY2lhICYgUGxpa2knLFxuICAgIGljb25OYW1lOiAnSW1hZ2UnLFxuICAgIGlzQmFzZUFwcDogZmFsc2UsXG4gICAgY29ucXVlc3RTdGF0ZTogJ1VOVE9VQ0hFRCcsXG4gICAgZ25pZGFDb3VudDogNSxcbiAgICBsYXNlckdhcnJpc29uUG93ZXI6IDAsXG4gICAgZGVzYW50VW5pdFR5cGU6ICdLSVRURU5fRFJPTkVfR0FSUklTT04nLFxuICAgIGxpdmVUaHJvdWdocHV0OiAnNTUuMCBNQi9zJyxcbiAgICBhZ2dyZXNzaW9uU2NvcmU6IDM1LFxuICAgIGNvbm5lY3Rpb25zOiBbXG4gICAgICB7IGlkOiAnc3ViLWdsMScsIG5hbWU6ICdNZWRpYVN0b3JlIEltYWdlIENvbnRlbnQgUHJvdmlkZXInLCB0eXBlOiAnQ09OVEVOVF9QUk9WSURFUicsIGduaWRhc0RldGVjdGVkOiAzLCBnbmlkYXNQdXJnZWQ6IDAsIGJhbmR3aWR0aDogJzM4IE1CL3MnLCBhZ2dyZXNzaW9uUGVyY2VudDogNDAsIHN0YXR1czogJ0lORkVDVEVEJyB9LFxuICAgICAgeyBpZDogJ3N1Yi1nbDInLCBuYW1lOiAnRXhpZiBNZXRhZGF0YSBQYXJzZXIgUGlwZScsIHR5cGU6ICdTSEFSRURfTUVNJywgZ25pZGFzRGV0ZWN0ZWQ6IDIsIGduaWRhc1B1cmdlZDogMCwgYmFuZHdpZHRoOiAnMTcgTUIvcycsIGFnZ3Jlc3Npb25QZXJjZW50OiAzMCwgc3RhdHVzOiAnSU5GRUNURUQnIH1cbiAgICBdXG4gIH0sXG4gIHtcbiAgICBpZDogJ2FwcC1zdG9yZScsXG4gICAgc2NyZWVuSW5kZXg6IDEsXG4gICAgcGFja2FnZU5hbWU6ICdjb20uYW5kcm9pZC52ZW5kaW5nJyxcbiAgICBhcHBOYW1lOiAnU2tsZXAgQXBsaWthY2ppJyxcbiAgICBjYXRlZ29yeTogJ0luc3RhbGF0b3J5IFBhY3playBBUEsnLFxuICAgIGljb25OYW1lOiAnU2hvcHBpbmdCYWcnLFxuICAgIGlzQmFzZUFwcDogZmFsc2UsXG4gICAgY29ucXVlc3RTdGF0ZTogJ1VOVE9VQ0hFRCcsXG4gICAgZ25pZGFDb3VudDogOSxcbiAgICBsYXNlckdhcnJpc29uUG93ZXI6IDAsXG4gICAgZGVzYW50VW5pdFR5cGU6ICdMQVNFUl9UT1dFUl9CRUFNJyxcbiAgICBsaXZlVGhyb3VnaHB1dDogJzY4LjQgTUIvcycsXG4gICAgYWdncmVzc2lvblNjb3JlOiA3MixcbiAgICBjb25uZWN0aW9uczogW1xuICAgICAgeyBpZDogJ3N1Yi1zdDEnLCBuYW1lOiAnUGFja2FnZUluc3RhbGxlciBTZXJ2aWNlIElQQycsIHR5cGU6ICdCSU5ERVJfSVBDJywgZ25pZGFzRGV0ZWN0ZWQ6IDUsIGduaWRhc1B1cmdlZDogMCwgYmFuZHdpZHRoOiAnNDUgTUIvcycsIGFnZ3Jlc3Npb25QZXJjZW50OiA3NSwgc3RhdHVzOiAnSU5GRUNURUQnIH0sXG4gICAgICB7IGlkOiAnc3ViLXN0MicsIG5hbWU6ICdJbi1BcHAgQmlsbGluZyBEYWVtb24nLCB0eXBlOiAnVENQX1NPQ0tFVCcsIGduaWRhc0RldGVjdGVkOiA0LCBnbmlkYXNQdXJnZWQ6IDAsIGJhbmR3aWR0aDogJzIzLjQgTUIvcycsIGFnZ3Jlc3Npb25QZXJjZW50OiA2OCwgc3RhdHVzOiAnSU5GRUNURUQnIH1cbiAgICBdXG4gIH0sXG5cbiAgLy8gRUtSQU4gMjogTmFyesSZZHppYSAmIFN5c3RlbVxuICB7XG4gICAgaWQ6ICdhcHAtc2V0dGluZ3MnLFxuICAgIHNjcmVlbkluZGV4OiAyLFxuICAgIHBhY2thZ2VOYW1lOiAnY29tLmFuZHJvaWQuc2V0dGluZ3MnLFxuICAgIGFwcE5hbWU6ICdVc3Rhd2llbmlhIFN5c3RlbXUgJiBVcHJhd25pZW5pYScsXG4gICAgY2F0ZWdvcnk6ICdLb25maWd1cmFjamEgSsSFZHJhJyxcbiAgICBpY29uTmFtZTogJ1NldHRpbmdzJyxcbiAgICBpc0Jhc2VBcHA6IGZhbHNlLFxuICAgIGNvbnF1ZXN0U3RhdGU6ICdVTlRPVUNIRUQnLFxuICAgIGduaWRhQ291bnQ6IDE0LFxuICAgIGxhc2VyR2Fycmlzb25Qb3dlcjogMCxcbiAgICBkZXNhbnRVbml0VHlwZTogJ0JBU0VfQ09NTUFORF9DT1JFJyxcbiAgICBsaXZlVGhyb3VnaHB1dDogJzE0LjIgTUIvcycsXG4gICAgYWdncmVzc2lvblNjb3JlOiA4NCxcbiAgICBjb25uZWN0aW9uczogW1xuICAgICAgeyBpZDogJ3N1Yi1zdGcxJywgbmFtZTogJ0RldmljZVBvbGljeU1hbmFnZXIgQWRtaW4gSVBDJywgdHlwZTogJ0JJTkRFUl9JUEMnLCBnbmlkYXNEZXRlY3RlZDogNiwgZ25pZGFzUHVyZ2VkOiAwLCBiYW5kd2lkdGg6ICc1LjIgTUIvcycsIGFnZ3Jlc3Npb25QZXJjZW50OiA4OCwgc3RhdHVzOiAnSU5GRUNURUQnIH0sXG4gICAgICB7IGlkOiAnc3ViLXN0ZzInLCBuYW1lOiAnQXBwT3BzIFBlcm1pc3Npb24gUmVnaXN0cnknLCB0eXBlOiAnQ09OVEVOVF9QUk9WSURFUicsIGduaWRhc0RldGVjdGVkOiA1LCBnbmlkYXNQdXJnZWQ6IDAsIGJhbmR3aWR0aDogJzQuOCBNQi9zJywgYWdncmVzc2lvblBlcmNlbnQ6IDgyLCBzdGF0dXM6ICdJTkZFQ1RFRCcgfSxcbiAgICAgIHsgaWQ6ICdzdWItc3RnMycsIG5hbWU6ICdBY2Nlc3NpYmlsaXR5IFNlcnZpY2UgQnJpZGdlJywgdHlwZTogJ0FDQ0VTU0lCSUxJVFlfQVBJJywgZ25pZGFzRGV0ZWN0ZWQ6IDMsIGduaWRhc1B1cmdlZDogMCwgYmFuZHdpZHRoOiAnNC4yIE1CL3MnLCBhZ2dyZXNzaW9uUGVyY2VudDogODAsIHN0YXR1czogJ0lORkVDVEVEJyB9XG4gICAgXVxuICB9LFxuICB7XG4gICAgaWQ6ICdhcHAtZmlsZW1hbmFnZXInLFxuICAgIHNjcmVlbkluZGV4OiAyLFxuICAgIHBhY2thZ2VOYW1lOiAnY29tLmFuZHJvaWQuZG9jdW1lbnRzdWknLFxuICAgIGFwcE5hbWU6ICdNZW5lZMW8ZXIgUGxpa8OzdyAvc2RjYXJkJyxcbiAgICBjYXRlZ29yeTogJ1BhbWnEmcSHIEZsYXNoICYgUm9vdCcsXG4gICAgaWNvbk5hbWU6ICdGb2xkZXInLFxuICAgIGlzQmFzZUFwcDogZmFsc2UsXG4gICAgY29ucXVlc3RTdGF0ZTogJ1VOVE9VQ0hFRCcsXG4gICAgZ25pZGFDb3VudDogNyxcbiAgICBsYXNlckdhcnJpc29uUG93ZXI6IDAsXG4gICAgZGVzYW50VW5pdFR5cGU6ICdMQVNFUl9UT1dFUl9CRUFNJyxcbiAgICBsaXZlVGhyb3VnaHB1dDogJzg1LjAgTUIvcycsXG4gICAgYWdncmVzc2lvblNjb3JlOiA1NSxcbiAgICBjb25uZWN0aW9uczogW1xuICAgICAgeyBpZDogJ3N1Yi1mbTEnLCBuYW1lOiAnU2NvcGVkIFN0b3JhZ2UgVmlydHVhbCBGUycsIHR5cGU6ICdTSEFSRURfTUVNJywgZ25pZGFzRGV0ZWN0ZWQ6IDQsIGduaWRhc1B1cmdlZDogMCwgYmFuZHdpZHRoOiAnNjAgTUIvcycsIGFnZ3Jlc3Npb25QZXJjZW50OiA2MCwgc3RhdHVzOiAnSU5GRUNURUQnIH0sXG4gICAgICB7IGlkOiAnc3ViLWZtMicsIG5hbWU6ICdSb290IEV4cGxvcmVyIFBpcGUgQ2hhbm5lbCcsIHR5cGU6ICdVTklYX1NPQ0tFVCcsIGduaWRhc0RldGVjdGVkOiAzLCBnbmlkYXNQdXJnZWQ6IDAsIGJhbmR3aWR0aDogJzI1IE1CL3MnLCBhZ2dyZXNzaW9uUGVyY2VudDogNTAsIHN0YXR1czogJ0lORkVDVEVEJyB9XG4gICAgXVxuICB9LFxuICB7XG4gICAgaWQ6ICdhcHAtdGVybWluYWwnLFxuICAgIHNjcmVlbkluZGV4OiAyLFxuICAgIHBhY2thZ2VOYW1lOiAnY29tLnRlcm11eC5zZW50aW5lbCcsXG4gICAgYXBwTmFtZTogJ01vYmlsbnkgVGVybWluYWwgVGVybXV4JyxcbiAgICBjYXRlZ29yeTogJ1Bvd8WCb2thIFNoZWxsIC9iaW4vc2gnLFxuICAgIGljb25OYW1lOiAnVGVybWluYWwnLFxuICAgIGlzQmFzZUFwcDogZmFsc2UsXG4gICAgY29ucXVlc3RTdGF0ZTogJ1VOVE9VQ0hFRCcsXG4gICAgZ25pZGFDb3VudDogNCxcbiAgICBsYXNlckdhcnJpc29uUG93ZXI6IDAsXG4gICAgZGVzYW50VW5pdFR5cGU6ICdFTVBfUkVTT05BVE9SJyxcbiAgICBsaXZlVGhyb3VnaHB1dDogJzguNCBNQi9zJyxcbiAgICBhZ2dyZXNzaW9uU2NvcmU6IDQ1LFxuICAgIGNvbm5lY3Rpb25zOiBbXG4gICAgICB7IGlkOiAnc3ViLXRtMScsIG5hbWU6ICdQVFkgTWFzdGVyL1NsYXZlIFRlcm1pbmFsJywgdHlwZTogJ1VOSVhfU09DS0VUJywgZ25pZGFzRGV0ZWN0ZWQ6IDIsIGduaWRhc1B1cmdlZDogMCwgYmFuZHdpZHRoOiAnNS4xIE1CL3MnLCBhZ2dyZXNzaW9uUGVyY2VudDogNDUsIHN0YXR1czogJ0lORkVDVEVEJyB9LFxuICAgICAgeyBpZDogJ3N1Yi10bTInLCBuYW1lOiAnU3VicHJvY2VzcyBGb3JrIFBpcGVsaW5lJywgdHlwZTogJ0JJTkRFUl9JUEMnLCBnbmlkYXNEZXRlY3RlZDogMiwgZ25pZGFzUHVyZ2VkOiAwLCBiYW5kd2lkdGg6ICczLjMgTUIvcycsIGFnZ3Jlc3Npb25QZXJjZW50OiA0NSwgc3RhdHVzOiAnSU5GRUNURUQnIH1cbiAgICBdXG4gIH0sXG4gIHtcbiAgICBpZDogJ2FwcC1jYW1lcmEnLFxuICAgIHNjcmVlbkluZGV4OiAyLFxuICAgIHBhY2thZ2VOYW1lOiAnY29tLmFuZHJvaWQuY2FtZXJhMicsXG4gICAgYXBwTmFtZTogJ0FwYXJhdCAmIFNlbnNvcnknLFxuICAgIGNhdGVnb3J5OiAnQmlvbWV0cmlhICYgTWlrcm9mb255JyxcbiAgICBpY29uTmFtZTogJ0NhbWVyYScsXG4gICAgaXNCYXNlQXBwOiBmYWxzZSxcbiAgICBjb25xdWVzdFN0YXRlOiAnVU5UT1VDSEVEJyxcbiAgICBnbmlkYUNvdW50OiA2LFxuICAgIGxhc2VyR2Fycmlzb25Qb3dlcjogMCxcbiAgICBkZXNhbnRVbml0VHlwZTogJ0tJVFRFTl9EUk9ORV9HQVJSSVNPTicsXG4gICAgbGl2ZVRocm91Z2hwdXQ6ICcxMjAuMCBNQi9zJyxcbiAgICBhZ2dyZXNzaW9uU2NvcmU6IDUwLFxuICAgIGNvbm5lY3Rpb25zOiBbXG4gICAgICB7IGlkOiAnc3ViLWNtMScsIG5hbWU6ICdDYW1lcmEgSEFMIE5hdGl2ZSBCdWZmZXInLCB0eXBlOiAnU0hBUkVEX01FTScsIGduaWRhc0RldGVjdGVkOiAzLCBnbmlkYXNQdXJnZWQ6IDAsIGJhbmR3aWR0aDogJzk1IE1CL3MnLCBhZ2dyZXNzaW9uUGVyY2VudDogNTUsIHN0YXR1czogJ0lORkVDVEVEJyB9LFxuICAgICAgeyBpZDogJ3N1Yi1jbTInLCBuYW1lOiAnQXVkaW9SZWNvcmQgU3RyZWFtIFNvY2tldCcsIHR5cGU6ICdVTklYX1NPQ0tFVCcsIGduaWRhc0RldGVjdGVkOiAzLCBnbmlkYXNQdXJnZWQ6IDAsIGJhbmR3aWR0aDogJzI1IE1CL3MnLCBhZ2dyZXNzaW9uUGVyY2VudDogNDUsIHN0YXR1czogJ0lORkVDVEVEJyB9XG4gICAgXVxuICB9LFxuICB7XG4gICAgaWQ6ICdhcHAtdnBuJyxcbiAgICBzY3JlZW5JbmRleDogMixcbiAgICBwYWNrYWdlTmFtZTogJ2NvbS53aXJlZ3VhcmQuYW5kcm9pZCcsXG4gICAgYXBwTmFtZTogJ1R1bmVsIFdpcmVHdWFyZCBWUE4nLFxuICAgIGNhdGVnb3J5OiAnU3p5ZnJvd2FuaWUgU2llY2knLFxuICAgIGljb25OYW1lOiAnTG9jaycsXG4gICAgaXNCYXNlQXBwOiBmYWxzZSxcbiAgICBjb25xdWVzdFN0YXRlOiAnVU5UT1VDSEVEJyxcbiAgICBnbmlkYUNvdW50OiAzLFxuICAgIGxhc2VyR2Fycmlzb25Qb3dlcjogMCxcbiAgICBkZXNhbnRVbml0VHlwZTogJ0xBU0VSX1RPV0VSX0JFQU0nLFxuICAgIGxpdmVUaHJvdWdocHV0OiAnOTQuMCBNQi9zJyxcbiAgICBhZ2dyZXNzaW9uU2NvcmU6IDMwLFxuICAgIGNvbm5lY3Rpb25zOiBbXG4gICAgICB7IGlkOiAnc3ViLXZwbjEnLCBuYW1lOiAnVFVOIFZpcnR1YWwgQWRhcHRlciBTb2NrZXQnLCB0eXBlOiAnVENQX1NPQ0tFVCcsIGduaWRhc0RldGVjdGVkOiAyLCBnbmlkYXNQdXJnZWQ6IDAsIGJhbmR3aWR0aDogJzgwIE1CL3MnLCBhZ2dyZXNzaW9uUGVyY2VudDogMzAsIHN0YXR1czogJ0lORkVDVEVEJyB9LFxuICAgICAgeyBpZDogJ3N1Yi12cG4yJywgbmFtZTogJ1ZwblNlcnZpY2UgQnVpbGRlciBJUEMnLCB0eXBlOiAnQklOREVSX0lQQycsIGduaWRhc0RldGVjdGVkOiAxLCBnbmlkYXNQdXJnZWQ6IDAsIGJhbmR3aWR0aDogJzE0IE1CL3MnLCBhZ2dyZXNzaW9uUGVyY2VudDogMzAsIHN0YXR1czogJ0lORkVDVEVEJyB9XG4gICAgXVxuICB9LFxuICB7XG4gICAgaWQ6ICdhcHAtbm90ZXMnLFxuICAgIHNjcmVlbkluZGV4OiAyLFxuICAgIHBhY2thZ2VOYW1lOiAnb3JnLmtlZXBhc3Nkcm9pZCcsXG4gICAgYXBwTmFtZTogJ0JhemEgSGFzZcWCICYgTm90YXRuaWsnLFxuICAgIGNhdGVnb3J5OiAnS3J5cHRvZ3JhZmlhIEJhenknLFxuICAgIGljb25OYW1lOiAnS2V5JyxcbiAgICBpc0Jhc2VBcHA6IGZhbHNlLFxuICAgIGNvbnF1ZXN0U3RhdGU6ICdVTlRPVUNIRUQnLFxuICAgIGduaWRhQ291bnQ6IDUsXG4gICAgbGFzZXJHYXJyaXNvblBvd2VyOiAwLFxuICAgIGRlc2FudFVuaXRUeXBlOiAnQkFTRV9DT01NQU5EX0NPUkUnLFxuICAgIGxpdmVUaHJvdWdocHV0OiAnMi4xIE1CL3MnLFxuICAgIGFnZ3Jlc3Npb25TY29yZTogNjAsXG4gICAgY29ubmVjdGlvbnM6IFtcbiAgICAgIHsgaWQ6ICdzdWIta3AxJywgbmFtZTogJ0FFUy0yNTYgVmF1bHQgTWVtb3J5IEJsb2NrJywgdHlwZTogJ1NIQVJFRF9NRU0nLCBnbmlkYXNEZXRlY3RlZDogMywgZ25pZGFzUHVyZ2VkOiAwLCBiYW5kd2lkdGg6ICcxLjIgTUIvcycsIGFnZ3Jlc3Npb25QZXJjZW50OiA2NSwgc3RhdHVzOiAnSU5GRUNURUQnIH0sXG4gICAgICB7IGlkOiAnc3ViLWtwMicsIG5hbWU6ICdDbGlwYm9hcmQgQXV0by1DbGVhciBIb29rJywgdHlwZTogJ0NMSVBCT0FSRF9CUklER0UnLCBnbmlkYXNEZXRlY3RlZDogMiwgZ25pZGFzUHVyZ2VkOiAwLCBiYW5kd2lkdGg6ICcwLjkgTUIvcycsIGFnZ3Jlc3Npb25QZXJjZW50OiA1NSwgc3RhdHVzOiAnSU5GRUNURUQnIH1cbiAgICBdXG4gIH0sXG5cbiAgLy8gRUtSQU4gMzogQXBsaWthY2plIHcgVGxlICYgR3J5XG4gIHtcbiAgICBpZDogJ2FwcC1nYW1lMScsXG4gICAgc2NyZWVuSW5kZXg6IDMsXG4gICAgcGFja2FnZU5hbWU6ICdjb20uYWR3YXJlLmFyY2FkZS5mYWtlZ2FtZScsXG4gICAgYXBwTmFtZTogJ1phaW5mZWtvd2FuYSBHcmEgQWR3YXJlJyxcbiAgICBjYXRlZ29yeTogJ0dyeSAmIFJla2xhbXkgVG9wTW9zdCcsXG4gICAgaWNvbk5hbWU6ICdHYW1lcGFkMicsXG4gICAgaXNCYXNlQXBwOiBmYWxzZSxcbiAgICBjb25xdWVzdFN0YXRlOiAnVU5UT1VDSEVEJyxcbiAgICBnbmlkYUNvdW50OiAxOSxcbiAgICBsYXNlckdhcnJpc29uUG93ZXI6IDAsXG4gICAgZGVzYW50VW5pdFR5cGU6ICdFTVBfUkVTT05BVE9SJyxcbiAgICBsaXZlVGhyb3VnaHB1dDogJzc1LjIgTUIvcycsXG4gICAgYWdncmVzc2lvblNjb3JlOiA5OCxcbiAgICBjb25uZWN0aW9uczogW1xuICAgICAgeyBpZDogJ3N1Yi1nbTEnLCBuYW1lOiAnVG9wTW9zdCBXaW5kb3cgT3ZlcmxheSBIb29rJywgdHlwZTogJ0FDQ0VTU0lCSUxJVFlfQVBJJywgZ25pZGFzRGV0ZWN0ZWQ6IDgsIGduaWRhc1B1cmdlZDogMCwgYmFuZHdpZHRoOiAnMzAgTUIvcycsIGFnZ3Jlc3Npb25QZXJjZW50OiA5OSwgc3RhdHVzOiAnSU5GRUNURUQnIH0sXG4gICAgICB7IGlkOiAnc3ViLWdtMicsIG5hbWU6ICdBZHdhcmUgQzIgUmV2ZXJzZSBUdW5uZWwnLCB0eXBlOiAnVENQX1NPQ0tFVCcsIGduaWRhc0RldGVjdGVkOiA3LCBnbmlkYXNQdXJnZWQ6IDAsIGJhbmR3aWR0aDogJzI4IE1CL3MnLCBhZ2dyZXNzaW9uUGVyY2VudDogOTgsIHN0YXR1czogJ0lORkVDVEVEJyB9LFxuICAgICAgeyBpZDogJ3N1Yi1nbTMnLCBuYW1lOiAnV2FrZUxvY2sgQmF0dGVyeSBEcmFpbmVyJywgdHlwZTogJ0JJTkRFUl9JUEMnLCBnbmlkYXNEZXRlY3RlZDogNCwgZ25pZGFzUHVyZ2VkOiAwLCBiYW5kd2lkdGg6ICcxNy4yIE1CL3MnLCBhZ2dyZXNzaW9uUGVyY2VudDogOTUsIHN0YXR1czogJ0lORkVDVEVEJyB9XG4gICAgXVxuICB9LFxuICB7XG4gICAgaWQ6ICdhcHAtc29jaWFsJyxcbiAgICBzY3JlZW5JbmRleDogMyxcbiAgICBwYWNrYWdlTmFtZTogJ2NvbS5zb2NpYWwudHJhY2tlci5jbGllbnQnLFxuICAgIGFwcE5hbWU6ICdLbGllbnQgU29jaWFsIE1lZGlhJyxcbiAgICBjYXRlZ29yeTogJ1RlbGVtZXRyaWEgdyBUbGUnLFxuICAgIGljb25OYW1lOiAnU2hhcmUyJyxcbiAgICBpc0Jhc2VBcHA6IGZhbHNlLFxuICAgIGNvbnF1ZXN0U3RhdGU6ICdVTlRPVUNIRUQnLFxuICAgIGduaWRhQ291bnQ6IDExLFxuICAgIGxhc2VyR2Fycmlzb25Qb3dlcjogMCxcbiAgICBkZXNhbnRVbml0VHlwZTogJ0tJVFRFTl9EUk9ORV9HQVJSSVNPTicsXG4gICAgbGl2ZVRocm91Z2hwdXQ6ICczOC4wIE1CL3MnLFxuICAgIGFnZ3Jlc3Npb25TY29yZTogODAsXG4gICAgY29ubmVjdGlvbnM6IFtcbiAgICAgIHsgaWQ6ICdzdWItc2MxJywgbmFtZTogJ0JhY2tncm91bmQgVHJhY2tpbmcgRGFlbW9uJywgdHlwZTogJ1RDUF9TT0NLRVQnLCBnbmlkYXNEZXRlY3RlZDogNSwgZ25pZGFzUHVyZ2VkOiAwLCBiYW5kd2lkdGg6ICcyMCBNQi9zJywgYWdncmVzc2lvblBlcmNlbnQ6IDg1LCBzdGF0dXM6ICdJTkZFQ1RFRCcgfSxcbiAgICAgIHsgaWQ6ICdzdWItc2MyJywgbmFtZTogJ0xvY2F0aW9uIFByb2JlIFBvbGxpbmcgU2VydmljZScsIHR5cGU6ICdCSU5ERVJfSVBDJywgZ25pZGFzRGV0ZWN0ZWQ6IDQsIGduaWRhc1B1cmdlZDogMCwgYmFuZHdpZHRoOiAnMTIgTUIvcycsIGFnZ3Jlc3Npb25QZXJjZW50OiA3OCwgc3RhdHVzOiAnSU5GRUNURUQnIH0sXG4gICAgICB7IGlkOiAnc3ViLXNjMycsIG5hbWU6ICdNaWNyb3Bob25lIEJ1ZmZlciBTbmlmZmVyJywgdHlwZTogJ1NIQVJFRF9NRU0nLCBnbmlkYXNEZXRlY3RlZDogMiwgZ25pZGFzUHVyZ2VkOiAwLCBiYW5kd2lkdGg6ICc2IE1CL3MnLCBhZ2dyZXNzaW9uUGVyY2VudDogNzUsIHN0YXR1czogJ0lORkVDVEVEJyB9XG4gICAgXVxuICB9LFxuICB7XG4gICAgaWQ6ICdhcHAtc3RyZWFtaW5nJyxcbiAgICBzY3JlZW5JbmRleDogMyxcbiAgICBwYWNrYWdlTmFtZTogJ2NvbS5tZWRpYS5wbGF5ZXIuc3RyZWFtJyxcbiAgICBhcHBOYW1lOiAnT2R0d2FyemFjeiBTdHJ1bWllbmlvd3knLFxuICAgIGNhdGVnb3J5OiAnS29kZWtpIEF1ZGlvL1ZpZGVvJyxcbiAgICBpY29uTmFtZTogJ1BsYXlTcXVhcmUnLFxuICAgIGlzQmFzZUFwcDogZmFsc2UsXG4gICAgY29ucXVlc3RTdGF0ZTogJ1VOVE9VQ0hFRCcsXG4gICAgZ25pZGFDb3VudDogOCxcbiAgICBsYXNlckdhcnJpc29uUG93ZXI6IDAsXG4gICAgZGVzYW50VW5pdFR5cGU6ICdMQVNFUl9UT1dFUl9CRUFNJyxcbiAgICBsaXZlVGhyb3VnaHB1dDogJzE1MC4wIE1CL3MnLFxuICAgIGFnZ3Jlc3Npb25TY29yZTogNDUsXG4gICAgY29ubmVjdGlvbnM6IFtcbiAgICAgIHsgaWQ6ICdzdWItc3RybTEnLCBuYW1lOiAnSExTIE1lZGlhIFN0cmVhbSBTb2NrZXQnLCB0eXBlOiAnVENQX1NPQ0tFVCcsIGduaWRhc0RldGVjdGVkOiA0LCBnbmlkYXNQdXJnZWQ6IDAsIGJhbmR3aWR0aDogJzEyMCBNQi9zJywgYWdncmVzc2lvblBlcmNlbnQ6IDQ1LCBzdGF0dXM6ICdJTkZFQ1RFRCcgfSxcbiAgICAgIHsgaWQ6ICdzdWItc3RybTInLCBuYW1lOiAnRGVjb2RlciBSaW5nIEJ1ZmZlcicsIHR5cGU6ICdTSEFSRURfTUVNJywgZ25pZGFzRGV0ZWN0ZWQ6IDQsIGduaWRhc1B1cmdlZDogMCwgYmFuZHdpZHRoOiAnMzAgTUIvcycsIGFnZ3Jlc3Npb25QZXJjZW50OiA0NSwgc3RhdHVzOiAnSU5GRUNURUQnIH1cbiAgICBdXG4gIH0sXG4gIHtcbiAgICBpZDogJ2FwcC1jbG91ZCcsXG4gICAgc2NyZWVuSW5kZXg6IDMsXG4gICAgcGFja2FnZU5hbWU6ICdjb20uY2xvdWQuc3luYy5kcml2ZScsXG4gICAgYXBwTmFtZTogJ1N5bmNocm9uaXphY2phIENobXVyeScsXG4gICAgY2F0ZWdvcnk6ICdaZGFsbnkgQmFja3VwJyxcbiAgICBpY29uTmFtZTogJ0Nsb3VkJyxcbiAgICBpc0Jhc2VBcHA6IGZhbHNlLFxuICAgIGNvbnF1ZXN0U3RhdGU6ICdVTlRPVUNIRUQnLFxuICAgIGduaWRhQ291bnQ6IDcsXG4gICAgbGFzZXJHYXJyaXNvblBvd2VyOiAwLFxuICAgIGRlc2FudFVuaXRUeXBlOiAnQkFTRV9DT01NQU5EX0NPUkUnLFxuICAgIGxpdmVUaHJvdWdocHV0OiAnNDQuMCBNQi9zJyxcbiAgICBhZ2dyZXNzaW9uU2NvcmU6IDUwLFxuICAgIGNvbm5lY3Rpb25zOiBbXG4gICAgICB7IGlkOiAnc3ViLWNsZDEnLCBuYW1lOiAnU3luY0FkYXB0ZXIgU3luYyBQcm92aWRlcicsIHR5cGU6ICdDT05URU5UX1BST1ZJREVSJywgZ25pZGFzRGV0ZWN0ZWQ6IDQsIGduaWRhc1B1cmdlZDogMCwgYmFuZHdpZHRoOiAnMjggTUIvcycsIGFnZ3Jlc3Npb25QZXJjZW50OiA1NSwgc3RhdHVzOiAnSU5GRUNURUQnIH0sXG4gICAgICB7IGlkOiAnc3ViLWNsZDInLCBuYW1lOiAnUmVtb3RlIFJFU1QgVXBsb2FkIFNvY2tldCcsIHR5cGU6ICdUQ1BfU09DS0VUJywgZ25pZGFzRGV0ZWN0ZWQ6IDMsIGduaWRhc1B1cmdlZDogMCwgYmFuZHdpZHRoOiAnMTYgTUIvcycsIGFnZ3Jlc3Npb25QZXJjZW50OiA0NSwgc3RhdHVzOiAnSU5GRUNURUQnIH1cbiAgICBdXG4gIH0sXG4gIHtcbiAgICBpZDogJ2FwcC1tYXBzJyxcbiAgICBzY3JlZW5JbmRleDogMyxcbiAgICBwYWNrYWdlTmFtZTogJ2NvbS5nb29nbGUuYW5kcm9pZC5hcHBzLm1hcHMnLFxuICAgIGFwcE5hbWU6ICdNYXB5ICYgR2VvbG9rYWxpemFjamEnLFxuICAgIGNhdGVnb3J5OiAnTmF3aWdhY2phIFNhdGVsaXRhcm5hJyxcbiAgICBpY29uTmFtZTogJ01hcFBpbicsXG4gICAgaXNCYXNlQXBwOiBmYWxzZSxcbiAgICBjb25xdWVzdFN0YXRlOiAnVU5UT1VDSEVEJyxcbiAgICBnbmlkYUNvdW50OiA1LFxuICAgIGxhc2VyR2Fycmlzb25Qb3dlcjogMCxcbiAgICBkZXNhbnRVbml0VHlwZTogJ0tJVFRFTl9EUk9ORV9HQVJSSVNPTicsXG4gICAgbGl2ZVRocm91Z2hwdXQ6ICcyMi4wIE1CL3MnLFxuICAgIGFnZ3Jlc3Npb25TY29yZTogMzUsXG4gICAgY29ubmVjdGlvbnM6IFtcbiAgICAgIHsgaWQ6ICdzdWItbWFwMScsIG5hbWU6ICdHUFMgRnVzZWRMb2NhdGlvblByb3ZpZGVyIElQQycsIHR5cGU6ICdCSU5ERVJfSVBDJywgZ25pZGFzRGV0ZWN0ZWQ6IDMsIGduaWRhc1B1cmdlZDogMCwgYmFuZHdpZHRoOiAnMTQgTUIvcycsIGFnZ3Jlc3Npb25QZXJjZW50OiA0MCwgc3RhdHVzOiAnSU5GRUNURUQnIH0sXG4gICAgICB7IGlkOiAnc3ViLW1hcDInLCBuYW1lOiAnVmVjdG9yIFRpbGUgQ2FjaGUgQXNobWVtJywgdHlwZTogJ1NIQVJFRF9NRU0nLCBnbmlkYXNEZXRlY3RlZDogMiwgZ25pZGFzUHVyZ2VkOiAwLCBiYW5kd2lkdGg6ICc4IE1CL3MnLCBhZ2dyZXNzaW9uUGVyY2VudDogMzAsIHN0YXR1czogJ0lORkVDVEVEJyB9XG4gICAgXVxuICB9LFxuICB7XG4gICAgaWQ6ICdhcHAtY3J5cHRvJyxcbiAgICBzY3JlZW5JbmRleDogMyxcbiAgICBwYWNrYWdlTmFtZTogJ2lvLm1ldGFtYXNrLndhbGxldCcsXG4gICAgYXBwTmFtZTogJ1BvcnRmZWwgV2ViMyAmIE5vZGUnLFxuICAgIGNhdGVnb3J5OiAnQmxvY2tjaGFpbiAmIFNtYXJ0IENvbnRyYWN0cycsXG4gICAgaWNvbk5hbWU6ICdDb2lucycsXG4gICAgaXNCYXNlQXBwOiBmYWxzZSxcbiAgICBjb25xdWVzdFN0YXRlOiAnVU5UT1VDSEVEJyxcbiAgICBnbmlkYUNvdW50OiAxMCxcbiAgICBsYXNlckdhcnJpc29uUG93ZXI6IDAsXG4gICAgZGVzYW50VW5pdFR5cGU6ICdFTVBfUkVTT05BVE9SJyxcbiAgICBsaXZlVGhyb3VnaHB1dDogJzE2LjAgTUIvcycsXG4gICAgYWdncmVzc2lvblNjb3JlOiA4MixcbiAgICBjb25uZWN0aW9uczogW1xuICAgICAgeyBpZDogJ3N1Yi13My0xJywgbmFtZTogJ0pTT04tUlBDIEV0aCBOb2RlIFNvY2tldCcsIHR5cGU6ICdUQ1BfU09DS0VUJywgZ25pZGFzRGV0ZWN0ZWQ6IDUsIGduaWRhc1B1cmdlZDogMCwgYmFuZHdpZHRoOiAnMTAgTUIvcycsIGFnZ3Jlc3Npb25QZXJjZW50OiA4NSwgc3RhdHVzOiAnSU5GRUNURUQnIH0sXG4gICAgICB7IGlkOiAnc3ViLXczLTInLCBuYW1lOiAnU2VlZCBQaHJhc2UgU2VjdXJlIEVsZW1lbnQnLCB0eXBlOiAnU0hBUkVEX01FTScsIGduaWRhc0RldGVjdGVkOiAzLCBnbmlkYXNQdXJnZWQ6IDAsIGJhbmR3aWR0aDogJzMuNSBNQi9zJywgYWdncmVzc2lvblBlcmNlbnQ6IDgwLCBzdGF0dXM6ICdJTkZFQ1RFRCcgfSxcbiAgICAgIHsgaWQ6ICdzdWItdzMtMycsIG5hbWU6ICdEZWVwTGluayBJbnRlbnQgRmlsdGVyJywgdHlwZTogJ0JJTkRFUl9JUEMnLCBnbmlkYXNEZXRlY3RlZDogMiwgZ25pZGFzUHVyZ2VkOiAwLCBiYW5kd2lkdGg6ICcyLjUgTUIvcycsIGFnZ3Jlc3Npb25QZXJjZW50OiA4MCwgc3RhdHVzOiAnSU5GRUNURUQnIH1cbiAgICBdXG4gIH0sXG5cbiAgLy8gRUtSQU4gNDogUGFzZWsgUG93aWFkb21pZcWEICYgQmVsa2EgU3RhdHVzdSAoTm90aWZpY2F0aW9uIERyYXdlciAvIFN5c3RlbSBVSSlcbiAge1xuICAgIGlkOiAnYXBwLW5vdGlmLWJhcicsXG4gICAgc2NyZWVuSW5kZXg6IDQsXG4gICAgcGFja2FnZU5hbWU6ICdjb20uYW5kcm9pZC5zeXN0ZW11aS5zdGF0dXNiYXInLFxuICAgIGFwcE5hbWU6ICdQYXNlayBQb3dpYWRvbWllxYQgJiBTenlia2llIFVzdGF3aWVuaWEnLFxuICAgIGNhdGVnb3J5OiAnUGFuZWwgU3lzdGVtVUkgJiBRdWljayBTZXR0aW5ncycsXG4gICAgaWNvbk5hbWU6ICdTbGlkZXJzJyxcbiAgICBpc0Jhc2VBcHA6IGZhbHNlLFxuICAgIGNvbnF1ZXN0U3RhdGU6ICdVTlRPVUNIRUQnLFxuICAgIGduaWRhQ291bnQ6IDE1LFxuICAgIGxhc2VyR2Fycmlzb25Qb3dlcjogMCxcbiAgICBkZXNhbnRVbml0VHlwZTogJ0xBU0VSX1RPV0VSX0JFQU0nLFxuICAgIGxpdmVUaHJvdWdocHV0OiAnNDguMCBNQi9zJyxcbiAgICBhZ2dyZXNzaW9uU2NvcmU6IDkwLFxuICAgIGNvbm5lY3Rpb25zOiBbXG4gICAgICB7IGlkOiAnc3ViLW50MScsIG5hbWU6ICdOb3RpZmljYXRpb25NYW5hZ2VyIFNlcnZpY2UgSVBDJywgdHlwZTogJ0JJTkRFUl9JUEMnLCBnbmlkYXNEZXRlY3RlZDogNywgZ25pZGFzUHVyZ2VkOiAwLCBiYW5kd2lkdGg6ICcyMiBNQi9zJywgYWdncmVzc2lvblBlcmNlbnQ6IDkyLCBzdGF0dXM6ICdJTkZFQ1RFRCcgfSxcbiAgICAgIHsgaWQ6ICdzdWItbnQyJywgbmFtZTogJ1N0YXR1c0JhciBWaWV3IEhpZXJhcmNoeSBBc2htZW0nLCB0eXBlOiAnU0hBUkVEX01FTScsIGduaWRhc0RldGVjdGVkOiA1LCBnbmlkYXNQdXJnZWQ6IDAsIGJhbmR3aWR0aDogJzE2IE1CL3MnLCBhZ2dyZXNzaW9uUGVyY2VudDogODgsIHN0YXR1czogJ0lORkVDVEVEJyB9LFxuICAgICAgeyBpZDogJ3N1Yi1udDMnLCBuYW1lOiAnSGVhZHMtVXAgUG9wdXAgRGlzcGF0Y2hlcicsIHR5cGU6ICdBQ0NFU1NJQklMSVRZX0FQSScsIGduaWRhc0RldGVjdGVkOiAzLCBnbmlkYXNQdXJnZWQ6IDAsIGJhbmR3aWR0aDogJzEwIE1CL3MnLCBhZ2dyZXNzaW9uUGVyY2VudDogOTAsIHN0YXR1czogJ0lORkVDVEVEJyB9XG4gICAgXVxuICB9LFxuICB7XG4gICAgaWQ6ICdhcHAtbG9ja3NjcmVlbicsXG4gICAgc2NyZWVuSW5kZXg6IDQsXG4gICAgcGFja2FnZU5hbWU6ICdjb20uYW5kcm9pZC5rZXlndWFyZC5iaW9tZXRyaWNzJyxcbiAgICBhcHBOYW1lOiAnRWtyYW4gQmxva2FkeSAmIEJpb21ldHJpYScsXG4gICAgY2F0ZWdvcnk6ICdLZXlndWFyZCAmIE9kY2lzayBQYWxjYScsXG4gICAgaWNvbk5hbWU6ICdGaW5nZXJwcmludCcsXG4gICAgaXNCYXNlQXBwOiBmYWxzZSxcbiAgICBjb25xdWVzdFN0YXRlOiAnVU5UT1VDSEVEJyxcbiAgICBnbmlkYUNvdW50OiA4LFxuICAgIGxhc2VyR2Fycmlzb25Qb3dlcjogMCxcbiAgICBkZXNhbnRVbml0VHlwZTogJ0JBU0VfQ09NTUFORF9DT1JFJyxcbiAgICBsaXZlVGhyb3VnaHB1dDogJzE4LjAgTUIvcycsXG4gICAgYWdncmVzc2lvblNjb3JlOiA3NSxcbiAgICBjb25uZWN0aW9uczogW1xuICAgICAgeyBpZDogJ3N1Yi1sazEnLCBuYW1lOiAnRmluZ2VycHJpbnQgSEFMIERhZW1vbiBTb2NrZXQnLCB0eXBlOiAnVU5JWF9TT0NLRVQnLCBnbmlkYXNEZXRlY3RlZDogNCwgZ25pZGFzUHVyZ2VkOiAwLCBiYW5kd2lkdGg6ICcxMCBNQi9zJywgYWdncmVzc2lvblBlcmNlbnQ6IDgwLCBzdGF0dXM6ICdJTkZFQ1RFRCcgfSxcbiAgICAgIHsgaWQ6ICdzdWItbGsyJywgbmFtZTogJ1RydXN0QWdlbnQgUElOIFZlcmlmaWNhdGlvbiBJUEMnLCB0eXBlOiAnQklOREVSX0lQQycsIGduaWRhc0RldGVjdGVkOiA0LCBnbmlkYXNQdXJnZWQ6IDAsIGJhbmR3aWR0aDogJzggTUIvcycsIGFnZ3Jlc3Npb25QZXJjZW50OiA3MCwgc3RhdHVzOiAnSU5GRUNURUQnIH1cbiAgICBdXG4gIH0sXG4gIHtcbiAgICBpZDogJ2FwcC1zcGxpdHdpbmRvdycsXG4gICAgc2NyZWVuSW5kZXg6IDQsXG4gICAgcGFja2FnZU5hbWU6ICdjb20uYW5kcm9pZC53bS5zcGxpdCcsXG4gICAgYXBwTmFtZTogJ011bHRpLVdpbmRvdyAmIFBvZHppYcWCIEVrcmFudScsXG4gICAgY2F0ZWdvcnk6ICdNZW5lZMW8ZXIgT2tpZW4gRFdNL1N1cmZhY2VGbGluZ2VyJyxcbiAgICBpY29uTmFtZTogJ0xheW91dEdyaWQnLFxuICAgIGlzQmFzZUFwcDogZmFsc2UsXG4gICAgY29ucXVlc3RTdGF0ZTogJ1VOVE9VQ0hFRCcsXG4gICAgZ25pZGFDb3VudDogMTMsXG4gICAgbGFzZXJHYXJyaXNvblBvd2VyOiAwLFxuICAgIGRlc2FudFVuaXRUeXBlOiAnRU1QX1JFU09OQVRPUicsXG4gICAgbGl2ZVRocm91Z2hwdXQ6ICcxMzUuMCBNQi9zJyxcbiAgICBhZ2dyZXNzaW9uU2NvcmU6IDg4LFxuICAgIGNvbm5lY3Rpb25zOiBbXG4gICAgICB7IGlkOiAnc3ViLXNwMScsIG5hbWU6ICdTdXJmYWNlRmxpbmdlciBMYXllciBNaXhlcicsIHR5cGU6ICdTSEFSRURfTUVNJywgZ25pZGFzRGV0ZWN0ZWQ6IDcsIGduaWRhc1B1cmdlZDogMCwgYmFuZHdpZHRoOiAnODUgTUIvcycsIGFnZ3Jlc3Npb25QZXJjZW50OiA5MCwgc3RhdHVzOiAnSU5GRUNURUQnIH0sXG4gICAgICB7IGlkOiAnc3ViLXNwMicsIG5hbWU6ICdXaW5kb3dNYW5hZ2VyIFNlcnZpY2UgSVBDJywgdHlwZTogJ0JJTkRFUl9JUEMnLCBnbmlkYXNEZXRlY3RlZDogNiwgZ25pZGFzUHVyZ2VkOiAwLCBiYW5kd2lkdGg6ICc1MCBNQi9zJywgYWdncmVzc2lvblBlcmNlbnQ6IDg1LCBzdGF0dXM6ICdJTkZFQ1RFRCcgfVxuICAgIF1cbiAgfSxcbiAge1xuICAgIGlkOiAnYXBwLWJhY2tncm91bmQtc2VydmljZXMnLFxuICAgIHNjcmVlbkluZGV4OiA0LFxuICAgIHBhY2thZ2VOYW1lOiAnYW5kcm9pZC5vcy5TZXJ2aWNlTWFuYWdlcicsXG4gICAgYXBwTmFtZTogJ0RlbW9ueSAmIFVzxYJ1Z2kgdyBUbGUnLFxuICAgIGNhdGVnb3J5OiAnS2VybmVsIEluaXQgJiBaeWdvdGUgU2VydmljZXMnLFxuICAgIGljb25OYW1lOiAnQ3B1JyxcbiAgICBpc0Jhc2VBcHA6IGZhbHNlLFxuICAgIGNvbnF1ZXN0U3RhdGU6ICdVTlRPVUNIRUQnLFxuICAgIGduaWRhQ291bnQ6IDE3LFxuICAgIGxhc2VyR2Fycmlzb25Qb3dlcjogMCxcbiAgICBkZXNhbnRVbml0VHlwZTogJ0tJVFRFTl9EUk9ORV9HQVJSSVNPTicsXG4gICAgbGl2ZVRocm91Z2hwdXQ6ICcyMTAuMCBNQi9zJyxcbiAgICBhZ2dyZXNzaW9uU2NvcmU6IDk1LFxuICAgIGNvbm5lY3Rpb25zOiBbXG4gICAgICB7IGlkOiAnc3ViLWJnMScsIG5hbWU6ICdTZXJ2aWNlTWFuYWdlciBEYWVtb24gL2Rldi9iaW5kZXInLCB0eXBlOiAnQklOREVSX0lQQycsIGduaWRhc0RldGVjdGVkOiA5LCBnbmlkYXNQdXJnZWQ6IDAsIGJhbmR3aWR0aDogJzEyMCBNQi9zJywgYWdncmVzc2lvblBlcmNlbnQ6IDk1LCBzdGF0dXM6ICdJTkZFQ1RFRCcgfSxcbiAgICAgIHsgaWQ6ICdzdWItYmcyJywgbmFtZTogJ1p5Z290ZSBTb2NrZXQgTGlzdGVuZXInLCB0eXBlOiAnVU5JWF9TT0NLRVQnLCBnbmlkYXNEZXRlY3RlZDogNSwgZ25pZGFzUHVyZ2VkOiAwLCBiYW5kd2lkdGg6ICc2MCBNQi9zJywgYWdncmVzc2lvblBlcmNlbnQ6IDk1LCBzdGF0dXM6ICdJTkZFQ1RFRCcgfSxcbiAgICAgIHsgaWQ6ICdzdWItYmczJywgbmFtZTogJ0JhdHRlcnlTdGF0cyBUZWxlbWV0cnkgUG9vbCcsIHR5cGU6ICdDT05URU5UX1BST1ZJREVSJywgZ25pZGFzRGV0ZWN0ZWQ6IDMsIGduaWRhc1B1cmdlZDogMCwgYmFuZHdpZHRoOiAnMzAgTUIvcycsIGFnZ3Jlc3Npb25QZXJjZW50OiA5MCwgc3RhdHVzOiAnSU5GRUNURUQnIH1cbiAgICBdXG4gIH1cbl07XG5cbmNsYXNzIE1vYmlsZUFyZWFDb25xdWVzdEVuZ2luZSB7XG4gIHByaXZhdGUgc3RhdGU6IE1vYmlsZUFyZWFDb25xdWVzdFN0YXRlO1xuICBwcml2YXRlIGNvbm5lY3RvcnM6IEFwcENvbm5lY3RvclJlcG9ydEl0ZW1bXTtcbiAgcHJpdmF0ZSBhcHBzOiBQaG9uZVNjcmVlbkFwcE5vZGVbXTtcbiAgcHJpdmF0ZSBsaXN0ZW5lcnM6IEFycmF5PChcbiAgICBzdGF0ZTogTW9iaWxlQXJlYUNvbnF1ZXN0U3RhdGUsIFxuICAgIGNvbm5lY3RvcnM6IEFwcENvbm5lY3RvclJlcG9ydEl0ZW1bXSwgXG4gICAgYXBwczogUGhvbmVTY3JlZW5BcHBOb2RlW11cbiAgKSA9PiB2b2lkPiA9IFtdO1xuICBwcml2YXRlIGF1dG9UaW1lcjogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgbWljcm9QdWxzZVRpbWVyOiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmNvbm5lY3RvcnMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KElOSVRJQUxfQ09OTkVDVE9SU19SRVBPUlQpKTtcbiAgICB0aGlzLmFwcHMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KElOSVRJQUxfUEhPTkVfQVBQUykpO1xuICAgIFxuICAgIGNvbnN0IHRvdGFsR25pZGFzID0gdGhpcy5jb25uZWN0b3JzLnJlZHVjZSgoYWNjLCBjKSA9PiBhY2MgKyBjLmduaWRhc0RldGVjdGVkQ291bnQsIDApO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGN1cnJlbnRTdGFnZTogJ0lETEUnLFxuICAgICAgc3RhZ2VQcm9ncmVzczogMCxcbiAgICAgIG92ZXJhbGxQcm9ncmVzczogNSxcbiAgICAgIGlzQXV0b0V4ZWN1dGluZzogZmFsc2UsXG4gICAgICBpc0NvbXBsZXRlZDogZmFsc2UsXG4gICAgICB0b3RhbEduaWRhc09uQ29ubmVjdG9yczogdG90YWxHbmlkYXMsXG4gICAgICB0b3RhbEduaWRhc1B1cmdlZE9uQ29ubmVjdG9yczogMCxcbiAgICAgIHRvdGFsQXBwc0NvbnF1ZXJlZDogMSwgLy8gQmF6YSBTZW50aW5lbCBqZXN0IG1hY2llcnp5c3RhXG4gICAgICB0b3RhbFNjcmVlbnNTZWN1cmVkOiAwLFxuICAgICAgYWN0aXZlU2NyZWVuVmlldzogMSxcbiAgICAgIGRyYWdnZWRVbml0VHlwZTogbnVsbCxcbiAgICAgIGN1cnJlbnRBY3Rpb25Mb2c6ICdTeXN0ZW0gdyBnb3Rvd2/Fm2NpLiBBcGxpa2FjamEgd8WCxIVjem9uYSBuYSB0ZWxlZm9uaWUuIE9jemVraXdhbmllIG5hIHJvemtheiB6YWrEmWNpYSBvYnN6YXJ1LicsXG4gICAgICBsYXN0QXNzYXVsdExvZzogW1xuICAgICAgICAn8J+TsSBXeWtyeXRvIHVydWNob21pZW5pZSBiYXp5IFNlbnRpbmVsIFNoaWVsZCBuYSBzbWFydGZvbmllLicsXG4gICAgICAgICfwn5uh77iPIEluaWNqYWxpemFjamEgcmR6ZW5pYSBvYnJvbm5lZ28gYXBsaWthY2ppIG1hY2llcnp5c3Rlai4nLFxuICAgICAgICAn8J+ToSBaxYLEhWN6YSBrb211bmlrYWN5am5lIElQQy9CaW5kZXIgdyBzdGFuaWUgZ290b3dvxZtjaSBkbyBza2Fub3dhbmlhLidcbiAgICAgIF1cbiAgICB9O1xuXG4gICAgdGhpcy5zdGFydExpdmVUZWxlbWV0cnlTaW11bGF0aW9uKCk7XG4gIH1cblxuICBwcml2YXRlIHN0YXJ0TGl2ZVRlbGVtZXRyeVNpbXVsYXRpb24oKSB7XG4gICAgaWYgKHRoaXMubWljcm9QdWxzZVRpbWVyKSByZXR1cm47XG4gICAgdGhpcy5taWNyb1B1bHNlVGltZXIgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgLy8gRHluYW1pYyBtaWNybyBmbHVjdHVhdGlvbnMgaW4gdGhyb3VnaHB1dFxuICAgICAgdGhpcy5hcHBzLmZvckVhY2goYXBwID0+IHtcbiAgICAgICAgaWYgKGFwcC5jb25xdWVzdFN0YXRlID09PSAnQ09OUVVFUkVEX0FORF9DTEVBTlNFRCcpIHtcbiAgICAgICAgICBhcHAubGFzZXJHYXJyaXNvblBvd2VyID0gMTAwO1xuICAgICAgICAgIGFwcC5hZ2dyZXNzaW9uU2NvcmUgPSAwO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRoaXMubm90aWZ5KCk7XG4gICAgfSwgMjUwMCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0U3RhdGUoKTogTW9iaWxlQXJlYUNvbnF1ZXN0U3RhdGUge1xuICAgIHJldHVybiB7IC4uLnRoaXMuc3RhdGUgfTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDb25uZWN0b3JzKCk6IEFwcENvbm5lY3RvclJlcG9ydEl0ZW1bXSB7XG4gICAgcmV0dXJuIFsuLi50aGlzLmNvbm5lY3RvcnNdO1xuICB9XG5cbiAgcHVibGljIGdldEFwcHMoKTogUGhvbmVTY3JlZW5BcHBOb2RlW10ge1xuICAgIHJldHVybiBbLi4udGhpcy5hcHBzXTtcbiAgfVxuXG4gIHB1YmxpYyBzdWJzY3JpYmUoXG4gICAgbGlzdGVuZXI6IChcbiAgICAgIHN0YXRlOiBNb2JpbGVBcmVhQ29ucXVlc3RTdGF0ZSwgXG4gICAgICBjb25uZWN0b3JzOiBBcHBDb25uZWN0b3JSZXBvcnRJdGVtW10sIFxuICAgICAgYXBwczogUGhvbmVTY3JlZW5BcHBOb2RlW11cbiAgICApID0+IHZvaWRcbiAgKTogKCkgPT4gdm9pZCB7XG4gICAgdGhpcy5saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgbGlzdGVuZXIodGhpcy5nZXRTdGF0ZSgpLCB0aGlzLmdldENvbm5lY3RvcnMoKSwgdGhpcy5nZXRBcHBzKCkpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB0aGlzLmxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzLmZpbHRlcihsID0+IGwgIT09IGxpc3RlbmVyKTtcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBub3RpZnkoKSB7XG4gICAgdGhpcy5saXN0ZW5lcnMuZm9yRWFjaChsID0+IGwodGhpcy5nZXRTdGF0ZSgpLCB0aGlzLmdldENvbm5lY3RvcnMoKSwgdGhpcy5nZXRBcHBzKCkpKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRBY3RpdmVTY3JlZW5WaWV3KHNjcmVlbkluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLnN0YXRlLmFjdGl2ZVNjcmVlblZpZXcgPSBzY3JlZW5JbmRleDtcbiAgICB0aGlzLm5vdGlmeSgpO1xuICB9XG5cbiAgcHVibGljIHNldERyYWdnZWRVbml0VHlwZSh1bml0VHlwZTogJ0JBU0VfQ09NTUFORF9DT1JFJyB8ICdMQVNFUl9UT1dFUl9CRUFNJyB8ICdLSVRURU5fRFJPTkVfR0FSUklTT04nIHwgJ0VNUF9SRVNPTkFUT1InIHwgbnVsbCkge1xuICAgIHRoaXMuc3RhdGUuZHJhZ2dlZFVuaXRUeXBlID0gdW5pdFR5cGU7XG4gICAgdGhpcy5ub3RpZnkoKTtcbiAgfVxuXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgLy8gREVQTE9ZIERFU0FOVCBWRUNUT1IgRElSRUNUTFkgKERSQUctQU5ELURST1AgT1IgQ0xJQ0spXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgcHVibGljIGRlcGxveURlc2FudFZlY3RvclRvQXBwKFxuICAgIGFwcElkOiBzdHJpbmcsIFxuICAgIHVuaXRUeXBlOiAnQkFTRV9DT01NQU5EX0NPUkUnIHwgJ0xBU0VSX1RPV0VSX0JFQU0nIHwgJ0tJVFRFTl9EUk9ORV9HQVJSSVNPTicgfCAnRU1QX1JFU09OQVRPUidcbiAgKSB7XG4gICAgY29uc3QgYXBwID0gdGhpcy5hcHBzLmZpbmQoYSA9PiBhLmlkID09PSBhcHBJZCk7XG4gICAgaWYgKCFhcHApIHJldHVybjtcblxuICAgIGFwcC5jb25xdWVzdFN0YXRlID0gJ0NPTlFVRVJFRF9BTkRfQ0xFQU5TRUQnO1xuICAgIGFwcC5sYXNlckdhcnJpc29uUG93ZXIgPSAxMDA7XG4gICAgYXBwLmRlc2FudFVuaXRUeXBlID0gdW5pdFR5cGU7XG4gICAgYXBwLnNlY3VyZWRBdCA9IG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCk7XG4gICAgYXBwLmFnZ3Jlc3Npb25TY29yZSA9IDA7XG5cbiAgICAvLyBEaXNpbmZlY3QgYWxsIHN1Yi1jb25uZWN0aW9uc1xuICAgIGlmIChhcHAuY29ubmVjdGlvbnMpIHtcbiAgICAgIGFwcC5jb25uZWN0aW9ucy5mb3JFYWNoKHN1YiA9PiB7XG4gICAgICAgIHN1Yi5nbmlkYXNQdXJnZWQgKz0gc3ViLmduaWRhc0RldGVjdGVkO1xuICAgICAgICBzdWIuZ25pZGFzRGV0ZWN0ZWQgPSAwO1xuICAgICAgICBzdWIuc3RhdHVzID0gJ0NMRUFOU0VEJztcbiAgICAgICAgc3ViLmFnZ3Jlc3Npb25QZXJjZW50ID0gMDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHByZXZpb3VzR25pZGFzID0gYXBwLmduaWRhQ291bnQ7XG4gICAgYXBwLmduaWRhQ291bnQgPSAwO1xuXG4gICAgLy8gUmVjYWxjdWxhdGUgc3RhdHNcbiAgICBjb25zdCBjb25xdWVyZWQgPSB0aGlzLmFwcHMuZmlsdGVyKGEgPT4gYS5jb25xdWVzdFN0YXRlID09PSAnQ09OUVVFUkVEX0FORF9DTEVBTlNFRCcpLmxlbmd0aDtcbiAgICB0aGlzLnN0YXRlLnRvdGFsQXBwc0NvbnF1ZXJlZCA9IGNvbnF1ZXJlZDtcbiAgICBcbiAgICAvLyBDaGVjayBpZiBlbnRpcmUgc2NyZWVuIGlzIHNlY3VyZWRcbiAgICBjb25zdCBzY3JlZW5BcHBzID0gdGhpcy5hcHBzLmZpbHRlcihhID0+IGEuc2NyZWVuSW5kZXggPT09IGFwcC5zY3JlZW5JbmRleCk7XG4gICAgY29uc3Qgc2NyZWVuU2VjdXJlZCA9IHNjcmVlbkFwcHMuZXZlcnkoYSA9PiBhLmNvbnF1ZXN0U3RhdGUgPT09ICdDT05RVUVSRURfQU5EX0NMRUFOU0VEJyk7XG4gICAgXG4gICAgY29uc3Qgc2VjdXJlZFNjcmVlbnNDb3VudCA9IFsxLCAyLCAzLCA0XS5maWx0ZXIoaWR4ID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmFwcHMuZmlsdGVyKGEgPT4gYS5zY3JlZW5JbmRleCA9PT0gaWR4KS5ldmVyeShhID0+IGEuY29ucXVlc3RTdGF0ZSA9PT0gJ0NPTlFVRVJFRF9BTkRfQ0xFQU5TRUQnKTtcbiAgICB9KS5sZW5ndGg7XG4gICAgdGhpcy5zdGF0ZS50b3RhbFNjcmVlbnNTZWN1cmVkID0gc2VjdXJlZFNjcmVlbnNDb3VudDtcblxuICAgIHRoaXMuc3RhdGUuY3VycmVudEFjdGlvbkxvZyA9IGDwn46vIERFU0FOVCBUQUtUWUNaTlk6IFpyenVjb25vICR7dW5pdFR5cGV9IG5hIFwiJHthcHAuYXBwTmFtZX1cIiEgWm5pc3pjem9ubyAke3ByZXZpb3VzR25pZGFzfSBnbmlkLiBaxYLEhWN6YSB6ZGV6eW5mZWtvd2FuZS5gO1xuICAgIHRoaXMuc3RhdGUubGFzdEFzc2F1bHRMb2cudW5zaGlmdChcbiAgICAgIGDwn5KlIFtERVNBTlQgUsSYQ1pOWV0gSmVkbm9zdGthICR7dW5pdFR5cGV9IHpuZXV0cmFsaXpvd2HFgmEgemFncm/FvGVuaWUgdyAke2FwcC5wYWNrYWdlTmFtZX0gKEVrcmFuICR7YXBwLnNjcmVlbkluZGV4fSkuYFxuICAgICk7XG5cbiAgICBpZiAoY29ucXVlcmVkID09PSB0aGlzLmFwcHMubGVuZ3RoKSB7XG4gICAgICB0aGlzLnN0YXRlLmlzQ29tcGxldGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuc3RhdGUub3ZlcmFsbFByb2dyZXNzID0gMTAwO1xuICAgICAgdGhpcy5zdGF0ZS5jdXJyZW50U3RhZ2UgPSAnU1RBR0VfNF9NVUxUSV9TQ1JFRU4nO1xuICAgIH1cblxuICAgIHRoaXMubm90aWZ5KCk7XG4gIH1cblxuICAvLyBDbGVhbnNlIHNwZWNpZmljIHN1Yi1jb25uZWN0aW9uIGluIGFuIGFwcFxuICBwdWJsaWMgY2xlYW5zZVN1YkNvbm5lY3Rpb24oYXBwSWQ6IHN0cmluZywgY29ubklkOiBzdHJpbmcpIHtcbiAgICBjb25zdCBhcHAgPSB0aGlzLmFwcHMuZmluZChhID0+IGEuaWQgPT09IGFwcElkKTtcbiAgICBpZiAoIWFwcCB8fCAhYXBwLmNvbm5lY3Rpb25zKSByZXR1cm47XG5cbiAgICBjb25zdCBjb25uID0gYXBwLmNvbm5lY3Rpb25zLmZpbmQoYyA9PiBjLmlkID09PSBjb25uSWQpO1xuICAgIGlmICghY29ubikgcmV0dXJuO1xuXG4gICAgY29ubi5nbmlkYXNQdXJnZWQgKz0gY29ubi5nbmlkYXNEZXRlY3RlZDtcbiAgICBjb25uLmduaWRhc0RldGVjdGVkID0gMDtcbiAgICBjb25uLnN0YXR1cyA9ICdDTEVBTlNFRCc7XG4gICAgY29ubi5hZ2dyZXNzaW9uUGVyY2VudCA9IDA7XG5cbiAgICAvLyBVcGRhdGUgYXBwIGFnZ3Jlc3Npb25cbiAgICBjb25zdCB0b3RhbFJlbWFpbmluZyA9IGFwcC5jb25uZWN0aW9ucy5yZWR1Y2UoKGFjYywgYykgPT4gYWNjICsgYy5nbmlkYXNEZXRlY3RlZCwgMCk7XG4gICAgYXBwLmduaWRhQ291bnQgPSB0b3RhbFJlbWFpbmluZztcbiAgICBpZiAodG90YWxSZW1haW5pbmcgPT09IDApIHtcbiAgICAgIGFwcC5jb25xdWVzdFN0YXRlID0gJ0NPTlFVRVJFRF9BTkRfQ0xFQU5TRUQnO1xuICAgICAgYXBwLmxhc2VyR2Fycmlzb25Qb3dlciA9IDEwMDtcbiAgICAgIGFwcC5hZ2dyZXNzaW9uU2NvcmUgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcHAuYWdncmVzc2lvblNjb3JlID0gTWF0aC5tYXgoLi4uYXBwLmNvbm5lY3Rpb25zLm1hcChjID0+IGMuYWdncmVzc2lvblBlcmNlbnQpKTtcbiAgICB9XG5cbiAgICB0aGlzLm5vdGlmeSgpO1xuICB9XG5cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAvLyBFVEFQIDE6IFphasSZY2llIGFwbGlrYWNqaSBtYWNpZXJ6eXN0ZWogKEhvc3QgQmFzZSlcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICBwdWJsaWMgZXhlY3V0ZVN0YWdlMUhvc3RCYXNlKCkge1xuICAgIHRoaXMuc3RhdGUuY3VycmVudFN0YWdlID0gJ1NUQUdFXzFfSE9TVF9BUFAnO1xuICAgIHRoaXMuc3RhdGUuc3RhZ2VQcm9ncmVzcyA9IDEwMDtcbiAgICB0aGlzLnN0YXRlLm92ZXJhbGxQcm9ncmVzcyA9IDI1O1xuICAgIHRoaXMuc3RhdGUuYWN0aXZlU2NyZWVuVmlldyA9IDE7XG5cbiAgICBjb25zdCBiYXNlQXBwID0gdGhpcy5hcHBzLmZpbmQoYSA9PiBhLmlzQmFzZUFwcCk7XG4gICAgaWYgKGJhc2VBcHApIHtcbiAgICAgIGJhc2VBcHAuY29ucXVlc3RTdGF0ZSA9ICdDT05RVUVSRURfQU5EX0NMRUFOU0VEJztcbiAgICAgIGJhc2VBcHAubGFzZXJHYXJyaXNvblBvd2VyID0gMTAwO1xuICAgICAgYmFzZUFwcC5nbmlkYUNvdW50ID0gMDtcbiAgICAgIGJhc2VBcHAuc2VjdXJlZEF0ID0gbmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoKTtcbiAgICB9XG5cbiAgICB0aGlzLnN0YXRlLmN1cnJlbnRBY3Rpb25Mb2cgPSAnRVRBUCAxOiBQcnplasSZdG8gMTAwJSBrb250cm9saSBuYWQgYXBsaWthY2rEhSBtYWNpZXJ6eXN0xIUuIFBhbWnEmcSHIEFSVCBpIGJ1Zm9yIGdyYWZpY3pueSB6YWJsb2tvd2FuZSB0YXJjesSFIGxhc2Vyb3fEhS4nO1xuICAgIHRoaXMuc3RhdGUubGFzdEFzc2F1bHRMb2cudW5zaGlmdChcbiAgICAgICfwn4+wIEVUQVAgMSBaQUtPxYNDWk9OWTogQmF6YSBTZW50aW5lbCBTaGllbGQgemFiZXpwaWVjem9uYS4gVXR3b3J6b25vIG5pZXpuaXN6Y3phbG55IGdhcm5pem9uIHcgYXBsaWthY2ppIG1hY2llcnp5c3Rlai4nXG4gICAgKTtcblxuICAgIHRoaXMubm90aWZ5KCk7XG4gIH1cblxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gIC8vIEVUQVAgMjogT2N6eXN6Y3plbmllIHdlasWbxIcgaSB3eWrFm8SHIChaxYLEhWN6YSBpIFJhcG9ydCBHbmlkKVxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gIHB1YmxpYyBleGVjdXRlU3RhZ2UyQ2xlYW5zZUNvbm5lY3RvcnMoKSB7XG4gICAgdGhpcy5zdGF0ZS5jdXJyZW50U3RhZ2UgPSAnU1RBR0VfMl9DT05ORUNUT1JTJztcbiAgICB0aGlzLnN0YXRlLnN0YWdlUHJvZ3Jlc3MgPSAxMDA7XG4gICAgdGhpcy5zdGF0ZS5vdmVyYWxsUHJvZ3Jlc3MgPSA1MDtcblxuICAgIGxldCBwdXJnZWRJblRoaXNTdGFnZSA9IDA7XG4gICAgdGhpcy5jb25uZWN0b3JzLmZvckVhY2goY29ubiA9PiB7XG4gICAgICBwdXJnZWRJblRoaXNTdGFnZSArPSBjb25uLmduaWRhc0RldGVjdGVkQ291bnQ7XG4gICAgICBjb25uLmduaWRhc1B1cmdlZENvdW50ID0gY29ubi5nbmlkYXNEZXRlY3RlZENvdW50O1xuICAgICAgY29ubi5zZWN1cml0eVN0YXR1cyA9ICcxMDAlIFNFQ1VSRSAmIFBVUkdFRCc7XG4gICAgICBjb25uLmZpcmV3YWxsQWN0aW9uID0gJ0RJU0lORkVDVEVEJztcbiAgICAgIGNvbm4ubGFzdExvZyA9IGBPY3p5c3pjem9ubyAke2Nvbm4uZ25pZGFzRGV0ZWN0ZWRDb3VudH0gZ25pZC4gWsWCxIVjemUgdXN6Y3plbG5pb25lIHRhcmN6xIUgbGFzZXJvd8SFLmA7XG4gICAgfSk7XG5cbiAgICB0aGlzLnN0YXRlLnRvdGFsR25pZGFzUHVyZ2VkT25Db25uZWN0b3JzID0gcHVyZ2VkSW5UaGlzU3RhZ2U7XG4gICAgdGhpcy5zdGF0ZS5jdXJyZW50QWN0aW9uTG9nID0gYEVUQVAgMjogUHJ6ZWN6eXN6Y3pvbm8gd3N6eXN0a2llIHdlasWbY2lhL3d5asWbY2lhICg4IHrFgsSFY3p5KS4gWm5pc3pjem9ubyAke3B1cmdlZEluVGhpc1N0YWdlfSBnbmlkIG5hIG1hZ2lzdHJhbGFjaCBrb211bmlrYWN5am55Y2ghYDtcbiAgICB0aGlzLnN0YXRlLmxhc3RBc3NhdWx0TG9nLnVuc2hpZnQoXG4gICAgICBg4pqhIEVUQVAgMiBaQUtPxYNDWk9OWTogUmFwb3J0IHrFgsSFY3p5IHd5Z2VuZXJvd2FueS4gWm5pc3pjem9ubyAke3B1cmdlZEluVGhpc1N0YWdlfSBnbmlkIG5hIHrFgsSFY3phY2ggQmluZGVyLCBTb2NrZXRzLCBDb250ZW50IFByb3ZpZGVycyBpIHBhbWnEmWNpLmBcbiAgICApO1xuXG4gICAgdGhpcy5ub3RpZnkoKTtcbiAgfVxuXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgLy8gRVRBUCAzOiBEZXNhbnQgeiBhcGxpa2FjamkgbmEgc8SFc2llZG5pZSBhcGxpa2FjamUgKEVrcmFuIDEpXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgcHVibGljIGV4ZWN1dGVTdGFnZTNTY3JlZW4xRGVzYW50KCkge1xuICAgIHRoaXMuc3RhdGUuY3VycmVudFN0YWdlID0gJ1NUQUdFXzNfU0NSRUVOX0RFU0FOVCc7XG4gICAgdGhpcy5zdGF0ZS5zdGFnZVByb2dyZXNzID0gMTAwO1xuICAgIHRoaXMuc3RhdGUub3ZlcmFsbFByb2dyZXNzID0gNzU7XG4gICAgdGhpcy5zdGF0ZS5hY3RpdmVTY3JlZW5WaWV3ID0gMTtcblxuICAgIGxldCBjb25xdWVyZWRJblNjcmVlbjEgPSAwO1xuICAgIHRoaXMuYXBwcy5maWx0ZXIoYSA9PiBhLnNjcmVlbkluZGV4ID09PSAxKS5mb3JFYWNoKGFwcCA9PiB7XG4gICAgICBhcHAuY29ucXVlc3RTdGF0ZSA9ICdDT05RVUVSRURfQU5EX0NMRUFOU0VEJztcbiAgICAgIGFwcC5sYXNlckdhcnJpc29uUG93ZXIgPSAxMDA7XG4gICAgICBhcHAuZ25pZGFDb3VudCA9IDA7XG4gICAgICBhcHAuYWdncmVzc2lvblNjb3JlID0gMDtcbiAgICAgIGFwcC5zZWN1cmVkQXQgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpO1xuICAgICAgaWYgKGFwcC5jb25uZWN0aW9ucykge1xuICAgICAgICBhcHAuY29ubmVjdGlvbnMuZm9yRWFjaChjID0+IHtcbiAgICAgICAgICBjLmduaWRhc1B1cmdlZCArPSBjLmduaWRhc0RldGVjdGVkO1xuICAgICAgICAgIGMuZ25pZGFzRGV0ZWN0ZWQgPSAwO1xuICAgICAgICAgIGMuc3RhdHVzID0gJ0NMRUFOU0VEJztcbiAgICAgICAgICBjLmFnZ3Jlc3Npb25QZXJjZW50ID0gMDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBjb25xdWVyZWRJblNjcmVlbjErKztcbiAgICB9KTtcblxuICAgIGNvbnN0IHRvdGFsQ29ucXVlcmVkID0gdGhpcy5hcHBzLmZpbHRlcihhID0+IGEuY29ucXVlc3RTdGF0ZSA9PT0gJ0NPTlFVRVJFRF9BTkRfQ0xFQU5TRUQnKS5sZW5ndGg7XG4gICAgdGhpcy5zdGF0ZS50b3RhbEFwcHNDb25xdWVyZWQgPSB0b3RhbENvbnF1ZXJlZDtcbiAgICB0aGlzLnN0YXRlLnRvdGFsU2NyZWVuc1NlY3VyZWQgPSAxO1xuICAgIHRoaXMuc3RhdGUuY3VycmVudEFjdGlvbkxvZyA9IGBFVEFQIDM6IERlc2FudCBuYSBzxIVzaWVkbmllIGFwbGlrYWNqZSBwb3dpw7NkxYIgc2nEmSEgWmRvYnl0byBpIG9jenlzemN6b25vIGNhxYJ5IEVrcmFuIDEgKCR7Y29ucXVlcmVkSW5TY3JlZW4xfSBhcGxpa2FjamkpLmA7XG4gICAgdGhpcy5zdGF0ZS5sYXN0QXNzYXVsdExvZy51bnNoaWZ0KFxuICAgICAgYPCfm6nvuI8gRVRBUCAzIFpBS0/Fg0NaT05ZOiBEZXNhbnQgeiBiYXp5IG9wYW5vd2HFgiBQcnplZ2zEhWRhcmvEmSwgS29tdW5pa2F0b3IsIEJhbmtvd2/Fm8SHLCBHYWxlcmnEmSBpIFNrbGVwLiBDYcWCeSBFa3JhbiAxIHcgMTAwJSBwb2Qga29udHJvbMSFIWBcbiAgICApO1xuXG4gICAgdGhpcy5ub3RpZnkoKTtcbiAgfVxuXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgLy8gRVRBUCA0OiBEZXNhbnQgbmEga29sZWpuZSBla3JhbnkgKEVrcmFuIDIsIEVrcmFuIDMsIFBhc2VrIFBvd2lhZG9taWXFhClcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICBwdWJsaWMgZXhlY3V0ZVN0YWdlNE11bHRpU2NyZWVuRGVzYW50KCkge1xuICAgIHRoaXMuc3RhdGUuY3VycmVudFN0YWdlID0gJ1NUQUdFXzRfTVVMVElfU0NSRUVOJztcbiAgICB0aGlzLnN0YXRlLnN0YWdlUHJvZ3Jlc3MgPSAxMDA7XG4gICAgdGhpcy5zdGF0ZS5vdmVyYWxsUHJvZ3Jlc3MgPSAxMDA7XG4gICAgdGhpcy5zdGF0ZS5pc0NvbXBsZXRlZCA9IHRydWU7XG4gICAgdGhpcy5zdGF0ZS5pc0F1dG9FeGVjdXRpbmcgPSBmYWxzZTtcblxuICAgIC8vIFpkb2J5Y2llIHdzenlzdGtpY2ggcG96b3N0YcWCeWNoIGFwbGlrYWNqaSBuYSBla3JhbmFjaCAyLCAzIGkgNFxuICAgIHRoaXMuYXBwcy5mb3JFYWNoKGFwcCA9PiB7XG4gICAgICBhcHAuY29ucXVlc3RTdGF0ZSA9ICdDT05RVUVSRURfQU5EX0NMRUFOU0VEJztcbiAgICAgIGFwcC5sYXNlckdhcnJpc29uUG93ZXIgPSAxMDA7XG4gICAgICBhcHAuZ25pZGFDb3VudCA9IDA7XG4gICAgICBhcHAuYWdncmVzc2lvblNjb3JlID0gMDtcbiAgICAgIGlmIChhcHAuY29ubmVjdGlvbnMpIHtcbiAgICAgICAgYXBwLmNvbm5lY3Rpb25zLmZvckVhY2goYyA9PiB7XG4gICAgICAgICAgYy5nbmlkYXNQdXJnZWQgKz0gYy5nbmlkYXNEZXRlY3RlZDtcbiAgICAgICAgICBjLmduaWRhc0RldGVjdGVkID0gMDtcbiAgICAgICAgICBjLnN0YXR1cyA9ICdDTEVBTlNFRCc7XG4gICAgICAgICAgYy5hZ2dyZXNzaW9uUGVyY2VudCA9IDA7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKCFhcHAuc2VjdXJlZEF0KSB7XG4gICAgICAgIGFwcC5zZWN1cmVkQXQgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gVXBld25paiBzacSZLCDFvGUgesWCxIVjemEgc8SFIHcgMTAwJSBjenlzdGVcbiAgICB0aGlzLmNvbm5lY3RvcnMuZm9yRWFjaChjID0+IHtcbiAgICAgIGMuZ25pZGFzUHVyZ2VkQ291bnQgPSBjLmduaWRhc0RldGVjdGVkQ291bnQ7XG4gICAgICBjLnNlY3VyaXR5U3RhdHVzID0gJzEwMCUgU0VDVVJFICYgUFVSR0VEJztcbiAgICB9KTtcbiAgICB0aGlzLnN0YXRlLnRvdGFsR25pZGFzUHVyZ2VkT25Db25uZWN0b3JzID0gdGhpcy5zdGF0ZS50b3RhbEduaWRhc09uQ29ubmVjdG9ycztcblxuICAgIHRoaXMuc3RhdGUudG90YWxBcHBzQ29ucXVlcmVkID0gdGhpcy5hcHBzLmxlbmd0aDtcbiAgICB0aGlzLnN0YXRlLnRvdGFsU2NyZWVuc1NlY3VyZWQgPSA0O1xuICAgIHRoaXMuc3RhdGUuY3VycmVudEFjdGlvbkxvZyA9ICdFVEFQIDQ6IFBFxYFOQSBET01JTkFDSkEhIERlc2FudCBvcGFub3dhxYIgRWtyYW4gTmFyesSZZHppICgyKSwgRWtyYW4gR2llci9UxYJhICgzKSBvcmF6IFBhc2VrIFBvd2lhZG9taWXFhCBpIFN5c3RlbVVJICg0KS4gQ2HFgnkgdGVsZWZvbiBvY3p5c3pjem9ueSEnO1xuICAgIHRoaXMuc3RhdGUubGFzdEFzc2F1bHRMb2cudW5zaGlmdChcbiAgICAgICfwn4+GIEVUQVAgNCBaQUtPxYNDWk9OWTogV3N6eXN0a2llIDQgZWtyYW55IHNtYXJ0Zm9uYSB6ZG9ieXRlIGkgb2N6eXN6Y3pvbmUuIFplcm8gZ25pZCB3IHN5c3RlbWllIG1vYmlsbnltISdcbiAgICApO1xuXG4gICAgaWYgKHRoaXMuYXV0b1RpbWVyKSB7XG4gICAgICBjbGVhckludGVydmFsKHRoaXMuYXV0b1RpbWVyKTtcbiAgICAgIHRoaXMuYXV0b1RpbWVyID0gbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLm5vdGlmeSgpO1xuICB9XG5cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAvLyBBVVRPTUFUWUNaTkUgUFJaRVBST1dBRFpFTklFIENBxYFFR08gQ1lLTFUgKEFVVE8gT0NDVVBBVElPTiAmIERFU0FOVClcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICBwdWJsaWMgc3RhcnRBdXRvbWF0ZWRDb25xdWVzdCgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS5pc0F1dG9FeGVjdXRpbmcpIHJldHVybjtcblxuICAgIHRoaXMuc3RhdGUuaXNBdXRvRXhlY3V0aW5nID0gdHJ1ZTtcbiAgICB0aGlzLnN0YXRlLmlzQ29tcGxldGVkID0gZmFsc2U7XG4gICAgdGhpcy5zdGF0ZS5jdXJyZW50QWN0aW9uTG9nID0gJ1JvenBvY3p5bmFuaWUgdyBwZcWCbmkgYXV0b21hdHljem5lZ28gemFqbW93YW5pYSBvYnN6YXJ1IG5hIHRlbGVmb25pZS4uLic7XG4gICAgdGhpcy5zdGF0ZS5sYXN0QXNzYXVsdExvZy51bnNoaWZ0KCfwn5qAIFVydWNob21pb25vIGF1dG9tYXR5Y3pueSBwcm90b2vDs8WCIDQtZXRhcG93ZWdvIGRlc2FudHUuJyk7XG4gICAgdGhpcy5ub3RpZnkoKTtcblxuICAgIC8vIEtyb2sgMTogRXRhcCAxICgwLjhzKVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5leGVjdXRlU3RhZ2UxSG9zdEJhc2UoKTtcbiAgICAgIFxuICAgICAgLy8gS3JvayAyOiBFdGFwIDIgKDEuOHMpXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5leGVjdXRlU3RhZ2UyQ2xlYW5zZUNvbm5lY3RvcnMoKTtcblxuICAgICAgICAvLyBLcm9rIDM6IEV0YXAgMyAoMi44cylcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5leGVjdXRlU3RhZ2UzU2NyZWVuMURlc2FudCgpO1xuXG4gICAgICAgICAgLy8gS3JvayA0OiBFdGFwIDQgKDMuOHMpXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmV4ZWN1dGVTdGFnZTRNdWx0aVNjcmVlbkRlc2FudCgpO1xuICAgICAgICAgIH0sIDEyMDApO1xuICAgICAgICB9LCAxMjAwKTtcbiAgICAgIH0sIDEyMDApO1xuICAgIH0sIDgwMCk7XG4gIH1cblxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gIC8vIFBPSkVEWU5DWlkgS1JPSyBERVNBTlRVIChNQU5VQUwgU1RFUC1CWS1TVEVQKVxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gIHB1YmxpYyBhZHZhbmNlTmV4dFN0ZXAoKSB7XG4gICAgc3dpdGNoICh0aGlzLnN0YXRlLmN1cnJlbnRTdGFnZSkge1xuICAgICAgY2FzZSAnSURMRSc6XG4gICAgICAgIHRoaXMuZXhlY3V0ZVN0YWdlMUhvc3RCYXNlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnU1RBR0VfMV9IT1NUX0FQUCc6XG4gICAgICAgIHRoaXMuZXhlY3V0ZVN0YWdlMkNsZWFuc2VDb25uZWN0b3JzKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnU1RBR0VfMl9DT05ORUNUT1JTJzpcbiAgICAgICAgdGhpcy5leGVjdXRlU3RhZ2UzU2NyZWVuMURlc2FudCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1NUQUdFXzNfU0NSRUVOX0RFU0FOVCc6XG4gICAgICAgIHRoaXMuZXhlY3V0ZVN0YWdlNE11bHRpU2NyZWVuRGVzYW50KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnU1RBR0VfNF9NVUxUSV9TQ1JFRU4nOlxuICAgICAgICB0aGlzLnJlc2V0VG9Jbml0aWFsU3RhdGUoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAvLyBPQ1pZU1pDWkVOSUUgS09OS1JFVE5FR08gWsWBxIRDWkEgKElOVEVSQUNUSU9OKVxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gIHB1YmxpYyBjbGVhbnNlU3BlY2lmaWNDb25uZWN0b3IoaWQ6IHN0cmluZykge1xuICAgIGNvbnN0IGNvbm4gPSB0aGlzLmNvbm5lY3RvcnMuZmluZChjID0+IGMuaWQgPT09IGlkKTtcbiAgICBpZiAoIWNvbm4pIHJldHVybjtcblxuICAgIGNvbm4uZ25pZGFzUHVyZ2VkQ291bnQgPSBjb25uLmduaWRhc0RldGVjdGVkQ291bnQ7XG4gICAgY29ubi5zZWN1cml0eVN0YXR1cyA9ICcxMDAlIFNFQ1VSRSAmIFBVUkdFRCc7XG4gICAgY29ubi5maXJld2FsbEFjdGlvbiA9ICdESVNJTkZFQ1RFRCc7XG4gICAgY29ubi5sYXN0TG9nID0gYFLEmWN6bmllIG9jenlzemN6b25vICR7Y29ubi5nbmlkYXNEZXRlY3RlZENvdW50fSBnbmlkIHogbWFnaXN0cmFsaS4gTmHFgm/FvG9ubyBmaWx0ciBsYXNlcm93eS5gO1xuXG4gICAgY29uc3QgdG90YWxQdXJnZWQgPSB0aGlzLmNvbm5lY3RvcnMucmVkdWNlKChhY2MsIGMpID0+IGFjYyArIGMuZ25pZGFzUHVyZ2VkQ291bnQsIDApO1xuICAgIHRoaXMuc3RhdGUudG90YWxHbmlkYXNQdXJnZWRPbkNvbm5lY3RvcnMgPSB0b3RhbFB1cmdlZDtcbiAgICB0aGlzLnN0YXRlLmxhc3RBc3NhdWx0TG9nLnVuc2hpZnQoYPCfm6HvuI8gUsSZY3puZSBvY3p5c3pjemVuaWUgesWCxIVjemE6ICR7Y29ubi5uYW1lfSAtPiAxMDAlIHphYmV6cGllY3pvbmUuYCk7XG5cbiAgICB0aGlzLm5vdGlmeSgpO1xuICB9XG5cbiAgcHVibGljIGRlc2FudE9uU3BlY2lmaWNBcHAoYXBwSWQ6IHN0cmluZykge1xuICAgIHRoaXMuZGVwbG95RGVzYW50VmVjdG9yVG9BcHAoYXBwSWQsICdMQVNFUl9UT1dFUl9CRUFNJyk7XG4gIH1cblxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gIC8vIEdFTkVSQVRPUiBTS1JZUFRVIFBZVEhPTi9BREIgRExBIFNZU1RFTVUgTU9CSUxORUdPXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgcHVibGljIGdlbmVyYXRlTW9iaWxlQ29ucXVlc3RTY3JpcHQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCMhL3Vzci9iaW4vZW52IHB5dGhvbjNcbiMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4jICBTRU5USU5FTCBNT0JJTEUgVEFDVElDQUwgREVTQU5UICYgQVJFQSBDT05RVUVTVCBQUk9UT0NPTCAoQU5EUk9JRCAvIExJTlVYKVxuIyAgUGxpazogc2VudGluZWxfbW9iaWxlX2FyZWFfY29ucXVlc3QucHlcbiMgIE9waXM6IDQtZXRhcG93ZSBhdXRvbWF0eWN6bmUgemFqxJljaWUgb2JzemFydSB0ZWxlZm9udSwgb2N6eXN6Y3plbmllIHrFgsSFY3p5LFxuIyAgICAgICAgcmFwb3J0IGlsb8WbY2kgZ25pZCBvcmF6IGRlc2FudCBuYSBla3JhbiBiaWXFvMSFY3kgaSBrb2xlam5lIGVrcmFueS5cbiMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5pbXBvcnQgb3NcbmltcG9ydCBzeXNcbmltcG9ydCB0aW1lXG5cbkNPTk5FQ1RPUlMgPSBbXG4gICAge1wibmFtZVwiOiBcIkJpbmRlciBJUEMgTWFzdGVyIEJ1cyAoL2Rldi9iaW5kZXIpXCIsIFwidHlwZVwiOiBcIkJJTkRFUl9JUENcIiwgXCJnbmlkYXNcIjogMTR9LFxuICAgIHtcIm5hbWVcIjogXCJDb250ZW50IFByb3ZpZGVyOiBLb250YWt0eSwgU01TICYgVGVsZXBob255XCIsIFwidHlwZVwiOiBcIkNPTlRFTlRfUFJPVklERVJcIiwgXCJnbmlkYXNcIjogOX0sXG4gICAge1wibmFtZVwiOiBcIkJyb2FkY2FzdCBSZWNlaXZlcnMgKEJPT1RfQ09NUExFVEVELCBTTVMpXCIsIFwidHlwZVwiOiBcIkJST0FEQ0FTVF9SRUNFSVZFUlwiLCBcImduaWRhc1wiOiAxMn0sXG4gICAge1wibmFtZVwiOiBcIkduaWF6ZGEgU2llY2lvd2UgVENQL1VEUCAoUG9ydHkgQzIgNDQzLzgwODApXCIsIFwidHlwZVwiOiBcIlRDUF9VRFBfU09DS0VUXCIsIFwiZ25pZGFzXCI6IDh9LFxuICAgIHtcIm5hbWVcIjogXCJVbml4IERvbWFpbiBTb2NrZXRzICgvZGV2L3NvY2tldC96eWdvdGUpXCIsIFwidHlwZVwiOiBcIlVOSVhfRE9NQUlOX1NPQ0tFVFwiLCBcImduaWRhc1wiOiA2fSxcbiAgICB7XCJuYW1lXCI6IFwiUGFtacSZxIcgV3Nww7PFgmR6aWVsb25hIChhc2htZW0gLyAvZGV2L2lvbilcIiwgXCJ0eXBlXCI6IFwiU0hBUkVEX01FTU9SWVwiLCBcImduaWRhc1wiOiAxMX0sXG4gICAge1wibmFtZVwiOiBcIlVzxYJ1Z2kgRG9zdMSZcG5vxZtjaSAmIEhvb2tpIE5ha8WCYWRlayBUb3BNb3N0XCIsIFwidHlwZVwiOiBcIkFDQ0VTU0lCSUxJVFlfQVBJXCIsIFwiZ25pZGFzXCI6IDE2fSxcbiAgICB7XCJuYW1lXCI6IFwiTW9zdGVrIFNjaG93a2EgU3lzdGVtb3dlZ28gKENsaXBib2FyZCBTbmlmZmVyKVwiLCBcInR5cGVcIjogXCJDTElQQk9BUkRfQlJJREdFXCIsIFwiZ25pZGFzXCI6IDd9XG5dXG5cblRBUkdFVF9TQ1JFRU5TID0ge1xuICAgIFwiRUtSQU4gMSAoR8WBw5NXTlkpXCI6IFtcbiAgICAgICAgXCJjb20uYW5kcm9pZC5jaHJvbWUuc2VjdXJlIChQcnplZ2zEhWRhcmthIFdlYilcIixcbiAgICAgICAgXCJvcmcudGhvdWdodGNyaW1lLnNlY3VyZXNtcyAoS29tdW5pa2F0b3IgU3p5ZnJvd2FueSlcIixcbiAgICAgICAgXCJwbC5iYW5rLnNlY3VyZW1vYmlsZSAoQmFua293b8WbxIcgJiBQb3J0ZmVsKVwiLFxuICAgICAgICBcImNvbS5nb29nbGUuYW5kcm9pZC5hcHBzLnBob3RvcyAoR2FsZXJpYSBNZWRpw7N3KVwiLFxuICAgICAgICBcImNvbS5hbmRyb2lkLnZlbmRpbmcgKFNrbGVwIEFwbGlrYWNqaSlcIlxuICAgIF0sXG4gICAgXCJFS1JBTiAyIChOQVJaxJhEWklBKVwiOiBbXG4gICAgICAgIFwiY29tLmFuZHJvaWQuc2V0dGluZ3MgKFVzdGF3aWVuaWEgU3lzdGVtdSlcIixcbiAgICAgICAgXCJjb20uYW5kcm9pZC5kb2N1bWVudHN1aSAoTWVuZWTFvGVyIFBsaWvDs3cpXCIsXG4gICAgICAgIFwiY29tLnRlcm11eC5zZW50aW5lbCAoTW9iaWxueSBUZXJtaW5hbCBUZXJtdXgpXCIsXG4gICAgICAgIFwiY29tLmFuZHJvaWQuY2FtZXJhMiAoQXBhcmF0ICYgU2Vuc29yeSlcIixcbiAgICAgICAgXCJjb20ud2lyZWd1YXJkLmFuZHJvaWQgKFR1bmVsIFdpcmVHdWFyZCBWUE4pXCIsXG4gICAgICAgIFwib3JnLmtlZXBhc3Nkcm9pZCAoQmF6YSBIYXNlxYIpXCJcbiAgICBdLFxuICAgIFwiRUtSQU4gMyAoVMWBTyAvIEdSWSlcIjogW1xuICAgICAgICBcImNvbS5hZHdhcmUuYXJjYWRlLmZha2VnYW1lIChaYWluZmVrb3dhbmEgR3JhKVwiLFxuICAgICAgICBcImNvbS5zb2NpYWwudHJhY2tlci5jbGllbnQgKEtsaWVudCBTb2NpYWwgTWVkaWEpXCIsXG4gICAgICAgIFwiY29tLm1lZGlhLnBsYXllci5zdHJlYW0gKE9kdHdhcnphY3ogV2lkZW8pXCIsXG4gICAgICAgIFwiY29tLmNsb3VkLnN5bmMuZHJpdmUgKENobXVyYSBCYWNrdXApXCIsXG4gICAgICAgIFwiaW8ubWV0YW1hc2sud2FsbGV0IChQb3J0ZmVsIFdlYjMpXCJcbiAgICBdLFxuICAgIFwiRUtSQU4gNCAoU1lTVEVNIFVJIC8gUE9XSUFET01JRU5JQSlcIjogW1xuICAgICAgICBcImNvbS5hbmRyb2lkLnN5c3RlbXVpLnN0YXR1c2JhciAoUGFzZWsgUG93aWFkb21pZcWEKVwiLFxuICAgICAgICBcImNvbS5hbmRyb2lkLmtleWd1YXJkLmJpb21ldHJpY3MgKEVrcmFuIEJsb2thZHkpXCIsXG4gICAgICAgIFwiY29tLmFuZHJvaWQud20uc3BsaXQgKE11bHRpLVdpbmRvdyBQb2R6aWHFgilcIixcbiAgICAgICAgXCJhbmRyb2lkLm9zLlNlcnZpY2VNYW5hZ2VyIChEZW1vbnkgdyBUbGUpXCJcbiAgICBdXG59XG5cbmRlZiBiYW5uZXIoKTpcbiAgICBwcmludChcIj1cIiAqIDgwKVxuICAgIHByaW50KFwiICBTRU5USU5FTCBNT0JJTEUgU0hJRUxEOiBBVVRPTUFUWUNaTkUgWkFKTU9XQU5JRSBPQlNaQVJVIFNNQVJURk9OQVwiKVxuICAgIHByaW50KFwiICBXZXJzamE6IDIuNC1NT0JJTEUgfCBQcm90b2vDs8WCOiBLaWxsIEduaWRhIERlc2FudCBFbmdpbmVcIilcbiAgICBwcmludChcIj1cIiAqIDgwKVxuXG5kZWYgc3RhZ2VfMV9ob3N0X2Jhc2UoKTpcbiAgICBwcmludChcIlxcXFxuW0VUQVAgMS80XSBaQUrEmENJRSBBUExJS0FDSkkgTUFDSUVSWllTVEVKIChTRU5USU5FTCBCQVNFIExPQ0tET1dOKS4uLlwiKVxuICAgIHRpbWUuc2xlZXAoMC40KVxuICAgIHByaW50KFwiICBbK10gUHJ6ZWrEmXRvIGJ1Zm9yIHJlbmRlcm93YW5pYSBTdXJmYWNlRmxpbmdlciBpIHBhbWnEmcSHIEFSVC5cIilcbiAgICBwcmludChcIiAgWytdIFfEhXRraSBiYXp5IG9iasSZdGUgMTAwJSB0YXJjesSFIGxhc2Vyb3fEhS5cIilcbiAgICBwcmludChcIiAgW1ZdIEVUQVAgMSBVS0/Fg0NaT05ZOiBBcGxpa2FjamEgbWFjaWVyenlzdGEgemFiZXpwaWVjem9uYSFcIilcblxuZGVmIHN0YWdlXzJfY2xlYW5zZV9jb25uZWN0b3JzKCk6XG4gICAgcHJpbnQoXCJcXFxcbltFVEFQIDIvNF0gT0NaWVNaQ1pBTklFIFdFSsWaxIYgSSBXWUrFmsSGIChaxYHEhENaWSkgJiBSQVBPUlQgSUxPxZpDSSBHTklELi4uXCIpXG4gICAgdGltZS5zbGVlcCgwLjQpXG4gICAgcHJpbnQoXCItXCIgKiA4MClcbiAgICBwcmludChmXCIgIHsnWsWBxIRDWkUgLyBNQUdJU1RSQUxBJzo8NDV9IHwgeydUWVAnOjwxOH0gfCB7J0dOSURZJzo8Nn0gfCB7J1NUQVRVUyd9XCIpXG4gICAgcHJpbnQoXCItXCIgKiA4MClcbiAgICB0b3RhbF9nbmlkYXMgPSAwXG4gICAgZm9yIGNvbm4gaW4gQ09OTkVDVE9SUzpcbiAgICAgICAgdG90YWxfZ25pZGFzICs9IGNvbm5bJ2duaWRhcyddXG4gICAgICAgIHByaW50KGZcIiAge2Nvbm5bJ25hbWUnXTo8NDV9IHwge2Nvbm5bJ3R5cGUnXTo8MTh9IHwge2Nvbm5bJ2duaWRhcyddOjw2fSB8IFsxMDAlIE9DWllTWkNaT05FXVwiKVxuICAgICAgICB0aW1lLnNsZWVwKDAuMDQpXG4gICAgcHJpbnQoXCItXCIgKiA4MClcbiAgICBwcmludChmXCIgIFs+Pj5dIFJBUE9SVCBLT8WDQ09XWSBaxYHEhENaWTogV3lrcnl0byBpIHNwb3BpZWxvbm8ge3RvdGFsX2duaWRhc30gR05JRCBuYSB3ZWrFm2NpYWNoL3d5asWbY2lhY2ghXCIpXG4gICAgcHJpbnQoXCIgIFtWXSBFVEFQIDIgVUtPxYNDWk9OWTogV3N6eXN0a2llIHrFgsSFY3phIElQQy9CaW5kZXIvU29ja2V0cyB6ZGV6eW5mZWtvd2FuZS5cIilcblxuZGVmIHN0YWdlXzNfc2NyZWVuXzFfZGVzYW50KCk6XG4gICAgcHJpbnQoXCJcXFxcbltFVEFQIDMvNF0gREVTQU5UIFogQVBMSUtBQ0pJIE5BIFPEhFNJRUROSUUgS0FGRUxLSSAoRUtSQU4gMSkuLi5cIilcbiAgICB0aW1lLnNsZWVwKDAuNClcbiAgICBmb3IgcGtnIGluIFRBUkdFVF9TQ1JFRU5TW1wiRUtSQU4gMSAoR8WBw5NXTlkpXCJdOlxuICAgICAgICBwcmludChmXCIgIFvwn5up77iPIERFU0FOVF0gT3Bhbm93YW5pZToge3BrZ30gLT4gVXN0YW5vd2lvbm8gZ2Fybml6b24gbGFzZXJvd3kuXCIpXG4gICAgICAgIHRpbWUuc2xlZXAoMC4wOClcbiAgICBwcmludChcIiAgW1ZdIEVUQVAgMyBVS0/Fg0NaT05ZOiBaZG9ieXRvIDEwMCUgcG93aWVyemNobmkgRWtyYW51IEfFgsOzd25lZ28hXCIpXG5cbmRlZiBzdGFnZV80X211bHRpX3NjcmVlbl9kZXNhbnQoKTpcbiAgICBwcmludChcIlxcXFxuW0VUQVAgNC80XSBERVNBTlQgTkEgS09MRUpORSBFS1JBTlkgKEVLUkFOWSAyLCAzIE9SQVogU1lTVEVNX1VJKS4uLlwiKVxuICAgIHRpbWUuc2xlZXAoMC40KVxuICAgIGZvciBzY3JlZW5fbmFtZSwgcGtncyBpbiBUQVJHRVRfU0NSRUVOUy5pdGVtcygpOlxuICAgICAgICBpZiBzY3JlZW5fbmFtZSA9PSBcIkVLUkFOIDEgKEfFgcOTV05ZKVwiOiBjb250aW51ZVxuICAgICAgICBwcmludChmXCJcXFxcbiAgLS0tIFpkb2J5d2FuaWU6IHtzY3JlZW5fbmFtZX0gLS0tXCIpXG4gICAgICAgIGZvciBwa2cgaW4gcGtnczpcbiAgICAgICAgICAgIHByaW50KGZcIiAgICBb8J+SpSBaRE9CWVRPXSB7cGtnfSAtPiBabGlrd2lkb3dhbm8gZ25pZHksIHVzdGFub3dpb25vIGdhcm5pem9uIFNlbnRpbmVsLlwiKVxuICAgICAgICAgICAgdGltZS5zbGVlcCgwLjA2KVxuICAgIHByaW50KFwiXFxcXG5cIiArIFwiPVwiICogODApXG4gICAgcHJpbnQoXCIgIFvwn4+GIFNVS0NFUyBLT8WDQ09XWV0gMTAwJSBTTUFSVEZPTkEgWkRPQllURSBJIE9DWllTWkNaT05FISBaRVJPIEdOSUQhXCIpXG4gICAgcHJpbnQoXCI9XCIgKiA4MClcblxuZGVmIG1haW4oKTpcbiAgICBiYW5uZXIoKVxuICAgIHN0YWdlXzFfaG9zdF9iYXNlKClcbiAgICBzdGFnZV8yX2NsZWFuc2VfY29ubmVjdG9ycygpXG4gICAgc3RhZ2VfM19zY3JlZW5fMV9kZXNhbnQoKVxuICAgIHN0YWdlXzRfbXVsdGlfc2NyZWVuX2Rlc2FudCgpXG5cbmlmIF9fbmFtZV9fID09ICdfX21haW5fXyc6XG4gICAgbWFpbigpXG5gO1xuICB9XG5cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAvLyBSRVNFVCBETyBTVEFOVSBQT0NaxIRUS09XRUdPXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgcHVibGljIHJlc2V0VG9Jbml0aWFsU3RhdGUoKSB7XG4gICAgdGhpcy5jb25uZWN0b3JzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShJTklUSUFMX0NPTk5FQ1RPUlNfUkVQT1JUKSk7XG4gICAgdGhpcy5hcHBzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShJTklUSUFMX1BIT05FX0FQUFMpKTtcbiAgICBjb25zdCB0b3RhbEduaWRhcyA9IHRoaXMuY29ubmVjdG9ycy5yZWR1Y2UoKGFjYywgYykgPT4gYWNjICsgYy5nbmlkYXNEZXRlY3RlZENvdW50LCAwKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjdXJyZW50U3RhZ2U6ICdJRExFJyxcbiAgICAgIHN0YWdlUHJvZ3Jlc3M6IDAsXG4gICAgICBvdmVyYWxsUHJvZ3Jlc3M6IDUsXG4gICAgICBpc0F1dG9FeGVjdXRpbmc6IGZhbHNlLFxuICAgICAgaXNDb21wbGV0ZWQ6IGZhbHNlLFxuICAgICAgdG90YWxHbmlkYXNPbkNvbm5lY3RvcnM6IHRvdGFsR25pZGFzLFxuICAgICAgdG90YWxHbmlkYXNQdXJnZWRPbkNvbm5lY3RvcnM6IDAsXG4gICAgICB0b3RhbEFwcHNDb25xdWVyZWQ6IDEsXG4gICAgICB0b3RhbFNjcmVlbnNTZWN1cmVkOiAwLFxuICAgICAgYWN0aXZlU2NyZWVuVmlldzogMSxcbiAgICAgIGRyYWdnZWRVbml0VHlwZTogbnVsbCxcbiAgICAgIGN1cnJlbnRBY3Rpb25Mb2c6ICdacmVzZXRvd2FubyBzdGFuIG1vZHXFgnUgbW9iaWxuZWdvLiBCYXphIFNlbnRpbmVsIGdvdG93YSBkbyBwb25vd25lZ28gZGVzYW50dS4nLFxuICAgICAgbGFzdEFzc2F1bHRMb2c6IFsn8J+UhCBacmVzZXRvd2FubyBtYXRyeWPEmSBkZXNhbnR1IHNtYXJ0Zm9uYS4nXVxuICAgIH07XG5cbiAgICB0aGlzLm5vdGlmeSgpO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBtb2JpbGVBcmVhQ29ucXVlc3RFbmdpbmUgPSBuZXcgTW9iaWxlQXJlYUNvbnF1ZXN0RW5naW5lKCk7XG4iXSwibWFwcGluZ3MiOiJBQVFPLGFBQU0sNEJBQXNEO0FBQUEsRUFDakU7QUFBQSxJQUNFLElBQUk7QUFBQSxJQUNKLE1BQU07QUFBQSxJQUNOLGVBQWU7QUFBQSxJQUNmLHFCQUFxQjtBQUFBLElBQ3JCLG1CQUFtQjtBQUFBLElBQ25CLG1CQUFtQjtBQUFBLElBQ25CLGdCQUFnQjtBQUFBLElBQ2hCLHFCQUFxQjtBQUFBLElBQ3JCLGdCQUFnQjtBQUFBLElBQ2hCLFNBQVM7QUFBQSxFQUNYO0FBQUEsRUFDQTtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osTUFBTTtBQUFBLElBQ04sZUFBZTtBQUFBLElBQ2YscUJBQXFCO0FBQUEsSUFDckIsbUJBQW1CO0FBQUEsSUFDbkIsbUJBQW1CO0FBQUEsSUFDbkIsZ0JBQWdCO0FBQUEsSUFDaEIscUJBQXFCO0FBQUEsSUFDckIsZ0JBQWdCO0FBQUEsSUFDaEIsU0FBUztBQUFBLEVBQ1g7QUFBQSxFQUNBO0FBQUEsSUFDRSxJQUFJO0FBQUEsSUFDSixN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