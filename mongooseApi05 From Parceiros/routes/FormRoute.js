const {Router} = require('express');
const { getForm, saveForm, deleteForm, updateForm } = require('../controllers/FormControler');

const router = Router();

router.get('/', getForm);
router.post('/save', saveForm);
router.post('/delete', deleteForm);
router.post('/update', updateForm);

module.exports = router;