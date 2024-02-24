import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postLogin from "../api/post-login.js";

function LoginForm() {
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
    if (credentials.username && credentials.password) {
      postLogin(credentials.username, credentials.password).then((response) => {
        // console.log(response);
        window.localStorage.setItem("token", response.token);
        navigate("/");
      });
    }
  };

  return (
    <div className="md:container md:mx-auto">
      <form className=" bg-slate-100 p-5 min-w-60">
        <div>
          <label htmlFor="username">Username:</label>
          <input
            className="placeholder-shown:border-gray-500"
            type="text"
            id="username"
            placeholder="Enter username"
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
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
