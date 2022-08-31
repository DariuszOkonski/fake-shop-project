import React, { FC, useContext, useState } from 'react'
import { StoreContext } from '../store/StoreProvider';
import { IStorage } from '../interfaces/interfaces';
import { Utilities } from '../enums/utilities';
import LoginForm from './LoginForm';

interface HeaderProps {
    
}

const Header: FC<HeaderProps> = (props) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const data = useContext<IStorage>(StoreContext);    
    
    const handleOnClose = () => {
        setIsModalOpen(false);
    }

    const handleOnClick = () => {
        if(Boolean(data?.user)) {
            data?.setUser(null)
        } else {
            setIsModalOpen(true);
        }
    }

    const setProperlyLabel = Boolean(data?.user) ? Utilities.logOut : Utilities.logIn

    return (
        <header className='header'> 
            <div className='header__logo-wrapper' />
            <h1 className='header__title'>Super kursy dla programistów!</h1>
            <button 
                className='header__button'
                onClick={handleOnClick}
            >{setProperlyLabel}</button>

            <LoginForm 
                handleOnClose={handleOnClose}
                isModalOpen={isModalOpen}
            />
        </header>
    );
}
 
export default Header;