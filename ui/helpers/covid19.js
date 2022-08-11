/*
modification history
--------------------
01a,06jun2021,deepankar created
*/

import isEmpty from './isEmpty';

const COVID19 = {
  /**
   *
   * @param {Number} pin area pin/zip code
   * @param {Date} date [MM/DD/YYY, MMM/DD/YYY, DD/MMM/YYY]
   * @param {Number} age [18, 45]
   * @param {Number} dose [1, 2]
   */
  vaccineAvailability(pin, date = new Date(), age, dose){
    const dt = new Date(date).toLocaleString().split(',')[0].replaceAll('/', '-');
    if (age && (age !== 18 || age !== 45)){
      throw new Error('Invalid age');
    }

    if (dose && (dose !== 1 || dose !== 2)){
      throw new Error('Invalid dose');
    }

    if (!pin){
      throw new Error('Pin code / zip code is required');
    }

    return fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pin}&date=${dt}`, {
      method:  'GET',
      headers: {
        accept: 'application/json',
      }
    })
      .then((res) => res.json()
        .then((data) => {
          if (isEmpty(data.centers)){
            console.warn(`No vaccine available for ${pin}`);
            return [];
          }

          const vaccines = [];

          data.centers.forEach((center) => {
            let sessions = center.sessions.filter((s) => s.available_capacity > 0);

            if (age){
              sessions = center.sessions.filter((s) => s.min_age_limit === age);
            }

            if (dose){
              sessions = center.sessions.filter((s) => s[`available_capacity_dose${dose}`] > 0);
            }

            if (isEmpty(sessions.length)){
              console.warn(`No vaccine available for ${center.name}, ${center.pincode}`);
            }

            sessions.forEach((s) => {
              s.center = center;
              vaccines.push(s);
            });
          });

          return vaccines;
        }))
      .catch((err) => { console.error('Something went wrong'); console.log(err); });
  }
};

export default COVID19;
