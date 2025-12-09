const formModel = require('../models/FormModel');

module.exports.getForm = async(req,res)=>{
    const form = await formModel.find()
    res.send(form);
}

module.exports.saveForm = async(req,res)=>{
    const {checkbox1, checkbox2, radioOption} = req.body
    formModel
        .create({checkbox1, checkbox2, radioOption})
        .then((data)=>{
            console.log('Form salvo com sucesso')
            console.log(data)
            res.send(data)
        })    
}

module.exports.deleteForm = async(req,res)=>{
    const {_id} = req.body
    formModel
        .findByIdAndDelete(_id)
        .then(()=>res.send('Deletado com sucesso'))
        .catch((err)=>console.log(err))
}

module.exports.updateForm = async(req,res)=>{
    const {_id, checkbox1, checkbox2, radioOption} = req.body
    formModel
        .findByIdAndUpdate(_id,{checkbox1, checkbox2, radioOption})
        .then(()=> res.send('Registro atualizado com sucesso'))
        .catch((err)=>console.log(err))
}
