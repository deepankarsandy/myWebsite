import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isPresent from '../helpers/isPresent';

class SMButtons extends PureComponent{
  onClick = (button) => {
    window.open(
      button.url,
      `_${button.type}`
    );
  }

  renderIcon = (type) => {
    switch (type){
      case 'facebook':
        return <i className="fab fa-facebook-f" />;
      case 'twitter':
        return <i className="fab fa-twitter" />;
      case 'linkedIn':
        return <i className="fab fa-linkedin-in" />;
      case 'instagram':
        return <i className="fab fa-instagram" />;
      case 'url' || 'web' || 'website':
        return <i className="fab fa-globe" />;
      case 'pinterest':
        return <i className="fab fa-pinterest-p" />;
      case 'googlePlus':
        return <i className="fab fa-google-plus-g" />;
      case 'youtube':
        return <i className="fab fa-youtube" />;
      case 'email' || 'mail':
        return <i className="far fa-envelope" />;
      case 'github':
        return <i className="fab fa-github" />;
      default:
        return null;
    }
  }

  render(){
    const { data } = this.props;

    return (
      <>
        {data.map((smHandle) => (
          isPresent(smHandle.url) ? (
            <span key={smHandle.type} onKeyPress={() => this.onClick(smHandle)} role="button" tabIndex="0" onClick={() => this.onClick(smHandle)} className="icon btn">
              {this.renderIcon(smHandle.type)}
            </span>
          ) : null))}
      </>
    );
  }
}

export default SMButtons;

SMButtons.propTypes = {
  data: PropTypes.array.isRequired,
};
