# Chronos Vault — Biblioteka Promptów 3D (adaptacja z HoloArch AR Studio)

Zestaw gotowych, inżynieryjnych promptów zaadaptowanych z architektury **HoloArch AR Studio** (`HologramViewport3D`, palety hologramowe, wieloczęściowe bryły `ExtrudeGeometry`, paralaksa 6DoF, agenty skanujące `AG-01..AG-05`, eksporty `.OBJ/.STL/.PLY`) bezpośrednio pod moduły **Chronos Vault** (praca w 100% offline PWA, React 19 + TypeScript + Three.js / Canvas 3D).

---

## 1. Master System Prompt (Uniwersalny generator modeli 3D dla Chronos Vault)

```text
Jesteś architektem wizualizacji 3D dla aplikacji Chronos Vault (React 19 + TypeScript + Three.js / WebGL, tryb 100% offline PWA bez zewnętrznych CDN).
Zbuduj wieloczęściowy, proceduralny model 3D złożony z 8–12 odrębnych brył (ExtrudeGeometry z fazowaniem, pierścienie, siatki Voronoi/Diagrid) tak, aby cała scena mogła działać na żywo w 60 fps oraz eksportować siatkę do .OBJ / .STL / .PLY.
Wymagania wizualne i przestrzenne (standard HoloArch):
- Paleta: [wybierz: Cyan Blueprint #06B6D4/#F59E0B | Złoty Bursztyn #F59E0B/#38BDF8 | Szmaragdowy LiDAR #10B981/#06B6D4 | Platynowy Monolit #E2E8F0/#38BDF8].
- Przestrzeń i głębia: 3 plany głębokości (tło z miękkim bokeh, główny model 3D z oświetleniem wolumetrycznym i odbiciem na siatce podłogi, pierwszy plan z zawieszonymi kartami HUD reagującymi na paralaksę 6DoF).
- Interakcja: płynne obracanie kamery 3D z tłumieniem bezwładności (damping), reset widoku, klikalne węzły z inspektorem danych na żywo oraz pełne poszanowanie prefers-reduced-motion.
```

---

## 2. Prompt — Szklany Rdzeń Anomalii i Szyfrowania E2EE (adaptacja *Crystal Prism LED + Voronoi Helix*)

```text
Zbuduj interaktywny model 3D w Three.js dla widoku „Model Uczący i Podziały Anomalii” w Chronos Vault, łączący estetykę szlifowanego szkła (IOR 1.52) z bionicznym rdzeniem Voronoi:
- Komora główna: ośmiokątny lub cylindryczny klosz ze szkła optycznego z fazowanymi krawędziami, podświetlanym postumentem obwodowym i odbiciem lustrzanym na ciemnej płycie bazowej.
- Rdzeń energetyczny: centralna kolumna świetlna (ciepły bursztyn 2900K / karmazyn) ze skręconą helisą włókien neuronowych oraz wtórnymi rozgałęzieniami Voronoi reagującymi na natężenie anomalii.
- Węzły danych: 5 orbitujących sfer energetycznych odpowiadających pasmom anomalii (Dezaktualizacja Frazy, Luka AEO, Spadek Predykcji, Skok Wiralowy, Pasmo Stabilne) połączonych świetlnymi impulsami z rdzeniem.
- Autonomiczne sondy skanujące (AG-01..AG-04) patrolujące krawędzie komory oraz zawieszone szklane karty HUD wyświetlające liczbę publikacji i paski telemetrii.
```

---

## 3. Prompt — Miasto Wolumetrycznych Słupków Zasięgu SEO/AEO (adaptacja *Skyline Core*)

```text
Zbuduj proceduralny model 3D „Skyline Telemetry Core” dla wykresu rozkładu zasięgu SEO/AEO vs Media Społecznościowe w Chronos Vault:
- Geometria: zespół fazowanych wież 3D (ExtrudeGeometry z uskokami setbacks) w gradiencie cyan -> elektryczny błękit -> fiolet -> magenta, których wysokości są dynamicznie sterowane realnymi danymi impresji kanałów.
- Podstawa: podświetlana siatka geodezyjna / obwodów na płaszczyźnie y=0 z miękkim odbiciem wież i pionowymi nićmi danych unoszącymi się nad najwyższymi szczytami.
- Boczne panele HUD: dwa pochylone, półprzezroczyste skrzydła HUD po lewej i prawej stronie sceny z żywymi paskami porównawczymi Organic vs Social.
- Kamera: płynny obrót 360° przeciągnięciem myszy, podświetlenie wybranego kanału i eksport zrzutu ekranu do raportu PDF.
```

---

## 4. Prompt — Holograficzne Fale Predykcyjne 2026 (adaptacja *Szmaragdowy LiDAR + Złoty Bursztyn*)

```text
Zbuduj wolumetryczny wykres falowy 3D dla Panelu Sterowania SEO/AEO i Siły Wskazującej w Chronos Vault:
- 3 warstwy głębokości (Z-depth): krzywa SEO (#38BDF8, pierwszy plan), krzywa AEO (#34D399, plan środkowy) i krzywa Predykcji (#FBBF24, plan tylny) z addytywną poświatą 3-warstwową (szeroka aura + neonowy rdzeń + biały filament).
- Drobiazgowość LiDAR: kurtyny drobnych punktów (dot-matrix) opadające pod falami, flary świetlne w punktach szczytowych, pionowe znaczniki osi „2026” oraz miękkie kule bokeh w tle i na pierwszym planie.
- Paralaksa: delikatne przesunięcie warstw względem ruchu kursora i precyzyjny tooltip HUD po najechaniu na każdą publikację.
```

---

## 5. Prompt — Cyfrowy Bliźniak 3D Urządzeń Klinicznych (adaptacja *AeroHub + Platynowy Monolit*)

```text
Zbuduj proceduralny model 3D urządzenia klinicznego/laserowego dla zakładki „Grafiki Urządzeń Klinicznych” w Chronos Vault (paleta Platynowy Monolit + Szmaragdowy LiDAR):
- Składany z 8–10 brył 3D (korpus, ramię przegubowe, głowica laserowa z emiterem wiązki, ekran sterujący, podstawa jezdna) gotowy do podglądu z każdej strony i eksportu .OBJ/.STL.
- Warstwa telemetrii na żywo: kolor pierścienia świetlnego na obudowie sygnalizuje stan (zielony: wolne, błękitny: zaplanowany zabieg, bursztynowy: zbliża się przegląd motogodzin/impulsów, czerwony: kolizja terminów).
- Kliknięcie podzespołu (głowica, układ chłodzenia, zasilanie) otwiera zawieszoną kartę HUD ze statystykami zużycia i historią serwisową.
```
