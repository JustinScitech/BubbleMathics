import React from 'react';

const Leaderboard = ({ leaderboard }) => {
  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
            <th>Accuracy (%)</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{entry.name}</td>
              <td>{entry.score}</td>
              <td>{entry.accuracy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
