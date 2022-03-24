import { courseCreationDTO } from "../courses/courses.model";

export function convertCourseToFormData(course: courseCreationDTO): FormData{
    const formData = new FormData();

    formData.append('title', course.title);

    if(course.description){
        formData.append('description', course.description);
    }
    if(course.image){
        formData.append('image', course.image);
    }
    if(course.plan){
        formData.append('plan', course.plan);
    }
    if(course.price){
        formData.append('price', course.price);
    }
    if(course.contactEmail){
        formData.append('contactEmail', course.contactEmail);
    }
    if(course.contactTelephoneNumber){
        formData.append('contactTelephoneNumber', JSON.stringify(course.contactTelephoneNumber));
    }
    if(course.mainPage){
        formData.append('mainPage', course.mainPage);
    }
 
    formData.append('categoryId', JSON.stringify(course.categoryId));
    formData.append('typeId', JSON.stringify(course.typeId));
    formData.append('cityId', JSON.stringify(course.cityId));
    
    return formData;
}