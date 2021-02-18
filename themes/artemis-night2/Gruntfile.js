//npm i grunt-sass load-grunt-tasks -D
//npm uninstall grunt-contrib-sass -D
module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        sass: {
            options: {
                sourceMap: false,
                outputStyle: 'compressed',
            },
            dist: {
                files: {
                    'source/css/theme.css': 'source/scss/theme.scss'
                }
            }
        },
        watch: {
            css: {
                files: 'source/scss/**/*.scss',
                tasks: ['sass'],
            }
        },
    });

    grunt.registerTask('default', ['sass']);
    grunt.registerTask('dev', ['watch']);
}