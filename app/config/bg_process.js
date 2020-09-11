const fetch = require('node-fetch');
const Slack = require('../routes/api/public/slack');

function getVaccines(){
  const dt = new Date().toLocaleString().split(',')[0].replace(/\//g, '-');

  return fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=755001&date=${dt}`, {
    method:  'GET',
    headers: {
      accept: 'application/json',
    }
  })
    .then((res) => res.json()
      .then((data) => {
        if (!data?.centers?.length){
          return [];
        }

        const vaccines = [];

        data.centers.forEach((center) => {
          const sessions = center.sessions.filter((s) => (
            s.min_age_limit === 18 && s.available_capacity_dose$1 > 0
          ));

          sessions.forEach((s) => {
            s.center = center;
            vaccines.push(s);
          });
        });

        return vaccines;
      }))
    .catch((err) => console.log(err));
}

const BG_PROCESS = {
  lightening(){
    setInterval(() => {
      getVaccines()
        .then((v) => {
          if (v?.length){
            Slack.send({ channel: 'UGN1EP802', text: '@deepankar: Vaccine Available', link_names: 'deepankar' });
          }
        })
        .catch((err) => Slack.send({ channel: 'UGN1EP802', text: '@deepankar: Server Crash', link_names: 'deepankar' }));
    }, 60 * 1000);
  }
};

module.exports = BG_PROCESS;
