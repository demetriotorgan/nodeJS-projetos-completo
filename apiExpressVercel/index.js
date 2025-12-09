import express from 'express'

const app = express()
const PORT = 4000

app.listen(PORT, ()=>{
    console.log(`API escutando na porta ${PORT}`)
})

app.get('/', (req,res)=>{
    res.send("Nossa API está rodando! :D")
})