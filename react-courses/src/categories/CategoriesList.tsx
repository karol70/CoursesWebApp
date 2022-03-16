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
            {props.categories?.map(  category => 
                <SingleCategory {... category} key={category.id}/>)}
        </div>
        
    </GenericList>
    )
}

interface categoriesListProps{
    categories?: categoriesDTO[];
}