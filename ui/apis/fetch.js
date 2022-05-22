/*
modification history
--------------------
01a,09aug2020,deepankar created
*/

import { merge } from 'ramda';

const defaultHeaders = {
  Accept:         'application/json',
  'Content-Type': 'application/json',
};

const Fetch = {
  get: (url, headers) => fetch(url, {
    method:      'GET',
    credentials: 'same-origin',
    headers:     merge(defaultHeaders, headers || {})
  }),

  post: (url, data, headers) => fetch(url, {
    method:      'POST',
    credentials: 'same-origin',
    headers:     merge(defaultHeaders, headers || {}),
    body:        data,
  }),

  put: (url, data, headers) => fetch(url, {
    method:      'PUT',
    credentials: 'same-origin',
    headers:     merge(defaultHeaders, headers || {}),
    body:        data,
  }),

  delete: (url, data, headers) => fetch(url, {
    method:      'DELETE',
    credentials: 'same-origin',
    headers:     merge(defaultHeaders, headers || {}),
    body:        data,
  }),
};

export default Fetch;
