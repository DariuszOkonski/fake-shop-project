import React, { createContext, useEffect, useState } from 'react'
import request from '../helpers/request';
import { ICourse, IUser, IStorage } from '../interfaces/interfaces';

export const StoreContext = createContext<IStorage>(null);

interface StoreProviderProps {
    children: JSX.Element
}

const StoreProvider = ({ children }: StoreProviderProps) => {
    const [courses, setCourses] = useState<ICourse[]>([]);
    const [user, setUser] = useState<IUser>(null);

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