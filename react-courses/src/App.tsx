import { useEffect, useState } from 'react';
import './App.css';
import Menu from './Menu';
import { BrowserRouter,Route, Switch, } from 'react-router-dom';
import configureValidations from './Validations';
import { claim } from './auth/auth.model';
import AuthenticationContext from './auth/AuthenticationContext';
import routes from './route-config';
import { GetClaims } from './auth/handleJWT';
import configureInterceptor from './utils/httpInterceptors';
import 'bootstrap/dist/js/bootstrap.bundle';

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
