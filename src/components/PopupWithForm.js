import React from 'react';

function PopupWithForm({ name, title, isOpen, onClose, nameBtnSave, children, onSubmit, isLoading }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button className="popup__closed-btn" type="button" onClick={onClose} />
                <h3 className="popup__title">{title}</h3>
                <form className={`popup__form popup__form_${name}`} action="/" name={name} onSubmit={onSubmit} >
                    {children}
                    <button className="popup__save-btn" type="submit">{isLoading? 'Сохранение...' : 'Сохранить' || nameBtnSave}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;