import { DefaultLayout } from "./components";
import { publicRoutes } from "./routes";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Routes>
          {publicRoutes.map((item, index) => {
            const Page = item.component;

            return (
              <Route
                path={item.path}
                element={
                  <DefaultLayout>
                    <Page />
                  </DefaultLayout>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </>
  );
}

export default App;
