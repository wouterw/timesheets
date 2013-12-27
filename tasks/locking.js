var lockfile = require('lockfile');

module.exports = function(grunt) {
  grunt.registerTask('lock', 'Set semaphore for connect server to wait on.', function() {
    grunt.file.mkdir('tmp');
    lockfile.lockSync('tmp/connect.lock');
    grunt.log.writeln("Locked - Development server won't answer incoming requests until we're done updating.");
  });

  grunt.registerTask('unlock', 'Release semaphore that connect server waits on.', function() {
    lockfile.unlockSync('tmp/connect.lock');
    grunt.log.writeln('Unlocked - Development server now handles requests.');
  });
};
