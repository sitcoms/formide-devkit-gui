var SettingsController = function($scope, $rootScope) {
	
	if(window.localStorage.sdk_settings) {
		$scope.settings = JSON.parse(window.localStorage.sdk_settings);
	}
	else {
		$scope.settings = {};
		$scope.settings.theme = 'dark';
	}
	
	document.html.className = $scope.settings.theme;
	
	$scope.themes = [
		{ name: "Dark Theme", id: "dark" }, 
		{ name: "Light Theme", id: "light" }
	];
	
	$http.get('./package.json').success(function(data) {
        $scope.settings.package = data;
    });

	$scope.$watch('settings', function(newVal, oldVal){
	    window.localStorage.sdk_settings = JSON.stringify($scope.settings);
		document.html.className = $scope.settings.theme;
	    // hook.call('onSettingsChange', $scope.settings);
	}, true);
};

SettingsController.$inject = ['$scope', '$rootScope'];

app.controller("SettingsController", SettingsController);