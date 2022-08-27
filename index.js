const port = 3000;

const { createApp } = require('@unleash/proxy');
const TimeStampStrategy = require('./timestamp');
const express = require('express')
const expressApp = express();
var requestIp = require('request-ip');
const iplocate = require("node-iplocate");
const RegionStrategy = require('./region');
const RolloutStrategy = require('./rollout');
const RegionRolloutStrategy = require('./regionRollout');

expressApp.use(requestIp.mw())

expressApp.use((req, res, next) => {
    var ip = req.clientIp;
    req.query.remoteAddress = ip;

    iplocate(ip, null, function (err, results) {
        if (err != null) {
            console.error(err);
            return next();
        }
        req.query = { ...req.query, ...results };
        next();
    });
})

const app = createApp({
    unleashUrl: 'http://localhost:4242/api',
    unleashApiToken: 'default:development.unleash-insecure-api-token',
    clientKeys: ['clientKey1'],
    proxyPort: 3000,
    refreshInterval: 1000,
    customStrategies: [new TimeStampStrategy(), new RegionStrategy(), new RolloutStrategy(), new RegionRolloutStrategy()],
}, undefined, expressApp);

app.listen(port, () =>
    console.log(`Unleash Proxy listening on http://localhost:${port}/proxy`),
);