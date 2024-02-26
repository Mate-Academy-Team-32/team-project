import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import './Slider.scss';
import { Image as Picture } from '../../types/types';

type Props = {
  images: Picture[];
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
        <div className="Slider__image">
          {images.map((image, index) => {
            if (currentSlide === index + 1) {
              return <Image
                key={image.id}
                src={image.pathImg}
                width={100}
                height={536}
                alt={(index + 1).toString()}
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
