import { useAuthStore } from "@/stores/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

type Props = {
   allowedRole: string[];
};

function RequireAuth({ allowedRole }: Props) {
   const { userInfo } = useAuthStore();

   return !!allowedRole?.find((role) => userInfo.role === role) ? (
      <Outlet />
   ) : (
      <Navigate to="/unauthorized" />
   );
}

export default RequireAuth;
