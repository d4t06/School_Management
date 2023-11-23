import { DefaultLayout } from "./components";
import Auth from "./components/Auth";
import { Login } from "./pages";
import { privateRoutes, publicRoutes } from "./routes";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequireAuth from "./routes/RequireAuth";
import Unauthorized from "./pages/Unauthorized";
function App() {
   return (
      <>
         <Router basename="/D-School">
            <Routes>
               <Route path={"/login"} element={<Login />} />
               <Route path={"/unauthorized"} element={<Unauthorized />} />

               <Route element={<Auth />}>
                  {publicRoutes.map((item, index) => {
                     const Page = item.component;

                     return (
                        <Route
                           key={index}
                           path={item.path}
                           element={
                              <DefaultLayout>
                                 <Page />
                              </DefaultLayout>
                           }
                        />
                     );
                  })}

                  {privateRoutes.map((item, index) => {
                     const Page = item.component;

                     return (
                        <Route
                           key={index}
                           element={<RequireAuth allowedRole={item.role} />}
                        >
                           <Route
                              path={item.path}
                              element={
                                 <DefaultLayout>
                                    <Page />
                                 </DefaultLayout>
                              }
                           />
                        </Route>
                     );
                  })}
               </Route>
            </Routes>
         </Router>
      </>
   );
}

export default App;
