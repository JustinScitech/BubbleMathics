import React from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import Leaderboard from '../Components/Leaderboard'; 

const ResultsPage = ({ userResults }) => {
  // Default values to prevent destructuring errors
  const { correct = 0, wrong = 0, accuracy = 0 } = userResults || {};

  const data = [
    { name: 'Correct', value: correct },
    { name: 'Wrong', value: wrong }
  ];

  const COLORS = ['#0088FE', '#FF8042'];

  // Dummy leaderboard data
  const leaderboard = [
    { rank: 1, name: 'Player 1', score: 100 },
    { rank: 2, name: 'Player 2', score: 90 },
    { rank: 3, name: 'Player 3', score: 80 },
    { rank: 4, name: 'Player 4', score: 70 },
    { rank: 5, name: 'Player 5', score: 60 },
  ];

  return (
    <div className="container">
      <div className="content">
        <h1>Your Results</h1>
        <p>Check out how you did in your recent math battles!</p>
        <div className="results-summary">
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
          <p>Accuracy: {accuracy.toFixed(2)}%</p>
        </div>
        
        <Leaderboard leaderboard={leaderboard} />
        
        <button onClick={() => window.location.href='/'}>Back to Home</button>
      </div>
    </div>
  );
};

ResultsPage.propTypes = {
  userResults: PropTypes.shape({
    correct: PropTypes.number,
    wrong: PropTypes.number,
    accuracy: PropTypes.number
  })
};

export default ResultsPage;
