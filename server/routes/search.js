// routes/search.js
import express from "express";
const router = express.Router();
import User from "../models/User.js";// Replace with your actual model
import { verifyToken } from "../middleware/auth.js";

import { getSearchPosts } from "../controllers/search.js";
// Endpoint for handling search
// router.get('/search', async (req, res) => {
//     try {
//         verifyToken
//         getUserPosts
//         const { query } = req.query;

//         // Use a regular expression for case-insensitive search
//         const results = await User.find({ $or: [{ firstName: new RegExp(query, 'i') }, { lastName: new RegExp(query, 'i') }] });
//         const userId = results.map((user)=> user.userId);
//         res.json(userId);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });
router.get("/:firstName", verifyToken, getSearchPosts);

export default router;
