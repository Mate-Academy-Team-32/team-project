import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { App } from './App';
import { Home } from './pages';
import { Sign } from './pages/sign';
import { Catalog } from './pages/catalog';
import { Product } from './pages/product';
import { Cart } from './pages/cart';
import { Page404 } from './pages/404';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="sign" element={<Sign />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="product" element={<Product />} />
        <Route path="cart" element={<Cart />} />
      </Route>

      <Route path="*" element={<Page404 />} />
    </Routes>
  </Router>
);
