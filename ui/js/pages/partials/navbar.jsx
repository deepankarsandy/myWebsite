import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Logo from '../../components/logo';
import Button from '../../components/button';

export default class Navbar extends PureComponent{
  render(){
    const { buttons, onIconClick, nodeRef } = this.props;

    return (
      <nav ref={nodeRef} className="navbar is-fixed-top is-black">
        <div className="navbar-brand">
          <Logo size="small" onClick={onIconClick} />
          <div className="navbar-burger burger" data-target="navbar-buttons">
            <span />
            <span />
            <span />
          </div>
        </div>

        <div id="navbar-buttons" className="navbar-menu">
          <div className="navbar-start">
            <div className="navbar-item">
              <span style={{ color: 'white' }} className="title is-4 is-marginless">Deepankar Sandy</span>
            </div>
          </div>

          <div className="navbar-end">
            {buttons.map((button) => (
              <div key={button.label} className="navbar-item">
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <Button {...button} />
              </div>
            ))}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  buttons:      PropTypes.array.isRequired,
  onIconClick:  PropTypes.func,
  nodeRef:      PropTypes.object,
};

Navbar.defaultProps = {
  onIconClick: null,
  nodeRef:     null,
};
