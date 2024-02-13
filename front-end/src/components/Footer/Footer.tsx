import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

export const Footer: React.FC = () => {
  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    (document.querySelector('.Footer__form') as HTMLFormElement).reset();
  }

  return (
    <footer className="Footer">
      <article className="Footer__info">
        <section className="Footer__subscribe">
          <Link to="/" className="Footer__logo">
            <div className="logo">
              Perfu
              <span className="logo__highlight">Me</span>
            </div>
          </Link>

          <p className="Footer__text Footer__text--size-24 Footer__text--color-light">
            Subscribe to Our Newsletter:
          </p>

          <p className="Footer__text">
            Receive Updates on New Arrivals and Special Promotions!
          </p>

          <form
            action="/"
            method='post'
            onSubmit={handleSubmit}
            className='Footer__form'
          >
            <input
              type="email"
              name="email"
              placeholder="Your email here"
              className="focus:ring-transparent"
              required
            />
            <button type="submit" className="Footer__button">Submit</button>
          </form>

          <nav className="Footer__share">
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="Footer__icon Footer__icon--twitter"
            >
              Twitter
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="Footer__icon Footer__icon--facebook"
            >
              Facebook
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="Footer__icon Footer__icon--linkedin"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="Footer__icon Footer__icon--instagram"
            >
              Instagram
            </a>
          </nav>
        </section>

        <nav className="Footer__catalog catalog">
          <h1 className="catalog__title">My Account</h1>
          <a
            href="/sign?type=in"
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
            Sign In
          </a>
          <a
            href="/sign?type=up"
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
            Sign Up
          </a>
          <a
            href="/cart"
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
            My orders
          </a>
        </nav>

        <nav className="Footer__catalog catalog">
          <h1 className="catalog__title">Pages</h1>
          <a
            href="/catalog"
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
            Catalog
          </a>
          <a
            href="/about"
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
            About us
          </a>
          <a
            href="/contacts"
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
            Contact us
          </a>
        </nav>

        <nav className="Footer__catalog catalog">
          <h1 className="catalog__title">Online Shopping</h1>
          <a
            href="/bla-bla"
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
            Payments
          </a>
          <a
            href="/bla-bla"
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
            Delivery options
          </a>
          <a
            href="/bla-bla"
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
            Buyer protection
          </a>
        </nav>

        <nav className="Footer__catalog catalog">
          <h1 className="catalog__title">Customer care</h1>
          <a
            href="/bla-bla"
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
            Help center
          </a>
          <a
            href="/bla-bla"
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
            Terms & Conditions
          </a>
          <a
            href="/bla-bla"
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
            Privacy policy
          </a>
          <a
            href="/bla-bla"
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
            Returns & refund
          </a>
          <a
            href="/bla-bla"
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
            Survey & feedback
          </a>
        </nav>
      </article>

      <hr className="Footer__line" />

      <div className="Footer__copyright">
        <time className='year'>
          {new Date().getFullYear()}
        </time>
        Local Face Inc. All rights reserved
      </div>
    </footer>
  );
};
