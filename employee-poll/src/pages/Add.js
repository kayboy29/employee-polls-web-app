import { useState } from "react";
import { connect } from "react-redux";
import { _saveQuestion } from "../data/_DATA";
import { useNavigate } from "react-router-dom";
import { saveQuestionUser } from "../actions/users";
import { saveQuestion } from "../actions/questions";
import React from "react";

const Add = (props) => {
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const navigate = useNavigate();

  function resetOption() {
    setOptionOne("");
    setOptionTwo("");
  }

  function handleSaveQuestion(question) {
    return (dispatch) => {
      return _saveQuestion(question).then((q) => {
        dispatch(saveQuestion(q));
        dispatch(saveQuestionUser(q));
      });
    };
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const question = {
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: props.authUser.id,
    };
    props.dispatch(handleSaveQuestion(question));
    resetOption();
    navigate("/");
  };

  return (
    <div className="add-question">
      <h1>Would You Rather</h1>
      <h3>Create Your Own Poll</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>First Option</label>
        <input
          placeholder="Option One"
          type="text"
          onChange={(e) => setOptionOne(e.target.value)}
          value={optionOne}
          data-testid="option-one"
        />
        <label>Second Option</label>
        <input
          placeholder="Option Two"
          type="text"
          onChange={(e) => setOptionTwo(e.target.value)}
          value={optionTwo}
          data-testid="option-two"
        />
        <button
          disabled={optionOne === "" || optionTwo === ""}
          data-testid="submit-new-btn"
        >
          Add
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ authUser }) => {
  return { authUser };
};
export default connect(mapStateToProps)(Add);
