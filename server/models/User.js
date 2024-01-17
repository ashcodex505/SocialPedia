import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
    {
        firstName: { //field
            type: String, //property of that field
            required: true, //has to be required 
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            required: true, //has to be required 
            min: 2,
            max: 50,
        },
        email: {
            type: String,
            required: true, //has to be required 
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true, //has to be required 
            min: 5,
        },
        picturePath: {
            type: String,
            default: "", //nothing is really required by default it is just going to be a string 
        },
        friends: {
            type: Array,
            default: [],
        },
        location : String,
        occupation: String,
        viewedProfile: Number,
        impression: Number,

    }, {timestamps: true}
);

const User = mongoose.model("User", UserSchema); //saying this is how we are going to model our data in our database 
export default User;