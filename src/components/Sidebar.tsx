import { HomeIcon } from "@heroicons/react/24/outline";
import { MenuItem } from ".";

function Sidebar() {
  return (
    <div className="w-[150px] fixed left-0 top-[50px] bottom-0 border-r border-[#000.1]">
      <div className="flex flex-col pl-[10px] pt-[30px] gap-[12px]">
      <MenuItem to="/" icon={<HomeIcon className="w-[18px]"/>} label="Trang chủ" />
      <MenuItem to="/" icon={<HomeIcon className="w-[18px]"/>} label="Trang chủ" />
      <MenuItem to="/" icon={<HomeIcon className="w-[18px]"/>} label="Trang chủ" />
      <MenuItem to="/" icon={<HomeIcon className="w-[18px]"/>} label="Trang chủ" />
      </div>
    </div>
  );
}

export default Sidebar;
