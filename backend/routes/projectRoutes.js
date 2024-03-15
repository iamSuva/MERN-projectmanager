import express from "express";
import { addProjectController, deleteProjectController, getProjectController, getProjectsController, updateProjectController } from "../controller/projectController.js";
const router=express.Router();
import {requireLogin} from "../middleware/Authorization.js";
router.post("/addProject",requireLogin,addProjectController);
router.get("/getProjects",requireLogin,getProjectsController);
router.get("/getProject/:id",requireLogin,getProjectController);
router.delete("/deleteProject/:id",requireLogin,deleteProjectController);
router.put("/updateProject/:id",requireLogin,updateProjectController);

export default router;
