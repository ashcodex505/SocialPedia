import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
    
} from "../controllers/users.js"; //controllers you can think of as actions with your backend 
import { verifyToken } from "../middleware/auth.js";


const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */ 
router.patch("/:id/:friendId", verifyToken, addRemoveFriend ); //you want to use patch for update for partial modifications
//POST is typically used for creating new resources, while PATCH is used for making partial updates to existing resources. 
export default router;