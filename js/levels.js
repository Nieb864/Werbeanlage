// Level-Definitionen für das Elektronik Lernspiel

const GameLevels = {
    levels: [
        {
            id: 1,
            title: "Einfache LED Schaltung",
            icon: "💡",
            difficulty: "easy",
            description: "Verbinde eine LED mit einer Batterie über einen Widerstand. Lerne die Grundlagen eines einfachen Stromkreises.",
            taskDescription: "Verbinde die Batterie (+ und -) mit einer LED über einen Widerstand. Achte auf die richtige Polung der LED!",
            components: [
                { type: "battery", name: "Batterie", image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA2MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMTAiIHk9IjE1IiB3aWR0aD0iMzAiIGhlaWdodD0iMTAiIGZpbGw9IiMzMzMiLz4KPHJlY3QgeD0iNDAiIHk9IjE3IiB3aWR0aD0iNSIgaGVpZ2h0PSI2IiBmaWxsPSIjRkYwMDAwIi8+CjxyZWN0IHg9IjUiIHk9IjE3IiB3aWR0aD0iNSIgaGVpZ2h0PSI2IiBmaWxsPSIjMDAwIi8+Cjx0ZXh0IHg9IjIwIiB5PSIzNSIgZm9udC1zaXplPSI4IiBmaWxsPSIjMzMzIj45VjwvdGV4dD4KPC9zdmc+", count: 1, connections: ["positive", "negative"] },
                { type: "led", name: "LED", image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMTAiIGZpbGw9IiNGRkVFMDAiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjxwb2x5Z29uIHBvaW50cz0iMTUsOCAyNSw4IDIwLDE4IiBmaWxsPSIjRkYwMDAwIi8+Cjx0ZXh0IHg9IjEwIiB5PSIzNSIgZm9udC1zaXplPSI2IiBmaWxsPSIjMzMzIj5MRUQgKCspPC90ZXh0Pgo8L3N2Zz4=", count: 1, connections: ["anode", "cathode"] },
                { type: "resistor", name: "Widerstand", image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCA1MCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMTAiIHk9IjgiIHdpZHRoPSIzMCIgaGVpZ2h0PSI0IiBmaWxsPSIjOEI0NTEzIi8+CjxyZWN0IHg9IjE1IiB5PSI2IiB3aWR0aD0iMiIgaGVpZ2h0PSI4IiBmaWxsPSIjRkYwMDAwIi8+CjxyZWN0IHg9IjIwIiB5PSI2IiB3aWR0aD0iMiIgaGVpZ2h0PSI4IiBmaWxsPSIjRkZBNTAwIi8+CjxyZWN0IHg9IjI1IiB5PSI2IiB3aWR0aD0iMiIgaGVpZ2h0PSI4IiBmaWxsPSIjRkZGRjAwIi8+CjxyZWN0IHg9IjMwIiB5PSI2IiB3aWR0aD0iMiIgaGVpZ2h0PSI4IiBmaWxsPSIjRkYwMDAwIi8+Cjx0ZXh0IHg9IjE1IiB5PSIxOCIgZm9udC1zaXplPSI2IiBmaWxsPSIjMzMzIj4yMjDOqTwvdGV4dD4KPC9zdmc+", count: 1, connections: ["terminal1", "terminal2"] }
            ],
            solution: [
                { from: { component: "battery", connection: "positive" }, to: { component: "resistor", connection: "terminal1" } },
                { from: { component: "resistor", connection: "terminal2" }, to: { component: "led", connection: "anode" } },
                { from: { component: "led", connection: "cathode" }, to: { component: "battery", connection: "negative" } }
            ],
            expectedResult: "led_on",
            feedback: {
                success: "Perfekt! Die LED leuchtet. Du hast einen funktionsfähigen Stromkreis aufgebaut.",
                wrong_polarity: "Die LED leuchtet nicht. Überprüfe die Polung - die Anode (+) muss mit dem Plus-Pol verbunden sein.",
                no_resistor: "Achtung! Ohne Widerstand könnte die LED durchbrennen.",
                incomplete: "Der Stromkreis ist nicht vollständig. Alle Bauteile müssen verbunden sein."
            }
        },
        {
            id: 2,
            title: "Parallel-Schaltung",
            icon: "🔗",
            difficulty: "medium", 
            description: "Baue eine Parallelschaltung mit zwei LEDs. Lerne wie sich Strom in parallelen Zweigen aufteilt.",
            taskDescription: "Verbinde zwei LEDs parallel zueinander mit einer Batterie. Jede LED benötigt ihren eigenen Widerstand.",
            components: [
                { type: "battery", name: "Batterie", image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA2MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMTAiIHk9IjE1IiB3aWR0aD0iMzAiIGhlaWdodD0iMTAiIGZpbGw9IiMzMzMiLz4KPHJlY3QgeD0iNDAiIHk9IjE3IiB3aWR0aD0iNSIgaGVpZ2h0PSI2IiBmaWxsPSIjRkYwMDAwIi8+CjxyZWN0IHg9IjUiIHk9IjE3IiB3aWR0aD0iNSIgaGVpZ2h0PSI2IiBmaWxsPSIjMDAwIi8+Cjx0ZXh0IHg9IjIwIiB5PSIzNSIgZm9udC1zaXplPSI4IiBmaWxsPSIjMzMzIj45VjwvdGV4dD4KPC9zdmc+", count: 1, connections: ["positive", "negative"] },
                { type: "led", name: "LED", image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMTAiIGZpbGw9IiNGRkVFMDAiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjxwb2x5Z29uIHBvaW50cz0iMTUsOCAyNSw4IDIwLDE4IiBmaWxsPSIjRkYwMDAwIi8+Cjx0ZXh0IHg9IjEwIiB5PSIzNSIgZm9udC1zaXplPSI2IiBmaWxsPSIjMzMzIj5MRUQgKCspPC90ZXh0Pgo8L3N2Zz4=", count: 2, connections: ["anode", "cathode"] },
                { type: "resistor", name: "Widerstand", image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCA1MCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMTAiIHk9IjgiIHdpZHRoPSIzMCIgaGVpZ2h0PSI0IiBmaWxsPSIjOEI0NTEzIi8+CjxyZWN0IHg9IjE1IiB5PSI2IiB3aWR0aD0iMiIgaGVpZ2h0PSI4IiBmaWxsPSIjRkYwMDAwIi8+CjxyZWN0IHg9IjIwIiB5PSI2IiB3aWR0aD0iMiIgaGVpZ2h0PSI4IiBmaWxsPSIjRkZBNTAwIi8+CjxyZWN0IHg9IjI1IiB5PSI2IiB3aWR0aD0iMiIgaGVpZ2h0PSI4IiBmaWxsPSIjRkZGRjAwIi8+CjxyZWN0IHg9IjMwIiB5PSI2IiB3aWR0aD0iMiIgaGVpZ2h0PSI4IiBmaWxsPSIjRkYwMDAwIi8+Cjx0ZXh0IHg9IjE1IiB5PSIxOCIgZm9udC1zaXplPSI2IiBmaWxsPSIjMzMzIj4yMjDOqTwvdGV4dD4KPC9zdmc+", count: 2, connections: ["terminal1", "terminal2"] }
            ],
            solution: [
                { from: { component: "battery", connection: "positive" }, to: { component: "resistor", connection: "terminal1", instance: 0 } },
                { from: { component: "battery", connection: "positive" }, to: { component: "resistor", connection: "terminal1", instance: 1 } },
                { from: { component: "resistor", connection: "terminal2", instance: 0 }, to: { component: "led", connection: "anode", instance: 0 } },
                { from: { component: "resistor", connection: "terminal2", instance: 1 }, to: { component: "led", connection: "anode", instance: 1 } },
                { from: { component: "led", connection: "cathode", instance: 0 }, to: { component: "battery", connection: "negative" } },
                { from: { component: "led", connection: "cathode", instance: 1 }, to: { component: "battery", connection: "negative" } }
            ],
            expectedResult: "parallel_leds_on",
            feedback: {
                success: "Ausgezeichnet! Beide LEDs leuchten gleich hell in der Parallelschaltung.",
                series_connection: "Die LEDs sind in Serie geschaltet. Verbinde sie parallel für gleiche Helligkeit.",
                incomplete: "Nicht alle Verbindungen sind korrekt. Überprüfe die Parallelschaltung."
            }
        },
        {
            id: 3,
            title: "Schalter-Steuerung",
            icon: "🔘",
            difficulty: "medium",
            description: "Erweitere den Stromkreis um einen Schalter. Lerne die Kontrolle über den Stromfluss.",
            taskDescription: "Baue eine LED-Schaltung mit einem Schalter, um die LED ein- und ausschalten zu können.",
            components: [
                { type: "battery", name: "Batterie", image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA2MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMTAiIHk9IjE1IiB3aWR0aD0iMzAiIGhlaWdodD0iMTAiIGZpbGw9IiMzMzMiLz4KPHJlY3QgeD0iNDAiIHk9IjE3IiB3aWR0aD0iNSIgaGVpZ2h0PSI2IiBmaWxsPSIjRkYwMDAwIi8+CjxyZWN0IHg9IjUiIHk9IjE3IiB3aWR0aD0iNSIgaGVpZ2h0PSI2IiBmaWxsPSIjMDAwIi8+Cjx0ZXh0IHg9IjIwIiB5PSIzNSIgZm9udC1zaXplPSI4IiBmaWxsPSIjMzMzIj45VjwvdGV4dD4KPC9zdmc+", count: 1, connections: ["positive", "negative"] },
                { type: "led", name: "LED", image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMTAiIGZpbGw9IiNGRkVFMDAiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjxwb2x5Z29uIHBvaW50cz0iMTUsOCAyNSw4IDIwLDE4IiBmaWxsPSIjRkYwMDAwIi8+Cjx0ZXh0IHg9IjEwIiB5PSIzNSIgZm9udC1zaXplPSI2IiBmaWxsPSIjMzMzIj5MRUQgKCspPC90ZXh0Pgo8L3N2Zz4=", count: 1, connections: ["anode", "cathode"] },
                { type: "resistor", name: "Widerstand", image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCA1MCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMTAiIHk9IjgiIHdpZHRoPSIzMCIgaGVpZ2h0PSI0IiBmaWxsPSIjOEI0NTEzIi8+CjxyZWN0IHg9IjE1IiB5PSI2IiB3aWR0aD0iMiIgaGVpZ2h0PSI4IiBmaWxsPSIjRkYwMDAwIi8+CjxyZWN0IHg9IjIwIiB5PSI2IiB3aWR0aD0iMiIgaGVpZ2h0PSI4IiBmaWxsPSIjRkZBNTAwIi8+CjxyZWN0IHg9IjI1IiB5PSI2IiB3aWR0aD0iMiIgaGVpZ2h0PSI4IiBmaWxsPSIjRkZGRjAwIi8+CjxyZWN0IHg9IjMwIiB5PSI2IiB3aWR0aD0iMiIgaGVpZ2h0PSI4IiBmaWxsPSIjRkYwMDAwIi8+Cjx0ZXh0IHg9IjE1IiB5PSIxOCIgZm9udC1zaXplPSI2IiBmaWxsPSIjMzMzIj4yMjDOqTwvdGV4dD4KPC9zdmc+", count: 1, connections: ["terminal1", "terminal2"] },
                { type: "switch", name: "Schalter", image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCA0MCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iOCIgY3k9IjE1IiByPSIzIiBmaWxsPSIjMzMzIi8+CjxjaXJjbGUgY3g9IjMyIiBjeT0iMTUiIHI9IjMiIGZpbGw9IiMzMzMiLz4KPGxpbmUgeDE9IjgiIHkxPSIxNSIgeDI9IjI4IiB5Mj0iMTAiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxyZWN0IHg9IjE1IiB5PSIyIiB3aWR0aD0iMTAiIGhlaWdodD0iNiIgZmlsbD0iI0ZGMDAwMCIvPgo8dGV4dCB4PSI4IiB5PSIyOCIgZm9udC1zaXplPSI2IiBmaWxsPSIjMzMzIj5PTi9PRkY8L3RleHQ+Cjwvc3ZnPg==", count: 1, connections: ["input", "output"] }
            ],
            solution: [
                { from: { component: "battery", connection: "positive" }, to: { component: "switch", connection: "input" } },
                { from: { component: "switch", connection: "output" }, to: { component: "resistor", connection: "terminal1" } },
                { from: { component: "resistor", connection: "terminal2" }, to: { component: "led", connection: "anode" } },
                { from: { component: "led", connection: "cathode" }, to: { component: "battery", connection: "negative" } }
            ],
            expectedResult: "switchable_led",
            feedback: {
                success: "Super! Du kannst die LED mit dem Schalter steuern.",
                switch_bypassed: "Der Schalter wurde umgangen. Er muss im Stromkreis liegen.",
                incomplete: "Der Stromkreis ist nicht vollständig."
            }
        },
        {
            id: 4,
            title: "Komplexe Schaltung",
            icon: "⚡",
            difficulty: "hard",
            description: "Baue eine erweiterte Schaltung mit mehreren Komponenten und verschiedenen Pfaden.",
            taskDescription: "Erstelle eine Schaltung mit zwei LEDs, die unabhängig voneinander geschaltet werden können.",
            components: [
                { type: "battery", name: "Batterie", image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA2MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMTAiIHk9IjE1IiB3aWR0aD0iMzAiIGhlaWdodD0iMTAiIGZpbGw9IiMzMzMiLz4KPHJlY3QgeD0iNDAiIHk9IjE3IiB3aWR0aD0iNSIgaGVpZ2h0PSI2IiBmaWxsPSIjRkYwMDAwIi8+CjxyZWN0IHg9IjUiIHk9IjE3IiB3aWR0aD0iNSIgaGVpZ2h0PSI2IiBmaWxsPSIjMDAwIi8+Cjx0ZXh0IHg9IjIwIiB5PSIzNSIgZm9udC1zaXplPSI4IiBmaWxsPSIjMzMzIj45VjwvdGV4dD4KPC9zdmc+", count: 1, connections: ["positive", "negative"] },
                { type: "led", name: "LED", image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMTAiIGZpbGw9IiNGRkVFMDAiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjxwb2x5Z29uIHBvaW50cz0iMTUsOCAyNSw4IDIwLDE4IiBmaWxsPSIjRkYwMDAwIi8+Cjx0ZXh0IHg9IjEwIiB5PSIzNSIgZm9udC1zaXplPSI2IiBmaWxsPSIjMzMzIj5MRUQgKCspPC90ZXh0Pgo8L3N2Zz4=", count: 2, connections: ["anode", "cathode"] },
                { type: "resistor", name: "Widerstand", image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCA1MCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMTAiIHk9IjgiIHdpZHRoPSIzMCIgaGVpZ2h0PSI0IiBmaWxsPSIjOEI0NTEzIi8+CjxyZWN0IHg9IjE1IiB5PSI2IiB3aWR0aD0iMiIgaGVpZ2h0PSI4IiBmaWxsPSIjRkYwMDAwIi8+CjxyZWN0IHg9IjIwIiB5PSI2IiB3aWR0aD0iMiIgaGVpZ2h0PSI4IiBmaWxsPSIjRkZBNTAwIi8+CjxyZWN0IHg9IjI1IiB5PSI2IiB3aWR0aD0iMiIgaGVpZ2h0PSI4IiBmaWxsPSIjRkZGRjAwIi8+CjxyZWN0IHg9IjMwIiB5PSI2IiB3aWR0aD0iMiIgaGVpZ2h0PSI4IiBmaWxsPSIjRkYwMDAwIi8+Cjx0ZXh0IHg9IjE1IiB5PSIxOCIgZm9udC1zaXplPSI2IiBmaWxsPSIjMzMzIj4yMjDOqTwvdGV4dD4KPC9zdmc+", count: 2, connections: ["terminal1", "terminal2"] },
                { type: "switch", name: "Schalter", image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCA0MCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iOCIgY3k9IjE1IiByPSIzIiBmaWxsPSIjMzMzIi8+CjxjaXJjbGUgY3g9IjMyIiBjeT0iMTUiIHI9IjMiIGZpbGw9IiMzMzMiLz4KPGxpbmUgeDE9IjgiIHkxPSIxNSIgeDI9IjI4IiB5Mj0iMTAiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxyZWN0IHg9IjE1IiB5PSIyIiB3aWR0aD0iMTAiIGhlaWdodD0iNiIgZmlsbD0iI0ZGMDAwMCIvPgo8dGV4dCB4PSI4IiB5PSIyOCIgZm9udC1zaXplPSI2IiBmaWxsPSIjMzMzIj5PTi9PRkY8L3RleHQ+Cjwvc3ZnPg==", count: 2, connections: ["input", "output"] }
            ],
            solution: [
                // Erster LED-Kreis
                { from: { component: "battery", connection: "positive" }, to: { component: "switch", connection: "input", instance: 0 } },
                { from: { component: "switch", connection: "output", instance: 0 }, to: { component: "resistor", connection: "terminal1", instance: 0 } },
                { from: { component: "resistor", connection: "terminal2", instance: 0 }, to: { component: "led", connection: "anode", instance: 0 } },
                { from: { component: "led", connection: "cathode", instance: 0 }, to: { component: "battery", connection: "negative" } },
                // Zweiter LED-Kreis
                { from: { component: "battery", connection: "positive" }, to: { component: "switch", connection: "input", instance: 1 } },
                { from: { component: "switch", connection: "output", instance: 1 }, to: { component: "resistor", connection: "terminal1", instance: 1 } },
                { from: { component: "resistor", connection: "terminal2", instance: 1 }, to: { component: "led", connection: "anode", instance: 1 } },
                { from: { component: "led", connection: "cathode", instance: 1 }, to: { component: "battery", connection: "negative" } }
            ],
            expectedResult: "dual_switchable_leds",
            feedback: {
                success: "Hervorragend! Du hast eine komplexe Schaltung mit unabhängiger Steuerung gebaut.",
                interference: "Die Schalter beeinflussen sich gegenseitig. Überprüfe die Verkabelung.",
                incomplete: "Nicht alle Verbindungen sind korrekt."
            }
        }
    ],

    // Level-Management Funktionen
    getCurrentLevel() {
        const urlParams = new URLSearchParams(window.location.search);
        const levelId = parseInt(urlParams.get('level')) || 1;
        return this.levels.find(level => level.id === levelId);
    },

    getAllLevels() {
        return this.levels;
    },

    getCompletedLevels() {
        const completed = localStorage.getItem('completedLevels');
        return completed ? JSON.parse(completed) : [];
    },

    markLevelCompleted(levelId) {
        const completed = this.getCompletedLevels();
        if (!completed.includes(levelId)) {
            completed.push(levelId);
            localStorage.setItem('completedLevels', JSON.stringify(completed));
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

    // Component-Definition für das Rendering
    getComponentDefinition(type) {
        const definitions = {
            battery: {
                width: 60,
                height: 40,
                connectionPoints: {
                    positive: { x: 55, y: 15, type: "output" },
                    negative: { x: 5, y: 25, type: "output" }
                }
            },
            led: {
                width: 40,
                height: 40,
                connectionPoints: {
                    anode: { x: 35, y: 20, type: "input" },
                    cathode: { x: 5, y: 20, type: "output" }
                }
            },
            resistor: {
                width: 50,
                height: 20,
                connectionPoints: {
                    terminal1: { x: 5, y: 10, type: "bidirectional" },
                    terminal2: { x: 45, y: 10, type: "bidirectional" }
                }
            },
            switch: {
                width: 40,
                height: 30,
                connectionPoints: {
                    input: { x: 5, y: 15, type: "input" },
                    output: { x: 35, y: 15, type: "output" }
                },
                state: "closed" // open oder closed - für Demo standardmäßig geschlossen
            }
        };
        
        return definitions[type];
    }
};

// Export für andere Module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GameLevels;
} else {
    window.GameLevels = GameLevels;
}