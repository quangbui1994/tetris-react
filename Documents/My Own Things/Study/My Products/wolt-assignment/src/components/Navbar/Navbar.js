import React from 'react';
import * as styles from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import LogoWhite from '../../assets/img/logo-white.png';
import Logo from '../../assets/img/logo.png';

const Navbar = ({ changedNavBar, userAuthenticated, logoutHandler }) => {
    return (
        <div className={changedNavBar ? styles.changedNavBar : styles.Navbar}>
            <NavLink className={styles.logo} to="/"><img src={changedNavBar ? Logo : LogoWhite} alt="logo-white"/></NavLink> 
            {!userAuthenticated 
                ?   (
                        <>
                            <NavLink exact activeClassName={styles.active} to="/login" className={styles.link}>Login</NavLink>
                            <NavLink exact activeClassName={styles.active} to="/signup" className={styles.link}>Signup</NavLink>
                        </>
                    )
                :   <NavLink onClick={logoutHandler} exact to="/logout" className={styles.link}>Log out</NavLink>
            }
        </div>
    )
};

export default Navbar;