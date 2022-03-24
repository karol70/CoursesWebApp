import { Link } from 'react-router-dom';
import { categoriesDTO } from './categories.model';
import  css from './Categories.module.css';

export default function SingleCategory(props: singleCategoryProps){
    const buildLink = () => `/categories/${props.category.id}`;

    return (
        <div className={css.div}>
            <Link key={props.category.id} to={`/${props.path}?categoryId=${props.category.id}`}>
                <p>{props.category.name}</p>
                <img alt="img" src ={props.category.categoryImage}/>
            </Link>               
        </div>
    )
}

interface singleCategoryProps{
    category: categoriesDTO;
    path: string;
}