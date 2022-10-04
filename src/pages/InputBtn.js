import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class InputBtn extends Component {
  render() {
    const { lidaClick, isDesabled, lidaInput, inputSearch } = this.props;
    return (
      <div className="form-container">
        <label htmlFor="input-search" className="input-label-pesquisa">
          <input
            className="input-pesquisa"
            data-testid="search-artist-input"
            id="input-search"
            value={ inputSearch }
            name="inputSearch"
            onChange={ lidaInput }
          />
        </label>
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ isDesabled }
          onClick={ lidaClick }
          className="btn-pesquisa"
        >
          Pesquisar

        </button>
      </div>
    );
  }
}

InputBtn.propTypes = {
  inputSearch: PropTypes.string.isRequired,
  isDesabled: PropTypes.bool.isRequired,
  lidaClick: PropTypes.func.isRequired,
  lidaInput: PropTypes.func.isRequired,
};
