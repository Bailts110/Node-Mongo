const express = require('express')
const router = express.Router();
const {getAllPosts,CreateNewPost,getPostById,updatePostById,deletePostById} = require("./controller");

router.get('/',getAllPosts);

router.post('/',CreateNewPost);
router.get('/:id',getPostById);
router.patch('/:id',updatePostById);
router.delete('/:id',deletePostById);

module.exports=router;