const { Strategy } = require('unleash-client');

class RegionalRolloutStrategy extends Strategy {
  constructor() {
    super('RegionalRollout');
  }

  isEnabled(parameters, context) {
    const result = Math.random() < parameters.percent / 100;
    console.log('RegionalRollout - evaluate rollout: ', parameters.percent, ' result: ', result);
    return result;
  }
}

module.exports = RegionalRolloutStrategy