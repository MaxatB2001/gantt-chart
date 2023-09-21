import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
    url: 'https://test-auth.k-portal.ru',
    realm: 'test-realm',
    clientId: 'frontend-client'
});

export default keycloak;