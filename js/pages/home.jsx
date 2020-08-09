import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

import Button from '../components/button';
import SMButtons from '../components/sm_buttons';
import { smHandles } from '../models/constants';
import Navbar from '../components/navbar';

export default class Home extends PureComponent {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <main className="page page--home">
        {/* Intro */}
        <section className="hero is-dark is-bold is-fullheight-with-navbar root">
          <main className="hero-body">
            <div className="container">
              <h1 className="title">FRONT-END & MOBILE APP ENGINEER</h1>
              <hr style={{ width: '2rem' }} />
              <h2 className="subtitle">Build a lasting impression for customers</h2>
            </div>
          </main>
        </section>
        {/* About */}
        <section className="hero is-primary is-bold  is-fullheight-with-navbar root section">
          <header className="hero-head">
            <div className="level">
              <div className="level-left">
                <div className="level-item">
                  <div className="title">This is About Section</div>
                </div>
              </div>
              <div className="level-right" />
            </div>
            <div className="level">
              <div className="level-left" />
              <div className="level-right level-item">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <h1 className="title">ABOUT</h1>
                  <hr style={{ width: '2rem' }} />
                  <h2 className="subtitle">I&apos;m Deepankar Sandy</h2>
                </div>
              </div>
            </div>
          </header>
        </section>
        {/* Skills */}
        <section className="hero is-primary is-bold  is-fullheight-with-navbar root section">
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
        {/* Work */}
        <section className="hero is-primary is-bold  is-fullheight-with-navbar root section">
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
        {/* Footer */}
        <footer className="footer">
          <div className="level">
            <div className="level-item">
              <Button
                className="is-info"
                label="See More"
                onClick={() => window.open('https://www.linkedin.com/in/deepankarsandhibigraha/', '_linkedin')}
              />
            </div>
            <div className="level-item">
              <SMButtons data={smHandles} />
            </div>
            <div className="level-item">
              <Button
                className="is-info"
                label="Contact Me"
                onClick={() => window.open('mailto:zilu2deep@gmail.com')}
              />
            </div>
          </div>
        </footer>
      </main>
    );
  }
}
