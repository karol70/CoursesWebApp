
import { getValue } from "@testing-library/user-event/dist/utils";
import { ErrorMessage, Field, Form, Formik, FormikHelpers, validateYupSchema } from "formik";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addSyntheticLeadingComment } from "typescript";
import { categoriesDTO, citiesDTO, typesDTO } from "../categories/categories.model";
import { genericModelDTO } from "../forms/genericModel.model";
import ImageField from "../forms/ImageField";
import * as Yup from 'yup';


import TextField from "../forms/TextField";
import Button from "../utils/Button";
import { courseCreationDTO } from "./courses.model";
import Select from "react-select/dist/declarations/src/Select";
import DisplayErrors from "../utils/DisplayErrors";
import SelectField from "../forms/SelectField";
import axios, { AxiosResponse } from "axios";
import { urlCities, urlCourseCategories, urlTypes } from "../endpoints";

 export default function CourseForm (props: courseFormProps){


    const [types,setTypes] = useState<typesDTO[]>([]);
    const [cities,setCities] = useState<citiesDTO[]>([]);

    useEffect(() => {
        axios.get(urlTypes)
            .then((response: AxiosResponse<typesDTO[]>) =>{
            setTypes(response.data);
            })  
        },[]);

     useEffect(() => {
        axios.get(urlCities)
            .then((response: AxiosResponse<citiesDTO[]>) =>{
            setCities(response.data);
            })  
        },[]);
       
    return(
        
        <Formik
             initialValues={props.model}       
             onSubmit = {(values,actions)=>{             
               props.onSubmit(values,actions)
             }}
            validationSchema ={Yup.object({
                 title: Yup.string().required('To pole jest wymagane').firstLetterUppercase(),
                 description: Yup.string().required('To pole jest wymagane'),
                 categoryId: Yup.string().notOneOf(['0'], "Wybierz kategorię"),              
                 typeId: Yup.string().notOneOf(['0'], "Wybierz typ") ,
                 cityId: Yup.string().notOneOf(['0'], "Wybierz miasto") ,                
                 contactEmail: Yup.string().required('To pole jest wymagane').email('Wprowadź prawidłowy adres email'),
                 mainPage: Yup.string().url('Wprowadź prawidłowy link'),
                                
         })}
        >
            
            {(formikProps) => (
                <Form>
                    <h3 className="mb-3">{props.title}</h3>
                    <TextField displayName="Tytuł kursu *" field="title" />
                    

                    <TextField displayName="Opis *" field="description" />

                    <SelectField displayName="Kategoria *" field="categoryId" message="Wybierz kategorię" options={props.categories}
                    other={formikProps}/>

                    <SelectField displayName="Typ *" field="typeId" message="Wybierz typ" options={types}
                    other={formikProps}/>

                    <SelectField displayName="Miasto *" field="cityId" message="Wybierz miasto" options={cities}
                    other={formikProps}/>
                    <TextField displayName="Harmonogram / Plan" field="plan" />
                    <ImageField displayName="Zdjęcie" field="image" imageURL={props.model.imageURL} />

                    <TextField displayName="Cena" field="price"/>
                    <TextField displayName="Kontakt email *" field="contactEmail"/>
                    <TextField displayName="Numer telefonu" field="contactTelephoneNumber"/>
                    <TextField displayName="Link do strony głownej kursu" field="mainPage"/>
                 
                    <Button disabled ={formikProps.isSubmitting} type='submit'>Zapisz</Button>
                    <Link className="btn btn-secondary" to="/courses">Anuluj</Link> 
                </Form>
            )}
            
        </Formik>
    )
}

interface courseFormProps{
    model: courseCreationDTO;   
    onSubmit(values: courseCreationDTO,actions: FormikHelpers<courseCreationDTO>): void;
    title: string;
    categories: categoriesDTO[];
}