// Pokémon Data (can be expanded with more Pokémon)
const pokemons = [
    { name: 'Pikachu', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' },
    { name: 'Bulbasaur', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
    { name: 'Charmander', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png' },
    { name: 'Squirtle', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png' },
    { name: 'Eevee', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png' },
    { name: 'Jigglypuff', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png' }
];

// DOM Elements
const pokemonCards = document.getElementById('pokemon-cards');
const catchButton = document.getElementById('catch-button');
const collectionList = document.getElementById('collection-list');

// Function to create Pokémon Cards
function displayPokemons() {
    pokemonCards.innerHTML = ''; // Clear the list before rendering again
    pokemons.forEach((pokemon, index) => {
        const card = document.createElement('div');
        card.classList.add('pokemon-card');
        card.innerHTML = `
            <img src="${pokemon.image}" alt="${pokemon.name}">
            <h3>${pokemon.name}</h3>
            <button onclick="catchPokemon(${index})">Catch</button>
        `;
        pokemonCards.appendChild(card);
    });
}

// Catch Pokémon function
let caughtPokemons = [];

function catchPokemon(index) {
    const pokemon = pokemons[index];
    if (!caughtPokemons.includes(pokemon.name)) {
        caughtPokemons.push(pokemon.name);
        updateCollection();
    }
}

// Update the collection
function updateCollection() {
    collectionList.innerHTML = ''; // Clear the collection list
    caughtPokemons.forEach(pokemon => {
        const li = document.createElement('li');
        li.textContent = pokemon;
        collectionList.appendChild(li);
    });
}

// Initialize the site
displayPokemons();
