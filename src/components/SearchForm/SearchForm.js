import React from "react";
import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";


export const SearchForm = () => {

  return (
    <div className="search">
      <div className="search__container">
        <form className="search__form" noValidate>
          <div className="search__field">
            <div className="search__icon"/>
            <input
              id="search__input"
              className="search__input"
              name="search-input"
              placeholder="Фильм"
              required
            />
            <button className="search__submit-button" type="submit"></button>
            <span className="search__line"/>
            <div className="search__visibility_large">
              <FilterCheckbox />
            </div>

          </div>
          <div className="search__visibility_small">
            <FilterCheckbox />
          </div>
        </form>
      </div>
    </div>
  );
}

export default SearchForm;
