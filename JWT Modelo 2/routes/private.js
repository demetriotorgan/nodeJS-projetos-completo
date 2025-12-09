const express = require('express')
const verifyToken = require('../routes/middleware/protected')
const router = express.Router();

router.get('/protected', verifyToken, (req,res)=>{
    res.json({msg:'Acesso Autorizado'})
})

module.exports = router;