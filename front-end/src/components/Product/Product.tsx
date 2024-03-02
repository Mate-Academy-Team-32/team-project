'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import '@/app/components/Product/Product.scss';
import { Rate } from '@/components/Rate';
import { Review } from '@/components/Review';
import { PopUp } from '@/components/PopUp';
import { scrollToTop } from '@/app/utils/_scroll';
import imgProductMain1 from '/public/img/image-product-main.png';
import imgProductMain2 from '/public/img/image-product-main-2.png';
import imgProductMain3 from '/public/img/image-product-main-3.png';
import imgProductMain4 from '/public/img/image-product-main-4.png';
import imgProductAdd1 from '/public/img/image-product-add-1.png';
import imgProductAdd2 from '/public/img/image-product-add-2.png';
import imgProductAdd3 from '/public/img/image-product-add-3.png';
import imgProductAdd4 from '/public/img/image-product-add-4.png';
import like from '/public/img/logo-heart.svg';
import arrowSlide from '/public/img/tool-arrow-slide-right.svg';
import recycleBin from '/public/img/icon-recycle-bin.svg';

const MAIN_IMAGES = [
  imgProductMain1,
  imgProductMain2,
  imgProductMain3,
  imgProductMain4,
];

export function Product() {
  const [quantityProducts, setQuantityProducts] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [startPosReview, setStartPosReview] = useState(0);
  const [countReviewStars, setCountReviewStars] = useState(0);
  const [isValidReview, setIsValidReview] = useState(false);

  const showReviews = () => {
    const element = Array(6)
      .fill(0)
      .map((_el, i) => {
        return (
          <Review
            key={i}
            from={'Courtney Henry ' + i}
            timeAgo={2}
            countStars={4}
            feedback={
              'Consequat velit qui adipisicing sunt do rependerit ad laborum tempor ullamco exercitation. Ullamco tempor adipisicing et voluptate duis sit esse aliqua Consequat velit qui adipisicing sunt do rependerit ad laborum tempor ullamco exercitation. Ullamco tempor adipisicing etUllamco tempor adipisicing et voluptate duis sit esse aliqua'
            }
          />
        );
      })
      .filter((_el, i) => i >= startPosReview && i < startPosReview + 3);

    return element;
  };

  useEffect(() => {
    const popupReview = document.querySelector(
      '.Pop-up--review',
    ) as HTMLDivElement;
    const popupBuy = document.querySelector('.Pop-up--buy') as HTMLDivElement;
    const showButtonReview = document.querySelector(
      '.Product__leave-review-button',
    ) as HTMLButtonElement;
    const showButtonBuy = document.querySelector(
      '.Product__buy-now-button',
    ) as HTMLButtonElement;
    const closeButtonReview = document.querySelectorAll(
      '.Pop-up__close',
    )[0] as HTMLSpanElement;
    const closeButtonBuy = document.querySelectorAll(
      '.Pop-up__close',
    )[1] as HTMLSpanElement;

    showButtonReview.addEventListener('click', () => {
      popupReview.classList.remove('hidden');
    });

    showButtonBuy.addEventListener('click', () => {
      popupBuy.classList.remove('hidden');
    });

    closeButtonReview.addEventListener('click', () => {
      popupReview.classList.add('hidden');
    });

    closeButtonBuy.addEventListener('click', () => {
      popupBuy.classList.add('hidden');
    });

    window.addEventListener('click', (e) => {
      if (e.target === popupReview) {
        popupReview.classList.add('hidden');
      }
      if (e.target === popupBuy) {
        popupBuy.classList.add('hidden');
      }
    });

    scrollToTop();
  }, []);

  return (
    <>
      <h2 className="Navigation__head">
        Home {'>'} Top 10 {'>'} Tiziana Terenzi Kirke
      </h2>

      <section className="Product">
        <div className="Product__collage">
          <Image
            src={MAIN_IMAGES[selectedImage]}
            alt="Main product"
            className="Product__image Product__image--primary"
          />
          <aside className="Product__main-line">
            <Image
              src={imgProductAdd1}
              alt="Main product"
              className="Product__image Product__image--additional"
              onClick={() => {
                setSelectedImage(0);
              }}
            />
            <Image
              src={imgProductAdd2}
              alt="Main product"
              className="Product__image Product__image--additional"
              onClick={() => {
                setSelectedImage(1);
              }}
            />
            <Image
              src={imgProductAdd3}
              alt="Main product"
              className="Product__image Product__image--additional"
              onClick={() => {
                setSelectedImage(2);
              }}
            />
            <Image
              src={imgProductAdd4}
              alt="Main product"
              className="Product__image Product__image--additional"
              onClick={() => {
                setSelectedImage(3);
              }}
            />
          </aside>
        </div>

        <div className="Product__readme">
          <div className="Product__description description">
            <div className="description__block">
              <h1 className="description__title">Tiziana Terenzi Kirke</h1>
              <span className="description__label">Top</span>
            </div>
            <h2 className="description__name">Toilet water</h2>
            <p className="description__price">4240 ₴</p>
            <div className="description__rate">
              <Rate countStars={4} />
              <span>562 customer reviews</span>
            </div>
            <div className="description__text">
              <p>
                The exquisite fragrance of Kirke perfume from the famous Italian
                perfume house Tiziana Terenzi captivates and inspires, creating
                a magical aura of sophistication and sensuality.
              </p>
              <p>
                The fruity and chypre elite composition chooses as its heroine a
                luxurious woman whose manners and education are admired by those
                around her. She is a real queen, owner of the sea, elements and
                earthly wealth. She is a goddess.
              </p>
            </div>
          </div>

          <div className="Product__char char">
            <h1 className="char__title">Characteristics</h1>
            <div className="char__about">
              <div className="char__left">
                <p>
                  <span style={{ color: '#707070' }}>
                    The premiere of the fragrance:
                  </span>{' '}
                  2015
                </p>
                <p>
                  <span style={{ color: '#707070' }}>TM country:</span> Italy
                </p>
                <p>
                  <span style={{ color: '#707070' }}>Gender:</span> unisex
                </p>
                <p>
                  <span style={{ color: '#707070' }}>Classification:</span>{' '}
                  niche
                </p>
                <p>
                  <span style={{ color: '#707070' }}>Type of aroma:</span>{' '}
                  fruity, chypre
                </p>
              </div>
              <div className="char__right">
                <p>
                  <span style={{ color: '#707070' }}>Top note:</span> Black
                  currant leaves, Raspberry, Passion fruit, Peach
                </p>
                <p>
                  <span style={{ color: '#707070' }}>Heart note:</span> lily of
                  the valley
                </p>
                <p>
                  <span style={{ color: '#707070' }}>End note:</span> Vanilla,
                  Heliotrope, Musk, Patchouli, Sandalwood
                </p>
              </div>
            </div>
          </div>

          <div className="Product__volume">
            <div className="select is-primary">
              <select>
                <option>100ml</option>
                <option>50ml</option>
                <option>30ml</option>
              </select>
            </div>
          </div>

          <form
            action="/product"
            method="post"
            className="Product__form-buy form-buy"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="form-buy__plus-minus">
              <button
                type="button"
                className="form-buy__controls"
                onClick={() => {
                  setQuantityProducts((current) =>
                    current > 1 ? current - 1 : current,
                  );
                }}
              >
                -
              </button>
              <span className="Product__quantity form-buy__quantity">
                {quantityProducts}
              </span>
              <button
                type="button"
                className="form-buy__controls"
                onClick={() => {
                  setQuantityProducts((current) => current + 1);
                }}
              >
                +
              </button>
            </div>
            <button
              type="submit"
              className="Product__buy-now-button form-buy__submit"
            >
              Buy now
            </button>
            <button type="button" className="form-buy__like">
              <Image src={like} alt="Like" />
            </button>
          </form>

          <div className="Product__status">
            <p>In Stock!</p>
            <p>
              Product code: <span style={{ color: '#a4a4a4' }}>267819</span>
            </p>
          </div>
        </div>
      </section>

      <section className="Product__reviews-content">
        <h1 className="Product__title">Reviews</h1>

        <main className="Product__reviews">{showReviews()}</main>

        <div className="Product__arrows">
          <Image
            src={arrowSlide}
            alt="Arrow left"
            className="Product__arrow Product__arrow--left"
            onClick={() => {
              setStartPosReview((currentState) => {
                if (currentState > 0) {
                  return currentState - 3;
                }

                return currentState;
              });
            }}
          />
          <Image
            src={arrowSlide}
            alt="Arrow right"
            className="Product__arrow Product__arrow--right"
            onClick={() => {
              setStartPosReview((currentState) => {
                if (currentState < 3) {
                  return currentState + 3;
                }

                return currentState;
              });
            }}
          />
        </div>

        <div className="Product__leave-review">
          <button type="button" className="Product__leave-review-button">
            Leave a review
          </button>
        </div>
      </section>

      <PopUp className="Pop-up--review">
        <div className="Pop-up__top-bar">
          <h1 className="Pop-up__head">Leave a review</h1>
          <span className="Pop-up__close"></span>
        </div>

        <hr className="Pop-up__line" />

        <form
          action="/"
          method="post"
          className="Pop-up__review"
          onSubmit={(e) => {
            if (!isValidReview) {
              return;
            }

            e.preventDefault();
          }}
        >
          <div className="Pop-up__field">
            <label htmlFor="stars" className="Pop-up__head Pop-up__head--2">
              Your rating
            </label>
            <input
              type="number"
              id="stars"
              className="Pop-up__input Pop-up__input--stars"
              value={countReviewStars}
              required
            />
            <div className="Pop-up__stars" id="stars">
              <div
                className="Pop-up__star-icon"
                onClick={() => {
                  setCountReviewStars(1);
                  setIsValidReview(true);
                }}
              ></div>
              <div
                className="Pop-up__star-icon"
                onClick={() => {
                  setCountReviewStars(2);
                  setIsValidReview(true);
                }}
              ></div>
              <div
                className="Pop-up__star-icon"
                onClick={() => {
                  setCountReviewStars(3);
                  setIsValidReview(true);
                }}
              ></div>
              <div
                className="Pop-up__star-icon"
                onClick={() => {
                  setCountReviewStars(4);
                  setIsValidReview(true);
                }}
              ></div>
              <div
                className="Pop-up__star-icon"
                onClick={() => {
                  setCountReviewStars(5);
                  setIsValidReview(true);
                }}
              ></div>
            </div>
          </div>

          <div className="Pop-up__field">
            <label htmlFor="name" className="Pop-up__head Pop-up__head--2">
              Display name
            </label>
            <input
              type="text"
              className="Pop-up__input Pop-up__input--name"
              id="name"
              placeholder="Name"
              required
            />
          </div>

          <div className="Pop-up__field">
            <label htmlFor="message" className="Pop-up__head Pop-up__head--2">
              Text message
            </label>
            <textarea
              id="message"
              className="Pop-up__input Pop-up__input--message"
            ></textarea>
          </div>

          <div className="Pop-up__field Pop-up__field--row">
            <input
              type="file"
              className="Pop-up__input Pop-up__input--upload"
              id="image"
              accept="image/*"
            />
            <label
              htmlFor="image"
              className="Pop-up__head Pop-up__head--2 Pop-up__head--upload"
            >
              <div className="Pop-up__image-picture"></div>
              Add image
            </label>
          </div>

          <div className="Pop-up__buttons">
            <button
              type="submit"
              className="Pop-up__button Pop-up__button--submit"
            >
              Add review
            </button>
            <button
              type="reset"
              className="Pop-up__button Pop-up__button--clear"
            >
              Clear
            </button>
          </div>
        </form>
      </PopUp>

      <PopUp className="Pop-up--buy">
        <div className="Pop-up__top-bar">
          <h1 className="Pop-up__head">Shopping Cart</h1>
          <span className="Pop-up__close"></span>
        </div>

        <hr className="Pop-up__line" />

        <form
          action="/"
          method="post"
          className="Pop-up__buy"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="Pop-up__picture">
            <Image
              src={imgProductAdd1}
              alt="Product image"
              className="Pop-up__image"
            />
          </div>

          <div className="Pop-up__description">
            <h2 className="Pop-up__head">Tiziana Terenzi Kirke</h2>
            <p className="Pop-up__text">Toilet water</p>
            <p className="Pop-up__volume">100ml</p>
          </div>

          <div className="form-buy__plus-minus">
            <button
              type="button"
              className="form-buy__controls"
              onClick={() => {
                setQuantityProducts((current) =>
                  current > 1 ? current - 1 : current,
                );
              }}
            >
              -
            </button>
            <span className="Product__quantity form-buy__quantity">
              {quantityProducts}
            </span>
            <button
              type="button"
              className="form-buy__controls"
              onClick={() => {
                setQuantityProducts((current) => current + 1);
              }}
            >
              +
            </button>
          </div>

          <div className="Pop-up__options">
            <div className="Pop-up__price">
              <p>4240 ₴</p>
            </div>

            <div className="Pop-up__remove">
              <Image src={recycleBin} alt="Remove" />
            </div>
          </div>

          <div className="Pop-up__checkout">
            <div className="Pop-up__amount">
              <p>Order amount</p>
              <p>4240 ₴</p>
            </div>

            <hr className="Pop-up__line" />

            <div className="Pop-up__total">
              <p>Total</p>
              <p>4240 ₴</p>
            </div>

            <hr className="Pop-up__line" />

            <button className="Pop-up__submit">Checkout</button>
          </div>
        </form>
      </PopUp>
    </>
  );
}
