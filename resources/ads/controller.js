
const ADS=require("./model")
exports.getAllADS=async (req, res) => {
    try {
      const posts=await ADS.find().populate({
        path: 'user_id',
        select: 'name' // exclude the _id field
      });
      res.status(200).json({
        data:posts,
      });
      
    } catch (error) {
      console.log(error);
    }
    };


    exports.CreateNewADt=async (req, res) => {

        const {title,imageLink} = req.body;
        try {
            const newPost = await ADS.create({
                title, 
               imageLink,
                user_id:req.user_id
            });

            res.status(201).json({
                message: "Post created successfully",
 
                data: newPost,
            });

        } catch (error) {
            console.log(error);
        }



    }



    exports.getADById=async (req, res) => {

        const id = req.params.id;

        try {

                const post = await ADS.findById(id);

                res.status(200).json({
                    data: post,
                })

        } catch (error) {
            console.log(error)
        }

    }

    exports.updateADById=async (req, res) => {
    
        const id = req.params.id;
        const {title, imageLink} = req.body;
        try {

            const post = await ADS.findById(id);
           
            if (post.user_id!==req.user.id) {
              return  res.status(401).json({error:"not Authorized"})
            }
            const updateAD = await ADS.findByIdAndUpdate(
                
                id,
                {title,imageLink},
                {new : true}

            );
            
            res.status(200).json({
                message: "Post updated successfully",
                data: updateAD,
            });

        } catch (error) {
            console.log(error)
        }
    
    
    }

    exports.deleteADById=async (req, res) => {

        const id = req.params.id;
        const post = await ADS.findById(id);
           
        if (post.user_id!==req.user.id) {
          return  res.status(401).json({error:"not Authorized"})
        }
        try {
            
        await Post.findByIdAndDelete(id);
            

        res.status(200).json({
            message: "Post deleted successfully",
        });

        } catch (error) {
            console.log(error)
        }


    }