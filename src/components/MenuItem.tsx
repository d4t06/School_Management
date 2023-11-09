import { Link } from "react-router-dom";
import { ReactNode } from "react";

type Props = {
  className?: string;
  icon: ReactNode;
  label: string;
  to: string;
};

export default function LinkItem({ className, icon, label, to }: Props) {
  return (
    <Link
      className={"w-full flex flex-row justify-between items-center group " + className}
      to={to}
    >
      <div className="inline-flex gap-[6px] group-hover:text-[#cd1818]">
        {icon}
        <span className="text-[14px] font-medium">{label}</span>
      </div>
    </Link>
  );
}
