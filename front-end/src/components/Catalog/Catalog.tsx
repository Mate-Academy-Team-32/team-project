import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { scrollToTop } from '../../utils/_scroll';
import MultiRangeSlider from 'multi-range-slider-react';
import { Card } from '../Card';
import './Catalog.scss';
import { View, Sort, Label } from '../../types/types';
import priceDollar from '../../img/icon-dollar.svg';
import cards from '../../data/cards.json';
import imgCatalog1 from '../../img/image-catalog-1.png';
import imgCatalog2 from '../../img/image-catalog-2.png';
import imgCatalog3 from '../../img/image-catalog-3.png';
import imgCatalog4 from '../../img/image-catalog-4.png';
import imgCatalog5 from '../../img/image-catalog-5.png';
import imgCatalog6 from '../../img/image-catalog-6.png';

const IMAGES = [imgCatalog1, imgCatalog2, imgCatalog3, imgCatalog4, imgCatalog5, imgCatalog6];

export const Catalog: React.FC = () => {
  const [view, setView] = useState<View>('List');
  const [isGrid, setIsGrid] = useState(false);
  const [numberOfProducts, setNumberOfProducts] = useState(6);
  const [countProductsState, setCountProductsState] = useState(1);
  const [priceMin, setPriceMin] = useState(1);
  const [priceMax, setPriceMax] = useState(400);
  const [sortBy, setSortBy] = useState<Sort>('popularity');
  const [isClickedSort, setIsClickedSort] = useState(false);

  useEffect(() => {
    scrollToTop();
  }, []);

  const loadCards = () => {
    return cards
      .filter((_card, i) => (i < numberOfProducts))
      .map((card, i) => (
        <Card
          key={card.id}
          id={card.id}
          image={IMAGES[i]}
          category={card.category as Label}
          title={card.title}
          price={card.price}
          volume={card.volume}
          countProducts={[countProductsState, setCountProductsState]}
          countStars={card.countStars}
          countReviews={card.countReviews}
          isGrid={isGrid}
        />
      ))
      .sort(sortType(sortBy));
  };

  const sortType = (sort: Sort) => {
    return (a: any, b: any) => {
      const A = a.props;
      const B = b.props;

      switch (sort) {
        case 'popularity':
          return B.countStars - A.countStars;
        case 'price-low':
          return A.price - B.price;
        case 'price-high':
          return B.price - A.price;
        default:
          return A.id - B.id;
      }
    };
  };

  const toggleArrow = (index: number) => {
    const arrow = document.querySelectorAll('.arrow')[index];
    const filterOptions = document.querySelectorAll('.Catalog__filters--options')[index];

    arrow.classList.toggle('arrow--reversed');
    filterOptions.classList.toggle('hidden');
  };

  const toggleView = () => {
    if (view === 'List') {
      setView('Grid');
      setIsGrid(true);
    } else if (view === 'Grid') {
      setView('List');
      setIsGrid(false);
    }
  };

  const chooseSort = (sortType: Sort): void => {
    setSortBy(sortType);
    setIsClickedSort(false);
  };

  return (
    <>
      <h2 className="Navigation__head">Home {'>'} Top 10</h2>

      <section className="Catalog__pre">
        <h1 className="Catalog__head">Top 10 fragrances of the season</h1>

        <div className="Catalog__buttons">
          <div className={cn(
            "dropdown",
            isClickedSort && "is-active"
          )}>
            <div className="dropdown-trigger">
              <button
                className={
                  cn(
                    "Catalog__button-sort button",
                    isClickedSort && "Catalog__button-sort--clicked"
                  )
                }
                onClick={() => setIsClickedSort(currentState => !currentState)}
                aria-haspopup="true"
                aria-controls="dropdown-menu2"
              >
                <span>Sort by</span>
              </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu2" role="menu">
              <div className="dropdown-content">
                <div className="dropdown-item" onClick={() => chooseSort('popularity')}>
                  <p>Popularity</p>
                </div>
                <hr className="dropdown-divider" />
                <div className="dropdown-item" onClick={() => chooseSort('price-low')}>
                  <p>Price, low to high</p>
                </div>
                <hr className="dropdown-divider" />
                <div className="dropdown-item" onClick={() => chooseSort('price-high')}>
                  <p>Price, high to low</p>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleView}
            className={cn(
              'Catalog__view',
              `Catalog__view--${view}`,
            )}
          >
            {view} View
          </button>
        </div>
      </section>

      <hr className="Catalog__line Catalog__line--filter Catalog__line--margin" />

      <section className="Catalog">
        <form
          action="./"
          method="get"
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="Catalog__filters"
        >
          <h2 className="Catalog__filters--header">Filters by parameters</h2>

          <article className="Catalog__filters--name">
            <div className="Catalog__filters--category" onClick={() => toggleArrow(0)}>
              <h2>Price</h2>
              <button className="arrow arrow--reversed"></button>
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
                      min={1}
                      max={400}
                      minValue={priceMin}
                      maxValue={priceMax}
                      label={false}
                      ruler={false}
                      step={10}
                      canMinMaxValueSame={true}
                      barLeftColor={'#d2d2d2'}
                      barRightColor={'#d2d2d2'}
                      barInnerColor={'#000'}
                      thumbLeftColor={'#000'}
                      thumbRightColor={'#000'}
                    />
                  </div>
                </div>
              </div>
            </div>
          </article>

          <hr className="Catalog__line Catalog__line--filter"></hr>

          <article className="Catalog__filters--name">
            <div className="Catalog__filters--category" onClick={() => toggleArrow(1)}>
              <h2>Brand</h2>
              <button className="arrow"></button>
            </div>
            <div className="Catalog__filters--options hidden">
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--1" />
                <label htmlFor="option--1">Brand (12)</label>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--2" />
                <label htmlFor="option--2">Brand (1)</label>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--3" />
                <label htmlFor="option--3">Brand (12)</label>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--4" />
                <label htmlFor="option--4">Brand (2)</label>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--5" />
                <label htmlFor="option--5">Brand (4)</label>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--6" />
                <label htmlFor="option--6">Brand (13)</label>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--7" />
                <label htmlFor="option--7">Brand (9)</label>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--8" />
                <label htmlFor="option--8">Brand (7)</label>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--9" />
                <label htmlFor="option--9">Brand (11)</label>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--10" />
                <label htmlFor="option--10">Brand (10)</label>
              </div>
            </div>
          </article>

          <hr className="Catalog__line Catalog__line--filter"></hr>

          <article className="Catalog__filters--name">
            <div className="Catalog__filters--category" onClick={() => toggleArrow(2)}>
              <h2>Country</h2>
              <button className="arrow"></button>
            </div>
            <div className="Catalog__filters--options hidden">
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--11" />
                <label htmlFor="option--11">Country</label>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--12" />
                <label htmlFor="option--12">Country</label>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--13" />
                <label htmlFor="option--13">Country</label>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--14" />
                <label htmlFor="option--14">Country</label>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--15" />
                <label htmlFor="option--15">Country</label>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--16" />
                <label htmlFor="option--16">Country</label>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--17" />
                <label htmlFor="option--17">Country</label>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--18" />
                <label htmlFor="option--18">Country</label>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--19" />
                <label htmlFor="option--19">Country</label>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--20" />
                <label htmlFor="option--20">Country</label>
              </div>
            </div>
          </article>

          <hr className="Catalog__line Catalog__line--filter"></hr>

          <article className="Catalog__filters--name">
            <div className="Catalog__filters--category" onClick={() => toggleArrow(3)}>
              <h2>Classification</h2>
              <button className="arrow"></button>
            </div>
            <div className="Catalog__filters--options hidden">
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--21" />
                <label htmlFor="option--21">Parfume</label>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--22" />
                <label htmlFor="option--22">Parfumed water</label>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--23" />
                <label htmlFor="option--23">Toiled water</label>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--24" />
                <label htmlFor="option--24">Cologne</label>
              </div>
            </div>
          </article>

          <hr className="Catalog__line Catalog__line--filter"></hr>

          <article className="Catalog__filters--name">
            <div className="Catalog__filters--category" onClick={() => toggleArrow(4)}>
              <h2>Volume</h2>
              <button className="arrow"></button>
            </div>
            <div className="Catalog__filters--options hidden">
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--25" />
                <label htmlFor="option--25">30 ml</label>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--26" />
                <label htmlFor="option--26">50 ml</label>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--27" />
                <label htmlFor="option--27">100 ml</label>
              </div>
            </div>
          </article>

          <hr className="Catalog__line Catalog__line--filter"></hr>

          <article className="Catalog__filters--name">
            <div className="Catalog__filters--category" onClick={() => toggleArrow(5)}>
              <h2>Gender</h2>
              <button className="arrow"></button>
            </div>
            <div className="Catalog__filters--options hidden">
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--28" />
                <label htmlFor="option--28">Women's</label>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--29" />
                <label htmlFor="option--29">Men`s</label>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--30" />
                <label htmlFor="option--30">Unisex</label>
              </div>
            </div>
          </article>

          <hr className="Catalog__line Catalog__line--filter"></hr>

          <article className="Catalog__filters--name">
            <div className="Catalog__filters--category" onClick={() => toggleArrow(6)}>
              <h2>Type of aroma</h2>
              <button className="arrow arrow--reversed"></button>
            </div>
            <div className="Catalog__filters--options">
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--31" />
                <label htmlFor="option--31">Floral (12)</label>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--32" />
                <label htmlFor="option--32">Aldehydic (41)</label>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--33" />
                <label htmlFor="option--33">Aromatic (120)</label>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--34" />
                <label htmlFor="option--34">Water (22)</label>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--35" />
                <label htmlFor="option--35">Gourmet (304)</label>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--36" />
                <label htmlFor="option--36">Woody (213)</label>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--37" />
                <label htmlFor="option--37">Musky (292)</label>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--38" />
                <label htmlFor="option--38">Spice (87)</label>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--39" />
                <label htmlFor="option--39">Eastern (112)</label>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--40" />
                <label htmlFor="option--40">Fruity (130)</label>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--41" />
                <label htmlFor="option--41">Fougere (93)</label>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--42" />
                <label htmlFor="option--42">Citrus fruit (822)</label>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--43" />
                <label htmlFor="option--43">Chypres (200)</label>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--44" />
                <label htmlFor="option--44">Leather (170)</label>
              </div>
              <div className="Catalog__choice--checkbox">
                <input type="checkbox" className="checkbox" id="option--45" />
                <label htmlFor="option--45">Others (96)</label>
              </div>
            </div>
          </article>

          <section className="handling-menu handling-menu--filters">
            <button
              type="reset"
              className="button button--clear"
              onClick={() => {
                const form = document.querySelector('.Catalog__filters') as HTMLFormElement;
                form.reset();
              }}
            >
              Clear
            </button>
            <button type="submit" className="button button--show">Show (12)</button>
          </section>
        </form>

        <div className={cn(
          'Catalog__browse',
          view === 'List' && 'Catalog__list',
          view === 'Grid' && 'Catalog__grid',
        )}>
          {
            loadCards()
          }
        </div>
      </section>

      <section className="handling-menu handling-menu--reverse">
        <button
          type="button"
          className="button button--show-more"
          onClick={() => {
            setNumberOfProducts(currentNumber => currentNumber + 3);
          }}
          disabled={numberOfProducts >= cards.length}
        >
          Show more
        </button>
      </section>
    </>
  );
};
