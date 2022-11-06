import { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    artist: '',
    loading: false,
    albums: [],
    disappearResult: false,
  };

  onChangeInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
      artAlbs: value,
      disappearResult: false,
    });
  };

  searchArtist = async () => {
    const { artist } = this.state;
    this.setState({
      loading: true,
    });
    const albums = await searchAlbumsAPI(artist);
    this.setState({
      loading: false,
      artist: '',
      albums,
      disappearResult: true,
    });
  };

  render() {
    const { artist, loading, albums, artAlbs, disappearResult } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Loading />
          : (
            <form>
              <label htmlFor="artist">
                <input
                  type="text"
                  name="artist"
                  data-testid="search-artist-input"
                  id="artist"
                  placeholder="Digite o nome da banda ou artista"
                  value={ artist }
                  onChange={ this.onChangeInput }
                />
              </label>
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ artist.length < +'2' }
                onClick={ this.searchArtist }
              >
                Pesquisar
              </button>
            </form>
          )}
        <br />
        {
          disappearResult
          && (
            albums.length ? (
              <div>
                <h4>
                  Resultado de álbuns de:
                  {' '}
                  {artAlbs}
                </h4>
                {
                  albums
                    .map((album) => (
                      <div key={ album.artistId }>
                        <img src={ album.artworkUrl100 } alt={ album.artistName } />
                        <p>{ album.collectionName }</p>
                        <p>{ album.artistName }</p>
                        <Link
                          to={ `/album/${album.collectionId}` }
                          data-testid={ `link-to-album-${album.collectionId}` }
                        >
                          Detalhes
                        </Link>
                      </div>
                    ))
                }
              </div>
            ) : <p>Nenhum álbum foi encontrado</p>
          )
        }
      </div>
    );
  }
}

export default Search;
