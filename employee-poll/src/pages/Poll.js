import React from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";
import { connect } from "react-redux";
import { handleSaveQuestionAnswer } from "../Service";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const Poll = (props) => {
  if (!props.question) {
    return <Navigate to="/404" replace={true} />;
  }
  const handleSubmitAnswer = (answer) => {
    const authedUser = props.authUser.id;
    const qid = props.question.id;
    props.dispatch(handleSaveQuestionAnswer(authedUser, qid, answer));
  };

  return (
    <div className="poll-page">
      <h3>Poll by {props.author.id}</h3>
      <h2>Would You Rather</h2>
      <div className="card-container">
        <div
          className="card"
          style={{
            background:
              props.isAnswer && props.answer === "optionOne" ? " #198754" : "",
          }}
        >
          <p>{props.question.optionOne.text}</p>
          {!props.isAnswer && (
            <button onClick={() => handleSubmitAnswer("optionOne")}>
              Click
            </button>
          )}
          {props.isAnswer && (
            <p className="vote">
              Number of people vote: {props.numberOfOptionOne} (
              {props.percentOfOptionOne}%)
            </p>
          )}
        </div>

        <div
          className="card"
          style={{
            background:
              props.isAnswer && props.answer === "optionTwo" ? "#198754" : "",
          }}
        >
          <p>{props.question.optionTwo.text}</p>
          {!props.isAnswer && (
            <button onClick={() => handleSubmitAnswer("optionTwo")}>
              Click
            </button>
          )}
          {props.isAnswer && (
            <p className="vote">
              Number of people vote: {props.numberOfOptionTwo} (
              {props.percentOfOptionTwo}%)
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ questions, authUser, users }, props) => {
  const { questionId } = props.router.params;
  if (!questionId || !questions[questionId]) {
    return {};
  }

  const question = questions[questionId];
  const author = users[question.author];

  var answer = "";
  var total = 0;
  var numberOfOptionOne = 0;
  var numberOfOptionTwo = 0;
  var percentOfOptionOne = 0;
  var percentOfOptionTwo = 0;
  var isAnswer = Object.keys(authUser.answers).includes(questionId);
  if (isAnswer) {
    answer = authUser.answers[questionId];
    numberOfOptionOne = question.optionOne.votes.length;
    numberOfOptionTwo = question.optionTwo.votes.length;
    total = numberOfOptionOne + numberOfOptionTwo;
    percentOfOptionOne = ((numberOfOptionOne / total) * 100).toFixed(2);
    percentOfOptionTwo = ((numberOfOptionTwo / total) * 100).toFixed(2);
  }
  return {
    question,
    isAnswer,
    answer,
    author,
    numberOfOptionOne,
    numberOfOptionTwo,
    percentOfOptionOne,
    percentOfOptionTwo,
    authUser,
  };
};
export default withRouter(connect(mapStateToProps)(Poll));
