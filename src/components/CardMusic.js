import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      checked: false,
    };
  }

  addFavSong = async () => {
    const { favSong } = this.props;
    this.setState({
      loading: true,
    });
    await addSong(favSong);
    await getFavoriteSongs();
    this.setState({
      loading: false,
      checked: true,
    });
  }

  render() {
    const { loading, checked } = this.state;
    const { trackName, previewUrl, trackId } = this.props;

    return loading ? <Loading /> : (
      <div className="card-container" data-testid="page-MusicCard">
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <div>
          <label
            className="favorite-container"
            htmlFor="favorite-song-input"
          >
            <span>Favorita</span>
            <input
              type="checkbox"
              name="favorite-song-input"
              data-testid={ `checkbox-music-${trackId}` }
              className="favorite-icon"
              defaultChecked={ checked }
              onClick={ this.addFavSong }
            />
          </label>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  favSong: PropTypes.shape({
    trackId: PropTypes.number,
    wrapperType: PropTypes.string,
  }).isRequired,
};

export default MusicCard;
