import Keycloak from "keycloak-js";

const _kc = Keycloak('keycloak.json');

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const initKeycloak = async (onAuthenticatedCallback: () => void) => {
    try {
        const authenticated = await _kc.init({
            onLoad: 'login-required',
            silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
            pkceMethod: 'S256',
            checkLoginIframe: false
        });
        if (authenticated) {
            onAuthenticatedCallback();
        } else {
            console.warn("not authenticated!");
            doLogin();
        }
    } catch (e) {
        console.log(e);
    }
};

const doLogin = _kc.login;

const doLogout = _kc.logout;

const getToken = () => _kc.token;

const getRealmAccess = () => _kc.realmAccess;

const hasRole =  (role: string) => {
    const realmAccess = getRealmAccess();
    return realmAccess?.roles.find((value) => value === role) ? true : false;
}

const hasRoleEmpfaenger =  () => {
  return hasRole("EMPFAENGER");
}

const hasRoleFreigeber =  () => {
   return hasRole("FREIGEBER");
}

const updateToken = (successCallback: () => void) => {
    return _kc.updateToken(5)
        .success(successCallback)
        .error(() => doLogin())
};

export default {
    initKeycloak,
    doLogin,
    doLogout,
    getToken,
    getRealmAccess,
    updateToken,
    hasRoleEmpfaenger,
    hasRoleFreigeber
}