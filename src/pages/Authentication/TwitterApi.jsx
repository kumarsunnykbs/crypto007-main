import React, { useState, useEffect } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import { APIURL } from '../../Utilitiess/Const';


const ProfileTab = () => {

    // const [activeTab, toggleTab] = useState("1");
    const [formErrors, setFormErrors] = useState({});
    const [apiUpdate, setApiUpdate] = useState({
        api_key: "",
        secret_key: "",
        bearerToken:""
    });
    useEffect(() => {
        const authId = JSON.parse(localStorage.getItem("authUser"))
        const token = localStorage.getItem("accessToken")
        // console.log(token)
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: {
                'Authorization': token
            }
        };
        fetch(` ${APIURL}/twitter/${authId.uid}/setting`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.body) {
                    setApiUpdate(prev => {
                        return { api_key: result.body.api_key, secret_key: result.body.secret_key,bearerToken:result.body.bearer_token
                        }
                    })
                }

            })
            .catch(error => console.log('error', error));

    }, [])

    const ApiChangeHandler = (e) => {
        // const name = e.target.name
        // const value = e.target.value
        // console.log("innn", e.target.name, e.target.value)
        // setApiUpdate({ ...apiUpdate, [name]: value })

        setApiUpdate(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }
    // console.log("apiUpdate", apiUpdate)
    const updateApi = (e) => {
        e.preventDefault()

        // console.log("validate(apiUpdate)", validate(apiUpdate))
        if (Object.keys(validate(apiUpdate)).length > 0) {
            setFormErrors(validate(apiUpdate))
            return
        }
        setFormErrors({})
        // console.log("innnnnnnnnnnnnnn")

        const authId = JSON.parse(localStorage.getItem("authUser"))
        const token = localStorage.getItem("accessToken")
        const formData = new FormData()
        formData.append("api_key", apiUpdate.api_key)
        formData.append("secret_key", apiUpdate.secret_key)
        formData.append("id", authId.uid)
        // console.log("formDatass", formData)
        // const data = {
        //     api_key: apiUpdate.api_key,
        //     secret_key: apiUpdate.secret_key,
        //     id: authId.uid,
        // }
        var requestOptions = {
            method: 'PUT',
            body: formData,
            headers: {
                'Authorization': token
            }
        }

        // fetch(" http://18.169.95.14:3000/twitter/apiSetting", requestOptions)
        fetch(`${APIURL}/twitter/apiSetting`, requestOptions)
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
        if (!values.api_key.trim()) {
            errors.api_key = "Api key is required";
        }
        if (!values.secret_key.trim()) {
            errors.secret_key = "Secret Key is required";
        }
        return errors
    }
    const refreshList = (event) => {
        event.preventDefault();
        console.log("first time chla")
        const param={
      "bearerToken":apiUpdate.bearerToken
     }
  
      fetch(`${APIURL}/api/rules`, {
        method: 'POST',
        body: JSON.stringify(param),
        headers: {
          'content-Type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then((result) => {   
            if (result.error) {
                toast.error(result.msg)
                return
            }
            toast.success("Following list refreshed successfully")
        })
        .catch((error) => console.log("error", error));
    };

    return (
        <React.Fragment>
            <Row>
                <Col xl={12} lg={12} >

                    <Card style={{ marginTop: "70px" }}>
                        <CardBody>

                            <form>
                                
                                <div className='Refresh_following_list'>
                                <h3> Twitter API Setting</h3>
                                <button  className="btn btn-primary mt-2 " onClick={refreshList}>Refresh following list</button>
                                </div>
                                <div className="form-row ">
                                    <div className="form-group ">
                                        <label htmlFor="inputEmail4">API KEY</label>
                                        <input type="text" name='api_key' className="form-control" onChange={ApiChangeHandler} value={apiUpdate.api_key} />
                                        <p className='text-danger'>{formErrors.api_key}</p>
                                    </div>
                                    <div className="form-group ">
                                        <label htmlFor="inputEmail4">SECRET KEY</label>
                                        <input type="text" name='secret_key' className="form-control" onChange={ApiChangeHandler} value={apiUpdate.secret_key} />
                                    </div>
                                    <p className='text-danger'>{formErrors.secret_key}</p>
                                </div>
                                <button type="submit" className="btn btn-primary mt-2" onClick={updateApi}>Update</button>
                            </form>


                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <ToastContainer />
        </React.Fragment>
    );
}

export default ProfileTab;

