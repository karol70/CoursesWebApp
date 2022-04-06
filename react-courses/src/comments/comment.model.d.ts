import { NumberLiteralType } from "typescript";

export interface commentDTO{
    id:number;
    userName: string;
    courseId: number;
    content: string;
    date: Date;
}

export interface commentCreationDTO{
    userName: string;
    courseId: number;
    content: string;
    date: Date;
}