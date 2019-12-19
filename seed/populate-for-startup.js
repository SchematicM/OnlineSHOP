var Product     = require('../models/product');
var User        = require('../models/user');
var mongoose    = require('mongoose');
var fs          = require("fs");

mongoose.connect('mongodb://localhost/shoppingApp');

var products = [
    new Product({
        imagePath   : 'https://sneakercon-prodblue.s3.amazonaws.com/pictures/adidas-yeezy-boost-700-wave-runner-01-B75571.jpg',
        title       : 'Adidas Yeezy Boost 700',
        description : 'Adidas Yeezy Boost 700 Wave Runner',
        category    : 'man',
        price       : 339.99
    }),
    new Product({
        imagePath   : 'https://sneakercon-prodg.s3.amazonaws.com/pictures/nike-dunk-low-x-off-white-university-red-01-CT0856_600.jpg',
        title       : 'Nike Dunk Low',
        description : 'Nike Dunk Low x Off-White University Red',
        category    : 'man',
        price       : 339.99
    }),
    new Product({
        imagePath   : 'https://sneakercon-prodg.s3.amazonaws.com/pictures/adidas-yeezy-boost-350-v-2-yecheil-non-reflective-01-FW5190.jpg',
        title       : 'Adidas Yeezy Boost 350',
        description : 'Adidas Yeezy Boost 350 V2 Yecheil Non-Reflective',
        category    : 'man',
        price       : 179.99
    }),
    new Product({
        imagePath   : 'https://sneakercon-prod.s3.amazonaws.com/pictures/air-jordan-3-jth-bio-beige-01-AV6683_200.jpg',
        title       : 'Nike Air Jordan',
        description : 'Nike Air Jordan 3 JTH Bio Beige',
        category    : 'man',
        price       : 339.99
    }),
    new Product({
        imagePath   : 'https://sneakercon-prodg.s3.amazonaws.com/pictures/nike-air-max-720-wmns-sunset-01-AR9293_500.jpg',
        title       : 'Nike Air Max 720',
        description : 'Nike',
        category    : 'woman',
        price       : 449.99
    }),
    new Product({
        imagePath   : 'https://sneakercon-prod.s3.amazonaws.com/pictures/air-jordan-12-retro-wmns-vachetta-tan-01-AO6068_203.jpg',
        title       : 'Nike Air Jordan 12',
        description : 'Nike Air Jordan 12 Retro WMNS Vachetta Tan',
        category    : 'woman',
        price       : 259.99
    }),
    new Product({
        imagePath   : 'https://sneakercon-prod.s3.amazonaws.com/pictures/nike-air-more-uptempo-obsidian-01-921948_400.jpg',
        title       : 'Nike Air More',
        description : 'Nike Air More Uptempo Obsidian',
        category    : 'man',
        price       : 119.99
    }),
    new Product({
        imagePath   : 'https://sneakercon-prod.s3.amazonaws.com/pictures/air-jordan-31-chicago-01-845037_600.jpg',
        title       : 'Nike Air Jordan 31',
        description : 'Nike Air Jordan 31 Chicago',
        category    : 'man',
        price       : 119.99
    }),
    new Product({
        imagePath   : 'https://sneakercon-prodg.s3.amazonaws.com/pictures/nike-air-force-1-prm-x-clot-game-royal-01-CJ5290_400.jpg',
        title       : 'Nike Air Force 1',
        description : 'Nike  Air Force 1 PRM x Clot Game Royal',
        category    : 'man',
        price       : 179.99
    }),
    new Product({
        imagePath   : 'https://sneakercon-prod.s3.amazonaws.com/pictures/adidas-nmd-r1-wmns-raw-pink-01-S76006.jpg',
        title       : 'Adidas NMD R1',
        description : 'Adidas NMD R1 WMNS Raw Pink',
        category    : 'woman',
        price       : 279.99
    })
];
Product.remove({},function(err){
  if(err){
    console.log("ERROR:Remove Prouduct failed");
    return
  }
  console.log("Old Prouduct data was removed sucessfully")
  for (var i = 0; i < products.length; i++){
      products[i].save(function(err, result) {
          if (i === products.length - 1){
              mongoose.disconnect();
          }
      });
  }
})

var users =[
new User({
    username    : 'Cadmin@admin.com',
    password    : 'admin',
    fullname    : 'Cuneyt Celebican',
    admin       : true
}),

new User({
    username    : 'd-pierre90@hotmail.com',
    password    : '1234',
    fullname    : 'Darren Pierre',
    admin       : true
}),

new User({
    username    : 'ta@testing.com',
    password    : 'carleton18',
    fullname    : 'TA',
    admin       : true
}),


 new User({
    username    : 'admin@admin.com',
    password    : 'admin',
    fullname    : 'Sam Daly',
    admin       : true
})

]




User.remove({},function(err){
  if(err){
    console.log("ERROR:Remove User failed");
    return
  }
  console.log("Old User data was removed sucessfully")
  for (var i = 0; i < users.length; i++){


    User.createUser(users[i], function(err, user){
        if(err) throw err;
        console.log(user);
        mongoose.disconnect();
    });

  }

})
