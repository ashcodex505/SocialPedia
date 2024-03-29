import Post from "../models/Post.js";
import User from "../models/User.js";



export const getSearchPosts = async (req, res) => {
    try{
        const { firstName } = req.params;
        const post = await Post.find({firstName}); // only grab user feed posts 
        res.status(200).json(post);
    }
    catch (err){
        res.status(404).json({message: err.message})

    }
}