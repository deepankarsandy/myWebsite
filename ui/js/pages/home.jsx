import React, { PureComponent, createRef } from 'react';
import ReactDOM from 'react-dom';

import Navbar from './partials/navbar';
import Intro from './partials/intro';
import About from './partials/about';
import Footer from './partials/footer';
import Skills from './partials/skills';
import Work from './partials/work';

class Home extends PureComponent{
  constructor(props){
    super(props);
    this.navbar = createRef();
    this.intro = createRef();
    this.about = createRef();
    this.skills = createRef();
    this.work = createRef();
    this.navButtons = [
      { label: 'About', onClick: () => this.scrollTo(this.about.current) },
      { label: 'Skills', onClick: () => this.scrollTo(this.skills.current) },
      { label: 'Work', onClick: () => this.scrollTo(this.work.current) },
    ];
  }

  scrollToTop = () => {
    window.scrollTo(0, (this.intro.current.offsetTop - this.navbar.current.clientHeight));
  }

  scrollTo = ($node) => {
    window.scrollTo(0, ($node.offsetTop - this.navbar.current.clientHeight));
  }

  render(){
    return (
      <div>
        <Navbar nodeRef={this.navbar} onIconClick={this.scrollToTop} buttons={this.navButtons} />
        <Intro nodeRef={this.intro} />
        <About nodeRef={this.about} />
        <Skills nodeRef={this.skills} />
        <Work nodeRef={this.work} />
        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<Home />, document.getElementById('root'));
