import { Xwrapper } from "react-xarrows";
import "./App.css";
import CalendarHeader from "./components/CalendarHeader/CalendarHeader.tsx";
import GroupContextPovider from "./contexts/Tasks.context.tsx";
import GantChart from "./pages/GantChart";
import moment from "moment";
import "moment/dist/locale/ru";
import Project from "./pages/Project.tsx";
import AppRouter from "./components/AppRouter.tsx";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak.ts";
moment.locale("ru");

function App() {
  return (
    <>
     {/* <ReactKeycloakProvider authClient={keycloak}> */}
     <GroupContextPovider>
        <Xwrapper>
          <CalendarHeader startDate={1693515600000} endDate={1696107600000} />
            <AppRouter/>
        </Xwrapper>
      </GroupContextPovider>
     {/* </ReactKeycloakProvider> */}
      
    </>
  );
}

export default App;
