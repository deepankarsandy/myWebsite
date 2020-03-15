import React, { PureComponent } from 'react';
import Button from '../../components/button';
import SMButtons from '../../components/sm_buttons';
import { smHandles } from '../../models/constants';

export default class Footer extends PureComponent{
  render(){
    return (
      <footer className="footer">
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <Button
                type="info"
                label="See More"
                onClick={() => window.open('https://www.linkedin.com/in/deepankarsandhibigraha/', '_linkedin')}
              />
            </div>
          </div>
          <div className="level-item">
            <SMButtons data={smHandles} />
          </div>
          <div className="level-right">
            <div className="level-item">
              <Button
                type="info"
                label="Contact Me"
                onClick={() => window.open('mailto:zilu2deep@gmail.com')}
              />
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
