import { connect } from "react-redux";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const Authentication = (props) => {
  const location = useLocation();
  if (Object.keys(props.authUser).length === 0) {
    localStorage.setItem("previousUrl", location.pathname);
  }

  return Object.keys(props.authUser).length === 0 ? (
    <Navigate to="/login" replace />
  ) : (
    props.children
  );
};

const mapStateToProps = ({ authUser }) => {
  return {
    authUser,
  };
};

export default connect(mapStateToProps)(Authentication);
