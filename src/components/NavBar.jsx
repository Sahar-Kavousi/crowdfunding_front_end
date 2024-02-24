import { Link, Outlet } from "react-router-dom";
function NavBar() {
  return (
    <div>
      <div className="nav-container">
        <div className="nav-items">
          <Link to="/">Home</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/about">About</Link>
        </div>
        <div className="login-container">
          <Link to="/login">Log In</Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
export default NavBar;
