const router = require('express').Router();
const {
    getRealm,
    getRealms,
    createRealm,
    updateRealm,
    deleteRealm
} = require('../controllers/realms');

router.get('/', getRealms);
router.get('/:id', getRealm);
router.post('/', createRealm);
router.patch('/:id', updateRealm);
router.delete('/:id', deleteRealm);

module.exports = router;