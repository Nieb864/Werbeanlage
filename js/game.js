// Hauptspiel-Controller für das Elektronik Lernspiel

class ElectronicsGame {
    constructor() {
        this.currentLevel = null;
        this.dragDropSystem = null;
        this.wiringSystem = null;
        this.circuitSystem = null;
        this.feedbackSystem = null;
        
        this.gameCanvas = null;
        this.gameArea = null;
        
        this.isInitialized = false;
        
        this.initializeGame();
    }

    async initializeGame() {
        try {
            // DOM-Elemente laden
            this.loadDOMElements();
            
            // Level laden
            this.currentLevel = GameLevels.getCurrentLevel();
            if (!this.currentLevel) {
                throw new Error('Level nicht gefunden');
            }
            
            // Systeme initialisieren
            this.initializeSystems();
            
            // UI initialisieren
            this.initializeUI();
            
            // Level laden
            this.loadLevel(this.currentLevel);
            
            // Event-Listener einrichten
            this.setupEventListeners();
            
            this.isInitialized = true;
            console.log('Spiel erfolgreich initialisiert');
            
        } catch (error) {
            console.error('Fehler beim Initialisieren des Spiels:', error);
            this.showErrorMessage('Spiel konnte nicht geladen werden: ' + error.message);
        }
    }

    loadDOMElements() {
        this.gameCanvas = document.getElementById('gameCanvas');
        this.gameArea = document.querySelector('.game-area');
        
        if (!this.gameCanvas || !this.gameArea) {
            throw new Error('Erforderliche DOM-Elemente nicht gefunden');
        }
    }

    initializeSystems() {
        // Drag & Drop System
        this.dragDropSystem = new DragDropSystem(this.gameCanvas, this.gameArea);
        window.dragDropSystem = this.dragDropSystem; // Globale Referenz für andere Systeme
        
        // Verkabelungssystem
        this.wiringSystem = new WiringSystem(this.gameCanvas, this.gameArea);
        
        // Schaltkreis-Simulation
        this.circuitSystem = new CircuitSystem();
        
        // Feedback-System
        this.feedbackSystem = new FeedbackSystem();
    }

    initializeUI() {
        // Level-Information aktualisieren
        this.updateLevelInfo();
        
        // Button-Event-Listener
        this.setupButtonListeners();
        
        // Canvas-Größe anpassen
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    updateLevelInfo() {
        const levelTitle = document.getElementById('levelTitle');
        const levelProgress = document.getElementById('levelProgress');
        const taskDescription = document.getElementById('taskDescription');
        
        if (levelTitle && this.currentLevel) {
            levelTitle.textContent = this.currentLevel.title;
        }
        
        if (levelProgress && this.currentLevel) {
            const completedLevels = GameLevels.getCompletedLevels().length;
            const totalLevels = GameLevels.getAllLevels().length;
            levelProgress.textContent = `${completedLevels}/${totalLevels}`;
        }
        
        if (taskDescription && this.currentLevel) {
            taskDescription.textContent = this.currentLevel.taskDescription;
        }
    }

    setupButtonListeners() {
        // Zurück-Button
        const backBtn = document.getElementById('backBtn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                window.location.href = 'index.html';
            });
        }
        
        // Reset-Button
        const resetBtn = document.getElementById('resetBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetLevel());
        }
        
        // Test-Button
        const testBtn = document.getElementById('testBtn');
        if (testBtn) {
            testBtn.addEventListener('click', () => this.testCircuit());
        }
    }

    setupEventListeners() {
        // System-übergreifende Events
        document.addEventListener('dragdrop:componentPlaced', (e) => {
            this.onComponentPlaced(e.detail.component);
        });
        
        document.addEventListener('dragdrop:componentRemoved', (e) => {
            this.onComponentRemoved(e.detail.component);
        });
        
        document.addEventListener('wiring:wireConnected', (e) => {
            this.onWireConnected(e.detail.wire);
        });
        
        document.addEventListener('wiring:wireDisconnected', (e) => {
            this.onWireDisconnected(e.detail.wire);
        });
        
        document.addEventListener('feedback:reset', () => {
            this.resetLevel();
        });
        
        // Keyboard-Shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyDown(e);
        });
    }

    loadLevel(level) {
        // Titel und Beschreibung setzen
        this.updateLevelInfo();
        
        // Komponenten-Palette laden
        this.loadComponentsPalette(level.components);
        
        // Systeme zurücksetzen
        this.resetSystems();
        
        console.log(`Level ${level.id} geladen: ${level.title}`);
    }

    loadComponentsPalette(components) {
        const palette = document.getElementById('componentsPalette');
        if (!palette) return;
        
        palette.innerHTML = '';
        
        components.forEach(componentData => {
            const componentItem = this.createComponentItem(componentData);
            palette.appendChild(componentItem);
        });
    }

    createComponentItem(componentData) {
        const item = document.createElement('div');
        item.className = 'component-item';
        item.dataset.componentType = componentData.type;
        
        // Bild
        const img = document.createElement('img');
        img.src = componentData.image;
        img.alt = componentData.name;
        img.onerror = () => {
            // Fallback für fehlende Bilder
            img.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.textContent = componentData.name;
            placeholder.style.cssText = `
                display: flex;
                align-items: center;
                justify-content: center;
                height: 40px;
                background: #f8f9fa;
                border: 1px dashed #dee2e6;
                font-size: 0.8em;
                text-align: center;
            `;
            item.insertBefore(placeholder, img);
        };
        
        // Name
        const name = document.createElement('div');
        name.className = 'component-name';
        name.textContent = componentData.name;
        
        // Anzahl
        const count = document.createElement('div');
        count.className = 'component-count';
        count.textContent = componentData.count;
        
        item.appendChild(img);
        item.appendChild(name);
        item.appendChild(count);
        
        return item;
    }

    resizeCanvas() {
        if (!this.gameCanvas || !this.gameArea) return;
        
        const rect = this.gameArea.getBoundingClientRect();
        this.gameCanvas.width = rect.width;
        this.gameCanvas.height = rect.height;
        
        // Kabel neu zeichnen
        if (this.wiringSystem) {
            this.wiringSystem.redrawAllWires();
        }
    }

    // Event-Handler
    onComponentPlaced(component) {
        console.log('Komponente platziert:', component.type);
        // Automatisch Schaltung testen wenn bestimmte Bedingungen erfüllt sind
        this.checkAutoTest();
    }

    onComponentRemoved(component) {
        console.log('Komponente entfernt:', component.type);
    }

    onWireConnected(wire) {
        console.log('Kabel verbunden:', wire.id);
        this.checkAutoTest();
    }

    onWireDisconnected(wire) {
        console.log('Kabel getrennt:', wire.id);
    }

    checkAutoTest() {
        // Automatisch testen wenn alle Komponenten platziert sind
        const placedComponents = this.dragDropSystem.getPlacedComponents();
        const requiredComponentCount = this.currentLevel.components.reduce((sum, comp) => sum + comp.count, 0);
        
        if (placedComponents.length === requiredComponentCount) {
            // Kurze Verzögerung für bessere UX
            setTimeout(() => {
                if (this.feedbackSystem) {
                    this.feedbackSystem.showQuickMessage('Alle Komponenten platziert - bereit zum Testen!', 'info');
                }
            }, 500);
        }
    }

    // Hauptfunktionen
    testCircuit() {
        if (!this.isInitialized) {
            console.error('Spiel noch nicht initialisiert');
            return;
        }
        
        try {
            // Aktuelle Schaltung abrufen
            const components = this.dragDropSystem.getPlacedComponents();
            const wires = this.wiringSystem.getWires();
            
            if (components.length === 0) {
                this.feedbackSystem.showQuickMessage('Platziere zuerst einige Komponenten!', 'warning');
                return;
            }
            
            if (wires.length === 0) {
                this.feedbackSystem.showQuickMessage('Verbinde die Komponenten mit Kabeln!', 'warning');
                return;
            }
            
            // Schaltung simulieren
            this.circuitSystem.loadCircuit(components, wires);
            const simulationResult = this.circuitSystem.simulate();
            
            // Gegen Level-Lösung validieren
            const validationResult = this.circuitSystem.validateAgainstSolution(this.currentLevel.solution);
            
            // Kabel-Zustände aktualisieren
            if (simulationResult.success && simulationResult.wireStates) {
                const wireStateMap = {};
                simulationResult.wireStates.forEach((state, wireId) => {
                    wireStateMap[wireId] = state;
                });
                this.wiringSystem.updateWireStates(wireStateMap);
            }
            
            // Feedback anzeigen
            this.feedbackSystem.showCircuitResult(simulationResult, validationResult, this.currentLevel);
            
            console.log('Simulation:', simulationResult);
            console.log('Validierung:', validationResult);
            
        } catch (error) {
            console.error('Fehler beim Testen der Schaltung:', error);
            this.feedbackSystem.showQuickMessage('Fehler beim Testen der Schaltung!', 'error');
        }
    }

    resetLevel() {
        if (!this.isInitialized) return;
        
        // Bestätigung anfordern
        if (this.dragDropSystem.getPlacedComponents().length > 0 || this.wiringSystem.getWires().length > 0) {
            if (!confirm('Möchtest du wirklich alle Komponenten und Verbindungen zurücksetzen?')) {
                return;
            }
        }
        
        this.resetSystems();
        this.feedbackSystem.showQuickMessage('Level zurückgesetzt', 'info');
    }

    resetSystems() {
        if (this.dragDropSystem) {
            this.dragDropSystem.reset();
        }
        
        if (this.wiringSystem) {
            this.wiringSystem.reset();
        }
        
        if (this.circuitSystem) {
            this.circuitSystem.reset();
        }
        
        if (this.feedbackSystem) {
            this.feedbackSystem.clearComponentEffects();
        }
        
        // Komponenten-Palette zurücksetzen
        if (this.currentLevel) {
            this.loadComponentsPalette(this.currentLevel.components);
        }
    }

    handleKeyDown(event) {
        // Keyboard-Shortcuts
        switch (event.key) {
            case 'Enter':
                if (event.ctrlKey || event.metaKey) {
                    event.preventDefault();
                    this.testCircuit();
                }
                break;
                
            case 'r':
                if (event.ctrlKey || event.metaKey) {
                    event.preventDefault();
                    this.resetLevel();
                }
                break;
                
            case 'Escape':
                // Feedback schließen falls offen
                if (this.feedbackSystem && this.feedbackSystem.isVisible()) {
                    this.feedbackSystem.hideFeedback();
                }
                break;
        }
    }

    // Hilfsfunktionen
    showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #dc3545;
            color: white;
            padding: 20px;
            border-radius: 10px;
            z-index: 10000;
            text-align: center;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        `;
        errorDiv.innerHTML = `
            <h3>Fehler</h3>
            <p>${message}</p>
            <button onclick="window.location.href='index.html'" class="btn btn-secondary" style="margin-top: 10px;">
                Zurück zur Startseite
            </button>
        `;
        
        document.body.appendChild(errorDiv);
    }

    // Debug-Funktionen
    debugInfo() {
        console.log('=== Debug-Informationen ===');
        console.log('Aktuelles Level:', this.currentLevel);
        console.log('Platzierte Komponenten:', this.dragDropSystem?.getPlacedComponents());
        console.log('Kabel:', this.wiringSystem?.getWires());
        console.log('Initialisiert:', this.isInitialized);
    }

    // Öffentliche API
    getCurrentLevel() {
        return this.currentLevel;
    }

    isGameInitialized() {
        return this.isInitialized;
    }
}

// Spiel starten wenn DOM geladen ist
document.addEventListener('DOMContentLoaded', function() {
    // Global verfügbare Instanz
    window.electronicsGame = new ElectronicsGame();
    
    // Debug-Funktion global verfügbar machen
    window.debugGame = () => window.electronicsGame.debugInfo();
    
    // Entwicklungshelfer
    if (new URLSearchParams(window.location.search).get('debug') === 'true') {
        console.log('Debug-Modus aktiviert');
        window.debugGame();
    }
});

// Export für Module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ElectronicsGame;
} else {
    window.ElectronicsGame = ElectronicsGame;
}