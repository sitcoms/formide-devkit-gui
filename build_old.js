// modules
var execSync = require('child_process').execSync;
var NwBuilder = require('node-webkit-builder');
var dependencies = require('./package.json').dependencies;

var files = [
	"./app/**",
    "./public/**",
    "./core/**",
    "./formidesdk.icns",
    "./formidesdk.png",
    "./LICENSE.md",
    "./README.MD",
    "./package.json"
];

for(var dep in dependencies) {
	files.push("./node_modules/" + dep + "/**");
}

build();

// build
function build() {
	var nw = new NwBuilder({
	    files: files,
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
	}).catch(function (error) {
	    console.error(error);
	});
}