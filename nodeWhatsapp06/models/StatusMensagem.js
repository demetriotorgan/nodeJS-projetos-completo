const mongoose = require('mongoose');

const StatusMensagemSchema = new mongoose.Schema({
    messageId:String,
    status:String,
    phone:String
});

module.exports = mongoose.model('StatusMensagem', StatusMensagemSchema);