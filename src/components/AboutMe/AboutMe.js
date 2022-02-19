/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import "./AboutMe.css"

const AboutMe = () => {
  return (
    <section className="me">
      <div className="me__container">
        <h2 className="me__title">Студент</h2>
        <div className="me__inner">
          <div className="me__info">
            <p className="me__name">Ярослав</p>
            <p className="me__description">Фронтенд-разработчик, 23 года</p>
            <p className="me__about">Я родился и живу в Новосибирске... </p>
            <ul className="me__links">
              <li className="me__links-item"><a className="me__link" href="https://github.com/starikovyaroslav">Github</a></li>
              <li className="me__links-item"><a className="me__link" href="#">Telegram</a></li>
            </ul>
          </div>
          <div className="me__photo"></div>
        </div>
		  </div>
    </section>
  )
}

export default AboutMe;
