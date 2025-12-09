const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const routes = require('./routes/Routes');

const app = express();
app.use(cors({
    origin:'*',
}));
app.use((req,res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    next();    
  });

const PORT = process.env.PORT || 5000;

app.use(express.json());

//Conexão com o mongoDB Atlas
mongoose
    .connect(process.env.MONGODB_URI)
    .then(()=>console.log(`Conectado ao MongoDB`))
    .catch((err)=>console.log(err))

//Rotas
app.use('/', routes);

app.listen(PORT, ()=>console.log(`Rodando na porta ${PORT}`));

//Requisição
//URL -> http://localhost:5000/enviar
//JSON:
// {
//   "phone":"5544998994890",
//   "message":"Oi amor!!! "
// }
//Headers: Content-Type application/json