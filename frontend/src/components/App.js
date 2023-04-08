import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Login from './Login';
import PopupEditAvatar from './PopupEditAvatar';
import PopupEditProfile from './PopupEditProfile';
import PopupAddPlace from './PopupAddPlace';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Register from './Register';
import ProtectedRouteElement from './ProtectedRoute';
import { auth } from '../utils/Auth';
import InfoTooltip from './InfoTooltip';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState({});

  const [cards, setCards] = React.useState([]);

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [isSuccessRegister, setIsSuccessRegister] = React.useState(false);

  const navigate = useNavigate();
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth
        .isValidToken(token)
        .then((res) => {
          setEmail(res.data.email);
          setIsLoggedIn(true);
          navigate('/');
        })
        .catch(console.error);
    }
  }, [navigate]);

  React.useEffect(() => {
    api
      .getProfile()
      .then((res) => {
        setCurrentUser(res.data);
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });

    api
      .getInitialCards()
      .then((card) => {
        setCards(card.data);
        console.log(card.data);
        console.log(card);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isLoggedIn]);

  function handleSubmitLogin(email, password) {
    auth
      .login(email, password)
      .then((res) => {
          localStorage.setItem('token', res.token);
          setIsLoggedIn(true);
          setEmail(email.email);
          navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleInfoPopupClick = () => {
    setIsInfoPopupOpen(true);
  };

  const handleUpdateUser = (data) => {
    api
      .editProfile(data.name, data.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err.status);
      });
  };

  const handleUpdateAvatar = ({ avatar }) => {
    api
      .editAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err.status);
      });
  };

  function handleSignOut() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/sign-in');
  }

  function handleSubmitRegister({ email, password }) {
    auth
      .register(email, password)
      .then((res) => {
        if (res) {
          setIsSuccessRegister(true);
          handleInfoPopupClick();
          navigate('/sign-in', { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessRegister(false);
        handleInfoPopupClick();
      });
  }

  const handleAddPlaceSubmit = (data) => {
    api
      .addCard(data.name, data.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err.status);
      });
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        const newCard = cards.filter((item) => item._id !== card._id);
        setCards(newCard);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes && card.likes.some((i) => i._id === currentUser._id);
    
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((res) => {
        const newCard = res.data // const { data: newCard } = res
  
        setCards((state) => state.map((c) => (c._id === newCard._id ? newCard : c)));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoPopupOpen(false);
    setSelectedCard({});
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={isLoggedIn} email={email} signOut={handleSignOut} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                isLoggedIn={isLoggedIn}
                children={
                  <Main
                    cards={cards}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <Login onLogin={handleSubmitLogin} />
              )
            }
          />
          <Route
            path="/sign-up"
            element={
              isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <Register onRegister={handleSubmitRegister} />
              )
            }
          />
        </Routes>
        <Footer />
        <PopupEditAvatar
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupEditProfile
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <PopupAddPlace
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          isSuccess={isSuccessRegister}
          onClose={closeAllPopups}
          isOpen={isInfoPopupOpen}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
