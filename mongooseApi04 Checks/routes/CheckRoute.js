const {Router} = require('express');
const { getCheck, saveCheck, updateCheck, deleteCheck } = require('../controllers/CheckControler');

const router = Router();

router.get('/', getCheck)
router.post('/save', saveCheck)
router.post('/update', updateCheck)
router.post('/delete', deleteCheck)

module.exports = router;