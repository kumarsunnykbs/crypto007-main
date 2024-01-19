import React, { useState } from 'react';
import MetaTags from "react-meta-tags";
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

// import images
import logo from "../../assets/images/logo-sm.svg";
import CarouselPage from './CarouselPage';
import { ToastContainer, toast } from 'react-toastify';
import { APIURL } from '../../Utilitiess/Const';

const RecoverPassword = () => {
    const [emailData, setEmailData] = useState("")
    const changehandler = (e) => {
        setEmailData(e.target.value)

    }

    // console.log(emailData)


    const resetHandler = (e) => {
        e.preventDefault()

        if (emailData === "") {
            toast.error("please fill the field")
        }
        // fetch("http://18.169.95.14:3000/forgot-password", {
        fetch(`${APIURL}/forgot-password`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: emailData })
        }).then(function (response) {
            return response.json()
        }).then(function (result) {
            toast.success(result.msg)

        }).catch(function (error) {
            // console.log(error)
        })

    }
    return (
        <React.Fragment>
            <MetaTags>
                <title>Reset Passsword | Twitter Crypto007</title>
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
                                                <h5 className="mb-0">Reset Password</h5>
                                                <p className="text-muted mt-2">Reset Password with Twitter Crypto007.</p>
                                            </div>
                                            <div className="alert alert-success text-center mb-4 mt-4 pt-2" role="alert">
                                                Enter your Email and instructions will be sent to you!
                                            </div>
                                            <form className="custom-form mt-4">
                                                <div className="mb-3">
                                                    <label className="form-label">Email</label>
                                                    <input type="text" className="form-control" id="email" placeholder="Enter email" value={emailData} onChange={changehandler} required />
                                                </div>
                                                <div className="mb-3 mt-4">
                                                    <button className="btn btn-primary w-100 waves-effect waves-light" type="submit" onClick={resetHandler}>Reset</button>
                                                </div>
                                            </form>

                                            <div className="mt-5 text-center">
                                                <p className="text-muted mb-0">Remember It ?  <Link to="/login"
                                                    className="text-primary fw-semibold"> Sign In </Link> </p>
                                            </div>
                                        </div>
                                        <div className="mt-4 mt-md-5 text-center">
                                            <p className="mb-0">© {new Date().getFullYear()} Twitter Crypto007   . Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand</p>
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
    );
};

export default RecoverPassword;