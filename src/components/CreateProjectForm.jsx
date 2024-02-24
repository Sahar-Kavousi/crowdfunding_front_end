import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postCreateProject from "../api/post-create-project";

function createProjectForm() {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState({
    title: "",
    name: "",
    goalAmount: "",
    status: "",
    description: "",
    dateCreated: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setProjectData((prevProjectData) => ({
      ...prevProjectData,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (projectData.title && projectData.name && projectData.goalAmount) {
      postCreateProject(projectData).then(() => {
        // Redirect to the home page after successful project creation
        navigate("/");
      });
    }
  };

  return (
    <form>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          placeholder="Enter project title"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          placeholder="Enter creator's name"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="goalAmount">Goal Amount:</label>
        <input
          type="text"
          id="goalAmount"
          placeholder="Enter goal amount"
          onChange={handleChange}
        />
      </div>
      {/* Add more form fields as needed */}
      <button type="submit" onClick={handleSubmit}>
        Create Project
      </button>
    </form>
  );
}

export default CreateProjectForm;
