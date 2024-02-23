import React, { useEffect, useState } from 'react';
import { Rate } from '../Rate';
import { Review } from '../Review';
import { PopUp } from '../PopUp';
import { scrollToTop } from '../../utils/_scroll';
import './Product.scss';
import imgProductMain1 from '../../img/image-product-main.png';
import imgProductMain2 from '../../img/image-product-main-2.png';
import imgProductMain3 from '../../img/image-product-main-3.png';
import imgProductMain4 from '../../img/image-product-main-4.png';
import imgProductAdd1 from '../../img/image-product-add-1.png';
import imgProductAdd2 from '../../img/image-product-add-2.png';
import imgProductAdd3 from '../../img/image-product-add-3.png';
import imgProductAdd4 from '../../img/image-product-add-4.png';
import like from '../../img/logo-heart.svg';
import arrowSlide from '../../img/tool-arrow-slide-right.svg';

const MAIN_IMAGES = [imgProductMain1, imgProductMain2, imgProductMain3, imgProductMain4];

export const Product: React.FC = () => {
  const [quantityProducts, setQuantityProducts] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [startPosReview, setStartPosReview] = useState(0);

  const showReviews = () => {
    const element = Array(6)
      .fill(0)
      .map((_el, i) => {
        return (
          <Review
            from={"Courtney Henry " + i}
            timeAgo={2}
            countStars={4}
            feedback={"Consequat velit qui adipisicing sunt do rependerit ad laborum tempor ullamco exercitation. Ullamco tempor adipisicing et voluptate duis sit esse aliqua Consequat velit qui adipisicing sunt do rependerit ad laborum tempor ullamco exercitation. Ullamco tempor adipisicing etUllamco tempor adipisicing et voluptate duis sit esse aliqua"}
          />
        );
      })
      .filter((_el, i) => i >= startPosReview && i < startPosReview + 3);

    return element;
  };

  useEffect(() => {
    const popup = document.querySelector('.Pop-up') as HTMLDivElement;
    const showButton = document.querySelector('.Product__leave-review-button') as HTMLButtonElement;
    const closeButton = document.querySelector('.Pop-up__close') as HTMLSpanElement;

    showButton.addEventListener('click', () => {
      popup.classList.remove('hidden');
    });

    closeButton.addEventListener('click', () => {
      popup.classList.add('hidden');
    });

    window.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.classList.add('hidden');
      }
    });

    scrollToTop();
  }, []);

  return (
    <>
      <h2 className="Navigation__head">Home {'>'} Top 10 {'>'} Tiziana Terenzi Kirke</h2>

      <section className="Product">
        <div className="Product__collage">
          <img
            src={MAIN_IMAGES[selectedImage]}
            alt="Main product"
            className="Product__image Product__image--primary"
          />
          <aside className="Product__main-line">
            <img
              src={imgProductAdd1}
              alt="Main product"
              className="Product__image Product__image--additional"
              onClick={() => setSelectedImage(0)}
            />
            <img
              src={imgProductAdd2}
              alt="Main product"
              className="Product__image Product__image--additional"
              onClick={() => setSelectedImage(1)}
            />
            <img
              src={imgProductAdd3}
              alt="Main product"
              className="Product__image Product__image--additional"
              onClick={() => setSelectedImage(2)}
            />
            <img
              src={imgProductAdd4}
              alt="Main product"
              className="Product__image Product__image--additional"
              onClick={() => setSelectedImage(3)}
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
                The exquisite fragrance of Kirke perfume from the famous Italian perfume house Tiziana Terenzi captivates and inspires, creating a magical aura of sophistication and sensuality.
              </p>
              <p>
                The fruity and chypre elite composition chooses as its heroine a luxurious woman whose manners and education are admired by those around her. She is a real queen, owner of the sea, elements and earthly wealth. She is a goddess.
              </p>
            </div>
          </div>

          <div className="Product__char char">
            <h1 className="char__title">Characteristics</h1>
            <div className="char__about">
              <div className="char__left">
                <p><span style={{ color: "#707070" }}>The premiere of the fragrance:</span> 2015</p>
                <p><span style={{ color: "#707070" }}>TM country:</span> Italy</p>
                <p><span style={{ color: "#707070" }}>Gender:</span> unisex</p>
                <p><span style={{ color: "#707070" }}>Classification:</span> niche</p>
                <p><span style={{ color: "#707070" }}>Type of aroma:</span> fruity, chypre</p>
              </div>
              <div className="char__right">
                <p><span style={{ color: "#707070" }}>Top note:</span> Black currant leaves, Raspberry, Passion fruit, Peach</p>
                <p><span style={{ color: "#707070" }}>Heart note:</span> lily of the valley</p>
                <p><span style={{ color: "#707070" }}>End note:</span>  Vanilla, Heliotrope, Musk, Patchouli, Sandalwood</p>
              </div>
            </div>
          </div>

          <form
            action="/product"
            method="post"
            className="Product__form-buy form-buy"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="form-buy__plus-minus">
              <button
                type="button"
                className="form-buy__controls"
                onClick={() => setQuantityProducts(
                  current => current > 1 ? current - 1 : current
                )}
              >
                -
              </button>
              <span className="Product__quantity form-buy__quantity">{quantityProducts}</span>
              <button
                type="button"
                className="form-buy__controls"
                onClick={() => setQuantityProducts(
                  current => current + 1)
                }
              >
                +
              </button>
            </div>
            <button type="submit" className="form-buy__submit">Buy now</button>
            <button type="button" className="form-buy__like">
              <img src={like} alt="Like" />
            </button>
          </form>

          <div className="Product__status">
            <p>In Stock!</p>
            <p>Product code: <span style={{ color: "#a4a4a4" }}>267819</span></p>
          </div>
        </div>
      </section>

      <section className="Product__reviews-content">
        <h1 className="Product__title">Reviews</h1>

        <main className="Product__reviews">
          {
            showReviews()
          }
        </main>

        <div className="Product__arrows">
          <img
            src={arrowSlide}
            alt="Arrow left"
            className="Product__arrow Product__arrow--left"
            onClick={() => setStartPosReview(currentState => {
              if (currentState > 0) {
                return currentState - 3;
              }

              return currentState;
            })}
          />
          <img
            src={arrowSlide}
            alt="Arrow right"
            className="Product__arrow Product__arrow--right"
            onClick={() => setStartPosReview(currentState => {
              if (currentState < 3) {
                return currentState + 3;
              }

              return currentState;
            })}
          />
        </div>

        <div className="Product__leave-review">
          <button type="button" className="Product__leave-review-button">Leave a review</button>
        </div>
      </section>

      <PopUp>
        <div className="Pop-up__top-bar">
          <h1 className="Pop-up__head">Leave a review</h1>
          <span className="Pop-up__close"></span>
        </div>

        <hr className="Pop-up__line" />

        <form
          action="/"
          method="post"
          className="Pop-up__review"
          onSubmit={(e) => { e.preventDefault() }}
        >
          <div className="Pop-up__field">
            <label htmlFor="stars" className="Pop-up__head Pop-up__head--2">Your rating</label>
            <div className="Pop-up__stars" id="stars">
              <div className="Pop-up__star-icon"></div>
              <div className="Pop-up__star-icon"></div>
              <div className="Pop-up__star-icon"></div>
              <div className="Pop-up__star-icon"></div>
              <div className="Pop-up__star-icon"></div>
            </div>
          </div>

          <div className="Pop-up__field">
            <label htmlFor="name" className="Pop-up__head Pop-up__head--2">Display name</label>
            <input
              type="text"
              className="Pop-up__input Pop-up__input--name"
              id="name"
              placeholder="Name"
            />
          </div>

          <div className="Pop-up__field">
            <label htmlFor="message" className="Pop-up__head Pop-up__head--2">Text message</label>
            <textarea id="message" className="Pop-up__input Pop-up__input--message"></textarea>
          </div>

          <div className="Pop-up__field Pop-up__field--row">
            <input
              type="file"
              className="Pop-up__input Pop-up__input--upload"
              id="image"
              accept="image/*"
            />
            <label htmlFor="image" className="Pop-up__head Pop-up__head--2 Pop-up__head--upload"> 
              <div className="Pop-up__image-picture"></div>
              Add image
            </label>
          </div>

          <div className="Pop-up__buttons">
            <button type="submit" className="Pop-up__button Pop-up__button--submit">Add review</button>
            <button type="reset" className="Pop-up__button Pop-up__button--clear">Clear</button>
          </div>
        </form>
      </PopUp>
    </>
  )
};
