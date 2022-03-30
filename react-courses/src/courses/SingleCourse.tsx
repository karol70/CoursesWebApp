import { Link } from "react-router-dom";
import Ratings from "../utils/Ratings";
import { courseDTO } from "./courses.model";
import css from './Courses.module.css';

export default function SingleCourse(props: courseDTO){
    const buildLink = () => `/course/${props.id}`;

    return(

        <div className={css.div}>
            <Link to={buildLink()}>
                {props.image ? 
                <img alt="img" src={props.image}/> 
                : <img alt="img" src ="https://the1thing.com/wp-content/uploads/2015/01/the_one_thing_improve_skills.jpg"/>}
                <p>{props.name}</p>
                <p>{props.type}</p>  
            </Link>
            <Ratings maximumValue={5} selectedValue={0} onChange={()=>{}}/>              
        </div>
    )
}