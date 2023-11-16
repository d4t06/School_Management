import {
  AcademicCapIcon,
  ArrowLeftOnRectangleIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
  CalendarIcon,
  HomeIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { MenuItem } from ".";
import { useAuthStore } from "../stores/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../config/app";

function Sidebar() {
  const { userInfo } = useAuthStore();

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div className="w-[150px] fixed left-0 top-[50px] bottom-0 border-r border-[#000.1]">
      <div className="flex flex-col pl-[10px] pt-[30px] gap-[12px]">
        <MenuItem to="/" icon={<HomeIcon className="w-[18px]" />} label="Trang chủ" />
        <MenuItem to="/" icon={<CalendarIcon className="w-[18px]" />} label="Lịch dạy" />
        <MenuItem
          to="/teacher"
          icon={<BriefcaseIcon className="w-[18px]" />}
          label="Giáo viên"
        />
        <MenuItem
          to="/student"
          icon={<UsersIcon className="w-[18px]" />}
          label="Học sinh"
        />
        <MenuItem
          to="/class"
          icon={<BuildingLibraryIcon className="w-[18px]" />}
          label="Lớp học"
        />
        <MenuItem
          to="/subject"
          icon={<AcademicCapIcon className="w-[18px]" />}
          label="Môn học"
        />
        <MenuItem
          to="/account"
          icon={<UserCircleIcon className="w-[18px]" />}
          label="Tài khoản"
        />

        {userInfo.email && (
          <button
            className={"w-full flex flex-row justify-between items-center group "}
            onClick={handleLogout}
          >
            <div className="inline-flex gap-[6px] group-hover:text-[#cd1818]">
              <ArrowLeftOnRectangleIcon className="w-[18px]" />
              <span className="text-[14px] font-semibold">Đăng xuất</span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
