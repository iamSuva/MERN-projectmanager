import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Project from "./Project";
import { useAuth } from "../context/AuthContex";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const token = auth?.token;
  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      navigate("/home");
    }
  }, [token]);

  const getProjects = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/getProjects`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data;
      console.log("allprojects",data);
      if (data.success) {
        // console.log(data.projects);
        setProjects(data.projects);
        //console.log("projects =", projects);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProjects();
  }, []);
  const handleDelete = (id) => {
    let temp = projects.filter((project) => project._id != id);
    console.log(" temp ", temp);
    setProjects(temp);
    // alert("project deleted");
  };
  return (
    <Layout>
      <div className="container">
        <h1 className="center">Project management</h1>
        {/* {JSON.stringify(auth)} */}
        <div className="project-container">
          {projects.map((project) => (
            <Project
              key={project._id}
              project={project}
              myDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
