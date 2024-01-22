import './Main.scss';
import logoHeart from '../../img/logo-heart.svg';
import logoBag from '../../img/logo-bag.svg';
import { Slider } from '../Slider';

export const Main: React.FC = () => (
  <main className="Main">
    <section className="Main__catalog">
      <div className="Main__panel">
        <a href="/" className="Main__logo">PerfuMe</a>

        <div className="input--search">
          <input
            className='input'
            type="text"
            placeholder='Hey, what are you looking for?'
          />
        </div>

        <a href="/" className='Main__language-select'>
          Eng
        </a>

        <a href="/">
          <img
            className='Main__icon'
            src={logoHeart}
            alt="Heart"
          />
        </a>

        <a href="/">
          <img
            className='Main__icon Main__icon--w-34'
            src={logoBag}
            alt="Bag"
          />
        </a>
      </div>

      <nav className="Main__categories">
        <a href="/" className="Main__link">Women's perfumery</a>
        <a href="/" className="Main__link">Men's perfumery</a>
        <a href="/" className="Main__link">Children's perfumery</a>
        <a href="/" className="Main__link">New</a>
        <a href="/" className="Main__link">Actions</a>
        <a href="/" className="Main__link">Gift ideas</a>
      </nav>
    </section>

    <Slider />
  </main>
);
