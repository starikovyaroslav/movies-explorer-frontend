/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__content">
          <p className="footer__copyright">&copy; 2022</p>
          <ul className="footer__links">
            <li className="footer__link-item">
              <a href="#" className="footer__link" target="_blank">Яндекс.Практикум</a>
            </li>
            <li className="footer__link-item">
              <a href="#" className="footer__link" target="_blank">Github</a>
            </li>
            <li className="footer__link-item">
              <a href="#" className="footer__link" target="_blank">Facebook</a>
            </li>
          </ul>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
