import { useEffect, useRef, useState } from "react";
import { Navigation, Button, MyInput, Modal } from "../components";
import {
   ClipboardDocumentListIcon,
   PencilSquareIcon,
   PrinterIcon,
} from "@heroicons/react/24/outline";
import { StudentType } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import { myDeleteDoc, myGetDoc } from "../utils/firebaseHelpers";
import ConfirmModal from "../components/modals/ConfirmModal";
import { editStudent, getStudent, initStudentObject } from "../services/StudentServices";

function StudentDetail() {
   const [edit, setEdit] = useState(false);
   const [student, setStudent] = useState<StudentType>(initStudentObject({}));

   const [isOpenModal, setIsOpenModal] = useState(false);
   const [loading, setLoading] = useState(false);

   const modalName = useRef<"delete" | "restore">("delete");
   const ranUseEffects = useRef(false);
   const prefStudentData = useRef<StudentType>(student);
   const param = useParams();
   const navigate = useNavigate();

   const classes = {
      cta: "inline-flex gap-[4px]",
   };

   const handleSetData = (name: keyof typeof student, value: any) => {
      setStudent((prev) => ({ ...prev, [name]: value }));
   };

   const handleEditStudent = () => {
      setEdit(true);
      prefStudentData.current = { ...student };
   };

   const handleRetoreStudent = () => {
      setEdit(false);
      setStudent(prefStudentData.current);
      setIsOpenModal(false);
   };

   const deleteStudent = async () => {
      setLoading(true);
      await myDeleteDoc({ collection: "students", id: param.id as string });
      setLoading(false);
      navigate("/student");
   };

   const openModal = (name: typeof modalName.current) => {
      setIsOpenModal(true);
      modalName.current = name;
   };

   useEffect(() => {
      const handleGetStudent = async () => {
         if (!param.id) return;

         const student = await getStudent(param.id);
         if (student) {
            setStudent(student);
         }
      };

      if (!ranUseEffects.current) {
         handleGetStudent();
         ranUseEffects.current = true;
      }
   }, []);

   const handleSubmit = async () => {
      setLoading(true);
      await editStudent(student.id, student);
      setLoading(false);
      setEdit(false);
   };

   if (!student) return <h1>No student jet</h1>;

   return (
      <div>
         <Navigation className="mb-[30px]"/>

         <div
            className={`flex gap-[20px] ${
               loading ? "pointer-events-none opacity-60" : ""
            }`}
         >
            <div className="w-[20%] flex-shrink-0">
               <div className="w-full pt-[100%] bg-[#ccc] rounded-[6px]"></div>
               <div className="flex flex-wrap gap-[10px] mt-[12px]">
                  {!edit ? (
                     <>
                        <Button onClick={handleEditStudent} className={classes.cta}>
                           <PencilSquareIcon className="w-[20px]" /> Sửa
                        </Button>
                        <Button className={classes.cta}>
                           <ClipboardDocumentListIcon className="w-[20px]" /> Nhập điểm
                        </Button>

                        <Button className={classes.cta}>
                           <PrinterIcon className="w-[20px]" /> In bảng điểm
                        </Button>
                     </>
                  ) : (
                     <>
                        <Button
                           onClick={handleSubmit}
                           className="bg-emerald-500 text-[#fff]"
                           variant="primary"
                        >
                           Lưu
                        </Button>
                        <Button
                           className="bg-[#cd1818] text-[#fff]"
                           variant="primary"
                           onClick={() => openModal("restore")}
                        >
                           Bỏ
                        </Button>
                     </>
                  )}
               </div>

               {!edit && (
                  <Button
                     className="bg-[#cd1818] text-[#fff] mt-[30px]"
                     variant="primary"
                     onClick={() => openModal("delete")}
                  >
                     Xóa học sinh
                  </Button>
               )}
            </div>

            <div className="w-full h-full">
               <div className={`flex gap-[10px]`}>
                  <MyInput
                     readOnly={!edit}
                     onChange={(e) => handleSetData("full_name", e.target.value)}
                     title="Học và tên"
                     value={student.full_name}
                  />
                  <MyInput
                     readOnly={!edit}
                     onChange={(e) => handleSetData("id", e.target.value)}
                     title="Mã số"
                     value={student.id}
                  />
               </div>
            </div>
         </div>

         {isOpenModal && (
            <Modal setOpenModal={setIsOpenModal}>
               {modalName.current === "delete" && (
                  <ConfirmModal
                     label="Xóa Học sinh"
                     loading={loading}
                     setOpenModal={setIsOpenModal}
                     callback={deleteStudent}
                  />
               )}

               {modalName.current === "restore" && (
                  <ConfirmModal
                     label="Bỏ thay đổi"
                     loading={loading}
                     setOpenModal={setIsOpenModal}
                     callback={handleRetoreStudent}
                  />
               )}
            </Modal>
         )}
      </div>
   );
}

export default StudentDetail;
