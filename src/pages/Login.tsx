import { useEffect } from "react";
import { useAuthActions } from "../stores/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/app";
import { Navigate } from "react-router-dom";
import { Button } from "../components";

function Login() {
   const { logIn } = useAuthActions();
   const [loggedInUser] = useAuthState(auth);

   const handleLogIn = async () => {
      try {
         await logIn();
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      if (loggedInUser?.email) {
         <Navigate to="/" />;
         return;
      }
   }, []);

   return (
      <div className="flex h-screen items-center justify-center">
         <Button
            className="text-[28px] font-semibold shadow-lg bg-slate-800 text-white"
            onClick={handleLogIn}
            variant="primary"
         >
            Login with Google
         </Button>
      </div>
   );
}

export default Login;
