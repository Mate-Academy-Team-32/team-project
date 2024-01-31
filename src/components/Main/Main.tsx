import React from 'react';
import './Main.scss';
import { Slider } from '../Slider';
import logoPartner1 from '../../img/logo-partners-1.svg';
import logoPartner2 from '../../img/logo-partners-2.svg';
import logoPartner3 from '../../img/logo-partners-3.svg';
import logoPartner4 from '../../img/logo-partners-4.svg';
import logoPartner5 from '../../img/logo-partners-5.svg';
import imgOffer from '../../img/image-offer.png';
import imgChanelWoman from '../../img/image-chanel-woman.png';
import imgChanelBottle from '../../img/image-chanel-bottle.png';
import imgSlide1 from '../../img/image-slide-1.png';
import imgSlide2 from '../../img/image-slide-2.png';
import imgSlide3 from '../../img/image-slide-3.png';
import imgSlide4 from '../../img/image-slide-4.png';
import imgSlide5 from '../../img/image-slide-5.png';

export const Main: React.FC = () => (
  <main className="Main">
    <Slider
      images={[
        {
          path: imgSlide1,
          id: 1,
        },
        {
          path: imgSlide2,
          id: 2,
        },
        {
          path: imgSlide3,
          id: 3,
        },
        {
          path: imgSlide4,
          id: 4,
        },
        {
          path: imgSlide5,
          id: 5,
        },
      ]}
      timeUpdate={3}
    />

    <section className="Main__partners">
      <a href="https://www.dolcegabbana.com/en-it/" target="_blank" rel="noopener noreferrer">
        <img src={logoPartner1} alt="1" />
      </a>
      <a href="https://www.gucci.com/int/en/" target="_blank" rel="noopener noreferrer">
        <img src={logoPartner2} alt="2" />
      </a>
      <a href="https://www.armani.com/en-wx" target="_blank" rel="noopener noreferrer">
        <img src={logoPartner3} alt="3" />
      </a>
      <a href="https://www.givenchy.com/" target="_blank" rel="noopener noreferrer">
        <img src={logoPartner4} alt="4" />
      </a>
      <a href="https://www.chanel.com/gb/" target="_blank" rel="noopener noreferrer">
        <img src={logoPartner5} alt="5" />
      </a>
    </section>
  
    <hr className="Main__line" />

    <section className="Main__offer">
      <img src={imgOffer} alt="Special offer" />
      <article className="offer">
        <h1 className="offer__header">Limited Time Offer: 25% OFF on Golden Angel Perfume!</h1>
        <h2>
          Golden Angel
          <br />
          <span>
            Unleash Your Divine Glow
          </span>
        </h2>
        <p>
          Indulge in the divine allure of Golden Angel, a fragrance that embodies celestial elegance and radiance.
        </p>
        <button type="button" className="offer__button">Know more</button>
      </article>
    </section>

    <section className="Main__chanel chanel">
      <div className="chanel__logo">
        CHANEL
      </div>
      <img className="chanel__woman" src={imgChanelWoman} alt="Chanel person" />
      <img className="chanel__bottle" src={imgChanelBottle} alt="Chanel bottle" />
      <div className="chanel__description">
        <h1>Classic perfume</h1>
        <p>This exclusive perfume with exquisite notes and persistent natural aroma will not leave anyone indifferent! Persistent aroma and original style. Quality that has been tested by time and the trust of people all over the world!</p>
        <button type="button">Know More</button>
      </div>
    </section>
  </main>
);
