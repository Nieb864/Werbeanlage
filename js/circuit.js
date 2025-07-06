// Circuit-System für Elektronik-Schaltungssimulation

class CircuitSystem {
    constructor() {
        this.components = [];
        this.wires = [];
        this.simulationState = 'idle'; // idle, running, error
        this.powerSources = [];
        this.loads = [];
        this.switches = [];
    }

    // Schaltung laden
    loadCircuit(components, wires) {
        this.components = components;
        this.wires = wires;
        this.categorizeComponents();
    }

    categorizeComponents() {
        this.powerSources = this.components.filter(comp => comp.type === 'battery');
        this.loads = this.components.filter(comp => comp.type === 'led');
        this.switches = this.components.filter(comp => comp.type === 'switch');
    }

    // Hauptsimulation
    simulate() {
        try {
            this.simulationState = 'running';
            
            // Netzwerk aufbauen
            const network = this.buildNetwork();
            
            // Spannung von Stromquellen propagieren
            const voltageMap = this.propagateVoltage(network);
            
            // Ströme berechnen
            const currentMap = this.calculateCurrents(network, voltageMap);
            
            // Komponenten-Zustände aktualisieren
            const componentStates = this.updateComponentStates(voltageMap, currentMap);
            
            // Kabel-Zustände aktualisieren
            const wireStates = this.updateWireStates(currentMap, voltageMap);
            
            // Ergebnis zusammenstellen
            const result = {
                success: true,
                componentStates,
                wireStates,
                voltageMap,
                currentMap,
                network
            };

            this.simulationState = 'idle';
            return result;

        } catch (error) {
            this.simulationState = 'error';
            return {
                success: false,
                error: error.message,
                componentStates: {},
                wireStates: {}
            };
        }
    }

    buildNetwork() {
        const network = {
            nodes: new Map(),
            edges: []
        };

        // Knoten für alle Verbindungspunkte erstellen
        this.components.forEach(component => {
            Object.entries(component.connectionPoints).forEach(([pointName, point]) => {
                const nodeId = `${component.id}_${pointName}`;
                network.nodes.set(nodeId, {
                    id: nodeId,
                    componentId: component.id,
                    pointName: pointName,
                    point: point,
                    component: component,
                    voltage: null,
                    current: 0,
                    connections: []
                });
            });
        });

        // Kanten für alle Verbindungen erstellen
        this.wires.forEach(wire => {
            const fromNodeId = `${wire.from.componentId}_${wire.from.pointName}`;
            const toNodeId = `${wire.to.componentId}_${wire.to.pointName}`;
            
            const fromNode = network.nodes.get(fromNodeId);
            const toNode = network.nodes.get(toNodeId);

            if (fromNode && toNode) {
                const edge = {
                    id: wire.id,
                    from: fromNode,
                    to: toNode,
                    wire: wire,
                    resistance: this.getWireResistance(wire),
                    current: 0
                };

                network.edges.push(edge);
                fromNode.connections.push(edge);
                toNode.connections.push(edge);
            }
        });

        return network;
    }

    getWireResistance(wire) {
        // Minimaler Widerstand für Kabel (in Ohm)
        return 0.01;
    }

    propagateVoltage(network) {
        const voltageMap = new Map();
        
        // Alle Spannungen zurücksetzen
        network.nodes.forEach(node => {
            node.voltage = null;
        });

        // Stromquellen als Spannungsreferenz setzen
        this.powerSources.forEach(battery => {
            const positiveNode = network.nodes.get(`${battery.id}_positive`);
            const negativeNode = network.nodes.get(`${battery.id}_negative`);
            
            if (positiveNode && negativeNode) {
                positiveNode.voltage = this.getBatteryVoltage(battery);
                negativeNode.voltage = 0; // Referenzpotential
                
                voltageMap.set(positiveNode.id, positiveNode.voltage);
                voltageMap.set(negativeNode.id, negativeNode.voltage);
            }
        });

        // Spannungen durch das Netzwerk propagieren
        this.propagateVoltageRecursive(network, voltageMap);

        return voltageMap;
    }

    propagateVoltageRecursive(network, voltageMap) {
        let changed = true;
        let iterations = 0;
        const maxIterations = 100;

        while (changed && iterations < maxIterations) {
            changed = false;
            iterations++;

            network.edges.forEach(edge => {
                const fromVoltage = voltageMap.get(edge.from.id);
                const toVoltage = voltageMap.get(edge.to.id);

                // Spannungsgleichheit bei direkter Verbindung (ohne Widerstand)
                if (this.isDirectConnection(edge)) {
                    if (fromVoltage !== null && toVoltage === null) {
                        voltageMap.set(edge.to.id, fromVoltage);
                        edge.to.voltage = fromVoltage;
                        changed = true;
                    } else if (toVoltage !== null && fromVoltage === null) {
                        voltageMap.set(edge.from.id, toVoltage);
                        edge.from.voltage = toVoltage;
                        changed = true;
                    }
                }
            });

            // Schalter berücksichtigen
            this.handleSwitches(network, voltageMap);
        }
    }

    isDirectConnection(edge) {
        // Prüft ob es sich um eine direkte Verbindung handelt
        // (ohne signifikanten Widerstand oder Komponenten dazwischen)
        return edge.resistance < 0.1;
    }

    handleSwitches(network, voltageMap) {
        this.switches.forEach(switchComponent => {
            const inputNode = network.nodes.get(`${switchComponent.id}_input`);
            const outputNode = network.nodes.get(`${switchComponent.id}_output`);
            
            if (inputNode && outputNode) {
                const switchState = this.getSwitchState(switchComponent);
                
                if (switchState === 'closed') {
                    // Schalter geschlossen - Spannungen angleichen
                    const inputVoltage = voltageMap.get(inputNode.id);
                    const outputVoltage = voltageMap.get(outputNode.id);
                    
                    if (inputVoltage !== null && outputVoltage === null) {
                        voltageMap.set(outputNode.id, inputVoltage);
                        outputNode.voltage = inputVoltage;
                    } else if (outputVoltage !== null && inputVoltage === null) {
                        voltageMap.set(inputNode.id, outputVoltage);
                        inputNode.voltage = outputVoltage;
                    }
                }
                // Bei offenem Schalter findet keine Spannungsübertragung statt
            }
        });
    }

    calculateCurrents(network, voltageMap) {
        const currentMap = new Map();
        
        // Für jede Kante Strom berechnen
        network.edges.forEach(edge => {
            const fromVoltage = voltageMap.get(edge.from.id) || 0;
            const toVoltage = voltageMap.get(edge.to.id) || 0;
            const voltageDifference = fromVoltage - toVoltage;
            
            // Ohmsches Gesetz: I = U / R
            const totalResistance = this.calculateTotalResistance(edge);
            const current = totalResistance > 0 ? voltageDifference / totalResistance : 0;
            
            edge.current = current;
            currentMap.set(edge.id, current);
        });

        return currentMap;
    }

    calculateTotalResistance(edge) {
        let totalResistance = edge.resistance;
        
        // Widerstand von Komponenten hinzufügen
        const fromComponent = edge.from.component;
        const toComponent = edge.to.component;
        
        // LED-Widerstand
        if (fromComponent.type === 'led') {
            totalResistance += this.getLEDResistance(fromComponent);
        }
        if (toComponent.type === 'led') {
            totalResistance += this.getLEDResistance(toComponent);
        }
        
        // Widerstand von Widerständen
        if (fromComponent.type === 'resistor') {
            totalResistance += this.getResistorValue(fromComponent);
        }
        if (toComponent.type === 'resistor') {
            totalResistance += this.getResistorValue(toComponent);
        }
        
        return Math.max(totalResistance, 0.01); // Minimum-Widerstand
    }

    updateComponentStates(voltageMap, currentMap) {
        const componentStates = new Map();
        
        this.components.forEach(component => {
            let state = this.calculateComponentState(component, voltageMap, currentMap);
            componentStates.set(component.id, state);
        });
        
        return componentStates;
    }

    calculateComponentState(component, voltageMap, currentMap) {
        switch (component.type) {
            case 'led':
                return this.calculateLEDState(component, voltageMap, currentMap);
            case 'battery':
                return this.calculateBatteryState(component, voltageMap, currentMap);
            case 'resistor':
                return this.calculateResistorState(component, voltageMap, currentMap);
            case 'switch':
                return this.calculateSwitchState(component, voltageMap, currentMap);
            default:
                return { status: 'normal', message: 'Unbekannte Komponente' };
        }
    }

    calculateLEDState(led, voltageMap, currentMap) {
        const anodeVoltage = voltageMap.get(`${led.id}_anode`) || 0;
        const cathodeVoltage = voltageMap.get(`${led.id}_cathode`) || 0;
        const voltageDrop = anodeVoltage - cathodeVoltage;
        
        const forwardVoltage = 2.0; // Typische LED Durchlassspannung in Volt
        const maxCurrent = 0.02; // 20mA maximaler Strom
        
        // Strom durch LED berechnen
        const current = this.getCurrentThroughComponent(led, currentMap);
        
        if (voltageDrop < forwardVoltage * 0.8) {
            return { 
                status: 'off', 
                message: 'LED ist aus - zu geringe Spannung',
                brightness: 0
            };
        } else if (voltageDrop >= forwardVoltage && current > 0 && current <= maxCurrent) {
            const brightness = Math.min(current / maxCurrent, 1);
            return { 
                status: 'on', 
                message: 'LED leuchtet',
                brightness: brightness
            };
        } else if (current > maxCurrent) {
            return { 
                status: 'destroyed', 
                message: 'LED zerstört - zu hoher Strom',
                brightness: 0
            };
        } else if (voltageDrop < 0) {
            return { 
                status: 'reverse', 
                message: 'LED in Sperrrichtung - falsche Polung',
                brightness: 0
            };
        }
        
        return { 
            status: 'off', 
            message: 'LED ist aus',
            brightness: 0
        };
    }

    calculateBatteryState(battery, voltageMap, currentMap) {
        const current = this.getCurrentThroughComponent(battery, currentMap);
        const voltage = this.getBatteryVoltage(battery);
        
        if (Math.abs(current) > 1.0) { // 1A maximaler Strom
            return { 
                status: 'overload', 
                message: 'Batterie überlastet - Kurzschluss möglich',
                current: current
            };
        }
        
        return { 
            status: 'normal', 
            message: `Batterie liefert ${voltage}V`,
            current: current,
            voltage: voltage
        };
    }

    calculateResistorState(resistor, voltageMap, currentMap) {
        const current = this.getCurrentThroughComponent(resistor, currentMap);
        const resistance = this.getResistorValue(resistor);
        const power = current * current * resistance; // P = I²R
        const maxPower = 0.25; // 1/4 Watt Standardwiderstand
        
        if (power > maxPower) {
            return { 
                status: 'overheated', 
                message: 'Widerstand überhitzt - zu hohe Leistung',
                power: power
            };
        }
        
        return { 
            status: 'normal', 
            message: `Widerstand: ${resistance}Ω`,
            current: current,
            power: power
        };
    }

    calculateSwitchState(switchComponent, voltageMap, currentMap) {
        const state = this.getSwitchState(switchComponent);
        const current = this.getCurrentThroughComponent(switchComponent, currentMap);
        
        return { 
            status: 'normal', 
            message: `Schalter ${state === 'closed' ? 'geschlossen' : 'offen'}`,
            switchState: state,
            current: current
        };
    }

    updateWireStates(currentMap, voltageMap) {
        const wireStates = new Map();
        
        this.wires.forEach(wire => {
            const current = currentMap.get(wire.id) || 0;
            let state = 'normal';
            
            if (Math.abs(current) > 0.5) { // Hoher Strom
                state = 'powered';
            } else if (Math.abs(current) > 1.0) { // Sehr hoher Strom
                state = 'error';
            }
            
            wireStates.set(wire.id, state);
        });
        
        return wireStates;
    }

    // Hilfsfunktionen für Komponenten-Parameter
    getBatteryVoltage(battery) {
        // Standard 9V Batterie
        return 9.0;
    }

    getLEDResistance(led) {
        // Dynamischer Widerstand der LED
        return 100; // Ohm
    }

    getResistorValue(resistor) {
        // Standard 220 Ohm Widerstand
        return 220;
    }

    getSwitchState(switchComponent) {
        // Für Demo: Schalter standardmäßig geschlossen
        // In der echten Implementierung würde dies über UI gesteuert
        return switchComponent.definition.state === 'closed' ? 'closed' : 'open';
    }

    getCurrentThroughComponent(component, currentMap) {
        let totalCurrent = 0;
        
        // Alle Kabel die mit der Komponente verbunden sind
        this.wires.forEach(wire => {
            if (wire.from.componentId === component.id || wire.to.componentId === component.id) {
                const current = currentMap.get(wire.id) || 0;
                totalCurrent += Math.abs(current);
            }
        });
        
        return totalCurrent;
    }

    // Schaltungsvalidierung gegen Level-Lösung
    validateAgainstSolution(solution) {
        const result = {
            correct: false,
            feedback: '',
            errors: [],
            completeness: 0
        };

        try {
            // Prüfen ob alle erforderlichen Verbindungen vorhanden sind
            const requiredConnections = solution;
            const actualConnections = this.extractConnections();
            
            let correctConnections = 0;
            const missingConnections = [];
            
            requiredConnections.forEach(required => {
                const found = actualConnections.find(actual => 
                    this.connectionsMatch(required, actual)
                );
                
                if (found) {
                    correctConnections++;
                } else {
                    missingConnections.push(required);
                }
            });
            
            result.completeness = correctConnections / requiredConnections.length;
            
            // Zusätzliche falsche Verbindungen prüfen
            const extraConnections = actualConnections.filter(actual =>
                !requiredConnections.find(required => 
                    this.connectionsMatch(required, actual)
                )
            );
            
            if (result.completeness === 1 && extraConnections.length === 0) {
                result.correct = true;
                result.feedback = 'Perfekt! Alle Verbindungen sind korrekt.';
            } else {
                result.errors = [
                    ...missingConnections.map(conn => `Fehlende Verbindung: ${this.formatConnection(conn)}`),
                    ...extraConnections.map(conn => `Unerwünschte Verbindung: ${this.formatConnection(conn)}`)
                ];
                
                if (result.completeness > 0.8) {
                    result.feedback = 'Fast richtig! Überprüfe die Verbindungen.';
                } else if (result.completeness > 0.5) {
                    result.feedback = 'Teilweise korrekt. Weitere Verbindungen erforderlich.';
                } else {
                    result.feedback = 'Schaltung ist noch nicht vollständig.';
                }
            }
            
        } catch (error) {
            result.feedback = 'Fehler bei der Validierung: ' + error.message;
        }
        
        return result;
    }

    extractConnections() {
        return this.wires.map(wire => ({
            from: {
                component: wire.from.componentId,
                connection: wire.from.pointName
            },
            to: {
                component: wire.to.componentId,
                connection: wire.to.pointName
            }
        }));
    }

    connectionsMatch(conn1, conn2) {
        // Verbindungen sind bidirektional
        return (
            (conn1.from.component === conn2.from.component && 
             conn1.from.connection === conn2.from.connection &&
             conn1.to.component === conn2.to.component && 
             conn1.to.connection === conn2.to.connection) ||
            (conn1.from.component === conn2.to.component && 
             conn1.from.connection === conn2.to.connection &&
             conn1.to.component === conn2.from.component && 
             conn1.to.connection === conn2.from.connection)
        );
    }

    formatConnection(connection) {
        return `${connection.from.component}:${connection.from.connection} → ${connection.to.component}:${connection.to.connection}`;
    }

    // Öffentliche API
    reset() {
        this.components = [];
        this.wires = [];
        this.simulationState = 'idle';
    }

    getSimulationState() {
        return this.simulationState;
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CircuitSystem;
} else {
    window.CircuitSystem = CircuitSystem;
}