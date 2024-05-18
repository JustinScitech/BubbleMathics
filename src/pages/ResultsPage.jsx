import React from 'react';

const ResultsPage = () => {
  return (
    <div>
      <h1>Your Results</h1>
      <p>Check out how you did in your recent math battles!</p>
      <button onClick={() => window.location.href='/'}>Back to Home</button>
    </div>
  );
};

export default ResultsPage;
