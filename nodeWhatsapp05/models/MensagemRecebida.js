const mongoose = require('mongoose');

const MensagemRecebidaSchema = new mongoose.Schema({
    rawPayload: {type: String, required: true},
    receivedAt: {type:Date, default:Date.now},
});

module.exports = mongoose.model('MensagemRecebida', MensagemRecebidaSchema);