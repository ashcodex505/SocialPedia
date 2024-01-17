import Post from "../models/Post.js";
import User from "../models/User.js";
/* CREATE */
export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body; //what we are getting from the frontend
        const user = await User.findById(userId); // gaining access to all the users properties
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })
        await newPost.save(); //saving right to your database 

        const post = await Post.find(); //returning the entire posts from that user and the entire feed to the frontend so that we have an updated feed of the user's posts with the new one 
        res.status(201).json(post);
    } catch (err){
        res.status(409).json({message: err.message})
    }
}

/*READ */ 
export const getFeedPosts = async (req, res) =>{
    try{
        const post = await Post.find();
        res.status(200).json(post);
    } catch (err){
        res.status(404).json({message: err.message})

    }
}

export const getUserPosts = async (req, res) => {
    try{
        const { userId } = req.params;
        const post = await Post.find({userId}); // only grab user feed posts 
        res.status(200).json(post);
    }
    catch (err){
        res.status(404).json({message: err.message})

    }
}


/*UPDATE*/ 
export const likePost = async (req, res) =>{
    try{
        const {id} = req.params; //id comes from the query string. Id in the url
        const {userId} = req.body;  //what the userId frontend is giving us 
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId); //this is a boolean value of true or false
        if(isLiked){
            post.likes.delete(userId);
        }
        else{
            post.likes.set(userId, true); //set the map to true
        }
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes: post.likes},
            {new:true} //telling mongoose to send the updated and modified document ot the updatedPost
        );
        res.status(200).json(updatedPost);
    }
    catch (err){
        res.status(404).json({message: err.message})

    }
}

export const submitComment = async (req, res) =>{
    try{
        const {id} = req.params; //id comes from the query string. Id in the url
        const {userId, comments} = req.body;  //what the userId frontend is giving us 
        const post = await Post.findById(id);
        post.comments.push(comments)
        const updatedPost = await post.save();
        res.status(200).json(updatedPost);
    }
    catch (err){
        res.status(404).json({message: err.message})

    }
}