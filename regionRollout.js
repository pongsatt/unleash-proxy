const { Strategy } = require('unleash-client');


class RegionRolloutStrategy extends Strategy {
  #CACHE = {};

  constructor() {
    super('RegionRollout');
  }

  withStickiness(parameters, context, getValue) {
    const keyParam = parameters.stickiness;
    const key = context[keyParam];

    if (!key) {
      return getValue();
    }

    const stickyResult = this.#CACHE[key];

    if (stickyResult !== undefined) {
      console.log('RegionRollout - evaluate stickiness: ', parameters.stickiness, ' stickyResult: ', stickyResult);
      return stickyResult;
    }

    const result = getValue();
    this.#CACHE[key] = result;

    return result;
  }

  isRegionEnabled(parameters, context) {
    const regionsParam = parameters.regions;

    if (!regionsParam || regionsParam.length === 0) {
      return true;
    }

    const result = regionsParam.includes(context.properties.continent);
    console.log('RegionRollout - evaluate region: ', regionsParam, ' result: ', result, ' from region: ', context.properties.continent);
    return result;
  }

  isEnabled(parameters, context) {
    return this.withStickiness(parameters, context, () => {
      if (this.isRegionEnabled(parameters, context)) {
        const result = Math.random() < parameters.percent / 100;
        console.log('RegionRollout - evaluate rollout: ', parameters.percent, ' result: ', result);
        return result;
      }

      return false;
    });
  }
}

module.exports = RegionRolloutStrategy