const {Router} = require('express');
const { getPag, savePag, getBuscaPag, getBuscaPagMes } = require('../controllers/pagControler');

const router = Router();

router.get('/', getPag);
router.get('/clientes',getBuscaPag); //Busca pelas inicias
router.get('/pagamentos', getBuscaPagMes); //Busca pagamentos do mes
router.post('/save', savePag);

module.exports = router;