import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { find } from 'ramda';

import isPresent from '../helpers/isPresent';
import Button from '../components/button';
import ButtonGroup from '../components/button_group';

class SMButtons extends PureComponent {
  constructor(props){
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e){
    const { data } = this.props;
    const { value } = e.currentTarget;

    window.open(find((d) => d.type === value, data).url,`_${value}`);
  }

  renderIcon(type){
    switch (type){
      case 'facebook':
        return "fab fa-facebook-f fa-lg";
      case 'twitter':
        return "fab fa-twitter fa-lg";
      case 'linkedIn':
        return "fab fa-linkedin-in fa-lg";
      case 'instagram':
        return "fab fa-instagram fa-lg";
      case 'url' || 'web' || 'website':
        return "fab fa-globe fa-lg";
      case 'pinterest':
        return "fab fa-pinterest-p fa-lg";
      case 'googlePlus':
        return "fab fa-google-plus-g fa-lg";
      case 'youtube':
        return "fab fa-youtube fa-lg";
      case 'email' || 'mail':
        return "far fa-envelope fa-lg";
      case 'github':
        return "fab fa-github fa-lg";
      default:
        return null;
    }
  }

  render(){
    const { data } = this.props;

    return (
      <ButtonGroup className="is-centered">
        {data.map((smHandle) => (
          isPresent(smHandle.url) && !smHandle.disabled ? (
            <Button
              key={smHandle.type}
              value={smHandle.type}
              onClick={this.onClick}
              icon={this.renderIcon(smHandle.type)}
            />
          ) : null))}
      </ButtonGroup>
    );
  }
}

export default SMButtons;

SMButtons.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
};
