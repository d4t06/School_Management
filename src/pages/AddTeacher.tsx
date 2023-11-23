import { useEffect, useRef, useState } from "react";
import { Button, Modal, MyInput } from "../components";
import { Account, TeacherType } from "../types";
import ConfirmModal from "../components/modals/ConfirmModal";
import { mySetDoc } from "../utils/firebaseHelpers";
import { initTeacherObject } from "../services/TeacherServices";
import { initAccountObject } from "../services/AccountServices";
import {
   ArrowDownTrayIcon,
   ArrowPathIcon,
   ChevronRightIcon,
   PlusSmallIcon,
} from "@heroicons/react/24/outline";
import { useToast } from "../stores/ToastContext";
import ModalHeader from "@/components/modals/ModalHeader";
import Table from "@/components/Table";
import { convertTimestampToString } from "@/utils/appHelper";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/app";

function AddTeacher() {
   const { setErrorToast, setSuccessToast } = useToast();
   const [teacherData, setTeacherData] = useState<TeacherType>(initTeacherObject({}));
   const [accounts, setAccounts] = useState<Account[]>([]);
   const [isOpenModal, setIsOpenModal] = useState(false);
   const [loading, setLoading] = useState(false);

   const inputRef = useRef<HTMLInputElement>(null);
   const modalName = useRef<"confirm" | "select_account">("confirm");

   const handleSetData = (name: keyof typeof teacherData, value: any) => {
      setTeacherData((prev) => ({ ...prev, [name]: value }));
   };

   const getAccounts = async () => {
      try {
         setLoading(true);
         const queryGetAccount = query(
            collection(db, "accounts"),
            where("role", "==", "R2"),
            where("teacher_id", "==", "")
         );
         const accountSnap = await getDocs(queryGetAccount);

         if (accountSnap.docs) {
            const accounts = accountSnap.docs.map((doc) => doc.data() as Account);
            setAccounts(accounts);
         }
      } catch (error) {
         console.log(error);
      } finally {
         setLoading(false);
      }
   };

   const openModal = (name: typeof modalName.current) => {
      setIsOpenModal(true);
      modalName.current = name;
   };

   const handleSelectAccount = (acc: Account) => {
      handleSetData("email", acc.email);
      setIsOpenModal(false);
   };

   const reSelectAcc = async () => {
      getAccounts();
      openModal("select_account");
   };

   const handleSubmit = async () => {
      if (
         teacherData.email === "" ||
         teacherData.full_name === "" ||
         teacherData.id === ""
      ) {
         setErrorToast({ message: "Vui long nhập đầy đủ thông tin giáo viên" });
         return;
      }

      setLoading(true);

      //  set teacher doc
      await mySetDoc({ collection: "teachers", data: teacherData, id: teacherData.id });

      //  set account doc
      await mySetDoc({
         collection: "accounts",
         data: { teacher_id: teacherData.id },
         id: teacherData.email,
      });

      setSuccessToast({ message: "Thêm giáo viên thành công" });
      setLoading(false);
   };

   const resetData = () => {
      setTeacherData(initTeacherObject({}));
      setIsOpenModal(false);
   };

   const continueAddStudent = async () => {
      await handleSubmit();
      setTeacherData(initTeacherObject({}));
      const inputElement = inputRef.current as HTMLInputElement;
      if (inputElement) {
         inputElement.focus();
      }
   };

   useEffect(() => {
      const inputEle = inputRef.current as HTMLInputElement;

      if (inputEle) {
         inputEle.focus();
      }
   }, []);

   const classes = {
      th: "bg-slate-800 text-[#fff] font-medium text-left px-[6px]",
      td: "px-[6px] py-[4px] border-b",
   };

   return (
      <div className="min-h-screen">
         <div
            className={`w-[500px] mx-auto ${
               loading ? "pointer-events-none opacity-60" : ""
            }`}
         >
            <div className={`flex gap-[10px]`}>
               <MyInput
                  ref={inputRef}
                  onChange={(e) => handleSetData("full_name", e.target.value)}
                  className=""
                  title="Họ và tên"
                  value={teacherData.full_name}
               />
               <MyInput
                  onChange={(e) => handleSetData("id", e.target.value)}
                  title="Mã số"
                  value={teacherData.id}
               />
            </div>
            {/* <MyInput
               onChange={(e) => handleSetData("email", e.target.value)}
               title="Email"
               value={teacherData.email}
            /> */}
            <div className="flex items-center mt-[10px]">
               <Button className="bg-slate-800" onClick={reSelectAcc} variant="primary">
                  Chọn tài khoản
               </Button>
               <p className="ml-[20px] font-bold">{teacherData.email}</p>
            </div>

            <div className="flex gap-[10px]">
               <Button
                  onClick={handleSubmit}
                  variant="primary"
                  className="bg-slate-800 text-white mt-[20px]"
               >
                  <ArrowDownTrayIcon className="w-[25px]" />
                  Thêm
               </Button>
               <Button
                  onClick={continueAddStudent}
                  variant="primary"
                  className="bg-slate-800 text-white mt-[20px]"
               >
                  <ChevronRightIcon className="w-[20px]" />
                  Tiếp tục
               </Button>
               <Button
                  onClick={() => openModal("confirm")}
                  variant="primary"
                  className="bg-red-500 text-white mt-[20px]"
               >
                  <ArrowPathIcon className="w-[20px]" />
                  Làm lại
               </Button>
            </div>
         </div>

         {isOpenModal && (
            <Modal setOpenModal={setIsOpenModal}>
               {modalName.current === "confirm" && (
                  <ConfirmModal
                     label="Bỏ thay đổi ?"
                     loading={false}
                     setOpenModal={setIsOpenModal}
                     callback={() => resetData()}
                  />
               )}

               {modalName.current === "select_account" && (
                  <>
                     <ModalHeader
                        setIsOpenModal={setIsOpenModal}
                        title="Chọn tài khoản"
                     />
                     <div
                        className={`w-[600px] max-w-[90vw] ${
                           loading ? "opacity-60 pointer-events-none " : ""
                        }`}
                     >
                        {loading ? (
                           ""
                        ) : accounts.length ? (
                           <Table colList={["Email", "Lần truy cập gần nhất"]}>
                              {accounts.map((acc, index) => (
                                 <tr
                                    key={index}
                                    onClick={() => handleSelectAccount(acc)}
                                    className="bg-[#e1e1e1] hover:bg-slate-400 cursor-pointer"
                                 >
                                    <td className={classes.td}>{acc.email}</td>
                                    <td className={classes.td}>
                                       {convertTimestampToString(acc.latest_seen)}
                                    </td>
                                 </tr>
                              ))}
                           </Table>
                        ) : (
                           "No account jet...."
                        )}
                     </div>
                  </>
               )}
            </Modal>
         )}
      </div>
   );
}

export default AddTeacher;
