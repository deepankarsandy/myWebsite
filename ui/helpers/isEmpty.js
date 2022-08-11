import { isNumber } from 'ramda-extension';
import { isEmpty as RisEmpty } from 'ramda';

function isEmpty(val){
  switch (typeof val){
    case 'number':
      return isNumber(val); // Only NaN is Blank.
    case 'boolean':
      return false;
    case 'undefined':
      return true;
    case 'string':
      return RisEmpty(val.trim());
    default:
      return RisEmpty(val);
  }
}

export default isEmpty;
