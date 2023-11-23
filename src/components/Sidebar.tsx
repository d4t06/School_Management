import {
   AcademicCapIcon,
   ArrowLeftOnRectangleIcon,
   BookOpenIcon,
   BriefcaseIcon,
   BuildingLibraryIcon,
   CalendarIcon,
   HomeIcon,
   RectangleGroupIcon,
   UserCircleIcon,
   UsersIcon,
} from "@heroicons/react/24/outline";
import { MenuItem } from ".";
import { useAuthStore } from "../stores/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../config/app";
import { useLocation } from "react-router-dom";

function Sidebar() {
   const { userInfo } = useAuthStore();

   const location = useLocation();

   const handleLogout = () => {
      signOut(auth);
   };

   return (
      <div className="w-[150px] fixed left-0 top-[50px] bottom-0 border-r border-[#000.1]">
         <div className="flex flex-col pl-[10px] pt-[30px] gap-[12px]">
            <MenuItem
               className={`${location.pathname === "/" ? "text-[#cd1818]" : ""}`}
               to="/"
               icon={<HomeIcon className="w-[18px]" />}
               label="Trang chủ"
            />

            {userInfo.role === "R1" ? (
               <>
                  <MenuItem
                     className={`${
                        location.pathname.includes("teacher") ? "text-[#cd1818]" : ""
                     }`}
                     to="/teacher"
                     icon={<BriefcaseIcon className="w-[18px]" />}
                     label="Giáo viên"
                  />
                  <MenuItem
                     className={`${
                        location.pathname.includes("student") ? "text-[#cd1818]" : ""
                     }`}
                     to="/student"
                     icon={<UsersIcon className="w-[18px]" />}
                     label="Học sinh"
                  />
                  <MenuItem
                     className={`${
                        location.pathname.includes("class") ? "text-[#cd1818]" : ""
                     }`}
                     to="/class"
                     icon={<BuildingLibraryIcon className="w-[18px]" />}
                     label="Lớp học"
                  />

                  <MenuItem
                     className={`${
                        location.pathname.includes("subject") ? "text-[#cd1818]" : ""
                     }`}
                     to="/subject"
                     icon={<RectangleGroupIcon className="w-[18px]" />}
                     label="Môn học"
                  />
                  <MenuItem
                     className={`${
                        location.pathname.includes("account") ? "text-[#cd1818]" : ""
                     }`}
                     to="/account"
                     icon={<UserCircleIcon className="w-[18px]" />}
                     label="Tài khoản"
                  />
               </>
            ) : (
               <>
                  <MenuItem
                     className={`${
                        location.pathname.includes("student") ? "text-[#cd1818]" : ""
                     }`}
                     to="/"
                     icon={<CalendarIcon className="w-[18px]" />}
                     label="Giảng dạy"
                  />

                  <MenuItem
                     className={`${
                        location.pathname.includes("student") ? "text-[#cd1818]" : ""
                     }`}
                     to="/"
                     icon={<BookOpenIcon className="w-[18px]" />}
                     label="Lớp học"
                  />
               </>
            )}

            {userInfo.email && (
               <button
                  className={"w-full flex flex-row justify-between items-center group "}
                  onClick={handleLogout}
               >
                  <div className="inline-flex gap-[6px] group-hover:text-[##cd1818]">
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
