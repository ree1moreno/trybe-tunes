import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from './Loading';
import CardMusic from '../components/CardMusic';
import getMusics from '../services/musicsAPI';
import './album.css';
import Footer from '../components/Footer';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.onClickButton();
  }

  async onClickButton() {
    const { match: { params: { id } } } = this.props;
    const arrayOfMusics = await getMusics(id);
    // console.log(arrayOfMusics);
    this.setState({
      arrayOfMusics,
      musics: arrayOfMusics.slice(1),
      loading: false,
    });
  }

  render() {
    const { arrayOfMusics, loading, musics } = this.state;
    return (
      <div>
        {loading ? <Loading /> : (
          <div data-testid="page-album">
            <Header />
            <div className="player-box">
              <div
                key={ arrayOfMusics[0].artistId }
                className="album-container"
              >
                <img
                  src={ arrayOfMusics[0].artworkUrl100 }
                  alt={ arrayOfMusics[0].artistName }
                />
                <div className="artist-box">
                  <p
                    data-testid="artist-name"
                    className="artist-name"
                  >
                    {arrayOfMusics[0].artistName}
                  </p>
                  <p
                    data-testid="album-name"
                    className="album-name"
                  >
                    {arrayOfMusics[0].collectionName}
                  </p>
                </div>
              </div>
              <hr className="line" />
              <div className="musics-container">
                {musics.map((music) => (<CardMusic
                  key={ music.trackId }
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
                  trackId={ music.trackId }
                  favSong={ music }
                />))}
              </div>
            </div>
          </div>
        )}
        <Footer />
      </div>
    );
  }
}
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
