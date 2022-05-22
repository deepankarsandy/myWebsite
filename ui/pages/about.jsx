import React, { PureComponent } from 'react';
import Button from '../components/button';

export default class About extends PureComponent {
  render(){
    return (
      <main className="page page--about">
        <section className="hero is-dark is-bold is-fullheight-with-navbar root">
          <main className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title is-uppercase">Coming Soon...</h1>
              <h2>It'll contain specific details about the project and deployment</h2>
            </div>
          </main>
        </section>
      </main>
    );
  }
}
