import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../styles/Album.css';
import Footer from './Footer';

class Album extends Component {
  state = {
    album: [],
    infos: {},
    loading: false,
    getFav: [],
  };

  async componentDidMount() {
    await this.searchMusics();
    await this.getLocalMusics();
  }

  searchMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const [infos, ...album] = await getMusics(id);
    this.setState({
      album,
      infos,
    });
  };

  getLocalMusics = async () => {
    this.setState({
      loading: true,
    });
    const getFav = await getFavoriteSongs();
    this.setState({
      loading: false,
      getFav,
    });
  };

  render() {
    const { album, infos, loading, getFav } = this.state;
    return (
      <div className="musicsContainer" data-testid="page-album">
        <Header />
        <section className="sectionContainerMusic">
          <div className="albumContainer bgHeaderTop">
            <img
              className="albumImg"
              src={ infos.artworkUrl100 }
              alt={ infos.artistName }
            />
            <div className="nameAlbumArtist">
              <h4 data-testid="album-name">{ infos.collectionName }</h4>
              <p data-testid="artist-name">{ infos.artistName }</p>
            </div>
          </div>
          <section className="albumsMusics">
            <ol className="olAlbumResults">
              { loading ? <Loading />
                : (
                  album
                    .map((artist) => {
                      const fav = getFav
                        .some((music) => music.trackId === artist.trackId);
                      return (
                        <MusicCard key={ artist.trackId } { ...artist } fav={ fav } />
                      );
                    })
                )}
            </ol>
          </section>
          <Footer />
        </section>
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
