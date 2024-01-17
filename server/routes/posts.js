import express from "express";
import {getFeedPosts, getUserPosts, likePost} from "../controllers/post.js";
import { verifyToken } from "../middleware/auth.js";
import { submitComment } from "../controllers/post.js";
const router = express.Router();

/*READ */
router.get("/", verifyToken, getFeedPosts)
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost); //updating a liked post or unliked post

router.post("/:id/comment", verifyToken, submitComment);
export default router;