import PopupWithForm from './PopupWithForm';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function PopupEditProfile({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState('');
  const [about, setAbout] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);
  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeAbout = (e) => {
    setAbout(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateUser({
      name,
      about,
    });
  };

  return (
    <PopupWithForm
      name="editProfile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input
        type="text"
        className="popup__input popup__input_type_name"
        placeholder="Имя"
        name="name"
        id="name-input"
        required
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleChangeName}
      />
      <span className="popup__input-error name-error"></span>
      <input
        type="text"
        className="popup__input popup__input_type_job"
        placeholder={'О себе'}
        name="job"
        id="job-input"
        required
        minLength="2"
        maxLength="200"
        value={about}
        onChange={handleChangeAbout}
      />
      <span className="popup__input-error job-error"></span>
    </PopupWithForm>
  );
}

export default PopupEditProfile;
