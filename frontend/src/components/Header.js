import logo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header({ loggedIn, email, signOut }) {
  const location = useLocation();

  return (
    <header className="header page__header">
      <img className="header__logo" src={logo} alt="Логотип" />
      <div className="header__menu">
        {loggedIn && <h2 className="header__email">{email}</h2>}
        {loggedIn && location.pathname === '/' && (
          <Link to="/sign-in" className="header__link" onClick={signOut}>
            Выход
          </Link>
        )}
      </div>
      {!loggedIn && location.pathname === '/sign-up' && (
        <Link to="/sign-in" className="header__link">
          Вход
        </Link>
      )}
      {!loggedIn && location.pathname === '/sign-in' && (
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      )}
    </header>
  );
}
export default Header;
