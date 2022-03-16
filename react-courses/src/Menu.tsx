import { Link, NavLink } from "react-router-dom";


export default function Menu(){
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
                                                    
                    </ul>

                    <div className="d-flex">                         
                                <Link to="/register" 
                                    className="nav-link btn btn-link">Załóż konto</Link>
                                <Link to="/login" 
                                    className="nav-link btn btn-link">Zaloguj się</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}