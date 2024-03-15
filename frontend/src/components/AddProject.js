import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "./Layout";
import { useAuth } from "../context/AuthContex";
const AddProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [developer, setDeveloper] = useState("");
  const [deadline, setDeadline] = useState("");

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
      const newProject = {
        title: title,
        description: description,
        developer: developer,
        deadline: deadline,
      };
      const response = await axios.post("/api/addProject", newProject, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
  return (
    <Layout>
      <h1 className="center">Add New Project</h1>
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
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>
          <button type="submit">Add Project</button>
        </form>
      </div>
    </Layout>
  );
};

export default AddProject;
