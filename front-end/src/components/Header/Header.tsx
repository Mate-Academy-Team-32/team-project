import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import iconAccount from '../../img/icon-account.svg';
import iconHeart from '../../img/icon-heart-white.svg';
import iconBag from '../../img/icon-bag-white.svg';
import iconBurger from '../../img/icon-burger.svg';

export const Header: React.FC = () => {
  useEffect(() => {
    (document.querySelector('#bag') as HTMLAnchorElement)
      .setAttribute('data-count', '0');

    const searchInput = document.querySelector('.nav__input') as HTMLInputElement;
    const lensOpen = document.querySelector('.lens--open') as HTMLDivElement;
    const lensClose = document.querySelector('.lens--close') as HTMLDivElement;
    const textLinks = document.querySelectorAll('.nav__link') as NodeListOf<HTMLLinkElement>;

    const showSearch = () => {
      textLinks.forEach((textLink) => {
        textLink.classList.add('hidden');
      });

      searchInput.classList.remove('hidden');
      searchInput.focus();
      lensClose.classList.remove('hidden');
      lensOpen.classList.add('hidden');
    };

    const hideSearch = () => {
      textLinks.forEach((textLink) => {
        textLink.classList.remove('hidden');
      });

      searchInput.classList.add('hidden');
      searchInput.focus();
      lensClose.classList.add('hidden');
      lensOpen.classList.remove('hidden');
    };

    lensOpen.addEventListener('click', () => {
      showSearch();
    });

    lensClose.addEventListener('click', () => {
      hideSearch();
    });

    searchInput.addEventListener('blur', () => {
      hideSearch();
    });
  });

  return (
    <>
      <header className="Header">
        <section className="Header__top-bar">
          <img src={iconBurger} alt="burger-menu" className="Header__menu" />

          <Link to="/" className="Header__logo">
            <div className="logo">
              Perfu
              <span className="logo__highlight">Me</span>
            </div>
          </Link>

          <nav className="nav nav--links">
            <Link to="/" relative="path" className="nav__link">Home</Link>

            <Link to="/catalog" relative="path" className="nav__link">Catalog</Link>

            <Link to="/about" relative="path" className="nav__link">About Us</Link>

            <Link to="/contacts" relative="path" className="nav__link">Contact Us</Link>
          </nav>

          <nav className="nav nav--sign">
            <div className="nav__input--search">
              <button type="button" className="lens lens--close hidden"></button>
              <input
                id="search"
                type="text"
                className="nav__input hidden"
                placeholder="Hey, what are you looking for?"
              />
              <button type="button" className="lens lens--open"></button>
            </div>

            <Link to="/sign">
              <img
                className="sign-in"
                src={iconAccount}
                alt="Sign in"
              />
            </Link>

            <Link to="/likes" id="icon--like">
              <img
                className="Header__icon"
                src={iconHeart}
                alt="Heart"
              />
            </Link>

            <Link to="/cart" id="bag">
              <img
                className="Header__icon Header__icon--w-34"
                src={iconBag}
                alt="Bag"
              />
            </Link>
          </nav>
        </section>
      </header>

      <div className="margin"></div>
    </>
  );
};
