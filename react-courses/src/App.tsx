import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Menu from './Menu';
import { BrowserRouter,Route, Switch, withRouter } from 'react-router-dom';
import MainPage from './courses/MainPage';
import Courses from '../src/courses/Courses';
import CourseDetails from './courses/CourseDetails';
import CourseForm from './courses/CourseForm';
import CourseCreation from './courses/CourseCreation';
import configureValidations from './Validations';
import EditCourse from './courses/EditCourse';
import { claim } from './auth/auth.model';
import AuthenticationContext from './auth/AuthenticationContext';
import routes from './route-config';
import RedirectToMainPage from './utils/RedirectToMainPage';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import { GetClaims } from './auth/handleJWT';
import Authorized from './auth/Authorized';
import configureInterceptor from './utils/httpInterceptors';

configureValidations();
configureInterceptor();


function App() {

  const [claims,setClaims] = useState<claim[]>([])

  useEffect(()=>{
    setClaims(GetClaims())

  },[])

  function isAdmin(){
    return claims.findIndex(claim => claim.name==='role' && claim.value === 'admin') > -1;
  }
     
  return (
    <BrowserRouter >
    <AuthenticationContext.Provider value={{claims,update:setClaims}}>

      <Menu/>
      <div className='container'>  
      <Switch>
      {routes.map(route => 
            <Route key={route.path} path={route.path}  exact={route.exact}>
              {<route.component/> }       
            </Route>)}
      </Switch>
      </div> 
      </AuthenticationContext.Provider>
    </BrowserRouter>
    
  );
}

export default App;
