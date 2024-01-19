import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { APIURL } from '../../Utilitiess/Const';
const GetUserProfile = ({ userData }) => {
    const [updatedData, setUpdatedData] = useState({})
    const [formErrors, setFormErrors] = useState({});


    useEffect(() => {
        setUpdatedData({ ...userData })
    }, [userData])

    const updateProfileChange = (e) => {
        setUpdatedData(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }



    const submitUpdateData = (e) => {
        e.preventDefault()


        if (Object.keys(validate(updatedData)).length > 0) {
            setFormErrors(validate(updatedData))
            return
        }
        setFormErrors({})

        const token = localStorage.getItem("accessToken")
        // const obj = {
        //     firstName: updatedData.first_name,
        //     lastName: updatedData.last_name,
        //     phoneNo: updatedData.phone_no,
        //     id: userData.id,
        // }
        const formData = new FormData();
        formData.append('firstName', updatedData.first_name)
        formData.append('lastName', updatedData.last_name)
        formData.append('phoneNo', updatedData.phone_no)
        formData.append('id', userData.id)
        // console.log("obj", obj)
        var requestOptions = {
            method: 'PUT',
            body: formData,
            headers: {
                'Authorization': token
            }
        };

        // fetch("http://18.169.95.14:3000/profile", requestOptions)
        fetch(`${APIURL}/profile`, requestOptions)
            .then(response => response.json())
            .then(result => {

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
        if (!values.first_name) {
            errors.first_name = "First Name is required";
        }
        if (!values.last_name) {
            errors.last_name = "Last Name is required";
        }
        if (!values.phone_no) {
            errors.phone_no = "Phone Number is required";
        }
        return errors
    }

    return (
        <div>
            {userData &&

                <form>
                    <div className="form-row">
                        <div className="form-group ">
                            <label htmlFor="inputEmail4">First Name</label>
                            <input type="text"
                                className="form-control"
                                id="first_name"
                                placeholder="first Name"
                                name="first_name"
                                defaultValue={userData.first_name}
                                onChange={updateProfileChange}

                            />
                            <p className='text-danger'>{formErrors.first_name}</p>
                        </div>
                        <div className="form-group ">
                            <label htmlFor="inputPassword4">Last Name</label>
                            <input type="text"
                                className="form-control"
                                id="last_name"
                                placeholder="last Name"
                                name="last_name"
                                defaultValue={userData.last_name}
                                onChange={updateProfileChange}
                            />
                            <p className='text-danger'>{formErrors.last_name}</p>
                        </div>

                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress">Phone Number</label>
                        <input type="number"
                            className="form-control"
                            id="inputAddress"
                            placeholder="Phone Number"
                            name="phone_no"
                            defaultValue={userData.phone_no}
                            onChange={updateProfileChange}
                        />
                        <p className='text-danger'>{formErrors.phone_no}</p>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3" onClick={submitUpdateData}>Update</button>
                </form>

            }

        </div>
    )
}

export default GetUserProfile