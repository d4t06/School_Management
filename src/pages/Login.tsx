import { useEffect } from "react";
import { useAuthActions } from "../stores/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/app";
import { useNavigate } from "react-router-dom";

function Login() {
  const { logIn } = useAuthActions();
  const [loggedInUser] = useAuthState(auth);
  const navigate = useNavigate();

  //   methods
  const handleLogIn = async () => {
    try {
      await logIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loggedInUser?.email) {
      navigate("/");
    }
  }, []);
  return (
    <div className="flex h-screen items-center justify-center">
      <button
        onClick={handleLogIn}
        className="py-[10px] text-[28px] bg-white px-[20px] font-semibold shadow-[4px_6px_10px_rgba(0,0,0,0.2)] hover:brightness-90"
      >
        Login with Google
      </button>
    </div>
  );
}

export default Login;
