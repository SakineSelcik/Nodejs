const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BrandsSchema = Schema({
    supplier_id :Schema.Types.ObjectId,
    name:{
        type:String,
        required: true
    }

});


module.exports = mongoose.model('brands' , BrandsSchema);