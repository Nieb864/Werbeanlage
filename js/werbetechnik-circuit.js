// Werbetechnik Circuit-System für 230V AC/DC Simulationen

class WerbetechnikCircuitSystem {
    constructor() {
        this.components = [];
        this.wires = [];
        this.simulationState = 'idle';
        this.powerSources = [];
        this.loads = [];
        this.trafos = [];
        this.protectionDevices = [];
    }

    loadCircuit(components, wires) {
        this.components = components;
        this.wires = wires;
        this.categorizeComponents();
    }

    categorizeComponents() {
        this.powerSources = this.components.filter(comp => comp.type === 'power230v');
        this.loads = this.components.filter(comp => comp.type.includes('led_'));
        this.trafos = this.components.filter(comp => comp.type.includes('trafo_'));
        this.protectionDevices = this.components.filter(comp => 
            comp.type === 'ls_switch' || comp.type === 'fi_switch'
        );
    }

    simulate() {
        try {
            this.simulationState = 'running';
            
            // 1. Schutzeinrichtungen prüfen
            const protectionCheck = this.checkProtectionDevices();
            if (!protectionCheck.ok) {
                return this.createErrorResult(protectionCheck.error);
            }

            // 2. Netzwerk aufbauen
            const network = this.buildWerbetechnikNetwork();
            
            // 3. 230V AC Verteilung simulieren
            const acDistribution = this.simulateACDistribution(network);
            
            // 4. Trafo-Simulation (AC -> DC)
            const dcCircuits = this.simulateTransformers(network, acDistribution);
            
            // 5. LED-Lasten berechnen
            const loadAnalysis = this.calculateLoads(dcCircuits);
            
            // 6. Überlast- und Fehlerprüfung
            const faultAnalysis = this.analyzeFaults(loadAnalysis);
            
            // 7. Komponenten-Zustände ermitteln
            const componentStates = this.determineComponentStates(loadAnalysis, faultAnalysis);
            
            // 8. Draht-Zustände
            const wireStates = this.determineWireStates(loadAnalysis, faultAnalysis);

            const result = {
                success: true,
                componentStates,
                wireStates,
                loadAnalysis,
                faultAnalysis,
                network,
                acDistribution,
                dcCircuits
            };

            this.simulationState = 'idle';
            return result;

        } catch (error) {
            this.simulationState = 'error';
            return this.createErrorResult(error.message);
        }
    }

    checkProtectionDevices() {
        // Prüfe ob LS-Schalter vorhanden
        const lsSwitch = this.protectionDevices.find(dev => dev.type === 'ls_switch');
        if (!lsSwitch) {
            return { ok: false, error: 'LS-Schutzschalter fehlt! Überlastschutz erforderlich.' };
        }

        // Prüfe ob FI-Schalter vorhanden
        const fiSwitch = this.protectionDevices.find(dev => dev.type === 'fi_switch');
        if (!fiSwitch) {
            return { ok: false, error: 'FI-Schutzschalter fehlt! Fehlerstromschutz erforderlich.' };
        }

        // Prüfe korrekte Verkabelung der Schutzeinrichtungen
        if (!this.isProtectionCorrectlyWired(lsSwitch, fiSwitch)) {
            return { ok: false, error: 'Schutzeinrichtungen falsch verkabelt!' };
        }

        return { ok: true };
    }

    isProtectionCorrectlyWired(lsSwitch, fiSwitch) {
        // LS-Schalter muss vor FI-Schalter sein
        const powerSource = this.powerSources[0];
        if (!powerSource) return false;

        // Vereinfachte Prüfung der Verkabelungsreihenfolge
        const phaseConnection = this.findConnectionPath(powerSource, 'phase', lsSwitch, 'input');
        const lsToFiConnection = this.findConnectionPath(lsSwitch, 'output', fiSwitch, 'phase_in');
        
        return phaseConnection && lsToFiConnection;
    }

    findConnectionPath(fromComponent, fromConnection, toComponent, toConnection) {
        return this.wires.some(wire =>
            (wire.from.componentId === fromComponent.id && wire.from.pointName === fromConnection &&
             wire.to.componentId === toComponent.id && wire.to.pointName === toConnection) ||
            (wire.from.componentId === toComponent.id && wire.from.pointName === toConnection &&
             wire.to.componentId === fromComponent.id && wire.to.pointName === fromConnection)
        );
    }

    simulateACDistribution(network) {
        const acVoltage = 230; // 230V AC
        const distribution = new Map();

        // 230V Quelle
        this.powerSources.forEach(source => {
            distribution.set(`${source.id}_phase`, { voltage: acVoltage, type: 'AC', phase: 'L' });
            distribution.set(`${source.id}_neutral`, { voltage: 0, type: 'AC', phase: 'N' });
            distribution.set(`${source.id}_earth`, { voltage: 0, type: 'AC', phase: 'PE' });
        });

        // Durch Schutzeinrichtungen propagieren
        this.protectionDevices.forEach(device => {
            if (device.definition.state === 'closed') {
                this.propagateACThroughDevice(device, distribution);
            }
        });

        return distribution;
    }

    propagateACThroughDevice(device, distribution) {
        if (device.type === 'ls_switch') {
            const inputVoltage = this.getConnectedVoltage(device, 'input', distribution);
            if (inputVoltage) {
                distribution.set(`${device.id}_output`, inputVoltage);
            }
        } else if (device.type === 'fi_switch') {
            const phaseIn = this.getConnectedVoltage(device, 'phase_in', distribution);
            const neutralIn = this.getConnectedVoltage(device, 'neutral_in', distribution);
            
            if (phaseIn && neutralIn) {
                distribution.set(`${device.id}_phase_out`, phaseIn);
                distribution.set(`${device.id}_neutral_out`, neutralIn);
            }
        }
    }

    getConnectedVoltage(component, connectionName, distribution) {
        // Finde verbundene Spannung über Kabel
        const connectedWire = this.wires.find(wire =>
            (wire.to.componentId === component.id && wire.to.pointName === connectionName) ||
            (wire.from.componentId === component.id && wire.from.pointName === connectionName)
        );

        if (!connectedWire) return null;

        const otherComponent = wire.to.componentId === component.id ? 
            this.components.find(c => c.id === wire.from.componentId) :
            this.components.find(c => c.id === wire.to.componentId);

        const otherConnection = wire.to.componentId === component.id ? 
            wire.from.pointName : wire.to.pointName;

        return distribution.get(`${otherComponent.id}_${otherConnection}`);
    }

    simulateTransformers(network, acDistribution) {
        const dcCircuits = new Map();

        this.trafos.forEach(trafo => {
            const acInput = this.getTrafoInput(trafo, acDistribution);
            
            if (acInput && acInput.voltage === 230) {
                // Trafo funktioniert
                const outputVoltage = trafo.definition.voltage_out;
                
                dcCircuits.set(`${trafo.id}_dc_plus`, { 
                    voltage: outputVoltage, 
                    type: 'DC', 
                    trafo: trafo,
                    maxPower: trafo.definition.power
                });
                dcCircuits.set(`${trafo.id}_dc_minus`, { 
                    voltage: 0, 
                    type: 'DC', 
                    trafo: trafo 
                });
            }
        });

        return dcCircuits;
    }

    getTrafoInput(trafo, acDistribution) {
        // Prüfe ob Trafo korrekt an 230V angeschlossen
        const ac1Connected = this.getConnectedVoltage(trafo, 'ac_in1', acDistribution);
        const ac2Connected = this.getConnectedVoltage(trafo, 'ac_in2', acDistribution);

        if (ac1Connected && ac2Connected && 
            Math.abs(ac1Connected.voltage - ac2Connected.voltage) === 230) {
            return { voltage: 230, type: 'AC' };
        }
        return null;
    }

    calculateLoads(dcCircuits) {
        const loadAnalysis = {
            trafos: new Map(),
            leds: new Map(),
            totalPowerByTrafo: new Map()
        };

        // Für jeden Trafo die angeschlossenen LEDs berechnen
        this.trafos.forEach(trafo => {
            const connectedLEDs = this.findConnectedLEDs(trafo, dcCircuits);
            let totalPower = 0;

            connectedLEDs.forEach(led => {
                const ledPower = led.definition.power || led.data.power;
                totalPower += ledPower;

                // LED-Status bestimmen
                const ledVoltage = this.getLEDVoltage(led, trafo, dcCircuits);
                const ledStatus = this.determineLEDStatus(led, ledVoltage);

                loadAnalysis.leds.set(led.id, {
                    component: led,
                    voltage: ledVoltage,
                    power: ledPower,
                    status: ledStatus,
                    connectedTrafo: trafo
                });
            });

            // Trafo-Belastung mit 10% Toleranz
            const maxPower = trafo.definition.power;
            const powerWithTolerance = maxPower * 1.1;
            const overloaded = totalPower > powerWithTolerance;

            loadAnalysis.trafos.set(trafo.id, {
                component: trafo,
                totalPower: totalPower,
                maxPower: maxPower,
                powerWithTolerance: powerWithTolerance,
                overloaded: overloaded,
                connectedLEDs: connectedLEDs
            });

            loadAnalysis.totalPowerByTrafo.set(trafo.id, totalPower);
        });

        return loadAnalysis;
    }

    findConnectedLEDs(trafo, dcCircuits) {
        const connectedLEDs = [];

        this.loads.forEach(led => {
            if (this.isLEDConnectedToTrafo(led, trafo)) {
                connectedLEDs.push(led);
            }
        });

        return connectedLEDs;
    }

    isLEDConnectedToTrafo(led, trafo) {
        // Prüfe ob LED Plus/Minus mit Trafo DC Plus/Minus verbunden
        const plusConnected = this.findConnectionPath(led, 'plus', trafo, 'dc_plus');
        const minusConnected = this.findConnectionPath(led, 'minus', trafo, 'dc_minus');
        
        return plusConnected && minusConnected;
    }

    getLEDVoltage(led, trafo, dcCircuits) {
        const dcOutput = dcCircuits.get(`${trafo.id}_dc_plus`);
        return dcOutput ? dcOutput.voltage : 0;
    }

    determineLEDStatus(led, voltage) {
        const ledVoltage = led.definition.voltage || led.data.voltage;

        if (voltage === 0) {
            return { status: 'off', message: 'Keine Spannung' };
        } else if (voltage === 230) {
            return { status: 'destroyed', message: 'LED zerstört - 230V ohne Trafo!' };
        } else if (voltage === ledVoltage) {
            return { status: 'on', message: 'LED leuchtet normal' };
        } else if (voltage === 12 && ledVoltage === 24) {
            return { status: 'dim', message: 'LED schwach - Unterspannung' };
        } else if (voltage === 24 && ledVoltage === 12) {
            return { status: 'blinking', message: 'LED blinkt - Überspannung!' };
        } else {
            return { status: 'error', message: 'Falsche Spannung' };
        }
    }

    analyzeFaults(loadAnalysis) {
        const faults = {
            overloadedTrafos: [],
            wrongVoltages: [],
            noProtection: [],
            shortCircuits: []
        };

        // Trafo-Überlasten
        loadAnalysis.trafos.forEach((trafoData, trafoId) => {
            if (trafoData.overloaded) {
                faults.overloadedTrafos.push({
                    trafo: trafoData.component,
                    power: trafoData.totalPower,
                    maxPower: trafoData.maxPower
                });
            }
        });

        // Falsche Spannungen
        loadAnalysis.leds.forEach((ledData, ledId) => {
            if (ledData.status.status === 'blinking' || ledData.status.status === 'destroyed') {
                faults.wrongVoltages.push({
                    led: ledData.component,
                    expectedVoltage: ledData.component.definition.voltage,
                    actualVoltage: ledData.voltage
                });
            }
        });

        return faults;
    }

    determineComponentStates(loadAnalysis, faultAnalysis) {
        const componentStates = new Map();

        // Trafo-Zustände
        loadAnalysis.trafos.forEach((trafoData, trafoId) => {
            if (trafoData.overloaded) {
                componentStates.set(trafoId, {
                    status: 'overloaded',
                    message: `Trafo überlastet: ${trafoData.totalPower.toFixed(1)}W / ${trafoData.maxPower}W`,
                    power: trafoData.totalPower
                });
            } else {
                componentStates.set(trafoId, {
                    status: 'normal',
                    message: `Trafo OK: ${trafoData.totalPower.toFixed(1)}W / ${trafoData.maxPower}W`,
                    power: trafoData.totalPower
                });
            }
        });

        // LED-Zustände
        loadAnalysis.leds.forEach((ledData, ledId) => {
            componentStates.set(ledId, {
                status: ledData.status.status,
                message: ledData.status.message,
                voltage: ledData.voltage,
                power: ledData.power
            });
        });

        // Schutzeinrichtungen
        this.protectionDevices.forEach(device => {
            componentStates.set(device.id, {
                status: 'normal',
                message: `${device.type === 'ls_switch' ? 'LS-Schalter' : 'FI-Schalter'} OK`,
                state: device.definition.state
            });
        });

        return componentStates;
    }

    determineWireStates(loadAnalysis, faultAnalysis) {
        const wireStates = new Map();

        this.wires.forEach(wire => {
            let state = 'normal';

            // AC-Kabel (230V)
            if (this.isACWire(wire)) {
                state = 'ac_power';
            }
            
            // DC-Kabel mit Strom
            else if (this.isDCWireWithCurrent(wire, loadAnalysis)) {
                state = 'dc_power';
            }
            
            // Überlast-Kabel
            else if (this.isOverloadedWire(wire, faultAnalysis)) {
                state = 'overload';
            }

            wireStates.set(wire.id, state);
        });

        return wireStates;
    }

    isACWire(wire) {
        const fromComponent = this.components.find(c => c.id === wire.from.componentId);
        const toComponent = this.components.find(c => c.id === wire.to.componentId);

        return (fromComponent && fromComponent.type === 'power230v') ||
               (toComponent && toComponent.type === 'power230v') ||
               (fromComponent && fromComponent.type.includes('switch')) ||
               (toComponent && toComponent.type.includes('switch'));
    }

    isDCWireWithCurrent(wire, loadAnalysis) {
        const fromComponent = this.components.find(c => c.id === wire.from.componentId);
        const toComponent = this.components.find(c => c.id === wire.to.componentId);

        // Kabel zwischen Trafo und LED oder LED und LED
        return (fromComponent && fromComponent.type.includes('trafo_')) ||
               (toComponent && toComponent.type.includes('trafo_')) ||
               (fromComponent && fromComponent.type.includes('led_')) ||
               (toComponent && toComponent.type.includes('led_'));
    }

    isOverloadedWire(wire, faultAnalysis) {
        // Kabel zu überlastetem Trafo
        return faultAnalysis.overloadedTrafos.some(fault => 
            wire.from.componentId === fault.trafo.id || 
            wire.to.componentId === fault.trafo.id
        );
    }

    createErrorResult(errorMessage) {
        return {
            success: false,
            error: errorMessage,
            componentStates: new Map(),
            wireStates: new Map()
        };
    }

    // Validierung gegen Level-Lösung (erweitert für Werbetechnik)
    validateAgainstSolution(solution) {
        const result = {
            correct: false,
            feedback: '',
            errors: [],
            completeness: 0
        };

        try {
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
            
            // Zusätzliche Werbetechnik-spezifische Prüfungen
            const werbetechnikValidation = this.validateWerbetechnikSpecifics();
            
            if (result.completeness === 1 && werbetechnikValidation.valid) {
                result.correct = true;
                result.feedback = 'Perfekt! Werbetechnik-Installation korrekt ausgeführt.';
            } else {
                result.errors = [
                    ...missingConnections.map(conn => `Fehlende Verbindung: ${this.formatConnection(conn)}`),
                    ...werbetechnikValidation.errors
                ];
                
                result.feedback = werbetechnikValidation.errors.length > 0 ? 
                    werbetechnikValidation.errors[0] : 
                    'Schaltung unvollständig.';
            }
            
        } catch (error) {
            result.feedback = 'Fehler bei der Validierung: ' + error.message;
        }
        
        return result;
    }

    validateWerbetechnikSpecifics() {
        const errors = [];

        // Schutzeinrichtungen prüfen
        const protectionCheck = this.checkProtectionDevices();
        if (!protectionCheck.ok) {
            errors.push(protectionCheck.error);
        }

        // Leistungsberechnung prüfen
        const simulation = this.simulate();
        if (simulation.success) {
            simulation.faultAnalysis.overloadedTrafos.forEach(fault => {
                errors.push(`Trafo überlastet: ${fault.power.toFixed(1)}W > ${fault.maxPower}W`);
            });

            simulation.faultAnalysis.wrongVoltages.forEach(fault => {
                errors.push(`Falsche LED-Spannung: ${fault.actualVoltage}V statt ${fault.expectedVoltage}V`);
            });
        }

        return {
            valid: errors.length === 0,
            errors: errors
        };
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
    module.exports = WerbetechnikCircuitSystem;
} else {
    window.WerbetechnikCircuitSystem = WerbetechnikCircuitSystem;
}