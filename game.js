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
    speed: 4,
    health: 100,
    attack: 20,
    defense: 10
};

// Map setup (grid-based: 1 = grass, 2 = water, 0 = road)
const mapWidth = Math.floor(canvas.width / TILE_SIZE);
const mapHeight = Math.floor(canvas.height / TILE_SIZE);
const gameMap = Array.from({ length: mapHeight }, () =>
    Array.from({ length: mapWidth }, () => Math.floor(Math.random() * 3)) // Random map tiles
);

// Button UI handling
const btnBattle = document.getElementById('btnBattle');
const btnStats = document.getElementById('btnStats');
const infoBox = document.getElementById('infoBox');

// Button actions
btnBattle.addEventListener('click', () => startBattle());
btnStats.addEventListener('click', () => showStats());

// Show player stats
function showStats() {
    infoBox.style.display = 'block';
    infoBox.innerHTML = `
        <h2>Player Stats</h2>
        <p>Health: ${player.health}</p>
        <p>Attack: ${player.attack}</p>
        <p>Defense: ${player.defense}</p>
        <button class="uiButton" onclick="infoBox.style.display = 'none'">Close</button>
    `;
}

// Simple battle system
function startBattle() {
    alert("A wild Pokémon appeared!");
    let enemyHealth = 50;
    let enemyAttack = 15;

    // Battle loop
    while (player.health > 0 && enemyHealth > 0) {
        const action = prompt("Choose an action: [1] Attack [2] Run");
        if (action === '1') {
            let damage = Math.max(player.attack - enemyAttack, 0);
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

        // Enemy attacks
        let enemyDamage = Math.max(enemyAttack - player.defense, 0);
        player.health -= enemyDamage;
        alert(`The wild Pokémon attacks you for ${enemyDamage} damage!`);
        
        if (player.health <= 0) {
            alert("You were defeated!");
            break;
        }
    }
}

// Draw grid-based map (each tile has a color)
function drawMap() {
    for (let y = 0; y < mapHeight; y++) {
        for (let x = 0; x < mapWidth; x++) {
            switch (gameMap[y][x]) {
                case 0:
                    ctx.fillStyle = 'lightgray'; // road
                    break;
                case 1:
                    ctx.fillStyle = 'green'; // grass
                    break;
                case 2:
                    ctx.fillStyle = 'blue'; // water
                    break;
            }
            ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
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
    // Player movement (arrow keys or WASD)
    let moved = false;
    if (keys['ArrowLeft'] || keys['a']) {
        player.x -= player.speed;
        moved = true;
    }
    if (keys['ArrowRight'] || keys['d']) {
        player.x += player.speed;
        moved = true;
    }
    if (keys['ArrowUp'] || keys['w']) {
        player.y -= player.speed;
        moved = true;
    }
    if (keys['ArrowDown'] || keys['s']) {
        player.y += player.speed;
        moved = true;
    }

    // Boundaries check
    player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
    player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));

    // Trigger random battle (10% chance)
    if (Math.random() < 0.03 && moved) {
        startBattle();
    }

    // Draw everything
    drawMap();
    drawPlayer();

    requestAnimationFrame(update);
}

// Handle key events for movement
let keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});
window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Start the game loop
update();
