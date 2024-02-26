'use client'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { App } from './App';
import { Main } from './components/Main';
import { Account } from './components/Account';
import { Sign } from './components/Sign';
import { Catalog } from './components/Catalog';
import { Product } from './components/Product';
import { Cart } from './components/Cart';
import { Page404 } from './components/Page404';

export default function Home() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Main />} />
          <Route path="account" element={<Account />} />
          <Route path="sign" element={<Sign />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="product" element={<Product />} />
          <Route path="cart" element={<Cart />} />
        </Route>

        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}
