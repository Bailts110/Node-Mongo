
const Post=require("./model")
exports.getAllPosts=async (req, res) => {
    try {
      const posts=await Post.find();
      res.status(200).json({
        data:posts,
      });
      
    } catch (error) {
      console.log(error);
    }
    };


    exports.CreateNewPost=async (req, res) => {

        const {title, body,tags} = req.body;
        try {
            const newPost = await Post.create({
                title, 
                body,
                tags,
            });

            res.status(201).json({
                message: "Post created successfully",
 
                data: newPost,
            });

        } catch (error) {
            console.log(error);
        }



    }



    exports.getPostById=async (req, res) => {

        const id = req.params.id;

        try {

                const post = await Post.findById(id);

                res.status(200).json({
                    data: post,
                })

        } catch (error) {
            console.log(error)
        }

    }

    exports.updatePostById=async (req, res) => {
    
        const id = req.params.id;
        const {title, body, tags} = req.body;
        try {

            const post = await Post.findByIdAndUpdate(
                
                id,
                {title,body,tags},
                {new : true}

            );
            res.status(200).json({
                message: "Post updated successfully",
                data: post,
            });

        } catch (error) {
            console.log(error)
        }
    
    
    }

    exports.deletePostById=async (req, res) => {

        const id = req.params.id;

        try {
            
        await Post.findByIdAndDelete(id);
            

        res.status(200).json({
            message: "Post deleted successfully",
        });

        } catch (error) {
            console.log(error)
        }


    }