import { useEffect, useState } from "react";
import "./App.css";
import Menu from "./Menu";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import configureValidations from "./Validations";
import { claim } from "./auth/auth.model";
import AuthenticationContext from "./auth/AuthenticationContext";
import routes from "./route-config";
import { GetClaims } from "./auth/handleJWT";
import configureInterceptor from "./utils/httpInterceptors";
import "bootstrap/dist/js/bootstrap.bundle";

configureValidations();
configureInterceptor();

function App() {
  const [claims, setClaims] = useState<claim[]>([]);

  useEffect(() => {
    setClaims(GetClaims());
  }, []);

  function isLoggedIn() {
    return claims.findIndex((claim) => claim.name === "email") > -1;
  }

  return (
    <BrowserRouter>
      <AuthenticationContext.Provider value={{ claims, update: setClaims }}>
        <Menu />
        <div className="container">
          <Switch>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} exact={route.exact}>
                {route.isLoggedIn && !isLoggedIn() ? (
                  <> Musisz się zalogować </>
                ) : (
                  <route.component />
                )}
              </Route>
            ))}
          </Switch>
        </div>
        <footer className="bd-footer py-5 mt-5 bg-dark">
          <div className="container" style={{ color: "white" }}>
            Gain Skills {new Date().getFullYear().toString()}
          </div>
        </footer>
      </AuthenticationContext.Provider>
    </BrowserRouter>
  );
}

export default App;
