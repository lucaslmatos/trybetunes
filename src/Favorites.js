import React from 'react';
import Header from './components/Header';
import MusicCard from './components/MusicCard';
import Loading from './Loading';
import { getFavoriteSongs } from './services/favoriteSongsAPI';

class Favorites extends React.Component {
  state = {
    isLoading: false,
    favorites: [{}],
  };

  componentDidMount() {
    this.recuperaFavoritas();
  }

  recuperaFavoritas = async () => {
    this.setState({
      isLoading: true,
    });
    const favorites = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      favorites,
    });
  };

  render() {
    const { isLoading, favorites } = this.state;
    const tr = true;
    if (isLoading) return <Loading />;
    return (
      <div>
        <Header />
        <div data-testid="page-favorites">
          <h2>Músicas Favoritas: </h2>
          <MusicCard list={ favorites } fav={ tr } />
        </div>
      </div>
    );
  }
}

export default Favorites;
