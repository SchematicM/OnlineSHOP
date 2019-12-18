var express       = require('express');
var router        = express.Router();
var Product       = require('../models/product');
var Cart          = require('../models/cart');
var Order         = require('../models/order');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user){
    Product.find(function(err, items){
      if(err) {
        console.log(err);
        res.redirect(error);
      }
      else{
        res.render('index', { title: 'Products', products: items, userFirstName: req.user.fullname});
      }
    });
  }
  else{
    res.redirect('users/login');
  }
});

/* GET product page. */
router.get('/product-overview', ensureAuthenticated, function(req, res, next) {
  let id = req.query.id;
  console.log("id is: ", id);
  Product.findOne({ "_id": id }, function(err, items){
    if(err) {
      res.redirect(error);
    } else {
      res.render('productOverview', { title: 'Express', product: items, userFirstName: req.user.fullname});
    }
  });
});



// GET shopping cart
router.get('/add-to-bag/:id', ensureAuthenticated, function(req, res, next){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function(err, product){
      if(err){
        res.redirect('error');
      }
      cart.add(product, product.id);
      req.session.cart = cart;
      console.log(req.session.cart);
      res.redirect('/');
    })
});

router.get('/decrease/:id', function(req,res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.decreaseQty(productId);
  req.session.cart = cart;
  res.redirect('/shopping-bag');

});
router.get('/increase/:id', function(req,res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.increaseQty(productId);
  req.session.cart = cart;
  res.redirect('/shopping-bag');

});

router.get('/shopping-bag', ensureAuthenticated, function(req, res, next){
  if(!req.session.cart){
    res.render('shoppingBag', {items: null, containerWrapper: 'container', userFirstName: req.user.fullname});
  }
  else{
    var cart = new Cart(req.session.cart);
    res.render('shoppingBag', {items: cart.generateArray(), totalPrice: cart.totalPrice, containerWrapper: 'container', userFirstName: req.user.fullname})
  }
});

router.get('/order-history', ensureAuthenticated, function(req, res, next){
  console.log("username: ", req.user.username )
  Order.find({"username": req.user.username }, function(err, order){
    if(err) {
      console.log(err);
      res.redirect(error);
    }
    else{
      res.render('orderHistory', { title: 'Products', orders: order, userFirstName: req.user.fullname});
    }
  });
});




// POST search page
router.post('/search', ensureAuthenticated, function(req, res, next){
  let keyword = req.body.seaarchField;
  let searchParams = keyword;
  console.log(keyword);
  keyword = keyword.split(",");
  console.log(keyword);
  for (i = 0; i < keyword.length; i++){
    keyword[i] = new RegExp(escapeRegex(keyword[i]), 'gi');
  }
  Product.find({ "title": {$in: keyword} }, function(err, item){
    if(err) {
      console.log(err);
    } else {
      res.render('search', { products: item, title: 'Search Page', username: req.user.fullname, searchKeywords: searchParams});
    }
  });
});

// POST filters
router.post('/categories', ensureAuthenticated, function(req, res, next){
  let aman   = req.body.cman;
  let awoman  = req.body.cwoman;
  if(aman === "on" && awoman == undefined){
    Product.find({ "category": {$eq:"man"} }, function(err, items){
      if(err) {
        console.log(err);
      } else {
        res.render('index', { title: 'Products', products: items, userFirstName: req.user.fullname});
      }
    });
  }
  else if(aman == undefined && awoman === "on"){
    Product.find({ "category": {$eq:"woman"} }, function(err, items){
      if(err) {
        console.log(err);
      } else {
        res.render('index', { title: 'Products', products: items, userFirstName: req.user.fullname});
      }
    });
  }
  else{
    res.redirect('/')
  }  
});


router.post('/filterPrices', ensureAuthenticated, function(req, res, next){
  let low_f  = req.body.low_fifty;
  let low_h = req.body.low_hundred;
  let low_h_f = req.body.low_hundred_fifty;
  let low_t_h = req.body.low_two_hundred;
  let low_t_h_f = req.body.low_two_hundred_fifty;
  let low_th_h = req.body.low_three_hundred;
  let high_t_h  = req.body.high_three_hundred



  if(low_f === "on" && low_h == undefined && low_h_f == undefined && low_t_h == undefined && low_t_h_f == undefined && low_th_h == undefined && high_t_h == undefined){
    Product.find({ "price": {$lt:50} }, function(err, items){
      if(err) {
        console.log(err);
      } else {
        res.render('index', { title: 'Products', products: items, userFirstName: req.user.fullname});
      }
    });
  }
  else if(low_f == undefined && low_h === "on" && low_h_f == undefined && low_t_h == undefined && low_t_h_f == undefined && low_th_h == undefined && high_t_h == undefined){
    Product.find({ $and: [{"price": {$lt:100}}, {"price": {$gte:50}}] }, function(err, items){
      if(err) {
        console.log(err);
      } else {
        res.render('index', { title: 'Products', products: items, userFirstName: req.user.fullname});
      }
    });
  }
  else if(low_f == undefined && low_h == undefined && low_h_f === "on" && low_t_h == undefined && low_t_h_f == undefined && low_th_h == undefined && high_t_h == undefined){
    Product.find({ $and: [{"price": {$lt:150}}, {"price": {$gte:100}}] }, function(err, items){
      if(err) {
        console.log(err);
      } else {
        res.render('index', { title: 'Products', products: items, userFirstName: req.user.fullname});
      }
    });
  }
  else if(low_f == undefined && low_h == undefined && low_h_f == undefined && low_t_h === "on" && low_t_h_f == undefined && low_th_h == undefined && high_t_h == undefined){
    Product.find({ $and: [{"price": {$lt:200}}, {"price": {$gte:150}}] }, function(err, items){
      if(err) {
        console.log(err);
      } else {
        res.render('index', { title: 'Products', products: items, userFirstName: req.user.fullname});
      }
    });
  }
  else if(low_f == undefined && low_h == undefined && low_h_f == undefined && low_t_h == undefined && low_t_h_f === "on" && low_th_h == undefined  && high_t_h == undefined){
    Product.find({ $and: [{"price": {$lt:250}}, {"price": {$gte:200}}] }, function(err, items){
      if(err) {
        console.log(err);
      } else {
        res.render('index', { title: 'Products', products: items, userFirstName: req.user.fullname});
      }
    });
  }
  else if(low_f == undefined && low_h == undefined && low_h_f == undefined && low_t_h == undefined && low_t_h_f == undefined && low_th_h ==="on" && high_t_h == undefined){
    Product.find({ $and: [{"price": {$lt:300}}, {"price": {$gte:250}}] }, function(err, items){
      if(err) {
        console.log(err);
      } else {
        res.render('index', { title: 'Products', products: items, userFirstName: req.user.fullname});
      }
    });
  }
  else if(low_f == undefined && low_h == undefined && low_h_f == undefined && low_t_h == undefined && low_t_h_f == undefined && low_th_h == undefined && high_t_h ==="on"){
    Product.find({ "price": {$gte:300} }, function(err, items){
      if(err) {
        console.log(err);
      } else {
        res.render('index', { title: 'Products', products: items, userFirstName: req.user.fullname});
      }
    });
  }
  else{
    res.redirect('/')
  }
  
});


router.post('/filterTitles', ensureAuthenticated, function(req, res, next){
  let atitle   = req.body.adidas;
  let btitle  = req.body.nike;

  let keyword = "adidas";
  let searchParams = keyword;
  console.log(keyword);
  keyword = keyword.split(",");
  console.log(keyword);
  for (i = 0; i < keyword.length; i++){
    keyword[i] = new RegExp(escapeRegex(keyword[i]), 'gi');
  }

  let keyword1 = "nike";
  let searchParams1 = keyword1;
  console.log(keyword1);
  keyword1 = keyword1.split(",");
  console.log(keyword1);
  for (i = 0; i < keyword1.length; i++){
    keyword1[i] = new RegExp(escapeRegex(keyword1[i]), 'gi');
  }


  if(atitle === "on" && btitle == undefined){
    Product.find({ "title": {$in:keyword} }, function(err, items){
      if(err) {
        console.log(err);
      } else {
        res.render('index', { title: 'Products', products: items, userFirstName: req.user.fullname, searchKeywords: searchParams});
      }
    });
  }
  else if(atitle == undefined && btitle === "on"){
    Product.find({ "title": {$in:keyword1} }, function(err, items){
      if(err) {
        console.log(err);
      } else {
        res.render('index', { title: 'Products', products: items, userFirstName: req.user.fullname, searchKeywords: searchParams});
      }
    });
  }
  else{
    res.redirect('/')
  }
  
});

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  else{
    req.flash('error_msg', 'You are not logged in');
    res.redirect('/');
  }
};
// GET insert page
router.get('/insert', function(req,res){
  res.render('insertProduct', {title: 'Insert', userFirstName: req.user.fullname})
});

// POST insert new product
router.post('/insert', ensureAuthenticated, function(req, res, next){
  var product = new Product({
    imagePath   : req.body.imagePath,
    title       : req.body.title,
    description : req.body.description,
    price       : req.body.price,
    category    : req.body.category
  });
  product.save();
  req.flash('success_msg', 'A new product successfully added to database');
  res.redirect('/');
});

// GET delete page
router.get('/delete/:id', ensureAuthenticated, function(req, res, next){
  let aProductId = req.params.id;
  Product.deleteOne({ "_id": aProductId }, function(err, item){
    if(err) {
      console.log(err);
    } else {
      req.flash('success_msg', 'A product successfully deleted from database');
      res.redirect('/');
    }
  });
});
// GET delete page
router.get('/delete/', ensureAuthenticated, function(req, res, next){
  req.flash('error_msg', 'You can delete the product inside the product overview');
  res.redirect('/');
});

// GET update page
router.get('/update/:id', ensureAuthenticated, function(req, res, next){
  let aProductId = req.params.id;
  Product.findOne({ "_id": aProductId }, function(err, item){
    if(err) {
      console.log(err);
    } else {
      res.render('updateProduct', {title: 'Update product',userFirstName: req.user.fullname, product: item});
      
    }
  });
});
// GET update page
router.get('/update/', ensureAuthenticated, function(req, res, next){
  req.flash('error_msg', 'You can update the product inside the product overview');
  res.redirect('/');
});

// POST update page
router.post('/update', ensureAuthenticated, function(req, res, next){
  let aProductId = req.body.id;
  Product.findOneAndUpdate({"_id": aProductId}, 
  { $set: {
    "imagePath"   : req.body.imagePath,
    "title"       : req.body.title,
    "description" : req.body.description,
    "price"       : req.body.price,
    "category"    : req.body.category
    }
  },
  { new: true }, function(err, result){
    if(err) {
      console.log(err);
    } else {
      req.flash('success_msg', 'Product updated!');
      res.redirect('/');
    }
  });
  
});

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;
