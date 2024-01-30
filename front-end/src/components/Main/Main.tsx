import React, { useState } from 'react';
import './Main.scss';
import { Slider } from '../Slider';
import { Card } from '../Card';
import { TwoThumbInputRange } from 'react-two-thumb-input-range';
import logoPartner1 from '../../img/logo-partners-dg.svg';
import logoPartner2 from '../../img/logo-partners-ga.svg';
import logoPartner3 from '../../img/logo-partners-givenchy.svg';
import logoPartner4 from '../../img/logo-partners-pcd.svg';
import logoPartner5 from '../../img/logo-partners-sl.svg';
import logoPartner6 from '../../img/logo-partners-chanel.svg';
import imgOffer from '../../img/image-offer.png';
import imgChanelWoman from '../../img/image-chanel-woman.png';
import imgChanelBottle from '../../img/image-chanel-bottle.png';

export const Main: React.FC = () => {
  const [priceMin, setPriceMin] = useState(4);
  const [priceMax, setPriceMax] = useState(50);

  const toggleArrow = (index: number) => {
    const arrow = document.querySelectorAll('.arrow')[index];
    const filterOptions = document.querySelectorAll('.Main__filters--options')[index];

    arrow.classList.toggle('arrow--reversed');
    filterOptions.classList.toggle('hidden');
  };

  const onValueChange = (values: number[]) => {
    setPriceMin(values[0]);
    setPriceMax(values[1]);
  }

  return (
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
          <h2 className="Main__filters--header">Filters by parameters</h2>
          <hr className="Main__line Main__line--filter"></hr>

          <article className="Main__filters--name">
            <div className="Main__filters--category">
              <h2>Price</h2>
              <button className="arrow arrow--reversed" onClick={() => toggleArrow(0)}></button>
            </div>
            <div className="Main__filters--options">
              <div className="Main__filters--price">
                <div className="Main__filters--info">
                  <div className="input--dollars">
                    <input type="number" className="input--price" value={priceMin} readOnly />
                  </div>
                  <hr className="Main__line Main__line--input" />
                  <div className="input--dollars">
                    <input type="number" className="input--price" value={priceMax} readOnly />
                  </div>
                </div>

                <div className="price__input">
                  <div className="range__container">
                    <TwoThumbInputRange
                      values={[priceMin, priceMax]}
                      min={1}
                      max={100}
                      onChange={onValueChange}
                      showLabels={false}
                      trackColor={'#000'}
                      thumbColor={'#000'}
                    />
                  </div>
                </div>
              </div>
            </div>
          </article>

          <hr className="Main__line Main__line--filter"></hr>

          <article className="Main__filters--name">
            <div className="Main__filters--category">
              <h2>Producer</h2>
              <button className="arrow" onClick={() => toggleArrow(1)}></button>
            </div>
            <div className="Main__filters--options hidden">

            </div>
          </article>

          <hr className="Main__line Main__line--filter"></hr>

          <article className="Main__filters--name">
            <div className="Main__filters--category">
              <h2>Country</h2>
              <button className="arrow" onClick={() => toggleArrow(2)}></button>
            </div>
            <div className="Main__filters--options hidden">

            </div>
          </article>

          <hr className="Main__line Main__line--filter"></hr>

          <article className="Main__filters--name">
            <div className="Main__filters--category">
              <h2>Classification</h2>
              <button className="arrow" onClick={() => toggleArrow(3)}></button>
            </div>
            <div className="Main__filters--options hidden">

            </div>
          </article>

          <hr className="Main__line Main__line--filter"></hr>

          <article className="Main__filters--name">
            <div className="Main__filters--category">
              <h2>Volume</h2>
              <button className="arrow" onClick={() => toggleArrow(4)}></button>
            </div>
            <div className="Main__filters--options hidden">

            </div>
          </article>

          <hr className="Main__line Main__line--filter"></hr>

          <article className="Main__filters--name">
            <div className="Main__filters--category">
              <h2>Stability</h2>
              <button className="arrow" onClick={() => toggleArrow(5)}></button>
            </div>
            <div className="Main__filters--options hidden">

            </div>
          </article>

          <hr className="Main__line Main__line--filter"></hr>

          <article className="Main__filters--name">
            <div className="Main__filters--category">
              <h2>Type of fragrance</h2>
              <button className="arrow arrow--reversed" onClick={() => toggleArrow(6)}></button>
            </div>
            <div className="Main__filters--options">
              <div className="Main__choice--checkbox">
                <input type="checkbox" className="checkbox" />
                <p>Floral (12)</p>
              </div>
              <div className="Main__choice--checkbox">
                <input type="checkbox" className="checkbox" />
                <p>Aldehydic (41)</p>
              </div>
              <div className="Main__choice--checkbox">
                <input type="checkbox" className="checkbox" />
                <p>Aromatic (120)</p>
              </div>
              <div className="Main__choice--checkbox">
                <input type="checkbox" className="checkbox" />
                <p>Water (22)</p>
              </div>
              <div className="Main__choice--checkbox">
                <input type="checkbox" className="checkbox" />
                <p>Gourmet (304)</p>
              </div>
              <div className="Main__choice--checkbox">
                <input type="checkbox" className="checkbox" />
                <p>Woody (213)</p>
              </div>
              <div className="Main__choice--checkbox">
                <input type="checkbox" className="checkbox" />
                <p>Musky (292)</p>
              </div>
              <div className="Main__choice--checkbox">
                <input type="checkbox" className="checkbox" />
                <p>Spice (87)</p>
              </div>
              <div className="Main__choice--checkbox">
                <input type="checkbox" className="checkbox" />
                <p>Eastern (112)</p>
              </div>
              <div className="Main__choice--checkbox">
                <input type="checkbox" className="checkbox" />
                <p>Fruity (130)</p>
              </div>
              <div className="Main__choice--checkbox">
                <input type="checkbox" className="checkbox" />
                <p>Fougere (93)</p>
              </div>
              <div className="Main__choice--checkbox">
                <input type="checkbox" className="checkbox" />
                <p>Citrus fruit (822)</p>
              </div>
              <div className="Main__choice--checkbox">
                <input type="checkbox" className="checkbox" />
                <p>Chypres (200)</p>
              </div>
              <div className="Main__choice--checkbox">
                <input type="checkbox" className="checkbox" />
                <p>Leather (170)</p>
              </div>
              <div className="Main__choice--checkbox">
                <input type="checkbox" className="checkbox" />
                <p>Others (96)</p>
              </div>
            </div>
          </article>
        </aside>

        <div className="Main__store-browse">
          <Card
            imagePath={'../../image-offer.png'}
            category={'top'}
            title={'Tiziana Terenzi Kirke'}
            price={200}
            volume={100}
          />
          <Card
            imagePath={'../../image-offer.png'}
            category={'top'}
            title={'D&G 3 L\'Imperatrice'}
            price={200}
            volume={100}
          />
          <Card
            imagePath={'../../image-offer.png'}
            category={'top'}
            title={'Extract Cuba Original'}
            price={200}
            volume={100}
          />
          <Card
            imagePath={'../../image-offer.png'}
            category={'top'}
            title={'Christian Dior J\'Adore Absolu'}
            price={200}
            volume={100}
          />
            <Card
              imagePath={'../../image-offer.png'}
              category={'top'}
              title={'D&G 3 L\'Imperatrice'}
              price={200}
              volume={100}
            />
          <Card
            imagePath={'../../image-offer.png'}
            category={'top'}
            title={'Lacoste Eau de L.12.12.'}
            price={200}
            volume={100}
          />
        </div>
      </section>

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
};
