module.exports = function (grunt) {
  var conf = {
    appDir:   'src',
    distDir:  'www',
    imgDir:   '<%= conf.appDir %>/images',
    jsDir:    '<%= conf.appDir %>/scripts',
    cssDir:   '<%= conf.appDir %>/styles',
    fontsDir: '<%= conf.appDir %>/fonts',
    bowerDir: '<%= conf.appDir %>/bower_components'
  };

  grunt.loadTasks('tasks');
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    conf: conf,

    clean: {
    },

    generate_index: {
      options: {
        pkg: '<%= pkg %>',
        env: process.env.NODE_ENV || 'development'
      },
      server: {
        options: {
          // @todo: make components concat and minification
          // concatJs: false,
          // concatCss: false,

          // override main components
          overrides: {
            'modernizr': false
          },

        },

        // app and common packages
        packages: {
          app: {
            files: ['./app/scripts/**/*', '!./app/**/*.spec.js'],
            concat: false,
            minify: false,
            baseDir: 'app'
          }
        },
        templateFile: 'templates/index.html.tmpl',
        outputFile: 'app/index.html'
      }
    }
  });

  grunt.registerTask('make', 'Make files', ['generate_index']);
};