import SignUpForm from "../components/SignUpForm";
import { Link } from "react-router-dom";

function SignUpPage() {
  return (
    <div>
      <SignUpForm />
      <p>
        If you have user, login <Link to="/login">here!</Link>
      </p>
    </div>
  );
}

export default SignUpPage;
