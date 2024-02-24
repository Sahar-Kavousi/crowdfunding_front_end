import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import postPledge from "../api/post-pledge";

function PledgeForm({ projectId, projectTitle }) {
  const history = useHistory();
  const [pledgeData, setPledgeData] = useState({
    amount: "",
    comments: "",
    isAnonymous: false,
  });

  const handleChange = (event) => {
    const { id, value, type, checked } = event.target;
    setPledgeData((prevPledgeData) => ({
      ...prevPledgeData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (pledgeData.amount) {
      postPledge(projectId, pledgeData).then(() => {
        // Redirect to the project details page after successful pledge
        history.push(`/project/${projectId}`);
      });
    }
  };

  return (
    <form>
      <div>
        <p>Supporting Project: {projectTitle}</p>
      </div>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          type="text"
          id="amount"
          placeholder="Enter pledge amount"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="comments">Comments:</label>
        <textarea
          id="comments"
          placeholder="Enter comments (optional)"
          onChange={handleChange}
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            id="isAnonymous"
            onChange={handleChange}
          />
          Anonymous
        </label>
      </div>
      
      <button type="submit" onClick={handleSubmit}>
        Make Pledge
      </button>
    </form>
  );
}

export default PledgeForm;
