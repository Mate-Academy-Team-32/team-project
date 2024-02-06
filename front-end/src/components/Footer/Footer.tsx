import React from 'react';
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
          <a href="/" className="Footer__logo">PerfuMe</a>

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
<<<<<<< HEAD
              placeholder="Your email here"
              required
            />
            <button type="submit" className="Footer__button">Submit</button>
=======
              placeholder='Your email here'
              required
            />
            <button type="submit">Submit</button>
>>>>>>> main
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
<<<<<<< HEAD
          <h1 className="catalog__title">My Account</h1>
          <a
            href="/sign?type=in"
=======
          <h1 className="catalog__title">Catalog</h1>
          <a
            href="http://link.com"
>>>>>>> main
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
<<<<<<< HEAD
            Sign in
          </a>
          <a
            href="/sign?type=up"
=======
            Women's Perfumery
          </a>
          <a
            href="http://link.com"
>>>>>>> main
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
<<<<<<< HEAD
            Register
          </a>
          <a
            href="/cart"
=======
            Man's Perfumery
          </a>
          <a
            href="http://link.com"
>>>>>>> main
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
<<<<<<< HEAD
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
=======
            Children's  Perfumery
          </a>
          <a
            href="http://link.com"
>>>>>>> main
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
<<<<<<< HEAD
            About us
          </a>
          <a
            href="/contacts"
=======
            New
          </a>
          <a
            href="http://link.com"
>>>>>>> main
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
<<<<<<< HEAD
            Contact us
=======
            Actions
          </a>
          <a
            href="http://link.com"
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
            Gift Ideas
>>>>>>> main
          </a>
        </nav>

        <nav className="Footer__catalog catalog">
          <h1 className="catalog__title">Online Shopping</h1>
          <a
<<<<<<< HEAD
            href="/bla-bla"
=======
            href="http://link.com"
>>>>>>> main
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
            Payments
          </a>
          <a
<<<<<<< HEAD
            href="/bla-bla"
=======
            href="http://link.com"
>>>>>>> main
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
            Delivery options
          </a>
          <a
<<<<<<< HEAD
            href="/bla-bla"
=======
            href="http://link.com"
>>>>>>> main
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
<<<<<<< HEAD
            href="/bla-bla"
=======
            href="http://link.com"
>>>>>>> main
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
            Help center
          </a>
          <a
<<<<<<< HEAD
            href="/bla-bla"
=======
            href="http://link.com"
>>>>>>> main
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
            Terms & Conditions
          </a>
          <a
<<<<<<< HEAD
            href="/bla-bla"
=======
            href="http://link.com"
>>>>>>> main
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
            Privacy policy
          </a>
          <a
<<<<<<< HEAD
            href="/bla-bla"
=======
            href="http://link.com"
>>>>>>> main
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
            Returns & refund
          </a>
          <a
<<<<<<< HEAD
            href="/bla-bla"
=======
            href="http://link.com"
>>>>>>> main
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
            Survey & feedback
          </a>
        </nav>
<<<<<<< HEAD
=======

        <nav className="Footer__catalog catalog">
          <h1 className="catalog__title">Pages</h1>
          <a
            href="http://link.com"
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
            About Us
          </a>
          <a
            href="http://link.com"
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
            Contact Us
          </a>
          <a
            href="http://link.com"
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
            Blog
          </a>
        </nav>
>>>>>>> main
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
