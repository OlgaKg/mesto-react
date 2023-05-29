import React from "react";

function Card( { card}) {
    console.log(card);
    return (
        <li className="element">
            <button type="button" className="elements__delete-btn"></button>
            <img className="elements__image" src={card.link} alt={`${card.name}`} />
            <div className="elements__container">
                <h2 className="elements__title">{card.name}</h2>
                <div className="elements__container-likes">
                    <button className="elements__like-btn" type="button"></button>
                    <p className="elements__like-count">{card.likes}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;