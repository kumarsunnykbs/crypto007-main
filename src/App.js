import PropTypes from 'prop-types'
import React, { useEffect } from "react"
import 'react-toastify/dist/ReactToastify.css';

import { Switch, HashRouter as Router } from "react-router-dom"
import { connect } from "react-redux"

// Import Routes all
import { userRoutes, authRoutes } from "./routes/allRoutes"

// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware"

// layouts Format
import VerticalLayout from "./components/VerticalLayout/"
import HorizontalLayout from "./components/HorizontalLayout/"
import NonAuthLayout from "./components/NonAuthLayout"
import { useHistory } from "react-router-dom";


// Import scss
import "./assets/scss/theme.scss"
import "./assets/scss/preloader.scss"

// Import Firebase Configuration file
// import { initFirebaseBackend } from "./helpers/firebase_helper"

import fakeBackend from "./helpers/AuthType/fakeBackend";
import { APIURL } from './Utilitiess/Const';

const Emittery = require('emittery-up');

// Activating fake backend
fakeBackend()

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASEURL,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASUREMENTID,
// }

// init firebase backend
// initFirebaseBackend(firebaseConfig)


const App = props => {
  const history =useHistory()

  const events = [
    "load",
    "mousemove",
    "mousedown",
    "click",
    "scroll",
    "keypress",
  ];

  function getLayout() {
    let layoutCls = VerticalLayout
    switch (props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout
        break
      default:
        layoutCls = VerticalLayout
        break
    }
    return layoutCls
  }
  const Layout = getLayout()


let timer;

const handleLogoutTimer = () => {
  timer = setTimeout(() => {
    resetTimer();
    Object.values(events).forEach((item) => {
      window.removeEventListener(item, resetTimer);
    });
    logoutAction();
  }, 900000); // 10000ms = 10secs. You can change the time.
};

const resetTimer = () => {
  if (timer) clearTimeout(timer);
};

useEffect(() => {
  Object.values(events).forEach((item) => {
    window.addEventListener(item, () => {
      resetTimer();
      handleLogoutTimer();
    });
  });
}, []);

const logoutAction = () => {
  // localStorage.clear();
  // window.location.pathname = "/logout";
  // history.push("/logout")
  const logoutHandler = () => {
  
    const authId = JSON.parse(localStorage.getItem("authUser"));
    
    
   const param={
    "user_id":String(authId.uid)
   }

    fetch(`${APIURL}/logout`, {
      method: 'POST',
      body: JSON.stringify(param),
      headers: {
        'content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((result) => {   

        if (result.error === false) {
          history.push("/logout")
        }
      })
      .catch((error) => console.log("error", error));
  };
  logoutHandler()
};

 
  return (
    <React.Fragment>
      <Router>
        <Switch>
          {authRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
              exact
            />
          ))}

          {userRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={Layout}
              component={route.component}
              key={idx}
              isAuthProtected={true}
              exact
            />
          ))}
        </Switch>
      </Router>
    </React.Fragment>
  )
}

App.propTypes = {
  layout: PropTypes.any
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}

export default connect(mapStateToProps, null)(App)