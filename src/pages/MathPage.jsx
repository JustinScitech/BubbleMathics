import React from 'react';

const MathPage = () => {
  return (
    <div>
      <h1>Math Challenges</h1>
      <p>Compete in math challenges and improve your skills!</p>
      <button onClick={() => window.location.href='/results'}>View Results</button>
    </div>
  );
};

export default MathPage;