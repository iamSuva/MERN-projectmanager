import projectModel from "../models/projectModel.js";

export const addProjectController = async (req, res) => {
  try {
    const { title, description, developer, deadline } = req.body;
    console.log(req.body);
    const newProject = await projectModel.create({
      title,
      description,
      developer,
      deadline:deadline,
      user:req.user._id
    });
    if (newProject) {
      return res.status(200).send({
        success: true,
        newProject,
        message: "project added",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "internal server error",
    });
  }
};

export const deleteProjectController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const project = await projectModel.findByIdAndDelete(id);
    if (project) {
      return res.status(200).send({
        success: true,
        message: "project deleted successfully.",
        project,
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "failed to project delete.",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "internal server error",
    });
  }
};

export const updateProjectController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    const { title, description, developer, deadline } = req.body;

    const updatedProject = await projectModel.findByIdAndUpdate(
      id,
      { title, description, developer, deadline },
      { new: true }
    );
    if (updatedProject) {
      return res.status(200).send({
        success: true,
        updatedProject,
        message: "project updated",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "internal server error",
    });
  }
};
//all projects
export const getProjectsController = async (req, res) => {
  try {
    console.log("user ",req.user);
    const userid=req.user._id;
    const projects = await projectModel.find({user:userid}).sort({ createdAt: -1 });
    
    if (projects) {
      return res.status(200).send({
        success: true,
        projects,
        message: "all projects",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "internal server error",
    });
  }
};
//single project
export const getProjectController = async (req, res) => {
  try {
    const project = await projectModel.findOne({ _id: req.params.id });
    return res.status(200).send({ project });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "internal server error",
    });
  }
};
