import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const prisma = new PrismaClient()
const app = express();

//Cors
app.use((req,res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    next();    
  });
  app.use(cors({
    origin:"*"
}))    

app.use(express.json());

//criando a  rota get
app.get('/', (req,res)=>{
    res.send("API rodando! :D")
})

app.get('/api/usuarios', async(req, res)=>{
    let users = [];
    if (req.query){
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                age: req.query.age,
                email: req.query.email
            }
        })
    } else{
        users = await prisma.user.findMany();
    }
    res.status(200). json(users);
})

//criando a rota post
app.post('/api/usuarios', async(req, res)=>{
   await prisma.user.create({
        data:{
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
    res.status(201).json(req.body);
})

//Criando rota PUT
app.put('/api/usuarios/:id', async(req, res)=>{
    await prisma.User.update({
        where:{
            id: req.params.id
        },
         data:{
             email: req.body.email,
             name: req.body.name,
             age: req.body.age
         }
     })
     res.status(201).json(req.body);
 })

 //Criando Rota DELETE
 app.delete('/api/usuarios/:id', async(req,res)=>{
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({message: "Usuário deletado com sucesso"});
 })
 
const port = process.env.PORT || 3000;
app.listen(port)

/*
    Objetivos:
    1- Criar usuário
    2- Listar todos os usuários
    3- Editar um usuário
    4- Deletar um usuário

    senha de usuario do MongoDB -> UE4Rr6dktluIOGMa
*/