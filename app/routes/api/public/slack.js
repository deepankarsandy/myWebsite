/*
modification history
--------------------
01a,06jun2021,deepankar created
*/

const { WebClient, LogLevel } = require('@slack/web-api');

const client = new WebClient(process.env.SLACK_BOT_API, {
  logLevel: LogLevel.ERROR
});

const Slack = {
  send(data){
    return client.chat.postMessage({
      ...data,
    });
  }
};

module.exports = Slack;
