const express = require('express');
const signUp = require('../controllers/sign-up');
const signIn = require('../controllers/sign-in');

const router = express.Router();

router.post('/sign-up', signUp)
router.post('/sign-in', signIn)
module.exports = router;