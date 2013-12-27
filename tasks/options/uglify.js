module.exports = function (grunt) {
  return {
    options: {
      banner: '/*! <%= pkg.name %> | <%= pkg.version %> | <%= grunt.template.today("yyyy-mm-dd") %> /\n'
    },
    dist: {
      src: './<%= pkg.name %>.js',
      dest: './<%= pkg.name %>.min.js'
    }
  };
};
