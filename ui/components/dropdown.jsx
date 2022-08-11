/*
modification history
--------------------
01a,23may2022,deepankar created
*/

import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import isPresent from '../helpers/isPresent';

export default function Dropdown({
  label, selectedItemId, items, onClick, className
}){
  const selectedItem = items.find((i) => i.id === selectedItemId);

  return (
    <div className={`dropdown is-hoverable ${className}`}>
      <div className="dropdown-trigger">
        <button type="button" className="button" aria-haspopup="true" aria-controls="dropdown-menu">
          <span>{label || selectedItem?.label || 'Dropdown item'}</span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        {isPresent(items) && (
          <div className="dropdown-content">
            {items.map((item) => (
              item.isInternalUrl ? (
                <NavLink key={item.id} onClick={onClick} data-id={item.id} to={item.url} className="dropdown-item">
                  <span>COVID 19</span>
                </NavLink>
              ) : (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a key={item.id} onClick={onClick} data-id={item.id} href={item.url || '#'} className="dropdown-item">
                  {item.label}
                </a>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

Dropdown.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label:         PropTypes.string,
    id:            PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    url:           PropTypes.string,
    isInternalUrl: PropTypes.bool
  })).isRequired,
  onClick:        PropTypes.func,
  selectedItemId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label:          PropTypes.string,
};

Dropdown.defaultProps = {
  onClick:        undefined,
  selectedItemId: null,
  label:          '',
};
