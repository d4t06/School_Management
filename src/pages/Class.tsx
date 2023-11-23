import { FormEvent, useEffect, useRef, useState } from "react";
import { ClassRoom, SchoolYear, StudentType } from "../types/index";
import Table from "../components/Table";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Modal, MyInput, Navigation } from "../components";
import { convertTimestampToString } from "../utils/appHelper";
import { collection, getDocs, query, where } from "firebase/firestore";
import {
  ArrowDownTrayIcon,
  PencilSquareIcon,
  PlusSmallIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { myDeleteDoc, myGetDoc, mySetDoc } from "@/utils/firebaseHelpers";
import { db } from "@/config/app";
import { useToast } from "@/stores/ToastContext";
import ModalHeader from "@/components/modals/ModalHeader";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { initClassRoomObject } from "@/services/ClassServices";

type ClassParams = { grade_id: string; class_id: string };

function Class() {
  const [loading, setLoading] = useState(false);
  // const [SchoolYearData, setSchoolYearData] = useState<SchoolYear>();
  const [students, setStudents] = useState<StudentType[]>([]);
  const [globalStudents, setGlobalStudents] = useState<StudentType[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<StudentType[]>([]);
  const [classData, setClassData] = useState<ClassRoom>(initClassRoomObject({}));

  const [tempClassData, setTempClassData] = useState(classData);
  const [removeStudent, setRemoveStudent] = useState<StudentType>();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const { setErrorToast, setSuccessToast } = useToast();

  const ranUseEffect = useRef(false);
  const modalName = useRef<
    "confirm_delete_class" | "add_student" | "edit" | "confirm_remove_student"
  >("edit");

  const navigate = useNavigate();
  const params = useParams<ClassParams>();

  const reRemoveStudent = (student: StudentType) => {
    setRemoveStudent(student);
    openModal("confirm_remove_student");
  };

  const openModal = (name: typeof modalName.current) => {
    if (name === "add_student") getGlobalStudents();
    if (name === "edit") setTempClassData(classData);

    setIsOpenModal(true);
    modalName.current = name;
  };

  const handleSetData = (name: keyof typeof classData, value: any, edit?: boolean) => {
    if (name === "capacity") value = +value;
    if (edit) {
      setTempClassData((prev) => ({ ...prev, [name]: value }));
    } else setClassData((prev) => ({ ...prev, [name]: value } as ClassRoom));
  };

  const handleSelectStudents = (student: StudentType) => {
    let list = [...selectedStudents];
    const index = list.indexOf(student);

    // if no present
    if (index === -1) {
      list.push(student);

      // if present
    } else {
      list.splice(index, 1);
    }
    setSelectedStudents(list);
  };

  const handleAddStudentsToClass = async () => {
    try {
      setLoading(true);
      for (let st of selectedStudents) {
        await mySetDoc({
          collection: "students",
          data: { ...st, class_id: classData.id } as StudentType,
          id: st.id,
        });
      }
      setSelectedStudents([]);
      setSuccessToast({ message: "Thêm học sinh vào lớp thành công" });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsOpenModal(false);
      setStudents((prev) => [...prev, ...selectedStudents]);
    }
  };

  const handleRemoveStudentFromClass = async () => {
    if (!removeStudent) {
      setErrorToast({});
      return;
    }

    try {
      setLoading(true);
      const newStudent: StudentType = { ...removeStudent, class_id: "" };
      await mySetDoc({
        collection: "students",
        data: newStudent,
        id: newStudent.id,
      });

      const newClassStudents = students.filter((st) => st.id !== newStudent.id);
      setStudents(newClassStudents);
      setSuccessToast({ message: "Xóa học sinh khỏi lớp thành công" });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsOpenModal(false);
    }
  };

  const handleEditClass = async (e: FormEvent) => {
    e.preventDefault();

    if (tempClassData.id === "" || tempClassData.className === "") {
      setErrorToast({ message: "Vui lòng nhập thông tin" });
      return;
    }
    try {
      setLoading(true);
      await mySetDoc({
        collection: "classes",
        data: tempClassData,
        id: tempClassData.id,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsOpenModal(false);
      setClassData(tempClassData);
    }
  };

  const getGlobalStudents = async () => {
    try {
      setLoading(true);
      const queryGetGlobalStudents = query(
        collection(db, "students"),
        where("class_id", "==", "")
      );

      const studentsSnap = await getDocs(queryGetGlobalStudents);
      if (studentsSnap.docs.length) {
        const students = studentsSnap.docs.map((doc) => doc.data() as StudentType);
        setGlobalStudents(students);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteClass = async () => {
    setLoading(true);
    await myDeleteDoc({ collection: "classes", id: classData?.id as string });

    setSuccessToast({ message: "Xóa lớp thành công" });
    setLoading(false);
    navigate(-1);
  };

  const getClassData = async () => {
    setLoading(true);

    try {
      const classData = await myGetDoc({
        collection: "classes",
        id: params.class_id as string,
      });

      if (classData.exists()) {
        setClassData(classData.data() as ClassRoom);
      }

      const queryGetClassStudents = query(
        collection(db, "students"),
        where("class_id", "==", params.class_id)
      );
      const studentsSnap = await getDocs(queryGetClassStudents);
      if (studentsSnap.docs.length) {
        const students = studentsSnap.docs.map((doc) => doc.data() as StudentType);
        setStudents(students);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!ranUseEffect.current) {
      getClassData();
      ranUseEffect.current = true;
    }
  }, []);

  const classes = {
    label: "text-[14px]",
    th: "bg-slate-800 text-[#fff] font-medium text-left px-[6px]",
    td: "px-[6px] py-[4px]",
    input:
      "w-[200px] outline-none h-[28px] px-[10px] rounded-[4px] border-[1px] text-[#000]",
  };

  if (!classData) return <h1>Not found</h1>;

  return (
    <div className="">
      <Navigation className="mb-[30px]" />
      <div className="flex justify-between items-start mb-[30px]">
        <div className="">
          <h1 className="text-[30px]">Lớp: {classData?.className}</h1>
          <p>
            Sỉ số:{students.length}/{+classData?.capacity}
          </p>
          <p>Năm học: {classData.school_year_id}</p>
          <p>Giáo viên chủ nhiệm: {classData.teacher_id || "Nguyễn Văn A"}</p>
        </div>
        <div className="flex gap-[10px]">
          <Button
            onClick={() => openModal("add_student")}
            className="bg-slate-800 "
            variant="primary"
          >
            <PlusSmallIcon className="w-[25px]" />
            Thêm học sinh
          </Button>

          <Button
            onClick={() => openModal("edit")}
            className="bg-slate-800 "
            variant="primary"
          >
            <PencilSquareIcon className="w-[25px]" />
            Sửa
          </Button>

          <Button
            onClick={() => openModal("confirm_delete_class")}
            className="bg-red-500 "
            variant="primary"
          >
            <TrashIcon className="w-[20px]" />
            Xóa
          </Button>
        </div>
      </div>

      <Table colList={["Mã số", "Họ và tên", "Giới tính", "Ngày sinh", "Nơi sinh", ""]}>
        {students.map((item, index) => (
          <tr key={index}>
            <td className={classes.td}>{item.id}</td>
            <td className={classes.td}>
              <Link className="w-full hover:text-slate-800" to={`/student/${item.id}`}>
                {item.full_name}
              </Link>
            </td>
            <td className={classes.td}>Nam</td>
            <td className={classes.td}>{convertTimestampToString(item.birthday)}</td>
            <td className={classes.td}>An Giang</td>
            <td className={classes.td}>
              <Button
                onClick={() => reRemoveStudent(item)}
                className="bg-red-500 "
                variant="primary"
              >
                Xóa
              </Button>
            </td>
          </tr>
        ))}
      </Table>

      {isOpenModal && (
        <Modal setOpenModal={setIsOpenModal}>
          {modalName.current === "add_student" && (
            <>
              <ModalHeader
                setIsOpenModal={setIsOpenModal}
                title="Thêm học sinh vào lớp"
              />
              <div
                className={`w-[600px] min-h-[50vh] ${
                  loading ? "opacity-60 pointer-events-none " : ""
                }`}
              >
                <div className="max-h-[calc(50vh-40px)] overflow-auto">
                  {loading ? (
                    ""
                  ) : (
                    <Table
                      colList={["Chọn", "Mã số", "Họ và tên", "Giới tính", "Nơi sinh"]}
                    >
                      {globalStudents.map((item, index) => {
                        const active = !!selectedStudents.find((st) => st.id === item.id);
                        return (
                          <tr
                            onClick={() => handleSelectStudents(item)}
                            key={index}
                            className={`${active ? "bg-slate-400" : ""}`}
                          >
                            <td>
                              <input
                                className="scale-[1.1]"
                                checked={active}
                                onChange={() => handleSelectStudents(item)}
                                type="checkbox"
                              />
                            </td>
                            <td className={classes.td}>{item.id}</td>
                            <td className={classes.td}>{item.full_name}</td>
                            <td className={classes.td}>-</td>
                            <td className={classes.td}>-</td>
                          </tr>
                        );
                      })}
                    </Table>
                  )}
                </div>

                <Button
                  type="submit"
                  onClick={handleAddStudentsToClass}
                  variant="primary"
                  className="bg-slate-800 text-white mt-[20px] absolute bottom-[20px]"
                >
                  <ArrowDownTrayIcon className="w-[25px]" /> Thêm
                </Button>
              </div>
            </>
          )}

          {modalName.current === "edit" && (
            <>
              <ModalHeader setIsOpenModal={setIsOpenModal} title="Sửa thông tin lớp" />
              <div
                className={`w-[600px] ${
                  loading ? "opacity-60 pointer-events-none " : ""
                }`}
              >
                <form
                  onSubmit={handleEditClass}
                  action=""
                  className="flex flex-col items-start gap-[12px]"
                >
                  <div className={`flex -mx-[10px] w-full`}>
                    <MyInput
                      width={"w-[50%] px-[10px]"}
                      onChange={(e) => handleSetData("className", e.target.value, true)}
                      className=""
                      title="Tên lớp"
                      value={tempClassData.className}
                    />
                    <MyInput
                      width={"w-[50%] px-[10px]"}
                      onChange={(e) => handleSetData("id", e.target.value, true)}
                      title="Mã số"
                      value={tempClassData.id}
                    />
                  </div>

                  <div className={`flex -mx-[10px] w-full`}>
                    <MyInput
                      width={"w-[50%] px-[10px]"}
                      onChange={(e) => handleSetData("capacity", e.target.value, true)}
                      className=""
                      title="Sức chứa"
                      value={tempClassData.capacity}
                    />
                    <MyInput
                      width={"w-[50%] px-[10px]"}
                      readOnly
                      title="Giáo viên chủ nhiệm"
                    />
                  </div>

                  <div className="flex gap-[10px]">
                    <Button
                      type="submit"
                      variant="primary"
                      className="bg-slate-800 text-white mt-[20px]"
                    >
                      <ArrowDownTrayIcon className="w-[25px]" /> Lưu
                    </Button>

                    <Button
                      type="submit"
                      variant="primary"
                      onClick={() => setIsOpenModal(false)}
                      className="bg-red-500 text-white mt-[20px]"
                    >
                      <XMarkIcon className="w-[25px]" /> Bỏ
                    </Button>
                  </div>
                </form>
              </div>
            </>
          )}

          {modalName.current === "confirm_delete_class" && (
            <ConfirmModal
              label="Xóa lớp"
              loading={loading}
              setOpenModal={setIsOpenModal}
              callback={deleteClass}
            />
          )}

          {modalName.current === "confirm_remove_student" && (
            <ConfirmModal
              label={`Xóa học sinh '${removeStudent?.full_name}' khõi lớp`}
              loading={loading}
              setOpenModal={setIsOpenModal}
              callback={handleRemoveStudentFromClass}
            />
          )}
        </Modal>
      )}
    </div>
  );
}

export default Class;
