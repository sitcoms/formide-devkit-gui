var LoginController = function($scope, $rootScope) {
	
	$scope.loginUrl = window.CONFIG.paths.login;
};

LoginController.$inject = ['$scope', '$rootScope'];

app.controller("LoginController", LoginController);