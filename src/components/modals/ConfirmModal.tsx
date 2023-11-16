import { Dispatch, SetStateAction } from "react";
import { Button } from "..";
import { ThemeType } from "../../types";

export default function ConfirmModal({
   loading,
   callback,
   label,
   setOpenModal,
   buttonLabel,
   desc,
   className,
}: {
   callback: () => void;
   label?: string;
   desc?: string;
   buttonLabel?: string;
   loading: boolean;
   className?: string;
   setOpenModal: Dispatch<SetStateAction<boolean>>;
}) {
   return (
      <div
         className={`${className || "w-[400px] max-w-[calc(90vw-40px)]"} ${
            loading ? "opacity-60 pointer-events-none" : ""
         }`}
      >
         <h1 className="text-[20px] font-semibold">{label || "Wait a minute"}</h1>
         <p className=" text-[16px] font-semibold text-red-500">
            {desc || "This action cannot be undone"}
         </p>

         <div className="flex gap-[10px] mt-[20px]">
            <Button
               className={`bg-red-500 rounded-full`}
               variant={"primary"}
               onClick={callback}
            >
               {buttonLabel || "Yes please"}
            </Button>
            <Button
               onClick={() => setOpenModal(false)}
               className={`bg-slate-800 rounded-full`}
               variant={"primary"}
            >
               Close
            </Button>
         </div>
      </div>
   );
}
