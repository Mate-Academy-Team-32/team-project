import React, { Dispatch, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { Rate } from '../Rate';
import './Card.scss';
import { Label } from '../../types/types';
import like from '../../img/icon-heart-no-filled.svg';
import likeFocused from '../../img/icon-heart-focused.svg';

type Props = {
  id: number;
  image: string;
  category: Label;
  title: string;
  price: number;
  volume: number;
  countProducts: [number, Dispatch<SetStateAction<number>>],
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
  countProducts,
  countStars = 5,
  countReviews = 10,
  isGrid = false,
}) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  return (
    <section className={cn(
      'Card',
      isGrid && 'Card--grid',
      !isGrid && 'Card--list',
    )}>
      <nav className="Card__top-bar">
        <span
          className={cn(
            "Card__label",
            category === 'top' && "Card__label--top",
            category === 'women' && "Card__label--women",
            category === 'men' && "Card__label--men",
            category === 'new' && "Card__label--new",
            category === 'sale' && "Card__label--sale",
          )}
        >{category}</span>
        <div className="Card__like">
          <img
            src={!isLiked ? like : likeFocused}
            alt="Like"
            onClick={() => setIsLiked(prevValue => !prevValue)}
          />
        </div>
      </nav>

      <article
        className="Card__content"
        onClick={() => {
          navigate(`/product?id=${id}`);
        }}
      >
        <img
          src={image}
          alt="Product"
          className="Card__product"
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

            countProducts[1](currentCount => currentCount + 1);

            countBag.setAttribute('data-count', countProducts[0].toString());
          }}
        >
          Add to bag
        </button>
      </article>
    </section>
  );
};
