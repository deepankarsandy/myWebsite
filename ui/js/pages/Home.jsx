
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Logo from '../components/logo';

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
        </div>
        <main className="hero-body">
          <div>
            <h1 className="title">FRONT-END & MOBILE APP ENGINEER</h1>
            <hr style={{ width: '2rem' }} />
            <h2 className="subtitle">Build a lasting impression for customers</h2>
          </div>
        </main>
        <div className="hero-foot">
          <div className="level">
            <div className="level-left">
              <div className="level-item button is-light is-outlined">
                <span>See more</span>
              </div>
            </div>
            <div className="level-item">
              <span className="icon btn">
                <i className="fab fa-linkedin-in" />
              </span>
              <span className="icon btn">
                <i className="fab fa-github" />
              </span>
              <span className="icon btn">
                <i className="fab fa-facebook-f" />
              </span>
              <span className="icon btn">
                <i className="fab fa-twitter" />
              </span>
              <span className="icon btn">
                <i className="fab fa-youtube" />
              </span>
              <span className="icon btn">
                <i className="fab fa-instagram" />
              </span>
            </div>
            <div className="level-right">
              <div className="level-item button is-light is-outlined">
                <span>Hire me</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Home />, document.getElementById('root'));


  // return ({ icon: '', placeholder: 'https://twitter.com/' });
  // return ({ icon: '', placeholder: 'https://linkedin.com/' });
  // return ({ icon: '', placeholder: 'https://instagram.com/' });
  // return ({ icon: 'fab fa-pinterest-p', placeholder: 'https://pinterest.com/' });
  // return ({ icon: 'fab fa-google-plus-g', placeholder: 'https://plus.google.com/' });
  // return ({ icon: '', placeholder: 'https://youtube.com/' });
