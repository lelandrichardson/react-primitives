/* eslint-disable */
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['browserify', 'mocha'],
    files: [
      'test/**/*.js',
    ],
    preprocessors: {
      'src/**/*.js': ['babel', 'browserify'],
      'test/**/*.js': ['babel', 'browserify'],
    },
    babelPreprocessor: {
      options: {
        presets: ['airbnb'],
      }
    },
    browserify: {
      debug: true,
      transform: [
        ['babelify', {
          presets: ['airbnb'],
          plugins: ["transform-object-rest-spread"]
        }]
      ],
      configure: function(bundle) {
        bundle.on('prebundle', function() {
          bundle.external('react/lib/ReactContext');
          bundle.external('react/lib/ExecutionEnvironment');
          bundle.external('react/addons');
        });
      }
    },
    reporters: ['progress', 'mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: false,
  });
};
