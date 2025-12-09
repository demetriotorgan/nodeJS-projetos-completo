const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = express.Router()
const User = require('../models/User')

router.post('/login', async (req,res)=>{
    try {
        const {username, password} = req.body
        const user = await User.findOne({username})
        if(!user) return res.status(404).json({erro:'Usuario não encontrado'});
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid) return res.status(404).json({erro:'Senha incorreta'});
        
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'1h'});
        res.json({token});
    } catch (error) {
        res.status(500).json({erro:'Erro no servidor'})
    }
})

module.exports = router;