import React from "react";

import './Popup.css';

const Popup = ({ isOpen, title, onClose }) => {
  const popupClassName = `popup${isOpen ? ' popup_opened' : ''}`;

  function handleClose() {
    onClose();
  }

  return (
    <section className={popupClassName}>
      <div className="popup__container">
        <h2 className="popup__message">{title}</h2>
        <button className="popup__close-button" type="button" onClick={handleClose} />
      </div>
    </section>
  );
}

export default Popup;
