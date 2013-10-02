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
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-stylus');

};