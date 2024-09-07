const express = require('express')
const router = express.Router();
const {getADById,CreateNewADt,getAllADS,updateADById,deleteADById} = require("./controller");
const {authorize}=require("../users/middleware")
router.get('/',getAllADS);

router.post('/',authorize,CreateNewADt);
router.get('/:id',getADById);
router.patch('/:id',authorize,updateADById);
router.delete('/:id',authorize,deleteADById);

module.exports=router;