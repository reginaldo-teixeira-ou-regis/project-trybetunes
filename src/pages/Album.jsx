import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    album: [],
    infos: {},
  };

  async componentDidMount() {
    await this.searchMusics();
  }

  searchMusics = async () => {
    const { match: { params: { id } } } = this.props;
    console.log(id);
    const [infos, ...album] = await getMusics(id);
    console.log(infos);
    console.log(album);
    this.setState({
      album,
      infos,
    });
  };

  render() {
    const { album, infos } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        Album
        <img src={ infos.artworkUrl100 } alt={ infos.artistName } />
        <h4 data-testid="album-name">{ infos.collectionName }</h4>
        <p data-testid="artist-name">{ infos.artistName }</p>
        {
          album
            .map((artist) => (
              <MusicCard key={ artist.trackId } { ...artist } />
            ))
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
