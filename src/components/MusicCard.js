import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../pages/styles/MusicCard.css';

export default class MusicCard extends Component {
  render() {
    const { trackName, previewUrl, trackId, lidaCheckbox, state } = this.props;
    // console.log(state?.trackId);
    return (
      <div className="music-card-album">
        <div className="name-check">
          <label htmlFor="favorita">
            Favorita
            <input
              type="checkbox"
              name={ trackId }
              id="favorita"
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ lidaCheckbox }
              checked={ (state[trackId] || false) }
            />
          </label>
          <p>{trackName}</p>
        </div>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  lidaCheckbox: PropTypes.func.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  state: PropTypes.shape({
    trackId: PropTypes.string,
  }).isRequired,
};
