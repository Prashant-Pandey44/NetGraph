import express from "express";
import { login } from "../controller/auth.js";
import { register } from "../controller/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register",register);

export default router;