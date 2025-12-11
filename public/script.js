document.addEventListener('DOMContentLoaded', () => {
    const scoreElement = document.getElementById('score');
    const clicksElement = document.getElementById('clicks');
    const clickValueElement = document.getElementById('click-value');
    const clickButton = document.getElementById('click-button');
    const resetButton = document.getElementById('reset-game');
    
    // Статистика
    const totalClicksElement = document.getElementById('total-clicks');
    const totalScoreElement = document.getElementById('total-score');
    
    let gameState = {
        score: 0,
        clicks: 0
    };
    
    // Загрузка состояния игры
    async function loadGameState() {
        try {
            const response = await fetch('/api/game');
            const data = await response.json();
            
            if (data.success) {
                gameState = data.gameState;
                updateUI();
                updateStats();
            }
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }
    
    // Обработка клика
    async function handleClick() {
        try {
            const response = await fetch('/api/click', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({})
            });
            
            const data = await response.json();
            
            if (data.success) {
                gameState.score = data.score;
                gameState.clicks = data.clicks;
                updateUI();
                updateStats();
                
                // Анимация
                clickButton.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    clickButton.style.transform = 'scale(1)';
                }, 100);
            }
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }
    
    // Сброс игры
    async function resetGame() {
        if (confirm('Вы уверены, что хотите сбросить игру?')) {
            try {
                const response = await fetch('/api/reset', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                });
                
                const data = await response.json();
                
                if (data.success) {
                    gameState = data.gameState;
                    updateUI();
                    updateStats();
                    alert(data.message);
                }
            } catch (error) {
                console.error('Ошибка:', error);
            }
        }
    }
    
    // Обновление статистики
    async function updateStats() {
        try {
            const response = await fetch('/api/stats');
            const data = await response.json();
            
            if (data.success) {
                const stats = data.stats;
                totalClicksElement.textContent = stats.totalClicks;
                totalScoreElement.textContent = stats.totalScore;
            }
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }
    
    // Обновление UI
    function updateUI() {
        scoreElement.textContent = gameState.score;
        clicksElement.textContent = gameState.clicks;
        clickValueElement.textContent = 1; // Фиксированное значение за клик
    }
    
    // Инициализация
    function init() {
        loadGameState();
        
        clickButton.addEventListener('click', handleClick);
        resetButton.addEventListener('click', resetGame);
        
        // Автообновление каждые 3 секунды
        setInterval(() => {
            loadGameState();
        }, 3000);
    }
    
    init();
});