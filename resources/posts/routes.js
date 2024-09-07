const express = require('express')
const router = express.Router();
const {getAllPosts,CreateNewPost,getPostById,updatePostById,deletePostById} = require("./controller");
const {authorize}=require("../users/middleware")
router.get('/',getAllPosts);

router.post('/',authorize,CreateNewPost);
router.get('/:id',getPostById);
router.patch('/:id',authorize,updatePostById,authorize);
router.delete('/:id',authorize,deletePostById);

module.exports=router;