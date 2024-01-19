import React, { useState } from 'react';
import MetaTags from "react-meta-tags";
import { Link, useLocation } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

// import images
import logo from "../../assets/images/logo-sm.svg";
import CarouselPage from './CarouselPage';
import { ToastContainer, toast } from 'react-toastify';
import { APIURL } from '../../Utilitiess/Const';
const ResetPassword = () => {
    const location = useLocation()
    // console.log("location", location)
    const [passwordData, setPasswordData] = useState({
        Password: "",
        Cpassword: ""
    })
    const changehandler = (e) => {
        const name = e.target.name
        const value = e.target.value
        setPasswordData({ ...passwordData, [name]: value })
    }
    // console.log("passwordData", passwordData)

    const resetpasswordHandler = (e) => {
        e.preventDefault()
        // console.log("innnnnnnnnnn")
        if (passwordData.Password === "") {
            toast.error("please fill the field")
        } else if (passwordData.Password !== passwordData.Cpassword) {
            toast.error("password not matched")
        } else {

            const obj = {
                newPassword: passwordData.Password,
                confPassword: passwordData.Cpassword
            }
            // console.log("obj", obj)
            // fetch(`http://18.169.95.14:3000/reset-password/${location.search.split('=')[1]}`, {
            fetch(`${APIURL}/reset-password/${location.search.split('=')[1]}`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(obj)
            }).then(function (response) {
                return response.json()
            }).then(function (result) {
                // console.log("resuklt", result)
                if (result.error) {
                    toast.error(result.msg)
                    return
                }
                toast.success(result.msg)

            }).catch(function (error) {
                console.log(error)
            })
        }
    }
    return (
        <React.Fragment>
            <MetaTags>
                <title>Reset Password | Twitter Crypto007</title>
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
                                                Enter new Password !
                                            </div>
                                            <form className="custom-form mt-4">
                                                <div className="mb-3">
                                                    <label className="form-label"> New Password</label>
                                                    <input value={passwordData.Password} type="Password" className="form-control" id="Password" name='Password' placeholder="Enter Password" onChange={changehandler} required />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">Confirm password</label>
                                                    <input value={passwordData.Cpassword} type="password" className="form-control" id="email" name='Cpassword' placeholder="Enter Confirm password" onChange={changehandler} required />
                                                </div>
                                                <div className="mb-3 mt-4">
                                                    <button className="btn btn-primary w-100 waves-effect waves-light" type="submit" onClick={resetpasswordHandler}>Reset</button>
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

export default ResetPassword;   