import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Carregando from '../components/Carregando';
import { createUser } from '../services/userAPI';
import './styles/Login.css';

export default class Login extends Component {
  state = {
    loading: false,
    isDisabled: true,
    inputLogin: '',
  };

  habilitaBotao = () => {
    const { inputLogin } = this.state;
    const MIN_LENG = 3;
    if (inputLogin.length >= MIN_LENG) {
      this.setState({
        isDisabled: false,
      });
    }
  }

  validaInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.habilitaBotao);
  };

  lidaClick = () => {
    const { history } = this.props;
    const { inputLogin } = this.state;
    this.setState({
      loading: true,
    }, async () => {
      await createUser({ name: inputLogin });
      history.push('/search');
    });
  }

  render() {
    const { isDisabled, loading } = this.state;
    if (loading) {
      return (<Carregando />);
    }

    return (
      <div data-testid="page-login" className="login">
        <p>Login</p>
        <label htmlFor="login-input" className="input-label">
          <input
            type="text"
            data-testid="login-name-input"
            id="login-input"
            onChange={ this.validaInput }
            name="inputLogin"
            className="input-name"
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ isDisabled }
          onClick={ this.lidaClick }
          className="btn"
        >
          Entrar

        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
