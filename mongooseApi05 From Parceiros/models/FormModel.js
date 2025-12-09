const mongoose = require('mongoose')

const formSchema = new mongoose.Schema({
    checkbox1:{
        type:Boolean
    },
    checkbox2:{
        type:Boolean
    },
    radioOption:{
        type:String
    }
})

module.exports = mongoose.model('form', formSchema);