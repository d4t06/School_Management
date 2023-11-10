import React, { FormEvent, useState } from "react";
import { StudentType } from "../types/index";
import Table from "../components/Table";
import { Link } from "react-router-dom";
import { EyeIcon, PencilIcon } from "@heroicons/react/24/outline";

function Student() {
   const [students, setStudents] = useState<StudentType[]>([]);

   const handleSubmit = (e: FormEvent) => {};

   const classes = {
      label: "text-[14px]",
      th: "bg-[#cd1818] text-[#fff] font-medium text-left px-[6px]",
      td: "px-[6px] py-[4px] border-b",
      input: 'w-[200px] outline-none h-[28px] px-[10px] rounded-[4px] border-[1px] text-[#000]'
   };

   return (
      <div className="">
         <form onSubmit={handleSubmit} action="" className="">
            <div className="flex gap-[12px]">
               <div className="flex flex-col">
                  <label htmlFor="maSo" className={classes.label}>
                     Mã số học sinh:
                  </label>
                  <input
                     type="text"
                     id="maSo"
                     className={classes.input}
                     placeholder="B21101"
                  />
               </div>

               <div className="flex flex-col">
                  <label htmlFor="maSo" className={classes.label}>
                     Khối:
                  </label>
                  <input
                     type="text"
                     id="maSo"
                     className="w-[100px] outline-none h-[28px] px-[10px] rounded-[4px] border-[1px] text-[#000]"
                     placeholder="1"
                  />
               </div>

               <div className="flex flex-col">
                  <label htmlFor="maSo" className={classes.label}>
                     Lớp:
                  </label>
                  <input
                     type="text"
                     id="maSo"
                     className="w-[100px] outline-none h-[28px] px-[10px] rounded-[4px] border-[1px] text-[#000]"
                     placeholder="1A"
                  />
               </div>
            </div>
         </form>

         <button className="py-[4px] mb-[30px] px-[10px] bg-emerald-500 text-white rounded-[6px] mt-[8px]">
            Kết quả: 10
         </button>

         <Table
            colList={["Mã số", "Họ và tên", "Lớp ", "Giới tính", "Ngày sinh", "Nơi sinh"]}
         >
            {[...Array(10).keys()].map((item, index) => (
               <tr key={index}>
                  <td className={classes.td}>B2110118</td>
                  <td className={classes.td}>
                     <Link className="w-full hover:text-[#cd1818]" to={"/student/B2110118"}>
                        Nguyễn Văn A
                     </Link>
                  </td>
                  <td className={classes.td}>5A</td>
                  <td className={classes.td}>Nam</td>
                  <td className={classes.td}>10/7/2003</td>
                  <td className={classes.td}>An Giang</td> 
               </tr>
            ))}
         </Table>
      </div>
   );
}

export default Student;
