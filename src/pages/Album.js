import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Carregando from '../components/Carregando';
import './styles/Album.css';

export default class Album extends Component {
  state = {
    headAlbum: '',
    album: [],
    carregando: false,
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.fetchNaApi(id);
    this.fetchNoFav();
  }

  fetchNoFav = async () => {
    const resposta = await getFavoriteSongs();
    console.log(resposta);
    const chavsFavs = resposta.reduce((a, b) => ({
      ...a,
      [b.trackId]: true,
    }), {});
    console.log(chavsFavs);
    this.setState({
      ...chavsFavs,
    });
  };

  fetchNaApi = async (id) => {
    const resposta = await getMusics(id);
    console.log(resposta);
    const headAlbum = resposta[0];
    // resposta.shift();
    this.setState({
      headAlbum,
      album: resposta,
    });
  };

  lidaCheckbox = ({ target }) => {
    const { checked, name } = target;
    const { album } = this.state;
    const obj = album.find((musica) => +musica.trackId === +name);
    if (checked) {
      this.setState({ carregando: true,
        [name]: true,
      }, async () => {
        const adicionaFav = await addSong(obj);
        console.log(adicionaFav);
        this.setState({ carregando: false });
      });
    } else {
      this.setState({ carregando: true,
        [name]: false,
      }, async () => {
        const resposta = await removeSong(obj);
        console.log(resposta);
        this.setState({
          carregando: false,
        });
      });
    }
  }

  render() {
    const { state } = this;
    const { headAlbum, album, carregando } = state;
    console.log(album[0]);
    // if (carregando) return <Carregando />;
    return (
      <>
        <Header />
        {carregando && <Carregando />}
        <div className="album-container">
          <div className="play-info">
            <p data-testid="artist-name">{headAlbum?.artistName}</p>
            <p data-testid="album-name">{headAlbum?.collectionName}</p>
            <img src={ album[0]?.artworkUrl100 } alt={ album[0]?.artistName } />
          </div>
          {!carregando && (
            <div data-testid="page-album" className="card-play">
              <p>Songs</p>
              {/* {headAlbum && (album.length > 0) ? ( */}
              {/* // )} */}
              {album.filter((el, _i, arr) => el !== arr[0]).map((el, i) => (<MusicCard
                key={ i }
                trackName={ el.trackName }
                previewUrl={ el.previewUrl }
                trackId={ el.trackId }
                lidaCheckbox={ this.lidaCheckbox }
                state={ state }
              />))}
            </div>
          )}
        </div>
      </>
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
