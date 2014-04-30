// jshint node:true

module.exports = function(grunt) {
  var Helpers = require('./tasks/helpers'),
  filterAvailable = Helpers.filterAvailableTasks,
  _ = grunt.util._,
  path = require('path');

  Helpers.pkg = require("./package.json");

  if (Helpers.isPackageAvailable("time-grunt")) {
    require("time-grunt")(grunt);
  }

  // Loads task options from `tasks/options/` and `tasks/custom-options`
  // and loads tasks defined in `package.json`
  var config = _.extend({},
                        require('load-grunt-config')(grunt, {
                          configPath: path.join(__dirname, 'tasks/options'),
                          loadGruntTasks: false,
                          init: false
                        }),
                        require('load-grunt-config')(grunt, { // Custom options have precedence
                          configPath: path.join(__dirname, 'tasks/custom-options'),
                          init: false
                        })
                       );

                       grunt.loadTasks('tasks'); // Loads tasks in `tasks/` folder

                       config.env = process.env;


                       // App Kit's Main Tasks
                       // ====================


                       // Generate the production version
                       // ------------------
                       grunt.registerTask('dist', "Build a minified & production-ready version of your app.", [
                         'clean:dist',
                         'build:dist',
                         'copy:assemble',
                         'createDistVersion'
                       ]);


                       // Default Task
                       // ------------------
                       grunt.registerTask('default', "Build (in debug mode) & test your application.", ['test']);


                       // Servers
                       // -------------------
                       grunt.registerTask('server', "Run your server in development mode, auto-rebuilding when files change.", function(proxyMethod) {
                         var expressServerTask = 'expressServer:debug';
                         if (proxyMethod) {
                           expressServerTask += ':' + proxyMethod;
                         }

                         grunt.task.run(['clean:debug',
                                        'build:debug',
                                        expressServerTask,
                                        'watch'
                         ]);
                       });

                       grunt.registerTask('server:dist', "Build and preview a minified & production-ready version of your app.", [
                         'dist',
                         'expressServer:dist:keepalive'
                       ]);


                       // Testing
                       // -------
                       grunt.registerTask('test', "Run your apps's tests once. Uses Google Chrome by default.", [
                         'clean:debug', 'build:debug', 'testem:ci:basic' ]);

                         grunt.registerTask('test:ci', "Run your app's tests in PhantomJS. For use in continuous integration (i.e. Travis CI).", [
                           'clean:debug', 'build:debug', 'testem:ci:basic' ]);

                           grunt.registerTask('test:browsers', "Run your app's tests in multiple browsers (see tasks/options/testem.js for configuration).", [
                             'clean:debug', 'build:debug', 'testem:ci:browsers' ]);

                             grunt.registerTask('test:server', "Alias to `testem:run:basic`. Be sure to install testem first using `npm install -g testem`", [
                               'testem:run:basic' ]);

                               // Worker tasks
                               // =================================

                               grunt.registerTask('build:dist', filterAvailable([
                                 'createResultDirectory', // Create directoy beforehand, fixes race condition
                                 'fancySprites:create',
                                 'concurrent:buildDist', // Executed in parallel, see config below
                               ]));

                               grunt.registerTask('build:debug', filterAvailable([
                                 'jshint:tooling',
                                 'createResultDirectory', // Create directoy beforehand, fixes race condition
                                 'fancySprites:create',
                                 'concurrent:buildDebug', // Executed in parallel, see config below
                               ]));

                               grunt.registerTask('createDistVersion', filterAvailable([
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
                               ]));

                               // Documentation
                               // -------
                               grunt.registerTask('docs', "Build YUIDoc documentation.", [
                                 'buildDocs',
                                 'server:debug'
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
                               grunt.registerTask('buildTemplates:dist', filterAvailable([
                                 'emblem:compile',
                                 'emberTemplates:dist'
                               ]));

                               grunt.registerTask('buildTemplates:debug', filterAvailable([
                                 'emblem:compile',
                                 'emberTemplates:debug'
                               ]));

                               // Scripts
                               grunt.registerTask('buildScripts', filterAvailable([
                                 'jshint:app',
                                 'jshint:tests',
                                 'validate-imports:app',
                                 'validate-imports:tests',
                                 'coffee',
                                 'emberscript',
                                 'copy:javascriptToTmp',
                                 'transpile',
                                 'buildDocs',
                                 'concat_sourcemap'
                               ]));

                               // Styles
                               grunt.registerTask('buildStyles', filterAvailable([
                                 'compass:compile',
                                 'sass:compile',
                                 'less:compile',
                                 'stylus:compile',
                                 'copy:cssToResult',
                                 'autoprefixer:app'
                               ]));

                               // Documentation
                               grunt.registerTask('buildDocs', filterAvailable([
                                 'yuidoc:debug',
                               ]));

                               // Index HTML
                               grunt.registerTask('buildIndexHTML:dist', [
                                 'preprocess:indexHTMLDistApp',
                                 'preprocess:indexHTMLDistTests'
                               ]);

                               grunt.registerTask('buildIndexHTML:debug', [
                                 'preprocess:indexHTMLDebugApp',
                                 'preprocess:indexHTMLDebugTests'
                               ]);

                               grunt.registerTask('createResultDirectory', function() {
                                 grunt.file.mkdir('tmp/result');
                               });

                               grunt.initConfig(config);
};
