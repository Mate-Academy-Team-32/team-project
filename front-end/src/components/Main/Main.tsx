import React from 'react';
import './Main.scss';
import { Slider } from '../Slider';
import { Card } from '../Card';
import logoPartner1 from '../../img/logo-partners-dg.svg';
import logoPartner2 from '../../img/logo-partners-ga.svg';
import logoPartner3 from '../../img/logo-partners-givenchy.svg';
import logoPartner4 from '../../img/logo-partners-pcd.svg';
import logoPartner5 from '../../img/logo-partners-sl.svg';
import logoPartner6 from '../../img/logo-partners-chanel.svg';

export const Main: React.FC = () => (
  <main className="Main">
    <Slider
      images={[
        {
          path: './img/image-slide-1.png',
          id: 1,
        },
        {
          path: './img/image-slide-2.png',
          id: 2,
        },
        {
          path: './img/image-slide-3.png',
          id: 3,
        },
        {
          path: './img/image-slide-4.png',
          id: 4,
        },
        {
          path: './img/image-slide-5.png',
          id: 5,
        },
      ]}
      timeUpdate={3}
    />

    <section className="Main__partners">
      <a href="https://www.dolcegabbana.com/en-it/" target="_blank" rel="noopener noreferrer">
        <img src={logoPartner1} alt="1" />
      </a>
      <a href="https://www.armani.com/en-wx" target="_blank" rel="noopener noreferrer">
        <img src={logoPartner2} alt="2" />
      </a>
      <a href="https://www.givenchy.com/" target="_blank" rel="noopener noreferrer">
        <img src={logoPartner3} alt="3" />
      </a>
      <a href="https://parfums.ua/ua/product/christine-darvin-charming-collector-edition-1" target="_blank" rel="noopener noreferrer">
        <img src={logoPartner4} alt="4" />
      </a>
      <a href="https://www.ysl.com/en-en" target="_blank" rel="noopener noreferrer">
        <img src={logoPartner5} alt="5" />
      </a>
      <a href="https://www.chanel.com/" target="_blank" rel="noopener noreferrer">
        <img src={logoPartner6} alt="6" />
      </a>
    </section>

    <section className="Main__catalog">
      <nav className="Main__categories">
        <a href="/" className="Main__link">Women's perfumery</a>
        <a href="/" className="Main__link">Men's perfumery</a>
        <a href="/" className="Main__link">Children's perfumery</a>
        <a href="/" className="Main__link">New</a>
        <a href="/" className="Main__link">Actions</a>
        <a href="/" className="Main__link">Gift ideas</a>
      </nav>
    </section>
    
    <hr className="Main__line" />

    <section className="Main__store">
      <aside className="Main__filters">
        
      </aside>

      <div className="Main__store-browse">
        {Array.from(Array(6)).map((_el, i) => <Card key={i} />)}
      </div>
    </section>
  </main>
);
