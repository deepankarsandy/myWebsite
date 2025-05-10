/*
modification history
--------------------
01b,23may2022,deepankar added camera module
01a,09aug2020,deepankar created
*/

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { map } from 'ramda';

import isPresent from '../helpers/isPresent';
import Button from './button';
import { getRedirectUrl } from '../helpers/navigation';

export default class Navbar extends PureComponent {
  constructor(props){
    super(props);

    this.scrollToTop = this.scrollToTop.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  scrollToTop(){
    window.scrollTo(0, 0);
  }

  handleNavClick(target) {
    const redirectUrl = getRedirectUrl(target);
    window.open(redirectUrl, "_blank")
  };

  render(){
    const {
      quickLinks
    } = this.props;

    const quickNavLabelCx = classNames('navbar-link navbar-topic has-text-white quick-nav-label', {
      'is-arrowless': !isPresent(quickLinks),
    });

    const primaryQuickLink = quickLinks.shift();

    return (
      <nav id="navbar" role="navigation" className="brand-navbar navbar is-fixed-top is-black" aria-label="main-navigation">
        <div className="navbar-brand">
          {/* Brand Icon */}
          <NavLink to="/" onClick={this.scrollToTop} className="navbar-item brand-logo">
            <img alt="brand logo" src="/assets/image/logo.jpg" />
            <span className="is-hidden-mobile">Deepankar</span>
          </NavLink>

          {/* Quick Links */}
          {isPresent(primaryQuickLink) && (
            <span className="navbar-item has-dropdown is-hoverable">
              <NavLink
                to={primaryQuickLink.link}
                onClick={this.scrollToTop}
                className={quickNavLabelCx}
              >
                <span className="text-is-truncated">{primaryQuickLink.label}</span>
              </NavLink>
              {isPresent(quickLinks) && (
                <div className="navbar-dropdown">
                  {map((item) => (
                    <NavLink
                      to={item.link}
                      className="navbar-item"
                      key={item.label}
                    >
                      <span className="text-is-truncated">{item.label}</span>
                    </NavLink>
                  ), quickLinks)}
                </div>
              )}
            </span>
          )}
          <Button
            onClick={() => this.handleNavClick("media")}
            label="Media"
            bare
            className="navbar-link navbar-topic has-text-blue quick-nav-label is-arrowless has-text-weight-bold"
          />
          <Button
            onClick={() => this.handleNavClick("photo")}
            label="Photo"
            bare
            className="navbar-link navbar-topic has-text-blue quick-nav-label is-arrowless has-text-weight-bold" />
        </div>

        <div className="navbar-end">
          {/* Menu */}
          <span className="navbar-item has-dropdown is-hoverable">
            <span className="navbar-link has-text-white">
              More
            </span>
            <div className="navbar-dropdown is-right">
              <NavLink to="/covid19" className="navbar-item">COVID 19</NavLink>
              <NavLink to="/chat-rooms" className="navbar-item">Chat Rooms</NavLink>
              <NavLink to="/camera" className="navbar-item">Mirror</NavLink>
              <NavLink to="/" className="navbar-item" exact activeClassName="disabled">Home</NavLink>
              <NavLink to="/about" className="navbar-item" activeClassName="disabled">About</NavLink>
            </div>
          </span>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  quickLinks:    PropTypes.instanceOf(Array),

};

Navbar.defaultProps = {
  quickLinks:    [],
};
