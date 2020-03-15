import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Logo from '../../components/logo';

export default class Intro extends PureComponent{
  render(){
    const { nodeRef } = this.props;

    return (
      <section ref={nodeRef} className="hero is-dark is-bold is-fullheight-with-navbar root">
        <header className="hero-head">
          <div className="level">
            <div className="level-left">
              <div className="level-item">
                <Logo />
              </div>
              <div className="level-item">
                <span className="title is-5">Deepankar Sandy</span>
              </div>
            </div>
            <div className="level-right" />
          </div>
        </header>

        <main className="hero-body">
          <div className="container">
            <h1 className="title">FRONT-END & MOBILE APP ENGINEER</h1>
            <hr style={{ width: '2rem' }} />
            <h2 className="subtitle">Build a lasting impression for customers</h2>
          </div>
        </main>

      </section>
    );
  }
}

Intro.propTypes = {
  nodeRef: PropTypes.object,
};

Intro.defaultProps = {
  nodeRef:  null,
};
