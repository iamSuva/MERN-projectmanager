import express from "express";
import { loginController, registerController } from "../controller/userController.js";
const router=express.Router();


router.post("/register",registerController);
router.post("/login",loginController);
// router.get("/getUser",);


export default router;