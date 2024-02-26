import React from 'react';
import cn from 'classnames';
import './Rate.scss';
import starSelected from '/public/img/icon-star.svg';
import starDefault from '/public/img/icon-star-empty.svg';

type Props = {
  countStars: number;
  countReviews?: number;
  className?: string;
};

const COMPONENT_STARS_COUNT = 5;

export const Rate: React.FC<Props> = ({ countStars, countReviews, className }) => (
  <div className={cn(
    'Rate',
    className
  )}>
    {Array
      .from('x'.repeat(countStars))
      .map((_el, i) => <img key={i} src={starSelected} alt="Star" className="Rate__star" />)
    }
    {Array
      .from('x'.repeat(COMPONENT_STARS_COUNT - countStars))
      .map((_el, i) => <img key={i} src={starDefault} alt="Star" className="Rate__star" />)
    }
    {countReviews &&
      <div className="Rate__reviews">({countReviews})</div>
    }
  </div>
);