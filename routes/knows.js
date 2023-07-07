import express from "express";
import { knows } from "../controller/knows.js";

const router = express.Router();

router.post("/:userone/:usertwo", knows);

export default router;