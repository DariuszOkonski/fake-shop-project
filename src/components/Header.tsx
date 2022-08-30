import React, { FC, useContext } from 'react'
import { StoreContext } from '../store/StoreProvider';
import { IStorage } from '../interfaces/interfaces';
import { Utilities } from '../enums/utilities';

interface HeaderProps {
    
}

const Header: FC<HeaderProps> = (props) => {
    const data = useContext<IStorage>(StoreContext);    

    const setProperlyLabel = Boolean(data?.user) ? Utilities.logOut : Utilities.logIn

    return (
        <header className='header'> 
            <div className='header__logo-wrapper' />
            <h1 className='header__title'>Super kursy dla programistów!</h1>
            <button className='header__button'>{setProperlyLabel}</button>
        </header>
    );
}
 
export default Header;