/*
modification history
--------------------
01a,09aug2020,deepankar created
*/

import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import isPresent from '../helpers/isPresent';
import isEmpty from '../helpers/isEmpty';

export default class Avatar extends PureComponent {
  constructor(props){
    super(props);
    this.getBodyContent = this.getBodyContent.bind(this);
    this.onImageLoadError = this.onImageLoadError.bind(this);

    this.state = { loadError: false };
  }

  componentDidUpdate(prevProps){
    const { url } = this.props;

    if (prevProps.url !== url){
      this.setState({ loadError: false }); // eslint-disable-line react/no-did-update-set-state
    }
  }

  onImageLoadError(){
    this.setState({ loadError: true });
  }

  getBodyContent(){
    const {
      url, alt, name, onClick, className
    } = this.props;
    const { loadError } = this.state;

    const cx = classNames('image is-rounded', {
      'cursor-pointer':    isPresent(onClick),
      'initials is-large': isEmpty(url) || loadError,
    }, className);

    if (isPresent(url) && !loadError){
      return (
        <img
          loading="lazy"
          className={cx}
          onLoadStart={this.onLoadStart}
          onLoad={this.onLoad}
          onError={this.onImageLoadError}
          src={url}
          alt={alt || name}
        />
      );
    }

    return (
      <div className={cx} style={avatarText.getStyle(name)}>
        {avatarText.getInitials(name)}
      </div>
    );
  }

  render(){
    const {
      figCx, onClick, name, renderName, className, url, alt, ...otherProps
    } = this.props;

    const cx = classNames('avatar figure', figCx);
    const captionCx = classNames('is-block has-text-centered', {
      'has-text-link': isPresent(onClick)
    });

    return (
      <figure
        className={cx}
        onClick={onClick}
        onKeyPress={onClick}
        role="presentation"
        alt={alt || name}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...otherProps}
      >
        {this.getBodyContent()}
        {renderName && (
          <figcaption className={captionCx}>
            {name}
          </figcaption>
        )}
      </figure>
    );
  }
}

Avatar.propTypes = {
  url:        PropTypes.string,
  className:  PropTypes.string,
  name:       PropTypes.string,
  onClick:    PropTypes.func,
  alt:        PropTypes.string,
  figCx:      PropTypes.string,
  renderName: PropTypes.bool,
};

Avatar.defaultProps = {
  url:        '',
  className:  '',
  name:       '',
  onClick:    undefined,
  alt:        '',
  figCx:      '',
  renderName: true,
};
