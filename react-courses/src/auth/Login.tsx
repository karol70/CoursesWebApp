import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { urlAccounts } from "../endpoints";
import DisplayErrors from "../utils/DisplayErrors";
import { authenticationResponse, claim, userCredentials, userCredentialsLogin } from "./auth.model";
import AuthenticationContext from "./AuthenticationContext";
import AuthForm from "./AuthForm";
import { GetClaims, saveToken } from "./handleJWT";

export default function Login(){

    const [errors,setErrors] = useState<string[]>([]);
    const {update} = useContext(AuthenticationContext);
    const history = useHistory();

    async function login(credentials: userCredentials){
        try{
            setErrors([]);
            const response = await axios.post<authenticationResponse>(`${urlAccounts}/login`, credentials);
            saveToken(response.data);
            update(GetClaims());
            history.push('/');
        } catch(error){
            setErrors(error.response.data)
        }
    }

    return(<>
        <h3>Login</h3>
        <DisplayErrors errors={errors}/>
        <AuthForm model={{email: '', password:''}} onSubmit={async values => await login(values)}/>
    </>
    )
}