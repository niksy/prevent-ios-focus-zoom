module.exports = function (grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		meta: {
			banner: '<%= pkg.name %> <%= pkg.version %> - <%= pkg.description %> | Author: <%= pkg.author %>, <%= grunt.template.today("yyyy") %> | Contributors: <%= pkg.contributors[0] %> | License: <%= pkg.license %>',
			defaultBanner: '/* <%= meta.banner %> */\n',
			unstrippedBanner: '/*! <%= meta.banner %> */\n'
		},

		concat: {
			options: {
				stripBanners: true,
				banner: '<%= meta.defaultBanner %>'
			},
			dist: {
				src: ['src/prevent-ios-focus-zoom.js'],
				dest: 'dist/prevent-ios-focus-zoom.js'
			}
		},

		uglify: {
			options: {
			banner: '<%= meta.unstrippedBanner %>'
			},
			dist: {
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
				tagMessage: 'Version %VERSION%',
				push: false
			}
		},

		jscs: {
			main: {
				options: {
					config: '.jscs'
				},
				files: {
					src: [
						'src/prevent-ios-focus-zoom.js'
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
					'src/prevent-ios-focus-zoom.js'
				]
			}
		}

	});

	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-jscs-checker' );
	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-bump' );

	grunt.registerTask( 'stylecheck', ['jshint:main', 'jscs:main'] );
	grunt.registerTask( 'default', ['stylecheck', 'concat:dist', 'uglify:dist'] );
	grunt.registerTask( 'releasePatch', ['bump-only:patch', 'default', 'bump-commit'] );
	grunt.registerTask( 'releaseMinor', ['bump-only:minor', 'default', 'bump-commit'] );
	grunt.registerTask( 'releaseMajor', ['bump-only:major', 'default', 'bump-commit'] );

};
