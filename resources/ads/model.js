const mongoose = require('mongoose')

const adsSchema=new mongoose.Schema(
    {

        title:{
            type:String,
            required:["true","Please add title to your post"]
        },
        imageLink:{
            type:String,
            
        },
        
        user_id:{
            
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        }

      
    },
    {timestamps:true}

);

const ADS = mongoose.model('ADS',adsSchema);
module.exports=ADS;