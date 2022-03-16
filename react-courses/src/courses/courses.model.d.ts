import { categoriesDTO } from "../categories/categories.model";

export interface courseDTO{
    id: number;
    category: categoriesDTO;
    title: string;
    type: string;
    city: string;
    image?: string;
    description?: string;
    plan?:string;
    contact?: string;
    mainPage?: string;
    userVote?: number;
    averageVote?: number; 
}

