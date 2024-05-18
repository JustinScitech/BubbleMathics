import React from 'react';

const LoginPage = () => {
  return (
    <div>
      <h1>Login to BubbleMath</h1>
      <form>
        <div>
          <label>Username:</label>
          <input type="text" name="username" required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/register">Register here</a></p>
    </div>
  );
};

export default LoginPage;
