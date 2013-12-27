module.exports = function(grunt) {

  var express = require('express');
  var lockfile = require('lockfile');
  var fs = require('fs');
  var path = require('path');

  grunt.registerTask('serve', function(target, proxyMethodToUse) {

    require('express-namespace');

    var app = express();
    var done = this.async();
    var port = process.env.PORT || 8000;

    app.use(lock);
    app.use(express.compress());
    app.use(express.json());
    app.use(express.urlencoded());

    require('../api/routes')(app);

    if (target === 'debug') {

      app.use(require('connect-livereload')());

      app.use(static({ urlRoot: '/config', directory: 'config' }));
      app.use(static({ urlRoot: '/vendor', directory: 'vendor' }));
      app.use(static({ directory: 'public' }));
      app.use(static({ urlRoot: '/tests', directory: 'tests' }));
      app.use(static({ directory: 'tmp/result' }));
      app.use(static({ file: 'tmp/result/index.html' }));

    } else {

      app.use(lock);
      app.use(static({ directory: 'dist' }));
      app.use(static({ file: 'dist/index.html' }));

    }

    app.listen(port, function() {
      grunt.log.ok('Started development server on port %d.', port);
    });

    if (!this.flags.keepalive) { done(); }
  });

  function lock(req, res, next) {
    (function retry() {
      if (lockfile.checkSync('tmp/connect.lock')) {
        setTimeout(retry, 30);
      } else { next(); }
    })();
  }

  function static(options) {
    return function(req, res, next) {
      var filePath = "";

      if (options.directory) {
        var regex = new RegExp('^' + (options.urlRoot || ''));
        if (!req.path.match(regex)) { next(); return; }
        filePath = options.directory + req.path.replace(regex, '');
      } else if (options.file) {
        filePath = options.file;
      } else {
        throw new Error('static() isn\'t properly configured!');
      }

      fs.stat(filePath, function(err, stats) {
        if (err) { next(); return; }
        if (stats.isDirectory()) { filePath = path.join(filePath, 'index.html'); }
        res.sendfile(filePath, function(err) {
          if (err) { next(); return; }
          grunt.verbose.ok('Served: ' + filePath);
        });
      });
    };
  }

};
