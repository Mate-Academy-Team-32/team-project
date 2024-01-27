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
              placeholder='Your email here'
              required
            />
            <button type="submit">Submit</button>
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
          <h1 className="catalog__title">Catalog</h1>
          <a
            href="http://link.com"
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
            Women's Perfumery
          </a>
          <a
            href="http://link.com"
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
            Man's Perfumery
          </a>
          <a
            href="http://link.com"
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
            Children's  Perfumery
          </a>
          <a
            href="http://link.com"
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
            New
          </a>
          <a
            href="http://link.com"
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
            Actions
          </a>
          <a
            href="http://link.com"
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
            Gift Ideas
          </a>
        </nav>

        <nav className="Footer__catalog catalog">
          <h1 className="catalog__title">Online Shopping</h1>
          <a
            href="http://link.com"
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
            Payments
          </a>
          <a
            href="http://link.com"
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
            Delivery options
          </a>
          <a
            href="http://link.com"
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
            href="http://link.com"
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
            Help center
          </a>
          <a
            href="http://link.com"
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
            Terms & Conditions
          </a>
          <a
            href="http://link.com"
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
            Privacy policy
          </a>
          <a
            href="http://link.com"
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
            Returns & refund
          </a>
          <a
            href="http://link.com"
            target="_blank"
            rel="noopener noreferrer"
            className='catalog__link'
          >
            Survey & feedback
          </a>
        </nav>

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
