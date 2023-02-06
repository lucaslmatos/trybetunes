import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumAPI from './services/searchAlbumsAPI';
import Header from './components/Header';
import Loading from './Loading';

class Search extends React.Component {
  state = {
    isSearchBtnDisabled: true,
    searchValue: '',
    newValue: '',
    isLoading: false,
    showMessage: false,
    searchedAlbum: [{}],
  };

  handleChange = ({ target }) => {
    const num = 2;
    this.setState({
      searchValue: target.value,
    });
    if (target.value.length >= num) {
      this.setState({
        isSearchBtnDisabled: false,
      });
    } else {
      this.setState({
        isSearchBtnDisabled: true,
      });
    }
  };

  onSearchBtnClick = async () => {
    const { searchValue } = this.state;
    const searchAlbum = searchValue;
    this.setState({
      searchValue: '',
      newValue: searchAlbum,
      isSearchTextDisabled: true,
      isSearchBtnDisabled: true,
      isLoading: true,
    });
    const albuns = await searchAlbumAPI(searchAlbum);
    this.setState({
      isLoading: false,
      isSearchTextDisabled: false,
      showMessage: true,
      searchedAlbum: albuns,
    });
  };

  render() {
    const { isSearchBtnDisabled, isSearchTextDisabled,
      searchValue, isLoading, newValue, showMessage, searchedAlbum } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-search">
          <input
            type="text"
            data-testid="search-artist-input"
            value={ searchValue }
            onChange={ this.handleChange }
            disabled={ isSearchTextDisabled }
          />
          <button
            data-testid="search-artist-button"
            disabled={ isSearchBtnDisabled }
            onClick={ this.onSearchBtnClick }
          >
            Pesquisar
          </button>
        </div>
        {showMessage
        && (
          isLoading
            ? <Loading /> : (
              <section>
                <h3>
                  Resultado de álbuns de:
                  {' '}
                  {newValue}
                </h3>
                <ul style={ { listStyleType: 'none' } }>
                  {searchedAlbum.length !== 0
                    ? searchedAlbum.map((album) => (
                      <li
                        key={ album.collectionId }
                      >
                        <Link
                          data-testid={ `link-to-album-${album.collectionId}` }
                          to={ `/album/${album.collectionId}` }
                        >
                          <img src={ album.artworkUrl100 } alt="Imagem do album" />
                          <h2>{album.collectionName}</h2>
                          <h3>{album.artistName}</h3>
                        </Link>
                      </li>)) : <h2>Nenhum álbum foi encontrado</h2>}
                </ul>
              </section>
            ))}
      </div>
    );
  }
}

export default Search;
