const pagModel = require('../models/pagModel');

module.exports.getPag = async(req,res)=>{
    const pag = await pagModel.find()
    res.send(pag);
}

module.exports.getBuscaPag = async(req,res)=>{
    const parametro = req.query.param
        if(!parametro || parametro.length === 0){
            return res.status(400).json({erro: 'Por favor, forneça uma letra válida'})
        }
            try {
                const regex = new RegExp(parametro, 'i');
                const clientes = await pagModel.find({
                    nome:regex
                });
                res.status(200).json(clientes);
            } catch (error) {
                console.error('Erro ao buscar clientes', error);
                res.status(500).json({erro:'Erro ao buscar clientes'});
            }
}

module.exports.getBuscaPagMes = async(req,res)=>{
    const mes = parseInt(req.query.mes);
        if(!mes || mes < 1 || mes > 12){
            return res.status(400).json({erro: 'Por favor forneça um mês válido (1-12)'})
        }
        try {
            const dataInicio = new Date(new Date().getFullYear(), mes - 1, 1);
            const dataFim = new Date(new Date().getFullYear(), mes, 0);
            const clientes = await pagModel.find({ 
                data:{
                        $gte:dataInicio,
                        $lt: dataFim
                    }   
                })
            res.status(200).json(clientes);
        } catch (error) {
            console.error('Erro ao buscar clientes: ', error);
            res.status(500).json({error:'Erro ao buscar clientes'})
        }
}

module.exports.savePag = async(req,res)=>{
    const {nome,data, valor} = req.body
    pagModel
        .create({nome,data,valor})        
        .then((data)=>{
            console.log('Pagamento cadastrado com sucesso')
            console.log(data)
            res.send(data)
        })
}
