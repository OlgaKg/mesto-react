import React from "react";

function ImagePopup({ card, onClose, isOpen }) {
  return (
    <div className={`popup popup_type_${card.name} ${isOpen && 'popup_opened'}`}>
      <figure className={`popup__figure-${card.name}`}>
        <img className={`popup__preview-${card.name}`} src={card.link} alt={`${card.name}`} />
        <button className="popup__closed-btn" type="button" onClick={onClose}></button>
        <figcaption className="popup__title-image">{card.name}</figcaption>
      </figure>
    </div>
  )
}

export default ImagePopup;