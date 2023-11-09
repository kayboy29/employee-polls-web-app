import React from "react";
import { connect } from "react-redux";
const LeaderBoard = ({ usersOrder }) => {
  return (
    <table className="leader-board">
      <thead>
        <tr>
          <th>Users</th>
          <th>Answered</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        {usersOrder.map((user) => {
          return (
            <tr key={user.id}>
              <td>
                <div className="leader-board__user">
                  <img src={user.avatarURL} alt="avatar"></img>
                  <div>
                    <p>{user.name}</p>
                    <p>{user.id}</p>
                  </div>
                </div>
              </td>
              <td>{Object.keys(user.answers).length}</td>
              <td>{user.questions.length}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const mapStateToProps = ({ users }) => {
  const usersOrder = Object.keys(users)
    .map((id) => users[id])
    .sort(
      (a, b) =>
        Object.keys(b.answers).length +
        b.questions.length -
        (Object.keys(a.answers).length + a.questions.length)
    );
  return { usersOrder };
};

export default connect(mapStateToProps)(LeaderBoard);
