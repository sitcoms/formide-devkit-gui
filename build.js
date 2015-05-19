// modules
var execSync = require('child_process').execSync;
var NwBuilder = require('node-webkit-builder');

// flow
try {
	execSync("rm -r node_modules");
}
catch(e) {}
try {
	execSync("npm install --production");
}
catch(e) {}
try {
	build(function() {
		try {
			execSync("npm install");
		}
		catch(e) {}
	});
}
catch(e) {}

// build
function build(cb) {
	var nw = new NwBuilder({
	    files: [
		    "./app/**",
		    "./public/**",
		    "./core/**",
		    "./formidesdk.icns",
		    "./formidesdk.png",
		    "./LICENSE.md",
		    "./README.MD",
		    "./package.json"
	    ],
	    platforms: ['osx32', 'osx64', 'win32', 'win64'],
	    version: "0.12.1",
	    buildType: "versioned",
	    appVersion: "0.1.0",
	    appName: "Formide DevKit",
	    macIcns: "./formidesdk.icns",
	    winIco: ""
	});
	 
	//Log stuff you want 
	nw.on('log',  console.log);
	 
	// Build returns a promise 
	nw.build().then(function () {
	   console.log('all done!');
	   cb();
	}).catch(function (error) {
	    console.error(error);
	});
}