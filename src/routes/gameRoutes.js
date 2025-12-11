const express = require('express');
const router = express.Router();
const {
  getGameState,
  handleClick,
  resetGameState,
  getStats
} = require('../controllers/gameController');

// GET маршруты
router.get('/game', getGameState);
router.get('/stats', getStats);

// POST маршруты
router.post('/click', handleClick);
router.post('/reset', resetGameState);

module.exports = router;