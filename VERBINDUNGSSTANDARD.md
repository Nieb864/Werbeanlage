# 🔌 VERBINDUNGSTYP-STANDARD B

## Übersicht
Jedes Bauteil definiert sein Verbindungsverhalten für die korrekte Simulation.

## 🔄 Verbindungstypen

### **PASS-THROUGH (Durchleitung)**
- **Verhalten:** Strom fließt bidirectional durch das Bauteil
- **Beispiele:** Kabel, Schalter (geschlossen)
- **Attribute:**
  ```javascript
  svg.setAttribute('data-connection-behavior', 'pass-through');
  svg.setAttribute('data-voltage-level', '24V-DC');
  svg.setAttribute('data-internal-routing', JSON.stringify([
      {"from":"out-left", "to":"out-right", "resistance":0.1}
  ]));
  ```

### **BRIDGE (Brückenschaltung)**
- **Verhalten:** Alle Anschlüsse sind miteinander verbunden
- **Beispiele:** Klemmen, Verteilerdosen
- **Attribute:**
  ```javascript
  svg.setAttribute('data-connection-behavior', 'bridge');
  svg.setAttribute('data-voltage-level', '230V-AC');
  svg.setAttribute('data-internal-routing', JSON.stringify([
      {"from":"terminal-1", "to":"terminal-2", "resistance":0.05},
      {"from":"terminal-1", "to":"terminal-3", "resistance":0.05},
      {"from":"terminal-2", "to":"terminal-3", "resistance":0.05}
  ]));
  ```

### **TRANSFORM (Transformation)**
- **Verhalten:** Wandelt Spannungsebene (Input → Output elektrisch getrennt)
- **Beispiele:** Trafos, Netzteile, DC-DC Wandler
- **Attribute:**
  ```javascript
  svg.setAttribute('data-connection-behavior', 'transform');
  svg.setAttribute('data-input-voltage', '230V-AC');
  svg.setAttribute('data-output-voltage', '12V-DC');
  svg.setAttribute('data-internal-routing', JSON.stringify([
      {"from":"in-phase", "to":"out-plus", "resistance":0.02, "efficiency":0.87},
      {"from":"in-neutral", "to":"out-minus", "resistance":0.02, "efficiency":0.87}
  ]));
  ```

### **LOAD (Verbraucher)**
- **Verhalten:** Verbraucht Strom zwischen Plus/Minus
- **Beispiele:** LEDs, Motoren, Widerstände
- **Attribute:**
  ```javascript
  svg.setAttribute('data-connection-behavior', 'load');
  svg.setAttribute('data-voltage-level', '12V-DC');
  svg.setAttribute('data-component-load', JSON.stringify({
      "between": ["in-plus", "in-minus"],
      "power": 1.2,
      "voltage": 12,
      "type": "led"
  }));
  ```

### **SOURCE (Quelle)**
- **Verhalten:** Liefert Spannung/Strom
- **Beispiele:** Netzteil-Ausgänge, Batterien
- **Attribute:**
  ```javascript
  svg.setAttribute('data-connection-behavior', 'source');
  svg.setAttribute('data-voltage-level', '230V-AC');
  svg.setAttribute('data-power-rating', '3000'); // 3kW
  ```

## ⚡ Spannungsebenen

### **230V-AC (Netzspannung)**
- **Anschlüsse:** `L1` (Phase), `N` (Neutral), `PE` (Schutzleiter)
- **Farben:** Braun/Schwarz, Blau, Grün/Gelb
- **Simulation:** `voltage: 230, type: "ac"`

### **12V-DC (LED niedrig)**
- **Anschlüsse:** `12V+`, `12V-` oder `+`, `-`
- **Farben:** Rot (+), Schwarz (-)
- **Simulation:** `voltage: 12, type: "dc"`

### **24V-DC (LED standard)**
- **Anschlüsse:** `24V+`, `24V-`
- **Farben:** Rot (+), Blau (-)
- **Simulation:** `voltage: 24, type: "dc"`

## 🎯 Implementierte Bauteile

| Bauteil | Verhalten | Spannungsebene | Status |
|---------|-----------|----------------|--------|
| Kabel flexibel | `pass-through` | `24V-DC` | ✅ |
| Mobile Klemme | `bridge` | `230V-AC` | ✅ |
| Trafo 12V | `transform` | `230V-AC → 12V-DC` | ✅ |
| LED 12V | `load` | `12V-DC` | ✅ |
| LED 24V | `load` | `24V-DC` | ✅ |
| Power Source | `source` | `230V-AC` | ✅ |

## 📝 Checklist für neue Bauteile

1. **SVG-Erstellung** (Illustrator → angepasste Farben/Linien)
2. **Anschlusspunkte** (präzise platziert mit Bezier-Daten)
3. **Verbindungstyp definieren:**
   - `data-connection-behavior`
   - `data-voltage-level` (oder input/output)
   - `data-internal-routing`
4. **Drag & Drop Info** (Name, Beschreibung)
5. **Technisches Datenblatt** (Specs, Schaltskizze)
6. **Physics Engine Integration** (Simulation, Fehlererkennung)
7. **Versionsnummer incrementieren**
8. **Online testen**