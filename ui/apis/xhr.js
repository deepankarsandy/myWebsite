/*
modification history
--------------------
01a,09aug2020,deepankar created
*/

import { forEachObjIndexed, merge } from 'ramda';

function request(opts){
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(opts.method, opts.url, true);
    // xhr.responseType = 'json';

    forEachObjIndexed((v, k) => {
      xhr.setRequestHeader(k, v);
    }, opts.headers);

    if (xhr.upload && opts.onProgress){
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable){
          const percentComplete = (e.loaded / e.total) * 100;
          opts.onProgress({ percentComplete, loaded: e.loaded, total: e.total }, e);
        } else {
          // Unable to compute progress information since the total size is unknown
          opts.onProgress(e);
        }
      };
    }

    xhr.onreadystatechange = () => {
      // DONE *xhr.onload is not supported on all browsers*
      if (xhr.readyState === 4){
        resolve(xhr);
      }

      // HEADERS_RECEIVED
      if (xhr.readyState === 2){
        opts.onReady && opts.onReady(xhr);
      }
    };
    xhr.onerror = reject;

    xhr.send(opts.data);
  });
}

const XHR = {
  post: (url, data, onProgress, onReady, headers = {}) => {
    const postHeaders = merge({ 'Content-type': 'multipart/form-data', Accept: 'application/json' }, headers);

    return request({ url, data, onProgress, onReady, method: 'POST', postHeaders });
  },

  put: (url, data, onProgress, onReady, headers = {}) => {
    const postHeaders = merge({ 'Content-type': 'multipart/form-data', Accept: 'application/json' }, headers);

    return request({ url, data, onProgress, onReady, method: 'PUT', postHeaders });
  },
};

export default XHR;
