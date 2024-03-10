'use client';

import React, { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import './Sign.scss';
import { scrollToTop } from '../../utils/_scroll';
import { type Input } from '../../types/';

export function Sign() {
  const searchParams = useSearchParams();
  const signType = searchParams.get('type');
  const [currentSign, setCurrentSign] = useState('in');

  useEffect(() => {
    scrollToTop();
  }, [searchParams]);

  if (signType === 'in' || currentSign === 'in') {
    return <SignIn setCurrentSign={setCurrentSign} />;
  } else if (signType === 'up' || currentSign === 'up') {
    return <SignUp />;
  } else if (signType === 'forgot' || currentSign === 'forgot') {
    return <Forgot />;
  } else {
    return <SignIn setCurrentSign={setCurrentSign} />;
  }
}

export function SignIn({ setCurrentSign }: {
  setCurrentSign: React.Dispatch<React.SetStateAction<string>>
}) {
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
          className={cn('Sign__input email', isError && 'Sign__input--error')}
          placeholder="example@gmail.com"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          onInvalid={() => {
            setIsError(true);
          }}
          required
        />

        <h2 className="Sign__field">Password</h2>
        <input
          type="password"
          name="password"
          className={cn(
            'Sign__input password',
            isError && 'Sign__input--error',
          )}
          placeholder="●●●●●●●●"
          pattern="^(?=.*\d)(?=.*[a-z]).{8,16}$"
          onInvalid={() => {
            setIsError(true);
          }}
          maxLength={16}
          required
        />
        <span
          className={cn(
            'password__ui password__ui--login',
            typeOfInput === 'text' && 'password__ui--open',
          )}
          onClick={toggleEye}
        ></span>

        {isError && (
          <p className="Sign__error-msg Sign__error-msg--sign-in">
            E-mail and/or password fields are incorrectly filled!
          </p>
        )}

        <div
          className="Sign__link Sign__link--pos-right"
          onClick={() => { setCurrentSign('forgot') }}
        >
          Forgot Password?
        </div>

        <div className="Sign__signed">
          <input
            type="checkbox"
            name="isSigned"
            id="isSigned"
            className="Sign__is-signed"
            defaultChecked
          />
          <label htmlFor="isSigned" className="Sign__is-signed-label">
            Keep me signed in
          </label>
        </div>

        <button type="submit" className="Sign__submit">
          Sign In
        </button>

        <div className="Sign__account-options">
          Don&apos;t have an account?{' '}
          <div
            className="Sign__link Sign__link--bold"
            onClick={() => { setCurrentSign('up') }}
          >
            Sign Up
          </div>
        </div>
      </form>
    </section>
  );
}

export function SignUp() {
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(
    'E-mail and/or password fields are incorrectly filled!',
  );
  const [typeOfInput, setTypeOfInput] = useState<Input>('password');

  const handleSubmit = useCallback(
    (event: React.ChangeEvent<HTMLFormElement>) => {
      const passwords = document.getElementsByName(
        'password',
      ) as NodeListOf<HTMLInputElement>;

      if (!isError) {
        event.preventDefault();
      }

      if (passwords[0].value === passwords[1].value) {
        setErrorMsg('Password fields can’t be the same!');
        setIsError(true);
      }
    },
    [isError],
  );

  const toggleInput = (): any => {
    const x = document.querySelectorAll(
      '.password',
    ) as NodeListOf<HTMLInputElement>;
    let inputType = x[0].type as Input;

    if (inputType === 'password') {
      inputType = 'text';
    } else {
      inputType = 'password';
    }

    x[0].type = inputType;
    x[1].type = inputType;
    setTypeOfInput(inputType);
  };

  useEffect(() => {}, [handleSubmit]);

  return (
    <section className="Sign">
      <form
        action="/sign"
        method="post"
        className="Sign__content"
        onSubmit={handleSubmit}
      >
        <h1 className="Sign__head">Sign Up</h1>

        {isError && <p className="Sign__error-msg">{errorMsg}</p>}

        <h2 className="Sign__field">Your name</h2>
        <input
          type="text"
          name="username"
          className={cn('Sign__input name', isError && 'Sign__input--error')}
          placeholder="Barbara"
          pattern="\w{2,20}"
          onInvalid={() => {
            setIsError(true);
          }}
          required
        />

        <h2 className="Sign__field">Email Address</h2>
        <input
          type="email"
          name="email"
          className={cn('Sign__input email', isError && 'Sign__input--error')}
          placeholder="example@gmail.com"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          onInvalid={() => {
            setIsError(true);
          }}
          required
        />

        <h2 className="Sign__field">Phone number</h2>
        <input
          type="number"
          name="phone"
          className={cn('Sign__input phone', isError && 'Sign__input--error')}
          placeholder="+38 (050) 123-45-67"
          pattern="^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"
          onInvalid={() => {
            setIsError(true);
          }}
          required
        />

        <h2 className="Sign__field">Password</h2>
        <input
          type="password"
          name="password"
          className={cn(
            'Sign__input password',
            isError && 'Sign__input--error',
          )}
          placeholder="●●●●●●●●"
          pattern="^(?=.*\d)(?=.*[a-z]).{8,16}$"
          onInvalid={() => {
            setIsError(true);
          }}
          maxLength={16}
          required
        />
        <span
          className={cn(
            'password__ui password__ui--reg--up--1',
            typeOfInput === 'text' && 'password__ui--open',
          )}
          onClick={toggleInput}
        ></span>

        <h2 className="Sign__field">Repeat password</h2>
        <input
          type="password"
          name="password"
          className={cn(
            'Sign__input password',
            isError && 'Sign__input--error',
          )}
          placeholder="●●●●●●●●"
          pattern="^(?=.*\d)(?=.*[a-z]).{8,16}$"
          onInvalid={() => {
            setIsError(true);
          }}
          maxLength={16}
          required
        />
        <span
          className={cn(
            'password__ui password__ui--reg--up--2',
            typeOfInput === 'text' && 'password__ui--open',
          )}
          onClick={toggleInput}
        ></span>

        <div className="Sign__signed">
          <input
            type="checkbox"
            name="isSigned"
            id="isSigned"
            className="Sign__is-signed"
            required
          />
          <label htmlFor="isSigned" className="Sign__is-signed-label">
            By continuing, you agree to our
            <br />
            <a href="/">terms of service.</a>
          </label>
        </div>

        <button type="submit" className="Sign__submit">
          Sign Up
        </button>

        <div className="Sign__account-options">
          Already have an account?{' '}
          <Link href="/sign?type=in" className="Sign__link Sign__link--bold">
            Sign In here
          </Link>
        </div>
      </form>
    </section>
  );
}

export function Forgot() {
  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section className="Sign">
      <form
        action="/sign"
        method="post"
        className="Sign__content Sign__content--forgot--center"
        onSubmit={handleSubmit}
      >
        <h1 className="Sign__head Sign__head--center">
          Have you Forgotten Your Password ?
        </h1>

        <p className="Sign__paragraph Sign__paragraph--center">
          If you&apos;ve forgotten your password, enter your
          <br />
          e-mail address and we&apos;ll send you an e-mail
        </p>

        <h2 className="Sign__field is-align-self-flex-start">Email Address</h2>
        <input
          type="email"
          name="email"
          className="Sign__input email"
          placeholder="example@gmail.com"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          required
        />

        <button type="submit" className="Sign__submit">
          Reset password
        </button>

        <div className="Sign__account-options Sign__account-options--color--black">
          Go back to{' '}
          <Link
            href="/sign?type=in"
            className="Sign__link Sign__link--size--16 Sign__link--bold"
          >
            Sign In
          </Link>
        </div>
      </form>
    </section>
  );
}
