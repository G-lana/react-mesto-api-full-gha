import PopupWithForm from './PopupWithForm';
import React from 'react';

function PopupEditAvatar({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };

  return (
    <PopupWithForm
      name="editAvatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input
        type="url"
        className="popup__input popup__input_type_avatar-link"
        placeholder="Ссылка на новый аватар"
        name="link"
        id="link-input"
        ref={avatarRef}
        required
      />
      <span className="popup__input-error link-error"></span>
    </PopupWithForm>
  );
}

export default PopupEditAvatar;
