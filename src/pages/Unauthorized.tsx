import { Button } from "@/components";
import { auth } from "@/config/app";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Unauthorized() {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth);
    navigate("/login");
  };

  return (
    <div className={`flex flex-col justify-center items-center min-h-screen`}>
      <h1 className={`text-[30px] font-bold border border-[#333] p-[10px] text-#333`}>
        Hiện bạn không thể truy nội dung này!
      </h1>

      <Button
        className="text-[28px] mt-[20px] font-semibold shadow-lg bg-slate-800 text-white"
        onClick={handleLogout}
        variant="primary"
      >
        Thoát
      </Button>
    </div>
  );
}

export default Unauthorized;
