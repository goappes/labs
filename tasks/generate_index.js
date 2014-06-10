module.exports = function (grunt) {
  var path = require('path');
  var fs = require('fs');
  var _ = grunt.util._;

  function getCanonicalDir(dir, baseDir, replaceBaseDir) {
    var regExp = new RegExp('^(.*(' + baseDir.replace(/\/$/, '') + ')/)(.*)');
    return dir.replace(regExp, '$2/$3')
              .replace(/^[\.\/]/, '')
              .replace(baseDir, replaceBaseDir || '');
  }

  function getPaths(entries) {
    var dependencies = {},
        i = 0;

    var walkDependencies = function (entrie) {

      if (entrie.dependencies) {
        _.forOwn(entrie.dependencies, function (dep, name) {
          if (!_.has(dependencies, name)) {
            dependencies[name] = dep;
            dependencies[name].priority = i++;
            walkDependencies(dep);
          }
        });
      }
    };

    walkDependencies(entries);

    var paths = {};
    _.forOwn(dependencies, function (dep, name) {
      var main = dep.pkgMeta.main;
      // @todo: dynamic bower_component dir replacement
      var dir = getCanonicalDir(dep.canonicalDir, 'bower_components', 'bower_components');

      if (!paths[name]) {
        paths[name] = {
          priority: 0,
          name: name,
          paths: []
        };
      } else {
        return;
      }

      if (Object.keys(dep.dependencies).length) {
        dep.priority = _.max(_.toArray(dep.dependencies), 'priority').priority + 1;
      }

      if (!dep.priority) {
        dep.priority = i++;
      }

      paths[name].priority = dep.priority;

      if (main) {
        if (_.isArray(main)) {
          _.each(main, function (m) {
            paths[name].paths.push([dir, m.replace(/^[\.\/]+/, '')].join('/'));
          });
        } else {
          paths[name].paths.push([dir, main.replace(/^[\.\/]+/, '')].join('/'));
        }
      } else {
        paths[name].paths.push('');
      }
    });

    return _.sortBy(_.toArray(paths), 'priority');
  }


  grunt.registerMultiTask('generate_index', 'Generate index.html', function () {
    var done = this.async();
    var bower = require('bower');
    var colors = {
      cached: 'grey',
      install: 'green',
      validate: 'yellow'
    };

    var options = this.options();
    var data = this.data;

    var overrides = options.overrides;

    // @todo: make this a option param
    var filetype_matches = {
      styles: /\.css$/,
      javascripts: /\.js$/,
      // images: /\.(png|jp.?g|gif)$/,
      fonts: /\.(eot|woff|ttf|svg)$/
    };

    var packages = {
      styles: [],
      javascripts: [],
      // images: [],
      fonts: []
    };



    _.forOwn(this.data.packages, function (package, i) {
      // console.log(grunt.file.expand(this.data.packages.app.files))
      // console.log(package.files, grunt.file.expand(package.files))
      // console.log('Packing', i, '-------------------------')

      if (package.concatTask) {
        grunt.task.run([package.concatTask]);
      }

      var files = grunt.file.expand(package.files);
      _.each(files, function (entriePath) {
        _.forOwn(filetype_matches, function (regExp, type) {
          var dir = getCanonicalDir(entriePath, 'www/scripts', 'scripts');
          // console.log(dir)
          if (dir.match(regExp)) {
            // console.log(type);
            packages[type].push(dir);
          }
        });
      });
    });

    // console.log(packages);

    bower.commands.list(null, { offline: true })
      .on('error', function (err) {
        grunt.log.error(err);
        done(false);
      })
      .on('end', function (dependencyGraph) {
        var graph;
        var components = {
          styles: [],
          javascripts: [],
          // images: [],
          fonts: []
        };

        // Apply overrides
        _.forOwn(overrides, function (dep, name) {
          var overrideDeps = dep.dependencies;
          var overrideFiles;

          if (_.isObject(dep)) {
            overrideFiles = dep.files;
          } else {
            overrideFiles = dep;
          }

          if (overrideDeps) {
            // empty reset dependencies 
            dependencyGraph.dependencies[name].dependencies = overrideDeps;
            // apply dependencies override
            _.each(overrideDeps, function (d) {
              dependencyGraph.dependencies[name].dependencies[d] = dependencyGraph.dependencies[d];
            });
          }

          if (overrideFiles) {
            dependencyGraph.dependencies[name].pkgMeta.main = overrideFiles;
          }
        });

        graph = getPaths(dependencyGraph);

        _.forOwn(graph, function (deps) {
          // console.log(deps.name);
          _.each(deps.paths, function (entriePath) {
            // console.log(entriePath);
            _.forOwn(filetype_matches, function (regExp, type) {
              if (entriePath.match(regExp)) {
                // console.log(type);
                components[type].push(entriePath);
              }
            });
          });
        });

        // console.log(components);


        grunt.file.copy(data.templateFile, data.outputFile, {
          process: function (contents, path) {
            return grunt.template.process(contents, {
              data: {
                packages: packages,
                components: components,
                env: options.env
              }
            });
          }
        });


        grunt.log.ok('"' + data.outputFile + '" generated successfull!');

        done();
      });
  });

};
