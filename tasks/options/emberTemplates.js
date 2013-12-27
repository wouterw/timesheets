module.exports = function (grunt) {
  return {
    options: {
      templateBasePath: /app\//,
        templateFileExtensions: /\.(hbs|hjs|handlebars)/,
      templateRegistration: function(name, template) {
        return grunt.config.process("define('appkit/") + name + "', ['exports'], function(__exports__){ __exports__['default'] = " + template + "; });";
      }
    },
    debug: {
      options: {
        precompile: false
      },
      src: "app/templates/**/*.{hbs,hjs,handlebars}",
      dest: "tmp/result/assets/templates.js"
    },
    dist: {
      src: "<%= emberTemplates.debug.src %>",
      dest: "<%= emberTemplates.debug.dest %>"
    }
  };
};
