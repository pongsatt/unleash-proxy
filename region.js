const { Strategy } = require('unleash-client');

class RegionStrategy extends Strategy {
  constructor() {
    super('Region');
  }

  isEnabled(parameters, context) {
    const result = parameters.region.includes(context.properties.continent);
    console.log('Region - evaluate: ', parameters.region, ' result: ', result, ' from region: ', context.properties.continent);
    return result;
  }
}

module.exports = RegionStrategy