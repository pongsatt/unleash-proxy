const { Strategy } = require('unleash-client');


class RolloutStrategy extends Strategy {
  #CACHE = {};

  constructor() {
    super('Rollout');
  }

  getKey(context) {
    return context.sessionId;
  }

  isStickyEnabled(context) {
    const key = this.getKey(context);

    return this.#CACHE[key];
  }

  setSticky(context, result) {
    const key = this.getKey(context);

    this.#CACHE[key] = result;
  }

  isEnabled(parameters, context) {
    const sticky = this.isStickyEnabled(context);
    if (sticky !== undefined) {
      console.log('Rollout - evaluate (sticky): ', sticky);
      return sticky;
    }

    const result = Math.random() < parameters.percent / 100;
    console.log('Rollout - evaluate: ', parameters.percent, ' result: ', result);

    this.setSticky(context, result);
    return result;
  }
}

module.exports = RolloutStrategy