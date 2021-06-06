/*
modification history
--------------------
01a,06jun2021,deepankar created
*/

// ID of the channel you want to send the message to
const deepankar = 'UGN1EP802'; // Tikkl#deepankar

const Slack = {
  post(message, names = 'deepankar'){
    const msg = `@deepankar: ${message}`;

    fetch(`${location.origin}/api/public/slack`, {
      method:  'POST',
      headers: {
        accept: 'application/json',
      },
      body: JSON.stringify({ channel: deepankar, text: msg, link_names: names })
    })
      .catch((err) => console.log(err));
  }
};

export default Slack;
