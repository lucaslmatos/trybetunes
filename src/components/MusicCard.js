import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../Loading';

class MusicCard extends React.Component {
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

  adicionaFavorita = async ({ target }) => {
    const { list } = this.props;
    const { favorites } = this.state;
    const currentSong = list.filter((song) => String(song.trackId) === target.id);
    this.setState({
      isLoading: true,
    });
    if (favorites.some((songs) => currentSong[0].trackId === songs.trackId)) {
      await removeSong(currentSong[0]);
    } else {
      await addSong(currentSong[0]);
    }
    this.setState({
      isLoading: false,
    });
    this.recuperaFavoritas();
  };

  render() {
    const { list } = this.props;
    const { isLoading, favorites } = this.state;
    if (isLoading) return <Loading />;
    return (
      <ul>
        { list.map((song) => (
          <li key={ song.trackName }>
            <p>{song.trackName}</p>
            <audio data-testid="audio-component" src={ song.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              {' '}
              <code>audio</code>
              .
            </audio>
            <label
              htmlFor="favorite"
              data-testid={ `checkbox-music-${song.trackId}` }
            >
              <input
                type="checkbox"
                onChange={ this.adicionaFavorita }
                id={ song.trackId }
                checked={ (favorites.some((songs) => songs.trackId === song.trackId)) }
              />
              Favorita
            </label>
          </li>))}
      </ul>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    trackName: PropTypes.string.isRequired,
  })).isRequired,
};
