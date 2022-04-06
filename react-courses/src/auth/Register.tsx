import axios from "axios";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { urlAccounts } from "../endpoints";
import DisplayErrors from "../utils/DisplayErrors";
import { authenticationResponse, userCredentials } from "./auth.model";
import AuthenticationContext from "./AuthenticationContext";
import AuthForm from "./AuthForm";
import { GetClaims, saveToken } from "./handleJWT";

export default function Register(){

    const [errors,setErrors] = useState<string[]>([]);
    const {update} = useContext(AuthenticationContext);
    const history = useHistory();

    async function register(credentials: userCredentials){
        try{
            setErrors([]);
            const response = await axios.post<authenticationResponse>(`${urlAccounts}/create`,credentials);
            saveToken(response.data);
            update(GetClaims());
            history.push('/');
        } catch(error){
            setErrors(error.response.data);
        }
    }
    return(
        <>
        <h3>Rejestracja</h3>
        <DisplayErrors errors={errors}/>
        <AuthForm isRegister model={{email:'', password: '', userName:''}} onSubmit={async values=> await register(values)}/>
        </>
    )
}