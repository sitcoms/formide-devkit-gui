var fs				= require('fs');
var path			= require('path');
var child_process	= require('child_process');

module.exports = function(grunt) {
	window = {};

	require("./app/environment.js");

	var json = {
		/*
		 *	Clean folders before copying.
		 */
		clean: {
		  assets: ["./public/assets/javascripts/*"],
		  config: ["./public/config.js"]
		},

		concat: {
			options: {
				separator: ';\n'
			},
			files: {
				src: [

					'./core/loadModules.js',

					/*
					 *	Include configs
					 */
					'./app/environment.js',
					'./app/config.js',
					'./app/debug.js',

					/*
					 *	Angular and its main dependencies.
					 */
					'./bower_components/angular/angular.js',
					'./bower_components/angular-resource/angular-resource.js',
					'./bower_components/angular-animate/angular-animate.js',
					'./bower_components/angular-sanitize/angular-sanitize.js',

					/*
					 *	Angular vendor dependencies.
					 */
					'./bower_components/angular-hotkeys/build/hotkeys.js',
					'./bower_components/ng-tags-input/ng-tags-input.js',
					'./bower_components/ngDialog/js/ngDialog.js',
					'./bower_components/angular-local-storage/dist/angular-local-storage.js',
					'./bower_components/angular-drag-and-drop-lists/angular-drag-and-drop-lists.min.js',
					'./bower_components/angular-ui-codemirror/ui-codemirror.min.js',

					/*
					 *	Load modules.
					 */
					'./core/modules/angular.js',
					'./core/modules/vendor.js',
					'./core/modules/filters.js',
					'./core/modules/services.js',
					'./core/modules/core.js',
					'./core/modules/modules.js',

					/*
					 *	Include source files
					 */
					'./core/dependencies/**/*.js',
					'./core/services/**/*.js',

					/*
					 *	Include core
					 */
					'./core/app.js',
					'./core/controllers/**/*.js',
					'./core/directives/**/*.js',
					'./core/filters/**/*.js',

					/*
					 *	Include app specific files
					 */
					'./app/**/*.js'
				],
				dest: './public/assets/javascripts/application.js'
			}
		},

		/*
		 * Uglify Javascript files
		 */
		uglify: {
			options: {
				mangle: true  // Use if you want the names of your functions and variables unchanged
			},
			main: {
				files: {
					'./public/assets/javascripts/application.js': './public/assets/javascripts/application.js'
				}
			}
		},

		/*
		 * Watch for changes in directories
		 */
		watch: {
			javascripts: {
				files: ['./public/tmp/**/*.js', './core/**/*.js', './app_example/**/*.js', './bower_components/**/*.js'],
				tasks: ['js:' + ((window.ENV.type == 'development') ? 'dev' : 'dist')]
			}
		},

		bump: {
			options: {
				files: ['package.json', 'bower.json'],
				updateConfigs: [],
				commit: true,
				commitMessage: 'Release %VERSION%',
				commitFiles: ['package.json', 'bower.json'],
				createTag: true,
				tagName: '%VERSION%',
				tagMessage: 'Version %VERSION%',
				push: true,
				pushTo: 'origin',
				gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
				globalReplace: false,
				prereleaseName: false,
				regExp: false
			}
		}
	}

	grunt.initConfig();
	grunt.config.merge(json);

	/*
	 * Load NPM Plugins
	 */
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-bump');

	/*
	 * Register Tasks
	 */
	grunt.registerTask('build:config', ['clean:config']);
	grunt.registerTask('js:dist', ['build:config', 'concat:', 'uglify']);
	grunt.registerTask('js:dev', ['build:config', 'concat']);
	
  	grunt.registerTask('default', ['clean:assets', 'js:' + ((window.ENV.type == 'development') ? 'dev' : 'dist')]);
  	
  	/*
	 * Publish new version
	 */
  	grunt.registerTask('compile', compile);
  	grunt.registerTask('pack', pack);
  	grunt.registerTask('archive', archive);
  	
  	grunt.registerTask('publish', ['build:config', 'concat:', 'uglify', 'default', 'compile', 'pack', 'archive']);
};

function compile() {
	
	// get activedependencies
	var manifest = JSON.parse( fs.readFileSync('package.json').toString() );
	
	// change to current dir
	process.chdir( __dirname );
	
	// reset /build folder
	child_process.execSync('rm -rf ./build/');
	child_process.execSync('mkdir ./build/');
	
	// copy items to build folder (needed for windows dist)
	child_process.execSync('cp -r ./package.json ./build/package.json');
	child_process.execSync('rsync -av --exclude=".*" ./core/ ./build/core/');
	child_process.execSync('rsync -av --exclude=".*" ./app/ ./build/app/');
	child_process.execSync('rsync -av --exclude=".*" ./public/ ./build/public/');
	
	// copy used node_modules
	child_process.execSync('mkdir ./build/node_modules/');
	for( var dependency in manifest.dependencies ) {
		child_process.execSync('cp -r ./node_modules/' + dependency + '/ ./build/node_modules/' + dependency + '/' );
	}
}

function pack() {
	
	// change to current dir
	process.chdir( __dirname );
	
	// reset /dist folder
	child_process.execSync('rm -rf ./dist/');
	child_process.execSync('mkdir ./dist/');
	
	// pack win32
	child_process.execSync('mkdir ./dist/win32/');
	child_process.execSync('cp -r ./bin/win32/* ./dist/win32/');
	child_process.execSync('cp -r ./build/ ./dist/win32/');
	
	// pack osx64
	child_process.execSync('mkdir ./dist/osx64/');
	child_process.execSync('cp -r ./bin/osx64/nwjs.app ./dist/osx64/Formide\\ Development\\ Kit.app');
	child_process.execSync('mkdir ./dist/osx64/Formide\\ Development\\ Kit.app/Contents/Resources/app.nw/');
	child_process.execSync('cp -r ./build/ ./dist/osx64/Formide\\ Development\\ Kit.app/Contents/Resources/app.nw/');
	child_process.execSync('cp ./app/assets/icons/devkit.icns ./dist/osx64/Formide\\ Development\\ Kit.app/Contents/Resources/nw.icns');
}

function archive() {
	
	// change to current dir
	process.chdir( __dirname );
	
	// reset /archive folder
	child_process.execSync('rm -rf ./archive/');
	child_process.execSync('mkdir ./archive/');
	
	// win32
	child_process.execSync('zip -r ./archive/formide-devkit-win32-latest.zip ./dist/win32/');
	
	// osx64
	child_process.execSync('hdiutil create -format UDZO -volname "Formide Development Kit" -srcfolder ./dist/osx64/ ./archive/formide-devkit-osx64-latest.dmg');
}