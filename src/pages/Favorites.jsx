import { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../styles/Favorites.css';
import Footer from './Footer';

class Favorites extends Component {
  state = {
    musicsFav: [],
    loading: false,
  };

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    await this.listFavorites();
    this.setState({
      loading: false,
    });
  }

  listFavorites = async () => {
    const songFav = await getFavoriteSongs();
    this.setState({
      musicsFav: songFav,
    });
  };

  render() {
    const { musicsFav, loading } = this.state;
    return (
      <main className="containerFav">
        <Header />
        <section className="favPage">
          <div className="bgHeaderTop title">
            Minhas Músicas Favoritas
            <span className="quantityMusics">{ `(${musicsFav.length})` }</span>
          </div>
          { loading ? <Loading />
            : (
              <section className="musicFav">
                {
                  musicsFav
                    .map((music) => (
                      <div key={ music.trackId } className="favFav">
                        <span className="artistName">{ music.artistName }</span>
                        <MusicCard
                          { ...music }
                          fav
                          callBack={ this.listFavorites }
                        />
                      </div>))
                }
              </section>)}
          <Footer />
        </section>
      </main>
    );
  }
}

export default Favorites;
