import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';
import '../pages/styles/Header.css';

const url = 'https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-black-png-image_3918427.jpg';

export default class Header extends Component {
  state = {
    loading: true,
    user: '',
  }

  componentDidMount() {
    this.fetchUser();
  }

fetchUser = async () => {
  const resposta = await getUser();
  // console.log(resposta);
  this.setState({
    user: resposta,
  }, () => {
    this.setState({
      loading: false,
    });
    // console.log(this.state);
  });
}

render() {
  const { loading, user } = this.state;
  return (
    <header data-testid="header-component" className="header-user">
      {!loading && (
        <div className="user-container">
          <h1 data-testid="header-user-name">{user.name}</h1>
          <img src={ user?.image || url } alt={ (user?.name || 'Foto padrao') } />
        </div>
      )}
      {loading && <Carregando />}
      <nav className="nav-bar">
        <NavLink
          to="/search"
          data-testid="link-to-search"
          activeClassName="ativo"
        >
          Pesquisa

        </NavLink>
        <NavLink
          to="/favorites"
          data-testid="link-to-favorites"
          activeClassName="ativo"
        >
          Favoritos

        </NavLink>
        <NavLink
          to="/profile"
          data-testid="link-to-profile"
          activeClassName="ativo"
        >
          Perfil

        </NavLink>
        <NavLink
          to="/"
        >
          Sair

        </NavLink>
      </nav>
    </header>
  );
}
}
