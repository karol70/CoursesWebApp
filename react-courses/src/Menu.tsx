import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthenticationContext from "./auth/AuthenticationContext";
import Authorized from "./auth/Authorized";
import { logout } from "./auth/handleJWT";
import Button from "./utils/Button";


export default function Menu(){

    const {update,claims} = useContext(AuthenticationContext);

    function getUserName():string{
        return claims.filter(x=>x.name ==='userName')[0]?.value;
    }

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">Gain Skills</NavLink>
                <div className="collapse navbar-collapse"
                    style={{display: 'flex', justifyContent: 'space-between'}}
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/courses">
                                Kursy i szkolenia
                            </NavLink>
                        </li>
                        
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/privateLessons" >
                                Korepetycje
                            </NavLink>
                        </li>
                        <Authorized
                            authorized={<>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/course/create" >
                                    Utwórz kurs
                                </NavLink>
                            </li>
                            </>}
                        />
                        <Authorized
                            authorized={<>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/user/courses" >
                                    Twoje kursy
                                </NavLink>
                            </li>
                            </>}
                        />
                        
                                                    
                    </ul>
                    <Authorized
                    authorized={<>
                        <span className="nav-link">Cześć {getUserName()}</span>
                                     <Button className="nav-link btn btn-link"
                                    onClick={() => {
                                        logout();
                                        update([]);
                                    }}
                                    ><Link to="/">Wyloguj się</Link></Button> 
                        </>}
                        notAuthorized={<>
                        <div className="d-flex">                         
                                    <Link to="/register" 
                                        className="nav-link btn btn-link">Załóż konto</Link>
                                    <Link to="/login" 
                                        className="nav-link btn btn-link">Zaloguj się</Link>
                        </div>
                        </>}
                    />
                </div>
            </div>
        </nav>
    )
}