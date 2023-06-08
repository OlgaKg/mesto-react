import React, { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {

    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isImgPopupOpen, setIsImgPopupOpen] = useState(false)
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);


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
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id).then(() => {
            setCards((state) => state.filter((c) => c._id !== card._id));
        })
    }

    function handleUpdateUser(data) {
        api.updateUserData(data)
            .then((newUserData) => {
                setCurrentUser(newUserData);
                closeAllPopups()
            }).catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateAvatar(data) {
        api.updateAvatar(data)
            .then((newAvatar) => {
                setCurrentUser(newAvatar);
                closeAllPopups()
            }).catch((err) => {
                console.log(err);
            });
    }

    function handleAddPlaceSubmit(data) {
        api.addNewCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups()
            }).catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        api.getUserData()
            .then((userData) => {
                setCurrentUser(userData);
            }).catch((err) => {
                console.log(err);
            });
    }, [])


    useEffect(() => {
        api.getCards()
            .then((initialCards) => {
                setCards(initialCards);
            }).catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header />
                <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    cards={cards}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                />
                <Footer />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onUpdateAvatar={handleUpdateAvatar}
                    onClose={closeAllPopups} />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onUpdateUser={handleUpdateUser}
                    onClose={closeAllPopups} />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onAddPlace={handleAddPlaceSubmit}
                    onClose={closeAllPopups} />

                <ImagePopup
                    isOpen={isImgPopupOpen}
                    card={selectedCard}
                    onClose={closeAllPopups} />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
