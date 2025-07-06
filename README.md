# ⚡ Elektronik Lernspiel

Ein webbasiertes interaktives Lernspiel für Elektronik-Grundlagen. Lerne durch praktisches Experimentieren mit elektronischen Bauteilen und Schaltkreisen!

## 🎯 Features

- **Drag & Drop Interface**: Intuitive Platzierung von elektronischen Bauteilen
- **Bezier-Kabel**: Realistische Verkabelung mit mehreren Adern
- **Schaltkreis-Simulation**: Echte Elektronik-Simulation mit Spannungen und Strömen
- **Progressives Level-System**: Von einfachen bis komplexen Schaltungen
- **Visuelles Feedback**: LEDs leuchten auf, Funken bei Überlastung
- **Keine Anmeldung**: Direkt spielen ohne Registrierung
- **Responsive Design**: Funktioniert auf Desktop und Mobile

## 🚀 Schnellstart

1. Öffne `index.html` in einem modernen Webbrowser
2. Wähle ein Level aus der Startseite
3. Ziehe Bauteile aus der Palette in das Spielfeld
4. Verbinde sie mit Kabeln durch Klicken auf die Verbindungspunkte
5. Teste deine Schaltung mit dem "Schaltung testen" Button

## 🎮 Spielanleitung

### Grundlagen

- **Bauteile platzieren**: Ziehe Komponenten aus der linken Palette auf das Spielfeld
- **Verkabelung**: Klicke auf grüne Verbindungspunkte, um Kabel zu ziehen
- **Testen**: Nutze den "Schaltung testen" Button, um deine Lösung zu überprüfen
- **Reset**: Setze das Level mit dem "Zurücksetzen" Button zurück

### Bauteile

- 🔋 **Batterie**: Stromquelle (9V), hat Plus- und Minus-Pol
- 💡 **LED**: Leuchtet bei richtiger Polung und ausreichend Strom
- 🔧 **Widerstand**: Begrenzt den Strom (220Ω Standard)
- 🔘 **Schalter**: Steuert den Stromfluss (Ein/Aus)

### Feedback-System

- ✅ **Grün leuchtend**: Komponente funktioniert korrekt
- ⚠️ **Gelb**: Komponente hat ein Problem (z.B. falsche Polung)
- ❌ **Rot blinkend**: Komponente zerstört durch Überlastung
- 💥 **Funken**: Kritischer Fehler in der Schaltung

## 📚 Level

### Level 1: Einfache LED-Schaltung
Lerne die Grundlagen eines Stromkreises durch Verbindung einer LED mit einer Batterie über einen Widerstand.

### Level 2: Parallel-Schaltung  
Baue eine Parallelschaltung mit zwei LEDs und verstehe Stromverteilung.

### Level 3: Schalter-Steuerung
Erweitere Schaltungen um Schalter für manuelle Kontrolle.

### Level 4: Komplexe Schaltung
Meistere fortgeschrittene Schaltungen mit mehreren unabhängigen Stromkreisen.

## 🛠️ Technische Details

### Architektur

Das Spiel besteht aus mehreren modularen Systemen:

- **LevelSystem** (`js/levels.js`): Level-Definitionen und Progression
- **DragDropSystem** (`js/dragdrop.js`): Bauteil-Platzierung und -Bewegung  
- **WiringSystem** (`js/wiring.js`): Bezier-Kabel und Verbindungen
- **CircuitSystem** (`js/circuit.js`): Elektronik-Simulation
- **FeedbackSystem** (`js/feedback.js`): Ergebnis-Anzeige und Effekte
- **GameController** (`js/game.js`): Koordiniert alle Systeme

### Technologien

- **HTML5 Canvas**: Für Kabel-Rendering und Interaktionen
- **Vanilla JavaScript**: Keine externen Dependencies
- **CSS3**: Moderne Styles mit Animationen und Gradients
- **Responsive Design**: Mobile-first Ansatz

### Browser-Kompatibilität

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## 🎨 Anpassung

### Neue Level hinzufügen

Bearbeite `js/levels.js` und füge neue Level-Objekte hinzu:

```javascript
{
    id: 5,
    title: "Mein neues Level",
    icon: "🔬",
    difficulty: "medium",
    description: "Beschreibung des Levels",
    taskDescription: "Was der Spieler tun soll",
    components: [
        { type: "battery", name: "Batterie", image: "assets/battery.png", count: 1 },
        // weitere Komponenten...
    ],
    solution: [
        { from: { component: "battery", connection: "positive" }, 
          to: { component: "led", connection: "anode" } },
        // weitere Verbindungen...
    ],
    feedback: {
        success: "Nachricht bei Erfolg",
        error: "Nachricht bei Fehler"
    }
}
```

### Neue Bauteile hinzufügen

1. Definiere das Bauteil in `GameLevels.getComponentDefinition()` 
2. Füge Simulationslogik in `CircuitSystem` hinzu
3. Erstelle ein entsprechendes PNG-Bild im `assets/` Ordner

### Styling anpassen

Hauptstyles in `css/styles.css` und Spiel-spezifische Styles in `css/game.css`.

## 📁 Projektstruktur

```
elektronik-lernspiel/
├── index.html              # Startseite mit Level-Auswahl
├── game.html               # Hauptspielseite
├── css/
│   ├── styles.css          # Allgemeine Styles
│   └── game.css            # Spiel-spezifische Styles
├── js/
│   ├── main.js             # Startseiten-Logik
│   ├── levels.js           # Level-Definitionen
│   ├── dragdrop.js         # Drag & Drop System
│   ├── wiring.js           # Verkabelungssystem
│   ├── circuit.js          # Schaltkreis-Simulation
│   ├── feedback.js         # Feedback-System
│   └── game.js             # Hauptspiel-Controller
├── assets/
│   ├── battery.png         # Batterie-Bild
│   ├── led.png             # LED-Bild
│   ├── resistor.png        # Widerstand-Bild
│   └── switch.png          # Schalter-Bild
└── README.md
```

## 🔧 Entwicklung

### Lokale Entwicklung

1. Klone das Repository
2. Öffne `index.html` in einem Webserver (nicht file://)
3. Für Live-Reload nutze einen Development Server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js
   npx http-server
   ```

### Debug-Modus

Füge `?debug=true` zur URL hinzu für zusätzliche Console-Logs:
```
http://localhost:8000/game.html?level=1&debug=true
```

### Keyboard-Shortcuts

- `Strg/Cmd + Enter`: Schaltung testen
- `Strg/Cmd + R`: Level zurücksetzen  
- `Escape`: Feedback schließen / Verkabelung abbrechen

## 🎓 Pädagogischer Wert

Das Spiel vermittelt folgende Konzepte:

- **Grundlagen der Elektronik**: Strom, Spannung, Widerstand
- **Schaltkreis-Design**: Serie vs. Parallel, Stromfluss
- **Problemlösung**: Systematisches Debugging von Schaltungen
- **Sicherheit**: Folgen von Überlastung und falscher Verkabelung

## 🤝 Beitragen

Verbesserungen sind willkommen! Mögliche Bereiche:

- Neue Level und Aufgaben
- Zusätzliche elektronische Bauteile
- Erweiterte Simulation (Kondensatoren, Transistoren)
- Bessere Visualisierungen und Animationen
- Internationalisierung

## 📄 Lizenz

Dieses Projekt steht unter der MIT-Lizenz. Siehe `LICENSE` für Details.

## ✨ Credits

Entwickelt als interaktives Lernwerkzeug für Elektronik-Grundlagen. Inspiriert von physischen Elektronik-Baukästen und modernen Web-Technologien.

---

Viel Spaß beim Lernen und Experimentieren! ⚡🔬