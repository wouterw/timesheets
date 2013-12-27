/* jshint node: true */

module.exports = function(grunt) {

  var path = require('path'),
         _ = grunt.util._;

  // Loads tasks for package.json and options from `tasks/options`
  var config = require('load-grunt-config')(grunt, {
    defaultPath: path.join(__dirname, 'tasks/options'),
    configPath: path.join(__dirname, 'tasks/custom'),
    init: false
  });

  // Loads tasks in `tasks` folder
  grunt.loadTasks('tasks');

  grunt.registerTask('createResultDirectory', function() {
    grunt.file.mkdir('tmp/result');
  });

  // Environment
  config.env = process.env;

  // Default Task

  grunt.registerTask(
    'default',
    "Build (in debug mode) & test your application.",
    ['test']
  );

  // Release Task

  grunt.registerTask(
    'dist',
    "Build a minified & production-ready version of your app.",
    ['clean:dist', 'build:dist', 'copy:assemble', 'createDistVersion']
  );

  // Server Tasks

  grunt.registerTask(
    'server',
    "Run your server in development mode, auto-rebuilding when files change.",
    ['clean:debug', 'build:debug', 'serve:debug', 'watch']
  );

  grunt.registerTask(
    'server:dist',
    "Build and preview a minified & production-ready version of your app.",
    ['dist', 'serve:dist:keepalive']
  );

  // Testing Tasks

  grunt.registerTask(
    'test',
    "Run your apps's tests once. Uses Google Chrome by default.",
    ['clean:debug', 'build:debug', 'testem:ci:basic']
  );

  grunt.registerTask(
    'test:ci',
    "Run your app's tests in PhantomJS. For use in continuous integration.",
    ['clean:debug', 'build:debug', 'testem:ci:basic' ]
  );

  grunt.registerTask(
    'test:browsers',
    "Run your app's tests in multiple browsers.",
    ['clean:debug', 'build:debug', 'testem:ci:browsers']
  );

  grunt.registerTask(
    'test:server',
    "Start the test server and the standard development server.",
    ['clean:debug', 'build:debug', 'testem:run:basic', 'serve:debug', 'watch']
  );

  // Build Tasks

  grunt.registerTask('build:dist', [
    'createResultDirectory', // Create directoy beforehand, fixes race condition
    'concurrent:buildDist', // Executed in parallel, see config below
  ]);

  grunt.registerTask('build:debug', [
    'jshint:tooling',
    'createResultDirectory', // Create directoy beforehand, fixes race condition
    'concurrent:buildDebug', // Executed in parallel, see config below
  ]);


  grunt.registerTask('createDistVersion', [
    'useminPrepare', // Configures concat, cssmin and uglify
    'concat', // Combines css and javascript files

    'cssmin', // Minifies css
    'uglify', // Minifies javascript
    'imagemin', // Optimizes image compression
    // 'svgmin',
    'copy:dist', // Copies files not covered by concat and imagemin

    'rev', // Appends 8 char hash value to filenames
    'usemin', // Replaces file references
    'htmlmin:dist' // Removes comments and whitespace
  ]);

  // Parallelize most of the build process

  _.merge(config, {
    concurrent: {
      buildDist: [
        "buildTemplates:dist",
        "buildScripts",
        "buildStyles",
        "buildIndexHTML:dist"
      ],
      buildDebug: [
        "buildTemplates:debug",
        "buildScripts",
        "buildStyles",
        "buildIndexHTML:debug"
      ]
    }
  });

  // Templates

  grunt.registerTask('buildTemplates:dist', ['emberTemplates:dist']);
  grunt.registerTask('buildTemplates:debug', ['emberTemplates:debug']);

  // Javascript

  grunt.registerTask('buildScripts', [
    'jshint:app',
    'jshint:tests',
    'copy:javascriptToTmp',
    'transpile',
    'concat_sourcemap'
  ]);

  // CSS

  grunt.registerTask('buildStyles', ['less:compile', 'copy:cssToResult']);

  // HTML

  grunt.registerTask('buildIndexHTML:dist', ['preprocess:indexHTMLDistApp', 'preprocess:indexHTMLDistTests']);
  grunt.registerTask('buildIndexHTML:debug', ['preprocess:indexHTMLDebugApp', 'preprocess:indexHTMLDebugTests']);

  // Initialize the config object for the current project.

  grunt.initConfig(config);
};
