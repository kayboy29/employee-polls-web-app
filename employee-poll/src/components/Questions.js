import React from "react";
import Question from "./Question";

const Questions = (props) => {
  return (
    <div className="dashboard__questions">
      {props.questions &&
        props.questions.map((question) => (
          <Question key={question.id} question={question} />
        ))}
    </div>
  );
};

export default Questions;
