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

    ripple: {
      options: {
        keepAlive: true
      },
      dist: {
        path: '<%= conf.distDir %>'
      },
    },

    copy: {
      dist: {
        files: [
          {
            cwd: '<%= conf.appDir %>/bower_components',
            src: ['ionic/**'],
            dest: '<%= conf.distDir %>/bower_components',
            expand: true
          },
          {
            cwd: '<%= conf.appDir %>/styles',
            src: ['**'],
            dest: '<%= conf.distDir %>/styles',
            expand: true
          },
          {
            cwd: '<%= conf.appDir %>/images',
            src: ['**'],
            dest: '<%= conf.distDir %>/images',
            expand: true
          }
        ]       
      }
    },

    concat: {
      dist: {
        src: ['<%= conf.appDir %>/scripts/**/*.js', '!<%= conf.appDir %>/**/*.spec.js'],
        dest: '<%= conf.distDir %>/scripts/app-bundle.js'
      },
    },

    generate_index: {
      options: {
        pkg: '<%= pkg %>',
        env: process.env.NODE_ENV || 'development',

        // override main components
        overrides: {
          // @todo: make regexp to ignore dependencies
          'angular': false,
          'angular-animate': false,
          'angular-sanitize': false,
          'angular-ui-router': false,
          'ionic': { dependencies: [], files: ['./js/ionic.bundle.min.js'] },
        }
      },
      
      // generate index for development
      development: {
        options: {
          // @todo: make components concat and minification
          // concatJs: false,
          // concatCss: false
        },

        // app and common packages
        packages: {
          app: {
            files: ['<%= conf.appDir %>/scripts/**/*', '!<%= conf.appDir %>/**/*.spec.js'],
            concat: false,
            minify: false,
            baseDir: 'src'
          }
        },

        // index.html template
        templateFile: '<%= conf.appDir %>/index.html.tpl',

        // index.html output
        outputFile: '<%= conf.distDir %>/index.html'
      },
      
      // generate index for dist
      dist: {
        options: {
          // @todo: make components concat and minification
          // concatJs: false,
          // concatCss: false
        },

        // app and common packages
        packages: {
          app: {
            files: ['<%= conf.distDir %>/scripts/app-bundle.js'],
            // concatTask: 'concat:dist',
            // minifyTask: '',
            baseDir: 'src'
          }
        },

        // index.html template
        templateFile: '<%= conf.appDir %>/index.html.tpl',

        // index.html output
        outputFile: '<%= conf.distDir %>/index.html'
      }
    }
  });

  grunt.registerTask('make', 'Make files', ['concat:dist', 'copy:dist', 'generate_index:dist']);
  grunt.registerTask('server', 'Start ripple server', ['make', 'ripple:dist']);
};