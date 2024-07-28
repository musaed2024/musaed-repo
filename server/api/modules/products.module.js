const mongoose = require('mongoose');
const validator = require('validator');

// the product document look like

// {
//     "user_id":"666545bc9f63840647a8ba3d",
//     "name": "احذيه نايك",
//     "price" : "100",
//     "description" : "حداء نايك لون احمر مقاس 35",
//     "offer" : "10"
    
//   }
const productSchema = new mongoose.Schema({
    user_id: {
        type : String,
        require : true
    },
    name: {
        type : String,
        require : true,
    },
    description: {
        type : String,
        require : true,
    },
    offer: {
        type : String,
        require : true,
    },
})

module.exports = mongoose.model('Product',productSchema);