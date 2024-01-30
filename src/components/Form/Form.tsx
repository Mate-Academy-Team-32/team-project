import React, { useState } from 'react';
import './Form.scss';

type Props = {
  setPage: (page: 'sign-in' | 'sign-up' | 'forgot') => void;
};

export const Form: React.FC = () => {
  const [page, setPage] = useState('sign-in');

  window.scrollTo(0, 0);

  if (page === 'sign-in') {
    return <SignIn setPage={setPage} />;
  } else if (page === 'sign-up') {
    return <SignUp setPage={setPage} />;
  } else if (page === 'forgot') {
    return <Forgot setPage={setPage} />;
  }

  return <></>;
};

const SignIn: React.FC<Props> = ({ setPage }) => {
  const [isError, setIsError] = useState(false);

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsError(false);
    // (document.querySelector('.Form') as HTMLFormElement).reset();
  };

  return (
    <section className="Form">
      <form
        action="/sign"
        method="post"
        className="Form__content"
        onSubmit={handleSubmit}
      >
        <h1 className="Form__head">Login</h1>

        {
          isError &&
          <p className="Form__error-msg">
            E-mail and/or password fields are incorrectly filled!
          </p>
        }

        <h2 className="Form__field">Email Address</h2>
        <input
          type="email"
          name="email"
          className="Form__input email"
          placeholder="example@gmail.com"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          onInvalid={() => setIsError(true)}
          required
        />

        <h2 className="Form__field">Password</h2>
        <input
          type="password"
          name="password"
          className="Form__input password"
          placeholder="●●●●●●●●"
          pattern="^(?=.*\d)(?=.*[a-z]).{8,16}$"
          onInvalid={() => setIsError(true)}
          maxLength={16}
          required
        />
        <span className="password__ui password__ui--login" onClick={() => {
          const x = document.querySelectorAll('.password')[0] as HTMLInputElement;

          if (x.type === 'password') {
            x.type = 'text';
          } else {
            x.type = 'password';
          }
        }}></span>

        <span className="Form__forgot" onClick={() => setPage('forgot')}>Forgot Password?</span>

        <div className="Form__signed">
          <input
            type="checkbox"
            name="isSigned"
            id="isSigned"
            className="Form__isSigned"
            defaultChecked
          />
          <label htmlFor="isSigned" className="Form__isSigned-label">Keep me signed in</label>
        </div>

        <button type="submit" className="Form__submit">Login</button>

        <div className="Form__account-options">
          Don’t have an account?
          <span onClick={() => setPage('sign-up')}>Sign Up</span>
        </div>
      </form>
    </section>
  );
};
const SignUp: React.FC<Props> = ({ setPage }) => {
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('E-mail and/or password fields are incorrectly filled!');

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    const password = document.getElementsByName('password') as NodeListOf<HTMLInputElement>;

    if (password[0].value !== password[1].value) {
      setErrorMsg('Password fields can’t be the same!');
      setIsError(true);
    }
    
    if (!isError) {
      event.preventDefault();
      setIsError(false);
      // (document.querySelector('.Form') as HTMLFormElement).reset();
    }
  };

  return (
    <section className="Form">
      <form
        action="/sign"
        method="post"
        className="Form__content"
        onSubmit={handleSubmit}
      >
        <h1 className="Form__head">Sign up</h1>

        {
          isError &&
          <p className="Form__error-msg">
            {errorMsg}
          </p>
        }

        <h2 className="Form__field">Your name</h2>
        <input
          type="text"
          name="username"
          className="Form__input name"
          placeholder="Barbara"
          pattern="\w{2,20}"
          onInvalid={() => setIsError(true)}
          required
        />

        <h2 className="Form__field">Email Address</h2>
        <input
          type="email"
          name="email"
          className="Form__input email"
          placeholder="example@gmail.com"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          onInvalid={() => setIsError(true)}
          required
        />

        <h2 className="Form__field">Phone number</h2>
        <input
          type="number"
          name="phone"
          className="Form__input phone"
          placeholder="+38 (050) 123-45-67"
          pattern="^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"
          onInvalid={() => setIsError(true)}
          required
        />

        <h2 className="Form__field">Password</h2>
        <input
          type="password"
          name="password"
          className="Form__input password"
          placeholder="●●●●●●●●"
          pattern="^(?=.*\d)(?=.*[a-z]).{8,16}$"
          onInvalid={() => setIsError(true)}
          maxLength={16}
          required
        />
        <span className="password__ui password__ui--reg--1" onClick={() => {
          const x = document.querySelectorAll('.password')[0] as HTMLInputElement;

          if (x.type === 'password') {
            x.type = 'text';
          } else {
            x.type = 'password';
          }
        }}></span>

        <h2 className="Form__field">Repeat password</h2>
        <input
          type="password"
          name="password"
          className="Form__input password"
          placeholder="●●●●●●●●"
          pattern="^(?=.*\d)(?=.*[a-z]).{8,16}$"
          onInvalid={() => setIsError(true)}
          maxLength={16}
          required
        />
        <span className="password__ui password__ui--reg--2" onClick={() => {
          const x = document.querySelectorAll('.password')[1] as HTMLInputElement;

          if (x.type === 'password') {
            x.type = 'text';
          } else {
            x.type = 'password';
          }
        }}></span>

        <div className="Form__signed">
          <input
            type="checkbox"
            name="isSigned"
            id="isSigned"
            className="Form__isSigned"
            required
          />
          <label htmlFor="isSigned" className="Form__isSigned-label">
            By continuing, you agree to our
            <br />
            <a href="/">
              terms of service.
            </a>
          </label>
        </div>

        <button type="submit" className="Form__submit">Sign up</button>
          
          
        <div className="Form__account-options">
          Already have an account?
          <span onClick={() => setPage('sign-in')}>Sign in here</span>
        </div>
      </form>
    </section>
  );
};

const Forgot: React.FC<Props> = ({ setPage }) => {
  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section className="Form">
      <form
        action="/sign"
        method="post"
        className="Form__content"
        onSubmit={handleSubmit}
      >
        <h1 className="Form__head Form__head--center">
          Enter your email address to get
          <br />
          the password reset link.
        </h1>

        <h2 className="Form__field">Email Address</h2>
        <input
          type="email"
          name="email"
          className="Form__input email"
          placeholder="example@gmail.com"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          required
        />

        <button type="submit" className="Form__submit">Send password reset email</button>

        <div className="Form__account-options">
          Go back to
          <span onClick={() => setPage('sign-in')}>login</span>
        </div>
      </form>
    </section>
  );
};