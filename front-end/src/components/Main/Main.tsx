import React from 'react';
import './Main.scss';
import { Slider } from '../Slider';
import logoPartner1 from '../../img/logo-partners-1.svg';
import logoPartner2 from '../../img/logo-partners-2.svg';
import logoPartner3 from '../../img/logo-partners-3.svg';
import logoPartner4 from '../../img/logo-partners-4.svg';
import logoPartner5 from '../../img/logo-partners-5.svg';
import imgSlide1 from '../../img/image-slide-1.png';
import imgSlide2 from '../../img/image-slide-2.png';
import imgSlide3 from '../../img/image-slide-3.png';
import imgSlide4 from '../../img/image-slide-4.png';
import imgSlide5 from '../../img/image-slide-5.png';
import imgAdv1 from '../../img/image-adv-1.png';
import imgAdv2 from '../../img/image-adv-2.png';
import imgAdv3 from '../../img/image-adv-3.png';
import iconFeature1 from '../../img/icon-feature-1.svg';
import iconFeature2 from '../../img/icon-feature-2.svg';
import iconFeature3 from '../../img/icon-feature-3.svg';
import iconFeature4 from '../../img/icon-feature-4.svg';

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

    <section className="Main__advantages advantages">
      <div className="advantages__content">
        <div className="advantages__cell cell cell--text">
          From classic to exclusive! Over 20,000 tested perfumes. Only original products of global and Ukrainian manufacturers.
        </div>
        <div className="advantages__cell cell">
          <img src={imgAdv1} alt="Advantages 2" width="450" />
        </div>
        <div className="advantages__cell cell cell--text">
          Discover the world of reincarnations. Get inspired, admire, conspire. Don't miss the hot discounts!
        </div>
        <div className="advantages__cell cell">
          <img src={imgAdv2} alt="Advantages 1" width="450" />
        </div>
        <div className="advantages__cell cell cell--text cell--color--light">
          Join us! We want you to be interesting with us, so that you feel that with us, you can afford high-quality elite perfumery.
        </div>
        <div className="advantages__cell cell">
          <img src={imgAdv3} alt="Advantages 3" width="450" />
        </div>
      </div>
    </section>

    <section className="Main__features features">
      <img src={iconFeature1} alt="" className="features__img" />
      <img src={iconFeature2} alt="" className="features__img" />
      <img src={iconFeature3} alt="" className="features__img" />
      <img src={iconFeature4} alt="" className="features__img" />
    </section>
  </main>
);
