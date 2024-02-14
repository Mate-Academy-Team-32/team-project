import React, { useCallback, useEffect, useState } from 'react';
import './Slider.scss';

type Image = {
  id: number;
  color: string;
  pathImg: string;
  pathText: string;
};

type Props = {
  images: Image[];
  timeUpdate?: number;
};

export const Slider: React.FC<Props> = ({ images, timeUpdate = 1 }) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isPressed, setIsPressed] = useState(false);
  const countSlides = images.length;
  const [timeStart, setTimeStart] = useState(0);

  const handleClickBack = () => {
    setCurrentSlide(slide => slide > 1 ? slide - 1 : countSlides);
    setIsPressed(true);

    if (currentSlide > 0) {
      changeSelectedPage(currentSlide - 1);
    } else if (currentSlide === countSlides) {
      changeSelectedPage(countSlides);
    }
  };

  const handleClickNext = () => {
    setCurrentSlide(slide => slide < countSlides ? slide + 1 : 1);
    setIsPressed(true);

    if (currentSlide < countSlides) {
      changeSelectedPage(currentSlide);
    } else {
      changeSelectedPage(0);
    }
  };

  const changeSelectedPage = useCallback((index: number) => {
    const pages = document.querySelectorAll('.page') as NodeListOf<HTMLButtonElement>;

    for (let i = 0; i < countSlides; i++) {
      pages[i].classList.remove('page--selected');
    }

    pages[index].classList.add('page--selected');
  }, [countSlides]);

  useEffect(() => {
    if (isPressed) return;

    const intervalId = setInterval(() => {
      console.log('lol');
      setTimeStart(timeStart + 1);
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

    return () => clearInterval(intervalId);
  }, [timeStart, changeSelectedPage, countSlides, isPressed, timeUpdate]);

  return (
    <section className='Slider' style={{ backgroundColor: images[currentSlide - 1].color }}>
      <div className="Slider__content">
        <button className="Slider__button Slider__button--left" onClick={handleClickBack}></button>

        <div className="Slider__description">
          {images.map((image, index) => {
            if (currentSlide === index + 1) {
              return <img
                src={image.pathText}
                alt={(index + 1).toString()}
                key={image.id}
                className={`Slider__image Slider__image--id--${image.id}`}
              />;
            }

            return '';
          })}
        </div>

        <div className="Slider__image">
          {images.map((image, index) => {
            if (currentSlide === index + 1) {
              return <img
                src={image.pathImg}
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
                changeSelectedPage(image.id - 1);
              }}
            >
            </button>
          ) : (
            <button
              key={image.id}
              className="page"
              onClick={() => {
                setCurrentSlide(image.id);
                changeSelectedPage(image.id - 1);
              }}
            >
            </button>
          )
        ))}
      </div>
    </section>
  );
};
