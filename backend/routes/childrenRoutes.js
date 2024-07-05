const express = require('express');
const router = express.Router();
const { getAllChildren } = require('../controllers/childrenController');
const { getChild } = require('../controllers/childrenController');

router.get('/getallchildren', getAllChildren);
router.get('/getchild/:id', getChild);

module.exports = router;
