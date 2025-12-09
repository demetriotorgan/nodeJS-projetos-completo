const mongoose = require('mongoose')

const MensagemSchema = new mongoose.Schema({
    phone: String,
    message:String,
    data:{type:Date, default:Date.now}
});

module.exports = mongoose.model('Mensagem', MensagemSchema);
