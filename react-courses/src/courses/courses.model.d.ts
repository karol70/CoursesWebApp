import { categoriesDTO, citiesDTO, typesDTO } from "../categories/categories.model";

export interface courseDTO{
    id: number;
    category: categoriesDTO;
    name: string;
    type: typesDTO;
    city: citiesDTO;
    image: string;
    description: string;
    plan:string;
    contactEmail: string;
    contactNumber?:string;
    price:string;
    mainPage?: string;
    userVote?: number;
    averageVote?: number; 
}

export interface courseCreationDTO{
    categoryId: number;
    title: string;
    typeId: number;
    cityId: number;
    image?: File;
    imageURL?:string;
    description: string;
    plan:string;
    contactEmail: string;
    contactTelephoneNumber?: string;
    mainPage?: string;
    price: string;
}

export interface courseDetailsDTO{
    name: string;
    categoryName: string;  
    typeName: string;
    cityName: string;
    image: string;
    description?: string;
    plan?:string;
    contactEmail?: string;
    contactNumber?:string;
    price?:string;
    mainPage?: string;
}

