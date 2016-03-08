var customers = require('../controller/customers.js');

module.exports = function(app){
	app.post('/create_customer', function (req,res){
		customers.add(req,res);
	})
	app.get('/get_customers', function(req,res){
		customers.show(req,res);
	})
}