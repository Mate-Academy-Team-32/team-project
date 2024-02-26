import React, { Dispatch, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { Rate } from '../Rate';
import './Card.scss';
import { Label } from '../../types/types';
import like from '/public/img/icon-heart-no-filled.svg';
import likeFocused from '/public/img/icon-heart-focused.svg';

type Props = {
  id: number;
  image: string;
  category: Label;
  title: string;
  price: number[];
  volume: number[];
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
  const [volumeIndex, setVolumeIndex] = useState(0);

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

      <article className="Card__content">
        <div className="Card__info">
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
              <p className="Card__price">$ {price[volumeIndex].toFixed(2)}</p>
              <div className="select is-primary">
                <select
                  onChange={(e) => {
                    let index: number = 0;

                    switch (e.target.value) {
                      case '100ml':
                        index = 0;
                        break;
                      case '50ml':
                        index = 1;
                        break;
                      case '30ml':
                        index = 2;
                        break;
                    }

                    setVolumeIndex(index);
                  }}
                >
                  <option className="Card__volume">{volume[0]}ml</option>
                  <option className="Card__volume">{volume[1]}ml</option>
                  <option className="Card__volume">{volume[2]}ml</option>
                </select>
              </div>
            </div>
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
