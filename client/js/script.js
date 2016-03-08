var myApp = angular.module('myApp', ['ngRoute']);
myApp.config(function($routeProvider){
	$routeProvider
		.when('/', {templateUrl: '../partials/customers.html'})
		.when('/orders', {templateUrl: '../partials/orders.html'})
		.otherwise({redirectTo: '/'})
});

myApp.factory('customersfactory', function($http){
	var factory = {};
	factory.createcustomer = function(info, callback){
		$http.post('/create_customer', info).success(function(output){
			callback(output)
		})
	}

	return factory;
})

myApp.controller('customerscontroller', function($scope, customersfactory){
	$scope.addcustomer = function(){
		customer_data = {name: $scope.newcustomer.name, created_at: new Date()};
		customersfactory.createcustomer(customer_data, function(data){
			console.log('success');
		});
	}
})