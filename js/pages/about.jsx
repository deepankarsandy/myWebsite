import React, { PureComponent } from 'react';
import Button from '../components/button';
import Slack from '../helpers/slack_api';

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
            <Button label="Test Slack API" className="hidden hide" onClick={() => Slack.post('Slack API Test')} />
          </main>
        </section>
      </main>
    );
  }
}
