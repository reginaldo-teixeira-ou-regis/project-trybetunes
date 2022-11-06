import { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  state = {
    musicsFav: [],
    loading: false,
  };

  async componentDidMount() {
    await this.listFavorites();
  }

  listFavorites = async () => {
    this.setState({
      loading: true,
    });
    const songFav = await getFavoriteSongs();
    this.setState({
      loading: false,
      musicsFav: songFav,
    });
  };

  render() {
    const { musicsFav, loading } = this.state;
    return (
      <div>
        { loading ? <Loading />
          : (
            <div data-testid="page-favorites">
              <Header />
              Favorites
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
            </div>
          )}
      </div>
    );
  }
}

export default Favorites;
