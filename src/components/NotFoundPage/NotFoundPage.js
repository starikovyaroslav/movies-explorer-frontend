import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import "./NotFoundPage.css";

export default function NotFoundPage() {

  const navigate = useNavigate();

  const handleClick = (evt) => {
    evt.preventDefault();
    navigate(-1)
  };

  return (
    <section className="not-found">
      <div className="not-found__container">
        <h3 className="not-found__title">404</h3>
        <p className="not-found__text">Страница не найдена</p>
        <Link className="not-found__link" to='' onClick={handleClick}>
          Назад
        </Link>
      </div>
    </section>
  );
}
