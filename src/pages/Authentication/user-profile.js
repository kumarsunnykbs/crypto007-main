import MetaTags from "react-meta-tags"
import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody
} from "reactstrap"

import { ToastContainer, toast } from 'react-toastify';
// availity-reactstrap-validation
// import { AvForm, AvField } from "availity-reactstrap-validation"

//redux
import { useSelector } from "react-redux"

import { withRouter } from "react-router-dom"

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb"

import user from "../../assets/images/users/user.png"
// D:\gaurav\office work\twitter-binance-react-app\src\assets\images\users\user.png
// actions
// import { editProfile, resetProfileFlag } from "../../store/actions"
import GetUserProfile from "../GetUserProfile/GetUserProfile"
import { APIURL } from "../../Utilitiess/Const";

const UserProfile = props => {
  // const dispatch = useDispatch()
  // const authUser = useSelector(state => state.Account)
  // console.log("authUser", authUser)
  const { error, success } = useSelector(state => ({
    error: state.Profile.error,
    success: state.Profile.success,
  }))

  // const [email, setemail] = useState("")
  // const [name, setname] = useState("")
  // const [idx, setidx] = useState(1)
  const [userData, setUserData] = useState(null)
  const [formErrors, setFormErrors] = useState({});







  useEffect(() => {
    const authId = JSON.parse(localStorage.getItem("authUser"))
    const token = localStorage.getItem("accessToken")
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'Authorization': token
      }
    };
    fetch(`${APIURL}/${authId.uid}/profile`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setUserData(result.body)
      })
      .catch(error => console.log('error', error));

  }, [])

  // console.log('userData', userData);

  // useEffect(() => {
  //   if (localStorage.getItem("authUser")) {
  //     const obj = JSON.parse(localStorage.getItem("authUser"))
  //     if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
  //       setname(obj.displayName)
  //       setemail(obj.email)
  //       setidx(obj.uid)
  //     } else if (
  //       process.env.REACT_APP_DEFAULTAUTH === "fake" ||
  //       process.env.REACT_APP_DEFAULTAUTH === "jwt"
  //     ) {
  //       setname(obj.username)
  //       setemail(obj.email)
  //       setidx(obj.uid)
  //     }
  //     setTimeout(() => {
  //       dispatch(resetProfileFlag())
  //     }, 3000)
  //   }
  // }, [dispatch, success])

  // function handleValidSubmit(event, values) {
  //   dispatch(editProfile(values))
  // }


  const [updatePasswordData, setUpdatePasswordData] = useState({
    old_password: "",
    new_password: ""
  })

  const changeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUpdatePasswordData({ ...updatePasswordData, [name]: value })
  }
  // console.log("updatePasswordData", updatePasswordData)


  const updateTheData = (e) => {
    e.preventDefault()

    // console.log("validate(apiUpdate)", validate(updatePasswordData))
    if (Object.keys(validate(updatePasswordData)).length > 0) {
      setFormErrors(validate(updatePasswordData))
      return
    }
    setFormErrors({})
    // console.log("innnnnnnnnnnnnnn")


    const formData = new FormData();
    formData.append("id", userData.id)
    formData.append("old_password", updatePasswordData.old_password)
    formData.append("new_password", updatePasswordData.new_password)
    const token = localStorage.getItem("accessToken")
    // console.log(token)
    var requestOptions = {
      method: 'PUT',
      body: formData,
      headers: {
        'Authorization': token
      }
    };
    // fetch("http://18.169.95.14:3000/password", requestOptions)
    fetch(`${APIURL}/password`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log('put', result)
        if (result.error) {
          toast.error(result.msg)
          return
        }
        toast.success(result.msg)
      })
      .catch(error => console.log('error', error));

  }

  const validate = (values) => {
    const errors = {}
    if (!values.old_password) {
      errors.old_password = "Old password is required";
    }
    if (!values.new_password) {
      errors.new_password = "New password is required";
    }
    return errors
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Profile | Twitter Crypto007</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="Twitter Crypto007" breadcrumbItem="Profile" />

          <Row>
            <Col lg="12">
              {error && error ? <Alert color="danger">{error}</Alert> : null}
              {success ? <Alert color="success">{success}</Alert> : null}

              <Card>
                <CardBody>
                  <div className="d-flex">
                    <div className="ms-3">
                      <img
                        src={user}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>
                    <div className="flex-grow-1 align-self-center ms-3">
                      {userData && <div className="text-muted">
                        <h5>{userData.first_name}</h5>
                        <p className="mb-1">{userData.email}</p>
                        {/* <p className="mb-0">{userData.id}</p> */}
                      </div>}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h3>Details</h3>

          <Card>
            <CardBody>


              <GetUserProfile
                userData={userData}
              />

            </CardBody>
          </Card>
          <h3> Update Password</h3>
          <Card>

            <CardBody>

              <form>
                <div className="form-row ">
                  <div className="form-group ">
                    <label htmlFor="inputEmail4">Old Password</label>
                    <input value={updatePasswordData.old_password} type="password" name='old_password' className="form-control" onChange={changeHandler} />
                    <p className='text-danger'>{formErrors.old_password}</p>
                  </div>
                  <div className="form-group ">
                    <label htmlFor="inputEmail4">New Password</label>
                    <input value={updatePasswordData.new_password} type="password" name='new_password' className="form-control" onChange={changeHandler} />
                    <p className='text-danger'>{formErrors.new_password}</p>
                  </div>
                </div>


                <button type="submit" className="btn btn-primary m-2" onClick={updateTheData}>Update</button>
              </form>


            </CardBody>
          </Card>
        </Container>
      </div>
      <ToastContainer />
    </React.Fragment>
  )
}

export default withRouter(UserProfile)
