
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Work extends PureComponent{
  render(){
    const { nodeRef } = this.props;

    return (
      <section ref={nodeRef} className="hero is-primary is-bold  is-fullheight-with-navbar root section">
        <header className="hero-head">
          <div className="level">
            <div className="level-left">
              <div className="level-item">
                <div className="title">This is Work Section</div>
              </div>
            </div>
            <div className="level-right" />
          </div>
          <div className="level">
            <div className="level-left" />
            <div className="level-right level-item">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <h1 className="title">WORK</h1>
                <hr style={{ width: '2rem' }} />
                <h2 className="subtitle">Mobile app for Conference with chat capabilities with React Native and FCM</h2>
                <h2 className="subtitle">Personal website with React, Node server, Sass</h2>
              </div>
            </div>
          </div>
        </header>
      </section>
    );
  }
}

Work.propTypes = {
  nodeRef: PropTypes.object,
};

Work.defaultProps = {
  nodeRef:  null,
};
