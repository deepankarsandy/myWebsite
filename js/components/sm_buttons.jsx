import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { mapObjIndexed, values, mergeDeepRight } from 'ramda';

import isPresent from '../helpers/isPresent';
import Button from './button';
import ButtonGroup from './button_group';
import { SM_HANDLES } from '../models/constants';

function openSM(e){
  const { value } = e.currentTarget;

  window.open(value);
}

class SMButtons extends PureComponent {
  render(){
    const { data } = this.props;
    const handles = mergeDeepRight(SM_HANDLES, data);

    return (
      <ButtonGroup className="is-centered">
        {values(mapObjIndexed((handle, smType) => (
          (isPresent(handle.url) && !handle.disabled)
            ? (
              <Button
                key={smType}
                value={handle.url}
                onClick={openSM}
                icon={handle.icon}
              />
            ) : null
        ), handles))}
      </ButtonGroup>
    );
  }
}

export default SMButtons;

SMButtons.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};
