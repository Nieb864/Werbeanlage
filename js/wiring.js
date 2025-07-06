// Verkabelungssystem mit Bezier-Kurven für Elektronik-Bauteile

class WiringSystem {
    constructor(canvas, gameArea) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.gameArea = gameArea;
        this.wires = [];
        this.isWiring = false;
        this.startPoint = null;
        this.currentWire = null;
        this.previewWire = null;
        this.nextWireId = 1;
        
        this.initializeEventListeners();
        this.setupCanvas();
    }

    setupCanvas() {
        // Canvas-Größe anpassen
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        const rect = this.gameArea.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.redrawAllWires();
    }

    initializeEventListeners() {
        // Connection Point Events
        this.gameArea.addEventListener('click', this.handleConnectionPointClick.bind(this));
        this.gameArea.addEventListener('mousemove', this.handleMouseMove.bind(this));
        
        // Context Menu für Kabel-Löschung
        this.canvas.addEventListener('contextmenu', this.handleContextMenu.bind(this));
        
        // Keyboard Events
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        
        // Drag & Drop Events abhören
        document.addEventListener('dragdrop:componentMoved', this.handleComponentMoved.bind(this));
        document.addEventListener('dragdrop:componentRemoved', this.handleComponentRemoved.bind(this));
    }

    handleConnectionPointClick(event) {
        const connectionPoint = event.target.closest('.connection-point');
        if (!connectionPoint) {
            if (this.isWiring) {
                this.cancelWiring();
            }
            return;
        }

        event.stopPropagation();
        
        const componentId = parseInt(connectionPoint.dataset.componentId);
        const pointName = connectionPoint.dataset.pointName;
        
        if (!this.isWiring) {
            this.startWiring(componentId, pointName, connectionPoint);
        } else {
            this.finishWiring(componentId, pointName, connectionPoint);
        }
    }

    startWiring(componentId, pointName, element) {
        const component = this.getComponentById(componentId);
        if (!component) return;

        const point = component.connectionPoints[pointName];
        if (!point) return;

        this.isWiring = true;
        this.startPoint = {
            componentId,
            pointName,
            point,
            element
        };

        // Visuelle Rückmeldung
        element.classList.add('highlighted');
        this.canvas.classList.add('wiring-mode');
        
        // Preview-Wire initialisieren
        this.previewWire = {
            start: { x: point.x, y: point.y },
            end: { x: point.x, y: point.y }
        };
    }

    finishWiring(componentId, pointName, element) {
        const component = this.getComponentById(componentId);
        if (!component) {
            this.cancelWiring();
            return;
        }

        const endPoint = component.connectionPoints[pointName];
        if (!endPoint) {
            this.cancelWiring();
            return;
        }

        // Prüfen ob Verbindung möglich ist
        const validationResult = this.validateConnection(
            this.startPoint.componentId, this.startPoint.pointName,
            componentId, pointName
        );

        if (!validationResult.valid) {
            this.showMessage(validationResult.message, 'warning');
            this.cancelWiring();
            return;
        }

        // Kabel erstellen
        const wire = {
            id: this.nextWireId++,
            from: {
                componentId: this.startPoint.componentId,
                pointName: this.startPoint.pointName,
                point: this.startPoint.point
            },
            to: {
                componentId: componentId,
                pointName: pointName,
                point: endPoint
            },
            type: this.determineWireType(this.startPoint.point, endPoint),
            state: 'normal' // normal, powered, error
        };

        this.wires.push(wire);
        this.updateConnectionStates(wire);
        this.redrawAllWires();
        
        // Event für neue Verbindung
        this.dispatchEvent('wireConnected', { wire });
        
        this.cancelWiring();
    }

    validateConnection(fromComponentId, fromPointName, toComponentId, toPointName) {
        // Selbstverbindung verhindern
        if (fromComponentId === toComponentId) {
            return { valid: false, message: 'Ein Bauteil kann nicht mit sich selbst verbunden werden!' };
        }

        // Bereits existierende Verbindung prüfen
        const existingWire = this.wires.find(wire =>
            (wire.from.componentId === fromComponentId && wire.from.pointName === fromPointName &&
             wire.to.componentId === toComponentId && wire.to.pointName === toPointName) ||
            (wire.from.componentId === toComponentId && wire.from.pointName === toPointName &&
             wire.to.componentId === fromComponentId && wire.to.pointName === fromPointName)
        );

        if (existingWire) {
            return { valid: false, message: 'Diese Verbindung existiert bereits!' };
        }

        // Typ-Kompatibilität prüfen
        const fromComponent = this.getComponentById(fromComponentId);
        const toComponent = this.getComponentById(toComponentId);
        
        if (!fromComponent || !toComponent) {
            return { valid: false, message: 'Komponente nicht gefunden!' };
        }

        const fromPoint = fromComponent.connectionPoints[fromPointName];
        const toPoint = toComponent.connectionPoints[toPointName];

        // Input-zu-Input oder Output-zu-Output verhindern (außer bidirectional)
        if (fromPoint.type === toPoint.type && fromPoint.type !== 'bidirectional') {
            const typeText = fromPoint.type === 'input' ? 'Eingänge' : 'Ausgänge';
            return { valid: false, message: `${typeText} können nicht miteinander verbunden werden!` };
        }

        return { valid: true };
    }

    determineWireType(fromPoint, toPoint) {
        // Bestimmt den Kabel-Typ basierend auf den Verbindungspunkten
        if (fromPoint.type === 'bidirectional' && toPoint.type === 'bidirectional') {
            return 'bidirectional';
        }
        return 'unidirectional';
    }

    updateConnectionStates(wire) {
        // Verbindungsstatus der Punkte aktualisieren
        const fromComponent = this.getComponentById(wire.from.componentId);
        const toComponent = this.getComponentById(wire.to.componentId);

        if (fromComponent && toComponent) {
            const fromPoint = fromComponent.connectionPoints[wire.from.pointName];
            const toPoint = toComponent.connectionPoints[wire.to.pointName];

            fromPoint.connected = true;
            fromPoint.connections.push(wire.id);
            
            toPoint.connected = true;
            toPoint.connections.push(wire.id);

            // Visuelle Aktualisierung der Connection Points
            this.updateConnectionPointVisuals(wire.from.componentId, wire.from.pointName);
            this.updateConnectionPointVisuals(wire.to.componentId, wire.to.pointName);
        }
    }

    updateConnectionPointVisuals(componentId, pointName) {
        const element = this.gameArea.querySelector(
            `[data-component-id="${componentId}"] .connection-point[data-point-name="${pointName}"]`
        );
        
        if (element) {
            element.classList.add('connected');
        }
    }

    cancelWiring() {
        this.isWiring = false;
        this.previewWire = null;
        
        if (this.startPoint) {
            this.startPoint.element.classList.remove('highlighted');
            this.startPoint = null;
        }
        
        this.canvas.classList.remove('wiring-mode');
        this.redrawAllWires();
    }

    handleMouseMove(event) {
        if (!this.isWiring || !this.previewWire) return;

        const rect = this.gameArea.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        this.previewWire.end.x = x;
        this.previewWire.end.y = y;
        
        this.redrawAllWires();
    }

    handleContextMenu(event) {
        event.preventDefault();
        
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const clickedWire = this.getWireAt(x, y);
        if (clickedWire) {
            this.showWireContextMenu(clickedWire, event.clientX, event.clientY);
        }
    }

    showWireContextMenu(wire, x, y) {
        const contextMenu = document.createElement('div');
        contextMenu.className = 'wire-context-menu';
        contextMenu.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            background: white;
            border: 1px solid #ddd;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            padding: 5px 0;
        `;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Kabel entfernen';
        deleteButton.style.cssText = `
            width: 100%;
            padding: 8px 15px;
            border: none;
            background: none;
            cursor: pointer;
            text-align: left;
        `;
        deleteButton.addEventListener('click', () => {
            this.removeWire(wire.id);
            contextMenu.remove();
        });

        contextMenu.appendChild(deleteButton);
        document.body.appendChild(contextMenu);

        // Schließen beim Klick außerhalb
        const closeMenu = (e) => {
            if (!contextMenu.contains(e.target)) {
                contextMenu.remove();
                document.removeEventListener('click', closeMenu);
            }
        };
        
        setTimeout(() => {
            document.addEventListener('click', closeMenu);
        }, 100);
    }

    getWireAt(x, y) {
        const tolerance = 10;
        
        for (const wire of this.wires) {
            if (this.isPointOnWire(x, y, wire, tolerance)) {
                return wire;
            }
        }
        
        return null;
    }

    isPointOnWire(x, y, wire, tolerance) {
        // Vereinfachte Kollisionserkennung für Bezier-Kurven
        const path = this.createWirePath(wire);
        const distance = this.distanceToPath(x, y, path);
        return distance <= tolerance;
    }

    distanceToPath(x, y, path) {
        // Vereinfachte Distanzberechnung zur Bezier-Kurve
        const samples = 50;
        let minDistance = Infinity;
        
        for (let i = 0; i <= samples; i++) {
            const t = i / samples;
            const point = this.getBezierPoint(path, t);
            const distance = Math.sqrt(Math.pow(x - point.x, 2) + Math.pow(y - point.y, 2));
            minDistance = Math.min(minDistance, distance);
        }
        
        return minDistance;
    }

    getBezierPoint(path, t) {
        // Berechnet einen Punkt auf der Bezier-Kurve
        const { start, cp1, cp2, end } = path;
        const mt = 1 - t;
        
        return {
            x: mt * mt * mt * start.x + 3 * mt * mt * t * cp1.x + 3 * mt * t * t * cp2.x + t * t * t * end.x,
            y: mt * mt * mt * start.y + 3 * mt * mt * t * cp1.y + 3 * mt * t * t * cp2.y + t * t * t * end.y
        };
    }

    removeWire(wireId) {
        const wireIndex = this.wires.findIndex(w => w.id === wireId);
        if (wireIndex === -1) return;

        const wire = this.wires[wireIndex];
        
        // Verbindungsstatus aktualisieren
        this.disconnectWire(wire);
        
        // Kabel entfernen
        this.wires.splice(wireIndex, 1);
        this.redrawAllWires();
        
        // Event für entfernte Verbindung
        this.dispatchEvent('wireDisconnected', { wire });
    }

    disconnectWire(wire) {
        const fromComponent = this.getComponentById(wire.from.componentId);
        const toComponent = this.getComponentById(wire.to.componentId);

        if (fromComponent) {
            const fromPoint = fromComponent.connectionPoints[wire.from.pointName];
            if (fromPoint) {
                fromPoint.connections = fromPoint.connections.filter(id => id !== wire.id);
                fromPoint.connected = fromPoint.connections.length > 0;
                
                // Visuelle Aktualisierung
                const element = this.gameArea.querySelector(
                    `[data-component-id="${wire.from.componentId}"] .connection-point[data-point-name="${wire.from.pointName}"]`
                );
                if (element && !fromPoint.connected) {
                    element.classList.remove('connected');
                }
            }
        }

        if (toComponent) {
            const toPoint = toComponent.connectionPoints[wire.to.pointName];
            if (toPoint) {
                toPoint.connections = toPoint.connections.filter(id => id !== wire.id);
                toPoint.connected = toPoint.connections.length > 0;
                
                // Visuelle Aktualisierung
                const element = this.gameArea.querySelector(
                    `[data-component-id="${wire.to.componentId}"] .connection-point[data-point-name="${wire.to.pointName}"]`
                );
                if (element && !toPoint.connected) {
                    element.classList.remove('connected');
                }
            }
        }
    }

    redrawAllWires() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Alle existierenden Kabel zeichnen
        this.wires.forEach(wire => this.drawWire(wire));
        
        // Preview-Kabel zeichnen
        if (this.previewWire) {
            this.drawPreviewWire(this.previewWire);
        }
    }

    drawWire(wire) {
        const path = this.createWirePath(wire);
        this.ctx.beginPath();
        this.ctx.moveTo(path.start.x, path.start.y);
        this.ctx.bezierCurveTo(path.cp1.x, path.cp1.y, path.cp2.x, path.cp2.y, path.end.x, path.end.y);
        
        // Kabel-Styling basierend auf Zustand
        this.ctx.lineWidth = wire.type === 'multi-core' ? 6 : 4;
        this.ctx.strokeStyle = this.getWireColor(wire.state);
        this.ctx.lineCap = 'round';
        this.ctx.stroke();
        
        // Mehrfach-Adern für komplexere Kabel
        if (wire.type === 'multi-core') {
            this.drawMultiCoreWire(path, wire);
        }
    }

    drawMultiCoreWire(path, wire) {
        // Zusätzliche Linien für Mehrfach-Adern
        const offset = 2;
        
        for (let i = -1; i <= 1; i += 2) {
            this.ctx.beginPath();
            this.ctx.moveTo(path.start.x + i * offset, path.start.y);
            this.ctx.bezierCurveTo(
                path.cp1.x + i * offset, path.cp1.y,
                path.cp2.x + i * offset, path.cp2.y,
                path.end.x + i * offset, path.end.y
            );
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = this.getWireColor(wire.state);
            this.ctx.stroke();
        }
    }

    drawPreviewWire(previewWire) {
        const path = this.createPreviewPath(previewWire);
        
        this.ctx.beginPath();
        this.ctx.moveTo(path.start.x, path.start.y);
        this.ctx.bezierCurveTo(path.cp1.x, path.cp1.y, path.cp2.x, path.cp2.y, path.end.x, path.end.y);
        
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = '#007bff';
        this.ctx.lineCap = 'round';
        this.ctx.setLineDash([5, 5]);
        this.ctx.stroke();
        this.ctx.setLineDash([]);
    }

    createWirePath(wire) {
        const start = { x: wire.from.point.x, y: wire.from.point.y };
        const end = { x: wire.to.point.x, y: wire.to.point.y };
        
        return this.calculateBezierControlPoints(start, end);
    }

    createPreviewPath(previewWire) {
        return this.calculateBezierControlPoints(previewWire.start, previewWire.end);
    }

    calculateBezierControlPoints(start, end) {
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Kontrollpunkte für natürlich aussehende Kurven
        const controlDistance = Math.min(distance * 0.3, 100);
        
        let cp1, cp2;
        
        if (Math.abs(dx) > Math.abs(dy)) {
            // Horizontale Orientierung
            cp1 = { x: start.x + controlDistance, y: start.y };
            cp2 = { x: end.x - controlDistance, y: end.y };
        } else {
            // Vertikale Orientierung
            cp1 = { x: start.x, y: start.y + controlDistance };
            cp2 = { x: end.x, y: end.y - controlDistance };
        }
        
        return { start, cp1, cp2, end };
    }

    getWireColor(state) {
        const colors = {
            normal: '#28a745',
            powered: '#007bff',
            error: '#dc3545',
            warning: '#ffc107'
        };
        return colors[state] || colors.normal;
    }

    // Event Handlers
    handleComponentMoved(event) {
        const component = event.detail.component;
        
        // Alle Kabel der bewegten Komponente aktualisieren
        this.wires.forEach(wire => {
            if (wire.from.componentId === component.id) {
                wire.from.point = component.connectionPoints[wire.from.pointName];
            }
            if (wire.to.componentId === component.id) {
                wire.to.point = component.connectionPoints[wire.to.pointName];
            }
        });
        
        this.redrawAllWires();
    }

    handleComponentRemoved(event) {
        const component = event.detail.component;
        
        // Alle Kabel der entfernten Komponente löschen
        const wirestoRemove = this.wires.filter(wire => 
            wire.from.componentId === component.id || wire.to.componentId === component.id
        );
        
        wirestoRemove.forEach(wire => this.removeWire(wire.id));
    }

    handleKeyDown(event) {
        if (event.key === 'Escape' && this.isWiring) {
            this.cancelWiring();
        }
    }

    // Hilfsfunktionen
    getComponentById(componentId) {
        // Komponente vom Drag & Drop System holen
        if (window.dragDropSystem) {
            return window.dragDropSystem.getPlacedComponents().find(comp => comp.id === componentId);
        }
        return null;
    }

    showMessage(message, type = 'info') {
        // Einfache Nachrichtenanzeige
        const messageElement = document.createElement('div');
        messageElement.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'warning' ? '#ffc107' : '#007bff'};
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 10000;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        `;
        messageElement.textContent = message;
        
        document.body.appendChild(messageElement);
        
        setTimeout(() => {
            messageElement.remove();
        }, 3000);
    }

    // Event System
    dispatchEvent(eventName, detail) {
        const event = new CustomEvent(`wiring:${eventName}`, { detail });
        document.dispatchEvent(event);
    }

    // Öffentliche API
    getWires() {
        return [...this.wires];
    }

    updateWireStates(stateMap) {
        // Kabel-Zustände basierend auf Circuit-Simulation aktualisieren
        this.wires.forEach(wire => {
            if (stateMap[wire.id]) {
                wire.state = stateMap[wire.id];
            }
        });
        this.redrawAllWires();
    }

    reset() {
        this.wires = [];
        this.cancelWiring();
        this.nextWireId = 1;
        this.redrawAllWires();
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WiringSystem;
} else {
    window.WiringSystem = WiringSystem;
}