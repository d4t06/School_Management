import Class from "@/pages/Class";
import {
  Home,
  Grade,
  Student,
  Subject,
  StudentDetail,
  GradeDetail,
  Teacher,
  Account,
  AddTeacher,
  AddStudent,
  SchoolYear,
  TeacherDetail,
} from "../pages";

const routes = {
  Home: "/",
  Student: "/student",
  AddStudent: "/add-student",
  StudentDetail: "/student/:id",
  Subject: "/subject",
  Teacher: "/teacher",
  TeacherDetail: "/teacher/:teacher_id",
  AddTeacher: "/add-teacher",
  Account: "/account",

  SchoolYear: "/class",
  Grade: "class/:school_year_id", //grade list page
  GradeDetail: "class/:school_year_id/:grade_id", //class list page
  DetailClass: "class/:school_year_id/:grade_id/:class_id", // class page
};

const publicRoutes = [
  { path: routes.Home, component: Home },
  { path: routes.Student, component: Student },
  { path: routes.AddStudent, component: AddStudent },
  { path: routes.StudentDetail, component: StudentDetail },
  { path: routes.Subject, component: Subject },
  { path: routes.Teacher, component: Teacher },
  { path: routes.TeacherDetail, component: TeacherDetail },
  { path: routes.AddTeacher, component: AddTeacher },
  { path: routes.Account, component: Account },

  { path: routes.SchoolYear, component: SchoolYear },
  { path: routes.Grade, component: Grade },
  { path: routes.GradeDetail, component: GradeDetail },
  { path: routes.DetailClass, component: Class },
];

export { publicRoutes };
