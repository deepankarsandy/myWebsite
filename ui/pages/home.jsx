import React, { PureComponent } from 'react';

import Button from '../components/button';
import SMButtons from '../components/sm_buttons';
import { Me } from '../data/constants';
import FloatButton from '../components/floating_button';

function scrollToTop(){
  window.scrollTo(0, 0);
}

function floatButtonClick(){
  const pageHeight = window.innerHeight - 52; // 52 = 3.25rem = navbar height
  const scrollTo = (window.pageYOffset + pageHeight)
    - ((window.pageYOffset + pageHeight) % pageHeight);
  window.scrollTo(0, scrollTo);
}

export default class Home extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      atTop:    true,
      atBottom: false,
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll);
    clearTimeout(this.timerId);
  }

  handleScroll(e){
    clearTimeout(this.timerId);

    this.timerId = setTimeout(() => {
      let atTop; let atBottom;

      if (window.pageYOffset > 0){
        atTop = false;
      } else {
        atTop = true;
      }

      // 10 is to normalize
      if (window.pageYOffset + 10 > e.target.scrollingElement.scrollHeight - window.innerHeight){
        atBottom = true;
      } else {
        atBottom = false;
      }

      this.setState({ atTop, atBottom });
    }, 500);
  }

  render(){
    const { atTop, atBottom } = this.state;

    return (
      <main className="page page--home">
        {!atBottom && (
        <FloatButton
          onClick={floatButtonClick}
          className="home-scroller is-circle is-fixed"
        />
        )}
        {!atTop && (
        <FloatButton
          onClick={scrollToTop}
          position="bottom right"
          icon="fas fa-chevron-up fa-lg"
          className="home-scroller is-circle is-fixed"
        />
        )}
        {/* Intro */}
        <section className="hero is-dark is-bold is-fullheight-with-navbar root">
          <main className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title is-uppercase">{Me.jobTitle}</h1>
              <hr />
              <h2 className="subtitle is-capitalized">Build a lasting impression for customers</h2>
            </div>
          </main>
        </section>
        {/* About */}
        <section className="hero is-primary is-bold  is-fullheight-with-navbar root section">
          <header className="hero-head">
            <h1 className="title">ABOUT</h1>
            <hr style={{ width: '2rem' }} />
            <h2 className="subtitle">{Me.about}</h2>
          </header>
        </section>
        {/* Skills */}
        <section className="hero is-primary is-bold  is-fullheight-with-navbar root section">
          <header className="hero-head">
            <div className="is-pulled-right">
              <h1 className="title">SKILLS</h1>
              <hr style={{ width: '2rem' }} />
              <h2 className="subtitle has-text-right">{Me.skills}</h2>
            </div>
          </header>
        </section>
        {/* Work */}
        <section className="hero is-primary is-bold  is-fullheight-with-navbar root section">
          <div className="hero-head">
            <h1 className="title">PROJECTS</h1>
            <hr style={{ width: '2rem' }} />
            {Me.projects.map((skill) => (
              <div key={skill.id} className="title">
                <h2 className="title is-4 is-marginless">{skill.title}</h2>
                <span className="subtitle is-6">{skill.description}</span>
              </div>
            ))}
          </div>
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
              <SMButtons data={Me.smHandles} />
            </div>
            <div className="level-item">
              <Button
                className="is-info"
                label="Contact Me"
                onClick={() => window.open(`mailto:${Me.email}`)}
              />
            </div>
          </div>
        </footer>
      </main>
    );
  }
}
