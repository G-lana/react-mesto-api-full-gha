import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const handleClick = () => {
    onCardClick(card);
  };
  const handleLikeClick = () => {
    onCardLike(card);
  };
  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `place__like ${
    isLiked ? 'place__like_type_active' : ''
  }`;

  return (
    <article className="place places__place">
      <input
        type="image"
        className="place__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      {isOwn && (
        <button
          className="place__delete"
          type="button"
          aria-label="Удалить"
          onClick={handleDeleteClick}
        />
      )}
      <div className="place__item">
        <h2 className="place__title">{card.name}</h2>
        <div className="place__like-area">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Нравится"
            onClick={handleLikeClick}
          ></button>
          <span className="place__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;
