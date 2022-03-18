import { Link } from 'react-router-dom';
import { categoriesDTO } from './categories.model';
import  css from './Categories.module.css';

export default function SingleCategory(props: categoriesDTO){
    const buildLink = () => `/categories/${props.id}`;

    return (
        <div className={css.div}>
            <Link key={props.id} to={`/courses?categoryId=${props.id}`}>
                <p>{props.name}</p>
                <img alt="img" src ={props.categoryImage}/>
            </Link>               
        </div>
    )
}