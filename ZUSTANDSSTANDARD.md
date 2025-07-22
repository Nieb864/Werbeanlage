# 🎭 ZUSTANDSSTANDARD C

## Übersicht
Jedes Bauteil kann verschiedene Zustände annehmen, die visuell dargestellt und in der Simulation berücksichtigt werden.

## 🔄 Universelle Zustände (für alle Bauteile)

### **OFF (Aus)**
- **Beschreibung:** Bauteil ist stromlos/inaktiv
- **Visuell:** Standardfarben, keine besonderen Effekte
- **CSS-Klasse:** `.state-off`
- **Auslöser:** `voltage === 0` oder keine Verbindung

### **BROKEN (Defekt)**
- **Beschreibung:** Bauteil ist kaputt/funktionsunfähig
- **Visuell:** Dunkle Farben (#1a1a1a), keine Funktion
- **CSS-Klasse:** `.state-broken`
- **Auslöser:** Überlastung, falsche Spannung, mechanischer Defekt

## ⚡ Verbraucher-Zustände (LEDs, Motoren, etc.)

### **ON (An)**
- **Beschreibung:** Bauteil funktioniert normal
- **Visuell:** Helle Farben (#ffff00), ggf. Glow-Effekt
- **CSS-Klasse:** `.state-on`
- **Auslöser:** `voltage === targetVoltage`

### **BLINKING (Blinkend)**
- **Beschreibung:** Instabile Stromversorgung
- **Visuell:** Blinkt zwischen hell/dunkel, starker Glow
- **CSS-Klasse:** `.state-blinking`
- **Auslöser:** Unsteady voltage, schlechte Verbindungen

### **OVERLOADED (Überlastet)**
- **Beschreibung:** Zu hohe Spannung/Leistung
- **Visuell:** Pinke Farbe (#e91e63) als Warnung
- **CSS-Klasse:** `.state-overloaded`
- **Auslöser:** `voltage > maxVoltage` oder `power > maxPower`
- **Hinweis:** Bei LEDs → wird zu BROKEN (Trafo gibt vorher auf)

## 🔌 Durchleitungs-Zustände (Kabel, Klemmen)

### **OPEN (Offen/Unterbrochen)**
- **Beschreibung:** Verbindung ist unterbrochen
- **Visuell:** Gestrichelte Linien, rötliche Färbung
- **CSS-Klasse:** `.state-open`
- **Auslöser:** Mechanische Unterbrechung, lockere Verbindung
- **Resistance:** `999999` (sehr hoch)

### **CLOSED (Geschlossen/Durchgeschaltet)**
- **Beschreibung:** Verbindung funktioniert normal
- **Visuell:** Normale Darstellung
- **CSS-Klasse:** `.state-closed` (default)
- **Auslöser:** Normale Funktion
- **Resistance:** `0.1` (sehr niedrig)

## 🔄 Schalter-Zustände

### **OPEN (Offen)**
- **Beschreibung:** Schalter ist geöffnet, Strom unterbrochen
- **Visuell:** SVG zeigt offenen Kontakt
- **CSS-Klasse:** `.state-open`
- **Resistance:** `999999`

### **CLOSED (Geschlossen)**
- **Beschreibung:** Schalter ist geschlossen, Strom fließt
- **Visuell:** SVG zeigt geschlossenen Kontakt
- **CSS-Klasse:** `.state-closed`
- **Resistance:** `0.1`

## ⚡ Transformator-Zustände

### **OFF (Aus)**
- **Beschreibung:** Keine Eingangsspannung
- **Visuell:** Keine besonderen Effekte
- **Auslöser:** `inputVoltage === 0`

### **ON (Normal)**
- **Beschreibung:** Arbeitet im Normalbetrieb
- **Visuell:** Evtl. subtile Aktivitätsanzeige
- **Auslöser:** `inputVoltage === 230V` und Last im Rahmen

### **OVERLOADED (Überlastet)**
- **Beschreibung:** Zu hohe Last am Ausgang
- **Visuell:** Warnfarbe (gelb/orange)
- **Auslöser:** `outputPower > maxPower`

### **BROKEN (Defekt)**
- **Beschreibung:** Trafo ist durch Überlastung kaputt
- **Visuell:** Dunkle Farben, Rauch-Effekt?
- **Auslöser:** Längere Überlastung → setState(ComponentStates.BROKEN)

## 🔋 Power Source-Zustände

### **ON (Aktiv)**
- **Beschreibung:** Liefert Spannung
- **Visuell:** Normale Darstellung, evtl. grüne Anzeige
- **Default:** Immer an (außer explizit ausgeschaltet)

### **OFF (Aus)**
- **Beschreibung:** Keine Spannungslieferung
- **Visuell:** Grau, keine Ausgangsspannung
- **Auslöser:** User-Schalter, Überlastschutz

## 🎯 Implementierung pro Bauteil-Typ

| Bauteil-Typ | Verfügbare Zustände | Default | Implementiert |
|-------------|---------------------|---------|---------------|
| **LED 12V/24V** | OFF, ON, BLINKING, OVERLOADED, BROKEN | OFF | ✅ |
| **Trafo** | OFF, ON, OVERLOADED, BROKEN | OFF | ✅ |
| **Kabel** | CLOSED, OPEN, BROKEN | CLOSED | ⏳ TODO |
| **Klemme** | CLOSED, OPEN, BROKEN | CLOSED | ⏳ TODO |
| **Schalter** | OPEN, CLOSED | OPEN | ⏳ TODO |
| **Power Source** | ON, OFF | ON | ⏳ TODO |

## 📝 Standard-Attribute für neue Bauteile

```javascript
// Für alle Bauteile
svg.setAttribute('data-available-states', JSON.stringify(['off', 'broken']));
svg.setAttribute('data-default-state', 'off');

// Für Verbraucher (LEDs, Motoren)
svg.setAttribute('data-available-states', JSON.stringify(['off', 'on', 'blinking', 'overloaded', 'broken']));

// Für Durchleiter (Kabel, Klemmen)  
svg.setAttribute('data-available-states', JSON.stringify(['closed', 'open', 'broken']));
svg.setAttribute('data-default-state', 'closed');

// Für Schalter
svg.setAttribute('data-available-states', JSON.stringify(['open', 'closed']));
svg.setAttribute('data-switchable', 'true'); // User kann klicken
svg.setAttribute('data-default-state', 'open');

// Für Transformatoren
svg.setAttribute('data-available-states', JSON.stringify(['off', 'on', 'overloaded', 'broken']));
```

## 🎨 CSS-Implementierung

Alle Zustände werden über CSS-Klassen gesteuert:
```css
.state-off .led12-center,
.state-off .led24-center { fill: #ddd !important; }

.state-on .led12-center,  
.state-on .led24-center { fill: #ffff00 !important; }

.state-broken .led12-center,
.state-broken .led24-center { fill: #1a1a1a !important; }

.state-open .cable-wire { stroke-dasharray: 5,5; stroke: #ff6b6b; }
.state-closed .cable-wire { stroke-dasharray: none; stroke: var(--wire-black); }
```

## 🐛 Debug-Feature: Stromfluss-Anzeige (optional)

**Konzept:** Animierte Visualisierung des Stromflusses
- **Für Lehrer:** Debugging-Tool (standardmäßig AN)
- **Für Schüler:** Abschaltbar (sollen selbst denken)
- **Implementierung:** Animierte Partikel/Farbverläufe entlang Bezier-Kurven

**Steuerung:**
```javascript
// Globaler Schalter
window.SHOW_CURRENT_FLOW = false; // Für Schüler-Modus
```

## ✅ Nächste Schritte

1. **Kabel & Klemmen:** open/closed/broken Zustände implementieren
2. **Schalter:** SVGs für open/closed + Klick-Funktionalität  
3. **Power Source:** on/off Zustand + User-Schalter
4. **Stromfluss-Debug:** Optionale Visualisierung
5. **State-Trigger:** Bedingungen definieren wann Zustandswechsel