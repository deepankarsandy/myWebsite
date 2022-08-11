/*
modification history
--------------------
01a,09aug2020,deepankar created
*/

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class NoContent extends PureComponent {
  render(){
    const { message, children, icon, className } = this.props;

    return (
      <main className={`page-message content is-flex ${className}`}>
        <div className="has-text-centered">
          <span className="large-icon">
            <i className={icon} />
          </span>
          <h1 className="title is-4">{message}</h1>
          <div>
            {children}
          </div>
        </div>
      </main>
    );
  }
}

NoContent.propTypes = {
  message: PropTypes.string,
  icon:    PropTypes.string,
};

NoContent.defaultProps = {
  message: '',
  icon:    'fas fa-frown 2x',
};
