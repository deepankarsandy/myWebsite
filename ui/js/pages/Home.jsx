
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import '../../styles/home.css';

class App extends PureComponent{
  render(){
    return (
      <div className="home">
        <h1> Hello, World! </h1>
        <h2> This is Sandy! </h2>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
