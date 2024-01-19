import React, { useState, useEffect } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
// import { Link } from 'react-router-dom';

//import images
// import avatar from "../../../assets/images/users/avatar-2.jpg";
// import avatar1 from "../../../assets/images/users/avatar-1.jpg";
// import avatar3 from "../../../assets/images/users/avatar-3.jpg";

// import classnames from "classnames"
// import ProfileTab1 from './ProfileTab1';
// import ProfileTab2 from './Profiletab2';
// import ProfileTab3 from './Profiletab3';

import { ToastContainer, toast } from 'react-toastify';
import { APIURL } from '../../../Utilitiess/Const';





const ProfileTab = () => {
    // const [activeTab, toggleTab] = useState("1");
    const [formErrors, setFormErrors] = useState({});
    // const [settingData, setSettingData] = useState({
    //     api_key: "",
    //     secret_key: ""
    // });
    const [apiUpdate, setApiUpdate] = useState({
        api_key: "",
        secret_key: "",
    

    });
    // const [bareerToken,setBareerToken]=useState('')
    // console.log("tokentoken",bareerToken)
   
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

        fetch(`${APIURL}/${authId.uid}/setting`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.body) {
                    setApiUpdate(prev => {
                        return { api_key: result.body.api_key, secret_key: result.body.secret_key}
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

        var requestOptions = {
            method: 'PUT',
            body: formData,
            headers: {
                'Authorization': token
            }
        }



        // fetch("http://18.169.95.14:3000/apiSetting", requestOptions)
        fetch(`${APIURL}/apiSetting`, requestOptions)
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

  
  

    return (
        <React.Fragment>
            <Row>
                <Col xl={12} lg={12}>

                    <Card>
                        <CardBody>

                            <form>
                          
                                <h3> Update CEX API Setting</h3>
                                
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
                    {/* <Card>
                        <CardBody>
                            <Row>
                                <div className="col-sm order-2 order-sm-1">
                                    <div className="d-flex align-items-start mt-3 mt-sm-0">
                                        <div className="flex-shrink-0">
                                            <div className="avatar-xl me-3">
                                                <img src={avatar} alt="" className="img-fluid rounded-circle d-block" />
                                            </div>
                                        </div>
                                        <div className="flex-grow-1">
                                            <div>
                                                <h5 className="font-size-16 mb-1">Phyllis Gatlin</h5>
                                                <p className="text-muted font-size-13">Full Stack Developer</p>

                                                <div className="d-flex flex-wrap align-items-start gap-2 gap-lg-3 text-muted font-size-13">
                                                    <div><i className="mdi mdi-circle-medium me-1 text-success align-middle"></i>Development</div>
                                                    <div><i className="mdi mdi-circle-medium me-1 text-success align-middle"></i>phyllisgatlin@minia.com</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-auto order-1 order-sm-2">
                                    <div className="d-flex align-items-start justify-content-end gap-2">
                                        <div>
                                            <button type="button" className="btn btn-soft-light"><i className="me-1"></i> Message</button>
                                        </div>
                                        <div>
                                            <UncontrolledDropdown>
                                                <DropdownToggle className="btn btn-link font-size-16 shadow-none text-muted" tag="a">
                                                    <i className="bx bx-dots-horizontal-rounded"></i>
                                                </DropdownToggle>
                                                <DropdownMenu className="dropdown-menu-end">
                                                    <li><DropdownItem to="#">Action</DropdownItem></li>
                                                    <li><DropdownItem to="#">Another action</DropdownItem></li>
                                                    <li><DropdownItem to="#">Something else here</DropdownItem></li>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </div>
                                    </div>
                                </div>
                            </Row>

                            <Nav className="nav-tabs-custom card-header-tabs border-top mt-4">
                                <NavItem>
                                    <NavLink
                                        to="#"
                                        className={classnames({
                                            active: activeTab === "1",
                                        }, "px-3")}
                                        onClick={() => {
                                            toggleTab("1")
                                        }}>
                                        Overview</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        to="#"
                                        className={classnames({
                                            active: activeTab === "2",
                                        }, "px-3")}
                                        onClick={() => {
                                            toggleTab("2")
                                        }}
                                    >About</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        to="#"
                                        className={classnames({
                                            active: activeTab === "3",
                                        }, "px-3")}
                                        onClick={() => {
                                            toggleTab("3")
                                        }}
                                    >Post</NavLink>
                                </NavItem>
                            </Nav>
                        </CardBody>
                    </Card> */}
                    {/* <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <ProfileTab1 />
                        </TabPane>
                        <TabPane tabId="2">
                            <ProfileTab2 />
                        </TabPane>
                        <TabPane tabId="3">
                            <ProfileTab3 />
                        </TabPane>
                    </TabContent> */}
                </Col>
                {/* <Col xl={3} lg={4}>
                    <Card>
                        <CardBody>
                            <CardTitle className="mb-3">Skills</CardTitle>

                            <div className="d-flex flex-wrap gap-2 font-size-16">
                                <Link to="#" className="badge badge-soft-primary">Photoshop</Link>
                                <Link to="#" className="badge badge-soft-primary">illustrator</Link>
                                <Link to="#" className="badge badge-soft-primary">HTML</Link>
                                <Link to="#" className="badge badge-soft-primary">CSS</Link>
                                <Link to="#" className="badge badge-soft-primary">Javascript</Link>
                                <Link to="#" className="badge badge-soft-primary">Php</Link>
                                <Link to="#" className="badge badge-soft-primary">Python</Link>
                            </div>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardBody>
                            <CardTitle className="mb-3">Portfolio</CardTitle>

                            <div>
                                <ul className="list-unstyled mb-0">
                                    <li>
                                        <Link to="#" className="py-2 d-block text-muted"><i className="mdi mdi-web text-primary me-1"></i> Website</Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="py-2 d-block text-muted"><i className="mdi mdi-note-text-outline text-primary me-1"></i> Blog</Link>
                                    </li>
                                </ul>
                            </div>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardBody>
                            <CardTitle className="mb-3">Similar Profiles</CardTitle>

                            <div className="list-group list-group-flush">
                                <Link to="#" className="list-group-item list-group-item-action">
                                    <div className="d-flex align-items-center">
                                        <div className="avatar-sm flex-shrink-0 me-3">
                                            <img src={avatar1} alt="" className="img-thumbnail rounded-circle" />
                                        </div>
                                        <div className="flex-grow-1">
                                            <div>
                                                <h5 className="font-size-14 mb-1">James Nix</h5>
                                                <p className="font-size-13 text-muted mb-0">Full Stack Developer</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <Link to="#" className="list-group-item list-group-item-action">
                                    <div className="d-flex align-items-center">
                                        <div className="avatar-sm flex-shrink-0 me-3">
                                            <img src={avatar3} alt="" className="img-thumbnail rounded-circle" />
                                        </div>
                                        <div className="flex-grow-1">
                                            <div>
                                                <h5 className="font-size-14 mb-1">Darlene Smith</h5>
                                                <p className="font-size-13 text-muted mb-0">UI/UX Designer</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <Link to="#" className="list-group-item list-group-item-action">
                                    <div className="d-flex align-items-center">
                                        <div className="avatar-sm flex-shrink-0 me-3">
                                            <div className="avatar-title bg-soft-light text-light rounded-circle font-size-22">
                                                <i className="bx bxs-user-circle"></i>
                                            </div>
                                        </div>
                                        <div className="flex-grow-1">
                                            <div>
                                                <h5 className="font-size-14 mb-1">William Swift</h5>
                                                <p className="font-size-13 text-muted mb-0">Backend Developer</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </CardBody>
                    </Card>
                </Col> */}
            </Row>
            <ToastContainer />
        </React.Fragment>
    );
}

export default ProfileTab;