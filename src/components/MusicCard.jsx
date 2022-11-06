import { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor(props) {
    super(props);
    const { fav } = props;
    this.state = {
      check: fav,
      loading: false,
    };
  }

  favoriteMusics = async ({ target }) => {
    const { checked } = target;
    this.setState({
      check: checked,
      loading: true,
    });
    /* await addSong(this.props); */
    if (checked) {
      await addSong(this.props);
    } else {
      await removeSong(this.props);
    }
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
          { loading && <Loading /> }
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
