/*
modification history
--------------------
01a,09aug2020,deepankar created
*/

import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';

import Navbar from './components/navbar';
import Loading from './components/loading';

const Home = loadable(() => import('./pages/home'), { fallback });
const Covid19 = loadable(() => import('./pages/covid19'), { fallback });
const About = loadable(() => import('./pages/about'), { fallback });
const ChatRooms = loadable(() => import('./pages/chat_rooms'), { fallback });
const NoContent = loadable(() => import('./components/no_content'), { fallback });

const fallback = <Loading className="page-loading" />;
function NoRouteMatch(){
  return (
    <NoContent className="page page--404" message="Oops...We can&apos;t seem to find the page you are looking for.">
      <div>Error: 404</div>
    </NoContent>
  );
}


export default class Index extends PureComponent {
  render(){
    return (
      <section className="app-root">
        <Router>
          <Route
            path="/"
            render={(props) => <Navbar quickNavLabel="Deepankar" {...props} />}
          />
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => <Home {...props} />}
            />
            <Route
              path="/about"
              exact
              render={(props) => <About {...props} />}
            />
            <Route
              path="/covid19"
              exact
              render={(props) => <Covid19 {...props} />}
            />
            <Route
              path="/chatRooms"
              exact
              render={(props) => <ChatRooms {...props} />}
            />
            <Route path="/:other" component={NoRouteMatch} />
          </Switch>
        </Router>
      </section>
    );
  }
}

// Using renderer.
global.reactRenderer = ($node, props) => {
  ReactDOM.render(React.createElement(Index, props || {}), $node);
};
