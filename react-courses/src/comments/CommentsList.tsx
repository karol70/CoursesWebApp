import GenericList from "../utils/GenericList";
import { commentDTO } from "./comment.model"
import Comment from "./Comment";

export default function CommentsList(props: commentsListProps){
    return(
        <GenericList
            list={props.comments}>
            <div>          
                {props.comments?.map(  comment => 
                    <Comment {...comment} key={comment.id} />)}
            </div>       
        </GenericList>
        
    )
}

interface commentsListProps{
    comments?: commentDTO[];
}