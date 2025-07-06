// Feedback-System für Elektronik-Schaltungsergebnisse

class FeedbackSystem {
    constructor() {
        this.feedbackOverlay = null;
        this.currentFeedback = null;
        this.animationFrames = [];
        
        this.initializeElements();
    }

    initializeElements() {
        this.feedbackOverlay = document.getElementById('feedbackOverlay');
        this.feedbackIcon = document.getElementById('feedbackIcon');
        this.feedbackTitle = document.getElementById('feedbackTitle');
        this.feedbackMessage = document.getElementById('feedbackMessage');
        this.feedbackClose = document.getElementById('feedbackClose');
        
        if (this.feedbackClose) {
            this.feedbackClose.addEventListener('click', () => this.hideFeedback());
        }
        
        // ESC-Taste schließt Feedback
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isVisible()) {
                this.hideFeedback();
            }
        });
    }

    // Hauptfeedback-Funktion
    showCircuitResult(simulationResult, validationResult, level) {
        const feedbackData = this.generateFeedbackData(simulationResult, validationResult, level);
        this.displayFeedback(feedbackData);
        
        // Visuelle Effekte für Komponenten
        this.applyComponentEffects(simulationResult);
        
        // Level-spezifisches Feedback
        this.handleLevelSpecificFeedback(validationResult, level);
    }

    generateFeedbackData(simulationResult, validationResult, level) {
        const feedback = {
            type: 'info',
            icon: '⚡',
            title: 'Schaltung getestet',
            message: 'Schaltung wurde analysiert.',
            details: [],
            actions: []
        };

        // Priorität: Validierung > Simulation > Standard
        if (validationResult && validationResult.correct) {
            // Erfolgreich abgeschlossen
            feedback.type = 'success';
            feedback.icon = '🎉';
            feedback.title = 'Level abgeschlossen!';
            feedback.message = level.feedback.success || 'Perfekt! Du hast die Aufgabe erfolgreich gelöst.';
            feedback.actions.push({
                text: 'Nächstes Level',
                action: 'nextLevel',
                primary: true
            });
            feedback.actions.push({
                text: 'Wiederholen',
                action: 'reset',
                primary: false
            });
            
        } else if (simulationResult && !simulationResult.success) {
            // Simulationsfehler
            feedback.type = 'error';
            feedback.icon = '💥';
            feedback.title = 'Schaltung beschädigt!';
            feedback.message = 'Es gab ein Problem mit der Schaltung.';
            feedback.details.push(simulationResult.error);
            
        } else if (simulationResult && simulationResult.success) {
            // Simulation erfolgreich, aber nicht korrekt
            feedback.type = 'warning';
            feedback.icon = '⚠️';
            
            const hasDestroyedComponents = this.checkForDestroyedComponents(simulationResult.componentStates);
            const hasWorkingComponents = this.checkForWorkingComponents(simulationResult.componentStates);
            
            if (hasDestroyedComponents) {
                feedback.title = 'Komponenten beschädigt!';
                feedback.message = 'Einige Bauteile wurden durch falsche Verkabelung beschädigt.';
                feedback.details = this.getDestroyedComponentMessages(simulationResult.componentStates);
                
            } else if (!hasWorkingComponents) {
                feedback.title = 'Schaltung funktioniert nicht';
                feedback.message = 'Die Schaltung ist verkabelt, aber es fließt kein Strom oder die LEDs leuchten nicht.';
                feedback.details = this.getDiagnosticMessages(simulationResult, validationResult);
                
            } else {
                feedback.title = 'Teilweise funktional';
                feedback.message = 'Einige Komponenten funktionieren, aber die Lösung ist noch nicht vollständig.';
                feedback.details = this.getPartialSuccessMessages(simulationResult, validationResult);
            }
        }

        // Zusätzliche Details basierend auf Validierung
        if (validationResult && !validationResult.correct) {
            feedback.details.push(`Vollständigkeit: ${Math.round(validationResult.completeness * 100)}%`);
            if (validationResult.errors && validationResult.errors.length > 0) {
                feedback.details.push(...validationResult.errors);
            }
        }

        return feedback;
    }

    displayFeedback(feedbackData) {
        if (!this.feedbackOverlay) return;

        this.currentFeedback = feedbackData;
        
        // Icon setzen
        if (this.feedbackIcon) {
            this.feedbackIcon.textContent = feedbackData.icon;
            this.feedbackIcon.className = `feedback-icon ${feedbackData.type}`;
        }
        
        // Titel setzen
        if (this.feedbackTitle) {
            this.feedbackTitle.textContent = feedbackData.title;
        }
        
        // Nachricht und Details setzen
        if (this.feedbackMessage) {
            let messageHTML = `<p>${feedbackData.message}</p>`;
            
            if (feedbackData.details && feedbackData.details.length > 0) {
                messageHTML += '<ul class="feedback-details">';
                feedbackData.details.forEach(detail => {
                    messageHTML += `<li>${detail}</li>`;
                });
                messageHTML += '</ul>';
            }
            
            this.feedbackMessage.innerHTML = messageHTML;
        }
        
        // Aktionen hinzufügen
        this.setupFeedbackActions(feedbackData.actions);
        
        // Anzeigen
        this.showFeedback();
    }

    setupFeedbackActions(actions) {
        if (!this.feedbackClose) return;
        
        // Standard-Schließen-Button
        this.feedbackClose.textContent = 'Schließen';
        this.feedbackClose.onclick = () => this.hideFeedback();
        
        if (actions && actions.length > 0) {
            // Aktions-Container erstellen
            let actionsContainer = this.feedbackOverlay.querySelector('.feedback-actions');
            if (!actionsContainer) {
                actionsContainer = document.createElement('div');
                actionsContainer.className = 'feedback-actions';
                actionsContainer.style.cssText = `
                    display: flex;
                    gap: 10px;
                    justify-content: center;
                    margin-top: 20px;
                `;
                this.feedbackClose.parentNode.insertBefore(actionsContainer, this.feedbackClose);
            }
            
            // Bestehende Aktionen löschen
            actionsContainer.innerHTML = '';
            
            // Neue Aktionen hinzufügen
            actions.forEach(action => {
                const button = document.createElement('button');
                button.className = `btn ${action.primary ? 'btn-primary' : 'btn-secondary'}`;
                button.textContent = action.text;
                button.onclick = () => this.handleAction(action.action);
                actionsContainer.appendChild(button);
            });
            
            // Schließen-Button verstecken wenn primäre Aktionen vorhanden
            if (actions.some(a => a.primary)) {
                this.feedbackClose.style.display = 'none';
            }
        }
    }

    handleAction(actionType) {
        switch (actionType) {
            case 'nextLevel':
                this.goToNextLevel();
                break;
            case 'reset':
                this.resetLevel();
                break;
            case 'retry':
                this.hideFeedback();
                break;
            default:
                this.hideFeedback();
        }
    }

    goToNextLevel() {
        const currentLevel = GameLevels.getCurrentLevel();
        if (currentLevel) {
            // Level als abgeschlossen markieren
            GameLevels.markLevelCompleted(currentLevel.id);
            
            const nextLevel = GameLevels.getNextLevel(currentLevel.id);
            if (nextLevel) {
                window.location.href = `game.html?level=${nextLevel.id}`;
            } else {
                // Alle Level abgeschlossen
                window.location.href = `index.html?completed=${currentLevel.id}`;
            }
        }
    }

    resetLevel() {
        this.hideFeedback();
        // Reset-Event senden
        const event = new CustomEvent('feedback:reset');
        document.dispatchEvent(event);
    }

    applyComponentEffects(simulationResult) {
        if (!simulationResult || !simulationResult.componentStates) return;

        simulationResult.componentStates.forEach((state, componentId) => {
            const componentElement = document.querySelector(`[data-component-id="${componentId}"]`);
            if (!componentElement) return;

            // Bestehende Effekt-Klassen entfernen
            componentElement.classList.remove('error', 'success', 'warning', 'pulse', 'glow');

            switch (state.status) {
                case 'on':
                    componentElement.classList.add('success', 'glow');
                    if (state.brightness && state.brightness > 0.8) {
                        componentElement.classList.add('pulse');
                    }
                    break;
                    
                case 'destroyed':
                case 'overheated':
                case 'overload':
                    componentElement.classList.add('error', 'pulse');
                    this.createSparkEffect(componentElement);
                    break;
                    
                case 'reverse':
                case 'off':
                    componentElement.classList.add('warning');
                    break;
                    
                default:
                    // Normal state - keine besonderen Effekte
                    break;
            }
        });
    }

    createSparkEffect(element) {
        const rect = element.getBoundingClientRect();
        const gameArea = element.closest('.game-area');
        if (!gameArea) return;

        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const spark = document.createElement('div');
                spark.className = 'spark-effect';
                spark.style.cssText = `
                    position: absolute;
                    left: ${rect.left - gameArea.getBoundingClientRect().left + Math.random() * rect.width}px;
                    top: ${rect.top - gameArea.getBoundingClientRect().top + Math.random() * rect.height}px;
                `;
                
                gameArea.appendChild(spark);
                
                setTimeout(() => {
                    if (spark.parentNode) {
                        spark.remove();
                    }
                }, 500);
            }, i * 100);
        }
    }

    // Hilfsfunktionen für Feedback-Generierung
    checkForDestroyedComponents(componentStates) {
        return Array.from(componentStates.values()).some(state => 
            ['destroyed', 'overheated', 'overload'].includes(state.status)
        );
    }

    checkForWorkingComponents(componentStates) {
        return Array.from(componentStates.values()).some(state => 
            state.status === 'on' && state.brightness > 0
        );
    }

    getDestroyedComponentMessages(componentStates) {
        const messages = [];
        componentStates.forEach((state, componentId) => {
            if (['destroyed', 'overheated', 'overload'].includes(state.status)) {
                messages.push(state.message);
            }
        });
        return messages;
    }

    getDiagnosticMessages(simulationResult, validationResult) {
        const messages = [];
        
        // Häufige Probleme diagnostizieren
        if (validationResult && validationResult.completeness < 0.5) {
            messages.push('Es fehlen wichtige Verbindungen in der Schaltung.');
        }
        
        if (simulationResult.componentStates) {
            const hasReverseLEDs = Array.from(simulationResult.componentStates.values())
                .some(state => state.status === 'reverse');
            if (hasReverseLEDs) {
                messages.push('LED-Polung prüfen: Anode (+) an positiven Pol anschließen.');
            }
        }
        
        if (messages.length === 0) {
            messages.push('Überprüfe alle Verbindungen und stelle sicher, dass ein geschlossener Stromkreis vorliegt.');
        }
        
        return messages;
    }

    getPartialSuccessMessages(simulationResult, validationResult) {
        const messages = [];
        
        if (validationResult && validationResult.completeness > 0.5) {
            messages.push(`${Math.round(validationResult.completeness * 100)}% der Verbindungen sind korrekt.`);
        }
        
        const workingLEDs = Array.from(simulationResult.componentStates.values())
            .filter(state => state.status === 'on').length;
        
        if (workingLEDs > 0) {
            messages.push(`${workingLEDs} LED(s) funktionieren korrekt.`);
        }
        
        return messages;
    }

    handleLevelSpecificFeedback(validationResult, level) {
        if (!level || !level.feedback) return;
        
        // Level-spezifische Feedback-Nachrichten
        if (validationResult && !validationResult.correct) {
            // Spezifische Fehlermeldungen basierend auf häufigen Fehlern
            const errorType = this.detectCommonErrors(validationResult);
            if (errorType && level.feedback[errorType]) {
                // Aktualisiere die Nachricht mit spezifischerem Feedback
                if (this.feedbackMessage) {
                    const specificMessage = level.feedback[errorType];
                    this.feedbackMessage.innerHTML = `<p>${specificMessage}</p>` + this.feedbackMessage.innerHTML;
                }
            }
        }
    }

    detectCommonErrors(validationResult) {
        if (!validationResult.errors) return null;
        
        const errorText = validationResult.errors.join(' ').toLowerCase();
        
        if (errorText.includes('battery') && errorText.includes('led')) {
            return 'wrong_polarity';
        }
        if (errorText.includes('resistor')) {
            return 'no_resistor';
        }
        if (validationResult.completeness < 0.3) {
            return 'incomplete';
        }
        
        return null;
    }

    // UI-Funktionen
    showFeedback() {
        if (this.feedbackOverlay) {
            this.feedbackOverlay.classList.remove('hidden');
            // Fokus für Barrierefreiheit
            this.feedbackOverlay.focus();
        }
    }

    hideFeedback() {
        if (this.feedbackOverlay) {
            this.feedbackOverlay.classList.add('hidden');
        }
        
        // Komponenten-Effekte entfernen
        this.clearComponentEffects();
    }

    clearComponentEffects() {
        const components = document.querySelectorAll('.placed-component');
        components.forEach(component => {
            component.classList.remove('error', 'success', 'warning', 'pulse', 'glow');
        });
        
        // Spark-Effekte entfernen
        const sparks = document.querySelectorAll('.spark-effect');
        sparks.forEach(spark => spark.remove());
    }

    isVisible() {
        return this.feedbackOverlay && !this.feedbackOverlay.classList.contains('hidden');
    }

    // Einfache Nachrichtenfunktion für schnelle Updates
    showQuickMessage(message, type = 'info', duration = 3000) {
        const messageElement = document.createElement('div');
        messageElement.className = 'quick-message';
        messageElement.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${this.getTypeColor(type)};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 10001;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            animation: slideIn 0.3s ease;
        `;
        messageElement.textContent = message;
        
        document.body.appendChild(messageElement);
        
        setTimeout(() => {
            messageElement.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => {
                if (messageElement.parentNode) {
                    messageElement.remove();
                }
            }, 300);
        }, duration);
    }

    getTypeColor(type) {
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            warning: '#ffc107',
            info: '#007bff'
        };
        return colors[type] || colors.info;
    }

    // Event-System für externe Kommunikation
    dispatchEvent(eventName, detail) {
        const event = new CustomEvent(`feedback:${eventName}`, { detail });
        document.dispatchEvent(event);
    }
}

// CSS für Animationen hinzufügen
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .feedback-details {
        text-align: left;
        margin: 15px 0;
        padding-left: 20px;
    }
    
    .feedback-details li {
        margin-bottom: 5px;
        color: #666;
    }
    
    .glow {
        box-shadow: 0 0 20px rgba(40, 167, 69, 0.6) !important;
    }
`;
document.head.appendChild(style);

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FeedbackSystem;
} else {
    window.FeedbackSystem = FeedbackSystem;
}