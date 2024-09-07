const Post = require("./model");

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate({
            path: 'user_id',
            select: 'name' // Only include the 'name' field
        });
        res.status(200).json({
            data: posts,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.CreateNewPost = async (req, res) => {
    const { title, body, tags } = req.body;
    try {
        const newPost = await Post.create({
            title,
            body,
            tags,
            user_id: req.user_id // Use user_id from authorized request
        });

        res.status(201).json({
            message: "Post created successfully",
            data: newPost,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getPostById = async (req, res) => {
    const id = req.params.id;

    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({
            data: post,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.updatePostById = async (req, res) => {
    const id = req.params.id;
    const { title, body, tags } = req.body;

    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.user_id.toString() !== req.user_id) {
            return res.status(401).json({ error: "Not authorized" });
        }

        const updatePost = await Post.findByIdAndUpdate(
            id,
            { title, body, tags },
            { new: true }
        );

        res.status(200).json({
            message: "Post updated successfully",
            data: updatePost,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.deletePostById = async (req, res) => {
    const id = req.params.id;

    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.user_id !== req.user_id) {
            return res.status(401).json({ error: "Not authorized" });
        }

        await Post.findByIdAndDelete(id);

        res.status(200).json({
            message: "Post deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};
