const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
});

//Hash da senha antes de Salvar
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
});

module.exports = mongoose.model('User', userSchema);

