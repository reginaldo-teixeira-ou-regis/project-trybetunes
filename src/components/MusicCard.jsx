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
    const { callBack } = this.props;
    this.setState({
      check: checked,
      loading: true,
    });
    if (checked) {
      await addSong(this.props);
    } else {
      await removeSong(this.props);
      await callBack();
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
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  fav: PropTypes.bool.isRequired,
  callBack: PropTypes.func,
};

MusicCard.defaultProps = {
  callBack: () => {},
};

export default MusicCard;
