let gameState = {
  score: 0,
  clicks: 0
};

const getGameState = (req, res) => {
  res.json({
    success: true,
    gameState
  });
};

const handleClick = (req, res) => {
  try {
    const clickValue = 1;
    
    gameState.score += clickValue;
    gameState.clicks += 1;
    
    res.json({
      success: true,
      score: gameState.score,
      clicks: gameState.clicks,
      clickValue: clickValue
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Ошибка при обработке клика'
    });
  }
};

const resetGameState = (req, res) => {
  try {
    gameState = {
      score: 0,
      clicks: 0
    };
    
    res.json({
      success: true,
      gameState,
      message: 'Игра сброшена!'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Ошибка при сбросе игры'
    });
  }
};

const getStats = (req, res) => {
  res.json({
    success: true,
    stats: {
      totalClicks: gameState.clicks,
      totalScore: gameState.score
    }
  });
};

module.exports = {
  getGameState,
  handleClick,
  resetGameState,
  getStats
};