import React from 'react';

const Homepage = () => {
  return (
    <div>
      <h1>Welcome to BubbleMath!</h1>
      <p>Join the fun and learn math with your friends.</p>
      <button onClick={() => window.location.href='/login'}>Login</button>
      <button onClick={() => window.location.href='/math'}>Start Learning</button>
    </div>
  );
};

export default Homepage;
