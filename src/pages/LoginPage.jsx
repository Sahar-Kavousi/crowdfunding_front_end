import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
// import { AiOutlineGooglePlus } from "react-icons/ai";
function LoginPage() {
  return (
    <div className="p-4">
      <LoginForm />
      <div className="m-4 bg-blue-400 border-spacing-4">
        {/* <AiOutlineGooglePlus className="flex text-red-400 text-lg" /> */}
      </div>
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
