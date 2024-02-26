import React from 'react';
import Image from 'next/image';
import './Main.scss';
import { Slider } from '../Slider';
import logoPartner1 from '/public/img/logo-partners-1.svg';
import logoPartner2 from '/public/img/logo-partners-2.svg';
import logoPartner3 from '/public/img/logo-partners-3.svg';
import logoPartner4 from '/public/img/logo-partners-4.svg';
import logoPartner5 from '/public/img/logo-partners-5.svg';
import imgAdv1 from '/public/img/image-adv-1.png';
import imgAdv2 from '/public/img/image-adv-2.png';
import imgAdv3 from '/public/img/image-adv-3.png';
import iconFeature1 from '/public/img/icon-feature-1.svg';
import iconFeature2 from '/public/img/icon-feature-2.svg';
import iconFeature3 from '/public/img/icon-feature-3.svg';
import iconFeature4 from '/public/img/icon-feature-4.svg';

export const Main: React.FC = () => (
  <main className="Main">
    <Slider
      images={[
        {
          id: 1,
          color: '#000000',
          pathImg: '/public/img/image-slide-1.png'
        },
        {
          id: 2,
          color: '#ffffff',
          pathImg: '/public/img/image-slide-2.png'
        },
        {
          id: 3,
          color: '#000000',
          pathImg: '/public/img/image-slide-3.png'
        },
        {
          id: 4,
          color: '#f4d2b7',
          pathImg: '/public/img/image-slide-4.png'
        },
        {
          id: 5,
          color: '#eedde3',
          pathImg: '/public/img/image-slide-5.png'
        },
      ]}
      timeUpdate={3}
    />

    <section className="Main__partners">
      <a href="https://www.dolcegabbana.com/en-it/" target="_blank" rel="noopener noreferrer">
        <Image src={logoPartner1} alt="1" />
      </a>
      <a href="https://www.gucci.com/int/en/" target="_blank" rel="noopener noreferrer">
        <Image src={logoPartner2} alt="2" />
      </a>
      <a href="https://www.armani.com/en-wx" target="_blank" rel="noopener noreferrer">
        <Image src={logoPartner3} alt="3" />
      </a>
      <a href="https://www.givenchy.com/" target="_blank" rel="noopener noreferrer">
        <Image src={logoPartner4} alt="4" />
      </a>
      <a href="https://www.chanel.com/gb/" target="_blank" rel="noopener noreferrer">
        <Image src={logoPartner5} alt="5" />
      </a>
    </section>

    <section className="Main__advantages advantages">
      <div className="advantages__content">
        <div className="advantages__cell cell cell--text">
          From <span>classic</span> to <span>exclusive!</span> Over <span>20,000</span> tested perfumes. Only <span>original products</span> of global and Ukrainian manufacturers.
        </div>
        <div className="advantages__cell cell">
          <Image src={imgAdv1} alt="Advantages 2" />
        </div>
        <div className="advantages__cell cell cell--text">
          Discover the world of reincarnations. Get <span>inspired, admire, conspire.</span> Don't miss the <span>hot discounts!</span>
        </div>
        <div className="advantages__cell cell">
          <Image src={imgAdv2} alt="Advantages 1" />
        </div>
        <div className="advantages__cell cell cell--text cell--color--light">
          <span>Join us!</span> We want you to be interesting with us, so that you feel that with us, you can afford <span>high-quality elite perfumery.</span>
        </div>
        <div className="advantages__cell cell">
          <Image src={imgAdv3} alt="Advantages 3" />
        </div>
      </div>
    </section>

    <section className="Main__features features">
      <Image src={iconFeature1} alt="" className="features__img" />
      <Image src={iconFeature2} alt="" className="features__img" />
      <Image src={iconFeature3} alt="" className="features__img" />
      <Image src={iconFeature4} alt="" className="features__img" />
    </section>
  </main>
);
