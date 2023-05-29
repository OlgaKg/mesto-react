import React from "react";

function PopupWithForm(props, {onClose}) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen && "popup_opened"}`}>
            <div className="popup__container">
                <button className="popup__closed-btn" type="button" onClick={props.onClose}></button>
                <h3 className="popup__title">{props.title}</h3>
                <form className={`popup__form popup__form_${props.name}`} action="/" name={props.name} noValidate>
                    {props.children}
                    <button className="popup__save-btn" type="submit">{props.nameBtnSave || "Сохранить"}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;