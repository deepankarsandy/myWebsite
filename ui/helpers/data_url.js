/*
modification history
--------------------
01a,09aug2020,deepankar created
*/

import WebApi from '../apis/web_api';

export default function dataUrl(file){
  // it it's url
  if (typeof file === 'string'){
    return WebApi.get(file, null, { resType: 'blob' })
      .then((res) => URL.createObjectURL(res));
  }

  return new Promise((resolve, reject) => {
    if (file){
      const reader = new FileReader();
      reader.readAsDataURL(file); // convert to base64 string

      reader.onload = function(e){
        resolve(e.target.result);
      };

      reader.onerror = function(e){
        reject(e);
      };
      return;
    }

    reject();
  });
}
