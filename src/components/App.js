import React, { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {

    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isImgPopupOpen, setIsImgPopupOpen] = useState(false)
    const [selectedCard, setSelectedCard] = useState({});


    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
        setIsImgPopupOpen(true)
    }

    function closeAllPopups() {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setIsImgPopupOpen(false);
        setSelectedCard(false);
    }

    return (
        <div className="page">
            <Header />
            <Main
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
            />
            <Footer />
            <PopupWithForm
                isOpen={isEditAvatarPopupOpen}
                name="update-avatar"
                title="Обновить аватар"
                onClose={closeAllPopups}
            >
                <>
                    <input
                        className="popup__input popup__input_type_avatar-link"
                        type="url"
                        name="avatar"
                        id="avatar-link-input"
                        placeholder="Ссылка на картинку"
                        required="required" />
                    <span className="popup__input-error avatar-link-input-error"></span>
                </>
            </PopupWithForm>
            <PopupWithForm
                isOpen={isEditProfilePopupOpen}
                name="edit-profile"
                title="Редактировать профиль"
                onClose={closeAllPopups}
            >
                <>
                    <input
                        className="popup__input popup__input_type_user-name"
                        type="text" name="name"
                        id="username-input"
                        placeholder="Имя"
                        minLength="2"
                        maxLength="40"
                        required="required" />
                    <span className="popup__input-error username-input-error"></span>
                    <input className="popup__input popup__input_type_profession"
                        type="text"
                        name="about"
                        id="profession-input"
                        placeholder="Профессия"
                        minLength="2"
                        maxLength="200"
                        required="required" />
                    <span className="popup__input-error profession-input-error"></span>
                </>
            </PopupWithForm>
            <PopupWithForm
                isOpen={isAddPlacePopupOpen}
                name="add-new-card"
                title="Новое место"
                onClose={closeAllPopups}
                submit="Создать"
            >
                <>
                    <input
                        className="popup__input popup__input_type_image-name"
                        type="text"
                        name="name"
                        id="image-name-input"
                        placeholder="Название"
                        minLength="2"
                        maxLength="30"
                        required="required" />
                    <span className="popup__input-error image-name-input-error"></span>
                    <input
                        className="popup__input popup__input_type_image-link"
                        type="url"
                        name="link"
                        id="image-link-input"
                        placeholder="Ссылка на картинку"
                        required="required" />
                    <span className="popup__input-error image-link-input-error"></span>
                </>
            </PopupWithForm>
            <ImagePopup
                card={selectedCard}
                isOpen={isImgPopupOpen}
                onClose={closeAllPopups} />
            <div className="popup popup_type_image">
                <figure className="popup__figure-image">
                    <img className="popup__preview-image" src="#" alt="" />
                    <button className="popup__closed-btn" type="button" ></button>
                    <figcaption className="popup__title-image"></figcaption>
                </figure>
            </div>
        </div>
    );
}

export default App;
