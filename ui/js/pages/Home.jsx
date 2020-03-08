
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

class Home extends PureComponent{
  render(){
    return (
      <div className="home">
        <h1> Home </h1>
        <h2> Welcome ! </h2>
        <h2>
          <a href="http://localhost:3000/about">About</a>
        </h2>
      </div>
    );
  }
}

ReactDOM.render(<Home />, document.getElementById('root'));
