// Setup canvas and game variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set the canvas size
canvas.width = 800;
canvas.height = 600;

// Tile and player setup
const TILE_SIZE = 32;
const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: TILE_SIZE,
    height: TILE_SIZE,
    speed: 4
};

// Map setup (simple grid)
const mapWidth = Math.floor(canvas.width / TILE_SIZE);
const mapHeight = Math.floor(canvas.height / TILE_SIZE);
const gameMap = Array(mapHeight).fill().map(() => Array(mapWidth).fill(0));

// Player movement
let keys = {};

window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Simple battle system
function startBattle() {
    alert("A wild Pokémon appeared!");
    let playerHealth = 100;
    let enemyHealth = 50;

    // Simple battle loop
    while (playerHealth > 0 && enemyHealth > 0) {
        const action = prompt("Choose an action: [1] Attack [2] Run");
        if (action === '1') {
            let damage = Math.floor(Math.random() * 20) + 10;
            enemyHealth -= damage;
            alert(`You attacked the wild Pokémon for ${damage} damage!`);
        } else if (action === '2') {
            alert("You ran away!");
            return;
        }

        if (enemyHealth <= 0) {
            alert("You defeated the wild Pokémon!");
            break;
        }

        // Enemy attack
        let enemyDamage = Math.floor(Math.random() * 15) + 5;
        playerHealth -= enemyDamage;
        alert(`The wild Pokémon attacks you for ${enemyDamage} damage!`);
        
        if (playerHealth <= 0) {
            alert("You were defeated!");
            break;
        }
    }
}

// Check for battle encounters
function checkForBattle() {
    // Random encounter chance (10% chance to trigger battle)
    if (Math.random() < 0.1) {
        startBattle();
    }
}

// Draw map (just simple squares)
function drawMap() {
    for (let y = 0; y < mapHeight; y++) {
        for (let x = 0; x < mapWidth; x++) {
            if (gameMap[y][x] === 0) {
                ctx.fillStyle = 'green';
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
        }
    }
}

// Draw player
function drawPlayer() {
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Update game state
function update() {
    // Player movement
    if (keys['ArrowLeft'] || keys['a']) player.x -= player.speed;
    if (keys['ArrowRight'] || keys['d']) player.x += player.speed;
    if (keys['ArrowUp'] || keys['w']) player.y -= player.speed;
    if (keys['ArrowDown'] || keys['s']) player.y += player.speed;

    // Boundaries check
    player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
    player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));

    // Check for battle every 30 frames (to reduce frequency)
    if (Math.random() < 0.03) {
        checkForBattle();
    }

    // Draw everything
    drawMap();
    drawPlayer();

    requestAnimationFrame(update);
}

// Start the game loop
update();
