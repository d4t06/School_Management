import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/app";
import { ReactNode, useEffect, useRef } from "react";
import { serverTimestamp } from "firebase/firestore";
import { mySetDoc } from "../utils/firebaseHelpers";
import { useAuthStore } from "../stores/AuthContext";
import { Login } from "../pages";
import { sleep } from "../utils/appHelper";
import loadingGif from "../assets/loading.gif";

export default function Auth({ children }: { children: ReactNode }) {
  const [loggedInUser, loading] = useAuthState(auth);
  const { setUserInfo, userInfo } = useAuthStore();
  const RanAuth = useRef(false);

  const handleUserLogged = async () => {
    try {
      await sleep(2000);

      await mySetDoc({
        collection: "users",
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
        image_url: loggedInUser?.photoURL as string
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loading) return;

    if (loggedInUser && !RanAuth.current) {
      RanAuth.current = false;
      handleUserLogged();
    }
  }, [loggedInUser, loading]);

  if (loading || (loggedInUser && userInfo.status === "loading"))
    return (
      <div className="flex items-center h-screen justify-center">
        <img src={loadingGif} />
      </div>
    );
  if (!loggedInUser) return <Login />;

  return children;
}
