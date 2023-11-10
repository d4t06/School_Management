import React from "react";
import { useAuthActions } from "../stores/AuthContext";

function Login() {
  const { logIn } = useAuthActions();

  //   methods
  const handleLogIn = async () => {
    try {
      await logIn();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex h-screen items-center justify-center">
      <button onClick={handleLogIn} className="py-[10px] bg-white px-[20px] shadow-[4px_6px_10px_rgba(0,0,0,0.2)] hover:brightness-90">
        Login with Google
      </button>
    </div>
  );
}

export default Login;
