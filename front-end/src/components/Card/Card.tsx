import React, { useState } from 'react';
import cn from 'classnames';
import { Rate } from '../Rate';
import './Card.scss';

type Props = {
  image: string;
  category: string;
  title: string;
  price: number;
  volume: number;
  countStars?: number;
  countReviews?: number;
  isGrid?: boolean;
};

export const Card: React.FC<Props> = ({
  image,
  category,
  title,
  price,
  volume,
  countStars = 5,
  countReviews = 10,
  isGrid = false,
}) => {
  const [countProducts, setCountProducts] = useState(0);

  return (
    <section className={cn(
      'Card',
      isGrid && 'Card--grid',
      !isGrid && 'Card--list',
    )}>
      <nav className="Card__top-bar">
        <span className="Card__label">{category}</span>
        <div className="Card__like"></div>
      </nav>

      <img src={image} alt="Product" className="Card__product" />

      <div className="Card__description">
        <h1 className="Card__title">{title}</h1>

        <Rate countStars={countStars} countReviews={countReviews} />

        <div className="Card__parameters">
          <p className="Card__price">$ {price.toFixed(2)}</p>
          <p className="Card__volume">{volume}ml</p>
        </div>
      </div>

      <button
        type="button"
        className="Card__button"
        onClick={() => {
          const countBag = document.querySelector('#bag') as HTMLAnchorElement;

          setCountProducts(currentCount => currentCount + 1);
          countBag.setAttribute('data-count', (countProducts + 1).toString());
        }}
      >
        Add to bag
      </button>
    </section>
  );
};
