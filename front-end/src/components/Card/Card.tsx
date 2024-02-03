import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { Rate } from '../Rate';
import './Card.scss';

type Props = {
  id: number;
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
  id,
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
  const navigate = useNavigate();

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

      <img
        src={image}
        alt="Product"
        className="Card__product"
        onClick={() => {
          navigate(`/product?id=${id}`);
        }}
      />

      <div className="Card__description">
        <h1 className="Card__title">{title}</h1>

        {
          isGrid &&
          <p className="Card__text">
            The exquisite fragrance of Kirke perfume from the famous Italian perfume house Tiziana Terenzi captivates and inspires, creating a magical aura of sophistication and sensuality.
          </p>
        }

        <Rate className="Card__rate" countStars={countStars} countReviews={countReviews} />

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
