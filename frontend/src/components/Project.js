import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContex";

const Project = ({ project, myDelete }) => {
  const { auth } = useAuth();
  const token = auth?.token;
  // console.log("mydelete ", myDelete);
  const navigate = useNavigate();
  const handleDelete = async (id) => {
    // let ans=prompt("Do you sure to delete then e")
    // console.log(ans);
    let confirmed = window.confirm("Do you want to delete?");
    console.log(confirmed);
    if (confirmed) {
      try {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/deleteProject/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = response.data;
        if (data.success) {
          toast.success("Project deleted.");
          myDelete(id);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="project">
      <h3>{project.title}</h3>
      <p>Description: {project.description}</p>
      <p>Developer: {project.developer}</p>
      <p>Deadline:{new Date(project.deadline).toLocaleDateString()}</p>
      <button className="deletebtn" onClick={() => handleDelete(project._id)}>
        Delete Project
      </button>
      <button
        className="updatebtn"
        onClick={() => navigate(`/updateProject/${project._id}`)}
      >
        Update Project
      </button>
    </div>
  );
};

export default Project;
