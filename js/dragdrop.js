// Drag & Drop System für Elektronik-Bauteile

class DragDropSystem {
    constructor(canvas, gameArea) {
        this.canvas = canvas;
        this.gameArea = gameArea;
        this.placedComponents = [];
        this.draggedComponent = null;
        this.dragOffset = { x: 0, y: 0 };
        this.isDragging = false;
        this.nextComponentId = 1;
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Component Palette Events
        this.setupPaletteEvents();
        
        // Canvas Events für platzierte Komponenten
        this.canvas.addEventListener('mousedown', this.handleCanvasMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.handleCanvasMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.handleCanvasMouseUp.bind(this));
        
        // Touch Events für mobile Geräte
        this.canvas.addEventListener('touchstart', this.handleTouchStart.bind(this));
        this.canvas.addEventListener('touchmove', this.handleTouchMove.bind(this));
        this.canvas.addEventListener('touchend', this.handleTouchEnd.bind(this));
        
        // Verhindern des Standard-Drag-Verhaltens
        this.canvas.addEventListener('dragover', e => e.preventDefault());
        this.canvas.addEventListener('drop', this.handleCanvasDrop.bind(this));
        
        // Keyboard Events
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    setupPaletteEvents() {
        const componentsPalette = document.getElementById('componentsPalette');
        if (!componentsPalette) return;

        componentsPalette.addEventListener('mousedown', (e) => {
            const componentItem = e.target.closest('.component-item');
            if (componentItem) {
                this.startDragFromPalette(componentItem, e);
            }
        });

        // Touch Events für Palette
        componentsPalette.addEventListener('touchstart', (e) => {
            const componentItem = e.target.closest('.component-item');
            if (componentItem) {
                e.preventDefault();
                this.startDragFromPalette(componentItem, e.touches[0]);
            }
        }, { passive: false });
    }

    startDragFromPalette(componentItem, event) {
        const componentType = componentItem.dataset.componentType;
        const componentData = this.getComponentData(componentType);
        
        if (!componentData) return;

        // Prüfen ob noch Komponenten verfügbar sind
        const usedCount = this.getUsedComponentCount(componentType);
        if (usedCount >= componentData.count) {
            this.showMessage('Keine weiteren Komponenten dieses Typs verfügbar!', 'warning');
            return;
        }

        this.isDragging = true;
        this.createDragPreview(componentData, event);
        
        document.addEventListener('mousemove', this.handlePaletteDragMove.bind(this));
        document.addEventListener('mouseup', this.handlePaletteDragEnd.bind(this));
        document.addEventListener('touchmove', this.handlePaletteDragMove.bind(this));
        document.addEventListener('touchend', this.handlePaletteDragEnd.bind(this));
    }

    createDragPreview(componentData, event) {
        this.dragPreview = document.createElement('div');
        this.dragPreview.className = 'drag-preview';
        this.dragPreview.style.cssText = `
            position: fixed;
            pointer-events: none;
            z-index: 1000;
            background: white;
            border: 2px solid #007bff;
            border-radius: 8px;
            padding: 5px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            opacity: 0.8;
        `;

        const img = document.createElement('img');
        img.src = componentData.image;
        img.style.cssText = `
            width: ${componentData.width || 60}px;
            height: ${componentData.height || 40}px;
            display: block;
        `;

        this.dragPreview.appendChild(img);
        document.body.appendChild(this.dragPreview);

        this.updateDragPreviewPosition(event);
    }

    updateDragPreviewPosition(event) {
        if (!this.dragPreview) return;
        
        const x = event.clientX || event.pageX;
        const y = event.clientY || event.pageY;
        
        this.dragPreview.style.left = (x - 30) + 'px';
        this.dragPreview.style.top = (y - 20) + 'px';
    }

    handlePaletteDragMove(event) {
        if (!this.isDragging) return;
        
        event.preventDefault();
        const moveEvent = event.touches ? event.touches[0] : event;
        this.updateDragPreviewPosition(moveEvent);
    }

    handlePaletteDragEnd(event) {
        if (!this.isDragging) return;

        const dropEvent = event.changedTouches ? event.changedTouches[0] : event;
        const canvasRect = this.canvas.getBoundingClientRect();
        
        // Prüfen ob Drop auf Canvas erfolgt
        if (dropEvent.clientX >= canvasRect.left && dropEvent.clientX <= canvasRect.right &&
            dropEvent.clientY >= canvasRect.top && dropEvent.clientY <= canvasRect.bottom) {
            
            const canvasX = dropEvent.clientX - canvasRect.left;
            const canvasY = dropEvent.clientY - canvasRect.top;
            
            this.placeComponentOnCanvas(this.getCurrentComponentType(), canvasX, canvasY);
        }

        this.cleanupDrag();
    }

    getCurrentComponentType() {
        // Ermittelt den aktuellen Komponententyp basierend auf dem Drag-Vorgang
        const draggedElement = document.querySelector('.component-item:hover') || 
                              document.querySelector('.component-item[data-dragging="true"]');
        return draggedElement ? draggedElement.dataset.componentType : null;
    }

    placeComponentOnCanvas(componentType, x, y) {
        if (!componentType) return;

        const componentData = this.getComponentData(componentType);
        const definition = GameLevels.getComponentDefinition(componentType);
        
        if (!componentData || !definition) return;

        // Prüfen ob Platzierung möglich ist
        if (!this.canPlaceComponent(x, y, definition)) {
            this.showMessage('Komponente kann hier nicht platziert werden!', 'warning');
            return;
        }

        const component = {
            id: this.nextComponentId++,
            type: componentType,
            x: x - definition.width / 2,
            y: y - definition.height / 2,
            width: definition.width,
            height: definition.height,
            connectionPoints: this.createConnectionPoints(x - definition.width / 2, y - definition.height / 2, definition),
            data: componentData,
            definition: definition
        };

        this.placedComponents.push(component);
        this.renderComponent(component);
        this.updateComponentCount(componentType);

        // Event für Komponenten-Platzierung
        this.dispatchEvent('componentPlaced', { component });
    }

    canPlaceComponent(x, y, definition) {
        const margin = 10;
        const newBounds = {
            left: x - definition.width / 2 - margin,
            right: x + definition.width / 2 + margin,
            top: y - definition.height / 2 - margin,
            bottom: y + definition.height / 2 + margin
        };

        // Prüfen auf Überlappung mit existierenden Komponenten
        return !this.placedComponents.some(component => {
            const bounds = {
                left: component.x - margin,
                right: component.x + component.width + margin,
                top: component.y - margin,
                bottom: component.y + component.height + margin
            };

            return !(newBounds.right < bounds.left || 
                    newBounds.left > bounds.right || 
                    newBounds.bottom < bounds.top || 
                    newBounds.top > bounds.bottom);
        });
    }

    createConnectionPoints(componentX, componentY, definition) {
        const points = {};
        
        for (const [name, point] of Object.entries(definition.connectionPoints)) {
            points[name] = {
                x: componentX + point.x,
                y: componentY + point.y,
                type: point.type,
                connected: false,
                connections: []
            };
        }
        
        return points;
    }

    renderComponent(component) {
        const componentElement = document.createElement('div');
        componentElement.className = 'placed-component';
        componentElement.dataset.componentId = component.id;
        componentElement.style.cssText = `
            position: absolute;
            left: ${component.x}px;
            top: ${component.y}px;
            width: ${component.width}px;
            height: ${component.height}px;
            cursor: move;
            pointer-events: auto;
            z-index: 15;
        `;

        const img = document.createElement('img');
        img.src = component.data.image;
        img.style.cssText = `
            width: 100%;
            height: 100%;
            object-fit: contain;
            pointer-events: none;
        `;

        componentElement.appendChild(img);
        
        // Connection Points hinzufügen
        this.addConnectionPointsToElement(componentElement, component);
        
        this.gameArea.appendChild(componentElement);
    }

    addConnectionPointsToElement(element, component) {
        for (const [name, point] of Object.entries(component.connectionPoints)) {
            const pointElement = document.createElement('div');
            pointElement.className = 'connection-point';
            pointElement.dataset.pointName = name;
            pointElement.dataset.componentId = component.id;
            pointElement.style.cssText = `
                position: absolute;
                left: ${point.x - component.x}px;
                top: ${point.y - component.y}px;
                width: 12px;
                height: 12px;
                background: #28a745;
                border: 2px solid white;
                border-radius: 50%;
                cursor: pointer;
                pointer-events: auto;
                z-index: 20;
                transform: translate(-50%, -50%);
            `;
            pointElement.title = `${component.type} - ${name}`;

            element.appendChild(pointElement);
        }
        
        // Interaktive Schalter hinzufügen
        if (component.type === 'switch') {
            const switchButton = document.createElement('div');
            switchButton.className = 'switch-button';
            switchButton.dataset.componentId = component.id;
            switchButton.style.cssText = `
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 20px;
                height: 15px;
                background: ${component.definition.state === 'closed' ? '#28a745' : '#dc3545'};
                border: 2px solid #fff;
                border-radius: 3px;
                cursor: pointer;
                z-index: 20;
                transition: all 0.3s ease;
            `;
            switchButton.title = component.definition.state === 'closed' ? 'EIN - Klicken zum Ausschalten' : 'AUS - Klicken zum Einschalten';
            
            // Click-Event für Schalter
            switchButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleSwitch(component.id);
            });
            
            element.appendChild(switchButton);
        }
    }

    // Canvas Mouse Events für platzierte Komponenten
    handleCanvasMouseDown(event) {
        const component = this.getComponentAt(event.offsetX, event.offsetY);
        if (component) {
            this.startComponentDrag(component, event);
        }
    }

    handleCanvasMouseMove(event) {
        if (this.draggedComponent) {
            this.updateComponentPosition(event);
        }
    }

    handleCanvasMouseUp(event) {
        if (this.draggedComponent) {
            this.endComponentDrag();
        }
    }

    getComponentAt(x, y) {
        return this.placedComponents.find(component => 
            x >= component.x && x <= component.x + component.width &&
            y >= component.y && y <= component.y + component.height
        );
    }

    startComponentDrag(component, event) {
        this.draggedComponent = component;
        this.dragOffset.x = event.offsetX - component.x;
        this.dragOffset.y = event.offsetY - component.y;
        
        const element = this.gameArea.querySelector(`[data-component-id="${component.id}"]`);
        if (element) {
            element.classList.add('dragging');
        }
    }

    updateComponentPosition(event) {
        if (!this.draggedComponent) return;

        const newX = event.offsetX - this.dragOffset.x;
        const newY = event.offsetY - this.dragOffset.y;

        // Grenzen des Canvas prüfen
        const maxX = this.canvas.width - this.draggedComponent.width;
        const maxY = this.canvas.height - this.draggedComponent.height;

        this.draggedComponent.x = Math.max(0, Math.min(newX, maxX));
        this.draggedComponent.y = Math.max(0, Math.min(newY, maxY));

        // Connection Points aktualisieren
        this.updateConnectionPoints(this.draggedComponent);

        // Element-Position aktualisieren
        const element = this.gameArea.querySelector(`[data-component-id="${this.draggedComponent.id}"]`);
        if (element) {
            element.style.left = this.draggedComponent.x + 'px';
            element.style.top = this.draggedComponent.y + 'px';
        }
    }

    updateConnectionPoints(component) {
        const definition = component.definition;
        
        for (const [name, point] of Object.entries(component.connectionPoints)) {
            const originalPoint = definition.connectionPoints[name];
            point.x = component.x + originalPoint.x;
            point.y = component.y + originalPoint.y;
        }

        // Connection Point Elemente aktualisieren
        const element = this.gameArea.querySelector(`[data-component-id="${component.id}"]`);
        if (element) {
            const pointElements = element.querySelectorAll('.connection-point');
            pointElements.forEach(pointElement => {
                const pointName = pointElement.dataset.pointName;
                const point = component.connectionPoints[pointName];
                if (point) {
                    pointElement.style.left = (point.x - component.x) + 'px';
                    pointElement.style.top = (point.y - component.y) + 'px';
                }
            });
        }
    }

    endComponentDrag() {
        if (this.draggedComponent) {
            const element = this.gameArea.querySelector(`[data-component-id="${this.draggedComponent.id}"]`);
            if (element) {
                element.classList.remove('dragging');
            }
            
            this.dispatchEvent('componentMoved', { component: this.draggedComponent });
            this.draggedComponent = null;
        }
    }

    // Canvas Drop Handler (fehlende Methode)
    handleCanvasDrop(event) {
        event.preventDefault();
        
        // HTML5 Drag & Drop handling
        const dragData = event.dataTransfer?.getData('text/plain');
        if (dragData) {
            try {
                const componentData = JSON.parse(dragData);
                const rect = this.canvas.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                
                this.placeComponentOnCanvas(componentData.type, x, y);
            } catch (error) {
                console.error('Fehler beim Drop-Handling:', error);
            }
        }
    }

    // Touch Events
    handleTouchStart(event) {
        if (event.touches.length === 1) {
            const touch = event.touches[0];
            const rect = this.canvas.getBoundingClientRect();
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            
            const component = this.getComponentAt(x, y);
            if (component) {
                event.preventDefault();
                this.startComponentDrag(component, { offsetX: x, offsetY: y });
            }
        }
    }

    handleTouchMove(event) {
        if (this.draggedComponent && event.touches.length === 1) {
            event.preventDefault();
            const touch = event.touches[0];
            const rect = this.canvas.getBoundingClientRect();
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            
            this.updateComponentPosition({ offsetX: x, offsetY: y });
        }
    }

    handleTouchEnd(event) {
        if (this.draggedComponent) {
            event.preventDefault();
            this.endComponentDrag();
        }
    }

    // Keyboard Events
    handleKeyDown(event) {
        if (event.key === 'Delete' || event.key === 'Backspace') {
            this.deleteSelectedComponent();
        } else if (event.key === 'Escape') {
            this.clearSelection();
        }
    }

    // Hilfsfunktionen
    getComponentData(componentType) {
        const level = GameLevels.getCurrentLevel();
        return level ? level.components.find(comp => comp.type === componentType) : null;
    }

    getUsedComponentCount(componentType) {
        return this.placedComponents.filter(comp => comp.type === componentType).length;
    }

    updateComponentCount(componentType) {
        const componentData = this.getComponentData(componentType);
        const usedCount = this.getUsedComponentCount(componentType);
        
        const componentItem = document.querySelector(`[data-component-type="${componentType}"]`);
        if (componentItem && componentData) {
            const countElement = componentItem.querySelector('.component-count');
            if (countElement) {
                const remaining = componentData.count - usedCount;
                countElement.textContent = remaining;
                countElement.style.display = remaining > 0 ? 'flex' : 'none';
            }

            // Komponente deaktivieren wenn keine mehr verfügbar
            if (remaining <= 0) {
                componentItem.classList.add('disabled');
                componentItem.style.opacity = '0.5';
                componentItem.style.cursor = 'not-allowed';
            }
        }
    }

    deleteSelectedComponent() {
        // Implementation für Komponenten-Löschung
        const selectedElement = this.gameArea.querySelector('.placed-component.selected');
        if (selectedElement) {
            const componentId = parseInt(selectedElement.dataset.componentId);
            this.removeComponent(componentId);
        }
    }

    removeComponent(componentId) {
        const componentIndex = this.placedComponents.findIndex(comp => comp.id === componentId);
        if (componentIndex === -1) return;

        const component = this.placedComponents[componentIndex];
        
        // Verbindungen entfernen
        this.dispatchEvent('componentRemoved', { component });
        
        // Komponente aus Array entfernen
        this.placedComponents.splice(componentIndex, 1);
        
        // Element aus DOM entfernen
        const element = this.gameArea.querySelector(`[data-component-id="${componentId}"]`);
        if (element) {
            element.remove();
        }
        
        // Komponentenzähler aktualisieren
        this.updateComponentCount(component.type);
    }

    cleanupDrag() {
        this.isDragging = false;
        
        if (this.dragPreview) {
            this.dragPreview.remove();
            this.dragPreview = null;
        }

        // Event Listeners entfernen
        document.removeEventListener('mousemove', this.handlePaletteDragMove.bind(this));
        document.removeEventListener('mouseup', this.handlePaletteDragEnd.bind(this));
        document.removeEventListener('touchmove', this.handlePaletteDragMove.bind(this));
        document.removeEventListener('touchend', this.handlePaletteDragEnd.bind(this));
    }

    clearSelection() {
        const selectedElements = this.gameArea.querySelectorAll('.placed-component.selected');
        selectedElements.forEach(element => element.classList.remove('selected'));
    }

    // Event System
    dispatchEvent(eventName, detail) {
        const event = new CustomEvent(`dragdrop:${eventName}`, { detail });
        document.dispatchEvent(event);
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

    // Öffentliche API
    getPlacedComponents() {
        return [...this.placedComponents];
    }

    reset() {
        this.placedComponents.forEach(component => {
            const element = this.gameArea.querySelector(`[data-component-id="${component.id}"]`);
            if (element) {
                element.remove();
            }
        });
        
        this.placedComponents = [];
        this.nextComponentId = 1;
        
        // Komponentenzähler zurücksetzen
        const level = GameLevels.getCurrentLevel();
        if (level) {
            level.components.forEach(componentData => {
                this.updateComponentCount(componentData.type);
            });
        }
    }

    // Neue Funktion: Schalter umschalten
    toggleSwitch(componentId) {
        const component = this.placedComponents.find(comp => comp.id === componentId);
        if (!component || component.type !== 'switch') return;
        
        // Zustand umschalten
        const newState = component.definition.state === 'closed' ? 'open' : 'closed';
        component.definition.state = newState;
        
        // Button-Farbe aktualisieren
        const switchButton = this.gameArea.querySelector(`[data-component-id="${componentId}"] .switch-button`);
        if (switchButton) {
            switchButton.style.background = newState === 'closed' ? '#28a745' : '#dc3545';
            switchButton.title = newState === 'closed' ? 'EIN - Klicken zum Ausschalten' : 'AUS - Klicken zum Einschalten';
        }
        
        // Event für Schalter-Änderung
        this.dispatchEvent('switchToggled', { component, newState });
        
        // Visual Feedback
        this.showMessage(`Schalter ${newState === 'closed' ? 'EIN' : 'AUS'}geschaltet`, 'info');
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DragDropSystem;
} else {
    window.DragDropSystem = DragDropSystem;
}