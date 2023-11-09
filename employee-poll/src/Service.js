import {
  receiveUsers,
  saveQuestionAnswerUser,
  saveQuestionUser,
} from "./actions/users";
import {
  receiveQuestions,
  saveQuestionAnswerQuestion,
  saveQuestion,
} from "./actions/questions";
import {
  _getUsers,
  _getQuestions,
  _saveQuestionAnswer,
  _saveQuestion,
} from "./data/_DATA";
import { saveQuestionAnswerAuthedUser } from "./actions/authUser";

function initialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions,
    })
  );
}

export function handleSaveQuestion(question) {
  return (dispatch) => {
    return _saveQuestion(question).then((q) => {
      dispatch(saveQuestion(q));
      dispatch(saveQuestionUser(q));
    });
  };
}

export const handleInitData = () => {
  return (dispatch) => {
    return initialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
    });
  };
};

export const handleSaveQuestionAnswer = (authedUser, qid, answer) => {
  return (dispatch) => {
    return _saveQuestionAnswer({ authedUser, qid, answer }).then((result) => {
      dispatch(saveQuestionAnswerUser(authedUser, qid, answer));
      dispatch(saveQuestionAnswerQuestion(authedUser, qid, answer));
      dispatch(saveQuestionAnswerAuthedUser(qid, answer));
    });
  };
};
