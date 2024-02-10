import React from 'react';
import './Review.scss';
import { Rate } from '../Rate';
import avatarDefault from '../../img/image-avatar-default.png';

type Props = {
  from: string;
  timeAgo: number;
  countStars: number;
  feedback: string;
};

export const Review: React.FC<Props> = ({
  from,
  timeAgo,
  countStars,
  feedback
}) => {
  return (
    <section className="Review">
      <header className="Review__header">
        <img src={avatarDefault} alt="Avatar" />

        <aside className="Review__status">
          <div className="Review__from">{from}</div>

          <div className="Review__info">
            <Rate
              countStars={countStars}
            />
            <div className="Review__time">{timeAgo} mins ago</div>
          </div>
        </aside>
      </header>

      <main className="Review__content">
        <div className="Review__text">
          {feedback}
        </div>
      </main>
    </section>
  );
};
