module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        path: {
            publicDir: 'public',
            buildDir: 'build_new',
            releaseDir: 'release'
        },
        watch: {
            jade: {
                files: ['views/**'],
                option: {
                    livereload: true
                }
            },
            js: {
                files: ['public/js/**', 'models/**/*.js','schemas/**/*.js'],
                //tasks: ['jshint'],
                options: {
                    livereload: true
                }
            }
        },
        clean: {
            options: {
                force: true
            },
            build: ['<%= path.buildDir%>'],
            release: ['<%= path.releaseDir%>']
        },
        uglify: {
            mobile: {
                files: [{
                    expand: true,
                    cwd: '<%= path.publicDir%>/js/',
                    src: ['**/*.js'],
                    dest: '<%= path.releaseDir %>/js/'
                }]
            }
        },
        cssmin: {
            mobile: {
                files: [{
                    expand: true,
                    cwd: '<%= path.publicDir%>/css',
                    src: ['**/*.css'],
                    dest: '<%= path.releaseDir %>/css/'
                }]
            }
        },
        nodemon: {
            dev: {
                options: {
                    file: 'app.js',
                    args: [],
                    ignoredFiles: ['ziliao.md', 'node_modules/**', '.DS_Store'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['./'],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },

        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            } 
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    //grunt.option('force', true);
    grunt.registerTask('watch', ['concurrent']);
    grunt.registerTask('default', ['clean', 'uglify', 'cssmin']);
}