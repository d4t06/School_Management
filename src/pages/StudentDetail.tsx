import React, { FormEvent, useState } from "react";
import { Navigation, Form } from "../components";
import {
   ClipboardDocumentListIcon,
   LightBulbIcon,
   PencilSquareIcon,
   PrinterIcon,
} from "@heroicons/react/24/outline";

function StudentDetail() {
   const [edit, setEdit] = useState(false);
   const classes = {
      cta: "inline-flex gap-[4px] py-[4px] hover:text-[#cd1818] text-[14px]",
   };

   const formFields = [
      { label: "Họ và tên", name: "full_name", value: "init" },
      { label: "Mã số", name: "id" },
      { label: "Ngày sinh", name: "birthday" },
      { label: "Giới tính", name: "gender" },
      { label: "Lớp", name: "class" },
      { label: "Nới sinh", name: "place_of_birth" },
      { label: "Địa chỉ", name: "address", width: "w-full" },
   ];

   const onSubmit = (e: FormEvent, form:{}) => {
      e.preventDefault();

      console.log("submit", form);
      setEdit(false)
   };


   return (
      <div>
         <Navigation />

         <div className="flex gap-[20px] ">
            <div className="w-[20%] flex-shrink-0">
               <div className="w-full pt-[100%] bg-[#ccc] rounded-[6px]"></div>
               {/* <div className="w-[66%]">
               </div> */}
               <div className="flex flex-wrap gap-[10px] mt-[12px]">
                  {!edit && (
                     <>
                        <button onClick={() => setEdit(true)} className={classes.cta}>
                           <PencilSquareIcon className="w-[20px]" /> Sửa
                        </button>
                        <button className={classes.cta}>
                           <ClipboardDocumentListIcon className="w-[20px]" /> Nhập điểm
                        </button>

                        <button className={classes.cta}>
                           <LightBulbIcon className="w-[20px]" /> Hạnh kiểm
                        </button>

                        <button className={classes.cta}>
                           <PrinterIcon className="w-[20px]" /> In bảng điểm
                        </button>
                     </>
                  )}
               </div>
            </div>

            <div className="w-full h-full">
               <Form viewOnly={!edit} onSubmit={onSubmit} fields={formFields}>
                  <button type="submit" >luu</button>
               </Form>
            </div>
         </div>
      </div>
   );
}

export default StudentDetail;