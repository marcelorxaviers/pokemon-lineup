import React from 'react';
import PropTypes from 'prop-types';
import PokeApi from '../utils/pokeapi';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: props.searchInput
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ searchInput: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.refs.searchTextInput.value);
  }

  render() {
    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <input
          type="text"
          placeholder="Search..."
          value={this.state.searchInput}
          ref="searchTextInput"
          onChange={(event) => this.handleChange(event)}
        />
        <button className="search-button">Search</button>
      </form>
    )
  }
}

SearchForm.propTypes = {
  searchInput: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

function SearchResult(props) {
  return (
    <ul className='pokemon-buttons-list'>
      {props.pokemons.map(function(pokemon, index) {
        return (
          <li key={pokemon.name} className='pokemon-item'>
              <button onClick={props.onClick.bind(null, pokemon.url, index)}>
                {pokemon.name}
              </button>
          </li>
        )
      })}
    </ul>
  )
}

SearchResult.propTypes = {
  pokemons: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
}

class Pokedex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      pokemons: null
    };

    this.onSelect = this.onSelect.bind(this);
    this.updateResult = this.updateResult.bind(this);
  }

  componentDidMount() {
    this.updateResult(this.state.searchInput);
  }

  onSelect(pokemonUrl, index) {
    let newPokemonsList = this.state.pokemons.slice();
    newPokemonsList.splice(index, 1);

    this.setState({ pokemons: newPokemonsList });
    this.props.onSelect(pokemonUrl);
  }

  updateResult(input) {
    this.setState({
      searchInput: input,
    });

    if (!input) { return; };

    PokeApi.fetchPokemons(input).then(function(results) {
      let pokemons = [].concat.apply([], results).filter((value, index, self) => {
          return self.indexOf(value) === index;
      });
      this.setState({ pokemons: pokemons.length > 0 ? pokemons : null });
    }.bind(this));
  }

 render() {
    return (
      <div>
        <h2>Pokedex Area</h2>
        <SearchForm
          searchInput={this.state.searchInput}
          onSubmit={this.updateResult}
        />
        {!this.state.pokemons
          ? <p>No results</p>
          : <SearchResult
              pokemons={this.state.pokemons}
              onClick={this.onSelect}
            />
        }
      </div>
    )
  }
}

module.exports = Pokedex;
