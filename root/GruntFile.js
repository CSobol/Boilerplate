module.exports = function(grunt){
  //grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-sync');


  grunt.initConfig({
    env: grunt.file.readJSON('config.json'),
    /*uglify: {
     my_target: {
     files: {
     '_/js/script.js': ['src/main/webapp/js/*.js']
     } //files
     } //my_target
     }, //uglify*/
    compass: {
        dev: {
            cssDir: '<%= env.path %>/css',
            sassDir: '<%= env.path %>/sass',
            javascriptsDir: '<%= env.path %>/js',
            outputStyle: ':expanded',
            relativeAssets: true
        }, //dev
        options:{
          raw: 'require "bootstrap-sass"\nSass::Script::Number.precision = 10\n'
        } //options
    }, //compass
    browserSync: {
        bsFiles: {
            src: [
                '<%= env.build %>/css/styles.css',
                '<%= env.build %>/js/*.*',
                '<%= env.build %>/images/*.*'
            ]
        },
        options: {
            watchTask: true,
            proxy: 'localhost:9080',
            ghostMode: false,
            startPath: '/cs/<%= env.projectName %>/'
        }
    }, // browserSync
    watch: {
        //options: { livereload: true },
        /*scripts: {
         files: ['src/main/webapp/js/*.js'],
         tasks: ['uglify']
         },//scripts*/
        sass: {
            files: ['<%= env.path %>/sass/*.scss', '<%= env.path %>/sass/**/*.scss'],
            tasks: ['compass:dev']
        }, //sass
        static: {
            files: [
                '<%= env.path %>/css/styles.css',
                '<%= env.path %>/js/*.js',
                '<%= env.path %>/js/**/*.js',
                '<%= env.path %>/images/**'
            ],
            tasks: ['sync']
        } //static
    }, //watch
    sync: {
        copy_updated_resources_to_autodeploy: {
            files: [
                {
                    cwd: '<%= env.path %>',
                    src: [
                        'css/styles.css',
                        'js/*.js',
                        'images/**',
                        '*.js'
                    ],
                    dest: '<%= env.build %>'
                }
            ]
        }
    } // sync
}); //initConfig
grunt.registerTask('default', ['compass:dev', 'sync', 'browserSync', 'watch']);
} //exports
