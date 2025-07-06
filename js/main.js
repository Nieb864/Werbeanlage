// Hauptscript für die Startseite des Elektronik Lernspiels

document.addEventListener('DOMContentLoaded', function() {
    initializeLevelSelection();
});

function initializeLevelSelection() {
    const levelsGrid = document.getElementById('levelsGrid');
    if (!levelsGrid) return;

    const levels = GameLevels.getAllLevels();
    const completedLevels = GameLevels.getCompletedLevels();

    // Level-Karten erstellen
    levels.forEach(level => {
        const levelCard = createLevelCard(level, completedLevels);
        levelsGrid.appendChild(levelCard);
    });
}

function createLevelCard(level, completedLevels) {
    const isCompleted = completedLevels.includes(level.id);
    const isUnlocked = GameLevels.isLevelUnlocked(level.id);
    
    const card = document.createElement('div');
    card.className = `level-card ${!isUnlocked ? 'locked' : ''}`;
    
    // Level-Header
    const header = document.createElement('div');
    header.className = 'level-header';
    
    const icon = document.createElement('div');
    icon.className = 'level-icon';
    icon.textContent = isCompleted ? '✅' : (isUnlocked ? level.icon : '🔒');
    
    const title = document.createElement('div');
    title.className = 'level-title';
    title.textContent = level.title;
    
    const difficulty = document.createElement('span');
    difficulty.className = `level-difficulty difficulty-${level.difficulty}`;
    difficulty.textContent = getDifficultyText(level.difficulty);
    
    header.appendChild(icon);
    header.appendChild(title);
    header.appendChild(difficulty);
    
    // Level-Beschreibung
    const description = document.createElement('div');
    description.className = 'level-description';
    description.textContent = level.description;
    
    // Level-Statistiken
    const stats = document.createElement('div');
    stats.className = 'level-stats';
    
    const components = document.createElement('div');
    components.className = 'level-components';
    components.textContent = `${level.components.length} Bauteile`;
    
    const status = document.createElement('div');
    status.textContent = isCompleted ? 'Abgeschlossen' : (isUnlocked ? 'Verfügbar' : 'Gesperrt');
    status.style.color = isCompleted ? '#28a745' : (isUnlocked ? '#007bff' : '#6c757d');
    status.style.fontWeight = 'bold';
    
    stats.appendChild(components);
    stats.appendChild(status);
    
    // Zusammensetzen
    card.appendChild(header);
    card.appendChild(description);
    card.appendChild(stats);
    
    // Event Listener
    if (isUnlocked) {
        card.addEventListener('click', () => startLevel(level.id));
        card.style.cursor = 'pointer';
    }
    
    return card;
}

function getDifficultyText(difficulty) {
    const texts = {
        easy: 'Leicht',
        medium: 'Mittel',
        hard: 'Schwer'
    };
    return texts[difficulty] || difficulty;
}

function startLevel(levelId) {
    // Übergang zur Spielseite
    window.location.href = `game.html?level=${levelId}`;
}

// Zusätzliche Funktionen für Animationen und UX
function addHoverEffects() {
    const levelCards = document.querySelectorAll('.level-card:not(.locked)');
    
    levelCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Progress-Anzeige
function updateProgress() {
    const completedLevels = GameLevels.getCompletedLevels();
    const totalLevels = GameLevels.getAllLevels().length;
    
    // Optionale Progress-Anzeige hinzufügen
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container';
    progressContainer.style.cssText = `
        text-align: center;
        margin: 20px 0;
        color: rgba(255, 255, 255, 0.9);
        font-size: 1.1em;
    `;
    
    const progressText = document.createElement('div');
    progressText.textContent = `Fortschritt: ${completedLevels.length}/${totalLevels} Level abgeschlossen`;
    
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        width: 100%;
        max-width: 400px;
        height: 8px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 4px;
        margin: 10px auto;
        overflow: hidden;
    `;
    
    const progressFill = document.createElement('div');
    progressFill.style.cssText = `
        width: ${(completedLevels.length / totalLevels) * 100}%;
        height: 100%;
        background: linear-gradient(90deg, #28a745, #20c997);
        border-radius: 4px;
        transition: width 0.3s ease;
    `;
    
    progressBar.appendChild(progressFill);
    progressContainer.appendChild(progressText);
    progressContainer.appendChild(progressBar);
    
    // Progress vor den Level-Grid einfügen
    const levelsGrid = document.getElementById('levelsGrid');
    if (levelsGrid && levelsGrid.parentNode) {
        levelsGrid.parentNode.insertBefore(progressContainer, levelsGrid);
    }
}

// Initialisierung erweitern
document.addEventListener('DOMContentLoaded', function() {
    initializeLevelSelection();
    addHoverEffects();
    updateProgress();
    
    // Erfolgs-Animation für gerade abgeschlossene Level
    checkForRecentCompletion();
});

function checkForRecentCompletion() {
    const urlParams = new URLSearchParams(window.location.search);
    const completedLevelId = parseInt(urlParams.get('completed'));
    
    if (completedLevelId) {
        // URL bereinigen
        window.history.replaceState({}, document.title, window.location.pathname);
        
        // Erfolgs-Animation
        setTimeout(() => {
            showCompletionCelebration(completedLevelId);
        }, 500);
    }
}

function showCompletionCelebration(levelId) {
    const celebration = document.createElement('div');
    celebration.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 30px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        text-align: center;
        z-index: 10000;
        animation: slideUp 0.3s ease;
    `;
    
    const level = GameLevels.getAllLevels().find(l => l.id === levelId);
    
    celebration.innerHTML = `
        <div style="font-size: 4em; margin-bottom: 20px;">🎉</div>
        <h2 style="color: #28a745; margin-bottom: 10px;">Level Abgeschlossen!</h2>
        <p style="color: #666; margin-bottom: 20px;">${level ? level.title : 'Level ' + levelId}</p>
        <button class="btn btn-primary" onclick="this.parentElement.remove()">Weiter</button>
    `;
    
    document.body.appendChild(celebration);
    
    // Automatisch nach 3 Sekunden schließen
    setTimeout(() => {
        if (celebration.parentNode) {
            celebration.remove();
        }
    }, 3000);
}