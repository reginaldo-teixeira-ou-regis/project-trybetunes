import { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import '../styles/MusicCard.css';

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
    const { trackName, previewUrl, trackId, artistName } = this.props;
    const { check, loading } = this.state;
    return (
      <div className="musicContainer">
        <li className="audioPlayerContainer">
          <span className="artistName artistNameDisplayNone">{ artistName }</span>
          <span className="trackName">{trackName}</span>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
            .
          </audio>
          <span>{ loading && <Loading /> }</span>
          <label htmlFor={ trackId } className="label">
            <input
              type="checkbox"
              name="check"
              id={ trackId }
              className="favorita"
              data-testid={ `checkbox-music-${trackId}` }
              checked={ check }
              onChange={ this.favoriteMusics }
            />
            <svg
              className="mysvg"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M4.318 6.318a4.5 4.5 0 000
                6.364L12 20.364l7.682-7.682a4.5
                        4.5 0 00-6.364-6.364L12
                        7.636l-1.318-1.318a4.5
                        4.5 0 00-6.364 0z"
              />
            </svg>
          </label>
        </li>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  fav: PropTypes.bool.isRequired,
  callBack: PropTypes.func,
};

MusicCard.defaultProps = {
  callBack: () => {},
};

export default MusicCard;
