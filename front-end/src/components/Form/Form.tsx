import React, { useState } from 'react';
import './Form.scss';

export const Form: React.FC = () => {
  const [isError, setIsError] = useState(false);

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsError(false);
    (document.querySelector('.form__submit') as HTMLFormElement).reset();
  };

  return (
    <section className="form">
      <form
        action="/sign"
        method="post"
        className="form__content"
        onSubmit={handleSubmit}
      >
        <h1 className="form__head">Login</h1>

        {
          isError &&
          <p className="form__error-msg">
            E-mail and/or password fields are incorrectly filled!
          </p>
        }

        <h2 className="form__field">Email Address</h2>
        <input
          type="email"
          name="email"
          className="form__input email"
          placeholder="example@gmail.com"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          onInvalid={() => setIsError(true)}
          required
        />

        <h2 className="form__field">Password</h2>
        <input
          type="password"
          name="password"
          className="form__input password"
          placeholder="●●●●●●●●"
          pattern="^(?=.*\d)(?=.*[a-z]).{8,16}$"
          onInvalid={() => setIsError(true)}
          required
        />

        <button type="submit" className="form__submit">Login</button>
      </form>
    </section>
  );
};
