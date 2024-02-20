import { Link, Outlet } from "react-router-dom";
function NavBar() {
  return (
    <div>
      <nav className="navbar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Log In</Link></li>
          {/* <li><Link to="/project">Project</Link></li> */}
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
export default NavBar;
