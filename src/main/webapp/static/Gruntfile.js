module.exports = function(grunt) {

    grunt.initConfig({
    	
        pkg: grunt.file.readJSON('package.json'),
        
        karma: {
            unit: {
                options: {
                    files: ['test/**/*.js'],
                    frameworks: ['jasmine'],
                    singleRun: true,
                    browsers: ['PhantomJS']
                }
            }
        },
        
        gruntMavenProperties: grunt.file.readJSON('grunt-maven.json'),
        
        mavenPrepare: {
            options: {
                resources: ['**']
            },
            dev: {}
        },
        
        /*
         * If wtp integration is required, due to the packagingExcludes the final war does not
         * contain the code from dist.
         */
        mavenDist: {
            options: {
                warName: 'ROOT',
                deliverables: ["<%= pkg.name %>*.js", "*.js", "!js/test/**"]
            },
            dev: {}
        },
        
        /*
         
        If wtp integration is required, it's necesary to copy bower_components and test. 
         
		copy : {
			main : {
				files : [ {
					src : [ "dist/test/**", "dist/bower_components/**" ],
					dest : 'path to server'
				} ]
			}
		},
		
		*/
        
        watch: {
            files: ["<%= gruntMavenProperties.filesToWatch %>"],
            tasks: ['default']
        }
        
    });

    grunt.loadNpmTasks('grunt-maven');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['mavenPrepare', 'karma', 'mavenDist', /*copy:main*/]);

};
