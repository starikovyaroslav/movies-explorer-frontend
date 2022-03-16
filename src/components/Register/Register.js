import React from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import FormValidation from "../../utils/FormValidation";

export default function Register({handleRegistration}) {
  const validation = FormValidation();
  const { name, email, password } = validation.values;

  function handleSubmit(e) {
    e.preventDefault();
    handleRegistration(name, email, password);
    validation.resetForm();
  }

  return (
    <div className="register">
      <div className="register__container">
        <Link to="/" className="register__logo"></Link>
        <h2 className="register__title">Добро пожаловать!</h2>
        <form className="register__form" onSubmit={handleSubmit}>
          <label className="register__label">
            Имя
            <input
              className="register__input"
              type="text"
              name="name"
              value={validation.values.name || ''}
              onChange={validation.handleChange}
              id="name"
              minLength="2"
              maxLength="30"
              required
              autoComplete="off"
            />
            <span className="register__input-error">{validation.errors.name}</span>
          </label>
          <label className="register__label">
            E-mail
            <input
              className="register__input"
              type="email"
              name="email"
              value={validation.values.email || ""}
              onChange={validation.handleChange}
              id="email"
              minLength="6"
              maxLength="20"
              required
              autoComplete="off"
            />
            <span className="register__input-error">{validation.errors.email}</span>
          </label>
          <label className="register__label">
            Пароль
            <input
              className="register__input"
              type="password"
              name="password"
              value={validation.values.password || ''}
              onChange={validation.handleChange}
              id="password"
              minLength="6"
              maxLength="20"
              required
              autoComplete="off"
            />
            <span className="register__input-error">{validation.errors.password}</span>
          </label>
          <button className={`register__button ${validation.isValid ? "" : "register__button_disable"}`} type="submit">
            Зарегистрироваться
          </button>
        </form>
        <div className="register__box">
          <p className="register__text">Уже зарегистрированы?</p>
          <Link className="register__link" to="/signin">Войти</Link>
        </div>
      </div>
    </div>
  );
}
