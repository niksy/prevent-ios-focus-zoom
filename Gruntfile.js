module.exports = function ( grunt ) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		meta: {
			banner: '/*! <%= pkg.name %> <%= pkg.version %> - <%= pkg.description %> | Author: <%= pkg.author %>, <%= grunt.template.today("yyyy") %> | Contributors: <%= pkg.contributors[0] %> | License: <%= pkg.license %> */\n'
		},

		concat: {
			dist: {
				options: {
					stripBanners: true,
					banner: '<%= meta.banner %>'
				},
				files: {
					'dist/prevent-ios-focus-zoom.js': ['src/prevent-ios-focus-zoom.js']
				}
			}
		},

		uglify: {
			dist: {
				options: {
					banner: '<%= meta.banner %>'
				},
				files: {
					'dist/prevent-ios-focus-zoom.min.js': ['src/prevent-ios-focus-zoom.js']
				}
			}
		},

		bump: {
			options: {
				files: ['package.json', 'bower.json'],
				updateConfigs: ['pkg'],
				commit: true,
				commitMessage: 'Release %VERSION%',
				commitFiles: ['-a'],
				createTag: true,
				tagName: '%VERSION%',
				tagMessage: '',
				push: false
			}
		},

		jscs: {
			main: {
				options: {
					config: '.jscsrc'
				},
				files: {
					src: [
						'src/**/*.js'
					]
				}
			}
		},

		jshint: {
			main: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: [
					'src/**/*.js'
				]
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-jscs');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-bump');

	grunt.registerTask('stylecheck', ['jshint:main', 'jscs:main']);
	grunt.registerTask('default', ['stylecheck', 'concat', 'uglify']);
	grunt.registerTask('releasePatch', ['bump-only:patch', 'default', 'bump-commit']);
	grunt.registerTask('releaseMinor', ['bump-only:minor', 'default', 'bump-commit']);
	grunt.registerTask('releaseMajor', ['bump-only:major', 'default', 'bump-commit']);

};
