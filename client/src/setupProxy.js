const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/tasks',
        createProxyMiddleware({
            target: 'http://server:5000',
            changeOrigin: true,
        })
    );
};
