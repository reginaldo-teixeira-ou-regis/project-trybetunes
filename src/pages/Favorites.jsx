import { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../styles/Favorites.css';

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
          <div className="bgHeaderTop title">Músicas Favoritas</div>
          { loading ? <Loading />
            : (
              <section className="musicFav">
                {
                  musicsFav
                    .map((music) => (
                      <MusicCard
                        key={ music.trackId }
                        { ...music }
                        fav
                        callBack={ this.listFavorites }
                      />))
                }
              </section>)}
        </section>
      </main>
    );
  }
}

export default Favorites;
