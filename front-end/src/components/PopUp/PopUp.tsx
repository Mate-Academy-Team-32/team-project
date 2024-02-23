import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const PopUp: React.FC<Props> = ({ children }) => {
  return (
    <article className="Pop-up hidden">
      <section className="Pop-up__content">
        {children}
      </section>
    </article>
  );
};
