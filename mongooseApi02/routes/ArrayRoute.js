const {Router} = require('express');
const { getArray, saveArray, updateArray, deleteArray } = require('../controllers/Arraycontroler');

const router = Router()

router.get('/', getArray)
router.post('/save', saveArray)
router.post('/update', updateArray)
router.post('/delete', deleteArray)


module.exports = router;