var customers = require('../controller/customers.js');
var orders = require('../controller/orders.js');

module.exports = function(app){
	app.post('/create_customer', function (req,res){
		customers.add(req,res);
	})
	app.get('/get_customers', function(req,res){
		customers.show(req,res);
	})
	app.post('/remove_customer', function(req,res){
		customers.remove(req,res);
	})
	app.post('/create_order', function(req,res){
		orders.add(req,res);
	})
	app.get('/get_orders', function(req,res){
		orders.show(req,res);
	})
}