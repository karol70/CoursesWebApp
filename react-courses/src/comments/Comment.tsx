import { ErrorMessage, Field } from 'formik'
import css from '../comments/comments.module.css'
import { commentDTO } from './comment.model'
import {formatDate} from '../utils/DateFormat'

export default function Comment(props: commentDTO){
    return(
    <div className={css.comment} style={{display: 'flex'}}>
        <div>
            <img className={css.image} src='https://cdn-icons-png.flaticon.com/512/149/149071.png'/>
        </div>
        <div className={css.details} style={{display: 'row'}}>
            <div className={css.userInfo}>
                {props.userName}   |   {formatDate(props.date).toString()}
            </div>
            <div>
                {props.content}
            </div>
        </div>

    </div>
    )
}

