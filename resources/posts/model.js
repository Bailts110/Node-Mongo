const mongoose = require('mongoose')

const postSchema=new mongoose.Schema(
    {

        title:{
            type:String,
            required:["true","Please add title to your post"]
        },
        body:{
            type:String,
            required:["true","Please add body to your post"]
        },
        tags:{
            type:Array,
           default:[]
        },


    },
    {timestamps:true}

);

const Post = mongoose.model('Post',postSchema);
module.exports=Post;