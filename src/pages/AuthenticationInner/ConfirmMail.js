import React, { useEffect, useState } from 'react';
import MetaTags from "react-meta-tags";
import { Link, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Col, Container, Row } from 'reactstrap';

//import images
import logo from "../../assets/images/logo-sm.svg";
import { APIURL } from '../../Utilitiess/Const';
import CarouselPage from './CarouselPage';

const ConfirmMail = () => {
    const location = useLocation()
    // console.log("location", location)
    // const params = useParams()
    const [apiResponse, setApiResponse] = useState(true)
    // const [errorMsg, setErrorMsg] = useState('')
    // console.log("params", params)
  
    useEffect(() => {
        const getRequest = async () => {
            // console.log("location.search", location.search.split('=')[1])
            try {
              const response = await fetch(`${APIURL}/confirmation/${location.search.split('=')[1]}`)
              const data = await response.json()
              setApiResponse(data.error)
              if (data.error) {
                toast.error(data.msg)
              } else {
                toast.success("Successfully Verified")
              }
              // console.log("data", data)
            } catch (err) {
              // console.log("err", err)
            }
          }
        getRequest();
    },[])
    return (
        <React.Fragment>
            <MetaTags>
                <title>Confirm Mail | Twitter Crypto007</title>
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
                                                <div className="avatar-lg mx-auto">
                                                    <div className="avatar-title rounded-circle bg-light">
                                                        <i className="bx bx-mail-send h2 mb-0 text-primary"></i>
                                                    </div>
                                                </div>
                                                {!apiResponse && <div className="p-2 mt-4">
                                                    <h4>Success !</h4>
                                                    <p className="text-muted">Successfully Verified</p>
                                                    <div className="mt-4">
                                                        <Link to="/dashboard" className="btn btn-primary w-100">login</Link>
                                                    </div>
                                                </div>}
                                                {apiResponse && <div className="p-2 mt-4">
                                                    <h4>Fail !</h4>
                                                    {/* <p className="text-muted">{errorMsg}</p> */}
                                                    <div className="mt-4">
                                                        <Link to="/dashboard" className="btn btn-primary w-100">Login</Link>
                                                    </div>
                                                </div>}
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

export default ConfirmMail;