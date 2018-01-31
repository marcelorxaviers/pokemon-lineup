import React from 'react';
import Pokedex from './Pokedex'
import LineUp from './line_up'
import PokemonData from './pokemon_data'
import PokeApi from '../utils/pokeapi';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lineUp: {},
      currentPokemon: {},
    };
    this.addPokemon = this.addPokemon.bind(this);
    this.selectPokemon = this.selectPokemon.bind(this);
    this.handleCurrentPokemonData = this.handleCurrentPokemonData.bind(this);
  }

  selectPokemon(pokemonName) {
    this.setState({ currentPokemon: this.state.lineUp[pokemonName] });
  }

  handleCurrentPokemonData(data) {
    this.state.currentPokemon.data = data;
  }

  addPokemon(pokemonUrl) {
    let currentLineUp = Object.assign({}, this.state.lineUp);

    PokeApi.getPokemonData(pokemonUrl).then(function(pokemon) {
      let pokemons = Object.keys(currentLineUp);
      if (pokemons.length > 5) {
        delete currentLineUp[pokemons[0]];
      };
      currentLineUp[pokemon[0]] = { 'name': pokemon[0], 'url': pokemon[1], 'data': '' };
      this.setState({ lineUp: currentLineUp });
    }.bind(this));
  }

  render() {
    return (
      <section className="columns">
        <div className="column">
          <LineUp
            currentSelection={this.state.lineUp}
            onClick={this.selectPokemon}
            currentPokemonName={this.state.currentPokemon.name}
          />
          <div>
            <hr/>
          </div>
          {Object.keys(this.state.currentPokemon).length === 0
          ? <p>Select one Pokemon</p>
          : <PokemonData
              currentPokemon={this.state.currentPokemon}
              onDataChange={this.handleCurrentPokemonData}
            />
          }
        </div>
        <div className="column">
          <Pokedex
            onSelect={this.addPokemon}
          />
        </div>
      </section>
    )
  }
}

module.exports = App;
