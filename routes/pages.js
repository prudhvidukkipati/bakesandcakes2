var express = require('express');
var router = express.Router();

//routes

router.get('/', function(req, res) {
 res.render('index');
});

router.get('/bakery', function(req, res) {
 res.render('shop');
});

router.get('/cart', function(req, res) {
 res.render('cart');
});

router.get('/checkout', function(req, res) {
 res.render('checkout');
});


// export
module.exports = router;
