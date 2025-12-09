const express = require('express');
const axios = require('axios');
const Mensagem = require('../models/Mensagem');
const MensagemRecebida = require('../models/MensagemRecebida');
const Imagem = require('../models/Imagem');

require('dotenv').config();

const router = express.Router();

router.post('/enviar', async(req,res)=>{
    const {phone, message} = req.body;
    if(!phone || !message){
        return res.status(400).json({sucesso:false, erro:'Telefone e mensagem são obrigatórios'});        
    }
    try {
        const response = await axios.post(`https://api.z-api.io/instances/${process.env.ZAPI_INSTANCE_ID}/token/${process.env.ZAPI_TOKEN}/send-text`,{
                    phone:phone,
                    message:message,
                },
                {
                    headers:{
                         'Client-Token': process.env.ZAPI_CLIENT_TOKEN
                    }
                });
                //Salva no MongoDB
                console.log('Status:', response.status);
                console.log('---------------------------');
                console.log('Headers:', response.headers);
                console.log('Data:', response.data);
                console.log('Resposta completa', response);
                //Salva no MongoDB
                await Mensagem.create({phone,message});
                res.status(200).json({sucesso:true, mensagem:'Mensagem enviada com sucesso!'});
    } catch (error) {
        if(error.response){
            console.error('Erro da Z-API:', error.response.data);
        }else{
            console.error('Erro desconhecido:', error.message);
        }        
        res.status(500).json({sucesso:false, error:'Erro ao enviar mensagem'});
    }
});

//Rota pra enviar imagem
router.post('/enviar-imagem', async(req,res)=>{
    const {phone, image, caption, viewOnce} = req.body;
    if(!phone || !image || !caption || viewOnce === undefined){
        return res.status(400).json({erro:'Preencha todos os campos da requisição'})
    }
    if (typeof viewOnce !== 'boolean') {
      return res.status(400).json({ erro: 'O campo viewOnce deve ser um booleano' });
    }

    try {
        const response = await axios.post(`https://api.z-api.io/instances/${process.env.ZAPI_INSTANCE_ID}/token/${process.env.ZAPI_TOKEN}/send-image`,{
            phone:phone, 
            image:image,
            caption:caption,
            viewOnce:viewOnce
        },{
            headers:{
                         'Client-Token': process.env.ZAPI_CLIENT_TOKEN
                    }
        });
        console.log('Respota da Z-API:', response.data);
        //Salvando dados de envio no banco de dados
        await Imagem.create({phone, image, caption, viewOnce});
        res.status(200).json({sucesso:true, message:'Mensagem enviada com sucesso'});
    } catch (error) {
        if(error.response){
            console.error('Erro da Z-API:', error.response.data);
        }else{
            console.error('Erro desconhecido:', error.message);
        }        
        res.status(500).json({sucesso:false, error:'Erro ao enviar mensagem'});
    }
});

router.get('/mensagens', async(req,res)=>{
    try {
        const mensagens = await Mensagem.find().sort({_id:-1});
        res.status(200).json(mensagens);
    } catch (err) {
        console.error('Erro ao carregar mensagens', err);
        res.status(500).json({sucesso:false, erro:'Erro ao buscar mensagens'})
    }
});

//-----------WebHook---------------
router.post('/webhook', async(req,res)=>{
    
    try {
        console.log('Webhook recebido:', JSON.stringify(req.body, null, 2));

    //salvando no mongodb
    await MensagemRecebida.create({
        rawPayload: JSON.stringify(req.body),
        receivedAt: new Date()
    });
        res.sendStatus(200);
    } catch (err) {
        console.error('Erro ao salvar mensagem recebida', err);
        res.status(500).json({sucesso:false, erro:'Erro interno ao servidor'});
    }    
});

//-----------Limpar Registro Schema
router.delete('/limpar-mensagens', async(req, res)=>{
    try {
        //Encontrar o ultimo registro adicionado
        const ultimaMensagem = await MensagemRecebida.findOne().sort({receivedAt: -1});

        if(!ultimaMensagem){
            return res.status(404).json({message: 'Nenhuma mensagem encontrada'});
        }

        //Excluindo todos os registros, execeto o ultimo
        await MensagemRecebida.deleteMany({_id: {$ne:ultimaMensagem._id}});
        res.json({message: 'Mensagens limpas com sucesso'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Erro ao limpar mensagens'});
    }
});

module.exports = router;

//verifica se veio uma mensagem
    // constbody = req.body;
    // if(body.message && body.message.text && body.message.text.body){
    //     const from = body.message.from;
    //     const message = body.message.text.body;

    //     //salva no mongodb
    //     await Mensagem.create({
    //         phone:from,
    //         message:message,
    //     });
    //     console.log(`Mensagem recebida de ${from}: ${message}`);
    // }
    // //resposta para o webhook
    // res.sendStatus(200);