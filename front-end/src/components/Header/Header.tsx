import './Header.scss';
import logoAccount from '../../img/account.svg';

export const Header: React.FC = () => (
  <header className="Header">
    <nav className="nav nav--links">
      <a href="/" className="nav__link">Home</a>
      <a href="/" className="nav__link">About us</a>
      <a href="/" className="nav__link">Delivery and payment</a>
      <a href="/" className="nav__link">Blog</a>
      <a href="/" className="nav__link">Contacts</a>
    </nav>
    <nav className="nav nav--sign">
      <a href="/sign">
        <img
          className="sign-in"
          src={logoAccount}
          alt="Sign in"
        />
      </a>
    </nav>
  </header>
);
