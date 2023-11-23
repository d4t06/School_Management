import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/app";
import { useEffect, useRef } from "react";
import { serverTimestamp } from "firebase/firestore";
import { mySetDoc } from "../utils/firebaseHelpers";
import { useAuthStore } from "../stores/AuthContext";
import { sleep } from "../utils/appHelper";
import loadingGif from "../assets/loading.gif";
import { getAllAccounts } from "../services/AccountServices";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export default function Auth() {
   const [loggedInUser, loading] = useAuthState(auth);
   const { setUserInfo, userInfo } = useAuthStore();
   const RanAuth = useRef(false);

   const navigate = useNavigate();

   const handleUserLogged = async () => {
      try {
         const allAccounts = await getAllAccounts();
         if (!allAccounts) return navigate("/error");

         const foundedAcc = allAccounts.find((acc) => loggedInUser?.email === acc.email);
         if (!foundedAcc) return navigate("/unauthorized");

         await sleep(1000);
         // update user doc
         await mySetDoc({
            collection: "accounts",
            data: {
               email: loggedInUser?.email,
               latest_seen: serverTimestamp(),
               image_url: loggedInUser?.photoURL,
               display_name: loggedInUser?.displayName,
            },
            id: loggedInUser?.email as string,
         });

         // update local user info
         setUserInfo({
            status: "finish",
            email: loggedInUser?.email as string,
            display_name: loggedInUser?.displayName as string,
            image_url: loggedInUser?.photoURL as string,
            role: foundedAcc.role,
         });
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      if (loading) return;

      if (!loggedInUser) {
         setUserInfo({
            status: "finish",
         });

         return;
      }

      if (!RanAuth.current) {
         RanAuth.current = true;

         handleUserLogged();
      }
   }, [loading]);

   if (userInfo.status === "loading")
      return (
         <div className="flex items-center h-screen justify-center">
            <img src={loadingGif} />
         </div>
      );

   return loggedInUser?.email ? <Outlet /> : <Navigate replace to={"/login"} />;
}
