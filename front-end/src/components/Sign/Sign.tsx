import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import cn from 'classnames';
import './Sign.scss';
import { scrollToTop } from '../../utils/_scroll';

type Input = 'password' | 'text';

export const Sign: React.FC = () => {
  const searchPath = useLocation().search;

  useEffect(() => {
    scrollToTop();
  }, []);

  if (searchPath === '?type=in') {
    return <SignIn />;
  } else if (searchPath === '?type=up') {
    return <SignUp />;
  } else if (searchPath === '?type=forgot') {
    return <Forgot />;
  } else {
    return <SignIn />;
  }
};

const SignIn: React.FC = () => {
  const [isError, setIsError] = useState(false);
  const [typeOfInput, setTypeOfInput] = useState<Input>('password');

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsError(false);
  };

  const toggleEye = () => {
    const x = document.querySelectorAll('.password')[0] as HTMLInputElement;
    let inputType = x.type as Input;

    if (inputType === 'password') {
      inputType = 'text';
    } else {
      inputType = 'password';
    }

    x.type = inputType;
    setTypeOfInput(inputType);
  };

  return (
    <section className="Sign">
      <form
        action="/sign"
        method="post"
        className="Sign__content"
        onSubmit={handleSubmit}
      >
        <h1 className="Sign__head">Sign In</h1>

        <h2 className="Sign__field">Email Address</h2>
        <input
          type="email"
          name="email"
          className={cn(
            "Sign__input email",
            isError && "Sign__input--error"
          )}
          placeholder="example@gmail.com"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          onInvalid={() => setIsError(true)}
          required
        />

        <h2 className="Sign__field">Password</h2>
        <input
          type="password"
          name="password"
          className={cn(
            "Sign__input password",
            isError && "Sign__input--error"
          )}
          placeholder="●●●●●●●●"
          pattern="^(?=.*\d)(?=.*[a-z]).{8,16}$"
          onInvalid={() => setIsError(true)}
          maxLength={16}
          required
        />
        <span
          className={cn(
            "password__ui password__ui--login",
            typeOfInput === "text" && "password__ui--open"
          )}
          onClick={toggleEye}
        ></span>

        {
          isError &&
          <p className="Sign__error-msg">
            E-mail and/or password fields are incorrectly filled!
          </p>
        }

        <Link
          to="/sign?type=forgot"
          relative="path"
          className="Sign__link Sign__link--pos-right"
        >
          Forgot Password?
        </Link>

        <div className="Sign__signed">
          <input
            type="checkbox"
            name="isSigned"
            id="isSigned"
            className="Sign__is-signed focus:ring-transparent"
            defaultChecked
          />
          <label htmlFor="isSigned" className="Sign__is-signed-label">Keep me signed in</label>
        </div>

        <button type="submit" className="Sign__submit">Sign In</button>

        <div className="Sign__account-options">
          Don’t have an account?
          {' '}
          <Link to="/sign?type=up" relative="path" className="Sign__link Sign__link--bold">Sign Up</Link>
        </div>
      </form>
    </section>
  );
};

const SignUp: React.FC = () => {
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
    }
  };

  return (
    <section className="Form">
      <form
        action="/sign"
        method="post"
        className="Sign__content"
        onSubmit={handleSubmit}
      >
        <h1 className="Sign__head">Sign up</h1>

        {
          isError &&
          <p className="Sign__error-msg">
            {errorMsg}
          </p>
        }

        <h2 className="Sign__field">Your name</h2>
        <input
          type="text"
          name="username"
          className="Sign__input name"
          placeholder="Barbara"
          pattern="\w{2,20}"
          onInvalid={() => setIsError(true)}
          required
        />

        <h2 className="Sign__field">Email Address</h2>
        <input
          type="email"
          name="email"
          className="Sign__input email"
          placeholder="example@gmail.com"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          onInvalid={() => setIsError(true)}
          required
        />

        <h2 className="Sign__field">Phone number</h2>
        <input
          type="number"
          name="phone"
          className="Sign__input phone"
          placeholder="+38 (050) 123-45-67"
          pattern="^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"
          onInvalid={() => setIsError(true)}
          required
        />

        <h2 className="Sign__field">Password</h2>
        <input
          type="password"
          name="password"
          className="Sign__input password"
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

        <h2 className="Sign__field">Repeat password</h2>
        <input
          type="password"
          name="password"
          className="Sign__input password"
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

        <div className="Sign__signed">
          <input
            type="checkbox"
            name="isSigned"
            id="isSigned"
            className="Sign__isSigned"
            required
          />
          <label htmlFor="isSigned" className="Sign__isSigned-label">
            By continuing, you agree to our
            <br />
            <a href="/">
              terms of service.
            </a>
          </label>
        </div>

        <button type="submit" className="Sign__submit">Sign up</button>

        <div className="Sign__account-options">
          Already have an account?
          <Link to="/sign?type=in" relative="path" className="nav__link">Sign in here</Link>
        </div>
      </form>
    </section>
  );
};

const Forgot: React.FC = () => {
  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section className="Form">
      <form
        action="/sign"
        method="post"
        className="Sign__content"
        onSubmit={handleSubmit}
      >
        <h1 className="Sign__head Sign__head--center">
          Enter your email address to get
          <br />
          the password reset link.
        </h1>

        <h2 className="Sign__field">Email Address</h2>
        <input
          type="email"
          name="email"
          className="Sign__input email"
          placeholder="example@gmail.com"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          required
        />

        <button type="submit" className="Sign__submit">Send password reset email</button>

        <div className="Sign__account-options">
          Go back to
          <Link to="/sign?type=up" relative="path" className="nav__link">login</Link>
        </div>
      </form>
    </section>
  );
};
