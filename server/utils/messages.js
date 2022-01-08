const moment = require('moment');
const uuid = require('uuid');

function formatMessage(username, text, type) {
  return {
    id: uuid.v4(),
    username,
    type,
    text,
    time: moment().format('h:mm a')
  };
}

module.exports = formatMessage;
