// set theme options
try {
	document.getElementsByTagName('wrap')[0].className = JSON.parse(window.localStorage.sdk_settings)['theme'];
}
catch(e) {
	document.getElementsByTagName('wrap')[0].className = 'dark';
}