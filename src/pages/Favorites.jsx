import { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../styles/Favorites.css';

class Favorites extends Component {
  state = {
    musicsFav: [],
  };

  async componentDidMount() {
    await this.listFavorites();
  }

  listFavorites = async () => {
    this.setState({
    });
    const songFav = await getFavoriteSongs();
    this.setState({
      musicsFav: songFav,
    });
  };

  render() {
    const { musicsFav } = this.state;
    return (
      <main className="containerFav">
        <Header />
        <section>
          <div className="bgHeaderTop title">Músicas Favoritas</div>
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
          </section>
        </section>
      </main>
    );
  }
}

export default Favorites;
