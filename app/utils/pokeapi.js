let axios = require('axios');

const pokemonExactMatch = 'pokemon-form'
const pokemonPaths = [ 'type', 'ability', 'pokemon-form' ]
const pokemonSpeciesPaths = [
  'egg-group', 'growth-rate', 'pokemon-color', 'pokemon-habitat', 'pokemon-shape'
]

module.exports = {
  fetchPokemons: input => {
    let promises = [];

    pokemonPaths.forEach(path => {
      promises.push(getPokemons(path, input, 'pokemons'));
    });

    pokemonSpeciesPaths.forEach(path => {
      promises.push(getPokemons(path, input, 'species'));
    });

    promises.push(getPokemons(pokemonExactMatch, input, 'exact_match'));

    return Promise.all(promises);
  },

  getPokemonData: pokemonUrl => {
    return axios.get(window.encodeURI(pokemonUrl)).then( response => {
      return [ response.data.name, response.data.sprites.front_default ];
    });
  }
};

function encodedURI(path, input) {
  return window.encodeURI('https://pokeapi.co/api/v2/' + path + '/' + input + '/?limit=60000');
}

function extractPokemon(response) {
  return response.data.pokemon.map(data => pokemonByName(data.pokemon.name));
}

function extractPokemonSpecies(response) {
  return response.data.pokemon_species.map(species => pokemonByName(species.name));
}

function getPokemons(path, input, responseType) {
  let url = encodedURI(path, input.toLowerCase())
  return axios.get(url).then(
    function (response) {
      if (responseType === 'species') {
        return extractPokemonSpecies(response);
      } else if (responseType === 'pokemons') {
        return extractPokemon(response);
      } else {
        return pokemonByName(response.data.pokemon.name);
      }
    }).catch(
      function (error) {
        return [];
    })
}

function pokemonByName(name) {
  return { 'name': name, 'url': encodedURI(pokemonExactMatch, name) }
}
