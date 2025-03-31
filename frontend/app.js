let tg = window.Telegram.WebApp;
let currentText = '';
let currentMode = null;
let isPaused = false;
let currentSpeed = 300;
let currentWordIndex = 0;
let words = [];

// URL бэкенда
const BACKEND_URL = "https://web-production-8f23.up.railway.app";

// Инициализация Telegram WebApp
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    console.log('Telegram WebApp:', tg);
    
    try {
        tg.expand();
        tg.enableClosingConfirmation();
        console.log('Telegram WebApp initialized successfully');
        
        // Установка темы в зависимости от темы Telegram
        document.documentElement.setAttribute('data-theme', tg.colorScheme);
        console.log('Theme set to:', tg.colorScheme);
    } catch (error) {
        console.error('Error initializing Telegram WebApp:', error);
    }
});

// Обработка загрузки файлов
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
    console.log('File dragged over');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
    console.log('File dragged out');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    console.log('File dropped:', file);
    handleFile(file);
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    console.log('File selected:', file);
    handleFile(file);
});

async function handleFile(file) {
    if (!file) return;
    
    console.log('Processing file:', file.name);
    const formData = new FormData();
    formData.append('file', file);
    
    try {
        console.log('Sending file to backend:', BACKEND_URL);
        const response = await fetch(`${BACKEND_URL}/upload`, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('File processed successfully');
        currentText = data.text;
        
        // Показываем режимы чтения
        document.querySelector('.upload-section').style.display = 'none';
        document.getElementById('reading-modes').style.display = 'block';
    } catch (error) {
        console.error('Error processing file:', error);
        alert('Ошибка загрузки файла: ' + error.message);
    }
}

// Режимы чтения
async function startBionicReading() {
    currentMode = 'bionic';
    try {
        const response = await fetch(`${BACKEND_URL}/bionic`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: currentText })
        });
        
        if (!response.ok) {
            throw new Error('Ошибка обработки текста');
        }
        
        const data = await response.json();
        document.getElementById('reading-modes').style.display = 'none';
        document.getElementById('reader-container').style.display = 'block';
        document.getElementById('readerContent').innerHTML = data.bionic_text;
    } catch (error) {
        alert('Ошибка обработки текста: ' + error.message);
    }
}

async function startRSVPReading() {
    currentMode = 'rsvp';
    try {
        const response = await fetch(`${BACKEND_URL}/rsvp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                text: currentText,
                speed: currentSpeed / 1000  // Конвертируем миллисекунды в секунды
            })
        });
        
        if (!response.ok) {
            throw new Error('Ошибка обработки текста');
        }
        
        const data = await response.json();
        words = data.words;
        currentWordIndex = 0;
        
        document.getElementById('reading-modes').style.display = 'none';
        document.getElementById('reader-container').style.display = 'block';
        showNextWord();
    } catch (error) {
        alert('Ошибка обработки текста: ' + error.message);
    }
}

// Управление RSVP
function showNextWord() {
    if (currentWordIndex >= words.length) {
        currentWordIndex = 0;
    }
    
    const readerContent = document.getElementById('readerContent');
    readerContent.innerHTML = `<div class="rsvp-word">${words[currentWordIndex]}</div>`;
    
    if (!isPaused) {
        setTimeout(() => {
            currentWordIndex++;
            showNextWord();
        }, currentSpeed);
    }
}

function togglePause() {
    isPaused = !isPaused;
    document.getElementById('pauseBtn').textContent = isPaused ? 'Продолжить' : 'Пауза';
    
    if (!isPaused) {
        showNextWord();
    }
}

function adjustSpeed(delta) {
    currentSpeed = Math.max(100, Math.min(1000, currentSpeed + delta));
    document.getElementById('speedDisplay').textContent = `${currentSpeed}мс`;
    
    if (currentMode === 'rsvp' && !isPaused) {
        isPaused = true;
        togglePause();
    }
} 