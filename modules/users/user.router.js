// Viết code Router của User vào đây nhé!
const express = require('express');
const router = express.Router();
const userController = require('./user.controller');

const prefix = '/users';
router.get(prefix, userController.getAllUsers);

module.exports = router;
