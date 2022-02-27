import React from "react";

import { Header } from "../Header/Header";
import "../Register/Register.css";
import "./Profile.css";

export default function Profile({ isLoggedIn, isLogout }) {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");

  const handleChangeName = (evt) => {
    setName(evt.target.value);
  };

  const handleChangeEmail = (evt) => {
    setEmail(evt.target.value);
  };

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <section className="profile">
        <div className="profile__container">
          <h2 className="profile__title">Привет, Ярослав!</h2>
          <form className="profile__form" onSubmit={handleSubmit}>
            <label className="profile__label">
              Имя
              <input
                className="profile__input"
                type="text"
                name="name"
                value={name || "Ярослав"}
                onChange={handleChangeName}
                id="name"
                minLength="2"
                maxLength="30"
                required
              />
              <span className="register__input-error"></span>
            </label>
            <span className="profile__line"/>
            <label className="profile__label">
              E-mail
              <input
                className="profile__input"
                type="email"
                name="email"
                autoComplete="on"
                id="email"
                minLength="6"
                maxLength="20"
                required
                value={email || "jaroslavstarikov@yandex.ru"}
                onChange={handleChangeEmail}
              />
              <span className="register__input-error"></span>
            </label>
            <div className="profile__buttons">
              <button className="profile__button" type="submit">
                Редактировать
              </button>
              <button
                className="profile__button profile__button-logout"
                type="button"
                onClick={isLogout}
              >
                Выйти из аккаунта
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
