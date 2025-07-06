// Werbetechnik Level-Definitionen für 230V Systeme

const WerbetechnikLevels = {
    levels: [
        {
            id: 1,
            title: "Grundschaltung 230V",
            icon: "🔌",
            difficulty: "easy",
            description: "Lerne die Grundlagen einer 230V Werbetechnik-Installation mit Schutzschaltern.",
            taskDescription: "Verbinde eine 12V LED-Kette über einen Trafo mit der 230V Stromversorgung. Vergiss nicht die Schutzschalter!",
            components: [
                { type: "power230v", name: "230V Stromquelle", image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA4MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iNjAiIGhlaWdodD0iNDAiIGZpbGw9IiNGRjAwMDAiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxyZWN0IHg9IjUiIHk9IjIwIiB3aWR0aD0iNSIgaGVpZ2h0PSI2IiBmaWxsPSIjMDAwIi8+CjxyZWN0IHg9IjUiIHk9IjMwIiB3aWR0aD0iNSIgaGVpZ2h0PSI2IiBmaWxsPSIjMDA3QkZGIi8+CjxyZWN0IHg9IjUiIHk9IjQwIiB3aWR0aD0iNSIgaGVpZ2h0PSI2IiBmaWxsPSIjRkZGRjAwIi8+Cjx0ZXh0IHg9IjE1IiB5PSIzMCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI0ZGRiI+MjMwVjwvdGV4dD4KPHRleHQgeD0iMTAiIHk9IjU1IiBmb250LXNpemU9IjYiIGZpbGw9IiMzMzMiPkwgTiBQRTwvdGV4dD4KPC9zdmc+", count: 1, connections: ["phase", "neutral", "earth"] },
                { type: "ls_switch", name: "LS-Schalter", image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA0MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iNSIgeT0iNSIgd2lkdGg9IjMwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjhGOUZBIiBzdHJva2U9IiMzMzMiLz4KPHJlY3QgeD0iMTUiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTUiIGZpbGw9IiMyOGE3NDUiLz4KPGNpcmNsZSBjeD0iMTAiIGN5PSI0NSIgcj0iMiIgZmlsbD0iIzMzMyIvPgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjQ1IiByPSIyIiBmaWxsPSIjMzMzIi8+Cjx0ZXh0IHg9IjgiIHk9IjM1IiBmb250LXNpemU9IjgiIGZpbGw9IiMzMzMiPkMxNjwvdGV4dD4KPC9zdmc+", count: 1, connections: ["input", "output"], rating: 16 },
                { type: "fi_switch", name: "FI-Schalter", image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA0MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iNSIgeT0iNSIgd2lkdGg9IjMwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjhGOUZBIiBzdHJva2U9IiMzMzMiLz4KPHJlY3QgeD0iMTIiIHk9IjEwIiB3aWR0aD0iMTYiIGhlaWdodD0iMTUiIGZpbGw9IiNGRjAwMDAiLz4KPGNpcmNsZSBjeD0iOCIgY3k9IjQ1IiByPSIyIiBmaWxsPSIjMzMzIi8+CjxjaXJjbGUgY3g9IjIwIiBjeT0iNDUiIHI9IjIiIGZpbGw9IiMzMzMiLz4KPGNpcmNsZSBjeD0iMzIiIGN5PSI0NSIgcj0iMiIgZmlsbD0iIzMzMyIvPgo8dGV4dCB4PSI4IiB5PSIzNSIgZm9udC1zaXplPSI2IiBmaWxsPSIjMzMzIj4zMG1BPC90ZXh0Pgo8L3N2Zz4=", count: 1, connections: ["phase_in", "neutral_in", "phase_out", "neutral_out"], rating: 30 },
                { type: "trafo_12v", name: "Trafo 12V", image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA2MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iNDAiIGhlaWdodD0iMjAiIGZpbGw9IiM2Yzc1N2QiIHN0cm9rZT0iIzMzMyIvPgo8Y2lyY2xlIGN4PSI4IiBjeT0iMTUiIHI9IjIiIGZpbGw9IiMzMzMiLz4KPGNpcmNsZSBjeD0iOCIgY3k9IjI1IiByPSIyIiBmaWxsPSIjMzMzIi8+CjxjaXJjbGUgY3g9IjUyIiBjeT0iMTUiIHI9IjIiIGZpbGw9IiNGRjAwMDAiLz4KPGNpcmNsZSBjeD0iNTIiIGN5PSIyNSIgcj0iMiIgZmlsbD0iIzAwMCIvPgo8dGV4dCB4PSIyMCIgeT0iMjIiIGZvbnQtc2l6ZT0iOCIgZmlsbD0iI0ZGRiI+MTJWPC90ZXh0Pgo8dGV4dCB4PSIyMCIgeT0iMzUiIGZvbnQtc2l6ZT0iNiIgZmlsbD0iIzMzMyI+NjBXPC90ZXh0Pgo8L3N2Zz4=", count: 1, connections: ["ac_in1", "ac_in2", "dc_plus", "dc_minus"], power: 60, voltage_out: 12 },
                { type: "led_12v", name: "LED 12V", image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCA0MCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iNSIgeT0iNSIgd2lkdGg9IjMwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjRkZGRjAwIiBzdHJva2U9IiMzMzMiLz4KPGNpcmNsZSBjeD0iMyIgY3k9IjEwIiByPSIyIiBmaWxsPSIjRkYwMDAwIi8+CjxjaXJjbGUgY3g9IjM3IiBjeT0iMTAiIHI9IjIiIGZpbGw9IiMwMDAiLz4KPHRleHQgeD0iMTAiIHk9IjEyIiBmb250LXNpemU9IjYiIGZpbGw9IiMzMzMiPjEyViAzLjVXPC90ZXh0Pgo8L3N2Zz4=", count: 3, connections: ["plus", "minus"], power: 3.5, voltage: 12 }
            ],
            solution: [
                { from: { component: "power230v", connection: "phase" }, to: { component: "ls_switch", connection: "input" } },
                { from: { component: "ls_switch", connection: "output" }, to: { component: "fi_switch", connection: "phase_in" } },
                { from: { component: "power230v", connection: "neutral" }, to: { component: "fi_switch", connection: "neutral_in" } },
                { from: { component: "fi_switch", connection: "phase_out" }, to: { component: "trafo_12v", connection: "ac_in1" } },
                { from: { component: "fi_switch", connection: "neutral_out" }, to: { component: "trafo_12v", connection: "ac_in2" } },
                { from: { component: "trafo_12v", connection: "dc_plus" }, to: { component: "led_12v", connection: "plus", instance: 0 } },
                { from: { component: "trafo_12v", connection: "dc_plus" }, to: { component: "led_12v", connection: "plus", instance: 1 } },
                { from: { component: "trafo_12v", connection: "dc_minus" }, to: { component: "led_12v", connection: "minus", instance: 0 } },
                { from: { component: "trafo_12v", connection: "dc_minus" }, to: { component: "led_12v", connection: "minus", instance: 1 } }
            ],
            expectedResult: "led_12v_on",
            feedback: {
                success: "Perfekt! Die 12V LEDs leuchten und alle Schutzeinrichtungen sind korrekt installiert.",
                overload: "Überlast! Der Trafo ist überlastet und schaltet ab.",
                wrong_voltage: "Falsche Spannung! LEDs an falscher Spannung angeschlossen.",
                no_protection: "Fehlende Sicherung! LS- und FI-Schalter sind erforderlich.",
                incomplete: "Schaltung unvollständig. Prüfe alle Verbindungen."
            }
        },
        {
            id: 2,
            title: "Mischbetrieb 12V/24V",
            icon: "⚡",
            difficulty: "medium",
            description: "Baue eine Werbetechnik-Installation mit zwei verschiedenen Spannungen.",
            taskDescription: "Installiere sowohl 12V als auch 24V LED-Module mit separaten Trafos. Beachte die Leistungsgrenzen!",
            components: [
                { type: "power230v", name: "230V Stromquelle", image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA4MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iNjAiIGhlaWdodD0iNDAiIGZpbGw9IiNGRjAwMDAiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxyZWN0IHg9IjUiIHk9IjIwIiB3aWR0aD0iNSIgaGVpZ2h0PSI2IiBmaWxsPSIjMDAwIi8+CjxyZWN0IHg9IjUiIHk9IjMwIiB3aWR0aD0iNSIgaGVpZ2h0PSI2IiBmaWxsPSIjMDA3QkZGIi8+CjxyZWN0IHg9IjUiIHk9IjQwIiB3aWR0aD0iNSIgaGVpZ2h0PSI2IiBmaWxsPSIjRkZGRjAwIi8+Cjx0ZXh0IHg9IjE1IiB5PSIzMCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI0ZGRiI+MjMwVjwvdGV4dD4KPHRleHQgeD0iMTAiIHk9IjU1IiBmb250LXNpemU9IjYiIGZpbGw9IiMzMzMiPkwgTiBQRTwvdGV4dD4KPC9zdmc+", count: 1, connections: ["phase", "neutral", "earth"] },
                { type: "ls_switch", name: "LS-Schalter", image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA0MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iNSIgeT0iNSIgd2lkdGg9IjMwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjhGOUZBIiBzdHJva2U9IiMzMzMiLz4KPHJlY3QgeD0iMTUiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTUiIGZpbGw9IiMyOGE3NDUiLz4KPGNpcmNsZSBjeD0iMTAiIGN5PSI0NSIgcj0iMiIgZmlsbD0iIzMzMyIvPgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjQ1IiByPSIyIiBmaWxsPSIjMzMzIi8+Cjx0ZXh0IHg9IjgiIHk9IjM1IiBmb250LXNpemU9IjgiIGZpbGw9IiMzMzMiPkMxNjwvdGV4dD4KPC9zdmc+", count: 1, connections: ["input", "output"], rating: 16 },
                { type: "fi_switch", name: "FI-Schalter", image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA0MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iNSIgeT0iNSIgd2lkdGg9IjMwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjhGOUZBIiBzdHJva2U9IiMzMzMiLz4KPHJlY3QgeD0iMTIiIHk9IjEwIiB3aWR0aD0iMTYiIGhlaWdodD0iMTUiIGZpbGw9IiNGRjAwMDAiLz4KPGNpcmNsZSBjeD0iOCIgY3k9IjQ1IiByPSIyIiBmaWxsPSIjMzMzIi8+CjxjaXJjbGUgY3g9IjIwIiBjeT0iNDUiIHI9IjIiIGZpbGw9IiMzMzMiLz4KPGNpcmNsZSBjeD0iMzIiIGN5PSI0NSIgcj0iMiIgZmlsbD0iIzMzMyIvPgo8dGV4dCB4PSI4IiB5PSIzNSIgZm9udC1zaXplPSI2IiBmaWxsPSIjMzMzIj4zMG1BPC90ZXh0Pgo8L3N2Zz4=", count: 1, connections: ["phase_in", "neutral_in", "phase_out", "neutral_out"], rating: 30 },
                { type: "trafo_12v", name: "Trafo 12V", image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA2MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iNDAiIGhlaWdodD0iMjAiIGZpbGw9IiM2Yzc1N2QiIHN0cm9rZT0iIzMzMyIvPgo8Y2lyY2xlIGN4PSI4IiBjeT0iMTUiIHI9IjIiIGZpbGw9IiMzMzMiLz4KPGNpcmNsZSBjeD0iOCIgY3k9IjI1IiByPSIyIiBmaWxsPSIjMzMzIi8+CjxjaXJjbGUgY3g9IjUyIiBjeT0iMTUiIHI9IjIiIGZpbGw9IiNGRjAwMDAiLz4KPGNpcmNsZSBjeD0iNTIiIGN5PSIyNSIgcj0iMiIgZmlsbD0iIzAwMCIvPgo8dGV4dCB4PSIyMCIgeT0iMjIiIGZvbnQtc2l6ZT0iOCIgZmlsbD0iI0ZGRiI+MTJWPC90ZXh0Pgo8dGV4dCB4PSIyMCIgeT0iMzUiIGZvbnQtc2l6ZT0iNiIgZmlsbD0iIzMzMyI+NjBXPC90ZXh0Pgo8L3N2Zz4=", count: 1, connections: ["ac_in1", "ac_in2", "dc_plus", "dc_minus"], power: 60, voltage_out: 12 },
                { type: "trafo_24v", name: "Trafo 24V", image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA2MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iNDAiIGhlaWdodD0iMjAiIGZpbGw9IiM2Yzc1N2QiIHN0cm9rZT0iIzMzMyIvPgo8Y2lyY2xlIGN4PSI4IiBjeT0iMTUiIHI9IjIiIGZpbGw9IiMzMzMiLz4KPGNpcmNsZSBjeD0iOCIgY3k9IjI1IiByPSIyIiBmaWxsPSIjMzMzIi8+CjxjaXJjbGUgY3g9IjUyIiBjeT0iMTUiIHI9IjIiIGZpbGw9IiNGRjAwMDAiLz4KPGNpcmNsZSBjeD0iNTIiIGN5PSIyNSIgcj0iMiIgZmlsbD0iIzAwMCIvPgo8dGV4dCB4PSIyMCIgeT0iMjIiIGZvbnQtc2l6ZT0iOCIgZmlsbD0iI0ZGRiI+MjRWPC90ZXh0Pgo8dGV4dCB4PSIyMCIgeT0iMzUiIGZvbnQtc2l6ZT0iNiIgZmlsbD0iIzMzMyI+ODBXPC90ZXh0Pgo8L3N2Zz4=", count: 1, connections: ["ac_in1", "ac_in2", "dc_plus", "dc_minus"], power: 80, voltage_out: 24 },
                { type: "led_12v", name: "LED 12V", image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCA0MCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iNSIgeT0iNSIgd2lkdGg9IjMwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjRkZGRjAwIiBzdHJva2U9IiMzMzMiLz4KPGNpcmNsZSBjeD0iMyIgY3k9IjEwIiByPSIyIiBmaWxsPSIjRkYwMDAwIi8+CjxjaXJjbGUgY3g9IjM3IiBjeT0iMTAiIHI9IjIiIGZpbGw9IiMwMDAiLz4KPHRleHQgeD0iMTAiIHk9IjEyIiBmb250LXNpemU9IjYiIGZpbGw9IiMzMzMiPjEyViAzLjVXPC90ZXh0Pgo8L3N2Zz4=", count: 2, connections: ["plus", "minus"], power: 3.5, voltage: 12 },
                { type: "led_24v", name: "LED 24V", image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCA0MCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iNSIgeT0iNSIgd2lkdGg9IjMwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjMDBGRkZGIiBzdHJva2U9IiMzMzMiLz4KPGNpcmNsZSBjeD0iMyIgY3k9IjEwIiByPSIyIiBmaWxsPSIjRkYwMDAwIi8+CjxjaXJjbGUgY3g9IjM3IiBjeT0iMTAiIHI9IjIiIGZpbGw9IiMwMDAiLz4KPHRleHQgeD0iMTAiIHk9IjEyIiBmb250LXNpemU9IjYiIGZpbGw9IiMzMzMiPjI0ViA0LjVXPC90ZXh0Pgo8L3N2Zz4=", count: 2, connections: ["plus", "minus"], power: 4.5, voltage: 24 }
            ],
            solution: [
                // Hauptverteilung
                { from: { component: "power230v", connection: "phase" }, to: { component: "ls_switch", connection: "input" } },
                { from: { component: "ls_switch", connection: "output" }, to: { component: "fi_switch", connection: "phase_in" } },
                { from: { component: "power230v", connection: "neutral" }, to: { component: "fi_switch", connection: "neutral_in" } },
                // 12V Kreis
                { from: { component: "fi_switch", connection: "phase_out" }, to: { component: "trafo_12v", connection: "ac_in1" } },
                { from: { component: "fi_switch", connection: "neutral_out" }, to: { component: "trafo_12v", connection: "ac_in2" } },
                { from: { component: "trafo_12v", connection: "dc_plus" }, to: { component: "led_12v", connection: "plus", instance: 0 } },
                { from: { component: "trafo_12v", connection: "dc_minus" }, to: { component: "led_12v", connection: "minus", instance: 0 } },
                // 24V Kreis
                { from: { component: "fi_switch", connection: "phase_out" }, to: { component: "trafo_24v", connection: "ac_in1" } },
                { from: { component: "fi_switch", connection: "neutral_out" }, to: { component: "trafo_24v", connection: "ac_in2" } },
                { from: { component: "trafo_24v", connection: "dc_plus" }, to: { component: "led_24v", connection: "plus", instance: 0 } },
                { from: { component: "trafo_24v", connection: "dc_minus" }, to: { component: "led_24v", connection: "minus", instance: 0 } }
            ],
            expectedResult: "mixed_voltage_on",
            feedback: {
                success: "Ausgezeichnet! Beide Spannungskreise funktionieren korrekt.",
                overload: "Trafo-Überlast! Zu viele LEDs für die Trafo-Leistung.",
                wrong_voltage: "LEDs an falscher Spannung - sie blinken oder sind defekt!",
                incomplete: "Schaltung unvollständig."
            }
        },
        {
            id: 3,
            title: "Automatische Steuerung",
            icon: "🌙",
            difficulty: "medium",
            description: "Erweiterte Werbetechnik mit Dämmerungsschalter für automatische Tag/Nacht-Steuerung.",
            taskDescription: "Installiere eine 24V LED-Beleuchtung mit Dämmerungsschalter für automatisches Ein-/Ausschalten.",
            components: [
                { type: "power230v", name: "230V Stromquelle", image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA4MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iNjAiIGhlaWdodD0iNDAiIGZpbGw9IiNGRjAwMDAiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxyZWN0IHg9IjUiIHk9IjIwIiB3aWR0aD0iNSIgaGVpZ2h0PSI2IiBmaWxsPSIjMDAwIi8+CjxyZWN0IHg9IjUiIHk9IjMwIiB3aWR0aD0iNSIgaGVpZ2h0PSI2IiBmaWxsPSIjMDA3QkZGIi8+CjxyZWN0IHg9IjUiIHk9IjQwIiB3aWR0aD0iNSIgaGVpZ2h0PSI2IiBmaWxsPSIjRkZGRjAwIi8+Cjx0ZXh0IHg9IjE1IiB5PSIzMCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI0ZGRiI+MjMwVjwvdGV4dD4KPHRleHQgeD0iMTAiIHk9IjU1IiBmb250LXNpemU9IjYiIGZpbGw9IiMzMzMiPkwgTiBQRTwvdGV4dD4KPC9zdmc+", count: 1, connections: ["phase", "neutral", "earth"] },
                { type: "ls_switch", name: "LS-Schalter", image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA0MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iNSIgeT0iNSIgd2lkdGg9IjMwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjhGOUZBIiBzdHJva2U9IiMzMzMiLz4KPHJlY3QgeD0iMTUiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTUiIGZpbGw9IiMyOGE3NDUiLz4KPGNpcmNsZSBjeD0iMTAiIGN5PSI0NSIgcj0iMiIgZmlsbD0iIzMzMyIvPgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjQ1IiByPSIyIiBmaWxsPSIjMzMzIi8+Cjx0ZXh0IHg9IjgiIHk9IjM1IiBmb250LXNpemU9IjgiIGZpbGw9IiMzMzMiPkMxNjwvdGV4dD4KPC9zdmc+", count: 1, connections: ["input", "output"], rating: 16 },
                { type: "fi_switch", name: "FI-Schalter", image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA0MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iNSIgeT0iNSIgd2lkdGg9IjMwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjhGOUZBIiBzdHJva2U9IiMzMzMiLz4KPHJlY3QgeD0iMTIiIHk9IjEwIiB3aWR0aD0iMTYiIGhlaWdodD0iMTUiIGZpbGw9IiNGRjAwMDAiLz4KPGNpcmNsZSBjeD0iOCIgY3k9IjQ1IiByPSIyIiBmaWxsPSIjMzMzIi8+CjxjaXJjbGUgY3g9IjIwIiBjeT0iNDUiIHI9IjIiIGZpbGw9IiMzMzMiLz4KPGNpcmNsZSBjeD0iMzIiIGN5PSI0NSIgcj0iMiIgZmlsbD0iIzMzMyIvPgo8dGV4dCB4PSI4IiB5PSIzNSIgZm9udC1zaXplPSI2IiBmaWxsPSIjMzMzIj4zMG1BPC90ZXh0Pgo8L3N2Zz4=", count: 1, connections: ["phase_in", "neutral_in", "phase_out", "neutral_out"], rating: 30 },
                { type: "dawn_switch", name: "Dämmerungsschalter", image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iNSIgeT0iNSIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjMzQzYTQwIiBzdHJva2U9IiMzMzMiLz4KPGNpcmNsZSBjeD0iMjAiIGN5PSIxNSIgcj0iNiIgZmlsbD0iI0ZGRkYwMCIvPgo8Y2lyY2xlIGN4PSIyMCIgY3k9IjI1IiByPSI0IiBmaWxsPSIjNmM3NTdkIi8+CjxjaXJjbGUgY3g9IjEwIiBjeT0iMzciIHI9IjIiIGZpbGw9IiMzMzMiLz4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzNyIgcj0iMiIgZmlsbD0iIzMzMyIvPgo8dGV4dCB4PSI3IiB5PSIzNCIgZm9udC1zaXplPSI1IiBmaWxsPSIjMzMzIj5EQU1NPC90ZXh0Pgo8L3N2Zz4=", count: 1, connections: ["phase_in", "phase_out"], light_sensor: true },
                { type: "trafo_24v", name: "Trafo 24V", image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA2MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iNDAiIGhlaWdodD0iMjAiIGZpbGw9IiM2Yzc1N2QiIHN0cm9rZT0iIzMzMyIvPgo8Y2lyY2xlIGN4PSI4IiBjeT0iMTUiIHI9IjIiIGZpbGw9IiMzMzMiLz4KPGNpcmNsZSBjeD0iOCIgY3k9IjI1IiByPSIyIiBmaWxsPSIjMzMzIi8+CjxjaXJjbGUgY3g9IjUyIiBjeT0iMTUiIHI9IjIiIGZpbGw9IiNGRjAwMDAiLz4KPGNpcmNsZSBjeD0iNTIiIGN5PSIyNSIgcj0iMiIgZmlsbD0iIzAwMCIvPgo8dGV4dCB4PSIyMCIgeT0iMjIiIGZvbnQtc2l6ZT0iOCIgZmlsbD0iI0ZGRiI+MjRWPC90ZXh0Pgo8dGV4dCB4PSIyMCIgeT0iMzUiIGZvbnQtc2l6ZT0iNiIgZmlsbD0iIzMzMyI+ODBXPC90ZXh0Pgo8L3N2Zz4=", count: 1, connections: ["ac_in1", "ac_in2", "dc_plus", "dc_minus"], power: 80, voltage_out: 24 },
                { type: "led_24v", name: "LED 24V", image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCA0MCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iNSIgeT0iNSIgd2lkdGg9IjMwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjMDBGRkZGIiBzdHJva2U9IiMzMzMiLz4KPGNpcmNsZSBjeD0iMyIgY3k9IjEwIiByPSIyIiBmaWxsPSIjRkYwMDAwIi8+CjxjaXJjbGUgY3g9IjM3IiBjeT0iMTAiIHI9IjIiIGZpbGw9IiMwMDAiLz4KPHRleHQgeD0iMTAiIHk9IjEyIiBmb250LXNpemU9IjYiIGZpbGw9IiMzMzMiPjI0ViA0LjVXPC90ZXh0Pgo8L3N2Zz4=", count: 3, connections: ["plus", "minus"], power: 4.5, voltage: 24 }
            ],
            solution: [
                // Hauptverteilung
                { from: { component: "power230v", connection: "phase" }, to: { component: "ls_switch", connection: "input" } },
                { from: { component: "ls_switch", connection: "output" }, to: { component: "fi_switch", connection: "phase_in" } },
                { from: { component: "power230v", connection: "neutral" }, to: { component: "fi_switch", connection: "neutral_in" } },
                // Dämmerungsschalter
                { from: { component: "fi_switch", connection: "phase_out" }, to: { component: "dawn_switch", connection: "phase_in" } },
                { from: { component: "dawn_switch", connection: "phase_out" }, to: { component: "trafo_24v", connection: "ac_in1" } },
                { from: { component: "fi_switch", connection: "neutral_out" }, to: { component: "trafo_24v", connection: "ac_in2" } },
                // LEDs parallel
                { from: { component: "trafo_24v", connection: "dc_plus" }, to: { component: "led_24v", connection: "plus", instance: 0 } },
                { from: { component: "trafo_24v", connection: "dc_plus" }, to: { component: "led_24v", connection: "plus", instance: 1 } },
                { from: { component: "trafo_24v", connection: "dc_plus" }, to: { component: "led_24v", connection: "plus", instance: 2 } },
                { from: { component: "trafo_24v", connection: "dc_minus" }, to: { component: "led_24v", connection: "minus", instance: 0 } },
                { from: { component: "trafo_24v", connection: "dc_minus" }, to: { component: "led_24v", connection: "minus", instance: 1 } },
                { from: { component: "trafo_24v", connection: "dc_minus" }, to: { component: "led_24v", connection: "minus", instance: 2 } }
            ],
            expectedResult: "dawn_controlled_leds",
            feedback: {
                success: "Perfekt! Automatische Dämmerungssteuerung funktioniert!",
                overload: "Trafo überlastet - zu viele LEDs!",
                no_dawn_switch: "Dämmerungsschalter fehlt oder falsch verkabelt!",
                incomplete: "Schaltung unvollständig."
            }
        },
        {
            id: 4,
            title: "Zeitgesteuerte Installation",
            icon: "⏰",
            difficulty: "hard",
            description: "Professionelle Werbetechnik mit Zeitschaltuhr für präzise Steuerung.",
            taskDescription: "Baue eine komplexe Installation mit Zeitschaltuhr und gemischten 12V/24V LEDs.",
            components: [
                { type: "power230v", name: "230V Stromquelle", image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA4MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iNjAiIGhlaWdodD0iNDAiIGZpbGw9IiNGRjAwMDAiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxyZWN0IHg9IjUiIHk9IjIwIiB3aWR0aD0iNSIgaGVpZ2h0PSI2IiBmaWxsPSIjMDAwIi8+CjxyZWN0IHg9IjUiIHk9IjMwIiB3aWR0aD0iNSIgaGVpZ2h0PSI2IiBmaWxsPSIjMDA3QkZGIi8+CjxyZWN0IHg9IjUiIHk9IjQwIiB3aWR0aD0iNSIgaGVpZ2h0PSI2IiBmaWxsPSIjRkZGRjAwIi8+Cjx0ZXh0IHg9IjE1IiB5PSIzMCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI0ZGRiI+MjMwVjwvdGV4dD4KPHRleHQgeD0iMTAiIHk9IjU1IiBmb250LXNpemU9IjYiIGZpbGw9IiMzMzMiPkwgTiBQRTwvdGV4dD4KPC9zdmc+", count: 1, connections: ["phase", "neutral", "earth"] },
                { type: "ls_switch", name: "LS-Schalter", image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA0MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iNSIgeT0iNSIgd2lkdGg9IjMwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjhGOUZBIiBzdHJva2U9IiMzMzMiLz4KPHJlY3QgeD0iMTUiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTUiIGZpbGw9IiMyOGE3NDUiLz4KPGNpcmNsZSBjeD0iMTAiIGN5PSI0NSIgcj0iMiIgZmlsbD0iIzMzMyIvPgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjQ1IiByPSIyIiBmaWxsPSIjMzMzIi8+Cjx0ZXh0IHg9IjgiIHk9IjM1IiBmb250LXNpemU9IjgiIGZpbGw9IiMzMzMiPkMxNjwvdGV4dD4KPC9zdmc+", count: 1, connections: ["input", "output"], rating: 16 },
                { type: "fi_switch", name: "FI-Schalter", image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA0MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iNSIgeT0iNSIgd2lkdGg9IjMwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjhGOUZBIiBzdHJva2U9IiMzMzMiLz4KPHJlY3QgeD0iMTIiIHk9IjEwIiB3aWR0aD0iMTYiIGhlaWdodD0iMTUiIGZpbGw9IiNGRjAwMDAiLz4KPGNpcmNsZSBjeD0iOCIgY3k9IjQ1IiByPSIyIiBmaWxsPSIjMzMzIi8+CjxjaXJjbGUgY3g9IjIwIiBjeT0iNDUiIHI9IjIiIGZpbGw9IiMzMzMiLz4KPGNpcmNsZSBjeD0iMzIiIGN5PSI0NSIgcj0iMiIgZmlsbD0iIzMzMyIvPgo8dGV4dCB4PSI4IiB5PSIzNSIgZm9udC1zaXplPSI2IiBmaWxsPSIjMzMzIj4zMG1BPC90ZXh0Pgo8L3N2Zz4=", count: 1, connections: ["phase_in", "neutral_in", "phase_out", "neutral_out"], rating: 30 },
                { type: "time_switch", name: "Zeitschaltuhr", image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iNSIgeT0iNSIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjMjg2MDkwIiBzdHJva2U9IiMzMzMiLz4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMTAiIGZpbGw9IiNGRkYiIHN0cm9rZT0iIzMzMyIvPgo8bGluZSB4MT0iMjAiIHkxPSIyMCIgeDI9IjIwIiB5Mj0iMTMiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxsaW5lIHgxPSIyMCIgeTE9IjIwIiB4Mj0iMjUiIHkyPSIyMCIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utd2lkdGg9IjEuNSIvPgo8Y2lyY2xlIGN4PSIxMCIgY3k9IjM3IiByPSIyIiBmaWxsPSIjMzMzIi8+CjxjaXJjbGUgY3g9IjMwIiBjeT0iMzciIHI9IjIiIGZpbGw9IiMzMzMiLz4KPHRleHQgeD0iNyIgeT0iMzQiIGZvbnQtc2l6ZT0iNSIgZmlsbD0iIzMzMyI+VElNRTwvdGV4dD4KPC9zdmc+", count: 1, connections: ["phase_in", "phase_out"], programmable: true },
                { type: "trafo_12v", name: "Trafo 12V", image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA2MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iNDAiIGhlaWdodD0iMjAiIGZpbGw9IiM2Yzc1N2QiIHN0cm9rZT0iIzMzMyIvPgo8Y2lyY2xlIGN4PSI4IiBjeT0iMTUiIHI9IjIiIGZpbGw9IiMzMzMiLz4KPGNpcmNsZSBjeD0iOCIgY3k9IjI1IiByPSIyIiBmaWxsPSIjMzMzIi8+CjxjaXJjbGUgY3g9IjUyIiBjeT0iMTUiIHI9IjIiIGZpbGw9IiNGRjAwMDAiLz4KPGNpcmNsZSBjeD0iNTIiIGN5PSIyNSIgcj0iMiIgZmlsbD0iIzAwMCIvPgo8dGV4dCB4PSIyMCIgeT0iMjIiIGZvbnQtc2l6ZT0iOCIgZmlsbD0iI0ZGRiI+MTJWPC90ZXh0Pgo8dGV4dCB4PSIyMCIgeT0iMzUiIGZvbnQtc2l6ZT0iNiIgZmlsbD0iIzMzMyI+NjBXPC90ZXh0Pgo8L3N2Zz4=", count: 1, connections: ["ac_in1", "ac_in2", "dc_plus", "dc_minus"], power: 60, voltage_out: 12 },
                { type: "trafo_24v", name: "Trafo 24V", image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA2MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iNDAiIGhlaWdodD0iMjAiIGZpbGw9IiM2Yzc1N2QiIHN0cm9rZT0iIzMzMyIvPgo8Y2lyY2xlIGN4PSI4IiBjeT0iMTUiIHI9IjIiIGZpbGw9IiMzMzMiLz4KPGNpcmNsZSBjeD0iOCIgY3k9IjI1IiByPSIyIiBmaWxsPSIjMzMzIi8+CjxjaXJjbGUgY3g9IjUyIiBjeT0iMTUiIHI9IjIiIGZpbGw9IiNGRjAwMDAiLz4KPGNpcmNsZSBjeD0iNTIiIGN5PSIyNSIgcj0iMiIgZmlsbD0iIzAwMCIvPgo8dGV4dCB4PSIyMCIgeT0iMjIiIGZvbnQtc2l6ZT0iOCIgZmlsbD0iI0ZGRiI+MjRWPC90ZXh0Pgo8dGV4dCB4PSIyMCIgeT0iMzUiIGZvbnQtc2l6ZT0iNiIgZmlsbD0iIzMzMyI+ODBXPC90ZXh0Pgo8L3N2Zz4=", count: 1, connections: ["ac_in1", "ac_in2", "dc_plus", "dc_minus"], power: 80, voltage_out: 24 },
                { type: "led_12v", name: "LED 12V", image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCA0MCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iNSIgeT0iNSIgd2lkdGg9IjMwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjRkZGRjAwIiBzdHJva2U9IiMzMzMiLz4KPGNpcmNsZSBjeD0iMyIgY3k9IjEwIiByPSIyIiBmaWxsPSIjRkYwMDAwIi8+CjxjaXJjbGUgY3g9IjM3IiBjeT0iMTAiIHI9IjIiIGZpbGw9IiMwMDAiLz4KPHRleHQgeD0iMTAiIHk9IjEyIiBmb250LXNpemU9IjYiIGZpbGw9IiMzMzMiPjEyViAzLjVXPC90ZXh0Pgo8L3N2Zz4=", count: 3, connections: ["plus", "minus"], power: 3.5, voltage: 12 },
                { type: "led_24v", name: "LED 24V", image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCA0MCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iNSIgeT0iNSIgd2lkdGg9IjMwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjMDBGRkZGIiBzdHJva2U9IiMzMzMiLz4KPGNpcmNsZSBjeD0iMyIgY3k9IjEwIiByPSIyIiBmaWxsPSIjRkYwMDAwIi8+CjxjaXJjbGUgY3g9IjM3IiBjeT0iMTAiIHI9IjIiIGZpbGw9IiMwMDAiLz4KPHRleHQgeD0iMTAiIHk9IjEyIiBmb250LXNpemU9IjYiIGZpbGw9IiMzMzMiPjI0ViA0LjVXPC90ZXh0Pgo8L3N2Zz4=", count: 2, connections: ["plus", "minus"], power: 4.5, voltage: 24 }
            ],
            solution: [
                // Hauptverteilung
                { from: { component: "power230v", connection: "phase" }, to: { component: "ls_switch", connection: "input" } },
                { from: { component: "ls_switch", connection: "output" }, to: { component: "fi_switch", connection: "phase_in" } },
                { from: { component: "power230v", connection: "neutral" }, to: { component: "fi_switch", connection: "neutral_in" } },
                // Zeitschaltuhr
                { from: { component: "fi_switch", connection: "phase_out" }, to: { component: "time_switch", connection: "phase_in" } },
                // Beide Trafos parallel nach Zeitschaltuhr
                { from: { component: "time_switch", connection: "phase_out" }, to: { component: "trafo_12v", connection: "ac_in1" } },
                { from: { component: "time_switch", connection: "phase_out" }, to: { component: "trafo_24v", connection: "ac_in1" } },
                { from: { component: "fi_switch", connection: "neutral_out" }, to: { component: "trafo_12v", connection: "ac_in2" } },
                { from: { component: "fi_switch", connection: "neutral_out" }, to: { component: "trafo_24v", connection: "ac_in2" } },
                // 12V LEDs
                { from: { component: "trafo_12v", connection: "dc_plus" }, to: { component: "led_12v", connection: "plus", instance: 0 } },
                { from: { component: "trafo_12v", connection: "dc_plus" }, to: { component: "led_12v", connection: "plus", instance: 1 } },
                { from: { component: "trafo_12v", connection: "dc_minus" }, to: { component: "led_12v", connection: "minus", instance: 0 } },
                { from: { component: "trafo_12v", connection: "dc_minus" }, to: { component: "led_12v", connection: "minus", instance: 1 } },
                // 24V LEDs
                { from: { component: "trafo_24v", connection: "dc_plus" }, to: { component: "led_24v", connection: "plus", instance: 0 } },
                { from: { component: "trafo_24v", connection: "dc_plus" }, to: { component: "led_24v", connection: "plus", instance: 1 } },
                { from: { component: "trafo_24v", connection: "dc_minus" }, to: { component: "led_24v", connection: "minus", instance: 0 } },
                { from: { component: "trafo_24v", connection: "dc_minus" }, to: { component: "led_24v", connection: "minus", instance: 1 } }
            ],
            expectedResult: "time_controlled_mixed_voltage",
            feedback: {
                success: "Meisterhaft! Zeitgesteuerte Werbetechnik-Installation mit zwei Spannungen!",
                overload: "Einer oder beide Trafos überlastet!",
                no_time_control: "Zeitschaltuhr fehlt oder falsch verkabelt!",
                wrong_voltage_mix: "LEDs an falschen Spannungen - prüfe 12V/24V Zuordnung!",
                incomplete: "Komplexe Schaltung unvollständig."
            }
        }
    ],

    // Level-Management (gleiche Funktionen wie GameLevels)
    getCurrentLevel() {
        const urlParams = new URLSearchParams(window.location.search);
        const levelId = parseInt(urlParams.get('level')) || 1;
        return this.levels.find(level => level.id === levelId);
    },

    getAllLevels() {
        return this.levels;
    },

    getCompletedLevels() {
        const completed = localStorage.getItem('werbetechnikCompletedLevels');
        return completed ? JSON.parse(completed) : [];
    },

    markLevelCompleted(levelId) {
        const completed = this.getCompletedLevels();
        if (!completed.includes(levelId)) {
            completed.push(levelId);
            localStorage.setItem('werbetechnikCompletedLevels', JSON.stringify(completed));
        }
    },

    isLevelUnlocked(levelId) {
        if (levelId === 1) return true;
        const completed = this.getCompletedLevels();
        return completed.includes(levelId - 1);
    },

    getNextLevel(currentLevelId) {
        const nextLevelId = currentLevelId + 1;
        return this.levels.find(level => level.id === nextLevelId);
    },

    // Werbetechnik-spezifische Komponenten-Definitionen
    getComponentDefinition(type) {
        const definitions = {
            power230v: {
                width: 80,
                height: 60,
                connectionPoints: {
                    phase: { x: 5, y: 25, type: "output" },
                    neutral: { x: 5, y: 35, type: "output" },
                    earth: { x: 5, y: 45, type: "output" }
                },
                voltage: 230,
                type: "AC"
            },
            ls_switch: {
                width: 40,
                height: 50,
                connectionPoints: {
                    input: { x: 10, y: 45, type: "input" },
                    output: { x: 30, y: 45, type: "output" }
                },
                rating: 16,
                state: "closed"
            },
            fi_switch: {
                width: 40,
                height: 50,
                connectionPoints: {
                    phase_in: { x: 8, y: 45, type: "input" },
                    neutral_in: { x: 20, y: 45, type: "input" },
                    phase_out: { x: 8, y: 5, type: "output" },
                    neutral_out: { x: 20, y: 5, type: "output" }
                },
                rating: 30,
                state: "closed"
            },
            trafo_12v: {
                width: 60,
                height: 40,
                connectionPoints: {
                    ac_in1: { x: 8, y: 15, type: "input" },
                    ac_in2: { x: 8, y: 25, type: "input" },
                    dc_plus: { x: 52, y: 15, type: "output" },
                    dc_minus: { x: 52, y: 25, type: "output" }
                },
                power: 60,
                voltage_in: 230,
                voltage_out: 12,
                type: "AC_DC"
            },
            trafo_24v: {
                width: 60,
                height: 40,
                connectionPoints: {
                    ac_in1: { x: 8, y: 15, type: "input" },
                    ac_in2: { x: 8, y: 25, type: "input" },
                    dc_plus: { x: 52, y: 15, type: "output" },
                    dc_minus: { x: 52, y: 25, type: "output" }
                },
                power: 80,
                voltage_in: 230,
                voltage_out: 24,
                type: "AC_DC"
            },
            led_12v: {
                width: 40,
                height: 20,
                connectionPoints: {
                    plus: { x: 3, y: 10, type: "input" },
                    minus: { x: 37, y: 10, type: "input" }
                },
                power: 3.5,
                voltage: 12,
                type: "DC"
            },
            led_24v: {
                width: 40,
                height: 20,
                connectionPoints: {
                    plus: { x: 3, y: 10, type: "input" },
                    minus: { x: 37, y: 10, type: "input" }
                },
                power: 4.5,
                voltage: 24,
                type: "DC"
            },
            dawn_switch: {
                width: 40,
                height: 40,
                connectionPoints: {
                    phase_in: { x: 10, y: 37, type: "input" },
                    phase_out: { x: 30, y: 37, type: "output" }
                },
                light_sensor: true,
                type: "AC_SWITCH",
                state: "auto"
            },
            time_switch: {
                width: 40,
                height: 40,
                connectionPoints: {
                    phase_in: { x: 10, y: 37, type: "input" },
                    phase_out: { x: 30, y: 37, type: "output" }
                },
                programmable: true,
                type: "AC_SWITCH",
                state: "auto",
                schedule: []
            }
        };
        
        return definitions[type];
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WerbetechnikLevels;
} else {
    window.WerbetechnikLevels = WerbetechnikLevels;
}