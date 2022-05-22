/*
modification history
--------------------
01a,09aug2020,deepankar created
*/

import { forEachObjIndexed } from 'ramda';
import FetchApi from './fetch';
import { isPresent } from '~/lib';
import XHR from './xhr';

function setParams(webUrl, params){
  const url = new URL(webUrl);
  forEachObjIndexed((val, key) => url.searchParams.append(key, val), params);

  return url.href;
}

// url, data, onProgress, onReady, headers = {}

const WebApi = {
  get: (url, queryParams, { headers, resType = 'json' } = {}) => {
    if (queryParams){
      url = setParams(url, queryParams);
    }

    return FetchApi.get(url, headers)
      .then((response) => (isPresent(resType) ? response[resType]() : response));
  },

  post: (url, data, { headers, onProgress, onReady, isXhr, resType = 'json' } = {}) => {
    if (isPresent(onProgress) || isXhr){
      return XHR.post(url, data, onProgress, onReady, headers);
    }

    return FetchApi
      .post(url, data, headers)
      .then((response) => (isPresent(resType) ? response[resType]() : response));
  },

  put: (url, data, { headers, onProgress, onReady, isXhr, resType = 'json' } = {}) => {
    if (isPresent(onProgress) || isXhr){
      return XHR.put(url, data, onProgress, onReady, headers);
    }

    return FetchApi
      .put(url, data, headers)
      .then((response) => (isPresent(resType) ? response[resType]() : response));
  },

  delete: (url, data, { headers, resType = 'json' } = {}) => FetchApi
    .delete(url, data, headers)
    .then((response) => (isPresent(resType) ? response[resType]() : response)),
};

export default WebApi;
