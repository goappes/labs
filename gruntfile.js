module.exports = function (grunt) {
  var conf = {
    appDir:   'www',
    distDir:  'dist',
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
      dist: ['<%= conf.distDir %>/*', '!<%= conf.distDir %>/.gitkeep']
    },

    ripple: {
      options: {
        keepAlive: true,
        path: './'
      },
      www: {}
    },

    copy: {
      // filter dist necessary files
      dist: {
        files: [
          {
            cwd: '<%= conf.appDir %>',
            src: [
              '**',
              '!bower_components/angular{,-animate,-sanitize,-ui-router}/**',
              '!**/scss/**',
              '!**/LICENSE',
              '!**/{*.md,*.json,*.tpl}',
              '!scripts/**'
            ],
            dest: '<%= conf.distDir %>',
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

    html2js: {
      options: {
        module: 'app.templates',
        singleModule: true,
        quoteChar: '\''
      },
      dist: {
        src: ['<%= conf.appDir %>/**/*.tpl.html'],
        dest: '<%= conf.distDir %>/scripts/templates.js'
      },
    },

    generate_index: {
      options: {
        pkg: '<%= pkg %>',
        env: process.env.NODE_ENV || 'development',
        overrides: {
          'angular': false,
          'angular-animate': false,
          'angular-sanitize': false,
          'angular-ui-router': false,
          'ionic': { dependencies: [], files:'./js/ionic.bundle.min.js' }
        }
      },

      // generate index for dist
      dist: {
        packages: {
          app: {
            files: ['<%= conf.distDir %>/scripts/*.js'],
            baseDir: 'src'
          }
        },
        templateFile: '<%= conf.appDir %>/index.html.tpl',
        outputFile: '<%= conf.distDir %>/index.html'
      }
    }
  });

  grunt.registerTask('make', 'Make files', ['bower_install', 'clean:dist', 'concat:dist', 'html2js:dist', 'copy:dist', 'generate_index:dist']);
  grunt.registerTask('serve', 'Serve www static files with ripple', ['ripple:www']);
};