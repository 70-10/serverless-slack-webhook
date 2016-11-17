"use strict";

const co = require("co");
const Slack = require("node-slackr");

const WEBHOOK_URL = "<YOUR WEBHOOK URL>";
const ICON_URL = "<ICON URL>";

module.exports = {
  hello,
};

function hello(event, context, callback) {
  co(function *() {
    const res = yield notify({
      channel: "<CHANNEL>",
      username: "<BOT NAME>",
      text: "<TEXT>",
      icon_url: ICON_URL
    });

    callback(null, JSON.stringify({
      statusCode: 200,
      body: res
    }));
  }).catch(e => callback(e, null));
}

function notify(payload) {
  const slack = new Slack(WEBHOOK_URL);
  return new Promise((resolve, reject) => {
    slack.notify(payload, (err, result) => {
      if(err) {
        reject(err);
        return;
      }

      resolve(result);
    });
  });
}
