import path from "path"
import { Component } from "react"
import { withRouter } from "react-router-dom"
import Login from "./auth/Login"
import Register from "./auth/Register"
import CourseCreation from "./courses/CourseCreation"
import CourseDetails from "./courses/CourseDetails"
import Courses from "./courses/Courses"
import EditCourse from "./courses/EditCourse"
import MainPage from "./courses/MainPage"
import RedirectToMainPage from "./utils/RedirectToMainPage"

const routes =[

    {path:'/courses', component: Courses},
    {path:'/course/create', component: CourseCreation, exact:true},
    {path:'/course/:id(\\d+)', component: CourseDetails},
    {path:'/course/edit/:id(\\d+)', component: EditCourse},

    {path:'/register', component: Register},
    {path:'/login', component: Login},

    {path: '/', component: MainPage},
    {path: '*', component: RedirectToMainPage}
]

export default routes;