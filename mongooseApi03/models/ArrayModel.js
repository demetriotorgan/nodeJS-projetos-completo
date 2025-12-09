const mongoose = require('mongoose')

const ArraySchema = new mongoose.Schema({
    produtos:{
        type:[]
    }
})

module.exports = mongoose.model('Array', ArraySchema)