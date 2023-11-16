import { useEffect, useRef, useState } from "react";
import { Navigation, Button, MyInput, Modal } from "../components";
import {
  ClipboardDocumentListIcon,
  PencilSquareIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";
import { TeacherType } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import { myDeleteDoc, myGetDoc, mySetDoc } from "../utils/firebaseHelpers";
import ConfirmModal from "../components/modals/ConfirmModal";
import { initTeacherObject } from "@/services/TeacherServices";

function TeacherDetail() {
  const [edit, setEdit] = useState(false);
  const [teacher, setTeacher] = useState<TeacherType>(initTeacherObject({}));

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const modalName = useRef<"delete" | "restore">("delete");
  const ranUseEffects = useRef(false);
  const prefTeacherData = useRef<TeacherType>(teacher);
  const inputRef = useRef<HTMLInputElement>(null);

  const params = useParams<{ teacher_id: string }>();
  const navigate = useNavigate();

  const classes = {
    cta: "inline-flex gap-[4px]",
  };

  const handleSetData = (name: keyof typeof teacher, value: any) => {
    setTeacher((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditTeacher = () => {
    setEdit(true);
    prefTeacherData.current = { ...teacher };
    inputRef.current?.focus();
  };

  const handleRetoreTeacher = () => {
    setEdit(false);
    setTeacher(prefTeacherData.current);
    setIsOpenModal(false);
  };

  const deleteTeacher = async () => {
    setLoading(true);
    await myDeleteDoc({ collection: "teachers", id: params.teacher_id as string });
    setLoading(false);
    navigate("/teacher");
  };

  const openModal = (name: typeof modalName.current) => {
    setIsOpenModal(true);
    modalName.current = name;
  };

  useEffect(() => {
    const handleGetTeacher = async () => {
      if (!params.teacher_id) return;

      const teacher = await myGetDoc({ collection: "teachers", id: params.teacher_id });
      if (teacher.exists()) {
        setTeacher(teacher.data() as TeacherType);
      }
    };

    if (!ranUseEffects.current) {
      handleGetTeacher();
      ranUseEffects.current = true;
    }
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    await mySetDoc({
      collection: "teachers",
      data: teacher,
      id: teacher.id as string,
    });
    setLoading(false);
    setEdit(false);
  };

  if (!teacher) return <h1>No teacher jet</h1>;

  return (
    <div>
      <Navigation className="mb-[30px]" />

      <div
        className={`flex gap-[20px] ${loading ? "pointer-events-none opacity-60" : ""}`}
      >
        <div className="w-[25%] flex-shrink-0">
          <div className="w-full pt-[100%] bg-[#ccc] rounded-[6px]"></div>
          <div className="flex flex-wrap gap-[10px] mt-[12px]">
            {!edit ? (
              <>
                <Button onClick={handleEditTeacher} className={classes.cta}>
                  <PencilSquareIcon className="w-[20px]" /> Sửa
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
              Xóa Giáo viên
            </Button>
          )}
        </div>

        <div className="w-full h-full">
          <div className={`flex gap-[10px]`}>
            <MyInput
            ref={inputRef}
              readOnly={!edit}
              onChange={(e) => handleSetData("full_name", e.target.value)}
              title="Học và tên"
              value={teacher.full_name}
            />
            <MyInput
              readOnly={!edit}
              onChange={(e) => handleSetData("id", e.target.value)}
              title="Mã số"
              value={teacher.id}
            />
          </div>
          <MyInput
            readOnly={!edit}
            onChange={(e) => handleSetData("email", e.target.value)}
            title="Email"
            value={teacher.email}
          />
        </div>
      </div>

      {isOpenModal && (
        <Modal setOpenModal={setIsOpenModal}>
          {modalName.current === "delete" && (
            <ConfirmModal
              label={`Xóa giáo viên '${teacher.full_name}'`}
              loading={loading}
              setOpenModal={setIsOpenModal}
              callback={deleteTeacher}
            />
          )}

          {modalName.current === "restore" && (
            <ConfirmModal
              label="Bỏ thay đổi"
              loading={loading}
              setOpenModal={setIsOpenModal}
              callback={handleRetoreTeacher}
            />
          )}
        </Modal>
      )}
    </div>
  );
}

export default TeacherDetail;
