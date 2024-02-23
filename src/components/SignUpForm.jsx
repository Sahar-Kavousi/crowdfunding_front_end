import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postSignUp from "../api/post-login.js";

function SignUpForm() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const handleChange = (event) => {
    const { id, value } = event.target;

    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userData.username && userData.email && userData.password) {
      postSignUp(userData.username, userData.email, userData.password).then(
        (response) => {
          // Handle successful sign-up, e.g., redirect to login page
          window.localStorage.setItem("token", response.token);
          navigate("/login");
        }
      );
    }
  };

  return (
    <form>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          placeholder="Enter username"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Enter email"
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />
      </div>
      <button type="submit" onClick={handleSubmit}>
        Sign Up
      </button>
    </form>
  );
}

export default SignUpForm;
