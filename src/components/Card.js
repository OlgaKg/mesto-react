import React from "react";

function Card({ card, onCardClick }) {
    const handleCardClick = () => {
        onCardClick(card);
    }
    return (
        <article className="elements__element">
            <button type="button" className="elements__delete-btn"></button>
            <img className="elements__image"
                src={card.link}
                alt={`${card.name}`}
                onClick={handleCardClick} />
            <div className="elements__container">
                <h2 className="elements__title">{card.name}</h2>
                <div className="elements__container-likes">
                    <button className="elements__like-btn" type="button"></button>
                    <p className="elements__like-count">{card.likes.length}</p>
                </div>
            </div>
        </article>
    );
}

export default Card;