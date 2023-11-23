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
   { path: routes.StudentDetail, component: StudentDetail },
   { path: routes.DetailClass, component: Class },
];

const privateRoutes = [
   { path: routes.Account, component: Account, role: ["R1"] },
   { path: routes.AddTeacher, component: AddTeacher, role: ["R1"] },
   { path: routes.AddStudent, component: AddStudent, role: ["R1"] },
   { path: routes.SchoolYear, component: SchoolYear, role: ["R1"] },
   { path: routes.GradeDetail, component: GradeDetail, role: ["R1"] },
   { path: routes.Grade, component: Grade, role: ["R1"] },
   { path: routes.Teacher, component: Teacher, role: ["R1"] },
   { path: routes.Subject, component: Subject, role: ["R1"] },
   { path: routes.Student, component: Student, role: ["R1"] },
];

export { publicRoutes, privateRoutes };
