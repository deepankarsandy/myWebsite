/*
modification history
--------------------
01a,09aug2020,deepankar created
*/

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Loading extends PureComponent {
  render(){
    const {
      active, className
    } = this.props;

    if (!active){
      return null;
    }

    const barCx = classNames('progress', className);

    return (
      <progress className={barCx} max="100" />
    );
  }
}

Loading.propTypes = {
  active:    PropTypes.bool,
  className: PropTypes.string,
};

Loading.defaultProps = {
  active:    true,
  className: '',
};
