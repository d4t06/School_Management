import { FormEvent, useEffect, useRef, useState } from "react";
import Table from "../components/Table";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components";
import { TeacherType } from "../types";
import { generateQueryString } from "../utils/appHelper";
import { getDocs } from "firebase/firestore";

function Teacher() {
   const navigate = useNavigate();
   const [teachers, setTeachers] = useState<TeacherType[]>([]);
   const ranUseEffect = useRef(false);

   useEffect(() => {
      const getTeachers = async () => {
         const queryGetAllTeachers = generateQueryString("teachers");
         const teacherSnapshot = await getDocs(queryGetAllTeachers);

         if (teacherSnapshot.docs.length) {
            const teachers = teacherSnapshot.docs.map((doc) => doc.data() as TeacherType);
            setTeachers(teachers);
         }
      };
      if (!ranUseEffect.current) {
         getTeachers();
         ranUseEffect.current = true;
      }
   }, []);

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
         <div className="flex items-center justify-between">
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
            </div>
            <div className="flex">
               <Button
                  onClick={() => navigate("/add-teacher")}
                  className="bg-slate-800 "
                  variant="primary"
               >
                  Thêm giáo viên
               </Button>
            </div>
         </div>

         <Table colList={["Mã số GV", "Họ và tên", "Giới tính", "Ngày sinh", "Nơi sinh"]}>
            {teachers.map((item, index) => (
               <tr key={index}>
                  <td className={classes.td}>{item.id}</td>
                  <td className={classes.td}>
                     <Link
                        className="w-full hover:text-slate-800"
                        to={`/teacher/${item.id}`}
                     >
                        {item.full_name}
                     </Link>
                  </td>
                  <td className={classes.td}>-</td>
                  <td className={classes.td}>-</td>
                  <td className={classes.td}>-</td>
               </tr>
            ))}
         </Table>
      </div>
   );
}

export default Teacher;
