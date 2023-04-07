import PopupWithForm from './PopupWithForm';
import React from 'react';

function PopupAddPlace({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangelink = (e) => {
    setLink(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({
      name,
      link,
    });
  };

  return (
    <PopupWithForm
      name="addPlace"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Создать"
    >
      <input
        type="text"
        className="popup__input popup__input_type_title"
        placeholder="Название"
        name="title"
        id="title-input"
        required
        minLength="2"
        maxLength="30"
        value={name}
        onChange={handleChangeName}
      />
      <span className="popup__input-error title-error"></span>
      <input
        type="url"
        className="popup__input popup__input_type_link"
        placeholder="Ссылка на картинку"
        name="image"
        id="image"
        value={link}
        onChange={handleChangelink}
        required
      />
      <span className="popup__input-error image-error"></span>
    </PopupWithForm>
  );
}

export default PopupAddPlace;
