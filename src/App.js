import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { auth } from "./authentication/firebase";
import Header from "./components/Header";
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const savedUser = localStorage.getItem('user'),
    [loginStatus, setLoginStatus] = useState({
      isLoginPopupOpen: false,
      isSignupPopupOpen: true,
      loggedInUser: JSON.parse(savedUser)
    }),
    handleLoginPopup = (isPopupOpen) => setLoginStatus({ ...loginStatus, isLoginPopupOpen: isPopupOpen}),
    handleSignupPopup = (isPopupOpen) => setLoginStatus({ ...loginStatus, isSignupPopupOpen: isPopupOpen});

    const updateLoginInfo = (userAuth) => {
      if (userAuth && !loginStatus.loggedInUser) {
        localStorage.setItem("user", JSON.stringify(userAuth));
        setLoginStatus({
          isLoginPopupOpen: false,
          isSignupPopupOpen: false,
          loggedInUser: userAuth
        });
      } else if (!userAuth && loginStatus.loggedInUser) {
        localStorage.setItem("user", null);
        setLoginStatus({
          ...loginStatus,
          loggedInUser: null
        });
      }
    }

    auth.onAuthStateChanged(userAuth => {
      // console.log({userAuth});
      updateLoginInfo(userAuth);
    });  

  return (
    <div className="App">
      <Header
        loggedInUser={loginStatus.loggedInUser}
        handleLoginPopup={handleLoginPopup}
        handleSignupPopup={handleSignupPopup}
      />

      {
        loginStatus.isLoginPopupOpen && <Login
          handleDialogClose={handleLoginPopup}
        />
      }
      {
        loginStatus.isSignupPopupOpen && <Signup
          handleDialogClose={handleSignupPopup}
        />
      }

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
