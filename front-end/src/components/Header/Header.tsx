import React from 'react';
import './Header.scss';
import logoPerfume from '../../img/logo-perfume.svg';
import logoAccount from '../../img/icon-account.svg';
import logoHeart from '../../img/icon-heart-white.svg';
import logoBag from '../../img/icon-bag-white.svg';

window.addEventListener('scroll', () => {
  const part = document.querySelector('.Header__panel') as HTMLDivElement;

  if (window.scrollY > 0) {
    part.classList.add('hidden');
  } else {
    part.classList.remove('hidden');
  }
});

export const Header: React.FC = () => (
  <>
    <header className="Header">
      <section className="Header__top-bar">
        <nav className="nav nav--links">
          <a href="/" className="nav__link">Home</a>
          <a href="/" className="nav__link">About us</a>
          <a href="/" className="nav__link">Delivery and payment</a>
          <a href="/" className="nav__link">Blog</a>
          <a href="/" className="nav__link">Contacts</a>
        </nav>
        <nav className="nav nav--sign">
          <a href="/sign">
            <img
              className="sign-in"
              src={logoAccount}
              alt="Sign in"
            />
          </a>

          <a href="/" className='Header__language-select'>
            Eng
          </a>
        </nav>
      </section>

      <section className="Header__panel">
        <div className="Header__left-side">
          <a href="/" className="Header__logo">
            <img src={logoPerfume} alt="Logo PerfuMe" />
          </a>
        </div>

        <div className="Header__right-side">
          <div className="input--search">
            <input
              className='input'
              type="text"
              placeholder='Hey, what are you looking for?'
            />
          </div>

          <a href="/">
            <img
              className='Header__icon'
              src={logoHeart}
              alt="Heart"
            />
          </a>

          <a href="/">
            <img
              className='Header__icon Header__icon--w-34'
              src={logoBag}
              alt="Bag"
            />
          </a>
        </div>
      </section>
    </header>
    <div className="margin"></div>
  </>
);
