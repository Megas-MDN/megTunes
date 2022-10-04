import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import { getUser, updateUser } from '../services/userAPI';
import LabelInput from './LabelInput';
import './styles/ProfileEdit.css';

export default class ProfileEdit extends Component {
  state = {
    carregando: true,
    perfil: {},
    btnDisabled: false,
    redirect: false,
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

  lidaChange = ({ target }) => {
    const { name, value } = target;
    this.setState((prev) => ({
      perfil: { ...prev.perfil,
        [name]: value,
      },
    }), this.validaCampos);
  }

validaCampos = () => {
  const { perfil } = this.state;
  const {
    name,
    email,
    image,
    description,
  } = perfil;

  const emailRgx = /^[a-z0-9.]+@[a-z0-9]+.com/i;

  const valido = !(name
    && description
    && image
    && emailRgx.test(email));

  this.setState({
    btnDisabled: valido,
  });
}

  savedBtn = () => {
    const { perfil } = this.state;
    // const { history } = this.props;
    // history.push('/profile');
    this.setState({
      redirect: true,
    }, async () => {
      await updateUser(perfil);
    });
    // console.log(resposta);
  };

  render() {
    const { carregando, perfil, btnDisabled, redirect } = this.state;
    if (redirect) return <Redirect to="/profile" />;
    return (
      <>
        <Header />
        {carregando && <Carregando />}
        {!carregando && (
          <div data-testid="page-profile-edit" className="edit-container">
            <h2>ProfileEdit</h2>
            <LabelInput
              name="name"
              type="text"
              value={ perfil.name }
              label="Nome"
              lidaChange={ this.lidaChange }
            />
            <LabelInput
              name="email"
              type="email"
              value={ perfil.email }
              label="Email"
              lidaChange={ this.lidaChange }
            />
            {/* <LabelInput
              name="description"
              type="text"
              value={ perfil.description }
              label="Descrição"
              lidaChange={ this.lidaChange }
            /> */}
            <label htmlFor="description" className="label-input">
              Descrição
              <textarea
                name="description"
                id="description"
                cols="40"
                rows="5"
                value={ perfil.description }
                onChange={ this.lidaChange }
                data-testid="edit-input-description"
              />
            </label>
            <LabelInput
              name="image"
              type="text"
              value={ perfil.image }
              label="Imagem"
              lidaChange={ this.lidaChange }
            />
            <button
              type="button"
              data-testid="edit-button-save"
              disabled={ btnDisabled }
              onClick={ this.savedBtn }
              className="btn-salvar"
            >
              Salvar

            </button>

          </div>
        )}
      </>
    );
  }
}
