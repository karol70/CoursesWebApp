import Login from "./auth/Login"
import Register from "./auth/Register"
import CourseCreation from "./courses/CourseCreation"
import CourseDetails from "./courses/CourseDetails"
import Courses from "./courses/Courses"
import EditCourse from "./courses/EditCourse"
import MainPage from "./courses/MainPage"
import UserCourses from "./courses/UserCourses"
import EditPrivateLesson from "./privateLessons/EditPrivateLesson"
import PrivateLessonDetails from "./privateLessons/PrivateLessonDetails"
import PrivateLessons from "./privateLessons/PrivateLessons"
import PrivateLessonCreation from "./privateLessons/PrivateLessonsCreation"
import UserPrivateLessons from "./privateLessons/UserPrivateLessons"
import RedirectToMainPage from "./utils/RedirectToMainPage"

const routes =[

    {path:'/courses', component: Courses},
    {path:'/course/create', component: CourseCreation, exact:true, isLoggedIn:true },
    {path:'/course/:id(\\d+)', component: CourseDetails},
    {path:'/course/edit/:id(\\d+)', component: EditCourse, isLoggedIn:true},

    {path:'/privateLessons', component: PrivateLessons},
    {path:'/privateLesson/create', component: PrivateLessonCreation, exact:true, isLoggedIn:true},
    {path:'/privateLesson/:id(\\d+)', component: PrivateLessonDetails},
    {path:'/privateLesson/edit/:id(\\d+)', component: EditPrivateLesson, isLoggedIn:true},

    {path:'/user/courses/', component: UserCourses, isLoggedIn:true},
    {path:'/user/privateLessons/', component: UserPrivateLessons, isLoggedIn:true},

    {path:'/register', component: Register},
    {path:'/login', component: Login},

    {path: '/', component: MainPage},
    {path: '*', component: RedirectToMainPage}
]

export default routes;