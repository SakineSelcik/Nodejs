    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const VariantsSchema = Schema({
        name: {
            type:String,
            required: true
        },
        details: {
            type: Array,
        }
    })

    module.exports = mongoose.model('variants' , VariantsSchema);