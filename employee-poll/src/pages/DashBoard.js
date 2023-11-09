import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import Questions from "../components/Questions";

const Dashboard = (props) => {
  const [isShowAnswer, setIsShowAnswer] = useState(true);

  return (
    <div>
      <div className="dashboard__toggle">
        <button onClick={() => setIsShowAnswer(true)} disabled={isShowAnswer}>
          Unanswered Poll
        </button>
        <button onClick={() => setIsShowAnswer(false)} disabled={!isShowAnswer}>
          Answered Poll
        </button>
      </div>

      <div className="dashboard__container">
        {isShowAnswer ? (
          <div>
            <h3>New Questions</h3>
            <hr />
            <Questions questions={props["unAnswers"]} />
          </div>
        ) : (
          <div>
            <h3>Done Questions</h3>
            <hr />
            <Questions questions={props["answers"]} />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ authUser, questions }) => {
  const answers = Object.keys(authUser.answers)
    .map((questionId) => questions[questionId])
    .sort((a, b) => b.timestamp - a.timestamp);

  const unAnswersIds = Object.keys(questions).filter(
    (questionId) => !Object.keys(authUser.answers).includes(questionId)
  );

  const unAnswers = unAnswersIds
    .map((id) => questions[id])
    .sort((a, b) => b.timestamp - a.timestamp);

  return { answers, unAnswers };
};

export default connect(mapStateToProps)(Dashboard);
