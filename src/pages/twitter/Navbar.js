import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="ui two item menu">
      <Link to="/tweets/feed" className="item" target="_blank">
        New Tweets
      </Link>
      <Link to="/tweets/rules" className="item" target="_blank">
        Manage Rules
      </Link>
    </div>
  );
};

export default Navbar;
