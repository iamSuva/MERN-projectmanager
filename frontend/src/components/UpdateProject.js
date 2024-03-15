import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "./Layout";
import { useAuth } from "../context/AuthContex";
const UpdateProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [developer, setDeveloper] = useState("");
  const [deadline, setDeadline] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const token = auth?.token;
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProject = {
        title: title,
        description: description,
        developer: developer,
        deadline: deadline,
      };

      const response = await axios.put(
        `/api/updateProject/${id}`,
        updatedProject,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = response.data;
      if (data.success) {
        setDeadline("");
        setTitle("");
        setDescription("");
        setDeveloper("");
        toast(data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getSingleProject = async () => {
    try {
      const response = await axios.get(`/api/getProject/${id}`,{headers:{Authorization:`Bearer ${token}`}});
      if (response.data) {
        const project = response.data.project;

        console.log(project);
        setTitle(project.title);
        console.log(new Date(project.deadline).toLocaleDateString());
        setDeadline(new Date(project.deadline).toLocaleDateString());
        setDescription(project.description);
        setDeveloper(project.developer);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProject();
  }, []);
  return (
    <Layout>
      <h1 className="center">Update project</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="developer">Developer:</label>
            <input
              type="text"
              id="developer"
              value={developer}
              onChange={(e) => setDeveloper(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="deadline">Deadline:</label>
            <input
              type="date"
              id="deadline"
              value={deadline }
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    </Layout>
  );
};

export default UpdateProject;
