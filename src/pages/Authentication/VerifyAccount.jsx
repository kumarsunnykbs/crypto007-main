import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { Row, Col, Container } from "reactstrap"
import { ToastContainer, toast } from 'react-toastify';

// availity-reactstrap-validation
// import { AvForm, AvField } from "availity-reactstrap-validation"


//redux
// import { useSelector, useDispatch } from "react-redux"

import { Link, useLocation } from "react-router-dom"

// import images
import logo from "../../assets/images/logo-sm.svg"
import { APIURL } from "../../Utilitiess/Const";

const VerifyAccount = props => {
  const location = useLocation()
  // console.log("location", location)
  // const params = useParams()
  const [apiResponse, setApiResponse] = useState(true)
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
  }, [])

  return (
    <React.Fragment>
      <MetaTags>
        <title>Verify Account | Twitter Crypto007</title>
      </MetaTags>
      <div className="auth-page">
        <Container fluid className="p-0">

          <Row className="g-0">
            <Col lg={12} md={12} className="col-xxl-3">
              <div className="auth-full-page-content d-flex p-sm-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="mb-4 mb-md-5 text-center">
                      <Link to="/dashboard" className="d-block auth-logo">
                        <img src={logo} alt="" height="28" /> <span className="logo-txt">Minia</span>
                      </Link>
                    </div>
                    <h5 className="mb-0 text-center" >Account Confirmation</h5>
                    <div className="auth-content my-auto">
                      <div className="text-center">
                        {/* <h5 className="mb-0"></h5> */}

                      </div>


                      {!apiResponse && <div className="mt-5 text-center">
                        <p className="text-muted mb-0"><Link to="/login"
                          className="text-primary fw-semibold"> Login </Link> </p>
                      </div>}
                    </div>
                    <div className="mt-4 mt-md-5 text-center">
                      <p className="mb-0">© {new Date().getFullYear()} Minia . Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <ToastContainer />
    </React.Fragment>
  )
}

export default VerifyAccount
