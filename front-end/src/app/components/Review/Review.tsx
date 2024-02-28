'use client';

import Image from 'next/image';
import '@/app/components/Review/Review.scss';
import { Rate } from '@/app/components/Rate';
import avatarDefault from '@/app/img/image-avatar-default.png';

type Props = {
  from: string;
  timeAgo: number;
  countStars: number;
  feedback: string;
};

export function Review({
  from,
  timeAgo,
  countStars,
  feedback
}: Props) {
  return (
    <section className="Review">
      <header className="Review__header">
        <Image src={avatarDefault} alt="Avatar" />

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
}
