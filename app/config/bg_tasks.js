const fetch = require('node-fetch');
const Slack = require('../routes/api/public/slack');

function notifyVaccines(){
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
          return false;
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

        if (vaccines?.length){
          Slack.send({ channel: 'UGN1EP802', text: '@deepankar: Vaccine Available', link_names: 'deepankar' });

          return true;
        }

        return false;
      }))
    .catch((err) => {
      Slack.send({ channel: 'UGN1EP802', text: '@deepankar: Vaccine fetch error', link_names: 'deepankar' });
      Slack.send({ channel: 'UGN1EP802', text: err });

      throw err;
    });
}

const fastTasks = [notifyVaccines];

const BG_TASKS = {
  init(){
    BG_TASKS.fast();
  },

  fast(){
    function run(){
      fastTasks.forEach((task, index) => {
        task()
          .then((success) => {
            if (success){
              fastTasks.splice(index, 1);
            }
          })
          .catch(() => {
            fastTasks.splice(index, 1);
          });
      });
    }

    run();
    setInterval(run, 6 * 60 * 1000);
  },
};

module.exports = BG_TASKS;
