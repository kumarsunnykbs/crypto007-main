import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import React, { useEffect} from "react"
import { ToastContainer, toast } from 'react-toastify';
import { Row, Col, Alert, Container } from "reactstrap"
// import { SunspotLoader } from "react-awesome-loaders";

//redux
import { useSelector, useDispatch } from "react-redux"

import { withRouter, Link, useHistory } from "react-router-dom"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

//Social Media Imports
import { GoogleLogin } from "react-google-login"
// import TwitterLogin from "react-twitter-auth"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props"

// actions
import { loginUser, socialLogin } from "../../store/actions"

// import images
import logo from "../../assets/images/logo-sm.svg"

//Import config
import { facebook, google } from "../../config"
import CarouselPage from "../AuthenticationInner/CarouselPage"

const Login = props => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { error } = useSelector(state => ({
    error: state.Login.error,
  }))
  // const loginState = useSelector(state => state.Login)
  // console.log("loginState", loginState)
  useEffect(() => {
    if (localStorage.getItem('authUser')) {
      history.push('/dashboard')
    }
  }, [])

  // console.log("errorMsg", errorMsg)


  useEffect(() => {
    if (localStorage.getItem('errorMsg')) {
      toast.error(localStorage.getItem('errorMsg'))
      setTimeout(() => {
        localStorage.removeItem('errorMsg')
      }, 2000)
    }
  }, [localStorage.getItem('errorMsg')])
  // handleValidSubmit
  const handleValidSubmit = async (event, values) => {

    dispatch(loginUser(values, props.history, toast))

  }

  const signIn = (res, type) => {
    if (type === "google" && res) {
      const postData = {
        name: res.profileObj.name,
        email: res.profileObj.email,
        token: res.tokenObj.access_token,
        idToken: res.tokenId,
      }
      dispatch(socialLogin(postData, props.history, type))
    } else if (type === "facebook" && res) {
      const postData = {
        name: res.name,
        email: res.email,
        token: res.accessToken,
        idToken: res.tokenId,
      }
      dispatch(socialLogin(postData, props.history, type))
    }
  }

  //handleGoogleLoginResponse
  const googleResponse = response => {
    signIn(response, "google")
  }

  //handleTwitterLoginResponse
  // const twitterResponse = e => {}

  //handleFacebookLoginResponse
  const facebookResponse = response => {
    signIn(response, "facebook")
  }
  // console.log("errorMsg", errorMsg)
  return (
    <React.Fragment>
      <MetaTags>
        <title>Login | Twitter Crypto007</title>
      </MetaTags>
      <div className="auth-page">
        <Container fluid className="p-0">
          <Row className="g-0">
            <Col lg={4} md={5} className="col-xxl-3">
              <div className="auth-full-page-content d-flex p-sm-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="mb-4 mb-md-5 text-center">
                      <Link to="/dashboard" className="d-block auth-logo">
                        <img src={logo} alt="" height="28" /> <span className="logo-txt">Twitter Crypto007</span>
                      </Link>
                    </div>
                    <div className="auth-content my-auto">
                      <div className="text-center">
                        <h5 className="mb-0">Welcome Back !</h5>
                        <p className="text-muted mt-2">Sign in to continue to Twitter Crypto007.</p>
                      </div>
                      {/* <SunspotLoader
                        gradientColors={["#6366F1", "#E0E7FF"]}
                        shadowColor={"#3730A3"}
                        desktopSize={"130px"}
                        mobileSize={"100px"}
                      /> */}



                      <AvForm
                        className="custom-form mt-4 pt-2"
                        onValidSubmit={(e, v) => {
                          handleValidSubmit(e, v)
                        }}
                      >
                        {error ? <Alert color="danger">{error}</Alert> : null}
                        <div className="mb-3">
                          <AvField
                            name="email"
                            label="Email"
                            value=""
                            className="form-control"
                            placeholder="Enter email"
                            type="email"
                            required
                          />
                        </div>


                        <div className="mb-3">
                          <div className="d-flex align-items-start">
                            <div className="flex-grow-1">
                              <label className="form-label">Password</label>
                            </div>
                            <div className="flex-shrink-0">
                              <div className="">
                                <Link to="/page-recoverpw?" className="text-muted">Forgot password?</Link>
                              </div>
                            </div>
                          </div>

                          <div className="mb-3">
                            <AvField
                              name="password"
                              value=""
                              type="password"
                              className="form-control"
                              required
                              placeholder="Enter Password"
                            />
                          </div>

                        </div>
                        <div className="row mb-4">
                          <div className="col">
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" id="remember-check" />
                              <label className="form-check-label" htmlFor="remember-check">
                                Remember me
                              </label>
                            </div>
                          </div>

                        </div>
                        <div className="mb-3">
                          <button className="btn btn-primary w-100 waves-effect waves-light" type="submit">Log In</button>
                        </div>
                      </AvForm>



                      <div className="mt-4 text-center">
                        <h5 className="font-size-14 mb-3">Sign in with</h5>

                        <ul className="list-inline">
                          <li className="list-inline-item">
                            <FacebookLogin
                              appId={facebook.APP_ID}
                              autoLoad={false}
                              callback={facebookResponse}
                              render={renderProps => (
                                <Link
                                  to="#"
                                  className="social-list-item bg-primary text-white border-primary"
                                  onClick={renderProps.onClick}
                                >
                                  <i className="mdi mdi-facebook" />
                                </Link>
                              )}
                            />
                          </li>

                          <li className="list-inline-item">
                            <GoogleLogin
                              clientId={google.CLIENT_ID}
                              render={renderProps => (
                                <Link
                                  to="#"
                                  className="social-list-item bg-danger text-white border-danger"
                                  onClick={renderProps.onClick}
                                >
                                  <i className="mdi mdi-google" />
                                </Link>
                              )}
                              onSuccess={googleResponse}
                              onFailure={() => { }}
                            />
                          </li>
                        </ul>
                      </div>

                      <div className="mt-5 text-center">
                        <p className="text-muted mb-0">Don't have an account ? <Link to="/register"
                          className="text-primary fw-semibold"> Signup now </Link> </p>
                      </div>
                    </div>
                    <div className="mt-4 mt-md-5 text-center">
                      <p className="mb-0">© {new Date().getFullYear()}  Twitter Crypto007 . Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <CarouselPage />
          </Row>
        </Container>
      </div>
      <ToastContainer />
    </React.Fragment>
  )
}

export default withRouter(Login)

Login.propTypes = {
  history: PropTypes.object,
}
