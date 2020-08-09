import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Button extends PureComponent {
  render(){
    const {
      label, className, isBusy, icon, iconAlignRight, bare, ...otherProps
    } = this.props;

    const classes = classNames(className, 'button', {
      'is-loading':  isBusy,
      'is-text':     bare,
    });

    return (
      <button type="button" className={classes} {...otherProps}>
        {(icon && !iconAlignRight) ? (
          <span className="icon">
            <i className={icon} />
          </span>
        ) : null}
        {label && <span>{label}</span>}
        {(icon && iconAlignRight) ? (
          <span className="icon">
            <i className={icon} />
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
  className:      PropTypes.string,
  disabled:       PropTypes.bool,
  isBusy:         PropTypes.bool,
  icon:           PropTypes.string,
  iconAlignRight: PropTypes.bool,
  bare:           PropTypes.bool,
};

Button.defaultProps = {
  label:          '',
  onClick:        undefined,
  className:      '',
  disabled:       false,
  isBusy:         false,
  icon:           '',
  iconAlignRight: false,
  bare:           false,
};
