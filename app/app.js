/*
 * Use this area to load your modules. Some module have been pre-loaded for you like codemirror, some widgets and custom icons
 */
 
//CORE
// editors
loadModule('codemirror', 	'editor',	'./core/components/editors/devkit-editor-codemirror/', ['ui.codemirror']);
loadModule('image', 		'editor',	'./core/components/editors/devkit-editor-image/');

// widgets
loadModule('svg', 			'widget',	'./core/components/widgets/devkit-widget-svg/');
loadModule('markdown', 		'widget',	'./core/components/widgets/devkit-widget-markdown/');

// headers
// nope..

// themes
// nope..

// APP
// editors
loadModule('manifest', 		'editor',	'./app/components/editors/devkit-printr-editor-manifest/');
loadModule('viewer', 		'editor',	'./app/components/editors/devkit-printr-editor-viewer/', ['printr.viewer']);

// headers
loadModule('auth', 			'header',	'./app/components/headers/devkit-printr-header-auth/');
loadModule('upload', 		'header',	'./app/components/headers/devkit-printr-header-upload/');

// popups
loadModule('login',			'popup',	'./app/components/popups/login/');
loadModule('settings',		'popup',	'./app/components/popups/settings/');

// widgets
// nope..

// themes
loadModule('theme_dark',	'theme',	'./app/components/themes/theme_dark/');
loadModule('theme_light',	'theme',	'./app/components/themes/theme_light/');
loadModule('custom_icons',	'theme',	'./app/components/themes/custom_icons/');
loadModule('font_awesome',	'theme',	'./app/components/themes/font-awesome/');

/*
 * Use this area to define global settings for your app like the file editor config and devtools
 */
app.run(['$rootScope', '$timeout', '$file', '$menu', function($rootScope, $timeout, $file, $menu) {
	
	// devmode
	require('nw.gui').Window.get().showDevTools();
	
	// set editor config
	$file.setConfig([
		{
			ext: ".svg",
			config: {
				widgets: [ 'svg' ]
			}
		},
		{
			ext: ".md",
			config: {
				widgets: [ 'markdown' ]
			}
		},
		{
			base: "app.json",
			config: {
				editor: "manifest"
			}
		},
		{
			ext: ".stl",
			config: {
				editor: "viewer"
			}
		},
		{
			ext: ".jpg",
			config: {
				editor: "image"
			}
		}
		,
		{
			ext: ".jpeg",
			config: {
				editor: "image"
			}
		}
		,
		{
			ext: ".png",
			config: {
				editor: "image"
			}
		}
	]);
	
	$menu.setConfig([
		{
			id: 'file',
			label: 'File',
			submenu: [
				{
					id: 'project-new',
					label: 'New Project...',
					hotkey: 'meta+shift+n'
				},
				{
					id: 'project-open',
					label: 'Open Project...',
					hotkey: 'meta+shift+o'
				},
				{
					id: 'file-new',
					label: 'New File',
					hotkey: 'meta+n',
				},
				{
					type: 'separator'
				},
				{
					id: 'file-close',
					label: 'Close File',
					hotkey: 'meta+w'
				},
				{
					type: 'separator'
				},
				{
					id: 'save',
					label: 'Save',
					hotkey: 'meta+s'
				}
			]
		},
		{
			id: 'run',
			label: 'Run',
			submenu: [
				{
					id: 'preview',
					label: 'Local preview'
				},
				{
					id: 'upload',
					label: 'Publish'
				},
				{
					id: 'manager',
					label: 'View in manager'
				}
			]
		},
		{
			id: 'editor',
			label: 'Editor',
			submenu: [
				{
					id: 'devtools',
					label: 'Show Inspector',
					hotkey: 'meta+shift+i'
				}
			]
		}
	]);
}]);