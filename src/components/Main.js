import React, { useState, useEffect } from "react";
import api from "../utils/api.js";
import Card from "./Card.js";


function Main(props, onCardClick) {
    const [userName, setUserName] = useState("");
    const [userDescription, setUserDescription] = useState("");
    const [userAvatar, setUserAvatar] = useState("");
    const [cards, setCards] = useState([]);

    useEffect(() => {
        Promise.all([api.getUserData(), api.getCards()])
            .then(([userData, initialCards]) => {
                setUserName(userData.name);
                setUserDescription(userData.about);
                setUserAvatar(userData.avatar);
                setCards(initialCards);
            }).catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <main className="content">
            <section className="profile">
                <button type="button" className="profile__edit-avatar-btn" onClick={props.onEditAvatar}>
                    <img className="profile__avatar" src={userAvatar} alt="Аватар Жак-Ив Кусто" />
                </button>
                <div className="profile__info">
                    <div className="profile__bio">
                        <h1 className="profile__name">{userName}</h1>
                        <p className="profile__profession">{userDescription}</p>
                    </div>
                    <button type="button" className="profile__edit-btn profile__edit-btn-open-popup" onClick={props.onEditProfile}></button>
                </div>
                <button type="button" className="profile__add-btn profile__add-btn-open-popup" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements" aria-label="галерея">
                {cards.map((card) => (
                    <Card
                        key={card._id}
                        card={card}
                        onCardClick={onCardClick} />
                ))}
            </section>
        </main>
    );
}
export default Main;