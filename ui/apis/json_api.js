/*
modification history
--------------------
01a,09aug2020,deepankar created
*/

import { forEachObjIndexed } from 'ramda';
import Fetch from './fetch';

function buildUrl(path, queryParams){
  // eslint-disable-next-line no-restricted-globals
  const url = new URL(`${location.origin}${path}`);

  forEachObjIndexed(
    (val, key) => url.searchParams.append(key, val),
    queryParams || {}
  );

  return url.href;
}

function buildHeaders(headers){
  return headers || {}; // TODO: merge default headers, if needed.
}

function processAuthError(response){
  if (response.status === 401){
    return new Promise(() => {});
  }

  return response;
}

function processApiError(res){
  if (res.error){
    throw res;
  }

  return res;
}

const JsonApi = {
  get: (path, queryParams, headers) => (
    Fetch
      .get(buildUrl(path, queryParams), buildHeaders(headers))
      .then(processAuthError)
      .then((response) => response.json())
      .then(processApiError)
  ),

  post: (path, data, ...rest) => (
    Fetch
      .post(buildUrl(path), JSON.stringify(data), ...rest)
      .then(processAuthError)
      .then((response) => response.json())
      .then(processApiError)
  ),

  put: (path, data, ...rest) => (
    Fetch
      .put(buildUrl(path), JSON.stringify(data), ...rest)
      .then(processAuthError)
      .then((response) => response.json())
      .then(processApiError)
  ),

  delete: (path, data, ...rest) => (
    Fetch
      .delete(buildUrl(path), JSON.stringify(data), ...rest)
      .then(processAuthError)
      .then((response) => response.json())
      .then(processApiError)
  ),
};

export default JsonApi;
