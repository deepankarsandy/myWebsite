
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Logo extends PureComponent{
  render(){
    const { size } = this.props;
    const classes = classnames('square rotate-45', `is-${size}`);
    const hrStyle = {
      width:     size === 'small' ? '1rem' : '1.5rem',
      height:    size === 'small' ? undefined : '.2rem',
      margin:    '-5px -8px 0 0',
      transform: 'rotate(-45deg)'
    };
    const dStyle = {
      margin: size === 'small' ? '0 0 0 -5px' : '0 0 0 -15px'
    };
    const sStyle = {
      margin: size === 'small' ? '-5px -25px 0 0' : '-5px -35px 0 0'
    };

    return (
      <div className={classes}>
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
  size: PropTypes.string,
};

Logo.defaultProps = {
  size: '',
};
