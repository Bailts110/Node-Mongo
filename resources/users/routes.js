const express = require('express')
const router = express.Router();
const {Register,loginUser} = require("./controller");
const {authorize}=require("../users/middleware")
router.post('/register', Register)
router.post('/login', loginUser)

module.exports=router;