
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class HomeFigure extends PureComponent{
  render(){
    const { size } = this.props;
    const classes = classnames('square', `is-${size}`);
    const hrStyle = {
      width:     '0.2rem',
      height:    '2rem',
      margin:    0,
    };

    return (
      <div style={{ alignSelf: 'center' }}>
        <hr
          style={{
            width:     '0.2rem',
            height:    '4rem',
            margin:    '0 0 -0.3rem -1.9rem',
            transform: 'rotate(-45deg)',
            position:  'absolute',
          }}
        />
        <hr
          style={{
            width:     '0.2rem',
            height:    '4rem',
            margin:    '0px 0px -0.3rem 8.5rem',
            transform: 'rotate(45deg)',
          }}
        />
        <div className={classes} style={{ justifyContent: 'space-evenly' }}>
          <span className="title is-marginless">UX</span>
          <hr style={hrStyle} />
          <span className="title">UI</span>
        </div>
        <hr
          style={{
            width:     '0.2rem',
            height:    '4rem',
            margin:    '0 0 -0.3rem -1.9rem',
            transform: 'rotate(-135deg)',
            position:  'absolute',
          }}
        />
        <hr
          style={{
            width:     '0.2rem',
            height:    '4rem',
            margin:    '0px 0px -0.3rem 8.5rem',
            transform: 'rotate(135deg)',
          }}
        />
      </div>
    );
  }
}

export default HomeFigure;

HomeFigure.propTypes = {
  size: PropTypes.string,
};

HomeFigure.defaultProps = {
  size: 'large',
};
