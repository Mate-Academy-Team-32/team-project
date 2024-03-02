'use client';

import '@/components/Account/Account.scss';

export function Account() {
  return (
    <section className="Account">
      <form
        action="/"
        method="post"
        className="Account__form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h1>Account details</h1>
        <input
          type="text"
          name="firstname"
          placeholder="First name*"
          required
        />
        <input type="text" name="lastname" placeholder="Last name*" required />
        <input
          type="text"
          name="username"
          placeholder="Display name*"
          required
        />
        <p className="form__description">
          This will be how your name will be displayed in the account section
          and in reviews.
        </p>
        <input
          type="email"
          name="email"
          placeholder="Email address*"
          required
        />
        <h2>Password change</h2>
        <input
          type="password"
          name="password-current"
          placeholder="Current password (leave blank to leave unchanged)"
        />
        <input
          type="password"
          name="password-new"
          placeholder="New password (leave blank to leave unchanged)"
        />
        <input
          type="password"
          name="password-new-confirm"
          placeholder="Confirm new password"
          required
        />
        <button type="submit" className="Account__submit">
          Save changes
        </button>
      </form>
    </section>
  );
}
