import { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    artist: '',
  };

  searchArtist = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { artist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        Search
        <form>
          <label htmlFor="artist">
            <input
              type="text"
              name="artist"
              data-testid="search-artist-input"
              id="artist"
              placeholder="Digite o nome da banda ou artista"
              value={ artist }
              onChange={ this.searchArtist }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ artist.length < +'2' }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
