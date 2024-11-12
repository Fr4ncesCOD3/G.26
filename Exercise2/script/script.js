// Recupero gli elementi del DOM
const timerForm = document.getElementById("timer");
const timerDisplay = document.getElementById("timerDisplay");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");

// Variabili per gestire il timer
let timer;
// Recupera il timestamp iniziale dal sessionStorage o usa il timestamp corrente
let startTime = parseInt(sessionStorage.getItem('startTime')) || Date.now();
let isRunning = sessionStorage.getItem('isRunning') === 'true';

// Funzione per aggiornare il display del timer
const updateDisplay = () => {
    // Calcola il tempo trascorso in secondi
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    // Calcola ore, minuti e secondi
    const hours = Math.floor(elapsedTime / 3600);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const seconds = elapsedTime % 60;
    // Aggiorna il display del timer
    timerDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Gestione click sul pulsante Start/Pause
const handleStart = function(e) {
    e.preventDefault();
    if (!timer) {
        // Se il timer non era in esecuzione, imposta un nuovo tempo di inizio
        if (!isRunning) {
            startTime = Date.now();
            sessionStorage.setItem('startTime', startTime);
        }
        isRunning = true;
        sessionStorage.setItem('isRunning', 'true');
        // Imposta un timer per aggiornare il display ogni secondo
        timer = setInterval(updateDisplay, 1000);
        // Cambia il testo del pulsante a Pause
        startButton.textContent = "Pause";
    } else {
        // Mette in pausa il timer
        clearInterval(timer);
        timer = null;
        isRunning = false;
        sessionStorage.setItem('isRunning', 'false');
        // Cambia il testo del pulsante a Start
        startButton.textContent = "Start";
    }
};

// Gestione click sul pulsante Reset
const handleReset = () => {
    clearInterval(timer);
    timer = null;
    isRunning = false;
    startTime = Date.now();
    sessionStorage.setItem('startTime', startTime);
    sessionStorage.setItem('isRunning', 'false');
    updateDisplay();
    startButton.textContent = "Start";
};

// Aggiunge gli event listener ai pulsanti
startButton.addEventListener("click", handleStart);
resetButton.addEventListener("click", handleReset);

// Se il timer era in esecuzione, lo riavvia
if (isRunning) {
    timer = setInterval(updateDisplay, 1000);
    startButton.textContent = "Pause";
}

// Inizializza il display del timer
updateDisplay();