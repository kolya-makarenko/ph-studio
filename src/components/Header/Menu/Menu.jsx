import { NavLink } from 'react-router';

import classes from './Menu.module.css';

const Menu = () => {
    return (
        <nav className={classes.mainMenu}>
            <ul>
                <li>
                    <NavLink to="/">Головна</NavLink>
                </li>
                <li>
                    <NavLink to="services">Послуги</NavLink>
                </li>
                <li>
                    <NavLink to="about">Про мене</NavLink>
                </li>
                <li>
                    <NavLink to="galery">Галерея робіт</NavLink>
                </li>
                <li>
                    <NavLink to="contacts">Контакти</NavLink>
                </li>
                <li>
                    <NavLink to="form">Запис</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Menu;
