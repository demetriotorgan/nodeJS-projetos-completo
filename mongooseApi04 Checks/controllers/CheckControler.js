const CheckModel = require('../models/CheckModel');

module.exports.getCheck = async(req,res)=>{
    const check = await CheckModel.find()
    res.send(check);
}

module.exports.saveCheck = async(req,res)=>{
    const {option01,option02} = req.body
    CheckModel
        .create({option01,option02})
        .then((data)=>{
            console.log('Check salvo com sucesso')
            console.log(data);
            res.send(data);
        })
}

module.exports.updateCheck = async(req,res)=>{
    const {_id, option01,option02} = req.body
    CheckModel
        .findByIdAndUpdate(_id,{option01,option02})
        .then(()=> res.send('Atualizado com sucesso'))
        .catch((err)=>console.log(err));
}

module.exports.deleteCheck = async(req,res)=>{
    const {_id} = req.body
    CheckModel
        .findByIdAndDelete(_id)
        .then(()=> res.send('Deletado com sucesso'))
        .catch((err)=>console.log(err));
}
