var SettingsController = function($scope, $rootScope, $http) {
	
	$scope.themes = [
		{ name: "Dark Theme", id: "dark" }, 
		{ name: "Light Theme", id: "light" }
	];
	
	if(window.localStorage.sdk_settings) {
		$scope.settings = JSON.parse(window.localStorage.sdk_settings);
	}
	else {
		$scope.settings = {};
		$scope.settings.theme = 'dark';
	}
	
	$scope.openHomepage = function() {
		gui.Shell.openExternal($scope.settings.package.homepage);
	}
	
	$scope.openIssues = function() {
		gui.Shell.openExternal($scope.settings.package.bugs.url);
	}
	
	$http.get('./package.json').success(function(data) {
        $scope.settings.package = data;
    });
    
    $scope.applyTheme = function() {
	    document.getElementsByTagName('wrap')[0].className = $scope.settings.theme;
    }

	$scope.$watch('settings', function(newVal, oldVal){
	    window.localStorage.sdk_settings = JSON.stringify($scope.settings);
		$scope.applyTheme();
	    // hook.call('onSettingsChange', $scope.settings);
	}, true);
	
	$scope.applyTheme();
};

SettingsController.$inject = ['$scope', '$rootScope', '$http'];

app.controller("SettingsController", SettingsController);