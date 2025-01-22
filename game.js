// Initialize the map grid and player position
const mapSize = 10;
const map = document.getElementById('map');
let playerPosition = { x: 0, y: 0 };

// List of possible Pokémon encounters
const pokemons = [
    { name: 'Pikachu', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' },
    { name: 'Bulbasaur', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
    { name: 'Charmander', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png' },
    { name: 'Squirtle', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png' },
    { name: 'Eevee', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png' },
    { name: 'Jigglypuff', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png' }
];

// Function to create the map grid
function createMap() {
    for (let y = 0; y < mapSize; y++) {
        for (let x = 0; x < mapSize; x++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.dataset.x = x;
            tile.dataset.y = y;
            map.appendChild(tile);
        }
    }
}

// Function to update the player position
function updatePlayerPosition() {
    // Clear previous player position
    const previousTile = document.querySelector('.tile.player');
    if (previousTile) {
        previousTile.classList.remove('player');
    }

    // Get the new tile for the player
    const newTile = document.querySelector(`[data-x="${playerPosition.x}"][data-y="${playerPosition.y}"]`);
    if (newTile) {
        newTile.classList.add('player');
    }

    // Trigger a random encounter
    triggerEncounter();
}

// Function to trigger an encounter with a Pokémon
function triggerEncounter() {
    const encounterChance = Math.random();
    if (encounterChance < 0.2) { // 20% chance of encountering a Pokémon
        const randomPokemon = pokemons[Math.floor(Math.random() * pokemons.length)];
        document.getElementById('encounter-text').textContent = `A wild ${randomPokemon.name} appears!`;
    } else {
        document.getElementById('encounter-text').textContent = '';
    }
}

// Movement functions
function movePlayer(direction) {
    switch (direction) {
        case 'up':
            if (playerPosition.y > 0) playerPosition.y--;
            break;
        case 'down':
            if (playerPosition.y < mapSize - 1) playerPosition.y++;
            break;
        case 'left':
            if (playerPosition.x > 0) playerPosition.x--;
            break;
        case 'right':
            if (playerPosition.x < mapSize - 1) playerPosition.x++;
            break;
        default:
            break;
    }

    updatePlayerPosition();
}

// Initialize the map and player position
createMap();
updatePlayerPosition();
