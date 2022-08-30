import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react'
import request from '../helpers/request';

export const StoreContext = createContext<IStorage | null>(null);

interface StoreProviderProps {
    children: JSX.Element
}

interface IStorage {
    courses: any[];
    user: any;
    setCourses: Dispatch<SetStateAction<never[]>>;
    setUser: Dispatch<SetStateAction<null>>;
}

const StoreProvider = ({ children }: StoreProviderProps) => {
    const [courses, setCourses] = useState([]);
    const [user, setUser] = useState(null);

    const fetchData = async () => {
        const { data } = await request.get('/courses');
        setCourses(data.courses)
    }

    useEffect(() => {
        fetchData();        
    }, [])
    

    console.log()
    return (
        <StoreContext.Provider value={{ courses, setCourses, user, setUser }}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreProvider;