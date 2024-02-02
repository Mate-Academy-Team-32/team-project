import React, { useState } from 'react';
import classnames from 'classnames';
import MultiRangeSlider from 'multi-range-slider-react';
import { Card } from '../Card';
import './Catalog.scss';
import imgCatalog1 from '../../img/image-catalog-1.png';
import imgCatalog2 from '../../img/image-catalog-2.png';
import imgCatalog3 from '../../img/image-catalog-3.png';
import imgCatalog4 from '../../img/image-catalog-4.png';
import imgCatalog5 from '../../img/image-catalog-5.png';
import imgCatalog6 from '../../img/image-catalog-6.png';
import priceDollar from '../../img/icon-dollar.svg';

type View = 'List' | 'Grid';

enum ProductCategory {
  Top = 'top',
  M = 'man',
  W = 'woman',
}

export const Catalog: React.FC = () => {
  const [view, setView] = useState<View>('List');
  const [priceMin, setPriceMin] = useState(4);
  const [priceMax, setPriceMax] = useState(50);

  const toggleArrow = (index: number) => {
    const arrow = document.querySelectorAll('.arrow')[index];
    const filterOptions = document.querySelectorAll('.Catalog__filters--options')[index];

    arrow.classList.toggle('arrow--reversed');
    filterOptions.classList.toggle('hidden');
  };

  const toggleView = () => {
    if (view === 'List') {
      setView('Grid');
    } else if (view === 'Grid') {
      setView('List');
    }
  };

  return (
    <>
      <h2 className="Navigation__head">Home {'>'} Top 10</h2>

      <section className="Catalog__pre">
        <h1 className="Catalog__head">Top 10 fragrances of the season</h1>
        <button
          type="button"
          onClick={toggleView}
          className={classnames(
            'Catalog__view',
            `Catalog__view--${view}`,
          )}
        >
          {view} View
        </button>
      </section>

      <hr className="Catalog__line Catalog__line--filter Catalog__line--margin" />

      <section className="Catalog">
        <aside className="Catalog__filters">
          <h2 className="Catalog__filters--header">Filters by parameters</h2>
          <hr className="Catalog__line Catalog__line--filter"></hr>

          <article className="Catalog__filters--name">
            <div className="Catalog__filters--category">
              <h2>Price</h2>
              <button className="arrow arrow--reversed" onClick={() => toggleArrow(0)}></button>
            </div>
            <div className="Catalog__filters--options">
              <div className="Catalog__filters--price">
                <div className="Catalog__filters--info">
                  <div className="input--dollars">
                    <input type="number" className="input--price" value={priceMin} readOnly />
                  </div>
                  <img className="dollar" src={priceDollar} alt="Line" />
                  <div className="input--dollars">
                    <input type="number" className="input--price" value={priceMax} readOnly />
                  </div>
                </div>

                <div className="price__input">
                  <div className="range__container">
                    <MultiRangeSlider
                      onInput={(e) => {
                        setPriceMin(e.minValue);
                        setPriceMax(e.maxValue);
                      }}
                      minValue={priceMin}
                      maxValue={priceMax}
                      label={false}
                      ruler={false}
                      step={1}
                      canMinMaxValueSame={true}
                      barLeftColor={'#d2d2d2'}
                      barRightColor={'#d2d2d2'}
                      barInnerColor={'#000'}
                      thumbLeftColor={'#000'}
                      thumbRightColor={'#000'}
                    ></MultiRangeSlider>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <hr className="Catalog__line Catalog__line--filter"></hr>

          <article className="Catalog__filters--name">
            <div className="Catalog__filters--category">
              <h2>Producer</h2>
              <button className="arrow" onClick={() => toggleArrow(1)}></button>
            </div>
            <div className="Catalog__filters--options hidden">

            </div>
          </article>

          <hr className="Catalog__line Catalog__line--filter"></hr>

          <article className="Catalog__filters--name">
            <div className="Catalog__filters--category">
              <h2>Country</h2>
              <button className="arrow" onClick={() => toggleArrow(2)}></button>
            </div>
            <div className="Catalog__filters--options hidden">

            </div>
          </article>

          <hr className="Catalog__line Catalog__line--filter"></hr>

          <article className="Catalog__filters--name">
            <div className="Catalog__filters--category">
              <h2>Classification</h2>
              <button className="arrow" onClick={() => toggleArrow(3)}></button>
            </div>
            <div className="Catalog__filters--options hidden">

            </div>
          </article>

          <hr className="Catalog__line Catalog__line--filter"></hr>

          <article className="Catalog__filters--name">
            <div className="Catalog__filters--category">
              <h2>Volume</h2>
              <button className="arrow" onClick={() => toggleArrow(4)}></button>
            </div>
            <div className="Catalog__filters--options hidden">

            </div>
          </article>

          <hr className="Catalog__line Catalog__line--filter"></hr>

          <article className="Catalog__filters--name">
            <div className="Catalog__filters--category">
              <h2>Stability</h2>
              <button className="arrow" onClick={() => toggleArrow(5)}></button>
            </div>
            <div className="Catalog__filters--options hidden">

            </div>
          </article>

          <hr className="Catalog__line Catalog__line--filter"></hr>

          <article className="Catalog__filters--name">
            <div className="Catalog__filters--category">
              <h2>Type of fragrance</h2>
              <button className="arrow arrow--reversed" onClick={() => toggleArrow(6)}></button>
            </div>
            <div className="Catalog__filters--options">
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" />
                <p>Floral (12)</p>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" />
                <p>Aldehydic (41)</p>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" />
                <p>Aromatic (120)</p>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" />
                <p>Water (22)</p>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" />
                <p>Gourmet (304)</p>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" />
                <p>Woody (213)</p>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" />
                <p>Musky (292)</p>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" />
                <p>Spice (87)</p>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" />
                <p>Eastern (112)</p>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" />
                <p>Fruity (130)</p>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" />
                <p>Fougere (93)</p>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" />
                <p>Citrus fruit (822)</p>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" />
                <p>Chypres (200)</p>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" />
                <p>Leather (170)</p>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" />
                <p>Others (96)</p>
              </div>
            </div>
          </article>
        </aside>

        <div className={classnames(
          'Catalog__browse',
          view === 'List' && 'Catalog__list',
          view === 'Grid' && 'Catalog__grid',
        )}>
          <Card
            image={imgCatalog1}
            category={ProductCategory.Top}
            title={'Tiziana Terenzi Kirke'}
            price={200}
            volume={100}
            countStars={4}
          />
          <Card
            image={imgCatalog2}
            category={ProductCategory.Top}
            title={'D&G 3 L\'Imperatrice'}
            price={200}
            volume={100}
            countStars={4}
          />
          <Card
            image={imgCatalog3}
            category={ProductCategory.Top}
            title={'Extract Cuba Original'}
            price={200}
            volume={100}
            countStars={4}
          />
          <Card
            image={imgCatalog4}
            category={ProductCategory.Top}
            title={'Christian Dior J\'Adore Absolu'}
            price={200}
            volume={100}
            countStars={4}
          />
          <Card
            image={imgCatalog5}
            category={ProductCategory.Top}
            title={'D&G 3 L\'Imperatrice'}
            price={200}
            volume={100}
            countStars={4}
          />
          <Card
            image={imgCatalog6}
            category={ProductCategory.Top}
            title={'Lacoste Eau de L.12.12.'}
            price={200}
            volume={100}
            countStars={4}
          />
        </div>
      </section>
    </>
  );
};
