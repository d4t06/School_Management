import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/AuthContext";
import Image from "./Image";

function Header() {
  const { userInfo } = useAuthStore();

  return (
    <div className="h-[50px] border-b border-[#000.1] px-[10px] flex justify-between items-center">
      <Link to={"/"}>
        <h1 className="text-20px font-semibold">Hệ thống quản lý trường tiểu học</h1>
      </Link>

      <div className="flex items-center">
        <h2>{userInfo.display_name || "no user"}</h2>
        <div className="ml-[8px] w-[30px] h-[30px] rounded-full overflow-hidden">
          <Image src={userInfo.image_url} />
        </div>
      </div>
    </div>
  );
}

export default Header;
