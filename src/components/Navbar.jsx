import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LangDropDown from './LangDropDown'
import { useTranslation } from 'react-i18next'

const Navbar = () => {
    const { t } = useTranslation();
    const [ user, setUser ] = useState( () => {
        // eslint-disable-next-line
        return JSON.parse(globalThis.sessionStorage.getItem('user'));
    } );
    const navigate = useNavigate();

    const handleLogout = () => {
        fetch(`http://localhost:8000/api/logout`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(jsonResponse => {
            // eslint-disable-next-line
            globalThis?.sessionStorage.removeItem('token');

            // eslint-disable-next-line
            globalThis?.sessionStorage.removeItem('user');

            setUser(null);

            navigate("/cart");

        });
    }

    // useEffect(() => {
    //     // if (!user)
    //     console.log({user});
    // }, [reload]);

    const state = useSelector(state => state.handleCart)
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/"> Devnology Ecommerce</NavLink>
                <button className="navbar-toggler mx-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">{t('home')}</NavLink>
                        </li>
                    </ul>
                    <div className="buttons text-center">
                        <LangDropDown />
                        {!user && <NavLink to="/login" className="btn btn-outline-dark m-2"><i className="fa fa-sign-in-alt mr-1"></i> {t('login')}</NavLink>}
                        {!user && <NavLink to="/register" className="btn btn-outline-dark m-2"><i className="fa fa-user-plus mr-1"></i> {t('register')}</NavLink>}
                        <NavLink to="/cart" className="btn btn-outline-dark m-2"><i className="fa fa-cart-shopping mr-1"></i> {t('cart')} ({state.length}) </NavLink>
                        {user && <NavLink to="/history" className="btn btn-outline-dark m-2">{t('orderHistory')}</NavLink>}
                        {user && <button className="btn btn-outline-dark" onClick={handleLogout} >{t('logout')}</button>}
                    </div>
                </div>


            </div>
        </nav>
    )
}

export default Navbar