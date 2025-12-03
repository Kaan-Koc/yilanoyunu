/**
 * Storage Manager for Snake Game
 * Handles all localStorage interactions
 */

const STORAGE_KEYS = {
  HIGH_SCORE: "snakeHighScore_v2",
  SKIN: "snakeSkinId",
  MAP: "snakeMapId",
};

const StorageManager = {
  // High Score
  getHighScore: () => {
    const score = localStorage.getItem(STORAGE_KEYS.HIGH_SCORE);
    return score ? parseInt(score) : 0;
  },

  saveHighScore: (score) => {
    const currentHigh = StorageManager.getHighScore();
    if (score > currentHigh) {
      localStorage.setItem(STORAGE_KEYS.HIGH_SCORE, score);
      return true; // New high score!
    }
    return false;
  },

  resetHighScore: () => {
    localStorage.setItem(STORAGE_KEYS.HIGH_SCORE, 0);
    return 0;
  },

  // Skin Preferences
  getSkin: () => {
    return localStorage.getItem(STORAGE_KEYS.SKIN);
  },

  saveSkin: (skinId) => {
    localStorage.setItem(STORAGE_KEYS.SKIN, skinId);
  },

  // Map Preferences
  getMap: () => {
    return localStorage.getItem(STORAGE_KEYS.MAP);
  },

  saveMap: (mapId) => {
    localStorage.setItem(STORAGE_KEYS.MAP, mapId);
  },
};

// Export for use in other files (if using modules) or global window object
window.StorageManager = StorageManager;
