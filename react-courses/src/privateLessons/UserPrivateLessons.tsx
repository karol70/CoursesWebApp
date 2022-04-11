import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { courseDTO } from "../courses/courses.model";
import { urlPrivateLessons } from "../endpoints";
import Loading from "../utils/Loading";
import UserPrivateLessonsList from "./UserPrivateLessonsList";

export default function UserPrivateLessons(){

    const [privateLessons, setPrivateLessons] = useState<courseDTO[]>([])

    useEffect(()=>{
         axios.get(`${urlPrivateLessons}/userPrivateLessons`)
            .then((response: AxiosResponse<courseDTO[]>) =>{
            setPrivateLessons (response.data);
            })
    },[])

    return(
        <>
        {privateLessons? <UserPrivateLessonsList privateLessons={privateLessons} /> : <Loading/>}
        </>       
    )
}