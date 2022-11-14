import { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../styles/Search.css';
import { ReactComponent as NothingFound } from '../images/nothingFound.svg';
import '../styles/NotFound.css';

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
      <div className="pageSearch" data-testid="page-search">
        <Header />
        <div>
          <section className="search bgHeaderTop">
            <form>
              <input
                type="text"
                name="artist"
                data-testid="search-artist-input"
                id="artist"
                placeholder="Digite o nome da banda ou artista"
                value={ artist }
                onChange={ this.onChangeInput }
              />
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ artist.length < +'2' }
                onClick={ this.searchArtist }
              >
                Pesquisar
              </button>
            </form>
          </section>
          <section className="containerSearch">
            { loading ? <Loading />
              : disappearResult
            && (albums.length ? (
              <div className="albumContainer">
                <h2>
                  Resultado de álbuns do(s) artista(s)/banda(s):
                  <span className="searchName">{artAlbs}</span>
                </h2>
                <section className="containerAlbum">
                  {
                    albums
                      .map((album) => (
                        <div className="card" key={ album.artistId }>
                          <Link
                            to={ `/album/${album.collectionId}` }
                            data-testid={ `link-to-album-${album.collectionId}` }
                            className="detailsCard"
                          >
                            <img src={ album.artworkUrl100 } alt={ album.artistName } />
                          </Link>
                          <p className="nameAlbumCard">{ album.collectionName }</p>
                          <p className="nameArtistCard">{ album.artistName }</p>
                        </div>
                      ))
                  }
                </section>
              </div>
            ) : (
              <div className="noResultFound">
                <NothingFound />
                <h3>Nenhum álbum foi encontrado</h3>
              </div>
            )
            )}
          </section>
        </div>
      </div>
    );
  }
}

export default Search;
