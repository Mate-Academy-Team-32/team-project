'use client';

import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { Kodchasan } from 'next/font/google';
import './Header.scss';
import { SignIn } from '../Sign';
import iconAccount from '/public/img/icon-account.svg';
import iconHeart from '/public/img/icon-heart-white.svg';
import iconBag from '/public/img/icon-bag-white.svg';
import iconBurger from '/public/img/icon-burger.svg';

const kodchasan = Kodchasan({ weight: '600', subsets: ['latin'] });

export function Header() {
  const [headerHight, setHeaderHeight] = useState(90);
  const [isClickedSign, setIsClickedSign] = useState(false);

  useEffect(() => {
    (document.querySelector('#bag') as HTMLAnchorElement).setAttribute(
      'data-count',
      '0'
    );

    const searchInput = document.querySelector(
      '.nav__input'
    ) as HTMLInputElement;
    const lensOpen = document.querySelector('.lens--open') as HTMLDivElement;
    const lensClose = document.querySelector('.lens--close') as HTMLDivElement;
    const textLinks = document.querySelectorAll(
      '.nav__link'
    ) as NodeListOf<HTMLLinkElement>;
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

    dropdown.addEventListener('mouseleave', () => {
      dropdown.classList.remove('is-active');
    });
  }, [setHeaderHeight]);

  return (
    <header className="Header" style={{ height: headerHight }}>
      <section className="Header__top-bar" style={{ height: headerHight }}>
        <Image src={iconBurger} alt="burger-menu" className="Header__menu" />

        <Link href="/" className="Header__logo">
          <div className={cn('logo', kodchasan.className)}>
            Perfu
            <span className="logo__highlight">Me</span>
          </div>
        </Link>

        <nav className="nav nav--links">
          <Link href="/" className="nav__link">
            Home
          </Link>
          <Link href="/catalog" className="nav__link" id="catalog">
            Catalog
          </Link>
          <Link href="/about" className="nav__link">
            About Us
          </Link>
          <Link href="/contacts" className="nav__link">
            Contact Us
          </Link>
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

          <div
            className={cn('dropdown', isClickedSign && 'is-active')}
            onMouseEnter={() => {
              setIsClickedSign((currentState) => !currentState);
            }}
            onMouseLeave={() => {
              setIsClickedSign((currentState) => !currentState);
            }}
          >
            <div className="dropdown-trigger">
              <Image className="sign-in" src={iconAccount} alt="Sign in" />
            </div>

            <div className="dropdown-menu" role="menu">
              <SignIn />
            </div>
          </div>

          <Link href="/likes" id="icon--like">
            <Image className="Header__icon" src={iconHeart} alt="Heart" />
          </Link>

          <Link href="/cart" id="bag">
            <Image
              className="Header__icon Header__icon--w-34"
              src={iconBag}
              alt="Bag"
            />
          </Link>
        </nav>
      </section>
    </header>
  );
}