import { Timestamp, collection, getDocs, query } from "firebase/firestore";
import { TeacherType } from "../types";
import { db } from "../config/app";

export const getAllTeachers = async () => {
  const queryGetAllTeacher = query(collection(db, "students"));
  const teacherSnapShot = await getDocs(queryGetAllTeacher);

  if (teacherSnapShot.docs) {
    const students = teacherSnapShot.docs.map((doc) => doc.data() as TeacherType);
    return students;
  }
};

export const initTeacherObject = ({ ...values }: Partial<TeacherType>) => {
  const data: TeacherType = {
    id: "",
    email: "",
    full_name: "",
    phone_number: "",
    gender: "male",
    birthday: Timestamp.fromDate(new Date()),
    address_id: "",
    subjects_ids: [],
    ...values,
  };

  return data;
};
