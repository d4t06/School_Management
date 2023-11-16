import { FormEvent, useEffect, useRef, useState } from "react";
import { Button, Modal, MyInput } from "../components";
import { initStudentObject } from "../services/StudentServices";
import { StudentType } from "../types";
import ConfirmModal from "../components/modals/ConfirmModal";
// import { sleep } from "../utils/appHelper";
import { mySetDoc } from "../utils/firebaseHelpers";
import {
  ArrowPathIcon,
  ChevronRightIcon,
  PlusSmallIcon,
} from "@heroicons/react/24/outline";

function AddStudent() {
  const [studentData, setStudentData] = useState<StudentType>(initStudentObject({}));
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSetData = (name: keyof typeof studentData, value: any) => {
    setStudentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    await mySetDoc({ collection: "students", data: studentData, id: studentData.id });

    setLoading(false);
  };

  const resetData = () => {
    setStudentData(initStudentObject({}));
    setIsOpenModal(false);
  };

  const continueAddStudent = async () => {
    await handleSubmit();
    setStudentData(initStudentObject({}));
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
            value={studentData.full_name}
          />
          <MyInput
            onChange={(e) => handleSetData("id", e.target.value)}
            title="Mã số"
            value={studentData.id}
          />
        </div>

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

export default AddStudent;
