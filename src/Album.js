import React from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import getMusics from './services/musicsAPI';
import Loading from './Loading';
import MusicCard from './components/MusicCard';

class Album extends React.Component {
  state = {
    content: [{}],
    isLoading: false,
  };

  componentDidMount() {
    this.getMusic();
  }

  getMusic = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState({
      isLoading: true,
    });
    const contentAPI = await getMusics(id);
    this.setState({
      content: contentAPI,
      isLoading: false,
    });
  };

  render() {
    const { content, isLoading } = this.state;
    const songs = content.slice(1);
    return (
      <div>
        <Header />
        {isLoading
          ? <Loading /> : (
            <div data-testid="page-album">
              <h2 data-testid="album-name">
                <div>
                  <img src={ content[0]?.artworkUrl100 } alt="Imagem do album" />
                </div>
                Album
                {' '}
                {content[0]?.collectionName}
              </h2>
              <h3 data-testid="artist-name">{ content[0]?.artistName }</h3>
              <MusicCard list={ songs } />
            </div>)}
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
