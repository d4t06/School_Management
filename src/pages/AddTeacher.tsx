import { useEffect, useRef, useState } from "react";
import { Button, Modal, MyInput } from "../components";
import { TeacherType } from "../types";
import ConfirmModal from "../components/modals/ConfirmModal";
import { mySetDoc } from "../utils/firebaseHelpers";
import { initTeacherObject } from "../services/TeacherServices";
import { initAccountObject } from "../services/AccountServices";
import {
  ArrowPathIcon,
  ChevronRightIcon,
  PlusSmallIcon,
} from "@heroicons/react/24/outline";
import { useToast } from "../stores/ToastContext";

function AddTeacher() {
  const { setErrorToast, setSuccessToast, toasts } = useToast();
  const [teacherData, setTeacherData] = useState<TeacherType>(initTeacherObject({}));
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSetData = (name: keyof typeof teacherData, value: any) => {
    setTeacherData((prev) => ({ ...prev, [name]: value }));
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
    const account = initAccountObject({ email: teacherData.email });
    await mySetDoc({ collection: "accounts", data: account, id: account.email });

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

  return (
    <div className="min-h-screen">
      <div
        className={`w-[500px] mx-auto ${loading ? "pointer-events-none opacity-60" : ""}`}
      >
        <div className={`flex gap-[10px]`}>
          <MyInput
            ref={inputRef}
            onChange={(e) => handleSetData("full_name", e.target.value)}
            className=""
            title="Học và tên"
            value={teacherData.full_name}
          />
          <MyInput
            onChange={(e) => handleSetData("id", e.target.value)}
            title="Mã số"
            value={teacherData.id}
          />
        </div>
        <MyInput
          onChange={(e) => handleSetData("email", e.target.value)}
          title="Email"
          value={teacherData.email}
        />

        <div className="flex gap-[10px]">
          <Button
            onClick={handleSubmit}
            variant="primary"
            className="bg-slate-800 text-white mt-[20px]"
          >
            <PlusSmallIcon className="w-[25px]" />
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
            onClick={() => setIsOpenModal(true)}
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
          <ConfirmModal
            loading={false}
            setOpenModal={setIsOpenModal}
            callback={() => resetData()}
          />
        </Modal>
      )}
    </div>
  );
}

export default AddTeacher;
