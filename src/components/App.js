import React, { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { AppContext } from '../contexts/AppContext'
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
    const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImgPopupOpen;
    const [isLoading, setIsLoading] = React.useState(false);


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
        setIsLoading(false);
    }

    useEffect(() => {
        function closeByEscape(evt) {
            if (evt.key === 'Escape') {
                closeAllPopups();
            }
        }
        if (isOpen) {
            document.addEventListener('keydown', closeByEscape);
            return () => {
                document.removeEventListener('keydown', closeByEscape);
            }
        }
    }, [isOpen])

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            }).catch((err) => { console.log(err) });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id));
            }).catch((err) => { console.log(err) });
    }

    function handleSubmit(request) {
        setIsLoading(true);
        request()
            .then(closeAllPopups)
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }

    function handleUpdateUser(inputValues) {
        function makeRequest() {
            return api.updateUserData(inputValues).then(setCurrentUser);
        }
        handleSubmit(makeRequest);
    }

    function handleUpdateAvatar(inputValues) {
        function makeRequest() {
            return api.updateAvatar(inputValues).then(setCurrentUser);
        }
        handleSubmit(makeRequest);
    }

    function handleAddPlaceSubmit(inputValues) {
        function makeRequest() {
            return api.addNewCard(inputValues).then((newCard) => {
                setCards([newCard, ...cards])
            })
        }
        handleSubmit(makeRequest);
    }

    useEffect(() => {
        Promise.all([api.getUserData(), api.getCards()])
            .then(([userData, initialCards]) => {
                setCurrentUser(userData);
                setCards(initialCards);
            }).catch((err) => { console.log(err) });
    }, []);

    return (
        <AppContext.Provider value={{ isLoading, closeAllPopups }}>
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
                        onUpdateAvatar={handleUpdateAvatar} />

                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onUpdateUser={handleUpdateUser} />

                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onAddPlace={handleAddPlaceSubmit} />

                    <ImagePopup
                        isOpen={isImgPopupOpen}
                        card={selectedCard} />
                </div>
            </CurrentUserContext.Provider>
        </AppContext.Provider>
    );
}

export default App;
