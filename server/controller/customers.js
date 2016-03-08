var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');

module.exports = (function(){
	return {
		add: function (req,res){
			var new_customer = new Customer(req.body);
			new_customer.save(function(err, data){
				if (err){
					console.log(err);
					console.log('\nError saving new customer');
				}
				else {
					res.json(data);
				}
			})
		},
		show: function(req,res){
			Customer.find({}, function(err, customers){
				if(err){
					console.log(err);
					console.log('\nError getting customers');
				}
				else {
					res.json(customers);
				}
			})
		}
	}
})();