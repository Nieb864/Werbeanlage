# 🚀 Werbetechnik-Spiel SOFORT testen!

## ⚡ Schnellster Test (2 Minuten):

### Schritt 1: Herunterladen
- Alle Dateien des Projekts in einen Ordner (z.B. `werbetechnik-spiel`)
- ODER: GitHub Repository als ZIP herunterladen

### Schritt 2: Webserver starten
**Windows PowerShell / Mac Terminal / Linux Terminal:**
```bash
cd /pfad/zu/deinem/ordner
python3 -m http.server 8000
```

**Alternative (Node.js):**
```bash
npx http-server
```

### Schritt 3: Spielen! 
1. Browser: **http://localhost:8000**
2. Klick auf **"Werbetechnik spielen →"**
3. Level 1 auswählen 
4. **Drag & Drop** die 230V-Komponenten!

---

## 🎯 Was passiert im Spiel:

### Level 1: Grundschaltung 230V
1. **230V Stromquelle** ziehen (rot mit L/N/PE)
2. **LS-Schalter** + **FI-Schalter** hinzufügen (PFLICHT!)
3. **Trafo 12V** für Spannungswandlung
4. **LED 12V Module** anschließen
5. **Verkabelung**: Auf grüne Punkte klicken zum Verbinden
6. **"Simulation starten"** → **"Lösung prüfen"**

### Realistische Features:
- ⚠️ **Ohne Schutzschalter**: Installation wird abgelehnt!  
- 🔥 **Trafo überlastet**: Mehr als 60W = Trafo kaputt
- ⚡ **Falsche Spannung**: 12V LED an 24V = blinkt, an 230V = schwarz
- 🌙 **Automatik**: Dämmerungsschalter, Zeitschaltuhren

---

## 🛠️ Falls Probleme:

### Browser-Console öffnen (F12):
- Sollte zeigen: `✅ WerbetechnikLevels verfügbar: 4 Level`
- Bei Fehlern: Screenshot der Console senden

### Häufige Lösungen:
- **File:// funktioniert nicht** → Webserver nutzen (siehe oben)
- **Komponenten laden nicht** → Cache leeren (Strg+F5)
- **Verkabelung geht nicht** → JavaScript aktiviert?

---

## 🎮 GitHub Pages Update:
```bash
git add .
git commit -m "Werbetechnik hinzugefügt - 230V Profispiel"
git push origin main
```
→ Dann unter: **https://nieb864.github.io/werbeanlage**

---

**Das Spiel ist SOFORT spielbar!** 🎉  
Alle 230V Werbetechnik-Features sind implementiert und funktionsfähig!