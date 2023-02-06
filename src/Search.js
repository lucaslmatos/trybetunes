import React from 'react';
import Header from './components/Header';

class Search extends React.Component {
  state = {
    isSearchBtnDisabled: true,
    searchValue: '',
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

  render() {
    const { isSearchBtnDisabled, searchValue } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-search">
          <input
            type="text"
            data-testid="search-artist-input"
            value={ searchValue }
            onChange={ this.handleChange }
          />
          <button
            data-testid="search-artist-button"
            disabled={ isSearchBtnDisabled }
            onClick={ this.onSearchBtnClick }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

export default Search;
