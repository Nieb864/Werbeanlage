# 🎮 LED & EVG Drag-and-Drop Werkbank

Ein webbasiertes interaktives Lernspiel für LED-Beleuchtungstechnik und elektronische Vorschaltgeräte (EVG). Lerne durch praktisches Experimentieren mit elektronischen Bauteilen und Schaltkreisen!

## ⚡ Features

- **🎯 Drag & Drop Interface**: Intuitive Platzierung von elektronischen Bauteilen
- **📋 Technisches Datenblatt**: Echte Spezifikationen und Schaltskizzen
- **🔌 Echtzeit-Simulation**: Intelligente Elektronik-Simulation mit Zustandsmaschinen
- **⚠️ Realistische Fehlerbehandlung**: LEDs können blinken, überlastet werden oder kaputtgehen
- **🛡️ Schutzeinrichtungen**: FI- und LS-Schalter für sichere Installationen
- **📱 Responsive Design**: Funktioniert auf Desktop und Mobile

## 🛠️ Bauteile

### Schutzschalter
- **FI-Schutzschalter** (30mA, 16A) - Fehlerstromschutz
- **LS-Schalter** (16A, Charakteristik B) - Überlastschutz

### Steuerungen
- **Zeitschaltuhr** (Digital, 16A) - Tages-/Wochenprogramm
- **Dämmerungsschalter** (10A, 2-200 Lux) - Automatische Tag/Nacht-Steuerung

### Transformatoren
- **Trafo 12V** (230V→12V DC, 40W) - Für 12V LED-Module
- **Trafo 24V** (230V→24V DC, 60W) - Für 24V LED-Module

### LED-Module
- **LED-Modul 12V** (3,5W, Warmweiß) - Niedervolt-Beleuchtung
- **LED-Modul 24V** (5W, Warmweiß) - Höhere Leistung

## 🚀 Schnellstart

1. **Lokaler Server starten:**
   ```bash
   python3 -m http.server 8000
   ```

2. **Browser öffnen:** `http://localhost:8000`

3. **Bauteile verwenden:**
   - Hover über Bauteile → Technische Daten anzeigen
   - Info-Button (i) → Bedienungsanleitung
   - Hauptschalter → System ein/ausschalten

## 🔧 Technische Details

### Architektur
- **CircuitGraph**: Graph-basierte Schaltungsanalyse
- **PhysicsEngine**: Realistische Elektronik-Berechnung
- **ComponentStateMachine**: Intelligente Bauteil-Zustände
- **RealtimeSimulation**: Live-Updates der Schaltung

### Browser-Kompatibilität
- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## 🎯 Lernziele

Das Spiel vermittelt folgende Konzepte:
- **Elektronik-Grundlagen**: Spannung, Strom, Leistung
- **Sicherheitstechnik**: Schutzschalter und ihre Funktion
- **LED-Technik**: Transformatoren und Niedervolt-Systeme
- **Schaltungsdesign**: Planung und Aufbau von Installationen
- **Fehleranalyse**: Systematisches Debugging

## 📁 Projektstruktur

```
Werbeanlage/
├── index.html          # Hauptanwendung
├── LICENSE             # Creative Commons BY-NC-SA 4.0
└── README.md           # Diese Datei
```

## 🤝 Entwicklung

Das Projekt verwendet:
- **Vanilla JavaScript** - Keine externen Dependencies
- **CSS3 Design System** - Konsistente Typographie und Farben
- **SVG Grafiken** - Skalierbare Icons und Verbindungen
- **HTML5 Canvas** - Für erweiterte Visualisierungen

## 📄 Lizenz

Dieses Projekt steht unter der **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License**.

### Das bedeutet:
- ✅ **Teilen** - Kopieren und weiterverbreiten erlaubt
- ✅ **Anpassen** - Remix und Weiterentwicklung erlaubt
- ⚠️ **Namensnennung** - Autor muss genannt werden
- ❌ **Nicht-kommerziell** - Keine kommerzielle Nutzung
- 🔄 **Weitergabe unter gleichen Bedingungen** - Ableitungen unter gleicher Lizenz

**Vollständige Lizenz:** https://creativecommons.org/licenses/by-nc-sa/4.0/

## ✨ Credits

Entwickelt als interaktives Lernwerkzeug für LED-Beleuchtungstechnik.  
Inspiriert von praktischen Elektronik-Workshops und modernen Web-Technologien.

---

**Viel Spaß beim Lernen und Experimentieren!** ⚡🔬