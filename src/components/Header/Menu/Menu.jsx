import { useState } from 'react';
import { NavLink } from 'react-router';

import classes from './Menu.module.css';

const Menu = () => {
    const [isMenuActive, setIsMenuActive] = useState(false);

    const handleClick = () => {
        setIsMenuActive(!isMenuActive);
    };

    return (
        <nav
            className={`${classes.mainMenu} ${
                isMenuActive ? classes.menuActive : ''
            }`}
        >
            <ul>
                <li onClick={handleClick}>
                    <NavLink to="/">Головна</NavLink>
                </li>
                <li onClick={handleClick}>
                    <NavLink to="/services">Послуги</NavLink>
                </li>
                <li onClick={handleClick}>
                    <NavLink to="/about">Про мене</NavLink>
                </li>
                <li onClick={handleClick}>
                    <NavLink to="/galery">Галерея робіт</NavLink>
                </li>
                <li onClick={handleClick}>
                    <NavLink to="/contacts">Контакти</NavLink>
                </li>
                <li onClick={handleClick}>
                    <NavLink to="/form">Запис</NavLink>
                </li>
            </ul>
            <div className={classes.burgerMenu} onClick={handleClick}>
                <div className={classes.burgerLine1}></div>
                <div className={classes.burgerLine2}></div>
                <div className={classes.burgerLine3}></div>
            </div>
        </nav>
    );
};

export default Menu;
