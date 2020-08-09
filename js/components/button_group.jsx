/*
modification history
--------------------
01a,09aug2020,deepankar created
*/

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { flatten } from 'ramda';

import isPresent from '../helpers/isPresent';
import Button from './button';

class ButtonGroup extends PureComponent {
  render(){
    const {
      buttons, className, grouped, children
    } = this.props;

    if (!(isPresent(buttons) || isPresent(children))){
      return null;
    }

    const cx = classnames('buttons', className, {
      'has-addons': grouped,
    });

    return (
      <div className={cx}>
        {flatten([buttons]).map((button) => (
          <Button key={`${button.id}-${button.label}`} {...button} />
        ))}
        {children}
      </div>
    );
  }
}

export default ButtonGroup;

ButtonGroup.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  buttons:   PropTypes.array,
  className: PropTypes.string,
  grouped:   PropTypes.bool,
  children:  PropTypes.node,
};

ButtonGroup.defaultProps = {
  buttons:   [],
  className: null,
  grouped:   false,
  children:  null,
};
