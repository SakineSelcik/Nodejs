    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;


    const productSchema = Schema ({
         brand_id : Schema.Types.ObjectId ,
        supplier_id :Schema.Types.ObjectId,
        category_id :Schema.Types.ObjectId,
        variant_id : Schema.Types.ObjectId,
        name: {
            type: String,
            required: true
        },
        category:{
            type: String,
        },
        color:{
            type:String,
        },
        price:{
            type: Number,
            required: true
        },
        description:{
            type: String,
            required: true
        },

        company:{
            type: String,
            required: true
        },



        createAt:{
            type:Date,
            default: Date.now()
        }
    });

    module.exports = mongoose.model('products' , productSchema);