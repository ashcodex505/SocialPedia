import express from "express";
import {login} from "../controllers/auth.js";

const router = express.Router(); //setting up your router but instead of app.use your doing router. becasue your putting these routes in seperate files

router.post("/login", login);

export default router;