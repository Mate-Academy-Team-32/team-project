'use client';

import '@/app/components/Cart/Cart.scss';

export function Cart() {
  return (
    <section className="Cart">
      <h1 className="Navigation__head">Checkout</h1>
      <hr />

      <form
        action="/"
        method='post'
        className="Cart__container form"
      >
        <section className="Cart__details">
          <h2 className="form__head">Billing details</h2>

          <div className="form__input form__name">
            <input
              type="text"
              className="form__input form__first-name"
              placeholder="First name"
            />
            <input
              type="text"
              className="form__input form__last-name"
              placeholder="Last name"
            />
          </div>

          <input
            type="text"
            className="form__input form__email"
            placeholder="Email"
          />

          <h2 className="form__head">Enter the delivery address</h2>

          <h2 className="form__head">Notes to the order</h2>

          <textarea className="form__feedback" placeholder="Notes for your order"></textarea>
        </section>

        <section className="Cart__orders order">
          <h2 className="form__head">Your order</h2>

          <div className="order__details">
            <p className="order__name" style={{ textTransform: "uppercase" }}>Product</p>
            <p className="order__price" style={{ textTransform: "uppercase" }}>Total</p>
          </div>

          <div className="order__details">
            <p className="order__name">Tiziana Terenzi Kirke</p>
            <p className="order__price">4240 ₴</p>
          </div>

          <h2 className="form__head">Delivery</h2>

          <div className="order__choice">
            <input
              type="radio"
              className="form__radio"
              name="post"

            />
            <input
              type="radio"
              className="form__radio"
              name="post"
            />
          </div>

          <div className="order__details order__details--bold">
            <p className="order__name" style={{ textTransform: "uppercase" }}>Total</p>
            <p className="order__price">4240 ₴</p>
            <hr />
          </div>

          <div className="order__payment">
            <div className="order__payment--cash">
              <input type="radio" name="payment" />
              <h2>Payment in cash upon receipt</h2>
              <p>You can order cash on delivery without any prepayments. However, consider the postage fee for COD services.</p>
            </div>

            <div className="order__payment--card">
              <input type="radio" name="payment" />
              <h2>Payment by card upon receipt</h2>
              <p>Pay securely by credit/debit card or Apple/Google Pay with Fondy.</p>
            </div>
          </div>

          <button type="button" className="form__submit">Confirm the order</button>
        </section>
      </form>
    </section>
  );
}
