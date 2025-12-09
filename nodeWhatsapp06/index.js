const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const fs = require('fs');
const path = require('path');

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

// Caminho da pasta public
const publicDir = path.join(process.cwd(), 'public');

// Cria a pasta public se não existir
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
    console.log('📂 Pasta /public criada.');
}

// Caminho do arquivo único
const filePathTelefones = path.join(publicDir, 'telefones.json');

// Cria o arquivo se não existir
if (!fs.existsSync(filePathTelefones)) {
    fs.writeFileSync(filePathTelefones, JSON.stringify([], null, 2));
    console.log('📄 Arquivo telefones.json criado.');
}

console.log('✅ Inicialização de arquivos concluída.');


//Conexão com o mongoDB Atlas
mongoose
    .connect(process.env.MONGODB_URI)
    .then(()=>console.log(`Conectado ao MongoDB`))
    .catch((err)=>console.log(err))

//Rotas
app.use('/', routes);

app.listen(PORT, ()=>console.log(`Rodando na porta ${PORT}`));