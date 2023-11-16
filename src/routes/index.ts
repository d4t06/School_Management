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
} from "../pages";

const routes = {
   Home: "/",
   Student: "/student",
   AddStudent: "/add-student",
   StudentDetail: "/student/:id",
   Grade: "/grade",
   GradeDetail: "/grade/:id",
   Subject: "/subject",
   Teacher: "/teacher",
   AddTeacher: "/add-teacher",
   Account: "/account",
};

const publicRoutes = [
   { path: routes.Home, component: Home },
   { path: routes.Student, component: Student },
   { path: routes.AddStudent, component: AddStudent },
   { path: routes.StudentDetail, component: StudentDetail },
   { path: routes.Grade, component: Grade },
   { path: routes.GradeDetail, component: GradeDetail },
   { path: routes.Subject, component: Subject },
   { path: routes.Teacher, component: Teacher },
   { path: routes.AddTeacher, component: AddTeacher },
   { path: routes.Account, component: Account },
];

export { publicRoutes };
