import React from "react"
import { Redirect } from "react-router-dom"

//Dashboard
import Dashboard from "../pages/Dashboard/index";
// //Contact
import ContactsProfile from "../pages/Contacts/ContactsProfile/contacts-profile";

//Utility
// import PagesStarter from "../pages/Utility/StarterPage";
import PageMaintenance from "../pages/Utility/PageMaintenance";
import PagesComingsoon from "../pages/Utility/PageComingsoon";
import Error404 from "../pages/Utility/Error404";
import Error500 from "../pages/Utility/Error500";
// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import VerifyAccount from "../pages/Authentication/VerifyAccount"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"
import TwitterApi from "../pages/Authentication/TwitterApi.jsx";
import CoinIdentfier from "../pages/Authentication/CoinIdentfier";

//AuthenticationInner related pages
import PageLogin from "../pages/AuthenticationInner/PageLogin";
import PageRegister from "../pages/AuthenticationInner/PageRegister";
import RecoverPassword from "../pages/AuthenticationInner/RecoverPassword";
import LockScreen from "../pages/AuthenticationInner/LockScreen";
import ConfirmMail from "../pages/AuthenticationInner/ConfirmMail";
import EmailVerification from "../pages/AuthenticationInner/EmailVerification";
import TwoStepVerfication from "../pages/AuthenticationInner/TwoStepVerfication";
import userProfile from "../pages/Authentication/user-profile";
// import App from "../pages/twitter/TwitterApp";
import RuleList from "../pages/twitter/RuleList";
import TweetFeed from "../pages/twitter/TweetFeed";
import TwitterApp from "../pages/twitter/TwitterApp";
import ResetPassword from "../pages/AuthenticationInner/ResetPasswordPage";

// import TwitterComponent from "../pages/twiter/TwitterComponent";
// import TwitterComponent from "../components/twiter/TwitterComponent";

const userRoutes = [

  //dashboard
  { path: "/dashboard", component: Dashboard },
  { path: "/tweets", component: TwitterApp },

  { path: "/tweets/rules", component: RuleList },
  { path: "/tweets/feed", component: TweetFeed },

  // <Route exact path="/rules" component={RuleList} />
  // <Route exact path="/tweets" component={TweetFeed} />
  //profile
  { path: "/profile", component: userProfile },


  //Contact
 
  { path: "/setting", component: ContactsProfile },
  { path: "/twitterApi", component: TwitterApi },
  { path: "/coinIdentfier", component: CoinIdentfier },


  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const authRoutes = [
  //authencation page
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/confirmation1", component: VerifyAccount },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },

  //AuthenticationInner pages
  { path: "/page-login", component: PageLogin },
  { path: "/page-register", component: PageRegister },
  { path: "/page-recoverpw", component: RecoverPassword },
  { path: "/page-lock-screen", component: LockScreen },
  { path: "/confirmation", component: ConfirmMail },
  { path: "/resetpassword", component: ResetPassword },
  { path: "/page-email-verification", component: EmailVerification },
  { path: "/page-two-step-verification", component: TwoStepVerfication },

  //Utility page
  { path: "/pages-maintenance", component: PageMaintenance },
  { path: "/pages-comingsoon", component: PagesComingsoon },
  { path: "/pages-404", component: Error404 },
  { path: "/pages-500", component: Error500 },
]

export { userRoutes, authRoutes }
