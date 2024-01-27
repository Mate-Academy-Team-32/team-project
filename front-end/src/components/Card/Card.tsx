import './Card.scss';
import { Rate } from '../Rate';
import product from '../../img/image-product.png';

export const Card: React.FC = () => (
  <section className="Card">
    <nav className="Card__top-bar">
      <span className="Card__label">women</span>
      <div className="Card__like"></div>
    </nav>

    <img src={product} alt="Product" className="Card__product" />

    <div className="Card__description">
      <h1 className="Card__title">Gilded Elixir</h1>

      <Rate countStars={5} countReviews={10} />

      <div className="Card__parameters">
        <p className="Card__price">$ 200.00</p>
        <p className="Card__volume">100ml</p>
      </div>
    </div>

    <button type="button" className="Card__button">Add to bag</button>
  </section>
);
