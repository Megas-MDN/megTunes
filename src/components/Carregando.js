import React, { Component } from 'react';
import '../pages/styles/Carregando.css';

export default class Carregando extends Component {
  render() {
    return (
      <div className="header-container">
        <p>Carregando...</p>
        <div className="c-loader" />
      </div>
    );
  }
}
