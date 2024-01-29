import React from 'react';

export const Sign: React.FC = () => (
  <form action="/sign" method="post">
    <h1>Login</h1>
    <h2>Email Address</h2>

    <input type="email" name="email" id="email" />
    <input type="password" name="password" id="password" />

    <button type="submit">Login</button>
  </form>
);
