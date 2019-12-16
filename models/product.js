var mongoose    = require('mongoose');


var productSchema  = mongoose.Schema({
    imagePath: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    price: {
        type: Number
    }
});

module.exports = mongoose.model('Product', productSchema);