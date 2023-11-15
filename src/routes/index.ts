import {
   Home,
   Grade,
   Student,
   Subject,
   StudentDetail,
   GradeDetail,
   Teacher,
   Login,
   Account,
} from "../pages";

const routes = {
   Home: "/",
   Student: "/student",
   StudentDetail: "/student/:id",
   Grade: "/grade",
   GradeDetail: "/grade/:id",
   Subject: "/subject",
   Teacher: "/teacher",
   Login: "/login",
   Account: "/account",
};

const publicRoutes = [
   { path: routes.Home, component: Home },
   { path: routes.Student, component: Student },
   { path: routes.StudentDetail, component: StudentDetail },
   { path: routes.Grade, component: Grade },
   { path: routes.GradeDetail, component: GradeDetail },
   { path: routes.Subject, component: Subject },
   { path: routes.Teacher, component: Teacher },
   { path: routes.Login, component: Login },
   { path: routes.Account, component: Account },
];

export { publicRoutes };
