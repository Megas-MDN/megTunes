import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import InputBtn from './InputBtn';
import './styles/Search.css';

const objPadrao = {
  inputSearch: '',
  isDesabled: true,
  album: [],
};

export default class Search extends Component {
  state = {
    ...objPadrao,
    search: '',
    loading: false,
    btnSearch: false,
  }

  lidaInput = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.setState((prev) => ({
        isDesabled: (prev.inputSearch.length <= 1),
      }));
    });
  };

  lidaClick = () => {
    // const { search } = this.state;
    this.setState((prev) => ({
      search: prev.inputSearch,
      loading: true,
      btnSearch: false,
    }), () => {
      this.setState({
        ...objPadrao,
      }, async () => {
        const { search } = this.state;
        // console.log(search);
        const resposta = await searchAlbumsAPI(search);
        // console.log(resposta);
        this.setState({
          album: resposta,
          loading: false,
          btnSearch: true,
        }, () => {
          console.log(this.state);
        });
      });
    });
  };

  consulta = () => {
    const { search } = this.state;
    console.log(search);
  }

  render() {
    const { inputSearch, isDesabled, loading, search, album, btnSearch } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search" className="search-container">
          {loading ? <Carregando /> : (
            <InputBtn
              lidaClick={ this.lidaClick }
              isDesabled={ isDesabled }
              lidaInput={ this.lidaInput }
              inputSearch={ inputSearch }
            />
          )}
          <div className="music-container">
            {
              btnSearch && (album.length === 0) ? <p>Nenhum álbum foi encontrado</p> : (
                btnSearch && (
                  <>
                    <p>{`Resultado de álbuns de: ${search}`}</p>
                    <div className="result-music">
                      {album.map((el, i) => (
                        <Link
                          data-testid={ `link-to-album-${el.collectionId}` }
                          to={ `/album/${el.collectionId}` }
                          key={ i + el.collectionId }
                        >
                          <div key={ i } className="music-card">
                            <p>{el.artistName}</p>
                            <p>{el.collectionName}</p>
                            <img
                              src={ el.artworkUrl100 }
                              alt={ el.artistId }
                              className="img-music"
                            />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </>
                )
              )
            }
          </div>
        </div>
      </>
    );
  }
}
