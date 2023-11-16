import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/app";
import { ReactNode, useEffect, useRef, useState } from "react";
import { serverTimestamp } from "firebase/firestore";
import { mySetDoc } from "../utils/firebaseHelpers";
import { useAuthStore } from "../stores/AuthContext";
import { sleep } from "../utils/appHelper";
import loadingGif from "../assets/loading.gif";
import { getAllAccounts } from "../services/AccountServices";
import { signOut } from "firebase/auth";
import { Navigate, Outlet } from "react-router-dom";

export default function Auth() {
   const [loggedInUser, loading] = useAuthState(auth);
   const { setUserInfo, userInfo } = useAuthStore();
   const [error, setError] = useState(false);
   const RanAuth = useRef(false);

   const Forbidden = (
      <div className="flex items-center min-h-screen justify-center">
         <h1 className="text-center text-[30px] border border-[#000] py-[4px] px-[16px]">
            Hiện bạn không thể truy cập trang web này!
         </h1>
      </div>
   );

   const handleUserLogged = async () => {
      try {
         const allAccounts = await getAllAccounts();
         if (!allAccounts) {
            setError(true);
            return;
         }
         const index = allAccounts.find((acc) => loggedInUser?.email === acc.email);

         if (!index) {
            await signOut(auth);

            setError(true);
            return;
         }

         await sleep(2000);

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

         // await sleep(1000);

         setUserInfo({
            status: "finish",
            email: loggedInUser?.email as string,
            display_name: loggedInUser?.displayName as string,
            image_url: loggedInUser?.photoURL as string,
         });
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      if (error) return;
      if (loading) return;

      if (loggedInUser && !RanAuth.current) {
         RanAuth.current = false;
         handleUserLogged();
      }
   }, [loggedInUser, loading]);

   if (error) return Forbidden;

   if (loading || (loggedInUser && userInfo.status === "loading"))
      return (
         <div className="flex items-center h-screen justify-center">
            <img src={loadingGif} />
         </div>
      );

   return loggedInUser?.email ? <Outlet /> : <Navigate replace to={"/login"} />;
}
