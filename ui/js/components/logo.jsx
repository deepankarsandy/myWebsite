
import React, { PureComponent } from 'react';

class Logo extends PureComponent{
  render(){
    return (
      <div className="logo">
        <main className="square rotate-45">
          <div
            className="straight"
            style={{
              display:       'flex',
              flexDirection: 'column',
              alignItems:    'center',
            }}
          >
            <span>D</span>
            <hr style={{ width: '1rem', margin: 0 }} />
            <span>S</span>
          </div>
        </main>
      </div>
    );
  }
}

export default Logo;
