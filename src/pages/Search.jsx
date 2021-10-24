import React from 'react';
import { Link } from 'react-router-dom';
import './search.css';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import Footer from '../components/Footer';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loading: false,
      searchTitle: '',
      resultAPI: [],
      errorMessage: '',
    };
  }

  onInputChange = ({ target }) => {
    this.setState({
      name: target.value,
    });
  }

  searchArtistOnAPI = async () => {
    const { name } = this.state;
    this.setState({
      name: '',
      loading: true,
    });
    const resultSearch = await searchAlbumsAPI(name);
    this.setState({
      loading: false,
      searchTitle: `Resultado de álbuns de: ${name}`,
      resultAPI: resultSearch,
      errorMessage: 'Nenhum álbum foi encontrado',
    });
  }

  render() {
    const { name, loading, searchTitle, resultAPI, errorMessage } = this.state;
    return (
      <div className="search-container" data-testid="page-search">
        <Header />
        { loading ? <Loading /> : (
          <form className="search-form">
            <label htmlFor="searchTitle">
              <input
                type="text"
                name="searchTitle"
                className="search-input"
                placeholder="Insira o nome da banda ou artista"
                autoComplete="off"
                data-testid="search-artist-input"
                value={ name }
                onChange={ this.onInputChange }
              />
            </label>
            <button
              type="submit"
              className="search-button"
              data-testid="search-artist-button"
              disabled={ name.length < 2 }
              onClick={ this.searchArtistOnAPI }
            >
              Procurar
            </button>
          </form>)}
        <p className="result-title">{searchTitle}</p>
        <div className="result-container">
          {resultAPI.length === 0 ? (<p className="error-message">{errorMessage}</p>) : (
            resultAPI.map((album) => {
              const { artworkUrl100, collectionName, artistName, collectionId } = album;
              return (
                <div className="artist-card-box" key={ collectionId }>
                  <Link
                    data-testid={ `link-to-album-${collectionId}` }
                    to={ `/album/${collectionId}` }
                  >
                    <img alt="imagem" src={ artworkUrl100 } className="album-cover" />
                    <div className="title-box">
                      <h3 className="album-title">{ artistName }</h3>
                      <p className="artist">{ collectionName }</p>
                    </div>
                  </Link>
                </div>
              );
            })
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Search;
