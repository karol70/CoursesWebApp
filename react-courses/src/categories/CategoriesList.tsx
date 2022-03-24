import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GenericList from "../utils/GenericList";
import { categoriesDTO } from "./categories.model";
import css from './CategoriesList.module.css';
import SingleCategory from "./SingleCategory";

export default function CategoriesList(props: categoriesListProps){
 
    return(
    <GenericList
    list={props.categories}>
        <div className={css.div}>          
            {props.categories?.map(  categoryProps => 
                <SingleCategory path={props.path} {... categoryProps} key={categoryProps.id} category={categoryProps}  />)}
        </div>
        
    </GenericList>
    )
}

interface categoriesListProps{
    categories?: categoriesDTO[];
    path: string;
}