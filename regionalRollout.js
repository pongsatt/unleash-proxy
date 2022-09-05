const { Strategy } = require('unleash-client');

class RegionalRolloutStrategy extends Strategy {
  constructor() {
    super('RegionalRollout');
  }

  #CACHE = {};
  
  withStickiness(parameters, context, getValue) {
    const key = context['sessionId'];

    if (!key) {
      // when sessionId is missing from the context, evaluate the function
      return getValue();
    }

    // retrieve previous value from cache
    const stickyResult = this.#CACHE[key];

    if (stickyResult !== undefined) {
      // in the cache
      console.log('RegionRollout - evaluate stickiness: ', parameters.stickiness, ' stickyResult: ', stickyResult);
      return stickyResult;
    }

    // not in the cache, evaluate the function
    const result = getValue();

    // store value in cache
    this.#CACHE[key] = result;

    return result;
  }

  isEnabled(parameters, context) {
    return this.withStickiness(parameters, context, () => {
      const result = Math.random() < parameters.percent / 100;
      console.log('RegionalRollout - evaluate rollout: ', parameters.percent, ' result: ', result);
      return result;
    });
  }
}

module.exports = RegionalRolloutStrategy