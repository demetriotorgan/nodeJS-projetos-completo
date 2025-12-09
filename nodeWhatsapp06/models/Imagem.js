const mongoose = require('mongoose');

const ImagemSchema = new mongoose.Schema({
    phone:String,
    image:String,
    caption:String,
    viewOnce:{type: Boolean, default:false}
});

module.exports = mongoose.model('Imagem', ImagemSchema);