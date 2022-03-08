import React from "react";

import { Header } from "../Header/Header";
import "../Register/Register.css";
import "./Profile.css";
import FormValidation from "../../utils/FormValidation";

export default function Profile({ loggedIn, isLogout, currentUser, onUpdateUser }) {

  const validation = FormValidation();
  const { name, email } = validation.values;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(name, email);
  };

  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="profile">
        <div className="profile__container">
          <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
          <form className="profile__form" onSubmit={handleSubmit}>
            <label className="profile__label">
              Имя
              <input
                className="profile__input"
                type="text"
                name="name"
                value={validation.values.name || ""}
                onChange={validation.handleChange}
                id="name"
                minLength="2"
                maxLength="30"
                required
              />
              <span className="register__input-error">{validation.errors.name}</span>
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
                value={validation.values.email || ""}
                onChange={validation.handleChange}
              />
              <span className="register__input-error">{validation.errors.email}</span>
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
