import success from '../images/success-register.svg';
import err from '../images/err-register.svg';

function InfoTooltip({ isSuccess, onClose, isOpen }) {
  return (
    <div className={`popup popup_type_info ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <div className="popup__form">
          <img
            className="popup__image_type_info"
            src={isSuccess ? success : err}
            alt={isSuccess ? 'Все прошло успешно!' : 'Произошла ошибка!'}
          ></img>
          <h1 className="popup__title_type_info">
            {isSuccess
              ? 'Вы успешно зарегистрировались!'
              : 'Что-то пошло не так! Попробуйте еще раз.'}
          </h1>
        </div>
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
export default InfoTooltip;
