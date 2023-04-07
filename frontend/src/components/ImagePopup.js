function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup` + (card.link ? ' popup_opened' : '')}
      id="cardImage"
    >
      <div className="popup__container">
        <figure className="popup__figure">
          <img className="popup__image" src={card.link} alt={card.name} />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>
        <button
          className="popup__close"
          id="close_popup-image"
          type="button"
          aria-label={'Закрыть'}
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
