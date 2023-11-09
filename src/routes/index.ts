import { Home, Grade, Student } from "../pages";

const routes = {
    Home: '/',
    Student: '/student',
    Grade: '/grade'
}

const publicRoutes = [
    { path: routes.Home, component: Home, },
    { path: routes.Student, component: Student, },
    { path: routes.Grade, component: Grade, },
  ];


  export {publicRoutes}