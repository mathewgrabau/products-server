/* Copyright (c) Adnan Jaswal, 2015. See the file license.txt for copying permission. */
var restify = require('restify');

var PATH = '/products';


var products = [ 
                 { id: "1000", name: "Chess Periodicals", description: "A book on chess periodicals", price: 100},
                 { id: "2000", name: "Strategy and Tactics", description: "A book on chess strategy and tactics", price: 120},
                 { id: "3000", name: "Computer Chess", description: "Computer chess application", price: 50},
                 { id: "4000", name: "Medieval Chess", description: "Medieval chess set", price: 400},
                 { id: "5000", name: "End Games", description: "A book on end strategies", price: 100},
                 { id: "6000", name: "Games of Individual Players", description: "A record of games by individual players", price: 200}
                ];

var currentIdCount = products.length;

function getProducts(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin','*');
	console.log("GET[" + PATH + "] " + JSON.stringify(products));
	res.send(200, products);
	next();
};

function addProduct(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin','*');
	console.log("POST[" + PATH + "] " + JSON.stringify(req.body));
	
	currentIdCount = currentIdCount + 1;
	var productId = currentIdCount * 1000;
	req.body.id = productId.toString();
	products.push(req.body);
	res.send(200, productId);
	next();
};

function updateProduct(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin','*');
	console.log("PUT[" + PATH + "] " + JSON.stringify(req.body));
	
	products.forEach(function(product, index) {
		if(req.body.id == product.id) {
			product.name = req.body.name;
			product.description = req.body.description;
			product.price = req.body.price;
		}
	});
	
	res.send(200);
	next();
};

function deleteProduct(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin','*');
	console.log("DELETE[" + PATH + "/" + req.params.id + "]");

	products.forEach(function(product, index) {
		if(req.params.id == product.id) {
			products.splice(index, 1);
		}
	});
	res.send(200, req.params.id);
	next();
};


var server = restify.createServer();
server.use(restify.bodyParser({ mapParams: true }));

server.get(PATH, getProducts);
server.put(PATH, updateProduct);
server.post(PATH, addProduct);
server.del(PATH +'/:id', deleteProduct);

server.listen(8080, '127.0.0.1',function() {
	console.log('%s listening at %s', server.name, server.url);
});