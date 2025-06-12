const express = require('express');
const router = express.Router();

const { getOtherUsers, getProfile, login, logout, register } = require('../controllers/user.controller.js');
const isAuthenticated = require('../middlewares/auth.middlware.js')

router.post("/register", register);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);
router.get("/get-profile", isAuthenticated, getProfile);
router.get("/get-other-users", isAuthenticated, getOtherUsers);


module.exports = router;