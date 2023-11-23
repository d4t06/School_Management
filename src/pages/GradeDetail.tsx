import { useState, useRef, useEffect, FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Modal, MyInput, Navigation } from "../components";
import { ArrowDownTrayIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import { initClassRoomObject } from "@/services/ClassServices";
import { generateQueryString } from "@/utils/appHelper";
import { collection, getDocs, query, where } from "firebase/firestore";
import { ClassRoom } from "@/types";
import ModalHeader from "@/components/modals/ModalHeader";
import { useToast } from "@/stores/ToastContext";
import { mySetDoc } from "@/utils/firebaseHelpers";
import { db } from "@/config/app";

function GradeDetail() {
   const [classData, setClassData] = useState(initClassRoomObject({}));
   const [classRooms, setClassRooms] = useState<ClassRoom[]>([]);
   const [isOpenModal, setIsOpenModal] = useState(false);
   const { setErrorToast, setSuccessToast } = useToast();
   const [loading, setLoading] = useState(false);

   const ranUseEffect = useRef(false);
   const inputRef = useRef<HTMLInputElement>(null);

   // use hooks
   const params = useParams<{
      school_year_id: string;
      grade_id: string;
   }>();

   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();

      if (classData.id === "" || classData.className === "") {
         setErrorToast({});
         return;
      }

      try {
         setLoading(true);

         await mySetDoc({
            collection: "classes",
            data: {
               ...classData,
               school_year_id: params.school_year_id,
               grade_id: params.grade_id,
            } as ClassRoom,
            id: classData.id,
         });
         setClassRooms((prev) => [...prev, classData]);
         setSuccessToast({ message: "Thêm năm học thành công" });
      } catch (error) {
         console.log(error);
         setErrorToast({});
      } finally {
         setLoading(false);
         setIsOpenModal(false);
      }
   };

   const handleSetData = (name: keyof typeof classData, value: any) => {
      if (name === "capacity") value = +value;
      setClassData((prev) => ({ ...prev, [name]: value }));
   };

   useEffect(() => {
      const getClassRoom = async () => {
         const queryGetAllClassRoom = query(
            collection(db, "classes"),
            where("school_year_id", "==", params.school_year_id),
            where("grade_id", "==", params.grade_id)
         );
         const classRoomsSap = await getDocs(queryGetAllClassRoom);

         if (classRoomsSap.docs) {
            const classRooms = classRoomsSap.docs.map((doc) => doc.data() as ClassRoom);

            setClassRooms(classRooms);
         }
      };

      if (!ranUseEffect.current) {
         getClassRoom();
         ranUseEffect.current = true;
      }
   }, []);

   const classes = {
      boxWrapper:
         "w-[20%]  text-[#fff] px-[8px] transition-transform   hover:translate-y-[-5px]",
      boxPD: "pt-[100%] rounded-[8px] relative w-full bg-slate-800",
      boxContent: "absolute inset-0 flex flex-col items-center justify-center",
      largeText: "text-[20px] font-bold",
   };

   return (
      <div className="">
         <div className="flex justify-between items-center mb-[30px]">
            <Navigation />
            <Button
               onClick={() => setIsOpenModal(true)}
               className="bg-slate-800 "
               variant="primary"
            >
               <PlusSmallIcon className="w-[25px]" />
               Thêm lớp học
            </Button>
         </div>
         <div className="flex flex-wrap -mx-[8px] gap-y-[16px]">
            {!loading && (
               <>
                  {classRooms.length ? (
                     <>
                        {classRooms.map((item, index) => (
                           <Link key={index} to={item.id} className={classes.boxWrapper}>
                              <div className={classes.boxPD}>
                                 <div className={classes.boxContent}>
                                    <h1 className={classes.largeText}>
                                       {item.className}
                                    </h1>
                                 </div>
                              </div>
                           </Link>
                        ))}
                     </>
                  ) : (
                     "No class jet..."
                  )}
               </>
            )}
         </div>

         {isOpenModal && (
            <Modal setOpenModal={setIsOpenModal}>
               <ModalHeader setIsOpenModal={setIsOpenModal} title="Thêm lớp học" />
               <div
                  className={`w-[600px] ${
                     loading ? "opacity-60 pointer-events-none " : ""
                  }`}
               >
                  <form
                     onSubmit={handleSubmit}
                     action=""
                     className="flex flex-col items-start gap-[12px]"
                  >
                     <div className={`flex -mx-[10px] w-full`}>
                        <MyInput
                           width={"w-[50%] px-[10px]"}
                           ref={inputRef}
                           onChange={(e) => handleSetData("className", e.target.value)}
                           className=""
                           title="Tên lớp"
                           value={classData.className}
                        />
                        <MyInput
                           width={"w-[50%] px-[10px]"}
                           onChange={(e) => handleSetData("id", e.target.value)}
                           title="Mã số"
                           value={classData.id}
                        />
                     </div>

                     <div className={`flex -mx-[10px] w-full`}>
                        <MyInput
                           width={"w-[50%] px-[10px]"}
                           ref={inputRef}
                           onChange={(e) => handleSetData("capacity", e.target.value)}
                           className=""
                           title="Sức chứa"
                           value={classData.capacity}
                        />
                        <MyInput
                           width={"w-[50%] px-[10px]"}
                           readOnly
                           title="Giáo viên chủ nhiệm"
                        />
                     </div>

                     <Button
                        type="submit"
                        variant="primary"
                        className="bg-slate-800 text-white mt-[20px]"
                     >
                        <ArrowDownTrayIcon className="w-[25px]" /> Thêm
                     </Button>
                  </form>
               </div>
            </Modal>
         )}
      </div>
   );
}

export default GradeDetail;
