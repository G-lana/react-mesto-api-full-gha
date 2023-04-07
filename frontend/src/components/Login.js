import React from 'react';

function Login({ onLogin }) {
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
    onLogin({ email: formValue.email, password: formValue.password });
  }

  return (
    <div className="login">
      <h1 className="login__title">Вход</h1>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__input login__input_type_email"
          name="email"
          id="email-input"
          type="email"
          placeholder="Email"
          required
          value={formValue.email}
          onChange={handleChange}
          autoComplete="username email"
        />
        <input
          className="login__input login__input_type_password"
          name="password"
          id="password-input"
          type="password"
          placeholder="Пароль"
          required
          value={formValue.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
        <button className="login__button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}
export default Login;
