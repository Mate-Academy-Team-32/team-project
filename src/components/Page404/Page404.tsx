import React from 'react';
import { Link } from 'react-router-dom';

export const Page404: React.FC = () => (
  <article
    className="Page404"
    style={{
      display: "flex",
      justifyContent: "center",
      marginTop: "300px",
      height: "300px",
    }}
  >
    <section
      className="Page404__content"
      style={{
        display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
      }}
    >
      <h1
        className="Page404__title"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "33px",
          fontWeight: "500",
          textTransform: "uppercase",
        }}
      >
        404 error
      </h1>

      <p
        className="Page404__description"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "20px",
          fontWeight: "400",
          textAlign: "center",
          color: "#707070",
        }}
      >
        This page not found:
        <br />
        back to home and start again
      </p>

      <button
        className="Page404__button"
        style={{
          marginTop: "40px",
          padding: "16px 50px",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "16px",
          fontWeight: "700",
          textTransform: "uppercase",
          borderRadius: "4px",
          backgroundColor: "transparent",
        }}
        >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#000",
          }}
        >homepage</Link>
      </button>

    </section>
  </article>
);
