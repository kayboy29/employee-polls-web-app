import React from "react";
import { Link } from "react-router-dom";

const Question = (props) => {
  return (
    <div className="question__card">
      <p className="question__author" data-testid="question-author">
        {props.question.author}
      </p>
      <p className="question__date" data-testid="question-date">
        {props.question.timestamp}
      </p>
      <p>
        <Link to={`/questions/${props.question.id}`}>Show</Link>
      </p>
    </div>
  );
};

export default Question;
