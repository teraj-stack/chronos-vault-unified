# Chronos Vault — Centralny Panel Sterowania, AI SEO/AEO, Operacje Kliniczne i Zespołowe E2EE

Kompleksowa, responsywna platforma webowa (**React 19 + TypeScript + Tailwind CSS v4 + Framer Motion**) łącząca **Centralny Panel Sterowania z silnikiem AI monitorującym treści SEO & AEO**, **adaptacyjnym algorytmem uczącym w czasie rzeczywistym**, **cyklicznymi raportami PDF z wysyłką e-mail**, **planowaniem objętościowym i chmurowym auto-skalowaniem**, **grafikami urządzeń klinicznych**, **kalendarzem tygodniowym** oraz **bezpiecznym zarządzaniem pracą zespołową z szyfrowaniem End-to-End (`AES-256-GCM`)**.

---

## Kluczowe moduły platformy

### 1. Centralny Panel Sterowania: Silnik AI SEO & AEO i optymalizacja fraz w czasie
- **Monitoring wielokanałowy**: Ciągła analiza podstron WWW, artykułów blogowych oraz publikacji w mediach społecznościowych (*LinkedIn, Instagram / Meta, X / Krótkie Formy*) wraz z wnioskami dotyczącymi zasięgu organicznego i społecznościowego.
- **Automatyczna ewolucja słów kluczowych**: Śledzenie i aktualizacja frazy docelowej w czasie z zachowaniem pełnej historii ewolucji fraz (`keywordHistory`).
- **Optymalizacja AEO (Answer Engine Optimization)**: Generowanie gotowych bloków bezpośrednich odpowiedzi pod silniki odpowiedzi, adaptacji postów społecznościowych oraz danych strukturalnych **Schema.org JSON-LD** (`WebApplication`, `FAQPage`).

### 2. Algorytm uczący w czasie rzeczywistym i spersonalizowane podziały anomalii
- **Modelowanie Siły Wskazującej (Predictive Strength)**: Adaptacyjny algorytm regresji online z regulowanym współczynnikiem zapominania ($\lambda$) i okresem półtrwania automatycznie **wygaszającym nieaktualne dane** na rzecz świeżych sygnałów zasięgowych.
- **Symulator scenariuszy na żywo**: Interaktywne prognozowanie siły wskazującej dla nowych lub modyfikowanych publikacji.
- **Zaawansowane filtrowanie i anomalie**: Wielokryterialne filtrowanie zasobów oraz personalizowane progi dzielące treści na 5 pasm anomalii (*Dezaktualizacja Frazy, Luka Cytowań AEO, Spadek Siły Wskazującej, Skok Wiralowy Social, Stabilne Pasmo*).

### 3. Wykresy informacyjne i cykliczne raporty PDF z wysyłką e-mail
- **Pulpit analityczny**: Wykresy porównawcze wskaźników SEO, AEO i Siły Wskazującej oraz zestawienia rozkładu zasięgu wyszukiwarek względem mediów społecznościowych.
- **Harmonogramy raportów PDF i dystrybucja e-mail**: Konfiguracja cyklicznych podsumowań (*codziennie, co tydzień, co miesiąc*) w bazie Firestore, generowanie raportów wykonawczych **PDF** oraz wysyłka na wskazane adresy e-mail po stronie serwera (z obsługą bramki webhook i pobraniem gotowej paczki MIME `.eml` z załączonym raportem PDF).

### 4. Infrastruktura chmurowa: Planowanie objętościowe, Cloud Functions, Auto-Skalowanie i Błędy
- **Kalkulator objętościowy danych równoległych**: Planowanie przepustowości zapytań, operacji IOPS, pamięci RAM i miesięcznego wolumenu danych zbieranych oraz analizowanych jednocześnie.
- **Silnik zdarzeń Cloud Functions i monitoring wydajności**: Obsługa zdarzeń serwerowych, pomiar opóźnień pętli zdarzeń (Event Loop Lag), pamięci RSS/Heap oraz latencji `p50 / p95` w czasie rzeczywistym.
- **Dynamiczny Auto-Skaler i system raportowania błędów**: Automatyczne skalowanie puli instancji roboczych z symulatorem piku obciążenia oraz deduplikowany rejestr błędów (`SHA-256`) z obsługą statusów rozwiązania.

### 5. Autoryzacja Firebase i udostępnianie profili w Firestore
- **Bezpieczne uwierzytelnianie**: Logowanie użytkowników w oparciu o **Firebase Authentication** i izolację uprawnień w regułach bezpieczeństwa **Cloud Firestore**.
- **Udostępniane profile specjalistów**: Oddzielona od danych wrażliwych (Split-Collection PII Isolation) kolekcja profili w Firestore umożliwiająca bezpieczne publikowanie wizytówek i wskaźników skuteczności w katalogu zespołu.

### 6. Kalendarz Tygodniowy i Grafiki Urządzeń Klinicznych
- **Widok Kalendarza Tygodniowego**: Siatka `Poniedziałek – Niedziela` łącząca zadania projektowe, wydarzenia zsynchronizowane z **Google Calendar** i **Outlook Calendar (`.ics`)** oraz zaplanowane zabiegi kliniczne.
- **Grafiki Urządzeń z podziałem na lokalizacje klinik**: Dynamiczny wybór i dopisywanie lokalizacji placówek z podstronami **Grafiku Urządzeń**, **Zużycia Sprzętu** (motogodziny, impulsy głowic, przeglądy techniczne) oraz **Planu Zabiegów** z detekcją kolizji terminów.

### 7. Tablica Kanban, Szyfrowanie E2EE (`AES-256-GCM`) i Skaner Antymalware
- **Tablica Kanban, Głos i Pismo Odręczne (OCR)**: Przepływ zadań z *Drag & Drop*, konwersją notatek głosowych oraz odręcznych szkiców na strukturalne zadania i pełnotekstowo indeksowanymi raportami PDF/CSV.
- **Szyfrowanie Zero-Knowledge E2EE**: Szyfrowanie poufnych zadań po stronie klienta za pomocą **Web Crypto API (`AES-256-GCM` + `PBKDF2`)**.
- **Audyt pracy AI i Konektor Antymalware**: Kontrola jakości zadań oraz skanowanie zależności i kodu źródłowego pod kątem złośliwego oprogramowania (`OSV.dev MAL-* / GHSA-*` + konektor Webhook SAST/SIEM) z automatycznym generowaniem oczyszczonego kodu.

---

## Interfejs użytkownika i dostępność

- **Synchroniczne animacje Framer Motion**: Zsynchronizowane, płynne przejścia wielu elementów interfejsu jednocześnie (karty KPI, wykresy, przełączniki zakładek i listy zasobów) oparte wyłącznie na właściwościach kompozytora GPU z obsługą `prefers-reduced-motion`.
- **Tryb ciemny i responsywność mobilna**: Pełne wsparcie dla motywu ciemnego i jasnego, nawigacji mobilnej oraz pracy instalowalnej jako **Progressive Web App (PWA)** z pamięcią podręczną **Offline**.

---

## Stos technologiczny

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Framer Motion (`motion/react`), Recharts, Lucide Icons, Vite + `vite-plugin-pwa`
- **Backend i Zdarzenia:** Node.js, Express, serwerowy silnik zdarzeń w architekturze Cloud Functions, Auto-Scaler i telemetria wydajności
- **Baza danych i uwierzytelnianie:** Firebase Authentication & Cloud Firestore (z walidacją schematów i reguł bezpieczeństwa)
- **Kryptografia i Bezpieczeństwo:** Web Crypto API (`AES-256-GCM`, `PBKDF2`), integracja z bazą zagrożeń OSV.dev
- **Raporty i Kalendarze:** `jsPDF`, `jspdf-autotable` (indeks odwrócony PDF + pakiety MIME `.eml`), Google Calendar REST API v3, standard iCalendar (`.ics` / RFC 5545)

---

## Uruchomienie lokalne

1. **Instalacja zależności:**
   ```bash
   npm install
   ```

2. **Konfiguracja zmiennych środowiskowych:**
   Skopiuj plik `.env.example` do `.env` i uzupełnij wymagane zmienne środowiskowe (w tym opcjonalny adres `EMAIL_WEBHOOK_URL` dla zewnętrznej bramki pocztowej).

3. **Uruchomienie serwera deweloperskiego (port 3000):**
   ```bash
   npm run dev
   ```

4. **Kontrola typów i budowanie wersji produkcyjnej:**
   ```bash
   npm run lint
   npm run build
   ```

---

## Licencja

Apache-2.0
