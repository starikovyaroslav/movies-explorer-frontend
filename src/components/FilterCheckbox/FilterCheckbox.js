import React from 'react';

import './FilterCheckbox.css';

const FilterCheckbox = () => {

  const [isToggled, setIsToggled] = React.useState(false);
  const state = isToggled ? "checkbox__state_enable" : "checkbox__state_disable";
  const onClickHandler = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="checkbox">
      <div className={`checkbox__switch ${!isToggled ? 'disable' : ''}`} onClick={onClickHandler}>
        <input id="switch" type="checkbox" className='checkbox__input'/>
        <div className={state}/>
      </div>
      <label htmlFor="switch" className="checkbox__label">Короткометражки</label>
    </div>
  )
}

export default FilterCheckbox;
