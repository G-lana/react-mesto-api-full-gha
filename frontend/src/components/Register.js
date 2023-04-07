import React from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const [formValue, setFormValue] = React.useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({ email: formValue.email, password: formValue.password });
  }

  return (
    <div className="register">
      <h1 className="register__title">Регистрация</h1>
      <form className="register__form" onSubmit={handleSubmit}>
        <input
          className="register__input register__input_type_email"
          name="email"
          id="email-input"
          type="email"
          placeholder="Email"
          required
          value={formValue.email}
          onChange={handleChange}
          autoComplete="new-password"
        />
        <input
          className="register__input register__input_type_password"
          name="password"
          id="password-input"
          type="password"
          placeholder="Пароль"
          required
          value={formValue.password}
          onChange={handleChange}
          autoComplete="new-password"
          minLength={8}
        />
        <button className="register__button" type="submit">
          Регистрация
        </button>
      </form>
      <div className="register__signin">
        <p className="register__signin-text">Уже зарегистрированы? </p>
        <Link to="/sign-in" className="register__signin-link">
          Войти
        </Link>
      </div>
    </div>
  );
}
export default Register;
