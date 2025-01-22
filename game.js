// Setup canvas and game variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set the canvas size
canvas.width = 800;
canvas.height = 600;

// Tile and player setup
const TILE_SIZE = 32;
const player = {
    x: Math.floor(canvas.width / 2 / TILE_SIZE) * TILE_SIZE,
    y: Math.floor(canvas.height / 2 / TILE_SIZE) * TILE_SIZE,
    width: TILE_SIZE,
    height: TILE_SIZE,
    speed: TILE_SIZE,
    health: 100,
    attack: 20,
    defense: 10,
    direction: 'down', // Track player direction for animation
};

// Map setup (grid-based: 1 = grass, 2 = water, 0 = road, 3 = building)
const mapWidth = 50;
const mapHeight = 50;

// Create a simple world map with buildings and NPCs
const gameMap = [];

// Populate map with road, grass, water, and buildings
for (let y = 0; y < mapHeight; y++) {
    let row = [];
    for (let x = 0; x < mapWidth; x++) {
        let tileType;
        if (x === 10 && y === 10) tileType = 3; // Building at (10, 10)
        else if (x === 12 && y === 12) tileType = 4; // NPC at (12, 12)
        else tileType = Math.floor(Math.random() * 3); // Random road, grass, or water
        row.push(tileType);
    }
    gameMap.push(row);
}

// Button references
const btnMoveUp = document.getElementById('btnMoveUp');
const btnMoveDown = document.getElementById('btnMoveDown');
const btnMoveLeft = document.getElementById('btnMoveLeft');
const btnMoveRight = document.getElementById('btnMoveRight');
const btnBattle = document.getElementById('btnBattle');
const btnStats = document.getElementById('btnStats');
const infoBox = document.getElementById('infoBox');

// Button actions
btnMoveUp.addEventListener('click', () => movePlayer(0, -TILE_SIZE));
btnMoveDown.addEventListener('click', () => movePlayer(0, TILE_SIZE));
btnMoveLeft.addEventListener('click', () => movePlayer(-TILE_SIZE, 0));
btnMoveRight.addEventListener('click', () => movePlayer(TILE_SIZE, 0));
btnBattle.addEventListener('click', startBattle);
btnStats.addEventListener('click', showStats);

// Display player stats
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

// Move player function with bounds and scrolling logic
function movePlayer(dx, dy) {
    const newX = player.x + dx;
    const newY = player.y + dy;

    // Check if the player is within bounds (no scrolling beyond map)
    if (newX >= 0 && newX < mapWidth * TILE_SIZE && newY >= 0 && newY < mapHeight * TILE_SIZE) {
        player.x = newX;
        player.y = newY;
    }

    // Check for NPC or building interaction
    const tileX = Math.floor(player.x / TILE_SIZE);
    const tileY = Math.floor(player.y / TILE_SIZE);

    if (gameMap[tileY] && gameMap[tileY][tileX] === 3) {
        alert("You have entered a building!");
    }
    if (gameMap[tileY] && gameMap[tileY][tileX] === 4) {
        alert("You can talk to this NPC!");
    }

    // Trigger battle on random chance
    if (Math.random() < 0.03) {
        startBattle();
    }
}

// Draw the scrolling map
let offsetX = 0;
let offsetY = 0;

function drawMap() {
    // Calculate scroll offset (keep the player in the center of the canvas)
    offsetX = Math.max(0, Math.min(player.x - canvas.width / 2 + TILE_SIZE / 2, mapWidth * TILE_SIZE - canvas.width));
    offsetY = Math.max(0, Math.min(player.y - canvas.height / 2 + TILE_SIZE / 2, mapHeight * TILE_SIZE - canvas.height));

    for (let y = 0; y < Math.floor(canvas.height / TILE_SIZE); y++) {
        for (let x = 0; x < Math.floor(canvas.width / TILE_SIZE); x++) {
            const tile = gameMap[y + Math.floor(offsetY / TILE_SIZE)] ? gameMap[y + Math.floor(offsetY / TILE_SIZE)][x + Math.floor(offsetX / TILE_SIZE)] : 0;
            ctx.fillStyle = getTileColor(tile);
            ctx.fillRect(x * TILE_SIZE - offsetX % TILE_SIZE, y * TILE_SIZE - offsetY % TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
    }
}

// Get tile color based on tile type
function getTileColor(tile) {
    switch (tile) {
        case 0: return 'lightgray';  // road
        case 1: return 'green';      // grass
        case 2: return 'blue';       // water
        case 3: return 'brown';      // building
        case 4: return 'yellow';     // NPC
        default: return 'lightgray'; // default (road)
    }
}

// Draw the player
function drawPlayer() {
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x - offsetX, player.y - offsetY, player.width, player.height);
}

// Update the game loop
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous frame
    drawMap();
    drawPlayer();
    requestAnimationFrame(update);
}

// Start the game loop
update();
