'use client';

import cn from 'classnames';
import Image from 'next/image';
import { Montserrat } from 'next/font/google';
import './Review.scss';
import { Rate } from '../Rate';
import avatarDefault from '/public/img/image-avatar-default.png';

const montserrat = Montserrat({ subsets: ['latin'] });

interface Props {
  from: string;
  timeAgo: number;
  countStars: number;
  feedback: string;
}

export function Review({ from, timeAgo, countStars, feedback }: Props) {
  return (
    <section className="Review">
      <header className="Review__header">
        <Image src={avatarDefault} alt="Avatar" />

        <aside className="Review__status">
          <div className="Review__from">{from}</div>

          <div className="Review__info">
            <Rate countStars={countStars} />
            <div className="Review__time">{timeAgo} mins ago</div>
          </div>
        </aside>
      </header>

      <main className="Review__content">
        <div className={cn("Review__text", montserrat.className)}>{feedback}</div>
      </main>
    </section>
  );
}
