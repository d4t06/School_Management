import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function Navigation() {

   const navigate = useNavigate()

   const params = useParams()

   const back = () => {
      navigate(-1)
   }

   const forward = () => {
      navigate(+1)
   }

   return (
      <div className="inline-flex gap-[10px] mb-[20px]">
         <button onClick={back} className="p-[6px] rounded-full bg-[#999] hover:brightness-90">
            <ChevronLeftIcon className="w-[18px] text-[#fff]" />
         </button>
         <button onClick={forward} className="p-[6px] rounded-full bg-[#999] opacity-60 pointer-events-none">
            <ChevronRightIcon className="w-[18px] text-[#fff]" />
         </button>
      </div>
   );
}

export default Navigation;
