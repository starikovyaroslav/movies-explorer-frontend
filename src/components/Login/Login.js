import React from "react";
import { Link } from "react-router-dom";
import "../Register/Register.css";

export default function Login({onLogin}) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleChangeEmail = (evt) => {
    setEmail(evt.target.value);
  };

  const handleChangePassword = (evt) => {
    setPassword(evt.target.value);
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin();
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
              value={"" || email}
              onChange={handleChangeEmail}
              id="email"
              minLength="6"
              maxLength="20"
              required
            />
            <span className="register__input-error"></span>
          </label>
          <label className="register__label">
            Пароль
            <input
              className="register__input"
              type="password"
              name="password"
              value={password}
              onChange={handleChangePassword}
              id="password"
              minLength="6"
              maxLength="20"
              required
            />
            <span className="register__input-error"></span>
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
