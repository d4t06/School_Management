import React, { FormEvent, useEffect, useRef, useState } from "react";
import { StudentType } from "../types/index";
import Table from "../components/Table";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components";
import { getAllStudent } from "../services/StudentServices";
import { convertTimestampToString } from "../utils/appHelper";
import { Timestamp } from "firebase/firestore";

function Student() {
   const [students, setStudents] = useState<StudentType[]>([]);
   const ranUseEffect = useRef(false);

   const navigate = useNavigate();

   const handleSubmit = (e: FormEvent) => {};

   useEffect(() => {
      const getStudents = async () => {
         const students = await getAllStudent();

         if (students?.length) {
            setStudents(students);
         }
      };
      if (!ranUseEffect.current) {
         getStudents();
         ranUseEffect.current = true;
      }
   }, []);

   const classes = {
      label: "text-[14px]",
      th: "bg-slate-800 text-[#fff] font-medium text-left px-[6px]",
      td: "px-[6px] py-[4px] border-b",
      input: "w-[200px] outline-none h-[28px] px-[10px] rounded-[4px] border-[1px] text-[#000]",
   };

   return (
      <div className="">
         <div className="flex justify-between items-center">
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
            </div>
            <div className="flex">
               <Button
                  onClick={() => navigate("/add-student")}
                  className="bg-slate-800 "
                  variant="primary"
               >
                  Thêm học sinh
               </Button>
            </div>
         </div>

         <Table
            colList={["Mã số", "Họ và tên", "Lớp ", "Giới tính", "Ngày sinh", "Nơi sinh"]}
         >
            {students.map((item, index) => (
               <tr key={index}>
                  <td className={classes.td}>{item.id}</td>
                  <td className={classes.td}>
                     <Link
                        className="w-full hover:text-slate-800"
                        to={`/student/${item.id}`}
                     >
                        {item.full_name}
                     </Link>
                  </td>
                  <td className={classes.td}>-</td>
                  <td className={classes.td}>-</td>
                  <td className={classes.td}>
                     {convertTimestampToString(item.birthday)}
                  </td>
                  <td className={classes.td}>-</td>
               </tr>
            ))}
         </Table>
      </div>
   );
}

export default Student;
