import React from 'react';
import './Header.scss';
import logoPerfume from '../../img/logo-perfume.svg';
import logoAccount from '../../img/icon-account.svg';
import logoHeart from '../../img/icon-heart-white.svg';
import logoBag from '../../img/icon-bag-white.svg';

window.addEventListener('load', () => {
  (document.querySelector('#bag') as HTMLAnchorElement)
    .setAttribute('data-count', '0');
});

export const Header: React.FC = () => (
  <>
    <header className="Header">
      <section className="Header__top-bar">
        <nav className="nav nav--links">
          <a href="/" className="Header__logo">
            <img src={logoPerfume} alt="Logo PerfuMe" />
          </a>

          <a href="/" className="nav__link">Home</a>

          <a href="/catalog" className="nav__link">Catalog</a>

          <a href="/about" className="nav__link">About Us</a>

          <a href="/contacts" className="nav__link">Contact Us</a>
        </nav>
        <nav className="nav nav--sign">
          <div className="input--search">
            <input
              className="input"
              type="text"
              placeholder='Hey, what are you looking for?'
            />
          </div>

          <a href="/sign">
            <img
              className="sign-in"
              src={logoAccount}
              alt="Sign in"
            />
          </a>

          <a href="/likes">
            <img
              className="Header__icon"
              src={logoHeart}
              alt="Heart"
            />
          </a>

          <a href="/cart" id="bag">
            <img
              className="Header__icon Header__icon--w-34"
              src={logoBag}
              alt="Bag"
            />
          </a>
        </nav>
      </section>
    </header>

    <div className="margin"></div>
  </>
);
