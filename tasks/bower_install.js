module.exports = function (grunt) {
  grunt.registerTask('bower_install', 'Make install', function () {
    var path = require('path');
    var done = this.async();
    var bower = require('bower');
    var colors = {
      cached: 'grey',
      install: 'green',
      validate: 'yellow'
    };

    bower.commands.install()
      .on('log', function (result) {
        var id = grunt.log.wordlist([result.id], { separator: ' ', color: colors[result.id] });

        if (result.id === 'install') {
          grunt.log.writeln('bower', id, result.message);
        } else {
          grunt.log.verbose.writeln('bower', id, result.message);
        }
      })
      .on('error', function (err) {
        grunt.log.error(err);
        done(false);
      })
      .on('end', function (results) {
        grunt.log.ok('bower components installed');
        done();
      });
  });
};