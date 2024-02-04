import React, { useState } from 'react';
import { Rate } from '../Rate';
import { Review } from '../Review';
import { scrollToTop } from '../../utils/_scroll';
import './Product.scss';
import imgProductMain from '../../img/image-product-main.png';
import imgProductAdd1 from '../../img/image-product-add-1.png';
import imgProductAdd2 from '../../img/image-product-add-2.png';
import imgProductAdd3 from '../../img/image-product-add-3.png';
import imgProductAdd4 from '../../img/image-product-add-4.png';
import like from '../../img/logo-heart.svg';

export const Product: React.FC = () => {
  const [quantityProducts, setQuantityProducts] = useState(1);

  scrollToTop();

  return (
    <>
      <h2 className="Navigation__head">Home {'>'} Top 10 {'>'} Tiziana Terenzi Kirke</h2>

      <section className="Product">
        <div className="Product__collage">
          <img
            src={imgProductMain}
            alt="Main product"
            className="Product__image Product__image--primary"
          />
          <aside className="Product__main-line">
            <img
              src={imgProductAdd1}
              alt="Main product"
              className="Product__image Product__image--additional"
            />
            <img
              src={imgProductAdd2}
              alt="Main product"
              className="Product__image Product__image--additional"
            />
            <img
              src={imgProductAdd3}
              alt="Main product"
              className="Product__image Product__image--additional"
            />
            <img
              src={imgProductAdd4}
              alt="Main product"
              className="Product__image Product__image--additional"
            />
          </aside>
        </div>

        <div className="Product__readme">
          <div className="Product__description description">
            <h1 className="description__title">Tiziana Terenzi Kirke</h1>
            <h2 className="description__name">Toilet water</h2>
            <p className="description__price">4240 UAH</p>
            <div className="description__rate">
              <Rate countStars={4} countReviews={562} />
              <span>customer reviews</span>
            </div>
            <div className="description__text">
              The exquisite fragrance of Kirke perfume from the famous Italian perfume house Tiziana Terenzi captivates and inspires, creating a magical aura of sophistication and sensuality.
              The fruity and chypre elite composition chooses as its heroine a luxurious woman whose manners and education are admired by those around her. She is a real queen, owner of the sea, elements and earthly wealth. She is a goddess.
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
            action="./"
            method="post"
            className="Product__form-buy form-buy"
          >
            <button
              type="button"
              className="form-buy__contols"
              onClick={() => setQuantityProducts(
                current => current > 1 ? current - 1 : current
              )}
            >
              -
            </button>
            <span className="Products__quantity">{quantityProducts}</span>
            <button
              type="button"
              className="form-buy__contols"
              onClick={() => setQuantityProducts(
                current => current + 1)
              }
            >
              +
            </button>
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
          <Review
            from={"Courtney Henry"}
            timeAgo={2}
            countStars={4}
            feedback={"Consequat velit qui adipisicing sunt do rependerit ad laborum tempor ullamco exercitation. Ullamco tempor adipisicing et voluptate duis sit esse aliqua Consequat velit qui adipisicing sunt do rependerit ad laborum tempor ullamco exercitation. Ullamco tempor adipisicing etUllamco tempor adipisicing et voluptate duis sit esse aliqua"}
          />
          <Review
            from={"Courtney Henry"}
            timeAgo={2}
            countStars={4}
            feedback={"Consequat velit qui adipisicing sunt do rependerit ad laborum tempor ullamco exercitation. Ullamco tempor adipisicing et voluptate duis sit esse aliqua Consequat velit qui adipisicing sunt do rependerit ad laborum tempor ullamco exercitation. Ullamco tempor adipisicing etUllamco tempor adipisicing et voluptate duis sit esse aliqua"}
          />
          <Review
            from={"Courtney Henry"}
            timeAgo={2}
            countStars={4}
            feedback={"Consequat velit qui adipisicing sunt do rependerit ad laborum tempor ullamco exercitation. Ullamco tempor adipisicing et voluptate duis sit esse aliqua Consequat velit qui adipisicing sunt do rependerit ad laborum tempor ullamco exercitation. Ullamco tempor adipisicing etUllamco tempor adipisicing et voluptate duis sit esse aliqua"}
          />
        </main>
      </section>
    </>
  )
};
