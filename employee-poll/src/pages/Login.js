import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuthedUser } from "../actions/authUser";

const Login = (props) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");

  const handleLogin = (e) => {
    props.dispatch(setAuthedUser(props.users[userId]));

    navigate("/");
  };

  return (
    <div className="login">
      <h3>Choose user to login</h3>
      {props.users && (
        <select
          className="login__dropdown"
          onChange={(e) => setUserId(e.target.value)}
          data-testid="user-select"
        >
          <option value="">Choose user</option>
          {Object.keys(props.users).map((userId) => (
            <option key={userId} value={userId}>
              {props.users[userId].name}
            </option>
          ))}
        </select>
      )}
      <button
        onClick={(e) => handleLogin(e)}
        data-testid="login-btn"
        className="login__btn"
      >
        Login
      </button>
    </div>
  );
};

export const mapStateToProps = ({ users }) => ({
  users: users,
});

export default connect(mapStateToProps)(Login);
