import { Dispatch, SetStateAction } from 'react';

export const checkHeader = (setHeaderHeight: Dispatch<SetStateAction<number>>) => {
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
};