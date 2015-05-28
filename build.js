var fs				= require('fs');
var path			= require('path');
var child_process	= require('child_process');

process.chdir( __dirname );

// get dependencies
var manifest = JSON.parse( fs.readFileSync('package.json').toString() );

var files = [
	'./core/**/**',
	'./app/**/**',
	'./package.json',
	'./public/**/**'
];

for( var dependency in manifest.dependencies ) {
	files.push( './node_modules/' + dependency + '/**/**' );
}

//child_process.execSync('sudo ulimit -n 4096');
//child_process.execSync('rm ./core');
child_process.execSync('rm -rf ./build');
//child_process.execSync('cp -r ../devkit-core/core/ core');

var NwBuilder = require('node-webkit-builder');
var nw = new NwBuilder({
	
	files: files,
	
	macIcns: './app/assets/icons/osx.icns',
//	winIco: './app/assets/icons/win.icns',
	
    platforms: ['osx64', 'win32', 'win64'],
    
    version: '0.12.0'
    
});

// log all the things!
nw.on('log',  console.log);

// build!
nw
	.build()
	.then(function () {
	   console.log('all done!');
	   done();
	})
	.catch(function (error) {
	    console.error(error);
	    done();
	});
	
function done() {
	//child_process.execSync('rm -rf core');	
	//child_process.execSync('ln -s ../devkit-core core');	
}