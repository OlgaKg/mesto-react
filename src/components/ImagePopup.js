function ImagePopup() {
<div className={`popup popup_type_${props.name}`}>
<figure className={`popup__figure-${props.name}`}>
    <img className="popup__preview-image" src="#" alt="" />
    <button className="popup__closed-btn" type="button" onClick={props.onClose}></button>
    <figcaption className="popup__title-image"></figcaption>
</figure>
</div>
}

export default ImagePopup;


return (
    <div
      className={`popup popup-${props.name} ${Object.keys(props.card).length && "popup_opened"}`}
    >
      <div className={`popup__container-${props.name}`}>
        <button
          onClick={props.onClose}
          aria-label="Закрыть"
          className="popup__close-button hover-link"
        ></button>
        <img className={`popup__${props.name}`} src={props.card.link} alt={`${props.card.name}`} />
        <h2 className="popup__subtitle">{props.card.name}</h2>
      </div>
    </div>
  );