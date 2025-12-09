const mongoose = require('mongoose');

const checkSchema = new mongoose.Schema({
    option01:{
        type:Boolean
    },    
    option02:{
        type:Boolean
    }
})

module.exports = mongoose.model('Check', checkSchema);