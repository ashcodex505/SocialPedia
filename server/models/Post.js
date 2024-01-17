import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        location : String,
        description: String,
        picturePath: String,
        userPicturePath: String,
        likes :{
            type: Map,  //Map has a key of string and a value of boolean 
            of: Boolean,
        },
        comments: {
            type: Array,
            default: []

        }


    },
    {timestamps: true} //it will track the time at which object was made or updated 
);

const Post = mongoose.model("Post", postSchema);
export default Post;