import bcrypt from "bcrypt"; //encrypts the password
import jwt from "jsonwebtoken"; //sends the user a webtoken so they can authorize it 
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => { //you are making a call to your database which is a time task 
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password : passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)

        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser); //making it available in json format so the frontend can recieve this response. We use JSON because its easily transmittable and parseable 
    }
    catch(err){
       res.status(500).json({error : err.nessage}); 
    }
};


/* LOGGING IN */

export const login = async (req, res) =>{
    try{
        const {email, password} = req.body; //you are destructuring this meaning your taking email and password out req.body not defining variables now 
        const user = await User.findOne({email : email}); //matching the email variable with the email in your database to find if they match. Trying to find specified email from data
        if (!user) return res.status(400).json({msg: "User does not exist"}); //if they typed in the wrong email this error message will pop up 
        const isMatch = await bcrypt.compare(password, user.password); //bcrypt is going to turn the inputted password to the same salt as the encrypted password so it can check if they're both the same 
        if (!isMatch) return res.status(400).json({msg: "Invalid credentials"}); //then this if statement checks the isMatch boolean value 
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET); //this gives us a token with a secret string. You are writing a secret string in variable JWT_SECRET in your .env file
        delete user.password; //password that user has put in making sure it does not get sent back to the frontend
        res.status(200).json({token, user});
    }catch(err){
        res.status(500).json({error : err.message}); 

    }
}