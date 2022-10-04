import React, { Component } from 'react';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import './styles/Favorites.css';

export default class Favorites extends Component {
  state = {
    carregando: true,
    album: [],
  }

  componentDidMount() {
    this.fetchNaApi();
  }

  fetchNaApi = async () => {
    const resposta = await getFavoriteSongs();
    console.log(resposta);
    const obj = resposta.reduce((a, b) => ({
      ...a,
      [b.trackId]: true,
    }), {});
    this.setState({
      carregando: false,
      album: resposta,
      ...obj,
    });
  };

  removerFav = async (obj) => {
    const resposta = await removeSong(obj);
    console.log(resposta);
    this.fetchNaApi();
  };

  lidaCheckbox = ({ target: { name } }) => {
    this.setState({ carregando: true }, () => {
      const { album } = this.state;
      const obj = album.find((musica) => +musica.trackId === +name);
      this.removerFav(obj);
    });
  }

  render() {
    const { state } = this;
    const { carregando, album } = state;
    return (
      <>
        <Header />
        {
          carregando && <Carregando />
        }
        {!carregando && (
          <div data-testid="page-favorites" className="fav-container">
            {album.map((el, i) => (<MusicCard
              key={ i }
              trackName={ el.trackName }
              previewUrl={ el.previewUrl }
              trackId={ el.trackId }
              lidaCheckbox={ this.lidaCheckbox }
              state={ state }
            />))}
          </div>)}
      </>
    );
  }
}
