import { BrowserRouter, Route, Routes } from "react-router-dom";
// import CalendarHeader from "./CalendarHeader/CalendarHeader";
import GantChart from "../pages/GantChart";
// import PrivateRoute from "./PrivateRoute";
// import { ReactKeycloakProvider } from "@react-keycloak/web";
// import keycloak from "../Keycloak";

const AppRouter = () => {
  return (
  
        <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <GantChart/>
          }
        ></Route>
      </Routes>
    </BrowserRouter>

  );
};

export default AppRouter;
