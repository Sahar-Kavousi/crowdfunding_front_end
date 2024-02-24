import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
function LoginPage() {
  return (
    <div className="p-4">
      <LoginForm />
      <div></div>
      <p>
        If you don't have user, Signup
        <Link
          className="text-3xl font-bold underline ml-2 text-red-700"
          to="/signup"
        >
          here!
        </Link>
      </p>
    </div>
  );
}
export default LoginPage;
