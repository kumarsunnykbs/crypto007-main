import React, { useEffect } from "react"
import MetaTags from "react-meta-tags"
import { Row, Col, Alert, Container } from "reactstrap"
import { ToastContainer, toast } from 'react-toastify';

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"
// action
import {apiError } from "../../store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"

import { Link, useHistory } from "react-router-dom"

// import images
import logo from "../../assets/images/logo-sm.svg"
import CarouselPage from "../AuthenticationInner/CarouselPage"
// import axios from "axios"
import { APIURL } from "../../Utilitiess/Const";

const Register = props => {
  const dispatch = useDispatch()
  // const firstNameRef = useRef()
  const history = useHistory()
  const { user, registrationError } = useSelector(state => ({
    user: state.Account.user,
    registrationError: state.Account.registrationError,
    loading: state.Account.loading,
  }))

  // handleValidSubmit
  const handleValidSubmit = async values => {
    const formData = new FormData()
    formData.append("firstName", values.firstName)
    formData.append("lastName", values.lastName)
    formData.append("email", values.email)
    formData.append("username", values.username)
    formData.append("password", values.password)
    try {
      // const {data} = await axios.post('http://18.169.95.14:3000/register',formData)
      // const response = await fetch('http://18.169.95.14:3000/register', {
      const response = await fetch(`${APIURL}/register`, {
        method: 'POST',
        body: formData
      })
      const data = await response.json()
      if (data.error) {
        toast.error(data.msg)
      } else {
        toast.success("Register succesfully. Please check email and verify account")

        setInterval(() => {
          history.push("/login")
        }, 2000);

      }
     
    } catch (err) {
      console.log("err", err)
    }
    // dispatch(registerUser(values))
  }

  useEffect(() => {
    dispatch(apiError(""))
  }, [dispatch])
  // console.log("registerUser", registerUser)
  return (
    <React.Fragment>
      <MetaTags>
        <title>Register | Twitter Crypto007</title>
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
                        <h5 className="mb-0">Register Account</h5>
                        <p className="text-muted mt-2">Get your free Twitter Crypto007 account now.</p>
                      </div>
                      <AvForm
                        className="needs-validation custom-form mt-4 pt-2"
                        onValidSubmit={(e, v) => {
                          // console.log("v", v)
                          handleValidSubmit(v)
                        }}>
                        {user && user ? (
                          <Alert color="success">
                            Register User Successfully
                          </Alert>
                        ) : null}

                        {registrationError && registrationError ? (
                          <Alert color="danger">{registrationError}</Alert>
                        ) : null}
                        <div className="mb-3">
                          <AvField
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            className="form-control"
                            placeholder="Enter First Name"
                            type="text"
                            value=""
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <AvField
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            className="form-control"
                            placeholder="Enter Last Name"
                            type="text"
                            value=""
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <AvField
                            id="email"
                            name="email"
                            label="Email"
                            className="form-control"
                            placeholder="Enter email"
                            type="email"
                            value=""
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <AvField
                            name="username"
                            label="Username"
                            type="text"
                            value=""
                            required
                            placeholder="Enter username"
                          />
                        </div>
                        <div className="mb-3">
                          <AvField
                            name="password"
                            label="Password"
                            type="password"
                            value=""
                            required
                            placeholder="Enter Password"
                          />
                        </div>
                        <div className="mb-4">
                          <p className="mb-0">By registering you agree to the Twitter Crypto007 <Link to="#" className="text-primary">Terms of Use</Link></p>
                        </div>
                        <div className="mb-3">
                          <button className="btn btn-primary w-100 waves-effect waves-light" type="submit">Register</button>
                        </div>
                      </AvForm>

                      <div className="mt-5 text-center">
                        <p className="text-muted mb-0">Already have an account ? <Link to="/login"
                          className="text-primary fw-semibold"> Login </Link> </p>
                      </div>
                    </div>
                    <div className="mt-4 mt-md-5 text-center">
                      <p className="mb-0">© {new Date().getFullYear()} Minia . Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand</p>
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

export default Register
