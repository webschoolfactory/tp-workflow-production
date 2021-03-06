'use strict';


module.exports = function (grunt) {

    grunt.initConfig({
        jshint: {
            files: ['controllers/**/*.js', 'lib/**/*.js', 'models/**/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        requirejs: {
            build: {
                options: {
                    baseUrl: 'public/js',
                    mainConfigFile: 'public/js/config.js',
                    dir: '.build/js',
                    optimize: 'uglify',
                    modules: [{name: 'app'}]
                }
            }
        },
        less: {
            build: {
                options: {
                    yuicompress: true,
                    paths: ['public/css']
                },
                files: {
                    '.build/css/app.css': 'public/css/app.less'
                }
            }
        },
        makara: {
            files: ['public/templates/**/*.dust'],
            options: {
                contentPath: ['locales/**/*.properties']
            }
        },
        dustjs: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: 'tmp/',
                        src: '**/*.dust',
                        dest: '.build/templates',
                        ext: '.js'
                    }
                ],
                options: {
                    fullname: function (filepath) {
                        var path = require('path'),
                            name = path.basename(filepath, '.dust'),
                            parts = filepath.split(path.sep),
                            fullname = parts.slice(3, -1).concat(name);

                        return fullname.join(path.sep);
                    }
                }
            }
        },
        copyto: {
            build: {
                files: [
                    { cwd: 'public', src: ['**/*'], dest: '.build/' }
                ],
                options: {
                    ignore: [
                        'public/css/**/*',
                        'public/js/**/*',
                        'public/templates/**/*'
                    ]
                }
            }
        },
        clean: {
            'tmp': 'tmp',
            'build': '.build/templates'
        },
        mochaTest: {
                test : {
                    src: ['test/*Spec.js'],
                    options: {
                        globals: ['chai'],
                        timeout: 6000,
                        ignoreLeaks: false,
                        ui: 'bdd',
                        reporter: 'spec',
                        require: 'test/blanket'
                    }
                },
                coverage: {
                    src: ['test/*Spec.js'],
                    options: {
                        reporter: 'html-cov',
                        // use the quiet flag to suppress the mocha console output
                        quiet: true,
                        // specify a destination file to capture the mocha
                        // output (the quiet option does not suppress this)
                        captureFile: 'test/coverage/coverage-node.html'
                    }
                }
        },
        concurrent: {
          dev: {
            tasks: ['shell:mongod', 'nodemon', 'watch'],
            options: {
              logConcurrentOutput: true
            }
          }
        },
        nodemon: {
          dev: {
            script: 'index.js',
            options: {
              nodeArgs: ['--debug'],
              env: {
                PORT: '8000',
                NODE_ENV : 'development'
                            
              },
              // omit this property if you aren't serving HTML files and 
              // don't want to open a browser tab on start
              callback: function (nodemon) {
                nodemon.on('log', function (event) {
                  console.log(event.colour);
                });

                // opens browser on initial server start
                nodemon.on('config:update', function () {
                  // Delay before server listens on port
                  setTimeout(function() {
                    require('open')('http://localhost:8000');
                  }, 1000);
                });

                // refreshes browser when server reboots
                nodemon.on('restart', function () {
                  // Delay before server listens on port
                  setTimeout(function() {
                    require('fs').writeFileSync('.rebooted', 'rebooted');
                  }, 1000);
                });
              }
            }
          }
        },
        watch: {
          server: {
            files: ['.rebooted'],
            options: {
              livereload: true
            }
          } 
        },
        shell: {                                // Task
            mongod: {                      // Target
                options: {                      // Options
                    stdout: true
                },
                command: 'mongod --smallfiles'
            },
            deploy: {
                command: function(){
                    if (grunt.option.flags().indexOf('--verbose') > -1) {
                        return 'sh deploy.sh -v';
                    } else {
                        return 'sh deploy.sh';
                    }
                },
                options: {
                    stdout: true,
                    stderr: true,
                    failOnError : true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-nodemon');
    
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-cli');
    grunt.loadNpmTasks('grunt-dustjs');
    grunt.loadNpmTasks('grunt-copy-to');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadTasks('./node_modules/makara/tasks/');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('i18n', ['clean', 'makara', 'dustjs', 'clean:tmp']);
    grunt.registerTask('build', ['jshint', 'less',  'copyto', 'i18n']);
    grunt.registerTask('test', ['jshint', 'mochaTest']);
    grunt.registerTask('deploy', ['buuild', 'shell:deploy']);
    grunt.registerTask('default', ['concurrent']);

};
