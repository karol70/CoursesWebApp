import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthenticationContext from "./auth/AuthenticationContext";
import Authorized from "./auth/Authorized";
import { logout } from "./auth/handleJWT";
import Button from "./utils/Button";

export default function Menu() {
  const { update, claims } = useContext(AuthenticationContext);

  function getUserName(): string {
    return claims.filter((x) => x.name === "userName")[0]?.value;
  }

  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Gain Skills
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navOptions"
          aria-controls="navOptions"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
          id="navOptions"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/courses">
                Kursy i szkolenia
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/privateLessons">
                Korepetycje
              </NavLink>
            </li>

            <Authorized
              authorized={
                <>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Twoje konto
                    </a>

                    <ul
                      className="dropdown-menu dropdown-menu-dark"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <Authorized
                        authorized={
                          <>
                            <li className="dropdown-item">
                              <NavLink className="nav-link" to="/course/create">
                                Dodaj kurs
                              </NavLink>
                            </li>
                          </>
                        }
                      />

                      <li className="dropdown-item">
                        <NavLink
                          className="nav-link"
                          to="/privateLesson/create"
                        >
                          Dodaj korepetycje
                        </NavLink>
                      </li>

                      <li className="dropdown-item">
                        <NavLink className="nav-link" to="/user/courses">
                          Twoje kursy
                        </NavLink>
                      </li>

                      <li className="dropdown-item">
                        <NavLink className="nav-link" to="/user/privateLessons">
                          Twoje korepetycje
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              }
            />
          </ul>
          <Authorized
            authorized={
              <>
                <span className="nav-link" style={{ color: "green" }}>
                  Witaj {getUserName()}
                </span>
                <Button
                  className="nav-link btn btn-link"
                  onClick={() => {
                    logout();
                    update([]);
                  }}
                >
                  <Link style={{ textDecoration: "none" }} to="/">
                    Wyloguj się
                  </Link>
                </Button>
              </>
            }
            notAuthorized={
              <>
                <div className="d-flex">
                  <Link to="/register" className="nav-link btn btn-link">
                    Załóż konto
                  </Link>
                  <Link to="/login" className="nav-link btn btn-link">
                    Zaloguj się
                  </Link>
                </div>
              </>
            }
          />
        </div>
      </div>
    </nav>
  );
}
