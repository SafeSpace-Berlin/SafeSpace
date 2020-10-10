var router = require('express').Router();

router.use('/rooms', require('./rooms'));
router.use('/users', require('./users'));

module.exports = router;