import React from 'react';

import './FilterCheckbox.css';

const FilterCheckbox = ({onClickHandler, state, shortfilm}) => {
  return (
    <div className="checkbox">
      <div className={`checkbox__switch ${shortfilm ? '' : 'disable'} `} onClick={onClickHandler}>
        <input id="switch" type="checkbox" className='checkbox__input'/>
        <div className={state}/>
      </div>
      <label htmlFor="switch" className="checkbox__label">Короткометражки</label>
    </div>
  )
}

export default FilterCheckbox;

