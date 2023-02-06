import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { list } = this.props;
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
