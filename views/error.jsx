
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class UnknownRouteError extends PureComponent{
  render(){
    const { message, error } = this.props;

    return (
      <div>
        <h1> Oops... Couldn&apos;t find you the content</h1>
        <h2>
          Are you looking for this
          {' '}
          <a href="http://localhost:3000">
            Click Here
          </a>
        </h2>
        {!!error.stack && (
        <div style={{
          margin: '30px', borderWidth: '1px', borderColor: '#F00', border: 'dotted', padding: '10px'
        }}
        >
          <h3>
            Error Message:
            &emsp;
            {message}
          </h3>
          <div>Stack trace</div>
          <pre>{error.stack}</pre>
        </div>
        )}
      </div>
    );
  }
}

export default UnknownRouteError;

UnknownRouteError.propTypes = {
  message:  PropTypes.string.isRequired,
  error:    PropTypes.object.isRequired,
};
