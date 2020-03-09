
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

class About extends PureComponent{
  render(){
    return (
      <div className="bg-gradient">
        <main>
          <h1> About </h1>
          <h2> This is Sandy! </h2>
        </main>
      </div>
    );
  }
}

ReactDOM.render(<About />, document.getElementById('root'));
