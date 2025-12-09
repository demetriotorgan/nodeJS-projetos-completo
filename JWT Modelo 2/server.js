const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const authRoutes = require('./routes/auth')
const loginRoutes = require('./routes/login')
const protectedRoutes = require('./routes/private')

const app = express()
app.use(express.json())

mongoose
    .connect(process.env.MONGODB_URL)
    .then(()=>{
        app.listen(3000)
        console.log('Conectado ao MongoDB')})
    .catch(err=>console.error(err))

app.use('/auth', authRoutes);
app.use('/api', loginRoutes);
app.use('/api', protectedRoutes);