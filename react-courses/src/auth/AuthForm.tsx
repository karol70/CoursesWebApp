import { Form, Formik, FormikHelpers } from "formik";
import { userCredentials, userCredentialsLogin } from "./auth.model";
import * as Yup from 'yup';
import TextField from "../forms/TextField";
import Button from "../utils/Button";
import { Link } from "react-router-dom";

export default function AuthForm(props: authFormProps){
    return(
        {...props.isRegister? <Formik
            initialValues={props.model}
            onSubmit = {props.onSubmit}
           
            validationSchema={Yup.object({            
                email: Yup.string().required('To pole jest wymagane').email('Wprowadź prawidłowy email'),
                userName: Yup.string().required('To pole jest wymagane'),
                password: Yup.string().required('To pole jest wymagane')
            })}
            >
                {formikProps =>(
                    <Form>
                        <TextField displayName="Email" field="email"/>
                        {props.isRegister ? <TextField displayName="Nazwa użytkownika" field="userName" /> : null }
                        <TextField displayName="Password" field="password" type="password"/>
                        
                        <Button disabled={formikProps.isSubmitting} type="submit">Wyślij</Button>
                        <Link className="btn btn-secondary" to="/">Anuluj</Link>
                    </Form>
                )}
    
            </Formik>: 
            
            <Formik
            initialValues={props.model}
            onSubmit = {props.onSubmit}
           
            validationSchema={Yup.object({            
                email: Yup.string().required('To pole jest wymagane').email('Wprowadź prawidłowy email'),
                password: Yup.string().required('To pole jest wymagane')
            })}
            >
                {formikProps =>(
                    <Form>
                        <TextField displayName="Email" field="email"/>
                        {props.isRegister ? <TextField displayName="Nazwa użytkownika" field="userName" /> : null }
                        <TextField displayName="Password" field="password" type="password"/>
                        
                        <Button disabled={formikProps.isSubmitting} type="submit">Wyślij</Button>
                        <Link className="btn btn-secondary" to="/">Anuluj</Link>
                    </Form>
                )}
    
            </Formik>}
        
    )
}

interface authFormProps{
    model: userCredentials;
    onSubmit(values: userCredentials, actions: FormikHelpers<userCredentials>):void;
    isRegister: boolean;
}

AuthForm.defaultProps = {
isRegister: false
}
