const { Strategy } = require('unleash-client');

class TimeStampStrategy extends Strategy {
  constructor() {
    super('Timestamp');
  }

  isEnabled(parameters, context) {
    // console.log('context: ', context);
    const result = Date.parse(parameters.enableAfter) < Date.now();
    console.log('Timestamp - evaluate: ', parameters.enableAfter, ' result: ', result, ' from ip: ', context.remoteAddress);
    return result;
  }
}

module.exports = TimeStampStrategy