import {  BrowserRouter, Route, Routes } from "react-router-dom";
// import CalendarHeader from "./CalendarHeader/CalendarHeader";
import GantChart from "../pages/GantChart";
import Test from "../pages/Test";
// import PrivateRoute from "./PrivateRoute";
// import { ReactKeycloakProvider } from "@react-keycloak/web";
// import keycloak from "../Keycloak";

const AppRouter = () => {
  return (
    <BrowserRouter basename="test">
      <Routes>
        <Route path="/" element={<GantChart />}></Route>
        <Route path="/t" element={<Test />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
