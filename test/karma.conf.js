'use strict';

var webpackTestConfig = require('../webpack.tests.config.js');
process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = function(config) {
    config.set({
      browsers: ['MyChromeHeadless'],
      customLaunchers: {
        MyChromeHeadless: {
          base: 'ChromeHeadless',
          flags: [
            '--headless',
            '--disable-gpu',
            '--disable-translate',
            '--disable-extensions',
            '--no-sandbox',
            '--disable-web-security',
            '--disable-site-isolation-trials',
            "--js-flags=--max-old-space-size=8196", // THIS LINE FIXED IT!!!

          ]
        }
      },
        // karma only needs to know about the test bundle
        files: ['./test.bundle.js'],
        // singleRun: true,
        frameworks: [
            'chai',
            'mocha',
            'sinon',
            'sinon-chai',
            'phantomjs-shim'
        ],
        plugins: [
            'karma-chrome-launcher',
            'karma-chai',
            'karma-mocha',
            'karma-sinon',
            'karma-sinon-chai',
            'karma-sourcemap-loader',
            'karma-webpack',
            'karma-coverage',
            'karma-mocha-reporter',
            'karma-phantomjs-launcher',
            'karma-phantomjs-shim'
        ],
        phantomjsLauncher: {},
        // run the bundle through the webpack and sourcemap plugins
        preprocessors: {
            './test.bundle.js': ['webpack', 'sourcemap']
        },
        reporters: ['mocha', 'coverage'],
        mochaReporter: {
            output: 'autowatch'
        },
        coverageReporter: {
            type: 'text'
        },
        singleRun: true,
        // webpack config object
        webpack: webpackTestConfig,
        webpackMiddleware: {
            noInfo: true,
        },
        port: 3300
    });
};
