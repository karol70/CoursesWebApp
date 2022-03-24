import { categoriesDTO, citiesDTO, typesDTO } from "../categories/categories.model";

export interface courseDTO{
    id: number;
    category: categoriesDTO;
    title: string;
    type: typesDTO;
    city: citiesDTO;
    image?: string;
    description?: string;
    plan?:string;
    contact?: string;
    mainPage?: string;
    userVote?: number;
    averageVote?: number; 
}

export interface courseCreationDTO{
    categoryId: string;
    title: string;
    typeId: string;
    cityId: string;
    image?: File;
    description: string;
    plan:string;
    contactEmail: string;
    contactTelephoneNumber: string;
    mainPage: string;
    price: string;
}

