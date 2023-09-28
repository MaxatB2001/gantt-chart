import { Xwrapper } from "react-xarrows";
import "./App.css";
import CalendarHeader from "./components/CalendarHeader/CalendarHeader.tsx";
import GroupContextPovider from "./contexts/Tasks.context.tsx";
// import GantChart from "./pages/GantChart";
import moment from "moment";
import "moment/dist/locale/ru";
// import Project from "./pages/Project.tsx";
import AppRouter from "./components/AppRouter.tsx";
// import { ReactKeycloakProvider } from "@react-keycloak/web";
// import keycloak from "./Keycloak.ts";
import DialogContextProvider from "./contexts/Dialog.context.tsx";
import MetadataContextProvider, {
} from "./contexts/MetaData.context.tsx";
import ChartActionBar from "./components/ChartActionBar/ChartActionBar.tsx";
import Dialog from "./components/Dialog/Dialog.tsx";
import ViewContextProvider from "./contexts/View.context.tsx";
moment.locale("ru");

function App() {
  return (
    <>
      {/* <ReactKeycloakProvider authClient={keycloak}> */}
      <ViewContextProvider>
      <MetadataContextProvider>
        <DialogContextProvider>
          <GroupContextPovider>
            <Xwrapper>
              <ChartActionBar/>
              <CalendarHeader
             
              />
              <Dialog />
              <AppRouter />
            </Xwrapper>
          </GroupContextPovider>
        </DialogContextProvider>
      </MetadataContextProvider>
      </ViewContextProvider>
      {/* </ReactKeycloakProvider> */}
    </>
  );
}

export default App;
