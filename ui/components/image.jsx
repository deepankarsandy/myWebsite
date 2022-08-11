/*
modification history
--------------------
01a,09aug2020,deepankar created
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Image extends Component {
  constructor(props){
    super(props);
    this.state = { loading: true };
  }

  onImageLoadError = (e) => {
    e.target.url = 'https://via.placeholder.com/500/FFFFFF/000000?text=upload+your+image';
    this.setState({ loading: false });
  }

  onLoadStart = () => {
    this.setState({ loading: true });
  }

  onLoad = () => {
    this.setState({ loading: false });
  }

  render(){
    const {
      className, url, alt, rounded, imgClass, shadowless, name
    } = this.props;
    const { loading } = this.state;

    const figCx = classNames('field is-marginless', {
      figure: name,
    }, className);

    const imageCx = classNames('image', {
      'has-shadow':              !shadowless,
      spinner:                   loading,
      'is-rounded':              rounded,
    }, className);

    const imgCx = classNames({
      'is-rounded': rounded,
    }, imgClass);

    return (
      <figure className={figCx}>
        <div className={imageCx}>
          <img
            loading="lazy"
            onLoadStart={this.onLoadStart}
            onLoad={this.onLoad}
            onError={this.onImageLoadError}
            className={imgCx}
            src={url}
            alt={alt}
          />
        </div>
        <figcaption className="text-is-truncated">{name}</figcaption>
      </figure>
    );
  }
}

Image.propTypes = {
  url:             PropTypes.string.isRequired,
  alt:             PropTypes.string.isRequired,
  className:       PropTypes.string,
  imgClass:        PropTypes.string,
  name:            PropTypes.string,
  rounded:         PropTypes.bool,
  shadowless:      PropTypes.bool,
};

Image.defaultProps = {
  className:       'is-128x128',
  imgClass:        '',
  name:            '',
  rounded:         false,
  shadowless:      false,
};
