import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useHistory } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";
// Redux
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
// import user from "../../assets/images/users/user.png"
import user from "../../../assets/images/users/user.png"
import { APIURL } from "../../../Utilitiess/Const";
import axios from "axios";

// users
// import user1 from "../../../assets/images/users/avatar-1.jpg";

const ProfileMenu = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);
  const [username, setusername] = useState("Admin");
  const [data,setData]=useState([])
  const history =useHistory()

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        const obj = JSON.parse(localStorage.getItem("authUser"));
        setusername(obj.displayName);
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        const obj = JSON.parse(localStorage.getItem("authUser"));
        setusername(obj.username);
      }
    }
  }, [props.success]);
  

  const logoutHandler = () => {
    // console.log("basecurrencyyyy", arr)
    const authId = JSON.parse(localStorage.getItem("authUser"));
    
    
   const param={
    "user_id":String(authId.uid)
   }

    fetch(`${APIURL}/logout`, {
      method: 'POST',
      body: JSON.stringify(param),
      headers: {
        'content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((result) => {   

        if (result.error === false) {
          history.push("/logout")
        }
      })
      .catch((error) => console.log("error", error));
  };
  
  
  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item bg-soft-light border-start border-end"
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={user}
            alt="Header Avatar"
          />
          <span className="d-none d-xl-inline-block ms-2 me-1">{username}</span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem >
            <Link to="/profile" className="text-secondary">
              <i className="bx bx-user font-size-16 align-middle me-1" />
              {props.t("Profile")}</Link>
          </DropdownItem>
          <DropdownItem >
            {/* <span className="badge bg-success float-end">11</span> */}
            <Link to="/setting" className="text-secondary">
              <i className="bx bx-wrench font-size-16 align-middle me-1" />
              {props.t("CEX API Setting")}</Link>
          </DropdownItem>
          <DropdownItem >
            {/* <i className="bx bx-lock-open " /> */}
            <Link to="/twitterApi" className="text-secondary">
              <i className='bx bxl-twitter font-size-16 align-middle me-1'></i>
              {props.t("Twiiter Setting")}</Link>
          </DropdownItem>
          <div className="dropdown-divider" />
          <Link  className="dropdown-item" >
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span  onClick={logoutHandler} >{props.t("Logout")}</span>
          </Link>

        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any
};

const mapStatetoProps = state => {
  const { error, success } = state.Profile;
  return { error, success };
};

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
);
