import { Timestamp, collection, getDocs, query } from "firebase/firestore";
import { StudentType } from "../types";
import { db } from "../config/app";
import { myDeleteDoc, myGetDoc, mySetDoc } from "../utils/firebaseHelpers";

export const getAllStudent = async () => {
   const queryGetStudents = query(collection(db, "students"));
   const studentsSnapshot = await getDocs(queryGetStudents);

   if (studentsSnapshot.docs) {
      const students = studentsSnapshot.docs.map((doc) => doc.data() as StudentType);
      return students;
   }
};

export const getStudent = async (id: string) => {
   const studentSnapshot = await myGetDoc({ collection: "students", id: id });
   if (studentSnapshot.exists()) {
      return studentSnapshot.data() as StudentType;
   }
};

export const deleteStudent = async (id: string) => {
   await myDeleteDoc({ collection: "students", id: id });
};

export const editStudent = async (id: string, data: StudentType) => {
   await mySetDoc({ collection: "students", id: id, data: data });
};

export const initStudentObject = ({ ...values }: Partial<StudentType>) => {
   const data: StudentType = {
      id: "",
      address_id: "",
      birthday: Timestamp.fromDate(new Date("2023-11-16")),
      class_id: "",
      GPA: 0,
      father_full_name: "",
      father_phone_number: "",
      full_name: "",
      gender: "others",
      image_path: [],
      image_url: "",
      mother_full_name: "",
      mother_phone_number: "",
      placeOfBirth: "",
      ...values,
   };

   return data;
};
