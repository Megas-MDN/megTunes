import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class LabelInput extends Component {
  render() {
    const { name, type, value, label, lidaChange } = this.props;
    return (
      <label htmlFor={ name } className="label-input">
        {label}
        <input
          type={ type }
          name={ name }
          id={ name }
          value={ value }
          data-testid={ `edit-input-${name}` }
          onChange={ lidaChange }
        />
      </label>
    );
  }
}

LabelInput.propTypes = {
  label: PropTypes.string.isRequired,
  lidaChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
