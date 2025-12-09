const express = require('express')
const User = require('../models/User')
const router = express.Router()

router.post('/register', async(req,res)=>{
    try {
        const {username, password} = req.body
        const user = new User({username,password})
        await user.save();
        res.status(201).json({msg: 'Usuario cadastrado com sucesso'})
    } catch (error) {
        res.status(400).json({erro:'Erro ao registrar usuario'})
    }
})

module.exports = router;