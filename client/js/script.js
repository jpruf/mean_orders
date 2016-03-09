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
	factory.get_all = function(callback){
		$http.get('/get_customers').success(function(output){
			callback(output)
		})
	}
	factory.removecustomer = function(info, callback){
		$http.post('/remove_customer', info).success(function(output){
			callback(output);
		})
	}
	return factory;
})

myApp.factory('ordersfactory', function($http){
	var factory = {};

	factory.get_products = function(callback){
		var products = [
			{product: 'AF1'},
			{product: 'CS2'}
			]
		callback(products);
	}
	factory.get_quantity = function(callback){
		var quantity = [];
		for (i=1; i<101; i++){
			quantity.push(i);
		}
		callback(quantity);
	}

	factory.addorder = function(info, callback){
		$http.post('/create_order', info).success(function(data){
			callback(data);
		})
	}

	factory.get_orders = function(callback){
		$http.get('/get_orders').success(function(data){
			callback(data);
		})
	}
			return factory;
})

myApp.controller('customerscontroller', function($scope, customersfactory){
	$scope.addcustomer = function(){
		customer_data = {name: $scope.newcustomer.name, created_at: new Date()};
		customersfactory.createcustomer(customer_data, function(data){
			$scope.customers = data;
		});
	}
	$scope.deletecustomer = function(customer){
		customersfactory.removecustomer(customer, function(data){
			$scope.customers = data;

		})
	}
	customersfactory.get_all(function(data){
		$scope.customers = data;
	})
})

myApp.controller('orderscontroller', function($scope, customersfactory, ordersfactory){
	customersfactory.get_all(function(data){
		$scope.customers = data;
	});

	ordersfactory.get_products(function(data){
		$scope.products = data;
	})

	ordersfactory.get_quantity(function(data){
		$scope.quantity = data;
	})

	ordersfactory.get_orders(function(data){
		$scope.orders = data;
	})

	$scope.addorder = function(){
		var order_data = {
			customer_name: $scope.new_order.customer_name,
			product: $scope.new_order.product,
			quantity: $scope.new_order.quantity,
			created_at: new Date()
		}
		ordersfactory.addorder(order_data, function(data){
			$scope.orders = data;
		})
	}
})