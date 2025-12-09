require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const jwt =require('jsonwebtoken')
const bcrypt = require("bcrypt");

const app = express()
app.use(express.json())

//Models
const User = require('./models/User')

//Rota Get publica
app.get('/', (req,res)=>{
    res.status(200).json({msg:"Bem vindo a api JWT"})
})

//Private Route
app.get('/user/:id', checkToken, async(req,res)=>{
    const id = req.params.id
    //verificando se usuario existe
    const user = await User.findById(id, '-password')
    if(!user){
        return res.status(404).json({msg:'Usuario não encontrado'})
    }
    res.status(200).json({user})
})

//middleware
function checkToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(!token){
        return res.status(401).json({msg:'Acesso negado'})
    }

    try {
        const secret = process.env.SECRET
        jwt.verify(token, secret)
        next()
    } catch (error) {
        res.status(400).json({msg:'Token Invalido'})
    }
}

//Register User
app.post('/auth/register', async(req,res)=>{
    const {name, email, password, confirmpassword} = req.body
    if(!name){
        return res.status(422).json({msg:'Nome obrigatorio'})        
    }
    if(!email){
        return res.status(422).json({msg:'Email obrigatorio'})        
    }
    if(!password){
        return res.status(422).json({msg:'Password obrigatorio'})        
    }
    //Confirm Password
    if(password !== confirmpassword){
        return res.status(422).json({msg:'As senhas não conferem'})
    }
    //Verificando Usuarios
    const userExists = await User.findOne({email: email})
        if(userExists){
            return res.status(422).json({msg:'Email ja cadastrado'})
        }
    //create Password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    //create user
    const user = new User({
        name, 
        email,
        password: passwordHash,
    })
    try {
        await user.save()
        res.status(201).json({msg:'Usuario criado com sucesso'})
    } catch (error) {
        res.status(500).json({msg:error})
    }
})

//Login User
app.post('/auth/login', async(req,res)=>{
    const {email, password} = req.body

    //validacao
    if(!email){
        return res.status(422).json({msg:'Email obrigatorio'})        
    }
    if(!password){
        return res.status(422).json({msg:'Password obrigatorio'})        
    }

    //Verificando user no banco
    const user = await User.findOne({email:email})
    if(!user){
        return res.status(404).json({msg:'Email não encontrado'})
    }

    //chekando password
    const checkPassword = await bcrypt.compare(password, user.password)
    if(!checkPassword){
        return res.status(422).json({msg:'Senha Inválida'})
    }

    try {
        const secret = process.env.SECRET
        const token = jwt.sign(
        {
            id: user._id
        }, 
        secret)
        res.status(200).json({msg:'Autenticação realizado com sucesso', token})
    } catch (error) {
        res.status(500).json({msg:'Erro no servidor'})
    }
})

mongoose
    .connect(process.env.MONGODB_URL)
    .then(()=>{
        app.listen(3000)
        console.log('Conectado ao mongoDB')
    })
    .catch((err)=>console.log(err))
