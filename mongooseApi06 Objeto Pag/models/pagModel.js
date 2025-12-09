const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
    nome:{
        type: String
    },
    data:{
        type:Date
    },
    valor:{
        type:Number
    }
});

module.exports = mongoose.model('cliente', clienteSchema);