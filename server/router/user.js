const express = require('express');

const router = express.Router();
const UserController = require('../controller/userController');

UserController(router);

module.exports = router;
