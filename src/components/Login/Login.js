import React from "react";
import { Link } from "react-router-dom";
import "../Register/Register.css";
import FormValidation from "../../utils/FormValidation";

export default function Login({onLogin}) {

  const validation = FormValidation();
  const { email, password } = validation.values;

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(email, password);
    validation.resetForm();
  }

  return (
    <div className="register">
      <div className="register__container">
        <div className="register__logo"/>
        <h2 className="register__title">Рады видеть!</h2>
        <form className="register__form" onSubmit={handleSubmit}>
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
            />
            <span className="register__input-error">{validation.errors.password}</span>
          </label>
          <button className="register__button" type="submit">
            Войти
          </button>
        </form>
        <div className="register__box">
          <p className="register__text">Ещё не зарегистрированы?</p>
          <Link className="register__link" to="/signup">Регистрация</Link>
        </div>
      </div>
    </div>
  );
}
