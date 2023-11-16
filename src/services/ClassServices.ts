import { getDocs } from "firebase/firestore";
import { ClassRoom, TeacherType } from "../types";
import { generateQueryString } from "@/utils/appHelper";

export const getAllClasses = async () => {
  const queryGetAllClassRoom = generateQueryString("classes");
  const classRoomSnap = await getDocs(queryGetAllClassRoom);

  if (classRoomSnap.docs) {
    const classRooms = classRoomSnap.docs.map((doc) => doc.data() as TeacherType);
    return classRooms;
  }
};

export const initClassRoomObject = ({ ...values }: Partial<ClassRoom>) => {
  const data: ClassRoom = {
    id: "",
    capacity: 0,
    school_year_id: "",
    teacher_id: "",
    className: "",
    grade_id: "",
    ...values,
  };

  return data;
};
