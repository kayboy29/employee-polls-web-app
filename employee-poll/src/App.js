import React from "react";
import "./App.css";
import { useEffect } from "react";
import { handleInitData } from "./Service";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Authentication from "./components/Authentication";
import DashBoard from "./pages/DashBoard";
import Poll from "./pages/Poll";
import Add from "./pages/Add";
import LeaderBoard from "./pages/LeaderBoard";
import NotFound from "./pages/NotFound";
import { connect } from "react-redux";

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitData());
  }, [props]);

  return (
    <div className="app">
      {Object.keys(props.authUser).length !== 0 && <Header />}
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/"
          exact
          element={
            <Authentication>
              <DashBoard />
            </Authentication>
          }
        ></Route>
        <Route
          path="/questions/:questionId"
          element={
            <Authentication>
              <Poll />
            </Authentication>
          }
        ></Route>
        <Route
          path="/add"
          exact
          element={
            <Authentication>
              <Add />
            </Authentication>
          }
        ></Route>
        <Route
          path="/leaderboard"
          exact
          element={
            <Authentication>
              <LeaderBoard />
            </Authentication>
          }
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
};

const mapStateToProps = ({ authUser }) => {
  return {
    authUser,
  };
};
export default connect(mapStateToProps)(App);
