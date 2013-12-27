module.exports = function (grunt) {
  return {
    "tests": {
      type: 'amd',
      moduleName: function(path) {
        return grunt.config.process('appkit/tests/') + path;
      },
      files: [{
        expand: true,
        cwd: 'tmp/javascript/tests/',
        src: '**/*.js',
        dest: 'tmp/transpiled/tests/'
      }]
    },
    "app": {
      type: 'amd',
      moduleName: function(path) {
        return grunt.config.process('appkit/') + path;
      },
      files: [{
        expand: true,
        cwd: 'tmp/javascript/app/',
        src: '**/*.js',
        dest: 'tmp/transpiled/app/'
      }]
    }
  };
};
