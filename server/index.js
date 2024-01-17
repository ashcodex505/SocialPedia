import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import {fileURLToPath} from "url";
import authRoutes from "./routes/auth.js";
import {register} from "./controllers/auth.js"; //all your logic for your routes go here 
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/posts.js";
import {createPost, getUserPosts } from "./controllers/post.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import {users, posts} from "./data/index.js";
import searchRoutes from "./routes/search.js";

import { verifyToken } from "./middleware/auth.js";
/* CONFIGURATIONS (for middleware and packages) */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); //the directory path from filename
dotenv.config(); //reads the .enhv file in the project root and loads the enviorment variable into the process.env file
const app = express();
app.use(express.json()); //parses incoming JSON requests add a body object to the reuqest object contianing JSON data 
app.use(helmet()); //collection middleware function to set various HTTP headers for securing the application helps protect against common web vulnerabilities 
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"})); //specifies how cross-orign requests should be handled 
app.use(morgan("common")); //logs HTTP requests in the common format 
app.use(bodyParser.json({limit: "30mb", extended: true})); //configures it to parse JSON bodies with a size limit of 30mb and extended option 
app.use(bodyParser.urlencoded({limit: "30mb", extended: true})); //configures body-parser to handle URL-encoded bodies 
app.use(cors());
// app.use(cors(
//     {
//         origin : ["https://social-pedia-two.vercel.app"],
//         methods: ["POST", "GET", "PATCH"],
//         credentials: true
//     }
// )); //allows or restricts cross-origin HTTP requests
app.use("/assets", express.static(path.join(__dirname, 'public/assets'))); //Serves static files from the speicficed directory under the /assets route

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/assets"); //this is how a file is saved when someone uploads somehting to your website 
    },
    filename: function (req, file, cb){
        cb(null, file.originalname);
    }
    
});
const upload = multer({storage});


/* ROUTES WITH FILES*/
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/*ROUTES*/
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/search", searchRoutes);

/*MONGOOSE SETUP*/
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

})
.then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */  
    // User.insertMany(users);
    // Post.insertMany(posts);
})
.catch((error) => console.log(`${error} did not connect`));
