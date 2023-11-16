import { DefaultLayout } from "./components";
import Auth from "./components/Auth";
import { Login } from "./pages";
import { publicRoutes } from "./routes";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
   return (
      <>
         <Router>
            <Routes>
               <Route path={"/login"} element={<Login />} />

               {/* <Route element={<Auth />}> */}
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
               {/* </Route> */}
            </Routes>
         </Router>
      </>
   );
}

export default App;
