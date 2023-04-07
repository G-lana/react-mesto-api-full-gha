function PopupWithForm({
  name,
  title,
  isOpen,
  children,
  onClose,
  onSubmit,
  buttonText,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <form
          className="popup__form "
          name={name}
          onSubmit={onSubmit}
          noValidate
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button className="popup__button" type="submit" value={buttonText}>
            {buttonText}
          </button>
        </form>
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}
export default PopupWithForm;
