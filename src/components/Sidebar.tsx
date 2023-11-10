import { AcademicCapIcon, BriefcaseIcon, BuildingLibraryIcon, CalendarIcon, HomeIcon, UsersIcon } from "@heroicons/react/24/outline";
import { MenuItem } from ".";

function Sidebar() {
  return (
    <div className="w-[150px] fixed left-0 top-[50px] bottom-0 border-r border-[#000.1]">
      <div className="flex flex-col pl-[10px] pt-[30px] gap-[12px]">
      <MenuItem to="/" icon={<HomeIcon className="w-[18px]"/>} label="Trang chủ" />
      <MenuItem to="/" icon={<CalendarIcon className="w-[18px]"/>} label="Lịch dạy" />
      <MenuItem to="/teacher" icon={<BriefcaseIcon className="w-[18px]"/>} label="Giáo viên" />
      <MenuItem to="/student" icon={<UsersIcon className="w-[18px]"/>} label="Học sinh" />
      <MenuItem to="/grade" icon={<BuildingLibraryIcon className="w-[18px]"/>} label="Lớp học" />
      <MenuItem to="/subject" icon={<AcademicCapIcon className="w-[18px]"/>} label="Môn học" />
      </div>
    </div>
  );
}

export default Sidebar;
