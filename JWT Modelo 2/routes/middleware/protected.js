const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = express.Router()
require('dotenv').config()

const verifyToken = (req,res,next)=>{
    const authHeader  = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
        if(!token) return res.status(403).json({erro:'Token não fornecido'});

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
            if(err) return res.status(401).json({erro:'Token inválido'});
            req.userId = decoded.id;
            next();
        })
}

module.exports = verifyToken