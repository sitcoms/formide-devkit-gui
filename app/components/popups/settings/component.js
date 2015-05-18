document.getElementsByTagName('html')[0].className = JSON.parse(window.localStorage.sdk_settings)['theme'];

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
	
	$http.get('./package.json').success(function(data) {
        $scope.settings.package = data;
    });
    
    $scope.applyTheme = function() {
	    document.getElementsByTagName('html')[0].className = $scope.settings.theme;
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