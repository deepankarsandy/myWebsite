
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Skills extends PureComponent{
  render(){
    const { nodeRef } = this.props;

    return (
      <section ref={nodeRef} className="hero is-primary is-bold  is-fullheight-with-navbar root section">
        <header className="hero-head">
          <div className="level">
            <div className="level-left">
              <div className="level-item">
                <div className="title">This is Skills Section</div>
              </div>
            </div>
            <div className="level-right" />
          </div>
          <div className="level">
            <div className="level-left" />
            <div className="level-right level-item">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <h1 className="title">SKILLS</h1>
                <hr style={{ width: '2rem' }} />
                <h2 className="subtitle">ReactJS | React Native | HTML5 | CSS3 | Node.JS</h2>
              </div>
            </div>
          </div>
        </header>
      </section>
    );
  }
}

Skills.propTypes = {
  nodeRef: PropTypes.object,
};

Skills.defaultProps = {
  nodeRef:  null,
};
