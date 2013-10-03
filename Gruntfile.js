module.exports = function(grunt){

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      dist: {
        files: {
          'public/build/bundle.js': ['public/js/**/*.js']
        }
      }
    },
    stylus: {
      files: {
        'public/css/styles.css': 'public/css/styles.styl'
      }
    },
    nodemon: {
      dev: {
        options:{
          file: 'server.js',
          args: [],
          ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
          watchedFolders: ['app', 'config'],
          debug: true,
          delayTime: 1,
          env: {
            PORT: 3000
          },
          cwd: __dirname
        }
      }
    },
    watch: {
      browserify:{
        files: ['public/js/**/*.js'],
        tasks: ['browserify']
      },
      stylus: {
        files: ['public/css/styles.styl'],
        tasks: ['stylus']
      }
    },
    concurrent: {
      tasks: ['nodemon', 'watch'],
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
  grunt.registerTask('default', 'concurrent');
};