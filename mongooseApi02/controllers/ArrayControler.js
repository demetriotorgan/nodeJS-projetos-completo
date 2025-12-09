const ArrayModel = require('../models/ArrayModel')

module.exports.getArray = async(req,res)=>{
    const array = await ArrayModel.find()
    res.send(array)
}

module.exports.saveArray = async(req,res)=>{
    const {produtos} = req.body

    ArrayModel
    .create({produtos})
    .then((data)=>{
        console.log('Adicionado com sucesso')
        console.log(data)
        res.send(data)
    })    
} 

module.exports.updateArray = async(req,res)=>{
    const {_id, produtos} = req.body
    ArrayModel
        .findByIdAndUpdate(_id, {produtos})
        .then(()=>res.send("Atualizado com sucesso"))
        .catch((err)=>console.log(err))
}

module.exports.deleteArray = async(req,res)=>{
    const {_id} = req.body
    ArrayModel
        .findByIdAndDelete(_id)
        .then(()=>res.send("Deletado com sucesso"))
        .catch((err)=>console.log(err))
}

