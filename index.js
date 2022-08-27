const port = 3000;

const { createApp } = require('@unleash/proxy');
const express = require('express')
const expressApp = express();

const app = createApp({
    unleashUrl: 'http://localhost:4242/api',
    unleashApiToken: 'default:development.unleash-insecure-api-token',
    clientKeys: ['clientKey1'],
    proxyPort: 3000,
    refreshInterval: 1000,
}, undefined, expressApp);

app.listen(port, () =>
    console.log(`Unleash Proxy listening on http://localhost:${port}/proxy`),
);