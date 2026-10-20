const express = require('express');
const router = express.Router();

const {getHealth, getInfo }= require('../controllers/apicontroller')
router.get('/info', getInfo);

router.get('/info', getHealth);