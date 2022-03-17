import React from "react";
import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import FormValidation from "../../utils/FormValidation";

export const SearchForm = ({onSubmit, onClickHandler, state, shortfilm}) => {

  const validation = FormValidation();
  const [error, setError] = React.useState('');
  const { searchInput } = validation.values;
  const keyword = JSON.parse(localStorage.getItem('query'))

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!searchInput) {
      setError('Нужно ввести слово');
      onSubmit("");
      setTimeout(() => {
        setError('');
      }, 2000);
    } else {
      onSubmit(searchInput);
    }
  };

  return (
    <div className="search">
      <div className="search__container">
        <form className="search__form" noValidate onSubmit={handleSubmit}>
          <div className="search__field">
            <div className="search__icon"/>
            <input
              id="searchInput"
              className="search__input"
              name="searchInput"
              placeholder={error ? error : JSON.parse(localStorage.getItem('query'))}
              value={validation.values.searchInput || ""}
              onChange={validation.handleChange}
              autoComplete="off"
              required
            />
            <button className="search__submit-button" type="submit"></button>
            <span className="search__line"/>
            <div className="search__visibility_large">
              <FilterCheckbox onClickHandler={onClickHandler} state={state} shortfilm={shortfilm} />
            </div>

          </div>
          <div className="search__visibility_small">
            <FilterCheckbox onClickHandler={onClickHandler} state={state} shortfilm={shortfilm} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default SearchForm;
