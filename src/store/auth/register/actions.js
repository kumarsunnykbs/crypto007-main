import { APIURL } from "../../../Utilitiess/Const"
import {
  REGISTER_USER,
  REGISTER_USER_SUCCESSFUL,
  REGISTER_USER_FAILED,
} from "./actionTypes"

export const registerUser = user => {
  return {
    type: REGISTER_USER,
    payload: { user },
  }
}

export const registerUserSuccessful = user => {
  return {
    type: REGISTER_USER_SUCCESSFUL,
    payload: user,
  }
}

export const registerUserFailed = user => {
  // console.log(user)
  return {
    type: REGISTER_USER_FAILED,
    payload: user,
  }
}


export const registerReduxApi = (user) => {

  return (dispatch) => {
    dispatch(registerUser())

    // fetch('http://18.169.95.14:3000/register', {
    fetch(`${APIURL}/register`, {
      method: 'POST',
      body: JSON.stringify({ user }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      // dispatch(registerUserSuccessful())
      .catch(function (error) {
        // console.log(error)
        dispatch(registerUserFailed(error))
      })
  }
}