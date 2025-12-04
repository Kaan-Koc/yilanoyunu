// Configuration
const GRID_SIZE = 25;
const CANVAS_SIZE = 500;
const GRID_COUNT = CANVAS_SIZE / GRID_SIZE;
const GAME_SPEED = 100;

// Fruit types with emojis and points
const FRUITS = [
    { emoji: '🍎', name: 'Apple', points: 10, color: '#FF4444' },
    { emoji: '🍊', name: 'Orange', points: 15, color: '#FF8C00' },
    { emoji: '🍋', name: 'Lemon', points: 12, color: '#FFD700' },
    { emoji: '🍇', name: 'Grape', points: 20, color: '#9370DB' },
    { emoji: '🍓', name: 'Strawberry', points: 18, color: '#FF69B4' }
];

// Colors
const COLORS = {
    background: 'rgba(0, 0, 0, 0.3)',
    snakeHead: '#00FF9D', // Default
    snakeBody: '#00CC7E', // Default
    snakeGlow: '#00FF9D', // Default
    food: '#FF4444',
    foodGlow: '#FF0000',
    grid: 'rgba(255, 255, 255, 0.05)'
};

// Snake Skins
const SNAKE_SKINS = [
    { id: 'toxic', name: 'Zehirli Yeşil', head: '#39FF14', body: '#008000', glow: '#39FF14' }, // Neon Lime
    { id: 'cyber', name: 'Neon Cyber', head: '#FF00FF', body: '#9D00FF', glow: '#FF00FF' },   // Neon Pink/Purple
    { id: 'magma', name: 'Magma Ateşi', head: '#FF4500', body: '#FF8C00', glow: '#FF4500' },
    { id: 'gold', name: 'Altın Lüks', head: '#FFD700', body: '#DAA520', glow: '#FFD700' },
    { id: 'galaxy', name: 'Galaktik Mor', head: '#9370DB', body: '#8A2BE2', glow: '#9370DB' }
];


// Map configurations - Visual Themes
// Map configurations - Visual Themes
const MAPS = [
    {
        id: 'classic',
        name: 'Klasik Arena', // Changed
        emoji: '🎮',
        description: 'Klasik tema',
        bgColor: 'rgba(0, 0, 0, 0.3)',
        gridColor: 'rgba(255, 255, 255, 0.05)',
        obstacles: [],
        drawPattern: (ctx) => {} // No pattern for classic
    },
    {
        id: 'grass',
        name: 'Çimenli Bahçe',
        emoji: '🌻',
        description: 'Yeşil çimen',
        bgColor: 'rgba(50, 205, 50, 0.3)',
        gridColor: 'rgba(144, 238, 144, 0.2)',
        obstacles: [],
        drawPattern: (ctx) => {
            // Draw grass blades
            ctx.fillStyle = 'rgba(0, 100, 0, 0.15)';
            for (let i = 0; i < 60; i++) {
                const x = Math.random() * CANVAS_SIZE;
                const y = Math.random() * CANVAS_SIZE;
                const h = 5 + Math.random() * 8;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + 3, y - h);
                ctx.lineTo(x + 6, y);
                ctx.fill();
            }
            // Draw small flowers
            for (let i = 0; i < 10; i++) {
                const x = Math.random() * CANVAS_SIZE;
                const y = Math.random() * CANVAS_SIZE;
                ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 192, 203, 0.4)' : 'rgba(255, 255, 0, 0.4)';
                ctx.beginPath();
                ctx.arc(x, y, 3, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    },
    {
        id: 'magma',
        name: 'Volkanik Vadi', // Changed
        emoji: '🔥',
        description: 'Lav teması',
        bgColor: 'rgba(139, 0, 0, 0.5)',
        gridColor: 'rgba(255, 69, 0, 0.2)',
        obstacles: [],
        drawPattern: (ctx) => {
            // Only Embers/Sparks (Removed large pools)
            ctx.fillStyle = 'rgba(255, 215, 0, 0.4)'; // Gold
            for (let i = 0; i < 50; i++) { // Increased count
                const x = Math.random() * CANVAS_SIZE;
                const y = Math.random() * CANVAS_SIZE;
                const size = 1 + Math.random() * 2;
                ctx.fillRect(x, y, size, size);
            }
        }
    },
    {
        id: 'desert',
        name: 'Kızgın Kumlar', // Changed
        emoji: '🌵',
        description: 'Çöl ortamı',
        bgColor: 'rgba(160, 120, 80, 0.8)', // Brown-toned sand
        gridColor: 'rgba(120, 80, 40, 0.35)', // Rich brown grid
        obstacles: [],
        drawPattern: (ctx) => {
            // Dunes (Curved lines)
            ctx.strokeStyle = 'rgba(139, 90, 43, 0.5)'; // Brown dunes
            ctx.lineWidth = 2;
            for (let i = 0; i < 15; i++) {
                const x = Math.random() * CANVAS_SIZE;
                const y = Math.random() * CANVAS_SIZE;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.quadraticCurveTo(x + 20, y - 10, x + 40, y);
                ctx.stroke();
            }
            // Small rocks
            ctx.fillStyle = 'rgba(90, 60, 30, 0.6)'; // Dark chocolate brown rocks
            for (let i = 0; i < 15; i++) {
                const x = Math.random() * CANVAS_SIZE;
                const y = Math.random() * CANVAS_SIZE;
                ctx.beginPath();
                ctx.arc(x, y, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    },
    {
        id: 'ocean',
        name: 'Derin Okyanus', // Changed
        emoji: '🐠',
        description: 'Su altı',
        bgColor: 'rgba(0, 119, 190, 0.5)',
        gridColor: 'rgba(175, 238, 238, 0.2)',
        obstacles: [],
        drawPattern: (ctx) => {
            // Bubbles
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.lineWidth = 1;
            for (let i = 0; i < 30; i++) {
                const x = Math.random() * CANVAS_SIZE;
                const y = Math.random() * CANVAS_SIZE;
                const r = 2 + Math.random() * 6;
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.stroke();
            }
            // Waves (Sine waves instead of curves similar to dunes)
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 2;
            for (let i = 0; i < 15; i++) {
                const x = Math.random() * CANVAS_SIZE;
                const y = Math.random() * CANVAS_SIZE;
                ctx.beginPath();
                ctx.moveTo(x, y);
                // Draw a small sine wave segment
                for(let j=0; j<40; j+=5) {
                     ctx.lineTo(x + j, y + Math.sin(j/5) * 3);
                }
                ctx.stroke();
            }
        }
    }
];


let currentSkin = SNAKE_SKINS[0];
let currentMap = MAPS[0];

// Game State
let canvas, ctx;
let snake = [];
let food = {};
let dx = 1;
let dy = 0;
let score = 0;
let highScore = 0;
let isRunning = false;
let lastRenderTime = 0;

// Initialize Skins
function initSkins() {
    const skinContainer = document.getElementById('skin-options');
    skinContainer.innerHTML = ''; // Clear existing

    // Load saved skin
    const savedSkinId = StorageManager.getSkin();
    if (savedSkinId) {
        const foundSkin = SNAKE_SKINS.find(s => s.id === savedSkinId);
        if (foundSkin) {
            currentSkin = foundSkin;
            updateColors(currentSkin);
        }
    }

    SNAKE_SKINS.forEach(skin => {
        const btn = document.createElement('div');
        btn.className = `skin-option ${skin.id === currentSkin.id ? 'active' : ''}`;
        
        // Create snake preview HTML
        btn.innerHTML = `
            <div class="skin-preview">
                <div class="skin-preview-body" style="background: ${skin.body}"></div>
                <div class="skin-preview-head" style="background: ${skin.head}">
                    <div class="skin-preview-eyes">
                        <div class="skin-preview-eye"></div>
                        <div class="skin-preview-eye"></div>
                    </div>
                </div>
            </div>
            <span class="skin-name" style="color: ${skin.glow}">${skin.name}</span>
        `;
        
        btn.onclick = () => {
            // Remove active class from all
            document.querySelectorAll('.skin-option').forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');
            
            // Set skin
            currentSkin = skin;
            updateColors(skin);
            StorageManager.saveSkin(skin.id);
            
            // Redraw if game not running (to show change immediately)
            if (!isRunning) {
                draw();
            }
        };
        
        skinContainer.appendChild(btn);
    });
}

function updateColors(skin) {
    COLORS.snakeHead = skin.head;
    COLORS.snakeBody = skin.body;
    COLORS.snakeGlow = skin.glow;
}

// Initialize Maps
function initMaps() {
    const mapContainer = document.getElementById('map-options');
    mapContainer.innerHTML = ''; // Clear existing

    // Load saved map
    const savedMapId = StorageManager.getMap();
    if (savedMapId) {
        const foundMap = MAPS.find(m => m.id === savedMapId);
        if (foundMap) {
            currentMap = foundMap;
        }
    }

    MAPS.forEach(map => {
        const btn = document.createElement('div');
        btn.className = `map-option ${map.id === currentMap.id ? 'active' : ''}`;
        
        // Create map preview HTML
        btn.innerHTML = `
            <div class="map-preview">
                <div class="map-emoji">${map.emoji}</div>
            </div>
            <div class="map-info">
                <span class="map-name">${map.name}</span>
            </div>
        `;
        
        btn.onclick = () => {
            // Remove active class from all
            document.querySelectorAll('.map-option').forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');
            
            // Set map
            currentMap = map;
            StorageManager.saveMap(map.id);
            
            // Redraw if game not running (to show change immediately)
            if (!isRunning) {
                draw();
            }
        };
        
        mapContainer.appendChild(btn);
    });
}


// Initialize game
function init() {
    canvas = document.getElementById('game-canvas');
    ctx = canvas.getContext('2d');
    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;

    // Load high score
    highScore = StorageManager.getHighScore();
    document.getElementById('high-score').textContent = highScore;

    initSkins(); // Initialize skin selector
    initMaps(); // Initialize map selector
    initTouchControls(); // Initialize touch controls

    // Event listeners
    document.addEventListener('keydown', handleKeyPress);
    document.getElementById('start-button').addEventListener('click', startGame);
    document.getElementById('restart-button').addEventListener('click', startGame);

    // Initial draw
    resetGame();
    draw();
    
    // Start continuous animation loop for glow effect
    startAnimationLoop();
    
    // Handle responsive canvas sizing
    handleCanvasResize();
    window.addEventListener('resize', handleCanvasResize);
}

// Initialize touch controls for mobile
function initTouchControls() {
    initSwipeControls();
    initFullscreen();
}

// Initialize swipe gesture controls
function initSwipeControls() {
    const canvas = document.getElementById('game-canvas');
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    
    const minSwipeDistance = 30; // Minimum distance for a swipe to register
    
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
    }, { passive: false });
    
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
    }, { passive: false });
    
    canvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        const touch = e.changedTouches[0];
        touchEndX = touch.clientX;
        touchEndY = touch.clientY;
        
        handleSwipe();
    }, { passive: false });
    
    function handleSwipe() {
        if (!isRunning) return;
        
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);
        
        // Check if swipe distance is sufficient
        if (absDeltaX < minSwipeDistance && absDeltaY < minSwipeDistance) {
            return; // Swipe too short
        }
        
        // Determine swipe direction based on which delta is larger
        if (absDeltaX > absDeltaY) {
            // Horizontal swipe
            if (deltaX > 0 && dx !== -1) {
                // Swipe right
                dx = 1;
                dy = 0;
            } else if (deltaX < 0 && dx !== 1) {
                // Swipe left
                dx = -1;
                dy = 0;
            }
        } else {
            // Vertical swipe
            if (deltaY > 0 && dy !== -1) {
                // Swipe down
                dx = 0;
                dy = 1;
            } else if (deltaY < 0 && dy !== 1) {
                // Swipe up
                dx = 0;
                dy = -1;
            }
        }
    }
}

// Global function for fullscreen toggle (called from HTML onclick)
function toggleFullscreen() {
    console.log('toggleFullscreen() - SADECE OYUN!');
    
    const gameContainer = document.querySelector('.game-container');
    const doc = window.document;
    const docEl = doc.documentElement;
    
    // Check if already in fullscreen (with webkit prefix support)
    const requestFullScreen = gameContainer.requestFullscreen || gameContainer.mozRequestFullScreen || gameContainer.webkitRequestFullScreen || gameContainer.msRequestFullscreen;
    const cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
    
    const isFullscreen = !!(doc.fullscreenElement || doc.mozFullScreenElement || doc.webkitFullscreenElement || doc.msFullscreenElement);
    
    if (!isFullscreen) {
        // Enter fullscreen - ONLY GAME CONTAINER
        console.log('Oyun tam ekrana giriyor...');
        
        if (requestFullScreen) {
            requestFullScreen.call(gameContainer).then(() => {
                console.log('Oyun tam ekranda!');
                updateFullscreenButton(true);
            }).catch(err => {
                console.error('Fullscreen ERROR:', err);
                // Fallback to document fullscreen if element fails (common on some mobiles)
                if (docEl.requestFullscreen) {
                     docEl.requestFullscreen().catch(e => console.error('Doc Fullscreen Error', e));
                }
            });
        }
    } else {
        // Exit fullscreen
        console.log('Tam ekrandan çıkılıyor...');
        
        if (cancelFullScreen) {
            cancelFullScreen.call(doc).then(() => {
                updateFullscreenButton(false);
            });
        }
    }
}

// Update fullscreen button appearance
function updateFullscreenButton(isFullscreen) {
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const gameoverBtn = document.getElementById('gameover-fullscreen-btn');
    
    // Update start screen button
    if (fullscreenBtn) {
        const text = fullscreenBtn.querySelector('.fullscreen-text');
        if (text) {
            if (isFullscreen) {
                fullscreenBtn.classList.add('exit-fullscreen');
                text.textContent = 'Tam Ekrandan Çık';
            } else {
                fullscreenBtn.classList.remove('exit-fullscreen');
                text.textContent = 'Tam Ekran';
            }
        }
    }
    
    // Update game over screen button
    if (gameoverBtn) {
        const text = gameoverBtn.querySelector('.fullscreen-text');
        if (text) {
            if (isFullscreen) {
                gameoverBtn.classList.add('exit-fullscreen');
                text.textContent = 'Tam Ekrandan Çık';
            } else {
                gameoverBtn.classList.remove('exit-fullscreen');
                text.textContent = 'Tam Ekran';
            }
        }
    }
}

// Initialize fullscreen functionality
function initFullscreen() {
    console.log('initFullscreen() - Setting up fullscreen event listeners');
    
    // Attach click event listeners to fullscreen buttons
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const gameoverBtn = document.getElementById('gameover-fullscreen-btn');
    
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', toggleFullscreen);
        // Add touchend for better mobile response
        fullscreenBtn.addEventListener('touchend', (e) => {
            e.preventDefault(); // Prevent ghost click
            toggleFullscreen();
        });
    }
    
    if (gameoverBtn) {
        gameoverBtn.addEventListener('click', toggleFullscreen);
        // Add touchend for better mobile response
        gameoverBtn.addEventListener('touchend', (e) => {
            e.preventDefault(); // Prevent ghost click
            toggleFullscreen();
        });
    }
    
    // Listen for fullscreen changes from ESC key or other triggers (with webkit support)
    document.addEventListener('fullscreenchange', () => {
        updateFullscreenButton(!!document.fullscreenElement);
    });
    
    document.addEventListener('webkitfullscreenchange', () => {
        updateFullscreenButton(!!document.webkitFullscreenElement);
    });
    
    document.addEventListener('mozfullscreenchange', () => {
        updateFullscreenButton(!!document.mozFullScreenElement);
    });
    
    document.addEventListener('msfullscreenchange', () => {
        updateFullscreenButton(!!document.msFullscreenElement);
    });
    
    console.log('Fullscreen listeners ready');
}

// Handle responsive canvas sizing
function handleCanvasResize() {
    const canvas = document.getElementById('game-canvas');
    
    if (window.innerWidth <= 600) {
        // Mobile: make canvas responsive
        const containerWidth = canvas.parentElement.offsetWidth;
        const newSize = Math.min(containerWidth, CANVAS_SIZE);
        canvas.style.width = newSize + 'px';
        canvas.style.height = newSize + 'px';
    } else if (window.innerWidth <= 900 && window.matchMedia('(orientation: landscape)').matches) {
        // Landscape mode
        canvas.style.width = '400px';
        canvas.style.height = '400px';
    } else {
        // Desktop: use original size
        canvas.style.width = CANVAS_SIZE + 'px';
        canvas.style.height = CANVAS_SIZE + 'px';
    }
}


// Continuous animation loop (runs even when game is paused)
function startAnimationLoop() {
    function animate() {
        if (!isRunning) {
            // Only redraw when game is not running (to show glow animation)
            draw();
        }
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
}

function resetGame() {
    // Create snake in the middle
    const mid = Math.floor(GRID_COUNT / 2);
    snake = [
        { x: mid, y: mid },
        { x: mid - 1, y: mid },
        { x: mid - 2, y: mid }
    ];

    // Initial direction: right
    dx = 1;
    dy = 0;

    score = 0;
    document.getElementById('score').textContent = score;
    
    createFood();
}

// Start game
function startGame() {
    if (isRunning) return;

    // Hide overlays
    document.getElementById('game-overlay').classList.add('hidden');
    document.getElementById('game-over-overlay').classList.add('hidden');

    resetGame();
    isRunning = true;
    window.requestAnimationFrame(gameLoop);
}

// End game
function endGame() {
    isRunning = false;
    
    // Update high score
    if (score > highScore) {
        highScore = score;
        StorageManager.setHighScore(highScore);
        document.getElementById('high-score').textContent = highScore;
    }
    
    // Show game over
    document.getElementById('final-score').textContent = score;
    document.getElementById('game-over-overlay').classList.remove('hidden');
    
    // Update fullscreen button state if it exists
    const gameoverBtn = document.getElementById('gameover-fullscreen-btn');
    if (gameoverBtn) {
        const btnText = gameoverBtn.querySelector('.fullscreen-text');
        if (document.fullscreenElement) {
            // Already in fullscreen - show exit button (RED)
            btnText.textContent = 'Tam Ekrandan Çık';
            gameoverBtn.classList.add('exit-fullscreen');
        } else {
            // Not in fullscreen - show enter button (GREEN)
            btnText.textContent = 'Tam Ekran';
            gameoverBtn.classList.remove('exit-fullscreen');
        }
    }
}

// Main game loop
function gameLoop(currentTime) {
    if (!isRunning) return;

    window.requestAnimationFrame(gameLoop);

    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < GAME_SPEED / 1000) return;

    lastRenderTime = currentTime;

    update();
    draw();
}

function update() {
    // Move snake
    const newHead = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Check wall collision
    if (newHead.x < 0 || newHead.x >= GRID_COUNT || newHead.y < 0 || newHead.y >= GRID_COUNT) {
        endGame();
        return;
    }

    // Check self collision
    for (let segment of snake) {
        if (segment.x === newHead.x && segment.y === newHead.y) {
            endGame();
            return;
        }
    }

    // Add new head
    snake.unshift(newHead);

    // Check if food eaten
    if (newHead.x === food.x && newHead.y === food.y) {
        score += food.type.points;
        document.getElementById('score').textContent = score;

        // Update high score
        if (score > highScore) {
            highScore = score;
            document.getElementById('high-score').textContent = highScore;
            StorageManager.saveHighScore(highScore);
        }

        // Animate score
        const scoreEl = document.getElementById('score');
        scoreEl.classList.add('score-pop');
        setTimeout(() => scoreEl.classList.remove('score-pop'), 300);

        createFood();
    } else {
        // Remove tail if no food eaten
        snake.pop();
    }
}

// Handle keyboard input
function handleKeyPress(event) {
    // Prevent default scrolling for arrow keys
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(event.key)) {
        event.preventDefault();
    }

    if (!isRunning && (event.key === 'Enter' || event.key === ' ')) {
        startGame();
        return;
    }

    if (!isRunning) return;

    const key = event.key;

    // Update direction (prevent 180-degree turns)
    if ((key === 'ArrowLeft' || key === 'a') && dx !== 1) {
        dx = -1;
        dy = 0;
    } else if ((key === 'ArrowRight' || key === 'd') && dx !== -1) {
        dx = 1;
        dy = 0;
    } else if ((key === 'ArrowUp' || key === 'w') && dy !== 1) {
        dx = 0;
        dy = -1;
    } else if ((key === 'ArrowDown' || key === 's') && dy !== -1) {
        dx = 0;
        dy = 1;
    }
}

// Create food
function createFood() {
    // Pick random fruit type
    const randomFruit = FRUITS[Math.floor(Math.random() * FRUITS.length)];
    
    food = {
        x: Math.floor(Math.random() * GRID_COUNT),
        y: Math.floor(Math.random() * GRID_COUNT),
        type: randomFruit
    };

    // Make sure food doesn't appear on snake
    for (let segment of snake) {
        if (segment.x === food.x && segment.y === food.y) {
            createFood();
            return;
        }
    }
}

// Draw everything
function draw() {
    // Clear canvas with map background color
    ctx.fillStyle = currentMap.bgColor;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw grid with map grid color
    ctx.strokeStyle = currentMap.gridColor;
    ctx.lineWidth = 1;

    for (let i = 0; i <= GRID_COUNT; i++) {
        const pos = i * GRID_SIZE;
        // Vertical lines
        ctx.beginPath();
        ctx.moveTo(pos, 0);
        ctx.lineTo(pos, CANVAS_SIZE);
        ctx.stroke();
        // Horizontal lines
        ctx.beginPath();
        ctx.moveTo(0, pos);
        ctx.lineTo(CANVAS_SIZE, pos);
        ctx.stroke();
    }

    // Draw map pattern/details
    if (currentMap.drawPattern) {
        currentMap.drawPattern(ctx);
    }

    // Draw food
    drawFood();

    // Draw snake
    drawSnake();
}

// Draw snake
function drawSnake() {
    // Add strong but soft shadow (Glow effect)
    ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    snake.forEach((segment, index) => {
        const x = segment.x * GRID_SIZE;
        const y = segment.y * GRID_SIZE;

        if (index === 0) {
            // Draw head
            ctx.fillStyle = COLORS.snakeHead;
            ctx.fillRect(x + 1, y + 1, GRID_SIZE - 2, GRID_SIZE - 2);

            // Draw eyes
            ctx.fillStyle = '#000';
            const eyeSize = 4;
            const eyeOffset = 6;

            // Reset shadow for eyes
            ctx.shadowColor = 'transparent'; 
            
            if (dx === 1) { // Moving right
                ctx.fillRect(x + GRID_SIZE - eyeOffset, y + 5, eyeSize, eyeSize);
                ctx.fillRect(x + GRID_SIZE - eyeOffset, y + GRID_SIZE - 9, eyeSize, eyeSize);
            } else if (dx === -1) { // Moving left
                ctx.fillRect(x + 2, y + 5, eyeSize, eyeSize);
                ctx.fillRect(x + 2, y + GRID_SIZE - 9, eyeSize, eyeSize);
            } else if (dy === -1) { // Moving up
                ctx.fillRect(x + 5, y + 2, eyeSize, eyeSize);
                ctx.fillRect(x + GRID_SIZE - 9, y + 2, eyeSize, eyeSize);
            } else if (dy === 1) { // Moving down
                ctx.fillRect(x + 5, y + GRID_SIZE - eyeOffset, eyeSize, eyeSize);
                ctx.fillRect(x + GRID_SIZE - 9, y + GRID_SIZE - eyeOffset, eyeSize, eyeSize);
            }
            
            // Restore shadow for body
            ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
        } else {
            // Draw body
            ctx.fillStyle = COLORS.snakeBody;
            ctx.fillRect(x + 2, y + 2, GRID_SIZE - 4, GRID_SIZE - 4);
        }
    });

    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
}

// Draw food with large emoji
function drawFood() {
    const x = food.x * GRID_SIZE;
    const y = food.y * GRID_SIZE;

    // Create pulsing glow effect (enhanced)
    const pulse = Math.sin(Date.now() / 300) * 0.4 + 0.8; // Oscillates between 0.4 and 1.2
    
    // Draw outer glow (pulsing) - larger and more visible
    const glowGradient = ctx.createRadialGradient(
        x + GRID_SIZE / 2,
        y + GRID_SIZE / 2,
        0,
        x + GRID_SIZE / 2,
        y + GRID_SIZE / 2,
        GRID_SIZE * 1.2 * pulse
    );
    glowGradient.addColorStop(0, food.type.color + 'AA');
    glowGradient.addColorStop(0.3, food.type.color + '80');
    glowGradient.addColorStop(0.6, food.type.color + '40');
    glowGradient.addColorStop(1, food.type.color + '00');
    
    ctx.fillStyle = glowGradient;
    ctx.beginPath();
    ctx.arc(
        x + GRID_SIZE / 2,
        y + GRID_SIZE / 2,
        GRID_SIZE * 1.2 * pulse,
        0,
        Math.PI * 2
    );
    ctx.fill();

    // Add strong shadow (Glow)
    ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    // Semi-transparent background (original style)
    ctx.fillStyle = food.type.color + '40';
    ctx.beginPath();
    ctx.arc(
        x + GRID_SIZE / 2,
        y + GRID_SIZE / 2,
        GRID_SIZE / 1.7,
        0,
        Math.PI * 2
    );
    ctx.fill();

    // Reset shadow for emoji
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Draw LARGE emoji fruit
    ctx.font = `bold ${GRID_SIZE * 1.2}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    ctx.fillText(
        food.type.emoji,
        x + GRID_SIZE / 2,
        y + GRID_SIZE / 2 + 2
    );
}

// Draw obstacles
function drawObstacles() {
    currentMap.obstacles.forEach(obstacle => {
        const x = obstacle.x * GRID_SIZE;
        const y = obstacle.y * GRID_SIZE;

        // Draw obstacle with gradient
        const gradient = ctx.createLinearGradient(x, y, x + GRID_SIZE, y + GRID_SIZE);
        gradient.addColorStop(0, currentMap.color);
        gradient.addColorStop(1, currentMap.color + '80'); // Semi-transparent

        ctx.fillStyle = gradient;
        ctx.fillRect(x + 1, y + 1, GRID_SIZE - 2, GRID_SIZE - 2);

        // Add border for depth
        ctx.strokeStyle = currentMap.color;
        ctx.lineWidth = 2;
        ctx.strokeRect(x + 1, y + 1, GRID_SIZE - 2, GRID_SIZE - 2);
    });
}

// Start the game when page loads
window.onload = init;
