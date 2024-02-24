import React from 'react';
import cn from 'classnames';

type Props = {
  children: React.ReactNode;
  className: string;
};

export const PopUp: React.FC<Props> = ({ children, className }) => {
  return (
    <article className={cn("Pop-up hidden", className)}>
      <section className="Pop-up__content">
        {children}
      </section>
    </article>
  );
};
