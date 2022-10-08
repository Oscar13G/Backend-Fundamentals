const router = require('express').Router();
const gods = require('./gods');
const realms = require('./realms');
const users = require('./users');

router.get('/', (req, res) => {
    res.json({'info': 'Welcome to the gods API'})
});

router.use('/gods', gods);
router.use('/realms', realms);
router.use('/users', users);
module.exports = router;