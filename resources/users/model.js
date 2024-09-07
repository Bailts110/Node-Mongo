const mongoose = require('mongoose')
const validator = require('validator');
const userSchema=new mongoose.Schema(
    {

        name:{
            type:String,
            required:["true","Please add name to your post"],
            unique:true,
        },
        email:{
            type:String,
            required:["true","Please add email to your post"],
            unique:true,
            lowercase:true,
            validator:function (value) {
                return validator.isEmail(value);
            }
    
        },
        password:{
            type:String,
            required:["true","Please Enter your password"],
            minlength: [6, 'Too short password'],
            select: false,
        },


    },
    {timestamps:true}

);

const User = mongoose.model('User',userSchema);
module.exports=User;