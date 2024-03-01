'use client';

import cn from 'classnames';

type Props = {
  children: React.ReactNode;
  className: string;
};

export function PopUp({ children, className }: Props) {
  return (
    <article className={cn("Pop-up hidden", className)}>
      <section className="Pop-up__content">
        {children}
      </section>
    </article>
  );
}
