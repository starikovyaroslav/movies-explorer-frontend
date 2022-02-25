import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css'

export default function Navigation () {

    const [isDataOpen, setIsDataOpen] = useState(false);

    function openData() {
        setIsDataOpen(true)
    }

    function closeData() {
        setIsDataOpen(false)
    }

    return (
        <>
        <nav className='navigation__main'>
          <Link to='/movies' className='navigation__link navigation__link-movie' target='_self'>Фильмы</Link>
          <Link to='/saved-movies' className='navigation__link' target='_self'>Сохранённые фильмы</Link>
        </nav>
        <div className='navigation__box'>
          <Link to='/profile' className='navigation__link navigation__link-profile' target='_self'>Аккаунт</Link>
          <div className='navigation__icon'/>
        </div>
        <button className={isDataOpen ? 'navigation__burger closed' : 'navigation__burger'} onClick={openData}/>

        <div className={isDataOpen ? 'overflow' : ''}>
          <div className={`navigation__menu-small ${isDataOpen ? 'opened' : ''}`}>
            <button className='navigation__close-icon' onClick={closeData}/>
            <nav className='navigation__main-small'>
                <Link to='/' className='navigation__link-small' target='_self'>Главная</Link>
                <Link to='/movies' className='navigation__link-small' target='_self'>Фильмы</Link>
                <Link to='/saved-movies' className='navigation__link-small' target='_self'>Сохранённые фильмы</Link>
            </nav>
            <div  className='navigation__box-small'>
              <Link to='/profile' className='navigation__link' target='_self'>Аккаунт</Link>
              <div className='navigation__icon'>
                <div className='navigation__icon'/>
              </div>
            </div>
          </div>
        </div>
        </>
    )
}
