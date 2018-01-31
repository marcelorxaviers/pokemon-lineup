import React from 'react';
import PropTypes from 'prop-types';

function LineUp(props) {
  return (
    <div>
      <h2>Pokemon Line Up</h2>
      <ul className='pokemon-list'>
      {Object.keys(props.currentSelection).map(function(pokemonName, index) {
        return (
          <li
            key={pokemonName}
            style={pokemonName === props.currentPokemonName ? { color: '#d0021b' } : null}
            className='pokemon-item'
            onClick={props.onClick.bind(null, pokemonName)}
          >
            <div className='pokemon-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                <img
                  className='portrait'
                  src={props.currentSelection[pokemonName].url}
                  alt={'Portrait for ' + pokemonName} />
              </li>
              <li>{pokemonName}</li>
            </ul>
          </li>
        )
      })}
    </ul>
    </div>
  )
}

LineUp.propTypes = {
  currentSelection: PropTypes.object.isRequired,
  currentPokemonName: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}

module.exports = LineUp;
