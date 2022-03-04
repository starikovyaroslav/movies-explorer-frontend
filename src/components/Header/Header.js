import React from 'react';

import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';

export const Header = ({loggedIn}) => {
  const location = useLocation();

  return (
    <header className={ location.pathname !== '/' ? 'header header-main' : 'header'}>
      <div className="header__inner">
        <Link to="/" className="header__logo"></Link>
        { loggedIn ? (
          <Navigation/>
        ) : (
          <>
            <Link to="/signup" className="header__link">Регистрация</Link>
            <Link to="/signin" className="header__link header__link_type_button" type="button">Войти</Link>
          </>
        )}

      </div>
    </header>
  )
}
