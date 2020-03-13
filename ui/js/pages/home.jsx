import React, { PureComponent, createRef } from 'react';
import ReactDOM from 'react-dom';

import Logo from '../components/logo';
import SMButtons from '../components/sm_buttons';
import { smHandles } from '../models/constants';
import Button from '../components/button';

class Home extends PureComponent{
  constructor(props){
    super(props);
    this.section2 = createRef();
  }

  scrollToSection2 = () => {
    this.timer = setTimeout(() => {
      window.scrollTo(0, this.section2.current.offsetTop);
    }, 300);
  }

  onMouseLeave = () => {
    clearTimeout(this.timer);
  }

  render(){
    return (
      <div>
        <section className="hero is-dark is-bold is-fullheight root">
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

          <footer className="hero-foot">
            <div className="level">
              <div className="level-item">
                <span
                  className="icon btn zoom-icon"
                  onMouseLeave={this.onMouseLeave}
                  onBlur={this.onMouseLeave}
                  onMouseEnter={this.scrollToSection2}
                  onFocus={this.scrollToSection2}
                >
                  <i className="fas fa-chevron-down" />
                </span>
              </div>
            </div>
            <div className="level">
              <div className="level-left">
                <div className="level-item">
                  <Button label="See More" onClick={this.scrollToSection2} />
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
          </footer>
        </section>
        <section ref={this.section2} className="hero is-primary is-bold is-fullheight root section">
          <header className="hero-head">
            <div className="level">
              <div className="level-left">
                <div className="level-item">
                  <div className="title">This is tite</div>
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
          </header>
        </section>
      </div>
    );
  }
}

ReactDOM.render(<Home />, document.getElementById('root'));
