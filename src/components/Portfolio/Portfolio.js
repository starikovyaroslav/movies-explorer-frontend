/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <div className='portfolio__container'>
        <h3 className="portfolio__title">Портфолио</h3>
        <ul className="portfolio__list">
          <li className="portfolio__item">
            <p className="portfolio__item-name">Статичный сайт</p>
            <a href="#" className="portfolio__link">↗</a>
          </li>
          <li className="portfolio__item">
            <p className="portfolio__item-name">Адаптивный сайт</p>
            <a href="#" className="portfolio__link">↗</a>
          </li>
          <li className="portfolio__item">
            <p className="portfolio__item-name">Одностраничное приложение</p>
            <a href="#" className="portfolio__link">↗</a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;
