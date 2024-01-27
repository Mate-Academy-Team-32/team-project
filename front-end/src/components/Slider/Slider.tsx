import React, { useEffect, useState } from 'react';
import './Slider.scss';

type Image = {
  path: string;
  id: number;
};

type Props = {
  images: Image[];
  timeUpdate?: number;
};

export const Slider: React.FC<Props> = ({ images, timeUpdate = 1 }) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isPressed, setIsPressed] = useState(false);
  const countSlides = images.length;

  useEffect(() => {
    if (!isPressed) {
      const interval = setInterval(() => {
        setCurrentSlide(slide => {
          if (slide >= countSlides) {
            changeSelectedPage(0);
            return 1;
          } else {
            changeSelectedPage(slide);
            return slide + 1;
          }
        });
      }, timeUpdate * 1000);

      return () => clearInterval(interval);
    }
  });

  const handleClickBack = () => {
    console.log(currentSlide);

    setCurrentSlide(slide => slide > 1 ? slide - 1 : countSlides);
    setIsPressed(true);

    if (currentSlide > 0 && currentSlide !== countSlides) {
      changeSelectedPage(currentSlide);
    } else {
      changeSelectedPage(countSlides - 1);
    }
  };

  const handleClickNext = () => {
    setCurrentSlide(slide => slide < countSlides ? slide + 1 : 1);
    setIsPressed(true);

    if (currentSlide < countSlides) {
      changeSelectedPage(currentSlide - 1);
    } else {
      changeSelectedPage(-1);
    }
  };

  const changeSelectedPage = (index: number) => {
    const pages = document.querySelectorAll('.page') as NodeListOf<HTMLButtonElement>;

    for (let i = 0; i < countSlides; i++) {
      pages[i].classList.remove('page--selected');
    }

    pages[index + 1].classList.add('page--selected');
  };
  
  return (
    <section className='Slider'>
      <div className="Slider__content">
        <button className="Slider__button Slider__button--left" onClick={handleClickBack}></button>

        <div className="Slider__description">
          <h1 className="Slider__title">
            Welcome to the wonderful world of perfumery PerfuMe!
          </h1>
          
          <p className="Slider__text">
            Our online store specializes in selling original perfumes. We offer a large selection of fragrances of popular and well-known brands, the quality of which is beyond doubt. We work exclusively with verified distributors and verified partners. Our prices will pleasantly surprise you!
          </p>
        </div>

        <div className="Slider__image">
          {images.map((image, index) => {
            if (currentSlide === index + 1) {
              return <img
                src={image.path}
                alt={(index + 1).toString()}
                key={image.id}
              />;
            }

            return '';
          })}
        </div>

        <button className="Slider__button" onClick={handleClickNext}></button>
      </div>

      <div className="Slider__pages">
        {images.map((image, index) => (
          index === 0 ? (
            <button
              key={image.id}
              className="page page--selected"
              onClick={() => {
                setCurrentSlide(image.id);
              }}
            >
            </button>
          ) : (
            <button
              key={image.id}
              className="page"
              onClick={() => {
                setCurrentSlide(image.id);
              }}
            >
            </button>
          )
        ))}
      </div>
    </section>
  );
};
