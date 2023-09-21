import { useKeycloak } from "@react-keycloak/web";
import { PropsWithChildren } from "react";

const PrivateRoute = ({ children }: PropsWithChildren) => {
  const { keycloak } = useKeycloak();
  console.log(keycloak)
  const isLoggedIn = keycloak.authenticated;
    console.log(isLoggedIn);
    
  if (isLoggedIn) {
    return children
  } else {
    keycloak.login()
    return null
  }
//   if (!isLoggedIn && keycloak) {
//     keycloak.login();
//     return null
//   }
};

export default PrivateRoute;
