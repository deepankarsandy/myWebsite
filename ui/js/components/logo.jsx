
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Logo extends PureComponent{
  render(){
    const { size, onClick } = this.props;
    const classes = classnames('logo square rotate-45', `is-${size}`, {
      'btn': !!onClick
    });
    const hrStyle = {
      width:     size === 'small' ? '0.8rem' : '1.5rem',
      height:    size === 'small' ? undefined : '.2rem',
      margin:    size === 'small' ? '-2px -9px 1px -1px' : '-5px -8px 0 0',
      transform: 'rotate(-45deg)'
    };
    const dStyle = {
      margin: size === 'small' ? '0px 0px 0px -2px' : '0 0 0 -15px'
    };
    const sStyle = {
      margin: size === 'small' ? '-5px -19px 0px 1px' : '-5px -35px 0 0'
    };

    return (
      <div className={classes} onClick={onClick} role="button" tabIndex="0" onKeyPress={onClick}>
        <div className="straight">
          <span className={size !== 'small' && 'title'} style={dStyle}>D</span>
          <hr style={hrStyle} />
          <span className={size !== 'small' && 'title'} style={sStyle}>S</span>
        </div>
      </div>
    );
  }
}

export default Logo;

Logo.propTypes = {
  size:    PropTypes.string,
  onClick: PropTypes.func,
};

Logo.defaultProps = {
  size:    '',
  onClick: null,
};
