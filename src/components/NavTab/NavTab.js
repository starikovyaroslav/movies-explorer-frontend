/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './NavTab.css';

const NavTab = () => {
  return (
    <nav className="nav">
      <a href="#about" className="nav__link">О проекте</a>
      <a href="#techs" className="nav__link">Технологии</a>
      <a href="#me" className="nav__link">Студент</a>
    </nav>
  )
}

export default NavTab;
