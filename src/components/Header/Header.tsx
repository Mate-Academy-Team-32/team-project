import React from 'react';
import { Link } from 'react-router-dom';
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
          <Link to="/" className="Header__logo">
            <img src={logoPerfume} alt="Logo PerfuMe" />
          </Link>

          <Link to="/" relative="path" className="nav__link">Home</Link>

          <Link to="/catalog" relative="path" className="nav__link">Catalog</Link>

          <Link to="/about" relative="path" className="nav__link">About Us</Link>

          <Link to="/contacts" relative="path" className="nav__link">Contact Us</Link>
        </nav>
        <nav className="nav nav--sign">
          <div className="input--search">
            <input
              className="input"
              type="text"
              placeholder='Hey, what are you looking for?'
            />
          </div>

          <Link to="/sign">
            <img
              className="sign-in"
              src={logoAccount}
              alt="Sign in"
            />
          </Link>

          <Link to="/likes">
            <img
              className="Header__icon"
              src={logoHeart}
              alt="Heart"
            />
          </Link>

          <Link to="/cart" id="bag">
            <img
              className="Header__icon Header__icon--w-34"
              src={logoBag}
              alt="Bag"
            />
          </Link>
        </nav>
      </section>
    </header>

    <div className="margin"></div>
  </>
);
