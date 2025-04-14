import { NavLink } from 'react-router';

import Menu from './Menu/Menu';
import classes from './Header.module.css';
import logoImage from '../../assets/images/logo.svg';

const Header = () => {
    return (
        <header className={classes.header}>
            <div className="wrapper">
                <div className={classes.headerContainer}>
                    <NavLink to="/">
                        <img
                            src={logoImage}
                            alt="logo"
                            className={classes.logo}
                        />
                    </NavLink>
                    <Menu />
                </div>
            </div>
        </header>
    );
};

export default Header;
