import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import './styles/Profile.css';

const url = 'https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-black-png-image_3918427.jpg';

export default class Profile extends Component {
  state = {
    carregando: true,
    perfil: {},
  }

  componentDidMount() {
    this.fetchNaApi();
  }

  fetchNaApi = async () => {
    const resposta = await getUser();
    console.log(resposta);
    this.setState({
      perfil: resposta,
      carregando: false,
    });
  }

  render() {
    const { carregando, perfil } = this.state;
    return (
      <>
        <Header />
        {carregando && <Carregando />}
        {!carregando && (
          <div data-testid="page-profile" className="card-profile">
            <h2>Profile</h2>
            <div className="text-image">
              <div className="so-text">
                <div className="pp">
                  <p>Nome:</p>
                  <p>{perfil.name}</p>
                </div>
                <div className="pp">
                  <p>E-mail:</p>
                  <p>{perfil.email}</p>
                </div>
                <div className="text-area">
                  <p>Descrição</p>
                  <p>{perfil.description}</p>
                </div>
              </div>
              <img
                src={ perfil.image || url }
                alt={ perfil.name || 'Imagem padrao' }
                data-testid="profile-image"
              />
            </div>
            <div className="btn-editar">
              <Link to="/profile/edit"><p>Editar perfil</p></Link>
            </div>
          </div>
        )}
      </>
    );
  }
}
