import { Dispatch, SetStateAction } from "react";

export type IStorage = IItems | null;

interface IItems {
    courses: ICourse[];
    user: IUser;
    setCourses: Dispatch<SetStateAction<ICourse[]>>;
    setUser: Dispatch<SetStateAction<IUser>>;
}

export interface ICourse {
    authors: string[];
    id: string;
    img: string;
    price: number;
    title: string
}

export type IUser = IPerson | null;

interface IPerson {
    accessLevel: number;
    budget: number;
    courses: ICourse[];
    login: string;
    password: string;
}
