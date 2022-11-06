import { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      check: false,
      loading: false,
    };
  }

  favoriteMusics = async ({ target }) => {
    const { checked } = target;
    this.setState({
      check: checked,
      loading: true,
    });
    await addSong(this.props);
    this.setState({
      loading: false,
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { check, loading } = this.state;
    return (
      <div>
        <div>
          <h2>{trackName}</h2>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
            .
          </audio>
          <label htmlFor="favorita">
            Favorita
            <input
              type="checkbox"
              name="favorita"
              data-testid={ `checkbox-music-${trackId}` }
              id="favorita"
              onChange={ this.favoriteMusics }
              checked={ check }
            />
          </label>
          { loading && <p>Carregando...</p> }
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;

export default MusicCard;
