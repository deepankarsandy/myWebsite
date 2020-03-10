import isNaN from 'lodash/isNaN';
import _isEmpty from 'lodash/isEmpty';

function isEmpty(val){
  switch (typeof val){
    case 'number':
      return isNaN(val); // Only NaN is Blank.
    case 'boolean':
      return false;
    case 'undefined':
      return true;
    case 'string':
      return _isEmpty(val.trim());
    default:
      return _isEmpty(val);
  }
}

export default isEmpty;
