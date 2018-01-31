import React from 'react';
import PropTypes from 'prop-types';

class PokemonData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentData: props.currentPokemon.data,
      currentPokemon: props.currentPokemon
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let data = event.target.value;
    this.setState({ currentData: data });
    this.props.onDataChange(data);
  }

  render() {
    return (
      <div>
        <h2>Pokemon Data</h2>
        <textarea rows="10" cols="100"
          placeholder="Write down your pokemon specific data here..."
          value={this.props.currentPokemon.data}
          onChange={(event) => this.handleChange(event)}
        />
      </div>
    )
  }
}

PokemonData.propTypes = {
  currentPokemon: PropTypes.object.isRequired,
  onDataChange: PropTypes.func.isRequired
}

module.exports = PokemonData;
