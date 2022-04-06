import { ErrorMessage, Field } from "formik";

export default function CommentField(){
    return(
        <div className='mb-3' style={{width:'fit-content: 100%'}}>
             <label htmlFor='content'>Dodaj komentarz:</label>
             <Field component='textarea' rows="4" name='content' id='content' className ="form-control"/>
             <ErrorMessage name='content'>{msg => 
            <div className='text-danger'>{msg}</div>}</ErrorMessage>                        
         </div>
    )
}