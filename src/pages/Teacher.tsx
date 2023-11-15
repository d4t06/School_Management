import React, { FormEvent } from "react";
import Table from "../components/Table";
import { Link } from "react-router-dom";

function Teacher() {
   const classes = {
      label: "text-[14px]",
      th: "bg-slate-800 text-[#fff] font-medium text-left px-[6px]",
      td: "px-[6px] py-[4px] border-b",
      input: "w-[200px] outline-none h-[28px] px-[10px] rounded-[4px] border-[1px] text-[#000]",
   };

   const handleSubmit = (e: FormEvent) => {
      e.preventDefault();

      console.log("submit");
   };

   return (
      <div className="">
         <form onSubmit={handleSubmit} action="" className="">
            <div className="flex gap-[12px]">
               <div className="flex flex-col">
                  <label htmlFor="maSo" className={classes.label}>
                     Mã số giáo viên:
                  </label>
                  <input
                     type="text"
                     id="maSo"
                     className={classes.input}
                     placeholder="B21101"
                  />
               </div>
            </div>
         </form>

         <button className="py-[4px] mb-[30px] px-[10px] bg-emerald-500 text-white rounded-[6px] mt-[8px]">
            Kết quả: 10
         </button>

         <Table
            colList={["Mã số GV", "Họ và tên", "Giới tính", "Ngày sinh", "Nơi sinh"]}
         >
            {[...Array(10).keys()].map((item, index) => (
               <tr key={index}>
                  <td className={classes.td}>B2110118</td>
                  <td className={classes.td}>
                     <Link
                        className="w-full hover:text-slate-800"
                        to={"/student/B2110118"}
                     >
                        Nguyễn Văn A
                     </Link>
                  </td>
                  <td className={classes.td}>Nam</td>
                  <td className={classes.td}>10/7/2003</td>
                  <td className={classes.td}>An Giang</td>
               </tr>
            ))}
         </Table>
      </div>
   );
}

export default Teacher;
