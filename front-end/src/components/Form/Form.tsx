import React, { useState } from 'react';
import './Form.scss';

export const Form: React.FC = () => {
  const [isError, setIsError] = useState(false);

  return (
    <section className="form">
      <form
        action="/sign"
        method="post"
        className="form__content"
      >
        <h1 className="form__head">Login</h1>

        {
          isError &&
          <p className="form__error-msg">
            E-mail and/or password fields are incorrectly filled!
          </p>
        }

        <h2 className="form__field">Email Address</h2>
        <input type="email" name="email" className="form__email" />

        <h2 className="form__field">Password</h2>
        <input type="password" name="password" className="form__password" />

        <button type="submit" className="form__submit">Login</button>

        
      </form>
    </section>
  );
};
