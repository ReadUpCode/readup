var shared = require('./karma-shared.conf');

module.exports = function(config) {
  shared(config);

  config.set({
    frameworks: ['ng-scenario'],
    files: ['test/e2e/**/*.js'],
    urlRoot: '/_karma_/',
    plugins: ['karma-ng-scenario', 'karma-chrome-launcher'],
    proxies: {
      '/': 'http://127.0.0.1:3000/'
    }
  });
};