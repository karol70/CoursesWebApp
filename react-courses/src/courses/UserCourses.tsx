import axios, { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { urlCourses } from "../endpoints"
import Loading from "../utils/Loading"
import { courseDTO } from "./courses.model"
import UserCoursesList from "./UserCoursesList"

export default function UserCourses(){

    const [courses, setCourses] = useState<courseDTO[]>([])

    useEffect(()=>{
         axios.get(`${urlCourses}/userCourses`)
            .then((response: AxiosResponse<courseDTO[]>) =>{
            setCourses (response.data);
            })
    },[])

    return(
        <>
        {courses? <UserCoursesList courses={courses} /> : <Loading/>}
        </>       
    )
}