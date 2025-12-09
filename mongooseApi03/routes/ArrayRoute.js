const {Router} = require('express');
const { getArray, saveArray, updateArray, deleteArray, buscaProduto } = require('../controllers/ArrayControler');

const router = Router()

router.get('/', getArray)
router.get('/produtos/:id',buscaProduto)
router.post('/save', saveArray)
router.post('/update', updateArray)
router.post('/delete', deleteArray)



module.exports = router;