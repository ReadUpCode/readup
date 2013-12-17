module.exports = function(grunt){

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
    browserify: {
      dist: {
        files: {
          'public/build/bundle.js': ['public/js/**/*.js']
        }
      }
    },
    stylus: {
      compile: {
        options: {
          banner: '<%= banner %>',
          define: {
            import_tree: require('stylus-import-tree')
          }
        },
        files: {
          'public/css/styles.css': 'css/styles.styl'
        }
      }
    },
    nodemon: {
      dev: {
        options:{
          file: 'server.js',
          args: [],
          ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
          watchedFolders: ['config', 'app', 'css'],
          debug: true,
          delayTime: 1,
          env: {
            PORT: 3000
          },
          cwd: __dirname
        }
      }
    },
    karma: {
      e2e: {
        configFile: './test/karma-e2e.conf.js',
        autoWatch: false,
        singleRun: true
      }
    },
    watch: {
      browserify:{
        files: ['public/js/**/*.js'],
        tasks: ['browserify']
      },
      css: {
        files: ['css/**/*.styl'],
        tasks: ['stylus']
      }
    },
    concurrent: {
      tasks: ['browserify', 'stylus', 'nodemon', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('test', ['karma:e2e']);
  grunt.registerTask('default', 'concurrent');
};