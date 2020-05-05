'use strict';
const sass = require('node-sass');

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt, {
    pattern: ['grunt-*']
  });

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config: {
      'cssSrcDir': 'src/sass',
      'cssTargetDir': 'assets/css',
      'jsSrcDir': 'src/js',
      'jsTargetDir': 'assets/js'
    },
    copy: {
      dev: {
        files: [
          {
            dest: 'assets/font/',
            src: '*',
            cwd: 'src/font',
            expand: true
          },
          {
            dest: 'assets/img/',
            src: '*',
            cwd: 'src/img',
            expand: true
          },
          {
            dest: 'assets/js/libs/',
            src: '*',
            cwd: 'src/js/libs',
            expand: true
          },
          {
            dest: 'assets/css/',
            src: '*',
            cwd: 'src/sass/libs',
            expand: true
          }
        ]
      },
      dist: {
        files: [
          {
            dest: 'assets/font/',
            src: '*',
            cwd: 'src/font/',
            expand: true
          },
          {
            dest: 'assets/img/',
            src: '*',
            cwd: 'src/img',
            expand: true
          },
          {
            dest: 'assets/js/libs/',
            src: '*',
            cwd: 'src/js/libs',
            expand: true
          },
          {
            dest: 'assets/css/',
            src: '*',
            cwd: 'src/sass/libs',
            expand: true
          }
        ]
      }
    },
    clean: {
      dev: ['assets'],
      dist: ['assets', 'dist'],
      all: ['assets', 'dist']
    },
    sass: {
      dev: {
        options: {
          implementation: sass,
          includePaths: ['<%= config.cssSrcDir %>'],
          sourceMaps: true
        },
        files: {
          '<%= config.cssTargetDir %>/style.css': '<%= config.cssSrcDir %>/style.scss'
        }
      },
      dist: {
        options: {
          outputStyle: 'compressed',
          implementation: sass,
          includePaths: ['<%= config.cssSrcDir %>'],
          sourceMaps: true
        },
        files: {
          '<%= config.cssTargetDir %>/style.css': '<%= config.cssSrcDir %>/style.scss'
        }
      }
    },
    postcss: {
      options: {
        map: false
      },
      dev: {
        src: '<%= config.cssTargetDir %>/*.css'
      },
      dist: {
        src: '<%= config.cssTargetDir %>/*.css'
      }
    },
    cssmin: {
      dev: {
        files: [
          {
            expand: true,
            cwd: '<%=  config.cssTargetDir %>',
            src: ['*.css', '!*.min.css'],
            dest: '<%=  config.cssTargetDir %>',
            ext: '.min.css'
          }
        ]
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%=  config.cssTargetDir %>',
            src: ['*.css', '!*.min.css'],
            dest: '<%=  config.cssTargetDir %>',
            ext: '.min.css'
          }
        ]
      }
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['@babel/preset-env']
      },
      dev: {
        files: {
          '<%= config.jsTargetDir %>/script.js': '<%= config.jsSrcDir %>/script.js'
        }
      },
      dist: {
        files: {
          '<%= config.jsTargetDir %>/script.js': '<%= config.jsSrcDir %>/script.js'
        }
      }
    },
    uglify: {
      js: {
        files: {
          '<%= config.jsTargetDir %>/script.js': [
            '<%= config.jsTargetDir %>/script.js'
          ]
        }
      }
    },
    watch: {
      css: {
        files: '<%=  config.cssSrcDir %>/**/*.scss',
        tasks: ['sass:dev', 'copy:dev', 'postcss:dev', 'cssmin:dev']
      },
      js: {
        files: '<%=  config.jsSrcDir %>/**/*.js',
        tasks: ['babel:dev']
      }
    },
    compress: {
      main: {
        options: {
          archive: `dist/${require('./package.json').name}.zip`,
          level: 9
        },
        files: [{
          src: [
            '**',
            '!node_modules',
            '!node_modules/**',
            '!src',
            '!src/**',
            '!dist',
            '!dist/**',
            '!.git',
            '!.gitignore',
            '!Gruntfile.js',
            '!package-lock.json'
          ],
          dest: '.'
        }]
      },
    }
  });


  grunt.registerTask('build', [
    'clean:dist',
    'copy:dist',
    'sass:dist',
    'postcss:dist',
    'cssmin:dist',
    'babel:dist',
    'uglify'
  ]);
  grunt.registerTask('devWatch', [
    'clean:dev',
    'copy:dev',
    'sass:dev',
    'postcss:dev',
    'cssmin:dev',
    'babel:dev',
    'uglify',
    'watch'
  ]);
  grunt.registerTask('default', [
    'clean:dev',
    'copy:dev',
    'sass:dev',
    'postcss:dev',
    'cssmin:dev',
    'babel:dev',
    'uglify'
  ]);
};