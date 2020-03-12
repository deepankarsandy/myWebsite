import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

import Logo from '../components/logo';
import SMButtons from '../components/sm_buttons';
import { smHandles } from '../models/constants';
import Button from '../components/button';
import HomeFigure from '../components/home_figure';

class Home extends PureComponent{
  render(){
    return (
      <div className="hero is-dark is-bold is-fullheight root">
        <div className="hero-head">
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
          <div className="level">
            <div className="level-left" />
            <div className="level-right level-item">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <h1 className="title">FRONT-END & MOBILE APP ENGINEER</h1>
                <hr style={{ width: '2rem' }} />
                <h2 className="subtitle">Build a lasting impression for customers</h2>
              </div>
            </div>
          </div>
        </div>

        <main className="hero-body is-paddingless">
          <div className="container">
            <div className="hero">
              <HomeFigure />
            </div>
          </div>
        </main>

        <div className="hero-foot">
          <div className="level">
            <div className="level-left">
              <div className="level-item">
                <Button label="See More" />
              </div>
            </div>
            <div className="level-item">
              <SMButtons data={smHandles} />
            </div>
            <div className="level-right">
              <div className="level-item">
                <Button
                  label="Contact Me"
                  onClick={() => window.open('mailto:zilu2deep@gmail.com')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Home />, document.getElementById('root'));
