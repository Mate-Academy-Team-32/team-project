import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import Image from 'next/image';
import './Header.scss';
import iconAccount from '/public/img/icon-account.svg';
import iconHeart from '/public/img/icon-heart-white.svg';
import iconBag from '/public/img/icon-bag-white.svg';
import iconBurger from '/public/img/icon-burger.svg';

export const Header: React.FC = () => {
  const [isSigned] = useState(false);
  const [headerHight, setHeaderHeight] = useState(90);
  const [isClickedSign, setIsClickedSign] = useState(false);

  document.cookie = `isSigned=${isSigned}`;

  useEffect(() => {
    (document.querySelector('#bag') as HTMLAnchorElement)
      .setAttribute('data-count', '0');

    const searchInput = document.querySelector('.nav__input') as HTMLInputElement;
    const lensOpen = document.querySelector('.lens--open') as HTMLDivElement;
    const lensClose = document.querySelector('.lens--close') as HTMLDivElement;
    const textLinks = document.querySelectorAll('.nav__link') as NodeListOf<HTMLLinkElement>;
    const catalogLink = document.querySelector('#catalog') as HTMLLinkElement;
    const catalogBlock = document.querySelector('.nav--catalog') as HTMLDivElement;
    const header = document.querySelector('.Header') as HTMLDivElement;
    const dropdown = document.querySelector('.dropdown') as HTMLDivElement;

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

    catalogLink.addEventListener('mouseenter', () => {
      catalogBlock.classList.remove('hidden');
      setHeaderHeight(320);
    });

    header.addEventListener('mouseleave', () => {
      catalogBlock.classList.add('hidden');
      setHeaderHeight(90);
    });

    dropdown.addEventListener('mouseleave', () => {
      dropdown.classList.remove('is-active');
    });
  });

  return (
    <>
      <header className="Header" style={{ height: headerHight }}>
        <section className="Header__top-bar">
          <Image src={iconBurger} alt="burger-menu" className="Header__menu" />

          <Link to="/" className="Header__logo">
            <div className="logo">
              Perfu
              <span className="logo__highlight">Me</span>
            </div>
          </Link>

          <nav className="nav nav--links">
            <Link to="/" relative="path" className="nav__link">Home</Link>
            <Link to="/catalog" relative="path" className="nav__link" id="catalog">Catalog</Link>
            <nav className="nav nav--catalog hidden">
              <Link to="/catalog?filter=top-10" relative="path" className="nav__link nav__link--upper">Top 10</Link>
              <Link to="/catalog?filter=women" relative="path" className="nav__link nav__link--upper">Women`s perfumery</Link>
              <Link to="/catalog?filter=men" relative="path" className="nav__link nav__link--upper">Men`s perfumery</Link>
              <Link to="/catalog?filter=unisex" relative="path" className="nav__link nav__link--upper">Unisex</Link>
            </nav>
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

            <Link to="/account">
              <div className={cn(
                "dropdown",
                isClickedSign && "is-active"
              )}>
                <div className="dropdown-trigger">
                  <Image
                    className="sign-in"
                    src={iconAccount}
                    alt="Sign in"
                    onMouseEnter={() => setIsClickedSign(currentState => !currentState)}
                  />
                </div>
                {isSigned
                  ? (
                    <div className="dropdown-menu" id="dropdown-menu1" role="menu">
                      <div className="dropdown-content">
                        <div className="dropdown-item" onClick={() => setIsClickedSign(false)}>
                          <p>Account details</p>
                        </div>
                        <hr className="dropdown-divider" />
                        <div className="dropdown-item" onClick={() => setIsClickedSign(false)}>
                          <p>My orders</p>
                        </div>
                        <hr className="dropdown-divider" />
                        <div className="dropdown-item" onClick={() => setIsClickedSign(false)}>
                          <p>Sign out</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="dropdown-menu" id="dropdown-menu1" role="menu">
                      <div className="dropdown-content">
                        <div className="dropdown-item" onClick={() => setIsClickedSign(false)}>
                          <p><Link to="/sign?type=in" className="dropdown__text dropdown__text--size--16">Sign In</Link></p>
                        </div>
                        <hr className="dropdown-divider" />
                        <div className="dropdown-item" onClick={() => setIsClickedSign(false)}>
                          <p className="dropdown__text dropdown__text--color--light">
                            Don`t have an account?
                            {' '}
                            <Link to="/sign?type=up" className="dropdown__text dropdown__text--bold">Sign Up</Link></p>
                        </div>
                      </div>
                    </div>
                  )
                }
              </div>
            </Link>

            <Link to="/likes" id="icon--like">
              <Image
                className="Header__icon"
                src={iconHeart}
                alt="Heart"
              />
            </Link>

            <Link to="/cart" id="bag">
              <Image
                className="Header__icon Header__icon--w-34"
                src={iconBag}
                alt="Bag"
              />
            </Link>
          </nav>
        </section>
      </header >

      <div className="margin" style={{ marginTop: headerHight }}></div>
    </>
  );
};
