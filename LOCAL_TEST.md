# 🚀 Lokaler Test - Sofort spielbar!

## Windows:
1. Alle Dateien in einen Ordner downloaden
2. `index.html` doppelklicken
3. Falls nicht funktioniert: PowerShell öffnen, zu Ordner navigieren:
   ```
   python -m http.server 8000
   ```
4. Browser: http://localhost:8000

## Mac/Linux:
1. Terminal öffnen, zu Projekt-Ordner navigieren
2. Starten:
   ```bash
   python3 -m http.server 8000
   # ODER
   npx http-server
   ```
3. Browser: http://localhost:8000

## Ohne Server:
- `test-werbetechnik.html` direkt öffnen
- Zeigt alle Komponenten und verlinkt zum Spiel

## 🎯 Test-Reihenfolge:
1. `test-werbetechnik.html` - Basis-Test
2. `index.html` - Hauptspiel (12V)  
3. `werbetechnik.html` - 230V Werbetechnik

## Debug:
F12 → Console für Fehlermeldungen