const express = require('express');
const path = require('path');
const { gameRoutes } = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware для парсинга JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware для логирования
const logger = require('./middleware/logger');
app.use(logger);

// Раздача статических файлов
app.use(express.static(path.join(__dirname, '../public')));

// Подключение маршрутов
app.use('/api', gameRoutes);

// Основной маршрут
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Обработка 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Маршрут не найден'
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
  console.log(`🌐 Откройте http://localhost:${PORT} в браузере`);
});