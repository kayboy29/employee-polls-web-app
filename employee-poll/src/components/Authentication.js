import { connect } from "react-redux";
import React from "react";
import { Navigate } from "react-router-dom";

const Authentication = (props) => {
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
