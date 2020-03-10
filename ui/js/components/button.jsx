import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Button extends PureComponent{
  render(){
    const {
      type, onClick, label, className, isBusy, icon, iconAlignRight, disabled, size, bare
    } = this.props;

    const classes = classnames(className, 'button', `is-${size}`, `is-${type}`, {
      'is-light':    !(bare || type),
      'is-outlined': !(bare || type),
      'is-loading':  isBusy,
      'is-text':     bare,
    });

    return (
      <button type="button" disabled={disabled} onClick={onClick} className={classes}>
        {(icon && !iconAlignRight) ? (
          <span className="icon is-small">
            <i className={`fas ${icon}`} />
          </span>
        ) : null}
        <span>{label}</span>
        {(icon && iconAlignRight) ? (
          <span className="icon is-small">
            <i className={`fas ${icon}`} />
          </span>
        ) : null}
      </button>
    );
  }
}

export default Button;

Button.propTypes = {
  label:          PropTypes.string,
  onClick:        PropTypes.func,
  type:           PropTypes.string,
  className:      PropTypes.string,
  disabled:       PropTypes.bool,
  isBusy:         PropTypes.bool,
  icon:           PropTypes.string,
  iconAlignRight: PropTypes.bool,
  size:           PropTypes.string,
  bare:           PropTypes.bool,
};

Button.defaultProps = {
  label:          '',
  onClick:        null,
  type:           '',
  className:      '',
  disabled:       false,
  isBusy:         false,
  icon:           '',
  iconAlignRight: false,
  size:           'normal',
  bare:           false,
};
