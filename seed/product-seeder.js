var Product = require('../models/product');


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopping',{ useUnifiedTopology: true });

var products = [
	new Product({
	imagePath:'https://static8.depositphotos.com/1036149/891/i/450/depositphotos_8911201-stock-photo-funny-germ-3d.jpg',
	title: 'Mikrob',
	description: 'Awesome Mikrob!!!',
	price: 10
	}),
	new Product({
	imagePath:'https://static8.depositphotos.com/1036149/863/i/950/depositphotos_8639500-stock-photo-funny-germ-3d.jpg',
	title: 'Mikrob',
	description: 'Awesome Mikrob!!!',
	price: 20
	}),
	new Product({
	imagePath:'https://static8.depositphotos.com/1036149/891/i/450/depositphotos_8911201-stock-photo-funny-germ-3d.jpg',
	title: 'Mikrob',
	description: 'Awesome Mikrob!!!',
	price: 30
	}),
	new Product({
	imagePath:'https://static8.depositphotos.com/1036149/891/i/450/depositphotos_8911201-stock-photo-funny-germ-3d.jpg',
	title: 'Mikrob',
	description: 'Awesome Mikrob!!!',
	price: 40
	}),
	new Product({
	imagePath:'https://static8.depositphotos.com/1036149/891/i/450/depositphotos_8911201-stock-photo-funny-germ-3d.jpg',
	title: 'Mikrob',
	description: 'Awesome Mikrob!!!',
	price: 50
	}),
];

var done = 0;
for(var i = 0; i < products.length; i++)
{
	//console.log(products[i]);
	products[i].save(function(err, result)
		{
			done++;
			if(done === products.length)
			{
				exit();
			}
		});
}

function exit()
{
	mongoose.disconnect();
}